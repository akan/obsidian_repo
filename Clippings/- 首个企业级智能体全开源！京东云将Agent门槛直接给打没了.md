---
title: "首个企业级智能体全开源！京东云将Agent门槛直接给打没了"
source: "https://mp.weixin.qq.com/s?__biz=MzIzNjc1NzUzMw==&chksm=e988d4d28d41781910cf71bbc262420ad557835d36e6b95fe9045044fb2171cddd179fc0513c&idx=1&mid=2247813671&sn=0d9612f69d6ebe134833fbf4d4058973#rd"
author:
  - "[[关注前沿科技]]"
published:
created: 2025-07-30
description: "已有超2万个智能体实践"
tags:
  - "开源"
  - "企业级智能体"
  - "京东云"
abstract: "京东云开源企业级智能体JoyAgent，提供完整能力，降低企业AI落地门槛。"
---
关注前沿科技 [量子位](https://mp.weixin.qq.com/)

*2025年07月29日 15:07* *北京*

##### 白交 发自 凹非寺  
量子位 | 公众号 QbitAI

离企业AI落地最近的智能体，刚刚在WAIC官宣对外开源了。

**京东云JoyAgent**，成为了首个100%开源企业级智能体。

当前市场上的开源Agent主要是SDK或者框架，而JoyAgent是包括前后端、框架、引擎、核心子智能体等**完整能力全部开源**，企业开发者无需再进行二次开发，直接就能本地独立部署，开箱即用。

前段时间它已深夜开源，在开发者圈火了一波，大家纷纷好感拉满，GitHub Star数持续拉升。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib3qoE5NAaM7jUDM5CeFvNYEaf7ziawDfv01sVmf4L0xqnMiaKMwPhJyH1w/640?wx_fmt=png&from=appmsg&randomid=f0ez4bau&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

大家除了对这个产品级**端到端开源**印象深刻之外，还对它多智能体协同、处理问题的能力感到惊艳。

它在GAIA榜单上以Validation集准确率75.15%的成绩上榜，性能比肩甚至超越了行业领先的产品。而相较于前面数一数二的产品，它还胜在轻量化，并不依赖更多的生态和云平台，开发者能够独立部署。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib3Rk1CIwZricpiaDEMuarGFMONdGHTLf7mStEk1vicicxBrmno7aSWAO1Xlg/640?wx_fmt=png&from=appmsg&randomid=hvvc62m6&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

因此即便JoyAgent提前悄悄上线，也阻止不了开发者们口口相传的好评。

而且现在据说，这个智能体已经是历经他们公司内部大规模场景锤炼，**超2万个智能体实践**，可靠性自然就有保证。

所以JoyAgent相当于是京东把自己企业智能体的落地经验，一揽子全开源了。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib3FMAclDebYXj3tB93PvuDMHJQiaUrA1v9Gj6CSaViajibU7PUc6tOicZiarg/640?wx_fmt=png&from=appmsg&randomid=rqnvc55q&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

## 行业首个100%开源企业级智能体

首先**JoyAgent**这个名字就很有意思，尤其再跟它的定位**「企业级」**结合在一起来看。它似乎在传达一种态度，**智能体在企业场景中的部署和应用，其实是一件很Joy的事情**。

在JoyAgent之前，市面上也有不少开源产品，大部分都是智能体框架，或者主要是工作流，剩下的还有像SDK、技术模块、或者协议。

这种**「部分开源」**的结果就是开发者们要做额外的开发和适配工作，包括前端界面、后端逻辑、智能体协调。开源组件虽然丰富，但还是需要自己一个个集成起来。

像JoyAgent这种产品级的产品之前并没有，而现在**JoyAgent也有且只有一个**。

它端到端完整开源，没有可依赖的生态，可以独立部署开箱即用。这种配置与企业场景天然适配，并且直接将企业智能体的使用门槛打下去了。

它有两种方式可以快速开始：一种是docker一键启动服务；另一种是手动初始化环境，启动服务。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib33YboRTK87gboTqyrzP4vH2vhkjOAappiaXczSibcFS8IRxic5YgE57gzw/640?wx_fmt=png&from=appmsg&randomid=tpj3g0xj&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

不过易用不代表好用，毕竟要智能体真正解决通用实际问题，其实难度不小。而透过GAIA榜单上看到，它的能力还不赖，三个level水平至少都算得上一流水平。

而在广大开发者的评价以及实测结果上，我们发现，JoyAgent有自己独特「讨巧」的解题思路。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib32QPibNDib5DtVGr4twicMSnYo15og1omia3KMn3ibgGrgsAib3J8K9LFdDDw/640?wx_fmt=png&from=appmsg&randomid=9b0drdc2&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

比如**它可扩展性强**，有多种智能体、工具可选。

智能体主要包括SearchAgent、ReportAgent、CodeAgent等，工具包含多种文档处理工具、不同报告生成工具如html、ppt、markdown、表格生成工具，支持多种样式输出。

如果想要定制新场景新功能，只需将相关的子智能体、工具挂载上去。步骤也非常简单：配置文件、启动服务，然后就可以对话了。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib3UREHH9Nz4a9iajw4JWZcM0P8Zib72xm9WLbdqb7tkibibNEGYc1bnLqjXw/640?wx_fmt=png&from=appmsg&randomid=lnkc4a1j&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

比如添加一个12306工具之后，规划7月7天2人从北京出发去新疆的旅行计划，并查询相关火车票信息。它就开始规划、调用工具查询，最终输出报告。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib3cuWzPbVIqoRiaY4ic8OVYAv2dNWkBIt9MyypyYHaGj8jcdlsh5Lpqy9g/640?wx_fmt=png&from=appmsg&randomid=yktvft6j&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

再有就是它的**并行处理思路**，这样一来执行效率就会很高。

比如想让它生成一份具身智能报告。提示词很简单，就是**具身智能报告**。

它在思考了要收集最新的相关信息之后，到行动环节就能看到**hua**的一下~五个搜索线程同时进行，他们各司其职，各搜各的。

![Image](https://mmbiz.qpic.cn/mmbiz_gif/YicUhk5aAGtAJoib2IoE10dTYqutGFqSoomsQLiafYQIpeme9l6u6G1KlLfclhMjF1ibempoP1jAib09pIxjSWwtYUw/640?wx_fmt=gif&from=appmsg&randomid=s6m30n03&tp=webp&wxfrom=5&wx_lazy=1)

因此整个过程只搜索了一两分钟，然后就可以总结、生成报告了。

最后生成的可视化报告也挺全面，囊括具身智能的定义、理论基础、发展现状、关键技术体系、主要应用领域以及行业挑战与未来趋势。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib33qLmUCGD0xWGfTo5NxbgGyOv29lrzk9iagDMQOUe87Y7ZNYicKNicxlUQ/640?wx_fmt=png&from=appmsg&randomid=203zuhss&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

有最新的时间节点，有可视化表格，还有参考文献……在没有任何多余提示的情况下，这么短时间内出的深度研究报告，质量可以说是非常之高了。

![Image](https://mmbiz.qpic.cn/mmbiz_gif/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib3Iic7Ss4O3jK4cKIxqEO7O4p9BicD5Fwoy0RAsou6yhxAbveStFmLuQfQ/640?wx_fmt=gif&from=appmsg&randomid=cgj8rcm3&tp=webp&wxfrom=5&wx_lazy=1)

通用性强但轻量化，可选多种工具/智能体以满足定制化需求，再有就是执行效率也很高……**这么一个100%开源的智能体产品，可以说打通了企业AI落地的最后一公里。**

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib3xfjKyJxm4hLLMzcPsFYDvQknI0KuCfaFFGTtGECZM0ETSNhw9a36Kg/640?wx_fmt=png&from=appmsg&randomid=tl37dhh1&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

不过此次引发如此广泛关注的原因，不仅在于产品本身，更在于其底层的技术创新。这些创新在解决行业核心挑战——如复杂任务处理、上下文管理、工具应用灵活性以及信息检索效率方面具有重要的参考价值。

## 扒了扒代码，发现有这些创新

在GitHub页面上，京东云也摊开了自己的**系统架构图和代码**。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib39d9hmDZz96uYmhnpkhyQzu7YSMSVQI1BF5756c9xicRHJRnKhmRf6PQ/640?wx_fmt=png&from=appmsg&randomid=iqg29p8d&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

整个系统设计得十分清晰，从中可以看到主要的创新点，摘取部分展开介绍一下。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib3UvwNkBUwwMR0v9ib6z3n7A5UNVtT5I0M3B1k5vLrVHyC7xMlfwsNC2g/640?wx_fmt=png&from=appmsg&randomid=61tzb56d&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

首先是**多层级和多模式思考**。这个其实不难理解。

随着Agent能力越来越强，解决的问题越来越复杂，简单的一步推理显然是不够的。传统单层级智能体难以有效处理复杂问题的规划和执行。

而JoyAgent将这两个核心步骤拆解开，主打各干各的，它采用了双层级规划架构，包括**Work Level（计划层）**和**Task Level（执行层）**。

**Work Level**负责整体任务规划，能够深度推理用户输入，识别核心需求，并将复杂问题分解为可管理、可执行、独立且清晰的子任务。但最多支持分解为5个子任务，避免过度拆解，防止Agent过度思考陷入死循环。

而**Task Level**采用ReAct模式，用于具体的任务执行，形成“思考-行动-观察-反思”的完整循环。

这种架构确保了宏观规划与微观执行的最优结合，类似于Gemini-CLI、Cursor等现代做法，通过粗粒度的Task来管控目标，通过Reason Act模式来操作Task，协同完成整体目标。

其次，**文件系统+内存混合的上下文管理系统**。

日常使用大模型时，经常会因为上下文限制导致重要信息丢失，简单的截断或摘要不足以保留完整信息。此外还有任务与任务之间的上下文传递困难，以及还有多轮对话的文件持久化问题。

JoyAgent采用的这个**上下文管理系统**，可以按需分离存储，对话历史存储在内存中，而像Filetool、代码解析、报告、深度搜索等结果则使用文件系统存储。文件存储的方式更长效，能更好地实现任务与任务之间的上下文传递。而分层次的上下文管理也更加灵活。

此外，它还区分全局产出文件 (productFiles) 和当前任务文件 (taskProductFiles)，全局文件可以跨任务共享。任务切换时临时文件会被清理，但全局产出文件会保留。

这种设计使得系统能够处理大文件而不影响内存，支持任务间的文件共享，实现多轮对话的文件持久化，并提供清晰的文件生命周期管理。它突破了LLM上下文限制，保留了信息的完整性，并降低了运行成本，提升了框架稳定性。

此外，还有**工具/智能体自动进化机制**。针对不同领域不同场景，JoyAgent能够根据任务动态为工具生成专业化数字员工角色。这与传统框架中工具身份固定、适应能力静态配置不同，工具自行具备上下文感知和角色适应能力。

比如分析财务报告时，智能体就会是数据分析师、报告撰写专家、信息检索员。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib3iafFBqE9RvxxVDLxee8W80vkgct5vmkdpnNAicOB3EHFf29T4voIKTyg/640?wx_fmt=png&from=appmsg&randomid=0dafk6xz&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

By the way，这里也体现了**多智能体协同能力**，面对数据收集整理任务时，数据整理员和信息检索员将分工协作。

这样做除了使用起来有场景沉浸感，也提升了工具使用准确性，**减少工具使用错误40%**。

此外还有**深度搜索能力**（比如五个线程并行搜索）、**多智能体协同**（面对复杂请求，由多个智能体提议、讨论或投票选出最佳方案执行）都是此次所展现出的亮点。

而且因为是京东从自己业务系统中孵化的商业智能体。因此相较于其他开源产品，有着天然的技术优势和壁垒。企业开发者使用起来，怎么说也会更安心一点。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib3K7eicVK7B7kMs7qg5J57NYL1u01yfRCupQvkTaQf1edjGD0ESPicVKMQ/640?wx_fmt=png&from=appmsg&randomid=6t5l64z3&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

像**安全性**方面，据介绍，JoyAgent的企业级安全防护体系，从数据传输加密、细粒度权限管控到实时审计监控，能够全方位守护企业核心知识资产。

还有**可靠性**上，JoyAgent也是经历过京东618这种大场面的。

在**零售采销**这件事儿上，它深度融合历史销售、实时搜索、气象变化等多维数据，精准预测全国销量将达数百万台（远超人工预估），并洞察到华南需求激增的现象；同时实时透视全国八大仓库存，预警华南主力型号库存仅剩50%。基于此，JoyAgent自动生成供应链优化报告，明确分仓补货策略（如紧急补货广州仓），并打通采购系统，实现“一键生成采购单”，将采购流程从数天缩短至几分钟。

按照后续计划，他们还将持续扩展开源范围，逐步纳入更丰富的工具集与可视化功能模块。

他们还表示，针对B端市场的商业化产品，在实际落地过程中，企业私有数据保护、定制化数据需求及业务流程适配等问题仍需解决，对此他们将为客户提供定制化开发支持。

## 这可能是离企业AI落地最近的智能体

虽然众人都在谈论智能体，但当智能体试图渗透进企业核心业务释放行业价值时，面临的是比消费端更严苛的挑战。

包括不限于**专业知识门槛**，金融、供应链等场景需精准理解行业术语与规则，普通Agent因知识泛化性不足而“答非所问”；其次是**与传统系统协同的复杂性**，像ERP、CRM等封闭系统接口复杂，智能体需深度适配API逻辑才能驱动业务流程；还有**输出结果的严谨性**，比如采购决策、财报分析等输出直接关联企业损益，容错率近乎为零，还有企业端面临的数据安全、商业隐私等问题需要应对。

这也是这次JoyAgent发布为什么值得关注的原因，它向我们展示了一个真正面向生产环境打造的AI Agent构建平台。

在企业内部的严肃商业场景中，一个智能体指令的错误执行不容丝毫的损失。这正是普通Agent难以满足之处——它们或许能处理简单任务，但在企业复杂、多变、且对结果精度要求严苛的环境下，往往力不从心。

JoyAgent凭借其源自京东复杂业务场景锤炼的可靠性，媲美一流水平的通用性能，以及开箱即用的企业级安全特性，真正具备了支撑企业核心业务流程的能力。

它解决的，是AI Agent真刀真枪地在企业环境中“用起来”、并产生实际生产力变革的问题，而非仅仅停留在“能用”的层面。

关键是它还免费，相比以往部署「外部」的开源产品动辄几十万数百万，京东云将自己用的JoyAgent开源出来，直接把门槛打没，零成本实现部署。

也正因此，**企业可以直接复制这个样本**，让开发者可以基于京东AI实践的基础上去做创新，让没有足够技术团队、缺乏商业场景验证的开发者，也能快速拥有与京东云相同的Agent能力。

虽然当前Agent技术仍处于发展初期，未来演进存在不确定性，但借助开源这样的方式就可以共同突破难题。

**一键三连****「点赞」「转发」「小心心」**

**欢迎在评论区留下你的想法！**

— **完** —

**🌟 点亮星标 🌟**

**科技前沿进展每日见**