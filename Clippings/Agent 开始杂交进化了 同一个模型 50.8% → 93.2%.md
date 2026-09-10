---
title: "Agent 开始「杂交进化」了：同一个模型，50.8% → 93.2%"
source: "https://mp.weixin.qq.com/s/PeZtviijO2gfDkLhJPv5NA"
author:
  - "[[热爱分享的]]"
published:
created: 2026-09-10
description: "让Agent学会比较，从经验中进化自己。"
tags:
  - "Agent自我进化"
  - "递归自我改进"
  - "Mendel Gödel Machine"
  - "跨谱系杂交"
  - "比较式反思"
  - "scaffold进化"
  - "SWE-bench"
  - "Polyglot-60"
  - "93.2%"
  - "Coding Agent"
abstract: "MGM 让 Agent 通过跨任务、跨谱系的比较来修改自身 scaffold，在 Polyglot-60 上把同一 Qwen backbone 的成绩从 50.8% 提升到 93.2%。"
---
热爱分享的 深度学习自然语言处理 *Sep 10, 2026, 11:43 AM*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Gx2bNxGW2sabvNxHiaKhzic4VLXCbXSRTWtQlickHG6ZiczbrnlNeJSXCC2zqXo1vR17x87ckvqngOye3YRE2U7FBdXlJbuMic38BXgFYoCic19wY/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

现在的 Coding Agent，已经可以自己写代码、跑测试、修 Bug。

但如果再往前走一步：

**Agent 能不能修改自己的代码，让“下一代 Agent”比自己更强？**

这就是最近 Recursive Self-Improvement（RSI，递归自我改进）里一个很有意思的方向。

此前的 Darwin Gödel Machine（DGM）、Hill-climbing Gödel Machine（HGM）等工作已经开始尝试：

> Agent 做任务 → 发现问题 → 修改自己的 scaffold → 产生一个更好的 Agent。

但这里有个问题：

**Agent 到底应该根据什么来修改自己？**

过去的方法，很大程度上还是：

> **看自己的一次失败，然后反思。**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Gx2bNxGW2sZ7WROe6Tt0LJJUWXIFQLSyCteManIDQdRzWxIdEuTVRRRbVibEly5oZLMjxkfajpKicLib2teLK3cfJXWDO723ICCXwYfyyTeEDo/640?wx_fmt=webp&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

而最近来自电子科技大学、LMU Munich 和 MCML 的新工作 **Mendel Gödel Machine（MGM）** ，换了一个思路：

> **别只看自己这一次为什么失败。**
> 
> 看看自己在别的任务上怎么失败，也看看其他 Agent 在同一道题上是怎么做的。

于是，Agent 的 self-improvement 从简单的“失败 → 反思”，开始加入了 **比较、遗传和跨 lineage 的能力迁移** 。

这也是论文名字里 **Mendel（孟德尔）** 的由来。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Gx2bNxGW2sZeicY0UzA5wdISO3t1ZaK5iar8sp701t25w4l1fcNCTnR47NErJT9mrDOd0KKOianmKQxldCrvjr1ULwIJ7gBRM8DK4biajib551Hs/640?wx_fmt=webp&from=appmsg#imgIndex=2)

## 01 以前的 Agent 自我进化，有点像「闭门复盘」

先看传统 self-improving Agent 的逻辑。

假设一个 Coding Agent 做 SWE-bench。

它失败了。

系统把这次 trajectory 拿出来：

它看了哪些文件、调用了什么工具、进行了什么推理、修改了哪些代码，以及最后为什么失败。

然后让 Agent 根据这次失败修改自己的 scaffold。

比如它可能发现：

> 我太早开始写 patch 了，下次应该先充分搜索 repository。

于是下一代 Agent 的 workflow 变成：

**先定位问题 → 阅读相关代码 → 分析依赖 → 再修改。**

这已经属于一种 Agent-level self-improvement。

但问题也很明显：

**一次失败提供的信息太少了。**

这次失败可能只是偶然搜错文件，也可能暴露了一个系统性的 workflow 缺陷。

仅靠一条 trajectory，很难区分。

而且随着 Agent 不断运行，系统其实已经积累了大量历史数据：

不同 Agent、不同任务、不同 trajectory，以及成功和失败记录。

DGM、HGM 已经会维护这样的 archive，但它们更多利用 archive 来决定：

> **接下来选择哪个 Agent 继续 evaluation / expansion？**

MGM 则进一步提出：

**这些历史 trajectory 本身，就应该成为 Agent 修改自己的信息来源。**

## 02 MGM：给 Agent 的「自我反思」加入对照

MGM 把一个 Agent 看成一种 genotype（基因型）。

Agent 的代码和 scaffold 决定它如何工作，而它在具体任务中表现出来的行为，则可以理解成 phenotype（表型）。

基于这个视角，作者设计了三种不同的 self-modification 操作。

其实不用记这些生物学名词。

整篇论文最核心的区别，可以浓缩成三句话：

| 方法 | Agent 看什么？ |
| --- | --- |
| Clonal Mutation | **同一个 Agent，一次任务** |
| Reaction-Norm Mutation | **同一个 Agent，不同任务** |
| Cross-Lineage Hybridization | **不同 Agent，同一个任务** |

关键就在两个字：

**比较。**

## 03 第一种：Clonal Mutation —— 自己反思自己

这是最传统的方式。

Agent 做一道题失败：

**失败 trajectory → 分析原因 → 修改自己。**

比如：

> 我没有充分搜索 repository，所以没有找到真正需要修改的文件。

那么下一代 Agent 就强化 repository search。

作者把它叫：

**Clonal Mutation（克隆突变）。**

它的问题也正是前面说的：

**Agent 只看到了一次任务中的自己。**

于是 MGM 又加入了另外两种比较方式。

## 04 Reaction-Norm：别只问「这次为什么错」

第一种比较，是：

**同一个 Agent，不同任务。**

MGM 会利用同一 Agent 在不同任务上积累的历史 trajectory，选取跨任务轨迹进行比较。

比如：

Task A：

> 搜索 repo 不充分 → 找错文件 → 失败。

Task B：

> 太早开始 patch → 没理解调用关系 → 失败。

单独看，两次失败原因似乎不同。

但放在一起，就可能发现一个更深层的问题：

> **这个 Agent 总是在充分理解 repository 之前，就急着开始修改代码。**

这时候 Agent 修改的，就不再是某一道题的特殊 trick，而可能是一条更加 general 的 workflow：

> 写 patch 之前，必须先完成 repository localization 和 dependency analysis。

这就是 **Reaction-Norm Mutation** 。

换成人话：

> **不要只问“这次为什么错”，而要问“为什么你老在这里出问题”。**

它试图找到的不是 task-specific failure，而是更加稳定的 behavioral weakness。

## 05 Cross-Lineage：看看「别人家的 Agent」怎么做

第二种比较更有意思：

**不同 Agent，同一个任务。**

假设有两条独立进化出来的 lineage：

Agent A 做一道题失败了。

Agent B 做同一道题成功了。

A 的过程是：

> grep → 找到疑似文件 → 直接修改。

B 的过程则是：

> 搜索 issue 关键词 → 定位多个模块 → 阅读测试 → 检查 dependency → 修改。

传统 self-reflection 会让 A：

> 看自己的失败 → 猜自己哪里做错了。

而 MGM 会让 A 同时观察：

**自己的 trajectory + B 的 trajectory。**

然后分析：

> **为什么它能做出来，而我没有？**

如果发现 B 的 repository localization workflow 更有效，A 就可以把这种策略吸收到自己的 scaffold 中。

这就是：

**Cross-Lineage Hybridization（跨谱系杂交）。**

这里有一个很重要的细节：

MGM 并不是简单地：

> copy B 的代码。

论文明确强调，它不会直接把两个 Agent 的 source files 拼起来。

它做的是：

> **从另一个 Agent 的行为 trajectory 中抽取可迁移的策略，再修改自己的 codebase。**

所以更准确地说，不是：

**copy code**

而是：

**learn strategy / workflow。**

而且 cross-lineage comparison 也不要求一定是“一个成功、一个失败”。

即便两个 Agent 都失败，它们不同的 failure mode 也可能提供有价值的比较信号。

## 06 为什么「比较」可能比单纯 Reflection 更有效？

这里其实是整篇论文最值得理解的地方。

传统方法：

> **我失败了 → 我猜自己哪里有问题。**

Reaction-Norm：

> **我在不同任务里都出现类似问题 → 这可能是我的系统性缺陷。**

Cross-Lineage：

> **同一道题，别人和我的行为不一样 → 哪个差异真正影响了结果？**

后两种方法给 self-reflection 加入了一个非常重要的东西：

**对照。**

论文的理论分析也是类似的思路：

Comparative evidence 可以帮助 Agent 缩小潜在 defect 的候选范围，从而降低 diagnosis 的不确定性，提高找到有效修改方向的概率。

这其实很像人类学习。

**只看自己的失败，我们很容易瞎猜。**

但如果你知道：

> “我连续三次都在同一个地方出错。”

或者：

> “别人和我做的是同一道题，但他多做了这一步。”

问题就容易定位得多。

## 07 效果怎么样？50.8% → 93.2%

作者使用 **Qwen3.6-35B-A3B** 作为 backbone，在相同 evaluation / expansion budget 下比较 HGM 和 MGM。

结果非常明显。

在 SWE-bench Verified-60：

**Initial：68.3%**

**HGM：73.3%**

**MGM：78.3%**

而在 Polyglot-60 上：

**Initial：50.8%**

**HGM：77.9%**

**MGM：93.2%**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Gx2bNxGW2sbtUfxtjzUC75Gp226ia8M8ibhPqWE7qPTtea8K8heiazdyTpRiakDIQqicbt0MSia5csvRiawgnMRkFXUAIKsxCf8Up50icYhyiay5ZRHw/640?wx_fmt=webp&from=appmsg#imgIndex=3)

这里尤其值得注意的是：

**底层 LLM 并没有重新训练。**

发生进化的是 Agent 外面的 scaffold / workflow。

也就是说，在 Polyglot-60 上，同一个 Qwen backbone：

> **50.8% → 93.2%**

而且 HGM 与 MGM 使用相同数量的 evaluation 和 expansion，token cost 也处于相近量级。

所以这个差距不能简单解释成：

> MGM 只是“多花了很多算力”。

另外需要区分一个数字：

**93.2% 是 Polyglot-60 的结果。**

在完整 **Polyglot-225** 上，MGM 最终达到的是：

**93.3%。**

## 08 更重要的问题：它是不是把 benchmark「刷熟了」？

看到这种 self-improvement 方法，一个很自然的怀疑是：

> Agent 会不会只是越来越适应这一批 benchmark？

如果进化出来的 scaffold 只能在原 benchmark 上工作，那它更像自动调参，而不是真正学到了可迁移的 workflow。

所以作者又做了两个很关键的实验。

第一个：

**换 benchmark。**

Agent 在 Polyglot 上完成进化后，不再继续修改 scaffold，直接拿去测试：

- SWE-bench Pro
- SWE-bench Multilingual

结果在 SWE-bench Pro 上：

Initial： **16.7%**

HGM： **13.3%**

MGM： **26.7%**

在 SWE-bench Multilingual 上：

Initial： **41.7%**

MGM： **55.0%**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Gx2bNxGW2satc5M5rPicHCgoGiazELj4OIAp3GczkjKMbPZ2hHdR5cCVSnOGgALgV9HrV6NnrDg6l9jkUibxZTEricBGmZjXCJY2CibwSVgmib0KQ/640?wx_fmt=webp&from=appmsg#imgIndex=4)

至少从这些结果来看，MGM 学到的并不完全是某一道题或者某一个 benchmark 的特殊技巧。

## 09 更有意思：进化出来的 scaffold 居然还能「换模型」

作者接着做了一个更大胆的实验：

**换 backbone。**

原来的 Agent scaffold 是在 **Qwen3.6-35B-A3B** 上进化出来的。

现在：

**冻结 scaffold。**

不再让它继续进化。

然后直接把底层模型换成：

**DeepSeek-V4-Flash / DeepSeek-V4-Pro。**

结果进化得到的 workflow 依然能够带来提升。

例如在 SWE-bench Verified-60 上，换成 DeepSeek-V4-Pro 后：

Initial scaffold：

**45.0%**

HGM scaffold：

**70.0%**

MGM scaffold：

**75.0%**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Gx2bNxGW2sbaeiaZfGOosCbHtPeJNrAxvYMUKI6WnmhzvyXKISB6yQMWkcgJaYgfWI6bHho7aEHSW5IS4W3HuELvk5VkjvQUxXV6pr8D1vhY/640?wx_fmt=webp&from=appmsg#imgIndex=5)

还有一个非常亮眼的数字：

作者把 **在 Qwen 上通过 Polyglot 进化出来的 MGM scaffold 冻结** ，再直接换成 DeepSeek-V4-Pro 进行 inference。

在完整的 **Polyglot-225** 上：

**96.89%。**

这里尤其需要注意：

**DeepSeek 并没有重新参与这一轮 scaffold evolution。**

也就是说，这不是：

> DeepSeek 自己重新进化到了 96.89%。

而是：

> **Qwen 上进化 workflow → 冻结 → 换 DeepSeek → 依然有效。**

这件事其实比单纯 benchmark 涨几个点更有意思。

因为它说明：

**至少一部分 Agent evolution 得到的能力，有可能存在于 scaffold / workflow，而不是绑定在某一个具体 backbone 的参数里。**

这也提示了一条很有意思的潜在路线：

> 未来也许可以让相对便宜的模型承担 scaffold 的搜索和进化，再把得到的 workflow 迁移到更强的模型上。

当然，目前这仍然只是论文实验所提示的一种可能路径，而不是已经被大规模验证的工程规律。

## 10 到底是哪种「进化」最重要？

作者还专门做了 ablation。

完整 MGM：

**93.2%**

去掉 Reaction-Norm Mutation：

**79.7%**

去掉 Cross-Lineage Hybridization：

**74.6%**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Gx2bNxGW2sarBjhA5ia42o97BD4ZrMsRf2IAwQNBXR44ErBTPZiaHoBKRslwPB7dhIq5fax4FlXLiaAvpEu166X1uXTRRKiamRFzjqw9ib017jSs/640?wx_fmt=webp&from=appmsg#imgIndex=6)

两个模块都很重要。

但去掉 Cross-Lineage 后下降尤其明显。

这说明：

> **跨 lineage 的对照信息可能尤其重要。**

只在自己的历史里反思当然有价值。

但另一个 Agent 在 **相同任务** 上的 trajectory，能够提供更加直接的 comparative signal：

**它到底做了什么，是我没有做的？**

## 11 这篇论文真正值得关注的，其实不是「孟德尔」

Genotype、Phenotype、Reaction Norm、Hybridization……

这些生物学比喻很有记忆点。

但把包装全部拿掉，MGM 真正想表达的其实非常简单：

> **Agent 的历史 trajectory 不应该只是日志，而应该成为下一代 Agent 的学习信号。**

过去的 self-improvement 更像：

**一次失败 → Reflection → 修改。**

MGM 开始变成：

**历史经验 → Comparison → Diagnosis → 修改。**

这意味着，一个 Agent 系统运行得越久，它积累的不只是：

**“我做过多少任务”。**

还包括：

- 我在哪些情况下经常失败；
- 哪些 workflow 比较有效；
- 哪种策略容易出错；
- 同一道任务，不同 Agent 为什么表现不同；
- 哪些行为模式可以跨 Agent 迁移。

可以把它理解成一个不断增长的：

**Agent 经验库。**

而当这些经验能够被持续比较、总结，再反过来修改 Agent 本身时，就开始形成一个非常有意思的闭环：

> **运行 → 积累经验 → 比较 → 修改自己 → 再运行。**

这可能比“让 Agent 多 Reflection 几次”更接近真正意义上的 self-improving system。

## 12 当然，这距离真正的「AI 自我进化」还很远

看到 50.8% → 93.2%，很容易产生一个很科幻的联想：

> AI 已经开始自己修改自己、越变越聪明了吗？

现在还不能这么说。

首先，MGM 修改的主要是：

**Agent scaffold。**

比如 prompt、workflow、tool usage 和 Agent code。

它并没有重新训练 foundation model 的参数。

所以更准确地说，这是：

**Agent-level Self-Improvement**

而不是：

**Model-level Recursive Self-Improvement。**

其次，目前最有力的实验仍然集中在：

**Coding Agent。**

Coding 是一个特别适合研究 self-improvement 的场景。

因为：

代码能运行。

测试能执行。

任务成功还是失败，通常能够获得相对明确的反馈。

但如果换成真实世界里的 Research Agent、商业 Agent，甚至开放世界的 General Agent：

> **什么叫“变好了”？**

本身就可能非常难定义。

所以 MGM 证明的并不是：

> “通用 AI 已经可以无限自我进化。”

而是一个更加具体、也更加值得关注的结论：

> **在有明确 evaluation signal 的 Agent 环境里，利用跨任务、跨 Agent 的历史 trajectory 进行比较，可以显著改善 scaffold 的自动进化。**

## 13 Agent 的下一个 Scaling 维度，可能不只在模型参数里

过去几年，我们讨论 AI scaling，首先想到的是：

**更大的模型。**

**更多的数据。**

**更多的算力。**

但进入 Agent 时代以后，一个新的优化空间越来越明显：

**模型外面的 system。**

Prompt 怎么写？

Context 怎么组织？

什么时候搜索？

什么时候调用工具？

Memory 怎么管理？

失败以后怎么恢复？

任务应该拆成几步？

多个 Agent 怎么协作？

这些东西过去基本都是：

**人来设计。**

但现在越来越多工作开始问：

> **这些东西能不能也由 Agent 自己搜索和优化？**

从 DGM、HGM，再到 MGM，这条路线正在逐渐从：

**Human-designed Agent**

走向：

**Agent-designed Agent。**

而 MGM 又往前推了一步：

> Agent 不只是从自己的失败里学习， **还可以从不同版本的 Agent、不同任务产生的历史经验里互相学习。**

所以我觉得这篇论文真正值得关注的问题，并不是：

**“孟德尔这个比喻有多酷？”**

而是：

> **当一个 Agent 系统开始拥有越来越多自己的历史经验以后，我们能不能让它自己发现——下一代 Agent 应该长什么样？**

如果这个闭环最终能够从 coding benchmark 扩展到更加开放、长期、真实的任务环境，

那么所谓 **Self-Improving Agent** ，

可能才真正开始变得有意思。

---

论文：Mendel Gödel Machine: Recursive Self-Improving Coding Agents via Comparative Evolution  
作者：Changzhi Liu, Yilun Liu, Sikuan Yan, Volker Tresp, Yunpu Ma  
arXiv：2608.07645