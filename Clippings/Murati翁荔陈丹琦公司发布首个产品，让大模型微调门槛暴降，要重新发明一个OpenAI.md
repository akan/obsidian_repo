---
title: "Murati翁荔陈丹琦公司发布首个产品，让大模型微调门槛暴降，要重新发明一个OpenAI"
source: "https://mp.weixin.qq.com/s/fFcj-E1pjXVebdLWv1Vtgw"
author:
  - "[[关注前沿科技]]"
published:
created: 2025-10-14
description: "梦晨 发自 凹非寺量子位 | 公众号 QbitAIThinking Machines Lab发布首个产品：Th"
tags:
  - "大模型微调"
  - "API工具"
  - "基础设施简化"
  - "研究生产力"
abstract: "Thinking Machines Lab发布名为Tinker的首个产品，通过简化基础设施让大模型微调变得像修改Python代码一样简单，旨在降低研究门槛并重新构建早期OpenAI的开放研究模式。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/YicUhk5aAGtB6cLwSUfvgn2EoUtBEgzdCIQpuxic2tjmwbx87ficQiaxcYMXRLNYAGcE4yGibgJh0Rlwch5CDj9jtuw/0?wx_fmt=jpeg)

关注前沿科技 [量子位](https://mp.weixin.qq.com/s/) *2025年10月02日 11:23*

##### 梦晨 发自 凹非寺量子位 | 公众号 QbitAI

Thinking Machines Lab发布首个产品： Thinker ，让模型微调变得像改Python代码一样简单。

也算是终于摘掉了“0产品0收入估值840亿”的帽子。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtB6cLwSUfvgn2EoUtBEgzdCnuZ2sdo7X11fZ0T0tVZVGsiavTPu6ItKQ2IjnricedWicoXwJs4ejAgUA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

联合创始人 翁荔 表示：GPU价格昂贵，并且设置基础设施非常复杂，使研究人员和从业者使用前沿模型进行具有挑战性，Tinker是提供高质量的研究工具、提高研究生产力的第一步。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtB6cLwSUfvgn2EoUtBEgzdCyicvRdQLBm7lGIRKs1IRBQGQzIoDN3M3SBia2n6LAeQdksTvfU1rgfZg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

大神卡帕西直接评价这个产品“很酷”：

相比那种“上传数据，我们帮你训练”的传统模式，Tinker让研究者保留了90%的控制权，主要涉及数据、损失函数和算法本身，而把那些通常不想碰的硬骨头（基础设施、LLM本身的前向/后向传播、分布式训练）都包办了。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtB6cLwSUfvgn2EoUtBEgzdCGq9ALUiaibXBibK0KSFQB10tN9o050vswfxU3wz5FuQkJJickxSqc9d75g/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

与此同时，还有消息称Thinking Machines Lab正在尝试 “重新发明一个OpenAI” ，重建OpenAI在规模变大、变的官僚主义之前的那个版本。

创始人Murati 表示，Thinking Machines Lab将 会 是一家公开分享研究成果，给研究人员更多自由的公司。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtB6cLwSUfvgn2EoUtBEgzdCLMo6icGT7YHIBJJ6ezM78A5sqmCJdzseEJ3EFG4hOicAdwUPoUT79Xyg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

## 什么是Tinker

简单来说，Tinker是一个用于微调语言模型的灵活API。

让研究人员能够在实验中控制算法和数据，同时无需担心基础设施的管理。

这符合Thinking Machines Lab的使命：让更多人能够研究前沿模型，并根据自身需求进行定制。

Thinker首批主要提供Qwen3和Llama3系列模型的支持，从小模型切换到大模型，只需在Python代码中修改一个字符串就行。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtB6cLwSUfvgn2EoUtBEgzdCKJwWM1ulMqb8zhCtsELPibgTdyaZA95ErClYfdCSpXDjyibVziclZD4NQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

Thinker的API提供了forward\_backward和sample这样的底层训练步骤，同时仍自动处理调度、扩展和错误恢复。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtB6cLwSUfvgn2EoUtBEgzdCT3tVehscLtUJicCnFtLLDcwReMZEacJ79Ribic3flElxdInChVTHnLDLA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

还使用LoRA让多个训练任务共享相同的 GPU，降低成本并让更多实验并行运行。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtB6cLwSUfvgn2EoUtBEgzdCbbCibKVkAgiczJiaIiaZSdjYhMh0A8iaZCP3c2uZoGSHiazaIxso4laO0QKg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

除了云托管服务之外，他们还开源了一个Tinker Cookbook库，里面有各种现成的后训练方法实现。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtB6cLwSUfvgn2EoUtBEgzdC2wKeicOT6fJh174JnTDaqlqokNlXN7zcFribibfnzTkhzib98upE3ThBGA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

有微软研究员检查了Tinker的代码库，发现了更多细节：

没有用DeepSeek提出的GRPO方法，而是使用更经典的REINFORCE算法，配合优势函数，没有梯度裁剪。

简单概括其梯度更新策略为：

新参数 = 原参数 + 学习率 × 优势值 × 对数概率的梯度

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Tinker受到了业界的密切关注。AI基础设施公司Anyscale的CEO Robert Nishihara等beta测试者表示，尽管市面上有其他微调工具，但Tinker在“抽象化和可调性之间取得了卓越的平衡”

来自普林斯顿、斯坦福、伯克利和Redwood Research的研究团队则已经用Tinker搞出不少成果。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

大神卡帕西还在评论中特别指出，社区还在探索微调相比直接prompt大模型的优势在哪。

从早期迹象看，微调不只是给大模型的输出换个风格，更多是缩小任务范围。特别是当你有训练样本数量很大时，与其给大模型构建复杂的few-shot prompt，不如直接微调一个小模型专门处理特定任务。

越来越多的AI应用变成了更大规模的流水线，其中许多大模型在流程中协作，其中一些环节适合用提示，但更多环节用微调可能会更好。

Tinker让微调变得简单，可以在任意环节中实验出最佳方案。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## One More Thing

Thinking Machines Lab这边尝试重新发明一个OpenAI。

OpenAI则正在把自己变成下一个Meta。

除了Sora 2驱动的“AI抖音”之外，ChatGPT的APP代码中也被扒出要搞“社交模式”。

具体来说是在“推送通知”功能中包括ChatGPT和“其他用户”发送的消息。

“当有人加入或离开聊天时推送通知”更意味着可能有群聊模式。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

与社交模式配套的设置头像和昵称功能也已经出现了。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

也是没想到，ChatGPT中的“Chat”也可以包括人类之间的聊天。

参考链接：  
\[1\]https://thinkingmachines.ai/blog/announcing-tinker/  
\[2\]https://x.com/lilianweng/status/1973455232341516731  
\[3\]https://x.com/theinformation/status/1973043939667058817  
\[4\]https://x.com/karpathy/status/1973468610917179630  
\[5\]https://x.com/DimitrisPapail/status/1973470706135605534  
\[6\]https://x.com/btibor91/status/1973512279141622185

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