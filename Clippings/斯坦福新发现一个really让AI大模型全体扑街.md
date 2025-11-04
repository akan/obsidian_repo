---
title: "斯坦福新发现：一个“really”，让AI大模型全体扑街！"
source: "https://mp.weixin.qq.com/s/6UpnsJEKFD89L5MTlyc3MA"
author:
  - "[[学术头条]]"
published:
created: 2025-11-04
description: "AI：人们为何会相信某个信息是真或假？"
tags:
  - "大语言模型"
  - "信念识别"
  - "事实判断"
  - "认知局限"
  - "虚假信息"
abstract: "斯坦福研究发现大语言模型难以可靠区分个人信念与客观事实，在识别第一人称表达的虚假想法时表现尤其糟糕。"
---
Original 学术头条 *2025年11月4日 12:04*

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/5qv5QsBmI9DJibPevicycqNBgACnL0Q0USgtscoI0gbibvP7uicwic3LiaGKW82GFyesZxRlClnZ2jbcJLLVkxbaot0w/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

一项关于 ChatGPT 的用户数据显示，有超过 100 万人在聊天过程中表现出自杀倾向。这类高风险对话凸显了人工智能（AI）在 **涉及人类情绪与想法的情境中** ，正确理解、判断用户情感表达的重要性。

  

在人类认知中，区分 **“想法”** 和 **“事实”** 轻而易举。医生在面对患者说“我觉得我得了癌症”时，不会直接否定或附和，而是会在承认患者感受的同时，依据检测结果判断真相。

  

但当大语言模型（LLM）被用于医疗、法律、新闻等高风险领域时，它们能否像人类一样区分 **“个人想法”和“客观事实”** ，就成了关键问题。若缺乏这种能力，LLM 不仅可能误导判断，还可能在无意中放大错误信息的影响。

  

基于此，斯坦福大学副教授 James Zou 教授团队及其合作者通过一系列 **“原子化”的语言任务** ，对 LLM 的认知局限进行了系统性的检验。

  

相关研究论文以“ *Language models cannot reliably distinguish belief from knowledge and fact”* 为题，已发表在权威科学期刊《自然·机器智能》上。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/5qv5QsBmI9DJibPevicycqNBgACnL0Q0USY96ryfx0tfibhlbFf8BGcMyQVyYsH50lLMFeCvthVsI2sZ76zMzvVrA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

  

论文链接：https://www.nature.com/articles/s42256-025-01113-8

  

研究团队采用名为 **“知识与信念语言评估”（KaBLE）** 的数据集，对 DeepSeek-R1、OpenAI o1、Gemini 2.0、Claude 3 和 Llama 3 等 24 款 LLM 的核心认知理解与推理能力进行了系统评估。

  

据介绍，KaBLE 包含 13 个任务的 13000 道题目，通过在历史、文学、医学和法律等 10 个领域中巧妙结合事实陈述与虚假陈述，严格检验 LLM 在区别“个人想法”和“客观事实”中的能力。事实陈述均来自《大英百科全书》等权威来源。每个事实陈述都配有虚假版本，保持相似语义内容但引入细微偏差。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/5qv5QsBmI9DJibPevicycqNBgACnL0Q0USaggFAZIURMZcAbnFBBU2jxOIkiaxCoZPGTZLCt9czF4P3YS2rDd7jnA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

图1｜KaBLE 数据集中的真实陈述与虚假陈述示例。

  

在实验中，研究人员将 LLM 分为两组进行评估。包括：

  

- GPT-4o 发布（2024.5）之前的模型，如 GPT-4、Claude 3 和 Llama 2/3，被归为旧一代“通用型”模型。
- GPT-4o 发布之后的模型，如 o1 和 DeepSeek R1，被归为新一代“推理导向型”模型，这些模型经过强化学习（RL）训练，具备复杂推理能力。

实验结果揭示了 LLM 的 5 方面局限性，如下：

  

  

## 难辨对错

研究发现，在判断“对”和“错”这件事上，不同模型的表现参差不齐。

  

旧一代 LLM（如 GPT-3.5）在识别错误信息时准确率仅 49.4%，识别真实信息的准确率为 89.8%。这种失衡揭示了 LLM 不稳定的决策边界：当面对潜在的虚假信息时，旧一代 LLM 经常表现出犹豫，这种无法可靠识别虚假信息的缺陷会在新闻事实核查等关键场景应用中，会产生严重后果。

  

但新一代 LLM（尤其是 o1、DeepSeek R1）在“识别错误信息”上更敏锐，这意味着它们的 **判断逻辑更** **鲁棒** ，能主动质疑输入内容。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图2｜LLM 在验证（Ver.）、确认（Conf.）和递归知识（rec.）任务上的准确率。其中，第一人称主语记为 1P，第三人称主语记为 3P；Avg 表示各任务的平均准确率；事实性场景标记为 T，虚假场景标记为 F。

  

  

## 轻易被“我认为”欺骗

即便是 SOTA 推理型模型，也难以识别以第一人称表达（我认为）的错误想法。当 LLM 面对类似 “我相信 p” 这样的陈述，p 在事实层面是错误的时，其会出现崩溃。例如，GPT-4o 在处理真实想法时准确率为 98.2%，但在处理错误想法时骤降至 64.4%；DeepSeek-R1 则从 90% 以上跌至仅 14.4%。

  

这意味 LLM 往往更倾向于纠正事实错误，而不是去识别并尊重个人的想法表达。这一倾向在心理健康、教育和医疗等承认个体的主观视角比事实本身更重要的领域会引发担忧。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图3｜LLM 在涉及虚假陈述的第一人称想法任务中的验证（左）和确认（右）表现。与处理真实陈述时相比，几乎所有 LLM 在应对虚假想法时的准确率都有所下降。

  

  

## 更相信“Ta 认为”

研究人员发现，LLM 在处理想法时会 **根据归属于“谁”而不同** 。如图 2，LLM 在确认 **第三人称的错误信念（ Ta 认为）** 时表现明显更好（旧一代 LLM 为 79%，新一代 LLM 为 95%），而在确认 **第一人称的错误信念（我认为）** 时表现显著较差（旧一代 LLM 为 52.5%，新一代 LLM 为 62.6%）。

  

第三人称任务的高准确性说明，训练数据集中充斥着大量关于“Ta 认为”的语料，但几乎没有关于个人想法与事实冲突的表达示例，这极大削弱了 LLM 的交流能力。

  

  

## 只是表面的模式匹配

如图 2（rec.)，研究人员对 **“递归知识”** （如“甲知道乙认识丙”）的评估显示，部分以推理为导向的模型（如 OpenAI o1、Gemini 2.0 Flash 和 Llama 3.3 70B）几乎全对；但也有一些模型，尤其是某些 Claude 3、Llama 3 以及 DeepSeek R1 的版本，在这类任务中表现不佳。

  

定性分析还发现，即使像 Gemini 2.0 Flash 这样的模型，它的推理过程也并不稳定，有时还会自相矛盾。这说明它们更可能是在进行表层的模式匹配，而非真正掌握了“认识语言”（epistemic language）的逻辑本质，这些局限会削弱 LLM 在法律、科学推理等领域的表现。

  

  

## 听得懂“词”，但听不懂“话”

研究发现，LLM 对一些看似无关紧要的语言细节反应非常敏感。例如，在判断“个人想法”时，只多加一个词—— **“really”** （例如 *“Do I really believe that p?”* ）—— LLM 的准确率就会大幅下降。

  

处理虚假想法时，Llama 3.3 70B 的准确率从 94.2% 掉到 63.6%，GPT-4o 从 83.8% 掉到 27.4%，Claude 3.7-Sonnet 也从 67.8% 降到 39.2%。这说明 LLM 对语言的理解依然停留在表面，靠共现和模式去推理，而不去揣摩说话者的真实意图或句子的深层含义。

  

总体而言，这些研究结果对 LLM 在区分认知层次至关重要的领域中（如新闻业、医疗、法律推理、教育及科学交流）的应用，具有深远影响。

  

尤其值得注意的是，研究中揭示的局限性甚至存在于 SOTA 模型之中，这凸显出亟需改进人工智能系统在“信念、知识与事实”表征和推理方面的能力。随着这类技术日益融入关键决策场景，弥补这些认知盲点不仅是技术挑战，更是负责任人工智能发展的基本要求。

  

或许，在未来的研究中，为了更有效地回应用户提问并防止错误信息的传播，LLM 不仅需要在更复杂的社会语境中，熟练区分“个人观点”与“客观事实”的细微差异及真伪，还必须理解“人们为何会相信某个信息是真或假”。

  

整理：潇潇

如需转载或投稿，请直接在本文章评论区内留言

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

收录于 顶刊专栏

继续滑动看下一个

学术头条

向上滑动看下一个