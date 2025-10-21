---
title: "Flash-Searcher：Web Agent的并行革命"
source: "https://mp.weixin.qq.com/s?__biz=MzI3ODgwODA2MA==&chksm=ea70e561f58ed4de6efb57e5eb5629c4fa9d210ea67803c6fcaacb8f6e55d3d7c9ecaeb7a369&idx=1&mid=2247544568&sn=a3b5a98cd6e5c555ea1ac6220801d9c4#rd"
author:
  - "[[团队投稿]]"
published:
created: 2025-10-21
description:
tags:
  - "并行执行"
  - "DAG调度"
  - "动态优化"
  - "效率提升"
abstract: "Flash-Searcher通过DAG并行执行机制和动态调度优化，显著提升了Web智能体的执行效率和任务成功率。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/gKaxjIx6bahSza2tTkzicFw7GCygicIR0f64XyUTd7bzMLq1JRtKDiaFvShJAsumYkrJObmUzHxHkR6SgsNr4V2yA/0?wx_fmt=jpeg)

团队投稿 [深度学习自然语言处理](https://mp.weixin.qq.com/) *2025年10月21日 13:26*

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahSza2tTkzicFw7GCygicIR0fpCibjQb9sacO0SpuN8OoXMP93ZLDouHN4hvFWoEB1191uB2fFVICkJg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

- 论文：https://www.arxiv.org/abs/2509.25301
- 代码：https://github.com/OPPO-PersonalAI/Flash-Searcher

## 一、为什么我们要做 Flash-Searcher？

当下的 Web 智能体（Agent）在解决复杂研究任务时，大多沿用传统的 **顺序执行链（Sequential Chain）** ：每个子任务依次调用检索、解析、总结等工具。这种方式虽然直观，但在复杂场景中存在两个根本性问题：

- **执行效率低** ：每一步都必须等待上一步完成，冗余时间极高；
- **信息利用率低** ：各个子任务之间无法并行，工具调用缺乏依赖建模；

尤其是在多工具、多阶段任务（如 Deep Research）中，串行执行会造成指数级延迟，甚至数十步以上的交互才能完成一次查询。于是我们提出了 **Flash-Searcher：** 一个以 **DAG（有向无环图）并行执行机制** 为核心的全新 Agent 框架，通过结构化并行与动态调度，让智能体可以 **像多线程程序一样同时思考、同时执行** 。

## 二、方法概览：从顺序链到 DAG 并行

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahSza2tTkzicFw7GCygicIR0f0TqpB6ntmFq3Ujtibmn8Rs0e2eCsgeXqtYZDaM6raSnZ9pOicXgHiaiadQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

Flash-Searcher 将任务从单一的线性链拆分为多组具备依赖关系的子任务节点，用类似 DAG 结构来描述任务之间的约束。当DAG关系确定时，Flash-Searcher在单次推理中并行调度所有的分支，同步运行，同时在存在依赖的关系的节点时，通过不同的分支执行情况交叉验证，以显著提高任务成功率。

这一机制使得智能体在保持逻辑一致性的前提下，显著提升执行吞吐与速度。此外，我们引入了两项关键机制：

1. **动态执行流优化（Dynamic Workflow Optimization）** ： 系统会根据中间结果动态更新 DAG 结构，更新已完成节点、重估依赖、按需细化新子任务。 这让智能体能持续优化自己的执行计划，而非被固定链条束缚。
2. **任务进展总结与信息共享（Summarization & Knowledge Sharing）** ： 定期对任务执行情况进行总结，更新和分析当前执行进展；同时通过进展总结可通过对话截断实现上下文长度扩展，保证已有知识和任务执行情况共享，进一步提高任务解决成功率。
![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahSza2tTkzicFw7GCygicIR0fdJnTdu8NQ1ia5UW3U6qKualOsRXSO9Pe0bJzg0N0GuXk7VibZQZ9BIRA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

## 三、核心算法结构

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahSza2tTkzicFw7GCygicIR0fq5icgSTmekZoPKeKY7jyuj1zUb0yTJjm09n6iahNktmhLIZUmetMXyLQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

## 四、实验设置与评测基准

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahSza2tTkzicFw7GCygicIR0f1vXcR5A8y3QrQx3rj0rV3mMffk5XJbnRHQvLnDiae98Xo5ecFgvxYwQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4) **Pass@1** 指标计算准确率，同时记录执行步数与总时延。

## 五、核心结果：性能 × 效率双突破

Flash-Searcher 在所有主要基准上均刷新或逼近现有最优水平：

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahSza2tTkzicFw7GCygicIR0fp0OD6Nw4e2UVOAoibuibEraSx7JxzfcjjshQiar0Ru6E3L1WO6CUtTgSg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahSza2tTkzicFw7GCygicIR0fa7d6p7VdW8ObOcOdxqyU8az3NYsIhmMUPvZGsE4ehwDcdsZ30kkK0A/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahSza2tTkzicFw7GCygicIR0fCLuepROdBobJjOx0ZuNUzLW2GTuIupZudlPfy6kqd1TtiatlrRAEfsw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

此外，Flash-Searcher 平均减少 **35% 的执行步骤** （例如 11.2 → 7.4），在相同硬件条件下整体时延降低约 65% 。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahSza2tTkzicFw7GCygicIR0fPsTeyvr2Nnbr5JyceuPvWIqMeGWALBlIibrBU7A2lAN6nAWSrvc0CIg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahSza2tTkzicFw7GCygicIR0f0ibv31zka9yGDWPIq60rn558iaT3RGoEn0peWbOeibmhqjuhDz3VJ2K3g/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=9)

这意味着 Flash-Searcher 不仅“更快”，而且“更聪明地并行思考”。

## 六、从框架到模型：并行推理的蒸馏（Distillation）

在框架层验证之后，我们进一步将并行执行轨迹蒸馏到单模型中。通过轻量级监督微调（无需强化学习或复杂工具调用），即便是 Qwen-2.5-32B 这样的开源骨干模型，也能显著提升：

- xBench-DeepSearch：提升至 **68.0** （比 WebDancer 高 +29.3）
- 模型从 32B 扩展到 72B 时，性能仍稳定上升
- 说明“并行推理”是一种可学习的结构性偏置，可迁移到不同架构与规模的模型中
![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahSza2tTkzicFw7GCygicIR0fGP7JPI6A12Jcic5EOiadQp4R9EyHwrCsbDNShP5v0ZEuoLmhDt4aZCsw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=10)

## 七、与现有工作的区别

- **相比多智能体系统（MAS）** ：Flash-Searcher 在单框架中实现角色分工与并行调度， 避免多 Agent 间冗余通信导致的串行化开销。
- **相比工具集成推理（TIR）** ：我们先以 DAG 明确结构依赖，再通过蒸馏将并行策略迁移进单模型， 在通用性与可解释性之间取得更好平衡。

## 九、结论与展望

Flash-Searcher 通过 **DAG 并行执行 + 动态优化 + 信息共享** ，为 Web 智能体提供了一个更高效、更可扩展的执行范式。

- 在 BrowseComp、xBench、GAIA、HLE 等基准上全面领先；
- 平均减少 35% 步数、时延下降 65%；
- 并行推理可迁移、可蒸馏，为高效智能体提供结构归纳偏置。

我们认为，这一范式将成为下一代 Web Agent 的底层执行标准。

## 十、开源与资源

我们已将论文发布在 arXiv（https://arxiv.org/abs/2509.25301）

代码也已经开源：https://github.com/OPPO-PersonalAI/Flash-Searcher

后续也将陆续开源并行轨迹数据集

## 💬 互动区常见问题

### Q1：并行执行会不会牺牲正确性？

不会。Flash-Searcher 的依赖建模与动态重整机制保证逻辑一致性，通过获取更多的知识实现交叉验证的效果，实际准确率反而更高。

### Q2：能在已有链式 Agent 上复用吗？

可以。只需把“计划-执行-校验”映射为 DAG 节点与依赖关系，并行化推动任务进展即可。

### Q3：与 Kimi DeepResearch / OpenAI DeepResearch 的关系？

在 BrowseComp、xBench 上，Flash-Searcher 的性能已与后者相当甚至略优，但实现方式完全开放、结构可解释、易于迁移到开源生态。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baiaWmgCyFvlO6o9nbibLsgUz4bSBG2wsKYm0ZBtgib7BFlvgB1UjGl0wLicsmR7giaso7nBibOWDG8FazKA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=11)

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baiaWmgCyFvlO6o9nbibLsgUz4MerqsP1EnmMkbCHPWM2nhhvzYkwlSML6DNUH5MgJicp0KicH3m5X2SFg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=12)

继续滑动看下一个

深度学习自然语言处理

向上滑动看下一个