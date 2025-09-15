---
title: "DeepDiver-V2来了，华为最新开源原生多智能体系统，“团战”深度研究效果惊人"
source: "https://juejin.cn/post/7548717557531689000"
author:
  - "[[量子位]]"
published: 2025-09-12
created: 2025-09-15
description: "让智能体组团搞深度研究，效果爆表！ 华为最新发布 DeepDiver-V2 原生多智能体系统。一个Planner负责任务分解，任务分发，进度审视和成果验收，多个专业 Executor 并行处理..."
tags:
  - "多智能体系统"
  - "任务分解"
  - "文件通信"
  - "性能提升"
abstract: "华为开源DeepDiver-V2多智能体系统，采用Planner-Executor架构，通过任务分解和文件系统通信实现高效协作，在复杂问答和长文生成任务中表现优异。"
---
![横幅](https://p9-piu.byteimg.com/tos-cn-i-8jisjyls3a/8c759ddb57d0440986f4768fc644f879~tplv-8jisjyls3a-2:0:0:q75.image) ![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/b37ce6cd3dfa46f699d8fc9c7c888f2f~tplv-8jisjyls3a-3:0:0:q75.png)

让智能体组团搞深度研究，效果爆表！

华为最新发布 **DeepDiver-V2 原生多智能体系统** 。

采用了 **“团队作战”** 模式：一个 Planner 负责任务分解，任务分发，进度审视和成果验收，多个专业 Executor 并行处理子任务，通过共享文件系统高效交换信息。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9defaefaecc0422f8de7f9ab9c298cd6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6YeP5a2Q5L2N:q75.awebp?rk3s=f64ab15b&x-expires=1758263181&x-signature=7fB4aXnc89DxYOjB4TwovZxITh8%3D)

与仅通过推理框架实现的多智能体系统不同，DeepDiver-V2 以多智能体形态进行训练，模型天然具备更强的角色扮演和协同推理能力。这套系统不仅在复杂知识问答任务上取得突破，更是能够生成数万字的高质量深度研究报告，在多个榜单中表现亮眼。

它基于华为 openPangu Agent 推出的 DeepDiver-V2，这是一个专攻 AI 深度搜索和长文调研报告生成的模型。目前已开源。

- 开源模型地址： [ai.gitcode.com/ascend-trib…](https://link.juejin.cn/?target=https%3A%2F%2Fai.gitcode.com%2Fascend-tribe%2FopenPangu-Embedded-7B-DeepDiver "https://ai.gitcode.com/ascend-tribe/openPangu-Embedded-7B-DeepDiver")
- 技术报告地址： [ai.gitcode.com/ascend-trib…](https://link.juejin.cn/?target=https%3A%2F%2Fai.gitcode.com%2Fascend-tribe%2FopenPangu-Embedded-7B-DeepDiver%2Fblob%2Fmain%2Fdocs%2Fopenpangu-deepdiver-v2-tech-report.pdf "https://ai.gitcode.com/ascend-tribe/openPangu-Embedded-7B-DeepDiver/blob/main/docs/openpangu-deepdiver-v2-tech-report.pdf")

## 性能爆表：优于同规格竞品

数字最有说服力。DeepDiver-V2-7B 和 DeepDiver-V2-38B 和在多个权威基准测试中表现亮眼：

- BrowseComp-zh：DeepDiver-V2-38B 达到 34.6 分，超越 WebSailor-72B（30.1 分）和 WebSailor-32B（25.5 分）；DeepDiver-V2-7B 同样超过了 WebSailor 和 MiroThinker 同规格模型。
- BrowseComp-en：DeepDiver-V2-38B 达到 13.4 分，同规模开源模型中最高, 也超过了 WebSailor-72B。

在长文报告生成方面，DeepDiver-V2 提出了一个全新的面向深度调研报告生成的基准测试 WebPuzzle-Writing，该基准给每个调研 query 设置了详细的调研范围而非开放生成，可以更加方便多个模型之间的横评。

在该测试中，DeepDiver-V2 生成的报告平均长度达 24.6K tokens，是 OpenAI o3 DeepResearch（10.6K）的两倍多。自动评测结果也显示 DeepDiverV2 效果与主流 agent 产品相当, 在信息度上格外亮眼，Content Diversity 指标优于其他模型。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b186441c6f04436280324da80087807d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6YeP5a2Q5L2N:q75.awebp?rk3s=f64ab15b&x-expires=1758263181&x-signature=G5zcnAtWDlSpyNnzhZ%2BnyLavBzg%3D)

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/20155af5bde74cf6aa67a8dfde733b84~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6YeP5a2Q5L2N:q75.awebp?rk3s=f64ab15b&x-expires=1758263181&x-signature=IXx9PJK05IcV7hpfHCApoyQRsgk%3D)

## 架构创新：从单兵作战到团队协作

团队之前的研究成果 DeepDiver-V1 就像一个全能选手，需要在一个超长的上下文窗口中处理所有任务，结果往往因为负担过重而表现不佳。DeepDiver-V2 改变了这一模式。它采用以 Planner（规划器）为中心, 协调多个 Executor（执行器）的 MAS（Multi-Agent System，多智能体系统）架构。

### 智能任务分解

Planner 接到复杂查询后，会进行自适应复杂度评估。简单问题直接处理，复杂问题则构建一个” 任务树”，将大任务层层分解为可并行 / 串行 / 嵌套执行的子任务。

Planner 甚至会采用” 竞争赛马” 机制——让多个 Executor 同时处理相似任务，通过交叉验证提高结果可靠性。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/fd0b89c282e84d88ac95d76c8fd7d40a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6YeP5a2Q5L2N:q75.awebp?rk3s=f64ab15b&x-expires=1758263181&x-signature=OAQ7hNH9h82cLYIMM6QyJST1Oc4%3D)

### 文件系统通信

不同于 DeepDiver-V1 使用单个上下文窗口处理多个任务，智能体之间各自执行任务, 并通过共享文件系统交换信息：

交换的信息 = {当前任务摘要, 任务执行过程产生的中间物料的元数据}

每个智能体只需传递精炼的任务摘要和文件元数据，而非完整上下文。详细内容存储在共享文件中，其他智能体按需读取。这种设计带来三大优势：

1、可扩展通信：消息大小保持可控，不受任务复杂度影响。  
2、持久化状态：历史信息得以完整保存，LLM Agents 无需维护完整对话历史。  
3、并行执行：独立子任务可同时处理，避免上下文冲突。

### 专业化分工

系统包含两类核心 Executor：

1、Information Seeker（信息搜集助手）：负责证据收集, 验证, 去噪等。Information Seeker 可以网罗相关信息, 筛选特定信息源, 深度分析并提取关键事实和数据, 迭代式的完善收集到的信息以解决 Planner 分发的任务。

2、Writer（写作助手）：负责长文本生成, writer 可以构建章节大纲, 并分配资料到各个章节. Writer 使用逐章节写作的方式, 并能够迭代式的完善行文, 能够保持全局的连贯性。

## MAS（多智能体系统）训练

训练多智能体系统面临独特挑战：当最终任务失败时，如何判断是哪个智能体的责任？当最终任务成功时, 如何判断是哪个智能体做出了贡献? DeepDiver-V2 提出了 Planner-centric（以规划器为中心的）的分配机制。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/fc357f3d8ecd45e39bc8ec762d6bdf6c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6YeP5a2Q5L2N:q75.awebp?rk3s=f64ab15b&x-expires=1758263181&x-signature=Be8XXJIlf2spgPEx2IyiWpI2UgU%3D)

训练流程采用多阶段优化：

1、冷启动监督微调  
首先让模型学会基本的多角色协作、工具调用和文件系统操作，奠定多智能体能力基础。

2、拒绝采样微调（RFT）

- Trajectory-wise（按轨迹粒度的）过滤：从 planner 的视角出发, 保留得出正确答案的执行路径。
- Step-wise（按步骤粒度的）评分：使用 LLM 评判每个 planner 中间步骤的质量（1-10 分）。
- Credit Broadcasting（信用传播）：planner 的评分通过任务分配和协调关系传播到 executor 轨迹上，这种从粗到细的过滤确保只有高质量的推理步骤用于训练。

3、在线 RFT

在离线 RFT 的基础上, DeepDiver 使用相同的 credit assignment 策略, 进一步进行在线 RFT 训练, 结合 partial rollout（部分轨迹采样） 和 dynamic rollout-buffered batching（动态轨迹缓存批处理）策略, DeepDiver-V2 的在线训练得以高效且稳定的进行。

训练数据上, DeepDiver-V2 继续沿用了 DeepDiver-V1 的训练数据 WebPuzzle, 然而在 WebPuzzle 的基础上, DeepDiver-V2 进一步增加了更多有挑战性, 验证性更强的数据, 同时加入了原本 WebPuzzle 没有的长文写作数据. 经过了这些数据的训练, DeepDiver-V2 表现出了更强大的性能。

## 技术支撑：纯血昇腾 NPU 集群加速

DeepDiver-V2 的训练完全使用 Atlas 800I A2 集群进行, 依托于 1000+ NPU 组成的大规模计算集群。每个节点包含 8 个 NPU，这些 NPU 通过华为高速缓存一致性系统（HCCS）以全互联拓扑相连，每个 NPU 配备 64GB 内存。用于跨节点通信时，集群采用基于以太网的 RDMA，通过 200 Gbps 链路为跨节点的 NPU 提供高带宽连接。团队开发了专门的强化学习框架，包括：

- Agent Factory：算法优先的代码库，简化多智能体开发。
- StaleSync：staleness-aware 的梯度的同步调度机制，提升 30% 设备利用率。
- 分布式训练：支持在线和离线的 SFT、RFT 和 RL 训练。

## 实验分析

研究团队进行了系统性的消融实验和深度分析，揭示了多智能体协作背后的几个关键机制和意外发现。

Executor 能力是性能瓶颈，Planner” 够用就好”  
团队通过” 角色互换” 实验发现了一个有趣现象：系统性能对 Executor 能力极其敏感，但对 Planner 要求相对宽松。

具体数据显示：

- 将 7B Executor 升级为 38B，BrowseComp-zh 分数猛增 9 分（18.3→27.3）。
- 将 7B Planner 升级为 38B，仅提升 6.3 分（18.3→24.6）。
- 在长文本写作任务中，升级 Writer 涉及的模块带来的提升（5.51→5.80）远超升级 Planner（5.51→5.56）

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/fa46bcc4400e4110ba40b61eedc04622~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6YeP5a2Q5L2N:q75.awebp?rk3s=f64ab15b&x-expires=1758263181&x-signature=QNH1c6Xn8cgiiGkcw5TcYFmGfsg%3D)

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f733507c28454dea9f63134226ff0b00~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6YeP5a2Q5L2N:q75.awebp?rk3s=f64ab15b&x-expires=1758263181&x-signature=qAeZSXdodyMOO6j4xjoRsViVqUI%3D)

这个发现颠覆了以往的认知——\*\*一般大家会以为” 大脑”（Planner）最重要，但实际上” 手脚”（Executor）的能力才是关键。\*\*研究团队分析，这是因为 Planner 的任务相对标准化（分解问题、分配任务），而 Executor 需要处理各种复杂的实际场景。一个中等能力的 7B Planner 已经能胜任大部分协调工作。

单体能力的意外涌现：团队训练造就全能选手

最令人惊讶的发现是：为团队协作训练的, 服务于 Planner 的子智能体，单独使用时竟然也是高手。

当研究团队将 Information Seeker 从系统中剥离出来单独测试时：

- 38B Information Seeker 在 BrowseComp-zh 上得分 26.3，Single Agent（ReACT）模式同样超越了 WebSailor-32B（25.5 分）。
- 7B Information Seeker 得分 15.9，超过完整的 WebSailor-7B 系统（14.2 分）。
- 在相对简单的 Xbench-DeepSearch 上，38B Information Seeker 单枪匹马就达到 52.0 分，几乎等同于完整系统（53.0 分）。

这种现象说明，多智能体训练不仅提升了协作能力，还让每个子智能体在处理扩展任务集时变得更加鲁棒。就像优秀的团队成员，既能配合默契，又能独当一面。

## 展望：AI 搜索的新范式

DeepDiver-V2 相对 DeepDiver-V1, 从单一模型的” 独角戏” 到多智能体的” 交响乐”，这种转变为解决更复杂的现实问题开辟了道路。未来, DeepDiver 将在企业调研、科学文献综述、专业数据分析等专业领域发挥巨大作用。

【参考文献】  
\[1\] Shi, Wenxuan, et al. “Pangu deepdiver: Adaptive search intensity scaling via open-web reinforcement learning.” arXiv preprint arXiv:2505.24332 (2025).  
\[2\] Li, Kuan, et al. “WebSailor: Navigating Super-human Reasoning for Web Agent.” arXiv preprint arXiv:2507.02592 (2025).  
\[3\] Li, Xiaoxi, et al. “Webthinker: Empowering large reasoning models with deep research capability.” arXiv preprint arXiv:2504.21776 (2025).

- 本文系量子位获授权刊载，观点仅为原作者所有。

**欢迎在评论区留下你的想法！**

— **完** —

评论 0

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

APP内打开

![yoyo](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/img/yoyo.3df25da.png)

## 登录掘金领取礼包

更多登录后权益等你解锁