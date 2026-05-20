---
title: "魔改Codex，增强版的 Codex++ 在GitHub上杀疯了！"
source: "https://mp.weixin.qq.com/s/-9I8jnlb64JTxipTVEsR2w"
author:
  - "[[丛林]]"
published:
created: 2026-05-20
description:
tags:
  - "增强工具"
  - "注入脚本"
  - "解锁插件"
abstract: "Codex++ 是一款通过CDP注入增强Codex桌面端功能、解锁插件和删除会话的开源工具。"
---
丛林 *2026年5月20日 11:45*

Codex 很强大，打开界面，确实挺干净，是一款不错的 AI 编程助手。但是实际使用中，我想删掉一个测试会话，翻遍菜单，找到的只有「归档」，没有删除。我以为是我漏看了，又找了一遍，确实没有。

这种产品决策真的很 OpenAI。功能做得漂亮，但边边角角的东西就不太管，也可能是用户习惯问题，我们和老外有点差别。上面的问题只是体验和习惯问题，最重要的是国内用户还要额外面对一个问题：API key 登录模式下，插件入口直接灰掉，点了告诉你「请登录 ChatGPT」。

然后，这几天我发现了一款开源软件： `Codex++` ，这是一个国内开发者开源的 CodexApp 的增强工具，用了一下，对味儿了！

---

## Codex App 的来历

OpenAI 在 2025 年推出了 Codex 桌面端，这是他们 Codex CLI 的图形版本，底子是 Electron，内置多 Agent 协作机制。相比纯命令行，它有了可视化的会话管理、项目上下文绑定、插件扩展点。

作为一个一直混在 Claude Code 和 Codex CLI 之间搞开发的人，我对这种桌面端的期待是：能用就行，别给我添堵。Codex App 的问题在于，它的 UI 打磨明显是面向国外用户设计的，会话删除、API 路由自定义这些事儿，不在他们的优先级列表里。

---

## 先看看官方版缺了什么

用 API key 登录 Codex 之后，很快会遇到几个卡点：

**插件入口被锁。** 原生界面上的插件功能需要 ChatGPT 账号登录态，API key 模式下直接不可用。

![API Key 模式下插件入口不可用的截图，按钮呈灰色禁用状态](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

API Key 模式下插件入口不可用的截图，按钮呈灰色禁用状态

**会话删不掉。** 会话列表里只有归档，真正的删除按钮不存在。项目多了之后，这个列表会越堆越乱。

![原生会话列表缺少删除按钮，只有归档入口](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

原生会话列表缺少删除按钮，只有归档入口

**API 路由不灵活。** 想把模型请求转到自定义兼容接口？官方不支持，得手动改配置文件，而且重启之后可能又回到默认。

这三个问题单独看都不大，叠在一起，日常使用就容易磨人。

---

## Codex++ 是什么

`Codex++` 是一个专门给 Codex App 做外部增强的开源工具，Rust 后端，Tauri 管理面板，支持 Windows 和 macOS（Intel + Apple Silicon 都有包）。

它不碰 Codex 的安装目录，不改 `app.asar` ，也不往系统里写 DLL。它的方式是：用自己的 launcher 启动 Codex，然后通过 Chromium DevTools Protocol（CDP）把增强脚本注入到渲染进程里。

简单说，就是在 Codex 跑起来之后，用调试协议在页面层面做了一些你本来就想做的事。

---

## 解释一下 CDP 注入是怎么回事

CDP 是 Chrome 浏览器暴露出来的调试接口，各种自动化测试工具（Playwright、Puppeteer）都走这条路。Electron 应用本质上是一个 Chromium 窗口跑 web 前端，所以理论上也能通过 CDP 操作。

`Codex++` 的做法是：启动 Codex 时开启调试端口，然后自己的后端进程通过这个端口连进去，往渲染进程里注入 `renderer-inject.js` 。这段脚本就是所有增强功能的执行层——解锁插件按钮、加上删除会话的交互、挂上设置面板。

好处是很明显的：Codex App 更新之后，只要页面结构没大变，脚本基本能继续用；就算结构变了，改脚本就行，不需要动安装包。

---

## 核心功能

装完 `Codex++` 后，从它的入口启动，界面顶部菜单栏会多出一个「 `Codex++` 」项目，能看到后端状态和设置面板入口。

![顶部菜单栏出现 Codex++ 菜单项，旁边是后端状态指示灯](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

顶部菜单栏出现 Codex++ 菜单项，旁边是后端状态指示灯

![Codex++ 设置面板截图，包含各项增强功能的开关](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Codex++ 设置面板截图，包含各项增强功能的开关

**解锁插件 + 删除会话**

API key 模式下，插件入口灰掉的问题直接解决。会话列表里鼠标悬停，删除按钮就出现了——就这么一个细节，用起来利索多了。

![Codex++ 注入后，插件入口已解锁，会话悬停时出现删除按钮](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Codex++ 注入后，插件入口已解锁，会话悬停时出现删除按钮

**Markdown 导出**

会话内容可以导出成 Markdown，方便整理笔记或者存档。这个功能听起来普通，但我每次在 Claude Code 里想导出对话记录的时候都找不到入口，所以见到这个还是挺高兴的。

**Timeline**

类似项目版本回溯的 Timeline 视图，可以看会话的历史状态。对于比较长的任务上下文，有时候翻一翻历史挺有用的。

**项目移动**

可以把 Codex 里的项目从一个目录挪到另一个目录，不用手动改配置。

**用户脚本**

支持自定义脚本，在 Codex++ 启动时自动注入。如果你熟悉 Tampermonkey 那套逻辑，这里可以干类似的事——改界面、加功能，完全自由。

**Provider 同步**

切换供应商（比如从官方 ChatGPT 切到中转）之后，旧会话依然能看到，不会因为登录态换掉就消失。这是一个很容易被忽视但实际上很重要的东西。

**Zed 集成**

如果你在用 Zed 做远程开发， `Codex++` 能识别远程 SSH 上下文，允许直接从 Codex 里打开对应的远程文件到 Zed Remote Development。这个功能很小众，但用得上的人会觉得很省心。

---

## 中转注入

> 这个项目真正的杀手锏

如果说前面那些功能是修修补补，中转注入才是 `Codex++` 真正有意思的地方。

具体场景是这样：你已经用 ChatGPT 账号登录了 Codex，但你希望模型请求走自己的 API 接口，而不是走 OpenAI 默认路由。

官方流程里这件事要手动改 `~/.codex/config.toml` ，而且每次切换账号都可能被覆盖掉。

`Codex++` 的管理工具里有一个「中转注入」页面，操作步骤大概是：确认检测到 ChatGPT 登录态 → 添加中转配置（填 Base URL 和 Key）→ 选中并应用 → 从 `Codex++` 入口启动。

它会在 config.toml 里写入类似这样的内容：

```
model_provider = "CodexPlusPlus"

[model_providers.CodexPlusPlus]
name = "CodexPlusPlus"
wire_api = "responses"
requires_openai_auth = true
base_url = "https://example.com/v1"
experimental_bearer_token = "sk-..."
```

支持配置多个中转方案，可以随时切换，也可以一键清除回到官方登录态。对于经常在不同 API 服务之间对比的人来说，这比手改配置文件顺手多了。

---

## 安装与上手

去 GitHub Releases 下载对应平台的安装包：

- • Windows： `CodexPlusPlus-*-windows-x64-setup.exe`
- • macOS Intel： `CodexPlusPlus-*-macos-x64.dmg`
- • macOS Apple Silicon： `CodexPlusPlus-*-macos-arm64.dmg`

装完之后有两个入口。日常用 `Codex++` 就够，它是静默启动，不弹管理界面，只负责拉起 Codex 并注入增强。 `Codex++ 管理工具` 是配置用的，中转设置、脚本管理、更新检查都在里面。

macOS 上有个常见问题：系统提示「无法打开或已损坏」。原因是安装包目前没有经过 Apple 公证，Gatekeeper 会拦截。去「系统设置 - 隐私与安全性」里手动允许就行。不放心的话可以自己看源码，Rust 写的，仓库完全开放。

---

## 项目结构与技术栈

仓库的主体结构长这样：

```
apps/
  codex-plus-launcher/      静默启动入口
  codex-plus-manager/       Tauri 管理工具（React 前端）
assets/inject/
  renderer-inject.js        注入到 Codex 渲染端的脚本
crates/
  codex-plus-core/          启动、注入、配置、更新、桥接等核心逻辑
  codex-plus-data/          会话数据、导出、Provider 同步
scripts/installer/
  windows/CodexPlusPlus.nsi Windows NSIS 安装包
  macos/package-dmg.sh      macOS DMG 打包
```

后端全是 Rust，Cargo workspace 管理多个 crate。管理工具是 Tauri 2.x + React，前端打包用 Vite，支持深色/浅色切换。Windows 打包走 NSIS，macOS 两个架构分开出 DMG。

早期版本有一个 Python 入口（就是仓库里还能看到的 `codex_session_delete/` 目录），现在已经不推荐用了，保留只是为了兼容历史。

整个技术选型还算务实——Rust 保证了启动快、没有 Python 环境依赖；Tauri 让管理工具轻量不臃肿；CDP 注入方案保持了和 Codex 本体的解耦，App 更新影响面最小。

---

## 最后说几句

`Codex++` 是那种很典型的「有人烦了自己做」型开源项目。官方不给删除按钮，就自己加；插件入口被锁，就自己解锁；想用中转 API，就自己写注入逻辑。

代码完全开放，不修改原始文件，CDP 注入这条路也是可审计的，没什么黑魔法。Codex App 更新之后有可能注入脚本需要跟着调整，但作者更新频率不低，这块风险不大。

如果你在用 Codex 桌面端， `Codex++` 基本上是值得装的。功能不多，但都踩在真实痛点上。

开源地址：

> https://github.com/BigPizzaV3/CodexPlusPlus

*****点击下方卡片，关注极客之家*****

这个公众号曾分享过许多有趣的开源项目。如果你不想逐篇翻阅历史文章，也可以直接关注微信公众号“极客之家”，通过后台留言与我们互动交流

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

拥抱AI · 目录

继续滑动看下一个

极客之家

向上滑动看下一个