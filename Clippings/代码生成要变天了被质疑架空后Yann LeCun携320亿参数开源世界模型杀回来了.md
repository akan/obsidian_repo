---
title: "代码生成要变天了？被质疑架空后，Yann LeCun携320亿参数开源世界模型“杀回来了”"
source: "https://mp.weixin.qq.com/s/EhLlyG375uAR_0TI3hOzvg"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-09-25
description: "在新一代代码生成模型不断涌现的当下，开发者们总会提出两个关键问题"
tags:
  - "世界模型"
  - "代码生成"
  - "开源发布"
abstract: "Meta发布由Yann LeCun团队开发的320亿参数开源代码世界模型CWM，该模型不仅能生成代码，还能模拟代码执行过程，在多项基准测试中表现接近GPT-4水平。"
---
*2025年09月25日 16:02*

![Image](https://mmbiz.qpic.cn/mmbiz_png/ZBjVrHIdkOmwn2bicpiadJb7CpDYRHbM5wXhQxribH9jQtRVeOF6YJDFHRZRX6iaBmAY9KebcYh0pBsic9jmeHV9Trg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

整理｜冬梅

在新一代代码生成模型不断涌现的当下，开发者们总会提出两个关键问题： **第一，它的代码编写能力究竟有多强？第二，它是否真正理解代码在运行时会发生什么？**

长期以来，大多数大型语言模型在生成代码的能力上表现不俗，往往能输出结构清晰、语法正确的代码片段。然而，真正的挑战在于“理解执行”。许多模型虽然能写出看似完美的代码，但在实际运行过程中却频频出错，甚至无法完成需要多步骤推理的复杂软件工程任务。这种“纸面正确、执行失败”的现象，也暴露出代码生成模型与真正的程序员之间仍存在明显差距。

如今，这个难题即将有新的解法。

**Yann LeCun 团队**

**开源全球首个代码世界模型**

美国当地时间 9 月 24 日，由 Yann LeCun 领导的 Meta FAIR CodeGen 研究团队正式发布了 代码世界模型（Code World Model，CWM） ——一款拥有 320 亿参数的密集解码器自回归开放权重大语言模型，旨在推动基于世界模型的代码生成研究。

值得一提的是，这是 Meta 将其 AI 业务重组后发布的首款模型。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZBjVrHIdkOmwn2bicpiadJb7CpDYRHbM5w8fJ5r7bjSEuDhhtgB9jnqwrtia8jD1XPL8zNP7DUkp476U5m7ktKzmA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

与传统依赖静态代码训练的模型不同，CWM 在中期训练阶段引入了全新的方式：研究人员利用来自 Python 解释器和代理 Docker 环境的大量“观察—动作”轨迹数据，让模型在动态交互过程中提升对代码的理解和推理能力。同时，团队还在可验证编码、数学和多轮软件工程等场景中应用多任务强化学习（RL），强化模型的推理和规划水平。

这一系列创新， **使得 CWM 不仅具备代码生成能力，还能模拟代码的逐步执行过程，从而为未来代理式代码开发提供了初步探索路径** 。

简单理解，它不仅会写代码，还能“想象”代码在电脑里是怎么一步步运行的，包括变量是如何变化的、程序会得到什么反馈。

研究人员表示，这一方向有望帮助 AI 更好地结合推理与规划，在复杂编程任务中展现出接近人类工程师的工作方式。

在性能测试上，CWM 也展现出不俗实力：

- 在 **SWE-bench Verified** 任务中，取得 **65.8%** 的分数 **，这是一个领先所有开源同规模模型的得分，已接近 GPT-4 水平** ；
- 在 **LiveCodeBench** 上达到 **68.6%**
- 在 **Math-500** 上高达 **96.6%** ；
- 在 **AIME 2024** 上则取得 **76.0%** 。
![图片](https://mmbiz.qpic.cn/mmbiz_png/ZBjVrHIdkOmwn2bicpiadJb7CpDYRHbM5wrwyN3VQh743bxvw31PLLHy5bOzFdpJoyjL0CzJat6U2Uhw4iaMr38aA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

技术上，CWM 是一个密集型、仅含解码器的 LLM，支持最高 **131k token** 的上下文输入，为复杂编程和推理任务提供了更强的语境理解能力。

在训练数据方面，CWM 的训练涵盖了预训练、中期训练和后期训练阶段的多种数据集。在所有阶段中，研究团队都高度关注代码及其“代码世界建模”相关的数据。特别值得一提的是，两项大规模数据收集工作极大地增强了 CWM 的世界建模能力： **Python 执行轨迹** 和 **ForagerAgent** 。

为了进一步推动代码世界建模的研究，团队不仅发布了完整的模型，还在训练的不同阶段（中期、SFT、RL）同步开放了模型检查点，为学术界和工业界提供了丰富的探索平台。

研究团队强调，CWM 不仅仅是一个性能强大的代码模型，更是探索“世界模型”在计算环境中如何促进推理与规划的一次重要尝试。

项目地址：https://github.com/facebookresearch/cwm

技术报告：https://ai.meta.com/research/publications/cwm-an-open-weights-llm-for-research-on-code-generation-with-world-models/

为什么我们需要代码的“世界模型”？

在这款模型出现之前，各个领域的大语言模型已经多如牛毛，为什么我们还需要代码方面的“世界模型”？代码生成中的“世界模型”是什么，它为什么重要？

这要从传统代码模型的局限性说起。

大多数开发者可能都用过一些能根据注释或上下文快速生成代码片段的 AI 编码模型。它们主要通过从海量代码语料库中学习统计模式来预测下一个最可能的标记。这就像一个拥有过目不忘记忆力的程序员，却从未真正运行过自己的代码。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZBjVrHIdkOmwn2bicpiadJb7CpDYRHbM5wYwZ3cyRibC7mQewkCDiaPvKufQowl8SIXiaT5nTKWAGArSUbA9LsGZoWw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

这会导致一些常见的陷阱：

- 合理但错误的代码：语法完美，逻辑似乎合理，但执行失败。
- 缺乏状态意识：模型难以理解一段代码如何改变变量、文件系统、数据库或网络连接的状态。
- 多步骤任务的困难：在需要顺序操作的任务中（例如，“修复此错误，然后为其编写测试”），模型可能会丢失上下文并忘记前面步骤的影响。

CWM 的创新之处在于使用代码执行轨迹和交互历史作为核心训练数据。简而言之，它不仅学习“代码是如何编写的”，还学习“代码是如何运行的”。

为什么 CWM 能做到这一点？这要归根于 CWM 的三个关键阶段训练：

CWM 的训练采用标准的三阶段流程：预训练、中期训练和后训练，并结合了监督微调 (SFT) 和强化学习 (RL)。模型首先在 8192 个上下文长度上进行预训练，包含 8T 个 token。然后，在代码世界建模数据上，以 131072 个 token 的上下文长度进行中期训练，额外包含 5T 个 token。之后，模型通过监督微调进行后训练，以提高推理能力和通用指令遵循能力。最后，使用多任务多轮可验证强化学习对 CM 进行训练。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZBjVrHIdkOmwn2bicpiadJb7CpDYRHbM5wVeZIrKY8SWMqmjLYSMz8XGH3ZSKOA9hWYVhIq32EP4IaYzZUmesn2g/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

这种方法使 CWM 具有显著的优势，特别是在需要推理代码行为的任务上。

模型发布后， Meta FAIR 团队研究科学家 Gabriel Synnaeve 在 X 上发文称，整个团队由公司技术精英构成，大家团结协作方能取得如此成就。

> “我为我们 Meta 公司由博士生和经验丰富的资深员工组成的精英 CodeGen 团队所完成的工作感到无比自豪，在这个团队里，大家是一个整体，没有任何人会独善其身。
> 
>   
> 
> 整个 Meta 人工智能社区都为此齐心协力。
> 
>   
> 
> 我非常感谢我们整个领导层始终如一的大力支持。”

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZBjVrHIdkOmwn2bicpiadJb7CpDYRHbM5weLhqqBmfu5SWgkx2jxKwcoLSrED7lVOeHGWrxTUZZAyN5n9czRqpKA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

在 Yann LeCun X 文的评论区里，有网友询问 LeCun：

> “你不是一直认为语言模型只是 AI 道路上的一个支线，为什么又推出了以语言模型为基础的世界模型？”

Yann LeCun 也给出了回答：

> 它们的确是语言模型，但我们现在讲的是编码，不是 ASI（超级人工智能）。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZBjVrHIdkOmwn2bicpiadJb7CpDYRHbM5wACNYO5G9XJI8N87wrJib0BsZaYcVcaT6qJFog9I9PqblSa9kYWQj5ZQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

Meta 这款新模型发布后在圈内引发热议。

在 X 上，有用户认为这是重塑代码生成重要一步。

> “这是重塑代码生成的重要一步。激动人心的时刻即将到来。”

还有用户表示，这个模型就类似一个“代码大脑，是许多开发者编码时大脑的运行方式”。

![图片](https://mmbiz.qpic.cn/mmbiz_png/ZBjVrHIdkOmwn2bicpiadJb7CpDYRHbM5wwxseRhWWKpPrzYXxamBvXq2xIJNsn4eicK4IGNuicWOjxehfQAPvdQng/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

**半年内四次重组 AI 团队，**

**外界解读 Yan LeCu 正被架空**

上个月，据 The Information 援引三位知情人士的话说，Meta 正计划在 6 个月内第四次改革 AI 业务组织架构。

报道称，该公司已经把其新成立的人工智能部门超级智能实验室分成四个小组：

- 新的“TBD 实验室”（ To Be Determined Lab，待确定实验室）： 负责前沿大模型的研发，包括下一代新版旗舰 Llama 系列模型。据了解，这一团队由前 Scale AI 的首席执行官 Alexandr Wang 领导。
- 基础人工智能研究实验室（FAIR）将在罗布·弗格斯（Rob Fergus）的领导下继续其为期十年的长期研究项目，罗布·弗格斯于 2014 年共同创立了该部门。尽管该实验室被保留在新架构中， **但其负责人 Yann LeCun 作为公司首席 AI 科学家的头衔未在此次重组中提及，被外界解读为“架空”或降级，象征着基础研究在当前 Meta 的 AI 战略中的地位相对弱化** 。
- PAR（Products and Applied Research，产品和应用研究），由前 GitHub 首席执行官 Nat Friedman 领导的产品和应用研究团队将把研究成果转化为面向消费者的产品。
- MSL Infra（Meta Superintelligence Labs Infra，基础设施团队）将负责处理支持 Meta 的 AI 目标所需的昂贵基础设施需求，由 Aparna Ramani 领导该团队。

Meta 的最新组织架构调整，正在引发业界关注。此次调整被称为“一分为四”，核心思路是以 **TBD Lab** 为引擎，配合工程化、产品化和基础设施三位一体的协作，加速“超级智能”的研发与落地。 **这一动作被外界解读为 Meta 在 AI 战略上的再度提速** 。

知情人士透露，TBD Lab 内部已讨论过一个颇具争议的方向—— **下一代 AI 模型可能不再开源** 。与此同时，公司或将彻底放弃此前代号为 “Behemoth” 的 Llama 4 路线，转而从零开始打造性能更强的新模型。这与扎克伯格早前在公开信中提到的“不会开源全部模型”形成呼应，也意味着 Meta 正从“全面开源”转向“选择性闭源”，战略重心出现重大转折。

更引人注目的是，在这场架构调整中， **Meta 首席 AI 科学家 Yann LeCun 的边缘化** ， **被认为是战略转向的标志性信号** 。作为深度学习领域的奠基人之一， **Yann LeCun** 长期倡导开源，他主导的 FAIR 实验室曾推动 Llama 系列模型开源，引发全球轰动，并被视为 AI 民主化的重要象征。

但随着 Llama 4 因性能不足、训练效率低下遭遇市场质疑，Meta 的态度发生明显变化。

而此次 Meta 选择推出 CWM 作为 AI 业务重组后的首款开源模型，至少表明 **Meta 并没有彻底放弃开源** 。这释放了一个信号：即便在“部分闭源”的大方向上做出调整，Meta 仍然会在一些关键领域（如代码生成、研究基础设施）通过开源来维持学术界与开发者社区的联系。

此外，CWM 的开源发布，也在一定程度上反驳了“ **Yann LeCun** 被边缘化”的说法。作为开源倡导者，他的理念依然在 Meta 的产品实践中有所体现。但需要注意的是，这并不意味着他在公司内部的地位完全恢复。更合理的理解是： **Meta 在商业化与开源之间寻找平衡，Yann LeCun 的影响力被削弱，但未被完全取代** 。

**参考链接：**

https://technologymagazine.com/news/metas-ai-superintelligence-supergroup-begins-to-take-shape

https://www.xugj520.cn/en/archives/code-world-model-ai-breakthrough.html

https://technologymagazine.com/news/metas-ai-superintelligence-supergroup-begins-to-take-shape

会议推荐

10 月 23 - 25 日，QCon 上海站即将召开，限时 9 折优惠，单张门票立省 680 元，详情可联系票务经理 18514549229 咨询。

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

AI前线

向上滑动看下一个