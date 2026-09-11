# 同步图标重设计 —— Claude 设计语言

把「自动同步 / 手动同步」两枚蓝色渐变立体图标,重做为一对**双色扁平图标**,
视觉语言取自 [Claude (Anthropic) DESIGN.md](https://getdesign.md/claude/design-md)。

## 文件

| 文件 | 用途 |
| --- | --- |
| [`DESIGN.md`](./DESIGN.md) | 完整规范:网格、配色、几何、状态、响应式、Do's/Don'ts |
| [`index.html`](./index.html) | 自包含可视化证明,可直接用浏览器打开 |
| [`icons/sync-auto.svg`](./icons/sync-auto.svg) | 自动同步,24 × 24 |
| [`icons/sync-manual.svg`](./icons/sync-manual.svg) | 手动同步,24 × 24 |

## 改了什么

| | 原设计 | 重设计 |
| --- | --- | --- |
| 色彩 | 蓝色线性渐变 | 陶土 `#c96442` + 近黑 `#141413` 双色平涂 |
| 体积 | 高光、投影、3D 手指 | 纯剪影,零投影 |
| 色温 | 冷色调 | 全暖色(中性色带黄棕底调) |
| 一致性 | 两枚图标各画各的 | 共用 24 网格、R=7.5 基准圆、2px 描边 |

## 配色规则

> **陶土色 = 正在发生的动作;近黑 = 承载动作的主体。**

- 自动同步:领先箭头陶土,回程箭头近黑。
- 手动同步:食指与涟漪陶土,手掌与拇指近黑。

这条规则让两枚图标的陶土面积大致相当,并排时视觉重量平衡。

## 用法

两枚 SVG 内置 `--ico-1`(动作色)和 `--ico-2`(结构色)两个自定义属性,
直接打开可用,内联到页面后可按主题覆盖:

```css
.icon            { --ico-1:#c96442; --ico-2:#141413; }  /* 浅色 */
.dark .icon      { --ico-1:#d97757; --ico-2:#b0aea5; }  /* 深色 */
.icon.is-done    { --ico-1:#6b7d55; --ico-2:#6b7d55; }  /* 已同步 */
.icon.is-disabled{ --ico-1:#87867f; --ico-2:#87867f; }  /* 禁用 */
```

悬停 / 按下**不要改 glyph 颜色**(Coral 在浅底上只有 2.96:1,不达标),
改为加暖沙底板 + 环形阴影:

```css
.icon-btn:hover  { background:#e8e6dc; box-shadow:0 0 0 1px #d1cfc5; }
.icon-btn:active { background:#e8e6dc; box-shadow:inset 0 0 0 1px rgba(20,20,19,.15);
                   transform:scale(.96); }
```

## 本地预览

纯 HTML,无需构建:

```bash
cd sync-icons-redesign
python3 -m http.server 8080
# 打开 http://localhost:8080
```
