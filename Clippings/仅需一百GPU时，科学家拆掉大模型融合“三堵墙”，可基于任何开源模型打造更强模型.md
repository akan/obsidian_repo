---
title: 仅需一百GPU时，科学家拆掉大模型融合“三堵墙”，可基于任何开源模型打造更强模型
source: https://mp.weixin.qq.com/s/W4e88jbwkHFCHq-0JQcwRw
author:
  - "[[DeepTech深科技]]"
published: 
created: 2025-06-12
description: 在过去一年间，香港理工大学计算机与数学科学学院副院长杨红霞教授和团队先后做出 InfiFusion、InfiG
tags:
  - InfiFusion
  - InfiGFusion
  - InfiFPO
  - 跨词表蒸馏
  - 推理链路兼容
  - logits-graph
  - 偏好融合
  - 多源概率融合
---
DeepTech深科技 [DeepTech深科技](https://mp.weixin.qq.com/s/)

*2025年06月12日 12:57* *天津*

![Image](https://mmbiz.qpic.cn/mmbiz_png/JJtKEey0hPa8j3FCXrceG0YtkfVp6VLW6ftRsOhRibTtxoeLibQaF4zAgicsw2X3F43SZQRtZajRiaJU0TQPOMu64Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/JJtKEey0hPYsqypL8FAjiczwXibzyBZiacICiazScMME2sA7mNFT6Inmia4Kp9nvqz9hqjN7wcICjumDJbnIkfL7uVA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

  

在过去一年间，香港理工大学计算机与数学科学学院副院长杨红霞教授和团队先后做出 InfiFusion、InfiGFusion 和 InfiFPO 等三项大模型成果，并把它们拆成三篇连续的论文，弥补了大模型融合领域的几块空白。

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/JJtKEey0hPbVzXTfxmTHrPJHVas6P04RlJBTvhyuKjuUctg63FvufJ49uPVJOlibdVpfAyAvnZZww2J4YiarrREw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

图 | 杨红霞（来源：https://www.polyu.edu.hk/comp/people/academic-staff/prof-yang-hongxia/）

  

其中：

  

InfiFusion 证明“只要抓住 logits 的最有概率质量的 K 个通道，并把它们做标准化，跨词表蒸馏就能于 160 H800 小时中完成，还能比原始 Phi-4 平均再高 4.84 分”。InfiFusion 的论文被顶会初审委员称为“让 cross-tokenizer 蒸馏真正进入生产力阶段的第一步”，因为它把一堆理论优雅却难落地的技巧变成了可复现的工程范式。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | InfiFusion 的相关论文配图（来源：arXiv）

  

InfiGFusion 把这种对齐从“概率分布”提升到“语义结构”，让不同“老师模型”的推理链路彼此兼容，像是给蒸馏过程装了一张骨骼图。InfiGFusion 论文中的“logits-graph”概念则得到图学习同行的青睐，同行认为这打破了“蒸馏只对齐软标签”的思维定势。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | InfiGFusion 的相关论文配图（来源：arXiv）

  

InfiFPO 则把多个“老师模型”的偏好揉进同一个概率空间，这样一来既能保留各自判断，又能使用三重稳态机制把输出收拢到安全区间。对于 InfiFPO 论文，几位专做大模型安全的评审给出了“偏好融合里的里程碑”这样的评价，原因是它第一次把“多老师意见”使用序列概率方式加以系统整合，而不是靠经验进行权重硬拼。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | InfiFPO 的相关论文配图（来源：arXiv）

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | 三位论文作者（来源：资料图）

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

拆掉大模型融合的“三堵墙”

  

该团队表示，业界早期对大模型融合的想象大多停留在“把几个模型的参数拼到一起”，这条路线在实践中很快就撞到了“三堵墙”：一是不同词表导致的蒸馏失配，二是多教师风格冲突带来的语义噪声，三是做完能力蒸馏之后模型的价值观和安全性依旧悬而未决。

  

为此，他们先用 InfiFusion 把第一堵“墙”拆掉，即在 Universal Logit Distillation 框架里加入 Top-K 选取与 Logits 标准化，用极低算力就把跨词表蒸馏这件事做得既稳又狠。

  

接着他们发现，光对齐概率分布还不够，多老师各自的“句法骨架”仍然会互相打架，于是他们便打造了 InfiGFusion，即把 logits 看成一张图，用 Gromov-Wasserstein 距离做结构级对齐，由此解决了第二堵“墙”。

  

等到能力与结构都已得到良好平衡，最后剩下的“灵魂工程”便是偏好对齐，他们将其交给 InfiFPO，InfiFPO 在基于人类反馈的强化学习（RLHF，Reinforcement Learning from Human Feedback）框架里改用多源概率融合，再配合长度归一化与概率截断，让安全性能真正地实现落地。

  

“可以说，三篇论文一气呵成，就是想把‘能力、结构、价值’这三根支柱一次性打牢。”研究团队说。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

从“巩固地基”到“修正航向”

  

有人好奇，为什么要按照“蒸馏-结构-偏好”这个顺序来发布论文，而不是一次性打包？对此，该团队表示，这其实关乎“巩固地基”和“修正航向”的节奏。

  

最开始杨红霞团队只有一个目标：即把 Qwen-Coder、Qwen-Instruct、Mistral-Small 这三位风格各异的“老师模型”的优点塞进 Phi-4 这个枢纽模型里。

  

但是，在开展第一次实验时就暴露出了词表冲突问题：“老师模型”们经常把同一个中文成语拆成截然不同的 token，还动不动用上各自的罕见词尾。

  

于是他们决定先专注打造“地基”，把跨词表蒸馏做深做透。

  

在 InfiFusion 里，他们把 Top-K 选取 的 K 扫了一整遍，发现 K = 10 时能够捕获几乎全部概率质量，同时能把梯度噪声压到最低。

  

又因为需要的最佳蒸馏温度，于是他们在蒸馏前针对 logits 做 Z-Score 标准化，让“学生模型”只看相对排序，从而不会受到绝对幅度干扰。“这些技术细节听起来很琐碎，却能让蒸馏从‘跑得通’进化到‘跑得稳’。”该团队表示。

  

当能力“地基”夯实之后，他们马上遇到第二个问题：“老师模型”们在结构层面仍然各走各路。比如在一道多跳推理题上，某个“老师模型”先做集合筛选再算数值，另一个“老师模型”却反过来先算数再过滤。概率分布虽然对齐了，可是解题轨迹却在彼此打架。这时，单纯地对齐 logits 已经不起作用，于是他们将 InfiGFusion 把 logits 挂在图结构上，使用 Gromov-Wasserstein 距离去匹配“谁先谁后、谁依赖谁”，让“学生模型”在思维链上，而不是在单点概率上学会折中。

  

当能力与结构都已被整合好，他们尝试将模型进行进一步训练。但是，目前偏好对齐阶段的模型融合技术存在空白，不论是 RLHF 或是 DPO，都只聚焦于利用偏好数据优化模型输出，而忽略了与此同时融合多个“教师模型”的可能性。

  

为了解决这一问题，他们在 InfiFPO 之中引入多源概率融合，让不同“老师模型”在概率空间里先做充分辩论，再由长度归一化和最大间隔稳态把输出拉回到安全地带，最终把 Phi-4 的综合分从 79.95 提到 83.33。

  

“换句话说，我们并不是把三篇论文拆给评审看热闹，而是每一阶段都在解决上一阶段暴露的新瓶颈。期间，不仅顺序没有乱，而且也无需一次打包，因为每一步的实战反馈都会反哺下一个工作。”该团队表示。

  

另据他们回忆，在敲定蒸馏损失函数那一晚，为了找到一条既强大又落地的路线，他们前后试了 20 多种方案：从带温度系数的 KL 散度（KL，Kullback-Leibler divergence），到各种融合 Optimal Transport 的 Wasserstein-KL  组合等等。这些“花哨”方法在小模型实验里确实漂亮，可是一旦放到 14B 乃至更大的真实场景，就立刻暴露出显存与时间的双重瓶颈，比如显存飙升以及训练速度普遍下降三成以上。

  

反复权衡之后，杨红霞团队回到看似朴素的 logits 蒸馏损失（ULD loss，Universal Logit Distillation loss）方法。它不像 OT-based 方法那样华丽，但却能在不额外占用显存的前提下保持梯度稳定。和传统 KL 相比，ULD loss 的收敛更快，并能让整体训练速度提升了将近三成。

  

那天凌晨，当最后一条实验曲线稳稳压在基线上，他们才真正确信：这才是能够扩展到 14B 级别，并且能够经得起工程实践检验的融合方案。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

仅用 20 小时把 Phi-4 打造成“融合版”，能让中小企业也能快速复制大模型能力

  

谈及实际收益，该团队表示在他们的内部复现实验里，同一台英伟达 8×H800 服务器上，只用 20 小时就能把 Phi-4 打造成“融合版”。

  

在 GSM8K 与 MATH 这两个数学任务的平均正确率上，相比单跑 InfiFusion，“融合版”Phi-4 的正确率还能继续往上提高奖近三个百分点；在代码生成上，“融合版”Phi-4 的通过率高出大约两个百分点；在多步指令跟随里，“融合版”Phi-4 的拒答率从原来的将近一半跌到不到十分之一。

  

更重要的是，算力成本从动辄上百万 GPU 时长降到百级别 GPU 时长。“这让我们这样的中小团队第一次有机会把‘专家团’塞进一张 80GB 显存里直接推理。”该团队表示。

  

谈及落地场景，该团队表示他们目前看到两条呼声最高的路线。第一条路线来自金融、医疗、法律等高门槛行业，这些行业有着由保密数据训练的专长模型，但又迫切需要一个能够“全科应答”的统一接口。而此次三个工作的“三步融合”刚好把能力、结构和价值做了打包，无需共享私有权重就能合成强大模型。第二条路线来自中小企业，这类企业的算力资源和标注资源有限，但也希望能够快速复制大模型能力。而使用该团队的流水线，只需把想要的开源“老师模型”和少量自有标注数据喂进来，就能拿到一个“定制专家团”。

  

如果说目前的“工作三部曲”解决了“把多路文本老师模型揉成一个通才模型”，那么下一步杨红霞团队想拓展到图像和语音，让不同模态的专家模型也能走同样的流水线。与此同时，他们正在尝试把蒸馏过程进一步压缩到张量级别的“即插即融”，把推理成本做到原模型的七成以下，让手机端也能吃得下融合后的轻量版模型。

  

那么，该团队会不会把“融合”本身做成产品？这一问题的答案是肯定的。目前，杨红霞团队已经孵化了一套“Fuse-as-a-Service”云端中间件，用户只需要上传模型和少量域内数据，系统就能自动跑完三步流水并返回融合后的轻量模型。“眼下，我们在和三家垂直行业伙伴做 PoC，希望在明年把 PI 公测上线。”其对 DeepTech 表示。

  

展望未来，他们表示大模型的发展愿景或许并不是训练出一个无所不能的“巨无霸”，而是如何把成千上万个专才模型“握成一个拳头”。“我们的 InfiFusion 这一系列工作只是抬起了第一块砖，而真正的无限融合还在前方。”该团队说。

  

参考资料：

1.InfiFusion: A Unified Framework for Enhanced Cross-Model Reasoning via LLM Fusion https://arxiv.org/abs/2501.02795

2.InfiGFusion: Graph-on-Logits Distillation via Efficient Gromov-Wasserstein for Model Fusion https://arxiv.org/abs/2505.13893

3.InfiFPO: Implicit Model Fusion via Preference Optimization in Large Language Models https://arxiv.org/abs/2505.13878

https://www.polyu.edu.hk/comp/people/academic-staff/prof-yang-hongxia/

  

运营/排版：刘雅坤、何晨龙

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

01/ [科学家提出达尔文哥德尔机器，让AI通过重写自身代码来改进自己，可将编码能力提高30%](https://mp.weixin.qq.com/s?__biz=MzA3NTIyODUzNA==&mid=2649774152&idx=1&sn=4b5c8e1940c804fa67ee92064b4a420a&scene=21#wechat_redirect)

  

02/ [天大团队研发全新DNA存储系统，实现5.8倍测序深度下的图像恢复](https://mp.weixin.qq.com/s?__biz=MzA3NTIyODUzNA==&mid=2649774116&idx=1&sn=e01c36dd0078af630db56bd4aab54603&scene=21#wechat_redirect)  

  

03/ [苹果新论文分析DeepSeek-R1遇到复杂度阈值后准确率崩溃问题，Gary Marcus周末写长文声援](https://mp.weixin.qq.com/s?__biz=MzA3NTIyODUzNA==&mid=2649774033&idx=1&sn=b964f2eb82fcd121b20ded345d17de48&scene=21#wechat_redirect)

  

04/ [哈佛团队发现多巴胺能神经元新机制，大自然亿万年优化的神经算法，或是突破AI瓶颈的钥匙](https://mp.weixin.qq.com/s?__biz=MzA3NTIyODUzNA==&mid=2649774002&idx=1&sn=40b2f831fece02e73ca8ce9bd5e2265f&scene=21#wechat_redirect)

  

05/ [李飞飞等研发“嫁接”模型架构编辑法，让预训练模型成为研究新架构的“脚手架”](https://mp.weixin.qq.com/s?__biz=MzA3NTIyODUzNA==&mid=2649773972&idx=1&sn=e9293d42374eae096dba16ee4f4a0964&scene=21#wechat_redirect)