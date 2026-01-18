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
                <a>freezesoul#gmail.com</a>
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
        <form action="https://formspree.io/f/mvzzkwgy" method="POST" class="contact-form">
            <div class="form-group">
                <label for="email">Your email:</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="your@email.com" required>
            </div>
            <div class="form-group">
                <label for="message">Your message:</label>
                <textarea class="form-control" id="message" name="message" rows="6" placeholder="Tell me more..." required></textarea>
            </div>
            <button type="submit" class="btn-submit">
                <span>Send</span>
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
    font-family: 'Orbitron', sans-serif;
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #00fff5;
    text-shadow: 0 0 15px rgba(0, 255, 245, 0.5);
    letter-spacing: 2px;
}

.contact-intro p {
    font-size: 1.1em;
    line-height: 1.8;
    color: #cccccc;
}

.contact-container {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px 20px 40px;
}

.contact-info {
    background: rgba(18, 18, 26, 0.6);
    backdrop-filter: blur(20px);
    padding: 30px;
    border: 1px solid rgba(0, 255, 245, 0.2);
    border-radius: 12px;
    height: fit-content;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
}

.contact-info h3 {
    font-family: 'Share Tech Mono', monospace;
    font-size: 1.3em;
    margin-bottom: 25px;
    color: #00fff5;
    padding-bottom: 12px;
    border-bottom: 2px solid rgba(0, 255, 245, 0.3);
    text-transform: uppercase;
    letter-spacing: 2px;
}

.contact-item {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    padding: 18px;
    background: rgba(18, 18, 26, 0.4);
    border: 1px solid rgba(181, 55, 242, 0.2);
    border-radius: 8px;
    transition: all 0.3s ease;
}

.contact-item:hover {
    transform: translateX(5px);
    background: rgba(181, 55, 242, 0.1);
    border-color: rgba(181, 55, 242, 0.4);
    box-shadow: 0 0 20px rgba(181, 55, 242, 0.2);
}

.contact-icon {
    font-size: 1.8em;
    flex-shrink: 0;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 255, 245, 0.1);
    border: 2px solid rgba(0, 255, 245, 0.3);
    border-radius: 50%;
    text-shadow: 0 0 10px rgba(0, 255, 245, 0.5);
}

.contact-details h4 {
    margin: 0 0 5px 0;
    color: #00fff5;
    font-size: 1em;
    font-family: 'Share Tech Mono', monospace;
}

.contact-details p {
    margin: 0 0 8px 0;
    color: #cccccc;
    font-size: 0.9em;
}

.contact-details a {
    color: #ff006e;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
}

.contact-details a:hover {
    color: #00fff5;
    text-shadow: 0 0 10px rgba(0, 255, 245, 0.5);
}

.contact-status {
    margin-top: 25px;
    padding: 18px;
    background: rgba(0, 255, 159, 0.08);
    border-left: 4px solid #00ff9f;
    border-radius: 4px;
}

.contact-status p {
    margin: 0;
    color: #00ff9f;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.9em;
}

.status-indicator {
    display: inline-block;
    animation: pulse-cyber 2s infinite;
    text-shadow: 0 0 10px rgba(0, 255, 159, 0.8);
}

@keyframes pulse-cyber {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.1); }
}

.contact-form-wrapper {
    background: rgba(18, 18, 26, 0.6);
    backdrop-filter: blur(20px);
    padding: 30px;
    border: 1px solid rgba(0, 255, 245, 0.2);
    border-radius: 12px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
}

.contact-form-wrapper h3 {
    font-family: 'Share Tech Mono', monospace;
    font-size: 1.3em;
    margin-bottom: 25px;
    color: #b537f2;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.contact-form .form-group {
    margin-bottom: 20px;
}

.contact-form label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #e0e0e0;
    font-size: 0.9em;
    font-family: 'Share Tech Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.contact-form .form-control {
    width: 100%;
    padding: 14px 16px;
    border: 2px solid rgba(0, 255, 245, 0.2);
    background: rgba(0, 0, 0, 0.4);
    color: #e0e0e0;
    border-radius: 8px;
    font-size: 1em;
    transition: all 0.3s ease;
    font-family: inherit;
}

.contact-form .form-control:focus {
    outline: none;
    border-color: #00fff5;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 20px rgba(0, 255, 245, 0.25);
}

.contact-form .form-control::placeholder {
    color: #8888aa;
}

.contact-form textarea.form-control {
    resize: vertical;
    min-height: 120px;
}

.btn-submit {
    width: 100%;
    padding: 16px 32px;
    background: linear-gradient(135deg, #b537f2 0%, #ff006e 100%);
    color: #e0e0e0;
    border: none;
    border-radius: 8px;
    font-size: 1em;
    font-weight: 600;
    font-family: 'Share Tech Mono', monospace;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 0 20px rgba(255, 0, 110, 0.3);
}

.btn-submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(255, 0, 110, 0.6), 0 0 60px rgba(181, 55, 242, 0.3);
    background: linear-gradient(135deg, #ff006e 0%, #b537f2 100%);
}

.btn-submit:active {
    transform: translateY(0);
}

.btn-arrow {
    transition: transform 0.3s;
    font-size: 1.2em;
}

.btn-submit:hover .btn-arrow {
    transform: translateX(8px);
}

@media (max-width: 768px) {
    .contact-container {
        grid-template-columns: 1fr;
        gap: 30px;
    }

    .contact-intro h2 {
        font-size: 2em;
    }

    .contact-info,
    .contact-form-wrapper {
        padding: 25px 20px;
    }
}
</style>
