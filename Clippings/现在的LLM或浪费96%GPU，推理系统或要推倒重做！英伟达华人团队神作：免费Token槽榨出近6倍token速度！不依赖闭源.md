---
title: "现在的LLM或浪费96%GPU，推理系统或要推倒重做！英伟达华人团队神作：免费Token槽榨出近6倍token速度！不依赖闭源！"
source: "https://mp.weixin.qq.com/s/nLdmA7E8gxg8gp-mD2gNwA"
author:
  - "[[云昭]]"
published:
created: 2025-11-19
description: "华人团队又一神作！"
tags:
  - "GPU浪费"
  - "推理加速"
  - "并行解码"
  - "免费Token槽"
  - "质量保持"
abstract: "英伟达华人团队提出TiDAR方法，通过并行解码利用免费Token槽，在不损失输出质量的情况下将LLM推理速度提升近6倍。"
---
Original 云昭 *2025年11月19日 10:52*

![Image](https://mmbiz.qpic.cn/mmbiz_gif/MOwlO0INfQoIDJ0nx1IhNibpIpYLrpUE0kIP9qbF1iaY7EoZpaic6IojvbXibd5ZGiatxmjtibQRcVbGAPM9Ijvp66yQ/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

![Image](https://mmbiz.qpic.cn/mmbiz_png/MOwlO0INfQopUe3eu8Yqhla8S7yBueckia2icAZXu6sBiaoSqiaTyqn8vECEvLv6ibM9Wqtic17NPZox9cSp82E7dxow/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

编辑 | 云昭

每个做 LLM 的开发者都体会过这种折磨：推理太慢。你等 2–3 秒才能出一个 token。

然而，真相更让人产生戏剧感：你和用户已经抱怨延迟 N 个月了，但你的 GPU 大部分时间其实都在发呆。

更魔幻的是，不管你怎么操作，CUDA 核心就是一直闲着。一点加速办法都没有。

为什么？因为问题不在于你的硬件，也不是你的代码，而是出在了 LLM 这种自回归语言模型本身的结构，以及 GPU 的工作方式上。

你的GPU可能大部分时间都被浪费掉了！

## 单纯堆算力不管用：「内存墙」

自回归模型一次只能生成一个 token。听起来很合理——语言是顺序的，那按 顺序生成 就好。但在 GPU 内部，每一步生成实际发生的是：

1. 从显存加载模型权重（以 GB 计）
2. 从显存加载 KV Cache（也是 GB 级别）
3. 计算下一个 token 的概率（微秒级）
4. 写入新的 KV Cache
5. 重复

计算本身几乎不花时间。真正的瓶颈在 **内存带宽** ——也就是不断搬运权重和 KV cache。你的 GPU 每秒能执行数万亿次计算，但大部分时间其实都在等数据。

这就是所谓的 **“memory-bound（受内存带宽限制）”** ，也解释了为什么单纯增加算力并不能带来提升。

业界给出的方案是 **推测解码（speculative decoding）** ：

用一个更小的起草模型（draft model）一次生成多个候选 token，再由主模型做验证。

这个方法虽然有效，但有天花板：

- 起草模型更弱，所以 **通过率（acceptance rate）会下降** ；
- 仍然是 **顺序式处理** ，无法完全并行；
- 而且需要维护 **两个独立的模型** 。

## 最喜欢的Trick：免费 token 槽位

那有别的办法吗？当然。

其实，大多数人不知道 GPU 推理里有这么一个概 念：免费Token槽位（ **Free Token Slots）：**

如果瓶颈在于显存带宽，你其实可以在一次前向计算里并行解出多个 token，延迟几乎不变。

ps： 内存带宽搬来的数据只用来生成一次token就太浪费了，它可以运算多次！

想想看，模型权重和 KV cache 都已经加载进来了。如果用同一份数据能一次性预测 10 个 token，而不是只预测 1 个，你的有效吞吐就直接提升 10 倍。

这样，额外的算力开销几乎可以忽略——反正你卡的是显存带宽。

这个想法，来自于英伟达的研究团队。他们近日在一篇名为《TiDAR: Think in Diffusion, Talk in Autoregression》的论文中提到了一种“TiDAR”的方法。（ 没错，又是华人团队霸榜作者名单！ ）

![Image](https://mmbiz.qpic.cn/mmbiz_png/MOwlO0INfQrjM92NBR15UnciaSWUjh1ZpHF8Z1Srgn1Ucrj0jjQg1XcKicLicO3PicecIpjOXqOLiciaqqA4Kgia82gNg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

研究人员在 H100 上，基 于 Qwen3-32B 做 过测量：

当 batch size 是 1、上下文长度是 4096 tokens 时，增加“待解码 token 槽位”的数量，对延迟的影响非常小，直到接近 100+ 个 token 才开始明显上升。

在这以下的区间，你基本处于 **“免费 token 槽位”** 区域：并行解码的成本几乎可以忽略不计。

![Image](https://mmbiz.qpic.cn/mmbiz_png/MOwlO0INfQrjM92NBR15UnciaSWUjh1ZpOGFswPfZzDv4Yx6HmTqwJ6cCEtibuyzhAO3ga0Rh711RZ5jlic0DHmIQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

这也是“扩散式语言模型”（diffusion LLM）看起来很有吸引力的原因——它们本来就是一次性预测多个 token。当然，伴生的问题就是： **质量会掉。**

## 质量 vs 并行：无法回避的矛盾

输出的token质量高，与输出的延迟低，是一个“鱼和熊掌”的问题。

扩散模型的生成过程是：对被 mask 的 token 反复去噪。开始时整个序列都是 mask，然后通过多轮迭代逐步恢复真实 token。  
问题在于： **当你把多个 token 并行解码时，会破坏语言模型赖以运作的因果结构。**

自回归模型遵循链式分布分解：

p(x₁, x₂, …, xₙ) = p(x₁) × p(x₂|x₁) × p(x₃|x₁,x₂) × …

每个 token 都依赖之前所有 token，这符合语言的自然结构。

但扩散模型的并行解码更像是从相互独立的边缘分布中采样：

p(x₁, x₂, …, xₙ) ≈ p(x₁) × p(x₂) × p(x₃) × …

也就是说，同一步里生成的 token **互相之间是独立的** 。  
这会破坏序列级别的连贯性，并行越多，质量下降越严重。

例如开源中表现领先的扩散类 LLM——Dream-7B：只把每步预测 token 数从 1 个提升到 2 个，GSM8K 上的准确率就下降 10%。

Llada 以及其他扩散模型同样存在这个结构性问题： **并行更多，质量更差。**

最终，扩散模型最好的生成质量往往是在 **一次只预测一个 token** 时出现——

这正好抵消了它试图通过并行获得速度优势的初衷。

## TiDAR：扩散模型的并行 + 自回归的质量

如何破解这个“鱼和熊掌”的难题？

英伟达团队在论文中提及了一个核心思想：扩散思考，回归表达。

> Think in diffusion, Talk in autoregression.

具体而言，TiDAR 的思路是：

一次 forward，把扩散的并行和自回归的验证放在一起完成。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

每步分成 3 类 token：

1. **前缀 token** ：已经生成的内容，用因果注意力，可缓存
2. **上一步的草稿 token** ：自回归方式验证，能接受的加入前缀，不能的丢弃
3. **下一步的预草稿 token** ：用双向注意力并行生成多组候选，根据验证结果选择对应的一组

所有这些步骤，都依靠 **结构化注意力掩码（structured attention masks）** 在一 次前向计算中完成，不需要两次推理，不需要两个模型。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这样做为何能成立且有效？因为它解决了四个方面的难题。

首先是，“起草”能力强。 该方法的草稿模型，其实就是 **主模型本体** 。使用的权重完全相同，而不是一个弱小的附属模型。因此草稿质量高，因为完整模型的表达能力都在参与起草。

其次，并行生成。 扩散式注意力允许同时生成多个 token。这利用了前面提到的 **“免费 token slot”** 特性。

### 第三，质量有保证。自回归式的拒绝采样确保输出质量和纯 AR （自回归）模型一致。你采样的是链式分解后的联合分布（chain-factorized joint distribution），而不是互不关联的独立边缘分布。

### 最后，单次前向。起草与验证是同步进行的，不再分多个步骤串行。

**训练方式**

TiDAR 的 Attention Mask 是混合式的（也就是混合注意力）：

- 对 prefix 做因果 attention
- 对草稿块内部用双向 attention

不同于扩散模型的复杂 masking，TiDAR 的训练做得非常简单：  
**在扩散区域把 token 全部 mask** 。这将带来三点好处：

1. **稠密损失信号** ：每个 token 都参与训练，信号密集
2. **容易平衡损失** ：AR 与 Diff 区域 token 数一致， 不依赖随机 mask
3. **训练-推理一致性** ：推理时草稿区域本来就是全 mask，不会分布不一致

## 新方法有多快？近6倍

研究团队在实验中发现，这种新方法带来的效果增益十分显著，数据相当硬核。

> TiDAR 1.5B：平均每次 forward 生成 7.45 个 token → 比 Qwen2.5 1.5B 快 4.71 倍（质量一致）
> 
> TiDAR 8B：8.25 token/forward → 比 Qwen3 8B 快 5.91 倍（质量几乎不变）

也就是说，在不影响质量的情况下，相较于主流加速策略，TiDAR 这种新方法可以将推理速度提升至近6倍。

而在具体的基准任务评测中，质量和 Token 生成速度也都十分能打。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**编码任务：（准确率，单次前向计算token生成数）**

- HumanEval：43.29%，6.50 token/NFE
- MBPP：41.40%，9.25 token/NFE
- MBPP+：61.11%，9.43 token/NFE

**数学任务：**

- GSM8K：53.90%，5.07 token/NFE

这些分数与基础自回归模型相当或更好，但一次 forward 不是生成 1 个，而是 5–9 个。

备注：所有测试均在 H100 + batch size=1。同时， 没有 custom kernel，只用 PyTorch + FlashAttn2。

**大模型的推理系统或要重做一遍**

**这一新方法的提出，可以说将会对大模型推理系统的整个技术栈的运行逻辑、性能行为带来重大的影响。**

**包括 LLM 在一个完整的推理服务系统里怎么消耗算力、怎么占内存、怎么安排 attention mask、怎么部署模型等等，统统都会发生变化。**

## 1\. 内存流动方式变得更高效了

传统方法：

- 两个模型来回切换（主模型 + draft 模型）
- KV cache 不断写入、丢弃、重复计算
- 显存像搬家一样一直在“挪东西”

TiDAR： 所有事情在一次 forward 内搞定。

- 一个模型
- 一套权重
- KV cache 更精确管理
- 前缀 token 会按因果方式正常写入缓存；
	- 被拒绝的草稿 token，其对应的 KV cache 会被立即清理；
	- 完全不需要像纯扩散式方法那样重新计算。
- 不来回搬数据

结果就是： 显存压力更小、 GPU 更少浪费时间等待数据。

## 2\. 底层算子会更快跑

TiDAR 用到了结构化的注意力 mask + Flex Attention。优势在于：

- mask 不需要每次重新算
- kernel 执行路线更清晰
- 每次推理的启动时间更短

> ps：有了 Flex Attention，加速更彻底。你可以在初始化时只创建一个大型 attention mask，后续只根据当前前缀长度切片（slice）即可。无需在每一步重新计算动态 mask。

**这也是属于工程师一看会拍大腿：“这玩意更好调度！” 的那种进步。**

## 3\. 在线服务部署更简单

之前做 speculative decoding 的公司常常抱怨： “一套模型已经够折腾了，再来一个 draft 模型？上线要出人命。”

TiDAR 的好处是： 只要一个模型，就是全套流程。 **整个架构非常适合在线服务。**

- 部署时不需要对齐两套权重
- 不需要给 draft 模型设置额外超参数
- 整体架构更清爽

对任何做云服务的团队来说： 越少的模型，越少的雷。

## 4\. 硬件利用率更高

TiDAR 的 trick： 找到 GPU 上那些“几乎免费”的 token Slot，把它们填满。

H100 上的表现是：

- 正常算力没变
- 但吞吐能暴涨 5–6 倍
- 延迟能瞬间压到 200ms 级别

**这也是系统优化所带来的质变** ：不降低输出质量的情况下， 系统更顺滑 。

## 5\. 批处理（batching）也受影响

对于 batch=1 的实时应用（对话、代码补全），TiDAR 简直是提速神器。当然 对于 batch 很大的吞吐场景，它的优势没前者那么夸张。

这在工程上就意味着：现有的LLM 调度策略可能也要重新设计了。

基础设施成本可砍掉8成

更重要的是，不止对于大模型厂商及研发人员有重要影响，对于我们生产和应用侧也会带来质的变化。

如果你在规模化运行 LLM 推理，吞吐量几乎直接等于基础设施成本。吞吐提升 5 倍，就意味着你只需要五分之一的服务器；或者在同样的机器数量下服务 5 倍的用户。

对于对延迟敏感的应用，比如：代码补全、对话式 AI、实时分析，速度提升能让过去“太慢而无法使用”的交互变得可行。从 1 秒响应缩短到 200 毫秒，本质上改变了整个用户体验。

而在正确性至关重要的任务中，质量保证更不可妥协：生成代码、解数学题、抽取结构化数据，都不能容忍质量下降。TiDAR 在不牺牲准确性的前提下提供速度优势。

## 现实中的三点限制

TiDAR 并非没有代价。一位 相关研究人员读完这种新方法后，发现了三点限制。

首先，是上下文的问题。

> 该方法在训练时需要将序列长度加倍，因为要在输入中拼接带掩码的 tokens。这会让长上下文扩展变得更昂贵——不是做不到，但需要使用像 context parallelism 这样的专门方法。

其次，Batch size 的影响也很显著。

> 论文中 5–6 倍的加速来自 batch size = 1 的场景，这是延迟敏感且明显受限于内存带宽的设置。当 batch size 变大时，系统会从“内存受限”转向“算力受限”，TiDAR 的相对优势会缩小。
> 
> 而实际生产系统恰恰是混合情况：有些请求必须 batch 1，有些则可以合批求吞吐。TiDAR 在前者中表现突出，在后者中维持不错的竞争力。

最后，硬件本身也是关键变量。“Free token slots” 现象是在 H100 上测得的。更旧的 GPU、不同的内存架构、不同厂商的芯片，可能会呈现不同的曲线。核心机制普遍成立，即通常都存在额外 token 基本免费的一段区间，但具体数值会变化。

巧的是，研究团队在论文中针对前两点给出了回应。

**对于长上下文扩展的问题。研究团队认为，与标准自回归模型相比，TiDAR 并不存在结构上的长上下文能力限制。**

当前实现需要在训练时因附加掩码 token 而将序列长度加倍，因此我们把针对 TiDAR 的高效长上下文扩展方法（例如专门为其设计的 context parallelism）留待未来工作继续探索。

对于第二点，Batch size 不同，竞争优势不明显的问题，团队也给出了解法。

> 在论文中，主要关注 batch size = 1 的效率基准，但这并不意味着 TiDAR 无法处理更大的 batch size。
> 
> 我们不仅可以在解码过程中以零样本方式调整 block（draft）长度，以适应不同的算力配置，还能在 FLOPs/token 指标上达到具有竞争力的表现。

## 不依赖开源系统，可复现

注意，这项成果非常新，不到 5 天前刚刚发表的。

但这是第一次，有一种架构能够在保持自回归（AR）模型质量的同时，实现接近扩散模型的并行生成能力。无需在速度和正确性之间做取舍，也不需要维护独立的草稿模型，更不存在额外的串行开销。

当然，目前还只是论文展示的结果。还需要更多的社区、更多的时间进行复刻和独立验证。

尤其是其“免费 token 槽位”这一提出，真的惊艳到了。

它不仅揭示了LLM训练和推理的两者截然不同的瓶颈现状：训练可以靠钱和算力堆上去，但推理却受制于物理层面的因素——内存带宽、延迟、功耗。

同时，英伟达团队提出的方法可以说是为更好的推理架构提供了一种更高效的思路。

TiDAR 展示出：解决“推理受限于内存带宽”这一问题，并不一定要靠“买更大的 GPU”或“等下一代硬件”

通过架构创新：重新设计注意力结构和 token 生成方式，可以从现有硬件中榨出更多性能。

不论 TiDAR 是否最终成为行业标准，或成为未来改进方案的基础，这类思路都值得深入理解。

值得注意的是， 这套新架构本身不依赖任何闭源系统，细节也很充分 ，所以对于业内感兴趣的朋友来说，复现起来并不难。

如果其优势在独立实验中得到验证，很可能在几个月内就会被部署到生产环境中。

华人团队，功不可没的大模型推动者

最后多说一嘴，今年以来，一个很明显的感受是，大模型最强的战场已经从模型规模转移到了提高 **推理速度、降低推理成本上** 。而小编发现，华人团队在这方面的工作功不可没。

从 DeepSeek 的自研“混合读写注意力机制”、到Kimi、清华、阿里等产学研共建的高效开源的推理架构 Mooncake，再到今天这篇华人团队的 TiDAR 的奇作，每一个都给业界带来了很大的惊喜，大大向前推进了大模型在国内甚至全球范围内的普及。

向他们致敬！

论文地址：

https://arxiv.org/pdf/2511.08923

参考链接：

https://medium.com/gitconnected/why-your-llm-is-wasting-96-of-your-gpu-f46482d844d1

——好文推荐——

[Gemini 3.0正式发布，LMArena 总榜第一，屠榜所有评测](https://mp.weixin.qq.com/s?__biz=MjM5ODI5Njc2MA==&mid=2655931564&idx=1&sn=1e6a9caa2b432da56911d761400836e1&scene=21#wechat_redirect)

[马斯克新模型屠榜，包揽前二！网友：拿来写小说很疯狂！马斯克：已经没有真正能考AI的测试题了，终极测试是现实世界](https://mp.weixin.qq.com/s?__biz=MjM5ODI5Njc2MA==&mid=2655931538&idx=1&sn=d5fc01511d09903db8398e47dece287e&scene=21#wechat_redirect)

[大模型知道自己在瞎说，但是无法停下来！华人团队研究发现：2000token以后，大模型就开始表演“词语沙拉”，纯浪费钱](https://mp.weixin.qq.com/s?__biz=MjM5ODI5Njc2MA==&mid=2655930949&idx=1&sn=f7ff3f5010993bf7db4ce0a2dd80cb15&scene=21#wechat_redirect)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

51CTO技术栈

向上滑动看下一个