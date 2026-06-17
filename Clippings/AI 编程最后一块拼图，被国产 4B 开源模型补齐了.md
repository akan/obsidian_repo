---
title: "AI 编程最后一块拼图，被国产 4B 开源模型补齐了！"
source: "https://mp.weixin.qq.com/s/jD1CCUIwudgds5_VBoVxDQ"
author:
  - "[[小小莫理]]"
published:
created: 2026-06-15
description:
tags:
  - "端侧 GUI 智能体"
  - "推理加速框架"
  - "本地部署"
  - "开源"
  - "视觉模型"
abstract: "明略科技开源端侧 GUI 智能体 Mano-P 和推理加速框架 Cider，让 AI 在本地电脑上高效、安全地操作图形界面，补齐了 AI 编程的最终拼图。"
---
小小莫理 *2026年5月8日 13:39*

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

随着氛围编程（Vibe Coding）的兴起，让 AI 落地项目早就不是什么新鲜事了。

但是你肯定遇到过 AI 告诉你代码正确，结果运行页面一看，UI 错乱排版重叠，逻辑按钮根本点不动。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这其实是因为大多数 AI 只有代码交互能力，但没有眼睛。不知道代码渲染成图形界面后长什么样。

解决这种情况最有效的方式就是给 AI 接入视觉，也就是用多模态视觉模型来做 GUI 图形界面测试。不过这又会遇见两个非常现实的问题。

一是高昂的“天价账单”。AI 模拟人眼看屏幕，每次滑动都在传截图。这导致在自动化流水线里，单单 GUI 测试这一个环节，Token 消耗成本往往就占到了整体的 50% 以上。

二是致命的“隐私红线”。把企业内部未公开的核心代码和业务截图传给云端大模型分析，直接触碰了数据安全底线，稍微敏感一点的项目根本不可能获批。

想省钱又保密，唯一的出路就是把视觉模型完全搬到本地电脑上运行，数据绝不上云。但现实很骨感，普通办公电脑的算力根本带不动庞大的多模态模型。

不过前几天，明略科技正式开源了 Mano-P（端侧 GUI 智能体）与配套的 Cider（推理加速框架）这两个项目，打破了这个看似无解的僵局 。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这套“双引擎”硬核地将纯视觉的图形操作能力塞进了本地电脑里，彻底打通了端侧大模型高效、安全落地的最后一公里。

Mano-P

“让 AI 在你的设备上替你操作电脑。”

估计不少朋友看到这句，第一反应就是前阵子红极一时的 Manus，或者是现在正火的 OpenClaw。确实，它们都能帮你接管电脑，但真要论起实操体验，这三者还是有着区别的。

Manus 确实聪明，它有“眼睛”，能看懂复杂的网页。但它只能在浏览器上应用，更别说根还在云端。而 OpenClaw 这种本地部署的智能体。它也不是绝对安全，执行在本地，但还是连接的云端模型。

![Image](https://mmbiz.qpic.cn/mmbiz_png/9wvRWyQEWCgzkhAAqwWfXqwWXNdqprduarQWE7Drib5LzGsdSVsKKf2ZcMp7AuO1SoCFFVQbNQs4kpTTibQicPwm8olRhlz3YkgibTd1hFbRCkk/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

所以，既要 Manus 的“眼力”，又要 OpenClaw 充满执行力，Mano-P 就是在这个死角里开源出来的。它让你的本地电脑直接长出了“手和眼”，能像真人一样看懂屏幕并直接操作 👇

很多人觉得在本地跑这种视觉模型，电脑肯定会卡死或者反应极慢，其实不然。Mano-P 在性能这块早就做好了深度“瘦身”。

就拿它的 4B 量化模型来说，在苹果 M4 Pro 芯片上，它的预填充速度能达到惊人的 476 tokens/s。从看屏幕到做出反应几乎是电光火石之间。更牛的是，相比于标准的 PyTorch CPU 推理，它的端侧提速超过了 60 倍，且坐标偏差被死死控制在 1 像素以内。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

而且它极其省资源，运行时的峰值内存仅仅只有 4.3GB。电脑分出这 4.3G 给它之后，剩下的内存也完全足够你顺畅地开着各种软件办公，基本感受不到它在后台运行的负担，更别提卡顿了 。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

就算真的遇到断网环境，它自带的离线长任务自主规划功能，依然能让模型在本地保持运行，安全感绝对拉满。

不过，对于端侧大模型来说，能提高一点性能当然要尽量提高一点。明略科技为了把 Mano-P 的潜能彻底榨干，并没有止步于此，而是还专门为这些大模型配了一个“外挂”，推理加速框架 Cider。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Cider

只要在 Mac 上折腾过大模型的朋友都知道，苹果官方的 MLX 框架是绝对的基石。那明略科技为什么非要“多此一举”，在 Mano-P 之外再外挂一个 Cider 呢？

原因很简单：官方提供的底座虽然很稳，但在压榨硬件极限的时候，存在一个“盲区”。如果你想让 AI 模型跑得又快又省电，通常会用到一种叫“INT8 激活量化”的压缩技术。

但这恰恰是原生 MLX 框架的短板，它在底层并没有给这种技术提供原生的硬件加速支持。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Cider 的诞生，就是为了充当一个“底层限速解锁器”。它直接跨过了限制，调用更底层的 API，硬生生在 Apple 的 GPU 上把这条缺失的高速公路给修通了，让设备能够支持 W8A8 和 W4A8 这两种极其高效的计算模式 。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这种改变带来的收益是很明显的。

反应速度直线飙升：只要切入 W8A8 模式，底层算子的计算效率比用原生 MLX 最高能快上将近一倍（提升约 1.4 到 2.2 倍）。这体现在体验上，就是 AI 看图、思考的停顿感大幅减少，操作更加跟手。

内存占用原地腰斩：如果使用 W4A8 模式，存放模型权重所需的内存直接减少了 50%。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

<video src="https://mpvideo.qpic.cn/0bc3eyd3gaahjaaoiph2enuvojwdwmtapmya.f10002.mp4?dis_k=6abcfd87d67a8b77d70df61d912e7fd1&amp;dis_t=1781495182&amp;play_scene=10120&amp;auth_info=c7SulaFZMWZssPOb9V1eMDJTKD9vShVmOk4tYjAbf2JIeB1UenYqKxtpJ2oEMFMQJlk=&amp;auth_key=b5a7bef57add8da338e4b1ebe24b8f37&amp;vid=wxv_4506668912872374273&amp;format_id=10002&amp;support_redirect=0&amp;mmversion=false" controls="">Your browser does not support video tags</video>

更难得的是，Cider 并没有被锁死在 Mano-P 身上。它是一个完全开源的通用生态插件。像大家平时常用的 Qwen（通义千问）、Llama、Mistral 等等，只要是能接入 MLX 生态的开源模型，统统可以使用 Cider 来白嫖加速。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

写在最后

Mano-P 和 Cider 的组合，算是打破了我们对本地大模型“又慢又笨”的偏见。它们证明了在对隐私和成本极其敏感的业务流中，端侧智能体才是真正的最优解。Mano-P 赋予了电脑“眼和手”，Cider 则在底层重构了算力引擎。

目前这两套项目都已经在 GitHub 上开源了。

Mano-P 开源地址：

https://github.com/Mininglamp-AI/Mano-P

Cider 开源地址：

https://github.com/Mininglamp-AI/cider

但最让我期待的，其实是明略科技接下来更为宏大的开源蓝图。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

特别是最后的训练方法，直接“授人以渔”，让更多团队都能低门槛地训练、微调出属于自己的端侧模型。

这已经不是单纯地开源一个工具了，而是直接把端侧 AI 自动化的整套“基础设施”端到了开发者面前。

属于本地数字员工全面接管电脑的时代，或许已经拉开了帷幕。

---

本文发表于公众号【莫理】

**关注我们，阅读更多精彩内容**

**▽▽▽**

AI产品前沿测评 · 目录

继续滑动看下一个

莫理

向上滑动看下一个