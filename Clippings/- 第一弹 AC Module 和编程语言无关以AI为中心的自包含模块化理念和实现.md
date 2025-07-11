---
title: "第一弹 AC Module: 和编程语言无关以AI为中心的自包含模块化理念和实现"
source: "https://mp.weixin.qq.com/s/5NJ5h03DWR5tm7ZhDxI7mQ"
author:
  - "[[祝威廉]]"
published:
created: 2025-07-11
description: "背景和问题说起模块/包，几乎是大部分语言都有的概念，因为一个项目会很庞大，如果单纯只用文件做隔离，文件可能几千"
tags:
  - "AI模块化"
  - "自包含文档"
  - "语言无关"
abstract: "文章介绍了AC模块的概念，这是一种以AI为中心的模块化组织方式，旨在让AI更好地理解和维护代码模块。"
---
Original 祝威廉 *2025年06月28日 10:41*

背景和问题

说起模块/包，几乎是大部分语言都有的概念，因为一个项目会很庞大，如果单纯只用文件做隔离，文件可能几千上万个，所以需要在项目和文件之间获得一个平衡，这个时候就有包和模块的概念。比如python 你把一个目录放一个\_\_init\_\_.py 文件，就是一个包。这里我们不区分模块和包，我们都把他们当做一个虚拟的文件租概念来理解。

当等大语言模型开始深度参与软件开发时，我们发现了一个有趣的现象： \*\*传统的模块代码组织方式并不适合AI理解和处理\*\* 。

想象一下这样的场景：你向AI助手描述一个需求，希望它帮你实现一个功能。

但是面对一个庞大的项目，AI 往往有点望洋兴叹，他会尝试查看目录，通过关键字检索一些关键代码，亦或者找几个名字可能有点像他要寻找的代码看看。大部分情况，大模型实际上依赖于你有良好的目录结构命名以及碰点运气。

所以在传统的开发模式下，对AI而言最大的挑战是：他很难看到你项目的全貌，这包括模块的作用，以及模块之间的依赖。而在我们实际的项目迭代中，你的每个需求大概率是要AI能够理解并且找到合适的已有模块去作为依赖，并且复用他们的功能从而实现新的需求。

你或许说，那我给每个模块写个文档，大模型不就知道了么，这个问题其实由来已久，只要是人类在维护文档，这就意味着文档很快就会和代码更新脱节，维护文档实在是个庞大的工作，这就导致现存的大量项目能有一个项目文档就算不错了，很难说在代码中有对模块的每个文档。  

那能不能用AI来给每个模块写文档？答案是只能部分。如果模块较大，超出大模型窗口，大模型就难以准确的写出文档。此外 作为人类智慧的延伸，以及和人类沟通的必要，大模型也\*\*更擅长看文档而不是看代码。 如果模块过于庞大且复杂，这很容易超出大模型的能力范畴。

所以传统的模块其实并不适合 AI 理解和维护：

1\. 模块的设计是按人类的喜好，可能是按功能，可能是按其他的维度，较大的模块导致大模型无法将整个模块放进窗口，从而很难真正的理解这个模块。

2\. 模块可能非常多，不可能每次都去加载每个模块的所有源码区理解模块的使用方式。

当前限制大模型的软件开发能力根源是无法对项目有很好的理解，而不是写代码的能力。我们相信，当前大模型写代码的能力已经足够好。但是每次大模型看到一个项目，对他来说都是全新的，他每次都需要探查这个项目。所以带来了加大的困惑。

AC模块概念

  

为了解决在AI时代，项目结构组织的难题，我们提出了 AC模块的概念。

AC Module（Auto Coder Module）是一种全新的 以AI为中心的 模块化组织方式，专为AI时代设计。

  

AC 模块的实现很简单，当一个源码文件夹包含了.ac.mod.md 文件，则表示这是一个 AC 模块。

  

  

它的核心理念可以概括为：

  

1\. 以AI为中心的设计思想

  

传统模块化主要考虑人类开发者的需求，而AC模块首先考虑的是： \*\*如何让AI更好地理解和使用这个模块？\*\*

  

\- 每个模块都有完整自描述文档.ac.mod.md

\- 模块需要有一组外部可访问的API

\- 使用AI友好的Markdown格式

\- 严格控制Token数量，确保所有源码在模型窗口内（通常200ktoken以内）

\-.ac.mod.md 是可以让大模型自己维护的更新而无需人工来完成。

  

2\. 语言无关的模块定义

  

AC模块不依赖特定的编程语言或框架：

  

\`\`\`

一个AC模块 = 功能源码+ AC文档

\`\`\`

  

无论是Python、JavaScript、Go还是Rust，AC模块的组织方式都是一致的。 其中

  

3..ac.mod.md

  

每个AC模块都是一个 \*\*自包含的知识单元\*\* ，其.ac.mod.md 包含了如下内容：

  

  

\- 模块概要

\- 模块目录结构

  

\- 对外API使用示例

\- 内部核心组件/类描述以及mermaid关系图

\- AC模块依赖关系（是否依赖其他AC模块）

\- 测试和验证方法（特别重要）

  

  

⭐ AC模块的关键特性：Token限制约束下的精简设计实现了完全AI托管

  

这是AC模块最重要的约束条件。每个模块的总Token数必须小于大模型的上下文窗口，这可以让大模型完整的实现自动化。当一个需求来临后：

  

1\. 先阅读本模块.ac.mod.md ，对模块有完整了解，根据需求决定是否阅读依赖模块的.ac.mod.md

2\. 修改模块后，会自动根据.ac.mod.md 提到的测试和验证方法执行对应的测试集命令，并且根据命令自动修复修改改出的问题。

3\. 通过测试验证后，自动更新.ac.mod.md

  

最终可以实现AI完全自主维护一个模块，人类最多只需要干预测试和验证集。

  

  

老项目如何实现AC模块化改造

  

在最新版的 auto-coder (1.0.0) 版本中，我们会内置了AC模块的支持。你可以很方便的在 CLI（交互式非交互式），Python API, Web 版产品中体验到。在执行 atuo-coder.chat 后，进入交互式命令行窗口，这个时候你可以这么做：

  

```bash
/auto 把 @src/a/b/c 里的功能拆分成两个 AC 模块，第一个是xxxx 放在xxx目录，实现什么，第二个是 xxxx ，具体功能是啥
```

  

  

此时 auto-coder 会自动完成某个”传统“模块到 AC 模块的转化。对于特别复杂的情况，auto-coder会自动采用todolist 工具，确保自己支持超长超复杂的任务。

auto-coder 作为一个已经开发了一年半的项目，体量也还算可以。我们来看一个具体的case. 我们先来看看 prunner 模块的大小：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

一共是 17k, 远小于常见 128/200k 窗口，符合AC模块要求。接着你只需要一句话就可以将其转换成 AC模块：

```swift
将 @src/common/pruner 转换为 AC 模块
```

大模型就会阅读和转换该模块。大家可以看到我们的.ac.mod.md 的效果

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

详细的可以看这里：

https://github.com/allwefantasy/auto-coder/blob/master/src/autocoder/common/pruner/.ac.mod.md

  

新项目如何创建 AC 模块

这个就简单太多了，你可以这么说：

```swift
/auto 创建一个 AC模块，该模块主要功能是balalaxxxxxx剪枝功能请使用 @src/autocoder/common/pruner/.ac.mod.md 模块
```

这里你就申明了创建AC 模块，复用哪个已有AC 模块。如果你不清楚应该复用哪个AC模块，或者你可以这么写：

```powershell
/auto 创建一个 AC模块，该模块主要功能是balalaxxxxxx请先查看项目里已有的AC模块，有可以复用的功能尽量服用，不要什么都自己实现。
```

  

这样大模型自己就会去探索项目里已经有的AC 模块，从而更好的依赖已有的AC 模块开发新的模块，避免大量冗余的代码的开发，也让他对项目自身有更好的了解。

  

如何零review实现对AC模块的改造

自从引入AI辅助编程以后，大家发现 review 工作巨大。AI 快速产生代码和PR的能力瞬间冲击 review 的工作。使用 AC 模块后，人类的主要工作将会转化为”编写测试和验证case“,比如：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

之后当我们提需求修改pruner ，auto-coder 会自动调用 pytest 运行测试，直到满足用户需求并且同时通过测试才会提交PR。如果你对 test 足够有信心，那么你完全可以不用reivew 代码。

  

实际实践

AC 项目已经在 auto-coder项目中进行了实践，大家可以在我们项目里看到有很多模块已经 AC 化了。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

总结

实际上 AC 模块的设计让 AI辅助编程第一次可以完全接管一个复杂的项目，并且对项目有真正意义上的 ”深入理解“，而且不会给人类带来复杂繁琐的 Review 工作 。人类的工作也从实在让人蛋疼的review，给大模型打下手，变成我们是真正意义上的需求+验收作者。 AC 模块将真正意义第二次变革 AI辅助编程。

auto-coder 经过了一年多 400个版本的迭代，终于携 AC 模块迎来了自己的第一个里程碑版本： 1.0.0.

你可以通过一条命令：

```cpp
pip install -U auto-coder
```

来安装。

最后，你都阅读到这里了，来都来了，先别走，还有彩蛋。

超长对话支持

AC 模块的引入以及基于验证的编程，会极大的拉长对话，比如可能模型要组合1000次甚至一万次的工具调用才能最终完成功能和过”测试验收“。这个对 AI辅助编程工具是个巨大的挑战， auto-coder 完美解决了这个问题。 你可以用200k 的窗口抛出2000k 的上下文 。当然，也小心的你钱包。

大模型聚焦机制

支持了超长对话，大模型往往容易忘记最开始的需求。auto-coder 通过一些内置支持，可以在让用户无感的情况下，帮助大模型聚焦原始需求，而不会随着工具调用超过1000次以后就忘掉了之前要干什么了。

弱人机交互

现在大部分AI辅助编程工具都是强人机交互的，就是copilot 模式，我们提出需求，大模型完成，人review 和教调。随着 AC 模块的引入，AI辅助编程工具将直接给用户提交PR，而且很多情况无需review,则个时候，我们只要提出需求和验证测试，其实就可以不管了，继续去做其他事情。当前的 chat 交互模式是不合适的。所以我们引入了 CLI(方便在shell脚本或者编程语言中调用) 和 Python API（方便在应用中灵活集成），可以实现异步。比如：

```bash
cat job1.md | auto-coder.run --model cus/anthropic/claude-sonnet-4  --pr
```

然后你就可以去干别的，直到 github 接受到PR：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

好了，这下是真的结束了，但是只是这篇文章的结束，却是新时代的来临。

[Read more](https://mp.weixin.qq.com/s/)

继续滑动看下一个

祝威廉

向上滑动看下一个