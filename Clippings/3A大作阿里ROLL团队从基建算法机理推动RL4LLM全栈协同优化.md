---
title: "3A大作！阿里ROLL团队从基建->算法->机理，推动RL4LLM全栈协同优化"
source: "https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&chksm=856e96979544a85e0047bf497c2cb4c7770d0a98a89995510214c339d0409628c0ada1510360&idx=1&mid=2651000759&sn=04de996399a1e4104ff5fd1dce1d3a0c#rd"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-11-10
description: "一起推动LLM强化学习走向更广阔的实用化与规模化未来！"
tags:
  - "异步训练"
  - "轻量评论家"
  - "注意力机制"
abstract: "阿里巴巴ROLL团队推出3A协同优化框架，通过异步架构、非对称PPO和注意力机制推动强化学习在大语言模型中的应用迈向高效精细新范式"
---
*2025年11月10日 12:38*

机器之心发布

**机器之心编辑部**

  

近期， 阿里巴巴 ROLL 团队（淘天未来生活实验室与阿里巴巴智能引擎团队）联合上海交通大学、香港科技大学推出「3A」协同优化框架 ——Async 架构（Asynchronous Training）、Asymmetric PPO（AsyPPO）与 Attention 机制（Attention-based Reasoning Rhythm），「3A」彼此间并非孤立的技术堆砌，而是深度耦合，致力于共同推动「强化学习用于大语言模型（RL4LLM）」迈向高效、精细与可解释的新范式。

  

具体来看， ROLL Flash 以解耦为核心，通过「细粒度并行」与「采样 - 训练解耦」两大原则， 将生成、环境交互、奖励计算与模型训练彻底流水线化，实现全链路异步执行，显著提升 GPU 利用率，同时通过「异步比」机制保障训练稳定性，集成主流 Off-policy 算法等，使得异步训练效果能与同步训练相媲美。

  

算法架构层面， AsyPPO 首次系统论证了评论家的参数规模与其价值估计能力并无必然关联， 仅需两个小型评论家，即可在显著降低计算资源消耗的同时，提升推理性能与训练鲁棒性。

  

更进一步， 团队创新性地对 Attention 进行重新定义 —— 它不仅是语言模型前向计算中的中间产物，更是揭示模型推理过程内在逻辑的「结构化蓝图」， 并基于此设计了一种推理结构感知的动态奖励分配机制，使强化学习的优化目标与模型内生的推理节奏精准对齐，显著提升了训练效率与策略可解释性。

  

- 开源地址： https://github.com/alibaba/ROLL

  

接下来详细了解一下「3A」协同优化框架是如何推动（RL4LLM）迈向新范式的。

  

文末有彩蛋，走过路过不要错过！ROCK & ROLL！

  

1A: Async 架构 —— ROLL Flash 实现 RLVR 与 Agentic 高效异步训练

  

近年来，强化学习（RL）已成为提升大语言模型（LLM）在数学推理、代码生成、智能体（Agent）决策等复杂任务中能力的关键技术。然而，当前主流的同步 RL 训练系统在资源利用率和扩展性方面面临挑战。在处理长尾生成或等待外部环境（如代码编译器、游戏引擎）反馈时，GPU 资源常处于闲置状态，显著影响了模型迭代的效率。

  

为解决这一瓶颈， 淘天未来生活实验室与阿里巴巴智能引擎团队联合推出了新一代高性能 RL 训练系统 ——ROLL Flash。 它通过原生的异步设计，将传统的同步训练流水线重构为高效的「生产 - 消费」模式，旨在最大化资源利用率，加速大规模 RL 训练。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9hBqUz0Dian1TicUfJ9ibOskODJU0U0ictORicwfYsJGdZpSBYLIWGUIUa52wAaa2Yy8wibNibM8BeFFl9A/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

- 论文链接： https://arxiv.org/abs/2510.11345

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9hBqUz0Dian1TicUfJ9ibOskOhibrel0PgbMcrCrqpnNkCfgOsLXd2ickJ5ia6YlZ2picia2eIJiapPvpUsQg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

图 1: ROLL Flash 训练加速概览

  

问题背景：同步训练的挑战

  

传统的同步 RL 训练遵循一个严格的「生成 - 评估 - 学习」流程，要求批处理中的所有任务同步进行。在 LLM 的应用场景下，响应长度呈现明显的「长尾分布」，最长响应的生成时间可能是中位数的 20 倍以上。这种模式的局限性愈发凸显：

  

1. 长尾延迟（Long-tail Latency）： 仅因一个样本生成速度过慢，整个批次的 GPU 都必须停下等待，即「木桶效应」。
2. 环境交互阻塞（Environment Blocking）： 当模型需要与外部环境（如执行代码、与游戏 API 交互）互动时，GPU 只能空等，无法处理其他计算任务。
3. 扩展性瓶颈（Scalability Bottleneck）： 随着 GPU 规模扩大，同步点带来的通信和等待开销呈指数级增长，导致增加更多资源也无法有效提升训练速度。

  

这些问题共同导致了 GPU 利用率的显著下降，使得大规模、长序列的 RL 训练成本高昂且耗时。

  

ROLL Flash：以异步化设计提升训练效率

  

ROLL Flash 的核心思想是解耦。 基于两大设计原则 —— 细粒度并行（Fine-grained Parallelism）与采样 - 训练解耦（Rollout–Train Decoupling）， 它将原本紧密耦合的各个环节分解，实现了生成、环境交互、奖励计算与模型训练的全流水线并行。

  

通过该设计，当一部分计算资源因等待环境而阻塞时，系统的其他部分能够无缝处理其他轨迹的生成或执行模型参数的更新，从而最大化 GPU 的利用率。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9hBqUz0Dian1TicUfJ9ibOskOPtpTwy8D6uvtCkI1ZjmpMO0jaBtsnHNsnLgKG1cj2QBMegofBib3yFw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

图 2: ROLL 同步与异步框架概览。ROLL Flash 引入了队列调度、候选生成并行化和异步架构，显著优于传统同步训练。

  

主要实验结果：

  

ROLL Flash 在多个主流 RL 任务上取得了显著的性能提升，并在百卡规模下展示了近乎线性的扩展能力。

  

- 最高 2.72 倍加速： 在 Agentic 任务（如 ALFWorld）中获得最高 2.72× 的端到端吞吐提升，在 RLVR 任务（如数学推理）中提速 2.24×。
- 近乎线性的扩展性： 系统在百卡规模下仍保持高吞吐扩展能力，使用 8 倍的 GPU 资源可带来 7.6 倍的效率提升（如图 3 所示）。
- 与同步训练相当的性能： 通过集成多种 off-policy 算法（如 Decoupled PPO、TOPR），团队验证了异步训练能够在大幅提速的同时，取得与同步训练相媲美的最终模型性能。
- 灵活的资源调度： 引入的异步比（Asynchronous Ratio 机制，允许在样本新鲜度与资源利用率之间进行权衡，在多数场景下以极小的异步代价获得接近完整的性能提升。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9hBqUz0Dian1TicUfJ9ibOskO7IrlXT7fv350tooXWJjicDnuIjBE5msibfkgUvCZibFaVauicoNb9kpWVw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

图 3: 不同架构下吞吐量随 GPU 数量的扩展表现。上图为长序列场景（Qwen3-8B-Think 模型），下图为短序列场景（Qwen3-8B-Base 模型）。

  

核心设计

  

ROLL Flash 的高性能源于其系统层面的四项关键技术，以及为保证异步训练稳定性而引入的创新机制。

  

1\. 队列调度（Queue Scheduling）

为每个独立的采样任务（Prompt）建立专属队列。任务完成后，其占用的 GPU 资源立即被释放并分配给新任务，从而消除批处理中的「长尾」效应。该设计在需要动态过滤样本的场景下，能极大加速高质量样本的收集效率。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9hBqUz0Dian1TicUfJ9ibOskOqngwhO9DhbOwcNYVLL6iclgDibLr1Shu0jequBEbIB2giarUbLl0RocDA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

图 4: 批处理模式（上）因长尾效应和同步点导致 GPU 空闲，而队列调度模式（下）通过流水线化执行，实现了更高的资源利用率。

  

实验证明， 队列调度在不同批大小配置下均能稳定减少生成时间，在 128 \* 8 的配置下，带来了 2.5 倍的加速。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9hBqUz0Dian1TicUfJ9ibOskOjCXjs3y4jDGNibS15JPLvAAJvHS6rgyNRZaicPOZiaicLEic49JZcR1icrLg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

图 5: 队列调度在不同配置下的加速效果。

  

2\. 候选生成并行化（Prompt Replication）

对于需要为单个 Prompt 生成多个候选答案的场景，系统会将其拆分为多个独立的、生成单个答案的任务，并分散至不同 GPU 并行执行。这种「一对多」到「多对一」的转换为缓解长尾延迟提供了有效途径。实验表明， 该技术在多候选生成的场景下，最高可带来 1.95 倍的性能提升。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9hBqUz0Dian1TicUfJ9ibOskOn5E3yBQibnfSJmA9Bo64TEG77S7ctxbIGWO5UxKmeWibWiat5IcDV894g/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

图 6: 候选生成并行化在不同配置下的加速效果。

  

3\. 环境交互异步化（Environment-Level Async Rollout）

在智能体与环境交互期间，GPU 资源被立即释放用于处理其他轨迹的计算任务，实现计算与 I/O 等待的重叠。在环境交互延迟波动较大的 Agentic 任务中，该设计能带来显著的性能提升。 在 ALFWorld 真实环境上的测试显示，该技术带来了 1.58 倍的加速。

  

4\. 冗余环境部署（Redundant Environment Rollout）

通过部署冗余的环境实例组，有效应对环境中偶然出现的慢响应或无响应（fail-slow/fail-stop）问题，提升训练过程的鲁棒性。实验证明， 在真实 Agentic 环境（如 SWE-bench 和 ALFWorld）中，该技术能在异步化的基础上带来额外的 7%-16% 的吞吐提升。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9hBqUz0Dian1TicUfJ9ibOskONGibQHicsMhm7iaeFZlyxicGRdtCNeDx7dLibM0HxBicDG604speXG6B1KgQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

图 7: 在真实 Agentic 环境（SWE-bench, ALFWorld）中，环境交互异步化和冗余环境部署均带来了显著的端到端训练时间缩减。

  

异步训练：性能与稳定性的双赢

  

异步训练虽然高效，但也可能因「样本陈旧性」（Stale Samples）问题影响模型收敛。ROLL Flash 通过两大设计确保了性能与稳定性的双赢。

  

异步比（Asynchronous Ratio）

团队引入了 异步比 (Asynchronous Ratio, ) 参数，它定义了训练所用样本与当前最新模型版本之间的最大可容忍差距。通过此参数，可以在样本新鲜度与资源利用率之间进行权衡。实验表明， 在多数场景下，一个较小的异步比（如 2）就足以获得接近完整的性能提升，同时避免了严重的样本陈旧问题。

  

兼容主流 Off-policy 算法

为解决样本陈旧性带来的潜在性能损失，ROLL Flash 集成了多种主流的 Off-policy RL 算法（如 Decoupled PPO, TOPR, TIS, CISPO）。实验证明， 这些算法甚至是基础的 GRPO 能有效补偿异步训练带来的影响，使得最终模型性能与同步训练相媲美。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9hBqUz0Dian1TicUfJ9ibOskO7XJNU7zvxVZWVbKDGwLsJ0xibVmHkNy76TmhVdu8r8WY6lhzvn26JeQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

图 8: 在异步比为 2 和 8 的设置下，多种 Off-policy 算法的性能与同步训练（Sync）基线相当，证明了异步训练的稳定性和有效性。

  

实际影响：推动 RL 训练范式演进

  

ROLL Flash 不仅是一个系统层面的优化，更推动了大规模 RL 训练范式的演进。它将 RL 训练从传统的、步调一致的同步模式，转变为一个持续进行数据生产与模型消费的异步模式。

  

这意味着：

- 提升研发效率： 通过缩短训练时间，加速模型迭代与研究周期。
- 降低硬件成本： 在同等时间内，使用更少的硬件资源即可达到训练目标。
- 探索模型极限： 更高的训练效率使研究者有能力进行更复杂的模型、更长序列和更大规模数据的实验，从而探索模型性能的上限。

  

对于致力于提升模型数学推理、代码生成能力，或构建与真实世界交互的 LLM 智能体的研究者和工程师而言，ROLL Flash 提供了一个更高效、稳定和经济的训练解决方案。

  

2A：Asymmetric PPO —— 轻量评论家协同，重焕 Critic-based RL 高效新范式

  

在大语言模型（LLM）与强化学习（RL）深度融合的浪潮中，无 critic 的 RLVR 范式已成为主流的后训练算法。

  

然而，一个长期被忽视的问题是： 是否真的需要一个与策略模型规模相当的 “巨型评论家”（critic）？是否可以实现 critic 的轻量化，重新激发 PPO 的部署潜力？

  

阿里巴巴 ROLL 团队、香港科技大学和 Mila 的最新研究给出了否定答案。论文《Asymmetric Proximal Policy Optimization: Mini-Critics Boost LLM Reasoning》中提出 AsyPPO—— 一种面向 LLM 的轻量化、高稳定 PPO 变体，首次系统性揭示了评论家的参数规模与其价值估计能力并无必然关联，并由此解锁了更高效、更经济的 RL4LLM 训练新路径。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9hBqUz0Dian1TicUfJ9ibOskOGfeV2IYTib6MZp40X3UeM9ohrQedslib8LF3n9Rc2SggacrHXIUSAMVg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=9)

  

- 论文链接： https://arxiv.org/abs/2510.01656

  

三大核心发现，颠覆传统认知

  

1.Critic 是策略训练稳定性的天然「压舱石」

在 LLM 的 PPO 训练中，优势函数（advantage）的估计偏差极易引发训练崩溃。研究发现， 一个结构合理、训练充分的 critic 能通过逐状态（state-wise）显著提升训练鲁棒性。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9hBqUz0Dian1TicUfJ9ibOskOOiaHh8AXDicvJUWA5Su98NMewX4rwulx6ibY8IUm2yW011EFxHSHQ5ZUA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=10)

  

2.「小而美」的评论家同样可靠

实验表明， 仅需两个轻量级评论家 （参数量远小于策略模型），即可实现与巨型 critic 相当甚至更优的价值估计性能。这意味着 RL 后训练不再需要为 critic 配置昂贵的专用计算资源。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9hBqUz0Dian1TicUfJ9ibOskOETWELeXibJd8Y9n2g7l5RLI0iaoNJ8pVxO43pjB1EggclukWPqxdAWlQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=11)

  

3\. Critic 不仅评估，更能引导策略优化

评论家之间的 一致性与分歧性 蕴含丰富信号 —— 可被用于动态重构策略损失，实现「智能」的探索与利用平衡。

  

AsyPPO：轻量、稳定、高效

  

基于上述洞察，AsyPPO 引入两项关键技术：

  

创新点一：多样化微型评论家聚合

  

通过 非重叠的提示级数据划分 （prompt-level data partitioning），训练多个轻量 critic。仅需两个 critic 即可有效校正优势估计偏差，计算开销极低，却显著提升训练稳定性。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9hBqUz0Dian1TicUfJ9ibOskOT8VIniaNp6PUIR7rjNLR50cicJWRERDGRibjpohqgKVzOg6Viaic408ibHGw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=12)

创新点二：不确定性感知的策略损失重构

  

动态分析多个 critic 对同一状态的价值估计：

  

- 当意见一致（低不确定性）： 屏蔽优势值 → 避免对噪声样本过拟合

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9hBqUz0Dian1TicUfJ9ibOskOjpcaCrA5I6rEaUwI1sHPJXK5KN8LlVBpWFicNVfBj43icgQenx3FuMjg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=13)

  

- 当意见分歧（高不确定性）： 将这些状态从熵正则项中剔除 → 防止在无意义区域进行无效探索
![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9hBqUz0Dian1TicUfJ9ibOskOdNfeiaVGAa2AwCZdRCoyKk7dj5fKic1eIQWbW9HiaRuFcDCQuIOWlDL5A/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=14)

  

实际效益：降本增效，推动落地

  

AsyPPO 不仅在算法层面实现突破，更带来显著工程价值：

  

- 训练更稳定： 有效避免因优势估计偏差导致的训练崩溃，确保收益持续增长
- 部署更轻量： 减少一个标准高性能服务器节点
- 速度更快： 单步训练耗时缩短约 20 秒，显著提升迭代效率

  

社区影响与意义

  

AsyPPO 的提出具有广泛的社区价值与长远意义：

  

- 推动 RL4LLM 的民主化： 通过大幅降低 critic 的计算与显存开销，使中小研究团队和初创公司也能高效开展基于 PPO 的 LLM 对齐与推理优化研究，打破「只有大厂才能玩 RLHF」的资源壁垒。
- 重燃对 critic-based 方法的信心： 在无 critic 方法主导的当下，AsyPPO 证明了精心设计的轻量 critic 不仅可行，而且更优，为学界重新审视 PPO、AC 等经典 RL 框架在 LLM 场景中的潜力提供了关键实证。
- 促进算法 - 系统协同创新： 其「微型评论家 + 动态损失重构」范式为后续研究开辟了新方向，例如与 MoE 架构、稀疏训练、知识蒸馏等技术结合，有望催生新一代高效、可扩展的 LLM 智能体训练框架。
- 开源友好，易于集成： AsyPPO 无需修改策略模型结构，仅需在训练流程中引入轻量 critic 和损失调整逻辑，可无缝集成到现有 RL4LLM 工具链（如 TRL、OpenRLHF、DeepSpeed-Chat），具备极强的工程落地潜力。

  

这项工作为 critic-based RL 算法在 LLM 后训练中的规模化应用扫清了关键障碍，证明了 「小模型也能驱动大智能」，也为构建高效、稳定、普惠的大模型强化学习生态迈出了重要一步。

  

3A：Attention Rhythm —— 从黑盒推理到结构感知，实现细粒度信用分配

  

大型语言模型在复杂推理任务上取得了显著成功，但其内部推理机制仍是一个黑箱。当前强化学习方法通常对整个生成序列应用统一的信用分配，模糊了关键步骤与常规步骤之间的区别。 这种不匹配限制了数据效率、可解释性以及在挑战性推理任务上的性能提升。

  

本文探索一个重要问题： 「通过更深入地把握模型内部的推理模式（例如识别其何时进行思考、何时检索信息、何处构成关键决策节点），能否更有效地实现对模型推理能力的强化？」

  

本研究通过 注意力动力学 这一独特视角，揭示了 LLM 内部固有的推理节奏，为更透明、有效的优化提供了可能。

  

阿里巴巴 ROLL 团队与上海交通大学 联合发表论文，探索了基于注意力机制的模型内部机理分析，并将 RL 过程对齐模型内在机制以实现效率和性能的提升：

  

- 重新思考 Attention 的角色： Attention 不仅是语言模型计算的副产品，更是揭示推理内在逻辑的结构化蓝图。通过分析注意力模式，能更清晰捕捉模型在信息整合、序列生成中的「思维轨迹」，为很大程度仍是黑盒的推理过程提供可解释的框架，帮助更透明解读模型的每一步决策。
- RL 算法革新： 通过精准对齐优化目标与模型内生的推理节奏，将传统的序列级奖励在 token 级别的均匀分配转化为具备推理结构感知的动态奖励分配。此机制动态识别并强化关键推理步骤，推动大模型优化进入更透明、更精细、更高效的优化范式。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

- 论文链接： https://arxiv.org/abs/2510.13554
![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

注意力揭示的关键推理模式

  

研究团队从两个互补视角分析注意力机制： 局部（向后）视角衡量 token 对邻近上下文与远程上下文的依赖程度，全局（向前）视角衡量 token 对后续 token 的下游影响。

  

通过对 Qwen3-4B-Base 模型在 GSM8K 数据集上的分析，研究者根据注意力头的平均注意力跨度将其分类为局部关注 Map 和全局关注 Map。

  

局部关注型聚合注意力图展现出沿对角线的锯齿状模式，跟踪短语或语义块。在语义块内部（如习惯性表达「by the way」），注意力保持高度局部化；而在新块开始时，注意力突然回溯到更早的上下文。全局关注型聚合注意力图则突出显示具有广泛下游影响的稀疏锚定 token，这些 token 被许多后续位置反复访问，充当语义枢纽。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

量化指标分析

基于上述观察，研究团队设计了两个关键指标：

  

1.Windowed Average Attention Distance (WAAD)：

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

该指标衡量在裁剪窗口内 token 回溯的距离，强调模型是否必须超越直接邻居来解决歧义。低 WAAD 值表示块内的紧密局部延续（谷值），而峰值表示在块边界处的长距离回溯。

  

2.Future Attention Influence (FAI)：

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

该指标通过平均 token 从未来位置接收的注意力来量化其全局重要性。高 FAI token 通常对应关键逻辑路点，如关键定义、中间结果或决策点。

  

预规划 - 锚定节奏机制

通过联合分析 WAAD 和 FAI 的动态模式，研究团队发现了一个一致的双拍节奏：

  

1. 预规划阶段： 当模型接近语义边界时，WAAD 峰值表明长距离上下文检索，以生成准备即将到来的概念或步骤的介绍性 token；
2. 锚定阶段： 在同一位置或稍后，模型发出具有高 FAI 的 token，被未来位置反复访问以指导和稳定后续推理。

  

这种耦合模式通过三个实证耦合得到验证：WAAD 峰值保持更高的 token 熵；接收头和全局关注头识别出共享的锚定；FAI 峰值跟随或与 WAAD 峰值重合。

  

定量分析显示， 这些耦合相对于随机机会都有显著提升（+42.47% 到 + 171.49%）。

  

最终，从分析中可以得到如下机理：

  

- 局部语块化： 模型在生成过程中倾向于以「语义块」为单位进行密集局部交互，表现为注意力矩阵中近对角线的锯齿状高亮区域。在语块边界处，模型常触发一次长程上下文检索（表现为高熵 token 与跨段注意力峰值），为后续生成提供关键线索。
- 全局锚点规划： 少数稀疏但关键的 token（如问题中的核心变量、代码中的函数名）会成为全局锚点，被后续大量 token 反复回溯引用。扰动实验表明，修改这些锚点将显著偏移整个推理轨迹，证明其在规划中的核心地位。
- 预规划 - 锚定耦合机制： 局部前瞻信号与全局锚点信号之间存在稳定的时序耦合，共同构成反复出现的推理节律：模型首先生成一个引导性 Token 作为「预规划」，随后锚定一个核心语义节点，二者协同启动一段结构化推理流程。这一节律在多轮推理中反复出现，构成 LLM 的「思维节拍」。

  

基于注意力信号的精细化策略优化

  

基于上述发现，研究团队设计了三种针对关键推理节点的强化学习信用分配策略：

  

1. 局部块信用分配： 通过 WAAD 变化选择预规划 token，识别短语块峰谷转换的边界 token。对这些 token 的优势进行放大（如放大 50%），从而实现局部引导性位置的强化。
2. 全局锚定信用分配： 通过 FAI 评分选择具有高未来影响的 token 进行优势放大。放大锚定 token 有助于模型表达和保留组织下游推理的核心语义，实现 reward 信号快速传导到推理的关键节点从而做出调整。
3. 耦合节奏信用分配： 结合预规划和锚定，将锚定 token 的信用重新部分分配给其局部预规划节点（例如锚定 token 优势放大 30%，而预规划 token 放大 20%），加强预规划与锚点在时序上的协同，促进推理流程的结构化。

  

Attention Map 的获取： 在 RL 框架中获取 Attention Map 的关键在于绕过默认推理 / 训练引擎（如 vLLM 和 Megatron）对完整注意力矩阵的丢弃机制。由于这些系统为节省显存通常使用 Flash Attention 并丢弃中间注意力权重，作者引入了一个专用的辅助模型 actor\_attn（基于标准 Transformer 实现），在每次由 actor\_infer 生成完整响应后，将原始 prompt 与生成的 response 拼接成完整序列，并在此辅助模型上执行一次额外的前向传播。

  

在此过程中，从网络中间三分之一区域（如第⌊L/3⌋到⌊2L/3⌋层）均匀采样若干层的完整注意力图，作为模型推理节律的代表性快照。该操作仅增加一次前向计算开销，且在 actor\_train 每次策略更新后同步其权重至 actor\_attn，确保注意力分析与当前策略一致。

  

实验验证

  

研究团队在多个推理任务上评估了所提方法的有效性：

  

1. 简单逻辑谜题和问答： Countdown puzzle（需要组合四个给定数字使用算术运算达到目标值）和 CrossThink-QA 数据集（聚合多领域 QA 对）；
2. 数学推理基准： AIME24、AIME25、AMC、MATH500 和 OlympiadBench 五个标准数学推理基准。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

主要实验结果

  

在 Countdown 任务上， 耦合节奏信用策略达到 63.1%，显著优于 GRPO 基线 (52.6%)。 局部块和全局锚定信用方案也带来一致提升，而随机或基于熵的 token 选择提供边际或无改进。在 CrossThink-QA 上，所有信用感知变体都显示出一致改进，最佳变体耦合节奏信用达到 50.1%。

  

在数学推理基准上， 所提方法在所有设置下都一致优于 GRPO 基线和简单替代方案。 值得注意的是，耦合节奏信用在最具挑战性的任务上取得了最强增益，如 Qwen3-8B 在 AIME25 上提升 + 5.0 个百分点，在 AMC23 上提升 + 6.3 个百分点。这些增益在不同序列长度下都很稳健：在扩展的 8K 上下文中，耦合节奏信用仍然提供一致改进。

  

消融实验

- Top-k vs Bottom-k 对比： 实验表明， 对根据指标排名 bottom 40% 的 token 重新分配额外信用会导致性能下降。 RL 训练变得无效，数学推理的峰值评估指标无改进。相比之下，优先对 top-k token 分配信用带来明显改进，证实了指标在识别决定性位置方面的有效性。
- Top-k 比例影响： 实验结果显示， 专门对 top 40% 的 token 分配信用产生最强的整体性能，在所有数据集上达到最高分数。 较小和较大的比例都导致性能下降，表明强化太少或太多 token 会稀释对关键推理位置的信号。

  

意义

  

注意力内在信号的指引可将 LLM 的强化学习从「盲目试错」推向「结构引导」，使大家能够：

  

- 读懂模型如何思考（可解释性）
- 精准干预关键决策点（可控性）
- 高效优化复杂推理链（效率）

  

接下来，团队将探索模型内在注意力信号在多智能体协作、工具调用、自我反思等高级推理场景中的应用，并开源相关工具链，助力社区构建透明、高效、结构化的下一代 LLM 训练范式。

  

彩蛋时刻：🌟 ROCK & ROLL！ 🌟

  

你是否也有这些痛苦经历？

  

- 是否为 Agentic 部署环境的效率低下而苦恼不已？明明配置了强大的算力资源，训练速度却像蜗牛爬行；
- 是否曾经满怀期待地在清晨查看实验结果，却发现因为环境崩溃而白白浪费了一整夜的宝贵时间；
- 是否遭遇过 Docker 容器莫名其妙地僵死，进程卡住却无法自动恢复？重启容器？抱歉，已经错过了最佳训练窗口期；
- 是否经历过多个 Agent 实例争抢资源，导致系统过载甚至集体罢工？想要并行训练加速，结果反而全军覆没；
- 是否因为缺乏实时监控，连环境出了什么问题都无从追溯？日志翻到手软，却只能看到一句冰冷的「Connection Lost」；
- 是否在扩展实验规模时，手动管理几十上百个环境实例到崩溃边缘？ 配置文件复制粘贴到怀疑人生，还是会漏掉几个？

  

那么，你一定不能错过阿里巴巴最新开源的 ROCK（Reinforcement Open Construction Kit）， 将为你提供：

  

- 高稳定的沙箱管理服务： 每个 Agent 都有独立的「安全屋」，互不干扰，崩了一个不影响其他；
- 全方位健康监控： 24/7 实时体检，环境有个头疼脑热立刻告诉你，甚至比你自己更懂你的实验；
- 智能负载均衡： 自动调度资源分配，让每个 Agent 都能「雨露均沾」，不会出现有的饿死有的撑死；
- 自动故障恢复： 环境挂了？没关系，秒级自动重启，训练无缝续接，就像什么都没发生过；
- 可视化仪表盘 - 实验进度一目了然，不用再盯着黑乎乎的终端发呆。

  

有了 ROCK，让你：

晚上启动 Agentic RL 训练任务后：安心盖上电脑，美美地睡个好觉，不用半夜爬起来检查进程（告别熊猫眼）， 甚至可以关掉钉钉通知（老板：？）

  

第二天早晨醒来：

- 悠闲地泡杯咖啡
- 打开仪表盘，顺利查收实验成果
- 看着漂亮的收敛曲线，露出满意的微笑
- 精神饱满地开始新一轮实验迭代

  

从此告别：

- 凌晨三点爬起来重启环境的噩梦
- 「早上起来一看，只跑了 10 个 episode」的绝望
- 「环境又崩了，这周白干了」的愤怒

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

未来展望与社区贡献

  

未来，ROLL 团队将继续深耕 RL for LLM 的系统与算法协同创新，致力于打造易用、高效、可扩展的开源生态，为社区提供坚实的基础设施。

  

团队相信，通过解决工程与系统层面的瓶颈，将极大释放算法的创新潜力。欢迎每一位对 LLM 与 RL 充满热情的开发者 Star、试用开源项目，并贡献代码，与大家一起，推动 LLM 强化学习走向更广阔的实用化与规模化未来！

  

- ROLL 项目链接：https://github.com/alibaba/ROLL
- ROCK 项目链接：https://github.com/alibaba/ROCK

  

© THE END

转载请联系本公众号获得授权

投稿或寻求报道：liyazhou@jiqizhixin.com

继续滑动看下一个

机器之心

向上滑动看下一个