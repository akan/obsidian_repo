---
title: "重塑记忆架构：LLM正在安装「操作系统」"
source: "https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&chksm=85031347679cbc881aeddbbbae26e522a969f143759b66dcc170073e5154886d3774cb52ad10&idx=3&mid=2650980055&sn=c79029345ca2e6ae2d702aae3a2b9b35#rd"
author:
  - "[[冷猫]]"
published:
created: 2025-08-13
description: "我们要给大模型「完整的一生」"
tags:
  - "大模型"
  - "记忆系统"
  - "长上下文处理"
abstract: "文章探讨了大模型记忆系统的研究进展及其与长上下文处理能力的关系。"
---
Original 冷猫 *2025年07月16日 12:22*

机器之心报道

**编辑：冷猫**

> 超长上下文窗口的大模型也会经常「失忆」，「记忆」也是需要管理的。

  

众所周知，现代大型语言模型（LLM）的上下文窗口普遍有限 —— 大多数模型只能处理数千到数万 token，比如早期的 GPT-3 仅有～2,048 token。虽然近期有些模型已经拓展到了百万级甚至千万级 token 窗口（如 Meta 的 Llama 4 Scout 宣称可达 1,000 万 token）。

  

图中显示了 LLM 上下文窗口大小的演变。

  

![image.png](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibEqNUfK68icQ5ibgMeaHuV73ph5dMcEqKFibPa8ia7boKukXQmIXQ0l0RXNiaowlIEVvp4VfmdIgP3uiaw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

注意：token 数量为近似最大值。「GPT-4.1」指的是 2025 年 4 月更新的 GPT-4，「Scout」是专为长上下文设计的 17B 参数 Llama 4 变体。

  

LLM 存在一个内在的「记忆缺陷」，即拥有的上下文窗口是有限的，这严重限制了它们在多轮次、多会话的长期交互中维持一致性的能力。

  

也因此，现代 LLM 普遍难以维持长期记忆。这对很多应用来说实在相当不妙，毕竟记忆是实现反思和规划的关键，也是智能体系统不可或缺的重要组成部分。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

基于 LLM 的自主智能体系统概况图，图源 Lil'Log https://lilianweng.github.io/posts/2023-06-23-agent/

  

近段时间，关于大模型记忆的相关研究多了起来，前些天开源的 [MemOS](https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&mid=2650978033&idx=1&sn=43db54ff2f9ef0d706c354df1c6104d8&scene=21#wechat_redirect) 就吸引了不少眼球。

  

与传统 RAG 或纯参数存储不同，MemOS 把 「记忆」 看作一种和算力同等重要的系统资源。对于大模型的长期记忆进行持续更新管理，将明文、激活状态和参数记忆统一在同一个框架里进行调度、融合、归档和权限管理，让大模型拥有了拥有了持续进化和自我更新的能力。

  

大模型记忆与长上下文处理能力

密不可分

  

之前探讨的大模型，能处理大量的 token，甚至达到千万 token 级别，这些均属于 LLM 的长上下文处理能力。实际的 LLM 使用经验告诉我们，具有强大长上下文处理能力的 LLM 都具有更强的记忆能力。

  

长上下文（Long Context）

  

- 指模型在当前推理过程中能「看到」的历史文本长度。
- 本质上是一次性输入到模型中的序列长度。
- 用于解决如文档问答、多轮对话、代码分析等需要上下文保持的任务。

  

「长上下文处理能力」包括：

  

长度泛化能力 ：模型在训练中未见过的更长的序列上进行外推的能力。如果超出训练长度，某些模型会灾难性地失败。

  

高效注意力能力 ：减少长序列计算 / 内存消耗的机制（亚平方算法）。这可能包括近似注意力、稀疏模式或完全替代的架构。

  

信息保留能力 ：指模型实际利用远距信息的能力。如果模型在一定位置之后实际上忽略了上下文内容，那么即使拥有庞大的上下文窗口也是无效的。如果训练不当，模型可能出现注意力权重衰减或在超过一定长度后丢失上下文等现象。

  

提示词与利用能力 ：研究如何设计提示词（prompt）以最大限度发挥长上下文的优势。

  

记忆（Memory）

  

- 指模型跨多轮对话 / 使用所保留的信息。
- 是一种持久化机制，记录关于用户、对话、偏好等信息。

  

SwirlAI 创始人兼 CEO Aurimas Griciūnas 认为，可以将 LLM 的记忆分为以下类型：

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

1\. 事件记忆 \- 这种类型的记忆包含代理过去的交互和执行的操作。每当完成某个操作，控制系统会将该操作信息写入持久化存储中，便于未来调用或回溯。

  

2\. 语义记忆 \- 语义记忆包括可访问的外部知识信息，以及其对自身状态和能力的理解。这种记忆既可以是仅代理内部可见的背景知识，也可以是用于限制信息范围、提升回答准确性的锚定上下文（grounding context），从海量互联网数据中筛选出与当前任务相关的信息。

  

3\. 程序性记忆 \- 程序性记忆指的是与系统运行机制相关的结构性信息，例如系统提示词（system prompt）的格式、可调用的工具、预设的行为边界（guardrails）等。

  

4\. 在特定任务场景下，代理系统会根据需求从长期记忆中调取相关信息，并暂存于本地缓存，以便快速访问和任务执行。

  

5\. 从长期记忆中调取的信息与当前局部缓存的信息共同构成了代理的 工作记忆 （也称 短期记忆 ）。这些信息会被整合成最终输入给大语言模型（LLM）的提示词，用于指导其生成后续行为指令或任务响应。

  

如图所示，通常将 1 - 3 标记为长期记忆，将 5 标记为短期记忆。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

长上下文能力和记忆能力 可协同工作 ：

  

- 记忆系统中的信息（如用户偏好）可被注入到上下文中，作为提示的一部分；
- 长上下文窗口能帮助模型在当前对话中维持短期「记忆」，减少依赖记忆系统。

  

实现 LLM 记忆的几种方法

  

长上下文的方法

  

正如前文讨论的，当对话内容超出了上下文长度时，LLM 可能会出现忘记用户的喜好、重复提问，甚至与之前确认的事实相冲突的现象。最直接的提高 LLM 记忆能力的方法就是提高 LLM 的长上下文处理能力。目前，提高 LLM 长上下文处理能力的方法有：

  

1、 RAG （检索增强生成，Retrieval-augmented Generation） 作为构建知识库并检索引导 LLM 生成的方法具有非常强的泛用性。通过将结构化或非结构化数据转化为可检索的语义表示，RAG 实现了 「先检索、再生成」 的流程，使得 LLM 能够结合外部知识应对事实性问题，减少幻觉。

  

RAG 架构支持对文档动态更新，便于构建实时可扩展可编辑的知识体系，这为后续的 LLM 记忆的构建和记忆系统的设计提供了基础。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

图中对比 RAG 流程与纯长上下文方法的差异，RAG 效率高，但可能遗漏间接上下文；长上下文使用虽然全面，但需要模型处理非常大的输入。

  

2、 分层摘要 ：在对一本书进行总结时，可以通过递归的方式将每一章分别进行摘要，得到中间摘要，然后再对这些中间摘要进行进一步总结，依此类推。这种方法可以应对远超模型上下文长度的输入，但其操作流程较为繁琐，且容易在多轮摘要过程中引入和累积错误。

  

3、 滑动窗口推理 ：对于需要对长文本进行阅读理解等任务，可以将模型应用于文本的滑动窗口上（例如，第 1–5 段，然后是第 2–6 段，依此类推），再通过某种方法或次级模型对各窗口的输出结果进行整合。

  

研究人员探索了多种算法途径来扩展上下文窗口。广义而言，这些方法可以分为：(a) 用于长度外推的位置编码方法，(b) 高效或稀疏注意力架构，（c) 替代序列模型（取代自注意力），以及 (d) 混合或记忆增强方法。

  

了解更多有关 LLM 长上下文窗口的细节信息，可以参阅来自 Dr. Adnan Masood 的文章：

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

- 文章链接：https://medium.com/%40adnanmasood/long-context-windows-in-large-language-models-applications-in-comprehension-and-code-03bf4027066f

  

记忆的方法

  

尽管上下文能力与大模型记忆紧密相关，但 上下文窗口并不能直接等价于记忆 。

  

以构建一个聊天机器人为例，该机器人需要记住用户在此前对话中说过的话。随着对话长度的增加，记忆管理会将信息从输入上下文中移出，存入一个可搜索的持久数据库；同时对信息进行总结，以便将相关事实保留在输入上下文中；还会在需要时从较早的对话中恢复相关内容。这种机制使得聊天机器人能够在生成下一轮回复时，将当前最相关的信息保留在其输入上下文记忆中。

  

基于记忆的方法看上去与 RAG 非常相似，实际上也确实如此。大致上分为两种类型。

  

固定记忆池

  

一类方法采用 外部编码器 将知识注入到记忆池中，例如 Memory Network，其重点在于解决 RNN 中的遗忘问题。后续工作则通过计算整个记忆池的加权和，作为记忆的代表向量。最具代表性的工作 MemoryLLM，在 LLM 的潜在空间中集成了一个内置记忆池。这个记忆池的设计目标是：在固定容量的限制下，实现新知识的有效整合，并最大程度地减少信息遗忘，从而避免记忆无限增长的问题。

  

另一类方法则直接使用 语言模型本身作为编码器 来更新记忆。例如，Memory Transformer 以及 RMT，提出在读取上下文时添加记忆 token，其中记忆池最多包含 20 个 token。

  

尽管这些固定大小的记忆池在实验中表现出一定的效果，但其性能仍受到记忆容量限制。

  

非固定记忆池

  

其他基于记忆的方法通常采用非固定大小的记忆池，并引入不同的遗忘机制以应对记忆不断增长的问题。在这些方法中，记忆池通常以以下几种形式存在：

  

1\. 隐藏状态（hidden states） ：如 MemoryBank，将中间表示作为可持久化的记忆内容存储。

2\. 键值对（key-value pairs） ：代表性方法包括 KNN-LM 和 LONGMEM，以可检索的键值结构进行知识保存和回调。

3\. 隐藏空间向量（vectors in hidden space） ：如 Memformer 通过在潜在空间中保存向量来增强上下文记忆。

4\. 原始文本（raw texts） ：如 RET-LLM，将知识以三元组的形式存入记忆中，并通过 API 查询方式，在当前上下文下检索相关信息。

  

这些方法提供了更灵活的记忆机制，但由于缺乏结构化的压缩与管理手段，存储的知识可能存在冗余，影响记忆效率与模型推理性能。

  

有关大模型记忆的部分技术，可以参考以下论文：

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

- 论文标题：MemoryLLM: Towards Self-Updatable Large Language Models
- 论文链接：https://arxiv.org/abs/2402.04624

  

记忆数据管理：记忆系统

  

据前文所述，LLM 的记忆与数据库非常相似。虽然 RAG 引入了纯文本的外部知识，但它仍然是一种无状态的工作方法，缺乏生命周期管理与持久表示的整合能力。

  

记忆系统本质上和 RAG 检索是几乎一致的 ，但记忆系统机制会在记忆存储的基础上增加更丰富的信息组织、信息管理和信息检索方法，将记忆存储管理与计算机操作系统的原理相结合，能够构建更加完善的记忆机制，使 LLM 拥有更持久的记忆。

  

近期有关 LLM 记忆系统的研究逐步走入聚光灯下，大多受 传统操作系统的内存机制 启发，建立了全新架构的记忆管理模式。以近期几个具有代表性的研究工作为例：

  

Coursera 联合创始人，前百度 AI 部门总负责人，前 Google Brain 项目创始成员与负责人吴恩达在近期的短课程中提到：

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

大型语言模型（LLM）的输入上下文窗口具有有限空间。使用更长的输入上下文不仅成本更高，而且处理速度更慢。因此，管理存储在该上下文窗口中的内容至关重要。

  

在论文《 MemGPT: Towards LLMs as Operating Systems》中，作者提出使用一个 LLM 代理来管理该上下文窗口。该系统配备了一个大型的持久内存，用于存储所有可能被纳入输入上下文的信息，而一个代理则负责决定哪些信息实际被包含进去。该技术受 传统操作系统中分层内存系统 的启发：通过在物理内存与磁盘之间进行分页，实现扩展虚拟内存的假象。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

- 论文标题：MemGPT: Towards LLMs as Operating Systems
- 论文链接：https://arxiv.org/abs/2310.08560

  

记忆张量（上海）科技有限公司联合上海交通大学、中国人民大学、同济大学、浙江大学、中国电信等多家顶尖团队发布了 [MemOS](https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&mid=2650978033&idx=1&sn=43db54ff2f9ef0d706c354df1c6104d8&scene=21#wechat_redirect) （Memory Operating System），一套面向大模型的工业级记忆操作系统。在技术实现层面，MemOS 借鉴了 传统操作系统的分层架构 设计，也融合了 Memory3（忆立方）大模型在记忆分层管理方面的核心机制。整个系统由 API 与应用接口层、记忆调度与管理层、记忆存储与基础设施层三大核心层次组成，构建了一套从用户交互到底层存储的全链路记忆管理闭环。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

- 项目官网：https://memos.openmem.net
- 论文链接：https://memos.openmem.net/paper\_memos\_v2

  

北邮百家 AI 团队推出首个大模型记忆操作系统开源框架 [MemoryOS](https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&mid=2650972566&idx=3&sn=c1da39ddc71efd3f32a9632b85edeb94&scene=21#wechat_redirect) ，借鉴了现代 操作系统中成熟的内存管理 原则，采用短期、中期、长期三级分层记忆存储体系（实时对话存储、主题信息整合、个性化知识沉淀），包含四大核心功能：记忆存储、记忆更新、记忆检索和响应生成，全方位管理 AI 记忆系统。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

- 项目地址：https://github.com/BAI-LAB/MemoryOS
- 论文链接：https://arxiv.org/abs/2506.06326

  

加利福尼亚大学圣迭戈分校（UCSD）博士生 Yu Wang 和纽约大学教授陈溪（Xi Chen）联合推出并开源了 [MIRIX](https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&mid=2650979993&idx=2&sn=c0b95d0bf043e027da716ab2800fb6e2&scene=21#wechat_redirect) —— 全球首个真正意义上的多模态、多智能体 AI 记忆系统。 MIRIX 拥有六类核心记忆，能够细分认知角色。 提出了一种 模块化多智能体架构（multi-agent architecture） ，由若干专用组件在统一调度机制下协作完成输入处理、记忆更新和信息检索。

  

![图片](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

- 论文标题：MIRIX: Multi-Agent Memory System for LLM-Based Agents
- 论文链接：https://arxiv.org/abs/2507.07957

  

除此以外，在针对 LLM 记忆管理与更新的前沿研究工作中，另一类参考 人类神经或人类大脑记忆 的模式同样取得了很好的结果。

  

Larimar —— 一种受大脑启发的新型架构，用于通过 分布式情景记忆 增强 LLMs。人类能非常迅速地执行知识更新和泛化，在大脑中，这种快速学习被认为依赖于海马体及其情景记忆能力。该工作受人类情景记忆能力的启发，构建了分层内存框架，提出了一种用于实时测试时适应的情景化且可适应的记忆条件 LLM 架构。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

- 论文标题：Larimar: Large Language Models with Episodic Memory Control
- 论文地址：https://arxiv.org/pdf/2403.11901

  

[M+](https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&mid=2650979940&idx=3&sn=878aed4c2ab85dab201bc770ec4f6c5c&scene=21#wechat_redirect) 探索了探索隐空间 (Latent-Space) 的 记忆 —— 既压缩又可端到端训练，更接近 人类在神经激活中存储信息 的方式。 该工作在 MemoryLLM 之上提出的长期隐空间记忆扩展框架：通过把「过期」隐藏向量写入 CPU - 侧长期记忆池，再用协同检索器拉回最相关记忆，它将 8 B 级模型的有效记忆跨度从原本不到 20 k tokens 提升到 160 k tokens 以上，同时显存占用保持不变。

  

![image.png](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

- 论文标题：M+: Extending MemoryLLM with Scalable Long-Term Memory
- 论文链接：https://arxiv.org/abs/2502.00592

  

如有相关前沿研究进展，欢迎读者留言推荐，共同交流探讨。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

© THE END

转载请联系本公众号获得授权

投稿或寻求报道：liyazhou@jiqizhixin.com

继续滑动看下一个

机器之心

向上滑动看下一个