---
title: "谷歌新论文：为什么当前 AI 无法在训练后继续学习？"
source: "https://juejin.cn/post/7576181242582892607"
author:
  - "[[恋猫de小郭]]"
published: 2025-11-25
created: 2025-11-28
description: "相信大家都经历过这样的疑惑，在使用 AI 的过程中，为什么我明明都纠正过它的问题，但是它下次还是依然会犯同样的错误，以至于我们不得不针对性写大量的规则来约束整个 Vibe Coding 的过程。 问题"
tags:
  - "数字失忆症"
  - "连续记忆频谱"
  - "自我修改模型"
abstract: "谷歌提出的HOPE架构通过嵌套优化和多级更新频率解决AI无法持续学习的问题，让模型在推理过程中自我修改参数实现终身学习。"
---
相信大家都经历过这样的疑惑，在使用 AI 的过程中，为什么我明明都纠正过它的问题，但是它下次还是依然会犯同样的错误，以至于我们不得不针对性写大量的规则来约束整个 Vibe Coding 的过程。

> 但是就算有详细的 rule ，有些倔强的模型依然喜欢我行我素，比如 Gemini 3 Pro 就容易出现， **写的太详细的 prompt ，效果居然不如模糊的** ，你纠正他，他会先肯定你，然后说还是该按照我的来····

## 问题

谷歌这次公布的论文很直观的解释了这个问题： **因为大模型无法在训练后继续学习** ，论文把当前的大型语言模型（LLM）被比作患有 **“顺行性遗忘症”（Anterograde Amnesia）** 的病人 ，这种病人只能保留发病前的长期记忆，无法形成新的长期记忆，只能依靠短暂的短期记忆生活。

![image-20251125103150345](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/369b747e84a34869b11b90b1b06394a2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oGL54yrZGXlsI_pg60=:q75.awebp?rk3s=f64ab15b&x-expires=1764645324&x-signature=SPT%2BjNorfMdl%2FlkYebROM39BP90%3D)

具体可以解释为以下三点：

### A. “数字失忆症”：只有两极，没有中间态

目前的模型只有两种记忆状态，中间存在巨大的断层：

1. **极快且短暂的记忆** （In-Context Learning）： 也就是你的 `Prompt` 或上下文窗口，这部分通过注意力机制（Attention）处理，更新极快，但这只是“临时的”，一旦窗口关闭或超出长度，信息就消失了 ，这也是为什么它并能吸取你的教训的原因
2. **冻结的长期记忆（Pre-trained Weights）：** 对应的是模型的 `MLP` 层（参数），这部分是在预训练阶段通过海量数据“固化”下来的，一旦部署了，这些参数就是静态的，无法更改 。

而目前的问题在于：当前模型缺乏将“即时对话”转化为“长期参数”的机制，也就是它们缺乏中间的频谱： **那些应该从短期逐渐变为长期的记忆** 。

### B. 维度单一：只堆叠了“深度”，忽略了“时间”

在论文里，传统的“深度学习”主要关注堆叠更多的层（Depth）来增加容量 ，但这一维度是静态的。

研究人员发现 **真正的学习需要正交的另一个维度：时间（或频率）** ，大脑并不是以统一的速度更新所有神经元的，而是以不同的频率（脑波）运作，而目前的 LLM 就像是一个强制所有楼层都静止不动的建筑，只有最顶层的“接待处”（Context）在工作。

### C. 优化器与架构的分离

在传统深度学习中， **架构** （如 Transformer）和 **优化器** （如 Adam）被看作是两个独立的东西，架构负责推理，优化器负责在训练时更新参数。

而论文的颠覆性观点是： 优化器本质上也是一种 **联想记忆模块（Associative Memory）** ，目前的模型在部署后丢弃了优化器，导致它们失去了“自我修改”和“压缩梯度”的能力，从而失去了学习能力。

## 解决办法

为了解决这个问题，谷歌提出了一种新的范式，不再把模型看作一个扁平的神经网络，而是看作 **一组嵌套的优化问题** 。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/412bd2c859c6487a995362d8eb2bc841~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oGL54yrZGXlsI_pg60=:q75.awebp?rk3s=f64ab15b&x-expires=1764645324&x-signature=GbFVHZaKtmRueCmIGPhwLQiTjnY%3D)

### A. 核心理念：连续记忆频谱 (Continuum Memory System)

就像人类大脑有不同频率的脑波（Delta波、Theta波、Alpha波等）分别负责不同层级的记忆整合一样 ，模型也应该有不同更新频率的组件。

- **传统模型：** 频率只有 0 （冻结的参数）和 ♾️（极快的 Attention）。
- **嵌套学习模型：** 创建一个：
	- **Level 1 (极快):** 处理当前的 Token。
	- **Level 2 (中等):** 每隔 16 个 Token 更新一次，捕捉短期上下文
	- **Level 3 (慢速):** 每隔 100万 Token 更新一次，捕捉长期知识
	- **Level 4 (极慢):** 类似目前的预训练知识

例如，左图（Deep Learning）展示了通常理解的深度学习模型（如 RNN + Attention），是一个扁平的序列 ，这种视角隐藏了内部的梯度流动 。

而右图（Neural Learning Module）：\*是论文的核心视角，它将模型看作一个个 **嵌套的立方体** ，每一个立方体代表一个“优化问题” ，从而实现不同 Level 的连续频谱，每一层都有自己的梯度流（Gradient Flow）和更新目标。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/28937766376b45368aa2ef073529650e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oGL54yrZGXlsI_pg60=:q75.awebp?rk3s=f64ab15b&x-expires=1764645324&x-signature=7yBZTFJmwdmXzYOvjKLLhmvhF3o%3D)

也就是 **“层（Layer）”不仅仅是空间的堆叠，而是时间上的嵌套** ，解释了为什么模型应该包含“内部优化器”：即模型在推理时，内部的小盒子应该在不断自我优化。

### B. 新架构：HOPE (Self-Modifying Titans + Continuum Memory)

论文作者提出了 **HOPE** 的具体实现模型，它结合了两个关键技术：

1. 自我修改的 Titans\*\* (Self-Modifying Titans)

模型不再依赖外部的优化器（如 Adam）来告诉它如何更新，而是学习如何修改自己，模型内部包含了一个“学习模块”，它能在运行时计算梯度并更新自己的参数，这意味着模型在和你对话的过程中，实际上在微调它自己的部分结构

1. 多级 MLP 系统

HOPE 使用了一系列嵌套的 MLP（多层感知机）块，每个块有不同的“块大小”（Chunk Size）和更新频率：

- 有些层更新得很快，负责记住刚才的对话
- 有些层更新得很慢，负责沉淀知识

组合起来，就构成了“梯度记忆曲线” 。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/cc5b0a9cccc041b0b6468a03185b4a0a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oGL54yrZGXlsI_pg60=:q75.awebp?rk3s=f64ab15b&x-expires=1764645324&x-signature=pBDlZP47djcKi1OWHewdrYZ0aqA%3D)

对比 Transformer 的极端频率，可以看出来 HOPE (左侧)这是一个连续的频谱，

- High Frequency FFN：块大小（Chunk Length）为 16，更新频率高 。
- Mid Frequency FFN：块大小为 1M（一百万），更新频率中等。
- Low Frequency FFN：更新极慢 。

从而解决“无法继续学习”的问题，展示了如何填补“短期记忆”和“长期记忆”之间的空白，创建了不同速率的记忆层级。

### C. 深度优化器 (Deep Optimizers)

论文证明了动量梯度下降（Momentum SGD）本质上是一个 2 级的联想记忆系统 ，HOPE 利用这一发现，设计了更具表达能力的优化器，使其成为模型本身的一部分，而不是训练完就扔掉的工具。

## 实验结果与意义

在实验中，HOPE 模型（760M 和 1.3B 参数量）在语言建模和常识推理任务上， **击败了同等规模的 Transformer++、RetNet 和 Mamba (Titans)** ， 更重要的是它展示了更低的困惑度（Perplexity），证明了这种“动态更新”机制的有效性。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f6b22fce82bb4efb87493f8830614f4d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5oGL54yrZGXlsI_pg60=:q75.awebp?rk3s=f64ab15b&x-expires=1764645324&x-signature=BoT%2BDUA%2BYoU2s2x8fx2pifdNY%2FI%3D)

另外论文的意义不仅仅在于提出了一个新模型，而在于它挑战了“深度学习”这个名字本身 ：

- **从“深度”到“嵌套”：** 未来的 AI 竞争可能不再单纯是堆叠层数和参数规模（Scale），而是设计更合理的 **时间更新频率（Time/Frequency）**
- **终身学习 (Lifelong Learning)：** 如果 HOPE 架构被规模化，也许可以会看到真正的“养成系” AI，它不会在发布那天就停止成长，而是通过每一次交互，将信息从短期记忆逐渐渗透到长期记忆中，真正解决“灾难性遗忘”和“无法持续学习”的痛点。

总结起来，之前的 ChatGPT 和 Gemini 像是一个只有“此时此刻”和“出厂设置”的机器；而 Google 提出的 HOPE 架构，试图赋予 AI “从此刻走向永恒”的记忆能力，让模型在运行中通过自我修改来持续进化。

> 而实际上对应之前 Deepseek 利用图片来压缩记忆的实现，也是在记忆时效性上的探索。

## 最后

**从这个角度看，能“吃一堑长一智”的 AI 也许离我们就不远了** ，不过可以猜测，这种实现也有这相应的局限性问题需要处理，例如 HOPE 架构的核心在于“模型在推理过程中修改自己” ，这意味着它不能像传统 Transformer 那样只进行简单的矩阵乘法，还需要进行梯度的计算和参数更新，也就是：

- 更多的性能开销，例如额外的 MLP 运算和实时梯度计算
- 更多的内存占用，比如 HOPE 需要存储“优化器状态” 和管理状态大小
- HOPE 要求参数在 `Forward` 过程中动态变化 ，这种“自我修改”的代码实现难度大，且难以利用现有的底层 Kernel 优化
- 多嵌套下的梯度流管理和独立问题
- ·····

> 最后，本文解读主要参考 Gemini 分析。

## 原文链接

[abehrouz.github.io/files/NL.pd…](https://link.juejin.cn/?target=https%3A%2F%2Fabehrouz.github.io%2Ffiles%2FNL.pdf "https://abehrouz.github.io/files/NL.pdf")

评论 6