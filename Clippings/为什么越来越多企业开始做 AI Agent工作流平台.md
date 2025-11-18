---
title: "为什么越来越多企业开始做 AI Agent工作流平台？"
source: "https://mp.weixin.qq.com/s/fVZJYtXTiPKMku_1ycOBpg"
author:
  - "[[饼干哥哥]]"
published:
created: 2025-10-31
description: "企业纷纷自建 Agent 平台的真正原因，有两点。"
tags:
  - "AI Agent"
  - "工作流平台"
  - "企业需求"
  - "数据安全"
  - "本地部署"
abstract: "文章分析了企业级AI Agent工作流平台兴起的原因，重点探讨了数据安全、本地部署和组织管理等B端核心需求，并以科大讯飞星辰Agent为例展示了实际应用场景。"
---
Original 饼干哥哥 *2025年10月30日 19:20*

过去一年，AI Agent 和工作流（Workflow）赛道简直是“神仙打架”。

从字节的 Coze（扣子）到 n8n，再到前阵子 ChatGPT 开放的 AI 生成工作流，各种平台层出不穷。

但你有没有发现一个现象：这些工具虽然很火，但大多是“玩具”，或者个人开发者在用。在 B 端（企业）场景，一说一，你非常少见到它们的身影。

  

不是它们技术不行，而是 B 端场景更复杂，有两个核心痛点是 C 端平台（至少目前）无法解决的：

1. 1\. 数据安全： 必须支持本地部署，而且是高度本地化，确保企业数据不出内网。
2. 2\. 组织管理： 必须有精细的用户权限管理、团队协作等功能。

所以有时候你会看到，真正在 B 端跑起来的工作流产品，反而是我们没怎么听说过的，但它们却拳拳到肉，专为企业场景设计。

例如，我最近发现科大讯飞也出了一个 Agent 平台： 讯飞星辰 Astron Agent

我马上去扒了一下它的 GitHub， 在它的技术架构里，我看到了几个强烈的“B 端信号”：

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/z40lCFUAHpnks0fticHsKqDkj0zre19eBEHuk6FMJlqZb39yUZWu8akmcmxeqO3r6Hfnt9snyfia57ibnFURe1icFw/640?wx_fmt=jpeg&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=1)

GitHub: https://github.com/iflytek/astron-agent

- 一键本地部署： 这个不用多说，数据安全是 B 端的命脉。
- 内置 RAG 引擎 (RAGFlow)： 这对应了企业知识管理，是目前 AI 最快、最刚需的落地价值。
- 内置 RPA 自动化 (RPA)： 这意味着它可以打通那些没有 API 的老旧内部系统（比如某些 OA、ERP），这在企业里太常见了。
- 认证与授权 (Casdoor)： 这就是企业级的“组织管理”和“权限控制”功能，能分团队、分角色。

这套组合拳，几乎拳拳都打在了 B 端的需求点上。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

说一下部署，基本上是小白无脑操作

但国内最大的问题就是DOCKER网络

可以试下开代理，例如我端口在7890

以及设置一些镜像加速

```
{  "proxies": {    "default": {      "httpProxy": "http://host.docker.internal:7890",      "httpsProxy": "http://host.docker.internal:7890",      "noProxy": "localhost,127.0.0.1,host.docker.internal"    }  },  "registry-mirrors": [    "https://docker.m.daocloud.io",    "https://hub-mirror.c.163.com",    "https://mirror.ccs.tencentyun.com"  ]}
```

要是能正常跑一小会，但网络问题中断了的话，就重跑，我这应该是重跑了5、7次就好了：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果不放心的，就搭配 AI 编程，例如 Trae

像我是 Windows，部署遇到问题了，直接让AI 帮我处理：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

很丝滑就部署好了。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

### 动手实操：搭建一个“一鱼多吃”Agent

我刚好有个痛点，正愁没工具解决。

我做内容创作，总想“一鱼多吃”：一篇深度长文，我想同时分发到 小红书、推特、领英 。

但每个平台的风格、字数、受众都完全不同。每次我都要手动打开 ChatGPT，换三个不同的提示词，跑三次，再复制粘贴出来，非常麻烦。

  

所以，我就想做一个“多平台内容写作”的 Agent。正好，就拿讯飞星辰 Agent 试个手。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

逻辑是这样的：

1. 1\. 我提供一篇 长文 （作为上下文）。
2. 2\. 我再提供一句 简单的指令 （比如“发小红书”）。
3. 3\. Agent 必须能“听懂”我的指令，这是一个 决策 。
4. 4\. 然后，它自动把长文“喂”给对应平台的“写作专家”（小红书 Prompt、推特 Prompt...）。
5. 5\. 最后，直接把生成好的内容返回给我。

  

直接讲中间的重要节点。

#### Step 1：决策节点

这个 Agent 的灵魂，在于“ 决策 ”节点。它就像一个智能的“路由”。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我从“开始”节点拉出来，接上一个“决策”节点。

在这个节点里，我配置了 3 个意图：

- intent\_twitter
- intent\_linkedin
- intent\_xiaohongshu

最关键的是它的“ 高级配置 ”，我塞了一段 Prompt，告诉它如何当一个“任务分类助手”：

```
你是一个任务分类助手。请根据用户的输入，判断他想将文章分发到哪个社交媒体平台。你只需要输出意图的ID。
```

预设意图如下：

1. 如果用户提到 "推特"、"Twitter"、"X" 或 "发推"，请匹配意图 'intent\_twitter'。
2. 如果用户提到 "领英"、"LinkedIn"、"职场" 或 "专业风格"，请匹配意图 'intent\_linkedin'。
3. 如果用户提到 "小红书"、"种草"、"笔记" 或 "xhs"，请匹配意图 'intent\_xiaohongshu'。

如果不属于以上任何一种，请匹配 'default'。

有了它，当我输入“发推特”时，工作流就会自动走向 intent\_twitter 这条分支。

  

#### Step 2：专家——三个大模型节点

接下来，就是从“决策”节点拉出三个分支，每个分支都连接一个“大模型”节点，并给它们注入不同的“灵魂”（System Prompt）。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

分支 1：推特专家 这个节点只在 intent\_twitter 被触发时运行。我在它的 System Prompt 里写：

```
你是一个专业的社交媒体运营（推特专家）。请根据以下长文，将其浓缩为一则吸引人的推文。
```

要求：

1. 风格：信息密集、简洁、有力。
2. 严格控制在280个字符以内...
3. 必须提取文章最核心、最抓人眼球的1-2个观点。
4. 结尾加上 2-3 个高度相关的 [#hashtags](https://mp.weixin.qq.com/s/) 。

分支 2：领英专家 在 intent\_linkedin 分支，Prompt 的要求完全不同：

```
你是一个专业的商业内容作家（领英专家）。请根据以下长文，改写为一篇专业的领英（LinkedIn）帖子。
```

要求：

1. 风格：专业、有见地、有启发性、结构清晰。
2. ...使用要点列表...
3. 结尾：提出一个开放性问题，以鼓励行业内的专业人士评论和讨论。

分支 3：小红书专家 intent\_xiaohongshu 分支，这个大家最熟了：

```
你是一个爆款小红书博主，深谙“利他”和“种草”的精髓...
```

要求：

1. 标题：必须是吸引人的两段式标题，使用大量 emoji...
2. 正文：
- 语气必须亲切，多用“姐妹们”、“我真的”、“yyds”、“保姆级教程”...

  

#### Step 3：组装与测试

最后，我把这三个“专家”分支的输出，和一个“默认”分支的输出，全部汇集到一个“ 文本拼接 ”节点，最后再连到“ 结束 ”节点。

这样，无论哪个分支被触发，它的结果都能被正常输出。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

一起来看下最终的成果。

我先粘贴一篇很长的、关于 AI Agent 的技术文章作为 上下文 （在平台的“对话历史”或变量中输入）。

测试 1：小红书

我在对话框（Query）里输入：“ 帮我改成小红书笔记 ”

Agent 准确命中了 intent\_xiaohongshu 分支，“小红书专家”开始工作，输出：

```
标题：🆘AI 圈又炸了！保姆级Agent工作流，打工人速速收藏！
```

正文： 姐妹们！AI Agent 真的要卷疯了！你是不是也觉得...... （此处省略 300 字）... [#AI](https://mp.weixin.qq.com/s/) [#Agent](https://mp.weixin.qq.com/s/) [#工作流](https://mp.weixin.qq.com/s/) [#打工人](https://mp.weixin.qq.com/s/) [#讯飞星辰](https://mp.weixin.qq.com/s/)

测试 2：推特

我不动上下文，只改 Query：“ 总结一下，发个推 ”

Agent 立即命中了 intent\_twitter 分支，“推特专家”输出：

```
讯飞星辰 Agent 平台正通过集成 RAGFlow 和 RPA 重新定义 B 端 AI。
```

完美！Agent 准确理解了我的意图，并自动调用了正确的“专家” Prompt，省去了我切换和复制粘贴的麻烦。

  

更具体的可以参考官方的文档： https://www.xfyun.cn/doc/spark/Agent01-%E5%B9%B3%E5%8F%B0%E4%BB%8B%E7%BB%8D.html

也可以直接用我搭建好的工作流，开源到了Github： https://github.com/binggandata/ai\_resource/blob/main/%E5%A4%9A%E5%B9%B3%E5%8F%B0%E5%86%85%E5%AE%B9%E5%86%99%E4%BD%9C.yml

部署好后右上角发布就能用了

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

#### 为什么越来越多企业开始做 AI 工作流？真的需要这么多吗？

我的看法是： C 端的 Coze 们在卷“创意”，而 B 端的星辰们在卷“落地”。

  

B 端的需求非常垂直且刚性。它们的需求不是“帮我画个猫”，而是“ 连接我那个 20 年前的内部 OA 系统，当客户来电时，自动用 RPA 抓取他的订单数据 ”（RPA 登场），或者是“ 让新来的销售，能用我们公司 10 年的文档库，快速回答客户的刁钻问题 ”（RAG 登场）。

但更深层的价值，也是企业纷纷自建 Agent 平台的真正原因，有两点：

1\. 建立私有的“数据飞轮”（Data Flywheel）。

B 端 Agent 最大的价值不是当下的自动化，而是它产生的数据。当你的 Agent 在内部跑起来，你就拥有了一个“交互金矿”：员工如何提问、如何纠正 Agent。

把这些数据喂给自托管的（或讯飞这样的）模型进行 fine-tuning，你会得到一个越来越懂你“黑话”的专属小模型，成本更低、效率更高。 这是买不来的核心资产。

  

2\. 解决“黑盒信任”与“合规审计”问题。

你敢让一个 Coze 上的“黑盒”Agent 去处理百万级的财务审批吗？不敢。一旦出错，你都不知道是哪一步的逻辑出了问题。

而像星辰这样开源、可本地部署的平台，它提供了 透明度和可控性 。每一笔决策、每一次 RPA 调用，都有日志、可追溯、可审计。这在金融、法务等高风险领域，不是“加分项”，而是“准入项”。

  

理论上，只有这种能沉淀数据、逻辑透明、深入场景的垂直 Agent 才真正有用。

所以，有细分特色、能解决企业真实痛点（特别是数据安全、系统连接、和 数据资产化 ）的 Agent 平台，会一直有它的价值。

  

继续滑动看下一个

饼干哥哥AGI

向上滑动看下一个