---
title: "单卡3090可跑！清华WideSeek-R1全量开源：首创MARL“宽度缩放”，让4B 小模型靠“组织架构”，在广度搜索任务上逼近 671B"
source: "https://mp.weixin.qq.com/s/3PwMDYVwmV_02UaMtBEyiQ"
author:
  - "[[一只阔乐菌]]"
published:
created: 2026-02-10
description: "单卡3090可跑！清华WideSeek-R1全量开源：首创MARL“宽度缩放”，让4B 小模型靠“组织架构”，在广度搜索任务上逼近 671B"
tags:
  - "宽度缩放"
  - "多智能体协作"
  - "组织架构"
  - "降本增效"
abstract: "清华大学开源WideSeek-R1，通过首创的多智能体强化学习“宽度缩放”架构，让一个仅4B参数的小模型在广度信息搜索任务上，凭借“主官-下属”的组织协作能力，性能逼近671B的巨型模型，且可单张RTX 3090部署。"
---
Original 一只阔乐菌 *2026年2月6日 00:02*

请在微信客户端打开

▋推荐阅读：

[西交大联合百度开源AERO：不要数据，不要校验器，'双脱离'自进化框架，让模型自己出题、自己验证、自己迭代](https://mp.weixin.qq.com/s?__biz=MzE5MTcyNDg1OQ==&mid=2247488416&idx=1&sn=74848e08ba916f8e689798a9f3faa1cb&scene=21#wechat_redirect)

[能“主动记忆”“自我复盘”的智能体：MemSkill 框架开源，以“自主进化”提升 AI 长任务表现](https://mp.weixin.qq.com/s?__biz=MzE5MTcyNDg1OQ==&mid=2247488387&idx=1&sn=03554d625ebd214af26e0b01f9a035ce&scene=21#wechat_redirect)

[南加大 × 布朗大学 开源VideoGPA：蒸馏 3D 先验，解决视频扩散模型几何失常难题，拒绝生产视频变形、穿帮、画面乱](https://mp.weixin.qq.com/s?__biz=MzE5MTcyNDg1OQ==&mid=2247488354&idx=1&sn=c10c02ccf45f36f37eba0d9a1453d287&scene=21#wechat_redirect)

[百度开源“PaddleOCR-VL-1.5”刷新SOTA，不到 1B 参数超越 200B 大模型，文档理解打到 94.5%，手机拍歪、页面弯曲、屏幕反光精准识别](https://mp.weixin.qq.com/s?__biz=MzE5MTcyNDg1OQ==&mid=2247488310&idx=1&sn=71d0b4f1878a768fd0e937d31f00489d&scene=21#wechat_redirect)

[懂几何的 "AI 渲染器"来了！RefAny3D：3D 资产驱动，精准还原几何与纹理，无需材质球，一键渲染任意环境](https://mp.weixin.qq.com/s?__biz=MzE5MTcyNDg1OQ==&mid=2247488290&idx=1&sn=9c3fc72310ec138abde280892ada070f&scene=21#wechat_redirect)

[支持52种语言+92毫秒延迟（0.6b）+方言、歌声、噪音全搞定！阿里开源Qwen3-ASR，方言语音识别精度飙升](https://mp.weixin.qq.com/s?__biz=MzE5MTcyNDg1OQ==&mid=2247488252&idx=1&sn=98358382672c51d8411087ad391a4944&scene=21#wechat_redirect)

[大厂闭源的世界模型，蚂蚁免费开源了：LingBot-World支持WASD漫游+分钟级记忆](https://mp.weixin.qq.com/s?__biz=MzE5MTcyNDg1OQ==&mid=2247488273&idx=1&sn=a5aa5364b5d9e43bfabea4703f0c8662&scene=21#wechat_redirect)

[全自动写研报、查资料、内容审核、投资尽调！腾讯开源「云雀」DeepResearch：一套能自我纠错的企业级 Agent 框架，24小时帮你干活](https://mp.weixin.qq.com/s?__biz=MzE5MTcyNDg1OQ==&mid=2247488144&idx=1&sn=6dda827bb74c39a1ddd6ffabf351a7cf&scene=21#wechat_redirect)

[AI 视频迁移天花板：上传视频即复刻 字节开源OmniTransfer：上传视频 = 复刻特效 + 运动 + 身份 ID，AI 帮你 “搬运” 所有亮点](https://mp.weixin.qq.com/s?__biz=MzE5MTcyNDg1OQ==&mid=2247487886&idx=1&sn=0a010b1eba1acfc992c138ac2e6531e9&scene=21#wechat_redirect)

**![Image](https://mmbiz.qpic.cn/mmbiz_png/S5HUJPtnP11Wib4HjIsrnZ1gNfKiaialrLFGib8ZibXjpslkdkc4VTR09tmhHL2zmLs63LxNe1sicHulrnmdWbLQiagHZViaFl5n1OrC1wQbkY1HVOU/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)  
**

**资源导航：**

- • **论文链接：** https://arxiv.org/html/2602.04634v1
- • **项目主页：** https://wideseek-r1.github.io/
- • **GitHub Repo：** https://github.com/RLinf/RLinf
- • **Hugging Face (模型)：** https://huggingface.co/RLinf/WideSeek-R1-4b
- • **Hugging Face (数据集)：** https://huggingface.co/datasets/RLinf/WideSeek-R1-train-data
- • **发布机构：** 清华大学（EE、SIGS、IIIS）、交叉信息核心技术研究院（IIS）、无问芯穹（Infinigence AI）
- • **发布日期：** 2026年2月4日
- • **开源协议：** 遵循 GitHub 仓库具体声明

### WIDESEEK-R1：既然单兵作战卷不动“深度”，那我们就靠“组织进化”来卷宽度

大语言模型（LLM）的演进路径似乎已经形成了一个标准的“定式”：通过强化学习（RL）来拉长思维链（CoT），在测试时投入海量的计算资源来换取逻辑深度的跨越。不管是 DeepSeek-R1，还是 Kimi k2，亦或者是 OpenAI 的最新迭代，大家都在卷“深度”。

但今天我们要深挖的这个项目，来自清华大学联合团队的 **WIDESEEK-R1** ，却给出了一个完全不同、甚至有些“另辟蹊径”的答案。却在githb有着 2.4k 的高星。

简单总结： **WIDESEEK-R1 并不是让模型想得更久，而是让模型学会“分身”，通过多智能体协作（MARL）来解决那些海量横向信息的搜集任务。**

目前，单智能体模型在处理“广义信息寻求（Broad Information Seeking）”时，经常会遇到两个物理极限：一是上下文污染（Context Pollution），搜得越多忘得越快；二是串行效率极低，单线思考太磨叽。

WIDESEEK-R1 的核心亮点在于： **它实证了一个仅有 4B（40亿参数）的轻量级模型，通过一套“主官-下属”的组织协作框架，在处理超大规模信息整合任务时，表现出了与 671B 巨兽相当的效能。**

不得不说，这可能是 2026 年大模型领域在“降本增效”层面做得最硬核的一个尝试。

01

为什么深度缩放（Depth Scaling）不是万能药？

在拆解 WIDESEEK-R1 之前，我们得先复盘一下为什么“卷宽度”是刚需。

根据论文 Section 1 的论述，目前业界主流是 **Depth Scaling** 。其本质是让模型在处理长链条、多步骤问题时表现得更好。比如，解一个复杂的微积分题（Figure 1 左侧）。但当我们面对 **Broad Information Seeking** 时，比如“整理 2025 年全球 20 个最大国家的 GDP、人口及主导产业”，深度就显得力不从心了。

单智能体模型在面对此类任务时有两大死穴：

1. 1\. **上下文污染（Context Pollution）** ：模型在搜集第 15 个国家的信息时，其上下文窗口里已经堆满了前 14 个国家的搜索噪声。研究表明（Anthropic 2026），这会导致模型性能随交互轮次呈指数级退化。
2. 2\. **串行执行瓶颈** ：单兵作战只能一个一个搜。在工业应用中，这种线性的速度完全跟不上实时决策的需求。

WIDESEEK-R1 提出了 **Width Scaling（宽度缩放）** 。它不强迫一个大脑去处理所有信息，而是构建一个“组织”。

![Refer to caption](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*Figure 1：深度缩放与宽度缩放的范式对比。WIDESEEK-R1 核心在于通过多智能体强化学习（MARL）来协调组织化执行，在有限的计算资源下实现更高的任务覆盖宽度。*

（这就好比让一个博士生去搬完一整座图书馆，不如让一个领班带着十个中学生去并行搬书。WIDESEEK-R1 就是那个懂管理的“领班”。）

02

技术内核：这套“组织架构”是怎么练成的？

WIDESEEK-R1 的核心身份是： **一个主官（Lead Agent）带 N 个下属（Subagents）的层级化系统。** 论文 Section 3 详尽描述了这套系统背后的 MARL 训练回路。

### 1\. 共享模型，隔离上下文

这是一个非常聪明的设计（见 Section 3.1）。系统虽然有多个智能体，但它们底层 **共享同一个 4B 模型权重** 。

- • **主官（Lead）** ：拥有统筹权限，拥有名为 `call_subagent` 的特殊工具。它不直接去搜索具体数据，只负责把大目标拆解成小目标发给下属。
- • **下属（Subagent）** ：在完全独立的上下文空间运行。每个下属只能看到自己的那一小份任务，并配备了 `search` 和 `access` 两个高级工具。这种“隔离”彻底解决了上下文污染问题。

### 2\. 多智能体强化学习（MARL）与 GRPO（Section 3.3）

多智能体最难的是“信用分配”：如果最后表格里的数据错了，该怪主官没分好任务，还是怪下属没查准？

WIDESEEK-R1 扩展了 **GRPO（群组相对策略优化）** 算法（见 Figure 2）：

- • **Outcome Reward（结果奖励）** ：这是最实事求是的做法。不看中间过程，只看最后生成的 Markdown 表格是否准确、格式是否对齐。系统会将这一总奖励平均分配给所有参与协作的 Agent。
- • **双层重加权机制** ：
- • **Token 级** ：确保长推理回合不被淹没。
- • **Agent 级** ：这是论文中漏写的亮点：它能有效防止主官为了刷步数而恶意产生冗余下属。只有当下属的数量增长带来了最终奖励的提升，这种行为才会被正向强化。
![Refer to caption](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*Figure 2：训练与推理全景图。清晰地展示了从 Query 输入到主官拆解，再到子智能体并行调用搜索/访问工具，最后通过双层重加权 GRPO 进行同步优化的闭环。*

03

怎么用之数据引擎：2 万个“广度任务”的自动化炼金术

多智能体训练最怕数据荒。现有的 GSM8K、MATH 数据集全是“纵向逻辑”，根本没法练出“组织管理能力”。

团队实事求是地构建了一个名为 **WideSearch** 的 20k 数据集（Section 4）。 其流水线（Figure 3）分为三步：

1. 1\. **意图抽取** ：从 HybridQA 数据集中提取原始用户需求。
2. 2\. **模式约束查询生成** ：利用 Gemini-3-pro-preview 强制模型将简单的需求转化为复杂的“模式约束”问题。比如：“查人口”变成“整理 20 个国家的人口、GDP，并要求用 Markdown 格式输出”。
3. 3\. **一致性过滤** ：这一步最硬核。利用 Gemini 同时生成两份独立参考，通过单元格级别的 Match rate（阈值 > 0.9）来过滤脏数据。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*Figure 3：自动化数据构造 Pipeline。它将原本非结构化的互联网意图，转化成了包含复杂表格约束的“广度任务”真值，单条生成成本低至 0.1 美元。*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*Figure 7： 统计了数据集（N=20,000）中真实答案表的维度分布：表格行数中位数约 30、列数中位数约 6，列数以 4-6 列为主（占比超 90%），行数集中在 10-50 行。按中位数维度（40×5）计算，单表约含 200 个单元格，这要求模型在单次任务中精准完成大量数据点的搜集与一致性维护。*

  

04

实测数据中的“跨级挑战”

为了保持绝对客观，我们要看一看论文中最具冲击力的实验对比（Table 1）。

**Table 1：WideSearch 综合性能对标。** *(PS：Item F1 衡量的是单元格准确率，Row F1 衡量整行正确率。)*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*(数据来源：论文 Table 1。注：Ours 仅使用了 4B 参数量级的基座。)*

**实事求是的观察：**

1. 1\. **降维打击** ：你会发现，经过组织优化后的 4B 模型，其单元格准确率（40.0%）已经可以与参数量大它 170 倍的 DeepSeek-R1 全血版（41.3%）平起平坐。
2. 2\. **单兵瓶颈** ：未经 MARL 训练的 Qwen3-4B 单机版本只有 20.1%。这实证了：在广度任务中，增加参数规模带来的边际收益，远不如增加协作宽度。
![Figure 4. Comparison of depth and width scaling in performance.](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Figure 4. Comparison of depth and width scaling in performance.

*Figure 4：缩放曲线对比。深度缩放（蓝色）在 50 Turns 左右就进入了性能平台期；而 WIDESEEK-R1 的宽度缩放（红色）随着 Subagent 数量从 1 增加到 10，表现出了近乎线性的增长态势。*

05

核心亮点：“主官”的人格化进化（Section 4.5）

很多人可能会说，这不就是加个“并发执行”吗？我自己写个 Python 脚本并行调用 API 不行吗？

**论文给出的答案是：不行。**

传统的 hand-crafted 脚本是死板的。而 WIDESEEK-R1 训练出的“主官”，进化出了真正的 **统筹智能** （见图 5）。

- • **精准分发** ：它能根据查询的复杂程度，动态决定要分出 3 个下属还是 10 个下属。
- • **Prompt 优化** ：在消融实验中发现，经过训练的主官给下属写的 Prompt（Task Guidance）质量极高，能有效防止下属“跑题”。
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*Figure 5：角色消融实验。数据清晰显示，单纯升级下属（Sub Only）或单纯升级主官（Lead Only），其 Row F1 的提升都远不如“全家桶优化（Both Agents）”。这证明了组织协作中“上下对齐”的不可替代性。*

06

降本增效的 Infra 细节 (Section D)

对于工业界来说，部署成本就是生命线。WIDESEEK-R1 提供了一套非常实务的方案：

1. 1\. **硬件门槛** ：4B 参数量级意味着单张 **RTX 3090/4090** 就能实现本地化部署。相比起运行 DeepSeek-R1 全血版需要数台 8 卡 A100 节点，这个成本降低了几个数量级。
2. 2\. **推理延迟** ：由于采用了并行架构，以前单智能体需要串行搜索 20 轮的任务，现在可以压缩到主官的一次拆解 + 10 个下属的一次并行返回。响应时间大幅度降低（预估60%， 这是根据并行机制推算的理论值，而非论文实测数据 ）。
3. 3\. **框架支持** ：GitHub 上的 **RLinf** 仓库（Section 15 脚注）提供了针对 VLLM 和 SGLang 的深度适配，支持 Tensor Parallel。
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*Figure 8：典型的训练/测试样本。它要求模型根据自然语言意图，生成结构化 JSON，其中包括了 unique\_columns 这种工程级别的识别码。这种实事求是的格式化能力是其落地的基础。*

07

局限性 (Section A)

保持绝对中立是我们的基本心法。虽然 WIDESEEK-R1 很亮眼，但它目前还有几个客观存在的挑战（Section A）：

1. 1\. **训练算力的“代价”** ：虽然推理省钱，但训练由于涉及 MARL 的大规模 Rollout，其实很吃配置。论文提到，训练 4B 版本消耗了约 **3,000 个 H100 GPU 小时** 。这依然是普通开发者难以负担的成本。
2. 2\. **信用分配的模糊性** ：目前的奖励依然是 outcome-based。这意味着如果 10 个下属里有 9 个干得好，1 个干砸了导致整个表格失败，那 9 个好下属也会被一起“惩罚”。这种粗放的信度分配，在逻辑链条极长时可能会产生学习噪声。
3. 3\. **层次结构的“死板”** ：目前实验被限制在固定的 2 层结构（主官-下属）。论文提到，如果允许下属再去招下属（无限递归），状态空间会瞬间爆炸，目前的 MARL 算法还做不到稳定收敛。
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*Table 2： 通用问答能力测试。虽然 WI DESEEK-R1 在广度任务（W i d eS e a r c h）上无敌，但在传统的 M u lt i - h o p 问答上， 它更多是与 AgentFlow-7B、OWL-8B 等同量级或稍大的模型互搏（且在多数指标上胜出），而非像在广度任务中那样跨越百倍参数去挑战巨型模型。 这说明它的本质是一个‘专业技能’的强化，同时保持了通用智力不掉队。*

08

资源获取建议

目前清华团队在 GitHub 和 Hugging Face 采取的是全量释放的姿态。

- • **模型获取** ：国内开发者建议优先从 ModelScope 获取镜像。
- • **训练数据集** ： `WideSeek-R1-train-data` 是目前开源界极其稀缺的高质量“任务拆解-协作”类数据集。即便你不打算复现 WIDESEEK，这 2 万条数据拿去做 SFT（监督微调）提升你家 Agent 的逻辑感，也是极好的“补药”。

（根据 Figure 6 的对比，哪怕你不用 MARL，只用这套混合了 Wide 和 Deep 任务的数据集去做基础训练，其收益也比纯单一数据要高得多。）

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

*Figure 6：数据集对比。混合数据集（Hybrid）的表现全面占优，这再次印证了：大模型的进化不仅在于算法，更在于“见多识广”的数据配方。*

09

写在最后

WIDESEEK-R1 的出现，实事求是地捅破了一层窗户纸： **我们不应该指望一个“全知全能”的模型搞定一切，而应该建立一套“全流程优化”的组织系统。**

清华团队通过 3,000 H100 小时的投入，向世界证明了：在特定的信息寻求任务中，4B + 良好的组织结构 = 671B + 卓越单兵素质。

这不仅是算力的博弈，更是架构的博弈。

如果你正面临着知识库搜素性能遇到瓶颈、API 费用居高不下等问题，WIDESEEK-R1 提供的这套基于 MARL 的“宽度缩放”方法论，绝对值得你拉取代码深度研究。

（去 GitHub 给团队点个 Star 吧。这种实打实公开数据集、公开全量 Prompt（ Appendix G ）的真诚项目，才是 2026 年开源社区的脊梁。）

**参考资料：**

- • *Table 1, 2, 3 及 Figure 1-8 均引用自论文《WIDESEEK-R1: Exploring Width Scaling for Broad Information Seeking via Multi-Agent Reinforcement Learning》官方文件。*
- • *文中所有技术细节和数据表现均依据 arXiv:2602.04634v1 原始实验记录。*
	请在微信客户端打开

  

作者提示: 个人观点，仅供参考

继续滑动看下一个

一杯阔乐聊ai

向上滑动看下一个