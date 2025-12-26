---
title: "近期，谷歌发了两篇Agent Scaling论文，有点东西"
source: "https://mp.weixin.qq.com/s/RdaTUGyfzWrTIF1RvzA60g"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-12-26
description:
tags:
  - "预算感知"
  - "工具效率"
  - "协调拓扑"
  - "任务可分解性"
abstract: "谷歌的两篇论文首次将智能体扩展问题转化为可预测、可度量的科学问题，分别从预算约束和多智能体协调结构两个维度，为Agent系统的规模化设计提供了定量依据和预测模型。"
---
[PaperAgent](https://mp.weixin.qq.com/s/)

*2025年12月22日 13:10* *湖北*

**大家好，我是PaperAgent，不是Agent！**

2025 年，LLM 社区出现两条明显的主线：

1. **Test-Time Scaling**：不靠堆参数，而是靠“多想一想”“多试几次”把性能做上去。
2. **Agent 化**：给模型工具，让它在环境里“滚雪球”式地迭代推理。

但一个尴尬的现实是——**“更多 agent 就一定更好吗？”** 没人能定量回答。

Google 近期发出两篇工作，**第一次把 agent scaling 拆成了可预测、可度量的科学问题**：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricHicgMBfian1L7CNHEic2fRIKuKCx4Awic6d657LdQw74UqQNMw1dRQk7Wm07XJMrBQZph8CLuaLBClJA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricHicgMBfian1L7CNHEic2fRIKu8qqKDwbLJ4e58ScdVLlFrSYJMFC52xFbdkQBkSNVDtUF7hI0jvBRmw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

| 论文 | 核心命题 | 关键词 |
| --- | --- | --- |
| **Budget-Aware Tool-Use Enables Effective Agent Scaling** | 在“工具调用预算”约束下，如何让 agent 花得少、做得对？ | 预算感知、工具效率 |
| **Towards a Science of Scaling Agent Systems** | 给定任务，能否提前算出最优 agent 数量与协调结构？ | 协调拓扑、任务可分解性 |

## 预算感知的Tool-Use

![Budget Tracker 插件示意](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricHicgMBfian1L7CNHEic2fRIKufyvjeTrPFO984PsLy2aRPia5askCtdGDOW4t2JX0yG8yN9qDaTTMKmQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

Budget Tracker 插件示意

图 1：Budget Tracker 作为轻量级插件，可同时服务于标准 ReAct（上）与高级框架 BATS（下）

### 2.1 核心痛点

- 简单“加预算”≠ 提升性能：agent 缺**预算感知**，很快撞上天花板。
- 工具调用 ≠ token：搜索、浏览、API 都有**经济成本**，需要统一度量。

### 2.2 解法一：Budget Tracker（即插即用）

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricHicgMBfian1L7CNHEic2fRIKuEic4vA7913o2grriaQ90nB3icw4RHjxhCy5XEbeCSJGqPon0OZpfY4m1Q/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

- 每轮把“剩余/已用”预算写进 prompt，**零额外训练**。
- 根据预算高低，自动切换“广撒网”↔“精准打击”策略。
![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricHicgMBfian1L7CNHEic2fRIKu8Q9Kfn8nSiajlh7j3bfIbdiaMfI52kDz30npmF3ls8MREOETuXUXbUkw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

**效果**（BrowseComp，Gemini-2.5-Pro）：

- 预算 10 → 100，**继续 scaling**；无 Tracker 的基线在 100 就饱和。
- **相同精度下成本 ↓ 31**%（搜索 ↓ 40%，浏览 ↓ 21%）。
![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricHicgMBfian1L7CNHEic2fRIKuEYPXWvHp13ibWicWrFR4j7eUia4gwzv5nwnt5YiaScuJPxOPqlkzxAI1gg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

### 2.3 解法二：BATS 框架（Budget-Aware Test-time Scaling）

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricHicgMBfian1L7CNHEic2fRIKu3eaZcFObwOPEmgwcd8p7ruWbI5ib8xRibnGQurErNGqQtErgoz7ibFYhw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

| 模块 | 预算感知做法 |
| --- | --- |
| **规划** | 把“剩余工具次数”写进 checklist，动态决定“深挖”还是“换路”。 |
| **自检** | 提出答案后，用剩余预算做**反向验证**；不通过则总结失败原因，**压缩进记忆**再开新路径。 |

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricHicgMBfian1L7CNHEic2fRIKu8toAC8wZpzehHFTnQjAZbGErl3kqmiboqyANzXM3jhh5eoeiaMHsGSnQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

**结果**：在 3 个信息检索 benchmark 上，**BATS 一致优于并行/串行 scaling**，且**实际花费更低**（见图 7）。

图 7：左图工具数-性能曲线，右图统一成本-性能曲线![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricHicgMBfian1L7CNHEic2fRIKu02CD310KgysdkNcZE79X6qom0RWmxiaicicC42n7pFs6eicShcatXyuibpA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

## 03 Scaling科学：多 agent 的“盈亏平衡点”

![平均性能随模型 Intelligence Index 变化](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricHicgMBfian1L7CNHEic2fRIKuxSHUtJl7agF6hIt3ML4JqVlepcPnO2Dtt9Tk2AxkfcOviaAvHxtRHJA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=9)图 1：跨模型家族的 Intelligence Index 与平均性能

### 3.1 实验规模 = 180 种配置“大横评”

![基于客观复杂度指标的智能体方法架构对比。](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricHicgMBfian1L7CNHEic2fRIKuyColdoyRhYOWXoyiacUPskKsW23bvc3kzPWdqNgoYkvdE9JPicTX4SXg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=10)

基于客观复杂度指标的智能体方法架构对比。

| 维度 | 取值 |
| --- | --- |
| 任务 | 4 个真实 agentic benchmark（金融、网页、Minecraft 规划、办公流） |
| 模型 | 3 大家族 × 3 个尺寸 = 9 款 LLM |
| 架构 | SAS + 4 类 MAS（Independent / Centralized / Decentralized / Hybrid） |
| 总配置 | 180 组，全部**匹配 token 预算**，排除实现差异 |

### 3.2 三条“铁律”被发现

表4 将性能与智能水平、任务属性以及实测协调指标相关联的完整scaling原理系数表![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricHicgMBfian1L7CNHEic2fRIKuRgE4hftRI9fxzA6nxh0Z1yt09fAkdQE9ACJejhrnicXbT8he0KxrePA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=11)

| 铁律 | 数据说话 | 业务启示 |
| --- | --- | --- |
| **工具-协调权衡** | β = -0.267，p<0.001 | 工具 > 8 个时，MAS 开销指数级放大，慎用！ |
| **能力饱和点** | 单 agent > 45% 后，再加人**收益为负** | 先把单兵做强，再考虑团队协作 |
| **错误放大** | Independent 架构把错误放大 **17.2×**；Centralized 压到 **4.4×** | 无校验的“裸并行”= 自爆 |

表 5：不同架构的协调指标![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 3.3 定量预测模型

论文用 20 个可观测特征（工具数、单 agent 基线、效率、冗余、错误放大…）拟出**混合效应模型**：

- 交叉验证 R² = **0.524**，MAE = 0.089
- **87% 的 held-out 配置**被成功预测最优架构

**在线计算器思路**： 输入任务复杂度 T、单 agent 基线 PSA、模型 Intelligence Index → 输出期望性能最高的架构。

![整套计算器的完整表达式](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

整套计算器的完整表达式

## Agent  scaling 进入“可预测时代”

两篇论文一口气把“**花钱**”和**加人**”两大 scaling 维度做成了**可度量、可预测**的科学问题：

- **不再靠拍脑袋**决定要不要上多 agent；
- **不再盲目**给 agent 无限工具预算；
- **不再**把“多 agent”当万能药。

2025 年做 agent 系统，终于有**数学公式**兜底了——**有点东西**。

```
https://arxiv.org/pdf/2511.17006Budget-Aware Tool-Use Enables Effective Agent Scalinghttps://arxiv.org/pdf/2512.08296Towards a Science of Scaling Agent Systems
```

推荐阅读

[动手设计AI Agents：（编排、记忆、插件、workflow、协作）](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247492838&idx=2&sn=1e25832e7300ef312721325d0def30b4&scene=21#wechat_redirect)

[SOTA集体掉线，美团LongCat这个最新开源牛了！](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247499664&idx=1&sn=e5cad9501f2af0e0013ebb9f437c23d1&scene=21#wechat_redirect)

[AI Code赛道抛出一匹黑马：来自于字节跳动](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247499212&idx=1&sn=9cedae073cb0826d7588701eaf0c2c4d&scene=21#wechat_redirect)  

[一篇最新自演化AI Agents全新范式系统性综述](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247497640&idx=1&sn=beb015fa84617bd1930222684ec9def8&scene=21#wechat_redirect)

---

每天一篇大模型Paper来锻炼我们的思维~已经读到这了，不妨点个👍、❤️、↗️三连，加个星标⭐，不迷路哦~