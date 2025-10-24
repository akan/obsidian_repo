---
title: "Meta打碎Transformer 8年铁律！改写AI最底层规则，模型首次冒出潜意识"
source: "https://mp.weixin.qq.com/s?__biz=MzI3MTA0MTk1MA==&chksm=f0f89418e9de6aac4a9ac1356edd2b6f806000a8628d424f0d54ce55ac8ee9ca9aefab75a087&idx=2&mid=2652638319&sn=221ab4a3b57e2935787d66b3b1ec475e#rd"
author:
  - "[[新智元]]"
published:
created: 2025-10-24
description: "Transformer要「变身」！"
tags:
  - "自由Transformer"
  - "潜在随机变量"
  - "模型潜意识"
  - "推理性能提升"
  - "计算开销低"
abstract: "Meta提出自由Transformer模型，通过引入潜在随机变量让AI在生成前进行内部规划，显著提升推理能力且仅增加少量计算成本。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/UicQ7HgWiaUb1ZJPmFmvzIcMna3AichYXmJrt29Akic1THdJ36SyWJTGXbgxLc6aOzUtNMWCJrFxfV8nq0LEmsTF9A/0?wx_fmt=jpeg)

新智元 [新智元](https://mp.weixin.qq.com/) *2025年10月24日 10:07*

### 新智元报道

编辑：定慧

##### 【新智元导读】AI最底层规则要被改写，当模型先打腹稿再开口，AI还只是一只概率鹦鹉吗？

Transformer 可以说整个LLM的基石，但这个基石要松动了！

8年了！持续了8年的Transformer底层架构似乎要被 Meta 打破了。

Meta推出 「 **自由Transformer」（ Free Transformer ）** 新模型在AI架构领域引发社交媒体热议。

首次打破自2017年以来所有GPT模型的核心规则：不再是逐token盲猜式生成，而是在生成前能 「预先思考」 。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb1ZJPmFmvzIcMna3AichYXmJV5af7eBW0SDhbfTQef85I3jVsrkPzLXlh0ERq5Jvqp53D3BcoK5e0g/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

论文地址：https://arxiv.org/pdf/2510.17558

研究者在解码器中引入了 **潜在随机变量Z** ，让模型在输出前进行内部采样与规划，相当于为Transformer增加了一层 「潜意识」 。

这一创新仅增加约3%的计算开销，却显著提升了模型在推理与结构化生成上的表现，在 **GSM8K、MMLU、HumanEval** 等测试中超越更大规模的模型。

Meta称，这可能是第一种「有内在意图」的Transformer。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

**用潜在随机变量打造机器「潜意识」**

Meta在解码器中加入了潜在随机变量(Z)。

可以将其视为生成文本前的「潜意识层」，模型会采样内部选择来引导整个序列的风格或结构。

从技术上讲，这是通过内置在Transformer内部的条件变分自编码器(VAE)实现的。

Meta将其命名为 Free Transformer。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb1ZJPmFmvzIcMna3AichYXmJHGCVgv74vppMgTnNQrdOtqQoRNGXnV93icg9LOD3BV7iaiag97GgJpiaJA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

不同Transformer架构如何处理名为Z的随机隐藏状态。

  

图中第一个展示的是标准Transformer，仅根据前序token预测下一个token。

  

第二个架构增加了随机状态Z，并在训练时使用额外的编码器网络来推断每个样本对应的隐藏状态。

  

第三种架构名为Free Transformer，简化了这一过程。它直接在模型中间层注入随机状态，而非使用独立的全编码器。在训练过程中，编码器仍被使用一次，以帮助模型学会如何选取良好的隐藏状态，但它仅与网络的一部分协同工作。

  

在推理过程中，编码器被跳过，随机状态Z被直接采样。

  

这种设计使模型能够早期做出全局决策，帮助它在没有太多额外计算的情况下产生更一致和稳定的输出。

因此，一半模块充当共享编码器，其余模块则基于该潜在上下文进行解码。

在常规设置中，若使用随机隐藏状态，每次生成文本时都必须同时使用编码器和解码器。

这会使成本翻倍。

自由变换器避免了这一点。

它在训练过程中学习共享的内部结构，之后便丢弃编码器。

在推理时，它直接采样隐藏状态并仅运行解码器。

与标准模型相比，这种设计仅增加约3-4%的FLOPs计算开销，大幅降低了计算负担。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb1ZJPmFmvzIcMna3AichYXmJbXNibXJWnPYUfnPYXfxOlUCIgSPibRS04s3uvIXgAxVtllAthgzqco7Q/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

它采用经典的VAE目标进行训练：

交叉熵损失+编码器分布 Q(Z|S)与先验 P(Z)之间的KL散度惩罚项。

Meta使用自由比特阈值(κ)来防止崩溃，仅在散度>κ时添加KL损失。

这使得Z能够编码有用结构（如主题、情感或模式位置）而不会过拟合。

采用KL散度惩罚结合自由比特方法，防止隐状态记忆整个序列。

该架构在堆叠层中部注入隐状态：将学习得到的向量添加到键值中，随后正常继续解码过程。

每个token对应的隐状态从65536种可能性中选取，由16个独立比特构建而成。

关键突破在于——它保留了条件变分自编码器的优势（有助于模型更好地规划），同时消除了通常使其不切实际的额外成本。

这样你就能获得一个更稳定、具有全局感知能力的Transformer，而成本几乎与普通Transformer相同。

它仅在训练期间增加约 3%的计算量就能实现这一点。

普通解码器仅依据已生成的标记来选择下一个标记，这导致它们较晚才能推测全局选择。

FreeTransformer先采样一个微小的随机状态，然后让每个标记都基于该状态生成。

训练时，通过条件变分自编码器将解码器与编码器配对，使模型学会生成有用的隐状态。

结果非常好！

在推理过程中跳过编码器，由均匀采样器选择状态，生成过程正常进行。

这为模型提供了早期的全局决策，减少了在出现小规模标记错误后的脆弱行为。

Meta训练了 1.5B 和 8B 的模型。

在GSM8K、HumanEval+和 MMLU等重推理基准测试中的表现显著提升。

1.5B模型 模型增益：

- HumanEval+得分提升 44%
- MBPP测试提升 35%
- GSM8K数学题集提升 30%
![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

计算开销仅增加3-4%即实现上述效果。

而且模型保持稳定，没有出现训练崩溃或异常波动。

自由变换器（The FreeTransformer）在架构中增加了一个随机的「隐藏思维层」。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

它不只是预测，而是先决策后预测，这可能标志着后自回归时代的开端。

一句话总结，一个微小的编码器添加了有益的偏差，使推理和编码更加可靠。

会思考的Transformer，不再只是「鹦鹉学舌」。

这可能是一个重要节点，Transformer的思维方式被重塑，从「预测下一个词」迈向「思考如何表达」。

**潜在变量Z到底学到了什么？**

以下是论文给出的测试例子。

合成序列具有固定长度，包含一个由随机字母重复8次构成、位于随机位置的「目标」，以及由感叹号组成的独立同分布噪声，还有一个提示目标字母的提示语。

- 每条样本以「字母+>」作为提示（如 K>）。
- 主体是一行固定长度的下划线 \_，在 **随机位置** 嵌入 8 个 **相同的大写字母** 组成的「target」（如KKKKKKKK）。
- 另外以1/16的概率把任一字符替换成!，形成独立同分布的噪声
![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

下图则展示了Free Transformer 在该合成任务上、不同K时的 **生成行为与潜变量Z所承载的信息** 。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

每个模型都给出两组方框：

- **蓝色方框** ：每条序列都独立采样一个Z。
- **绿色方框** ：整组序列共用同一个Z，便于看出Z是否「锁定」了某些全局属性。

随κ变大（信息从少到多）现象依次为：

1. **κ=log(2)/64（≈1/64 bit）** ：几乎不从Z编码有用信息，表现像普通无潜变量的解码器；绿色与蓝色差异很小。
2. **κ=log(2)/8（≈1/8 bit）** ：Z先学会 **只编码target的位置** ；绿色方框中target位置在多条样本里保持一致，但噪声! 仍随机。
3. **κ=log(2)（1 bit）** ：Z进一步 **同时编码target位置与噪声模式** ；因此绿色方框的多条样本连! 的分布也很相似。
4. **κ=8·log(2)（8 bits）** ：Z承载信息过多，几乎「把整条序列塞进 Z」——导致 **训练/生成退化** （模型过度依赖 Z，输出反而不对）。

这张图用分组对比清楚地示范：允许更大的KL配额会让模型把更多「全局决策」搬到潜变量里；太少不够用，太多会塌陷。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**FAIR实验室是真的搞研究**

注意到，论文作者François Fleuret，来自Meta的FAIR实验室。

François Fleuret是一位机器学习领域的研究科学家与教育工作者。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

他目前担任 Meta Fundamental AI Research（Meta FAIR）「核心学习与推理」（Core Learning & Reasoning）团队的研究科学家。

而众所周知的是，FAIR是Yann LeCun领导的。

今天一个重磅新闻就是，小扎的超级智能实验又裁员了600人。

Yann LeCun都逼的出来发声明了：

「我没有参与任何Llama项目，一直由其他团队负责，我主要是研究超越LLM的下一代人工智能。」

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

上下滑动查看

从这个自由Transformer来看，Yann LeCun所言不虚。

虽然他一直反对LLM技术本身，但是这些创新也是拓展AI的边界。

希望小扎能好好对待这位图灵奖大佬。

参考资料：  

https://x.com/rryssf\_/status/1980998684801401302

https://arxiv.org/abs/2510.17558

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

继续滑动看下一个

新智元

向上滑动看下一个