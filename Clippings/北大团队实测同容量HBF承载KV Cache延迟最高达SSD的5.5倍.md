---
title: "北大团队实测：同容量HBF承载KV Cache，延迟最高达SSD的5.5倍！"
source: "https://mp.weixin.qq.com/s/OsSkECQyw1jj3Xm8GqyawQ"
author:
  - "[[关注AI Infra]]"
published:
created: 2026-09-23
description: "闪存快 3.75 倍延迟只降 1%~"
tags:
  - "HBF"
  - "KV Cache"
  - "北大团队"
  - "SSD"
  - "延迟5.5倍"
  - "Mooncake"
  - "TokenSim"
  - "全栈特性刻画"
  - "端到端延迟"
  - "SLO吞吐"
  - "闪存"
  - "HBM"
  - "近层容量"
  - "热仿真"
  - "耐久度"
  - "三个必要条件"
  - "暴露比例1%"
  - "写多于读"
  - "NMP"
  - "写批处理"
  - "过热降频"
  - "磨损寿命"
  - "权重与共享前缀"
  - "分层方案"
  - "净收益"
abstract: "北大团队用全栈模拟发现，将SSD直接换成HBF承载瞬态KV缓存会让端到端延迟升2到5.5倍，原因是写多于读、闪存读不在关键路径、热与耐久受限，HBF应改为感知复用的分层方案。"
---
关注AI Infra 智猩猩AI *Sep 23, 2026, 3:43 PM*

智猩猩AI整理

编辑：BugMaker

大语言模型（Large Language Model，LLM）推理有一本绕不开的账，KV 缓存（Key-Value Cache）。

模型每生成一个 token，都要把它的键和值向量存下来，下一步解码时再读出来。上下文越长、并发越高，这本账就越厚，很快就能塞满一块 GPU 的显存。

于是业界把放不下的 KV 缓存外溢到更大更便宜的层级，SSD 就是标准选择。Mooncake 这类系统早把这条路走通了，冷数据搬到磁盘，需要时再读回来。

但 SSD 卡在 PCIe 接口上，带宽有限。高带宽闪存（High-Bandwidth Flash，HBF）就是冲着这个来的。它把 NAND 闪存堆叠起来，直接挂到 GPU 的存储通道上，读延迟比 SSD 低约一个数量级，带宽也高出好几倍。

一个很自然的想法跟着出现。把 Mooncake 里的 SSD 直接换成 HBF，别的都不动，服务是不是就该更快了？

北京大学团队的回答很干脆， **不是，反而更慢** 。

这篇论文叫《HBF Sucks? A Full-Stack Characterization of High-Bandwidth Flash for KV-Centric LLM Serving》。论文首页的 Table 1 把近期工作摆在一起对比，包括 H3、FlashAccel、FLINT、DASH、HBFSim 和 POSTECH 的探索性研究，维度涵盖 HBF 承载什么数据、采用什么拓扑、有无架构模拟器、有无服务级评估。本文是唯一同时覆盖 HBF-1 和 HBF-2 两种拓扑、并用全栈模拟器跑生产 trace 回放的工作。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/zJVQUll3YIbptq47ptA1Kd9oa8mzW3CzUQMzbIiacbEQsv3v9uiavUMNZGOdtSXq1oVIfUqC2r4zQSTPmia69yzM995apgIkRTpiarp15kicuXZM/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

这项工作的主要作者来自北京大学集成电路学院，通讯作者是存内计算（Processing-in-Memory）领域知名青年学者， LLM 推理模拟器 TokenSim 的核心作者卓有为助理教授。

他们做的不是一次简单的跑分，而是一次全栈特性刻画（Full-Stack Characterization）。团队把 TokenSim 扩展成能模拟 HBF 分层 KV 缓存的版本，再配上热仿真和耐久度预算，从闪存器件、封装、近层内存一路量到端到端服务延迟。这套全栈模拟框架已经开源，即 TokenSim 的 HBF 扩展版本，代码地址为 https://github.com/pku-lemonade/TokenSim/tree/hbf ，读者可以直接复现文中全部结果。

数据用 4 条来自阿里云 Qwen-Bailian 生产部署的完整两小时 trace，覆盖 5 个稠密和混合专家（Mixture of Experts，MoE）模型，跑在 H100 和 B200 两种平台上。

结果是反直觉的。 **平均端到端延迟上升 2 到 5.5 倍，最大服务等级目标（Service Level Objective，SLO）吞吐下降 1.1 到 2.7 倍** 。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/zJVQUll3YIbfouG4RhoaNzZsIdoXvmLvxXEJKnMOujHT2P6HEeBPBPvNymkub5HiaibMY1IchQqj60uAl15NxIKQYdap8z4MNKFFkdFXA0nEU/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

***01***

**更快的媒体，为什么换来**

**更慢的服务  
**

2026 年 8 月 3 日，OCP（开放计算项目）发布了由 Sandisk 和 SK 海力士牵头的《High Bandwidth Flash (HBF) High-Level Base Die Specification》v0.7.0，第一次以标准形式写死了 HBF 的主机接口和管理分工。论文的论证全部对齐这份标准：接口采用 AXI over UCIe，区别于 NVMe；写必须凑满一个完整的 4 KiB 页才落盘；数据在通道间的交织排布由主机负责。

HBF 不是一个抽象名词。论文的分析对象，来自韩国'HBM 之父'，KAIST 的 Joungho Kim 教授今年 2 月提出的 HBF 路线图中的近景两代，也就是未来约五年内会落地的方案，HBF-1（2028）把整块硅中介层（Silicon Interposer）都填满闪存，快一级的近层存储被挤到 GDDR7 上。HBF-2（2030）才把高带宽内存（High Bandwidth Memory，HBM）请回来，和闪存共享中介层。

![Image](https://mmbiz.qpic.cn/mmbiz_png/zJVQUll3YIago0773JT4GZLvpaIqIJk6trLJ42Mho0U7HyPQzxD2HYua1gvdtHQ220txb4aKvcnBqO9yK8WpVOPArGnNcBxAPgK4yG1zvV4/640?wx_fmt=png&from=appmsg#imgIndex=2)

关键就在"取舍"两个字。HBF 用闪存换来封装内的容量，代价是 GPU 近层的容量和带宽。HBF-1 直接把近层从 96GB HBM 砍到 48GB GDDR7，带宽也从 3.0 TB/s 腰斩到 1.5 TB/s。

研究团队拿容量配平的 SSD 做对照，HBF-1 对 SSD24，HBF-2 对 SSD12。结果每一组 HBF 都在所有请求指标上更差， **平均端到端延迟是 SSD 的 2 到 5.5 倍** ，吞吐降 4% 到 34%，最大 SLO 吞吐降 1.1 到 2.7 倍。

更扎心的是，闪存本身变快几乎没用。研究团队把 HBF 的读写延迟从 30/300 微秒调到 8/80 微秒，整整快 3.75 倍，端到端延迟只动了不到 1%，这说明闪存服务根本不在请求的关键路径上。研究团队反推出一个暴露比例 f， **只有大约 1%** 。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/zJVQUll3YIZuFFibEMZMpLLZmVoEoHnE66BljcswXbr5MCVb4L4iczvFicxthtictI6MZicibUKkdxE9bcxMGzjakrZY7uvvgzUJNAjblmfJ4ItNM/640?wx_fmt=png&from=appmsg#imgIndex=3)

换句话说，就算给你一块零延迟的完美闪存，最多也只能砍掉 1% 的端到端时间。而买这块闪存牺牲的近层容量，代价是延迟涨了 2 到 5.5 倍。

***02***

**三个条件，瞬态 KV**

**一个都不满足  
**

为了说清"更快闪存何时才有用"，研究团队把收益拆成一个净变化公式，拆出三个必要条件。第一，读 IO 得是服务瓶颈。第二，读要远比写多。第三，带宽要能持续跑满。

对于瞬态 KV 缓存，三个条件全不成立。

一、写比读多，热块都被近层截胡

研究团队把 4 条 trace 各回放两小时，直接数闪存层读写了多少字节。结果没有一条例外， **写都多于读** 。写读比从 1.14 倍到最高的 4.90 倍，换算成"每写一字节能换回多少有用读"的比例，只有 0.20 到 0.88，全部低于盈亏平衡。

原因在复用分布上。热块被近层留住了，HBF 收到的是冷尾巴，写一次很少再读。traceB 最极端，只有 6% 的块会被复用。

二、两条补救的路都走不通

研究团队试了两条补救，都没成。近存计算（Near-Memory Processing，NMP）把注意力算力搬进闪存，但闪存里常驻的 KV 只有 15% 左右，加速器有力使不出。

SSD 上很灵的写批处理（write batching）搬到 HBF 也失效了。它在 SSD 上能降 8.9% 到 21.1% 的延迟，在 HBF 上只剩 2.69%，块变大后甚至变负。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/zJVQUll3YIb62icyibTo4YXwticLgNmXHNQU4hQBPK8pb3fDRgKlloabBAn531phkwWmiaRBrsemWuujty3uS7rcEzib2UjlcxWJRvBR3GVVaicbk/640?wx_fmt=png&from=appmsg#imgIndex=4)

***03***

**过热降频，耐久不足  
**

写多还会带来两个物理后果，发热和磨损。

研究团队用三维集成电路热仿真工具 3D-ICE 建了一个 16 层三级单元闪存（Triple-Level Cell，TLC）堆叠的热模型，安全结温设在 80 度，和 HBM3e 对齐。

结果是，单个堆叠跑到 **202 GB/s、功耗 53.7 W** 就到顶了，离接口标称的峰值带宽还差得远。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/zJVQUll3YIaQcoCREDfNYQr1sFCdX6PKibPwPEwpA4HS3DerCIMF7XDic5jKCwCQQfA1V8LD1oPxic2ZllqSRIIdNhLjF5xmIGQPYdicWG9Yga4/640?wx_fmt=png&from=appmsg#imgIndex=5)

于是热控只能关掉最热的平面降频，实际带宽又低又不可预测。

寿命更不乐观。每条 trace 一天要写 48 到 140 TB，超过了任何合理的预算。按乐观的 TLC 假设算，HBF 的寿命只有同等容量 SSD 池的 **0.56 倍** 。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/zJVQUll3YIZ99cgj63cAhEKd6elkuXvesfiaTpvcT2pg6Yu5XaEcibNC4KHtJvYhKRDA4W1ElV2WkdYQBWsjrcdRxdn1ZpIOPEqcdEkalBM9M/640?wx_fmt=png&from=appmsg#imgIndex=6)

问题在于，HBF 挂上去像内存，骨子里还是闪存。OCP 标准把 ECC、坏块处理、写累积留在 base die，磨损均衡和垃圾回收可以上移主机，但 HBF 没有 SSD 那样的控制器兜底，地址映射这些脏活得系统自己背。

***04***

**HBF 不是问题，用法才是  
**

读到这里，结论其实已经清楚。 **HBF 本身没错，错的是把它当成一块更快的 SSD，去接瞬态 KV** 。

研究团队给了一张放置地图，横轴是暴露停顿，纵轴是每写换回的读。瞬态 KV 落在左下角，三个条件全失败。权重和共享前缀落在对角，那才是 HBF 该待的地方。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/zJVQUll3YIZULkpr6icX6D8iaYCtlibjT5LiaUHUwWauZ2xlszRmMaicuic3O7mLOpMPvbVD7dZKB8c2iaY5Mx7MicGicGFbaLuAOxmWGrdEdJUHPEvI/640?wx_fmt=png&from=appmsg#imgIndex=7)

所以 HBF 的正确打开方式，是做一个 **有选择的、感知复用的、预算写入的、热协同的分层** ，而不是 SSD 的即插即用替代品。

这套三个条件本身也不只适用于 HBF，对 CXL 挂载的闪存、其他堆叠 NAND 同样成立。研究团队用测量回答了"更快媒体何时有用"这个更普遍的问题。

论文首页还给学界和业界留了一封'给读者的挑战书'：trace、模型、代码、三个必要条件都已公开，Mooncake 式 KV 外溢三个条件全败，但 HBF 不必败。能不能设计出一种 HBF 组织和运行时，加速关键路径上的读，让每一次写换回足够多的有用读，在热和耐久的预算内持续跑满带宽，最终拿到端到端的净收益？这道题，现在轮到读者来解。

**END**

**关注+星标，获取AI前沿进展与开源一线动态**

AI Infra · Table of Contents