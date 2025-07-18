---
title: "打破传统游戏逻辑！Google | 提出Concordia ，通过Mutil-Agent构建游戏引擎！"
source: "https://mp.weixin.qq.com/s?__biz=MzUzOTgwNDMzOQ==&chksm=fbdc47e1f0752cd741b16fef328d163fa298e4e13c99f28932ed805a16cbdcd9c1ef55969998&idx=2&mid=2247504198&sn=f1989441fc2138bc965f956792f060b6#rd"
author:
  - "[[ShuYini]]"
published:
created: 2025-07-18
description: "欢迎来到Concordia"
tags:
  - "多智能体"
  - "游戏引擎"
  - "生成式AI"
abstract: "Google提出Concordia，通过多智能体构建游戏引擎，打破传统游戏逻辑。"
---
ShuYini *2025年07月17日 17:56*

**点击下方** **“** **AINLPer** **“** ，添加 关注

更多干货，第一时间送达

更多精彩内容 -> [专注大模型、Agent、RAG等前沿分享！](https://mp.weixin.qq.com/s?__biz=MzUzOTgwNDMzOQ==&mid=2247502960&idx=1&sn=e938491c6253a6525ab37a9238111059&scene=21&token=646435429&lang=zh_CN#wechat_redirect)

  

剧本杀大家都玩过吗？这是一种经典的桌上角色扮演游戏（TTRPG）， 游戏中的核心人物是游戏主持人（GM）， 相当于整个世界的「导演 + 编剧 + 旁白」，负责掌控游戏环境，讲述故事背景，并扮演所有非玩家角色（NPC）。

现在，想象一下，如果我们用一个强大的生成式 AI 来担任这个 GM 的角色，同时，桌子旁的「玩家」也换成一群各具头脑的 AI，这会创造出一个怎样的世界？

这能实现以下应用：

- 科学 模 拟 ：构建虚拟社会，用于社会科学研究，观察群体行为的涌现。
- 互动叙事 ：创建互动故事或游戏，AI 智能体扮演角色，共同演绎剧情。
- AI 评估 ：设计特定场景作为「考场」，来测试和评估 AI 智能体的各项能力（如推理、协作、沟通）。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibEqNUfK68icQ5ibgMeaHuV73A8oo4Xdza8ejciaAh6I8cAaia70EvnoM3MXYiacOBexQB1stxUz30RpRQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

美剧《西部世界》， 未来的西部主题虚拟世界里，所有角色均是 AI 。

然而，这三种需求（科学性、戏剧性、公平性）差异巨大，甚至相互冲突。如何用一个统一的框架来满足所有需求？

来自 Google DeepMind 和多伦多大学的研究人员从 TTRPG 和现代游戏引擎中获取灵感，提出了他们的解决方案：一个名为 Concordia 的软件库 。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibEqNUfK68icQ5ibgMeaHuV73JIPy0AR8POhBM5ZrVdfJoeIAP2V0STNql6WvGxooIibC7lnXAred3GA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

- 论文标题：Multi-Actor Generative Artificial Intelligence as a Game Engine
- 论文地址：https://arxiv.org/abs/2507.08892
- 项目地址： https://github.com/google-deepmind/concordia

传统上，游戏环境的逻辑是写死的程序。这里的主张是，不应该用一个硬编码的程序来充当 GM，而应该把 GM 本身也设计成一个可配置的、由 AI 驱动的智能体。

Concordia 的设计精髓，源自现代游戏引擎的「 实体-组件 」（ Entity-Component ）架构 。在这个架构里，无论是 AI 玩家还是 AI 游戏主持人（GM），都只是一个基础的「实体」容器 。它们具体拥有什么能力（比如记忆、目标或社交规则）则由一个个可插拔的「组件」来决定 。

这种方式巧妙地将「工程师」和「设计师」的角色分开：工程师负责创造功能强大的组件，而设计师则可以像搭乐高一样，自由组合这些组件来快速构建和测试各种复杂场景，整个过程几乎无需编写底层代码 。

实体、组件、引擎和游戏设计

实体 - 组件架构模式作为现代游戏开发的基石，为构建多角色生成式 AI 系统提供了强大而灵活的基础。

该框架采用组合而非继承机制，实体不再受限于僵化的类结构，而是携带唯一标识符的轻量级独立对象。实体的行为与属性完全由挂载的组件决定（即：实体本质是带有名称的组件容器）。引擎通过调用 observe、act 等函数处理实体，这些函数由实体所挂载的组件具体实现。

组件通过结合 Python 代码与 LLM 调用来实现，这种方式能提供最大的灵活性与表现力。当设计师掌握特定功能的编码方法时，可以自主实现；与此同时，同一环境中的其他功能可以通过让 GM 叙事型 LLM 来完成。这两种实现方式通常共存于同一环境中 —— 开发者既可以让 GM 根据 LLM 的自由发挥来创造内容，也可以严格限制其行为，使其完全遵循预设的硬编码规则，或采用介于二者之间的任何约束程度。

实体主要支持两种调用方式： observe 和 act 。

调用 observe 时，会触发所有组件的 preobserve 和 postobserve 函数，对每个实体的观察数据进行处理。调用 act 时，每个组件会扮演上下文和行动两种角色之一。

在实际开发 Concordia 组件时，开发者通常需要实现 preobserve、postobserve、preact 和 postact 四类方法中的部分或全部。常见做法是仅实现观察类方法或行动类方法，同一组件中同时实现两类方法的情况较为罕见。这种组件化模块设计允许通过自由组合不同组件，快速创建功能各异的实体 —— 这与传统面向对象编程形成鲜明对比：后者在创建行为略有差异的新角色类型时，往往会导致复杂脆弱的继承链结构。

对于生成式 AI 智能体而言，这种架构优势尤为显著。 一个智能体的思维可由多个组件构成：存储过往经历的 Memory 组件、调用大语言模型生成目标的 Planning 组件，以及表征世界认知的 Beliefs 组件。 同理，一个组织实体可由代表其部门、政策及内部沟通结构的组件组合而成。只需配置不同的组件组合，就能为不同智能体赋予差异化的认知架构。

这一架构模式的灵活性同样体现在 Concordia 框架中的 GM 系统上。GM 本身也是一个实体，与玩家实体（角色）一样可通过组件进行定制。这种设计使得 GM 的职能和逻辑能够根据多智能体系统的具体需求灵活调整 —— 无论是执行严格的评估协议、引导叙事发展，还是维护因果一致性。

此外，Concordia 框架还通过多种游戏引擎模式支持不同的交互动态。

游戏 / 模拟设计目标的全景图分析

根据 Edwards（他是桌游角色扮演游戏理论的重要人物）的定义 ，TTRPG 可以分为：（1）游戏型（Gamist），GM 需设计难度适中的挑战以维持乐趣。（2）叙事型（Narrativist），GM 需灵活调整剧情以回应玩家的创作输入。（3）模拟型（Simulationist），玩家希望沉浸在一个逻辑自洽的虚拟世界中。

本文认为将使用多角色生成式 AI 的动机分为以下几种类型是有帮助的：（1） 评估型（Evaluationist） ，对应 Edwards 理论中的游戏型；（2） 戏剧型（Dramatist） ，对于 Edwards 理论中的叙事型；（3） 模拟型（Simulationist） ，Edwards 同名分类。

生成式 AI 还有一个第四种动机，那就是创建合成训练数据的目标。

评估型的观点

游戏型玩家通常会寻求公平的竞争机会，并希望通过战略胜利来取得优势，而评估型用户则将多角色系统视为评估和比较的框架。

对于评估型用户来说，主要目标非常明确：确定哪些 AI 系统在指定维度和上下文中表现更好。这需要提供一个公平的竞争环境，并具有明确的成功指标。

评估型系统通常具有以下特点：

- 标准化场景 —— 精心校准的环境，在多个评估运行中呈现一致的挑战；
- 明确的成功指标 —— 可量化的性能衡量标准，允许对不同方法进行明确的排名；
- 受控变异性 —— 战略性地引入新元素，以评估泛化能力；
- 跨角色互动机制 —— 评估智能体在与不同合作伙伴群体互动时的表现的方法。

戏剧型视角

与评估型用户不同，戏剧型（Dramatist）用户主要将多角色生成式 AI 系统视为叙事引擎。

对于具有戏剧型的目标用户来说，核心关注点不是基准测试性能，而是通过多个 AI 角色的互动生成引人入胜的叙事。

从设计师的角度来看，针对戏剧型目标构建的系统将优先考虑叙事一致性、情感共鸣和动态人物发展，而不是标准化的评估。

主要关注以下特点：

- 丰富的角色模型 —— 具有详细个性、明确目标、价值观和关系的角色，通常通过组合多个组件来构建；
- 叙事驱动的环境 —— 旨在引发戏剧性有趣互动的场景设置；
- 灵活的解决机制 —— 优先考虑叙事满足感而非程序一致性的系统；
- 涌现的故事情节 —— 允许在没有预定结果的情况下发展引人入胜的叙事轨迹的框架。

在接下来的章节中，论文还讨论了模拟型视角、合成数据等方面的研究，感兴趣的读者，可以参考原论文，了解更多内容。

## 推荐阅读

\[1\] [新手必看！强化学习入门指南](https://mp.weixin.qq.com/s?__biz=MzUzOTgwNDMzOQ==&mid=2247504066&idx=1&sn=04c09ebe3b719de39d9337c1157c8a30&scene=21#wechat_redirect)

\[2\] [大模型(LLM)推理优化技术总结（非常详细）](https://mp.weixin.qq.com/s?__biz=MzUzOTgwNDMzOQ==&mid=2247504051&idx=1&sn=d736cc5c5aac64f7caff9772ef50e592&scene=21#wechat_redirect)  

\[3\] [大模型推理基准测试及评估指标](https://mp.weixin.qq.com/s?__biz=MzUzOTgwNDMzOQ==&mid=2247504028&idx=1&sn=1db360ad57565663c6890ecd47e4a71f&scene=21#wechat_redirect) ！

\[4\] [多智能体（Multi-Agent）开发必读指南！](https://mp.weixin.qq.com/s?__biz=MzUzOTgwNDMzOQ==&mid=2247503999&idx=2&sn=740478d62d653e0e63c1ee1cc898da62&scene=21#wechat_redirect)

\[5\] [Agent下一阶段：可自我进化的AI-Agent](https://mp.weixin.qq.com/s?__biz=MzUzOTgwNDMzOQ==&mid=2247503947&idx=1&sn=dc9a235a15c2c960d8e6e11937488240&scene=21#wechat_redirect)

\[6\] [众所周知！大模型应用构建面临的 6大误区](https://mp.weixin.qq.com/s?__biz=MzUzOTgwNDMzOQ==&mid=2247503909&idx=1&sn=834f85e705eaa9d49775ba7d95773468&scene=21#wechat_redirect)

欢迎投稿或寻求报道，联系：ainlperbot

**「资料整理不易，点个** ****再看**** **、** **赞** **吧 **」****

继续滑动看下一个

AINLPer

向上滑动看下一个