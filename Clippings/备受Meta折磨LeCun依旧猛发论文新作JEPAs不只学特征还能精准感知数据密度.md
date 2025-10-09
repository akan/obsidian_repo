---
title: "备受Meta折磨，LeCun依旧猛发论文！新作：JEPAs不只学特征，还能精准感知数据密度"
source: "https://mp.weixin.qq.com/s?__biz=MzIzNjc1NzUzMw==&chksm=e9d7cc2e6a2c321abe6574b1c49f2d5b82a9b28085e869eb61f1e24137d3ccba3cbde23c62e2&idx=3&mid=2247830568&sn=0f80d0313c1f37bfe534854b5bf93eae#rd"
author:
  - "[[关注前沿科技]]"
published:
created: 2025-10-09
description: "仍然和三位FAIR同事合作"
tags:
  - "JEPAs模型"
  - "数据密度感知"
  - "自监督学习"
  - "反坍缩机制"
  - "JEPA-SCORE指标"
abstract: "LeCun团队发现JEPAs自监督模型在训练过程中能自动学习数据密度，无需额外训练即可判断样本常见程度。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/YicUhk5aAGtBwykSxHSp1CwmCJzBPKw8169qCtad0k8c8hcwnLetItnU0ibyfeJJhUnhjhzW642P0dZ54RIibKwHQ/0?wx_fmt=jpeg)

关注前沿科技 [量子位](https://mp.weixin.qq.com/) *2025年10月09日 12:49*

##### 闻乐 发自 凹非寺量子位 | 公众号 QbitAI

备受Meta审核规定“折磨”，依旧猛发论文！

表示可能要辞职的LeCun带着最新研究来了，仍然和三位FAIR同事合作。

Yann LeCun团队新论文发现了自监督模型 JEPAs （联合嵌入预测架构）的隐藏技能——

学会了数据的“密度” 。

这里的“数据密度”可以理解成数据的常见程度：密度高的样本是更典型、更常见的数据，密度低的是少见的、甚至异常的数据。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtBwykSxHSp1CwmCJzBPKw81RkkhdpgWXZJNsFNeWcbqD9CgBjQfs6kaV8ibiaUu6lMC83e7T0Vs5BZg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

JEPAs原本被视为 **仅擅长特征提取** 的模型，这次LeCun团队发现该模型在训练过程中悄悄掌握了感知数据常见程度的能力。

这就意味着，只要JEPAs训练成功了， **不用额外做什么，就能用它来判断一个样本的常见程度** 。

打破了学界长期以来“JEPAs仅学特征、与数据密度无关”的认知。

## 核心发现：反坍缩能精准学习数据密度

要理解这一新发现的突破，首先来说一下JEPAs。

###### △源自《A Path Towards Autonomous Machine Intelligence》图12

JEPAs作为LeCun团队近年重点推进的自监督学习框架，核心优势在于 **无需人工标注** ，模型就能自主从海量数据中学习特征规律，学完后就可以直接适配图像识别、跨模态匹配等下游任务，是AI领域高效学习的代表性模型。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtBwykSxHSp1CwmCJzBPKw81yhRtqh32wC1vgFUHIChWznbUEAdKiazKerkghAO80QonYXocruvNJ4w/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

此前学界普遍认为，JEPAs的训练只有两个核心目标：

- 一是latent空间预测。即给原始数据（如图像）做轻微扰动（裁剪、调色）后，扰动数据的特征表示（模型内部理解的数据形态）能从原始数据特征中精准预测；
- 二是反坍缩。防止所有样本的特征趋同一致。

而论文的新发现就是从反坍缩中得来。

如果所有数据的特征都一样，模型相当于白学，所以过去大家都将反坍缩单纯视为避免特征失效的保障手段，没有意识到它还有更深层的作用。

LeCun团队就聚焦于反坍缩的的隐藏价值，研究通过 **变量替换公式** 与 **高维统计特性** 推导证明， **反坍缩不仅能防止特征坍缩，更能让JEPAs精准学习数据密度** 。

从理论层面看，当JEPAs输出高斯嵌入（高维空间中近似均匀分布于超球面的特征）时，模型必须通过雅可比矩阵（反映模型对样本微小变化的响应程度）感知数据密度，才能满足训练时的约束条件，这意味着 **学习数据密度并不是偶然，而是JEPAs训练过程中的必然结果** 。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtBwykSxHSp1CwmCJzBPKw81yvc8q0kgPoibYKfyGCpR5sgF7ubicJxUDIaZVbkw9KoLnCPOcjeAg7yA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

为了让这种隐藏的密度感知能力落地实用，团队还提出了关键工具 **JEPA-SCORE** 。

这是从JEPAs 中提取数据密度的量化指标， **核心作用就是给样本的常见度打分** 。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtBwykSxHSp1CwmCJzBPKw81xdJ9ia6q1bbBuWT7YFEKIibPq5OmwicgjBXQokpGuUW4QkXEoEmRxia43A/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

根据公式来看计算逻辑简洁高效，只需要获取JEPAs处理目标样本时的雅可比矩阵，计算矩阵的特征值后取对数求和，得到的结果就是JEPA-SCORE，分数越高说明样本越典型（数据密度高），分数越低则样本越罕见或异常（数据密度低）。

更重要的是，JEPA-SCORE还具备极强的通用性，无限制适配， **既不挑数据集，也不挑JEPAs架构** 。

无论是ImageNet、手写数字MNIST，还是未参与预训练的陌生数据（星云图集），都能精准计算；

不管是I-JEPA、DINOv2（单模态视觉模型），还是MetaCLIP（多模态模型），只要是成功训练的JEPAs家族模型，都能直接使用，且无需额外训练模型。

为了验证这一发现的可靠性，团队还开展了多组实验。

在ImageNet数据集中，不同JEPAs模型对典型样本（如飞行姿态的鸟类）和罕见样本（如栖息姿态的鸟类）的JEPA-SCORE判定高度重合，证明这是JEPAs的共性能力，并不是某个模型的偶然；

面对未参与预训练的星系图像数据集，其JEPA-SCORE显著低于ImageNet数据，说明模型能精准识别陌生数据；

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtBwykSxHSp1CwmCJzBPKw81rUeNFXYtTFmj64NAgib65akkbnTxm2ecfL7RVuBn3NUykH92uicmiayibA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

而在数据筛选和异常检测的实用测试中，JEPA-SCORE的效果也优于传统方法。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

###### △数据筛选场景

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

###### △异常检测场景

## 研究团队

此次研究并非LeCun一人之功。

另外三位核心研究者也都是Meta FAIR的研究员。

**Randall Balestriero** 是布朗大学计算机科学助理教授，长期深耕人工智能与深度学习领域。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

2013年起研究可学习信号处理，他参与的技术曾用于NASA火星车火星地震探测。

2021年获莱斯大学博士学位，后进入Meta AI做博士后，师从Yann LeCun。

**Nicolas Ballas** 拥有法国格勒诺布尔大学博士学位。

2010年4月至9月，他担任了LTU Technologies的研发实习生，从事应用于图像检索的大规模聚类相关工作。

自2017年起，他在FAIR担任研究科学家，已任职超过8年。

**Michael Rabbat** 是FAIR的创始成员，拥有伊利诺伊大学厄巴纳-香槟分校的工程学士学位、莱斯大学的工程硕士学位，以及威斯康星大学麦迪逊分校的电气工程博士学位。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

他的研究方向聚焦于优化算法、分布式算法及信号处理三大领域。

加入Meta之前，Mike曾担任麦吉尔大学电气与计算机工程系教授。

*论文地址：https://arxiv.org/abs/2510.05949*

**一键三连** **「点赞」「转发」「小心心」**

**欢迎在评论区留下你的想法！**

— **完** —

  

****🏆**** 年度科技风向标 ****「2025人工智能年度榜单」**** **评选报名** **开启 啦** ！我们正在寻找AI+时代领航者 [点击了解详情](https://mp.weixin.qq.com/s?__biz=MzIzNjc1NzUzMw==&mid=2247824943&idx=1&sn=fe5b1e862916b886724ca1e85bbc6ea4&scene=21#wechat_redirect)

❤️🔥 企业、产品、人物3大维度，共设立了5类奖项，欢迎企业报名参与 👇

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**一键关注 👇 点亮星标**

**科技前沿进展每日见**

  

继续滑动看下一个

量子位

向上滑动看下一个