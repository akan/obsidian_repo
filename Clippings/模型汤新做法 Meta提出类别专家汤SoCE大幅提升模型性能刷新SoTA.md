---
title: "模型汤新做法！Meta｜提出“类别专家汤”：SoCE，大幅提升模型性能，刷新SoTA！"
source: "https://mp.weixin.qq.com/s?__biz=MzUzOTgwNDMzOQ==&chksm=fbed903e555deaf67d11f129442758877e46a857a7c4fa5a8119b0841977d4b7074d27274019&idx=1&mid=2247504644&sn=1625468d64d10a5211fa175a5af8a528#rd"
author:
  - "[[ShuYini]]"
published:
created: 2025-11-19
description: "Meta提出SoCE，刷新BFCL排行榜SOTA！"
tags:
  - "模型合并"
  - "权重优化"
  - "性能提升"
abstract: "Meta提出SoCE方法，通过非均匀加权合并专家模型，显著提升大模型性能并刷新SOTA记录。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/1BQYN3xneiaZaiaibpDcEDZ9JvvFA93aBQAsicoJ65YujYGcycCFvW85TeVVH888crXsC1iaHXQ7ZjjcVrJrrHX7OjA/0?wx_fmt=jpeg)

Original ShuYini [AINLPer](https://mp.weixin.qq.com/) *2025年11月18日 22:03*

## 点击下方“AINLPer“，添加关注更多干货，第一时间送达

更多精彩内容 -> [专注大模型、Agent、RAG等前沿分享！](https://mp.weixin.qq.com/s?__biz=MzUzOTgwNDMzOQ==&mid=2247502960&idx=1&sn=e938491c6253a6525ab37a9238111059&scene=21&token=646435429&lang=zh_CN#wechat_redirect)

## 引言

在当今的大语言模型（LLM）领域，似乎存在着一条不成文的铁律：想要更强的性能，就必须投入更多的算力、更大的数据量以及更漫长的训练时间。从GPT-4到Llama 3，每一次性能的跃升背后，都是数以千计GPU日夜轰鸣。如何低成本地提升模型性能成为了业界关注的焦点。传统的预训练（Pre-training）和全量微调（Full Fine-tuning）不仅消耗巨大的算力资源，且极其耗时。

为此，Meta提出一种新型模型汤技术： **「SoCE (Soup Of Category Experts)」** ![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/1BQYN3xneiaZaiaibpDcEDZ9JvvFA93aBQAyBROPQ7RgtcpG2Bfpqu3b0TjzlBIuicgdiaLZ4NVrfajm5EwxkQKwaew/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

论文： https://arxiv.org/pdf/2511.13254

代码： https://github.com/facebookresearch/llm\_souping

## 背景介绍

要理解这项研究的价值，我们首先需要审视当前大模型训练面临的困境。尽管基础模型（Foundation Models）已经展现出惊人的通用能力，但要让它们在特定领域（如数学推理、代码生成、工具调用）达到顶尖水平，通常需要经过监督微调（SFT）和基于人类反馈的强化学习（RLHF）。这一过程不仅资源消耗巨大，而且往往面临“灾难性遗忘”的风险——模型在学好数学的同时，可能就把写诗的技能给忘了。

为了解决这个问题，学术界引入了“模型合并（Model Merging）”或“模型汤（Model Souping）”的概念。 **「Model Souping（模型汤）」** 的概念由Wortsman等人于2022年提出，其核心思想是对多个微调模型的权重进行平均，以期望获得比单一模型更好的泛化能力 。其背后的直觉是：不同模型在损失曲面上可能收敛于不同的局部最优解，权重平均可以使模型落入一个更平坦、更鲁棒的极小值区域。

然而，现有的“煮汤”方法存在明显的缺陷。大多数研究采用的是“均匀平均法（Uniform Souping）”，即给所有参与合并的模型分配相同的权重。这种做法是假设所有模型贡献相等的做法，但实际上存在明显的理论缺陷： **「它忽略了模型能力的“正交性”与“特异性”。」**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/1BQYN3xneiaZaiaibpDcEDZ9JvvFA93aBQALVo2QbfDYrBbzS06BIFwmTsdRIicgXMbnZicLwnnRDSsCSriapeEwmwug/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1) **「类别专家汤（Soup Of Category Experts，简称SoCE）」** 。

## SoCE方法介绍

SoCE的核心逻辑不再是盲目的平均，而是基于对基准测试（Benchmark）的深度洞察，通过“基准成分分析”来挑选最佳候选模型，并应用非均匀加权平均来最大化性能。

SoCE的实施过程可以被形象地比作“组建一支全能特种部队”，主要包含三个关键步骤：

**「1、侦察与聚类，相关性的类别分析」**

算法需要识别哪些任务类别是“互补”的。对于基准测试中的任意两个类别 和 ，SoCE计算所有候选模型在这两个类别上性能分数的皮尔逊相关系数 通过计算皮尔逊相关系数（Pearson Correlation），本文作者绘制出了模型性能的热力图。结果显示，某些模型在“多轮对话”上表现优异，但在“实时函数调用”上却表现平平。这种低相关性（Low Inter-correlation）恰恰是机会所在——它意味着我们可以找到互补性极强的模型。

**「2、类别感知的专家选择」**

在识别出那些彼此之间技能互补（即相关性低）的任务类别后，SoCE算法会为每一个类别集群挑选出表现最好的“专家模型”。这避免了将那些在所有方面都平庸的模型纳入“汤”中，确保了原材料的优质。对于每一个弱相关类别 ，选择在该类别上性能指标 最高的模型 ：

这一步确保了参与合并的每一个“成分”都是某一领域的“专家（Expert）”，排除了那些在特定领域只会引入噪声的平庸模型。

**「3、“精密配比”，即权重优化」**

这是SoCE最“数学”也最精彩的部分。不同于以往的 ，SoCE 旨在寻找一组最优权重 ，使得混合后的模型 在整体性能上达到从优。

本文作者通过在权重空间（0.1到0.9的步长）进行搜索，找到了那个能让“数学专家”主导数学题、让“编程专家”主导代码题的黄金比例。从数学形式上看，这一过程不仅利用了简单的加权平均，还隐含了合作博弈论（Cooperative Game Theory）的思想。

本文作者甚至利用Shapley值（Shapley Value）来量化每个模型对最终结果的边际贡献，证明了经过SoCE筛选出的模型组合，比起随机或贪婪选择的组合，具有更高的团队协作价值。

### 实验结果

SoCE方法的有效性在多个高难度基准测试中得到了令人信服的验证，尤其是在衡量大模型工具使用能力的 **「伯克利函数调用排行榜（BFCL）」** 上，SoCE一举击败了包括原始模型和其他合并方法在内的所有对手。

在\*\*700亿参数（70B）量级的模型实验中，作者选取了xLAM-2-70b、CoALM-70B等四个顶尖模型作为对比。结果显示，SoCE方法的准确率达到了80.68% **![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/1BQYN3xneiaZaiaibpDcEDZ9JvvFA93aBQAerezjg4ermdOs5ysQgwYtUpaZ1wia12tWZdYK0YibWvU5vu0UdSFbcBg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)** 80亿参数（8B）的小模型赛道上，SoCE的威力更为惊人。它将准确率提升至76.50% **「，相比该量级下的原SOTA模型提升了整整」** 5.7%\*\*。这个数据意味着，通过巧妙的数学组合，8B模型在特定能力上甚至开始逼近更大参数量的模型。除此之外，实验还揭示了两个有趣的现象。

**「第一是“涌现能力”。」** 分析发现，当“汤”里的所有单一模型都无法解决某个特定任务时，混合后的SoCE模型竟然在8.4%的情况下成功解决了问题！这表明模型权重的融合在参数空间内创造出了新的、更优的解路径。

**「第二是“一致性增强”。」** 合并后的模型在各个子任务类别上的表现相关性显著提高，这意味着模型变得更加“稳健”，不再是一个偏科的天才，而是一个均衡的全才。

## 推荐阅读

\[1\] [新手必看！强化学习入门指南](https://mp.weixin.qq.com/s?__biz=MzUzOTgwNDMzOQ==&mid=2247504066&idx=1&sn=04c09ebe3b719de39d9337c1157c8a30&scene=21#wechat_redirect)

\[2\] [大模型(LLM)推理优化技术总结（非常详细）](https://mp.weixin.qq.com/s?__biz=MzUzOTgwNDMzOQ==&mid=2247504051&idx=1&sn=d736cc5c5aac64f7caff9772ef50e592&scene=21#wechat_redirect)  

\[3\] [大模型推理基准测试及评估指标](https://mp.weixin.qq.com/s?__biz=MzUzOTgwNDMzOQ==&mid=2247504028&idx=1&sn=1db360ad57565663c6890ecd47e4a71f&scene=21#wechat_redirect) ！

\[4\] [多智能体（Multi-Agent）开发必读指南！](https://mp.weixin.qq.com/s?__biz=MzUzOTgwNDMzOQ==&mid=2247503999&idx=2&sn=740478d62d653e0e63c1ee1cc898da62&scene=21#wechat_redirect)

\[5\] [Agent下一阶段：可自我进化的AI-Agent](https://mp.weixin.qq.com/s?__biz=MzUzOTgwNDMzOQ==&mid=2247503947&idx=1&sn=dc9a235a15c2c960d8e6e11937488240&scene=21#wechat_redirect)

\[6\] [众所周知！大模型应用构建面临的 6大误区](https://mp.weixin.qq.com/s?__biz=MzUzOTgwNDMzOQ==&mid=2247503909&idx=1&sn=834f85e705eaa9d49775ba7d95773468&scene=21#wechat_redirect)

欢迎投稿或寻求报道，联系：ainlperbot

**「资料整理不易，点个** ****再看**** **、** **赞** **吧 **」****

继续滑动看下一个

AINLPer

向上滑动看下一个