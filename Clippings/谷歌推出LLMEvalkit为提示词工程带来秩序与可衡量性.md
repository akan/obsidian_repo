---
title: "谷歌推出LLM-Evalkit，为提示词工程带来秩序与可衡量性_AI&大模型_InfoQ精选文章"
source: "https://www.infoq.cn/article/aPesHkV4tc0jXgosPcQZ"
author:
  - "[[郝振佳 | 中设数字 前端架构师]]"
  - "[[刘炜清 | 微软亚洲研究院 机器学习组首席研究员]]"
  - "[[周健 | 澜码科技 创始人兼CEO]]"
  - "[[OceanBase 数据库]]"
  - "[[阿里巴巴云原生]]"
  - "[[杰哥的技术杂货铺]]"
  - "[[北京好雨科技有限公司]]"
  - "[[声网]]"
  - "[[H]]"
  - "[[jialuooooo]]"
published:
created: 2025-10-24
description: "谷歌推出LLM-Evalkit，为提示词工程带来秩序与可衡量性"
tags:
  - "提示词工程"
  - "开源框架"
  - "数据驱动"
  - "性能评估"
  - "团队协作"
abstract: "谷歌推出开源工具LLM-Evalkit，通过统一的数据驱动工作流使提示词工程变得有序且可衡量。"
---
**

**

**

**

**

## 谷歌推出 LLM-Evalkit，为提示词工程带来秩序与可衡量性

作者：Robert Krzaczyński

- 明知山

- 2025-10-23
	北京
- 本文字数：1121 字
	阅读完需：约 4 分钟



00:00

[1.0x **](https://www.infoq.cn/article/)

大小：565.78K 时长：03:13

<audio xmlns="http://www.w3.org/1999/xhtml" title="谷歌推出LLM-Evalkit，为提示词工程带来秩序与可衡量性" src="https://static001.geekbang.org/infoq/audio/b623e35f57d32218bddf4003d8b276f8.mp3"></audio>

![谷歌推出LLM-Evalkit，为提示词工程带来秩序与可衡量性](https://static001.infoq.cn/resource/image/9b/a1/9bcf66c91eaeebaba6963f5a1496b7a1.jpg)

谷歌推出 [LLM-Evalkit](https://cloud.google.com/blog/products/ai-machine-learning/introducing-llm-evalkit?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3NjExOTYwMDgsImZpbGVHVUlEIjoidlZBWE1WWlhYWVVZNU8zbSIsImlhdCI6MTc2MTE5NTcwOCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwicGFhIjoiYWxsOmFsbDoiLCJ1c2VySWQiOjk4NDE5MjEyfQ.maDLUb68uaOCLOtLAMzx2oObcfRpJOQPhN7aIZzQFoo) ，一个基于 Vertex AI SDK 构建的开源框架，旨在让大语言模型的提示词工程变得更加有序且可衡量。这款轻量级工具旨在用统一的、数据驱动的工作流取代以往分散的文档和基于猜测的迭代方式。

  

正如 Michael Santoro 所指出的，任何与大语言模型合作过的人都深知其中的痛点：他们在一个控制台中进行实验，然后在其他地方保存提示词，并且对结果的衡量缺乏一致性。LLM-Evalkit 将它们整合到一个连贯的环境中——一个可以创建、测试、版本化和并排比较提示词的地方。通过保留变更的共享记录，团队终于能够清晰地跟踪哪些提示词改进提升了性能，而不再依赖于模糊的记忆或繁琐的电子表格。

  

该工具包的核心理念很简单：停止猜测，转而进行精准衡量。与其凭借主观感受去评判哪个提示词“似乎”更好，用户可以明确地定义一个具体任务，精心构建一个具有代表性的数据集，并借助客观的指标来评估输出结果。这一框架让每一次的改进都变得可量化，将原本的直觉判断转变为有据可依的实证分析。

  

这种方法与现有的谷歌云工作流无缝集成。LLM-Evalkit 基于 Vertex AI SDK 构建，并与谷歌的专业评估工具紧密相连，从而在实验与性能跟踪之间搭建起一个结构化的反馈循环。团队能够便捷地运行测试、精准地比较输出结果，并且为所有提示词的迭代维护一个权威且统一的真实数据源，无需在多个复杂环境中来回切换。

  

与此同时，谷歌在设计该框架时充分体现了包容性理念。LLM-Evalkit 提供了无代码界面，极大地降低了操作门槛，使得从开发人员、数据科学家到产品经理、用户体验（UX）作家等更广泛的专业人士群体都能轻松上手。通过降低技术障碍，有力地促进了技术团队成员与非技术团队成员之间的快速迭代和紧密协作，真正将提示设计词打造为一项跨学科的协同工作。

  

Santoro 在 LinkedIn 上 [表达](https://www.linkedin.com/posts/michael-santoro-0a670772_introducing-llm-evalkit-google-cloud-blog-activity-7383612682106621953-IS4G?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAACX5yoEBhsg1xPtc5iaJXHCu_Rv298CmfZA&accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3NjExOTYwMDgsImZpbGVHVUlEIjoidlZBWE1WWlhYWVVZNU8zbSIsImlhdCI6MTc2MTE5NTcwOCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwicGFhIjoiYWxsOmFsbDoiLCJ1c2VySWQiOjk4NDE5MjEyfQ.maDLUb68uaOCLOtLAMzx2oObcfRpJOQPhN7aIZzQFoo) 了他的兴奋之情：

> 我十分荣幸地宣布，我参与开发了一个全新的开源框架——LLM-Evalkit！它旨在为在谷歌云上使用大语言模型的团队简化提示词工程流程。

  

这一宣布引起了该领域从业者的广泛关注。一位用户在 LinkedIn 上 [评论](https://www.linkedin.com/feed/update/urn:li:activity:7383612682106621953?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7383612682106621953%2C7384808029461983232%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287384808029461983232%2Curn%3Ali%3Aactivity%3A7383612682106621953%29&accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3NjExOTYwMDgsImZpbGVHVUlEIjoidlZBWE1WWlhYWVVZNU8zbSIsImlhdCI6MTc2MTE5NTcwOCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwicGFhIjoiYWxsOmFsbDoiLCJ1c2VySWQiOjk4NDE5MjEyfQ.maDLUb68uaOCLOtLAMzx2oObcfRpJOQPhN7aIZzQFoo) 道：

> 这看起来非常棒。我们一直苦于没有一个集中化的系统来跟踪提示词，尤其是当模型不断升级时这个问题愈发凸显。我迫不及待地想试用一下。

  

LLM-Evalkit 已经作为开源项目在 [GitHub](https://github.com/GoogleCloudPlatform/generative-ai/tree/main/tools/llmevalkit?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3NjExOTYwMDgsImZpbGVHVUlEIjoidlZBWE1WWlhYWVVZNU8zbSIsImlhdCI6MTc2MTE5NTcwOCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwicGFhIjoiYWxsOmFsbDoiLCJ1c2VySWQiOjk4NDE5MjEyfQ.maDLUb68uaOCLOtLAMzx2oObcfRpJOQPhN7aIZzQFoo) 上发布，并且与 Vertex AI 实现了深度集成，同时谷歌云控制台中还提供了详细的教程供用户参考。新用户可以充分利用谷歌提供的 300 美元试用积分来探索这一强大的工具。

  

借助 LLM-Evalkit，谷歌致力于将提示词工程从一种依赖直觉的即兴调整转变为一种可重复、透明且不断进化的流程——每一次迭代都将使其变得更加智能、高效。

  

【声明：本文由 InfoQ 翻译，未经许可禁止转载。】

  

**查看英文原文** ： [https://www.infoq.com/news/2025/10/llm-evalkit/](https://www.infoq.com/news/2025/10/llm-evalkit/?accessToken=eyJhbGciOiJIUzI1NiIsImtpZCI6ImRlZmF1bHQiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3NjExOTYwMDgsImZpbGVHVUlEIjoidlZBWE1WWlhYWVVZNU8zbSIsImlhdCI6MTc2MTE5NTcwOCwiaXNzIjoidXBsb2FkZXJfYWNjZXNzX3Jlc291cmNlIiwicGFhIjoiYWxsOmFsbDoiLCJ1c2VySWQiOjk4NDE5MjEyfQ.maDLUb68uaOCLOtLAMzx2oObcfRpJOQPhN7aIZzQFoo)  

2391

** [AI&大模型](https://www.infoq.cn/topic/AI&LLM)

** 轻点一下，留下你的鼓励

![](https://static001.infoq.cn/resource/image/63/d3/637e62da37cb9585747yy7a353ebd9d3.png)

## 评论

发布

暂无评论

### 推荐阅读

- ###### 给所有开发者朋友的一封邀请函：Microsoft Build 要来中国啦！
	** [AI&大模型](https://www.infoq.cn/topic/AI&LLM) [微软](https://www.infoq.cn/topic/Microsoft) [企业动态](https://www.infoq.cn/topic/%20industrynews)
- ###### 字节跳动回应 140 万美元年薪挖角 OpenAI；天涯社区疑似关停，已无力偿还数千万服务器费用；寒武纪否认恶意裁员 | AI 一周资讯
	** [AI&大模型](https://www.infoq.cn/topic/AI&LLM) [技术管理](https://www.infoq.cn/topic/management) [企业动态](https://www.infoq.cn/topic/%20industrynews) [性能优化](https://www.infoq.cn/topic/1213) [生成式 AI](https://www.infoq.cn/topic/1183) [芯片&算力](https://www.infoq.cn/topic/1187) [团队搭建](https://www.infoq.cn/topic/1206) [芯片与网络](https://www.infoq.cn/topic/1203) [字节跳动](https://www.infoq.cn/topic/1167) [工业](https://www.infoq.cn/topic/1173) [行业深度](https://www.infoq.cn/topic/1168)
- ###### 腾讯披露自研芯片“沧海”最新进展
- ###### 谷歌 Bard 被曝剽窃 ChatGPT？回应来了......
	** [AI&大模型](https://www.infoq.cn/topic/AI&LLM) [大数据](https://www.infoq.cn/topic/bigdata) [企业动态](https://www.infoq.cn/topic/%20industrynews) [方法论](https://www.infoq.cn/topic/methodologies) [机器学习/深度学习](https://www.infoq.cn/topic/1185) [生成式 AI](https://www.infoq.cn/topic/1183)
- ###### 跬智信息（Kyligence）推出开源云原生数据底座玄武：全面兼容国产化软硬件体系，比原生 Spark 节约近 40% 的 IT 成本
- ###### 架构师（2023 年 2 月）

![腾讯云云原生提质增效实践精选集2024](https://static001.geekbang.org/resource/image/b2/3a/b2d38d808688b286ac30e7618db46b3a.png?x-oss-process=image/resize,w_310,h_422)

###### 腾讯云云原生提质增效实践精选集 2024

《2024腾讯云云原生提质增效实践精选集》出炉，5大热门技术领域，13个行业精选标杆案例，痛点到解决方案全...

![可扩展的低代码平台前端架构设计](https://static001.geekbang.org/con/87/pdf/2845202116/image/page-001.jpg?x-oss-process=image/resize,w_532,h_300)

可扩展的低代码平台前端架构设计

MarS：由生成式基础模型驱动的金融市场仿真引擎

基于大语言模型的AI Agent架构及金融行业实践

#### 阿里云刘伟光：3.5万字拆解核心系统转型，核心从业者如何寻得“出路”

#### 如何快速调度 PTS 的百万并发能力

#### 从零开发区块链应用(一)--golang配置文件管理工具viper

#### 在Rainbond上使用Locust进行压力测试

#### 当基础设施故障后，声网 SD-RTN 如何保障 RTE 服务的高可用性

#### 【组件攻击链】一文看懂Spring全家桶各类RCE漏洞

#### 架构实战营 4 期第五模块作业

#### Spring都在用的技术，你确定不过来看看？1️⃣

#### 使用MSF生成shellcode

#### 2021年小总结暨2022年打脸计划

#### 逐鹿万亿赛道：智能重卡规模量产的困境与进化

#### 蚂蚁大规模 Sigma 集群 Etcd 拆分实践

#### 谈A股投资策略--《香帅中国财富报告》摘录（5/100）

#### 实时云渲染，汽车产业数字化转型新动能

#### 金融云原生漫谈（六）｜安全平稳高于一切的金融行业，如何构建云原生安全防线

#### 一个cpp协程库的前世今生（二十）外部调度

#### 从零开发区块链应用(三)--mysql初始化及gorm框架使用

#### 混合云应用双活容灾最佳实践

#### 网关流控利器：结合 AHAS 实现 Ingress/Nginx 流量控制

#### VuePress 博客优化之拓展 Markdown 语法

#### 架构实战营：模块五作业

#### Ubuntu16.04/Scala2.11.8安装教程

#### 从零开发区块链应用(二)--mysql安装及数据库表的安装创建

#### 使用 google\_breakpad 分析 Electron 崩溃日志文件

#### Discord模式等十大场景，环信带你玩转泛娱乐行业

#### 创新推出 | Serverless 场景排查问题利器：函数实例命令行操作

#### 基于 Prometheus 的边缘计算监控实践

#### 最佳实践 | 如何避免一行错误代码造成的血案？

#### 软件架构治理 之 架构优化方向



![](https://static001.infoq.cn/resource/image/a1/ae/a157c202a4bb96f05cddaebf2399d1ae.png)

- [关于我们](https://www.infoq.cn/about)
	[我要投稿](https://www.infoq.cn/contribute)
	[合作伙伴](https://www.geekbang.org/partner)
	[加入我们](https://www.lagou.com/gongsi/j43775.html)
	[关注我们](https://infoq.cn/official/account)
- 联系我们
	[内容投稿：editors@geekbang.com](https://www.infoq.cn/article/)
	[业务合作：hezuo@geekbang.com](https://www.infoq.cn/article/)
	[反馈投诉：feedback@geekbang.com](https://www.infoq.cn/article/)
	[加入我们：zhaopin@geekbang.com](https://www.infoq.cn/article/)
	联系电话：010-64738142
	地址：北京市朝阳区望京北路9号2幢7层A701
- InfoQ 近期会议
	[上海 · QCon 全球软件开发大会 2025.10.23-25](https://qcon.infoq.cn/2025/shanghai?utm_source=infoq&utm_medium=footer)
	[北京 · AICon 全球人工智能开发与应用大会 2025.12.19-20](https://aicon.infoq.cn/202512/beijing??utm_source=infoq&utm_medium=footer)
- 全球 InfoQ
	[InfoQ En](https://www.infoq.com/)
	[InfoQ Jp](https://www.infoq.com/jp/)
	[InfoQ Fr](http://www.infoq.com/fr/)
	[InfoQ Br](http://www.infoq.com/br/)