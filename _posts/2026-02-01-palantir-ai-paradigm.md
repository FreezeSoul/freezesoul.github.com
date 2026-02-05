---
layout: post
title: "从数据建模到本体论：AI 时代的软件开发范式转移"
permalink: "palantir-ai-paradigm"
author: "FS.IO"
date:   2026-02-01 00:00:00
categories: technology
---

Palantir 在 2024 年股价翻了三倍，市值突破千亿美元。很多人归因于 AI 浪潮，但真正的秘密藏在一个概念背后——**本体论（Ontology）**。

这不是哲学课上的"存在的本质"，而是软件开发范式的一次根本性转移。

## 核心问题：知其然，不知其所以然

我们的系统能告诉我们库存周转率是 8 次/年，但无法告诉我们为什么不是 12 次。

我们能看到订单被拒绝了，但无法追溯是哪条业务规则导致的拒绝。

我们能知道数据的结果，但无法追溯数据形成的业务流转过程。

**这个困境的根源，在于传统 IT 架构中 OLTP（交易处理）和 OLAP（分析处理）的分离，导致数据模型和行为规则模型的分离。**

Palantir 的本体论，正是为了解决这个问题而诞生的。

## 传统系统的困境：知其然，不知其所以然

### 一个真实的场景

```
BI 系统显示：库存周转率 = 8 次/年
目标值：12 次/年

问题：库存周转率下降了，但为什么？

- 是采购周期延长了？
- 是交付周期延长了？
- 是客户大量取消了订单？

传统 BI 无法回答这个问题。
```

### 问题的根源：OLTP 与 OLAP 的分离

这个困境的根源，在于传统 IT 架构中 **OLTP（交易处理）** 和 **OLAP（分析处理）** 的分离：

```mermaid
graph LR
    subgraph "OLTP 系统（运行态）"
        A1[采购系统] --> A2[库存系统]
        A2 --> A3[订单系统]
        A3 -.->|业务规则隐藏在代码中| A4[数据写入]
    end

    subgraph "数据抽取"
        A4 --> B1[ETL]
    end

    subgraph "OLAP 系统（分析态）"
        B1 --> B2[数据仓库]
        B2 --> B3[BI 报表]
        B3 --> B4[库存周转率 = 8]
    end

    B4 -.->|无法追溯| A1
    B4 -.->|丢失了业务语义| A2

    style A4 fill:#ff6b6b,stroke:#c92a2a,color:#fff
    style B4 fill:#ffe066,stroke:#f59f00,color:#000
```

**关键问题**：当数据从 OLTP 系统流向 OLAP 系统时，**业务语义和行为规则丢失了**。

- 数据模型（表、字段、关系）被保留下来
- 但**行为和规则模型**隐藏在各业务系统的代码中，编译后不可见

结果就是：我们能看到指标的结果，却无法追溯数据形成的**业务流转过程**。

### 设计态 vs 运行态的分离

从软件建模的角度来看，问题更加清晰：

```
设计态（建模阶段）：
├── 静态建模：类图、对象关系图
│   └── 最终落地到：数据模型（数据库表）
└── 动态建模：状态图、序列图、活动图
    └── 最终落地到：行为规则模型（源代码）

运行态（部署上线后）：
├── 数据模型：可见，可查询
│   └── 数据库表、字段、关系清晰可见
└── 行为规则模型：不可见，隐藏在编译后的代码中
    └── 业务语义丢失，无法追溯
```

**关键洞察**：传统软件建模中，数据模型和行为规则模型在运行态**完全分离**。

- 数据模型落地到数据库，相对容易理解和可见
- 行为规则模型打包在部署包/镜像中，大部分时候是看不到的

这就是为什么当我们分析一个指标异常时，必须**回到各个业务系统**去查业务活动、业务订单，才能找到根本原因。

### 传统开发方式

```python
# 传统代码：业务逻辑被代码淹没
class OrderController:
    def approve_order(self, order_id):
        order = Order.objects.get(id=order_id)

        # 业务规则1：金额限制
        if order.amount > 100000:
            # 业务规则2：需要财务总监审批
            if order.customer.credit_score < 600:
                raise ValidationError("需要财务总监审批")
            # 业务规则3：新客户额外审查
            if order.customer.created_at < datetime.now() - timedelta(days=90):
                raise ValidationError("新客户需要额外审查")

        # 业务规则4：库存检查
        for item in order.items:
            if item.product.stock < item.quantity:
                raise ValidationError(f"{item.product.name} 库存不足")

        # 执行审批
        order.status = 'approved'
        order.save()

        # 触发后续流程
        self.send_notification(order)
        self.update_inventory(order)
```

**问题在哪里？**

1. **业务逻辑隐形**：审批规则分散在 if-else 代码中
2. **业务人员无法理解**：需求变更需要找开发人员
3. **规则难以复用**：同样的规则在其他系统要重新实现
4. **演进成本高**：修改规则需要改代码、测试、部署

### 本体论开发方式

```python
# 本体论方式：业务逻辑显性化
class Order(Object):
    properties = {
        "amount": Decimal,
        "status": Enum(["pending", "approved", "rejected"])
    }

    links = {
        "customer": Customer,
        "items": List[OrderItem]
    }

    # 业务规则作为一等公民
    actions = {
        "approve": Action(
            conditions=[
                "如果金额 > 10万，需要财务总监审批",
                "如果客户信用分 < 600，需要额外审查",
                "如果是新客户（<90天），需要额外审查"
            ],
            effects=["更新状态", "发送通知", "更新库存"]
        )
    }

# 业务人员可以直接理解和修改
ontology.execute_action("Order.approve", order_id)
```

**差异是什么？**

| 维度 | 传统开发 | 本体论开发 |
|------|---------|-----------|
| 业务逻辑 | 隐藏在代码中 | 显性化、可读 |
| 规则修改 | 改代码 → 测试 → 部署 | 修改本体定义 |
| 业务参与 | 通过需求文档 | 直接操作规则 |
| 复用性 | 难以跨系统复用 | 本体即共享语言 |

## 软件建模的演进：从 UML 到本体论

理解本体论的价值，需要放在软件建模方法演进的历史脉络中：

```mermaid
graph LR
    A[面向对象建模<br/>UML] --> B[模型驱动架构<br/>MDA]
    B --> C[领域驱动设计<br/>DDD]
    C --> D[本体论工程<br/>Ontology]

    subgraph "UML 时代"
        A1[静态建模：类图、对象图]
        A2[动态建模：状态图、序列图]
        A3[业务建模 + 技术实现建模<br/>打包在一起]
    end

    subgraph "MDA 时代"
        B1[PIM：平台无关模型<br/>关注核心抽象]
        B2[PSM：平台相关模型<br/>技术实现细节]
    end

    subgraph "DDD 时代"
        C1[核心领域对象]
        C2[对象的行为、事件、规则]
        C3[不关心开发语言、框架层级]
    end

    subgraph "本体论时代"
        D1[剥离技术实现建模]
        D2[只关注业务建模]
        D3[对象 + 行为 + 规则<br/>完整统一]
    end

    A --> A1
    A --> A2
    A --> A3
    B --> B1
    B --> B2
    C --> C1
    C --> C2
    C --> C3
    D --> D1
    D --> D2
    D --> D3

    style A fill:#e7f5ff,stroke:#1971c2,color:#000
    style B fill:#fff4e6,stroke:#f59f00,color:#000
    style C fill:#ebfbee,stroke:#2b8a3e,color:#000
    style D fill:#fff0f6,stroke:#c2255c,color:#000
```

### 演进的核心脉络

**UML 时代**：
- 优点：形式化语言符号，完整描述静态和动态逻辑
- 局限：业务建模和技术实现建模打包在一起

**MDA 时代**：
- 核心思想：分离 PIM（平台无关模型）和 PSM（平台相关模型）
- 进步：更加关注核心抽象的模型内核
- 局限：仍然关注技术实现的分层

**DDD 时代**：
- 核心思想：只关心核心领域对象及其行为、事件、规则
- 进步：不关心开发语言、框架层级，控制模型复杂度
- 局限：最终还是用代码表达，业务人员无法直接参与

**本体论时代**：
- 核心突破：**完全剥离技术实现建模，只关注业务建模**
- 关键变化：AI 大模型让技术实现变得不重要，业务建模成为核心
- 最终形态：**对象 + 行为 + 规则** 的完整统一模型

### 为什么现在是本体论的时代？

20 年前尝试过规则引擎、业务建模，但失败了。为什么现在成了？

**根本原因**：AI 大模型的出现，让**技术实现的成本大幅降低**。

```
过去：业务建模 + 技术实现建模
      ↓ 开发者需要关注两者
      ↓ 技术实现占据大量精力

现在：业务建模（本体论）
      ↓ AI 自动生成技术实现
      ↓ 开发者专注于业务价值
```

这就是为什么本体论在 AI 时代成为可能——**我们终于可以只关注"业务是什么"，而让 AI 处理"怎么做"**。

## 三种建模的本质差异

要理解本体论的价值，我们需要对比三种建模方式。

### 数据建模：关注"存什么"

```sql
-- 数据建模的典型产物
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    amount DECIMAL(10,2),
    status VARCHAR(20),
    created_at TIMESTAMP
);

-- 问题：这些字段代表什么业务含义？
-- - status = 'approved' 意味着什么？
-- - 什么条件下可以变为 'approved'？
-- - 审批通过后应该触发什么流程？
```

**本质局限**：只记录数据状态，不记录业务规则。

### 领域建模（DDD）：关注"怎么表达"

```python
# DDD 方式：通过代码模式表达业务概念
class Order:
    def __init__(self, customer, items):
        self.customer = customer
        self.items = items
        self.status = OrderStatus.PENDING

    def approve(self):
        # 业务逻辑封装在方法中
        if self.amount > 100000:
            if not self.customer.is_creditworthy():
                raise CannotApproveException("客户信用不足")

        self.status = OrderStatus.APPROVED
        DomainEventPublisher.publish(OrderApprovedEvent(self.id))

# 问题：业务人员能读懂这段代码吗？
# 规则修改需要开发人员介入吗？
```

**DDD 的进步**：将业务概念从技术细节中分离出来。

**DDD 的局限**：最终还是用代码表达，业务人员无法直接参与。

### 本体论建模：关注"是什么+能做什么"

```python
# 本体论方式：用业务语言描述业务
# 可视化界面中：

对象：订单
├── 属性
│   ├── 金额：Decimal
│   ├── 状态：枚举[待审批, 已批准, 已拒绝]
│   └── 创建时间：DateTime
├── 关系
│   ├── 下单客户 → 客户
│   └── 包含商品 → List[商品]
└── 动作
    └── 批准
        ├── 条件：
        │   ├── 如果 金额 > 10万 且 客户.信用分 < 600 → 需要财务总监审批
        │   └── 如果 客户.注册时长 < 90天 → 需要额外审查
        └── 效果：
            ├── 更新 状态 = 已批准
            ├── 发送 审批通知
            └── 触发 库存更新

# 这些描述可以直接用自然语言维护
```

**本体论的核心洞察：围绕对象建模**

传统建模往往围绕"业务场景"或"业务流程"，但本体论的建模核心是**对象**：

```
业务场景 / 流程：千变万化
    ↓ 难以复用

对象：相对稳定
    ↓ 可复用
    ↓ 对象的行为可复用
    ↓ 业务流程 = 对象行为的灵活组装和编排
```

**为什么对象是核心？**

- 对象可以产生行为
- 行为需要调用或依赖规则
- 对象、行为、规则是**相互制约、相互依赖的整体**

只要把核心对象及其暴露的行为、规则搞清楚，就得到了一个高度抽象化的本体——**这就是做任何事情的底层抽象模型**。

**本体论的本质突破**：

1. **业务逻辑显性化**：规则从代码中"提取"出来，成为一等公民
2. **业务人员可直接操作**：不需要开发人员介入
3. **系统可理解**：AI 大模型可以直接理解这些业务语义
4. **知其然知其所以然**：不仅看到数据结果，还能追溯业务流转过程

```mermaid
graph TD
    subgraph "本体论核心结构"
        direction LR
        O[对象 Object<br/>订单]

        subgraph "属性 Properties"
            P1[金额]
            P2[状态<br/>pending/approved/rejected]
            P3[创建时间]
        end

        subgraph "关系 Links"
            L1[下单客户 → Customer]
            L2["包含商品 → List[Product]"]
        end

        subgraph "动作 Actions"
            direction LR
            A1[approve]
            subgraph "条件 Conditions"
                C1[金额 > 10万 → 财务总监审批]
                C2[信用分 < 600 → 额外审查]
            end
            subgraph "效果 Effects"
                E1[更新状态]
                E2[发送通知]
                E3[触发库存更新]
            end
        end
    end

    O --> P1
    O --> P2
    O --> P3
    O --> L1
    O --> L2
    O --> A1
    A1 --> C1
    A1 --> C2
    A1 --> E1
    A1 --> E2
    A1 --> E3

    style O fill:#4dabf7,stroke:#1971c2,color:#fff
    style A1 fill:#51cf66,stroke:#2b8a3e,color:#fff
    style C1 fill:#ffe066,stroke:#f59f00,color:#000
    style C2 fill:#ffe066,stroke:#f59f00,color:#000
```

## Palantir 本体论解决的核心问题

Palantir 最初是一家做数据服务、数据中台的公司。他们的发现是：

**传统数据中台的局限**：

```
当看到数据指标时：
├── 可以看到：指标的结果
├── 可以看到：指标的计算公式
└── 无法看到：形成指标的业务语义和业务流转规则
```

**举例说明**：

```
库存周转率 = 8 次/年（目标 12 次）

传统 BI：
- 告诉你：指标下降了 33%
- 告诉你：计算公式是什么
- 无法告诉你：为什么下降？

要找到原因，必须：
1. 去采购系统查采购周期
2. 去库存系统查库存水平
3. 去订单系统查订单取消情况

行为规则分散在各业务系统中，无法统一追溯。
```

**Palantir 的解决方案**：

在传统的数据模型之上，**增加行为建模和规则建模**：

```
传统数据中台：
└── 数据模型（表、字段、关系）
    └── 只能看到"是什么"

Palantir 本体论：
├── 数据模型（对象、属性、关系）
├── 行为模型（动作、流程）
└── 规则模型（条件、约束）
    └── 既能看到"是什么"，又能追溯"为什么"
```

这样构建的完整本体，才真正解决了**"知其然又知其所以然"**的问题。

## AI 时代：为什么本体论成为可能？

本体论不是新概念。为什么 20 年前尝试过，失败了，现在又成了？

### 过去的障碍

```python
# 20年前：规则引擎的尝试
rules = [
    "if order.amount > 100000 then require_senior_approval",
    "if customer.credit_score < 600 then require_additional_review"
]

# 问题：
# 1. 规则如何从业务文档中提取？—— 人工编写，成本高
# 2. 规则如何维护？—— 业务变更频繁，跟不上
# 3. 规则如何执行？—— 需要专门的引擎，集成复杂
```

### 现在的突破

**AI 大模型的能力**：

```python
# 现在：AI 自动从业务文档提取规则
business_doc = """
采购审批流程：
- 金额超过10万的订单需要财务总监审批
- 信用评分低于600的客户需要额外审查
- 新注册客户（90天内）需要加强审核
"""

# AI 提取：
extracted_rules = llm.extract_rules(business_doc)
# 输出：
# [
#   Rule(condition="order.amount > 100000", action="require_senior_approval"),
#   Rule(condition="customer.credit_score < 600", action="require_additional_review"),
#   Rule(condition="customer.age < 90 days", action="require_enhanced_review")
# ]

# AI 自动生成本体论定义
ontology = llm.generate_ontology(extracted_rules)
```

**Skill 技术的价值**：

```yaml
# procurement-approval/SKILL.md
---
name: procurement-approval
description: 采购审批流程的技能包
---

## 技能定义

当用户请求"审批订单"时：
1. 检查订单金额
2. 检查客户信用评分
3. 检查客户注册时长
4. 根据规则返回审批决策

## 业务规则
- 金额 > 10万 → 需要财务总监审批
- 信用分 < 600 → 需要额外审查
- 新客户(<90天) → 需要加强审核

## 执行动作
- 更新订单状态
- 发送审批通知
- 触发库存更新
```

**Skill 就是"外挂的业务逻辑"**：

```
传统方式：业务逻辑编码在程序中
    ↓ 变更成本高，需要开发人员

Skill 方式：业务逻辑封装在技能包中
    ↓ 变更成本低，业务人员可维护
    ↓ AI 大模型可以直接调用
```

## 从 DDD 的 DSL 到真正的业务语言

DDD 鼓励设计**领域特定语言（DSL）**来捕捉业务概念。但现实是：

```python
# DDD 设计的 DSL（还是代码）
class OrderDSL:
    def "新客户的订单"(self, customer):
        if customer.is_new():
            return Order(customer, requires_review=True)

# 业务人员还是看不懂，或无法自行定义

# 真正的业务语言应该是这样的
"新客户"的定义：
  - 注册时间 < 90天
  - 历史订单数 < 3
  - 累计金额 < 10000

"新客户订单"的规则：
  - 需要额外审查
  - 金额限制：单笔不超过5万
  - 需要客服回访确认
```

**AI 代码生成的范式转移**：

```
过去：业务概念 → 代码抽象 → 程序实现
      （业务人员和开发者之间有鸿沟）

现在：业务概念 → 本体论定义 → AI 理解并执行
      （业务概念直接可执行）
```

## 开发者角色的转移：从代码编写者到本体论设计师

### 传统开发者的一天

```
产品经理："我们要加一个新功能：VIP 客户的审批优先级提升"

开发者：
1. 理解需求（反复确认）
2. 设计数据表结构
3. 编写业务逻辑代码
4. 编写单元测试
5. 部署到测试环境
6. 联调调试
7. 部署到生产环境

时间：2周
```

### 本体论开发者的一天

```
业务专家："VIP 客户的审批优先级要提升"

本体论设计师：
1. 在本体论编辑器中修改 "VIP 客户" 的定义
2. 调整审批规则的优先级参数
3. 在测试环境中验证规则
4. 一键发布到生产环境

时间：2小时
```

**开发者关注点的转移**：

| 传统开发 | 本体论开发 |
|---------|-----------|
| 怎么实现这个功能？ | 这个业务概念是什么？ |
| 用什么设计模式？ | 对象之间什么关系？ |
| 代码怎么复用？ | 规则怎么抽象？ |
| 性能如何优化？ | 业务流程如何建模？ |

**代码？让 AI 来写**：

```python
# 开发者只需要描述业务意图
intention = "审批通过后，更新库存，如果库存不足则自动触发补货"

# AI 自动生成代码
generated_code = ai.generate_code(
    intention=intention,
    context=ontology.get_context()  # 从本体论获取业务语义
)

# 输出：
# def approve_order(order):
#     order.status = 'approved'
#     for item in order.items:
#         item.product.stock -= item.quantity
#         if item.product.stock < item.product.safety_stock:
#             trigger_replenishment(item.product)
```

## Agentic AI 基础设施：支撑本体论工程

本体论不是空中楼阁，它需要相应的技术支撑。基于当前 Agent 技术的发展，一个合理的基础设施架构应该是：

### 四层架构

```
┌─────────────────────────────────────────────────────────┐
│  业务交互层：自然语言 / 可视化界面                         │
├─────────────────────────────────────────────────────────┤
│  本体论层：对象、属性、关系、动作                          │
├─────────────────────────────────────────────────────────┤
│  Agent 编排层：Skills + Tools + MCP                      │
├─────────────────────────────────────────────────────────┤
│  执行层：API 调用、数据库操作、外部系统（知识库）                │
└─────────────────────────────────────────────────────────┘
```

### 多范式智能化的商业解决方案

```python
# 一个典型的企业级方案设计

class EnterpriseOntologyAgent:
    """
    基于本体论的企业智能 Agent
    """

    def __init__(self):
        # 1. Skills：业务能力包
        self.skills = SkillRegistry([
            "procurement-approval",    # 采购审批
            "inventory-management",    # 库存管理
            "financial-risk-analysis"  # 财务风险分析
        ])

        # 2. Tools：执行工具（通过 MCP 协议）
        self.tools = MCPGateway([
            "sap://erp",              # SAP ERP 系统
            "salesforce://crm",       # Salesforce CRM
            "postgresql://data_warehouse"  # 数据仓库
        ])

        # 3. Ontology：业务本体论
        self.ontology = OntologyModel([
            Object("Customer", properties=[...], actions=[...]),
            Object("Order", properties=[...], actions=[...]),
            Object("Product", properties=[...], actions=[...])
        ])

        # 4. Agent：智能编排
        self.agent = Agent(
            llm=GPT4(),
            skills=self.skills,
            tools=self.tools,
            ontology=self.ontology
        )

    # 核心方法：用业务语言直接调用
    def execute_business_intent(self, intent: str):
        """
        执行业务意图

        示例：
        - "审批客户A的订单，如果库存不足则自动补货"
        - "找出所有高风险客户，并生成风险报告"
        """
        return self.agent.execute(intent)
```

### 架构设计的核心原则

**1. 关注点分离**

```
本体论层：定义"业务是什么"
    ↓ 独立于技术实现

Skills 层：定义"怎么做"
    ↓ 业务流程的封装

Tools 层：定义"用什么"
    ↓ 技术实现的抽象
```

**2. 业务价值显性化**

```python
# 传统方式：业务价值隐藏在代码中
def process_order(order):
    # 200行代码...
    # 业务价值是什么？难以说清

# 本体论方式：业务价值一目了然
class Order(Object):
    """
    业务价值：缩短订单处理时间，提高客户满意度
    关键指标：平均处理时长、客户满意度评分
    """
    business_value = {
        "primary": "提高订单处理效率",
        "metrics": ["processing_time", "customer_satisfaction"]
    }

    actions = {
        "process": Action(
            purpose="快速准确地处理订单",
            expected_outcome="订单在2小时内完成处理"
        )
    }
```

**3. 可演化的设计**

```python
# 业务规则变更不需要改代码
ontology.update_rule("Order.approve", """
新的规则：
- 金额阈值从10万调整为5万
- 增加部门预算检查
- 自动记录审批理由
""")

# Agent 自动理解新规则
# 自动调整执行逻辑
# 自动记录变更历史
```

## 范式转移：从代码为中心到业务为中心

### 软件工程的历史演进

```
第一代：面向过程
  关注点：函数、算法
  业务参与度：几乎为零

第二代：面向对象
  关注点：类、封装、继承
  业务参与度：通过需求文档间接参与

第三代：DDD（领域驱动设计）
  关注点：领域模型、通用语言
  业务参与度：参与建模过程，但结果仍是代码

第四代：本体论工程
  关注点：业务概念、规则、价值
  业务参与度：直接维护业务模型
```

### 转移的本质

| 维度 | 代码中心 | 业务中心 |
|------|---------|---------|
| 核心资产 | 源代码 | 本体论模型 |
| 变更成本 | 高（编码、测试、部署） | 低（修改模型） |
| 业务参与 | 通过需求文档 | 直接操作 |
| AI 参与度 | 辅助编程 | 核心引擎 |
| 价值体现 | 隐形 | 显性 |

## 核心差异总结

```mermaid
graph TB
    subgraph "传统开发模式"
        A1[需求文档] --> A2[数据建模<br/>数据表/字段]
        A2 --> A3[编码实现<br/>业务逻辑隐藏在代码中]
        A3 --> A4[部署运行]
        A1 -.->|业务人员无法直接参与| A3
    end

    subgraph "本体论开发模式"
        B1[业务概念] --> B2[本体论建模<br/>对象/属性/关系/动作]
        B2 --> B3[AI理解并执行<br/>业务逻辑显性化]
        B3 --> B4[持续演化]
        B1 -.->|业务人员直接维护| B2
    end

    A3 -->|隐形| A5[业务价值]
    B3 -->|显性| B5[业务价值]

    style A3 fill:#ff6b6b,stroke:#c92a2a,color:#fff
    style B2 fill:#51cf66,stroke:#2b8a3e,color:#fff
    style A5 stroke-dasharray: 5 5
    style B5 stroke-dasharray: 5 5
```

上图展示了两种开发模式的本质差异：

| 维度 | 传统开发 | 本体论开发 |
|------|---------|-----------|
| 核心资产 | 源代码 | 本体论模型 |
| 变更成本 | 高（编码、测试、部署） | 低（修改模型） |
| 业务参与 | 通过需求文档 | 直接操作 |
| AI 参与度 | 辅助编程 | 核心引擎 |
| 价值体现 | 隐形 | 显性 |

## 实践路径

对于想要转向本体论工程的团队，建议的路径：

### 第一阶段：建立语义层

```python
# 从现有系统提取业务语义
class SemanticLayer:
    """
    将数据库字段映射为业务概念
    """
    def map_field_to_concept(self, table, column):
        # orders.customer_id → "下单客户"
        # orders.amount → "订单金额"
        # orders.status → "订单状态"
        pass
```

**价值**：让数据有"含义"，而不只是"值"。

### 第二阶段：引入 Skills

```yaml
# 将业务流程封装为 Skills
skills/
  ├── order-processing/
  │   └── SKILL.md
  ├── inventory-management/
  │   └── SKILL.md
  └── financial-reporting/
      └── SKILL.md
```

**价值**：业务逻辑模块化、可复用。

### 第三阶段：构建本体论

```python
# 定义完整的业务模型
ontology = Ontology(
    objects=[Customer, Order, Product, Supplier],
    relationships=[...],
    actions=[...],
    rules=[...]
)
```

**价值**：业务模型显性化、可操作。

### 第四阶段：Agent 智能化

```python
# AI 直接理解并执行业务意图
agent = BusinessAgent(ontology=ontology)
agent.execute("审批高风险订单，需要财务总监确认")
```

**价值**：自然语言交互，降低使用门槛。

---

Palantir 的本体论不是一项技术，而是一种**思维方式**的转变。

从"如何用代码实现业务"到"如何让业务概念可计算"，从"技术驱动"到"业务驱动"，从"开发者主导"到"业务人员参与"。

这不是要取代开发者，而是让开发者从"代码编写者"升级为"业务建模师"。

AI 大模型提供了能力，Skills 提供了载体，MCP 提供了连接，Agent 提供了编排——而本体论，是这一切的核心。

---

> *本文参考资料：*
> *- [Palantir Foundry Ontology](https://www.palantir.com/explore/platforms/foundry/ontology/)*
> *- [Why Ontology Matters for Agentic AI in 2026](https://kenhuangus.substack.com/p/why-ontology-matters-for-agentic)*
> *- temp 目录中的 Palantir 本体论相关文章*
