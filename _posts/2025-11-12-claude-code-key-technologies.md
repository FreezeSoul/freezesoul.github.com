---
layout: post
title: "Claude Code 的几项关键技术：SubAgent、Skills..."
permalink: "claude-code-key-technologies"
author: "FS.IO"
date:   2025-11-12 00:00:00
categories: technology
tags: [Claude Code, AI编程, SubAgent, Skills]
---

![](/images/postcover/claude-code-key-technologies.png)

2025年，Claude Code 的出现标志着 AI 编程助手进入了一个新的阶段。它不仅是一个代码生成工具，更是一个完整的技术架构范例。本文将深入分析 Claude Code 的几项关键技术。

<!-- more -->

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

子代理（Sub Agent）是 Claude Code 实现任务专业化的核心机制，它标志着 AI 助手从通用型向专业化的重要转变。

![Claude Code SubAgent](/images/claudecodesubagent.webp)

### 什么是 Sub Agent？

Sub Agent 本质上是预配置的专业 AI 助手，每个都拥有：

```
┌─────────────────────────────────────┐
│     独立的上下文窗口（关键！）        │
├─────────────────────────────────────┤
│     定制化的系统提示词               │
├─────────────────────────────────────┤
│     特定的工具访问权限               │
├─────────────────────────────────────┤
│     专业的领域知识                   │
└─────────────────────────────────────┘

```

这种设计使得每个 Sub Agent 都能专注于自己的专业领域，如代码审查、调试或数据分析等。

### 核心优势：上下文隔离

**这是 Sub Agent 最重要的特性，也是与 Skills 的本质区别。**

#### 为什么上下文隔离如此重要？

```
场景：你需要进行代码审查，但不希望主对话被大量代码细节污染

❌ 没有 Sub Agent：
主对话上下文
├── 用户请求
├── 代码审查细节（大量代码）
├── 安全检查结果
├── 性能分析
└── 上下文窗口被占用，影响后续对话

✅ 使用 Sub Agent：
主对话上下文（保持清爽）
└── 委托给 code-reviewer Sub Agent
    └── 独立上下文窗口
        ├── 完整的代码审查细节
        ├── 安全检查结果
        └── 性能分析
    └── 返回简洁的审查结果给主对话

```

#### 上下文隔离带来的好处

**1. 保持主对话专注**

```
主对话始终关注高层次的目标规划
    ↓
Sub Agent 处理具体的技术细节
    ↓
清晰的职责分离

```

**2. 避免"上下文污染"**

```
代码审查的细节不会影响
    ↓
后续的架构讨论
    ↓
每个 Sub Agent 都在自己的"沙盒"中工作

```

**3. 并发处理多个任务**

```
可以同时启动多个 Sub Agent
    ↓
每个都有独立的上下文
    ↓
互不干扰，并行执行

```

### 并发能力

Sub Agent 支持强大的并发执行，最多可同时运行 **49 个子代理**：

```bash
# 同时审查多个模块
> 启动前端审查代理检查 src/components/
> 启动后端审查代理检查 api/
> 启动数据库审查代理检查 db/
> 启动测试审查代理检查 tests/

# 四个代理并发执行，各自独立

```

这种并发能力使得大型项目的任务分解和并行执行成为可能。

### Sub Agent 配置格式

```yaml
---
name: code-reviewer
description: 专业代码审查专家。主动审查代码质量、安全性和可维护性。在编写或修改代码后必须立即使用。
tools: file_search, bash, file_edit
color: red
---

# 代码审查专家

你是一位资深代码审查专家，致力于确保代码质量和安全性的高标准。

## 审查清单
- 代码简洁易读
- 函数和变量命名清晰
- 无重复代码
- 适当的错误处理
- 无暴露的密钥或 API 密钥
- 实现了输入验证
- 良好的测试覆盖率

## 工作方式
1. 运行 git diff 查看最近的更改
2. 专注于已修改的文件
3. 按优先级组织反馈（严重/警告/建议）

```

### 存储位置与优先级

| **类型** | **位置** | **范围** | **优先级** |
|---------|---------|---------|-----------|
| 项目 Sub Agent | `.claude/agents/` | 当前项目 | 最高 |
| 用户 Sub Agent | `~/.claude/agents/` | 所有项目 | 较低 |

项目级别的 Sub Agent 会覆盖用户级别的同名代理，这确保了项目特定需求的灵活性。

### 调用方式

#### 1. 自动委托

Claude Code 会根据任务描述、Sub Agent 描述和当前上下文主动选择合适的子代理：

```
用户：帮我检查一下这段代码的质量
    ↓
Claude 识别这是一个代码审查任务
    ↓
自动委托给 code-reviewer Sub Agent
    ↓
Sub Agent 在独立上下文中完成审查
    ↓
返回简洁的结果给主对话

```

#### 2. 显式调用

```bash
# 通过名称直接调用
> 用 code-reviewer 检查这个文件：main.py
> 让 debugger 分析这个错误
> 启动 data-scientist 分析销售数据

```

### 典型 Sub Agent 示例

#### 代码审查专家

```yaml
---
name: code-reviewer
description: 专注于代码质量、安全性和可维护性
tools: file_search, bash, file_edit
---
# 检查 PEP8 合规性、查找潜在 bug、提供优化建议

```

#### 调试专家

```yaml
---
name: debugger
description: 错误调试和问题排查专家
tools: file_search, file_edit, bash
---
# 分析错误日志、追踪问题根源、实施修复

```

#### 数据科学家

```yaml
---
name: data-scientist
description: 数据分析和 SQL 查询专家
tools: bash, file_search, file_edit
---
# 编写高效 SQL、数据清洗、统计分析、可视化

```

### Kiro 工作流：规范驱动开发

Sub Agent 最强大的应用之一是模仿 AWS Kiro 的规范驱动开发工作流：

```
┌─────────────────────────────────────────────────────────┐
│           规范驱动开发（Spec-Driven Development）         │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  Phase 1: 规划（Planning）                               │
│  └── @strategic-planner                                 │
│      └── 分析需求、创建技术规范、生成任务清单              │
│                                                           │
│  Phase 2: 执行（Execution）                              │
│  └── @task-executor                                     │
│      └── 读取规范、逐项实现、外科手术般的精确度            │
│                                                           │
└─────────────────────────────────────────────────────────┘

```

这种方法通过引入结构化的"计划与执行"模式，取代随意的"氛围编程"（vibe coding），产生可维护、生产就绪的代码。

## 六、Claude Skills 系统

Skills 是 Claude Code 最具创新性的功能之一，它将"通用 AI"转变为"定制专家"，代表了 AI 能力复用的一次重要跃迁。

![Claude Code Skills](/images/claudecodeskills.png)

### 什么是 Skills？

Skills 是一种**模块化的"能力包"机制**，可以将指令、脚本、模板、资源等打包为可复用的 Skill。当 Claude 认为某个任务相关时，它会动态加载对应的 Skill 来执行任务。

与传统 prompt 不同，Skills 不是一次性指令，而是一种可以封装复杂逻辑、模板、脚本、文件操作、甚至多步骤工作流的完整能力单元。

```
Skills = 知识 + 流程 + 模板 + 脚本/工具调用

```

### 核心技术原理

#### 1. 渐进式披露（Progressive Disclosure）

这是 Skills 设计中最精妙的部分，解决了"大量 Skills 如何不影响性能"的问题：

```
第一阶段（初始）: 只加载 metadata（name, description, tags）
                    ↓ 几十个 token
第二阶段（匹配后）: 加载 SKILL.md 主要文档
                    ↓ 只有需要时才加载
第三阶段（执行时）: 加载脚本/资源/模板
                    ↓ 按需加载，避免 token 爆炸

```

这种分层披露策略使得即使安装了大量 Skills，也不会严重影响上下文窗口或性能。

![‍⁤⁡The Skills architecture](/images/agent-skills-architecture.png)

#### 2. 可组合性（Composable）

多个 Skill 可以同时被触发和组合使用：

```typescript
// 任务：分析 Excel 数据 → 生成图表 → 导出 PPT → 转为 PDF

Claude 可以依次或并行调用：
├── Data Analysis Skill    // 分析数据
├── Excel Skill             // 处理表格
├── Chart Generation Skill  // 生成图表
├── PPT Skill               // 生成演示文稿
└── PDF Skill               // 导出文档

```

这种可组合性使得复杂、多步骤、跨工具的工作流自动化成为可能。

#### 3. 可移植性与统一格式

无论是在 Claude Web、Claude Code、还是通过 Claude API，都可以加载同一个 Skill：

```
一次编写，多处复用
    ↓
标准化企业流程
    ↓
团队共享，一致输出

```

### Skill 文件结构

一个典型的 Skill 目录结构：

```
my_custom_skill/
├── SKILL.md              # 必需：包含 metadata + 指令
├── README.md             # 可选：说明用途、版本历史
├── instructions.txt      # 可选：自然语言指令
├── scripts/              # 可选：可执行脚本
│   └── run.py
├── assets/               # 可选：模板/示例文件
│   ├── template.xlsx
│   └── style_guide.docx
└── examples/             # 可选：示例输入/输出
    ├── sample_input.json
    └── expected_output.xlsx

```

### SKILL.md 示例

```markdown
---
name: Company-Brand-Report
description: "为公司生成标准品牌格式的报告：读取 CSV 数据，生成 Excel 表格 + 图表 + 导出 PDF"
---

# Company-Brand-Report Skill

## 使用场景
当你提供原始数据（CSV/JSON）时，Claude 会：
1. 读取并分析数据
2. 按公司模板生成 Excel 报表
3. 插入图表（柱状/折线/饼图）
4. 导出为 PDF，嵌入公司封面

## 指令
1. 读取传入的 CSV/JSON 数据
2. 按照公司模板格式生成 Excel 报表
3. 插入可视化图表
4. 导出 PDF 并应用品牌样式
5. 返回生成文件

## 注意事项
- 仅处理结构化数据（CSV/JSON）
- 避免导入外部网络资源
- 使用公司指定的颜色和字体

```

### 典型应用场景

**1. 企业品牌/文档规范统一**

```
将公司品牌字体、样式、排版规范封装为 Skill
    ↓
所有生成文档都符合品牌标准

```

**2. 自动化报告生成**

```
原始数据 → Excel 分析 → 图表可视化 → 报告 → PDF 导出
    ↓
一键完成，零人工干预

```

**3. 合同/文档合规检查**

```
输入合同 → Skill 检查合规性 → 检测敏感词 → 填充模板
    ↓
标准化输出，降低风险

```

### 安全风险与治理

Skills 的强大功能也带来了严峻的安全挑战，这是使用时必须注意的：

#### ⚠️ 已知安全风险

**1. 恶意代码注入**

```
攻击者可以创建看似正常的 Skill
    ↓
在脚本中嵌入勒索软件（如 MedusaLocker）
    ↓
用户批准后，下载并执行恶意 payload

```

**2. Prompt Injection**

```
Skill 的 markdown 文件和脚本中
    ↓
隐藏恶意指令
    ↓
触发数据窃取或敏感信息泄露

```

#### 🔐 治理对策

```yaml
安全最佳实践:
  仅从可信来源安装 Skill: true
  审查 Skill 内容（脚本、依赖）: true
  建立 Skill 审批流程: true
  限制网络访问和外部下载: true
  持续监控和日志记录: true

企业级管理:
  版本控制: true
  权限分级: true
  代码审查: true
  安全审计: true
  回滚机制: true

```

### Skills 与 MCP 的对比

| **维度** | **Skills** | **MCP** |
|---------|-----------|---------|
| **关注点** | 如何完成任务（内部流程） | 连接外部工具与数据源 |
| **内容** | 人类流程/SOP/模板 | 外部工具/API/数据源 |
| **Token 效率** | 极高（渐进式披露） | 可能消耗大量 Token |
| **执行能力** | 可包含脚本逻辑 | 依赖外部服务 |
| **适用场景** | 文档生成、格式化、合规检查 | 访问 GitHub、数据库、API |

两者协同：用 MCP 获取实时数据，用 Skill 分析数据并生成报告。

## 七、Skills vs Sub Agent：如何选择？

理解 Skills 和 Sub Agents 的区别对于正确使用 Claude Code 至关重要。它们虽然都用于扩展 Claude 的能力，但设计哲学和使用场景完全不同。

### 核心区别对比

| **维度** | **Skills** | **Sub Agents** |
|---------|-----------|---------------|
| **定义** | 自动触发的"能力插件" | 专业子代理，小型 AI 专家 |
| **触发方式** | Claude 根据上下文自动识别 | 可自动委派或手动指定 |
| **上下文** | 与主会话共享上下文 | **拥有独立的上下文窗口** |
| **适用任务** | 简单、重复性任务 | 复杂、多步骤任务 |
| **配置方式** | 文件夹（SKILL.md + 脚本） | 单个 .md 文件 |
| **并发能力** | 不支持并发 | 支持最多 49 个并发 |
| **Token 效率** | 极高（渐进式披露） | 占用独立上下文 |
| **工具权限** | 继承主会话权限 | 可独立配置 |

### 使用场景决策树

```
你的任务是什么？
    │
    ├─ 简单、重复、可程序化？
    │   └─ → 使用 Skill
    │       例：格式化 JSON、命名规范检查
    │
    ├─ 复杂、多步骤、需要深度分析？
    │   └─ → 使用 Sub Agent
    │       例：代码审查、性能分析、重构
    │
    ├─ 需要保持主对话清爽？
    │   └─ → 使用 Sub Agent（上下文隔离）
    │       例：大型代码审查、数据分析
    │
    └─ 需要并行处理多个任务？
        └─ → 使用多个 Sub Agent
            例：同时审查多个模块

```

### 实际应用示例

#### 场景 1：代码格式化 → 使用 Skill

```bash
# 简单任务：格式化 JSON 文件
> 格式化这个 JSON 文件

Claude 自动识别并调用 JSON Formatter Skill
    ↓
在主对话中直接完成
    ↓
快速、简洁、不占用额外上下文

```

#### 场景 2：全面代码审查 → 使用 Sub Agent

```bash
# 复杂任务：全面的代码审查
> 用 code-reviewer 审查最近的修改

委托给 code-reviewer Sub Agent
    ↓
Sub Agent 在独立上下文中工作
    ↓
详细分析代码质量、安全性、性能
    ↓
返回简洁的审查报告给主对话
    ↓
主对话保持清爽，不被细节污染

```

#### 场景 3：大型项目分析 → 使用多个 Sub Agent

```bash
# 并行任务：分析大型项目
> 启动前端代理检查 src/components/
> 启动后端代理检查 api/
> 启动数据库代理检查 db/

三个 Sub Agent 并发执行
    ↓
各自在独立上下文中工作
    ↓
互不干扰，同时完成
    ↓
汇总结果给主对话

```

### 协同使用

Skills 和 Sub Agents 可以协同工作，发挥各自优势：

```typescript
// 复杂工作流示例

主对话：规划整个重构任务
    ↓
Sub Agent（architect）：分析架构
    ↓
Sub Agent（code-reviewer）：审查现有代码
    ↓
Skill（formatter）：格式化修改后的代码
    ↓
主对话：汇总结果，生成报告

```

### 最佳实践建议

**1. 优先使用 Skills 的场景**

```
✅ 程序化写作（文档生成、报告格式化）
✅ 简单的代码规范检查
✅ 固定流程的自动化
✅ 需要快速执行的小任务

```

**2. 优先使用 Sub Agents 的场景**

```
✅ 需要深度分析的代码审查
✅ 复杂的多步骤任务
✅ 需要保持主对话清爽的大型任务
✅ 需要并行处理的多个任务
✅ 需要专业化知识的领域任务

```

**3. 混合使用的场景**

```
✅ Sub Agent 完成复杂分析
✅ Skill 处理格式化和标准化
✅ 主对话负责高层次的规划和决策

```

## 九、Binary Feedback 机制

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

## 十、安全机制

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

## 十一、模型选择策略

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

## 十二、技术启示

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
