---
title: 为什么不建议构建多智能体？《Don’t Build Multi-Agents》博客解读
source: https://mp.weixin.qq.com/s/LZcfYqHR2Zl6GnBtzLuMSg
author:
  - "[[paul]]"
published: 
created: 2025-06-17
description: 
tags:
  - clippings
  - Multi-Agent
  - 全局上下文共享
  - 压缩中继类型
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/ibFEa8fZfj4L1SqGk2soqTdyrVteO6coibgYY03cpasE5nJAxomFe0uz60yHoZDxpAsYI21Lh63L63rmfHYNNsAQ/0?wx_fmt=jpeg)

Original paul [CyPaul Space](https://mp.weixin.qq.com/s/) *2025年06月13日 15:01*

## 最近几个月在做复杂智能体，结合自己的实际经历，正有一些感想和踩坑想吐槽下；正好今天看到这篇Don’t Build Multi-Agents（https://cognition.ai/blog/dont-build-multi-agents）博客，深有共鸣；所以决定对这篇博客内容进行结合个人观点的解读分析，供大家参考；

该博客针对当前AI代理开发领域的流行框架— **Multi-Agent范式** 提出针对性批判，并提出构建可靠AI智能体的核心原则。

---

## 一、Multi-Agent多代理架构的缺陷

作者（Walden Yan）开篇直指问题——认为当前流行的 **多代理框架** （ **Multi-Agent** 范式，如OpenAI的Swarm和Microsoft的AutoGen）违背了 **认知可靠性** 的基本原理：

- AI代理的根本目标是 **在有限上下文约束下完成复杂任务的可靠执行** 。而多代理架构在此框架下存在两个根本性矛盾

> 作者类比了Web开发史：1993年诞生HTML，2013年React革新前端开发。2025年的AI智能体领域类似“原始HTML时代”，缺乏成熟框架。主流库如OpenAI的Swarm和微软的AutoGen推广多智能体架构，但作者认为这是错误方向。

1. **上下文碎片化悖论**
- 第一性原理：LLM的决策质量与上下文完整性正相关
	- 现实表现：当主代理将任务拆分为子任务（如"开发游戏背景"和"设计角色"）时，子代理仅获得任务片段
	- 本质冲突：子代理缺失主代理的决策树（如"视觉风格需统一"的关键约束），导致输出偏差（如Super Mario风格的背景配卡通风格角色）
3. **决策熵增定律**
- 第一性原理：并行系统决策节点数与系统混乱度呈指数关系
	- 案例实证：Flappy Bird克隆任务中，两个子代理独立产生的设计决策（如像素分辨率、色彩空间）有很大概率发生协调冲突

![多代理架构缺陷示意图](https://mmbiz.qpic.cn/mmbiz_png/ibFEa8fZfj4L1SqGk2soqTdyrVteO6coibfibfqqzDjkexZSiagBS8DO9Res4CTN4sS2Pce7zpZEYNZAP1J6OoPtHQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

多代理架构缺陷示意图

*（来源：原文配图，展示任务分解导致的上下文割裂）*

---

## 二、构建可靠代理的两个基本规则

作者（Walden Yan）提出两个不可妥协的构建可靠代理的基本规则：

### 原则1：全局上下文共享（Full-context Tracing）

- 智能体的每个动作必须基于系统中所有相关决策的完整上下文。
- **问题示例** ：当主智能体将任务拆分为子任务（如“构建Flappy Bird克隆”拆分为“背景”和“小鸟”子任务）时，若子智能体仅接收子任务而缺乏主任务历史，可能误解需求（如将背景误做成超级玛丽风格）。
- **解决方案** ：传递完整的智能体轨迹（agent trace），而非单个消息。
- **生物学基础** ：人脑前额叶皮质持续整合感官输入和工作记忆。

### 原则2：决策一致性约束（Implicit Decision Coherence）

- 动作中隐含未明说的决策，冲突会导致系统崩溃。
- **架构要求** ：禁止并行代理在未同步状态下作出可能冲突的决策（如界面布局与交互逻辑）。
- **问题示例** ：两个子智能体独立工作，分别设计背景和小鸟，但因缺乏实时协调，导致视觉风格冲突（如卡通小鸟配写实背景）。

![改进后的上下文传递架构](https://mmbiz.qpic.cn/mmbiz_png/ibFEa8fZfj4L1SqGk2soqTdyrVteO6coib9O2BXWuEmRgQiaJicKYiaY67iaxU7pF60nN7U2pcJgOTibWOvqBypCc8sHw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

改进后的上下文传递架构

*（来源：原文配图，展示上下文串联传递模式，但并行过程中可能因缺乏协调而导致潜在的冲突决策）*

> **违反这两个原则的架构本质是脆弱的**

---

## 三、架构范式建议：从多线程回归单线程

> 毕竟，当前大模型本身也是单线程的范式（just predict next token）

基于上述原则，作者提出二种可靠架构方案：

1. **基础单线程：单线程线性智能体（Single-Threaded Linear Agent）**
- 所有动作在单一连续上下文中执行（如图示），避免决策分散。
	- **上下文处理方式** ：原始全量上下文（当然，也要在LLM允许的上下文窗口内），信息 **无损压缩** 。
	- **优点** ：简单、可靠，适用于多数场景。
	- **适用场景** ：比如搜索Agent（多轮动态搜索）、DataAgent（多轮解码解释器工具调用）。
	- **缺点** ：长任务可能超出上下文窗口限制。 **适合中、短任务** ![单线程架构图示](https://mmbiz.qpic.cn/mmbiz_png/ibFEa8fZfj4L1SqGk2soqTdyrVteO6coibgfCrnliaqbx77w2vY22sn81qgW3qO0bcsjMyrGkOIK93uRwb0lxfMLA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)
3. **压缩中继：上下文压缩模型（Context Compression Model）**
- 引入LLM（可能是专用LLM）压缩历史动作/对话，提炼关键事件和决策。
	- **上下文处理方式** ：LLM摘要器提炼事件/决策， 信息 **有损压缩** （不压缩的话，爆LLM上下文窗口）
	- **优点** ：支持更长任务，减少上下文负担， **适合长任务（几十分钟甚至几小时）** 。
	- **适用场景** ：比如复杂任务Agent，如全栈开发等。
	- **挑战** ![压缩架构图示](https://mmbiz.qpic.cn/mmbiz_png/ibFEa8fZfj4L1SqGk2soqTdyrVteO6coibE9RCcFEzXic4oweyyHbwnxeLfrZvIibEoOKV5I1Fz255EFVPA154vFZA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

总结：

| 架构类型 | 上下文处理方式 | 可靠性指数 | 适用场景 |
| --- | --- | --- | --- |
| **基础单线程** | 原始全量上下文 -> 信息 **无损压缩** | ★★★★☆ | 中、短任务（10分钟内） |
| **压缩中继** | 动态摘要关键决策 -> 信息 **有损压缩** | ★★★☆☆ | 长任务（几十分钟甚至几小时） |

案例：

本人之前复现的 [DeepSearch复现\_总结篇：直接面向api编程的智能体搭建范式](https://mp.weixin.qq.com/s?__biz=MzkxNjYxOTI1OA==&mid=2247484053&idx=1&sn=8829035d0c941f2299e01d53618ccf6a&scene=21#wechat_redirect) Deepsearch属于单线程

manus（ https://manus.im/ ）属于压缩中继类型

---

## 四、进一步探讨：对大模型上下文窗口的影响

当智能体范式从 **多线程回归单线程** ，也就意味着 **未来的大模型需要更关注上下文窗口（支持更长的上下文窗口）** ，正如sam altman在前些天的一个访谈节目(https://www.youtube.com/watch?v=qhnJDDX2hhU) 中提到的那样：

sam altman：

> 一个非常小的模型，拥有超人类的推理能力，运行速度极快，有 **1 万亿 token 的上下文窗口** ，并能调用你能想到的所有工具。在这个设定下，问题是什么、模型有没有现成知识或数据，其实都不重要"

---

  

继续滑动看下一个

CyPaul Space

向上滑动看下一个