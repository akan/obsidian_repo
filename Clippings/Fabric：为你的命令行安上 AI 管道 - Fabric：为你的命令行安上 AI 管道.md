---
title: "Fabric：为你的命令行安上 AI 管道"
source: "https://juejin.cn/post/7522735096853086250"
author:
  - "[[云原生社区]]"
published: 2025-07-04
created: 2025-07-04
description: "作为开发者，我们对效率近乎偏执，而命令行无疑是效率的圣殿。我们已经习惯了用 grep、sed、awk 等工具像手术刀一样处理文本。但今天，有一个更强大的工具正等待我们将它纳入终端的工作流中——大型语言"
tags:
  - "命令行"
  - "AI 工具"
  - "效率提升"
abstract: "Fabric 是一个命令行 AI 工具框架，通过模式与管道的方式，让开发者将大型语言模型（LLM）能力无缝集成到终端工作流中。"
---
![横幅](https://p26-piu.byteimg.com/tos-cn-i-8jisjyls3a/8694dbc29caa4b59bda5f4181f3bd6ef~tplv-8jisjyls3a-2:0:0:q75.image) ![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/796c19f610c146ffac65db71d7329490~tplv-8jisjyls3a-2:0:0:q75.image)

> Fabric 是一个命令行 AI 工具框架，它通过“模式（Pattern）+ 管道”的方式，让你将 LLM 能力无缝集成到终端工作流中，本文详解安装、配置、核心概念与自定义模式实践。
> 
> 阅读原文请转到： [jimmysong.io/blog/fabric…](https://link.juejin.cn/?target=https%3A%2F%2Fjimmysong.io%2Fblog%2Ffabric-cli-ai-pipeline%2F "https://jimmysong.io/blog/fabric-cli-ai-pipeline/")

作为开发者，我们对效率近乎偏执，而命令行无疑是效率的圣殿。我们已经习惯了用 `grep` 、 `sed` 、 `awk` 等工具像手术刀一样处理文本。但今天，有一个更强大的工具正等待我们将它纳入终端的工作流中——大型语言模型（LLM）。

很多人已经习惯在浏览器中的 ChatGPT、Claude 或 Google AI Studio 与 LLM 交互。但这种方式始终存在割裂感：复制、粘贴、切换窗口……阻碍了 AI 成为我们日常自动化工作流程的自然一环。

**如果我们能像使用原生命令一样，在终端中直接调用最强大的 AI 模型，会发生什么？**

这正是知名技术专家 Daniel Miessler\[1\] 创建的开源项目 Fabric\[2\] 想要解决的问题。

Fabric 不是另一个 ChatGPT 包装器，而是一个精巧的命令行框架，它的目标是：“使用 AI 增强人类天赋”。它通过一种叫 Pattern 的机制，把高质量 AI 指令模板与你本地的工作流结合起来，让你可以在终端中完成从内容生成到代码审查的一系列复杂任务。

## Fabric 是什么？不仅仅是 API 封装

表面上看，Fabric 是一个连接 LLM API 的 Python CLI 工具，但其设计哲学远不止于此。它的核心是围绕“模式”（Pattern）构建的可复用 AI 工作流。

可以将 Pattern 理解为一个精心设计的指令模板（system prompt）。Fabric 内置了一些实用模式，例如：

- • `summarize`: 总结长文本内容
- • `code_review`: 对代码进行审查并提出优化建议
- • `seo`: 提供文本的 SEO 优化建议
- • `tldr`: 快速生成简洁摘要
- • `write_video_script`: 生成视频脚本草稿

最有价值的，是你可以自己创建或共享这些模式，把你独特的工作流方法固化成标准指令，供自己或团队反复调用。

## 快速上手：三步把 AI 融入终端

### 第 1 步：安装

通过 Homebrew 安装：

```
brew install fabric-ai
```

当然，你也可以用 `pip` 或源码安装，详见 项目主页\[3\]。

### 第 2 步：配置

执行：

```arduino
fabric --setup
```

这是一个交互式配置向导，会引导你完成以下内容：

- • 选择 AI Provider：如 `openai`, `google`, `claude` 等
- • 选择模型：例如 `gpt-4o`, `gemini-2.5-pro` 等
- • 设置 API Key：手动输入或通过环境变量配置

强烈推荐使用 Google AI Studio\[4\] 提供的免费 API Key。撰写本文时，Gemini 1.5 Flash 免费版提供每分钟 15 次调用、每天 100 万 token 的额度，不仅可用于网页，还可用于 Fabric 与 Gemini CLI。

![Gemini CLI](https://assets.jimmysong.io/images/blog/fabric-cli-ai-pipeline/gemini.webp "null")

Gemini CLI

所有配置默认保存在 Linux 或 macOS 的 `~/.config/fabric/` 目录下。

### 第 3 步：运行你的第一个命令

以总结为例：

```arduino
fabric -p summarize --text "这里是一段非常非常长的文章内容..."
```

你将获得一段简洁清晰的摘要。而这只是起点，真正强大的是 Fabric 对“管道”的原生支持。

## 核心架构解析

Fabric 的关键组成如下：

- • **Pattern（模式）** ：灵魂所在。一个 `.md` 文件定义 AI 的角色、目标、输出格式等。所有内置命令本质上都是不同的 Pattern。
- • **Provider（提供商）** ：底层的 LLM API，比如 OpenAI、Gemini、Claude。
- • **Model（模型）** ：在 setup 阶段选择的具体模型，如 `gpt-4o` 、 `gemini-2.5-pro` 等。
- • **fabric CLI** ：命令行接口，支持读取输入（文件、管道、 `--text` ）、加载 Pattern 并提交请求。
- • **suggest** ：让 AI 来优化 Pattern 本身，实现“AI 改进 AI Prompt”的元编程体验。

例如：

```
fabric -p summarize --suggest "Make the summary more concise and use bullet points."
```

## 杀手级特性：让 AI 真正成为你命令行的管道组件

### 1\. 与管道工具无缝集成

Fabric 遵循 Unix 哲学，支持标准输入 / 输出流，能与任意命令组合使用：

```bash
cat long_article.txt | fabric -p summarize
cat my_script.py | fabric -p code_review
lynx -dump "https://some-website.com" | fabric -p tldr
```

这才是真正将 AI 变成 CLI 工作流一部分的关键。

### 2\. 自定义模式：把你的方法论变成工具

#### 问题：默认 Pattern 用英文 prompt，处理中文不理想

#### 解决：创建属于你的中文模式

**① 找到模式目录：**

运行 `fabric --list` 查看模式列表，路径通常是：

- • 系统级目录： `site-packages/fabric/patterns/`
- • 用户配置目录： `~/.config/fabric/patterns/`

**② 创建中文模式：**

```javascript
vim ~/.config/fabric/patterns/summarize_chinese.md
```

**③ 编写 Prompt：**

```rust
你是一个非常优秀的中文内容总结助手。请使用简洁、流畅的中文，为以下提供的文本内容生成一份核心要点摘要，并以无序列表（bullet points）的形式呈现。

请总结以下文本：
```

**④ 使用自定义模式：**

```bash
cat blog.md | fabric -p summarize_chinese
```

就这样，你将自己的知识转化成了一个随时可用、可复用的 CLI 工具。

![在命令行中使用 Fabric](https://assets.jimmysong.io/images/blog/fabric-cli-ai-pipeline/fabric.webp "null")

在命令行中使用 Fabric

## Fabric CLI 速查表

| 命令 | 作用 | 示例 |
| --- | --- | --- |
| `fabric --setup` | 启动配置向导 | `fabric --setup` |
| `-p <pattern>` | 使用某个 Pattern | `fabric -p summarize` |
| `--text "..."` | 直接传入文本 | `fabric -p tldr --text "..."` |
| `--stream` | 流式输出 | `fabric -p write_blog_post --stream` |
| `--list` | 查看所有模式 | `fabric --list` |
| `--edit` | 编辑某个模式 | `fabric -p summarize --edit` |
| `--suggest "..."` | 改进模式 Prompt | `fabric -p code_review --suggest "Focus on security."` |
| `--model <name>` | 临时指定模型 | `fabric -p summarize --model gpt-4o` |
| `--copy` | 将结果复制到剪贴板 | `fabric -p summarize --copy` |

## 总结：AI 管道化，不只是工具，而是一种思维方式

Fabric 实现了它“增强人类天赋”的承诺。它不是另一个 AI 聊天工具，而是一种让你将 LLM 变成标准化流程节点的方式。  
它推动我们从“和 AI 聊天”转向“指挥 AI 工作”。

你写一个 Pattern，就是在定义一个微型自动化系统。你把这些系统串成管道，AI 就成了你操作系统的一部分。

如果你是开发者、写作者、研究员，或任何与信息密集打交道的人，试着把 Fabric 接入你已有的命令行工具链，它可能会成为你效率系统中的下一个关键组件。

👉 项目地址： [github.com/danielmiess…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fdanielmiessler%2FFabric "https://github.com/danielmiessler/Fabric")

---

**本文首发于：** [jimmysong.io/blog/fabric…](https://link.juejin.cn/?target=https%3A%2F%2Fjimmysong.io%2Fblog%2Ffabric-cli-ai-pipeline%2F "https://jimmysong.io/blog/fabric-cli-ai-pipeline/")

#### 引用链接

`[1]` Daniel Miessler: *[github.com/danielmiess…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fdanielmiessler "https://github.com/danielmiessler")*  
`[2]` Fabric: *[github.com/danielmiess…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fdanielmiessler%2FFabric "https://github.com/danielmiessler/Fabric")*  
`[3]` 项目主页: *[github.com/danielmiess…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fdanielmiessler%2FFabric "https://github.com/danielmiessler/Fabric")*  
`[4]` Google AI Studio: *[aistudio.google.com/app/apikey](https://link.juejin.cn/?target=https%3A%2F%2Faistudio.google.com%2Fapp%2Fapikey "https://aistudio.google.com/app/apikey")*

评论 0

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏