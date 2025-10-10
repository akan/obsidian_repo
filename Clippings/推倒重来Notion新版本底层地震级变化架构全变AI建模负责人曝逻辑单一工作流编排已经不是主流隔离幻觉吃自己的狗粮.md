---
title: "推倒重来！Notion新版本底层地震级变化，架构全变！AI建模负责人曝逻辑：单一工作流编排已经不是主流！隔离幻觉，吃自己的狗粮"
source: "https://mp.weixin.qq.com/s/gtl1R_Oof-lICxXfoRtmPg"
author:
  - "[[云昭]]"
published:
created: 2025-10-10
description: "Notion底层技术栈大变天！"
tags:
  - "架构重构"
  - "智能体自主"
  - "模块化设计"
  - "延迟优化"
  - "内部测试"
abstract: "Notion为支持新一代AI智能体彻底重建底层架构，采用模块化设计和自主工具选择能力，以匹配推理模型的工作方式。"
---
Original 云昭 *2025年10月10日 13:31*

![Image](https://mmbiz.qpic.cn/mmbiz_gif/MOwlO0INfQoIDJ0nx1IhNibpIpYLrpUE0kIP9qbF1iaY7EoZpaic6IojvbXibd5ZGiatxmjtibQRcVbGAPM9Ijvp66yQ/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0) ![Image](https://mmbiz.qpic.cn/mmbiz_png/MOwlO0INfQrtQ9YDnsqgflregFIUtXTZmurUUBzJric6I4Bhurnql6BtY0LhxglyUlyd7LsX2HMCytKXzzcVs2Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

## 编辑 | 云昭

许多公司会对彻底重建自己的技术栈犹豫不决。但 **Notion** 就是那个例外。

据了解，为了推出今年9月发布的 **Notion 3.0** ，这家公司几乎没有犹豫就决定—— **彻底重建底层架构** 。

Notion 作为业界知名的AI应用，开始舍弃原有底层架构， 这一点特别不同寻常。  

近日，Notion 的 AI 建模负责人 Sarah Sachs 在采访中透露了背后的原因：

> “我们不想在旧架构上硬塞智能体。相反，我们希望发挥推理模型的优势。我们重建了整个系统，因为智能体的工作方式和传统工作流完全不同。”

言外之意，他们意识到，如果要在企业级别支持 Agentic AI（自主智能体），这是必要的一步。

这背后隐藏着一个重要信号：新旧两代AI应用的技术构建逻辑发生了变化。

与传统 AI 工作流通常依赖显式的、一步步的指令和少量示例（few-shot learning）不同，新一代 **推理模型驱动的 AI 智能体** 能自己理解可用的工具、规划下一步行动，并具备更强的自主性。

所以，“我们重建了一个新架构，因为工作流程与 agent 不同。”

而重建过程中有哪些宝贵的规模化AI应用构建的经验呢？小编这就为大家整理了下来。主要有以下这五点。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### “仅仅让AI完成单一任务已不够”

如今，Notion 被 **94% 的《福布斯 AI 50》公司** 采用，总用户超过 **1亿** ，客户包括 **OpenAI、Cursor、Figma、Ramp、Vercel** 等。

在快速变化的 AI 时代，Notion 意识到：仅仅让 AI 完成单一任务已经不够。

企业真正需要的是 **以目标为导向的推理系统** ，让智能体能在多个互联环境中 **自主选择、编排并执行工具** 。

Sachs 指出，如今推理模型在学习工具使用和遵循 Chain-of-Thought（思维链）方面“已经强太多了”。

> “它们能更独立地完成一个完整流程中的 多次决策 ，所以我们必须重构系统去匹配这种能力。”

从工程角度看，这意味着要 **抛弃僵硬的 prompt 流程** ，转而采用一个统一的“编排模型”。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

模块化子Agent

这个核心模型由一系列模块化子智能体支撑，这些子智能体能搜索 Notion 与网页、查询或更新数据库、编辑内容等。

- 每个智能体会根据上下文决定使用什么工具，比如先判断是要在 Notion 内部查找，还是去 Slack 等外部平台。
- 模型会连续检索，直到找到最相关的信息，然后自动执行后续动作：将笔记转成提案、生成跟进消息、追踪任务、更新知识库等。

在 **Notion 2.0** 时，AI 还需要通过 prompt 精确指定每一步的操作。

但在 **3.0** 中，用户可以直接 **把任务交给智能体** ——它会自主选择工具，并能并行完成多项任务。

Sachs 总结道：

> “我们让它具备自选工具的能力，而不是靠 few-shot 提示一步步教它怎么做。目标是：凡是你能做的事，Notion 的智能体也能做。”

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 分离架构，隔离幻觉

Notion 一直奉行“ **更好、更快、更省** ”的研发哲学。在技术上，他们通过 **向量嵌入微调** 与 **弹性搜索优化** 平衡延迟与准确性。

Sachs 团队建立了一套严谨的评估体系：结合 **确定性测试、语言优化、人类标注数据和 LLM 审核机制** ，用模型评分定位偏差与错误来源。

> “通过把评估流程分层，我们能明确问题来源，从而隔离掉不必要的幻觉，”Sachs 解释说。  
> 同时，更简洁的架构也意味着——当模型与技术快速演进时，更新会更轻松。

她补充道：

> “我们尽可能优化延迟和并行推理，这显著提升了准确率。”  
> 模型的推理基于网页数据与 Notion 自身的知识空间。

最终，这次重构让 Notion 在功能与迭代速度上都得到了显著回报。Sachs 表示：“如果下一个重大突破到来，我们也完全愿意再次推倒重来。”

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### “上下文延迟”是主观的

在模型训练和调优中，Sachs 提出一个关键观点——  
**延迟（latency）是主观的** ：AI 不应一味追求速度，而要在正确的时间提供最相关的信息。

> “你会惊讶地发现，不同客户在‘等待’这件事上容忍度完全不同，” 她说。  
> 于是这成了一个实验：到底多慢，用户才会放弃等待？

比如在纯导航式搜索中，用户希望即时响应。

> “如果你问‘2+2等于几’，没人想等着看智能体在 Slack 或 JIRA 里搜索，” Sachs 打趣道。

但在更复杂的任务中，等待反而值得。

Notion 的智能体可以自主工作 **长达20分钟** ，在成百上千个网页、文件和资料间检索、综合。此时，用户往往乐意让它在后台执行，自己去处理其他任务。

> “这其实是个产品问题，”她说，  
> “我们需要在 UI 层明确设定用户期望，并理解他们对延迟的心理预期。”

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### “吃自己的狗粮”

Notion 深知“吃自己做的狗粮”的重要性——  
事实上， **公司员工本身就是最重度的 Notion 用户** 。

团队每天在活跃沙盒中生成训练与评估数据，同时还有一个非常活跃的 **“点赞 / 点踩”反馈系统** 。  
用户毫不客气地提出想改进的地方和希望增加的功能。

Sachs 解释说，当用户点踩一次交互时，就代表他们同意让人工标注员分析那次交互（即便这意味着部分去匿名化）。

> “我们每天都在用自己的工具，这让我们能获得极快的反馈循环。”

当然，她也承认，这种“自用视角”可能让团队对产品质量和功能有偏见。  

为此，Notion 还邀请了一批 **“AI 素养极高”的外部设计合作伙伴** 提前试用新功能，并提供关键反馈。

> “这和内部原型测试同等重要，”Sachs 强调。  
> “开放式实验能获得更丰富的反馈。  
> 如果我们只看 Notion 怎么用 Notion，就不可能真正做到用户最佳体验。”

持续的内部测试还能验证模型是否在退化（准确率或性能下降）。

> “这样我们能确保一切都保持稳定，延迟在可控范围内，”她补充说。

她指出，许多公司在评估时过于关注历史回顾，结果反而 **难以理解自己在哪些方面取得了进步** 。而 Notion 把评估视为衡量“发展方向与可观测性”的试金石。

> “很多公司混淆了这两种评估方式，”Sachs 说。  
> “我们同时用两者，但在逻辑上完全区分开。”

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 要敢于站在前沿，不要害怕重建

### 如何在一个互联、安全的企业工作空间中，以负责任的方式运行智能体系统？

### 对希望采用 Agentic AI 的企业而言，Notion 的实践可以说是一份十分值得参考的蓝图。Sachs

- **当基础能力发生根本变化时，不要害怕重建。** Notion 完全重构了架构，以契合推理型模型。
- **将延迟视为“上下文相关”的问题。** 不是一味追求快，而是针对不同场景优化体验。
- **让所有输出都基于可信、经过整理的企业数据。** 这是保证准确性与信任度的前提。

她最后总结道：

> “要敢于做艰难的决定，敢于站在前沿。 只有这样，你才能为用户打造真正最好的产品。”

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

总结：Notion的架构重建要点

最后，鉴于大家喜欢让元宝总结下这篇文章，这里小编也给大家总结了一下Notion3这次重构底层架构的五个要点：

- **让模型能够自主行动（autonomously）**
- Notion 意识到市场中简单、基于任务的工作流（task-based workflows）已经不能满足要求，需要向能够自主选择、组织、执行工具的“目标导向的推理系统”转变。
	- 在 3.0 版本中，用户可以把任务交给 agent，而 agent 本身能并行执行多个子任务。它们在判断用什么工具的时候是自我选择的，不再依赖显式提示（prompt）设定一系列 scenario。
- **模块化子 agent 与统一调度模型**
- 架构中包含多个子 agent（sub-agents），这些子 agent 可以在 Notion 内部搜索、在网络上搜索、查数据库、编辑内容等。它们根据上下文决定要用哪个工具（比如在 Notion 内搜索还是去 Slack 等其他平台），直到找到相关信息。
	- 然后，agent 可以把笔记转换为提案、创建跟进消息、跟踪任务、更新知识库等。
- **减少幻觉（“胡言乱语” / 输出不准）**
- Notion 在追求“更好、更快、更便宜”（better, faster, cheaper）的过程中，持续迭代，平衡延迟和准确性。他们用微调的向量嵌入（vector embeddings）、弹性搜索优化 (elastic search optimization) 等方法来做到这一点。
	- 评估框架非常严格，包含确定性测试、口语化优化、人工标注数据、还有把大语言模型当作裁判（LLMs-as-a-judge）来做评分。模型还要检测偏差、不一致或不准之处，从而定位问题源头。
- **理解“延迟”的情境性（Contextual Latency）**
- 延迟并不总是坏事，要看用例。用户在什么情况下能容忍稍微慢一点，什么情况下不能容忍，差别很大。比如查“2+2”等简单问题时，用户期望几乎立刻得到结果；但如果是 agent 要在后台跨多个网站、文件、资料自动工作 20 分钟，那用户可能觉得可以接受。
	- 界面（UI）上要设定好用户的期待（user expectations），让用户知道这个操作可能要多久。
- **自家用产品 + 快速反馈循环**
- Notion 自己也是最重度的用户 (“dogfooding”)。内部团队有沙盒环境产生训练和评估数据，还有很活跃的点赞/点踩反馈机制。用户明确不满意某次互动后，可以授权人工审核那次交互，并尽可能去匿名化分析。
	- 同时，公司也与 “非常懂 AI 的设计合作伙伴”合作，让他们提前试用新功能并反馈。这样一方面能内部快速试错，另一方面能获得外部真实场景的反馈。

好了，文章到这里结束了。Notion作为AI办公类应用的代表已经向微软Office发起了冲锋，如今架构底层已经发生了彻底的变化，说明距离规模化的企业落地的AI应用，黎明时分已至！

希望能帮助到正在使用AI开发的各位大佬们。欢迎评论区交流。

参考链接：

https://venturebeat.com/ai/to-scale-agentic-ai-notion-tore-down-its-tech-stack-and-started-fresh

——好文推荐——

[超级应用的平台野心！OpenAI版小程序诞生！奥特曼深夜五连发！ChatGPT可内置应用，Codex超强更新，AI构建者时代已至](https://mp.weixin.qq.com/s?__biz=MjM5ODI5Njc2MA==&mid=2655929318&idx=1&sn=01cfe2e24a265ed3dbebbbaf210211c1&scene=21#wechat_redirect)

[敏捷OUT，架构归来！老鸟谈软件开发历史：氛围编程时代，速度不再是第一位了！而是更聪明的框架设计！下一代coder是机器，而非人](https://mp.weixin.qq.com/s?__biz=MjM5ODI5Njc2MA==&mid=2655929295&idx=1&sn=c58863e61bdee4a85267d6541cc9836a&scene=21#wechat_redirect)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

51CTO技术栈

向上滑动看下一个