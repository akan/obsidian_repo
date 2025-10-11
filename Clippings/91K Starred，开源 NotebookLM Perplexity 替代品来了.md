---
title: "9.1K Starred，开源 NotebookLM/Perplexity 替代品来了!"
source: "https://mp.weixin.qq.com/s/9AO1gDu89cHllnAtD4nBaw"
author:
  - "[[kakuqo]]"
published:
created: 2025-10-11
description:
tags:
  - "开源AI研究代理"
  - "个人知识管理"
  - "私有数据连接"
abstract: "SurfSense是一个开源AI研究代理，能够连接个人和团队的私有数据源，提供类似Perplexity的搜索体验，同时支持本地化部署保护隐私。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ac0vwH1QkxAJOB6GzTxoBpiaKU3RwGN9VxQuvFqDGkG2WZFvp3CtwUC0mniagUemq10sOGTHCmS8mic6cUpQY5kVw/0?wx_fmt=jpeg)

Original kakuqo [AI真好玩](https://mp.weixin.qq.com/s/) *2025年10月11日 10:46*

我们每天都在和海量的信息打交道，但这些信息却散落在各个角落。当需要查找某个具体信息时，我们往往要在多个应用和服务之间来回切换，过程繁琐且低效。

虽然 **Perplexity** 或 **NotebookLM** 这类工具在公共信息研究上表现出色，但它们无法触及我们个人和团队的私有数据。如果能有一个工具，既能像 **Perplexity** 一样强大，又能完全连接和理解我们自己的知识库，是不是很完美？

这就是开源项目 **SurfSense** 想要解决的问题。它是一个高度可定制的 AI 研究代理，旨在成为你所有个人和工作知识的统一入口。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/ac0vwH1QkxAJOB6GzTxoBpiaKU3RwGN9VqrhYMGPDflwQjc0DD2UxqR2uohpU0nRLSroe5M4AP84D1wMneZWNaA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

[52.2K Starred 开源超强 AI 爬虫工具来了！](https://mp.weixin.qq.com/s?__biz=MzA5NDMwMTU3OA==&mid=2247486913&idx=1&sn=87e9f9f9166aeb1048c7eaf18fb0e19f&scene=21#wechat_redirect)

[厌倦了快 680MB 的 Ollama？小于 5MB 的轻量替代品来了，还兼容 OpenAI API！](https://mp.weixin.qq.com/s?__biz=MzA5NDMwMTU3OA==&mid=2247487005&idx=1&sn=4331587caa9c7a6640ce8896ae20165e&scene=21#wechat_redirect)

[ElevenLabs 开源替代品来了：支持 23 种语言语音克隆，效果媲美商业闭源模型，免费可商用！](https://mp.weixin.qq.com/s?__biz=MzA5NDMwMTU3OA==&mid=2247487046&idx=1&sn=b57f8c9612c7b19781e9a74d9ac7273c&scene=21#wechat_redirect)

## 核心价值：连接而非替代

SurfSense 的设计理念不是要替代你正在使用的工具，而是将它们连接起来。它通过集成大量的外部数据源，让你能用自然语言与你所有的信息进行对话。

想象一下，你可以直接向 SurfSense 提问：“上周我们在 Slack [#dev](https://mp.weixin.qq.com/s/) 频道里讨论的那个关于数据库性能优化的方案是什么？顺便把 Jira 上相关的任务链接也找出来。” SurfSense 会帮你完成信息的检索、整合，并给出附带来源的精准答案。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/ac0vwH1QkxAJOB6GzTxoBpiaKU3RwGN9V9suCqudBuzbHu9Phuhgg8ZA88ISlbfqOyUde6vcLoicfdyrrSzYsmvQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

## 不只是搜索，更是你的知识中枢

SurfSense 的强大之处在于其广泛的连接性和对隐私的尊重。

### 广泛的数据源支持

它支持连接开发者日常工作流中的各种工具：

- **团队协作:** Slack, Jira, Confluence, Linear, ClickUp, Discord
- **个人知识:** Notion, Gmail, Google Calendar, Airtable, Luma
- **代码与开发:** GitHub
- **公共信息:** Tavily, LinkUp 等搜索引擎，以及 YouTube 视频

此外，你可以上传超过 50 种不同格式的本地文件，包括文档、图片甚至视频。通过浏览器扩展，还能一键保存需要登录才能访问的网页内容。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 隐私优先与本地化部署

最关键的一点是，SurfSense 是开源且可以自托管的。这意味着你的所有数据都可以保留在自己的服务器上。它完美支持 Ollama，让你可以使用本地运行的 LLM，彻底打消数据隐私的顾虑。

### 坚实的技术底座

对于追求技术细节的开发者来说，SurfSense 的后端实现同样值得关注：

- **现代化的技术栈:** 后端采用 FastAPI，前端为 Next.js 15 和 React 19。
- **先进的 RAG 技术:** 它不仅仅是简单的向量搜索。SurfSense 采用了分层索引（2 tiered RAG）、混合搜索（结合语义与全文检索）以及 Reranker（如 Pinecone, Cohere）来提升答案的精准度。
- **高度的可扩展性:** 支持超过 100 种 LLM 和 6000 多种 Embedding 模型。

### 播客生成器

SurfSense 还有一个有趣的功能：它能将你的聊天对话快速转换成一段播客。这个“播客代理”可以在 20 秒内生成 3 分钟的音频，并支持 OpenAI, Azure, Google Vertex AI 以及本地的 TTS 服务。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 如何开始？

项目提供了两种安装方式：

1. **Docker (推荐):** 这是最简单的方式，所有依赖都被打包在容器中，通过 `.env` 文件进行配置即可快速启动。
2. **手动安装:** 为那些希望对部署有更多控制权的开发者准备。

在开始之前，你需要准备一些前置条件，比如配置 PGVector 数据库，并根据需求选择文件处理服务（如 Unstructured.io, LlamaIndex 或本地的 Docling）。

## 总结

SurfSense 目前仍在积极开发中，虽然还未到生产可用的阶段，但其清晰的价值主张、扎实的技术选型和对开发者核心痛点的精准把握，让它成为一个非常值得关注的开源项目。

> 项目地址： https://github.com/MODSetter/SurfSense

欢迎您与我交流 AI/n8n

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

关注 AI 真好玩，带你玩转各类 AI 工具，掌控数字未来！

如果这篇文章对您有所帮助，请点赞、关注，并分享给您的朋友。

继续滑动看下一个

AI真好玩

向上滑动看下一个