---
title: "全球首个！国产AI开源系统一周狂改百款软件，全程0人干预"
source: "https://mp.weixin.qq.com/s/GkVVKUkdH3j62OXhFEdTng"
author:
  - "[[ASI启示录]]"
published:
created: 2026-08-04
description: "0显卡扩容、提速最高5.78倍。"
tags:
  - "AI"
  - "开源"
  - "工业软件"
  - "性能优化"
  - "Stencil"
  - "HPC"
  - "自动部署"
  - "国产"
  - "面壁智能"
  - "ForgeStencil"
abstract: "面壁智能联合OpenBMB发布全球首个Stencil优化AI系统ForgeStencil，一周内自动完成100多款真实工业和科学计算软件的重构优化，全程无人工介入，显著提升性能并加速国产工业软件自主可控进程。"
---
ASI启示录 新智元 *2026年8月4日 12:12*

### 新智元报道

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Rvq8Ow69CYWGxcbmnyYvqrSqhntcbPdelKBG0JLug4pEX8icjBSe5eib6PekswOSvrq8ybatQJRDr9Vib5WOKaUuibKfLb5qH3J4kEIYmC4NQJU/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

当前，中国正处于从「制造大国」向「智造强国」跨越的关键历史节点，其中工业软件（如CAE仿真、流体力学计算、电磁EDA等）是这一历史转折的核心桥梁。

从天气预报、地震勘探，到电磁仿真、材料模拟……现代工业与前沿科研的每一次突破，都离不开规模庞大的高性能计算（HPC）软件。

近年来，国产工业软件在算法功能和物理建模上进展迅速，正在加速实现自主可控。然而，当这些软件真正投入到航空航天、芯片设计、能源勘探等高精尖的一线场景时， **往往会面临一个核心瓶颈——性能不足，也就是「跑得慢」** 。

在这些工业软件的底层， **Stencil（模板计算）** 是最基础、也是最消耗算力的计算模式。由于它极度消耗显存带宽，一旦代码与硬件架构的适配不够极致，再先进的 GPU 芯片也会陷入原地「干等」数据的性能荒。

过去，想让这些软件跑得更快，往往要靠少数高性能计算（HPC）专家逐个分析和调试，耗时数日到数周进行代码手工精调，由此每人每年所能优化的软件应用通常不超过20个——在庞大的国产工业软件优化需求面前，这一速度难以跟上国产智造加速的脚步。

AI Agent时代，这个长达数十年的工业软件性能优化枷锁，正在被一家中国大模型公司打破。

今天，面壁智能联合OpenBMB开源社区正式发布并开源了全球首个Stencil 优化「自动研究+自动部署」大闭环的AI系统—— **ForgeStencil** ，仅用1周时间就自动完成了100+真实工业和科学计算软件的重构优化，全程0人类专家介入。

这是面壁智能继今年5月底发布全球首个完全由AI编写的大模型预训练框架 ForgeTrain（训练速度比英伟达Megatron快10%）后，基于 **Forge Engineering（锻造工程）** 软件工程新范式研发的又一重磅技术成果，也是面壁智能在 AI 智能自主进化方向布局的最新力作。

在整个过程中，人类只需要提供待优化的应用源码，后续全流程由 ForgeStencil 接手——从自动分析真实应用、定位热点函数、锻造 Kernel，到完成算子替换、正确性验证与集成回原应用，全程没有人类专家介入任何一步优化决策，首次实现了 **从「提出优化想法」到「应用无缝部署」的全自动闭环** 。

ForgeStencil不仅证明了通过AI重构代码路线、无需追加硬件投资即可成倍榨干既有物理性能的可能，更深刻切中了当前中国制造业升级的核心诉求： **用算力平替人力，为国产工业软件按下自演化的加速键。**

开源链接：https://github.com/OpenBMB/ForgeStencil

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

**双Agent驱动**

**0人工介入，全球首个**

ForgeStencil要优化的Stencil，究竟是什么？

Stencil（模块计算）是工业软件与科学计算中分布最广、最基础的核心计算模式之一，其核心是对规则网格上每个点及其固定邻域执行相同局部运算。

无论是大气动力学、地震波场传播、电磁场演化，还是流体力学与相场模拟，其底层的计算都可以归纳为同一种操作：用网格点邻居的加权组合，反复更新整个网格——即Stencil计算。这类计算访存密集、受内存带宽主导，往往占据整个应用的大部分运行时间。

在Stencil的计算中，最大的挑战是数据量太大：程序需要反复读取和写入海量数据，路线一旦设计不合理，GPU就得原地干等。一个底层步骤慢下来，整个应用都会被拖慢。它也因此成为许多工业与科学计算软件的性能瓶颈。

过去，让Stencil跑出硬件极限速度，通常是少数高性能计算（HPC）专家的硬功夫。他们既要看懂算法和应用，又要根据数据规模和 GPU 调整代码。换一个应用，甚至换一款芯片，原有方案都可能需要重做。面对数量庞大的工业与科学计算软件优化需求，这种逐个依赖专家优化的方式很难规模化。

ForgeStencil的出现，打破了这一困局。

ForgeStencil系统由Kernel Agent与App Agent组成，二者结合完成了从算子优化到应用部署的完整闭环，超越了以往所有自动调优工具。其中：

**Kernel Agent专注于底层算子编写优化，使其无限逼近硬件物理极限。**

它会针对不同类型的Stencil、不同的网格形状和计算精度，自动生成大量候选Kernel，尝试各种数据读取方式、线程调度策略和计算结构，再通过编译、运行和性能反馈，一轮轮筛出最快的算子。

在算子测试中，ForgeStencil与目前市面上开源的最优算法（包括Halide、Devito、EBISU、DRStencil、FlashFFTStencil等知名框架）在同等硬件下进行对比测试，展示了强劲的技术优势：

- 同精度（fp32）对比下，获得了几何平均2.35×的加速比；
- 混合精度（fp16）读写时，又拿下了额外的1.95×提速；
- 即便在业界公认最难的「变系数 Stencil」全部Shape 上，相比最优基线仍取得几何平均下1.34×的加速。

然而，一个底层算子跑得快，并不等于整个庞大的工业软件能直接变快。在真实的科研和工业生产代码中，Stencil循环的代码往往写得非常复杂，常常与多物理场耦合项混写，精度和数据格式也无法直接套用现成的标准算子库。如果直接从现成算子库里选个包塞进去，软件必然会报错或无法编译。

**App Agent负责工程部署，要解决的正是从算子快到应用快的关键一环。**

App Agent的做法是为每个应用单独锻造方案：定位性能热点、建立应用自身的GPU基线、锻造候选优化、用程序自带的校验与计时验证、再集成回原应用。

在框架级，App Agent寻找算子融合的机会，并把待优化的Stencil算子提取出来。Kernel Agent则负责优化具体的算子，其在之前建立的算子矩阵被作为后续开发的知识库。最终，App Agent会使用应用自带的测例做端到端评测，以确保优化面向真实场景。

Kernel Agent与App Agent紧密协同，让ForgeStencil成功完成了从「自动生成代码」向「自动研究优化」、从「局部算子提速」向「真实应用部署」的智能进化，实现 **全程0人工介入** 。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg#imgIndex=3)

**1周优化100+真实应用**

**超越人类专家**

在双Agent闭环驱动下，ForgeStencil将单个真实工业软件与科学计算应用的优化从数天、数周压缩到了小时级内。

据统计，ForgeStencil在一周内完成了 **100+真实工业与科学计算应用的自动优化，全程0人工介入，研发吞吐提升了1-2个数量级，研发效率远超人类专家。**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Rvq8Ow69CYVze0uX8WQ3mhsps40p9mfFVtSQ9UUNgwpRM5Vn2NiaeDnpH3mhduNmicVKE5nnV20MticAvpkzVAbj5lpPEesauQ4SAGZjwVrf4s/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=4)

ForgeStencil 性能效率表

此外，与人类专家优化相比，AI优化还有另一个技术优势，即：

人类专家的经验都在自己脑子里，很难共享给别人；但ForgeStencil有大量并行的Agent共享知识库，经验可以实时共享，可以 **实现智能的集体同步进化** 。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/Rvq8Ow69CYVeJHj3l61Zm3HY1fzYxP3PlbdPbpsDBSbfrfF5Coj9J7MN70rFE06V9uicHMrs52us5IFbKLL1UVsYCMgrEGMzicDdQB76fbaEM/640?from=appmsg&watermark=1#imgIndex=5)

在 HPC 的世界中，所有的软件研发范式迭代都必须接受真实工业场景和真实生产代码的严苛检验。ForgeStencil 自动优化的 100+ 个软件中， **约42% 直接对应真实的实体工业生产场景** 。

为了更直观地体现ForgeStencil对现代工业制造升级的助力，我们深度剖析了其中两个最具代表性、技术壁垒极高的国产化重器场景：

**攻克通用CAE软件的数学心脏：**

**hypre（加速3.86×）**

在航空航天、汽车制造和高端装备的研发中，CAE（计算机辅助工程）软件是绝对的核心。无论是计算飞机的机翼受力，还是汽车碰撞时的金属形变，其底层数学本质都是在求解庞大的偏微分方程组。

由美国劳伦斯利弗莫尔国家实验室（LLNL）主导研发的 hypre，是全球工业仿真求解器中最广泛依赖的数值库之一。hypre求解效率的高低，直接决定了 CAE 软件的整体性能。在hypre内部，有一个极度消耗算力和带宽的瓶颈——「红黑高斯-赛德尔（Red-Black GS）光滑子」迭代计算。由于红黑更新在内存中是不连续的，导致GPU显存带宽吃紧，硬件性能大量闲置。

在无任何人类专家干预的前提下，ForgeStencil自动跑进了hypre错综复杂的源码中。优化后的hypre在GPU上跑出了 **3.86×** 的真实端到端加速！

这相当于 **在没有增加一分钱硬件成本的前提下，让CAE求解器的计算** **速度显著提升。**

**重构电磁仿真的通用底盘：**

**FDTD（加速2.47×）**

从探地雷达、天线设计到电磁兼容分析，基于Yee网格的时域有限差分算法（FDTD）是电磁仿真领域应用最广的数字底盘。

FDTD算法为了精确模拟微观物理边界，代码中充斥着复杂的边界条件处理、介质属性切换，其底层的Stencil更新极难做到硬件级别的优化。

ForgeStencil直接接管了这一电磁仿真底座。最终，该应用在标准测例上取得了 **2.47×** 的真实加速。这一数字背后，意味着 **电磁仿真的迭代周期缩短了一半** ，国产探地雷达设计的研发效率获得了实打实的重构。

此外，ForgeStencil在更多真实工业软件上取得了令人震撼的加速效果： **minisweep核反应堆中子学** 计算获得5.78×加速， **RTM油气地震成像** 获得1.81×加速；在医学成像领域，非笛卡尔MRI重建获得2.45×加速，DBT数字乳腺断层成像反投影获得1.63 ×加速……

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Rvq8Ow69CYXxA5Sy7z2Y1KrJkbuCY0m5ZSKAsicbtKamQ0UXOW9dHW5uEh6atU3rTwicdMK29shkb4LLG4A0SBofXtpFibDwr9iciauRTNrt5Xfk/640?from=appmsg&watermark=1#imgIndex=8)

**从真实应用加速到工业软件自主可控**

今年5月底，面壁智能首次发布Forge Engineering 时，曾提出一个颇具野心的判断： **一旦 AI 研究和构建 AI 的速度超过人类，人工智能的发展就不必再完全受限于专家数量，而可能更多取决于可投入的算力和自动化系统。**

ForgeTrain是这一判断在大模型基础设施中的第一次验证；如今，ForgeStencil又把相同的可能性带到了工业与科学计算。

当同一套Forge Engineering能够不断跨越软件领域，真正值得关注是一种新的软件生产方式——代码可以由AI按照具体需求现场锻造，工程经验可以在 Agent之间持续流动，软件基础设施也因此从人类一次性编写、长期维护的固定资产，转变为能够按需生成、持续优化和不断演进的生产力。

ForgeStencil把Stencil模板计算优化变成了可自动执行、可持续积累和可规模化扩展的工程能力。短期来看，它能够帮助存量软件快速释放软件红利；长期来看，它让算法设计与硬件上的性能实现逐步解耦，工程师和科学家可以花更多精力在模型、物理问题和算法创新上，而不是被性能优化的细枝末节拖住脚步。

**ForgeStencil试图补上的，正是国产工业软件走向「性能自主」的重要一环：打破软件性能优化对少数HPC专家的依赖，让工业计算软件能够针对具体应用和硬件持续自我进化。**

这种效率优势最终会传导到制造业的研发链上。工程仿真更快，设计团队就能验证更多方案；地震成像更快，能源勘探就能缩短计算周期；医学重建更快，成像设备就能提升处理效率。

它并不直接替代工程师或科学家，而是加速支撑设计、验证、分析和计算的底层软件，让 AI 能够更快进入制造业、成为其不可或缺的数字基础设施。

工业软件是制造业的「大脑」。当大脑的运转速度不再受限于稀缺的专家资源，中国制造业的升级才算真正拥有了可规模化的技术底座。

**秒追ASI**

**⭐** **点赞、转发、在看一键三连** **⭐**

**点亮星标，锁定新智元极速推送！**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Rvq8Ow69CYUBzrUzkqOyN0YI7f3bA0Wdicjwx3RpGzzStKFvfcumcdPM1sMysbibE22q4zetlhFoeI6biaCL6I67GZuPuwBKEE8bibOz60Yicib88/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=10)