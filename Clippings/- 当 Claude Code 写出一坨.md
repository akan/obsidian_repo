---
title: "当 Claude Code 写出一坨"
source: "https://mp.weixin.qq.com/s/QX77T4mnKPO6WuO53WNBAw"
author:
  - "[[红煤球]]"
published:
created: 2025-08-22
description: "用 subagents，但如果它可能也救不了这一坨，你就只能靠自己"
tags:
  - "subagents"
  - "代码审查"
  - "重构"
abstract: "使用subagents避免Claude Code产生代码混乱，并在必要时通过人工阅读和重构来补救。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ol5wPNzWjs5bWF3Ox5ykhXw2V0C7TaWiaZGICgCiaR7PBEnrt8AYXNibU2elm7gibvMuEg7AflJwoskftGxfOXiaJYQ/0?wx_fmt=jpeg)

Original 红煤球 [球行叽](https://mp.weixin.qq.com/s/) *2025年08月21日 00:04*

## 避免——start with subagents

首要是避免出现屎山！

如果项目复杂，只让主线程（claude命令打开后的输入框）CC 完成需求只有两种结果：一是你在每次/clear或者/compact（上下文耗尽时自动进行）后重复告诉CC必要的背景知识，以避免它跑偏；二，当然是它跑偏。

让主线程 CC 只关注主要任务。比如你要实现一个 happy path（一个完整具体的从访问到结算的场景），过程中所有的功能实现、测试都是细节。而细节是 subagents 要负责的。要从开始告诉主线程主要任务，以及明确告诉它调用可用的、合适的 agents 来完成细分任务，不要自己上 ["Claude Code 最佳实践"的实践(2/3)](https://mp.weixin.qq.com/s?__biz=MzI4NTQ5MTY0Mg==&mid=2247483831&idx=1&sn=31f73af1ed62f17f3e81a6ab85d17ea4&scene=21#wechat_redirect) 。这样，你的对话框看起来会更整洁，CC 和你的脑子都会比较清晰。比如这是我今天项目中的一个截图：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/ol5wPNzWjs5bWF3Ox5ykhXw2V0C7TaWia6zn0T2oOU2aF72se0iaiaXGgfialWO9ECWFg5tfIe5sjgYd1zOibhM1K3A/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

理想情况下，主线程只是维护一个待办清单。

但agents 需要先准备好才行。可以看这个 Repo：https://github.com/wshobson/agents 。把里面所有的.md文件都放到项目或者家目录的./claude/agents 下就可以了。

> 这个Repo 的 Readme 值得仔细阅读，包括 commands （通过斜杠命令快速多个 agents 来完成一个任务）用法也值得参考。

> agent 本身，可能需要你根据自己的技术栈迭代。比如 agents 中只有一个 frontend-developer。你可以搜 NextJS cursorrules，找到看起来更全面更对口的文件内容来替换这个 agent 的内容。毕竟都只是提示词，叫法不同而已。

## 补救——读代码

subagents 的执行过程默认折叠，这让对话框看起来清爽，但不能第一时间发现问题。今天让 agents 们工作，睡了一觉回来看到同一个认证功能被实现了两份，同一个数据调用在api/ 和 lib/data 下各写了一份——尽管我已经在 CLAUDE.md 中强调优先用服务端 fetch。此外还实现了几个很完善、但MVP 阶段完全没有必要的功能。

好在多 agents 也快速耗光了 token，必须等待重置。我也就能心安理得的好好读代码——自从超前消费买了这个coding快消品，总感觉不写代码就是浪费。然后跟大部分时间赋闲在一边的 cursor 一块改代码。

从被喷到现在直接被无视的cursor，有 GPT5 加持其实又快又准（可能用户少了也是原因之一？），远没有网络上说的不堪。一番讨论下来，删除了一堆文件，又逐行精修了一些。思路清晰了不少。没有瞅着一个个代码文件心里烦躁的感觉了。

告诫自己，有屎山前兆，马上停下来，读代码。

明确产品目标，梳理关键路径，逐个路径调试不会是浪费时间。独立开发想长期运营一个产品，不管是用哪家 AI来写代码，自己早晚还是要读完每一行代码的。

> 提高读代码速度也是要练的功夫。

  

继续滑动看下一个

球行叽

向上滑动看下一个