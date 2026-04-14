---
title: "复旦团队用数学证明：大模型有个“记忆天花板”，RAG 不是可选项"
source: "https://mp.weixin.qq.com/s/8SnwgJvW-otSRsBH2QhoJw"
author:
  - "[[Echo]]"
published:
created: 2026-04-10
description: "大模型的记忆天花板：为什么准确率难破 80%，RAG 为何成为必选项？"
tags:
  - "记忆上限"
  - "知识特异性"
  - "检索增强生成"
abstract: "复旦大学研究通过数学公式证明大模型存在固有的知识记忆上限，使得检索增强生成成为提升准确率的必选项。"
---
Original Echo *2026年4月7日 16:07*

![图片](https://mmbiz.qpic.cn/mmbiz_gif/Pn4Sm0RsAujqPrtpN5QqqOuSG0AdUUx8wRg3vvr7aQJicdC0cHDBqZrJBZajQUXx97BwNaAE6L6x7OGlsTIpWjw/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=0)

大模型的记忆天花板：为什么准确率难破 80%，RAG 为何成为必选项？

作者 | Echo  

出品 | CSDN

![Image](https://mmbiz.qpic.cn/mmbiz_png/5PVbTxQrraIJ5BpicIicEMa2oMiaWAsoou2vCSCibrecJv0ticD3kNpbt6XibKqsw6gBdTicdh7844GlZD08Zrhx5uibLRPUaP028MhAbYF4YsicSpJs/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

今天看到复旦大学教授张奇老师分享的这篇论文，说实话，让我不由得陷入了沉思。

复旦 NLP 实验室折腾了快 2 年，终于被 ACL 2026 Main Conference 录用。这篇论文用相当扎实的数据告诉我们一件事：

大模型预训练存在一个知识记忆的“天花板”——不管你数据堆多少、模型叠多大，closed-book 问答准确率就是过不去。

这不是玄学，是有数学证明的。

一个困扰行业的问题

GPT-4 的技术报告里写过一句话：“我们在训练完成前就预测了 GPT-4 在 HumanEval 上的表现”。

但怎么预测的？没细说。

这个问题其实挺关键：如果你花几千万美元训练一个模型，结果训练完发现知识记不住，那不是血亏？

复旦团队从 2023 年就开始琢磨这事。他们的切入点很朴素：

一条知识在预训练语料里出现过，模型有多大程度能记住它？

这听起来像个简单的问题，但真要回答，得先把“记住”这个概念量化。

SMI：一个能预测记忆的公式

他们提出了一个叫 SMI（Size-dependent Mutual Information） 的指标。

公式长这样：

其中表示主体和客体之间的互信息，代表模型参数量。

不用被公式吓到，逻辑其实挺直观：

一条知识能不能被记住，取决于三个东西：

1\. 这条知识出现的频率 —— 出现越多，越容易记住；

2\. 这条知识的“特异性” —— 如果"苹果"这个词到处都是，那"苹果总部在库比蒂诺"就很难形成强关联；

3\. 模型的大小 —— 参数越多，记忆容量越大。

![Image](https://mmbiz.qpic.cn/mmbiz_png/5PVbTxQrraKNJIxQ3fSzuenInicQE8HCo1sEJibE7A861SIk6Cy57DmuN6QFWWvdXGWrBBNtLHFrq3pfs7e9iav0LlxAt8mmxfGTDtLicGbHaibE/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

第三个最好理解，但第一个和第二个的关系很有意思。  

论文里举了个例子：

- “NVIDIA 总部在哪” —— 正确率高，因为 NVIDIA 这个词相对少见，每次出现基本都在聊公司信息；
- “Apple 总部在哪” —— 正确率反而低，因为 Apple 这个词太常见了，出现在各种语境里。

知识的“特异性”比单纯的重复次数更重要。

这个洞察让我想起之前做 RAG 时踩的坑：把一堆通用语料塞进去，结果模型对特定领域知识的记忆效果并不好。现在有理论依据了。

实验规模：24 个模型，几千次检索

为了验证这个指标，团队做了个工程量很大的实验：

- 检索了 21 个开源模型 + 3 个自训练模型的预训练语料（从 14M 到 176B 参数）；
- 用文档级检索，统计每条知识三元组的出现频率；
- 设计了“多模板评估”，每个问题用 20 种不同的问法测，消除 prompt 偏差。

结果是：SMI 预测 closed-book QA 准确率的 R² > 0.7（对 1B 以上模型）。

不用重新训练，只用预训练数据的统计信息，就能预测模型对某条知识的记忆情况。这个预测准确率，说实话比我预想的高。

天花板在哪？

但真正让我觉得"有点东西"的，是那张展示知识记忆上限的图。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/5PVbTxQrraKaQ3tFAx8uHFdRaD5icItcRibIGtBocbQerKWmxAlYyAgHoXHuMQlBMyZPBSaa9QNEe6dZf5ax0yebm1ju4kdUWRkEbcbzwhv2c/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

论文 Figure 3 里，即使 SMI 达到最大值 1，各个模型的 closed-book QA 准确率也就：

- BLOOM-176B：约 52.7%
- GPT-NeoX-20B：约 57.8%
- Pythia-12B：约 58.8%
- 他们自训练的 13B：约 63%

换句话说，你把数据重复一万遍、模型参数堆到千亿，closed-book 问答的正确率也就是 70%-80%出头。

这解释了好几个我之前困惑的现象：

为什么大模型直接回答的错误率很难压到 20%以下？

因为 50%-60% 正确率意味着错误率 40%-50%。再怎么 scale up，这个天花板就在那儿。

为什么 RAG 几乎成了标配？

因为预训练本身的记忆容量有上限，外挂知识库是打破这个天花板唯一可靠的方法。

为什么数学、编程这类任务需要万亿参数的模型？

论文里有个观点我挺认同：这类任务需要"记忆"大量的模式和解题路径，对记忆容量的需求远超普通知识。万亿参数不是为了炫技，是记忆容量不够真的不行。

一些直觉上的反直觉

论文里还有几个 case study 挺有意思。

比如有两条知识：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

共现次数不高，但准确率却不错。为什么？

因为当主体出现时，客体几乎 100%跟着出现。关联性极强。

反过来：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

共现次数极高，准确率反而低。因为 Paris 和 Ohio 这些词到处都是，“特异性”被稀释了。

数据的“信噪比”比单纯的量更重要。

这研究到底有啥用？

我理解可能有朋友会问：知道这个又能怎样？

我觉得至少有三个实际的用处：

1\. 预训练前的 ROI 估算

如果你知道某类知识在你的语料里出现频率低、特异性差，那在预训练前就能预判：花大力气让模型记住这类知识，可能不划算。不如直接规划 RAG 方案。

2\. 数据策略优化

论文证明了“特异性”的重要性。这给我们的启示是：与其堆量，不如提高领域数据的纯净度。让领域知识在语料里有更高的“存在感”。

3\. 解释行业现象

为什么各家都在卷万亿模型？为什么 RAG 方案几乎成了共识？为什么直接问答的准确率到不了 80%？这篇论文提供了一个统一的理论框架。

我的几点想法

看完这篇论文，我脑子里转了几个念头：

第一，Scaling Law 不是万能的。

过去几年，我们被“更大的模型、更多的数据”这个叙事深深影响。但这篇论文告诉我们：在某些维度上，scaling 的边际收益会迅速递减。

第二，参数化记忆有边界，非参数化方案是补位。

RAG 不是“可选项”，是在参数化记忆触及天花板后的必选项。这不代表预训练不重要，而是说预训练和检索各有各的生态位。

第三，数据质量的新定义。

以前说数据质量，我们想到的是准确性、格式规范。但这篇论文告诉我们：数据的“特异性”——知识在语料中的“辨识度”——也是质量的重要维度。

写在最后

张奇老师团队这篇论文，我觉得最大的价值是把一个模糊的直觉变成了可量化的指标。

“大模型记不住所有知识”这件事，从业者多少都有感觉。但能把它建模出来、用数据验证出来、还能预测具体某条知识的记忆概率，这是实打实的贡献。

论文地址：https://arxiv.org/pdf/2502.04066

代码和数据都已开源：https://github.com/yuhui1038/SMI

如果你在做大模型预训练、或者在评估 RAG 方案的必要性，这篇论文值得细读。

这不是一篇“模型越大越好”的论文，而是一篇告诉我们“边界在哪里”的论文。

知道自己做不到什么，有时候比知道自己能做到什么，更有价值。

【END】

👏欢迎小伙伴们关注，Enjoy 智能之境～

继续滑动看下一个

CSDN新程序员

向上滑动看下一个