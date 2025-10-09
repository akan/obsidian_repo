---
title: "CMU&斯坦福提出Reasoning新范式！自己找“窍门”，教会LLM抽象Reasoning"
source: "https://mp.weixin.qq.com/s?__biz=MzI3ODgwODA2MA==&chksm=eac0badbc30cd4aaa79aca6863650837b97ba6dfd366ea6a38f78e41e6b1a2800c5b8719e12f&idx=1&mid=2247544296&sn=0e82be52695a1a09afc0ba71f651a414#rd"
author:
  - "[[编辑部]]"
published:
created: 2025-10-09
description: "大型语言模型在解决复杂推理问题时，常常陷入“思维链过长却无效”的困境。模型可能会反复验证错误路径，而不是探索新的策略，导致推理效率低下。"
tags:
  - "推理抽象"
  - "两玩家强化学习"
  - "性能提升"
abstract: "CMU和斯坦福的研究提出了一种让大型语言模型自主发现并利用推理抽象来提升复杂问题解决能力的新方法。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/gKaxjIx6baiac8RO11osOR3kg75sW5EINf2zfD3ZVCy0MbibBUicqU7pVPofKic4pwhvQD2YqElYn8nwKy75TeGc5A/0?wx_fmt=jpeg)

Original 编辑部 [深度学习自然语言处理](https://mp.weixin.qq.com/) *2025年10月09日 14:52*

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baiac8RO11osOR3kg75sW5EINiaiaEw2Aed1HZFw5ibHLGhOeOnP0njd5X2uOv4FIicUegSoQQGUY8uB0iaQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0) **让模型自己发现并利用“推理抽象”** ——一种简洁的自然语言提示，概括了解决特定问题的关键步骤或常见陷阱。例如，在数学题中，抽象可能是“使用对数计算位数”或“避免分母为零的错误”。这种方法不仅提升了模型在数学、逻辑等任务上的表现，还显著增强了其探索多样化解决方案的能力。论文通过一种名为 **RLAD** 的两玩家强化学习框架，训练模型自动生成抽象并据此推理，实现了在多个基准测试上的显著性能提升。接下来，我们将深入解析这一研究的动机、方法、实验和未来展望。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baiac8RO11osOR3kg75sW5EINXmEVd6g7m7s0C27NFhVlVBwUHCRMv8cU02QOHWNfLqwyTpJ2ef1HEA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

- 论文：RLAD: Training LLMs to Discover Abstractions for Solving Reasoning Problems
- 链接：https://arxiv.org/pdf/2510.02263

## 研究动机与问题定义

当前，基于强化学习的思维链训练主要鼓励模型延长推理步骤，但这也带来了问题：模型容易陷入“深度过度、广度不足”的陷阱。具体来说，模型会执着于某一条推理路径，不断微调或验证，却忽略了其他可能更有效的策略。这种现象被称为“思维退化”或“欠思考”。例如，在解决数学问题时，模型可能反复检查计算错误，而不是尝试不同的公式或方法。

论文提出 **推理抽象** 作为解决方案。抽象是压缩后的程序性或事实性知识，用自然语言描述，如“使用勾股定理”或“注意单位转换”。它们像“考试提示”一样，引导模型跳出固定思维，探索新路径。抽象的核心价值在于：

- **提升探索效率** ：通过总结成功或失败的经验，抽象帮助模型快速识别有效策略。
- **促进策略复用** ：抽象可以在类似问题中重复使用，减少重复计算。

论文的目标是训练模型具备两种能力：

- **自动提出抽象** ：给定问题，模型能生成多个相关抽象。
- **利用抽象推理** ：模型能根据抽象生成解决方案，并因此获得更高准确率。

## 方法概述：RLAD训练范式

RLAD的核心是一个 **两玩家强化学习游戏** ，涉及两个模型：

- **抽象生成器** ：接收问题，输出一个或多个抽象。
- **解决方案生成器** ：接收问题和抽象，输出解决方案。

训练过程分为三个阶段：

1. **预热启动** ：使用监督微调初始化抽象生成器，数据来自强模型生成的抽象-问题对。
2. **联合RL训练** ：两个模型通过协作优化奖励。抽象生成器的奖励基于解决方案生成器的成功率；解决方案生成器的奖励基于最终答案的正确性。
3. **奖励设计优化** ：为避免模型走捷径，论文引入了奖励掩码——当解决方案生成器不依赖抽象时，奖励为零，强制其利用抽象。
![RLAD训练流程](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baiac8RO11osOR3kg75sW5EINZic4UVusjy92F8Vx1httqtcv02yKEbdWAiaOmIuiaBmDqvJSFPibawYGEA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

RLAD训练流程

RLAD训练流程：抽象生成器提出抽象，解决方案生成器基于抽象生成回答，奖励根据回答正确性分配。

## 核心方法细节

**抽象生成** ：初始抽象通过总结多个解决方案尝试获得。例如，使用强模型分析失败和成功案例，提炼出共同模式或错误。论文使用o4-mini生成抽象，并过滤掉那些“泄露答案”的抽象（确保抽象只提供方法，不直接给出答案）。

**RL奖励设计** ：奖励函数是RLAD的关键。定义如下：

- 对于解决方案生成器，奖励基于答案正确性： 这里， 是问题， 是抽象， 是生成的解决方案， 是正确答案。如果未使用抽象，奖励为零，迫使模型依赖抽象。
- 对于抽象生成器，奖励是解决方案生成器在抽象条件下的平均成功率： 这个公式鼓励抽象生成器提出能最大化解决方案成功率的抽象。

**预热启动** ：抽象生成器通过SFT学习生成高质量抽象。数据来自强模型生成的抽象，并经过筛选——只保留那些能提升解决方案性能的抽象。

## 实验验证与结果

论文在多个推理任务上评估RLAD，包括数学竞赛题和ARC-AGI逻辑谜题。

**主要性能对比** ：

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baiac8RO11osOR3kg75sW5EINibxvLQ1k2EGsx1OZXcnQrZaEvjT7EicNpwuSLFj992rniaDIkGd9ubJ5g/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

该表显示，在AIME 2025、DeepScaleR Hard和AMC 2023基准上，RLAD在“使用抽象”和“不使用抽象”设置下均优于基线方法。例如，在AIME 2025上，RLAD的准确率比基线提升约44%。

**深入分析** ：

- **弱到强泛化** ：即使抽象生成器较弱，其抽象也能帮助强解决方案生成器提升性能。例如，o4-mini在抽象条件下准确率从84.77%提升至90.00%。
- **计算权衡** ：论文研究了在固定计算预算下，如何分配资源生成抽象 vs. 解决方案。
	![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baiac8RO11osOR3kg75sW5EIN1Xviac2gZthHpRDxzskL4Zyg9FiaqUkTKiaCyn4oeStj8qlwX6gEAXRYg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)
	该图显示，当预算充足时，增加抽象生成比增加解决方案采样更有效。例如，在AIME 2025上，生成多个抽象并各生成少量解决方案，比生成大量解决方案但不使用抽象性能更好。
- **抽象遵循行为** ：
	![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baiac8RO11osOR3kg75sW5EINIVo41qfH2EEshGhQYWkGIZuwS3JuH21kAAz7V88icAnCp8oZdSejnLA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)
	该图表明，解决方案生成器能有效遵循抽象。当给定抽象时，解决方案的语义多样性更高，且更贴近抽象指导的策略。

## 讨论与未来工作

论文的核心贡献是：

- 提出了 **推理抽象** 的概念，并证明其能提升模型推理能力。
- 设计了 **RLAD训练范式** ，通过两玩家RL联合优化抽象生成和解决方案生成。
- 展示了 **计算效率** ：在测试时，生成多样抽象比单纯增加思维链长度更有效。

**局限性** ：目前主要评估数学推理，未涉及开放域推理。此外，训练单一模型同时处理抽象生成和解决方案生成时，模型容易丢失抽象生成能力。

**未来方向** ：

- 扩展至开放域推理，如对话或创作任务。
- 研究如何训练单一模型同时生成和使用抽象。
- 探索抽象如何提升模型的泛化能力。

## 结论

《RLAD: Training LLMs to Discover Abstractions for Solving Reasoning Problems》通过引入推理抽象和两玩家RL训练，为大型语言模型的推理能力提升开辟了新路径。论文不仅在多类基准测试中验证了方法的有效性，还深入分析了抽象在引导模型探索中的核心作用。未来，这一方法有望扩展到更广泛的推理任务，推动AI向更高效、更智能的方向发展。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baiaWmgCyFvlO6o9nbibLsgUz4bSBG2wsKYm0ZBtgib7BFlvgB1UjGl0wLicsmR7giaso7nBibOWDG8FazKA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

深度学习自然语言处理

向上滑动看下一个