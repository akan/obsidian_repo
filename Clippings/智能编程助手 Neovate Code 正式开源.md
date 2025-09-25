---
title: "智能编程助手 Neovate Code 正式开源"
source: "https://mp.weixin.qq.com/s/vRlkkQGhIxGJAD4EYshflw?scene=1&click_id=130"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-09-25
description:
tags:
  - "开源"
  - "智能编程助手"
  - "功能丰富"
  - "多模型支持"
abstract: "支付宝体验技术部开源了智能编程助手Neovate Code，支持多模型提供商和丰富的代码开发功能。"
---
*2025年09月24日 15:36*

![Neovate Code](https://mmbiz.qpic.cn/mmbiz_gif/M7OtEw9eDKElQZDC4YAGqoDibLE76GnbZRzjOu2ePKCic1IiaGK2u0t3CI8I9rQ5IXysGMKbooJsx0kQA6DTunWiaQ/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

Neovate Code

支付宝体验技术部正式对外开源智能编程助手 Neovate Code，能够深度理解你的代码库，遵循既有编码习惯，并在上下文感知的基础上，精准地完成功能实现、Bug 修复和代码重构。它集成了 Code Agent 所需的核心能力。

GitHub：https://github.com/neovateai/neovate-code

目前，Neovate Code 以 CLI 工具的形态提供，但其架构设计高度灵活，未来将支持多种客户端形态，适配更多开发场景。

![Neovate Code](https://mmbiz.qpic.cn/mmbiz_png/M7OtEw9eDKElQZDC4YAGqoDibLE76GnbZuKib31BRO3ic1ibaZywlp1uTooXKap9ucDzFmZuSsIiaIOia79I2INmueiaw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

Neovate Code

其主要功能包括：

- **对话式开发** \- 用于编程任务的自然对话界面
- **AGENTS.md 规则文件** \- 为你的项目定义自定义规则和行为
- **会话继续和恢复** \- 跨会话继续之前的工作
- **支持流行的模型和提供商** \- OpenAI、Anthropic、Google 等
- **斜杠命令** \- 常用操作的快速命令
- **输出样式** \- 自定义代码更改的呈现方式
- **计划模式** \- 在执行前审查实现计划
- **无头模式** \- 在没有交互提示的情况下自动化工作流
- **插件系统** \- 用自定义插件扩展功能
- **MCP** \- 用于增强集成的模型上下文协议
- **Git 工作流** \- 智能提交消息和分支管理
- ...
![Image](https://mmbiz.qpic.cn/mmbiz_png/M7OtEw9eDKElQZDC4YAGqoDibLE76GnbZXOI5WqbEicV9BrWvv24H9y8MRiaRr5qJ7FWXX1n1T7k6NbE9yBVSZcNw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

## 快速开始

准备试试 Neovate Code？上手很简单：

```
npm install -g @neovate/code
neovate
```

Neovate Code 支持对接多家模型提供商（Provider），并通过环境变量来识别各 Provider 的 API Key。

## 配置 API Key

如果环境变量中尚未设置 API Key，需要先完成配置：输入 /login，选择目标 Provider，根据提示访问对应网站进行登录或注册，然后创建并填写 API Key。

## 选择模型

完成 API Key 配置后，可以输入 /model 来选择该 Provider 下可用的模型。

## 开始使用

一切准备就绪后，你就可以在命令行中描述你的开发需求。Neovate Code 会给出实现方案，你可以先审查，再选择是否 approve 工具调用，从而安全、可控地完成任务。

```
# 你可以做的示例：
"Add error handling to the user authentication function"
"Refactor this component to use TypeScript"
"Create unit tests for the payment service"
"Optimize this database query"
```
![Image](https://mmbiz.qpic.cn/mmbiz_png/M7OtEw9eDKElQZDC4YAGqoDibLE76GnbZXOI5WqbEicV9BrWvv24H9y8MRiaRr5qJ7FWXX1n1T7k6NbE9yBVSZcNw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

## 为什么选择 Neovate Code？

市面上有很多 Code Agent，以下是 Neovate Code 与其他 Code Agent 不同的一些特性：

- **开放的 Claude Code**
- **易于扩展**
- **多客户端支持**

Neovate Code 从 Claude Code 学到了很多，包括功能、配置等。

Claude Code 是一款出色的代码智能体，但它并未开源，使用门槛较高，且默认无法与其他模型协同工作。Neovate Code 借鉴了 Claude Code 在功能与配置上的优秀设计，并在此基础上进一步扩展 —— 支持主流模型与多家模型提供商。如果你既希望获得类似 Claude Code 的能力，又需要更开放、更灵活的选择，Neovate Code 将是理想的选择。

Neovate Code 易于扩展。它有一个内置的插件系统，有很多钩子。你可以快速创建你自己的代码智能体，使用你自己的模型、功能、工具和其他集成。蚂蚁集团和快手等公司已经在使用它来构建自己的代码智能体。

```
import type { Plugin } from '@neovate/code';
export default const plugin: Plugin = {
  name: 'my-plugin',
  context: () => {
    // 添加更多上下文
    return {
      'Who am I': 'chencheng',
    };
  },
}
```

Neovate Code 目前只有 CLI 客户端，但我们让架构足够灵活以支持多个客户端。因此很容易扩展以支持其他客户端，如 IDE 扩展、Web 应用、原生应用和 Remote Agent 等。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 不仅仅是 Neovate Code

Neovate Code 只是开始，Neovate 品牌将扩展为针对开发各个方面的专业 AI 工具：

- 智能调试和问题解决
- 代码质量分析和审查自动化
- 测试与自动化
- 更多工具即将推出...

敬请期待 Neovate 生态系统的其他产品！

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 参与 Neovate Code

我们诚挚邀请你参与到 Neovate Code 项目中，一起推动它的成长：

- 🎉 体验与支持：在你的项目中试用 Neovate Code，如果觉得有价值，欢迎在 GitHub 上点亮 ⭐️
- 🛠 开源贡献：直接提交 Issue 或 PR，共同完善功能与文档
- ⚡ 实践应用：将它集成到脚本、CI/CD 工作流或其他自动化工具中
- 🤖 个性化扩展：基于 Neovate Code 打造属于你自己的 Code Agent
- 💬 社区交流：扫码加入微信群或钉钉群，分享经验、反馈问题、探讨新想法

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 致谢

感谢行业内其他的 Code Agent 产品（如：Claude Code、OpenCode、Gemini CLI、Cursor 等），让我们从中学到了很多的经验，如果没有他们，Neovate Code 就不会存在。感谢这些项目的作者和维护者。

  

[Read more](https://mp.weixin.qq.com/s/)

修改于 2025年09月24日

继续滑动看下一个

支付宝体验科技

向上滑动看下一个