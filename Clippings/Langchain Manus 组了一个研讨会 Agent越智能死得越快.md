---
title: "Langchain 、 Manus 组了一个研讨会：Agent越智能，死得越快！"
source: "https://mp.weixin.qq.com/s?__biz=MzkxNjcyNTk2NA==&chksm=c0e2519e71224722f083555c470221275eda8cea20eceb216f96d67ce41e037c82ba920e8399&idx=1&mid=2247488449&sn=c069df6d420ec917d8727f1ab424f6fc#rd"
author:
  - "[[猕猴桃]]"
published:
created: 2025-10-27
description: "嘿，大家好！这里是一个专注于前沿AI和智能体的频道~"
tags:
  - "Agent性能"
  - "上下文管理"
  - "智能体架构"
abstract: "文章讨论了Agent智能体在过度使用上下文时会导致性能下降的问题，并介绍了压缩、分层架构等解决方案。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUngXGeIGYBpEb9RvKy1WMr1V7SwrpU1mJ036mOjuwNGwvd1fu1P7iaIcOmekY6xeutLibFEricuvjswfQ/0?wx_fmt=jpeg)

猕猴桃 [探索AGI](https://mp.weixin.qq.com/) *2025年10月27日 11:50*

嘿，大家好！这里是一个专注于前沿AI和智能体的频道~

最近，Langchain 的工程师 Lance Martin 和 Manus 的创始人Peak 季逸超 进行了一次关于Agent的研讨会，信息量有点大，整理了一些结论分享一下。

![Image](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUngXGeIGYBpEb9RvKy1WMr1VBpADTOibdvbdjL8CLbOC5QVKQZic1ekgyeBwoE1yibAiaYMvfOLEF4HB3w/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

一个现实：Agent越智能，死得越快。

问题出在哪？

Agent会疯狂调用工具，每次调用都会把结果塞进上下文里。

Manus提到他们一些任务需要50次工具调用，Anthropic说生产环境的Agent对话能跑几百轮。

结果就是，上下文像滚雪球一样越滚越大，最后开始出现 Context Rot，模型重复输出、推理变慢、质量下降。

这就是个悖论： **Agent需要大量上下文才能工作，但上下文越多性能越差。**

现在的解决方案基本就五招：

Offload、Reduce、Retrieve、Isolate、Cache。

分别对应了，文件系统、总结/压缩、语义召回、Sub-Agent、缓存。

因为大家太熟概念了，就不展开这几点了。

Peak分享了个很有意思的点： **Compaction（压缩）≠ Summarization（总结）** 。

压缩是可逆的，比如写文件操作，完整版有path和content两个字段，压缩后只保留path，因为内容已经写进文件系统了，需要的时候再读回来。总结是不可逆的，信息会永久丢失。

![Image](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUngXGeIGYBpEb9RvKy1WMr1VyqmFO7SibspU3FWQJNib1qodC5mDcxUTyyiaKuN5qicib9wzLgsUyjtcszw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

所以Manus的策略是：先压缩，压不动了再总结。而且总结的时候必须用完整数据，不能用压缩版，否则信息损失会叠加。

![Image](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUngXGeIGYBpEb9RvKy1WMr1ViaFUWicCTz6qibYrVQTNyIfPibyKBicx6yI1GSxL275ytrVuPM7DaaZJv5g/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

一个趋势是，Agent 用一组较少的通用工具，这些工具使Agent能够访问计算机。

比如说，用 Bash 工具和几个访问文件系统的工具，就可以执行各种任务了。

所以Manus做了一个分层架构，外层只有不到20个原子能力。

将大多数的操作卸载到sandbox层。可以命令行调用，MCP通过CLI接入，可以写python脚本调用第三方API。

![Image](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUngXGeIGYBpEb9RvKy1WMr1VsxBuIyDlDLD80QjKQQ2oWrqcqTdUBqYwTqh6GrNZiaYugXFzPJN8dcQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

Manus最大的进步不是加功能，而是删功能。

过去七个月，每次简化架构，系统就变得更快、更稳、更聪明。

因为Context Engineering的目标不是让模型更复杂，而是让模型的工作更简单。

小心Context Over-Engineering（上下文过度工程化）。

Agent的上下文工程不是堆砌技巧，而是做减法的艺术。

Manus不做多角色Agent（什么设计师Agent、程序员Agent），因为那是人类公司的组织架构，是人类上下文能力的局限导致的。

AI为什么要模仿人类的限制？

他们只有三个Agent：通用执行Agent、规划Agent、知识管理Agent。就这么简单。

所以说，别再让Agent被自己的上下文撑死了。做减法，trust the model a little more。

![Image](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUngXGeIGYBpEb9RvKy1WMr1VFU53WklgZicGaGjqySYibTiaebYdnP3GyCXgD0rfBbBibFsq0I064vP1aQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

## 最后

视频在这里：https://www.youtube.com/watch?v=6\_BcCthVvb8

langchain的ppt在这里：https://docs.google.com/presentation/d/1Z-TFQpSpqtRqWcY-rBpf7D3vmI0rnMhbhbfv01duUrk/edit?slide=id.g38aedf7fc8c\_0\_0 [#slide](https://mp.weixin.qq.com/) =id.g38aedf7fc8c\_0\_0

manus的ppt在这里：https://drive.google.com/file/d/1QGJ-BrdiTGslS71sYH4OJoidsry3Ps9g/view

好了，这就是我今天想分享的内容。如果你对构建AI智能体感兴趣，别忘了点赞、关注噢~

  

继续滑动看下一个

探索AGI

向上滑动看下一个