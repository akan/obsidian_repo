---
title: "Claude Code与Gemini放弃代码索引，是一步烂棋"
source: "https://mp.weixin.qq.com/s/C1h6QveDrX_-yDxwI1CNUA"
author:
  - "[[张晨]]"
published:
created: 2025-08-21
description: "开源神器推荐|Claude Context让 Claude Code 代码检索效率提升40%"
tags:
  - "代码检索"
  - "向量数据库"
  - "AI IDE"
abstract: "本文介绍了Claude Context开源工具如何通过向量检索提升Claude Code的代码检索效率并减少Token消耗。"
---
Original 张晨 *2025年08月20日 18:05*

![图片](https://mmbiz.qpic.cn/mmbiz_png/MqgA8Ylgeh4ek0GU1Snpd5xyiahZAUvz7OBtgIlbTu6EPpyEfG6V2kESjkXKK3fSHP6voC8hyCcn0RXhCkB2dicg/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp) ![Image](https://mmbiz.qpic.cn/mmbiz_png/MqgA8Ylgeh6J7ayarGHb1KhULWZRhmwYKe0u7tL6iaSqh6fvbEGicfueDITZxuv635QRLtB9KbDiaEra17nhbb9cA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

最近，围绕AI IDE到底要不要用RAG做代码检索，行业已经吵翻了。

起因是，一个Claude Code的工程师，在Hacker News上答疑时表示，Claude Code不用建立索引，代码检索仅靠grep文本搜索就能搞定。

![Image](https://mmbiz.qpic.cn/mmbiz_png/MqgA8Ylgeh6J7ayarGHb1KhULWZRhmwYrxkBr5MrohFbHkuw0kzojcanicfXLMWoCxRMLmcsnJib9w7XmOKpar5A/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

帖子一出，行业立刻分成两派：

支持者认为，编程需要高度精准的操作，而embedding在代码检索方面的表现并不够精准，难以满足开发人员对精确性的要求。

反对者则表示，传统的grep方案不仅召回率低，还会检索出大量不相关的内容，整个过程不仅效率低下，还极其耗时费力。

那么到底谁对谁错？

**先说结论，经过测试发现，为** **AI** **IDE** **增加向量检索模块后，不仅检索效率大有提升，并且能至少节省40%的Token消耗。**

那么传统的grep方案到底有什么问题？如何为AI IDE增加向量检索模块？效果又究竟如何？

本文将对此一一解答。

## 01

## 传统grep方案的问题是什么？

故事从我让 Claude Code帮找 bug 开始...结果，它反复使用 grep + read file tools，猜测可能的关键字，不断查找读取大量文件。1 分钟后，收获依然为0。

![Image](https://mmbiz.qpic.cn/mmbiz_png/MqgA8Ylgeh6J7ayarGHb1KhULWZRhmwY35cicCv7ic7MhWf1pmiaHGb9PdibceL0LrS5RW44JibalIXaMLoByU9qGZw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

然后，通过一些提示和补充来指导帮助，Claude Code经过了整整 5 分钟，才终于定位到了问题文件。

但是问题是，它读取的文件中，只有 10 行代码是和这个 issue 相关的，其他 99% 的代码都是无关的。在这个反复对话和读取大量无关代码的过程中，Token 浪费不说，还浪费了大量宝贵的时间。

当然，遇到类似问题的，不止我一个，可以看到，有不少人都给 Claude Code 也提出过类似的 issue，比如

issue1：  

https://github.com/anthropics/claude-code/issues/1315  

issue2：  

https://github.com/anthropics/claude-code/issues/4556

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

总结来说，围绕Claude Code 的纯 grep方案，大家的吐槽火力集中在三点：

- **第一个痛点：** **token消耗高**
	每次查询都要传输大量无关代码到 LLM。Token 消耗巨大，成本直线上升。
- **第二个痛点：时间成本** **大**
	AI 需要反复试探和搜索，用户等待时间过长。开发效率大大降低。
- **第三个痛点：关键词搜索** **无法做上下文语义感知**
	传统 grep 只能匹配字面意思，无法理解代码的语义关系和上下文含义。就像在大海里捞针，全靠运气。

## 02

## Claude Code VS Cursor,后者赢在哪儿了？

围绕代码检索问题，各类AI IDE产品中，解决的比较好的，其实是Cursor。而它的解决方案Cursor 创始人很早就在论坛里就透露过——「Codebase Indexing」。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

总结来说，就是：把代码库切分成小块，发送给服务器，用 embedding 模型来嵌入代码。这就是标准的代码 RAG 方案。

但问题来了，为什么 Claude Code、 Gemini、Cline这几个AI IDE 没有采用这个方案呢？

一方面是技术路线的选择问题，另一方面，要搞好代码检索，里面有大量工程细节需要处理：

- 代码如何切分？
- 代码变动了怎么办？
- 索引和检索速度怎么保证？
- 怎么为海量的代码的 embedding 建立索引？

显然，这些都与 Claude Code 【简单】【无界面的 CLI】的定位相违背。更关键的是，embedding 模型和向量数据库也不是 Anthropic 的强项。

## 03

## 手搓Claude Context，给 Claude Code 加buff

既然 Claude Code 有短板，Cursor 又闭源付费，所以，我决定，干脆自己搞一个“ **Claude Context”**

https://github.com/zilliztech/claude-context

这是一个集成了向量数据库和 embedding 模型的开源代码检索 MCP 工具，可以无缝集成到 Claude Code 中，同时也兼容其他 AI Coding IDE，让 LLM 获得更优质、更准确的上下文信息。

以下是方案实现全过程

### 3.1技术选型

**🔌 接口层面：MCP 是首选**

MCP 就像是 LLM 与外界交互的USB，可以把产品能力以 MCP server 的方式提供出来，这样不仅是 Claude Code，甚至其他 AI IDE 比如 Gemini CLI、Qwen Code 等都能用。

**💾 向量数据库：选择 Zilliz Cloud**

Zilliz Cloud 是全托管的 Milvus 向量数据库服务，具备高性能向量搜索、高 QPS 与低延时、云原生架构带来的弹性扩展和无限存储等特性，还有多副本增强可用性，简直是为 Codebase Indexing 量身定制的。

**🧠 Embedding 模型：多种选择**

- OpenAI 的 embedding model：经过广泛使用和验证，稳定可靠
- Voyage embedding：在 Code 领域有专用模型，效果更好
- Ollama：适合本地部署，隐私性更强
- 更多 embedding 模型，后期补充支持

**⌨️ 编程语言：TypeScript**

在 Python 和 TypeScript 之间纠结了一下，最终选择 TypeScript。原因很简单：它更兼容应用层，开发的模块可以无缝集成到高层的 TypeScript 应用中，比如 VSCode 插件等。而且 Claude Code、Gemini CLI 等也都是用 TypeScript 写的，生态更友好。

### 3.2架构设计

从解耦、分层的设计原则角度来看，它的架构被设计成了两层：

- 核心模块：包含所有核心逻辑，里面每块的逻辑也是分开设计的，比如代码解析、向量化索引、语义检索、同步更新等。
- 上层模块：包含 MCP、vscode 插件等集成。它基于核心模块，更多是包含一些应用层的逻辑，尤其是 MCP，它是与 Claude Code 等 AI IDE 交互的最佳方式。

这样设计的好处是，核心模块可以被上层模块复用，后续不管是横向还是纵向，都很容易扩展其他模块。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 3.3核心模块

核心模块是地基，地基打好了才能盖好房子。核心模块其实就是要把向量数据库、embedding model 等抽象成一些模块，它可以组成一个 Context 对象，这样我就可以在不同的场景下使用不同的向量数据库和 embedding model。

```
import { Context, MilvusVectorDatabase, OpenAIEmbedding } from '@zilliz/claude-context-core';// Initialize embedding providerconst embedding = new OpenAIEmbedding(...);// Initialize vector databaseconst vectorDatabase = new MilvusVectorDatabase(...);// Create context instanceconst context = new Context({embedding, vectorDatabase});// Index your codebase with progress trackingconst stats = await context.indexCodebase('./your-project');// Perform semantic searchconst results = await context.semanticSearch('./your-project', 'vector database operations');
```

## 04

## 开发过程中的几个棘手问题

## 问题一：代码怎么切？

代码切分这个问题，不能简单粗暴地按行切分或者按字符切分。那样切出来的代码块，要么逻辑不完整，要么上下文丢失。

为此，我设计了两套互补的切分策略：

### （1）AST 抽象语法树切分（主策略）🌳

这是默认和推荐策略。通过 tree-sitter 解析器，理解代码的语法结构，按照语义单元进行切分。

AST 切分的好处显而易见：

- **语法完整性** ：每个 chunk 都是完整的语法单元，不会出现函数被切成两半的尴尬情况
- **逻辑连贯性** ：相关的代码逻辑会保持在同一个 chunk 中，AI 搜索时能找到更准确的上下文
- **多语言支持** ：针对不同编程语言使用不同的 tree-sitter parser，无论是 JavaScript 的函数声明、Python 的类定义、Java 的方法，还是 Go 的函数定义，都能被准确识别和切分
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### （2）LangChain 文本切分（兜底策略）🛡️

对于 AST 无法处理的语言或者解析失败的情况，可以用 LangChain 的 RecursiveCharacterTextSplitter 作为备用方案。

```
// 使用递归字符切分，保持代码结构const splitter = RecursiveCharacterTextSplitter.fromLanguage(language, {    chunkSize: 1000,    chunkOverlap: 200,});
```

这种策略虽然没有 AST 那么智能，基本就是按照字符数量进行切分，但胜在稳定可靠。任何代码都能被正确切分，不会让你抓瞎。

这样的双重保险设计，既保证了代码的语义完整性，又兼顾了不同场景的需求。稳！

## 问题二：代码变动怎么办？

代码变动处理一直是代码索引系统的核心挑战。想象一下，如果每次文件有微小改动就要重新索引整个项目，那简直是灾难。

针对这个问题，我设计了一套基于 Merkle Tree 的同步机制来解决这个问题。

### （1）Merkle Tree：变化感知的核心

Merkle Tree 就像一个层层递进的"指纹"系统：

- 每个文件都有自己的哈希指纹
- 文件夹有基于其内容文件的指纹
- 最终汇聚成整个代码库的唯一根节点指纹
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

只要文件内容有变动，其上层的哈希指纹就会层层变化，直到根节点。

这样，不用重新索引整个项目，就可以从根节点往下，逐层对比哈希指纹的变化，快速感知和定位文件的变动。

### （2）变化检测和同步⚡

默认 5 分钟进行握手同步检测一次，同步机制简洁高效，分为三个阶段：

**🏃♂️ 第一阶段：快速检测**

计算整个代码库的 Merkle 根哈希，和上次保存的快照对比。如果根哈希一样？恭喜，什么都没变，直接跳过！几毫秒搞定。

**🔍 第二阶段：精确对比**

如果根哈希不一样，那就进入精确对比模式。做文件级别的详细对比，找出到底哪些文件发生了变化：

- 新增的文件
- 删除的文件
- 修改的文件

**🔄 第三阶段：增量更新**

只对变化的文件重新计算向量，然后更新到向量数据库中。省时省力！

### （3）本地快照管理

所有的同步状态都保存在用户本地的 `~/.context/merkle/` 目录中。每个代码库都有自己独立的快照文件，里面包含了文件哈希表和 Merkle 树的序列化数据。这样即使程序重启了，也能准确恢复之前的同步状态。

整套设计带来的好处真的很明显。大部分情况下几毫秒就能确定没有变化，只有真正变化的文件才会被重新处理，避免了大量无效计算。而且即使你关掉程序重新打开，状态也能完美恢复。

用户体验上，这意味着当你修改了一个函数后，系统只会重新索引这个文件，而不是整个项目，大大提升了开发效率。

## 问题三：MCP 模块怎么设计

### 如何设计 tool？🛠️

MCP 模块是门面，直接面向用户。在这个模块里，用户体验是第一位的。

首先考虑 tool 设计。把常见的 codebase indexing/search 等行为抽象出来，很容易想到两个核心 tool：

- `index_codebase` \- 索引代码库
- `search_code` \- 搜索代码

搞定核心 tool之后，我们面临的下一个问题是，还需要其他 tool 吗？

因为，tool 既不能太多（会包含很多长尾 tool，给 MCP client 带来负担，影响 LLM 的选择判断），也不能太少（可能遗漏必要功能）。

不妨从使用场景倒推这个问题。

**🤔 后台运行的挑战**

有些大 codebase 的 indexing 时间很长，最朴素的版本是：同步等待 indexing 完成。但用户一等就是好几分钟，这显然不合理，谁都受不了。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

所以需要支持异步后台运行，但 MCP 并不支持异步后台运行，怎么办？

解决方案是：在 MCP server 里使用一个后台进程来处理 indexing，这样 MCP server 可以立即返回给用户 indexing 的开始消息，用户可以继续做其他事情。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

但这样设计又带来新问题：用户怎么知道 indexing 进度？

这个很好解决，用一个 tool 来查询 indexing 的进度或状态。后台 indexing 进程异步地将进度暂存下来，用户随时可以查询：进行到 50% 了吗？成功完成了吗？还是失败了？

另外还需要一个手动清空 index 的 tool。当用户觉得 indexed 的 codebase 不准确，或者需要重新 indexing 时，可以手动清空重来。

**最终的 tool 设计：**

- `index_codebase` \- 索引代码库
- `search_code` \- 搜索代码
- `get_indexing_status` \- 查询索引状态
- `clear_index` \- 清空索引

四个 tool，简洁够用！

### 如何管理环境变量？⚙️

环境变量管理，这是个容易被忽视但很重要的用户体验问题。

如果每个 MCP Client 都要配置一遍 API 密钥，那么用户要在 Claude Code 和 Gemini CLI 中来回切换使用，配置两遍？

针对这个问题，全局配置方案可以搞定。解决方案也很简单：在用户主目录下创建 `~/.context/.env` 文件作为全局配置：

```
# ~/.context/.envOPENAI_API_KEY=your-api-key-hereMILVUS_TOKEN=your-milvus-token
```

**这样做的好处很明显：**

- 只需要配置一次，就能在所有 MCP 客户端中使用
- 所有配置集中在一个地方，维护方便
- 敏感的 API 密钥不会散落在各个配置文件中

再设计一个三层优先级机制：

1. **最高优先级** ：进程环境变量
2. **中等优先级** ：全局配置文件
3. **最低优先级** ：默认值

这种设计非常灵活：

- 开发者临时测试时，可以用环境变量覆盖配置
- 生产环境下，可以通过系统环境变量注入敏感配置，保证安全性

用户配置一次就能在 Claude Code、Gemini CLI 等多个工具中无缝使用，上手门槛大大降低！

至此，我们已经完成了 MCP 服务器的核心架构设计：从代码解析、向量化存储，到智能检索、配置管理，每个环节都经过精心设计和优化。整个系统不仅功能强大，而且易于使用和维护。

## 05

## 效果展示

那么，这套方案在实际使用中表现如何呢？实测看看就知道了：

安装使用超级简单，只需要在 Claude Code 运行前，执行一行命令：

```
claude mcp add claude-context -e OPENAI_API_KEY=your-openai-api-key -e MILVUS_TOKEN=your-zilliz-cloud-api-key -- npx @zilliz/claude-context-mcp@latest
```

这里的测试场景，还是选择让它找之前的那个代码中的 bug。先 index 当前的 codebase，然后要求它定位这个指定描述的 bug。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以看到，通过 claude-context MCP tool 的调用，它成功找到了代码中指定 bug 的文件和行号，并且给出了详细的解释。

当然，不只是能做bug检索，只要配上了这个 claude-context MCP，Claude Code 在很多场景下都能触发调用它，获得更优质、更准确的上下文信息，比如 Issue 修复、代码重构 、重复代码检测、代码测试，等等。

另外，很多朋友想要看看 benchmark 定量测评，测一下 claude-context 能给AI IDE带来多少定量提升。

目前我已经做了一些相关的测试和实验，可以看到，在同等召回率的情况下，使用 claude-context，与不使用它的效果相比，可以大幅减少 40% 以上的 Token 消耗。

这同时也意味着 40% 以上的时间，和金钱的节省。

换句话说，在同等有限的 Token 消耗的条件下，使用 claude-context MCP 后，可以获得更好的检索效果。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

更多测试细节后续将会在 github 仓库中更新。

目前 claude-context 已经开源，我们还将其发布到了 npm registry 上，并在GitHub上获得了2.6K star。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

大家可以在这里亲手实测一下，也欢迎大家给出更多的建议与反馈。

https://github.com/zilliztech/claude-context

https://www.npmjs.com/package/@zilliz/claude-context-mcp

## 后记

这个项目从一个简单的想法开始，到最终实现一个完整的代码检索解决方案，整个过程充满挑战但也收获颇丰。通过 MCP 架构和 Zilliz Cloud 的向量数据库，巧妙解决了 Claude Code 中代码检索的痛点难题。

未来，我们计划继续优化检索算法，支持更多编程语言，持续改善用户体验。同时欢迎大家一起使用、测试并提供反馈，也期待更多开发者贡献代码，让 claude-context 变得更加稳定和强大！

**作者介绍**

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

张晨

Zilliz Algorithm Engineer

  

  

推荐阅读

[Manus、LangChain一手经验:先别给Multi Agent判死刑,是你不会管理上下文](https://mp.weixin.qq.com/s?__biz=MzUzMDI5OTA5NQ==&mid=2247509923&idx=1&sn=4701e4c77e20b82489ba4628cc6b9e1f&scene=21#wechat_redirect)

[Word2Vec、 BERT、BGE-M3、LLM2Vec，embedding模型选型指南｜最全](https://mp.weixin.qq.com/s?__biz=MzUzMDI5OTA5NQ==&mid=2247510057&idx=1&sn=58fdfef27956475e9eb974e3bd822859&scene=21#wechat_redirect)

[LLM、RAG、workflow、Agent，大模型落地该选哪个？一个决策矩阵讲透](https://mp.weixin.qq.com/s?__biz=MzUzMDI5OTA5NQ==&mid=2247510010&idx=1&sn=55f15daab9e2eb4de4f274a9fe0d8abe&scene=21#wechat_redirect)

[n8n部署RAG太麻烦？MCP+自然语言搞定n8n workflow 的时代来了！](https://mp.weixin.qq.com/s?__biz=MzUzMDI5OTA5NQ==&mid=2247510045&idx=1&sn=2e6a7faf45640fd1afeef100bb680089&scene=21#wechat_redirect)

  

  

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

[Read more](https://mp.weixin.qq.com/s/)

继续滑动看下一个

Zilliz

向上滑动看下一个