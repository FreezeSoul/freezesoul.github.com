---
layout: post
title: "Design Patterns Intro"
permalink:  "design-patterns-intro"
date:   2012-06-01 00:00:00
categories: architecture
---

设计模式回顾：  

设计模式总结 By李建忠老师  

创建型模式  
" Singleton模式解决的是实体对象个数的问题。除了Singleton之外，其他创建型模式解决的都是new所带来的耦合关系。  
" Factory Method, Abstract Factory, Builder都需要一个额外的工厂类来负责实例化“易变对象”，而Prototype则是通过原型（一个特殊的工厂类）来克隆“易变对象”。  
" 如果遇到“易变类”，起初的设计通常从FactoryMethod开始，当遇到更多的复杂变化时，再考虑重构为其他三种工厂模式（ Abstract Factory,Builder ， Prototype ）。  
   
结构型模式  
" Adapter模式注重转换接口，将不吻合的接口适配对接  
" Bridge模式注重分离接口与其实现，支持多维度变化  
" Composite模式注重统一接口，将“一对多”的关系转化为“一对一”的关系  
" Decorator模式注重稳定接口，在此前提下为对象扩展功能  
" Facade模式注重简化接口，简化组件系统与外部客户程序的依赖关系  
" Flyweight 模式注重保留接口，在内部使用共享技术对对象存储进行优化  
" Proxy 模式注重假借接口，增加间接层来实现灵活控制  
   
行为型模式（1）  
" Template Method模式封装算法结构，支持算法子步骤变化  
" Strategy模式注重封装算法，支持算法的变化  
" State模式注重封装与状态相关的行为，支持状态的变化  
" Memento模式注重封装对象状态变化，支持状态保存/恢复  
" Mediator模式注重封装对象间的交互，支持对象交互的变化  
   
行为型模式（2）  
" Chain Of Responsibility模式注重封装对象责任，支持责任的变化  
" Command模式注重将请求封装为对象，支持请求的变化  
" Iterator 模式注重封装集合对象内部结构，支持集合的变化  
" Interpreter模式注重封装特定领域变化，支持领域问题的频繁变化  
" Observer模式注重封装对象通知，支持通信对象的变化  
" Visitor模式注重封装对象操作变化，支持在运行时为类层次结构动态添加新的操作。  
   
设计模式应用总结：  
1.设计模式建立在对象对系统变化点的基础上进行，哪里有变化点，哪里应用设计模式。  
2.设计模式应该以演化的方式来获得，系统的变化点往往是经过不断演化才能精确定位。  
3.不能为了模式而模式，设计模式是一种软件设计的软力量，而非规标准，不应夸大设计模式的作用。  


<div style="width: 100%;height: 600px; overflow: hidden">
    <iframe src="/other/PdfDemo/viewer.html?pdf=designpatternscard.pdf" width="100%" height="100%" frameborder="0"></iframe>
</div>  
注:PDF浏览需要HTML5浏览器支持  

<a href="https://github.com/faif/python-patterns">Python Design Patterns</a>  
<a href="http://www.dofactory.com/net/design-patterns">.NET Design Patterns</a>  