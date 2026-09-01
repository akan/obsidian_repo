---
title: "量化不再是代价，而是教学机会 ——4-bit 模型反超全精度原版，QAH 深度解读"
source: "https://mp.weixin.qq.com/s/6OQv2Lp1KDwK6BydI_yKiQ"
author:
  - "[[何码先生]]"
published:
created: 2026-09-01
description:
tags:
  - "量化感知修复"
  - "模型压缩"
  - "4-bit 量化"
  - "知识蒸馏"
  - "KL 散度"
  - "MXFP4"
  - "教师选择"
  - "性能反超"
  - "训练稳定性"
  - "部署优化"
abstract: "通过将教师从恢复后的检查点替换为原始模型，QAH 方法让 4-bit 压缩模型在多数基准上反超全精度版本，实现了更小、更便宜且更准确的部署。"
---
何码先生 代码的使命 *Aug 26, 2026, 1:35 PM*

2026 年 8 月 25 日，Multiverse Computing 团队在 Hugging Face 博客发布了一项「反常识」成果：他们把 OpenAI 的 **GPT-OSS 120B** 结构压缩到 **60B** ，再量化成 **4-bit（MXFP4）** ，然后用一种名为 **Quantization-Aware Healing（QAH，量化感知修复）** 的方法做恢复训练。结果：这个 4-bit 小模型在 9 项基准中 **7 项反超了它自己的 bfloat16 全精度检查点** ，甚至在代码生成上赢过了 120B 的原始教师。

更小、更便宜、更准确——三者同时成立，这颠覆了「压缩必损精度」的常识。而它的底层逻辑，不是新的压缩算法，也不是新的量化算法，而是整个部署管线里最容易被忽略、也最决定上限的一步—— **修复（Healing）阶段的「教师选择」** 。

> "Quantization stops being a tax you pay for efficiency and becomes an extra opportunity to teach the model."  
> ——量化不再是效率的代价，而变成了一次额外的教学机会。

01为什么模型需要「压缩—量化—修复」三步曲

先把背景讲清楚。大模型部署的第一个问题是物理的：一个 120B 参数的模型，用 bfloat16 存储，权重就要占 **约 240GB 内存** （仅权重；注：gpt-oss-120b 实际总参数为 117B，此处按博客 120B 口径估算），加上激活和 KV 缓存，四张 80GB 的 H100 才勉强放下，推理时每 token 的算力与显存开销也随模型规模水涨船高（gpt-oss 为 MoE 架构，计算量实际随激活参数变化，此处按总参数口径简述）。把成本压下来，行业形成了约定俗成的三步管线：

**① 结构压缩（Compress）** ：删掉冗余的层、注意力头或神经元，把参数量从 120B 砍到 60B——参数是真的被移除了。

**② 量化（Quantize）** ：把幸存下来的权重从 16 位压到 4 位，60B 参数的权重内存降到约 30GB，单卡可跑。

**③ 修复（Healing）** ：上生产环境之前，再训练一步，把前两步「打掉」的能力补回来。

OpenAI 的 gpt-oss 系列、NVIDIA 的 Nemotron 家族、以及 Multiverse Computing 自己的 Hypernova 60B，全都依赖某种版本的「先压缩、后修复」方案。前两步是成熟技术，问题出在第三步： **「修复」到底应该怎么做？** ——压缩和量化叠加后，推理、数学、代码生成能力会系统性退化，但公开文献里这一步几乎是空白，大家靠直觉和昂贵的试错在填坑。

02两个默认方案：一个贵而脆，一个锚错了目标

修复阶段有两个默认做法，QAH 论文逐一拆掉了它们的台子。

方案一：QAT（量化感知训练）——贵且不稳定

在前向传播中插入伪量化算子，让模型在「更嘈杂的低精度前向」下用任务损失（交叉熵）微调。问题有两个：一是 **成本高** ——等于把监督微调、RLHF、智能体调优整套多阶段后训练在更低精度下重跑一遍；二是 **不稳定** ——实验显示训练一旦越过最佳点继续跑，QAT 会急剧退化甚至崩溃，你需要掐着秒表做早停。

方案二：QAD（量化感知蒸馏）——假设在结构压缩后崩塌

用 KL 散度损失，把冻结的全精度教师蒸馏到量化学生。它成立的前提是： **模型只被量化、没被压缩** ——这时存在一个同架构的全精度版本可以当教师。但一旦做过结构压缩，这个前提就碎了： **一个 60B 的模型从来没有被独立地全精度训练过** ，唯一现成的 bfloat16 检查点，本身就是从原始模型蒸馏恢复出来的「有损近似品」。

从它蒸馏，等于 **复制一份复制品** ：学生学到的目标里混着上一阶段的损失，天花板被钉死在这个检查点自己的水平上。用个比喻：你只有一把四根弦的吉他，想弹交响乐，却拿着别人凭耳朵记下来的钢琴缩谱练习——你练得再好，也只是把「别人的猜测」弹得更像而已。正确的做法是：直接对着原版录音练。

图 1｜修复阶段的两个教师选择：错位的锚点 vs 直达本源

原始模型 GPT-OSS 120B（全尺寸 · 未压缩）

压缩 ↓ 120B → 60B

60B bfloat16 恢复检查点（有损近似 · 从未全精度独立训练）

量化 ↓ bf16 → MXFP4

60B MXFP4 学生

**QAD 路径（锚错目标）**  
学生 ← 恢复检查点 ← 原始模型  
复制一份复制品，能力被锚定在检查点的天花板

**QAH 路径（直达本源）**  
学生 ← 原始模型（跳过中间商）  
跨架构蒸馏，学生直接对齐原始输出分布

03QAH：跳过中间商，直接从原始模型蒸馏

QAH 的核心改动只有一句话： **把教师从「恢复后的 bfloat16 检查点」换成「压缩前的原始模型」** 。

**教师** ：压缩前的原始模型，全尺寸、未压缩（120B，冻结；注：其权重为 gpt-oss 原生 MXFP4 格式，博客所称「full-precision」指「未压缩」，并非 bf16 高精度存储）； **学生** ：压缩后的一半尺寸模型，以 MXFP4 4-bit 精度运行。师生架构无需一致——教师的输出分布与架构无关，尺寸和形状的不匹配完全不妨碍知识迁移。学生全程不接触硬标签，只通过 logits 上的 KL 散度对齐教师的输出分布。

这个改动还带来一个视角的转换。原本，量化被看作「修复完成后的有损后处理」；在 QAH 的框架里，量化被重新定义为 **「针对原始教师的第二次完整蒸馏」** ——这是 bfloat16 检查点从未得到过的监督信号。4-bit 学生不是在「补偿量化丢失的信息」，而是在「补收早期恢复阶段因为时间和数据不足而没来得及迁移的信息」。

图 2｜传统管线 vs QAH 管线

传统（QAT / QAD）

120B 原始模型  
↓ 压缩  
60B bf16 检查点  
↓ 量化  
60B 4-bit  
↓ 修复  
**从恢复检查点蒸馏  
（或 QAT 硬标签微调）**

学生天花板 = 检查点水平  
QAT 还需小心早停

QAH（本方法）

120B 原始模型  
↓ 压缩  
60B bf16 检查点  
↓ 量化  
60B MXFP4  
↓ 修复  
**从原始模型蒸馏  
（KL logits · 分块计算）**

突破检查点天花板  
稳定不崩溃 · 无需早停

04稳定性红利：KL 散度为什么比交叉熵「温和」

QAH 还有一个反直觉的副产品： **训练稳定性来自损失函数本身** 。两种损失的学习动力学完全不同：

KL 蒸馏：饱和即停

学生被绑定到一个 **固定的教师分布** 上。一旦学生追上了教师，就没有继续漂移的压力——目标实现了，梯度自然归零。

交叉熵任务损失：永不满足

它会 **无限期** 地推动学生向硬标签靠近，即使越过最优解也不停手——这正是 QAT 过峰后崩溃的机制：持续施压最终侵蚀了模型从原始权重继承下来的能力。

论文做了一个同条件头对头实验：把 GPT-OSS 9B 量化为 MXFP4（原文如此；注：OpenAI 官方公开的 gpt-oss 系列只有 20B / 120B 两个型号，9B 疑为博客笔误或内部压缩变体），分别用 QAH 和 QAT 修复，跟踪 MMLU-Pro、LiveCodeBench、GPQA Diamond 的平均分随训练步数的变化：

图 3｜QAH vs QAT：谁更稳？（示意曲线，基于论文数据）

<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;" role="img" aria-label="插图"><line x1="60" y1="250" x2="580" y2="250" stroke="#bbb" stroke-width="1.5"></line><line x1="60" y1="250" x2="60" y2="20" stroke="#bbb" stroke-width="1.5"></line><line x1="60" y1="200" x2="580" y2="200" stroke="#f0f0f0" stroke-width="1"></line><line x1="60" y1="150" x2="580" y2="150" stroke="#f0f0f0" stroke-width="1"></line><line x1="60" y1="100" x2="580" y2="100" stroke="#f0f0f0" stroke-width="1"></line><line x1="60" y1="50" x2="580" y2="50" stroke="#f0f0f0" stroke-width="1"></line><text x="48" y="254" text-anchor="end" font-size="12" fill="#999"><tspan leaf="">30</tspan></text> <text x="48" y="204" text-anchor="end" font-size="12" fill="#999"><tspan leaf="">40</tspan></text> <text x="48" y="154" text-anchor="end" font-size="12" fill="#999"><tspan leaf="">50</tspan></text> <text x="48" y="104" text-anchor="end" font-size="12" fill="#999"><tspan leaf="">60</tspan></text> <text x="60" y="272" text-anchor="middle" font-size="12" fill="#999"><tspan leaf="">0</tspan></text> <text x="230" y="272" text-anchor="middle" font-size="12" fill="#999"><tspan leaf="">400</tspan></text> <text x="410" y="272" text-anchor="middle" font-size="12" fill="#999"><tspan leaf="">800</tspan></text> <text x="580" y="272" text-anchor="middle" font-size="12" fill="#999"><tspan leaf="">1200 步</tspan></text> <polyline points="60,238 130,120 175,116 300,118 450,117 580,119" fill="none" stroke="#736de9" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline><polyline points="60,238 180,205 300,160 430,118 500,138 560,212 580,230" fill="none" stroke="#ff6146" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></polyline><circle cx="130" cy="120" r="5" fill="#736de9"></circle><text x="130" y="104" text-anchor="middle" font-size="12" fill="#736de9" font-weight="700"><tspan leaf="">峰值 54.9 @ ~100 步</tspan></text> <circle cx="430" cy="118" r="5" fill="#ff6146"></circle><text x="452" y="112" font-size="12" fill="#ff6146" font-weight="700"><tspan leaf="">峰值 54.6 @ ~700 步</tspan></text> <text x="500" y="250" font-size="12" fill="#ff6146"><tspan leaf="">1200 步后 QAT 崩掉近 19 分</tspan></text> <line x1="120" y1="30" x2="150" y2="30" stroke="#736de9" stroke-width="3"></line><text x="156" y="35" font-size="13" fill="#333"><tspan leaf="">QAH（KL 蒸馏）</tspan></text> <line x1="330" y1="30" x2="360" y2="30" stroke="#ff6146" stroke-width="3"></line><text x="366" y="35" font-size="13" fill="#333"><tspan leaf="">QAT（交叉熵）</tspan></text></svg>

数据来源：原文博客「QAH against QAT, head to head」章节（GPT-OSS 9B → MXFP4，三项基准平均分；曲线形状为示意图）

结果很戏剧化：两者峰值几乎持平（54.9 vs 54.6），但 QAH 约 **100 步** 就到顶，且之后训练始终在峰值 2 分以内徘徊；QAT 要到约 **700 步** 才见顶，到 1200 步时已经崩掉近 **19 分** 。也就是说，QAH 达到同等质量快约 **7 倍** ，而且充分训练的 QAH 检查点可以 **安全直接上线，不需要任何早停技巧** ——这对生产团队是实打实的省心。

05技术细节：32k 长上下文、离线 logits 与 MXFP4

QAH 不是一句口号，工程上要啃三块硬骨头：

① 分块 KL 散度损失（长上下文的关键）

在 32k token 的长文档上做蒸馏，naive 实现要物化「序列 × 词表」的完整 logits 网格，显存直接爆掉。QAH 复用了姊妹论文《Making Knowledge Distillation Cheap Enough to Run at Scale》里的 **内存高效分块 KL 损失** ：每次只计算序列一个切片（slice）的 KL，从不物化完整网格，让 32k 上下文修复在固定 GPU 内存预算内完成。

② 教师 logits 离线预计算

120B 教师是冻结的，它的输出分布可以 **提前算好存成特征** ，训练学生时直接读缓存，不必反复跑教师前向——把最贵的一次推理成本摊到离线阶段。

③ 量化格式：MXFP4 是什么

MXFP4（Microscaling FP4）是 OCP（开放计算项目）定义的 4-bit 浮点格式，也是 gpt-oss 的原生训练精度。每个元素用 **E2M1** 布局（1 符号位 + 2 指数位 + 1 尾数位）；32 个元素组成一块，共享一个 8-bit 的 E8M0 缩放因子。均摊后每个参数约 **4.25 bit** 。块级缩放让每个局部块拥有独立的动态范围，能更好地吸收局部异常值（这正是全局缩放的 INT4 最容易翻车的地方），这也是 4-bit 能当「教学环境」而不是「破坏环境」的物理基础。

图 4｜MXFP4：32 元素一块，共享一个 8-bit 缩放因子

<svg viewBox="0 0 600 190" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block;" role="img" aria-label="插图"><g font-size="11" fill="#555" text-anchor="middle"><rect x="80" y="40" width="90" height="34" rx="6" fill="#f0edff" stroke="#736de9"></rect><text x="125" y="61"><tspan leaf="">x₁</tspan></text> <rect x="174" y="40" width="90" height="34" rx="6" fill="#f0edff" stroke="#736de9"></rect><text x="219" y="61"><tspan leaf="">x₂</tspan></text> <rect x="268" y="40" width="90" height="34" rx="6" fill="#f0edff" stroke="#736de9"></rect><text x="313" y="61"><tspan leaf="">x₃</tspan></text> <rect x="362" y="40" width="46" height="34" rx="6" fill="#f0edff" stroke="#736de9"></rect><text x="385" y="61"><tspan leaf="">⋯</tspan></text> <rect x="412" y="40" width="90" height="34" rx="6" fill="#f0edff" stroke="#736de9"></rect><text x="457" y="61"><tspan leaf="">x₃₂</tspan></text></g> <rect x="516" y="34" width="76" height="46" rx="6" fill="#736de9"></rect><text x="554" y="54" font-size="12" fill="#fff" text-anchor="middle" font-weight="700"><tspan leaf="">共享缩放</tspan></text> <text x="554" y="72" font-size="11" fill="#e6e2fa" text-anchor="middle"><tspan leaf="">8-bit E8M0</tspan></text> <path d="M 512 57 L 508 57" stroke="#736de9" stroke-width="2"></path><path d="M 80 86 L 80 100 Q 80 108 88 108 L 462 108 Q 470 108 470 100 L 470 86" fill="none" stroke="#736de9" stroke-width="2"></path><text x="275" y="128" font-size="12" fill="#736de9" text-anchor="middle"><tspan leaf="">一个块 = 32 个元素（每个 4-bit，E2M1：1 符号 + 2 指数 + 1 尾数）</tspan></text> <text x="275" y="150" font-size="12" fill="#999" text-anchor="middle"><tspan leaf="">每块独立动态范围 → 局部异常值被「兜住」，均摊成本 ≈ 4.25 bit/参数</tspan></text></svg>

06数据说话：7/9 反超，增益最大的恰是最痛的伤

主实验：GPT-OSS 120B → 压缩到 60B → bfloat16 恢复 → QAH 下量化为 MXFP4。对照组是「该架构最完整的全精度版本」——60B bfloat16 检查点：

基准（能力域）

120B 教师  
(MXFP4)

60B BF16  
(恢复后)

60B MXFP4  
(QAH)

AA-LCR（长上下文推理）

50.0

35.3

42.7 ▲+7.4

AIME 2025（竞赛数学）

80.0

70.7

76.3 ▲+5.6

Aider（智能体编码）

45.3

38.2

40.9 ▲+2.7

τ²-bench（工具使用）

68.4

59.4

61.7 ▲+2.3

GPQA Diamond（科学）

69.0

65.7

67.4 ▲+1.7

IFBench（指令跟随）

63.3

58.4

59.9 ▲+1.5

LiveCodeBench（编码）

66.0

65.5

66.5 ▲+1.0

MMLU-Pro（知识）

78.0

74.0

73.8 ▼−0.2

SciCode（科学编码）

37.5

35.6

34.2 ▼−1.4

三个值得注意的点：

**① 增益最大的恰是压缩伤得最重的能力** ：长上下文推理 +7.4、竞赛数学 +5.6，说明 QAH 的「修复」不是均匀抹平，而是精准补血。  
  
**② 对 120B 教师也不落下风** ：参数只有教师一半、权重内存约其 1/4，却在 LiveCodeBench 上反超（66.5 > 66.0），GPQA 仅差 1.6 分。  
  
**③ 唯一的大缺口在 AA-LCR** ：42.7 vs 50.0 差 7.3 分——论文直言，极端长上下文是压缩后「本质上最难恢复」的能力，这是下一步要啃的硬骨头。

07效率账本：一半参数、四分之一内存、八倍计算削减

**权重内存 ≈ 1/4** ：60B 参数的 bfloat16 需要约 120GB，MXFP4 只需约 30GB（4 bit/值 + 每块 8-bit 缩放）。

**每 token 计算量 ≈ 减半** ：相比 120B 教师，参数量砍半，能在显著更小的硬件上跑。

**组合账 ≈ 8 倍** ：如果模型家族以 bfloat16 形式交付（120B bf16 ≈ 240GB），参数减半 × 精度降 4 倍，每 token 计算量理论削减约 8 倍。

更关键的是，这个账本不再以牺牲质量换取。团队已将产物 **Hypernova-60B** 以开放权重发布（依据：arXiv 论文摘要 "released open-weight as Hypernova-60B"；注意博客原文未直接声明这一点，模型卡名为 Hypernova-60B-2605），配方论文公开——意味着「压缩—量化—修复」这个流程，有了一个可复现、不用数周超参搜索的现成菜谱。

08理性看待：局限与开放问题

「4-bit 反超全精度」很抓眼球，但作为工程人员，我们得把这篇论文放在证据链的恰当位置上：

**① 单一模型家族的证据** ：核心实验只在 GPT-OSS 120B → 60B → MXFP4 一条管线上验证，跨架构、跨规模、跨量化格式的普适性尚未证明。  
  
**② 并非全面超越** ：MMLU-Pro（−0.2）和 SciCode（−1.4）两处落后，说明知识类与科学编码能力的恢复还有缺口。  
  
**③ 极端长上下文依旧最难** ：AA-LCR 与教师差 7.3 分，是压缩损伤中最顽固的部分。  
  
**④ 部署层还有坑** ：论文披露了一个「大且可复现的分布式训练后端质量差距」——同样的配方，不同分布式后端跑出来的模型质量可能明显不同，这提醒我们工程复现时不能只看配方本身。

09落地指南：什么场景用得上 QAH

✅ 它解决什么

「结构压缩 + 量化」之后的能力恢复阶段——在 4-bit 学生上做一次针对原始教师的蒸馏，用约 QAT 七分之一的时间拿到更高、且不会越训越崩的质量。

🔵 它不解决什么

量化算法本身（GPTQ、AWQ、SmoothQuant、MXFP4 是另一层技术栈）。QAH 是「修复层」方法，理论上可以叠加在任意量化格式之后——论文用 MXFP4 只是因为 gpt-oss 的原生精度就是它。

✅ 适合的场景

① 你有原始模型的权重（QAH 需要教师 logits 做离线预计算，仅有 API 文本访问是不够的），正在做模型家族的小型化；② 目标是 4-bit 部署且硬件/推理栈支持 MXFP4 类格式；③ 你受够了 QAT 的早停玄学，想要「训完直接上线」的确定性。

⛔ 何时别用

① 只有量化、没有结构压缩——传统 QAD 就够，别杀鸡用牛刀；② 没有原始模型权重或访问能力——巧妇难为无米之炊；③ 算力/数据预算连一次蒸馏都撑不起；④ 你的部署硬件不支持 4-bit 加速——内存省了但计算红利吃不到。

10总结

**💡 1｜「教师选择决定天花板」是普遍教训。** QAH 的本质是发现了一个错位的锚点。类似的事在蒸馏、微调、RLHF 里每天都在发生——用「已经被降级的产物」当参照系，天花板就被悄悄锁死。做任何训练管线，先问一句：我的监督信号来自本源，还是来自二手转述？

**💡 2｜损失函数塑造学习动力学。** 交叉熵「永不满足」，KL 蒸馏「饱和即停」——前者带来过拟合崩溃，后者带来稳定收敛。这不是玄学，是目标函数几何性质的直接后果。设计训练流程时，把「何时停止」也当成损失函数设计的一部分。

**💡 3｜「压缩—量化」从减法变成加法。** 过去量化是效率税，付完钱还要再花一笔修复费。QAH 的视角转换是：低精度约束下的二次蒸馏，反而让学生学会了更紧致的表征。这与「困难模式训练」的直觉暗合——约束有时不是障碍，而是正则化。

**💡 4｜MXFP4 生态正在合流。** gpt-oss 原生用它，Blackwell 张量核原生支持它；据公开资料，昇腾 A5/950 等国产加速卡也在架构层面提供 MX 格式适配，DeepSeek V4 已将其用于 MoE 专家权重（后两项属第三方公开资料口径，建议以官方文档为准）。4-bit 从「部署妥协」变成「原生训练精度」是大趋势——QAH 恰好卡在训练与部署的交汇点上，时机很好。

**💡 5｜「配方类研究」的价值被低估了。** QAH 没有新架构、没有新损失函数，只是把已有组件重新组合并给出了严谨的对照实验。但就是这种「把试错变成菜谱」的工作，最直接地降低了工程复现成本——论文摘要最后那句「目标是一个无需数周超参搜索即可部署的配方」，对生产团队的价值不亚于一个新模型。

写在最后

QAH 给我们讲了一个关于「参考系」的故事：一个压缩的、4-bit 的模型，不必是它全精度祖先的低精度近似——只要它对准的目标足够本源，它可以同时更小、更便宜、更准确。

量化不再是从模型身上割肉，而是给模型上第二次课的机会。下一次有人告诉你「压缩必损精度」时，你可以把这篇论文甩过去： **那要看你的学生，是在跟谁学。**

📚 参考阅读（可长按复制）

1\. 原文博客｜Quantization-Aware Healing: a compressed, 4-bit model that outperforms its full-precision original

https://huggingface.co/blog/MultiverseComputingCAI/quantization-aware-healing

2\. 论文｜Quantization-Aware Healing: A Practical Recipe for Recovering Compressed, 4-Bit LLMs（arXiv:2608.20953）

https://arxiv.org/abs/2608.20953

3\. 教师模型｜OpenAI gpt-oss-120b（原生 MXFP4 训练）

https://huggingface.co/openai/gpt-oss-120b

4\. 开源产物｜MultiverseComputingCAI/Hypernova-60B-2605（QAH 修复后的 60B MXFP4 模型）

https://huggingface.co/MultiverseComputingCAI/Hypernova-60B-2605

5\. 姊妹文章｜Making Knowledge Distillation Cheap Enough to Run at Scale（分块 KL 损失出处，Hugging Face Blog，2026-08-10）

https://huggingface.co/blog/MultiverseComputingCAI/efficient-knowledge-distillation