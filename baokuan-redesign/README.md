# 爆款视频 AI 生成 · Claude 设计语言重设计

把 [原型画板](https://baokuan-deliverables.app.workbuddy.host/figma-board.html)（微信小程序，23 屏，黑紫主题）按 Claude 设计语言重做，并补齐缺失的页面和状态，共 41 屏。

| 文件 | 内容 |
| --- | --- |
| `ANALYSIS.md` | 原型分析：流程图、断点与信息缺失问题清单、补充清单、逐屏改动 |
| `DESIGN.md` | 本产品的设计规范：色彩 Token、字体、组件、布局、对比度依据 |
| `index.html` | 41 屏画板，单文件、无依赖，直接用浏览器打开 |

## 屏幕构成

- 重设计原型已有的 23 屏，其中 14 拆为两屏：14 作品操作面板、14b 生成失败面板（原型里 14 号标题与内容不符），共 24 屏（画板标签“重设计”）。
- 新增 7 个页面：09a 生成进度、05b 参考视频详情、05c 手动上传参考视频、15a 邀请好友、15b 联系客服、21a 协议详情、16a 支付成功。
- 新增 10 个状态：01a 未勾选协议、02a 初次进入空态、02b 上传失败与校验、04a 识别失败、05a 搜索无结果、10a 作品空态、12a 保存到相册中、16b 支付未完成、23a 网络异常、23b 列表骨架屏。

画板分四组：A 主流程、A 作品、B 我的与账户、C 隐蔽入口与全局状态。

## 预览

```bash
# 任选其一
open baokuan-redesign/index.html
python3 -m http.server -d baokuan-redesign 8000   # 访问 http://localhost:8000
```

画板需要中文字体（PingFang SC / Noto Sans SC / Noto Serif SC）。Linux 下可安装 `fonts-noto-cjk`。
