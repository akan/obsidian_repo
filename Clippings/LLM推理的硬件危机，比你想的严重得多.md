---
title: "LLM推理的硬件危机，比你想的严重得多"
source: "https://mp.weixin.qq.com/s/FN7ETJAt7cYRAVd1Axrukw"
author:
  - "[[歪睿老哥]]"
published:
created: 2026-05-18
description: "过去十年，AI硬件的演进方向很单一。\x0a更大的芯片，更多的核心，更高的FLOPS。\x0a训练阶段确实需要这个，因为矩阵乘法是计算密集型。\x0a但推理阶段，尤其是解码阶段，核心瓶颈从来不是算力，是内存带宽、内存容量和通信延迟。"
tags:
  - "推理瓶颈"
  - "内存带宽"
  - "算力脱节"
  - "硬件架构"
  - "HBM成本"
  - "解码内存密集"
abstract: "大模型推理的硬件瓶颈在于内存带宽和容量不足，而非算力，需转向内存与通信优化。"
---
歪睿老哥 *2026年5月4日 20:05*

事情是这样的。

Google DeepMind的两位工程师最近发了一篇论文，读完了我盯着屏幕发了会儿呆。

Xiaoyu Ma和David Patterson，一个在Google DeepMind做系统架构，一个在UC Berkeley教计算机体系结构，顺便也兼任Google的杰出工程师，并且David Patterson还在2017年获得计算机领域的最高奖—图灵奖。

这俩人凑一块儿写的东西，不太可能忽悠人。

论文讲的是大模型推理的硬件。不是训练，是推理。

你可能分不清这两者的区别。训练就是喂模型数据让它学习，像学生上课。推理就是让学好的模型回答问题，像考试答题。

现在所有人都在讨论大模型有多厉害，但很少有人认真想过一个问题。

推理太贵了。

贵到OpenAI一年亏五亿美元，贵到微软在AI上烧掉的钱让人倒吸凉气。这不是模型不够好的问题，是现有硬件架构根本不适合推理。

论文里有一句特别直白的话。整个计算机体系结构的学术界，2025年的一篇顶级会议论文里，产业界的贡献不到4%。1976年这个比例是40%。

学术界和工业界几乎脱节了。

而他们觉得，恰恰是推理这个领域，最需要产业界的真金白银加学术界的严谨思考。

---

先说推理为什么这么费劲。

大模型推理有两个阶段，预填充和解码。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/6nRBwaCSDmHcGd4ly8iageaqpiaqVN5dibJndoJHTu6kZKSicjuchuibGTLu8d9wwt3fFUDkiclp3urBK1qvLzZXN6Bb9a8z8HPct6AOBZuIy7V6M/640?wx_fmt=jpeg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

预填充就是模型一次性读完你的问题，这个阶段是并行的，像做阅读理解。解码才是真正开始输出答案，一个字一个字往外蹦，像写作文。

预填充是计算密集型的，解码是内存密集型的。

关键来了。现在数据中心用的GPU和TPU，都是为训练设计的，或者说，是为预填充设计的。它们有强大的计算能力，有大量的高带宽内存。

但对解码来说，这些设计几乎全用错了地方。

解码阶段，模型每次只能输出一个token，要反复去内存里取权重和上下文。计算量其实很小，但内存访问开销巨大。这就好比你让一个跑步冠军去翻箱倒柜找东西，他的肌肉力量完全用不上。

更麻烦的是，近年的模型趋势还在不断加剧这个矛盾。

MoE架构让模型参数膨胀到成百上千倍。DeepSeek v3有256个专家，每次推理只激活一小部分，但权重总量大得吓人。长上下文让KV Cache越来越大，一个200K上下文窗口需要的内存量是普通窗口的几十倍。推理模型需要先生成大量"思考"token才能给出最终答案，这直接把输出长度拉长了数倍。

模型越来越大，上下文越来越长，推理越来越慢，而硬件架构十年没变过。

---

这里有一个特别有意思的数据。

从2012年到2022年，NVIDIA GPU的浮点运算能力涨了80倍。但内存带宽只涨了17倍。

算力在狂奔，内存在散步。

这两者的差距还会继续扩大，因为HBM越来越贵。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

HBM是现在GPU用的那种高带宽内存，像一摞饼干一样叠在GPU旁边。

2023到2025年，每GB容量的成本和每GBps带宽的成本都涨了1.35倍。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

而与此同时，普通DDR内存的成本在持续下降。同样的时间窗口里，容量成本降到了原来的0.54倍，带宽成本降到了0.45倍。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这个趋势很说明问题。HBM不是产能问题，是物理堆叠难度在上升。

每个HBM封装里的DRAM芯片数量越来越多，单颗芯片的密度越来越高，良率和封装难度指数级增长。

而传统的硅基内存技术还在按摩尔定律稳步前进。

论文里还提到一个更底层的问题。DRAM单芯片的密度增长正在减速。2014年发布的8-gigabit DRAM芯片，到2026年才实现四倍增长，这个速度比过去每3到6年翻一番慢了太多。

用SRAM全部替代DRAM的方案也走不通。

Cerebras和Groq都试过用超大芯片加满SRAM来绕过DRAM和HBM，结果呢？大模型上线之后，片上SRAM容量根本不够用，两家都不得不后来 retrofit 外挂DRAM。

硬件这条路，不是换条路就能绕过去的。

---

所以接下来这篇论文真正有价值的部分来了。

两位作者提出了四个有前景的研究方向，每个都直击推理硬件的核心痛点。

第一个是高带宽闪存。HBF，High Bandwidth Flash。

这个概念是SanDisk先提出来的，后来SK海力士也加入。做法很简单粗暴，把闪存芯片像HBM一样堆叠起来，获得接近HBM的带宽，同时容量是HBM的十倍以上。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

一个HBF封装有512GB容量，读取带宽1638 GBps。对比HBM4是48GB容量但同样1638 GBps带宽。容量差距十倍以上，读取带宽打平。

功耗方面，HBF一个封装不到80瓦，HBM4是40瓦，单看HBF功耗高一些，但考虑到容量差距，每GB的功耗HBF反而更低。

论文作者算了一笔账。如果用HBF，推理系统的整体尺寸可以大幅缩小。因为模型权重全部加载进一个更紧凑的系统里，芯片数量减少，通信开销降低，可靠性提高，数据中心的空间和电力预算也能松一口气。

HBF当然不是银弹。

闪存写入寿命有限，每次读写粒度是页面级别而不是字节级别，延迟比DRAM高几个数量级。所以它只能存那些不常变化的东西，比如模型权重、知识库语料、代码仓库。对于每次推理都要更新的KV Cache，还是得靠DRAM。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

但这恰恰是HBF的聪明之处。它不试图替代一切，而是找到最适合它的生态位。

一个网页搜索AI系统，背后可能存储着数十亿份网页文档。这些文档不会每天更新。

一个代码辅助AI，背后是数十亿行代码。也不会每天全量刷新。

一个科研辅导AI，背后是数百万篇论文。这些都属于"慢变上下文"。

HBF可以把这些一次性加载、反复读取、几乎不修改的数据，用极低的空间成本塞进去。

第二个方向是近存计算。PNM，Processing Near Memory。

这个词听起来很高大上，其实说人话就是，在内存旁边放一个小处理器，让数据不用跑到远的地方去计算。

这里有个概念要分清。PIM是Processing In Memory，处理器和内存做在同一颗芯片里。

PNM是Processing Near Memory，处理器和内存做在不同的芯片里，但靠得很近。

论文的作者特意强调这个区分，因为两者区别很大。PIM把计算逻辑塞进DRAM工艺节点，功耗和面积效率很差。PNM用的是独立的芯片，可以用更成熟的逻辑工艺，散热也好控制。

PNM不需要像PIM那样把LLM的结构碎片化成32到64MB的小块。因为内存和逻辑不在同一个die上，可以按更大的粒度做数据划分。对LLM推理来说，这太重要了。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

目前已经有公司开始做这个方向。AMD提出了DRAM和逻辑芯片3D堆叠的方案，三星做了AXDIMM把计算逻辑集成在DIMM缓冲芯片里，Marvell的Structera用CXL接口实现了DDR和处理的连接。

第三个方向是3D内存逻辑堆叠。

这个方向更激进。它不是把处理器放在内存旁边，而是直接把处理器芯片叠在内存芯片上面，用硅通孔TSV做垂直连接，带宽和密度都远超2D平面布局。

这个方向有两个实现路径。一个是复用HBM的设计，把计算逻辑塞进HBM的基座芯片里。好处是接口不用改，带宽和HBM一样，但数据路径缩短，功耗降低2到3倍。另一个是定制化的3D方案，用更宽的接口和更先进的封装技术，带宽和能效可以超越HBM。

当然挑战也很大。3D堆叠的散热是硬骨头，计算芯片放在内存上面，表面散热面积反而更小。论文给出的解法是降低时钟频率和电压，反正LLM解码阶段的计算强度本来就不高，用低频换散热是可接受的妥协。

第四个方向是低延迟互连。

前面的三个方向都在解决单个芯片或单个节点的问题。这个方向解决的是多芯片之间的通信问题。

训练阶段的超级计算机追求的是带宽，因为要传输海量的梯度数据。但推理阶段不一样。每次推理请求的数据量很小，但频率极高，这时候延迟比带宽重要得多。

论文提到几个有意思的想法。高连通性的拓扑结构，比如树状、dragonfly和高维环形，可以减少通信跳数，从而降低延迟。虽然带宽可能因此降低，但推理对延迟的敏感度远高于带宽。

网络内计算也是个思路。LLM用的集合通信操作，比如广播、all-reduce、MoE的调度分发，这些操作在网络层做聚合，可以大幅降低延迟和带宽开销。NVIDIA的NVLink和Infiniband交换机已经支持in-switch reduction了。

甚至有一个大胆的想法。如果LLM推理不需要完美通信呢？当消息超时的时候，用近似结果或之前的缓存结果来替代，而不是干等慢速的消息到达。论文说这样可以在不牺牲太多质量的前提下，大幅降低延迟。

这个想法其实挺反直觉的。我们习惯了通信必须可靠、必须完整。但大模型推理的特性是，输出本身就有不确定性。如果消息延迟导致的精度损失，比模型自身的不确定性还要小，那为什么不呢？

---

读到这里你可能发现了一个规律。

这四个方向都不是要制造一个更强大的计算芯片。

它们都指向同一个思路。

别再堆算力了，去解决内存和通信。

过去十年，AI硬件的演进方向很单一。更大的芯片，更多的核心，更高的FLOPS。训练阶段确实需要这个，因为矩阵乘法是计算密集型。

但推理阶段，尤其是解码阶段，核心瓶颈从来不是算力，是内存带宽、内存容量和通信延迟。

继续用训练芯片做推理，就像用F1赛车去送外卖。

引擎确实强，但载货空间不够，油耗太高，在城市里也跑不快。

论文的作者最后提了一个建议。整个计算机体系结构的研究社区，需要一个基于roofline模型的性能模拟器，专门用于评估推理场景下的内存和通信优化。

这不是一个全新的想法，只是过去这么多年大家太关注算力了。

缓存设计、分支预测这些传统的体系结构问题，都是在有真实模拟器的情况下做出突破的。推理硬件领域缺的不是idea，缺的是系统性的评估工具。

这篇论文本身是一个重新连接的努力。用产业界的真实数据、真实痛点，去激发学术界的研究灵感。用学术界的严谨方法，去回应用户面临的工程难题。

可能这正是AI硬件未来需要的东西。不是某一个人或者某一个公司单打独斗，而是把产业和学术重新捏在一起，用更务实的方法，解决真正的问题。

---

以上，既然看到这里了，如果觉得不错，随手点个赞、在看、转发三连吧。如果想第一时间收到推送，也可以给我个星标⭐～

谢谢你看我的文章，我们，下次再见。

继续滑动看下一个

歪睿老哥

向上滑动看下一个