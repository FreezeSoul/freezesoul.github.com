#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
把书签工具导出的 noi_awesome.json 转译成站点的工具箱数据快照 _data/nav.json。

用法：
    python tools/build_nav.py [输入json路径]

默认输入：D:\\MyClouds\\CODE\\noi_configs\\noi_awesome.json
默认输出：_data/nav.json

转译做了三件事：
1. 把「按来源地域/工具」的原始分类，重排成 11 个功能导向分类（AI 对话、AI 编程、模型与算力…）。
2. 加中文分类名、去除重复 URL、消解同名不同站（如 AiHot 资讯/AiHot 榜单、ModelScope 去重）。
3. 输出干净的 { categories, items } 结构，供前端直接渲染。

以后你在原书签工具里增删网址，跑一句本脚本即可重新生成快照。
"""
import json
import sys
from collections import Counter

DEFAULT_SRC = r"D:\MyClouds\CODE\noi_configs\noi_awesome.json"
DEFAULT_DST = "_data/nav.json"

# 最终分类：slug -> 中文名（顺序即页面展示顺序）
FINAL_CATS = [
    ("chat", "AI 对话"),
    ("coding", "AI 编程"),
    ("models", "模型与算力"),
    ("multimodal", "多模态生成"),
    ("agent", "智能体 / MCP"),
    ("dev", "开发工具"),
    ("cloud", "云服务"),
    ("design", "设计创意"),
    ("community", "社区资讯"),
    ("productivity", "效率办公"),
    ("media", "影音娱乐"),
]

# 原始子目录名 -> 新分类（None 表示混合，需逐条判定）
SUBDIR_MAP = {
    "TopTier": "chat",
    "Chinese": "chat",
    "Foreign": "chat",  # 默认 chat，个别编程类用 NAME_OVERRIDE 覆盖
    "Models": "models",
    "MultiM": "multimodal",
    "Agent": "agent",
    "Tools": "coding",
    "Email": "productivity",
    "Design": "design",
}

# 名称级别的覆盖（优先于子目录映射），用于处理混合分类与细分
NAME_OVERRIDE = {
    # Foreign 里的编程类
    "GithubCopilot": "coding", "BoltAI": "coding", "Vercel": "coding", "LovableAI": "coding",
    # Dev 里的细分
    "AiHot": "community", "GitHub": "dev", "VS Code": "dev", "Kaggle Data": "dev",
    "Google Labs": "dev", "Google Jules": "coding", "Google Skills": "dev", "Google Colab": "dev",
    "Google Board": "dev", "Hugging Face": "models", "OpenAI LaTeX": "dev", "Google StitchUI": "dev",
    "ESP32Simulator": "dev", "DEV Community": "community", "StackOverflow": "community",
    "Product Hunt": "community", "Hacker News": "community", "ByteByteGo": "dev", "CheatSheet": "dev",
    "GitDiagram": "dev", "Project IDX": "coding", "OpenMAIC": "chat", "Roadmap": "dev", "AiDrawIO": "dev",
    "DeepWiki": "dev", "Graphify": "dev", "ZreadAI": "dev", "AliYunCloud": "cloud", "ModelScope": "models",
    "TencentCloud": "cloud", "HuaWeiCloud": "cloud", "VolcEngineCloud": "cloud",
    "ChinaUnicomCloud": "cloud", "AutoDLCloud": "cloud", "Replit": "coding",
    "WenKu": "productivity", "FeiShu": "productivity",
}

# 影音娱乐
VIDEO_NAMES = {"IYF", "Kick", "BiliBili", "Twitch", "TikTok", "YouTube"}

# 社区资讯（除 NAME_OVERRIDE 已覆盖的）
COMMUNITY_NAMES = {
    "X", "V2EX", "LXDO", "Skool", "Reddit", "Tumblr", "Discord", "Bluesky", "Threads",
    "Medium", "Mastodon", "Instagram", "Facebook", "ChirperAI", "Moltbook", "ModeVol",
    "ShowMeAI", "AIGCWeekly", "Bestblogs", "NewSnow", "AiBotCn", "AiNews", "Tophub", "HotTop",
}


def build_meta(data):
    """构建 name -> (原始根分类, 原始子目录) 映射。"""
    meta = {}
    for d in data:
        if d.get("dir"):
            continue
        # 找到父链：向上定位根与直接父目录
        pid = d.get("parent")
        sub = ""
        root = ""
        node = d
        # 直接父是子目录还是根，需借助 id->node
        by_id = {x["id"]: x for x in data}
        parent = by_id.get(pid)
        if parent:
            if parent.get("dir"):
                sub = parent.get("text", "")
                grand = by_id.get(parent.get("parent"))
                if grand and grand.get("parent") == 0:
                    root = grand.get("text", "")
                elif grand and grand.get("dir"):
                    root = grand.get("text", "")
            else:
                root = parent.get("text", "")
        meta[d["text"]] = (root, sub)
    return meta


def display_name(d):
    """同名不同站消歧。"""
    n = d.get("text", "")
    u = (d.get("url") or "").rstrip("/")
    if n == "AiHot":
        if "virxact" in u:
            return "AiHot 榜单"
        return "AiHot 资讯"
    return n


def classify(name, meta):
    if name in VIDEO_NAMES:
        return "media"
    if name in NAME_OVERRIDE:
        return NAME_OVERRIDE[name]
    if name in COMMUNITY_NAMES:
        return "community"
    root, sub = meta.get(name, ("", ""))
    if sub in SUBDIR_MAP and SUBDIR_MAP[sub]:
        return SUBDIR_MAP[sub]
    if root == "Email":
        return "productivity"
    if root == "Design":
        return "design"
    if root == "Community":
        return "community"
    return "dev"


def main():
    src = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_SRC
    dst = DEFAULT_DST

    data = json.load(open(src, encoding="utf-8"))
    meta = build_meta(data)

    cats_order = [c[0] for c in FINAL_CATS]
    cat_name = dict(FINAL_CATS)

    items = []
    seen = set()
    dup_removed = []
    for d in data:
        if d.get("dir"):
            continue
        url = (d.get("url") or "").strip().rstrip("/")
        if not url:
            continue
        if url in seen:
            dup_removed.append((d.get("text", ""), url))
            continue
        seen.add(url)

        cat = classify(d.get("text", ""), meta)
        items.append({
            "name": display_name(d),
            "url": url,
            "favicon": d.get("favicon") or d.get("icon") or d.get("iconDark") or "",
            "category": cat,
        })

    # 按名称+域名再归一去重（处理 ModelScope 的 /home 与 / 这类）
    from urllib.parse import urlparse
    normalized = set()
    final_items = []
    for it in items:
        p = urlparse(it["url"])
        key = (it["name"].lower(), p.netloc)
        if key in normalized:
            dup_removed.append((it["name"], it["url"]))
            continue
        normalized.add(key)
        final_items.append(it)
    items = final_items

    cnt = Counter(i["category"] for i in items)
    categories = [{"slug": s, "name": cat_name[s], "count": cnt.get(s, 0)} for s in cats_order]

    out = {"categories": categories, "items": items}
    json.dump(out, open(dst, "w", encoding="utf-8"), ensure_ascii=False, indent=2)

    print("生成快照:", dst)
    print("去重移除:", dup_removed if dup_removed else "无")
    for c in categories:
        print(f"  {c['slug']:14} {c['name']:10} : {c['count']}")
    print("总条目:", len(items))
    no_icon = [i["name"] for i in items if not i["favicon"]]
    if no_icon:
        print("无图标:", no_icon)


if __name__ == "__main__":
    main()
