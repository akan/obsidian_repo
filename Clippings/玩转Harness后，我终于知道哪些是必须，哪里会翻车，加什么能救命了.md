---
title: "玩转Harness后，我终于知道哪些是必须，哪里会翻车，加什么能救命了！"
source: "https://mp.weixin.qq.com/s/jBOGCtoLytPCjR9EQrRhAQ"
author:
  - "[[猕猴桃]]"
published:
created: 2026-05-11
description: "彻底搞定Agent Harness，什么是必须？什么能救命？什么是多余的？"
tags:
  - "AI代理"
  - "Harness护栏"
  - "模型选型"
  - "高效编码"
abstract: "本文通过实验对比不同模型和护栏配置，揭示了在AI编码代理中，有效的Harness（如工具调用上限和自动抢救提交）可以显著提升小模型的效率和准确性，而错误的配置或过度依赖模型推理反而可能降低性能。"
---
猕猴桃 *2026年5月11日 16:00*

Claude Code之父Boris在红杉 2026 AI Ascent 上说：

一年后，Claude Code 可能只剩 100 行代码。模型足够聪明时，你不需要那么多脚手架。

OpenAI 前不久的博客也说过： “Scaffolding is coping, not scaling.”

一个很明显的共识是： 随着模型变强，Harness 会持续的缩小。

但是，模型种类太多了，不同尺寸 flash、pro； 不同推理深度 thinking low 、high... 对Harness的需求绝对是不同的。

我尝试用一些实验，来回答：

这么多模型，到底哪些 harness 是必需的？拿掉什么会翻车？加什么能救命？

是不是一定要思考程度拉满？ 结果发现，做好关键harness，小模型同样可以做到好效果&省钱。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/durt1819APqStJUXKKcSUlrM6uzD4GicqtDiaB3U7voiaYxticN68WM7aEFlTfehQoJ1hCicsHUImf9P9wMkehAsKap5PUU9ODRMdWNVNwA0MQEo/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

**准备工作**

这个月龙虾的订阅，买的是阶跃星辰的Step Plan（几个月的订阅比较下来，最后发现还是喜欢这种文本、语音、图像 全模态all in one的订阅。）

而且这个订阅，关于文本模型就有好几种： step-3.5-flash（196B MoE，11B 激活，高速推理）、step-3.5-flash-2603（基于 flash 做了 agent 场景强化）、step-router-v1（自动在 deepseek-v4-pro 和 step-3.5-flash 之间路由）。不同尺寸，有agent特调版本，可以指定不同思考深度，非常适合来做这个验证。

@LawrenceW\_Zen 最近发了一份挺完整的 coding agent 调研，分享了一个 hero-coding 的开源 Go 框架，大约 400 行代码。 我直接复用了 hero-coding，做了 Windows 适配，接入了 Step Plan。

Opus 4.7给我准备了3个任务，三个梯度的任务。 最简单的修一行 bug，中等的加功能写测试，最难的 us-003 是从零实现一个完整的多范围解析器，设置了很多条件，12 条验收标准。

简单和中等任务没什么好说的，两个模型全过。step-3.5-flash反而是最快的，30 次工具调用 48 秒搞定中等任务。

这其实非常符合Boris说的，在很多场景下，你可能不需要什么 harness 了。 甚至小尺寸的worker模型照样可以完成的很好，速度更快，更便宜。只需要把复杂的规划任务交给大尺寸的模型就可以了。

但 us-003 的结果就很有意思了。。。

我一开始用 step-3.5-flash， 裸跑这个任务的时候，没有任何harness的时候。

flash根本停不下来，它做了267次工具调用。 round1 做了91次撞了5分钟条件限制，Round 2 做了 23 次自然停下来但代码编译不过，Round 3 又做了 153 次再次撞墙。三轮跑满，gave\_up。

但其实有一个特讽刺的事情，flash 其实写对了代码。

它把功能全实现了，测试也写了，代码逻辑是对的。但它不知道自己写对了。写完之后继续改，改出新 bug，又改，又出新 bug，循环往复直到超时。

所以第一个护栏特简单，给一个工具调用上限，80次就够了。

但是直接限制次数不够，因为架构设计。 被 kill 的时候代码已经写好了，但没 commit。kill 之后工作区重置，代码还是丢了。所以还需要第二个东西，auto-rescue commit。在 worker 被 kill 之后，工作区重置之前，自动执行一次 \`git add -A && git commit\`。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

就这2个护栏，加上之后，step-3.5-flash就可以在151s内成功通过us-003了。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

所以，harness其实可能不会是什么高端、顶级的trick操作，只需要观察模型行为，补充一些让模型行为轨迹正确的操作就够了。

但从上图可以看出来，step-3.5-flash-2603在这个case上还是失败了，同样的harness，但是输给了基础版本。

我分析了一下日志。step-3.5-flash-2603的agent优化，表现上会更谨慎，模型改了一些就跑一次测试。简单任务，这样可以更快确认。但是在复杂任务上，每步验证就把工具调用额度用完。

OpenAI 说「Scaffolding is coping, not scaling」， step-3.5-flash-2603恰好反过来，它内化了太多 scaffolding 行为，在有限 budget 下反而丧失了效率。但其实它真正的原因是反馈失效了，原始的hero-coding框架，judge提供给worker的反馈缺失了详细的完整验证堆栈信息。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

就这么一行代码。 step-3.5-flash-2603 ，一轮就过了。 这可能就是harness的魅力！

日常，我们选择模型的时候，还会选择，用不用thinking，用什么程度的thinking。

其实真的没必要什么都用最顶级，最大，最高推理的模型。同样用us-003测试了下，在low推理下。step-3.5-flash-2603 全场最快，一轮通过。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在低推理模式下模型每次输出更短、更聚焦，不花 token 犹豫。而好的 feedback 替代了内部推理，代码有 bug 时不需要模型自己推理出问题在哪，harness 直接告诉它。

Harness 不是模型的拐杖，是模型的杠杆。

但是harness不是随便抄过去都是有用的，错误的 harness 可能比没有 harness 更危险。

我测试在prompt层面，给step-3.5-flash-2603 加一个结构化 Planning Prompt，先读代码，写计划，再执行。

结果，整个系统钻了个judge漏洞，没有做任何代码更新。。。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Cognition 的博客，也谈过类似的话题，对于Agent壳子来说，最大的失败模式不是模型写错代码，而是系统层面的设计错误，给了不该给的约束，或者没给该给的信号。

问题来了，加规则，结果失败了，那这个合理吗？ 其实不合理，现在比较成熟的Agent架构，基本都可以收敛到下面这张图。有思考的脑子，有干活的手，持续的循环迭代。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

所以，Agent系统的脑子，手，完全可以用不同的模型。前面的一些护栏都是围绕单一模型，但前面的数据也可以观察到 step-router-v1，大多时候只要给够时间，都能通过，唯一的问题就是慢。

可以进一步考虑干活用更快的模型，但是做规划，做Judge用更大更好的模型。

我在us-003，做了进一步的对照。让step-router-v1负责思考统筹， step-3.5-flash-2603做快速执行，这样会不会又快又好了？ 结果是的，在前面最好的基础上，进一步取得了巨大的进步，只花了step-3.5-flash-2603 一半的时间，就达标了。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

更关键的是，除了耗时变成一半，token消耗可能只有1/3。 Worker / Judge 用不同模型，在cognition的博客里边称为 “smart friend routing”。

Scale AI的数据说，harness 对 SWE-bench 分数贡献在 5-15 个百分点。而且这些百分点会越来越集中在“模型无法自己做到的事”，比如物理约束、确定性验证... 所以这可能才是harness今天爆火主要原因吧。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**写在最后**

从前面测试来看，像 step-3.5-flash 这种 200b 左右的模型，完全可以扛住日常高频的 coding 任务，速度极快，30 次调用搞定别人 50+ 次的事。

甚至，step-3.5-flash-2603 配了简单的护栏，在低推理模式下，跑出了最好的表现。 实际体验下来，日常用 step-3.5-flash 做 worker，复杂规划交给 step-router-v1 动态路由到 deepseek-v4-pro，这种分工方式配上 harness，token 能省到很夸张。

如果你在做 Agent 或者 AI 编码相关的事情，Step Plan 的订阅制对高频调用场景很友好。OpenClaw、Claude Code、Cursor、Cline 这些主流工具都能直接接。我自己这个月用下来，跑实验的成本比之前低了不少，速度反而更快。

推荐亲自跑一次，比读这篇文章更有价值。

Step Plan 文档，https://platform.stepfun.com/docs/zh/step-plan/overview

继续滑动看下一个

探索AGI

向上滑动看下一个