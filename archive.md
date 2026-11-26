---
layout: page
title: Archive
permalink: /archive/
---

<div class="page-head">
    <div class="eyebrow">ARCHIVE / SINCE 2013</div>
    <h1>全部文章</h1>
    <p>按年月归档，共 {{ site.posts | size }} 篇。技术会变化，思考与实践留下轨迹。</p>
</div>

<div class="archive-container">
    {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
    {% for year_group in posts_by_year %}
        <div class="archive-year">
            <div class="archive-year-head">
                <h2 class="archive-year-title">{{ year_group.name }}</h2>
                <span class="archive-year-count">{{ year_group.items | size }} FIELD NOTES</span>
            </div>

            <div class="archive-year-posts">
                {% assign posts_by_month = year_group.items | group_by_exp: "post", "post.date | date: '%m'" %}
                {% for month_group in posts_by_month %}
                    <div class="archive-month">
                        <h3 class="archive-month-title">{{ month_group.name | plus: 0 }} 月</h3>

                        {% for post in month_group.items %}
                            <div class="archive-item">
                                <div class="archive-date">{{ post.date | date: "%m-%d" }}</div>
                                <a href="{{ post.url | prepend: site.baseurl }}" class="archive-title">{{ post.title }}</a>
                                <div class="archive-meta">
                                    {% if post.categories %}<span class="archive-category">{{ post.categories | first }}</span>{% endif %}
                                </div>
                            </div>
                        {% endfor %}
                    </div>
                {% endfor %}
            </div>
        </div>
    {% endfor %}
</div>
