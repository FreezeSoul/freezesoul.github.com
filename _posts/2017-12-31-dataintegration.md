---
layout: post
title: "Kettle Data Integration"
permalink:  "angular2-client-kettle-web-host"
date:   2017-12-31 00:00:00
categories: project
---

为指标平台补充数据集成的能力，近期研究了开源项目kettle，并基于kettle的API开发了Web版本：Kettle数据集成平台。  

介绍：  
数据集成平台是可视化数据平台的重要组成部分，作为平台的数据处理引擎，充当了ETL的角色。  
其分为两个组件：可视化作业设计器与作业调度管理系统。  
1. 作业设计器通过可视化的方式，以数据流为导向，通过建立相关的作业，可对业务分析模型所需的数据进行抽取、清洗等处理，功能强大、可灵活扩展（支持Hadoop）。  
2. 作业调度系统可对于设计器所以建立的作业进行调度执行，对于多作业场景，支持多执行节点部署，并可监控作业执行情况。  

方式：  
1. 通过kettle客户端配置的转换或作业存储至DB的资源库。  
2. 通过Kettle数据集成平台进行任务调度。  

特点：  
1. 微服务架构，基于Spring Boot + Dubbo。  
2. 基于zookeeper api，调度主机可支持多节点主机部署，分摊作业执行节点的压力。  

相关技术：Angular5 + Spring Boot + Dubbo + Zookeeper 等。  

<script src="/js/jquery.bxslider.min.js"></script>
<link href="/css/jquery.bxslider.css" rel="stylesheet" />

<ul class="bxsliderData">
  <li><img src="/images/dataintegration1.png" /></li>
  <li><img src="/images/dataintegration2.png" /></li>
  <li><img src="/images/dataintegration3.png" /></li>
  <li><img src="/images/dataintegration4.png" /></li>
  <li><img src="/images/dataintegration5.png" /></li>
</ul>

<script type="text/javascript">
	$(document).ready(function(){
  		$('.bxsliderData').bxSlider();
	});
</script>

演示程序：<a href="/files/NoDownload">NoPublic</a>  