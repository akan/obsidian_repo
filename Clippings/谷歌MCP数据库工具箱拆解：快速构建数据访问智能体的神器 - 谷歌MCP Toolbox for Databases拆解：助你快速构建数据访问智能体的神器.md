---
title: "谷歌MCP Toolbox for Databases拆解：助你快速构建数据访问智能体的神器"
source: "https://mp.weixin.qq.com/s/ibGBnaeVgDAH1zyqL17w4Q"
author:
  - "[[秋山墨客]]"
published:
created: 2025-06-24
description: "如何让智能体快速拥有数据库访问的Tools？"
tags:
  - "数据库访问"
  - "工具共享"
  - "安全管控"
  - "连接池"
  - "谷歌开源项目MCP Toolbox for Databases详解，帮助企业更轻松开发与维护数据库访问工具"
abstract: "谷歌开源MCP Toolbox for Databases项目详解，帮助企业快速构建与维护数据库访问工具。"
---
Original 秋山墨客 *2025年06月23日 16:47*

点击上方  

蓝字  

关注我们  

![Image](https://mmbiz.qpic.cn/mmbiz_gif/KKEfQ8qVyc78QBHxMwlJbpPhbLJXf69KqEvzL9xPQtiajsAriaicxdxC5WO1feZFR3altzYnhTVvOHtX3O7wzu2rA/640?from=appmsg&wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

在企业Agent的运行过程中，可能会经常需要访问数据库，比如一个AI客服可能需要查询某订单的状态等。实现这样的Agent工具固然并不复杂，但你可能会遇到诸如工具共享、安全管控、连接池等一系列工程问题。本文将详解来自谷歌公司的开源项目： MCP Toolbox for Databases ，看它如何帮助我们更轻松便捷的开发与维护数据库访问的工具。

![Image](https://mmbiz.qpic.cn/mmbiz_png/90CnTjsKiae6y2kAM2SzoMicMg1bkIcu67ZVKibXerANa013dj6hTOxszEFSzfORic2oyxhU4khGoR19biaOeC6yvXg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)
- 了解基本概念
- 安装、配置与启动Toolbox Server
- 使用Tools：原生SDK模式
- 使用Tools：MCP模式
- 安全、可观测性、小结

**01  
**

**了解基本概念**

【MCP Toolbox for Databases是什么】

谷歌的MCP Toolbox for Databases是一个开源的 数据库访问工具（Tool）服务器 。可以让你的AI客户端（比如智能体、IDE等）更简单快速的拥有访问各种数据库的工具。这里的 数据库可以是RDBMS、图数据库、缓存，甚至还可以是HTTP访问的数据服务。

尽管名字中带有MCP，但MCP Toolbox for Databases并不依赖于MCP，它诞生在MCP之前，后来添加了对MCP协议访问的兼容性。  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

借助MCP Toolbox for Databases，你可以：

- 快速定义访问数据库的工具（Tool）或工具集
- 支持多种常见数据库，比如Postgres、Neo4j、Redis等
- 对这些数据库工具做集中管控、维护、观察与共享
- 在主流的Agent开发框架中快速加载与使用这些工具
- 在支持MCP的客户端中方便的集成与使用这些工具

【它有什么好处】

LLM应用对企业数据库的访问，通常的方案通常是自行开发，比如：

- 编写函数工具直接用SQL访问数据库
- 将企业现有的微服务/API包装成工具
- 直接借助Text2SQL方案实现自然语言访问

不过在大型企业应用中，这些实现方法存在一些可以预见的问题：

- 大量分散的工具在企业内难以实现集中管控，并在多个应用或框架间复用
- 一些常见的工程问题会带来额外的成本与隐患，比如安全性与并发性能
- 至于Text2SQL，存在很明显的可靠性不足、权限失控、延时过大等风险

而借助MCP Toolbox for Databases，这些问题可以有效的得到解决或者缓解。当然它也远非万能，一些复杂的数据访问逻辑或许仍然需要传统方案的结合。

【怎么使用它】

MCP Toolbox for Databases目前有两种主要使用方式：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

方式1：通过传统HTTP（原生SDK）使用

借助官方提供的客户端集成SDK，可以轻松的在LangGraph、LlamaIndex、Google ADK框架开发的Agent中导入并使用Toolbox Server中的工具。

方式2：通过MCP使用

借助MCP客户端SDK以及开发框架提供的适配器（如langgrap-mcp-adaper），将Toolbox Server作为独立的MCP Server，加载与使用其中的工具。

在MCP访问模式下，有少量功能目前存在限制。

总的建议是：如果你是基于LangGraph、LlamaIndex、ADK框架开发Agent，直接使用SDK访问；其他情况下（如支持MCP的IDE、现有基于MCP的应用等）则使用MCP模式使用。

  

**02  
**

**安装、配置与启动Toolbox Server**

我们创建一个Demo演示MCP Toolbox for Databases的能力与用法。这个Demo将实现一个简单的ReAct Agent，使用Toolbox Server中的多个工具来完成一些模拟的CRM客户服务中的常见任务。比如订单查询统计、物流状态查询等。原料如下：

- Agent框架：LangGraph
- 数据库：Postgres
- Toolbox访问：通过SDK访问
- LLM：gpt-4o-mini

【1. 准备模拟数据库】

创建一个测试用的Postgres数据库，模拟一些客户服务相关的表，并让AI帮我们生成一些模拟数据：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

【2. 安装MCP Toolbox for Databases】

直接在github上下载release版本。与一些MCP Server不同， MCP Toolbox for Databases以可执行的介质（go语言编写）发行：

https://github.com/googleapis/genai-toolbox/releases

下载完成将获得一个toolbox可执行文件，将这个文件拷贝到你的环境下，并增加可执行权限：

```bash
chmod u+x toolbox
```

【3. 配置tools.yaml】

创建一个配置文件tools.yaml，用来定义数据库的连接信息及发布的工具。以下是我们配置文件的一部分：

```sql
sources:  # 数据库信息  crm-database:      kind: postgres      host: 127.0.0.1      port: 5432      database: crm      user: postgres      password: yourpasswordtools:  # 通用SQL执行工具  execute_sql_tool:    kind: postgres-execute-sql    source: crm-database    description: 在CRM数据库上执行自定义SQL语句。
  # 客户管理工具  search-customer-by-phone:    kind: postgres-sql    source: crm-database    description: 根据电话号码搜索客户。    parameters:      - name: phone        type: string        description: 要搜索的电话号码。    statement: SELECT customer_id, name, phone, email, address, vip_level, registration_date FROM customers WHERE phone ILIKE '%' || $1 || '%';    #....其他自定义工具....
toolsets:  crm-customer-management:    - search-customer-by-email    - search-customer-by-phone    - get-customer-stats......
```

配置信息很好理解：

sources部分 ：用来定义数据源。这些源将用作下面工具的访问对象。可以是：

- 关系型数据库如postgres
- 图数据库如neo4j
- 缓存数据库如redis
- HTTP访问端点，表示一个HTTP Server

tools部分 ：用来定义多个数据访问的工具。每个工具包括它的类型（kind）、数据源（source）、描述（description）、参数（parameters）、以及具体的数据访问方法。访问方法根据不同的数据源而有所不同：

- 关系数据库 ，通常是参数化的SQL语句（statement）。比如上面例子中SQL的$1就代表parameters部分定义的第一个参数；
- 图数据库 ， 比如neo4j，定义访问的参数化的Cypher语句（statement）
- 缓存数据库 ，比如redis，定义缓存访问的参数化命令（commands）
- HTTP数据源 ，定义访问的Method、Path以及参数化的Header、Body等

注意这里kind为 postgres-execute-sql 的工 具无需定义任何SQL，这是一个预置的用来执行任意SQL的工具，但不要在生产环境中开放。

toolsets部分 ：用来将大量的工具进行分组管理，形成多个工具集。你可以把不同的工具集交给不同的Agent使用或者做不同的安全控制等；

【4.启动Toolbox Server】

在配置完成tools.yaml后，就可以启动Toolbox Server：

```bash
./toolbox --tools-file "tools.yaml"
```

当你看到如下的加载信息后，代表Server启动成功，现在你就可以使用这个Server中的各种工具了！

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

**03  
**

使用Tools：原生SDK模式

Toolbox Server本质上就是一个HTTP Server，用来暴露你定义的工具并提供端点调用。事实上你可以用浏览器查看到工具信息。比如查看以下地址：

http://127.0.0.1:5000/api/tool/execute\_sql\_tool

你可以直接看到这样的信息：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

所以，原生SDK就是通过标准HTTP方法来发现与调用Server中的各种工具。这里我们使用LangChain框架适配的SDK：

```nginx
pip install toolbox-langchain
```

接着就可以在LangGraph Agent中来加载使用Toolbox Server中的工具/工具集。核心方法如下：

```bash
......
async def initialize_agent(self):
    """初始化Agent，加载Toolbox工具"""
    try:
        # toolbox_url比如：http://127.0.0.1:5000
        print(f"🔗 正在连接Toolbox 服务器: {self.toolbox_url}")
        
        # 创建 ToolboxClient 实例
        client = ToolboxClient(self.toolbox_url)
        
        # 加载指定的工具集，例如 "crm-all-tools"
        print("📦 正在加载 crm-all-tools 工具集...")
        try:
            self.tools = await client.aload_toolset("crm-all-tools")
        except Exception as toolset_error:
              ......
        
        self.agent = create_react_agent(
            self.llm, 
            self.tools, 
            checkpointer=MemorySaver()
        )
        ......
```

通过简单的 aload\_toolset 就可以加载Toolbox Server中你定义的数据访问工具，然后将它交给Agent使用。

对这个Agent做简单测试，以验证工具的可用性（使用流式调用跟踪中间步骤）：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以看到，Agent调用了两个工具来回答用户的输入问题，并且完美的回答了问题。相对于使用Text2SQL，这种预定义工具牺牲了一定的灵活性，但提供了生产环境下绝对的确定性与准确性。而对于分析环境，常面临较复杂的SQL，也可以把它们固化下来作为工具：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

**04  
**

**使用Tools：MCP模式**

通过MCP使用MCP Toolbox for Databases有两种常见场景：

【在IDE（比如Cursor、VSCode）中使用】

这种场景下通常不需要定义tools.yaml，直接使用预构建的工具即可，通常包括list\_tables(列出所有表）或者execute\_sql(执行任何SQL)工具。所以只需配置MCP Server的启动参数即可，比如：

```json
{  "mcpServers": {    "postgres": {      "command": "./PATH/TO/toolbox",      "args": ["--prebuilt","postgres","--stdio"],      "env": {        "POSTGRES_HOST": "",        "POSTGRES_PORT": "",        "POSTGRES_DATABASE": "",        "POSTGRES_USER": "",        "POSTGRES_PASSWORD": ""      }    }  }}
```

【在自定义LLM应用中使用】

只需借助MCP官方的Client SDK或langgraph-mcp-adapter这样的框架适配器，就可用标准的方式访问Toolbox Server中的工具。目前支持stdio与sse两种模式。

这里不再做编程展示，我们用MCP官方的调试工具MCP Inspector简单验证Toolbox Server中的工具。首先启动Inspector：

```nginx
npx @modelcontextprotocol/inspector
```

然后进入MCP Inspector的Web界面，使用SSE方式连接，并确保URL正确（通常为http://xxxxx:5000/mcp/sse），然后连接。如果连接成功，你可以在右边的Tools页面看到所有Toolbox Server中的工具，然后对其测试：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

**05  
**

安全、可观测性、小结

以上展示了Google的一个实用开源项目MCP Toolbox for Databases的用法。它可以帮助我们快速构建生成式AI应用所需要的工具，以访问企业中各种数据源中的数据，并提供了良好的性能、兼容性与可管理性。

作为面向企业环境的工具服务器，MCP Toolbox for Databases还提供了一定的安全管控与可观测能力。

- 目前MCP Toolbox for Databases支持通过Google账号进行OAuth 2.0的认证流程，以获得工具调用的安全令牌。
- MCP Toolbox for Databases提供了基于OpenTelemetry标准的可观测性，用于进行统一的分布式追踪、指标搜集与日志管理。

期待随着版本的持续迭代， MCP Toolbox for Databases会变得越来越强大易用。

**END**

福利时间

  

为了帮助LLM开发人员更系统性与更深入的学习RAG应用，特别是企业级的RAG应用场景下，当前主流的优化方法与技术实现，我们编写了 **《基于大模型的RAG应用开发与优化 — 构建企业级LLM应用》** 这本长达 **500页的开发与优化指南** ，与大家一起来深入到LLM应用开发的全新世界。  

更多细节，点击链接了解

  

交流请识别以下名片

并说明来意

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

AI大模型应用实践

向上滑动看下一个