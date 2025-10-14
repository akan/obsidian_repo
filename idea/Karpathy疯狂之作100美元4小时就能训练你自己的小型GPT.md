---
title: "Karpathy「疯狂之作」：100美元、4小时，就能训练你自己的「小型GPT」"
source: "https://mp.weixin.qq.com/s?__biz=MzI3MTA0MTk1MA==&chksm=f0b4e74365665eb5c62ba832d0644d3e607d83cb7b8f8075f272a4ba2744ca4049784f3b16fb&idx=1&mid=2652634110&sn=2816c3458f38e6f2ceb6d03f39e34708#rd"
author:
  - "[[新智元]]"
published:
created: 2025-10-14
description: "你的「专属AI」，nanochat开源了！"
tags:
  - "开源项目"
  - "训练框架"
  - "低成本训练"
  - "小型GPT"
  - "AI民主化"
abstract: "Karpathy发布nanochat开源项目，仅需100美元和4小时即可训练出小型ChatGPT模型，大幅降低AI模型训练门槛。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/UicQ7HgWiaUb0Hte1ibgObCpQM5nT6IMia2l0Gq6gibpnibXibpKDp0oJgZw4RgS7okHgYVSDTVQbaflN6Ljx0UFwaRjg/0?wx_fmt=jpeg)

新智元 [新智元](https://mp.weixin.qq.com/) *2025年10月14日 10:16*

### 新智元报道

编辑：定慧

##### 【新智元导读】AI传奇人物、前特斯拉AI总监Karpathy重磅推出全新开源项目「nanochat」，以不到8000行代码复现ChatGPT全流程，只需一台GPU、约4小时、成本仅百美元。该项目在GitHub上线不到12小时即获4.2k星标！

[一图看透全球大模型！新智元十周年钜献，2025 ASI前沿趋势报告37页首发](https://mp.weixin.qq.com/s?__biz=MzI3MTA0MTk1MA==&mid=2652625640&idx=1&sn=599fde2abe811219a22711fe44172c70&scene=21#wechat_redirect)

AI传奇人物、前特斯拉AI总监Karpathy宣布发布全新项目 **nanochat!**  

一个极简但完整的 「从零构建ChatGPT」 训练框架。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb0Hte1ibgObCpQM5nT6IMia2lL4D5we7BrBsqexTusicIQShhiaPSkARYqJUCnHCltl8532NDGz53KCgQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

Karpathy说这是他写过的最疯狂的项目之一！

相当于每个人都可以自己拥有一个专属的ChatGPT。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb0Hte1ibgObCpQM5nT6IMia2lhEMcXgyPzYlGzibenwoX3gMNP9wdBibmq6NHE7SmL7ic1crXwj58bPHew/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

项目刚放出还不到12个小时，GitHub星标就破 4.2kStar！（还在持续疯涨中）

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb0Hte1ibgObCpQM5nT6IMia2l1ewH43ZxPJp23Idh1qBhPLbG4ib3bFwrorzne4AXCdOMYmhVRkRJRZA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

GitHub项目：https://github.com/karpathy/nanochat

全是社区自来水流量，这就是Karpathy在AI领域的号召力！

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

与早期的nanoGPT不同，nanochat不仅涵盖预训练，还囊括了从数据准备、预训练、中期训练（对话、多项选择题、工具使用）、SFT、RL微调到推理部署的 全流程 。

整个系统仅约 8000行 干净代码，启动一台GPU机器、运行一条脚本，4小时后你就能在网页界面与自己训练的「小ChatGPT」对话。

Karpathy将其称为LLM101n的 「压轴之作」 ，同时也可能成为未来研究基线和开源社区的实验平台。

让我来仔细看看如何仅仅用8000行来「克隆」ChatGPT：

- 使用全新的 Rust 实现训练分词器
- 在FineWeb上对TransformerLLM进行 预训练 ，评估多个指标下的CORE分数
- 在来自SmolTalk的用户-助手对话、多项选择题、工具使用数据上进行 中期训练
- 进行 SFT ，在世界知识多项选择题（ARC-E/C、MMLU）、数学（GSM8K）、代码（HumanEval）上评估聊天模型
- 使用「GRPO」在GSM8K上对模型进行 强化学习微调 （RL）
- 在带有KV缓存的引擎中实现高效推理，简单的预填充/解码，工具使用（在轻量级沙箱中的Python解释器），通过CLI或类ChatGPT的网页界面与其交互。
- 撰写一份单一的Markdown成绩单，总结并将整个过程游戏化。

项目全程花费低至约 100美元 （约在一台8XH100节点上训练4小时） 。

可以训练、克隆一个可以对话的小型ChatGPT，它能 创作故事/诗歌、回答简单问题 。

只需要训练约 12小时 即可超过GPT-2的核心指标 。

随着进一步扩展到约1000美元（约41.6小时训练），模型会迅速变得更连贯，能 解决简单的数学/代码问题并做多项选择题 。

训练 24小时 的模型（其FLOPs大致相当于GPT-3Small125M，约为GPT-3的1/1000）在MMLU上能进入40分段，在ARC-Easy上进入70分段，在GSM8K上进入20分段等。

总结一下就是：

- 100美元 →可训练出一个能写诗、回答基础问题的OpenAI同款「小型ChatGPT」；
- 1000美元 →达到近GPT-2以上的表现，可做基础推理与代码生成。

这个项目体现出他的核心理念：

「降低 LLM 研究与复现门槛，让每个人都能亲手训练自己的模型。」

这种民主化路线，与他在nanoGPT时期倡导的「从零实现Transformer」如出一辙。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

项目地址：https://github.com/karpathy/nanoGPT

Karpathy说他的目标是把完整的「强基线」栈整合到 一个 连贯、极简、可读、可修改、可最大化派生的 仓库 中。

nanochat将成为LLM101n（仍在开发中）的压轴项目。

Karpathy认为nanochat也有可能发展成一个研究工具或基准，就像之前的nanoGPT一样。

nanoGPT教你造大脑，nanochat教你造ChatGPT。

如果说nanoGPT是「Transformer源码教学项目」。

那么，nanochat则是「LLM生态系统微缩版」、OpenAI同款、你的专属AI。

二者关系可理解为「从神经网络基础到产品级对话系统」的两步闭环。

从 Vibe Coding 到 nanoGPT ，再到如今的 nanochat ，Karpathy不愧是 「AI教育者」 的最佳代言人。

这一「疯狂之作」并非狂想，而是Karpathy对AI开放、可学习、可复现理想的又一次践行。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**小型ChatGPT效果展示**

## Karpathy在WebUI部署了nanochat项目。

他还给出了「与价格为100美元、运行4小时的」nanochat的示例对话。

很……有趣！

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

下面这张图展示的是Karpathy在 **nanochat「$100速度跑」实验** （即只用一台GPU、约4小时训练出的ChatGPT 小模型）中生成的「成绩单」部分内容，说明模型规模、训练耗时、以及在各类标准评测上的性能。

- **Characters:** 333989 —— 代码总字符数。
- **Lines:** 8304 —— 大约 8300 行干净、注释良好的代码。
- **Files:** 44 —— 工程文件数量。
- **Tokens:** 约83,497 —— 代码中的token数（大致对应8万词）。
- **Dependencies:** 2004行uv.lock依赖清单 —— 表明依赖极少、项目结构轻。

这些数字展示了nanochat的「极简」精神：完整实现了 ChatGPT 的训练、微调与推理，却仍保持在 **8000行代码** 以内。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

参考资料：  

https://x.com/karpathy/status/1977755427569111362

https://github.com/karpathy/nanochat

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

继续滑动看下一个

新智元

向上滑动看下一个