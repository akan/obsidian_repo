---
title: "Google 新论文离谱到家了，0延迟0成本通用，提升大模型准确率最简单的方法。"
source: "https://mp.weixin.qq.com/s?__biz=MzkxNjcyNTk2NA==&chksm=c0c79a34e1ca51e8eb7aff69399bdf01e39bab5e61c11221ea4ca220e3ad071be6146c81cd0d&idx=2&mid=2247489404&sn=a95fae6cf0d13c286df85a84297c32c6#rd"
author:
  - "[[猕猴桃]]"
published:
created: 2026-01-13
description: "Google最近这篇论文有点火。一个很简单的提升大模型准确率的方法。 这么多年了，竟然没人发论文。"
tags:
  - "重复提示"
  - "提升准确率"
  - "零成本"
  - "零延迟"
abstract: "Google研究发现，将相同的提示词重复输入两次，可以显著提升大语言模型的准确率，且几乎不增加成本和延迟。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUniaInyetQf5vzWO3xicaQgKTHuSn3MyRxnDtbb1ibuib0nXlksSCibTRtowp7BD8vZf7iaSDqEtflaQ08gw/0?wx_fmt=jpeg)

猕猴桃 [探索AGI](https://mp.weixin.qq.com/) *2026年1月13日 11:51*

Google最近这篇论文有点火。

一个很简单的提升大模型准确率的方法。 这么多年了，竟然没人发论文。

非常离谱，就是重复提示词。 中文来说，就是 重要的话，说三遍。

从 <Query> -> <Query><Query> 把完全一致的输入，连续发2次就够了。

![Image](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUniaInyetQf5vzWO3xicaQgKTHZiayTP0oaUqVpKpYLZJsKianarl1H8jcu3B2p10NZCuSPrJyDX75J5cA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

语言模型是按顺序读取token的，开头的内容在处理时，根本没有完整的上下文支撑。到了第二次输入的时候，模型已经掌握了完整的信息，预测结果自然会更稳定、更准确。

主流模型都适用，论文做了很多测试，就算不开启推理模式，所有参与测试的模型性能都有提升。

70项benchmark测试，0场景效果倒退，47个场景准确率提升。几乎不增加延迟、成本，可以无缝集成现有系统。

https://arxiv.org/pdf/2512.14982

好了，这就是我今天想分享的内容。如果你对构建AI智能体感兴趣，别忘了点赞、关注噢~

[#llm](https://mp.weixin.qq.com/) [#google](https://mp.weixin.qq.com/)

  

继续滑动看下一个

探索AGI

向上滑动看下一个