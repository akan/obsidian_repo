---
title: "RL 能否拓展 LLM 的能力边界？——yet another reading list (2512)"
source: "https://mp.weixin.qq.com/s/JvjGCUXMRx9N1nP_oJW6zQ"
author:
  - "[[Yuuu]]"
published:
created: 2025-12-24
description: "强化学习（RL）对大语言模型（LLM）推理能力边界的拓展存在争议：部分研究认为RL仅“锐化”基模型已有能力，未真正扩展边界；但后续创新（如ProRL、BroRL）通过延长训练、广义探索等方法，证明在特定条件下）RL可实现组合泛化与边界突破"
tags:
  - "强化学习"
  - "能力边界"
  - "大语言模型"
  - "推理能力"
  - "训练范式"
abstract: "本文围绕“强化学习能否拓展大语言模型的能力边界”这一核心问题，梳理了相关研究，指出RL能否真正提升模型能力取决于预训练预留的“能力空间”、针对“能力边缘”的数据以及中训练的桥接作用。"
---
Original Yuuu *2025年12月23日 11:16*

> ★
> 
> 作者：Yuuu
> 
> 链接：https://zhuanlan.zhihu.com/p/1982385220817807141
> 
> 来源：知乎

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/LxD720kEAETxEJ86ibspiciaPeJxkxibqPLhaIIFgzlPgzzd58S0jdowMopvUd2bobRxDbfgf8vAu9pbreLNDXe0vw/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

- https://x.com/xiangyue96/status/1998488030836044112
- https://arxiv.org/abs/2512.07783

Physics of Language Models 风格的实验、有代码权重开源，非常 solid 的工作。

论文讨论的问题是： **RL 能否拓展 LLM 的推理能力边界？**

**换句话说，RL 训练真能超越基座的固有能力，还是仅仅锐化现有分布中的高奖励路径、实现 pass@K 到 pass@1 指标的转换？**

今年断断续续学习和阅读了 LLM RL(HF) 相关的前沿发表，上文发表前本打算趁着 NeurIPS25 热度做一些实验复现和进一步验证，但看到此文后觉得加速了朝向问题终点的探索，遂花了半个上午在 AI 帮助下速成此篇。正好手头也没卡可用了。

阅读前提醒

- 本文的定位是知识收集和初步整理，仅作学习交流之用
- AI 的参与可能产生若干细节幻觉，不保证严谨
- 速读过程无法检验文献观点和实验的可靠性
- 本人知识水平、本次所用的时间和深度有限，难免挂一漏万

还望读者朋友们补充和批评指正。

## 起：LLM 的 RLVR 超“简”史

作为见证了 DeepSeek 从二线到顶流的从业者，我只能说年初 R1 发布的影响超过近多少年春晚的总和。

先是国内小范围讨论，再在国外业内引起强烈反响并逐渐扩散到圈外，最后回流国内大众视野实现两开花，对股市的影响自不必提。

随之而来的是 AI 业内的大幅转向，https://openrouter.ai/state-of-ai 的模型使用分析，reasoning model 逐渐占据过半份额。

前沿发表方面：上半年集中在 RLVR，下半年逐渐形成 agentic RL 的共识。R1 可以看作对 OpenAI 神秘 O 系列技术魔法的部分逆向，并且给出了非常精彩简练的工程方案。

基于类似思路，reasoning 相关的工作忽如一夜春风来。知名工作如阶跃 ORZ、字节 DAPO、Skywork 的 OR1 等，海外高校和科研机构的 simplezoo-RL、logicRL（未按照时间顺序）等，各自在数据、算法配方、训练等方面有很好的探索；也有认为数据更重要、在 reasoning 任务和 longCoT 形式上做工作的 generalReasoning、CodeI/O、openthoughts、prime intellect 等等，都各自在短时间内产生了不小的热度。

但快速而大量发表后，质疑随之而来：大部分跑通小模型 RL 都基于 Qwen2.5/3 小模型构建，其他流行的开源基座如 Llama3 等，要么未做验证，要么效果有限。

一方面，有人质疑 R1 范式的创新性：

- Olmo2 系列似乎是最早提出、规范化并大规模实践 RLVR 训练的项目，虽然效果并不明显而未引起热度；
- 据说 OpenAI、Deepmind 早就掌握相关技术，但觉得太 trivial 就没发表

另一方面，有人质疑 R1 发现的真实性：

- 方法看起来很简单，为什么之前没有人跑通？
- 以及，先后有工作发现虚假奖励、单样本训练这些比较反常识、似乎是 reward hacking 的操作也能让 Qwen2.5/3 大幅提升

问题背后都隐约指向同一件事情： **RL 是否真的有效？** 或者换一个更具体的角度： **RL 是否能提高 LLM 基座的真实能力边界？**

这篇 NeurIPS25 高分论文认为：不能。

  

## 承：为什么这是一个重要的问题？

## Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond the Base Model?

这篇文章说了什么： **当前所有RLVR（包括GRPO、PRM、o1-style）在推理任务上取得的进步，本质上只是把基模型已经会的东西“采样得更准”，并没有真正扩展能力边界，甚至在某些情况下还缩小了边界。**

具体论证包括：

- **pass@k 大逆转现象**
- pass@1：RL模型大幅领先基模型（有时+30-50%）
	- pass@64/1024：基模型反而全面超过RL模型 → 这说明RL模型只是把基模型分布里本来就存在的高奖励路径“锐化”了，整体覆盖率（真实能力边界）反而下降。
- **能力上限由基模型决定** 在6个模型家族、5种RL算法、4个经典推理基准上反复验证：
- 无论用什么RL方法、训多久，pass@1024 永远追不上同规模基模型
	- 基模型的pass@1024 就是铁顶，RL只能接近而不能超越
- **唯一能真正扩展边界的反而是蒸馏** 把RL模型的推理路径蒸馏回一个新模型，反而能在pass@1024上超过原基模型 → 说明“新能力”其实来自长CoT数据，而不是RL过程本身。

这些观点对现在的我仍有支配性的影响，以及在跟同事交流时我也多次转述了类似“RL 是锐化模型的表现”“提高 pass@1 并非没有价值，用户通常不关注/无感于 pass@K 性能”的观点。

## Again，为什么“RL 是否能提高 LLM 基座的真实能力边界？”是个重要的问题？

有 5 个角度可供思考：

- **资源投入是否合理？** Grok4 官宣 RL 训练投入扩大了 10 倍，但普通玩家在实践中发现跑通 RL 没那么简单
- 原生 RLer 们纷纷表示，样本效率低是 RL 界常识。例如 rollout 占据 70%～80% GPU 时间，还要考虑长尾样本
	- RL 训练拉起需要的资源是 SFT/pretrain 的几倍
	- RL 训推不同步的问题到现在仍然是个问题
	- ……
- **LLM 能否自举？** RL 能让模型学会它原本不会的东西，是递归自改进的前提，如果被否定，则目前“指数进步”的叙事不可持续
- **当前评估基准是否可靠？** 如果《Does...》的观点为真，那么榜单数字很可能是假进步，并不代表模型”变聪明“
- **训练范式的方向** ：这两种思路是冲突的
- 如果 RL 不能拓展边界，那最优配方似乎应该是 pretrain 直到撞墙-> 优质 SFT -> 蒸馏+longCoT -> 推理时大采样/multi-agent
	- 如果相反，那么预训练可以多留些余地 -> mid-train 调整分布 -> 大力 RL + 广域探索 + PRM
- **理论认知：本质上，LLM 的推理是静态函数逼近（预训练决定上限，后续只有重排），还是动态的搜索+学习过程？**

结合虚假奖励和若干 reward hacking 相关的发现，RL 的效用越发显得可疑起来。

## 转：长期训练与 pass@K 训练、缓解 hacking 现象

涉及的具体工作可参考附录。这里主要选择 proRL、pass@K training 进行说明。

几个月后，英伟达的在 proRL 里给出了看来相反的结论： **通过优化 RL 算法和训练 recipe** ，使得 base model 多个基准下 pass@K 全部失败场景的 pass@1 得到大幅提升。

*小彩蛋：openRLHF 一作 @初七123334 大佬参与了此工作。*

proRL 主张：之前的工作之所以认为 RL 没有拓展 base model 边界，主要在于训练步数不够，因而没有有效改变 base model 的原始分布。他们通过

- KL 散度控制：引入惩罚项，动态调整权重
- 参考 policy 重置：分多个训练阶段，每个阶段将 ref policy 重置为更近的 ckpt
- 多样化任务调度：多领域任务、基于难度的课程学习
- 长期训练扩展：从几百步延长到 2k steps

等几个方向的改造，实现了长时间 RL 训练并且让 base model 产生了足够多的改变从而“提升了 LLM 的能力边界”。不过由于这个实验运行需要的算力比较多，可能并不容易复现。

另一类工作则试图直接优化 pass@K：你说 pass@K 没变，那我就直接把优化目标改了——

- **Pass@K Policy Optimization: Solving Harder Reinforcement Learning Problems (arXiv:2505.15201, 作者: Christian Walder, Deep Karkhanis)**
- 贡献：首次将pass@k从评估指标转为训练目标，提出k退火策略，填补Yue et al.大k逆转的优化空白。
	- 相关性：直接回应Yue的“RL不扩展”论，证明通过pass@k优化可解锁基模型未覆盖的硬任务，与ProRL/BroRL的长时探索互补，推动指标驱动设计。
- 数据集与模型：在GEMMA-2-2B上测试，覆盖MATH、GSM8K、Codeforces等基准，包含ID和OOD任务。
	- 对比基线：标准PPO (pass@1优化)、贪婪采样、Best-of-N。
	- 关键结果： pass@1提升10-15%（ID任务），pass@64/1024超基线20%（OOD任务）。
	- k退火模型在难问题集上解出率提高30%，证明探索增强。
	- 计算成本略增（2-3倍采样），但性价比高。
- 奖励变换：将pass@k定义为n次采样中至少一个正确响应的概率，形式化为期望最大奖励
	- 低方差估计：开发无偏梯度估计器，减少采样噪声，适合大k场景。
	- k退火 (k-Annealing)：训练初期用小k（接近pass@1），逐步增大k，动态平衡exploration与exploitation。
- **核心观点** ：这篇5月发布的工作指出，传统RLVR以pass@1作为奖励函数，导致模型偏好保守策略（exploitation），在难问题上停滞，尤其在分布外（OOD）任务中表现不足。PKPO提出通过直接优化pass@k（k>1），提升模型的探索能力，从而解决更具挑战性的推理问题，间接支持边界扩展。
	- **方法与技术细节**
	- **实现** ：结合PPO框架，调整奖励权重，确保梯度稳定。
	- **实验设计与结果**
	- **局限** ：大k下训练收敛慢，需优化采样效率。
	- **贡献与相关性**
- **Pass@k Training for Adaptively Balancing Exploration and Exploitation of Large Reasoning Models (arXiv:2508.10751, 作者: Zhipeng Chen et al.)**
- 贡献：创新性地将pass@k作为reward训练，推导优势函数，提出自适应机制，填补RLVR探索不足的理论与实践空白。
	- 相关性：直接针对Yue的pass@k逆转，强化探索共识，与PKPO互补（PKPO重采样，Pass@k重训练），为ProRL提供指标优化支持。
- 数据集与模型：未具体列出模型，但覆盖大推理模型（7B-32B规模，如Qwen/MoE），任务包括自然语言与多模态推理。
	- 对比基线：pass@1优化、Best-of-N、标准RLVR。
	- 关键结果： 探索能力提升20-30%（多样路径增加）。 pass@k性能优于pass@1优化，减少早停（convergence delay）。 7B模型在某些任务上超GPT-4o/Claude-3.7，证明实用价值。
- 奖励定义：将pass@k作为奖励信号，形式与PKPO类似，但强调k的自适应调整。 优势函数设计：推导pass@k的解析优势函数，替代传统Q-learning，减少方差。
	- 自适应平衡：根据模型当前性能动态调整k，弱模型用小k，强模型用大k，结合bootstrap采样提升效率。
	- 实现：集成到PPO/GRPO框架，结合验证器反馈优化。
- **核心观点**: 这篇8月工作针对RLVR中pass@1奖励导致的政策收敛到局部最优，提出Pass@k Training框架，直接以pass@k作为奖励函数训练策略模型，鼓励多样化推理路径。自适应设计平衡探索与利用，旨在提升LLM在复杂任务上的表现，间接支持边界扩展。
	- **方法与技术细节**
	- **实验设计与结果**
	- **局限** ：k自适应需人工调参，计算开销随k增大指数增长。
	- **贡献与相关性**

## 合：RL 训练组合能力、RL scaling laws、大 N rollout 与还原论视角

时间来到新学期（误）。清华、Meta、NVDA、CMU 先后发表的四篇工作，从四个角度对这一问题进行研究。

## 1\. From and to: LLMs Learn New Skills in RL by Composing Old Ones

(arXiv:2509.25123, 作者: Lifan Yuan et al., Tsinghua University)

**主要结论** ：

- RL 在组合任务上训练具有良好的泛化性
- pass@大 K/1000 不会得到直接提升，但更高组合层次的问题（>2 个组合函数）上会显著提升，而 pretrain/SFT 无法实现这一点
- 启发：组合式 RL 的成功依赖模型原子技能的广度，所以应该首先大量训练 NTP，提升原子技能知识，然后在挑选的任务上针对性强化训练，提升模型利用组合知识的能力

说起来本文最早以 notion blog 形式发表，也是许多前沿研究比较喜欢的形式（但为什么我看到的大多是华人研究者喜欢这么干……）。后面发到 arxiv 的版本好像增加了虚假奖励部分的研究，还没读所以不瞎评价了。

## 2\. The Art of Scaling Reinforcement Learning Compute for LLMs

(arXiv:2510.13786, 作者: Aman Madaan, Shubham Tulsiani, Aviral Kumar, et al., Meta AI与UT Austin、UCL、UC Berkeley、Harvard、Periodic Labs合作)

- **背景与核心发现** ：针对RL训练的“试错艺术”与Yue et al.的“上限铁顶”争议，Meta的ScaleRL框架证明RL后训练遵循sigmoid缩放曲线，可从早期小规模运行外推大计算性能，填补预训练scaling laws的RL空白。
- **实验亮点** ：400k+ GPU小时跨GRPO/DAPO/Magistral/MiniMax算法，8B/17B MoE模型在MATH/代码任务上，sigmoid拟合准确率达95%+，外推100k GPU小时性能提升20-30%。
- **启发与建议** ：优先稳定RL配方（如过程奖励+KL控制），小预算（25%计算）预测全规模结果，优化资源分配。
- **注意** ：sigmoid曲线有“天花板”（某些算法饱和），需防hacking；计算门槛高，非普适。

这篇也没看，所以只提供 AI 的总结作为参考。不过他们的考虑看起来跟 grok 团队类似：只要跑的够快，就没有那么多条条框框限制、工程能解决很多基础性研究的不足。

换句话说就是力大砖飞，大力出奇迹……

## 3\. BroRL: Scaling Reinforcement Learning via Broadened Exploration

(arXiv:2510.01180, 作者: Jian Hu et al., ProRL Team)

- **背景与核心发现** ：作为ProRL续作，针对RLVR饱和问题（~3K步后plateau）提出BroRL，通过每例数百rollouts广义探索而非延长步数，实现持续性能提升，证明大N采样确保正确质量扩展，填补探索范式空白。
- **实验亮点** ：1.5B模型跨MATH/AIME/编码基准，BroRL后ProRL饱和点提升10-20%（pass@1），SOTA结果；mass balance分析显示N→∞时Δp\_c >0，无饱和。
- **启发与建议** ：优先广义探索而非步数，监控正确质量mass；饱和时增rollouts（数百），结合KL控制优化RLVR推理。
- **注意** ：依赖一步RL假设，计算成本随N指数增，需robust RM防hacking。

大 N rollout 也比较卡复现和实践门槛……对比它的兄弟文章 proRL：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

似乎说明，问题的真实答案并不是 yes/no 那么简单。

## 4\. On the Interplay of Pre-Training, Mid-Training, and RL on Reasoning Language Models

(arXiv:2512.07783, 作者: Charlie Zhang, Graham Neubig, Xiang Yue)

终于来到最后一篇，也就是我觉得颇有些“终局”意味的研究。一作的 X 推文很好概括了 paper 内容：

- **预训练有提升空间+模型能力边缘提供适当的数据时，RL 才能提升泛化能力**
- 如果 RL 应用于特定 domain 的任务，则很难在 passrate 上超过 base model
	- 如果瞄准的是能力边界，则在 ood 任务上也能有显著的外推效果
- **base 具备必要的基础构件时，RL 才能促进上下文泛化能力的提升** ：pretrain 提供了必要的种子覆盖，RL 以新的方式组合已知构件，实现跨情景迁移能力
- **在相同的计算与预算下，midtrain + RL 优于仅 RL** ，并且
- midtrain + 轻度 RL 能够提升 in domain 表现
	- midtrain + 重度 RL 能够提升分布外推理能力
- **PRM 能够缓解 hacking 问题并提升准确性，实现更真实、容错的推理能力+复杂多步任务上更好的泛化性**

**换句话说，RL能扩展边界，但前提条件是：依赖预训练留有“headroom”（未覆盖任务空间）、RL数据针对“能力边缘”（难但可达任务），以及中训练的桥接作用** 。这调和了Yue et al. (2025)的证伪（RL仅锐化现有能力）和ProRL的乐观（计算驱动扩展），强调RL的“prior-limited”性质（受预训练先验限制）。

具体来说：

**1\. 预训练的作用在于为 RL 奠基（headroom）， headroom 决定扩展潜力**

- 条件：RL仅在预训练留有足够 headroom（任务未被过度覆盖）时产生真扩展；否则对于覆盖相对饱和的任务，仅优化现有分布（即 pass@K -> pass@1 转移）。
- 证据：在分布内任务（操作数op=2-10）上，RL改善pass@1但不超pass@128（图3）；在OOD-edge任务（op=11-14）上，边缘数据驱动RL提升pass@128达+42%；但OOD-hard任务（op=15-20）无先验暴露时，RL无效（图3）。最小预训练暴露（≥1%长尾上下文）即可种子RL转移，提升+60% pass@128（图4）。
- 启示：预训练决定上限，RL无法从零发明技能，仅组合现有原语。

**2\. 中训练的作用：桥接与优化固定计算下的扩展**

- 条件：中训练（SFT-like桥接阶段）在固定计算下优于纯RL，稳定优化并对齐分布。
- 证据：中训练+RL在OOD-hard任务上超纯RL +10.8%（图6）；轻RL（20%预算）+重中训练优化 \* 分布内性能，重RL（80%预算）+轻中训练最大化OOD泛化（图18）。它减少遗忘，支持样本高效RL（第5节）。
- 启示：中训练被低估，是管道关键，平衡预/后训练分布。

**3\. RL后训练的作用：条件扩展与防hacking**

- 条件：需边缘校准数据和过程级奖励；无种子时，RL泛化差。
- 证据：RL组合原子技能形成新推理，但零暴露下无转移（图4）；过程奖励（结局+过程验证）减hacking，提升复杂任务保真度4-5%（图7-8）。在op=15-20上，20%预训练硬数据最大化RL增益+22 pass@128（图15）。
- 启示：RL扩展依赖管道设计，非万能；过程奖励提升结构准确性。

**实验框架与总体结论**

- 设置：从头训100M Qwen2.5-style模型（10B tokens预训练），评估外推泛化（操作数递增）和上下文转移（模板变异）。使用过程验证评估（步级准确+最终匹配）。
- 结论：RL能扩展边界（如+42% pass@128），但需headroom+边缘数据+中训练桥接；过程奖励防hacking。

BTW，Physics of Language Models 风格的研究基于严格受控的合成数据，跟目前 LLM 生产数据的分布还是有不小差异，所以距离直接指导 LLM 训练优化还有一定距离。不过我不认为这是缺点。

另外看到似乎有人也对实验结果的解读跟原文有所不同，所以把一开始的“一锤定音”改成了现在的用词——这篇工作并不意味着问题已经完全回答，而是帮助大家朝终点更近了一步。

（上面解读目前是 AI 做的，可能精读完论文后会重写一下，估计会独立成单篇。或者推荐这篇公众号推文的总结：RL并非万能药：CMU 新论文揭秘大模型推理能力的真正来源 ）

## 结语

不得不说，AI 的帮助让文献调研和总结快了至少一个数量级。但很遗憾，“价值”往往都是相对的，而新知、insights、实验/实践、理论分析这些东西，目前的 AI 往往很难识别并提供，或者很难快速提供（比如需要带着视角和问题去反复讨论）。

以及单就本文所涉及的问题而言，不得不感慨——不论 MLer/DLer/Rler/AIer，终究还是要面对“现实场景下可靠泛化”这个终极挑战。

继续滑动看下一个

精博士小酒馆

向上滑动看下一个