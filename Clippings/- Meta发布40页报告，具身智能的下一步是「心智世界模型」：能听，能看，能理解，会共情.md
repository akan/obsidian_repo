---
title: "Meta发布40页报告，具身智能的下一步是「心智世界模型」：能听，能看，能理解，会共情"
source: "https://mp.weixin.qq.com/s?__biz=MzIzNjc1NzUzMw==&chksm=e9a6e1afbb9917f93f6514bf534465cda13af9fda61ba7bc5bef0bc04dc9be119f59af198255&idx=3&mid=2247809084&sn=b0f60dda27ef86ceac5f89f3d6a21a62#rd"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-07-10
description: "MetaAI又整“新活”：心智世界模型是独辟蹊径还是剑走偏锋？"
tags:
  - "心智模型"
  - "具身智能"
  - "物理世界模型"
abstract: "Meta发布报告提出心智世界模型，旨在让具身智能体理解人类心理状态，实现更高效的人机交互。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/YicUhk5aAGtACnoeCszYZw4C41YqtjK2mTvqxvlsCGibiboib786o1SZe4ppKuohvvAgUhQIkbUGjGafx5UN1XibH3w/0?wx_fmt=jpeg)

[量子位](https://mp.weixin.qq.com/) *2025年07月10日 11:19*

##### henry 发自 凹非寺量子位 | 公众号 QbitAI

最近Meta动作频频。一边是老板小扎亲自下场，豪掷一亿美金挖人。

另一边，自家具身智能研究同样也憋了个大的，40页长文报告。

除了LeCun老生常谈的世界模型外，最让人眼前一亮的就是：

这篇报告 **第一次把对人心智状态的推断，放到和物理世界模型（physical world model）同等重要的位置上** ，并将其概念化为 **心智世界模型（mental world model）** 。

相比于传统世界模型（如LeCun的JEPA）仅关注物理规律（物体运动、机械因果），心智世界模型则 **首次将心理规律（意图、情感、社会关系）纳入世界模型框架** ，实现“双轨建模”。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtACnoeCszYZw4C41YqtjK2mY6jd8icyZayFtndkVcI9nKcmkWGHx4BCQ0tlT2cZK8gODqeAWUuBrWw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

不得不说，Meta还是太超前了！

## 从物理世界模型到心智世界模型

众所周知，在Lecun的带领下，Meta对大模型颇有微词，在这次报告中也不例外：

大模型虽然很强，但太臃肿，缺乏效率，也缺乏抽象推理能力。

就像我们回家开门的时候，并不会在脑子里预测门下一秒的每个像素，而是会关注门的状态（开关）和钥匙孔的位置，并作出相应的动作，如找出钥匙，完成进门这项任务。

因此，要建构像人类一样的具身智能体，就需要世界模型从感知中抽象出有用的信息来理解环境，再进行推理、规划，采取行动。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtACnoeCszYZw4C41YqtjK2mWMicWVQKW8HBvSyw0C88YdcTnqSZMicIy7Eq2gqBkCvrcxpJx4wItrvw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

那么问题来了，什么才叫有用的信息呢？

这里，报告将世界模型所需要的信息分为了两类。一类是 **物理世界模型** 所需要的信息，其中包括：

> **物体及其属性** （例如：形状、大小、颜色）
> 
> **物体之间的空间关系** （ 例如：邻近性、距离）
> 
> **环境的动态变化** （例如：运动、时间上的变化）
> 
> **基于物理定律的动作与结果之间的因果关系**

另一类是 **心智世界模型** 所需要的信息，包括：

> **目标和意图** （包括其动机、偏好和价值观）
> 
> **用户的情绪和情感状态，以及理解这些情绪如何影响行为**
> 
> **捕捉社会动态，包括个体、群体和机构之间的关系，以及文化规范、习俗和期望**
> 
> **理解言语和非言语交流，包括语言、语调、肢体语言和面部表情**

物理世界模型的作用我们都很熟悉。比如知道牛顿定律，具身智能体就能预测未来环境中物体的运动。

例如，一支笔从桌边掉落将会做自由落体运动，智能体就需要在笔摔到地上前及时接住笔。

那为啥还需要心智世界模型呢？

对于人类来说， **心智世界模型就是对世界的心理表征的过程，包括对物体、事件和关系的表征。**

它使人类能够模拟情境、预测结果、进行反事实和因果推理，从而做出更明智的决策。

例如，我们说小明在汉堡店收到了一份烤糊了的汉堡，他气冲冲地离开了汉堡店，并没有交钱。

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/YicUhk5aAGtACnoeCszYZw4C41YqtjK2mIflkSyibALCSYn7Wficibias76ibkrCNzaziajkib0e1ovRNDXIq4E5Ce04PQ/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

那么根据心智世界模型，我们就可以合理推断，小明并没有吃下那份汉堡。

因此， **为了更好地协助和与人类合作，智能体就必须学习人类的心理状态** ，理解人类的行为模式和文化惯例。

为了实现这一点，就需要心智世界模型来表征人类用户或其他AI智能体的心理状态。

通过表征、理解这些心理状态，具身智能体就可以

> 预测用户的目标和意图，使智能体能够主动提供帮助或指导，帮助用户实现其目标推断信念差异，并预测持有错误信念的人该如何行动预测情绪反应，从而调整策略，更好的满足用户的需求

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtACnoeCszYZw4C41YqtjK2m00jQQxUtIPlO7oia1HzO8DYAZlujpbgbB1QeJ80TZBOmBUHQMxfEW2A/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

这将大大提高人机交互和多智能体交互的效率和舒适性。

那我怎么知道这玩意不会瞎猜心思，捣乱，帮倒忙呢？

对此，Meta设计了一系列的benchmark来测试具身智能体的性能。

可不幸的是，以目标推测为例，在第一视角多模态目标推理基准（Egocentric Multi-modal Goal Inference Benchmark）上，视觉-语言模型的成功率只有55%，远远达不到使用水平。

没错，路还很长。

## 世界模型的未来

虽然当下的表现很“惨淡”，但物理（心智）世界模型仍然是一个有前景的方向。

为了实现这一点，Meta在报告里指出：

要让AI具备真正的自主学习能力，必须把系统A观察学习（Learning by Observation）和系统B行动学习（Learning by Action）结合起来。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtACnoeCszYZw4C41YqtjK2mVysDia9icxOtPgQJT0YWNLYBSxCdYBK9ZLFr0jmlZBlgKYniaHxdqAl9A/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

系统A从大量感知数据中学习抽象表示（比如自监督或无监督学习）。

它的好处是能 **高效学习出通用、抽象的表征，对后续任务有帮助。**

但缺点是需要大量干净的数据，不知道自己该学什么，学到的东西也很难和实际行动结合，往往只能停留在“看懂”，不一定“用得上”。

系统B是通过探索和试错来学怎么做事，比如强化学习。

它的优点是和 **实际行为直接相关，能适应动态环境，也可能发现全新方法。**

但缺点是效率很低，需要大量试验才能学会简单任务，在复杂情况下容易卡住，还特别依赖明确的奖励信号，而现实里往往没有现成的奖励可用。

简单来说，系统A擅长从大数据中提炼知识，但不会“动手”；

系统B擅长探索和行动，但学习效率低。

**通过有效地整合两者，由系统 A提供抽象结构、先验和压缩表示，帮助系统 B高效规划。系统B则通过主动探索收集更优数据，为系统A提供实践验证。**

实现感知驱动行动，行动反过来丰富感知，推动AI系统的自主进步。

## One More Thing

尽管心智世界模型当前的表现仍显稚嫩，但它在多智能体协作中的潜力不容低估。

它为多智能体之间建立“共识心智”提供了理论支点：

**让每个智能体不仅看到外部世界，还能推测他人的信念和意图，形成比单一感知更高阶的理解。**

当不同的具身智能体共同执行任务时，心智模型能帮助它们在不确定的环境中对齐目标，协调行动，甚至在冲突中寻找平衡。

这也是让人机互动从机械执行迈向富有同理心和情境感的重要一步。

在这个意义上，心智世界模型或许不是一条轻松的路，但它为具身智能打开了通往更复杂社会化形态的入口。

*报告链接：https://arxiv.org/abs/2506.22355*

  

**一键三连** **「点赞」「转发」「小心心」**

**欢迎在评论区留下你的想法！**

— **完** —

  

专属AI产品从业者的 **实名社群** ，只聊AI产品 **最落地的真问题** 扫码添加小助手，发送 **「姓名+公司+职位」** 申请入群～

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtACXBaAPKiaAiavjgaxpA5e6VSqNT3LDEKTjblKVdC8bRlDFW4AuHtyibCs12QibQ86hD59XE8VadvouQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

进群后，你将直接获得：

👉 最新最专业的AI产品信息及分析 🔍

👉 不定期发放的热门产品内测码 🔥

👉 内部专属内容与专业讨论 👂

  

**🌟 点亮星标 🌟**

**科技前沿进展每日见**

继续滑动看下一个

量子位

向上滑动看下一个