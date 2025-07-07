---
title: "重塑AI记忆边界：MemOS开源！时序推理较OpenAI提升159%"
source: "https://mp.weixin.qq.com/s/vVFbZRw-U9S7fS_Va7ykKA"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-07-07
description: "一套面向大模型的工业级记忆操作系统"
tags:
  - "记忆操作系统"
  - "开源框架"
  - "性能提升"
abstract: "MemOS开源框架显著提升大模型记忆管理性能。"
---
*2025年07月07日 12:48*

机器之心发布

**机器之心编辑部**

> 大模型记忆管理和优化框架是当前各大厂商争相优化的热点方向，MemOS 相比现有 OpenAI 的全局记忆在大模型记忆评测集上呈现出显著的提升，平均准确性提升超过 38.97%，Tokens 的开销进一步降低 60.95%，一举登顶记忆管理的 SOTA 框架，特别是在考验框架时序建模与检索能力的时序推理任务上，提升比例更是达到了 159%，相当震撼！

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWicMNa3wBb6Ey2lJY6hJwAKv2o95Tm7GuYn9j3r4f8TsSicnNsLfLSTrl3yF5icaNIicIslxKWfJKuKhA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

图 1. MemOS 项目官网报告的性能表现

  

在大型语言模型（LLM）一路狂飙的这几年，参数规模和算力几乎成了 AI 能力的代名词。可当大模型逐渐走进科研、产业和生活，每个人都在问一个更深层的问题： 它究竟能不能 “记住” 点什么？

  

从陪伴式对话、个性化推荐，到多轮任务协作，模型只靠一次推理、一次检索，远远不够。如何让 AI 拥有 可管理、可迁移、可共享的长期记忆 ，正在成为新一代大模型应用的关键挑战。

  

近日， 记忆张量 （上海）科技有限公司联合上海交通大学、中国人民大学、同济大学、浙江大学、中国电信等多家顶尖团队发布了 MemOS（Memory Operating System） ，一套面向大模型的工业级记忆操作系统。 它的技术路线起步于 2024 年团队推出的 Memory3（忆立方）记忆分层大模型 —— 当时首次提出了记忆分层的概念，让模型可以把部分知识 “外化” 存储，减少推理成本，也为后续的长期学习打下基础。

  

- 项目官网：https://memos.openmem.net
- 项目论文：https://memos.openmem.net/paper\_memos\_v2
- 代码仓库：https://github.com/MemTensor/MemOS
- Discord 讨论组：https://discord.gg/Txbx3gebZR
- OpenMem 社区联系邮箱：contact@openmem.net

  

与传统 RAG 或纯参数存储不同，MemOS 把 “记忆” 看作一种和算力同 等重要的系统资源。它通过标准化的 MemCube 记忆单元，将明文、激活状态和参数记忆统一在同一个框架里进行调度、融合、归档和权限管理。简单来说，模型不再只是 “看完即忘”，而是拥有了 持续进化和自我更新的能力。

  

在行业看来，这种面向 AI 长期记忆的操作系统思路，或许会重塑智能系统的应用边界 —— 让大模型真正从 “静态生成器”，变成可以陪伴用户长期成长的 “数字同事” 和 “数字助理”。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWicMNa3wBb6Ey2lJY6hJwAKvavr5kEZqYwOOpuOazpsL16Brl90BZLolbcQWqicicSGufthjsic0plj9w/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

图 2. MemOS 项目官网 https://memos.openmem.net/

  

系统架构和核心创新

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 3. MemOS 框架（源自 MemOS 官网）

  

在技术实现层面，MemOS 借鉴了传统操作系统的分层架构设计，也融合了 Memory3（忆立方）大模型在记忆分层管理方面的核心机制。整个系统由 API 与应用接口层、记忆调度与管理层、记忆存储与基础设施层 三大核心层次组成，构建了一套从用户交互到底层存储的全链路记忆管理闭环。

  

在 API 与应用接口层 ，MemOS 提供了标准化的 Memory API，开发者可以通过简单的接口实现 记忆创建、删除、更新 等操作，让大模型具备易于调用和扩展的持久记忆能力，支持多轮对话、长期任务和跨会话个性化等复杂应用场景。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

表 1. 从计算机操作系统到记忆操作系统

  

在记忆调度与管理层，MemOS 提出了 记忆调度（Memory Scheduling） 的全新范式，支持基于上下文的 “下一场景预测”（Next-Scene Prediction）， 可以在模型生成时提前加载潜在需要的记忆片段，显著降低响应延迟、提升推理效率。

  

如图 4 所示，MemOS 通过在不同的 Round、Session 或者 Agents 流程之间，异步对应用所需的潜在记忆进行预测与推荐，实现 Next-Scene Prediction。 具体地，MemOS Scheduler 通过在应用的不同位置埋触发点（Trigger），不断搜集和汇总记忆需求。触发器生产的这些记忆需求会被添加到调度器的监控队列（Monitoring Queue）中，以供调度执行器（Scheduling Executor）去消费， 从而将 高频、高相关的记忆提前预备到 MemCube 中合适的位置（或 KV Cache 缓存、或明文工作区记忆存储等）去 ，大幅加速潜在的推理时间，提升记忆召回的准确性和效率。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 4. 记忆调度的核心思路

  

而在 记忆存储与基础设施层， MemOS 通过标准化的 MemCube 封装，将明文记忆、激活记忆和参数记忆三种形态有机整合。它支持多种持久化存储方式，包括 Graph 数据库、向量数据库等，并具备 跨模型的记忆迁移与复用能力。

  

整体来看，MemOS 不仅在技术框架上实现了对 AI 记忆的结构化、系统化管理，也为未来构建 可共享、可迁移、可演化的 AI 记忆生态 奠定了基础。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 5. 标准化 MemCube（记忆立方体）的基础构成

  

应用场景

  

在应用层面，MemOS 的推出为大模型在未来多个关键场景中带来了全新的能力突破：

  

- 个性化智能体 ：MemOS 可以持续积累和管理用户的偏好、历史对话与行为习惯，让每一次交互都在 “记忆之上” 不断优化体验，真正实现长期陪伴和个性化服务。
- 科研与知识管理 ：在科研场景中，MemOS 支持将分散的项目资料、笔记、分析结果以结构化方式长期保存和动态调用，帮助研究人员打造具备深度 “记忆力” 的智能助手，提升知识管理效率和研究连续性。
- 高可靠性场景 ：在金融、法律等对溯源和合规要求极高的领域，MemOS 将提供记忆溯源与权限审计功能，使模型的推理结果可以精准追溯到具体知识来源，增强透明度和可信性。
- 企业级 RAG 应用 ：在企业级检索增强生成（RAG）场景，MemOS 能够有效解决新旧知识混用、信息冲突等问题，确保模型在多轮对话和长周期任务中依然保持稳定、一致的回答能力。

  

凭借对三类记忆的统一调度与封装，MemOS 不仅显著提升了模型的智能性和灵活性，也为企业构建安全、可控、持续演进的 AI 应用奠定了基础。

  

接下来，MemOS 团队将上线 Playground 功能，面向开发者和企业用户开放体验，直观展示在多样化任务中，记忆能力带来的性能提升和应用潜力。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 6. MemOS Playground 即将上线测试

  

开源框架

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 7. 项目开源地址：https://github.com/MemTensor/MemOS

  

作为一套完全开源的工业级框架，MemOS 的设计理念强调 “标准化、模块化、可组合” ，面向开发者提供了清晰且易于集成的架构和工具链。

  

在 GitHub 公开的 Preview 版本中，MemOS 已实现包括 Memory API、核心调度模块（MemScheduler）、树 - 图状的明文记忆管理、KV Cache 激活记忆管理在内的多个关键功能，并提供了详尽的示例代码和演示脚本，帮助开发者快速上手，灵活构建具备持久记忆能力的智能应用。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 8. pip install MemoryOS 一键安装使用

  

该框架遵循 分层解耦 的设计原则，所有核心能力均以 Python 类和 REST 接口 两种形式对外开放，既可用于轻量级本地测试，也能与生产环境下的大模型（如 HuggingFace、OpenAI、Ollama 等）实现无缝集成。

  

未来，MemOS 将持续完善 记忆生命周期管理、参数记忆插拔、跨平台记忆迁移 等高级功能，并通过 MemCube 标准支持 “Memory-as-a-Service”（记忆即服务） 的部署模式，帮助开发者和企业在不同场景下灵活构建具备持久记忆的 AI 系统。

  

MemOS-Preview 版本性能详细评估

  

在当前版本中，MemOS 重点评估了框架在 对话类场景下的记忆抽取与检索效率 ，并采用行业公认的 LoCoMo（Long Conversational Memory）Benchmark 进行测评（Maharana A, Lee D H, Tulyakov S, et al. Evaluating Very Long-term Conversational Memory of LLM Agents. ACL, 2024）。

  

LoCoMo 评估集合由 Maharana 等人于 2024 年提出，并发表于 ACL 2024，旨在系统评估和强化 LLM 对 极长对话历史的记忆能力 。 目前，该基准已经成为包括 Mem0、Zep 等多种记忆管理框架的标准化测评工具。

  

本次评估主要考察模型在以下四项任务中的表现：

  

- 单跳任务评估（Single Hop） ：测试模型在已知上下文中对单一事实的直接回忆能力。
- 多跳任务评估（Multi Hop） ：考察模型能否通过多轮推理整合分散信息。
- 开放问题评估（Open Domain） ：评估模型在非限定问题上的记忆准确性和灵活性。
- 时序推理任务（Temporal Reasoning） ：检验模型处理事件顺序和时间逻辑的能力。

  

当前 MemOS-Preview 版本在以上任务中的详细评估结果如下表 2：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

表 2. LoCoMo 端到端实验性能对照表

  

从评估结果来看， MemOS-Preview-0630 版本 相比 OpenAI 的全局记忆方案，在性能表现和 Tokens 开销方面均实现了全面提升。

  

与 Mem0（本次评测采用 Mem0 官方提供的 Pro 版本高性能接口）相比，MemOS 在各项核心指标上也取得了显著进步。特别是在 时序推理 这一对记忆系统要求最高的任务上，MemOS 相较 Mem0 和 OpenAI 均实现了超过 20% 绝对值的性能提升 ，最高超过 159% 的相对值的提升，进一步验证了其在复杂对话和长期推理场景中的优势。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 9. MemOS 各项性能指标随召回 TOP-K 数量的消融实验

  

在记忆管理场景中， 召回记忆的数量（TOP-K 值）以及对应的总 Context 长度 ，直接决定了框架的检索效率和推理性能。通常而言，框架效率越高，就越能够在相对较小的召回容量下取得最准确的回忆结果，从而显著降低 Tokens 的编码开销。

  

如图 9 所示，MemOS 在召回区间 TOP-20 左右 时，仅需约 1000 个 Tokens 的上下文长度，即可在各项评估指标上取得优异表现。相比之下，对照组在达到相似准确度时，通常需要 2000–4000 Tokens 的召回区间，MemOS 在保证效果的同时大幅减少了检索所需的输入规模和推理负担。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

表 3. 检索效率评估

  

此外，为了系统评估当前开源框架在 检索时效性 方面的表现，MemOS 团队针对原始 RAG 框架和现有多种记忆管理方案开展了全面的消融实验。

  

从表 3 中的结果可以看出， MemOS-Preview 开源版本 的检索性能已接近多个主流商业化记忆管理框架的 API 接口，并在最终效果得分上实现了显著提升。值得注意的是，在部分评测任务中，MemOS 的表现甚至优于 Full-Context 方案，展现出在高效记忆管理与资源利用之间的良好平衡能力。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

表 4. 记忆调度场景 KV Cache 复用的加速性能实验

  

同时，为了进一步评估 MemOS-Preview 版本 在调度场景下的 记忆缓存复用功能 ，作者围绕不同模型规模和输入长度，对缓存复用的性能进行了详细的消融实验。

实验设置包括：在不同输入长度的缓存上下文条件下，测量推理过程的 加速比 ；以及在不同参数规模的模型上，评估缓存复用对性能的提升效果。

  

从表中结果可以看出，随着模型规模的增大和缓存上下文长度的增加，相比无缓存场景，推理加速比显著提高。在 长记忆 场景 下，TTFT（Time To First Token）加速比超过 70% ，显示出缓存复用在大规模推理任务中的明显优势。

  

这些实验结果表明，对于需要长期和高频访问的记忆内容，构建高效的缓存复用模块对于提升记忆解码性能和整体响应速度具有重要价值。

  

MemOS 的未来发展计划

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 10. MemOS 历史研发 Milestone

  

🌟 关键计划一：成立 OpenMem 开源社区

  

MemOS 团队计划发起 OpenMe m 开源社区，面向全球研究机构和产业伙伴，共同打造一个开放、协作、共创的大模型记忆技术生态。该社区将重点推动 记忆管理、记忆增强、记忆共享 等领域的研究与应用，探索让 AI 记忆能力实现 可管理、可迁移、可共享 的发展路径。OpenMem 欢迎所有对 AI 模型记忆感兴趣的团队加入，共建开放记忆底座，赋能智能系统普惠未来。联系方式：contact@openmem.net

  

🌟 关键计划二：应用发展与联合开发计划

  

未来，MemOS 将与智能体（Agent）研发团队、行业业务团队和技术合作伙伴共同发起 联合开发计划， 推进基于记忆操作系统的多样化应用落地。相关计划将聚焦 对话机器人、智能搜索、个人助理、企业知识管理 等典型场景，探索 长期记忆、多主体协作、个性化演进 的应用模式，助力智能系统在复杂动态环境中实现持续进化和价值创造。

  

🌟 关键计划三：MemOS 的长期迭代与研发

  

在长期研发方面，MemOS 将持续推进技术演进和版本迭代，重点聚焦 记忆表征与压缩、分布式记忆调度、跨模型记忆转移、可解释性与安全性保障 等关键方向。未来，MemOS 还将逐步完善 标准化接口、性能优化、合规治理 等体系，打造面向大规模生产环境的 高可用、低成本、强安全 的记忆操作系统。团队计划持续深化与学术界和产业界的合作，推动 AI 从静态生成走向 长期进化与持续学习 的新阶段。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

记忆张量简介： 记忆张量（上海）科技有限公司是上海算法创新研究院孵化的新型大模型公司，由中科院院士担任首席科学顾问。公司聚焦基本原理驱动的系统性创新，以 “低成本、低幻觉、高泛化” 为核心特色，致力于探索符合中国国情的大模型发展新路径，推动 AI 应用更广泛落地。公司持续围绕大模型记忆增强与管理框架进行技术迭代，自主研发的基于记忆分层架构的 “忆 ³” 大模型已实现商业化落地，业务稳步增长，获得招商证券、中国银行、中国电信等头部国央企业认可。

  

© THE END

转载请联系本公众号获得授权

投稿或寻求报道：liyazhou@jiqizhixin.com

继续滑动看下一个

机器之心

向上滑动看下一个