---
title: "仅需152个样本，性能提升48%：Memory-R1如何重塑Agent记忆能力？"
source: "https://mp.weixin.qq.com/s/IyjnrtU3dL5YujcNYktSYQ"
author:
  - "[[编辑部]]"
published:
created: 2025-08-29
description:
tags:
  - "强化学习"
  - "记忆管理"
  - "智能体框架"
abstract: "Memory-R1通过强化学习训练双智能体框架，仅用152个样本就显著提升了LLM的记忆管理能力。"
---
Original 编辑部 *2025年08月29日 14:52*

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bagQwia50hD3EdOSsO5diaOCc7uJtpiaGMHZLdfctpSp7MkD00Zx8kwehsw7BRTX9RJCzicUI1gu2dRLNA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1) **记性不好** 。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bagQwia50hD3EdOSsO5diaOCc7QRB3gttic1YAINKEH4icukRb7v6wuqyYlZkymEvzaGEsd3yk1V2GhCnQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

- 论文：Memory-R1: Enhancing Large Language Model Agents to Manage and Utilize Memories via Reinforcement Learning
- 链接：https://arxiv.org/pdf/2508.19828

你可能会问，ChatGPT、GPT-4这些模型不是挺聪明的吗？怎么还会记性不好？其实，现在的LLM本质上是“ **无状态** ”的——它们每次回答你的问题，都像是第一次见面，不会主动记住之前的对话。这是因为它们的“记忆”被限制在了一个固定的上下文窗口里，好比只能看最近几页聊天记录，更早的内容就“忘了”。

为了解决这个问题，研究者们尝试给LLM加一个“外部记忆库”，就像给它一个笔记本。但问题来了：笔记本里该记什么？什么时候更新？怎么避免记重复或矛盾的内容？现有的方法大多靠人工设定的规则（启发式），不够灵活，也学不会优化。

而这篇文章的亮点就在于： **它让LLM自己学会管理记忆！** 通过 **强化学习（RL）** ，训练两个专门的“智能体”：一个负责决定如何记笔记（记忆管理），另一个负责如何用笔记回答问题（记忆使用）。结果呢？仅仅用了 **152个问答对** 进行训练，它的表现就大幅超越了现有最好的基线模型！

接下来，我们就一步步拆解这篇论文，看看它是如何实现这一突破的。

## 论文概述与核心问题

这篇论文的核心，是解决LLM在长对话和多轮任务中的“记忆难题”。现有的LLM（如GPT-4、LLaMA）虽然强大，但受限于上下文长度，无法持久记忆历史信息。之前的工作通常通过检索增强生成（RAG）来扩展记忆，但检索过程往往是静态和启发式的——要么漏掉关键信息，要么塞进太多噪声，导致模型分心。

更关键的是， **记忆管理** （该记什么、改什么、删什么）几乎没有被“学习”过。现有系统即使提供了增删改查（CRUD）接口，也是靠LLM根据上下文指令直接选择，没有优化信号。例如，用户先说“我领养了一只狗叫Buddy”，又说“我又领养了一只叫Scout”，原始系统可能会误以为这是矛盾操作，错误地执行“删除+新增”，而不是合并为“领养了两只狗：Buddy和Scout”。

因此，作者提出： **强化学习（RL）** 是实现自适应记忆管理的关键。RL可以通过结果奖励（如最终答案是否正确）来学习记忆操作策略，无需人工标注每一步该怎么做。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## Memory-R1 方法详解

### 整体框架与双智能体设计

Memory-R1的核心是一个双智能体框架：

1. **Memory Manager（记忆管理器）** ：负责对外部记忆库执行结构化操作——{ADD, UPDATE, DELETE, NOOP}。它的任务是维护一个准确、简洁、一致的内存状态。
2. **Answer Agent（回答智能体）** ：负责在回答问题时，先从检索到的记忆中 **蒸馏（过滤）** 出最相关的部分，再基于这些记忆生成答案。

这两个智能体都通过RL进行微调，学习如何根据下游任务（如问答正确性）优化自己的行为。

![Memory-R1的整体流程](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Memory-R1的整体流程

蓝色部分（Stage 1）是记忆管理阶段：每轮对话中，模型提取关键信息，检索相关记忆，然后由Memory Manager决定如何更新记忆库。绿色部分（Stage 2）是问答阶段：用户提问时，系统检索最多60条相关记忆，Answer Agent从中筛选出关键记忆并生成答案。

### Memory Manager 的RL训练

**任务定义** ：  
Memory Manager 是一个策略 ，输入是当前提取的信息 和现有记忆库 ，输出是一个操作 以及更新后的记忆内容 ：

**训练方法（PPO）** ：  
使用近端策略优化（PPO）训练Memory Manager。其目标是最大化以下裁剪替代目标：

其中：

- 是新旧策略的重要性比例
- 是优势函数，衡量当前动作带来的收益（基于Answer Agent答案准确性的提升）
- 操作防止策略更新过大，保证训练稳定性

**训练方法（GRPO）** ：  
GRPO（Group Relative Policy Optimization）是另一种RL算法，它不再需要价值函数，而是通过一组候选动作的相对优势来更新策略。其目标函数为：

其中：

- 是每组采样的动作数
- 是标准化后的优势值
- KL散度项约束策略不要偏离初始策略太远

**奖励设计** ：  
奖励完全基于下游问答的准确性：

即只有Answer Agent答对了，Memory Manager才能获得奖励。这种“结果驱动”的设计避免了对每一步记忆操作进行人工标注，极大地简化了监督需求。

### Answer Agent 的RL训练

**任务定义** ：  
Answer Agent 也是一个策略 ，输入是问题 和检索到的记忆 ，输出是答案 ：

**记忆蒸馏（Memory Distillation）** ：  
Answer Agent 不是直接使用所有检索到的记忆，而是先进行过滤，只保留最相关的部分。这有助于减少噪声干扰，提升推理质量。

**训练方法与奖励设计** ：  
与Memory Manager类似，也使用PPO或GRPO进行训练，奖励同样基于最终答案的精确匹配（EM）分数：

## 实验设置与结果分析

### 数据集与评估指标

**数据集** ：LOCOMO

- 包含10个多轮对话，每个对话约600轮，总长约26,000 token
- 每个对话有约200个问题，涵盖单跳、多跳、开放域和时间推理等多种类型
- 训练仅使用第一个对话（152个问答对），验证用第二个（81个），测试用剩余八个（1307个）

**评估指标** ：

- **F1** ：预测答案与真实答案的词重叠度
- **BLEU-1** ：一元语法匹配度
- **LLM-as-a-Judge (J)** ：使用另一个LLM评估答案的事实准确性、相关性、完整性和上下文恰当性

### 基线模型

作者对比了5个现有基线：

1. LOCOMO：基准模型
2. Zep：基于检索的智能体，支持时序知识图谱
3. A-Mem：动态记忆系统，结合了RL
4. LangMem：开源记忆框架，支持跨会话记忆链
5. Mem0：模块化记忆系统，显式支持内存操作

### 主实验结果

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如表所示，Memory-R1在LLaMA-3.1-8B和Qwen-2.5-7B两个模型基础上均取得了最佳性能。以LLaMA-3.1-8B为例：

- Memory-R1-GRPO在整体F1、B1和J上相比最强基线Mem0分别提升了 **48.3% **、** 68.9%** 和 **37.1%**
- 所有问题类型上均一致提升，表明框架具有良好的泛化能力

### 消融实验

**Memory Manager的效果** ：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

RL微调后的Memory Manager显著优于原始模型（Context Manager），说明学习到的记忆操作策略更有效。

**Answer Agent的效果** ：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

RL微调大幅提升了Answer Agent的性能（GRPO > PPO > Base），证明蒸馏机制和RL训练共同提升了答案质量。

**记忆蒸馏的效果** ：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

使用记忆蒸馏后，所有指标均显著提升（F1从34.37→37.51，J从60.14→62.74），说明过滤噪声对推理至关重要。

**Memory Manager与Answer Agent的协同效应** ：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

当使用更强的Memory Manager（如GPT-4o-mini）时，RL微调后的Answer Agent获益更大，说明记忆质量直接影响答案生成效果。

### RL训练策略对比

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

GRPO在训练初期收敛更快，但PPO和GRPO最终达到相似性能。GRPO的组内归一化机制在早期提供了更稳定的梯度信号。

## 案例研究与应用展示

### Memory Manager 行为对比

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

论文中给出了两个生动案例。例如：

- 用户先说自己领养了狗Buddy，又说领养了Scout
- 原始系统误以为矛盾，执行DELETE+ADD，导致记忆碎片化
- Memory-R1则正确执行UPDATE，合并为“领养了两只狗：Buddy和Scout”

另一个案例涉及用户过敏史与情感表达：

- 原始系统误删了用户喜欢海龟的情感记忆
- Memory-R1正确保留并整合了情感与事实信息

这些案例显示，RL训练让模型能更 nuanced 地处理信息重叠与演化。

### Answer Agent 行为对比

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

例如问题：“John住在海滩还是山区附近？”

- 原始模型输出“山区”，受噪声记忆干扰
- Memory-R1通过记忆蒸馏筛选出海滩相关记忆，输出正确答案“海滩”

## 结论

最后，简单对这篇论文做一个总结：

1. **首个RL驱动的记忆增强LLM框架** ：提出双智能体架构，分别处理记忆管理与记忆使用。
2. **数据高效的学习方法** ：仅用152个样例训练，即可显著提升性能。
3. **全面的实验验证** ：在多个模型、多个指标、多个问题上均实现SOTA，并进行详细消融分析。
4. **为未来研究提供方向** ：证明RL是实现自适应记忆管理的有效路径，开辟了持久性、组合性记忆架构的新研究方向。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

深度学习自然语言处理

向上滑动看下一个