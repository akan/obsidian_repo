---
title: "DeepMind新论文炸锅：AI全自动进化算法，写出专家都想不到的解，网友：这可能就是“王牌”"
source: "https://mp.weixin.qq.com/s/pm-9M7vPXuCMBneWKup1zQ"
author:
  - "[[木子]]"
published:
created: 2026-02-28
description: "人类编程的“最后防线”，也正被AI松动。"
tags:
  - "AI进化算法"
  - "自动代码改写"
  - "多智能体学习"
  - "超越人工设计"
abstract: "DeepMind的AlphaEvolve系统利用大语言模型和进化搜索，自动发现并改进了多智能体学习算法，其性能超越了人类专家手工设计的版本。"
---
Original 木子 *2026年2月27日 14:00*

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/lYDricib2fsm6pShzUiasE4BwPO1rduAibyMUKw42e8LnCHgreabjpic9rRw5fX0UELsc96Nb7MnJhia4dmjaYSxKwVndxWXbOvB0jr3psgicygAOQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

作者 | 木子

说起 AI Coding，之前很多人好歹还有个“心理安慰”：AI 也就写写“脚手架代码”、补补前端页面，真到核心算法、业务逻辑，还是得人来。

但这道“最后防线”，也正在松动。

**谷歌 DeepMind** 最近做了一件更狠的事：他们让 **LLM 驱动的智能体，直接去改写、进化算法代码本身** ——不是调参数，而是改算法逻辑。

改完就丢进真实博弈环境里反复跑，自动评测、优胜劣汰，一轮轮进化。

结果呢？它真的做出了 **全新的多智能体学习算法** ，在多项测试中超过了人类专家手工打磨的版本。

重要的是，这些机制并不直观，属于人类很难靠经验穷举出来的解。

更关键的是：人只用定义好了算法骨架，之后的搜索、修改、筛选，全程自动完成，不用手调参数，不用反复试错，也不靠研究者的直觉微调。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/lYDricib2fsm5XBUEsicvdWUexZcmkTNCMrHlJxZMwbiaHWt0uCaxdwEUtDbia9piakq8SZrgTaZj6ibyUGGiapIGpjziaibaAY6p9sAL8mZolBxRU6hk/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

这个智能体叫 **AlphaEvolve** ，延续了 DeepMind 一贯的“Alpha”命名传统（AlphaGo、AlphaZero、AlphaFold）。其中 “Evolve” 意为“进化”，点明它的核心机制：通过类似生物进化的方式不断改写和筛选算法。

这个 AlphaEvolve 本身去年就有，但这是它 **第一次被用来学习算法** 。

它把 Gemini 系列大模型，和进化搜索结合起来，把代码不断生成、测试、筛选、再进化。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

DeepMind 把把研究过程和成果写成了一篇 37 页的论文，题为《基于大语言模型的多智能体学习算法自动发现》（Discovering Multiagent Learning Algorithms with Large Language Models ），一发出来就炸了技术圈。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

有网友看完直呼，这玩意真挺“可怕”的：

> “这看起来像是 DeepMind 手中的一张王牌，我认为它可能导致谷歌赢得比赛。”

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

有人锐评：

> “这就像教一个孩子读书，然后看着它自己编写教科书。”

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

还有人已经开始往更远处想：既然 AI 已经能设计更好的学习算法，那或许它也该先给自己设计一套更完善的“伦理引擎”，在 ASI 真正爆发之前，先把对齐这件事想清楚。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**人只选定算法框架，**

**AI 全自动闭环进化**

来展开看看实验设计和操作过程。

需要说明的是，研究团队没有让模型“从零写算法”，而是选定两个 **成熟框架：**

- **CFR（后悔最小化）： CFR 算法族，依赖递归定义来累积后悔值并构建平均策略。**
- **PSRO（策略种群训练）： 通过迭代计算最优响应并求解元策略，不断扩展策略种群。**

过去，在不完全信息博弈求解（比如扑克）中，像 CFR、PSRO 这些经典算法虽然理论扎实，但真正好用的“升级版”，还是要靠人类专家一点点凭经验调参、改规则、试出来。

然后，研究人员把算法核心逻辑，拆成几个可被改写的 Python 函数，例如：regret 累积规则、当前策略生成方式、平均策略更新规则、PSRO 的 meta-solver 逻辑。

也就是说， **他们只开放了“关键决策逻辑”给 LLM 改，其余框架固定。** 这一步很关键，相当于给进化定义“基因范围”。

接下来就进入真正的“进化环节”。

AlphaEvolve 把当前算法代码当作“个体”，由 LLM 生成若干语义上有意义的改写版本：不是随便乱改，而是改具体逻辑、控制流或更新规则。

每一个改写后的版本，都会被自动编译、运行，然后丢进一组博弈环境里真实对战，用 exploitability 这样的指标打分。表现更好的版本被保留下来，作为下一轮搜索的基础；表现差的直接淘汰。

整个过程是闭环的：生成 → 运行 → 评估 → 筛选 → 再生成，循环推进。人类不参与中间调参，也不手动筛选，只负责设定规则和评价标准。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图注：这张示意图也是 AI 做的

结果，AI 进化出了 **两个全新算法** 。

先看 CFR 这一派。AlphaEvolve 进化出了 VAD-CFR。

AI 没有去调那点小参数，而是直接改了“后悔值怎么累计、怎么打折、什么时候开始平均策略”这些核心逻辑。

比如引入了 volatility-sensitive discounting（根据波动动态折扣）、hard warm-start schedule（前期蓄力、后期发力）这样的机制。

听起来挺抽象的，但效果明显：在多个博弈里，它超过了目前人类手工打磨出来的最强版本。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这张图很直观，展示了多种 CFR 变体在不同博弈环境中的收敛表现。上半部分是用于搜索阶段的训练游戏，下半部分是规模更大、更复杂的测试游戏。

横轴是迭代次数（最多 1000 次），纵轴是 exploitability（越低越接近均衡）。曲线降得越快、越低，说明算法越强。

灰色那条线就是 VAD-CFR。可以看到，在多数游戏里，它下滑得更快、落得更低，明显压过 CFR+、DCFR、PCFR+ 这些人类优化过多轮的版本。

在一些游戏中，大约 500 次迭代之后，曲线像突然“踩了油门”，下降速度明显加快——这正是它预热阶段结束、正式发力的时刻。

前半段像是在默默蓄力，后半段才真正冲刺。

更关键的是，在规模更大、难度更高的测试游戏中，VAD-CFR 依然比传统的 CFR、CFR+、DCFR 等人工设计的算法收敛更快、结果更优，没有出现“只会做模拟题”的情况。

这说明， **它不是针对训练游戏做了小技巧，而是在算法结构层面找到了一种更高效的更新方式。**

再看 **PSRO** 这一派：AI 进化出了 **SHOR-PSRO** 算法。

它做的事情很简单也很大胆：重新设计“元求解器”。

传统方法要么偏探索，要么偏逼近均衡，权衡是固定的。而 SHOR 直接把多种更新机制混合在一起，设计了一种混合型 meta-solver，而且随着训练进程动态调整，让训练过程自动从“多样性探索”过渡到“逼近均衡”。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**这张图，展示的就是它和 Uniform、Nash、AlphaRank、PRD、RM 等经典方法的对比。**

图中不同颜色代表不同元求解器：Uniform、Nash、AlphaRank、PRD、Regret Matching（RM），以及进化得到的 SHOR（棕色线）。

整张图分为上下两部分。上半部分是训练游戏，下半部分是规模更大、更复杂的测试游戏，用来检验算法是否具有泛化能力。

横轴是 PSRO 迭代次数（最多 100 轮），纵轴是 exploitability（可被利用度，对数坐标）；数值越低，说明算法越接近博弈均衡、表现越好。

可以看到，在多数游戏中，SHOR 曲线下降更快，而且在第 100 次迭代时的 exploitability 更低，说明它在同样迭代次数下更有效地逼近均衡。

尤其是在更复杂的测试游戏中（如 4-player Kuhn、6-sided Liar’s Dice），SHOR 依然保持优势，没有明显退化。

简单说，SHOR-PSRO 在“什么时候多探索、什么时候专注逼近均衡”这件事上，比传统方法更灵活、更聪明。

**它不是靠调参数赢的，而是把调度逻辑本身改了。**

论文地址： https://arxiv.org/abs/2602.16928

参考链接：

https://x.com/hasantoxr/status/2026371848217456738

https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/?utm\_source=chatgpt.com

声明：本文为 AI 前线整理，不代表平台观点，未经许可禁止转载。

  

  

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

会议推荐

2026，AI 正在以更工程化的方式深度融入软件生产，Agentic AI 的探索也将从局部试点迈向体系化工程建设！

QCon 北京 2026 已正式启动，本届大会以“Agentic AI 时代的软件工程重塑”为核心主线，推动技术探索从「AI For What」真正落地到可持续的「Value From AI」。从前沿技术雷达、架构设计与数据底座、效能与成本、产品与交互、可信落地、研发组织进化六大维度，系统性展开深度探索。开往 2026 的 Agentic AI 专列即将启程！汇聚顶尖专家实战分享，把 AI 能力一次夯到位！

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

##### 今日荐文

[黄仁勋每天都用的AI工具，要抢金融行业饭碗了？](https://mp.weixin.qq.com/s?__biz=MzU1NDA4NjU2MA==&mid=2247656889&idx=1&sn=1d9bf89db93be7ae8e2ea615baa462fe&scene=21#wechat_redirect)

[史上最“疯狂”高中：没有老师、全靠AI？全员入学定创业项目，目标是成为领域顶尖专家](https://mp.weixin.qq.com/s?__biz=MzU1NDA4NjU2MA==&mid=2247656853&idx=1&sn=e2e4a1d2ab9b482367b9012c1a9aabd3&scene=21#wechat_redirect)

[不怕你走，就怕你不用AI写代码！OpenAI Codex负责人亲口承认：内部已很少再打开IDE](https://mp.weixin.qq.com/s?__biz=MzU1NDA4NjU2MA==&mid=2247656750&idx=1&sn=c8acb75a1e1b2e6ea0d57d6eb85f6533&scene=21#wechat_redirect)

[DeepMind 运作模式曝光！暗示根本没输 OpenAI：员工20% 时间重启创新，保守巨头直接变 “实验狂”](https://mp.weixin.qq.com/s?__biz=MzU1NDA4NjU2MA==&mid=2247656672&idx=1&sn=6e4e65f9b45f1d1a613f71f418dc93e2&scene=21#wechat_redirect)

[印度一大学买宇树机器狗冒充自研，被扒后坦白；智谱致歉并宣布补偿，《镖人》用 Seedance 2.0 做片尾彩蛋；OpenAI 算力狂想退烧｜AI周报](https://mp.weixin.qq.com/s?__biz=MzU1NDA4NjU2MA==&mid=2247656638&idx=1&sn=b793737268f3fbe3475b2d19096f00a1&scene=21#wechat_redirect)

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

你也「在看」吗？👇

继续滑动看下一个

AI前线

向上滑动看下一个