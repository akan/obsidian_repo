---
title: "大胆试错、持续推进，拓展 GenAI 在客户服务领域的新场景2024 年初，我们与客户（华宝新能）的产品、IT、客服团队 - 掘金"
source: "https://juejin.cn/post/7497821245612359730"
author:
published: 2025-04-28
created: 2025-05-07
description: "2024 年初，我们与客户（华宝新能）的产品、IT、客服团队共同探讨如何借助新兴的生成式 AI（Generative AI, GenAI）技术赋能客服团队，期望通过自动化总结和提炼现有知识库内容，高效"
tags:
  - "clippings"
---
![横幅](https://p9-piu.byteimg.com/tos-cn-i-8jisjyls3a/80e551ec95e54d3e94bf0f1cdad71e51~tplv-8jisjyls3a-image.image) ![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/ef1b479729b54febacdf28345ebe61af~tplv-8jisjyls3a-image.image)

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a498ca005955409e8d32cb3589e82a5f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqa6ams6YCK5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1746405324&x-signature=4Ln50R%2B0e%2B5HVIZEYIVQTLX%2F9Vw%3D)

### 一. 前言

提升客户服务效率与质量是企业永恒的追求目标。2024 年初，我们与客户（华宝新能）的产品、IT、客服团队共同探讨如何借助新兴的生成式 AI（Generative AI, GenAI）技术赋能客服团队，期望通过自动化总结和提炼现有知识库内容，高效应对产品咨询、故障处理等售前售后需求，提供智能响应。

经过系统集成及知识库数据准备，一阶段方案于 2024 年中期顺利上线，客服团队工作效率显著提升。相关实施细节已在 [Amazon Bedrock 知识库加速客服团队应用 GenAI 能力](https://link.juejin.cn/?target=https%3A%2F%2Faws.amazon.com%2Fcn%2Fblogs%2Fchina%2Famazon-bedrock-knowledge-base-accelerates-customer-service-teams-adoption-of-genai-capabilities%2F "https://aws.amazon.com/cn/blogs/china/amazon-bedrock-knowledge-base-accelerates-customer-service-teams-adoption-of-genai-capabilities/") 一文中详细阐述。

在此基础上，我们与华宝新能持续拓展 GenAI 的应用场景，引入智能代理（Agent），支持客户在售中环节的订单咨询需求。经过一系列技术方案的探索和迭代，最终达到了客服团队的质量要求。下面，我将与华宝新能的伙伴一起从三个角度分享这段时间的探索过程和成果，希望对您有所裨益。

第一部分：华宝新能在探索过程中的实践与总结第二部分：GenAI 赋能客服：价值思考与路径探索（我在该领域的一些思考）第三部分：方案技术架构与实现思路

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ee6ca7c076d0476b9d621d0c22002570~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqa6ams6YCK5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1746405324&x-signature=OXTcREOk7r5KY9V8b%2Fd6TPci7tI%3D)

图片由 Nova Canvas on Amazon Bedrock 生成

### 二. 华宝新能在探索过程中的实践和总结

\*以下内容是来自华宝新能团队的实践经验和心得体会，描述了他们从最初的探索尝试，到逐步落地推广 GenAI 技术，赋能客服的过程。

时间线：

1、2023 年 07 月：开始尝试通过训练模型对用户声音（VOC）进行细粒度分析（ABSA）

2、2024 年 04 月：基于 Amazon Bedrock 、RAG 增强检索构建的客服辅助工具上线

3、2024 年 10 月：首次尝试 LLM+Workflow，自动应答对终端用户开放

4、2024 年 11 月：AI Agent 的风终于从 idea 吹到了华宝新能

5、2024 年 12 月：多意图 Multi-Agent 通过了业务团队的准确性测试

从最初的探索性项目，到 2025 年 AI 创新专项团队建立和推进，客服团队/IT 团队经历了一系列从试错到落地的过程。我们在这里尝试分享一些经验和看法，来回应大家可能存在的一些疑问和思考， 如：

- 是采用成熟的 SaaS 服务，还是选择团队自研？
- 在推进过程中，如何平衡创新与风险？
- 如何推动业务团队积极参与进来？
- GenAI 在客服领域的初尝试

随着公司销售业绩的显著提升，客服团队所面临的挑战也在逐步加剧。从用户咨询数据中可以发现一些规律：

- 大促期间，月均工单量相比平时增幅为 50%-100%，但 SLA 达成比例则下降 30% 以上；
- 各咨询渠道平均首次响应解决率在 70% 左右，大部分问题可通过一次回复解决；
- 咨询工单中有 50% 以上为邮件类，另外电话咨询占比呈上升趋势；
- 首次响应的有效性与满意度成正比，回复时长每增加 2 小时，平均满意度将减少 3%-5%。

针对客服团队的痛点，我们不得不在大促期提前增派临时人手，以缓解咨询量激增带来的压力。

2024 年初，亚马逊云科技的同事 Ben 提出：“RAG 技术最近开始崭露头角，何不尝试借助 AI 为客服团队做些贡献？” 于是，我们开启了智能客服的第一阶段，构建一个工具为客服生成建议回复。详情可参考合作案例 [华宝新能基于 Amazon Bedrock 构建客服知识库，生成式 AI 赋能智能客服伴业务腾飞](https://link.juejin.cn/?target=https%3A%2F%2Faws.amazon.com%2Fcn%2Fsolutions%2Fcase-studies%2Fhellotechenergy%2F%3Fawsm.page-customer-references-cards%3D1 "https://aws.amazon.com/cn/solutions/case-studies/hellotechenergy/?awsm.page-customer-references-cards=1") 。

由于过往没有使用 AI 智能客服的经历，难以确保获得稳定的价值产出，且眼下 AI 缓解咨询压力的需求也未到迫在眉睫，因此我们选择了最小投入试错的路线，思考是否需要外购第三方 AI 平台解决客服痛点。然而，外购的考量如下：

动辄需花费上十万或几十万购买第三方服务，费用不菲；当前知识库不完善、内容更新滞后，即便使用第三方工具也需投入时间和资源，难以快速部署上线；存在对现有客服系统的适配问题（如邮件类多次回复）、特定意图标注的问题等。综合以上，我们决定先以最简单快速的方式利用现有资源，目标是不断提高准确性，在合适的节点将客服辅助转为自动回复，进一步提升工作效率：

快速启用基于 Amazon Bedrock 的知识库 RAG 全托管方案；在使用过程中收集一线客服的反馈数据，通过标签标注生成答案的可用性；根据反馈数据不断完善知识库，由指定客服分析原因并更新知识库。然而，实际执行过程中，我们遇到了以下核心问题。

#### 1\. RAG 处理订单类问题的局限性

- 订单物流需调用 API 在 ERP 系统获取数据，需相应接口实现订单拦截等；
- 产品适配或故障问题较复杂，需识别产品型号给出对应答复；
- 存在分块问题导致未能完整回复或回复无关内容等。

#### 2\. 收集数据质量不高

原因在于一线客服工作负荷较重，为应付标注任务，标注结果质量未能满足要求。另外，由于缺乏相应的 KPI 或激励机制，难以推动客服团队积极参与。

#### 3\. 知识库维护问题

收集数据质量不高导致维护知识库的客服需二次校对标注结果，其中补充和更新知识库内容成为了大量工作。这一阶段，虽然 AI 生成回复的采纳比例达到 60%，但数据并未真实反映其是否真正有用，反而给一线客服带来了额外负担。

尝试虽然曲折，但是过程的一些经验更加坚定了我们通过 GenAI 去提效客服的思路。

#### 与业务团队一起，拓展 GenAI 场景， 提高覆盖率

在与业务团队合作推展 GenAI 场景的过程中，我深入思考如何改进现状。客服同事 Jannie 曾指出，“面对如此大量的反馈数据，我该如何优化知识库”？这一问题促使我们开始从用户问题中寻找线索。得益于前一段时间使用大型语言模型对用户问题进行自动标注，我们发现高频问题主要集中于订单相关、产品规格和基础售后模块。

在此阶段，我们对第一阶段遇到的问题进行反思，寻找了调整策略的线索，并重点设定了明确的目标和进度规划，以季度为单位，分多期项目实现 ToC 向的智能客服。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3694e681c37c418e84a91fde39b70431~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqa6ams6YCK5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1746405324&x-signature=sewPqhE%2BqoFnzf7qS6UMEWeTylE%3D)

我们采用分步实施的方式推进：

**Step 1：定清优先级，聚焦 Top 问题**

我们重新分析了历史咨询数据，对人工与 AI 的意图标注结果进行对比，并依据一次解决率高的工单占比进行权重分配，确定 Q4 分为三个阶段，逐步解决 Top6 用户咨询问题。

**Step 2：避免大动干戈，动员所有客服参与，改为指定资深客服参与问题分析和方案设计**

指定特定的项目干系人，一起去梳理各团队的处理流程，统一标准化的回复方案，这对于后续校验结果至关重要。

**Step 3：设立清晰的目标，通过明确的项目目标来引导团队朝着价值产出推进**

专项任务关键目标：

- 意图识别准确率目标：85%
- Q4 目标 Top6 问题准确率目标：75%

由于首次尝试 ToC 向的智能客服，用户满意度不作为本阶段的目标，但仍然会收到关注。分别对 AI 和人工处理的工单进行 CSAT 和 NPS 评分评估，单独分析 AI 评分，能够确保及时发现 AI 表现不佳的领域。

数据评估与指标设定：

**自动解决率/半自动解决率**

- **自动解决率** = （AI 自动解决的工单数 / AI 处理的总工单数）× 100%
- **半自动解决率** = （AI 与人工协作解决的工单数 / AI 处理的总工单数）× 100%

UAT 阶段替代以往的由全员参与评估，AI 生成的回复中，被客服抽查审核认为正确的回复所占的比例。

- **AI 意图识别准确率** = （人工校验正确的 AI 标注数 / AI 总标注数）× 100%
- **AI 应答准确率** = （人工校验正确的 AI 回复数 / AI 总回复数）× 100%

面向用户后的准确率计算方式：

AI 回复的准确率计算公式： **(A + B + (C – C1)) / (A + B + C)**

- **A**: AI-Reply-With-Agent-Follow：AI 回复，需客服跟进操作 / AI response, customer service needs to follow up.
- **B**: AI-Auto-Solved：AI 回复，工单自动关闭 / AI response, ticket automatically closed.
- **C**: AI-Customer-Requires-Human-Support：需客服介入处理 / Customer service intervention required.
- **D**: AI-System-Error：如果 AI 在处理过程中遇到任何系统错误或工具失败。 / System Error.

当用户再次回复时，标记将自动变为 AI-Customer-Requires-Human-Support，此时由客服介入处理。

另外，人工客服还需要标注以下字段：

- **C1**: AI-Response-Incorrect：AI 回复有误 / AI response was incorrect.
- **C2**: Customer-Appreciation：用户表达感谢 / User expressed gratitude.
- **C3**: Customer-Asked-New-Question: 用户提出了其他问题 / User asked a different question.

**Step 4：追溯 Top 问题采纳比例不高的原因，及时调整技术方案**

在实践中，我们针对不同的用户需求，采用了以下策略：

- 订单物流等需高精度的固定回复：使用预设模板和工作流（Workflow）确保信息准确一致。
- 保修范围等常见问题：运用检索增强生成（RAG）技术，从知识库中提取最新答案。
- 售前咨询、产品对比等复杂场景：部署具备推理能力的智能代理（Agent），提供个性化解决方案。

针对 P1 阶段的订单取消和物流查询，我们采用了简单的方案，LLM 意图识别+多语言固定回复模板，目的是为了快速验证效果和获得产出。当然我们也获得了较好的结果，ToC 上线后此类问题的平均 FRT 由历史的 3300+ 分钟，降低到 1 分钟以内，及时的响应和自动化订单拦截减少了因人工客服响应时间差产生的不必要的因发货导致的物流损失，且取消订单咨询的满意度结果高于历史的人工客服水平约 5%。

当然这部分也碰到了一些问题，例如意图标签和模板的组合相对固定，会出现过渡依赖意图的情况。比如用户咨询“退款状态”，但标签本身没有，AI 识别到相近的标签“订单状态”，回复给用户结果就是订单状态的固定模板。这也间接导致了此类问题的满意度低于客服平均水平。考虑到客服团队的 KPI 压力和不同的声音，我们暂停了订单状态咨询对外回复的功能。

接下来我们进入了最关键且最困难的阶段，Agent 探索阶段。

此时，团队内部出现了不同的声音，希望项目能按时顺利上线，在前期 LLM+固定模板上，借由 Dify 构建 LLM+Workflow 的形式，来应对订单修改的问题。但考虑到之前的依赖意图本身+固定回复容易出现偏差，同时也抱着 Agent 的期待，我们还是决定构建 Agent，作为对后续拓展的铺垫，用 Multi-Agent 来处理多意图问题。

把 Agent 当作为一个客服新人，我们要做的是清晰地告诉它需要处理什么问题，如何处理这类问题，以及相应的工具（如客服操作手册）。

最开始的 1 个月，我们没有得到比较理想的结果，在测试过程中出现了很多意想不到的问题。让情况出现转机的是给 Agent 加入 COT 思考链，我们不但能清晰地找到它思考的过程，也能够察觉到问题。例如，我们的提示词内容本身有矛盾，导致结果不理想，出现问题后可以让 Agent 给出为何结果不符合我们预期的原因，在此基础之上，我们对提示词不断优化，最终找到合适的优化路线。

我很开心，团队在这次方案设计里不仅考虑了终端用户的体验，更多的是想到了如何更好地实现 AI 与人工客服的融合。这意味着，我们的 AI 不仅仅是一个面向用户的应答工具，而更像是一个人工客服的小伙伴（Copilot），真正实现了 **从辅助到自主** 的跃迁。它不仅能在第一时间自主分析并解决用户问题，还能针对未知问题进行总结，并以 note 的形式提供给人工客服，使客服无需回溯历史会话，即可无缝接入后续跟进。更重要的是，Agent 还能基于我们设定的规则，即便在多意图场景下，也能精准判断工单的处理方式——是自行解决、交由人工跟进，还是直接转交客服，真正实现了高效、智能的协同工作。

在 12 月底，我们成功推动了 Agent 的内部试跑。结果令人振奋！在内部试运行的阶段， **P2-P3 阶段的客服校验结果准确率已超过 86%** 。尽管仍有挑战，例如配套系统的功能优化、基础数据的不完善、系统调用的不稳定情况（如思考中断、多订单意图匹配错误）。整体表现已超出我们设定的目标——75% 的合格线。

华宝新能的 AI-Agent，未来已然清晰。

#### 团队成员定位的转变

在 AI 的加持下，我们看到了客服以及开发团队潜力的进一步拓展。

以客服 POC Jannie 为例，她最初对 AI 毫无经验，但借助 [Dify](https://link.juejin.cn/?target=https%3A%2F%2Fdify.ai%2F "https://dify.ai/") 平台的高度自定义 UI，她迅速成长为提示词专家，能够自主发现问题、现场优化和测试，从而高效解决业务挑战。

在 Agent 的应用探索中，开发和测试的小伙伴贡献了宝贵的见解。例如，在订单数据同步存在滞后的情况下，我们通过定时任务查询订单数据后再交由 Agent 处理，这不仅减少了配套系统机制导致的错误，还大幅降低了 token 消耗，提高了整体效率。

这份成果离不开一线业务团队的积极参与。即便在年末用户咨询激增的压力下，他们仍抽出有限资源参与数据校验。未来，我们计划通过与 KPI 挂钩的方式，鼓励更多团队成员深度参与项目，以进一步提升效率和质量，让 IT 与业务团队形成更紧密的协作，共同推进长期目标的实现。

在这个过程中，我们也在重塑从业务、产品、开发到测试的角色定位。不同于传统的系统开发模式，如今，每个人都有机会成为提示词专家，成为解决方案的创造者。这不仅提升了团队的创新能力，也让 AI 的应用价值真正落地。

本次 AI 智能客服探索之路，我们从 **RAG 试点** 到 **LLM+Workflow** ，再到 **Agent 优化** ，经历了多个阶段的迭代调整。虽然过程中遇到了 **数据质量低、意图标注偏差、固定模板局限** 等挑战，也经历了同业务团队 KPI 冲突导致的分歧，但通过 **COT 优化、明确优先级、策略调整** ，方案最终得以顺利落地。

### 三. GenAI 赋能客服：价值思考与路径探索

在与华宝新能团队共同探索 GenAI 赋能客服的过程中，我也有一些观察和思考，愿与大家分享。

#### 明确需求：用户体验的真实内涵

公司管理层常强调提升用户体验和满意度评分，但“用户体验”究竟指什么？用户的评价往往受多种因素影响，如服务态度、产品质量、物流速度等。因此，提升用户体验需要全方位的改进，而不仅仅是客服部门的职责。

#### 客服团队的诉求：在有限资源下实现高效服务

在与不同规模的公司讨论中发现，客服团队的目标是一致的：在有限成本下满足用户需求，提升体验。然而，团队和个人的 KPI 设置有时并不完全匹配这一目标。例如，促销期间咨询量激增，客服团队可能采取以下应对方法：

- 选择性忽略：无法处理的咨询被搁置。
- 提高单人工作量：每位客服需要处理更多的咨询。

其实，可以通过一些技术手段或管理方法来应对，比如：

- 引入 GenAI 技术：利用意图分类和优先级划分，将高优先级咨询放入特定队列，确保关键问题得到及时处理。
- 提供高效工具：如快速检索知识的系统，帮助客服快速回应，提高工作效率。
- 建立培训体系：提升客服人员的专业能力，以更好地服务客户。

#### GenAI 时代：客服角色的转型

传统客服工作繁忙，常有人质疑：“每天回复客户咨询都忙不过来，哪有时间整理文档？”然而，优秀的客服人员应主动拥抱新技术，利用 AI 工具提升自我，成为多面手。高质量的信息源是提升工作效率的关键。虽然 GenAI 无法完全替代知识库，但它可以辅助客服更高效地整理和优化信息。

在 GenAI 的支持下，客服的工作内容将发生变化：日常咨询由 GenAI 分担，腾出更多时间学习新知识、优化流程。这种“减负增效”将形成良性循环，持续提升团队整体产出能力，实现多方共赢。

#### 价值重塑：从成本中心到利润增长点

在与客户共同探索产品咨询的过程中，我们发现，准确把握客户意图并识别其关注的产品特性后，可以将被动响应转为主动出击。与销售部门合作，赋予客服新的角色，主动联系客户，识别潜在购买意向，快速跟进销售机会。无论是导购还是售后服务，客服都可以融入整个销售流程，为企业创造价值。

传统上，客服团队被视为成本中心；但在 GenAI 时代，客服正逐步转型为利润增长点，成为企业的增长引擎。

综上所述，GenAI 为客服领域带来了新的机遇和挑战。通过明确需求、优化团队管理、主动拥抱技术，客服团队可以实现角色转型，为企业创造更大价值。

### 四. 技术架构与实现思路

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/4a0eafacbeff404d8750d6f58b28b202~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqa6ams6YCK5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1746405324&x-signature=fJUVd0cqppww0Rgsi4Ot19diJOg%3D)

该架构展现了将 GenAI 服务赋能客户服务的整体技术路径。当客户咨询（Ticket）到达时，系统会先进行意图识别，根据不同意图将其分配至相应的 GenAI 能力模块，加以应对。整个流程贯穿了意图分类、知识检索、对话应答等多个环节，并通过多智能代理（Multi-Agent）与工作流（Workflow）的有序编排，确保 GenAI 服务能高效精准地响应客户咨询需求。该架构凝聚了意图识别、知识库查询、AI 对话等多项技术，有机整合后构建了一条完整的 GenAI 赋能客服的技术路线。

#### 客观评估准确性

在实施过程中，准确性是关键指标。然而，科学、客观地评估这一指标至关重要。

一些企业的客服团队采用模板回复，客服根据意图快速选择模板回复客户。当引入 GenAI 后，他们机械地评估 GenAI 的回复是否与模板一致，若有差异便认为准确性不足。此外，有的企业要求意图识别准确率达到 95% 以上才允许上线业务。

但深入分析发现，意图分类存在交叉、定义模糊等问题，评估过程也带有主观性。因此，评判“准确性不足”需谨慎，确保评估标准科学、过程客观。对于确实存在的准确性问题，可通过模型微调、优化提示词、借助 Agent、选择更强大的模型等方式提升。

#### Agent 调用 API 实现售中订单咨询

先给大家看看一个融合了订单咨询和产品咨询的案例（数据为 mock 数据）。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/c2415b8082194c25b7b44f8601a4b087~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqa6ams6YCK5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1746405324&x-signature=73IRkYXy%2FtfBPNO%2F5aIOi%2FfJaZ8%3D)

上图展示了一个人工智能代理（AI Agent）处理一个询问任务的过程。主要步骤和思路如下:

1、首先对输入的问句“我的订单 S003 到底了了你后通向下一阶段有>5000w的power station?”进行理解和拆解，将其分为两个子任务：关于订单 S003 的处理查询，及关于 5000w 的 power station 的查询。

2、对于第一个子任务，代理使用 HandleSpecificOrderEnquiryByAgent 工具来获取 S003 订单的相关信息，了解其当前的处理状态。

3、对于第二个子任务，代理使用 HandleProductSpecificationQuery 工具来处理关于 5000w 的 power station 的查询。

4、在处理第二个子任务时，代理给出了一些具体解释和信息：

- S003 订单现状是有订单号 TN456789123，还没有最终跟进；
- 5000w 的 power station 对应一款超大功率的电源设备，型号为 3000P，最大功率可达 5000w；
- 这样大功率的电源通常用于工厂/数据中心，可提供长时间稳定供电；
- 下一步状态标记为 open，表示还可继续对该类型产品的询问和配置。

5、最后，Agent 综合输出了回答的关键信息，包括订单 S003 状态、5000w 电源设备详情以及接下来可能的操作选项。并最终以 json 的格式输出了：

1. 对于客户的最终回复；
2. 对于人工坐席下一步的指引操作；
3. 对于当前 ticket 的状态建议；
4. ticket 状态建议的原因。

总的来说，这个 AI 代理展示了理解复杂问题、拆解子任务、使用相关工具获取信息、综合输出结果的能力，可以较好地支持类似产品查询和订单处理的场景。

售中订单服务是客户服务的重点和难点。例如，处理退货请求时，企业通常在多个销售渠道销售产品，客户可能通过邮件等方式提出退货需求。若错过最佳处理时间，可能导致物流已发货，需启动召回流程，或要求客户收货后再退货，增加时间和成本，且影响客户体验。

借助 GenAI 技术，我们可以自动识别客户的退货意图，快速集成订单系统、物流系统等，在 10 分钟内完成订单拦截或撤销出库操作，从而：

- 快速响应：在最佳时间窗口内高效处理退货需求。
- 降低成本：避免物流召回或二次发货的额外支出。
- 提升体验：客户无需等待收货再退货，流程更顺畅。
- 提高效率：自动化流程替代人工操作。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/8b001db6ded24c00aa0599a74e30efc6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqa6ams6YCK5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1746405324&x-signature=YNffdnONdbNKxdNqVss8gHvKiSs%3D)

除了退货，客户在售中环节还可能有取消订单、查询预计送达时间、修改配送信息、变更支付方式等需求。传统人工服务或基于规则的系统难以高效应对这些复杂多变的需求。

相比之下，GenAI 智能代理系统凭借出色的语义理解、多系统集成和自然语言生成能力，可以快速准确地理解客户意图，自动执行所需操作，及时反馈，为售中订单服务带来革命性的提升。

GenAI 智能代理基于大型语言模型训练，具备以下关键能力：

- 语义理解：深入理解用户的自然语言表达，精准捕捉潜在意图和需求。
- 知识库集成：无缝连接各类知识库，如产品手册、政策文档等，快速检索相关信息。
- 任务执行：根据对话上下文自动触发特定任务，如查询订单详情、调用系统 API 等。
- 自然语言生成：以人类可理解的方式回复用户，交互自然流畅。
- 持续学习：在与用户互动中不断积累经验，持续优化响应质量。

综合以上能力，GenAI 智能代理可作为智能助手，高效辅助传统客服工作，提高服务效率和客户体验。在订单处理等复杂场景中，它能基于对话自动识别用户需求，整合多系统数据，执行必要操作并自然回复，从而大幅提升服务质量和响应速度，为客户带来全新的智能化服务体验。

#### 分层架构实现

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d07a5df91602443b8e8fb500242f297a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqa6ams6YCK5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1746405324&x-signature=6uqPMYgTh5ecLHiCVC48A%2BWHNNo%3D)

参考上图，该方案由三个主要部分组成，分层解耦，构建了一个健壮高效的订单处理智能 Agent。

1、订单咨询智能代理

作为系统核心，负责与客户进行自然语言交互，包括：

- 意图识别：精准识别用户输入意图，如查询订单、取消订单等。
- 订单状态查询：根据识别意图调用相应知识库，获取并处理订单信息。
- 物流详情查询：获取并组织订单的物流运输数据。
- 客户自然语言回复：将处理结果以自然语言方式回复客户。

2、订单规则引擎

根据订单查询和处理的实际需求，负责协调并执行相关操作决策，如应用查询规则、确定后续行动等，提高系统可控性和可维护性。

3、工具层

包含多个订单处理工具组件，这些工具被 GenAI 掉用来完成复杂的工作。 如订单状态查询工具、订单控制工具、物流跟踪工具等，为上层智能代理提供所需的功能支持。

该分层架构将自然语言交互、订单处理决策和具体执行工具相分离，提高了系统灵活性和可扩展性。

在客户侧，系统整合了现有 OMS、WMS、电商平台和物流平台，对接了订单和物流的核心数据服务能力。

#### 经典规则引擎+GenAI=准确高效的订单处理规则

我们最终采用了 AI 与传统规则引擎相结合的方式。

在 AI 订单处理系统的实施过程中，我们最初尝试使用自然语言描述不同订单状态下对应客户意图的处理规则，供 GenAI 系统理解和执行。然而，由于订单场景错综复杂，涉及订单渠道、承运商、优惠券、预售等多个影响因素，仅靠自然语言极难清晰描述每一条规则。另一方面，如果直接在提示词中硬编码规则，一旦需要调整，可能会无意中破坏其他规则，维护成本和风险都很高。

我们尝试过单独使用提示词描述、伪代码编写 if-else 逻辑等多种方式，但均无法就众多输入因子做精准规则描述，且容易出现无法回归的问题。最终，在客户团队的建议下，我们采取了传统与创新技术相结合的混合方式。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ef314c4318d8401aa4f9bcf2bd848a70~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqa6ams6YCK5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1746405324&x-signature=zI%2F2vniUoN%2Fs2zOqQ78%2Fce0V910%3D)

- 应对业务复杂性挑战：订单处理场景错综复杂，不同销售渠道、订单状态及客户需求导致规则纷繁，单一 AI 系统难以覆盖所有情况。将规则交由独立的规则引擎维护更加可控可靠。
- 提高规则维护效率：规则由运营团队维护，他们最了解具体业务逻辑。独立的规则引擎利于灵活调整并追踪版本变化，提高维护效率。
- 复用现有系统资产：企业普遍存在传统订单系统、规则引擎等遗产系统，直接抛弃重建代价高昂。将 AI 与遗产系统整合，可最大限度复用核心能力，实现平滑过渡。

通过 AI 与规则引擎的有机结合，我们发挥了两者各自的优势，构建了一个高效可控的智能订单处理系统，促进了新技术与传统系统的融合发展。

我们借鉴了规则引擎的设计理念，但为简化实施，只需要一个轻量级的规则查询系统，而不必维护一个复杂的完整规则引擎。

#### 架构迭代：multi-agent collaboration capability 多智能体系统应对多样化咨询需求

“你永远无法预测客户会问什么问题，会怎么问”，这一客户体验痛点对客服系统的理解能力是一大考验。

借鉴医院分诊台的运作模式，我们设计了基于多智能体（Multi-Agent）的创新架构。

系统入口引入 ReceptionDeskAgent，担纲识别用户各式各样询问意图，并负责适当分流的职能，类似分诊台的导诊员角色。根据识别结果，用户需求将被合理分配至不同领域智能体，如订单服务智能体（OrderAgent）、产品咨询智能体（ProductAgent）、售后服务智能体（AfterSalesAgent）等。

每个领域智能体均可调用对应的工具与数据源，如订单系统、物流系统、产品知识库、故障库等，针对用户需求进行深入专业化分析处理，类似医院各科室利用 CT、化验等手段实施检查诊疗。最终，各智能体的处理结果将由 ReceptionDeskAgent 进行汇总整合，并统一以自然语言形式回复用户。

该多智能体架构有效模拟了人工服务的工作模式，实现了意图识别、专业分工以及信息融合的无缝衔接，为应对用户千变万化的复杂疑难咨询需求提供了可靠的解决方案。

例如，当遇到客户咨询关于电器的太阳能板与电源组合的问题时，我们专门设计了一个支持代码解释的智能体。它根据是否支持并联、串联、最大功率等参数，通过执行相关计算代码，精准获取满足客户要求的推荐太阳能板数量，从而确保给出的建议数据是准确无误的。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e0a70b5713454c238e28def6b54f67f4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqa6ams6YCK5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1746405324&x-signature=Pw1yMojbY5P%2F49PNPYflH8571ys%3D)

### 五. 总结和展望

基于所采用的解决方案，我们与华宝新能紧密协作，共同实现了订单物流查询、订单修改、多订单多意图需求拆解、产品咨询响应等多种应用场景。在这一过程中，华宝新能借助 Amazon Bedrock 提供的强大能力快速迭代，最终在 100 个测试案例中取得了令客服团队满意的准确率水平，并逐步在日本和美国市场进行了面向终端用户的落地验证。

这一探索之旅虽然艰辛，但获得了来自华宝新能高层、客服管理团队、评估人员、产品设计师、IT 团队以及相关合作系统方的大力支持和通力合作，才得以一一跨越重重障碍。如今，华宝新能专门组建了一个虚拟团队，能够在真实的客服场景中探索 GenAI 技术赋能客服服务的应用方向。

GenAI 不仅仅是一种自动化工具，它所带来的变革可能超乎我们的预期——在 GenAI 时代，客服人员的角色定位将发生深刻转变，未来他们可能会兼具用户运营、产品需求分析师、数据分析师等多重身份。过去，个人的经验决定了能力上限；而现在，GenAI，让每个人都拥有了快速成长的机会，从而缩小了人与人之间的差距。

当 GenAI 与客服工作真正无缝融合时，我们已在开启全新的可能性之门，届时区分 AI for Customer Service 还是 AI Customer Service 已不那么重要。我们要保持对新事物的开放探索态度，勇于 Say No，勇于质疑和争论，面对挑战时绝不因问题而畏缩退缩。因为，不同观点的碰撞会加深我们对事物的理解，而我们总将找到更优的解决方案。

### 参考资料

- 华宝新能基于 Amazon Bedrock 构建客服知识库，生成式 AI 赋能智能客服伴业务腾飞： [aws.amazon.com/cn/solution…](https://link.juejin.cn/?target=https%3A%2F%2Faws.amazon.com%2Fcn%2Fsolutions%2Fcase-studies%2Fhellotechenergy%2F%3Fawsm.page-customer-references-cards%3D1 "https://aws.amazon.com/cn/solutions/case-studies/hellotechenergy/?awsm.page-customer-references-cards=1")
- Introducing multi-agent collaboration capability for Amazon Bedrock： [aws.amazon.com/blogs/aws/i…](https://link.juejin.cn/?target=https%3A%2F%2Faws.amazon.com%2Fblogs%2Faws%2Fintroducing-multi-agent-collaboration-capability-for-amazon-bedrock%2F "https://aws.amazon.com/blogs/aws/introducing-multi-agent-collaboration-capability-for-amazon-bedrock/")
- Amazon Bedrock 知识库加速客服团队应用 GenAI 能力： [aws.amazon.com/cn/blogs/ch…](https://link.juejin.cn/?target=https%3A%2F%2Faws.amazon.com%2Fcn%2Fblogs%2Fchina%2Famazon-bedrock-knowledge-base-accelerates-customer-service-teams-adoption-of-genai-capabilities%2F "https://aws.amazon.com/cn/blogs/china/amazon-bedrock-knowledge-base-accelerates-customer-service-teams-adoption-of-genai-capabilities/")
- MECE 分析法： [en.wikipedia.org/wiki/MECE\_p…](https://link.juejin.cn/?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMECE_principle "https://en.wikipedia.org/wiki/MECE_principle")

本篇作者

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/4661c92ef93848bfb09b38b42123e626~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Lqa6ams6YCK5LqR5byA5Y-R6ICF:q75.awebp?rk3s=f64ab15b&x-expires=1746405324&x-signature=a0dMNmEjCdmt3AezFiGJ8buXB3M%3D)

> 本期最新实验为《 [大模型选型实战 —— 基于Amazon Bedrock测评对比和挑选最合适业务的大模型](https://link.juejin.cn/?target=https%3A%2F%2Fdev.amazoncloud.cn%2Fexperience%2Fcloudlab%3Fid%3D67bc1b7c8ea6eb2ae682bde3%26visitfrom%3D3P_Juejin_0418%26sc_medium%3Downed%26sc_campaign%3Dcloudlab%26sc_channel%3D3P_Juejin_0418 "https://dev.amazoncloud.cn/experience/cloudlab?id=67bc1b7c8ea6eb2ae682bde3&visitfrom=3P_Juejin_0418&sc_medium=owned&sc_campaign=cloudlab&sc_channel=3P_Juejin_0418") 》
> 
> ✨ 立即解锁当下最火爆的AI大模型，带你零基础玩转 DeepSeek、Nova 等顶尖大预言模型。
> 
> 📱 即刻在云上探索实验室，开启构建开发者探索之旅吧！
> 
> ⏩\[[点击进入实验](https://link.juejin.cn/?target=https%3A%2F%2Fdev.amazoncloud.cn%2Fexperience%2Fcloudlab%3Fid%3D67bc1b7c8ea6eb2ae682bde3%26visitfrom%3D3P_Juejin_0418%26sc_medium%3Downed%26sc_campaign%3Dcloudlab%26sc_channel%3D3P_Juejin_0418 "https://dev.amazoncloud.cn/experience/cloudlab?id=67bc1b7c8ea6eb2ae682bde3&visitfrom=3P_Juejin_0418&sc_medium=owned&sc_campaign=cloudlab&sc_channel=3P_Juejin_0418")\] 构建无限, 探索启程！🚀

评论 0

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/b9d0c7badde6e5569e2390ee4a8cbd24.svg) 1

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

APP内打开