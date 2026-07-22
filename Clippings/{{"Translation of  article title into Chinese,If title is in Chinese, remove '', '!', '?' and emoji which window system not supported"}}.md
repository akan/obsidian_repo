---
title: "深度爆料：训练一个层就能吊打全参数？大模型RL后训练惊现“权力中心”！"
source: "https://mp.weixin.qq.com/s/Kwg2tK63GAzpBOxse-pQgA"
author:
  - "[[fireThunderbolt]]"
published:
created: 2026-07-22
description: "做RL训练一定要全参数更新吗？研究发现，RL带来的增益并非均匀分布，而是高度集中在模型的“中腰部”，仅训练中间层即可比肩甚至超越全参数效果。大模型的进化，或许真的存在一个“权力中心”。本文将带你深入拆解这一发现，寻找模型里的“最强打工人”。"
tags:
  - "{{\"3+ **words** join with '"
  - "'"
  - "summary of the article content"
  - "translated to Chinese\"}}"
abstract: "{{\"One-sentence summary of the article content,translated to Chinese\"}}"
---
fireThunderbolt 大模型视界 *2026年7月8日 08:10*

大家好，我是视界君。

DeepSeek R1 等模型的崛起让大家见识到了强化学习（RL）在大模型推理能力上的奇迹。但你有没有想过： **为了获得这些提升，我们真的需要更新模型里的每一行参数吗？**

来自明尼苏达大学、北京大学和亚马逊的研究团队刚刚发布的一篇预印论文《IS ONE LAYER ENOUGH? TRAINING A SINGLE TRANSFORMER LAYER CAN MATCH FULL-PARAMETER RL TRAINING》，给出了一个颠覆认知的答案：

> **“在很多情况下，训练一个 Transformer 层就足以恢复全参数 RL 训练的大部分增益，甚至还能反超！”**

---

### 1\. 颠覆直觉：寻找模型里的“最强打工人”

传统的 RL 后训练（如 GRPO）通常会更新模型的所有参数。大家默认模型每一层都在为最终的进步出汗出力。

但作者引入了一个特殊的指标： **层贡献度（Layer Contribution）** 。他们把模型每一层单独拎出来训练，看看这一层“孤军奋战”能达到全参数训练效果的百分之几。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/nErboxohNDOP4S9U5ic6OVIBRKzggxbhTSKJyictpy2ic2aTibRIWeQ7q68micetiaHbgyLDuZxZ0js1xkxmtGqibppic9SKUoL2PNaEJTW01GN2QSI/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

a) 跨多个模型系列和规模的单个层贡献显示，中间层存在一个一致的峰值。(b) 单层训练和引导策略通常优于标准的完全参数 RL 训练。

结果发现，模型的表现分布极其不均：

- **“工作中心”在中间** ：贡献度最高的层往往集中在模型深度的 **40%–60%** 处。
- **两头在“摸鱼”** ：靠近输入（底层）和输出（顶层）的层，对 RL 带来的逻辑提升贡献极小。

在 Qwen3-1.7B 模型上，第 10 层的贡献度甚至达到了 **114%** ——这意味着只练这一层，比全参数一起练效果还好！

> “高贡献层始终集中在 Transformer 栈的中间，而靠近输入和输出端的层贡献显著较低。”

---

### 2\. 这个规律有多稳？横跨数学、代码与智能体

你可能会问：这会不会只是某个模型的巧合？

作者进行了极其严苛的交叉验证，测试了：

- **7 个模型** ：从 1.5B 到 8B，包括 Qwen3、Qwen2.5 甚至 DeepSeek 的蒸馏版本。
- **3 种算法** ：GRPO、GiGPO、Dr. GRPO。
- **3 大领域** ：数学竞赛、代码生成、机器人任务（ALFWorld）。
![Image](https://mmbiz.qpic.cn/mmbiz_png/nErboxohNDPftpmBnLU1tAhiaibYsxaRBibGUyibjOpuGR2ZcBeqFL9nXvuicKgick8xKNN5Jlgyv70J5GlTw06E8jicibvrj6yqtfbFkmicRl0YwGRw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

不同规模Qwen3模型的层贡献曲线。数学贡献（蓝色）和整体能力贡献（黑色）均在中间层达到峰值。

结果显示： **这种“中间层最重要”的规律依然稳如泰山。** 即使任务从算奥数题变成了在虚拟环境里“开关灯”，模型最关键的逻辑进化依然发生在中间。

---

### 3\. 实战指南：与其全军出击，不如精准爆破

既然知道了谁是“最强打工人”，那训练策略也得改。研究团队提出了几种更聪明的玩法：

1. **分层学习率** ：给中间的高贡献层分配更大的学习率，给两头“摸鱼”的层小学习率。
2. **选择性训练** ：直接冻结其他层，只练中间那几层。
3. **盲选盲猜（启发式策略）** ：如果你懒得做实验测贡献度，那就直接选模型正中间的几层练，效果往往也比全参数训练好。

在 Qwen3-8B 上，只练贡献度前 10 的层，数学准确率达到了 **69.1%** ，而全参数训练只有 **66.4%** 。

---

### 4\. 为什么“合力”反而不如“单练”？

这是一个有趣的科学发现。研究人员发现：

- **多样性奇迹** ：虽然每一层单独练都很强，但它们解决的问题其实不一样。第 10 层擅长的题目，第 13 层可能不擅长。
- **投票更强大** ：如果你把 7 个不同层训练出来的模型拿来搞“多数投票”，其效果远超全参数模型。

这说明，不同层在 RL 过程中其实在学习不同的“思维插件”。全参数训练时，这些插件可能会互相干扰（梯度稀释），而单层训练反而能保持某种“纯粹性”。

---

### 总结

这篇论文为我们揭示了大模型 RL 进化过程中一种未被发现的 **结构性属性** 。

它告诉我们： **逻辑能力的进化是有“物理坐标”的。** 这对开发者来说简直是福音——这意味着我们可能只需要极小的显存和算力，盯着那几个关键层“猛练”，就能让小模型爆发出媲美大模型的推理之光。

以后再搞 RL 训练，别再傻傻地全量更新了，看看你家模型的“腰部”力量够不够强吧！

**论文链接：** https://arxiv.org/abs/2607.01232

---

今日荐文

- [DSpark：DeepSeek 如何让大模型推理提速 85%？](https://mp.weixin.qq.com/s?__biz=MzYzNjI4NjMzNw==&mid=2247484639&idx=1&sn=ed623aa736df223b5369082938d6c5e2&poc_token=HGM5Rmqj0ZP3BsKvzgaAb8az8bK0c60mVvEpEWbr&scene=21#wechat_redirect)
- [Codex 插件进了 Claude Code：AI 编程开始从“单模型冲锋”变成“多模型协作”](https://mp.weixin.qq.com/s?__biz=MzYzNjI4NjMzNw==&mid=2247484639&idx=1&sn=ed623aa736df223b5369082938d6c5e2&poc_token=HGM5Rmqj0ZP3BsKvzgaAb8az8bK0c60mVvEpEWbr&scene=21#wechat_redirect)
- [Agent记忆框架选型：自己搭，还是用开源](https://mp.weixin.qq.com/s?__biz=MzYzNjI4NjMzNw==&mid=2247484601&idx=1&sn=59d88cbee96ebda011d604bea4755190&scene=21#wechat_redirect)
- [AIHOT 更新了一版，这次它更像一个真正能用的信息工作台](https://mp.weixin.qq.com/s?__biz=MzYzNjI4NjMzNw==&mid=2247484572&idx=1&sn=07daeef1bb5e831b8e5a722d01234752&scene=21#wechat_redirect)
- [谷歌DeepMind最新报告：AGI之后，人类将面对什么？](https://mp.weixin.qq.com/s?__biz=MzYzNjI4NjMzNw==&mid=2247484589&idx=1&sn=156a60f81a5020c5bd0bf8e92045fd68&scene=21#wechat_redirect)
- [史上最大IPO，SpaceX凭什么估值这么大](https://mp.weixin.qq.com/s?__biz=MzYzNjI4NjMzNw==&mid=2247484578&idx=1&sn=36fa72ae247de90fa6289292f1f4ad2c&scene=21#wechat_redirect)
- [任何文件都可转 Markdown：一个值得收藏的 Agent 开发工具](https://mp.weixin.qq.com/s?__biz=MzYzNjI4NjMzNw==&mid=2247484558&idx=1&sn=3270c1ffb80f5621593d3dc224600d21&scene=21#wechat_redirect)
- [Claude 4.8 发布之后，Anthropic 真正想卖的可能不是模型](https://mp.weixin.qq.com/s?__biz=MzYzNjI4NjMzNw==&mid=2247484540&idx=1&sn=a4db0512599622c88ae93f0ae5ae4f25&scene=21#wechat_redirect)
- [智能体开发实战｜从零开始构建 Claude Code（五）：Skill 机制与按需加载领域知识](https://mp.weixin.qq.com/s?__biz=MzYzNjI4NjMzNw==&mid=2247484530&idx=1&sn=5d209473eb22730242fd8b0537b30e5f&scene=21#wechat_redirect)
- [我最近是怎么用 Codex 的：把它真正用顺手的 6 个方法](https://mp.weixin.qq.com/s?__biz=MzYzNjI4NjMzNw==&mid=2247484511&idx=1&sn=6073a346a080a25075bb88beec8f5184&scene=21#wechat_redirect)
- [大多数公司根本没有为 AI 做好准备](https://mp.weixin.qq.com/s?__biz=MzYzNjI4NjMzNw==&mid=2247484490&idx=1&sn=398ba631ce92db887ec7d68eaad679e8&scene=21#wechat_redirect)
- [Claude 越来越能干活，Anthropic 先解决的却是“它最多能闯多大祸”](https://mp.weixin.qq.com/s?__biz=MzYzNjI4NjMzNw==&mid=2247484545&idx=1&sn=9438979ec100444648fabf54204cc7ac&scene=21#wechat_redirect)

*如果你对大模型的前沿技术感兴趣，欢迎关注“大模型视界”，一起学习更多AI知识！*

**微信扫一扫赞赏作者**

优秀论文分享 · 目录