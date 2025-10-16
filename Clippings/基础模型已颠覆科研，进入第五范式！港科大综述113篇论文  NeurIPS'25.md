---
title: "基础模型已颠覆科研，进入第五范式！港科大综述113篇论文 | NeurIPS'25"
source: "https://mp.weixin.qq.com/s?__biz=MzI3MTA0MTk1MA==&chksm=f0416e44ebf79d276a532ec8d6e827da551ca63dcb8bbb830d9a38ab34381a9f1d61311f580c&idx=2&mid=2652634855&sn=4aa459851e4214b393cdbcad16504caa#rd"
author:
  - "[[新智元]]"
published:
created: 2025-10-16
description:
tags:
  - "基础模型"
  - "科学发现"
  - "第五范式"
  - "人工智能"
  - "科研变革"
abstract: "香港科技大学研究人员提出基础模型可能引领科学进入第五范式，通过三阶段框架展示了从元科学整合到自主科学发现的演化路径，同时指出了偏见、幻觉等风险挑战。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/UicQ7HgWiaUb2cBzF9PCvq3vhIvtd7BOASKH5ldZCWbxWFRJpoDuJM2DhC9kzXw0wiaFicZbDq247F4SvuCdAVTckw/0?wx_fmt=jpeg)

新智元 [新智元](https://mp.weixin.qq.com/) *2025年10月15日 17:45*

### 新智元报道

编辑：LRST

##### 【新智元导读】基础模型（FM）是一种在海量数据上训练的人工智能系统，具备强大的通用性和跨模态能力。港科大最新发表的论文显示：FM可能引领科学进入第五范式，但大模型的偏见、幻觉等问题仍需正视。

[一图看透全球大模型！新智元十周年钜献，2025 ASI前沿趋势报告37页首发](https://mp.weixin.qq.com/s?__biz=MzI3MTA0MTk1MA==&mid=2652625640&idx=1&sn=599fde2abe811219a22711fe44172c70&scene=21#wechat_redirect)

科学的发展史，就是一部范式更迭的历史。

16、17世纪，伽利略与波义耳开创了实验范式，用系统化观察和可重复实验奠定了科学的经验基础；

18、19世纪，牛顿、麦克斯韦与爱因斯坦推动了理论范式，用抽象方程和统一理论解释自然规律；

20世纪，计算机的出现催生了计算范式，模拟复杂系统成为可能；

进入21世纪，大数据和机器学习驱动的数据范式又一次革新了科学发现的逻辑。

然而，今天我们遇到的科学难题，远远超越了以往的复杂度：蛋白质折叠、气候变化、社会极化、药物发现……这些问题往往表现为涌现性、开放性和不可约复杂性。

即便是最先进的数据驱动方法，仍然受到线性假设、静态建模、因果推理不足等限制，常常力不从心。

随着科学问题愈发复杂，这些传统范式正逐渐显露出局限：我们需要一种全新的科学发现模式。

在这一背景下，基础模型（Foundation Models, FMs）横空出世。与传统「单任务 AI」不同，FMs 是在海量、多模态数据上训练的大规模神经网络，具备极强的泛化与适应能力。

它们不仅能处理文本、图像和代码，还能进行跨模态推理，展现出前所未有的科研潜力。

GPT-4能在语言理解、代码生成和科学推理中游刃有余。

AlphaFold在蛋白质结构预测上达到接近实验精度，解决了困扰生物学界数十年的难题。

FunSearch甚至能在数学领域提出新的猜想，挑战NP-hard问题。

GraphCast等模型在天气预测上，已经开始超过传统数值模式，且计算成本更低。

不同于传统的专用AI模型，FMs具备三个关键特性：

1\. 通用性： 它们不是为单一任务而设计，而是能通过提示、微调跨越语言、代码、图像甚至多模态任务。

2\. 规模与知识覆盖： 在大规模数据训练下，它们吸收了跨领域的知识，能在缺乏标注和经验的情况下完成任务。

3\. 推理与生成能力： 不仅能处理现有数据，还能进行推演、假设生成和跨领域联想。

正是这些能力，使得FMs不仅能加速现有科学流程，还可能重塑科学发现的逻辑与结构。

这些成果表明，FMs不再只是「科研助推器」，它们正在改变知识生成的逻辑，香港科技大学的研究人员在NeurIPS上发表的最新论文，提出了一个大胆的论断：基础模型（Foundation Models, FMs）可能正引领科学进入「第五范式」。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb0VLwsYL9icI5tqPX4VuEibPiaYmoB8CyPCp2NfYYFSCwUsbcBjbwAjibXpiaiacicFsoeVTQqZXpMaUFnfg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

论文链接：

https://www.techrxiv.org/doi/full/10.36227/techrxiv.174953071.19189612/v1

项目代码：https://github.com/usail-hkust/Awesome-Foundation-Models-for-Scientific-Discovery

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

**三阶段框架**

**从后台助手到自主科学家**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb0VLwsYL9icI5tqPX4VuEibPiaiaYfnp5DsBicrv4pIric1PVWa1YzQNhZPfcIicbib2PSxtDCvCdOZicsBGEQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

论文中提出了一个三阶段框架，刻画FMs在科学发现中的演化路径：

**元科学整合**

**Meta-Scientific Integration**

此阶段，FMs 更像「后台科研操作系统」。它们帮研究者处理杂务：自动化数据清洗、文献检索、实验设计。

在材料发现中，FMs 已被用作贝叶斯优化的先验，提高分子筛选效率。

在实验室里，它们能直接生成控制仪器的 Python 脚本，实现「从文本到实验」的自动执行。

在气候科学中，模型如 ClimaX 能融合观测数据与模拟数据，帮助发现隐藏的气候模式。

**人机共创**

**Hybrid Human–AI Co-Creation**

此阶段，FMs 开始成为科研「合作者」。

在理论建模中，它们能基于知识图谱生成新假设，并通过逻辑验证保证结果可检验。

在实验设计中，FMs 不仅能给出实验参数，还能提出改进思路，与人类共同迭代方案。

在数学和物理中，DeepSeekProver、Logic-LM 等系统已能辅助完成复杂推理与证明。

在这里，人类与 AI 的关系是「互补」：AI 负责记忆、组合与演绎，人类负责创造力与判断。

**自主科学发现**

**Autonomous Scientific Discovery**

未来，FMs 可能进化为「自主科学家」。

它们能主动提出问题；自行生成假设、设计实验并运行模拟；解释结果并提出新理论。

这并非科幻。

已有的 「AI Scientist」 系统，已经能完成端到端的科研流程，从问题提出到结果解释。这意味着，科学不再完全依赖人类，而进入一个机器自主探索知识的新时代。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

**跨范式的应用实例**

论文对FMs在四大传统范式中的应用做了系统性梳理：

实验科学： FMs正成为实验室的「大脑」。它们能为贝叶斯优化提供智能先验，加速分子和材料搜索；还能生成实验协议，指导机器人化学合成。

理论科学： FMs正在扩展「假设空间」。通过融合知识图谱、物理约束，模型能提出创新性假设，并借助符号推理工具完成验证。

计算科学： FMs正在改变建模与求解方式。它们能从图表或文本中自动生成方程骨架，或通过神经算子（Neural Operator）快速解偏微分方程，效率超越传统数值方法。

数据科学： FMs为多模态知识整合提供了新引擎。从基因组学中的DNABERT到气候预测中的GraphCast，再到材料生成的MatterGen，FMs已能跨模态学习、跨领域推理。

更重要的是，FMs能够打通四大范式，形成跨学科的混合流程。例如，Coscientist 系统能将研究目标转化为实验协议，并驱动机器人执行，再根据结果迭代优化。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

**风险与挑战**

新的科学范式伴随新的挑战。论文特别指出了四大风险：

1\. 偏见与不公平：训练数据多来自西方语境，可能导致全球科研议题失衡。

2\. 幻觉与虚假信息：FMs 可能生成看似合理却缺乏依据的假设，误导科研。

3\. 可复现性与透明度：如果中间推理过程不可追溯，科学的验证性将受威胁。

4\. 作者身份与责任：若一个重要假设由 FMs 提出，是否应署名？一旦出错，责任如何界定？

这些问题意味着，科学的第五范式不仅是技术变革，更是社会与伦理的挑战。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=9)

**展望未来**

论文最后描绘了三条未来路径：

具身科学代理（Embodied Scientific Agents）： FMs与实验机器人结合，既能推理又能动手，成为真正的「实验科学家」。

闭环科学自主（Closed-Loop Autonomy）： FMs将实现「提出问题—设计实验—运行验证—更新知识」的全闭环研究流程。

持续学习（Continual Learning）： 未来的FMs将具备长期记忆与跨域迁移能力，能像真正的科学家一样逐步积累知识。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**结语**

从伽利略到 GPT-4，每一次科学范式转变，都改变了人类理解世界的方式。今天，基础模型正让我们看到一个可能的未来：科学的第五范式——由人类与机器共同，甚至由机器自主推进的科学发现时代。

这篇论文不仅提出了全新的概念框架，还呼吁科研界正视即将到来的变革：如何治理 FMs 的风险？如何重建科学透明性与责任机制？如何确保技术进步真正服务于全人类？

科学的未来，可能正在被重新书写。

参考资料：  

https://www.techrxiv.org/doi/full/10.36227/techrxiv.174953071.19189612/v1

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

新智元

向上滑动看下一个