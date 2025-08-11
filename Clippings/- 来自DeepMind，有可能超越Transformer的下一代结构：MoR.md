---
title: "来自DeepMind，有可能超越Transformer的下一代结构：MoR"
source: "https://mp.weixin.qq.com/s/THRjTltNDQa0GH8kiIQtRQ"
author:
  - "[[miraclezcc]]"
published:
created: 2025-08-11
description: "最近，DeepMind提出了一种名为 Mixture-of-Recursions (MoR) 的新型Trans"
tags:
  - "DeepMind"
  - "MoR"
  - "Transformer"
  - "参数效率"
  - "自适应计算"
abstract: "DeepMind提出新型Transformer框架MoR，通过参数共享和动态递归深度优化计算效率。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/h18HVbhicuxD6IqcmJSWktGA37dKSVv0OD5N9Huia1iahbYd9Dd8j7KyuLUb5yEYIJibYZgBhkaicV9zUA9N4tnPTHw/0?wx_fmt=jpeg)

Original miraclezcc [奇思妙想AI](https://mp.weixin.qq.com/s/) *2025年07月16日 13:54*

最近，DeepMind提出了一种名为 Mixture-of-Recursions (MoR) 的新型Transformer框架，旨在同时实现参数效率和自适应计算，从而在不牺牲模型质量的情况下降低训练和推理成本。MoR基于递归Transformer（Recursive Transformer），通过共享层栈和动态token-level递归深度来优化计算和内存使用。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/h18HVbhicuxD6IqcmJSWktGA37dKSVv0OibNSGgU1G3iciaNlRlxfLgvhAibVbOicJOMCbNiarQxd6tB5X0NXtRp1m6bA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

1\. 统一参数共享与自适应计算的框架

创新：MoR将参数效率（通过层共享）和自适应计算（token-level动态深度）整合到一个单一的递归Transformer架构中。不同于传统Transformer的固定深度层栈，MoR重复使用共享的层块（recursion block），并允许每个token根据其“思考”需求动态选择递归次数（最多 ( N\_r ) 次）。

关键机制：引入轻量级路由器（router），从头端到端训练，以分配token-specific递归深度。这避免了传统早期退出方法的后期微调需求，并实现潜空间推理（latent reasoning），即在生成每个token时进行内部“思考”。

优势：参数量减少（通过共享），计算仅分配给需要深层处理的token，统一了效率的两个轴（parameter sharing 和 adaptive computation）。

2\. 动态路由策略（Routing Strategies）

Expert-choice routing：每个递归深度视为“专家”，路由器选择top-k token继续处理（分层过滤），确保静态计算预算，但需辅助损失（auxiliary loss）或路由器缓解因果违规（causality violation）。

Token-choice routing：在开始时为每个token分配固定递归深度，避免信息泄漏，但需平衡损失（balancing loss）或无损失算法处理负载不均。

创新：路由器从预训练开始学习动态路径，支持token-level自适应“思考深度”，不同于固定递归的先前工作。实验显示expert-choice在性能上优于token-choice。

3\. 高效KV缓存策略（KV Caching Strategies）

Recursion-wise KV caching：仅缓存当前递归深度活跃token的KV对，限制注意力仅在这些token间计算，减少内存IO和注意力FLOPs（可降至原模型的 ((N\_r + 1)/2N\_r) 倍）。

Recursive KV sharing：从第一次递归重用所有KV对，专为减少预填充（prefill）延迟和内存设计，尤其适用于长上下文。

创新：这些策略与动态递归结合，实现递归级KV缓存，减少内存访问瓶颈，支持连续深度批处理（continuous depth-wise batching），提升推理吞吐量（最高2.06x于baseline）。

4\. 参数共享策略的优化Middle-Cycle

策略：保留首尾层独特参数，中间层循环共享（cycle sharing），实验证明其在各种规模下性能最佳（优于纯Cycle、Sequence等变体）。

创新：通过ablation研究优化共享策略，确保递归模型在参数减少（约1/3）时保持竞争力。

5\. 经验验证与Pareto前沿

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

结果：在135M-1.7B参数规模下，MoR在相同训练FLOPs下参数更少、验证损失更低、少样本准确率更高（平均+0.8-1.2%），推理吞吐量更高。isoFLOPs分析显示MoR在>360M规模上超越Vanilla Transformer，形成新的效率-性能Pareto前沿。

分析：MoR支持测试时缩放（test-time scaling，通过增加递归深度提升质量），路由深度反映token语义重要性（e.g., 内容词需更多递归）。

可扩展性：计算最优缩放（compute-optimal scaling）显示MoR更青睐模型大小而非训练长度，适合大规模部署。

整体影响与局限

贡献：MoR首次在单一架构中统一参数共享、token-level自适应深度和高效KV缓存，实现大模型质量的小模型成本。代码开源于GitHub。

局限：当前实验限于1.7B参数；未来可扩展到多模态、推理任务，或与稀疏算法结合。

潜在应用：高效LLM预训练/推理，尤其在资源受限环境中。

---

*🌟 欢迎关注【奇思妙想AI】🌟*

*👋 亲爱的朋友们，欢迎来到【奇思妙想AI】的世界！这里是一个充满创意与智慧的乐园，我们致力于为你带来最新、最有趣、最实用的AI知识和科技资讯。无论你是AI小白还是技术达人，这里都有你感兴趣的内容！🤖💡*

  

个人观点，仅供参考

继续滑动看下一个

奇思妙想AI

向上滑动看下一个