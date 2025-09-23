---
title: "快手解密「AI印钞机」，首提生成式强化学习出价技术，为平台实现超过3%的广告收入提升"
source: "https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&chksm=8573ac9c1ed4e1c3e60e1f877a99ed247b1304568fbbc6a58d8ea20107f104415dd354e35256&idx=1&mid=2650992290&sn=992b53c6354cc4e5cbab44f4bcb31f61#rd"
author:
  - "[[机器之心]]"
published:
created: 2025-09-23
description: "快手商业化算法团队用生成式强化学习为平台实现了超过 3% 的广告收入提升。"
tags:
  - "生成式强化学习"
  - "广告自动出价"
  - "收入增长"
abstract: "快手商业化算法团队提出生成式强化学习出价技术，为平台广告收入带来超过3%的提升。"
---
Original 机器之心 *2025年09月23日 12:05*

机器之心报道

**编辑：Panda、张倩**

  

前段时间，谷歌母公司 Alphabet 市值突破 3 万亿美元，成为第四家市值达到这一门槛的公司。

  

如果时间倒回到两年半以前，谷歌自己可能都没有想到这一结果。当时，ChatGPT 带来的冲击让外界开始质疑谷歌能否守住营收，尤其是广告营收。甚至还有人发出灵魂追问：谷歌会成为下一个诺基亚吗？

  

然而，事实的发展出乎许多人意料 —— 谷歌不仅稳住了广告基本盘，还通过将生成式 AI 融入搜索和广告投放，提升了用户意图理解和广告匹配效率，让广告价值进一步放大。

  

在国内，我们也看到了这种趋势。上个月，快手发布了 Q2 财报。财报显示，这一季度， 快手线上营销服务收入 198 亿元，同比增长 12.8% 。财报明确指出，大模型在投放出价、营销推荐方面的应用取得显著进展。在营销出价方面，快手优化了生成式出价算法，运用强化学习和长期价值策略，提升了广告转化效果。在营销推荐环节，快手利用大语言模型的内容理解和推理能力，采用生成式方法筛选广告，深入挖掘用户行为与广告转化的关联性，生成符合用户兴趣的广告内容，经过排序优化后显著提高点击率，推动营销服务收入实现两位数增长。 这些信号表明，AI 技术正在从根本上驱动广告行业的收入增长。

  

不过，从技术上来看，这不是一蹴而就的，相关技术在过去的几年里经历了多次迭代。以 实时竞价（RTB）广告系统中的「大规模广告自动出价」问题为例，相关技术经历了经典控制、规划求解、强化学习、生成模型等数代演化，如今又迎来了「 生成式强化学习 」这一全新范式。

  

这一新范式由快手首次提出。其核心思想是「让出价模型能多维思考」，更充分地利用历史出价序列信息，从而做出更精准的决策。2025 年至今，这一范式已在快手广告系统全面落地，在保持广告主既定成本目标不劣化（成本达标不降） 的前提下， 为平台实现了超过 3% 的广告收入提升。

  

那么，这一效果是怎么实现的？在快手发布的几篇论文中，我们可以找到答案。

  

广告自动出价

在不确定中寻找最优解

  

在深入探讨快手的技术革新之前，我们有必要先对「广告自动出价」有一个基本的理解，尤其是其核心逻辑与挑战。

  

简单来说， 广告自动出价 ，也被称为 智能出价 ，是使用算法，根据用户广告产生点击或转化的可能性自动为这些广告设置出价。过程中无需手动更新，它会为用户完成所有繁重的工作，以相当于或优于现有效果目标的成本效益，推动实现更高的转化量或转化价值。

  

总结起来，相比于手动或人工出价， 自动出价有三大优势 ：

  

- 真正的实时出价
- 查询一级的自适应学习
- 丰富的用户信号和跨信号分析

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW8libWy2fdFKv0Q547ibX6SmfeRnYRzY2w7vt5qGrttU5Ra2MFEyN0T1H3ayXmRXic1iaj0hgibVrahRKg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

实时出价系统示意图

  

然而，要实现理想的自动出价却非易事，而这就涉及到了广告出价的 核心挑战 ：

  

- 既要花钱，又要省着花 ：广告主既需控制单日花费不超预算，又需尽可能降低每次转化（如购买、下载等）的成本。
- 未来难以预测 ：系统无法预知即将到来的流量状况和竞争对手行为，必须依据实时花费与成本等数据动态调整出价。
- 牵一发而动全身 ：每次出价会影响广告展示与消耗，改变账户状态（如剩余预算），进而影响后续出价，构成连续而复杂的序列决策问题。

  

针对这些挑战，业界提出了许多不同的解决方案并一直在不断迭代，比如互联网广告行业龙头谷歌广告（Google Ads）使用了一种基于机器学习的自动出价系统，它可借助历史转化数据训练点击率（CTR）、转化率（CVR）等预测模型，结合拍卖时上下文信号（设备、地理位置、时段、浏览环境等），在每次竞价中实时调整出价（使用了强化学习思想），以最大化广告主的 ROI（如转化次数、收入、ROAS）的目标。

  

而快手的出价算法此前也已经经历了多轮迭代，整体可以总结为从 PID、MPC 到强化学习（RL）的「三代」演化路径。若将这一过程比喻为汽车工业的发展：

  

- 第一代（PID） ：包含了三个关键的控制参数：比例（Proportional）、积分（Integral）和微分（Derivative）。该算法可以通过动态调整出价来很好地将广告平均成交价稳定在目标成交价，但不足的点在于对未来消耗和预期消耗没有预估和规划。 这就像是定速巡航 。它只能根据当前速度和设定速度的差异来调整油门，反应直接但比较「笨」，难以应对复杂多变的竞价环境。
- 第二代（MPC/Model Predictive Control） ：引入了对未来的预测，在对出价与未来消耗、成本的关系进行建模的基础上能够做出更精准的出价规划。不过，该算法建模能力较弱，也无法做出多步长期决策。 这就像是更高级的自适应巡航 。通过预测未来短时间内的路况以调整车速，但其建模相对简单，易陷入局部最优，本质上难以实现效果的根本性突破。
- 第三代（强化学习） ： 如同根据专家驾驶数据学习的 AI 驾驶员 。通过分析海量历史驾驶数据（离线数据集），学习在特定状态下的最佳动作（出价），以最大化全程奖励（广告效果）。该方法安全性高（不直接影响线上业务），且能够挖掘数据中蕴藏的更优策略。

  

现如今，快手的出价算法已经进化到了第四代： 生成式强化学习 。

  

顾名思义，生成式强化学习是一种将当今大热的生成式模型与强化学习技术融合起来的新方法。它弥补了之前的强化学习的一些突出短板。

  

简单来说，之前的强化学习技术有点像 「一维思考」，只根据单步状态信息进行决策，对于出价状态序列信息利用不够充分。而生成模型（如 Transformer、Diffusion）特别擅长理解和生成有复杂模式的序列数据。反过来，生成模型本质是模仿数据集的动作，高度依赖数据集质量，难以优化序列整体价值；而强化学习能够学到超出数据集效果的策略，直接优化序列整体价值，在原理上相比生成模型具有更高的收益空间。

  

这两大范式互相增益，便造就了「生成式强化学习」，其能让出价模型实现「多维思考」，从而更充分地利用历史出价序列信息，从而做出更精准的决策。

  

双剑合璧

详解 GAVE 和 CBD 算法

  

将生成式模型的能力引入强化学习，无疑为广告出价带来了强大的新动能。但在实践中，直接应用生成模型建模出价策略，也会面临其固有的挑战。

  

此前，业界已经探索了两种使用生成模型的路径：

  

- Generative Model as a world model ：建立一个可以模拟不同出价策略下广告投放结果的「数字沙盒」，生成大量训练数据来增强模型学习。
- Generative Models as policies ：用生成模型直接建模强化出价策略，提升对于出价状态序列信息的利用能力。

  

具体到技术框架上，业界采用的主流方法有两类：

  

- Decision Transformer (DT) ：其机制类似于大语言模型中的「下一 token 预测」 。模型会依据历史状态、调价动作与奖励序列，预测能够最大化序列整体价值的最佳出价动作。
- 扩散模型（Diffusion Model） ：这一过程则犹如一位「AI 画家」 。模型基于已有状态从噪声中勾勒出理想的未来轨迹（如预期消耗、成本曲线），再逆向推导出当前应当执行的出价。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9HU4XJDibfrIcpWn8Xmhbuy38tvpqS7fiaYHGYNAB2c6icQwD1cazWfA2d7Psp03WpV7SnxDpDgSkDw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

Decision Transformer 架构

  

然而，无论采用哪种路径，都必须面对两大核心挑战：

  

- 依赖高质量数据集 ：生成模型的效果高度依赖于训练数据的质量 。在离线训练时，如果探索超出现有数据范围，很容易遇到 OOD (Out of Distribution) 问题，导致模型效果崩塌。
- 和优化目标难以对齐 ：生成模型在原理上是模仿学习，难以直接最大化序列的整体收益，因此存在和最终优化目标难以对齐的问题。

  

针对这两大业界难题，快手商业化算法团队提出了 GAVE 和 CBD 两大创新算法，如同「双剑合璧」，分别予以破解。

  

GAVE 算法，为探索配备价值罗盘，超越数据局限

  

GAVE，全称 Generative Auto-bidding framework with Value-Guided Explorations，即由价值引导探索实现的生成式自动出价框架，诞生于快手商业化算法团队今年 4 月发表的同名论文。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9HU4XJDibfrIcpWn8Xmhbuyb7MwpuIz0ShcKN6Kn8g0mUaKTDOLrkV03bnUlDZQnlK39n8sjE104w/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

  

- 论文标题：Generative Auto-Bidding with Value-Guided Explorations
- 论文地址：https://arxiv.org/abs/2504.14587

  

该算法解决了将 Decision Transformer (DT) 架构应用与广告自动出价的两大挑战：

  

- 出价存在转化、成本多个目标，如何能让 DT 架构更好地适配广告多个投放目标；
- DT 的学习原理是模仿数据集的出价动作，其效果受限于数据集质量。

  

具体来说，快手商业化算法团队分别针对这两大挑战构建了一个解决方案： Score-based RTG（Return to Go）模块和基于价值函数的动作探索机制 。而 GAVE 便是这两大解决方案的创新性融合。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9HU4XJDibfrIcpWn8XmhbuyqjVpkyURic8lNO128QAIQ6dFuA1SjNdeA5qhialwcppn19gIwtSg0cdg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

GAVE 算法架构图

  

其中，Score-based RTG 可把当前时刻到序列结尾的成本率约束加到每个时刻 t，使得 RTG 对齐最终评估指标（带惩罚的总转化）。通过灵活调整得分函数参数，框架可适配 CPA、ROI 等不同广告场景需求，以实现目标导向的出价生成决策。

  

而基于价值函数的动作探索机制包含两个模块：动作探索和可学习价值函数。

  

- 动作探索（Action Explorations）模块 ：首先生成探索动作，然后预估原动作和探索动作的长期价值，最后让模型的预测动作更多地向原始动作和探索动作中价值最大的那个动作进行更新。
- 可学习价值函数（Learnable Value Function）模块 ：首先借鉴 IQL 算法的期望回归损失，预估当前序列下未来回报（RTG）的上界，形成探索动作的价值参考锚点；然后使扰动动作的 RTG 向预测的最优价值更新，这有效地避免无效或者危险的探索。

  

那么，GAVE 算法的表现如何呢？快手商业化算法团队通过离线和在线实验进行了验证。

  

在 AuctionNet 基准上，GAVE 在不同预算设置与数据条件下均取得最优效果，相对于 DT 更是显著提升。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9HU4XJDibfrIcpWn8XmhbuyskCufcuYQOE6eCROcYSsqcicHNnLTVj6rt7YYUicwlusbd9SvYTygVgw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

GAVE 与其它基线方法的 AuctionNet 性能对比

  

不仅如此，该团队还将 GAVE 算法部署到了其大型广告系统中，进行了线上 A/B 测试。结果表明，在 Nobid（预算约束下最大化转化）和 Costcap（CPA 约束下优化转化）两种场景中，GAVE 均显著优于基线。GAVE 在真实广告竞价环境中的有效性与实用性得到了验证。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9HU4XJDibfrIcpWn8XmhbuyJiagNdQG27jFUL59WNic8VMWHnHjJqHtG78lAdpiaT0dZ1O4EHdW71wtg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

在线 A/B 测 试结果

  

据了解， 该论文已被顶会 SIGIR 接收 。

  

CBD 算法，以补全+对齐破解目标难以对齐的挑战

  

CBD 算法则是快手商业化算法团队在本月初公布的新方法，全名 Causal auto-Bidding method based on Diffusion completer-aligner，即基于扩散式补全器-对齐器的因果自动出价方法。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9HU4XJDibfrIcpWn8XmhbuysO3NOmoOicUYgEejRoghwAqYNWAoqLswTjaB9rcJ0NVEsKtYGCtwiaHg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

  

- 论文标题：Generative Auto-Bidding in Large-Scale Competitive Auctions via Diffusion Completer-Aligner
- 论文地址：https://arxiv.org/abs/2509.03348

  

CBD 的提出是为了解决基于 DT 的出价技术和直接应用扩散模型（Diffuser）的出价技术的不足。比如基于 DT 的出价技术可能导致误差的累积，缺乏长程规划能力，且可解释性较差，而直接将 Diffuser 应用于广告出价则可能遭遇 生成状态序列合法性问题 与 难以和偏好对齐的问题 。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9HU4XJDibfrIcpWn8XmhbuyQVHbH2g15jb8FLHjmz3tfQV5YER3QrnQkhUuCgibJvX3LMYVpenjKbg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

生成状态序列一致性问题和偏好不对齐问题， 图中 (a) 和 (d)

  

为促使基于扩散模型的生成式强化学习出价模型与优化目标更好对齐，快手商业化算法团队 为 CBD 算法创新性地引入了 Completer 和 Aligner 两个模块。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9HU4XJDibfrIcpWn8XmhbuysFF5xgk0WHmiaRc5163nKMiaAHhEHD8ycNdBP0Nfib3SYsHaQnKQt8cibQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

CBD 算法架构示意图

  

- Completer 的作用是基于历史观测序列扩散补全未来序列。就像手机输入法的联想功能，根据你已经打出的字，预测你接下来想说什么。Completer 也是这样，它根据广告已经发生的情况（历史数据），来预测接下来可能发生什么，确保整个计划是连贯、合理的，不会出错。
- Aligner 则是对生成序列进行偏好对齐，从而实现离在线环境下的性能提升与稳定部署。在 Completer 预测出一个合理的计划后，Aligner 会介入。它会根据广告主真正的目标（比如「花最少的钱拿最多的订单」），对这个计划进行微调和优化，确保最终执行的是最佳方案。

  

快手商业化算法团队也已经通过实验证明了新方案的有效性。前面关于「生成状态序列一致性问题和偏好不对齐问题」的图片中就给出了非常清晰的展示。可以看到，Completer 和 Aligner 的表现显著优于通过条件式扩散建模实现的生成式自动出价方法 DiffBid，并极大地缓解了生成状态序列一致性问题和偏好不对齐问题。

  

在基于 AuctionNet 的离线实验中，如下表所示，基于所竞得的总转化价值（Value）指标，CBD 的表现明显优于基线算法性能（包括离线强化学习和 DT 等生成模型方法）。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9HU4XJDibfrIcpWn8XmhbuyT8LWyDM1q9rDtCr9B6jk5H4PIPC3ZTmRA1gXiaibTpKVj0vMec5jwywQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=9)

离线实验中，不同方法竞得的总转化 Value

  

该团队同样也在快手的大型广告系统中对 CBD 进行了在线 A/B 测试，结果也同样非常亮眼。 在保持相近预算（成本）的情况下，广告主实现的平均转化率（目标成本）提升 2% 。

  

尽管该方法相比 DT 方法增加了 6ms 的额外延迟，但因为 出价模型调用频率是 20 秒一次，而每次可接受的最大返回时间是 26ms，因而 6ms 的延迟增加对于出价场景是完全可以接受的。该团队在论文中写道：「考虑到所取得的巨大商业价值，额外的推理延迟是值得且正当。」

  

快手商业化算法团队

从赛场冠军到实际业务增长

  

这些行业领先的技术成果，均出自快手商业化算法团队之手。作为快手的核心算法部门，该团队负责快手国内及海外多场景的广告变现算法研发，致力于通过前沿算法驱动商业营销增长，并持续优化用户体验与客户效果。

  

该团队在业界早已声名鹊起。在 2024 年的机器学习顶会 NeurIPS 上，快手团队从超过 1500 支国内外队伍中脱颖而出，一举包揽了「大规模拍卖中的自动出价」竞赛通用赛道和 AIGB 赛道的 双料冠军 ，成为赛事最大赢家。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9HU4XJDibfrIcpWn8XmhbuyD9MlaOwZBRBCWrD14Ro4rvnOtXLK7wWwyFIVd1qEE8MY1LXq1BBaZw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=10)

快手包揽 NeurIPS 2024 Auto-Bidding in Large-Scale Auctions 比赛两个赛道第一名

  

除此之外，团队依托快手实际业务问题，在智能出价和广告推荐均有大量研究成果产出，发表在KDD、ICLR、ICML、NeurIPS 等国际顶会上，并先后斩获 CIKM Best Paper、SIGIR Best Paper 提名奖、钱伟长中文信息处理科学技术奖一等奖等荣誉。

  

从赛场冠军到业务增长，这些学术与竞赛上的硬实力，最终都转化为了驱动业务增长的强劲动力。如今，以 GAVE 和 CBD 为代表的生成式强化学习出价技术已在快手广告系统中得到应用，在保持广告主既定成本目标不劣化的前提下， 为平台实现了超过 3% 的广告收入提升 。

  

广告自动出价的未来

不止于此

  

从 PID 控制到 MPC 规划，再到强化学习，快手在广告出价领域的探索最终通过 GAVE 和 CBD 算法，迈入了「生成式强化学习」的全新阶段。这不仅是技术的又一次迭代，更是决策理念的根本性跃迁 —— 从单步状态决策，转向基于历史序列决策。已实现的广告收入提升，仅仅是这场变革的开端。

  

展望未来，快手在生成式强化学习出价技术上的探索并未止步。基于当前的成功实践，快手认为该技术仍存在两大重要的演进方向：

  

- 出价基座大模型 ：依托多场景、多目标的出价历史序列数据，基于 DT 或 Diffusion 架构训练通用基础出价模型，充分发挥数据与算力的规模效应；
- 出价推理大模型 ：引入大语言模型的复杂推理机制，增强出价模型的可解释性与决策思维能力，推动自动出价向更高智能层次迈进。

  

总体来看，从赛场冠军到业务增长，快手正通过对 AI 核心技术的持续探索和应用，不断巩固其在内容社区和数字广告领域的领先地位。从出价基座大模型到推理能力的进化，快手不仅为自身的商业增长描绘了清晰的蓝图，也为整个行业的提供了极富想象力的发展和探索方向。

  

© THE END

转载请联系本公众号获得授权

投稿或寻求报道：liyazhou@jiqizhixin.com

继续滑动看下一个

机器之心

向上滑动看下一个