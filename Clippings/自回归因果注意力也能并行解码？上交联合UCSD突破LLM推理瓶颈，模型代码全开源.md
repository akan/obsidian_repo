---
title: "自回归因果注意力也能并行解码？上交联合UCSD突破LLM推理瓶颈，模型代码全开源"
source: "https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&chksm=853b03d1880cbb92743fb6158dedaaaee7a0fa52498513c8ea6f36f187909ede24dd781e6ff7&idx=2&mid=2651009779&sn=705533b18e2024cdacc0a0be41f430ef#rd"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-12-30
description: "重新定义了因果模型的并行化可能."
tags:
  - "并行解码"
  - "推理加速"
  - "Jacobi Forcing"
  - "因果注意力"
  - "训练优化"
abstract: "上海交大与UCSD团队提出Jacobi Forcing方法，通过将标准自回归模型转化为因果并行解码器，在保持生成质量的同时显著提升大语言模型的推理速度。"
---
*2025年12月30日 14:56*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWic1GuW68DykycvknmG9tyBvLRsVGY4rRKCGuKKSkOqnGrvGwXxqqDxHlia88ZCbqyicswl2HC89BcZA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

在大语言模型（LLM）落地应用中，推理速度始终是制约效率的核心瓶颈。传统自回归（AR）解码虽能保证生成质量，却需逐 token 串行计算，速度极为缓慢；扩散型 LLM（dLLMs）虽支持并行解码，却面临训练成本高昂、质量下降及 KV 缓存兼容问题；投机解码（Speculative Decoding）则需额外引入草稿模型，系统复杂度大增。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/KmXPKA19gW8L9eIe4cvYXicnfDf06cNvrPFgn1c6YEDBjYRWficeD0ZJdASXdsMaSpccIrlmlws6XERJ1akAlI0w/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/KmXPKA19gW8L9eIe4cvYXicnfDf06cNvrNfKxdJMbVLpS0rqjvOib6ymQUHvz84HutAV9dm3otfYOMjqVVpIxjiag/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

J acobi Forcing Model 与 AR LLM 推理速度对比示意

  

近期，来自 UCSD Hao AI Lab 和上海交大 Deng Lab 的团队提出了一种突破性解决方案 ——Jacobi Forcing，该方案无需重构模型架构，即可将标准 AR 模型转化为原生因果并行解码器，在编码、数学等任务中实现最高 4 倍 wall-clock 提速和 4.5 倍 tokens-per-forward 提升，同时保持接近 AR 模型的生成质量，为 LLM 高效推理开辟了新路径。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW8L9eIe4cvYXicnfDf06cNvr3icibve6ibdSqcbUO94zVGzlDkaBBrsv8V1QUaMpq1EFsRRwqA76jRicPQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)
- 论文地址: https://arxiv.org/pdf/2512.14681
- 代码地址：https://github.com/hao-ai-lab/JacobiForcing
- 模型仓库：http://huggingface.co/JacobiForcing

  

Jacobi Forcing 核心优势：

破解并行解码的 "三元悖论"

  

Jacobi Forcing 的创新之处在于打破了 "低代价、高速度、高质量" 的不可能三角，其核心优势体现在三大维度：

  

1\. 原生因果架构，部署与训练成本低:

  

不同于 dLLMs 的双向注意力机制，Jacobi Forcing 保留了 AR 模型的因果注意力结构，完美适配现有 KV 缓存复用机制和 AR 优化内核，可作为现有 AR 模型的 "即插即用" 替代方案，极大降低部署与训练成本。

  

2\. 高效并行解码，速度提升显著：

  

通过在模型自己生成的 Jacobi 解码轨迹做渐进蒸馏训练，模型能够快速在每轮前向传播中并行更新多个 token。结合多块并行解码（Multiblock decoding）和拒绝回收（Rejection recycling）策略，可同时维护多个解码块，缓存高质量 n-gram 片段重复利用，在编码任务中实现 181.8 TPS 的生成速度，远超 AR 基线的 39.8 TPS。

  

3\. 质量损失极小，任务表现优异：

  

针对 AR 到扩散模型的预训练 - 后训练目标不匹配问题，Jacobi Forcing 设计了使用模型自己生成的数据做学习，通过渐进式一致性蒸馏损失和 AR 损失的联合优化，让模型在噪声环境下仍能生成贴近 AR 分布的高质量结果，学习高效且保持了 AR 模型的高质量特性。在 HumanEval 编码基准中，以 83.5% 的准确率实现 4 倍提速；在 GSM8K 数学任务中，91.4% 的解题率接近 AR 基线，速度提升 3.7 倍。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Jacobi Forcing 与 dllm 在速度，质量与训练成本上的对比图

  

Jacobi Forcing 技术路线：

从训练到推理的全链 路优化

  

Jacobi Forcing 以因果并行解码为核心目标，基于 Jacobi 解码框架进行深度优化，通过训练机制创新与推理策略升级的全链路设计，在保留 AR 模型因果骨干与 KV 缓存兼容性的同时，实现高效并行解码。

  

其技术路线具体细节如下：

  

1\. 技术基础：基于 Jacobi 解码的因果并行框架

  

Jacobi 解码是一种因果并行解码过程，核心逻辑是：在保留 AR 模型因果注意力机制的前提下，对一个块内的所有 token 进行并行迭代更新，直到所有 token 与贪心 AR 输出完全匹配（即达到 “定点” 状态）。这一过程形成了一条 “并行精炼轨迹”，既维持了因果依赖关系，又突破了逐 token 串行的限制。 此前的相关工作（如 CLLMs）已验证：通过在 Jacobi 轨迹上微调模型，可缩短迭代轨迹、提升解码速度，但存在一个关键局限：在大 block size 下由于上文噪声过多无法并行解码出更多的 token 数。Jacobi Forcing 在此基础上进一步推进，核心突破是：训练模型在含噪声的上文下，仍能生成贴近 AR 分布的高质量草稿，同时通过推理策略优化，最大化并行效率。

  

2\. 训练阶段优化：噪声感知的渐进式学习

  

Jacobi Forcing 首先利用自回归语言模型对提示词（prompt）集合执行 Jacobi 解码，采集从噪声块到干净定点的完整 Jacobi 解码轨迹。为使模型具备应对高噪声上文场景下的并行解码能力，Jacobi Forcing 设计渐进式噪声调度策略，以学习噪声块到干净定点的映射关系：具体而言，先为采集轨迹中的中间未收敛噪声块赋予噪声等级（噪声等级越高，与干净定点状态的偏差越大），再按 “低噪声→高噪声” 的渐进式顺序对噪声块进行打包，构建训练序列，从而提升去噪任务的可学习性；其核心训练目标为将打包后的含噪声训练序列映射至全干净定点序列。为实现高效训练，Jacobi Forcing 进一步设计噪声感知注意力掩码，该掩码支持通过单次模型前向传播即可完成上述映射关系的学习。此外，为平衡并行解码效率与自回归（AR）生成质量，方案设计了加权双项联合损失函数：其一为渐进式一致性蒸馏损失，用于引导模型掌握任意噪声等级块到干净定点块的映射；其二为 AR 损失，确保模型生成质量与原始自回归模型保持一致。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

训练数据打包与噪声感知注意力掩码图解

  

3\. 推理阶段优化：高效并行解码策略

  

训练后的 Jacobi Forcing 模型仍是标准 AR checkpoint，但通过针对性的推理策略，可最大化并行解码效率，核心包括 “高质量草稿利用 + 多块调度” 两大模块。

  

1\. 高质量草 稿挖掘与 复用 ：训练后模型的 Jacobi 解码轨迹呈现显著特性：轨迹中未收敛点包含大量高质量 n-gram，这些 n-gram 虽可能位置暂错，但内容与最终 AR 定点输出完全一致，且在迭代中保持稳定。基于此特性，推理时会缓存 n-gram 并在后续迭代中直接将这些缓存的 n-gram 作为候选草稿，减少迭代次数（见下图轨迹可视化：红色标注为可复用的高质量 n-gram）。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

高质量草稿复用图解

  

2\. 多块并行调度 ： 同时维护 K 个块（实验中 K=2 为最优），分为 “真实活跃块” 和 “伪活跃块”； 真实活跃块中的 token 会被验证并提交到 KV 缓存，成为后续块的因果前缀；伪活跃块会基于当前前缀进行 Jacobi 迭代更新，但暂不提交到 KV 缓存； 当真实活跃块收敛（所有 token 匹配定点），从伪活跃块中选择一个晋升为真实活跃块，基于更新后的完整前缀重新验证其所有 token。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

推理阶段优化策略图解

  

实测表现：优于主流并行解码方案

  

在 A100 GPU 上的 7B 模型基准测试中，Jacobi Forcing 超越 dLLMs、投机解码等主流方案，展现出更优的速度 - 质量 trade-off。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Jacobi Forcing 模型性能展示

  

无论是编码、数学等专业任务，还是通用文本生成场景，Jacobi Forcing 都能在保证结果可靠性的前提下，将推理速度提升一个量级，尤其适合对延迟敏感的工业级 LLM 应用。

  

Jacobi Forcing 的出现，不仅解决了 LLM 推理的效率瓶颈，更重新定义了因果模型的并行化可能。随着大模型应用向低延迟、高并发场景渗透，这种兼顾兼容性、高性能和高质量的解码方案，有望成为工业级 LLM 部署的首选技术，推动 AI 应用效率迈入新阶段。

  

© THE END

转载请联系本公众号获得授权

投稿或寻求报道：liyazhou@jiqizhixin.com

继续滑动看下一个

机器之心

向上滑动看下一个