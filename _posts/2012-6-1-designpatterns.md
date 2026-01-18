---
layout: post
title: "设计模式回顾与总结"
permalink: "design-patterns-intro"
author: "FS.IO"
date: 2012-06-01 00:00:00
categories: architecture
tags: [设计模式, Design Patterns, 架构, 软件工程]
---

## 什么是设计模式？

**设计模式 (Design Patterns)** 是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了可重用代码、让代码更容易被他人理解、保证代码可靠性。

> 设计模式建立在**变化点**的基础上进行，哪里有变化点，哪里应用设计模式。

---

## 设计模式分类

GoF (Gang of Four) 提出的 23 种设计模式分为三大类：

| 类型 | 数量 | 关注点 |
|------|------|--------|
| **创建型** | 5 种 | 对象的创建过程 |
| **结构型** | 7 种 | 类和对象的组合 |
| **行为型** | 11 种 | 对象之间的通信和职责分配 |

---

## 一、创建型模式 (Creational Patterns)

**核心关注**：解决对象的创建问题

| 模式 | 核心作用 | 应用场景 |
|------|----------|----------|
| **Singleton** | 控制实体对象个数 | 确保一个类只有一个实例 |
| **Factory Method** | 解耦 new 操作 | 定义创建对象的接口，子类决定实例化 |
| **Abstract Factory** | 创建产品族 | 创建一系列相关或相互依赖的对象 |
| **Builder** | 复杂对象构建 | 分步骤构建复杂对象 |
| **Prototype** | 通过克隆创建对象 | 通过复制原型创建新对象 |

### 李建忠老师总结

> **Singleton 模式**：解决实体对象个数的问题
>
> **其他创建型模式**：解决 `new` 所带来的耦合关系
>
> **Factory Method / Abstract Factory / Builder**：需要额外的工厂类负责实例化"易变对象"
>
> **Prototype**：通过原型（特殊工厂类）来克隆"易变对象"
>
> **演进路径**：遇到"易变类"时，通常从 **Factory Method** 开始，当遇到更多复杂变化时，再重构为其他三种工厂模式

### 使用建议

```
简单对象创建
    ↓
Factory Method (工厂方法)
    ↓
    ├── Abstract Factory (抽象工厂) - 产品族变化
    ├── Builder (建造者) - 构建过程变化
    └── Prototype (原型) - 克隆方式变化
```

---

## 二、结构型模式 (Structural Patterns)

**核心关注**：类和对象的组合关系

| 模式 | 核心作用 | 关键词 |
|------|----------|--------|
| **Adapter** | 转换接口 | 适配对接 |
| **Bridge** | 分离接口与实现 | 多维度变化 |
| **Composite** | 统一接口 | 树形结构，一对多转一对一 |
| **Decorator** | 扩展功能 | 稳定接口下动态扩展 |
| **Facade** | 简化接口 | 简化依赖关系 |
| **Flyweight** | 共享对象 | 优化存储 |
| **Proxy** | 增加间接层 | 灵活控制 |

### 李建忠老师总结

| 模式 | 关注点 | 典型应用 |
|------|--------|----------|
| 🔄 **Adapter** | 转换接口，将不吻合的接口适配对接 | 第三方库集成 |
| 🌉 **Bridge** | 分离接口与其实现，支持多维度变化 | 跨平台 UI |
| 🌳 **Composite** | 统一接口，将"一对多"转化为"一对一" | 树形结构菜单 |
| 🎁 **Decorator** | 稳定接口前提下为对象扩展功能 | IO 流处理 |
| 🏠 **Facade** | 简化接口，简化组件系统与外部依赖 | 复杂子系统简化 |
| 🪶 **Flyweight** | 保留接口，内部使用共享技术优化存储 | 文本编辑器字符对象 |
| 🔐 **Proxy** | 假借接口，增加间接层实现灵活控制 | 远程代理、虚拟代理 |

### 选择决策树

```
需要接口转换？
    YES → Adapter
    NO
        ↓
需要分离抽象与实现？
    YES → Bridge
    NO
        ↓
是树形结构？
    YES → Composite
    NO
        ↓
需要动态添加功能？
    YES → Decorator
    NO
        ↓
需要简化复杂接口？
    YES → Facade
    NO
        ↓
需要优化大量细粒度对象？
    YES → Flyweight
    NO
        ↓
需要增加控制层？
    YES → Proxy
```

---

## 三、行为型模式 (Behavioral Patterns)

**核心关注**：对象之间的通信和职责分配

### 3.1 算法与状态相关

| 模式 | 核心作用 | 关键词 |
|------|----------|--------|
| **Template Method** | 封装算法结构 | 算法子步骤变化 |
| **Strategy** | 封装算法 | 算法变化 |
| **State** | 封装状态相关行为 | 状态变化 |
| **Memento** | 封装对象状态变化 | 状态保存/恢复 |
| **Mediator** | 封装对象间交互 | 对象交互变化 |

### 3.2 责任与通信相关

| 模式 | 核心作用 | 关键词 |
|------|----------|--------|
| **Chain of Responsibility** | 封装对象责任 | 责任变化 |
| **Command** | 将请求封装为对象 | 请求变化 |
| **Iterator** | 封装集合内部结构 | 集合变化 |
| **Interpreter** | 封装特定领域变化 | 领域问题频繁变化 |
| **Observer** | 封装对象通知 | 通信对象变化 |
| **Visitor** | 封装对象操作变化 | 运行时动态添加操作 |

### 李建忠老师总结

#### 行为型模式（一）

| 模式 | 应用场景 | 典型例子 |
|------|----------|----------|
| 📋 **Template Method** | 算法结构稳定，子步骤变化 | 模板类定义流程 |
| 🎯 **Strategy** | 算法可替换 | 排序算法选择 |
| 🔄 **State** | 行为随状态改变 | 订单状态流转 |
| 💾 **Memento** | 需要保存/恢复状态 | 游戏存档、文本撤销 |
| 🤝 **Mediator** | 对象间复杂交互 | 聊天室中介 |

#### 行为型模式（二）

| 模式 | 应用场景 | 典型例子 |
|------|----------|----------|
| ⛓️ **Chain of Responsibility** | 责任链处理 | 审批流程 |
| 📦 **Command** | 请求封装与排队 | 宏命令、 undo/redo |
| 🔍 **Iterator** | 遍历集合 | foreach 遍历 |
| 📖 **Interpreter** | 特定领域语言 | SQL 解析器 |
| 👀 **Observer** | 一对多通知 | 事件驱动、发布订阅 |
| 🎭 **Visitor** | 操作频繁变化 | 编译器语法树遍历 |

---

## 设计模式应用原则

### 核心原则

| 原则 | 说明 |
|------|------|
| 1️⃣ **变化驱动** | 设计模式建立在变化点基础上，哪里有变化点，哪里应用设计模式 |
| 2️⃣ **演化获得** | 设计模式应以演化方式获得，系统变化点需经不断演化才能精确定位 |
| 3️⃣ **不为模式而模式** | 设计模式是软力量，不是硬标准，不应夸大其作用 |

### 常见误区

| 误区 | 说明 |
|------|------|
| ❌ **过度设计** | 在简单系统中强行应用复杂模式 |
| ❌ **模式堆砌** | 为了使用模式而使用模式 |
| ❌ **忽视演化** | 一开始就设计所有模式，而非随需求演化 |
| ❌ **机械套用** | 不理解模式本质，机械地套用代码模板 |

### 正确姿势

```
识别变化点 → 简单设计 → 随演化重构 → 应用模式
    ↓           ↓          ↓           ↓
  哪里变化    先能工作   变化驱动   适时应用
```

---

## 学习资料

### PDF 速查卡

<div style="width: 100%;height: 600px; overflow: auto; border: 1px solid #ddd; border-radius: 8px;">
    <iframe src="/other/PdfDemo/viewer.html?pdf=designpatternscard.pdf" width="100%" height="100%" frameborder="0"></iframe>
</div>

*注：PDF 浏览览需要 HTML5 浏览器支持*

### 推荐资源

| 资源 | 链接 |
|------|------|
| 🐍 **Python 设计模式** | [github.com/faif/python-patterns](https://github.com/faif/python-patterns) |
| 📘 **.NET 设计模式** | [dofactory.com/net/design-patterns](http://www.dofactory.com/net/design-patterns) |
| 📖 **GoF 设计模式** | 《设计模式：可复用面向对象软件的基础》 |
| 🎓 **李建忠课程** | 《C# 面向对象设计模式纵横谈》 |

---

## 总结

### 23 种设计模式速记

```
【创建型 5】
Singleton - 单例
Factory Method - 工厂方法
Abstract Factory - 抽象工厂
Builder - 建造者
Prototype - 原型

【结构型 7】
Adapter - 适配器
Bridge - 桥接
Composite - 组合
Decorator - 装饰
Facade - 外观
Flyweight - 享元
Proxy - 代理

【行为型 11】
Template Method - 模板方法
Strategy - 策略
State - 状态
Memento - 备忘录
Mediator - 中介者
Chain of Responsibility - 职责链
Command - 命令
Iterator - 迭代器
Interpreter - 解释器
Observer - 观察者
Visitor - 访问者
```

### 核心思想

> **"识别变化，隔离变化，让变化的地方和不变的地方分离"**

设计模式的本质不是代码模板，而是**设计思想的传承**。

---

**持续学习，持续实践！** 📚
