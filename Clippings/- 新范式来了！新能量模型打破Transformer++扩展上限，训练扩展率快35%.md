---
title: "新范式来了！新能量模型打破Transformer++扩展上限，训练扩展率快35%"
source: "https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&chksm=856f52bff38dc4156f501273e44fb893c44ee163e7c75fa902d257eaf4c422fa51a388ac0dcd&idx=2&mid=2650978033&sn=35a858e5c748aeb9e74b851b1b818a2c#rd"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-07-08
description: "下一代大模型范式出现了！"
tags:
  - "能量模型"
  - "Transformer"
  - "无监督学习"
abstract: "弗吉尼亚大学等机构的研究者提出了一种基于能量的Transformer模型（EBT），通过无监督学习实现系统2思维，在训练和推理阶段均展现出优于传统Transformer++的性能。"
---
*2025年07月07日 12:48*

机器之心报道

**机器之心编辑部**

> 是否可以在不依赖额外监督的前提下，仅通过无监督学习让模型学会思考？ 答案有了。

  

在心理学领域，人类思维通常被划分为两种不同类型：系统 1（快速思维）和系统 2（慢速思维）。

  

当面对复杂问题如数学运算、多步骤推理等任务时，系统 2 思维（System 2 Thinking）显得至关重要。然而，当前的大语言模型可能在适合系统 1 思维的任务上表现良好，但在需要系统 2 思维能力的任务方面仍存在明显不足。

  

因此，很多研究者开始对系统 2 思维展开研究，这推动了 o1、R1、Grok3 和 Claude 3.7 Sonnet 等基础模型的崛起。

  

但据公开训练资料（特别是开源模型 R1）显示，这些模型采用的强化学习训练方法仅适用于答案可通过规则化奖励验证的领域（如数学和编程），这种局限性导致其适用范围狭窄。

  

另一方面与人类系统 2 思维类似的推理时计算，近期成为提升模型性能的热门方法。

  

然而，现有方法存在三大局限性：模态依赖性（如仅适用于文本）、问题依赖性（如局限于数学 / 编程等可验证领域），或需要额外监督训练（如验证器或可验证奖励机制）。

  

因此，来自弗吉尼亚大学、亚马逊 GenAI、斯坦福大学、哈佛大学的研究者探讨了这样一个问题：「能否泛化这类系统 2 思维方法，开发仅通过无监督学习就能自主思考的模型？」

  

答案是肯定的。

  

具体来说，该研究训练了一类新的能量模型 —— 基于能量的 Transformer（Energy-Based Transformers, EBTs） ，它可以为每一对输入和候选预测分配一个能量值（即非规范化的概率）； 然后从一个随机初始化的预测开始，通过梯度下降不断优化，直到找到最低能量的预测； 这一优化过程就模拟了思考过程。与传统 Transformer 仅单次前向推理不同，EBT 允许每个预测思考多步。

  

这一建模方式使得系统二思维能够在无监督学习中自然涌现，从而具备跨模态、跨任务的通用性。

  

在离散模态（如文本）和连续模态（如图像）中，本文发现 EBT 在训练过程中比主流的 Transformer++ 方法具备更快的扩展速度 —— 在数据量、批次大小、参数规模、FLOPs 和网络深度等方面， EBT 的扩展速率最高可提升 35% 。

  

在推理阶段，通过引入系统二思维（即增加计算量）， EBT 在语言任务中的性能提升比 Transformer++ 高出 29% 。

  

在图像去噪任务中，EBTs 也优于扩散 Transformer（Diffusion Transformers），且所需的前向传播次数更少。

  

此外，本文还发现，当处理分布外数据时，引入系统二思维的 EBT 带来的性能提升更为显著；即便在预训练效果相同或更差的情况下，EBT 在大多数下游任务上的表现仍优于现有模型，表明其 具备更强的泛化能力 。

  

因此，EBT 为扩展模型的学习能力与思维能力提供了一种极具前景的新范式。

  

![image.png](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWicHpceoR3S0ic3gibNmnvTxwq1sXIqjzHfp82aBTUNvn9cw8p0Rd1YHScNG7SxgRx2X3hAF76H1VzDw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

  

- 论文地址：https://arxiv.org/pdf/2507.02092
- 论文主页：https://energy-based-transformers.github.io/
- 论文标题：Energy-Based Transformers are Scalable Learners and Thinkers

  

基于能量的 Transformers (EBT)

  

能量模型（EBMs，Energy-Based Models）背后的核心思想是：能量越低的配置，其概率越高、彼此之间越兼容；而能量越高的配置，其出现的可能性越低、彼此之间越不协调。

  

更具体地说，EBM 的目标是学习一个能量函数（即将输入映射为一个标量能量值；在本文中，能量函数就是整个神经网络本身），这个函数会为正确或理想的配置（例如真实数据点）分配较低的能量，而为错误或不理想的配置（例如噪声）分配较高的能量。

  

例如，如果给定的上下文是一段狗奔跑着去接飞盘的视频，那么高能量的延续可能是一段狗在啃玩具的视频，而低能量的延续则可能是狗成功接住飞盘的片段。狗接住飞盘的场景与前面的上下文更为契合，因此对应的能量更低。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

在这些 EBM 中，思考过程可以通过从一个初始的（随机的）预测开始，并通过梯度下降不断最小化其能量来优化这个预测（如上图所示）来实现。

  

为了实现高度可扩展性，本文设计了一种结合 Transformer 架构和可扩展训练算法的特定类型的能量模型，称为 EBT。 EBT 具备高效的训练性能、良好的稳定性以及并行处理能力。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可扩展的 EBM Thinking

  

本文发现有三种关键的能量曲面正则化技术在训练过程中至关重要，它们能够有效确保所学习到的能量曲面具有足够的平滑性与凸性，从而使模型在训练阶段具备强大的思考能力。

  

首先，本文发现重放缓冲区（replay buffer）有助于模拟更长的优化轨迹，使得能量 landscapes 在其最小值附近得到良好定义。

  

其次，一种 Langevin 动力学变体（随机噪声），被发现有助于鼓励能量 landscapes 的探索。

  

第三，通过随机化梯度下降步长 α 和优化步数，改变通向预测解决方案的路径，显著提高了泛化能力。

  

这些技术共同提高了模型的系统 2 思维能力，这一点通过表 2 中的消融实验得到了证实。

  

EBT 架构

  

Transformer 在众多领域中展现出卓越性能，其包括三大优势：高度可并行化、训练过程稳定性，以及良好的可扩展性。

  

而 EBM 在这三个方面一直面临挑战，因此，Transformer 架构为提升 EBM 的可扩展性提供了理想的基础。

  

为推动 EBM 范式的发展，本文引入了 EBT，即专为能量模型设计的 Transformer 架构实现。本文设计了两种变体：

  

- 一种是仅使用解码器的 EBT，受 GPT 架构启发，适用于自回归建模；
- 另一种是双向 EBT，在序列中使用双向注意力机制，支持 infilling 和掩码建模等任务。

  

实现细节可以参考 C.3 节。

  

实验及结果

  

本文实验关注两类核心结果：

  

- 首先是学习的可扩展性，即模型拟合预训练数据的速度，这也是预训练研究中的标准评估方式；
- 其次是思考的可扩展性，即随着系统 2 思维能力的增强，模型性能的变化趋势。

  

与模型学习速度相关的规模化趋势，通常被称为扩展律（Scaling Law），是比较难以测量的。

  

最近一项调查发现，观察到的扩展率取决于多种实现细节和测量维度，往往导致多个不同的结论。

  

因此，为了尽可能全面地确定 EBT 与 Transformer++ 的扩展方式，该研究针对六个不同测量维度 —— 包括数据、批处理大小、深度、参数、FLOPs，以及嵌入维度。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 4：语言学习扩展性 —— 数据、批大小和深度。

  

该研究对比了 Transformer++ 方法与 EBT 模型在预训练阶段的可扩展性表现，考察维度包括训练数据量、批大小及模型深度。

  

结果表明， 在上述所有维度上，EBT 的扩展能力均显著优于 Transformer++， 显示出更高的数据利用效率，并表明其在泛化能力方面具有潜在优势。

  

此外，EBT 在模型深度上的扩展性能提升，亦为其在推理任务中的表现提供了可能性支持。

  

综上结果表明，若这一扩展趋势持续存在，则在基础模型所需的数据规模下， EBT 有望全面超越 Transformer++ 模型。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 5：语言学习可扩展性 —— 参数、FLOPs 和宽度。

  

Transformer++ 方法与 EBT 在模型大小（参数）、计算（FLOPs）和宽度（嵌入维度）上的预训练扩展性比较。EBT 在 FLOPs 和参数扩展性上略微优于 Transformer++，成为首个在不修改分词器的情况下实现更高扩展率的方法。结果表明，随着规模的增加，EBT 在参数和 FLOPs 效率方面作为预训练范式具有很高的潜力。

  

在所有测量维度上，EBT 的扩展性能始终优于 Transformer++ 方法（即具有更高的扩展率），并成为首个在不更换分词器的前提下实现这一突破的模型。

  

这些结果表明，与 Transformer++ 方法相比， EBT 在数据效率、批大小效率、参数效率、深度效率和计算效率方面都更高。

  

因此，在使用规模扩大 1,000 倍的数据和参数量扩大 1,000 倍的模型训练现代基础模型的情境下，预期 EBT 的预训练性能将显著优于 Transformer++ 方法。

  

在已有学习结果的基础上，该研究进一步探讨了 EBT 模型在推理阶段的思考能力。研究发现，EBT 的思维能力在足够大规模的数据训练下开始显现。鉴于资源限制，该研究主要在小规模模型（但训练数据量充足）上开展相关思维能力实验。

  

该研究从两个维度评估模型的「思考能力」：一是延长思考时间，即增加优化步数；二是自我验证，即生成多个候选预测，并从中选择能量最小的预测结果。

  

在表 2 中，通过消融实验验证了该研究提出的能量 Landscape 正则化技术（Energy Landscape Regularization techniques）在 BigBench Dyck Languages 基准测试的分布外数据上提升系统 2 思维能力的有效性。

  

实验结果表明，当结合延长思考和自我验证机制时，应用全部正则化技术可以获得最优的系统 2 思维表现。

  

此外，实验还发现：步长随机化是关键因素之一 —— 若移除该机制，模型的思维能力几乎完全丧失；而关闭 Langevin 动力学则会削弱组合性能，但在无自我验证条件下反而表现更佳，体现出性能与计算资源之间的权衡关系。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

表 2：系统 2 思维消融实验。

  

Thinking Longer 指更多优化步骤，Self-Verification 指优化多个预测并选择最佳结果。加粗部分突出显示默认系统 2 超参数，利用所有在 3.3 节中描述的能量 Landscape 正则化技术。

  

这种配置在 Thinking Longer 和 Self-Verification 时性能最佳。移除正则化，如 Langevin 动力学，会导致更少的能量 Landscape 探索，从而在牺牲 Self-Verification 性能的情况下提升单路径性能（Thinking Longer）。

  

在验证了上述能量 Landscape 正则化技术的重要性后，该研究进一步分析了 EBT 模型在思考能力方面的可扩展性。结果带来了两个主要发现：

  

首先，如图 6 (a) 所示，EBT 模型通过增加前向传播次数（即延长思考时间）可实现高达 29% 的性能提升，而 Transformer++ 在相同条件下的性能几乎没有任何提升。

  

这一现象验证了传统的前馈式 Transformer 无法根据每个预测任务动态分配额外的计算资源，因此也就无法通过「延长思考时间」来提升每个 token 的预测性能。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 6：EBT 思维分析。

  

其次，如图 6 (b) 所示，EBT 的「思考能力」具有良好的可扩展性。具体而言，随着训练时间的增加，EBT 从自我验证中获得的性能提升也在持续增长：自我验证带来的增益从原先的 4%–8% 提升至 10%–14%。

  

这表明，若将 EBT 模型扩展到与当前主流基础模型相同的训练规模（例如 Llama3 所使用的 15 万亿 tokens，约为当前数据规模的 1000 倍），其自我验证机制所带来的性能提升将更为显著。

  

最后，该研究可视化了 EBT 在预测 token 时对不确定性的表达能力。结果表明：对于预测难度较低的 token（如 the 或 but），EBT 能更快地优化至较低能量；而对于预测难度较高的 token（如 fox 或 problem），其对应的能量更高，且在多个步骤中未能收敛。

  

这说明在预训练过程中，EBT 能够学习并捕捉 token 预测难度的不确定性，从而实现对系统 2 中方面 2 的有效建模。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 8：文本中的不确定性学习结果。

  

EBT 模型在无任何显式监督的情况下，能够自动学习在不同文本 token 上的不确定性差异。例如，在图 (a) 和 (b) 中可以观察到，诸如 is、a、but 和 the 等简单 token 在推理阶段的优化过程中（即「思考」步骤）表现出较低的能量值，表明模型对此类 token 的不确定性较低。相比之下，诸如 quick、brown、research 和 problem 等难以预测的 token 在多个优化步骤中具有更高的能量，且能量难以收敛，说明模型对这些 token 的预测存在更高的不确定性。

  

鉴于人类的系统 2 思维与在新场景中的泛化能力密切相关，该研究设计了一组实验，旨在直接评估 EBT 模型的系统 2 思维机制对泛化能力的影响。

  

如图 7 所示，该研究可视化了 EBT 在多个数据集上的表现，这些数据集具有不同程度的分布外（OOD）偏移，该偏移通过下游任务困惑度与预训练困惑度的比值进行量化。

  

实验结果显示出明显的线性趋势：随着数据的分布偏移程度增加，思考机制带来的性能提升也越显著。因此，这一发现表明，EBT 的「思考」优势并非在所有数据上均匀表现，而是随着分布偏移程度的增强而增强，凸显了「思考」机制在跨分布泛化任务中作为关键能力的作用。

  

这一发现亦与心理学中的观察一致：人类在应对复杂的分布外任务时，通常依赖于更为深度和刻意的系统 2 思维过程。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 7：OOD 思考性能。随着数据变得越来越 OOD，思考带来的性能提升更加显著，呈现大致线性的趋势。

  

由于已在图 4 和图 5 中验证了 EBT 模型相较于 Transformer++ 拥有更优的扩展性，因此有理由推测，EBT 在大规模训练条件下也可能在下游任务中表现更佳。

  

为验证这一假设，该研究对训练设置完全相同的模型进行了比较，其中 EBT 模型在预训练阶段的困惑度略高于 Transformer++。然而，如表 3 所示，尽管 EBT 的预训练困惑度稍差，但其在大多数下游任务上的困惑度更低（即性能更优），表明其具有更强的泛化能力，尤其是在应对分布外（OOD）数据方面表现更为突出。

  

结合此前关于学习可扩展性的优势结果，以及已有研究表明，更好的预训练表现通常会转化为更优的下游任务性能，上述实验证据共同表明，在大规模训练情境下，EBT 会全面超越 Transformer++。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

表 3：语言模型任务泛化比较。

  

尽管在预训练阶段困惑度略高，EBTs 在下游任务上的困惑度通常低于 Transformer++。这表明 EBT 比 Transformer++ 泛化能力更强。此外，由于 EBT 在预训练阶段比 Transformer++ 扩展性更好（图 4），这些发现表明 EBT 在基础模型规模上会优于 Transformer++。

  

图 9 展示了嵌入维度（embedding dimension）和非嵌入参数量（non-embedding parameter count）两个维度上的扩展性结果，这两个维度表现出最为线性的扩展趋势。实验结果表明，尽管 EBT 模型在初始阶段的损失值更高，但其扩展速度比 Transformer++ 快超过 33%。这一发现表明，在基础模型规模下，EBT 会获得显著优于 Transformer++ 的性能表现。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 9：视频学习可扩展性 —— 宽度与参数。在 Something Something V2（SSV2）数据集上达到的最小验证损失。

  

虽然 EBT 在较小规模时验证损失高于 Transformer++，但扩展率提高 33% ，表明在拥有数百亿参数的基础模型规模上，EBT 的表现将远优于 Transformer++。值得注意的是，相对于参数数量，嵌入维度的扩展行为更接近线性，这可能是嵌入维度成为图像表示的瓶颈所致。

  

为进一步验证上述观点，该研究在图 11 中可视化了 EBT 模型在预测视频帧时的能量变化结果。实验结果表明，EBT 能够有效学习并表征预测过程中的不确定性：在视频的早期帧中，由于画面中尚未出现主要物体，模型预测的能量较高（即不确定性较强）；随着场景中的主要物体逐渐显现，EBT 对后续帧的预测能量显著降低，表明模型不确定性随之减少。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 11：视频结果中的学习不确定性。与认知方面 2 一致，EBT 能够在没有监督的情况下，在连续视频帧中表达不确定性。

  

在视频开始时，不确定性较高（高能量），因为帧大部分是空的，场景高度不可预测。当一件蓝色服装被放置到帧中时，不确定性降低（低能量），反映了场景的可预测性增加。当蓝色服装从场景中移除时，不确定性再次增加，表明不可预测性恢复到较高水平。这种能力在没有离散化方案的传统前馈 Transformer 的连续空间中实现起来要困难得多。

  

表 4 展示了 EBT 与 DiT 模型在图像去噪任务中的性能对比结果。观察到，在分布内与分布外图像去噪的多个评价指标上，EBT 均优于 DiT，峰值信噪比（PSNR）最高提升可达 3.5。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

表 4：图像去噪与分类对比。

  

在图像去噪方面，EBTs 在分布内（in-distribution）和分布外（OOD）数据上的峰值信噪比（PSNR）以及均方误差（MSE）上均显著优于 DiT ，同时使用减少 99% 的正向传递次数。

  

这表明 EBT 比 DiT 泛化能力更强，同时计算量更少。在图像分类方面，EBT 的表现也优于 DiT ，准确率提高了 10 倍 ，这表明 EBT 学习到的图像表征更好，比 DiT 更理解图像。

  

该研究还在图 12 中绘制了不同前向传播次数（即函数评估次数，Number of Function Evaluations, NFEs）下的模型性能曲线。结果表明，EBT 在使用比 DiT 少 99% 的去噪步骤的情况下，仍实现了更优的去噪效果，并且其系统 2 思维的扩展速率也明显高于 DiT。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 12：图像去噪任务中的思考可扩展性分析。

  

该研究比较了 EBT 与 DiT 在图像去噪任务中，在不同前向传播次数下的表现。结果显示，EBT 仅需 DiT 所用前向传播次数的 1%，即可达到相当甚至更优的峰值信噪比（PSNR）水平。

  

此外，随着前向传播次数增加，EBT 在 PSNR 上的性能提升速率远高于 DiT。这一结果表明，在处理分布外（OOD）图像去噪任务时，EBT 的思考能力明显优于 DiT。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 10：定性 OOD 图像去噪。

  

图 10 展示了 EBT 与 DiT 基线模型在分布外图像去噪任务中的视觉效果对比。结果进一步表明，EBT 所生成的去噪图像在视觉质量上明显优于 DiT，同时计算成本更低。

  

在推理阶段，EBT 模型在每使用 1 次去噪步骤的情况下，便可达到与 DiT 需执行 100 次去噪步骤相当甚至更优的效果。整体而言，EBT 所生成的去噪图像质量更高，图像更清晰，模糊程度明显低于 DiT 去噪结果。

  

了解更多内容，请参考原论文。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

© THE END

转载请联系本公众号获得授权

投稿或寻求报道：liyazhou@jiqizhixin.com

继续滑动看下一个

机器之心

向上滑动看下一个