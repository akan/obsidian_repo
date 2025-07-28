---
title: "最高能效比！他又死磕“存算一体”2年，拿出全新端边大模型AI芯片"
source: "https://mp.weixin.qq.com/s/PK1iqXSxVG7CbQoJl-ofNw"
author:
  - "[[关注前沿科技]]"
published:
created: 2025-07-28
description: "后摩智能发布M50 AI芯片"
tags:
  - "存算一体"
  - "AI芯片"
  - "大模型"
abstract: "后摩智能发布业界能效比最高的存算一体端边大模型AI芯片M50。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib3UpESjpwX3LruoUcUY1tuicWyKBT3D6fU1EhibPFQaHngadDUbicTRHgTA/0?wx_fmt=jpeg)

Original 关注前沿科技 [量子位](https://mp.weixin.qq.com/s/) *2025年07月28日 14:42*

##### 金磊 发自 WAIC量子位 | 公众号 QbitAI

当他再次高调出现在大众面前，已经是时隔两年之久。

他就是 **后摩智能** CEO **吴强** 博士，很多人好奇他和他的团队在这两年时间里都在做什么。

而就在今年WAIC期间，吴强终于给出了答案——

发布潜心两年的成果： **后摩漫界®M50** ，一款 **业界能效比最高** 的存算一体端边大模型AI芯片。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib36hfRwwIiat4NZ7VFZn6KWLL5NT7BBjw3JqVJgPY7gyueEUuInpJX7fA/640?wx_fmt=png&from=appmsg&randomid=b03iyi9c&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

###### △后摩智能CEO吴强发布后摩漫界®M50

M50拥有 **160TOPS@INT8** 的物理算力， **100TFLOPS@bFP16** 的浮点算力，以及高达 **153.6 GB/s** 的超高带宽和最大 **48GB** 的内存。

更令人侧目的是，实现这一切的典型功耗，仅仅10W——相当于一个手机快充的功率。

用吴强的话来说就是：

> 我们希望让大模型算力像电力一样随处可得、随取随用，真正走进每一条产线、每一台设备、每一个人的指尖。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib3qXXp3pkfFgetr8U08NAlSNciadZttibtBEasgvorXbE0HxQH4nsysraQ/640?wx_fmt=png&from=appmsg&randomid=pfsqq1kj&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

两年前，后摩智能带着第一代存算一体芯片惊艳亮相WAIC。

两年后，面对大模型时代带来的全新机遇与挑战，他们依旧稳健，选择继续死磕存算一体这条当时看来颇为“冷门”的赛道，并再次拿出了业界第一的成绩。

## 把存算一体推入了第二代

M50之所以能实现如此惊艳的能效比，其背后实则是后摩智能在存算一体技术上的持续深耕和迭代突破。

因为它所搭载的，正是后摩智能自研的 **第二代存算一体技术** 。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib3TTTiaZeLpr7YAFKvqNFlTtqcSpuM5Qmc404nttlnibuLoJS1FCqMHEmw/640?wx_fmt=png&from=appmsg&randomid=xym34ykk&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

要理解这一的技术，我们首先要明白什么是“存算一体”。

在传统的计算机架构（冯·诺依曼架构）中，计算单元和存储单元是分离的。CPU或GPU要计算数据，需要先从内存中把数据“搬运”过来，计算完成后再“搬运”回去。

这个“搬运”过程，就像快递运输，不仅耗费时间（带宽限制），还消耗大量能量（功耗），形成了所谓的“功耗墙”和“存储墙”，成为制约芯片性能提升的最大瓶颈。

而存算一体，顾名思义，就是将计算和存储融合在一起，让数据在存储单元内部就近完成计算，从根本上解决了数据来回搬运的问题。这好比将工厂直接建在了仓库里，省去了所有的物流环节，效率自然大大提升。

吴强在创业之初就敏锐地意识到，要想在英伟达这样的国际巨头环伺下实现“弯道超车”，就必须在架构上进行创新。存算一体，便是他认定的那条另辟蹊径的道路。

M50采用的第二代SRAM-CIM（基于SRAM的存内计算）技术，是真正的“存内计算”。

吴强解释道：

> 很多朋友问存内和近存有什么区别？如果把SRAM的阵列或者结构改变，它就是存内。如果不改变，它只是拿标准的SRAM，在旁边做计算，那就是近存。

后摩智能选择的是更彻底、更具挑战性的前者——他们把SRAM的阵列全部打开，进行了深度的结构性改变。

这一代的存算IP实现了“双端口加载与计算并行”，权重加载和矩阵计算可以同时进行，效率倍增。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtAiatAicxhxBYCYHkXibHdIdib3wlGa07qL85onbRxUUYupice53qVpEMSRePBhF3Of9JxKNJmlvKVsycw/640?wx_fmt=png&from=appmsg&randomid=8a6nd4l4&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

同时，为了解决量产难题，后摩智能团队自主摸索出了一套针对存算芯片的测试和可靠性保障方案（MBIST和CBIST），趟出了一条业内无人走过的路。

有了高效的存算IP，还需要一个聪明的“大脑”来调度和使用它。后摩智能为此自研了全新的第二代IPU（AI处理器）架构—— **天璇** 。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

天璇架构针对大模型的计算特点，做了大量优化，其中最核心的创新之一，就是 **弹性计算（Elastic Computing）** ，或者叫自适应计算。

这有点类似于GPU的稀疏加速技术。

在GPU中，如果权重参数为“0”，计算时就可以跳过，从而实现加速。但这种技术的限制是，权重必须严格为“0”。而在现实应用中，要让大量权重都恰好为“0”是非常困难的，因此GPU的稀疏加速效果往往不尽如人意。

而存算一体的特性，给了后摩智能一个绝佳的机会。他们的SRAM存算，是按照一个比特（bit）一个比特进行串行计算的。这意味着，他们可以做到更细粒度的优化。

吴强对此解释道：

> 我们并不需要它（权重）整个是0，我只要它在bit里面有0，我就可能做弹性加速，我就可能授予这个0跳过去0的加速。

这个看似微小的区别，带来了本质的不同。

它让加速的机会大大增加，也让量化变得更加灵活，可以实现7bit、6bit甚至5bit的超低精度量化，从而在不牺牲太多精度的情况下，将性能压榨到极致。根据后摩的数据，天璇架构最高可提供 **160%** 的加速效果。

此外，天璇架构还在业内首次实现了 **在存算架构上直接进行浮点运算** ，并成功量产。这意味着，开发者可以直接运行开源的FP16浮点模型，无需复杂的量化和精度调优，大大降低了应用落地的门槛和开发周期。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

再强大的硬件，也需要软件来释放其全部潜能。与M50配套的，是后摩智能新一代编译器工具链—— **后摩大道®** 。

这款完全重构的编译器，最大的特点是灵活易用。它支持细颗粒度的算子，能将复杂的算子自动拆分、组合和优化。

开发者不再需要面对几百个优化选项手动“炼丹”，编译器可以自动搜索最优化的策略，大大减轻了适配和部署的负担。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

从底层的存算IP，到上层的IPU架构，再到顶层的编译器工具链，后摩智能通过全栈自研，将软硬件深度协同优化，最终打磨出了M50这把刺穿端边大模型计算“最后一公里”的利刃。

## 衍生出了更多存算一体产品

这颗业界能效比最高的芯片还只是故事的开始。

为了让M50的算力能够以最便捷的方式触达不同场景，后摩智能同步推出了一系列硬件产品，构建了覆盖终端与边缘的完整产品矩阵。

#### 终端侧：力擎TM系列M.2卡

在终端侧，首先是 **力擎 <sup><span>TM</span></sup> LQ50 M.2卡** 。

这款产品的大小仅如同一块口香糖，采用标准的M.2接口，可以“即插即用”地为AI PC、AI Stick、陪伴机器人等移动终端提供强大的本地AI能力。

单卡即可支持7B/8B模型推理速度超过25 tokens/s。吴强特别提到，低功耗带来的一个巨大优势是可以使用被动散热，无需风扇，这对于智能语音设备等对噪音敏感的场景至关重要。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

其次是 **力擎 <sup><span>TM</span></sup> LQ50 Duo M.2卡** 。

在标准M.2卡的基础上，它集成了两颗M50芯片，算力、带宽、内存全部翻倍，达到320TOPS算力，突破了14B/32B大模型在端侧部署的瓶颈。

值得一提的是，这两颗芯片并非简单的堆砌，而是通过后摩自研的C-to-C互联技术协同工作，实现1+1>2的效果。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### 边缘侧：力谋®系列加速卡及计算盒子

在边缘侧，后摩智能同样发布了一些利产品。

首先是 **力谋®LM5050/LM5070加速卡** 。

面向对体积不那么敏感，但对算力有更高要求的边缘计算场景，后摩推出了半高半长和全高全长的加速卡，分别集成2颗和4颗M50芯片，最高可提供640TOPS的物理算力。

这样的算力足以在边缘端支持70B甚至千亿参数级别的大模型。而功耗，相比友商同等算力产品动辄几百瓦的“电老虎”，后摩的加速卡仅为几十瓦，能效优势极为突出。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

其次是 **力谋®BX50智能计算盒** 。

这是一款All-in-One的解决方案，在一个紧凑的机身内，集成了强大的M50芯片、丰富的I/O接口，并支持加密安全功能，可适配边缘场景，支持多达32路视频分析与本地大模型的同时运行。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

从消费终端的AI PC、学习机，到智能办公的会议系统，再到智能工业的产线质检，后摩智能的产品矩阵，让离线、安全、低延迟的本地大模型应用成为可能，真正构建起一个“低功耗、高安全、好体验”的端边智能新生态。

## 为什么要死磕存算一体？

首先，这是 **差异化竞争的必然选择** 。

面对英伟达、华为这样“大而全”的巨头，初创公司如果跟在后面亦步亦趋，很难有出头之日。

正如吴强所述：

> 如果跟国际巨头竞争，需要一些比较创新的架构才有可能另辟蹊径弯道超车。

存算一体，就是他找到的那个“蹊径”。

其次，这是 **技术发展的必然趋势** 。

大模型时代，应用对算力和带宽的需求是空前的，而传统架构的瓶颈日益凸显。

吴强和他的团队发现，大模型应用“既要算力密集，又要带宽密集”的特点，与存算一体技术“既能提升算力密度，又能提升带宽”的优势完美契合。

“我们发现这个之后就很兴奋，”吴强说，“我们决定聚焦在端边大模型AI计算，让存算和大模型形成共振，释放更大的势能。”

最终，这也是 **实现普惠AI的必经之路** 。

吴强认为，未来90%的数据处理都将在端和边完成，只有10%的训练和复杂任务在云端进行。要让大模型真正走出云端，赋能千行百业，就必须解决端边设备算力不足、功耗过高的问题。

这份专注与坚持，也为后摩智能赢得了产业和资本的认可。近年来，公司陆续获得了中国移动、北京人工智能基金、亦庄国投等重量级产业方和国有资本的投资，为持续的研发创新提供了坚实的后盾。

从两年前的崭露头角，到如今的厚积薄发，吴强和他的后摩智能，正以一种近乎“执拗”的坚持，在存算一体这条道路上笃定前行。

M50的发布，只是他们交出的阶段性答卷。未来，当更强大的AI算力以更低的功耗融入我们身边的每一个设备时，我们或许会再次想起这位热爱足球、坚持跑步的技术人，以及他那个“让智能无处不在”的初心。

## Two More Thing：

发布会的最后，吴强还透露了两个有趣的小细节。

一是M50的命名，之所以跳过了M40，这也算是创业公司的生存玄学了，毕竟在芯片行业——跳过“4”，可能就跳过了“生死劫”。

二是他向大家承诺：“下次不用等2年了，明年还会有新品。”

据了解，后摩智能已经启动了下一代 **DRAM-PIM** （基于DRAM的存内处理）技术的研发。

这个技术将突破1TB/s的片内带宽，能效再提升三倍，旨在推动百亿参数大模型在PC、平板等终端设备上的普及。

**一键三连** **「点赞」「转发」「小心心」**

**欢迎在评论区留下你的想法！**

— **完** —

**🌟 点亮星标 🌟**

**科技前沿进展每日见**

  

收录于 国产芯片

继续滑动看下一个

量子位

向上滑动看下一个