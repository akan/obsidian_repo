---
title: "苏黎世联邦理工学院：Prompt 的尽头是 MBTI ！"
source: "https://mp.weixin.qq.com/s/7H1o_r4ddfImqWgMqX1P8w?mpshare=1&scene=1&srcid=0930AjjqHGsJBx28NEVY4DCK&sharer_shareinfo=f738429c88d585b85a36eaf8319e5b92&sharer_shareinfo_first=f738429c88d585b85a36eaf8319e5b92&version=5.0.0.91094&platform=mac#rd"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-09-30
description: "MBTI，是目前最有用的一部剧本集。"
tags:
  - "MBTI人格提示"
  - "AI行为控制"
  - "多智能体协作"
abstract: "苏黎世联邦理工学院研究提出MBTI-in-Thoughts框架，通过MBTI人格模型提示大语言模型，在不改变模型参数的情况下引导AI产生稳定可预测的人格行为倾向。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/wc7YNPm3YxV5fenZFpMQjk7GDgzuM21L74mVsumTvSk3g2R9Vh7gZ8TtZcice4hqzeBZsbbG26MIHwcM54l5SGQ/0?wx_fmt=jpeg)

[大数据文摘](https://mp.weixin.qq.com/s/) *2025年09月24日 18:05*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

大数据文摘出品

怎样写提示词（Prompt）？

苏黎世联邦理工学院（ETH Zurich）与BASF研究人员联合发布的新研究给出了答案：提示词的尽头，不是工具箱，而是性格表。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

他们提出了一个名为 **MBTI-in-Thoughts** 的框架，用心理学中的MBTI人格模型提示大语言模型，从而 **在不改变模型参数的情况下，引导其产生稳定、可预测的人格行为倾向。**

这意味着， **可以用“你现在是一位ISFJ型AI”这类提示词，重构AI的推理风格、表达方式和任务策略** 。

也就是说，人格，不只是对AI行为的观察分析，更可以是Prompt的内容本身，是行为控制的Prompt。

研究团队使用MBTI的四大维度——内外向（E/I）、现实直觉（S/N）、思维情感（T/F）、判断感知（J/P），将大模型“引入角色”，最终稳定获得 **16种具有人格特征的AI代理人** 。

![Image](https://mmbiz.qpic.cn/mmbiz_png/wc7YNPm3YxV5fenZFpMQjk7GDgzuM21LaQiafxJ15J7icO3s0YZdL86wib5Dost7ekbiafbS5iaGxwgGmojN6b8uOzg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

测试显示：内向型AI更加诚实、话少但有逻辑；感性型AI更富同理心，更擅长共情表达；而判断型AI更讲秩序，擅长制定规则并遵守。

同样的模型，不同的人格，生成出的故事与策略完全不同

![Image](https://mmbiz.qpic.cn/mmbiz_png/wc7YNPm3YxV5fenZFpMQjk7GDgzuM21LEDIWIwkHpsI0TCoS0AibibVc24NgQqn4NncZXDy5OHDIFb9lhgfoJ21Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

这张图展示了在不同 MBTI 性格类型下，GPT-4o mini 模型在四个维度（内向/外向、感觉/直觉、情感/思维、感知/判断）的表现分布和稳定性。

在一项写作任务中，研究者让AI用不同人格生成故事，结果出人意料。

**Feeling人格（如INFP、INFJ）写出的故事更有情绪张力，情节更个人化，结局更温暖；Thinking人格（如INTJ、ESTJ）更擅长结构清晰、逻辑自洽的剧情推进** 。

不仅如此，这种人格的影响 **远超常规专业指令提示（如“请写得更像专家”）带来的差异。**

![Image](https://mmbiz.qpic.cn/mmbiz_png/wc7YNPm3YxV5fenZFpMQjk7GDgzuM21LGS5xX9yQrdBMd00PWj34USVYSYAxRggNLm1HaPOdibr92rS95Lurq5g/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

**这张图展示了不同 MBTI 类型在写作任务中的平均属性得分差异，揭示了思维型与情感型模型的明显分化，以及外向型模型在可读性、幽默感和幸福结局上优于内向型模型的趋势。**

**研究进一步指出： **人格Prompt比风格Prompt、任务Prompt、身份Prompt更强大，它是一种高维度、多轴线的行为原语（Behavioral Primitive）** 。**

在博弈实验中，AI参与了囚徒困境、鹰鸽博弈等经典战略互动。Prompt指定人格后，行为差异显著：

- **Thinking人格近90%选择背叛；Feeling人格则倾向信任与合作** 。
- **Introvert人格更倾向于在信息不对称下保持承诺，即使知道对方可能欺骗也不轻易改变决定** 。
- **Perceiving人格更灵活、更容易调整策略；Judging人格更稳定，强调计划与秩序**
![Image](https://mmbiz.qpic.cn/mmbiz_png/wc7YNPm3YxV5fenZFpMQjk7GDgzuM21LtqgWEAEqoaicQ8YqMEU81Sd1Dye6vTny4t3MoFcDjicXI7dXY2SdU07Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

这张图展示了不同 MBTI 维度在博弈论任务中的表现差异，包括叛变率、策略切换率和诚实率，说明性格特质会显著影响模型在战略互动中的行为模式。

而所有这些行为差异，只需在Prompt中加入人格提示即可实现，无需对模型做任何微调或额外训练。

人格成了Prompt的开关，也成了AI决策的变量。

从行为控制到群体协作：人格提示打开了AI新世界的大门

MBTI-in-Thoughts不仅实现了单体人格控制，还构建了 **多智能体人格协作框架** 。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

研究者设计了一套“自我反思 + 公共黑板”的群体沟通机制，让多个具有人格的AI先独立思考，再协作讨论，最后达成共识。

结果发现： **人格+反思的AI集群在模糊性任务中表现更优于任何投票机制或常规对话机制** 。

人格提示不仅控制了个体行为，还 **增强了整个系统的多样性与鲁棒性** ，避免了回音室效应（echoing），提升了集体判断的准确性。

更关键的是，这些人格不是死板的标签，而是 **对认知结构（cognition）和情绪机制（affect）的参数化控制** 。

换句话说，Prompt如果只是工具调用、任务转译，那它始终停留在机械层面。

而人格Prompt让AI获得了 **行为倾向、推理风格、情感反应和决策节奏的整体调控能力** ，这才是真正的智能工程（engineering intelligence）。

研究者指出，这一方法可拓展到Big Five、HEXACO、九型人格等多种心理框架，未来可用于医疗陪伴、教育引导、AI团队协作甚至司法问答等高信任场景。

Prompt，不只是把模型“叫醒”的咒语，而是控制行为的剧本。 **而MBTI，是目前最有用的一部剧本集** 。

注：头图AI生成

  

作者长期关注 AI 产业与学术，欢迎对这些方向感兴趣的朋友添加微信 Q1yezi ，共同交流行业动态与技术趋势！

  

**GPU 训练特惠！**

H100/H200 GPU算力按秒计费，平均节省开支30%以上！

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

扫码了解详情☝

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

点「赞」的人都变好看了哦！

继续滑动看下一个

大数据文摘

向上滑动看下一个