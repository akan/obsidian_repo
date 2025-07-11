---
title: "Dify v1.6.0：原生集成 MCP，实现 AI 能力的双向流通"
source: "https://mp.weixin.qq.com/s/LrwMA1vatWcyICaZHE7jaQ?scene=1&click_id=118"
author:
  - "[[Dify.AI]]"
published:
created: 2025-07-11
description: "既能调用外部 MCP 服务，又能将应用反向输出为标准 MCP 服务，供其他客户端使用。"
tags:
  - "MCP集成"
  - "双向流通"
  - "AI能力扩展"
abstract: "Dify v1.6.0原生集成MCP协议，实现AI应用与外部服务的双向调用能力。"
---
Original Dify.AI *2025年07月11日 08:37*

AI 应用正从简单的聊天机器人快速演进为功能丰富的 Agent。要真正发挥作用，AI 必须主动联通外部数据、API、日历和代码库等资源。不过，以往连接不同模型和服务时，通常需要编写大量定制代码，维护成本高且难以扩展。

MCP（模型上下文协议）很好地解决了这一难题，提供了一种标准化的协议接口，让 AI 更轻松地发现和使用外部服务。此前，开发者需要通过插件在 Dify 调用 MCP 服务， 而在最新版本中，Dify 实现了对 MCP 的原生双向集成。不仅能直接调用外部 MCP 服务，还可以便捷地将 AI 应用发布为 MCP 服务供外部客户端调用， 大幅提升集成效率和稳定性，让开发者能轻松扩展和使用应用功能。

## 使用 MCP 服务的三种方式

## 一、配置 MCP 服务为工具

开发者现在可直接在 Dify 工具页面配置 MCP 服务，包括本身支持 MCP 的应用（如 Linear、Notion）和第三方集成平台（如 Zapier、Composio）。以 Zapier 为例，单次配置后即可访问超过 8000 个已授权的应用，无需在 Dify 内逐个单独集成。

> 注意：Dify 目前仅支持基于 HTTP 传输、遵循 2025-03-26 协议版本的 MCP 服务，支持预授权和免授权方式。
> 
> https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization

以 Linear 为例，具体配置步骤如下：

1\. 进入 Dify 工具页面，点击 “MCP”。

2\. 点击“添加 MCP 服务”，填写 Linear MCP 服务的 URL、自定义名称及服务器标识符（用于在工作空间中识别和校验 MCP 服务）

![Image](https://mmecoa.qpic.cn/mmecoa_png/ftnoqhiaHUyib71dfQicYcckYbdfns4uiao8VNr11KiaoItBicCoeGrVMK56dq552m0Jog3cOumD7OtwKV1GCt9fQt2w/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=10005&wx_lazy=1)

3\. 按提示完成服务的授权和验证。授权成功后，即可获得 Linear 全套 22 个管理项目和 issue 的工具，包括创建、更新、查询项目和任务，管理评论、文档、团队及用户信息等。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 二、在 Agent 中智能调用 MCP 服务

在提示词中编辑器中规定 Agent 的职责，并在工具中添加 Linear MCP 服务：

> “你是一个连接到 Linear 的智能代理，拥有 22 个 API 工具。请根据用户意图灵活使用这些工具。可管理 issue、项目、文档，并支持查询团队、用户和周期信息。”

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

例如，用户向 Agent 提出创建 issue 并分配给产研团队的请求后，Agent 会识别用户意图，调用相应工具（如 get\_team、get\_user、create\_issue），在指定团队中自动创建 Linear 任务并完成指派。

三、在 Workflow 中灵活编排 MCP 工具

在 Workflow 中使用 MCP 服务有两种方式，分别适用于不同的场景需求：

### 动态调用：Agent 节点智能决策

你可以将上文配置的 “Linear 助手” 作为 Agent 节点添加到 Workflow 中。Agent 会根据用户输入智能分析需求，动态选择并调用合适的 Linear MCP 工具。这种方式特别适合处理复杂多变的任务场景，让 AI 自主决策最佳的执行路径。

例如，构建一个处理用户反馈的 Workflow：首先通过问题分类器自动识别反馈类型，然后将其路由至 3 个专门的 Agent 节点。每个 Agent 负责不同类型的反馈处理：

- **好评反馈 Agent** ：将正面评价整理后转发给市场部门，用于营销素材和案例收集
- **技术问题 Agent** ：分析错误报告和技术问题，为技术支持团队创建 Bug 任务
- **产品建议 Agent** ：汇总用户的功能需求和改进建议，为产品团队生成结构化的需求文档

各 Agent 在接收到对应类型的反馈后，会自动进行内容整理、优先级评估，并通过 Linear MCP 工具在相应部门的项目中创建 issue。过去需要人工逐条阅读、分类、转发的繁琐工作，现在几秒钟内就能完成，让团队能够快速响应用户需求。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 精准编排：将 MCP 工具作为独立节点

MCP 服务也可以作为独立的工具节点直接添加到 Workflow 中。这种方式无需 LLM 参与决策，你可以预先设定工具的调用顺序，精确控制执行流程。这特别适合以下场景：

- 标准化的业务流程（如创建任务、更新状态、发送通知）
- 需要确保执行顺序的操作链
- 对响应时间和成本有严格要求的场景

通过这种方式构建的 Workflow 不仅执行效率更高，还可以进一步扩展。你可以集成知识库来丰富上下文，添加通知插件实现多渠道提醒，或引入其他 MCP 服务实现跨平台协作。最终，你将获得一个功能完善的自动化工作流。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 发布应用为 MCP 服务

更进一步，Dify 支持将精心构建的 AI 应用（Agent，Workflow 等）反向发布为 MCP 服务。这意味着你的应用不仅可以在 Dify 内部使用，还能被 Claude、Cursor 等 MCP 客户端直接调用，每个应用都成为可复用的标准化 AI 服务。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

以 Workflow 为例，在发布之前，你需要完成两个简单的配置：

- **服务描述** ：清晰说明该 Workflow 的功能和用途，帮助其他 MCP 客户端的 LLM 准确理解并调用你的服务。
- **参数说明** ：为 Workflow 开始节点的各项参数添加详细描述，确保 LLM 能够正确传递所需参数。
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

完成这些配置后，Dify 会自动生成一个 Server URL。通过这个地址，你的 Workflow 就成为了 MCP 生态中可被任何客户端调用的标准服务。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 写在最后

通过原生集成 MCP，Dify 不仅仅是增加了一项功能，更是在拥抱一个标准。这确保了你今天构建的应用已经为未来互联的 AI 生态系统做好了准备。我们诚邀你探索 Dify v1.6.0 带来的这些强大新功能。未来是互联互通的，而现在就是起点。

---

## 🥳

## 如果你喜欢 Dify，欢迎：

- 体验 Dify 云端版本：https://dify.ai/
- 在 GitHub 上给我们点亮：支持我们的开源项
	https://github.com/langgenius/dify
- 贡献代码，和我们一起打造更强大的 Dify：你的每一行代码都能让 Dify 更加完美。
- 通过社交媒体 和线下活动 ：分享 Dify 与你的使用心得，让更多人受益于这个强大的工具。
- 我们正在招聘，简历请投至 joinus@dify.ai；
- 职位详情见：https://langgenius.feishu.cn/wiki/Y1sTwr4TCiFjQHkgnv3cAiqRn2g?fromScene=spaceOverview

继续滑动看下一个

Dify

向上滑动看下一个