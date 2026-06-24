---
title: "比Claude Code提升150%，人大&微软自主科研框架Arbor起飞"
source: "https://mp.weixin.qq.com/s/YuO2M11r9zd6LNIj6UfbqA"
author:
published:
created: 2026-06-24
description:
tags:
  - "Arbor"
  - "自主科研"
  - "假设树"
  - "人大"
  - "微软"
  - "Autonomous Optimization"
  - "研究框架"
  - "HTR"
  - "实验组织"
  - "性能提升"
abstract: "人大和微软推出的Arbor框架通过维护假设树和洞察积累，让AI智能体能像研究者一样高效组织实验，在多个任务上取得超过基线的显著提升。"
---
PaperAgent *2026年6月24日 00:02*

大家好，我是PaperAgent，不是Agent！

**Codex、Claude Code** 的用户可能会有这样的体会：它确实能读代码、调用工具、修改文件、运行实验，在一个复杂目标上连续推进很久。但如果让它去做研究，虽然会一轮一轮地尝试，却很难将其沉淀成真正的进展：试一个方向没成，换下一个；偶尔分数上去了，也说不清是为什么，下一轮又几乎从头开始。

**会执行任务，并不等于会做研究** 。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/5gibgibpTuuwBvMPd07Z22nQIBy1c4VR6WTmPtr8UWZ1NGwmDPtwocub5Gm9MQcGL8biaNjNw78spVBMbzyvyibDvA22iaWpX9WHk1tJsej4y8SI/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

**中国人民大学** 高瓴人工智能学院与 **微软** 研究院的新工作 **Arbor** ，正是围绕这个问题展开的：当 Agent 已经能写代码、跑实验，怎样才能让它像研究者一样，把多轮探索真正积累成研究进展？ [没想到，DeepSeek建模潜力被ORGEval挖出来了](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247508495&idx=1&sn=309c84ca5c2822416fddc1a9dd4f6048&scene=21#wechat_redirect)

此前 Arbor 登上 Hugging Face Daily Paper 日榜第一，并在国内外社区获得了较多关注。

![Hugging Face Daily Paper 日榜第一](https://mmbiz.qpic.cn/mmbiz_jpg/5gibgibpTuuwAc6CtoXtgiaSsNSFfWE4kc9Ns4rszP1HXXlHpOsQ97CuxDgzosuLFt6pGVd2nQSbWcuib5h37J8gw4umdkJOicq7zNicBiaAMpIOsY/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

Hugging Face Daily Paper 日榜第一

## 定义自主科研：Autonomous Optimization

![Autonomous Optimization 公式](https://mmbiz.qpic.cn/mmbiz_png/5gibgibpTuuwAegWuGE1Njs0trxryLuhDGyd1sm1QxxWNrtGZGWn0I7pQUeJwzA8UjDGx7ORGW2yWw7dVFZO0zG3xpl8CQic6iazI8Vs7E4Ygrw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

Autonomous Optimization 公式

**Arbor** 把一次次短暂的实验，组织成可以长期积累、可以被审计、也能指导后续探索的研究状态，这类问题被形式化为一个统一的设定— **—Autonomous Optimization（AO）** 。系统给定一个初始 artifact（可以是模型训练代码、agent harness，或任意一个 baseline）、一个研究目标，以及一个可执行的 evaluator；Agent 只能看到 dev 集，在没有逐步人工监督的情况下，通过多轮实验改进这个 artifact，最终在 test 集上验证真实提升。

这个定义不绑定具体任务：训练模型、改进代码、调整流程，都能归入 AO。Agent 需要长期工作，需要处理延迟反馈，需要面对失败，也需要决定下一步继续哪个方向、放弃哪个、合并哪个结果。

## 核心机制：让 Agent 维护一棵假设树

可以用一句话概括 Arbor 与“一条路走到底”的区别：它不靠让 Agent 尝试更多方向取胜，而是让每一次尝试都加深它对问题的理解。

![图 1：Arbor 概览。(a) 一次数学推理数据合成运行得到的假设树与 (b) 对应的开发集分数曲线；(c) 全部任务上归一化后的 held-out 增益。](https://mmbiz.qpic.cn/mmbiz_png/5gibgibpTuuwAukfRurkkXniaoXcf6mjvJRibbOV8rMnFTvV3PJA3aia4OZQ4KrQzIr5mm02ZVNP8C8wGRRib07fPACvGB5VohicKyEiaHEPdia9DBpI/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

图 1：Arbor 概览。(a) 一次数学推理数据合成运行得到的假设树与 (b) 对应的开发集分数曲线；(c) 全部任务上归一化后的 held-out 增益。

实现这一点的机制叫 Hypothesis-Tree Refinement（HTR）。Arbor 把整个研究过程外化为一棵持续演化的假设树，树上的每个节点都是一个可被验证或证伪的研究主张：如果以某种方式修改 artifact，目标指标是否会改善？

对于每个节点：

- **Hypothesis** ：当前节点想验证的研究主张；
- **Artifact version** ：对应的代码、配置或数据 pipeline 改动；
- **Experimental evidence** ：开发集分数、运行日志、错误信息、执行状态，以及必要的 held-out 结果；
- **Distilled insight** ：这次实验沉淀下来的可复用经验——为什么成功、为什么失败、在什么条件下有效、哪些方向可能只是局部过拟合、后续应当继承还是避开。
![Arbor详细实现](https://mmbiz.qpic.cn/mmbiz_png/5gibgibpTuuwDuhmhCicghwibXE5hdgLDm2eRul13CzvSPy0y9icPslicVhYUl4d1lnPxKFEFfqo6AZpZHmJPgvl5eGsxw5UAiaN4HZIDc4j0m7EaU/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

Arbor详细实现

HTR 最关键的设计是 insight 回传。每验证完一个假设，Arbor 会提取这次实验的 distilled insight，沿父节点回写到整棵树，借此更新对全局的认识。因此后续的改进不是在空白上下文里重新试错，而是基于整棵树已有的假设、证据和经验，动态决定：扩展哪个叶子、合并哪个改动、剪枝哪个方向，或生成哪些新的后续假设，让每一步都尽量是当前理解下的较优选择。这样一来，这棵假设树同时承担起 **搜索空间、长期记忆、研究记录** 的角色

![HTR算法](https://mmbiz.qpic.cn/sz_mmbiz_png/5gibgibpTuuwDVJ8MhpRr6xuiacK7TDgqNR4dHjRSibhe2KUDSibGPFJAmY7kRg78aSJCTH5PF8HusynVQTHH8A4qUoAzEEiayUA82IYVLxdEV0Mo/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

HTR算法

## 两级架构与科研飞轮：分清定方向与做实验

为了维护这棵树，Arbor 采用了一个清晰的两级架构：

- **Coordinator** ：长期存在，维护全局假设树，提出新的假设、选择值得执行的方向，并根据结果决定继续、剪枝或合并；
- **Executor** ：短期存在，每个只负责一个假设，在隔离的 worktree 中修改代码、运行 evaluator、检查失败原因，再把分数、artifact 引用、实验现象和 insight 结构化地返回。

一种是全局策略，知道整个研究走到了哪里；另一种是局部执行，能把一个具体想法落地成可运行的代码。如果把两者混在同一个长上下文里，底层执行细节很容易淹没全局判断。拆开之后，全局状态保持清晰，每个实验的证据也能准确回到对应的假设节点上，并借助 git 把改动真正落地。

![图 2：Arbor 整体框架](https://mmbiz.qpic.cn/mmbiz_png/5gibgibpTuuwA34qb3jZhBibpIsmMPDn2XKrt3uUXN9hf7DukDQmF2e5lk1xZ8NVXRWR6eeWH8aNw5NRIw50YHKro7b0Un9Qck7bkIdhjHTaZE/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

图 2：Arbor 整体框架

整个系统因此构成一个持续循环：

> 观察研究状态 → 提出候选假设 → 选择探索方向 → 分派实验执行 → 回传结构化证据 → 抽象 insight → 决定合并、剪枝或继续

这里还有一个防止过拟合的关键设计——held-out merge gate：一个候选只有在 held-out evaluator 上超过当前最优，才会被真正合并为新的 best artifact。开发反馈用于探索，held-out 反馈用于确认真实进展。

值得注意的是， **Arbor 不只是一套框架，它把独立 CLI 和 Agent Skill 都做了开源** ：你既可以直接使用完整 CLI 进行长时间自动化实验，也可以在 Codex / Claude Code 等环境中加载 skill，得到接近的效果。

## 实验：覆盖真实场景的六大 AO 任务

- **Model Training** ：包括 optimizer design 与 architecture design，要求在固定预算下改进训练算法、超参数或模型结构；
- **Harness Engineering** ：包括 Terminal-Bench 2.0 与 BrowseComp，要求改进另一个 Agent 的控制逻辑、工具使用方式或测试时推理流程；
- **Data Synthesis** ：包括 Search-Agent 与 Math-Reasoning 两类数据合成，要求改进数据生成 pipeline，让生成数据更好地刻画目标能力。

Arbor可以在dev集上反复实验，但最终结果必须在独立测试上验证。对比对象则是Codex 和 Claude Code。

![表 1：六类 AO 任务上的评测结果](https://mmbiz.qpic.cn/mmbiz_png/5gibgibpTuuwDGVxsMO1xlkiaGRnt6RrGX8gWH1v2Ccz0KDWXpdSS8yz5LOoZufArwbOWBWX8QLSSqbhj4n2oaEb0wjzOQFHV023oMAiaBVY3XY/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

表 1：六类 AO 任务上的评测结果

结果上，Arbor 在六个任务上都取得了最佳 held-out，相对 held-out 增益超过 Codex 和 Claude Code 的 2.5 倍：

- **BrowseComp** ：初始 ReAct-style search harness 的 held-out 准确率为 45.33，Codex 提升到 50.00，Claude Code 提升到 53.33，Arbor 提升到 67.67；
- **Math-Reasoning 数据合成** ：Arbor 将 held-out pass-gap 提升了 19.79 个点，Codex 与 Claude Code 分别为 5.21 和 7.29；
- **Terminal-Bench 2.0** ：Arbor 取得最高 held-out 通过率，从 69.81 提升到 77.36。
![表 2：MLE-Bench Lite 上的评测结果](https://mmbiz.qpic.cn/sz_mmbiz_png/5gibgibpTuuwBP1ibluGuPpLceuDd6o8QHHjkRkWZrpJVicZQxnibNa7ASlqpq2GpTTicTSSw5juB8eVeIGSYRZm6oCIy25uwrWfthBtcQ1SvhE90/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

表 2：MLE-Bench Lite 上的评测结果

除六个任务外，Arbor 还在 MLE-Bench Lite 上做了评测：Arbor 搭配 GPT-5.5 达到 86.36% Any Medal，取得当前 SOTA。这进一步说明，方法不仅适用于作者构建的任务套件，也能迁移到已有的长程机器学习工程 benchmark。

## 分析：关键在组织得更好，而非试得更多

进一步的分析表明，Arbor 的提升并不只是来自“跑了更多实验”，真正起作用的是假设树对研究状态的组织方式。

![Token 预算与 held-out 增益](https://mmbiz.qpic.cn/mmbiz_png/5gibgibpTuuwA8CxY0LQS1GSktsotkxfALUmy1KR90CrLoh4bdkibZY2sUrwf6ibMdlNPRqb8rG07mS70mtdvuPX5JgEbH0PY7wibTIIC3cykgT0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

Token 预算与 held-out 增益

**探索更高效** ：成本日志显示，Arbor 消耗的 token 与 Claude Code 等基线属于同一量级，却获得了更大的 held-out 增益。关键算力被用来维护相互竞争的假设、运行隔离实验、对比证据、更新搜索树，而不是在一条轨迹上一直试下去。

![HTR 组件消融结果](https://mmbiz.qpic.cn/mmbiz_png/5gibgibpTuuwAVmorxJ2UibLWYmibVB5AjU6YOv3giaO1glzo7b8q1EoOOnvEDHuZlUnoibJrCXQrndpsxg9TxA4WiaeCceHt1GI1W0WyYAG9EjbQ8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

HTR 组件消融结果

**研究组织更有效** ：论文在 MLE-Bench Lite 上消融了 HTR 最核心的两个组件。去掉假设树后，Any Medal 从 81.82% 降到 63.64%；在保留树的前提下再去掉 insight 的向上传播，则进一步降到 54.54%。

一个略反直觉的结论是： **只去掉洞察传播，比直接去掉整棵树掉得更多。** 这说明仅有层次结构还不够——一棵不传播经验的树，只是把实验排列在一起，给不出后续决策真正需要的语义记忆。

```
论文标题：Toward Generalist Autonomous Research via Hypothesis-Tree Refinement
论文链接：https://arxiv.org/pdf/2606.11926
代码仓库：https://github.com/RUC-NLPIR/Arbor
项目主页：https://ruc-nlpir.github.io/Arbor/
```

[动手设计AI Agents：（编排、记忆、插件、workflow、协作）](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247492838&idx=2&sn=1e25832e7300ef312721325d0def30b4&scene=21#wechat_redirect)

[分享两篇Claude Skills最新论文，有3个核心结论](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247508495&idx=1&sn=309c84ca5c2822416fddc1a9dd4f6048&scene=21#wechat_redirect)

[DeepSeek押注的Harness，被这篇最新综述彻底讲透了](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247507583&idx=1&sn=5f0b8991a8d26077aaff76953bab08eb&scene=21#wechat_redirect)

[2026，做Agentic AI，绕不开这两篇开年综述](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247508495&idx=1&sn=309c84ca5c2822416fddc1a9dd4f6048&scene=21#wechat_redirect)

已经读到这了，不妨点个👍、❤️、↗️三连，加个星标⭐，不迷路哦~

LLM热点Paper · 目录