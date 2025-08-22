---
title: "深度对话Claude Code掌舵人Cat Wu：内部全员当“小白鼠”，新功能靠原型说话"
source: "https://mp.weixin.qq.com/s/4cPLJClf0z-5SyaXwwTWpQ"
author:
  - "[[花不玩]]"
published:
created: 2025-08-22
description:
tags:
  - "内部试用"
  - "原型开发"
  - "定制化代理"
  - "多Claude并行"
  - "SDK构建"
abstract: "Claude Code通过内部全员试用和原型开发快速迭代，支持多实例并行和定制化代理，其SDK为开发者提供了强大的AI代理构建基础。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ICgnAptln0WSO5oTAlQXtxws8htXxgaj0WNtgEKg1b5qL3ibKvZHCQChu0sIIK4jxquOKoxicLlDmjBTcc7BfWgw/0?wx_fmt=jpeg)

Original 花不玩 [AI寒武纪](https://mp.weixin.qq.com/s/) *2025年08月22日 16:59*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ICgnAptln0WSO5oTAlQXtxws8htXxgajY2j2ux5NnTPEkdA7LVhY7eRKYv1cqkxibtslX6qJHwrChc7ImcL3SHg/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

  

直接和Claude Code 产品经理学习关于Claude code 的认知，这比你看多少其他文章都有用

Alex Albert，Anthropic的Claude关系负责人与 **Cat Wu** （Claude Code产品经理）进行了一场深度对话，首次揭秘了Claude Code的故事，整场对话13分钟，主要涉及以下几个主题：

a.Anthropic如何使用Claude Code打造新功能原型  
b.常见使用场景  
c.用户使用模式与「多Claude并行」玩法  
d.定制 Claude Code (CLAUDE.md、斜杠命令与钩子)  
e.Claude Code SDK 概览  
f.利用 Claude Code SDK 构建AI代理  
g.Claude Code 使用技巧与最佳实践

这是中文字幕采访视频：

Claude Code作为一款在开发者圈子中迅速崛起的AI编程工具，其惊人的迭代速度和强大的功能背后，究竟隐藏着怎样的开发哲学和故事？

### 一切始于内部试用：Anthropic如何打造新功能

Alex首先抛出了一个问题：Claude Code的新功能迭代速度快得惊人，几乎每次打开终端都有新惊喜。这背后的流程是怎样的？

Cat解释说，Claude Code团队充满了富有产品思维的工程师。许多新功能的诞生，都源于工程师们「自下而上」的需求——作为开发者，他们希望拥有某个功能，于是便动手为自己实现它

在Anthropic，一个新功能的诞生流程非常独特： **工程师不会先写冗长的产品文档，而是直接使用Claude Code快速做出功能原型。**

这个原型会首先在公司内部发布给所有员工试用。如果反响热烈，就证明这个功能很有价值，也预示着外部用户会喜欢它，这时团队才会决定将其正式发布。反之，如果内部员工使用不多，团队就会重新审视和调整

Cat强调，这种深度内部试用（Dogfooding）的文化是刻意为之的，也是Claude Code如此好用的关键原因。因为开发者的工作流千差万别，很多时候，只有亲身体验，才能真正感受到一个工具在实际工作中的价值

### 常见用例：小团队与大企业的不同玩法

随着Claude Code的用户量飞速增长，我们看到了不同规模的团队在使用它时，展现出了截然不同的模式

对于创业公司和小型团队的工程师来说，他们更倾向于让Claude更自主地运行。他们会使用自动接受模式（auto accept mode），让Claude在没有逐一批准的情况下自行修改代码。

更有趣的是，他们开创了一种被称为 **多Claude并行** （multi-Clauding）的玩法。你可能会看到一个开发者同时在电脑上打开六个Claude会话，每个会话处理不同的Git分支或代码副本。开发者就像一个项目经理，在不同的Claude实例之间切换，当某个实例需要反馈时，便介入指导，然后让它继续工作

而对于大型企业的工程师来说，他们则更偏爱 **计划模式** （plan mode）。在这种模式下，Claude会先花时间探索整个代码库，理解其架构，并制定一份详细的工程计划，然后再动手编码。这种方式非常适合处理更复杂、难度更高的开发任务。

### 定制化Claude Code

Cat提到，用户们对Claude Code的定制化能力表现出了极大的热情。大家不仅仅把它当成一个通用工具，更是在其基础上构建了各种专用代理，例如：

1.网站可靠性工程（SRE）代理  
2.安全审计代理  
3.事件响应代理

那么，用户是如何实现这些定制的呢？主要有三种方式：

**CLAUDE.md文件** ：这相当于Claude的记忆中枢。开发者可以在这个Markdown文件中详细描述团队的目标、代码架构、项目中的常见陷阱以及最佳实践。Cat表示，花时间维护好这个文件，能显著提升Claude的输出质量

**自定义斜杠命令** ：如果你发现自己总是在输入某些固定的指令，可以把它们保存为自定义的斜杠命令（slash commands），方便随时调用，甚至可以分享给团队其他成员

**钩子（Hooks）** ：这是一种为Claude的行为增加确定性的强大功能。它本质上就是一段脚本，可以在特定的事件发生时触发。例如，你可以设置一个钩子，让Claude在提交代码前自动运行代码风格检查（lints），或者在任务完成后给你发送一条Slack通知

### Claude Code SDK的无限可能

对话的后半段，Cat重点介绍了Claude Code软件开发工具包（SDK）。这不仅仅是Claude Code的一个功能，更是通往构建下一代AI代理的大门

Claude Code SDK为你提供了一套完整的代理（Agent）核心构建模块。开发者无需从零开始搭建复杂的框架，SDK已经处理好了许多底层工作，包括：

**核心代理循环** ：自动处理用户与模型的对话轮次和工具调用。  
**权限系统** ：内置一套成熟的权限管理机制。  
**API交互** ：智能处理API错误时的退避重试，并积极使用提示缓存以节省成本。  
**高度可定制** ：你可以轻松替换系统提示，或接入自己独有的工具。

使用SDK，你可以在大约30分钟内就搭建出一个功能强大的代理原型。Anthropic自己开源的Claude Code GitHub集成就是完全基于这个SDK构建的。

更重要的是，它的应用远不止于编码。Cat透露，已经有人用它来构建法律代理、合规代理等。SDK的设计初衷就是成为一个通用的代理构建平台，无论你的领域是什么，它都能为你提供坚实的基础

### Claude Code 最佳实践

最后，当被问及使用Claude Code的最佳实践时，Cat给出了一个建议：把它当作一个人类工程师来沟通

她解释说，所谓的「提示工程」并没有那么神秘，其核心在于清晰地沟通。你需要明确地告诉Claude：

你的目标是什么？

你如何评估最终结果的好坏？

在设计上有什么限制或要求？

当你能把这些信息清晰地传达出去时，Claude要么能出色地完成任务，要么会告诉你它做不到，并提出替代方案

还有一个非常实用的技巧：如果Claude做出了让你费解的行为，直接问它为什么。它可能会告诉你，是CLAUDE.md里的某条规则，或是它在某个文件中读到了特定信息，才让它做出了这样的决策。通过这种方式，你甚至可以用Claude Code来调试Claude Code本身，就像你在与同事协作时，通过沟通来消除误解一样

以上，谢谢你看我的文章。觉得还不错的话，点个赞/在看/转发就更好了～想第一时间收到更新，记得给我加个⭐星标。～我们，下次再见

.../作者：花不玩

继续滑动看下一个

AI寒武纪

向上滑动看下一个