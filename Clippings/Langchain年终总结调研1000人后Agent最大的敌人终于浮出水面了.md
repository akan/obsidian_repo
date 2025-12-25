---
title: "Langchain年终总结：调研1000人后，Agent最大的敌人终于浮出水面了"
source: "https://mp.weixin.qq.com/s/4318UUokAYTFt8no2KN_-g"
author:
  - "[[猕猴桃]]"
published:
created: 2025-12-25
description: "嘿，大家好！这里是一个专注于前沿AI和智能体的频道~元旦了，Langchain的年末总结来了，调研了1000多位一线人士。"
tags:
  - "Agent落地"
  - "生产环境"
  - "质量挑战"
  - "可观测性"
  - "多模型混用"
abstract: "文章总结了Langchain对1000多位一线从业者的调研，指出Agent技术已进入落地阶段，当前最大的挑战是输出质量、延迟以及可观测性与评估体系的建立。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/d08lv0anUnjgkiaVub91zITicsWuhxlMtqhyAgP72k4XdS5qiaesbW1o0zYOehchhxibrJZq60Jg0XK6Zln196hOZQ/0?wx_fmt=jpeg)

猕猴桃 [探索AGI](https://mp.weixin.qq.com/s/) *2025年12月18日 11:50*

嘿，大家好！这里是一个专注于前沿AI和智能体的频道~

元旦了，Langchain的年末总结来了，调研了1000多位一线人士。

![Image](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjgkiaVub91zITicsWuhxlMtqTJiczKeQ5Z5PczlFKMfCiazVsicswrTJWatGAIH4FaOwIwHC581j6IF4g/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

结论很简单：Agent已经过了炒概念的阶段，大家在意的不是要不要做，而是怎么做稳、做好、做大。

整体来看，对于去年，跑到生产环境的Agent有一定的提升。

![Image](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjgkiaVub91zITicsWuhxlMtq95Ueq7la74BHibfwX0z558t1iaHcxCFXwtFiaac77WeZKuWWCQdp9bkWA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

## 大厂跑得更快

万人以上的大企业，67%已经上了生产，还有24%在开发中准备上线。

百人小团队，50%上生产，36%还在开发。

差距不大，但大厂明显在从PoC到真正落地的路上走得更快，大厂平台、安全体系、测试这些基建，本身会有优势一些。

![Image](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjgkiaVub91zITicsWuhxlMtqgoz9HxLqyd3sb3MKpcianCdQlzINhUSov6N7OHicy9EPAk08Uwbq5HBA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

## 主要落地场景

客服排第一（26.5%）

研究和数据分析紧随其后（24.4%）。

这俩加起来占了一半以上。

内部流程自动化也有18%，用来给员工提效。

有意思的是，今年的用例分布比去年更散了，Agent正在渗透到更多场景。 大厂更多的是选择提升自己的内部生产力，先搞定自己人，在对外服务。

![Image](https://mmbiz.qpic.cn/mmbiz_png/d08lv0anUnjgkiaVub91zITicsWuhxlMtqJlzFLO0RLRZsdX56p21gKYH9aAsoHDMSJNVMqnwK5wxmtia0er93hEw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

## 质量，质量，质量！

和去年一样， **质量问题卡住了三分之一的团队** 。准确性、一致性、幻觉、语气控制，这些都是坑。

第二大问题是延迟（20%）。Agent做得越复杂，推理步骤越多，速度就越慢。

用户体验和质量之间的trade-off挺难搞的。

成本反而没这么担心了，开源模型性价比（又不是不能用~）。

大厂更担心的是安全（24.9%）。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 可观测性

89%的团队已经上了可观测性，其中62%能追踪到Agent的每一步调用。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

没法看到Agent怎么推理、怎么调用工具，根本没法debug，也没法优化。这些都应该是共识，没啥好分析的。

Eval方面就差很多了，只有52%做离线评估，37%做在线评估。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

做Eval的团队里，大部分用LLM-as-judge（53.3%）和人工复核（59.8%）配合着来。

ROUGE、BLEU 之类的指标，基本没人用了，毕竟Agent的输出太开放，没有标准答案。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 多模型混用

OpenAI的GPT系列还是用得最多，但超过四分之三的团队在用多个模型。

根据任务复杂度、成本、延迟来选模型，这才是正确姿势。没人all-in一家。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

三分之一的团队自己部署开源模型，可能是为了成本，也可能是隐私安全之类的。

不微调成为常态，前期靠Prompt + 上下文工程，足够应付了。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 每天在用的Agent是什么？

代码很集中。 Claude Code、Cursor、GitHub Copilot、Windsurf这些代码工具，几乎人手必备。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

ChatGPT、Claude、Perplexity用来做调研、总结长文档、跨资料分析。

但也有不少人说，自己日常还没用上真正的Agent，只是聊天+代码助手。Agent everywhere还早着呢。

## 最后

今年的报告地址： https://www.langchain.com/state-of-agent-engineering

好了，这就是我今天想分享的内容。如果你对构建AI智能体感兴趣，别忘了点赞、关注噢~

  

继续滑动看下一个

探索AGI

向上滑动看下一个