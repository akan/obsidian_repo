---
title: "Meta ScaleRL：40 万 B200 GPU 小时，让 RL 拥有“可预测 Scaling Law”"
source: "https://mp.weixin.qq.com/s/U5mi1BOXWqFMJlYcK78Ymw"
author:
  - "[[AI闲谈]]"
published:
created: 2025-12-10
description: "之前已经介绍了一些了 RL 训练优化的文章，它们往往针对特定场景或特定算法进行优化，而缺乏一些系统性的研究。正好看到 Meta 的 ScaleRL，其对各种策略、技术进行了比较全面的消融实验，并提供了最佳实践，我们这里对其进行简单介绍。"
tags:
  - "强化学习"
  - "扩展定律"
  - "最佳实践"
  - "性能预测"
abstract: "Meta的ScaleRL研究通过大规模实验，为强化学习建立了可预测的性能与计算量之间的S型扩展定律，并提出了最佳实践方案。"
---
Original AI闲谈 *2025年10月22日 20:03*

**

## 一、背景

之前已经介绍了一些了 RL 训练优化的文章，它们往往针对特定场景或特定算法进行优化，而缺乏一些系统性的研究。正好看到 Meta 的 ScaleRL，其对各种策略、技术进行了比较全面的消融实验，并提供了最佳实践，我们这里对其进行简单介绍。

对应的论文： \[2510.13786\] The Art of Scaling Reinforcement Learning Compute for LLMs \[1\]

相关工作可以参考我们之前的文章：

- [阿里 RollPacker：缓解长尾 Rollout，实现快速同步 RL 后训练](https://mp.weixin.qq.com/s?__biz=Mzk0ODU3MjcxNA==&mid=2247490566&idx=1&sn=878dba43365cb3a250ae428ea540f120&scene=21#wechat_redirect)
- [阿里 Roll Flash：异步 RL，加速 RLVR 和 Agentic 训练](https://mp.weixin.qq.com/s?__biz=Mzk0ODU3MjcxNA==&mid=2247490620&idx=1&sn=87b92bdf590580efd2728c5da3087472&scene=21#wechat_redirect)
- [字节 Knapsack-RL：基于预算分配优化提升 RL 训练性能](https://mp.weixin.qq.com/s?__biz=Mzk0ODU3MjcxNA==&mid=2247490578&idx=1&sn=f7dc82f99048b6689967a8ee746deb33&scene=21#wechat_redirect)
- [小米 R3：基于 Router Replay 稳定 MoE 的 RL 训练稳定性](https://mp.weixin.qq.com/s?__biz=Mzk0ODU3MjcxNA==&mid=2247490647&idx=1&sn=8161a67bcaa2bb26508267de42619b85&scene=21#wechat_redirect)
- [SortedRL：通过在线长度感知调度加速 RL 训练](https://mp.weixin.qq.com/s?__biz=Mzk0ODU3MjcxNA==&mid=2247490597&idx=1&sn=775dc89783bd1df95c7654dfb7310877&scene=21#wechat_redirect)
- [APRIL：主动 Rollout 阶段，缓解长尾问题并加速 RL 训练](https://mp.weixin.qq.com/s?__biz=Mzk0ODU3MjcxNA==&mid=2247490546&idx=1&sn=0296e849a9d243e3d780ba2647639332&scene=21#wechat_redirect)
- [字节 RhythmRL：基于投机采样+长度预测的 RL 加速](https://mp.weixin.qq.com/s?__biz=Mzk0ODU3MjcxNA==&mid=2247490496&idx=1&sn=30c34a697d96fd58789e209d6035bde4&scene=21#wechat_redirect)
- [Long to Short Reasoning：7 篇长思维链压缩工作总结](https://mp.weixin.qq.com/s?__biz=Mzk0ODU3MjcxNA==&mid=2247489446&idx=1&sn=234beb8b49a90fc95f0c91019727f150&scene=21#wechat_redirect)

## 二、摘要

RL 已成为 LLM 的核心技术，但是该领域还缺乏与预训练相媲美的可预测 Scaling Law。为此，作者进行了大规模系统性研究（累积 40 万 B200 GPU 小时），建立了 RL 的 Scaling Law。通过拟合 RL 训练的 S 型计算-性能曲线，以及一系列消融实验，揭示了以下规律：

- 不同训练方案具有不同的 性能上限 。
- 损失聚合、优势归一化、Off-Policy 等算法主要影响 计算效率 ，不会显著改善 性能上限 。
- 稳定可扩展的方案遵循可预测的扩展轨迹，支持基于小规模实验的外推预测。

基于这些发现，作者提出最佳实践方案 ScaleRL ，并通过单次 RL 训练扩展到 10 万 GPU 小时的实验，成功实现验证下的精确预测。

## 三、关键发现与理论框架

通过 400,000 GPU 小时（NVIDIA GB200）的系统实验，总结出 RL 训练 性能 与 计算量 之间呈 Sigmoid 型关系 ，并提供如下的拟合公式，对应曲线如下图 Figure 3 所示，其中：

- A：RL 训练的 性能（效果）上限 （Asymptotic Reward）。
- B： 计算效率 （Scaling Exponent），反映性能随计算增长的加速程度。
- C mid ：达到一半性能所需的计算量。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

上述的预测与预训练场景有较大不同：

- 在 预训练 的 Scaling Law 中，模型参数量、数据量、算力（FLOPs）之间遵循近似幂律关系，也就是说，增加固定倍数的计算量，性能（效果/损失）会以固定比例改善。其呈现单调提升（或下降）的关系，并 没有明显饱和点 ，只是会逐渐变慢。
- 在 RL 的 Scaling Law 中，RL 的收益更像是饱和曲线： 初期增长慢 ， 中期快速提升 ， 后期趋于稳定 。当然， 在中低区间拟合出参数后 ， 可以预测更大规模 RL 的结果 。

## 四、三大经验准则（Scaling Principle）

### 4.1 RL 性能上限（A）并不普适

不同的算法、Loss、Batch Size 都会有各自的性能天花板。如下图所示为几个示例：

- a：不同的 Loss 函数，分别为 CISPO、GSPO 和 DAPO。DAPO 早期可能收敛更快，但是上限可能较低，而 CISPO 收敛更慢 ，但是 上限更高 。
- b：0-Variance 过滤，蓝色 batch 表示不过滤 0 梯度样本；橙色 effec\_batch 表示 \[2504.13914\] Seed1.5-Thinking: Advancing Superb Reasoning Models with Reinforcement Learning \[2\] Dynamic Sampling，而不是 DAPO（ \[2503.14476\] DAPO: An Open-Source LLM Reinforcement Learning System at Scale \[3\] ） 的 Dynamic Sampling。
- 标准 batch ：Batch Size 为包含 Response 全对或全错的情况。
	- Seed1.5-Thinking ：Batch Size 不包含 Response 全对或全错的情况，也就是 Batch Size 会小于 DataLoader 的设置。
	- DAPO ：去除 Response 全对或全错的情况后，继续 Rollout，直到 Batch Size 满足要求。
- c：不同的 Batch Size。Batch Size 为 2048 时，虽然前期收敛较慢，但是上限 A 更高。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 4.2 “苦涩的教训（the Bitter Lesson）”仍然适用

在有限计算资源下表现好的算法，在大规模计算场景中可能反而表现更差；因此 应基于早期 scaling 曲线的参数（A, B）预测长期表现 。如下图 Figure 2 所示，Magistral 在早期收敛比较快，优于 MiniMax，但是随着计算规模增加，MiniMax 的性能上限（A）更高。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 4.3 常见技巧主要影响效率（B）而不是性能上限（A）

普遍任务能提升峰值性能（A）的手段（比如 loss aggregation, data curriculum, length penalty, advantage normalization ） 主要影响计算效率（B） ，而 不会显著改善性能上限（A） 。如下图 Figure 14 所示：

- a（Loss Aggregation）：如下图 Figure 14a 所示， Prompt Avg 和 Token Avg 性能上限差不多，略优于 Sample Avg 。本文的 ScaleRL 选择了性能最优的 Prompt Avg 。
- Prompt Avg ：每个 Prompt 等权重贡献。不管每个 Prompt 生成多少 Response，从 Prompt 维度是等权重的。
	- Sample Avg ：每个轨迹（Prompt 生成 Response）等权重贡献。
	- Token Avg ：直接对 Batch 中所有 Token 损失求平均值，无需中间分组。
- b（Advantage Normalization）：如下图 Figure 14b 所示，no-norm、batch-lvl-norm、prompt-lvl-norm 的性能上限差距不大。本文的 ScaleRL 选择了性能最优的 Batch-level normalization 。
- non-norm ：不做归一化。参考 Dr.GRPO，直接以 Prompt 生成结果的 Reward 均值对原始 Reward 进行中心化处理，不进行方差缩放。
	- batch-lvl-norm ：参考 \[2501.03262\] REINFORCE++: An Efficient RLHF Algorithm with Robustness to Both Prompt and Reward Models \[4\] 等，通过 Batch 内所有生成结果的标准差进行归一化。
	- prompt-lvl-norm ：参考 GRPO，根据同一 Prompt 生成结果中 Reward 的标准差进行 Advantage 归一化。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 五、ScaleRL 最佳实践组合

### 5.1 异步训练策略

异步 Off-Policy 对 RL 训练的效率和稳定性至关重要，并且通常与其他设计决策正交，因此作者首先对其影响进行了评估。主要评估了：

- PPO-Off-Policy-k ：在 Qwen3 和 ProRL 采用，旧 Policy π θold 为 B 个 Prompt 生成 Response 轨迹，然后将其分成 k 个 mini-batch，每次使用一个 mini-batch 进行 Training（Policy 更新）。作者实验中，mini-batch 为 48，k 为 \[1, 8\] 区间。
- PipelineRL-k ：来自 PipelineRL \[7\] ，并被 Magistral 采用。其中，Rollout Engine 以流式持续生成 Response 轨迹。每当 Training 完成 Policy 更新，立即更新 Rollout Engine。但是 Rollout Engine 中已生成的 Response 会保留并且继续使用其对应的 KV Cache ，但是当 Rollout Engine 落后 Training Policy k 个 Step 后，会进入阻塞状态。也就是 Rollout Engine 使用的 Policy 模型最多落后 k 个 Step ， 并且 Response 的生成可能来自多个 Policy 版本 。

如下图 Figure 4a 所示，PipelineRL 与 PPO-off-policy 都 达到相近的性能上限 （A），但是 PipelineRL 显著提升了计算效率 （B）。主要是因为 PipelineRL 显著减少了训练中的 Bubble。如下图 Figure 4b 所示，作者同时测试了 PipelineRL-k 中 k 的选择，可以看出，k=8 时最优。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 5.2 Loss 类型

如上述 4.1 所示，MiniMax 的 CISPO（ \[2506.13585\] MiniMax-M1: Scaling Test-Time Compute Efficiently with Lightning Attention \[5\] ）能提升稳定性和长期性能。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如下图 Figure 19 所示，GRPO/DAPO 类损失对 clip 比例超参 દ max 很敏感，相比之下，GSPO 和 CISPO 展现出更强的鲁棒性，只要确定正确的数量级，模型性能便能保持稳定。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 5.3 精度修复

Rollout 和 Training 通常使用不同的框架（计算 Kernel）等，导致两者的 Token 概率上会产生微小数值偏差。RL 训练对此类差异异常敏感。MiniMax 等工作发现这些偏差在 LLM head 尤为显著，通过在 Rollout 和 Training 的 LM\_head 保持 FP32 精度可以有效缓解该问题。如下图所示，精度修正方案将性能上限（A）从 0.52 显著提升到 0.61。因此，作者在 ScaleRL 中会采用此方案 将 LM\_head 精度设置为 FP32 。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 5.4 Loss 聚合方式（loss aggregation）

在 4.3 小节已经讨论，这里不再赘述， ScaleRL 会选择 性能最优的 Prompt Avg 。

### 5.5 Advantage 归一化（Advantage Normalization）

在 4.3 小节已经讨论，这里不再赘述， ScaleRL 会选择 性能最优的Batch-level Normalization 。

### 5.6 Zero-Variance 过滤

在 4.1 小节已经讨论，这里不再赘述， ScaleRL 会选择 性能最优的 Seed1.5-Thinking 的过滤方案 。

### 5.7 数据策略

为了提高 RL 训练中样本效率，很多工作探索了数据策略来优化。比如 GitHub - ChenxinAn-fdu/POLARIS: Scaling RL on advanced reasoning models \[6\] 中发现： 当某个 Prompt 对 Policy 来说变得过于简单后 ， 通常后续会持续保持这种简单状态。 由于这类 Prompt 会消耗计算资源而无法提供有效的梯度信号，将其 从后续训练之中排除 更加合理。作者实现一个简单变体方案： No-Positive-Resampling —— 维护一个历史通过率记录，将通过率 >= 0.9 的 Prompt 永久移出后续训练周期。

如下图所示，No-Positive-Resampling 提供了更高的性能上限（A）：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 5.8 长度控制

#### 5.8.1 长度截断

作者在系列实验中同样发现， 训练不稳定性与长度截断（Interruption）相关 ，随着生成文本长度的增加，多数 RL 过程呈现波动的截断率，且该比例在训练过程中有时还会持续上升。

- 作者的实验中，Batch Size 为 768 时，观察到 10%-15% 的截断率就会破坏训练稳定性 ，导致性能下降且需要人工干预才能恢复。
- ScaleRL 训练更加稳定，在 8B 模型训练中，超过 90% 的训练时段截断率保持在 5% 以下。当 Batch Size 增加至 2048 时，截断率略有提升，偶尔接近 7%。但由于 排除截断样本后的有效 Batch 规模仍然较大 ，训练稳定性依然能够保持。
- 增大长度预算有助于降低截断率，在 34K 生成长度预算下（Batch Size 768）—— 截断率短暂攀升到 4% 后迅速回落到 2% 以下。
- 更大规模模型展现出更强的鲁棒性。在 Scout 模型训练中，截断率始终低于 2%，且超过 90% 训练步骤中保持在 1% 以下。

总体而言，作者建议 密切监控截断率 。研究结果表明， 高截断率是系统不稳定的可靠预警信号 。

#### 5.8.2 长度控制

在 RL 训练中，对于生成长度爆炸的问题，除了 截断 （Interruption，在 GLM-4.1V、Qwen3 中使用）的方案，也有工作采用 长度惩罚 （Length Penalties，在 DAPO、Kimi、Magistral、Minimax-M1 等采用）的方案，如下图公式所示，通过对过长的生成结果施加惩罚来控制生成长度：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在作者的 ScaleRL 实验中， 将截断替换为长度惩罚并未提升性能 。

## 六、ScaleRL 实验

作者将上述的最优策略进行整合，并组合为本文的方案 ScaleRL ，具体来说其包括：

- PipelineRL-8 ，8-Step 的 Off-Policy 训练。
- 基于 截断 的生成长度控制。
- FP32 精度 计算 Logits（LM\_head）。
- CISPO 损失函数。
- Prompt 级别损失聚合 （Prompt Avg Loss Aggregation）。
- Batch 级别优势函数归一化 （Advantage Normalization）。
- Zero-Variance 过滤 。
- No-Positive Resampling 。

公式如下所示，其中 sg 是 stop-gradient 操作，A std 表示一个 Batch 中所有优势函数的标准差，pass\_rate(x) 表示该 Prompt 的历史通过率。对于强制截断的情况，使用 end-of-thinking 短语：“Okay, time is up. Let me stop thinking and formulate a final answer now. </think>”。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

为了验证这些策略在组合后能保持最优性，作者进行了 LOO 实验（Leave-One-Out）： 将 ScaleRL 作为 Baseline，每次将某个维度还原为基线方案 。比如， LOO-length-penalty 表示将 截断 换成 长度惩罚 。如下图 Figure 7 所示，每个实验均按照 16,000 GPU 小时进行标准化。在所有维度上，ScaleRL 始终保持最优配置的能效。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 七、相关链接

1. https://arxiv.org/abs/2510.13786
2. https://arxiv.org/abs/2504.13914
3. https://arxiv.org/abs/2503.14476
4. https://arxiv.org/abs/2501.03262
5. https://arxiv.org/abs/2506.13585
6. https://github.com/ChenxinAn-fdu/POLARIS
7. https://huggingface.co/blog/ServiceNow/pipelinerl
**

继续滑动看下一个

AI闲谈

向上滑动看下一个