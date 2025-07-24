---
title: "如何实现可验证的Agentic Workflow？MermaidFlow开启安全、稳健的智能体流程新范式"
source: "https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&chksm=85fade766f44ffcba3dee4fd353ab690a6a94dc5adc4b35604538ad48c5f99dedbea415a5761&idx=3&mid=2650981455&sn=28cc5238e694382a91af774b6ab8f3ff#rd"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-07-24
description: "该框架有望为智能体生态的持续进步提供有益参考。"
tags:
  - "智能体"
  - "工作流"
  - "可验证性"
  - "结构化"
abstract: "MermaidFlow框架通过结构化图语言提升智能体工作流的可验证性与安全性。"
---
*2025年07月24日 11:19*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/KmXPKA19gWicP6MeablrpYBo6OBPd4uibfCCicic0DjrE6ibSJNwL42GJmO0uAZs1uqSic8ibuMQRmNDDHx5ZWP4sc5Pg/640?wx_fmt=webp&from=appmsg&randomid=xa29sf7o&tp=webp&wxfrom=5&wx_lazy=1)

  

随着大语言模型技术的持续突破与火热发展，AI 智能体正从单点能力迈向复杂系统协作， 多智 能体系统 （Multi-Agent Systems, MAS） 成为学术和产业界聚焦的新前沿。在这一背景下， 「Agentic Workflow」作为面向智能体自主决策与协作流程自动生成的技术理念 ，正成为多智能体系统研究和应用的探索热点。

  

为提升智能体系统的自主化与智能化，谷歌、上海 AI Lab 等国内外领先团队陆续推出了 Meta-GPT、ADAS、AFlow 等创新性 Agentic Workflow 工作，大力推动利用大模型实现任务规划、分工协作与流程优化的自动化进程。

  

尽管这些系统能够灵活的表达工作流，但在自动化搜索工作流的过程中， 存在合理性难以保证、 可验证性 不足、 难以直观表达等突出挑战 ，严重制约了多智能体系统的可靠落地与规模化部署。

  

近日，来自 新加坡 A\*STAR 的 Centre for Frontier AI Research (CFAR) 研究所与南洋理工大学的研究团队 联合发布了创新性工作流框架 「MermaidFlow」 ，推动智能体系统迈向结构化进化与安全可验证的新范式。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWicP6MeablrpYBo6OBPd4uibf58DnibLBG2YNCBPMmslIzPbPzvPzRNQE2GydOeIFdoCuaTttDxctvyQ/640?wx_fmt=png&from=appmsg&randomid=hl6fv0f6&tp=webp&wxfrom=5&wx_lazy=1)

  

- 论文链接：https://arxiv.org/pdf/2505.22967
- GitHub 开源代码：https://github.com/chengqiArchy/MermaidFlow

  

Mermaid 破局：

让结构式工作流表达取代脚本混战

  

传统瓶颈：命令式脚本使工作流频频 「翻车」

  

在现有多智能体系统中，大模型生成的工作流往往以 Python 脚本或 JSON 树等命令式（imperative）代码直接输出，ADAS, AFlow 等主流系统也普遍采用了这种表达范式。这种低层次、混杂的生成方式，将流程规划与具体实现深度耦合，结构信息隐含在复杂代码中，直接导致了以下三大核心瓶颈：

  

- 结构不透明 ：工作流整体架构深藏在杂乱代码里，流程关系难以一目了然，协作全局难以把控。
- 合理 性难 验证 ：流程逻辑与实现细节高度耦合，缺乏静态检查和自动验证机制，容易隐藏致命漏洞。
- 调试与优化困难 ：错误往往只有在实际运行时才暴露，流程复现、问题定位和后续优化极为低效。

  

MermaidFlow: 引领结构化与可验证工作流表达

  

MermaidFlow 以 结构化图语言 Mermaid 为基础 ，提出了一种全新的工作流表达机制。不同于直接输出可执行脚本的方式，MermaidFlow 强调将智能体行为规划过程显式建模为结构化流程图谱，并引入形式化语义，确保流程清晰、可查、可验证。

  

相比传统的 Python/JSON 脚本，基于 Mermaid 的工作流表达具有以下核心特点：

  

- 图式结构清晰可见 ：每一个智能体定义、依赖关系、数据流都被结构化地表达成图中的节点与连边，使整个工作流一目了然、可交互、可审查.
- 流程验证内嵌其中 ：MermaidFlow 引入了多类语义约束（如依赖闭环、角色一致性、输入输出类型匹配等），支持静态结构验证与生成时一致性检查，避免生成不符合规则的图。
- 天然 支持演 化与调试 ：结构化工作流图更易于进行片段级替换、增量修复与版本比较，支持可控的演化式优化（见后节）。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

***图 1 MermaidFlow ：从结构化图到可验证执行的一站式工作流表达闭环 。*** *左侧部分展示了基于 Mermaid 的声明式工作流表达，结构清晰、依赖显式，具备良好的人类可读性。人们可以清晰得知道, 在* *该工作流中存在什么节点, 他们之间的连接情况是怎么样的。*

  

借助 MermaidFlow 所提出的结构化图式表达，多智能体协作的工作流规划过程不再是脆弱难控的黑盒编排，而是具备清晰结构、可视节点与可验证语义的 「白盒流程」。这种方式极大地提升了 Agentic Workflow 的可解释性、可验证性与后续演化的可操作性 ，为大规模部署打下坚实基础。

  

💡作者研究发现大语言模型对 Mermaid 语言 具备天然的生成优势。这也让 MermaidFlow 与 LLM 的结合 变得格外丝滑又强大🧠✨

  

MermaidFlow 中的安全演化策略：

工作流的自我升级之道

  

MermaidFlow 基于 Mermaid 语言 对智能体工作流进行显式建模，使每个任务节点、数据依赖与执行顺序都成为 可视、可解析、可操作的语义单元 。相比传统的命令式脚本，结构化表达更具模块化特性，支持按节点插入、删除与替换，天然适配图级别的优化操作。每一次结构调整都具备清晰的语义边界， 显著降低了修改的不确定性与调试复杂度 。

  

得益于 MermaidFlow 引入的 静态验 证 机制 （如节点类型匹配、输入输出闭环、角色一致性等约束），每一代演化生成的工作流候选都能在生成阶段就进行 结构合规性检查 ，过滤掉语义不完整或存在潜在风险的 「劣质图」。这种 「先验校验 + 后验优化」 的策略，显著提高了搜索空间的质量和鲁棒性， 避免了大量无效或不合法的探索路径 。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 2 MermaidFlow 的安全演化式优化流程概览。 本系统以结构化的 Mermaid 图表达作为工作流起点，通过安全约束的进化算法（Safety-Aware Evolutionary Programming）在类型保持（typed）、结构可感知（structure-aware）、静态可验证（static verifiable）等维度上持续优化工作流结构。

  

实验性能

  

MermaidFlow 不 再依赖具备强编程能力的大语言模型，也能生成高质量的工作 流 。在 GSM8K、MATH、HumanEval、MBPP 等多个主流任务数据集上，MermaidFlow 均展现出优秀的性能，体现出较强的实用价值。更关键的是，得益于结构化表达与静态可验证机制，MermaidFlow 在进化流程中生成 可执行且结构合理 工作流的成功率超过 90%，相比于传统基于脚本拼接的方法，极大提升了智能体系统的 可控性和鲁棒性 ，为智能体系统的 稳健部署 提供了坚实的支撑。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 3 MermaidFlow 在主流任务上的评测结果。

  

下图展示了 MermaidFlow 在结构化表示下的进化过程示例。得益于每个节点及其连接关系均具备明确的语义边界， 系统能够便捷且安全地进行局部片段的替换、重组与演化操作 （如 crossover、节点替换、连边调整等）。图中演示了系统如何通过对 Workflow 5 和 Workflow 4 进行 crossover 操作，生成结构更健壮的 Workflow 8，引入了更优的 ensemble 与 test 模块。 这一结构可控的演化机制，有效提升了工作流生成过程的安全性、可控性与可维护性。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 4 MermaidFlow 灵活的工作流进化合成过程。

  

结语

  

随着多智能体系统和大模型 AI 持续演进，如何实现 结构化、可验证 与高效进化的工作流，已成为智能体研究的重要命题。MermaidFlow 提出的结构化可验证工作流表达方式，为智能体系统实现高效、可控的协作流程提供了基础支撑。未来的 AI 协作，也许正需要这样一套 「 看得见、查得清、能进化」 的流程底座。随着应用领域的不断拓展与工程落地，这一框架有望为智能体生态的持续进步提供有益参考。

  

© THE END

转载请联系本公众号获得授权

投稿或寻求报道：liyazhou@jiqizhixin.com

继续滑动看下一个

机器之心

向上滑动看下一个