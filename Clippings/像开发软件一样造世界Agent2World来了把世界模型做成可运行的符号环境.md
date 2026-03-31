---
title: "像开发软件一样造世界，Agent2World来了，把世界模型做成可运行的符号环境"
source: "https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&chksm=851d77a0897e5bd095f0ba81c5eceb2916af9dfba043ae270e24700ddef3a78334fc4bce0d84&idx=3&mid=2651014886&sn=7764ffa49fe7e084acd3a3b29f273b87#rd"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2026-02-02
description: "Agent2World 的提出，标志着统一多智能体框架在符号世界模型生成领域的成功应用。"
tags:
  - "多智能体框架"
  - "符号世界模型"
  - "评估驱动精炼"
  - "可执行环境"
abstract: "Agent2World是一个工具增强的多智能体框架，通过知识合成、世界模型实现和评估驱动精炼的三阶段闭环，自动生成高质量、可执行、可验证的符号世界模型，并在多个基准测试中达到领先性能。"
---
*2026年2月2日 14:12*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWic1GuW68DykycvknmG9tyBv6ax8e99N0eyLy4Qo7OzKR5sgwWkpGv1vxoygrqI14ssGoXb90ibG6Jw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

让模型真正 “ 能行动 ”，往往需要一个可执行、可验证的符号世界模型（Symbolic World Model）：它不是抽象的文字描述，而是能被规划器或执行器直接调用的形式化定义 —— 例如 PDDL 领域 / 问题，或可运行的环境代码 / 模拟器。一旦世界被 “写成可运行的规则”，我们就能在同一套约束下进行推演、测试与复现：模型不再停留在 “会说”，而是能回答 “如果我这样做，会发生什么”，并用执行结果检验自己是否真的理解了这个世界。

  

问题在于，现有自动生成路线普遍陷入三重困局：脚本式工作流、知识边界封闭、表示覆盖单一。许多方法仍沿用固定的 “生成 — 修复” 脚本，并以解析 / 规则匹配 / 固定检查集等静态校验为主：它们或许能修语法与格式，却常常抓不住只有在交互执行中才暴露的行为级错误（例如状态更新不一致、目标不可达、奖励机制失效）。与此同时，当任务规格含糊、缺失关键规则或背景常识时，系统缺少主动检索与补全机制，只能依赖模型记忆 “猜”。更关键的是，既有研究往往只覆盖一种世界模型表示（只做 PDDL，或只做可执行代码），导致同一任务难以在不同符号表达之间共享验证闭环与改进经验，限制了方法的通用性与可扩展性。

  

为攻克这一难题，研究团队提出 Agent2World：一个工具增强（tool-augmented）的多智能体框架，用 “知识合成（Knowledge Synthesis）→ 世界模型实现（World Model Generation）→ 评估驱动精炼（Evaluation-Driven Refinement）” 的三阶段闭环，把 “查资料补规格 + 写实现 + 交互测试纠错” 内化为可复用的生成范式，从而稳定产出高可执行、可验证的符号世界模型。

  

实验结果显示，Agent2World 在 Text2World (PDDL)、CWMB (MuJoCo) 和 ByteSized32 (文本游戏) 三大基准上均实现了 SOTA 性能。更关键的是，该框架展现了可持续改进潜力：基于 Agent2World 生成的高质量轨迹进行微调（SFT）后，模型性能显著跃升 —— 与训练前的同一模型相比，平均相对性能提升了 30.95%，有力证明了其作为高质量世界模型数据合成引擎的工程与研究价值。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW928o8I4c8nDCHXd6h8yAHwFsKjRo1UMw0lx9TDqNbsmiaTicFnZuegt5Rk5cnIoWb6wiajnfzP7FTiaQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

  

- 论文地址： https://arxiv.org/abs/2512.22336
- 项目地址： https://agent2world.github.io/
- 模型地址： https://huggingface.co/agent2world/llama3.1\_8b\_instruct\_full\_sft\_v1\_3\_epoch
- 代码地址： https://github.com/DeepExperience/agent2world

  

一、深层归因：为何传统 “脚本式” 生成难以为继？

  

在 Agent2World 之前，自动生成世界模型的主流方案常采用固定的 “草稿 — 修复（Draft-Repair）” 脚本：生成代码 → 跑错 → 看报错改代码。它能修语法，但很难保证 "跑起来" 的世界是对的。

  

- 被动脚本的死循环： 缺乏前瞻性规划，复杂任务里常陷入 “改一个 bug 引出新 bug” 的低效迭代。
- 规格缺口带来的幻觉： 描述不完整时，模型往往只能靠记忆 "猜" 规则边界、接口细节与隐含前提，导致看似能跑、实则不自洽。
- 表示覆盖单一的 "符号孤岛"： 既有研究往往只覆盖一种世界模型表示 —— 要么偏向 PDDL 的形式化规划，要么偏向可执行环境代码。两条路线各自为战，生成、验证与修复经验难以跨表示共享与迁移，同一问题在不同符号表达下往往需要重做一套流程，最终限制了方法的通用性与可扩展性。

  

归根结底，难点不只是 “写出代码”，而是要在真实约束下稳定产出可执行、可复现、可迭代的世界模型；而 “脚本式流程 + 单一表示覆盖” 的组合，正是阻碍这一目标的核心瓶颈之一。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW928o8I4c8nDCHXd6h8yAHwoibq10WzeSQhV1EvzftrqWiapfSkoa00XoybEViaIE5YUWfgxOwYQ6Rmg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

  

二、方法拆解：把 "软件开发团队" 装进模型里

  

Agent2World 的核心不是 "多拉几个 agent 聊天"，而是把世界模型生成拆成软件工程式三阶段：Researcher 补规格、Developer 做实现、Testing Team 用单测 + 仿真交互做行为级验收，并把验收反馈反哺修复。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW928o8I4c8nDCHXd6h8yAHwTwSvVELxR9xYRxFaJgQKDanGUibD615f6WajrYncu4KQfHlVmcM38nw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

  

1\. Deep Researcher：主动打破知识壁垒

  

现实任务往往信息不完备：目标相对清晰，但规则边界、参数范围、动作约束与接口细节并不完整，在不确定性与知识缺口的叠加下，极易导致事实性错误与幻觉。Deep Researcher 首先将任务描述分析并拆成一组待澄清问题（例如：允许的动作集合、状态变量定义、终止条件、异常情况与边界输入等），它配备了网络搜索和检索工具，能够迭代地从互联网检索构建世界模型所需的知识，并最终输出一个结构化的中间表示，其中缺失的信息已得到补充。

  

2\. Model Developer：统一跨模态表达

  

在获得补全后的规格后，Model Developer 负责生成目标世界模型（例如 PDDL 域 / 问题，或可执行的环境代码）。这一阶段不以 “写得像” 为目标，而以 “能执行、接口连通、与规格一致” 为硬约束。

  

因此 Developer 会在受控沙盒中进行基础运行检查与增量修复：一方面保证文件组织、函数签名、依赖与调用链正确；另一方面确保状态转移、动作前置条件与效果、终止判定等核心逻辑与规格对齐。该阶段的输出是一个可以被执行器 / 规划器直接调用的环境实例。

  

3\. Testing Team：双重防线杜绝幻觉

  

这是框架中的关键组成部分。不同于以往依赖静态验证器的方法，Testing Team 引入了动态的、行为级的双重验证机制，专门捕捉只有在交互中才会暴露的逻辑错误。

  

- Unit Tester：它自动分析代码结构，生成 Pytest 风格的单元测试用例。重点验证接口契约（Contract）、谓词逻辑和不变式（Invariants）。例如，检查 step () 函数返回的状态维度是否与定义一致，或 PDDL 中的动作前置条件是否完备。
- Simulation Tester：这是一个基于 ReAct 框架的智能体，以交互方式在环境中采集轨迹并诊断深层的问题，如动力学错误 —— 例如 “机器人执行了移动动作但坐标未更新”、“奖励函数在达到目标后未正确触发” 或 “状态转移违背物理常识”。

  

一旦发现问题，Testing Team 会输出包含错误分析（Analysis）和修复建议（Suggest Fix）的结构化报告，驱动 Developer 进行针对性修复，直到通过所有测试或达到收敛条件。

  

进阶：从推理到训练，构建 "自进化" 的数据飞轮

  

Agent2World 的价值远不止于一个推理框架，它本质上是一个全自动的高质量数据合成引擎。研究团队通过 “任务合成 — 轨迹筛选 — 经验蒸馏” 的严密流程，将多智能体协作中的有效修复策略蒸馏为单体模型的生成与修复偏好。

  

- 数据合成：验证器引导的拒绝采样，为了避免数据泄露并提升泛化性，团队并未直接使用测试集题目，而是自主合成（Self-Synthesized）了大量涵盖不同领域的全新任务。在此基础上，系统利用 “验证器引导的拒绝采样（Verifier-Guided Rejection Sampling）” 机制，从海量生成结果中筛选出 1526 条既通过沙盒运行、又通过双重测试校验的轨迹。这套数据集完整记录了 Developer 从错误代码到修复成功的高密度轨迹，为模型提供了极高价值的逻辑纠错样本。
- 监督微调：在训练阶段，团队精准提取 Model Developer 的交互轨迹对 Llama-3.1-8B-Instruct 进行监督微调。训练的核心目标并非让模型单纯模仿多智能体对话，而是让其学习 Developer “如何理解模糊规格” 以及 “如何根据 Testing Team 的报错修复代码”。通过这种方式，单体模型成功 “继承” 了多智能体系统中 “根据反馈迭代（Iterative Refinement）” 的能力。

  

三、实验验证：横扫三大基准，验证 "数据飞轮" 效应

  

Agent2World 在 Text2World（PDDL）/ CWMB（MuJoCo 可执行模拟器）/ ByteSized32（文本游戏环境）三大基准上都拿到领先表现。

  

1\. Text2World (PDDL)：

  

从 “能跑” 到 “懂逻辑” 的显著提升。以 GPT-4.1-mini 为底座，在衡量 PDDL 代码生成的基准中，Agent2World Multi 明显降低了代码 “跑不通” 的失败率，实现了 93.1% 的代码可执行率（Executability），相比强基线 Text2World ($EC=3$) 提升了 14.9 个百分点。更重要的是，它在衡量语义正确性的 Component-wise F1 指标上达到了 75.4（基线仅为 60.1），提升幅度达 15.3 分。这表明模型不再只是机械地模仿 PDDL 语法，而是更加理解了谓词约束与逻辑门控，生成了既符合语法又具备可解性的高质量规划域。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW928o8I4c8nDCHXd6h8yAHw37cu5QgtDQmaxcAlyHcla4z2acOHVgHLaH5GUiaR3NtM9bhR1Dvfnkw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

  

2\. CWMB (MuJoCo)

  

不仅预测得准，更要 “好用” 。CWMB 同时评估 “仿真代码是否能预测动力学”（Accuracy）与 “作为世界模型能否支撑下游规划 / 控制”（Overall Normalized Return, R）。 在 GPT-4o-mini 上，Agent2World Multi 的 Overall R 达到 0.4811，相比此前最强基线 GIF-MCTS 的 0.3488 提升了 +0.132；并且在离散动作空间的预测准确率上与强基线持平（0.917 vs 0.914）。这说明，性能的提升并非来自单纯的下一帧预测相似度，而是源于模型实现了 “可用于规划的行为级一致性”，真正支撑起了下游控制任务。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW928o8I4c8nDCHXd6h8yAHwxUsQxs6ChQOK3ABSowz3PIibHApppYImnWT7IGf9WQGhH9kyF1icWToA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

  

3\. ByteSized32 (Text Games)

  

常识推理与物理现实的高度一致性。在极度依赖常识推理的文本游戏中，Deep Researcher 的主动知识检索发挥了很大的作用。Agent2World Multi 在核心指标 “物理现实对齐度（Physical Reality Alignment）” 上取得了 0.4768 的高分，相比单智能体版本（Single Agent）大幅提升了 0.2848 。 此外，在技术有效性（Technical Validity）上，模型生成的游戏代码初始化成功率接近 99% 。这些数据表明，通过引入外部知识与多轮测试，模型成功消除了大量违反常识的 “物理幻觉”（如错误的状态转移或不合逻辑的物品交互），生成了逻辑严密且更稳定的文本环境。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW928o8I4c8nDCHXd6h8yAHwapIA9jO5FS3HepUvFPa3xt2doRNIs30smZpJBv0bQP6QeLqpZtbquw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW928o8I4c8nDCHXd6h8yAHwRy2ex9FwR0MKDXnBCE3mwNhYdImI0JgPEKq3lfwGrbn4s6Ribr3Cu5A/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

  

4\. 模型微调实验

  

基于自主合成的高质量轨迹数据（训练仅使用 Model Developer 轨迹），团队对 Llama-3.1-8b-instruct 进行了监督微调。实验表明，这种 “以 Agent 养 Model” 的策略带来了显著的泛化能力提升：微调后的模型在未见过的测试任务（Unseen Tasks）上，平均相对性能提升了 30.95%。特别是在 Text2World 任务中，模型生成的代码可执行率（Executability）提升高达 16.9%。这有力证明了，无需依赖昂贵的超大模型，仅凭小参数模型配合优质的 “自我修正” 合成数据，也能实现向高性能世界模型构建者的跨越。

  

5\. 消融实验

  

缺一不可的双引擎（基于 CWMB 验证） 为了探究 Agent2World 卓越性能的来源，团队在 CWMB（物理控制） 任务上进行了严苛的组件消融实验。结果证实，Deep Researcher 与 Testing Team 均是构建高可靠世界模型不可或缺的组件：

  

- 移除 Deep Researcher（知识引擎缺失）： 模型生成的模拟器在整体归一化回报（Overall Normalized Return, R）上出现显著下滑。这表明，在缺乏对物理参数与 API 规范的主动检索时，模型定义的环境规则会出现 “失真”，导致下游 Agent 无法在模拟中学习到在真实环境中有用的策略。
- 但当移除unit tester后，在离散动作空间的预测准确率显著下降约 30%。移除simulation tester，也会同比下降约3% 。这揭示了一个关键发现：“能运行” 不等于 “物理正确”。没有动态交互产生的行为级反馈，模型很难在该设置下修正深层的动力学错误（如重力模拟偏差），生成的模拟器也因此失去了实用价值。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW928o8I4c8nDCHXd6h8yAHwwY1dhIwMib1THfwBY6icT7drI5YclUO0g9xbnA83p8C6jiaQ9icnaC7JnA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

  

四、结语：开启 AI 自主理解环境的新可能

  

Agent2World 的提出，标志着统一多智能体框架在符号世界模型生成领域的成功应用。它不仅打破了 PDDL 规划与可执行代码之间的表征壁垒，更通过 "网络知识合成 - 迭代式模型开发 - 评估驱动仿真测试" 的精密闭环，在无需人工标注与人工验收的前提下，实现自动化的生成 — 测试 — 修复闭环，从而稳定产出可执行、可复现、可迭代的符号世界模型。这一突破不仅在三大基准测试中一致性地刷新了 SOTA，更为未来 AI 系统从自然语言中可靠地理解并形式化复杂的现实环境，开辟了全新的可能性。

  

© THE END

转载请联系本公众号获得授权

投稿或寻求报道：liyazhou@jiqizhixin.com

  

继续滑动看下一个

机器之心

向上滑动看下一个