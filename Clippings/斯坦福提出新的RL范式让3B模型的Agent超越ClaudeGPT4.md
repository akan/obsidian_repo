---
title: "斯坦福提出新的RL范式，让3B模型的Agent超越Claude、GPT-4"
source: "https://mp.weixin.qq.com/s/PTx0mQ_qNOV3dh_uWwK0cQ"
author:
  - "[[编辑部]]"
published:
created: 2025-09-08
description:
tags:
  - "强化学习"
  - "机器学习工程"
  - "小模型逆袭"
abstract: "斯坦福大学通过新的强化学习范式，使3B参数的小模型在机器学习工程任务上性能超越Claude和GPT-4等大模型。"
---
Original 编辑部 *2025年09月08日 17:37*

近年来，大型语言模型（LM）代理通过调用外部工具（如代码执行器），已经能够完成从编写软件到进行科学研究的复杂任务。一个终极愿景是，让这些AI代理能够通过完成机器学习工程（MLE）任务，甚至迭代地创造出更好的AI模型本身。

然而，现有的MLE代理大多依赖于一个简单策略： **提示（Prompting）** 强大的、现成的大模型（如Claude、GPT）。这种方式存在一个根本性缺陷—— **代理本身不会学习** 。无论积累了多少成功或失败的经验，它的核心行为模式（即模型参数）是静态的。就像给一个天才学生不断出题，但他从不复习错题本，成绩提升全靠刷题量和题目提示的巧妙程度，自身能力并无增长。如图1所示，即使让最好的提示框架运行数天，其性能提升也微乎其微。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bajJLVicH4E8kwrZTiasKzgI626Y5TgyCyC581iauSYdcIrvJL47tFMqpKvUsdC9Um7cHSjfLAVe1Iuxw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

- 论文：Reinforcement Learning for Machine Learning Engineering Agents
- 链接：https://arxiv.org/pdf/2509.01684

一个很自然的想法是：为什么不让我们的小代理像学生一样 **学习** 呢？即利用积累的经验，通过 **强化学习（Reinforcement Learning, RL）** 来更新其模型参数，从而真正地改进其能力。这篇论文正是基于这一思路，并取得了惊人发现： **一个经过RL训练的小模型（Qwen2.5-3B），其最终性能可以显著超越仅被提示的、参数量大得多的顶级大模型（如Claude-3.5-Sonnet）** ，在12个Kaggle任务上平均领先22%。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bajJLVicH4E8kwrZTiasKzgI62dxckzVzLKOibDY19KODkRFSb1dKEeMCJk2hPb7cgXPZOSOLjUNHibBJQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

但这条路并非一帆风顺。本文将带你深入探讨研究者如何破解RL在代理环境中面临的两大独特挑战，并最终实现“小模型逆袭大模型”的精彩故事。

## 问题与方法

#### 挑战一：可变时长动作导致的优化偏差

### 1\. 问题分析：快就是好？

在标准的分布式RL训练中，多个“演员”（actor）并行地与环境交互，收集经验，然后发送给一个“学习者”（learner）进行梯度更新。这在模拟环境中（如游戏）很有效，因为每个动作（如移动一步）耗时基本相同。

但在MLE任务中， **每个“动作”是一段代码，其执行时间天差地别** 。例如，训练一个逻辑回归模型可能只需1秒，而训练一个深度神经网络或进行复杂的特征工程可能需要几分钟甚至几小时。在分布式设置中，执行快的动作会更快地返回经验，从而更频繁地被用于梯度更新。执行慢的高质量动作，不仅采样次数少，甚至可能因超时而被丢弃。这导致RL优化过程产生了严重的偏差： **它倾向于奖励“快”的动作，而非“好”的动作** 。如图2所示，未经处理的RL训练会迅速让代理收敛到执行飞快但性能差的解决方案（如简单的线性模型）。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 2\. 方法：持续时间感知的梯度更新

**（1）数学建模与核心思想**  
研究者首先用一个简化的例子清晰地揭示了问题根源。假设有两个动作 (x) 和 (y)，其执行时间分别为 和 ，它们的优势函数（衡量动作好坏）估计值分别为 和 。在固定时间 (T) 内，动作 被采样的次数 与其被选择的概率 成正比，与其执行时间 成反比：

那么，动作 对总梯度的贡献 为：

注意到梯度贡献 被除以了 。这意味着， **执行时间越短的动作，其对梯度更新的影响被放得越大** ！这是导致快动作占优的根本原因。

**（2）解决方案与公式**  
为了解决这个问题，作者提出了一个直观而有效的解决方案： **在计算梯度时，用动作的执行时间进行加权** 。这样，上面的梯度贡献就变成了：

看， 从分母移到了分子，与分子上的 中所隐含的 恰好抵消了！这样，每个动作对梯度的贡献就只取决于它本身被策略选中的概率 () 和它的优势值 ()，而与其执行速度彻底脱钩。

将这一思想推广到通用的策略梯度公式中，就得到了论文提出的 **持续时间感知的策略梯度更新规则** ：

- : 目标函数 关于策略参数 的梯度。
- : 在状态 下执行动作 所花费的时间。
- : 评分函数（score function），表示策略对当前动作的偏好程度。
- : 优势函数，衡量动作 相对于平均水平的优越程度。

**用动作的执行时间来缩放其梯度更新量。** 执行时间长的动作，即使它被采样的频率低，每次更新也会产生更大的影响，从而在优化过程中获得公平的对待。在实践中，作者还会对 进行批内平均时间归一化，避免单个极长动作导致梯度爆炸。

#### 挑战二：稀疏奖励信号

### 1\. 问题分析：成败论英雄的局限

MLE任务的天然奖励是模型在测试集上的性能指标（如准确率、AUC）。但这是一种非常 **稀疏（Sparse）** 的奖励。代码必须从数据加载、预处理、模型构建、训练到最终推理提交，每一步都完全正确，才能获得一个正奖励。任何一步出错，奖励都是零或负值。

这就像考试只有“满分”和“零分”两种成绩。一个学生因为写错文件名而交卷失败，和另一个学生所有步骤都对但最后答案抄错了一位，获得的反馈都是“零分”。这种反馈无法区分“完全失败”和“接近成功”，使得学习过程异常困难。代理很容易被困在局部最优解中，例如，完全放弃复杂的机器学习步骤，转而用一些取巧的、能快速拿到基础分的方法。如图3所示，在一个情感分析任务中，代理最终收敛的方案是直接编码评估指标（Jaccard相似度）并在测试输入中搜索最佳短语，完全绕过了机器学习。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 2\. 方法：环境仪器化提供部分信用

为了解决稀疏奖励问题，作者提出了一个巧妙的“ **环境仪器化** ”方案，为中间步骤提供 **部分信用（Partial Credit）** 。

**（1）核心思想：**  
在代码执行过程中插入“检查点”（print语句）。代理完成的步骤越多，它能打印出的检查点就越多，获得的部分奖励也就越高。这样，一个在数据加载阶段失败的方案，获得的奖励会远低于一个在模型训练完成后才失败的方案。

**（2）方法流程：**

1. **插入打印语句：** 使用一个 **独立的、静态的** （不参与RL训练）Qwen2.5-3B模型，来自动化地在代理生成的代码中插入预先定义好的打印语句（例如： `print("imported packages")`, `print("loaded data")`, `print("training loss: {loss}")` 等）。这个“仪器化LM”的提示词被设计为只添加打印语句，不修改原有代码逻辑。
2. **执行与匹配：** 执行被仪器化后的代码，捕获终端输出。
3. **解析与赋分：** 使用正则表达式（regex）匹配终端输出中的打印语句。完全失败的方案得-10分。每匹配到一个预定义的打印语句，就增加0.1分。如果能成功运行到最后并产生提交，则使用测试集上的真实性能得分（通常介于-1到1之间）作为奖励。
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**（3）关键设计：**  
必须使用一个独立的LM来进行仪器化。如果让正在学习的代理自己来插桩，它可能会学会“作弊”——生成大量打印语句来骗取部分奖励，而不去真正执行有价值的操作。

### 附加策略：自我改进提示（Multi-Step RL with Self-Improvement Prompt）

除了让代理直接从零开始解决问题，作者还进一步探索了让 **代理自我改进** 的能力。在训练过程中，以50%的概率给代理提供一个“自我改进”的提示，要求它基于之前某个解决方案的执行结果（包括终端输出和部分奖励）来修订和改进该方案。

这相当于给了代理一个“错题本”，让它学会分析失败原因并做出改进。虽然作者发现小模型的自我调试能力有限，但这种“从零生成”与“改进旧方案”相结合的方式，最终在12个任务中的10个上都带来了进一步的性能提升（平均提升8%）。

## 实验设置与评估

为了验证上述方法的有效性，作者在 **MLEBench** 基准上进行了全面的实验。MLEBench包含75个Kaggle挑战任务，涵盖图像、文本、表格数据上的分类和回归问题。

- **模型：** 主要使用 **Qwen2.5-3B-Instruct** 作为可训练的RL智能体。对比的基线是诸如 **Claude-3.5-Sonnet** 、 **GPT-4o** 和 **Llama3.1-405B** 这样的“庞然大物”。
- **基线方法：**
- **前沿模型+代理框架：** 使用AIDE、OpenHands、MLAgentBench等先进的代理框架来提示（Prompt）大模型。
	- **纯RL基线：** 使用标准的分布式RL框架（如HybridFlow）而不加本文的改进。
- **评估指标：** 使用MLEBench的评测器对最终提交的文件进行评分。报告多次运行的平均分和最佳分。
- **训练配置：** 使用PPO算法，在8块A100 GPU上对每个任务训练1-3天直至收敛。超参数详情见附录表3。

## 结果与分析

#### 主实验结果：RL小模型 vs. 提示大模型

![表1](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

表1

![表2](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

表2

表1 和 表2 展示了最核心的结果，令人印象深刻。

**表1** 将RL训练后的Qwen2.5-3B与使用AIDE框架提示的各大前沿模型进行对比。结果显示：

- **在12个任务中的8个上，3B的RL小模型取得了最佳性能。**
- 平均而言，它的性能比强大的Claude-3.5-Sonnet高出 **22%** ，比GPT-4o（100小时运行）高出 **24%** 。
- 即使在它未能击败大模型的任务上，RL训练也显著超越了直接用AIDE提示Qwen2.5-3B本身的效果。

**表2** 对比了不同的代理框架。即使是用最强大的GPT-4o模型，搭配不同的代理框架（AIDE, OpenHands, MLAB），其性能也在不同任务上波动，且整体上仍然不敌经过RL训练的Qwen2.5-3B模型。这表明， **RL提供了一种不依赖于特定提示框架的、更通用的性能提升途径** 。

![图7](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图7

图7动态地展示了性能随时间的变化趋势。对于许多任务，提示大模型在开始时遥遥领先，但随着时间的推移，RL小模型通过持续学习，性能稳步提升并最终实现反超。这生动地体现了“学习”相对于“一次性推理”的长期优势。

#### 消融研究（Ablation Studies）

消融实验有力地证明了每个创新组件的必要性。

**1\. 持续时间感知梯度的效果**  
没有持续时间感知加权时，代理生成的方案其平均执行时间会迅速下降并维持在很低水平（快但差的方案）。而采用了该方法后，代理能够探索并最终采用执行时间更长、但性能更好的方案（如梯度提升模型）。这表明该方法成功克服了优化偏差，鼓励代理追求高质量解。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**2\. 环境仪器化的效果**  
没有部分信用时，训练初期的平均得分极低（因为大量方案得-10分），且收敛速度慢，方差大（其中一个运行甚至未能产生任何有效解）。而有了环境仪器化提供的部分奖励，平均得分从训练开始就更高，且上升和收敛的速度更快、更稳定。这证明了部分信用对于缓解稀疏奖励、引导智能体学习至关重要。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**3\. 自我改进提示的效果**  
在12个任务中的10个上，加入“改进先前方案”的提示带来了进一步的性能提升，平均提升达8%。这表明RL不仅提升了代理“从零开始”的能力，也提升了其“迭代优化”的能力。

#### 定性分析

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

上图展示了一些由代理发现的高性能解决方案。例如，在lmsys-chatbot-arena任务中，代理学会了进行复杂的特征工程，使用响应长度差、词数差、平均词长差等作为预测用户偏好的特征。在random-acts-of-pizza任务中，代理最终找到了结合TF-IDF文本特征和用户元特征，并使用随机森林+网格搜索的高成本、高回报方案。这些例子直观地展示了RL智能体是如何通过学习变得越来越“聪明”的。

## 讨论与相关 work

本文的工作与多个领域密切相关。

- **ML工程代理：** 本文没有像大多数现有工作那样专注于设计更复杂的提示框架或推理时启发式搜索，而是另辟蹊径，通过梯度更新让小型模型实现自我进化。
- **LM的RL：** 以往的研究（如RLHF）大多在奖励模型或数学/代码验证器提供瞬时奖励的环境中进行，忽略了动作执行时间的可变性。本文首次在实用智能体系统中明确提出并解决了这一问题。
- **智能体系统的RL：** 先前关于交互式任务（如网页导航、终端操作）的RL研究，主要关注回合制交互，时间开销差异不大。本文关注的则是每个“回合”内部耗时差异巨大的场景，并提供了新的解决方案。

**局限性：** 目前的工作是针对每个任务单独训练一个代理。未来的方向包括训练一个通用代理解决多任务、研究其泛化能力，以及探索更复杂的多步分解规划。

**社会影响：** AI代理自动化ML工程流程可能影响相关就业市场，需政策研究。让代理在互联网上自由执行代码也存在安全风险，亟需更强的沙盒和安全技术。

## 结论

本文有力地论证了一个核心观点： **对于机器学习工程这类任务，一个能够持续学习的小模型，可以超越一个仅被提示的、静态的巨模型。**

其核心贡献在于：

1. **识别并形式化** 了RL在实用智能体系统中面临的两个关键挑战：可变时长动作导致的优化偏差和稀疏奖励。
2. 提出了两项创新性解决方案： **持续时间感知的梯度更新** ，确保了不同耗时动作的公平优化； **环境仪器化** ，通过提供部分信用有效缓解了稀疏奖励问题。
3. 通过 **大量实验** 证实，一套基于3B小模型的RL系统，能够在一系列复杂的Kaggle挑战中，稳定地超越由顶级大模型驱动的先进代理框架。

这项工作为未来AI代理的发展指明了重要方向： **平衡计算资源在推理、交互（动作执行）和学习（梯度更新）之间的分配** ，尤其是在那些交互开销不可忽视的任务中。它告诉我们，让AI“学会学习”，或许比一味地追求更大的模型规模更加重要。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

深度学习自然语言处理

向上滑动看下一个