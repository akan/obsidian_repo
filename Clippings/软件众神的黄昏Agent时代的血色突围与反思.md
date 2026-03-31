---
title: "软件众神的黄昏：Agent 时代的血色突围与反思"
source: "https://mp.weixin.qq.com/s/SQG3b9e0sO8b_iDgKhDmpw"
author:
  - "[[欧阳辰]]"
published:
created: 2026-02-24
description: "引言：订阅制的葬礼如果说 2023 年是 AI 的“狂欢”，2024 年是“幻景”，那么刚刚过去的 2025"
tags:
  - "企业软件"
  - "AI Agent"
  - "商业模式转型"
abstract: "本文反思了Salesforce、SAP、Adobe等传统软件巨头在AI Agent时代面临的商业模式冲击、实施困境与战略转型，并分析了Palantir的成功逆袭，总结了Agent时代的七大生存法则。"
---
Original 欧阳辰 *2026年2月24日 07:31*

## 引言：订阅制的葬礼

如果说 2023 年是 AI 的“狂欢”，2024 年是“幻景”，那么刚刚过去的 2025 年，对于传统软件巨头而言，无疑是一场残酷的“突围和反思”。

站在 2026 年初，我们目睹了 SaaS 黄金时代建立起的“订阅制护城河”被 Agent 的洪流冲垮。Salesforce、SAP、Adobe——这些旧时代的众神，在经历了两年的迷茫、傲慢与阵痛后，终于痛苦地承认： Agent 不是软件功能的延伸（Feature），而是软件商业模式的终结（Next Game）。大家都进行某种形式的血色突围。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/LWVLSvEvzaIbHKqr3icoxBOqH4kIZEd0CFsqxxnbia2la74Sxc7bM6jwgJGdFTKy7T4aqOmMLMuz0IocHiaGQNjMxgKF6Iq86lZGbNPFLgN6ibA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

\-Saleforce: 在Agentforce1.0/2.0 把股票推到高点后，持续一蹶不振。

\-SAP：强行推进Record System到Action System的AI战略转型

\-Adobe: 内容是AI产品的应用末端，而非本根，护城河不保。

\-Palantir：让AI从“回答问题”到“执行决策”，满足企业快速定制需求。

这是一份关于“众神”如何在黄昏中寻找黎明的反思录。

## 第一章：Salesforce —— 痛苦的自我否定与实施灾难

Salesforce 是这场变革中伤亡最重，但反思也最深刻的巨人。Benioff 的帝国在过去三年里，实际上打了一场“左右互搏”的内战。

## 1\. 产品演进路线 (2024-2026)

2024 (新瓶旧酒):Einstein Copilot 。基于侧边栏的聊天机器人。被用户诟病为“Clippy 2.0”，除了写邮件摘要外几乎无用，主要是一个昂贵的 UI 玩具。

2025 (平台危机):Agentforce 1.0/2.0 。试图打造低代码 Agent 平台。因“按对话收费”模式导致落地停滞，且因缺乏状态管理导致复杂的“上下文遗忘”。

2026 (反思重构):Agentforce 3.0 & Digital FTE 。引入“数字全职员工”概念，转向结果导向。重构底层 Data Cloud，引入语义层（Semantic Layer）以解决幻觉问题。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/LWVLSvEvzaKv4fIQVbtRU3AcGtEbCEUzIfhIyKRD2fhVySF4WIfl3eM7vZPWtfhZ502GaNkia0qXbYxMyTxeZaxGLW53NS6gHXl33BsUwDdc/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

## 2\. 实施混乱：Admins vs. 概率逻辑的战争

这是 Salesforce 在 2025 年遭遇的最大滑铁卢，也是“低代码谎言”的破灭。

人才错配 ： Salesforce 的核心护城河是数百万名“点击即配置”的管理员 (Admins)。他们习惯了 确定性逻辑 （如果 A，则 B）。然而，Agent 是 概率性逻辑 （如果是 A，可能是 B，也可能是 C）。

调试噩梦： 当 Sales Agent 对客户胡言乱语时，Admin 根本无法“修复”它。没有明确的报错代码，只有“置信度分数”。Admin 试图用 Flow 的硬逻辑去管束 LLM 的软逻辑，结果导致 Agent “精神分裂” ——要么过度僵化拒绝执行，要么突破护栏产生幻觉。

反思： Agent 实施不是配置工作，而是提示词工程与 API 编排的混合体 。 2025 年，Salesforce 认证体系被迫重构，引入了大量的 Python 和向量数据库内容，这实际上承认了 “低代码 Agent”在企业级复杂场景下的失败 。

## 3\. 生态反思：AppExchange 的“鬼城”与 ISV 的消亡

2024 年，Salesforce 曾试图复制其在 SaaS 时代的辉煌，建立一个繁荣的 "Agent Exchange" ，幻想让 ISV（独立软件开发商）像当年卖 iPhone App 一样，上架成千上万个开箱即用的 Agent。

然而，2026 年的现实是：这个市场变成了一座鬼城 (Ghost Town)， 其实世界上的所有Agent市场都是鬼城（不过最近的Skills Marketplace还是很繁华的） 。这一失败揭示了 B2B Agent 生态的三个结构性死结：

- “即插即用”的谎言 ：没有那个企业Agent是即插即用的。
- 商业模式的挤压 ：客户不愿意为不确定性效果而支付费用。
- 赢家是咨询公司 ：系统集成咨询受欢迎，软件供应商受冷落。

## 4\. 商业模式的崩塌：从“卖席位”到“卖劳动力”

2025 年初，Salesforce 曾试图推行 $2/每次对话 的消费定价模式，但这 迅速被证明是 SaaS 历史上最严重的定价灾难之一。

CFO 的噩梦 (The Predictability Crisis)： 没有任何企业的财务官愿意签署一张“空白支票”。不可预测的月度账单导致企业为了控制成本，强制限制员工使用 Agent，这直接扼杀了数据飞轮效应。

效率悖论 (The Efficiency Paradox)： 正如 SaaStr 所讽刺的，按对话收费实际上是在 “惩罚高智商 Agent” 。如果一个聪明的 Agent 一句话解决问题（赚 $2），而一个笨 Agent 啰嗦五句（赚 $10），软件厂商就失去了优化模型的动力。这种利益错位让客户感到被收割。

2026 修正： "Digital FTE" (数字全职员工) 报价

面对反噬，Salesforce 在 2026 年初彻底重构了定价体系，推出了 "Role-based Pricing" ：

Tier A - SDR Agent:定价 $36,000/年 （约等于美国初级 SDR 年薪的 1/3）。包含无限次对话与线索处理。

Tier B - Service Agent:定价 $24,000/年 。提供 7x24 小时不间断的 L1 客服支持。

深度反思： 这是 SaaS 历史上第一次，软件公司将自己置于了 劳动力市场 (Labor Market) 而非 软件市场 (Software Market) 。 企业 砍掉 $50,000 的软件预算很难，但用 $36,000 的 Agent 替代一个 $80,000 的 Headcount（人头）却极具吸引力。

服务即软件 (Service-as-a-Software)： 客户不再关心底层用了多少 Token，只关心这个“数字员工”年底有没有完成 KPI。Salesforce 终于明白： 企业不为过程（Tokens）付费，只为结果（Headcount replacement） 买单。

## 第二章：SAP —— 用 AI 进行的“清洗”

不同于 Salesforce 在前台的喧嚣，SAP 在后台的反思更加冷酷。SAP 明白： 在 ERP 里，幻觉 (Hallucination) 等同于财务犯罪。

## 1\. 产品演进路线 (2024-2026)

2024 (The Assistant):Joule (Early Access) 。主要用于 HR（SuccessFactors）和简单的系统导航。被戏称为“昂贵的搜索栏”，只能回答“怎么申请休假”这种低价值问题，无法触及核心财务和供应链事务。

2025 (The Analyst):Joule Deep Research 。这一阶段标志着 B 端 Agent 从“聊天”迈向“思考”的关键跃迁 。Joule 不再满足于简单的检索增强生成（RAG），而是引入了 多跳 推理 (Multi-hop Reasoning) 技术。

<table><thead><tr><th><section><span>维度</span></section></th><th><section><span>Joule</span></section></th><th><section><span>Joule Deep Research</span></section></th></tr></thead><tbody><tr><td><strong><span>目标</span></strong></td><td><section><span>执行操作、快速查询、简单洞察</span></section></td><td><section><span>深度研究、复杂分析、战略决策</span></section></td></tr><tr><td><strong><span>数据范围</span></strong></td><td><section><span>单系统 / 局部数据</span></section></td><td><section><span>全 SAP 内部 + 外部多源</span></section></td></tr><tr><td><strong><span>推理深度</span></strong></td><td><section><span>单轮、浅层</span></section></td><td><section><span>多轮、链式、交叉验证</span></section></td></tr><tr><td><strong><span>输出</span></strong></td><td><section><span>短句、表格、操作指令</span></section></td><td><section><span>结构化报告、深度分析、可执行建议</span></section></td></tr><tr><td><strong><span>用户</span></strong></td><td><section><span>业务操作人员</span></section></td><td><section><span>分析师、管理者、战略决策者</span></section></td></tr><tr><td><section><span><span>口号</span></span></section></td><td colspan="2"><section><span><span>“AI for Every Business Process”</span></span></section></td></tr></tbody></table>

  

2026 (The Enforcer):Clean Core Strategy 。SAP 不再妥协。将高级 Agent 功能与“洁净核心”强绑定，强制客户放弃自定义代码。

SAP Clean Core（清洁核心）是 SAP 针对 S/4HANA 系统提出的一套 **系统架构和实施方法论** ，核心目标是： **尽可能保留 SAP 标准功能（原生核心），最小化对核心代码的定制化修改，让企业的 SAP 系统核心保持 “干净”，核心的实施原则如下**  

- 优先用 SAP 自带功能，靠配置满足需求。
- 能用低代码 / 无代码工具实现，就不写代码。
- 复杂需求放在系统外部开发，通过接口调用。
- 必须写代码时，只写少量合规代码，不修改核心。

![previewImag](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

previewImag

## 2\. 技术反思：脏乱差的老系统 是 Agent 的坟墓

SAP 在过去三年最大的教训是： 通用大模型救不了“屎山代码” 。

定制业务的灾难： 绝大多数 SAP 客户（尤其是制造业巨头）运行的是高度魔改的系统，利用SAP定制语言ABAP开发的。GPT-5 也许精通 Python 和 Java，但它不一定能熟悉ABAP语言，也读不懂一家德国化工企业 20 年前写的、只有德语缩写注释的、逻辑极其晦涩的 Z-Code（自定义代码） 。

流程挖掘的断层： Agent 预设企业遵循 SAP Best Practices（最佳实践），但实际上客户可能在使用一套 2008 年为了绕过系统限制而发明的“临时解决方案”。当 Agent 试图按标准流程执行时，它不仅会报错，甚至可能破坏原有的数据完整性。

## 3\. 战略反思：Agent 作为“逼迁”武器 (The Migration Weapon)

SAP 极其精明地利用了 CEO 们的 AI 焦虑，将 Agent 变成了清理技术债务的最后通牒。

"No Clean Core, No AI"： SAP 实际上是在告诉客户：“你想用那些酷炫的供应链预测 Agent 吗？可以，但前提是你必须抛弃过去 20 年积累的‘烂代码’，回到标准化的 Clean Core 上来。”

结果： Agent 成了 SAP 历史上最有效的销售工具，它推动了 "RISE with SAP" 的签约率，逼迫那些原本打算在 ECC 版本上赖着不走的客户开始了痛苦的云迁移。

## 4\. 交互反思：Chat-->Dashboard (可解释性至上)

SAP 深刻反思了“聊天框”在 B 端的局限性。 业务人员不需要一个会聊天的机器人，他们需要一个能生成 "Root Cause Analysis Dashboard" (根本原因分析仪表盘) 的分析师 。向Chatbot问问题其实是面向专业人士（To Professional)，大部分业务人员未必掌握问好问题的能力。

- 聊天 = 信息;
- Dashboard = 权力 + 决策;

Show me, don't tell me： 当财务总监问“为什么毛利下降？”时，Joule 不再生成文本段落，而是直接生成一个动态仪表盘，高亮显示汇率波动、原材料涨价和特定供应商的影响因子。

可点击的审计线索： 每一个 AI 生成的结论都必须支持 Drill-down（下钻） 到原始凭证。在后台业务中， 可解释性 (Explainability) 远比对话流畅度重要。

## 5\. 商业模式：混合收割 (The Hybrid Harvest)

不同于 Salesforce 在定价上的反复横跳，SAP 建立了一套极其稳固的收割模式。

AI Units (算力税)： 基础功能免费，但 Deep Research 这种高算力消耗功能需要消耗 "AI Units" 。企业预付费购买算力包，用完即止。

价值溢价： SAP 在续约时展示 "Value Realization Dashboard"（例如：Joule 挽回了多少供应链损失），以此作为软件订阅费涨价的硬通货。

## 第三章：Adobe —— 创意与数据的“生殖隔离”

Adobe 的痛苦在于，它左手拥有最强的生成能力（Firefly），右手拥有最强的营销数据（Realtime CDP/Marketo），但两只手在 2025 年之前是 断裂 的。Adobe 在 2024-2025 年的教训主要集中在：拥拥有了最强的“生成器”和最强的“发送器”，但中间缺少了一个能把两者“逻辑化连接”的智能调度 Agent。

## 1\. 产品演进路线 (2024-2026)

2024 (The Generator):Firefly Web & Photoshop Integration 。这一阶段，Adobe 专注于让 AI 画出更逼真的图片。但这只是工具层面的创新，对于企业 CMO 而言，这仅仅意味着设计师作图快了一点，并没有解决核心的“内容供应链”瓶颈。

2025 (The Pipeline):Adobe GenStudio 。Adobe 开始尝试将 Workfront（项目管理）、AEM（资产管理）和 Firefly（生成）打包。然而，早期的 GenStudio 缺乏真正的编排能力，设计师仍然需要手动将 AI 生成的图片在不同尺寸和格式之间进行繁琐的调整，被称为\*\*“最后一公里的排版地狱” (The Last Mile Formatting Hell)\*\*。

2026 (The Brain):Content Knowledge Graph 。这是真正的质变。Adobe 打通了 Creative Cloud 和 Experience Platform，推出了“内容知识图谱”。Agent 不再只是生成像素，而是生成带有“业务语义”的资产，实现了“像素”与“受众”的完全对齐。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 2\. 营销反思：规模化的垃圾邮件 (Spam at Scale)

2025 年，营销人员获得了“无限弹药”。Agent 每天生成海量内容并推送到 Marketo 和 Campaign 中。

营销疲劳 (Marketing Fatigue)： 根据 Forrester 的数据，由于缺乏策略性的 Agent 管控，客户收到大量虽然“看起来是个性化”但实际“毫无灵魂”的 AI 生成内容，导致退订率 (Unsubscribe Rate) 飙升 40%。

反思： Adobe 意识到， Agent 的核心能力不应该是“生成 (Generation)”，而应该是“克制 (Restraint)”和“编排 (Orchestration)”。 2026 年，Adobe 的重点转向了 "Governance Agent" (治理智能体) ，即限制 Agent 的发送频率，并强制要求内容必须通过“品牌一致性”评分。

## 3\. 数据架构反思：元数据的断层 (The Metadata Disconnect)

Adobe 最大的技术失误在于其 Creative Cloud（创意云）与 Experience Platform（营销云）之间的“ 生殖隔离” 。

个性化的恐怖谷 (The Uncanny Valley of Personalization)：

反思改进： 2026 年，Adobe 推出了 "Content Knowledge Graph" ，强制要求所有生成的 Asset（资产）必须携带结构化的元数据标签，并与 CDP 的用户标签 (User Tags) 进行 语义对齐 (Semantic Alignment) 。Agent 必须是一个“双语者”，既要懂像素 (Pixels)，也要懂受众 (Audience)。

| 对比维度 | Adobe Content Knowledge Graph (CKG) | Adobe GenStudio |
| --- | --- | --- |
| **本质定位** | **底层知识基础设施**  （Knowledge Layer） | **上层应用平台**  （Application Layer） |
| **核心能力** | 统一语义建模、知识融合、AI 接地、品牌合规、可追溯推理 | 内容规划、AI 创作、资产管理、审批分发、效果分析、全链路工作流 |
| **数据处理** | 结构化、语义化、建立 **实体关系网络** （知识图谱） | 管理文件、素材、项目、流程、版本、权限 |
| **AI 角色** | 为 AI 提供 知识与规则 ，解决 “懂不懂、合不合规” | 用 AI 提供 创作与效率 ，解决 “做不做、快不快” |
| **输出物** | 知识标签、语义关系、合规规则、推理依据、洞察模型 | 营销物料、设计稿、内容变体、项目计划、绩效报告 |
| **用户价值** | 让 AI **理解品牌、消除幻觉、保障合规** | 让团队 **规模化生产、高效协作、数据驱动内容决策** |
| **依赖关系** | **独立底座**  ，可被 GenStudio、Firefly、AEP 等调用 | **依赖 CKG**  ，用 CKG 实现品牌合规与智能推荐 |

  

## 4\. 商业模式：供应链定价 (Supply Chain Pricing)

Adobe GenStudio 的推出标志着 Adobe 终于想通了如何 从“卖工具”转型为“卖流水线”。

IP 即产品 (IP is the Product) ： Adobe 基于这些 IP，为企业打造 **专属的品牌生成模型** （Firefly Foundry），让 AI 100% 贴合品牌调性，不出错、不违规。 Adobe 靠 “托管、训练、运行这个工厂” 赚钱 。

定制模型训练费 (Custom Model Training Fee) ： **付费让 Adobe 用你的私有数据训练专属模型** （图像、视频、文案、3D 全模态）； **把 “一次性软件授权” 变成 “长期 AI 服务订阅”** ，锁定高价值客户。

企业资金池与双速通道 (Pooled Capacity & High/Low Speed) ： 企业预购 / 订阅一个 **AI 算力额度池** （生成积分、GPU 小时、模型调用次数），团队共享使用， 不再按人头算 。 **AI 算力是稀缺资源，速度 = 金钱** 。 企业为 “更快、更稳、更优先” 支付溢价。

Adobe 2026 年最新的体系中，AI 计费被拆分为两大体系： **内容生成（Credits） **与** 营销智能（Actions）** 。

| **计费维度** | **Generative Credits (生成点数)** | **Generative Actions (生成操作)** |
| --- | --- | --- |
| **所属产品** | Creative Cloud / Firefly / **GenStudio** | **Experience Cloud** (CDP / AEP / AJO) |
| **应用场景** | 图像生成、视频创作、矢量图设计 | 数据查询、受众分析、营销逻辑编排 |
| **核心逻辑** | 侧重“内容资产”的生产量 | 侧重“业务决策”的智能化程度 |

| **场景** | **包含 Actions (年)** | **计费规则** |
| --- | --- | --- |
| **AEP / CDP 基础包** | 约 4,000 次 | 购买 Prime/Ultimate 版本的自带额度 |
| **GenStudio 营销版** | 约 60,000 次 | 包含 10 个 Power Users 的重型生产包 |
| **AEM Sites (CMS)** | 1,000 次 / 1M 请求 | 每 100 万次内容请求赠送 1,000 次生成 |

对于图片生成类型，费用比较容易标准化，量也比较大；对于数据分析和操作洞察，Adobe定义了一个Action的单位，毕竟Action的使用量不会太大少，大概是图片生成的10倍-20倍的费用。

  

## 第四章：Palantir 的逆袭 —— 为什么它赢了？

当 Salesforce 和 SAP 还在为旧系统的泥潭挣扎时，Palantir 在 2025 年凭借 AIP (Artificial Intelligence Platform) 实现了惊人的逆袭。其成功不仅是技术的胜利，更是对企业级 AI 落地方法论的彻底重写。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

## 1\. The Ontology Victory (本体的胜利) —— 重新定义“数据对话”

Palantir 赢在它从一开始就看穿了 LLM 的局限性与本质： LLM 只是推理引擎，Ontology (本体) 才是业务地图。

Chatting with Data vs. Operating on Data ： Chat本质 上 **信息获取、解释、总结； Operating本质上是直接 **执行、决策、操作、控制****

确定性基座 (Deterministic Grounding)： LLM负责 理解人话 → 翻译成本体能懂的指令 → 本体执行 → 返回结果。Ontology 是 LLM 的缰绳与地面。

## 2\. Bootcamps > SaaS Sales —— 咨询行业的丧钟

Palantir 抛弃了传统的、长达 6-12 个月的 SaaS 销售与咨询实施周期，改用 "AIP Bootcamps" （实战营）。这一策略在 2025 年彻底颠覆了 B 端软件的 GTM（Go-to-Market）规则。

从“PPT 销售”到“暴力落地”：

工程文化的胜利： Bootcamp 模式实际上是将 工程师 直接推向了前台。客户发现，与其和穿着西装的销售聊愿景，不如和穿着帽衫的工程师直接写代码解决问题。这迫使传统 SaaS 巨头不得不重新思考其臃肿的销售团队结构。

## 3\. 军工级治理 (Military-Grade Governance) —— 影子 AI 的解药

在 2025 年“影子 AI”泛滥、企业数据泄露频发的背景下，Palantir 的国防背景成为了其最强的护城河。

记录级权限 (Record-Level Security) ： 你能看到哪些数据，不是按 “表 / 模块 / 部门” 控制，而是精确到：每一行、每一条记录、每一个字段，你能不能看。

Palantir的真实竞争力和挑战

写道这里，还是想多说几句Palantir。虽然，大家都在说Ontology是一个产品优势，其实我觉得它优势和挑战还是藏在以下几点。

1\. Palantir聚焦在基于产品的业务执行（Business Operation)： 很多咨询公司还是产出很多PPT和原型，很多产品需要从0开始构建，咨询公司很多是按照人天的商业模式来定价，制约了产品的发展；很多平台产品的实施只是基于自己的产品扩展，而非面向客户的跨系统的业务本身。

2\. Palantir抓住企业的多个分裂系统的时机(Fragment)： 通过AI和Agent来打通和整合各个系统，这个是当前企业亟待解决的一个业务问题。 换句话说，从底层云服务层（Azure,AWS)，数据库(Snowflake, Databricks），应用层（Salesforce,SAP），再到跨应用的AI层(Palantir)，Palantir试图抓住企业的AI层。当然，从历史架构的趋势来看，应用层也会支持AI层，甚至云服务层和数据库层。所以Palantir这个时机很可能是临时的。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

  

3. Palantir将面临缺少工作台入口（Working Runtime)的风险 ：Palantir聚焦在做决策AI层，那么这些决策在哪里与员工进行交互是非常关键的，当年微软通过Outlook,Excel, Power占领了工作的Runtime，在新一代的Runtime可能是Slack,Teams，飞书，企业微信等企业入口软件，这些软件增加决策层AI也是渐进性增强的。

4\. Palantir目前的FDE扩展能力，不是软件的扩展能力 。业务增长受限于人力增长，也非常依托个人的业务和工程的认知能力。其实，Palantir的商业模式和早期SAP的模式比较像，都是面向大客户的深度定制的系统供应商，后面慢慢产品标准化。Salesforce是天生的SaaS产品，从小客户做大大客户。未来还有一个可能，企业未必需要过于复杂的软件，可能AI可以自己来管理可控的功能。代码和软件产品都会变薄，可能一个强大的AI操作系统会成为核心。

  

## 结语：Wrapper 的终结与 Agent 时代的七大铁律

站在 2026 年回望，Salesforce、SAP、Adobe 和 Palantir 的沉浮录构成了 Agent 时代的生存法则。这不仅仅是一次技术的迭代，更是一场关于“谁掌握了企业真相”的权力重构。

以下是 2026 年企业级 Agent 市场的七大铁律：

换壳聊天必死 (The Death of Wrappers)： 仅仅在 GUI 上套一层 LLM 聊天框是没有任何价值的。企业不需要另一个“聊天窗口”，企业需要的是能干活的哑巴。 Chatbots are toys; Dashboards are tools.

脏数据是绝症 (Legacy Data is Terminal)： RAG 不是技术债务的创可贴。没有 Clean Core (SAP) 或 Semantic Layer (Salesforce)，Agent 就是“幻觉放大器”。LLM 无法通过概率预测来修复错误的物料主数据。

结果付费 (Outcome-Based Pricing)： 订阅制的黄金时代已逝。商业模式必须从“出售软件使用权 (Seats)”转向“出售劳动力产出 (Outcomes)”。Salesforce 的 Digital FTE 和 Adobe 的供应链定价证明了： 客户只愿意为“省下的人头费”买单。

低代码神话破灭 (The Low-Code Fallacy)： 复杂的企业级 Agent 需要的是 AI工程师和数据策略专家 ，而不是只会拖拽的 Admin。用确定性逻辑（Flows）去管束概率性逻辑（LLM）是一场注定失败的尝试。

安全即产品 (Safety is the Moat)： 在 B 端，IP 赔偿条款（Indemnification）和军工级的数据治理（Palantir）比生成质量更重要。 能阻断影子 AI 的合规能力，本身就是最高级的 AI 能力。

场景化智能 (Contextual Intelligence)： 通用的 RAG 必死无疑。 真正的价值在于 Outside-In Reasoning 。只有 打通了“公有数据”与“私有数据” 的 Agent 才有生存空间。

咨询的工业化 (Industrialized Consulting)： 漫长的实施周期已成历史。Palantir 的 Bootcamp 模式证明了：在 Agent 时代， Time-to-Value 必须以“天”为单位计算。

## 众神的黄昏，还是泰坦的黎明？

“众神的黄昏”并非末日，而是旧秩序的崩塌与新秩序的重铸。

在这场战役中，我们将看到一些曾经辉煌的名字因为固守“订阅制”和“封闭花园”而逐渐暗淡，沦为 AI 时代的“遗留系统”。但同时，我们也看到那些敢于 断臂求生 （如 SAP 强推 Clean Core）、敢于 重构底座 （如 Adobe 打通元数据）、并敢于 对结果负责 （如 Palantir 暴力落地）的巨头，正在进化为新的泰坦。

Agent 时代不再属于“卖铲子的人”，它属于那些“ 用铲子挖出金子并分给客户的人 ”。SaaS (Software-as-a-Service) 已死， Service-as-a-Software (服务即软件) 的时代，才刚刚开始。

引用资料 (2025-2026)

SaaStr, "Salesforce Now Has 3+ Pricing Models for Agentforce: The CFO's Nightmare", Feb 17, 2026.

SalesforceBen, "Where Are We Really at With Agentforce Adoption? The ContextAmnesia Crisis", Dec 2025.

HBR(Harvard Business Review), "TheCompliance Paradox in GenAI Adoption: How Safety Created Shadow AI", Dec 2025.

WSJ(Wall Street Journal), "The Hidden Cost of Silent Customers: Why AI Deflection Rates Are Misleading", Nov2025.

Forrester, "The State of Customer Service Automation 2026: NPS Dips Amidst AI Rollout", Jan 2026.

Gartner,"Magic Quadrant for Supply Chain Planning Solutions 2026: SAP's Agentic Comeback", Feb2026.

PalantirInvestor Relations, "Q4 2025 Financial Results:The AIP Bootcamp Effect", Jan 2026.

NN/g (Nielsen Norman Group), "AI Agent UX: Moving Beyond the Chatbot to Observability Dashboards", Feb 2026.

ASUG(Americas' SAP Users' Group), "The AI Gap in ERP: Why Brownfield Implementations Fail withAgents", Jan 2026.

作者提示: 个人观点，仅供参考

继续滑动看下一个

互联居

向上滑动看下一个