---
title: “模型三巨头”协作性能飙升30%，Sakana AI提出新型推理时扩展算法，让模型间协作性能大幅提升
source: https://mp.weixin.qq.com/s/cUkJhq04t_w9TmlKOvE1rg
author:
  - "[[DeepTech深科技]]"
published: 
created: 2025-07-02
description: “三个臭皮匠，顶个诸葛亮”，这一谚语不仅适用于人类，也适用于大模型。
tags:
  - 自适应分支蒙特卡洛树搜索
  - 模型协作
  - 推理时扩展算法
  - SakanaAI
abstract: Sakana AI提出新型推理时扩展算法AB-MCTS，通过多模型协作将性能提升30%。
---
DeepTech深科技 *2025年07月02日 17:11*

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/JJtKEey0hPYsqypL8FAjiczwXibzyBZiacICiazScMME2sA7mNFT6Inmia4Kp9nvqz9hqjN7wcICjumDJbnIkfL7uVA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

  

“三个臭皮匠，顶个诸葛亮”，这一谚语不仅适用于人类，也适用于大模型。7 月 1 日，由“Transformer 八子”之一利昂·琼斯（Llion Jones）联合创办的日本 Sakana AI 公司打造出一种名为自适应分支蒙特卡洛树搜索（AB-MCTS，Adaptive Branching Monte Carlo Tree Search）的新型推理时扩展方法。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/JJtKEey0hPZlEtf9r71cKibxWuGKm5qh7jzq3ialgichkzFfkBxGJFSdTTxBPUgB2AkrEOQqRHefQcZmb1wXUEMZg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

（来源：Sakana AI）

  

这种新型推理时扩展算法通过允许多个前沿模型（如 Gemini 2.5 Pro、o4-mini、DeepSeek-R1-0528）协同工作让 AI 实现集体智能。

  

受人类集体智慧力量的启发，研究团队相信最伟大的成就源于不同思想的碰撞，同样的原则也适用于 AI。像 ChatGPT、Gemini 和 DeepSeek 这样的模型都非常先进，每个模型都因其训练而具有独特的优势和偏见，研究团队认为这些也是集体解决问题的宝贵资源。

  

AB-MCTS 则能通过利用这些特性，使多个模型能够协同工作并能进行有效试错，从而解决了单一 AI 系统难以应对的复杂问题。在 ARC-AGI-2 基准测试上， AB-MCTS 将 o4-mini、Gemini-2.5-Pro 和 DeepSeek-R1-0528 等前沿 AI 模型加以结合，借此打造出一个名为 Multi-LLM AB-MCTS 的系统，并发现该系统的性能大幅超越了单个模型的性能。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/JJtKEey0hPZlEtf9r71cKibxWuGKm5qh7n3ffU8KS50OicCFOj8mJkMgMwpwYDcADY7sWGsflhZ24O7wLyK9Aajw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

图 | AB-MCTS 和 Multi-LLM AB-MCTS 在 ARC-AGI-2 上的结果（来源：Sakana AI）

  

据介绍，本次研究基于该团队在 2024 年开展的进化模型融合工作。但是，他们在本次研究之中将重点从“混合创造”转向“混合使用”已有 AI。该团队认为，未来的 AI 系统将像人类专家团队一样协同应对复杂挑战，并能超越单一模型的局限性。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/JJtKEey0hPZlEtf9r71cKibxWuGKm5qh7yueEvrR8LKkQzdXiaUWaTQjQN0xQQC4huHhib7YEds9eHm0MPxSiaNOlA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

（来源：Sakana AI）

  

目前，研究团队已将底层算法 TreeQuest 以 Apache 2.0 许可证发布。TreeQuest 是一个用于推理时扩展的搜索软件框架，其拥有灵活的 API，允许用户使用最少的代码将 AB-MCTS 和 Multi-LLM AB-MCTS 应用于各种任务，并能随意实现自定义评分和生成逻辑。它的检查点功能可在 API 出错时轻松恢复，因此在处理复杂任务时更具实用性。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/JJtKEey0hPa8j3FCXrceG0YtkfVp6VLWdSwFmz2Wob1K6voAphhRJhJQoXQo7wDzpZpbhV7uUo7MvnoWZRrr2w/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

推理时扩展是什么？搜索的双重维度又是什么？

  

当面对一个无法立马解决的难题时人类会怎么做？最有可能的是方法是：你会自己花更多时间思考，亲自动手进行反复试验，或者与他人合作。那么，AI 能以同样的方式解决难题吗？

  

目前备受关注的一个范例是推理时扩展（或测试时扩展）。该范例表明对于单个复杂问题，在推理时分配更多计算资源可以提高性能。虽然训练过程中性能与计算量之间的关系（即训练时间扩展）早已为人所知，但研究团队了解到在模型完成训练之后，性能与所使用的计算预算之间也存在正相关关系。其中一种方法是使用强化学习来生成更长的思维链，此前该方法已经极大提升了 OpenAI 的 o1/o3 和 DeepSeek 的 R1 等推理模型的能力。事实上，这也对应着人类在遇到问题时所采取的“更深入思考”的策略。除了给到推理模型更多“思考时间”之外，还可以让它通过反复审视一个问题来优化其答案，甚至在必要时让其从头开始。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/JJtKEey0hPZlEtf9r71cKibxWuGKm5qh7kT2nlcklUEKPpicEk8zHguv9msJVbjzibqJBkIxJib5WG4r5DkUAB8sEg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

图 | 推理时间扩展的三个方向（来源：Sakana AI）

  

据介绍，使大模型采用试错法的最简单方法是称为“顺序优化”的深度搜索方法。这种方法使用大模型来生成答案，然后反复对其进行优化。另一种方法是重复采样，即大模型多次根据同一提示生成解决方案。重复采样会反复向大模型发起查询，但却不会考虑之前尝试的结果，即利用了大模型的随机性（即对同一问题产生不同答案）。尽管重复采样法似乎效率不高，但根据此前报道来看，它在许多基准测试中的表现都要优于顺序优化。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/JJtKEey0hPZlEtf9r71cKibxWuGKm5qh7NTT4YYKA91TL83HnNzvkhQmvbBSjmODHORG2YHWGTJwlZ4Ex5CicdVg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

（来源：Sakana AI）

  

因此，无论是深入搜索（即优化现有解决方案），还是广泛搜索（即生成新解决方案），都已被证明有助于利用大模型寻找更优答案。然而，此前尚未出现一种方法来将它们结合起来。如果初始尝试方向错误，那么通过反复优化解决方案的逐步优化法，可能就很难找到一个好答案。使用重复采样的方法，即使用反复提问同一个问题的方法，则永远不会改进一个有潜力但不完美的解决方案。因此，研究团队认为如能实现一个更加接近人类的试错过程，要么将能通过重复相同的问题以便获得更好的初步方向，要么将能针对有潜力的解决方案进行优化。

  

基于这一洞见， 研究团队开发了 AB-MCTS，使其能够在深度和广度两个方向上进行灵活搜索，以便更好地适应所要解决的问题以及上下文。 在使用 AB-MCTS 的时候，模型一旦发现一个有前景的解决方案，就能在不断优化它的同时兼顾全新解决方案的生成。与现有方法相比，这使人们能在调用相同数量的大模型的情况下获得更好的答案。因此，在本质上 AB-MCTS 是一种更有效的新型推理时扩展方法。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

（来源：Sakana AI）

  

为了实现上面这种灵活的搜索，AB-MCTS 针对蒙特卡洛树搜索（MCTS，Monte Carlo Tree Search）方法进行了扩展。具体而言，在每一个节点处，AB-MCTS 会运用概率模型来评估以下两种操作的潜在质量，这两种操作分别是：生成一个全新解决方案，或针对现有方案进行优化改进。然后，从这些模型中抽取质量评估数据，以便确定下一步的方向。其中一个关键挑战在于，如何评估一个尚未生成的新解决方案的质量。针对此，AB-MCTS 通过使用混合模型和概率分布来进行评估，从而实现了真正灵活的搜索，进而有效地解决了上述问题。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

将 AI 协作作为第三个搜索维度

  

为了充分发挥多个大模型的集体智能优势，该团队开发了 Multi-LLM AB-MCTS 系统，其不仅能自适应地探索搜索方向，还能根据具体问题和情境动态选择最优的大模型。 除了在 AB-MCTS 中生成新解决方案（走得更广）和优化现有解决方案（走得更深）的选择外，Multi-LLM AB-MCTS 还增加了一个新步骤，即可以选择使用哪个大模型。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | Multi-LLM AB-MCTS 中的搜索算法概览（来源：Sakana AI）

  

要想让这个方法起效，就需要知道到底哪种大模型对哪个问题更有效。然而，这在一开始时是未知的，因此系统必须在搜索过程中进行调整。这意味着在早期阶段要平衡地使用各种大模型，然后集中精力研究那些被证明更有潜力解决问题的模型。事实上，这可以被视为是一个多臂老虎机问题（即机器学习领域的一个经典问题）。然而，标准多臂老虎机问题的每次输入是固定不变的。而上述问题的关键在于要适应动态变化的输入，同时这些输入内容本身取决于系统生成的答案。在大模型的选择上，研究团队为每一种大模型类型都分配了一个单独的概率模型，并采用了与上述 AB-MCTS 方法类似的汤普森采样方法。这些概率模型会根据每个大模型在搜索过程中的表现进行更新，以便让更有潜力的大模型拥有更多被选中的机会。

  

研究中，研究团队基于 ARC-AGI-2 基准测试，首次公布了 Multi-LLM AB-MCTS 系统的初步实验结果。抽象与推理语料库（ARC-AGI，Abstraction and Reasoning Corpus）旨在评估一种类人、灵活的智能，这种智能能够进行高效推理和解决全新问题。因此，ARC-AGI 与测试特定技能或测试知识的传统评估指标有着本质区别。虽然 ARC-AGI-1 一直是一个对人类而言简单、但对 AI 而言巨难的研究挑战，但研究团队在实验中使用了更具挑战性的 ARC-AGI-2，并在 ARC-AGI-2 公开评估集中的 120 个任务上进行了实验。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | ARC-AGI-2 中的一个示例问题（来源：Sakana AI）

  

实验中，他们将搜索迭代次数、即大模型调用次数的最大次数设置为 250 次，并指示模型以 Python 代码的形式生成转换规则。该搜索过程的引导机制基于这样一项关键奖励指标：即基于所生成的 Python 代码正确解决的示范案例数量。为了初步评估搜索算法的最大潜在性能，研究团队使用了 Pass@k 指标，该指标用于衡量在 k 次尝试内是否至少找到一个正确解。这与 ARC-AGI-2 的官方比赛标准有所不同，后者通常采用 Pass@2 标准，即提交两个最终答案其中一个正确。Pass@2 方法需要额外多做一步，即从搜索结果中选择有潜力的候选者。而在本次研究中，研究团队通过 Pass@k 重点评估了“搜索”功能本身。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | AB-MCTS 和 Multi-LLM AB-MCTS 在 ARC-AGI-2 上的结果，显示了 Pass@250 的成功率（来源：Sakana AI）

  

重复采样已被认为是一种非常有效的、解决 ARC-AGI 问题的方法。的确，当本次研究团队使用 o4-mini 进行重复采样后，23% 的问题得到了成功解决，这一结果远超单次尝试的得分，充分展示了重复采样的强大威力。然而，本次提出的 AB-MCTS 将得分进一步提高到 27.5%。特别是在大约 50 次大模型调用之后，这两种方法之间的差异变得更加明显。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | AB-MCTS 和 Multi-LLM AB-MCTS 在 ARC-AGI-2 上的结果，显示了 Pass@k 作为大模型调用次数的函数（来源：Sakana AI）

  

通过利用前沿模型作为集体智能与 Multi-LLM AB-MCTS 相结合，最终能为超过 30% 的问题找到正确的解决方案。有趣的是，研究团队发现虽然 DeepSeek-R1-0528 本身表现并不特别出色，但将其与 Multi-LLM AB-MCTS 结合使用后，能够有效增加可解问题的数量。

  

研究团队在 Multi-LLM AB-MCTS 中发现的一个关键特性是，它能够根据大模型对于特定问题的熟练程度，动态地分配这些模型。下图清晰地展示了这一行为：基于演示示例中成功率较高的案例，他们观察到了 Multi-LLM AB-MCTS 对于特定大模型的明显偏好。之所以产生这种偏见，是因为算法在搜索过程中能够识别出哪种大模型对于特定问题最有效，并在随后增加了使用该模型的频率。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | 在 Pass@250 条件下，使用 Multi-LLM AB-MCTS 解决 ARC-AGI-2 各项任务时所使用的大模型比例（来源：Sakana AI）

  

此外，研究团队还发现通过组合多个大模型，可以解决任何单个大模型都无法解决的问题。而这不仅仅是简单地为每个问题分配最好的大模型。在其中一个示例中，尽管 o4-mini 最初生成的解决方案是错误的，但 DeepSeek-R1-0528 和 Gemini-2.5-Pro 能够将其作为提示，并在下一步中得出正确的解决方案。这表明，Multi-LLMAB-MCTS 系统能够通过灵活地组合前沿模型，解决以往无法解决的问题，突破了将大模型作为集体智能使用时所能实现的极限。

  

如前所述，研究团队的主要关注点是评估搜索能力，因此采用了 Pass@k 指标。作为基准参考，当研究团队采用简单的基于规则的方法（即选择搜索后期生成的高奖励代码）来筛选两个最终答案时，Multi-LLMAB-MCTS 系统取得了 19.2% 的 Pass@2 成绩。虽然这一 Pass@2 结果已属优异，但相较 30% 的 Pass@k 指标仍存在超过 10 个百分点的差距。因此，研究团队认为可以通过开发更优的最终答案选择算法、构建更复杂的奖励模型来解决这一问题，或者通过引入大模型作为裁判以便进行更精细的奖励设计来解决这一问题。

  

总的来说，本次成果表明在推理时扩展方面依然存在尚未开发的空白之地。本次方法表明，通过反复执行这些模型的推理过程，并通过结合具有独特个性的多个大模型可以进一步提升推理性能，从而为推理时扩展指明了新的方向。未来，Sakana AI 将基于这项研究重点关注 AI 进化和集体智能，力争开创更加新颖的 AI 系统。

  

参考资料：

https://arxiv.org/abs/2503.04412

https://x.com/SakanaAILabs/status/1939854145856708910

https://github.com/SakanaAI/treequest

https://github.com/SakanaAI/ab-mcts-arc2

  

运营/排版：何晨龙

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

  

  

03/ [信噪比高达48dB，科学家研发可重构布里渊激光器，能为光学原子钟提供理想光源](https://mp.weixin.qq.com/s?__biz=MzA3NTIyODUzNA==&mid=2649775120&idx=1&sn=ee265432684cdb5bbcce756346895bc7&scene=21#wechat_redirect)

  

04/ [大模型反思是有效探索还是“形式主义”？科学家开发贝叶斯自适应强化学习框架，有望用于编程和智能体等](https://mp.weixin.qq.com/s?__biz=MzA3NTIyODUzNA==&mid=2649775113&idx=1&sn=1684519e4c35535bde5c7d2d7967faa9&scene=21#wechat_redirect) c

  

05/ [武大校友揭示DNA聚合酶和连接酶的协同反应机制，为DNA修复途径提供新见解](https://mp.weixin.qq.com/s?__biz=MzA3NTIyODUzNA==&mid=2649775083&idx=1&sn=fae3700cb758db457f8922a4690d6865&scene=21#wechat_redirect)

  

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

DeepTech深科技

向上滑动看下一个