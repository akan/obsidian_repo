---
title: "超越 DeepSeek-R1，英伟达开源新王登顶！14 万 H100 小时训练细节全曝光超越 DeepSeek-R1 的 - 掘金"
source: "https://juejin.cn/post/7500859352061919242"
author:
published: 2025-05-06
created: 2025-05-07
description: "超越 DeepSeek-R1 的英伟达开源新王 Llama-Nemotron，是怎么训练出来的？刚刚放出的论文，把一切细节毫无保留地全部揭秘了！"
tags:
  - "clippings"
title: "超越 DeepSeek-R1，英伟达开源新王登顶！14 万 H100 小时训练细节全曝光超越 DeepSeek-R1 的 - 掘金"
source: "https://juejin.cn/post/7500859352061919242"
author:
published: 2025-05-06
created: 2025-05-07
description: "超越 DeepSeek-R1 的英伟达开源新王 Llama-Nemotron，是怎么训练出来的？刚刚放出的论文，把一切细节毫无保留地全部揭秘了！"
tags:
  - "clippings"
---
![横幅](https://p9-piu.byteimg.com/tos-cn-i-8jisjyls3a/80e551ec95e54d3e94bf0f1cdad71e51~tplv-8jisjyls3a-image.image) ![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/ef1b479729b54febacdf28345ebe61af~tplv-8jisjyls3a-image.image)

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/27f9fda3056547a58256ea7c073b25a5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=xZecch50FyQCYJ3pDK5ei9uocac%3D)

##### 【新智元导读】超越 DeepSeek-R1 的英伟达开源新王 Llama-Nemotron，是怎么训练出来的？刚刚放出的论文，把一切细节毫无保留地全部揭秘了！

现在，英伟达 Llama-Nemotron 系列模型，正式超越 DeepSeek-R1！

而且，这些模型已经全部开源了。

换句话说，在推理吞吐量和内存效率上显著超越 DeepSeek-R1 的一系列推理模型，已经开源可用了。

超越 DeepSeek-R1 的模型，究竟是怎么炼出的？

就在刚刚，英伟达发布了技术报告中，揭秘了模型训练的关键——

· 利用合成数据监督微调 + 强化学习，全面提升模型的推理能力

· 从头构建完善的后训练流程

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f80ee45869b74900b6b487240055795b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=fo%2B99Va%2Be5AmKqyd0C5PktyXWVc%3D)

论文链接： [arxiv.org/abs/2505.00…](https://link.juejin.cn/?target=https%3A%2F%2Farxiv.org%2Fabs%2F2505.00949 "https://arxiv.org/abs/2505.00949")

[上个月，英伟达正式官宣了的 Llama-Nemotron](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzI3MTA0MTk1MA%3D%3D%26mid%3D2652583923%26idx%3D1%26sn%3D037e1d18a5f0f3b94dcde26d1a815e4d%26scene%3D21%23wechat_redirect "https://mp.weixin.qq.com/s?__biz=MzI3MTA0MTk1MA==&mid=2652583923&idx=1&sn=037e1d18a5f0f3b94dcde26d1a815e4d&scene=21#wechat_redirect") [253B，一下子就让发布 3 天的 Llama 4 变成了「陪衬」](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzI3MTA0MTk1MA%3D%3D%26mid%3D2652583923%26idx%3D1%26sn%3D037e1d18a5f0f3b94dcde26d1a815e4d%26scene%3D21%23wechat_redirect "https://mp.weixin.qq.com/s?__biz=MzI3MTA0MTk1MA==&mid=2652583923&idx=1&sn=037e1d18a5f0f3b94dcde26d1a815e4d&scene=21#wechat_redirect") 。（ [后者还](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzI3MTA0MTk1MA%3D%3D%26mid%3D2652591019%26idx%3D1%26sn%3D5ca43643ab179dc726cb298a02cd68ef%26scene%3D21%23wechat_redirect "https://mp.weixin.qq.com/s?__biz=MzI3MTA0MTk1MA==&mid=2652591019&idx=1&sn=5ca43643ab179dc726cb298a02cd68ef&scene=21#wechat_redirect") [陷入了刷榜等「诚信危机」](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzI3MTA0MTk1MA%3D%3D%26mid%3D2652591019%26idx%3D1%26sn%3D5ca43643ab179dc726cb298a02cd68ef%26scene%3D21%23wechat_redirect "https://mp.weixin.qq.com/s?__biz=MzI3MTA0MTk1MA==&mid=2652591019&idx=1&sn=5ca43643ab179dc726cb298a02cd68ef&scene=21#wechat_redirect") ）

发布之后，英伟达的这一系列模型在业界引起不小的轰动。

根据人工分析智能指数，截至 2025 年 4 月，Llama-Nemotron-Ultra 被认为是目前「最智能」的开源模型。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/66e971fa92b94e56be4336041356b40e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=cpMpusQL6ch8fXLvTolYmJ8KZTU%3D)

这次，英伟达一口气推出了 Llama-Nemotron 系列三个模型——LN-Nano 8B，LN-Super 49B 和 LN-Ultra 253B。

值得一提的是，LN-Ultra 不仅在 **性能上超越了 DeepSeek-R1** ，还能在单个 8xH100 节点上运行， **推理 ****吞吐量**** 更高** 。

这些模型针对高吞吐量推理进行了优化，同时保持强大的推理能力和最多 128K 的上下文长度。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9ef8dbf636cf434fa060943a30c7ade0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=LPJPP54NyMNzEqJ%2Bx6gmF1vwvs0%3D)

LN-Ultra 在各类推理任务中展现出领先的开源模型性能

并且，在全球 AI 开源届，英伟达首次推出了 **推理开关功能** ，用户只需通过系统提示词「detailed thinking on/off」就可以动态切换标准聊天模式和推理模式。

这种设计让模型既能满足日常通用需求，也能胜任复杂的多步骤推理，无需使用不同的模型或架构。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/83ebc641315a4022a5740c11b77b0207~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=UPayzKyFZ4limB5M5S6bWhXoK98%3D)

**揭秘构建过程**

Llama-Nemotron 模型的构建，分为五个阶段。

第一阶段：利用神经架构搜索（NAS）在 Llama 3 系列模型基础上优化推理效率，并引入前馈网络融合（FFN Fusion）。

第二阶段：通过知识蒸馏和继续预训练来恢复模型性能。

第三阶段：进行有监督微调（SFT），结合标准指令数据和来自 DeepSeek-R1 等强大教师模型的推理过程，从而让模型具备多步骤推理能力。

第四阶段：在复杂的数学和 STEM 数据集上进行大规模强化学习，这是学生模型能够超越教师模型能力的关键一步。对于 LN-Ultra，这一阶段在 GPQA-D 基准测试上带来了显著性能提升，确立其作为当前开源领域科学推理最强模型的地位。

为了支持如此大规模的强化学习训练，团队专门开发了新的训练框架，包含多项优化措施，其中最重要的是支持 FP8 精度的生成能力。

最后一个阶段：简短的对齐训练，重点在于指令跟随和符合人类偏好。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a0bb4434493047e0b5ba34e8ebc0c97d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=%2B8nmNG8bqPlWSLARA1cqluf1ZtQ%3D)

**全新架构设计：优化推理效率**

借助神经架构搜索 Puzzle 框架，LN-Super 和 LN-Ultra 优化了模型推理效率。

Puzzle 能够在实际部署限制下，将大语言模型转化为更适配硬件运行的高效版本，如图 3 所示。

通过「逐块局部蒸馏」的方式，开发者利用 Llama 3 Instruct 构建了替代 Transformer 模块的库。

在这个过程中，每个模块都会被独立且并行地训练，逼近原始模块的功能，同时优化计算性能。

这样，每个替代模块都具有特定的「精度 - 效率」权衡特性：有些模块虽然更高效，但可能会带来一定的质量下降，从而形成一种在计算成本与模型准确性之间的明确取舍。

这些模块的变体包括：

- **注意力机制移除** ：某些模块完全省略了注意力机制，从而降低了计算量和 KV 缓存的内存消耗。
- **可变的 FFN 维度** ：前馈网络的中间维度被调整，能以不同粒度对模型进行压缩。

在构建好模块库后，Puzzle 会从每一层中选择一个模块，组装出一个完整的模型。

这个选择过程由 **混合整数规划（MIP）求解器** 控制，它会根据一系列约束条件（如硬件兼容性、最大允许延迟、内存预算或期望的推理吞吐量）来找出最优配置。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ce14042cb06d49ae8653c1075537d216~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=7TAKsBhpA1QrFr1rWCi%2B%2B0dEVYc%3D)

Puzzle 框架概览

**![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/67daeee86b6d487cb71135944b45e591~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=YyT1Tq5qRn%2Fn4lLfWKwo7cg5fZc%3D)**

**垂直压缩与 FFN 融合**

在 LN-Ultra 模型中，研究者引入了一项额外的压缩技术，称为 **FFN Fusion（前馈网络融合）** ，用于减少模型的序列深度并提升推理延迟效率。

Puzzle 在移除部分注意力层后，模型结构中出现的一种特性：模型中常会出现多个连续的 FFN 块。

FFN Fusion 能识别出这些连续结构，并将其替换为更少但更宽、可并行执行的 FFN 层。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/04eac724266f4dbd96e57c5d65b70917~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=lP%2FmGB5F1OIazK3CLRmFKtE01Zg%3D)

这种替换方式在不牺牲模型表达能力的前提下，减少了顺序计算的步骤，显著提升了计算资源的利用率——特别是在多 GPU 环境中，跨层通信开销不可忽视的情况下，效果尤为明显。

图 4 展示了在 GPQA-Diamond 准确率（%）与处理吞吐量（token / 秒）之间的权衡。

值得注意的是，LN-Ultra 始终在准确性和效率上优于 DeepSeek-R1 和 Llama-3.1-405B，取得了准确性和效率的最佳平衡。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/8404feefeaf74e9a9f3bb37a38de0279~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=XA76PRvP62DJ8C9%2FHqU1dgiO8DA%3D)

GPQA-Diamond 模型的精确度与吞吐量对比

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f9744f6105b64f379016ff7bcfdecde6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=%2BQi840HROG98DbsTxwv5H6RXIKk%3D)

**NAS 后训练：知识蒸馏与持续预训练**

在神经架构搜索（NAS）阶段之后，LN-Super 和 LN-Ultra 都进行了额外的训练，以提升模块之间的兼容性，并恢复在模块替换过程中可能出现的质量损失。

- **LN-Super** 使用 Distillation Mix 数据集，在知识蒸馏目标下训练了 400 亿个 token。
- **LN-Ultra** 首先使用相同的蒸馏数据集进行知识蒸馏训练，训练了 650 亿个 token；随后又在 Nemotron-H 第四阶段预训练数据集上继续训练了 880 亿个 token。

这一最终的预训练步骤，使 LN-Ultra 不仅追平了参考模型 Llama 3.1-405B-Instruct 的表现，还在关键基准测试中实现了超越。

这就，表明通过简短的蒸馏与预训练，可以在激进的架构优化和高模型性能之间实现兼容。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b9cbd9983345486db23bea85b078b1b3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=mj36%2FCWtLgbOn0WV9%2BGfkKUuo7c%3D)

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/13c78274e6eb435db6de244d37810f4a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=wVtSHjt0LFhHALTqHxwJitXdauE%3D)

**监督微调**

想让 Llama-Nemotron 模型拥有超厉害的推理能力？

监督微调（Supervised Fine-Tuning，SFT）这一步简直就是「神助攻」。

前面的开发阶段，团队主要在研究怎么让模型架构更高效，怎么把海量知识塞进去。

而 SFT 就像给模型请了一位「私人教练」，专门针对特定任务的推理步骤，带着它从 DeepSeek-R1 这些「学霸」模型身上，偷师推理技巧。

不过要想让模型真正拥有扎实的推理功底，大规模、高质量的推理训练数据必不可少。

**![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9b1ce889b92c4c8da4eb4af28fd252ff~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=YZPrQZlSVs9%2BF%2BmrKg0f9a96M04%3D)**

**合成数据**

研究者为监督微调精心整理了包含 **推理和非推理** 的数据样本。

对于推理样本，他们在系统指令中加入「detailed thinking on」（开启详细思考），而对于非推理样本，则使用「detailed thinking off」（关闭详细思考）。

这种设置，使模型能够在推理阶段根据提示内容切换推理行为。

**为推理，精心准备了数学、代码等相关领域的 ****合成数据**** 。**

为了训练模型遵循「推理开关」指令，研究者构建了成对的数据集，其中每个提示都对应一个带推理的回复和一个不带推理的回复。

这种配对方式，使模型能够根据系统指令学习调节其推理行为。

随后会依据标准答案或奖励模型对这些回复进行筛选。

**![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/30eaf3b012f1471c89b95e7df685ed32~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=iNCbblr3tt3dXhWhNnCqPUtQTeQ%3D)**

**微调流程**

在指令微调数据上，所有模型的训练，均采用 token 级交叉熵损失。

在大多数训练设置中，推理数据和非推理数据会被混合在一起，形成训练批次，其中每个提示都会根据系统指令「detailed thinking on/off」的条件，与相应的响应配对。

延长训练至多轮周期能提升性能，对小模型尤为明显。

这次主要使用 **NeMo-Aligner** 来进行强化学习训练，支持 GRPO 以及异构模型的训练。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/49345581974f4e1c9c8ee7d44211c134~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=XlWZqgfCj9XERVwIzrH%2BEC3msVI%3D)

论文链接： [arxiv.org/abs/2405.01…](https://link.juejin.cn/?target=https%3A%2F%2Farxiv.org%2Fabs%2F2405.01481 "https://arxiv.org/abs/2405.01481")

生成阶段使用 **vLLM** 实现，训练阶段则使用 **Megatron-LM** 。

训练和推理阶段共用同一批 GPU，在同一设备上完成。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/688c637745ba4662a64089ec81dfa698~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=ZIXxaaMcd2l%2Bdd05J%2F2XWyvC830%3D)

整个训练过程中，他们共使用了 **72 个节点，每个节点配备 8 张 H100** **GPU** 。

生成阶段采用 **FP8 精度** ，训练阶段采用 **BF16 精度** ，优化器状态使用 **FP32** 。

每个阶段维护一份独立的模型权重，并在每一步开始时进行同步。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b4970c32539a4b6ba991d82738c27b05~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=UOu1joCkNHBbRLHNrhxot6ltybQ%3D)

**强化学习：超越 R1 推理能力的关键**

监督微调（SFT）可以让模型从强大的教师模型中提炼知识，从而获得出色的能力。

然而， **知识蒸馏本质上为学生模型的性能设定了上限** ，特别是当学生模型的基础模型能力不超过教师模型时。

通过监督微调，LN-Ultra 的性能可以接近 DeepSeek-R1，但无法超越它。

为了使学生模型超越教师模型，大规模强化学习（RL）是一种可行的方法，因为它允许模型持续探索新的可能性并进行自我学习。

由于资源限制，研究者仅对 LN-Ultra 应用推理 RL，结果得到超越教师模型的学生模型。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/4525a64a10444ed39f7d7c54b4462f47~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=Oso%2BeK3eClooFH6DRJbXgOfLBiU%3D)

在整个推理强化学习训练过程中，在 GPQA-Diamond 数据集上，LN-Ultra 的准确性

**![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b396f4f485344363996060b379f7b84e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=G%2FJ0q1HzrWIPRINaMHp9eAew8LE%3D)**

**训练流程**

对于 LN-Ultra，研究者通过大规模强化学习（RL）增强它的科学推理能力，采用 DeepSeek-R1 同款的分组相对策略优化（GRPO）算法。

整个训练过程大约需要 **14 万 H100 小时** ，持续训练模型直至其在推理任务上实现收敛。

图 5 显示了训练过程中 GPQA-Diamond 的准确率得分。

**奖励机制设计包含两类：**

- **准确性奖励** ：基于标准答案（数值 / 句子 / 段落），调用 Llama-3.3-70B-Instruct 模型判断预测结果匹配度
- **格式奖励** ：遵循 DeepSeek-AI 的方案，强制模型在「详细思考」模式下用 `<think>` 标签包裹推理过程，非该模式时禁止出现此类标签

研究团队还对数据进行预处理，包括数据过滤和课程训练（curriculum training）。

- **数据筛选** ：预先使用 LN-Super 对每个问题生成 8 条响应，剔除通过率≥75% 的简单样本
- **课程训练** ：采用基于通过率的渐进式批次分配（图 6 验证其有效性）
- *动态分布* ：以高斯函数建模批次难度，初期侧重高通过率（简单）样本，后期转向低通过率（困难）样本
- *填充逻辑* ：优先按目标分布分配样本，剩余容量从最大剩余样本池补充
- *批内处理* ：同批次样本随机打乱以保持多样性

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/8a6e0dec95344481b2dc5fec57d6b923~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=9arUk49JJshwT8C7%2BgMG64wnpaw%3D)

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f665d980bdff43498a35d61eaf0d9a82~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=CR0bQujggQ6dYE2%2Fl9MHwKrH5uM%3D)

**用于偏好优化的强化学习**

在完成科学推理训练之后，研究者对 LN-Super 和 LN-Ultra 模型进行了一个简短的强化学习阶段，重点提升其 **指令\*\*\*\*跟随能力** 。

研究者还使用 RLHF 对模型的 **通用帮助能力和聊天表现** 进行优化，同时保留了模型在数学、科学等其他领域的能力。

如表 4 所示，LN-Super 在 Arena Hard 测试中取得了 **88.3 的高分** ，超越了专有模型如 Claude 3.5 Sonnet 和 GPT-4o-2024-05-13，也优于体量更大的开源模型。

为了实现这一结果，他们采用了「在线 RPO」（OnLine Reward-Policy Optimization）方法，最大化模型在 HelpSteer2 数据集上的预测奖励，奖励模型使用的是 Llama-3.1-Nemotron-70B-Reward。

两轮在线 RPO 训练将 Arena Hard 得分从 **69.1 提升到 88.1** 。

对于 LN-Ultra，他们使用类似流程，但采用了 **GRPO** 。

对于 LN-Nano，他们进行了两轮 **离线 RPO 训练** ，使用基于策略生成的训练数据。

在第一轮中，结合推理类和非推理类数据，并配合适当的系统提示词，以优化模型的推理控制能力。第二轮则专注于提升指令跟随能力。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/88831324898249caa933d0e7ada36eef~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=ZeUxWknJ1fO2AdjVijNExpaOPwo%3D)

**评估结果**

研究者在两个基准类别上评估所有 Llama-Nemotron 模型的性能：推理任务和非推理任务。

**推理类基准** 包括：AIME24 和 AIME25、GPQA-Diamond、LiveCodeBench 以及 MATH500。

**非推理类基准** 包括：用于指令遵循评估的 IFEval、用于函数调用工具使用评估的 BFCL V2 Live 以及用于评估对人类对话偏好对齐度的 Arena-Hard。

表 3 显示，尽管模型体积较小，LN-Nano 在所有推理类基准测试中都取得了出色的表现。

这表明，监督微调流程和精心策划的推理数据集，在将结构化推理能力迁移至小型模型方面是有效的。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/797d6e0166c144d9acb66e05533cfff8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=HVUdBHVA5msXF3UdMSuEn9ypddk%3D)

表 4 将 LN-Super 与其参数规模相近的其他模型进行了对比，可见这个模型在推理任务和非推理任务中都表现出强劲的竞争力。

在「推理关闭」模式下，LN-Super 的表现与其蒸馏来源模型 Llama-3.3-70B 相当；在「推理开启」模式下，则超越了其他竞品模型，例如 DeepSeek-R1-Distilled-Llama-70B，在保持良好指令遵循能力的同时展现出强大的推理能力。

这些结果表明，LN-Super 是一个兼具推理优化模型和非推理模型优点的通用模型，适用于日常助手型任务和结构化推理任务。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/62e65bf3eb354540b3b4afc90822233d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=GrPdmEmyP1xoJILItkfT%2Bm0M0hk%3D)

表 5 显示，LN-Ultra 在推理和非推理基准测试中，与所有现有的开源权重模型相比表现持平或更优。它在 GPQA 上达到了开源模型中的最先进水平，充分证明了英伟达研究者大规模强化学习训练方法的有效性。

与 DeepSeek-R1 需要使用 8×H200 的硬件配置不同，LN-Ultra 专门优化为可在单个 8×H100 节点上高效运行，从而提供更高的推理吞吐量和部署效率。

从表 5 可见，LN-Ultra 的 SFT 阶段已经在多个推理基准测试（包括 GPQA 和 AIME）上接近或达到 DeepSeek-R1 的性能。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b1b7270b3da246cba73cb283c69d68c9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=ekoWlNBS73du0GME5GY318HUKH0%3D)

除了模型原本接受训练的推理和对话能力之外，他们还对模型在一个 **分布外任务** 。

具体来说，模型在 **JudgeBench** 数据集上进行了测试，要求区分 **高质量与低质量的回答** 。

如表 6 所示，新模型在该任务上表现优于当前顶尖的专有模型和开源模型。

其中， **LN-Ultra 成为表现最好的开源模型** ，明显超过了 DeepSeek-R1，仅次于专有模型 o3-mini(high)。

此外， **LN-Super 的表现也超过了 o1-mini** ，这说明新模型在各类任务中具备 **很强的泛化能力** 。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/45fa33eefb7a4d97bc2a077ee21ad768~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5paw5pm65YWD:q75.awebp?rk3s=f64ab15b&x-expires=1747126352&x-signature=1%2FYsVTwJkaLy1Y7X54lKafdk6UQ%3D)

参考资料：

[arxiv.org/abs/2505.00…](https://link.juejin.cn/?target=https%3A%2F%2Farxiv.org%2Fabs%2F2505.00949 "https://arxiv.org/abs/2505.00949")

评论 0

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

APP内打开