---
title: Agentic RAG-R1：让大模型从「检索助手」跃升为「思考+搜索王者」！
source: https://mp.weixin.qq.com/s/2vg7PcC4mMhoK6eouQ2MIQ
author:
  - "[[Weixin Official Accounts Platform]]"
published: 
created: 2025-06-20
description: 
tags:
  - Agentic-RAG-R1
---
[PaperAgent](https://mp.weixin.qq.com/s/)

*2025年05月03日 12:10* *河南*

 Agentic RAG-R1 是由北京大学研发的一项开源研究项目，旨在推动语言模型在自主检索与推理能力方面的能力边界。该项目通过引入强化学习策略（GRPO），构建了一个可自我规划、检索、推理与总结的智能体式 RAG 系统。

核心亮点

1. 1\. Agentic RAG 架构：融合检索增强生成（RAG）与 Agentic AI 机制，模型不仅生成答案，还能“决定如何生成答案”。
2. 2\. 强化学习优化（GRPO）：借助 Generalized Relevance Policy Optimization，让模型学会更合理地选择检索和推理步骤。
3. 3\. 多轮推理与回溯能力：支持计划、回溯、总结等多种 agent 行为，实现人类式的问题解决流程。
4. 4\. LoRA 与量化支持：低成本微调与高效推理并存，轻松部署大模型至生产环境。
5. 5\. 丰富奖励机制：引入格式、准确性、RAG 表现等多个维度的奖励，训练出更“懂业务”的智能体。

Github项目地址： https://github.com/jiangxinke/Agentic-RAG-R1

> **“模型自主、工具自选、推理自洽”——Agentic RAG-R1 用强化学习把 RAG 带进智能体时代。**

---

## 📚 背景：为什么 RAG 需要 “Agentic”？

- • **事实性**：RAG 通过外部检索解决 “幻觉” 问题，但仍依赖人工提示来决定何时检索。
- • **上下文爆炸**：检索结果越多，拼接进上下文越长，反而稀释关键信息。
- • **多跳推理**：复杂任务需要 “查-思-查-思” 循环，仅一次检索难以覆盖。

**Agentic RAG-R1** 让模型在每一步“思考”时都能**自主**决定：

1. 1. **是否检索**？ —— 省掉无关调用，提高效率
2. 2. **检索什么**？ —— 人类不再手写复杂 prompt
3. 3. **如何引用**？ —— 自动将证据融入推理链

---

## 🏗️ 体系结构：全面的 Agentic 思考

### ✨ 核心理念：两大王牌技术的强强联合

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

\- 🔍 **检索增强生成 (RAG)**：在生成过程中**即时**从外部知识库检索信息，兼具语言模型的创造力与实时、可信的事实。

\- 🤖 **Agentic AI 智能体**：让模型**自主**决定何时检索、检索什么，以及如何把检索证据编织进推理链，真正做到“会思考、会行动”。

### 🏗️ 架构：基于 TC-RAG 的智能体思考循环

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

目前支持如下动作：

| # | 动作 | 说明 | 状态 |
| --- | --- | --- | --- |
| 1 | 🤔 **Reasoning（推理）** | 展开思考、提出假设 | ✅ |
| 2 | 🔄 **Backtrack（回溯）** | 回到上一节点，修正思路 | ✅ |
| 3 | 📝 **Summary（总结）** | 汇总已有证据，压缩上下文 | ✅ |
| 4 | 🛠️ **Tool Observation（工具调用）** | 访问 Wiki / 文档 / 知识图谱等 | ✅ |
| 5 | ✅ **Conclusion（结论）** | 输出最终答案 | ✅ |

---

## **🔬 技术细节深挖**

### Features ✨

| **组件** | **关键点** | **优势** |
| --- | --- | --- |
| **GRPO (Generalized Relevance Policy Optimization)** | 采样多条推理-检索轨迹，对“高相关、高准确、高格式”路径赋正奖励 | **训练稳定**  、收敛快，避免 RLHF 里的 Reward Hacking |
| **LoRA + NF4 量化** | 10 % 参数可训练，int-4 存储 | **GPU 省钱**  ，多实验迭代无压力 |
| **Deepspeed Zero-3** | 权重 & 优化器拆分到 CPU / NVMe | **3×A100 → 32B**   轻松起飞 |
| **多模态工具接口** | 支持文本、代码、数据库、REST API | 让模型在“真实工作流”里落地 |

> **奖励公式**: ( 
> 
> 其中 **r\_rag** 由 RAGAS 自动评测检索片段是否被有效引用。

### Rollout Generation 🔄

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

## **📊 结果：数据说话**

> **数据集**：**MedQA（中英双语）** | Judge Model：Qwen-2.5-72B

| **设置** | **格式准确率 ↑** | **答案准确率 ↑** |
| --- | --- | --- |
| 微调前 | 39 % | 84 % |
| 微调前 + 检索 | 56 % | 79 % |
| **微调后 + 检索** | **92 % (+53 %)** | **87 % (+3 %)** |

- • **跨语言**：中/英两份测试集均显著提升
- • **复杂推理**：多跳问题正确率提升 8 % 以上
- • **工具调用成功率**：> 95 %，日志可追溯
实际测试结果：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

## **💬 FAQ**

> **Q1：必须用 32B 模型吗？**

> **A1**：不需要！我们默认用 **Qwen-2.5-7B-Instruct**；你也可以换成 Llama-3-8B / Baichuan-13B，只需改配置。

> **Q2：RL 训练很复杂吗？**

> **A2**：脚本参数与常规 LoRA 差不多，多加一份奖励配置即可。CPU 显存不足？Zero-3 + Offload 轻松搞定。

---

## **📢 结语 & 口号**

> **“模型自主，检索在手；深度推理，靠谱出口！”**

> **“让 LLM 会自己找资料，再也不用 Ctrl + C / Ctrl + V！”**

  

推荐阅读

- • [动手设计AI Agents：（编排、记忆、插件、workflow、协作）](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247492838&idx=2&sn=1e25832e7300ef312721325d0def30b4&scene=21#wechat_redirect)
- • [DeepSeek R1 + Agent 的下半场](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247492838&idx=1&sn=9b9bf873261c9b2239b97b70effc441f&scene=21#wechat_redirect)
- • [单智能体（Agent）：企业员工AI助理](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247493278&idx=2&sn=ab698d56a22b8f70f6c8ad1db7495e4c&scene=21#wechat_redirect)
- • [Agent到多模态Agent再到多模态Multi-Agents系统的发展与案例讲解（1.2万字，20+文献，27张图）](http://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247485322&idx=1&sn=71ffb345fca514aa5ce2848cb2c9f071&chksm=c2ce3dfbf5b9b4edd5b98e45c6179890bdea748fb5220636d25f42006954ea5c81afa8735725&scene=21#wechat_redirect)

---

欢迎关注我的公众号“**PaperAgent**”，每天一篇大模型（LLM）文章来锻炼我们的思维，简单的例子，不简单的方法，提升自己。