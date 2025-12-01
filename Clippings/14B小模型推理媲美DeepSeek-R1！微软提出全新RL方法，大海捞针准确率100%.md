---
title: "14B小模型推理媲美DeepSeek-R1！微软提出全新RL方法，大海捞针准确率100%"
source: "https://mp.weixin.qq.com/s/kHjSO-WsbDJGcG5u-XJnNQ"
author:
  - "[[卜圆]]"
published:
created: 2025-12-01
description: "长上下文推理的低成本强化学习方案~"
tags:
  - "长上下文推理，强化学习，数据构建，小模型优化"
abstract: "微软联合上海交通大学提出名为LoongRL的数据驱动强化学习方法，使14B小模型在长上下文推理任务上性能媲美DeepSeek-R1等更大模型，并在“大海捞针”测试中实现100%准确率。"
---
Original 卜圆 *2025年10月29日 18:19*

智猩猩AI整理

编辑： 卜圆

  

在当前大语言模型的发展中，长上下文推理能力的提升已成为关键研究方向。然而，构建具备高级长上下文推理能力的模型仍面临多重挑战。

  

首先，用于训练的理想问题需足够复杂以激发深度推理并支持从长上下文中动态检索关键信息，而且答案可验证。然而，满足这些条件的 **高质量长上下文数据极为稀缺。**

  

其次，要提升长上下文性能，模型通常需在接近目标长度的上下文中训练。然而，将强化学习的 rollout 从短上下文（<1K token）扩展到128K以上，会带来 **巨 大 的计算与内存开销** ，在常规资源下难以实现。

  

第三，即便技术上可实现长上下文训练，单一任务类型的集中训练可能引发 **模型能力的失衡** 。

  

为此，微软联合上海交通大学等提出 **LoongRL** ，这是一种面向高级长上下文推理的数据驱动型强化学习方法，训练得到的LoongRL-14B得分为74.2， **性能媲美 o3-mini（74.5）和 DeepSeek-R1（74.9）等规模更大的前沿模型** ；通过全部128K“大海捞针”测试，提升长上下文检索能力，且保持短上下文推理能力。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/DPAHibibAl3vShiaStFibmKUop2rgVQsrlCVjWHS0wFBsiczTXw57jKAR3nHpk0vNfWUtryiauicJKMAoO1dx725EAmAg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

- 论文标题：
	LOONGRL:REINFORCEMENT LEARNING FOR ADVANCEDREASONING OVER LONG CONTEXTS
- 论文链接：
	https://arxiv.org/pdf/2510.19363

***01***

**方法**

  

（1）数据集构建

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*图1 利用KeyChain方法构建数据流程图*

  

研究团队从真实任务中选取整理好的高质量短上下文问答对 {oL <sub><span><span>i</span></span></sub>, oq <sub><span><span>i</span></span></sub>, oa <sub><span><span>i</span></span></sub> }。首先，插入干扰文档，将每个样本扩展为长度为16K token的长输入 L′ <sub><span><span>i</span></span></sub> 。

  

随后，通过 KeyChain 方法随机插入多跳键值链（key-value chains），将原始三元组 {L′ <sub><span><span>i</span></span></sub>, oq <sub><span><span>i</span></span></sub>, oa <sub><span><span>i</span></span></sub> } 转换为 {L <sub><span><span>i</span></span></sub>, q <sub><span><span>i</span></span></sub>, a <sub><span><span>i</span></span></sub> }，其中原始问题 oq <sub><span><span>i </span></span></sub> 被隐式嵌入到扩展后的键值序列 L <sub><span><span>i </span></span></sub> 中，从而显著增加任务的推理难度。面对新问题 q <sub><span><span>i</span></span></sub> ，模型必须首先追踪链条以恢复原始问题 oq <sub><span><span>i</span></span></sub> ，然后在长上下文 L <sub><span><span>i </span></span></sub> 上进行推理，生成正确答案 a <sub><span><span>i</span></span></sub> 。

  

该构建方式确保强化学习训练聚焦于长上下文下的深度推理，而非记忆或浅层检索。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*图 2 长上下文多跳问答任务中，使用与不使用 通过KeyChain构建的数据进行强化学习的模型行为对比图*

  

对比实验表明，模型在使用通过KeyChain构建的 数据时展现出更优的推理行为：其推理过程呈现出一种涌现的“规划–检索–推理–复核”思维模式，各阶段职责分明，推理更为可靠，并能有效泛化至更长的上下文；相比之下，在不使用 KeyChain 数据时，模型的推理与检索过程相互混杂，通常缺乏明确的规划阶段，对检索结果也未能进行深入的推理整合，导致错误频发。图2中推理步骤以蓝色标记，检索步骤以橙色标记，直观体现了两种条件下思维路径的差异。

  

（2）长上下文强化学习

  

基于 KeyChain 构建的数据，研究团队提出了面向长上下文任务的强化学习方法，包括 **奖 励 设计、数据混合与多阶段训 练** 策略。

  

1）GRPO

  

训练采用 GRPO算法。具体而言，对于数据集D中的每个问题 q、其对应的长上下文 L以及真实答案a，GRPO 首先从旧策略π <sub><span><span>θold</span></span></sub> 中采样一组 rollout 轨迹 {o <sub><span>1</span></sub>, o <sub><span>2</span></sub>, · · ·, o <sub><span>G</span></sub> } ，然后通过最大化以下目标函数来优化策略π <sub><span><span>θ</span></span></sub> ：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

其中， 超参数 ε和 β分别控制重要性采样比率的裁剪范围以及KL散度惩罚项的权重。

  

每个 rollout 轨迹的优势估计值 A <sub><span><span>i,t</span></span></sub> 基于一组奖励 {r <sub><span><span>1</span></span></sub>,r <sub><span><span>2</span></span></sub>,…,r <sub><span><span>G</span></span></sub> }计算得到：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

其中，r <sub><span><span>i </span></span></sub> 为轨迹 o <sub><span><span>i</span></span></sub> 的奖励，通过基于规则的验证器进行评估，以缓解奖励博弈问题。

  

2)基于规则的奖励机制

  

首先训练过程中，在prompt中明确要求模型将其最终答案输出在\\boxed{ } 标签内，以确保答案可被清晰提取。

  

然后，对框内答案采用双向子字符串精确匹配策略。对于每条 rollout 轨迹 o <sub><span><span>i</span></span></sub>,将根据提取出的最终答案y <sub><span><span>ans</span></span></sub> 与真实答案a 的匹配情况获得一个二值准确率奖励 r <sub><span><span>i</span></span></sub> ∈{0,1}，即：若 y <sub><span><span>ans</span></span></sub> 包含 a作为子字符串，或 a包含 y <sub><span><span>ans</span></span></sub> 作为子字符串，则奖励为 1，否则为 0。形式化地，奖励计算方式如下：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

3)训练方案  

  

为实现通过强化学习提升模型的长上下文推理能力的同时保留保留模型在一般短上下文任务上的推理能力的训练目标，我们构建了一个混合数据集，训练数据的来源、输入上下文长度及任务难度如表1所示，并采用 **多阶段强化学习训练策略** 。

  

*表1 LoongRL 训练所用混合数据集的构成与统计信息*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

- 预热阶段（Warm-up）：首先在不包含通过 KeyChain构建数据的混合数据集上训练一个 epoch。该阶段有助于模型在较简单任务上提升检索与基础推理能力，确保后续训练的稳定性。
- 第一阶段（ **引 入 KeyChain 增强** ）：在预热后引入 KeyChain 构建的数据，逐步提升任务难度。此阶段促使模型学会有效规划、从干扰密集的长上下文中精准检索信息，并将证据整合为连贯的推理链。
- 第二阶段（ **聚焦难题训练** ）：在第一阶段结束后，使用当前最优检查点对每个样本生成八条 rollout 轨迹。若某样本在所有轨迹中均被正确解答，则将其从训练集中剔除，仅保留约 30–40% 的困难样本子集。
	  
	后续强化学习仅在此子集上进行，集中优化模型对难题的处理能力，提升训练效率，同时避免过拟合现象。

  

***02***

**评估**

  

实验团队对 Qwen2.5-7B-Instruct 和 Qwen2.5-14B-Instruct 两个模型进行了 LoongRL 训练，并与多个前沿大模型进行对比，结果如表2和表3所示。对其进行分析，得出以下四个关键结论：

  

*表 2 LoongRL 与前沿大模型在长上下文推理及通用短上下文任务上的性能对比。*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

*表 3 LoongRL 与前沿大模型在长上下文推理任务上的性能对比*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

**（1）小规模模型 实现强竞 争力的长上下文推理能力**

  

如表2所示LoongRL 使 Qwen2.5-7B-Instruct 和 Qwen2.5-14B-Instruct 的平均性能分别提升了 23.5% 和 21.1%。相比之下，R1-distilled Qwen 系列模型在 14B 规模下仅提升 11.8%，7B 规模下性能反而下降 17.7%；QwenLong-L1-32B 的平均提升也仅有 4.6%，效果有限。 **值得注意的是，LoongRL-7B 的表现甚至以 +2.3% 的优势超越了 QwenLong-L1-32B** ，充分证明：通过我们的方法，小规模模型亦可超越大规模基线模型。

  

表3汇总了 LoongRL 与当前先进模型在长上下文推理任务上的性能对比。LoongRL 在显著更小的模型规模下实现了前沿水平的长上下文推理能力。在 14B 规模下，LoongRL 将模型性能提升至 74.2， **已接近甚至媲美 o3-mini（74.5）和 DeepSeek-R1（74.9）等更大规模、经过大量训练的先进模型** 。

  

**（2）短上下文训练，却能更好泛化至长上下文**

尽管训练时仅使用了 16K 长度的输入上下文，但模型学习到的推理模式能够有效泛化至更长的上下文。这得益于 KeyChain构建的数据的引入，它促使模型习得“规划–检索–推理–复核”的思维模式。

  

如表3 所示，LoongRL-7B 和 LoongRL-14B 在更长上下文的推理与检索任务上均取得显著提升，超越了在更长上下文上训练的 R1-distilled 系列模型和 QwenLong-L1-32B。在 RULER 基准上，其他基线模型随着上下文长度增加性能急剧下降，而我们的模型始终保持强劲表现，表明 **所学习到的推理模式具有高度的长上下文迁移能力** 。

  

**（3）近 乎无损的短 上下文推理能力保留**

表2 显示LoongRL 有效保留了基础模型的在短上下文推理与通用任务上核心能力。在 MMLU 上，LoongRL 带来了2.8%和1.1%的增益。相比之下，R1-distilled 模型和 QwenLong-L1-32B 均出现性能下降。在指令遵循能力方面，R1-distilled 模型表现严重退化，而 LoongRL 仅出现轻微下降。在数学推理任务中，LoongRL仍稳定保持了基础模型的数学能力。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*图3 检索能力对比图*

  

**（4）长上下文检索能力显著提升**

  
研究团队使用“大海捞针”（Needle in a Haystack）基准评估不同方法的信息检索能力如图 3 所示。LoongRL 显著提升了基础模型的检索能力， **在所有深度上均实现了 100% 的准确率** 。其他方法则表现受限：R1-Distill-7B 在超过 20K 长度后无法有效检索，QwenLong-L1-32B 也未能完全通过该测试。

  

这表明 LoongRL 不仅增强了推理能力，也显著提升了模型在长上下文中定位关键信息的能力。

  

**消融实验**

  

如图4(c,d)所示，平均响应长度在训练过程中稳步增加。图4(a,b)展示了长上下文推理准确率，其在每个阶段持续提升，表明了多阶段强化学习方法的有效性。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*图4 强化学习训练过程中长上下文推理准确率与训练响应长度的变化情况*

  

*表4 对 KeyChain 构建的数据有效性消融实验*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

如表4 所示，使用常规问答数据的强化学习性能提升较小，而引入KeyChain构建的数据则实现了显著提升，达到了前沿水平的表现。

  

*表5 在7B模型上对不同答案验证器的消融实验*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

智猩猩AI

向上滑动看下一个