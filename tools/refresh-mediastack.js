#!/usr/bin/env node
/* 刷新 MediaStack 技能库的仓库数据（星数、展示值、最近推送月份）。
 *
 * 数据在 _data/mediastack.json，页面通过 site.data 注入 `const D = ...`。
 * 本脚本用一次 GitHub GraphQL 查询拿全部仓库的真实数据，只更新
 * s（星数）/ sl（"24.2k" 展示值）/ u（pushedAt 所在月份）三个字段，
 * 其余字段原样保留；查不到的仓库（改名/删除）保留旧值并告警。
 *
 * 用法：GITHUB_TOKEN=xxx node tools/refresh-mediastack.js
 * 本地无环境变量时回退 `gh auth token`；CI 里由定时 Action 调用。
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DATA = path.join(__dirname, '..', '_data', 'mediastack.json');

(async () => {
  const db = JSON.parse(fs.readFileSync(DATA, 'utf8'));
  const items = db.items;
  const repos = [...new Set(items.map(x => x.n).filter(n => /^[^/]+\/[^/]+$/.test(n)))];
  console.log(`repos: ${repos.length} (items: ${items.length})`);

  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN ||
    (() => { try { return execSync('gh auth token', { encoding: 'utf8' }).trim(); } catch (e) { return ''; } })();
  if (!token) {
    console.error('未找到 GitHub token：设 GITHUB_TOKEN/GH_TOKEN，或先 gh auth login');
    process.exit(1);
  }

  const query = 'query { ' + repos.map((n, i) => {
    const [owner, name] = n.split('/');
    return `r${i}: repository(owner: "${owner}", name: "${name}") { stargazerCount pushedAt }`;
  }).join(' ') + ' }';

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      'User-Agent': 'mediastack-refresh',
    },
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
  const byName = new Map(items.map(x => [x.n, x]));
  let updated = 0, unchanged = 0;
  repos.forEach((n, i) => {
    const r = out.data[`r${i}`];
    const item = byName.get(n);
    if (!r) { missing.push(n); return; }
    const s = r.stargazerCount;
    const u = (r.pushedAt || '').slice(0, 7);
    const sl = s >= 1000 ? (Math.round(s / 100) / 10) + 'k' : String(s);
    if (item.s !== s || item.u !== u || item.sl !== sl) {
      item.s = s; item.sl = sl; item.u = u;
      updated++;
    } else {
      unchanged++;
    }
  });
  for (const e of out.errors || []) {
    const m = (e.path && e.path[0]) ? repos[Number(e.path[0].slice(1))] : null;
    missing.push(m || e.message);
  }

  fs.writeFileSync(DATA, JSON.stringify(db, null, 2) + '\n');
  console.log(`updated: ${updated}, unchanged: ${unchanged}, missing: ${missing.length}`);
  missing.forEach(n => console.warn(`  缺失/未取到，保留旧值: ${n}`));
})();
