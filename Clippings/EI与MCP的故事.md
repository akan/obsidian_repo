---
title: "EI与MCP的故事 作者：CHO 孔令晗 EI Future, AI Now ！🎉🎉🎉 MCP能做什么? 先简单唠 - 掘金"
source: "https://juejin.cn/post/7502816338529927203"
author:
published: 2025-05-12
created: 2025-05-13
description: "作者：CHO 孔令晗 EI Future, AI Now ！🎉🎉🎉 MCP能做什么? 先简单唠叨几句，试想一下，在 MCP 在之前，如果我们模型的产出更符合我们的预期， 我们可能会将所需的数据上下文贴"
tags:
  - "clippings"
---
![横幅](https://p6-piu.byteimg.com/tos-cn-i-8jisjyls3a/0bdb448b29434da59b1e21fcb970e11f~tplv-8jisjyls3a-image.image) ![](https://p9-piu.byteimg.com/tos-cn-i-8jisjyls3a/c676d36a15f248e8aedb339deddadb90~tplv-8jisjyls3a-image.image)

作者：CHO 孔令晗

**EI Future, AI Now ！🎉🎉🎉**

**MCP能做什么?**

先简单唠叨几句，试想一下，在 ***MCP*** 在之前，如果我们模型的产出更符合我们的预期， 我们可能会将所需的数据上下文贴到 Prompt 中，但随着我们对产出的要求越来越高，CV大法的方式将信息添加到 Prompt 中会变得越来越 **困难** 。为了克服 Prompt 随着需求的复杂而上升后，OpenAI 等公司引入了 \* **function call** \*\*\* **的功能，通过一些预定义的函数来获取操作。但 ***function call***  并不是通用的，每个LLM厂商实现的 ***function call***** 调用方式不同也需要开发者依赖并适配。至此，一个标准化的通信协议则成为了下一个爆点。

不同厂商实现的function call:

```
# OpenAI Function Calltools = [{"type": "function", "function": {    "name": "get_weather",    "parameters": {"type": "object", "properties": {"location": {"type": "string"}}}  }]# Google Gemini Function Callingtools = ToolConfig(    function_declarations=[FunctionDeclaration(      name="get_weather",      parameters={"location": {"type": "string"}}    )]  )
```

***MCP*** 起源于2024年11月25日  ***Anthropic***  发布的文章：  [www.anthropic.com/news/model-…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.anthropic.com%2Fnews%2Fmodel-context-protocol%25C2%25A0%25E5%25AE%2583%25E5%25B8%25A6%25E6%259D%25A5%25E4%25BA%2586%25E4%25B8%2580%25E7%25A7%258D%25E6%2596%25B0%25E7%259A%2584%25E6%2596%25B9%25E5%25BC%258F%25E7%2594%25A8%25E6%259D%25A5%25E5%25B0%2586%25E5%2590%2584%25E7%25A7%258D%25E6%2595%25B0%25E6%258D%25AE%25E6%25BA%2590%25E3%2580%2581%25E5%25B7%25A5%25E5%2585%25B7%25E3%2580%2581%25E5%258A%259F%25E8%2583%25BD%25E8%25BF%259E%25E6%258E%25A5%25E5%2588%25B0AI%25E6%25A8%25A1%25E5%259E%258B%25EF%25BC%258C%25E5%25B0%25B1%25E5%2583%258F***USB-C***%25E6%2588%2591%25E4%25BB%25AC%25E5%258F%25AF%25E4%25BB%25A5%25E5%25B0%2586%25E4%25B8%258D%25E5%2590%258C%25E7%259A%2584%25E4%25B8%258D%25E5%2590%258C%25E7%259A%2584%25E8%25AE%25BE%25E5%25A4%2587%25E8%25BF%259E%25E6%258E%25A5%25E5%2588%25B0%25E4%25B8%2580%25E8%25B5%25B7%25EF%25BC%258C%25C2%25A0***MCP***%25E7%25BB%259F%25E4%25B8%2580%25E7%259A%2584%25E9%2580%259A%25E7%2594%25A8%25E6%25A0%2587%25E5%2587%2586%25EF%25BC%258C "https://www.anthropic.com/news/model-context-protocol%C2%A0%E5%AE%83%E5%B8%A6%E6%9D%A5%E4%BA%86%E4%B8%80%E7%A7%8D%E6%96%B0%E7%9A%84%E6%96%B9%E5%BC%8F%E7%94%A8%E6%9D%A5%E5%B0%86%E5%90%84%E7%A7%8D%E6%95%B0%E6%8D%AE%E6%BA%90%E3%80%81%E5%B7%A5%E5%85%B7%E3%80%81%E5%8A%9F%E8%83%BD%E8%BF%9E%E6%8E%A5%E5%88%B0AI%E6%A8%A1%E5%9E%8B%EF%BC%8C%E5%B0%B1%E5%83%8F***USB-C***%E6%88%91%E4%BB%AC%E5%8F%AF%E4%BB%A5%E5%B0%86%E4%B8%8D%E5%90%8C%E7%9A%84%E4%B8%8D%E5%90%8C%E7%9A%84%E8%AE%BE%E5%A4%87%E8%BF%9E%E6%8E%A5%E5%88%B0%E4%B8%80%E8%B5%B7%EF%BC%8C%C2%A0***MCP***%E7%BB%9F%E4%B8%80%E7%9A%84%E9%80%9A%E7%94%A8%E6%A0%87%E5%87%86%EF%BC%8C") 让AI应用程序的开发和集成更加简单和统一。

MCP 的产生为我们的AI应用开发模式带来了新的 **积极** 影响：

▪建立了统一的数据通道, 解耦LLM与数据服务

▪动态上下文构建: 按需获取所需数据, 取代人工拼凑

▪降低开发成本，遵循通用协议，无需定制

### IPAAS（一键转MCP）

尽管 ***MCP*** 已经提高了现有与AI结合的效率, 并提供了不同语言的SDK, 但让当前应用直接作为 ***MCP server*** 提供服务, 也存在着不小的挑战，例如：

▪ **项目的历史包袱：** 从数据格式要求、私有化接口规范等方面与 ***MCP标准化协议*** 存在鸿沟。

▪ **数据孤岛：** 所需要的数据分散在不同系统，需要开发新的接口来支持业务使用。

▪ **开发与部署：** 不管怎么来说，终究是需要再次开发一套 ***MCP*** 的接口/工具。

针对于上述问题，一个具备接口编排 + **自动化生成MCP服务** + 部署的平台则成为了迈过挑战让大家能够享受MCP带来的便捷服务的关键。而这也是我们已经完成的 **天枢iPaaS连接平台** 。

**天枢iPaaS连接平台** 是一款开箱即用的企业级应用集成平台，提供丰富的组件和灵活的配置方式，帮助企业降低集成实施的周期和成本。平台支持多种集成方式，包括连接器API、事件驱动的消息传递编排流、数据组件编排流等。平台还提供了丰富的编排助手、全链路监控、多租户支持等功能。此外，平台支持自定义组件开发，满足个性化需求。平台适用于研发交付提效、自动化场景和与京ME机器人场景，支持 ***MCP*** 、 ***HTTP*** 、 ***JSF*** 、 ***SFTP*** 等多种协议。

在 **天枢iPaaS连接平台** 中，用户可以通过注册当前的 ***JSF*** 或者  ***HTTP*** 接口，在完成注册后，可以通过流程编排的方式将不同的接口合并成一个  ***http*** 的接口并暴露出去。

将 ***JSF*** 或者  ***HTTP*** 以连接流的形式注册成为  ***REST*** 接口： ![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/074ad17a95a543d09a3ed47401ebb0dd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=EnhxW4l9RHW%2FsGeAJwqNrpV0f4U%3D)

配置连接流， **无需** 模型处理您的复杂 **业务逻辑** ：

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b375c83c896c461d8c538b37ab4a1086~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=Ywnr1zkZB0JLI%2FMkgOgn%2Bl7Bzi8%3D)

将连接流一键生成 ***MCP服务***

 ***![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/69ee5e132f27476a9a1ec8b88fa2ba6a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=SmZU%2Fr3rcTVk8ych4IXY6mT456o%3D) 在配置完所需要的工具接口后，则可以通过表单配置的方式生成所需的*** ***MCP*** 服务。我们会给到用户  ***MCP*** 部署的URI.

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/46b52a44a2a84c25bac289f4479f798c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=iDo3nY9k5a%2FxU1nUnRfjxLJd2gQ%3D) 在这之后用户可以在 ***Autobots*** 的  ***MCP hub*** 中注册  ***MCP*** 工具并给到智能体使用。

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/931354e82f7c4f0b8f50faf245b20db5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=6tKtB%2BAK6cNvW%2F1WCCK2NAJRUpw%3D) 总的来说，通过 **API编排** + **MCP服务自动生成** + **自动部署** 的流程，构建从数据连接到场景落地的全链路自动化能力，最终实现了 **DaaS (Data-as-a-Service)** 的最终目标, 让研发能够更快的通过 ***MCP*** 赋能业务，让用户快速体验到AI时代浪潮下的便利。

### EI MCP的探索实践

IPaaS在不同场景下的落地：

#### 财务合同

#### 实现了通过自然语言对集团合同进行审阅、延期等操作：

i. 通过自然语言描述我希望延期的合同

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5809989c9ebe464ea524b1c0f848d826~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=oFtHA5TP%2Bbim9H9QUn6go7BQSMM%3D) ii. 通过MCP client进行MCP匹配调用-如果不在上文中的合同列表内则大模型会先进行查询确保合同有效

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7411d1259f3e4df492870035565a11e2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=0Wcwh%2BBgUE%2BuB6nOIsCbNeUZtBA%3D) iii. 查询结束自动调用延期MCP server

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d6fd75e2d1fd41a9bbf44c3e0ee4f4b6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=B9y8mNYE7qdxQNX68k4z2NS4zAM%3D)

iiii. 返回相应结果：已成功延期

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e7498a2682d34f29950ef3f8f96ebf3d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=fsEftt90AiK%2BKfxryXy3w8yjcmM%3D) iiiii. 业务系统验证-成功

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/dd32a71aa7844cc587ca288b6fa935d9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=p4rdz4EYOeC4LcuhIFH2e6dwcV0%3D)

人资考勤

a. 查询人资假期银行数据：

i. question: 我想查询某人的假期情况

ii. 通过MCP client进行MCP匹配调用

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/22c057909bc04df5b0fc21a6436e6bbd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=Y6vC3i5gIk2a2T3DAj7bCRLwfQk%3D)

iii. 用户确认后点击同意调用人资假期查询接口，快速查阅您的假期余额

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7ba14e80353b4ba2b73fc155e07fc749~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=9RR%2F3pwbt5CXqAJfydeveVv1%2Bgs%3D)

b. 对话式智能请假

i. question: 我想请五一前两天的假期

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a84447864c354e64b0e62524025b8ebe~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=qfz%2FsfScnFOAErXe2hlDqwv3q7E%3D) ii. 智能体根据上下文获取信息，并通过MCP client进行server匹配

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/12184319d31847c9b7ebc5563c05d85b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=FME2dNqSx7AQ9Z%2FwSPawImG3ErQ%3D)

iii. 请假成功！

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6284a524f6d5484a96948e0af02ba4e9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=YvV7xScQkv89wH4%2Bu2aDb%2F9R%2B8E%3D) iiii. 因为当前接口暂只支持按一天的维度请假，但我们提问中的要求是（五一前两天），这怎么办？

🎉我们通过实操发现Agent会自动拆分任务，自动实现多次调用！

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/18cb9b9012764357b890dbcb0ecfb8ef~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=2lgknKp%2FWnKnuFICyDAFPCVyo%2Bs%3D)

智能体会进行拆分任务调用

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/91e56cadeff140f7872aac1d4e7e9e97~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=Sm6tyM4JgZyviJfxhFmsq81zX8Y%3D)

iiiii. 结果验证：请假成功啦！

1. 审批流

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b10b9b569fa844f69be1215053054c03~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=PmdDCZwH5X%2Bde6LtPUCVF2oDPTM%3D)

1. 业务系统

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5e2a9cc1b3754017b115821d62e0a8cc~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=UJ99cE%2FtMTiuuI4De2NOWb69iKw%3D) 人资论坛

a. 查询员工论坛历史发过的帖子：

i. question: 查询京东零售的帖子：

b. 通过与模型对话发布帖子：

i. question: 自动生成帖子内容+发布帖子：

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5cf7962fb53d41a79c1105ff53de7a3d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=XZalE2VzSL2Jek60W6qm3OE0Zvg%3D) ii. 发布成功！：

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ea09fbb30cea438d8babacec915005a5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=gbhEm4D1teAV3GTXggcvx%2BAEQVo%3D)

#### 人资京英培

#### a. 查询我学过的课程：i. question: 我的学习记录：

#### b. 课程推荐能力：

i. question: 根据学习记录、岗位，请为我推荐适合我学习的课程：

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d6a98bcc57a44815891b42679feda2e0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=zOruUO9qaIDtgnuCuWiaF6aMgwk%3D)

星云前端组件库（EI design）

a. 自动生成组件代码：

i. question: 请根据这个接口文档生成前端代码

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e7f73113353d49e1a2828649adf81af4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=jWZwnzsqC6Pk99nKlETlaZDbXPE%3D) ii. 生成表单表格配置代码：

iii. 生成代码预览，成功！：

![图片](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/51b9cdc48df349b9bb0b4b56aad5ccde~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqs5Lic5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1747632988&x-signature=VrlKnrtryN%2BGcCViX9UL%2FFksksM%3D)

评论 0

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

APP内打开
