---
layout: default
title: Archive
permalink: /archive/
---

<article class="content-box post">
    <header>
        <h1>Archive</h1>
        <p>DATA_ARCHIVE//ALL_POSTS</p>
    </header>

    <div class="archive-container">
        {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
        {% for year_group in posts_by_year %}
            <div class="archive-year">
                <h2 class="archive-year-title">{{ year_group.name }}</h2>
                <div class="archive-year-count">{{ year_group.items | size }} 篇文章</div>

                {% assign posts_by_month = year_group.items | group_by_exp: "post", "post.date | date: '%m'" %}
                {% for month_group in posts_by_month %}
                    <div class="archive-month">
                        <h3 class="archive-month-title">{{ month_group.name | replace: "01","1月" | replace: "02","2月" | replace: "03","3月" | replace: "04","4月" | replace: "05","5月" | replace: "06","6月" | replace: "07","7月" | replace: "08","8月" | replace: "09","9月" | replace: "10","10月" | replace: "11","11月" | replace: "12","12月" }}</h3>

                        {% for post in month_group.items %}
                            <div class="archive-item">
                                <div class="archive-date">{{ post.date | date: "%m-%d" }}</div>
                                <a href="{{ post.url }}" class="archive-title">{{ post.title }}</a>
                                <div class="archive-meta">
                                    {% if post.author %}<span class="archive-author">{{ post.author }}</span>{% endif %}
                                    {% if post.categories %}<span class="archive-category">{{ post.categories | first }}</span>{% endif %}
                                </div>
                            </div>
                        {% endfor %}
                    </div>
                {% endfor %}
            </div>
        {% endfor %}
    </div>

    <style>
        .archive-container {
            margin-top: 20px;
        }

        .archive-year {
            margin-left: 10px;
            margin-bottom: 40px;
            padding-bottom: 30px;
            border-bottom: 1px solid rgba(0, 255, 245, 0.2);
            position: relative;
        }

        .archive-year:last-child {
            border-bottom: none;
        }

        .archive-year-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 2rem;
            color: #00fff5;
            text-shadow: 0 0 15px rgba(0, 255, 245, 0.5);
            margin-bottom: 5px;
            letter-spacing: 3px;
        }

        .archive-year-count {
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.85rem;
            color: #8888aa;
            margin-bottom: 25px;
        }

        .archive-month {
            margin: 25px 0;
        }

        .archive-month-title {
            font-family: 'Share Tech Mono', monospace;
            font-size: 1.1rem;
            color: #b537f2;
            margin-bottom: 15px;
            padding-left: 15px;
            border-left: 3px solid rgba(181, 55, 242, 0.5);
        }

        .archive-item {
            display: flex;
            align-items: center;
            padding: 12px 18px;
            margin: 8px 0;
            background: rgba(18, 18, 26, 0.5);
            border: 1px solid rgba(0, 255, 245, 0.1);
            border-radius: 6px;
            transition: all 0.3s ease;
            flex-wrap: wrap;
            gap: 10px;
        }

        .archive-item:hover {
            background: rgba(0, 255, 245, 0.05);
            border-color: rgba(0, 255, 245, 0.3);
            transform: translateX(5px);
            box-shadow: 0 0 20px rgba(0, 255, 245, 0.1);
        }

        .archive-date {
            font-family: 'Share Tech Mono', monospace;
            font-size: 0.85rem;
            color: #00ff9f;
            min-width: 50px;
            text-shadow: 0 0 5px rgba(0, 255, 159, 0.3);
        }

        .archive-title {
            flex: 1;
            color: #e0e0e0;
            text-decoration: none;
            font-size: 1rem;
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .archive-title:hover {
            color: #00fff5;
            text-shadow: 0 0 10px rgba(0, 255, 245, 0.4);
        }

        .archive-meta {
            display: flex;
            gap: 15px;
            font-size: 0.8rem;
        }

        .archive-author {
            color: #ff006e;
            font-family: 'Share Tech Mono', monospace;
        }

        .archive-category {
            color: #b537f2;
            font-family: 'Share Tech Mono', monospace;
        }

        @media (max-width: 767px) {
            .archive-year-title {
                font-size: 1.5rem;
            }

            .archive-item {
                padding: 10px 15px;
            }

            .archive-title {
                font-size: 0.95rem;
            }
        }
    </style>
</article>
