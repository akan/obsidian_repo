---
title: "王梦迪团队「自我进化agent」综述：从静态LLM到超级智能ASI"
source: "https://mp.weixin.qq.com/s/ekouAvfussnXZUggBG7BKw"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-08-12
description: "一文读懂“AI 的下一站”。"
tags:
  - "自我进化agent"
  - "超级智能ASI"
  - "LLM"
abstract: "王梦迪团队发布首个系统且全面聚焦于“自我进化agent”的综述研究，推动实现超级人工智能（ASI）。"
---
*2025年08月09日 10:06*

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/5qv5QsBmI9Dic3Q5sN0vI3Dd67ZWvrKd30p1nFpd3nJw0npccjBntlDxibI5ndt1q8EqGic0EuP4QQXOkFZwaNNJA/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

  

当前的大语言模型（LLM）存在 严重的缺陷 ：其本质上是静态的，无法根据新任务、不断发展的知识领域或动态交互环境，调整内部参数。

  

如今，随着 LLM 越来越多地被部署在开放、交互环境中，这种静态缺陷愈发凸显，迫切需要能够 实时完成适应性推理、行动和进化 的 agent， 即“自我进化 agent”。

  

日前，普林斯顿大学教授王梦迪团队发布了 首个系统且全面聚焦于“自我进化 agent” 的综述研究。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/5qv5QsBmI9Do0Q32xQ4DndEgC4nL0ojc5Dg4pPOV2S15Kpv5c1wyJufV6TzdEjKH2WrDxIKDfgIictOAHT81icTg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

  

论文链接：https://arxiv.org/abs/2507.21046

  

核心贡献 如下：

  

- 建立了一个统一理论框架 ，用于描述 agent 系统中的自我进化过程， 围绕“进化什么”、“如何进化”、“何时进化”展开 ，为未来的自我进化 agent 系统提供了明确的设计指导；
- 研究了针对自我进化 agent 设计的评估基准与环境 ，强调与适应性、鲁棒性和现实世界复杂性相关的涌现指标和挑战；
- 展示了多个领域的关键现实世界应用 （如自主软件工程、个性化教育、医疗保健和智能虚拟助手），以及自我进化 agent 的实际潜力；
- 确定了关键的开放性挑战和有前景的未来研究方向， 强调安全、个性化、多 agent 协同进化和可扩展性 等。
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图｜2022-2025 年代表性自主进化 agent 框架的演进全景图

  

通过提供一个结构化框架来理解和设计自我进化 agent，该综述为在研究和实际部署中推进适应性 agentic 系统提供了路线图，推动实现超级人工智能（ASI）。其中，agent 不仅能够以不可预测的速度从经验中学习与进化，还能够在广泛的任务中达到或超越人类的智能水平。

  

  

## 当前趋势：可自我进化的 agent

与无法适应全新和动态交互环境的静态 LLM 不同，自我进化 agent 被认为可以通过持续的现实世界反馈不断学习，从而克服上述缺陷。

  

在该综述中， 研究团队围绕“ **进化什么”（What）、“何时进化”（When）、“如何进化”（How）** 展开分析，并通过构建一个结构化框架来理解和设计自我进化 agent。

  

具体而言，他们系统性地研究了 agent 的各个组件，包括模型、记忆、工具及其对应的工作流，并分析了它们的进化机制（“ **进化什么 ”** ）；随后，他们将现有进化方法按照不同时间阶段及学习范式进行分类，如监督微调、强化学习和推理时进化（ **“ 何时进化 ”** ）；最后，他们总结了不同进化信号（如文本反馈、标量奖励）和 agent 的不同进化架构（如单 agent 与多 agent 进化）（ **“ 如何进化 ”** ）。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 1.进化什么？

agent 的自我进化涉及多个关键组件，这些组件共同构成了 agent 适应与提升的基础：

  

首先是 **模型（Model）** **，** 这是 agent 的认知核心，直接决定着它们的推理、规划和决策行为。模型通过调整内部参数、从自身经验中学习来优化推理和决策能力，这些策略共同推动着学习范式的转变——从被动学习转向主动、持续且自我驱动的提升模式。

  

其次是 **上下文（Context** **） ，** 包括记忆进化和提示优化。记忆进化关注如何存储、遗忘和检索信息以辅助决策，使 agent 能够积累知识、回忆过往事件，并根据经验调整行为；提示优化则通过调整指令的表述和结构提升模型表现，agent 可以自主改进提示策略，将提示转化为可学习的组件，与 agent 的经验共同进化。

  

再次是 **工具（Tool** **）** ，agent 从工具使用者转变为创造者，这种从依赖预设静态工具集到实现自主技能扩展与优化的转变，标志着向认知自给自足的重要飞跃。涵盖工具的自主发现、通过迭代优化实现精通以及高效管理与选择，以应对复杂任务需求。

  

此外还包括 **架构（Architecture）** ，单 agent 系统优化主要沿着两个方向推进：优化 agent 的高层架构设计，以及使其能够直接修改自身源代码。通过优化节点和将组件级优化直接融入系统架构搜索过程实现性能提升；复杂多 agent 系统则聚焦协作结构的动态优化，以增强集体解决问题的能力。

  

### 2.何时进化？

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

agent 的进化时机分为 测试内 和 跨测试 两个阶段，且在不同学习范式下有不同表现。研究团队分别从 上下文学习 （In-Context Learning）、 监督微调 （Supervised Fine-Tuning）和 强化学习 （Reinforcement Learning）三个维度对两阶段进行了研究：

  

**测试内自我进化** **（Intra-test-time self-evolution）** **：** 发生在任务执行过程中，与当前任务紧密耦合。通过上下文学习，agent 利用动态记忆调整行为；监督微调实现即时自我修改；强化学习则在遇到难题时针对性学习新能力。

  

**跨** **测试自我进化** **（Inter-test-time self-evolution）** **：** 在任务完成后进行，基于历史经验提升未来表现。上下文学习利用过往任务反馈辅助新任务；监督微调通过自我生成数据和评估实现迭代优化；强化学习借助大量环境交互和课程设计优化策略。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图｜基于奖励的自我进化策略概述

  

### 3.如何进化？

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图｜agent 自主进化过程中横切式演化维度示意图

  

自我完善的能力是高级智能的基石。 在 LLM 的上下文中，这种机制表现为一种动态的奖励驱动进化过程。模型通过不断从自身输出和交互中学习，逐步提升自身能力。作为引导反馈机制的奖励信号设计至关重要，它直接决定了学习过程的性质、效率和效果。奖励设计的主要方法论，按反馈类型可分为四类： **文本反馈、内部** **奖励** **、外部奖励和隐性奖励** 。

  

更多详情，请查看原综述。

  

  

## 应用：通用领域、特定专业领域

自主进化 agent 将在多个领域和应用场景中推动技术进步，主要涉及两大类：

  

- **通用领域进化** **：** agent 系统通过进化来扩展其在广泛任务中的能力，主要集中在数字领域；
- **专业领域进化** **：** agent 系统通过进化来提升其在特定任务领域中的专业能力。

本质上，通用型助手的进化侧重于将学习到的经验迁移到更广泛的任务集，而专用型 agent 的进化则强调在特定领域内深化专业知识。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图｜进化方向可划分为通用领域和专业领域两大类

  

**通用领域进化** ，指的是 为通用应用而设计的自我进化 agent ，即 agent 系统通过进化来拓展其在数字领域的多样化任务能力，主要通过三种方式实现能力升级：记忆机制（Memory Mechanism）、课程驱动训练（Curriculum-Driven Training）以及模型-agent 协同进化（Model-Agent Co-Evolution）。这三大机制共同作用，使智能助手能够不断适应复杂多变的用户需求，提供更高效的服务响应。

  

**专业领域进化，** 是指 专注于提升特定任务领域的专业技能 。在这些领域中，它们的进化被定制为显著提高狭窄任务集中的性能，重点是针对编码、GUI、金融、医疗、教育等领域的专业领域专长。其中：

  

在 **编程（Coding）** 方面，自我进化 agent 有着变革性的应用，其自主适应与改进能力可提升软件开发效率与质量。例如，SICA 能自主编辑代码库并提升基准任务性能；EvoMAC 通过优化多 agent 协作网络改善代码生成；AgentCoder 借助多 agent 框架迭代优化代码；以及通过筛选优质答案等方式让 agent 持续进化，构建机器学习库等。

  

在 **图形用户界面（GUI）** 方面 **，** 自我进化 agent 将 LLM 能力从文本推理扩展到桌面、网页和移动界面操作，需应对复杂的动作空间等挑战。相关研究通过像素级视觉与自我强化提升准确性；Navi agent 通过分析失败轨迹提升任务完成率；WebVoyager 结合截图与反思提高未知网站成功率，ReAP 增加记忆进一步改善；AutoGUI 和 MobileUse 也通过各自机制增强能力，体现了自我进化的全方面特征。

  

在 **金融（Financial）** 方面，为专业领域定制 agent 的瓶颈在于高效构建和整合领域知识库，而自我进化机制可缓解这一问题。QuantAgent 通过双层框架迭代优化响应并增强知识库，提升交易表现；TradingAgents 整合多种动态过程优化策略。

  

在 **医疗（Medical）** 方面，自我进化 agent 能应对临床复杂性，包括医院规模模拟、多 agent 协作、医患 agent 对话进化、强化学习辅助诊疗、架构搜索优化流程，以及生物医学发现。

  

在 **教育（Education）** 方面，自我进化 agent 在教育领域应用广泛。在学习者层面，PACE 根据学生情况调整提示和提问，MathVC 模拟协作学习过程；在教师层面，i-vip 的多 agent 团队实时优化输出，EduPlanner 通过对抗循环优化教案，SEFL 生成示例微调反馈模型。这些 agent 能动态适应师生需求，提升教育体验。

  

除上述五大领域，自我进化 agent 在其他专业领域也展现出一定的优势，如学术辅助、游戏任务、外交策略等，它们凭借持续学习等特性在各自领域体现出广泛适用性。

  

  

## 未来方向：个性化、可泛化、安全可控

**部署个性化 agent** 是重要的研究目标 ，在聊天机器人、数字孪生等应用中，需要让 AI 精准捕捉并适应用户独特行为模式或偏好。现有方法依赖标注数据和后训练，但实际中面临冷启动问题，即初始数据有限时如何完善个性化理解、解读用户意图和构建用户画像。同时，在个性化规划与执行中，长期记忆管理、外部工具集成适配及个性化生成可靠性等存在挑战，且需避免强化现有偏见。

  

在评估方面，需要团队进一步突破传统框架，开发更轻量、适应性强的指标，建立灵活动态的基准测试体系，以精准评估 agent 在自我进化过程中管理长尾个性化数据时的表现。

  

同时，自我进化 agent 在 **跨任务领域和环境的** **鲁棒** **泛化** 上也存在挑战，专业性与广泛适应性的矛盾影响系统可扩展性、知识迁移和协作智能。可扩展架构设计需构建能随复杂度和场景扩展保持性能的架构，但当前系统常面临权衡困境，且动态推理计算成本增长限制通用化能力。

  

在持续学习中， 灾难性遗忘现象加剧挑战 ，平衡效率与防止模型漂移仍是难题。知识迁移存在缺陷，需理解知识泛化传递条件、量化迁移局限性、建立促进鲁棒世界模型构建的机制，以提升协作效能。

  

此外，随着自主 AI agent 的能力增强， **部署更安全、可控的 agent** 成为研究的重点。当前 agent 仍难准确区分必要敏感信息与无关信息，在目标涉及不当手段时，管理行为更为困难，学习的不确定性、语义模糊情境和记忆模块的设计缺陷均会加剧安全挑战。

  

通过收集大规模、多元真实场景数据以支持安全行为学习，完善 agent 架构的规则和案例库，探索更安全的训练算法，调查隐私保护措施对 agent 效率的影响，才可能实现平衡且安全的部署。

  

最后， **多** **agent** **自我进化系统** 面临的挑战，要求其必须平衡个体与集体推理。研究表明，集体讨论虽能提升诊断推理，但 agent 易过度依赖共识削弱独立推理能力。

  

未来，研究团队需要继续深入探索动态机制调整个体与集体意见权重，避免决策被少数主导，建立显式知识库和标准化更新机制，增强协作中个体推理贡献。同时，现有多 agent 评估基准多为静态，难以捕捉角色长期适应性和进化，需开发高效算法和自适应框架，使 agent 在保持自身决策优势的同时有效协作。

  

研究团队表示，自我进化 agent 的出现，标志着 AI 领域的范式转变， 从静态单一模型迈向具备持续学习与适应能力的动态智能系统 。随着语言 agent 在开放式交互环境中的广泛应用，构建新一代智能系统的关键在于使其推理过程、工具和行为能根据新任务、知识和反馈实现进化与适应。

  

展望未来，充分发挥自我进化 agent 的潜力对构建超级人工智能至关重要，这需要在模型、数据、算法和评估等方面取得重大突破。解决灾难性遗忘、实现自主进化中人类偏好对齐，以及 agent 与环境的协同进化等问题，是开发兼具适应性、可靠性且符合人类价值观的 agent 的关键。

  

整理：小瑜

如需转载或投稿，请直接在公众号内留言

  

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

收录于 人工智能那些事儿

素材来源官方媒体/网络新闻

修改于 2025Year08Month09Day

继续滑动看下一个

因网络连接问题，剩余内容暂无法加载。

学术头条

向上滑动看下一个