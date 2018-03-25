---
layout: post
title: "Kettle Data Integration"
permalink:  "angular2-client-kettle-web-host"
date:   2017-12-31 00:00:00
categories: project
---

为指标平台补充数据集成的能力，近期研究了开源项目kettle，并基于kettle的API开发了Web版本：Kettle数据集成平台。  
方式：1.通过kettle客户端配置的转换或作业存储至DB的资源库，2.通过Kettle数据集成平台进行任务调度。  
特点：1.微服务架构。2.基于zookeeper，调度主机可支持多节点主机部署，分摊作业执行节点的压力。  
相关技术：Angular5 + Spring Boot + Dubbo + Zookeeper 等。  

<script src="/js/jquery.bxslider.min.js"></script>
<link href="/css/jquery.bxslider.css" rel="stylesheet" />

<ul class="bxslider">
  <li><img src="/images/dataintegration1.PNG" /></li>
  <li><img src="/images/dataintegration2.PNG" /></li>
  <li><img src="/images/dataintegration3.PNG" /></li>
  <li><img src="/images/dataintegration4.PNG" /></li>
  <li><img src="/images/dataintegration5.PNG" /></li>
</ul>

<script type="text/javascript">
	$(document).ready(function(){
  		$('.bxslider').bxSlider();
	});
</script>

演示程序：<a href="/files/NoDownload">NoPublic</a>  