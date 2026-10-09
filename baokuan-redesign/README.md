# 爆款视频 AI 生成 · Apple 深色模式

把 [原型画板](https://baokuan-deliverables.app.workbuddy.host/figma-board.html)（微信小程序，23 屏）补齐到 41 屏后，按 Apple 深色模式重做：纯黑画布、SF 风格无衬线、唯一强调色 Apple Blue。设计流程遵循 `skills/ui-designer`：先定 Token，再拼组件，DESIGN.md 是唯一事实来源，HTML 是可视化证明。

| 文件 | 内容 |
| --- | --- |
| `ANALYSIS.md` | 原型分析：流程图、断点与信息缺失问题清单、补充清单、逐屏改动 |
| `DESIGN.md` | 设计规范（9 节）：主题、Token、字体层级、组件全状态、布局、层级、护栏、响应式、智能体提示 |
| `index.html` | 41 屏设计画板，单文件、无依赖，所有页面与 Token 的唯一源 |
| `build.mjs` | 从 `index.html` 生成 `export/` 的脚本（Node ≥ 18，无第三方依赖） |
| `export/index.html` | HTML 导出目录页：41 屏缩略预览，点击进入单页 |
| `export/screens/*.html` | 41 个独立 HTML 页面，每屏一个文件，可在浏览器或手机直接打开 |
| `export/preview.html` | Token 与组件目录：色板与对比度、字体层级、间距 / 圆角比例尺、按钮与输入框全状态、徽标、卡片、面板 |

## 屏幕构成

- 重设计原型已有的 23 屏，其中 14 拆为两屏：14 作品操作面板、14b 生成失败面板（原型里 14 号标题与内容不符），共 24 屏（画板标签“重设计”）。
- 新增 7 个页面：09a 生成进度、05b 参考视频详情、05c 手动上传参考视频、15a 邀请好友、15b 联系客服、21a 协议详情、16a 支付成功。
- 新增 10 个状态：01a 未勾选协议、02a 初次进入空态、02b 上传失败与校验、04a 识别失败、05a 搜索无结果、10a 作品空态、12a 保存到相册中、16b 支付未完成、23a 网络异常、23b 列表骨架屏。

画板分四组：A 主流程、A 作品、B 我的与账户、C 隐蔽入口与全局状态。

## 预览与导出

```bash
# 画板 / 导出目录 / 组件目录，任选其一直接打开
open baokuan-redesign/index.html
open baokuan-redesign/export/index.html
open baokuan-redesign/export/preview.html

# 或起一个静态服务
python3 -m http.server -d baokuan-redesign 8000   # http://localhost:8000/export/

# 修改 index.html 后重新生成 export/
node baokuan-redesign/build.mjs
```

独立页面在 480px 以下视口自动铺满屏幕（适合手机直接打开或嵌入 iframe），桌面视口居中显示手机框并附上一页 / 下一页导航。

画板需要中文字体（PingFang SC / Noto Sans SC / Noto Serif SC）。Linux 下可安装 `fonts-noto-cjk`。
