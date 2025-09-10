---
title: "专为Deep Research设计！蚂蚁提出新型强化学习框架，引入原子思维范式与奖励机制"
source: "https://mp.weixin.qq.com/s/XMxeLRoKkHNZeFdWHFeSfA"
author:
  - "[[六一]]"
published:
created: 2025-09-10
description: "原子思维解决梯度冲突与奖励稀疏问题~"
tags:
  - "原子思维"
  - "强化学习"
  - "梯度冲突"
  - "奖励稀疏"
  - "深度研究"
abstract: "蚂蚁团队提出Atom-Searcher框架，通过原子思维和细粒度奖励机制解决深度研究中的梯度冲突与奖励稀疏问题，实现SOTA性能。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/DPAHibibAl3vS3F0SXIT7d3vtzet7NrjYlSwEiaTHP7OCz2ic6wibnpC6mlSpuUJOKfGGzfgR0XKefq9ITPtANldibWQ/0?wx_fmt=jpeg)

Original 六一 [智猩猩GenAI](https://mp.weixin.qq.com/s/) *2025年09月10日 11:12*

智猩猩GenAI整理

编辑：六一

  

深度研究系统因其能够自主进行推理、搜索和信息整合已成为新搜索范式。然而，当前基于结果的强化学习方法存在梯度冲突和奖励稀疏等关键问题，制约了其性能提升和训练效率。

  

针对这些挑战，蚂蚁团队提出 **原子思维** （Atomic Thought），一种新颖的LLM思考范式，将推理过程分解为细粒度功能单元。这些单元由推理奖励模型（RRM）监督，通过原子思维奖励（ATR）提供细粒度指导。在此基础上进一步提出 **Atom-Searcher，一个集成原子思维与ATR的新型强化学习框架** ，专为深度研究设计。该框架采用基于课程学习的动态奖励聚合方法，早期侧重过程级ATR奖励，后期逐步过渡到结果奖励，从而加速有效推理路径的收敛。

  

实验表明，Atom‑Searcher在领域内和领域外基准测试中均实现了 **SOTA性能** 。其主要优势包括：实现了测试时的计算扩展；原子思维为RRM提供了监督锚点；展现出更具可解释性的推理模式。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/DPAHibibAl3vS3F0SXIT7d3vtzet7NrjYlgTs6jcvn4KzLRmZC70weSt3xZmacEw5m9JIc8d0ZOvwufxjic3MImeA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0) ![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/DPAHibibAl3vS3F0SXIT7d3vtzet7NrjYlVvgrY0Lq28LOJiaawoRhdj51pxgpqBI3olJ3dRbltz16oU5icvK1dTUA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

  

- 论文标题：Atom-Searcher: Enhancing Agentic Deep Research via Fine-Grained Atomic Thought Reward
- 论文链接：https://arxiv.org/abs/2508.12800
- 项目地址：https://huggingface.co/dikw/Atom-Searcher/tree/main

***01***

**理论**

  

论文受哲学思维概念和足球等领域动作结构化分解的启发，定义了大语言模型推理过程中的 **原子思维** ，指最小且功能连贯的推理单元，形式不可再分，但对模型推理轨迹不可或缺。原子思维间的交互共同构成功能完整的推理或行为过程。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/DPAHibibAl3vS3F0SXIT7d3vtzet7NrjYlbH9zrxIKcicvAlShib47RGYfWEbZibPaibqwSWMibpjAMnBOgbu7RzowtMw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

  

在实现中，将大语言模型的推理过程封装在 内，并将原子思维结构化为其中的子标签。重要的是，模型不受预定义原子思维的限制，而是被激励自主生成原子思维，从而学会在不同场景中将推理分解为任务特定的原子思维。

  

***02***

**方法**

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/DPAHibibAl3vS3F0SXIT7d3vtzet7NrjYlxyMwIFMA4Bjd2Nu4WhCAziaxhgbhLFvpQp4zdXtJrbKeLqUn7LZY15A/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

**1.监督微调（SFT）**

首先构建含1000个标注样本的高质量数据集 ：

  

- **合成原子行动提示** ： 设计10个种子系统提示模板（各含2个原子思维示例），利用强大的教师模型基于种子模板生成包含独特原子思维组合的系统提示，再结合不同问题及可调用搜索工具形成最终提示；
- **采样高质量推理轨迹** ： 基于提示使用Qwen2.5-72B采样推理轨迹，采用多数投票策略确保质量。

  

通过对 在 上 **监督微调** 得到具备原子思维先验知识的模型 。

  

**2.奖励建模**

**构建细粒度原子思维奖励** ： 使用推理奖励模型（RRM，利用大型推理模型生成奖励）对策略模型生成的原子思维进行评分，从而得到原子思维奖励（ATR）。RRM在需要细粒度监督、自适应推理和无标准答案的开放式任务场景中表现突出，这与原子思维的特性契合。该过程可表述为：

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/DPAHibibAl3vS3F0SXIT7d3vtzet7NrjYlWVyfXmQ7E5ubt1KibpnjuX6ZRyv9mdKTzuIByiaQ4w15mfFPSrKHlNibg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=9)

  

其中， 表示评分提示， 指生成的轨迹， 表示第 i 个原子思维的得分， 表示聚合得分。 不固定，可以是简单平均值或更复杂的加权策略， 表示轨迹 的原子思维奖励。

  

**基于课程学习的动态奖励聚合方法** ： 结果奖励的关键局限在于其粗糙的信用分配机制：它将中间推理的正确性完全归因于最终答案，往往不论实际贡献而对推理步骤进行奖励或惩罚。这种错位会在优化过程中引发梯度冲突。为解决此问题，论文将原子思维奖励（ATR）与结果奖励聚合，使用ATR作为辅助信号来校准最终奖励，从而缓解梯度冲突并提升测试时性能。

  

然而，采用静态权重系数进行奖励聚合难以契合训练动态：在训练初期，模型深度研究能力有限，难以生成完全正确的答案，但更可能探索有助于正确解决方案的有益原子思维。若此阶段仅依赖结果奖励，这些有益原子思维可能因最终答案错误而受到不公正惩罚；反之，有害原子思维也可能被错误强化，导致严重梯度冲突，此时需要ATR进行强力校准。随着训练推进，模型深度研究能力提升，其推理轨迹与正确答案逐渐对齐。梯度冲突随之减少，而过度的ATR校准可能引入不必要的噪声，反而损害最终准确性。

  

为此，论文采用训练动态感知的权重方案，随训练进程线性降低ATR的贡献权重，其数学表述如下：

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

其中， 表示当前训练步数， 表示最大训练步数。 表示用于强化学习训练的最终奖励， 表示基于 分数计算的结果奖励。系数 是平衡训练过程中原子思维奖励与结果奖励影响程度的超参数。 表示预测答案的词数， 表示参考答案的词数， 表示两者交集的词数。

  

**3.强化学习框架**

**策略优化** ： 采用GRPO算法优化策略 ，该优化基于聚合最终答案正确性与推理质量的混合奖励 。GRPO通过参考策略 和先前策略 生成的轨迹来改进当前策略 。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

此外，为缓解策略优化过程中的熵崩溃问题，论文采用基于滑动窗口的熵调节机制。

  

**损失掩码** ： 在原始GRPO框架中，损失计算涵盖轨迹中的所有token。然而在Atom-Searcher中，轨迹包含由环境外部获取（而非策略本身生成）的检索结果。为防止策略更新偏向不可训练的静态内容，在上述计算过程中，仅包含模型推理内容和搜索查询对应的token，源自检索结果的token则被掩码处理。

  

***03***

**实验**

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

论文使用Qwen2.5‑7B‑Instruct作为骨干模型。默认情况下，使用Qwen3‑30B‑A3B作为推理奖励模型。

  

主要实验结果如表1所示，Atom-Searcher在领域内和领域外基准测试中均显著优于基于提示工程和基于训练的基线方法。

  

**1.领域内基准测试性能优势**  
  

在领域内测试中，Atom-Searcher在TQ、HotpotQA和2Wiki基准上均取得最佳性能，较次优结果分别提升4.3%、2.5%和12.1%。值得注意是，虽然Search-r1-base在NQ数据集上取得最优性能，但其训练和评估均基于可直接访问维基百科语料的本地RAG系统，而Atom-Searcher需在整个互联网中寻找信息，尽管最终答案同样源自维基百科，但面临更现实且更具挑战性的场景。

  

**2.领域外泛化能力验证**  
  

在领域外测试中，Atom-Searcher在Musique和PopQA基准上表现最佳，较次优结果分别提升1.8%和3.7%。在Bamboogle数据集上虽位列第二，但仅与最优结果相差0.4%。表明Atom-Searcher能有效将强化学习期间掌握的技能泛化至未见场景。

  

**3.测试时计算扩展**

**![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)**

  

为验证Atom-Searcher能否在测试时有效扩展计算量，论文对比了其与DeepResearcher在测试阶段的平均生成token数。如表3所示：Atom-Searcher的平均响应长度相比DeepResearcher提升3.2倍；响应内单次思考过程的平均长度提升2.6倍；每次响应的平均工具调用次数增加1.24倍。表明Atom-Searcher架构在未引入额外激励的情况下，有效实现了测试时扩展（Test-Time Scaling），凸显了其在处理复杂深度研究任务时更强的探索与发现能力。

  

**END**

  

✦

✦

**推荐阅读**

✦

## 突破任意比特通信瓶颈！美团英伟达提出FlashCommunication V2，加速LLM分布式训练与部署

## LLM后训练新范式！字节提出后完成学习PCL：在后完成空间进行SFT与RL混合训练

## 图灵奖得主Sutton最新成果！拓展强化学习到控制领域，有望媲美深度强化学习

## Hugging Face周榜第一！人大高瓴与快手联合提出ARPO强化学习算法，专为Agent而生

## 华人团队开源世界首个多智能体记忆系统MIRIX：准确率较Gemini提高410%，存储需求降了9成

  

**点击下方名片 即刻关注我们**

继续滑动看下一个

智猩猩GenAI

向上滑动看下一个