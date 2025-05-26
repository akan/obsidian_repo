---
title: "OTC‑PO重磅发布 | 揭开 o3 神秘面纱，让 Agent 少用工具、多动脑子！Agent 即一系列自动化帮助人类完 - 掘金"
source: "https://juejin.cn/post/7501308072154775592"
author:
published: 2025-05-07
created: 2025-05-08
description: "Agent 即一系列自动化帮助人类完成具体任务的智能体或者智能助手，可以自主进行推理，与环境进行交互并获取环境以及人类反馈，从而最终完成给定的任务，比如最近爆火的 Manus 以及 OpenAI 的"
tags:
  - "clippings"
---
![横幅](https://p9-piu.byteimg.com/tos-cn-i-8jisjyls3a/80e551ec95e54d3e94bf0f1cdad71e51~tplv-8jisjyls3a-image.image) ![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/ef1b479729b54febacdf28345ebe61af~tplv-8jisjyls3a-image.image)

Agent 即一系列自动化帮助人类完成具体任务的智能体或者智能助手，可以自主进行推理，与环境进行交互并获取环境以及人类反馈，从而最终完成给定的任务，比如最近爆火的 Manus 以及 OpenAI 的 o3 等一系列模型和框架。

强化学习（Reinforcement Learning）被认为是当下最具想象力、最适合用于 Agent 自主学习的算法。其通过定义好一个奖励函数，让模型在解决任务的过程中不断获取反馈（即不同的奖励信号），然后不断地探索试错，找到一个能够最大化获取奖励的策略或者行为模式。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f747765920e24b7d8be1483caecc1dca~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1747200880&x-signature=%2BmvY93s25yXXvfkS5dKxzSxp3c0%3D)

**图 1** Agent 的两种重要的行为模式

为了实现 OpenAI 推出的 o3 这样的表现，我们就必须先要了解 Agent 最重要的行为模式。Agent 最重要的两种行为主要分为推理（(i.e.,Reasoning）和行动（(i.e.,Acting）两种，前者专注模型本身的推理行为，比如反思、分解等各种深度思考技巧；后者专注模型与环境的交互，比如模型需要调用不同的工具、API 以及其他模型来获取必要的中间结果。

Open-o1、DeepSeek-R1 以及 QwQ 等大推理模型通过设计一些基于规则的奖励函数，仅仅从最终答案的正确与否就可以通过 RL 激发出来大模型强大的 Reasoning 模式，比如 System 2 thinking，从而在代码、数学等任务上取得了惊人的效果。

近期一系列工作试图在 Agent 的 Acting 模式复刻大推理模型的成功，比如 Search-R1、ToRL、ReTool 等等，但是几乎所有的工作依旧沿用之前的大推理模型时代的奖励函数，即根据最后答案的正确与否来给予 Agent 不同的奖励信号。

这样会带来很多过度优化问题，就像 OpenAI 在其博客中指出的那样，模型会出现 Reasoning 和 Acting 行为模式的混乱。因为模型仅仅只关注最后的答案正确，其可能会在中间过程中不使用或者过度使用推理或者行动这两种行为。

这里面存在一个认知卸载现象，比如模型就会过度的依赖外部的工具，从而不进行推理，这样一方面模型之前预训练积累的能力就极大地浪费了，另外也会出现非常愚蠢的使用工具的情况，举个例子就是我们俗称的「遇事不思考，老是问老师或者直接抄答案」。

我们这里可以针对 Agent 的这两种不同的行为：Reasoning 和 Acting，设想几种不同的奖励函数，或者说我们期望模型表现出来一种什么样的模式。

1. **Maximize Reasoning and Acting：即我们期望模型能够使用越多的 reasoning 和 acting 来解决问题，会导致效率以及过度优化问题。**
2. **Minimize Reasoning and Acting：即我们期望模型能够使用越少的 reasoning 和 acting 来解决问题，训练难度较大，可能会导致效果不佳。**
3. **Maximize Acting and Minimize Reasoning：这会导致模型极大的浪费本身就很强的 reasoning 能力，反复的愚蠢的去和外部世界交互。**
4. **Maximize Reasoning and Minimize Acting：即 OpenAI o3 目前表现出来的行为，o3 只会在超过自己能力之外的问题下才会去和外部世界交互，大部分的问题都使用自己的推理能力进行解决了。**

这其中最有潜力或者最有可能的技术路线就是第 2 和第 4 个方向，而在这两个方向里唯一的一个共同点就是要不断要求模型去 Minimize Acting，那我们最新推出的 OTC: Optimal Tool Call via Reinforcement Learning（OTC-PO）其实就是朝着这个方向走出的根本性的一步。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ab44c335a2564b7eb1954c2331169676~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1747200880&x-signature=VEjSr4agfx1KYuPTKMPUJGtkQKo%3D)

- **Arxiv**: [arxiv.org/pdf/2504.14…](https://link.juejin.cn/?target=https%3A%2F%2Farxiv.org%2Fpdf%2F2504.14870 "https://arxiv.org/pdf/2504.14870")
- **Huggingface**: [huggingface.co/papers/2504…](https://link.juejin.cn/?target=https%3A%2F%2Fhuggingface.co%2Fpapers%2F2504.14870 "https://huggingface.co/papers/2504.14870")

本文的核心贡献在于以下三点：

1. 我们是第一个 i) 关注大模型工具使用行为优化的 RL 算法；ii) 发现并量化认知卸载现象，且模型越大，认知卸载越严重，即模型过于依赖外部工具而不自己思考；iii) 提出工具生产力概念，兼顾收益与成本；
2. 我们提出 OTC-PO，任何 RL 算法皆可使用，代码修改仅几行，简单、通用、可扩展、可泛化，可以应用到几乎所有工具使用的场景，最大化保持准确率的同时让你的训练又快又好，模型即聪明又高效。
3. 我们的方法在不损失准确率的前提下，工具调用减少 73.1%，工具效率提升 229.4%，训练时间大幅缩小，且模型越大，效果越好。

具体来说， **给定任意一个问题和任意一个模型，我们假设存在一个最优的 Acting 次数，即最少的工具调用次数，来使得模型能够去回答对这个问题。**

需要注意的是这里面最少的工具调用次数是由模型和问题共同决定的，因为不同的模型有着不同的能力，不同的问题也有着不同的难度，这样就是每一个问题和每一个模型其实都有着独特的最小所需工具次数，并且这个最少的工具调用次数可以为 0（即退化为传统的 language-only reasoning）。

也正是因为这样的性质，导致之前的 SFT 方案无法直接作用在这样的场景里面，因为 SFT 基本都是使用一个数据集去拟合所有模型的行为。RL 就天然的提供了这样的一个解决方案，使得不同的模型都可以在自己的交互过程中去学习到对应的最佳的行为模式，而不仅仅是通过 SFT 去模仿一个次优解。

那这个任务就可以被重新定义成如下这样的形式，给定一个问题 q，一个模型 M 以及一堆工具 t0, t1, …, tn，我们喜欢模型 M 能够即快又好的回答问题，其在第 k 步的推理过程可以被定义成：

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d1de1e9bbbfd485fba359651cc1e2121~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1747200880&x-signature=wBS4d831V7cMCZpT%2Btyp6ksl5vk%3D)

其中 ri, tci, oi 分别代表模型的内部推理过程，工具调用，以及环境反馈。需要注意的时候这样的定义可以泛化到不使用任何工具调用的情况即 tci 和 oi 为空字符串。整体的任务就变成了我们需要要求模型不仅答对，还要以一种高效的方式答对，即

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/55f3b57607044e4e98325359514d0a2c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1747200880&x-signature=uAHD9N2pxuIy4sX2kGSvfQtC%2BZA%3D)

这里 代表了该问题的正确答案，我们希望模型答对的前提下，能够去最小化达到这个目标的成本，比如 token 的消耗、tool 的调用。 **这样的任务定义不仅仅是简单的扩充，而是对目前 Agent RL 的一次范式纠偏，使得大家不仅仅关注最终的答案是否正确，还需要关注模型在这个过程中表现的行为。**

这里最核心的思路是根据模型在当下这个交互行为中工具的调用次数 m 以及最优的工具调用次数 n 去给予模型不同的奖励函数。具体来说，在答对的情况下，我们希望模型在取得最优工具调用的时候能够获取最大的奖励，在使用了更多的工具调用的时候奖励是相对小一点的；在答错的情况下，我们希望模型不会获取奖励或者根据调用次数获得的奖励相对较小，从而最大程度的规避奖励黑客现象（i.e., Reward Hacking）。具体来说，我们设计了如下的奖励函数：

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/fb41892cdba7489faac4f1ff8504f5f1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1747200880&x-signature=bh4WURBwX8arsy20o45ul3nXpAI%3D)

其中 ![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5c3327890bb74fed88496232734f292f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1747200880&x-signature=QR%2BQ2eIEDLxiwBTGsqWnWEP6Ojk%3D) 代表对于工具调用次数的奖励， ![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a08af896541c499c83f6ee9d4e1a87c6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1747200880&x-signature=p9ulhSvrJzOvoPUisR8Uh0EK%2BaQ%3D) 代表原来的根据答案的正确性的奖励。这样的奖励函数有很多优点：1）已经有理论证明类似这样的定义理论上对于准确性没有任何损失；2）极大地避免奖励黑客的现象，防止模型过度优化；3）可以泛化到几乎所有的 Agentic RL 的场景，比如对 ![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/cb91a32495984244a8265d46cc370cf6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1747200880&x-signature=HFZe349ZIN5Vf%2B2FU70ilROCrrU%3D) 和 ![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e63e1a28b4c84466adb665917a980991~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1747200880&x-signature=km4LpP9TPN%2BmOcPV%2F6%2F3spEh6ag%3D) 进行扩充，考虑更多的奖励信号。这里 ![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/4ad05ef0207f4d28a20dad708b97aad0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1747200880&x-signature=DTlWMleCZ4OjK9EQcrngGBicvXw%3D) 的设计只需要满足之前说过的那些属性即可，比如越少越好，或者越接近最优工具调用越好，感兴趣的可以参考原文，这里我们重点讲讲我们的一些发现。

## 主要结果

**图 2** Search as Tools, and Code as Tool can be found in the paper.

\*\*模型越大，其认知卸载越严重。\*\*这里的认知卸载指的是模型倾向于把原来通过推理能得到的结果直接外包给外部工具，从而一方面造成工具滥用，一方面阻碍了模型自身推理能力的发展。从图上看就是 Search-R1 在更大的模型上反而需要使用到更多的工具，工具生产力更低。

\*\*模型越大，我们的方法效果越好。\*\*我们在 7B 模型能够取得最高 256.9% 的工具生产力的提升，并且我们的准确率基本没有损失，我们相信当模型大小继续增大的时候，有可能我们能迎来效果与效率的双重提升，具体原因我们稍后解释。

**此外我们发现 GRPO 相较于 PPO 效果更好** ，这是因为 GRPO 由于天然具备针对同一样本的多次采样，对于该样本的最优工具调用行为有一个更加精准的估计。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/cf5fb5eb195a4a34b8c310f3d7169ecc~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1747200880&x-signature=CHEYWZ2sLM1zlVTNzq6bzpXIj5A%3D)

**图 3** OTC-PO 训练效率分析

上图展现了我们的训练效率分析。可以看出我们的方法不仅能够以更少的工具调用和更短的响应时间实现类似的结果，还能实现更快、更高效的训练优化。这一点尤为重要，因为它显著降低了训练过程中与实时工具交互相关的时间和成本，包括时间、计算资源以及可能潜在的工具调用费用。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d2d209e1802b496f8402dc930653895a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1747200880&x-signature=y8o06ftUIJkNGlc8Bv%2FF8maFNTY%3D)

**图 4** The Out-of-domain performance of OTC-PO and Search-R1 in TP.

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/c4ad41d660b8433daf1a730dfff0084a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1747200880&x-signature=II1J5%2FMF0GryRvrQogt0gc46phc%3D)

**表 4** The results of Out-of-Domain (OOD) evaluation of OTC against Search-R1 in EM and TC.

我们的方法不仅仅在 In-domain evaluation 上取得了不错的效果， **在 Out-of-domain 上仍然能够带来巨大的提升，甚至我们观察到我们的准确率和效率都得到了提升** ， **而不仅仅是工具的调用次数和工具生产力** ，比如这里 OTC-PPO 在 7B 模型上的表现就显著优于 Search-R1-PPO。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6a52b716984644b1aa0b07839142d91f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1747200880&x-signature=uVi3Uace84kVe7PQaUBwPmr0930%3D)

最后分享一个 case study，更多分析和 case 可参考原文。这个 case study 代表了我们整篇论文最重要的一个发现即 **(Minimizing Acting = Maximizing Reasoning) = Smart Agent** 从案例中我们可以观察到如果不对模型的交互行为做出任何的限制，模型非常容易出现认知卸载以及工具滥用的现象。仅仅只需要最小化工具调用，我们就可以发现模型不仅能学会更加聪明的使用工具（OTC-PPO），还会极大地激发自身的推理能力，从而去完成问题，即我们一开始所说的如何实现 o3 的行为模式。

## 结论

在本研究中，我们引入了最佳工具调用控制策略优化（OTC-PO），这是一个简单而有效的强化学习框架，它明确鼓励语言模型通过最佳工具调用生成正确答案。与之前主要关注最终答案正确性的研究不同，我们的方法结合了工具集成奖励，该奖励同时考虑了工具使用的有效性和效率，从而促进了既智能又经济高效的工具使用行为。

据我们所知，\*\*这是第一篇从强化学习（RL）角度去建模 TIR 中工具使用行为的研究，我们的方法提供了一种简单、可泛化、可扩展的解决方案，使 LLM 在多种情境和基准测试中成为更强大、更经济的智能体。\*\*这个项目仍在进行中，希望不久的未来我们能够给大家分享更多发现。我们有信心这篇论文将会引领一个全新的研究范式，为实现 OpenAI 的 o3 系列模型带来一个可行的路径。

评论 0

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

APP内打开