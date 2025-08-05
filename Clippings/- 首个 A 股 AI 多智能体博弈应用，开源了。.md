---
title: "首个 A 股 AI 多智能体博弈应用，开源了。"
source: "https://juejin.cn/post/7534549345275756586"
author:
  - "[[逛逛GitHub]]"
published: 2025-08-04
created: 2025-08-05
description: "逛 GitHub 的时候，发现了一个专门为 A 股打造的开源 AI 分析神器。 它采用多 AI 智能体协作+博弈辩论的原理，告别 AI 瞎忽悠的问题。 FinGenius 是首个 A 股博弈多智能体应"
tags:
  - "开源"
  - "AI"
  - "多智能体"
  - "博弈论"
  - "A股分析"
abstract: "首个专为A股设计的开源AI多智能体博弈应用FinGenius发布，采用多AI协作与博弈辩论机制提升分析可靠性。"
---
![横幅](https://p9-piu.byteimg.com/tos-cn-i-8jisjyls3a/8c759ddb57d0440986f4768fc644f879~tplv-8jisjyls3a-2:0:0:q75.image)

[逛逛GitHub](https://juejin.cn/user/1442202996186093/posts)

42 阅读4分钟

专栏：

逛逛GitHub

![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/b37ce6cd3dfa46f699d8fc9c7c888f2f~tplv-8jisjyls3a-3:0:0:q75.png)

逛 GitHub 的时候，发现了一个专门为 A 股打造的开源 AI 分析神器。

它采用多 AI 智能体协作+博弈辩论的原理，告别 AI 瞎忽悠的问题。

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7a355addeb494a9b869cb16dab1e6f77~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6YCb6YCbR2l0SHVi:q75.awebp?rk3s=f64ab15b&x-expires=1754913371&x-signature=qBav%2FjAMTuC8ExdJE4WdCeGs2PU%3D)

FinGenius 是首个 A 股博弈多智能体应用，堪称你的 AI 炒股智囊团，6 位专家在线帮你分析 A 股。

这个开源项目是国内 00 后团队搞出来的，太牛了。

## 01、项目简介

信息繁杂如迷宫、数据失真、通用大模型水土不服 ——A 股投研的三大痛点，终于有了解决方案。

如今，专为 A 股设计的多智能体开源项目 FinGenius 正式发布，16 个原生 Agent + 自主研发架构，这不仅是工具迭代，更是金融逻辑范式的重构。

FinGenius 团队历时 1700 天，打造出这款颠覆传统的智能金融分析工具。

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/161bbe6d8ce1432b8d4a410ab43418ef~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6YCb6YCbR2l0SHVi:q75.awebp?rk3s=f64ab15b&x-expires=1754913371&x-signature=WY8%2FyEw%2B4VG8wsh5UoVThHkpHyM%3D)

```arduino
GitHub地址：https://github.com/HuaYaoAI/FinGenius
```

工作原理

下面这张图可以把 FinGenius 的工作原理梳理的明明白白。

![architecture](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/4581d7b52b8c49b5878ba9791ac400c3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6YCb6YCbR2l0SHVi:q75.awebp?rk3s=f64ab15b&x-expires=1754913371&x-signature=mprcfUbamJ%2FEMGpTGv2belkMgR4%3D)      

想象一下，你输入一个股票代码：FinGenius 内部立刻有 **6 位专业的 AI 分析师** （就是所谓的智能体）开始为你忙碌起来：

① 舆情专家： 火速扫描全网，分析市场情绪和热点。

② 游资猎手：紧盯龙虎榜数据，解读大资金的动向。

③ 风控大师：深挖最新政策动向，评估潜在风险。

④ 技术派：盯着K线和技术指标，判断关键支撑压力。

⑤ 筹码侦探：分析股东变动和筹码分布，识别主力意图。

⑥ 大单雷达：监控盘中实时的大单异动，捕捉买卖信号。

![00 后天才团队，发布全球首个 A 股金融博弈智能体应用](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/cc969c01d4c24b97908c6ecc972dbbc0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6YCb6YCbR2l0SHVi:q75.awebp?rk3s=f64ab15b&x-expires=1754913371&x-signature=UgxD%2BgEFD1kX9gZLJaWrmpo490E%3D)      

而且这 6 位 AI 分析智能体不是各干各的，是有前后流程的。看上面的两张图也能看出来：

第一步：协作研究 (Research)：它们各自拿出看家本领，从不同角度深度分析这只股票，把各自的发现生成一份 **结构清晰、论据充分的 HTML 报告。**

第二步：多轮辩论 (Battle)：这步最精彩！报告呈现给多个 AI 智能体，它们不会简单认同报告，而是会 **围绕核心问题展开多轮辩论（默认2轮，可设置更多轮）** 。就像一群经验丰富的投资老手在会议室里激烈讨论。

第三步：最终决策：经过协作研究和激烈辩论，FinGenius 将生成的 HTML 报告，以及各位 AI 专家的观点、最终的共识或主要分歧都呈现给你。

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/4d63ffa3aa47400aa2831fd1fbb70c66~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6YCb6YCbR2l0SHVi:q75.awebp?rk3s=f64ab15b&x-expires=1754913371&x-signature=7XmXhDEsytCB86HK2CXzxYzAQ9g%3D)      

FinGenius 的聪明之处

① 专为 A 股而生：

逛逛之前也推荐过不少 A 股分析的开源项目，FinGenius 和它们不一样。FinGenius 靠 「动态任务树」调度，任务重构耗时 < 200ms，效率超静态框架 5 倍。

② 本土化训练：

拒绝「拿来主义」，不同于美股框架的汉化移植，Agent 模型的训练数据 100% 源自 A 股；特征工程打造 A 股专属因子；评估采用「A 股适配度得分」（含规则符合率、情绪准确率），而非通用指标。

③ MCP 协议与双环境：

数据保真与博弈底座。MCP 协议封装了 27 个工具，用户能像搭乐高一样操作，Agent 则会自主规划调用。

Research+Battle 双环境：Research 环境中，多智能体并行处理，各专业 AI 分析师同时启动，从海量数据源中高效筛选关键信息；

Battle 环境则是结构化的多智能体「思辨战场」，各智能体携带初步结论与核心证据，动态进行多轮观点交锋与论证。

④ 记性好：它用了「 **年轮记忆规则算法\]** ，能记住你的投资习惯和偏好，不是每次打开都失忆。（完整记忆体验在 APP 里，这个开源项目更多注重分析）。⑤ 懂博弈：核心创新在于引入「\*\*博弈论」\*\*思想（就像经典的「囚徒困境」），让智能体在信息不对称的市场环境下，通过预测对方行为来做出更优决策。 ![囚徒困境](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/bcf76caa2cf544a58d0be58454d7bd03~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6YCb6YCbR2l0SHVi:q75.awebp?rk3s=f64ab15b&x-expires=1754913371&x-signature=T4yT%2BIqVJgRpvI5rEqgofw6PDqU%3D)      

02

**如何部署**

下面是通过 Anaconda 来安装部署 FinGenius，并且对它进行配置启动。

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b79a47ea87c64e9692f269c020c9981d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6YCb6YCbR2l0SHVi:q75.awebp?rk3s=f64ab15b&x-expires=1754913371&x-signature=mooGYojKT1B%2B%2FADDt2Dzy74YiDY%3D) ![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ab5235d3ebd24a0797457b296eefba7d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6YCb6YCbR2l0SHVi:q75.awebp?rk3s=f64ab15b&x-expires=1754913371&x-signature=eOfKRWKn4OcBJ%2BViC3wjNBH9j2k%3D)

FinGenius 是一个 **专攻 A 股、理念先进的开源 AI 投资分析工具** 。

它最大的亮点是开发了 1 **6 个专业的 AI 智能体分工协作（开源了 6 个智能体）** ，并引入 **多轮辩论机制** 来提升分析的深度和可靠性，最终生成一份综合报告。

本项目仅供学习和研究，输出结果为 AI 推演，不构成任何投资建议。投资有风险，入市需谨慎。

标签：

本文收录于以下专栏

![cover](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0376cf469f4f452f807c3dde850218a5~tplv-k3u1fbpfcp-jj:160:120:0:0:q75.avis)

逛逛GitHub

专栏目录

欢迎关注同名公众号「逛逛GitHub」，每日推荐一个优质开源项目

2.2k 订阅

·

120 篇文章

上一篇

这 3 个 AI 的 GitHub 项目，有点儿东西。

评论 0

![avatar](https://p6-passport.byteacctimg.com/img/user-avatar/596dd11ec1eb86109467f46963b9da45~100x100.awebp)

0 / 1000

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 1

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

![avatar](https://p6-passport.byteacctimg.com/img/user-avatar/8e6d13ed687541e576f001e5a89e4244~70x70.awebp)

为你推荐

- [AI Daily | AI日报：摩尔线程冲刺国产GPU第一股; KAIST公布HBM4关键特性及长期路线图; 北京AIGC创投会推动文旅与AI融合](https://juejin.cn/post/7517567528668594212 "AI Daily | AI日报：摩尔线程冲刺国产GPU第一股; KAIST公布HBM4关键特性及长期路线图; 北京AIGC创投会推动文旅与AI融合")
		[摩尔线程冲刺国产GPU第一股; KAIST公布HBM4关键特性及长期路线图; 北京AIGC创投会推动文旅与AI融合; Karpathy：AI时代给大模型做“服务”机会大; AI选数](https://juejin.cn/post/7517567528668594212)
	- [
		AIReadingHub
		](https://juejin.cn/user/2189882891712365)
	- 91
	- 点赞
	- 评论
	![AI Daily | AI日报：摩尔线程冲刺国产GPU第一股; KAIST公布HBM4关键特性及长期路线图; 北京AIGC创投会推动文旅与AI融合](https://picsum.photos/1200/630?random=2821)
- [AI-Compass 强化学习模块：理论到实战完整RL技术生态，涵盖10+主流框架、多智能体算法、游戏AI与金融量化应用](https://juejin.cn/post/7528694026825531438 "AI-Compass 强化学习模块：理论到实战完整RL技术生态，涵盖10+主流框架、多智能体算法、游戏AI与金融量化应用")
		[AI-Compass 强化学习模块：理论到实战完整RL技术生态，涵盖10+主流框架、多智能体算法、游戏AI与金融量化应用 AI-Compass 致力于构建最全面、最实用、最前沿的AI技术学习和实践生态](https://juejin.cn/post/7528694026825531438)
	- [
		汀丶人工智能
		](https://juejin.cn/user/4020284493662029)
	- 32
	- 点赞
	- 评论
- [Spring AI Alibaba 1.0 GA 正式发布，Java 智能体开发进入新时代](https://juejin.cn/post/7515237104411836468 "Spring AI Alibaba 1.0 GA 正式发布，Java 智能体开发进入新时代")
		[2025 年是 AI 智能体快速爆发的一年，从单智能体、多智能体到通用智能体的多种不同构建模式持续涌现出来，智能体开发也逐步从概念、Demo 开始走向生产落地，应用范围也从编程助手等几个少数领域，逐步](https://juejin.cn/post/7515237104411836468)
	- [
		阿里云云原生
		](https://juejin.cn/user/3808363977648493)
	- 295
	- 4
	- 1
- [国产AI双雄争霸：QwQ-32B与Manus如何改写AI行业格局](https://juejin.cn/post/7480839029963161641 "国产AI双雄争霸：QwQ-32B与Manus如何改写AI行业格局")
		[算力竞赛下的技术跃迁 2025年3月中国AI领域迎来两场颠覆性发布：阿里巴巴开源的QwQ-32B模型与Monica推出的通用AI智能体Manus。前者以320亿参数的“轻量级”身躯比肩deepseek](https://juejin.cn/post/7480839029963161641)
	- [
		yanziluo
		](https://juejin.cn/user/2461175250420979)
	- 41
	- 点赞
	- 评论
- [2023 世界人工智能大会顺利召开，持续关注 AI+ 应用发展趋势](https://juejin.cn/post/7256602767669395513 "2023 世界人工智能大会顺利召开，持续关注 AI+ 应用发展趋势")
		[\*\*1 2023 世界人工智能大会顺利召开，持续关注 AI+应用发展趋势\*\* 2023 年丐界人巟智能大会二 7 月 6 日至 8 日在上海丼办，主题为 “智联丐界，生成未来”。本届大会聚焦大模型、](https://juejin.cn/post/7256602767669395513)
	- [
		中米AI
		](https://juejin.cn/user/2172290708552264)
	- 174
	- 点赞
	- 评论
- [0115 - 0119 早早聊 AI 资讯｜奥特曼曝出 AGI 即将来临，重点押注核聚变、扎克伯格宣战 AGI：Llama 3 训练中，砸近百亿美元...](https://juejin.cn/post/7325427710754668544 "0115 - 0119 早早聊 AI 资讯｜奥特曼曝出 AGI 即将来临，重点押注核聚变、扎克伯格宣战 AGI：Llama 3 训练中，砸近百亿美元... ")
		[0115 - 0119 早早聊 AI 资讯｜奥特曼曝出 AGI 即将来临，重点押注核聚变、扎克伯格宣战 AGI：Llama 3 训练中，砸近百亿美元、智谱发布 GLM-4 全家桶、Stability](https://juejin.cn/post/7325427710754668544)
	- [
		早早聊
		](https://juejin.cn/user/712139234347565)
	- 4.8k
	- 1
	- 评论
	![0115 - 0119 早早聊 AI 资讯｜奥特曼曝出 AGI 即将来临，重点押注核聚变、扎克伯格宣战 AGI：Llama 3 训练中，砸近百亿美元... ](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1956c475f8684cacbf6b80ddfaade8ec~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis#?w=1024&h=1024&s=1524044&e=png&b=37312c)
- [卷起来！让智能体评估智能体，Meta发布Agent-as-a-Judge](https://juejin.cn/post/7426653176524488716 "卷起来！让智能体评估智能体，Meta发布Agent-as-a-Judge")
		[如果说去年大厂的竞争焦点是 LLM，那么今年，各大科技公司纷纷推出了各自的智能体应用。微软发布了 Copilot，Apple 将 Apple Intelligence 接入了 OpenAI](https://juejin.cn/post/7426653176524488716)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 186
	- 1
	- 评论
- [复刻Sora的通用视频生成能力，开源多智能体框架Mora来了](https://juejin.cn/post/7349835041993834530 "复刻Sora的通用视频生成能力，开源多智能体框架Mora来了")
		[Sora 是首个引起社会广泛关注的大规模通用视频生成模型。自 OpenAI 在 2024 年 2 月推出以来，没有其他视频生成模型能够在性能或支持广泛视频生成任务的能力上与 Sora 匹敌。](https://juejin.cn/post/7349835041993834530)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 297
	- 点赞
	- 评论
	![复刻Sora的通用视频生成能力，开源多智能体框架Mora来了](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1cdfeb78ab1145ccb8ab480da082d164~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis#?w=1272&h=718&s=1529032&e=png&b=126685)
- [在后LLM时代，关于新一代智能体的思考](https://juejin.cn/post/7434352314327531520 "在后LLM时代，关于新一代智能体的思考")
		[2022年末，以ChatGPT为代表的大语言模型（LLM）正式发布，智能体（Agent）研发领域仿佛搭上高速列车，进入了飞速发展的快车道，各类智能体及智能体工具平台（Agent Builder）](https://juejin.cn/post/7434352314327531520)
	- [
		澜舟孟子开源社区
		](https://juejin.cn/user/339106672685576)
	- 100
	- 点赞
	- 评论
- [AI智能体内战终结者！A2A：谷歌开源的首个标准智能体交互协议，让AI用同一种“语言”交流](https://juejin.cn/post/7491528012966903820 "AI智能体内战终结者！A2A：谷歌开源的首个标准智能体交互协议，让AI用同一种“语言”交流")
		[A2A是谷歌推出的首个标准化智能体交互协议，通过统一通信规范实现不同框架AI智能体的安全协作，支持多模态交互和长时任务管理，已有50多家企业加入生态。](https://juejin.cn/post/7491528012966903820)
	- [
		蚝油菜花
		](https://juejin.cn/user/3499061392715417)
	- 65
	- 点赞
	- 评论
	![AI智能体内战终结者！A2A：谷歌开源的首个标准智能体交互协议，让AI用同一种“语言”交流](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5f81e3ec2ce243a485b5fc81cfbd4846~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Jqd5rK56I-c6Iqx:q75.awebp?rk3s=f64ab15b&x-expires=1754962776&x-signature=yDOGJZLLE1C7q9PxKs88QkkHliA%3D)
- [AI开发新纪元：MGX多智能体协作平台深度解析](https://juejin.cn/post/7482640926637277220 "AI开发新纪元：MGX多智能体协作平台深度解析")
		[随着人工智能技术的迅猛发展，特别是大型语言模型（LLM）的广泛应用，软件开发领域正经历着前所未有的变革。在这一背景下，MGX（MetaGPT X）作为全球首个模拟人类软件公司的产品。](https://juejin.cn/post/7482640926637277220)
	- [
		几米哥
		](https://juejin.cn/user/3296796362156163)
	- 103
	- 点赞
	- 评论
	![AI开发新纪元：MGX多智能体协作平台深度解析](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/cf9440204d1d49958fb66012a9a67c88~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Yeg57Gz5ZOl:q75.awebp?rk3s=f64ab15b&x-expires=1754962776&x-signature=SMaFuod0Et3Z5RUaqu94CVIgq%2Bs%3D)
- [AI编程再突破，文心快码发布行业首个多模态、多智能体协同AI IDE](https://juejin.cn/post/7518932901699616808 "AI编程再突破，文心快码发布行业首个多模态、多智能体协同AI IDE")
		[文心快码发布AI IDE，智能体自动写代码，设计稿一键转代码，打造开发者个性化IDE。AI编程再突破，文心快码发布行业首个多模态、多智能体协同AI IDE](https://juejin.cn/post/7518932901699616808)
	- [
		文心快码BaiduComate
		](https://juejin.cn/user/992209294070809)
	- 24
	- 点赞
	- 评论
	![AI编程再突破，文心快码发布行业首个多模态、多智能体协同AI IDE](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e680e6c8f59f45faa3a8fbbddcfa576f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paH5b-D5b-r56CBQmFpZHVDb21hdGU=:q75.awebp?rk3s=f64ab15b&x-expires=1754962776&x-signature=i%2BI7nb3eGfhWN1LCljyF7J1dtpY%3D)
- [AI“游侠”降临A股：16个“大脑”组团“炒股”，30秒“算命”市场！](https://juejin.cn/post/7528553562117816366 "AI“游侠”降临A股：16个“大脑”组团“炒股”，30秒“算命”市场！")
		[各位看官，今天我们不聊风花雪月，不谈股市涨跌，咱们来点硬核的——一个AI圈的“大动作”！听说过“智能体”不？就是那种能独立思考、自主行动的AI小战士。而最近，一股神秘力量悄然降临A股，它们不是一个人](https://juejin.cn/post/7528553562117816366)
	- [
		墨风如雪
		](https://juejin.cn/user/4064249017803927)
	- 157
	- 1
	- 2
	![AI“游侠”降临A股：16个“大脑”组团“炒股”，30秒“算命”市场！](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/42b525ae72d241eb8368df5ca9ed3036~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5aKo6aOO5aaC6Zuq:q75.awebp?rk3s=f64ab15b&x-expires=1754962776&x-signature=AtPwnylYTiacdAGkUMz4GC34YeI%3D)
- [微软开源Windows桌面智能体操作系统！UFO²：一句话调度多应用，自动协同工作](https://juejin.cn/post/7496340361352282121 "微软开源Windows桌面智能体操作系统！UFO²：一句话调度多应用，自动协同工作")
		[UFO²是微软推出的Windows桌面多智能体操作系统，通过中央HostAgent协调多个AppAgent实现跨应用任务自动化，结合GUI交互和原生API调用提升执行效率，支持虚拟桌面隔离运行。](https://juejin.cn/post/7496340361352282121)
	- [
		蚝油菜花
		](https://juejin.cn/user/3499061392715417)
	- 79
	- 点赞
	- 评论
	![微软开源Windows桌面智能体操作系统！UFO²：一句话调度多应用，自动协同工作](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/cf63b5d75b60447eb4189b10818a9ff6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Jqd5rK56I-c6Iqx:q75.awebp?rk3s=f64ab15b&x-expires=1754962776&x-signature=0oHN9tOjU98h5Vp9erQuxmx9nNs%3D)
- [AI编程再突破，文心快码发布行业首个多模态、多智能体协同AI IDE](https://juejin.cn/post/7519118964921810985 "AI编程再突破，文心快码发布行业首个多模态、多智能体协同AI IDE")
		[6月23日，百度AI开放日举行，百度智能代码助手文心快码迎来重大突破。百度副总裁陈洋现场发布了文心快码独立AI原生开发环境工具——Comate AI IDE，是行业首个多模态、多智能体协同的AI ID](https://juejin.cn/post/7519118964921810985)
	- [
		默\_语
		](https://juejin.cn/user/2665682845836647)
	- 34
	- 点赞
	- 评论
	![AI编程再突破，文心快码发布行业首个多模态、多智能体协同AI IDE](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/66f831245e7c4f1095c02f33c8beede5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6buYX-ivrQ==:q75.awebp?rk3s=f64ab15b&x-expires=1754962776&x-signature=M3Z%2BHW%2BBfgSMTvVQd4VzBurDNCQ%3D)

APP内打开