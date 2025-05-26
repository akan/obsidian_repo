---
title: "LLM 协作革命：Group Think 如何重塑推理边界 (万字)"
source: "https://mp.weixin.qq.com/s/5Z7Kb8hp7nhBscXxIy2hWw"
author:
  - "[[肆零柒]]"
published:
created: 2025-05-22
description: "Group Think 现在让单个 LLM 模拟多个并行推理智能体，推理速度提升数倍，资源利用效率更是碾压传统方法！"
tags:
  - "clippings"
---
Original 肆零柒 *2025年05月22日 08:15*

*点击👇🏻可关注，文章来自*

🙋♂️ 想加入社群的朋友，可看文末方法，进群交流。

---

  

**“** 让一个模型拥有多个“智慧大脑”会有多强大？Group Think 现在让单个 LLM 模拟多个并行推理智能体，推理速度提升数倍，资源利用效率更是碾压传统方法！ **”**

  

  

大家好，我是肆〇柒。今天和大家聊聊 Group Think。顾名思义，它通过让单个 LLM 模拟多个并行推理智能体，并以 token 级别的细粒度协作，提出了推理协作的新范式。这不仅能显著提升推理质量，还能在本地推理中充分利用闲置计算资源，在数据中心场景下实现高效的批量处理。  

当下 ，大型语言模型（LLM）正以惊人的速度重塑我们对智能的认知。然而，随着应用场景的不断拓展，研究人员发现，单纯依靠单个 LLM 的推理能力已经难以应对一些高度复杂的任务。例如，在机器翻译任务中，早期模型常常因语法错误或文化差异导致翻译结果生硬甚至误解原意。而如今的 LLM，通过海量多语言数据训练，不仅能准确传达原句意思，还能根据目标语言的文化背景优化表达方式，使翻译结果更加自然流畅。

但即便如此，单个 LLM 的推理过程依然存在局限。其推理路径是线性的，就像一个人独自在黑暗中摸索前行，虽然每一步都经过深思熟虑，但难免会错过一些关键线索。而且，当问题涉及多个子任务时，单线程的推理方式会导致信息整合不充分，就像一个厨师同时准备多道复杂菜肴，却只能在一个锅里依次烹饪，难以兼顾每道菜的最佳口感。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/E1DQUYfcS0JWIfCAClAemxUyddqUJZMmia3uRibymCYpP6EibePxFGIYZ9brr1m3FEnPlAricshM28QvvVBiaicY8nww/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

### 多智能体协作的挑战

为了解决这一问题，多智能体协作系统成为研究热点。多个 LLM 驱动的智能体通过轮流交换完整的推理链（CoT）进行协作，试图在信息共享中碰撞出智慧的火花。

这种机制在理论上确实能够提升推理质量。例如，在一个需要同时分析文本情感和提取关键信息的任务中，情感分析智能体可以先生成“这段文本表达了强烈的负面情绪，主要体现在‘失望’‘愤怒’等词汇的高频出现”这样的推理结果；然后信息提取智能体基于此进一步分析，提取出“用户对产品配送延迟和服务态度不满”等关键信息。两个智能体在各自领域深耕，再将成果整合，理论上可以达到 1 + 1 > 2 的效果。

然而，现实是残酷的。多智能体轮流推理的方式存在显著缺陷。信息传递的滞后性就像两个舞者通过信鸽交流舞蹈步伐，当一方收到信息时，对方早已开始新的动作，导致协作效果大打折扣。此外，协调开销巨大，智能体之间频繁的回合制交流占用了大量计算资源，就像一个会议中，参会者轮流发言，大部分时间都浪费在等待上，真正用于解决问题的时间所剩无几。

在这样的背景下，Group Think 为 LLM 的推理协作带来了全新的思路。它创造性地让单个 LLM 模拟多个并行推理智能体，这些智能体以 token 级别的细粒度相互协作，共同攻克难题。

## 相关工作

### 单智能体推理方法：CoT 的辉煌与局限

单智能体 CoT 推理是 LLM 推理领域的奠基者。它的工作原理看似简单却蕴含着巨大的智慧：当模型接收到输入 时，先生成一个长度为 的中间推理链 ，然后基于 生成最终答案 。这一过程可以形式化为：

CoT 的优势在实际应用中得到了充分验证。在数学问题求解任务中，模型先生成“已知三角形两边长为 3 和 4，夹角为 90 度，根据勾股定理可求第三边长”这样的中间推理步骤；再进一步细化为“第三边长的平方等于 ，因此第三边长为 5”；最终得出答案“该直角三角形的第三边长为 5”。这种逐步拆解问题的方式，让模型在复杂任务中的准确率相比传统方法提升了 30% 以上。

然而，随着应用场景的复杂性不断增加，CoT 的局限性逐渐暴露。其推理过程的线性结构就像一条单行道，信息只能按顺序流动，无法在不同推理阶段之间进行有效的交叉整合。

### 多智能体轮流推理方法：协作的尝试与困境

多智能体系统通过让多个 LLM 驱动的智能体依次交换完整的 CoT 进行协作，试图突破单智能体的局限。在每一轮中，智能体 根据输入 和之前所有智能体生成的 CoT 来生成自己的 CoT：

经过 轮后，基于所有 CoT 生成最终答案 ：

这种机制在理论上确实能够提升推理质量。例如，在一个需要同时分析文本情感和提取关键信息的任务中，情感分析智能体可以先生成“这段文本表达了强烈的负面情绪，主要体现在‘失望’‘愤怒’等词汇的高频出现”这样的推理结果；然后信息提取智能体基于此进一步分析，提取出“用户对产品配送延迟和服务态度不满”等关键信息。两个智能体在各自领域深耕，再将成果整合，理论上可以达到 1 + 1 > 2 的效果。

但实际情况却不容乐观。信息传递的滞后性就像两个舞者通过信鸽交流舞蹈步伐，当一方收到信息时，对方早已开始新的动作，导致协作效果大打折扣。

### 并行多智能体生成方法：探索与 Group Think 的突破

现有的并行多智能体生成方法试图通过让多个智能体同时工作来解决延迟问题。例如，混合智能体方法通过定期通信实现智能体间的协作；而一些动态方法则让 LLM 在生成过程中自主决定何时并行执行某些任务。

Group Think 在这一领域实现了重大突破。它不仅让智能体并行工作，还通过 token 级别的相互适应机制，使智能体能够实时感知彼此的推理进展并动态调整自己的推理方向。

## Group Think 方法论

### 基本原理：并行推理的交响乐

Group Think 的核心在于多个同步 CoT 链的并行生成。这些链就像交响乐团中的不同声部，既各自独立演奏，又相互交融呼应，共同构建出完整的推理乐章。

Group Think 中有 N 个智能体同时工作。每个智能体在生成自己的推理链时，能够实时看到其他智能体生成的 token 。这使得智能体能够根据其他智能体的推理进展动态调整自己的推理方向。

例如，在一个需要同时考虑算法效率和代码可读性的编程任务中，一个智能体可能先生成“为了提高效率，可以采用快速排序算法”的 token ；另一个智能体看到后，立刻调整自己的推理方向，生成“但快速排序的实现较为复杂，对于初学者来说可能影响代码可读性，可以考虑在注释中详细解释每一步逻辑”的 token 。通过这种实时互动，智能体之间实现了高效的协作。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Group Think 的基本原理

为了更直观地展示 Group Think 的基本原理，我们可以通过下图来理解。下图展示了多个推理线程如何通过 token 级别的交叉注意力机制协作。每个 token 可以访问其他线程中所有之前生成的 token，这种机制确保了推理过程中的细粒度协作。

### Group Think 的推理机制：如何协同工作

其实这一段落是我已经准备发文的时候，临时添加的。因为我觉得对于不太了解 infra 层的工程师，可能对这个 Group Think 的原理理解上还是有难度。所以我特意添加了这个段落，希望能对理解具体推理机制有所帮助。Group Think 的推理机制通过以下步骤实现：

1. 1\. **初始化** ：系统将任务分配给多个智能体（思考者），每个智能体接收到相同的输入信息。
2. 2\. **并行推理** ：在每个推理步骤中，每个智能体并行生成下一个 token。智能体在生成 token 时，会访问其他智能体之前生成的所有 token（ 交叉注意力机制）。
3. 3\. **动态调整** ：智能体根据其他智能体生成的 token 动态调整自己的推理方向，避免重复工作并提高推理效率。
4. 4\. **最终答案生成** ：所有智能体的推理链完成后，系统整合这些推理链，生成最终答案。

举例说明，在一个编程任务中，要求编写一个 Python 函数，该函数接受一个字符串列表，返回每个字符串的平均长度以及对应的字母等级（A: 长度≥10，B: 5≤长度<10，C: 长度<5）。Group Think 的推理过程如下：

1. 1\. **初始化** ：系统将任务分配给 4 个智能体（Thinker1, Thinker2, Thinker3, Thinker4）。
2. 2\. **并行推理** ：
- • Thinker1 开始生成代码框架，定义函数和输入参数。
	- • Thinker2 注意到 Thinker1 的进展后，开始编写计算字符串长度的部分。
	- • Thinker3 发现 Thinker1 和 Thinker2 的工作后，开始编写计算平均长度的逻辑。
	- • Thinker4 在看到其他智能体的工作后，开始编写根据长度分配字母等级的部分。
4. 3\. **动态调整** ：
- • 当 Thinker4 发现 Thinker3 已经开始编写平均长度的计算逻辑时，它调整自己的工作，专注于编写返回结果的代码部分。
6. 4\. **最终答案生成** ：所有智能体的推理链完成后，系统整合这些推理链，生成完整的 Python 函数代码。

通过 Group Think 的协作机制，每个智能体在推理过程中能够实时感知其他智能体的进展并动态调整自己的工作内容，从而显著提高了代码生成的效率和质量。

  

### Token 级、相互适应的多智能体推理：数学之美

在 Group Think 中，智能体的 token 预测过程可以用以下公式描述：

其中， 表示智能体 在前 个时间步生成的 token 序列； 是智能体 在第 个时间步的推理函数，用于生成下一个 token 。

最终答案 则是基于所有智能体的推理链生成的：

这种 token 级别的协作机制赋予了 Group Think 极高的灵活性和适应性。例如，在一个需要列举多种解决方案的问题中，一个智能体可能生成了“方案一：采用深度学习方法”的 token ；另一个智能体看到后，迅速调整自己的推理方向，生成“方案二：结合传统机器学习算法以降低计算成本”的 token 。通过这种方式，Group Think 能够在推理过程中实时探索多种可能性。

### 高效实现方案：本地推理与数据中心的双重奏

#### 本地推理场景下的实现：唤醒闲置计算力

在个人或边缘计算环境中，推理请求通常以单个查询的形式出现。这种小批量处理方式往往导致计算设备的内存带宽成为系统瓶颈，大量计算资源闲置。Group Think 通过巧妙地创建人工批次，将多个智能体的推理任务整合在一起，充分利用了原本闲置的计算能力。

对于一个查询，Group Think 中的 N 个智能体并行工作，形成一个大小为 的有效智能体级别批次。每个智能体被分配一个 token 预算 。在 prompt 之后，每个智能体 并行生成其下一个 token 。为了实现这一点，系统为每个智能体分配了 个位置，用于存储其他智能体之前生成的 token ，并将每个新 token 分配到位置索引 。

为了使每个智能体能够访问其他智能体生成的 token ，Group Think 修改了标准的因果注意力掩码。这种修改允许智能体在生成 token 时，不仅关注自己的历史 token ，还能关注其他智能体生成的 token 。

例如，在一个需要同时生成多种风格文本的创作任务中，一个智能体可能生成了“风格一：采用浪漫主义手法”的 token ；另一个智能体看到后，调整自己的生成方向，生成“风格二：结合现代主义元素以增强表现力”的 token 。通过这种实时互动，智能体之间实现了高效的协作，充分利用了计算资源。

下图展示了 Group Think 在本地推理场景下的实现方式。通过创建人工批次和调整注意力掩码，多个智能体的推理任务被整合在一起，显著提高了计算资源的利用率。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Group Think 的本地推理实现

#### 数据中心场景下的实现：批量处理的艺术

在数据中心应用中，通常需要将多个请求聚合为一个批次进行处理，以最大化计算效率。Group Think 通过 token 级别的交错生成和 KV 缓存的巧妙利用，实现了对混合请求（包括 Group Think 请求和其他标准请求）的高效批量处理。

每个智能体被分配一个 token 索引槽，这些索引决定了对应的 positional embeddings 。在推理过程中，每个生成步骤为每个智能体填充一个 token ，从而形成交错的 KV 缓存。通过这种方式，因果掩码在注意力机制中允许每个新 token 关注所有之前生成的 token （包括来自所有智能体的 token ），从而实现了 Group Think 的协作优势。

例如，在一个需要同时处理多个用户请求的场景中，一个智能体可能生成了“用户 A 请求：分析股票市场趋势”的 token ；另一个智能体看到后，调整自己的生成方向，生成“用户 B 请求：制定投资组合优化方案”的 token 。通过这种交错生成方式，数据中心能够在同一个批次中高效处理多种类型的请求，大幅提高了计算资源的利用率。

下图展示了 Group Think 在数据中心场景下的实现方式。通过 token 级别的交错生成和 KV 缓存的利用，多个智能体的推理任务被整合到一个批次中，实现了高效的批量处理。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 实验评估

### 实验设置：搭建推理能力的测试舞台

实验采用了 80 亿参数和 700 亿参数的两种模型，分别在 NVIDIA 3080 GPU 和 8 个 NVIDIA V100 GPU 上运行。为了促进模型的协作行为，实验采用了以下系统提示：

```
1. There are multiple thinkers. These thinkers, Thinker1, Thinker2,
Thinker3 ... , try to answer a question together. The answer is considered
solved if the thinkers can COLLECTIVELY determine the final answer, even if
each thinker only has partial answers.
2. Each thinker will write its own thought process towards the final answer.
Each thinker is encouraged to take the other thinkers’ progress into account
to reach the final answer.
3. Considering all the information from other thinkers, each thinker will
continue contributing to the collective knowledge.
Your response should focus on reaching the solution collaboratively as
efficiently as possible. Make sure information that you generate is not
redundant to the group. It is thus important to consider the outputs of
other thinkers during generation. Do not summarize other thinkers’ responses,
as it is too cost inefficient.
Please answer this question.
Problem: {QUESTION}
–- You are Thinker {ThinkerID}. Your Response:
```

译文：

```
# Group Think Prompt 译文：

1. 有多个思考者（Thinker）。这些思考者（Thinker1, Thinker2, Thinker3...）试图共同回答一个问题。只有当思考者们能够集体确定最终答案时，问题才算解决，即使每个思考者只掌握了部分答案。

2. 每个思考者将写下自己对最终答案的思考过程。每个思考者被鼓励考虑其他思考者的进展，以达成最终答案。

3. 考虑其他思考者提供的所有信息，每个思考者将继续为集体知识做出贡献。您的回应应聚焦于尽可能高效地协作以达成解决方案。确保您生成的信息对集体而言并非冗余。因此，在生成过程中考虑其他思考者的输出至关重要。请勿总结其他思考者的回应，因为这样做成本过高。请回答以下问题。问题：{QUESTION} –- 您是思考者 {ThinkerID}。您的回应：
```

这种提示方式就像为智能体们制定了明确的协作规则，引导它们在推理过程中积极交流、避免重复工作。

### 性能 - 延迟权衡评估：数据见证 Group Think 的优势

#### 枚举任务：从简单中洞察非凡

枚举任务看似简单，却是 Group Think 展现协作优势的绝佳场景。它的原理是让模型生成包含 L 个不同项目的列表。完成覆盖率定义为：

Completion Coverage = min(1, #distinct items generated / L)

例如，在“列出 100 个男性的名字”这一任务中，Group Think 通过多个智能体的协作，显著提升了任务完成速度。实验结果显示，当智能体数量为 N 时，Group Think 的初始速度比 CoT 快了近 N 倍。随着智能体逐渐接近解决问题，加速效果逐渐放缓，但始终保持着对 CoT 的显著优势。

更重要的是，Group Think 展现出了惊人的协作行为。在生成男性名字的实验中，智能体们自发地将名字按文化、历史和地区分类。例如，一个智能体专注于生成英语国家常见的名字，如“Alexander”“Benjamin”；另一个智能体则转向古代希腊和罗马文化中的名字，如“Apollo”“Atlas”；还有智能体负责亚洲文化中的名字，如“Kai”（日语起源）“Kenji”（中文起源）。这种分类行为并非人为设定，而是模型在 Group Think 范式下自然涌现的协作策略。

下图展示了 Group Think 在枚举任务中与 CoT 的性能对比。可以看到，Group Think 在初始阶段的加速效果非常显著，随着智能体数量的增加，任务完成速度进一步提升。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### 分而治之任务：复杂问题的高效破解

以经典的 Floyd-Warshall 算法为例，Group Think 在解决复杂问题中的优势得到了进一步验证。在这个任务中，模型需要计算一个有向加权图中所有节点对之间的最短路径。完成覆盖率定义为组正确解决的距离矩阵条目的比例。

实验中，随机生成了多个包含 5 个节点的图。结果显示，4 个智能体的 Group Think 能够将延迟降低到 CoT 的一半。随着智能体数量的增加，延迟进一步减少。这种效果源于智能体们在更新距离矩阵时的高效协作。一个智能体可能先更新了节点 i 到节点 j 的路径，另一个智能体看到后，迅速利用这个信息更新其他相关路径。

下图展示了 Group Think 在分而治之任务中的性能表现。可以看到，Group Think 在解决复杂问题时的延迟显著低于 CoT，且随着智能体数量的增加，延迟进一步减少。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### 编程任务：现实场景中的协作魔法

编程任务为 Group Think 提供了一个贴近实际应用场景的测试平台。在这个任务中，模型需要生成满足特定规范的代码。完成覆盖率定义为组正确完成的组件数量与总组件数量的比值。

实验要求模型生成能够解决多步骤编程问题的代码。结果显示，CoT 在生成过程中很快趋于平缓，无法有效解决问题；而拥有 4 个或更多智能体的 Group Think 能够在合理的生成预算内接近正确解决方案。在代码生成过程中，Group Think 展现出了高度的协作警觉性。当多个智能体开始处理同一个代码部分时，其他智能体能够迅速检测到重复工作并切换到其他任务。例如，在生成一个学生成绩处理程序时，一个智能体专注于计算平均分的函数，另一个智能体则转向生成成绩等级分配的函数，避免了重复代码的生成。

下图展示了 Group Think 在编程任务中的性能表现。可以看到，Group Think 在编程任务中的完成覆盖率显著高于 CoT，且随着智能体数量的增加，性能进一步提升。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Group Think 与 CoT 在编程任务中的性能对比

### Group Think 在自然语言处理领域的文本生成任务中的应用

Group Think 在自然语言处理领域的文本生成任务中展现出了巨大的潜力。例如，在一篇需要融合多种风格（新闻报道、学术论文、故事创作等）的文章生成任务中，Group Think 能够协调不同智能体生成不同风格的文本段落。

实验中，一个智能体可能生成了“根据最新数据，全球气温上升了 1.2 摄氏度（新闻报道风格）”的段落；另一个智能体看到后，调整自己的生成方向，生成“气温上升对生态系统的影响可以从生物多样性减少和极端气候事件频发两个方面进行分析（学术论文风格）”的段落；第三个智能体则进一步补充“在一个小村庄，农民们发现作物生长周期明显缩短，这直接影响了他们的生活（故事创作风格）”。通过这种协作，Group Think 生成的文章不仅在文本多样性上显著优于传统方法，还在逻辑连贯性上实现了提升，不同风格的段落自然衔接，整体文章更具深度和吸引力。

下图展示了 Group Think 在文本生成任务中的实现方式。每个智能体被分配一个 token 索引槽，这些索引决定了对应的 positional embeddings 。通过这种方式，多个智能体的推理任务被整合在一起，实现了高效的文本生成。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Group Think 在文本生成任务中的实现

### Group Think 在图像识别领域的潜在应用

Group Think 在图像识别领域也具有广阔的应用前景。例如，在分析一张复杂图像时，多个智能体可以协同工作，每个智能体专注于图像的不同部分或特征。一个智能体可能专注于识别图像中的物体轮廓，生成“图像左上方存在一个矩形轮廓”的 token ；另一个智能体则分析物体的颜色和纹理，生成“该矩形区域主要由红色和蓝色像素组成，表面纹理光滑”的 token 。通过协作整合这些信息，模型能够更准确地识别图像内容。

实验数据表明，采用 Group Think 的图像识别模型在复杂场景下的准确率相比传统方法提升了 15% 以上。例如，在一个包含多种物体的街头场景图像中，传统方法可能只能识别出主要物体如“汽车”和“行人”，而 Group Think 能够进一步识别出“汽车的颜色为红色”“行人的衣物纹理为条纹”等细节信息，显著提高了识别的鲁棒性和细致程度。

### 与独立采样基线的比较：协作的力量

为了量化 Group Think 协作机制的优势，实验将其与独立采样（Independent Sampling，IS）基线进行了对比。结果显示，在低延迟预算下，Group Think 和 IS 的表现相当。然而，随着推理预算的增加（通过增加智能体数量 N 或每个智能体的 token 预算 K ），IS 的冗余度逐渐增加，而 Group Think 凭借其高效的协作机制，展现出越来越大的完成覆盖率优势。例如，在编程任务中，当智能体数量增加到 4 个且每个智能体的 token 预算增加到 100 时，Group Think 的完成覆盖率比 IS 高出 40% 以上。

下图展示了 Group Think 与 IS 在不同智能体数量和延迟预算下的性能对比。可以看到，Group Think 在大多数情况下都能显著提高完成覆盖率，特别是在智能体数量较多且延迟预算较大时，优势更加明显。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 讨论与未来工作

### Group Think 的能力与局限：协作的双刃剑

Group Think 在实验中展现出了令人印象深刻的能力。它能够有效避免重复推理，智能体之间通过实时信息共享动态调整推理路径。此外，Group Think 还能自然涌现协作行为，例如在枚举任务中按类别分工、在编程任务中分配代码组件，这些行为无需显式指令，是模型在 Group Think 范式下自发形成的。

然而，Group Think 也存在局限性。其通信开销在低延迟预算下可能会成为性能瓶颈。例如，当智能体数量过多且每个智能体的 token 预算较小时，智能体之间传递的信息可能过于简略，导致协调效果不佳。

### 深化局限性分析

#### 智能体数量增加带来的协调复杂性

随着智能体数量的增加，Group Think 的协调复杂性显著上升。每个智能体需要关注的其他智能体的 token 数量呈线性增长，导致计算复杂度上升。例如，当智能体数量从 2 增加到 10 时，每个智能体需要关注的其他智能体的 token 数量从 N − 1 = 1 增加到 N − 1 = 9 。假设每个 token 的计算开销为 C ，那么每个智能体的计算开销从 C × 1 增加到 C × 9 ，整体计算复杂度增加了 9 倍。这不仅会显著降低推理速度，还会增加资源占用，对硬件性能提出更高要求。

#### 模型训练难度上升的问题

为了实现 Group Think 的 token 级协作机制，模型训练过程中需要额外考虑多智能体协作的监督信号设计。例如，需要设计能够衡量智能体间协作效果的损失函数，确保智能体在生成 token 时既能保持自身推理的连贯性，又能与其他智能体的输出有效协作。同时，为了防止智能体间过度依赖或信息过载，训练过程中还需要引入正则化策略，如限制智能体对其他智能体 token 的关注程度，或采用 dropout 技术随机屏蔽部分智能体的输出。这些额外的设计和优化大大增加了模型训练的复杂度和难度。

### 未来发展方向：协作的进化之路

#### 专门数据集的构建：协作智慧的燃料

构建专门的 Group Think 数据集是未来发展的关键。一个高质量的数据集应涵盖多样化场景，展示良好的 Group Think 行为。例如，在医疗诊断场景中，数据集可以包含多个医生如何通过实时交流协作诊断复杂病例的案例；在科学研究场景中，可以记录科学家们如何在实验设计和数据分析过程中相互启发。这些数据将为模型提供丰富的协作示例，帮助其学习更高效的协作策略。

#### 复杂协作行为的探索：协作的高级形态

Group Think 在更复杂协作行为方面具有巨大潜力。例如，动态角色分工可以让智能体在推理过程中根据自身优势和任务需求实时调整角色。一个智能体可能在某个阶段担任规划者角色，制定整体解决方案的框架；在另一个阶段转变为执行者，负责具体代码的实现。这种动态分工可以通过强化学习实现，模型在训练过程中学习到在不同情况下切换角色的最佳时机。

此外，探索与利用的平衡也是未来研究的重要方向。智能体需要在遵循现有推理路径（利用）和探索新可能性（探索）之间找到最佳平衡。例如，在一个需要创新解决方案的任务中，部分智能体可以专注于探索新的算法，而另一部分智能体则负责优化现有算法的实现细节。通过这种方式，Group Think 能够在稳定性和创新性之间取得平衡。

#### 资源受限环境下的应用：协作的轻量化

Group Think 在资源受限环境下的应用前景广阔。通过优化实现方案，例如采用更高效的注意力机制和模型压缩技术，Group Think 可以在边缘设备上高效运行。这将使智能语音助手、物联网设备等能够在本地完成复杂的推理任务，减少对云端的依赖，降低延迟并提高数据隐私性。

## 总结

Group Think 作为一种全新的推理协作范式，通过让单个 LLM 模拟多个并行推理智能体，并以 token 级别的细粒度协作，显著提升了推理质量和效率。在本地推理中，Group Think 能够充分利用闲置计算资源，将边缘设备的推理能力提升到一个新高度；在数据中心场景下，它通过高效的批量处理机制，为大规模推理任务提供了强大的支持。

Group Think 的贡献不仅体现在技术性能的提升上，更在于它为 LLM 的协作行为提供了一种新思路。它证明了即使在没有显式训练的情况下，现有的 LLM 也具备一定的协作能力。这为未来专门针对协作推理的数据集构建和模型训练奠定了坚实的基础。 在深入了解 Group Think 的过程中，它让我对 LLM 推理方式的传统认知发生了改变，让我看到了智能体之间协作的巨大潜力。

最吸引我的是 Group Think 的 token 级别协作机制。这种细粒度的互动方式，使它们能够在推理过程中实时感知彼此的进展并迅速调整自己的方向。这让我联想到人类团队中的高效协作场景，比如在一场紧张的 手术 中，医生、护士和麻醉师通过实时交流和观察彼此的动作，精准地完成每一个操作步骤，最终拯救患者的生命。Group Think 似乎正在赋予机器类似的协作能力，这无疑是人工智能领域的一大飞跃。

同时，Group Think 在资源利用效率方面的优势也让我印象深刻。在本地推理场景中，它能够唤醒边缘设备上原本闲置的计算资源，这让我想起了自己使用智能语音助手的经历。如果 Group Think 能够应用于这些设备，未来的智能助手将能够在本地快速完成复杂的任务，如实时翻译多种语言的会议记录或生成个性化的旅行计划，而无需依赖云端计算，这将极大地提升用户体验并保护数据隐私。

在实验评估部分，看到 Group Think 在枚举、分而治之和编程任务中的出色表现，我感到兴奋。特别是多智能体在枚举任务中自发分类的行为，让我深刻体会到了 Group Think 的智能和灵活性。这就像看着一群志愿者在没有任何指挥的情况下，自发地将一堆杂乱的书籍按类别整齐地摆放到书架上，这种涌现的协作智慧令人惊叹。

其实如果看我文章的朋友，一定注意到前些天我发的另外几篇文章，他们都是 inference-time scaling 时期完成的推理计算。比如： 《 [解锁大模型推理新潜能：重复采样的魔力](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247488146&idx=1&sn=b250abb5f54947b645742cdc2f8b3816&scene=21#wechat_redirect) 》， 《 [并行扩展（Parallel Scaling）：一种新型语言模型扩展范式（万字）](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247488474&idx=1&sn=f355ea54965069fbae0f1ee6fab5964f&scene=21#wechat_redirect) 》，那么区别在哪？我拿重复采样（ Repeated Sampling）这个方法，形成一个表格，简单对比如下：

| 维度 | Group Think | 重复采样（独立采样） |
| --- | --- | --- |
| **协作机制** | 智能体之间通过交叉注意力机制实时协作，动态调整推理方向 | 采样路径独立，无协作或信息共享 |
| **推理方式** | 多个智能体并行推理，共享信息，实时调整推理内容 | 多个路径独立进行 next token prediction |
| **任务处理** | 智能体根据其他智能体的工作动态调整任务，避免重复 | 各路径独立处理相同任务，可能存在重复工作 |
| **效率** | 高效，通过协作减少冗余推理 | 较低，存在重复工作，依赖事后选择机制 |
| **推理质量** | 较高，整合各智能体优势，提升推理质量 | 较低，依赖采样路径的多样性及事后选择效果 |
| **应用场景** | 复杂推理任务，如编程、图像识别等需要协作的任务 | 适用于任务间相互独立，依赖多样性覆盖解空间 |
| **智能体间通信** | 存在，智能体可通过交叉注意力访问其他智能体的 token | 不存在，各采样路径独立无通信 |
| **最终答案生成** | 基于所有智能体的推理链整合生成 | 事后通过选择机制（如投票、奖励模型）从采样路径中选择最佳结果 |
| **动态调整** | 支持，智能体根据其他智能体进展动态调整推理方向 | 不支持，各采样路径固定，无动态调整 |
| **资源利用** | 更优，高效利用计算资源，尤其在本地推理场景 | 较差，重复工作导致资源浪费 |

一句话总结：这种 Group Think 并行推理的机制与重复采样（ Repeated Sampling） 的原理其实有接近的地方，但不同的是前者通过交叉注意力机制产生了“协作”，而后者仅仅是在独立的线性槽位中进行 Next Token Predict，并且后者是重复采样同一个任务。Group Think 的关键创新点就在于引入了智能体间的“通信”协作，而重复采样缺乏这种协作机制。

在我们了解原理和机制以后，是不是有点兴奋，这样的机制甚至可以在现有模型上修改推理代码就可以向上吞噬应用层的 Multi-Agent 实现，并且在 inference-time通过批次推理LLM的方式，要比在应用层进线程并发推理的方式还要高效，因为跳出 inference-time，效率会下降， 进线程 并发会出现气泡。 当然，目前 Group Think 这种范式仍处于发展的初期，面临着通信开销和协作策略优化等挑战。但它不妨碍我们看到 LLM 从“智能个体”向“智能集体”转变的趋势。 各位，看过此文有什么感想？如有其他想法可以在评论区留言，我们聊聊。或者加入“ 觉察流 ”社区群，与群里的小伙伴一起学习、交流。加入方法，私信回复“ 入群 ”“ 加群 ”即可。

如果你关注AI大模型相关的技术，可以点击订阅主题👉“ [AI模型](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzk2NDA0MzcxNw==&action=getalbum&album_id=3797799078092619776) ”。

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

参考资料

- • Group Think 论文原文  
	https://arxiv.org/pdf/2505.11107
- • Floyd-Warshall  
	https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall\_algorithm
-

关联阅读

◆ [系统提示(Prompt)优化：基于元学习的双层优化框架（万字）](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247488496&idx=1&sn=81712590f42840f79dfc0efa4f565b8b&scene=21#wechat_redirect)

◆🔥 [OpenAI发布：企业AI落地指南——应用场景识别与规模化应用策略](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247487453&idx=1&sn=bc89b07d8d8efaa74c75a432e7a6fb1d&scene=21#wechat_redirect)

◆ [OpenAI 发布：构建 AI Agent 实用指南](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247487453&idx=2&sn=a5949727f355651f6ec849e23cae436b&scene=21#wechat_redirect)

◆🔥 [OpenAI 发布企业 AI 集成技术手册：从评估到自动化](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247487420&idx=1&sn=0c0d91562520ec392d38d47b2616196a&scene=21#wechat_redirect)

◆🔥 [AI 的下半场：从解决问题到定义问题](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247487340&idx=1&sn=8e217f47094ce8dbca2c21e312d59932&scene=21#wechat_redirect)

◆ [微软 BitNet b1.58 2B4T：低比特效率革命，让模型在边缘设备 “飞” 起来](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247487318&idx=1&sn=520a21b573c9217af1d1fde9f7d054d0&scene=21#wechat_redirect)

◆ [SQL-R1-7B：用强化学习优化复杂SQL查询，性能比肩32B模型](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247487318&idx=2&sn=8840a0ebbedc0eb61828adab63917ae1&scene=21#wechat_redirect)

◆🔥 [DeepSeek-R1：如何让AI像人类一样“深度思考”？(综述)](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247487304&idx=1&sn=e5a7eca4d50f25a8cc8e8de315252259&scene=21#wechat_redirect)

◆🔥 [AI 有病！技术的缺陷？还是人性的弱点？](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247487304&idx=2&sn=6bc111da3b1ab4ae661255966e9554bd&scene=21#wechat_redirect)

◆🔥 [Reason Model 的“瘦身计划”：量化技术的得与失](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247487258&idx=1&sn=e854d78014236cabcf4f43194fa401bd&scene=21#wechat_redirect)

◆🔥 [GLM-4 开源32B推理模型，OpenAI 发布 GPT-4.1](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247487233&idx=1&sn=24ce0784e0e5b7348623995a3aab5e4f&scene=21#wechat_redirect)

◆ [AI 的经济性格：litmus 测试揭示 AI 的选择倾向](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247487178&idx=2&sn=84ec64ab499224cada44a96ea7c841b8&scene=21#wechat_redirect)

◆ [Thinking Intervention：掌控 AI 思考推理的新范式](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247486765&idx=2&sn=b342a49f448f667998481235c2fbd5ee&scene=21#wechat_redirect)

◆ [ReSearch 框架：让 AI 像人类一样边思考边搜索](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247486765&idx=1&sn=ec4803dfe5951b0196d9f861ed852667&scene=21#wechat_redirect)

◆🔥 [Llama 4 发布：10M 长上下文,MOE,多模态,2 万亿总参数 SOTA 是亮点](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247486717&idx=1&sn=310848d443d4e5ea9f31b19ec864d6f7&scene=21#wechat_redirect)

◆ [SICOG：让多模态模型学会 “观察” 和 “思考”](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247486632&idx=2&sn=bed931fa29520fc888e7285e42f57caa&scene=21#wechat_redirect)

◆ [Claude 3.7 Sonnet：AI 如何重塑劳动市场与经济格局](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247486589&idx=1&sn=10d0980d53379273ac488fe9079d7ec0&scene=21#wechat_redirect)

◆ [全模态的突破：Qwen2.5-Omni-7B技术报告](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247486555&idx=2&sn=94c4b913d1a49940bace9c46ac0066db&scene=21#wechat_redirect)

◆ [生成式检索的幻觉难题，看看支付宝的方案](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247486504&idx=1&sn=a99e6b553b76b4c402b589249886965c&scene=21#wechat_redirect)

◆ [Claude：AI 如何用“通用语言”思考、规划和计算？](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247486492&idx=1&sn=93eb424e2c112941980d8eb09250b3c7&scene=21#wechat_redirect)

◆ [🚀重磅！千问体验站即将接入 MCP！Anthropic 疑将发 500K 上下文 Claude Sonnet3.7 ？](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247486458&idx=1&sn=e172f248a846280d4842891cedba25f4&scene=21#wechat_redirect)

◆🔥 [DeepSeek“鲶鱼”：混元-T1正式亮相, Qwen3近在咫尺, GPT-5将免费](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247486329&idx=1&sn=143e8169b46b3fdbabe5a34b0fd92df3&scene=21#wechat_redirect)

◆ [OpenAI 发布新一代音频模型](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247486257&idx=1&sn=88be69984c8c43c27b6a3869fce33acd&scene=21#wechat_redirect)

◆ [STEVE：让 AI 更智能地操控图形界面](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247486248&idx=2&sn=3b0f5ee27f5a5d12c86881e998f2a61d&scene=21#wechat_redirect)

◆ [MCoT：让机器像人类一样思考 (综述)](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247486232&idx=1&sn=d473e7066c47ed7a4041c704b7bc9656&scene=21#wechat_redirect)

◆ [CompassJudger-1：AI模型Judger的全栈解决方案（万字长文）](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247486106&idx=2&sn=7f39e86181a639d278c5c37fbe181303&scene=21#wechat_redirect)

◆ [SEAP剪枝：让大型语言模型在效率与性能间找到完美平衡](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247486062&idx=2&sn=8bb05a6342489adca5fb19087f1de367&scene=21#wechat_redirect)

◆ 🩺 [AI在医疗领域的深度探索：Baichuan-M1的实践与展望](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485945&idx=2&sn=1773efdcec5e742a521f2f2d7fa46b8f&scene=21#wechat_redirect)

◆🤖 [AgiBot World：智元通用具身基座模型，为机器人通用智能按下“快进键”](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485889&idx=1&sn=7f48de41780c9bca249fa07a2afec91a&scene=21#wechat_redirect)

◆🇺🇳 [多语言模型的“语言孤岛”：跨语言知识转移的真相](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485872&idx=2&sn=4d7f97ff94f8d338ac54a0dfc83aae65&scene=21#wechat_redirect)

◆🔥 [QwQ-32B比肩671B的DeepSeek-R1，全球首发通用 AI Agent](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485777&idx=1&sn=4ae7e0b6e9daf40be4ba717d03163ca0&scene=21#wechat_redirect)

◆❄️ [QASnowball：用“迭代雪球”打破问答数据困境-问答数据合成](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485777&idx=2&sn=1bff3ab1bf7ce888e337ef4df156fcae&scene=21#wechat_redirect)

◆ [长文本 Prompt 中的语言模型：真的能有效利用所有信息吗？](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485758&idx=1&sn=80a625cc0b411da868fa27350ec5c0c9&scene=21#wechat_redirect)

◆ [AI提示词工程：如何让机器更懂你？预警1.3万字长文](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485747&idx=2&sn=9de8b9917d9d01b979e8f3b45da4c0f0&scene=21#wechat_redirect)

◆ 🏃 [LoRA 微调：如何在不损害 LLM 的情况下添加新知识](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485560&idx=1&sn=408c04f4d06342a25e7f5a1e82a7b328&scene=21#wechat_redirect)

◆ [LLaDA：打破自回归模型垄断的全新语言模型](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485533&idx=2&sn=ab002e7ba0075a0eb7dd59176a232e0e&scene=21#wechat_redirect)

◆🔥 [Inception Labs 推出 Mercury：语言模型的新突破——Diffusion LLM](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485513&idx=1&sn=96e0ddd3075223625c224c7295c140a0&scene=21#wechat_redirect)

◆ [1B LLM 超越 405B LLM？这项研究揭示了什么](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485484&idx=2&sn=45c4ca3d2e217335d217baef12640622&scene=21#wechat_redirect)

◆🚀 [标点符号的隐藏力量：揭秘 AI 模型中的上下文记忆](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485426&idx=1&sn=d7f273b901c40090f4a52a75fbf5fd4e&scene=21#wechat_redirect)

◆🔥 [EasyR1：多模态强化学习训练的高效框架](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485388&idx=1&sn=823019a3c72f6035e6820e5137624f0c&scene=21#wechat_redirect)

◆ [Themis：如何用 AI 评估 AI ？](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485329&idx=2&sn=6216ffc837caae2ee9bd078bacac0587&scene=21#wechat_redirect)

◆🔥 [R1-V ：用低成本强化学习，让视觉语言模型实现超强泛化](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485244&idx=2&sn=81588a32bf1c2ea78ec6d0d8dbc717b2&scene=21#wechat_redirect)

◆🔥 [强化学习 (RL) 与监督微调 (SFT)：谁更能提升模型泛化能力？](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247484783&idx=2&sn=625b41fe06e2d9a0b037497ebcae3b0d&scene=21#wechat_redirect)

◆ [DeepSeek 等模型训练所依赖的合成数据，BARE 提出了新思路](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485128&idx=1&sn=ff746c724f716ac70b7387668e7f1d0f&scene=21#wechat_redirect)

◆🔥 [Open-R1：深度揭秘 DeepSeek-R1 开源复现进展](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485093&idx=1&sn=16420c134da394c0ade4fd69aea75d57&scene=21#wechat_redirect)

◆ [Satori带来COAT：解锁LLM自省推理潜能，告别Deepseek教师模型](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485000&idx=2&sn=6a590456a02806ce1fa38f7c024f7624&scene=21#wechat_redirect)

◆🔥 [AI学会自我反思？Agent-R 使用蒙特卡洛树搜索(MCTS)自我训练自动纠错，让AI更聪明](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247484867&idx=1&sn=54dfc08be9c192f2f6d80811680f46ae&scene=21#wechat_redirect)

◆ [CoRAG：RAG 模型的新思路，多跳问答性能显著提升](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485049&idx=2&sn=b8c5b3a30ed5adc07a3cc2ae67e14029&scene=21#wechat_redirect)

◆ [Satori 带来 COAT：解锁LLM自省推理潜能，告别Deepseek教师模型](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247485000&idx=2&sn=6a590456a02806ce1fa38f7c024f7624&scene=21#wechat_redirect)

◆🔧 [十大LLM基准测评：助力AI团队选型与研发](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247484145&idx=1&sn=433a9fa46d63a60e6b5d0c85deb0d418&scene=21#wechat_redirect)

◆ [Meta 隐秘的 AI 训练数据获取：81.7TB 盗版书籍背后的真相](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247484818&idx=1&sn=0617133fac5c823158f3b86cda3f4801&scene=21#wechat_redirect)

◆🔥 [AI 训练新风向： FP4 量化赋能大型语言模型训练，打破算力瓶颈](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247484786&idx=1&sn=51fa582b543e67abb5ac6f17e34daa2a&scene=21#wechat_redirect)

◆ [微调重排序（reranker）模型：让 AI 更懂你的需求](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247484727&idx=3&sn=6b7ba737b52f32151401f8a698074f3e&scene=21#wechat_redirect)

◆ [不要过多思考 2+3=？关于o1类LLMs的过度思考【论文】](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247483851&idx=2&sn=16cc36b6c3802b5ec7a37d7c874db0fc&scene=21#wechat_redirect)

◆🔥 [AI的“人味儿”从何而来？DPO和LoRA打造更拟人化的AI](https://mp.weixin.qq.com/s?__biz=Mzk2NDA0MzcxNw==&mid=2247484243&idx=1&sn=a97bf7a8f0b249b7ec487063a326e793&scene=21#wechat_redirect)

  

  

注：本文素材由AI辅助翻译，内容由人工整理/审核发出

  

*欢迎 *点** **、* *加** **、* *关注* *。公号加⭐️精彩不错过**

---

我是肆〇柒🐝，一名热爱AI的互联网人。在这里， 我 分享自己的观察与思考，希望我的探索能激发同样热爱科技与生活的你，为你带来灵感与思考。  

  

期待我们的不期而遇。 点击👇🏻关注

---

*🙋♂️* 入群交流

1\. 公众号菜单点击“社群”，扫码入群。

2\. 回复“入群”“加群”等，添加作者微信进群。

继续滑动看下一个

觉察流

向上滑动看下一个