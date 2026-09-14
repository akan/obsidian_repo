---
title: "企业AI平台之争：从微软Foundry到腾讯WorkBuddy"
source: "https://mp.weixin.qq.com/s/5RmgGBCENWGkUhjepG5_ng"
author:
  - "[[AI研究咨询机构]]"
published:
created: 2026-09-14
description: "微软Foundry，从模型入口走向AI应用生产平台"
tags:
  - "企业AI平台"
  - "微软Foundry"
  - "腾讯WorkBuddy"
  - "MaaS"
  - "Agent开发"
  - "知识管理"
  - "Skill"
  - "算力资源管理"
  - "分层架构"
  - "套件整合"
  - "生产责任"
  - "责任边界"
abstract: "企业AI平台不会归一为单一产品，而会在保留专业分层的基础上形成套件整合，收敛的是责任边界和连接方式。"
---
AI研究咨询机构 爱分析ifenxi *Sep 14, 2026, 8:09 AM*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YWQ4aX7njl0TSxuicCotdpVCve1Ig3mWIvwSWpfxTh5YQDSESkhvxxZn4UvqDWSnGOibLw45VgpSxfxzaYibdvIXiaNXib0PZXUh3d6DUenHbvOI/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

企业AI平台正在形成多条相互交叉的演进路径：有的平台从模型服务出发，有的从Agent开发、企业知识、Skill或算力资源管理切入。随着企业AI从试验走向生产，它们一面强化原有能力，一面向开发、运行和治理等相邻环节扩展。

微软Foundry与腾讯WorkBuddy分别从云与模型服务、工作入口与Skill出发，呈现了企业AI平台跨层扩展的不同方向。

这给企业选型带来一个基础问题：名称相近的产品，管理对象、覆盖的生命周期和承担的生产责任可能完全不同。如果没有统一坐标，MaaS、Agent开发平台、知识管理平台、Skill平台和算力资源管理平台就会被混在一起比较（见表1）。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/YWQ4aX7njl1LAqKZXfdXYxmOAJ9jh02DIAtv4bytfAibJcwIjd2DJsf0J3FkBmIYeCv6OicDZ4DqqjKXbw9M1mJzIWKqckiaLfqM6ZvRibw8cao/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

表1：企业AI平台的五类产品形态

这些产品形态可以在熟悉的产品中找到对应：百炼、火山方舟提供模型服务，火山HiAgent、Dify支持Agent开发，腾讯乐享侧重企业知识管理，WorkBuddy承载Skills与任务执行，青云AI智算平台负责算力资源纳管。它们的能力也存在交叉，例如百炼同时支持模型调优和应用构建，Dify也包含知识库。

其中，微软Foundry是观察这种演进与变化的代表样本。它从模型服务入口，逐步扩展到Agent开发、运行和治理。当企业AI的瓶颈从获得模型转向让应用稳定进入生产，平台管理的对象和承担的责任也随之扩大。

由此进一步引出一个行业问题：当不同起点的平台持续扩展能力，最终会形成怎样的边界与分工？

结合公开产品资料和厂商调研，爱分析认为，企业AI平台更可能在保留专业分层的基础上实现跨层整合：头部厂商通过套件和统一治理连接多层能力，专业厂商通过接口参与不同生态，而逐步趋于稳定的，将是责任边界和连接方式。

**01**

比较企业AI平台，需要看三个维度

比较不同平台的定位与能力边界，可以从三个维度入手：管理什么对象、覆盖哪些生命周期环节、承担什么生产责任（见表2）。这一分析框架归纳了平台在管理资产、功能覆盖和服务交付上的实际差异，分别回答“管什么、管哪些环节、负责到什么程度”。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YWQ4aX7njl0xSibpWYrfSXdoP8siagD8gf5HzUUjajZ1PD6QmC2A0jA1w93bEv26kJsLpZDKBqES9INezZZMhictbYzs305KibOnBVmmgTeMCss/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

表2：比较企业AI平台的三个维度

管理对象不同，平台的价值指标也不同。算力平台关注利用率、排队时间和任务吞吐；MaaS关注模型效果、延迟和Token成本；Agent平台关注任务完成与工具调用；知识平台关注内容是否可信、及时且符合权限；Skill关注任务方法能否复用和持续更新。

生命周期体现平台对应用生产过程的覆盖程度。有的平台侧重编排和调试，有的平台进一步支持部署、运行与治理。应用进入生产后，需要在质量、安全和成本约束下持续完成任务；平台能否支撑这些要求，决定了企业从原型走向实际应用还需补齐多少工作。

生产责任进一步说明供应商在所覆盖环节中负责多少工作。同样支持Agent运行，自部署软件与全托管服务给企业留下的运维任务不同；提供向量检索组件，与同时管理数据连接、索引更新和权限同步，承担的工作也不同。平台责任扩大并不意味着企业责任消失：业务规则、数据质量、异常处置和最终任务结果仍需企业负责。

例如，让AI处理客户退款，平台可以帮助AI连接订单系统、控制操作权限，并记录处理过程；企业则需要规定，多大金额可以自动退款、什么情况必须人工审批，以及出错后如何处理。平台保障操作按规则执行，企业决定规则和授权范围。

基于这三个维度，爱分析将企业AI平台定义为：组织模型、数据、知识、SKill工具和运行环境，支持AI应用开发、运行与治理的一组可复用能力。具体产品可以侧重其中部分环节，其边界需要结合管理对象、生命周期覆盖和生产责任判断。

因此，企业不应先问哪家平台功能最多，而应先确认当前最需要管理的资产、应用所处阶段，以及希望供应商持续承担哪些工作。

**02**

生产需求推动平台靠近，厂商基础决定分化

企业AI从模型验证走向业务应用，推动平台补齐任务执行、运行和治理能力；不同行业、应用场景及企业已有系统，又使需求存在差异。

厂商据此沿各自的技术和客户基础扩展，形成能力演进、产品分化与跨层整合并行的过程，而非从MaaS到Agent、知识和Skill的依次升级（见图1）。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/YWQ4aX7njl1Qm1dZGsltyFMicXzsmpbLJlU8Bk9AUpv3GULAbXGS1WFlLaD8dyVZ5B8oyIIm0oUwhf7utF1p0QEj48tZ1VVqKfAmjIfRXOpY/640?wx_fmt=png&from=appmsg#imgIndex=3)

图1：企业需求与厂商基础共同塑造平台演进

1\. 企业需要的正从模型能力转向生产能力

获得模型不等于应用能够进入生产。企业还要解决模型如何连接内部数据和系统、如何完成任务，以及如何在质量、成本和安全约束下持续运行。

Agent放大了这一缺口。它需要拆解任务、调用工具、保留状态并处理失败；进入核心业务后，还要增加身份认证、权限、审计等安全手段。企业由此不再只比较模型效果和Token单价，而会关注上线速度、任务成功率、业务结果和单位成功任务成本。

问答应用通常只处理一次输入和输出，Agent却可能跨越多个步骤和系统，运行数分钟甚至更长时间。平台需要知道任务进行到哪一步、调用过哪些工具、为什么失败，以及应该重试、回滚还是转交人工。模型越接近任务执行，平台需要承担的运行责任就越多。

企业AI从模型验证走向业务应用后，平台既要支持任务稳定执行，也要让数据连接、知识和工作方法在多个项目间复用，逐步沉淀为企业可持续维护的资产。

2\. 厂商沿各自优势扩展，不会完全重合

企业对生产能力的要求逐渐接近，厂商补齐能力的路径却各不相同。原有客户、技术基础和交付模式，决定了厂商从哪里扩展，以及哪些能力适合自建、哪些需要借助合作伙伴（见表3）。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YWQ4aX7njl1RojD7TMJ0bfk9dOetPXSd7oGc4fztBb4UdYEUmMmCGovjxTc2tAVEk8wic90pOUibJGDIMtSAOtF7DZLqQ5b1h0ZVR35OS95fg/640?wx_fmt=png&from=appmsg#imgIndex=4)

表3：五类厂商沿各自优势扩展

这些基础构成了路径依赖，也使各类厂商的优势难以互相替代。MaaS厂商擅长模型服务，知识平台积累企业内容和权限体系，办公软件更接近用户流程。

平台增加能力是逐步演进的过程，判断市场是否收敛，不能只看功能清单是否相似，而要看厂商最终承担到哪一层责任，以及各层能否稳定连接。

**03**

微软Foundry，从模型入口走向AI应用生产平台

微软Foundry提供了观察上述机制的具体样本：企业对应用落地的要求推动它持续扩展能力，微软既有的云与企业软件基础则塑造了它的整合方式。

沿着Foundry产品演进，可以看到平台如何从模型入口逐步扩大管理对象和生产责任，其变化主要体现在以下四个节点（见图2）。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YWQ4aX7njl3jzFgQ7faD2rtXBjRsgkvC3e3ia5muIV1OB5TetrHv05qFia1B8wibf4gWqurcFGJ6lnF2ZwXknDKffr21D621O5LKhEolXhNr2g/640?wx_fmt=png&from=appmsg#imgIndex=5)

图2：微软Foundry从模型入口扩展为AI应用生产平台

Azure AI Studio早期围绕模型供给与训练提供服务。2024年加入Agent Service后，平台开始围绕应用组织模型、数据和工具。2025年至2026年，Foundry IQ、Control Plane和Hosted Agents又把企业上下文、跨项目治理、自定义Agent托管和运行质量管理纳入平台。

其中，2024年的关键变化是平台开始从“选择和优化模型”转向“组织AI应用”：Agent不只调用模型，还要连接数据、工具和外部系统。2025年之后的变化则进一步解决两个生产问题——Agent如何获得企业上下文，以及企业如何统一掌握不同项目的风险、性能和成本。

这使Foundry在三个维度上同时扩大：管理对象从模型延伸到知识、工具、Agent和运行资源；生命周期从模型优化与部署延伸到应用开发、运行、评估和治理；生产责任从提供组件延伸到托管部分Agent运行和统一控制。

由此，Foundry从模型入口演进为企业AI应用的建设与运行入口，战略价值也随之变化。

微软争夺的不再只是模型调用量，还包括围绕AI应用形成的数据连接、工具、流程和治理关系，并借此连接Azure算力、数据库、Fabric、身份安全体系以及Microsoft 365等业务入口。

这也是Foundry由Azure产品工具上移为微软企业AI平台入口的原因。企业应用进入生产后，会持续使用数据库、检索、监控、安全、Agent运行和业务软件。Foundry将这些原本分散的消费与客户关系组织到同一条应用生产链上，其价值不仅是增加一项平台收费，更是承接微软多层产品的AI增量。

但Foundry并没有消除平台分层。Microsoft Foundry的命名不代表脱离Azure，其计算、存储、搜索和安全能力仍建立在Azure之上；它也需要支持第三方模型、外部框架和企业既有系统。Foundry的落点不是把所有AI功能装进一个门户，而是围绕生产级应用形成连续的模型、上下文、运行和治理能力。

**04**

AI平台不会归一，更可能形成分层架构上的套件整合

讨论到这里，还需要拆开两个容易被混为一谈的问题。

Foundry的跨层扩展不意味着企业AI最终只剩单一全栈平台，市场可能形成三种结构（如表4）。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/YWQ4aX7njl2Sx6UsVwibkIwicicOIb4cAtVJLtBGOfy2UVVIaB3749wPNjmyXQzqM1IgHbW23SKPrZzpcTibPvL29ZF9TR1hjianvhtKksmAD3z0/640?wx_fmt=png&from=appmsg#imgIndex=6)

表4：企业AI平台可能形成的三种结构

其中，分层架构上的套件整合更符合生产需求（见图3）。AI应用需要从开发到运行的连续支撑，能力割裂会增加集成成本，体系封闭又难以兼容企业已有系统。因此，头部厂商倾向于将通用能力纳入套件并统一治理，专业产品则通过接口参与，保留各自的独立价值。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YWQ4aX7njl0WgoA54TLlmI9e7sZalQMS3QDdUC9AQTJX7lhOBCicJsuSLEpIfq0tLzRviaHAxicZkicuQtwzUu1nxvfR4ysWo9anAZB5szWutKg/640?wx_fmt=png&from=appmsg#imgIndex=7)

图3：企业AI平台的收敛方向：分层架构上的套件整合

海外头部厂商正在沿不同起点采取类似行动。AWS用AgentCore补齐Agent运行、身份和可观测能力，Google将模型、Agent和云上数据服务继续连接，OpenAI与Anthropic也在模型之外向Agent开发和托管运行延伸。

这些产品并不相同，但都说明竞争正在从提供单项模型能力，走向承担更多生产责任。

中国市场同样呈现出多条路径并行的特点（见表5）。云服务、知识管理和办公工具等既有产品，正在与模型及Agent能力结合；新兴Agent平台则向运行和治理扩展。不同厂商围绕各自客户和技术积累形成了以下几类路线：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/YWQ4aX7njl3CyF0mHXPADqgZ5xxwAXGgVBXN1hDGD2eYqCZsX3RaFj5DESbJlhPFibbulapLqtiap1oKn5gQVTicibvcLUGFqurGI6PI6WOcIBQ/640?wx_fmt=png&from=appmsg#imgIndex=8)

表5：中国市场AI平台产品路线

上述分类反映产品的主要起点和资产基础，同一产品可以覆盖多类能力。

这些产品沿不同路径扩展。百炼早期能力重心包括SFT等模型训练调优，后来增加Agent开发，当前以综合MaaS统摄模型调用、调优和应用构建；腾讯乐享和百度则长期从事知识库与知识管理，大模型和Agent是在既有能力上增加新的交互与执行方式；算力平台首先解决的是基础设施纳管和运营，大型云厂商通常也内置类似能力。

腾讯WorkBuddy则呈现了从工作入口向平台扩展的路径。企业希望AI结合内部资料、业务规则和现有系统，完成经营分析、客户服务等实际工作。围绕这类需求，WorkBuddy通过Skill复用工作方法、通过连接器调用业务系统，并支持伙伴将行业经验与工具组合为专用工作台。

这使企业有机会在通用平台上配置适合自身业务的AI应用：平台提供共性的任务执行能力，企业和伙伴补充业务知识与流程，减少每类任务的独立建设工作。

与Foundry从模型服务向应用开发和运行延伸相比，WorkBuddy从用户任务出发，聚合完成工作所需的能力。这提示了一种可能的市场方向：企业AI平台也可以由应用入口发展而来，形成“通用执行能力＋可复用技能＋行业应用”的组合。用户体验逐渐整合，专业分工仍然保留；能否进一步进入企业核心业务，还取决于任务执行的可靠性、权限治理及业务系统连接深度。

从这些路径可以看到，Agent开发与任务执行成为多类能力的汇聚位置：应用需要把分散能力组织起来，并持续满足运行与治理要求。知识管理已形成明确的企业资产和采购基础；Skill的重要性正在上升，但更多依附于Agent平台和工作入口，是否形成独立品类仍需观察。算力资源纳管则继续保持较强的基础设施属性。

微软Foundry说明了大型云厂商进行套件整合的价值，也说明了全栈平台的边界。它能够在同一体系内连接模型、上下文、运行和治理，却仍要接入第三方模型、外部数据和既有系统；Copilot Studio等更靠近业务人员和应用入口的产品，也可能与Foundry长期并存。“全栈”因此更接近完整能力组合，而不是所有层被合并为一个产品。

结合国内外产品变化，爱分析判断，企业AI平台将在持续演进与分化中形成相对稳定的分工：头部厂商以套件降低跨层协作成本，专业厂商围绕特定资产或业务入口形成优势，接口则支持不同能力的组合与替换。竞争重点将从功能数量，转向平台能承担多少生产责任、能沉淀哪些可复用资产。

**05**

甲方应选择“足够的平台”，厂商应明确责任边界

平台仍在演进变化时，企业不能只比较功能清单，选型应依次回答以下五个问题（见图4）：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/YWQ4aX7njl260cpV1C4nTcGuLppuicGKfia8n0ibooOh2kwa1WxB5MJpYALwbPsk0u7qYHNpicaz3RYn3KEpyaxHQvvRsJgVpNNDC2Eaia4bpMjA/640?wx_fmt=png&from=appmsg#imgIndex=9)

图4：企业选型AI平台的五步判断

这五个问题存在先后关系：先确认主要瓶颈和应用阶段，再盘点已有能力、划分责任，最后确定资产归属。跳过前几步直接比较功能，容易买到覆盖面很广、却没有解决当前主要问题的平台。

例如，瓶颈是异构GPU利用率和多集群调度时，应先解决算力资源纳管；问题是知识分散、权限复杂和更新困难时，知识管理比增加模型API更重要；企业已经完成多个Agent试点、但难以上线和治理时，则应重点比较Agent运行、评估和控制能力。

企业需要的通常不是功能最多的全集平台，而是“足够的平台”：覆盖当前主要问题，承担必要的生产责任，并为相邻能力和第三方产品保留接口。选型时，企业需要注意供应商锁定以及成本评估问题。

多供应商的开放体系不等于完全没有平台依赖。平台统一套件降低了建设和运维成本，必然会沉淀配置、连接和治理关系。企业真正需要控制的，是系统依赖是否透明、核心数据和知识能否导出、模型与工具能否替换，以及迁移成本是否与获得的效率相匹配。供应商锁定不是简单的“有或没有”，而是一项需要主动管理的商业和技术取舍。

成本评估也不能停留在Token单价。AI应用的实际成本还包括知识处理、工具调用、Agent运行、评估监控、底层计算、系统集成和人工处置。更有意义的指标是单位成功任务成本，以及平台能否减少重复集成和长期运维。

对厂商而言，Foundry的启示不是覆盖越广越好，而是先确定核心管理对象，再确定责任上限和扩展方向。算力平台应优化资源效率，MaaS应强化模型供给和推理，Agent平台应提高任务完成率并补齐运行治理，知识平台应保证知识可信、及时且符合权限，Skill则要解决业务方法的封装、分发和迭代。

在扩展时，厂商需要选择与核心层级相邻的方向。靠近业务流程的平台，应重点沉淀行业知识、工作流、Skill和用户入口；靠近基础设施的平台，应重点优化性能、资源效率和统一治理。无论从哪一层出发，都需要通过模型接口、数据连接器、MCP、身份协议和可观测体系接入上下游。

**05**

结语：收敛的是责任边界和连接方式

企业AI平台不会归一为一种产品。模型、Agent、知识、Skill和算力仍会保持不同的技术与采购层级，头部云厂商将整合更多通用能力，独立厂商则围绕专业资产、业务入口和开放连接继续存在。

Foundry集中呈现了这一趋势：当企业需求从获得模型转向应用生产，平台开始同时管理模型、上下文、运行和治理；但跨层整合不会消除第三方模型、专业平台和企业既有系统。

企业需要确定的是最应管理的资产和愿意交给供应商的责任，厂商需要确定的是在哪一层形成不可替代的能力、承担到什么程度并如何连接上下游。这才是企业AI平台在持续演进与分化中可能形成的收敛结果。

![Image](https://mmbiz.qpic.cn/mmbiz_png/kdLKq32LW8XDdEEib5dJTcpuGHKHoHyUzkrCTt1K7xlcDK860R0sqelxCIFXIFcVEALDRZAAVE2A00BLnD7qfIQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1#imgIndex=10)

近期活动报名

[![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/YWQ4aX7njl1mbOPGk39aP76qPmickZlw5GX8pBg7PyeLdJr4DDwFc5MSA9Fvv6jaiax4gs76wdTsxHd9hmKPLRBf94qG18o0xTgJJWN6QhcWo/640?wx_fmt=png&from=appmsg#imgIndex=11)](https://mp.weixin.qq.com/s?__biz=MzA4NzM3MTI1MQ==&mid=2247596743&idx=1&sn=ec5ae1aee31543ae0f0de93514cf3a0e&scene=21#wechat_redirect)

调研洞察 · Table of Contents

Read more