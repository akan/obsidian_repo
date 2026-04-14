---
title: "00后国人一作再发Nature：大模型新任务表现如何，现在能精准预测了"
source: "https://mp.weixin.qq.com/s/3HAepE-ABsJ7qNqTjO6V4g"
author:
  - "[[让你更懂AI的]]"
published:
created: 2026-04-13
description: "18维通用标尺，跨任务预测大模型表现"
tags:
  - "大模型评估"
  - "能力量化"
  - "预测框架"
abstract: "一项发表于《Nature》的研究提出了一种名为ADeLe的通用评估框架，通过量化大模型的18项核心能力，能够以约88%的准确率预测模型在新任务上的表现。"
---
Original 让你更懂AI的 *2026年4月2日 13:53*

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 我们很难预判大模型面对新任务会不会出错。这项刚登上 Nature 正刊的研究，终于给出了精准预测的量化标准。

一位 00 后国人学者，刚刚再次以第一作者的身份登上《Nature》正刊。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/nFNzd9xjFeDRHIxJBeXR905rNPvsIRGXibx1npiciblWjZoA2bl0ePI7DpClfpxENVcOEHY0Ou7eTibh2ju64J8ZDRyFHA6nOH8FticL3fH2xicGQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

这篇论文尝试解决目前人工智能领域最棘手的问题之一：我们如何知道一个模型到底能做什么，以及它在面对新任务时会不会“翻车”？  

Lexin Zhou 联合普林斯顿大学、剑桥大学以及微软亚洲研究院等机构，为大模型评估带来了一套全新的通用范式。

这套方案最大的看点，在于它同时具备了解释性和预测力。

论文的一作 Lexin Zhou 对很多人来说并不陌生。2024 年，他曾在《Nature》发文指出大模型在 Scaling 过程中的不可靠性。

两年前的研究指出了现有评估体系的盲区，而这一次，他带着这套能解释、可预测的全新标准回归，尝试从根本上重构我们对大模型能力的评估方式。

![Image](https://mmbiz.qpic.cn/mmbiz_png/nFNzd9xjFeBUfgGb4EdKbqZFdAs8G6RyQYFYiaehrrxe4n8ky1h7w4CX1PRmIekS0kkHyMerg3o1T7lN9hTvgkzibo1HJzrtGu9ib99eDoUw14/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

论文标题：

General scales unlock AI evaluation with explanatory and predictive power

论文链接：

https://www.nature.com/articles/s41586-026-10303-2

项目主页：

https://kinds-of-intelligence-cfi.github.io/ADELE/

代码链接：

https://github.com/Kinds-of-Intelligence-CFI/ADeLe-AIEvaluation

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

量化大模型的真实能力

面对不断发布的新模型，现有的基准测试通常只能提供特定数据集上的得分，难以说明大语言模型底层的真实能力。

这些分数也无法跨任务迁移。模型在法律考题上获得高分，并不能保证它可以处理复杂的代码逻辑或日常办公需求。

为解决评估标准碎片化的问题，研究人员借鉴了心理测量学中的项目反应理论（IRT），提出了 ADeLe 通用评估框架。

该方法不再将评估视为孤立的测试集合，而是将其拆解为注意力、推理、领域知识等 18 项核心能力。任务的具体需求和模型的内在能力，都被统一放进这套 0 到 5+ 级的量表中进行打分。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

〓 ADeLe 核心逻辑：将任务需求与模型能力量化匹配

借助这套体系，研究人员能够为任务和模型分别构建清晰的能力画像，直观呈现不同大语言模型在各项基础维度上的长短板。

随着任务复杂程度逐渐上升，当需求超越了模型在某项特定能力上的供给水平时，评估系统就能清晰地解释模型表现是如何随着难度增加而变差的，并准确定位具体在哪个环节开始出错。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

〓 15 款主流大语言模型的能力画像

这项研究在实际应用层面的突破在于跨任务的泛化预测能力。

实验数据显示，基于提取出的能力得分，该框架对 GPT 等主流大语言模型在全新任务上的表现预测准确率达到了约 88%。

这意味着在实际投入应用前，开发者无需进行大规模盲测，就能提前预判模型在特定场景下的成功概率。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

〓 支持约 88% 预测准确率的特征曲线

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

从发现不可靠到实现预测

在两年前发表的《Nature》旧作中，研究人员已经发现，随着大语言模型规模的扩展和对齐技术的加深，它们反而变得更不可靠了。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

论文标题：

Larger and more instructable language models become less reliable

论文链接：

https://www.nature.com/articles/s41586-024-07930-y

代码链接：

https://github.com/wschella/llm-reliability

实验表明，规模扩展虽然提升了模型处理高难度任务的能力，但并没有同步加固基础能力的稳定性。  

这就导致了难度倒挂，大模型在简单的基础任务上，错误率反而更高。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

〓 多款模型的数据证明，规模扩展并未消除低难度区间的错误率

经过 SFT 和 RLHF 后，大模型的避答率显著下降。早期的模型遇到无法处理的问题往往会选择回避，现代模型则更倾向于给出一个看似专业、实则完全错误的答案。

这些错误隐藏在流畅且具迷惑性的文本中，导致人类监督者很难再靠直觉发现破绽。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

〓 对齐技术降低避答倾向并诱导产生隐蔽错误

人类感知的任务难度已经无法作为衡量模型可靠性的基准。研究人员跳出以人类视角评估机器的局限，转而通过量化底层能力需求，建立了一套不受主观偏见影响的度量衡。

从指出现有评估体系的盲区，到拿出具备预测能力的工具，这两篇文章完整构成了对大模型评估体系的重构。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

关于作者

Lexin Zhou 本科就读于西班牙巴伦西亚理工大学数据科学专业。随后，他前往剑桥大学攻读高级计算机科学硕士学位。

目前，他正在普林斯顿大学攻读计算机科学博士学位，师从 Peter Henderson 教授。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在学术研究之外，他拥有丰富的工业界和机构合作经验。

他曾在微软亚洲研究院担任人工智能驻院研究员，并先后在 Meta AI、OpenAI 以及欧盟委员会等机构担任人工智能顾问或参与研究工作。他也曾在 Kruger AI Safety Lab 担任研究实习生。

**参考文献**

\[1\] Zhou, L., Pacchiardi, L., Martínez-Plumed, F., et al. (2026). General scales unlock AI evaluation with explanatory and predictive power. Nature.

\[2\] Zhou, L., Pacchiardi, L., Martínez-Plumed, F., et al. (2025). General scales unlock AI evaluation with explanatory and predictive power. arXiv preprint arXiv:2503.06378.

\[3\] Zhou, L., Schellaert, W., Martínez-Plumed, F., Moros-Daval, Y., Ferri, C., & Hernández-Orallo, J. (2024). Larger and more instructable language models become less reliable. Nature.

\[4\] Zhou, L., & Xie, X. (2026, April 1). ADeLe: Predicting and explaining AI performance across tasks. Microsoft Research Blog.

**更多阅读**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**#投 稿 通 道#**

**让你的文字被更多人看到**

如何才能让更多的优质内容以更短路径到达读者群体，缩短读者寻找优质内容的成本呢？ **答案就是：你不认识的人。**

总有一些你不认识的人，知道你想知道的东西。PaperWeekly 或许可以成为一座桥梁，促使不同背景、不同方向的学者和学术灵感相互碰撞，迸发出更多的可能性。

PaperWeekly 鼓励高校实验室或个人，在我们的平台上分享各类优质内容，可以是 **最新论文解读** ，也可以是 **学术热点剖析** 、 **科研心得** 或 **竞赛经验讲解** 等。我们的目的只有一个，让知识真正流动起来。

📝 **稿件基本要求：**

• 文章确系个人 **原创作品** ，未曾在公开渠道发表，如为其他平台已发表或待发表的文章，请明确标注

• 稿件建议以 **markdown** 格式撰写，文中配图以附件形式发送，要求图片清晰，无版权问题

• PaperWeekly 尊重原作者署名权，并将为每篇被采纳的原创首发稿件，提供 **业内具有竞争力稿酬** ，具体依据文章阅读量和文章质量阶梯制结算

📬 **投稿通道：**

• 投稿邮箱：hr@paperweekly.site

• 来稿请备注即时联系方式（微信），以便我们在稿件选用的第一时间联系作者

• 您也可以直接添加小编微信（ **pwbot02** ）快速投稿，备注：姓名-投稿

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**△长按添加PaperWeekly小编**

🔍

现在，在 **「知乎」** 也能找到我们了

进入知乎首页搜索 **「PaperWeekly」**

点击 **「关注」** 订阅我们的专栏吧

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

PaperWeekly

向上滑动看下一个