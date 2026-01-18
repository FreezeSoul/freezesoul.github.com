---
layout: page
title: Contact
date: 2015-08-28 11:00:00
permalink: /contact/
---

<div class="contact-intro">
    <h2>Get In Touch</h2>
    <p>Have a question, feedback, or just want to say hello? I'd love to hear from you. Fill out the form below and I'll get back to you as soon as possible.</p>
</div>

<div class="contact-container">
    <div class="contact-info">
        <h3>Other Ways to Connect</h3>

        <div class="contact-item">
            <div class="contact-icon">📧</div>
            <div class="contact-details">
                <h4>Email</h4>
                <p>For direct inquiries</p>
            </div>
        </div>

        <div class="contact-item">
            <div class="contact-icon">🔗</div>
            <div class="contact-details">
                <h4>GitHub</h4>
                <p>Check out my projects</p>
                <a href="https://github.com/freezesoul" target="_blank">github.com/freezesoul</a>
            </div>
        </div>

        <div class="contact-item">
            <div class="contact-icon">📝</div>
            <div class="contact-details">
                <h4>Blog</h4>
                <p>Read my technical articles</p>
                <a href="/">Visit the blog</a>
            </div>
        </div>

        <div class="contact-status">
            <p><strong>Current Status:</strong> <span class="status-indicator">🟡</span> Open to interesting discussions and collaborations</p>
        </div>
    </div>

    <div class="contact-form-wrapper">
        <h3>Send a Message</h3>
        <form action="https://formspree.io/{{ site.email }}" method="POST" class="contact-form">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" name="name" placeholder="Your name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" name="_replyto" placeholder="your@email.com" required>
            </div>
            <div class="form-group">
                <label for="subject">Subject</label>
                <input type="text" class="form-control" id="subject" name="_subject" placeholder="What's this about?" required>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea rows="6" class="form-control" id="message" name="message" placeholder="Tell me more..." required></textarea>
            </div>
            <input type="text" name="_gotcha" style="display:none">
            <input type="hidden" name="_next" value="{{ "/sent.html" | prepend: site.baseurl | prepend: site.url }}">
            <button type="submit" class="btn btn-submit">
                <span>Send Message</span>
                <span class="btn-arrow">→</span>
            </button>
        </form>
    </div>
</div>

<style>
.contact-intro {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 60px;
    padding: 0 20px;
}

.contact-intro h2 {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #2c3e50;
}

.contact-intro p {
    font-size: 1.1em;
    line-height: 1.8;
    color: #7f8c8d;
}

.contact-container {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 60px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
}

.contact-info {
    background: #f8f9fa;
    padding: 40px;
    border-radius: 12px;
    height: fit-content;
}

.contact-info h3 {
    font-size: 1.5em;
    margin-bottom: 30px;
    color: #2c3e50;
    padding-bottom: 15px;
    border-bottom: 2px solid #3498db;
}

.contact-item {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    transition: transform 0.2s, box-shadow 0.2s;
}

.contact-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.contact-icon {
    font-size: 2em;
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ecf0f1;
    border-radius: 50%;
}

.contact-details h4 {
    margin: 0 0 5px 0;
    color: #2c3e50;
    font-size: 1.1em;
}

.contact-details p {
    margin: 0 0 8px 0;
    color: #7f8c8d;
    font-size: 0.95em;
}

.contact-details a {
    color: #3498db;
    text-decoration: none;
    font-weight: 500;
}

.contact-details a:hover {
    text-decoration: underline;
}

.contact-status {
    margin-top: 30px;
    padding: 20px;
    background: #fff3cd;
    border-left: 4px solid #ffc107;
    border-radius: 4px;
}

.contact-status p {
    margin: 0;
    color: #856404;
}

.status-indicator {
    display: inline-block;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.contact-form-wrapper {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 2px 20px rgba(0,0,0,0.08);
}

.contact-form-wrapper h3 {
    font-size: 1.5em;
    margin-bottom: 30px;
    color: #2c3e50;
}

.contact-form .form-group {
    margin-bottom: 25px;
}

.contact-form label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #2c3e50;
    font-size: 0.95em;
}

.contact-form .form-control {
    width: 100%;
    padding: 14px 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 1em;
    transition: border-color 0.3s, box-shadow 0.3s;
    font-family: inherit;
}

.contact-form .form-control:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.contact-form textarea.form-control {
    resize: vertical;
    min-height: 120px;
}

.btn-submit {
    width: 100%;
    padding: 16px 32px;
    background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.btn-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(52, 152, 219, 0.3);
}

.btn-submit:active {
    transform: translateY(0);
}

.btn-arrow {
    transition: transform 0.3s;
}

.btn-submit:hover .btn-arrow {
    transform: translateX(5px);
}

@media (max-width: 768px) {
    .contact-container {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .contact-intro h2 {
        font-size: 2em;
    }

    .contact-info,
    .contact-form-wrapper {
        padding: 30px 20px;
    }
}
</style>
