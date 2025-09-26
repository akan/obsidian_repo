---
title: "清华重磅发布 UltraRAG 2.0：告别复杂工程，RAG科研进入“低代码”时代"
source: "https://mp.weixin.qq.com/s/WqdcuDK3jwhx1EwxdrPiOg"
author:
  - "[[唐国梁Tommy]]"
published:
created: 2025-09-26
description: "在人工智能领域，检索增强生成（RAG）技术正从简单的“检索+生成”模式，迅速演变为集自适应知识组织、多轮推理和动态检索于一体的复杂知识系统。然而，这种复杂性的提升也给科研人员带来了巨大的工程实现挑战，快速验证和迭代新想法变得异常困难。"
tags:
  - "RAG框架"
  - "低代码开发"
  - "科研加速"
abstract: "清华大学推出的UltraRAG 2.0框架通过YAML声明式编程和MCP架构，大幅降低了复杂RAG系统的开发门槛，使研究人员能更专注于算法创新。"
---
Original 唐国梁Tommy *2025年09月26日 13:49*

> \>>>本系列视频课程已在我的同名B站(🔍唐国梁Tommy)上线，复制以下链接或点击文末“阅读原文”即刻开始学习。
> 
> https://www.bilibili.com/video/BV1ZBpozAEqB/?share\_source=copy\_web&vd\_source=44de46517e4609888d4085939ef749f4

在人工智能领域， 检索增强生成（RAG）技术正从简单的“检索+生成”模式，迅速演变为集自适应知识组织、多轮推理和动态检索于一体的复杂知识系统 。然而，这种复杂性的提升也给科研人员带来了巨大的工程实现挑战，快速验证和迭代新想法变得异常困难。

现在，一款革命性的工具将彻底改变这一现状。由清华大学、东北大学等顶尖研究机构联合推出的 UltraRAG 2.0，作为首个基于模型上下文协议（MCP）架构的RAG框架，通过业界首创的YAML声明式编程范式 ，将复杂RAG系统的开发门槛降低90%，支持17个主流benchmark和多种SOTA算法，让研究者可以更专注于算法和模型的创新。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Ag3F8pT7iaZ0sc4jkricBcjJBvXtYQSxT4hNDTuWJiaZYn21h6ExlibYibjuleIpys6ap7C1x64m8zWiaMsEhQ1FTkibQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

## UltraRAG 2.0 项⽬深度剖析

随着RAG系统从简单的"检索+生成"演进至融合自适应知识组织、多轮推理、动态检索的复杂知识系统（如DeepResearch、Search-o1），科研人员在方法复现和快速迭代新想法时面临高昂的工程实现成本。

### 现有RAG框架普遍存在以下问题：

- **复杂推理支持不足** ：传统RAG难以实现多轮推理、动态检索、条件分支等复杂逻辑
- **方法复现成本高** ：科研人员需要花费大量时间在工程实现上，难以快速验证新想法
- **模块复用困难** ：不同框架间缺乏统一接口，难以跨项目复用组件
- **评测标准不一** ：缺乏统一的评测体系和基线对比

### UltraRAG 2.0：以声明式编程重塑RAG开发

UltraRAG 2.0的核心突破在于引入了模型上下文协议（MCP）和YAML声明式编程。这一设计理念将RAG的核心组件（如检索、生成、评估等）封装为标准化的独立服务（MCP Server）。研究者无需编写冗长的过程代码，只需通过简洁的YAML文件来“声明”和编排复杂的RAG流程。

**1\. 技术亮点：**

- **组件化封装** ：将RAG 的核心组件封装为标准化的独立 MCP Server；
- **灵活调用与扩展** ：提供函数级Tool接口，实现模块间通信；
- **轻量流程编排** ：借助MCP Client，建立自上而下的简洁化链路搭建；
- **热插拔架构** ：新模块可无缝接入，无需修改全局代码

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

> **Pipeline** ：是用户以 YAML 编写的流程定义文件，用于描述各组件与工具的调用顺序与执行逻辑
> 
> **Client** ： 是流程的调度中枢，负责解析 Pipeline，统一协调各 Server 中 Tool 的执行与调用顺序
> 
> **Server** ： 包含所有可独立调用的功能模块，开发者可通过标准化接口便捷添加新功能或模块，实现系统的灵活扩展与高效组合

### 2\. 核心功能与应用场景（向左滑动查看完整表格）

| 功能模块 | 核心能力 | 应用场景 |
| --- | --- | --- |
| **Pipeline编排引擎** | YAML声明式流程定义，支持loop/branch/条件控制 | 复杂多轮推理系统快速原型 |
| **MCP Server生态** | 标准化的检索、生成、评估、路由组件 | 模块化RAG系统构建 |
| **多模态检索** | 支持文本+图像的统一检索框架 | 多模态知识问答 |
| **外部工具集成** | Tavily搜索、Exa搜索等外部API集成 | 实时信息获取和验证 |
| **统一评测体系** | 17个benchmark的标准化评测流程 | 科研对比实验和性能基准 |
| **SOTA基线集成** | IRCoT、IterRetGen、RankCoT等前沿算法 | 算法对比和快速复现 |

### 3\. 技术栈深度分析（向左滑动查看完整表格）

| 技术层级 | 核心技术选型 | 版本要求 | 作用 |
| --- | --- | --- | --- |
| **运行时环境** | Python 3.11+ | \>=3.11, <3.13 | 充分利用现代Python特性，保持向后兼容 |
| **协议标准** | Model Context Protocol (MCP) | FastMCP 2.11.3 | 开放标准，确保生态兼容性 |
| **AI推理框架** | PyTorch 2.7.1 + CUDA 12.x | PyTorch生态 | GPU加速的深度学习标准栈 |
| **向量计算** | FAISS (CPU/GPU) + LanceDB | 企业级性能 | 多种向量数据库支持，灵活选择 |
| **LLM服务** | vLLM + OpenAI API | 混合部署 | 本地部署+云服务的混合策略 |
| **文档处理** | LlamaIndex + Chonkie | 多格式支持 | 企业级文档解析能力 |
| **容器化** | Docker + CUDA Runtime | 标准化部署 | 确保跨平台一致性 |

---

### 架构深度剖析：MCP如何驱动RAG创新

UltraRAG 2.0的架构设计充分体现了“协议优先”和“声明式编排”的核心原则。

### 1\. 架构模式与设计

**架构范式：** UltraRAG 2.0采用基于MCP协议的 **事件驱动微服务架构** ，结合 **声明式编程** 范式，实现了高度解耦的模块化设计。

**核心设计原则：**

- **协议优先** ：基于MCP开放标准，确保组件间互操作性
- **声明式编排** ：YAML描述"What"而非"How"，降低认知负担
- **热插拔扩展** ：新功能以MCP Server形式无缝接入
- **状态管理统一** ：全局变量池+内存快照机制保证状态一致性
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 2\. 核心模块职责

**MCP Client (流程编排器)**

- **职责** ：解析YAML pipeline定义，执行复杂控制流程，管理全局状态
- **边界** ：不处理具体业务逻辑，专注于流程调度和状态管理
- **关键特性** ：支持loop循环、branch分支、条件判断等高级控制结构

**MCP Server组件群 **（向左滑动查看完整表格）****

| Server名称 | 核心职责 | 技术边界 |
| --- | --- | --- |
| **Retriever** | 向量检索、语义搜索、外部API调用 | 仅负责信息获取，不参与推理 |
| **Generation** | LLM调用、提示工程、模型管理 | 专注生成质量，不涉及检索逻辑 |
| **Evaluation** | 自动评测、指标计算、结果分析 | 独立评测体系，避免评测偏见 |
| **Router** | 条件判断、流程分支、状态路由 | 纯逻辑判断，无状态副作用 |
| **Prompt** | 提示模板管理、Jinja2渲染 | 模板化复用，与业务逻辑解耦 |

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这种基于事件驱动的微服务架构，让研究者可以专注于“What to do”，而将“How to do”交给框架处理，极大地降低了认知负担。

### 应用实例：企业级知识问答

下图展示了UltraRAG 2.0在企业知识问答场景下的工作流程。从知识查询请求到最终答案的生成和监控，整个流程通过模块化的服务协同完成，清晰高效。

#### 场景1：企业级知识问答系统

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### 场景2：Search-o1多轮推理流程

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 评测与基线：加速科研进程

为了方便研究者进行严谨的学术对比， UltraRAG 2.0内置了对17个主流benchmark的开箱即用支持 ，覆盖了从QA到事实验证等多种任务类型。同时，它还集成了多种高质量的基线方法，为算法的快速复现和比较提供了坚实的基础。

### 支持的Benchmark（向左滑动查看完整表格）

| 任务类型 | 数据集名称 | 原始规模 | 采样规模 |
| --- | --- | --- | --- |
| QA | NQ | 3,610 | 1,000 |
| QA | TriviaQA | 11,313 | 1,000 |
| QA | PopQA | 14,267 | 1,000 |
| QA | AmbigQA | 2,002 | 1,000 |
| QA | MarcoQA | 55,636 | 1,000 |
| QA | WebQuestions | 2,032 | 1,000 |
| Multi-hop QA | HotpotQA | 7,405 | 1,000 |
| Multi-hop QA | 2WikiMultiHopQA | 12,576 | 1,000 |
| Multi-hop QA | Musique | 2,417 | 1,000 |
| Multi-hop QA | Bamboogle | 125 | 125 |
| Multi-hop QA | StrategyQA | 2,290 | 1,000 |
| Multiple-choice | ARC | 3,548 | 1,000 |
| Multiple-choice | MMLU | 14,042 | 1,000 |
| Long-form QA | ASQA | 948 | 948 |
| Fact-verification | FEVER | 13,332 | 1,000 |
| Dialogue | WoW | 3,054 | 1,000 |
| Slot-filling | T-REx | 5,000 | 1,000 |

### 内置基线方法（向左滑动查看完整表格）

| 基线名称 | 示例YAML路径 | 核心思路 | 适用场景 |
| --- | --- | --- | --- |
| Vanilla LLM | examples/vanilla.yaml | 直接LLM问答，无检索 | 基础对比基线 |
| Vanilla RAG | examples/rag.yaml | 简单检索+生成 | 标准RAG基线 |
| IRCoT | examples/IRCoT.yaml | 交替检索与推理链 | 多步推理任务 |
| IterRetGen | examples/IterRetGen.yaml | 迭代检索生成 | 需要多轮检索的任务 |
| RankCoT | examples/RankCoT.yaml | 检索结果重排序+推理 | 检索质量要求高的任务 |
| R1-searcher | examples/r1\_searcher.yaml | 强化学习搜索 | 复杂推理任务 |
| Search-o1 | examples/search\_o1.yaml | 多轮搜索推理 | 需要深度推理的任务 |
| Search-r1 | examples/search\_r1.yaml | 改进版搜索推理 | 高质量推理要求 |

---

## 项目总结

UtraRAG 2.0不仅仅是一个工具，它更代表了RAG技术发展的新方向 —— 通过标准化和模块化，降低复杂系统的实现门槛。

- 核心价值 ： 将复杂的工程实现抽象为简单的配置文件，实现了真正的模块化和可复用性。
- 技术创新 ： 首次将MCP架构大规模应用于RAG领域，实现了优雅的声明式Pipeline定义。
- 发展潜力 ： 有望成为RAG研究的标准化平台，并通过丰富的扩展接口，从研究工具平滑演进至产业级平台。

对于每一位奋斗在AI前沿的研究者和工程师而言，UltraRAG 2.0无疑是一款能将你从繁琐的工程细节中解放出来，更专注于思想创新的强大“加速器”。

## 进阶学习

你是不是也有这样的困惑：感觉每天都在追热点，却始终难以将AI知识串联成线？想深入多模态领域，却不知从何处系统性的开始？

如果你不满足于只做AI时代的“旁观者”，渴望成为“玩家”和“创造者”，那么我诚挚地向你推荐我精心打磨的这门 《多模态大模型 前沿算法与实战应用 第一季》 精品课程。 课程从主流多模态架构、数据构建与训练流程到评估与部署，结合 LLaVA、LLaVA-NeXT、Qwen-VL、IXC 四个完整项目，提供算法 原理→功能实现→服务部署→模型评测的清晰路径。

学习的本质，是用最低的时间成本掌握他人已经验证过的宝贵经验。这门课，就是你开启多模态AI系统性学习和实践的最佳入口。

你可以在我的 B站： 唐国梁Tommy 或我的个人 网站：TGLTommy.com (需科学上网)参与本课程，请参阅 [《精品付费课程学习指南》](https://mp.weixin.qq.com/s?__biz=MzI0MjMyMTQ5Mw==&mid=2247492865&idx=1&sn=731a34bb90bffa5964a1029ce734d2aa&scene=21#wechat_redirect) ，点击下方图片查看课程详情： ![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

学无止境，一起加油！💪🏻

[Read more](https://mp.weixin.qq.com/s/)

继续滑动看下一个

唐国梁Tommy

向上滑动看下一个