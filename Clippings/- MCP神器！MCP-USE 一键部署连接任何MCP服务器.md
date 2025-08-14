---
title: "MCP神器！MCP-USE 一键部署连接任何MCP服务器"
source: "https://juejin.cn/post/7537956340511129651"
author:
  - "[[程序员海军]]"
published: 2025-08-14
created: 2025-08-14
description: "`mcp-use` 是连接任何 LLM 到任何 MCP 服务器并构建自定义 MCP 智能体最简单的开源方式，无需依赖闭源或特定应用客户端。"
tags:
  - "开源工具"
  - "LLM连接"
  - "MCP服务器"
  - "AI智能体"
abstract: "mcp-use是一个开源Python库，简化了LLM与MCP服务器的连接，使开发者能轻松构建自定义AI智能体。"
---
![横幅](https://p9-piu.byteimg.com/tos-cn-i-8jisjyls3a/8c759ddb57d0440986f4768fc644f879~tplv-8jisjyls3a-2:0:0:q75.image) ![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/b37ce6cd3dfa46f699d8fc9c7c888f2f~tplv-8jisjyls3a-3:0:0:q75.png)

Hello， 大家好，我是程序员海军, `全栈开发` | `AI爱好者` ｜ `独立开发` 。 最近一直在研究MCP方面的事情，使用的技术栈是Python + FastAPi + FastMCP，开发了多个MCP-Server，本地化访问没啥问题，准备部署试着玩一下，调研发现这样的一个 MCP 神器，可一键部署MCP 服务器托管，并且它简化了很多操作，简直太方便了。 ![0a6ef4f320048cb65b892cfff1a4ac78](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5df360000459436e806d09d8077516f5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56iL5bqP5ZGY5rW35Yab:q75.awebp?rk3s=f64ab15b&x-expires=1755747879&x-signature=RdsZFLjHMO2Jw9DIxgXWVaTJPAs%3D)

`mcp-use` 是连接任何 LLM 到任何 MCP 服务器并构建自定义 MCP 智能体最简单的开源方式，无需依赖闭源或特定应用客户端。 它解决了开发者在构建 AI 智能体时面临的工具集成复杂性问题，让开发者能够轻松地将 LLM 连接到各种工具，如网页浏览、文件操作等。

## 什么是 mcp-use

![65b58369f32b63e42f5c0769728099b3](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6b90cca372f94d46bc4575f327022795~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56iL5bqP5ZGY5rW35Yab:q75.awebp?rk3s=f64ab15b&x-expires=1755747879&x-signature=Qh1dYbIdlBv7E%2BugOBlacPRoooM%3D)

`mcp-use` 是一个开源 `Python` 库，专门用于连接 `LLM` 和 `MCP服务器` 。它充当了 `LLM` 和各种工具服务之间的桥梁，让开发者能够创建具有工具访问能力的自定义智能体。

核心价值

- 开放性：完全开源，不依赖任何闭源或特定应用的客户端
- 通用性：支持任何 LangChain 兼容的 LLM 提供商（OpenAI、Anthropic、Groq 等）
- 灵活性：通过简单的 JSON 配置即可连接各种 MCP 服务器
- 易用性：提供简洁的 Python API，几行代码即可创建功能强大的智能体

## mcp-use 功能

### LLM 灵活性

- 支持各大模型系列的模型

### 多种连接方式

- Stdio 连接：标准输入输出连接方式
- HTTP 连接：支持连接到特定端口的 MCP 服务器
- SSE 连接：支持服务端事件流连接
- 沙盒执行：通过 E2B 云基础设施运行 MCP 服务器

### 高级功能

![image](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/0c2027ff1fa340c9a24dbb43ee3e4402~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56iL5bqP5ZGY5rW35Yab:q75.awebp?rk3s=f64ab15b&x-expires=1755747879&x-signature=dkvZT%2B9OTTrpT9uVEJiz4RlndgQ%3D)

- 多服务器支持：同时连接多个 MCP 服务器
- 动态服务器选择：智能选择最合适的服务器执行任务
- 工具访问控制：限制智能体可使用的工具范围
- 流式输出：支持实时输出智能体的执行过程
- 调试模式：提供详细的调试信息帮助开发

### 配置管理

![image](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/dad1fe3ccd354b4eac2737d03be72eb8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56iL5bqP5ZGY5rW35Yab:q75.awebp?rk3s=f64ab15b&x-expires=1755747879&x-signature=g71ZaGwV6oFe6bZOMPTKXpvoeio%3D)

- 支持 JSON 配置文件
- 支持字典配置
- 环境变量管理
- 灵活的服务器配置选项

## mcp-use 如何使用

## 安装

```python
# 基础安装
pip install mcp-use

# 安装 LLM 提供商依赖
pip install langchain-openai  # OpenAI
pip install langchain-anthropic  # Anthropic

# 安装沙盒支持（可选）
pip install "mcp-use[e2b]"
```

### 基本使用

```python
import asyncio
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from mcp_use import MCPAgent, MCPClient

async def main():
    load_dotenv()
    
    # 配置 MCP 服务器
    config = {
        "mcpServers": {
            "playwright": {
                "command": "npx",
                "args": ["@playwright/mcp@latest"],
                "env": {"DISPLAY": ":1"}
            }
        }
    }
    
    # 创建客户端和智能体
    client = MCPClient.from_dict(config)
    llm = ChatOpenAI(model="gpt-4o")
    agent = MCPAgent(llm=llm, client=client, max_steps=30)
    
    # 执行任务
    result = await agent.run(
        "上海有哪些美食"
    )
    print(f"结果: {result}")

if __name__ == "__main__":
    asyncio.run(main())
```

### 使用配置文件

创建 mcp-config.json 文件：

```python
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "env": {
        "DISPLAY": ":1"
      }
    },
    "airbnb": {
      "command": "npx",
      "args": ["-y", "@openbnb/mcp-server-airbnb"]
    }
  }
}
```

在代码中使用mcpserver

```python
client = MCPClient.from_config_file("mcp-config.json")
```

### 流式输出

```python
async for chunk in agent.astream("山西哪里好玩？"):
    print(chunk["messages"], end="", flush=True)
```

### 工具访问控制

```python
# 限制智能体可使用的工具
agent = MCPAgent(
    llm=llm,
    client=client,
    disallowed_tools=["get_Personal",]  # 禁用一些工具调用
)
```

### 调试模式

```python
#在代码中设置
import mcp_use
mcp_use.set_debug(2)  # 启用详细调试信息
```

## 总结

`mcp-use` 为开发者提供了一个强大而灵活的解决方案，解决了 `LLM` 与外部工具集成的复杂性问题。

我们可以通过几行代码快速构建AI Agent，并且还可以轻松的集成MCP 服务器和工具了。

随着 MCP 生态系统的不断发展，我觉得不管是大模型的开发还是Agent 开发等等，门槛都会被降低下来了，现在已经是这个趋势了。AI 的飞速发展，以往的很多知识点可能被推翻，化繁为简，变的更简单。

> **mcp-use: `https://mcp-use.com/`**

本文收录于以下专栏

![cover](https://p3-juejin-sign.byteimg.com/tos-cn-i-k3u1fbpfcp/7ca4d85b45d6472aa9c88030bac8424f~tplv-k3u1fbpfcp-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56iL5bqP5ZGY5rW35Yab:q75.awebp?rk3s=f64ab15b&x-expires=1755748012&x-signature=4c8XcFH3GNPQSTdAo7akiFs6MSY%3D)

转型: 进击AI应用开发工程师

专栏目录

分享AI 最新动态

15 订阅

·

14 篇文章

评论 0

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

APP内打开