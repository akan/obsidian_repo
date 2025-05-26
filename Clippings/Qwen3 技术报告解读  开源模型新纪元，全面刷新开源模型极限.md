---
title: "Qwen3 技术报告解读 | 开源模型新纪元，全面刷新开源模型极限"
source: "https://mp.weixin.qq.com/s/lfStWLHav_m4v1i-oHbLNA"
author:
  - "[[AGI灵魂写手]]"
published:
created: 2025-05-15
description: "更多内容，点击下方关注【AGI之门】公众号获取更多实时AGI相关解读扫描下方二维码，添加小助手微信"
tags:
  - "clippings"
---
Original AGI灵魂写手 *2025年05月15日 09:01*

更多内容，点击下方关注【 **AGI之门** 】公众号

获取更多实时AGI相关解读

  

  

扫描下方二维码，添加小助手微信

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/xsV2V0iaianF8W5cOIm0OZlLf8bm4xicMvlAuNtdHeogfNyO0msnEEiaHqAPyb1JyngvnktMoNwsJfq5JfHTr17iaVg/640?wx_fmt=other&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/xsV2V0iaianF8iadoybo2tTnonuEpu3FQIib7YQBTZxOud7Yqq1FE8DypP4hDtfPOCDa8JRS1KzbIg7q2iaib8rIkv3w/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

## 精简阅读版本

### 本文主要解决了什么问题

1. 1\. 模型切换效率低下：传统方法需在不同模型（如思考型与非思考型）间切换以适应任务需求，导致部署成本高且灵活性不足。
2. 2\. 计算资源分配不均衡：现有模型难以根据任务复杂度动态调整推理资源消耗，影响性能与延迟的平衡。
3. 3\. 多语言能力局限：早期模型仅支持29种语言，无法满足全球化场景对低频语言覆盖的需求。
4. 4\. 小规模模型性能与训练成本矛盾：传统蒸馏方法无法有效传递大模型能力，导致小模型需大量训练资源才能达到竞争力。

### 本文的核心创新是什么

1. 1\. 统一模式框架：首次将思考模式（复杂推理）与非思考模式（快速响应）集成到单一模型中，实现动态模式切换（如通过 `/think` 或 `/no_think` 标志）。
2. 2\. 思考预算机制：允许用户设定最大思考Token数，动态控制模型推理深度，平衡任务精度与计算开销。
3. 3\. 多语言能力扩展：通过360万亿Token预训练数据（覆盖119种语言），结合细粒度数据标注系统，显著提升跨语言理解与生成能力。
4. 4\. 强到弱知识蒸馏：提出分阶段离线策略蒸馏与在线策略内蒸馏方法，利用大模型logits指导小模型训练，降低80%以上训练成本。

### 结果相较于以前的方法有哪些提升

1. 1\. 性能突破：
- • Qwen3-235B-A22B在AIME'24达85.7分，LiveCodeBench v5达70.7分，超越同类开源模型及DeepSeek-R1等专有模型。
	- • 小模型如Qwen3-14B性能超越参数量更大的Qwen2.5-32B，MoE模型Qwen3-30B-A3B激活参数仅1/5时性能与Qwen3-14B相当。
3. 2\. 资源效率优化：
- • MoE架构使Qwen3-235B-A22B仅激活220亿参数即可实现2350亿参数模型性能，推理成本降低3倍。
	- • 强到弱蒸馏使小模型训练效率提升10倍（仅需1/10 GPU小时），且Pass@N指标显著优于强化学习。
5. 3\. 多语言覆盖：支持语言从29种扩展至119种，MMMLU（14种语言）与MT-AIME2024（55种语言）测试中表现优异。
6. 4\. 功能增强：
- • 支持32768长度上下文，通过YARN和双重块注意力技术实现长文本处理。
	- • 提出思考预算缩放曲线，在数学/编程任务中性能随预算增加平滑提升。

### 局限性

1. 1\. 复杂任务性能权衡：通用强化学习阶段可能导致部分高难度任务（如AIME'24、LiveCodeBench）性能退化，推测因泛化训练削弱了专业能力。
2. 2\. 思考预算上限限制：当前实验未突破32K Token预算，更长预算的性能提升潜力尚未完全验证。
3. 3\. 模式切换准确性：第三阶段模式融合后ThinkFollow基准得分为88.7（满分100），仍存在少量模式误判情况。

## 深入阅读版本

## 导读

在本工作中，作者介绍了Qwen3，Qwen模型系列的最新版本。Qwen3包含一系列大语言模型（LLMs），旨在提升性能、效率和多语言能力。Qwen3系列涵盖了密集架构和专家混合（MoE）架构的模型，参数规模从0.6亿到2350亿不等。Qwen3的一项关键创新是将思考模式（用于复杂、多步骤推理）和非思考模式（用于快速、基于上下文的响应）集成到一个统一框架中。这消除了在不同模型之间切换的需求，并能够根据用户 Query 或聊天模板进行动态模式切换。同时，Qwen3引入了思考预算机制，允许用户在推理过程中自适应分配计算资源，从而根据任务复杂度平衡延迟和性能。此外，通过利用旗舰模型的知识，作者显著降低了构建小规模模型所需的计算资源，同时确保了它们具有高度竞争力的性能。

实证评估表明，Qwen3在包括代码生成、数学推理、Agent任务等在内的多个基准测试中取得了最先进的结果，其性能与更大的MoE模型和专有模型相当。与前身Qwen2.5相比，Qwen3将多语言支持从29种扩展到119种语言和方言，通过改进跨语言理解和生成能力，增强了全局可访问性。为了促进可复现性和社区驱动的研发，所有Qwen3模型均在Apache 2.0许可下公开可用。

## 1 引言

追求通用人工智能（AGI）或超级人工智能（ASI）一直是人类的目标。近年来大型基础模型的发展，例如GPT-4o、Claude 3.7、Gemini 2.5、DeepSeek-V3、Llama-4和Qwen2.5，已显著推动了这一目标的实现。这些模型在涵盖数十万亿token的多样化领域和任务的大型数据集上进行训练，有效地将人类知识和能力提炼到其参数中。此外，通过强化学习优化的推理模型的发展，凸显了基础模型在推理时扩展方面的潜力，并实现了更高水平的智能，例如o3、DeepSeek-R1。尽管大多数最先进的模型仍然是专有的，但开源社区的快速发展已大幅缩小了开源模型与闭源模型之间的性能差距。值得注意的是，越来越多的顶级模型现已成为开源，促进了人工智能领域的更广泛研究和创新。

在这项工作中，作者介绍了Qwen3，这是作者基础模型家族Qwen的最新系列。Qwen3是一系列开放权重的大语言模型（LLMs），在广泛的任务和领域中都实现了最先进的性能。作者发布了密集模型和专家混合（MoE）模型，参数数量从6亿到2350亿不等，以满足不同下游应用的需求。值得注意的是，旗舰模型Qwen3-235B-A22B是一个MoE模型，总参数量为2350亿，每个token激活的参数量为220亿。这种设计确保了高性能和高效的推理。

Qwen3引入了多项关键进展以提升其功能性和易用性。首先，它将两种不同的运行模式——思考模式和非思考模式——整合到单一模型中。这允许用户在这些模式之间切换，而无需在多个模型之间切换，例如从Qwen2.5切换到QwQ。这种灵活性确保开发者和用户能够高效地调整模型行为以适应特定任务。此外，Qwen3集成了思考预算机制，为用户提供了对模型在任务执行过程中推理努力程度的细粒度控制。这一能力对于计算资源的优化和性能至关重要，能够将模型的思考行为调整以适应现实应用中的不同复杂度。此外，Qwen3在涵盖高达119种语言和方言的360万亿个token上进行预训练，有效提升了其多语言能力。这一更广泛的语言支持增强了其在全局用例和国际应用中的部署潜力。这些进展共同确立了Qwen3作为一个前沿的开源大语言模型家族，能够在各种领域和语言中有效处理复杂任务。

Qwen3的预训练过程采用了一个包含约360万亿token的大规模数据集，该数据集经过精心筛选以确保语言和领域的多样性。为了高效扩展训练数据，作者采用了一种多模态方法：对Qwen2.5-VL进行微调以从大量PDF文档中提取文本。作者还使用领域特定模型生成合成数据：Qwen2.5-Math用于数学内容，以及Qwen2.5-Coder用于代码相关数据。预训练过程遵循三阶段策略。第一阶段，模型在约300万亿token上进行训练以构建强大的通用知识基础。第二阶段，它在知识密集型数据上进行进一步训练以增强科学、技术、工程和数学（STEM）以及编码领域的推理能力。最后，在第三阶段，模型在长上下文数据上进行训练，将其最大上下文长度从4096增加到32768 token。

为了更好地使基础模型与人类偏好和下游应用相一致，作者采用了一种多阶段后训练方法，该方法赋予模型思考（推理）和非思考模式。在最初两个阶段，作者专注于通过长链式思维（CoT）冷启动微调和专注于数学与编程任务的强化学习来培养强大的推理能力。在最后两个阶段，作者将包含推理路径和不包含推理路径的数据合并到一个统一的数据集中进行进一步微调，使模型能够有效处理这两种类型的输入，然后应用通用领域强化学习来提高其在广泛下游任务中的性能。对于较小的模型，作者采用强到弱的蒸馏方法，利用来自较大模型的离线策略和在线策略知识迁移来增强其能力。来自High-Level教师模型的蒸馏在性能和训练效率方面显著优于强化学习。

作者对Qwen3\_Technical\_Report在涵盖多个任务和领域的综合基准测试中评估了预训练和后训练版本。实验结果表明，作者的基础预训练模型达到了最先进的性能。后训练模型，无论在思考模式还是非思考模式下，都表现出与领先的专有模型和大型专家混合（MoE）模型（如o1、o3-mini和DeepSeek-V3）的竞争力。值得注意的是，Qwen3\_Technical\_Report在编码、数学和与 Agent 相关的任务中表现出色。例如，旗舰模型Qwen3-235B-A22B在AIME'24上达到了85.7分，在AIME'25上达到了81.5分，在LiveCodeBench v5上达到了70.7分，在CodeForces上达到了2,056分，在BFCL v3上达到了70.8分。此外，Qwen3系列中的其他模型也相对于其规模表现出强劲的性能。此外，作者观察到，增加思考 Token 的思考预算会导致模型在各项任务中的性能持续提升。

在以下章节中，作者描述了模型架构的设计，提供了其训练过程的详细信息，展示了预训练和后训练模型的实验结果，最后通过总结关键发现和概述未来研究的潜在方向来结束本技术报告。

## 2 架构

Qwen3系列包括6个密集模型，分别是Qwen3-0.6B、Qwen3-1.7B、Qwen3-4B、Qwen3-8B、Qwen3-14B和Qwen3-32B，以及2个MoE模型，Qwen3-30B-A3B和Qwen3-235B-A22B。旗舰模型Qwen3-235B-A22B共有235B个参数，其中22B个参数被激活。下面作者将详细阐述Qwen3模型的架构。

Qwen3密集模型的架构与Qwen2.5相似，包括使用分组 Query 注意力、SwiGLU、旋转位置嵌入以及预规范化RMSNorm。此外，作者移除了Qwen2中使用的QKV偏置，并在注意力机制中引入了QK-Norm，以确保Qwen3的稳定训练。模型架构的关键信息在表1中提供。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/xsV2V0iaianF8iadoybo2tTnonuEpu3FQIibCBXbibflOxVan1YWcLiaBvvkkOfg8eck9XRtNJ1LGXfpoYOCzaJc0SibA/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

Qwen3 MoE模型与Qwen3密集模型共享相同的基本架构。模型架构的关键信息如表2所示。作者遵循Qwen2.5-MoE并实现细粒度专家分割。Qwen3 MoE模型共有128个专家，每个token激活8个专家。与Qwen2.5-MoE不同，Qwen3-MoE设计排除了共享专家。此外，作者采用全局批次负载均衡损失来鼓励专家专业化。这些架构和训练创新在下游任务中显著提升了模型性能。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/xsV2V0iaianF8iadoybo2tTnonuEpu3FQIibkbfIeDHKTMUic2cjVjcwKTHJNYcCJBc0vJbeia3jbnl5EabL75ZRv4tA/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

Qwen3模型使用Qwen的tokenizer，该tokenizer实现了基于字节的字节对编码，词汇量为151,669。

## 3 预训练

在本节中，作者描述了预训练数据的构建过程、预训练方法的细节，并展示了在标准基准测试上评估基础模型所得到的实验结果。

### 3.1 预训练数据

与Qwen2.5相比，作者显著扩展了训练数据的规模和多样性。具体而言，作者收集了双倍数量的预训练token，覆盖了三倍多的语言。所有Qwen3模型均在一个包含119种语言和方言的大规模多样化数据集上进行训练，总共有36万亿个token。该数据集包括来自编码、STEM（科学、技术、工程和数学）、推理任务、书籍、多语言文本和合成数据等各个领域的高质量内容。

为进一步扩展预训练数据语料库，作者首先采用Qwen2.5-VL模型对大量类似PDF的文档进行文本识别。识别出的文本随后通过Qwen2.5进行优化，以提升其质量。通过这一两步流程，作者获得了额外的数万亿高质量文本token。此外，运用Qwen2.5、Qwen2.5-Math和Qwen2.5-Coder模型合成数万亿不同格式的文本token，包括教科书、问答、指令和代码片段，覆盖数十个领域。最后，作者通过整合更多多语言数据并引入更多语言来进一步扩展预训练语料库。与Qwen2.5所使用的预训练数据相比，支持的语言数量从29种显著增加到119种，增强了模型的语言覆盖范围和跨语言能力。

作者开发了一个多语言数据标注系统，旨在提升训练数据的质量和多样性。该系统已应用于作者的超大规模预训练数据集，在多个维度如教育价值、领域、学科和安全等方面标注了超过30万亿个token。这些详细标注支持更有效的数据筛选和组合。与以往在数据源或领域层面优化数据混合的研究不同，Qwen3通过在具有细粒度数据标签的小 Agent 模型上进行大量消融实验，在实例层面优化数据混合。

### 3.2 预训练阶段

Qwen3模型通过三阶段过程进行预训练：

1. 1\. **常规阶段** （S1）：在首个预训练阶段，所有Qwen3模型使用序列长度为4,096的序列，在超过30万亿个token上进行训练。在此阶段，模型已完全在语言能力和通用世界知识方面完成预训练，训练数据覆盖119种语言和方言。
2. 2\. **推理阶段** （S2）：为进一步提升推理能力，通过增加STEM、编程、推理和合成数据的比例来优化本阶段的预训练语料库。模型在序列长度为4,096的条件下，进一步使用约5T更高质量的token进行预训练。此外，在本阶段作者还加速了学习率衰减。
3. 3\. **长上下文阶段** ：在最终的预训练阶段，收集高质量的长期上下文语料库以扩展Qwen3模型的上下文长度。所有模型均在数百亿个token上进行预训练，序列长度为32,768个token。长期上下文语料库包括长度在16,384至32,768个token之间的文本的75%，以及长度在4,096至16,384个token之间的文本的25%。遵循Qwen2.5，作者使用ABF技术将RoPE的基础频率从10,000增加到1,000,000。同时，作者引入YARN和双重块注意力，以在推理过程中将序列长度容量提高四倍。

与Qwen2.5类似，基于上述三个预训练阶段，开发了用于预测最优超参数（例如学习率调度器和批次大小）的缩放规律。通过广泛的实验，作者系统地研究了模型架构、训练数据、训练阶段与最优训练超参数之间的关系。最后，作者为每个密集型或MoE模型设定了预测的最优学习率和批次大小策略。

### 3.3 预训练评估

作者对Qwen3系列的基座语言模型进行了全面评估。基座模型的评估主要关注其在常识、推理、数学、科学知识、编程和多语言能力方面的表现。预训练基座模型的评估数据集包括15个基准测试：

- • 常规任务：MMLU（5-shot），MMLU-Pro（5-shot，CoT），MMLU-redux（5-shot），BBH（3-shot，CoT），SuperGPQA（5-shot，CoT）。
- • 数学与STEM任务：GPQA（5-shot，CoT），GSM8K（4-shot，CoT），MATH（4-shot，CoT）。
- • 编程任务：EvalPlus（零样本）（HumanEval、MBPP、Humaneval+、 、MultiPL-E（零样本）（Python、C++、JAVA、PHP、TypeScript、C#、Bash、JavaScript）、MBPP-3shot、CRUX-O of CRUXEval（1-shot）。
- • 多语言任务：MGSM（8-shot，CoT）、MMMLU（5-shot）、INCLUDE（5-shot）。

对于基础模型 Baseline ，将Qwen3系列基础模型与Qwen2.5基础模型以及其他领先的开放源码基础模型进行比较，包括DeepSeek-V3基础模型、Gemma-3、Llama-3和Llama-4系列基础模型，比较的基准是参数规模。所有模型均使用相同的评估流程和广泛使用的评估设置进行评估，以确保公平比较。

评估结果总结基于整体评估结果，作者重点介绍了Qwen3基础模型的一些关键结论。

1. 1\. 与先前开源的SOTA密集模型和MoE基础模型（如DeepSeekV3 Base、Llama-4-Maverick Base和Qwen2.5-72B-Base）相比，Qwen3-235B-A22B-Base在大多数任务中表现更优，且其总参数或激活参数显著更少。
2. 2\. 对于Qwen3 MoE基础模型，实验结果表明：
- • 使用相同的预训练数据，Qwen3 MoE基础模型仅需1/5的激活参数即可达到与Qwen3密集基础模型相似的性能。
	- • 由于Qwen3 MoE架构的改进、训练token规模的提升以及更先进的训练策略，Qwen3 MoE基础模型在激活参数少于1/2且总参数更少的情况下，性能优于Qwen2.5 MoE基础模型。
	- • 即使仅使用Qwen2.5密集基础模型1/10的激活参数，Qwen3 MoE基础模型也能实现相当的性能，这为推理和训练成本带来了显著优势。
4. 3\. Qwen3密集基础模型在更高参数规模下的整体性能与Qwen2.5基础模型相当。例如，Qwen3-1.7B/4B/8B/14B/32B-Base分别达到了与Qwen2.5-3B/7B/14B/32B/72B-Base相当的性能。特别是在STEM、编程和推理基准测试中，Qwen3密集基础模型在更高参数规模下的性能甚至超越了Qwen2.5基础模型。

详细结果如下。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**Qwen3-235B-A22B-Base** 作者将Qwen3-235B-A22B-Base与先前同规模的MoE Qwen2.5-Plus-Base以及其他领先的开放源码基础模型进行比较：Llama-4-Maverick、Qwen2.5-72B-Base、DeepSeek-V3 Base。从表3中的结果来看，Qwen3-235B-A22B-Base模型在大多数评估基准上取得了最高的性能得分。作者进一步分别将Qwen3-235B-A22B-Base与其他 Baseline 进行比较，以进行详细分析。

1. 1\. 与Llama-4-Maverick-Base相比，后者参数量大约是前者的两倍，但Qwen3-235B-A22B-Base在大多数基准测试中表现仍然更优。
2. 2\. 与DeepSeek-V3-Base 相比，Qwen3-235B-A22B-Base 在 15 项评估基准中的 14 项上表现更优，其参数总数仅为 DeepSeek-V3-Base 的约 1/3，激活参数为 2/3，展现了Qwen3的强大性能和成本效益。
3. 3\. 与类似规模的MoE Qwen2.5-Plus相比，Qwen3-235B-A22B-Base在参数数量和激活参数更少的情况下显著优于前者，这表明Qwen3在预训练数据、训练策略和模型架构方面具有显著优势。
4. 4\. 与Qwen2.5-72B-Base相比，Qwen3-235B-A22B-Base在所有基准测试中都超越了后者，且激活参数数量不到1/3。同时，由于模型架构的优势，Qwen3-235B-A22B-Base在每万亿token的推理成本和训练成本都远低于Qwen2.5-72B-Base。

Qwen3-32B-Base是Qwen3系列中规模最大的密集模型。作者将它与其他相似规模的 Baseline 进行了比较，包括Gemma-3-27B和Qwen2.5-32B。此外，作者引入了两个强劲的 Baseline ：最近开源的MoE模型Llama 4-Scout，其参数量是Qwen3-32B-Base的三倍，但激活参数量只有一半；以及作者之前旗舰级开源密集模型Qwen2.5-72B-Base，其参数量比Qwen3-32B-Base多出两倍以上。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

结果如表4所示，支持三个关键结论：

1. 1\. 与同等规模的模型相比，Qwen3-32B-Base在大多数基准测试中表现优于Qwen2.5-32B-Base和Gemma-3-27B Base。值得注意的是，Qwen3-32B-Base在MMLUPro上取得了65.54的成绩，在SuperGPQA上取得了39.78的成绩，显著优于其前身Qwen2.5-32B-Base。此外，Qwen3-32B-Base在编码基准测试中的得分显著高于所有 Baseline 模型。
2. 2\. 令人惊讶的是，作者发现Qwen3-32B-Base与Qwen2.5-72B-Base相比取得了具有竞争力的结果。尽管Qwen3-32B-Base的参数数量不到Qwen2.5-72B-Base的一半，但在15个评估基准中的10个上，它表现优于Qwen2.5-72B-Base。在编程、数学和推理基准测试中，Qwen3-32B-Base具有显著优势。
3. 3\. 与Llama-4-Scout-Base相比，Qwen3-32B-Base在所有15个基准测试中都显著优于它，其参数数量仅为Llama-4-Scout-Base的三分之一，但激活参数数量为其两倍。
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Qwen3-14B-Base与Qwen3-30B-A3B-Base的评估结果与规模相近的 Baseline 进行了比较，包括Gemma-3-12B Base、Qwen2.5-14B Base。类似地，作者引入了两个强劲的 Baseline ：

1. 1\. Qwen2.5-Turbo，其参数量为42B，激活参数量为6B。请注意，其激活参数量是Qwen3-30B-A3B-Base的两倍。
2. 2\. Qwen2.5-32B-Base，其激活参数量是Qwen3-30B-A3B的11倍，是Qwen3-14B的两倍以上。

结果如表5所示，作者可以得出以下结论。

1. 1\. 与同规模的模型相比，Qwen3-14B-Base在所有15个基准测试中均显著优于Qwen2.5-14B-Base和Gemma-3-12B-Base。
2. 2\. 类似地，Qwen3-14B-Base 与 Qwen2.5-32B-Base 相比，也取得了非常具有竞争力的结果，其参数量不到后者的二分之一。
3. 3\. 仅使用1/5的激活非嵌入参数，Qwen3-30B-A3B在所有任务上的表现均显著优于Qwen2.5-14B-Base，并达到了与Qwen3-14B-Base和Qwen2.5-32B-Base相当的性能，这为作者的推理和训练成本带来了显著优势。

对于边缘侧模型，作者选取了规模相似的Qwen2.5、Llama-3和Gemma-3基础模型作为基准。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

结果如表6、表7和表8所示。所有Qwen3 8B / 4B / 1.7B / 0.6B-Base模型在几乎所有基准测试中继续保持强劲性能。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

值得注意的是，Qwen3-8B / 4B / 1.7B-Base模型在超过一半的基准测试中甚至超过了规模更大的Qwen2.5-14B / 7B / 3B基础模型，尤其是在与STEM相关和编程相关的基准测试中，这反映了Qwen3模型的显著改进。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 4 后训练

Qwen3的离线训练流程策略性地设计了两个核心目标：

1. 1\. **思维控制** ：这涉及两种不同模式的集成，即“非思维”模式和“思维”模式，为用户提供灵活性，选择模型是否应参与推理，并通过为思维过程指定一个token预算来控制思维深度。
2. 2\. **强弱知识蒸馏** ：旨在简化和优化轻量级模型的训练后处理流程。通过利用大规模模型的知识，作者显著降低了构建小规模模型所需的计算成本和开发工作量。

如图1所示，Qwen3系列旗舰模型遵循一个复杂的四阶段训练流程。前两个阶段专注于发展模型的"思考"能力，接下来的两个阶段旨在将强大的"非思考"功能集成到模型中。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

初步实验表明，将教师模型的输出logits直接蒸馏到轻量级学生模型中，可以在保持推理过程细粒度控制的同时有效提升其性能。这种方法无需为每个小规模模型单独执行耗时的四阶段训练过程。它带来了更好的即时性能，如更高的 分数所示，同时也提升了模型的探索能力，体现在Pass 结果的改善。此外，它以更高的训练效率实现了这些收益，相较于四阶段训练方法，仅需其1/10的GPU小时。

在以下章节中，作者介绍了四阶段训练过程，并对强到弱蒸馏方法进行了详细说明。

### 4.1 长期CoT冷启动

作者首先构建了一个涵盖广泛类别的综合数据集，包括数学、代码、逻辑推理和通用STEM问题。数据集中的每个问题都配对有经过验证的参考答案或基于代码的测试用例。该数据集作为长链式思维（long-CoT）训练“冷启动”阶段的基础。

数据集构建涉及严格的二阶段过滤过程： Query 过滤和响应过滤。在 Query 过滤阶段，使用Qwen2.5-72B-Instruct识别并移除难以验证的 Query 。这包括包含多个子问题的 Query 或要求生成通用文本的 Query 。此外，排除了Qwen2.5-72B-Instruct无需使用思维链推理即可正确回答的 Query 。这有助于防止模型依赖表面猜测，并确保仅包含需要深度推理的复杂问题。此外，作者使用Qwen2.5-72B-Instruct对每个 Query 的领域进行标注，以保持数据集中领域表示的平衡。

在预留验证 Query 集后，作者使用QwQ-32B为每个剩余 Query 生成 个候选响应。当QwQ-32B持续无法生成正确解时，人工标注员手动评估响应的准确性。对于具有正Pass@N的 Query ，将应用更严格的过滤标准以移除以下响应：

1. 1\. 产生错误最终答案的响应
2. 2\. 包含大量重复内容的响应
3. 3\. 明显表明猜测且缺乏充分推理的响应
4. 4\. 思考内容与总结内容存在不一致的响应
5. 5\. 涉及不当语言混合或风格转换的响应
6. 6\. 被怀疑与潜在验证集项目过于相似的响应

随后，从精炼数据集中精心选择的一个子集用于推理模式的初始冷启动训练。此阶段的目标是在不过分强调即时推理性能的情况下，向模型植入基础推理模式。这种做法确保模型潜力不受限制，使其在后续的强化学习（RL）阶段具有更大的灵活性和改进空间。为有效实现这一目标，在准备阶段应尽量减少训练样本数量和训练步骤。

### 4.2 推理强化学习

推理强化学习阶段使用的 Query -验证器对必须满足以下四个条件：

1. 1\. 它们在冷启动阶段未被使用
2. 2\. 它们对冷启动模型是可学习的
3. 3\. 它们尽可能具有挑战性
4. 4\. 它们覆盖了广泛的子域

最终作者收集了总共3,995个 Query -验证器对，并采用GRPO来更新模型参数。作者观察到使用较大的批次大小和每个 Query 的高次数的回滚，并结合离线策略训练以提高样本效率，对训练过程是有益的。作者还解决了如何通过控制模型的熵来平衡探索和利用的问题，使其稳步增加或保持稳定，这对于保持稳定的训练至关重要。因此，在单个RL运行过程中，作者在训练 Reward 和验证性能方面都实现了持续改进，而无需对超参数进行任何手动干预。例如，Qwen3-235B-A22B模型的 分数在总共 个训练步骤中从70.1增加到85.1。

### 4.3 思维模式融合

思考模式融合阶段的目标是将“非思考”能力整合到先前开发的“思考”模型中。这种方法使开发者能够管理和控制推理行为，同时降低为思考和非思考任务部署独立模型的成本和复杂性。为实现这一目标，作者对推理强化学习模型进行持续监督微调（SFT），并设计了一个聊天模板来融合两种模式。此外，作者发现能够熟练处理两种模式的模型在不同思考预算下始终表现稳定。

**SFT数据构建** 。SFT数据集结合了“思考”和“非思考”数据。为确保Stage 2模型的性能不受额外SFT的影响，“思考”数据通过使用Stage 2模型对Stage 1 Query 进行拒绝采样生成。“非思考”数据则经过精心筛选，涵盖多种任务类型，包括编程、数学、指令跟随、多语言任务、创意写作、问答和角色扮演。此外，作者采用自动生成的清单来评估“非思考”数据的响应质量。为提升低资源语言任务的性能，作者特别增加了翻译任务的比例。

**对话模板设计** 。为了更好地整合两种模式并使用户能够动态切换模型的思考过程，作者为Qwen3设计了对话模板，如表9所示。具体而言，对于思考模式和非思考模式的样本，作者分别在用户 Query 或系统消息中引入/think和/no\_think标志。这允许模型遵循用户的输入并相应地选择合适的思考模式。对于非思考模式的样本，作者在助手的响应中保留一个空的思考块。这种设计确保了模型内部的格式一致性，并允许开发行人通过在对话模板中连接一个空的思考块来防止模型进行思考行为。默认情况下，模型在思考模式下运行；因此，作者添加了一些不包含/think标志的用户 Query 的思考模式训练样本。对于更复杂的多轮对话，作者随机在用户的 Query 中插入多个/think和/no\_think标志，模型的响应则遵循最后遇到的标志。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**思考预算** 。思考模式融合的另一个优势在于，一旦模型学会在非思考模式和思考模式下进行响应，它自然地发展出处理中间情况的能力——基于不完整的思考生成响应。这种能力为在模型的思考过程中实施预算控制奠定了基础。具体来说，当模型的思考长度达到用户定义的阈值时，作者手动停止思考过程并插入停止思考指令："考虑到用户的时间限制，我现在必须根据思考直接给出解决方案。\\n 。插入此指令后，模型根据其到该点的累积推理生成最终响应。值得注意的是，这种能力并非明确训练得到，而是作为应用思考模式融合的自然结果而涌现。

### 4.4 通用强化学习

通用强化学习阶段旨在广泛提升模型在不同场景下的能力和稳定性。为此，作者建立了一个涵盖超过20个不同任务的复杂 Reward 系统，每个任务都有定制化的评分标准。这些任务特别针对以下核心能力的提升：

- • **指令遵循** ：这项能力确保模型能够准确理解和遵循用户指令，包括与内容、格式、长度以及结构化输出相关的要求，从而提供符合用户期望的响应。
- • **遵循格式要求** ：除了明确的指令外，作者期望模型遵循特定的格式规范。例如，模型应适当响应/think和/no\_think标志，通过在思考和非思考模式之间切换，并在最终输出中始终使用指定的 Token （例如，和）来分隔思考和回复部分。
- • **偏好对齐** ：对于开放式 Query ，偏好对齐着重于提升模型的有用性、参与度和风格，最终为用户提供更自然、更满意的体验。
- • **Agent能力** ：这涉及训练模型通过指定接口正确调用工具。在强化学习（RL）展开过程中，模型被允许与真实环境执行反馈进行完整的多轮交互循环，从而提升其在长时程决策任务中的性能和稳定性。
- • **特殊场景下的能力** ：在更专业的场景中，作者设计针对特定上下文的任务。例如，在检索增强生成（RAG）任务中，作者引入 Reward 信号来引导模型生成准确且符合上下文的响应，从而最小化幻觉风险。

为对上述任务提供反馈，作者使用了三种不同的 Reward 类型：

1. 1\. **基于规则的 Reward** ：基于规则的 Reward 在推理强化学习阶段被广泛使用，并且对于指令遵循和格式遵循等一般任务也很有用。设计良好的基于规则的 Reward 能够以高精度评估模型输出的正确性，防止出现 Reward 攻击等问题。
2. 2\. **基于参考答案的模型 Reward** ：在此方法中，作者为每个 Query 提供参考答案，并 Prompt Qwen2.5-72B-Instruct根据该参考答案对模型响应进行评分。这种方法允许更灵活地处理多样化任务，无需严格格式化，避免了纯基于规则的 Reward 可能产生的假阴性错误。
3. 3\. **基于模型的 Reward 机制无需参考答案** ：利用人类偏好数据，训练一个 Reward 模型为模型响应分配标量分数。这种不依赖于参考答案的方法能够处理更广泛的 Query ，同时有效提升模型的参与度和有用性。

### 4.5 强对弱蒸馏

强到弱蒸馏流程专门设计用于优化轻量级模型，包括5个密集模型（Qwen3-0.6B、1.7B、4B、8B和14B）以及1个MoE模型（Qwen3-30B-A3B）。该方法在提升模型性能的同时，有效传递了鲁棒的模式切换能力。蒸馏过程分为两个主要阶段：

1. 1\. **离线策略蒸馏** ：在初始阶段，作者结合使用/think和/no\_think模式生成的教师模型输出进行响应蒸馏。这有助于轻量级学生模型发展基本的推理能力以及在不同思维模式间切换的能力，为后续的在线策略训练阶段奠定坚实基础。
2. 2\. **策略内蒸馏** ：在此阶段，学生模型生成策略内序列以进行微调。具体而言，采样 Prompt ，学生模型以/think或/no\_think模式生成响应。随后通过将学生模型的logits与教师模型（Qwen3-32B或Qwen3-235B-A22B）的logits对齐，以最小化KL散度来微调学生模型。

### 4.6 训练后评估

为了全面评估指令微调模型的质量，作者采用自动基准测试来评估模型在思考和非思考模式下的性能。这些基准测试被分为几个维度：

- • **常规任务** ：作者使用了包括MMLU-Redux、GPQADiamond、C-Eval和LiveBench在内的基准测试。对于GPQA-Diamond，作者对每个问题进行10次采样，并报告平均准确率。
- • **对齐任务** ：为了评估模型与人类偏好的对齐程度，作者采用了一套专门的基准测试。在指令遵循性能方面，作者报告了IFEval的严格 Prompt 准确率。为了评估模型在一般话题上与人类偏好的对齐程度，作者使用了Arena-Hard和AlignBench v1.1。在写作任务方面，作者依赖Creative Writing V3和WritingBench来评估模型的熟练度和创造力。
- • **数学与文本推理** ：为了评估数学和逻辑推理能力，作者采用High-Level数学基准测试，包括MATH-500、AIME'24和AIME'25，以及文本推理任务，包括ZebraLogic和AutoLogi。对于AIME问题，每年的题目包括第一部分和第二部分，共计30道题。对于每道题，作者采样64次，并取平均准确率作为最终得分。
- • **Agent 与编程** ：为测试模型在编程和基于 Agent 的任务上的能力，作者使用了BFCL v3、LiveCodeBench以及CodeElo的Codeforces评分。对于BFCL，所有Qwen3模型均使用FC格式进行评估，并使用yarn将模型部署到64k的上下文长度以进行多轮评估。部分 Baseline 来自BFCL排行榜，取FC格式和Prompt格式中的较高分数。对于排行榜上未报告的模型，使用Prompt格式进行评估。对于LiveCodeBench，在非思考模式下，作者使用官方推荐的 Prompt 词，而在思考模式下，通过移除“你不会返回任何内容，除了程序”的限制来调整 Prompt 词模板，以允许模型更自由地思考。为评估模型与竞赛编程专家之间的性能差距，作者使用CodeForces计算Elo评分。在作者的基准测试中，每个问题通过生成最多八个独立的推理尝试来解决。
- • **多语言任务** ：为了评估多语言能力，作者考察了四种类型的任务：指令遵循、知识、数学和逻辑推理。指令遵循任务使用Multi-IF进行评估，该任务专注于8种关键语言。知识评估分为两种类型：区域知识通过INCLUDE进行评估，涵盖44种语言；通用知识使用MMMLU进行评估，涵盖14种语言，不包括未优化的约鲁巴语；对于这两个基准，作者仅采样原始数据的10%以提升评估效率。数学任务采用MT-AIME2024，涵盖55种语言，以及PolyMath，包含18种语言。逻辑推理任务使用MlogiQA进行评估，涵盖10种语言，数据。

对于所有处于思考模式的Qwen3模型，作者采用采样温度0.6、top- 值为0.95以及top- 值为20。此外，对于Creative Writing v3和WritingBench，作者应用存在惩罚1.5以鼓励生成更多多样化的内容。对于处于非思考模式的Qwen3模型，作者配置采样超参数为温度 、top- 、top- 以及存在惩罚 。对于思考和非思考模式，作者将最大输出长度设置为32,768个token，但在AIME'24和AIME'25中，将该长度扩展至38,912个token，以提供足够的思考空间。

**评估结果总结**

从评估结果中，作者总结出最终版Qwen3模型的关键结论如下：

1. 1\. Qwen3-235B-A22B在开放源码模型中展现了最先进的整体性能，无论是在思考模式还是非思考模式下，均超越了DeepSeek-R1和DeepSeek-V3等强 Baseline 模型。Qwen3-235B-A22B在与OpenAI-o1、Gemini2.5-Pro和GPT-4o等闭源领先模型相比中也极具竞争力，充分展示了其深刻的推理能力和全面的通用能力。
2. 2\. Qwen3-32B在大多数基准测试中表现优于作者之前最强的推理模型QwQ-32B，并且与闭源的OpenAI-03-mini表现相当，这表明其具有出色的推理能力。Qwen3-32B在非思考模式下也表现出色，超越了作者之前的主力非推理密集模型Qwen2.5-72B-Instruct。
3. 3\. Qwen3-30B-A3B、Qwen3-14B以及其他更小的密集模型，在参数量接近或更大的开源模型上始终表现出更优越的性能，证明了强到弱蒸馏方法的成功。

详细结果如下。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Qwen3-235B-A22B针对旗舰模型Qwen3-235B-A22B，作者将其与领先的推理和非推理模型进行比较。在思考模式下，作者选取OpenAI-o1、DeepSeek-R1、Grok-3-Beta（Think）和Gemini2.5-Pro作为推理基准。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在非思考模式下，选取GPT-4o-2024-11-20、DeepSeek-V3、Qwen2.5-72B-Instruct和LLaMA-4-Maverick作为非推理基准。作者在表11和表12中展示了评估结果。

1. 1\. 从表11可以看出，Qwen3-235B-A22B（Thinking）仅激活了60%的参数，总参数量为35%，在23项基准测试中的17项上优于DeepSeek-R1，尤其是在需要推理能力的任务（如数学、 Agent 和编程）上表现突出，展示了Qwen3-235B-A22B（Thinking）在开源模型中的顶尖推理能力。此外，Qwen3-235B-A22B（Thinking）在与闭源模型OpenAI-o1、Grok-3-Beta（Think）和Gemini2.5-Pro的对比中也表现出高度竞争力，显著缩小了开源模型与闭源模型在推理能力上的差距。
2. 2\. 从表12可以看出，Qwen3-235B-A22B（非思考型）在性能上超过了其他领先的开放源模型，包括DeepSeek-V3、LLaMA-4-Maverick以及作者之前的旗舰模型Qwen2.5-72BInstruct，并且在18/23项基准测试中超越了闭源的GPT-4o-2024-11-20，这表明即使没有经过有意思考过程的增强，该模型也具备内在的强大能力。

Qwen3-32B 对于密集模型Qwen3-32B，作者以DeepSeek-R1-Distill-Llama-70B、OpenAI03-mini（中）以及作者先前最强的推理模型QwQ-32B作为思考模式下的 Baseline 。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

作者还以GPT-4o-mini-2024-07-18、LLaMA-4-Scout以及Qwen2.5-72B-Instruct作为非思考模式下的 Baseline 。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在表13和表14中展示了评估结果。

1. 1\. 从表13可以看出，Qwen3-32B（Thinking）在23个基准测试中的17个上表现优于QwQ-32B，使其成为32B规模下新的推理模型SOTA。此外，Qwen3-32B（Thinking）在准确性和多语言性能上与闭源的OpenAI-o3-mini（中）展开竞争。
2. 2\. 从表14可以看出，Qwen3-32B（非思考型）在几乎所有基准测试中都表现出优于所有 Baseline 的性能。特别是，在一般任务上，Qwen3-32B（非思考型）的性能与Qwen2.5-72B-Instruct相当，而在对齐、多语言和推理相关任务上具有显著优势，这再次证明了Qwen3相对于作者之前的Qwen2.5系列模型的基础性改进。
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

对于Qwen3-30B-A3B和Qwen3-14B，在思考模式下将它们与DeepSeekR1-Distill-Qwen-32B和QwQ-32B进行比较，并在非思考模式下分别与Phi-4、Gemma-3-27B-IT和Qwen2.5-32B-Instruct进行比较。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

评估结果分别展示在表15和表16中。

1. 1\. 从表15可以看出，Qwen3-30B-A3B和Qwen3-14B（思考）在推理相关基准测试中都与QwQ-32B具有高度竞争力。值得注意的是，Qwen3-30BA3B在模型规模更小且激活参数不足十分之一的情况下，实现了与QwQ-32B相当的性能，这证明了作者的强到弱蒸馏方法在赋予轻量级模型深刻推理能力方面的有效性。
2. 2\. 从表16可以看出，Qwen3-30B-A3B和Qwen3-14B（非思考型）在大多数基准测试中超越了非推理 Baseline 模型。它们在显著更少的激活参数和总参数下，性能超越了作者之前的Qwen2.5-32B-Instruct模型，从而实现了更高效和更具成本效益的表现。
	![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Qwen3-8B / 4B/ 1.7B / 0.6B对于Qwen3-8B和Qwen3-4B，作者在思考模式下将它们与DeepSeek-R1-DistillQwen-14B和DeepSeek-R1-Distill-Qwen-32B进行比较，在非思考模式下分别与LLaMA-3.1-8B-Instruct、Gemma-3-12B-IT、Qwen2.5-7B-Instruct和Qwen2.5-14B-Instruct进行比较。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

对于Qwen3-1.7B和Qwen3-0.6B，作者在思考模式下将它们与DeepSeekR1-Distill-Qwen-1.5B和DeepSeek-R1-Distill-Llama-8B进行比较，在非思考模式下分别与Gemma-3-1B-IT、Phi-4-mini、Qwen2.5-1.5B-Instruct和Qwen2.5-3B-Instruct进行比较。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

作者在表17和表18中分别展示了Qwen3-8B和Qwen3-4B的评估结果，在表19和表20中展示了Qwen3-1.7B和Qwen3-0.6B的评估结果。总体而言，这些边缘侧模型表现出令人印象深刻的性能，在思考或非思考模式下，即使参数更多，也优于 Baseline 模型，包括作者之前的Qwen2.5模型。这些结果再次证明了作者强到弱蒸馏方法的有效性，使作者能够以显著降低的成本和努力构建轻量级的Qwen3模型。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 4.7 讨论

思考预算的有效性为验证Qwen3能否通过利用增加的思考预算来提升其智能水平，作者在数学、编程和STEM领域的四个基准测试中调整了分配的思考预算。由此产生的缩放曲线展示在图2中，Qwen3表现出与分配的思考预算相关的可扩展且平滑的性能提升。此外，作者观察到，如果作者进一步将输出长度扩展到32K以上，模型的性能预计在未来会有进一步的提升。作者将这一探索留作未来的工作。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

策略蒸馏的有效性与效率评估作者通过比较策略蒸馏与直接强化学习在性能和计算成本（以GPU小时计）上的表现，评估策略蒸馏的有效性与效率。计算成本均以GPU小时为单位进行衡量。为简化分析，作者仅关注数学和代码相关的 Query 。表21总结了实验结果，表明策略蒸馏在性能上显著优于强化学习，同时仅需约强化学习的1/10 GPU小时。此外，基于教师logits的策略蒸馏使学生模型能够扩展其探索空间并增强其推理能力，这一点在蒸馏后AIME'24和AIME'25基准测试中通过@64分数的提升得到验证，相较于初始预训练权重，@64分数显著提高。相比之下，强化学习并未带来@64分数的任何改进。这些观察结果突显了利用更强大的教师模型指导学生模型学习的优势。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**思维模式融合与通用强化学习的影响**

为评估思维模式融合和通用强化学习（RL）在训练后的有效性，作者对Qwen-32B模型的各个阶段进行评估。除了前面提到的数据集外，作者引入了几个内部基准来监控其他能力。这些基准包括：

- • CounterFactQA：包含反事实问题，模型需要识别这些问题并非事实，并避免生成幻觉性答案。
- • LengthCtrl：包含具有长度要求的创意写作任务；最终得分基于生成内容长度与目标长度之间的差异。
- • ThinkFollow：涉及多轮对话，其中随机插入/think和/no\_think标志，以测试模型是否能够根据用户 Query 正确切换思考模式。
- • 工具使用：评估模型在单轮、多轮及多步工具调用过程中的稳定性。该分数包括工具调用过程中意图识别的准确性、格式准确性和参数准确性。
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

结果如表22所示，作者可以得出以下结论：

1. 1\. 第三阶段将非思考模式整合到模型中，该模型在前两个阶段的训练后已具备思考能力。ThinkFollow基准分数为88.7表明模型已初步发展了在不同模式间切换的能力，尽管偶尔仍会出错。第三阶段还提升了模型在思考模式下的泛化能力和指令跟随能力，CounterFactQA提升了10.9分，LengthCtrl提升了8.0分。
2. 2\. 阶段4进一步增强了模型在思考和非思考模式下的泛化能力、指令遵循能力和Agent能力。值得注意的是，ThinkFollow分数提升至98.9，确保了模式的准确切换。
3. 3\. 对于知识、STEM、数学和编程任务，思维模式融合和通用强化学习并未带来显著改进。相反，对于AIME'24和LiveCodeBench等具有挑战性的任务，思维模式下的性能在这些两个训练阶段后反而下降。作者推测这种性能退化是由于模型在更广泛的通用任务上进行训练，这可能损害其处理复杂问题的专业能力。在Qwen3的开发过程中，作者选择接受这种性能权衡，以增强模型的整体通用性。

## 5 结论

在本技术报告中，作者介绍了Qwen系列最新版本Qwen3。Qwen3具备思考模式和非思考模式，允许用户动态管理用于复杂思考任务的token数量。该模型在包含3600万亿token的大规模数据集上进行预训练，使其能够理解和生成119种语言和方言的文本。通过一系列综合评估，Qwen3在预训练和后训练模型的标准基准测试中均表现出色，涵盖代码生成、数学、推理和Agent等任务。

在不久的将来，作者的研究将聚焦于几个关键领域。作者将继续通过使用质量更高、内容更多样化的数据来扩展预训练。同时，作者将致力于改进模型架构和训练方法，以实现有效压缩、扩展到极长上下文等目标。此外，作者计划增加强化学习的计算资源，特别关注基于Agent的强化学习系统，这些系统能够从环境反馈中学习。这将使作者能够构建能够处理需要推理时间扩展的复杂任务的Agent。

## 参考

\[1\]. Qwen3 Technical Report.

继续滑动看下一个

AGI之门

向上滑动看下一个