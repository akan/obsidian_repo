---
title: "崛起了，Meta连发2篇突破性论文"
source: "https://mp.weixin.qq.com/s/prtvMyXdeKYGpLn5ViVbjg"
author:
published:
created: 2026-10-09
description:
tags:
  - "Meta超级智能实验室"
  - "CLM"
  - "Context Language Model"
  - "Thinking Before Thinking"
  - "Meta-Reasoning Agent"
  - "上下文管理"
  - "Bash编辑"
  - "ContextBench"
  - "涌现行为"
  - "自建记分牌"
  - "自创角色"
  - "自定义函数"
  - "元推理"
  - "Assess"
  - "Propose"
  - "Evaluate"
  - "Dispatch"
  - "artifact graph"
  - "预算scaling"
  - "Agent"
abstract: "Meta连发两篇论文，提出让语言模型原生管理上下文的CLM和将控制与执行分离的Meta-Reasoning Agent，全面超越现有Agent脚手架。"
---
大家好，我是PaperAgent，不是Agent！

继 [字节的3篇RSI](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247512418&idx=1&sn=8d74c2d9720ec66a3c9dfc02d9c08119&scene=21#wechat_redirect) ， [Google的2篇Skill](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247510689&idx=1&sn=14146cec8d4cb3d0bfbddae98b8f24ba&scene=21#wechat_redirect) ， **Meta超级智能实验室** 一天之内连扔2篇突破论文。

第一篇《Context Language Models》：让语言模型 **原生地管理自己的上下文** ，把人类精心搭了两年的 Agent 脚手架一把掀翻。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/5gibgibpTuuwC8oB4wvcVTjEOtZLQrQy5wWNMB5xSF1Db1Z6yOb3gibLQf6U0zznCVnfCmuu6RZGqiazVqqhT2bicLsgWFOjRAzRkbfZYP3pGjk0/640?wx_fmt=webp&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

第二篇《Thinking Before Thinking》：把下一步该算什么从顺手为之的直觉，升级为 **一个显式的、结构化的推理过程** ，让 Agent 的算力真正越给越强。

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/5gibgibpTuuwDjJPGIic3WNe9NxwicX2ia95zd1AIQbKHKTCQOp59lr6VDy8rdeiaDssDQeI3NfYKQGzOENnu7pL43cTt5Vic8hTnc1zuVWXjKnt50/640?wx_fmt=webp&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

长久以来，Agent 的控制权都握在人类写死的 harness 手里。Meta 这次的选择是： **控制权全部交还给模型自己** 。

![Harness Engineering技术全景图：https://arxiv.org/abs/2604.08224v1](https://mmbiz.qpic.cn/mmbiz_jpg/5gibgibpTuuwDUbyqvtuB1kmsbjnoPzZ62IGrVKU7biagG49yT2ZuzWAFYDg3haabg1HugF9TgRiaiamCLgWvRXcCJslhW6GyruaCZKxVzhIEljI/640?wx_fmt=webp&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

Harness Engineering技术全景图：https://arxiv.org/abs/2604.08224v1

这不是改良，是换代。

## 上下文管理的操作系统时刻

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/5gibgibpTuuwA8ID1TQNBbrrzJDm146Qav2XD2vyp1chUXWBJd6IHkBgdWouKeJwiaeGTuszPFzjeNA0QJUgwEnPLUn2TeSRjxMjKF1yxG1JCM/640?wx_fmt=webp&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

今天的 Agent 是怎么管上下文的？到长度就压缩、每轮都总结、按固定模板检索。规则是人拍的，模型只有执行权，没有立法权。 [彻底，被字节Agent惊艳到了](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247512418&idx=1&sn=8d74c2d9720ec66a3c9dfc02d9c08119&scene=21#wechat_redirect)

CLM（Context Language Model）直接掀了这张桌子： **把上下文镜像成一个文件** ，模型可以用 Bash 随意编辑，改完立刻同步回上下文参与下一轮生成。华盛顿大学参与，代码已开源。

![CLM 总览](https://mmbiz.qpic.cn/mmbiz_jpg/5gibgibpTuuwDM8O0EAtV1J0tDnkh5nVQMfuA0Pm9OJB2IwyoEvYRQZa8N1Qk1GtjhcDFmZb9Yp7iaC7NAgKGZZxxxHkKQNb52z3IOeo8eqlvc/640?wx_fmt=webp&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

CLM 总览

形式上看，普通语言模型只能在上下文后面追加：cₜ₊₁ = cₜ ⊕ f(cₜ)。而 CLM 直接生成下一个上下文本身：cₜ₊₁ = f(cₜ)。一字之差，上下文从"系统维护的日志"变成了"模型自己的作品"。

*code已开源* ![Image](https://mmbiz.qpic.cn/mmbiz_jpg/5gibgibpTuuwBO3SYb53X94ia9vKjoicfURyXta7epCJt6LkO0OtzQfOp176r4IaicqKc40EkVr5jQTkEibZb0w6G2JjAxGhib1ZThmGS29ry4x23k/640?wx_fmt=webp&from=appmsg&watermark=1#imgIndex=5)

### 先诊断，再颠覆：现有策略全军覆没

先造了 ContextBench，用四个合成任务把"上下文管理"从推理和知识里剥离出来：选择性保留、原地手术式编辑、大规模卸载与检索。在 32K 上下文、最高 24 倍上下文压力下：

- 总结压缩会丢信息、会幻觉；
- 不能原地编辑的方法，每改一次数独就要重写整个棋盘；
- 会 offload 的方法，却不会按需把内容从上下文里"驱逐"出去。
![ContextBench 四任务对比](https://mmbiz.qpic.cn/mmbiz_jpg/5gibgibpTuuwBeUDNJNPgNVQHiaebJyzYQQ6qv5D6ofhCOU8y5SgK7tPviaT3hkF8ZWq7ymeAriaDa9l7yMyicE6zvQNO7dxrMAicicQhww3IpNh89o/640?wx_fmt=webp&from=appmsg&watermark=1#imgIndex=6)

ContextBench 四任务对比

没有任何现有方法在这些"简单任务"上拿满分。这就是最扎心的结论： **人类能想到的所有固定策略，在原理上就覆盖不了所有局面** 。

### 没人教，它自己发明了管理术

真正让人起鸡皮疙瘩的是涌现行为。零样本、没人教，CLM 自己长出了一整套管理术：

![CLM 涌现行为示例](https://mmbiz.qpic.cn/mmbiz_jpg/5gibgibpTuuwBFUxf6sHjZxSQFUiclf0krIIZSoztdJqOBeIJicE2PL7ebYgAbEfDEPxI02CeEKDfdfcJRhicbKFXzjYALzhPX7SOXwwnhMNm6DA/640?wx_fmt=webp&from=appmsg&watermark=1#imgIndex=7)

CLM 涌现行为示例

- **自建记分牌** ：多智能体编排时维护状态看板，163 次原地编辑，上下文始终稳定在 6–8K token；
- **自创角色** ：在对话模板里塞进一个 notes 角色，专门写内部笔记；
- **自定义函数** ：写了 compact\_turns 压缩函数，反复调用 37 次；
- **无师自通** ：复现人类设计的总结压缩策略，把 21K token 压成答案相关的摘要。

### 成绩：不是赢一点，是全方位的赢

深度研究 benchmark BrowseComp-Plus 上，CLM 拿到 59.4%，比最强基线（Codex 式总结）高 11.4%，FLOPs 反而少 21.5%。编程任务 TB2.1 上打平最强基线，但只花对方七成的算力。

![编码与深度研究任务结果](https://mmbiz.qpic.cn/mmbiz_jpg/5gibgibpTuuwDTZha5Nlj8A4PvfGzdgrMAKos1FcXQrYxPzJuqwgdPWt8e6f0s4k6muEtItjam8pxhERVWiaru5GkHksQmmibFw1x3K9a10icia1A/640?wx_fmt=webp&from=appmsg&watermark=1#imgIndex=8)

编码与深度研究任务结果

更夸张的是数学优化。面对 AlphaEvolve 风格的专业进化工作流 OpenEvolve，一个"通用 Agent + 自主上下文管理"在四个经典问题上 **全部胜出** ：

![数学优化结果](https://mmbiz.qpic.cn/mmbiz_jpg/5gibgibpTuuwCsicrlBD0uA2wXLbwYIqzYvwx9waIib84as6cphpAUd9q1upxIo5fAj6icP3UOKzSDsotIkPepNIl3fWibcIcyqCmZqZdY0y27vSg/640?wx_fmt=webp&from=appmsg&watermark=1#imgIndex=9)

数学优化结果

专用流水线输给了通用模型加自主管理——这就是 Bitter Lesson 的现场直播。

**长时程任务才是主战场** 。12 小时的 EdgeBench-10 仓库优化：CLM 得分 44.6 对基线 42.3，单次试验算力 179 对 437 PFLOPs， **省了 59** %。24 小时、六个互相依赖的仓库组成的 agent swarm 任务里，同等算力下 CLM 的下游加速效果高出 **65** %。

![长时程仓库优化](https://mmbiz.qpic.cn/sz_mmbiz_jpg/5gibgibpTuuwByqrdJx9MhiaxSNrZ69gtFvreeQ6N40KtET1L2GibCplIfQrLwe9mX0PBOPoyhBlHj90776IBa8aO24s1I3V954o9wSssTqXqCg/640?wx_fmt=webp&from=appmsg&watermark=1#imgIndex=10)

长时程仓库优化

## 思考之前，先思考该怎么思考

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/5gibgibpTuuwBYg1atUDg8y6mibQnMf15IzqgSzwoG4bBRLOlhe5WOIklYkypFQHnZW1UrRgibyNCCc2J61mvmnfSNCibMqJKQfEbEfaSLdP4PKI/640?wx_fmt=webp&from=appmsg&watermark=1#imgIndex=11)

现在的 Agent 有个结构性毛病： **控制和执行纠缠在一起** 。每干一步顺手决定下一步干嘛，历史越滚越长，控制信号淹没在噪音里。最直接的证据是：给直接控制的 Agent 1200 次调用额度，它只用了 18% 就停了——不是没预算，是不知道该怎么花。

![元推理框架总览](https://mmbiz.qpic.cn/mmbiz_jpg/5gibgibpTuuwBCuBdxGicNX5nheoNnwIGRvomBxBCO0Ol5E2Az5o0kSdQV01dic5cvSMWVYd6tVG87lJz9MYRTibvPIicEwXbdvLBuyKtlEdBACSw/640?wx_fmt=webp&from=appmsg&watermark=1#imgIndex=12)

元推理框架总览

**Meta-Reasoning Agent** 把控制和执行彻底拆开：worker 负责干活，controller 专职决策。每个控制循环四个阶段：

1. **Assess** ：这轮学到了什么，重写一份紧凑的状态摘要；
2. **Propose** ：下一步有哪些候选动作（此时不看预算，避免贵但值的动作被提前枪毙）；
3. **Evaluate** ：在剩余预算下哪个动作最值；
4. **Dispatch** ：给选中的 worker 配好指令和它该看的历史产物。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/5gibgibpTuuwCrWmHpic3dynTmibjhGv5TBw5Oe4xraZWibOt1qNXTg9puRIpSbl6pEo7ThGRnp04dumu5iaIWVQEfsHryn75yul1icJ9jQRK7m0EI/640?wx_fmt=webp&from=appmsg&watermark=1#imgIndex=13)

controller 只携带压缩状态，完整产物全部存进持久记忆，随用随取。整个运行过程自然形成一张 artifact graph——每个产物是节点，"谁被喂给谁当上下文"是边。

### 成绩：12 组对照，全胜

ProgramBench（程序重建）上，GPT-5.5 拿到 71.5%，Codex 只有 58.0%；Opus 4.8 拿到 67.2%，压过 Claude Code 的 65.5%。跨四个 benchmark、三个前沿模型， **12 组匹配对照全部更高** ，平均领先 3.6–4.2 分。注意，这是在同样的 worker、同样的预算下，只换"控制方式"拿到的提升。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/5gibgibpTuuwBWTOefFvGOmQYajiacsukAOYYPnIBBRfRgGsUwNtuVrfJBtwdssAA7uoRL5kBSMibhLYibxicFdhiace6HfFB9O8e9JMiaShiavXfS34/640?wx_fmt=webp&from=appmsg&watermark=1#imgIndex=15)

四基准三模型对比

![主结果表](https://mmbiz.qpic.cn/sz_mmbiz_jpg/5gibgibpTuuwDDoppYibicJ0AMTcOO6JuYMJiaGibfvcO6Y3QibN0y3upHxTicM2sNk1WCbJccf29fYEVLhtjeD2xWrhFZ5Am6UcicwoqDylibMyXoMWs/640?wx_fmt=webp&from=appmsg&watermark=1#imgIndex=16)

主结果表

### 突破的关键：预算 scaling 被打通了

全文最有分量的一条曲线：预算从 400 次调到 1200 次调用，元推理从 64.1% 爬到 71.5%，而直接控制在 64% 附近躺平。Opus 的对照更说明问题——直接控制把调用量翻倍，分数只涨 2.6 分。

![预算 scaling 曲线](https://mmbiz.qpic.cn/mmbiz_jpg/5gibgibpTuuwB0jBCJc9r7iakR60iaYWa9hwRysSMqxDQQuiaNQH519b1zwz8iawzlFyWpG4tRJeU0faOib27LFvjSzDtj1cKGNHCvBKy3eUqSY4hQ/640?wx_fmt=webp&from=appmsg&watermark=1#imgIndex=17)

预算 scaling 曲线

**不是花不花预算的问题，是会不会花的问题。** 过去几年 test-time compute 的故事卡在"给更多算力不一定更强"，这篇论文给出了一个能持续兑现算力的结构。

也要诚实：小预算下显式控制的额外开销不划算，Opus 在 400 次额度时 56.6% 对 62.7% 反而落后。结构化控制是一笔需要先垫付、后回本的投资——而 Agent 的任务只会越来越长，这笔投资的回报率只会越来越高。

### artifact graph 里的铁证

多花的算力到底产出了什么？图结构上看得清清楚楚：元推理的运行图更深更宽、对早期工作的复用明显更多。IMO ProofBench 上，worker 产物数量翻倍，产物之间的依赖边涨了将近一个数量级；正确候选出现在更多运行里，最终选择也更准。

![artifact graph 对比](https://mmbiz.qpic.cn/sz_mmbiz_jpg/5gibgibpTuuwACuGCM4icADZbjThZyggt93dgYXrXaqVIBeQeqXibWA2ZlwIBykwEwLlx1YUQ9oBHeyNRQg6AVSGE4XG7Jw2iaC8WlEQyFZm3OUo/640?wx_fmt=webp&from=appmsg&watermark=1#imgIndex=18)

artifact graph 对比

## 最后

当 Agent 动辄运行 24 小时、上千轮交互， **谁来做控制** 已经从工程细节变成核心能力。Meta 用两篇论文给出了同一个答案： **把控制本身，变成模型的原生行为** 。

脚手架的时代在退潮。这一次，Meta 是真的杀回来了。

```
https://arxiv.org/pdf/2609.37725
https://github.com/facebookresearch/context-language-models
Thinking Before Thinking: Scaling Agentic Inference Through Meta-Reasoning
https://arxiv.org/pdf/2609.38147
```

[动手设计AI Agents：（编排、记忆、插件、workflow、协作）](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247492838&idx=2&sn=1e25832e7300ef312721325d0def30b4&scene=21#wechat_redirect)

[一篇Loop+Harness的自进化Agent最新综述](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247508769&idx=1&sn=1c079514aee90450f55fccb41c7ec282&scene=21#wechat_redirect)

[2026，做Agentic AI，绕不开这两篇开年综述](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247508495&idx=1&sn=309c84ca5c2822416fddc1a9dd4f6048&scene=21#wechat_redirect)

已经读到这了，不妨点个👍、❤️、↗️三连，加个星标⭐，不迷路哦~

LLM热点Paper · Table of Contents