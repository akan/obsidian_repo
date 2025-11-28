---
title: "这个GitHub项目，要断了所有程序员的后路......"
source: "https://mp.weixin.qq.com/s/gDdCoQg0YiafrkWB9UEWdw"
author:
  - "[[liuxin]]"
published:
created: 2025-11-28
description:
tags:
  - "无代码开发"
  - "大模型应用"
  - "联系人管理"
abstract: "GitHub项目nokode通过大模型直接处理应用逻辑生成Web界面，无需编写传统业务代码，展示了AI替代程序员的潜在可能性。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/KyXfCrME6UKRUgKhkwUBThkl1UInRWTjkJZOPnAgkfusa50Y4QEjLAmia3IU7IElS04SsCWqt2hiaj0YkUVmeolw/0?wx_fmt=jpeg)

Original liuxin [码农翻身](https://mp.weixin.qq.com/s/) *2025年11月27日 08:55*

最近在GitHub上看到了一个非常有趣的项目。

  

它看似简单，但是背后的思想却震撼人心。

  

这个项目是一个非常非常简单的Web应用： 联系人管理系统 ，只有增删改查，一个刚入门的学生就可以轻松写出来。

  

但是，让人震撼的是，这个项目 没有没有任何传统意义上的业务逻辑代码！

  

没有Controller，没有Service，没有DAO，也没有Vue或者React。

  

项目作者根本没写这些代码！

  

那它是怎么运行起来的呢？

  

答案非常简单： 所有的业务逻辑，全都由大模型在内部自动完成。

  

如果你还没明白它的特别之处，这里稍微解释一下。

  

我们平时用的 AI Coding 工具，是让 AI 帮你写代码：生成前端、后端、测试、部署。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/KyXfCrME6UKRUgKhkwUBThkl1UInRWTjia2pDLotQZfAPlPyfqht2XlltbCOayD0GZx2UapN8ea852c3X6o2fcA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

这个项目完全不同，它 直接把大模型当成了一个应用程序来执行，消灭了前后端的代码！

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

  

项目通过提示词告诉大模型：你是一个管理联系人的应用，可以接受HTTP格式的请求，直接输出对联系人增删改查的Web界面.....

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

让人震撼的是，这个“没有应用逻辑”的联系人管理系统还真跑起来了！

  

它自己设计了表结构，自己生成UI界面。

  

这是首页（还没有联系人）：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

这是创建联系人的界面：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

联系人的列表：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

联系人详情：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

大模型还可以根据用户的请求来区分要返回的内容，访问 /contacts 会得到一个 HTML 页面。访问 /api/contacts 会得到 JSON：

```perl
{  "contacts": [    { "id": 1, "name": "Alice", "email": "alice@example.com" },    { "id": 2, "name": "Bob", "email": "bob@example.com" }  ]}
```

更夸张的是，AI在没有在没有任何示例的情况下，自主设计出了合理的数据库表结构（包含正确的类型和索引）、安全的参数化 SQL 查询（可防止注入攻击）、类 REST API 规范、响应式 Bootstrap 布局、表单验证以及针对极端情况的错误处理。

  

可以说，大模型展示出的能力非常让人震撼！

  

不过，稍微熟悉大模型的人就知道，现在的大模型远远没有这么智能，比如它根本不具备Web服务器的能力，也没法访问数据库和文件。

  

所以这个项目把大模型包装了一下， 一共用到了687行代码 ：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

用户直接访问的就是个传统的服务器，核心在于一个叫 LLM Handler 的组件。

  

它接收用户的 HTTP 请求，填充到提示词模板中，把数据库、文件访问等工具一并交给大模型。

  

大模型处理后，决定要不要查询数据库、修改数据或渲染页面，最后再返回 HTML 给用户。

  

核心的逻辑其实就这么几行：

```javascript
// The entire backendconst result = await generateText({  model,  tools: {    database,      // Run SQL queries    webResponse,   // Return HTML/JSON    updateMemory   // Save user feedback  },  prompt: \`Handle this HTTP request: ${method} ${path}\`,});
```

这个应用虽然神奇，但是缺点也非常明显： 太慢，太贵，太不稳定 。

  

每次点击或表单提交都需要 30-60 秒，比传统的Web应用要慢300~6000倍。

  

每次请求都需要花费 0.01-0.05 美元的token，比传统计算成本高出 100-1000 倍。

  

AI生成界面的一致性也很差，它会忘记刚刚生成的UI，导致同一个界面，颜色和布局都可能发生变化，看看下面这个界面，风格完全变了。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

但是，这个叫nokode项目证明了一件事情： AI可以处理应用逻辑，可以生成HTML页面。

  

这个项目的作者说：“所有的问题都和性能/价格/一致性相关，如果我们乐观一点，AI 推理速度每年提升约 10 倍，成本持续下降趋近于0，稳定性不断提高，这些问题可能都会解决。”

  

如果真到了那一天，只需要写出合适的提示词，就能把一个大模型变成一个应用，真的不需要写代码了，所有程序员的后路都被断了......

  

这种事情会发生吗？

  

欢迎在评论区留言讨论。

  

nokode 地址:  

  

https://github.com/samrolken/nokode

  

继续滑动看下一个

码农翻身

向上滑动看下一个