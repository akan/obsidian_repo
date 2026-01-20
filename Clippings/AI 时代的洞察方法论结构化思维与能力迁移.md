---
title: "AI 时代的洞察方法论：结构化思维与能力迁移"
source: "https://mp.weixin.qq.com/s?__biz=MjM5Mjg4NDMwMA==&chksm=bc1ac6f1359344adc7879f5a1c527f862c74368c9d6a3674a991ea15e151e0c53b8aed60c7f9&idx=1&mid=2652980158&sn=ad0fee629a90d760068c1d40dba84647#rd"
author:
  - "[[Phodal]]"
published:
created: 2026-01-20
description: "本文想分享我近期的一个真实案例，借此讨论技术分析在 AI 时代的能力迁移，以及我们究竟应该强化哪一种认知能力。"
tags:
  - "AI辅助"
  - "技术分析"
  - "能力迁移"
  - "结构化思维"
  - "隐性知识"
abstract: "本文通过对比案例阐述了在AI时代，技术分析的核心能力正从信息密集型劳动转向构建解释性模型的结构化思维。"
---
Original Phodal *2026年1月19日 22:49*

本文想分享我近期的一个真实案例，借此讨论技术分析在 AI 时代的能力迁移，以及我们究竟应该强化哪一种认知能力。

在生成式 AI 出现之前，技术洞察是一项典型的信息密集型工作。大量时间消耗在寻找信息、比对资料与整理证据，而洞察本身所占的时间反而极少。 随着 AI 能以极低成本完成信息采集与整合，技术分析的重心正发生迁移：人从“找信息的人”变成“构建模型的人”。

## 一、对比实验：一个月 vs 一天

几年前，我们为一家国内投行做数字化架构远景设计——目标是参考国外领先投行（如高盛），结合现有的软件，规划未来的演进路径。为了达到预期的 Thoughtworks DPS（数字化平台策略），我们做了大量的人肉搜索：查阅高盛的博客、年报、技术网站、技术高管访谈，甚至浏览他们的 GitHub 仓库。一个月下来，我们终于拼出一个“看上去还算完整”的全景图。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/aG1vFUMgRBD5prqnN3Q1ibmkFnEr2IF86ibwqmIm2W8dEKMbsIpHEqmxON9WN20T4ACvNlwIondKtk67lvyLUkGw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

在没有 AI 的时代，信息收集占据了整个分析过程的 3/4 时间，而真正的洞察只能在剩下的一周里慢慢整理出来。

直到最近，我偶然间下载到了几个 Thoughtworks 行业 AI Agents 的设计案例时，突然想到：如果把过去的流程交给 AI，会发生什么？我很快让 AI 开始分析，同样的目标、同样的素材，结果几乎在短短几十分钟内就完成了大部分信息整合——果然不出我所料，底层重复性的工作可以完全自动化， 而我可以将精力放在更高阶的思考上。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/aG1vFUMgRBD5prqnN3Q1ibmkFnEr2IF864wNeF9wF9jVIPn2MhMOhB6jv55jspjpyxgibib6hficmMXOOfCtuadFHA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

从那一刻起，我开始重新思考——在 AI 时代，技术人的核心能力究竟是什么？为了验证 AI 在技术分析中的效率，我尝试用 Notebook LLM 做一次“一天的示例”。我给它的 prompt 是：

> 高盛的数字化进化路径，比如各类遗留系统 SecDB 等。除了官方的内容，还可以从相关博客、GitHub、JD 等来辅助分析。

不到 10 分钟，Notebook LLM 就生成了完整的演进路径概览：

- 1.0 时代（1990s-2010）： 以 SecDB 和 Slang 为核心的单体架构时代。这一时期，技术被视为最高机密，其价值在于为内部交易员提供超越市场的信息不对称优势，尤其是实时的全行风险聚合能力。
- 2.0 时代（2010-2020）： 平台化与外部化时代。随着监管收紧与电子交易的普及，单纯的内部速度优势边际递减。高盛推出了 Marquee，将内部核心能力（数据、定价模型）封装为API对外出售，开启了“高盛即服务”（Goldman as a Service）的商业模式。
- 3.0 时代（2020至今）： 生态化与云原生时代。面对数据孤岛与基础设施僵化的问题，高盛通过 Legend (Alloy) 项目重构数据治理，并将其开源以通过 FINOS 制定行业标准；同时与 AWS 深度结盟，通过 FastTrack 平台实现大规模上云，试图在算力与数据层面构建新的行业基础设施。

表面看这很轻松，但它背后包含大量细节比对与证据链对齐工作——这些恰恰在过去极为耗时。当年如果我们需要四周，现在 AI 在不到一天的时间里完成了基础信息整合， 而人则可以将时间用于建模、假设与推理。然而这件事更重要的启发是：技术分析的工作结构已经变了。

AI 并没有让“洞察”变得廉价，它只是让 **显性知识变得廉价** 。

## 结构化建模 —— 仍然是技术分析的底层核心能力

过去我们在分析高盛时，就有一个先验认知：未来银行一定会走向“现代数字化业务（MDB）”模式，即： 低摩擦运营、企业级平台战略、数字化产品能力、智能驱动的决策机制、科技驱动文化这是我们的起始模型：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/aG1vFUMgRBD5prqnN3Q1ibmkFnEr2IF86AFfpozA7gx3fxrdOlQ9SunZejENSxD2Gtxx0dEtr5ialzSQL7HS2KzQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

但随着分析的深入、信息的沉积与假设的迭代，我们进行了多次框架调整，最终我们构建了一个更贴合金融行业的 TARGET 模型：

- 数字化运营：流程线上化与自动化，形成自助式服务与低摩擦交付
- 平台战略与架构演进：金融科技与业务战略耦合的演进路径
- 体验产品化能力：打造全渠道的数字化客户体验
- 智能驱动决策机制：利用金融工程与 AI 进行决策增强
- 自主可信基础设施：缩短从“创意 → 可用软件”的周期

但是，它给了我们一个很好的出发点，基于一个原型出发来思考 全貌的可能样子，再结合新获取的知识，不断调整现有的模型。如下是一个使用 Microsoft Office Agent 生成的 Thoughtworks FOREST 架构示例：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/aG1vFUMgRBD5prqnN3Q1ibmkFnEr2IF86yqg2YJduFZeOhE39WjWWEgKyrMb4nJm26GMKvF4Oy7dwwAsVO2NKMw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

关键在于：

> AI 可以加速“知识铺垫”，但模型切换仍需人类进行。

建模仍然是洞察的主战场。

## 案例深挖：从 SecDB 到 Athena，再到“今天其实可以复制它”

早期，在我们高盛的一个分支场景时，即我们客户特别关注于 SecDB 的构建，基于《One VM to Rule Them All? Lessons Learned with Truffle and Graal》 我们大概构建了一个原始的材料，其中做了一部分小结：

> 高盛开发了 30 年之久的 SecDB，包含了 ~ 1.5 亿行代码 Slang，~350 种数据类型，以及 ~10000 个内置函数。但是，缺乏现代化的 IDE 支持，而且不支持调试功能。 高盛使用 GraalVM 来克服在其内部 Slang 编程语言中使用复杂动态类型系统、与 C 原生函数交互以及尝试改进其现有应用程序的挑战。其使用 GraalVM 语言实现框架允许 GraalVM 为 Slang 生成优化编译器，用于其关键的定价和风险应用程序。

但是，为什么类似的功能不能换种实现呢？

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/aG1vFUMgRBD5prqnN3Q1ibmkFnEr2IF861d3ogB204ZRHMdh4oeV2PSqpGWoH8VAyc3icuz4vDQNk5xU7HINrZoA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

在今天已经有非常多的方式能替换，比如：Jupyter + Python 提供可交互平台。所以，只需要业内的其它公司， 比如：美银证券 Quartz、摩根大通 Athena（在 2018 年就有 35M 的 Python 代码） 采用的是类似的方式。相似的方式，DeepResearch 可以非常快的完成：

> 你所描述的这类平台在金融科技（FinTech）领域通常被称为 “集成式跨资产风险与交易平台” (Integrated Cross-Asset Risk and Trading Platforms)， 在行业内部，它们也常被形象地称为 “单体式全栈金融生态系统”。高盛的 SecDB、美银的 Quartz 和大摩的 Athena 是这一领域的“三剑客”。

这类平台不仅仅是一个“数据库”或“开发工具”，而是一个三位一体的架构：

- 统一的对象数据库 (Object Database)： 所有的交易数据、市场行情、定价模型、风险指标都被视为“对象”。
- 全局依赖图引擎 (Dependency Graph/DAG)： 这是其灵魂。当一个市场价格改变时，系统会自动推导并重新计算所有受影响的风险值（类似 Excel 的自动刷新，但在全球尺度上运行）。
- 高度集成的开发环境： 代码（Slang 或 Python）与数据紧密耦合。开发者修改一行定价逻辑，几乎可以瞬间推送到全球的交易员终端。

过去实现它极其困难，而今天的生态让这件事变得可能：

✔ Notebook（Jupyter/Python）成事实标准 ✔ WebGPU 可视化成熟 ✔ DAG / Streaming 工具成熟 ✔ 算法库成熟 ✔ 金融工程生态成熟 ✔ 数据治理方法论成熟（Data Mesh）

我们终于可以回答那句关键话：

> 今天实现一个 Athena 或 SecDB 的最小原型已经不再困难。

## 隐性知识的推理与验证：Data Mesh 原型作为例子

当我们开始进一步拆解 SecDB 类平台时，我们发现：

> 要理解这类系统，关键是理解它们的“数据层是什么”。

因此我们又对 J.P. Morgan 开源的可视化工具 Perspective 进行了拆解。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/aG1vFUMgRBD5prqnN3Q1ibmkFnEr2IF86CK7vjxYKgYaAShyDSSYiciaOBJGPx3uh9bqSFE3RkdqKJJdsbmyovmFA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

交互层：可视化工具 Perspective 分析

为了分析如何实现这样的工具，在没有生成式 AI 的时代，只能自己分析，比如有哪些底层 C++ 库、数据类型 + 高性能库？UI 交互的实现等等？尽管， 我只是从代码库的依赖信息业构建全景，但是依然花费了大量的时间。如此一来，我们就可以回到最初构建的原型图，并推理出整个系统的原始结构：

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

过去这种分析需要大量时间，今天我们可以让 AI 建出原型并引导我们验证缺口。

### AI 构建原型，寻找验证缺少的线索

在这个示例里，它呈现的是一个 Data Mesh 架构。在过去，我们去构建这样一个数据原型成本巨高，特别是数据领域有大量的工具，操作型数据、流式数据、 CD4ML、数据质量、数据目录等等。尽管，Data Mesh 是起源于 Thoughtworks（由首席技术顾问 Zhamak Dehghani 提出），但是我有限的数据治理经验， 我还是需要构建一个原来来学习。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

所以，我们只需要简单的：

> 如何使用开源基础设施构建一个 data mesh 架构？

然后，让 Cursor + Opus 4.5 构建了一个简单的原型，然后让 Cursor 操作浏览器来让你看看每个工具应该如何使用。进而，我发现对于其中的流式数据， 还是可以进一步展开研究的。

## 结语：洞察正从信息密集转向模型密集

在这一轮能力迁移中，AI 并没有替代洞察本身，而是替代了洞察的前置劳动。真正发生变化的是：洞察的约束从“信息不足”变成了“模型不足”。

过去，我们的瓶颈是找不到材料、无法建立证据链、无法有效比对不同实践；今天，这些环节的成本接近零。真正难的反而变成：如何构建解释世界的结构、 如何提出更有力量的问题、如何用假设与原型验证隐性知识。

  

[Read more](https://mp.weixin.qq.com/)

继续滑动看下一个

phodal

向上滑动看下一个