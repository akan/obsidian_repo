---
title: "GPT-6 Astra真把「推理」拉开一代了：CoT越短反而越强，Recurrent Depth+No-CoT"
source: "https://mp.weixin.qq.com/s/PIGhSo_ECSQ6KIvhHfhfmw"
author:
  - "[[AI修猫Prompt]]"
published:
created: 2026-09-07
description: "Astra重写推理"
tags:
  - "推理"
  - "CoT"
  - "Recurrent Depth"
  - "No-CoT"
  - "GPT-6"
abstract: "GPT-6 Astra通过Recurrent Depth和No-CoT技术，将推理能力提升至无需显式CoT即可解决复杂问题的新高度。"
---
AI修猫Prompt AI修猫Prompt *Sep 7, 2026, 7:11 AM*

OpenAI这次真狠，GPT-6用起来有一种2023年GPT-4的感觉。

根据GPT-6 Astra自己的模型卡，它的特点可以总结为： **越强，写出来的CoT反而越短。**

按照过去Reasoning模型的发展逻辑，这本来不应该发生。o1、o3到GPT-5，模型想解决更难的问题，最直接的方法就是生成更多推理Token，在回答一道题时投入更多计算。

但Astra正在打破这条规律。

在不允许输出显式CoT的测试里，GPT-5.6 Sol只能覆盖约3.6分钟的人类数学任务跨度，Astra却直接冲到了30.9分钟。与此同时，外界披露的Recurrent Depth又指向同一件事： **OpenAI可能正在把过去发生在CoT Token里的计算，逐渐搬到单次前向传播内部。**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/rWiaH1dWaLNNWyAMlkx4zQrPIcCs2wFRNrvEvibTJfPhkW4HpFsAeCCZY7QsickQpowicgyhfzc46z0VzGCG6bdg05EZ7xb4HGBNLaEuviaAGgD0/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

本文主要解读 **NeurIPS 2025 Main Conference** 收录、由ELLIS Institute/Max Planck、马里兰大学等团队提出的Recurrent Depth，以及 **2026年6月** Redwood Research联合MIT、剑桥、牛津等研究者发布的No-CoT研究Think Fast。  
从这两条研究线出发，带你看清GPT-6 Astra这次「推理」换代背后的技术原理。

## Astra的「推理」到底变了什么？

从System Card开始：Astra的「推理」到底变了什么？

GPT-6 Astra发布时，OpenAI同时放出了完整的System Card。除了安全、网络能力等内部测试之外，OpenAI还邀请了多家外部机构对Astra进行独立评估，其中就包括英国政府旗下的 **AI Security Institute（UK AISI）** 。

System Card里甚至专门列出了UK AISI的外部评估部分。它们不仅测试Astra在复杂网络安全、Agent任务中的表现，也从另一个角度研究了一个对这篇文章更重要的问题： **如果不让Astra把推理过程写成CoT，它本身究竟还能解决多复杂的问题？**

![Image](https://mmbiz.qpic.cn/mmbiz_png/rWiaH1dWaLNM6yiccfyXdjUibbIxR7mdAAzeRzd1KzzfNTqAFL3sJ97b8sV0xWcLneLZ4YMWQnibiaPlKB22Lou2WPK6weeYh0JRDIUcgFZdStg0/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

这就涉及一个叫 **No-CoT** 的测试条件。

传统Reasoning模型在面对难题时，通常会先输出一长串CoT，把中间推理一步步写出来，再得到最终答案。No-CoT测试反过来做： **禁止模型输出这些显式推理过程，只允许它直接作答。**

UK AISI随后用数学任务测量，在这种条件下，模型究竟还能稳定解决多难的问题。为了让这个“难度”更直观，他们把题目换算成人类通常需要多少时间才能完成。

结果出现了一个非常明显的断层：

**GPT-5.6 Sol只能稳定解决相当于人类约3.6分钟完成的数学任务，而GPT-6 Astra直接提高到了30.9分钟。**

图：各模型在禁止输出显式推理时的数学时间地平线随发布时间的变化——GPT-6 Astra跃升到约30分钟量级，跳出了此前模型普遍几分钟以内的趋势线。

这里的30.9分钟不是说Astra真的“想了30.9分钟”，而是一个

**任务难度标尺** ：不输出CoT时，它仍能解决相当于人类约30.9分钟完成的问题。相比GPT-5.6 Sol的3.6分钟，提升约 **8.6倍** ，接近一个数量级。

更反常的是，Astra写出来的CoT反而更短、信息更少，甚至更频繁地为空。也就是说： **显式推理变少了，但No-CoT能力却大幅增强。**

UK AISI也提醒，30.9分钟受数据污染和测试时间等因素影响，不能当作精确上限，但趋势已经很明显。

**如果越来越多计算没有被写成CoT Token，它们究竟发生在哪里？**

## Recurrent Depth

GPT-6 Astra一发布，网上最盛传的说法就是：它这次很可能上了Recurrent Depth。

这个猜测之所以传得这么快，是因为Astra身上的现象和这条路线实在太像了。 **显式CoT变短了，但不写CoT时的推理能力却突然暴涨。**

目前最值得参考的一篇前置研究，就是2025年的《Scaling up Test-Time Compute with Latent Reasoning: A Recurrent Depth Approach》。论文来自ELLIS Institute / Max Planck、马里兰大学等团队，后来被 **NeurIPS 2025 Main Conference** 收录。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/rWiaH1dWaLNM9QcsHhpH4RuHug9GaI7dbia7av8k4Qofe2YGIVem0vmusO2R5cZswLPg48MorFKkps4GNHAWazm0th2J4wQ5MIRzs5M3kU7SE/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=3)

普通Transformer的计算深度基本固定，一个Token进入模型后，依次经过固定数量的层，然后输出结果。Recurrent Depth是在模型中间加入一个 **可重复运行的共享循环块** ：输入先经过Prelude进入潜在空间，随后同一个Recurrent Block反复更新隐藏状态，最后再由Coda输出下一个Token。

图：Recurrent Depth架构示意：输入先经蓝色prelude嵌入潜在空间，绿色共享循环块反复迭代更新隐藏状态，红色coda再把最终状态解码成下一个token。

关键就在这个“反复运行”。

**同一个Token还没有被输出之前，模型内部已经可以多计算几轮。** 循环次数越多，相当于为当前Token增加了更多计算深度，而不需要先生成一长串新的CoT Token。

论文中的Huginn-0125就是这样设计的。模型本身只有少量固定层，但在测试时可以让Recurrent Block重复运行。随着循环次数增加，模型在GSM8K、HumanEval、HellaSwag等任务上的表现也持续提升，尤其是数学和代码这类需要推理的任务。

图：GSM8K CoT、HellaSwag、HumanEval等基准表现随测试时循环次数增加而提升，推理类任务从接近零逐步上涨，说明更多循环迭代带来更强能力。

这张图其实就是整篇Recurrent Depth论文最直观的结果： **模型参数没有变、输入没有变，仅仅让内部循环多运行几次，能力就继续上涨。**

换句话说，传统CoT Scaling主要是在 **序列长度** 上增加计算：

多生成几个Token → 多做几步显式推理。

而Recurrent Depth增加的是 **Token生成之前的内部深度** ：

同一个Token还没出来 → hidden state先多迭代几轮 → 再输出。

这也是它为什么会被称为一种 **Latent Reasoning** ：一部分原本需要通过文字展开的计算，可以发生在潜在表示里，而不必全部写成显式CoT。

论文还做了比较关键的消融实验。研究者训练了一个取消循环机制、其他条件基本一致的基线模型，结果循环模型在GSM8K等任务上明显更强；而当Recurrent模型被限制为只循环一次时，后续训练带来的收益也大幅下降。也就是说， **性能提升确实和循环计算本身高度相关，而不是单纯来自Prelude或Coda。**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/rWiaH1dWaLNOzMEJiamY7avYnqbsEFjQ9e2P7BW8rwzCibdFhiaogiaxNk4LMxibsVohUgabPYlhrD6foCRTeEDZZRjgDDLuGKFZd83XicoB8Iu7Gc/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=6)

当然，这篇论文距离GPT-6 Astra还有很远。它本质上仍是一个学术上的proof-of-concept：主模型只有约3.5B参数，训练约800B Token，也不是当时的SOTA大模型。

它真正重要的地方，是证明了一件事：

**推理时计算不一定只能靠“写更多Token”来扩展，也可以在Token输出之前，直接增加模型内部的计算深度。  
**

**另外Recurrent Depth也不是一篇论文之后就停下来的孤立研究方向。几个月后的NeurIPS 2025论文 **Mixture-of-Recursions** 又进一步加入了Router，作者来自KAIST AI、Mila、Google DeepMind、Google Research等机构。**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/rWiaH1dWaLNO4ibdFBHic4UdZuqkPUe7EgMVgSNevjIwzPYegNLsRibqOQr3VvSmxYycY4WTAUVF0GAyM3mQrNtx07hNbASTtfPichViaQHvS0GeY/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

****Mixture-of-Recursions** 让不同Token可以动态获得不同的循环深度：简单Token少算，困难Token多算。到了2026年的Nanbeige 4.2，Looped Transformer甚至已经出现在公开模型里，同一组22层Transformer直接运行两遍。未来的趋势，大概就是这样。**

![Image](https://mmbiz.qpic.cn/mmbiz_png/rWiaH1dWaLNP8jTC6TqGaGNmvgyGNrCda52prx9qIG8U0YwpWbxWWkbiavs64756X0qVuI5lqKDT3jEvz6EOr6MsiahSOrozsEmduHWicGSaIcA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

## Think Fast：No-CoT，Astra为何不同？

Recurrent Depth给出了一种可能的机制：模型可以不靠拉长CoT，也在Token输出之前继续增加内部计算。但Astra的30.9分钟到底意味着多大的跃迁，还得放回过去几年的No-CoT能力曲线里看。

![Image](https://mmbiz.qpic.cn/mmbiz_png/rWiaH1dWaLNMIWzcwKDJ0eRCgCeKhXooBuybNQpESoElIV3aUBSa1SUXSic1g4gdjQKicIVkEl2UDww5iaAgoBoV6znhYmcUjxs8Hj9Jn4zTtO4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=9)

2026年6月，Redwood Research联合MIT、剑桥、牛津等机构的研究者发布了《Think Fast》。他们测试了从GPT-2到GPT-5.5的14个模型、43个基准和超过3万道题，专门研究一个问题： **如果禁止模型写出显式CoT，它本身还能解决多复杂的任务？**

结果显示，前沿模型的No-CoT能力过去几年一直在稳定增长，平均约 **373天翻一倍** 。到了GPT-5.5，这个指标刚刚超过3分钟；相比之下，允许显式CoT时，能力翻倍周期只有约182天，几乎快了一倍。

图：前沿模型无CoT的50% 时间地平线随发布日期的增长：约每373天翻一倍（R²=0.84，阴影为95% CI），按中位数外推本年代末将超过25分钟。

这也说明，过去几年的Reasoning Scaling，主要还是靠 **把推理写出来** 获得更多计算，而不是靠模型内部直接完成这些推理。

图：无CoT（绿）与带CoT（紫）时间地平线对照：带CoT翻倍周期约182天，自GPT-4起大约是无CoT增速的两倍，两条曲线逐渐拉开差距。

按Think Fast的中位趋势外推，No-CoT能力到2028年大约达到7分钟，到2030年约28分钟。Astra的30.9分钟已经落在这个量级之上。差不多意味着Astra这次已经提前达成了学术界给出的2030年模型推理水准。

当然，两者并不是完全相同的测试：Think Fast覆盖43个基准，UK AISI使用的是数学任务，所以不能把30.9分钟直接当成同一条曲线上的精确数据点。 **但方向很明确：Astra的No-CoT能力已经不再只是沿着过去的趋势缓慢增长，而是出现了一次明显的跳升。**

## RL也在改变Astra的CoT

Recurrent Depth能解释模型为什么可能在Token输出之前“多算几轮”，但Astra的System Card还给出了另一条很重要的线索： **它的CoT变化并不是固定不变的，而是在RL训练过程中逐步增强。**

这和OpenAI几个月前的研究形成了很强的反差。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/rWiaH1dWaLNMwKpQnYj1KAfa3BY1PA4AIicR8XUxYQ1YWvaGv1Rk2msaZiboCyTe0b1Noj0olqP1ZMCNRFCVicAsZC5W315VJKYr4gZCkEZYWGY/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=12)

2026年3月，OpenAI等研究者在《Reasoning Models Struggle to Control their Chains of Thought》中测试了13个前沿模型，研究模型究竟能不能主动控制自己写出来的CoT。结果很不乐观： **模型通常很会控制最终答案，却很难控制自己的推理过程。**

Claude Sonnet 4.5控制最终输出的成功率达到61.9%，控制CoT却只有2.7%；DeepSeek R1的CoT可控性甚至只有0.1%。总体来看，Reasoning能力越来越强，并没有自然带来更强的CoT控制。

图：推理模型对CoT的控制（黄）远弱于对最终输出或外部推理的控制：多数模型CoT可控性不超过10%，而输出可控性普遍超过60%。

到了Astra，这条基线突然变了。

System Card沿用了同一套CoT-Control评测。在750到1250 Token的区间里，Astra的CoT可控性达到 **60.9%** ，GPT-5.6 Sol只有16.1%，GPT-5.5 Thinking更只有1.7%。UK AISI的外部评估也得到类似方向的结果：Astra在93%的样本中遵守了CoT约束，而GPT-5.6 Sol是48%。

图：CoT可控性随CoT长度（token，对数轴）的变化：GPT-6 Astra的曲线在中段长度区间明显高于GPT-5.6 Sol与GPT-5.5 Thinking，对应正文750–1250 token区间60.9% 对16.1%／1.7% 的差距。

更关键的是，OpenAI追踪训练checkpoint后发现： **Astra的CoT可控性会随着RL训练明显增强，同时No-CoT能力也在增长，显式CoT却继续缩短。**

因此如果说GPT-6-Astra的能力“全是Recurrent Depth带来的”是不够严谨的。OpenAI自己也特别强调，他们相当确信，Astra的CoT可控性变化并不能简单归因于架构差异；它和No-CoT能力增长高度相关，但两者之间的具体因果机制仍在调查。

所以综合目前所有的信息，比较合理的判断是： **Recurrent Depth可能提供了增加内部计算的架构条件，而预训练和Reasoning RL又进一步把这种能力训练了出来。Astra的「推理」换代，更像是多条路线一起作用的结果，而不是某一个新架构单独完成的。**

## 结语

Recurrent Depth与No-CoT共同指向了一件更大的事：

**显式CoT可能不再是Reasoning Scaling唯一的主战场。**

过去通过增加Token，让模型拥有更多串行计算；而Astra展示出来的方向，是把越来越多计算压进hidden state、网络深度和单次前向传播之中。

这并不意味着CoT会消失。对于搜索、回溯、外部验证和可监控性，它依然重要。

但从GPT-6 Astra开始，一个新的分界线可能已经出现：

**模型到底有多聪明，不再只看它能写多少步思考，而要看它在写下第一个Token之前，已经算完了多少东西。**

这才是Astra真正值得关注的变化

#### References

`[1]`: *https://deploymentsafety.openai.com/gpt-6-astra*  
`[2]`: *https://arxiv.org/abs/2502.05171*  
`[3]`: *https://arxiv.org/abs/2606.07157*  
`[4]`: *https://arxiv.org/abs/2603.05706*  
`[5]`: *https://arxiv.org/abs/2607.22083*

未来已来，有缘一起同行！

<本文完结>

1. **转载请与本喵联系，私自抓取转载将被起诉**

🎉 **让我们一起创造更多美好！** 🎉

如果您觉得这篇文章对您有帮助

感谢您为我 **【点赞】** 、 **【在看】**

**<您为我点赞在看，只有我能看到>**

**👉** **微信号：xiumaoprompt**

**添加请注明来意！**

**微信扫一扫赞赏作者**

LLM · Table of Contents

Author's tip: 素材来源官方媒体/网络新闻，文中事件发生于2026年9月6日