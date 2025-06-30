---
title: AI金融交易开源Agent火了，对苹果狂赚26.6%
source: https://mp.weixin.qq.com/s/t8sq-wt33nc85utYNxj1aA
author:
  - "[[付奶茶]]"
published: 
created: 2025-06-30
description: 
tags:
  - TradingAgents
  - 多智能体协作框架
  - 金融股票交易
abstract: MIT开源的多智能体金融交易框架TradingAgents在模拟交易中实现了26.6%的高回报。
---
Original 付奶茶 *2025年06月30日 13:11*

![Image](https://mmbiz.qpic.cn/mmbiz_png/5fknb41ib9qH0XkVXvKZTjHu2KEOcu6o260lH2JX5Y1Bpdnh9gFsmkE1UkDgrPKzKLNfChL4ldWQIrsYst2d0sg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

如果你是程序员，又对股票感兴趣，那八成动过写个脚本的念头。

这个想法的初版通常很简单：找个免费的股票数据 API，用 Python 拉取 K 线，算一下 MACD 或者 RSI 指标，然后写几 个 `if/else` 来触发买入卖出信号。测试几次，发现收益还不错，特容易兴奋上头。

![Image](https://mmbiz.qpic.cn/mmbiz_png/5fknb41ib9qGsNdAjiaoSDZwtaUuk9z26TiaDcbtJQV98nKxf6WB2XxQJa3ic4ue9hX4PFgdyIOMVpAOVFweRrAImw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

我很早之前也干过这事儿，但说实话没那么简单，市场一变，之前有效的策略可能立刻失效，得经常调整。写的那几十行脚本，在真实的市场面前，还是太单薄了。

最近，我找到一个据说“神”到不行的“队友”，麻省理工学院（MIT）的一群研究者开源了一个叫 **TradingAgents** 的项目，它不是一个简单股票机器人，号称是目前最强大的 **AI 金融股票交易智能体** ，在 GitHub 上的 Star 数已经突破 5000 大关，非常火爆。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

先不说它是一个 Agent，最牛的是它的战绩，比如在对苹果（AAPL）股票的模拟交易中，竟然跑出了 26.6% 的回报。这不妥妥“AI 股神”吗。

最近我们聊 Agent 聊得很多，见证了太多简单的“单体 Agent”，前段时间我们发过一篇文章讨论“ [多智能体到底该不该建](https://mp.weixin.qq.com/s?__biz=MzIwNzc2NTk0NQ==&mid=2247609125&idx=1&sn=7e0f9613f16dad87daf70a2cd319c2ea&scene=21#wechat_redirect) ”，在充满不确定性和对抗性的真实世界任务中，从单体到多体是必然。

这个开源项目 **TradingAgents，** 也是基于多智能体协作框架，而且是选在金融这个最复杂、信息密度最高、反馈最残酷的领域。一起看看它咋做的。

## TradingAgents 是咋做到的

TradingAgents 和传统的量化交易或单一 AI 模型的不同在于— **“多智能体（Multi-Agent）”的 LLM 金融交易框架** 。

传统的金融选股模型主要是训练一个 AI 模型进行技术分析，这些模型往往是“单兵作战”，缺乏真正的协同和决策能力。

而 TradingAgents 则完美模拟了人类金融团队的运作模式，通过构建一个分工明确、协作紧密的智能体网络，实现了从“数据分析”到“策略制定”再到“风险管理”的全链条自动化。

你可以把 TradingAgents 想象成一家顶级的投资公司，只不过里面的“员工”全都是由 AI 智能体扮演！每个智能体都拥有特定的专业知识和角色，能够进行动态讨论和协同决策。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

多智能体团队内部一共设定了四种角色的员工：

### 不同视角的分析师团队

这支团队类似公司的“千里眼”，洞察市场，这些分析师智能体被赋予了特定的观察和推理能力：

- **基本面分析师：** 评估公司财报，根据行业报告、宏观经济数据，推理出公司的内在价值变动趋势和潜在风险信号。
- **情绪分析师：** 实时监测社交媒体、新闻评论等，用情感评分算法捕捉市场的“风吹草动”。
- **新闻分析师：** 紧盯全球新闻和宏观经济指标，理解事件的深层影响，预测其对特定行业或股票的连锁反应。
- **技术分析师：** 运用 MACD、RSI 等专业指标，识别交易模式，并通过 LLM 的推理能力预测短期价格波动和可能的突破点。
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 专门辩论的研究员

这部分更有意思了！

研究团队构建了一个独特的辩论团队，让不同观点的 **看涨研究员** 和 **看跌研究员** 进行结构化辩论：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

- **看涨研究员：** 积极寻找市场中的利好因素，例如行业发展机遇、公司创新成果等，构建支持投资的逻辑，并提供论据支持。
- **看跌研究员：** 捕捉潜在的风险信号和不利因素，例如宏观经济下行压力、公司竞争劣势等，并提出反驳意见和风险警示。

这种“正反方辩论”模式，强制智能体从两个方面进行深入思考，有效避免了单一视角可能带来的局限性，让决策更加全面和客观。

### 操盘手交易员

当分析师和研究员团队把“功课”做足后，就轮到交易员智能体出马了！

交易员智能体的决策过程是一个复杂的强化学习过程，综合所有信息，制定出切实可行的交易策略。

交易员智能体会综合考虑：

- 市场深度和流动性： 决定交易规模，避免对市场造成不必要的冲击。
- 风险偏好： 根据预设的风险敞口，调整交易激进程度。
- 时间窗口： 精准把握交易时机，力求实现回报最大化。
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

一旦市场出现符合预设交易条件的信号，交易员智能体就会迅速下达买入或卖出指令，并根据市场的实时变化灵活调整投资组合。

### 风险管理团队

**在金融市场，风险控制永远是重中之重！**

研究团队构建了专门的风险管理智能体团队，实时监控持仓情况和市场波动，通过设置止损订单等手段，严格控制投资风险，利用价值风险（VaR）、条件风险值（CVaR）等量化风险指标，确保所有交易活动都在预设的风险参数范围内进行。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

例如，当某只股票的价格出现显著下跌，并接近预设的止损价位时，风险管理团队会及时提醒交易员智能体采取相应的应对措施，以最大限度地减少潜在损失。

## 核心技术解密

TradingAgents 的论文中详细阐述了几个关键的技术亮点：

### LangGraph 驱动的工作流

TradingAgents 采用了先进的“工厂模式（Factory Pattern）”来创建智能体，结合 LangGraph 构建了动态工作流，让不同的 LLM 智能体之间进行有状态的对话和决策路径切换，形成智能体之间的“高速公路”。

这种高度模块化和可配置的设计，使得系统能够：

- 根据不同的金融场景，轻松配置各种 LLM 模型，例如 GPT-4、o1-preview 等，甚至可以集成本地部署的开源 LLM。
- 支持实时市场数据或历史缓存数据作为分析来源。
- 允许用户自由设定辩论轮次，完美适应各种复杂多变的金融交易场景。

### 多模态数据融合：让 AI 看到“全景图”

TradingAgents 具备强大的 **多模态数据融合能力** 。它能同时融合：

- **结构化数据：** 如财务报表、交易数据、宏观经济指标等。
- **非结构化文本数据：** 如新闻报道、社交媒体信息、公司公告等。

从这些复杂且多样化的数据中精准提取关键信息，TradingAgents 能够记那些跨模态的关联分析，提升市场预测的准确性。

### 动态决策与持续学习进化

通过回测奖励机制可以根据市场的实时变化快速调整策略，实现持续学习进化。TradingAgents 构建了持续学习的决策链条：

- **实时反馈：** 根据实际的市场表现，接收到实时反馈。
- **奖励信号：** 成功的交易或有效的风险控制会生成正向奖励信号。
- **模型优化：** 这些奖励信号被用于持续优化 LLM 的提示、智能体间的交互规则，以及决策参数，形成一个 **闭环学习的良性循环** 。

这就像一个经验丰富的交易员，在每一次交易中不断复盘、学习、成长！

研究团队喂给了 TradingAgents 以下相关内容，包括：

- 实时股价 & 60+ 技术指标（MACD、RSI 等）
- 彭博/雅虎财经等专业新闻
- Reddit/推特社交情绪分析
- 公司财报、高管交易数据
- 宏观经济和政府政策更新

然后将 TradingAgents 的表现与 **五大传统策略** （比如“买入持有”、MACD 均线、KDJ+RSI 组合等）进行了对比。TradingAgents 平均碾压基线策略 6-24 个百分点。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在模拟盘中高收益下最大亏损 (回撤) 仅 0.91%-2.11%，接近风控最强的保守策略； 收益风险比（夏普比率）高达 5.6-8.21（传统策略普遍 <3.5，超过 3 已是顶级水平）。

## 部署方式

看到这里，家人们是不是已经跃跃欲试，想让这个“AI 股神”在你的电脑上跑起来了？

别担心，部署它并不复杂！

1. **克隆 TradingAgents 仓库：**
```
git clone https://github.com/TauricResearch/TradingAgents.git  
cd TradingAgents
```
1. **创建虚拟环境（推荐使用 conda）：**
```
conda create -n tradingagents python=3.13  
conda activate tradingagents
```
1. **安装依赖项：**
```
pip install -r requirements.txt
```

**必要 API 配置：**

1. **FinnHub API（获取金融数据）：** 所有代码均兼容免费套餐。
```
export FINNHUB_API_KEY=$YOUR_FINNHUB_API_KEY
```

**2\. OpenAI API（智能体运行所需）：**

```
export OPENAI_API_KEY=$YOUR_OPENAI_API_KEY
```

（ 换 `$YOUR_FINNHUB_API_KEY` 和 `$YOUR_OPENAI_API_KEY` 为你的实际 API 密钥 ）

**3\. 命令行使用：**

配置好 API 后，你就可以直接运行 CLI 了：

```
python -m cli.main
```

界面会显示可选参数，比如股票代码、日期、LLM 模型、研究深度等等。运行时，你会实时看到加载结果，并能追踪智能体的执行进度，亲眼见证 AI 如何“思考”！

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

虽然 TradingAgents 为我们展示了 LLM 在复杂、高风险金融场景中进行决策的巨大潜力，这是否意味着人人都能轻松实现财富自由？AI 真的能通过这种多智能体协同模式，实现超越人类的交易表现吗？

如果你对 AI Agent、复杂系统设计或者量化交易感兴趣，这个项目值得花时间研究一下。

但是大家都是技术人，明白回测和实盘的巨大差异，请勿直接用于真实交易。

**【 ****重要提醒：TradingAgents 框架仅供研究用途哦。它的交易表现可能会因为模型、参数、数据等多种因素而异，而且它不构成财务、投资或交易建议！咱们玩归玩，闹归闹，投资有风险，入市需谨慎！**** 】**

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**参考文献**  
https://arxiv.org/pdf/2412.20138  
https://github.com/TauricResearch/TradingAgents

继续滑动看下一个

夕小瑶科技说

向上滑动看下一个