---
title: "[Nature大子刊]IBM万字长文，存算一体有没有未来，3D堆叠才是终局？"
source: "https://mp.weixin.qq.com/s/hhOS6vJBn02hGY12t5WA4g"
author:
  - "[[类脑智能计算]]"
published:
created: 2026-01-22
description: "AIMC 架构设计百科全书，拆解了基于忆阻器的模拟存算单元（Tile）的每一处细节。"
tags:
  - "存算一体"
  - "模拟计算"
  - "3D堆叠"
  - "边缘智能"
  - "冯·诺依曼瓶颈"
abstract: "本文系统性解构了基于非易失性存储器的模拟存算一体架构设计，指出其在权重密度上的巨大优势是边缘部署大模型的关键，并认为3D垂直堆叠是克服模拟电路缩放限制、实现终极性能的未来方向。"
---
Original 类脑智能计算 *2026年1月21日 10:01*

这里是类脑智能计算，今天带大家精读一篇2025年12月19日发表在 Nature Electronics 上的重磅观点文章。

论文题目： The design of analogue in-memory computing tiles DOI: 10.1038/s41928-025-01537-5 关键词： 模拟存算一体(AIMC) / 忆阻器 / 深度神经网络(DNN) / ADC设计 / 边缘智能

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/A6Y9zichMibnbwHVB6PsdAfzwrxJGkNJRA4pGbFtGqP2ia9MKqUu6CkM2hjGh737MCRVColk5fVyRia2nDQqBhQsvQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

## 背景介绍

在AI大模型时代，无论是训练还是推理，最大的痛点往往不是计算速度不够，而是数据搬运延时大。数据在存储器（DRAM）和处理器之间频繁移动造成的能耗，远超计算本身，这就是著名的“冯·诺依曼瓶颈” 。为了解决这个问题，存算一体（In-Memory Computing, IMC）应运而生。目前的路线之争主要集中在：是用成熟的 SRAM 做数字存算（DIMC），还是用新型的非易失性存储器（NVM）做模拟存算（AIMC）？IBM Research 欧洲团队的这篇 Perspective ，可以说是“AIMC 架构设计百科全书”，拆解了基于忆阻器的模拟存算单元（Tile）的细节，并给出了性能对比和未来预测。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/A6Y9zichMibnbwHVB6PsdAfzwrxJGkNJRAGwoj7yOxPbT3TlUXm5qPiczMLiak6rcwwpQwCQk7dxojOyH4ngQbTZuA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

图1：计算架构的进化

图注解读

(a) 传统架构:数据在 DRAM 和计算单元之间频繁搬运，能耗全浪费在路上。

(c) 存算一体 (IMC):Tile 即是仓库也是工厂，利用存储阵列内部物理属性直接计算，彻底消灭数据搬运 。

## 一句话解释

本文系统性地解构了基于非易失性存储器（NVM）的模拟存算一体（AIMC）Tile 的设计空间，从权重/输入编码到 ADC 选型进行了全方位权衡分析，并指出 NVM-AIMC 相比于 SRAM 方案拥有数量级（>10倍）的权重密度优势，是未来在边缘端部署大规模 AI 模型的关键路径。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/A6Y9zichMibnbwHVB6PsdAfzwrxJGkNJRA7E8BWWZiadSibHFb9AEPxOlIylKmVVY9zmNLdsKHw9fs8p9NvfQmprbQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

图2：路线对比

(a) 核心原理: 无论是哪派，核心都是利用本地存储的权重 W\_ji 与输入 X\_i 相互作用，直接生成输出 Y\_j。

(b) 数字存算 (DIMC): 用 SRAM 存权重，用数字逻辑电路算乘加。虽然稳定，但本质上还是数字电路，并未利用器件的物理模拟属性。

(c) 模拟存算 (AIMC): 权重编码: 使用忆阻器或 Flash 的电导值 (G\_ji) 来代表权重。计算原理: 利用欧姆定律做乘法，利用基尔霍夫定律做加法。结果: 运算直接在模拟域完成，最后才用 ADC 转回数字。注意，虽然 AIMC 也可以用 SRAM 实现，但 NVM（非易失性存储）能提供更高的密度。

## 核心观点

## 1\. 密度：大模型边缘落地的“入场券”

SRAM 存算（DIMC）虽然工艺成熟且速度快，但它太“占地”了。在相同工艺节点下，基于忆阻器（RRAM/PCM）或 Flash 的 NVM 方案，其权重密度是 SRAM 的 10倍以上 。

结论： 如果你想把 LLaMA 这样的大参数模型塞进手机或眼镜里，SRAM 几乎是不可能的任务（成本和面积都受不了），NVM-AIMC 是目前唯一能提供足够片上容量的技术路径。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/A6Y9zichMibnbwHVB6PsdAfzwrxJGkNJRA5PH65sTicTMHIzaWGw77LknfgyMGpUnB4AU5IjicygokKBtYEwibvCfWw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

图3：AIMC Tile 的内部构造

图注解读：

(a) 全景拆解:一个 AIMC Tile 绝不是简单的电阻阵列。它包含三个关键部分：

输入编码 (DAC):负责把数字输入变成模拟电压或脉冲宽度（时间调制）。这里提到了BP（位并行）和BS（位串行）编码，前者快但复杂，后者慢但省地。

权重阵列:权重可以“并排坐”（模拟差分，正负各一路），也可以“切片存”（二进制补码形式，像切面包一样把高精度权重切成几段）。

(b) 计算流:编码后的输入与阵列相互作用生成模拟输出 Y\_j，紧接着就是最关键的 ADC 环节。这再次印证了外围电路（DAC/ADC）在设计中的核心地位。

## 2\. 模拟计算的隐形代价

许多人只看到了模拟计算在矩阵乘法（MVM）上的低功耗优势，却忽略了外围电路的开销。论文数据表明，ADC（模数转换器）竟然消耗了整个 Tile 约 60-70% 的能量和绝大部分面积 。

结论： 模拟存算不是“免费”的。它省下的计算功耗，很大一部分被 ADC 抵消掉了。因此，设计一个低功耗、紧凑的 ADC（如无振荡器架构 CCO），比优化忆阻器器件本身更关键。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图4：ADC 的选型

图注解读：

(a) 输出三部曲:模拟计算的结果不能直接用，通常需要经过预转换（Pre-conversion）->转换（Conversion）->后转换（Post-conversion）三步走。

(b) 电压型 ADC:传统的 SAR ADC（逐次逼近型）和 Flash ADC。Flash 快但费电，SAR 均衡。

(c) 电流型 ADC: 这里的CCO（电流控制振荡器）是存算一体界的关键器件。它把电流大小转换成频率（振荡次数），结构非常紧凑且纯数字电路实现，非常适合 IMC 阵列 。

## 3\. 摩尔定律

随着工艺从 28nm 向 5nm/3nm 演进，数字电路（SRAM/逻辑）的能效和密度提升是线性的甚至指数的。但模拟电路（ADC）很难随工艺微缩，甚至会因为电压余量变小而性能变差 。

结论： 工艺越先进，SRAM-DIMC 的优势反而越明显。NVM-AIMC 如果只靠“搭摩尔定律的便车”，会被 SRAM 越甩越远。它必须在架构上寻找出路。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图5：数据对比

图注解读：

（a）对比内容：AIMC Tile1:纯模拟流，差分权重 + 振荡器 ADC。，AIMC Tile2: 半数字流，位切片权重 + 比较器 ADC。DIMC Tile: 纯数字 SRAM 方案。

(b) 面积与能耗 (关键证据):图表清晰地展示了ADC消耗。在 AIMC 方案中，输出编码（即 ADC）占据了绝大部分能耗和面积。相比之下，DIMC 的能耗主要花在庞大的 SRAM 阵列和累加器上。

(c) 精度误差:这是一个 trade-off。DIMC 精度近乎完美（Ideal）；而 AIMC 由于器件偏差，误差显著。但注意看"8 devices per W"（用8个器件存一个权重）的箱线图，通过空间冗余，AIMC 的误差可以被大幅压低 。

## 4\. 终极形态是3D 堆叠

既然平面微缩对模拟电路不友好，那就向空间要效率。论文指出，未来的方向是 3D 垂直堆叠 （如 3D NAND/NOR Flash 或 3D RRAM）。

结论： 未来的 AI 芯片将不再是平面的，而是像摩天大楼一样：底层是先进工艺的数字逻辑（负责控制和后处理），上层是成熟工艺的 3D 存储阵列（负责海量权重存储和模拟计算）。这才是 AIMC 战胜 SRAM 的终极杀招。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图6：摩尔定律

图注解读：

(a) 性能趋势:过去几年，IMC 的能效（FoM）呈指数级增长。

(b/c) 密度碾压:这是 NVM 的高光时刻。随着工艺微缩，RRAM 的单位权重面积（Area per bit）急剧下降，展现出比 SRAM 高出一个数量级的密度优势。这就是为什么说边缘大模型必须靠 NVM。

(d/e) 缩放的烦恼:这里泼了一盆冷水。随着工艺从 28nm 走到 3nm，数字电路（晶体管）变小了，但模拟电路（ADC）很难变小。这导致 AIMC 在先进制程下的收益不如 DIMC 明显。

结论: 这张图暗示了未来的终局——3D 堆叠。既然平面上模拟电路缩不动，那就把存储阵列堆叠（3D Vertical），把逻辑电路留在底层 。

## 讨论

Q1: 既然 ADC 这么费电，为什么还要坚持做模拟存算？

A: 因为 权重密度 (Weight Density) 。在边缘端（如手机、眼镜），芯片面积寸土寸金。SRAM 方案虽然计算精准，但存不下大模型。NVM 方案虽然 ADC 费电，但它能把巨大的模型塞进小小的芯片里，避免了去片外读 DRAM 的巨大开销。从系统级（System-level）来看，这省下的能耗远超 ADC 的开销 。

Q2: 模拟计算的精度问题怎么解决？

A: “硬件不够，软件来凑”或者“空间换精度”。

硬件层： 使用多个器件对应一个权重位（比如 2个器件存 1bit），均值效应可以降低误差 。

算法层： 采用硬件感知训练 (Hardware-aware training)，在训练时就加入噪声模型，让神经网络“学会”适应这种不完美的硬件 。

## 局限性与未来展望

器件非理想性 (Non-idealities):忆阻器的电导漂移 (Drift)、编程误差和非线性仍然是精度杀手，需要复杂的校准电路 。

编程开销 (Programming Cost):NVM 写入慢且费电，因此目前主要适用于 权重静态 (Weight-stationary) 的推理场景，不适合频繁更新权重的训练任务 。

本文参考10.1038/s41928-025-01537-5，仅供学术交流。

继续滑动看下一个

类脑智能计算

向上滑动看下一个