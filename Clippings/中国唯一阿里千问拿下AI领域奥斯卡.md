---
title: "中国唯一，阿里千问拿下AI领域“奥斯卡”！"
source: "https://mp.weixin.qq.com/s/viJ2fwDTz4nxzHTRRdS4zg"
author:
  - "[[热爱科技产品的]]"
published:
created: 2025-12-02
description: "从谷歌、微软和OpenAI等全球顶尖公司突围"
tags:
  - "注意力机制"
  - "门控"
  - "Transformer"
abstract: "阿里通义千问团队在NeurIPS 2025上凭借一项为Transformer架构添加“智能阀门”的创新研究获得最佳论文奖，解决了模型注意力浪费的问题，提升了训练效率和长文本处理能力。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/grpYJtsDdzKKhQRCYicmOK0jM4ibkibeqibzf29h8Y9Q5LWId95QwbNpEfgqMibWoYRwnQyxKfks5WUDLj1tzmK3y8A/0?wx_fmt=jpeg)

Original 热爱科技产品的 [硬评测](https://mp.weixin.qq.com/s/) *2025年11月28日 21:03*

  

  

点击 上方 蓝字 关注我们

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/grpYJtsDdzKKhQRCYicmOK0jM4ibkibeqibztIewHdCANw8zwdusYFmuFsgrxGg06KuOMc0mDd4LZT5nJHnJzHFJRA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

给大模型加上了一道智能闸门~

**硬评测**

作者 | Kozmon

编辑 | Yumz

NeurIPS（神经信息处理系统大会），AI领域的“奥斯卡”。

2017年，Google在这里发布了Transformer，奠定了大模型时代的基石。

八年后，NeurIPS2025的聚光灯，聚焦到了一个中国团队身上。

全球2万多篇投稿，最终获评“最佳论文”的仅有4篇，入选率低于0.02%。而阿里通义千问团队，拿下了其中一席，也是本届唯一获此殊荣的中国团队， 包括谷歌、微软、OpenAI等顶尖科技公司均未获奖。

阿里这次获奖证明，中国大厂已不再满足于应用层的创新，而是开始动手修改AI地基里的“承重墙”。

作为长期关注AI的观察者，我通读了这篇论文，发现通义千问团队做了一件极具美感的事： 通过给大模型装了一个“智能阀门”，可以解决一个困扰行业多年的“先天缺陷”，并且将最佳方案开放给全球研究人员。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/grpYJtsDdzKKhQRCYicmOK0jM4ibkibeqibzdianEzCxmPPRRGkCnxiaUTYB0zPeAAybtIP9viafaXicWzm00tZ9aiaxFwg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

这意味着， 来自中国的团队开始在AI底层架构的空白处，写上自己的代码。 NeurIPS官方还特别指出： 这项工作将被广泛应用，并极大推动AI研究人员对大语言模型中注意力机制的理解。

某种意义上，我觉得，这也标志着中国AI，正在从“大力出奇迹”的追随者，转变为“精细化创新”的先行者。

## 01

  

## Transformer里藏着一个“偷懒的学生”

论文一作邱子涵揭露了一个反直觉的现象：现有的Transformer架构，像个“偷懒的学生”。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/grpYJtsDdzKKhQRCYicmOK0jM4ibkibeqibz2KQpXyNia3IYLib7ibqn4bK2pD7T92aG3LPic9l7mKA8kRjqe5ZSkOXVQQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

推理时，Soft max函数强制要求注意力总和必须为1。如果当前上下文全是废话，为了凑数， 模型被迫把大量注意力——在很多层级中接近50%——死死盯着序列的第一个Token（通常是无意义的开始符）。

这不仅仅是浪费，更是隐患。

这种机制导致了“Massive Activation”（异常巨大的激活值），当这些无意义的数值在网络中疯狂传递，会导致训练时的Loss（损失）曲线像过山车一样剧烈波动。

在半精度（BF16）训练下，这种数值溢出甚至能直接搞崩一个耗资数千万的训练任务。

## 02

  

## 给大模型装个“智能阀门”

面对这个顽疾，Qwen给出了一个非常优雅的解法： 在注意力机制（SDPA）输出后，加了一个Sigmoid门控（Gate）。

这个操作相当于给每个注意力头装了一个“智能水龙头”，带来了两大超能力：

- 非线性（Non-linearity）： 打破了线性映射的“低秩”瓶颈，提升了模型表达能力的上限。
- 稀疏性（Sparsity）： 这是核心。门控会自动判断：“信息重要吗？”重要则通过，不重要则关死阀门，数值归零。

效果非常明显。

实验数据显示，加上门控后， 首个Token的无效注意力占比从50%骤降至5%以下。

那个“偷懒”的现象消失了。因为有了阀门，模型不再需要盯着第一个字凑数。它被迫变得诚实，去关注真正有价值的上下文。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 03

  

**效率即护城河：**

**从 “ 暴力美学 ” 到 “ 精密计算 ”**

在最新报道中，美媒CNBC提出，相比美国巨头的疯狂烧钱，中国巨头正在用一种“更高效”的方式追赶。

阿里这篇论文就是铁证。

我们来看看，这张让我感到无比兴奋的 Loss Curve（损失曲线）对比图。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

传统训练中，如果把学习率（Learning Rate）调大一倍，模型往往会直接崩溃。但加了“门控”的Qwen模型？ 稳如泰山。

消除了“Massive Activation”后，模型内部数值变得极其温和。这意味着：

- 容错率更高：同样的算力，可以采用更激进的训练策略。
- 速度更快：更大的学习率=更快的收敛。
- 成本更低：减少训练崩溃（Loss Spike），省下的电费和折旧费就是真金白银。

我想，这就是为什么NeurIPS评审委员会评价这项工作“将被广泛应用”—— 它解决的不是玩具问题，而是工业级大模型训练的痛点。

## 04

  

**更长情，更懂你**

这项技术，已经应用在刚刚开源的 Qwen3-Next 模型中。

除了更聪明（PPL下降0.2，MMLU提升2个点）外，它还带来了一个意想不到的红利： 卓越的长文本能力。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

论文发现， 门控机制让模型在不进行额外长文本训练的情况下，就能通过外推完美处理超长文档。

原理很简单：以前的模型靠“死记硬背”注意力陷阱来处理长度，一旦文章变长，陷阱就失效了。

而Qwen的门控是动态的——实时决定看哪里。

这意味着，处理几万字的财报或代码时，Qwen3-Next比传统模型更不容易“走神”或“遗忘”。

## 05

  

## 结语

2017年，《Attention is All You Need》教会了模型“看哪里”；

2025年，阿里的《Gated Attention for LLMs》教会了模型“别把注意力浪费掉”。

我们习惯了中国AI在应用层的繁荣，但阿里通义千问在NeurIPS的这次突围，展示了质的变化——

中国团队开始在AI底层架构的空白处，写上自己的代码；中国AI，正在从“大力出奇迹”的追随者，转变为“精细化创新”的先行者。

从这个角度上说，Qwen3-Next的这个“智能阀门”，调节的不仅是信息流，更是中国AI通往AGI的加速度。

**硬评测**

  

\* 感谢阅读！

\* 转载、合作、交流请留言，线索、数据、商业合作请加微信：KMGGGG98

\* 欢迎大家在留言区分享您的看法， 如果您能点个👍并分享的话，那就太感谢啦！

\* 让我们一起，好奇地看世界👇

作者提示: 个人观点，仅供参考

继续滑动看下一个

硬评测

向上滑动看下一个