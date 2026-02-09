---
layout: post
title: "智能体经典范式构建：ReAct、Plan-and-Solve 与 Reflection"
permalink: "agent-paradigms"
author: "FS.IO"
date:   2024-04-15 00:00:00
categories: technology
tags: [Agent, ReAct, Plan-and-Solve, Reflection, AI]
---

如果说 2023 年是 AutoGPT 引爆 Agent 概念的一年，那么 2024 年则是这些概念逐渐沉淀、范式逐渐清晰的一年。

在实践中，三种经典范式逐渐脱颖而出：**ReAct、Plan-and-Solve 和 Reflection**。

它们不是相互替代的关系，而是可以组合在一起，构建出强大的智能体系统。

## ReAct：推理与行动的交响

ReAct（Reasoning + Acting）可能是最经典的 Agent 范式。它的思想简单而优雅：

```
思考 → 行动 → 观察 → 思考 → 行动 → ...
```

### 核心思想

人类解决问题时，不会一次性给出所有步骤，而是：
1. 思考当前情况
2. 采取一个行动
3. 观察结果
4. 基于结果调整下一步思考

ReAct 就是让 AI 模仿这个过程。

### 实现模式

一个典型的 ReAct 循环：

```python
while not task_complete:
    # Thought: 分析当前情况
    thought = llm.generate(
        f"当前状态：{current_state}\n"
        f"目标：{goal}\n"
        "我应该怎么做？"
    )

    # Action: 选择并执行行动
    action = parse_action(thought)
    observation = execute_action(action)

    # 更新状态，继续循环
    current_state = update_state(observation)
```

### 经典案例：问答系统

用户问："科罗拉多造山带是如何形成的？"

**Thought 1**：用户问的是科罗拉多造山带的形成过程，我需要搜索相关信息。

**Action 1**：搜索 "科罗拉多造山带形成"

**Observation 1**：搜索结果提到了造山运动、板块碰撞等，但没有详细说明东部地区。

**Thought 2**：搜索结果提到了西部地区，但用户可能也关心东部地区的信息。

**Action 2**：搜索 "科罗拉多东部造山带"

**Observation 2**：获得了更完整的信息。

**Thought 3**：现在我有足够的信息来回答用户的问题了。

**Action 3**：生成最终答案

这种"思考-行动-观察"的循环，让 AI 能够像人类一样逐步探索问题空间。

### ReAct 的优势

- **透明性**：每一步思考都可见，便于调试
- **灵活性**：可以根据观察结果动态调整策略
- **通用性**：不依赖特定领域，可应用于各种任务

### ReAct 的局限

- **效率问题**：可能需要多次尝试才能找到正确路径
- **成本问题**：每次循环都要调用 LLM，Token 消耗大
- **规划不足**：缺乏全局规划，容易陷入局部最优

## Plan-and-Solve：先规划，后执行

如果 ReAct 是"边走边想"，那么 Plan-and-Solve 就是"先想清楚再行动"。

### 核心思想

人类解决复杂问题时，通常会先制定计划：
1. 理解问题
2. 分解为子问题
3. 制定执行计划
4. 按计划执行
5. 根据结果调整

Plan-and-Solve 让 AI 模仿这个过程。

### 实现模式

```python
# Phase 1: Planning
plan = llm.generate(
    f"任务：{task}\n"
    "请制定一个详细的执行计划：\n"
    "1. 理解任务目标\n"
    "2. 分解子任务\n"
    "3. 确定执行顺序\n"
    "4. 列出每个步骤的具体行动"
)

# Phase 2: Execution
for step in parse_plan(plan):
    result = execute_step(step)
    update_progress(result)

# Phase 3: Adjustment (optional)
if not task_complete:
    adjusted_plan = llm.generate(
        f"原计划：{plan}\n"
        f"执行结果：{results}\n"
        "请根据执行结果调整计划"
    )
```

### 计划的表示形式

计划可以有多种表示形式：

**列表形式：**
```
1. 搜索"Python 异步编程"
2. 阅读前 5 个搜索结果
3. 总结异步编程的核心概念
4. 生成代码示例
```

**结构化形式：**
```json
{
  "goal": "解释 Python 异步编程",
  "steps": [
    {
      "step": 1,
      "action": "search",
      "query": "Python 异步编程",
      "purpose": "获取相关信息"
    },
    {
      "step": 2,
      "action": "read",
      "target": "top 5 results",
      "purpose": "理解核心概念"
    }
  ]
}
```

**伪代码形式：**
```
FUNCTION explain_async_programming:
  SEARCH "Python async programming"
  READ top results
  EXTRACT key concepts (asyncio, await, async)
  GENERATE code examples
  COMPOSE explanation
END FUNCTION
```

### Plan-and-Solve 的优势

- **全局视野**：先规划，避免盲目行动
- **效率提升**：减少不必要的尝试
- **可追溯**：每一步都有明确的意图

### Plan-and-Solve 的局限

- **刚性**：计划可能不够灵活，难以应对变化
- **规划质量依赖 LLM**：如果初始规划有误，后续执行会受影响
- **动态调整困难**：修改计划可能比重新规划还复杂

## Reflection：从经验中学习

ReAct 和 Plan-and-Solve 解决了"如何行动"的问题，但还有一个关键问题：**如何从行动中学习？**

这就是 Reflection 机制的用武之地。

### 核心思想

人类在完成任务后，会反思：
- 哪里做得好？
- 哪里出了问题？
- 下次如何改进？

Reflection 让 AI 也具备这种能力。

### 实现模式

```python
# 执行任务
result = execute_task(task)

# 反思
reflection = llm.generate(
    f"任务：{task}\n"
    f"执行过程：{execution_history}\n"
    f"结果：{result}\n"
    "请反思：\n"
    "1. 哪些做法是正确的？\n"
    "2. 哪些做法可以改进？\n"
    "3. 如果再做一次，你会怎么做？"
)

# 存储反思结果
store_reflection(task, reflection)

# 下次遇到类似任务时检索
similar_tasks = find_similar_tasks(task)
relevant_reflections = retrieve_reflections(similar_tasks)
```

### 反思的层次

Reflection 可以在不同层次进行：

**任务级反思：**
```
这个任务完成了吗？
如果没有，哪里出了问题？
如何修正？
```

**策略级反思：**
```
我的策略有效吗？
有没有更好的方法？
下次应该尝试什么不同的做法？
```

**元认知反思：**
```
我对这个类型的任务擅长吗？
我应该先学习相关知识还是直接尝试？
我是否需要寻求帮助？
```

### Reflection 的实现形式

**文本形式：**
```
反思：这次任务中，我在第三步犯了错误——过早地得出了结论。
下次应该：在得出结论前，先验证所有关键信息。
经验：对于数据分析任务，验证步骤必不可少。
```

**结构化形式：**
```json
{
  "task_id": "task_123",
  "success": false,
  "error": "premature_conclusion",
  "lesson": "always verify before concluding",
  "action_item": "add verification step"
}
```

**向量存储：**
将反思内容编码为向量，存储在向量数据库中，下次遇到类似任务时通过语义检索找到相关反思。

### Reflection 的价值

- **持续改进**：每次任务都能积累经验
- **错误纠正**：识别并避免重复犯错
- **知识沉淀**：将隐性经验显性化

## 三者融合：构建完整的智能体

单一的范式往往不够强大，真正的智能体需要融合多种范式。

### 融合架构

```python
class Agent:
    def solve(self, task):
        # Phase 1: Planning (Plan-and-Solve)
        plan = self.plan(task)

        # Phase 2: Execution with Reflection (ReAct + Reflection)
        while not task_complete:
            # ReAct loop
            thought = self.think(current_state, plan)
            action = self.select_action(thought)
            observation = self.execute(action)

            # Check if we need reflection
            if self.should_reflect(observation):
                reflection = self.reflect(history)
                plan = self.adjust_plan(plan, reflection)

            current_state = update_state(observation)

        # Phase 3: Final Reflection
        final_reflection = self.reflect(history)
        store_reflection(task, final_reflection)

        return result
```

### 具体案例：代码生成智能体

**任务**：实现一个用户认证系统

**Phase 1: Plan-and-Solve（规划）**
```
计划：
1. 分析需求（用户注册、登录、登出）
2. 设计数据库模型（User表）
3. 实现注册接口
4. 实现登录接口
5. 实现登出接口
6. 添加错误处理
```

**Phase 2: ReAct（执行）**
```
Thought 1: 先设计数据库模型
Action 1: 生成 User 模型代码
Observation 1: 生成成功，包含 id, username, password_hash

Thought 2: 接下来实现注册接口
Action 2: 生成注册 API 代码
Observation 2: 生成成功，但缺少密码验证

Reflection: 我应该在生成代码前加上验证逻辑
Adjust plan: 在每个 API 前增加验证步骤

Thought 3: 重新生成注册接口，加入验证
Action 3: 生成改进后的注册 API
Observation 3: 成功
```

**Phase 3: Reflection（反思）**
```
反思：
1. 成功之处：模块化设计，代码清晰
2. 不足之处：一开始忘记输入验证
3. 改进：以后生成 API 时，默认包含验证逻辑
4. 经验存储：API 开发 checklist（验证、错误处理、日志）
```

### 融合的优势

这种融合架构综合了三种范式的优点：

- **Plan-and-Solve** 提供全局视野和结构化思维
- **ReAct** 提供灵活的执行和动态调整能力
- **Reflection** 提供持续改进和经验积累

## 实践建议

### 1. 根据任务选择范式

| 任务类型 | 推荐范式 | 原因 |
|---------|---------|------|
| 简单问答 | ReAct | 快速响应，无需复杂规划 |
| 复杂项目 | Plan-and-Solve | 需要全局视野和结构化分解 |
| 重复性任务 | Plan-and-Solve + Reflection | 规划可复用，经验可积累 |
| 探索性任务 | ReAct + Reflection | 灵活探索，持续学习 |

### 2. 渐进式实现

不要一开始就追求完美的融合架构：

**第一阶段**：实现 ReAct
- 快速验证想法
- 理解核心问题

**第二阶段**：加入 Plan-and-Solve
- 提升效率
- 减少盲目尝试

**第三阶段**：加入 Reflection
- 积累经验
- 持续优化

### 3. 成本控制

三种范式都会增加 LLM 调用次数，需要考虑成本：

**策略一**：缓存和复用
```python
# 缓存规划结果
if similar_task in cache:
    plan = cache[similar_task]
else:
    plan = llm.generate_plan(task)
    cache[task] = plan
```

**策略二**：分层调用
```python
# 简单任务用小模型
if complexity(task) == "low":
    model = "gpt-3.5"
else:
    model = "gpt-4"
```

**策略三**：提前终止
```python
# 如果计划执行顺利，不需要每次都反思
if error_rate < threshold:
    skip_reflection = True
```

## 未来展望

### 1. 更智能的规划

目前的规划还比较简单，未来可以：
- 学习人类专家的规划模式
- 从历史任务中提炼规划模板
- 动态调整规划粒度

### 2. 更深度的反思

Reflection 可以更深入：
- 跨任务的经验迁移
- 识别模式并抽象原则
- 构建个人化的知识库

### 3. 更自然的融合

三种范式的边界可能会模糊：
- 规划和执行的实时切换
- 反思过程的自动化和隐性化
- 形成统一的智能架构

### 4. 多智能体协作

单个智能体能力有限，未来方向：
- 专门的规划 Agent
- 专门的执行 Agent
- 专门的反思 Agent
- 通过协作完成复杂任务

## 结语

ReAct、Plan-and-Solve、Reflection，这三种范式各自解决了智能体构建的不同问题：

- **ReAct** 解决了如何行动的问题
- **Plan-and-Solve** 解决了如何高效行动的问题
- **Reflection** 解决了如何持续改进的问题

它们的融合，标志着 Agent 技术从"玩具"走向"工具"，从"炫技"走向"实用"。

2024 年，我们正在见证智能体技术的成熟。而这一切，才刚刚开始。

---

> *注：本文基于当前 Agent 技术的主流实践整理，相关技术仍在快速发展中。*
