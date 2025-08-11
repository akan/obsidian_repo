---
title: "Claude 发布审计工具 claude-code-security-review，AI 代码审计时代来临？"
source: "https://mp.weixin.qq.com/s/_hSn7KRyxmlQeuVT4U_K0Q?mpshare=1&scene=1&srcid=0809KjtXv6xDU66KTx2tnazV&sharer_shareinfo=23153b228d05332538bf71932de41051&sharer_shareinfo_first=23153b228d05332538bf71932de41051&version=4.1.39.91079&platform=mac#rd"
author:
  - "[[龙猫]]"
published:
created: 2025-08-11
description: "Anthropic 公司发布了基于 Claude 的代码审计工具 claude-code-security-review，为代码安全引入了新的可能"
tags:
  - "代码审计"
  - "AI安全"
  - "Claude工具"
abstract: "Anthropic公司发布了基于Claude的代码审计工具claude-code-security-review，为代码安全引入了新的可能。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/jDxr6RVaB7v0jBRjLoibZJRuIsUiafxQ1l71FcgP1BGbEt1W7aFCVNo08vLXEprZKj2QFUjUtia36BVIZ2C8CNV2g/0?wx_fmt=jpeg)

Original 龙猫 [星尘安全](https://mp.weixin.qq.com/s/) *2025年08月08日 10:00*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/qTcIBaTRMWdjcGWCVUAKtpd05lBUJo0eJ4bg9ujlbhoFeMUcSBFia6tzfs0GPK3RRcLC8vysusEFvqicJ0VGicMtA/640?tp=webp&wxfrom=5&wx_lazy=1)

点击上方 蓝字 关注我们

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/jDxr6RVaB7v0jBRjLoibZJRuIsUiafxQ1lRky24IgmcObv6COBntyvNP2hm8iblrM0bZsbiaaEp7ib2Cb9GBSZKSukw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

随着软件应用的日益复杂， 代码安全的重要性不言而喻 ，相关漏洞引发的严重安全问题，往往会给用户带来巨大的经济损失，就在星尘安全的前几天的文章中，我们就刚好提到了AI时代代码层面的相关风险。

传统的代码审计方法往往依赖人工审查或固定规则匹配，不仅耗时费力，而且容易受到人为因素的影响，导致漏洞难以被及时发现和修复，正是在这样的背景下，就在8月7日，Anthropic 公司发布了基于 Claude 的代码审计工具 claude-code-security-review ，为代码安全引入了新的可能。

**01  
**

**功能与特点  
**

claude-code-security-review是一款专为 GitHub 设计的 AI 驱动的安全审查工具，旨在通过 Claude 强大的语言理解能力，对代码变更进行深度分析，检测其中潜在的安全漏洞。这款工具具备一系列令人瞩目的功能。

1\. 智能语义分析

该工具利用 Claude 的先进推理能力，实现了对代码的智能语义分析。它不仅仅停留在代码 的表面模式匹配，而是深入理解代码的深 层语义。例如，在检测 SQL 注入漏洞时，它能够理解代码中数据库查询语句的意图和上下文，判断是否存在用户输入未经过适当过滤就直接拼接到查询语句中的风险，从而准确识别出潜在的 SQL 注入漏洞，大大提高了漏洞检测的准确性。

2\. 差异感知扫描

对于拉取请求（PR），该工具具备差异感知扫描功能。它仅对变更的文件进行分析，这一特性在处理大型项目时尤为重要。在一个拥有数千个文件的大型代码库中，每次 PR 可能只涉及少数几个文件的修改。Claude 代码审计工具能够快速定位这些变更，有针对性地进行安全审查，大大提高了审计效率，减少了不必要的计算资源浪费。

3\. 自动评论与详细反馈

当发现安全问题时，工具会自动在 PR 上发表评论，详细说明问题所在、问题的严重性以及提供相应的修复建议。在检测到一段代码存在缓冲区溢出风险时，工具会在评论中指出具体的代码行，并解释为什么这部分代码可能导致缓冲区溢出，同时给出如增加边界检查等修复建议，帮助开发人员快速理解和解决问题。

4\. 语言无关性

无论是 Python、Java、C++ 还是其他编程语言，Claude 代码审计工具都能应对自如。它不依赖于特定编程语言的语法规则，而是从代码的语义层面进行分析，这使得它在多语言混合开发的项目中具有极大的优势，能够全面保障项目的代码安全。

5\. 高效的误报过滤

通过先进的过滤机制，工具能够有效减少误报，将重点聚焦于真正的安全漏洞。在检测到一段代码似乎存在风险，但在特定业务逻辑下是合理的情况时，工具能够通过对上下文的深入理解，准确判断其并非真正的漏洞，避免了开发人员被大量误报信息干扰，提高了审计的精准性和效率。

**02  
**

**工具的工作原理与架构  
**

1\. 架构解析

claudecode目录下包含了多个关键组件。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/jDxr6RVaB7v0jBRjLoibZJRuIsUiafxQ1lSWXywFPkGfsIk2k1783wTKYGLtOWYic5H5BbKibRuoAiaiaJ04bxrqLV7Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

github\_action\_audit.py是主审计脚本，负责与 GitHub 的交互以及整个审计流程的协调。  

prompts.py中存储着安全审计提示模板，这些模板为 Claude 提供了针对不同类型安全问题的分析指引。

findings\_filter.py实现了误报过滤逻辑，通过对检测结果的二次筛选，去除那些看似有风险但实际并非漏洞的报告。

claude\_api\_client.py则负责与 Claude API 进行通信，确保工具能够充分利用 Claude 的强大语言处理能力。

json\_parser.py提供了健壮的 JSON 解析功能，用于处理审计过程中产生的各种数据格式。

test\_\*.py包含了测试套件，用于确保工具的稳定性和准确性，evals/目录则提供了评估工具，可用于对任意 PR 进行测试。

  

2\. 工作流程

当一个 PR 被打开时，工具的工作流程随即启动。首先，Claude 会对 PR 中的代码变更进行分析，理解代码的修改内容。在这个过程中，它会深入审查代码变更的上下文，分析代码的意图和潜在的安全影响。根据分析结果，Claude 会识别出可能存在的安全问题，并为每个问题生成详细的解释、严重性评级以及修复建议。在发现一段代码存在权限提升风险时，Claude 会详细说明代码是如何绕过正常的权限验证机制的，将该问题评定为高严重性，并提供修改权限验证逻辑的具体修复建议。接着，工具会通过其先进的误报过滤机制，对检测结果进行筛选，去除那些低影响或容易被误判为漏洞的结果。最后，将经过筛选的安全发现作为评论发布在 PR 的相应代码行上，以便开发人员及时查看和处理。

**03  
**

**优势与创新  
**

1\. 超越传统 SAST 的优势

与传统的静态应用程序安全测试（SAST）工具相比，Claude 代码审计工具具有显著的优势。传统 SAST 工具主要基于规则和模式匹配，对于复杂的代码逻辑和上下文理解能力有限，容易产生大量误报。而 Claude 代码审计工具凭借其对代码语义和意图的深入理解，能够更准确地判断代码是否存在安全风险，大大降低了误报率。在检测一段涉及复杂业务逻辑的代码时，传统 SAST 工具可能会因为代码结构不符合常规模式而误报为存在漏洞，而 Claude 代码审计工具能够理解业务逻辑，准确判断代码的安全性。此外，Claude 代码审计工具提供的详细解释和修复建议，也使得开发人员更容易理解和解决问题，提高了代码修复的效率。

2\. AI 代码审计的创新

此外，Claude 代码审计工具也展现出了诸多创新之处。它的多语言支持能力打破了语言障碍，使得不同编程语言编写的代码都能得到有效的安全审查。在一个包含 Python 后端、JavaScript 前端以及 Java 移动端代码的大型项目中，Claude 代码审计工具能够对各个部分的代码进行整体的逻辑感知与安全审计，确保整个项目的代码安全。此外，其差异感知扫描功能和自动评论机制，更是将 AI 技术与代码审查流程紧密结合，极大地提高了审计的效率和自动化程度，为 AI 代码审计的发展树立了新的标杆。

**04  
**

**机遇与挑战  
**

Claude 代码审计工具的发布，无疑为 AI 代码审计时代的到来增添了强劲动力。对于企业来说，这意味着能够更高效地保障软件产品的安全性，降低因代码漏洞导致的安全风险和经济损失。对于开发者而言，AI 代码审计工具提供了即时反馈，帮助他们更快地发现和纠正代码中的问题，提升代码质量。

但需要提醒的是，尽管 AI 技术在不断进步，但目前的工具在面对一些复杂的业务逻辑和新型攻击手段时，可能仍存在检测盲点。比如在一些涉及区块链智能合约的复杂业务逻辑中，AI 代码审计工具可能难以准确判断某些潜在的安全风险。此外，AI 代码审计工具生成的结果可能存在一定的误判，如何进一步提高工具的准确性和可靠性，是需要解决的重要问题。同时，随着 AI 代码审计工具的广泛应用，也引发了一些关于数据隐私和安全的担忧，如何在保障工具有效运行的同时，确保代码数据的安全和隐私，也是亟待解决的挑战。

尽管仍有困难，但随着技术的不断进步和完善，AI 代码审计工具必将在未来的软件开发中发挥越来越重要的作用，我们有理由相信，在不久的将来，AI 代码审计将成为软件开发流程中不可或缺的一部分。

项目地址

https://github.com/anthropics/claude-code-security-review

  

**喜欢此文的话，可以点赞、转发、在看 一键三连哦！**

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

继续滑动看下一个

星尘安全

向上滑动看下一个