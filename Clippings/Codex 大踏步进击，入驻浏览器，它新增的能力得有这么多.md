---
title: "Codex 大踏步进击，入驻浏览器，它新增的能力得有这么多…"
source: "https://mp.weixin.qq.com/s/EhTVLFVQTZpaRwJ9rTWiCw?version=5.0.8.91184&platform=mac&from=industrynews#rd"
author:
  - "[[池建强]]"
published:
created: 2026-05-11
description: "5 月 7 日，OpenAI 给 Codex 做了个 Chrome 扩展。"
tags:
  - "OpenAI"
  - "Codex"
  - "Chrome扩展"
  - "浏览器自动化"
  - "子代理"
  - "多人协作"
  - "Web测试"
  - "调试"
  - "Agent能力"
abstract: "OpenAI 发布 Codex for Chrome 扩展，使其能够直接操作浏览器、协调多个子代理并行测试复杂网页交互，从而显著增强其作为 Coding Agent 的能力，并可能威胁到 Anthropic 的地位，同时启示国内厂商重注 Coding Agent。"
---
池建强 *2026年5月10日 12:25*

**5 月 7 日，OpenAI 给 Codex 做了个 Chrome 扩展。类似扩展 opencli 之前就搞过，控制浏览器呗，我感觉这不是啥重磅消息，直到我看了这个视频：**

这个视频展示的是，用 Codex 控制 Chrome 浏览器，并派出 4 个子代理去测试一个多人在线画图游戏。流程如下：

1、用户给 Codex 下任务：让 4 个 subagents 用各自的 Chrome 标签页一起玩一个 drawing game。

2、Codex 启动本地网页应用，创建一个固定房间 CODEX4。

3、第一个代理先创建房间，另外 3 个代理再加入。

4、因为游戏需要多人同步开始，Codex 做了协调：等 4 个标签页都准备好后，再统一发出开始信号。

5、画图题目是 tiny lighthouse，也就是“小灯塔”。

6、四个代理分别在各自画布里画灯塔，有的画了红屋顶、黄光束、蓝色海浪，有的画了塔身、灯室、门和地面/水波。

7、最后 Codex 检查 Chrome 里的实际结果，确认 4 个 live PromptGrid 标签页都在同一个房间里，并且每个代理都完成了绘制。

看完这个我就知道了，大厂做的扩展和开源扩展，确实不是一个东西。 **Codex for Chrome 不只是测试代码成果，还能实际操作浏览器，协调多个代理并行测试复杂的网页交互场景，尤其是多人协作/多人在线应用这种人工测试比较麻烦的流程。**

这就是价值所在。

**1**

今年 2 月 Codex 发布了 macOS 桌面端，3 月是 Windows，4 月增加了 Computer Use 功能，增强了桌面端的 Coding Agent 能力，这我之前写过一篇，从 4 月开始，Codex 配合了 GPT 5.5，确实不是以前的 Codex，脱胎换骨，成为 OpenAI 的另一个超级 App。

为啥要做浏览器扩展呢？这个我之前也写过，AI 让 Web 重生，现在用户的大部分工作场景，都在浏览器里。测试 Web 应用、看控制台、调试、登录各种内部系统——现代人一天 80% 的工作时间泡在浏览器里。

Computer Use 当然也能操作浏览器，但它的方式是“看屏幕截图 → 推理 → 点坐标”，这么绕哒，随便点点还行，但是对浏览器场景来说，完全不够，比如视频里的方式，之前 Computer Use 是不可能实现的。

既然工作都在浏览器里，那就让 Codex 原生地待在浏览器里吧。这个思路我估计其他综合助手 Agent 都会跟进。

**2**

我现在经常用 OpenCLI 做一些数据源的桥接，把它们转化成 rss 订阅源，怎么做到呢，就是 OpenCLI 做了 Chrome 的扩展。Codex 类似，只不过 Codex + Chrome 能力更强大了。

装好扩展之后，Codex 就能获取当前 Chrome 的完整能力：已登录的 session、多标签页的上下文、DevTools 的调试接口等等。

比如，Codex 以后就可以做这些事了：

**直接操作已登录的网页服务。** 你在 Chrome 里登着 ERP、Jira、企业内部后台，Codex 可以直接在这些页面上帮你干活——批量更新客户信息、导数据、在内部系统里走流程等等，咱小公司没这些家伙什，给你们演示下操作墨问的 Web 端：

```css
@Chrome 打开 Chrome，访问 mowen.cn，写一篇墨问保存，内容是：测试一下 Codex 的弹性。
```

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UPrINMNXen3Vjt9PRfyOovCKW8GDKz7xsTliavpAXfQMQrLOyp6mMEdvSNHEHvvEl3noDKiapg3v02naFm4ED3OW2QIqddJ2ZQicg191yebWdE/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

**![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)**

**多标签页后台并行。** Codex 可以自己开标签页，在后台同时处理多个任务，用 Tab Group 把相关页面归到一组，也不会抢你正在用的浏览器焦点，你该咋用咋用，只要把任务说清楚就行。它默默干活，最后给你个结果。

**集成了 DevTools。** 这个对开发者很实用，尤其对我这种不懂前端的 Vibe Coder，可以它来查前端的 bug，比如检查 loading 页有没有 console error，把 4xx/5xx 的网络请求列出来等等，它会调 Chrome DevTools 的接口，自己完成检查，把结果结构化给到我。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**跨标签页汇聚上下文。** 打开了墨问笔记详情页、figma 设计文档、GitHub 上的代码文件，然后跟 Codex 说“综合这三个页面，帮我写个 XX 方案”——有点 AI 浏览器的骚操作了：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这里有个设计上的细节值得提一下。Codex 现在有三种方式访问网络资源：已有的 API 插件（比如 GitHub 集成）、Chrome 扩展、以及内置浏览器（用来访问 localhost 本地开发环境，这个我之前写过）。

这时候，当用户发出一个指令的时候，Codex 会自动判断用哪个通道最高效——有直连 API 就走 API，需要登录态的走 Chrome，访问本地服务器走内置浏览器。

有时候我让它看墨问笔记，它会告诉我，你有 mocli（即将发布），这个效率更高。所以，大多数时候咱们不需要操心这些事儿，只需要下指令就行。如果想指定使用 Chrome，就加 @Chrome。

**3**

谁会用到这些功能呢？还是开发者偏多，开发的场景最直观：前端测试、调试验证、检查日志、PR review 等等，都能用。

OpenAI 显然想做得更宽泛一些，比如“CRMs, dashboards, docs, and other apps”……

Codex 未来面向的是所有日常工作泡在浏览器里的人。运营同学用来操作后台、产品经理用来看数据看板、市场同学用来批量收集竞品信息，这个野心不可谓不大呀。

现在 Codex 周活跃用户已经超过 400 万，比年初增长了 8 倍，收入呼呼涨。这个可能已经在威胁 Anthropic 的地位了，对国内厂商也有启示作用。

国内大模型，咱得重注压 Coding Agent 啊，毕竟国外的用起来费劲。

**对，安装路径最后说一下：** 打开 Codex 桌面应用 → Plugins 菜单 → 安装 Codex for Chrome → Chrome 里确认授权。前提是你已经有 Codex 桌面端（Mac 或 Windows）。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

安全方面要注意一下，既然 Codex 能操作你已登录的网页，就意味着它能接触到你在那些服务里的数据。这是能力来源，也是风险边界，自己做好平衡。

Safari 和 Firefox？暂时没有，只支持 Chrome。

对了，Engadget 的报道里提到一个信息：OpenAI 未来计划把 Codex、ChatGPT、以及他们自研的浏览器 Atlas 合并成一个统一应用。

如果这件事成了，我们可以看到这样的画面：一个 AI 既能跟你对话、又能帮你写代码、还能直接操作浏览器完成各种网页任务，三种能力融合在同一个窗口里。

不知道是不是真的，启示目前这种方式我觉得也挺好，主要是我不怎么用 ChatGPT 了，Codex 全搞定，但普通用户还是用 ChatGPT、豆包、千问这样的助手更多，所以我感觉不大会合并。也许桌面端有可能？拭目以待吧。

继续滑动看下一个

MacTalk

向上滑动看下一个