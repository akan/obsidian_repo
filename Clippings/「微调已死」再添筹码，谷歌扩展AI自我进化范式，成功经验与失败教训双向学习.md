---
title: "「微调已死」再添筹码，谷歌扩展AI自我进化范式，成功经验与失败教训双向学习"
source: "https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&chksm=853176578c291fcc7a4e64089c7c5f6a0cea4dd8831a95813f8545c1517489423a70af5a767e&idx=1&mid=2650994963&sn=26c7b28c3e3d5e5ac237bbbf50ecd7ca#rd"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-10-13
description: "记忆与经验的深度协同扩展。"
tags:
  - "AI自我进化"
  - "记忆框架"
  - "无需微调"
abstract: "谷歌提出ReasoningBank框架，让AI智能体通过从成功和失败经验中学习来持续自我改进，无需传统微调。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/KmXPKA19gWibpjibnXtqGHDayrp1iaY5twgVOOT4dFJePXA3QRdtgo47WgY5wKq9xaYNphjxOzUzlj4Apv1SxA2iaA/0?wx_fmt=jpeg)

[机器之心](https://mp.weixin.qq.com/) *2025年10月12日 16:02*

机器之心报道

**编辑：杜伟**

  

这几天，关于「微调已死」的言论吸引了学术圈的广泛关注。

  

一篇来自斯坦福大学、SambaNova、UC 伯克利的论文提出了一种名为 [Agentic Context Engineering](https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&mid=2650994884&idx=1&sn=eafeb1b68efba3fe53ade590368792dd&scene=21#wechat_redirect) （智能体 / 主动式上下文工程）的技术，让语言模型无需微调也能实现自我提升！

  

其实，在更早的时候，谷歌一篇名为《ReasoningBank: Scaling Agent Self-Evolving with Reasoning Memory》的论文提出了一个与 Agentic Context Engineering 类似的概念 —— ReasoningBank，用于智能体系统的创新记忆框架，从智能体自身判断的成功和失败经验中提炼并组织记忆项，无需真实标签 。

  

如图 1 所示，利用 ReasoningBank 不仅可以捕捉成功中的有效策略，还能从失败中提取重要的预防教训，将这些内容抽象成一系列可操作的原则。这个过程在一个闭环中运行：当面对新任务时，智能体从 ReasoningBank 中检索相关记忆来指导其行动。随后，新的经验被分析、提炼并重新整合回 ReasoningBank，使得智能体能够不断进化并提升其战略能力。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibpjibnXtqGHDayrp1iaY5twg5cZKaReQLV3FGk9NAZRS7ZSLibXTliaKHTdxibibWcdvZbeKIAXibdFjcJQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

通过将 ReasoningBank 作为强大的经验学习者，谷歌研究了经验扩展，以建立记忆与测试时扩展之间的强大协同效应。谷歌并不通过增加更多任务来扩展经验的广度，而是通过深入探索每个单一任务来扩展经验的深度。

  

此外，谷歌引入了 记忆感知的测试时扩展（MaTTS） ，在并行和顺序设置下都进行了应用，通过生成多样的探索来提供对比信号，使 ReasoningBank 能够合成更具普遍性的记忆。

  

最终，在记忆与测试时扩展之间实现了协同效应：高质量的记忆将扩展引导到更有前景的路径，而丰富的经验则进一步锤炼出更强的记忆。这种正反馈循环使得基于记忆的经验扩展成为智能体的一个新扩展维度。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibpjibnXtqGHDayrp1iaY5twgCaxG43kfSy9SXNhTPWGEribANYF3Lco1smM7CgkfWakmkQ2UFwB9RPw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

  

论文地址：https://arxiv.org/pdf/2509.25140

  

对于谷歌开发的这种能实时从自身错误中学习的 AI，网友纷纷看好。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibpjibnXtqGHDayrp1iaY5twgTIbyBDQbYgib1eNONMmgxfLIxulHpQhnTmrZiaIvjGnFx6wZ19aIhZXA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

  

方法概览

  

下图为 ReasoningBank 整体框架，其中经验被提炼成结构化的记忆项，包含标题、描述和内容。对于每个新任务，智能体从中检索相关项与环境进行互动，并从成功和失败的轨迹中构建新的记忆项。这些记忆项随后被整合到 ReasoningBank 中，形成一个闭环的记忆过程。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibpjibnXtqGHDayrp1iaY5twgjVTNrzWRg534VdtxUKlgePjLMYhSVyT8zGpA79hulEDO7hUJZ6Z3GA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

  

其中，ReasoningBank 包含了以下几个关键组件：

  

记忆结构 。ReasoningBank 中的记忆项是从过去的经验中设计和提炼出的结构化知识单元，它们抽象了低级执行细节，同时保留了可转移的推理模式和策略。每个记忆项包含三个部分：(i) 标题，作为简洁的标识符，总结核心策略或推理模式；(ii) 描述，提供记忆项的简短一句话总结；(iii) 内容，记录从过去经验中提炼出的推理步骤、决策理由或操作见解。提取出的记忆项既具有人类可理解性，又具备机器可用性，有助于高效使用和与智能体的集成。

  

ReasoningBank 与智能体的集成 。配备 ReasoningBank 的智能体可以从一个精心挑选的可转移策略池中汲取经验来指导决策。这使得智能体能够回忆有效的见解，避免以前观察到的陷阱，并更稳健地适应未见过的查询。集成过程分为三个步骤：(i) 记忆检索，(ii) 记忆构建，(iii) 记忆整合。

  

MaTTS ：记忆感知的测试时扩展。ReasoningBank 与测试时扩展的直接结合如图 3 (a) 所示，其中更多的轨迹被独立地转换为更多的记忆项。不过，这种基础方法并不理想，因为它没有利用来自同一问题上冗余探索所产生的对比信号，这限制了测试时扩展所带来的性能优势。为此，谷歌提出了 MaTTS，它是测试时扩展与 ReasoningBank 的全新集成。与基础方法不同，MaTTS 刻意从扩展过程中生成的大量成功和失败轨迹中学习，以便更有效地策划记忆。谷歌为 MaTTS 设计了两种互补的实现方式：并行扩展和顺序扩展，如图 3 (b) 和 3 (c) 所示。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/KmXPKA19gWibpjibnXtqGHDayrp1iaY5twg4nSI9588XYhMd8kXEUv8rpCMTnE4AZBuLrTumqmSe92zZshoMFyIeQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

  

并行扩展 。在并行设置中，谷歌在检索到的记忆项的指导下，为同一查询生成多个轨迹。通过对不同轨迹进行比较，智能体可以识别一致的推理模式，同时过滤掉虚假的解决方案。这个过程通过单一查询的多次试验促使多样化的探索，从而实现更可靠的记忆策划。

  

顺序扩展 。在顺序扩展中，谷歌在初步完成后，迭代地在单一轨迹内完善推理，遵循自我精炼的原则。在这个过程中，自我精炼中生成的中间笔记也被用作宝贵的记忆信号，因为它们捕捉了推理尝试、修正和见解，这些内容可能不会出现在最终的解决方案中。

  

实验结果

  

谷歌在具有挑战性的基准测试上进行了广泛的实验，包括了网页浏览（WebArena、Mind2Web）和软件工程（SWE-Bench-Verified）任务。

  

表 1、2、3 分别展示了 ReasoningBank 在 WebArena、Mind2Web 和 SWE-Bench-Verified 上的评估结果，表明了在有效性（相对提高高达 34.2%）和效率（减少 16.0% 的交互步骤）上均优于基准方法。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

特别地，ReasoningBank 与 MaTTS 的协同效果最好，使其成为基于记忆的经验扩展的关键组成部分。谷歌在 Webarena-Shopping 子集上实验了 MaTTS 与 Gemini-2.5-flash 的结合。默认下，MaTTS 集成了 ReasoningBank，但它也可以使用其他记忆机制。

  

为了研究整体的扩展效果，谷歌进行了以下基准测试：(i) 没有记忆机制的 MaTTS（MaTTS w/o memory），这代表了没有记忆机制的扩展设置；(ii) 没有聚合的 MaTTS（MaTTS w/o aggregation）；(iii) MaTTS，用于展示与扩展因子 k 相关的效果。值得注意的是，k = 1 是没有扩展的设置。

  

结果如图 4 所示，表明并行扩展和顺序扩展都能提升性能。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

更多实验结果请参阅原论文。

  

![图片](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

© THE END

转载请联系本公众号获得授权

投稿或寻求报道：liyazhou@jiqizhixin.com

继续滑动看下一个

机器之心

向上滑动看下一个