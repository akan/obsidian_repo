---
title: "英伟达4B小模型击败GPT-5 Pro！成本仅1/36"
source: "https://mp.weixin.qq.com/s?__biz=MzIzNjc1NzUzMw==&chksm=e993e9e3e37073ebf9cea316dab449f1fee560adbae0aae1381f558b01fced9b025bda9c9a40&idx=3&mid=2247852220&sn=75ec24e8a15628952a5014c36b43762a#rd"
author:
  - "[[关注前沿科技]]"
published:
created: 2025-12-09
description: "每任务仅需20美分"
tags:
  - "小模型"
  - "成本优势"
  - "合成数据"
  - "测试时微调"
abstract: "英伟达团队通过大规模合成高质量数据与测试时微调技术，使一个4B参数的小模型在ARC-AGI 2竞赛中以更低成本击败了GPT-5 Pro等大模型。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/YicUhk5aAGtAzYhQaums4kcZ2EWOm3PwBDHQwUnyBUiaqMjvVFscdbH3MYCve71NzN1Uv08XiaicMo9Xwsly5LTK2g/0?wx_fmt=jpeg)

关注前沿科技 [量子位](https://mp.weixin.qq.com/) *2025年12月8日 14:05*

##### 闻乐 发自 凹非寺量子位 | 公众号 QbitAI

英伟达小模型持续获胜。

ARC-AGI 2最新成绩，4B小模型 **NVARC** 以 **27.64%** 的公开榜成绩力  压GPT-5 Pro 18.3%登顶榜首。

且每任务成本仅20美分，大约是GPT-5 Pro单任务成本（超过7美元）的 1/36。  

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAzYhQaums4kcZ2EWOm3PwBCEmiaWzRALx4XFUTg0dWu8n3EbLnCU26DEibLianYUpK60f6pEe4EIY9g/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

据官方分析，此次NVARC夺冠的亮点在于 **零预训练深度学习方法**  ，没有依赖大规模通用数据集进行前期预训练，  规避了预训练模型的领域偏见、数据依赖等问题。

而ARC-AGI 2确实是一个消除了与公共训练数据重叠的更高难度测试，  主要是看测试模型能否高效地获取超出其训练数据的新技能。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAzYhQaums4kcZ2EWOm3PwBH0Vqwtv55IhBWfJHOmXEDM5uZGMQVu7gZhWqibVmLS88xcgpL3uiaDtw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

成绩出炉后，官方访谈到了NVARC团队的Jean-  Francois Puget和Ivan Sorokin，进行技术剖析。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAzYhQaums4kcZ2EWOm3PwBnWnTo9WkaIXPRVYQbG2pIeeoBcLojtM8aQU7ISERTwdrILp57OzJeg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

快来看看“性价比之王”是如何“练”成的？

## 不靠参数堆料

英伟达的策略是将复杂推理移至离线的合成数据管道，  训练能在评估时快速运行的较小模型。

简单来说就是 **大规模合成高质量数据** ，然后对现有模型进行优化，  并且 **将昂贵的计算工作转移到离线进行** 。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAzYhQaums4kcZ2EWOm3PwBexDLN42XdGHtbAQd2du3Q61lxuticKVZLZbUmBzsFATibd9jD5LeFjZQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

由于Kaggle比赛对计算资源限制非常严格，团队意识到，  他们不能直接使用那些需要超强算力的大型LMM来进行复杂的、  一步一步的推理和代码生成。

因此他们改变了思路，决定将最烧钱的计算工作转移到离线完成。  比如利用 **GPT-OSS-120B** 来大规模制作高质量的合成谜题  。

团队从H-ARC、  BARC数据集中搜集了现有的ARC谜题数据，  然后将简单的谜题混合起来，生成更复杂的新谜题。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAzYhQaums4kcZ2EWOm3PwBVDQC3IfU57XOkA1nxgEz1kms8KJsOP5R4ZxH35nnIPxvbmpjWYfkuw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

为了确保数据质量，他们将复杂的推理管线拆分成不同的阶段，每个阶段都可以独立验证。

通过这种方式，他们建立了一个含320万+  增强样本的合成数据集，其中每个样本最多有7对输入/输出。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAzYhQaums4kcZ2EWOm3PwBdE5iaKVXJWgoic64NGCibZ8ts7rDwQXmrB3gfxicyViaSpYvCkwUXJgDyRw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

这里 忍不住提一嘴，哈萨比斯刚强调了Scaling Law的重要性，那么合成数据的Scaling怎么不算呢（doge）？  

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAzYhQaums4kcZ2EWOm3PwBEtoEoEkZWsCWv2trnGQoACgh7GZwefMLXoMNYUjJ4bib1f3nzgtFTKw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

言归正传，  NVARC核心的推理模块以改进版ARChitects方法为  基础，选用小参数模型 Qwen3-4B ，  通过对话式模板简化谜题理解。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAzYhQaums4kcZ2EWOm3PwBXerNjn0Ok4q0Q7hm6K5icib1X8wsd0XPtso1K9f6Ipia6BMn6PlaXOU1g/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

训练时借助NeMo RL框架和Megatron后端进行监督微调。  

不过，让模型取得优异成绩的关键一步在于 **测试时微调** （TTFT）  。

针对ARC-AGI-2“每个任务都是全新规则”的特点，  NVARC引入了 **LoRA微调技术** ，  并且是针对每一个问题都进行微调，让模型在做题前快速适应。

而对ARChitects方法的改进在于解码阶段DFS算法做了  批处理优化，修复结果非确定性问题。

同时统一了8种数据增强操作评估候选解，  最终在公开榜获得了27.64%的分数。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAzYhQaums4kcZ2EWOm3PwBXV3HCeu6icKgjdWGJc99yT8fEofyJahzicqrx80qUic4FjbUs8rnjwBkw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

在竞赛后期，团队还应用了“少即是多”的 **TRM** 方法，  尝试与Qwen3-4B集成补充分数，虽然有一定提升，  但受各种限制并没有大幅优化。

那么问题来了，有人会说这样训练出来的小模型不就是做题机器吗？  哪里比得上全面发力的超级大模型？

但更值得关注的或许不在于模型本身，而在于实现突破的方法。

在特定领域任务中，小模型经过针对性优化，性能并不逊色，  再加之成本、速度、适配性与领域聚焦优势，  它们已经在诸多场景崭露头角。

将正确的方法用在正确的地方，将会实现更大的价值。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAzYhQaums4kcZ2EWOm3PwBoC497ul7tuw1KB9lbJfHPg5dmlVJLvyJ89SHic1dzQZgsx8I4nyx5OA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=9)

借用这位网友所说，模型或许应该被设计得更加“敏捷”。

*论文地址：https://drive.google.com/  file/d/  1vkEluaaJTzaZiJL69TkZovJUkPSDH  5Xc/view*  
*参考链接：*  
*\[1\]https://developer.nvidia. com/blog/nvidia-kaggle-  grandmasters-win-artificial-  general-intelligence-  competition/  
\[2\]https://arcprize.org/blog/  arc-prize-2025-results-  analysis  
\[3\]https://www.kaggle.com/  competitions/arc-prize-2025/  writeups/nvarc*

**一键三连** **「点赞」「转发」「小心心」**

**欢迎在评论区留下你的想法！**

— **完** —

  

**🔊** **锁定12月10日周三** ， AI圈一年一度绝对不容错过的盛宴马上就要来了—— **MEET2026智能未来大** **会** 。 👉 [了解详情](https://mp.weixin.qq.com/s?__biz=MzIzNjc1NzUzMw==&mid=2247850539&idx=1&sn=34fb7e226b74c561354f0cbff716bb60&scene=21#wechat_redirect)

📍 重磅GenAI对话+前沿Agent圆桌，深挖年度最热议题

📍 近三十位来自学术界、产业界与前沿创业一线的重量级嘉宾

📍 「人工智能年度榜单」与「年度AI趋势报告」正式发布

一键报名线下参会 ，一起来AI认知跨年 ❤️🔥

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/YicUhk5aAGtBRInWg2e028YtEJdPwIMbGYwfLl4Z0scEaSsAD2noWltMhHZibsNOISu8BjfOyVLMt28MwvWD7Bcg/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=10)

****🌟 点亮星标 🌟****

**科技前沿进展每日见**

  

继续滑动看下一个

量子位

向上滑动看下一个