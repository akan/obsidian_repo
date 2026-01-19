---
title: "一个For循环就是全部：BU开源了它的Agent框架"
source: "https://mp.weixin.qq.com/s?__biz=MzA5MTIxNTY4MQ==&chksm=868cb0731329be884f47e66495eadc9bc24c7cc4152ef89bc9edf2cce75e68a5afb686bdfcb7&idx=1&mid=2461158025&sn=fbd1570b9473b6c4e7505998b11298aa#rd"
author:
  - "[[winkrun]]"
published:
created: 2026-01-19
description:
tags:
  - "Agent框架"
  - "极简设计"
  - "显式完成"
  - "上下文管理"
abstract: "BU开源的Agent框架采用极简设计，核心是一个for循环，强调模型能力而非复杂抽象，通过显式完成工具和上下文管理解决传统框架问题。"
---
Original winkrun *2026年1月18日 22:01*

Browser Use团队宣布将要发布他们的Manus: BU.app，同时提前把驱动BU的bu-agent-sdk开源了。这个框架的设计理念简单到近乎讽刺：Agent就是一个for循环。

![Agent Loop](https://mmbiz.qpic.cn/mmbiz_png/aaN2xdFqa4HUNEhPlPhKADnIc4xVgZYqHP3NIsIyugPPic4iam8S3riaLwAZTH7LUbVFvW3FA4iabIhUBBzOOETYKQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

Agent Loop

核心代码只有几行：不断调用LLM，执行工具，把结果塞回上下文。框架作者Gregor Zunic在推文中直言："所有价值都在RL过的模型里，不在你那上万行的抽象里。"

## 为什么这个框架值得关注

大多数Agent框架失败不是因为模型弱，而是行动空间不完整。bu-agent-sdk反其道而行，尽量减少抽象，最大化模型自由度。

关键设计包括显式完成机制（通过done tool防止误判结束）、上下文压缩（接近阈值自动摘要）、短期工具输出（只保留最近几次大输出避免膨胀）。

## Done Tool Pattern解决了什么问题

传统框架用"没有工具调用就停止"的逻辑，结果Agent经常干到一半就溜了。bu-agent-sdk强制要求显式完成：

```
@tool("Signal completion")
async def done(message: str) -> str:
    raise TaskComplete(message)

agent = Agent(
    llm=llm,
    tools=[..., done],
    require_done_tool=True,  # 自主模式
)
```

这个设计看似简单，实际解决了Agent框架的核心问题：如何判断任务真正完成。

## Ephemeral Messages的巧思

浏览器状态、DOM树、截图这些大块头会快速撑爆上下文。框架的解决方案是只保留最近N条大输出：

```
@tool("Get browser state", ephemeral=3)  # 只保留最近3条
async def get_state() -> str:
    return massive_dom_and_screenshot
```

这让Agent能处理长时间任务，不会因为上下文溢出而崩溃。

## 上下文自动压缩

当接近模型上下文限制时，框架会自动总结早期对话：

```
from bu_agent_sdk.agent import CompactionConfig

agent = Agent(
    llm=llm,
    tools=tools,
    compaction=CompactionConfig(threshold_ratio=0.80),
)
```

压缩阈值设在80%，给模型留出足够的操作空间。

## 统一的LLM接口

框架支持三大主流模型提供商，每个实现约300行代码：

```
from bu_agent_sdk.llm import ChatAnthropic, ChatOpenAI, ChatGoogle

# 同样的接口，不同的模型
agent = Agent(llm=ChatAnthropic(model="claude-sonnet-4-20250514"), tools=tools)
agent = Agent(llm=ChatOpenAI(model="gpt-4o"), tools=tools)
agent = Agent(llm=ChatGoogle(model="gemini-2.0-flash"), tools=tools)
```

这种设计让开发者能轻松切换模型，对比不同提供商的表现。

## 实际能用吗？

Matt Shumer在推文中展示了一个重要发现：bu-agent-sdk可以使用任何模型，只需要修改三个环境变量就能切换到OpenRouter支持的任何模型。有网友Robert Lukoszko实际测试了Gemini Flash + agent sdk的组合，确认"它确实能跑起来"。

这个发现让框架的价值大大提升。开发者不再被绑定到特定的模型提供商，可以根据成本、性能、可用性自由选择。

框架的依赖注入系统借鉴了FastAPI的设计，类型安全且易于测试：

```
from typing import Annotated
from bu_agent_sdk import Depends

def get_db():
    return Database()

@tool("Query users")
async def get_user(id: int, db: Annotated[Database, Depends(get_db)]) -> str:
    return await db.find(id)
```

框架还暴露了完整的执行过程，便于UI展示或日志记录：

```
from bu_agent_sdk.agent import ToolCallEvent, ToolResultEvent, FinalResponseEvent

async for event in agent.query_stream("do something"):
    match event:
        case ToolCallEvent(tool=name, args=args):
            print(f"调用 {name}")
        case ToolResultEvent(tool=name, result=result):
            print(f"{name} -> {result[:50]}")
        case FinalResponseEvent(content=text):
            print(f"完成: {text}")
```

## 100行代码实现Claude Code

最有趣的是示例中的"Claude Code风格沙箱"。不到100行代码就能构建一个安全的编程助手：

```
@dataclass
class SandboxContext:
    """所有文件操作限制在root_dir内"""
    root_dir: Path
    working_dir: Path

    def resolve_path(self, path: str) -> Path:
        resolved = (self.working_dir / path).resolve()
        resolved.relative_to(self.root_dir)  # 越界会抛异常
        return resolved
```

工具集包括bash、文件读写、搜索、todo和done，构成完整的编程环境。所有文件操作被严格限制在沙箱目录内，防止越界访问系统文件。

作者表示，他在构建BU应用时遇到的主要挑战是"移除默认动作和通过工具调用控制远程沙箱"，这些经验都被融入到了开源框架中。

## 小结

大道至简，返璞归真。

这个项目给了我们设计AI应用开发的本质。当模型足够强大时，最有效的框架反而是最简单的那个。

有人评价说："我喜欢2026年1月的Agent框架 = 2022年12月的Agent框架。时间是个圆圈:)" 当时就提出了"用非官方API和for循环"来实现Agent的想法。

作者也在项目末尾点出设计真谛：

"The Bitter Truth"

每个抽象都是负担，每个"帮助器"都是故障点。模型已经足够强大，经过了计算机使用、编程、浏览的强化学习训练。它们不需要护栏，只需要：

- 完整的行动空间
- 一个for循环
- 显式退出机制
- 上下文管理

**The bitter lesson: The less you build, the more it works.**

项目地址：https://github.com/browser-use/agent-sdk

关注公众号回复“进群”入群讨论。

修改于 2026年1月18日

继续滑动看下一个

AI工程化

向上滑动看下一个