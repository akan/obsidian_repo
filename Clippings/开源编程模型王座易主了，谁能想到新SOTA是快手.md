---
title: "开源编程模型王座易主了，谁能想到新SOTA是快手"
source: "https://mp.weixin.qq.com/s/kXg8gatPuTX2eNJUOVT_yQ"
author:
  - "[[关注前沿科技]]"
published:
created: 2025-10-11
description: "还打败了GPT-5"
tags:
  - "快手KAT-Dev-72B-Exp"
  - "SWE-Bench榜首"
  - "强化学习框架"
abstract: "快手的KAT-Dev-72B-Exp编程模型在SWE-Bench认证榜单以74.6%的成绩夺得开源模型第一，并展示了强大的代码生成和物理规律可视化能力。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/YicUhk5aAGtDEBiauKrQOFPb8MuybGowibWzlE6IX2Zj0mJ2xQfYZakzHNtiaceWKj6eETnjkN9Y75v836mVtCOEyw/0?wx_fmt=jpeg)

关注前沿科技 [量子位](https://mp.weixin.qq.com/s/) *2025年10月11日 14:03*

##### 克雷西 发自 凹非寺量子位 | 公众号 QbitAI

开源编程模型王座，再度易主！

来自快手的 KAT-Dev-72B-Exp ，在SWE-Bench认证榜单以74.6%的成绩夺得开源模型第一。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDEBiauKrQOFPb8MuybGowibWvyuG43NfI6ol6Eq2J8ZMxDDtL5iaOiaS7LapcNProBia5jL3lw4I0GAMg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

KAT-Dev-72B-Exp是 KAT-Coder 模型的实验性强化学习版本。

而KAT-Coder同样表现不凡，在SWE-Bench认证榜单上击败了GPT-5（非Codex模式）和Claude 4 Sonnet。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtDEBiauKrQOFPb8MuybGowibWF3b9Fc2rEKAUib0NkdKp4ZXC0szicCUN8ibRCubvpvtyZUaYlFedp2w0Q/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

KAT-Coder可以在网页中复刻出一个《水果忍者》，计分和生命值系统都完整包含。

![Image](https://mmbiz.qpic.cn/mmbiz_gif/YicUhk5aAGtDEBiauKrQOFPb8MuybGowibWWAPe9q69xU631gqZq9IHf2b4OQFscSRNbWwyBjjdTC4kNlENrbpQbQ/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

而且模型支持在Claude Code等编程工具中使用，充当Claude模型的开源平替。

## 用代码让物理规律可视化

在官方X账号当中，开发团队陆续展示了KAT-Coder的更多成果。

比如这个赛博朋克时钟，点击即可触发立方体爆炸特性，将罗马数字散布到3D空间中，且包含霓虹灯和粒子效果。

![Image](https://mmbiz.qpic.cn/mmbiz_gif/YicUhk5aAGtDEBiauKrQOFPb8MuybGowibWSTAcaYdvvXMdices7kZvIPPvXVANSebR890HKOURiarjZyj8RgbONX9A/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

除了生成这种交互特效，KAT-Coder还非常擅长通过代码实现物理规律的可视化。

比如太阳系运行模拟，网友通过KAT-Coder用three.js制作出了3D动画，并且支持视角的立体旋转。

![Image](https://mmbiz.qpic.cn/mmbiz_gif/YicUhk5aAGtDEBiauKrQOFPb8MuybGowibW4U5YZYBY2xkIDSMeujyldalXxaE6B9lf2p9OlJibowBPYQrKpwmlMIA/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

还有这个建筑物爆破过程的动画，一座60层高的圆形塔楼在重力和冲击波的作用下倒塌，整个过程都遵循真实的物理规律。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

那么，KAT-Coder都运用了哪些关键技术呢？

## 强化学习后出现涌现行为

KAT-Coder通过多个训练阶段进行优化，包括中期训练、监督微调（SFT）与强化微调（RFT），以及大规模的Agentic强化学习。

中期训练 又可以分为两个阶段，第一阶段主要是增强模型与Agentic相关的综合能力，包括推理、指令遵循、工具使用、编码知识注入等。

第二阶段则是收集人类工程师标注的真实交付轨迹，并合成大量的轨迹数据，以增强端到端的需求交付能力，涵盖了八种任务类型和八种典型场景。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

SFT则使用高质量轨迹数据，让模型学习执行真实的下游任务，RFT则是让模型开始自由探索，为后续的RL阶段打下基础。

在RL阶段，针对软件开发场景，研发团队重点专注于三个关键组件—— 问题描述及其对应的分支代码、可执行环境和可验证的测试用例 。

团队从开源代码库和一些内部代码库收集Pull Request及其相关Issue，并根据这些代码库的Stars、PR活动和Issue内容过滤掉低质量数据。

然后，研发团队系统地构建可执行环境镜像，并为每个收集到的实例生成单元测试用例。除了软件工程数据外，还融入了其他可验证领域，例如数学和推理任务，进一步丰富了强化学习信号的多样性。

除了开源数据之外，团队还进一步收集并利用源自真实工业系统的匿名企业级代码库进行强化学习训练。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在强化学习扩展后，研发团队发现了模型的涌现行为。

这主要体现在模型完成任务所需要的互动次数减少，与SFT阶段刚完成时相比减少了32%。

另一方面则是RL阶段完成后，模型具备了同时调用多个工具的能力， 脱离了传统的顺序调用范式。

在这个强化学习过程的背后，还有快手团队自研的工业级强化学习框架 SeamlessFlow 。

## 工业级强化学习框架

SeamlessFlow通过创新的数据平面架构，对RL的训练逻辑和Agent做了彻底解耦，用以支持多智能体、在线强化学习训练等复杂场景。

具体来说，SeamlessFlow 引入了独立的数据平面层 ，彻底解耦了RL训练和智能体实现。

它不要求每个智能体去适配训练框架，而是在LLM服务和智能体之间插入了一个透明的代理层。

数据平面的核心是 Trajectory Manager （轨迹管理器），它像一个”隐形记录员”，静默地捕获所有经过的token级别输入输出。

当智能体向LLM发送请求时，Trajectory Manager会记录完整的输入；当LLM返回响应时，它同样会保存所有输出token，然后再转发给智能体。

数据平面的另一个关键组件是 Rollout Manager （推理管理器），它负责协调整个系统的运行节奏。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在使用32张H800 GPU进行的对比测试显示，相比主流的VERL框架，SeamlessFlow在单轮RL任务（8k token上下文）中实现了100%的吞吐量提升，整体训练时间减少62%。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在Kwai-Coder及KAT-Dev-72B-Exp当中，团队还引入了 Trie Packing 机制，并对训练引擎进行了重构优化，使模型能够高效地在共享前缀轨迹上开展训练。

在大规模agentic训练场景中，Agent在完成任务时所产生的token轨迹通常呈树形结构，业界过往都是将树形轨迹拆解为若干条独立的线性序列。

研发团队则 重写了训练引擎以及attention kernel ，通过树形梯度修复权重，把共享前缀的前反向重复的计算合并，让模型能高效地在共享前缀的轨迹上进行训练，最终速度平均提升了2.5倍。

结合难度感知的策略优化，研发团队实现了探索与利用的平衡，并结合基于开源仓库构建的大规模端到端可验证软件工程任务，让KAT-Dev-72B-Exp在编程领域展现出强大的能力。

参考链接：  
\[1\]https://mp.weixin.qq.com/s/BHfXI7mHqCq2tl41KbHYEQ  
\[2\]https://mp.weixin.qq.com/s/Zi0X-rptBbEhwxTdd47i5w  
\[3\]https://x.com/KwaiAICoder/status/1976588769785692240

**一键三连** **「点赞」「转发」「小心心」**

**欢迎在评论区留下你的想法！**

— **完** —

  

****🏆**** 年度科技风向标 ****「2025人工智能年度榜单」**** **评选报名** **开启 啦** ！我们正在寻找AI+时代领航者 [点击了解详情](https://mp.weixin.qq.com/s?__biz=MzIzNjc1NzUzMw==&mid=2247824943&idx=1&sn=fe5b1e862916b886724ca1e85bbc6ea4&scene=21#wechat_redirect)

❤️🔥 企业、产品、人物3大维度，共设立了5类奖项，欢迎企业报名参与 👇

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**一键关注 👇 点亮星标**

**科技前沿进展每日见**

  

继续滑动看下一个

量子位

向上滑动看下一个