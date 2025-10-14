---
title: "NeurIPS 25 | GRPO进阶版来了，GVPO重构大模型后训练范式"
source: "https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&chksm=859f8caef4a7db5b59f116f8dc3f5b1810b185516eb07844b8b63ff7cfcbf10c2e01275f8cc0&idx=2&mid=2650995196&sn=fd5d3a4b54dc3085dc2fe1c8a283f5ed#rd"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-10-14
description: "大模型后训练正在成为AI进化的关键一环。"
tags:
  - "后训练"
  - "稳定性"
  - "最优解"
abstract: "作业帮团队提出GVPO方法，通过避免重要性采样解决GRPO训练不稳定的问题，并在数学推理任务中全面超越现有方法。"
---
*2025年10月14日 10:06*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWic1GuW68DykycvknmG9tyBv6ax8e99N0eyLy4Qo7OzKR5sgwWkpGv1vxoygrqI14ssGoXb90ibG6Jw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

大模型后训练（post-training）正在成为 AI 进化的关键一环。从最早的 SFT（监督微调），再到近来大火的 GRPO，一条核心主线贯穿始终：如何让大模型具有更强的推理能力、更好地对齐人类偏好，同时保持稳定和高效。

  

然而，GRPO 虽然在 DeepSeek-R1 等项目中大放异彩，但其训练不稳定、超参数敏感的问题一直限制其大规模落地。

  

现在，作业帮团队联合香港科技大学（广州）在 NeurIPS 2025 上提出了全新方法： GVPO（Group Variance Policy Optimization） 。GVPO 通过避免重要性采样解决了 GRPO 的稳定性难题，并能在理论上提供了唯一最优解保证，并且在实验中表现全面超越现有方法。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9ScciaOLgKiaTpH80iaT5xHHp9MOATgbHOcibupJbOz0eAE0Q2hYd7ibnqExKrYLuJWUdGX2LvH6NoHicg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)
- 论文标题: GVPO: Group Variance Policy Optimization for Large Language Model Post-Training
- 论文链接：https://arxiv.org/abs/2504.19599
- 作者：张恺晨、洪煜中、鲍军威、蒋宏飞、宋旸、洪定乾、熊辉
- 单位：作业帮教育科技有限公司、香港科技大学（广州）

  

GVPO 设计动机

  

受到 DPO 的启发，研究团队也希望在 GRPO 的场景（即每个 prompt 进行多次采样）下，同样能够利用 KL 约束下 Reward 最大化 的解析解：

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9ScciaOLgKiaTpH80iaT5xHHpL6ZgpVmFz9cWJG6mfYh3V1rbQOAuicqmbujiaN3BHUxxSjlJxZr86epg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

但这里存在一个实际困难：公式中涉及的 Z (x)，它需要对所有可能的采样 y 进行期望计算，在实践中几乎不可行。为了解决这个问题，研究团队发现：只要保证同一个 prompt 下所有采样对应的梯度权重之和为 0，Z (x) 就会自然消掉，从而规避了这一计算难题。

  

GVPO 是什么？

  

基于这一思路，研究团队首先提出了以梯度形式表示的 GVPO Loss:

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9ScciaOLgKiaTpH80iaT5xHHpHP38otIQ1qkDgo7yqIWykLzpicFxiaY8EdL9m81xuswNGicVFCmGLHR1A/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9ScciaOLgKiaTpH80iaT5xHHpWw1XjQHM3SZ6QmuBWJZrxDCpFclLCuN4flfKuSPUPvWjEXuCnLoRbQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

  

研究团队进一步分析后发现，GVPO 拥有非常直观的物理意义。其 Loss 等价于一个均方误差损失（MSE Loss）：

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9ScciaOLgKiaTpH80iaT5xHHpD8cOa3ibdeicov2IovBiarsKJ1nfqw3W5xUAnasdodV4CZH8lDXlfLmQw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

其中：

  

- 真实值 来自实际奖励的中心距离；
- 预测值 来自隐式奖励（由当前策略与参考策略推导）。

  

换句话说，GVPO 在本质上是用 MSE Loss 让「 隐式奖励」去逼近「 真实奖励」。

  

两大关键优势

  

1\. 唯一最优解保证

  

基于 GVPO 的 MSE 形式，研究团队从必要性和充分性两方面严格证明：当且仅当 R\_θ=R 时，GVPO 达到唯一最优解。换句话说，GVPO 的理论最优解正是 KL 约束下的奖励最大化 的解。这一点在数学上确保了算法的有效性与稳定性，也为其在实际应用中的可靠表现提供了坚实保障。

  

2\. 无须重要性采样

  

研究团队进一步发现，GVPO 的唯一最优解对训练时的采样分布几乎没有限制。除了常见的 和前一步 ，GVPO 还能适配任意满足条件 的分布 —— 而这种条件在当代大模型的 Softmax 解码过程中天然成立。

  

这意味着 GVPO 能够天然支持无需重要性采样的 off-policy 训练，在充分利用人类专家数据、蒸馏数据和历史数据的同时，避免了重要性采样常见的训练不稳定问题，从而更契合大规模工业级应用场景。

  

三种分析视角：从不同角度理解 GVPO

  

研究团队发现 GVPO 的核心思想可以从三个互补的分析视角来理解，每一种都对应着图中展示的等价损失函数：

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW9ScciaOLgKiaTpH80iaT5xHHpsHxmEDTnorSjDAJ5HUnjotJjCNsgwZF35QBbyExMeaBNH1Q37ZfcRQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=13)

1\. 负对数似然视角（NLL）

  

在这个视角下，GVPO 的损失函数可以表示为带权重的负对数似然。一个关键点是：带 KL 约束的 Policy Gradient 实际上可以看作 GVPO 在 on-policy 采样下的特例。换句话说，GVPO 不仅涵盖了传统策略梯度方法的更新方式，还进一步解耦了采样分布与学习策略，从而允许灵活地整合历史数据和异构数据源，为大模型后训练打开了更高效的训练方式。

  

2\. 均方误差视角（MSE）

  

从 MSE 角度看，GVPO 的优化目标等价于最小化「 隐式奖励中心距离」与「 实际奖励中心距离」的偏差。这一解释带来直观的物理含义：当隐式奖励完全对齐实际奖励时，损失达到最小。更重要的是，这种设计保证了 GVPO 收敛到唯一的、KL 约束下的全局最优解，为稳定训练提供了理论保证。

  

3\. 强化学习视角（RL）

  

RL 视角揭示了 GVPO 损失函数的三大组成部分：

  

- 组相对奖励项：推动高回报响应占据更大概率；
- 方差正则项：自然引入适度探索，避免熵塌缩；
- 协方差正则项：作为正则化，抑制策略过度偏离参考策略，保障训练稳定性。

  

这三种视角共同说明：GVPO 既有理论保证，又兼具灵活性和稳定性，将复杂的优化过程转化为可解释的数学框架。

  

实验结果：全面胜出

  

研究团队在数学推理任务上进行了系统对比。基座模型为 Qwen2.5-Math-7B，在 AIME2024、AMC、MATH500、Minerva、OlympiadBench 五个基准测试中：

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

GVPO 全面领先，不仅大幅提升基座模型表现，还超过 GRPO 和改进版 Dr.GRPO。在复杂推理任务中优势尤为明显。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

此外，消融实验显示：

  

- GVPO 对超参数 β 不敏感，几乎无需繁琐调参。（Figure 2）
- GVPO 在采样数量 k 增加时扩展性优异，并且小模型甚至能靠增加采样追平大模型表现。（Figure 3）
- GVPO 支持混合采样策略（历史数据 + 新数据），进一步降低成本，并且连接了现代大模型研究和传统强化学习探索策略研究。（Figure 4）

  

意义与前景

  

一句话总结： GVPO 让后训练从「 经验驱动」走向「 理论保证」，既「 稳 」 又 「 强 」 。

  

在大模型迈向通用智能的道路上，后训练已经成为竞争焦点。GVPO 的提出，可能预示着下一代后训练的范式转变：

  

- 更稳定 → 降低大规模训练的工程风险
- 更灵活 → 支撑更复杂的数据利用场景
- 更高效 → 在推理和对齐中获得更佳的性价比

  

研究团队认为，GVPO 为可靠、通用的大模型后训练提供了全新范式。

  

![图片](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

© THE END

转载请联系本公众号获得授权

投稿或寻求报道：liyazhou@jiqizhixin.com

继续滑动看下一个

机器之心

向上滑动看下一个