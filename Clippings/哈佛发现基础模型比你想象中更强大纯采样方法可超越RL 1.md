---
title: "哈佛发现基础模型比你想象中更强大：纯采样方法可超越RL"
source: "https://mp.weixin.qq.com/s/BTWWEY5U6wpeRkMqiERtvg"
author:
  - "[[编辑部]]"
published:
created: 2025-12-02
description:
tags:
  - "基础模型潜力"
  - "幂采样算法"
  - "无训练推理"
abstract: "哈佛大学的研究表明，通过一种名为“幂采样”的无训练纯采样算法，基础语言模型在多项推理任务上的表现可以媲美甚至超越经过强化学习后训练的模型。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/gKaxjIx6bahSza2tTkzicFw7GCygicIR0f9Up9zFEWJqlcJRsdhtSxicWGETxcW3ev9d9qaceDLqE0eZAeg5U9iayg/0?wx_fmt=jpeg)

Original 编辑部 [深度学习自然语言处理](https://mp.weixin.qq.com/s/) *2025年10月21日 19:06*

重新审视基础模型的潜力！

近年来，大型语言模型在数学、编程、科学推理等领域展现出惊人能力，这通常归功于基于强化学习的后训练。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahSza2tTkzicFw7GCygicIR0fhybsmoOxfcHu4svcRlkR0l0EjiaAXwHPF2VoicGNib4g2U04ibeu1HicibKQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

然而，这篇论文提出了一个颠覆性观点： **基础模型本身已经具备强大的推理能力，只是我们尚未在推理阶段充分激发它** 。作者通过一种名为“幂采样”的无训练、无数据集、无验证器的纯采样算法，在多个推理任务上实现了与RL后训练相媲美甚至更优的性能。这不仅挑战了“RL才能提升推理”的主流观念，也为我们重新理解基础模型的潜力打开了新视角。

![Image](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahSza2tTkzicFw7GCygicIR0fSFAcFxIJ3ZGHzL3smjibQtQ0R7ee7kPLswVn4PeQqOsrF99VeGTsBUw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

- 论文：Reasoning with Sampling: Your Base Model is Smarter Than You Think
- 链接：https://www.arxiv.org/pdf/2510.14901

## 研究动机：为什么我们需要“无训练”的推理方法？

传统RL后训练虽然能提升模型在特定任务上的表现，但也存在明显缺陷：

- **训练成本高** ：需要大量调参、避免训练不稳定。
- **多样性下降** ：RL模型倾向于生成高置信度但相似的答案，导致在多样本场景下性能下降。
- **依赖验证器** ：许多RL方法需要可自动验证的奖励信号，这在开放域任务中难以实现。

论文指出，RL后训练可能只是对基础模型分布进行“锐化”，而非真正学习新能力。如果基础模型本身已具备推理潜力，我们是否可以通过更聪明的采样方法直接激发它？

![展示了GRPO样本在基础模型似然分布中高度集中，而幂采样样本分布更广，说明RL后训练确实导致多样性下降。](https://mmbiz.qpic.cn/mmbiz_png/gKaxjIx6bahSza2tTkzicFw7GCygicIR0fesSXibkFucoiaCLzAtKyb6wTVOJEyA1j2IIlcCeMeWkZvGZhNbVGaUoQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

展示了GRPO样本在基础模型似然分布中高度集中，而幂采样样本分布更广，说明RL后训练确实导致多样性下降。

## 方法核心：幂分布与MCMC采样算法

### （1）什么是“幂分布”？

幂分布是指对基础模型的概率分布进行指数加权，即从原始分布 转变为 ，其中 。这样做的好处是：

- **强化高似然序列** ：高概率的答案被进一步放大。
- **抑制低似然路径** ：避免模型陷入“看似合理但实际错误”的推理路径。

**公式解释** ：

- **符号含义** ：
- ：当前 token
	- ：之前的所有 token
	- ：之后的所有 token
	- ：锐化系数，控制分布集中程度
- **核心思想** ：幂分布不是简单地放大当前 token 的概率，而是考虑整个未来路径的似然性，避免“短视”决策。

### （2）幂采样 vs. 低温度采样

低温度采样是常见的推理优化方法，但它与幂采样有本质区别：

- **低温度采样** ：只放大当前 token 的条件概率，忽略未来路径。
- **幂采样** ：考虑所有未来路径的联合概率，更倾向于选择“虽然后续路径少，但每条路径概率高”的 token。

论文通过一个简单例子说明：在某些情况下，低温度采样会选择平均概率高但最终结果差的 token，而幂采样能识别出“关键 token”，引导模型走向正确推理。

![幂分布如何对原始分布进行锐化](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

幂分布如何对原始分布进行锐化

### （3）Metropolis-Hastings采样算法

由于直接采样幂分布计算成本高，论文采用MCMC中的Metropolis-Hastings算法进行近似采样。其核心步骤是：

- **初始化** ：从基础模型生成一个初始序列。
- **迭代重采样** ：
- 随机选择一个位置，重新采样后续 token。
	- 计算接受概率，决定是否接受新序列。
- **收敛目标** ：最终序列近似服从幂分布。

**算法优势** ：

- **无需归一化** ：直接使用似然比值，避免计算所有可能序列的概率和。
- **灵活性强** ：可使用任意提案分布，如基础模型本身。
![Metropolis-Hastings中随机重采样的过程](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Metropolis-Hastings中随机重采样的过程

### （4）分块采样与渐进优化

为了降低计算复杂度，论文提出分块采样策略：

- **分块处理** ：将长序列分成多个块，逐步采样。
- **渐进目标** ：从短序列的幂分布逐步过渡到长序列的幂分布。
![分块采样的流程](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

分块采样的流程

## 实验验证：多任务、多模型的全面评测

### （1）评测基准与模型选择

论文在四个任务上评测算法：

- **MATH500** ：数学竞赛题，可验证。
- **HumanEval** ：编程题，通过单元测试验证。
- **GPQA** ：高级科学选择题。
- **AlpacaEval 2.0** ：开放域帮助性问题，不可验证。

模型包括：

- Qwen2.5-Math-7B
- Qwen2.5-7B
- Phi-3.5-mini-instruct

### （2）主要结果：单次推理性能对比

论文显示，幂采样在多个任务上接近或超过GRPO（一种主流RL算法）：

- **MATH500** ：幂采样与GRPO性能相当。
- **HumanEval & GPQA** ：幂采样显著优于GRPO。
- **AlpacaEval 2.0** ：幂采样在开放域任务中表现更优。
![所有模型和任务的性能对比汇总](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

所有模型和任务的性能对比汇总

### （3）多样性分析：pass@k 性能

论文通过 pass@k 指标评估多样性：

- **GRPO** ：在 k 增大时性能饱和，说明样本重复率高。
- **幂采样** ：在 k 增大时性能持续提升，说明样本多样性好。

下列图表展示了不同任务上的 pass@k 曲线。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 深入分析：幂采样的特性与优势

### （1）推理轨迹的似然性与置信度

论文分析了生成答案在基础模型中的似然性和置信度：

- **GRPO** ：样本高度集中在高似然区域。
- **幂采样** ：样本分布更广，但仍偏向高似然区域。

### （2）响应长度与推理质量

RL后训练倾向于生成长答案，而幂采样也自然产生类似长度的答案，说明它捕捉到了RL模型的“长形式推理”特性。

### （3）超参数选择的影响

- **α值** ：α=4.0 在多数任务中表现最佳。α 过大或过小都会影响性能。
- **MCMC步数** ：步数越多，性能越稳定，但计算成本也越高。
![α和MCMC步数对性能的影响](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

α和MCMC步数对性能的影响

#### （4）计算成本分析

幂采样的计算成本约为标准推理的8.84倍，但与GRPO一个训练周期的成本相当。论文认为这是一种“推理时缩放”的可行策略。

## 案例研究：为什么幂采样更聪明？

论文通过具体例子展示幂采样与GRPO的差异：

- **编程题** ：幂采样生成正确代码，GRPO生成错误代码。
- **数学题** ：幂采样使用直接除法，GRPO错误使用数字和法。

下列图表展示了具体案例对比。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 结论与展望

### 核心贡献总结：

- **提出幂分布** ：作为推理任务的有效采样目标。
- **设计无训练采样算法** ：基于MCMC的幂采样方法。
- **实证验证** ：在多个任务上匹配甚至超越RL后训练模型。

### 研究价值：

- **重新定义基础模型能力** ：模型本身已具备强大推理潜力。
- **推动无训练推理方法** ：为资源受限场景提供新思路。
- **促进多样性保护** ：在多样本任务中保持高性能。

### 未来展望：

- **扩展到更多领域** ：如对话、创作等非验证性任务。
- **优化计算效率** ：减少MCMC步数，提升实用性。
- **结合其他采样策略** ：如与提示工程、思维链等结合。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

深度学习自然语言处理

向上滑动看下一个