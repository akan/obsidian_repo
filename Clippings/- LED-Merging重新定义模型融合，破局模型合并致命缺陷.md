---
title: "LED-Merging重新定义模型融合，破局模型合并致命缺陷"
source: "https://mp.weixin.qq.com/s/56ejzXDxum5vEQWoF7iGQg"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-08-06
description: "LED-Merging已上线始智AI-wisemodel开源社区，欢迎体验。"
tags:
  - "模型融合"
  - "安全防护"
  - "神经元调度"
abstract: "LED-Merging是一种无需训练的模型融合方法，能够平衡安全与性能。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/4heHKEq5K4o1kTMjn1MIll1g858QicLZ1ibzWOhVTHOicKUrKRGzOnOBGdDWp02RqibWmPjPMd9DWNoicRvMpzgT9qg/0?wx_fmt=jpeg)

[始智AI wisemodel](https://mp.weixin.qq.com/s/) *2025年08月05日 18:01*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4heHKEq5K4o1kTMjn1MIll1g858QicLZ1v2mPcYHcuZQE7V6MqcwMEmnADx6fF5RHaM21KfU2oib4iaWvWOPdkc6g/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/4heHKEq5K4q9tqEgFvN7zdf9yNakzjy8Yt6OdziclqwCW7cnvDOJodv1ZUXezhyELWES2ZPcfPss67c625whcQw/640?wx_fmt=jpeg&from=appmsg&randomid=l24x81pa&wxfrom=5&wx_lazy=1&tp=webp)

想要让大语言模型在数学和编程等多个领域都表现出色？一个自然的思路是将不同专业方向的模型融合（Model M erge），打造一个全能的“六边形战士”。然而，理想与 现实存在差距。当前模型融合技术常常引发“安全-效用冲突”：例如，融合一个安全模型和一个数学模型后，数学能力可能增强了，但安全防护却被削弱，导致模型容易生成有害或危险的内容。  

为了解决这一棘手问题，来自上海人工智能实验室、上海交通大学、华东师范大学的研究团队提出了一个全新的、无需训练的解决方案——LED-Merging， 如同为模型融合过程配备了一把精准的“神经元手术刀” 。 **LED-Merging** 已上线 **始智AI-wisemodel** 开源社区，欢迎体验。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4heHKEq5K4o1kTMjn1MIll1g858QicLZ11FhQCqWV8ic7UhbXsDnRFAvpyiacEaUNs9QcewCrNXqJC1tAVFsVAWTw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

**代码地址**

https://wisemodel.cn/codes/qianli/LED-Merging

**01.**

**安全与效用能力的失衡**

  

现有模型合并方法，正面临着这种“能力越强，安全越弱”的致命困境。 如下图所示。传统合并方法存在致命缺陷，安全防护能力会灾难性下降。

如图1a所示，合并后的模型能轻松解决数学问题，但当被问及有害问题时，它却能提供危险的建议。而图1b的数据则量化了这一悲剧：数学、代码能力（Accuracy/Pass@1）的提升，往往伴随着安全评分（Safety Score）的断崖式下跌。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4heHKEq5K4o1kTMjn1MIll1g858QicLZ1IfHd3bNbtJ1Ns99P6f7xic2yPRaa4A3icoyVSlr5IrjzAjXsLPKSlzrg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

为什么模型一合并就变“邪恶”？研究团队发现，传统合并方法在融合两个专家模型时，犯了两个根本性错误：

1、神经元误判（Neuron Misidentification） ：传统方法仅凭参数大小来决定保留哪些神经元。这好比仅凭音量大小判断一句话的重要性，完全忽略了内容。结果，大量负责“安全刹车”的关键神经元被当作不重要的参数而丢弃。

2、跨任务干扰（Neuron Interference） ：即便一些安全神经元被保留下来，它们也常常与负责数学、代码等功能的神经元在同一位置上发生“参数打架” 。如图1c所示，这种冲突导致了破坏性的参数抵消，最终两败俱伤。

实验数据触目惊心：当一个经过安全对齐的Llama-3模型与数学模型融合后，其在安全测试基准HarmBench中的 **有害内容响应率飙升** ，安全能力 **骤降超过30%** 。这种“安全-效用能力”的冲突，正是当前模型合并技术走向大规模应用的最大障碍。

**02.**

**为模型融合打造“内生安全系统”**

  

面对现有技术的困境，LED-Merging提出了一套全新的、无需训练的融合三部曲，就像为模型合并过程建立了一条精准、有序的调度流水线。

1、 **L - 精准定位 (Location) ，启用“神经元GPS”。** 首先，抛弃粗暴的基于幅度的筛选。LED-Merging利用梯度归因（gradient-based attribution）技术，像一个高精度GPS，准确识别并标记出在基础模型和各个专家模型中，分别负责安全、数学、代码等不同任务的关键神经元。

2、 **E - 动态选举 (Election) ，组建关键神经元“全明星阵容”。** 定位之后，如何取舍？LED-Merging引入动态选举机制，它要求一个神经元必须同时在基础模型和专家模型中都表现出高重要性，才能被“选举”为核心功能神经元并保留下来。这确保了最终选出的，是真正兼顾了通用知识与专业技能的“全明星阵容”，从源头上平衡了安全与性能。

3、 **D - 冲突解耦 (Disjoint) ，开辟“参数专用道”。** 模型合并最关键的一步，如何避免神经元“打架”？LED-Merging通过集合运算，为不同任务（安全、数学、代码）的神经元更新划分出相互隔离的“专用车道”。这意味着，负责安全的参数更新，绝不会与负责数学的参数更新在同一位置发生冲突。这种彻底的解耦，根除了跨任务干扰的顽疾。

LED-Merging的概览图与算法流程。从分别定位（Location），到联合选举（Election），再到最后的冲突解耦（Disjoint），最终将三组互不干扰、各自精锐的神经元向量合并，实现安全、高效的融合。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4heHKEq5K4o1kTMjn1MIll1g858QicLZ1Jh7yy0f8Iu8mdoy8up89iajNCxQN4s5Uh6MMt9xiazfAbHypMFgCMic8w/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1) ![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4heHKEq5K4o1kTMjn1MIll1g858QicLZ1agjw9ia4nt0s1mBfic6hNgIAuJeCXBCktRkTczr6ftz9vwPNrO5TsGYQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

**03.**

**安全与能力的完美平衡**

  

在Llama2， Llama-3、Mistral等多个主流模型家族、横跨7B到13B的实验中，LED-Merging交出了一份近乎完美的答卷：

**1、安全防护的“超级进化”：** 在HarmBench安全测试中，LED-Merging的表现堪称惊艳。合并后的Llama-3-8B 有害响应率降低了31.4% ，而WizardLM-13B的 安全分数更是飙升了70.8% 。这意味着，LED-Merging不仅没有削弱安全，反而通过智能的神经元调度， 让模型的安全能力变得比原始安全模型更强。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4heHKEq5K4o1kTMjn1MIll1g858QicLZ18caTPw7RxRafLo0Q2J4IA6bdReCMGR5Th9MgqnqF6P88oXt2UsBiaNQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

2、效用能力的“高保真度”： 安全提升了，能力有没有打折？完全没有。在GSM8K数学推理基准上，合并后的模型 保留了专业模型95%的性能 ，准确率高达52.39% 。在代码生成评测基准MBPP上，其成功率甚至比原始代码模型提升了40.2% 。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4heHKEq5K4o1kTMjn1MIll1g858QicLZ15NPwC9Brm9YDZdkk3RAyricdwK7tZW4gCFL1hQH4pmsMNFzQ2iawGHvg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

**3、跨模型、跨尺寸的“零感知”防御：** 无论是在Llama-3、Llama-2还是Mistral架构上，无论模型是7B、8B还是13B，LED-Merging都表现出高度一致的有效性和稳定性。这证明了其方法的普适性，表现了其成为工业级解决方案的潜力。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4heHKEq5K4o1kTMjn1MIll1g858QicLZ1ADOFSWrkkpqgA9cDCF7UpjlQveYRLaJ9XmKRG5McdY5X6wTiaOibxxmg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

**4、跨语言的“无障碍”推理：** LED-Merging强大的泛化能力不止于此，它在多语言场景下同样表现出色。在MGSM8KInstruct和MSVAMP两大跨语言数学推理测试中，LED-Merging在所有合并方法中取得了最高的综合准确率。

尤其是在孟加拉语（Bengali）等低资源语言上，其准确率相比传统方法Task Arithmetic提升了93.8%，同时在德语、中文等高资源语言中也保持着顶尖水准。这充分证明了LED-Merging在跨语言迁移应用中的可靠性和巨大潜力。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/4heHKEq5K4o1kTMjn1MIll1g858QicLZ1gmWdpXxFCH5OyW41auuCBYgZicABkwdOrY4q7NBo2BmgT3Sq7DFOXZA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

本文由 **上海交通大学，上海人工智能实验室和华东师范大学** 联合完成。 主要作者包括上海交通大学博士生 **马千里** 与上海AI实验室 **刘东瑞** （共同一作）等。 通讯作者为上海AI实验室青年科学家 **邵婧** ，研究方向为AI安全可信。

  

编辑丨赵雅鑫  

继续滑动看下一个

始智AI wisemodel

向上滑动看下一个