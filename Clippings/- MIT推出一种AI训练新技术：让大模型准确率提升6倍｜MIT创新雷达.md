---
title: "MIT推出一种AI训练新技术：让大模型准确率提升6倍｜MIT创新雷达"
source: "https://mp.weixin.qq.com/s/gezspX-EoXcHrgAt5tU2xA"
author:
  - "[[关注科技创新的]]"
published:
created: 2025-07-10
description: "MIT研究团队提出一种名为“测试时训练”的新技术，在模型部署阶段进行轻微参数更新，即可让语言模型在陌生复杂任务上的表现提升六倍，为大模型“真正学习”打开新思路。"
tags:
  - "测试时训练"
  - "语言模型"
  - "参数更新"
  - "准确率提升"
abstract: "MIT研究团队提出“测试时训练”技术，通过部署阶段的轻微参数更新，显著提升语言模型在陌生复杂任务上的表现。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/cQZmxwM8fdTQpBL3gfyhaOXxEQc4q58D3gbqdo5mPAfrZUDLSvIEaawTR2zWicZj1iaSbBrFiaAbc3GnzgKibPIFlA/0?wx_fmt=jpeg)

Original 关注科技创新的 [MITCEO](https://mp.weixin.qq.com/s/) *2025年07月09日 20:30*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/cQZmxwM8fdTATibOfclyn2JHDcdmTuiabcQkgNPeXC32YOiaVyQAspmk081wtRU4pRliaY4kicWoUKibK3bkk4NgBPmQ/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1) ![环绕logo.gif](https://mmbiz.qpic.cn/sz_mmbiz_gif/cQZmxwM8fdTUGdnrCf4Ej00XHAjq3Mpsd5vp2CpnmnZWCpcrvvpWfS5OzHwH7Eob2URG0iallDyKXs1s5YKgWbA/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1) ![201.jpg](https://mmbiz.qpic.cn/sz_mmbiz_jpg/cQZmxwM8fdTQpBL3gfyhaOXxEQc4q58Do68k7pBLRtMwE1W2ObgCHzahXLUPiaiciciaZ7WTLCeApS1EeUYVBjUEqA/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

  

作者： Adam Zewe

编辑：吴海波

  

  

**MIT创新雷达｜扫描前沿趋势，洞见科创未来**

**On Campus and Around World**

  

  

我们常说大语言模型“通才多能”，但面对逻辑推理、复杂推算等任务，它们其实也经常“栽跟头”。MIT 最新研究提出了一种叫“测试时训练”的方法，能在模型上线后临时学会新任务，让大模型不再“死板执行”，而是灵活应变。这项技术如何让模型准确率提升 **六倍** ？能否应用在医疗、金融、科研等高风险领域？一文带你读懂。

  

![MIT-fewshot-01-press_0.jpg](https://mmbiz.qpic.cn/sz_mmbiz_jpg/cQZmxwM8fdTQpBL3gfyhaOXxEQc4q58D0H2Usugujkchs5VsoyMiaNoWx8McWKpoiaWg3AAE6ibicV7uW9Rb64VUgg/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

Caption:

*图片来源： MIT 研究新闻 / iStock / 插画作者 Jose-Luis Olivares*

  

大型语言模型（LLMs）虽然在多种任务中表现出色，但 **面对需要复杂推理的新挑战时** ，往往容易“翻车”。

  

比如，一款为会计公司训练的语言模型，可能能轻松总结财务报表，但如果让它预测市场趋势或识别欺诈行为，表现可能就大打折扣。

  

为了提升模型适应新任务的能力，麻省理工学院（MIT）的研究团队探索了一种被称为“ **测试时训练”（test-time training）** 的技术。该方法可以在模型部署时，对其内部参数进行临时更新，从而显著提升模型在新任务上的表现。研究表明，这种方法可使模型在复杂任务上的 **准确率提高至原来的六倍** 。

  

团队还提出了一整套框架，使得模型能利用少量新任务的示例数据，在不重训的情况下快速适应新任务。

  

> “这其实就是一种‘真正的学习’。模型上线后通常不会自己‘变聪明’或‘掌握新技能’，但我们发现，只要稍微推动它学习一下，就能带来非常显著的性能提升。”该论文第一作者、MIT博士生 Ekin Akyürek 表示。

  

论文的作者团队还包括研究生 Mehul Damani、Linlu Qiu、Han Guo 和 Jyothish Pari，本科生 Adam Zweiger，以及EECS（电子工程与计算机科学）系的助理教授 Yoon Kim 和副教授 Jacob Andreas，二人同时也隶属于MIT计算机科学与人工智能实验室（CSAIL）。这项研究将在国际机器学习大会（ICML）上正式发布。

  

  

**Ekin Akyürek**  
MIT博士生，本文第一作者。专注于人工智能、语言模型训练方法及其泛化能力的研究。他主导了本项研究中“测试时训练”策略的设计与验证工作。

  

**Yoon Kim**  
麻省理工学院电气工程与计算机科学系助理教授，CSAIL（MIT计算机科学与人工智能实验室）成员。以自然语言处理和神经网络结构研究著称，是本研究的共同资深作者。

  

**Jacob Andreas**  
麻省理工学院电气工程与计算机科学系副教授，CSAIL成员。研究方向涵盖语言模型可解释性、组合泛化和多模态推理，也是本研究的资深作者之一。

  

  

  

![组 3.png](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

为什么“上下文学习”还不够？

  

目前，人们常用 **“上下文学习”（in-context learning）** 来让语言模型适应新任务，即在输入中加入几个示例，指导模型输出。然而，这种方法在涉及逻辑推理的复杂任务上往往效果不佳。

  

MIT团队发现，如果在 **部署阶段对模型内部部分参数进行轻微更新** ，即“测试时训练”，可以让模型在类似智商题、结构推理等高难度任务中表现大幅提升。

  

> “光靠提示（prompt）给模型几个例子，只能带来轻微改善。真正去更新模型参数，才能获得显著提升。” 研究生 Damani 表示。

  

具体来说，研究人员先用新任务的几个示例构建一个小型数据集，然后通过简单的数据增强（如翻转输入顺序、略改问题内容）扩展成更大规模的数据。训练过程中，只需更新模型中极少量的参数（使用一种名为低秩适配 Low-Rank Adaptation 的方法），便能显著提高效率和精度。

  

Akyürek指出：“这很关键。因为如果希望方法在现实中部署，就必须足够高效。我们发现，只需要非常少量的参数更新，就能带来准确率的大幅提升。”

  

  

![组 3.png](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

每次任务前“微调”，模型就像学了新技能

  

这种“测试时训练”方式 **不是一次性更新模型** ，而是为每个具体任务临时进行调整。一旦预测完成，模型会自动恢复原始状态。

  

虽然这种方式会花费更多时间（一次查询可能从几十秒增加到五分钟以上），但在面对特别复杂或前所未见的任务时，它非常实用。

  

在两个复杂任务基准测试（如智力题等）中，这一方法的准确率是传统上下文学习方法的六倍。

  

尤其是 **在输入数据结构陌生、规律复杂的任务中** ，“测试时训练”的优势更加明显。

  

> “对于简单任务，上下文学习已经足够。但如果你希望模型真正‘掌握新技能’，那就要去更新参数。”Damani补充说。

  

  

![组 3.png](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

通向“持续学习”模型的下一步

  

未来，研究人员希望继续推进“自我调整”的语言模型：在收到问题后，模型可以自动判断是否需要启用测试时训练，并能自主选择最优训练策略，无需人类干预。

  

这也为构建真正能够持续学习、自主适应的新一代语言模型铺平了道路。

  

这项研究得到了MIT-IBM Watson AI Lab和美国国家科学基金会（NSF）的资助。

  

  

  

**参考资料：** https://news.mit.edu/2025/study-could-lead-llms-better-complex-reasoning-0708

  

  

  

  

  

![关注.jpg](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

  

  

![英文导读.jpg](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

[#MIT创新雷达](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzIwNjQzMjc4NQ==&action=getalbum&album_id=3995108950289858572#wechat_redirect)

  
[![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=MzIwNjQzMjc4NQ==&mid=2247516660&idx=1&sn=931ecd4f85a1442eabbfe2c8ffd6a124&scene=21#wechat_redirect)

[MIT新技术让机器人“透视”遮挡物，实现96%精准还原隐藏物体｜MIT创新雷达](https://mp.weixin.qq.com/s?__biz=MzIwNjQzMjc4NQ==&mid=2247516631&idx=1&sn=2e865fec4f44741d6db7ad03f6d04318&scene=21#wechat_redirect) [![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=MzIwNjQzMjc4NQ==&mid=2247516586&idx=1&sn=ce40ff93cf6cbcbb790754ca35717f7e&scene=21#wechat_redirect)

[MIT 用 AI 改造机器人：跳高提升 41%，落地稳定性提高 84%｜MIT创新雷达](https://mp.weixin.qq.com/s?__biz=MzIwNjQzMjc4NQ==&mid=2247516586&idx=1&sn=ce40ff93cf6cbcbb790754ca35717f7e&scene=21#wechat_redirect)

  

  

![640(1).gif](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![关于我们.jpg](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

MITCEO

向上滑动看下一个