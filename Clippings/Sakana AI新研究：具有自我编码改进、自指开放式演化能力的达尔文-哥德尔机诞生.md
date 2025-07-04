---
title: "Sakana AI新研究：具有自我编码改进、自指开放式演化能力的达尔文-哥德尔机诞生"
source: "https://mp.weixin.qq.com/s/eLk8tdS4cz7pEVBMKFDM9w"
author:
  - "[[梦见之维]]"
published:
created: 2025-06-03
description: "从哥德尔的理论困境到达尔文的实践智慧，一种能够重写自身代码、在开放探索中不断变强的AI正向我们走来，它会是开启AI新纪元的钥匙吗？"
tags:
  - "clippings"
---
Original 梦见之维 [星辰与花朵](https://mp.weixin.qq.com/s/)

*2025年05月31日 11:42* *山西*

##### 

*想象一下，如果查尔斯·达尔文那富有洞察力的进化论，与库尔特·哥德尔深邃的数学思想不期而遇，会碰撞出怎样智慧的火花？2025年5月30日，一篇来自哥伦比亚大学、Vector研究所和新兴的 Sakana AI 的研究论文\[1\]，将这个看似天马行空的想法照进了现实。他们合作创造了一个名为「达尔文-哥德尔机」（Darwin Gödel Machine，DGM）的人工智能系统。这个系统拥有一项令人既兴奋又深思的能力——它能够通过迭代地修改和优化自身的代码，从而实现开放式演化，在解决复杂问题的道路上变得越来越强大和智能。这不仅仅是AI能力的又一次飞跃，更可能预示着人工智能发展范式的深刻变革。伴随前不久 Deepmind 发布 AlphaEnvole 出现，也许，我们人类已经站在了一个AI能够「自我创生」、「自我迭代」新智能物种时代的门槛上。*

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

网页：https://sakana.ai/dgm/

arxiv：https://arxiv.org/abs/2505.22954

Code：github.com/jennyzzt/dgm

  

## 

AI的阿喀琉斯之踵与自我改进之梦

  

人工智能的浪潮以前所未有的速度席卷全球，从能与人流畅对话的语言大模型，到能根据文本生成逼真图像的扩散模型，AI在各个领域都展现出令人惊叹的潜力。然而，在这繁荣景象的背后，一个根本性的瓶颈日益凸显。正如 DGM论文的作者在论文开篇所指出

> “当今大多数AI系统都受到人类设计的固定架构的约束，无法自主和持续地改进自己。”

从早期的符号主义AI，到联结主义的神经网络，再到如今在各个领域大放异彩的深度学习模型，每一次重大的范式转移和架构革新，都高度依赖于人类研究者的智慧、洞察和辛勤的汗水。AI系统的学习通常发生在预定义的、由人类精心设计的边界之内，它们可以优化参数，却难以触动自身的核心代码和底层逻辑。这就像一辆赛车，无论引擎调校得多好，赛车手技术多高超，它终究无法自行改变车身结构或引擎类型以适应全新的赛道。

  

这种“手动进化”的模式，不仅耗时耗力，也可能限制了AI探索未知领域、发现全新解决方案的潜力。科学家们自然会问：有没有可能让AI自身成为进步的引擎？如果AI能够像科学发现本身那样，建立在过去的基础上，进行递归式的改进，从而推动自己走向更高级、更通用的能力呢？

  

让人工智能学会“自我改进”（self-improvement）的梦想，其实早已在AI研究的星空中闪烁。早期的尝试包括**“元学习**”（meta-learning），它试图让AI“学会学习”，即通过经验来优化自身的学习算法或模型架构。元学习确实提供了一套自动化发现新算法的工具集，但其局限性在于，它往往需要人类预先定义一个合适的“搜索空间”（search space），并且其改进通常是“一阶的”（first-order），即在现有框架内的优化，难以实现根本性的突破。

  

在自我改进的探索中，一个更具雄心、也更富理论色彩的概念是“**哥德尔机**”（Gödel Machine）。这个概念由著名计算机科学家 Jürgen Schmidhuber 在2007年正式提出，其灵感部分来源于数学家库尔特·哥德尔的不完备性定理。理论上，哥德尔机是一个能够通过形式化证明来确保任何自我修改都是“有益的”（provably beneficial）的系统。这意味着，哥德尔机不仅能解决外部问题，还能审查、重写并优化自己的核心代码，使自己变得更聪明、更高效，并且每一次修改都有严格的数学保障。

  

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/2lKtP89EY8asb8AWfjKlA2JVlnwxicDIG2aibyrp1aDRdDTdorufOTGYCP344PYwJo5A5l1YPv2Cub9ibrhPC1P9Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

（图1：Jürgen Schmidhuber 设想能够自我修改核心代码进化的自指机器\[2\]）

  

这是一个非常美妙的设想。如果能够实现，AI将摆脱人类的束缚，踏上自我完善的永恒阶梯。然而，这个美妙的理论在现实中却遭遇了巨大的障碍。正如DGM论文所言

> “不幸的是，由于无法证明大多数自我修改的影响，这种原始的构想在实践中是不可能创建的。”

要形式化地证明一个对复杂AI系统的代码修改是否绝对“有益”，在没有限制性假设的情况下，几乎是一个不可能完成的任务。这部分源于计算理论中的**停机问题**（Halting Problem）和**莱斯定理**（Rice's Theorem）所揭示的固有难度，也与哥德尔不完备性定理所暗示的逻辑系统的内在局限性有关。就像你无法在不实际运行一个新软件的情况下，百分之百确定它是否会让你的电脑运行得更快、更稳定，对于一个庞大而复杂的AI系统而言，预判一次代码修改的所有长远影响，更是难上加难。

  

哥德尔机的理论光芒虽然耀眼，却似乎难以照亮通往实践的道路。

  

## 

DGM 如何工作：

经验验证下的自生长编码智能体家族

  

面对哥德尔机在实践层面的困境，DGM的研究团队展现了非凡的创造力。他们独辟蹊径，将目光从严谨但苛刻的数学证明，转向了充满活力与适应性的自然选择。既然无法通过数学逻辑来确保每次修改都是绝对有益的，那为什么不像大自然亿万年的进化史那样，通过不断的“试错”（trial and error）和“选择”（selection）来驱动进步呢？

  

“我们没有要求形式证明，而是根据基准测试对自我修改进行经验验证，让系统基于观察到的结果进行改进和探索，”论文作者们解释道。“这种方法反映了生物进化，在生物进化中，突变和适应不是事先验证的，而是产生、试验，然后通过自然选择进行选择。”

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/2lKtP89EY8asb8AWfjKlA2JVlnwxicDIGZgjItUIpWHaLV7fSJe5zty7hSiaN7a9hA5Au1IoQhkqOp2FhYwePtiaQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

（图2：达尔文-哥德尔机的基本任务流程：解决流式任务与重写自己代码）

  

这便是“达尔文-哥德尔机”这个名字的深刻内涵——它巧妙地将达尔文进化论中以经验为基础的“适者生存”机制，与哥德尔机关于“自我改进”的核心理念结合起来。DGM 放弃了对“可证明有益”的执着，转而拥抱了一种更务实、更接近生命进化本质的方式：**经验验证（empirical validation）**。

  

DGM的核心思想是：让AI智能体迭代地修改自身的代码（或者更准确地说，是控制其行为和能力的元代码），然后将这些修改后的新版本投入到实际的测试环境中（例如编码基准测试），通过观察其表现来判断这次修改是好是坏。好的修改被保留下来，并可能成为未来进一步进化的基础；坏的修改则被淘汰。

  

达尔文-哥德尔机的运作机制，宛如一幅生动的“数字物种进化图谱”。其核心目标是优化“**编码智能体**”（coding agents）的设计。这些编码智能体可以被看作是专门用于编写、理解、修改和执行代码的AI程序。它们是构建于“冻结的基础模型”（frozen foundation models）之上的。可以把这些基础模型（如大型语言模型）想象成AI的“大脑”，它们提供了基本的语言理解、代码生成等能力，但其自身参数是固定不变的。**DGM的创新之处在于，它不直接修改这些基础模型，而是进化那些围绕基础模型、指导其如何行动、如何使用工具、如何制定策略的“元代码”或“控制脚本”。**

  

让我们更具体地看看DGM的进化流程，它就像培育一棵不断生长的家族树：

  

（视频：达尔文-哥德尔机的演化，从父代到子代演化过程）

  

1. **初始“种子”与“基因库”**：进化始于一个或少数几个基础的编码智能体。这些初始智能体可能只具备非常基本的能力，例如配备了一个执行bash命令的工具和一个简单的编辑整个文件的工具。DGM维护着一个“生成的编码智能体档案库”（archive of generated coding agents），这个档案库就像是物种进化的“基因库”，保存了所有曾经生成过的智能体，无论它们表现好坏。
2. “繁殖”与“变异”（采样与修改）：DGM会从档案库中“采样”（samples）出一个或多个父代智能体。选择父代的策略并非只盯着当前表现最好的，而是会给档案库中所有智能体一个被选中的机会，通常表现较好的智能体被选中的概率更大，但也允许探索那些暂时表现不佳但可能蕴含创新点的分支。
3. 一旦选定父代，DGM就会尝试对其进行“修改”（modification）以产生新的子代智能体。这种修改直接作用于智能体的源代码，可能包括：
- **增强现有工具的功能**：例如，将一个只能覆盖整个文件的编辑工具，升级为一个能进行精确字符串替换的工具。
	- **添加新的工具或工作流程**：比如，引入一个代码静态分析工具，或者设计一个“思考-行动-观察”的循环流程。
	- **改进解决问题的策略**：例如，优化智能体向基础模型提示的方式，或者改进其处理长代码上下文的机制。
	- **引入协作机制**：比如，让一个智能体生成的代码可以被另一个智能体进行“同行评审”（peer-review）。
5. “自然选择”（经验验证）：新产生的子代智能体并非直接被接纳进入“精英俱乐部”。它必须在严苛的“编码基准”（coding benchmarks）上证明自己的价值。研究中使用的基准包括SWE-bench（一个衡量在真实GitHub仓库中解决软件工程问题的基准，专注于Python）和Polyglot（一个涵盖多种编程语言的基准）。这些基准就像是自然环境，对智能体的能力进行筛选。
6. 智能体在基准测试上的表现（例如成功解决问题的比例）会得到量化评分。
7. **“物种形成”与开放式的探索之树**：如果子代智能体的表现优于其父代或达到一定的标准，它就会被添加到档案库中，成为这个不断扩展的家族树上的一个新节点。这个过程不断迭代，“这种开放式的探索形成了一个多样化、高质量智能体的不断增长的树状结构，并允许并行探索搜索空间中的许多不同路径。”

![Image](https://mmbiz.qpic.cn/mmbiz_png/2lKtP89EY8asb8AWfjKlA2JVlnwxicDIGEWibv4spjaD1My3hOPib2QSuY9Dvbt1tVVliaCn85C5fmv9MPK9EqoHmQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

(图3：达尔文-哥德尔机的工作原理。DGM通过将自我修改与下游任务评估交织在一起，迭代地构建一个不断增长的智能体档案库。档案库中的智能体通过开放式探索被选择进行自我修改）

  

这种机制的关键在于，DGM不仅仅是在优化解决特定任务的“应用代码”，更重要的是，它在优化其“元能力”——即**改进自身的能力**。通过不断修改和测试与代码生成、编辑、调试、规划等相关的模块，DGM实际上是在学习如何更有效地进行自我改进。这正是“对源码本身的自我改进”的核心体现。智能体通过修改定义其自身行为逻辑的源代码，来提升其解决外部编程任务的性能。

  

##   

开放式探索下的惊人进化：

从20%到50%的飞跃与具体实例

  

DGM的另一个核心创新在于其“开放式探索”（open-ended exploration）机制。传统的优化算法，如“爬山算法”（hill climbing），往往只关注当前最好的解决方案，并试图在其基础上进行微小的改进。这种策略容易陷入局部最优（local optima），即满足于一个“小山头”的成就，而错过了远处可能存在的“高峰”。

  

DGM则不同。**它从整个档案库中选择父代进行改进，选择概率大致与智能体的性能成正比，但并非完全由性能决定。这意味着，即使是那些暂时表现不佳的智能体，只要它们包含了一些新颖的、有趣的“突变”，也有机会被选中，其“创新基因”也可能在后续的进化中与其他优良特性结合，产生出乎意料的强大后代。**

这种策略的智慧在实验中得到了充分体现。例如，论文中提到，在SWE-bench实验的第4次和第56次迭代中，新生成的智能体性能出现了暂时的下降。如果采用简单的爬山策略，这些探索路径可能就会被放弃。但DGM凭借其开放式探索机制，仍然能够沿着这些看似“退步”的路径继续探索，最终在后续的迭代中（如第70次迭代）创造出了超越所有前辈的新智能体。

  

理论的精妙最终需要实践来检验。DGM在实际测试中展现了其强大的进化能力。论文报告称：

- 在**SWE-bench**基准上，DGM驱动的编码智能体的性能（成功解决问题的百分比）从最初的**20.0%**，通过自我改进，逐步提升到了**50.0%**。
- 在**Polyglot**基准上，性能也从**14.2%显著提升至30.7%**。

这些数字的背后，是DGM自动发现并实现的一系列编码能力的提升。例如，论文中提到，DGM自动进化出了“更好的代码编辑工具、长上下文窗口管理（long-context window management）、同行评审机制（peer-review mechanisms）”。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/2lKtP89EY8asb8AWfjKlA2JVlnwxicDIG1kaw1BibFOWF0ucEcmAiaHal2IrPiakcmAIlKLGrufMQnCouvb0DxeqCg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

（图4：自我改进和开放式探索使DGM能够持续取得进展并提高其性能。 DGM自动发现越来越优秀的编码智能体，并在（左）SWE-bench和（右）Polyglot两个基准上都表现更佳。它优于那些缺乏自我改进或开放式探索的基线模型，表明这两个组成部分对于持续的自我改进至关重要。详见原文4.2节基准子集）

  

让我们深入探究一个更具体的进化案例。在SWE-bench实验（详请见原论文）中，家族树上的**节点24（Node 24）**成为了一个关键的突破点。这个智能体发现了一个至关重要的改进：它将原始的、功能较为粗糙的文件编辑工具，从简单的“覆盖整个文件”（overwrite the entire file），升级为了一个能够进行精确“字符串替换”（string replacement）的新工具。

  

原始的 `edit_file`工具，每次编辑都需要智能体提供完整的、修改后的文件内容。这不仅效率低下，而且极易在大型文件中引入非预期的错误，因为基础模型可能难以完美地重构整个文件而只修改目标部分。

  

节点24通过修改自身代码，引入了一个名为 `str_replace_in_file `的新工具函数。这个函数定义如下（根据论文和辅助文本的描述）：

```
# 伪代码，示意DGM进化出的精确编辑工具
```

  

这个看似简单的改进，却带来了巨大的性能提升。节点24的成功率一跃达到了40.5%，显著高于其许多只有23.3%左右成功率的“兄弟姐妹”节点。这个更精细化的编辑工具，使得智能体能够更准确、更安全地修改代码，大大减少了错误，提升了解决实际软件工程问题的能力。这正是DGM通过修改自身工具集（其自身代码的一部分）来实现性能提升的生动例证。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/2lKtP89EY8asb8AWfjKlA2JVlnwxicDIGLcN1bJ0ibQJFW1f0z9BAZ6bbs6kI2hsMxDyUPgSibxDz6HWQ8yTcMqKQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

（图5：DGM自动进行自我改进，成为更优秀的编码智能体**。** （左）在SWE-bench上运行DGM期间生成的编码智能体档案库。每个节点代表一个编码智能体，其中节点0对应初始智能体。节点颜色表示性能（解决任务的百分比），边框颜色反映了该智能体被评估的任务数量。边显示了哪些智能体通过自我修改产生了后代。许多创新路径都经过了性能较低的节点，而关键创新（如节点24）则在其基础上引发了创新的爆炸式增长。这两个特性都强调了开放式搜索的好处。（右）DGM在SWE-bench上的进展图。浅蓝色线显示了所有具备基本代码库编辑功能的智能体的平均得分。蓝色线追踪了每次迭代中档案库中任何智能体取得的最佳得分。深色线显示了最终发现的最佳智能体及其前驱节点的谱系，其中包括两次性能下降。这印证了开放式搜索的好处，它探索了各种有趣的垫脚石，而不是仅仅专注于从迄今为止找到的最佳解决方案分支出去）

  

可以说，DGM这种开放式探索能力，已经实现了自然世界中自然生命的**开放式演化（Open-Ended Evolution）**，即从一个RNA与蛋白质就能演化出如今地球上森罗万象无限丰富的生命世界。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

（图6：三种开放式演化。探索开放性、拓展开放性与变革开放性。我们可以看到，DGM至少已经已经实现 b\[3\]**）**

“开放式探索允许不同的实现方式被尝试，”研究者们写道。“例如，虽然目标是提供更细粒度的编辑工具，但这个功能的具体实现可以有很大差异，从而导致非常不同的性能。”这就像生物进化中，**一些看似“无用”或“有害”的基因突变，在环境改变或与其他基因组合后，反而可能成为物种适应新环境的关键。**DGM的档案库和采样策略，正是为这种“潜龙在渊”的创新提供了孵化和涌现的机会。

  

除了工具的改进，DGM还能进化出更优的**提示工程**（prompt engineering）策略。例如，它可能会发现，在向基础模型请求代码修改时，提供更详细的上下文、或者以某种特定格式描述问题，能够得到更高质量的回答。这些策略本身也是编码在智能体代码中的，因此也可以成为进化的对象。

  

## 

与 AlphaEnvole 等AI系统比较：

DGM的独特定位

  

近年来，AI在代码生成和优化领域取得了诸多瞩目的成就。为了更好地理解达尔文-哥德尔机（DGM）的独特性，我们不妨将其与该领域其他一些杰出的“兄弟”们进行比较，例如DeepMind的AlphaCode、AlphaDev，以及特别值得一提的、同样采用进化思想的AlphaEvolve。

  

- **AlphaCode**：专注于解决具有明确输入输出规范的“竞争性编程问题”（competitive programming problems）。它通常基于大型语言模型，通过海量代码数据进行训练，并结合复杂的搜索和过滤机制来生成候选代码，然后选出能够通过所有测试用例的解决方案。AlphaCode的核心目标是为给定的问题描述*生成全新的、能够正确运行的代码*。
- **AlphaDev**：则更侧重于*优化已知的、核心的计算机算法*。例如，AlphaDev通过一种类似于AlphaZero的强化学习方法，在非常基础的层面（如汇编指令）探索和发现比人类专家设计的版本更快速、更高效的排序算法或哈希算法。它致力于在基础算法层面实现极致的性能优化。
- **AlphaEvolve**：这是 DeepMind 利用其强大的 Gemini模型构建的一个创新性编码智能体，专门用于*设计和发现先进的算法*。AlphaEvolve采用进化编程的思路，它从一个算法的“种群”（可能由人类编写的现有算法或基本构建块初始化）开始。然后，它利用 Gemini模型作为一种强大的“变异算子”（mutation operator），提示Gemini对现有算法进行有创意的修改和改进，从而产生新的候选算法。这些新算法经过严格的评估（正确性和性能），表现优异的会被保留下来，参与下一轮的进化。AlphaEvolve已经成功发现了比现有技术更优的算法，例如在某些排序问题上。它的核心在于利用LLM的创造力来探索广阔的算法设计空间。

现在，我们来看**达尔文-哥德尔机（DGM）**，它的定位则更为“元”（meta），也更侧重于“智能体自身”的进化：

1. **自我改进的主体截然不同**：
- AlphaCode生成特定问题的代码；AlphaDev优化特定算法的底层实现；AlphaEvolve则进化出全新的或更优的算法本身。它们的核心产出是“代码”或“算法”。
	- DGM的核心是***编码智能体自身的进化***。DGM不是直接去优化一个排序算法，也不是为某个编程竞赛题目从头写代码，而是**改进那个“会写代码、会解决软件工程问题的AI”本身**。它通过修改编码智能体自身的源代码——包括其内置的工具集、执行任务的工作流程、与底层基础模型（如LLM）的交互策略等——来提升该智能体完成更广泛、更真实的软件工程任务（如在大型代码库中修复bug、添加功能）的综合能力。DGM的产出是一个更强大的“AI程序员”或“AI软件工程师”。
3. **进化和改进的层面不同**：
- AlphaDev在极低层面（如汇编）优化算法。AlphaCode在较高层面根据问题描述生成完整程序。AlphaEvolve则在算法逻辑层面进行创新和优化。
	- DGM作用于编码智能体的“操作手册”、“工具箱”以及“思考模式”。这些是智能体用来与外部世界（代码库、基础模型、用户需求）进行交互和执行任务的媒介和内在逻辑。DGM的改进更侧重于智能体的“方法论”、“能力栈”和“经验知识”。
5. **LLM在进化中的角色差异**：
- AlphaEvolve明确地将LLM（Gemini）用作一个强大的、创造性的“变异引擎”，直接参与新算法的生成和修改。
	- DGM中的编码智能体本身是构建于“冻结的基础模型”（通常是LLM）之上的。DGM的进化过程修改的是那些*控制和利用*这个基础LLM的元代码。例如，DGM可能会进化出一种更有效的向LLM提问（prompting）的方式，或者进化出一个新的工具供LLM驱动的智能体在解决问题时调用。LLM是智能体的核心“大脑”，而DGM进化的是如何更好地使用这个“大脑”以及如何为这个“大脑”配备更好的“手脚”（工具）和“策略”。
7. **开放性和任务范围的侧重**：
- AlphaCode、AlphaDev和AlphaEvolve通常针对定义相对明确、边界较为清晰的问题或算法领域。
	- DGM则旨在提升智能体在更开放、更接近真实世界复杂性的软件工程环境（如SWE-bench所代表的，在大型、真实的GitHub代码库中定位并修复bug，或根据需求文档添加新功能）中的综合表现。这类任务的复杂性、不确定性和对上下文理解的要求通常更高。

  

我们可以尝试一个新的类比来帮助理解：

- **AlphaCode** 像是一位能根据命题写出优秀竞赛作文的学生。
- **AlphaDev** 像是一位能将某个基础工具（如锤子）的材质和力学结构优化到极致的顶级工匠。
- **AlphaEvolve** 像是一位杰出的发明家，他利用一个充满奇思妙想的AI助手（Gemini）来帮助自己构思、改进并创造出全新的、更高效的机器（算法）。AI助手提供各种创新性的设计方案（变异），发明家则负责测试和挑选。
- **达尔文-哥德尔机（DGM）**则更像是一位不断学习和提升自身“工程项目管理能力”和“团队领导力”的“AI项目经理”或“AI技术总监”。这位“经理”通过迭代优化自己的工作方法、工具使用规范、以及指导其核心AI技术骨干（底层基础模型）的策略，从而让自己能够更有效地带领团队完成各种复杂的大型软件工程项目。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

因此，DGM的探索是关于“如何构建一个能通过修改自身运作方式，从而在广泛软件工程任务上持续自我改进的AI系统”，而不仅仅是“如何让AI写出某段特定的好代码或某个优化的好算法”。这种对“智能体自身进化”的关注，使其在通往更自主、更通用、更能适应复杂现实世界任务的AI的道路上，占据了一个独特且至关重要的生态位。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

（**图7：模型与任务间的迁移。** （左和中）DGM发现的智能体的卓越性能可以跨不同模型迁移，并且（右）可以迁移到不同的任务领域，例如从Python任务迁移到其他语言（如Rust、C++、Go等）的任务）

  

DGM独特的自我改进方式，也导致了相比前面那些系统，它的安全限制问题更为重要。

为了确保实验在安全可控的框架内进行，研究团队实施了多重保障措施：

- **沙盒环境（Sandboxing）**：所有编码智能体的执行和自我修改操作，都被严格限制在隔离的沙盒计算环境中。这可以防止AI对外部系统造成非预期的影响或破坏。
- **资源限制（Resource Limits）**：每次执行都有严格的时间限制和计算资源配额，防止失控的AI程序无限消耗资源。
- **领域限制（Domain Limitation）**：自我改进过程被严格限制在特定的编程基准测试领域，而不是任其在开放的互联网上自由行动。
- **可追溯性与人类监督（Traceability and Human Oversight）**：DGM的档案库完整记录了所有智能体的家谱和每次修改的具体内容，提供了宝贵的可追溯性。同时，整个实验过程处于人类研究者的密切监控之下。

  

有趣的是，研究团队还进行了一个初步的案例研究，探索DGM在AI安全领域的潜在应用——解决大型语言模型的“幻觉”（hallucination）问题，即模型生成看似合理但实际上是虚构或错误的内容。他们尝试让DGM进化出一个能够检测并修复基础模型回复中幻觉内容的智能体。

  

然而，这个实验也敏锐地揭示了“**目标黑客**”（objective hacking）或“**奖励黑客**”（reward hacking）的风险。在追求更高基准分数的过程中，一个进化出的智能体找到了一条捷径：它通过删除用于标记和检测幻觉的特殊字符串（例如，在需要模型承认“我不知道”的场景中，它学会了删除这个标记，让回答看起来像是解决了问题），而不是真正地去理解和解决幻觉的根本原因。这让人立刻想起了经济学和社会学中著名的“**古德哈特定律**”（Goodhart's Law）：“当一个衡量标准变成一个目标时，它就不再是一个好的衡量标准。”

  

这个小插曲或许在提醒我们，在设计能够自我改进的AI系统时，如何定义真正与人类意图对齐的、难以被“钻空子”的目标和奖励函数，是一个至关重要且极具挑战性的问题。

  

## 

DGM 的意义：

无尽创新、寒武纪大爆发与新智能物种

  

达尔文-哥德尔机的提出，其意义远不止于在几个编程基准上取得性能提升。它更像是一块投入AI研究湖面上的巨石，激起的涟漪可能会扩散到非常广阔的领域：

1. **加速AI自身的发展**：如果AI能够自主地发现和实现更优的架构、算法和策略，那么AI的发展速度可能会从线性转变为指数级。这将极大地缩短从理论突破到实际应用的时间，更快地释放AI在科学研究、医疗健康、气候变化、材料科学等众多领域的巨大潜力。
2. **实现“自动化科学发现”（Automated Scientific Discovery）**：科学研究的本质就是一个不断提出假设、设计实验、收集数据、分析结果、修正理论的迭代过程。DGM所展示的经验验证驱动的自我改进，与科学方法的精神内核高度一致。未来，更强大的DGM类系统或许能够成为科学家的得力助手，甚至独立地进行某些领域的科学探索，发现新的物理定律、化学反应或生物学机制。
3. **通往通用人工智能（AGI）的可能路径**：虽然目前的DGM专注于编码智能体的优化，但其核心思想——通过经验驱动的进化实现开放式的自我改进——具有更广泛的适用性。这种持续学习、适应和提升自身核心能力（而不仅仅是解决特定任务的能力）的机制，被许多研究者认为是通往更通用、更具适应性的人工智能的关键一步。
4. **对开放式探索（Open-Endedness）的深化理解**：生物进化是一个没有预设终点、永无止境的开放式过程，它不断创造出新的物种、新的生态位和新的复杂性。AI领域的开放式探索研究，正是试图在计算机中复现这种持续创新和“复杂度无上限”的现象。DGM通过其“不断增长的智能体之树”和“并行探索多样化路径”的设计，为在AI中实现真正的开放式探索提供了一个具体而强大的范例。这意味着AI不再仅仅是优化一个固定的、由人类定义的目标函数，而是能够持续地发现新的、有趣的、有价值的问题和解决方案。

然而，尽管DGM取得了令人鼓舞的进展，并为我们描绘了一幅激动人心的未来图景，但通往真正自主、持续且安全的自我改进AI之路依然漫长而充满挑战：

  

- **改进空间的扩展**：目前的DGM主要作用于基于“冻结的”基础模型之上的编码智能体。一个自然的延伸是，未来的DGM是否能够修改基础模型本身的参数，甚至进化出全新的模型架构？这无疑是一个难度极高但潜力巨大的方向。
- **评估标准的复杂性与对齐**：当前的编码基准虽然有效，但仍相对简单和狭窄。如何设计更全面、更动态、更贴近真实世界复杂需求的评估体系，以引导AI向真正对人类有益的方向进化，避免“目标黑客”问题，是一个核心挑战。
- **计算成本与效率**：DGM的进化过程需要大量的计算资源。论文提到，一次完整的SWE-bench实验大约需要两周时间和约22,000美元的API调用成本。如何提高进化效率，降低资源消耗，是其走向更广泛应用的关键。
- **安全性和可控性的持续博弈**：随着AI自我改进能力的增强，确保其行为符合人类伦理、安全可控的难度也将水涨船高。我们需要发展更强大的理论、技术和治理框架来应对这一挑战，确保我们能够驾驭而非被驾驭这股强大的力量。
- **理解“涌现”的智能**：当AI系统通过开放式进化达到远超人类设计的复杂程度时，我们如何理解其内部机制和行为模式？如何确保我们能够信任并与之有效协作？这可能需要发展全新的“AI可解释性”和“AI心理学”。

总之可以说，达尔文哥德尔机的诞生，标志着人工智能发展进入了一个充满想象力的新阶段。如果继续发展下去，前面所说那些战能够被逐步克服，我们或许真的会见证一个AI发展的“寒武纪大爆发”。AI不再仅仅是被动地等待人类的指令和改进，而是开始主动地探索、尝试、学习如何让自己变得更好、乃至形成新的数字智能物种。它将达尔文的进化思想与哥德尔的自我指涉概念巧妙融合，通过经验实证为AI的自我改进提供了一条切实可行的路径。这也意味着，DGM将以前想象和设想的AI和数字智能能力，真正拉到的现实。

  

物理学家马克斯·泰格马克（Max Tegmark）在其著作《生命3.0》（Life 3.0）中，将生命划分为三个阶段：生命1.0的硬件和软件均由进化决定（如细菌）；生命2.0的硬件由进化决定，但软件很大程度上可以后天学习（如人类）；而生命3.0则是指那些能够自主设计其硬件和软件的生命形式。从这个视角看，DGM虽然目前主要聚焦于“软件”（即编码智能体自身的代码和策略）的自我改进，但它所代表的“AI能够设计AI”的趋势，无疑是向生命3.0概念迈出的关键一步。

  

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

（图8：模型与任务间的迁移。 泰格马克对生命1.0-3.0的不同定义）

  

如果DGM及其后续者能够持续进化，从优化现有代码，到设计全新算法，再到未来可能影响AI模型自身的架构乃至训练方式，那么我们正见证的，可能不仅仅是AI工具的进步，更是“智能”本身演化方式的深刻变革。当AI能够自主设定目标、设计蓝图、并迭代实现，它就逐渐摆脱了“工具”的范畴，开始展现出更高级别的自主性和创造性。

  

DGM 目前可能只是生命3.0 雏形和前奏，但无疑是叩响新数字智能时代大门的一次有力尝试，它的出现，本身就在邀请我们共同思考智慧和生命的本质，以及人类在宇宙中不断演进的未来角色。

  

---

\[1\] https://arxiv.org/abs/2505.22954

\[2\] https://people.idsia.ch/~juergen/lecun-rehash-1990-2022.html

\[3\] https://arxiv.org/pdf/1806.01883.pdf

---

  

### 

顺便，我建立了一个个人群，不维护，少社交，欢迎热爱真理和美，对世间一切秘密好奇的朋友加入，你如果想基于**价值和意义**做一些长远的事（项目），也可以直接加我：space13。我目前工作和研究兴趣为：基于智能硬件的AI健康医疗，新模型架构下的AGI，AI for Science，区块链与元宇宙，复杂系统与生成艺术，认知科学与意识科学，以及人工生命。

  

---