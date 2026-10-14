---
title: "不用一滴梯度！斯坦福暴力掀翻大模型黑盒：纯数学两行公式，直接向AI写入千亿记忆"
source: "https://mp.weixin.qq.com/s/aD0a9BrNqt5eBHheoe5O5w"
author:
  - "[[SignalRu]]"
published:
created: 2026-10-14
description: "不用一滴梯度！斯坦福暴力掀翻大模型黑盒：纯数学两行公式，直接向AI写入千亿记忆"
tags:
  - "斯坦福"
  - "赫布定律"
  - "闭式构造"
  - "MLP"
  - "免训练"
  - "记忆写入"
  - "信息论最优"
  - "Transformer"
  - "事实编辑"
  - "热插拔"
  - "无梯度"
abstract: "斯坦福Hazy Research实验室提出基于赫布定律的闭式公式，无需梯度下降即可将海量事实以信息论最优密度直接写入Transformer的MLP层，并实现模块级事实热替换。"
---
![信号废墟 · 扫描全球AI动态，直击产业变革现场](https://mmbiz.qpic.cn/sz_mmbiz_gif/UQ0gHic28SYjfbNp99GtHw5f47NZZQ2mjX6HUJqkUPByQpptgprgvGr0j2wfnTlwibOfMz7KWyBhASLDicuClvNyuq484YgTyTLpYJN4enzkBk/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

当你问任何一个大语言模型：“法国的首都是哪里？”  
它几乎不需要0.1秒的迟疑，脱口而出：“巴黎”。

这看似是一句废话般的常识  
但如果把这个问题抛给全球顶尖的计算机科学家，他们会陷入长久的沉默： **这个事实，到底被存放在了模型千亿参数里的哪一个角落？  
它是怎么被塞进去的？  
又凭什么能被精准提取出来？**

在过去近十年里，全人类对大模型的训练，本质上就像在进行一场浩大的“炼丹”。  
我们把数万亿字的人类文明数据倒进算力熔炉，烧掉成百上千万度电，任由梯度下降算法在数以千亿计的权重里疯狂游走。  
最后，模型学会了常识，但没有任何一个人能拿出一份清晰的电路图，指出“巴黎”究竟刻在哪个晶体管或权重上。

直到2026年秋天，顶级学术会议 COLM 2026 上，斯坦福大学著名的 **Hazy Research 实验室** （由知名学者 Christopher Ré 领衔）公布了一项震动学界的突破性成果。

![Roberto Garcia 会期主帖卡片](https://mmbiz.qpic.cn/mmbiz_jpg/UQ0gHic28SYg5icNxibaSltOOzf4CibN4I0HUibCCxDyicEKId5QrDDFoz1yOvvKrGweX7LibdACT4f6eN0bbVQ5Q9kdMfic4to3mCtgqEeiaPvMUQeM/640?wx_fmt=other&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

▲ 论文共同一作 Roberto Garcia 在 COLM 2026 会期发帖：大模型正以信息论最优速率在 MLP 中存储事实，而这一切可以用无训练公式直接构造

他们用一篇题为《MLPs are Hebbians: Constructing Efficient Fact-Storing MLPs for Transformers》的论文，彻底撕开了大模型记忆机制的黑盒。

研究团队给出了一个几乎颠覆直觉的答案： **大模型记事，根本不需要靠漫长的梯度下降训练！**

他们写出了一张极其纯粹的数学闭式配方。  
只需两行公式、零次反向传播、不费一秒GPU训练时间，就能像给U盘拷贝文件一样，把海量事实 **以逼近信息论物理极限的密度** ，直接“刻”进神经网络的前馈层（MLP）中，而且插进标准的 Transformer 架构里，模型立刻就能调用！

![Hazy Research 博客文首](https://mmbiz.qpic.cn/sz_mmbiz_jpg/UQ0gHic28SYgmrfvqxDReQ0LicrkWR5Q2jZjGbCsvzFiagOB5Isw82VicLqnIvYXy7Od25wXuvCfPUstQItibDgrbs7ZH8zia1IZFr0cIGuJrD1aM/640?wx_fmt=other&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

▲ 斯坦福 Hazy Research 实验室发布的官方技术长文：揭示大模型记忆背后的简单配方

这一发现，不仅终结了大模型可解释性领域长达数年的路线争论，更意味着： **我们可能正在从盲目的“AI炼丹时代”，跨入精密的“神经网络机床时代”。**

## 01破解黑盒账本：从“单神经元”到“信息论极限”

要理解斯坦福这项突破有多硬核，我们得先看懂AI大厦此前撞上的一堵高墙。

在 Transformer 模型的内部，主要由两套齿轮驱动：一套是 **自注意力机制（Attention）** ，它像一双眼睛，负责在上下文里搜寻信息，“看看这句话里谁和谁有关”；  
另一套则是跟在后面的 **前馈多层感知机（MLP）** ，它占据了整个模型近三分之二的参数量。

很长一段时间里，MLP就像一个巨大的死机箱，没人说得清它到底在算什么。

直到2021年，以色列学者 Geva 等人在顶级自然语言处理会议 EMNLP 上发表了一篇里程碑论文，首次提出了一个极具穿透力的暴论： **Transformer 的前馈层，本质上就是一个巨大的“键值对（Key-Value）查表字典”。**

![Allen-Zhu 与 Li 知识容量缩放律论文摘要](https://mmbiz.qpic.cn/sz_mmbiz_jpg/UQ0gHic28SYhkJetJpXLtDxbbYhmsemYr9OxibChexdMMzicgY9Xexx4vPTZWjI6dJv4saiaSM3dC5cPbwxAkLhHEnD7a9924PqQ1p6ehcibWTTY/640?wx_fmt=other&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

▲ 微软与斯坦福学者关于大模型知识容量缩放律的研究：揭示模型能以每参数约 2 比特的极致速率存储事实

这套机制的逻辑其实非常直观：

1. **输入投影层是“暗号检测器”（Keys）：**
	负责辨认当前文本出现的模式。比如识别到“法国的首都”这个输入模式；
2. **输出投影层是“答案投影仪”（Values）：**
	负责在词表空间里把“巴黎”这个词的概率猛推上去；
3. **神经元是抽屉：**
	随后的实证研究（如 Dai 等人发现的“知识神经元”）甚至发现，如果硬生生把模型里某几个神经元的电流掐掉，模型就真的会瞬间“失忆”，彻底忘记法国的首都是巴黎。

听起来很完美对不对？  
但紧接着，数学家们察觉到了严重的不对劲。

如果真是一个神经元对应一条事实，大模型的容量早就该被撑爆了！2024年，微软学者 Allen-Zhu 与 Li 的著名研究《大语言模型物理学》给出了一个令人倒吸凉气的经验测算： **在训练良好的大模型中，平均每个模型参数，能死死咬住整整 2 个比特的独立事实知识！** 随后 Morris 等人的研究更是将非预期记忆容量推到了每参数 3.6 比特。

这是什么概念？  
这是 **信息论意义上的物理天花板**

如果按照旧理论“一个神经元存一条事实”，参数量必须随事实数量线性狂飙，模型的利用率将低得像一架漏洞百出的破车，根本不可能支撑起如今大模型表现出的恐怖百科知识储备。

既有的旧理论，全错了

大模型绝不可能在拿单个神经元当抽屉使。  
在这座黑盒深处，一定藏着某种精巧绝伦、此前从未被人类看破的高维数学编码。

## 02斯坦福的惊天顿悟：MLP 的本质是“赫布记忆”

解开这个谜题的，正是斯坦福 Hazy Research 的研究员们。  
他们放弃了在现有模型里盲目“切片解剖”的探针路线，转而发起了一场漂亮的逆向工程： **既然看不清你是怎么存的，那我就亲自动手，用数学公式造一个给你看！**

他们从脑科学最古老、最著名的定律中找到了钥匙， **赫布定律（Hebbian Learning）** 。

1949年，心理学家唐纳德·赫布提出了神经科学的基石法则：“ **一起激发的神经元，彼此会连接得更紧密** （Cells that fire together, wire together）。”  
在经典计算物理中，把一组组关联信息的外积直接累加起来，就能构成一个在受到部分刺激时自动还原全貌的“联想记忆矩阵”。

![Jerry Liu 解释“MLP 即赫布记忆”](https://mmbiz.qpic.cn/sz_mmbiz_jpg/UQ0gHic28SYhjL13xfYeeqHS36ZRwDRl55OgbmYNjk5h7CwFoDatyuwF5HcmczX1Ysye8T9wibrQT4ibPlYLev4fcCKnzYfcyxGhObybOS4xuM/640?wx_fmt=other&from=appmsg&watermark=1#imgIndex=4)

▲ 论文共同一作 Jerry Liu 发推解析：门控 MLP 的本质，正是投影到高维特征空间后的赫布记忆系统

斯坦福团队的灵光一现正在于此： **现在大语言模型标配的“门控前馈网络”（Gated MLP），在数学形式上，根本就是一个被核函数包装起来的分布式赫布联想记忆体！**

在模型内部，事实以分布式形态存在  
每一个事实，都会被门控投影投射成整个高维空间中的一道复杂涟漪。  
数以万计的涟漪在高维空间相互交织、重叠穿插，却因为高维正交性的奇迹，彼此之间谁也碰不着谁！

基于这个洞察，团队给出了一个让整个学界目瞪口呆的闭式构造公式：

![闭式构造公式配图帖](https://mmbiz.qpic.cn/sz_mmbiz_jpg/UQ0gHic28SYj3ia8icTgnTw056JL2USGyrEYIcmwoq4pwkWEZY2zVdyWJguIibTK6XB59J79ddYQdM25gFTqkDTxvoibAAUia68IsXibk6S4ooS9ag/640?wx_fmt=other&from=appmsg&watermark=1#imgIndex=5)

▲ 团队公布的核心构造逻辑：无需损失函数，无需反向传播梯度下降，矩阵直接由外积闭式求和生成

对于一个标准形式的门控网络 $\\text{MLP}(x) = B \\cdot \\phi(x)$，构造过程简单到了令人发指的地步：

- 输入投影矩阵 $A$ 和 $G$？ **直接用标准高斯分布随机撒点生成！**
- 输出投影矩阵 $B$？ **直接把所有要存储的事实键值对，做一个外积求和！**

**整个过程无需设定损失函数与学习率，更不必运行优化器做梯度下降。**

就像拿印章盖戳一样，把几万条百科事实的数据塞进去，数学公式在毫秒之内直接算出一组确切的权重参数。

把这组无训练生成的参数装进模型，奇迹发生了： **它不仅能存，而且存得极度精确，完全契合人类对该架构的最高预期。**

## 03撞碎理论天花板：最少参数，扛住最脏的噪声

更具颠覆性的突破，在于对极限效率与抗噪能力的双重刷新。

计算机科学界早就有人提出过各种免训练构造记忆的算法（比如著名的神经切切空间核 NTK 方法）。  
但过去的所有算法都有一个致命伤： **纸上谈兵。**  
它们在数学证明里很美，但在实践中需要消耗极其天文数字般的神经元，参数效率低得可怕。

斯坦福团队在这篇论文里，完成了一场教科书级别的数学收割：

![Jerry Liu 解析容量缩放与实测数据](https://mmbiz.qpic.cn/mmbiz_jpg/UQ0gHic28SYg72Syt2Oy9JDibmV0f67h0gS0cAzKqVRgox8x7Nc5Hk9saGqiasRtBibuTtrsD8PZcmerKia6p7qFC5BBttoCF0aYy2W7TQyqMqOg/640?wx_fmt=other&from=appmsg&watermark=1#imgIndex=6)

▲ 论文共同一作 Jerry Liu 展示容量缩放实验：赫布构造以最优速率 $W = \\Theta(F \\log F)$ 存储事实，比既有 NTK 基线节省数个数量级参数

在严格的数学推导下，他们证明了这套赫布构造的参数规模 $W$ 与存储事实总数 $F$ 之间，完美达成了：$$W = \\Theta(F \\log F)$$

这是多值联想事实存储在 **信息论意义上的绝对物理下界** ！在同等事实规模下，它消耗的参数比以往的方法 **少整整 10 到 10,000 倍** ，甚至在扩展趋势上直接追平了耗费海量算力死磕梯度下降才训出来的神经网络。

更关键的考验在于： **它能被实际的 Transformer 模型用起来吗？**

在实际运行中，Transformer 里的自注意力层往往伴随着杂音扰动。  
当输入“法国的首都是”时，注意力机制传递给 MLP 模块的隐藏向量，往往裹挟着来自上下文其他词汇的干扰信号。

过去的许多理论记忆模型，一旦遇到带噪声的查询信号，整个召回系统瞬间瘫痪。

斯坦福团队为此建立了一套严格的 **解码间隔（Decoding Margin）** 分析体系。  
他们证明：只要高维特征空间的间隔足够坚固，哪怕注意力模块扔过来一个被噪声污染的脏信号（例如“法国”的向量被严重偏移），输出层依然能够凭借高维相似度的势能差，像磁铁吸铁屑一样，精准无误地把正确答案“巴黎”死死吸出来！

研究人员将这套完全由数学公式手工捏出来的 MLP，严丝合缝地扣进了一个完整的 Transformer 架构块中。

在多项事实召回评测中，这块从没见过哪怕一次梯度的“数学构造记忆”，在整机协同下展现出了惊人的稳定性。  
它用实打实的证据证明了： **大模型能够容纳海量知识，本质是一场严格受物理与信息论规律支配的高维几何收敛。**

## 04“模块热插拔”时代：给大模型换大脑，就像拔插U盘

这项研究在产业界和极客圈引发狂欢的，不仅仅是纯粹的理论证明，更是它顺带解锁的一个极度诱人的工程奇迹， **MLP 模块级事实热替换（MLP Swapping）** 。

长期困扰整个大模型工程界的最大噩梦是什么？  
**灾难性遗忘（Catastrophic Forgetting） **与** 事实知识编辑（Fact Editing）** 。

假设某家公司的CEO换届了，或者某条法律法规更新了。  
在现有的技术范式下，你要么花大价钱对模型进行微调（Fine-tuning），但往往改好了一个事实，模型原本会做数学题的逻辑模块却突然崩溃了；  
要么就只能采用庞杂的外挂检索增强（RAG），但上下文长度和调用成本又居高不下。

现在，如果大模型的记忆就是一块符合严格外积规则的赫布矩阵，会发生什么？

![模块化事实编辑结果帖](https://mmbiz.qpic.cn/mmbiz_jpg/UQ0gHic28SYhT0AdHsml9AXAHFF8CGFuRJNC9Ric0RHZFMapGEzqKTYI6bVwyPWTevv30lAj9uWBMbkhEw3np5S9KLDzm3wz3RQjKA5icB6W1o/640?wx_fmt=other&from=appmsg&watermark=1#imgIndex=7)

▲ 事实编辑性能对比：在大规模事实变更测试中，斯坦福提出的赫布替换方案（高位平坦曲线）展现出了碾压传统微调基线的恐怖鲁棒性

研究团队做了一个极具科幻感的实验：他们冻结住整个 Transformer 架构的所有注意力参数，仅仅拿出其中的事实存储 MLP。  
利用闭式配方，把包含新知识的赫布矩阵重新算一遍，然后像 **更换汽车火花塞、拔插电脑U盘一样** ，把新的 MLP 原地替换进去！

结果惊掉了所有人的下巴：在需要连续修改高达 10% 事实记忆的极限压力测试中，过去业内顶尖的知识局部编辑算法（如 ROME/MEMIT 等方案）编辑成功率早已一溃千里，暴跌至惨不忍睹的 30% 左右；

**而斯坦福的这块“即插即用赫布 MLP”，编辑成功率依然几乎稳定在 100% 的满分横线上！** 它不仅改对了所有新事实，而且对原有无关任务的语义能力几乎毫发无损。

![相关线性赫布记忆容量论文摘要](https://mmbiz.qpic.cn/mmbiz_jpg/UQ0gHic28SYjPTyaFSS6XYE0B9mCicicdUmoC039yZg9sialSuLEIChh34V8mSMWribNlSMEuSCeS1XoL7eInaicC08TOoDLkkTO7bw3phM1wq8Cc/640?wx_fmt=other&from=appmsg&watermark=1#imgIndex=8)

▲ 学术界同行 Juno Kim 发帖加入讨论：指出此前团队关于线性赫布记忆容量的研究，并与非线性拓展形成共鸣

在 COLM 会场内外，这场讨论迅速引发强烈共鸣。  
知名AI研究者 Andrew Carr 转发感慨：“我们居然可以直接在初始化阶段就把全部知识写入网络，这正是通往终身学习（Continual Learning）的关键一步！” 更有学者在评论区探讨：“如果能做到免训练构造，模型或许终于能实现在线持续写入，让旧记忆永不退磁。”

研究团队也在技术博客中坦陈： **目前这套技术主要在受控单层网络与数学构造验证集中完成，如何直接逆向抽干工业级预训练大模型原本的权重，依然是摆在学界面前的未解难题。**

但毫无疑问，一扇此前从未被发现的大门，已经被这群数学家猛力踹开了一道缝隙。

## 05从粗放炼丹，走向精密机床

回望过去几年人工智能的狂飙史，人类像极了一群无意间捡到外星飞船残骸的原始人。

我们发现只要往引擎里疯狂倒煤炭（投喂算力和数据），飞船就能轰鸣起飞，甚至能带我们跨越星辰。  
但在很长一段时间里，没有任何一个原始人懂得飞船内部的管线原理，我们只能把这一切统称为神迹，称之为“涌现（Emergence）”。

而斯坦福团队这项工作的伟大之处，正在于它坚决地 **向这种不可知论宣战** 。

它用确凿的代数公式清晰展示：那些被百亿参数紧紧锁住的人类文明记忆，正是高维空间里的多项式特征映射，是严格遵守信息论最优法则的赫布联想晶格。

一旦大模型的记忆变成了可解构、可度量、甚至可以用铅笔在草稿纸上写出解析解的数学实体，一个全新的时代也许就不远了：

**在未来的某一天，我们或许再也不用为了让AI记住一段新的知识，而烧毁整座发电厂。**

工程师们只需轻轻敲下一行闭式代数指令，千亿事实的记忆宫殿，便会在千分之一秒内，悄无声息地精准重组。  
那一天，将是AI彻底告别粗暴炼丹、正式步入精密工业科学的破晓时分。

![信号废墟 · 扫描全球AI动态，直击产业变革现场](https://mmbiz.qpic.cn/mmbiz_jpg/UQ0gHic28SYiaLjE2rBdAXCfY1DJ7anP46odiagicicaJFMicfzyuEfOtJHPQ2lLDcicE8BzqACoQvFBicLHuGkwh21thrjMLo37nmehdZH2yV5KxaE/640?wx_fmt=other&from=appmsg&watermark=1#imgIndex=9)

Author's tip: 个人观点，仅供参考