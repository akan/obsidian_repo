---
title: "OpenAI把Transformer训练成「几乎全零」，黑箱首次被彻底揭开"
source: "https://mp.weixin.qq.com/s/0vwvmfZKnj7PQxnaTNsF2w"
author:
  - "[[让你更懂AI的]]"
published:
created: 2025-11-14
description: "可解释性新路线"
tags:
  - "稀疏训练"
  - "计算电路"
  - "可解释性"
abstract: "OpenAI通过强制Transformer在训练中保持权重稀疏，首次清晰分离出模型内部的计算电路，实现了对Transformer黑箱机制的可验证理解。"
---
Original 让你更懂AI的 *2025年11月14日 11:47*

![Image](https://mmbiz.qpic.cn/mmbiz_gif/Psho9dm7oDHKVtfYDubjKdZRUjAfBQQicXjoZWJ3qnK42ooD4eeJUfJBM4SSZVa2RE5lO0j6rWwzliby0j9u4bDg/640?wx_fmt=gif&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=0)

  

## OpenAI 做了一件几乎没人敢尝试的事：把 Transformer 的权重在训练中直接压到近乎全零，强迫它用极少的连接完成所有计算。在这种极端约束下，模型内部真正承担推理的“计算电路”第一次以可分离、可验证、可操控的方式显形。这大概是我们迄今最接近理解 Transformer 内部机制的一次时刻。

  

大模型时代里，Transformer 的黑箱感其实早已成为共识。无论是查看注意力头、分析激活分布，还是构造反事实示例，所有常用手段都会在 dense Transformer 的层间混叠里碰壁：上万条通道挤在同一空间，很难看出清晰的结构。

  

OpenAI 这篇 *Weight-sparse Transformers Have Interpretable Circuits* 选择了完全反向的路径，不是在 dense 模型上做事后解释，而是 **在训练的第一步就阻止模型变 dense** 。  
  

权重在训练全程保持接近全零，模型必须在极少的连接里完成任务。冗余路径被压到最小之后，那条真正用于推理的最短因果链——论文中的 **计算电路（circuit）** 便以清晰且可追踪的形式露出来。

  

意外之处在于：这些电路不仅能描述模型计算过程，还具备因果上的可验证性。你可以单独操作其中的节点、预测 dense Transformer 的错误模式，甚至让 dense 模型按照稀疏电路的方式发生响应。

  

某种程度上，这篇论文提出了一种新的可能性： **Transformer 并非天生不可解释，它只是从未在可解释的训练方式下成长。**

  
  

![Image](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhglSsD5QgNDK2yPQ3QVd7fNBpRcKRN98LPZtHzXmNjR6Xj3AFEPK9clsZnPtrvh4ePYIpsEPoPtCGw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

  

  

论文标题：

Weight-sparse transformers have interpretable circuits

论文链接：

https://cdn.openai.com/pdf/41df8f28-d4ef-43e9-aed2-823f9393e470/circuit-sparsity-paper.pdf

  

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

方法

如果说 dense Transformer 像一座道路四通八达的大城市，那么 OpenAI 的做法就是在训练伊始把绝大多数道路封掉，只留下少数主路。所有计算都不得不沿这几条通道进行，而真正负责任务的那条路径，也在这种约束下格外清晰。

  

整个方法可以概括为三步： 训练阶段保持高度稀疏 、 让电路结构自动显形 、 再让它能解释 dense 模型 。

1.1 训练时强制稀疏：从源头上避免 dense

OpenAI 没有采用“先 dense 再剪枝”的老方法，而是直接规定： **每个权重矩阵在任意训练时刻都只能保留固定数量的非零值。**

于是每一层都在重复：

- forward：正常计算
- backward：正常更新
- projection： **只保留最大 k 个权重，其余全部归零**

模型从头到尾都处在极端稀疏状态。这样带来三个直接效果：

- 冗余连接无法形成
- 功能很难混叠
- 每个子任务都被迫集中到少数路径

  

训练框架在论文中被画成了一个非常清晰的流程图。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

▲ 图1.从稀疏训练到抽取最小计算电路的整体流程。模型在全程保持极端稀疏，通过节点剪枝得到完成任务所需的最小结构。

1.2 让模型自己暴露关键节点

为让最小电路显形，作者在 residual channel、attention 输入输出等位置加入 gate。模型训练过程中会自然把某些 gate 打开、另外一些保持关闭，从而告诉我们： 完成这个任务，我只依赖这些路径。

  

gate 的形式写成：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

细节不必深究，只需知道： 最终被 gate 激活的节点，就是模型真正用到的因果单元。

  

在字符串闭合引号任务中，稀疏模型最终只留下 12 个节点和 9 条边（见下图），整个推理链像蓝图一样干净。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

▲ 图2.字符串闭合引号任务所抽取的计算电路

## 1.3 更复杂的推理：嵌套括号深度

嵌套括号比引号复杂得多，但稀疏模型给出的电路仍然规整。模型在看到 `[`时写入一个“开括号特征”，再用单一注意力头把所有历史的这一特征聚集起来做平均。不同的平均值代表不同的嵌套深度，输出位置再根据深度决定生成`]` 还是`]] ` 。

  

dense 模型里，这类行为会分布在多个头和大量 residual 通道上，彼此覆盖，不容易分清。但在稀疏模型中，则是一条稳定的链路。  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

▲ 图3. 稀疏模型计算括号深度的电路示意

## 1.4 Bridge：让稀疏模型解释 dense Transformer

稀疏模型结构清晰，但 dense 模型才是我们在生产环境中真正关心的主体。Bridge 的目的就是把两者联系起来，让稀疏电路成为 dense 的“解释接口”。

它分两步：

- 将 dense 每层的激活映射到稀疏模型（dense → sparse）
- 再把稀疏激活映射回 dense（sparse → dense）

  

并用 NMSE loss 对齐：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

对应结构在下图中给出：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

▲ 图4.Bridge 使用线性映射对齐 sparse 与 dense 的中间激活，使得两者可以互相转换并保持混合路径的性能。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

实验  

电路抽取出来之后，一个核心问题紧随而来： 这条路到底是不是模型真正依赖的？ 实验部分基本就是对这个问题的系统验证。

  

2.1 电路规模的规律性

dense Transformer 抽出的最小电路大小变化非常大，在同一任务上可能忽大忽小，看不出规律。论文把 dense 与稀疏模型的规模放在同一张图里。dense 的点散得比较开，而稀疏模型的点集中得多，基本沿着一条稳定带状分布。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

▲ 图5. 稀疏模型在所有任务上的最小电路规模显著更小，在相同损失下约比 dense 模型小 16 倍。

稀疏结构不仅减少参数，也让任务分工更稳定。

2.2 模型越大，电路反而更小

随着稀疏模型从小规模逐步增大，性能会上升，但最小电路规模却在缩小。dense 模型通常是反方向：越大结构越发混杂。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

▲ 图6.更大的稀疏模型拥有更小的计算电路与更高性能

这组结果说明：可解释性与能力并非一定对立，有可能同时提升。

  

## 2.3 稀疏电路能推断 dense 模型的错误

在嵌套括号任务中，稀疏电路显示：模型用平均注意力聚合所有 `[ `。如果序列过长，平均值被稀释，深度信息容易丢失。于是稀疏电路推断：dense 模型在长序列上会把深度 2 当成深度 1。

  

OpenAI 构造长序列 adversarial 测试验证了这一点。dense 模型的错误率随长度上升，与稀疏电路的判断几乎一致。  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

▲ 图7.dense 模型在长序列上出现与稀疏电路预测一致的 context dilution 错误模式。

这是一个很典型的例子：结构化解释可以推断模型的失败。

  

## 2.4 电路可以影响 dense 模型

最后的实验展示了一个更强的结果：借助 Bridge，对齐后的稀疏电路可以直接影响 dense Transformer 的输出。

  

在区分 `'` 和 `"` 的任务里，研究者调整稀疏模型中有关引号差异的通道激活，再映射回 dense，dense 模型的输出概率会随之平滑偏移。  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

▲ 图8. 通过 Bridge，对稀疏模型的可解释激活进行调整后，可连续影响 dense 模型的输出概率。

这说明电路不仅能解释 dense 行为，还能驱动 dense 行为。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

结语

  

这篇论文展示了一种不同的可解释性思路： 不是在 dense Transformer 上做事后分析，而是让模型在训练过程中自然长成可以被解释的结构。

  

在高度稀疏的权重约束下，Transformer 的功能不再扩散，而是集中在少量关键路径上。这些路径——计算电路——可以被提取、理解、验证，甚至用于操控 dense 模型的决策。

  

从整体实验来看，用稀疏训练获得的电路：

- 有稳定的因果含义
- 可以预测 dense 模型的行为
- 也能反过来调整 dense 模型的输出

  

这为未来提供了一个新的方向：随着模型规模继续增长，我们也许可以同时追求结构化、可控、可验证的内部组织方式，而不只是盲目增加密度。

  

Transformer 或许第一次展示了自己内部结构的清晰轮廓。

  

**更多阅读**

[![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=MzIwMTc4ODE0Mw==&mid=2247709834&idx=1&sn=2986fb95731ad97b3c473dad0bec0ad1&scene=21#wechat_redirect)

[![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=MzIwMTc4ODE0Mw==&mid=2247709503&idx=3&sn=eede2987d8a2ac7125285ebfb7aa9d1f&scene=21#wechat_redirect)

[![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=MzIwMTc4ODE0Mw==&mid=2247709412&idx=2&sn=b9fd526b87e266001c746686cb9c2078&scene=21#wechat_redirect)

  

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**# 投 稿 通 道 #**

**让你的文字被更多人看到**

  

  

如何才能让更多的优质内容以更短路径到达读者群体，缩短读者寻找优质内容的成本呢？ **答案就是：你不认识的人。**

  

总有一些你不认识的人，知道你想知道的东西。PaperWeekly 或许可以成为一座桥梁，促使不同背景、不同方向的学者和学术灵感相互碰撞，迸发出更多的可能性。

  

PaperWeekly 鼓励高校实验室或个人，在我们的平台上分享各类优质内容，可以是 **最新论文解读** ，也可以是 **学术热点剖析** 、 **科研心得** 或 **竞赛经验讲解** 等。我们的目的只有一个，让知识真正流动起来。

  

📝 **稿件基本要求：**

• 文章确系个人 **原创作品** ，未曾在公开渠道发表，如为其他平台已发表或待发表的文章，请明确标注

• 稿件建议以 **markdown** 格式撰写，文中配图以附件形式发送，要求图片清晰，无版权问题

• PaperWeekly 尊重原作者署名权，并将为每篇被采纳的原创首发稿件，提供 **业内具有竞争力稿酬** ，具体依据文章阅读量和文章质量阶梯制结算

  

📬 **投稿通道：**

• 投稿邮箱： hr@paperweekly.site

• 来稿请备注即时联系方式（微信），以便我们在稿件选用的第一时间联系作者

• 您也可以直接添加小编微信（ **pwbot02** ）快速投稿，备注：姓名-投稿

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**△长按添加PaperWeekly小编**

  

  

🔍

  

现在，在 **「知乎」** 也能找到我们了

进入知乎首页搜索 **「PaperWeekly」**

点击 **「关注」** 订阅我们的专栏吧

  

·

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

PaperWeekly

向上滑动看下一个