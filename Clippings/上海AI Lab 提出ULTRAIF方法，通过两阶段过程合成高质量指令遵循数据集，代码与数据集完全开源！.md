---
title: "上海AI Lab 提出ULTRAIF方法，通过两阶段过程合成高质量指令遵循数据集，代码与数据集完全开源！"
source: "https://juejin.cn/post/7509801883347877915"
author:
  - "[[依然易冷]]"
published: 2025-05-30
created: 2025-05-30
description: "论文名称：UltraIF: Advancing Instruction Following from the Wild；机构：上海AI Lab + 北大 + 清华"
tags:
  - "clippings"
---
![横幅](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/2fd8e96805614492bb2076e3eca5f7a5~tplv-8jisjyls3a-2:0:0:q75.image)

[依然易冷](https://juejin.cn/user/1906998709326873/posts)

8 阅读6分钟

专栏：

AI Data Engineering

![](https://p26-piu.byteimg.com/tos-cn-i-8jisjyls3a/0d6404b693834ec1a4d258177bb8baf2~tplv-8jisjyls3a-2:0:0:q75.image)

> 论文名称：UltraIF: Advancing Instruction Following from the Wild
> 
> 论文链接： [arxiv.org/abs/2502.04…](https://link.juejin.cn/?target=https%3A%2F%2Farxiv.org%2Fabs%2F2502.04153 "https://arxiv.org/abs/2502.04153")
> 
> 机构：上海AI Lab + 北大 + 清华
> 
> Github代码链接： [github.com/kkk-an/Ultr…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fkkk-an%2FUltraIF "https://github.com/kkk-an/UltraIF")
> 
> 数据集链接： [huggingface.co/collections…](https://link.juejin.cn/?target=https%3A%2F%2Fhuggingface.co%2Fcollections%2Fbambisheng%2Fultraif-series-67ee75a6042e8ba3e97d0b25 "https://huggingface.co/collections/bambisheng/ultraif-series-67ee75a6042e8ba3e97d0b25")
> 
> 个人文章索引：【LLM Instruction Following Data】论文分享No.17：ULTRAIF

## 简介

如何构造有效的高质量指令遵循数据来提升LLM在这方面的能力，在业界是一个非常重要的研究方向，但之前很少有工作详细介绍并开源指令遵循数据的构造方法。

本文就提出了ULTRAIF方法，通过两阶段过程合成高质量指令遵循数据集，并通过实验证明了其数据构造框架的有效性，值得一看。

## Data Pipeline（ULTRAIF）

### 框架概述

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/12ed840cc6c743458a7d08db979cdc7f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5L6d54S25piT5Ya3:q75.awebp?rk3s=f64ab15b&x-expires=1749171949&x-signature=OzpLhU48wliBKrxBlqMnp7hK%2FBo%3D)

图2展示了ULTRAIF方法里两个关键流程：UltraComposer和Generate-then-Evaluate ，具体如下：

- **UltraComposer部分**

**① 指令分解与评估问题生成（图a）** ：比如有个指令“用莎士比亚的风格，给我推荐十本中国书籍”。这一步会把它拆解成“简化指令”和“约束条件” 。简化指令就是“给我推荐十本中国书籍” ，约束条件是“用莎士比亚的风格” 。同时还会生成一个评估问题，像“回答是用莎士比亚的风格写的吗？” 。

**② UltraComposer训练（图b）** ：把前面得到的简化指令作为输入，让UltraComposer这个模型去学习输出原始指令和对应的评估问题 ，通过这样的训练让它掌握这种转换能力。

- **Generate-then-Evaluate部分**

**① 指令生成（图c）** ：从ShareGPT等来源获取基础指令（Vanilla Ins. ），然后用训练好的UltraComposer对这些基础指令进行加工处理，生成新的指令。

**② 响应评估（图d）** ：让LLM根据生成的指令给出回答（Responses） ，之后再用LLM对这些回答进行评估，判断回答是否符合要求，符合的就选中（Chosen） ，不符合的就拒绝（Rejected） 。

### UltraComposer

UltraComposer这一步主要是为生成多样复杂且回答正确的指令而提出的专门模型 ，还是以图2里面莎士比亚的例子作说明，构建分三步：

- **指令分解（Instruction Decomposition）**

比如一开始收到一个指令 “用莎士比亚的风格，给我推荐十本中国书籍” 。UltraComposer 要做的第一步是把这个指令拆解。就像把一个大任务拆成小任务，它会把这个指令拆成 “简化指令” 和 “约束条件” 。简化指令就是 “给我推荐十本中国书籍” ，这是最核心的任务；约束条件是 “用莎士比亚的风格” ，这是对完成任务的要求 。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5f4ed00eeff84cba8fa18d57d2b630a2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5L6d54S25piT5Ya3:q75.awebp?rk3s=f64ab15b&x-expires=1749171949&x-signature=0pc83IoAu3Yar9xO1KjUfgsCa%2FM%3D)

- **评估问题生成（Evaluation Question Generation）**

然后，它还要生成一个评估问题。就好比你布置任务后，得有个标准检查做得对不对。对于上面这个例子，评估问题就是 “回答是用莎士比亚的风格写的吗？” 。

- **UltraComposer训练（UltraComposer Training）**

最后，通过这些拆解后的东西去训练 UltraComposer 这个模型，让它学会看到 “给我推荐十本中国书籍” 这样的简化指令，就能输出原始指令 “用莎士比亚的风格，给我推荐十本中国书籍” ，以及对应的评估问题 “回答是用莎士比亚的风格写的吗？” 。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/daba4e622f094c94859949fc9cda3770~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5L6d54S25piT5Ya3:q75.awebp?rk3s=f64ab15b&x-expires=1749171949&x-signature=lwTJOqk64R3tHSb6PJQwiiHfuPA%3D)

### Generate-then-Evaluate

Generate-then-Evaluate是ULTRAIF中高效生成高质量指令遵循数据的过程，含指令生成和响应评估两部分：

- **指令生成（Instrucion Generation）**

先从已有的数据集里找一些像 “给我推荐十本中国书籍” 这样的基础指令 。然后让 UltraComposer 上场，给这些基础指令加约束条件，比如加上 “用莎士比亚的风格” ，把简单指令变成更复杂的指令，同时还会生成评估问题 。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6dfea37e05a1409ea4e3abc4ed959381~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5L6d54S25piT5Ya3:q75.awebp?rk3s=f64ab15b&x-expires=1749171949&x-signature=Ar%2F3n%2F7%2FIFNDQr4MJam94cOjWE4%3D)

- **响应评估（Response Evaluation）**

接着，让LLM根据加了约束条件后的指令，像 “用莎士比亚的风格，给我推荐十本中国书籍” ，给出好几个回答。再用之前生成的评估问题 “回答是用莎士比亚的风格写的吗？” ，去检查这些回答。符合要求的回答就留下，不符合的就扔掉。这样就能得到高质量的指令遵循QA对数据了 。

## 训练策略

### SFT

对数据集  进行标准的SFT，其中  是增强后的指令，  是相应的选中回答。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/2d34e7b88ff64f05893f77f954c8f361~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5L6d54S25piT5Ya3:q75.awebp?rk3s=f64ab15b&x-expires=1749171949&x-signature=dRk8HQjSoWpPG0T20L5NmCL8hGw%3D)

### SFT + Iterative Online DPO

由于ULTRAIF有评估问题，便于质量控制，所以适合应用直接偏好优化（DPO）来优化微调后的模型。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/091251a9cf8b4fe195567730cd1f2b32~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5L6d54S25piT5Ya3:q75.awebp?rk3s=f64ab15b&x-expires=1749171949&x-signature=LM4IAsfkdHAIGHbfJYYWYVyb%2BCg%3D)

## 实验结果

### 数据集

**① ShareGPT：** 含有大量用户与 GPT-4 的聊天记录，研究人员从中分解出约 200K 数据对，这些数据主要用于训练 UltraComposer。

**② OpenHermes2.5：** 大规模、多样化且高质量的合成指令和聊天样本集。

**③ No Robots：** 专业人员标注的高质量指令和演示数据集

期间生成评估问题所用的模型是LLaMA-3.1-70B-Instruct 。

### 训练设置

先对 LLaMA-3.1-8B-Instruct 进行微调以构建 UltraComposer。之后探索两种设置来实施训练策略：

**① Strong-to-Weak：** 即从较大模型（LLaMA-3.1-70B-Instruct）向较小模型（LLaMA-3.1-8B-Base）进行知识蒸馏，用大模型做响应生成和评估，训练小模型。

**② Self-Alignment：** 用 LLaMA-3.1-8B-Instruct 替换监督模型来训练 Base 模型。

### 评估基准

在五个指令遵循基准测试上评估 ULTRAIF，包括 IFEval、Multi-IF、InfoBench、FollowBench 和 LiveBench。

除了指令跟随基准测试，还进一步测试 ULTRAIF 在数学、推理、编码和一般交互能力等方面的通用能力。

### 关键结论

①【表1】在五个指令跟随基准测试中， **ULTRAIF在Strong-to-Weak和Self-Alignment设置下，通过不同训练策略（SFT、迭代DPO等）均展现出优异性能，超过先前方法** ，迭代DPO能有效提升性能，且扩大训练数据规模可使ULTRAIF达到新的里程碑，逼近LLaMA-3.1-8B-Instruct的性能。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a3692779c68c4e17be342b6682d1745f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5L6d54S25piT5Ya3:q75.awebp?rk3s=f64ab15b&x-expires=1749171949&x-signature=lPuCKLGwhCe2w29E3hyzxEQUSXI%3D)

②【表2】在编码、推理、数学和对话四个通用领域的评估中， **ULTRAIF虽在数学领域表现略逊于AutoIF，但在编码和对话任务上有显著提升** ，扩大训练数据规模和经过DPO阶段能提升其性能，在LiveBench基准测试和ArenaHard对话任务上优势明显，表明该方法有助于开发更通用、更具多任务处理能力的模型。

![](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/be0a4dcd159246c7b2d55d0d415d7f8d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5L6d54S25piT5Ya3:q75.awebp?rk3s=f64ab15b&x-expires=1749171949&x-signature=iJ0Zj3dKgvCVsH54XXZJj1HZH3o%3D)

论文中还有更多实验结果，不一一赘述了，主要看数据的构建思路。

## 总结

这篇文章的构造思路还是值得一试的，但如果要应用到企业特定领域内，还需要做不少改造，比如指令遵循的数据源就得从线上选了，以及一个问题可能不止有一个简化指令以及评估问题，怎么提升这一步的效果是最关键的。

标签：

话题：

[我的技术写作成长之路](https://juejin.cn/theme/detail/7215101716402798596?contentType=1)

本文收录于以下专栏

![cover](https://p26-juejin-sign.byteimg.com/tos-cn-i-k3u1fbpfcp/0a9497db998245dc9ebb84726902440e~tplv-k3u1fbpfcp-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5L6d54S25piT5Ya3:q75.awebp?rk3s=f64ab15b&x-expires=1749181674&x-signature=vW6kJWWGT07KY2fNRhKlwwoQbzw%3D)

AI Data Engineering

专栏目录

聚焦大模型训练期间，如何构造数据的相关工作

0 订阅

·

4 篇文章

上一篇

【LLM CoT Data】论文分享No.7：LLM-Adaptive Difficulty CoT

下一篇

【香港科大+华为诺亚方舟】Web Reconstruction方法：从原始网页文档合成高质量指令遵循数据，效果显著，代码开源

评论 0

![avatar](https://p6-passport.byteacctimg.com/img/user-avatar/596dd11ec1eb86109467f46963b9da45~100x100.awebp)

0 / 1000

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

![avatar](https://p6-passport.byteacctimg.com/img/user-avatar/412dd8489c2dca205f92335fc9d2ebf8~70x70.awebp)

为你推荐

- [智源研究院发布千万级多模态指令数据集Infinity-MM：驱动开源模型迈向SOTA性能](https://juejin.cn/post/7431371926064300032 "智源研究院发布千万级多模态指令数据集Infinity-MM：驱动开源模型迈向SOTA性能")
		[为解决以上问题，进一步提升开源模型的性能，2024年10月25日，智源研究院发布并开源了千万级多模态指令数据集Infinity-MM。](https://juejin.cn/post/7431371926064300032)
	- [
		智源研究院
		](https://juejin.cn/user/3538691702925012)
	- 71
	- 点赞
	- 评论
- [2024 Meet AI Compiler 北京线下聚会定档！千万级指令微调数据集 InfinityInstruct 开源](https://juejin.cn/post/7381649927145685032 "2024 Meet AI Compiler 北京线下聚会定档！千万级指令微调数据集 InfinityInstruct 开源")
		[高质量的指令数据是训练和优化大语言模型不可或缺的资源，是提升模型性能的基石。近日，北京智源人工智能研究院发布了千万级高质量指令微调数据集开源项目 InfinityInstruct ，包括基于开源数据集](https://juejin.cn/post/7381649927145685032)
	- [
		神经星星
		](https://juejin.cn/user/1714893869300104)
	- 33
	- 点赞
	- 评论
	![2024 Meet AI Compiler 北京线下聚会定档！千万级指令微调数据集 InfinityInstruct 开源](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66d4dddd87e94d2096cf860435c7cb1d~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis#?w=2700&h=1149&s=1039045&e=png&b=fddee6)
- [国产ChatGPT「套壳」的秘密，现在被找到了](https://juejin.cn/post/7238921093553438779 "国产ChatGPT「套壳」的秘密，现在被找到了")
		[衡宇 发自 凹非寺 量子位 | 公众号 QbitAI “套壳ChatGPT！”“套皮Stable Diffusion！”“实则抄袭！”…… 外界对国产大模型产生质疑已经不是一次两次了。 业内人士对这个](https://juejin.cn/post/7238921093553438779)
	- [
		量子位
		](https://juejin.cn/user/2858385963484488)
	- 3.5k
	- 22
	- 10
- [高质量数据不够用，合成数据是打开 AGI 大门的金钥匙吗？](https://juejin.cn/post/7384347818384850984 "高质量数据不够用，合成数据是打开 AGI 大门的金钥匙吗？")
		[本期文章探讨了一种经实践可行的解决方案 —— 合成数据（Synthetic Data）。如 AlphaZero、Sora 等已初步证实了合成数据具备的巨大潜力。对于语言模型来说，虽然要生成高质量的合成](https://juejin.cn/post/7384347818384850984)
	- [
		Baihai\_IDP
		](https://juejin.cn/user/3123071228582343)
	- 333
	- 3
	- 评论
	![高质量数据不够用，合成数据是打开 AGI 大门的金钥匙吗？](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbaa48d91bc44afbae95996bfe561d5b~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis#?w=900&h=383&s=85580&e=png&b=3b57e6)
- [1000多个智能体组成，AI社会模拟器MATRIX-Gen助力大模型自我进化](https://juejin.cn/post/7436993444646158372 "1000多个智能体组成，AI社会模拟器MATRIX-Gen助力大模型自我进化")
		[随着大语言模型（LLMs）在处理复杂任务中的广泛应用，高质量数据的获取变得尤为关键。为了确保模型能够准确理解并执行用户指令，模型必须依赖大量真实且多样化的数据进行后训练。](https://juejin.cn/post/7436993444646158372)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 118
	- 点赞
	- 评论
- [IBM 入局：开源自对齐方法训练「单峰骆驼」，比GPT4更值得信赖](https://juejin.cn/post/7230339089617518650 "IBM 入局：开源自对齐方法训练「单峰骆驼」，比GPT4更值得信赖")
		[机器之心报道 编辑：Panda 大语言模型（LLM）除了性能强大之外，可靠且符合道德伦理也至关重要。为了确保大语言模型实现这些目标，需要它们的输出与人类的意图保持一致。我们通常把这个任务称为对齐（al](https://juejin.cn/post/7230339089617518650)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 1.0k
	- 2
	- 评论
- [倒计时 3 天！立即预约苹果 WWDC24 直播；RLAIF-V 大规模多模态偏好数据集上线，有效减少不同 MLLMs 幻觉现象](https://juejin.cn/post/7377290806728327203 "倒计时 3 天！立即预约苹果 WWDC24 直播；RLAIF-V 大规模多模态偏好数据集上线，有效减少不同 MLLMs 幻觉现象")
		[6 月 3 日-6 月 7 日，hyper.ai 官网更新速览： 优质公共数据集：10 个 优质教程精选：2 个 社区文章精选：3 篇 热门百科词条：5 条 6-7 月截稿顶会：5 个 访问官网：hy](https://juejin.cn/post/7377290806728327203)
	- [
		神经星星
		](https://juejin.cn/user/1714893869300104)
	- 41
	- 点赞
	- 评论
	![倒计时 3 天！立即预约苹果 WWDC24 直播；RLAIF-V 大规模多模态偏好数据集上线，有效减少不同 MLLMs 幻觉现象](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3aa6ec394bb546f2abca5a1050cf991a~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis#?w=2700&h=1149&s=1041042&e=png&b=fddee6)
- [SynthID 隐形水印抢先体验！让 AI 生成内容更可控；超大规模音频字幕数据集已上线，含 600 万个音频文件](https://juejin.cn/post/7439986240501415946 "SynthID 隐形水印抢先体验！让 AI 生成内容更可控；超大规模音频字幕数据集已上线，含 600 万个音频文件")
		[在 AI 生成内容日益普及的时代下，如何快速分辨内容是人工创作还是 AI 生成已成为热门话题。这不仅涉及新闻真实性、版权保护，还与网络安全密切相关。 近期，Google DeepMind 推出了 Sy](https://juejin.cn/post/7439986240501415946)
	- [
		神经星星
		](https://juejin.cn/user/1714893869300104)
	- 102
	- 点赞
	- 评论
	![SynthID 隐形水印抢先体验！让 AI 生成内容更可控；超大规模音频字幕数据集已上线，含 600 万个音频文件](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/2fedc9de15724546bba772640b54a57f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56We57uP5pif5pif:q75.awebp?rk3s=f64ab15b&x-expires=1749181674&x-signature=yQHK2ulwMQiuRXJr1G6x5o%2FOCRk%3D)
- [AI自给自足！用合成数据做训练，效果比真实数据还好丨ICLR 2023](https://juejin.cn/post/7245166444559335482 "AI自给自足！用合成数据做训练，效果比真实数据还好丨ICLR 2023")
		[Brilliant 投稿 量子位 | 公众号 QbitAIAI生成的图像太逼真，为什么不能拿来训练AI呢？ 可别说，现在还真有人这么做了。 来自香港大学、牛津大学和字节跳动的几名研究人员，决定尝试一下](https://juejin.cn/post/7245166444559335482)
	- [
		量子位
		](https://juejin.cn/user/2858385963484488)
	- 177
	- 点赞
	- 评论
- [最大开源机器人数据集！DeepMind联手21家机构，整合60个数据集，发布Open X-Embodiment，具身智能时代来临](https://juejin.cn/post/7429604186901807131 "最大开源机器人数据集！DeepMind联手21家机构，整合60个数据集，发布Open X-Embodiment，具身智能时代来临")
		[近日，一段「机器狗当挑夫勇闯泰山」的视频火爆全网，这个「机器狗」不仅能够轻松驮载沉重物资，还能在泰山的陡峭山路上「健步如飞」，从山脚到山顶仅用两小时！](https://juejin.cn/post/7429604186901807131)
	- [
		神经星星
		](https://juejin.cn/user/1714893869300104)
	- 32
	- 点赞
	- 评论
	![最大开源机器人数据集！DeepMind联手21家机构，整合60个数据集，发布Open X-Embodiment，具身智能时代来临](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9b3ee9094a064d61815104b3c0a1eafb~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56We57uP5pif5pif:q75.awebp?rk3s=f64ab15b&x-expires=1749181674&x-signature=AyVhmf0ucz1%2FeiDbxV6SPUCE0d8%3D)
- [构建高质量重构数据集, 提升坏味道智能检测有效性的必经之路](https://juejin.cn/post/7308671063298048035 "构建高质量重构数据集, 提升坏味道智能检测有效性的必经之路")
		[基于AI技术实现架构坏味道检测与重构建议是当前业界比较流行的做法，但此做法往往存在一个通病，即训练数据集的质量问题](https://juejin.cn/post/7308671063298048035)
	- [
		华为云PaaS服务小智
		](https://juejin.cn/user/2714068018276008)
	- 48
	- 点赞
	- 评论
- [SDG：高性能数据合成框架，保障数据安全开放与合成数据应用](https://juejin.cn/post/7294210446067761187 "SDG：高性能数据合成框架，保障数据安全开放与合成数据应用")
		[导言 真实数据通常是在真实的人（例如：真实的人类、工作人员、劳动人员等）的生活互动中通过特定的数据采集业务流程收集的，而合成数据（Synthetic Data）完全是由算法生成的。合成生成的数据由全新](https://juejin.cn/post/7294210446067761187)
	- [
		idsTeam
		](https://juejin.cn/user/2703015510292711)
	- 571
	- 1
	- 评论
- - [
		新智元
		](https://juejin.cn/user/952600743642312)
	- 1.6k
	- 点赞
	- 评论
- [今日 AI 简报｜微软推出通用多智能体系统，支持语音克隆的开源TTS模型，Android 自动化评估等](https://juejin.cn/post/7434469983855689767 "今日 AI 简报｜微软推出通用多智能体系统，支持语音克隆的开源TTS模型，Android 自动化评估等")
		[本文简报介绍了最近发布的多个前沿 AI 项目，涵盖文本到图像生成、多智能体系统、Android 自动化评估、图像生成评估以及文本到语音合成等技术领域，展示了 AI 在不同应用场景中的最新进展。](https://juejin.cn/post/7434469983855689767)
	- [
		蚝油菜花
		](https://juejin.cn/user/3499061392715417)
	- 115
	- 点赞
	- 评论
	![今日 AI 简报｜微软推出通用多智能体系统，支持语音克隆的开源TTS模型，Android 自动化评估等](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/665cb813c50744fb8e6ccac76da80c25~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Jqd5rK56I-c6Iqx:q75.awebp?rk3s=f64ab15b&x-expires=1749181674&x-signature=VLUaSYuFcBECJx8L1KOlyayB%2Fw0%3D)
- [世界首款真开源类ChatGPT大模型Dolly 2.0，可随意修改商用](https://juejin.cn/post/7221470013872996408 "世界首款真开源类ChatGPT大模型Dolly 2.0，可随意修改商用")
		[我们鼓励员工手搓了一个数据集，训练 LLM 还把它开源。 众所周知，在 ChatGPT 的问题上 OpenAI 并不 Open，从 Meta 那里开源的羊驼系列模型也因为数据集等问题「仅限于学术研究](https://juejin.cn/post/7221470013872996408)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 3.8k
	- 11
	- 评论

APP内打开