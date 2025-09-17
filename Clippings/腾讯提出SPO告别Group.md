---
title: "腾讯提出SPO，告别Group"
source: "https://mp.weixin.qq.com/s?__biz=MzI3ODgwODA2MA==&chksm=ea2606ad5e63e8209bb2791843e4f3717bf0cd99c6cd38f890fc48a784284dabaa4806da548f&idx=1&mid=2247543774&sn=bcef0f3bb2fe49cd352e9e428f036a52#rd"
author:
  - "[[编辑部]]"
published:
created: 2025-09-17
description:
tags:
  - "强化学习"
  - "策略优化"
  - "单流方法"
abstract: "腾讯团队提出单流策略优化方法SPO，解决了组基方法的结构性瓶颈，显著提升训练效率和推理性能。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/gKaxjIx6bahlStOmibaiaC5kvzchZg85f1U22eyKjoUXPFerDOozlNVQVRsCicgHX7rcxRCz1kW6sCh5LnE8zibc7A/0?wx_fmt=jpeg)

Original 编辑部 [深度学习自然语言处理](https://mp.weixin.qq.com/) *2025年09月17日 10:28*

大语言模型（LLM）在推理和复杂决策任务上的突破，与强化学习（Reinforcement Learning, RL）算法进步密不可分。近年来，以Group Relative Policy Optimization（GRPO）为代表的组基 (group-based) 策略梯度方法，通过对单个prompt（prompt）生成多条response，构建即时基线 (baseline) 以降低梯度方差(variance reduction)，成为RLVR范式的主流选择。

但实践已经暴露出组基方法的根本性瓶颈：一旦整组response同对或同错，“退化组”直接抹消学习信号；在分布式或long-horizon生成场景中，慢样本拖累整组完成，吞吐量被锁死。复杂的工程补丁（如动态采样）只能缓解表面症状，却难以触及系统性结构性问题。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahlStOmibaiaC5kvzchZg85f1omVOlQOZC9TjlibCbrV4qrY19icg5EeVYuKMQDUsLzMl4ea90qXlm8Ag/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

- 论文：Single-stream Policy Optimization
- arXiv：https://arxiv.org/abs/2509.13232
- Notion blog: https://zhongwenxu.notion.site/Single-stream-Policy-Optimization-26a1c4e140e380d78d51fa4567727f50

正是在这样的背景下，腾讯团队提出了 **Single-stream Policy Optimization（SPO）** ，回归单流策略梯度范式，以“一条response即一条样本”的方式直接对抗组基方法的固有缺陷。SPO通过持续价值跟踪、全局advatnage归一化与优先级采样三位一体的设计，既保留低方差学习信号，又完全消除了组同步开销。

**亮点速览**

- **彻底告别组同步** ：每个prompt-response独立更新，天然适配异步、长尾时延的Agentic场景。
- **KL自适应价值跟踪器** ：持续估计prompt成功率，提供低方差、时效性强的学习信号。
- **全局优势归一化** ：用大batch统计量抑制噪声，训练过程更加平滑稳定。
- **优先级采样带来自适应课程** ：把计算资源聚焦在最不确定、最有价值的prompt上。
- **实证效果显著** ：Qwen3-8B在五大数学难题基准上平均maj@32提升3.4个百分点，在模拟实验中，Agentic训练吞吐提升可达4.35倍。

## 研究动机与问题定义

GRPO等组基 (group-based) 方法的核心是：针对每个prompt生成多条response，在组内计算奖励的均值与标准差，构造相对优势（advantage）来更新策略。虽然能降低方差，但也引出了两个难以回避的结构性矛盾：

1. **退化组问题** ：在模型已掌握或非常困难的prompt上，组内response常常“同喜同悲”。奖励完全一致意味着优势值归零，所有生成都白费。论文中的统计显示，在典型训练阶段，GRPO中高达60%~80%的样本属于退化组。
2. **同步瓶颈问题** ：组内所有response必须等待最慢的那一个完成才能更新。当任务涉及多轮工具调用、长轨迹推理时，任一慢样本都会拖累整组，使得训练吞吐量受制于“最慢者”。

腾讯提出SPO，正是为了从算法架构层面解除这些限制。它摒弃“组”这一约束，让每个prompt-response对独立成为训练样本，并基于跨时间的统计信息构建稳定基线，从根源提升样本效率和扩展性。

## SPO方法详解

### 整体架构

SPO的核心思想是为每个prompt维护一个持续更新的价值估计器（value tracker），用来预测该prompt在当前策略下的成功概率。这个估计器随策略的变化而自适应调整，并用于计算Advantage优势值。Advantage不再在组内归一化，而是在整个批次（batch）范围内进行全局归一化，从而进一步提升稳定性。

### KL自适应价值跟踪器

SPO使用轻量级的贝叶斯价值跟踪器来估计每个prompt的成功概率。对于二值奖励（成功=1，失败=0），该概率可建模为Beta分布：

其中， 是后验均值，作为价值估计。

每次观察到新奖励 后，SPO会先对历史参数进行折扣，再更新：

折扣因子 由当前策略与历史策略在prompt 上的KL散度决定：

KL散度越大，说明策略变化越大，历史信息遗忘得越快。这一机制让价值估计随策略演化快速调节，始终保持低延迟、低方差的baseline。

对于通用奖励（非二值），可以直接采用指数滑动平均 (EMA) 的形式维护 ：

其中更新率 能同时适应策略漂移（通过 ）和统计置信度（通过有效样本数 ）。

![对比GRPO（组基）和SPO（单流）的架构差异](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahlStOmibaiaC5kvzchZg85f1syiaS4dEmvMAYibY7YJt0UtHjjClhrjSF8GflnhlqgRBtBR7LPbCdGZQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

对比GRPO（组基）和SPO（单流）的架构差异

### 全局Advantage归一化

SPO首先根据价值跟踪器的历史估计计算advantage：

其中 是更新前的价值估计，确保与当前动作独立，保持梯度无偏。

随后，SPO对整个batch中的advantage值做全局归一化：

其中 和 分别是batch中所有优势值的均值和标准差。与组内归一化相比，这种全局视角能显著降低统计噪声，使学习信号更加平滑稳定。

### 优先级prompt采样

为了进一步提升数据效率，SPO引入了基于不确定性的优先级采样机制。采样权重定义为：

这一项本质上是伯努利分布的标准差，在 时最大，意味着模型对该prompt最不确定、也最值得投入学习。附加的 项确保所有prompt都有出场机会，避免课程过度集中。其他合理的统计量同样可以搭配SPO使用。

## 实验设置与结果分析

### 实验设置

团队基于 Qwen3-8B 模型，在包含数学推理与工具调用（Tool-Integrated Reasoning, TIR）的 DAPO 数据集英文子集上进行训练，策略学习率固定在 ，并沿用Clip-Higher机制（ ）来兼顾探索与稳定性。评估涵盖五个高难度数学竞赛基准：AIME 24、AIME 25、BeyondAIME、BRUMO 25、HMMT 25，指标包括平均准确率（avg@ ）、通过率（pass@ ）和多数投票准确率（maj@ ）。训练时最大回复长度为16K，评测时最大回复长度为32K。

### 主要结果

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahlStOmibaiaC5kvzchZg85f1J5MXLqI9IEdvnMegXAXoeXmK7CvHo8Rib9FBBlCbPbGMx46McDdHw4w/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

SPO在绝大多数基准与指标上全面优于GRPO，平均 maj@32 提升3.4个百分点；其中 BRUMO 25 上提升7.3个百分点，AIME 25 上提升4.4个百分点，HMMT 25 上提升3.3个百分点。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahlStOmibaiaC5kvzchZg85f1wV5dk2EbQq6wkLoeIqGEicYqMnmEnLKWJsN9GricQkSzaNgR2JkO4vZA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

SPO在所有 值下的pass@ 曲线均高于GRPO，显示出其生成高质量response的稳定性。

### 信号效率与稳定性分析

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahlStOmibaiaC5kvzchZg85f1zgSPNftaH4HYmQAZMycw9t0upePlaM87XyeoQVqUeWQmYUjIYVvC4Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

图(a)显示GRPO中退化组比例高达60%~80%，而SPO中近零优势样本比例始终远低于该水平；图(b)则说明SPO的优势方差明显低于GRPO，学习信号显著更稳定。

### Agentic训练吞吐量优势

在模拟的长尾交互场景中，SPO无需等待组内最慢样本，通过异步采集最先完成的样本，实现了4.35倍的训练吞吐提升。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahlStOmibaiaC5kvzchZg85f1dOpHc4dqIibibqlXZqdOTTw0lZJWK9Al1vicpGhQs5SqScBZBkMlXdW6Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahlStOmibaiaC5kvzchZg85f1ZoUiaPp8MQjvwmeSCuXuFjryPkZibYzI5akSnRiaIKTjfFo71iaYZSPuCw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

这两图分别展示了group-based方法中的同步瓶颈问题，以及SPO如何通过异步采样大幅提升效率。

## 讨论与总结

SPO的创新可总结为以下几点：

1. **单流设计** ：彻底摆脱组同步，适用于长周期、异速生成的Agentic任务。
2. **持续价值跟踪** ：通过KL自适应的贝叶斯更新，实现低方差、高适应性的基线估计。
3. **全局归一化** ：利用大批次统计量稳定优势信号，避免小样本噪声。
4. **优先级采样** ：构建自适应课程学习机制，聚焦于最具学习价值的prompt。

SPO的成功表明，并非所有问题都要依赖额外的工程复杂度。回归基本原理、精心设计核心组件，反而能够带来更高的训练效率和更强的推理性能。

## 结论

SPO是对GRPO等group-based方法的一次系统性重构。通过单样本流、持续价值估计与全局归一化等设计，它显著提升了训练效率、稳定性和扩展性，并在多个数学推理基准及Agentic仿真中给出强力实证。

SPO的出现提醒我们：在追求更复杂模型与算法的同时，更应重视基础原则的力量。简洁、鲁棒、可扩展的设计，才是推动LLM推理能力持续进化的关键。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baiaWmgCyFvlO6o9nbibLsgUz4bSBG2wsKYm0ZBtgib7BFlvgB1UjGl0wLicsmR7giaso7nBibOWDG8FazKA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baiaWmgCyFvlO6o9nbibLsgUz4MerqsP1EnmMkbCHPWM2nhhvzYkwlSML6DNUH5MgJicp0KicH3m5X2SFg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

继续滑动看下一个

深度学习自然语言处理

向上滑动看下一个