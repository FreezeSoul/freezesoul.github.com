---
layout: post
title: "AmazingDashboard - 可扩展的数据可视化平台"
permalink:  "amazingdashboard-platform"
author: "FS.IO"
date:   2015-10-01 00:00:00
categories: project
---

## AmazingDashboard 指标可视化平台

本项目基于 **HTML5 + AngularJS** 的前端技术栈，结合 **Dubbo 微服务架构** 的后端服务，构建面向桌面/移动多端的数据可视化平台。

平台的核心特点是其**可扩展的插件化指标系统**，通过声明式配置即可新增图表控件，无需修改核心框架代码。
<img src="/images/dashboard1.jpg" width="100%">  
<img src="/images/dashboard2.png" width="100%"> 

<script src="/js/jquery.bxslider.min.js"></script>
<link href="/css/jquery.bxslider.css" rel="stylesheet" />

<ul class="bxsliderIndex">
  <li><img src="/images/dashboards/1.PNG" /></li>
  <li><img src="/images/dashboards/2.PNG" /></li>
  <li><img src="/images/dashboards/3.PNG" /></li>
  <li><img src="/images/dashboards/4.PNG" /></li>
  <li><img src="/images/dashboards/5.PNG" /></li>
  <li><img src="/images/dashboards/6.PNG" /></li>
  <li><img src="/images/dashboards/7.PNG" /></li>
  <li><img src="/images/dashboards/8.PNG" /></li>
</ul>

<script type="text/javascript">
	$(document).ready(function(){
  		$('.bxsliderIndex').bxSlider({
               maxSlides: 1,
  			slideWidth: 800,
  			infiniteLoop: false,
  			hideControlOnEnd: true,
  			responsive: true,
  			touchEnabled: true
          });
	});
</script>

前端程序：<a href="https://gitee.com/DataColour/DashboardClient">DashboardClient</a>
后端程序：<a href="https://gitee.com/DataColour/DashboardService">DashboardService</a>

---

## 技术架构

### 整体架构图

```
┌─────────────────────────────────────────────────────────┐
│                    前端展现层                            │
│  AngularJS 1.5 + RequireJS + Bootstrap + ECharts        │
├─────────────────────────────────────────────────────────┤
│  核心框架 (Core Framework)                               │
│  ├── 控件基类 (Chart Base)                              │
│  ├── 插件加载器 (Plugin Loader)                         │
│  ├── 布局管理器 (Layout Manager)                        │
│  ├── 数据代理 (Data Proxy)                              │
│  └── 事件总线 (Event Bus)                               │
├─────────────────────────────────────────────────────────┤
│  可扩展插件系统 (Plugin System)                          │
│  ├── ECharts 系列 (柱状图、饼图、仪表盘等)               │
│  ├── 通用控件 (标签、计数器、表格等)                     │
│  ├── 项目控件 (业务定制)                                │
│  └── 第三方集成 (D3.js、Three.js)                       │
├─────────────────────────────────────────────────────────┤
│  功能模块 (Modules)                                      │
│  ├── 设计器 (Editor) - 仪表盘设计                        │
│  ├── 播放器 (Player) - 仪表盘展示                        │
│  ├── 数据集 (DataSet) - 数据源配置                      │
│  ├── 模式 (Schema) - 数据结构定义                       │
│  └── 页面管理 (Page Management)                         │
└─────────────────────────────────────────────────────────┘
                         ↓ HTTP/JSON
┌─────────────────────────────────────────────────────────┐
│                    后端服务层                            │
│  Spring Boot + Dubbo + Zookeeper                        │
├─────────────────────────────────────────────────────────┤
│  Web 层 (dashboard-web)                                  │
│  ├── REST API                                            │
│  ├── JWT 认证                                           │
│  └── 文件上传                                           │
├─────────────────────────────────────────────────────────┤
│  服务层 (dashboard-service)                               │
│  ├── 图表服务 (Chart Service)                            │
│  ├── 页面服务 (Page Service)                             │
│  ├── 数据集服务 (DataSet Service)                        │
│  └── 数据源服务 (DataSource Service)                     │
├─────────────────────────────────────────────────────────┤
│  数据访问层 (dashboard-dao)                               │
│  └── MyBatis Mapper                                      │
├─────────────────────────────────────────────────────────┤
│  数据存储                                                │
│  ├── PostgreSQL/MySQL                                    │
│  ├── Redis (缓存)                                       │
│  └── Ehcache (本地缓存)                                  │
└─────────────────────────────────────────────────────────┘
```

### 项目结构

**前端 (ClientCode):**
```
ClientCode/
├── app/
│   ├── core/                  # 核心框架
│   │   ├── base.js           # 控件基类
│   │   ├── loader.js         # 插件加载器
│   │   ├── property.js       # 属性系统
│   │   └── layout-manager.js # 布局管理器
│   ├── plugins/              # 插件系统
│   │   ├── controls/         # 可视化控件
│   │   │   ├── echarts/      # ECharts 系列
│   │   │   ├── common/       # 通用控件
│   │   │   ├── project/      # 项目定制
│   │   │   └── demo/         # 演示控件
│   │   ├── config.json       # 控件注册表
│   │   └── require.js        # RequireJS 配置
│   ├── modules/              # AngularJS 模块
│   │   ├── editor/           # 设计器模块
│   │   ├── player/           # 播放器模块
│   │   ├── dataset/          # 数据集模块
│   │   └── schema/           # 数据模式模块
│   ├── layout/               # 布局系统
│   ├── views/                # 共享模板
│   └── main.js               # 应用入口
├── libs/                     # 第三方库
└── doc/                      # GitBook 文档
```

**后端 (DubboService):**
```
DubboService/
├── dashboard-parent/         # 父 POM
├── dashboard-api/            # 服务接口定义
├── dashboard-dao/            # 数据访问层
├── dashboard-service/        # Dubbo 服务提供者
└── dashboard-web/            # Web 服务消费者
```

---

## 前端：可扩展的插件系统

### 插件架构核心

平台的核心创新在于**声明式插件系统**。新增图表控件只需三个步骤：

1. 在 `plugins/controls/` 下创建控件目录
2. 编写 `manifest.json` 描述控件元数据
3. 在 `config.json` 中添加一行注册配置

### 控件基类设计

所有控件继承自统一的基类，定义了标准生命周期：

```javascript
var Chart = Base.extend({
    constructor: function (layout) { },

    // 初始化：控件挂载到 DOM
    init: function (element) {
        // 创建图表实例
    },

    // 加载示例数据（设计器预览）
    example: function () {
        this.setData(this.getMockData());
    },

    // 设置图表数据
    setData: function (data) {
        // 处理并渲染数据
    },

    // 设置配置项
    setOption: function (option) {
        // 更新图表配置
    },

    // 获取当前配置
    getOption: function () {
        // 返回配置对象
    },

    // 设置主题
    setTheme: function (theme) {
        // 切换视觉主题
    },

    // 响应式调整
    resize: function () {
        // 窗口大小变化时重绘
    },

    // 显示/隐藏加载状态
    showLoading: function () { },
    hideLoading: function () { },

    // 清理资源
    dispose: function () {
        // 销毁图表实例
    },

    // 获取 DOM 元素和图表实例
    getElement: function () { },
    getChart: function () { }
});
```

### 插件清单文件

**manifest.json** - 控件的"身份证"：

```json
{
  "uid": "ebar",
  "name": "柱状/折线/面积图",
  "icon": "images/icon.png",
  "version": "0.1.0",
  "description": "柱状、折线、面积、散点图四合一",
  "bootstrap": "ebar.js",
  "editorJs": "editor/editor.js",
  "editorTpl": "editor/editor.tpl.html",
  "editorCss": "editor/editor.css"
}
```

### 控件实现示例

```javascript
// ebar.js - ECharts 柱状图控件
define(['app/core/base'], function (Base) {
    return Base.extend({
        init: function (element) {
            this.element = element;
            this.chart = echarts.init(element[0]);
        },

        setData: function (data) {
            var option = this.buildOption(data);
            this.chart.setOption(option);
        },

        setOption: function (option) {
            this.chart.setOption(option);
        },

        resize: function () {
            this.chart.resize();
        },

        dispose: function () {
            this.chart.dispose();
        }
    });
});
```

### 属性系统 - 自动生成属性编辑器

平台最强大的特性是**属性元数据系统**，通过声明式配置自动生成属性编辑器：

```javascript
// echartsMeta.js - 属性定义
var property = {
    option: [
        {
            group: '标题',
            id: '34ed2334-8d25-4e24-bfc8-59a1ed4ee141',
            name: '主标题',
            type: 'text',
            value: '',
            default: '',
            link: 'title.text',  // 映射到 ECharts 配置路径
            tooltip: '主标题文本，支持使用 \\n 换行'
        },
        {
            group: '系列',
            id: 'series-type',
            name: '图表类型',
            type: 'select',
            value: 'bar',
            options: [
                { value: 'bar', label: '柱状图' },
                { value: 'line', label: '折线图' },
                { value: 'area', label: '面积图' }
            ],
            link: 'series[0].type'
        },
        {
            group: '生命周期',
            id: '___Control_Chart_Before_Init_Event',
            name: '初始化前执行脚本',
            type: 'script',  // 支持自定义 JavaScript!
            value: '',
            link: '__beforeInitScript'
        }
    ]
};
```

**属性类型支持：**
- `text` - 文本输入
- `number` - 数字输入
- `color` - 颜色选择器
- `select` - 下拉选择
- `checked` - 布尔值
- `colors` - 颜色数组
- `seriesBinding` - 数据绑定
- `script` - JavaScript 代码执行
- `textarea` - 多行文本

### 数据绑定系统

控件通过 `seriesBinding` 与后端数据集关联：

```javascript
{
    group: '数据绑定',
    id: 'series-binding',
    name: '序列绑定',
    type: 'seriesBinding',
    dataset: '',      // 数据集编码
    dimension: '',    // 维度列（X 轴）
    measure: '',      // 度量列（Y 轴）
    tooltip: '配置与数据集的绑定关系'
}
```

**数据流向：**
```
┌─────────────┐    HTTP     ┌──────────────┐    Dubbo    ┌──────────┐
│   前端控件   │ ────────► │ Web Controller │ ────────► │ Service  │
│             │            │                │            │          │
│ (setData)   │ ◄──────── │ JSON Response  │ ◄──────── │ MyBatis  │
└─────────────┘            └───────────────┘            └────┬─────┘
                                                             │
                                                             ▼
                                                       ┌──────────┐
                                                       │ Database │
                                                       └──────────┘
```

### 插件注册表

**config.json** - 所有控件的中央注册表：

```json
{
  "controls": [
    {
      "type": "ECharts 系列",
      "controls": [
        { "name": "ebar", "path": "controls/echarts/ebar" },
        { "name": "epie", "path": "controls/echarts/epie" },
        { "name": "egauge", "path": "controls/echarts/egauge" },
        { "name": "emap", "path": "controls/echarts/emap" }
      ]
    },
    {
      "type": "通用控件",
      "controls": [
        { "name": "simplelabel", "path": "controls/common/simplelabel" },
        { "name": "counter", "path": "controls/common/counter" },
        { "name": "datatable", "path": "controls/common/datatable" }
      ]
    },
    {
      "type": "演示控件",
      "controls": [
        { "name": "wordcloud", "path": "controls/demo/wordcloud" },
        { "name": "3dscatter", "path": "controls/demo/3dscatter" }
      ]
    }
  ]
}
```

### 动态加载机制

```javascript
// loader.js - 插件动态加载
function loadPluginModule(name) {
    // 从 LocalStorage 缓存读取清单
    var manifests = getCachedManifests();

    // 查找目标插件
    var module = _.find(manifests, function (manifest) {
        return manifest.uid === name;
    });

    // RequireJS 按需加载
    require([module.bootstrap], function (bootstrap) {
        // 返回控件类和配置
        deferred.resolve(bootstrap, module);
    });
}
```

### RequireJS 模块管理系统

RequireJS 是整个前端项目的模块加载核心，负责管理所有第三方库和业务模块的依赖关系。

#### RequireJS 配置

**require.js** - 主配置文件：

```javascript
require.config({
    baseUrl: '.',              // 基础路径
    urlArgs: 'v=' + version,   // 版本号防缓存

    // 第三方库路径映射
    paths: {
        // 核心库
        'jquery': 'libs/jquery/jquery-2.2.4.min',
        'bootstrap': 'libs/bootstrap/bootstrap-3.3.7.min',

        // AngularJS 系列
        'angular': 'libs/angular/angular-1.5.11.min',
        'angular-animate': 'libs/angular/angular-animate-1.5.11.min',
        'angular-ui-router': 'libs/angular/angular-ui-router-0.3.2.min',

        // ECharts 可视化
        'echarts': 'libs/echarts/echarts-3.4.0.min',
        'echarts-gl': 'libs/echarts/echarts-gl-1.0.0.min',

        // 工具库
        'underscore': 'libs/underscore/underscore-1.8.3.min',
        'moment': 'libs/moment/moment-2.18.1.min',

        // 其他组件
        'jquery-ui': 'libs/jqueryui/jquery-ui-1.12.1.min',
        'bxslider': 'libs/bxslider/jquery.bxslider.min'
    },

    // Shim 配置：非 AMD 模块适配
    shim: {
        'jquery': {
            exports: '$'
        },
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        'angular': {
            exports: 'angular',
            deps: ['jquery']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-ui-router': {
            deps: ['angular']
        },
        'echarts': {
            exports: 'echarts'
        },
        'underscore': {
            exports: '_'
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        'bxslider': {
            deps: ['jquery']
        }
    }
});
```

#### 应用启动流程

**bootstrap.js** - 顺序加载引导：

```javascript
// 关键脚本必须按顺序加载
var scripts = [
    'app/core/assign.js',          // ES6 Object.assign polyfill
    'app/core/require.js',          // 自定义 Require 扩展
    'app/plugins/require.js'        // 插件配置加载
];

loadScriptsInOrder(scripts).then(function() {
    // 所有依赖加载完成后，启动 RequireJS
    loadJs({
        'src': 'libs/requirejs/require.js',
        'data-main': 'require.js'   // 入口配置文件
    });
});
```

#### 模块定义模式

**AMD 模块定义**：

```javascript
// 方式一：简化 CommonJS 风格
define(['jquery', 'underscore', './utils'], function ($, _, utils) {
    // 模块代码
    return {
        init: function () { }
    };
});

// 方式二：依赖数组 + 工厂函数
define(['app/core/base'], function (Base) {
    return Base.extend({
        init: function (element) {
            // 控件初始化
        }
    });
});

// 方式三：命名模块（插件推荐）
define('controls/echarts/ebar', [
    'echarts',
    'app/core/base'
], function (echarts, Base) {
    // 控件实现
});
```

#### AngularJS 与 RequireJS 集成

**模块懒加载** - 使用 ocLazyLoad：

```javascript
// router.js - 路由配置
app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('editor', {
            url: '/editor',
            lazyModule: 'ad.editor',           // 目标模块名
            lazyFiles: [                       // 需要加载的文件
                'app/modules/editor/define',
                'app/modules/editor/controllers/editor',
                'app/modules/editor/directives/sidebar',
                'app/modules/editor/services/pageService'
            ],
            lazyTemplateUrl: 'app/modules/editor/views/editor.tpl.html',
            resolve: {
                // 通过 ocLazyLoad 动态加载
                load: ['$ocLazyLoad', '$q', function ($ocLazyLoad, $q) {
                    var deferred = $q.defer();
                    require(this.lazyFiles, function () {
                        deferred.resolve();
                    });
                    return deferred.promise;
                }]
            }
        });
}]);
```

#### 依赖管理策略

**libs/ 目录结构**：

```
libs/
├── jquery/
│   └── jquery-2.2.4.min.js
├── bootstrap/
│   └── bootstrap-3.3.7.min.js
├── angular/
│   ├── angular-1.5.11.min.js
│   ├── angular-animate-1.5.11.min.js
│   └── angular-ui-router-0.3.2.min.js
├── echarts/
│   ├── echarts-3.4.0.min.js
│   └── echarts-gl-1.0.0.min.js
├── requirejs/
│   └── require.js
└── underscore/
    └── underscore-1.8.3.min.js
```

**Bower 管理依赖** (bower.json)：

```json
{
  "name": "dashboard-client",
  "dependencies": {
    "jquery": "~2.2.4",
    "bootstrap": "~3.3.7",
    "angular": "~1.5.11",
    "angular-animate": "~1.5.11",
    "angular-ui-router": "~0.3.2",
    "underscore": "~1.8.3",
    "requirejs": "~2.3.5",
    "echarts": "~3.4.0",
    "moment": "~2.18.1"
  }
}
```

#### 插件按需加载

**插件配置加载** (plugins/require.js)：

```javascript
// 加载所有控件的 manifest.json
require(['plugins/config.json'], function (config) {
    config.controls.forEach(function (group) {
        group.controls.forEach(function (control) {
            // 动态构建插件路径
            var path = 'plugins/' + control.path + '/manifest.json';
            require([path], function (manifest) {
                // 缓存到 LocalStorage
                cacheManifest(manifest);
            });
        });
    });
});
```

#### 循环依赖处理

**延迟初始化模式**：

```javascript
// 避免 A 依赖 B，B 又依赖 A 的情况
define(['jquery', 'app/core/manager'], function ($, manager) {
    var instance;

    function getInstance() {
        if (!instance) {
            instance = {
                init: function () {
                    // 延迟获取依赖
                    var dep = manager.getDependency();
                }
            };
        }
        return instance;
    }

    return getInstance();
});
```

#### 模块缓存清理

**开发环境热更新**：

```javascript
// 开发模式下禁用缓存
if (DEBUG_MODE) {
    require.config({
        urlArgs: 't=' + new Date().getTime()
    });

    // 清除指定模块缓存
    function invalidateModule(moduleId) {
        require.undef(moduleId);
    }
}
```

### RequireJS 管理优势

| 特性          | 实现方式                   |
| ------------- | -------------------------- |
| **按需加载**  | 控件仅在首次使用时加载     |
| **依赖管理**  | 自动解析模块依赖关系       |
| **版本控制**  | urlArgs 统一版本号管理     |
| **缓存策略**  | LocalStorage 缓存 manifest |
| **循环依赖**  | 延迟初始化模式解决         |
| **Shim 适配** | 非模块库兼容处理           |

---

## 后端：Dubbo 微服务架构

### 服务提供者配置

```java
// dashboard-service - Dubbo 服务提供者
@Service(interfaceClass = AdChartService.class)
@CacheConfig(cacheNames = "chart")
public class AdChartServiceImpl implements AdChartService {

    @Autowired
    private AdChartMapper adChartMapper;

    @Cacheable(key = "'chartId:' + #chartId")
    public AdChart selectByPrimaryKey(Integer chartId) {
        return adChartMapper.selectByPrimaryKey(chartId);
    }

    @Cacheable(key = "'allCharts'")
    public List<AdChart> selectAdCharts() {
        return adChartMapper.selectAdCharts();
    }
}
```

**application.properties:**
```properties
server.port=8787

# Dubbo 提供者配置
spring.dubbo.application.name=dashboard-service
spring.dubbo.protocol.name=dubbo
spring.dubbo.protocol.port=20880
spring.dubbo.registry.protocol=zookeeper
spring.dubbo.registry.address=127.0.0.1:2181
spring.dubbo.base-package=org.dashboard.service.impl
spring.dubbo.provider.timeout=60000
```

### 服务消费者配置

```java
// dashboard-web - REST API 层
@RestController
@RequestMapping("/chart/chart")
public class AdChartController {

    @Reference  // Dubbo 远程服务注入
    private AdChartService adChartService;

    @RequestMapping("/get")
    public JsonResponse getAllCharts() {
        List<AdChart> charts = adChartService.selectAdCharts();
        return JsonResponse.success(charts);
    }

    @RequestMapping("/search")
    public JsonResponse searchCharts(
        @RequestParam int page,
        @RequestParam int rows) {

        PageInfo<AdChart> pageInfo =
            adChartService.selectAdChartsByPage(page, rows);
        return JsonResponse.success(pageInfo);
    }
}
```

**application.properties:**
```properties
server.port=8888

# Dubbo 消费者配置
spring.dubbo.application.name=dashboard-web
spring.dubbo.registry.protocol=zookeeper
spring.dubbo.registry.address=127.0.0.1:2181
spring.dubbo.consumer.timeout=60000
spring.dubbo.consumer.check=false
```

### 服务分层架构

```
┌─────────────────────────────────────────┐
│   dashboard-web :8888                   │
│   ┌──────────────┬──────────────┐       │
│   │ Controllers  │   JWT Filter │       │
│   └──────┬───────┴──────────────┘       │
│          │ @Reference                   │
│          ▼                              │
│   ┌──────────────────────────────┐     │
│   │ Dubbo Service Reference      │     │
│   └──────────────────────────────┘     │
└─────────────────────────────────────────┘
                  │ Dubbo RPC (Hessian)
┌─────────────────────────────────────────┐
│   dashboard-service :8787               │
│   ┌──────────────────────────────┐     │
│   │ @Service Providers            │     │
│   │ ├── ChartServiceImpl          │     │
│   │ ├── PageServiceImpl           │     │
│   │ ├── DataSetServiceImpl        │     │
│   │ └── DataSourceServiceImpl     │     │
│   └──────┬────────────────────────┘     │
│          │ @Autowired                   │
│          ▼                              │
│   ┌──────────────────────────────┐     │
│   │ MyBatis Mapper               │     │
│   └──────┬───────────────────────┘     │
└─────────┼───────────────────────────────┘
          │ SQL
┌─────────▼──────────┐
│   PostgreSQL       │
│   ┌────────────┐   │
│   │ ad_chart   │   │
│   │ ad_page    │   │
│   │ ad_dataset │   │
│   └────────────┘   │
└────────────────────┘

     Zookeeper :2181
     ┌───────────────┐
     │ Service Registry│
     └───────────────┘
```

### 数据模型

```java
// 图表配置存储
public class AdChart {
    private Integer chartId;          // 图表 ID
    private String chartName;         // 图表名称
    private String chartTypeId;       // 控件类型 UID
    private String chartConfig;       // JSON 配置
    private Integer folderId;         // 所属文件夹
    private Date createTime;          // 创建时间
    private Date updateTime;          // 更新时间
}

// chartConfig 存储内容
{
  "Option": { /* ECharts 配置对象 */ },
  "Binding": [
    {
      "DataSetCode": "ds001",
      "Dimensions": [
        { "Code": "col1", "Column": "地区" }
      ],
      "Measures": [
        { "Code": "col2", "Column": "销售额" }
      ]
    }
  ],
  "Extend": {
    "option": [ /* 属性编辑器配置 */ ]
  }
}
```

### 缓存策略

```java
@CacheConfig(cacheNames = "chart")
public class AdChartServiceImpl implements AdChartService {

    // Redis 缓存 + Ehcache 本地缓存
    @Cacheable(key = "'chartId:' + #chartId")
    public AdChart selectByPrimaryKey(Integer chartId) {
        return adChartMapper.selectByPrimaryKey(chartId);
    }

    @CacheEvict(key = "'chartId:' + #chart.chartId")
    public int updateByPrimaryKey(AdChart chart) {
        return adChartMapper.updateByPrimaryKey(chart);
    }
}
```

---

## 关键技术特性

### 前端技术栈

| 技术            | 版本  | 用途         |
| --------------- | ----- | ------------ |
| **AngularJS**   | 1.5.x | SPA 框架     |
| **RequireJS**   | 2.3.x | AMD 模块加载 |
| **UI-Router**   | 0.2.x | 路由管理     |
| **Bootstrap**   | 3.x   | UI 框架      |
| **ECharts**     | 3.x   | 数据可视化   |
| **jQuery**      | 2.x   | DOM 操作     |
| **OC-LazyLoad** | 1.x   | 懒加载模块   |

### 后端技术栈

| 技术            | 版本   | 用途         |
| --------------- | ------ | ------------ |
| **Spring Boot** | 1.5.10 | 应用框架     |
| **Dubbo**       | 2.5.10 | RPC 框架     |
| **Zookeeper**   | 3.4.10 | 服务注册中心 |
| **MyBatis**     | 3.x    | ORM 框架     |
| **Redis**       | 3.x    | 分布式缓存   |
| **Ehcache**     | 2.x    | 本地缓存     |
| **PostgreSQL**  | 9.x    | 关系型数据库 |

### 核心特性

| 特性               | 实现方案                 |
| ------------------ | ------------------------ |
| **可扩展控件系统** | 声明式插件 + 属性元数据  |
| **按需加载**       | RequireJS + OC-LazyLoad  |
| **数据绑定**       | DataSet + SeriesBinding  |
| **属性编辑器**     | 自动生成 + 生命周期脚本  |
| **微服务架构**     | Dubbo + Zookeeper        |
| **缓存策略**       | Redis + Ehcache 二级缓存 |
| **认证授权**       | JWT Token                |
| **离线支持**       | IndexedDB + LocalStorage |

---

## 平台优势

### 1. 真正的插件化架构

新增图表控件无需修改核心代码：
- 创建控件目录和 manifest.json
- 实现基类方法
- 在 config.json 注册

### 2. 属性驱动的编辑器

通过属性元数据自动生成配置界面：
- 支持多种数据类型
- 支持自定义脚本注入
- 支持生命周期钩子

### 3. 微服务可扩展性

Dubbo 架构带来的优势：
- 服务独立部署
- 水平扩展能力
- 服务注册发现
- 负载均衡

### 4. 完善的文档体系

GitBook 格式的插件开发文档：
- `plugin-intro.html` - 插件开发入门
- `plugin-conf.html` - 配置文件说明
- `plugin-review.html` - 开发规范
- `explain-*.html` - 技术细节

---

## 技术背景 (2015)

这个项目诞生于 2015 年，采用了当时主流的技术方案：

**前端领域：**
- AngularJS 1.x 仍是 SPA 开发主流
- React 刚刚兴起，尚未普及
- Vue.js 还未发布
- Webpack 尚未成为标准
- ES6 modules 尚未得到浏览器支持

**后端领域：**
- Spring Boot 1.x 是微服务首选
- Dubbo 是阿里开源的成熟 RPC 框架
- Spring Cloud 尚未成熟
- Kubernetes 刚刚开源

在那个时代，这个架构选择是**务实且先进的**。

---

## 总结

AmazingDashboard 是一个**设计精良的数据可视化平台**，其核心价值在于：

1. **可扩展的插件系统** - 通过声明式配置即可扩展
2. **属性元数据驱动** - 自动生成配置界面
3. **微服务架构支撑** - Dubbo 提供可靠的服务治理
4. **完善的文档体系** - 降低插件开发门槛

这套架构在 2015 年是一个**成熟且具有前瞻性的解决方案**，为数据可视化领域提供了一个可参考的实践范例。
