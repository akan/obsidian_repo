---
title: "Agent 设计GPU算子新突破！MIT韩松团队成果超越FlashInfer竞赛人类最优方案"
source: "https://mp.weixin.qq.com/s/EdsEt5qKP-kQC6hiU_7FrA"
author:
  - "[[关注 AI 开源]]"
published:
created: 2026-09-23
description: "从MLSys比赛提交到1.69倍加速~"
tags:
  - "MIT韩松实验室"
  - "KDA v0.5"
  - "GPU算子优化"
  - "CuTe-DSL"
  - "GDN Prefill"
  - "FP8 MoE"
  - "DSA Attention"
  - "FlashInfer竞赛"
  - "NVIDIA B200"
  - "性能分析闭环"
  - "开源复现"
abstract: "MIT韩松团队发布KDA-v0.5，用Agent生成的GPU算子在三个任务上超越FlashInfer竞赛优胜者的公开实现，最高性能提升约69%。"
---
关注 AI 开源 智猩猩AI *Sep 23, 2026, 12:37 PM*

智猩猩AI整理

编辑：BugMaker

让AI写Python、写网页已经很常见，但到了GPU底层，情况完全不同。

GPU算子（GPU Kernel）是直接运行在GPU上的计算程序。代码写对只是第一步，线程怎么安排、数据怎么搬、显存怎么访问，都可能决定最终速度。过去这类优化很依赖工程师反复测试和性能分析。

现在，Agent也开始往这里走了。

MIT韩松实验室（MIT HAN Lab）上月底公开了Kernel Design Agents（KDA，算子设计智能体）v0.5的最新成果。

团队利用KDA生成了3个面向NVIDIA B200 GPU的高性能算子，并开放代码用于验证。这些算子均基于CuTe-DSL（一种面向GPU算子开发的领域特定语言）实现，分别覆盖GDN Prefill、FP8 MoE和DSA Attention三类任务。

最醒目的还是性能。

团队基于MLSys 2026 FlashInfer AI Kernel Generation Contest公开测试任务，与比赛优胜者公开实现进行了性能对比。

**GDN Prefill达到Kachua公开实现的1.688倍，DSA Attention达到Dogacel公开实现的1.408倍，FP8 MoE达到Team Wombat公开实现的1.173倍。**

在目前公开的3项测试中，KDA-v0.5均超过对应优胜者的公开实现，最高性能提升达到约69%。

而从KDA早期版本参赛到此次v0.5更新，时间仅过去约3个月。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/zJVQUll3YIYrPia2jbH1R7uzAmVfkWXib0TX6SuLn4WF32Gm57pEicsGTfgZzPq1Bx0pN0GfCmXMicvrvtictIIhvN155k8XoNv4iamplrGq1lVnA/640?wx_fmt=png&from=appmsg#imgIndex=0)

***01***

**从比赛版KDA-v0.1，**

**继续迭代到v0.5  
**

KDA不是一个专门生成CUDA代码的模型。

它更接近一套 **面向GPU算子优化的Agent工作流** 。在KDA的设计中，Coding Agent需要围绕性能敏感的CUDA任务完成研究、实现、验证和持续迭代。

换成更具体的场景，就是给Agent一道算子优化题。

它先搞清楚目标和限制，再设计方案、写代码、验证正确性、跑性能测试。如果结果还不够好，就带着上一轮留下的数据继续改。

**真正重要的不是“写出一个GPU算子”，而是让Agent能够一轮轮把它压得更快。**

这套流程此前已经在MLSys 2026 FlashInfer AI Kernel Generation Contest中进行过实战。这是一项面向GPU算子优化的竞赛，参赛团队需要围绕高性能GPU算子设计与优化任务展开竞争，其中HAN Lab团队采用Agent辅助完成GPU算子设计。

在这场比赛中，HAN Lab Kernel Mafia团队在Full-Agent赛道获得了Fused MoE第一名、Sparse Attention第二名和Gated Delta Net第三名。

![Image](https://mmbiz.qpic.cn/mmbiz_png/zJVQUll3YIZqg9v0zib46gkAicGJKQbjUrdnAZefOpgJJRNEzt11hMQrxUfy5sYptEL7IzKpuSBcoP97UpCH0sSANoIUIUNWkDaWQ3ZbUacc8/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

KDA-v0.5仓库明确写明， **KDA-v0.1是团队当时的原始比赛提交版本，v0.5则是之后继续迭代得到的新版本** 。

比赛已经结束，变化发生在赛后。比赛公开的任务和测试环境仍然可以用于后续验证，团队继续升级KDA，再把新版本生成的算子放回这些任务里测试。

![Image](https://mmbiz.qpic.cn/mmbiz_png/zJVQUll3YIbcGL5Z2FDNVYaSczSFib6PxrE8GsOkn6BO5qpbP721A7Vbicvm1r6P7HXNRcw4qLfU7IDNOK5VMOjrVHdHWpyhtEVz7DvfzLKX4/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

***02***

**三项算子重新测速，最高达到优胜者**

**公开实现的1.69倍  
**

这次KDA-v0.5没有覆盖比赛里的全部任务，目前公开的是3个纯CuTe-DSL算子。

其中差距最大的是 **GDN Prefill** 。

GDN即 **门控增量网络（Gated Delta Net）** ，Prefill指模型一次性处理输入上下文的预填充阶段。

在仓库给出的结果中，KDA-v0.5相对FlashInfer官方封装基线达到 **10.36倍** ，Kachua公开的优胜实现为6.06倍。

双方直接比较，KDA-v0.5达到其 **1.688倍** 。

也就是这次“最高快约69%”的来源。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/zJVQUll3YIbaTu9Zn2kvqNMfyoLKl4YZ7U1xkqyKlACnUpgJqicbZaFhCibYkuDzeqianQ402zjiarHJD9YEwpQxalv3GB39WVAIJRDy6DDTSUU/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

另外两项也超过对应优胜者的公开实现。

**DSA Attention达到Dogacel的1.408倍。**

DSA是 **DeepSeek稀疏注意力（DeepSeek Sparse Attention）** ，通过减少不必要的注意力计算，降低长序列场景下的计算开销。

FP8 MoE则是采用FP8低精度格式进行混合专家模型（Mixture of Experts，MoE）计算的任务。

这一项上，KDA-v0.5达到Team Wombat公开实现的 **1.173倍** 。

不过，这里的结果并不是赛事官方重新排名。

比赛时期和这次复测使用的计时协议并不完全相同。仓库明确提醒，现在给出的倍数属于当前FlashInfer-Bench协议下的直接延迟比较，不能直接拿它改写当年的正式比赛成绩。

因此，更准确的说法是：

**KDA-v0.5目前公开的3个算子，在赛后重新测试中都超过了对应优胜者的公开实现。**

***03***

**Agent开始自己看性能，再决定**

**下一版怎么改  
**

从朱力耕这次公布的信息看，v0.5的变化不只在最后生成出的3个算子。

团队把 **CuTe-DSL原语、Humanize2工作流、自进化Kernel-Wiki以及IKET性能分析技能** 整合进了新的优化流程。

其中一个重要变化，是加入更强的性能分析（Profiling）能力。

GPU算子跑慢以后，只知道“这一版分数不好”是不够的。Agent还需要判断问题出在计算、访存还是具体输入形状，再决定下一轮修改什么。

所以KDA的方向并不是简单增加更多代码生成次数。

它在尝试建立一个更完整的闭环：

**写算子 → 检查正确性 → 实际测速 → 找性能瓶颈 → 再改下一版。**

这也解释了为什么KDA仓库会专门要求保存运行记录、性能分析文件、Benchmark结果和不同候选版本。

![Image](https://mmbiz.qpic.cn/mmbiz_png/zJVQUll3YIYjA7lBCEIcfIxoS3qP4R8mrlawyW4EjKJ3Ihc3vnCfqPXDjcJYyCykHxxFTxJF3LzR1u9Khf1H42npAPhDFma9fqMhxiaiaRqibw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

目前仓库已经开放3个生成算子、逐任务测试结果和复现代码。

复现实验要求 **NVIDIA B200和CUDA 13驱动** 。KDA-v0.5与公开实现的对比测试采用CUDA 13.0、PyTorch 2.12.1和CuTe-DSL 4.6.0，预热3次后运行50次，并重复3轮。

![Image](https://mmbiz.qpic.cn/mmbiz_png/zJVQUll3YIbJ8nqiarnp5ibwibLboPetKeiaTg4s1iaKR2LT2qMVNojdzCctKysbKgbfsbHWq3DQNEPz7qsuD11kSN3j3NaXUicRGyFNvhhzVoARk/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

不过，团队现在开放的重点仍是 **KDA-v0.5生成后的算子和验证代码** 。

完整的v0.5技术细节还没有全部公布，README也明确表示后续还会继续更新。

过去看Coding Agent，大家更关心它能不能把代码写出来。

**代码写出来之后，Agent能不能像GPU工程师一样继续盯着性能，把同一个算子一版版改快。**

KDA-v0.5展示的并不是简单的代码生成能力，而是让Agent开始参与GPU性能优化这一长期依赖专家经验的过程。

**END**

**关注+星标，获取AI前沿进展与开源一线动态**

AI 开源动态 · Table of Contents