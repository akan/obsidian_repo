---
title: "只要科学任务能打分，AI就能实现SOTA结果 | 谷歌最新论文"
source: "https://mp.weixin.qq.com/s?__biz=MzIzNjc1NzUzMw==&chksm=e9ace8d1a6ee8684ddc031f8d3e05628c9cce9b97cdfc4c13eaaea7f6b7ae794cf8e76044da9&idx=4&mid=2247825858&sn=697a73b67a88a390485b139568f643ec#rd"
author:
  - "[[关注前沿科技]]"
published:
created: 2025-09-15
description: "用LLM+树搜索，去大海捞针吧"
tags:
  - "LLM树搜索"
  - "实证软件"
  - "科学任务评分"
abstract: "谷歌开发了结合大语言模型与树搜索的AI系统，能自动生成超越人类专家水平的实证软件，在多个科学领域实现SOTA结果。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MG3MNiamkntKia9mnAzumvAG6ZsOS7lcb0g945fGsMlYqe9m4N1JQMG6Q/0?wx_fmt=jpeg)

关注前沿科技 [量子位](https://mp.weixin.qq.com/) *2025年09月15日 13:55*

##### 不圆 发自 凹非寺量子位 | 公众号 QbitAI

只要科学任务可以评分，AI就能找到超越人类专家的方法，实现SOTA结果？

这是谷歌一篇最新论文里的内容：

使用 大模型+树搜索 ，让AI大海捞针就行。

![Image](https://mmbiz.qpic.cn/mmbiz_gif/YicUhk5aAGtDlLFlRic3oze2CYozaGs51M8dt8wX1pUCxMMIjPggRFjia08srV5HSuhBoZhkcSLPIqdzOY3XVdcTA/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

他们还开发了一个 **帮助科学家编写专家级实证软件** 的AI系统。

该系统在生物信息学、流行病学、地理空间分析等领域发明的新方法，都达到了SOTA的水平。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MrfpMeCvqITQ5bNfJicLqqyB4w27Xkvj1WmVQjUYI4ia86qyYaiasiaAVicQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

网友表示：任何可量化的东西都将被AI征服。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MPAdNHAYrUJ21zyMgYRianneGHZNEw2w5Vnjjg59sQoB0VQIvMfLKV9g/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

这篇论文目前在X上获得了2.6K赞，引发了广泛的讨论。

让我们一起看看。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51M4YgNI0hFSY1aibQzvWcYRDJYWFFjkTtiakTMkzDLRzFI7q0VvicJNdlmw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

## 可评分任务在科学中无处不在

实证软件指的是以 **最大化可定义或可度量的质量指标** （通常指对现有观测数据的拟合度）为设计目标的软件。

如果一个任务可以用实证软件解决，就可以被称为可评分任务。

论文表示，他们构建这个系统主要是基于两个原因：

一方面，可评分任务在科学界无处不在。如今几乎每个科学子领域、应用数学和工程领域都依赖软件，其中大部分软件都是解决可量化任务的实证软件。

另一方面，科学实证软件的开发过程缓慢且艰难。特定领域的实证软件需要繁琐的工作，通常需要数年才能完成。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MjIX6wxZA2eqwlRcohPDAGB9eCcTrFumevnI6xYQp8UcWtmZA4fTeDQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

而这个新系统能够系统地 **自动创建实证软件** ，以解决可评分任务。

简单地说，该方法基于大语言模型（LLM），通过让LLM重写代码来提升软件的质量评分。系统首先生成大量的候选软件解决方案，然后运用 **树搜索算法** 筛选值得进一步优化的候选方案。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MrfpMeCvqITQ5bNfJicLqqyB4w27Xkvj1WmVQjUYI4ia86qyYaiasiaAVicQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

虽然代码变异系统的设计方式多样，但研究人员通过设计基于基础Kaggle竞赛基准的对抗测试，持续改进了该方法。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MYOxdAd8OCAGA8F4f4IR09icS9VMlZKxNpoCRpQyQico7rlWRiajsImXEw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

研究人员通过注入研究思想来增强代码变异能力——这些思想来源广泛，涵盖从高被引论文、专业教科书到搜索引擎结果等多个渠道。

在实际应用中，用户既可直接注入这些思想，也可通过搜索引擎自动获取文献研究成果。

LLMs在代码编写过程中会充分利用这些注入的指导信息。

![Image](https://mmbiz.qpic.cn/mmbiz_gif/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MhaFYLtyh0T2haUickw2CML5XibuZS2r3nXJ0sdEuP89qxibagSSgsT6BA/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

结果显示，该系统可广泛应用于科学领域的各类可评分任务，生成的软件性能超越了科学家开发的最先进水平。

这种超人类性能的实现，源于系统能够在前所未有的规模上、彻底且不知疲倦地进行解决方案搜索，从而发现“沧海遗珠”式的高质量解决方案。

在生物信息学领域，这个新系统发现了40种用于单细胞数据分析的新方法，在公开排行榜上超越了人类专家开发的最顶尖方法。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MSa2Uw9v8tviaduYrxY4ibic9mRRdORKJ1yYUXDOM7OphB3s8RXbUicPuow/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

在地理空间分析方法上，系统开发出的三个新方法在DLRSD基准测试上显著优于近期学术论文报道的结果，mIoU指标均突破0.80大关。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MJMSUQe0UXibfUIp786pvRGJibMibwDkOAY0zBcCk5MZwbGYPpSoP3ia08g/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=9)

在神经科学领域，斑马鱼活动预测基准（ZAPBench）上，该系统的解决方案有效地利用了跨神经元信息来生成预测，虽然没有超过表现最好的视频模型，但它与时序基线模型相比仍然具有竞争力，并且在训练速度上比表现最佳的视频模型快几个数量级。

*（这个基准Y轴越低越好）*

此外，在流行病学、时间序列预测、数值分析领域，新系统都能取得和人类顶级方法相当、甚至超越人类的结果。

总而言之，研究团队开发了一种新方法：把基于树搜索的代码变异系统和整合复杂研究思路的能力相结合。

这些研究思路可以来自已发表的论文、研究智能体，也可以是LLM已有思路和方案的组合。

网友评价：这种新方法正在为未来的AI创造更好的算法。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51Mq6Gm11HsMfia8ZJRIYLF9GhcsxxJeAfhgXgyUtnJ25gIB1icibjwWLTZA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=10)  
![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MsjY9T0p4OB8CC6EttibuRiaqMAk5KlrPGp1cUianmX5QCBXM0lzFVNCvQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=11)  
![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51Mrbru6I14dmPXJa4hfr45icH1eR5CcOx3OfwDkKXP8ia4oibfibkunzbsrA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=12)

但同样的，问题也随之而来：把科学研究的权限交给AI真的合适么？

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MBAjhr3bwGGKCH9htiaOEc3icVunqQia4y2GFoea477sRoCNM0lObSRvrQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=13)  
![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MVD6tu7NrQ9na7UUBM38L6NUo1SjepArqiam8ExWyvMpU9U92v91oiauw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=14)  
![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MOKkQothThtCYew0UqWPhRKlHNu3XFlj7lTP6OsIJ2sVnxeKMrlcQhA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=15)

## 顶尖的AI研究员也像我们一样使用提示

有细心的网友发现，在这篇论文里，研究人员使用的提示词和我们也没什么差别：

> 请创建一个算法，利用两种策略的优点，创建一个真正出色的混合策略，并且得分要高于任何一种单独的策略！！

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MdX346ibibnWlbUQXeGJVPTn6QgksfTXx3Rt8jTCrrZH5pWcS5ho6mLpw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=16)

全都用的都是大写字母，和中文里疯狂敲感叹号没什么差别。

网友笑评：就像答辩的前一周，简直火烧眉毛了。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MWQqTVN4h4cR4yEMbaqRdjyAuNS2xJoAqGWGrG1nzeXYu8wu9Wiclepw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=17)  
![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MYpH2BzzbDhoxSssiaTic4hM3TAbK3mZ8Psad6icrj2zxcpkrsT7WhZySQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=18)

也有网友表示这是一个很好的现象。它证明好结果并不总是需要复杂的指令，能够清晰表达需求就足够有效。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MK4w1nwibLdPoKO3QQdrOgqh1vt6EmsKw8kOG9A6sH1x8NouicF4VwG0g/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=19)  
![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MwEVLf0nfMGl9phFwYmiabhRenVvHNLXtVY2aQhey9R3KDw7qiah61IQA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=20)

创造力才是进步的核心。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDlLFlRic3oze2CYozaGs51MJibxPYpEeJf9vibVeZAO0g7YRg49mFia0jWnYPKWVxkXqyeXjharjG2uw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=21)

*参考链接：*  
*\[1\]https://x.com/arankomatsuzaki/status/1965253577221587218*  
*\[2\]https://x.com/deedydas/status/1965468238483235015*  
*\[3\]https://google-research.github.io/score/*

**一键三连** **「点赞」「转发」「小心心」**

**欢迎在评论区留下你的想法！**

— **完** —

  

****🏆**** 年度科技风向标 ****「2025人工智能年度榜单」**** **评选报名** **开启 啦** ！我们正在寻找AI+时代领航者 [点击了解详情](https://mp.weixin.qq.com/s?__biz=MzIzNjc1NzUzMw==&mid=2247824943&idx=1&sn=fe5b1e862916b886724ca1e85bbc6ea4&scene=21#wechat_redirect)

❤️🔥 企业、产品、人物3大维度，共设立了5类奖项，欢迎企业报名参与 👇

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/YicUhk5aAGtBhuhOn9BaSMicdhmzSkqqUiaMtibX2GxRIicb8VjJYnsY8DYEurtJyPY8jQsicJkbsEwafvkXDePHVlvA/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=22)

**一键关注 👇 点亮星标**

**科技前沿进展每日见**

  

继续滑动看下一个

量子位

向上滑动看下一个