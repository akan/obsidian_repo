---
title: "大模型上下文工程之Prefill Response（预填响应）技巧"
source: "https://juejin.cn/post/7532797689643270178"
author:
  - "[[北极的树]]"
published: 2025-07-31
created: 2025-07-31
description: "本文聚焦上下文工程中的Prefill Response技术。面对AI因工具过多而产生的“选择困难症”，该技术通过“遮蔽”而非“移除”的方式，巧妙约束模型行为。它在保证性能与稳定性的同时，有效引导AI做"
tags:
  - "预填响应"
  - "上下文工程"
  - "大模型引导"
abstract: "本文介绍了大模型上下文工程中的Prefill Response技术，通过预填部分响应来引导模型输出方向。"
---
![横幅](https://p9-piu.byteimg.com/tos-cn-i-8jisjyls3a/8c759ddb57d0440986f4768fc644f879~tplv-8jisjyls3a-2:0:0:q75.image) ![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/b37ce6cd3dfa46f699d8fc9c7c888f2f~tplv-8jisjyls3a-3:0:0:q75.png)

上一篇文章，我们聊了上下文工程中的 **Prefix Caching** 技术。它主要解决Token成本问题，能帮你的AI应用省钱，同时能降低大模型的响应耗时。

今天的这篇文章，我来聊一聊如何让大模型更听话的技巧： **Prefill Response（预填响应）** 。

（关于 **上下文工程系列** ，感兴趣的读者也可以回顾前两篇：）

- [《产品级AI应用的核心：上下文工程》](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2F93rEhMY7rIUlHIiPPDvEag "https://mp.weixin.qq.com/s/93rEhMY7rIUlHIiPPDvEag")
- [《大模型上下文工程之Prefix Caching技术详解》](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FTA7DY1cynVNPYW-sVI2zHw "https://mp.weixin.qq.com/s/TA7DY1cynVNPYW-sVI2zHw")

## 一、Prefill Response（预填响应） 是什么？

简单来说，这是一个给大模型“喂招”的技巧。目前主流大模型基本都支持了 **预填响应** 的形式。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b56aa94132744e2a91ea358a89cc4aab~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YyX5p6B55qE5qCR:q75.awebp?rk3s=f64ab15b&x-expires=1754547362&x-signature=m6OD3NLivxFJDoY006FXzQqSgAA%3D)

我们都知道，大语言模型本质上是一个“文字接龙”大师。它根据你给出的上文，来预测下一个最合适的词。

**Prefill Response** 正是利用了这一点。

当轮到大模型回应时，我们可以先“预先填写”一部分它要说的话。大模型看到这个开头后，会认为这是自己已经说出口的，然后自然地接着往下说。

这样，我们就巧妙的引导了它的输出方向。

我们来看一个Claude的例子。假设我们想让它只返回计算结果。

```
# 原始请求
client.messages.create(
    model="claude-opus-4-20250514",
    messages=[
        {"role": "user", "content": "你是一个计算器，请计算：1 + 1，只需输出计算结果"},
    ]
)
```

即使我们强调了要求，模型也有可能会返回 “当然！1 + 1 的结果是 2” 这样多余的内容。

现在，我们试试 **Prefill Response** ：

```
# 使用 Prefill Response
client.messages.create(
    model="claude-opus-4-20250514",
    messages=[
        {"role": "user", "content": "你是一个计算器，请计算：1 + 1"},
        {"role": "assistant", "content": "="}  # 在这里预填
    ]
)
```

这时，模型的输出就只会是2。  
我们只是通过 `assistant` 角色预填了一个等号 =，就成功框住了模型的思维，让它只能接着我们的思路走。

## 二、Prefill Response的巧用

上面的例子很简单。我们来看一个更真实的场景。

在做AI应用时，功能可能越加越多，工具箱（ `Tool集合` ）也越来越大。一个直接的后果是：AI代理开始出现“选择困难症”，经常选错工具。

我们用一个“智能管家”的例子来说明。

假设我们的 AI 管家集成了家里所有设备的控制权，每个操作都是一个独立的工具。

工具箱一览（部分）：

- **灯光类：** turn\_on\_living\_room\_light、turn\_off\_living\_room\_light...
- **温控类：** turn\_off\_ac、set\_hvac\_to\_away\_mode...
- **安防类：** arm\_security\_system、lock\_front\_door...
- **影音类：** turn\_off\_tv、stop\_music\_playback...
- **信息类：** get\_weather\_forecast、read\_latest\_news...

可以看到，工具列表非常庞大。

某天，你出门时对它说：“我准备出门了，帮我处理一下家里。”

如果是人类管家，他知道这时候该关灯、关空调、锁门。但AI面对几十个工具，可能瞬间陷入了混乱。他可能很难将“出门处理一下”这种模糊的指令，准确翻译成一连串正确的工具调用。

### 一个“看似可行”的错误方案

一个自然的想法是：动态调整工具列表。根据用户意图，按需加载相关的工具（ `类似于RAG的思路` ）。

但这种“动态移除”的方案，会带来两个灾难性的问题：

- **性能灾难：缓存失效。** 我在上一篇讲 **Prefix Caching** 时有提到，要尽量的去复用前缀缓存来节省token费用。而在我们的Prompt设计中，通常将工具列表的定义放在系统指令和动态上下文之间，因此，对工具集的任何更改可能导致后续的缓存失效。
- **稳定性灾难：模型困惑。** AI代理的记忆（上下文）中包含了它过往的所有行为和观察。想象一下，代理在第 2 步用了工具 `A` ，但第 3 步你把 `A` 移除了。代理回看历史时，会发现一个“不存在”的工具记录。这会让它陷入自我矛盾的“精神错乱”，大大增加产生幻觉的风险。

### 更好的方式是：用“遮蔽”代替“移除”

这时， **Prefill Response** 就派上了用场。我们可以用它来实现对工具的“遮蔽”，而不是“移除”。

整个过程咱们可以分三步走：

**第一步：设计一个状态机**  
我们的应用需要能感知上下文。比如，当用户说“我准备出门了”，应用就将状态切换为 `LEAVING_HOME` 。

**第二步：统一工具命名**  
这是一个小技巧，但非常关键。我们可以按需给工具名加不同的前缀。例如，上述“智能管家”的案例中，所有关闭类的工具都以 `turn_off_` 开头。这便于我们按组进行管理。（ `Manus在自己的技术博客中举过一个例子，他们根据不同场景来对工具集进行特定前缀命名，所有与浏览器相关的工具都以browser_开头，命令行工具则以shell_开头` ）

**第三步：使用Prefill Response实现“遮蔽”**  
在 `LEAVING_HOME` 状态下，状态机判断出，此时只需要用到 `turn_off_` 开头的工具。接下来，我们就要“遮蔽”掉其他所有工具的调用可能。

当然，现在一些主流的闭源大模型，提供了直接的API方便开发者在执行任务的过程中，来精确的控制可以调用哪些工具。例如OpenAI和Claude的 `tool_choice` 参数，Gemini的 `tool_config` 参数。

但是，在许多商业AI应用中，出于成本和定制化考虑，我们往往会选择部署开源模型。这些模型通常没有这些高级 API。

这时，我们可以选择 **Prefill Response** 技术来实现动态遮蔽效果。

现在很多开源模型在多轮对话中采用的是OpenAI提出的ChatML（Chat Markup Language）格式。一个ChatML的基本结构由三个部分组成： **起始标记** 、 **角色** 、 **结束标记** 。

```
<|im_start|>角色 (role)
对话内容 (content)
<|im_end|>
```

角色一般就是 `system（系统指令）` 、 `user（用户指令）` 、 `assistant（模型回应）` 。如前文所述，我们可以利用 `assitant` 角色来达到 **Prefill Response** 的目的。按Manus的用法，一般有三种模式：

1. **自动模式** - `预填充内容 <|im_start|>assistant`  
	这是最宽松的模式。我们只是告诉模型可以自由回复，模型可以选择直接回答用户的问题，或者调用一个工具
2. **必须模式** - `预填充内容 <|im_start|>assistant<tool_call>`  
	这种模式下，我们通过在 `assitant` 角色中指定 `<tool_call>` 前缀直接替模型决定了第一步：必须调用一个工具。
3. **指定模式** - `预填充内容 <|im_start|>assistant<tool_call>{"name": "turn_off_"`  
	这是限制性最强的模式，我们给模型做出了更具体的指示：接下来不仅要调用工具，而且必须调用一个名字为 `turn_off_` 开头的工具，模型接下来的任务就变成了在所有以 `turn_off_` 为前缀的工具中选择一个最合适的。

## 结语

可以看到， **Prefill Response** 通过一种非常巧妙的方式，给大模型套上了一个“紧箍咒”。

它在不改变模型完整工具箱的前提下，引导模型在特定场景下，只能选择特定的行为路径。这使得 AI 代理的行动更加可靠、高效。

这也告诉我们，要设计一个优秀的上下文，有非常多的细节要去考量。

评论 0

暂无评论数据