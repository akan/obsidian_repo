---
title: "新型AI芯片能耗重大突破，已登Nature子刊"
source: "https://mp.weixin.qq.com/s/VaB6bWCrq9Iq-baE_Ey5Ow"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-12-01
description: "能耗、面积，大幅节省。"
tags:
  - "存算一体"
  - "模数转换器"
  - "忆阻器"
  - "自适应量化"
  - "能效提升"
abstract: "港大等团队在《自然·通讯》发表研究，利用忆阻器设计出自适应模数转换器，解决了存算一体芯片中ADC的能耗瓶颈，实现了显著的能效和面积优化。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/KmXPKA19gW9jN9uVuF3gJ5iboibrxbQ6k805KV1NwN7h0p6DSnbS6YXPgY194z66NP9wgnmNZpxeOuUibUnPmG7Xg/0?wx_fmt=jpeg)

[机器之心](https://mp.weixin.qq.com/s/) *2025年11月25日 07:49*

  

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWic1GuW68DykycvknmG9tyBvLRsVGY4rRKCGuKKSkOqnGrvGwXxqqDxHlia88ZCbqyicswl2HC89BcZA/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=0)

  

该研究由来自香港大学、香港科技大学和西电杭州研究院的团队共同完成。论文第一作者为香港大学博士生洪海桥。香港大学的刘正午博士、李灿教授和黄毅（Ngai Wong）教授为共同通讯作者，合作者还包括张薇教授（港科大）、毛伟教授（西电）等。

  

AI 浪潮席卷全球，但算力功耗的 “电费焦虑” 也随之而来。传统冯・诺依曼架构下，数据在 CPU 和内存间 “疲于奔命”，消耗了大量能量。

  

存算一体（Compute-in-memory, CIM）技术被寄予厚望。它直接在内存里 “算”，通过在模拟域执行高效的乘加运算，被视为消除数据搬运瓶颈的终极方案之一。

  

但，这只是故事的一半。模拟计算的结果，最终必须通过 “翻译官”—— 模数转换器（ADC）—— 变回数字信号，才能进行后续处理。

  

然而这个 “翻译官” 的开销，却成了新的 “拦路虎”。

  

在一篇新发表于《自然・通讯》（Nature Communications）的研究中，来自香港大学、香港科技大学和西电杭州研究院的团队指出，在先进的存算一体系统中，ADC 可能消耗高达 87% 的总能量和 75% 的芯片面积！

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9jN9uVuF3gJ5iboibrxbQ6k8bkN9WXSny4u31wBRbpic2qGSvnaNgibz2Siaw3l2tbQVN8oXaVWl2ibiaBw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

  

- 论文《 Memristor-based adaptive analog-to-digital conversion for efficient and accurate compute-in-memory 》
- 论文链接： https://www.nature.com/articles/s41467-025-65233-w

  

这个占据绝对大头的能耗组件，几乎抵消了存算一体本应带来的巨大能效优势，成了整个架构中最亟待解决的瓶颈。

  

英雄的隐痛：为什么存算一体绕不开 ADC？

  

要理解这个瓶颈，我们得先看 AI 到底在 “算什么”。

  

正如《Nature》上的一篇综述（Lanza 等人，2025）所指出的，AI 应用的核心是海量的向量矩阵乘法。传统架构（如 CPU）必须将这些运算分解成无数个单独的步骤，在内存和处理器之间来回倒腾数据。这个过程极其低效：Lanza 等人的文章分析，数据传输带来的能耗可能是计算本身的 200 倍，并带来巨大的延迟。

  

存算一体通过在内存阵列（例如忆阻器）中直接利用物理定律（如欧姆定律和基尔霍夫定律）并行完成 VMM，完美解决了这个问题。

  

但魔鬼藏在细节中。模拟计算的结果是连续的电流或电压，而数字世界只认 0 和 1。ADC 就是这个翻译官。问题是，这个来自传统混合信号领域的 “翻译官”，他的工作方式极其 “一刀切”，在这种新型 AI 芯片中格格不入。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW8yU8cVnOME0Ij7iacD6FarWUIhC13yckT1CWibicSA8cv29IveyJhBHicNj3Oib6XshxDRP9WoUbVzg0g/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

  

传统 ADC 采用的是 “均匀量化”（Uniform Quantization）。无论信号长什么样，都用一组固定的、等距的量化边界去 “切割”。

  

但这和神经网络的实际情况完全不符。研究人员展示，不同网络层的输出信号分布千差万别（如上图 Conv 1, 2, 3 所示），有的像正态分布，有的则是偏态或局部均匀的。用一套固定的边界去衡量千变万化的计算信号，必然导致在信号密集的区域 “分不清”，在信号稀疏的区域又 “浪费” 了边界，结果就是精度严重损失，AI 芯片推理效果不尽人意。

  

为了弥补这种损失，设计者被迫使用更高精度的 ADC（即更密集的边界），但这又会导致 ADC 的硬件开销（功耗和面积）呈指数级暴涨，陷入了恶性循环。

  

让量化边界学会自适应

  

既然固定的边界不行，那让它 “活动” 起来不就好了吗？

  

港大团队的思路是：既然你是固定的，那我就把你变成 “活” 的。他们看中了 “忆阻器”（Memristor）。

  

忆阻器是一种神奇的纳米器件，它的电阻值不是固定的，而是可以通过施加电压来编程，并且断电后也能 “记住” 这个状态。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

简单的融合替换难以产生突破性的作用，团队利用忆阻器设计了一种全新的 “量化单元”（Q-cell），它本质上是一个模拟内容可寻址存储器。通过改变忆阻器的电阻值，研究人员可以在硬件上随意编程设置 ADC 的量化边界。

  

这样一来，ADC 就能 “看菜下碟”：

  

研究团队使用算法（如 Lloyd-Max）先分析 AI 模型每一层输出的数据到底长什么样，然后寻找出一套最优的、非均匀的量化边界，最后再通过忆阻器把这套 “定制边界” 写入硬件。

  

不止是 “量体裁衣”，更是 “瘦身革命”

  

这种 “量体裁衣” 的自适应方法（Adaptive Quantization），效果立竿见影。

  

在 VGG8 网络和 CIFAR-10 数据集上，4-bit 精度下，传统均匀量化的准确率仅为 52.3%，而自适应 ADC 能飙升到 88.9%。在 5-bit 精度下，忆阻器 ADC 也达到了 89.55% 的高准确率，逼近理想性能。

  

在更具挑战性的 ResNet18 网络上，这种优势依然明显，相较于均匀量化，自适应方案带来了显著的精度提升。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

如果只是更准，那还不够。忆阻器 ADC 的真正杀手锏，在于它为整个存算一体系统带来的 “减负” 效应。

  

首先，ADC 本身的效率。与公开发表的 SOTA 设计相比，这款忆阻器 ADC 在 5-bit 精度下，实现了 15.1 倍 的能效提升和 12.9 倍 的面积缩减。

  

更关键的是系统层面。当这个高效 ADC 被集成回存算一体系统后：

  

在 VGG8 网络中，ADC 模块的系统能耗占比从 79.8% 猛降至 22.5%（系统总能耗降低 57.2%），面积占比也从 47.6% 降至 16.9%（系统总面积降低 30.7%）。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

在 ResNet18 上，也实现了类似的 56.9% 的能耗和 25.1% 的面积节省。

  

这意味着，存算一体系统中最臃肿、最耗电的那个部件，被彻底 “驯服” 了。

  

这项工作为解决混合信号存算一体中的 ADC 瓶颈提供了一个全新的、硬件友好的范例，为实现高效、准确的下一代 AI 硬件铺平了道路。

  

© THE END

转载请联系本公众号获得授权

投稿或寻求报道：liyazhou@jiqizhixin.com

修改于 2025年11月25日

继续滑动看下一个

机器之心

向上滑动看下一个