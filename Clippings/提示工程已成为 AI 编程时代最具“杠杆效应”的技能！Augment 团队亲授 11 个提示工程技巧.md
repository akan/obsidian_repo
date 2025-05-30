---
title: "提示工程已成为 AI 编程时代最具“杠杆效应”的技能！Augment 团队亲授 11 个提示工程技巧"
source: "https://juejin.cn/post/7507548342508191759"
author:
  - "[[星际码仔]]"
published: 2025-05-24
created: 2025-05-27
description: "我们在提示词上做的一些微小改动，比如增加一行上下文、明确一个限制条件，或者调整指令的顺序，往往就能让 AI 的准确性和可靠性得到巨大的提升。"
tags:
  - "clippings"
---
![横幅](https://p9-piu.byteimg.com/tos-cn-i-8jisjyls3a/5c3d2417b88f42f7bd990f613191eb22~tplv-8jisjyls3a-image.image) ![](https://p26-piu.byteimg.com/tos-cn-i-8jisjyls3a/203993e1f1094c729f63dd1ed42d307d~tplv-8jisjyls3a-image.image)

大家好，我是卡夫卡。

前段时间，我看到过一篇报道。报道说，曾经因为 ChatGPT 而爆火、年薪可达百万的“提示工程师”正在消亡，目前市场对这个岗位需求正在急剧下降。

这是否意味着掌握提示技能不再重要了呢？

恰恰相反， **提示工程（Prompt engineering）现在已经成为 AI 编程驱动的软件开发流程中，最具“杠杆效应”的技能之一** 。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/dd5d4a82cf804061862c1f3986580dff~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1748684195&x-signature=h07Z%2BcaMlUBsFIydcuwd4cfolQc%3D)

我们在提示词上做的一些微小改动，比如增加一行上下文、明确一个限制条件，或者调整指令的顺序，往往就能让 AI 的准确性和可靠性得到巨大的提升。

最近，Augment Code 团队又发布了一篇博客。他们把在构建自主的 AI 代理时，经过实战检验的策略，总结成了 11 个提升 AI 代理效果的提示技巧。

虽然文中的示例主要针对的是编码代理，但这些技巧仍然具有普遍的适用性。

同时这篇译文也是我的一个新尝试。我将运用我以往写技术文章的经验，把复杂的概念用可视化的方式展示出来，力求通过图文结合的形式，帮助大家更好地理解。

如果你也喜欢这种形式，请帮忙转发、点赞、收藏。这将极大地鼓励我继续用这种方式创作。

那么，我们首先来看看——

## 什么是提示工程？

**简单来说，提示工程就是一门通过提供更好的提示，来提升 AI 模型在特定任务上的表现的艺术。**

“提示”包含了所有我们提供给模型的输入信息。它通常由多个部分组成，包括：

- **系统提示** ：这是给模型设定的整体行为准则。
- **工具定义** ：告诉模型它有哪些工具可以用，以及怎么用。
- **工具输出** ：当工具执行后，会产生输出，这也将成为提示的一部分。
- **用户指令** ：也就是我们具体想让模型做什么。
- **模型在前几轮对话中的输出** ：模型之前的回答也会影响后续的对话。

这些组成部分，都可以通过提示工程来进行优化和改进。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/141f41443f7948dba8349d1d22dd6380~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1748684195&x-signature=%2FtawO83%2BMYKhfBFFntd1pPfvFbg%3D)

例如：

- **系统提示** ：可以包含一些通用的指令。这些指令能引导模型产生不同风格的回答，或者达到我们期望的自主程度。
- **工具定义** ：可以向模型解释，在什么情况下应该使用某个工具，什么情况下不应该使用。
- **工具输出** ：可以告诉模型，之前的操作是否出现了错误。
- **用户指令** ：可以在展示给模型之前，进行改写或增强，也即所谓的“增强提示”。
- **之前的模型输出** ：可以被压缩或截断，以节省宝贵的 Token 资源。这样，就能在有限的上下文窗口中，容纳更长的对话历史。而如何巧妙地截断这些输出，对最终的质量至关重要。

## 提示工程技巧

那么，这些策略落实到具体的操作技巧，分别需要怎么做呢？

### 1\. 首先，高度关注上下文

在提示工程中，最重要的一点，就是为模型提供尽可能好的上下文。

这里的上下文，主要来源的是用户提供的信息，而不是我们预设的提示文本。

\*\*模型其实很擅长在大量的提示信息中，找到相关的、有用的上下文片段。 \*\*

**所以，如果你不确定某些信息是否有用，大胆地提供更多信息，通常是更好的选择。**

但有一点需要特别注意。

当我们得到了很长的指令输出结果，并且想要作为下一轮提供给模型的上下文，而由于过长需要截断时，截断的方法非常重要。

通常，我们截断长文本时，会习惯性地去掉末尾的内容。

然而， **对于常见的指令输出结果，有用的信息往往更多地出现在开头和结尾，而不是中间部分** 。

比如，程序崩溃时产生的堆栈跟踪信息，就通常出现在输出的末尾。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9702f04f87264b8d8f10e9f51ca4f754~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1748684195&x-signature=gXy0oifSPtHxX34S%2BfW0A9dyOQg%3D)

因此，为了让模型尽可能地获取到最相关的上下文，截断指令输出的中间部分，通常比直接截断末尾更好。

### 2\. 呈现完整的世界观

要让模型进入正确的“状态”，可以通过向它描述当前所处的环境，并提供那些可能有助于它表现得更好的细节信息。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/50f1e3a8e0b746aa9897aeeea13fdb4d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1748684195&x-signature=Oh8vBia%2FEjpcrjChBIJGdDWJCY4%3D)

例如，如果你希望模型扮演一个软件开发人员的角色，那就在系统提示中明确告知它。

同时，向它解释它可以访问哪些资源，以及应该如何使用这些资源。

### 3\. 在提示的各个组件之间保持一致性

**要确保提示的各个组成部分，比如前面提到的系统提示、工具定义等，都要保持一致，** \*\*\*\* **避免出现前后矛盾或含糊不清的地方。**

我们用几个具体的例子来解释下：

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b3031e49539543a8a1b62f71f01d0680~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1748684195&x-signature=Ep1CZevZ673mFXo7g7A92mbKcJg%3D)

#### 1\. 提示的各个组件要一致：

假设你在系统提示中告诉了模型，它当前在一个特定的目录下工作 `比如 $CWD` 。

同时，你提供了一个名为 `execute_command` 的工具，用于执行命令行指令，并且它有一个可选参数 `cwd` 用来指定工作的目录。

那么，如果用户在使用这个工具时没有特别指定 `cwd` 参数，则模型默认就应该在 `$CWD` 这个目录下执行命令。

再举个例子，假设你提供了一个 `read_file` 工具，它接受一个 `path` 参数来指定要读取的文件路径。

那么，如果用户提供的是一个相对路径，则默认的，模型应该将这个路径解释为相对于 `$CWD` 的路径。

#### 2.工具返回的结果要符合预期：

假设你定义了一个工具，并且在工具中承诺它会返回特定长度的输出。

那么你要么确保它真的能返回那个长度的输出，要么就在返回结果之前，向模型解释清楚，为什么输出的长度与承诺的不一样。

比如，原本的工具应该返回长度为 N 的输出，但实际却返回了长度为 K 的输出，那么我门就应该在答案前面加上类似“请求了长度为 N 的输出，但由于...原因，返回长度为 K 的输出”的说明。

如果直接返回长度为 K 的输出，却不做任何解释，这会让模型感到困惑，不知道哪里出了问题。

#### 3\. 避免在静态提示中包含动态变化的状态：

如果你的提示中，包含了像“当前时间”这样的信息，而这个信息在整个会话过程中是会发生变化的。

那么就不要把这个信息放在系统提示或工具定义这样的静态部分中，因为这些部分一旦设定，通常就不会随着时间变化而更新。

正确的做法应该是，在每一次用户与模型交互的消息中，都把最新的时间信息告诉模型。这样，模型在每一轮对话中都能看到最新的状态，从而保持了提示的内部一致性。

### 4\. 使模型与用户视角对齐

我们需要站在用户的角度思考，并努力使模型的“视角”与用户的视角保持一致。

**举个例子：** 当用户在集成开发环境（IDE）中工作时，我们可以向模型展示 IDE 状态的详细视图。这个视图应该重点突出那些用户最可能关心，或者最可能在指令中提及的元素。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6fa4a46cccd848e2a4abaf0b1807c825~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1748684195&x-signature=dyQaiMCPf9yfcx1ORY12WZ52g1c%3D)

### 5\. 追求详尽周全

模型能够从详尽的提示中受益匪浅。

所以，不要担心你的提示写得太长。 现在主流 AI 模型支持的上下文窗口已经很长了，并且还在持续扩大。

你几乎不用担心可能因为写了更长的提示而耗尽所谓的“提示预算”。

下面是一个成功且详细的提示示例。这个提示教模型如何使用一个名为 Graphite 的版本控制工具：

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/742f089f89a94bfc8ef8100cf9bfeb5c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1748684195&x-signature=Bt7lmzRJ5PcMVPLW%2FNMNhjnMKr0%3D)

### 6\. 避免对特定示例过度拟合

模型是强大的模式匹配器，它们会敏锐地抓住提示中出现的各种细节。

因此， **向模型提供具体的操作示例，有时候可能是一把双刃剑。**

**一方面，这确实是引导模型朝着正确方向前进的简单方法。**

**但另一方面，也存在风险：模型可能会过度拟合这些示例，导致在其他方面表现下降。**

所以，务必进行充分的实验。并且，要有意识地包含一些可能暴露过度拟合问题的示例，以便及时发现和调整。

相比之下，告诉模型“不要做什么”通常是安全的。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/36cfb14d09e74c32912c0f8b408f3bee~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1748684195&x-signature=vOvyA%2FwS2IlYjA%2BKwuhjPAf9WFE%3D)

### 7\. 考虑工具调用的局限性

工具调用（即让模型使用外部工具）在以下几个方面会受到限制：

- **无法保证一定选对** ：模型能否选择正确的工具，取决于它是否接受过类似工具的训练，或者指令与工具之间的联系是否足够明确。 但在许多情况下，即使有最好的提示，它们也可能无法选对工具。
- **相似的工具容易混淆** ：如果你提供了多个功能相似的工具，就不应该期望模型在任何给定的情况下都能准确地选择出最合适的那个。 （例如，当面对一个简单工具和一个复杂工具都能完成类似任务时，像 Claude 这样的模型通常会倾向于选择那个更简单的工具）。
- **提供失败的错误反馈** ：模型经常会以不正确的方式调用工具 比如：参数类型错误，参数取值范围不对，或者必需参数没有提供等等。 最好的做法是， **在工具端验证输入参数。如果验证失败，就返回一个工具输出，清晰地解释错误的原因。模型通常能够从这种错误反馈中学习并恢复** 。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7a44044828e0430fbd71be4058c0bb2d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1748684195&x-signature=svTUAjTGpmcE1qCT%2BsieP9jV18Y%3D)

### 8\. 威胁和唤起同情有时有效

虽然有点反认知，但是，有时候，告诉模型一些诸如“你必须正确执行这个操作，否则你将面临财务危机的风险”之类的话，确实有助于提高它的表现。

但反过来，友好地请求模型，或者对其“大喊大叫”，通常没什么帮助。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/fc884028b4124280aa8ed410e4abe74e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1748684195&x-signature=ggHVD%2FCfP3Pg4yDUVEzGgdnKHD0%3D)

### 9.注意提示缓存

在构建提示时，要尽可能地让它们可以在会话期间被追加内容，而不是完全替换。

这样做是为了避免使提示缓存失效，从而提高效率。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/02c5421b0d1e4851a6d42377db8ec195~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1748684195&x-signature=LY%2BhvSYGAEauchP6Nsdlo7VNspE%3D)

### 10.模型更关注提示开头或特别是结尾的信息

模型对指令不同部分的关注程度似乎是这样的： **用户最新发的消息 > 整个输入的最开头 > 输入的中间某个位置** 。

因此，如果某件事情非常重要，可以考虑将其添加到用户最新的消息中。 （请注意，这是一个基于当前观察的快照，随着模型训练的不断发展，这种优先级可能会发生变化。）

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/37003948c69b4919a82dabd141a1b863~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1748684195&x-signature=wMt6ConBdeGbBqgwQduhDlkz9Fs%3D)

### 11.警惕提示效果的平台期

仅仅通过简单的提示工程所能达到的效果是有限的。

当你发现，无论怎么优化提示，效果提升都微乎其微，也就是进入了所谓的“收益递减”阶段时，就需要引入其他更高级的技术了。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/20128f16235d43569535388ee91123ec~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1748684195&x-signature=mmYYCBb0LZiPGYmHSRWhlX8CPRo%3D)

## 结论

掌握提示工程，与其说是一堆技巧的堆砌，不如说是一种有纪律的沟通方式：

- 为 AI 代理提供完整、一致的上下文信息；
- 像对待一个你不太信任的同事那样，去验证它的行为和输出；
- 通过不断的实践和经验积累，进行迭代优化。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/85a7cc58ec904fbbbbc3a699e617a2c1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1748684195&x-signature=P9YQ5%2BD2910LHmSpD5FGBSrhmSc%3D)

当你开始将提示视为代码库的一部分——进行版本控制、代码审查和自动化测试——你就能够得到一个能真正扩展你的能力，而不是给你增加麻烦的 AI 代理。

评论 0

暂无评论数据