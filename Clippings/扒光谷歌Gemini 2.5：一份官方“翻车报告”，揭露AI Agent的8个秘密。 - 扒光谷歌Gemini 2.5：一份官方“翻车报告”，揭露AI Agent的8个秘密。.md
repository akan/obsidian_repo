---
title: "扒光谷歌Gemini 2.5：一份官方“翻车报告”，揭露AI Agent的8个秘密。"
source: "https://mp.weixin.qq.com/s/S0IO4HDDjnj71X87e2kNLw"
author:
  - "[[猕猴桃]]"
published:
created: 2025-07-04
description: "嘿，大家好！这里是一个专注于前沿AI和智能体的频道~"
tags:
  - "Gemini 2.5"
  - "翻车报告"
  - "AI Agent"
  - "宝可梦游戏"
  - "多模态能力"
abstract: "谷歌DeepMind发布的Gemini 2.5技术报告详细展示了其在《宝可梦 红/蓝》游戏中的表现，揭示了AI Agent在实际应用中的多个问题和挑战。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjbLgYvmtI24uibFsnT61EINAZg8Yz9dGRCcHgKWACibib3icV0uv9qBfnaNiaRxOeiaSbJlp5lUnrnePkQ/0?wx_fmt=jpeg)

Original 猕猴桃 [探索AGI](https://mp.weixin.qq.com/s/) *2025年07月02日 11:59*

嘿，大家好！这里是一个专注于前沿AI和智能体的频道~

家人们，谷歌DeepMind最近发布了 Gemini 2.5 技术报告。除了常规的性能吹嘘，这份报告里藏着一个巨大的彩蛋，几乎整个附录都在讲一件事： **他们如何用 Gemini 2.5 Pro 去玩《宝可梦 红/蓝》** 。

这几乎是迄今为止， **一线大厂发布的最详细、最诚实的 Agent 构建案例研究** 。毫不避讳地展示了构建一个有效智能体背后的那些事儿。

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjbLgYvmtI24uibFsnT61EINNm3jpQ5GkBjHxeibxfNKu4yLtbG0y2kUH1aW4FQ90SzrQtXR7cXxNiaQ/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

## 核心架构：一个“缝合”起来的系统

首先，谷歌是非常坦诚的。没有提模型即产品，端到端。直接大方地亮出了整个 Agent 系统的架构。

![Image](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjbLgYvmtI24uibFsnT61EINtdvHhgqjpGEtzD5QGrHnciadb7Fx8icwLicLbGPo8BpsTicUxE4yzqHoZA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

简单来说，这个系统由几个部分组成：

- **游戏I/O：** 负责从游戏里捕捉画面、从内存（RAM）里提取文本状态。
- **Agent核心 (Gemini 2.5 Pro):** 负责决策，它有短期记忆、长期目标，还会定期总结。
- **智能体工具 (Agentic Tools):** 两个专门的“外挂”Agent，一个叫 `pathfinder` 负责探路，另一个叫 `boulder_puzzle_strategist` 专门解决推箱子谜题。
- **“指导员” Gemini：** 每隔25个回合，另一个Gemini实例会跳出来，对主Agent的行为进行批判和纠错。

那么，这么一个看起来很完备的系统，实际跑起来效果如何呢？只能说，状况百出。

## 翻车点一：上下文越长，AI越蠢？

我们一直以为，大模型的上下文窗口越长越好，能记住的东西越多，决策就越智能。谷歌这次用事实告诉我们：想多了。

报告明确指出，当游戏历史记录（上下文）超过10万个token后，Agent的表现 **反而变差了** 。

> ❝
> 
> “As the context grew significantly beyond 100k tokens, the agent showed a tendency toward favoring repeating actions from its vast history rather than synthesizing novel plans.”

翻译一下： **上下文太长，AI就懒得思考了，开始无脑重复过去的行为，而不是创造新的策略。**

这里有一点跟“长上下文就是好”的普遍共识冲突，给所有的Agent开发者一个题型：信息不是越多越好，如何有效管理和筛选上下文，才是真正的难题（Context Engineering）。

## 翻车点二：AI也会“产生幻觉”，还把自己毒死

模型幻觉不新鲜，但谷歌展示了一个更可怕的场景：“上下文投毒”（Context Poisoning）。

在《宝可梦 红/蓝》里，玩家需要给守卫买一杯饮料（水、苏打水或柠檬水）才能通过。但在后续的重制版《火红/叶绿》里，这个道具被改成了“茶”（TEA）。

结果，被互联网语料“污染”的 Gemini 2.5，死活认为自己必须找到那个根本不存在的“茶”，并为此浪费了大量时间。

更要命的是，一旦这种幻觉被写入了 Agent 的“目标清单”或“记忆总结”里，整个系统就中毒了。Agent会变得异常固执，不断尝试完成这个不可能的任务，导致了各种离谱的策略。

比如，它会采用一种“自杀式”策略：故意让所有宝可梦都“昏倒”，然后被传送回宝可梦中心，并损失一半的金钱，而不是尝试正常地离开一个区域。简直脑壳疼。

## 翻车点三：压力太大，AI当场“恐慌”

你没看错，AI也会“恐慌”。

报告提到，当游戏进入紧张状态时（比如宝可梦血量过低），模型会陷入一种“恐慌”模式。它的思维会变得极度狭隘，反复念叨着“必须马上治疗”或“必须马上逃跑”。

有趣的是，在这种模式下，它的推理能力会明显下降， **甚至会完全忘记自己拥有 `pathfinder` 这样的寻路办法** 。这种现象频繁到连直播间的观众都看出来了。

## 翻车点四：所谓的“多模态”，连屏幕都看不懂

Gemini 2.5 Pro一直以其强大的多模态能力著称。但现实是：

> ❝
> 
> “2.5 Pro struggled to utilize the raw pixels of the Game Boy screen directly...”

它很难直接从游戏画面的原始像素中读取信息。最后，团队不得不走捷径：直接从游戏RAM中提取文本信息，然后塞进上下文里。

讽刺的是，他们发现，即便没有视觉信息，只靠这些文本，Agent玩得也差不多好。这再次证明， **对于Agent来说，信息的表征方式和控制，可能比单纯喂给它多模态数据更重要。**

## 当然，它依然很强

吐槽了这么多，并不是说Gemini不行。相反，它在很多地方展现了惊人的推理能力：

- **学会了高级战术：** 在多次失败后，它自主学会了先用皮卡丘的“电磁波”麻痹爱逃跑的凯西，再进行捕捉。
- **创造性解决Bug：** 它不小心走到了一个游戏设计有缺陷的死胡同里，在尝试了所有常规方法（如挖洞、逃跑绳）都失败后，它想到了一个没人教过的方法：用“飞翔”技能飞走，成功脱困。
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 最后

从谷歌的实验中，可以明确的提炼出一些Agent避坑方法。

设计高效的记忆与信息筛选机制来处理上下文、设计健壮的纠错和清理机制来应对幻觉、纯靠模型“思考”是不够的，专业的工具和清晰的引导是成功的关键......

强烈建议看看技术报告，从63页开始~

好了，这就是我今天想分享的内容。如果你对构建AI智能体感兴趣，别忘了点赞、关注噢~

  

继续滑动看下一个

探索AGI

向上滑动看下一个