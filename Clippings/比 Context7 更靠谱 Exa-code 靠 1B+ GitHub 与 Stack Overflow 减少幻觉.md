---
title: "比 Context7 更靠谱：Exa-code 靠 1B+ GitHub 与 Stack Overflow 减少幻觉"
source: "https://mp.weixin.qq.com/s/d8tFxQQ-_5O30CiLHT5BrA"
author:
  - "[[Aitrainee]]"
published:
created: 2025-09-26
description: "🍹 Insight Daily 🪺"
tags:
  - "AI编程辅助"
  - "代码幻觉减少"
  - "检索增强生成"
abstract: "Exa-code 是一个通过检索超过10亿个GitHub和Stack Overflow文档来减少AI代码幻觉的编程工具。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/Sn1tJhGWmibt0UibIzaQW16RMwKicqQq2Zhib18ibKQfYFqiaFLJIse4pgpvYkN5d4ZjxlkZXiabG7U5huiaIpxtT7xZ1A/0?wx_fmt=jpeg)

Original Aitrainee [AI进修生](https://mp.weixin.qq.com/s/) *2025年09月26日 15:47*

🍹 Insight Daily 🪺  

##### Aitrainee | 公众号：AI进修生

Hi，这里是Aitrainee，欢迎阅读本期新文章。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/Sn1tJhGWmibt0UibIzaQW16RMwKicqQq2ZhcfnZmicYUbE0wpWlicFl0Jp3HPicJQgZD6Qu0IAKxqCqPQFqF1TsMy8gw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

氛围编码永远不应该有不好的氛围。

”Exa-code 是消除 LLM 代码幻觉的一大步“ By Exa.

![Image](https://mmbiz.qpic.cn/mmbiz_png/Sn1tJhGWmibt0UibIzaQW16RMwKicqQq2ZhnhFXQNbatcQKfoazrFlJ2KfIJ6yvknr43JQsw5JibibZO4Mic9Sb35t1w/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

好了，这是第2个，以前我们聊过一个的，叫做context7： [AI 写代码总是翻车？Upstash 创始人怒推 Context7：给 LLM 喂上最新鲜的官方文档。](https://mp.weixin.qq.com/s?__biz=MzkyMzY1NTM0Mw==&mid=2247504642&idx=1&sn=bdf3c554653c87eb5563c06652bfb884&scene=21#wechat_redirect)

  

Exa团队索引了超过1B+的文档页面、GitHub 仓库、Stack Overflow 帖子等内容。

  

给定一个查询，exa-code 会对这些数据进行混合搜索、分块处理，并返回一个拼接起来的、token 高效的字符串。在Exa的代码幻觉评估中，exa-code 的表现超越了所有流行的网页搜索工具（包括 Exa 自身！）。

  

### 为编码代理提供快速、高效的 Web 上下文

LLM仍然对编写最佳代码所需的数百万个库、API 和 SDK 没有很好的了解。

  

exa-code 是第一个为编码代理制作的 Web 规模上下文工具。给定搜索查询，exa-code 会从 Web 返回准确的几百个令牌，以便为编码代理提供正确的信息。

  

不同方法在“技术文档数据集”上的代码幻觉率（Halucination Rate %）。这个指标越低，说明AI生成代码的“胡说八道”程度越小，越靠谱，exa-code 27.1%最低< exa Auto:

![Image](https://mmbiz.qpic.cn/mmbiz_png/Sn1tJhGWmibt0UibIzaQW16RMwKicqQq2ZhyFDhhiaSuo1NtUSYE0INhS7QqwrBbMf9tHS05ESft7KBAwOYaIIiaWNQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)
- No RAG (无检索增强生成)： 幻觉率 45.9%， 这代表如果AI纯粹依靠自身“记忆”来写代码，错误率将近一半。
- Brave, Context7, GPT-5 Web Tool Use, Exa Auto： 这些代表了市面上其他一些常见的AI辅助编码方法或工具，它们的幻觉率在 33.3%到34.8% 之间。虽然比No RAG好不少，但依然意味着AI在写代码时，还有三分之一的概率会“犯糊涂”。

好吧，他们还是把context7没有避讳的放进去了。GPT5这个网页搜索也在里面。难道calude没有相关的吗。。

  

Exa-code之所以能做到这一点，核心技术有两点：

  

exa-code 是一个 编程信息检索工具 ，特别擅长提供 精炼的代码示例 来帮助 AI 解决复杂的编程任务，比如配置环境、调用 API 或使用 SDK。

  

它不是漫无目的地搜索，而是 有针对性地提供数百个 token 的核心代码或说明 ，并且可以被用户或 AI 在提示词中 明确调用 。

  

1. 1\. Exa专为AI构建的搜索引擎： 这是从底层为AI的需求而设计的。它能更精准地理解AI在编码场景下的真实意图，并找到最相关的、最权威的“一手资料”。
2. 
3. 2\. 高效返回上下文（Hundreds of tokens, not thousands）： 传统的RAG（检索增强生成）工具可能会返回大量不必要的文本，让AI“信息过载”。而exa-code的聪明之处在于，它只返回“几百个token”，而不是“几千个”， 精确地提供了AI编写正确代码所需的“核心上下文” 。这减少了AI处理无效信息的时间和成本。
4.

## 工作原理

exa-code 背后的理念是：为编程代理（coding agents）提供的网络上下文必须 极其相关且信息极其密集 。

  

在幕后，exa-code 高度优先将代码示例放入上下文中 ，因为它们既高效又有效。以下是完整的工作流程：

  

1. 1\. Exa 混合搜索（hybrid searches） 超过10亿个网页，找到与搜索查询最相关的网页。
2. 
3. 2\. 从这些网页中 提取代码示例 ，并使用一种 集成方法（ensemble method） 重新排序其相关性，以最大化 召回率（recall）和质量 。
4. 
5. 3\. 如果代码示例足以回答查询，会返回一个通常 只有几百个 token 长度 的拼接字符串。否则，会返回完整的文档页面（例如，某个文档的 API 页面，它不是用代码而是用英文描述 API 的）。

  

在这个例子中，exa-code 展示了如何使用 Nix 设置一个可重现的 Rust 开发环境。它使用了不到 500 个 token 的信息，并通过在提示词中包含 "exa-code" 来触发。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

通常情况下，代理（agent）会在以下情况中发现 exa-code 很有用：

- 更新应用程序的配置。
- 调用 Exa 或 Slack 等 API 端点。
- 使用 Boto3 (AWS) 或 AI-SDK 等 SDK。

  

安装地址，有三个地方，我给你放这了：

  

"https: //mcp.exa.ai/mcp", 可以看到它是使用这个http端点的，安装非常方便，没有任何环境限制。一键启用。

  

https://smithery.ai/server/exa

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

https://reurl.cc/6qOWxV

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

https://github.com/exa-labs/exa-mcp-server

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

要调用这个mcp可以在提示：use exa-code

  

以往MCP文章， 汇总 入口： [继微软Playwright之后，谷歌Chrome DevTools MCP也来了（网站开发，AI 自动调试控制台错误）](https://mp.weixin.qq.com/s?__biz=MzkyMzY1NTM0Mw==&mid=2247511873&idx=1&sn=d77787d14ed966f08d65065437a8ceaa&scene=21#wechat_redirect)

以上。

🌟 知音难求，自我修 **炼亦艰， 抓住前沿技术的机遇，与我们一起成为创新的超级个体 （把握AIGC时代的个人力量）。**

**点这里👇关注我，记得标星哦～**

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![](https://mmbiz.qlogo.cn/sz_mmbiz_jpg/Ok2E6oQHUIFOhFpiaiaHstWFBTF2CsPA37knNDuTpuwPfUs5UumJoiczWtxkiaZQPPVNjiaCCWwrlkiaD0zqUqsKVUFw/0?wx_fmt=jpeg)

暗色模式，我贼亮

继续滑动看下一个

AI进修生

向上滑动看下一个