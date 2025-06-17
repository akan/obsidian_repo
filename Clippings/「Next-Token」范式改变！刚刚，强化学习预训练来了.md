---
title: 「Next-Token」范式改变！刚刚，强化学习预训练来了
source: https://juejin.cn/post/7514467937601798159
author:
  - "[[机器之心]]"
published: 2025-06-11
created: 2025-06-12
description: 在 2016 年的一次演讲中，Yann LeCun 曾将强化学习比喻成蛋糕上的樱桃。他提到，「如果把智能比作一块蛋糕，那么无监督学习就是蛋糕的主体，监督学习就是蛋糕上的糖霜，而强化学习则是糖霜上的樱桃
tags:
  - clippings
  - 强化学习预训练
  - RPT
---
![横幅](https://p26-piu.byteimg.com/tos-cn-i-8jisjyls3a/8694dbc29caa4b59bda5f4181f3bd6ef~tplv-8jisjyls3a-2:0:0:q75.image) ![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/796c19f610c146ffac65db71d7329490~tplv-8jisjyls3a-2:0:0:q75.image)

> 谁说强化学习只能是蛋糕上的樱桃，说不定，它也可以是整个蛋糕呢？

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/2b4d05763cec4ae58d1e154bb978ab0c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=yZ%2BcrRjxTrgzc8gRge1cyTeBJ2Y%3D)

在 2016 年的一次演讲中，Yann LeCun 曾将强化学习比喻成蛋糕上的樱桃。他提到，「如果把智能比作一块蛋糕，那么无监督学习就是蛋糕的主体，监督学习就是蛋糕上的糖霜，而强化学习则是糖霜上的樱桃。我们已经知道如何制作糖霜和樱桃，但却不知道如何制作蛋糕本身。」

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ac0ab1fe19f14c9a9bffb15b00b7f331~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=Cv7rBm9ccgMCa0qAjzG86kWXED0%3D)

从 2016 年至今，LeCun 对强化学习一直不看好。然而，不可否认的是，强化学习在提升 AI 模型能力方面正变得越来越重要。而且，来自微软的一项新研究显示，它不仅在后训练阶段发挥着关键作用，甚至在预训练阶段也展现出巨大的潜力。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a0008fb0ca5e4b989ee3424cdef4b760~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=3eLNWdLQHv%2BTSMyFgWOpU9o%2Bu2U%3D)

在这篇题为「Reinforcement Pre-Training」的论文中，作者提出了一种名为「强化预训练（RPT）」的新范式。在这种范式中，下一个 token 预测任务可以被重新定义为一个通过强化学习训练的推理任务。在这一任务中，模型会因正确预测给定上下文中的下一个 token 而获得可验证的奖励。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/898865fd2eda47daa3b80e7ac428231d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=z4SzJITtCSXUImpWnIB%2Bqcib94k%3D)

这就好比在制作蛋糕的过程中，直接将樱桃融入到蛋糕的主体结构中。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d26d53f7d7fd4e8abf55413a4f988d37~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=onAFKVOvRq1yGePSUMCSe8Hfn9o%3D)

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6e57635a0b8d4a6f827e7bcb7d7a1078~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=%2BBPa3cLCvCR6h8vjlTYXEGfwax4%3D)

作者指出，RPT 范式的好处在于，它提供了一种可扩展的方法，能够利用海量文本数据进行通用强化学习，而无需依赖特定领域的标注答案。

通过激励模型进行下一个 token 的推理，RPT 显著提升了预测下一个 token 的语言建模准确性。此外，RPT 为后续的强化微调提供了一个强大的预训练基础。

scaling 曲线表明，随着训练计算量的增加，下一个 token 预测的准确性持续提升。这些结果表明，RPT 是一种有效且有前景的 scaling 范式，能够推动语言模型预训练的发展。

不过，由于论文提出的方法比较新，社区对该方法的有效性、效率、前景等还有所疑问。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3915b802dee643c5882879e619da82d2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=D2En00kppVBfqKrieb0LwyaQffI%3D)

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/955ebcb1fc7c4ccf9c94b9c8c4b73943~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=Gw1GZqQdXs0HVof31v8UHbCskR4%3D)

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f6dfb781de1b4d519c53ae81d2b4ef90~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=5alHBMBTefpkBQCIK5LwEfEVaSs%3D)

接下来，我们看文章内容。

论文概览

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/cf74a767c7fb49e8873146d6bfe24e94~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=vKL%2Bp8P76bWJbCSVur0YbsnhL%2Fo%3D)

- 论文标题：Reinforcement Pre-Training
- 论文链接： [www.arxiv.org/pdf/2506.08…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.arxiv.org%2Fpdf%2F2506.08007 "https://www.arxiv.org/pdf/2506.08007")

大语言模型（LLMs）通过在海量文本语料库上采用可扩展的对下一个 token 的预测，展现出跨多种任务的卓越能力。这种自监督范式已被证明是一种高效的通用预训练方法。

与此同时，RL 已成为微调大语言模型的关键技术，既能让 LLM 符合人类偏好，又能提升诸如复杂推理等特定技能。

然而，目前 RL 在 LLM 训练中的应用面临着可扩展性和通用性方面的挑战。

一方面，基于人类反馈的强化学习虽然在对齐方面有效，但依赖于昂贵的人类偏好数据，而且其学习到的奖励模型容易受到 reward hacking 攻击，从而限制了其可扩展性。

另一方面，可验证奖励的强化学习 (RLVR) 利用客观的、基于规则的奖励，这些奖励通常来自问答对。虽然这可以缓解 reward hacking 攻击，但 RLVR 通常受限于数据的稀缺性，不能用于通用预训练。

本文提出了强化预训练（Reinforcement Pre-Training, RPT）这一新范式，旨在弥合可扩展的自监督预训练与强化学习能力之间的鸿沟。

RPT 将传统的对 next-token 的预测任务重构为对 next-token 的推理过程：对于预训练语料中的任意上下文，模型需在预测前对后续 Token 进行推理，并通过与语料真实的 next-token 比对获得可验证的内在奖励。

该方法无需外部标注或领域特定奖励函数，即可将传统用于 next-token 预测的海量无标注文本数据，转化为适用于通用强化学习的大规模训练资源。

这种方法提供了几个关键的优点。

首先，RPT 具有固有的可扩展性和通用性：该方法充分利用了传统 next-token 预测所使用的海量无标注文本数据，无需任何外部标注，即可将其转化为适用于通用强化学习的大规模训练数据集。

其次，使用直接的、基于规则的奖励信号本质上可以最大限度地降低 reward hacking 风险。

第三，通过明确奖励 next-token 推理范式，让模型能够进行更深入的理解和泛化，而不仅仅是记住下一个 Token。

最后，预训练期间的内部推理过程允许模型为每个预测步骤分配更多的思考（计算资源），这类似于将推理时间扩展能力提前应用到训练过程中，从而直接提升下一 Token 预测的准确性。

强化预训练（RPT）详解

Next-Token 预测与 Next-Token 推理对比如下。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3468f20edbf14aa99e305669081a1510~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=3iGq4TpEI4GZ0KVJGD4bbaalzp8%3D)

在 Next-Token 推理范式下，长思维链可以包含各种推理模式，例如自我批评和自我修正。

Next-Token 推理将预训练语料库重构为一系列庞大的推理问题，使预训练不再局限于学习表面的 Token 级关联，而是理解其背后的隐藏知识。

RPT 通过 on-policy 强化学习的方式训练大语言模型执行 next-token 推理任务，如图 3 所示。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/99aa7898b5bb4f7596a119406bf5b811~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=3TCENZg8O4ub6QWFEJfrk6b3vAk%3D)

对于给定的上下文 ![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6066a2c7259c42bcb1cd4b8d673efdff~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=vHKG1T%2BggSgBLmzDllIwehhkGpA%3D) ，提示语言模型 ![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/0e2319b8db2342c8af8bbe60ecfc3100~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=xUunag%2FpBr2om5KP%2FMe4p8VTfWg%3D) 生成 G 个响应（思维轨迹） ![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/2e20fd063f004965a55931d6f44244d4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=UPFYgjy4dcAnjvcnzZ8cngYU58Y%3D) 。每个响应 ![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5f75fe879e0643afb92971a3d0fcd0b3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=%2B0KCS61xJKIFZCYcDL2UIB44fa4%3D) 由一系列思维推理序列 ![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5d6ef6bf6abd4ba4b1dc40509da7c91d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=muiRFNIijqE5UhuNIBG3EBiPa%2Fs%3D) 和最终预测序列 ![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6ef1e81e82944569ae4630ec1f506fe8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=CC0iGhYB0SJoGcerWRS%2FR9h%2FAJk%3D) 组成。

此外，为了验证 ![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a1dfa287085e49ad92c7572a83bb05c3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=DhIeUTwSbG%2BC5ICB8nq8wQ5kbEQ%3D) 的正确性，本文还引入了前缀匹配奖励（prefix matching reward）。

对于 ![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/1cc252a2c23a477db51b7d32db2a709d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=s1vcypfeCzqxcSj8yK1leXl%2BU5U%3D) 的第 i 个输出的奖励 ![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f39ecb16e75a46e78e34da6a566057e3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=6URRANf5GtZahpQv%2Fh81u%2FwcUAg%3D) 定义为：

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/785ff0d46f8d43f89216ec1099c77bde~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=n4cATRry5mRvoc2UAXoDD1krZLE%3D)

实验设置。本文使用 OmniMATH 数据集进行强化预训练，其包含 4,428 道竞赛级数学题目及答案。实验基础模型为 Deepseek-R1-Distill-Qwen-14B。

实验结果

语言建模能力

表 1 显示了 RPT 方法和基线方法在不同难度级别测试集上的下一个 token 预测准确性。结果显示，RPT 在与标准下一个 token 预测基线和基于推理的预测基线对比时均表现更优。

具体来说，与 R1-Distill-Qwen-14B 相比，RPT-14B 在所有难度级别上都具有更高的下一个 token 预测准确率。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/1b992e13f33640549cb135b2bdd8c911~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=XBWmUEoSwOFl5DCsVVXFIEwPq98%3D)

值得注意的是，它的性能与一个更大的模型的性能相媲美，即 R1-Distill-Qwen-32B（图 4）。这些结果表明，强化预训练在捕获 token 生成背后的复杂推理信号方面是有效的，并且在提高 LLM 的语言建模能力方面具有强大的潜力。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/2866e51b93d2487ab6c58ac4c1d3612e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=xab1wqzx29vQnfxPmvBxcWcyNEE%3D)

强化预训练的 scaling 特性

如图 5 所示，RPT 的下一个 token 预测准确率随着训练计算的扩大而可靠地提高。所有难度级别的高 R2 值表明拟合曲线准确地捕捉了性能趋势。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/bc5b7ffc59c449ae9da537bd0bc8c55c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=VoRrMrCmNPVJtZw3NNqxLNAhaNI%3D)

在 RPT 基础上进行强化微调

如表 2 所示，经过强化预训练的模型在进一步使用 RLVR 进行训练时能够达到更高的性能上限。当模型持续使用下一个 token 预测目标在相同数据上进行训练时，其推理能力显著下降。随后的 RLVR 训练仅能带来缓慢的性能提升。这些结果表明，在数据有限的情况下，强化预训练能够快速将从下一个 token 推理中学到的强化推理模式迁移到下游任务中。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/958c1a20790a440f899131efee303c8a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=Grdo%2Bku0JsXx92vQdmro4AQdt3E%3D)

零样本性能

如表 3 所示，RPT-14B 在所有基准测试中始终优于 R1-Distill-Qwen-14B。值得注意的是，RPT-14B 在 next-token 预测方面也超越了规模更大得多的 R1-Distill-Qwen-32B。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ff3a979ee746445cb03d5122a094a14b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=szC%2FGaYYWb3ZLd%2BaeY6wCbfYAt4%3D)

Next-Token 推理模式分析

如图 6 所示，RPT-14B 的 next-token 推理过程与 R1-Distill-Qwen-14B 的问题解决过程明显不同。表明 next-token 推理引发的推理过程与结构化问题解决存在质的差异。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/1d3c8bce15cf4775bee0e467cbbddf52~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=MfHYcZev%2Fg7ILpwxfKLtgoF%2F%2BmI%3D)

最后，本文还在表 4 中提供了一个推理模式的示例。他们表明，RPT-14B 参与的是深思熟虑的过程，而非简单的模式匹配。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ab804fd7497249fab6f3cab4736cd156~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750242239&x-signature=rRJ979w5zaSPFvZum7gkUZKe3vo%3D)

评论 0

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

APP内打开