---
title: "MCP堆工具是大坑！开发者大佬：命令行的‘脆’让AI崩惨了！不如砍成一个代码执行器：7轮调用秒变1轮！网友：早该放弃黑箱工具了！"
source: "https://mp.weixin.qq.com/s/AzDhI4THog3bhnmx1XEIbA"
author:
  - "[[伊风]]"
published:
created: 2025-08-19
description: "毕竟，LLM 学到的是“人类写代码”的方式，而不是机器最优的结构化方式。"
tags:
  - "MCP工具"
  - "命令行问题"
  - "代码执行器"
abstract: "开发者建议MCP工具应简化为一个代码执行器，以提高效率和稳定性。"
---
Original 伊风 [51CTO技术栈](https://mp.weixin.qq.com/s/)

*2025年08月19日 15:12* *北京*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**编辑 | 伊风**

**你的 MCP，可能真用错了？**

MCP 常被视作大模型的“USB 接口”。不少开发者第一反应就是：往里堆更多专用工具（grep、sed、tmux……），好像这样就能让 AI 更强大。

  

但在 Hacker News 上，一篇热帖却抛出截然相反的结论：

  

 👉 工具越多越乱，MCP 的最优解是——只留一个代码执行器。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

开发者都知道：命令行工具其实很“脆”。

  

- 跨平台/版本兼容性差
- 换行符、特殊字符动不动就出错
- 会话一乱套，进程直接跑飞

  

作者敏锐地意识到：这些不是小 bug，而是底层结构性的难题。

  

所以问题来了：**命令行的问题究竟出在哪？为什么答案不是更多小工具，而是一个「超级工具」——一个能直接运行 Python/JS 的解释器？**

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**MCP 调命令行工具为什么总崩？**

作者表示，调用命令行工具，最让人抓狂的是：

  

AI 一旦出错，要么推倒重来，要么干脆换别的工具，只因为一个小细节没处理对。

  

这背后有两个明显的缺陷：

  

**第一，平台和版本兼容性差。**

命令行工具常常依赖具体环境，有时甚至缺乏文档支持。结果就是——几乎每次首次调用都会踩坑。

  

更典型的例子是处理非 ASCII 字符：Claude Sonnet、Opus 有时都分不清该怎么在 shell 里传递换行符或控制字符。

  

这种情况并不少见，C 语言编译时，末尾常常需要保留一个换行符，而 AI 工具偏偏会在这里卡死，一大堆令人“叹为观止”的工具循环来解决。

  

**第二，调用链太长，状态管理困难。**

有些智能体（尤其是 Claude Code）在执行 shell 调用前，shell 调用前还会多一道“安全预检”。Claude 会先用小模型 Haiku 判断这个调用是不是危险的，再决定要不要执行。

  

更棘手的是多轮调用。比如让它用 tmux 远程控制 LLDB，理论上能行，但它常常“失忆”：半路改掉 session 名字，忘了自己还有会话，也就没法正常结束任务。

  

总的来说，命令行工具一旦进入多轮调用场景，稳定性就成了最大软肋。

  

而这反而掩盖了 CLI 工具原本的优势。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/MOwlO0INfQq9VIibuQ22iajvze631pQJVv7ibyGuL0I4icm8WDcjJED18MoII9zQibicm14LThHibzUyEx9XKLuhLcbnQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

命令行的本事在“组合”，而 MCP 正在削弱它

  

命令行工具本质上不是单一工具，而是一整套可以通过编程语言（bash）组合起来的工具。

  

在 bash 里，你可以把 grep、awk、sed、tmux 这些小工具接起来，前一个工具的输出直接作为后一个工具的输入，一行命令就能解决复杂问题。

  

**这就是命令行的“组合性”。**

然而，一旦转向 MCP，这种**无需额外推理的组合**就不见了（至少以今天的实现）。

  

 为什么？

  

 因为 MCP 的调用模型是**把工具当作黑箱**：一次只调一个工具，拿到结果，再进入下一轮推理。

  

这意味着，AI 想复现 bash 的那种灵活组合，就必须自己重新推理、逐步调用，过程既慢又容易出错。

  

一个经典例子是用 **tmux 远程控制 lldb，**在 CLI 下，AI 会这样串：

  

- 它先用 `tmux send-keys` 输入命令
- 再用 `tmux capture-pane` 抓取输出
- 甚至会插入 `sleep` 等待，再继续 capture，避免过早读取结果

  

当它遇到复杂字符编码问题时，还会换种方式，比如转成 base64 再解码。

  

而在 MCP 下，这个过程会被拆成很多轮，每走一步，每走一步都要**重新推理状态**（比如 session 名、断点位置、上次输出片段），链条任一环掉了就全盘重来。

  

作者还强调了另一个 CLI 强项：让 AI **先写小脚本、再复用、再拼装**，最终长成一套稳定的自动化脚本。

  

 而在 MCP 的黑箱调用里，这种“脚本化+复用”的自增长路径目前很难自然出现。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

更好的 MCP 方式

  

作者的激进方案：别搞几十个工具，MCP 只要一个“超级工具”。

  

这个超级工具就是 Python/JS 解释器，有状态、会执行代码。

  

shell 工具是有极限的，你迟早会陷入和工具“搏斗”的状态，尤其是当智能体需要维护复杂会话时。

  

MCP 天生有状态。一个更实用的思路是：**只暴露一个“超级工具”——带状态的 Python 解释器**。它通过 `eval()` 执行代码并保持上下文，让智能体用熟悉的方式操作。

  

作者的实验是 **pexpect-mcp**。表面上叫 `pexpect_tool`，本质上是一个运行在 MCP 服务器端、预装了 pexpect 库的持久化 Python 解释器环境。pexpect 是经典 expect 工具的 Python 移植版，可以脚本化地和命令行交互。

  

这样，MCP 服务器变成一个有状态的 Python 解释器，它暴露的工具接口非常简单直接：执行传入的 Python 代码片段，并继承之前所有调用累积的上下文状态。

  

工具接口说明大致如下：

  

```
在 pexpect 会话中执行 Python 代码，可启动进程并与其交互。参数：  code: 要执行的 Python 代码。用变量 child 与进程交互。        已导入 pexpect，可直接用 pexpect.spawn(...) 来启动。  timeout: 可选，超时时间（秒），默认 30 秒。示例：  child = pexpect.spawn('lldb ./mytool')  child.expect("(lldb)")返回：  代码执行结果或错误信息
```

  

这种模式下，MCP 的角色不再是“工具集”，而是**代码执行器**，带来几个直接好处：

- MCP 负责会话管理和交互
- 智能体写出的代码几乎就是脚本本身
- 会话结束后，可以顺手整理成可复用的调试脚本

# 

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

实战验证：效率与复用性的飞跃

  

验证 `pexpect-mcp` 的效果，作者用它调试了一个已知会崩溃的 C 程序（`demo-buggy`）。

  

过程如下：

  

1. 首次调试 (传统 MCP 模式模拟)： AI 通过 `pexpect_tool` 与 LLDB 交互定位崩溃原因（内存未分配、数组越界）。耗时约 45 秒，涉及 7 轮工具调用。
2. 脚本化： AI 将整个调试过程自动导出为一个独立的、可读的 Python 脚本 (`debug_demo.py`)。
3. 复用验证： 在全新会话中，仅用 1 次工具调用执行 `uv run debug_demo.py`。脚本5 秒内复现了崩溃分析，精准定位问题根源。

  

作者表示，最关键的是：这个脚本是独立的，我作为人类也能直接运行它，甚至完全不依赖 MCP！

  

`pexpect-mcp` 的成功案例揭示了一个更普适的 MCP 设计方向：与其暴露一堆零散且易出错的黑箱工具，不如将编程语言本身作为交互接口。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

创新：自己手搓小型MCP

  

MCP 的一个通病是：**工具越多，越容易导致上下文腐烂**，而且输入限制很大。

  

但如果 MCP 暴露的不是一堆工具，而是一门编程语言，那么它就间接开放了模型在训练中学到的全部能力。

  

当你要构建一些全新的东西时，至少编程语言是 AI 熟悉的。你完全可以手搓一个小型 MCP，让它：

  

- 导出应用的内部状态
- 提供数据库查询辅助（哪怕支持分片架构）
- 提供数据读取 API

  

过去，AI 只能靠读代码理解这些接口；现在，它还能直接通过一个**有状态的 Python/JavaScript 会话**去调用并进一步探索。

  

更妙的是：这也让智能体有机会**调试 MCP 本身**。得益于 Python 和 JavaScript 的灵活性，它甚至能帮你排查 MCP 的内部状态。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

网友争议：AI 应该如何操作代码？

  

这篇博客的讨论，其实已经触碰到 **AI 编程的底层哲学**。

  

AI 究竟应该如何操作代码：

  

是继续停留在文本层面（字符串），还是通过更结构化的接口来理解与操控？

  

我们知道，CLI 工具的脆弱性（换行符出错、会话管理混乱）本质上就是基于字符串操作的局限。

  

那么问题来了：如果 AI 写“真代码”更好，是不是要再进一步，让它理解 AST？注：AST（抽象语法树）：是一种将代码转化为树状结构的表示方式。每个节点代表变量、函数或语句。 对编译器和 IDE 来说，AST 是比纯文本更精准的结构化接口。

  

有网友认为：

> 编辑器本该更多利用语言服务器等结构化能力，而不是让智能体在 grep、sed、awk 这些老旧工具上兜圈子。而且对大多数语言来说，操作的也不应该是字符串，而应该是 token 流和 AST。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

另一派则指出：

>  现实决定了 AI 还是更适合操作代码本身：同意现在的工具使用方式效率低，但 AI 主要还是操作代码而不是语法树，有几个原因： 
> 
> 1.训练集里代码远远多于语法树。  
> 
> 2.代码几乎总是更简洁的表示形式。 
> 
> 过去有人尝试用图神经网络或 transformer 来训练 AST 边信息，但要想超过主流 LLM 可能需要重大突破（和巨额资金）。 实验表明让智能体用 ast-grep（语法感知的搜索替换工具）效果不错，本质上还是把一切当作代码，但用语法感知的方式来替换。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

还有人强调了 字符串的普适性：

> 字符串是无依赖的通用接口。你可以跨任意语言、跨任意文件完成几乎任何事。其他抽象反而会严重限制你能做到的事情。 另外，大语言模型（LLMs）不是在 AST 上训练的，而是在字符串上训练的 —— 就像程序员一样。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

这揭示了一个问题：

  

LLM 学到的是“人类写代码”的方式，而不是机器最优的结构化方式。

  

如果未来真的有人用 AST 来大规模训练模型，那需要极其庞大的算力和资金，而且还可能牺牲通用世界知识。

  

但也许在未来，会出现一种更高效、更贴近机器的新范式。

  

你觉得这种思路，会颠覆我们今天的 AI IDE 编程体验吗？欢迎在评论区聊聊。

  

——好文推荐——

[全球最古老程序员赛事回归！晦涩C代码大战AI！750字节手搓一个推理引擎，评委：被瑞克滚了！人类比AI厉害，程序员的快乐回来了！](https://mp.weixin.qq.com/s?__biz=MjM5ODI5Njc2MA==&mid=2655928310&idx=1&sn=08c0c2f979db0b70581816389f76c93c&scene=21#wechat_redirect)

[奥特曼播客自曝：多次被打脸！模型下架内幕：GPT-5爽到再也不想回4o！围绕AI卖产品者死，卖服务者活！带娃是自己最有成就感的事](https://mp.weixin.qq.com/s?__biz=MjM5ODI5Njc2MA==&mid=2655928278&idx=1&sn=3083dcb4ba58a8bd04e7dc24d43fce59&scene=21#wechat_redirect)

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)