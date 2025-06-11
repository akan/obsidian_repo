---
title: "Claude Code 太贵用不起？我把它连上了 DeepSeek，效果惊人！"
source: "https://mp.weixin.qq.com/s/YnI04sD38QUcvLes1PRb4A?version=4.1.36.91041&platform=mac"
author:
  - "[[智见君]]"
published:
created: 2025-06-11
description: "大家好，我是智见君。今天我们聊一个 AI编程工具。它就是 Claude Code。这个工具非常强大。"
tags:
  - "clippings"
---
Original 智见君 [AI智见录](https://mp.weixin.qq.com/s/)

*2025年06月10日 20:24* *河南*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/wnIMIiaEIIrhS1kIy1oEBz0DicBCzBJATpmUPKDmjP62hHOf5Bxribp0damQh5QZo8icLTibTBK1P6D1W3fCc6EWBMA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

大家好，我是智见君。

今天我们聊一个 AI编程工具。它就是 Claude Code。这个工具非常强大。但是它也有一个问题。那就是使用成本很高。很多人也用不了。

这篇文章会给你一个解决方案。我们可以把 Claude Code 连接到 DeepSeek 或其它 OpenAI 兼容的模型。这样就能大大降低成本。

## 什么是 Claude Code？

Claude Code 是一个 AI 编程工具。它由 Anthropic 公司开发。这家公司就是开发 Claude 大模型的公司。

这个工具很强大。Anthropic 内部的工程师每天都在用它。它有几个很棒的特点。

首先，Claude Code 能理解大型代码库。你可以让它理解一个有百万行代码的项目。它能快速搞清楚项目的结构和依赖。

其次，它能直接在你的电脑上工作。它就在你的命令行里。你不需要切换到别的软件。它可以直接帮你修改代码文件。它也可以帮你运行测试命令。

最后，它非常智能。它背后是强大的 Claude 4 Opus 模型。这让它能够处理复杂的编程任务。比如代码重构或者添加新功能。

## 使用 Claude Code 的痛点

Claude Code 听起来很完美。但是对国内很多开发者来说，它有几个大问题。

第一个问题是价格。使用 Claude Code 需要订阅 Claude Pro 或者 Max 套餐。Pro 套餐每月 20 美元。Max 套餐更贵。这个价格劝退了很多人。

第二个问题是可用性。Anthropic 的服务没有对国内开放。注册账号很困难。而且官方会经常封禁来自不支持地区的账号。

## claude-bridge：社区的解决方案

社区里总有大神。`claude-trace` 的开发者 Mario Zechner (`@badlogicgames`) 带来了一个新工具。这个工具叫做 `claude-bridge`。

`claude-bridge` 是一个本地代理服务。它的作用很简单。它会拦截 Claude Code 发送给官方服务器的请求。然后它把这个请求转换一下。最后它把请求发送给你自己指定的另一个大模型 API。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

简单说，它就像一个翻译和中间人。它让 Claude Code 以为自己还在和官方模型对话。但实际上，回答问题、生成代码的模型已经换成了我们自己的。比如 Google 的 Gemini，或者 OpenAI 的 GPT 模型。

当然，它也支持任何和 OpenAI API 格式兼容的模型。这就给了我们使用 DeepSeek 的机会。DeepSeek 是一个国产的优秀大模型。它的 API 价格非常便宜。

`claude-bridge` 的项目地址在这里：https://github.com/badlogic/lemmy/tree/main/apps/claude-bridge

## 实战：三步将 Claude Code 接入 DeepSeek

现在我们进入正题。我们来看如何把 Claude Code 和 DeepSeek 连接起来。整个过程非常简单。

### 第一步：安装 Claude Code

首先，你的电脑需要安装 Node.js (版本 18 以上)。

然后，你可以在命令行里运行下面的命令。这个命令会全局安装 Claude Code。

```
npm install -g @anthropic-ai/claude-code
```

安装完成后，你可以通过 `claude` 命令来使用它。但现在我们不能直接使用 `claude` 命令，用以下命令来代替。

### 第二步：安装和配置 claude-bridge

接下来，我们要安装 `claude-bridge`，直接使用命令 `npm install -g @mariozechner/claude-bridge` 即可。

配置是关键的一步。`claude-bridge` 通过环境变量来读取配置。我们在这里把它指向 DeepSeek 的 API。

填入你自己的 DeepSeek API Key

```
export OPENAI_API_KEY=sk-0xxxxxxxxxxxxxxxxxxxxxx
```

然后在终端输入以下命令启动代理服务：

```
claude-bridge openai deepseek-chat --baseURL https://api.deepseek.com/v1
```

看到如下输出，表示代理服务已经启动成功：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 第三步：开始使用

现在所有准备工作都完成了，我们可以开始使用 Claude Code 了。

先做个简单测试，询问"介绍下，你是什么大模型"：

有趣的是，回答结果还存在"幻觉"现象（实际上现在使用的就是 DeepSeek V3 模型）：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

接下来测试实际编程功能，比如让它"帮我写一个 Node.js 的 Hello World Web 服务，直接保存到当前项目根目录下"：

```
claude-bridge openai deepseek-chat --baseURL https://api.deepseek.com/v1
```

Claude Code（实际上是背后的 DeepSeek 模型）会开始分析需求，然后告诉你它准备创建一个 `server.js` 文件，并提供具体的代码内容。你只需要回答 `yes`，它就会自动帮你创建文件。

最终生成效果如下（不可思议，它真的成功了！）：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 总结

通过 `claude-bridge` 这个巧妙的工具，我们成功地将昂贵的 Claude Code 和亲民的 DeepSeek 连接了起来。

这个方案有几个明显的优势：

1. 1. **成本优势**：大幅降低使用成本，让更多开发者能够体验 AI 编程工具
2. 2. **可用性提升**：绕开网络限制和账号问题，使用更稳定
3. 3. **灵活性强**：不仅可以连接 DeepSeek，任何兼容 OpenAI 接口的模型都可以

当然，我们也要保持理性认知：外接模型的能力确实无法完全达到 Claude Code 原生 Claude 4 Opus 的水平。如果你追求最佳的原生体验，官方的 Claude Code 仍然是首选。

但对于预算有限或者无法使用官方服务的开发者来说，这个方案提供了一个非常不错的替代选择。感兴趣的朋友不妨试试，相信会给你带来不一样的 AI 编程体验！

## 热文推荐
- [我的第一本 Cursor 小册上线了！](https://mp.weixin.qq.com/s?__biz=MzU3NTg5MjU1Mw==&mid=2247491253&idx=1&sn=a6d032696f327b0ca90fc274d0350f7c&scene=21#wechat_redirect)
- [Cursor首席设计师警告：不想写出烂代码？这12条黄金法则必须掌握！](https://mp.weixin.qq.com/s?__biz=MzU3NTg5MjU1Mw==&mid=2247491296&idx=1&sn=3a42a6666422d0d459cd8f77349cb698&scene=21#wechat_redirect)
- [超越Manus！首个AI办公智能体来了，效率提升99%！](https://mp.weixin.qq.com/s?__biz=MzU3NTg5MjU1Mw==&mid=2247491713&idx=1&sn=8c6eec59574061f3f8687c505c61f606&scene=21#wechat_redirect)
- [微软深夜宣布VSCode Copilot彻底开源，剑指 Cursor！](https://mp.weixin.qq.com/s?__biz=MzU3NTg5MjU1Mw==&mid=2247491690&idx=1&sn=b861d442f476be8b1eeb54761a226247&scene=21#wechat_redirect)
- [Claude4在Cursor/ClaudeAI/Trae一手实测：编程、数据分析、UI原型等](https://mp.weixin.qq.com/s?__biz=MzU3NTg5MjU1Mw==&mid=2247491939&idx=1&sn=d1d19badc81851d8d8a15f0041b2596d&scene=21#wechat_redirect)