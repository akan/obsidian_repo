---
title: 颠覆式创新：揭秘 Claude 多智能体研究系统的工程实践与启示
source: https://juejin.cn/post/7516359476565786662
author:
  - "[[AI小智]]"
published: 2025-06-17
created: 2025-06-17
description: 导语：AI 研究的“超级大脑”是如何炼成的？ 想象一下，有一群高效协作的 AI 智能体，能像专家团队一样，分工协作、并行探索，帮你梳理海量信息、解决多维难题。这正是 Claude Research 系
tags:
  - 多智能体
  - Multi-Agent
  - Orchestrator-Worker
  - 智能体系统的评测
---
![横幅](https://p26-piu.byteimg.com/tos-cn-i-8jisjyls3a/8694dbc29caa4b59bda5f4181f3bd6ef~tplv-8jisjyls3a-2:0:0:q75.image)

[AI小智](https://juejin.cn/user/4154386163701693/posts)

20 阅读7分钟

专栏：

大模型科普

![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/796c19f610c146ffac65db71d7329490~tplv-8jisjyls3a-2:0:0:q75.image)

> 在 AI 领域，如何让智能体协作解决复杂问题，正成为推动技术进步的关键。\*\*Anthropic 团队打造的 Claude 多智能体（Multi-Agent）研究系统，正以突破性的架构和工程实践，重塑 AI 研究的边界。\*\*本文将带你深入了解这一系统的设计理念、工程挑战、实用经验，以及它如何助力用户高效完成复杂任务。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/562313842a864de68ca76b1784723eea~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgQUnlsI_mmbo=:q75.awebp?rk3s=f64ab15b&x-expires=1750727498&x-signature=hSw83NhJFSrDB8oA2%2BOEIkhs04Y%3D)

## 导语：AI 研究的“超级大脑”是如何炼成的？

想象一下，有一群高效协作的 AI 智能体，能像专家团队一样，分工协作、并行探索，帮你梳理海量信息、解决多维难题。这正是 Claude Research 系统的核心能力。它不仅能跨越 Web、Google Workspace 及多种集成工具，还能自主规划、分解任务，极大提升了复杂研究的效率和深度。

## 多智能体系统的独特价值

传统的 AI 研究流程往往线性、单线程，难以应对开放性、动态变化的问题。而多智能体系统则像“集体智慧”，每个智能体（Agent）都能独立探索不同方向，最终将关键信息汇聚，形成高质量的答案。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/8b212d3b4bcb4e7ab5cf06765bcf2ae7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgQUnlsI_mmbo=:q75.awebp?rk3s=f64ab15b&x-expires=1750727498&x-signature=gSxbWypn0dUWLaeZqG2%2Burbxwz0%3D)

- **动态适应，灵活探索** ：研究任务充满不确定性，AI 需要根据中间发现不断调整策略。多智能体架构让每个子智能体（Subagent）专注于不同子任务，彼此独立又能协同，极大提升了信息压缩与洞察能力。
- **并行处理，效率倍增** ：系统可同时调动多个智能体并行搜索，远超单智能体的线性处理速度。例如，在 S&P 500 信息技术公司董事会成员查询任务中，多智能体系统通过任务分解，准确高效地找到了答案，而单智能体则因顺序处理而效率低下。
- **可扩展性强** ：随着模型能力提升，多智能体系统成为扩展 AI 性能的关键方式。正如人类社会因协作而爆发出指数级能力，AI 也能通过智能体协作突破单体极限。

> 内部评测显示，Claude Opus 4 作为主智能体，配合 Claude Sonnet 4 子智能体的多智能体系统，在复杂研究任务上的表现比单智能体提升了 90.2%。

- **Token 利用率高** ：多智能体系统通过分布式上下文窗口，显著提升了 Token 使用效率，适合处理超大规模信息的任务。
- **经济性与适用场景** ：虽然多智能体系统 Token 消耗高（约为普通对话的 15 倍），但在高价值、强并行需求的场景（如深度研究、复杂工具集成）中，能带来远超成本的回报。

## 系统架构揭秘：Orchestrator-Worker 模式

Claude Research 采用了“主控-工人（Orchestrator-Worker）”多智能体架构：

- **主智能体（Lead Agent）** ：负责分析用户查询、制定策略、分解任务。
- **子智能体（Subagents）** ：并行执行各自的子任务，独立搜索、分析并反馈结果。
- **流程示意** ：

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f2f68218b2d64193a8f9135377333da0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgQUnlsI_mmbo=:q75.awebp?rk3s=f64ab15b&x-expires=1750727498&x-signature=iqq56lhati7K5JVJvmE4et4ChYs%3D)

用户提交查询后，主智能体制定计划并保存到 Memory（防止上下文超限丢失），随后生成多个子智能体，分别执行特定研究任务。子智能体独立使用搜索工具，采用 [Interleaved Thinking](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.anthropic.com%2Fen%2Fdocs%2Fbuild-with-claude%2Fextended-thinking%23interleaved-thinking "https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking#interleaved-thinking") 方式评估结果，并将发现反馈给主智能体。主智能体综合结果，决定是否继续深入，最终由 CitationAgent 处理引用，确保所有结论有据可查。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/417e4f1f0ec7442986cac25de450a7ff~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgQUnlsI_mmbo=:q75.awebp?rk3s=f64ab15b&x-expires=1750727498&x-signature=eDQhuisRtGCEoTwoOLgZ1Vytsh8%3D)

- **区别于传统 RAG** ：传统 RAG（检索增强生成）采用静态检索，Claude Research 则通过多步动态搜索，实时调整策略，生成更高质量的答案。

## Prompt 工程与智能体调优经验

多智能体系统的核心挑战在于协调与高效分工。Anthropic 团队总结了以下 Prompt 工程与调优经验：

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9ca31f7fb35b43a883e108b6856cd4c6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgQUnlsI_mmbo=:q75.awebp?rk3s=f64ab15b&x-expires=1750727498&x-signature=oTerDfLcaqbpLNNBwpSFAmRXEwo%3D)

1. **站在智能体视角思考** ：通过模拟和观察智能体执行过程，及时发现并修正失败模式。
2. **教会主控智能体如何分工** ：明确每个子任务的目标、输出格式、工具选择和边界，避免重复劳动或遗漏。
3. **任务复杂度与资源动态匹配** ：为不同复杂度的任务设定智能体数量和工具调用次数，防止资源浪费。
4. **工具设计与选择至关重要** ：为每个工具提供清晰描述和适用场景，避免因工具误用导致效率低下。
5. **让智能体自我优化** ：利用 Claude 4 的自我诊断能力，自动发现并修正 Prompt 或工具描述中的问题，显著提升后续任务效率。
6. **先广后深的搜索策略** ：引导智能体先进行广泛探索，再逐步聚焦细节，避免一开始就陷入细枝末节。
7. **引导思考过程** ：通过 Extended Thinking 模式，让智能体在执行前规划思路，提升推理和执行效率。
8. **并行工具调用提升速度** ：主智能体和子智能体均可并行调用多个工具，极大缩短研究时间。

> 这些策略不仅提升了系统表现，也为 Prompt 工程和多智能体协作提供了可复用的范式。更多示例可参考 [Anthropic Cookbook](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fanthropics%2Fanthropic-cookbook%2Ftree%2Fmain%2Fpatterns%2Fagents%2Fprompts "https://github.com/anthropics/anthropic-cookbook/tree/main/patterns/agents/prompts") 。

## 智能体系统的评测与可靠性保障

- **灵活评测方法** ：多智能体系统路径多样，需关注结果与过程的合理性。建议从小样本快速启动评测，逐步扩展。
- **LLM 评审助力规模化** ：利用 LLM 作为“裁判”，根据准确性、引用、完整性、来源质量和工具效率等维度自动评分，提升评测效率与一致性。
- **人工评测不可或缺** ：人工测试能发现自动化难以捕捉的边缘案例和系统性偏差，完善整体评测体系。
- **系统性观测与调优** ：通过全流程追踪和高层次观测，及时发现并修正智能体间的协作问题，保障系统稳定运行。

## 工程挑战与生产级实践

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/cb583f66e65c42eb82f0fd11fb79b190~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgQUnlsI_mmbo=:q75.awebp?rk3s=f64ab15b&x-expires=1750727498&x-signature=GergIjlJH7gy9%2BNAK%2FO9saRLviU%3D)

- **状态管理与容错** ：智能体需长时间维护状态，系统需支持断点续跑和智能容错，避免小错误引发灾难性后果。
- **调试与可观测性** ：非确定性行为增加调试难度，需全链路追踪和决策模式监控，保障问题可溯源。
- **部署与版本管理** ：采用 [Rainbow Deployments](https://link.juejin.cn/?target=https%3A%2F%2Fbrandon.dimcheff.com%2F2018%2F02%2Frainbow-deploys-with-kubernetes%2F "https://brandon.dimcheff.com/2018/02/rainbow-deploys-with-kubernetes/") 渐进式部署，避免更新中断正在运行的智能体。
- **同步与异步权衡** ：当前主控智能体同步等待子智能体完成，简化了协调但带来瓶颈。未来异步架构将进一步提升并行能力，但也需应对更复杂的状态一致性和错误传播问题。

## 结语：多智能体系统，AI 研究的未来引擎

多智能体系统正成为 AI 解决复杂开放性问题的“超级大脑”。尽管工程挑战重重，但通过精细的架构设计、Prompt 工程、工具优化和系统性测试，Claude Research 已在实际应用中展现出巨大价值。无论是商业机会挖掘、医疗决策、技术难题攻关，还是学术研究，用户都能借助这一系统高效完成原本需数天的工作。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6f7747b8b1844c91ae3c8eb65aefab6c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgQUnlsI_mmbo=:q75.awebp?rk3s=f64ab15b&x-expires=1750727498&x-signature=Z%2Fnr0VIOFCIhOM7qSO9Q4y2Om1M%3D)

> [Clio](https://link.juejin.cn/?target=https%3A%2F%2Fwww.anthropic.com%2Fresearch%2Fclio "https://www.anthropic.com/research/clio") 嵌入图显示，Claude Research 主要应用于软件系统开发（10%）、专业内容优化（8%）、商业增长策略（8%）、学术研究（7%）、信息核查（5%）等领域。

**未来已来，AI 智能体协作将持续拓展人类认知与创新的边界。你准备好迎接这场变革了吗？**

如需了解更多技术细节与开源 Prompt 示例，欢迎访问 [Anthropic 官方文档](https://link.juejin.cn/?target=https%3A%2F%2Fwww.anthropic.com%2Fengineering%2Fbuilt-multi-agent-research-system "https://www.anthropic.com/engineering/built-multi-agent-research-system") 及 [Cookbook](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fanthropics%2Fanthropic-cookbook%2Ftree%2Fmain%2Fpatterns%2Fagents%2Fprompts "https://github.com/anthropics/anthropic-cookbook/tree/main/patterns/agents/prompts") 。

标签：

话题：

[金石焕新程](https://juejin.cn/theme/detail/7490464890612629541?contentType=1)

本文收录于以下专栏

![cover](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95414745836549ce9143753e2a30facd~tplv-k3u1fbpfcp-jj:160:120:0:0:q75.avis)

大模型科普

专栏目录

大模型科普

6 订阅

·

23 篇文章

上一篇

产品没火不是AI不够强，而是“用户不够信”——揭秘 CAIR 成功公式

评论 0

![avatar](https://p6-passport.byteacctimg.com/img/user-avatar/596dd11ec1eb86109467f46963b9da45~100x100.awebp)

0 / 1000

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

![avatar](https://p6-passport.byteacctimg.com/img/user-avatar/22a0d1efddd0f92ee6c3e7327dba7294~70x70.awebp)

为你推荐

- [【专题】大模型对企业数智化升级与业务经营的影响与应对报告PDF合集分享（附原数据表）](https://juejin.cn/post/7277376062575755327 "【专题】大模型对企业数智化升级与业务经营的影响与应对报告PDF合集分享（附原数据表）")
		[原文链接：https://tecdat.cn/?p=33624 自2022年年末以来，人工智能大模型已成为技术领域甚至全球创新领域最受关注的话题。以ChatGPT为代表的大模型产品发展迅速，预测数据显](https://juejin.cn/post/7277376062575755327)
	- [
		拓端tecdat
		](https://juejin.cn/user/3466130564317400)
	- 143
	- 点赞
	- 评论
- [探索前沿科技：Tinygrad、Llama3与Reward Model的深度剖析](https://juejin.cn/post/7416186135918018594 "探索前沿科技：Tinygrad、Llama3与Reward Model的深度剖析")
		[探索前沿科技：Tinygrad、Llama3与Reward Model的深度剖析 目录 Tinygrad：轻量级深度学习的新星 Llama3：Meta的语言巨擘，解锁文本生成新境界 Reward Mo](https://juejin.cn/post/7416186135918018594)
	- [
		ZhangJiQun\_MXP
		](https://juejin.cn/user/958429872785399)
	- 74
	- 1
	- 评论
- [【专题】人工智能通用大模型（ChatGPT）的进展、风险与应对报告PDF合集分享（附原数据表）](https://juejin.cn/post/7277173790936825875 "【专题】人工智能通用大模型（ChatGPT）的进展、风险与应对报告PDF合集分享（附原数据表）")
		[原文链接：https://tecdat.cn/?p=33624 自2022年年末以来，人工智能大模型已成为技术领域甚至全球创新领域最受关注的话题。以ChatGPT为代表的大模型产品发展迅速，预测数据显](https://juejin.cn/post/7277173790936825875)
	- [
		拓端tecdat
		](https://juejin.cn/user/3466130564317400)
	- 54
	- 点赞
	- 评论
- [CAMEL框架与智能代理：提升AI协作能力的探索 | 豆包MarsCode AI刷题](https://juejin.cn/post/7441956765993009191 "CAMEL框架与智能代理：提升AI协作能力的探索 | 豆包MarsCode AI刷题")
		[CAMEL框架与智能代理：提升AI协作能力的探索 | 豆包MarsCode AI刷题 在人工智能的快速发展中，大模型的成功往往依赖于用户的精确输入和有效的任务引导。](https://juejin.cn/post/7441956765993009191)
	- [
		艾伦也格尔
		](https://juejin.cn/user/1000974285802308)
	- 43
	- 点赞
	- 评论
- [【专题】人工智能大模型产业创新价值研究报告PDF合集分享（附原数据表）](https://juejin.cn/post/7277376062575722559 "【专题】人工智能大模型产业创新价值研究报告PDF合集分享（附原数据表）")
		[原文链接：https://tecdat.cn/?p=33624 自2022年年末以来，人工智能大模型已成为技术领域甚至全球创新领域最受关注的话题。以ChatGPT为代表的大模型产品发展迅速，预测数据显](https://juejin.cn/post/7277376062575722559)
	- [
		拓端tecdat
		](https://juejin.cn/user/3466130564317400)
	- 50
	- 点赞
	- 评论
- [LLM Agent提效揭秘4:多智能体协作工作流深度剖析](https://juejin.cn/post/7373986431851020325 "LLM Agent提效揭秘4:多智能体协作工作流深度剖析")
		[合作是智慧的放大器，它聚合了个体的独到见解，催化出超越个体边界的集体智慧。而大语言摸样正在解锁前所未有的协同潜能，本文通过剖析三篇重量级论文，透视多智能体如何在LLM中编织出新的效率与创造力网络。](https://juejin.cn/post/7373986431851020325)
	- [
		X2046
		](https://juejin.cn/user/1398234521286557)
	- 2.5k
	- 11
	- 评论
	![LLM Agent提效揭秘4:多智能体协作工作流深度剖析](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/41a0821d3b8b4de8958c3044b211bb08~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis)
- [【专题】2023大模型伦理原则与实践白皮书报告PDF合集分享（附原数据表）](https://juejin.cn/post/7277173790936875027 "【专题】2023大模型伦理原则与实践白皮书报告PDF合集分享（附原数据表）")
		[原文链接：https://tecdat.cn/?p=33624 自2022年年末以来，人工智能大模型已成为技术领域甚至全球创新领域最受关注的话题。以ChatGPT为代表的大模型产品发展迅速，预测数据显](https://juejin.cn/post/7277173790936875027)
	- [
		拓端tecdat
		](https://juejin.cn/user/3466130564317400)
	- 113
	- 点赞
	- 评论
- [【专题】数字孪生是基于模型的体系工程报告PDF合集分享（附原数据表）](https://juejin.cn/post/7277173790936907795 "【专题】数字孪生是基于模型的体系工程报告PDF合集分享（附原数据表）")
		[原文链接：https://tecdat.cn/?p=33624 自2022年年末以来，人工智能大模型已成为技术领域甚至全球创新领域最受关注的话题。以ChatGPT为代表的大模型产品发展迅速，预测数据显](https://juejin.cn/post/7277173790936907795)
	- [
		拓端tecdat
		](https://juejin.cn/user/3466130564317400)
	- 93
	- 点赞
	- 评论
- [【专题】体系化人工智能与大模型报告PDF合集分享（附原数据表）](https://juejin.cn/post/7277153999183413284 "【专题】体系化人工智能与大模型报告PDF合集分享（附原数据表）")
		[原文链接：https://tecdat.cn/?p=33624 自2022年年末以来，人工智能大模型已成为技术领域甚至全球创新领域最受关注的话题。以ChatGPT为代表的大模型产品发展迅速，预测数据显](https://juejin.cn/post/7277153999183413284)
	- [
		拓端tecdat
		](https://juejin.cn/user/3466130564317400)
	- 72
	- 点赞
	- 评论
- [Thinking Claude：独家实测，超越o1，引领AI思维新时代](https://juejin.cn/post/7440803650945089572 "Thinking Claude：独家实测，超越o1，引领AI思维新时代")
		[在人工智能领域的激烈竞争中，一个由17岁高中生涂津豪（Richards Tu）开发的神级Prompt"Thinking Claude"引起了全球性的关注。](https://juejin.cn/post/7440803650945089572)
	- [
		几米哥
		](https://juejin.cn/user/3296796362156163)
	- 241
	- 点赞
	- 评论
	![Thinking Claude：独家实测，超越o1，引领AI思维新时代](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/cbd829d13f8241338388bc5f0647214e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Yeg57Gz5ZOl:q75.awebp?rk3s=f64ab15b&x-expires=1750750175&x-signature=mEVP1JF0%2BrYUQoMU6RU4w7aNsEc%3D)
- [Sora现状及对大众的影响](https://juejin.cn/post/7343138052972593190 "Sora现状及对大众的影响")
		[OpenAI的Sora，作为其最新推出的人工智能技术，标志着人工智能领域的又一重大进步。Sora的技术现状和未来展望不仅对国内的人工智能发展具有重要启示，也对大众生活产生了深远的影响。 技术现状： S](https://juejin.cn/post/7343138052972593190)
	- [
		大橙子打游戏
		](https://juejin.cn/user/1081575170907086)
	- 587
	- 点赞
	- 评论
	![Sora现状及对大众的影响](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d52176a12fd4552b8c214ad4c01854f~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis#?w=1024&h=1024&s=419208&e=webp&b=3c6589)
- [生成式人工智能服务如何评价《生成式人工智能服务管理办法》](https://juejin.cn/post/7221508167653720123 "生成式人工智能服务如何评价《生成式人工智能服务管理办法》")
		[2023年4月11日，国家网信办发布了《生成式人工智能服务管理办法》（征求意见稿），下面我们就看看各个语言模型是如何评价这份征求意见稿的。](https://juejin.cn/post/7221508167653720123)
	- [
		centurysee
		](https://juejin.cn/user/600750034786445)
	- 201
	- 点赞
	- 评论
	![生成式人工智能服务如何评价《生成式人工智能服务管理办法》](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/187c6ec191d74ff7b7596173015038f0~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis)
- [【专题】中国市场大模型落地进展与趋势洞察报告PDF合集分享（附原数据表）](https://juejin.cn/post/7277173790936891411 "【专题】中国市场大模型落地进展与趋势洞察报告PDF合集分享（附原数据表）")
		[原文链接：https://tecdat.cn/?p=33624 自2022年年末以来，人工智能大模型已成为技术领域甚至全球创新领域最受关注的话题。以ChatGPT为代表的大模型产品发展迅速，预测数据显](https://juejin.cn/post/7277173790936891411)
	- [
		拓端tecdat
		](https://juejin.cn/user/3466130564317400)
	- 101
	- 点赞
	- 评论
- [【专题】人工智能大模型体验报告2.0 PDF合集分享（附原数据表）](https://juejin.cn/post/7277376062575640639 "【专题】人工智能大模型体验报告2.0 PDF合集分享（附原数据表）")
		[原文链接：https://tecdat.cn/?p=33624 自2022年年末以来，人工智能大模型已成为技术领域甚至全球创新领域最受关注的话题。以ChatGPT为代表的大模型产品发展迅速，预测数据显](https://juejin.cn/post/7277376062575640639)
	- [
		拓端tecdat
		](https://juejin.cn/user/3466130564317400)
	- 226
	- 点赞
	- 评论
- [生成式人工智能：CEO 应该了解的 4 个颠覆性创新机会](https://juejin.cn/post/7272843829555707945 "生成式人工智能：CEO 应该了解的 4 个颠覆性创新机会")
		[2022年底发布的ChatGPT引起了全球对生成式AI（简称AGI）的空前兴趣。Bill Gates评价这是与PC、互联网和移动一样革命性的技术。](https://juejin.cn/post/7272843829555707945)
	- [
		Runwise咨询
		](https://juejin.cn/user/532637342249463)
	- 151
	- 点赞
	- 评论
	![生成式人工智能：CEO 应该了解的 4 个颠覆性创新机会](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9160ee830d4a4e2194309a161cffe19c~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis#?w=1920&h=1074&s=460193&e=jpg&b=042c7b)

APP内打开