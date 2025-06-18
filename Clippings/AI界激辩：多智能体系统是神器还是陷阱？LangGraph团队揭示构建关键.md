---
title: "AI界激辩：多智能体系统是神器还是陷阱？LangGraph团队揭示构建关键"
source: "https://mp.weixin.qq.com/s/KfzL_4Zp1N35jvaMLE49PA"
author:
  - "[[AI小智]]"
published:
created: 2025-06-18
description: "多智能体系统是神器还是陷阱？"
tags:
  - "clippings"
---
Original AI小智 *2025年06月18日 08:56*

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/Ea6oETrjsv9SumbmO9Z71rhfxKKIoLe6fnuWcswkkz3xeTwiaYPHAMLiaDMlvyMD8rNvwucicxluwa91CzLFTRlNg/640?wx_fmt=jpeg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

> ❝
> 
> **导语** ：当 Cognition 高呼 “Don’t Build Multi-Agents”，Anthropic 却用成功案例回应。两篇爆文看似对立，却指向了构建多智能体系统的同一真相—— **胜负的分水岭，从来不是 Agent 数量，而是“上下文工程”与“读写结构”** 。如果你正考虑构建 Agent 系统，这可能是你最该读的一篇文章。

## 01 技术交锋：分歧中的隐藏共识

上周，AI 圈出现两篇爆文引发热议：

- 🛑 Don’t Build Multi-Agents（来自 Cognition，强调“别做”）
- ✅ How we built our multi-agent research system（来自 Anthropic，详述实战经验）

尽管立场看似对立， **两者却不约而同指出：要让多智能体系统稳定运行，有两个关键前提** ：

1. **Context Engineering（上下文工程）是基础设施级能力**
2. **多智能体更适合“读”任务而非“写”任务**

## 02 生死线：Context Engineering

> ❝
> 
> “再聪明的模型，若不知上下文，也无法做出正确判断。” —— Cognition 团队提出的核心观点

#### ▍什么是上下文工程（Context Engineering）？

不同于传统的 Prompt Engineering， **Context Engineering 更关注系统级的动态上下文构建** 。它强调：在复杂交互和多智能体协作中， **如何为每个 Agent 构建精准、独立、可持续的任务背景，是系统能否稳定运行的关键。**

#### ▍实战中表现如何？

Anthropic 的实践佐证了这一点：

> ❝
> - **长对话管理** ：对话可能长达数百轮， **需要引入外部记忆与压缩机制** ，如在每阶段总结信息存储进记忆库、跨阶段切换时唤回关键信息。
> - **任务描述精准化** ：子智能体需要被明确告知 **目标、输出格式、所用工具、边界约束** ，否则容易重复劳动或遗漏重要内容。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### ▍底层能力支持

- ✅ 完整控制 LLM 接收的上下文输入
- ✅ 无隐藏提示、无强加的“认知架构”
- ✅ 明确每一步执行顺序，实现灵活编排

> ❝
> 
> 在我们看来， **Agent 框架的核心不是功能丰富，而是给开发者“上下文的完全控制权”。**

## 03 为什么“写”比“读”更难？

> ❝
> 
> “行为背后是决策，冲突的决策会带来灾难。” —— Cognition 团队总结多 Agent 写作风险

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### ▍读 vs 写，本质区别在哪？

- **读（Research）型任务** ：如搜索信息、理解材料等，天然适合并行执行，多个 Agent 各自探索、协同处理即可。
- **写（Synthesis）型任务** ：如代码生成、内容撰写，需保持结构统一、语言风格一致，难以拆分并行，否则会产生冲突或碎片化。

#### ▍Anthropic 的拆解方案

在其 Claude Research 系统中：

- **读取任务** ：由多智能体并行完成，每个 Agent 负责不同方向
- **写作任务** ：由主智能体统一汇总并输出，避免冲突与割裂

> ❝
> 
> 实验中发现，模糊的指令导致多个 Agent 重复搜索 2025 年半导体供应链， **有效的任务拆解机制是防止资源浪费的关键** 。

## 04 工程落地的三道坎：持久性、可观测、可评估

![何时构建多智能体系统？](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

何时构建多智能体系统？

即使设计合理，Agent 系统要能稳定运行，还必须跨过三道“生产环境生死劫”：

| 挑战维度 | 关键问题 | 推荐方案 |
| --- | --- | --- |
| **持久化执行** | Agent 是有状态的，一旦中断，代价高昂 | **LangGraph**  提供错误续跑机制 |
| **调试与可观测性** | 多 Agent 决策不确定，难以复现 bug | 使用 **LangSmith** 进行全链路追踪 |
| **Agent 评估机制** | 不能只靠主观观察 | **LLM-as-a-Judge + 人工评估**  组合，并支持 小样本评测 起步 |

> ❝
> 
> LangSmith 已支持数据集管理、自动评分、人工标注队列等功能， **构建系统级 Agent 评估链条已成可能。**

## 05 哪些任务适合多智能体？Anthropic 的实战公式

根据 Anthropic 实验总结， **多智能体系统适合以下三类任务：**

- ✅ **高价值任务** ：计算成本可控，但任务本身价值高（如战略研究）
- ✅ **广度优先探索** ：适合多个 Agent 并行发散，如舆情分析、多角度政策解读
- ✅ **超长上下文任务** ：任务 token 超过单模型窗口上限时，可用 Agent 分工处理各部分

而在以下场景中，多智能体反而不如单体结构高效：

- ❌ 强依赖上下文同步、实时响应（如代码协作、系统集成）
- ❌ 子任务之间依赖复杂、无法并行（如多步骤推理题）

> ❝
> 
> **没有通用最佳结构，只有最合适的架构决策。**

## 结语：别被“智能体数量”迷惑，关键是上下文控制力

总结来看：

- Cognition 的告诫并非“多智能体无用”，而是警示其复杂性；
- Anthropic 的成功并非“多智能体万能”，而是源于良好的任务拆解与上下文管理；
- 构建多智能体系统不仅是技术挑战，更是“系统工程挑战”。

---

**📣 参与讨论：你是否遇到过 Agent 协作失控的瞬间？留言聊聊你的避坑经验吧！**

今天的内容就到这里，如果老铁觉得还行，可以来一波三连，感谢！

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

素材来源官方媒体/网络新闻

[Read more](https://mp.weixin.qq.com/s/)

继续滑动看下一个

AI小智

向上滑动看下一个