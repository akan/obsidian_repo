---
title: "RLHF要下岗？Meta × 牛津搞出新套路：用算力教算力，大模型训练新范式来了！"
source: "https://mp.weixin.qq.com/s/IGfysvgWlDFRWWcJrAwPGQ"
author:
  - "[[让你更懂AI的]]"
published:
created: 2025-09-22
description: "算力变监督，学生一度跑赢老师！"
tags:
  - "算力监督"
  - "合成答案"
  - "自我提升"
abstract: "Meta与牛津大学提出Compute as Teacher框架，通过综合推理路径生成参考答案，实现模型自我监督训练，在数学和医疗任务上提升显著。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/VBcD02jFhgmiaKZOaxuVYibibjlTOUprrafR0udMTO3qLy8vaoAWtW7cHl5LGuQDL51VleahRCBFlTVjKrqAV6JkQ/0?wx_fmt=jpeg)

Original 让你更懂AI的 [PaperWeekly](https://mp.weixin.qq.com/s/) *2025年09月22日 14:17*

**在没有标准答案的任务里，大模型该向谁学习？**  

  
长期以来，我们依赖人类标注、LLM 判官或多数投票来为模型提供监督，但这些方式要么成本高昂，要么偏好明显，要么只能在候选里“挑最不差的”。

  

但如果—— **算力本身就能反过来提供监督，会怎样？**

Meta 与牛津大学最新提出的 **Compute as Teacher (CaT)** 框架，给出了一个大胆的新思路： **把推理时消耗的算力回收利用** 。模型在一次推理中生成多条 rollouts，再由锚点模型进行综合，产出新的“参考答案”，并进一步转化为奖励信号。

  

实验表明，这一方法在数学和医疗等任务上最高带来 **+30% 提升** ，甚至出现了“学生反超老师”的现象。它不仅是后训练的一次技术革新，更可能改写我们对监督信号的基本理解： **未来的监督，或许就来自模型自身的探索与综合** 。

  

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgmiaKZOaxuVYibibjlTOUprrafHot8whjibzBDAThY4EtE2ickBGZ6f8ia0VqyaezpL1UgRaEv0D2S6ZfyQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=14)

  

  

**论文题目：**

Compute as Teacher: Turning Inference Compute Into Reference-Free Supervision

论文地址：

https://arxiv.org/pdf/2509.14234

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/Psho9dm7oDGhKg9nnSz5qQrwKvXibt3wulOVRfC18yCkd6xXqGq22h6QUk8chptF0fnQ4uXeZtAktYMrWwG2SyQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=1)

研究背景：从“选择”到“综合”

在大模型的后训练实践中，研究者主要依赖三类监督信号：

  

1\. 有标注数据的监督微调（SFT） ，需要大规模人工标注；

  

2\. 可验证任务的程序化奖励 ，如数学答案匹配、代码执行；

  

3\. 替代性信号 ： 多数投票（Self-Consistency）、困惑度排序（PPL-based）、LLM 判官打分。

  

问题在于：

- SFT 标注稀缺，难以扩展；
- 程序化奖励只适用于有限场景；
- 判官 LLM 和投票机制，都存在稳定性差或“随大流”的问题。

  

于是，作者提出：与其从 rollouts 里“挑最好的”，不如把它们 **综合成更优答案** 。在多样化探索下，矛盾和差异反而能成为学习信号的养分。

![图片](https://mmbiz.qpic.cn/mmbiz_png/Psho9dm7oDGhKg9nnSz5qQrwKvXibt3wuhfgUpIfdPSqH8YjjHbCUiaaKsMA36bIMsMtGNKoBcus5py06M0fvx3A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=3)

把“并行思考”炼成“可学监督”

### 从“选择”到“合成”

CaT 的出发点是一个看似简单的问题：当模型一次性生成多条推理路径（rollouts）时，我们能否不只是“挑出最好的一条”，而是把这些路径 **综合成更优的参考答案** ？

  

设当前策略为 ，面对问题 ，它会生成 条回答轨迹：

  

  

  

这些 rollouts 有时相互补充，有时相互矛盾。传统方法往往在这里结束：通过困惑度排序（min-PPL）、自一致性投票（Self-Consistency）、或 LLM 判官打分来选一条。

  

而 CaT 引入了一个冻结的锚点策略 ，让它基于 做“信息调和”，产出新的参考回答 ：

  

  

其中 是综合提示词，要求锚点聚合差异信息，消解冲突，而不是简单复写。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

▲ 图1. CaT 总体流程。当前策略探索，锚点综合，得到参考答案并转化为奖励。  

  

  

值得注意的是， 看不到原题。这是一个关键设计：如果给它原题，它很容易“自己再写一遍答案”，而不是在已有 rollouts 之间调和。 **盲题综合迫使它必须依赖 rollouts 的差异，从而实现真正的“跨样本综合”。**

### GRPO框架下的CaT

  

CaT 的训练建立在 **Group Relative Policy Optimization (GRPO)** 上。对于每个 rollout ，目标函数为：

  

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

其中， 一般取 ，保证策略更新不过度偏离锚点。

*直观理解：它不是要求模型绝对最优，而是学会在一组候选里“比平均更好”。*

### 剪切式surrogate loss

  

在每个 token 上，采用 PPO 式的剪切 surrogate loss：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

其中 是策略比率：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

  

**更多阅读**

[![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=MzIwMTc4ODE0Mw==&mid=2247704923&idx=3&sn=335fcf533d802c8aad5653364d1bf5e1&scene=21#wechat_redirect)

[![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=MzIwMTc4ODE0Mw==&mid=2247704632&idx=2&sn=5eec091e5051cc8352f4e576eb71dd1a&scene=21#wechat_redirect)

[![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=MzIwMTc4ODE0Mw==&mid=2247702037&idx=3&sn=a22899db443d3a9c2b227f016ff7dbff&scene=21#wechat_redirect)

  

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**# 投 稿 通 道 #**

**让你的文字被更多人看到**

  

  

如何才能让更多的优质内容以更短路径到达读者群体，缩短读者寻找优质内容的成本呢？ **答案就是：你不认识的人。**

  

总有一些你不认识的人，知道你想知道的东西。PaperWeekly 或许可以成为一座桥梁，促使不同背景、不同方向的学者和学术灵感相互碰撞，迸发出更多的可能性。

  

PaperWeekly 鼓励高校实验室或个人，在我们的平台上分享各类优质内容，可以是 **最新论文解读** ，也可以是 **学术热点剖析** 、 **科研心得** 或 **竞赛经验讲解** 等。我们的目的只有一个，让知识真正流动起来。

  

📝 **稿件基本要求：**

• 文章确系个人 **原创作品** ，未曾在公开渠道发表，如为其他平台已发表或待发表的文章，请明确标注

• 稿件建议以 **markdown** 格式撰写，文中配图以附件形式发送，要求图片清晰，无版权问题

• PaperWeekly 尊重原作者署名权，并将为每篇被采纳的原创首发稿件，提供 **业内具有竞争力稿酬** ，具体依据文章阅读量和文章质量阶梯制结算

  

📬 **投稿通道：**

• 投稿邮箱： hr@paperweekly.site

• 来稿请备注即时联系方式（微信），以便我们在稿件选用的第一时间联系作者

• 您也可以直接添加小编微信（ **pwbot02** ）快速投稿，备注：姓名-投稿

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**△长按添加PaperWeekly小编**

  

  

🔍

  

现在，在 **「知乎」** 也能找到我们了

进入知乎首页搜索 **「PaperWeekly」**

点击 **「关注」** 订阅我们的专栏吧

  

·

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

PaperWeekly

向上滑动看下一个