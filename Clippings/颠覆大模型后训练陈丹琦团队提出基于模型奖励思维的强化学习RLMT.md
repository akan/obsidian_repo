---
title: "颠覆大模型后训练！陈丹琦团队提出「基于模型奖励思维的强化学习」RLMT"
source: "https://mp.weixin.qq.com/s/jD4hqX0Qzoa0C1iFiK3T3g"
author:
  - "[[学术头条]]"
published:
created: 2025-10-10
description: "AI「通用聊天」新突破！"
tags:
  - "强化学习"
  - "思维链"
  - "模型奖励"
  - "后训练优化"
abstract: "陈丹琦团队提出RLMT框架，通过让语言模型在回复前先生成推理轨迹，并用奖励模型优化，显著提升了模型在开放式任务上的表现，仅用少量数据就超越了传统多阶段训练的效果。"
---
Original 学术头条 *2025年09月29日 18:22*

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/5qv5QsBmI9CBfgO44xVSQsBnx39JDv2b1oaCCRMic5QV35k4CG9uib0R9ibPXHXTIXjYkNW0yT9IZ4NWic4xHJiapng/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

在日常生活中，人类解决写邮件、拟提纲、制定膳食计划等开放式任务时，总会先在脑中梳理思路，再着手完成任务。这种“深度推理”能力，被 诺贝尔经济学奖得主、心理学家 Daniel Kahneman 称为“系统 2 思维”（system 2 thinking） ，是人类智能的核心特征。

  

通过在数学、代码等可验证领域使用基于规则的奖励，尽管可验证奖励强化学习（RLVR）提高了大语言模型（LLM）的推理能力，但在开放式任务上的泛化能力依然有限。

  

在一项最新研究中， 普林斯顿大学陈丹琦副教授团队 实现突破，将可验证领域的推理能力迁移到了通用聊天场景中。

  

在方法实现上，他们提出了 “基于模型奖励思维的强化学习”（RLMT）框架 ，这让 LLM 在回复之前先生成一段长思维链（CoT），并通过基于偏好的奖励模型进行在线 RL 优化。

  

据论文描述，经 RLMT 训练的 8B 模型在聊天和创意写作方面超越了 GPT-4o，并与 Claude-3.7-Sonnet (Thinking) 相当。同时，仅使用 7K 个提示，基于 RLMT 训练的 Llama-3.1-8B 基础模型就超过了经过复杂多阶段流程、使用 25M+ 示例后训练的 Llama-3.1-8B-Instruct。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/5qv5QsBmI9CBfgO44xVSQsBnx39JDv2bveoGpv1MrpiaQdY9U5syicAjeas6N9nLyerwRuUBsGK9pe2HJlTwXsVg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

论文链接：https://arxiv.org/abs/2509.20357

  

研究团队表示，研究结果将促使人们重新审视后训练流水线，并呼吁未来的研究应更全面地理解并应用思考能力。

  

  

### RLMT：融合两种范式的训练框架

  

要理解 RLMT 框架的创新，需先看清现有语言模型训练的两大痛点：

  

- 一方面，基于人类反馈的强化学习（RLHF）虽能对齐人类偏好，但将模型输出视为单一实体，缺乏显式推理引导；

  

- 另一方面，可验证奖励强化学习（RLVR）虽能通过数学、代码等领域的规则化奖励，让模型生成长 CoT，但它们在更广泛的推理问题和聊天基准测试中表现出的泛化能力仍显不足，难以泛化到无明确“标准答案”的通用聊天场景。

  

RLMT 框架既 保留了 RLVR 先生成推理轨迹，再输出结果的模式 ，又 沿用了 RLHF 基于人类偏好的奖励模型，让模型在开放式任务中也能学会“思考” 。

  

具体来说，RLMT 框架要求语言模型在生成最终响应前，必须先产出一段详细的推理轨迹，再通过在线强化学习如 GRPO 算法，用偏好奖励模型对整个“推理 + 响应”过程评分优化。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/5qv5QsBmI9CBfgO44xVSQsBnx39JDv2b06d4dYcoORxedu7v9eaKv7JZm15XadWTFPhBKVpnDicKpvJAWUqPgTA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

图｜通过强化学习与奖励模型，训练基于长思维链的语言模型，能够处理多样化的通用用户提示。相较于 RLHF，RLMT 允许模型进行思考，并将 RLVR 扩展到更广泛、开放性的任务中。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/5qv5QsBmI9CBfgO44xVSQsBnx39JDv2buQjHV0bgsgSESCk4WvI0s43AYuAv97fk788ImFCSpueFLicQibvpy0Hw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

图｜通过 RLMT 训练的 LM 为开放式查询生成的示例推理轨迹。

  

为实现这一目标，团队对三个关键环节做了精心设计：

  

在 训练算法选择环节 ，团队 分别测试了同策略深度强化学习 DPO、PPO、GRPO 三种主流算法 ，发现虽然最佳模型是通过 GRPO 算法训练的，但即便用 DPO 或 PPO 等算法，RLMT 仍能超越传统 RLHF，所有设置下的模型表现都优于基准模型；

  

在 奖励模型环节 ，团队 选用在奖励基准测试和下游应用中均展现出优异性能的 Skywork-v1-Llama-3.1-8B-v0.2 ，后续实验证明，强大的奖励模型对 RLMT 至关重要。奖励模型的强度会影响性能上限，但 RLMT 在不同强度奖励模型下均优于 RLHF；

  

在 提示库构建环节 ，团队 摒弃了含大量数学题和越狱 prompt 的数据集，选择 Tülu 3 的 WildChat-IF 子集 ，这是从 WildChat 平台筛选的 7.5k 真实用户对话提示，覆盖日常聊天、创意写作等通用场景，更贴合实际使用需求。

  

同时，RLMT 还支持两种灵活的训练模式。既可以先通过监督微调（SFT）热启动训练，用 Gemini 2.5 Flash 或 GPT-4.1-mini 生成带推理轨迹的提示-响应对“热启动”；也能直接应用于未经过任何后训练的基础模型，即零训练模式，仅通过固定指令前缀引导推理行为。

  

  

### 实验验证：以小胜大，零训练也能行

为验证 RLMT 的有效性，团队分别在 Llama-3.1-8B 和 Qwen-2.5-7B 两个模型家族的基础版与指令版上进行了 40 次训练，覆盖聊天、创意写作、知识问答等 7 类基准测试，并用相同设置下“无推理过程”的 RLHF 模型作为对照。

  

结果令研究人员震惊，RLMT 模型在所有任务中均大幅领先。通过 RLMT 训练的思维型模型在所有基准测试中平均表现始终领先非思维型模型 1.5-4 分。在核心的聊天基准测试中，优势最为显著，模型与基线模型的平均分差达 3-8 分，并且这些模型通常在创意写作和事实问答任务上表现更优。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

表｜基于 Llama-3.1-8B 和 Qwen2.5-7B 训练的 GRPO 模型在热启动和零训练设置下的测试结果。

  

更值得关注的是， 小模型展现出了比大模型更为强大的实力 。Llama-3.1-8B-Instruct-RLMT 在 WildBench 上得 50.4 分，不仅超越了近 10 倍参数的模型 Llama-3.1-70B-Instruct、Qwen2.5-72B-Instruct，甚至超过了 GPT-4o。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

表｜Llama-3.1-8B-Instruct RLMT 与强开源和封闭模型的比较，包括 GPT-4o 和Claude -3。

  

即便跳过复杂的 SFT 阶段，RLMT 对基础模型的提升依然显著 。以 Llama-3.1-8B 为例，零训练的 RLMT 模型 Llama-3.1-8B-RLMT-Zero 聊天平均分达 15.6，比经过多阶段微调、用 2500 万 + 样本训练的 Llama-3.1-8B-Instruct 高 5.5 分；Qwen2.5-7B-RLMT-Zero 更是直接超越了 Qwen2.5-7B-Instruct。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

表｜热启动和零训练的 DPO/PPO 结果

  

消融实验进一步揭示了 RLMT 的关键成功因素：提示质量、奖励模型强度、推理过程三者缺一不可 。用真实对话提示训练的模型，比用简单提示或含大量数学题的提示高 5-7 分；强奖励模型能让模型在保持非聊天任务性能的同时提升聊天能力，而弱奖励模型虽会导致整体下降，但 RLMT 仍能在该设置下优于 RLHF，这证明了“让模型思考”的价值不依赖于特定的奖励模型。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

表｜GRPO 即时混合模型、SFT 数据源及奖励模型的消融实验

  

  

### 让模型学会更聪明地思考

通过定性与定量分析，团队发现 RLMT 不仅提升了模型性能，更从根本上改变了其“思考”的方式。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图｜左：SFT 和 GRPO 模型的特征层面直接对战胜率对比；右：示例推理行为

  

从推理风格来看， SFT 模型的规划更像“线性清单” 。拿到任务后先划分章节、子章节，按部就班推进；而 RLMT 模型则展现出更接近人类的复杂推理模式：先仔细枚举任务约束与核心子主题，再将零散想法按主题分组，最后迭代优化细节。更特别的是，RLMT 模型还会“回头反思”。在规划后期回溯调整早期内容，比如交叉引用之前提到的要点，让整体逻辑更连贯。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图｜随着训练的进行，Llama-3.1-8B-RLMT-Zero 思考和回答的时间更长。

  

这种思维模式的转变，也体现在推理长度上。训练过程中， RLMT 模型生成的推理轨迹和最终响应长度均持续增加 。以 Llama-3.1-8B-RLMT-Zero 为例，随着训练步骤推进，其推理部分的 token 从初始阶段的不足 200，逐步增长到 600 以上，响应长度也同步提升，这意味着模型学会了用更长时间梳理思路，而非仓促输出。

  

为更精准地捕捉差异，团队还通过 GPT-4.1-mini 对 1024 个 WildBench 示例的推理特征进行提取。结果显示，RLMT 模型在“权衡不同观点”“将想法归类为主题”“整合约束到计划中”等特征上的胜率远超 SFT 模型，而“严格的分步结构”特征则明显减弱。这表明模型的推理从“机械分步”转向了“灵活优化”，更贴近人类解决复杂任务的思路。

  

过去， **语言模型的后训练往往依赖“海量数据 + 多阶段微调”的训练方式** 。例如，Llama-3.1-8B-Instruct 需经过监督微调、拒绝采样、迭代偏好优化等复杂流程，用到 2500 万 + 样本。 但 RLMT 的出现打破了这一范式，仅用 7K 个真实对话 prompt，就能让 Llama-3.1-8B 基础模型超越上述复杂优化的指令模型。

  

这一成果的意义远超技术突破本身。它证明，语言模型的通用能力提升，未必需要大量数据的堆积，而是可以通过激发模型的“思考能力”来实现。 RLMT 框架不仅为通用聊天任务提供了新方案，更重新定义了语言模型的后训练流程。 未来，让模型学会“思考”或许会成为与“预训练”“监督微调”等同等重要的核心环节。

  

当然，研究也存在局限性。团队坦言，目前尚未明确性能提升究竟源于模型原有特征的强化，还是对于新特征的学习，且未对推理轨迹格式、训练超参数等进行深度优化。但这也为后续研究留下了广阔空间，比如探索更优的 CoT 格式、将 RLMT 扩展到逻辑推理、长文本生成等领域，甚至将“思考能力”融入多模态模型。

  

从让模型“能说话”到让模型“会思考”，RLMT 迈出了关键一步。当语言模型不仅能生成流畅文本，还能像人类一样梳理思路、权衡利弊，或许我们距离真正理解人类需求的 通用人工智能（AGI） ，又近了一步。

  

整理：小瑜

如需转载或投稿，请直接在公众号内留言

  

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

收录于 人工智能那些事儿

素材来源官方媒体/网络新闻

继续滑动看下一个

学术头条

向上滑动看下一个