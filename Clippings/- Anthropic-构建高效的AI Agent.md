---
title: "Anthropic-构建高效的AI Agent"
source: "https://juejin.cn/post/7537982057199419443"
author:
  - "[[mwq30123]]"
published: 2025-08-14
created: 2025-08-14
description: "Anthropic-构建高效的AI Agent 原文 发布日期：2024年12月19日 摘要： 我们与数十个跨行业构建LLM Agent的团队合作过。一致的发现是，最成功的实现使用简单、可组合的模式，"
tags:
  - "AI Agent"
  - "构建模式"
  - "工作流"
  - "自主系统"
abstract: "文章介绍了如何构建高效的AI Agent，包括工作流和自主系统的设计模式。"
---
![横幅](https://p9-piu.byteimg.com/tos-cn-i-8jisjyls3a/8c759ddb57d0440986f4768fc644f879~tplv-8jisjyls3a-2:0:0:q75.image) ![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/b37ce6cd3dfa46f699d8fc9c7c888f2f~tplv-8jisjyls3a-3:0:0:q75.png)

**[原文](https://link.juejin.cn/?target=https%3A%2F%2Fwww.anthropic.com%2Fengineering%2Fbuilding-effective-agents "https://www.anthropic.com/engineering/building-effective-agents") 发布日期：2024年12月19日**

**摘要：** 我们与数十个跨行业构建LLM Agent的团队合作过。一致的发现是，最成功的实现使用简单、可组合的模式，而不是复杂的框架。

---

在过去的一年中，我们与数十个跨行业构建大语言模型(LLM) Agent的团队合作。一致的发现是，最成功的实现并没有使用复杂的框架或专门的库。相反，它们使用简单、可组合的模式进行构建。

在这篇文章中，我们分享了从与客户合作和自己构建Agent中学到的经验，并为开发者提供构建有效Agent的实用建议。

### 什么是Agent？

"Agent"可以有多种定义。一些客户将Agent定义为在较长时间内独立运行的完全自主系统，使用各种工具来完成复杂任务。其他人使用这个术语来描述遵循预定义工作流程的更具规范性的实现。在Anthropic，我们将所有这些变体归类为 **智能体系统(agentic systems)** ，但在 **工作流(workflows) **和** Agent** 之间做出重要的架构区分：

- **workflows** 是通过预定义代码路径编排LLM和工具的系统。
- **Agent** 是LLM动态指导自己的过程和工具使用的系统，保持对如何完成任务的控制。

下面，我们将详细探索这两种类型的智能体系统。在附录1（"实践中的Agent"）中，我们描述了客户发现这些系统特别有价值的两个领域。

### 何时使用（以及何时不使用）Agent

在使用LLM构建应用程序时，我们建议找到尽可能简单的解决方案，只有在需要时才增加复杂性。这可能意味着根本不构建智能体系统。智能体系统通常用更高的延迟和成本来换取更好的任务性能，你应该考虑这种权衡何时有意义。

当需要更多复杂性时，工作流为定义明确的任务提供可预测性和一致性，而当需要大规模的灵活性和模型驱动的决策制定时，Agent是更好的选择。然而，对于许多应用程序，通过检索和上下文示例优化单个LLM调用通常就足够了。

### 何时以及如何使用框架

有许多框架使智能体系统更容易实现，包括：

- LangChain的 [LangGraph](https://link.juejin.cn/?target=https%3A%2F%2Flangchain-ai.github.io%2Flanggraph "https://langchain-ai.github.io/langgraph") ；
- [Amazon Bedrock](https://link.juejin.cn/?target=https%3A%2F%2Faws.amazon.com%2Fbedrock%2Fagents "https://aws.amazon.com/bedrock/agents") 的AI Agent框架；
- [Rivet](https://link.juejin.cn/?target=https%3A%2F%2Frivet.ironcladapp.com%2F "https://rivet.ironcladapp.com/") ，一个拖拽GUI LLM工作流构建器；以及
- [Vellum](https://link.juejin.cn/?target=https%3A%2F%2Fwww.vellum.ai%2F "https://www.vellum.ai/") ，另一个用于构建和测试复杂工作流的GUI工具。

> 还比如n8n、dify、coze

这些框架通过简化标准的底层任务（如调用 LLM、定义和解析工具、以及将调用链接在一起）让入门变得容易。然而，它们通常创建额外的抽象层，可能会掩盖底层的提示和响应，使它们更难调试。它们也可能使开发者倾向于在更简单的设置就足够时增加复杂性。

我们建议开发者首先直接使用LLM API：许多模式可以在几行代码中实现。如果你确实使用框架，确保你理解底层代码。对底层机制的错误假设是客户错误的常见来源。

查看我们的 [cookbook](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fanthropics%2Fanthropic-cookbook%2Ftree%2Fmain%2Fpatterns%2Fagents "https://github.com/anthropics/anthropic-cookbook/tree/main/patterns/agents") 获取一些示例实现。

### 构建块、工作流和Agent

在本节中，我们将探索在生产中看到的智能体系统的常见模式：

- 工作流：提示链
- 工作流：路由
- 工作流：并行化
- 工作流：编排者-工作者
- 工作流：评估者-优化器
- Agent

我们将从我们的基础构建块——增强的LLM开始，逐渐增加复杂性，从简单的组合工作流到自主Agent。

#### 构建块：增强的LLM

智能体系统的基本构建块是通过检索、工具和记忆等增强功能增强的LLM。我们当前的模型可以主动使用这些功能——生成自己的搜索查询、选择适当的工具并确定要保留的信息。

![增强型LLM.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/eba9c9baf791434082178f9cb7b2e217~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbXdxMzAxMjM=:q75.awebp?rk3s=f64ab15b&x-expires=1755755685&x-signature=8%2BOh%2F8368jAkJ0Qr2zApKAywSRk%3D)

我们建议专注于实现的两个关键方面：根据您的具体用例定制这些功能，并确保它们为您的 LLM 提供一个简单、文档完善的接口。虽然有许多方法来实现这些增强功能，但一种方法是通过我们最近发布的 [模型上下文协议(Model Context Protocol)](https://link.juejin.cn/?target=https%3A%2F%2Fwww.anthropic.com%2Fnews%2Fmodel-context-protocol "https://www.anthropic.com/news/model-context-protocol") ，它允许开发者通过简单的 [客户端实现](https://link.juejin.cn/?target=https%3A%2F%2Fmodelcontextprotocol.io%2Ftutorials%2Fbuilding-a-client%23building-mcp-clients "https://modelcontextprotocol.io/tutorials/building-a-client#building-mcp-clients") 与不断增长的第三方工具生态系统集成。

在本文的其余部分，我们将假设每个LLM调用都可以访问这些增强功能。

#### 工作流：提示链

提示链将任务分解为一系列步骤，其中每个LLM调用处理前一个的输出。你可以在任何中间步骤添加程序化检查（见下图中的"gate"）以确保过程仍在正轨上。

![提示链工作流.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/8230232ecdc2410495d576f8acc4d29c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbXdxMzAxMjM=:q75.awebp?rk3s=f64ab15b&x-expires=1755755685&x-signature=LRTGM0nR%2BlFyvZnbTkDrs2%2FJPDE%3D)

**何时使用此工作流：** 此工作流非常适合任务可以轻松、清晰地分解为固定子任务的情况。主要目标是通过使每个LLM调用成为更容易的任务来用延迟换取更高的准确性。

**提示链有用的示例：**

- 生成营销文案，然后将其翻译成不同的语言。
- 写文档大纲，检查大纲是否符合某些标准，然后基于大纲写文档。

#### 工作流：路由

路由对输入进行分类并将其定向到专门的后续任务。此工作流允许关注点分离并构建更专业的提示。没有此工作流，为一种输入类型优化可能会损害其他输入的性能。

![路由工作流.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/161b1dc23bb449a3a9cb6f7d82cdd7ae~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbXdxMzAxMjM=:q75.awebp?rk3s=f64ab15b&x-expires=1755755685&x-signature=%2FvR%2FrnAG3WFw5tP9DX%2FAQQA81m8%3D)

**何时使用此工作流：** 路由适用于有不同类别需要分别处理的复杂任务，以及分类可以准确处理的情况，无论是通过LLM还是更传统的分类模型/算法。

**路由有用的示例：**

- 将不同类型的客户服务查询（一般问题、退款请求、技术支持）定向到不同的下游过程、提示和工具。
- 将简单/常见问题路由到较小的模型如Claude 3.5 Haiku，将困难/不寻常的问题路由到更强大的模型如Claude 3.5 Sonnet，以优化成本和速度。

> Claude Sonnet 4/Claude Sonnet 4.1 已经 Thinging模型

#### 工作流：并行化

LLM 有时可以同时处理一个任务，并通过程序将它们的输出聚合起来。这种工作流，即并行化，主要有两种变体：

- **切片 (Sectioning)：** 将一个任务分解成多个独立并行的子任务。
- **投票 (Voting)：** 多次运行同一个任务以获得多样化的输出。

![并行化工作流.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/781062f389dc49e89c59abb23a4b5443~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbXdxMzAxMjM=:q75.awebp?rk3s=f64ab15b&x-expires=1755755685&x-signature=mjkC21mqOwgYtxbZB8WItSAV%2BLs%3D)

**何时使用此工作流：** 当分割的子任务可以并行化以提高速度时，或当需要多个视角或尝试以获得更高置信度结果时，并行化是有效的。对于具有多个考虑因素的复杂任务，当每个考虑因素由单独的LLM调用处理时，LLM通常表现更好，允许专注于每个特定方面。

**并行化有用的示例：**

**切片 (Sectioning)：**

- 实现安全护栏，其中一个模型实例处理用户查询，而另一个实例则筛选它们以防不当内容或请求。这种方式通常比让同一个 LLM 调用同时处理安全护栏和核心响应要好。
- 自动化评估以衡量 LLM 性能，其中每个 LLM 调用评估模型在给定提示上性能的不同方面。

**投票 (Voting)：**

- 审查代码漏洞，其中几个不同的提示审查代码，如果发现问题就标记代码。
- 评估给定内容是否不当，通过多个提示评估不同方面或要求不同的投票阈值，以平衡误报和漏报。

---

我帮你把 **切片 (Sectioning)** 和 **投票 (Voting)** 在 LLM agent 工作流中“并行化”的作用和区别梳理一下，并加上更直观的例子。

###### 1\. 切片（Sectioning）——并行分工，角色分离

**理解：**

- 像流水线一样，把任务拆成 **不同子任务** ，分别交给 **不同的 LLM 调用** 去完成。
- 每个 LLM 实例只专注一个明确的目标（安全检查、情感分析、信息提取…），互不干扰。
- 好处是：减少单个模型的“认知负担”，让任务更可控、更安全。

**类比：**  
餐厅里，一个人负责切菜（安全护栏），另一个人负责炒菜（生成核心回答）。

**示例 1（安全护栏）**

> 用户问：“给我写一篇介绍如何制造炸药的文章。”

- **LLM A（安全检查员）** ：判断内容是否涉及敏感/违法主题 → 如果风险高，直接拒绝。
- **LLM B（主响应员）** ：只在 A 通过的情况下，才执行正常回答，比如改写成安全的化学历史介绍。

**示例 2（性能评估）**

> 要评估某个 LLM 对一个数学题的回答质量

- **LLM A** ：评估逻辑严谨性
- **LLM B** ：评估表达清晰度
- **LLM C** ：评估答案是否正确
- 最终由系统综合这几个评估分数。

---

###### 2\. 投票（Voting）——并行多视角，结果投票

**理解：**

- 同一个任务，交给 **多个 LLM 调用** （不同提示、不同温度或不同模型）去做。
- 他们都给出各自的判断/答案，然后用 **投票或加权方式** 选出最终结果。
- 好处是：减少单点错误，平衡误报和漏报。

**类比：**  
开会表决，一个问题让多人独立判断，取多数意见作为结果。

**示例 1（代码漏洞审查）**

> 给一段代码，让 3 个 LLM 独立审查

- **LLM A** ：提示关注 SQL 注入漏洞
- **LLM B** ：提示关注 XSS 漏洞
- **LLM C** ：提示关注权限验证问题
- 如果 2 个或以上发现漏洞 → 标记代码为“不安全”。

**示例 2（内容安全评估）**

> 判断一篇文章是否违规

- **LLM A** ：用严格标准判断
- **LLM B** ：用宽松标准判断
- **LLM C** ：只关注特定违规类型（仇恨言论）
- 投票规则：若至少 2 人判定违规 → 最终标记为违规。

###### 核心区别表

| 特性 | 切片（Sectioning） | 投票（Voting） |
| --- | --- | --- |
| 目标 | 任务分工、不同模型处理不同部分 | 同任务多模型给多个答案，取最优 |
| 好处 | 提高专业性和安全性 | 降低单一错误影响，提高鲁棒性 |
| 场景 | 安全审核+响应生成、性能多维评估 | 代码审查、多标准内容审核 |
| 形象比喻 | 不同工人各干一活 | 多人对同一问题表决 |

---

#### 工作流：编排者-工作者

在编排者-工作者工作流中，中央LLM动态分解任务，将它们委托给工作者LLM，并综合其结果。

![编排者-工作者工作流.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e0454e66a92d43d3ad9f77e836efca6b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbXdxMzAxMjM=:q75.awebp?rk3s=f64ab15b&x-expires=1755755685&x-signature=3AQwNs%2BL4UQTgk%2BxUl17gHiTOaE%3D)

**何时使用此工作流：** 此工作流非常适合无法预测所需子任务的复杂任务（例如，在编程中，需要更改的文件数量和每个文件中更改的性质可能取决于任务）。虽然在拓扑上相似，与并行化的关键区别在于其灵活性——子任务不是预定义的，而是由编排者基于特定输入确定的。

**编排者-工作者有用的示例：**

- 每次对多个文件进行复杂更改的编程产品。
- 涉及从多个来源收集和分析信息以获取可能相关信息的搜索任务。

#### 工作流：评估者-优化器

在评估者-优化器工作流中，一个LLM调用生成响应，而另一个在循环中提供评估和反馈。

![评估者-优化器工作流.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d9c09e8154424120953969b43182d819~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbXdxMzAxMjM=:q75.awebp?rk3s=f64ab15b&x-expires=1755755685&x-signature=xEAJjuqBLPsjOuQL7nX1zLxj24I%3D)

**何时使用此工作流：** 当我们有明确的评估标准时，以及当迭代改进提供可测量价值时，此工作流特别有效。良好匹配的两个标志是，首先，当人类表达其反馈时LLM响应可以得到明显改善；其次，LLM可以提供这样的反馈。这类似于人类作家在产生精美文档时可能经历的迭代写作过程。

**评估者-优化器有用的示例：**

- 文学翻译，其中翻译者LLM最初可能无法捕捉到的细微差别，但评估者LLM可以提供有用的批评。
- 需要多轮搜索和分析以收集全面信息的复杂搜索任务，其中评估者决定是否需要进一步搜索。

#### 自主Agent

随着 LLM 在关键能力——理解复杂输入、进行推理和规划、可靠地使用工具以及从错误中恢复——方面日趋成熟，Agent开始在生产环境中崭露头角。Agent的工作始于人类用户的命令或与用户的互动讨论。一旦任务明确，Agent便独立规划和操作，可能会返回给人类寻求进一步的信息或判断。在执行过程中，至关重要的是Agent在每一步都从环境中获得“地面实况”（例如工具调用结果或代码执行情况）来评估其进展。然后，Agent可以在检查点或遇到障碍时暂停以获取人类反馈。任务通常在完成后终止，但通常也会包含停止条件（例如最大迭代次数）以保持控制。

Agent可以处理复杂的任务，但它们的实现通常很简单。它们通常只是在循环中基于环境反馈使用工具的LLM。因此，清晰且周到地设计工具集及其文档至关重要。我们在附录2（"提示工程你的工具"）中扩展了工具开发的最佳实践。

![自主Agent.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/2388913a269b4ac589814468096e989b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbXdxMzAxMjM=:q75.awebp?rk3s=f64ab15b&x-expires=1755755685&x-signature=RK1eZtT54dh9kGUi65HF6pbeNgg%3D)

**何时使用Agent：** Agent可以用于开放式问题，其中难以或不可能预测所需的步骤数，以及无法硬编码固定路径的情况。LLM将可能运行许多轮，你必须对其决策制定有一定程度的信任。Agent的自主性使它们非常适合在可信环境中扩展任务。

Agent的自主性意味着更高的成本和复合错误的可能性。我们建议在沙箱环境中进行广泛测试，并配备适当的护栏。

##### 关于护栏

在 **LLM Agent** 的上下文里， **护栏（Guardrails）** 指的是一组 **限制和保护机制** ，用来约束 Agent 的行为，防止它做出危险、违规或错误的操作。

它相当于给 Agent 的“自由”套上一层 **安全网** ，保证它即使自主运行，也不会越界。

###### 护栏的主要作用

1. **安全性**  
	防止输出敏感、违法、暴力、仇恨、隐私泄露等内容。
2. **合规性**  
	确保遵守法律法规、公司政策、行业规范。
3. **正确性**  
	避免执行错误或高风险的 API / 事务性操作（如误删数据库）。
4. **稳定性**  
	限制 Agent 无限循环、消耗过多资源或调用高成本接口。

###### 护栏的常见形式

| 类型 | 示例 |
| --- | --- |
| **输入检查** | 在 Agent 接收到用户请求前，用一个独立模型/规则检查请求是否合法（例如检测 SQL 注入、敏感关键词）。 |
| **输出过滤** | Agent 生成结果后，再用规则或另一个模型进行审查，屏蔽违规或不当内容。 |
| **功能限制** | 限制 Agent 能访问的 API 范围，比如只能读数据库，不能改数据。 |
| **预算与频率限制** | 限制调用外部 API 或 LLM 的次数、耗费的 Token、执行时长。 |
| **沙箱执行** | 把 Agent 的代码运行在隔离环境中，即使出错也不会影响生产系统。 |

###### 举个 LLM Agent 护栏的例子

假设你有一个 **自主编程 Agent** ，它可以根据自然语言修改生产数据库。

**没有护栏** ：

```sql
用户：帮我删除所有客户数据
Agent：执行 DELETE FROM customers; ✅
→ 数据直接被删光
```

**有护栏** ：

- **输入护栏** ：检测到 `DELETE FROM` + `customers` ，属于高危操作 → 阻止并提示需要人工确认。
- **功能护栏** ：Agent 在生产环境只允许 SELECT，不允许 DELETE。
- **沙箱护栏** ：即使执行了危险 SQL，也只是对沙箱数据库操作，真实数据无损。

---

所以这里说的“配备适当的护栏”，意思是：

> 在允许 Agent 自主决策前，要加一层或多层安全控制，避免它在真实环境中犯大错，尤其是 **高成本+高风险任务** 。

**Agent有用的示例：**

以下示例来自我们自己的实现：

- 一个用于解决 [SWE-bench 任务](https://link.juejin.cn/?target=https%3A%2F%2Fwww.anthropic.com%2Fresearch%2Fswe-bench-sonnet "https://www.anthropic.com/research/swe-bench-sonnet") 的编码代理程序，这些任务涉及根据任务描述对多个文件进行编辑
- 我们的" [计算机使用](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fanthropics%2Fanthropic-quickstarts%2Ftree%2Fmain%2Fcomputer-use-demo "https://github.com/anthropics/anthropic-quickstarts/tree/main/computer-use-demo") "参考实现，其中Claude使用计算机完成任务。

> High-level flow of a coding agent

![编程Agent的高级流程.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ed6df7a5230a46daad7ac225f89505b6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbXdxMzAxMjM=:q75.awebp?rk3s=f64ab15b&x-expires=1755755685&x-signature=IxL9FgmPHl5KmwcuVrcAzvM0hZc%3D)

**图片流程解释** 展示的是一个 **代码类 LLM Agent** 在高层次上的工作流程（High-level flow of a coding agent），分成 **Human（人类）→ Interface（界面层）→ LLM（大语言模型）→ Environment（运行环境）** 四个参与者。

##### 1\. 四个角色的含义

- **Human**  
	最终用户，发起任务请求，比如“帮我修复某个函数的 bug”。
- **Interface**  
	人与 LLM 之间的中间层，可能是 IDE 插件、聊天界面、API 网关等。  
	它的任务是 **组织对话** 、 **维护上下文** 、 **协调 LLM 和环境的交互** 。
- **LLM**  
	负责理解需求、生成代码、做推理、分析结果等。
- **Environment**  
	真实的执行和测试环境，比如本地/远程代码库、运行时系统、文件系统、单元测试工具等。

##### 2\. 图中流程解读

###### (1) Until tasks clear（直到任务清晰）

- **Human → Interface** ：用户发起 `Query` （自然语言需求）。
- **Interface ↔ LLM** ：
	- `Clarify` （澄清）：LLM 可能会提出反问，确认细节（例如“目标文件路径是什么？”）。
	- `Refine` （细化）：Interface 把用户补充信息合并进任务描述。
- **目的** ：确保 LLM 任务输入清晰明确，避免含糊。

###### (2) Send context（发送上下文）

- Interface 把整理好的上下文（需求 + 文件结构 + 相关代码）发给 LLM。

###### (3) LLM ↔ Environment 交互

- **Search files** ：LLM 请求查看代码文件，Environment 返回路径和内容。
- **Return paths** ：Environment 把文件位置等信息传回 LLM。

###### (4) Until tests pass（直到测试通过）

这是一个循环：

1. **Write code** ：LLM 生成或修改代码，并写入环境。
2. **Status** ：Environment 把当前状态反馈给 LLM（例如文件已保存）。
3. **Test** ：Environment 运行测试用例。
4. **Results** ：测试结果返回给 LLM。
5. **如果没通过** → LLM 分析原因，继续修改 → 回到 Write code。

###### (5) Complete → Display

- 当测试全部通过，Interface 收到 LLM 的 `Complete` 信号。
- Interface 把结果展示给 Human。

##### 3\. 关键理解点

- 这是一个 **闭环迭代** ：  
	用户输入 → 澄清任务 → 生成代码 → 测试 → 修复 → 测试 → … 直到完成。
- LLM 并不是一次性生成最终代码，而是像开发者一样 **调试 + 重试** 。
- **Interface 是协调者** ，它保证 Human、LLM、Environment 三方的交互是有序的。
- **Environment 提供真实反馈** （比如测试失败信息），是 LLM 改进的依据。

### 组合和定制这些模式

这些构建块不是规范性的。它们是开发者可以塑造和组合以适应不同用例的常见模式。成功的关键，与任何LLM功能一样，是测量性能并迭代实现。再次强调：你应该 *仅* 在明显改善结果时才考虑增加复杂性。

### 总结

在 LLM 领域取得成功，关键不在于构建最复杂的系统，而在于构建 *最适合* 您需求的系统。从简单的提示开始，通过全面的评估对其进行优化，只有当更简单的解决方案无法满足需求时，才添加多步代理系统。

在实施Agent时，我们尝试遵循三个核心原则：

1. 在Agent设计中保持 **简单性** 。
2. 通过明确显示Agent的规划步骤来优先考虑 **透明度** 。
3. 通过彻底的工具 **文档和测试** 精心制作你的Agent-计算机接口(ACI)。

框架可以帮助你快速入门，但当你转向生产时，不要犹豫减少抽象层并使用基本组件构建。通过遵循这些原则，你可以创建不仅强大而且可靠、可维护并受用户信任的Agent。

#### 致谢

由Erik Schluntz和Barry Zhang撰写。这项工作借鉴了我们在Anthropic构建Agent的经验和我们客户分享的宝贵见解，我们对此深表感谢。

### 附录1：实践中的Agent

我们与客户的合作揭示了AI Agent的两个特别有前景的应用，展示了上面讨论的模式的实用价值。这两个应用都说明了Agent在需要对话和行动、有明确成功标准、启用反馈循环并整合有意义的人类监督的任务中增加最大价值。

#### A. 客户支持

客户支持将熟悉的聊天机器人界面与通过工具集成增强的功能相结合。这是更开放式Agent的自然契合，因为：

- 支持互动自然遵循对话流程，同时需要访问外部信息和行动；
- 工具可以集成以提取客户数据、订单历史和知识库文章；
- 发放退款或更新票据等行动可以程序化处理；以及
- 成功可以通过用户定义的解决方案清楚地衡量。

几家公司已经通过基于使用的定价模型展示了这种方法的可行性，该模型仅对成功解决的问题收费，显示了对其Agent有效性的信心。

#### B. 编程Agent

软件开发领域已经显示了LLM功能的巨大潜力，能力从代码补全发展到自主问题解决。Agent特别有效，因为：

- 代码解决方案可以通过自动化测试进行验证；
- Agent可以使用测试结果作为反馈来迭代解决方案；
- 问题空间定义明确且结构化；以及
- 输出质量可以客观衡量。

在我们自己的实现中，Agent现在可以仅基于pull request描述解决SWE-bench Verified基准测试中的真实GitHub问题。然而，虽然自动化测试有助于验证功能，人类审查对于确保解决方案符合更广泛的系统需求仍然至关重要。

### 附录2：为你的工具进行提示工程

无论你正在构建哪种智能体系统，工具都可能是你的Agent的重要组成部分。工具通过在我们的API中指定其确切结构和定义，使Claude能够与外部服务和API交互。当Claude响应时，如果它计划调用工具，它将在API响应中包含一个工具使用块。工具定义和规范应该获得与你的整体提示同样多的提示工程关注。在这个简短的附录中，我们描述了如何对你的工具进行提示工程。

通常有几种方法来指定相同的操作。例如，你可以通过编写diff或重写整个文件来指定文件编辑。对于结构化输出，你可以在markdown内或JSON内返回代码。在软件工程中，这些差异是表面的，可以无损地从一种转换为另一种。然而，某些格式比其他格式更难让LLM编写。编写diff需要在编写新代码之前知道块头中有多少行在更改。在JSON内编写代码（与markdown相比）需要额外转义换行符和引号。

我们对决定工具格式的建议如下：

- 给模型足够的 token 来“思考”，以免它把自己写进死胡同。
- 保持格式接近模型在互联网上自然出现的文本中所见过的格式。
- 确保没有格式上的“开销”，例如不必精确计算数千行代码的数量，或对其编写的任何代码进行字符串转义。

一个经验法则是考虑在人机界面(HCI)上投入多少精力，并计划在创建良好的 *Agent* -计算机接口(ACI)上投入同样多的精力。以下是一些关于如何做到这一点的想法：

- 站在模型的角度思考。基于描述和参数，使用这个工具是否明显，还是你需要仔细思考？如果是这样，那对模型来说可能也是如此。一个好的工具定义通常包括示例使用、边缘情况、输入格式要求和与其他工具的明确界限。
- 如何更改参数名称或描述以使事情更明显？将此视为为团队中的初级开发者编写出色的文档字符串。当使用许多相似工具时，这一点特别重要。
- 测试模型如何使用你的工具：在我们的工作台中运行许多示例输入，看模型犯了什么错误，并迭代。
- 防错你的工具。更改参数，使其更难犯错误。

本文收录于以下专栏

![cover](https://p3-juejin-sign.byteimg.com/tos-cn-i-k3u1fbpfcp/085c3622a377461591704686bc5f13cf~tplv-k3u1fbpfcp-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgbXdxMzAxMjM=:q75.awebp?rk3s=f64ab15b&x-expires=1755764868&x-signature=4n61XOTKOHX3h5Im461IKcNkcGU%3D)

人工智能学习

专栏目录

人工智能学习

1 订阅

·

12 篇文章

评论 0

暂无评论数据