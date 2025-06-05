---
title: "Apache Doris + MCP：Agent 时代的实时数据分析底座"
source: "https://juejin.cn/post/7512279788401721371"
author:
  - "[[SelectDB]]"
published: 2025-06-05
created: 2025-06-05
description: "从环境搭建的简洁性到查询执行的高效性，从多数据源集成的便利性到安全管控的可靠性，每一个细节都体现着 Apache Doris 团队对 AI 时代数据访问需求的深刻理解和精心设计。"
tags:
  - "clippings"
---
![横幅](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/4aa95988b3f945449bac2d73b1c8d07d~tplv-8jisjyls3a-3:0:0:q75.png) ![](https://p26-piu.byteimg.com/tos-cn-i-8jisjyls3a/e0813b7ad241409dab2dcae3db732e78~tplv-8jisjyls3a-3:0:0:q75.png)

点击关注，了解更多 **实时数仓** 领域前沿资讯与技术实践！

---

## 一、Apache Doris：面向 Agent 时代的智能数据平台

当我们谈论 2025 年时，业界普遍认为这将是"Agent 革命年"（Agentic Revolution）的开端。与传统的人机交互模式不同，AI Agent 作为一个全新的"用户角色"正在重塑整个数据分析领域的使用模式。这些智能代理不再是被动等待指令的工具，而是具备自主决策能力、能够理解上下文、执行复杂任务的智能实体。它们可以是数字助理、自动化工作流引擎、业务监控工具，或者是更复杂的企业级智能应用。这种用户角色的根本性变化，对底层数据基础设施提出了前所未有的挑战和要求。

### Agent 工作模式的本质差异

要理解 Agent-Facing Analytics 的重要性，我们首先需要认识到 AI Agent 与传统用户在数据访问模式上的根本差异。传统的数据分析工作流程通常是这样的：业务分析师提出问题，数据工程师编写 SQL 查询，等待查询结果，然后基于结果进行分析和决策。这个过程是线性的、可预测的，查询量相对有限，对实时性的要求也相对宽松。

然而，AI Agent 的工作模式完全颠覆了这一传统模式。当一个 Agent 接收到用户的单一请求时，它可能会在几秒钟内触发数十个甚至上百个数据库查询。 **这些查询涉及的数据量往往也很庞大，动辄 GB 级甚至 TB 级，大集团某业务场景日增数据量甚至在 PB 级别。** 这些查询包括探索性数据发现、多维度关联分析、实时指标计算等，往往相互关联，形成复杂的查询依赖图。

![Agent 工作模式的本质差异.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/22ad3bdd3f73433591dfe4f093fde4be~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgU2VsZWN0REI=:q75.awebp?rk3s=f64ab15b&x-expires=1749715553&x-signature=hR6xRlYhvINZalUAdioXRsU4nKY%3D)

### 并发性能的指数级挑战

传统数据分析场景中，大型企业同时进行复杂分析的用户数量通常有限，可能是几十到几百的量级。但在 Agent 时代，情况发生根本变化。每个业务流程都可能部署多个专业化 Agent，这些 Agent 并行工作，处理大量并发请求。

我们以电商平台场景为例：客服 Agent 处理客户咨询，推荐 Agent 生成个性化推荐，库存 Agent 监控库存状态，价格 Agent 动态调整价格策略，营销 Agent 优化广告投放，风控 Agent 实时检测异常交易。每个 Agent 都持续查询数据库，查询频率和复杂度远超传统应用。中等规模企业可能需要同时支持数百上千个 Agent 并发访问，每个 Agent 每秒发起数次甚至十几次查询，数据库需要处理数千甚至上万次并发查询。超大集团的 Agent 数量和查询并发量将指数级增长。

![Agent高并发场景.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/381dc966a3ce49899cc3e55c66b57197~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgU2VsZWN0REI=:q75.awebp?rk3s=f64ab15b&x-expires=1749715553&x-signature=1hgu2%2B%2BFOYBCWvH%2BKK8eQiN%2BXJc%3D)

Apache Doris 的 MPP 分布式架构在这种场景下展现独特优势。与传统主从架构不同，Apache Doris 采用无主节点分布式设计，每个 BE 节点都可独立处理查询请求，避免单点瓶颈。面对 Agent 高并发访问时，Apache Doris 可通过增加 BE 节点线性扩展查询处理能力。Doris 的向量化执行引擎充分利用现代 CPU 的 SIMD 指令集，处理 Agent 生成的大量聚合查询和过滤操作时，性能提升可达 5-10 倍。

### 实时性要求的新高度

Agent 应用对数据实时性要求达到前所未有的高度。传统 BI 报表可容忍小时级甚至天级数据延迟，但 Agent 需要基于最新数据做即时决策。智能风控 Agent 需要在秒级时间内分析用户实时交易行为、历史信用记录、当前账户状态等信息，判断是否存在欺诈风险。任何数据延迟都可能导致误判。

![Agent实时性要求.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/20e4a7b4b4bc4c20b55391095663c1e2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgU2VsZWN0REI=:q75.awebp?rk3s=f64ab15b&x-expires=1749715553&x-signature=ttV63qqZof9MdzktFnAL71fqgvU%3D)

Doris 的实时数据处理能力及高并发主键等值点查在此发挥关键作用。通过内置以及生态的功能，Doris 实现秒级数据写入延迟，确保 Agent 访问最新业务数据。Doris 的多数派写入规则保证查询和写入操作一致性，避免传统数据仓库常见的读写冲突问题。

加之 Doris 行列混存及部分列更新的强大特性，可满足实时用户画像的高并发主键等值点查场景要求，尤其在风控场景，可满足毫秒级、上万甚至数十万并发的超大场景。

### 智能查询优化的必要性

Agent 生成的查询往往具有高度动态性和不可预测性。与传统预定义报表不同，Agent 的查询模式基于用户请求和上下文动态生成，传统查询优化方法难以适用。Agent 可能生成看似"奇怪"的查询组合，或在短时间内对同一份数据进行多种不同维度分析。

![智能查询优化的必要性.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7be8af9af31f4ff586f33cce55744698~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgU2VsZWN0REI=:q75.awebp?rk3s=f64ab15b&x-expires=1749715553&x-signature=Lvtuly3ipTnOZ9DCSXeWxiV4uXk%3D) Apache Doris 的 CBO（Cost-Based Optimizer）查询优化器在这种场景下展现强大适应能力。它根据实际数据分布和查询模式，动态生成最优执行计划。Doris 支持多种索引类型，能够自动为 Agent 查询选择最适合的索引策略，大幅提升查询性能。

### Multi-Catalog：统一数据，释放 AI 潜能

AI 的价值只能通过其可访问的数据来体现，但企业数据往往分散在各处、孤立存储，且经常过时。传统数据分析场景中，数据通常预先整理建模，存储在特定数据仓库中。但 Agent 需要访问的数据往往来源广泛，包括实时业务数据、历史数据湖数据、外部 API 数据等。为每种数据源部署专门 Agent 接口不仅增加系统复杂性，也影响 Agent 智能决策能力。

![Multi-Catalog：统一数据，释放 AI 潜能.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/674f9baa4b444742b8e5fefd2d24e65e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgU2VsZWN0REI=:q75.awebp?rk3s=f64ab15b&x-expires=1749715553&x-signature=6dyTKM0cE3S1QHAzjmO39LwAYKA%3D)

Apache Doris 的 Multi-Catalog 功能为此问题提供优雅解决方案。通过统一 SQL 接口，Agent 可无缝访问 MySQL、PostgreSQL、Oracle 等传统数据库，Hive、Iceberg、Hudi、Paimon 等数据湖存储，以及 S3、HDFS 等云存储服务。这种统一数据访问能力让 Agent 获得完整数据视图，做出更准确全面的分析判断。

Apache Doris 的查询优化器能够识别跨数据源查询，自动制定最优执行策略。对于需要关联多个数据源的复杂查询，系统会自动决定哪些操作下推到源系统执行，哪些操作在 Apache Doris 中进行，最大化整体查询效率。

### 向量检索：支撑新一代 AI 应用

随着大语言模型和 RAG（Retrieval-Augmented Generation）技术成熟，越来越多 Agent 开始需要向量检索能力。这些 Agent 不仅要处理结构化业务数据，还要处理非结构化文本、图像、音频等数据的向量表示。传统方案是在数据库之外部署专门向量数据库，但存在数据一致性、查询复杂性、运维成本等多重问题。

![向量检索：支撑新一代 AI 应用.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/692514a5bfb14fbf9a07c6386801e4a1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgU2VsZWN0REI=:q75.awebp?rk3s=f64ab15b&x-expires=1749715553&x-signature=lM6FluBxaPEmhD%2BuysPNEmpORws%3D)

Apache Doris 在 2025 年规划中将原生支持向量数据类型和向量索引，这将为 Agent 应用带来革命性改变。Agent 将能够在同一查询中同时处理结构化数据和向量数据，实现真正多模态数据分析。

### 安全性与可观测性的新要求

Agent 的自主性和高频访问特性也带来了新的安全挑战。传统的数据访问通常有明确的人工审查环节，但 Agent 的决策过程往往是自动化的，这要求底层数据系统必须具备更强的安全防护和审计能力。

![安全性与可观测性的新要求.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/af3393f3fc94498bb3270522ee5c3695~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgU2VsZWN0REI=:q75.awebp?rk3s=f64ab15b&x-expires=1749715553&x-signature=Y3V28keZD8mVtgOqJa9iZxRljuU%3D)

Apache Doris 的多层级安全机制在此发挥重要作用。通过细粒度权限控制，可精确限制每个 Agent 能够访问的数据范围和操作类型。通过完整审计日志，可追踪每个 Agent 数据访问行为，及时发现异常操作。通过 SQL 注入防护和查询复杂度限制，可防止恶意或错误 Agent 查询影响系统稳定性。

同时，对 Agent 行为的可观测性需求变得至关重要。企业需要全面了解 Agent 的运行状态、决策过程、执行效果等关键信息。Apache Doris 通过 MCP 协议不仅能够为 Agent 提供数据访问能力，还能成为 Agent 可观测性体系的重要数据源。Agent 的运行日志、执行轨迹、性能指标、错误信息等关键运维数据都可以通过 Apache Doris 进行统一存储和分析。运维团队可以利用 Apache Doris 的强大分析能力，对 Agent 集群的健康状况进行实时监控，分析 Agent 的工作模式和效率趋势，快速定位性能瓶颈和异常行为，为 Agent 系统的持续优化提供数据支撑。

综合上述内容，Agent-Facing Analytics 引发了我们的新思考： **如何让 AI 应用能够高效、安全、标准化地访问各种数据源和工具？**

传统的解决方案往往需要为每个数据源单独开发接口，这种烟囱式的开发模式不仅大大增加了开发成本和维护负担，还严重制约了 AI 应用的快速迭代和规模化部署。

正是在这样的背景下，Anthropic 推出了 Model Context Protocol （MCP），这一革命性的协议被业界誉为 AI 应用的"USB-C 接口"。

## 二、Model Context Protocol （MCP）：连接 AI 与数据的桥梁

Model Context Protocol （MCP） 是一个开放的、标准化的协议规范，其核心使命是让 AI 应用能够安全、无缝地连接到各种数据源、工具和服务。就像 USB-C 接口统一了各种电子设备的连接标准，从而让用户可以用一根线缆连接所有设备一样，MCP 为 AI 应用与外部资源的交互提供了统一的协议规范，让 AI 开发者可以通过一套标准的 API 接口访问所有兼容的数据源和服务。这种设计理念的深刻之处在于，它将复杂的集成问题转化为标准化的接口问题，从根本上简化了 AI 应用的开发复杂度。

![Model Context Protocol （MCP）：连接 AI 与数据的桥梁.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/c3e2d29700944329aac78170c038b429~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgU2VsZWN0REI=:q75.awebp?rk3s=f64ab15b&x-expires=1749715553&x-signature=HFJRZObRsnJhDs2J49u%2BTsVp%2FEI%3D)

MCP 的技术架构建立在 JSON-RPC 2.0 基础之上，JSON-RPC 2.0 是一个经过长期验证的成熟协议，在互联网应用中有着广泛的应用基础，这确保了 MCP 协议的稳定性和互操作性。在此基础上，MCP 定义了三种核心的交互模式：资源访问模式用于访问静态或准静态的数据资源，工具调用模式用于执行特定的操作或计算，提示模板模式用于为 AI 模型提供结构化的上下文信息。这种分层的设计不仅覆盖了 AI 应用的主要需求场景，还为未来的扩展预留了充足的空间。

更为重要的是，MCP 在设计之初就将安全性作为核心要求。协议内置了完善的身份认证和权限控制机制，支持 API 密钥、OAuth 2.0、JWT 等多种主流认证方式，并且提供了细粒度的权限控制能力，可以精确控制 AI 应用能够访问哪些资源、执行哪些操作。这种全方位的安全设计确保了企业级 AI 应用的数据安全需求能够得到充分保障。同时，MCP 还在性能层面进行了深度优化，支持连接复用、批量操作、流式处理等多种性能优化策略，能够满足 AI 应用对高吞吐量和低延迟的严格要求。

![Model Context Protocol （MCP）：连接 AI 与数据的桥梁-2.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/93092a8e8b0b4c698a87b90d4fbe47c8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgU2VsZWN0REI=:q75.awebp?rk3s=f64ab15b&x-expires=1749715553&x-signature=GjqLCSukWzntDmwCUQxz4yWR%2BR4%3D)

通过 MCP 这座技术桥梁，Apache Doris 正在构建一个开放、标准、高效的 AI 数据访问生态系统。在这个生态中，AI 开发者可以专注于算法创新和业务逻辑优化，而不必为底层的数据访问技术细节而分心；数据库厂商也可以通过标准化的接口为 AI 应用提供服务，而不必为每个 AI 平台重复开发适配层。这种标准化的力量正在重塑整个 AI 应用的开发模式，让 AI 技术的普及和应用变得更加简单和高效。

## 三、Doris MCP：构建面向 AI 的数据访问生态

### 3.1 主流 Agent 应用场景与 MCP 需求分析

在当前 AI 应用快速发展的背景下，不同类型的 Agent 对数据访问能力呈现出差异化的需求特征。通过深入分析主流 Agent 应用场景，我们可以更清晰地理解 MCP 协议需要解决的核心问题，并为技术实现提供明确的方向指引。

![主流 Agent 应用场景与 MCP 需求分析.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9dc3f9c4a0b04f3dbbc7c5bbf38bc0a3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgU2VsZWN0REI=:q75.awebp?rk3s=f64ab15b&x-expires=1749715553&x-signature=qhOq4vlw7AEGUs0KR1ZJgvOkKdc%3D)

### 3.2 Doris MCP 技术实现现状

Doris MCP Server 的技术实现体现了对 AI 时代数据访问需求的深刻理解。整个系统基于 Python 和 FastAPI 构建，这种技术选型不仅保证了开发效率和代码质量，也确保了与现有 AI 技术栈的良好兼容性。

![Doris MCP 技术实现现状.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6cf02ccd7a964781a9961461afdc917a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgU2VsZWN0REI=:q75.awebp?rk3s=f64ab15b&x-expires=1749715553&x-signature=zncBZfrhyEWHGDcBFLXRnPxP1B8%3D)

**协议支持的多模式设计**

Doris MCP 在协议支持方面采用了多模式设计，以适应不同的部署场景和应用需求。

- SSE（Server-Sent Events）模式通过 HTTP 协议提供实时双向通信能力，特别适合 Web 应用的集成场景。这种模式的优势在于可以充分利用现有的 HTTP 基础设施，简化部署和运维复杂度。
- Streamable HTTP 模式则专门针对大数据量查询场景进行了优化，支持流式数据传输，可以有效处理 GB 级甚至 TB 级的查询结果。但当前 MCP 版本还未完全测试通过，预计在下个 MCP 版本中推出。
- Stdio 模式作为标准输入输出接口，为开发工具集成提供了最佳的兼容性，特别是在 Cursor 等现代 IDE 中的集成表现尤为出色。

**核心工具集合的系统化设计**

Doris MCP 的工具集合采用了系统化的设计思路，涵盖了 AI 应用访问数据库的全生命周期需求。

- `exec_query` 作为核心的 SQL 执行引擎，不仅支持标准的查询操作，还内置了安全检查、参数验证、结果优化等高级功能。
- 元数据相关的工具如 `get_table_schema` 、 `get_table_column_comments` 等，为 AI 应用理解数据结构提供了完整的信息支撑。
- 审计相关的工具如 `get_recent_audit_logs` ，则为企业级应用的合规性需求提供了必要的支持。

**数据库交互的深度优化**

在数据库交互层面，Doris MCP 实现了多项性能优化策略。连接池管理采用了智能化的设计，能够根据实际负载情况动态调整连接数量，在保证性能的同时避免资源浪费。查询执行优化包括了自动 SQL 安全检查、智能 LIMIT 添加、结果序列化优化等功能，这些优化措施确保了系统在高并发场景下的稳定性和效率。查询超时管理和资源占用控制则为系统的健壮性提供了重要保障。

**联邦查询能力的战略价值**

基于 Doris 的 Multi-Catalog 功能，MCP Server 实现了真正意义上的多数据源统一访问能力。这种能力的战略价值在于，它让 AI 应用能够突破单一数据源的限制，获得更加全面和完整的数据视图。

系统目前支持 MySQL、PostgreSQL、Oracle、SQL Server 等主流关系型数据库，同时也支持 Hive、Iceberg、Hudi、Paimon 等大数据生态系统，以及 S3、HDFS、MinIO、OSS 等云存储服务。这种广泛的数据源支持能力为 AI 应用提供了强大的数据整合基础。

## 四、实战演示：体验 Doris MCP 的魅力

从环境搭建的简洁性到查询执行的高效性，从多数据源集成的便利性到安全管控的可靠性，每一个细节都体现着 Doris 团队对 AI 时代数据访问需求的深刻理解和精心设计。通过这些实战演示，我们不仅能够看到 Doris MCP 的技术优势，更能感受到它为 AI 应用开发带来的革命性变化。

在环境搭建方面，Doris MCP 的设计哲学是"开箱即用"。整个安装配置过程被简化到了极致，开发者只需要几个简单的命令就能完成 Doris MCP Server 的部署。首先通过 Docker 方式启动 Doris 集群，然后通过简单的配置文件设置连接参数和安全选项，最后启动 MCP Server 服务。整个过程通常只需要 10 分钟左右，这种简洁性让开发者能够快速上手，专注于业务逻辑的实现而不是复杂的环境配置。

![实战演示：体验 Doris MCP 的魅力.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ab0e00bddf8048c6ab6a569021cec29d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgU2VsZWN0REI=:q75.awebp?rk3s=f64ab15b&x-expires=1749715553&x-signature=99E5R1qbG2%2B5NilzKzzDd7gjWas%3D)

在典型应用场景中，我们可以清晰地看到 Doris MCP 在不同业务场景下的强大能力。

以电商数据分析为例，当业务分析师通过 AI 助手询问"最近一周哪些商品的销量增长最快"时，LLM + Doris MCP Server 会自动解析这个自然语言查询，识别出时间范围、指标类型、排序条件等关键信息，然后生成相应的 SQL 查询语句。在执行过程中，系统会自动选择最优的数据源（可能包括实时订单数据、商品主数据、库存数据等），制定高效的执行计划，并在毫秒级时间内返回准确的分析结果。更令人印象深刻的是，当分析师继续追问"这些商品的主要购买用户群体特征是什么"时，系统能够基于前一次查询的上下文，自动关联用户数据和行为数据，提供深度的用户画像分析。

这种多轮对话的能力让数据分析变得如同日常交流一样自然流畅。

在知识库检索等 RAG 的系统中，我们看到了 Doris MCP 在向量检索方面的强大能力。当推荐系统需要为用户推荐相似商品时，MCP Server 会利用 Doris 的原生向量索引能力，快速检索与用户历史行为相似的商品向量，同时结合商品的实时库存、价格、评分等结构化数据，生成个性化的推荐结果。这种向量数据与结构化数据的无缝融合，为推荐系统提供了更加精准和丰富的数据支撑。

![实战演示：体验 Doris MCP 的魅力-2.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ca310e24004349d4a9b5f77a01900784~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgU2VsZWN0REI=:q75.awebp?rk3s=f64ab15b&x-expires=1749715553&x-signature=aoCgjZ1JGnnh%2F44F85%2Fpb3DsBNc%3D)

在性能表现的分析中，我们通过一系列基准测试全面验证了 Doris 的性能优势。在查询延迟方面，简单查询的平均响应时间保持在秒内，复杂聚合查询的响应时间也控制在秒级，这种低延迟特性确保了 AI 应用能够提供流畅的用户体验。在并发能力方面，单个 MCP Server 实例能够同时处理数百个并发查询请求，而通过集群部署可以轻松扩展到处理数千个并发请求。

### 示例 1: Dify Agent + Doris MCP 构建 ChatBI

**本示例使用 SSE 通信方式进行连接。**

ChatBI 作为 Data Agent 在商业智能领域的具体应用，通过 MCP 协议实现了与 Apache Doris 的深度集成，为企业用户提供了革命性的数据分析体验。与传统的 BI 工具需要预先定义报表和仪表板不同，ChatBI 允许用户通过自然语言实时查询任何数据，获得即时的业务洞察。

![实战演示：体验 Doris MCP 的魅力-3.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/4f325e267c5f4688b6928e9e14e9cdfe~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgU2VsZWN0REI=:q75.awebp?rk3s=f64ab15b&x-expires=1749715553&x-signature=TCSpjetA6KmEuqbfGN6Q06MzMgM%3D)

在 ChatBI 的技术架构中，MCP 协议扮演着核心的桥梁作用。当用户通过聊天界面提出业务问题时，ChatBI 系统首先会通过自然语言处理技术理解用户的查询意图，然后通过 MCP 协议与 Doris 进行交互。这个交互过程包括多个步骤：首先通过 get\_db\_table\_list 获取相关的数据表信息，然后通过 get\_table\_schema 了解表结构，接着生成相应的 SQL 查询语句，最后通过 exec\_query 执行查询并获取结果。

### 示例 2: Cursor Agent + Doris MCP 协助智能开发

**本示例使用 Stdio 通信方式进行连接。**

Cursor 作为现代化的 AI 驱动代码编辑器，深度支持 MCP 协议，可以作为 MCP Client（HOST 角色）与各种 MCP Server 进行通信。Cursor 支持多种 MCP 通信模式，包括 Stdio（标准输入输出）和 SSE（Server-Sent Events）等，其中 Stdio 模式因其直接性和高效性而成为开发环境中的首选方案。

在技术架构层面，Cursor 通过 Stdio 模式与 Doris MCP Server 建立连接时，采用标准的进程间通信方式。Cursor 作为父进程启动 Doris MCP Server 子进程，然后通过标准输入输出流进行 JSON-RPC 2.0 协议的消息交换。这种通信方式的优势在于延迟极低、资源占用少，特别适合开发环境中的频繁交互操作。

Cursor 的 MCP 集成为开发者提供了强大的数据库交互能力。开发者可以在编码过程中直接通过自然语言查询数据库信息，无需离开编辑器环境去查看数据库文档或执行 SQL 命令。这种无缝集成大大提升了开发效率，特别是在需要频繁查看表结构、分析数据分布、验证业务逻辑的开发场景中。

通过这些实战演示，我们清晰地看到了 Apache Doris MCP 在实际应用中的卓越表现。它不仅仅是一个技术产品，更是企业数字化转型和智能化升级的重要推动力量。随着越来越多的企业开始采用 AI 技术来驱动业务创新，Doris MCP 必将在其中扮演越来越重要的角色，为企业的数据智能化之路提供坚实的技术保障。

## 五、结语：携手共建智能数据未来

当我们回顾这篇文章的内容，从 AI 浪潮的席卷到 Apache Doris 的技术创新，从 MCP 协议的标准化到实际应用的成功案例，我们看到的不仅仅是技术的进步，更是一个崭新时代的到来。在这个时代中，数据不再是静态的存储对象，而是流动的智能资源；数据库不再是单纯的存储系统，而是智能化的服务平台。Apache Doris 以其在 AI 方向的深度布局和技术创新，正在成为连接数据与智能的重要桥梁。

Apache Doris 从一个优秀的分析型数据库，发展成为 AI 时代的智能数据平台，这个转变体现了团队对技术趋势的准确判断和前瞻性布局。从向量索引的原生支持到 MCP 协议的完整实现，每一个技术决策都体现了对 AI 时代数据需求的深刻理解。特别是 MCP 协议的引入和实现，更是开创性地解决了 AI 应用与数据源集成的标准化问题，为整个行业的发展指明了方向。

[Doris MCP 项目的开源发布](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fapache%2Fdoris-mcp-server "https://github.com/apache/doris-mcp-server") ，建立了一个全球性的技术协作平台。来自不同国家、不同背景的开发者共同为一个目标而努力，分享知识、交流经验、协作创新。这种开源协作模式不仅加速了技术的发展，也体现了技术无国界的美好理念。

展望未来，随着 AI 技术的不断成熟和应用场景的不断拓展，Apache Doris 必将在这个过程中发挥越来越重要的作用。在这个智能数据的时代，让我们携手共进，在开源社区的大旗下，共同构建一个更加智能、更加开放、更加美好的数据未来。

这就是 Apache Doris 的故事，这就是 AI 与数据融合的故事，这就是我们共同创造未来的故事。故事还在继续，精彩还在展开，让我们一起期待更加美好的明天！

本文收录于以下专栏

![cover](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95414745836549ce9143753e2a30facd~tplv-k3u1fbpfcp-jj:160:120:0:0:q75.avis)

社区动态

专栏目录

Apache Doris 社区动态及活动

4 订阅

·

18 篇文章

评论 0

暂无评论数据