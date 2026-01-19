---
title: "租了8张H100，他成功复现了DeepSeek的mHC，结果比官方报告更炸裂"
source: "https://mp.weixin.qq.com/s/dS5pwWewPAxoPabmtvm13g"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2026-01-19
description: "10924倍信号放大，远远超过DeepSeek论文中的3000倍。"
tags:
  - "架构复现"
  - "信号放大"
  - "稳定性约束"
  - "规模化验证"
abstract: "工程师Taylor Kolasinski通过租用8张H100成功复现了DeepSeek提出的流形超连接架构，并在17亿参数规模下观测到比原论文更严重的信号放大现象，验证了Sinkhorn投影对稳定性的关键作用。"
---
*2026年1月19日 16:51*

机器之心编译

  

元旦期间，DeepSeek 发布的 mHC 震撼了整个 AI 社区。

  

简单来说，DeepSeek 提出的 mHC 通过将传统 Transformer 的单一残差流扩展为多流并行架构，并利用 Sinkhorn-Knopp 算法将连接矩阵约束在双拟随机矩阵流形上，成功解决了超连接（HC）在大规模训练中因破坏恒等映射属性而导致的数值不稳定和信号爆炸问题。更多详情请参阅《 [刚刚，梁文锋署名，DeepSeek 元旦新论文要开启架构新篇章](https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&mid=2651010187&idx=1&sn=cc9ae88f676873468dcfc98d54e98aa9&scene=21#wechat_redirect) 》。

  

时至今日，这篇让众多读者大呼看不懂的论文依然是技术社区关注的一大焦点。解读分享这篇论文就好像已成为一种技术时尚。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9WT9AH5D1x90Ezw7sMeD14VNUWI9adiaSqribkZiavwWb6ylMFfyfib9zLbSr4A4f61P8qnXQ23IJGVA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

但还有更加硬核的，近日 FlowMode 工程师 Taylor Kolasinski 宣布成功复现了 mHC，并且在测试中还取得了比 DeepSeek 原始论文更好的成绩 ！

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

评论区也是直呼「不明觉厉」：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

目前，Kolasinski 正通过一个 mHC 复现系列博客介绍其复现成果，相关博客已经发布了 2 篇。这里我们进行了整理，以飨读者。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

- 博客 1：https://taylorkolasinski.com/notes/mhc-reproduction/
- 博客 2：https://taylorkolasinski.com/notes/mhc-reproduction-part2/

  

  

博客一：DeepSeek 的 mHC：当残差连接发生爆炸

  

你使用过的每一个 Transformer 模型都采用了 2016 年以来的同一种残差连接设计。

  

GPT-5、Claude、Llama、Gemini。在底层，它们做的事情都是一样的：x + F (x)。信息流只有一条，穿过网络，每一层都向其中添加内容。

  

DeepSeek 提出了一个问题：如果它变得更宽会怎样？

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

设置

  

标准残差连接是每一个现代 Transformer 的脊梁。其思路很简单：

  

  

其输入原封不动地流过，加上该层的输出。这是一条单一的信息流。进去是什么，出来的就是什么加上一个学习到的更新量。这就是为什么 Transformer 可以深达数百层：梯度有一条干净的向后路径。简单。稳定。自 2016 年以来未曾改变。

  

超连接（ Hyper-Connections ） 采取了不同的方法。它不再是单一流，而是扩展到 n 条并行流，并带有可学习的混合矩阵：

  

  

下图对比了标准残差与超连接：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

三个矩阵控制着信息的流动方式：

  

- H\_res：信息流在残差路径中如何混合（红色的交叉部分）
- H\_pre：信息流在进入层之前如何组合
- H\_post：层的输出如何分配回各个流中

  

超连接表达能力更强。参数更多，但计算开销几乎可以忽略不计。理论上性能更好。亦可参阅报道《 [字节豆包大模型团队突破残差连接局限！预训练收敛最快加速 80%](https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&mid=2650941988&idx=2&sn=1b35f2af9982c529a1c9217bfab24a02&scene=21#wechat_redirect) 》。

  

但问题是什么？那些混合矩阵是不受约束的。它们不仅能路由信号，还能放大信号。

  

爆炸

  

在激进的学习率下，作者的复现实验中超连接（HC）的信号放大达到了 7 倍，随后最终崩溃。Amax（行和列绝对值的最大值）衡量了一个矩阵能将信号放大多少。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

在 10M 参数的规模下，这也还行。但 DeepSeek 在 27B 参数下观察到了这种情况：

  

> 「Amax 增益幅度产生了极值，峰值达到 3000」

  

你没有看错： 三千倍 的放大。在 27B 参数下，不受约束的 HC 不仅仅是漂移，而是爆炸了。这里的 10M 复现中达到的 9.2 倍正是这种指数级故障的早期预警。

  

也因此，不受约束的混合矩阵在规模化时会崩溃。微小的放大呈指数级复合。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

压力测试： 在激进的学习率下，HC 的信号放大在崩溃前达到了 7 倍。mHC 保持平稳，维持在 1.0。

  

修复：约束流形

  

DeepSeek 的修复方案很干净：将混合矩阵约束为 双重随机（doubly stochastic） 。

  

一个双重随机矩阵具有以下特性：

  

- 所有条目非负
- 行之和为 1
- 列之和为 1

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

这意味着混合操作只能对流进行加权平均。它可以路由信息，混洗它，融合它。但它不能放大。

  

DeepSeek 是如何做到塞？使用 Sinkhorn-Knopp 算法。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

该算法非常简单：

  

1. 从任意矩阵（原始学习到的权重）开始
2. 取指数使所有条目变为正数：P = e^H
3. 归一化行，使每一行之和为 1
4. 归一化列，使每一列之和为 1
5. 重复 3-4 个步骤，直到收敛

  

就是这样。交替进行行和列的归一化。二十次迭代就足够了。

  

这个过程是可微分的。梯度可以回传穿过所有二十次迭代。网络学习原始权重 H，而 Sinkhorn 确保实际的混合矩阵始终是双重随机的。

  

  

当作者第一次看到这个时，感觉像是作弊。你不是在学习稳定性，而是在强制它。但有些属性不应该被学习；它们应该被保证。

  

技术说明：严格来说，只有递归矩阵 H\_res 需要完整的 Sinkhorn 双重随机处理。它是层层复合误差的那个。输入 / 输出混合器（H\_pre，H\_post）仅通过 sigmoid 进行有界处理。Sinkhorn 的计算成本只花在最重要的地方。

  

结果

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

不同种子的结果（深度 24，3 个种子）

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

HC 在原始性能上获胜：验证损失 0.88 对 1.12。在 10M 参数下，mHC 约束就像是一种稳定性税；你付出的是表达能力。但在 27B 参数下，这种税是防止你的模型爆炸成 NaN 的唯一手段。

  

但看看方差。HC 的损失在不同种子间的变化是 mHC 的 3 倍（±0.033 vs ±0.012）。至于 Amax？HC 根据种子的不同在 6.1 到 7.6 之间摆动。mHC 是 1.00。每一个种子。每一次运行。零方差。

  

在 10M 参数下，这种不稳定性是可以存活的。HC 仍然获胜。但在 27B 参数下，那 6-7 倍的放大变成了 3000 倍。在这个规模下你无法赌博。

  

深度扩展

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

作者还扫描了从 6 到 24 层的深度（保持约 11M 的常数参数预算）：

  

- 损失随着深度增加而改善，直到不再改善。深度 20 达到了甜蜜点（0.85 验证损失）。
- 深度 24 略有退步（0.93），这是由于为了将维度缩小到 192 而产生的宽度瓶颈。
- Amax 是不可预测的。深度 20 飙升至 9.2 倍。深度 12 达到 6.6 倍。深度 8 保持在 4.3 倍。没有清晰的关系；HC 是混沌的。

  

实验细节

  

- 数据集： TinyShakespeare（约 1M 字符，字符级）
- 模型： GPT-2 架构，约 10M 参数
- 训练： 5000 步，AdamW (β1=0.9, β2=0.95)，权重衰减 0.1，余弦 LR 衰减
- 硬件： Apple M 系列 (MPS)
- 深度扫描： 8 种配置（6-24 层），调整宽度以维持约 11M 参数
- 种子变异： 3 个种子（42, 123, 456），深度 24

  

为什么这很重要

  

残差连接不仅仅是帮助梯度流动的技巧。它们是一种守恒定律。

  

在物理学中，守恒定律约束了可能发生的事情，但使预测成为可能。你不能制造永动机，但你可以精确计算球会落在哪里。

  

残差连接中的恒等映射是类似的。它通过防止任意变换来约束网络，但它保证了稳定性。信号幅度被保留。

  

HC 打破了守恒；mHC 恢复了它，不是通过回归到恒等映射，而是通过找到一个更丰富的、仍然守恒信号的流形。

  

2016 年，何恺明等人引入 ResNets 来解决梯度消失问题，确保信号不会消亡。十年后，相反的问题出现了：超连接带来的信号爆炸。恒等映射通过被动的方式解决了第一个问题。mHC 通过强制守恒解决了第二个问题。

  

每一个残差连接都是一种守恒定律。mHC 强制执行了它。

  

不是黑客手段，不是技巧。这是一个原则性的约束，使架构能在规模化下工作。

  

要点总结

  

1. 流持久性 Bug 让人学会谦卑 。作者的第一个实现看起来是对的。公式与论文相符。代码能跑。但当把输出投影回单一流并在每一层重新扩展它，扼杀了并行架构。「超连接」中的「超」部分实际上没做任何事。三次独立的审计都说「看起来是对的」。Bug 是架构上的，不是数学上的。作者是在问了「等等，层与层之间流动的实际形状是什么？」之后才发现的。
2. 约束不是限制；它们是保证 。双重随机投影强制了稳定性。你不是在学习好的行为。你是在让坏的行为变得不可能。作者表示自己的第一反应是：「这不优雅。这是束缚。」但其实，HC 达到了 7 倍放大才是重点。
3. 无聊的选择能规模化 。标准残差连接自 2016 年以来一直存活，不是因为它们是最优的，而是因为它们是稳定的。HC 表达能力更强但脆弱。mHC 找到了一个中间地带：比标准残差表达能力更强，且带有稳定性保证。

  

博客 2：10,924 倍：17 亿规模下的不稳定炸弹

  

下面是 mHC 复现系列的第 2 部分。第 1 部分 展示了 10M 参数量下的不稳定性。现在，要扩大规模了。

  

在第 1 部分中，作者在 TinyShakespeare 数据集上训练了一个 10M 参数的 Transformer，并目睹了超连接（Hyper-Connections）将信号放大了 9.2 倍。DeepSeek 的论文 报告称在 27B 参数下放大倍数达到了 3000 倍。现在我们也扩大规模看看。

  

为了这次运行，作者租用了一个 8x H100 的节点。以下是他的发现。

  

规模跃迁

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

10924 倍信号放大！这远远超出了 DeepSeek 论文中的 3000 倍 。

  

实验

  

这篇博客记录的是作者在三种架构上进行的 18 次实验，包括：

  

- Residual：标准的残差结构，即 x + F (x) 作为基线；
- HC：采用无约束混合矩阵的超连接（Hyper-Connections）；
- mHC：采用 Sinkhorn 投影的流形超连接（Manifold Hyper-Connections）。

  

每种架构分别在两种网络深度下进行（32 层和 48 层），并使用三个随机种子（42、123、456），因此每种配置运行 3 次。

  

所有模型均在 C4 数据集上训练 5000 步，采用 bf16 混合精度。其中 32 层模型参数量为 17.3 亿（1.73B）；48 层模型参数量为 25.4 亿（2.54B）。

  

主要结果

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

首先，在 Loss 表现上：所有方法的收敛表现几乎一致。

  

三种方法最终都收敛到相近的 loss 区间（约 5.4–6.0）。整体学习曲线几乎完全重合：HC 并没有学得更快，mHC 也没有变慢。从实验结果来看，引入 Sinkhorn 投影几乎没有额外代价。

  

其次，Amax 表现出强烈的不稳定性。Amax 是用来衡量混合矩阵对信号的放大程度，Amax = 1.0 表示对信号不放大（中性）；数值越高，表示信号被放大的程度越强。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

实验中发现，在深度为 32 时，HC 的 Amax 值飙升至 6500 倍，并伴随着剧烈的波动，而 mHC 值则稳定保持在 1.0。在深度为 48 时，这种模式再次出现：HC 猛增至 3500 倍，而 mHC 值保持不变。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

Scaling Laws

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

在对 Amax 与模型参数规模进行 log–log 绘制后，可以观察到明显的放大趋势：当模型规模为 1000 万参数时，Amax 约为 9.2 倍；在 17 亿参数规模下，这一数值跃升至 10924 倍；

  

而公开数据中，DeepSeek 的 270 亿参数模型对应的 Amax 约为 3000 倍。基于趋势线外推，模型规模达到 100 亿参数时，Amax 可能上升至约 50000 倍，在 1000 亿参数量级下，甚至可能接近 400000 倍。

  

实验结果并未显示出任何自我修正的迹象，相反，随着模型规模扩大，不稳定性呈现出持续加剧的趋势。值得注意的是，该实验中的 17 亿参数模型所表现出的不稳定性，甚至高于参数规模更大的 DeepSeek 模型。

  

这种差异可能源于架构设计、训练配方或测量方法的不同；批大小、学习率与网络深度之间的相互作用，也使得尺度效应并非严格单调。

  

尽管具体数值会受到多种因素影响，但这种不稳定性是客观存在的、可以被量化的，而且规模不容忽视。

  

可复现性

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

此外，在三个不同的随机种子下，实验都呈现出完全相同的模式：所有 HC 的训练过程都会发生爆炸，而所有 mHC 的训练过程始终保持平稳。不同随机种子下的 loss 曲线几乎完全重合，两种方法的学习速度也一致。

  

唯一的差别在于模型内部正在发生的事情：HC 在不断积累不稳定性，这种不稳定性可能在任何时刻被引爆；而 mHC 则始终维持着自身的结构完整性。

  

逐层分析：不稳定性从哪里开始的

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

这里有一个令人惊讶的发现： 不稳定性始于输入端，而非输出端 。

  

HC 的第 0 层（可视化图表中的顶行）率先变红，随后其混合矩阵在训练初期就突破了 Amax 2.0，而更深层的网络则保持相对稳定。看起来问题不在于深度，而在于第 0 层 —— 这是唯一一层直接吞吐原始输入的层。

  

为什么是第 0 层？ 不同于深层网络前面有 LayerNorm 把关，第一个混合矩阵直接面对原始 Embeddings。其他每一层看到的都是经过归一化、变换后的表征，但第 0 层必须硬抗 Embedding 表吐出的任何数值。如果尺度（scale）没有完美匹配，第 0 层就会学习去补偿。

  

而在 HC 中，「补偿」可能就意味着「放大」。反观 mHC，在所有层级和所有训练步数中都呈现均匀的绿色。Sinkhorn 投影在限制最大值的同时，也完全防止了任何层发生漂移。

  

信号流：视觉展示

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

在第 3000 步时，一个进入 HC 网络的信号在输出时被放大了 532 倍。而同样的信号经过 mHC 输出时倍率为 1.000003 倍，本质上保持不变。

  

LayerNorm 和非线性模块似乎「收拾」了大部分烂摊子，但这意味著它们消耗了模型容量，仅仅是为了去抵消上游制造的混乱。

  

这正是守恒定律的体现，它表明残差连接应当保持信号的幅度：输入了什么，就应当输出什么（再加上学习到的残差）。

  

HC 打破了这一规则，任由信号失控螺旋上升，而 mHC 则守住了底线。

  

压力测试

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

正常的训练使用了 1e-4 的学习率。如果加大强度会发生什么？作者在 3 倍于正常学习率的条件下进行了压力测试：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

深度 64 的模型在 Amax 达到 14765 倍后，开始在 2000 倍到 10000 倍之间剧烈振荡，同时，混合矩阵彻底失控。

  

反观 mHC，在所有配置、所有学习率下都表现得平坦、稳定且「无聊」，数值始终保持在 1.0。

  

意料之外：HC 模型并未崩溃

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

有一个作者没想到的结果：所有的 HC（Hyper-Connections）运行实验都没有崩溃。

  

信号放大了 14765 倍，在深度 32 时放大了 10924 倍。Loss（损失）没有发散，训练也没有出现 NaN。模型仍在继续学习。

  

这是一种「定时炸弹」般的场景。不稳定性确实存在，但尚未导致灾难性的失败…… 至少目前还没有。

  

为什么没炸？作者列举了以下几种可能性：

  

- 梯度裁剪力挽狂澜 。将范数裁剪在 1.0 防止了最严重的梯度爆炸，这几乎肯定就是拯救了这次运行的关键。
- 5000 步还不够 。如果训练时间再长一点，它可能就会爆发。
- 这些模型还太小 。在 100B（千亿）参数规模下，动力学特性可能会有所不同。
- 稳妥的解读是： HC 正在积聚不稳定性，在不同条件下可能会被引爆，而 mHC则完全消除了这种风险 。

  

重访守恒定律

  

在第 1 部分中，作者将残差连接定义为了一种守恒定律，即「每一个残差连接都是一条守恒定律，mHC 强制执行了它。」

  

1.7B 参数规模的结果让这一点变得具体：HC 违反了守恒，信号在训练过程中增长了 10000 多倍。而 mHC 强制守恒，信号保持稳定。具体地，

  

- 在 10M（一千万）参数时，违反守恒是可以存活的。作者在第 1 部分中看到的 9.2 倍放大虽然烦人，但尚在可控范围内。
- 在 1.7B（十七亿）参数时，这就是个炸弹。10924 倍的放大意味着一个本该是量级 1 的信号，现在变成了 10924。梯度更新在与这种放大对抗，而优化器必须做额外的工作来补偿网络内部的混乱。

  

这还仅仅是在 5000 步的时候，如果训练更久、推高学习率、或者扩展到 10B 参数，在某个临界点，炸弹就会引爆。

  

mHC 不仅仅是降低了不稳定性，而是彻底消除了这种故障模式。

  

从这次运行中学到了什么

  

一是，GPU 3 挂了。8 张 H100 中的一张在特定实验中不断报错 CUDA 错误。作者浪费了一个小时调试「代码问题」，才意识到是硬件故障。云端 GPU 是会坏的。

  

二是，Batch size（批次大小）的限制是真实的。2.5B 参数的 d48 模型无法在 batch size 为 8 时塞进显存。作者不得不降到 batch size 4。这意味着不同深度下的「每步 token 数」不同。

  

虽然同一深度下 HC 与 mHC 的对比依然有效（batch size 相同），但跨深度的对比就不那么完美了。

  

要点总结

  

如果正在实现超连接：

  

- 使用 Sinkhorn 投影。这里大概只有 10 行代码，却消除了一种在大规模下感觉真正危险的故障模式。
- 在训练期间监控 Amax。如果你看到它爬升超过 10 倍，则是在积聚不稳定性。
- 第 0 层是「金丝雀」（预警指标）。特别密切关注你的输入混合矩阵。如果你的基础模型有一个不稳定的第 0 层，微调期间的词表变更或 Embedding 漂移可能会导致网络不稳定。
- 该约束没有性能代价。mHC 的 Loss 与 HC 完全一致。

  

代码和数据

  

数据是公开的，代码即将发布。

  

- 主要实验: wandb.ai/taylorkolasinski/mhc-part2
- 压力测试: wandb.ai/taylorkolasinski/mhc-part2-stress

  

作者表示，包含训练脚本的仓库即将推出。W&B 仪表板拥有每次运行的完整配置、指标和系统日志。实验在一个 Lambda Labs 的 8x H100 SXM5 节点上运行，耗时约 17 小时。

  

下一步计划

  

目前有两个悬而未决的问题：

  

- HC 真的会失败吗？ 作者看到了 10924 倍的放大，但训练没有发散。这是一种潜在风险，还是说训练时间更长就会导致失败？
- Scaling Law 是什么？ 10M → 9.2 倍。1.7B → 10924 倍。到了 10B 会发生什么？

  

作者想探索 Scaling Law 到 10B 参数，趋势线表明那里可能出现 50000 倍的放大。那个实验技术上已经准备好了，但需要计算预算的大幅提升。

  

© THE END

转载请联系本公众号获得授权

投稿或寻求报道：liyazhou@jiqizhixin.com

继续滑动看下一个

机器之心

向上滑动看下一个