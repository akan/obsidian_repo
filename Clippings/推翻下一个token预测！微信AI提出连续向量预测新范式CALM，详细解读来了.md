---
title: "推翻下一个token预测！微信AI提出连续向量预测新范式CALM，详细解读来了"
source: "https://mp.weixin.qq.com/s/WoIC_4gyrHtXKdMmzltbtA"
author:
  - "[[卜圆]]"
published:
created: 2025-12-08
description: "开辟大模型scaling新维度~"
tags:
  - "连续自回归语言模型"
  - "向量预测"
  - "计算效率"
  - "无似然建模"
abstract: "微信AI团队提出CALM，一种从离散的下一个token预测转向连续的下一个向量预测的新范式，旨在通过提高每个预测单元的语义带宽来显著降低大语言模型的计算开销。"
---
Original 卜圆 *2025年11月6日 16:13*

智猩猩AI整理

编辑： 卜圆

  

大语言模型（LLM）在自然语言理解与生成方面取得了突破性进展，但其巨大的计算开销带来了高昂成本与环境负担。回顾历史，语言模型从早期的字符级建模转向现代的子词分词法，是一次关键演进。字符级模型虽无需分词，但因序列过长导致训练和推理效率低下。子词分词法的成功在于，它通过合并常见字符组合，显著提升了每个文本单元的信息密度，从而缩短了输入序列长度，降低了整体计算负担。 **这一转变 揭 示了一个核心优化原则：提高每个预测单元所承载的语义信息量，是提升模型效率的有效途径。** 更长的、语义更丰富的单元意味着更短的序列，进而减少自回归步骤，直接缓解计算压力。因此，提升模型效率的方向逐渐明朗——即持续增加每个预测单元的语义带宽。

  

然而，当前基于离散token的范式正逼近其理论极限。现代LLM的词汇表规模通常在32,000至256,000之间，单个token所能携带的信息量有限（约15–18比特，如 log₂(32768) = 15）。若要进一步提升语义带宽，词汇表需呈指数级扩张，这将导致softmax层的计算成本急剧上升，成为不可逾越的瓶颈。由此可见， **离散** **表示的本质限制了语义带宽的无限扩展** **。**

  

为此，微信AI 团队提出 **CALM，这是一种从离散的下一个token预测到连续的下一个向量预测的范式转变。** 实验表明， **该方法在性能与计算成本之间取得了更好的平衡，以显著更低的计算成本达到了强大离散基线模型的性能水平。**

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/DPAHibibAl3vTgP5s41LtyVDy5VsnFNjy9PqQKw9uSHeMONnMPCRQ1ia6H3V3ib6Q0P8gDdG0rAgtOEgz78HrpWGibA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

- 论文标题：
	CONTINUOUS AUTOREGRESSIVE LANGUAGE MODELS
- 论文链接：
	https://arxiv.org/pdf/2510.27688
- 项目链接：
	https://shaochenze.github.io/blog/2025/CALM

***01***

**方法**

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*图1 传统逐 词生成方 法与CALM对比图*

  

下面对CALM建模方法进行介绍

  

**（1） 自编 码器**

  

该自编码器用于学习输入序列的低维表示，其过程分为编码和解码两步，旨在为下游的建模任务提供鲁棒的向量表示。

  

- 编码

  

将输入序列 映射为 K 个嵌入向量（embeddings）。每个嵌入向量通过一个逐位置的前馈网络（FFN）独立处理。得到的 K 个隐藏状态随后被展平并由一个线性层压缩： 。这个统一的表示再经过第二个 FFN 和一个线性投影，生成 l 维的潜在向量 z。

  

- 解码

  

解码器的结构与编码器对称。它首先使用一个线性层和一个 FFN 变换 z，得到一个 d 维的隐藏状态，然后通过另一个线性层将其扩展到 Kd 维，并重塑为 K 个隐藏状态的序列。这些状态中的每一个都通过第二个 FFN，然后使用共享的输入嵌入矩阵投影到词汇表的 logits 上。最后，通过对这些 logits 应用 argmax 操作来重建出tokens。

  

该自编码器通过在所有K个token位置上优化标准的交叉熵损失，来最小化重构误差。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

实验验证了该自编码器的高效性。例如，对K=4个词元分组时，仅用l=10维的潜在向量即可实现高保真重构， **token级准确率超99.9%。同时，该自编码器结构简单,隐藏层维度仅为 d = 512，计算开销远小于语言模型 。**

  

尽管该自编码器能近乎完美地重构输入，但发现其生成的向量空间难以有效训练连续语言模型，要使CALM框架可行， **自编码器必须达成另一个关键目标——学习出鲁棒的向量表示 。**

  

采用 三种策略 来获得更鲁棒的向量表示：

  

- **变分 正 则化：**

  

编码器不再将输入块直接映射为向量 z，而是输出一个对角高斯分布的参数（ μ 和 σ），然后从此分布中采样得到： 。这一改变引入了一个新的目标项——KL散度损失，惩罚编码分布偏离标准正态先验 N(0, I) 的程度。因此，总损失函数是重构误差和正则化项的加权和：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

其中 β 是平衡两个目标的超参数（设 β = 0.001）， 为KL散度。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

- **防止 后 验坍缩:**

  

训练变分编码器的一个主要问题是后验坍缩，即某些潜在向量完全退化为标准正态分布，导致其KL散度为零但无法携带有效信息。这些无意义的噪声维度会干扰下游语言模型的训练，造成学习不稳定。研究团队通过为每个维度的KL损失设置一个最小阈值来防止其完全坍缩，目标函数如下：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

其中 是第 i 个维度的KL散度， 是阈值。该方法确保每个维度都积极参与信息重构，从而防止坍缩，促进形成密集且结构化的表示。

  

- **Dropout提升鲁 棒性 ：**

  

研究团队采用了两种互补的Dropout技术来增强自编码器潜在表示的鲁棒性：第一种是在潜在向量z上应用Dropout（p=0.15），迫使其学习冗余编码，以抵御生成模型预测时的微小误差；第二种是对输入词元进行随机屏蔽（p=0.15），迫使模型利用上下文信息推断缺失内容，从而生成更具语义丰富性的潜在表示。

  

综合上述技术，研究团队构建了一个强大且鲁棒的自编码器。例如，当K=4时，使用l=128维的潜在向量，以冗余方式编码信息。在施加较强（≈0.3I）的高斯噪声扰动后，解码器仍能保持超过99.9%的token级准确率。这种兼具高保真与高鲁棒性的向量表示，为后续CALM的学习奠定了坚实基础。

  

（2）无似然的语言建模  

  

研究团队构建的自编码器建立了离散词元块与连续向量间的高保真、鲁棒映射，从而将语言建模任务从“预测下一个词元”转变为“预测下一个向量”。

  

然而，由于需在无限空间中进行预测，传统的softmax和显式概率密度无法定义，导致标准的最大似然训练（如交叉熵损失）和基于困惑度的评估均不可行。针对这两个挑战，研究团队提出无似然语言建模方法以解决训练问题，并提出相应的无似然评估方法。下面先对 **无似然建模方法** 进行介绍。

  

1）生 成头

  

CALM借鉴了新兴范式： **通过Transformer主干网络预测条件隐状态，再由后续生成模型基于该状态生成每个时间步的连续输出。不同的是，CALM将计算效率作为核心考量，这一约束决定了生成组件的设计思路。** 形式化定义为：生成头在计算中充当一个随机函数，它接收Transformer编码的隐状态 作为输入，其核心操作是从该状态定义的条件分布中进行采样，从而产生下一个连续向量 。

  

  

尽管生成头可采用任意连续生成模型，但扩散模型或流匹配等主流方法依赖多步迭代采样，计算成本高，与效率目标相悖。因此， **CALM需采用能高质量单步生成的模型** ，研究团队通过基于能量的目标函数实现这一目标。

  

2） **能量Transformer**

  

- **能量 损失**

  

采用能量得分作为训练目标，这是一种严格恰当的评分规则（最优得分只能通过准确预测真实分布获得）。与基于似然的方法不同，能量得分完全不依赖概率密度的评估，而是通过样本之间的距离来衡量预测分布与真实观测之间的一致性。 该训练目标的一大优势在于其灵活性：它仅要求能够从生成头采样，对内部架构几乎没有任何限制，从而使得模型其他层的简洁高效设计成为可能。 对于预测分布 P 和真实观测 y，能量得分定义为：

  

  

其中 x、x′ 和 x′′ 是从分布 P 中独立抽取的样本。该评分规则对于任意 α∈(0,2) 都是严格恰当的，通常取 α=1。第一项鼓励多样性，通过惩罚模型生成坍缩或过度自信的预测来避免缺乏多样性；第二项则鼓励保真度，促使模型的预测尽可能接近真实观测值。

  

因为上述公式中期望值使得能量得分无法精确计算， **研究团队构建一个无偏的蒙特卡洛估计量，作为实际可用的损失函数，称之为能量损失。**

  

具体而言，在每一步 i，从生成头部采样 N 个候选样本 。此外，研究团队利用了本方法设置中的一个独特特性：CALM的自编码器并非将一个 token 块映射到某个固定点，而是映射到一个条件高斯后验分布： 。若仅依赖单一样本 作为真实值，会为能量损失引入较大的方差。为缓解这一问题并提升训练稳定性，研究团队从该后验分布中采样 M 个目标样本 。结合这些样本集合，最终的能量损失函数定义如下：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

- 模型架构

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*图2 CALM架构图*

  

**推理过程：  
**

  

- 输入处理：在第 i 步，将先前生成的 K 个 token 进行嵌入并压缩为单一的输入表示，送入 Transformer。
- 连续预测：Transformer 输出隐藏状态 h <sub><span><span>i−1</span></span></sub> ，随后由基于能量的生成头部利用该状态预测下一个连续向量 z <sub><span><span>i</span></span></sub> 。
- 离散反馈循环：预测得到的向量 z <sub><span><span>i</span></span></sub> 立即通过预训练自编码器中冻结的解码器
	，重构出接下来的 K 个离散 token。

  

（3）无似然LM评估

  

尽管Brier得分在理论上是严谨的，但其直接计算对 CALM 而言仍不可行，因为它需要获知完整的预测分布 P。然而，研究团队发现可以完全以无需似然（likelihood-free）的方式，仅利用从模型中采样的样本，构建出Brier得分的一个无偏蒙特卡洛估计量。

  

具体而言，不确定性项的无偏估计量可通过指示函数 来估计，其中 是从模型中独立抽取的两个样本。准确性项可通过单个样本 x∼P 的指示函数 进行估计。

  

  

将以上公式应用到 n-gram 层面：把一组连续的 token 当作一个整体来看待，从而衡量模型在更长语义单元上的预测准确性和一致性，得到Brier-n。

  

最后，将综合指标 **BrierLM（Brier for Language Modeling）** 定义为各阶 Brier-n 得分的几何平均值。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*图3 不同模型及训练检查点上交叉 熵损失与 Brier LM 得分的联合分布*

  

如图3所示，交叉熵损失和 BrierLM 分数的一致性证实了 BrierLM 是语言建模能力的可靠衡量标准。也为其他隐式生成模型提供了一个公平、直接的评估方法。

  
（ 4）无似然温度采样

  

温度采样是现代大语言模型实现可控生成的关键技术。传统方法通过对 softmax 前的 logits 进行缩放来实现，但这需要显式访问模型的概率分布。然而， CALM 框架是无需似然的，其生成头仅提供一个黑盒采样器，无法输出概率分布，因此无法直接应用传统温度采样。

  

本文提出了一种 **基于拒绝采样的精确算法** ，仅利用该黑盒采样器即可严格实现温度控制的生成，从而解决了这一关键挑战。

  

1） **基于拒绝采样实现精确温度采样**  

  

从原始分布 中独立采样 n 次，且所有结果都恰好是同一个 x 的概率 = 。而 ，这使得 **可以通过多次独立采样并要求结果完全一致的方式** ，间接实现低温采样。

  

通用算法思路如下：进行 n 次独立采样，仅当所有 n 个样本完全相同时才接受该样本；否则，拒绝整组样本并重新开始。

  

为了将该方法推广到任意温度 T∈(0,1)，将指数 1/T 分解为其整数部分和小数部分：

  

该算法有 两个阶段 ：

  

第一阶段（处理整数部分 n）： 采用上述基于重复采样的方案——仅当 n 次独立采样结果完全一致时，才输出候选样本 x；

  

第二阶段（处理分数部分 α）： 需要更精细的处理。借助Bernoulli Factory理论，构造一个迭代过程，模拟一次成功概率为 的“有偏硬币抛掷”。只有当该“硬币”抛出成功时，样本才被最终接受。

  

只有同时通过两个阶段的样本才会被接受；任一阶段失败，整个过程都将重启。完整的算法流程在 Algorithm 1 中给出。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

定理1：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

2）期望采样代价  

  

算法1的实际可行性取决于计算效率， **定理2给出了该期望采样次数的表达式** ：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

其中， 和 是指示函数。

  

3）批量近似

  

批量近似是用于低温场景下的高效近似采样算法，旨在解决Algorithm 1在低温下因极高拒绝率而导致的样本利用率低的问题。

  

近似算法通过在大批次采样中统计重复样本的组合数作为权重，高效模拟低温下的 分布，并在无有效候选时自动降级匹配要求，从而在保持实用性的同时逼近理论目标分布。完整的算法流程在 Algorithm 2中给出。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

定理三：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

当批次大小 N→∞时，算法输出的分布会收敛到真实的 。

  

***02***

**评估**

  

（1）总体评估

  

*表1Transformer 基线和 CALM 之间的性能和计算成本比较（K=4）*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

如表1所示， **CALM 在语言建模任务中显著提升了计算效率，在同等性能下大幅降低计算开销** 。 3.71 亿参数 CALM-M 模型取得了与 2.81 亿参数 Transformer-S 基线相当的 BrierLM 分数，但训练 FLOPs 减少了 44%，推理 FLOPs 减少了 34%。此外，结果还证实，CALM 与传统 Transformer 一样具备良好的扩展性：增大模型规模可稳定地提升性能。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*图4 块大小K对性能与计算开销平衡的影响*

  

如图4所示，随着语义带宽K的增加CALM 的优势逐渐显现：从 K=1 提升到 K=2，计算成本几乎减半，而性能仅轻微下降；当 K=4 时，CALM 已超越传统 Transformer 的效率，该结果表明 **提升每个生成步骤的语义带宽，为优化语言模型的性能-效率权衡提供了一条全新且高效的路径 。**

  

进一步将块大小增至 K=8 时，性能反而出现较明显下降，这很可能是当前模型容量的限制所致。研究团队推测要充分发挥更高语义带宽的潜力，可能需要更大规模的模型。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*图5 CALM-XL 与 Transformer 基线模型的训练曲线*

  

基线模型仅需预测信息量较低的单个离散 token，任务较为简单，训练初期性能提升较快；相比之下，CALM 需建模高维连续向量的复杂分布，初期学习难度更大，导致训练进展较慢。但随着模型逐渐掌握该分布，其较大的参数规模得以有效利用，进而实现性能的显著且持续提升。

  

（2）自动编码器的影响

  

如表2 所示， **KL 截断（KL clipping）策略被证明是关键的解决方案，它有效防止了维度坍缩，并带来了明显的性能提升** 。此外， **在输入 token 和隐向量上同时施加 Dropout 正则化，也带来了显著且互补的性能增益** ，表明每种技术都以独特的方式共同塑造了一个高保真且鲁棒的潜在维度。

  

*表2 自动编码器中正则化技术的消融实验结果*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

*图 6 KL 散度权重对自编码器重建精度及 BrierLM 分数的影响*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

如图6所示，从无 KL 正则化（β=0）的基线出发，研究团队发现引入微弱的变分正则化即可显著提升最终的 BrierLM 分数，这验证了先前的假设： **适度的正则化能够平滑隐流形，使其更易于被能量 Transformer 学习，同时几乎不影响重建精度。**

  

然而，当正则化过强时，这一趋势发生逆转。当 β=0.1 时，BrierLM 分数急剧下降，这直接源于自编码器重建保真度的下降。基于上述发现，研究团队在最终训练中将 β 设为 0.001。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*图7 潜在维度对自编码器重建精度及下游 BrierLM 分数的影响*

  

潜在向量的维度大小限制了自编码器从输入中保留并传递信息的能力，如图7所示，尽管在 l=32 到 256 的范围内重建准确率均保持高位，下游 BrierLM 性能却在 l=128 时达到最优，该结果表明， **隐空间并非越大越好，而是应根据下游任务需求精心设计，以实现整体系统性能的最优化 。**

  

最后，研究团队研究了自编码器缩放的影响。实验表明， **在相对有限的数据上训练的轻量级架构，已足以学习到本框架所需的高保真且鲁棒的隐式表示。这一特性使得自编码器在整个系统中成为计算开销可忽略不计的组件。**

  

（3）模型架构的影响

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*图8 使用不同生成头对BrierLM分数的影响*

  

如图8所示，流匹配和本研究提出的基于能量的生成头均优于扩散模型，展现出明显的性能优势，基于能量的生成头则达到了更高的性能上限。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*图9 采样步数对生成质量的影响*

  

基于能量的生成头， **完全消除了对迭代解码的依赖** ，在生成输出时不需要像传统方法（扩散模型、流匹配模型）那样一步步反复迭代计算，而是一次前向传播即可直接得到最终结果，而且实现了更优的性能。

  

增加采样数量持续提升了 BrierLM 分数，但训练成本也随之近乎线性地增长。因此，采用 N=8 和 M=100 的配置，这一设置在性能与效率之间取得了良好平衡：使用适中的 N 以获得稳健的梯度信号，同时采用较大的 M 以稳定训练过程。

  

*表 3 模型采样数 N 与目标采样数 M 对模型性能及训练成本的影响*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

*表 4 能量分数公式中不同参数α的影响*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

*表5 模型输入对语言建模性能的影响*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

如表4、5所示，设置 α=1 时获得最佳实验结果。离散输入能够为模型提供更具结构化和更稳定的输入信号,实现了最优性能。

  

（4）温度采样的影响

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*图10 批大小N和温度T对准确率-多样性权衡的影响*

  

如图10所示，增加批量大小 N 和降低温度 T 都能锐化模型输出，提高预测准确性，但会减少输出的多样性，增加重复输出的概率。 **但是，批量大小 N 对输出分布的影响比温度 T 更显著。大批次能更准确地反映真实数据分布，帮助模型更自信地选出高概率答案。** 虽然调整温度 T 也有类似效果，但其影响较为有限。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*图11 CALM与基线Transformer的温度采样性能对比*

  

图11的结果进一步证实了这一点：通过在CALM模型中调节批量大小N，其在精度与碰撞率之间达到的平衡轨迹几乎与传统Transformer模型中通过调节温度T得到的轨迹相吻合。这一对齐现象表明， 可 **以 通过调节** **批量大小N，在广泛的温度条件下，准确复制传统模型的生成行为。** 因此，在设计或优化模型时，考虑批量大小的重要性不言而喻，它不仅影响模型的准确性和多样性，还在很大程度上决定了模型的表现力。

  

**END**

  

**点击下方名片 即刻关注我们**

继续滑动看下一个

智猩猩AI

向上滑动看下一个