// 从 index.html（唯一源）生成 export/：41 个独立 HTML 页面、目录页、token 与组件目录。
// 运行：node build.mjs   （Node ≥ 18，无第三方依赖）
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const here = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(here, 'index.html'), 'utf8');
const css = src.slice(src.indexOf('<style>') + 7, src.indexOf('</style>')).trim();
const js = src.slice(src.indexOf('<script>') + 8, src.lastIndexOf('</script>'));

// 在沙箱里执行画板脚本，拿到渲染函数与屏幕清单
const ctx = vm.createContext({ document: { getElementById: () => ({ set innerHTML(_) {} }), title: '' } });
vm.runInContext(js, ctx);
const { S, SECTIONS, TAGS, ic, th, statusBadge, pts } = vm.runInContext('({S,SECTIONS,TAGS,ic,th,statusBadge,pts})', ctx);

const out = join(here, 'export');
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'screens'), { recursive: true });

const flat = SECTIONS.flatMap(([sec, , list]) => list.map(([no, nm, kd, tg, note]) => ({ no, nm, kd, tg, note, sec })));

const pageCss = `
/* ---- 独立页面壳：桌面居中展示，真机视口铺满 ---- */
html,body{height:100%}
body.page{display:grid;place-items:center;min-height:100vh;padding:var(--s6);background:#e3e0d5;gap:var(--s4)}
.pgnav{display:flex;align-items:center;gap:var(--s3);font-size:var(--fs-13);color:var(--olive)}
.pgnav a{color:var(--char);text-decoration:none;background:var(--wh);box-shadow:var(--ring-3);border-radius:var(--r-sm);padding:6px 10px;transition:background-color var(--dur-1) var(--ease)}
.pgnav a:hover{background:var(--sand)}
.pgnav a:focus-visible{outline:none;box-shadow:var(--focus-ring)}
.pgnav b{color:var(--ink);font-weight:600}
@media (max-width:480px){
  body.page{padding:0;background:var(--pa);display:block}
  .pgnav{display:none}
  .scr{width:100vw;height:100vh;height:100dvh;border-radius:0;box-shadow:none}
}`;

const doc = (title, body, extraCss = '', bodyClass = '') => `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<style>
${css}
${extraCss}
</style>
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
${body}
</body>
</html>
`;

/* ---------------- 1. 41 个独立页面 ---------------- */
flat.forEach((f, i) => {
  const prev = flat[i - 1], next = flat[i + 1];
  const nav = `<nav class="pgnav">
  ${prev ? `<a href="${prev.no}.html">‹ ${prev.no}</a>` : '<span></span>'}
  <span><b>${f.no}</b> · ${f.nm}${f.kd ? ` · ${f.kd}` : ''} · <a href="../index.html">目录</a></span>
  ${next ? `<a href="${next.no}.html">${next.no} ›</a>` : '<span></span>'}
</nav>`;
  writeFileSync(join(out, 'screens', `${f.no}.html`), doc(`${f.no} · ${f.nm}`, `${S[f.no]()}\n${nav}`, pageCss, 'page'));
});

/* ---------------- 2. 目录页 ---------------- */
const galleryCss = `
.gal{padding:56px 48px 96px;max-width:1680px;margin:0 auto}
.gal h1{font-family:var(--serif);font-weight:500;font-size:40px;line-height:1.15}
.gal .lead{color:var(--olive);font-size:var(--fs-15);line-height:1.6;margin-top:var(--s3);max-width:80ch}
.gal .links{display:flex;gap:var(--s3);margin-top:var(--s5);flex-wrap:wrap}
.gal .links a{font-size:var(--fs-14);font-weight:600;color:var(--char);text-decoration:none;background:var(--wh);box-shadow:var(--ring-3);border-radius:var(--r-sm);padding:var(--s2) var(--s3)}
.gal .links a:hover{background:var(--sand)}
.gal h2{font-family:var(--serif);font-weight:500;font-size:24px;margin-top:56px;padding-bottom:var(--s3);border-bottom:1px solid var(--ring)}
.gal h2 small{font-family:var(--sans);font-size:var(--fs-13);color:var(--olive);font-weight:400;margin-left:10px}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(232px,1fr));gap:var(--s8) var(--s6);margin-top:var(--s6)}
.gc{position:relative;color:inherit}
.gc .hit{position:absolute;inset:0;z-index:2;border-radius:var(--r-xl)}
.gc .hit:focus-visible{outline:none;box-shadow:var(--focus-ring)}
.gc .shot{width:195px;height:406px;overflow:hidden;border-radius:var(--r-xl);box-shadow:0 0 0 1px rgba(20,20,19,.08),rgba(0,0,0,.08) 0 8px 24px;background:var(--pa);position:relative;transition:transform var(--dur-2) var(--ease)}
.gc:hover .shot{transform:translateY(-3px)}
.gc .shot .mini{width:390px;height:812px;transform:scale(.5);transform-origin:0 0;pointer-events:none}
.gc .cap{margin-top:var(--s3)}
.gc .note{min-height:0}`;

const gallery = `<div class="gal">
  <h1>爆款视频 AI 生成 · 页面导出</h1>
  <p class="lead">共 ${flat.length} 屏，每屏一个独立 HTML 文件，可直接在浏览器或手机上打开；在 390px 以下视口自动铺满屏幕。点击任意卡片进入该页，页面底部可前后翻页。</p>
  <div class="links"><a href="preview.html">Token 与组件目录 →</a><a href="../index.html">完整设计画板 →</a><a href="../DESIGN.md">DESIGN.md</a><a href="../ANALYSIS.md">ANALYSIS.md</a></div>
  ${SECTIONS.map(([t, sub, list]) => `
  <h2>${t}<small>${sub} · ${list.length} 屏</small></h2>
  <div class="cards">${list.map(([no, nm, kd, tg, note]) => `
    <div class="gc">
      <div class="shot"><div class="mini">${S[no]()}</div><a class="hit" href="screens/${no}.html" aria-label="${no} ${nm}"></a></div>
      <div class="cap"><span class="no">${no}</span><span class="nm">${nm}</span>${kd ? `<span class="kd">${kd}</span>` : ''}<span class="tag ${tg}">${TAGS[tg]}</span></div>
      <p class="note">${note}</p>
    </div>`).join('')}</div>`).join('')}
</div>`;
writeFileSync(join(out, 'index.html'), doc(`爆款视频 AI 生成 · ${flat.length} 屏 HTML 导出`, gallery, galleryCss));

/* ---------------- 3. Token 与组件目录 ---------------- */
const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => ((Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05)).toFixed(2);

const COLORS = [
  ['--pa', '#000000', 'Pure Black', '页面底色'],
  ['--surface', '#1c1c1e', 'Dark Surface', '卡片、列表、TabBar'],
  ['--wh', '#2c2c2e', 'Elevated', '输入框、可点浮起'],
  ['--sand', '#3a3a3c', 'Fill', '次按钮、图标底、进度轨道'],
  ['--sand2', '#636366', 'Fill Pressed', '次按钮按下'],
  ['--ink', '#f5f5f7', 'Label', '标题与正文'],
  ['--iv', '#ffffff', 'White', '按钮文字、播放键'],
  ['--olive', '#98989d', 'Secondary Label', '辅助说明'],
  ['--stone', '#8e8e93', 'Tertiary Label', '占位符、划线原价'],
  ['--silver', '#aeaeb2', 'Quaternary', '黑底卡片上的次文字'],
  ['--brand', '#2997ff', 'Bright Blue', '深底上的链接、价格、进度'],
  ['--brand-strong', '#0071e3', 'Apple Blue', '主按钮底色'],
  ['--brand-pressed', '#0066cc', 'Blue Pressed', '主按钮按下'],
  ['--brand-ink', '#64d2ff', 'Blue Ink', '蓝色浅底上的文字'],
  ['--ok', '#30d158', 'System Green', '已完成、到账'],
  ['--err', '#ff453a', 'System Red', '失败、删除、校验'],
  ['--warn', '#ff9f0a', 'System Orange', '排队中、提示'],
  ['--focus', '#0071e3', 'Focus', '键盘焦点环'],
];
const PAIRS = [
  ['#f5f5f7', '#000000', '标题 / 页面'], ['#ebebf5', '#1c1c1e', '正文 / 卡片'], ['#98989d', '#1c1c1e', '辅助说明 / 卡片'],
  ['#8e8e93', '#2c2c2e', '占位符 / 输入框'], ['#ffffff', '#0071e3', '主按钮文字 / 底'], ['#ffffff', '#0a84ff', '更亮的系统蓝上的白字（不使用）'],
  ['#2997ff', '#000000', '链接 / 页面'], ['#2997ff', '#1c1c1e', '价格 / 卡片'], ['#30d158', '#1c1c1e', '成功'],
  ['#ff453a', '#1c1c1e', '错误'], ['#ff9f0a', '#000000', '警告'], ['#f5f5f7', '#3a3a3c', '次按钮文字 / 底'],
];
const TYPE = [
  ['h-page', '页面大标题', 'SF Pro Display 34 / 600 / 1.12 / −0.022em', '爆款复刻'],
  ['h-sec', '区块与弹窗标题', 'SF Pro Display 22 / 600 / 1.2', '确认生成'],
  ['h-card', '卡片标题', 'SF Pro Text 16 / 600 / 1.35', '夏季棉麻衬衫'],
  ['t-body', '正文', 'SF Pro Text 15 / 400 / 1.6', '新人赠送 500 积分，够做 1 条 15 秒。先免费做一条，看到效果再决定。'],
  ['t-cap', '说明', 'SF Pro Text 13 / 400 / 1.45', '服装内衣 / 上装 · 更换类目'],
  ['t-mic', '注脚', 'SF Pro Text 12 / 400 / 1.4', '09-19 18:42 生成 · 9:16 · 15 秒 · 消耗 270 积分'],
  ['num', '数字', 'SF Mono 等宽数字', '1,190'],
];
const SPACE = [['--s05', 2], ['--s1', 4], ['--s15', 6], ['--s2', 8], ['--s3', 12], ['--s4', 16], ['--s5', 20], ['--s6', 24], ['--s8', 32], ['--s12', 48]];
const RADIUS = [['--r-2xs', 3, '进度条'], ['--r-xs', 6, '时长标'], ['--r-sm', 10, '小按钮'], ['--r-md', 14, '按钮、输入框'], ['--r-lg', 16, '卡片、列表'], ['--r-xl', 20, '播放器'], ['--r-2xl', 24, '面板、弹窗'], ['--r-3xl', 32, '空态插图底'], ['--r-pill', 999, '胶囊']];

const previewCss = `
.pv{padding:56px 48px 96px;max-width:1280px;margin:0 auto;color:var(--ink)}
.pv h1{font-family:var(--serif);font-weight:500;font-size:40px;line-height:1.15}
.pv .lead{color:var(--olive);font-size:var(--fs-15);line-height:1.6;margin-top:var(--s3);max-width:80ch}
.pv h2{font-family:var(--serif);font-weight:500;font-size:24px;margin-top:56px;padding-bottom:var(--s3);border-bottom:1px solid var(--ring)}
.pv h3{font-size:var(--fs-14);font-weight:600;color:var(--char);margin:var(--s6) 0 var(--s3)}
.pv .row{display:flex;flex-wrap:wrap;gap:var(--s3);align-items:center}
.pv .row .btn{width:auto;min-width:140px;padding:0 var(--s5)}
.sw{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:var(--s3);margin-top:var(--s5)}
.sw div{background:var(--iv);border:1px solid var(--bc);border-radius:var(--r-md);overflow:hidden}
.sw i{display:block;height:64px}
.sw p{padding:10px var(--s3) var(--s3);font-size:var(--fs-12);line-height:1.5;color:var(--olive)}
.sw p b{display:block;color:var(--ink);font-size:var(--fs-13)}
.sw p code{font-family:var(--mono);color:var(--char)}
table.pv-t{width:100%;border-collapse:collapse;margin-top:var(--s5);font-size:var(--fs-14)}
table.pv-t th,table.pv-t td{text-align:left;padding:10px var(--s3);border-bottom:1px solid var(--bc);vertical-align:middle}
table.pv-t th{font-size:var(--fs-12);color:var(--olive);font-weight:600;letter-spacing:var(--ls-label)}
.pair{display:inline-flex;align-items:center;justify-content:center;width:120px;height:40px;border-radius:var(--r-sm);font-weight:600;font-size:var(--fs-14)}
.pass{color:var(--ok);font-weight:600}.fail{color:var(--err);font-weight:600}
.lab{font-size:var(--fs-12);color:var(--olive);letter-spacing:var(--ls-label);margin-top:6px}
.cell{display:flex;flex-direction:column;gap:6px;align-items:flex-start}
.spc{display:flex;gap:var(--s4);align-items:flex-end;margin-top:var(--s5);flex-wrap:wrap}
.spc div{text-align:center;font-size:var(--fs-12);color:var(--olive)}
.spc i{display:block;background:var(--brand);border-radius:2px;margin:0 auto 6px}
.rad{display:flex;gap:var(--s4);flex-wrap:wrap;margin-top:var(--s5)}
.rad div{text-align:center;font-size:var(--fs-12);color:var(--olive)}
.rad i{display:block;width:72px;height:72px;background:var(--sand);box-shadow:var(--ring-2);margin:0 auto 6px}
.phone-w{width:390px;flex-shrink:0}
.demo{background:var(--pa);border:1px solid var(--bw);border-radius:var(--r-lg);padding:var(--s5);margin-top:var(--s3);position:relative}
.demo.fixed{height:420px;overflow:hidden;width:390px}
.demo .sheet,.demo .scrim,.demo .dlg{position:absolute}
.grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:var(--s5)}`;

const btnMatrix = (variants) => `<table class="pv-t"><thead><tr><th>变体</th><th>默认</th><th>按下</th><th>禁用</th><th>聚焦</th></tr></thead><tbody>
${variants.map(([cls, name, icon]) => `<tr><td><b>${name}</b><div class="lab">.${cls}</div></td>
  <td><span class="btn md ${cls}" style="width:150px">${icon ? ic(icon) : ''}按钮文字</span></td>
  <td><span class="btn md ${cls} is-pressed" style="width:150px">${icon ? ic(icon) : ''}按钮文字</span></td>
  <td><span class="btn md ${cls} is-disabled" style="width:150px">${icon ? ic(icon) : ''}按钮文字</span></td>
  <td><span class="btn md ${cls}" style="width:150px;box-shadow:var(--focus-ring)">${icon ? ic(icon) : ''}按钮文字</span></td></tr>`).join('')}
</tbody></table>`;

const preview = `<div class="pv">
  <h1>Token 与组件目录</h1>
  <p class="lead">由 <code>index.html</code> 的 token 直接渲染。任何颜色、字号、间距、圆角都应能在本页找到对应条目；找不到的就是魔法数字，不应出现在页面里。对比度按 WCAG AA 计算：正文 ≥ 4.5，大字号或非信息文字 ≥ 3.0。</p>

  <h2>1 · 色彩 Token</h2>
  <div class="sw">${COLORS.map(([v, hex, name, role]) => `<div><i style="background:${hex}"></i><p><b>${name}</b><code>${v}</code> · ${hex}<br>${role}</p></div>`).join('')}</div>

  <h3>文字 / 背景对比度</h3>
  <table class="pv-t"><thead><tr><th>组合</th><th>示例</th><th>对比度</th><th>结论</th></tr></thead><tbody>
  ${PAIRS.map(([fg, bg, name]) => { const r = ratio(fg, bg); const ok = r >= 4.5; const large = r >= 3; return `<tr><td>${name}<div class="lab">${fg} on ${bg}</div></td><td><span class="pair" style="color:${fg};background:${bg};box-shadow:var(--ring-3)">积分 270</span></td><td class="num">${r} : 1</td><td class="${ok ? 'pass' : large ? '' : 'fail'}">${ok ? 'AA 正文通过' : large ? '仅大字号 / 非信息文字' : '不通过'}</td></tr>`; }).join('')}
  </tbody></table>

  <h2>2 · 字体层级</h2>
  <table class="pv-t"><thead><tr><th>层级</th><th>规格</th><th>示例</th></tr></thead><tbody>
  ${TYPE.map(([cls, name, spec, demo]) => `<tr><td><b>${name}</b><div class="lab">.${cls}</div></td><td class="t-cap">${spec}</td><td><span class="${cls}" ${cls === 'num' ? 'style="font-size:36px"' : ''}>${demo}</span></td></tr>`).join('')}
  </tbody></table>

  <h2>3 · 间距与圆角</h2>
  <h3>间距比例尺（4px 基准）</h3>
  <div class="spc">${SPACE.map(([v, n]) => `<div><i style="width:${n * 3}px;height:${n * 3}px"></i>${n}<br><code>${v}</code></div>`).join('')}</div>
  <h3>圆角比例尺</h3>
  <div class="rad">${RADIUS.map(([v, n, use]) => `<div><i style="border-radius:${n}px"></i>${n === 999 ? '胶囊' : n}<br><code>${v}</code><br>${use}</div>`).join('')}</div>

  <h2>4 · 按钮</h2>
  <p class="t-cap mt12">高度 50 / 44 / 36，圆角 14 / 14 / 10。一屏最多一个蓝色实心按钮。按下态改为 #0066cc，禁用态用灰色底，聚焦环仅用于键盘操作。</p>
  ${btnMatrix([['btn-p', '主按钮', 'wechat'], ['btn-s', '次按钮', ''], ['btn-w', '白底按钮', ''], ['btn-d', '深色按钮', ''], ['btn-danger', '危险按钮', 'trash'], ['btn-g', '文字按钮', '']])}
  <h3>尺寸</h3>
  <div class="row"><span class="btn btn-p" style="width:200px">大 · 50</span><span class="btn md btn-p">中 · 44</span><span class="btn sm btn-p">小 · 36</span><span class="btn sm btn-s">${ic('filter')}带图标</span></div>

  <h2>5 · 输入与选择</h2>
  <div class="grid3">
    <div class="cell"><div class="field" style="width:100%">夏季棉麻衬衫</div><div class="lab">默认</div></div>
    <div class="cell"><div class="field ph" style="width:100%">如：夏季棉麻衬衫</div><div class="lab">占位</div></div>
    <div class="cell"><div class="field focus" style="width:100%">夏季棉麻衬衫|</div><div class="lab">聚焦（蓝色描边 + 蓝色浅底外环）</div></div>
    <div class="cell"><div class="field err" style="width:100%">如：轻薄透气</div><div class="errtxt">${ic('alert')}请填写商品卖点</div><div class="lab">错误</div></div>
    <div class="cell"><div class="field dis" style="width:100%">微信用户</div><div class="lab">禁用</div></div>
    <div class="cell"><div class="field flex gap8" style="width:100%;height:42px;padding:0 12px;color:var(--stone)">${ic('search')}搜索标题或类目</div><div class="lab">搜索框</div></div>
  </div>
  <h3>筛选（Chip）</h3>
  <div class="row"><span class="chip on">全部</span><span class="chip">15 秒内</span><span class="chip">竖屏</span><span class="chip sm on">小 · 选中</span><span class="chip sm">小 · 默认</span></div>
  <h3>分段控件 / 复选</h3>
  <div class="row"><div class="seg" style="width:320px"><a class="on">全部 8</a><a>已完成</a><a>生成中</a><a>失败</a></div><span class="check"></span><span class="check on">${ic('check')}</span><span class="check" style="border-color:var(--err);box-shadow:0 0 0 3px var(--err-soft)"></span></div>

  <h2>6 · 状态徽标与提示</h2>
  <div class="row">${['q', 'g', 'ok', 'err', 'off'].map((s) => statusBadge({ s, pct: 62 })).join('')}<span class="badge b-ink">预览 · 含水印</span><span class="dur">0:15</span><span class="dur">9:16</span></div>
  <h3>Toast</h3>
  <div class="row"><span class="toast"><span style="color:var(--ok-icon)">${ic('check')}</span>已保存到手机相册</span><span class="toast"><span style="color:var(--silver)">${ic('copy')}</span>邀请链接已复制</span><span class="toast"><span style="color:var(--coral)">${ic('info')}</span>图片较大，已自动压缩</span><span class="toast" style="background:var(--err)">${ic('wifioff')}网络不稳定，请稍后重试</span></div>
  <h3>气泡提示</h3>
  <div class="row" style="padding-bottom:var(--s3)"><span class="tip" style="position:relative;display:inline-block">请先阅读并勾选同意协议</span></div>

  <h2>7 · 卡片、列表与进度</h2>
  <div class="grid3">
    <div><div class="card pad"><div class="h-card">卡片 · Surface</div><div class="t-cap mt4">默认容器，1px 白色发丝线，圆角 16，无投影</div></div><div class="lab">.card</div></div>
    <div><div class="card wh pad"><div class="h-card">卡片 · Elevated</div><div class="t-cap mt4">输入与可点内容抬到 #2c2c2e</div></div><div class="lab">.card.wh</div></div>
    <div><div class="card pad" style="background:var(--brand-soft);border-color:var(--brand-line)"><div class="h-card">付费触点</div><div class="t-cap mt4">品牌浅底 + 品牌描边，一屏一个</div></div><div class="lab">.card + brand-soft</div></div>
    <div><div class="list"><div class="li"><span class="ic">${ic('wallet')}</span><span class="grow">充值中心</span>${ic('chev', 'chev')}</div><div class="li"><span class="grow">昵称</span><span class="t-cap">微信用户</span>${ic('chev', 'chev')}</div><div class="li"><span class="grow">清除缓存</span><span class="t-cap">42.6 MB</span></div></div><div class="lab">.list / .li（行高 ≥ 52，按下变 #2c2c2e）</div></div>
    <div><div class="bar"><i style="width:62%"></i></div><div class="bar mt12" style="height:8px"><i style="width:30%"></i></div><div class="kv mt12"><span>本次消耗</span><span><span class="strike num">990</span>&nbsp; <b class="price">${pts(270)}</b></span></div><div class="kv"><span>生成后剩余</span><b class="num">920</b></div><div class="lab">.bar / .kv / .price</div></div>
    <div><div class="step"><span class="n done">${ic('check')}</span><div><div style="font-size:14px;font-weight:600">解析参考视频结构</div><div class="t-mic">0:08</div></div></div><div class="step"><span class="n now">3</span><div><div style="font-size:14px;font-weight:600">合成商品画面</div><div class="t-mic" style="color:var(--brand)">进行中</div></div></div><div class="step"><span class="n">4</span><div style="font-size:14px;font-weight:600;color:var(--olive)">配音、字幕与导出</div></div><div class="lab">.step（完成 / 进行中 / 未开始）</div></div>
  </div>

  <h2>8 · 缩略图占位（字标）</h2>
  <p class="t-cap mt12">视频封面用深灰块加白色单字占位，播放键是白底黑图标。角标位置固定：左上画幅 / 状态，右下时长，右上勾选。</p>
  <div class="row mt20">${th('衬', '#3a3a3c', 120, 160, { size: .34, tl: '<span class="dur">9:16</span>', br: '<span class="dur">0:15</span>' })}${th('夏', '#48484a', 120, 160, { size: .34, tl: statusBadge({ s: 'g', pct: 62 }) })}${th('通', '#2c2c2e', 160, 90, { size: .4, tl: '<span class="dur">16:9</span>' })}${th('衬', '#0a0a0a', 120, 160, { size: .34, play: true })}${th('包', '#404042', 72, 72, { size: .42 })}${th('料', '#363638', 52, 52, { size: .46 })}</div>

  <h2>9 · 层级：面板、弹窗、遮罩</h2>
  <div class="row" style="align-items:flex-start">
    <div class="demo fixed"><div class="scrim"></div><div class="sheet"><div class="grab"></div><div class="sh-h"><div><div class="h-sec">底部面板</div><div class="t-mic mt4">圆角 24，顶部把手，右上关闭</div></div><span class="x">${ic('close')}</span></div><span class="btn btn-p mt20">主操作</span><span class="btn btn-g mt4">次操作</span></div></div>
    <div class="demo fixed"><div class="scrim"></div><div class="dlg"><div class="h-sec">删除这条作品？</div><div class="t-body">「每日新款穿搭分享 · 衬衫款」删除后无法恢复。</div><div class="row2 mt20"><span class="btn md btn-s">取消</span><span class="btn md btn-danger">删除</span></div></div></div>
    <div style="max-width:360px" class="t-cap"><b style="color:var(--ink)">层级规则</b><br>0 页面 Pure Black → 1 卡片 #1c1c1e + 发丝线 → 2 可点浮起 #2c2c2e → 3 面板 / 弹窗 #3a3a3c + 遮罩 rgba(0,0,0,.64) → 4 Toast #3a3a3c。<br><br>不使用渐变（骨架微光除外）与投影。毛玻璃只用于 TabBar 与底栏。</div>
  </div>
</div>`;
writeFileSync(join(out, 'preview.html'), doc('Token 与组件目录 · 爆款视频 AI 生成', preview, previewCss));

console.log(`export/: ${flat.length} 屏 + index.html + preview.html`);
