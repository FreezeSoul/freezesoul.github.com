---
layout: post
title: "基于 T4 模板的 MSSQL 代码生成器"
permalink: "t4-mssql-codegenerator"
author: "FS.IO"
date: 2011-01-01 00:00:00
categories: project
tags: [.NET, T4, 代码生成, MSSQL, 三层架构]
---

## 项目简介

这是一个基于 **MSSQL Server** 和 **T4 模板** 的代码生成器，通过逆向数据库结构，快速生成三层架构代码和 CRUD SQL 脚本，帮助团队提高开发效率。

---

## 什么是 T4 模板？

**T4 (Text Template Transformation Toolkit)** 是微软官方的代码生成工具，内置于 Visual Studio。

### T4 的优势

| 特性 | 说明 |
|------|------|
| 🔧 **Visual Studio 集成** | 无需额外安装，开箱即用 |
| 🎯 **灵活强大** | 支持复杂的代码生成逻辑 |
| 📝 **语法简单** | 类似 ASP.NET 的模板语法 |
| 🔄 **可维护** | 模板与代码分离，易于维护和定制 |

### T4 模板示例

```t4
<#@ template language="C#" #>
<#@ assembly name="System.Core" #>
<#@ import namespace="System.Collections.Generic" #>

<#= DateTime.Now.ToString("yyyy-MM-dd") #>
// 自动生成的代码，请勿手动修改

namespace <#= Namespace #>
{
    public class <#= ClassName #>
    {
        <# foreach(var prop in Properties) { #>
        public <#= prop.Type #> <#= prop.Name #> { get; set; }
        <# } #>
    }
}
```

---

## 代码生成器功能

### 核心功能

| 功能 | 说明 |
|------|------|
| 🔗 **数据库连接** | 支持 MSSQL Server 数据库连接 |
| 🔍 **表结构逆向** | 自动读取表结构、字段、类型、注释 |
| 📄 **多层代码生成** | 一键生成 Model、DAL、BLL 层代码 |
| 🗃️ **SQL 脚本生成** | 自动生成 CRUD 存储过程和 SQL |
| ⚙️ **模板定制** | 支持自定义 T4 模板 |

### 生成的内容

#### 1. 三层架构代码

```
├── Models/           # 实体模型层
│   └── User.cs
├── DAL/              # 数据访问层
│   ├── UserDal.cs
│   └── SqlHelper.cs
├── BLL/              # 业务逻辑层
│   └── UserBll.cs
└── SQL/              # SQL 脚本
    ├── User_Insert.sql
    ├── User_Update.sql
    ├── User_Delete.sql
    └── User_Get.sql
```

#### 2. 自动生成的代码特性

- ✅ 实体类包含所有字段的属性映射
- ✅ DAL 层包含完整的 CRUD 方法
- ✅ BLL 层提供业务逻辑封装
- ✅ SQL 脚本支持增删改查操作
- ✅ 代码风格统一，减少人为差异

---

## 界面截图

### 主界面 - 数据库连接与表选择

<img src="/images/codegenerate.png" alt="代码生成器主界面" style="border-radius: 8px; width: 100%;" />

### 代码预览 - 生成结果展示

<img src="/images/codegenerate2.png" alt="代码生成预览" style="border-radius: 8px; width: 100%;" />

---

## 使用场景

### 适合的项目

| 场景 | 说明 |
|------|------|
| 🏢 **传统企业项目** | 使用 MSSQL + 三层架构的项目 |
| 🚀 **快速原型开发** | 需要快速搭建数据访问层 |
| 📊 **CRUD 密集型** | 大量数据表的增删改查操作 |
| 👥 **团队协作** | 统一代码风格，提高协作效率 |

### 解决的问题

- ❌ **重复劳动**：不再手动编写重复的 CRUD 代码
- ❌ **命名不统一**：自动生成规范化的命名
- ❌ **容易出错**：减少手写代码的拼写错误
- ❌ **效率低下**：分钟级完成天级的工作量

---

## 技术架构

### 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| .NET Framework | 3.5+ | 运行时环境 |
| T4 Template | - | 代码生成引擎 |
| ADO.NET | - | 数据库访问 |
| Windows Forms | - | UI 界面 |

### 核心流程

```mermaid
graph LR
    A[连接数据库] --> B[读取表结构]
    B --> C[加载 T4 模板]
    C --> D[执行模板转换]
    D --> E[生成代码文件]
    E --> F[保存到指定目录]
```

---

## 快速开始

### 1. 配置数据库连接

```xml
<connectionStrings>
    <add name="CodeGeneratorDB"
         connectionString="Server=localhost;Database=MyDB;User Id=sa;Password=***;"
         providerName="System.Data.SqlClient" />
</connectionStrings>
```

### 2. 选择要生成的表

连接数据库后，勾选需要生成代码的表。

### 3. 选择模板并生成

选择对应的模板类型（三层架构 / SQL 脚本），点击生成按钮。

### 4. 查看生成结果

在预览窗口查看生成的代码，确认无误后保存到项目目录。

---

## 项目地址

完整源代码已开源，欢迎 Star 和 Fork：

**GitHub**: [https://github.com/FreezeSoul/CodeGenerator](https://github.com/FreezeSoul/CodeGenerator)

### 功能概览

- 📦 开箱即用的代码生成器
- 🎨 可视化操作界面
- 📝 内置三层架构模板
- 🔄 支持自定义模板扩展
- 📄 SQL 脚本自动生成

---

## 总结

这个代码生成器是早期项目中的实用工具，通过 T4 模板的强大能力，将重复的代码编写工作自动化，让开发者可以更专注于业务逻辑的实现。

> **核心价值**：用最少的时间，做最多的事情。

---

**欢迎使用和反馈！** 如果你觉得有用，请给个 Star ⭐
