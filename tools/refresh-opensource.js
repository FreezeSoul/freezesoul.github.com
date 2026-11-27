#!/usr/bin/env node
/* 刷新开源推荐页的仓库数据（真实星数、最近推送月份）。
 *
 * 数据在 _data/opensource.json：items 里带 repo 字段的条目会被查询，
 * 更新 stars（数值）/ starStr（"27.9k" 展示）/ pushed（pushedAt 所在月份）；
 * repo 为 null 的条目（普通网站）跳过；查不到的仓库保留旧值并告警。
 *
 * 用法：GITHUB_TOKEN=xxx node tools/refresh-opensource.js
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DATA = path.join(__dirname, '..', '_data', 'opensource.json');

(async () => {
  const db = JSON.parse(fs.readFileSync(DATA, 'utf8'));
  const repos = [...new Set(db.items.map(x => x.repo).filter(Boolean))];
  console.log(`repos: ${repos.length} (items: ${db.items.length})`);
  if (repos.length === 0) { console.log('nothing to refresh'); return; }

  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN ||
    (() => { try { return execSync('gh auth token', { encoding: 'utf8' }).trim(); } catch (e) { return ''; } })();
  if (!token) {
    console.error('未找到 GitHub token：设 GITHUB_TOKEN/GH_TOKEN，或先 gh auth login');
    process.exit(1);
  }

  const query = 'query { ' + repos.map((r, i) => {
    const [owner, name] = r.split('/');
    return `r${i}: repository(owner: "${owner}", name: "${name}") { stargazerCount pushedAt }`;
  }).join(' ') + ' }';

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, 'User-Agent': 'opensource-refresh' },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) {
    console.error(`GitHub API HTTP ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
  const out = await res.json();
  if (!out.data) {
    console.error('GraphQL 返回无 data：', JSON.stringify(out.errors || out).slice(0, 500));
    process.exit(1);
  }

  const missing = [];
  let updated = 0, unchanged = 0;
  repos.forEach((r, i) => {
    const g = out.data[`r${i}`];
    if (!g) { missing.push(r); return; }
    const starStr = g.stargazerCount >= 1000 ? (Math.round(g.stargazerCount / 100) / 10) + 'k' : String(g.stargazerCount);
    const pushed = (g.pushedAt || '').slice(0, 7);
    for (const item of db.items) {
      if (item.repo !== r) continue;
      if (item.stars !== g.stargazerCount || item.starStr !== starStr || item.pushed !== pushed) {
        item.stars = g.stargazerCount; item.starStr = starStr; item.pushed = pushed;
        updated++;
      } else {
        unchanged++;
      }
    }
  });
  for (const e of out.errors || []) {
    const m = (e.path && e.path[0]) ? repos[Number(e.path[0].slice(1))] : null;
    missing.push(m || e.message);
  }

  fs.writeFileSync(DATA, JSON.stringify(db, null, 1) + '\n');
  console.log(`updated: ${updated}, unchanged: ${unchanged}, missing: ${missing.length}`);
  missing.forEach(r => console.warn(`  缺失/未取到，保留旧值: ${r}`));
})();
