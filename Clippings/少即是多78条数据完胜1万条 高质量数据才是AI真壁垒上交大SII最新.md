---
title: "少即是多！78条数据完胜1万条？ 高质量数据才是AI真壁垒｜上交大/SII最新"
source: "https://mp.weixin.qq.com/s/26l4yMpEz_igJ-9qDbhIlQ"
author:
  - "[[AI修猫Prompt]]"
published:
created: 2025-09-24
description: "AI新护城河出现：未来核心竞争力不再是数据规模，而是“高密度轨迹”的策展能力"
tags:
  - "高质量数据"
  - "代理智能"
  - "数据效率"
abstract: "上海交通大学等机构的研究表明，仅用78个精心策划的高质量训练样本就能让AI模型在复杂任务上的性能大幅超越使用1万条普通样本训练的模型，揭示了数据质量比数据规模更重要的新范式。"
---
Original AI修猫Prompt *2025年09月24日 18:09*

对于提升AI能主动发现问题、提出假设、调用工具并执行解决方案，在真实环境里闭环工作，而不只是在对话里“想”的智能体能力（Agency）。在这篇论文之前的传统方法认为，需要遵循传统语言模型的“规模法则”（Scaling Laws）才能实现，即投入更多的数据就能获得更好的性能。

![Image](https://mmbiz.qpic.cn/mmbiz_png/Iurk1iaf4xdF2pa4zrOXSiaO4k9Yba67qRDrYh37Cfo1qVyhfSZia5d8YIElEBvJmlPw0goo383SeEV1K4AIz5Brg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

在不久前，来自上海交通大学、SII等机构的研究者们进行了一个巧妙的实验。他们首先拿一个强大的基础模型（GLM-4.5），在一套 **模拟真实编程和研究任务的综合能力测试（AgencyBench）** 上进行评估，其初始得分为 **45.1%** 。

但随后研究者们仅仅用了 **78个精心策划的“专家级”示范案例** 来对这个模型进行专项训练。结果让模型的得分 **飙升至73.5%，性能暴涨超过60%** ！更有具颠覆性的是，当他们用传统的“题海战术”，给 **另一个完全相同的模型** 喂了 **10,000个** 普通训练样本后，其得分仅为 **47.8%** 。78个高质量样本的效果，完胜了10,000个普通样本。这一结果把“规模法则”在 **智能体能力** 上的统治地位给撬动了。研究者们也因此得出了一个重要结论：“代理效率原则 (Agency Efficiency Principle)”：机器的自主性不是源于海量数据的堆砌，而是源于对高质量代理行为示范的战略性策划”。

![Image](https://mmbiz.qpic.cn/mmbiz_png/Iurk1iaf4xdF2pa4zrOXSiaO4k9Yba67qRneiaeZuPgProt3AmOf0ZxvwHz64ouicLsRMPjgHWxClBjquVAATxNanQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

对企业的意义是： **核心竞争力从算力转向“流程建模 + 高密度轨迹策展”** 。谁以后更会策展真实问题与高质量示范，谁就能更稳、更快地把模型训成“会干活的同事”，这对拥有垂直领域 **私有、稀缺的闭环轨迹** 的非头部公司，反而是机会。

有朋友可能会问，什么是Agency？和Agent是一个意思吗？答案不是。 您也可以看一下《 [99%的人都理解错了，AI Agent ≠ Agentic AI，康奈尔大学发33页论文澄清关键区别。](https://mp.weixin.qq.com/s?__biz=Mzg4MzYxODkzMg==&mid=2247500120&idx=1&sn=ad2c32d979a1deeb883e9829e9d2a366&scene=21#wechat_redirect) 》 **Agency 是一种能力维度** ，描述“在环境中能规划、执行、用反馈迭代并完成可验证目标”的综合行为能力； **Agent 是一种系统形态** ，把 **模型** 与 **记忆、工具、运行环境、调度循环** 组合起来，用来 **承载并释放** 这种能力完成某种目标。

## LIMI的秘诀：78个“特种兵”样本

LIMI能够用仅仅78个样本实现“少即是多”的惊人效果，其成功的秘诀不在于样本的数量，而在于一套极其严格和精巧的方法论，旨在 **最大化每一个样本所蕴含的学习价值** 。

### 战略性地选择问题领域 (The Foundation)

在开始收集数据之前，研究者首先选择了两个最能体现复杂知识工作的领域：

- **Vibe Coding** ：在真实、复杂的环境中进行的协作式软件开发，需要AI理解现有代码、调试、与开发者互动等。
- **研究工作流 (Research Workflows)** ：指AI辅助科学家进行文献检索、数据分析、实验设计等一系列研究活动。

**为什么这一步很重要？** 因为这两个领域天然地排除了简单的问答任务，确保了所有的问题都必须通过多步骤的规划、推理和工具使用才能解决。这从源头上保证了数据的复杂性和高质量。

### 精心构建“高密度”用户查询 (The "What")

确定了领域后，团队的目标是创造出能够充分模拟真实世界挑战的复杂任务，即“用户查询 (User Query)”。他们通过两种方式来构建最终的78个查询：

![Image](https://mmbiz.qpic.cn/mmbiz_png/Iurk1iaf4xdF2pa4zrOXSiaO4k9Yba67qR3CN536KrzWguwiaUINBsG9iaq3c454vHfiaCVSktBUicFPEibqdcnvQJibXw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)
- **来源于真实世界** ：团队从专业的开发者和研究人员的实际工作中收集了60个真实遇到的难题，确保了任务的原生性和实用性。其中，许多研究任务直接源于真实的学术论文，保证了其严谨性。
- **基于GitHub PR的系统化合成** ：为了扩大任务范围同时保持真实性，团队开发了一套流程，从GitHub上数万星标的知名项目中提取有意义的“拉取请求 (Pull Requests)”，并利用先进的GPT-5模型将其转化为结构化的开发任务。这个过程有严格的质量控制，包括：
- 只选择高质量的代码库（超过1万星标）。
	- 过滤掉简单的修改，专注于有实质性代码变更的PR。
	- 由计算机科学领域的博士生专家对合成的查询进行质量评估和审核。
	![Image](https://mmbiz.qpic.cn/mmbiz_png/Iurk1iaf4xdF2pa4zrOXSiaO4k9Yba67qRhH9D8KH6uE9pSmiaekOUEQFKNPOffiaC5zw8DajrdzMInQ4MrXWPeKwg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

**查询特点** ：这些查询通常是复杂的“长远任务 (Long-Horizon Tasks)”，包含多个相互关联的子任务。例如，上图中展示了一个开发“Gomoku（五子棋）”游戏的用户查询，它被分解为5个子任务：从前端界面开发，到赢棋检测，再到实现不同难度的AI对手。

### 采集“高保真”的完整解决轨迹 (The "How")

这是整个方法论中最关键的一步。对于这78个复杂的查询，LIMI的目标不是记录“最终答案”，而是记录下 **从开始到成功解决问题的完整、多回合的“轨迹 (Trajectory)”** 。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
- **轨迹包含什么？** 一条轨迹记录了解决问题过程中的所有关键行为 ：
1. **`<Model Reasoning>` (模型推理)** ：AI的思考、分析、规划和决策过程。
	2. **`<Tool Calling>` (工具调用)** ：AI执行具体操作，如运行代码、读写文件、搜索网络等。
	3. **`<Observation>` (环境观察)** ：工具执行后返回的结果以及人类专家的反馈和修正。
- **如何采集？**
- **环境** ：在一个名为“SII CLI”的高度集成的命令行环境中进行，该环境提供了丰富的开发和研究工具，模拟了真实的工作场景。
	- **团队** ：由四位博士生专家与GPT-5模型进行人机协作，共同完成这78个任务。
	- **标准** ：团队采用“不成功不罢休”的原则，对每一个任务反复尝试，直到 **完美成功为止** 。这确保了训练数据中记录的都是最佳实践和成功的解决范式，其中也包括了如何从错误中恢复的宝贵经验。这些轨迹非常长，平均长度达到42.4k tokens，最长的甚至有152k tokens，充分展示了解决复杂问题的深度交互过程。 通
- 过这种方式，LIMI的数据集不仅教会模型“做什么”，更重要的是教会了它“如何思考和行动”。

## 微调过程：如何“教”会一个大模型

研究者们并没有从零开始训练一个新模型，而是选择了一个已经非常强大的预训练模型， **GLM-4.5（355B参数）** ，并在这个基础上进行“微调”。您可以将这个过程理解为：

1. **选择“天才学生”** ：首先，他们选择了一个已经读完整个互联网、知识渊博但缺乏特定实践技能的“天才学生”，也就是基础模型GLM-4.5。
2. **提供“专家教材”** ：然后，他们将前面精心制作的78个高质量“专家案例”（即完整的轨迹数据）作为教材。
3. **进行“专项培训”** ：他们使用一个名为slime的专业框架，对这个“天才学生”进行监督式微调（Supervised Fine-tuning）。值得一提的是，论文中所有的对比实验（包括那个使用10,000个样本的“题海战术”模型）都使用了完全相同的训练框架和配置，这确保了最终的性能差异可以最大程度地归因于训练数据的质量，而非训练过程本身。这个过程就是让模型学习这78个案例中的专家级思考和行动模式，从而掌握“代理智能（Agency）”这项新技能。

经过这个过程，原有的GLM-4.5模型就进化成了 **LIMI模型** 。模型的大小（参数量）没有变，但它内在的能力已经被这78个高质量样本深刻地重塑了。

## 结果胜于雄辩：数据怎么说？

当然，说得再好听，还得看实际效果，结果是真的有点猛。

### 在代理智能基准上取得SOTA性能

LIMI在专门为评测AI代理真实世界协作能力的基准 **AgencyBench** 上，其性能大幅超越了当前所有顶尖的基线模型。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Agency Bench任务一览

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
- LIMI 取得了 **73.5%** 的惊人平均分。
- 相比之下，其他强大的模型得分要低得多：
- GLM-4.5:**45.1%**
	- Qwen3-235B-A22B-Instruct:**27.5%**
	- Kimi-K2-Instruct:**24.1%**
	- DeepSeek-V3.1:**11.9%**
- 特别是在“首轮功能完整性 (FTFC)”这项指标上，LIMI达到了71.7%，而表现最好的基线模型GLM-4.5仅为37.8%，这表明LIMI在理解任务并给出高质量初步方案的能力上有巨大优势。

### 关键验证：极好的数据效率，有力证明“少即是多”

这是支撑论文核心论点的最关键证据。实验结果表明，战略性的数据策划远比扩大数据规模更有效

- LIMI的卓越性能是 **仅用78个精心策划的训练样本** 实现的。
- 实验中最具冲击力的对比是：
- 一个在包含 **10,000个样本** 的 `AFM-CodeAgent-SFT-Dataset` 上训练的模型，在AgencyBench上得分为 **47.8%** 。
	- 而仅使用78个样本的LIMI，得分高达 **73.5%** 。
- 这意味着，LIMI **用少了128倍的训练数据，反而实现了53.7%的性能提升** 。
- 这种数据效率优势也体现在其他通用基准测试上，LIMI同样以极少的数据量超越了使用数千甚至上万样本训练的模型。

### 广泛适用性：强大的泛化能力

实验证明，通过LIMI方法学到的能力并非局限于特定任务，而是具有广泛的适用性。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
- **跨任务泛化** ：在代码生成 (EvalPlus)、数据科学 (DS-1000)、工具使用 (TAU2-bench) 和科学计算 (SciCode) 等多个领域的通用基准测试中，LIMI的平均性能（57.2%）同样超越了所有基线模型。这表明其学到的代理能力可以迁移到不同的工作场景中。
- **跨模型泛化** ：LIMI的方法在不同规模的模型上都取得了显著效果。无论是较大的355B模型（性能从45.1%提升到73.5%），还是较小的106B模型（性能从17.0%提升到34.3%），都证明了这种训练范式的普适性。

### 严谨的对照实验：证明是模型内在能力的提升

为了排除“性能提升只是因为更会使用特定工具”的可能性，研究者进行了一项重要的对照实验：在 **不使用SII CLI工具环境** 的情况下进行测试。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
- **结果** ：即便在没有工具的“裸考”环境下，LIMI的平均性能（50.0%）依然优于其基础模型GLM-4.5（48.7%）以及所有其他的外部基线模型。
- **结论** ：这有力地证明了LIMI的训练方法带来的是模型 **内在的、基础性的能力提升** （如推理和规划能力），而不仅仅是学会了如何使用某个工具。当然，当工具可用时，性能会得到进一步放大，显示出模型与环境的协同效应。

**实验结果从性能、效率、泛化性和内在能力等多个维度，全面且有力地验证了LIMI的“少即是多”假说，展示了一条培养AI代理能力的全新、高效路径。**

## 为何这套方法能实现“少即是多”？

LIMI的成功源于 **信息密度** 的巨大差异，它将AI能力提升的关键，从 **“数据的丰富度 (data abundance)”** 转移到了“高质量示范的战略性策划 (strategic curation of high-quality agentic demonstrations)”。

- **传统方法 (10,000个样本)** ：可能包含大量简单的、单回合的问答。就像让学生做一万道“填空题”，虽然量大，但对培养解决复杂问题的综合能力帮助有限。
- **LIMI的方法 (78个样本)** ：每一个样本都是一个完整的“项目实战案例”，详细记录了顶尖专家（博士生+GPT-5）如何从零开始，通过思考、试错、使用工具最终成功解决一个复杂问题的全过程。这就像让学生精读78篇由领域大师亲自撰写的、包含完整心路历程的“项目复盘报告”。

因此，LIMI的一个样本在培养“代理智能 (Agency)” 方面所能提供的学习价值，可能比成百上千个简单的问答样本还要高。它教会模型的不是零散的知识点，而是 **一套可以泛化的、自主解决问题的思维框架和工作流程** 。

未来已来，有缘一起同行！

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

<本文完 结>

1. **转载请与本喵联系，私自抓取转载将被起诉**

🎉 **让我们一起创造更多美好！** 🎉

  

如果您觉得这篇文章对您有帮助

感谢您为我 **【点赞】** 、 **【在看】**

  

**<您为我点赞在看，只有我能看到>**

  

**👉** **微信号：xiumaoprompt**

**添加请注明来意！**

感谢！

素材来源官方媒体/网络新闻

继续滑动看下一个

AI修猫Prompt

向上滑动看下一个