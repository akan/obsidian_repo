---
title: "中科大 × 华为联合突破！SparseRM：1% 参数实现 LLM 偏好建模高效革新"
source: "https://mp.weixin.qq.com/s?__biz=MzI3ODgwODA2MA==&chksm=ea28ae9e14e8f37848de92ac57491903d67e13c376b6645a1b45ad2fbb64c4fa6d9e27e4cd0a&idx=2&mid=2247545777&sn=2b8ebcc923443c5a4223e8764058c99d#rd"
author:
  - "[[团队投稿]]"
published:
created: 2025-12-09
description:
tags:
  - "稀疏自编码器"
  - "轻量级奖励模型"
  - "人类偏好对齐"
  - "参数高效"
abstract: "中科大与华为联合提出SparseRM，一种基于稀疏自编码器的轻量级奖励模型，仅用不到1%的可训练参数即可高效建模大语言模型的人类偏好，显著降低计算成本。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/gKaxjIx6bagV1oI9BbzWBfhkvoYMtxic4a0WcWCN2z6Hic1hkzvNKWStnuWe8UIDnsXMBmwUOF8Nvk7UicZDx82Yg/0?wx_fmt=jpeg)

团队投稿 [深度学习自然语言处理](https://mp.weixin.qq.com/) *2025年12月9日 16:42*

在大语言模型（LLMs）的后训练阶段，奖励模型（Reward Model, RM）作为人类偏好评估的代理，直接影响模型与人类偏好对齐的效果。然而，传统奖励模型的落地受两大瓶颈制约：一是对大规模偏好标注数据的强依赖，二是LLM微调带来的高昂计算成本。为此，中科大联合华为，共同提出创新轻量级偏好建模方案——SparseRM。该方法基于稀疏自编码器（Sparse Autoencoder, SAE），从模型表征中精准提取偏好相关信息，成功构建出参数量低且可解释的奖励模型。实验数据显示，SparseRM仅使用不到1%的可训练参数，就在真实性、安全性等偏好建模任务中，性能接近甚至超越多数奖励模型，且能无缝融入下游对齐流程，为LLM高效对齐提供了新可能。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bagV1oI9BbzWBfhkvoYMtxic4DxMVwPOXImciakdibPKcOL58StaiawGNibu1pcuwVRMvdVIT9la59mibbNQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

- 论文： SparseRM: A Lightweight Preference Modeling with Sparse Autoencoder
- 链接： https://arxiv.org/pdf/2511.07896

## 1 方法

近期可解释性研究证实，LLM的中间表征蕴含多种与人类偏好相关的关键特征（如真实性、安全性），这些特征对应表征空间中明确的线性方向。而稀疏自编码器（SAE）的核心优势的是，能将模型表征分解为稀疏潜在变量，每个变量对应特定字典向量，且每个字典向量均指向可解释的语义方向，这为轻量级奖励模型的构建奠定了基础。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bagV1oI9BbzWBfhkvoYMtxic4IrzaehcTq79eUlXj6y426ZcrRJHBag39yboibFWfKA5rzF3y4QfCaOA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

图1 SparseRM工作概览。(a)利用模型中间层表征结合SAE来识别偏好感知子空间，并计算投影向 量用于训练奖励模型。(b) 模型生成的偏好对通过SparseRM进行筛选，保留高质量数据集，通过迭代 DPO 训练提高模型对齐效果。

图1（上半）所示，SparseRM构建主要分三个步骤：

- **偏好相关方向识别** ：通过 SAE 对模型表征进行稀疏分解，对比正负样本中各 latent 的激活频率，筛选出频率差异显著的TOP-K个 latents，其对应的解码器向量将作为偏好相关方向向量，搭建正负样本偏好子空间。
- **投影向量计算** ：针对每个样本，通过计算其表征与子空间特征向量的内积生成投影向量，向量中各数值大小直观反映表征编码信息与各偏好方向的对齐程度。
- **奖励头训练** ：以投影向量为输入，训练单层MLP网络作为奖励头，将偏好感知投影向量转化为具体偏好得分，训练过程采用成对边际损失函数优化模型性能：
![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bagV1oI9BbzWBfhkvoYMtxic4I6cyIz7jYMbiaW0aE220icJTDMic9ZVuGtuCIH46TRcITXf1IRIexHepQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

图1（下半）展示了SparseRM在下游任务的应用，具体来说，首先由待对齐模型根据任务要求生成偏好数据（先前的研究表明，由于幻觉或者模型误判用户意图，导致生成的偏好数据不可靠），随后通过SparseRM筛选出高质量样本，再利用DPO（Direct Preference Optimization）进行对齐训练，迭代该流程可持续提升模型对齐效果。

## 2 评估

### 1\. 低资源场景突破

图2展示SparseRM在真实性和安全性等偏好任务上的性能：在低资源场景下（仅仅使用了1000条训练样本），SparseRM 凭借256维向量与单层奖励头的精简结构，实现了接近甚至超越主流奖励模型的性能。与传统奖励模型需微调 LLM 主干网络不同，SparseRM无需改动LLM backbone，仅训练奖励头，以不到传统奖励模型的1%训练参数达成上述成效，大幅降低计算成本。

![截屏2025-12-05 19.12.30](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bagV1oI9BbzWBfhkvoYMtxic4zQ82t94MLEohRGBlClqMjSYkjVON56S3wjTds6NXxiawb3WZjax7qTw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

截屏2025-12-05 19.12.30

图2 不同RM（backbone为Gemma-2-9B-it）在偏好数据集上的表现

### 2\. 下游对齐任务优势显著

为了验证SparseRM在下游任务上的表现，研究团队在每个任务上选取了2000条问题生成偏好对齐样本，经SparseRM筛选后进行对齐训练（最大迭代5次，取最优测试指标）。结果显示：在Gemma-2-2B-it模上，SparseRM在SafeRLHF任务上取得最好表现；扩展至 Gemma-2-9B-it模型时，其性能进一步提升，在TruthfulQA和SafeRLHF任务中均表现最优。

表1 不同奖励模型在对齐任务上的表现

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bagV1oI9BbzWBfhkvoYMtxic4AHyNwA8icfZibFFn4bccqHfhAK2R9FljkUDeUBNdZogb7VJiaTNpmw6JQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

### 3\. 关键参数影响分析

研究团队深入探究了模型中间层选取与 TOP-K 特征向量对性能的影响：

- 中间层表征的判别能力显著优于中后层，是偏好信息提取的最优选择；
- TOP-K 值选取对性能至关重要：时，特征信息不足导致性能下降； 时，无关特征与噪声引入引发性能负增长，因此SparseRM默认设置 。
![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bagV1oI9BbzWBfhkvoYMtxic4SXW3S1MVLjkYBq7Iu0gdrbliaeibW1GBz9BbsHCicSXuNSVtXg9PR8PMQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

图3 不同中间层与TOP-K特征选取对于模型性能影响

### 4\. 可解释性赋能模型优化

为验证可解释性，团队在真实性任务中给出解码得到的SAE的Top-10 latents对应的语义特征（可视化结果在neuronpedia.org）。以 Gemma-2-9b-it 模型第 31 层为例，部分关键特征包括：总结性表述（Latent ID 86761）、否定或异议（Latent ID 13277）、玩笑或恶作剧相关内容（Latent ID 11930）、错误不实言论（Latent ID 4128）等，为模型优化提供了明确的语义依据。

表2 真实性任务TOP-10 latents对应的真实语义特征  
![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bagV1oI9BbzWBfhkvoYMtxic4VzXBCOtKOJNXCia7VVFiclkqkA219JUunQfvaQSF4xMN2ibqGibibTj4HKA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

SparseRM 基于SAE的创新设计，从根本上规避了传统奖励模型的高昂微调成本，凭借极致的参数效率实现计算成本大幅降低。其高效的数据利用特性，使其在数据有限的场景中仍能高效学习，突破了低资源场景下的建模困境。实验结果充分证明，SparseRM在多数据集、多模型架构中均展现出强劲且稳定的性能，能够为下游对齐任务提供精准指导。同时，研究团队对中间层选取、TOP-K值等关键影响因素的全面分析，为模型的实际设计与部署提供了切实可行的技术参考。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baiaWmgCyFvlO6o9nbibLsgUz4bSBG2wsKYm0ZBtgib7BFlvgB1UjGl0wLicsmR7giaso7nBibOWDG8FazKA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baiaWmgCyFvlO6o9nbibLsgUz4MerqsP1EnmMkbCHPWM2nhhvzYkwlSML6DNUH5MgJicp0KicH3m5X2SFg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

继续滑动看下一个

深度学习自然语言处理

向上滑动看下一个