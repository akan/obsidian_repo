---
title: "Karpathy 刚发了一个帖子，怎么判断一个新模型到底行不行？"
source: "https://mp.weixin.qq.com/s/nLC_BvBqUjhsg5mhvaduKA"
author:
  - "[[逛逛]]"
published:
created: 2026-08-03
description:
tags:
  - "模型评测"
  - "长程任务"
  - "Three.js"
  - "自验证能力"
  - "Karpathy"
  - "Opus 5"
abstract: "Karpathy 用《指环王》文字生成三维世界的实验，揭示了评测模型应从炫酷 Demo 转向长程复杂任务和自我验证能力的检验。"
---
逛逛 逛逛GitHub *2026年8月3日 14:06*

## 几乎每隔一两个月，AI 行业就会迎来一个史上最强模型。

官方榜单再次刷新，编程能力提升多少个百分点，推理成绩超过多少人类专家。

![Image](https://mmbiz.qpic.cn/mmbiz_png/M2ibDBMdECU1luzLibKF4XRicsl4EwEzTuycBn19HkgM7f0Jsh4hEg3oevks924FYMnPp8GefFle14gnPJ6dBSBknAXHWibKW1ib2WWyJzPhZHfI/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

紧接着，社交平台上开始出现大量演示：一句话生成网站、复刻某款产品、制作 SVG 动画，或者在几十秒内写出一个小游戏。

这些 Demo 一个比一个炫酷。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/M2ibDBMdECU3DhoD8apeIhnwYjDAW4RAvI4MUQBeXia843ynDRGich5lzq7cibE3Llnez96W6ibogd3mMqWDq56UmqnLKTQMetZobloyM8NN1jlw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

看完之后，我们依然很难回答一个最基本的问题：这个新模型，到底比上一个模型强在哪里？

当主流模型都能生成漂亮网页，单纯展示最终效果，已经越来越难反映它们的真实差距。

最近，Andrej Karpathy 发了一个推特，做了一个很有意思的实验。

看了还挺有启发的，分享给大家。

![Image](https://mmbiz.qpic.cn/mmbiz_png/M2ibDBMdECU1uEiamq8kk7dCCVelgkLO3aPntAZNMay8aADqMfWn6x6sBjuUXFSic5jHbqMKB9g0ibziaFUUwRaB1hlbwVBXwqr55M8pH9x7LnU4/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

01

**炫酷 Demo，越来越测不出模型的真实水平**

用前端页面测试新模型，确实足够直观。

不需要解释复杂的评测指标，也不需要理解模型原理。一张精美截图、一段流畅动画，就能让人立刻产生这个模型好强的感觉。

但这种测试的局限也很明显。

首先，任务通常很短。

模型接收一段提示词，生成几百行代码，一个页面很快就完成了。

这能证明模型具备一定的代码和审美能力，却无法测试它能不能处理一个持续数小时、包含多个阶段的复杂项目。

其次，很多前端任务具有高度相似的模式。

![A Hallmark output — editorial Lisbon dispatch, italic Fraunces display, real bottle plate with grape + region + tasting notes, no fabricated proof](https://mmbiz.qpic.cn/sz_mmbiz_png/M2ibDBMdECU2EvKPIUd4OIp9icEVcicA9eSibk85APCX1I3wprXHPNwHXKarIXicyFTBkRVNVxYQg4pHicnWel6LIMg7ic22dRkSK7c93uyuJl62o0/640?wx_fmt=png&from=appmsg#imgIndex=3)

A Hallmark output — editorial Lisbon dispatch, italic Fraunces display, real bottle plate with grape + region + tasting notes, no fabricated proof

渐变背景、玻璃拟态、三栏卡片和滚动动画，已经成为 AI 建站 Demo 中反复出现的视觉语汇。

它们很可能来自训练数据中的高频网页范式，也可能被流行组件库、默认提示词和产品偏好进一步强化。

它生成的是一个看起来不错的标准答案，却未必真正理解了用户要解决的问题。

更重要的是，我们看到的往往只有最成功的结果。

测试者尝试了多少次？中间修改了多少轮？模型犯过哪些错误？有没有大量人工介入？这些过程通常不会出现在最终演示中。

于是，一个原本应该用于判断模型能力的测试，很容易变成产品营销。

炫酷 Demo 可以制造惊喜，却很难完整回答：这个模型能不能真正承担复杂工作？

02

**Karpathy 是怎么测试 Opus 5 的**

Karpathy 没有让模型再生成一个常规网站，而是给它设计了一个开放、复杂，并且没有标准答案的任务。

他把《指环王》的第一段文字交给 Opus 5，给出 100 万 token 预算，成本约 10 美元，然后要求模型用 Three.js 把这段文字变成一个三维世界。

模型持续工作了大约两个小时，最终写出 5500 行代码，通过程序搭建场景、放置各种多边形物体，并为它们编排动画。

，时长01:32

<video src="https://mpvideo.qpic.cn/0bc3daaf6aaasaabmztpsrvfaggdl4maaxya.f10002.mp4?dis_k=8d453eb1d41ff8435b1474716af868fc&amp;dis_t=1785738997&amp;play_scene=10120&amp;auth_info=dv2j5YcIHHpBiPy30H5HYygvYFhmHB87UH8lbBxOKTFNfmY1FSUHNzZUXCYwEkpDPCU=&amp;auth_key=0a0be749fd6cee32b37778b7579a12af&amp;vid=wxv_4631953546966417410&amp;format_id=10002&amp;support_redirect=0&amp;mmversion=false" controls="">Your browser does not support video tags</video>

最终作品并不精致。

一些场景看起来很粗糙，部分动画也不够自然。如果把它和专业游戏团队的作品放在一起比较，差距当然非常明显。

但 Karpathy 真正惊讶的并不是画面质量，而是模型居然能把这个项目整体运行起来。

因为这项任务远不只是写一个 Three.js 网页。

模型需要先理解文学描述，再把抽象文字转换成空间关系：场景里应该出现什么，物体应该放在哪里，角色如何移动，镜头如何变化，故事又该按照怎样的顺序演出。

随后，它还要把这些决定落实成数千行代码，并尽量保证前后逻辑一致。

这是一个由语言理解、任务规划、空间推理、视觉表达、动画设计和软件工程共同组成的综合任务。

Karpathy 测试的是：

> 面对一个模糊而复杂的目标，给模型足够的时间和预算，它究竟能把项目推进到什么程度？

03

**这种测试真正测到了什么**

传统跑分通常会把模型能力拆成一道道相对独立的题目。

Karpathy 把多种能力放进同一个项目，让模型在真实推进任务的过程中接受检验。

首先被测试的是长程工作能力。

生成一个网页可能只需要几分钟，但在一个项目上持续工作两个小时，是完全不同的挑战。

模型需要记住早期做过的决定，维护越来越庞大的上下文，还要避免新增代码破坏已有功能。

其次是复杂任务拆解能力。

Karpathy 只提供了文学文本和最终目标，却没有替模型详细规定每一个步骤。

模型必须自己决定如何理解文字、如何搭建场景、先完成什么、后完成什么，以及出现问题后从哪里修改。

第三是跨领域协调能力。

模型必须在文字、三维空间、动画和程序逻辑之间来回转换。任何一个环节出现偏差，都可能让最终结果变得混乱。

此外，它还测到了一个经常被忽视的指标：工作耐力。

现实中有很多项目，并不是人类做不到，而是它们太琐碎、太耗时间，商业价值又不足以覆盖制作成本。

不会有人为了测试一小段小说，专门花几天时间写数千行 Three.js 代码。

但模型有足够的耐心。

只要成本可以接受，它就能持续处理大量繁琐细节。

因此，评价模型的标准也随之发生变化。我们不应该只问它能不能做，还应该问：

- 在固定预算内，它能把任务完成到什么程度？
- 它需要多少人工指导和纠正？
- 项目规模扩大后，它能否保持一致？
- 工作时间拉长之后，它是否还理解最初目标？
- 它能不能发现并修复自己造成的问题？

这些指标，比一张最终截图更接近模型在真实工作中的表现。

04

**好的测评，不仅展示能力，也要暴露失败边界**

Karpathy 这次实验主动指出了模型暴露出来的问题。

Opus 5 虽然能够生成三维世界，却很难有效验收自己的工作。

它无法像人类一样连续观看整段动画，也不能真正进入游戏世界，控制角色四处行走，检查场景是否穿模、镜头是否合理、节奏是否自然。

为了检查结果，它只能缓慢地在不同时间点截图，再根据静态画面判断代码是否需要修改。

这种观察方式既低效，也很容易遗漏问题。最终作品中出现的粗糙细节和错误，很大程度上来自这一限制。

这揭示了当前模型一个非常重要的能力缺口：模型的自我验证能力相比于模型生成能力是比较落后的。

它可以写出 5500 行代码，却未必能准确判断这 5500 行代码最终创造了怎样的体验。

它能够生产大量内容，却不一定知道这些内容是否真的好用。

一个好的模型测试，不应该只负责证明模型有多强，还应该帮助我们找到它会在哪里失败。

如果一项测评只能带来惊叹，却无法暴露能力边界，那么它更像广告，而不是测评。

05

**点击下方卡片，关注逛逛 GitHub**

这个公众号历史发布过很多有趣的开源项目，如果你懒得翻文章一个个找，你直接关注微信公众号：逛逛 GitHub ，后台对话聊天就行了：

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/ePw3ZeGRrux2sRxwJzmfe1lK8ic33XvtVPsIPCMV7hjicmScibtxIZ1NsjXxNoVNMb3zLy32Al7PSpfbVAtrACYqQ/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp#imgIndex=11)

逛逛GitHub · 目录