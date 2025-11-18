---
title: "OpenAI前CTO Mira Murati团队又放大招，让大模型训练成本暴降10倍"
source: "https://mp.weixin.qq.com/s/KViRRWh8tdrMZ745qRJfOw"
author:
  - "[[小鹿]]"
published:
created: 2025-10-28
description:
tags:
  - "同策略蒸馏"
  - "训练成本降低"
  - "强化学习替代"
  - "模型后训练"
  - "密集奖励信号"
abstract: "Thinking Machines Lab提出同策略蒸馏方法，能以传统强化学习十分之一的成本实现同等的大模型后训练效果。"
---
Original 小鹿 *2025年10月28日 16:37*

![Image](https://mmbiz.qpic.cn/mmbiz_png/5fknb41ib9qFvg4fyCWGQAk3ghal7yXbFpVGFv5cnKuMiafWCPUckaT02zuibHBarnWeYtbOzNxTxz9XbqMRKt2CA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

OpenAI 前 CTO Mira Murati 的创业公司又有大动作。

继 10 月初发布首款产品 Tinker 之后，Thinking Machines Lab（TML）今天公布了又一项重磅研究成果——

**同策略蒸馏（On-Policy Distillation）**

一种能以 **1/10 成本** 达到强化学习同等效果的大模型后训练新方法。

![Image](https://mmbiz.qpic.cn/mmbiz_png/5fknb41ib9qFvg4fyCWGQAk3ghal7yXbFVhStAol4DeP4hY0JXUmGcD9FUIx5PicvUAvhujyncxEvw7sWQkWObxA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

> 博客地址：  
> https://thinkingmachines.ai/blog/on-policy-distillation/

这篇博客的主要作者是前 OpenAI 研究员 Kevin Lu，与 Thinking Machines 团队合作完成，他曾领导 GPT-4o mini 发布，并参与了 o1-mini、o3、GPT-5 等多个重要模型的研发。他的出手，分量十足。

![Image](https://mmbiz.qpic.cn/mmbiz_png/5fknb41ib9qFvg4fyCWGQAk3ghal7yXbFT4BqJo06JicHGn8NKW4PVNUTsIZ1pMLkoM4FOhz3cDXQVJP2bKgOQuQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

从 2 月成立至今，这家估值 120 亿美元的 AI 新锐已经发布了首款产品 Tinker（模型微调 API），启动了研究博客 Connectionism，并陆续公开了多篇技术博客。

这次的同策略蒸馏研究，是 TML 在开放科研承诺下的又一次兑现。

**On-Policy 蒸馏策略** 在数学推理任务上，同策略蒸馏用 1800 GPU 小时就达到了传统强化学习需要 17920 GPU 小时才能实现的性能—— **成本直降 90%。**

## 后训练的两难困境

关注大模型“后训练”（Post-training）的朋友们，是否也注意到了一个普遍的困境？目前似乎只有两条路可选：

1. **同策略 (On-policy) ：** 像自己摸索下棋，没有教练，全靠自我探索试错。
2. **异策略 (Off-policy) ：** 像观摩大师棋谱，但只能学习大师在“舒适区”内的固定走法。

但是，其实我们真正需要的是一个“坐在你旁边、看你亲自下棋、并对你的每一步棋都进行实时指导”的私教 ～

### 大模型训练的三个阶段

要理解这项工作的意义，我们首先要明确大语言模型（LLM）的训练阶段，一个模型要在特定领域展现出专家级的水平，通常需要三个阶段：

1. **预训练（Pre-training）：** 教授通用能力，如语言、推理和世界知识。
2. **中训练（Mid-training）：** 传授领域知识，如代码、医疗数据库或公司内部文件。
3. **后训练（Post-training）：** 引导出目标行为，例如遵循指令、解决数学问题或聊天。

在特定领域，经过强化训练的小型模型，其表现往往优于大型通用模型。使用小型模型的好处显而易见：可本地部署（隐私安全）、易于持续训练（更新迭代）、节省推理成本。

而 TML 这项工作，瞄准的就是“后训练”这个关键阶段 ～

目前，模型后训练主要存在两种技术路线：

### 技术路线一：On-policy 同策略强化学习的困境

这个路线主要是以牺牲效率以换取稳定性，规定用于更新策略的数据，必须由当前正在优化的策略（即“学生”模型自身）实时生成：

> 学生模型自身采样轨迹，并为这些轨迹分配奖励（例如，由一个判别器或“教师”模型来评估输出质量）。通过在“亲身经历”的样本上训练，学生模型能更直接地学会修正自身的错误。

但是这种方法数据效率极低，一旦策略更新，所有先前采集的数据都将“作废”并被丢弃。这使得算法极度依赖“新鲜数据”，在机器人技术等数据采集成本高昂的领域（可能需要数百万甚至数十亿次交互）中几近不切实际。

而且强化学习的奖励信号通常非常稀疏。

例如：

> 学生模型解一道数学题，最终答案“21”是错的。RL 只反馈“错误”（一个标量奖励），而学生并不知道是运算顺序错了，还是计算本身错了。

这种“只问结果、不问过程”的稀疏反馈进一步拉低了学习效率。

### 技术路线二：Off-policy 异策略蒸馏的陷阱

牺牲长期稳定性以换取高样本效率，该方法依赖一个外部来源（如强大的“教师”模型）生成“完美答案”或示范轨迹，构成一个静态数据集，学生模型通过模仿这些高质量数据进行训练。

这种方法样本效率极高且信号密集。

但是，学生模型是在教师数据的“舒适区”内学习的：

> 一旦学生在推理时犯了一个教师数据中“从未出现过”的小错误，它就会进入一个未知的状态空间（即“分布外”区域）。

这种早期的微小偏差会不断累积，导致“一步错、步步错”，最终性能崩溃。

### 一个形象的比喻

TML 用一个比喻总结了这场困境：

> 在策略 RL 是你自己下棋，没有教练。赢或输的反馈与你自己的下法直接相关，但你每局只收到一次反馈，且不知道哪一步是关键。
> 
> 离策略蒸馏是你观看一位特级大师下棋。你观察到的都是高超棋步，但这些棋步是在新手根本不会遇到的棋局状态下走出的。

后训练的核心诉求诞生了：我们能否将强化学习 **在策略相关性** （从自身错误中学习）与蒸馏的 **密集奖励信号** （每一步都有指导）结合起来？

## 同策略蒸馏：两全其美的第三条路

因此，TML 提出希望能够训练出一个紧凑模型来解决如下的数学问题：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以通过强化学习进行策略内训练，通过评估每个学生尝试解决问题的过程来评分。这种评分可以由人类完成，或者由一个能够可靠地获得正确答案的“教师”模型完成：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

TML 提出可以使用一种称为蒸馏的机制： **训练学生模型来匹配“教师”模型的输出分布。不再依赖学生的“试错”，而是在教师生成的完整轨迹上进行训练，这些轨迹包含了所有中间的“思考步骤”。**

这样一来，监督信号就变得极其密集。学生在序列的每一步都能获得教师的“思考过程”作为指导，这种指导既可以是教师完整的“下一 Token 分布”（常被称为“Logit 蒸馏”），也可以只是教师最终采样的 Token 序列。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

实践证明，仅使用采样序列也能提供对教师分布的无偏估计，并达到同等优秀的训练目标。

在学习过程中，学生模型会对比教师的“标准答案”与“自己的预测”，并根据二者之间的差异（即自己生成该 Token 的概率有多低）来重点更新参数。

打个比方：

> 如果你在学习国际象棋，在策略 RL 就好比在没有教练指导的情况下自己下棋。赢棋或输棋的反馈与你自己的下法直接相关，但每局只收到一次反馈，而且不会告诉你哪些棋步对结果贡献最大。离策略蒸馏则类似于观看一位特级大师下棋 —— 你观察到的是非常高超的棋步，但这些棋步是在新手玩家很少会遇到的棋局状态下走出的。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这就好比有一位老师来为你自己的每一步棋打分，从「大错特错」到「妙不可言」。

事实证明，通过蒸馏大型教师模型来训练小型模型是一条非常有效的路径，能够让小模型遵循指令进行数学和科学推理、从医疗笔记中提取临床信息，以及参与多轮聊天对话等复杂任务。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

TML 在策略蒸馏工作借鉴了 DAGGER（Ross et al, 2010）。

> DAGGER 是一种迭代式的 SFT 算法，其核心机制就是让教师来评估学生模型所实际访问过的状态。

同时，它也与“ **过程奖励建模** ”（PRM, Lightman et al, 2023）有相似之处。

> PRM 是一种强化学习方法，它会对学生模型“思维链”中的每一步都进行精细评分，而不是只看最终结果。

他们扩展了 Agarwal et al.（2023）和 Qwen3 团队（2025）之前的在策略蒸馏工作：

> 复刻了 Qwen3 的成果，即通过在策略蒸馏在推理基准上实现了同等性能，而成本仅为 RL 的一小部分。

实现具体步骤：

> https://github.com/thinking-machines-lab/tinker-cookbook/tree/main/tinker\_cookbook/recipes/distillation

## 技术实现：反向 KL 散度的巧妙应用

在技术实现上，在策略蒸馏可使用多种损失函数来为学生轨迹评分。为简洁起见，TML 选择了 **逐 token 的反向 KL 散度 (Reverse KL)** —— 即在给定相同先前轨迹的条件下，学生（π\_θ）和教师（π\_teacher）在每个 token 上的输出分布之间的散度：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

奖励函数的目标是最小化反向 KL，这会强力促使学生在自己实际所处的每一种状态下，都去模仿教师的行为。当学生行为与教师完全一致时，反向 KL 散度为零。

非常有创新性的地方是：

他们使用了零折扣因子 (discount factor of zero)，这意味着在任何给定的时间步，学生模型只被要求优化“眼前的下一个 token”，而无需考虑遥远的未来 token，这大大简化了训练。

最后，这种方法在计算资源上极为高效：

- 无需等待完整轨迹：不需要等一个长序列采样完成才能计算奖励，因此可以使用更短或部分的轨迹进行训练，极大加快了迭代速度。
- “廉价”的教师查询：查询教师的对数概率仅需大模型进行一次前向传播；而真正生成轨迹的“苦力活”则是由更小、更廉价的学生模型完成的。
- 不需要单独的奖励模型或标注模型

ML 列举了一个真实的例子，来展示教师模型是如何“打分”一个错误的学生轨迹的，它要求模型做出一个关键观察：

- **问题** ：关于冰块在煎锅里会发生什么。
- **正确答案** ：“B. 0”（因为冰块在煎锅里会融化）。
- **学生模型的错误** ：学生模型（Qwen3-4B）错误地将其视为一个纯粹的数学问题，完全忽略了“煎锅”这个物理背景。
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在 TML 的可视化图中，颜色越深，代表该 token 受到教师模型（Qwen3-235B，它正确解决了此问题）的惩罚（即高反 L 散度）越高。

TML 工程师\_没有\_从零开始写一套新代码，而是巧妙地“魔改”了 Tinker 中一个现成的 RL 训练脚本，把所有“脏活累活”（采样、策略梯度）都复用了。

传送门在此，想抄作业的自取：

> https://thinkingmachines.ai/blog/on-policy-distillation/(https://github.com/thinking-machines-lab/tinker-cookbook/blob/main/tinker\_cookbook/rl/train.py)

**这个“魔改”思路总共分四步：**

1. 首先，初始化一个“教师”客户端。但注意，用的是“采样客户端”，不是完整的训练客户端。潜台词是：“教师您动嘴就行（提供 Logits），不用您动手（反向传播梯度）。”
2. 和标准强化学习一样，让学生模型自己去跑，生成一堆轨迹（答卷）。RL 脚本会忠实记录下学生的“内心想法”（即它在每个 token 上的对数概率 ）。
3. 把学生的“答卷”提交给教师模型，教师过目一遍，给出它在\_一模一样\_的 token 上的“标准答案”分数。两者一减，前面提到的“反向 KL”奖励就到手了。
4. **核心创新-“注入”奖励** ： 传统 RL 算法是靠“优势”函数来判断“好坏”并更新模型的。TML 直接“狸猫换太子”，把这个“优势”强行设置为“负的反向 KL”。强化学习脚本“浑然不知”，以为自己拿到了一个超高质量、超密集的逐-token 奖励，于是兢兢业 Cye-ye 地完成了学生的训练更新。

伪代码如下：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 实验验证：10 倍成本降低不是吹牛

TML 将对比“策略内蒸馏”与其他“最后阶段”技术（如继续 SFT、RL）的优劣。

### 实验一：蒸馏以获得推理能力

使用蒸馏来训练 Qwen3-8B-Base（学生）的数学推理能力，教师为 Qwen3-32B，所有实验都以 SFT（在教师生成的静态数据集上微调）作为起点，使用 OpenThoughts-3 数据集。

实验结果：

- 在 40 万个提示上对 Qwen3-8B-Base 进行全参数微调，AIME'24（数学基准）得分达到 60% 。
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

TML 将这个 60% 的模型视为“检查点”，对比几种后训练方法冲刺 70% 的成本。

- **方法 1 继续 SFT (异策略) ：** 根据对数线性趋势推断，模型需要额外的 160 万提示（总计约 200 万）才能达到 70%。这不仅成本高昂，还依赖“Scaling Law”不失效。
- **方法 2 强化学习（同策略）：** Qwen3 技术报告提到，在类似 SFT 基础上，通过 17,920 GPU 小时的 RL，AIME 得分达到 67.6%。TML 估算这与 200 万 SFT 提示的训练成本大致相当。
- **方法 3 策略内蒸馏** ： TML 复现中，从 60% 的 SFT 检查点开始，在策略内蒸馏仅用约 150 个步骤就达到了 70% 的 AIME 成绩。
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

TML 用 FLOPs 进行了成本对比。结论是：

1. 如果 SFT 数据集是“现成”的，在策略内蒸馏的成本 **降低了 9 倍** 。
2. 在更现实的场景中（需要为新任务从头生成 SFT 数据），在策略内蒸馏的总成本 **降低了约 30 倍** 。
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 实验二：用于个性化的蒸馏

蒸馏的另一大用例是个性化。TML 展示了在策略内蒸馏如何解决“持续学习”中的“灾难性遗忘”问题。TML 希望模型首先能够掌握公司内部文档（知识，用“内部 QA”评估） ，其次保持强大的指令遵循能力（行为，用 IF-eval 评估）。

在过去，训练新知导致“灾难性遗忘” ，如果使用内部文档数据微调模型时，模型“知识”水平（内部 QA-eval）上升，但“行为”能力（IF-eval）急剧下降。

于是，TML 开始了一系列补救：

- **尝试 1：混合数据 (结果是失败)** ：TML 尝试将内部文档与聊天数据（Tulu3）混合训练。虽然能缓解遗忘，但没有任何混合比例能维持原始的 IF-eval 性能。
- **尝试 2：LoRA (结果是失败)：** 使用 LoRA 约束更新，IF-eval 性能依然不足，且学到的知识也更少。

于是，TML 提出在策略蒸馏采取两步走：

1. 先用“文档 + 聊天”混合数据对模型进行 SFT（此时 IF-eval 性能已下降）。
2. 然后，在 Tulu3 提示上，使用模型的早期版本（Qwen3-8B）作为教师，进行在策略蒸馏，以“重新唤起”丢失的能力。

在策略蒸馏上，TML 提出的两步走几乎完全恢复了 IF-eval 上的性能，且没有损失任何新学到的“知识”。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> 本质上，这是将语言模型本身（高概率行为）视为一个“奖励模型”。任何开源的指令调优模型，只要能访问 compute\_logprobs，都能胜任这个“教师”角色。

## 结语

不愧是 TML，总能一针见血。

作为行业观察者，TML 的这项工作与其说是一个新算法，不如说是一个“灵魂拷问”：我们是否在盲目地崇拜强化学习昂贵的“探索”过程，而忽视了其背后惊人的“算力浪费”？

TML 向我们证明，SOTA 的能力不一定需要从零“探索发现”，它们完全可以被高效地“复制继承”。用“巧劲”（高效蒸馏）来破解“蛮力”（昂贵强化学习） **～**

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

夕小瑶科技说

向上滑动看下一个