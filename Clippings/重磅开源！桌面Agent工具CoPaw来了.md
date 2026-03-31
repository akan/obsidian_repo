---
title: "重磅开源！桌面Agent工具CoPaw来了"
source: "https://mp.weixin.qq.com/s/KgPjDeOJPBEsfiVfOeK8-Q"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2026-02-28
description: "用户可二次开发自定义模型"
tags:
  - "开源发布"
  - "桌面Agent"
  - "模型管理"
  - "多平台支持"
  - "低门槛部署"
abstract: "阿里云正式开源桌面Agent工具CoPaw，该工具支持多种聊天软件和主流模型，具备模块化架构、主动心跳和长期记忆等功能，并提供一键本地或云端部署。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/vic3vug7qel7huk32u70mjaFLLBsQzicKsvgTy8SyeZDDwDPaM1mB8FSpenibptxnmIibhmo5iaRpQPERspLu2v7fH2OFp1c86VxmrJADXYV5icn4/0?wx_fmt=jpeg)

[阿里云](https://mp.weixin.qq.com/s/) *2026年2月28日 11:33*

今天，CoPaw面向全球开发者正式开源，用户可基于CoPaw进行二次开发，自由接入本地模型、编写Skills和接入专属消息应用，满足更定制化的场景需求。

  

CoPaw原生支持钉钉、飞书、QQ、Discord、iMessage等聊天软件和平台，内置了多种Skills，用户可一键本地部署也可通过阿里云计算巢和魔搭社区创空间实现一键云端部署，并调用千问系列等主流模型，是业界部署门槛最低的Agent工具之一。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/vic3vug7qel7a3lOqF7108Ybkb0jMa27kfJHq0b6fLFqFlOb5fwnicX0t8OlP6RMNhg4R62eJCVMEaLfmCJAZjh8TUCjnBKWBebPQwZC0qxib4/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

**开源地址👇**

*GitHub: https://github.com/agentscope-ai/CoPaw*

*官网与文档: https://copaw.agentscope.io/*

  

***\# CoPaw开源版本亮点***

  

此次开源版本的CoPaw全方位升级产品性能，进一步降低了使用门槛并提供了Agent能力的上限，用户和开发者基于升级后的CoPaw打造更好玩、好用、可拓展的Agent。

  

**亮点一：模型管理能力全面升级，内置主流云端模型且支持接入本地自建模型**

此前CoPaw内置了主流云端模型的支持，但很多用户也希望用本地模型或自建模型服务。此次开发团队全面升级了模型管理能力，云端API、自建推理服务、Ollama、llama.cpp以及MLX（Apple芯片本地），CoPaw都能适配。

  

**亮点二：Agent架构模块化重置，用户可按需组装Agent**

CoPaw开发团队对Agent核心架构进行了模块化重构。例如，Prompt、Hooks、Tools、Memory等核心组件解耦，开发者可以独立替换或扩展任意模块，按需组装自己的Agent。

  

**亮点三：多频道接入更稳定且更统一，支持自用IM工具接入**

升级开源版本的CoPaw不仅支持接入钉钉、飞书、QQ、Discord、iMessage等多个频道，还进一步统一了协议与类型、标准化接入渠道并引入了消费与队列机制，在多频道接入的情况下消息处理更可靠不会丢消息。

  

同时，新增频道注册表（Registry）机制和自定义频道目录，提供list/install/remove/config 等CLI命令，开发者可以像安装插件一样管理频道，用户可参考文档参照文档开发自己频道插件。

  

**亮点四：主动心跳机制与长期记忆功能，更懂用户需求**

  

CoPaw创新性采用了主动心跳机制，内置定时任务调度系统，不仅会被动响应用户的需求，还可自主完成查邮件、整理待办事项等任务；同时，CoPaw自带长期记忆功能，还会主动将用户对话中的决策、偏好、待办等写入记忆，使用时间越长， CoPaw 越懂用户。

  

例如，在日常工作生活场景，CoPaw可以自动汇总海量邮件、一键生成并整理周报、甚至帮用户记录和分析每天的饮食与健身数据；还能帮创用户构思视频脚本、爬取和整理社交平台的热门帖子、自动生成内容草稿。

  

***\# CoPaw安装与启动***

  

- **安装方式：**

一键安装，帮你搞定Python环境

```nginx
# macOS / Linux:curl -fsSL https://copaw.agentscope.io/install.sh | bash# Windows（PowerShell）:# 关注主页更新，请先采用pip方式完成一键安装
```

或者使用Pip安装（Python环境要求版本号>=3.10，<3.14）

```nginx
pip install copaw
```

  

- **启动方式**

安装完成后执行以下命令启动CoPaw，即可在浏览器打开 http://127.0.0.1:8088/ 进入CoPaw控制台

```cs
copaw init --defaultscopaw app
```

  

用Docker安装和启动 ：用户也可直接通过Docker方式安装和启动CoPaw。如果你已经安装好了Docker，执行以下两条命令后，即可在浏览器打开 http://127.0.0.1:8088/进入控制台

```bash
docker pull agentscope/copaw:latestdocker run -p 8088:8088 -v copaw-data:/app/working agentscope/copaw:latest
```

  

\# CoPaw下一步方向

  

这次CoPaw开源只是起点。在接下来的版本中，CoPaw开发团队未来将进一步探索大小模型协同机制，让更轻量的本地模型处理隐私数据，让更强大的云端模型处理规划和写代码等复杂任务，兼顾安全、性能、与能力。同时，开发团队还将探索加强CoPaw的多模态交互能力，用户可以期待与自己CoPaw个人助理进行语音和视频通话。

  

/ END /

  

点击 **阅读原文** ，立即体验CoPaw！

[Read more](https://mp.weixin.qq.com/s/)

修改于 2026年2月28日

继续滑动看下一个

阿里云

向上滑动看下一个