---
title: "AI视频界变天！Decart发布实时“Sora”，直播/游戏业或遭降维打击"
source: "https://mp.weixin.qq.com/s?__biz=MzA5MTIxNTY4MQ==&chksm=8674118698a1a0c59fe062db6cb076b6e9a4b2657827df3407a3b5b21415d98875f16ea58b98&idx=1&mid=2461153155&sn=094a2f3f0182813f632b19c483bafb60#rd"
author:
  - "[[ully]]"
published:
created: 2025-07-18
description:
tags:
  - "实时AI视频"
  - "无限生成"
  - "降维打击"
abstract: "Decart发布实时AI视频模型MirageLSD，可能颠覆直播和游戏行业。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/aaN2xdFqa4FDhibNEegll2WIwpqRmX7QM8oWjcT0es49ySyvzb1MQZI9ianiclPPmia1yjok8ibjDfekqN07OvLJ8jQ/0?wx_fmt=jpeg)

Original ully [AI工程化](https://mp.weixin.qq.com/) *2025年07月18日 12:27*

AI视频领域的“核武器”已经正式引爆。

一家名为Decart的AI创业公司，刚刚扔出了一颗足以改变行业的重磅炸弹： **全球首个实时、无限长度的AI视频模型——MirageLSD。**

这项基于其独创的“实时流扩散”（Live-Stream Diffusion, LSD）技术的模型，能将你的想象力实时注入任何视频流中。这不再是看屏幕上的魔法，而是让你亲手创造魔法。

这一步棋，直接宣告了对传统视频制作、直播乃至游戏行业的“战争”。

![Image](https://mmbiz.qpic.cn/mmbiz_png/aaN2xdFqa4FDhibNEegll2WIwpqRmX7QMuLN36FVSxrUia8ho5ptYdseyUxrtFqNmcILZnHWMBoaiaHJHzAAjkd6Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

创始人亲自“下场”：<40毫秒延迟，实时造梦

在官方演示中，Decart的创始人兼CEO迪恩·莱特斯多夫（Dean Leitersdorf）亲自展示了Mirage的恐怖实力。

他只是随口说出几个词：“狂野西部、宇宙、罗马帝国、金色、水下”，屏幕上的他立刻变成了一个身穿斗篷、浑身金光闪闪、仿佛置身于水下世界的“凯撒大帝”。

与其它动辄需要10秒以上延迟、只能生成几秒钟短片的AI视频模型不同， **Mirage的响应时间低于40毫秒，实现了真正的“零延迟”** ，足以支持24 FPS的流畅视频流。

当他用手捂住脸，AI会赋予他更女性化的特征；他手指间旋转的笔，颜色和形状也在不停变换。整个过程如同一场迷幻的超现实直播，而且可以无限持续下去。

### 屠龙术揭秘：如何实现“无限生成”与“实时响应”？

如此颠覆性的技术，背后是Decart团队对两大核心难题的攻克。

**1\. 攻克“错误累积”，实现无限生成**

所有自回归模型（frame-by-frame生成）都面临一个致命缺陷： **错误累积** 。每一帧都会继承上一帧的微小瑕疵，如同滚雪球，几秒钟后画面就会崩溃失真。这就是为什么之前的模型都无法生成长视频。

![Image](https://mmbiz.qpic.cn/mmbiz_png/aaN2xdFqa4FDhibNEegll2WIwpqRmX7QMxJOGCQdX9vToSpx2funOYTunxW8CjuWMARXM685P68mIEbF52M93aA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

Decart的解决方案是： **历史增强（history augmentation）** 。他们通过在训练中故意向历史帧中注入干扰，来“教”模型预判并纠正它自己可能产生的错误。这让MirageLSD具备了强大的纠错能力，成为全球首个能无限生成视频而不会崩溃的模型。

  

**2\. 极限压榨GPU，实现零延迟**

**![Image](https://mmbiz.qpic.cn/mmbiz_png/aaN2xdFqa4FDhibNEegll2WIwpqRmX7QMMq9tfa0zwjwPia8W0qEN3ky5YZLMoI7erJFNjp5qme2wQ6vRm9jf9fg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)**

为了将每帧的处理时间压缩到40毫秒以内，Decart采用了三管齐下的“暴力”优化策略：

- **定制CUDA超级内核 (Mega Kernels)** ：编写底层代码，为NVIDIA Hopper架构GPU量身定制执行方式，最大限度减少延迟。
- **架构感知剪枝 (Architecture-aware Pruning)** ：精简模型，剔除冗余参数，让模型更轻、更快，同时完美适配GPU硬件。
- **快捷蒸馏 (Shortcut Distillation)** ：训练一个小模型去模仿大模型的去噪轨迹，用更少的计算步骤实现同样高质量的输出。

这些技术的结合，带来了比之前模型 **快16倍的响应速度** ，将实时AI视频从理论变为了现实。

### 不只是滤镜，更是下一个计算平台入口

Decart的野心远不止于直播和短视频特效。

其上一代模型 **Oasis** ，就曾展示过一个完全由AI实时生成的《我的世界》游戏世界。而MirageLSD的出现，则将这种实时生成能力从特定游戏扩展到了开放领域。你可以把《使命召唤》的枪战变成光剑对决，把现实中的棍棒打斗变成少林功夫片。

Decart已经上线了Mirage平台（iOS/Android版即将推出），并计划在整个夏天定期发布模型升级和新功能，包括面部一致性、语音控制、精确物体控制，以及对直播、游戏和视频通话的深度集成。

### “我们要成为‘千亿级独角兽’”

从被行业巨头忽视，到自立门户研发颠覆性技术，Decart的目标极其明确。

创始人莱特斯多夫在最近的采访中直言：“我们有五年的时间，努力打造一个‘kilo-unicorn’，也就是价值一万亿美元或拥有十亿用户的公司。”

MirageLSD不是一个终点，而是一个起点。Decart正在构建一个能将我们所有感官都变成入口的平台。随着技术的不断迭代和开放，这场由AI掀起的视觉革命，好戏才刚刚开场。

参考： https://about.decart.ai/publications/mirage

公众号回复“进群”入群讨论。

![](https://mmbiz.qlogo.cn/sz_mmbiz_jpg/j1pCZ4uhyNJ8uGFI7kydDXpnYISHysDzOne4MFx6LzleiclXNPVvy2v8KhZe8xzSGHJf7LSY9DnIAncPbDrIAQQ/0?wx_fmt=jpeg)

小小的鼓励，大大的支持

 [Love the Author](https://mp.weixin.qq.com/)

继续滑动看下一个

AI工程化

向上滑动看下一个