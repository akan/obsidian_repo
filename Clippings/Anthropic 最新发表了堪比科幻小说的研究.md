---
title: "Anthropic 最新发表了堪比科幻小说的研究！"
source: "https://mp.weixin.qq.com/s/9Aa3aAsQlXsCI9AS7lHPLQ"
author:
published:
created: 2026-09-22
description:
tags:
  - "雅可比透镜，J空间，全局工作空间，可解释性，因果干预"
abstract: "Anthropic 提出 Jacobian-Lens 工具并发现 Claude 模型自发涌现对应认知科学全局工作空间的 J-space 特权子空间，可窥探大模型内部隐式推理过程。"
---
AI科研进阶社 *Aug 20, 2026, 8:30 PM*

题目： Verbalizable Representations Form a Global Workspace in Language Models

论文地址：https://arxiv.org/abs/2607.15495

代码地址： https://github.com/anthropics/jacobian‑lens51CTO

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/hiaKiaHyKoJKVNFRSe0GqleX7xSXO0xPZQA85p6yfNFJ5S4oVzFwmoHARgGa0Jq9nDyTmsxXSbvibYwQRTIa76zicIld6CD9dTfO7hbHxRLjG2k/640?wx_fmt=webp&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

## 创新点

•提出 **Jacobian‑Lens（雅可比透镜）** 可解释性分析工具，通过大量样本求取平均雅可比矩阵，度量模型内部激活对输出词汇概率的因果影响，能够检测模型内部 **并未输出，但具备语言可报告属性** 的表征，实现窥探模型隐式内部思考过程，并开源对应的工具代码。

•发现 Claude 模型训练过程中 **自发涌现 J‑space（J 空间）特权子空间** ，该子空间仅占各层激活总方差不到 10%，并非人工设计，功能上对应认知科学的全局工作空间，可存储多步推理的中间隐性结果，支持信息全局广播，区别于模型其余自动化后台处理表征Anthropic。

## 方法

本文借鉴人脑全局工作空间认知理论，开发Jacobian‑Lens雅可比透镜可解释性工具，通过在大量提示样本上求取雅可比矩阵平均值，计算模型各层内部激活对未来输出词汇的平均因果影响，识别具备语言可报告属性的表征从而定位J‑space子空间，并开展表征注入、钳制、交换等多组干预实验验证该子空间的因果作用，结合多类推理任务观测J‑space的行为特性，以此探究大语言模型内部隐性推理机制。

## J‑space全局工作空间的五大核心能力

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/hiaKiaHyKoJKWnOHSpffkLbicm0P0yMmW8ib4xtbmLicbpZ8d82miaoYmFjibQXu4mof6Mvty5gwxFpRFk3cwOP1DdibN37JibQ4SJ8guria8YLrKhN1A/640?wx_fmt=webp&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

本图通过口头报告、定向调制、内部推理、灵活泛化、选择性这五个子场景直观演示J‑space的关键特性，口头报告展示可把J‑space内部表征转换为语言输出，定向调制体现能够在执行无关文本生成任务时于J‑space中并行开展隐式运算，内部推理说明模型可在该空间完成中间思考再输出答案，灵活泛化验证对J‑space表征进行交换干预后模型会跟随替换后的信息输出对应关联结果，选择性通过消融实验表明基础文本解析、事实回忆、流畅语言输出可不依赖J‑space，但内部思考与复杂推理必须依靠该子空间完成，整体可视化呈现J‑space作为大模型内部全局工作空间具备的可报告、可调控、支持隐式推理、泛化以及任务选择性的核心行为。

## J‑space全局工作空间模型架构特征

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/hiaKiaHyKoJKVdyQpQNYtrSH9Exb8rcJL99M1yNnEZjicq2bNB0iajt0eb0icgibBpnUWiamgFSAlo5Cg9S0hcPKTVm3OJpC39Wb0nh6ibqSxkzviaC8/640?wx_fmt=webp&from=appmsg&watermark=1#imgIndex=2)

本图展示大模型层级内部J‑space所处位置与核心属性，模型底层负责输入感知解析预处理，中间层为J‑space全局工作空间，上层负责驱动输出生成，同时从三个维度刻画其特点，中间处理阶段表明J‑space仅在网络中间层承载工作空间类内容，有限容量体现同一时刻仅少量概念处于激活状态，仅占据一小部分激活方差，绝大多数表征分布在J‑space之外，广播格式说明J‑space向量能够与上游、下游大量电路权重交互，实现信息广播传递，完整可视化J‑space在Transformer模型中的位置、容量约束与信息广播的架构特性。

## J‑lens跨层揭示模型内部思维过程

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/hiaKiaHyKoJKWDUictlJEia401QIia4b04PbXlTGOwXdgzjU1XQKTOssN0ontXQBXbn6q5BS2sKAuc5zJHsxEw3y7Onlia6zOPphlK2jSx6bQxkfM/640?wx_fmt=webp&from=appmsg&watermark=1#imgIndex=3)

本图通过多跳回忆、心算、蛋白质识别、代码漏洞检测、ASCII人脸识别、提示词注入检测六类不同任务示例展示J‑lens雅可比透镜工具的探测效果，在各类任务中该工具能够在模型不同网络层捕获尚未输出到文本的中间隐式思维表征，例如多跳推理任务捕捉推理中间概念，数学运算捕捉中间计算数值，蛋白序列任务提前识别蛋白相关概念，代码场景识别报错信息，图像符号任务识别对应语义，安全场景识别提示注入风险，直观证明J‑lens可以窥探大模型在生成最终答案之前，潜藏在网络各层内部的中间思考内容。

## 雅可比透镜的计算、读取与J‑space干预流程

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/hiaKiaHyKoJKWLEY7dsZhhOWUiaFnn6Yk90135Ylok3nXaWCslFc0DgFLvaOY51KrSKpzwibclT6166ddfjicdjHdAKkgY6Nul0iavKHE7zJJclow/640?wx_fmt=webp&from=appmsg&watermark=1#imgIndex=4)

本图分为A、B、C三个子部分完整阐述Jacobian‑Lens工具整套技术流程，A部分展示雅可比透镜矩阵的计算方式，求取目标层激活相对于最后层残差流激活的雅可比矩阵，在大量样本与token位置上聚合得到对应层的Jt矩阵，B部分介绍读取流程，使用得到的Jt矩阵替代后续网络层，直接读出J‑space内部蕴含的语义概念，C部分说明针对J‑space的因果干预手段，读取J‑space坐标后交换透镜向量对应的坐标完成表征修改，再回写得到扰动后的激活，实现对模型内部工作空间的可控操作，完整可视化该可解释工具从矩阵求解、内部表征读取到因果干预的全套技术链路。