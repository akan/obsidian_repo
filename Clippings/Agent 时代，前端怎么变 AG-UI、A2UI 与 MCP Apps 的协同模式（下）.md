---
title: "Agent 时代，前端怎么变？AG-UI、A2UI 与 MCP Apps 的协同模式（下）"
source: "https://mp.weixin.qq.com/s?__biz=Mzk1NzQ1ODk5NQ==&chksm=c2fe60ba2b7e546c30e619e88686b2dd66433d1c61bff2ed7743257c3ad864c1d1208df71b53&idx=1&mid=2247526710&sn=f179859f8016903003ad2444585f571a#rd"
author:
  - "[[曾经的毛毛]]"
published:
created: 2026-10-16
description: "AG-UI、A2UI 与 MCP Apps 之间如何协同与选择？"
tags:
  - "AG-UI"
  - "A2UI"
  - "MCP Apps"
  - "协同模式"
  - "动态 UI"
  - "事件流"
  - "iframe"
  - "退款卡片"
  - "按需组合"
abstract: "本文承接上篇，结合订单退款 Demo 讲解 AG-UI、A2UI 与 MCP Apps 的四种协同组合（AG-UI＋A2UI、A2UI over MCP、MCP Apps in A2UI、A2UI in MCP Apps），并给出按需选择与三者混用的实践建议，说明 Agent 时代 UI 依然重要、只是出现的时机与内容随任务而变。"
---
曾经的毛毛 AI大模型应用实践 *Oct 12, 2026, 8:30 AM*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/6OIVvQKTETxc2jRLiaoAClcicWmfx3auPxgpDde2NcFAkVckISexBYtFm7F39VNiaE0os2NG7giafd33iapqTfggFOpf9XqzuENZibsn5qSoibiaphg/640?from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

点击上方

蓝字

关注我们

上篇中我们拆开介绍了三个 Agent 时代 UI 相关的标准：

AG-UI 负责运行时交互；A2UI 描述 UI；MCP Apps 则让工具带上交互 UI。

到了实际项目里，它们可以出现在同一个应用中。比如：一个退款的卡片 Widget（A2UI）可以随着 Agent 的进度发送到前端（AG-UI）；卡片（A2UI）里也可以嵌着物流工具的操作面板（MCP Apps）。

本篇我们看看这几个标准之间的常见协同场景。演示代码在文末。

01

AG-UI x A2UI ：把 UI 描述放进事件里

分工：一个负责交互，一个描述界面

继续上篇的客户服务的 Agent 演示应用，仍然以订单退款为场景。

我们可以用 AG-UI 来把 Agent 的事件和状态同步给前端，由其自行管理 UI；也可以基于 A2UI 协议，由后端告诉前端要用哪些 UI 组件和数据。

但实际上两者可以同时使用：

保留 AG-UI 的通信方式；同时把 A2UI 描述也放进运行事件中。

比如，后端查到订单后，既返回任务状态；也发出退款卡 UI 的组件描述与订单数据。

前端通过 AG-UI 收到这个事件流后，按内容分别处理：任务状态用来更新进度、A2UI 消息则交给渲染器，由它绘制 UI。

大致原理如下：

![Image](https://mmbiz.qpic.cn/mmbiz_png/1m2qB7cobJqZEhUepD9tIjdxdEGrgyNmtGuALicEJRfk6CCKFbnSkTnoVOuh3uZqTD1ow1qQLiaKXsCFgSVSb28RcHTl8NEoNBv5YJuBlPaLE/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

实现方法

AG-UI 项目为此提供了 `A2UIMiddleware` 的适配代码。其作用是：从 Agent 的工具输出中识别 A2UI 内容，并将其封装成 AG-UI 事件，和文字、状态消息一起传给前端。

简单说，就是帮你把 A2UI 的消息“包装成” AG-UI 的事件，加一层外壳： **外层标明消息类型，里面保留具体的 UI 描述。** 前端应用再按标识取出内容，交给 A2UI 渲染器。

下面是一个把 UI 描述装进 AG-UI 事件的例子（显示商品信息和确认按钮）。

```
{
  "type": "ACTIVITY_SNAPSHOT",
"messageId": "a2ui-refund",
"activityType": "a2ui-surface",
"content": {
    "a2ui_operations": [
      {
        "version": "v0.9",
        "createSurface": {
          "surfaceId": "refund",
          "catalogId": "https://refund-demo.local/catalog/v1"
        }
      },
      {
        "version": "v0.9",
        "updateComponents": {
          "surfaceId": "refund",
          "components": [
            {
              "id": "root",
              "component": "Column",
              "children": ["product", "confirm"]
            },
            ...
          ]
        }
      }
    ]
  },
"replace": true
}
```

在这个例子中，外层是一个 AG-UI 的事件消息格式，类型为ACTIVITY\_SNAPSHOT；然后用 `activityType: "a2ui-surface"` 标识出这是一个 A2UI 的描述。

通过这种方式，A2UI 描述的 UI 与其他 AG-UI 的事件消息（状态更新、工具调用等）一起，被源源不断地“输送”到前端应用。

02

A2UI x MCP：三种组合方式

A2UI 与 MCP Apps 都能带来动态的 UI。一个是生成 UI 描述送到前端渲染；一个是提供可交互的 HTML 页面，由宿主在隔离的 iframe 中加载。

那么两者组合的意义在哪里？又是如何组合应用呢？

Google 官方给出了三种组合方式。理解它们时，可以盯住两个位置：A2UI 的渲染器在哪里，MCP App 又在哪里。

A2UI over MCP：用 MCP 传 A2UI

如果企业已经有统一的 UI 组件体系与渲染器，并希望订单、库存、审批这些 MCP Tool 返回的界面都保持一致统一，可以用 **A2UI over MCP** 。

它的方法是：

MCP Tools 返回 A2UI JSON 描述，宿主（如 Agent 应用）获得描述后，用渲染器绘制 UI。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/1m2qB7cobJrHRic9BnlZBFKj6P1pqmI1JqdjCzBYBDOZ0BjcM1PbQ0jzj9Lf03jibL58UymFKwQfazMGZibRLX21ZsyAlcOjewIxiblu9t3Ntso/640?from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

在这个机制中，MCP 不返回独立的 Web 页面，宿主也不需要 iframe。这里只需要 MCP 的基础工具与资源能力， **并不要求 MCP Apps** 。前提是宿主应用能够支持 A2UI — 前端能够渲染出 UI 组件。

基于 MCP 的 A2UI 服务端实现方法：

- 通过 MCP Resource 提供 A2UI 描述的 UI 模板
- 通过 MCP Tool 提供数据及更新

MCP 的工具元数据（\_meta.ui）中需要定义一个 A2UI 的资源描述与类型：

```
"_meta": {
  "ui": {
    "resourceUri": "a2ui://recipe-card",
    "mimeType": "application/a2ui+json"
  }
}
```

宿主应用在调用 MCP Tool 时，除了获得数据之外，检查\_meta信息，进而通过 resources/read 的调用获得 A2UI 的 UI 模板，从而能够完成最终 UI 组件的渲染和数据展示。

以前面的 Demo 为例，订单查询的 Tool 在 `application/a2ui+json` 内嵌资源中返回完整 UI 描述，前端据此绘制退款卡片并展示：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/1m2qB7cobJofqwW1Xdek8Nkic8CxiaC7MJ5wicPonuicMHWTRKxJuSbTLTFlrjvPBeJDgjkNGL9Cuydia0v8RCuoAb1ahhqN4eMcD7gsTjwSjwqw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

而在进行操作后（比如点击“确认退款”），宿主应用再次发起 MCP Tool 调用，将相关数据发送到 MCP Server，并同时获得更新后的 A2UI 结果。

MCP Apps in A2UI：A2UI 里嵌入 MCP App

如果你的 Agent 系统本身采用了 A2UI 来实现前端的动态界面；但同时需要嵌入一些外部的 MCP Apps 界面，就可以使用 MCP Apps in A2UI。

比如，如果你自己掌握了售后门户（A2UI 实现），但又不想把外部物流商的时段选择、地图和校验逻辑全部重写，就可以考虑把物流工具的“面板” Widget（MCP Apps）嵌入到自己的 UI 中。

其实现机制是：

外层仍由 A2UI 组织 UI 区域，但在组件目录中增加一个“MCP App 容器”。渲染器遇到它，就加载 MCP Apps 关联的 HTML 资源，在 iframe 中运行。

企业维护外层 UI ，工具团队维护内部交互，两边通过消息通信。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/1m2qB7cobJpJMRjdzvHgCJtGwNNrTyuzk7SwxgIbjNlVfoNyhxzkx3mYdfl2ZLfu9cqnZeycwMJQUUeTNXsxTHiaCT7oMp9KkOtHJnMwyWZc/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

继续以前面的订单退款 Demo 为例，外层的订单和金额由 A2UI 绘制，但这里紫色取件面板是一个独立 MCP App（假设是物流提供的 MCP）：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/1m2qB7cobJpJ7icOTZhCnD3nou9gmUz7ajYDic5iaFibEkLia8Ks0d1GdBHmlQIQwl23IPod3rqjnd0eRwdnS0qI6NQMm2p8o65EAM0zfXbWMooM/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=10)

如果简单的理解，就是把 MCP Apps 看作是 A2UI 支持的组件目录中的一种组件类型（MCPApp），类似一个 Form。

A2UI in MCP Apps：把 A2UI 渲染器装进 MCP App

上面的模式是：我们使用别人开发的 MCP Tool，从而将其带有的 UI 集成到我们的 A2UI 界面中。

但如果反过来，我们开发的是要接入别人平台的工具，无法改造宿主应用。对方支持 MCP Apps，却没有 A2UI 渲染器，就可以采用 A2UI in MCP Apps：

把渲染器、组件目录和业务代码一起打包进 MCP App。宿主负责加载 MCP App，App 自己负责绘制 A2UI，界面在 iframe 的隔离视图内生成。

![Image](https://mmbiz.qpic.cn/mmbiz_png/1m2qB7cobJrO5fyYtEWKReNeXdljrzhCW12sHuwicu7ZlZCE06LF47rKgQ3wYGIkOVh2U24wbXF7AibugnkUM2ibI2H2cGlBpvAFjXRdSx7alA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=12)

与模式一的差异在于：

MCP Apps 负责渲染 A2UI 负载，而不是宿主应用的前端负责渲染 — UI 渲染器从宿主应用搬进了隔离运行的 MCP Apps。因此宿主应用不必理解这份 A2UI 描述，UI 组件版本和显示效果也由 MCP App 自己维护。

在上面的 Demo 中，你可以用这种方式达到完全一致的效果。

03

三种协议：按需选择，也可以一起出现

上面我们总结了AG-UI、A2UI、MCP Apps的四种协同场景。在实际应用中，当然需要根据解决的问题来选择：

| 应用场景 | 可采用哪种组合 | 选择前提 |
| --- | --- | --- |
| 持续显示任务进度，按需出现 UI，不依赖MCP | AG-UI ＋A2UI | 前端接好事件分发和 A2UI 渲染器 |
| 宿主渲染 UI；基于 MCP 返回动态的 UI 描述信息 | A2UI over MCP | 宿主支持 A2UI，不要求 MCP Apps和iframe |
| 宿主渲染 UI；局部嵌入 MCP App的专业工具 | MCP Apps in A2UI | 宿主能渲染 A2UI，并实现 App 容器 |
| 宿主加载 MCP App；App内负责渲染动态 UI | A2UI in MCP Apps | MCP App 自带渲染器，宿主无需接入 A2UI |

这些接法可以按需组合，也不必一次引入全部协议。比如，现有前端应用只缺 Agent 的进度与反馈，就可以先接 AG-UI；而如果需要给 MCP Tool 添加固定页面，使用 MCP Apps 就行，不一定需要 A2UI。

事实上，这三个协议甚至可以同时出现。以前面 Demo 中的退款场景为例：

- AG-UI 持续传递 Agent 的回复和处理进度；
- A2UI 描述外层订单卡片、金额和确认按钮；
- MCP Apps 承载卡片里的物流取件面板；

而用户看到的是一个工作台，背后的界面却由不同部分负责：

![Image](https://mmbiz.qpic.cn/mmbiz_png/1m2qB7cobJpdf8k2d9For4lVtPR9MpDwiaNHUpkxLC5lWAWZhIBWauRgqzeaDTGL6SKJfjC15Aia6icVrkfb9vZYNadJicib2dImd3LSyhibcwgV8/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=14)

当然，这种多协议的融合，交互过程会比界面的组合更复杂一些：比如，取件面板保存了新时间，外层订单卡和 Agent 怎么知道？这些更新需要应用衔接起来，并不会因为用了三个协议就自动完成。

以前面的 Demo 为例，大致过程如下：

- 用户选好取件时段并点击保存，App 通过宿主调用 MCP 工具
- MCP Server 校验并保存安排，结果经宿主返回，取件面板更新
- 宿主确认 MCP 面板保存成功后，再向 Agent 发送新的请求
- Agent 读取最新安排，通过 AG-UI 返回回复、进度，以及封装在事件里的 A2UI 更新，前端根据新的 A2UI 消息刷新外层 A2UI 卡片
- 用户点击“确认退款”，再次发送 Agent 请求，继续后续的任务，更新 UI

这里面涉及到的一些交互的过程、SDK等，可以参考 A2UI 官方文档。

回看上下篇，Agent 时代并没有让前端 UI 消失。

自然语言适合表达任务，但表单、卡片和按钮等仍然有着天然的交互优势 — 负责让使用者更便捷的查看信息、补充条件和作出确认。所不同的是，Agent 时代 UI 出现的时机与内容，更多地需要围绕着任务而变化。

了解每种协议的动机、场景与原理，有助于我们做出架构与设计上的最佳选择；而更具体的开发，当然可以交给 AI Coding 来完成。

本文 Demo ：

https://github.com/pingcy/agent-ui-lab

![Image](https://mmbiz.qpic.cn/mmbiz_png/1m2qB7cobJrubDCjZBqgUaOa0Q5fs57u4NCpxPuOIRyiaYGiaNMSiaHZE6kbB0iarBzY08ak4XLicCxia6PfFckMc3UK8TZq47gANJ91Y3bDUnibNw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=36)

感谢阅读，交流与合作请后台留言

喜欢就关注哦

![Image](https://mmbiz.qpic.cn/mmbiz_png/1m2qB7cobJp9tTQ8TdN0DuNGNRRAwCdJgCUjggdibq0JYI81UjnWwC5LC0bqMEmTibcbEFyibnWwDofduubBLYtNBQXBhgeGclqlKV7uWmDOJg/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=16)

动动小手点个赞

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/1m2qB7cobJr7J6jcia4qYsXNvBHTL1wDGnF7iaKl0r8NJjzzIglWPrs6tRomWK9FCanc6zz0a3ICepTBGgJPuPMicc2EGds12yHnhic8zTkNf7Q/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=17)

点在看最好看

![Image](https://mmbiz.qpic.cn/mmbiz_png/1m2qB7cobJqgaBYU2icFUDGsf9Kf7Zax45TZo3sySvETgrgAQ6ZsAf9G1u8vpjf75Mh9EvnhwmWn2yQCXY9mxJ2wiclgLQibZ7Y9iav1jCXS7Ho/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=18)

MCP/A2A/A2UI协议 · Table of Contents