---
title: "从「会表演」到「更会演」：KlingAvatar2.0让数字人拥有生动灵魂"
source: "https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&chksm=851833b6cdce9cd529e4fbbd3fe7f814277caef855b28123261df3f034a579a048ff9f2cba70&idx=2&mid=2651008737&sn=21279f4c6aefa91d4002feb28c015292#rd"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-12-25
description: "拥有更丰富的情感层次、更精准的多角色互动，对复杂文本指令的深度理解能力，以及支持长达 5 分钟的视频生成"
tags:
  - "数字人技术"
  - "视频生成"
  - "生动表达"
  - "多角色互动"
  - "长视频生成"
abstract: "快手可灵团队发布的KlingAvatar2.0技术通过时空级联框架、共推理导演系统和多角色精准控制三大核心创新，显著提升了数字人生成视频的生动性、情感表达和长内容生成能力。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/KmXPKA19gWibCKsLUicnoUHC00knHs04qpphziaIu0e1Ls9hfRoX7q64HduqOGWQClWG77dXkZguyic4iaZwibxAibu3A/0?wx_fmt=jpeg)

[机器之心](https://mp.weixin.qq.com/) *2025年12月24日 11:39*

机器之心发布

  

还记得几个月前那个能随着音乐节拍自然舞动的 KlingAvatar 数字人吗？现在，它迎来了史诗级进化！

  

近日，快手可灵团队正式发布了 KlingAvatar2.0 技术报告，这一次，数字人不仅能 "表演"，更能 "生动表达"—— 它们将拥有更丰富的情感层次、更精准的多角色互动，对复杂文本指令的深度理解能力，以及支持长达 5 分钟的视频生成。 目前该模型已经在可灵平台全量上线，人人都可体验！

  

- 论文地址：https://arxiv.org/pdf/2512.13313
- 体验链接：https://app.klingai.com/cn/ai-human/image/new/

  

首先看一下效果，肢体灵动、表情逼真，生动性拉满！

  

  

  

  

让我们拆解技术报告，看一下可灵团队是如何实现如此生动效果的。

  

🌟 核心技术突破：让数字人 "活" 起来的三大创新

  

1\. 时空级联框架：长视频不再 "虎头蛇尾"

  

想象一下，你正在制作一个 5 分钟的产品介绍视频，但传统的 AI 生成工具总是在第 2 分钟后就开始 "崩坏"—— 画面变得模糊，人物动作开始不连贯，甚至连口型都对不上了。KlingAvatar2.0 创新性地提出了 时空级联框架：

  

- 智能蓝图生成 ：先创建低分辨率 "蓝图视频" 捕捉全局语义和动作
- 渐进式增强 ：通过首帧 - 末帧策略，将蓝图精细化为高分辨率、时间连贯的子片段
- 并行高效 ：支持分钟级长视频生成，保持身份一致性和故事连续性

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibCKsLUicnoUHC00knHs04qppguKBQSCp9586zuL7HG2hZKU3tvOeIiclxyEeibNbTOtes4ricptDwOibw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

KlingAvatar 2.0 方案框架。该方案快速勾勒出一个低分辨率的 "分镜脚本"（蓝图视频），确定整个故事的走向和关键动作节点；然后，它会像精雕细琢的艺术家一样，逐步将这些关键帧升级为高清画面，确保每个细节都栩栩如生；最后，通过并行处理技术将这些精心打磨的片段无缝拼接成完整的长视频。

  

2\. 共推理导演：多模态指令的 "智慧大脑"

  

KlingAvatar2.0 的 共推理导演系统 就像是给数字人配备了一个专业的导演团队。这个系统由三位 "AI 专家" 组成，它们会像真正的电影制作团队一样密切协作：

  

- 音频专家 ：精准识别语音内容、情感轨迹和说话意图
- 视觉专家 ：深度理解人物特征、场景布局和视觉语境
- 文本专家 ：智能解析用户指令，融合对话历史生成连贯剧情

  

这三大专家通过多轮对话协作，能够解决模态冲突（比如愤怒语气配中性脚本），将模糊的指令转化为详细的镜头级故事线。

  

3\. 多角色精准控制：每个数字人都有自己的 "声音"

  

在传统的多角色视频中，一个常见的问题是 "张冠李戴"—— 明明是给 A 角色的音频，结果 B 角色的嘴也在动。这种混乱让观众瞬间出戏，破坏了整个视频的沉浸感。KlingAvatar2.0 通过 身份特定多角色控制技术 ，让每个数字人都能 "各司其职"：

  

- 利用深度 DiT 特征实现角色掩码预测
- 每个角色都能被独立的音频流精准驱动
- 基于 Yolo、DWPose、SAM2 等模型构造了数十万条高质量多人数据用于训练

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibCKsLUicnoUHC00knHs04qpicmKqqrial0w9FFp0h6YKzZL6aO6XiajwK0fcVCL43vzZ5rXQLJutVYJg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

(a) KlingAvatar2.0 基于 DiT 深层 block 特征预测指定角色在视频中每一帧画面的位置，控制音频精确驱动该位置的角色。(b) 可灵团队基于 Yolo、DWPose、SAM2 等模型构造了数十万条高质量多人数据用于训练。

  

🎭 实验结果：生动性大幅提升，数字人有了 "演技"

  

如果说 KlingAvatar1.0 让数字人学会了 "表演" 的基本功，那么 2.0 版本则让它们真正拥有了 "演技"。生动性方面：

  

- 情感表达更细腻 ：面部表情随语音起伏自然变化，能够准确传达兴奋、悲伤、愤怒等复杂情绪，眼神、嘴角、眉梢都充满 "戏"。
- 动作协调更自然 ：全身动作与音频节奏完美同步，手势、姿态变化流畅自然，避免了不自然的扭曲和抖动。
- 细节处理更精致 ：头发动态物理真实，不再 "僵硬"，牙齿、嘴唇细节清晰可见，光照和曝光效果更加自然。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibCKsLUicnoUHC00knHs04qpLCK6PiaRgniam6Ks0LpUbhQ01Ewib2zdj033oy8xvCBLcf99ecdKlrESA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

KlingAvatar2.0 与 Heygen、OmniHuman-1.5、KlingAvatar1.0 相比有更优异的性能。

  

在涵盖 300 个高质量测试案例的严格评测中，KlingAvatar2.0 展现出了令人瞩目的性能：

  

- 整体效果 ：相比 HeyGen 提升 26%，相比 KlingAvatar1.0 提升 73%，相比 OmniHuman-1.5 提升 94%
- 文本响应 ：指令理解能力大幅提升，能准确执行复杂的镜头和动作指令
- 运动表现力 ：生动性和丰富度远超竞品

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibCKsLUicnoUHC00knHs04qpqVY2iacoyGGdqeDLibkj6Sfc3aXp0080goeLt3jibbXC2v5tZe0ubntBg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

KlingAvatar 2.0 与基线方法的定性比较。左图：KlingAvatar 2.0 能够生成更自然的头发动态效果和更生动的面部表情。中图：KlingAvatar 2.0 更符合指定的自下而上的摄像机运动。右图：KlingAvatar 2.0 的结果与提示 “…… 转身面向前方，双手交叉放在胸前” 更加吻合

  

🚀 总结：让每个数字人都有动人灵魂

  

回顾整个数字人技术的发展历程，我们可以清晰地看到一个进化轨迹：从最初的 "嘴唇蠕动"，到后来的 "表情同步"，再到现在的 "生动表演"，每一次突破都让虚拟角色离 "真实" 更近一步。

  

KlingAvatar2.0 不仅仅是一次技术升级，它也代表了 AI 在理解人类表达艺术方面的一次飞跃。这项技术让机器更好地理解了什么是 "表演"—— 它不仅仅是机械地执行指令，而是要在理解音频情感、视觉语境和文本意图的基础上，创造出能够触动人心的视听体验。

  

放眼到行业，数字人技术的持续迭代，也推动着行业创作门槛的降低、制作标准的提升，在电商直播、娱乐内容制作、在线教育、企业服务等诸多领域，数字人的规模化应用已成趋势。

  

生成效果的大幅提升，长内容场景的全覆盖，都让我们更加确信：技术不再是冰冷的工具，而是真正成为了表达创意、传递情感的温暖载体。在这个技术与艺术完美融合的新时代， 准备好让你的创意 "活" 起来了吗？

  

  

© THE END

转载请联系本公众号获得授权

投稿或寻求报道：liyazhou@jiqizhixin.com

继续滑动看下一个

机器之心

向上滑动看下一个