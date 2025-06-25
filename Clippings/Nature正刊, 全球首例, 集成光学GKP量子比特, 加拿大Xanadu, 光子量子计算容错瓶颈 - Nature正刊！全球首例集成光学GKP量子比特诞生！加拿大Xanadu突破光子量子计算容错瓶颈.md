---
title: "Nature正刊！全球首例集成光学GKP量子比特诞生！加拿大Xanadu突破光子量子计算容错瓶颈"
source: "https://mp.weixin.qq.com/s/w-jaf47sLEgW3-rI82GULQ"
author:
  - "[[尚白]]"
published:
created: 2025-06-25
description: "本文中，我们利用在定制的多层氮化硅 300 毫米晶圆平台上制造的超低损耗集成光子芯片，并通过光纤耦合高效率光子数分辨探测器，来生成 GKP 量子比特态"
tags:
  - "量子计算"
  - "集成光子学"
  - "容错量子计算"
  - "GKP量子比特"
  - "超低损耗集成光子芯片"
abstract: "加拿大Xanadu团队在Nature发表全球首例集成光学GKP量子比特研究成果，突破光子量子计算容错瓶颈。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/o2F4BaGBqWdHhjpBhlFdftG4icJ07xuvsuPgiam8GTRhPiat3RgSTsFJxSISB6Q2BpKm4xAvSexY5RYcyeia5C8utw/0?wx_fmt=jpeg)

尚白 [等贤学社](https://mp.weixin.qq.com/s/) *2025年06月25日 09:19*

![Image](https://mmbiz.qpic.cn/mmbiz_png/o2F4BaGBqWdHhjpBhlFdftG4icJ07xuvs9bvANzlbQ1gib4ibDpH8mV1MZKPcx8P2uRWnTyhJRFZwv4zY5MP4cZ2Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

  

01  

内容速览

#### 近日以加拿大Xanadu Quantum Technologies Inc.为第一单位的研究团队在量子计算与集成光子学的交叉领域研究取得重大进展，相关成果以：Integrated photonic source of Gottesman–Kitaev–Preskill qubits为题发表于世界级顶级期刊《Nature》该研究是面向容错量子计算的光量子硬件突破，通过集成光子学技术解决量子信息处理中的关键资源制备问题，属于量子工程（Quantum Engineering）前沿领域。第一作者为：M. V. Larsen

#### 1\. 解决的问题

- **可扩展性瓶颈** ：传统GKP态制备依赖自由空间光学（图1），难以实现大规模集成。
- **容错资源匮乏** ：现有光学方案缺乏容错量子计算必需的态结构（如多峰分布、维格纳负值晶格）。
- **器件损耗限制** ：光学损耗（<80%）阻碍了高品质GKP态的生成（图4）。

#### 2\. 提出的方法

- **集成光子芯片** ：
- 基于 **300mm氮化硅晶圆** 定制超低损耗波导（传播损耗<0.5dB）。
	- 采用 **光子分子设计** 的双谐振器压缩器（图2），抑制寄生非线性效应，实现脉冲近单模压缩真空态（压缩度10dB）。
- **四模高斯玻色采样（GBS）架构** ：
- 通过可编程线性干涉仪纠缠四路压缩态，PNR探测器触发式制备GKP态。
	- 片上光学滤波器（3）和（5）级联抑制泵浦光（抑制比>93%）。
- **高效率探测系统** ：
- 过渡边缘传感器（TES）PNR探测器效率达 **99.89%** （支持光子数分辨）。
	- 零差探测（HD）系统效率97%，用于态层析重建。

#### 3\. 实现的效果

- **GKP态质量** （图3）：
- 触发模式（3,3,3）生成矩形晶格GKP |1⟩态，维格纳函数呈3×3 负值网格。
	- 正交分量均观测到4个可分辨峰（容错必要条件）。
- **容错潜力** （图4）：
- 模拟表明：当路径传输效率 时 η>99.5%，可制备压缩度>9.75dB的GKP态（达到容错阈值）。

#### 4\. 创新点

- **首例集成光学GKP源** ：全球首个在集成光子芯片上实现GKP量子比特的实验。
- **可扩展制造工艺** ：基于300mm晶圆的氮化硅工艺兼容半导体量产，支持百万级光源阵列。
- **损耗控制突破** ：
- 探测器效率99.89%创世界纪录。
	- 端到端传输效率78–82%，较自由空间系统提升>50%。
- **架构通用性** ：
- 同一芯片可生成猫态、六角晶格GKP态等非高斯态（图3b），支持多样化量子编码。

### 核心价值

本工作验证了玻色子架构（Bosonic architectures）在光子量子计算中的可行性，通过 **集成光子学+高效探测** 的技术路线，解决了GKP态制备的可扩展性问题，为实用化容错量子计算机铺平道路。未来通过优化损耗（η>99.5%）与引入复用/提纯模块，可实现容错机器所需的GKP源阵列。

  

  

02  

摘要内容

构建实用的光子量子计算机需要强大的技术来合成能够编码量子比特的光学态。Gottesman-Kitaev-Preskill (GKP) 态提供了此类量子比特编码中最具吸引力的方案之一，因为它能够通过简单、确定性且与室温兼容的高斯操作来实现通用门集。 现有生成光学 GKP 态及其他复杂非高斯态的开创性演示均依赖于自由空间光学元件 ，这阻碍了实用规模系统最终所需的扩展能力。

本文中，我们利用在定制的多层氮化硅 300 毫米晶圆平台上制造的 **超低损耗集成光子芯片** ，并通过光纤耦合 **高效率光子数分辨探测器** ，来生成 GKP 量子比特态。这些态显示出容错所需的关键模式级特征，包括在 p 和 q 两个正交分量上至少四个可分辨的峰值，以及负维格纳函数（Wigner function）区域的清晰晶格结构（在此例中为一个 3×3 网格）。我们还证明，我们的 GKP 态显示出足够的结构特征 ，这表明在进一步降低光学损耗后，用于制造它们的器件能够产生适用于容错机制的状态。

本实验验证了光子量子计算玻色子架构的一个关键支柱，为未来将为容错机器提供支持的 GKP 源阵列铺平了道路。

  

03  

图文速览

**图 1：基于测量的量子计算所需的簇态资源制备的三个阶段。**

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**GKP 量子比特使用 GBS 源生成。多个 GBS 输出在精炼厂（refinery）处进行组合，以提升 GKP 源的整体质量和概率¹²。使用分束器（beamsplitter）网络²³，可以确定性地从这些态合成任意的簇态。为了实现可扩展且高质量的簇态，对 GBS 源进行可扩展制造的需求是显而易见的。**

****图 2：实验示意图与简化芯片布局图。****

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**一系列泵浦激光场和参考激光场通过光纤发送到经过光/电封装的芯片输入端。强经典光场经过滤波和分配 (1)，输入到基于双谐振器光子分子设计的四个压缩器阵列 (2)。产生的脉冲式、近单时间模的压缩真空态通过片上光学滤波器与泵浦激光分离 (3)，随后由可编程线性干涉仪（酉变换器）进行纠缠操作 (4)。另一个集成滤波器阵列进一步抑制泵浦光 (5)。三个光模被送至光子数分辨（PNR）探测器；当观测到符合要求的探测模式时，即宣告在剩余的光模中成功制备了 GKP 量子比特态，该态随后通过零差探测（HD）进行分析。**

****图 3：实验结果图****

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**图 4：对称有效压缩度随器件损耗的变化关系图**

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**四模 GBS 器件模拟输出态的对称有效压缩度随触发路径与被触发路径传输效率 η 的函数关系图。此处我们仅限于分析 (n, n, n) 形式的探测结果，因为它们属于质量最高的输出态之一。我们可以看到，在传输效率介于 70–82% 的范围内（如本实验所呈现），(3, 3, 3) 探测结果（虚线）表现最佳。当传输效率超过 99.5% 时，该器件足以制备满足容错要求的近似 GKP 态。**

文章信息： Larsen, M.V., Bourassa, J.E., Kocsis, S. *et al.* Integrated photonic source of Gottesman–Kitaev–Preskill qubits. *Nature* **642**, 587–591 (2025).  
  

DOI： https://doi.org/10.1038/s41586-025-09044-5

  

如若侵犯到原作者任何相关利益，请告知删除！翻译过程存在不准确或表述不清，以及任何疏漏，欢迎大家后台留言指正。

若需转载、投稿，请联系平台。

**免责声明:本文旨在传递和分享科研资讯，仅供个人学习、参考和学术交流使用，不作为商业用途，文中所引用文献已指明作者及来源。本文中所出现的所有图片均为转载，由于水平有限可能存在翻译解读不准确等问题，内容速览仅代表作者个人观点 仅供参考，如涉及知识产权保护或其他问题请及时联系邮箱3128469399@qq.com，我们将尽快协调处理。最终解释权归《等贤学社》公众号所有。**

**科研稿件|技术文章速递|关注公众号**

分享

收藏

点赞

在看

[![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=MzkxNTY5NTM2MQ==&mid=2247509786&idx=2&sn=30682125d244be4db6422b717a0f4bef&scene=21#wechat_redirect)

素材来源官方媒体/网络新闻

继续滑动看下一个

等贤学社

向上滑动看下一个