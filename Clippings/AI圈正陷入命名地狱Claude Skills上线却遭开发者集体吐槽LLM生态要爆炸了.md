---
title: "AI圈正陷入命名地狱！Claude Skills上线，却遭开发者集体吐槽：LLM生态要爆炸了！"
source: "https://mp.weixin.qq.com/s/rdeBtXU5tvoZkz40rsUmAg"
author:
  - "[[听雨]]"
published:
created: 2025-10-17
description: "你会给 Claude 训练什么样的第一个 Skill？"
tags:
  - "Claude Skills"
  - "AI工具生态"
  - "命名复杂性"
  - "开发者吐槽"
abstract: "Anthropic发布Claude Skills功能让AI能够调用特定技能完成任务但开发者担心AI生态的命名复杂性正在失控"
---
听雨 *2025年10月17日 16:06*

![Image](https://mmbiz.qpic.cn/mmbiz_gif/MOwlO0INfQoIDJ0nx1IhNibpIpYLrpUE0kIP9qbF1iaY7EoZpaic6IojvbXibd5ZGiatxmjtibQRcVbGAPM9Ijvp66yQ/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0) ![Image](https://mmbiz.qpic.cn/mmbiz_png/MOwlO0INfQrBu6URTUu6wogeOlQOTueBR1OgaicDXmtaickx8o2WsvaAwrcuz1buDU62buict4Wl8Dqm0DYoZYlTA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

编辑 | 听雨

还记得当年大家调侃 ChatGPT：

“它什么都会，就是不会干正事。”

现在，Anthropic 把 Claude 往前推了一大步——

它不仅能「干活」，还开始「学技能」。

今天，Anthropic 发布全新功能 Claude Skills，让 Claude 能调用特定“技能”完成专业任务。

它不是插件、不是命令，而是一种「让 AI 会用工具」的新方式。

官方定义： Skill = 一个带有指令、脚本与资源的文件夹， Claude 在需要时自动加载。

功能上线后， Hacker News 评论区直接炸锅——有人赞叹“这是 AI 的 Unix 时刻”，也有人吐槽“ LLM 生态已经变得荒唐 的 复杂 ”。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/MOwlO0INfQq9VIibuQ22iajvze631pQJVvFXuhILX3JhsfmCGP3UXkY5FYq08vSDZ3iboc71BweGlL0gcgibaGG0Jw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

**Claude Skills 想干什么？**

  

一句话概括 —— Claude Skills 是一种“让 Claude 学会用工具”的新接口机制。

它既不是传统意义上的插件，也不是 ChatGPT 那种「 API 调用式」工具，而是一种更底层、更可编程的机制。 Anthropic 想让 Claude 在不同工作流中，像人类一样“拿出自己的工具包”，用上合适的技能完成任务。

**Skills 是什么？**

从结构上看，一个 Skill 就是一个文件夹（ Folder ），里面包含三样东西：

指令（ Instructions ） —— 告诉 Claude 该做什么、如何使用资源；

脚本（ Scripts ） —— 真正执行任务的逻辑，可以是可运行的代码；

资源（ Resources ） —— 模板、文件、品牌指南、数据模型等辅助内容。

![Image](https://mmbiz.qpic.cn/mmbiz_png/MOwlO0INfQrBu6URTUu6wogeOlQOTueBibfcnK0kBGm9jXg7jiazaUHgxmicSOjGAIiaGNQQBrzWKqoImfp7JbCzXg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

每个技能的核心是一个 `SKILL.md` 文件，内容混合了 YAML 和 Markdown，可以定义参数、依赖与执行逻辑。

（GitHub链接：

https://github.com/anthropics/skills/blob/main/document-skills/pdf/SKILL.md）

这些技能既可以 **本地存储** （在 `~/.claude/skills/` ），也可以 **上传到云端** ，通过 Claude API 或 Claude Code 使用。

当 Claude 接收到任务时，它会扫描技能库，自动匹配相关技能并按需加载其中的信息——  
**只加载需要的内容，不浪费 token，也不影响响应速度。**

Skills 如何工作？

Anthropic 在工程博客中称这种机制为 **Progressive Disclosure（渐进式披露）** 。

> “就像一本组织良好的手册：先是目录，再是章节，最后是附录。  
> Claude 只在需要时才加载技能对应的部分。”

这意味着 Claude 不会一次性加载所有资源，而是 **按需调用** ，保证运行高效、安全。

官方还强调 Skills 的四个特性 ：

- 可组合：多个技能可以叠加使用，Claude 会自动协调调用。
- 可移植：相同格式可在 Apps、Code、API 全平台通用。
- 高效：只加载当前任务所需部分。
- 强大：可包含可执行代码，用传统编程方式提升任务稳定性。

你可以把 Skills 理解为一份“给 Claude 的入职手册”， 让它快速掌握你的业务逻辑、操作规程或品牌风格。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**Skills 能干什么？**

官方给出的应用场景很广，从办公自动化到企业级 AI 代理，几乎覆盖了 Claude 所有产品：

- AI 办公助手：自动生成 Excel 、 PowerPoint 、 Word 、 PDF 等专业文件；
- 企业知识工作流：让 Claude 访问内部文档、品牌规范、标准化脚本；
- 自定义 Agent 架构：开发者可以为 Claude Code 添加团队专属技能，通过 SDK 构建自己的小型“企业 Agent ”。
	![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

此外，Anthropic 还为 **Claude 团队和企业版** 用户 提供了 **Microsoft 365 连接器（MCP Connector）** ，  
能让 Claude 直接访问 SharePoint、OneDrive、Outlook、Teams，并支持企业级搜索。

#### Skills 的另一面：可执行的智能

Skills 不只是加载知识文件，它们还允许 Claude 执行真实代码。

Anthropic 解释说，这种机制能解决 LLM 生成内容时常见的效率问题。  
比如：

> “如果让语言模型用 token 来排序一个列表，它会又慢又贵。  
> 而执行一个排序算法的脚本，不仅更快、更省成本，而且结果一致。”

这意味着 Skills 让 Claude 在“语言模型”与“编程逻辑”之间架起了一座桥梁。

安全与风险

功能强大，也意味着更高风险。Anthropic 警告开发者：

> “恶意技能可能引入安全漏洞或窃取数据。”

官方建议：

- 仅安装来自 **可信来源** 的 Skills；
- 使用前 **检查 SKILL.md 文件内容** ，确认其中的代码与依赖；
- 警惕任何尝试连接外部网络的指令。

Anthropic 甚至暗示：未来可能让 **Claude 自己创建技能** ——  
这听起来像是“AI 自学新本领”的前兆，也让人隐隐感到复杂性正在上升。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

AI生态正陷入命名地狱

功能上线后， Hacker News 评论区直接炸锅。

有网友形容当前的AI工具生态像「癌变的生态系统」， 每家都发明自己的词汇 ：

> “ 我担心未来几年我们会经历的「概念churn（反复更换和迭代）」会堪比前端开发那一波。
> 
> 现在ChatGPT、Claude 都在推出 各种「tools、functions、skills、agents、subagents、commands、apps」，外加一堆所谓的「vibe 框架」 ，整个生态正在膨胀成一团乱麻。”

有人打趣说： “AI世界需要的第一个Skill，是教它们统一术语。”

也有网友提出： 别被名字骗了，其实都是同一个循环。

核心模型没变：Prompt → Reason → Act → Observe → Repeat。

所谓的“Skill”“Agent”“Tool”，只是不同层次的封装。

另外，有网友提出了“复杂性预算”：越多的功能意味着越多的错误与认知负担。

> “没错，这整个生态正在朝“复杂到崩溃”的方向走。每个平台都有一笔“复杂度预算”，超了就没人用。
> 
> 每加一个新概念，就挤占了开发者理解力的空间。
> 
> 很多公司以为这是“差异化创新”，其实是在堆障碍。
> 
> Claude Skills 就是个典型例子——它带来了新概念，却没带来等价的新能力。”

一位网友直言：

> 感觉这些公司每周都在发一堆 几乎一模一样 的产品。
> 
> Anthropic 的员工自己能分清楚差别吗？

继续滑动看下一个

51CTO技术栈

向上滑动看下一个