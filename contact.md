---
layout: page
title: Contact
date: 2015-08-28 11:00:00
permalink: /contact/
---

<div class="page-head">
    <div class="eyebrow">CONTACT</div>
    <h1>联系我</h1>
    <p>有想法、反馈，或者只是想聊聊？欢迎留言。</p>
</div>

<div class="contact-container">
    <div class="contact-info">
        <h3>其他联系方式</h3>

        <div class="contact-item">
            <div class="contact-icon">@</div>
            <div class="contact-details">
                <h4>Email</h4>
                <p>直接联系</p>
                <a href="mailto:{{ site.email }}">{{ site.email }}</a>
            </div>
        </div>

        <div class="contact-item">
            <div class="contact-icon">GH</div>
            <div class="contact-details">
                <h4>GitHub</h4>
                <p>看看我的项目</p>
                <a href="https://github.com/freezesoul" target="_blank" rel="noopener">github.com/freezesoul</a>
            </div>
        </div>

        <div class="contact-item">
            <div class="contact-icon">/</div>
            <div class="contact-details">
                <h4>Blog</h4>
                <p>技术文章</p>
                <a href="{{ '/' | prepend: site.baseurl }}">回到首页</a>
            </div>
        </div>

        <div class="contact-status">
            <p><strong>当前状态：</strong> <span class="status-indicator"></span> 欢迎有意思的讨论与合作</p>
        </div>
    </div>

    <div class="contact-form-wrapper">
        <h3>发条消息</h3>
        <form action="{{ site.formspree_form_action }}" method="POST" class="contact-form">
            <div class="form-group">
                <label for="email">你的邮箱</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="you@example.com" required>
            </div>
            <div class="form-group">
                <label for="message">想说的话</label>
                <textarea class="form-control" id="message" name="message" rows="6" placeholder="随便聊聊…" required></textarea>
            </div>
            <button type="submit" class="btn-submit">
                <span>发送</span>
                <span class="btn-arrow">→</span>
            </button>
        </form>
    </div>
</div>
