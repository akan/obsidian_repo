---
title: "AGI 新技术路线：下一代稀疏注意力机制 Monte Carlo Attention 开源"
source: "https://mp.weixin.qq.com/s?__biz=Mzg4NDQwNTI0OQ==&chksm=cebc7dbaad89177c65d9326482a4a87cea714b084a4904c37c89c2e6960c933bb336e9bdec99&idx=1&mid=2247588415&sn=42fe75aaf5307e6ac3d425cdac31ad7d#rd"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-11-10
description: "这样的新型注意力机制，是为了实现宇宙尺度科学建模和模拟的上下文长度要求。"
tags:
  - "稀疏注意力"
  - "块间代表"
  - "线性复杂度"
abstract: "超对称技术公司开发了Monte Carlo注意力机制，通过二进制块编码和块间代表交流机制实现了线性复杂度，为宇宙尺度建模提供了有效的注意力方案。"
---
*2025年11月10日 09:00*

作者 | 超对称技术  

出品丨AI 科技大本营（ID：rgznai100）

超对称技术公司在新版基座模型 BigBang-Proton 使用的 Monte Carlo 注意力，在二进制块编码（Binary Patch Encoding）技术上，用巧妙的块间代表交流机制（Inter-Patch Delegation Mechanism），实现了线性复杂度，兼具了传统基于 QKV 调整的稀疏注意力、状态空间和线性注意力的优点，且规避其缺点，为宇宙尺度的建模探索有效的注意力方案。

![Image](https://mmbiz.qpic.cn/mmbiz_png/VeJKXItpwPUzKbub0MRKx61l9dsOUESzjzDhfZBnhxnbrWibDlzEwZKIgOEBdfP3ZITCl2ibmdMUUEQD1W8z3ibDA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

物质世界建模的上下文长度

Monte Carlo Attention 是为了解决 BigBang-Proton 框架的理论需求而开发的，尽管实际实现面临硬件约束。推动这一发展的基本假设包括几个关键考虑因素。首先，对于自回归预训练， **二进制块编码** 作为一种原生多模态方法，可以无缝地将所有数字数据格式转换为标准二进制序列，从而对超长上下文长度提出了严格要求。

其次， **理论-实验学习范式** 提供了在预训练期间跨尺度、结构和学科整合来自历史和正在进行的科学实验的实验数据的潜力，这需要远超纯自然语言预训练的上下文长度。最后，在将宇宙视为单一实体的终极场景中，如果能将所有原子（10⁸⁰）的信息转换为用于预训练的单个序列，上下文长度能否达到宇宙尺度？

将复杂物质结构转换为序列的 token（本文用 token 同时指代传统的 BPE token 和二进制块编码中的 patch） 长度估算提出了前所未有的上下文长度需求。对于包含多组学数据和细胞结构的综合虚拟细胞整合，大约有 10¹⁴ 个原子，每个原子需要 10-20 个 token 来完整表示其位置、键合、相互作用和动态状态信息，总序列长度达到约 **10¹⁵ 个 token** （1 千万亿 token）。

同样，对于涉及格点 QCD 数据的 QCD 建模，包含 ~10⁹ 个构型，每个构型有 10⁸ 个格点和每个格点 ~100 个浮点值，总计 ~10¹⁹ 字节的数据在考虑完整参数和理论描述表示后，转换为约 **10²⁰ 个 token** 。这两种场景都要求上下文长度比当前大语言模型的能力（10¹⁵-10²⁰ token vs. 典型的 10⁵-10⁶ token 限制）高出多个数量级，这需要像 Monte Carlo Attention 这样的新型注意力机制来实现宇宙尺度科学建模和模拟的上下文长度要求。

为了在预训练中扩展上下文窗口，主流大语言模型（如 DeepSeek V3、Qwen3、Llama3）通常采用两阶段训练，先在小部分数据上训一个长上下文预训练阶段，在大部分数据上训短的上下文，将上下文长度从典型的 4096 token 扩展到 128K token。

相比之下，Monte Carlo Attention 无须分阶段训练，通过其块间代表机制实现了理论上无限的上下文长度，从根本上改变了预训练方法。这一突破对现有预训练技术和硬件设计具有深远影响。

首先，传统的批次处理约束得到缓解，因为注意力计算可以跨批次分布，从而能够高效处理超长序列。其次，计算复杂度从 O(L²) 降低到 O(L)，显著减少了收敛所需的训练步数，可能改善损失收敛率和困惑度曲线。第三，通过将上下文长度与 GPU 内存限制解耦，Monte Carlo Attention 能够训练比设备内存容量长多个数量级的序列。

最后，这种方法促进了专门为长序列处理设计的存内计算架构的发展。在不考虑 GPU 内存约束的情况下，该方法可以实现与完整预训练语料库序列长度相匹配的有效上下文长度。这一范式转变需要开发能够支持真正宇宙尺度序列处理的下一代硬件架构。

![Image](https://mmbiz.qpic.cn/mmbiz_png/VeJKXItpwPUzKbub0MRKx61l9dsOUESzv8dhWjxUtgevWGaYU6aDbttLXoUUk6pQOKWhv0Fo0ficxnvo0D9ib33w/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

Monte Carlo 架构

*![Image](https://mmbiz.qpic.cn/mmbiz_png/VeJKXItpwPU0kNDTVcr5ovk58NWAUxtIEibA1tIoibv5r8vKGNDk09icFoq0ibefu1y1Um8VMAJbD5yLoVjlhqYSZA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)*

BigBang-Proton 架构由三个核心组件构成：

1. **Binary Patch Encoding 的 embedding 输入** ：输入词汇表包含 0-255 的字节值和三个特殊 token，总大小为 259。每个输入 token 通过 one-hot 编码转换为 259 维稀疏向量，其中对应 token 索引位置为 1。该 one-hot 向量通过无偏置的线性层投影到维度 D 的稠密嵌入空间，形成最终的 token 嵌入表示。
2. **Monte Carlo Attention** ：利用块间代表机制驱动局部和全局信息交换，使上下文长度随层数呈指数级增长，同时保持线性计算复杂度。
3. 前馈时序卷积网络 (TCN) ：取代 Transformer 中传统的前馈全连接网络，以捕捉局部空间和时间模式。由于 TCN 能够学习位置信息，因此消除了 Transformer 中使用的位置嵌入。

### Monte Carlo Attention

上下文长度定义为 Transformer 单层在一次完整注意力计算中可读取的极限，它与 Transformer 层数的深度无关。Transformer 中的直接信息流被限制在上下文长度内的 token 之间。在预训练中，批次间的信息流依赖于共享权重，而非注意力计算。

相比之下，卷积神经网络（CNN）的感受野随网络深度而扩展。超对称团队受此启发，采用逐层操作来增强所有输入嵌入之间的信息流，甚至跨越批次。Monte Carlo Attention 的关键创新在于每一层中的 **Delegate** 操作，从而实现动态的 token 重组。

![Image](https://mmbiz.qpic.cn/mmbiz_png/VeJKXItpwPU0kNDTVcr5ovk58NWAUxtIKVicFUWDtvKPibxJ2Uk08GmteOQfrvEqY9G1fK1go349VEUoL7yLhoKQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

*图：嵌入向量在块之间被重组。每个块向其他块发送代表，并从其他块接收代表，通过注意力计算进行信息交换。*

### 块间代表交流机制 Inter-Patch Delegation Mechanism

输入嵌入被分组为特定块大小（patch size）的块，这与字节级语言模型（如 BLT、Megabyte、SpaceByte 和 BGPT）中在转换为嵌入向量之前实施分块的方法不同。受代议制政治系统的启发，在每次逐层操作中，由 P 个字节输入组成的每个块会随机（蒙特卡罗方式）或有选择地指定一个字节作为代表 Delegate，与其他块交换信息。在所有块之间的 Delegate 过程之后，每个块最多从其他块接收 P-1 个代表，同时向其他块发送相同数量的代表，而块内的字节数保持不变。注意力计算在每个块内执行，其复杂度为 O(P²)。

每个代表字节包含来自其原始块和接收其他代表的块的上下文信息，然后返回其原始块进行后续的注意力计算。在图所示的 toy model 中，为 3 个块（红色、蓝色和绿色）设置 P=4。12 个字节的序列被重塑为一个 4×3 矩阵，然后转置为一个 3×4 矩阵，再展平回一个 12 字节的序列。这种重组将序列 `[1,2,3,4]` 转换为 `[1,5,9,2]` ，其中字节 1 和 2 来自红色块，字节 5 来自蓝色块，字节 9 来自绿色块。通过 Delegate 和重组，信息在全局范围内流动，而计算复杂度仅取决于块大小的平方。

下图展示了通过逐层块间代表操作，信息流的上下文长度如何增加。将块大小 P 设为 32，序列长度设为 40906，则每个块可以容纳 P-1 个 Delegate 字节用于信息交换，每个 Delegate 包含 P 长度的上下文信息。

当层数深度变大时，经过 N 层后的有效上下文长度的递归关系为：

当 P=32 且 C(0)=0 时，可以计算不同层数的上下文长度。结果如图所示。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图：逐层块间代表操作驱动信息流的上下文长度以 的速度增长，其中 P 是块大小，N 是层数。对于块大小=32，在第一层，信息可达 992，在第二层可达 32736。

Delegate 操作可以形式化地定义为一个包含四个关键步骤的分层过程，这些步骤反映了实际的计算流程。首先，输入序列 被分解为 个块，每个块包含 P 个 token：

其中 表示长度为 的输入序列， 是批次大小， 是隐藏维度， 表示分解为 个块，每个块包含 个 token，且 。

其次，对每个块应用 1×1 卷积操作以生成将被发送到其他块的 Delegate token，并且 Delegate 映射从每个块中选择和分发代表性 token：

其中 表示 Delegate token 组， 表示从第 个块 生成的 Delegate token， 表示从块 中为块 选择的代表性字节。这些 Delegate token 被置换以与原始局部块对齐。

第三，Delegate token 被分发到其他块，并与原始局部 token 连接，形成一个包含局部和全局信息的增强表示：

其中 表示第 个块的增强上下文， 表示从邻近块 接收的 Delegate token 集。

最后，在增强表示上计算自注意力，以促进局部和全局上下文之间的信息交换。标准的自注意力机制可以描述为

其中 Q,K,V 是通过线性投影从增强表示 c 导出的查询、键和值矩阵， 是键的维度。

结合块间代表操作，每层的注意力计算可以形式化地表示为：

其中 表示第 层第 个块的注意力输出， 是 Delegate 操作后第 个块的查询、键和值矩阵。

最终的输出隐藏状态通过局部块表示和重组后的块表示之和计算得出，并使用残差连接，以确保稳定的梯度传播和信息持久性：

其中 表示注意力计算和残差连接后的第 个块的最终输出，Linear 表示注意力计算后应用的线性变换。

块重组变换可以表示为一个双射映射：

每个块内的注意力计算复杂度为：

全局信息流的复杂度为：

其中 是块的数量。

**表：当 P=32 时，不同层数对应的上下文长度**

**![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)**

## 表征退化、循环注意力与稀疏性

标准 Transformer 依赖于完整注意力计算，使输入嵌入能够在预定义的上下文长度内从其他 token 获得表征。Monte Carlo Attention 采用块间代表机制来实现全局表示交换，从而达到超大的有效上下文长度。

然而，这种间接的注意力计算可能导致在迭代表征传播过程中信息退化。为了解决这一局限性，超对称团队引入了 **循环 Monte Carlo Attention** ，通过重复单层操作多次来实现。

- **标准 Transformer**: `Layer₁ → Layer₂ → Layer₃ → ...`
- **循环 Monte Carlo Attention**: `Layer₁ N→ Layer₂ N→ Layer₃ N→ ...`

`![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)`

## 前馈 TCN

替换传统全连接前馈网络，超对称团队提出了一个具有增强模式捕捉能力的时序卷积块（TCN）。TCN 通过堆叠核大小为 K 的一维卷积来实现多尺度处理，从而提取分层的时间特征。

令 表示输入张量。TCN 对该输入应用多层一维卷积。每一层可以表示为：

其中 ， 表示核大小为 K 的一维卷积操作，ReLU 是逐元素应用的激活函数。 这些卷积层的堆叠使网络能够在不同尺度上捕捉分层的时间特征。具体来说，由于连续卷积的累积效应，网络中更深的层可以捕捉更长距离的依赖关系。

此外，所提出的 TCN 保持了局部-全局平衡，当注意力机制处理长距离依赖时，TCN 专注于细粒度的局部模式发现。这是通过在 TCN 架构中应用扩张卷积来实现的，这使得模型能够在不显著增加参数数量的情况下覆盖更宽的感受野。对于扩张因子 d，卷积操作变为：

其中 表示扩张因子为 d 的扩张卷积操作。

值得注意的是，由于 TCN 固有的卷积特性，BigBang-Proton 能够直接从输入序列中学习空间和位置信息，从而消除了传统 Transformer 架构中通常需要的显式位置嵌入。

最后，TCN 块的输出通过残差连接与来自注意力模块的已关注特征相结合：

其中 是 TCN 最后一层的输出， 表示从注意力机制获得的已关注特征。 这种设计确保了模型能够同时受益于注意力机制提供的全局上下文和 TCN 捕捉的细粒度局部模式，从而提升整体性能。

## 与稀疏注意力、状态空间、线性注意力的比较

现有稀疏注意力与 Monte Carlo Attention 之间的根本区别在于其核心计算机制。稀疏注意力方法（比如 NSA 和 MoBA）采用基于选择的机制，通过过滤键值对来降低计算复杂度，即选择 token 子集进行注意力计算。

NSA 利用三种复杂的策略：通过块级聚合进行 token 压缩，通过块级 top-n 识别进行 token 选择，以及滑动窗口机制以保留局部上下文，从而从 N 个 token 中动态构建紧凑表示，通过选择 top-K 子集实现。

MoBA 采用受混合专家启发的方法，将上下文划分为块，并应用 top-k 门控机制进行选择性注意力。相比之下，Monte Carlo Attention 通过块间代表采用基于重组的机制，通过将全局上下文压缩为代表性 token 并在块之间交换，从而在块之间实现间接的信息传播，而不是在选定的 token 之间进行直接注意力。

这些核心机制的差异导致了稀疏注意力方法的关键劣势。首先，稀疏注意力存在选择偏差和信息丢失问题，未被选中的 token 被丢弃，导致忽略全局依赖和协调碎片化，而 Monte Carlo Attention 通过受控的 Delegate 机制保留了关键信息。

其次，稀疏注意力遇到计算瓶颈，需要在选定的 token 之间进行 复杂度的计算，而 Monte Carlo Attention 通过局部 2P 注意力实现了高效的全局交换，具有更优的 复杂度。第三，由于选择约束，稀疏注意力的上下文建模能力有限，而 Monte Carlo Attention 能够实现指数级的上下文长度扩展。

结构化状态空间序列模型（S4）及其后继者（包括 RetNet、RWKV 和 Mamba）是一类将隐藏张量视为状态空间的序列模型，S4 通过结构化线性动力系统（使用对角 A 矩阵）来高效地建模长程依赖，而 Mamba 引入了输入依赖的参数选择，RetNet 则结合了门控机制以增强选择性信息传播。Monte Carlo Attention 与状态空间模型之间的根本区别在于其核心信息流机制。

S4 采用顺序状态传播，信息通过线性递推关系 流动，创建了一个马尔可夫依赖链，限制了每个状态只能直接访问前一个状态。相比之下，Monte Carlo Attention 通过块间代表实现直接的全局信息交换，允许任何块通过 delegate token 重组访问来自任何其他块的信息。

S4 存在固有的局限性，例如由于线性时不变性导致的建模灵活性有限，由有限维状态向量引起的信息瓶颈，通过多步传播捕捉长程依赖的困难，以及对复杂非线性关系建模的表达能力不足。虽然 Mamba 通过输入依赖的参数选择解决了 S4 的一些局限性，引入了选择性状态空间机制 （其中 是动态计算的），但它仍然继承了低秩表示的基本近似误差，并且在状态转换计算期间容易受到数值不稳定的影响。

Monte Carlo Attention 通过在增强的局部-全局上下文中进行精确计算来保持完整注意力的表达能力，从而超越了这些局限性，避免了 S4 的线性时不变性约束和低秩近似相关的精度损失。这种方法能够在保持局部精度的同时实现真正的全局上下文传播，绕过了线性注意力模型和状态空间近似中固有的信息瓶颈，后者为了计算效率而牺牲了表达能力。

作为 S4 模型的一种变体，传统的线性注意力模型通过从根本上进行近似来实现计算效率，但这牺牲了信息保真度。这些方法消除了 softmax 操作，并通过核函数将查询和键映射到隐藏表示，然后通过键和值的右乘积计算注意力，将复杂度从 降低到 (其中 N 是序列长度，d 是矩阵维度)。

TransNormer 进一步通过用归一化操作替代缩放来解决无界梯度问题。然而，与 Monte Carlo Attention 相比，这些方法存在关键局限性。线性注意力方法通过核函数将高维 Q、K、V 矩阵映射到低维特征空间，从根本上损害了表示质量，不可避免地丢失了高阶统计信息和复杂的 token 交互。相比之下，Monte Carlo Attention 在增强的局部-全局上下文中通过精确的自注意力计算保持了完整的注意力表达能力，确保了完整的信息保留。

虽然线性注意力实现了 的复杂度，但这种效率是以有限的全局上下文集成为代价的，因为当序列长度 L 变得极大时，低秩近似无法充分捕捉长程依赖。然而，Monte Carlo Attention 通过其块间代表机制实现了近乎无限的全局信息流，允许有效上下文长度随层数深度呈指数级扩展，同时保持线性计算复杂度。

## 开源链接

- **论文**: https://arxiv.org/abs/2410.00129
- **GitHub**: https://github.com/supersymmetry-technologies/BigBang-Proton
- **Hugging Face**: https://huggingface.co/SuperSymmetryTechnologies/BigBang-Proton

\* 本文为 BigBang-Proton 系列报道第二篇。在后续文章中，我们将带来更多关于其核心技术、前沿应用与未来规划的深度解读，敬请关注 CSDN AI 科技大本营和文章合集。

收录于 BigBang-Proton

继续滑动看下一个

AI科技大本营

向上滑动看下一个