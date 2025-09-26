---
title: "普林斯顿陈丹琦组新作：RLHF难支撑，RLVR有边界？RLMT开辟第三条路"
source: "https://mp.weixin.qq.com/s/T_jtl65Cuu43LxZLSRX3zQ"
author:
  - "[[让你更懂AI的]]"
published:
created: 2025-09-26
description: "显式思考 + 偏好奖励：小模型逼近GPT-4o的新范式"
tags:
  - "小模型"
  - "显式思考"
  - "偏好奖励"
  - "逼近GPT-4o"
abstract: "普林斯顿陈丹琦组提出RLMT新范式，通过强制模型先写显式推理轨迹再用偏好奖励评判，使8B小模型在聊天和创作任务上逼近GPT-4o和Claude-3.7 Sonnet。"
---
Original 让你更懂AI的 *2025年09月26日 17:35*

![Image](https://mmbiz.qpic.cn/mmbiz_gif/Psho9dm7oDHKVtfYDubjKdZRUjAfBQQicXjoZWJ3qnK42ooD4eeJUfJBM4SSZVa2RE5lO0j6rWwzliby0j9u4bDg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

在大语言模型的进化史上，RLHF（Reinforcement Learning with Human Feedback）无疑是最具里程碑意义的范式之一：它让模型从“机械对话机”蜕变为“人类偏好的镜子”。但 RLHF 也有致命的弱点——它并没有要求模型真正去推理。于是我们常常看到模型给出的答案“似是而非”，表面上让人满意，实质上逻辑空洞。

  

另一方面，近两年兴起的 RLVR（Reinforcement Learning with Verifiable Rewards）在数学、代码等可验证任务上展现了惊人的威力。它要求模型必须先写出显式推理轨迹，再用规则判定答案对错。这让模型在“算题”上表现优异，却难以推广到开放式任务，因为这些场景里并没有唯一的“对错”标准。

  

那么，能否把 RLHF 的“神”与 RLVR 的“形”结合起来？让模型既学会显式思考，又能生成合乎人类偏好的回答？

  

普林斯顿陈丹琦组的最新论文给出了答案：RLMT（Reinforcement Learning with Model-rewarded Thinking）。它强制模型在回答前“写下长链推理”，再用偏好奖励模型来评判最终答案。

  

实验结果显示：一个 8B 模型，凭借 RLMT，就能在聊天和创作任务上逼近甚至超越 GPT-4o 和 Claude-3.7 Sonnet。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhglS4qOGd9Db5eeUicUy83LrlzFID32NeSHicjuW69gMxib3s8ZA7n5ib9Cg8MgZCOS3ia4LoIcqCSpFaqw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

  

**论文题目：**

Language Models that Think, Chat Better

**论文链接：**

https://arxiv.org/pdf/2509.20357  

**代码链接：**

https://github.com/princeton-pli/RLMT

  

这不仅是技术上的突破，更是范式上的转折。下面，我们就沿着论文的逻辑主线，逐步拆解 RLMT 的核心思想与实验发现。

  

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/Psho9dm7oDGhKg9nnSz5qQrwKvXibt3wulOVRfC18yCkd6xXqGq22h6QUk8chptF0fnQ4uXeZtAktYMrWwG2SyQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

RLMT的形与神

如果把 RLHF 看作“人类偏好的镜子”，RLVR 看作“可验证推理的钢尺”，那么 RLMT 就是试图把两者合一：既要模型学会显式地思考，又要它的回答能合乎人类的期待。

  

在 RLMT 中，模型被强制先写下一段思考轨迹 z，然后再产出最终回答 y。不同于 RLVR 那种用严格校验器来判定“对错”，这里的评价者是一个偏好奖励模型 r。于是，训练目标就变成了：

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhglS4qOGd9Db5eeUicUy83Lrlx3LHjz1zTz4qmwiaw1aZzTWicXCYfJ3pqo1PVVxA08A3DTibU03qzx7YQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

为了更好理解，我们先回顾两条“父路线”：  

  

RLHF 的目标函数：

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhglS4qOGd9Db5eeUicUy83LrlC6f6gfaico757sRTVWKjFIkxLrG8eCuojhDgtd4X4DknLOIBbdbVJHg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

RLVR 的目标函数：

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhglS4qOGd9Db5eeUicUy83LrlnTFWJSyBdXG7ho35O2vNic6rr0wWtLEvaaIWkxNNc4j66YmujvxK3EA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

对比可见：RLMT 延续了 RLVR 的“先想后答”生成方式，但最终奖励机制不是硬性的对错判据，而是 RLHF 风格的人类偏好模型。这使得模型必须生成推理链条，但又能在开放域场景里保持灵活。

  

图 1 展示了三者的结构差异：RLHF 直接用偏好奖励，RLVR 强调严格验证，而 RLMT 则把“显式思考”与“偏好打分”结合在一起。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhglS4qOGd9Db5eeUicUy83LrlqHCyPkEDJtaVibr4mibh3XibLSOyoNUicN72IJ2BoDiaWx0T4Ijw4BIFLYA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

▲ 图1. RLMT框架结合了RLVR的显式思考流程与RLHF的偏好奖励机制。

  

图 2 给出了 RLMT 的案例：面对开放式问题，模型会先写下一段 checklist 或草稿式规划，再生成最终回答。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

▲ 图2. RLMT让模型在回答前显式生成推理轨迹，思维风格从checklist向迭代修订转变。

有效成分拆解  

  

论文的消融实验表明，RLMT 的成功并非单点创新，而是多因素叠加的结果：

- 奖励模型的强度是关键基石。 作者使用了 Skywork 系列奖励模型，并发现当奖励模型更强时，RLMT 的表现显著更好；反之，弱奖励模型会让整体性能下滑。
- 提示分布比数据规模更重要。 相比堆砌大规模指令数据，选择更贴近真实聊天语境的 WildChat-IF 子集（约 7.5k 样本）反而带来了更稳定的收益。
- 算法选择并非唯一要素。 在 GRPO、PPO、DPO 三种优化器下，RLMT 都能有效运行，且 GRPO 效果最佳，但整体差异并非决定性。

  

这些因素共同保证了 RLMT 不仅在数学公式上“看起来合理”，更在工程实践中“跑得顺畅”。

  

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

从验证到突破  

显式思考，是否真的有用？

论文的第一个问题是： 如果强制模型“先思考再回答”，到底有没有收益？

  

答案写在表 1 的上半部分。同样是 8B 模型，RLMT 在几乎所有开放域基准上都比 RLHF 高出 1.5–4 分。尤其是 WildBench 和 AlpacaEval2，提升最为明显。这证明“显式思考”不是负担，而是助力。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

▲ 表1. 上半部分中， RLMT在WB、AE2、CWv3等任务上明显超过RLHF。

从“小模型”到“大对手”  

表 2 展示了 RLMT 8B 模型与 GPT-4o、Claude-3.7 Sonnet 的对比。在 WB 和 AE2 上，8B-RLMT 不仅超过 GPT-4o，还短暂反超 Claude。虽然在 AH2 和 CWv3 上仍有差距，但整体平均分 54.1，已比 GPT-4o（53.2）更高。

这说明，RLMT 让小模型第一次具备了与旗舰商用模型“掰手腕”的可能性。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

▲ 表2. 8B-RLMT在部分任务上实现对GPT-4o、Claude的超越。

### 数学逻辑 ≠ 通用推理

图 3 揭示：仅在数学域训练出来的 RLVR 模型，迁移到开放域时效果几乎失效；而 RLMT 在 WildBench 等任务上表现稳定。

  

逻辑很清楚： 推理链条需要配合合适的奖励信号。 单纯可验证的“对错”无法推广到开放式场景。  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

▲ 图3. 数学域RLVR模型在WildBench上表现不佳，而RLMT保持优势。

如果连SFT都跳过？  

**表 1 的下半部分** 给出答案：Zero-RLMT。

- 在 Qwen-2.5-7B 上，Zero-RLMT 平均分 **36.4** ，超过 Instruct 的 **35.0** 。
- 在 Llama-3.1-8B 上，总分略低（28.7 vs 30.8），但在聊天能力（AvgChat）上反超 **5.5 分** 。

  

这说明 RLMT 的关键并不依赖繁重的 SFT，哪怕从零开始，它依然能跑通。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

▲ 表1. 下半部分中， Zero-RLMT在Qwen上全面超过Instruct，在Llama上聊天能力更强。

  

算法选择只是细节

*表 3 表明：不管是 DPO、PPO 还是 GRPO，RLMT 都能稳定超过 RLHF。差别在于 GRPO 最优，比 PPO 高 1–3 分，比 DPO 高约 5 分。但核心增益来自“显式思考 + 偏好奖励”，而不是具体优化器。*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*▲ 表3. GRPO效果最佳，但RLMT在不同优化器下都成立。*

  

消融实验：验证哪些因素真正关键

在方法部分，作者提出过“有效成分假设”：奖励模型的强弱、训练提示分布的质量，以及 warm-start 的来源，可能决定最终性能。

**表 4 的 消融实验** 正好从三个角度验证：

- **Prompt mixture** ： 结果显示，WildChat-IF 子集效果最佳，比 UltraFeedback 或随机混合更能提升性能。这印证了前文的观点：相比数据规模，训练分布的“贴合度”更关键。
- **Warm-start source** ： 这里作者没有使用 Gemini-2.5，而是采用 **GPT-4.1-mini** 生成的 SFT 数据来做预热。结果表明，即便换成 GPT-4.1-mini，RLMT 依然能跑通，并保持与原始设置类似的趋势。这说明 warm-start 的来源并不是决定性因素。
- **Reward model 强弱** ： Skywork-V2 显著优于 V1 和 ArmoRM。强奖励模型不仅提升聊天任务分数，还能减少在非聊天任务上的性能下滑。

换句话说，表 4 给出的是对前文“有效成分拆解”的一次 **实证检验** ：奖励模型和提示分布才是最重要的杠杆，而 warm-start 来源和优化算法只是细节。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*▲ 表4. 消融实验印证奖励模型和提示分布才是RLMT的真正杠杆。*

  

思维风格的蜕变

图 4 显示：RLMT 模型逐渐学会“设约束—分主题—迭代修订”的推理风格，而非 checklist 式罗列。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

▲ 图4. RLMT让模型从“线性checklist”迁移到“迭代规划+修订”的思维风格。

图 5 则揭示：随着训练步数增加，思考与回答的长度同步增长，这不是灌水，而是推理链条逐渐固化为习惯。  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

▲ 图5. RLMT训练过程中，思考与回答长度同步增长，体现出更系统的推理习惯。

  

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

从公式到风格：RLMT真正改变了什么？

RLMT 的价值并不仅仅体现在分数提升上。它真正改变的，是模型在 **公式层面** 与 **风格层面** 的双重属性。

  

在公式层面，RLMT 巧妙地把 RLHF 的人类偏好奖励与 RLVR 的显式思考轨迹统一到一个目标函数中。这意味着“逻辑”与“偏好”不再分割，而是被绑定在一次训练里。

  

在风格层面，RLMT 重塑了模型的生成习惯。实验中的图 4 与图 5 清楚表明：模型从 checklist 式的平铺直叙，进化为更像人类的迭代式规划。它不再满足于“先写几个要点”，而是学会了“设约束—分主题—不断修订”。

  

因此，RLMT 的贡献不只是“涨分技巧”，而是为小模型注入了“大智慧”的萌芽。

  

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**从“镜子”与“钢尺”到“第三条路”**

  

RLMT 的提出不仅延续了 RLHF 的“神”与 RLVR 的“形”，更开辟出了一条“第三条路”。它回答了一个长久的困境：如何让模型既能合逻辑，又能合人意。

  

这条新路的潜力至少体现在两个方向：

- **奖励模型的精细化** ： 随着更强的偏好模型出现，RLMT 的效果还会持续增强。
- **多模态与工具调用** ： 如果未来 RLMT 驱动的思维不止是文本，还包括图像、代码执行、搜索规划，它可能真正成为“通用推理基座”。

  

在 RLHF 难以支撑、RLVR 又有边界的当下，RLMT 让我们看到了新的可能性：小模型通过后训练范式，也能逼近甚至对标最强商用模型。

  

这不仅是一次实验上的突破，更是一种范式的转折。从“镜子”与“钢尺”到“第三条路”，RLMT 可能正是通往更通用智能的重要节点。

  

**更多阅读**

[![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=MzIwMTc4ODE0Mw==&mid=2247708184&idx=3&sn=e8dd6c6796bd12ff6fa56fd976ecb5c9&scene=21#wechat_redirect)

[![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=MzIwMTc4ODE0Mw==&mid=2247708088&idx=3&sn=24dc98643fdeb60547d628c0f02368b4&scene=21#wechat_redirect)

[![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=MzIwMTc4ODE0Mw==&mid=2247707435&idx=1&sn=ddc3a53b1cf3024f49cd527db32e08b3&scene=21#wechat_redirect)

  

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**# 投 稿 通 道 #**

**让你的文字被更多人看到**

  

  

如何才能让更多的优质内容以更短路径到达读者群体，缩短读者寻找优质内容的成本呢？ **答案就是：你不认识的人。**

  

总有一些你不认识的人，知道你想知道的东西。PaperWeekly 或许可以成为一座桥梁，促使不同背景、不同方向的学者和学术灵感相互碰撞，迸发出更多的可能性。

  

PaperWeekly 鼓励高校实验室或个人，在我们的平台上分享各类优质内容，可以是 **最新论文解读** ，也可以是 **学术热点剖析** 、 **科研心得** 或 **竞赛经验讲解** 等。我们的目的只有一个，让知识真正流动起来。

  

📝 **稿件基本要求：**

• 文章确系个人 **原创作品** ，未曾在公开渠道发表，如为其他平台已发表或待发表的文章，请明确标注

• 稿件建议以 **markdown** 格式撰写，文中配图以附件形式发送，要求图片清晰，无版权问题

• PaperWeekly 尊重原作者署名权，并将为每篇被采纳的原创首发稿件，提供 **业内具有竞争力稿酬** ，具体依据文章阅读量和文章质量阶梯制结算

  

📬 **投稿通道：**

• 投稿邮箱： hr@paperweekly.site

• 来稿请备注即时联系方式（微信），以便我们在稿件选用的第一时间联系作者

• 您也可以直接添加小编微信（ **pwbot02** ）快速投稿，备注：姓名-投稿

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**△长按添加PaperWeekly小编**

  

  

🔍

  

现在，在 **「知乎」** 也能找到我们了

进入知乎首页搜索 **「PaperWeekly」**

点击 **「关注」** 订阅我们的专栏吧

  

  

·

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

PaperWeekly

向上滑动看下一个