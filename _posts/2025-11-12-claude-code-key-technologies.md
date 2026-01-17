---
layout: post
title: "Claude Code 的几项关键技术"
permalink: "claude-code-key-technologies"
date:   2025-11-12 00:00:00
categories: technology
---

2025年，Claude Code 的出现标志着 AI 编程助手进入了一个新的阶段。它不仅是一个代码生成工具，更是一个完整的技术架构范例。本文将深入分析 Claude Code 的几项关键技术。

## 一、整体架构设计

Claude Code 采用了清晰的分层架构，这使其既强大又易于扩展：

```
┌─────────────────────────────────────┐
│           交互层 (REPL)             │
├─────────────────────────────────────┤
│         核心引擎 (query.ts)         │
├─────────────────────────────────────┤
│      工具系统 (Tools + MCP)         │
├─────────────────────────────────────┤
│      上下文管理 (Context)           │
└─────────────────────────────────────┘
```

### 交互层

交互层是用户与 Claude Code 的接触点，由多个组件构成：

- **REPL 界面**：提供命令行交互体验
- **输入处理器**：解析多种输入模式
  - `/` 开头：处理斜杠命令
  - `!` 开头：执行 bash 命令
  - 其他：作为自然语言处理

```typescript
function processUserInput(input: string, mode: InputMode): UserMessage {
  if (input.startsWith('/')) {
    return handleSlashCommand(input);
  } else if (input.startsWith('!')) {
    return handleBashCommand(input.slice(1));
  } else {
    return createUserMessage(input);
  }
}
```

- **输出渲染器**：使用 Ink 框架构建终端 UI，支持：
  - 主题系统切换
  - 详细/简洁模式
  - 执行成本和时间显示

### 核心引擎

核心引擎负责协调各个组件的工作，其核心查询流程如下：

```typescript
async function* query(
  messages: Message[],
  systemPrompt: string,
  context: Context,
  canUseTool: CanUseToolFn,
  toolUseContext: ToolUseContext,
): AsyncGenerator<Message> {
  // 1. 初始化大模型 prompt
  const fullSystemPrompt = formatSystemPromptWithContext(systemPrompt, context)

  // 2. 获取大模型返回
  const result = await queryWithBinaryFeedback(
    toolUseContext,
    getAssistantResponse,
    getBinaryFeedbackResponse,
  )

  // 3. 处理模型返回的工具请求
  const toolUseMessages = assistantMessage.message.content.filter(
    _ => _.type === 'tool_use',
  )

  // 4. 并行/串行执行工具
  if (toolUseMessages.every(msg => toolUseContext.options.tools
    .find(t => t.name === msg.name)?.isReadOnly())) {
    for await (const message of runToolsConcurrently) { }
  } else {
    for await (const message of runToolsSerially) { }
  }

  // 5. 处理后续交互
  yield* await query()
}
```

## 二、工具系统

工具系统是 Claude Code 的"手脚"，使其能够与外部环境交互。

### 工具类型

- **文件工具**：读取、写入、搜索文件
- **执行工具**：运行 shell 命令、执行代码
- **分析工具**：代码分析、依赖检查
- **元工具**：复合工具，执行复杂任务

### 统一接口

所有工具都遵循统一的接口定义：

```typescript
interface Tool {
  name: string;
  description: string;
  inputSchema: z.ZodType;
  execute(params: any): Promise<ToolResult>;
}
```

### 强大的 Bash 工具

Bash 工具是最强大的工具之一，可以调用 shell 里的所有命令。这让 Claude Code 能够执行几乎任何系统级操作。

## 三、上下文管理

上下文管理是 Claude Code 的"记忆"，其核心挑战是在有限的上下文窗口内提供最相关的信息。

### LRU 缓存机制

```typescript
const fileEncodingCache = new LRUCache<string, BufferEncoding>({
  fetchMethod: path => detectFileEncodingDirect(path),
  ttl: 5 * 60 * 1000,
  ttlAutopurge: false,
  max: 1000,
})
```

### 按需加载策略

不会一次性加载整个代码库，而是根据查询需要智能加载相关文件：

```typescript
async *call({ pattern, path }, { abortController }) {
  const { files, truncated } = await glob(
    pattern,
    path ?? getCwd(),
    { limit: 100, offset: 0 },
    abortController.signal,
  )
  const output: Output = {
    filenames: files,
    durationMs: Date.now() - start,
    numFiles: files.length,
    truncated,
  }
  yield {
    type: 'result',
    resultForAssistant: this.renderResultForAssistant(output),
    data: output,
  }
}
```

### 结果截断处理

对大量搜索结果实现智能截断，避免上下文溢出：

```typescript
const MAX_LINES = 4
const MAX_FILES = 1000
const TRUNCATED_MESSAGE = `There are more than ${MAX_FILES} files...
`
```

## 四、MCP 工具系统

MCP（Model Context Protocol）是 Claude Code 的重要扩展机制，支持三级分层配置：

| **级别** | **范围** | **优先级** |
|---------|---------|-----------|
| global  | 全局配置的通用 MCP | 最低 |
| MCPrc   | 配置文件，可共享 | 中等 |
| project | 项目级别配置 | 最高 |

### MCP 工具聚合

```typescript
export const getMCPTools = memoize(async (): Promise<Tool[]> => {
  const toolsList = await requestAll<ListToolsResult, typeof ListToolsResultSchema>(
    { method: 'tools/list' },
    ListToolsResultSchema,
    'tools',
  )
  // 聚合所有 MCP Server 的工具
  return aggregateTools(toolsList)
})
```

## 五、子代理（Sub Agent）系统

子代理是可以委托任务的个性化 AI 智能体，每个子代理都有：

- **专业化定位**：特定的专业领域
- **独立上下文**：避免主对话被污染
- **工具权限管理**：分配不同的工具权限
- **可复用性**：在多个项目中重复使用

### 子代理配置格式

```yaml
---
name: code-reviewer
description: 专业的代码审查专家，专注于代码质量、安全性和最佳实践
tools: search_codebase,view_files,update_file
---
# 代码审查专家
你是一位经验丰富的代码审查专家...
```

### 子代理存储位置

| **类型** | **位置** | **范围** | **优先级** |
|---------|---------|---------|-----------|
| 项目子代理 | `.claude/agents/` | 当前项目 | 最高 |
| 用户子代理 | `~/.claude/agents/` | 所有项目 | 较低 |

### 调用方式

**自动委托**：Claude Code 会根据任务描述、子代理描述和当前上下文主动选择合适的子代理

**显式调用**：
```
> 运行测试子代理修复失败的测试
> 让代码审查子代理评审一下最近的修改
```

## 六、Claude Skills 系统

Skills 就像是给 Claude 安装的"专家记忆包"，能将它从通用 AI 变为精准执行特定任务的专家。

### 核心特点

- **渐进式披露机制**：只在需要时加载完整指令，平时只记忆简短描述
- **极其节省 Token**：初始加载只占用几十个 Token
- **可包含代码**：确保任务执行的可靠性

### Skill 文件格式

```markdown
---
name: my-first-skill
description: 这是一个关于此 Skill 能做什么以及何时使用它的清晰描述。
---
# 我的第一个 Skill
[在这里添加您的指令，Claude 在激活此 Skill 时会遵循这些指令]
## 示例
- 用法示例 1
- 用法示例 2
```

### Skills 与 MCP 的区别

| **维度** | **Skills** | **MCP** |
|---------|-----------|---------|
| 关注点 | 如何完成任务（内部流程） | 连接外部工具与数据源 |
| 内容 | 人类流程/SOP | 外部工具/API/数据源 |
| Token 效率 | 极高（渐进式披露） | 可能消耗大量 Token |
| 适用场景 | 程序化写作、格式化、合规 | 访问 GitHub、数据库等 |

两者可以协同工作：用 MCP 获取实时数据，用 Skill 分析数据并生成报告。

## 七、Binary Feedback 机制

这是一个用于测试 prompt 稳定性的创新机制：

```typescript
async function queryWithBinaryFeedback(
  toolUseContext: ToolUseContext,
  getAssistantResponse: () => Promise<AssistantMessage>,
  getBinaryFeedbackResponse?: (m1, m2) => Promise<BinaryFeedbackResult>,
): Promise<BinaryFeedbackResult> {
  if (process.env.USER_TYPE !== 'ant' || !shouldUseBinaryFeedback()) {
    return normalQuery()
  }

  // 使用完全相同的请求两次
  const [m1, m2] = await Promise.all([
    getAssistantResponse(),
    getAssistantResponse(),
  ])

  // 检测 tool use 是否相同
  if (hasSameToolUse(m1, m2)) {
    return m1  // 模型确定，返回结果
  } else {
    return getBinaryFeedbackResponse(m1, m2)  // 模型犹豫，请求用户选择
  }
}
```

**核心思想**：如果 AI 对相同输入返回两个不同答案，说明模型对这次请求犹豫，需要用户选择。

## 八、安全机制

### AI 辅助安全检测

利用 AI 判断命令是否有被注入的可能性：

```typescript
export const getCommandSubcommandPrefix = memoize(
  async (command: string, abortSignal: AbortSignal) => {
    const subcommands = splitCommand(command)

    // 获取命令前缀来观察是否在安全执行列表
    const [fullCommandPrefix, ...subcommandPrefixesResults] = await Promise.all([
      getCommandPrefix(command, abortSignal),
      ...subcommands.map(async subcommand => ({
        subcommand,
        prefix: await getCommandPrefix(subcommand, abortSignal),
      })),
    ])
  }
)
```

### 上下文压缩处理

当对话过长时，使用 Sonnet 模型生成摘要，清空历史但保留关键信息：

1. 获取当前对话历史
2. 构造摘要请求并调用 Sonnet 模型
3. 提取并验证摘要内容
4. 清屏、清空消息历史
5. 创建包含摘要的新对话分支

## 九、模型选择策略

Claude Code 内部有多个模型实例，根据任务复杂度选择合适的模型：

- **Haiku**：简单任务（判断对错、确认前缀等）
- **Sonnet**：摘要生成等中等任务
- **Opus**：复杂编程任务

```typescript
// 简单任务使用 Haiku
async function generateTitle(description: string): Promise<string> {
  const response = await queryHaiku({
    systemPrompt: ['Generate a concise issue title (max 80 chars)...'],
    userPrompt: description,
  })
  return response.message.content[0]?.text || 'Bug Report'
}
```

## 十、技术启示

Claude Code 的架构设计给我们带来了一些重要启示：

### 1. 分层架构的价值

清晰的分层使系统既强大又易于维护和扩展。

### 2. Token 效率的重要性

通过 LRU 缓存、按需加载、渐进式披露等机制，最大化利用有限的上下文窗口。

### 3. 工具系统的扩展性

统一的工具接口 + MCP 协议，使系统能够轻松集成新的能力。

### 4. 子代理的专业化

将复杂任务委托给专业化的子代理，提高执行质量和效率。

### 5. Skills 的实用性

将隐性知识转化为可复用的技能包，让 AI 真正融入日常工作流程。

## 结语

Claude Code 不仅仅是一个 AI 编程工具，更是一个完整的技术架构范例。它的设计哲学、技术选择和实现细节，都为我们构建下一代 AI 应用提供了宝贵的参考。

从交互层到核心引擎，从工具系统到上下文管理，从 MCP 到 Skills，每一项技术都体现了对开发者体验和系统效率的深刻思考。

随着 Claude Code 的不断演进，以及国产大模型和工具的崛起，我们有理由相信，AI 辅助编程的时代才刚刚开始。

---

> *注：本文基于 Claude Code 的公开技术文档整理，相关技术仍在快速发展中。*
