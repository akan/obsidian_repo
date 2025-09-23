---
title: "超越单文件代码生成：微软发布的ZeroRepo如何规划构建3.6万行大型软件？"
source: "https://mp.weixin.qq.com/s?__biz=MzI3ODgwODA2MA==&chksm=ea426f3dcf7ec08be1ee920a40fe9e988a7a02c25793ddf1b3718355afe7cb91ca07e1e23bfb&idx=1&mid=2247543938&sn=e5b08b1ca9b8a624e3b2bf53bf2250bf#rd"
author:
  - "[[编辑部]]"
published:
created: 2025-09-23
description:
tags:
  - "代码库生成"
  - "图结构规划"
  - "功能覆盖"
abstract: "微软提出的ZeroRepo框架使用Repository Planning Graph结构，能够从零生成功能覆盖率达81.5%、规模近3.6万行的大型软件代码库。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/gKaxjIx6baj55oanejHVlb0DXxFRe1RnT71Z2I1a0ASiaxNhj8iajsm2BH8Jxjicjl9jqE1aqia56Bg9U1EGNpetOw/0?wx_fmt=jpeg)

Original 编辑部 [深度学习自然语言处理](https://mp.weixin.qq.com/) *2025年09月23日 15:32*

在人工智能飞速发展的今天，大型语言模型（LLM）已经能够熟练地编写单个函数甚至整个文件，比如根据“写一个快速排序函数”这样的指令生成代码。然而，如果我们提出更宏大的目标——“请帮我构建一个类似 scikit-learn 的机器学习库”，模型往往显得力不从心。生成一个完整的、结构清晰的软件代码库（repository）远不止是堆砌代码片段，它需要高层的功能规划、模块划分、数据流设计，以及低层的接口定义、依赖管理等一系列复杂决策。

当前的方法大多依赖自然语言作为中间规划媒介，比如让AI智能体通过对话或文档来讨论“先做什么、后做什么”。但自然语言天生具有模糊性、冗余性和不稳定性，容易导致规划脱节、功能遗漏或实现混乱。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baj55oanejHVlb0DXxFRe1RnykqrnWwqYp0nk8oC19QlSkXQn2N8v5br1k2MDFJnQPLofRBZuszmoA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

- 论文：RPG: A Repository Planning Graph for Unified and Scalable Codebase Generation
- 链接：https://arxiv.org/pdf/2509.16198

正是为了解决这一根本问题，微软等机构的研究团队提出了 **Repository Planning Graph（RPG）** ——一种将软件功能与实现结构统一编码的图表示法。基于RPG，他们开发了 **ZeroRepo** 框架，实现了从零开始生成大规模、高可用代码库的能力。

为了科学评估这类系统的能力，论文还构建了 **RepoCraft** 基准，包含六个真实世界项目（如 scikit-learn、Django 的匿名版），覆盖1052个具体任务。实验表明，ZeroRepo 生成代码库的功能覆盖率高达81.5%，代码规模达到近3.6万行，远超现有最强基线。这不仅展示了RPG的有效性，也为AI驱动的软件工程开辟了新路径。

接下来，我们将深入解读这篇论文的动机、方法、实验与启示。

## 研究动机与问题定义

为什么从零生成一个代码库如此困难？论文指出，核心在于“规划”的断层。现有方法通常将规划分为两个层面：

- **提案级规划** ：决定“要建什么”，即定义软件的功能范围和核心能力。
- **实现级规划** ：决定“怎么建”，即设计文件结构、接口、依赖关系和数据流。

目前主流方法（如多智能体协作、分阶段工作流、迭代式外部规划）都依赖自然语言作为中间表示。例如，让“架构师”智能体写出“我们应该有一个数据加载模块，一个机器学习算法模块，一个评估模块……”，再由“工程师”智能体逐一实现。但自然语言存在三大致命弱点：

1. **模糊性** ：比如“数据加载模块”到底包含哪些具体功能？是读CSV还是JSON？是否支持流式加载？这种模糊性导致代码搜索和实现时容易偏离初衷。
2. **非结构化** ：自然语言缺乏明确的层次和依赖跟踪，难以表达复杂的模块关系和数据流向。
3. **脆弱性** ：在多轮迭代中，静态的自然语言计划容易退化，无法适应动态调整。

这导致两种典型的失败模式：

- **提案级规划不稳定** ：生成的功能不完整、重叠或范围不均，无法系统化覆盖需求。
- **实现级规划碎片化** ：函数实现与架构计划在迭代中逐渐偏离，引发依赖不一致、数据流断裂等问题。

因此，论文主张用一种 **结构化、持久化、可演化** 的表示来替代自然语言，这就是Repository Planning Graph（RPG）的由来。

## Repository Planning Graph (RPG) 的核心思想

RPG 的本质是一张图，其中节点表示软件的功能单元，边表示它们之间的关系和数据流。它巧妙地将高层功能规划与底层代码结构统一在一起，具体来看：

- **节点具有双重语义** ：
- **功能层面** ：节点代表从粗到细的能力划分。根节点对应高级模块（如“机器学习算法”），中间节点是组件（如“分类算法”），叶节点是具体功能（如“逻辑回归”）。
	- **结构层面** ：节点自然映射到代码组织。根节点对应文件夹，中间节点对应文件，叶节点对应函数或类。
- **边捕获执行依赖** ：
- **模块间边** （黑色实箭头）：表示数据流，比如“数据加载”模块的输出喂给“机器学习算法”模块。
	- **模块内边** （灰色虚线箭头）：表示文件执行顺序，比如 `load_data.py` 必须在 `preprocess.py` 之前运行。

通过这种设计，RPG 不仅明确了“做什么”，也规定了“怎么做”和“谁先谁后”。它就像一张详细的建筑蓝图，取代了模糊的口头描述，确保整个代码库在生成过程中保持一致性和可扩展性。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baj55oanejHVlb0DXxFRe1RnJ331e7b1Kkhs8D1zMD4LShacfjQH6kjj4Leej8IzeDbeGpyajptOYQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

上图展示了一个RPG的实例。实线表示层级包含关系，黑色箭头是模块间数据流，灰色虚线是文件执行顺序。例如，“Data Loading”模块的输出流向“ML Algorithms”，再流向“Evaluation”。这种拓扑排序保证了功能分解与代码组织的一致性。

## ZeroRepo 框架详解

基于RPG，研究团队设计了ZeroRepo框架，其整体流程分为三个阶段，如下图所示：

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baj55oanejHVlb0DXxFRe1RnHpaMD2xFyYvM80FvIZ8s0wiaX7MtpCibYqhWhXw1p7VduKKnB8eBrXGQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

#### 阶段一：提案级构建——从需求到功能图

目标是用户的需求描述转化为一张功能图。过程包括：

1. **功能树检索** ：ZeroRepo 不直接让LLM枚举功能（容易不稳定），而是基于一个大规模功能树（EpiCoder Feature Tree，包含150万个软件能力节点）进行检索。每个功能节点都有向量表示，便于相似度匹配。
2. **探索-利用子树选择** ：采用类似推荐系统的策略：
- **利用** ：检索与用户目标最相关的Top-k功能路径。
	- **探索** ：主动探索功能树中未访问的区域，发现潜在相关功能。
4. **目标对齐重构** ：将检索到的功能重新组织成模块化的功能图。例如，将“轮廓系数”功能从“聚类算法”模块移动到“评估”模块，以提高内聚性。

#### 阶段二：实现级构建——从功能图到完整RPG

这一阶段为功能图注入实现细节：

- **文件结构编码** ：为每个模块分配文件夹和文件。例如，“算法”模块对应 `src/algorithms/` 目录，其中的“线性模型”组件对应 `linear_models.py` 文件。
- **数据流与函数编码** ：
- 添加数据流边，明确接口的输入输出约束。
	- 抽象共享结构为基类（如 `BaseEstimator` ），提升一致性和可维护性。
	- 将叶节点映射为具体函数或类。独立功能成为独立函数，相关功能聚合成类。

#### 阶段三：图引导代码生成——从RPG到可运行代码

ZeroRepo 按照RPG的拓扑顺序（依赖关系）依次生成代码：

- **测试驱动开发** ：对每个叶节点，先根据任务描述生成测试用例，再实现函数或类，并通过测试验证。失败则反复调试，直到通过。
- **图引导本地化与编辑** ：当需要修改或调试时，智能体先在图定位目标（通过功能匹配、代码查看、依赖追踪），再执行代码编辑。
- **分层测试验证** ：包括单元测试（单函数）、回归测试（修改后重测）、集成测试（多模块数据流验证）。

整个过程确保代码库是增量构建、测试验证、依赖一致的。

## 实验设置与评估

为了公平评估代码库生成能力，论文构建了 **RepoCraft** 基准，其关键设计如下：

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baj55oanejHVlb0DXxFRe1Rn8oEAEqSkpqXM786zicUG3mN7dctV3DbZLDicUGTtnSk73zJw9XAsNaFQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

RepoCraft 包含六个匿名化后的真实项目（如 MLKit-Py 对应 scikit-learn），涵盖机器学习、数据分析和Web框架等领域。每个项目提供大量任务（共1052个），评估指标包括：

- **功能覆盖率** ：生成代码库覆盖了多少官方文档中的功能类别。
- **功能新颖性** ：生成的功能中有多少是超出参考范畴的创新功能。
- **通过率与投票率** ：衡量实现的正确性（通过测试的比例）和一致性（多数投票验证）。
- **代码规模** ：文件数、代码行数（LOC）、令牌数等。

对比基线包括多智能体框架（MetaGPT、ChatDev）、工作流系统（Paper2Code）和终端代理（Claude Code、Gemini CLI等）。所有方法均运行30轮迭代，确保公平。

## 核心实验结果与分析

#### 功能覆盖与代码规模：ZeroRepo 显著领先

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baj55oanejHVlb0DXxFRe1RnwwnEc2DQZFXPJPHxfcTibDFZnYTwRvrLq6lUKbTqgr7xXYrY7aicM3aw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

实验结果显示，ZeroRepo 在功能覆盖率上达到81.5%（o3-mini模型），比最强基线Claude Code（54.2%）高出27.3个百分点。在代码规模上，ZeroRepo 生成平均3.6万行代码，是Claude Code的3.9倍，其他基线的64倍。这说明RPG驱动的规划能生成更完整、更接近真实规模的代码库。

#### RPG 支持近线性扩展，突破自然语言瓶颈

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

论文进一步分析了RPG的可扩展性。随着迭代进行，ZeroRepo 的功能数量和代码行数均呈现近线性增长，而基于自然语言的基线（如Codex、Gemini CLI）很快进入平台期。这是因为自然语言规划在迭代中容易累积不一致，而RPG作为持久化结构，能始终保持模块、接口和数据流的清晰性，支持长期扩展。

#### 图引导本地化提速开发效率

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在本地化（定位代码位置）任务中，图引导搜索将步骤减少了30-50%。RPG 为智能体提供了全局视角，使其能快速追踪依赖、定位错误，提升整体开发效率。

## 讨论

RPG 的成功背后是一个更深刻的启示： **结构化表示优于自然语言** 。自然语言适合人机交互，但不适合机器间的精确规划。RPG 通过图结构将软件工程中的抽象概念（如模块、数据流）具象化，使得AI能进行更长程、更一致的推理。

这项研究对AI辅助软件开发具有重要价值：

- **降低开发门槛** ：用户只需描述高层意图，AI就能生成完整、可用的代码库。
- **提升代码质量** ：通过测试驱动和依赖管理，减少错误和碎片化。
- **促进软件创新** ：RPG 支持功能扩展，甚至生成超出预设的新功能。

局限性方面，当前RPG仍依赖预定义的功能树，未来可探索更动态的图谱构建。此外，测试生成仍是瓶颈（覆盖率约60-70%），需进一步研究。

## 结论

本篇论文提出了 Repository Planning Graph（RPG），一种将软件功能与实现结构统一编码的图表示法，并基于此构建了 ZeroRepo 框架，实现了从零生成大规模代码库的能力。通过 RepoCraft 基准的验证，RPG 在功能覆盖率、代码规模和可扩展性上均显著优于现有方法。这不仅解决了AI生成代码库的核心挑战，也为未来AI驱动的软件工程奠定了坚实基础。下一步，研究可朝向更动态的图谱学习、跨语言代码库生成等方向推进。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

深度学习自然语言处理

向上滑动看下一个