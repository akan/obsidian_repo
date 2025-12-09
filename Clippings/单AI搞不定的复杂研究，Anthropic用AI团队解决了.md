---
title: "单 AI 搞不定的复杂研究，Anthropic 用 “AI 团队(Multi Agent 研究系统)” 解决了！"
source: "https://mp.weixin.qq.com/s/7TjZ6QZFTchrI8tJg-CpsA"
author:
  - "[[TommyYang]]"
published:
created: 2025-12-09
description: "Anthropic系列文章精读 Anthropic 上下文工程：智能体时代的 “注意力钱包” 管理指南细思极恐"
tags:
  - "多代理系统"
  - "并行处理"
  - "架构解密"
  - "提示工程"
  - "评估体系"
  - "生产挑战"
abstract: "Anthropic的多代理研究系统通过Orchestrator-Worker模式，让多个AI代理分工协作，突破了单AI在复杂研究任务中的能力边界。"
---
Original TommyYang *2025年12月8日 08:08*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/B2ib2Zr2e3bia2QCA0l7FKcPY2SEwkYsBxlrFQHFfmPDiayQuia13JMibrjYHPwZhKVpGfXM2EPKE0UdlMLN3u8KkPQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

---

Anthropic 系列文章

[精读 Anthropic 上下文工程：智能体时代的 “注意力钱包” 管理指南](https://mp.weixin.qq.com/s?__biz=MzI3NjUwNDg4Mg==&mid=2247484779&idx=1&sn=90de53c9644b82fdecc1aead0e286ce6&scene=21#wechat_redirect)

[细思极恐！Anthropic实锤：为了“刷分”，AI不仅学会了撒谎，还试图干掉监督者](https://mp.weixin.qq.com/s?__biz=MzI3NjUwNDg4Mg==&mid=2247485165&idx=1&sn=35b43e6c786dc5dcbfc649a3ea954927&scene=21#wechat_redirect)

[从 “函数调用” 到 “智能编排”：Anthropic 高级工具使用功能如何重新定义 AI agents 的边界](https://mp.weixin.qq.com/s?__biz=MzI3NjUwNDg4Mg==&mid=2247485190&idx=1&sn=7430a2c339e2e93ecf6d0d2f27004228&scene=21#wechat_redirect)

[当 AI 开始「轮班工作」：Anthropic 教它写好「程序员的交接手册」](https://mp.weixin.qq.com/s?__biz=MzI3NjUwNDg4Mg==&mid=2247485297&idx=1&sn=a4406cf7b609d7c285c1f9c6b8fbdd0c&scene=21#wechat_redirect)

---

  

## 引言：解密Anthropic多代理研究系统，如何用“集体智慧”突破单AI的能力边界？

在AI研究的前沿战场， **开放-ended任务** （如“分析2025年AI代理公司的竞争格局”“梳理S&P 500科技企业的董事会成员”）正在成为新的挑战。这类任务的核心难点在于： **动态性** （研究路径随发现调整）、 **路径依赖** （每一步的选择影响后续方向）、 **信息过载** （需要处理远超单AI context窗口的内容）。当单代理AI（如Claude Opus 4）在这些任务中陷入“速度慢、覆盖窄、token不够用”的困境时，Anthropic给出了一个颠覆性的答案—— **多代理研究系统** （Multi-Agent Research System）。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/B2ib2Zr2e3bia2QCA0l7FKcPY2SEwkYsBxyvaRmDHfrbpmZIfmNTHhNP3suoIwXPSLBM6gqj0icib9r0oCd4DnYBkQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

## 一、为什么需要多代理？单AI的“能力天花板”在哪里？

在讨论多代理系统的优势前，我们需要先理解单代理AI在复杂研究任务中的局限性：

1. **token限制** ：即使是Claude 3.7这样的长context模型，也无法处理“同时探索10个数据源并整合结论”的任务——单context窗口的token容量根本不够。
2. **速度瓶颈** ：单代理只能串行执行工具调用（比如先搜A源，再搜B源），对于需要并行探索的任务（如“同时分析5家AI公司的产品路线图”），速度会慢到不可用。
3. **覆盖广度不足** ：单代理的“路径依赖”会导致它陷入某个方向无法自拔（比如过度关注某篇博客，忽略其他重要来源），无法像人类专家那样“同时看多个方向”。

而多代理系统的出现，正是为了突破这些局限。Anthropic的内部测试显示： **多代理系统（Claude Opus 4作为lead agent + Claude Sonnet 4作为subagents）在研究任务中的性能比单代理Opus 4高90.2%** 。这个数据背后，是多代理系统的三大核心优势：

## 1\. 并行处理：用“集体分工”消灭时间瓶颈

人类专家做研究时，会让团队成员 **并行探索不同方向** （比如A负责查公司财报，B负责搜行业报告，C负责采访专家）。多代理系统完全复制了这一逻辑：

- **Lead Agent** （协调者）会将复杂任务分解为多个子任务，同时启动3-5个Subagents（执行者）；
- **Subagents** 会并行调用3+工具（比如同时搜web、Google Workspace、Slack）。

这种“双层并行”直接将复杂任务的处理时间 **缩短了90%** ——比如原本需要2小时的“AI公司竞争格局分析”，现在只需12分钟就能完成。

## 2\. token扩展：用“多context窗口”解决信息过载

单代理的context窗口是“固定的容器”，而多代理系统的context窗口是“分布式的水池”：每个Subagent都有独立的context窗口，Lead Agent则负责将这些窗口的内容整合。这种设计的核心价值在于： **总token处理能力是单代理的N倍** （N为subagents数量）。

Anthropic的BrowseComp评估（测试AI浏览工具的信息定位能力）验证了这一点： **token使用量本身解释了80%的性能差异** 。多代理系统通过“分布式context窗口”，让总token使用量比单代理高15倍，从而能处理更复杂的任务（比如“整合100篇论文的核心观点”）。

## 3\. 性能提升：用“专业分工”突破能力边界

多代理系统的性能提升，本质是 **“集体智慧”对“个体高智商”的胜利** ：

- **Subagents的“专业分工”** ：每个Subagent都有明确的任务边界（比如“只查2025年AI公司的融资情况”），避免了单代理的“任务漂移”；
- **Lead Agent的“全局协调”** ：Lead Agent会评估Subagents的结果，补充遗漏的方向（比如“你漏了这家未公开融资的AI startup”）；
- **模型效率的乘法效应** ：升级到Claude Sonnet 4后，Subagents的token使用效率比Sonnet 3.7高2倍——这意味着，多代理系统能以更低的token成本完成更复杂的任务。

当然，多代理系统也有局限性： **token成本高** 。因此，它更适合 **高价值任务** （比如商业策略研究、学术文献整合），而非简单的事实查询。

## 二、架构解密：Orchestrator-Worker模式，让代理“像团队一样协作”

Anthropic的多代理研究系统采用了经典的 **Orchestrator-Worker模式** （协调者-执行者模式），核心组件是两个角色： **Lead Agent** （协调者）和 **Subagents** （执行者）。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 1\. Lead Agent：研究任务的“总指挥官”

Lead Agent是整个系统的“大脑”，它的核心功能是 **规划、分解、协调** ：

- **任务规划** ：收到用户查询后，Lead Agent会用 **Extended Thinking模式** （扩展思考）输出“思考过程”（比如“这个任务需要查融资、产品、客户三个方向，所以需要3个Subagents”）；
- **任务分解** ：将复杂任务拆分为“小而明确”的子任务（比如“列出2025年融资超过1亿美元的AI代理公司”），并给每个Subagent写“任务说明书”（包含目标、输出格式、工具限制、边界条件）；
- **进度协调** ：等待Subagents完成任务后，整合它们的结果，判断是否需要“补漏”（比如“漏了这家未公开融资的公司，需要再启动一个Subagent”）；
- **记忆管理** ：将研究计划、子任务定义等关键信息存储到 **外部记忆系统** ，避免因context溢出而丢失。

## 2\. Subagents：研究任务的“执行特种兵”

Subagents是“行动派”，它们的核心功能是 **并行搜索、自适应调整、结果反馈** ：

- **并行工具调用** ：每个Subagent会同时调用3+工具（比如web搜索、Crunchbase、Slack），快速获取多源信息；
- **自适应调整** ：Subagents会用 **Interleaved Thinking模式** （交错思考）——在工具调用后，输出“思考过程”（比如“这个结果是2024年的，需要再搜2025年的最新信息”），然后调整下一次的搜索策略；
- **结果反馈** ：Subagents将整理后的结果（比如“2025年AI公司融资列表”）返回给Lead Agent，由Lead Agent整合为最终结论。

## 3\. 与传统RAG的本质区别：动态检索vs静态检索

传统RAG的逻辑是“一次性检索”（给定查询→检索文档→生成答案），无法根据新发现调整策略。而多代理系统是“动态检索”： **根据每一步的发现调整研究路径** ，比如：

**第一步：** 用“宽查询”（比如“2025年AI代理公司”）探索整体 landscape；

**第二步：** 根据结果，用“窄查询”（比如“2025年融资超过1亿美元的AI代理公司”）深入；

**第三步：** 如果发现漏了某个方向（比如“未公开融资的AI startup”），再启动新的Subagents补充。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 三、提示工程：让代理“像专家一样思考”的底层逻辑

多代理系统的性能， **70%取决于提示工程** 。Anthropic的工程师们将人类专家的研究策略“编码”到代理的提示中，最终让代理学会“像专家一样思考”。以下是几个关键技巧：

## 1\. 教Lead Agent“如何 delegation”：避免“任务漂移”

早期的Lead Agent给Subagents的任务描述太模糊（比如“研究AI代理公司”），导致Subagents重复工作或遗漏关键方向。Anthropic的解决方法是： **在提示中明确“delegation的规则”** ——要求Lead Agent给每个Subagent写“任务说明书”，包含：

- 目标（比如“找出2025年融资超过1亿美元的AI代理公司”）；
- 输出格式（比如“列表形式，包含公司名、融资额、投资方”）；
- 工具限制（比如“只能用web搜索和Crunchbase”）；
- 边界条件（比如“排除2024年及之前融资的公司”）。

这个调整直接解决了“任务漂移”问题——重复工作减少了60%，遗漏率降低了50%。

## 2\. 引导“思考过程”：用“可见的 scratchpad”提升推理能力

人类专家做研究时，会用草稿纸写“思考过程”（比如“这个数据有问题，因为来源是小网站”）。Anthropic将这一习惯“移植”到代理中，引入了 **Extended Thinking模式** ：

- Lead Agent在规划时，必须输出“思考过程”（比如“这个任务需要3个Subagents，因为要查融资、产品、客户三个方向”）；
- Subagents在工具调用后，必须输出“思考过程”（比如“这个结果是2024年的，需要再搜2025年的”）。

测试显示， **Extended Thinking模式让代理的instruction-following能力提升了40%，推理效率提升了30%** 。

## 3\. “从宽到窄”的搜索策略：模仿人类专家的研究路径

单代理AI的常见错误是“默认用长而具体的查询”（比如“2025年融资超过1亿美元的AI代理公司”），导致搜索结果太少。Anthropic在提示中强制代理遵循“先宽后窄”的策略： **“先使用短、宽的查询（比如‘2025年AI代理公司’），评估结果后再逐步缩小范围”** 。

这个调整让Subagents的搜索结果数量增加了3倍，遗漏的关键信息减少了70%。

## 4\. 让代理“自我改进”：用Claude 4优化prompt和工具描述

Anthropic的工程师发现： **Claude 4本身就是优秀的prompt工程师** 。当给Claude 4一个“失败的代理prompt”（比如“Subagents经常漏查未公开融资的公司”），它能诊断出问题（比如“prompt中没有提到‘未公开融资’的条件”）并生成改进后的prompt。

更激进的是，Anthropic打造了一个 **工具测试代理** ：当给它一个“有缺陷的工具描述”（比如“这个工具能查公司融资，但没说只能查公开数据”），它会尝试用这个工具，然后自动修改描述（比如“这个工具能查 **公开的** 公司融资数据”）。

这个流程让工具描述的错误率降低了40%，Subagents的任务完成时间缩短了40%。

## 四、评估体系：如何衡量多代理系统的“靠谱性”？

多代理系统的评估是个“世界级难题”： **即使输入相同，代理也可能走完全不同的路径，但最终都能得到正确结果** 。Anthropic设计了一套 **“结果导向+多维度验证”** 的评估体系：

## 1\. LLM-as-Judge：用AI评估AI的结果

Anthropic用Claude 4作为“评估法官”，给每个代理的输出打分，评分标准是 **五维度 rubric** ：

- **factual accuracy** （事实准确性：结论是否与来源一致？）；
- **citation accuracy** （引用准确性：引用的来源是否支持结论？）；
- **completeness** （完整性：是否覆盖了所有要求的方向？）；
- **source quality** （来源质量：是否用了权威来源而非内容农场？）；
- **tool efficiency** （工具效率：是否用了正确的工具，且调用次数合理？）。

LLM-as-Judge的优势在于 **scalable** ——能快速评估数百个代理输出，且评分一致性比人类高（人类评委的方差是0.15，LLM评委是0.08）。

## 2\. 人类评估：抓住AI漏判的“edge cases”

LLM-as-Judge会漏判“边缘情况”（比如“代理引用了假网站的信息”），因此Anthropic会让人类测试者定期评估代理输出，重点检查：

- **幻觉** （比如“代理声称某公司融资1亿美元，但实际没有”）；
- **来源偏见** （比如“代理只引用SEO优化的内容农场”）；
- **系统故障** （比如“代理无限循环调用工具”）。

人类评估的价值在于 **发现AI看不到的问题** ——比如早期测试中，人类发现代理“偏爱内容农场”，Anthropic随即在提示中加入“优先使用权威来源”的规则，解决了这个问题。

## 3\. 端状态评估：关注“最终结果”而非“中间步骤”

对于“多turn状态变化”的任务（比如“逐步修改研究报告”），Anthropic采用 **端状态评估** ： **不判断代理的每一步是否正确，只判断最终结果是否符合要求** 。

比如，对于“修改研究报告”的任务，评估标准是：“最终报告是否包含所有要求的信息？是否没有事实错误？是否格式正确？”——至于代理是“修改了3次”还是“修改了10次”，并不重要。

## 五、生产挑战：从“原型”到“可靠系统”的最后一公里

多代理系统的原型很容易做，但要做成 **可靠的生产系统** ，需要解决一系列“工程级问题”：

## 1\. 状态管理：避免“一步错，步步错”

多代理系统的状态是“链式依赖”的——Lead Agent的规划错误，会导致Subagents的结果错误。Anthropic的解决方法是：

- **Checkpoints** ：在关键步骤（比如Lead Agent完成规划、Subagents返回结果）保存系统状态；
- **重试逻辑** ：如果某个Subagent失败（比如工具调用超时），自动重试，且Lead Agent会调整任务；
- **外部记忆** ：将所有状态信息存储到外部数据库，避免因context溢出而丢失。

## 2\. 调试：解决“非确定性”的难题

多代理系统的“非确定性”（相同输入可能产生不同输出），让调试变得异常困难。Anthropic的解决方法是 **全链路追踪** ：记录每个代理的每一步操作（比如“Lead Agent规划了3个Subagents”“Subagent 1调用了web搜索”），并将这些信息可视化。

通过全链路追踪，工程师能快速定位问题（比如“Subagent 1的查询漏了‘orchestration’关键词，所以没查到X公司”），然后调整prompt或工具描述。

## 3\. 部署：避免“更新代码导致运行中代理崩溃”

多代理系统是“持续运行的”——比如某个代理可能正在处理一个“需要2小时的任务”，此时更新代码会导致代理崩溃。Anthropic的解决方法是 **rainbow deployments** （彩虹部署）：

- 同时运行“旧版本”和“新版本”的系统；
- 逐步将流量从旧版本转移到新版本（比如第一天转移10%，第二天转移20%）；
- 对于运行中的代理，继续用旧版本直到任务完成，新任务用新版本。

这个策略让崩溃率从20%降低到了1%。

## 六、多代理系统的未来：从“可行”到“普惠”

Anthropic的多代理研究系统已经在生产环境中验证了价值：用户用它 **发现了未被注意的商业机会** （比如“某AI公司的产品路线图与客户需求 mismatch”）、 **解决了复杂的技术问题** （比如“梳理开源AI框架的依赖关系”）、 **节省了数天的工作时间** （比如“整合100篇学术论文的核心观点”）。

但多代理系统的潜力远不止于此。Anthropic的工程师们已经在探索 **异步执行** （Asynchronous Execution）——让Lead Agent和Subagents同时工作，无需等待对方完成。比如，Lead Agent可以在Subagents工作时，提前规划下一轮的任务；Subagents可以在完成部分结果后，立即将信息反馈给Lead Agent。

异步执行的价值在于 **进一步提升并行效率** ——比如，原本需要2小时的任务，可能只需30分钟就能完成。但它也带来了新的挑战： **结果协调** （如何整合来自不同Subagents的部分结果）、 **状态一致性** （如何确保Lead Agent和Subagents的状态同步）。

## 七、结论：多代理系统是AI研究的“未来范式”

Anthropic的多代理研究系统，本质上是“集体智慧”在AI领域的落地。它没有追求“更聪明的单代理”，而是转向“更高效的团队协作”——用Lead Agent的“全局视野”和Subagents的“专业执行”，突破了单代理的能力边界。

对于AI行业来说，这个系统的意义在于： **它证明了多代理系统不仅“可行”，而且“可靠”** 。当我们面对越来越复杂的任务时，“多代理协作”将成为新的主流——就像人类社会从“个体捕猎”转向“集体农耕”一样，AI也将从“单代理作战”转向“多代理协作”。

## 参考

博文地址： **https://www.anthropic.com/engineering/multi-agent-research-system**

---

**Anthropic** 系列文章

[精读 Anthropic 上下文工程：智能体时代的 “注意力钱包” 管理指南](https://mp.weixin.qq.com/s?__biz=MzI3NjUwNDg4Mg==&mid=2247484779&idx=1&sn=90de53c9644b82fdecc1aead0e286ce6&scene=21#wechat_redirect)

[细思极恐！Anthropic实锤：为了“刷分”，AI不仅学会了撒谎，还试图干掉监督者](https://mp.weixin.qq.com/s?__biz=MzI3NjUwNDg4Mg==&mid=2247485165&idx=1&sn=35b43e6c786dc5dcbfc649a3ea954927&scene=21#wechat_redirect)

[从 “函数调用” 到 “智能编排”：Anthropic 高级工具使用功能如何重新定义 AI agents 的边界](https://mp.weixin.qq.com/s?__biz=MzI3NjUwNDg4Mg==&mid=2247485190&idx=1&sn=7430a2c339e2e93ecf6d0d2f27004228&scene=21#wechat_redirect)

[当 AI 开始「轮班工作」：Anthropic 教它写好「程序员的交接手册」](https://mp.weixin.qq.com/s?__biz=MzI3NjUwNDg4Mg==&mid=2247485297&idx=1&sn=a4406cf7b609d7c285c1f9c6b8fbdd0c&scene=21#wechat_redirect)

---

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

您的鼓励是我坚持的动力

收录于 大模型-上下文工程前沿知识分析

继续滑动看下一个

Tommy学习录

向上滑动看下一个