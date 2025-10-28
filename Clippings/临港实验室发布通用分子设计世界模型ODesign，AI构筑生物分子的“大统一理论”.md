---
title: "临港实验室发布通用分子设计世界模型ODesign，AI构筑生物分子的“大统一理论”"
source: "https://mp.weixin.qq.com/s/U5I484yKHTEKodEWfRf7pA"
author:
  - "[[Jingle]]"
published:
created: 2025-10-28
description: "临港实验室发布通用分子设计世界模型ODesign，实现蛋白质、核酸、小分子等多模态统一生成，标志AI分子设计进入通用智能时代。"
tags:
  - "通用分子设计"
  - "跨模态生成"
  - "AI药物研发"
  - "世界模型"
abstract: "临港实验室联合多机构发布国际首个通用分子设计世界模型ODesign，实现从蛋白质、核酸到小分子等多模态分子的统一设计，标志着AI药物研发进入通用智能时代。"
---
Jingle *2025年10月28日 16:16*

  

2025 年 10 月 27 日，由临港实验室牵头，联合上海人工智能实验室、香港中文大学、上海交通大学、浙江大学、华盛顿大学、哈佛大学等机构共同发布国际首个通用分子设计世界模型 —— **ODesign** 。这一模型的问世，标志着生成式 AI 药物研发正式从 **“单点突破”进入“通用智能”时代** 。

  

在 AI 赋能生命科学的进程中， AlphaFold3 以接近实验精度的结构预测能力奠定了分子建模的基础，而 ODesign 更进一步，让 AI 从“预测”跨越到“创造”，实现对蛋白质、核酸、小分子及金属离子等多模态分子的统一设计。这一成果被认为是 AI 制药领域的里程碑式突破。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/libZ8rRWYootmY873hic68PZcBMicmO0mXjzgxUasXrF6aQBlhdA4CWc0qpbgsALvLABM2l2ViaYicxtM3iab9yRcz1w/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

### 从预测到创造：AI分子设计的范式跃迁

  

生物体系的复杂性源自多种分子的协同作用。蛋白质、 DNA 、 RNA 、小分子以及金属离子构成了生命的基本语言，但长期以来， AI 分子设计模型多被限制在单一模态。例如， RFDiffusion 专注于蛋白生成， ResGen 侧重于小分子，而 RNAFrameFlow 仅能处理 RNA 结构。这些模型在各自领域中表现出色，却难以理解不同分子之间的相互作用规律，导致 AI 无法真正实现“跨模态创造”。

  

ODesign 的出现打破了这种局限。它以“指定任意靶标，生成任意结合配体”为目标，成为一个能够在原子层面理解并创造多种分子相互作用的 **通用世界模型（** **World Model** **）** 。这意味着研究者不仅能设计蛋白 – 蛋白结合体，还能一键生成 RNA– 蛋白、 DNA– 小分子等此前无法通过单模态模型完成的复合体系。

  

在功能上， ODesign 允许用户直接在任意靶标上指定作用位点（如蛋白表位或受体口袋），并生成结构、能量、电荷分布均合理的多类型结合分子。它如同一位能够“理解生命语言”的 AI 生物学家，能在统一的物理 — 化学规则下重建分子世界。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**图** **|** ODesign 作为“全模态分子世界模型”，能够在统一生成框架下实现蛋白质、核酸、小分子及金属离子等多种分子的相互作用设计

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### ODesign的架构与创新机制

ODesign 的核心创新在于，它在 AlphaFold3 的结构预测框架上加入了生成式架构，使模型既能“理解”分子结构，也能“创造”新的结构。其整体体系由五个核心模块组成：

  

首先是 **多模态分子表征层** 。 ODesign 将蛋白的氨基酸、 RNA 和 DNA 的碱基、小分子的原子及金属离子的基本单元统一编码为通用的“ token ”语言，使 AI 能够在一个共享的生成空间中自由转换不同分子类型。

  

其次是 **条件控制模块** ，通过多层掩码机制在原子级、残基级和分子级实现约束。例如，研究者可以选择固定靶标结构（刚性模式），或让受体与配体共同调整构象（柔性模式），以适应不同设计任务。

  

第三个关键组件是 **Pairformer** **交互建模层** 。该模块用于捕捉不同分子间的作用关系，如氢键、疏水作用和静电互补等，为生成模型提供物理可行的相互作用模板。

  

第四是 **条件扩散式解码器** 。扩散模型（ diffusion model ）是一类通过“噪声还原”逐步生成三维坐标的算法，能在原子层面生成符合化学键约束的高精度结构。

  

最后， **OInvFold** **逆折叠模块** 可基于生成的骨架结构预测具体序列或化学组成，实现从“形态”到“物质”的完整生成闭环。

  

通过上述机制， ODesign 实现了分子生成的多层级控制与跨模态协同，使 AI 在三维空间中以原子精度完成从抽象语言到真实分子的构建。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**图** **|** ODesign 统一了蛋白质、核酸、小分子及金属离子等多种模态的生成过程，支持刚性与柔性两种设计模式，并通过掩码机制在多层级上实现条件控制

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

性能验证：跨模态分子生成的全面领先

  

为验证模型性能，研究团队在蛋白、核酸和小分子三大类别的 11 项设计任务中对 ODesign 进行了系统测试。结果显示， ODesign 在所有模态下均超越主流模型，在生成精度与设计速度上均实现数量级提升。

  

**蛋白设计方面** ， ODesign 在蛋白 – 蛋白结合体生成、基序骨架设计、结合界面重构及原子级基序嵌入等任务中均取得优异成绩。以 Binder 设计为例， ODesign 在单块 H100 GPU 上一天内可生成的有效结构数量是 RFDiffusion 的约 10 倍，是 BindCraft 的上百倍，大幅提高了设计通量。同时，灵活模式（ ODesign-Flex ）在处理具有柔性界面的受体时表现更佳。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**图** **|** ODesign 在蛋白结合体、基序骨架和界面重构等任务中的成功率和设计速度均显著优于 RFDiffusion 、 BindCraft 等模型。紫色表示生成结构，粉色为靶标蛋白  
  

在 **核酸设计** 中， ODesign 同样展现了强大的跨模态适应性。对于 RNA 单体生成，其结构重建成功率几乎是 RNAFrameFlow 的两倍；在蛋白结合 RNA 设计中， ODesign 在零样本条件下依然可实现约 78% 的结合构象精度，表明其具备跨模态泛化能力。对于 DNA 单链设计，尽管由于训练数据稀缺导致成功率略低于 RNA ，但 ODesign 依然能合理识别靶标电荷分布并生成互补结合位点。

  

在 **小分子设计** 领域， ODesign 进一步扩展至蛋白、 DNA 和 RNA 靶标体系。与 TargetDiff 、 SurfGen 等模型相比， ODesign 在 6 个蛋白靶标上生成的有效小分子数量提升约 4 至 9 倍，同时首次实现了 DNA 结合小分子的合理设计。这意味着 ODesign 能够统一不同化学拓扑的分子生成，从线性链到芳环体系均能生成具有药物样性质的候选结构。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 从科研工具到创制平台：迈向智能分子世界

  

目前， ODesign 团队已推出在线试用平台（ https://odesign.lglab.ac.cn ），用户可通过输入序列或结构，快速获得多模态分子的设计结果，并进行三维可视化与分析。这为科研与产业界提供了一个通用的分子创制接口。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | ODesign 分子设计平台试行版，全面开放给科研和产业研究人员使用

  

更重要的是， ODesign 不仅是一个工具，更是向“自我进化型分子智能”迈出的关键一步。其团队计划结合物理约束、药物可成药性指标（如 QED 评分）与语言模型推理代理，实现 AI 驱动的闭环“设计 — 验证 — 优化”系统，让模型能够自我修正和演化，从而成为真正意义上的 **自学习分子世界模型** 。

  

ODesign 的推出，标志着 AI 分子设计从“任务模型”迈向“世界模型”的转折。它使科学家能够以统一方式操控蛋白质、核酸与小分子的相互作用，在理论上构建一个“可编程的生命分子宇宙”。未来，随着 ODesign 与实验验证、虚拟疾病生物学家系统（ OriGene ）协同运行， AI 驱动的药物研发将不再局限于单一靶点，而能从机制层面实现疾病干预策略的系统重塑。

  

临港实验室 Odesign 研发负责人郑双佳表示，其目标不仅是加速药物设计，更是推动 AI 从辅助研究迈向科学发现的主体角色。这一“通用智能”模型的诞生，或将成为人类理解与创造生命体系的新起点。

  

  

参考链接：

1\. https://odesign1.github.io/static/pdfs/technical\_report.pdf

  

免 责声明：本文旨在传递合成生物学最新讯息，不代表平台立场，不构成任何投资意见和建议，以官方/公司公告为准。本文 也不是治疗方案推荐，如需获得治疗方案指导，请前往正规医院就诊。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

素材来源官方媒体/网络新闻

继续滑动看下一个

生辉SynBio

向上滑动看下一个