---
title: "周志华团队新作：LLM中存在奖励模型，首次理论证明RL对LLM有效性"
source: "https://juejin.cn/post/7522292179419643938"
author:
  - "[[机器之心]]"
published: 2025-07-02
created: 2025-07-02
description: "将大语言模型（LLMs）与复杂的人类价值观对齐，仍然是 AI 面临的一个核心挑战。当前主要的方法是基于人类反馈的强化学习（RLHF）。该流程依赖于一个通过人类偏好训练的奖励模型来对模型输出进行评分，最"
tags:
  - "奖励模型"
  - "强化学习"
  - "大语言模型"
  - "理论证明"
  - "内源性奖励"
abstract: "周志华团队首次理论证明强化学习在大语言模型中的有效性，并提出内源性奖励模型的概念。"
---
![横幅](https://p26-piu.byteimg.com/tos-cn-i-8jisjyls3a/8694dbc29caa4b59bda5f4181f3bd6ef~tplv-8jisjyls3a-2:0:0:q75.image)

[机器之心](https://juejin.cn/user/1873223543167902/posts)

4 阅读6分钟

![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/796c19f610c146ffac65db71d7329490~tplv-8jisjyls3a-2:0:0:q75.image)

将大语言模型（LLMs）与复杂的人类价值观对齐，仍然是 AI 面临的一个核心挑战。当前主要的方法是基于人类反馈的强化学习（RLHF）。该流程依赖于一个通过人类偏好训练的奖励模型来对模型输出进行评分，最终对齐后的 LLM 的质量在根本上取决于该奖励模型的质量。

因此，创建一个先进的奖励模型需要建立庞大且高质量的人类偏好数据集，而这一过程通常既缓慢、昂贵，又难以扩展。

这种对人类标注数据的依赖促使研究者探索其他对齐方法。一个重要的研究方向是基于 AI 反馈的强化学习（RLAIF）。该方法利用强大的专有大语言模型生成奖励信号或偏好标签，从而规避人类标注需求。虽然成本效益显著，但这些方法缺乏严谨的理论基础，且容易继承评判模型本身的风格偏差与固有偏见。这引发了一个关键问题：高质量奖励信号是否必须依赖外部来源？

来自南京大学的研究者发现，一个强大的通用奖励模型并非需要构建，而是可以挖掘出来的， 因为它已经潜在地存在于通过标准的下一个 Token 预测训练的任何语言模型中，称之为「内源性奖励（endogenous reward）」。

本文的核心贡献是为这一观点提供严格的理论基础。本文证明了可以从标准的下一个 Token 预测目标中恢复出一种特定形式的离线逆强化学习（IRL）奖励函数，该目标用于预训练和监督微调（SFT）。这一见解能够超越启发式方法，并建立一种原则性的方法，来引出语言模型在训练过程中隐式学习到的奖励函数。

具体来说，本文展示了语言模型的 logits 可以直接解释为 soft Q 函数，通过逆 soft 贝尔曼算子可以从中恢复出奖励函数。

至关重要的是，这一理论联系不仅仅提供了一种奖励提取的方法。本文还证明了，使用模型自身的内源性奖励进行微调可以使策略在误差界限上优于基线模型。强化学习过程有效地修正了标准模仿学习（即下一个 Token 预测）中的累积误差，将性能差距从任务视野的二次依赖关系 O (H²) 降低到优越的线性关系 O (H)。

据了解，这是首次理论证明强化学习在 LLM 中的有效性。广泛实验验证了这一理论，表明这种内源性奖励不仅优于现有的 LLM-as-a-judge 方法，而且可以超越那些通过昂贵的人类标注数据显式训练的奖励模型的表现。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7a57ce9cfe3143ffbe98816c1369c8aa~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1752052122&x-signature=O55TJPJ6GF%2BfPKNHdKynuDcTzgM%3D)

- 论文标题： GENERALIST REWARD MODELS: FOUND INSIDE LARGE LANGUAGE MODELS
- 论文链接： [arxiv.org/pdf/2506.23…](https://link.juejin.cn/?target=https%3A%2F%2Farxiv.org%2Fpdf%2F2506.23235 "https://arxiv.org/pdf/2506.23235")

这篇论文提出了解决 LLM 的对齐问题，通过利用模型内部的奖励机制，而不是依赖外部的人类反馈，这可能会改变未来 LLMs 的开发和应用方式。

本文在实验中旨在评估以下核心问题：

Q1：在与启发式基线方法和显式训练的最新奖励模型对比时，免训练内源性奖励模型（EndoRM）在常见奖励模型基准测试中的表现如何？

Q2：内源性奖励是否具备强大的指令遵循能力，能否作为可通过提示词调用的通用奖励模型？

Q3：基于内源性奖励的强化学习能否产生更优策略，实现理论预测的自我改进效果？

多样偏好对上的奖励准确率（Q1）

为回答 Q1，本研究通过预测 RM-Bench 中被选中的回复来评估奖励模型性能。更高的准确率意味着奖励质量更优。

由于本评估的方法无需训练，因此本评估将其与其他无需训练的方法进行对比：生成式验证器（Generative Verifier）、GenRM-Pairwise 和 GenRM-Pointwise 。

所有基线方法及本评估的 EndoRM 均采用 Qwen2.5-7B-Instruct 作为基础模型以确保公平比较。此外，本评估还列出了四个显式训练的高性能奖励模型的结果作为参考。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/32079aeb7a1743a6b4be18d73af18891~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1752052122&x-signature=easqQHWlIHfcKIC3eVCs2PasAq4%3D)

表 1 中的结果显示，EndoRM 不仅显著优于所有使用相同基础模型的无需训练基线方法，还以更高的平均得分超越了最先进的显式训练奖励模型。

这一发现表明，EndoRM 相比依赖高成本偏好数据筛选和训练的奖励模型更具有效性。

图 1 中进一步展示了 Multifaceted-Bench 的实验结果，从中可以观察到 EndoRM 在五个领域上始终优于所有基线方法。考虑到 Multifaceted-Bench 中可能包含数以千计的偏好对，这一结果证明了即使在任务复杂度和偏好多样性增加的情况下，EndoRM 仍能实现可扩展的鲁棒性。

这一发现进一步验证了本评估的核心假设：强大的奖励信号已潜在存在于基础模型之中。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/1808dc2448c8442793c8f5c948c13864~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1752052122&x-signature=GzL%2FCqE4R7fWOIrycwvMRgu0aC4%3D)

验证指令遵循能力（Q2）

一个关键论点是内源性奖励并非静态的，而是可以通过提示来引导。

为验证这一点，本文使用了 DSP 数据集，该数据集包含四个不同的领域。本评估通过将 DSP 论文中相应的系统提示作为输入，创建了四个特定领域的版本的内源性奖励。

然后，本评估测试每个特定领域的内源性奖励在所有四个测试集上的响应分类准确率。

表 2 中的结果显示出强烈的对角模式：每个 EndoRM 在其自身领域上表现最佳。例如，EndoRM-Academy 在学术数据上达到了其最高准确率（76.89%）。

这证实了内源性奖励不是一个固定的评估器，而是一个动态的、可提示的评判器，继承了基础大型语言模型强大的指令遵循能力。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e7c5c5e8790f469d829eef27843469e6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1752052122&x-signature=C53%2FvS17mMMqke%2BtjoEXbZu%2BFtg%3D)

通过强化学习实现自我提升（Q3）

最后，本评估测试了定理 2 中的核心理论主张：带有内源性奖励的强化学习可以通过减轻复合误差来改进基础策略。

本评估在 MATH-lighteval 数据集上通过强化学习对基础模型 Qwen2.5-Math-7B 进行训练。内源性奖励模型同样是 Qwen2.5-Math-7B，在策略学习期间其参数保持固定。提示和响应的最大长度均设为 1024，KL 系数设为 0.01。

表 3 中的结果表明，带有内源性奖励的强化学习微调有助于模型在所有五个基准测试中一致地优于基础模型。

本评估还在附录 E 中给出了模型在强化学习前后的响应示例，从中可以看出，对于同一个问题，在基于内源性奖励进行优化之前，模型无法解决问题，并且随着响应的进行开始胡言乱语，甚至输出 Python 代码。

相比之下，本评估的方法提供了一个清晰简洁的解决方案。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/cd7e4c53586c4d5e88c6e8e5e4c31151~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1752052122&x-signature=oSy%2FktvWICPl%2B5RpLEW6SOh8hQA%3D)

了解更多内容，请参考原论文。

标签：

评论 0

![avatar](https://p6-passport.byteacctimg.com/img/user-avatar/596dd11ec1eb86109467f46963b9da45~100x100.awebp)

0 / 1000

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

![avatar](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/8/30/9bd7ac0fa2558bc4e21b29aa85a08b4b~tplv-t2oaga2asx-jj-mark:64:64:0:0:q75.avis)

为你推荐

- [Sebastian Raschka长文：DeepSeek-R1、o3背后，RL推理训练正悄悄突破上限](https://juejin.cn/post/7495390534913032226 "Sebastian Raschka长文：DeepSeek-R1、o3背后，RL推理训练正悄悄突破上限")
		[著名 AI 研究者和博主 Sebastian Raschka 又双叒叕更新博客了。 这次的主题是《LLM 推理的强化学习现状》。 博客地址：https://magazine.sebastianrasc](https://juejin.cn/post/7495390534913032226)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 104
	- 点赞
	- 评论
- [LLM加RL遭质疑：故意用错奖励，数学基准也显著提升，AI圈炸了](https://juejin.cn/post/7509101103180644387 "LLM加RL遭质疑：故意用错奖励，数学基准也显著提升，AI圈炸了")
		[这是今年最「好笑」的一篇论文。 本文一出，所有的大语言模型（LLM）+ 强化学习（RL）都要被质疑是否有意义了。 这周二，一篇来自华盛顿大学、艾伦人工智能实验室、伯克利的论文引爆了 AI 界。 论文：](https://juejin.cn/post/7509101103180644387)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 69
	- 1
	- 评论
- [DeepSeek-R1: 论文的解析与解读](https://juejin.cn/post/7476352294083788810 "DeepSeek-R1: 论文的解析与解读")
		[DeepSeek-R1: 逐段解析与解读 1. 引言段落 (Introduction) 内容概述： 本部分介绍了近年来大型语言模型（LLM）的快速发展，强调了后训练阶段（post-training）](https://juejin.cn/post/7476352294083788810)
	- [
		AI\_Echoes
		](https://juejin.cn/user/983427699446906)
	- 103
	- 点赞
	- 评论
- [深挖RLHF潜力，复旦语言和视觉团队创新奖励模型优化，让大模型更对齐](https://juejin.cn/post/7323968844552978471 "深挖RLHF潜力，复旦语言和视觉团队创新奖励模型优化，让大模型更对齐")
		[继第一份大模型对齐技术报告获 NeurIPS 2023 workshop best paper 后，第二份报告强势归来，复旦语言和视觉团队联合推出的第二份报告将进入这一领域更深层的探索和优化之旅。](https://juejin.cn/post/7323968844552978471)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 644
	- 1
	- 评论
	![深挖RLHF潜力，复旦语言和视觉团队创新奖励模型优化，让大模型更对齐](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24ccfc9c286545579deeb3fedf919b14~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis#?w=390&h=282&s=219175&e=png&b=f6f7d3)
- [【资源合集】强化学习训练LLM Agents的实战资源库：AgentsMeetRL](https://juejin.cn/post/7517085209326944256 "【资源合集】强化学习训练LLM Agents的实战资源库：AgentsMeetRL")
		[如果你正在寻找将强化学习应用于语言模型智能体（LLM Agents）的开源解决方案，GitHub 上的资源库 AgentsMeetRL 值得重点关注。](https://juejin.cn/post/7517085209326944256)
	- [
		MarkGosling
		](https://juejin.cn/user/3799544245529837)
	- 40
	- 点赞
	- 评论
	![【资源合集】强化学习训练LLM Agents的实战资源库：AgentsMeetRL](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6b146a0c65db41b6a8b9ea5cb3eda1b0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgTWFya0dvc2xpbmc=:q75.awebp?rk3s=f64ab15b&x-expires=1752054700&x-signature=ZPI3NbYPeXNFMpBoqVNF048ejXc%3D)
- [\[译\]RLHF：从人类反馈中强化学习](https://juejin.cn/post/7230707507379290173 "[译]RLHF：从人类反馈中强化学习")
		[如果你想了解类似GPT系统是如何训练出来的，那么一定要读这篇文章。文章从预训练，到监督微调，再到人类反馈的强化学习，没有去讲NLP或RL的知识，用直白的话说清楚了为什么每一步都很重要。](https://juejin.cn/post/7230707507379290173)
	- [
		程普
		](https://juejin.cn/user/26044008768029)
	- 1.3k
	- 3
	- 评论
	![[译]RLHF：从人类反馈中强化学习](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d1ff393627247ce9c563ed2ad360721~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis)
- [RL真让大模型更会推理？清华新研究：其能力边界或仍被基座「锁死」](https://juejin.cn/post/7496808950017605684 "RL真让大模型更会推理？清华新研究：其能力边界或仍被基座「锁死」")
		[近年来，RLVR（可验证奖励的强化学习）训练大模型在数学、代码等各项任务中表现惊艳，大模型的推理能力快速提升，强化学习因而被视为重要的推手。然而，其中直指核心的重要问题却悬而未决：强化学习真的能让大模](https://juejin.cn/post/7496808950017605684)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 96
	- 点赞
	- 评论
- [超越DeepSeek-R1关键RL算法GRPO，CMU「元强化微调」新范式登场](https://juejin.cn/post/7481104876887556147 "超越DeepSeek-R1关键RL算法GRPO，CMU「元强化微调」新范式登场")
		[大语言模型（LLM）在推理领域的最新成果表明了通过扩展测试时计算来提高推理能力的潜力，比如 OpenAI 的 o1 系列。](https://juejin.cn/post/7481104876887556147)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 90
	- 点赞
	- 评论
- [业内首次! 全面复现DeepSeek-R1-Zero数学代码能力，训练步数仅需其1/10](https://juejin.cn/post/7496344493710065679 "业内首次! 全面复现DeepSeek-R1-Zero数学代码能力，训练步数仅需其1/10")
		[OpenAI 的 o1 系列和 DeepSeek-R1 的成功充分证明，大规模强化学习已成为一种极为有效的方法，能够激发大型语言模型（LLM) 的复杂推理行为并显著提升其能力。 然而，这些推理模型的核](https://juejin.cn/post/7496344493710065679)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 76
	- 1
	- 评论
- [打造SimPO新算法，微调8B模型超越Claude 3 Opus](https://juejin.cn/post/7375370443732434981 "打造SimPO新算法，微调8B模型超越Claude 3 Opus")
		[前言 大型语言模型（LLM）近年来取得了巨大进展，但要将其与人类价值观和意图相一致，使其变得有用、诚实和无害，仍然是一个挑战。强化学习从人类反馈中（RLHF）是一种常用的方法，通过微调语言模型来实现有](https://juejin.cn/post/7375370443732434981)
	- [
		努力犯错玩AI
		](https://juejin.cn/user/1366029853539604)
	- 484
	- 点赞
	- 评论
	![打造SimPO新算法，微调8B模型超越Claude 3 Opus](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c1a8d47c2014cf586a5d0b899d5c4fe~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis#?w=796&h=432&s=828116&e=png&b=426980)
- [Sebastian Raschka：关于DeepSeek R1和推理模型，我有几点看法](https://juejin.cn/post/7469236410135298067 "Sebastian Raschka：关于DeepSeek R1和推理模型，我有几点看法")
		[著名 AI 研究者和博主 Sebastian Raschka 又更新博客了。这一次，他将立足于 DeepSeek 技术报告，介绍用于构建推理模型的四种主要方法，也就是如何通过推理能力来增强 LLM。](https://juejin.cn/post/7469236410135298067)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 140
	- 点赞
	- 评论
- [RLAIF：从 AI 反馈中的强化学习](https://juejin.cn/post/7374988830494720011 "RLAIF：从 AI 反馈中的强化学习")
		[本文将探索如何通过自动化人类反馈，利用AI自身的进化来指导和优化学习过程，开启一种全新的可能性，这不仅有望突破现有限制，更可能重塑我们对未来智能的理解。](https://juejin.cn/post/7374988830494720011)
	- [
		YBCarry\_段松啓
		](https://juejin.cn/user/3368559358248040)
	- 314
	- 点赞
	- 1
- [国内首个可复现的RLHF基准，北大团队开源 PKU-Beaver](https://juejin.cn/post/7234485237459681336 "国内首个可复现的RLHF基准，北大团队开源 PKU-Beaver")
		[机器之心专栏 机器之心编辑部 如今，大语言模型如 ChatGPT 已在人们的生产生活中产生广泛影响。作为训练大语言模型的关键步骤，RLHF（Reinforcement Learning from Hu](https://juejin.cn/post/7234485237459681336)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 433
	- 4
	- 评论
- [ChatGPT全球最大开源平替：回复更受欢迎，但中文对话一塌糊涂](https://juejin.cn/post/7224410321669390391 "ChatGPT全球最大开源平替：回复更受欢迎，但中文对话一塌糊涂")
		[在众多开源项目中脱颖而出，OpenAssistant 有两把刷子。 事实证明，将大型语言模型 (LLM) 与人类偏好保持一致可以显著提高可用性，这类模型往往会被快速采用，如 ChatGPT 所证明的那](https://juejin.cn/post/7224410321669390391)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 134
	- 点赞
	- 评论
- [对语言大模型的现状总结与趋势](https://juejin.cn/post/7292199621298929675 "对语言大模型的现状总结与趋势")
		[ChatGPT与LLM技术现状 LLM的主要手段 模型：Transformer拥有强大的表示能力，能对具有组合性(compositinality)的语言进行很好的表示和学习。 预训练（pre-trai](https://juejin.cn/post/7292199621298929675)
	- [
		\_山海
		](https://juejin.cn/user/272334612598664)
	- 1.3k
	- 4
	- 评论

APP内打开