---
title: "不用一个字，MIT团队让细胞自动机教会了大模型推理"
source: "https://mp.weixin.qq.com/s/jvEyaXaVNOnd5sP2O1qq-Q"
author:
  - "[[加洋]]"
published:
created: 2026-03-23
description: "他们的最终愿景是完全用干净的合成数据做预训练，只在最后阶段用少量经过精心筛选的自然语言来获取语义。"
tags:
  - "预预训练"
  - "神经细胞自动机"
  - "规则推断"
  - "注意力迁移"
  - "计算结构"
abstract: "MIT研究团队通过使用无文字的神经细胞自动机生成的数据对大型语言模型进行预训练，发现这种非语义的规则推断训练能有效提升模型在后续自然语言任务中的表现和收敛速度。"
---
加洋 *2026年3月23日 18:10*

![Image](https://mmbiz.qpic.cn/mmbiz_png/JJtKEey0hPaCA6rqsAATfyLrafUerWUEQIhEouyfdwsWWy3mE5D5ibOWOCccgbQAPSAoRtKZN9IEfXPuyQ5SzYw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

1970 年，数学家约翰·康威发明了“生命游戏”（Game of Life）。在一块无限延伸的棋盘上，每个方格非生即死，遵循几条极其简单的规则：活细胞如果邻居太少就会孤独而死，太多则因拥挤而亡；死细胞恰好有三个活邻居就会复活。

  

没有人下棋，没有人操控，但这些简单规则跑起来之后，屏幕上会涌现出滑翔机、脉冲枪、甚至可以模拟图灵机的复杂结构。半个多世纪以来，这个实验一直被视为复杂性科学的经典演示，展示简单规则如何生成无穷复杂的行为。

  

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/LKiae5wcu5y96HTrxLpRWQJW5jLX3od9Q5h1W8gAnTwScNrvXtiaF7AdJgAIJZHE6CtfxrpH23XB9vria4lfTKLXsvmDK9V8g9NEledrT9L5qw/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

图丨康威的“生命游戏”（来源：WikiPedia）

  

没人想过这些东西能教 AI 说话。直到现在。

  

MIT Improbable AI 实验室 Pulkit Agrawal 团队在今年 3 月发表了一篇论文，提出了一个听起来相当不合常理的想法：用类似“生命游戏”的细胞自动机生成的数据，去预训练大型语言模型。这些数据不包含任何文字、任何语义，只是一个 12×12 网格上像素不断演化的轨迹。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/LKiae5wcu5yibqsJTLVjZNtVOPyY6GBCuwW1DxsDiavhIotOkG3mq3viaL3YMcly0BDYDdvBwJn2vtFdF3Zo0PHHB8OrAeibWO51a6k4EVk7uS8w/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

图丨Pulkit Agrawal（来源：MIT CSAIL）

  

但实验结果显示，在这些纯粹的“动态图案”上训练过的模型，在随后的自然语言学习中表现得更好，困惑度（perplexity）降低了最多 6%，收敛速度加快了最多 1.6 倍。更让人意外的是，仅用 1.64 亿个细胞自动机 token 做预训练，效果竟然超过了用 16 亿个真实英语文本（来自 Common Crawl 数据集 C4）做同样的预训练。

  

这项工作的核心思路可以用一句话概括：语言模型真正需要学习的，可能不是语言本身，而是语言背后的计算结构。

  

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/LKiae5wcu5y9iavm5NwM1gucrACcXUvOsQHUtE9Ys84b3MaLibQk6ia5mWZSXFZ2NGs3Y4M1gCLcM7AcX5R596mRBiaK3mcibZ2syZM7Vt4YVDaK8/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

图丨NCA 预预训练到语言预训练的概览（来源：arXiv）

  

研究团队使用的是“神经细胞自动机”（Neural Cellular Automata, NCA），这是经典细胞自动机的一种推广。传统的细胞自动机（比如康威的生命游戏）使用固定的规则，而 NCA 把规则替换成了一个小型神经网络，具体来说是一个 3×3 卷积加上一层 MLP。

  

每次生成训练数据时，研究者随机初始化这个网络的权重，等于随机抽取一条全新的动力学规则，然后让它在网格上跑出一段时空演化轨迹。这些轨迹被切割成 2×2 的图像块，映射为 token 序列，再用标准的下一个 token 预测任务来训练 transformer。

  

换句话说，模型拿到的每一条序列，都来自一个它从未见过的规则。要预测下一个 token，它必须在上下文中推断出这条隐藏规则，然后应用它。这和语言模型在真实文本上做的事情存在某种深层对应。

  

斯坦福大学马腾宇与 Percy Liang 团队在 2022 年的工作中就曾论证，下一个 token 预测本质上是一种隐式的贝叶斯推断：模型从已有的文本中推断出潜在的“生成概念”，再据此预测接下来会出现什么。NCA 训练把这个过程提纯了。自然语言中混杂着语义快捷方式和共现先验，模型可以“投机取巧”；而 NCA 数据中没有任何语义可以依赖，每一个 token 都在迫使模型做纯粹的规则推断。

  

这套方法被称为“pre-pre-training”，即在正式的语言预训练之前，先用合成数据做一轮“预预训练”。

  

训练流程分三步走：先在 NCA 数据上训练 transformer 的非嵌入层权重，再在自然语言语料（网页文本、代码或数学文本）上做标准预训练，最后是针对具体任务的微调。研究者测试了三个下游语料库，分别是 OpenWebText（网页文本，约 90 亿 token）、OpenWebMath（数学文本，约 40 亿 token）和 CodeParrot（代码，约 130 亿 token），在所有三个领域上都观察到了持续的改善。

  

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图丨NCA 预预训练在多个领域改进并加速了语言模型预训练（来源：arXiv）

  

在推理基准测试上，收益同样可见。GSM8K 数学推理测试中，NCA 预训练将 pass@1 从 3.8% 提升到 4.4%；HumanEval 代码生成测试中，pass@1 从 6.8% 提升到 7.5%；BigBench-Lite 综合推理测试中，pass@4 从 25.9% 跃升至 36.5%。

  

绝对数字不算大，这些毕竟是 16 亿参数的模型，而非千亿级的商用系统，但对照实验的一致性指向了一个清晰的信号：从非语言数据中习得的某些东西，确实在帮助模型处理语言任务。

  

那么，到底是什么被转移了？研究者做了一个拆解实验：在 NCA 预训练完成后，选择性地重新初始化模型的不同组件（注意力层、MLP 层、LayerNorm 层），然后观察下游表现的变化。结果非常明确：重新初始化注意力权重造成的性能损失最大，远超其他组件。这意味着注意力层承载了最多的可迁移结构。

  

MLP 层的效果则因领域而异：在 OpenWebText 上，保留 NCA 阶段的 MLP 权重反而会干扰语言学习；但在 CodeParrot 上，影响可以忽略不计。

  

这一发现和最近 Jelassi 等人（2025 年）对混合专家（MoE）架构的分析形成了一定程度的呼应，那项工作表明扩大 MLP 参数主要增强的是记忆能力而非推理能力。两相对照，一幅功能分工的图景浮现出来：注意力层负责学习通用的依赖追踪和上下文推断机制，MLP 层则倾向于存储特定领域的模式和统计规律。正因如此，注意力层从 NCA 到语言的迁移是“万金油”式的，而 MLP 的迁移效果取决于源域和目标域之间的匹配程度。

  

研究中另一个值得关注的发现有关于复杂性匹配。团队使用 gzip 压缩率作为 NCA 轨迹复杂性的度量，压缩率低意味着数据更有规律、更可预测，压缩率高则意味着更丰富的时空结构。他们把 NCA 数据按压缩率分成几个区间（20-30%、30-40%、40-50%、50% 以上），分别测试各区间对不同下游领域的迁移效果。

  

结果表明，网页文本和数学文本从高复杂度 NCA（50%+ 压缩率）中受益最大，而代码领域的最优区间在中等复杂度（30-40%）。有意思的是，这恰好与目标语料自身的复杂度特征对齐，OpenWebText 和 OpenWebMath 的 gzip 压缩率在 60-70%，CodeParrot 则只有 32%。

  

这意味着，合成数据不是“越多越好”或“越复杂越好”，而是需要与目标领域的计算特征相匹配。研究者称之为“domain-targeted data design”，一种自然语言训练中不存在的调控杠杆。你无法轻易改变英语的统计特性，但你可以调整 NCA 的规则空间、字母表大小、复杂度分布，让它精确匹配你想要训练的能力。

  

这项工作的理论背景可以追溯到几条学术脉络。一条是 MIT 同校 Phillip Isola 团队在 2024 年提出的“柏拉图表征假说”（Platonic Representation Hypothesis），核心观点是不同模态、不同架构的 AI 模型，随着规模增大，内部表征正在趋同，仿佛都在逼近对现实世界的某种共同的统计模型。如果这个假说成立，那么从非语言数据中能学到与语言相通的表征，就不那么令人惊讶了。  

  

  

关于“为什么 1.6 亿 token 的自动机数据能胜过 16 亿 token 的英语”，研究者给出的解释是：在远低于计算最优规模的 token 预算下（Chinchilla 定律建议 16 亿参数模型需要约 320 亿 token），自然语言训练主要在学习浅层的局部模式，比如词汇搭配、句法片段这些“表面功夫”。  

  

而 NCA 数据由于每条序列都对应一个独特的动力学规则，多样性极高，冗余性极低，每个 token 都在训练模型做深层的规则推断。加之 Abbas 等人（2023 年）的研究已经表明大规模自然语言数据集内部存在大量语义冗余，NCA 在 token 效率上的优势就变得可以理解了。

  

不过，目前这个实验的规模还限于 16 亿参数，距离工业级的千亿参数模型还有数量级的差距。NCA 预训练的增益随模型规模增大而递减，400M 模型改善了 8.6%，1.6B 模型改善了 5.7%，这个趋势在更大规模上是否会完全消失，目前还不清楚。

  

此外，对于较大字母表（n=10, 15）的 NCA，收益在一定 token 预算后出现饱和甚至下降，说明简单地“生成更多 NCA 数据”并不是万能解法。如何从理论上指导合成数据的生成，使其精确匹配目标领域的计算特征，仍然是一个开放的研究问题。

  

但研究者们的期望不止于此。论文的结尾写道，他们的最终愿景是完全用干净的合成数据做预训练，只在最后阶段用少量经过精心筛选的自然语言来获取语义。当前的“预预训练”框架是这个范式的早期原型。

  

参考资料：

1.https://arxiv.org/pdf/2603.10055

  

运营/排版：何晨龙

继续滑动看下一个

DeepTech深科技

向上滑动看下一个