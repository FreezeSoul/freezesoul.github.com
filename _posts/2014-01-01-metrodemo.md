---
layout: post
title: "Metro Dashboard Demo - Metro风格Dashboard演示"
permalink:  "metro-dashboard-demo"
author: "FS.IO"
date:   2014-01-01 00:00:00
categories: language
tags: [JavaScript, 前端开发, Dashboard]
---

这是之前花了1-2天时间完成一个Metro风格的Dashboard 高保真Demo效果，单看效果还不错，推介一下。
演示主要用到了两个重要插件:

1. gridster <a href="http://gridster.net">link</a>(下面演示中，点击详情页可查看效果)
2. gridList <a href="https://github.com/hootsuite/grid">link</a>(下面演示中，首页即是效果)
   
其中1只支持纵向扩展，并不太符合Metro风格，2虽然支持横向扩展，但本身有些不完善，在<a href="https://github.com/hootsuite/grid/issues/38">github issues</a>提出了建议，但由于项目紧迫，就临时做了补丁式完善。

---

效果如下：

<div style="width: 100%;height: 600px; overflow: hidden">
    <iframe src="/other/MetroTest/index.html" width="100%" height="100%" frameborder="0"></iframe>
</div>

<div style="width: 100%;height: 600px; overflow: hidden">
    <iframe src="/other/MetroTest/index-linkpage.html" width="100%" height="100%" frameborder="0"></iframe>
</div>

---

## Metro风格快速实现的技术方案

在 Windows 8 发布后的 2013-2014 年间，Metro 设计风格（后更名为 Modern UI）在前端领域相当流行。

### 技术栈选择

```
┌─────────────────────────────────────┐
│         Metro Dashboard              │
├─────────────────────────────────────┤
│  Gridster / GridList (拖拽网格)      │
│  ├── 碰撞检测                        │
│  ├── 动态布局                        │
│  └── 拖拽调整                        │
├─────────────────────────────────────┤
│  jQuery 1.11 + jQuery UI            │
│  ├── DOM 操作                        │
│  └── 交互事件                        │
├─────────────────────────────────────┤
│  Highcharts 3D / ECharts            │
│  └── 图表渲染                        │
├─────────────────────────────────────┤
│  CSS3 Transforms + Animations       │
│  ├── 3D 翻转入场                     │
│  ├── 悬停缩放                        │
│  └── 过渡动画                        │
└─────────────────────────────────────┘

```

### 核心实现要点

#### 1. 字体与色彩系统

Metro 风格的识别度很大程度上来自于 Microsoft 的官方字体和配色：

```css
/* 使用 Segoe UI 获得原生 Windows 感觉 */
font-family: "Segoe UI", "Segoe UI Web Regular",
             "Segoe UI Symbol", "Helvetica Neue",
             "Microsoft YaHei", sans-serif;

/* 扁平化高饱和度色彩 */
background-color: #00AAEF; /* 蓝色 */
background-color: #42B618; /* 绿色 */
background-color: #F78E00; /* 橙色 */
background-color: #D62C29; /* 红色 */

```

这个方案的优势在于：
- **Segoe UI** 是 Windows 系统字体，无需额外加载
- **纯色背景** 配合 CSS3，无需图片资源
- 通过 CSS 类即可快速切换主题色彩

#### 2. 磁贴入场动画

使用 CSS3 3D Transform 实现磁贴翻转效果：

```css
/* 初始状态：沿 Y 轴旋转 90 度（不可见） */
.unloaded {
    opacity: 0;
    -webkit-transform: rotateY(-90deg);
}

/* 过渡动画 */
.animation {
    -webkit-transition: opacity 0.3s, -webkit-transform 0.3s;
    -webkit-filter: blur(2px);
}

```

配合 JavaScript 实现交错入场：

```javascript
// 每个磁贴延迟 100ms，形成流畅的级联效果
$("ul li .content").each(function(index) {
    setTimeout(function() {
        $(this).removeClass("unloaded");
    }, 100 * index);
});

```

#### 3. 横向滚动体验

Metro 风格的特色之一是横向滚动：

```javascript
// 鼠标滚轮横向滚动（Ctrl + 滚轮恢复纵向）
$("body").mousewheel(function(event, delta) {
    if (event.ctrlKey) {
        this.scrollTop -= (delta * 100);
    } else {
        $(this).animate({
            scrollLeft: this.scrollLeft - (delta * 100)
        }, 30);
    }
    event.preventDefault();
});

```

#### 4. Gridster 网格布局配置

```javascript
$(".gridster ul").gridster({
    widget_base_dimensions: [100, 80],
    widget_margins: [5, 5],
    autogrow_cols: true,
    helper: 'clone',
    draggable: {
        handle: 'div.header'  // 仅通过标题栏拖拽
    },
    resize: {
        enabled: true,
        max_size: [6, 6],
        min_size: [1, 1],
        stop: function(e, ui, $widget) {
            // 调整大小时重建图表
            var id = $widget.find("div.content").attr("id");
            eval("Demo.BuildChart" + id + "()");
        }
    }
});

```

#### 5. 悬停交互效果

```css
div.widget:hover {
    z-index: 10;
    border: 3px solid rgba(255, 255, 255, 0.4);
    -webkit-transform: scale(1.05);  /* 轻微放大 */
}

```

---

## 相关布局组件推荐

除了 Demo 中使用的 Gridster 和 GridList，还有许多优秀的 JavaScript 布局组件可供选择：

### 拖拽网格类

| 组件 | 特点 | 适用场景 |
|------|------|----------|
| [Gridstack.js](https://github.com/troolee/gridstack.js) | 支持 Bootstrap V3、响应式、触屏设备 | 现代 Dashboard |
| [Packery](https://github.com/metafizzy/packery) | 使用 bin-packing 算法实现无缝隙布局 | 瀑布流、图片画廊 |
| [jQuery Gridly](https://github.com/ksylvest/jquery-gridly) | 拖拽、交换、删除、调整大小 | 灵活布局 |
| [Dazzle](https://github.com/Raathigesh/dazzle) | React 专用、UI 框架无关 | React 项目 |

### 瀑布流类

| 组件 | 特点 | 适用场景 |
|------|------|----------|
| [Masonry](https://github.com/desandro/masonry) | 去除不同高度元素间的空白 | 图片画廊、电商站点 |
| [Freewall](https://github.com/kingshocc/freewall) | 跨浏览器、响应式、CSS3 动画、支持 Metro 风格 | 多类型网格布局 |
| [Wookmark](https://github.com/GBKS/Wookmark-jQuery) | 瀑布流布局 | 图片列表 |
| [Minigrid](https://github.com/henryqiao/minigrid) | 零依赖、仅 2KB | 轻量级项目 |

### 高度对齐类

| 组件 | 特点 |
|------|------|
| [MatchHeight.js](https://github.com/liabru/jquery-match-height) | 使元素高度相等，处理混合 padding、margin |
| [Equal Height Blocks](https://github.com/mattbanks/Equal-Height-Blocks) | 响应式、高度统一 |

### Angular/React 专用

| 组件 | 框架 | 特点 |
|------|------|------|
| [Angular-Gridster](https://github.com/ManifestWebDesign/angular-gridster) | Angular | 双向数据绑定 |
| [Dazzle](https://github.com/Raathigesh/dazzle) | React | 网格布局、组件化 |

选择建议：
- **jQuery 项目**：Gridstack.js 是 Gridster 的现代替代品，文档更完善
- **React 项目**：推荐 Dazzle，组件化更友好
- **轻量级需求**：Minigrid 仅 2KB，无外部依赖
- **瀑布流需求**：Masonry 是经典选择，Freewall 功能更丰富

程序代码：<a href="https://github.com/FreezeSoul/MetroWebDashboard">Github Link</a>

