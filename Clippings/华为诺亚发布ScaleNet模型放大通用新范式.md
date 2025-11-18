---
title: "华为诺亚发布ScaleNet：模型放大通用新范式"
source: "https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&chksm=85be54ba2a3533d01864d4b16ba50ed3e1c2af4776dff787b723866d06a9db0545cda41d4d15&idx=2&mid=2651002344&sn=32013c32465ee582027f89e648a23e5a#rd"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-11-18
description: "仅少量额外参数量，就能将模型深度扩展一倍。"
tags:
  - "权重共享"
  - "轻量级适配器"
  - "参数高效"
abstract: "华为诺亚提出的ScaleNet方法通过权重共享和轻量级适配器技术，实现了用少量额外参数将模型深度扩展一倍，在视觉和语言模型上均验证了其有效性。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/KmXPKA19gW87uG1DXQdp9SfJSLDribs4hg8aVenXqkIPMvyzTSyZpBLwDygwwgTu9fujSttJI86uv2wurq4ovvg/0?wx_fmt=jpeg)

[机器之心](https://mp.weixin.qq.com/) *2025年11月18日 11:29*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWic1GuW68DykycvknmG9tyBvLRsVGY4rRKCGuKKSkOqnGrvGwXxqqDxHlia88ZCbqyicswl2HC89BcZA/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=0)

  

在基础模型领域，模型规模与性能之间的缩放定律（Scaling Law）已被广泛验证，但模型增大也伴随着训练成本、存储需求和能耗的急剧上升。如何在控制参数量的前提下高效扩展模型，成为当前研究的关键挑战。

  

针对这一挑战，来自北京理工大学、华为诺亚方舟实验室及香港城市大学的研究团队提出了 ScaleNet 方法。该方法创新性地实现了 “用仅少量额外参数量，将模型深度扩展一倍”，并在视觉 Transformer（ViT）和大语言模型（LLM）上均验证了其有效性，显著提升了模型性能。这一成果表明 ScaleNet 具备成为通用、经济高效的模型扩展框架的潜力，适用于视觉与语言多种任务。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW87uG1DXQdp9SfJSLDribs4hqBnTRUnvgzY2m0GMBGL1CM78rLZ4pszeYqyabaxhZMOCrXaFEl2HOg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

  

- 论文地址： https://arxiv.org/abs/2510.18431
- 开源代码：https://github.com/Hao840/ScaleNet

  

研究动机：模型扩展的高昂成本

  

当前，从头训练一个大规模模型计算代价巨大。为此，研究界探索了 “渐进式训练”（Progressive Training）等方法，通过复用小模型的权重来初始化大模型，以加速训练。然而，这些方法通常会引入大量新的、独立的参数，不仅拖慢了优化进程，也带来了巨大的存储开销。

  

针对这一核心问题，ScaleNet 提出可以在保持参数效率的同时，实现模型的有效扩展。

  

核心方法：权重共享与增量调整

  

ScaleNet 的核心设计结合了两种技术：层级权重共享（Layer-wise Weight Sharing）和轻量级适配器（Lightweight Adapter）。

  

技术一：层级权重共享，实现参数高效

  

不同于为新层引入全新参数的传统做法，ScaleNet 让新增加的层与预训练模型中的已有层共享同一套参数。如下图所示，传统的渐进式训练（a）中，新层拥有独立的参数。而在 ScaleNet（b）中，新层与原始层共享参数（Weight sharing）。这种设计极大地提升了参数效率，并通过复用已有知识加速了模型的学习过程。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW87uG1DXQdp9SfJSLDribs4hmxUZucXAw64opodzcNcJG2ibLaAGM3z5x7HGBiaNxqrsniankRoxvia0aA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

图 1 渐进式训练与 ScaleNet 的对比

  

技术二：轻量级适配器，赋予共享层特异性

  

完全的权重共享可能导致不同层功能趋同，限制模型的表达能力。为解决此问题，ScaleNet 为每个共享层引入了一个小型的、可训练的并行适配器模块（Adapter Module）。该模块仅包含极少量的调整参数，用于为每个共享层实例提供独特的调整，使它们在共享知识主体的同时，又能学习到各自的特异化功能，从而保证了扩展后模型的容量和性能。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW87uG1DXQdp9SfJSLDribs4hqm5Z6r906jarCzw4rhyUthBcOlkiaBAyoPyWykmmZFcI5qOwyHtF3pw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

图 2 ScaleNet 的整体框架

  

实验结果与分析

  

基于视觉模型的性能与效率评估

  

在 ImageNet-1K 图像分类任务上，ScaleNet 在多种模型架构（如 DeiT 和 Swin）上均表现出色，在参数量相近的情况下，稳定取得了比基线方法更高的准确率。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW87uG1DXQdp9SfJSLDribs4hBKTjg6aPvMECaib2gh5iafJZ7jBF0FTzJS3AboAs8b9NWKyA4yjcxLuQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

表 1 ScaleNet 与 baseline 方法的性能对比

  

相比于直接训练，ScaleNet 另一个优势体现在训练效率上。以 24 层的 DeiT-Small 模型为例：

  

- 从零训练：训练 300 个 epoch，耗时 47.3 小时，准确率为 79.31%。
- ScaleNet：仅需 100 个 epoch，耗时 15.8 小时，准确率达到 81.13%。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW87uG1DXQdp9SfJSLDribs4hqf9a1baibDFFnc3F0utEhRcKrll2Eckpa3rOVOpcQyKNKs4Z4twibpbA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

表 2 直接训练与 ScaleNet 之间的开销与性能对比

  

这一结果表明，ScaleNet 通过有效利用预训练知识，大幅缩短了训练周期，同时获得了更优的模型性能。

  

基于大语言模型的通用性验证

  

为了验证 ScaleNet 作为一种通用方法的潜力，研究团队将其应用到了自然语言处理领域。他们使用 ScaleNet 对 Llama-3.2-1B 语言模型进行扩展，并在多个常识推理基准测试集上进行评估。

  

实验结果（如表 3 所示）表明，扩展后的模型在 BoolQ、PIQA、HellaSwag 等多个任务上均超越了原始模型，平均性能提升了 0.92%。这一成功实践证明，ScaleNet 的核心思想并不局限于视觉领域，而是一种具备跨模态通用性的模型扩展框架。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW87uG1DXQdp9SfJSLDribs4h2m1jyx0YJ8Z8xicD8GTIWya6gAXFmJG4dVM1gHJroKibfoziaIkoia4qeg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

表 3 在大语言模型上的实验结果

  

此外，该方法在目标检测、语义分割等下游视觉任务中同样取得了稳定提升，进一步证实了其良好的泛化能力。

  

总结

  

ScaleNet 框架通过层级权重共享与轻量级适配器的有效结合，为预训练模型的扩展提供了一条高效、低成本的技术路径。它不仅在视觉任务上大幅提升了训练效率和模型性能，还通过成功应用于大语言模型证明了其作为一种通用扩展范式的巨大潜力。这项工作为开发更大、更强且更经济的 AI 模型提供了新的思路，对促进 AI 领域的可持续发展具有积极意义。

  

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibetB0IZpgZNyKh5jHriao1SzjdziabDsiaLHgStViaLj9fWN5TiaaDJQf7T7pb07kJxW4edT4ibLztKpMQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

  

© THE END

转载请联系本公众号获得授权

投稿或寻求报道：liyazhou@jiqizhixin.com

继续滑动看下一个

机器之心

向上滑动看下一个