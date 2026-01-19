---
layout: page
title: About
date: 2015-08-28 11:00:00
permalink: /about/
---

<style>
/* 赛博朋克 About 页面样式 - 所有样式都在 .cyber-about 作用域内 */

.cyber-about {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0a0a0a 100%);
    position: relative;
    overflow: hidden;
    font-family: 'Courier New', monospace;
    color: #fff;
}

/* 扫描线效果 */
.cyber-about::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
        0deg,
        rgba(0, 255, 255, 0.03) 0px,
        transparent 1px,
        transparent 2px,
        rgba(255, 0, 255, 0.03) 3px,
        transparent 4px
    );
    pointer-events: none;
    z-index: 1;
}

/* 网格背景 */
.cyber-about .cyber-grid {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
        linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: cyber-gridMove 20s linear infinite;
    z-index: 0;
}

@keyframes cyber-gridMove {
    0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
    100% { transform: perspective(500px) rotateX(60deg) translateY(50px); }
}

/* 主容器 */
.cyber-about .cyber-container {
    position: relative;
    z-index: 2;
}

/* Glitch 标题效果 */
.cyber-about .cyber-glitch-wrapper {
    text-align: center;
    margin-bottom: 60px;
}

.cyber-about .cyber-glitch-title {
    font-size: 42px;
    font-weight: bold;
    text-transform: uppercase;
    position: relative;
    color: #fff;
    animation: cyber-textFlicker 3s infinite;
}

.cyber-about .cyber-glitch-title::before,
.cyber-about .cyber-glitch-title::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.cyber-about .cyber-glitch-title::before {
    color: #f0f;
    animation: cyber-glitch-1 2s infinite;
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
    transform: translate(-2px, -2px);
}

.cyber-about .cyber-glitch-title::after {
    color: #0ff;
    animation: cyber-glitch-2 2s infinite;
    clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
    transform: translate(2px, 2px);
}

@keyframes cyber-glitch-1 {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(-3px, 3px); }
    40% { transform: translate(-3px, -3px); }
    60% { transform: translate(3px, 3px); }
    80% { transform: translate(3px, -3px); }
}

@keyframes cyber-glitch-2 {
    0%, 100% { transform: translate(0); }
    20% { transform: translate(3px, -3px); }
    40% { transform: translate(3px, 3px); }
    60% { transform: translate(-3px, -3px); }
    80% { transform: translate(-3px, 3px); }
}

@keyframes cyber-textFlicker {
    0%, 100% { opacity: 1; }
    92% { opacity: 1; }
    93% { opacity: 0.8; }
    94% { opacity: 1; }
    95% { opacity: 0.9; }
}

/* 副标题 */
.cyber-about .cyber-subtitle {
    font-size: 18px;
    color: #0ff;
    text-align: center;
    margin-top: 20px;
    letter-spacing: 8px;
    text-transform: uppercase;
    animation: cyber-neonPulse 2s ease-in-out infinite;
}

@keyframes cyber-neonPulse {
    0%, 100% {
        text-shadow:
            0 0 5px #0ff,
            0 0 10px #0ff,
            0 0 20px #0ff;
    }
    50% {
        text-shadow:
            0 0 10px #0ff,
            0 0 20px #0ff,
            0 0 40px #0ff,
            0 0 80px #0ff;
    }
}

/* 卡片容器 */
.cyber-about .cyber-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-top: 60px;
}

/* 赛博朋克卡片 */
.cyber-about .cyber-card {
    background: rgba(10, 10, 20, 0.8);
    border: 2px solid transparent;
    border-image: linear-gradient(135deg, #0ff, #f0f, #0ff) 1;
    padding: 30px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.cyber-about .cyber-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
        45deg,
        transparent,
        transparent,
        rgba(0, 255, 255, 0.1),
        transparent
    );
    transform: rotate(45deg);
    animation: cyber-cardShine 3s infinite;
}

@keyframes cyber-cardShine {
    0% { transform: translateX(-100%) rotate(45deg); }
    100% { transform: translateX(100%) rotate(45deg); }
}

.cyber-about .cyber-card:hover {
    transform: translateY(-10px);
    box-shadow:
        0 0 20px rgba(0, 255, 255, 0.5),
        0 0 40px rgba(0, 255, 255, 0.3),
        inset 0 0 20px rgba(0, 255, 255, 0.1);
}

/* 卡片标题 */
.cyber-about .cyber-card-title {
    font-size: 24px;
    color: #f0f;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.cyber-about .cyber-card-title .cyber-icon {
    font-size: 32px;
    animation: cyber-iconFloat 2s ease-in-out infinite;
}

@keyframes cyber-iconFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

/* 卡片内容 */
.cyber-about .cyber-card-content {
    color: #aaa;
    line-height: 1.8;
    font-size: 15px;
}

/* 技能标签 */
.cyber-about .cyber-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
}

.cyber-about .cyber-tag {
    padding: 4px;
    background: linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2));
    border: 1px solid #0ff;
    color: #0ff;
    font-size: 12px;
    text-transform: uppercase;
    transition: all 0.3s ease;
    cursor: pointer;
}

.cyber-about .cyber-tag:hover {
    background: linear-gradient(135deg, rgba(0, 255, 255, 0.4), rgba(255, 0, 255, 0.4));
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
    transform: scale(1.05);
}

/* 打字机效果文本 */
.cyber-about .cyber-typewriter-text {
    font-size: 16px;
    color: #0ff;
    margin: 40px 0;
    padding: 20px;
    border-left: 3px solid #f0f;
    background: rgba(255, 0, 255, 0.05);
    min-height: 60px;
}

.cyber-about .cyber-typewriter-cursor {
    display: inline-block;
    width: 2px;
    height: 20px;
    background: #0ff;
    margin-left: 5px;
    animation: cyber-blink 1s infinite;
}

@keyframes cyber-blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

/* 装饰元素 */
.cyber-about .cyber-decoration {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 2px solid rgba(0, 255, 255, 0.3);
    animation: cyber-rotate 20s linear infinite;
}

.cyber-about .cyber-decoration.cyber-top-right {
    top: 20px;
    right: 20px;
    border-top-color: #0ff;
    border-right-color: #f0f;
}

.cyber-about .cyber-decoration.cyber-bottom-left {
    bottom: 20px;
    left: 20px;
    border-bottom-color: #f0f;
    border-left-color: #0ff;
}

@keyframes cyber-rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* 粒子效果容器 */
.cyber-about .cyber-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
}

.cyber-about .cyber-particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: #0ff;
    border-radius: 50%;
    animation: cyber-particleFloat 10s infinite;
    box-shadow: 0 0 10px #0ff;
}

@keyframes cyber-particleFloat {
    0%, 100% {
        transform: translateY(100vh) scale(0);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100px) scale(1);
        opacity: 0;
    }
}

/* 联系方式区域 */
.cyber-about .cyber-contact {
    text-align: center;
    margin-top: 80px;
    padding: 40px;
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(0, 255, 255, 0.3);
    position: relative;
}

.cyber-about .cyber-contact::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #0ff, #f0f, transparent);
}

.cyber-about .cyber-contact-title {
    font-size: 20px;
    color: #f0f;
    margin-bottom: 30px;
    text-transform: uppercase;
    letter-spacing: 5px;
}

.cyber-about .cyber-social-links {
    display: flex;
    justify-content: center;
    gap: 30px;
    flex-wrap: wrap;
}

.cyber-about .cyber-social-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 30px;
    background: transparent;
    border: 2px solid #0ff;
    color: #0ff;
    text-decoration: none;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: 2px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.cyber-about .cyber-social-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, #0ff, transparent);
    transition: left 0.5s ease;
}

.cyber-about .cyber-social-link:hover::before {
    left: 100%;
}

.cyber-about .cyber-social-link:hover {
    background: rgba(0, 255, 255, 0.1);
    box-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
    transform: translateY(-5px);
}

/* 终端效果 */
.cyber-about .cyber-terminal {
    background: rgba(0, 0, 0, 0.9);
    border: 2px solid #0ff;
    border-radius: 10px;
    padding: 20px;
    margin-top: 60px;
    font-family: 'Courier New', monospace;
}

.cyber-about .cyber-terminal-header {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
}

.cyber-about .cyber-terminal-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.cyber-about .cyber-terminal-dot.cyber-red { background: #ff5f56; }
.cyber-about .cyber-terminal-dot.cyber-yellow { background: #ffbd2e; }
.cyber-about .cyber-terminal-dot.cyber-green { background: #27c93f; }

.cyber-about .cyber-terminal-body {
    color: #0f0;
    font-size: 14px;
    line-height: 1.8;
}

.cyber-about .cyber-command {
    color: #0ff;
}

.cyber-about .cyber-terminal-line {
    opacity: 0;
    animation: cyber-fadeInLine 0.5s forwards;
}

@keyframes cyber-fadeInLine {
    to { opacity: 1; }
}

/* 数据流动画 */
.cyber-about .cyber-data-stream {
    position: absolute;
    width: 2px;
    height: 100px;
    background: linear-gradient(to bottom, transparent, #0ff, transparent);
    animation: cyber-dataFlow 3s linear infinite;
}

@keyframes cyber-dataFlow {
    0% { transform: translateY(-100px); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(calc(100vh + 100px)); opacity: 0; }
}

/* 霓虹边框脉冲 */
.cyber-about .cyber-neon-border-pulse {
    animation: cyber-neonBorderPulse 2s ease-in-out infinite;
}

@keyframes cyber-neonBorderPulse {
    0%, 100% {
        border-color: rgba(0, 255, 255, 0.5);
        box-shadow: 0 0 5px rgba(0, 255, 255, 0.3);
    }
    50% {
        border-color: rgba(255, 0, 255, 0.8);
        box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
    }
}

/* 响应式 */
@media (max-width: 768px) {
    .cyber-about .cyber-glitch-title {
        font-size: 42px;
    }

    .cyber-about .cyber-cards {
        grid-template-columns: 1fr;
    }

    .cyber-about .cyber-social-links {
        flex-direction: column;
        align-items: center;
    }
}
</style>

<div class="cyber-about">
    <!-- 网格背景 -->
    <div class="cyber-grid"></div>

    <!-- 粒子效果 -->
    <div class="cyber-particles" id="cyberParticles"></div>

    <!-- 装饰元素 -->
    <div class="cyber-decoration cyber-top-right"></div>
    <div class="cyber-decoration cyber-bottom-left"></div>

    <!-- 数据流 -->
    <div class="cyber-data-stream" style="left: 10%;"></div>
    <div class="cyber-data-stream" style="left: 30%; animation-delay: 1s;"></div>
    <div class="cyber-data-stream" style="left: 70%; animation-delay: 2s;"></div>
    <div class="cyber-data-stream" style="left: 90%; animation-delay: 0.5s;"></div>

    <div class="cyber-container">
        <!-- Glitch 标题 -->
        <div class="cyber-glitch-wrapper">
            <h1 class="cyber-glitch-title" data-text="FSIO">FREEZESOUL</h1>
            <p class="cyber-subtitle">Full Stack Developer</p>
        </div>

        <!-- 打字机效果 -->
        <div class="cyber-typewriter-text">
            <span id="cyberTypewriter"></span><span class="cyber-typewriter-cursor"></span>
        </div>

        <!-- 卡片区域 -->
        <div class="cyber-cards">
            <!-- 关于我 -->
            <div class="cyber-card cyber-neon-border-pulse">
                <div class="cyber-card-title">
                    <span class="cyber-icon">👨‍💻</span>
                    <span>ABOUT ME</span>
                </div>
                <div class="cyber-card-content">
                    <p>持续探索工程复杂性的系统型工程师，致力于将抽象设计转化为稳定、可复用的软件能力。</p>
                    <p style="margin-top: 15px;">
                    长期参与前后端一体化与平台型系统建设，技术方向涵盖 .NET / Java / Web 与跨端应用，
                    关注领域建模、跨平台技术及 AI Agent 在工程中的实际落地。
                    </p>
                </div>
            </div>

            <!-- 技术栈 -->
            <div class="cyber-card cyber-neon-border-pulse" style="animation-delay: 0.5s;">
                <div class="cyber-card-title">
                    <span class="cyber-icon">⚡</span>
                    <span>TECH STACK</span>
                </div>
                <div class="cyber-card-content">
                    <div class="cyber-tags">
                         <span class="cyber-tag">System Architect</span>
                         <span class="cyber-tag">Frontend & App Engineering</span>
                         <span class="cyber-tag">Backend & Platform Engineering</span>
                         <span class="cyber-tag">DDD & Microservice Design</span>
                         <span class="cyber-tag">Linux-based Deployment</span>
                         <span class="cyber-tag">AI Agent Frameworks</span>
                    </div>
                </div>
            </div>

            <!-- 兴趣爱好 -->
            <div class="cyber-card cyber-neon-border-pulse" style="animation-delay: 1s;">
                <div class="cyber-card-title">
                    <span class="cyber-icon">🎯</span>
                    <span>FOCUS</span>
                </div>
                <div class="cyber-card-content">
                    <ul style="list-style: none; padding: 0;margin: 0;">
                        <li style="margin-bottom: 12px; display: flex; align-items: center;">
                         <span style="color: #0ff; margin-right: 10px;">►</span>
                         跨平台应用与统一技术栈建设
                         </li>

                         <li style="margin-bottom: 12px; display: flex; align-items: center;">
                         <span style="color: #f0f; margin-right: 10px;">►</span>
                         前后端一体化与系统级技术方案
                         </li>

                         <li style="margin-bottom: 12px; display: flex; align-items: center;">
                         <span style="color: #0ff; margin-right: 10px;">►</span>
                         基于DDD的领域建模与系统设计
                         </li>

                         <li style="margin-bottom: 12px; display: flex; align-items: center;">
                         <span style="color: #f0f; margin-right: 10px;">►</span>
                         平台型架构与可复用能力沉淀
                         </li>

                         <li style="display: flex; align-items: center;">
                         <span style="color: #0ff; margin-right: 10px;">►</span>
                         AI Agent系统与工程化落地实践
                         </li>

                    </ul>
                </div>
            </div>

            <!-- 项目经验 -->
            <div class="cyber-card cyber-neon-border-pulse" style="animation-delay: 1.5s;">
                <div class="cyber-card-title">
                    <span class="cyber-icon">🚀</span>
                    <span>PROJECTS</span>
                </div>
                <div class="cyber-card-content">
                    <p style="margin-bottom: 10px;">📦 <strong>OSGi.NET</strong> .NET模块化框架</p>
                    <p style="margin-bottom: 10px;">📦 <strong>DATACOLOUR</strong> 数据可视化平台</p>
                    <p style="margin-bottom: 10px;">📦 <strong>MICROAPP</strong> 微应用开发平台</p>
                    <p style="margin-bottom: 10px;">📦 <strong>AGENT.COMMON</strong> 智能体通用框架</p>
                    <p>📊 更多项目见 GitHub</p>
                </div>
            </div>
        </div>

        <!-- 终端效果 -->
        <div class="cyber-terminal">
            <div class="cyber-terminal-header">
                <span class="cyber-terminal-dot cyber-red"></span>
                <span class="cyber-terminal-dot cyber-yellow"></span>
                <span class="cyber-terminal-dot cyber-green"></span>
            </div>
            <div class="cyber-terminal-body" id="cyberTerminalOutput">
                <div class="cyber-terminal-line">
                    <span class="cyber-command">$</span> initializing system...
                </div>
            </div>
        </div>

        <!-- 联系方式 -->
        <div class="cyber-contact">
            <h3 class="cyber-contact-title">Get In Touch</h3>
            <div class="cyber-social-links">
                <a href="https://github.com/FreezeSoul" class="cyber-social-link" target="_blank">
                    <span>📦</span> GitHub
                </a>
                <a href="mailto:your@email.com" class="cyber-social-link">
                    <span>📧</span> Email
                </a>
            </div>
        </div>
    </div>
</div>

<script>
(function() {
    // 创建粒子效果
    function createParticles() {
        const container = document.getElementById('cyberParticles');
        if (!container) return;

        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'cyber-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';

            // 随机颜色
            const colors = ['#0ff', '#f0f', '#ff0', '#0f0'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;
            particle.style.boxShadow = `0 0 10px ${color}`;

            container.appendChild(particle);
        }
    }

    // 打字机效果
    function typeWriter() {
        const typewriter = document.getElementById('cyberTypewriter');
        if (!typewriter) return;

        const texts = [
            'Hello, World!',
            'I am a Full Stack Developer.',
            'Passionate about clean code.',
            'Building the future, one line at a time.',
            'Welcome to my digital space.'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typewriter.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typewriter.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => { isDeleting = true; }, 2000);
                return;
            }

            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500);
                return;
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    // 终端效果
    function terminalEffect() {
        const terminal = document.getElementById('cyberTerminalOutput');
        if (!terminal) return;

        const lines = [
            'loading core modules...',
            '✓ system initialized',
            '✓ neural network connected',
            '✓ encryption enabled',
            'accessing developer profile...',
            '✓ profile loaded successfully',
            '',
            'Welcome, visitor.',
            'System ready. Awaiting your input.'
        ];

        let lineIndex = 0;

        function addLine() {
            if (lineIndex >= lines.length) return;

            const line = document.createElement('div');
            line.className = 'cyber-terminal-line';
            line.style.animationDelay = '0s';

            const lineText = lines[lineIndex];
            if (lineText.startsWith('✓')) {
                line.innerHTML = `<span style="color: #0f0;">${lineText}</span>`;
            } else if (lineText.includes('loading') || lineText.includes('accessing')) {
                line.innerHTML = `<span class="cyber-command">$</span> ${lineText}`;
            } else if (lineText === '') {
                line.innerHTML = '&nbsp;';
            } else {
                line.innerHTML = `<span style="color: #0ff;">${lineText}</span>`;
            }

            terminal.appendChild(line);
            lineIndex++;

            setTimeout(addLine, lineText.includes('loading') ? 1500 : 300);
        }

        setTimeout(addLine, 1000);
    }

    // 初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            typeWriter();
            terminalEffect();
        });
    } else {
        createParticles();
        typeWriter();
        terminalEffect();
    }
})();
</script>
