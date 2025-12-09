---
title: "斯坦福ACE框架：让AI自己学会写prompt，性能提升17%成本降87%"
source: "https://mp.weixin.qq.com/s/5F0tHdZjEFv9K0KZtrn2pQ"
author:
  - "[[P**nHub兄弟网站]]"
published:
created: 2025-12-08
description: "Agentic Context Engineering (ACE)核心思路：不碰模型参数，专注优化输入的上下文。让模型自己生成prompt，反思效果，再迭代改进。"
tags:
  - "AI自我优化"
  - "上下文工程"
  - "性能提升"
abstract: "斯坦福ACE框架通过让AI自主优化上下文（prompt），实现了性能显著提升和成本大幅降低。"
---
Original P\*\*nHub兄弟网站 *2025年10月13日 18:55*

**点击上方“ Deephub Imba ”,关注公众号,好文章不错过 !**  

  

斯坦福和SambaNova AI最近联合发了一篇论文，Agentic Context Engineering (ACE)。核心思路：不碰模型参数，专注优化输入的上下文。让模型自己生成prompt，反思效果，再迭代改进。

可以把这个过程想象成模型在维护一本"工作手册"，失败的尝试记录成避坑指南，成功的案例沉淀为可复用的规则。

## 数据表现

论文给出的数字：

AppWorld任务准确率比GPT-4驱动的agent高10.6%

金融推理任务提升8.6%

成本和延迟降低86.9%

这个全程不需要人工标注，只靠反馈循环就能完成优化

有个违反常识的点：现在主流观点都在追求简洁prompt、精炼指令，ACE反倒构建了一个信息密集、持续增长的"操作手册"。随着时间推移，这个手册会越来越厚，但有效性也在累积。大模型似乎并不需要简洁——它们需要的是足够的上下文密度。（我个人也觉得prompt不需要过于简洁，要精练和提供足够的信息）

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/6wQyVOrkRNKvyWXOzPs0abZNXjJzECB3FT5RicBOebMiaX5EB9B56atNH8pmic7pJicHs1ibPDRfQ3TQ69Gn0LqD9kA/640?wx_fmt=webp&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

ACE指向的方向是：可能我们过于关注模型本身，而忽略了如何更有效地与它对话。这不仅是技术层面的问题，也是思维方式的转变。

---

## 论文技术细节

### 研究动机

基于LLM的AI应用，像LLM agent和复合AI系统，越来越依赖上下文适应 (context adaptation)。和修改模型权重不同，上下文适应直接在输入中加入明确指令、结构化推理步骤或领域特定的格式来提升性能。

上下文在AI系统的很多组件中都是基础：指导下游任务的system prompt，存储历史事实和经验的memory，还有减少幻觉、补充知识的事实证据。

通过上下文而非权重来适应有几个明显优势。上下文对用户和开发者来说可解释、可理解，能在运行时快速整合新知识，还能在复合系统的不同模型或模块之间共享。随着长上下文LLM的进步，以及KV cache复用这类推理技术的发展，基于上下文的方法在工程部署上变得越来越可行。上下文适应正在成为构建强大、可扩展、自我改进AI系统的核心范式。

### 现有方法的两个核心问题

尽管有进展，现有的上下文适应方法面临两个关键限制。

**第一个是简洁性偏差 (brevity bias)** 。很多prompt优化器优先考虑简洁、通用的指令，而不是全面积累知识。比如GEPA就把简洁当作优点，但这种抽象会丢失实践中重要的领域启发式、工具使用指南、常见失败模式。这种设计在某些验证指标上看起来合理，但往往抓不住agent和知识密集型应用需要的详细策略。

**第二个是上下文崩溃 (context collapse)** 。依赖LLM整体重写的方法常常随时间退化成更短、信息更少的摘要，导致性能骤降（图2）。在交互式agent、领域特定编程、金融或法律分析这些领域，强性能依赖于保留详细的任务特定知识，而非压缩它们。

论文在AppWorld benchmark上做了个实验来观察这个现象。当LLM被要求在每个适应步骤完全重写累积的上下文时，上下文会发生崩溃。第60步时上下文有18,282个token，准确率66.7%，但下一步就崩溃到122个token，准确率掉到57.1%——比不适应的baseline 63.7%还差。虽然论文用Dynamic Cheatsheet举例，但这不是那个方法特有的问题，而是用LLM端到端重写上下文的根本风险——累积的知识可能突然被抹掉。

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/6wQyVOrkRNKvyWXOzPs0abZNXjJzECB3NPu9Srb2J3P9d0aojCQ9ickGhOE8DL7kcNeCRodNXtRzM92eac7FWng/640?wx_fmt=webp&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

  

随着agent和知识密集推理应用对可靠性要求越来越高，最近的工作转向用丰富、详细的信息填充上下文，这得益于长上下文LLM的进步。论文认为上下文不该是简洁摘要，而应该是一个全面、演化的playbook——详细、包容、充满领域内容。不像人类受益于简洁概括，LLM在提供长而详细的上下文时更有效，能自主提炼相关性。与其压缩掉领域特定的启发式和策略，上下文应该保留它们，让模型在推理时决定什么重要。

### ACE框架设计

针对这些限制，论文提出ACE (Agentic Context Engineering) 框架，用于离线场景（比如system prompt优化）和在线场景（比如测试时memory适应）的全面上下文适应。ACE不把上下文压缩成精炼摘要，而是把它们当作随时间累积和组织策略的演化playbook。

基于Dynamic Cheatsheet的agentic架构，ACE加入了generation、reflection和curation的模块化工作流，同时添加了由grow-and-refine原则指导的结构化增量更新。这个设计保留详细的领域特定知识，防止上下文崩溃，产生的上下文在整个适应过程中保持全面和可扩展。

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/6wQyVOrkRNKvyWXOzPs0abZNXjJzECB3eNxk2dbBc7gkve4UTlaGkZYKnGOepiaO4kWkiaSpO5QiakiafQuYSlLbKw/640?wx_fmt=webp&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

  

如论文图4，工作流从Generator开始，为新query生成推理轨迹，暴露有效策略和反复出现的问题。Reflector批判这些trace来提取经验教训，可选地跨多次迭代精炼它们。然后Curator把这些教训合成紧凑的delta条目，通过轻量级非LLM逻辑确定性地合并到现有上下文中。因为更新是分项的、局部的，多个delta可以并行合并，支持大规模batch适应。ACE还支持多epoch适应，同一个query可以被重新访问来逐步强化上下文。

**增量Delta更新**

ACE的核心设计原则是把上下文表示为结构化、分项的bullet集合，而不是单一整体prompt。bullet的概念类似LLM memory框架（比如Dynamic Cheatsheet和A-MEM）里的memory条目，但更进一步，包含：

1. **元数据** ：唯一标识符和计数器，跟踪它被标记为helpful或harmful的次数
2. **内容** ：捕获一个独立单元，比如可复用策略、领域概念、常见失败模式

解决新问题时，Generator会标注哪些bullet有用或误导，提供反馈指导Reflector提出修正更新。

这种分项设计实现三个关键属性：

- 局部化：只有相关bullet被更新
- 细粒度检索：Generator能专注最相关知识
- 增量适应：允许推理期间高效合并、修剪、去重

ACE不完全重新生成上下文，而是增量产生紧凑的delta contexts——Reflector提炼、Curator整合的候选bullet小集合。这避免了完全重写的计算成本和延迟，同时确保过去知识被保留、新信息稳步追加。随着上下文增长，这个方法提供长周期或领域密集应用需要的可扩展性。

**Grow-and-Refine机制**

除了增量增长，ACE通过周期性或lazy refinement确保上下文保持紧凑和相关。在grow-and-refine中，带新标识符的bullet被追加，现有bullet就地更新（比如增加计数器）。然后去重步骤通过语义embedding比较bullet来修剪冗余。这个refinement可以主动做（每个delta后），也可以lazy做（只在超出上下文窗口时），取决于应用对延迟和准确率的要求。

增量更新和grow-and-refine一起，维护了能自适应扩展、保持可解释、避免整体上下文重写带来的潜在方差的上下文。

## 实验评估

论文的评估表明：

**让高性能自我改进agent成为可能** 。ACE让agent能动态精炼输入上下文实现自我改进。单靠从执行反馈中学习来工程化更好的上下文，不需要ground-truth标签，就在AppWorld benchmark上把准确率提升了17.1%。这种上下文驱动的改进让更小的开源模型能达到排行榜顶级专有agent的性能。

**领域特定benchmark上的大幅提升** 。在复杂金融推理benchmark上，ACE通过构建包含领域特定概念和信息的全面playbook，比强baseline平均提升8.6%。

**设计选择的有效性** 。消融研究证实各设计选择是成功的关键，Reflector和多epoch refinement等组件各自都贡献了可观的性能提升。

**更低成本和适应延迟** 。ACE高效地达成这些提升，平均减少86.9%适应延迟，同时需要更少rollout和更低token成本。

### 任务和数据集

论文在两类最受益于全面演化上下文的LLM应用上评估ACE：

**agent benchmark** ，需要多轮推理、工具使用、环境交互，agent能跨episode和环境累积复用策略

**领域特定benchmark** ，需要掌握专门概念和策略，这里聚焦金融分析作为case study

**LLM Agent: AppWorld** 是一套自主agent任务集，涉及API理解、代码生成、环境交互。它提供真实执行环境，有常见应用和API（比如email、文件系统），以及两个难度级别（normal和challenge）的任务。公开排行榜跟踪性能，提交时最好的系统只达到60.3%平均准确率，凸显benchmark的难度和真实性。

**金融分析** ：FiNER和Formula测试LLM在依赖eXtensible Business Reporting Language (XBRL) 的金融推理任务上的表现。FiNER要求用139种细粒度实体类型标注XBRL金融文档里的token，这是监管领域金融信息提取的关键步骤。Formula专注从结构化XBRL文件提取值并执行计算来回答金融query，即数值推理。

**评估指标** ：AppWorld遵循官方benchmark协议，报告test-normal和test-challenge split上的Task Goal Completion (TGC) 和Scenario Goal Completion (SGC)。FiNER和Formula遵循原始设置报告准确率，衡量为预测答案与ground truth完全匹配的比例。

所有数据集遵循原始train/validation/test split。离线上下文适应时，方法在训练集上优化、在测试集上以pass@1准确率评估。在线上下文适应时，方法在测试集上顺序评估：每个样本先用当前上下文预测，然后基于该样本更新上下文。所有方法用相同的shuffled测试集。

### Baseline和方法对比

**Base LLM** ：基础模型直接在每个benchmark上评估，不做任何上下文工程，用数据集作者提供的默认prompt。AppWorld上遵循benchmark作者发布的官方ReAct实现，所有其他baseline和方法都基于这个框架构建。

**In-Context Learning (ICL)** ：在输入prompt里提供任务演示（few-shot或many-shot）。让模型推断任务格式和期望输出，不更新权重。当训练样本能装进模型上下文窗口时提供所有样本，否则尽可能多地填充演示。

**MIPROv2** ：流行的LLM应用prompt优化器，通过贝叶斯优化联合优化system指令和上下文演示。用官方DSPy实现，设置auto="heavy"来最大化优化性能。

**GEPA** ：基于reflective prompt evolution的sample-efficient prompt优化器。收集执行trace（推理、工具调用、中间输出）并应用自然语言reflection来诊断错误、分配credit、提出prompt更新。genetic Pareto搜索维护高性能prompt的frontier，缓解局部最优。实验上GEPA优于GRPO等强化学习方法和MIPROv2等prompt优化器，达到高10-20%的准确率，rollout少35倍。用官方DSPy实现，设auto="heavy"最大化优化性能。

**Dynamic Cheatsheet (DC)** ：测试时学习方法，引入可重用策略和代码片段的自适应外部memory。通过持续用新遇到的输入输出更新memory，DC让模型累积知识并跨任务复用，往往带来比静态prompting方法大幅改进。DC的关键优势是不需要ground-truth标签：模型能从它的generation策展自己的memory，让方法高度灵活和广泛适用。用作者发布的官方实现，设为使用cumulative mode (DC-CU)。

**ACE (ours)** ：ACE通过agentic上下文工程框架优化离线和在线适应的LLM上下文。为确保公平比较，Generator、Reflector和Curator用同一个LLM（DeepSeek-V3.1的非thinking模式），防止从更强Reflector或Curator向更弱Generator的知识迁移。这隔离了上下文构建本身的收益。采用batch size为1（从每个样本构建delta上下文）。离线适应时Reflector refinement轮数和最大epoch数都设为5。

### Agent benchmark结果

表1显示，ACE在AppWorld benchmark上一致性地改进强baseline。离线设置中，ReAct + ACE大幅超过ReAct + ICL和ReAct + GEPA（分别12.3%和11.9%），证明结构化、演化、详细的上下文比固定演示或单个优化指令prompt能更有效地让agent学习。这些提升延伸到在线设置，ACE继续超过Dynamic Cheatsheet等先前自适应方法平均7.6%。

在agent用例里，ACE即使在适应期间没有ground-truth标签也保持有效：这个设置下ReAct + ACE比ReAct baseline平均改进14.8%。这种鲁棒性源于ACE利用执行期间自然可得的信号（比如代码执行成功或失败）来指导Reflector和Curator形成结构化的成功失败教训。

这些结果确立ACE为构建自我改进agent的强大通用框架，能在有标签和无标签监督下可靠适应。

值得注意的是，在最新AppWorld排行榜上（截至2025年9月20日，图5），平均来看ReAct + ACE (59.4%) 匹配顶级的IBM CUGA (60.3%)，一个生产级GPT-4.1基础的agent，尽管用的是更小的开源模型DeepSeek-V3.1。在线适应时，ReAct + ACE甚至在更难的test-challenge split上超过IBM CUGA，TGC高8.4%、SGC高0.7%，凸显ACE在为agent构建全面自演化上下文方面的有效性。

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/6wQyVOrkRNKvyWXOzPs0abZNXjJzECB3DibPAPTtURnTFdCKdvUmrvfpQlW7C75UHQicQLaNB5GYfCEW2miaLc4cg/640?wx_fmt=webp&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

  

### 领域特定benchmark结果

表2显示，ACE在金融分析benchmark上提供强劲改进。离线设置中，当提供训练集ground-truth答案时，ACE以明显差距超过ICL、MIPROv2和GEPA（平均10.9%），显示当任务需要精确领域知识（比如金融概念、XBRL规则）时，结构化演化上下文特别有效，超越固定演示或整体优化prompt。在线设置中，ACE继续超过DC等先前自适应方法平均6.2%，进一步确认agentic上下文工程对跨专门领域累积可重用信息的好处。

另外，也观察到当ground-truth监督或可靠执行信号缺失时，ACE和DC都可能性能下降。这种情况下构建的上下文可能被虚假或误导性信号污染，凸显推理时适应在没有可靠反馈时的潜在限制。这表明虽然ACE在丰富反馈下（比如agent任务里的代码执行结果或formula正确性）很鲁棒，但其有效性依赖于允许Reflector和Curator做出合理判断的信号可得性。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

### 消融研究

表3报告AppWorld benchmark上的消融研究，分析ACE的各个设计选择如何促成有效上下文适应。检查三个因素：

1. 带迭代refinement的Reflector，这是超越Dynamic Cheatsheet的agentic框架的增加部分
2. 多epoch适应，多次在训练样本上精炼上下文
3. 离线warmup，在线适应开始前通过离线适应初始化上下文
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

结果表明每个组件都对最终性能有贡献。移除Reflector导致性能显著下降，证明反思机制对提取高质量教训至关重要。多epoch适应进一步提升性能，允许上下文在相同数据上多次精炼。离线warmup在在线场景中特别有价值，为适应提供更好的起点。

### 成本和速度分析

由于支持增量"delta"上下文更新和基于非LLM的上下文合并去重，ACE在降低适应成本（rollout数量或token摄取/生成的dollar成本方面）和延迟方面展现特别优势。

举例来说，AppWorld离线适应上，ACE相比GEPA达到82.3%适应延迟减少和75.1% rollout数量减少（表4a）。FiNER在线适应上，ACE相比DC达到91.5%适应延迟减少和83.6% token dollar成本减少（表4b）。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

这些效率提升主要来自两个设计：

- 增量更新避免了完全重写上下文的开销
- 并行处理多个delta允许batch适应

## 几点讨论

**更长上下文≠更高服务成本** 。虽然ACE产生比GEPA等方法更长的上下文，但这不会线性转化为更高推理成本或GPU内存使用。现代服务基础设施越来越针对长上下文工作负载优化，通过KV cache的复用、压缩、卸载等技术。这些机制让频繁复用的上下文段被本地或远程缓存，避免重复昂贵的prefill操作。ML系统的持续进步表明处理长上下文的摊销成本会继续下降，让ACE这类上下文丰富的方法在部署中越来越实用。

**对在线和持续学习的启示** 。在线和持续学习是机器学习应对分布偏移和有限训练数据等问题的关键研究方向。ACE提供了传统模型微调的灵活高效替代方案，因为适应上下文通常比更新模型权重便宜。而且因为上下文人类可解释，ACE支持选择性遗忘——无论是因为隐私或法律约束，还是当领域专家识别出过时或错误信息时。这些是未来工作的有前景方向，ACE能在推进持续和负责任学习方面发挥核心作用。

### 局限性

ACE的一个潜在限制是依赖相当强的Reflector：如果Reflector无法从生成的trace或结果提取有意义信息，构建的上下文可能变得混乱甚至有害。在没有模型能提取有用信息的领域特定任务里，产生的上下文自然缺乏价值。这种依赖类似Dynamic Cheatsheet，适应质量取决于底层模型策展memory的能力。

也要注意不是所有应用都需要丰富或详细上下文。像HotPotQA这类任务往往更受益于简洁高级指令（比如如何检索和综合证据），而不是长上下文。类似地，Game of 24这类有固定策略的游戏可能只需要单个可重用规则，让额外上下文冗余。

总体上来说，ACE在需要详细领域知识、复杂推理链或长期策略累积的应用中最有效。对于结构简单或策略固定的任务，传统的简洁prompt优化可能依然足够。

## 总结

论文提出Agentic Context Engineering (ACE)，一个通用框架用离线和在线上下文适应。ACE通过增量delta更新和grow-and-refine原则，构建全面、演化的上下文，避免简洁性偏差和上下文崩溃。

在agent benchmark和领域特定任务上的评估显示ACE持续超过强baseline，同时显著降低适应成本和延迟。ACE让更小的开源模型达到顶级专有系统的性能，展示上下文工程作为模型适应强大替代方案的潜力。

未来工作可以探索ACE在更广泛领域和应用中的应用，以及与其他适应技术（如参数高效微调）的集成。支持选择性遗忘和解决上下文可解释性的机制也是有前景的研究方向。

ACE代表向更灵活、可解释、高效的LLM适应迈进的一步，为构建能持续从经验学习和改进的AI系统开启新可能性。

---

**论文**

https://arxiv.org/pdf/2510.04618

---

喜欢就关注一下吧：

  

点个 **在看** 你最好看！

  

继续滑动看下一个

DeepHub IMBA

向上滑动看下一个