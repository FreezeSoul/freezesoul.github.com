---
layout: page
title: About
date: 2015-08-28 11:00:00
permalink: /about/
---

{% assign post_count = site.posts | size %}

<div class="about-hero">
    <div class="about-hero-copy">
        <div class="eyebrow">ABOUT / PROFILE 001</div>
        <h1>关于我</h1>
        <p class="about-lead">把抽象的设计，<br>变成稳定可复用的系统。</p>
        <p class="about-intro">FreezeSoul，全栈开发者、系统型工程师。长期参与前后端一体化与平台型系统建设，关注领域建模、跨平台技术，以及 AI Agent 如何在真实工程里落地。自 2013 年起持续写作，把踩过的坑和做过的判断留在这里。</p>
        <div class="about-actions">
            <a class="btn btn-primary" href="https://github.com/FreezeSoul" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>
            <a class="btn" href="mailto:{{ site.email }}">Email <span aria-hidden="true">↗</span></a>
            <a class="btn" href="{{ '/contact/' | prepend: site.baseurl }}">留言 <span aria-hidden="true">↗</span></a>
        </div>
    </div>

    <figure class="about-portrait">
        <div class="portrait-frame">
            <img src="{{ site.author_image | prepend: site.baseurl }}" alt="FreezeSoul 的头像" width="360" height="360" loading="eager">
            <span class="portrait-tag">PROFILE / 001</span>
            <span class="portrait-corner portrait-corner-tr" aria-hidden="true"></span>
            <span class="portrait-corner portrait-corner-bl" aria-hidden="true"></span>
        </div>
        <figcaption>
            <span class="portrait-name">FREEZESOUL</span>
            <span class="portrait-meta">FULL STACK DEVELOPER · SINCE 2013</span>
        </figcaption>
    </figure>
</div>

<div class="about-facts">
    <div class="about-fact"><strong>2013</strong><span>开始持续写作</span></div>
    <div class="about-fact"><strong>{{ post_count }}</strong><span>篇技术记录</span></div>
    <div class="about-fact"><strong>03</strong><span>长期关注议题</span></div>
    <div class="about-fact"><strong>.NET / Java / AI</strong><span>主要技术栈</span></div>
</div>

<div class="about-grid">
    <section class="about-block">
        <h2>当前关注</h2>
        <div class="about-current">
            <p><span class="status-dot"></span> AI Agent 与多智能体系统的工程化落地</p>
            <p>比起追逐概念，更关心系统是否可靠、工具是否真正提高效率。近期围绕 Agent 运行时、上下文工程与工具链协作做实践记录。</p>
        </div>
    </section>

    <section class="about-block">
        <h2>技术方向</h2>
        <div class="about-tags">
            <span class="chip">System Architect</span>
            <span class="chip">Frontend &amp; App Engineering</span>
            <span class="chip">Python</span>
            <span class="chip">Backend &amp; Platform Engineering</span>
            <span class="chip">DDD &amp; Microservice Design</span>
            <span class="chip">Linux-based Deployment</span>
            <span class="chip">AI Agent Frameworks</span>
        </div>
    </section>

    <section class="about-block">
        <h2>关注领域</h2>
        <ul class="about-list">
            <li>跨平台应用与统一技术栈建设</li>
            <li>前后端一体化与系统级技术方案</li>
            <li>基于 DDD 的领域建模与系统设计</li>
            <li>平台型架构与可复用能力沉淀</li>
            <li>AI Agent 系统与工程化落地实践</li>
        </ul>
    </section>

    <section class="about-block">
        <h2>代表项目</h2>
        <ul class="project-list">
            <li><span class="project-index">01</span><a href="https://github.com/FreezeSoul/OSGi.NET" target="_blank" rel="noopener"><strong>OSGi.NET</strong></a><span>.NET 模块化框架</span><span class="project-arrow" aria-hidden="true">↗</span></li>
            <li><span class="project-index">02</span><a href="https://gitee.com/DataColour/ColourClient" target="_blank" rel="noopener"><strong>DATACOLOUR</strong></a><span>数据可视化平台</span><span class="project-arrow" aria-hidden="true">↗</span></li>
            <li><span class="project-index">03</span><a href="https://gitee.com/DataColour/MicroAppClient" target="_blank" rel="noopener"><strong>MICROAPP</strong></a><span>微应用开发平台</span><span class="project-arrow" aria-hidden="true">↗</span></li>
            <li><span class="project-index">04</span><a href="https://github.com/FreezeSoul/common-agent-framework" target="_blank" rel="noopener"><strong>AGENT.COMMON</strong></a><span>智能体通用框架</span><span class="project-arrow" aria-hidden="true">↗</span></li>
            <li><span class="project-index">05</span><a href="https://github.com/FreezeSoul" target="_blank" rel="noopener"><strong>GitHub</strong></a><span>更多项目</span><span class="project-arrow" aria-hidden="true">↗</span></li>
        </ul>
    </section>

    <section class="about-block">
        <h2>保持联系</h2>
        <div>
            <p>欢迎就架构设计、Agent 工程化或工具实践交流。也可在留言页直接写下想法。</p>
            <div class="about-links">
                <a class="btn" href="https://github.com/FreezeSoul" target="_blank" rel="noopener">GitHub →</a>
                <a class="btn" href="mailto:{{ site.email }}">Email →</a>
                <a class="btn" href="{{ '/contact/' | prepend: site.baseurl }}">留言 →</a>
            </div>
        </div>
    </section>
</div>
