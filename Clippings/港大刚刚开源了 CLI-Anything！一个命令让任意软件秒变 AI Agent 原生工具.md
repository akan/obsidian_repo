---
title: "港大刚刚开源了 CLI-Anything！一个命令让任意软件秒变 AI Agent 原生工具！"
source: "https://mp.weixin.qq.com/s/eh3wTwGRDuE9HDNO1aC67Q"
author:
  - "[[开源星探]]"
published:
created: 2026-03-10
description: "一句命令让任何软件变 Agent 原生！香港大学这个开源项目太绝了！"
tags:
  - "AI Agent"
  - "命令行接口"
  - "软件自动化"
  - "开源工具"
abstract: "香港大学数据科学实验室开源了CLI-Anything项目，能够通过一条命令为任意开源软件自动生成AI Agent友好的命令行接口，从而将专业软件转化为Agent原生工具。"
---
Original 开源星探 *2026年3月10日 14:28*

最近“养龙虾”已经成为全民热潮了！不仅仅是AI博主和科技大厂推崇，连各地的政府机构都开始了！

现在越来越多人把最难、最复杂的的任务丢给 `OpenClaw` ，而 Claw 们干活的时候，绝大多数选的都是 Claude Code —— 不是 Cursor，不是 VS Code，更不是什么 GUI Agent。

核心原因就一个：“CC 的 CLI 做得太好了。有状态、自描述、好用还强大。Agent 不需要跟它「搏斗」—— 拿起来就能干活。”

但是绝大多数真正的专业软件，都没有这样的 CLI。GIMP、Blender、LibreOffice、OBS —— 每一个都是重量级工具，但 Agent 基本碰不了。

你能做的上限就是截图点点点的 GUI Agent，效果嘛…… 懂的都懂。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/rfBHhQhezUhnj6HTAnl2tGONOFibwicBx0JmeelOFbaiaux0o1RrNBWw60Zk6JTx4icKvfDYBDdCsuegeqlSfcfIRZiayGAy5Ikfh4rXcN2dbndc/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

（以上项目背景选自港大 HKUDS 团队成员发的项目推文内容）

于是，香港大学数据科学实验室（HKUDS）团队出手了，开源了 **CLI-Anything** —— 一个让所有软件都能变成 Agent 原生工具的革命性项目！

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/rfBHhQhezUhNcYiaNak4K12PKibny8I4KDiaRR8zJZuJXmnAWRIBhAmb1Mtf1iaWDcBicjibCYRLh5qLkR6pETRt4V7TF09fibGD1KdbnXc31MHR60/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

刚刚开源，就已经在 GitHub 上收获了 1.4K Star。

#### 项目简介

**CLI-Anything** 的核心思路非常直接： **用 CLI 作为 AI Agent 和真实软件之间的桥梁** 。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/rfBHhQhezUhpuNv97vFiaYqNgK3ZEdrHpvHr23Ors6tEH2ul5PNdDqzFuYdoA6Kplmp6jz5DT4VjRqibMC6pK2w5mfPSIjQJqS9Ij2gDf2O5o/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

它本质上是在做一件一直没被真正解决好的事——把人类设计的软件，直接转变成 Agent 能用的工具，而且不损失任何功能。

项目的 slogan 很霸气： **"Today's Software Serves Humans 👨💻. Tomorrow's Users will be Agents 🤖."** （ **今天的软件为人而生👨💻，明天的用户是 Agent🤖** ）。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/rfBHhQhezUgnMVjlMibAI1h9BiaLp47ZYWr46FILaDAeGTgj44R82xB4Gib6oxJ6ABpKVOK0otQ3YEDGRtV5AoXjQgHpXHaWEroB0j54FhVKys/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

这个项目不是一个简单的 wrapper，而是一套完整的方法论。你把代码库往里一丢：

```
/cli-anything ./gimp
```

你的 Agent 就拿到了一整套完整的、生产级的 GIMP CLI！

```
/cli-anything ./blender
```

Blender 同理。

LibreOffice、OBS Studio、Shotcut、Audacity、Inkscape、Kdenlive......

只要是开源软件，只要有代码库，统统都能搞。

#### 核心亮点

① 一键生成 CLI，7 阶段自动化全包了

CLI-Anything 提供了一个完整的 Claude Code 插件，一条命令就能自动完成所有工作：

- • 🔍 **分析** ——扫描源码，把 GUI 操作映射到 API
- • 📐 **设计** ——架构命令组、状态模型、输出格式
- • 🔨 **实现** ——构建带 REPL、JSON 输出、撤销/重做的 Click CLI
- • 📋 **规划测试** ——创建包含单元测试和 E2E 测试的 TEST.md
- • 🧪 **编写测试** ——实现完整的测试套件
- • 📝 **文档** ——更新 TEST.md 记录结果
- • 📦 **发布** ——创建 setup.py，安装到 PATH

整个流程完全自动化，你只需要等着用就好！

② 真实软件集成，零妥协

这是 CLI-Anything 最让人惊喜的地方：它不是在做软件的替代品，而是给现有软件加上 Agent 友好的接口。

- • LibreOffice 真的生成 PDF
- • Blender 真的渲染 3D 场景
- • Audacity 真的处理音频
- • GIMP 真的编辑图像

生成的 CLI 直接操作真实的项目文件（ODF、MLT XML、SVG），然后调用真实的应用程序去渲染，一点不含糊！

③ 告别脆弱的 UI 自动化

再也不用截图、不用点击、不用 RPA 的脆弱性了！CLI-Anything 走的是纯命令行路线，稳定可靠。

- • 没有截图识别的不确定性
- • 没有 UI 元素位置改变导致的失效
- • 没有点击延迟和视觉干扰

纯 CLI，就是这么可靠！

④ 结构化输出，Agent 直接消费

每个生成的 CLI 都支持双模式：

- • **状态化的 REPL 交互模式** ：适合 Agent 会话
- • **子命令的脚本模式** ：适合流水线和脚本

而且内置了 `--json` 标志，输出结构化数据，Agent 直接就能用，同时保留人类可读格式方便调试！

⑤ 生产级测试，1436 个测试 100% 通过率

HKUDS 团队真的在 9 个专业软件上做了完整的验证，总共 1436 个测试，100% 通过率：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这些都是真刀真枪的测试，包含单元测试、E2E 测试，还有真实软件调用验证！

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### 快速入手

前置要求

- • Claude Code（带插件支持）
- • Python 3.10+
- • 目标软件已安装（如 GIMP、Blender、LibreOffice 等）

Step 1：添加 Marketplace

CLI-Anything 是作为 Claude Code 插件分发的，首先添加 Marketplace：

```
/plugin marketplace add HKUDS/CLI-Anything
```

Step 2：安装插件

```
/plugin install cli-anything
```

搞定！插件现在在你的 Claude Code 会话中可用了。

Step 3：一键生成 CLI

```
# 为 GIMP 生成完整 CLI（全部 7 阶段）
/cli-anything ./gimp

# 为 Blender 生成 CLI
/cli-anything ./blender

# 从 GitHub 仓库生成
/cli-anything https://github.com/blender/blender
```

Step 4：使用生成的 CLI

```
# 安装到 PATH
cd gimp/agent-harness && pip install -e .

# 从任何地方使用
cli-anything-gimp --help
cli-anything-gimp project new --width 1920 --height 1080 -o poster.json
cli-anything-gimp --json layer add -n "Background" --type solid --color "#1a1a2e"

# 进入交互式 REPL
cli-anything-blender
```

#### 实际使用示例

让我们看看用生成的 CLI 能做什么！

示例 1：用 LibreOffice 生成 PDF

```
# 创建新的 Writer 文档
$ cli-anything-libreoffice document new -o report.json --type writer
✓ Created Writer document: report.json

# 添加内容
$ cli-anything-libreoffice --project report.json writer add-heading -t "Q1 Report" --level 1
✓ Added heading: "Q1 Report"

$ cli-anything-libreoffice --project report.json writer add-table --rows 4 --cols 3
✓ Added 4×3 table

# 通过 LibreOffice 无头模式导出真实 PDF
$ cli-anything-libreoffice --project report.json export render output.pdf -p pdf --overwrite
✓ Exported: output.pdf (42,831 bytes) via libreoffice-headless

# JSON 模式给 Agent 使用
$ cli-anything-libreoffice --json document info --project report.json
{
  "name": "Q1 Report",
  "type": "writer",
  "pages": 1,
  "elements": 2,
  "modified": true
}
```

示例 2：用 Blender 进行 3D 渲染（REPL 模式）

```
$ cli-anything-blender
╔══════════════════════════════════════════╗
║       cli-anything-blender v1.0.0       ║
║     Blender CLI for AI Agents           ║
╚══════════════════════════════════════════╝

blender> scene new --name ProductShot
✓ Created scene: ProductShot

blender[ProductShot]> object add-mesh --type cube --location 0 0 1
✓ Added mesh: Cube at (0, 0, 1)

blender[ProductShot]*> render execute --output render.png --engine CYCLES
✓ Rendered: render.png (1920×1080, 2.3 MB) via blender --background

blender[ProductShot]> exit
Goodbye! 👋
```

#### 适用场景

CLI-Anything 的适用范围非常广，几乎覆盖所有软件类别：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### 未来规划

CLI-Anything 团队的愿景非常宏大：

- • 支持更多应用类别（CAD、DAW、IDE、EDA、科学工具）
- • 建立 Agent 任务完成率的基准测试套件
- • 社区贡献的 CLI harness，用于内部/定制软件
- • 与更多 Agent 框架集成（不仅仅是 Claude Code）
- • 支持将闭源软件和 Web 服务的 API 打包成 CLI
- • 生成 SKILL.md 供 Agent 技能发现和编排

#### 写在最后

CLI-Anything 代表了一个重要的方向： **Agent 时代的方法论** 。它让任何有代码库的软件都能变成 Agent 原生工具。

如果你也曾经希望 Agent 能像用终端一样用真正的软件——这就是 HKUDS 团队在推动的事！

GitHub：

> https://github.com/HKUDS/CLI-Anything

  

  

  

  

  

  

如果本文对您有帮助，也请帮忙点个 赞👍 + 在看 哈！❤️

**在看你就赞赞我！**

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

开源星探

向上滑动看下一个