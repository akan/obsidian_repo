---
title: "不止SOTA！通义 DeepResearch模型、框架、方案全开源"
source: "https://mp.weixin.qq.com/s/23b-aWTArhATJRupaTYC8A"
author:
  - "[[通义实验室]]"
published:
created: 2025-09-17
description: "让AI从“会聊天”跃迁到“会做研究”"
tags:
  - "AI研究"
  - "智能体训练"
  - "开源框架"
abstract: "通义实验室开源了DeepResearch模型、框架和方案，推动AI从聊天能力跃迁到研究能力。"
---
Original 通义实验室 *2025年09月17日 18:06*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/kfTykfMJicWMx2XcZRN3XhLyNPE8KtkVicGKicoxibquqI2L4I2pgVYkiahzrDnEsVoRsLMlezAVkAcaUPVoYBnNRsA/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

**硬核拆解**

**核心技术揭秘**

  

为了让 AI 真正具备“做研究”的能力，我们针对通义 DeepResearch 的 数据 、 Agent范式 、 训练 、 基础设施（Infra） 、 Test Time Scaling 进行了系统性创新。所有技术方案均已开源，欢迎开发者共建。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/kfTykfMJicWPwqrOWibYuEzbAKgVg6quw2z8SnJ0dDQsKzLb0uic9cDS0JOicEBmaYvB4K8vquv35W7AhQfRa2s5icQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

自研行业领先全流程合成数据方案，无需任何人类干预，构造超越人类水平的数据集，突破智能体能力上限。

  

#### 👉 增量预训练数据

我们首次提出在 Agent 模型训练中加入 智能体增量预训练 （Agentic Continual Pre-training, Agentic CPT）阶段，从而为后训练提供一个强大的 Agent 基座模型。为此， 我们 提供了一套支持大规模持续扩展的 智能体预训练数据合成方案 AgentFounder \[1\]，并与后训练过程中源源不断生产的数据形成数据飞轮。

  

数据重组和问题构建 基于广泛收集和持续更新的知识文档、公开可用的爬虫数据、知识图谱以及后训练产生的轨迹数据和工具调用返回结果（例如，搜索结果和网页访问记录）等，我们构建了一个以实体为锚定的开放世界知识记忆。进一步，我们基于采样的实体和相关知识构造多风格的（问题，答案）对，以尽可能涵盖 智能体所面临的真实场景。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

动作合成 基于多风格问题和历史轨迹数据，我们分别构建了三种类型的动作数据，包含 规划 、 推理 和 决策动作 。我们的方法能够在离线环境下大规模、全面地探索潜在的推理-动作空间，从而消除了对额外商业工具 API 调用的需求。特别地，对于决策动作合成，我们将原始轨迹建模成多步骤决策过程，以 激发模型的探索能力和决策能力。

  

#### 👉 后训练数据合成

通义实验室 DeepResearch 团队对于高质量的合成数据方案进行了长期的探索和迭代。从 WebWalker 的网页点击轨迹逆向合成 QA 对，到 [WebDancer](https://mp.weixin.qq.com/s?__biz=MzkxMTYyMTAzNA==&mid=2247496399&idx=1&sn=5cfff60053dc1e50bb26e4cb483c9e30&scene=21#wechat_redirect) 的通过搜索来获取相关实体知识对简单问题进行逐步难度升级。从 [WebSailor](https://mp.weixin.qq.com/s?__biz=MzkxMTYyMTAzNA==&mid=2247496670&idx=1&sn=311141d25e9a1218ad23dd472c04fafd&scene=21#wechat_redirect)  提出的基于图结构的高不确定性复杂问题合成，到  [WebShaper](https://mp.weixin.qq.com/s?__biz=MzkxMTYyMTAzNA==&mid=2247497099&idx=1&sn=b5754ff4baf31f18ae07514512c2ba8f&scene=21#wechat_redirect) 逐渐系统和可控。通义实验室 DeepResearch 团队的数据合成方案在保证了 数据的极高质量 的同时还保证了 数据量的可扩展性！

#### 👉 SailorFog-QA 和 SailorFog-QA-V2 的数据生成方式

针对 WebSailor 中提出的 Level3 的任务使用以下方式合成数据：

- 构建复杂知识图谱： 从真实世界的网站出发，通过随机游走的方式，构建出一个包含大量实体和复杂关系的高度互联的知识图谱。这保证了问题的源头是真实的，结构是非线性的。
- 采样+提问： 从这个复杂的图中，随机采样出一个子图，然后基于这个子图生成问题和答案。
- 制造难度（关键步骤）： 在生成问题时，故意对信息进行模糊化处理。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### 👉 形式化建模（WebShaper）

形式化模型的核心理念在于 使问答（QA）的难度可控化 。QA 的基本构成是一个实体集合，而难度的基本单元则是针对这些实体之间的关系进行操作。每增加一次操作，便意味着将 QA 的难度提升一个层级。例如，可以通过对具有相同属性的实体进行合并或模糊化等原子级操作，逐步增加问题的复杂度。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### 👉 自动化生成 PhD-Level 学科合成数据

我们构建了一个自动化生成 PhD-level 合成数据的流程。流程始于一个精心构建的、包含百万级公开文档的多学科知识库，内容涵盖最新的网页、学术论文和电子书籍。

1、预处理 ： 系统首先对原始文本进行预处理，去除无关信息并将其浓缩为包含核心语义的“信息块”。

2、种子生成 ： 通过将主题相关的“信息块”进行策略性组合，系统能够生成需要综合多个信息源才能解答的初始“种子”问答 QA 对。

3、迭代式复杂度升级 ： 每一个“种子”问答对都会进入一个自我引导的优化循环。在这个循环中，造题 Agent 被赋予了一套强大的外部工具集，包括：通用网页搜索、学术文献检索、网页访问、Python 代码执行。

  

在每一次迭代中，造题 Agent 会：

- 扩展知识边界 ： 主动查询外部信源，将相关的背景知识融入问题中。
- 深化概念抽象 ： 深入分析材料，提炼更高层次的原理或识别微妙的内在联系。
- 强化事实依据 ： 通过多源交叉验证来增强内容的准确性和深度。
- 构建计算任务 ： 利用 Python 环境创建需要定量计算或逻辑模拟的问答，以评估模型的综合能力。

  

最终形成“良性循环” ：上一轮迭代产出的更复杂的问答对，将成为下一轮迭代的“种子”，从而实现任务难度的可控、系统性提升。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们对 深度研究型智能体 的推理范式进行了广泛的探索。因此，我们的最终模型支持多种推理形式，包括原生的 ReAct 模式和上下文管理的深度模式。

  

## 👉 ReAct 模式

我们的模型使用 ReAct 推理范式 展现出卓越的性能。它严格遵循 “思考-行动-观察” 的循环，通过多次迭代来解决问题。模型上下文长度为 128K ，可以处理大量的交互轮次，从而完全实现与环境交互的可扩展性。ReAct 的简单性和通用性为模型的内在能力和我们训练流程的有效性提供了最清晰的基准。

  

我们选择 ReAct 很大程度上受到了“The Bitter Lesson”的影响，利用可扩展计算的通用方法最终将优于依赖复杂的人工知识和复杂设计的方法。

  

👉 深度 模式

我们提出了 “迭代式深度研究范式” (Iterative Deep-Research Paradigm) \[3\]。核心思想是，用一系列“综合与重构”的动态循环，取代单一、无限膨胀的上下文。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

IterResearch 将复杂的研究任务解构为多个独立的“研究回合”。在每一回合中，智能体的工作流程如下：

  

1、重构精简工作区 (Reconstruction)：

IterResearch 不会加载全部历史记录，而是基于上一回合最精华的产出——即更新后的 报告 (Report) 和 工具响应 (Tool Response) ——动态重构一个轻量、专注的工作区 (Workspace)。

2、执行“思考-综合-行动”流程： 在精简的工作区内，IterResearch遵循一个严谨的操作流程：

- 思考 (Think) ： 首先，在内部“草稿纸”上进行分析、反思并制定计划。这部分内容保证了决策的透明性，但不会带入下一回合，以防信息冗余。
	- 综合 (Report) ： 接着，将最新获取的关键信息综合提炼到一份不断演进的中央 报告 中。这份报告是智能体的核心记忆，它只包含高密度、高价值的结论，而非原始数据的堆砌。
	- 行动 (Action) ： 最后，根据思考和报告，做出本回合的最终决策——是调用工具 (Tool Call) 获取新信息，还是在证据充足时给出最终答案 (Final Answer)。

  

通过这种设计， IterResearch 实现了对研究过程的“严谨状态维护”，而非“单窗口信息堆叠”。

  

结合IterResearch的特点，我们提出了 Research-Synthesis 框架 。并行使用多个IterResearch Agent探索同一个问题，最终整合它们完善的报告和结论，从而得出更准确的最终答案。这种并行结构使模型能够在有限的上下文窗口内考虑更广泛的研究路径，从而 将其性能推向极限。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们对 Agent model 训练流程进行革新！从 Agentic CPT 到 SFT 再到 Agentic RL，打通整个链路，引领新时代下 Agent model 训练的新范式。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

训练这样的Agent模型需要 重新思考整个模型训练流程 ， 从预训练到微调再到强化学习。我们建立了一种 新的代理模型训练范式， 将Agentic CPT → Agentic SFT → Agentic RL 连接起来，为 AI Agent创建了一个无缝的端到端训练循环。以下是我们利用强化学习解决最后阶段的方法，这对于使代理的行为与高阶目标保持一致至关重要：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

通过 强化学习构建高质量的 Agent 是一项复杂的系统工程挑战；如果将整个开发过程视为一个“强化学习”循环，其组件中的任何不稳定或鲁棒性不足都可能导致错误的“奖励”信号。接下来，我们将分享我们在强化学习方面的实践，涵盖 算法 和 基础设施 两个方面。

  

在强化学习（RL）算法方面， 我们基于 GRPO 进行了定制优化 。 我们严格遵循 on-policy 的训练范式，确保学习信号始终与模型当前的能4力精准匹配。同时，我们采取了一个 token 级别的策略梯度损失函数来优化训练目标。其次，为了进一步降低优势估计（advantage estimation）的方差，我们采用了 留一法 (leave-one-out) 策略。此外， 我们发现未经筛选的负样本会严重影响训练的稳定性，这种不稳定性在长时间训练后可能表现为“格式崩溃”（format collapse）现象。 为缓解此问题，我们会选择性地将某些负样本排除在损失计算之外，例如那些因过长而未能生成最终答案的样本。出于效率考虑，我们没有采用动态采样，而是通过增大批次（batch size）和组规模（group size）的方式，来维持较小的方差并提供充足的监督信号。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

训练过程的动态指标显示，模型学习效果显著，奖励（reward）呈持续上升趋势。同时，策略熵（policy entropy）始终维持在较高水平，这表明模型在持续进行探索，有效防止了过早收敛。我们将此归因于 Web 环境天然的非平稳性，该特性促进了稳健自适应策略的形成，也因此无需再进行显式的熵正则化。

  

我们认为， 算法固然重要，但并非 Agentic RL 成功的唯一决定因素 。在尝试了多种算法和优化技巧后我们发现， 数据质量 和 训练环境的稳定性， 可能是决定强化学习项目成败的更关键一环 。 一个有趣的现象是，我们曾尝试直接在 BrowseComp 测试集上训练，但 其表现远不如 使用我们合成数据的结果。我们推测，这种差异源于合成数据提供了一致性更高的分布，使模型能进行更有效的学习和拟合。相比之下，像 BrowseComp 这样的人工标注数据，本身就含有更多噪声，加之其规模有限，导致模型很难从中提炼出一个可供学习的潜在分布，从而影响了其学习和泛化（generalize）能力。这一发现对其他智能体的训练同样具有启发意义，为构建更多样、更复杂的智能体训练方案提供了思路。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在基础设施方面，使用工具训练智能体需要一个高度稳定高效的环境：

- 仿真训练环境： 依赖实时 Web API 进行开发成本高昂、速度慢且不一致。我们利用离线维基百科数据库和自定义工具套件创建了一个模拟训练环境来解决这一问题。并且 通过 SailorFog-QA-V2 的流程， 为该环境生成专属的高质量数据，创建了一个经济高效、快速可控的平台，显著加快了我们的研究和迭代速度。
- 稳定高效的工具沙盒： 为了确保在智能体训练和评估期间对工具的稳定调用，我们开发了一个统一的 沙盒 。该沙盒通过缓存结果、重试失败的调用以及饱和式响应等改进来高效地处理并发和故障。这为智能体提供了快速且鲁棒的交互环境，可以有效防止工具的错误响应破坏其学习轨迹。
- 自动数据管理： 数据是提升模型能力的核心驱动力，其重要性甚至超过了算法。 数据质量直接决定了模型是否能通过自我探索提升分布外泛化能力。因此，我们在训练动态的指导下实时优化数据，通过全自动数据合成和数据漏斗动态调整训练集。通过数据生成和模型训练之间的正向循环，这种方法不仅确保了训练的稳定性，还带来了显著的性能提升。
- 基于策略的异步框架： 我们在 rLLM 之上实现了异步强化学习训练推理框架，多个智能体实例并行与（模拟或真实）环境交互，独立生成轨迹。

  

通过这些措施，我们实现了智能体强化训练的“闭环”。从基座模型开始，我们进行了Agentic持续预训练以初始化工具使用技能，然后使用类似专家的数据进行监督微调以实现冷启动，最后进在on-policy的强化学习，使模型进行自我进化。这种全栈方法为训练能够在动态环境中稳健地解决复杂任务的 AI 代理提供了一种全新的范例。

**实际应用落地**

  

目前通义 DeepResearch 已赋能多个阿里巴巴内部应用， 成为提升效率、创造价值的“生产力引擎”。以下是两个真实落地案例：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

通义 DeepResearch 与高德地图深度共建，联合推出全球首个AI原生出行Agent。

该 Agent 为高德预置了专属地图 API、实时天气查询、交通状况监测等工具，可结合当下情况为用户提供更准确的行动建议。例如，在即将晚高峰的时候导航去机场，高德地图可制定绕开一条避开拥堵路线的方案。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在对专业性、准确性要求极高的法律领域，通义 DeepResearch 同样表现出色。我们将其能力注入“通义法睿”，打造了专为法律研究优化的智能体。它能自动检索法条、类案和裁判文书，并进行深度归纳分析。在与OpenAI、Claude等国际顶尖模型的同台竞技中，通义法睿在“法条引用相关性”和“案例引用相关性”两项关键指标上全面领先，综合表现最优。这不仅验证了通义大模型在复杂推理场景的硬实力，更为法律从业者提供了强大的生产力工具。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

GitHub： https://tongyi-agent.github.io

Hugging Face： https://huggingface.co/Alibaba-NLP/Tongyi-DeepResearch-30B-A3B  

魔搭： https://modelscope.cn/models/iic/Tongyi-DeepResearch-30B-A3B

博客： https://tongyi-agent.github.io/blog/introducing-tongyi-deep-research/

  

## 👉 系列工作

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

通义 DeepResearch 也拥有丰富的 DeepResearch Agent 家族。您可以在以下论文中找到更多信息：

\[1\] Scaling Agents via Continual Pre-training

https://arxiv.org/pdf/2509.13310

\[2\] WebSailor-V2: Bridging the Chasm to Proprietary Agents via Synthetic Data and Scalable Reinforcement Learning

https://arxiv.org/pdf/2509.13305

\[3\] WebResearcher: Unleashing unbounded reasoning capability in Long-Horizon Agents

https://arxiv.org/pdf/2509.13309

\[4\] WebWeaver: Structuring Web-Scale Evidence with Dynamic Outlines for Open-Ended DeepResearch

https://arxiv.org/pdf/2509.13312

\[5\] Towards General Agentic Intelligence via Environment Scaling

https://arxiv.org/pdf/2509.13311

\[6\] ReSum: Unlocking Long-Horizon Search Intelligence via Context Summarization

https://arxiv.org/pdf/2509.13313

\[7\] WebWalker: Benchmarking LLMs in Web Traversal

https://arxiv.org/pdf/2501.07572

\[8\] WebDancer: Towards Autonomous Information Seeking Agency

https://arxiv.org/pdf/2505.22648

\[9\] WebSailor: Navigating Super-human Reasoning for Web Agent

https://arxiv.org/pdf/2507.02592

\[10\] WebShaper: Agentically Data Synthesizing via Information-Seeking Formalization

https://arxiv.org/pdf/2507.15061

\[11\] WebWatcher: Breaking New Frontier of Vision-Language DeepResearch Agent

https://arxiv.org/pdf/2508.05748

  

今日互动： 你对 通义 De epRe search 最感兴趣的论文/技术点 \+ **你想用它做什么？ 是想复现 WebShaper 的数据合成？还是想在 WebWeaver 的动态提纲框架上做二次开发？或者有哪些独到的见解？欢迎留言，我们将随机选出 5位同学送出通义定制礼盒！**

**推荐阅读**

  [![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=MzkxMTYyMTAzNA==&mid=2247498239&idx=1&sn=4d75a3cb4a7c788881f8c0a0aab8a4bc&scene=21#wechat_redirect)

FunAudio-ASR：解决语音大模型企业落地的“最后一公里”[![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=MzkxMTYyMTAzNA==&mid=2247497779&idx=1&sn=d325c76048b9c88a28f9f293a1abf73f&scene=21#wechat_redirect)

声音也能有情绪？CosyVoice 全面升级！

继续滑动看下一个

通义大模型

向上滑动看下一个