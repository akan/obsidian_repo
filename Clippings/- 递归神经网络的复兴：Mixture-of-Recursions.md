---
title: "递归神经网络的复兴：Mixture-of-Recursions"
source: "https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&chksm=c32323470600ae1379fe4b798b50fc930f3d8f8a4342ded930763da902158eeb671ff40854e5&idx=1&mid=2247495548&sn=87dd3f518c89602c9259c34fcc08e447#rd"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-07-18
description:
tags:
  - "递归神经网络"
  - "动态算力分配"
  - "语言模型"
abstract: "Google DeepMind研究者设计了一种能动态分配计算资源的语言模型，显著提升了性能。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/AE74ia62XricERKKIBzlwufQqxM6hNgEetYjqMic7HoJb8LVvcZia4EhnRCeRx0gs9eTzwBnfoEHeE6stIYIVYaX8A/0?wx_fmt=jpeg)

[PaperAgent](https://mp.weixin.qq.com/) *2025年07月18日 11:54*

近期，Google DeepMind研究者的一个工作引起了广泛讨论。

  

研究者们设计了一种很聪明的语言模型，它在处理一句话时，能像人一样判断哪些词更关键、需要“多想一想”（也就是进行更深度的递归计算）。

  

其次，它通过一个轻量级的“路由器”来决定让每个词在共享的网络模块里“循环”几次，对简单的词就少算几次，这样不仅让模型参数更少，也大大节省了计算资源。

  

最终的结果非常惊人：在同等训练成本下，这种“会思考”的模型表现显著优于传统模型，用更小的模型尺寸和更少的计算量，就达到了甚至超过了更大模型的性能。

  

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricERKKIBzlwufQqxM6hNgEetlBUDM4oQSemruEZQLrNYk5lcOkjRBB58nhGLC3aRm5VJFch1iaPMOjA/640?wx_fmt=png&from=appmsg&randomid=macke9iu&wxfrom=5&wx_lazy=1&watermark=1&tp=webp)

  

有海外研究者评论道：

  

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricERKKIBzlwufQqxM6hNgEetENXb9aF5xAZ8B5Hwf96wbZKhcsd5cwj36Sichvg9jTxBI0B7UQdOrgQ/640?wx_fmt=png&from=appmsg&randomid=f0v8d2wc&wxfrom=5&wx_lazy=1&watermark=1&tp=webp)

  

是否有其他思路来解决动态算力分配的问题呢？

  

我们使用秘塔深度研究：【传统Transformer模型的一个问题是针对每一个token消耗了固定的计算量，有什么其他的模型或算法是根据生成的难度动态进行算力分配的？】

  

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricERKKIBzlwufQqxM6hNgEety5zGNM7IDAnjSpT3zdjnv3Jd0JE8vWtYw4ngW05Wyev8A5hfFticgbg/640?wx_fmt=png&from=appmsg&randomid=dy8sgo3i&wxfrom=5&wx_lazy=1&watermark=1&tp=webp)

  
下面是它的研究过程，生成了动态“问题链”：

  

![图片](https://mmbiz.qpic.cn/mmbiz_gif/HtS5zy3JzODeSSeNIskLaeSOMwj5Ra81IlMdfBe8JibicDNsHqaS304fj0JcILfeILdt9eiaBAmfYVQXCQ1auXCwA/640?wx_fmt=gif&from=appmsg&randomid=laanu9sq&wxfrom=5&wx_lazy=1&tp=webp)

https://metaso.cn/s/6MxpcgU

  

从它的报告中，还能发现很多其他解决该问题的比较有意思的思路，比如：

- **《D-LLM: A Token Adaptive Computing Resource Allocation Strategy for Large Language Models》** 提出了一种根据token难度动态分配计算资源的机制，是目前少见直接对标“token-level算力分配”的工程方案，对推理效率影响很大。
- **《Mixture-of-Depths: Dynamically Allocating Compute in Transformer-Based Language Models》** 则来自DeepMind，和我一开始看的那篇Mixture-of-Recursions有异曲同工之妙——它也让每个token根据复杂度决定“走多深”，并从架构层面优化了整个计算图，很多细节值得深入对比。
- **《Leap-of-Thought: Accelerating Transformers via Dynamic Token Routing》** 给我另一个角度的启发：不仅可以在深度上动态分配，也可以在token路径选择上做智能“路由”，将token引导到不同计算分支上，从而节省整体推理资源。

下面是最终生成的互动网页报告：

  

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricERKKIBzlwufQqxM6hNgEetpicHjzy1RYDUdVyKUQr7fLmeQ4au7dKRaYHAf5jEDIpb2sMOficpEPCg/640?wx_fmt=png&from=appmsg&randomid=fzhmppmg&wxfrom=5&wx_lazy=1&watermark=1&tp=webp)

上下滑动可查看完整内容

推荐阅读

- • [动手设计AI Agents：（编排、记忆、插件、workflow、协作）](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247492838&idx=2&sn=1e25832e7300ef312721325d0def30b4&scene=21#wechat_redirect)
- • [DeepSeek R1 + Agent 的下半场](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247492838&idx=1&sn=9b9bf873261c9b2239b97b70effc441f&scene=21#wechat_redirect)
- • [单智能体（Agent）：企业员工AI助理](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247493278&idx=2&sn=ab698d56a22b8f70f6c8ad1db7495e4c&scene=21#wechat_redirect)
- • [Agent到多模态Agent再到多模态Multi-Agents系统的发展与案例讲解（1.2万字，20+文献，27张图）](http://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247485322&idx=1&sn=71ffb345fca514aa5ce2848cb2c9f071&chksm=c2ce3dfbf5b9b4edd5b98e45c6179890bdea748fb5220636d25f42006954ea5c81afa8735725&scene=21#wechat_redirect)

---

欢迎关注我的公众号“ **PaperAgent** ”， 每天一篇大模型（LLM）文章来锻炼我们的思维，简单的例子，不简单的方法，提升自己。

继续滑动看下一个

PaperAgent

向上滑动看下一个