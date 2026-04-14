---
title: "MIT, NVIDIA新论文 TriAttention 拆开 KV Cache 难题：为什么长推理一压就掉，根因可能在 RoPE 前"
source: "https://mp.weixin.qq.com/s/o9Ta0ul-QgjsSsz0V0kvfQ"
author:
  - "[[A不AI]]"
published:
created: 2026-04-10
description: "过去很多方法不是压得不够聪明，而是看错了信号"
tags:
  - "KV缓存压缩"
  - "旋转位置编码"
  - "注意力机制"
  - "长上下文推理"
  - "结构预测"
abstract: "MIT与NVIDIA的研究提出TriAttention方法，通过分析RoPE前的Q/K向量聚集特性来预测模型的距离偏好，从而实现更稳定高效的KV缓存压缩，显著提升长推理任务的性能和显存效率。"
---
Original A不AI *2026年4月7日 19:37*

很多人以为，长推理时代的 KV Cache 压缩，难点在工程。

显存不够，缓存太大，注意力矩阵太贵，所以我们只能想办法裁掉一部分 token。这当然没错，但 MIT Song Han 参与的这篇新论文《TriAttention: Efficient Long Reasoning with Trigonometric KV Compression》提出了一个更关键的判断：

\*\*过去很多方法不是压得不够聪明，而是看错了信号。\*\*

论文发表于 2026 年 4 月 6 日的 arXiv。它盯住的是一个非常具体、但又非常要命的问题: 现有不少 KV 压缩方法，会根据最近几步 query 对哪些 key 有注意力，来判断哪些 token 值得保留。

问题是，这些 query 本身在\`RoPE\`，也就是旋转位置编码里，会随着位置不断旋转。结果就是，你手里真正“有代表性”的 query 其实很少，观察窗口极短。某个 token 如果刚好在这几步里没被看见，就可能被系统提前清掉；但它也许会在后面几十步、几百步之后，突然变成推理链里不可替代的一环。

这也是为什么很多 KV 压缩方法在普通长上下文任务里还能工作，一到数学推理、递归推理、多轮 agent 任务里就容易崩。它们删掉的，不只是“暂时没用”的 token，而可能是“暂时沉睡、但之后必须被唤醒”的 token。

这篇论文真正有意思的地方，在于它没有继续沿着“观察最近 query”这条路往前卷，而是反过来问了一个更基础的问题：

\*\*如果 post-RoPE，也就是加完位置旋转之后的 query，不稳定，那能不能回到 pre-RoPE，也就是旋转之前的空间，找一个更稳定的信号？\*\*

论文的答案是，可以。而且这个信号足够强，强到能把“哪些距离上的 token 更容易被关注”直接推出来。

## 现有方法为什么会在长推理里掉链子

先把问题说直白一点。

KV Cache，可以理解成模型在生成过程中随时查阅的“历史记忆区”。上下文越长，生成越久，这块记忆就越大。对于现在动不动就上万 token 的长推理来说，它很快会把显存顶满。

所以业界一直在做 KV 压缩。核心思路也很统一：不是所有历史 token 都一样重要，那就保留未来更可能被 attention，也就是注意力机制，再次访问到的那些 key，把不重要的淘汰掉。

但这里的难点恰恰是“未来谁重要”。

像\`SnapKV\`、\`R-KV\`、\`LazyEviction\`这一类方法，大多会从最近一小段 query 的注意力分布里估计 key importance，也就是 key 的重要性。直觉上看这很合理，因为 query 真的在“看”谁。

可论文指出，这个思路有一个结构性缺陷：它们依赖的是\`post-RoPE query\`，也就是已经带着位置信息旋转过的查询向量。由于旋转角度会随 token 位置不断变化，越早的 query 越不再代表当前的朝向。真正还能拿来判断未来注意力的，只剩最近很小一截。

这意味着什么？

意味着模型在做重要性判断时，其实像是在透过一条很窄的观察缝看未来。这个窗口里没亮起来的 token，就很可能被误杀。

而推理任务偏偏最怕这个。因为很多关键中间状态不会一直高亮，它们经常会沉默很久，直到后面某一步才重新被调用。论文明确提到，这对\`retrieval heads\`，也就是那类负责从长上下文里重新捞回旧信息的注意力头，尤其麻烦。

## 论文真正的发现：pre-RoPE 里的 Q/K，不是散的，而是聚的

论文的转折点在这里。

作者没有继续看旋转之后的 query，而是回到\`pre-RoPE\`空间，也就是位置编码施加之前的\`Q\`和\`K\`向量。

作者发现，在 pre-RoPE 空间里，大量 attention head 的 Q 和 K 向量，并不是四散分布的，而是高度集中在一个\*\*固定的非零中心\*\*附近。论文把这个现象叫做\`Q/K concentration\`，也就是 Q/K 聚集。

这个结论很重要，因为它不是一句“好像有点规律”的经验描述，而是一个可量化的统计现象。论文用\`Mean Resultant Length\`，简称\`MRL\`，也就是“平均结果向量长度”，来衡量向量是否沿着某个稳定方向聚拢。直白一点看：

- 如果 MRL 越接近 1，说明这些向量越像一群朝着同一个方向排队的人
- 如果 MRL 越接近 0，说明它们更像在平面上乱散

论文在\`Qwen3-8B\`上看到的结果非常强。无论是数学、代码还是聊天域，\`MRL\`都在\`0.977\`到\`0.980\`之间，而且大约\`90%\`的 attention heads 都满足\`R > 0.95\`。这说明 Q/K 聚集不是某个数据集偶然长出来的模式，而更像是模型本身的内在性质。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这张图是整篇论文最关键的证据之一。它本质上是一个四联图。图A 展示 pre-RoPE 空间里 Q/K 向量在主频带上的分布，可以把它理解成“这些向量在二维复平面上的落点”；点越挤在一起，说明越聚集。图B 则展示经过 RoPE 旋转后，同样的点被拉成了弧线，说明 post-RoPE 里方向会随位置变化。图 C 说明这种聚集不是少数头的偶然现象，而是在几乎所有头里都存在。图 D 最重要，它把“距离”和“注意力 logit”对应起来，显示用三角级数重建出来的曲线和真实注意力走势高度相关，示例相关系数\`r=0.72\`。

也就是说，作者不是只发现“Q/K 很聚”，而是进一步证明了:\*\*正因为它们很聚，模型对不同距离的 key 会天然产生可预测的偏好。\*\*

## 从聚集到三角级数：为什么模型会天然偏爱某些距离

这篇论文最容易把人劝退的地方，是它中间有一段数学推导。但如果换成直白语言，其实逻辑并不绕。

RoPE 的本质，是在不同频带上给向量施加不同角速度的旋转。假如 pre-RoPE 里的 Q/K 已经都围绕一个稳定中心，那么你就可以先用这个“中心”近似真实 Q/K，再把它代回 RoPE 的公式里。

代回去之后，作者得到的不是一个依赖具体内容、具体 token 语义的复杂表达式，而是一个只和\`Q-K distance\`，也就是 query 到 key 的相对距离，有关的函数。这个函数可以写成一条\`trigonometric series\`，也就是三角级数曲线。

这一步的意义非常大。

它相当于告诉我们，某个 attention head 在很多时候，不是在随机决定“今天看哪个 token”，而是天然有一条“距离偏好曲线”。有的头偏好近距离 token，有的头偏好中距离，有的头会在某些更远的位置出现峰值。

换句话说，以前很多方法是在观察“模型刚才看了谁”；而 TriAttention 试图回答的是:

\*\*按照这个 head 的结构特性，它本来就更可能看向哪些距离。\*\*

这就是从经验观测，转向结构预测。

论文还做了一步验证。作者把由中心向量推出来的三角级数曲线，和真实 attention logit 去做 Pearson 相关，也就是皮尔逊相关系数。结果在三种不同架构的模型里，大量 head 的重建相关都落在\`0.6\`到\`0.9\`区间，均值高于\`0.5\`。这说明“距离偏好”不是一句好听的解释，而是确实能预测真实注意力。

## TriAttention 到底怎么做 KV 压缩

有了上面的发现，方法本身就顺下来了。

TriAttention 的核心不是直接保留“最近被看过”的 token，而是给每个 key 打一个更稳定的分数。这个分数主要由两部分组成。

第一部分是\`S\_trig\`，也就是三角级数分数。

它做的事情可以理解成：用离线校准阶段算出来的 Q 中心，结合当前 key 的信息，去判断“从距离偏好上看，这个 key 未来被 query 打到的概率大不大”。

第二部分是\`S\_norm\`，也就是基于向量范数的补充分数。

为什么还需要这一项？因为三角级数那套推导默认 Q/K 非常贴近中心，但现实里总会有偏差。有些 head 的聚集性没那么强，有些 key 虽然距离上看应该被关注，但自身范数太低，实际也不太会吃到高注意力。所以作者又把 norm，也就是向量长度，当成一个补充信号。

更关键的是，这两项不是硬拼，而是会根据\`Q/K concentration\`的强弱自适应调权。

- 如果某个 head 的聚集非常强，那就更多相信 S\_trig
- 如果某个 head 的聚集没那么强，那就提高 S\_norm 的权重

最后，系统对每个 key 得到一个综合分数，只保留分数最高的 top-K keys，把其余的淘汰掉。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这张图是方法流程图，适合从左到右读。第一列是离线校准阶段，先从 pre-RoPE 分布里估计 Q 的中心，也就是“这个 head 通常朝哪个方向”；第二列用三角级数得到\`S\_trig\`，它本质上是在给不同距离上的 key 预估未来注意力；第三列加入 norm 分数，形成最终综合打分；第四列则是压缩后的注意力图。图里最值得注意的，不是“剪掉了一些 token”，而是压缩后仍然保住了原始注意力里的主要结构，这说明它删掉的更多是“以后大概率不会再被看”的 key。

如果用一句更不数学的话来概括，TriAttention 其实是在做这件事：

\*\*不再盯着模型刚刚看了谁，而是先理解这个 attention head 天生爱看什么距离，再结合 token 自身强弱，决定谁值得留下。\*\*

## 实验结果为什么有说服力

这篇论文的结果强，不只是因为它在一个点上赢了，而是因为它同时打穿了三个层面：推理准确率、显存效率、真实部署。

先看最吸引眼球的 AIME25。

论文在\`Qwen3-8B\`上报告，TriAttention 在和 Full Attention 保持同等准确率\`40.8%\`的条件下，吞吐能做到\`2.5x\`；或者说，在保持同等准确率时，KV cache 内存占用可以压到原来的\`1/10.7\`。

更重要的是，对比基线\`R-KV\`时，优势不是几个点，而是近乎翻倍。

- 在固定 KV 预算下，AIME25 上 TriAttention 是 32.9%
- 同样预算下，R-KV 只有 17.5%
- 在 AIME24 上，TriAttention 是 42.1%
- R-KV 是 25.4%

在\`MATH 500\`上，它也不是靠“更激进地砍显存”换来的虚高结果。论文给出的数字是，在\`32k\`token 的场景里，只保留\`1,024\`个 KV token 时，TriAttention 还能做到\`68.4%\`，而 Full Attention 是\`69.6%\`。这已经非常接近满血表现。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这张图本质上是两张 trade-off 图。左图横轴是吞吐，纵轴是准确率，越靠右上越好；论文最想强调的是，在相同准确率\`40.8%\`的位置上，TriAttention 比 Full Attention 更靠右，意味着单位时间能跑更多 token。右图横轴是 KV cache 占满血版本的比例，越靠左说明越省显存，纵轴仍然是准确率。TriAttention 在和 Full Attention 同准确率的位置上，横坐标显著更小，对应的就是\`10.7x\`的内存压缩。这张图可以直接读成一句话：它不是“小掉一点效果换省一点显存”，而是“几乎不掉效果地把显存压力大幅打下来”。

## 记忆保持测试说明，它压的不只是“算子”，而是推理链

如果只看 AIME、MATH 这类数学题，很多人还是会觉得，提升可能只是因为某个数据分布刚好更适合。

所以论文又做了一个很聪明的测试：\`Recursive State Query benchmark\`，也就是递归状态查询基准。

这个测试本质上不是在考模型会不会算题，而是在考它能不能在很长的生成过程中，稳稳保住中间状态。因为递归任务会先一路向下展开，再在回溯过程中不断取回先前保存的状态。如果中间某一步的状态丢了，后面整串返回值都会被污染。

这非常像真实长推理里的情况。你前面某步结论暂时没用，但后面忽然要回来引用，一旦之前被 KV 压缩误删，整条链就断了。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这是一张四联图。前三个子图看的是不同数学基准上，准确率随着 KV 预算变化的曲线，横轴越往右代表保留的缓存越多，纵轴越高越好。TriAttention 的曲线在多数预算段都明显压过 R-KV，说明它不是只在极端配置下占便宜。第四个子图是递归状态查询测试，横轴是递归深度，也就是模型需要记住的中间状态层数，纵轴是成功率。随着深度增加，记忆压力会上升，但 TriAttention 保住曲线的能力更强。这张图支持的核心结论不是“它更会压缩”，而是“它更不容易把后面还会用到的状态误删掉”。

## 这篇论文最值得记住的，不是一个新技巧，而是一个判断反转

我觉得这篇论文最有价值的地方，不只是提出了一个叫 TriAttention 的方法。

它真正完成的是一次判断反转。

过去大家默认认为，KV 压缩应该围绕“最近真实注意力”做文章。因为注意力分数看起来最直接，模型刚刚注意谁，未来大概率也会继续注意谁。

TriAttention 说，不一定。

在长推理里，最近注意力反而可能是最不稳定的信号，因为它已经被位置旋转扰动过，而且只覆盖了很短一段观察窗口。相比之下，pre-RoPE 空间里的 Q/K 中心，也许才是更稳定的“结构性先验”。

这意味着，长推理时代的 KV 压缩，接下来可能会分成两条路线：

一条继续做 observation-based，也就是观察驱动的方法，拼的是怎么从历史注意力里挖更多线索。

另一条就是这篇论文代表的 structure-based，也就是结构驱动的方法。它不是去观察最近发生了什么，而是先弄清楚这个模型头部本来偏爱什么，再用这个偏好去预估未来。

从结果看，后者在长推理场景里已经显出了非常强的潜力。

## 更现实的一层意义：单卡 4090 跑长上下文 agent，不再只是口号

论文最后还给了一个非常工程化、也非常有传播力的案例。

作者把\`Qwen3-32B\`做成\`AWQ INT4\`量化，部署在一张\`RTX 4090 24GB\`上，去跑\`OpenClaw\`这个多轮 agent。这个任务的第一轮 prompt 就已经超过\`15k\`token，后面 agent 还要继续读取 6 份 markdown 文档并生成周报。

结果是：

- 用 Full Attention，KV cache 会一路膨胀，最后直接 OOM，也就是显存溢出
- 用 TriAttention，整个多轮任务能在预算内完成
![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 总结

TriAttention 这篇论文的核心价值，可以浓缩成一句话：

\*\*它把 KV 压缩从“根据最近注意力猜未来”，推进到了“根据 pre-RoPE 结构预测未来”。\*\*

论文先发现，pre-RoPE 空间里的 Q/K 向量高度聚集；再证明，这种聚集会让模型天然对某些 Q-K 距离产生稳定偏好；最后把这个规律落成一个由三角级数分数和 norm 分数组成的 KV 剪枝方法。

从实验上看，这套方法不只提升了显存效率，还更好地保住了长推理真正依赖的中间状态。AIME25 上，它在匹配 Full Attention 准确率时拿到\`2.5x\`吞吐，或者\`10.7x\`KV 内存压缩；在固定预算下，对 R-KV 形成了几乎翻倍的优势；在单卡\`4090\`的多轮 agent 部署里，它甚至直接决定了任务是“能跑完”还是“中途爆掉”。

这篇论文也许最值得收藏的一点，不是那个\`2.5x\`，也不是\`10.7x\`，而是它提醒我们：很多时候，推理系统真正缺的不是更猛的压缩，而是对模型内部结构更准确的理解。

## 参考资料

TriAttention: Efficient Long Reasoning with Trigonometric KV Compression，https://arxiv.org/abs/2604.04921

TriAttention GitHub，https://github.com/WeianMao/triattention

继续滑动看下一个

A不AI

向上滑动看下一个