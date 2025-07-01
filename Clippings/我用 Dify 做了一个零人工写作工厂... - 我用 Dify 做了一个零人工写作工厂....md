---
title: "我用 Dify 做了一个零人工写作工厂..."
source: "https://mp.weixin.qq.com/s/dT1pQhfENZCGrLy331-45w"
author:
  - "[[万旗87]]"
published:
created: 2025-07-01
description: "先说效果：不跳区，不换主号，不影响日常，省下一大笔钱！"
tags:
  - "Dify"
  - "自动化写作"
  - "电商新闻分析"
  - "公众号文章生成"
abstract: "作者使用Dify搭建了一个自动化系统，能够分析电商新闻并生成公众号文章。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/VJp1c6KqcJK5EOGQlpB90NFguoSH8ibQmLYZpqfwL85z9YISYgrYgd2w6fqAZpsqBegBNhbFgxvHjpGDOacpEWA/0?wx_fmt=jpeg)

Original 万旗87 [凌云青年旅馆](https://mp.weixin.qq.com/s/) *2025年06月25日 23:37*

如果说身边有一位专家，能每天替我们解读新闻，并告诉我们应该注意些什么，是不是一件很幸福的事情。。。

这位专家不用催、不请假、不犯困，每天按时把最新的行业新闻整理好，挑出重点、提炼趋势、提出观点，还能一气呵成写出一篇有结构、有深度的行业解读文章。  

这听上去是不是像个梦想？  

但我最近真的做了这么一件事—— 用 AI 和 Dify ，搭建了一个“零人工写作工厂”的系统： 电商行业新闻解读， 将每天抓取到的电商新闻，自动结构化分析并生成一篇可发布的公众号文章 。  

今天，我就来分享一下我是怎么做到的，这个系统是如何搭建的，它的效果如何，又遇到了哪些问题。

**▍** **什么是Dify？为什么我会选择它？**

很多人可能没听说过DIfy，那我先用一句话讲明白：

> Dify，就是一个能把你写作、提问、分析数据这些脑力活，全都自动化的“大模型流水线工厂”

简单说，如果你天天在ChatGPT里复制粘贴提示词、模型调来调去，还得手动整理结果，那你其实就是在“人工搬砖”。DIfy就是来替你搬砖的，甚至还能把砖搬成房子。

如果用日常场景比喻：

你可以把ChatGPT想成一个超级聪明的秘书；

而Dify就像是一个秘书管理系统，能安排5个秘书排队干活：

- 秘书A负责找新闻
- 秘书B负责分析要点
- 秘书C负责写稿
- 秘书D负责润色
- 秘书E把内容发到公众号
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**▍** **零人工写作工厂是怎么搭建的？**

Dify支持两种应用类型，一种是工作流，面向单轮自动化任务的编排；一种是Chatflow（就是聊天机器人），支持记忆的复杂多轮对话。我们要实现的是零人工的分析写作，就要选工作流模式。

然后我们要配置大模型的api，我这里配置的是通义千问，现在有免费的额度：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

下图是我搭建完整的工作流：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

整个工作流分为以下五个步骤：  

🧩 1. 原始新闻输入：丢进一个“原料箱”  

原始新闻我是通过谷歌采集到的，现在已经做了一个自动化的版本： [电商新闻](https://mp.weixin.qq.com/s?__biz=MzkzOTQyMTMzOQ==&mid=2247485692&idx=1&sn=701220470aa2e137222c3f959bbad39b&scene=21#wechat_redirect) ， 我把当天抓取到的新闻内容整理成一个 JSON 格式的大字符串，输入给 Dify。这个阶段其实就像工厂把原材料推上了流水线的传送带。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

🔍 2. 字符串解析 + 拆分关键词新闻组

用代码节点把新闻内容从大串解析成一个个关键词对应的新闻组。代码节点使用的是JS代码，代码是在cursor中使用claude-4-sonnet生成。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

拆成的新闻组如下样式， 这是为后面的大模型调用做准备：把“原材料”按类别分包，一条条送进模型嘴里：

```javascript
[  {    "topic": "拼多多",    "content": [      {"title": "拼多多海外 GMV 突破", "description": "Temu 正在加速扩张..."},      ...    ]  },  {    "topic": "抖音电商",    ...  }]
```

  

🔄 3. 多轮结构化分析：AI 专家逐个点评

接下来用 Dify 的“迭代”节点，针对每个关键词组，调用一个LLM（通义·千问）角色，扮演电商行业分析师，输出结构化评论：概述今天这个关键词下的新闻亮点；给出趋势判断或个人解读；附上1~3个话题标签（如 [#直播电商](https://mp.weixin.qq.com/s/) #平台规则）。这一步，是整个系统的“灵魂”。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我使用的提示词如下：

```bash
请不要进行任何分析或推理，直接输出最终结果，不需要解释过程。你是一位专注电商领域的行业观察者，擅长用清晰、观点鲜明的语言总结行业动态。请根据以下JSON格式的新闻数据，输出一段结构化分析，适用于公众号或行业简报：。输入数据格式：{    "topic": "关键词",    "content": [        {            "title": "新闻标题",            "description": "新闻摘要",         }    ]}输出数据格式：{    "topic": "关键词",    "content": 基于以下要求生成的文字}1. 首先提炼该关键词下今日新闻的主要内容亮点2. 给出你的简洁观点，可结合行业背景适当解释3. 最后给出1-3个与你分析相关的标签（如#平台规则 #用户增长）风格要求：- 精炼、直接、有个人风格（如“从这组动态中能明显看出……”）- 不需要一一转述新闻，而是抽象归纳趋势和风险新闻数据如下：{{#1749106113703.item#}}
```

  

🧵 4. 整理为公众号文章模版

所有关键词分析完成后，我再让另一个 LLM 节点出场，它扮演的是“公众号作者”角色。它会根据结构化结果自动生成一篇公众号风格的文章，标题、正文结构、风格语气全都自动生成。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我使用的提示词如下：

```bash
请不要进行任何分析或推理，直接输出最终结果，不需要解释过程。你是一位电商行业的专栏作者，风格专业又不失个人观点，擅长将每日电商相关新闻结构化分析整合成一篇有深度、有风格的公众号文章。你的任务如下：请基于我提供的结构化新闻数据，以“每日电商观察”风格撰写一篇公众号文章：标题：请设置一个具有冲击力的公众号风格标题，控制在20字以内。标题可以包含趋势、冲突、提问、动作或数据感。正文结构：每个关键词以“📌【关键词】”为小标题；每个关键词部分请按照“摘要一句话 → 原结构化内容 → 趋势判断”的顺序组织内容；语言风格专业但有个性，可适度使用“我认为”、“我们观察到”、“这背后可能意味着”等措辞。结尾小结：请总结当天电商行业的主要动态亮点；提炼多个关键词背后的共性信号或潜在趋势；最后提出一个开放式问题，鼓励用户留言讨论，如“你认为拼多多这波操作能否打破京东壁垒？”等。限制要求：总字数控制在1200-1800字；内容需通俗、有深度，可直接发布于公众号；请不要输出任何解释或分析过程，直接给出最终文章内容。以下是结构化新闻数据：{{#1749100707783.result#}}
```

✅ 最后一步：一键复制 → 公众号后台粘贴 → 发布！  

最终生成的效果是这样的： [直播监管加码、AI数字人崛起，电商江湖正迎来大洗牌](https://mp.weixin.qq.com/s?__biz=MzkzOTQyMTMzOQ==&mid=2247485697&idx=1&sn=bff8c2d04aba055b33911f454caef2c9&scene=21#wechat_redirect)

**▍** **工厂的运行效果好吗？**

流量，很差。  

为什么会这样？我总结了两个核心原因

内容虽然清晰，但“有点无聊”。 我原本是想做出一点“大牛猫式”的行业洞察感，专业、观点、有逻辑。但生成的文章虽然结构没问题、语言没错误，却总感觉：缺了点什么。说白了，没有让人“眼前一亮”的爆点。AI擅长组织信息，但不擅长制造情绪。这让我意识到一件事：写文章不仅是“内容组织”，更是“感情调动”。你不能指望一个机器人，在没有受过市场毒打的前提下，写出能让读者点赞、收藏、转发的句子。  

内容虽然好，但“用户有没有这个需求”是个大问题。 哪怕文章写得不错，如果没人有需求，点击量也不会动。我这套内容分析逻辑偏向“行业内人读得懂、觉得有价值”的范畴，对大众用户来说可能门槛偏高。或者说，这种内容并不是日常刚需型消费内容，而是偏“背景知识+长期判断”的慢热型。这类产品本身就不太容易形成大规模自然传播，更适合小众社群运营或定向订阅。  

📣 最后， 搭建这套 Dify 工作流让我意识到，技术不是目的，解决问题才是。与其一开始就追求全自动，不如先用手工验证内容是否有价值。AI 可以高效生成内容，但真正打动人的，仍然是情绪与洞察。自动化要用在“已验证有效”的地方，而不是替代判断的过程。  
  

![](https://mmbiz.qlogo.cn/mmbiz_jpg/ur5f1ibfhRuM8VWA5F4ooCibWokveJQujTiaiaBTXmuRFrtGCzddrCJ1yibRmIKGXnPj1icGsKM4QdpaE2DqVBbspXfw/0?wx_fmt=jpeg)

请放肆喜欢我！

 [Love the Author](https://mp.weixin.qq.com/s/)

收录于 AI

继续滑动看下一个

凌云青年旅馆

向上滑动看下一个