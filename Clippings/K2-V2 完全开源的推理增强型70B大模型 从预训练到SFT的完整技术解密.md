---
title: "K2-V2：完全开源的推理增强型70B大模型，从预训练到SFT的完整技术解密"
source: "https://mp.weixin.qq.com/s/K05CRIy7IOrsv6ayM19FJw"
author:
  - "[[闲记算法]]"
published:
created: 2026-03-31
description: "【速读摘要】：该论文介绍了 K2-V2，一个 70B 参数的完全开源大语言模型，由 MBZUAI 的 In"
tags:
  - "开源大模型"
  - "推理增强"
  - "三阶段训练"
  - "技术透明"
abstract: "K2-V2是一个完全开源的70B参数大语言模型，其核心创新在于通过Mid-training阶段注入推理能力，并采用三阶段训练Pipeline，实现了强大的推理性能和长上下文支持。"
---
Original 闲记算法 *2026年3月15日 00:24*

【速读摘要】：该论文介绍了 K2-V2，一个 70B 参数的完全开源大语言模型，由 MBZUAI 的 Institute of Foundation Models 开发。K2-V2 采用三阶段训练 Pipeline： **Pre-training** （12.25T tokens，建立广泛知识基础）、 **Mid-training** （4个阶段约 2.2T tokens，注入推理能力与长上下文支持）和 **SFT** （10B tokens，three levels of reasoning effort 机制，类似 GPT-OSS）。核心创新在于通过 Mid-training 将推理行为（thinking traces、reasoning behaviors）直接注入基础模型，而非仅依赖后期 SFT/RL。预训练采用严格的数据去重与质量上采样策略（TxT360 语料库），Mid-training 引入超过 2.5 亿道数学题的合成推理数据，SFT 通过 `low` / `medium` / `high` 三种 reasoning effort levels 实现单一模型支持不同 test-time compute budgets。论文完整公开了全部数据配方、超参数和训练日志。经过简单 SFT 后，K2-V2 在 AIME 2025 上达到 80.2%，接近 Qwen3-235B 的 88.8%，并在逻辑推理任务（KK-8 People: 82.8%）上 reportedly 超越 DeepSeek-R1 和 o3-mini-high。

【论文链接】：arXiv:2512.06201 <sup>[1]</sup> （Technical Report）

【机构信息】：Mohamed bin Zayed University of Artificial Intelligence（穆罕默德·本·扎耶德人工智能大学，阿联酋）

【开源链接】：

- Model Weights: https://huggingface.co/collections/LLM360/k2-v2 <sup>[2]</sup>
- Training Log: https://wandb.ai/llm360/K2-V2 <sup>[3]</sup>
- Evaluation: https://github.com/llm360/eval360 <sup>[4]</sup>
- Training: https://github.com/llm360/k2v2\_train <sup>[5]</sup>
- Pre-training Data: https://huggingface.co/datasets/LLM360/TxT360 <sup>[6]</sup>
- Mid-training Data: https://huggingface.co/datasets/LLM360/TxT360-Midas <sup>[7]</sup>
- SFT Data: https://huggingface.co/datasets/LLM360/TxT360-3efforts <sup>[8]</sup>

【关键词】：完全开源, Reasoning-Enhanced LLM, Mid-training, Long Context, Tool Use, Dense Transformer, Grouped Query Attention, RoPE, TxT360

---

## 1\. 背景与核心洞察 (The Core Insight)

### 1.1 问题意识：开源模型的困境

当前大模型领域呈现一个显著的"透明度悖论"：随着前沿模型能力的激增，其开发细节（数据组成、基础设施配置、训练动态）却日益成为"黑盒"。K2-V2 的提出正是为了打破这一困境—— **不仅要开源，还要开源得足够强大，以至于对研究和生产都有实际价值** 。

论文作者指出，仅做到"开放"已不足够。弱基础模型上的推理调优难以产生有意义的科学洞见。因此，K2-V2 的定位是：

1. **模型实用性** ：提供可适应的强基础，支持持续训练和领域适配
2. **开放科学加速** ：作为透明的高能力测试平台，使研究者能够严谨地解剖数学推理、Agentic Workflow 等高级认知行为的涌现机制

### 1.2 核心假设：推理能力应在 Mid-training 阶段注入

传统 Pipeline 将推理能力保留到 Fine-tuning 阶段。K2-V2 的核心洞察是： **应在 Mid-training 阶段就引入推理行为（如规划、逻辑演绎、回溯），将其建立为核心原语** 。这一策略通过以下机制实现：

- 在预训练后的 Mid-training 阶段引入大量合成推理数据（thinking traces 和 reasoning behaviors）
- 同时扩展上下文长度（从 8K 到 512K），使模型具备长程逻辑一致性
- 通过精心设计的 Data Curriculum 管理分布漂移风险

## 2\. 技术方案深度拆解 (The "How")

### 2.1 整体训练 Pipeline

![K2-V2 训练阶段概览](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "K2-V2 训练阶段概览")

K2-V2 的训练分为三大阶段，每个阶段都有明确的能力目标和独特的工程挑战：

| 阶段 | 目标 | 关键挑战 | 核心策略 |
| --- | --- | --- | --- |
| **Pre-training** | 建立广泛知识基础 | 有效 Scaling（训练动态、数据规模） | 严格训练动态监控、大规模数据筛选 |
| **Mid-training (4 stages)** | 专业化、长上下文扩展、推理行为注入 | 计算瓶颈、分布漂移、高质量长上下文数据稀缺 | Context Parallel、精确 Token Mixture、合成数据增强 |
| **SFT** | 工具能力注入、行为定型 | 平衡推理与效率 | three levels of reasoning effort |

### 2.2 模型架构

K2-V2 采用标准的 Decoder-only Dense Transformer：

```
总参数量: 70B
层数: 80
隐藏维度: 8,192
FFN 中间维度: 28,672
注意力头数: 64 (每头维度: 128)
KV 头数: 8 (Grouped Query Attention)
位置编码: RoPE (θ = 500,000)
归一化: RMSNorm (ε = 1e-5)
```

**关键设计选择** ：

- **GQA (Grouped Query Attention)** ：将 64 个 Query 头共享到 8 个 KV 头，显著降低推理时的 KV Cache 内存占用
- **RoPE base frequency** ：预训练阶段设为 500K，Mid-training 第三阶段提升至 10M 以支持长上下文（关键发现：1M base frequency 在 128K 上下文上表现不佳）

### 2.3 预训练配方

#### 2.3.1 超参数设计哲学

论文提出了几个关键原则：

1. **优先样本效率而非步数效率** ：对于固定 Token 预算的数据有限运行，不追求 Critical Batch Size（平衡样本和步数效率的临界点），而是操作在 **样本高效区域** （通常 ）
2. **通过平均时间尺度表征优化器动态** ：避免孤立调整 Learning Rate 和 Weight Decay，而是通过 **有效平均时间尺度** （effective averaging timescale）来刻画优化器行为：

其中 为 batch size， 为 learning rate， 为 weight decay， 为总 tokens 数。该值近似 AdamW 指数平均参数更新的有效 Epoch 数。

1. **超参数需与学习动态、数值实现、硬件约束和课程设计协同设计**
	论文指出，单纯遵循 Scaling Law 预测的最优超参数存在实际挑战：
- **Batch Size 受硬件约束** ：Scaling Law 建议的 batch size（1136 sequences）需要根据实际加速器数量调整为 1200 sequences 以满足 MLSys 约束
	- **小 Learning Rate 与数值精度交互** ：过小的学习率可能与数值精度产生负面交互
	- **Scheduler 设计与课程设计关联** ：预训练阶段观察到底于 1% peak LR 时 loss 和参数范数出现停滞（stale），因此修改 cosine decay-to-zero 为 cosine decay-to-floor（），这一修改同时简化了向 Mid-training 阶段的过渡
	- **Shape of decay 相对次要** ：257M 参数 pilot 实验（41.48B tokens）显示，cosine decay-to-zero、cosine decay-to-10%、linear d2z 三种 schedule 的验证 loss 差异可忽略（2.815 vs 2.845 vs 2.817），关键在 peak 和 final values

#### 2.3.2 最终超参数

| 参数 | 数值 | 说明 |
| --- | --- | --- |
| Learning Rate |  | 参考 Llama3-70B 并验证小规模外推 |
| Batch Size | 1200 sequences ( tokens) | Scaling Law 建议 1136，调整为 1200 以满足硬件约束 |
| Weight Decay | 0.05 | 目标 |
| 训练步数 |  | 基于 12.25T tokens / 9.8M batch size |
| 学习率调度 | Cosine decay to floor | 观察到底于 1% peak LR 时 loss 停滞，故设置 floor |

#### 2.3.3 预训练数据：TxT360

预训练语料库约 **12T tokens** ，组成如下：

| 类别 | 数据来源 | 词数（约） | 关键特征 |
| --- | --- | --- | --- |
| **English Web** | CommonCrawl (99 dumps) | 3.5T | URL 过滤、行级清洗、全局去重 |
|  | TxT360-BestOfWeb | 695B | FineWeb-Edu 分类器筛选的高质量子集 |
| **Synthetic QA** | TxT360-QA | 950B | 基于 TxT360 文档用 Mistral-7B 生成 |
| **Papers** | ArXiv, PubMed, S2ORC, PhilPapers | 107B | 专用预处理管道 |
| **Math** | MegaMath, DM Math, OpenWebMath, MathPile | 344B | 数学专注语料 |
| **Code** | RefineCode (含 FIM 和 Topo-Sorted 变体) | 525B | 代码仓库拓扑排序、Fill-in-the-Middle |
| **Multilingual** | Jais Arabic, EuroParl | 204B | 阿拉伯语为重点 |
| **Other** | Wikipedia, FreeLaw, StackExchange 等 | 约 100B | 高质量多样化源 |

**核心清洗与处理细节** ：

1. **CommonCrawl 处理 Pipeline（TxT360-CC）** 从 99 个 WARC 快照出发，经过多阶段处理：
	最终保留约 64 亿文档，35 万亿词，平均 544 词/文档。
- **文本提取与语言识别** ：提取原始文本并识别语言
	- **URL 过滤与行级清洗** ：基于 URL 模式过滤，行级别清洗
	- **文档级质量过滤** ：包含 Repetition Removal、Document Filtering、Line Correction
	- **PII 移除** ：个人身份信息删除
	- **局部精确去重** ：在全局模糊去重前执行，降低计算开销
	- **全局模糊去重** ：使用 MinHash 算法（128 permutations，13-grams），基于 Jaccard 相似度识别近重复文档
3. **高质量子集筛选（TxT360-BestOfWeb）**
- 使用 **ProX 文档过滤模型** （小型语言模型执行文档级过滤）
	- 结合 **格式评分** （format score）：评估标题、列表、表格、代码块、链接密度、样板文本等文档呈现特征
	- 仅保留约 **22%** 的高质量、结构良好的页面
	- 该子集文档长度分布更长（中位数更高），便于灵活上采样
5. **全局近去重（Global Near-Deduplication）技术细节**
- 阶段 1：使用 Bloom filter（容量 10 亿，假阳性率 0.001）进行精确去重，消除约 17% 的精确重复
	- 阶段 2：MinHash 签名生成前对文本清洗（小写转换、移除标点、连续空格/换行/制表符），使用 13-grams 作为特征
- **两阶段去重策略** ：
	- **代表性文档选择** ：优先保留 curated 文档 > CommonCrawl 文档，较新文档 > 旧文档
	- **去重收益** ：防止训练-测试重叠、缓解 double descent 现象、降低记忆化风险、实现可控上采样
8. **基于重复次数的质量上采样**
- 文档重复次数作为质量信号（文档持续年限的代理）
	- 上采样权重：2-5 次重复 → 3x；5-100 次 → 5x；101-1000 次 → 8x；>1000 次 → 10x
	- 非 CommonCrawl 数据源：重复 >1 次则赋予 2x 权重
10. **领域专用预处理**
- FIM 变体：使用 `<|fim_prefix|>` 、 `<|fim_middle|>` 、 `<|fim_suffix|>` 特殊 token 重组代码
	- Topo-Sorted 变体：按仓库拓扑排序（基于 import 依赖图），确保依赖先定义后使用
- **ArXiv** ：LaTeX → Markdown（Pandoc 转换），保留表格、数学块、章节标题结构，移除图表和参考文献列表
	- **S2ORC** ：提取标题、摘要、章节文本，要求有效英文摘要（>20 词），应用 unigram 概率过滤
	- **PubMed** ：JATS XML → 文本（PMC），简化 XML 结构提取（PMA）
	- **PhilPapers** ：PDF → 文本，移除连字符、页眉页脚，规范化空白符
	- **代码数据（RefineCode）** ：
13. **Synthetic QA 生成与验证**
- 使用 Mistral-7B-Instruct-v0.3 基于 TxT360-BestOfWeb 文档生成问答对
	- 格式：原始文档文本 + 多组 Q-A 对附加在文档末尾
	- **LLM-as-a-judge 验证** ：随机抽取 8000 文档，判断 Q-A 对是否完全基于文档内容，平均得分 >95%
	- 质量问题分类：低质量（通用模板化问题，弱文档锚定）vs 高质量（属性中心，紧密锚定具体字段/实体）

**Tokenizer** ：自定义 Byte-Level BPE，针对英语和阿拉伯语优化 fertility score，初始词汇表覆盖阿拉伯、拉丁、西里尔、天城文和 CJK 脚本。预分词管道使用自定义 regex 处理代码语法、空白符合并、标点隔离。

**预训练数据配比概览** ：

![预训练数据混合饼图](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "预训练数据混合饼图")

上图展示了 K2-V2 预训练数据的领域分布。English Web（包括 CommonCrawl 和 TxT360-BestOfWeb）构成最大比例，其次是 Code、Synthetic QA、Math 等领域。这种分布确保了模型在广泛知识覆盖的同时，对代码、数学和推理任务有专门的优化。

### 2.3.4 预训练动态与稳定性分析

K2-V2 的预训练过程在 1.25M steps 中展现了丰富的训练动态特征。作者团队通过系统性的监控和干预策略，确保了训练的稳定性和最终模型质量。

#### 关键观察 1：Loss Spikes 的时空分布

![Loss Spikes 分布直方图与损失曲线](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "Loss Spikes 分布直方图与损失曲线")

**核心发现** ：

- **Loss spikes 高度集中在训练前 40%** ，尤其在最初 20% 阶段频率最高
- 使用 robust local z-score（滚动窗口中位数绝对偏差）量化异常：，阈值设为
- 这一分布模式与优化器时间尺度 的调参密切相关

#### 关键观察 2：Narrow vs Wide Spikes 的区分干预

作者提出基于 spike 宽度的干预策略，而非仅依据高度：

| Spike 类型 | 特征 | 处理方式 |
| --- | --- | --- |
| **Narrow Spike** | 瞬态不稳定，通常自校正 | 允许继续训练，不 rollback |
| **Wide/Malignant Spike** | 指示发散动态 | 触发自动 rollback |

![Narrow Spike 示例](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "Narrow Spike 示例") ![Wide Spike 示例](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "Wide Spike 示例")

**自动化监控系统** ：

- **双阈值滑动窗口算法** ：监测最近 个 iteration 的 loss 轨迹
- **Alert Tier** ：较窄窗口 + 较低阈值 → Slack level-1 通知
- **Restart Tier** ：较宽窗口 + 严格阈值 → Slack level-2 通知 + 自动 rollback
- Rollback 公式：（ 为 checkpoint 间隔）
![464k step 的 Loss Spike 检测与自动恢复](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "464k step 的 Loss Spike 检测与自动恢复")

#### 关键观察 3：Gradient Norm 与 Parameter Norm 的动态

![Gradient Norm 变化](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "Gradient Norm 变化")
- **Gradient Norm** ：前半段训练频繁出现 spikes，整体呈上升趋势，在训练中途达到峰值后衰减（非标准行为，与 over-trained AdamW 相关）
- **Parameter Norm** ：在 200k step 附近达到峰值后持续下降，与学习率衰减同步放缓

#### 关键观察 4：Decay-to-Zero vs Decay-to-Floor

![Parameter Norm 对比：D2Z vs 1% Floor](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "Parameter Norm 对比：D2Z vs 1% Floor")

作者对比了两种学习率调度策略在训练尾段的表现：

- **Decay-to-Zero (D2Z)** ：当 LR 降至 以下时，parameter norm 停止变化，出现停滞（stagnation）
- **Decay-to-Floor (1% peak)** ：parameter norm 持续下降，避免数值精度限制导致的训练停滞

**工程决策** ：选择 cosine decay-to-floor（floor = ），既避免了 long tail 停滞，又简化了向 Mid-training 的过渡。

#### 训练稳定性关键要点

1. **早期阶段不稳定性是结构性的** ：前 30% 训练需要专门调优 optimizer timescale
2. **Spike 宽度比高度更重要** ：避免对瞬态波动过度反应，减少不必要的计算开销
3. **极低学习率可能触及数值精度极限** ：< 1% peak LR 时需警惕停滞现象
4. **自动化监控是长程训练的必要条件** ：双 tier 检测 + 自动 rollback 确保可靠性

### 2.4 Mid-training：核心创新

Mid-training 是 K2-V2 的核心创新阶段，采用 **渐进式上下文长度扩展策略** ，通过四阶段训练将模型上下文能力从 8K 扩展至 512K，同时系统性地注入推理行为。总计约 **2.2T tokens** ，全程使用 BFloat16 精度。

#### 2.4.1 四阶段训练架构

| 阶段 | 上下文长度 | Tokens | RoPE Base | Max LR | Min LR | LR Schedule | CP Size | 训练目的 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **mid-1** | 8,192 | 1,769B | 0.5M | 1.5e-5 | 6e-6 | Cosine | 1 | 从预训练过渡到高质量数据，引入推理行为和思考痕迹 |
| **mid-2** | 65,536 | 590B | 1M | 6e-6 | 6e-6 | Constant | 1 | 扩展至 64K 上下文，保持短上下文性能 |
| **mid-3** | 131,072 | 229B | 10M | 6e-6 | 6e-6 | Constant | 2 | 扩展至 128K 上下文，RoPE base 增至 10M |
| **mid-4** | 524,288 | 131B | 10M | 6e-6 | 6e-6 | Constant | 8 | 达到 512K 上下文，专注超长文档 |

**关键设计决策** ：

- **学习率策略** ：mid-1 采用 cosine decay（1.5e-5 → 6e-6），后续阶段保持 constant 6e-6 以确保长上下文扩展的稳定性
- **RoPE Base 调整** ：10M 的 RoPE base 对 >128K 上下文至关重要（依据 prolong 和 xiong-longcontext 的研究）
- **Global Batch Size** ：固定 13,107,200 tokens，mid-2 起节点数减半

#### 2.4.2 数据混合策略（TxT360-Midas）

Mid-training 使用 **TxT360-Midas** 数据集，核心设计目标：

1. 扩展上下文至 512K
2. 引入合成推理数据，支持 test-time compute
3. 补偿网页数据局限，引入大量数学合成数据（>2.5亿道题）

**数据来源分类** ：

| 类别 | 具体来源 | 说明 |
| --- | --- | --- |
| **Web** | CC-edu, Wiki+, Legal, Papers+, TxT360-QA, Arabic, MegaMath | 预训练数据子集 + 新增 Common Pile 来源 |
| **Code** | RefineCode + Stack-Edu Python | 预训练代码数据增强 |
| **Institutional Books** | 公共领域书籍集合 | 长上下文数据的主要来源 |
| **Thinking Traces (TT)** | 2.5亿+数学题，Qwen3-32B/GPT-OSS-120B/Nemotron 生成 | 带思考过程的数学解答 |
| **Reasoning Behaviors (RB)** | 100+ 推理行为模板，基于自然用户查询 | System 1/2 推理、红蓝队思考、侦探式推理等 |
| **Other Behaviors (OB)** | 数据科学讨论、规划、用户手册等 | 非推理类行为数据 |

**四阶段数据混合配比** ：

![Mid-training 四阶段数据混合](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "Mid-training 四阶段数据混合")

各阶段数据构成（按 token 占比，基于图表估算）：

| 数据类型 | mid-1 | mid-2 | mid-3 | mid-4 |
| --- | --- | --- | --- | --- |
| **Thinking Traces (TT)** | ~50% | ~35% | ~25% | ~15% |
| **Reasoning Behaviors (RB)** | ~15% | ~20% | ~20% | ~10% |
| **Other Behaviors (OB)** | ~10% | ~10% | ~10% | ~5% |
| **Web** | ~15% | ~20% | ~25% | ~30% |
| **Code** | ~5% | ~10% | ~15% | ~25% |
| **Institutional Books (IB)** | ~5% | ~5% | ~5% | ~15% |

*注：具体数值基于论文 Figure 4 饼图视觉估算，原文未提供精确百分比。*

**关键趋势** ：

- **mid-1** ：高比例 Thinking Traces（~50%），快速建立基础推理能力
- **mid-2/mid-3** ：平衡推理数据与长上下文数据，逐步提升上下文长度
- **mid-4** ：由于难以获得高质量超长推理数据，转向代码和书籍，导致推理数据占比下降

#### 2.4.3 上下文长度课程设计

数据按长度分桶管理，每个阶段混合不同比例的短/长上下文数据：

![四阶段上下文长度混合](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "四阶段上下文长度混合")

| 长度分桶 | mid-1 | mid-2 | mid-3 | mid-4 |
| --- | --- | --- | --- | --- |
| **0k-8k** | ~70% | ~35% | ~30% | ~30% |
| **8k-64k** | ~25% | ~50% | ~35% | ~30% |
| **64k-128k** | ~5% | ~10% | ~25% | ~20% |
| **128k-512k** | ~0% | ~5% | ~10% | ~20% |

**设计原则** ：

- **始终保留 ≥30% 短上下文数据** ：避免短上下文性能退化
- **渐进式长度扩展** ：每个阶段逐步增加更长文档的比例
- **mid-4 专注超长上下文** ：128k-512k 占比提升至 20%

#### 2.4.4 推理能力演进分析

Mid-training 对推理能力的提升可通过 AIME-2025 的 pass@k 曲线直观展示：

![AIME-2025 各阶段 pass@k 表现](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "AIME-2025 各阶段 pass@k 表现")

**关键发现** ：

- **预训练模型** ：pass@k = 0（纯网页数据无推理能力）
- **mid-1** ：pass@64 快速提升至 ~40%，pass@1 达 17.6%
- **mid-2/mid-3** ：持续提升，mid-3 达到 pass@1 = 53.2%（峰值）
- **mid-4** ：pass@1 降至 46.9%，因超长推理数据稀缺，依赖代码/书籍

**对比基线** ：

- Llama 3.1 70B 和 Qwen2.5 72B（无推理数据的 mid-training）即使 k=64 也表现不佳
- 这验证了 **reasoning data in mid-training** 对后续 RL 训练的重要性（与 Yue et al. 和 Yurochkin et al. 的研究一致）

#### 2.4.5 推理数据来源详解

**Thinking Traces (TT)** ：

- **数据源** ：OpenThoughts 项目中的数学数据集（Open-Thinker、NuminaMath、AIME 等）
- **去重** ：基于精确去重确保 2.5亿+ 独特题目
- **生成模型** ：
- Qwen3-32B (thinking mode)
	- GPT-OSS-120B (high reasoning effort)
	- DeepSeek-R1（通过 Nemotron-Postraining-Dataset-v1）
- **覆盖领域** ：数学、代码、STEM 问题解决

**Reasoning Behaviors (RB)** ：

- **用户查询源** ：Lmsys-1M-chat、WildChat、ShareLM
- **推理行为模板** ：100+ 种，包括：
- `dual_process_reasoning_system` ：System 1（直觉）vs System 2（分析）
	- `red_team_blue_team` ：红蓝队对抗思考
	- `detective_abductive` ：侦探式溯因推理
	- 其他：规划、反思、验证、分解等
- **生成模型** ：Qwen2.5 32B Instruct、Qwen3 32B (non-thinking)

**示例：dual\_process\_reasoning\_system 行为**

```
Prompt: Generate reasoning about the following problem: {query}
Begin by restating the problem. First provide an intuitive (System 1) 
assessment, then transition to a deliberate (System 2) analysis. Show 
how these two reasoning modes lead to different conclusions and how 
they can be reconciled.
```

**Other Behaviors (OB)** ：

- 数据科学讨论、规划任务、用户手册等非推理类行为
- 同样基于自然用户查询生成，确保多样性

#### 2.4.6 记忆化分析

作者对 AIME 2024/2025 进行句子级记忆化检测（beam search width=10，每步最多 20 tokens）：

| 模型 | AIME 2024 | AIME 2025 |
| --- | --- | --- |
| **K2-V2** | 23.32% | 14.43% |
| Qwen 2.5 72B | 41.96% | 23.37% |
| Llama 3.1 70B | 9.84% | 9.85% |
| Olmo 3 32B | 37.82% | 14.47% |

**关键结论** ：

- K2-V2 的记忆化率低于同类模型，表明 AIME 性能主要源于推理能力而非记忆
- AIME 2025 记忆化率更低（题目更新），多数记忆来自最后一句（确保答案为单一数字的固定表述）

#### 2.4.7 Mid-training 基础设施

**自主开发训练框架** （非 Megatron-LM）：

- **动机** ：Megatron-LM 的 CP 和 FSDP 支持尚不成熟
- **核心特性** ：
- 支持 TP、CP、FSDP
	- 细粒度自动激活重计算
	- 改进的异步通信和定制融合 kernel

**在线 Best-Fit Packing** ：

- **启用阶段** ：mid-2 起
- **机制** ：实时将多个短文档打包至最大序列长度，减少 padding
- **效果** ：显著减少不必要的文档截断，改善相同数据和模型下的 loss

**并行策略** ：

- **Tensor Parallelism (TP)** ：固定为 8
- **Context Parallelism (CP)** ：
- mid-1/mid-2：CP=1
	- mid-3：CP=2
	- mid-4：CP=8（控制超长序列内存）
- **通信优化** ：标准 all-gather 通信 KV，异步隐藏开销，作者发现比 RingAttention 更高效

### 2.5 SFT: Three Levels of Reasoning Effort and Tool Use

SFT 阶段的核心目标是 **在保持推理能力的同时，注入工具使用能力并固化模型行为** 。与近期做法（如 Qwen3、Olmo 3.1）训练独立的 "instruct" 和 "thinking" 模型不同，K2-V2 采用 **three levels of reasoning effort** （ `low`, `medium`, `high` ）机制，使单一模型能够通过 chat template 灵活调整 test-time compute。

#### 2.5.1 Core Design: Three Levels of Reasoning Effort

![SFT Three Levels of Reasoning Effort](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "SFT Three Levels of Reasoning Effort")

**机制原理** ：通过特殊 token 控制推理深度，类似于 GPT-OSS 的 `low` / `medium` / `high` reasoning effort settings，但 chat template 实现方式不同。

| Reasoning Effort | Special Token | Characteristics | Use Case |
| --- | --- | --- | --- |
| **Low** | `<think_faster>` | Direct answer, minimal thinking, short and stable generation length | Simple chat, quick response |
| **Medium** | `<think_fast>` | Moderate thinking, balance efficiency and quality | General tasks, code generation |
| **High** | `<think>` | Deep reasoning, generation length dynamically adjusts to problem difficulty (see quartile spread in figure) | Complex math, scientific reasoning |

**关键观察** ：

- `high` reasoning effort 模式下，模型展现出 **根据问题难度动态调整生成长度** 的能力，而非简单"overthinking"
- `low` / `medium` reasoning effort 的生成长度相对稳定， `high` 的 25th-75th percentile 跨度大，表明模型学会了"按需思考"
- 通过立即关闭 thinking tag 可 elicit **no-think 模式** （直接回答，无可见推理）

**Chat Template 设计** ：

- 统一模板支持 three levels of reasoning effort 和 tool calling
- Thinking segment 仅出现在最近一轮 assistant message，历史 message 中的 thinking 被隐藏以节省上下文长度
- 工具调用遵循 **Model Context Protocol (MCP)** 格式： `<tools>` 标记可用工具， `<tool_calls>` 标记调用段

#### 2.5.2 SFT 数据来源：TxT360-3efforts

SFT 数据集 **TxT360-3efforts** 包含约 **1000 万文档，100 亿 loss tokens** ，分为七大类别：

**核心数据类别** ：

| 类别 | 主要来源 | 数据特征 | 处理方式 |
| --- | --- | --- | --- |
| **Math** | Nemotron-PT-v1, MathQA, OpenMathReasoning, SimpleScaling, NuminaMath, BigMathVerified, OpenMathInstruct-2 | 7 个来源的数学题 | 移除商业模型合成数据（Orca-Math 等），子串去重，评测集去污 |
| **Code** | rStar-Coder, Bird-SQL, Nemotron-PT-v1, sql-create-context, verifiable-coding-problems, dolphin-coder, react-code-instructions, Magpie-Qwen2.5-Coder, conala-mined, code-evol-instruct, xlcost | 多语言代码、SQL、React | 覆盖通用编程和特定领域 |
| **Chat** | OASST, ShareLM, UltraChat-200k | 通用对话 | 仅取首轮查询 |
| **STEM** | Nemotron-CrossThink, NCERT, Loong, LogiCLM, Logic701 | 科学、工程、逻辑推理 | 多选和开放式生成 |
| **Instruction w/ Constraints** | GPT-OSS-120B 合成 + Hermes-Json-Mode | 格式/长度/关键词/标点/内容约束 | 程序化验证约束满足度 |
| **Self-Identity** | Lmsys-1M-chat, ShareGPT 筛选 + Qwen2.5-32B 扩展 | 模型身份相关查询 | 3000 英文 + 10 语言 × 300 对翻译 |
| **Safety** | AdvBench, Aya Red-Teaming, Do-Not-Answer, Forbidden Questions + PyRIT 生成 | 有害/恶意意图查询 | Base2048、Morse、Unicode 变换、越狱 prompt |

**Agentic 与 Tool-use 数据构造** ：

复杂用例（agentic behavior、tool use、多轮交互）需要多轮 SFT 数据，此类数据稀缺，作者开发了 **带隐式验证的新型合成 pipeline** ：

1. **Teacher-Student 多轮模拟** （数学问题）：
- 学生→assistant，教师→user：训练模型维持数学对话
	- 角色反转：训练模型批判性评估用户解答
- 教师（GPT-OSS-120B）监控学生（GPT-OSS-120B）解题过程
	- 教师有参考答案但不直接透露，通过反馈引导学生迭代优化
	- 生成两种数据：
4. **Agentic 多轮工具使用数据** ：
- **Nemotron Post Training v1** ：直接使用现成数据
	- **xLAM function calling** ：GPT-OSS-120B 模拟 teacher/student，Qwen2.5-7B-Instruct 作为 tool
	- **CommitPackFT** ：筛选 commit 类型（edit/rename/create/delete），合成 teacher 指导学生生成 diff 的对话
	- **其他工具数据源** ：Toucan、Hermes function calling、Glaive、ToolACE
6. **MCP 格式标准化** ：
- 移除 tool-call 后无 tool observation 的样本
	- 移除调用未定义工具的样本
	- 移除空/缺失最后一轮的样本
	- 移除无 tool definition 也无 tool call 的样本（Glaive 子集）
- 统一预处理 pipeline：确定性字符串匹配 + 正则规则
	- 功能：识别 speaker turns、提取 tool-call 规范、处理并行调用、规范化参数格式
	- **后处理过滤** ：

#### 2.5.3 SFT 数据混合配比

![SFT Data Mix and Reasoning Effort Distribution](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "SFT Data Mix and Reasoning Effort Distribution")

**数据类别配比** （按 loss tokens，基于图表估算）：

| 类别 | 占比 | 说明 |
| --- | --- | --- |
| **Math** | ~25% | 最大单一类别，推理能力基础 |
| **Code** | ~20% | 编程能力 + 工具使用基础 |
| **Chat** | ~15% | 通用对话能力 |
| **STEM** | ~15% | 科学、工程、逻辑 |
| **ATU (Agentic & Tool-Use)** | ~12% | 多轮交互、工具调用 |
| **IwC (Instruction w/ Constraints)** | ~8% | 约束遵循、JSON 输出 |
| **SI (Self-Identity & Safety)** | ~5% | 身份一致性、安全防护 |

*注：具体数值基于论文 Figure 8 饼图视觉估算，原文未提供精确百分比。*

**Reasoning Effort Distribution**:

| Reasoning Effort | Proportion | Use Case |
| --- | --- | --- |
| **High** | ~40% | Complex reasoning tasks |
| **Medium** | ~35% | Balance efficiency and quality |
| **Low** | ~25% | Quick response scenarios |

*注：具体数值基于论文 Figure 8 饼图视觉估算，原文未提供精确百分比。*

**数据处理关键细节** ：

1. **多轮数据转换** ：将多轮对话拆分为多个训练样本，每轮包含对应的历史轮次（因 chat template 只保留最后一轮的 thinking）
2. **GPT-OSS 过滤** ：简单子串匹配过滤 "Now to answer as ChatGPT" 等短语
3. **Self-Identity 系统提示随机注入** ：
- 早期实验：每轮都加默认 self-identity 系统提示 → 模型学会忽略
	- 改进策略：self-identity/safety 数据以 0.5 概率注入，其他类别以 0.1 概率注入
5. **长度分布** ：~98% 数据 < 8K tokens，不主动控制长度分布

#### 2.5.4 SFT 训练基础设施与关键发现

**训练配置** ：

| 参数 | 设置 |
| --- | --- |
| **Epochs** | 3（2100 steps/epoch，共约 6300 steps） |
| **Global Batch Size** | 128 |
| **Micro Batch Size** | 1 |
| **Sequence Length** | 65,536 |
| **Learning Rate** | （cosine decay to 10%） |
| **Parallelism** | TP=8, CP=1，选择性重计算 |

**在线 Best-Fit Packing** ：

- 继承 mid-training 的 packing 策略
- **效果** ：
- Truncation ratio = 0（无截断）
	- Padding ratio < 0.004%（每序列 < 3 个 padding tokens）
	- 对比 naive batching：padding ratio > 95%
- 跳过超过序列长度的样本

**训练动态** ：

- 3 epochs，每 epoch 结束保存 checkpoint
- Loss 曲线在 epoch 交界处（2100, 4200 steps）出现典型 dips

**关键发现与教训** ：

1. **Self-Identity 系统提示需随机注入**
- 早期实验：每轮对话都加入默认 self-identity 系统提示
	- 结果：模型学会忽略系统提示
	- 改进：随机注入策略（self-identity/safety 数据概率 0.5，其他数据概率 0.1）
3. **Reasoning effort impacts performance differently across benchmarks**
- 复杂数学和代码任务：reasoning effort 提升带来显著性能增益
	- 简单任务和其他领域：改善不明显
	- **例外** ：Function Calling 任务中 `medium` reasoning effort 表现最佳（ `high` reasoning effort 反而下降）
5. **GPT-OSS 生成内容的过滤**
- 问题：GPT-OSS 偶尔生成 "Now to answer as ChatGPT" 等短语
	- 解决：简单子串匹配过滤
7. **Tool-use 数据中的推理痕迹不足**
- 观察：High effort 在工具调用任务上有时不如 Medium effort
	- 原因：工具使用数据中的 reasoning traces 相对较少
	- 启示：工具调用与深度推理的协同优化仍需探索

---

## 3\. 验证与实验分析 (Evidence & Analysis)

### 3.1 基础模型评估

![K2-V2 与其他模型对比](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "K2-V2 与其他模型对比")

#### 3.1.1 Mid-training 阶段性能演进

| 基准 | base | mid-1 | mid-2 | mid-3 | mid-4 | Qwen2.5-72B |
| --- | --- | --- | --- | --- | --- | --- |
| **MMLU** | 74.3 | 74.4 | 73.5 | 75.0 | 75.2 | **86.1** |
| **MMLU-Pro** | 43.7 | 46.8 | 48.1 | **59.8** | 57.0 | 58.1 |
| **BBH** | 68.4 | 79.8 | 81.1 | 82.2 | **83.2** | **86.3** |
| **GPQA-Diamond** | 26.3 | 31.3 | 27.8 | 43.9 | **55.1** | 34.9 |
| **GSM8K** | 68.0 | 76.4 | 82.1 | **93.6** | 92.5 | 91.2 |
| **MATH** | 27.8 | 38.2 | 41.1 | **94.7** | 91.4 | 58.5 |
| **AIME 2025** | 0.0 | 17.6 | 25.1 | **53.2** | 46.9 | 1.7 |
| **HumanEval** | 50.0 | 51.2 | 53.7 | **54.3** | **54.3** | **54.3** |
| **KK-8 People** | 0.5 | 23.2 | 41.3 | 51.6 | **82.8** | 5.7 |

**关键发现** ：

1. **推理任务显著提升** ：AIME 2025 从 0% 提升至 46.9%（mid-4）/ 53.2%（mid-3），远超 Qwen2.5-72B 的 1.7%
2. **逻辑推理能力突出** ：KK-8 People（最难级别）达到 82.8%， reportedly 与 DeepSeek-R1 (83%) 和 o3-mini-high (83%) 相当
3. **传统基准保持稳定** ：MMLU 略有下降（74.3% → 75.2%），但 MMLU-Pro 显著提升（43.7% → 57.0%）
4. **阶段 4 的权衡** ：专注超长上下文导致部分推理指标轻微下降（AIME, MATH）

#### 3.1.2 长上下文能力

| 模型 | RULER 128K | NIAH 128K |
| --- | --- | --- |
| mid-2 | 12.0% | 7.57% |
| mid-3 | 67.0% | 82.9% |
| **mid-4** | **74.6%** | **95.2%** |
| Qwen2.5-14B-Instruct-1M | 77.3% | 98.3% |
| Llama3.1-8b-instruct | 80.7% | 96.9% |

**关键发现** ：mid-4 在 128K 上下文上表现稳定，显著优于早期阶段。

#### 3.1.3 记忆化分析

| 模型 | AIME 2024 | AIME 2025 |
| --- | --- | --- |
| K2-V2 | 23.32% | 14.43% |
| Qwen 2.5 72B | 41.96% | 23.37% |
| Llama 3.1 70B | 9.84% | 9.85% |
| Olmo 3 32B | 37.82% | 14.47% |

记忆化率（sentence-level exact match）相对较低，表明性能主要来自推理能力而非记忆。

![AIME-2025 Mid-training 进展](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "AIME-2025 Mid-training 进展")

### 3.2 SFT 模型评估

| 模型 | AIME 2025 | HMMT 2025 | GPQA-D | MMLU-Pro | Arena Hard V2 |
| --- | --- | --- | --- | --- | --- |
| **K2 High** | **80.2** | **71.4** | **69.3** | **77.0** | **62.1** |
| K2 Medium | 62.0 | 45.6 | 60.6 | 73.3 | 48.6 |
| K2 Low | 27.3 | 19.0 | 48.5 | 65.3 | 32.8 |
| Qwen3 235B | 88.8 | 84.2 | 80.7 | 81.0 | 64.4 |
| GPT-OSS-120B High | 87.9 | 88.3 | 77.5 | 76.2 | **92.0** |
| DeepSeek-V3.1 | 83.3 | 82.7 | 75.4 | 84.7 | 55.1 |
| Olmo3 Think SFT | 68.3 | 43.3 | 58.0 | 70.8 | 11.2 |

**关键发现** ：

- K2 High 在 AIME 2025 上达到 80.2%，接近 Qwen3-235B (88.8%) 和 DeepSeek-V3.1 (83.3%)
- 对话能力（Arena Hard V2: 62.1）优于同规模模型，与 Qwen3-235B 相当
- 仅需 SFT（无 RL）即可达到此性能，显示基础模型的强大潜力

---

## 4\. 局限性与落地思考 (Critical Review)

### 4.1 已识别的局限性

1. **数据污染风险** ：论文承认典型去污染方法（n-gram matching）的效果尚不明确，尽管记忆化分析显示相对较低的记忆化率
2. **超长上下文的数据稀缺** ：尽管训练至 512K 上下文，但 128K 以上性能仍受限于高质量长文档的稀缺
3. **领域专业化与通用能力的权衡** ：Stage 4 专注数学推理导致通用解释能力下降（如向不同受众解释量子纠缠的任务失败）
4. **工具调用数据中的推理痕迹不足** ：导致 High effort 在工具调用任务上有时不如 Medium effort
5. **评估敏感性** ：GSM8K 性能受输出格式、解析逻辑影响较大，在不同 prompt 格式间波动明显

### 4.2 工程实现要点

**复现清单** ：

| 组件 | 建议 |
| --- | --- |
| 依赖库 | PyTorch, FlashAttention, 自定义训练框架（非 Megatron-LM） |
| 关键超参 | ,, |
| 训练时长估算 | 预训练：约 1.25M steps；Mid-training：约 100K+ steps；SFT：约 6.3K steps |
| 显存估算 | 70B 模型 + CP 需要大量 H100/A100 集群（具体数量未披露） |
| 分布式策略 | TP=8, CP 动态调整（1→2→8） |
| 检查点频率 | 未明确说明，建议每 1000 steps |
| 监控要点 | 训练 loss、参数范数、各阶段评估指标、长上下文 RULER/NIAH |

**关键工程教训** ：

- RoPE base frequency 的选择对长上下文至关重要：1M 不足以支持 128K，需提升至 10M
- 在线 Best-Fit Packing 可显著减少截断，提升数据效率
- Learning Rate 低于 1% peak 时模型可能停滞，建议设置 floor 而非 decay-to-zero

### 4.3 对后续研究的启示

1. **Mid-training 的价值被低估** ：论文展示了 Mid-training 作为独立阶段的巨大潜力，值得更多研究关注
2. **推理能力的早期注入** ：在预训练后尽早引入推理数据可能比仅在后训练阶段引入更有效
3. **完全开源的标杆** ：K2-V2 连同训练数据、代码、日志的完整开放，为可复现 AI 研究树立了新标准

---

## 5\. 总结与启示 (The Verdict)

K2-V2 代表了大模型开源社区的重要里程碑。其核心价值不仅在于模型本身的强性能（70B Dense 模型接近 235B MoE 模型的推理能力），更在于其 **完全透明的开发过程** 。

**技术贡献** ：

1. 系统验证了 Mid-training 阶段注入推理能力的有效性
2. 提供了 three levels of reasoning effort 的实现范式，证明单一模型可动态平衡效率与性能
3. 完整开源了从数据到训练日志的全部资产，填补了开源社区在"完全可复制"方面的空白

**工程启示** ：

- 对于希望复现或基于此模型进行持续训练的团队，论文提供了详细的 Data Recipe 和超参数设置
- 对于推理能力增强的研究，Mid-training 的数据配比、Curriculum 设计提供了可借鉴的模板

**局限与未来方向** ：

- 强化学习后训练（RLVR）尚未应用，这是进一步提升推理能力的关键方向
- 超长上下文（>128K）的数据稀缺问题仍需解决
- 工具调用与深度推理的协同优化有待探索

总体而言，K2-V2 为开源大模型社区提供了一个 **既强大又完全透明** 的新基准，其技术报告本身就是一份宝贵的工程指南。

---

## 附录：关键术语解释

> **360-Open** ：完全开源标准，包括模型权重、训练数据、代码、训练日志等全部开放。

> **Mid-training** ：介于预训练和 SFT 之间的阶段，用于注入特定能力（如长上下文、推理行为）。

> **Thinking Traces** ：模型在生成最终答案前的思考过程记录，通常用 `<think>` 等标签包裹。

> **Pass@k** ：在 k 次尝试中至少成功一次的概率，用于评估模型解决复杂问题的能力。

> **RoPE (Rotary Positional Embedding)** ：旋转位置编码，通过旋转矩阵将位置信息注入注意力机制。

> **GQA (Grouped Query Attention)** ：分组查询注意力，多个 Query 头共享一组 KV 头，降低推理内存。

> **Context Parallelism** ：上下文并行，将长序列的不同部分分布到多个设备上计算。

> **Best-Fit Packing** ：一种文档打包算法，最大化序列填充效率，减少截断和填充浪费。

### 引用链接

\[1\]arXiv:2512.06201: *https://arxiv.org/abs/2512.06201*

\[2\] *https://huggingface.co/collections/LLM360/k2-v2*

\[3\] *https://wandb.ai/llm360/K2-V2*

\[4\] *https://github.com/llm360/eval360*

\[5\] *https://github.com/llm360/k2v2\_train*

\[6\] *https://huggingface.co/datasets/LLM360/TxT360*

\[7\] *https://huggingface.co/datasets/LLM360/TxT360-Midas*

\[8\] *https://huggingface.co/datasets/LLM360/TxT360-3efforts*

继续滑动看下一个

闲记算法

向上滑动看下一个