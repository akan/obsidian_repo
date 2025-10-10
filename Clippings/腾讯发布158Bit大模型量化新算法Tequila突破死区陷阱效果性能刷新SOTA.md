---
title: "腾讯发布1.58Bit大模型量化新算法Tequila！突破\"死区陷阱\"，效果性能刷新SOTA"
source: "https://mp.weixin.qq.com/s/3OJw_eM6M25vP0dS0B1lhA"
author:
  - "[[腾讯程序员]]"
published:
created: 2025-10-10
description: "全精度模型，潜力巨大"
tags:
  - "三值量化"
  - "死区陷阱"
  - "动态偏置"
  - "模型压缩"
  - "推理加速"
abstract: "腾讯提出Tequila算法，通过动态偏置解决三值量化中的死区陷阱问题，在几乎零推理开销下实现性能提升。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/j3gficicyOvavoeTqBZiagIg0LhdiaqavQKYkDNaD9c0RQRFyH5YnPJ1ocCBwCsPmMr8R7zxc9vgk8WUYwm8nlbniag/0?wx_fmt=jpeg)

Original 腾讯程序员 [腾讯技术工程](https://mp.weixin.qq.com/s/) *2025年10月10日 17:37*

针对大语言模型(LLM)的量化方法层出不穷，近期 **三值量化** （1.58Bit）在LLM中使用的越来越广，比如BitNet等方法。腾讯近期发布了1.58Bit量化的新算法 Tequila，提出一种QAT阶段解决“死区陷阱”的新算法，性能效果达到新SOTA。 模型使用 1.58Bit 的位宽达到的性能，能对标同参数量的全精度模型，潜力巨大。

github地址： [https://github.com/Tencent/AngelSlim](https://github.com/Tencent/AngelSlim)

论文地址： [https://arxiv.org/abs/2509.23809](https://arxiv.org/abs/2509.23809)

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/j3gficicyOvavoeTqBZiagIg0LhdiaqavQKYuEMqtt0Lg3IfwqwPtOXBicAYFUUtpG3qEribhxxOm7baprWk6nSfXFRQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

  

### 1、三值量化介绍

三值量化是部署大语言模型到端侧和CPU设备的一种高效方法。其核心是将权重约束为【-1, 0, +1】三个值，从而将矩阵乘法简化为加法操作。这种转换显著降低了计算复杂度。由于加法被硬件原生支持，因此三值量化在推动边缘计算和低功耗AI应用方面潜力巨大。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 2、三值量化的缺陷与挑

然而，这种激进的压缩方式会带来显著的信息损失，即便在大规模数据集上进行了量化感知训练（QAT），也常常会导致严重的精度下降。例如，BitNet 在 QAT 过程中消耗了 4T 个token，但仍无法达到全精度模型的性能。因此，精度下降和高昂的训练开销这两个问题是开发有效三值 LLM 落地的主要障碍。

我们发现这些挑战的关键根源在于“ **死区陷阱** ”。“死区”即数值为0的区域，在三值量化中出现大量的0，并且训练时，在直通估计器（STE）由于缺乏一致的梯度优化信号，这些权重无法稳定地逃离死区，而是在死区边界累积，如下图（上部）所示。这导致了无效的振荡循环，使这些权重永久处于不活跃状态，严重阻碍了模型收敛。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

为解决死区陷阱问题，我们提出了 **Tequila** 三值量化方法。我们的核心思想是通过将“死区”权重重新用作动态偏置bias来重新激活它们。这为输出提供了连续信号，显著增强了模型的容量。更重要的是，这些权重通过bias项直接获得有意义的梯度，从而能够稳定地摆脱死区，如上图（底部）所示。同时，这些bias可以离线计算，几乎不会增加推理开销。

  

### 3、Tequila三值量化创新

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**（1）极小值再激活算法，** 用来缓解死区陷阱 **。** 我们发现，三值量化中的“死区”现象源于零点权重在前向传播中无法提供有效信号，导致这些权重陷入无法更新，难以学习的恶性循环，严重阻碍模型收敛。为解决该问题，我们提出通过为这些无效权重注入少量信息值，重新激活其作用。该方法并非依赖梯度强行将其移出“死区”，而是赋予权重新的功能：既为增强模型容量，也为梯度提供清晰的传播路径，从而持续接收有效梯度，打破僵局。

因此我们提出了极小值再激活（Minima Reactivation）方法，保留了零权重的符号信息，将其重新激活为不同的值： -0 和 +0，分别代表负极小值和正极小值，如上图（b）所示。这创建了一个有效的四元权重表示 {-1, -0, +0, +1}，同时保持了三值运算的计算优势，因为输入 x 与这些极小值的乘法简化为具有适当符号的常量绝对值，计算公式如下：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

形式上，令 W̃ = (w̃₁,..., w̃ₙ) 表示四元权重向量，并将死区内的索引集定义为

D = {i | -Δ < wᵢ < Δ}。前向传播过程可相应转换为：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

该公式表明，先前处于死区的权重现在通过偏置项bias对输出产生有意义的影响。因此，这些权重w从反向传播中获得信息梯度，表示为

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

与基于STE的传统三值量化相比，本方法使原本的“失效”权重能够输出非零的有效信号，并获得更明确、稳定的梯度，从而高效实现权重恢复，显著加快收敛。 尽管极小值再激活算法验证了重新激活策略的可行性，但我们发现其存在两个局限：

a）重新激活权重的梯度更新仍依赖STE，会引入较大噪声，对精度提升有限；

b）所引入的类似偏置的项与输入相关，导致不可忽视的推理开销。基于这些发现，我们最终提出Tequila方法，在保留死区重用核心思想的同时，有效克服了上述的这些局限性。

**（2）动态离线偏置。** 如上图（c）所示，Tequila 通过三项关键设计，在几乎不增加推理开销的前提下，有效解决了三值神经网络中的“死区”权重问题：

a) 可微量化取代 STE：针对“死区”权重 ωi ，引入动态偏置λωi 替换了不可微的恒定值ε 的映射，使量化函数变得平滑可微。该设计绕过了 STE，提供了直接且具有信息量的梯度，能够有效优化“死区”的权重。

b) “死区”权重融合至偏置： 鉴于在 Transformer 中输入的分布大致是对称的，我们将与输入无关的“死区”偏差融合至离线Bias，从而将推理开销降低到几乎为零，同时仍保留了权重再激活的优点。

c) 保留输入信息：重新激活的权重不仅作为离线偏置，还会参与三值矩阵乘法计算，既保留了关键的输入信息，又获取丰富的梯度信号，从而推动更有效的训练。

通过这三个关键设计，Tequila前向传递将高效的三值量化运算与自适应偏置相结合，如下公式所示：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

其中偏置项C(W)作为死区权重的残差连接，该处理直接为这些”死“权重提供了更优的梯度，如下反向传播公式所示，为“死”权重提供直接、信息丰富的梯度信号，加速模型收敛。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

与现有三值量化方法相比，Tequila具有五大核心优势：

● 增强模型容量：通过重新激活失效权重，在不增加推理计算复杂度的前提下，有效扩展了模型参数空间。

● 无陷阱优化：Tequila通过提供直接且信息丰富的梯度，能够稳定逃离死区，实现无陷阱的权重优化。

● 训练稳定性：可微分的重新激活函数在保持量化约束的同时确保优化过程稳定，使训练收敛更一致可靠。

● 即插即用设计：Tequila作为简单易用的模块，可轻松集成到大多数现有 三值量化 方法中。

● 近乎零推理开销：与输入无关的偏置项可离线预计算并无缝融合到计算核中，实现近乎零的推理开销，完美保留纯 三值量化 的硬件效率。

  

### 4、实验效果

Tequila对比常用QAT、三值量化方法，效果指标提升明显，在10B的Token数据量上达到了sota的水平，多个Benchmark中提升3%左右，如下图所示：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

同时可以观察loss下降速度，可以发现我们的方法的下降速度明显优于其他方法，这也证明了重新激活死区权重对模型收敛有着巨大帮助。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

最后，性能测试中，三值量化推理性能在CPU上tokens/提升2~3倍，对比BitNet三值量化的耗时发现，我们的方法对于推理时延的负担几乎为零。

  

### 5、总结

Tequila为高效模型压缩开辟了新的方向，为解决"死区陷阱"这一难题，Tequila提出自适应动态偏置，以近乎零推理开销下，成功激活这些权重来增强模型表达能力。在多个Benchmark中Tequila超越现有三值量化方法，在使用有限训练数据的情况下逼近全精度模型性能，同时保持三值量化的计算优势，最高可实现3倍推理加速。我们相信这项工作为将为LLM部署到资源受限设备，提供了切实可行且易用的解决方案。欢迎关注Tequila的工作：

github地址： [https://github.com/Tencent/AngelSlim](https://github.com/Tencent/AngelSlim)

论文地址： [https://arxiv.org/abs/2509.23809](https://arxiv.org/abs/2509.23809)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

腾讯技术工程

向上滑动看下一个