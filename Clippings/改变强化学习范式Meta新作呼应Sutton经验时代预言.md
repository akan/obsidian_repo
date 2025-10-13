---
title: "改变强化学习范式，Meta新作呼应Sutton「经验时代」预言"
source: "https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&chksm=858b4a02e8ac772f578d6b0305181b2ca5288b0d6d182cb11a7ecd1b5a7cc43deabf87f746f5&idx=1&mid=2650995095&sn=a6ff33f370ea77523ba0b58018936bd2#rd"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-10-13
description: "进入「经验时代」的新探索。"
tags:
  - "强化学习"
  - "经验时代"
  - "隐式世界建模"
  - "自我反思"
  - "智能体训练"
abstract: "Meta提出“早期经验”训练范式，让AI智能体从自身与环境互动中学习，无需外部奖励信号即可提升任务成功率与泛化能力。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/KmXPKA19gW8femVrafGpgjqs6Z5pbJRYcxdP0PcvPjd5vCY5aS2UaA4zCbribibmq0IUdZtAkO9QjcMXBWicUo1hA/0?wx_fmt=jpeg)

[机器之心](https://mp.weixin.qq.com/) *2025年10月13日 14:36*

机器之心报道

**编辑：张倩、泽南**

> 从数据时代到经验时代，怎么平滑过渡？Meta提出了新见解。

  

前段时间，图灵奖得主 Richard Sutton 与谷歌 RL 大佬 David Silver 合作撰写的 《Welcome to the Era of Experie nce [（欢迎来到经验时代）](https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&mid=2650965088&idx=1&sn=fb3985463d51274914650268d006d363&scene=21#wechat_redirect) 》 引发了广泛关注。他们在文中指出，人类数据已接近极限，AI 智能体若想突破天花板，必须像人类和动物一样，通过与环境持续互动生成「经验流」，并通过强化学习实现自主提升。也就是说，AI 智能体将迎来「经验时代」，这是重大的范式转变。

  

然而，在许多环境中，基于经验数据使用强化学习来训练智能体仍然面临挑战。一方面，这些环境往往缺乏可验证或密集的奖励信号 —— 尤其是在开放式场景中（例如网页环境通常不会返回明确的任务反馈）；另一方面，智能体可能需要在长时间跨度内进行低效的探索与泛化，例如跨多轮的工具使用或复杂交互流程。

  

目前大多数语言智能体采用监督微调（SFT）从专家示范中学习，以避免依赖奖励信号。虽然这种方法训练高效，但缺乏环境交互，无法从失败中学习或主动探索，同时对高质量专家数据依赖强、成本高、泛化性有限。因此，一个关键问题浮出水面： 如何让智能体在没有外部奖励的情况下，从自身经验中学习成长？

  

上周末，一篇来自 META 超级智能实验室（MSL）、FAIR、俄亥俄州立大学的研究为该问题提供了一种解法。

  

他们创新性地尝试使用一种介于模仿学习与强化学习之间的中间范式来解决上述问题，它被称为「早期经验」：智能体不仅从人工整理的数据中学习，还从自身在环境中执行动作后产生的未来状态中学习。这些未来状态代表着智能体的「自身经验」，可以被转化为监督信号，使其能 够直接从行动后果中成 长，而无需依赖外部奖励。

  

在这个范式中，研究人员探索了两种使用此类数据的策略：

  

- 隐式的世界建模，它使用收集到的状态作为环境动态策略的基础；
- 自我反思，智能体从其次优行为中学习，以改进推理和决策。

  

基于这一方法，Meta 成功地将智能体完成任务的成功率提升了 9.6%，分布外泛化能力提升了 9.4%。这为后续 RL 继续突破人类天花板铺了一条快速通道。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW8femVrafGpgjqs6Z5pbJRYayOPib4Lcv4XFtkEicoO0SpZgz7e6LHib3kvQ19OlvbwiaXTOQd2U4FaIg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

- 论文标题：Agent Learning via Early Experience
- 论文链接：https://arxiv.org/abs/2510.08558

  

方法概览

  

为了帮助大家理解早期经验范式，研究者在论文中给出了一个例子：想象一个语言智能体要学习如何在网页上预订航班。在传统的模仿学习中，它只能看到专家成功预订的示范过程。而在「早期经验范式」中，智能体还会探索当它点击不同的按钮或错误填写表单时会发生什么，观察错误提示、页面跳转以及其他结果。这些观察会成为无需显式奖励的学习信号。从专家轨迹出发，智能体在每一个访问到的状态下都会尝试提出自己的行动，通过探索来收集额外的环境反馈。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW8femVrafGpgjqs6Z5pbJRYibk7Pjk5D2oSxiboibW3Od2b6v98ytmTwMf8hdHJicqssR8zY1DlRhQY0g/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

  

下图 2 展示了两种「早期经验」方法：

  

- 隐式世界建模 （左图）通过为专家轨迹添加替代动作及其预测的下一个状态，使策略在部署前就能够内化环境的转移动态。
- 自我反思 （右图）则在专家动作的基础上加入智能体自生成的解释 c\_1，让策略学会推理并修正自身决策。

  

这两种方法都使用由初始策略（LLM）提出的替代动作。替代动作的数量（K）是一个超参数；为简洁起见，图中仅展示了一个示例。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW8femVrafGpgjqs6Z5pbJRYXZfy70v0gib833WBDuHTDn0TTLFKXhUqsc0ia91mIzN2B7icT8libJCsTg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

  

隐式世界建模

  

作者将世界建模表述为一项辅助预测任务，它能帮助智能体从自身早期经验中内化环境动态。在本文的设定中，状态完全以自然语言来表示，这使作者能够将下一状态预测建模为标准的下一个 token 预测目标。受先前关于将 LLM 训练为世界模型的研究的启发，他们使用从 rollout 数据集 D\_rollout 中获得的下一个状态，作为语言智能体策略 π\_θ 的直接训练信号。

  

例如，在网上预订航班时，模型可能会预测输入无效日期后的页面状态，并从文本错误信息中学习，将其作为下一状态的自然语言表示。这种设计无需单独的模块，并且自然地融入了大型语言模型的微调范式。

  

这一训练目标鼓励模型去捕捉环境行为中的规律，包括常见的状态转移、附带效应以及无效动作的结果。不同于推理时用于规划的显式世界模型，本文中的隐式建模方式将预测信号直接整合进策略学习中，作为监督学习或后续优化前的轻量级「预热」阶段。

  

这种方法让智能体能够接触到多样的、非专家的行为数据，从而提升对分布变化的鲁棒性，并减少对脆弱的专家轨迹的依赖。实践中，rollout 数据的规模通常比专家数据集 D\_expert 大一个数量级。作者采用两阶段训练流程：首先利用 L\_IWM（隐式世界建模）来学习环境的粗略动态，然后在 D\_expert 上进行微调（即 L\_IL 阶段）。

  

自我反思

  

作者将「自我反思」形式化为一种机制，使智能体能够从自身的探索结果中学习。与仅依赖专家的状态 — 动作对不同，智能体在每个状态下会将专家动作与从自身策略中采样得到的替代动作进行比较，并根据它们产生的后续状态，用自然语言生成解释，说明为何专家的选择更优。这些解释比单纯的专家动作提供了更丰富、可迁移的监督信号，借助大语言模型在语言处理方面的优势，使智能体能够内化可在不同任务间泛化的决策原则。

  

在实践中，作者将自我反思数据集 D\_refl 与专家数据集 D\_expert 混合，并使用标准的「下一个 token 预测」损失进行训练。在自我反思训练数据上会生成链式思维链推理，而在 D\_expert 中，只要专家轨迹自带推理过程，作者就保留原有的思维链思维文本。 这种联合训练方式在示范数据带来的扎实决策信号与探索数据带来的对比性洞见之间实现了平衡。

  

从这两类数据中同时学习，有助于模型超越机械模仿，发展出更具泛化性的决策准则。例如，在 WebShop 环境中，专家动作是「点击 15 美元的蓝色衬衫」，而替代动作可能是「点击 30 美元的红色衬衫」。模型生成的反思可能是：「虽然红色衬衫符合颜色偏好，但它超出了查询中指定的 20 美元预算限制；蓝色衬衫同时满足了风格要求和预算约束。」这样的训练教会模型在决策中优先考虑约束条件，这种经验可以泛化到其他任务和情境中。

  

下图展示了作者在不同环境中使用的提示模板。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW8femVrafGpgjqs6Z5pbJRY0UWLKfQvdqS3pfSmALRxxyRheHsAnBk7KqHkyZH5vp6tN5FNotPfWg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

  

隐式世界建模与自我反思遵循相同的核心原则：都将智能体自身的动作及其导致的未来状态转化为可扩展的监督信号，从而训练出更具泛化能力的语言智能体策略。

  

实验结果

  

Meta 列出了基准测试的结果，所有数值均为成功率（%）。Prompt 表示指令调优模型的性能表现。IWM 和 SR 分别代表隐式世界建模与自我反思。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW8femVrafGpgjqs6Z5pbJRYgmCzsStMLUb2TtD0QDsNMDIgARgT0QbhKvia4F1DqtUaeUjmaCWOwrQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

  

可见，在几乎所有场景和两种模型规模下，早期经验的提升效果都优于模仿学习。隐式世界建模（IWM）在结构化模拟器和交易类网站中表现稳定，自我反思（SR）则在需要多步骤推理和约束满足的任务中进步最大。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW8femVrafGpgjqs6Z5pbJRYdViaricS2UKLACaYLZN25OoC4NxmLjgqV26VYZwQtBwEN9ncxtrOJBJw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

分布外评估结果（%）。绿色部分显示了相较于模仿学习的改进情况。Prompt 表示指令模型的性能表现。IWM 和 SR 分别指隐性世界建模和自我反思。

  

在分布外（OOD）数据集环境中，尽管所有任务上的分数均有所下降，但早期经验方法始终可以显著减小差距。这表明将自身训练结果转化为监督信息，能有效帮助策略适应演示数据未覆盖的场景。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gW8femVrafGpgjqs6Z5pbJRYzVD79rukWx7oMjcoTSVOiamCWsR383ic0nsgxKeIAflEMDugu1TG4BNw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

  

综上所述，从早期经验开始训练始终能获得更高的后强化学习上限。而且在某些场景中，这种性能差距会随着训练而持续扩大。

  

Meta 认为，早期经验在人类数据时代与经验时代之间起到了中期训练桥梁的作用。它产生的策略即使没有奖励也能表现出色，并放大了后续强化学习的益处。在相同的强化学习方案下，早期经验开始时就能实现更高的最终性能。这些结果表明，一旦 RL 基础设施在新环境中可用，早期的经验可以立即解锁进一步的收益，而无需从头开始重新训练。

  

更多内容请参阅论文原文。

  

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/KmXPKA19gW9Bp2wicyhZaMEwwc2j43whc8nicGBovZKFKcYIC63iblWMeTmeRicmtKutf2uevdGXMrc8uEZzlPWYVA/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

  

© THE END

转载请联系本公众号获得授权

投稿或寻求报道：liyazhou@jiqizhixin.com

  

继续滑动看下一个

机器之心

向上滑动看下一个