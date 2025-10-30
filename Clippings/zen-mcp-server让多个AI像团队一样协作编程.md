---
title: "zen-mcp-server：让多个AI像团队一样协作编程"
source: "https://mp.weixin.qq.com/s/j2PMETNbFUYC3nEQyzwizA"
author:
  - "[[GTX]]"
published:
created: 2025-10-30
description: "你有没有想过，如果 Claude、GPT-5 和 Gemini 能坐在一起开会讨论代码问题，会是什么样？"
tags:
  - "AI协作"
  - "多模型编排"
  - "开源工具"
abstract: "Zen MCP Server是一个开源项目，通过Model Context Protocol协议让多个AI模型能够像团队一样协作编程，打破AI孤岛并实现上下文共享。"
---
Original GTX *2025年10月06日 23:37*

**你有没有想过，如果 Claude、GPT-5 和 Gemini 能坐在一起开会讨论代码问题，会是什么样？**

这不是科幻。一个叫 Zen MCP Server 的开源项目，正在把这个想法变成现实。

---

## 一个真实场景

假设你在重构一个复杂的支付模块。你问 Claude："这段代码有安全漏洞吗？"它给了建议。但你不放心，想听听其他 AI 的意见。

传统做法：复制代码 → 打开 ChatGPT → 粘贴 → 再打开 Gemini → 再粘贴一次...

**用 Zen MCP 之后** ：在 Claude Code 里直接说一句：

```
用 consensus 工具问 gpt-5 和 gemini-pro：
这段支付代码有什么安全风险？
```

三个 AI 自动开会讨论，给你一份共识报告。整个过程不需要切换窗口，不需要重复粘贴， **上下文完整保留** 。

---

## 它到底解决了什么问题？

### 1\. 打破 AI 孤岛

每个 AI 模型都有特长：

- Gemini Pro 能处理 100 万 token 的超长上下文
- O3 擅长复杂推理
- GPT-5 通用能力强
- 本地 Ollama 模型保护隐私

但它们互相不认识，无法协作。Zen MCP 就像一个翻译官，让它们能对话、能传递信息、能共同完成任务。

### 2\. 上下文不再丢失

你有没有遇到过这种情况：和 AI 聊了半小时，突然它说"对不起，上下文太长了，我忘记前面说了什么"。

Zen MCP 的"上下文复活"功能很聪明：当 Claude 的记忆满了，它会让 Gemini（1M token 上下文）帮忙总结之前的对话，然后无缝继续工作。

### 3\. AI 可以调用 AI

这是最酷的部分。通过 `clink` 工具，主 AI 可以启动"子 AI"处理专项任务。

比如你在写代码时，主 Claude 可以叫一个专门的"代码审查员 AI"来检查安全问题，审查完后只返回结论，不污染主对话的上下文。

就像你在开会时，临时让同事去查个资料，查完直接告诉你结果。

---

## 技术上有什么亮点？

### 架构很优雅

Zen MCP 基于 Model Context Protocol（MCP）协议，这是 Anthropic 推出的 AI 工具标准。它的架构是这样的：

```
你的 CLI（Claude Code）
      ↓
Zen MCP Server（协调中心）
      ↓
多个 AI 模型（Gemini/GPT/O3/Ollama...）
```

所有模型通过统一接口接入，你想加新模型？改个配置文件就行。

### 对话有记忆

它用有向无环图（DAG）追踪消息之间的依赖关系。当需要裁剪上下文时，不会随便删消息，而是保证关键信息链条完整。

这就像你整理笔记时，不会把"因为...所以..."拆开。

### 智能选模型

它会根据任务特点自动选最合适的模型：

- 需要超长上下文？用 Gemini
- 需要深度推理？用 O3
- 对延迟敏感？用 Gemini Flash

你不用操心，它自己判断。

---

## 实际能做什么？

### 场景 1：多模型共识决策

```
"用 consensus 问 3 个模型：
我们应该先做暗黑模式还是离线支持？"
```

三个 AI 各自分析，给出推理过程和投票，最后形成共识报告。

### 场景 2：代码安全审计

```
"启动 clink 子代理，用 codereviewer 角色
审计 auth 模块的安全问题"
```

子 AI 专注分析安全漏洞，主 AI 继续处理其他任务，互不干扰。

### 场景 3：跨模型知识传递

Claude 上下文满了？让 Gemini 读取完整历史并总结，然后 Claude 基于摘要继续工作。

---

## 为什么值得关注？

### 1\. 开发者主权

你不再被单一 AI 厂商绑定。今天用 Claude，明天切换到本地模型，工作流不变。

### 2\. 协作范式

这不是简单的 API 聚合，而是真正的"AI 团队协作"。它展示了未来 AI 工作方式的雏形。

### 3\. 开源生态

完全开源，社区活跃。你可以自己部署，可以改代码，可以接入任何模型。

---

## 怎么开始用？

项目提供了 NPX 快速启动版本：

```
npx @199-mcp/zen
```

配置好 API Key，在 Claude Code 里就能直接调用多个模型了。

详细文档写得很清楚，即使你不是专业开发者，跟着步骤也能跑起来。

---

## 《异或Lambda》的思考

AI 的未来不是某个模型"一统天下"，而是多样化的智能体协同工作。

Zen MCP Server 证明了一件事： **让 AI 协作，比让单个 AI 更强，更有价值** 。

就像人类社会，最强大的不是某个天才个体，而是能高效协作的团队。

今天，我们用 Zen MCP 让 AI 组队写代码。明天，也许它们能组队做科研、做设计、做决策。

**今天的科幻，明天的日常。AI 改造世界，正在进行时。**

---

### 🔖 关注《异或Lambda》

主打 AI 与未来生产力 | 解放生产力 · 创造未来 · 改造世界

---

### 📎 项目资源

**GitHub 仓库：BeehiveInnovations/zen-mcp-server**

---

标签： [#ZenMCP](https://mp.weixin.qq.com/s/) [#GitHub](https://mp.weixin.qq.com/s/) [#AI协作](https://mp.weixin.qq.com/s/) [#MCP](https://mp.weixin.qq.com/s/) [#多模型编排](https://mp.weixin.qq.com/s/) [#开源项目](https://mp.weixin.qq.com/s/) [#Claude](https://mp.weixin.qq.com/s/)

内容含AI生成图片，注意甄别

[Read more](https://mp.weixin.qq.com/s/)

继续滑动看下一个

异或Lambda

向上滑动看下一个