---
title: "让AI自动生成工作流"
source: "https://mp.weixin.qq.com/s/Q-lMyhjy6wSs-kZ3MPUHeA"
author:
  - "[[黄益贺]]"
published:
created: 2025-07-24
description: "n8n的JSON导出/导入，加上工作流转MCP，结合起来就是一套AI“自产自销”的用法。"
tags:
  - "AI"
  - "工作流"
  - "自动化"
abstract: "AI可以自动生成n8n工作流，实现自动化流程。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/sNQ72bAyJmuUK7GzlgUbuRAgGnajBIBr4FLCpSmsf7UiaUibHibNvjLLxFcdXstOdb37iaibxr0WTxdQRNaKhz0RFoQ/0?wx_fmt=jpeg)

Original 黄益贺 [newtype AI](https://mp.weixin.qq.com/s/) *2025年07月24日 11:05*

视频号：黄益贺

YouTube / Medium: huangyihe

以下为视频内容的文字版

  

不会搭建工作流也没有关系，完全可以让AI自动生成。

  

你看这是我让Claude帮我搭建n8n的工作流。它会直接生成JSON文件。完成之后，我把文件里的代码复制，回到空白的n8n工作流里粘贴。最后把一些节点配置一下，这个工作流就可以使用了。

  

国内的小伙伴可能没怎么听过n8n。它是一个开源的工作流程自动化工具。n8n的灵活度非常高，而且集成非常广泛，从常见的Slack到各种数据库、CRM，它几乎是无所不包，所以在国外非常受欢迎。

  

对我来说，如果要用工作流的话，我首选就是n8n。除了刚才说的灵活性和高度集成之外，还有两个原因：

  

第一，n8n支持JSON格式的导入和导出。也就是说，整个工作流，包括节点、配置和连接，都可以被导出为一个JSON文件。同样，你也可以直接把将一个JSON文件导入进去，从而完整地复现一个工作流。

  

第二，n8n支持把工作流转化成MCP服务器。它在三个月前推出MCP Trigger功能。你只需要在开头添加一个MCP Server Trigger节点，工作流就变成了一个可以被外部系统通过MCP调用的服务，也就是：工作流即服务。

  

这两点结合在一起，就是一套AI“自产自销”的用法。就像我开头演示的那样，Claude可以直接生成JSON文件。把JSON文件导入，一个工作流就有了。然后，再把这个工作流转成MCP服务器输出给AI客户端使用。

  

AI生成，AI使用。这不就闭环了吗？

  

哈喽各位好，欢迎回到我的频道。谦虚地说，我是国内少数几个能把关于AI的Why和How讲明白的博主。我提供的东西远比教程更值钱。记得点一波关注。如果想链接我，就来我们newtype社群。这个社群已经运营500天，有超过1500位小伙伴付费加入啦。

  

回到今天的主题：让AI自动生成工作流。

  

要实现让Claude自动生成n8n工作流，需要安装n8n MCP。你可以把它理解为就是一个超大型n8n攻略。给Claude配上之后，它具备所有背景知识了。

  

要配置这个MCP非常简单，有手就行。

  

第一步，运行npx n8n-mcp这行命令。

  

第二步，在Claude的配置文件里，把几行贴进去。其中，链接和API Key替换成你自己的。

  

第三步，到Claude里创建一个项目。在Project Instructions里边，把这一大坨都复制粘贴进去。它的作用是，告诉Claude该怎么搭建工作流。

  

这三步完成之后，我们就可以开始生成了。为了演示，我直接从官方的Template里边挑了一个简单的工作流：

  

用户输入YouTube链接；通过Apify的服务获取Transcript；最后调用一个大模型对Transcript做总结。

  

回到Claude这边，把需求贴进去。Claude会先分析，并且提出问题，让咱们补充。等它获得所有信息之后，就会把项目的架构搭建好，然后开始生成JSON文档。

  

基本上简单的工作流一次就能搞定。复杂的工作流，如果出现报错的话，就把报错贴回来，让Claude修改。

  

等Claude生成和验证完毕之后，可以点击右上角的Copy按钮。回到n8n，直接粘贴，一个工作流就导入完成了。

  

而我们需要做的，就是把里边某些节点的配置完善了。比如Apify和OpenAI的节点，需要配置Credential才能运行。

  

你看，整个过程就是这么简单、直接。这就跟AI编程一样，只有你的需求清晰，Claude都可以搞定。我这边用的是Sonnet模型。大家还可以试试Opus模型，会更给力。

  

OK，以上就是本期内容。想了解AI，想成为超级个体，想找到志同道合的人，就来我们newtype社群。那咱们下期见！

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![](https://mmbiz.qlogo.cn/sz_mmbiz_jpg/wj3wNibZLjFFtHekZyMOKI6UDMtCzOg1rcWZ3ozgvgWS7FeAqyF4F8KpcqWnpcicremSdtozib2C4fKphibfXcv90A/0?wx_fmt=jpeg)

 [Like the Author](https://mp.weixin.qq.com/s/)

继续滑动看下一个

newtype AI

向上滑动看下一个