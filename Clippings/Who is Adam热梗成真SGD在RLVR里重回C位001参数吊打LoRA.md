---
title: "Who is Adam热梗成真？SGD在RLVR里重回C位，0.01%参数吊打LoRA"
source: "https://mp.weixin.qq.com/s/hWJNZtuZYOP2v5zi6fstzA"
author:
  - "[[让你更懂AI的]]"
published:
created: 2025-12-18
description: "SGD 强势回归"
tags:
  - "SGD优化器"
  - "强化学习微调"
  - "参数稀疏性"
abstract: "研究发现，在大型语言模型的推理强化学习阶段，使用最原始的SGD优化器替代AdamW，不仅能达到同等性能、节省显存，还能以仅更新0.01%参数的极高效率超越LoRA方法。"
---
Original 让你更懂AI的 *2025年12月13日 17:06*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

## 那个被我们遗忘在角落的最原始算法，竟然才是真正的版本答案。

  

NeurIPS 2025 审稿期间，一张截图被传疯了。审稿人那句 “Who is Adam?” 的神回复，瞬间被大家玩成了梗。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

毕竟在 Transformer 的世界里，Adam（及其变体 AdamW）就是标配，是毋庸置疑的默认选项，根本没人会去怀疑它。

  

但 UIUC 研究团队最近的一项发现，却狠狠颠覆了我们的认知：这句玩笑话，搞不好是个神预言。

  

在 RLVR（推理强化学习）阶段，我们一直以来的常识可能是错的。其实， 最原始的 SGD 就够了 。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/Psho9dm7oDGhKg9nnSz5qQrwKvXibt3wulOVRfC18yCkd6xXqGq22h6QUk8chptF0fnQ4uXeZtAktYMrWwG2SyQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=2)

SGD 战平 AdamW，显存直接省一半

学术圈通常有个共识：Transformer 的损失曲面太复杂，必须上 AdamW 这种带自适应学习率和动量的重型装备，SGD 这种老古董肯定带不动。  

  

然而，作者团队在 Qwen-3-8B 上跑 GRPO 训练（数学推理任务）时，却跑出了一个完全反直觉的结果：  

  

性能完全打平： 不管是在 MATH、AIME 还是 OlympiadBench 这些权威榜单上，用 SGD（甚至没加动量！） 训出来的模型，最终效果和 AdamW 居然一模一样。

  

  

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/VBcD02jFhgkiaFkSJteVont2icSmvB56Zne8D6vEydTzhlvXiaMfTqHnBqLzIbWF8SUcQGRQqAkiaZ4tylJktfPAqg/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

〓 图1. SGD 与 AdamW 的训练动态对比。可以看到，SGD 在 Training Rewards（右下）上的收敛速度甚至比 AdamW 更快，最终两者达到了相同的水平。

  

当然，光看训练曲线还不够，你可能会担心 SGD 只是在死记硬背。但看看验证集的结果，这种顾虑就烟消云散了。

  

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/VBcD02jFhgkiaFkSJteVont2icSmvB56ZnaJniaz67AGg30rcoCrwon1HgP9llcPTF4Ts0tkX5MGUQYchLydpFxtQ/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

〓 图2. 在 MATH 和 AMC 验证集上，SGD 的 Reward 增长曲线与 AdamW 高度重合，证明了其在下游任务上的泛化能力完全没有打折。

  

下游任务无损： 不仅训练曲线好看，到了实际的复杂推理任务里，SGD 依然能打。即便把序列长度拉到 8192，它也没掉链子。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgkiaFkSJteVont2icSmvB56ZnkYtkgIp8EUic6MaeQicjZMcUnjWNECW3uzW2ZC8I2UkEQ0IJbUvNibA8w/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

〓 图3. 在最大序列长度分别为 1024 和 8192 的设置下，SGD 在各大数学榜单上的得分与 AdamW 几乎持平。

  

真正的“免费午餐”： AdamW 需要为每个参数存 Momentum 和 Variance 两个状态，这几乎占用了模型本身 2 倍的显存。

  

SGD 呢？ 0 显存开销。 这意味着在同样的硬件上，你可以塞进更大的 Batch Size，或者跑更长的 Context。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/Psho9dm7oDGhKg9nnSz5qQrwKvXibt3wuhfgUpIfdPSqH8YjjHbCUiaaKsMA36bIMsMtGNKoBcus5py06M0fvx3A/640?wx_fmt=png&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=3)

为什么能行？

  

预训练时“必死无疑”的 SGD，怎么到了 RLVR 阶段突然就行了？

  

要解释这个，得回溯到该团队之前的一篇论文《Reinforcement Learning Finetunes Small Subnetworks in Large Language Models》。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgkiaFkSJteVont2icSmvB56ZnpfmuGZvehSap9boW4Pz3Xl4oHsIDibhYtkeRY1CAIBa2g5qMre1bsFQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

〓 图4. 前序论文的核心发现：从 DeepSeek V3 到 R1 Zero，RL 训练竟然有 86% 的参数没动过。

  

  

这篇论文揭示了 RL 训练的一个底层规律： 内生稀疏性 。

  

简单说，不管你用 PPO 还是 GRPO，RL 并没有在全量更新参数。

  

实际上，它只改动了模型 5%-30% 的权重，剩下的部分几乎纹丝不动。这和 SFT（监督微调）那种“地毯式轰炸”的更新模式完全不同。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgkiaFkSJteVont2icSmvB56ZnibQQzPM2P1rpVXcficPJHludspyf8JVtHkB57ic4ZiaGqF6TFaqicrrQu6Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

〓 图5. 对比 SFT 和 RL 的更新稀疏度。可以看到 RL 阶段更新的参数极少，而 SFT 则是大面积更新。

  

这就好理解了。 预训练是在“重塑大脑”，地形复杂，必须靠 AdamW 这种精密的 GPS 导航。而 RLVR 更像是在“找路”——它只是在强化模型里早已存在的某条推理路径。

  

因为只需要调整一小撮神经元，局部的优化曲面变得足够简单，简单到不需要 AdamW 那么复杂的导航系统，傻瓜式的 SGD 沿着梯度走两步就能找到最优解。

  

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/Psho9dm7oDGhKg9nnSz5qQrwKvXibt3wukOjHSmSsEuRCB0fJu69CtdNgLnvFPDUCgeicOppBKuDvniaD3q8XWQ0Q/640?wx_fmt=png&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=7)

0.01% 参数：SGD 才是天选 LoRA  

如果说战平 AdamW 只是让人惊喜，那 SGD 在参数效率上对 LoRA 的降维打击才真正让人咋舌。

  

作者的新实验把这种稀疏性推到了极致：

AdamW： 因为它自带动量和自适应机制，哪怕梯度很小也会更新，导致约 20% 的参数被改动了（很多可能是噪音）。

  

SGD： 它非常“懒”，只更新那些梯度显著的参数。结果就是， SGD 自然更新的比例骤降至 0.01% 。

  

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgkiaFkSJteVont2icSmvB56ZnjleEtK0NNq3b2du232lqxibGoZgq4IfUX9yeF9A1bYZINAwLiayJeHiag/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=20)

〓 图6. 极具冲击力的对比：SGD 的更新稀疏度高达 99.99%，始终维持在顶部；而 AdamW 的稀疏度则随着训练快速下降。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/Psho9dm7oDGhKg9nnSz5qQrwKvXibt3wuiaLfO9V4lkD8cXK7ImEicqib5bPGH6syOrWzicR2KaqPyAicMccs8icC03Gw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=10)

这意味着什么？

**Rank-1 LoRA ： 我们人工设计的低秩矩阵，还需要修改约 **0.05%** 的参数** 。

SGD ： 自然修改 **0.01%** 的参数，比 LoRA 还要省 5 倍 。

  

LoRA 就像是我们给模型穿的一件紧身衣（人工约束），而 SGD 是模型自己长出来的肌肉（自然选择）。

  

实验结果很残酷：Rank-1 LoRA 的效果往往打不过全量微调，但 **只更新 0.01% 参数的 SGD，却达到了全量微调 AdamW 的水平** 。

  

SGD 自动找到了那个比 LoRA 更精简、更符合模型本能的高效子网络 。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/VBcD02jFhgkiaFkSJteVont2icSmvB56ZnC2CxA64yD2zmm44TicKvbX5ESEYsEHAfLQlCMpicktK4IwXh76TibsfTQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=22)

〓 图7. 网友 精准总结了 SGD-RLVR 组合相比 AdamW 的巨大优势，并引发了关于“SGD-safe subspace”的深度讨论。

  

![图片](https://mmbiz.qpic.cn/mmbiz_png/Psho9dm7oDGhKg9nnSz5qQrwKvXibt3wukGHdevfTibLOpic6945Lrhqmt43pKicyIhGs4m7ANzKOfY9RJgmTicZGdg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=12)

想复现？别忘了把学习率拉满  

SGD 虽好，但别直接拿来就用。作者特别强调了一个巨大的坑： 学习率（LR） 。  

- AdamW： 我们习惯用 5e-6 或 1e-5
- SGD： 必须开大到 1e-1 级别

  

整整差了 10,000 倍！ 这是因为 SGD 没有 Adam 那种梯度归一化机制。如果你还用小学习率，模型根本爬不动。

  

想复现这个结果的朋友， 千万记得把 LR 调大 。

  

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/Psho9dm7oDGhKg9nnSz5qQrwKvXibt3wukGHdevfTibLOpic6945Lrhqmt43pKicyIhGs4m7ANzKOfY9RJgmTicZGdg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=16)

**结语**

  

这项工作其实就讲了一件事：我们习以为常的那些出厂设置——AdamW、Cosine Schedule、LoRA，可能并不是唯一的答案。

  

Ilya Sutskever 说 “We are back to the age of research” 。这话听着挺虚，但放在这儿特别真实。因为这个新时代的研究门槛太高了，动不动就是 H100 集群起步，直接把“GPU-Poor”关在了门外。

  

但 SGD 的回归是个好消息。如果核心的参数更新真的只有 0.01%，那是不是意味着，我们手里的消费级显卡，也有机会去碰一碰全量参数的 RLVR？

  

  

**参考文献**

\[1\] Mukherjee, S., Yuan, L., Jayasinha, P., Hakkani-Tur, D., & Peng, H. (2025). Who is Adam? SGD Might Be All We Need For RLVR In LLMs. Sagnik's Blog.

\[2\] Mukherjee, S., Yuan, L., Hakkani-Tur, D., & Peng, H. (2025). Reinforcement Learning Finetunes Small Subnetworks in Large Language Models. arXiv preprint arXiv:2505.11711.

  

**更多阅读**

[![Image](https://mmbiz.qpic.cn/mmbiz_png/Psho9dm7oDGy73HuibZpPezRwKGXAIgkYkiakv5iceDPO7qqmBjg53JiaL5qE25oSmbUUroCgC5qjV78EgiaHbYBo8w/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=12)](https://mp.weixin.qq.com/s?__biz=MzIwMTc4ODE0Mw==&mid=2247708203&idx=1&sn=a1decd414df3f1d1a996779d8f6506ea&scene=21#wechat_redirect)

[![Image](https://mmbiz.qpic.cn/mmbiz_png/Psho9dm7oDGy73HuibZpPezRwKGXAIgkYz8jYQlQbLB5B0MBoR50Z08BM2wWbib2kqE8ibq5SsxQNVEJUaFokV2Uw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=13)](https://mp.weixin.qq.com/s?__biz=MzIwMTc4ODE0Mw==&mid=2247708151&idx=3&sn=a536b7b37184d53b814f54d917538665&scene=21#wechat_redirect)

[![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=MzIwMTc4ODE0Mw==&mid=2247707898&idx=3&sn=5230a078a1d775ca24ac5460864b68b5&scene=21#wechat_redirect)

  

  

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