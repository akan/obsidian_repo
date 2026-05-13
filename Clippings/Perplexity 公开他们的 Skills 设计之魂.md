---
title: "Perplexity 公开了他们的 Skills 设计之魂"
source: "https://mp.weixin.qq.com/s/35Rqv3enEUkpl189FfxjbA"
author:
  - "[[老章很忙]]"
published:
created: 2026-05-13
description:
tags:
  - "Agent Skills"
  - "Perplexity"
  - "最佳实践"
  - "模型上下文"
  - "成本分层"
abstract: "Perplexity 公开了编写、维护 Agent Skills 的一套与常规编程思维相反但效果显著的最佳实践，强调每个 Skill 都是上下文成本、隐式路由和基于 gotcha 的迭代维护。"
---
老章很忙 *2026年5月12日 12:39*

大家好，我是 Ai 学习的老章

[MATLAB 的 Skills 来了，科研狂喜！](https://mp.weixin.qq.com/s?__biz=MzA4MjYwMTc5Nw==&mid=2649013440&idx=2&sn=3011d451ca159d967d6c573bb681b214&scene=21#wechat_redirect)

[AI时代，PPT的未来是HTML，一个神奇的 Skills 推荐](https://mp.weixin.qq.com/s?__biz=MzA4MjYwMTc5Nw==&mid=2649013043&idx=1&sn=bacdf226b6602c8c408150f7af60e643&scene=21#wechat_redirect)

[视频号做到6000粉，我每天只做一件事](https://mp.weixin.qq.com/s?__biz=MzA4MjYwMTc5Nw==&mid=2649013460&idx=2&sn=e5687422fe9b1256fa5aeb58bd794cfe&scene=21#wechat_redirect)

今天有一篇必读的文章——Perplexity 把他们内部维护数百个 Skill 的最佳实践公开了

读完最大的感受是： **写 Skill 的最佳实践，跟写代码的最佳实践，几乎反着来**

### Zen of Python vs Zen of Skills

Perplexity 团队拿 PEP 20 的"Python 之禅"开了个玩笑，他们整理了一张对照表，Python 之禅里大约一半的箴言，写 Skill 时 **完全反着** 才对

| Zen of Python | Zen of Skills |
| --- | --- |
| Simple is better than complex | Skill 是文件夹不是单文件， **复杂性本身就是 feature** |
| Explicit is better than implicit | 激活靠 **隐式模式匹配** ，靠渐进披露 |
| Sparse is better than dense | Context 很贵，每个 token 都要带最大信号 |
| Special cases aren't special enough | **Gotcha 就是特殊情况，它们是最高价值内容** |
| 实现好解释就是好主意 | 如果好解释， **说明模型已经知道了，删掉** |

简单一句话： **写 Skill 不是写软件，是给模型构建 context** 约束完全不同，设计原则也完全不同——按写代码的思路去写 Skill，结果一定拉胯

老章特别认同最后一条—— **如果一段内容很容易解释清楚，那大概率模型自己就会，写进 Skill 里只是浪费 token**

### Skill 是什么

Perplexity 给了一个四面体的定义：

> ❝
> 
> A Skill is a Directory

| 子项 | 作用 |
| --- | --- |
| `SKILL.md` | frontmatter + 主指令 |
| `scripts/` | 让 agent 直接跑的代码，别让它现写 |
| `references/` | 重文档，按需加载 |
| `assets/` | 模板、schema、数据 |
| `config.json` | 首次使用的用户配置 |

这种 **hub-and-spoke** （中心-辐射）模式可以把 Skill 写得极其紧凑又能容纳极复杂的内容

Perplexity 透露的一个真实案例很猛——他们做 Computer 的所得税 Skill 时，要塞下税收法典的 **1945 条** 内容如果一股脑塞到一个文件夹里，模型表现 **比不加载这个 Skill 还差**

后来他们改用三层主题嵌套（300 个 topic → 20 个 area → 内部 ~15 个 topic），加上自定义搜索工具和快速引导，才把税务相关任务的能力做扎实

> ❝
> 
> 重点：层级是有代价的，多一层就要多一份信息架构上的人工梳理但梳理好了，模型的查阅精度会指数级提升

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### 2) Skill 是一种格式

`SKILL.md` 头部 frontmatter 的两个核心字段：

- **name** ：必须全小写、无空格、可用连字符，要和目录名完全一致
- **description** ： **路由触发器，不是内部文档**

这是新手最大的失败模式——把 description 写成"这个 Skill 做什么"，应该写成"什么时候该加载这个 Skill"

> ❝
> 
> 应该是 "Load when..."，不是 "This Skill does..."

#### 3) Skill 是可被调用的

agent 在运行时按需加载 Skill，不是无脑塞 context

Perplexity Computer 的加载流程：

1. agent 调用 `load_skill(name="...")`
2. Computer 把 Skill 目录复制到隔离沙箱
3. 按 `depends:` 递归加载依赖
4. 剥掉 frontmatter，agent 只看正文+附属文件

#### 4) Skill 是渐进的（progressive disclosure）

这是整篇文章最核心的概念， **三档上下文成本** ：

| Tier | 加载什么 | 预算 | 什么时候付 |
| --- | --- | --- | --- |
| **Index** | 所有可见 Skill 的 `name: description` | 每个 Skill ~100 token | **每会话每用户都付** |
| **Load** | 完整 `SKILL.md` 正文 | ~5000 token | 加载之后到压缩边界都要付 |
| **Runtime** | `scripts/`  、 `references/` 、 `assets/` 、子 skill | 无上限 | 只在 agent 真的去读时付 |

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

为什么这个分层这么重要？

- Index 阶段的 100 token 是 **全局税** ，每个用户每次会话都要交 → 描述必须极致精炼
- Load 阶段的 5000 token 是 **任务税** ，一次会话多个 Skill 同时加载就翻倍 → 每句话都要有用
- Runtime 阶段最宽松，可以放 20000 token 的分支逻辑，agent 用到才付

### 什么时候真的需要写 Skill

Perplexity 团队被问得最多的就是这个问题，他们的标准答案是：

> ❝
> 
> 没有先验答案先不加 Skill 跑几次 hero query，看 agent 表现，如果它能搞定就不需要 Skill

**真的需要写 Skill 的场景：**

- agent 没特殊上下文就会做错
- 跨多次运行需要极致一致性
- 知识是稳定的，但不在模型训练数据里（截止时间外 / 企业私有流程）
- **品味问题** （这点很妙）—— Perplexity 设计总监 Henry 写的设计 Skill，每个字都是关于"哪种字体感觉对、哪种不对"的判断，这种东西模型从训练里学不到

**真的不需要写 Skill 的场景：**

- 一串 git 命令的执行顺序——模型本来就知道
- 重复 system prompt 里已有的内容
- 变化比维护速度还快的东西（比如频繁更新的 MCP 端点）

### Every Skill is a Tax

整篇文章我觉得最值钱的就是这句话： **每个 Skill 都是税**

实用的自检：

> ❝
> 
> " **如果没这句话，agent 会不会做错？** " 不会做错 → 不能留

写 Skill 真的很难写短，Perplexity 引用了帕斯卡 1657 年那句名言：

> ❝
> 
> Je n'ai fait celle-ci plus longue que parce que je n'ai pas eu le loisir de la faire plus courte （这封信写得这么长，只因为我没时间把它写短）

如果你 5 分钟就能写完一个 Skill 还提了 PR，那这个 Skill 大概率不及格

更扎心的：一项早期研究表明，让 LLM 自己写 Skill， **平均来看模型从这种 Skill 里得不到任何好处** ——"模型无法可靠地撰写它消费时受益的那种程序性知识"

### 五步法

Perplexity 给的 Skill 撰写流程：

**Step 0：先写 evals**

来源三类：

- 真实用户查询（生产采样或团队 brain trust）
- 已知失败用例（之前 agent 做错的地方）
- 邻域混淆（语义靠近但应该路由到别的 Skill）

**负面样本往往比正面样本更有价值**

**Step 1：写 description**

最难的就这一行：

- 以 "Load when..." 开头
- 50 词以内
- 描述用户 **意图** （最好是真实查询）
- 不要描述工作流

正确示范：与其写"监控 PR"，不如写工程师沮丧时会说的话——"babysit"、"watch CI"、"make sure this lands"

**Step 2：写正文**

跟人交流和跟 LLM 交流是两回事——

❌ 不要写：

```
git log # find the commit
git checkout main
git checkout -b <clean-branch>
git cherry-pick <commit>
```

✅ 这样写：

> ❝
> 
> Cherry-pick the commit onto a clean branch. Resolve conflicts preserving intent. If it can't land cleanly, explain why.

别"轨道化"，给模型留出灵活处理多种情况的空间

**最高价值内容是 gotcha** ——把每次 agent 翻车的点累积起来

**Step 3：用好目录结构**

| 目录 | 用途 |
| --- | --- |
| `scripts/` | agent 每次都会重复发明的确定性逻辑 |
| `references/` | 条件触发的重文档 |
| `assets/` | 输出模板和 schema |
| `config.json` | 首次配置 |

**Step 4：迭代**

在 branch 上反复跑评估再合入，让 reviewer 一次拿到完整 changeset + 评估集

### 怎么维护 Skill：Gotchas 飞轮

发布之后才是真正的开始：

| Agent 表现 | 怎么做 |
| --- | --- |
| 任务失败 | 加一条 gotcha |
| 加载了不该加载的 Skill | 收紧 description + 加负样本 |
| 没加载该加载的 Skill | 加关键词 + 加正样本 |
| system prompt 变化 | 检查冲突或重复 |

**Skill 是 append-mostly 的** ——大部分时间你在追加 gotcha，而不是改描述或扩指令

如果你合入之后第一件事就是改 description，那基本就跑偏了——因为 description 决定路由，改它会 **对所有其他 Skill 产生外溢影响**

### 多模型评测必须做

Perplexity Computer 至少同时支持三个家族的编排模型： **GPT、Claude Opus、Claude Sonnet** Sonnet 和 GPT 在 Skill 行为上 **差异不小** ，所以同一个 Skill 必须跨模型评测

> ❝
> 
> 这点国内厂商基本没人做……

### 老章的几个 takeaway

通读一遍下来，对国内做 Agent / Skill 的同学最有借鉴的几条：

1. **Skill 不是新文档** ——别把 README 当 Skill 写
2. **Description 是最难的一行** ——它决定路由，不是描述
3. **Gotcha 是无价的** ——出错就加一条，长期飞轮
4. **每个 Skill 都是税** ——加之前先问"agent 没它会不会出错"
5. **多模型评测** ——别只跟一个模型耦合
6. **Action at a distance 是真存在的** ——新加一个 Skill 可能让另一个不相关的 Skill 变差，这点最反直觉

附一句很扎心的事实： **让 LLM 自动写 Skill，目前的结论是没收益** Skill 这件事，目前还是非常依赖人来注入"判断"

### 总结

如果你团队在用 Claude Skills 或者要在 Computer / Codex 上做 Agent，这篇 Perplexity 的文章值得收藏反复读

我个人最大的认知更新是 **Three-Tier Context Cost** 这个框架——Index / Load / Runtime 三档预算，过去我写 Skill 没有这么清晰的成本分层概念，看完明显能感觉到"哪些字该放哪儿"

原文：research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity

#AgentSkills #Perplexity #Claude #Computer #Agent

**制作不易，如果这篇文章觉得对你有用，可否点个关注给我个三连击：点赞、转发和在看若可以再给我加个🌟，谢谢你看我的文章，我们下篇再见！**

Ai编程 · 目录

继续滑动看下一个

Ai学习的老章

向上滑动看下一个