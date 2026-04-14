---
title: "Agent 不该反复踩同一个坑：SkillClaw 让技能在多用户中自动进化"
source: "https://mp.weixin.qq.com/s/cWN744X2962ERGcxjDK9dw"
author:
  - "[[唐国梁Tommy]]"
published:
created: 2026-04-14
description: "不要只让 agent 在单次会话里“学会”，而要把多用户、多时间段里的真实交互轨迹，持续写回共享技能库。"
tags:
  - "技能进化"
  - "多用户经验"
  - "共享技能库"
  - "程序性错误修复"
abstract: "SkillClaw 是一个让 AI Agent 能够从多用户真实交互中持续学习，并将成功经验提炼为可复用技能，从而避免重复错误的集中式演化框架。"
---
Original 唐国梁Tommy *2026年4月14日 17:17*

很多人对 AI Agent 的直觉，还是“模型够不够强”。但真把 agent 放进真实环境里，你很快会发现，问题常常不是它完全不会做，而是它会在一些很具体、很琐碎、却又会反复出现的地方不断摔倒。

比如路径写错了、工具端口不对、调用顺序颠倒了、该先检查输入文件是否存在却直接开跑。更麻烦的是，这些坑今天这个用户踩过，明天另一个用户还会再踩一次。一次次失败里其实已经积累了经验，但系统没有把这些经验真正沉淀下来。

arXiv 这篇 2026 年 4 月 9 日提交的论文《SkillClaw: Let Skills Evolve Collectively with Agentic Evolver》，想解决的正是这个问题。它的核心主张可以压缩成一句话：

**不要只让 agent 在单次会话里“学会”，而要把多用户、多时间段里的真实交互轨迹，持续写回共享技能库。**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/bxX1loOXeofFg1E31u61shl0LgouaO96GP8RJrVXfW5YpibNkYlzW90zqUkoarzlmZVheBL3B3jnBl9tLE5PEIoovMaiaac2Lgn3pL9sEicKmU/640?wx_fmt=jpeg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

这件事听起来像“给 agent 加记忆”，但论文强调的其实不是记住某一条历史，而是把历史中的稳定经验提炼成可复用的技能。换句话说，SkillClaw 试图把“某次任务里碰巧跑通了”升级成“以后遇到类似任务都更容易跑通”。

## 真正的断点，不在智商，而在技能库太静态

论文的观察很现实。今天很多 agent 系统已经有 skill hub，也能按任务装配技能，但这些技能通常在部署后基本不变。用户在真实任务中摸索出来的新流程、对工具的修补办法、对失败模式的规避策略，往往只停留在当前会话里。

这意味着系统虽然每天都在使用，却没有真正“越用越会”。一个用户刚刚发现“在做文件解析前先验证文件是否存在”能显著减少失败，另一个用户下一次仍然可能从头踩坑。知识没有跨用户传播，也没有跨时间累积。

这也是为什么我觉得这篇论文抓住了 agent 落地里一个很关键、但经常被忽略的问题：很多失败并不是因为模型不够聪明，而是因为系统没有把程序性经验制度化。

## SkillClaw 做的，不是加一个外挂，而是建一个闭环

论文里的 SkillClaw 是一个集中式演化框架。多个用户各自与 agent 交互，系统把这些真实会话记录下来，整理成可分析的证据，再交给一个“agentic evolver”去决定该怎样更新技能库。更新过的技能再同步回所有 agent，形成下一轮使用基础。

如果把它放到更具体的运转节奏里看，SkillClaw 很像一个“白天工作、夜间复盘”的系统。白天，用户照常使用 agent，系统尽量不打断任务流程；夜间，平台把当天积累下来的交互轨迹做分组、分析、生成候选更新，再验证并回写。

这个闭环里有两个点尤其重要。

第一，系统保留的不是只有最终答案，而是完整的因果链：用户 prompt、agent 的行动、工具调用、过程中的报错或环境反馈、最后响应。论文明确指出，很多技能层面的失败根本不会出现在最终答案里，而是藏在中间步骤里。你只看最后一句“任务失败”，是看不出哪里该修的。

第二，SkillClaw 会把不同用户的会话按“引用了哪个技能”来分组。这样一来，同一个技能在不同环境、不同任务、不同用户手里什么时候有效、什么时候失效，就能被放到一起观察。论文把这件事看成一种天然的对照实验，这个视角很有价值。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果某个技能在很多场景下都失败，而且失败模式高度相似，那么这很可能说明技能本身有缺口；如果一批任务根本没用到任何现成技能，却反复出现相似流程，那系统就有理由把它提炼成一个新技能。

换句话说，在 SkillClaw 里，一个技能不是“写完就结束”，而是会经历被调用、暴露问题、提出修订、上线验证、继续被调用的循环。这种生命周期观念，其实比“某次技能写得漂不漂亮”更重要，因为它把技能看成活资产，而不是静态文档。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 关键角色是“演化器”，但它不是随便改

SkillClaw 的核心执行者是一个 agentic evolver。它面对每个技能相关的会话组，会做三种决策之一： `Refine` 、 `Create` 、 `Skip` 。

- `Refine` ：已有技能能用，但步骤描述不够稳，或者遗漏了关键约束，那就改写它。
- `Create` ：现有技能覆盖不到，但轨迹里反复出现某个可复用流程，那就新建技能。
- `Skip` ：证据不足，不值得动。
![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这里论文还有一个很工程化的设计，我认为非常必要： **验证器** 。候选技能更新不是直接上线，而是先在真实执行环境里验证，只有超过当前已部署的最佳技能，才会被并入共享技能池。否则就拒绝。

这一步的意义，在真实系统里比“让模型更会写技能”还重要。因为一旦没有验证环节，系统很容易把看起来更聪明、实际上更脆弱的 skill 文本推给所有用户，最后整体体验反而波动更大。论文也承认，这会带来额外 token 和执行成本，但换来的是更稳定的用户侧效果。

为了看清它到底新在哪里，也可以把它和更常见的两种思路放在一起比较：一种是“把经验留在单次会话记忆里”，另一种是“预先手工写一批技能放进 hub”。SkillClaw 介于两者之间，但更进一步，它要把新经验制度化地吸收进共享技能层。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 结果说明：最先被修好的，往往是那些反复绊脚的流程问题

实验部分，作者在 WildClawBench 上做了一个 6 天、8 个并发用户的连续演化设定，底座模型是 Qwen3-Max。WildClawBench 本身包含 60 个复杂任务、覆盖 6 个能力域；论文当前重点报告了 4 个代表性类别的白天用户侧结果。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

按论文 Table 3，四类任务相对 Day 1 的提升分别是：

- Social Interaction：54.01% 提升到 60.34%，相对增幅 11.72%
- Search & Retrieval：22.73% 提升到 34.55%，相对增幅 52.00%
- Creative Synthesis：11.57% 提升到 21.80%，相对增幅 88.41%
- Safety & Alignment：24.00% 提升到 32.00%，相对增幅 33.33%

这些数字有一个很清楚的共同点：收益主要出现在“程序性瓶颈”被修正的时候。

例如搜索检索类任务，论文说前期改进主要来自输入校验、文件可达性检查、路径修复；创意生成类任务的大跳升，也更多来自工作目录、输入文件、输出路径、多模态预处理这些基础流程被理顺，而不是模型突然变得更有创造力。

这其实很符合真实世界。很多 agent 任务失败，不是因为最后一步不会总结，而是因为前面三步没站稳。SkillClaw 的价值，就是先把这些经常出错但又高度复现的“低层流程错误”吸收掉。

## 它最擅长修流程，但还不是“万能进化机”

论文里有一个我觉得很诚实的信号：作者专门做了一个更受控的验证。三类查询在一次演化后的平均提升是 42.1%，其中 `save report` 从 28.3% 到 100.0%，而 `deadline parsing` 只提升了 6.9%。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这个对比说明了一件很关键的事： **SkillClaw 更擅长解决“流程没写对、环境没对齐、工具没用稳”的问题；对于更依赖细腻语义判断的任务，它不是没有帮助，但帮助通常没那么猛。**

这并不算缺点，反而让这篇论文更可信。因为它没有把“技能进化”神化成通用智能升级器，而是把自己的有效边界说得比较清楚。

## 为什么这篇论文值得看

如果只从论文贡献来讲，SkillClaw 的新意并不只是“让技能自动更新”，而是把三件事接起来了：

1. 把多用户真实交互当成主要信号，而不是只看单 agent 的自我反思。
2. 把经验沉淀成共享技能，而不是停留在零散记忆或一次性补丁。
3. 用验证机制守住上线质量，让技能演化更像工程系统，而不是提示词漂移。

我的理解是，这篇论文真正重要的地方，在于它把 agent 的长期改进问题，从“模型还能不能再想得更深”转成了“系统能不能把已经发生过的有效经验，稳定地写回基础设施”。

这类思路一旦成熟，agent 的进步就不再只依赖更大的模型、更高的推理成本，也可能来自更强的经验吸收能力。对于企业内部 agent、团队级 copilot、或者多租户自动化平台，这种“共享技能池持续演化”的意义会非常大。

从落地角度看，它最适合那些任务结构会重复出现、工具链相对稳定、而且错误模式可被观察和验证的环境。比如内部自动化、企业知识检索、报表生成、流程编排、工具型 copilot。这些场景里，一旦高频失败模式被吸收进技能库，后续收益会持续放大。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 也要看到它现在的边界

不过，这篇论文目前还明确标注为 `Work in progress` 。作者自己也提醒，当前实验是小规模测试，用户查询数、反馈信号和交互深度都有限，而且最终结果目前只重点展示了 4 个类别，更多类别留待后续版本。

反过来说，如果任务本身高度一次性、环境频繁变化、成功标准又很难自动验证，那么 SkillClaw 这类方法的收益就没那么直接。因为它能发挥作用的前提，是系统确实能从历史轨迹里提炼出可重复、可验证、可迁移的经验。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

因此，一个稳妥的结论应该是：

SkillClaw 已经展示出“让 agent 从真实使用中持续修正技能流程”的潜力，尤其适合修复高频、可复现、程序性强的失败模式；但它距离证明自己能系统性提升更开放、更依赖复杂推理的 agent 能力，还有一段路。

如果再往前看一步，这篇论文其实也在悄悄推动一个判断标准的变化：未来评估 agent，不该只问“这次做没做成”，还要问“这次做成或做错之后，系统有没有因此变得更会做”。一旦这个标准成立，技能演化层很可能会成为 agent 基础设施的一部分。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

即便如此，这篇论文已经把一个方向讲明白了: 对下一代 agent 来说，重要的可能不只是“会不会做”，而是“能不能把一次做对，变成大家以后都更容易做对”。

---

## 进阶学习

👉如果你想系统掌握多模态大模型前沿技术与应用，推荐你学习我的精品课程：

\[更新中\] 多模态大模型 前沿算法与实战应用 唐国梁Tommy 视频课

📚课程覆盖主流多模态架构、多模态Agent、数据构建、训练流程、评估与幻觉分析，并配套多个项目实战：LLaVA、LLaVA-NeXT、Qwen3-VL、InternLM-XComposer（IXC）、TimeSearch-R视频理解等，包含算法讲解、模型微调/推理、服务部署、核心源码解析。

💡本课程目前正在更新中，你可以在我的个人官网或B站课堂参与学习：

📺B站课堂（点击左下角“阅读原文”直接跳转）https://www.bilibili.com/cheese/play/ss33184

🌐官网链接（国内访问需科学上网）：https://www.tgltommy.com/p/multimodal-season-1

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**微信扫一扫赞赏作者**

Read more

继续滑动看下一个

唐国梁TGLTommy

向上滑动看下一个