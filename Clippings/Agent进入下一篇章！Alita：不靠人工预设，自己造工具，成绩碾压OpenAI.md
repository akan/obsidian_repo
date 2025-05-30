---
title: "Agent进入下一篇章！Alita：不靠人工预设，自己造工具，成绩碾压OpenAI"
source: "https://mp.weixin.qq.com/s/SUVextzhVu2UJ7OoauhSHQ"
author:
  - "[[编辑部]]"
published:
created: 2025-05-28
description:
tags:
  - "clippings"
---
Original 编辑部 [深度学习自然语言处理](https://mp.weixin.qq.com/s/)

*2025年05月28日 13:32* *江苏*

智能体的困境：人工预设太多，能力被“锁死”

当前的AI Agent（比如帮你订机票、写报告的Agent）有个大问题——**太依赖人工预设**。就像给机器人提前装好螺丝刀和扳手，但遇到需要胶水的情况，它只能干瞪眼。![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baiagyQs0ZKO0lNEHLL3Gr2sbmWjunscFiclfmAicRx3mlNJGiaBnX7SAuX4xMeD0BKYhOZ050pIia68iaSw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

> 论文：Alita: Generalist Agent Enabling Scalable Agentic Reasoning with Minimal Predefinition and Maximal Self-Evolution  
> 链接：https://arxiv.org/pdf/2505.20286

  

欢迎大家预约直播，本周日上午share这篇工作！

论文提到，现有系统需要大量“手工工具包”，比如预设的代码、固定流程，甚至限定只能用Python。这导致三个致命缺陷：

- **工具不够用**：现实任务千变万化，预设工具永远覆盖不全。
- **缺乏创造力**：遇到新问题不会自己造工具。
- **兼容性差**：非Python工具难以接入，比如用Java写的功能就抓瞎。
![传统智能体 vs. Alita的架构对比](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baiagyQs0ZKO0lNEHLL3Gr2sbVcEdfxias2amEGyWjdEbFUMGXvjHCpPCU0icDlB8jDUrlfEo6nd9LCXQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

传统智能体 vs. Alita的架构对比

## Alita的核心理念：少预设，多进化

Alita的设计哲学就一句话：“**简单即终极复杂**”。它只做两件事——

- **最小化预定义**：不塞一堆预设工具，只保留一个核心模块（Web Agent）。
- **最大化自我进化**：让AI自己造工具，还能反复用！

关键黑科技是**MCP协议**（Model Context Protocol）。简单来说，MCP就像“乐高说明书”，告诉AI如何动态连接外部资源。Alita能根据任务需求，**现场生成MCP工具包**，用完还能存起来下次直接调用。

举个栗子🌰： 如果任务需要爬取YouTube字幕，Alita会自己搜开源代码→写爬虫脚本→封装成MCP工具→存进“工具箱”。下次遇到类似任务，直接调用这个工具，不用重新造轮子。

## 三大模块：大脑、触手、工具箱

Alita的架构像一个人工智能小分队：

1. **Manager Agent（大脑）**：总指挥，负责拆解任务、调度资源。
2. **Web Agent（触手）**：上网搜资料，比如GitHub找代码、Google查资料。
3. **MCP工具箱**：动态生成的工具库，支持自我升级。
![Alita工作流程图：任务输入→大脑分析→触手搜索→生成工具→执行并存储](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baiagyQs0ZKO0lNEHLL3Gr2sb2KJdRtp1cNJbCkKS1k87s9XJOibmYCdNxIJnLKUYl9Znic8tEFWAcNZQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

Alita工作流程图：任务输入→大脑分析→触手搜索→生成工具→执行并存储

最牛的是**环境隔离技术**：每个新工具在独立环境中运行，避免“装个爬虫却搞崩系统”的惨剧。如果工具报错，Alita还能自动修复或抛弃。

## 实验结果：吊打OpenAI，成绩单亮眼

论文在三大权威测试集（GAIA、Mathvista、PathVQA）上验证了Alita的实力：

- **GAIA综合得分75.15%** ，碾压OpenAI Deep Research的67.36%。
- **Mathvista准确率74%** ，比传统工具包Octotools高6个百分点。
- **PathVQA医疗问答52%** ，同样领先。
![性能对比表](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6baiagyQs0ZKO0lNEHLL3Gr2sbbgaiaeibRorSTiawNib3ggBStHQVg69b3WcI5lw9RyialqtI9tJDjGibeLUg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

性能对比表

更绝的是，Alita生成的MCP工具还能“传功”给小模型。比如用GPT-4o-mini（小模型）搭配Alita的MCP，成绩直接提升33%！

## 实战案例：如何一键提取YouTube字幕

论文附了一个超酷的案例——**从YouTube 360°VR视频中提取旁白数字**。

任务：找到《指环王》“咕噜”配音演员在视频中提到的一个数字（正确答案是1亿）。

Alita的操作步骤：

1. **大脑拍板**：需要造一个“字幕爬虫工具”。
2. **触手出击**：搜到GitHub上的youtube-transcript-api代码。
3. **生成工具**：写Python脚本+配置独立环境。
4. **执行输出**：成功提取字幕，锁定“100000000”。

全程无需人工写代码，完全自主搞定！

## 未来：AI的终极形态是“自我生长”？

Alita的局限性也很明显——**依赖大模型的编码能力**。如果用弱鸡小模型，效果会打折扣。但论文预言：未来大模型越强，Alita的性能会指数级提升。

想象一下，未来的AI可能像生物一样**自我进化**：

- 遇到问题→自己造工具→工具库越来越丰富→能力无限扩展。
- 人类只需设计进化机制，而非手把手教每个技能。

或许，这才是通用人工智能（AGI）的真正起点。

---

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahEkV3JfvLU8RNpaOBkjpGhU2gzPfFCzibbic5we8L4y1lficFdvurdcqZXiajZf0gosMW709VdGRPINg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1&tp=webp)