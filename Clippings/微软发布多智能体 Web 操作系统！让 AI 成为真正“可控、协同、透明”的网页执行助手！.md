---
title: "微软发布多智能体 Web 操作系统！让 AI 成为真正“可控、协同、透明”的网页执行助手！"
source: "https://juejin.cn/post/7506847215290597402"
author:
  - "[[开源星探]]"
published: 2025-05-22
created: 2025-05-23
description: "继 Magentic-One 后，微软在此基础上推出了新一代多智能体 Web 操作系统：Magentic-UI！ 一个由多智能体系统驱动的 Web 自动化工具，能： 自动浏览网页、点击、填写表单等操作"
tags:
  - "clippings"
---
![横幅](https://p6-piu.byteimg.com/tos-cn-i-8jisjyls3a/0bdb448b29434da59b1e21fcb970e11f~tplv-8jisjyls3a-image.image)

[开源星探](https://juejin.cn/user/2977915149494248/posts)

27 阅读3分钟

![](https://p9-piu.byteimg.com/tos-cn-i-8jisjyls3a/c676d36a15f248e8aedb339deddadb90~tplv-8jisjyls3a-image.image)

继 Magentic-One 后，微软在此基础上推出了新一代多智能体 Web 操作系统： **Magentic-UI** ！

![图片](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/687c2ea438454669bef90b84c3162e6c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5byA5rqQ5pif5o6i:q75.awebp?rk3s=f64ab15b&x-expires=1748488558&x-signature=e2c5RlC5R1k3gkgGs3SZ%2BNGC8fY%3D)

一个由多智能体系统驱动的 Web 自动化工具，能：

- 自动浏览网页、点击、填写表单等操作
- 生成并执行代码，对网页数据或文件进行分析处理
- 多智能体协同工作，具备协同规划 + 协同执行能力
- 自动保存成功的任务流程，用于后续快速复用

简单说：它是一个可理解网页 + 可写代码 + 可执行操作的超级AI助手！

Magentic-UI 与其他浏览器使用产品不同的地方在于其透明且可控的界面。它基于 `AutoGen` 框架，集成了强大的多智能体协作能力，支持用户随时介入、暂停或接管操作，还能保存成功计划以复用，效率和安全性兼得。

![图片](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7473e461b4e8452c9a2507bf15d4ec6d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5byA5rqQ5pif5o6i:q75.awebp?rk3s=f64ab15b&x-expires=1748488558&x-signature=EdWLxhxojxCjmwd91aKaGIj9sEM%3D)

#### 主要功能

- **协同规划** ：通过聊天和计划编辑器共同创建和批准逐步计划。
- **协同任务** ：直接通过网页浏览器或通过聊天中断并引导任务执行。Magentic-UI 还可以在需要时请求澄清并提供帮助。
- **操作保护** ：敏感操作只有在获得用户明确批准后才会执行。
- **计划学习和检索** ：从前次运行中学习，以改进未来的任务自动化，并将它们保存到计划图库中。在未来的任务中自动或手动检索保存的计划。
- **并行任务执行** ：您可以并行运行多个任务，会话状态指示器会告诉您何时需要您的输入或任务已完成。
- **多智能体协作** ：网页操作、代码生成/执行、文件处理，分工明确，效率翻倍。
- **多场景适用** ：支持网页数据抓取、表单填写、代码分析、文件处理，适合数据分析、自动化任务、软件开发等场景。

#### 快速入手

Magentic-UI 的安装和使用非常友好，官方提供详细文档（GitHub），支持本地和云端（Azure）部署。

① 安装 Python 3.10+ 和虚拟环境

```bash
python3 -m venv .venv
source .venv/bin/activate
```

② 使用 pip 安装Magentic-UI

```
pip install magentic-ui
```

③ 启动端口服务

```
magentic ui --port 8081
```

如果要使用 Azure 模型或 Ollama，请安装可选依赖项：

```
# for Azure
pip install magentic-ui[azure] 
# for Ollama
pip install magentic-ui[ollama]
```

当然也支持，前后端的源代码构建，详细操作流程可在项目Readme文档中查看。

最后浏览器访问 `http://localhost:8000` ，左侧面板创建任务会话，右侧显示计划和浏览器操作。

![图片](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f19f418f92ae46428dd5da38aca7f59c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5byA5rqQ5pif5o6i:q75.awebp?rk3s=f64ab15b&x-expires=1748488558&x-signature=wMKVbjlkpj3xVLe5P2OywKbrD38%3D)

#### 适用场景

Magentic-UI的透明性和多功能性让它适用于多种复杂场景：

- **网页数据抓取与分析** ：自动从网站提取数据（如价格、评论），生成Python代码分析，适合市场研究或数据科学。
- **自动化表单填写** ：处理复杂表单（如预订餐厅、购买产品），用户批准每步，安全又高效。
- **代码生成与调试** ：从网页提取代码片段（如C++函数），自动生成测试用例或优化代码，助力开发。
- **文件处理与报告** ：分析本地文件（如PDF、CSV），生成Markdown报告，适合科研或业务分析。
- **任务自动化** ：自动化多步任务（如“查找航班+生成价格图表”），计划复用让重复任务更高效。

#### 写在最后

Magentic-UI 使用微软开源的 Magentic 系列作为智能体协调核心，可浏览网页、操作 DOM、执行 JS/脚本、使用代码分析工具。

更重要的是，它让你全程掌控：协同规划、随时干预、安全防护，每一步都透明可控。

用户可实时接管任务（人机混合协同执行），支持 UI 交互 + 命令式操作，适合开发者和非技术人员。

如果你想让 AI 自动帮你浏览网页、点击、搜集信息、写代码分析数据，Magentic-UI 是一款很不错的开源方案之一！

GitHub 项目地址： [github.com/microsoft/M…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmicrosoft%2FMagentic-UI "https://github.com/microsoft/Magentic-UI")

评论 0

![avatar](https://p6-passport.byteacctimg.com/img/user-avatar/596dd11ec1eb86109467f46963b9da45~100x100.awebp)

0 / 1000

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

![avatar](https://p3-passport.byteacctimg.com/img/user-avatar/785b57bc102da7251d8315725f13b33e~70x70.awebp)

为你推荐

- [微软 Build 2025：AI 智能体时代与开放智能体网络的构建](https://juejin.cn/post/7506339116590678057 "微软 Build 2025：AI 智能体时代与开放智能体网络的构建")
		[我们已迈入 AI 智能体时代。随着推理能力和记忆机制的突破性进展，AI 模型如今已变得更强大和高效，我们正在见证着 AI 系统如何以全新的方式帮助人们解决问题。](https://juejin.cn/post/7506339116590678057)
	- [
		微软开发者
		](https://juejin.cn/user/1898198335494298)
	- 8
	- 点赞
	- 评论
- [Manus：AGI时代的个人工作操作系统，真正实现“解放双手”](https://juejin.cn/post/7504661871464300584 "Manus：AGI时代的个人工作操作系统，真正实现“解放双手”")
		[Manus：”万人之师“ 今天要给大家伙儿介绍一位重量级选手——Manus，你的私人AI总管！这可不是什么普通的AI助手，它更像一支训练有素的AI军团，任你调遣，为你冲锋陷阵，让你一人成团，天下我有](https://juejin.cn/post/7504661871464300584)
	- [
		我想说一句
		](https://juejin.cn/user/71888833622535)
	- 362
	- 33
	- 7
	![Manus：AGI时代的个人工作操作系统，真正实现“解放双手”](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/cd107dc364594614886c7177b5088460~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oiR5oOz6K-05LiA5Y-l:q75.awebp?rk3s=f64ab15b&x-expires=1748500506&x-signature=U6mARet5uFYCn%2BnQvhMEy3nl2gg%3D)
- [2025，人人都该学会开发 AI Agent！🔧 Coze + DeepSeek 低代码开发，让智能体真正动起来！](https://juejin.cn/post/7476107083774345252 "2025，人人都该学会开发 AI Agent！🔧 Coze + DeepSeek 低代码开发，让智能体真正动起来！")
		[AI 时代的「新生产力工具」正在悄然改变我们的工作方式！2025 年，AI Agent（智能体） 已经成为企业降本增效的“数字劳动力”，它不只是能回答问题，而是可以像真人一样规划任务、调用工具、记忆交](https://juejin.cn/post/7476107083774345252)
	- [
		AI云极
		](https://juejin.cn/user/561192789882523)
	- 95
	- 1
	- 评论
	![2025，人人都该学会开发 AI Agent！🔧 Coze + DeepSeek 低代码开发，让智能体真正动起来！](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6d4acd7452c34792a89f9ee39c243491~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgQUnkupHmnoE=:q75.awebp?rk3s=f64ab15b&x-expires=1748500506&x-signature=aeB1peILEApjcSuA6EyrjSI5jFU%3D)
- [🌟 一夜封神！国产AI智能体Manus究竟有多强？🌟](https://juejin.cn/post/7478506388894679074 "🌟 一夜封神！国产AI智能体Manus究竟有多强？🌟  ")
		[一、Manus是什么？ Manus，这款由中国团队研发的全球首款通用型AI智能体（AI Agent），近日引爆科技圈和资本市场！它不仅是“会思考的AI”，更是“能动手的超级助手”——从理解复杂指令到自](https://juejin.cn/post/7478506388894679074)
	- [
		小蚂蚁i
		](https://juejin.cn/user/391892043054589)
	- 217
	- 1
	- 2
- [字节跳动开源 AI Agent 框架 Agent TARS](https://juejin.cn/post/7483870074287243303 "字节跳动开源 AI Agent 框架 Agent TARS")
		[字节开源了一套 AI Agent 框架：Agent TARS 支持深度研究、电脑操作、文件编辑、MCP。 字节跳动开源 AI Agent 框架 Agent TARS 近日，字节跳动宣布开源其最新研发的](https://juejin.cn/post/7483870074287243303)
	- [
		XCaptaino
		](https://juejin.cn/user/3052665287739005)
	- 1.5k
	- 4
	- 1
	![字节跳动开源 AI Agent 框架 Agent TARS](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3d715e976a1147f1a5d897b556b5021c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgWENhcHRhaW5v:q75.awebp?rk3s=f64ab15b&x-expires=1748500506&x-signature=MlpOpaX2ZxHvqTEcv71%2Bo0lhka4%3D)
- [引领人机交互革命？微软研究团队发布80页的大模型GUI智能体综述](https://juejin.cn/post/7457720855428399145 "引领人机交互革命？微软研究团队发布80页的大模型GUI智能体综述")
		[图形用户界面（Graphical User Interface, GUI）作为数字时代最具代表性的创新之一，大幅简化了人机交互的复杂度。从简单的图标、按钮、窗口到复杂的多应用工作流程](https://juejin.cn/post/7457720855428399145)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 86
	- 3
	- 评论
- [40.2 K Star 超火的AI程序员项目！多个智能体整合，轻松实现各种开发任务！](https://juejin.cn/post/7456440725681487909 "40.2 K Star 超火的AI程序员项目！多个智能体整合，轻松实现各种开发任务！")
		[随着人工智能技术的不断进步，我们的工作方式也在发生根本性的变化。 而在软件开发领域，AI 正在扮演越来越重要的角色。 今天要向大家介绍的是一款开源的 AI 驱动软件开发多智能体平台：OpenHands](https://juejin.cn/post/7456440725681487909)
	- [
		开源星探
		](https://juejin.cn/user/2977915149494248)
	- 1.8k
	- 7
	- 2
- [微软开源黑科技：OmniParser——让AI像人类一样“看懂”屏幕并操控计算机](https://juejin.cn/post/7488730838046408713 "微软开源黑科技：OmniParser——让AI像人类一样“看懂”屏幕并操控计算机")
		[在当今人工智能与自动化技术飞速发展的时代，微软研究院推出的OmniParser无疑是一款具有里程碑意义的工具。它基于纯视觉技术，能够将屏幕截图转化为结构化数据，并通过大语言模型（LLM）实现自动化操作](https://juejin.cn/post/7488730838046408713)
	- [
		BuluAI算力云
		](https://juejin.cn/user/798699104509344)
	- 41
	- 点赞
	- 评论
- [构建深度集成AI助手：CopilotKit - 应用内的智能伙伴，让AI真正与用户协同工作！](https://juejin.cn/post/7506349526942466083 "构建深度集成AI助手：CopilotKit - 应用内的智能伙伴，让AI真正与用户协同工作！")
		[构建深度集成AI助手：CopilotKit - 应用内的智能伙伴，让AI真正与用户协同工作！ 设想一下，在您的应用中，AI不再是孤立的聊天窗口，而是真正融入工作流、理解上下文、并与用户协同完成任务的智](https://juejin.cn/post/7506349526942466083)
	- [
		AI铜锣猫
		](https://juejin.cn/user/2786586098678426)
	- 9
	- 点赞
	- 评论
- [AI也能操作手机了！DroidRun 让 Agent 实现智能手机自动化操作！](https://juejin.cn/post/7492545417930883108 "AI也能操作手机了！DroidRun 让 Agent 实现智能手机自动化操作！")
		[继 BrowserUse 和 ComputerUse 席卷 AI 自动化领域后，手机操作类项目终于迎来重磅选手：DroidRun！ 开源 AI 手机操作神器，解锁 Android 自动化新时代！ 目前](https://juejin.cn/post/7492545417930883108)
	- [
		开源星探
		](https://juejin.cn/user/2977915149494248)
	- 325
	- 点赞
	- 评论
- [Agentic AI要终结数据库和SaaS？大厂掌门人公开互撕，焦虑的CEO们押上了不同的技术路线](https://juejin.cn/post/7503438116234969139 "Agentic AI要终结数据库和SaaS？大厂掌门人公开互撕，焦虑的CEO们押上了不同的技术路线")
		[作者 | Tina Agent 正在成为 2025 年 AI 世界最炙手可热的关键词之一。 无论是大模型厂商、AI 初创公司，还是企业级应用团队，几乎都在讨论“多智能体协作”“自动化决策流程”以](https://juejin.cn/post/7503438116234969139)
	- [
		白鲸开源
		](https://juejin.cn/user/3870725052049454)
	- 10
	- 点赞
	- 评论
- [开源！OpenAI发布新AI工具，Agent元年真的到了？](https://juejin.cn/post/7480521576489861154 "开源！OpenAI发布新AI工具，Agent元年真的到了？")
		[就在刚刚，OpenAI 扔出了一枚重磅炸弹，发布了一系列全新的工具和API，旨在彻底简化AI Agent的开发流程，让无论是AI小白还是略懂AI的普通人，都能轻松构建强大、可靠的Agent！](https://juejin.cn/post/7480521576489861154)
	- [
		爱吃的小肥羊
		](https://juejin.cn/user/2637045249608064)
	- 14
	- 1
	- 评论
	![开源！OpenAI发布新AI工具，Agent元年真的到了？](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9af90ea41aab43aabe6d3787b9e1c4e0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg54ix5ZCD55qE5bCP6IKl576K:q75.awebp?rk3s=f64ab15b&x-expires=1748500506&x-signature=S2ka6bRpNpUUq1MbFxcZBlFi9cg%3D)
- [微软智能技术开发者挑战赛 |最受开发者欢迎奖投票通道开启！快来为喜爱的团队投票~](https://juejin.cn/post/7485264912417554443 "微软智能技术开发者挑战赛 |最受开发者欢迎奖投票通道开启！快来为喜爱的团队投票~")
		[经过激烈的角逐，微软智能技术开发者挑战赛已进入半决赛阶段！25 支优秀队伍凭借出色的创意和方案脱颖而出，他们的作品将进入“最受开发者欢迎奖”投票环节！](https://juejin.cn/post/7485264912417554443)
	- [
		微软开发者
		](https://juejin.cn/user/1898198335494298)
	- 44
	- 点赞
	- 评论
- [一夜刷屏AI圈！Manus：这不是聊天机器人，是你的“AI打工仔”！](https://juejin.cn/post/7478606730462117939 "一夜刷屏AI圈！Manus：这不是聊天机器人，是你的“AI打工仔”！")
		[这届AI终于学会“动手”了！ 昨日（3月6日），AI圈彻底炸锅了！一款名叫 Manus 的AI智能体直接刷屏朋友圈、微博和各大科技群。 消息一出，邀请码疯抢，有人惊呼“这是继DeepSeek后的又一王](https://juejin.cn/post/7478606730462117939)
	- [
		开源星探
		](https://juejin.cn/user/2977915149494248)
	- 258
	- 点赞
	- 评论
- [💥💥💥全球首款AI智能体——Manus“一码难求”](https://juejin.cn/post/7478565306730889253 "💥💥💥全球首款AI智能体——Manus“一码难求”")
		[3月6日凌晨，继DeepSeek之后科技领域的又一个不眠之夜，几乎大家都被Manus刷屏了。 Manus 源于拉丁语，意为“手”。 是一个将您的想法转化为行动的通用人工智能代理。](https://juejin.cn/post/7478565306730889253)
	- [
		小猪Passion
		](https://juejin.cn/user/4330356345935523)
	- 171
	- 2
	- 6
	![💥💥💥全球首款AI智能体——Manus“一码难求”](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e13b331c85214af5b7d6fff65862ab16~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP54yqUGFzc2lvbg==:q75.awebp?rk3s=f64ab15b&x-expires=1748500506&x-signature=Dd2hTLqbueR1jnpPC61WvZflJ0c%3D)

APP内打开