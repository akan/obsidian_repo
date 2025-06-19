---
title: 开启 AI 自主进化时代，普林斯顿Alita颠覆传统通用智能体，GAIA榜单引来终章
source: https://juejin.cn/post/7511887311531180032
author:
  - "[[机器之心]]"
published: 2025-06-04
created: 2025-06-05
description: 智能体技术日益发展，但现有的许多通用智能体仍然高度依赖于人工预定义好的工具库和工作流，这极大限制了其创造力、可扩展性与泛化能力。 近期，普林斯顿大学 AI Lab 推出了 Alita——一个秉持「极简
tags:
  - 最小化预定义
  - 最大化自我进化
  - Alita
  - Manager-Agent
  - Web-Agent
  - MCP创建组件
  - MCP-Brainstorming模块
  - 脚本生成模块
  - 代码运行与验证模块
  - 自我工具创建
  - 智能体蒸馏
---
![横幅](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/2fd8e96805614492bb2076e3eca5f7a5~tplv-8jisjyls3a-2:0:0:q75.image) ![](https://p26-piu.byteimg.com/tos-cn-i-8jisjyls3a/0d6404b693834ec1a4d258177bb8baf2~tplv-8jisjyls3a-2:0:0:q75.image)

智能体技术日益发展，但现有的许多通用智能体仍然高度依赖于人工预定义好的工具库和工作流，这极大限制了其创造力、可扩展性与泛化能力。

近期，普林斯顿大学 AI Lab 推出了 **Alita** ——一个秉持「极简即是极致复杂」哲学的通用智能体，通过「最小化预定义」与「最大化自我进化」的设计范式，让智能体可以自主思考、搜索和创造其所需要的 MCP 工具。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e592a3127e2c48f19c37aac6be769c03~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1749639477&x-signature=l5Wb4ldrPSJqQ5yl3r%2F2LBqJV%2BY%3D)

- 论文标题：ALITA: GENERALIST AGENT ENABLING SCALABLE AGENTIC REASONING WITH MINIMAL PREDEFINITION AND MAXIMAL SELF-EVOLUTION
- 论文链接： [arxiv.org/abs/2505.20…](https://link.juejin.cn/?target=https%3A%2F%2Farxiv.org%2Fabs%2F2505.20286 "https://arxiv.org/abs/2505.20286")
- Twitter： [x.com/JiahaoQiu99…](https://link.juejin.cn/?target=https%3A%2F%2Fx.com%2FJiahaoQiu99%2Fstatus%2F1927376487285432790 "https://x.com/JiahaoQiu99/status/1927376487285432790")
- GitHub： [github.com/CharlesQ9/A…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FCharlesQ9%2FAlita "https://github.com/CharlesQ9/Alita")

Alita 目前已在 GAIA validation 基准测试中取得 **75.15% pass@1**  和  **87.27% pass@3**  的成绩，一举超越 OpenAI Deep Research 和 Manus 等知名智能体，成为通用智能体新标杆。Alita 在 GAIA test 上也达到了  **72.43% pass@1** 的成绩。

## 极简架构设计，最大自我进化

「让智能体自主创造 MCP 工具而不靠人工预设」，是 Alita 的核心设计理念。

现有的主流智能体系统通常依赖大量人工预定义的工具和复杂的工作流，这种方法有三个关键缺陷：

- **覆盖范围有限** ：通用智能体面临的现实任务种类繁多，预先定义好所有可能需要的工具既不可行亦不现实。而且预定义工具很容易过拟合 GAIA，不具有泛化性。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/cf3849367cba4404af61b8b131404517~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1749639477&x-signature=UclwB9g0eM5gmUNHd6XwfrQp1ug%3D)

- **创造力与灵活性受限** ：任务的难度可能超出了预定义工具或工作流的能力范围。复杂任务通常需要智能体创新性地使用新工具，或以新的方式组合和利用现有工具，而预定义的工具库和工作流会制约这种创造性和灵活性。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d47c7183f3fd4e8cbc93e8ab2a709133~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1749639477&x-signature=AoiBaWEHOn4KVpg8t0pDTMiH4GI%3D)

- **适配失配** ：不同工具的接口或环境未必与智能体兼容。例如，许多有用的工具并非用 Python 编写，这使得它们难以（尽管并非不可能）提前预接到主要以 Python 编写的主流智能体框架中。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/41035f87fdec4524ad7a45c2f61e7167~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1749639477&x-signature=ckL9zjY1DaDOjjxnm7w3d71ZrIU%3D)

这些挑战共同限制了现有通用智能体的创造力、可扩展性和泛化能力。

与当前日益复杂的趋势相反，Alita 团队认为对于通用智能体而言，「simplicity is the ultimate sophistication」。遵循这一原则，Alita 实现了可扩展的动态能力、增强的创造力与灵活性，以及跨生态系统的兼容性。Alita 团队由此提出了两大设计范式：

- **最小化预定义：仅为智能体配备最核心的基础能力，避免为特定任务或模态设计人工预定义的组件。**
- **最大化自进化：赋予智能体按需自主创建、优化和复用 MCP 工具的能力，实现自我进化。**

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9421cfb90e564a6f9479a480831613b5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1749639477&x-signature=tvRuYJa%2BFZEcyu71111%2FABkGBsQ%3D)

具体而言，Alita 仅内置了管理智能体（Manager Agent） **和** 网页智能体（Web Agent）作为其核心内部组件，以及少量支持自主能力扩展的通用模块，而不依赖繁杂的预定义工具库和固定工作流程。Alita 利用了 Model Context Protocols（MCP） 这一开放协议，使智能体系统能根据任务需求动态生成、修改和复用 MCP 工具。相较于一般的工具创建，MCP 创建还具有更好的可复用性与更简易的环境管理等优势。这种从人工设计工具和工作流到即时构建 MCP 工具的转变，为构建简约而通用的智能体开辟了新路径。

## Alita 的执行流程：简洁而高效

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ee34affa9a8a4b3293dda33507b43e65~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1749639477&x-signature=gaLjx9%2BJOVmrAlo9aQGSyWQw%2Bao%3D)

### 整体设计理念与系统架构

Alita 基于「最小预定义 + 最大自主进化」的设计范式，其总体结构十分简单，仅由三个关键组件构成：

- **Manager Agent：充当中央协调器的角色，分析任务需求，调度不同模块和工具，执行最终的聚合与回答生成。**
- **Web Agent：负责搜索有用的外部信息，包括开源代码、文档等。**
- **MCP 创建组件：由 MCP Brainstorming、ScriptGeneratingTool、CodeRunningTool 三个模块组成，能够进行自我能力评估、脚本生成与代码执行，还能够动态生成 MCP 工具并实现自我进化。**

在整个流程中，Alita 通过不断创建、验证、优化新的工具，从而实现持续演化的智能闭环。

### 三大核心能力模块

- **MCP Brainstorming 模块：分析任务，思考需要什么工具**

Alita 的第一步是调用 MCP Brainstorming 模块，对输入任务进行分析。该模块会评估当前智能体是否已经具备完成任务所需的能力和工具：若已具备能力，就快速调度相应的工具；若能力缺失，则生成「能力缺口描述」和「MCP 工具构建建议」，以便后续创建新的 MCP 工具。

- **脚本生成模块：实时创建工具**

检测到能力缺口后，Alita 会启动脚本生成模块。该模块根据管理智能体提供的任务描述与工具构建建议，结合网页智能体检索到的开源资源，生成一套可执行的外部 MCP 工具代码。Alita 生成的 MCP 工具代码有良好的封装性与通用性，可直接集成进任务流程并支持后续复用。

- **代码运行与验证模块：确保工具能用，并不断优化**

新生成的工具首先会在虚拟环境中执行测试。系统会根据输出判断工具是否符合预期。如果工具运行成功，它将被正式注册为可复用的 MCP 服务，纳入任务调用体系；若运行失败，系统则会自动进入诊断与修复流程，尝试调整依赖版本、修改关键参数，甚至在必要时放弃当前工具，转向新的解决方案。此外，每次运行过程都会被详细记录，以支持后续模型学习与工具演化，真正实现「自我进化」。

## 自我工具创建：Alita 的秘密武器

Alita 能够自主创建并优化任务所需的工具，最后将新的工具打包为 MCP，可以在未来进行复用，或是给其他智能体系统使用。

例如，用户的任务是询问「这份 PPT 中有多少页提到了甲壳类动物？」如果预定义的 PPT 处理工具仅将所有内容转换为文本，就可能无法提取页码信息并回答问题。但 Alita 会动态创建一个合适的 PPT 处理工具，并将其封装为足以解决该任务的 MCP。

另一个场景是，用户的任务涉及 YouTube 视频理解。现有的某些通用智能体所预定义的视频分析工具仅是一个 YouTube 字幕抓取工具，然而部分视频理解任务需要更深入的分析，仅读取字幕无法彻底解决问题。Alita 能创建逐帧读取视频的 MCP 来解决更复杂的视频理解任务——这种任务特定的 MCP 创建会根据任务难度动态调整。由于不是视频理解领域的专家，Alita 团队无法预先构想此类工具如何实现，直到 Alita 自动给出这个解决方案。该视频理解组件后来还被复用至团队的另一项工作《迈向多模态历史推理：HistBench 与 HistAgent》（代码库已开源）。

Reference: On Path to Multimodal Historical Reasoning: HistBench and HistAgent

Link:[arxiv.org/abs/2505.20…](https://link.juejin.cn/?target=https%3A%2F%2Farxiv.org%2Fabs%2F2505.20246 "https://arxiv.org/abs/2505.20246")

## 性能突破：GAIA 基准测试的新标杆

GAIA 的终局已至，Alita 正是最终的答案。

在 GAIA 基准测试中，Alita 展现了卓越的性能表现。GAIA 作为评估通用 AI 助手实际解决问题能力的标杆测试，共包含 450 个涵盖不同难度级别的测试题目。

Alita 在 GAIA Validation 测试中取得了 **75.15% 的 pass@1**  和  **87.27% 的 pass@3**  准确率，暂时位居所有通用智能体的第一位，超越了 OpenAI Deep Research（67.36% 的 pass@1）和 Manus。在数学推理测试 Mathvista 和医学图像识别 PathVQA 测试中，Alita 也分别达到了  **74.00%** 和 **52.00%** 的 pass@1 准确率，优于许多装备复杂工具库的智能体系统。

这些结果也表明，简约架构并非性能限制，反而是激发智能体创造性行为的关键。通过强调最小化预编写工具和最大化自主进化的设计哲学，Alita 成功实现了简洁与性能的统一。

有趣的是，在 Alita 团队发推特的第二天，GAIA validation 榜单被移除，Alita 团队提出，或许是时候迈向 HLE、BrowseComp 和 xbench 了。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/36c7643d7c2046c59cf153a78ffd279a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1749639477&x-signature=lNSNu7mZlYnJYAy3YKU%2F6vkSwi0%3D)

## MCP 复用：智能体蒸馏新范式与自我进化

在 Alita 构建过程中，系统会动态生成一系列高质量的 MCP，作为解决任务的中间产物。值得注意的是，这些 MCP 的价值远不止于完成一个任务这么简单，它们可以在后续任务中被 Alita 调用，显著提高性能和效率，也能被其他智能体复用。

具体来说，Alita 生成的 MCP 工具箱具备双重优势：

其一，\*\*智能体蒸馏，\*\*自动生成 MCP 的复用可视为一种全新的智能体蒸馏机制，相比传统蒸馏方法，其成本更低且更高效。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/23c89684d1f7435c857ac95cf42fd225~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1749639477&x-signature=TMxF7y6HxkTnegfiUjwr6dHZe4I%3D)

- **强智能体指导弱智能体：这些 MCP 可由其他较弱智能体复用，由 Alita（而非人类开发者）通过试错设计出适配特定任务的 MCP 集，能显著提升其性能。在不改变底层模型配置的情况下，仅通过引入 Alita 生成的 MCP，Open Deep Research-smolagents 在 GAIA 上的平均准确率从** **27.88%** 提升至 **33.94%** ，实现了在所有难度等级上的一致性能提升。
- **基于大模型的智能体指导基于小模型智能体：这些 MCP 同样可被小模型智能体复用并显著提升表现。即便使用算力更小、推理能力更弱的 GPT-4o-mini 模型，Alita 所生成的 MCP 也能显著提升其性能：准确率从** **21.82%** 提升至 **29.09%** ，Level 3 的准确率更是提升了三倍（ **3.85% → 11.54%** ）。

其二， **自我进化，使 Pass@1 方法实现 Pass@N 效果** ：MCP 工具箱与 Alita 连接后，可将单次尝试的通过率提升至近似多次尝试的水平。

## 结语：简约设计引领通用智能体未来发展范式

Alita 的成功证明，在智能体设计中，简约性并非功能限制，而是系统演进的驱动力。当传统方案陷入「工具膨胀，性能停滞」的困境时，Alita 通过动态协议机制实现了「架构简化，能力增强」的正向循环。我们也相信，随着大语言模型编写代码和推理能力的不断提升，Alita 将会变得更加强大。未来通用 AI 助手的设计或大幅简化，无需任何预定义工具和直接解决问题的工作流。相反，开发者可能更专注于设计激发通用智能体创造力与进化潜能的模块。

随着人工智能技术向通用化方向发展，这种融合简约设计与自主进化特性的范式，必将成为构建下一代智能体的关键技术路径——既保持核心系统的优雅简洁，又能通过持续演化获得近乎无限的扩展能力。

评论 0

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 1

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

APP内打开