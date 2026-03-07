---
title: "Google最新研究：训练LLM时故意\"丢掉\"一半梯度，效果反而吊打Adam和Muon？"
source: "https://mp.weixin.qq.com/s/o37b62f5E24Vf5a1z4Z1jQ"
author:
  - "[[ITADN]]"
published:
created: 2026-03-04
description:
tags:
  - "随机掩码"
  - "梯度更新"
  - "隐式正则化"
  - "优化器改进"
abstract: "Google研究发现，在训练大语言模型时随机跳过50%的参数更新，通过隐式引入曲率相关的正则化项，反而能获得比Adam和Muon等主流优化器更好的性能。"
---
Original ITADN *2026年2月23日 20:36*

> 📄 论文： *On Surprising Effectiveness of Masking Updates in Adaptive Optimizers* 🏢 机构：Google & Northwestern University
> 
> 📅 发布：2026年2月17日 | arXiv: 2602.15322

---

## 又是什么狠活？

**Google发现：训练大模型时随机跳过50%的参数更新，不仅不会变差，反而比所有主流优化器都强。基于此提出的Magma方法，在1B模型上比Adam降低19% perplexity，比当红炸子鸡Muon降低9%。**

---

## LLM优化器的"军备竞赛"走进了死胡同

今天训练大语言模型，优化器几乎被Adam一统天下。但随着模型规模暴涨到百亿、千亿参数，一个核心矛盾越来越突出：

**Transformer的损失曲面（loss landscape）极度病态。**

具体来说，有三大瓶颈：

1. **曲率异质性严重** ：不同参数块（attention、MLP、embedding）的Hessian谱差异巨大，有的方向极陡，有的极平。Adam的对角预处理根本应付不来。
2. **重尾梯度噪声** ：自回归训练天然产生重尾分布的梯度噪声，导致训练不稳定，loss spike频发。
3. **优化-泛化矛盾** ：追求更快收敛往往收敛到尖锐极小值（sharp minima），泛化性能反而变差。

学界的主流应对策略是一个字： **加** ——加更精确的曲率估计（Muon、SOAP用矩阵级预处理），加更复杂的梯度分组（SGG），加额外的扰动步（SAM需要两次前向/反向）。

代价？计算开销大、实现复杂、调参困难。

> 问题来了：有没有可能， **做减法** 反而更好？

---

## 反直觉的发现：丢掉一半更新，效果更好

Google团队做了一个大胆的实验—— **SkipUpdate** ：

- 将模型参数分成若干block
- 每一步训练，对每个block独立抛硬币（Bernoulli 0.5）
- 正面→正常更新（乘以2补偿）；反面→ **直接跳过这个block的参数更新**
- 但是！ **动量状态始终密集更新**

结果令人震惊👇

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

跨模型规模的预训练性能对比

**在60M到1B的所有模型规模上，随机丢掉一半更新的SkipUpdate，全面超越了Adam、Muon、SOAP等所有密集优化器。**

这完全违反直觉：你花了100%的计算成本算梯度，却只用其中50%来更新参数，怎么可能更好？

---

## 为什么"丢掉"反而更好？隐式几何正则化

论文给出了严格的理论解释。通过对期望损失做二阶Taylor展开，他们证明了一个优雅的命题：

**随机block-wise masking在期望损失中隐式引入了一项曲率相关的正则项：**

这个正则项的物理含义极其清晰：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**也就是说：**

- 如果某个方向的曲率很大（loss面很尖锐），正则项 就大 → 优化器被"惩罚"远离这个方向
- 如果某个方向曲率小（loss面平坦），正则项小 → 优化器自然偏好走这条路

**效果等价于：不用任何额外计算，就免费获得了一个SAM（Sharpness-Aware Minimization）式的平坦性正则化。**

这也解释了为什么Transformer上效果特别好——Transformer的Hessian恰好具有显著的block对角结构，正好匹配block-wise masking的正则化粒度。而在ResNet（曲率结构更均匀）上，Magma就没有明显优势。

---

## Magma：在SkipUpdate基础上再进一步

SkipUpdate的masking是完全随机的，对所有block一视同仁。但Transformer中不同参数块的"脾气"差异很大——有的Hessian谱条件数极高，有的梯度方差巨大。

**核心洞察：如果当前梯度和历史动量方向一致（cosine similarity高），说明这是一个可靠的优化信号；如果方向矛盾，大概率是噪声在捣乱。**

于是Magma在SkipUpdate上叠加了一个 **动量-梯度对齐分数** 来智能调制：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**Magma的更新规则只有两行伪代码：**

```
# 对每个参数block b:
s_t = sigmoid(cossim(momentum_b, grad_b) / tau)  # 对齐分数
s_t = 0.9 * s_prev + 0.1 * s_t                   # EMA平滑
mask = Bernoulli(0.5)                              # 随机掩码
param_b -= s_t * mask * update_b                   # 调制更新
```

Magma本质上是一个 **纯粹的wrapper** ：你原来用什么优化器，就在外面包一层Magma。不修改优化器内部逻辑，不增加任何显存，不增加计算开销。

---

## 与学界主流方法的根本性差异

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

| 维度 | 学界主流做法 | Magma |
| --- | --- | --- |
| **核心策略** | 更精确的预处理器（更好地利用梯度） | 故意丢弃更新（利用"不用"的力量） |
| **正则化方式** | SAM需要额外前向/反向传播 | 零成本隐式几何正则化 |
| **曲率信息** | SOAP/Muon需要显式矩阵分解 | 通过随机性隐式获得曲率敏感性 |
| **与Cautious Optimizer区别** | 确定性masking（梯度反向则跳过） | 随机masking才能产生正则化效果 |
| **与GaLore/LISA区别** | 同时稀疏更新参数和动量（省内存） | 密集动量+稀疏参数（更低方差） |
| **额外开销** | Muon需要SVD，SAM需要2x梯度 | 零。只需一次乘法。 |
| **实现复杂度** | 需要深度修改训练框架 | 2行代码，纯wrapper |

---

## 实验：全面碾压

### Llama 预训练（C4数据集）

| 方法 | 60M | 130M | 350M | 1B |
| --- | --- | --- | --- | --- |
| Adam | 30.79 | 24.77 | 18.42 | 16.35 |
| Muon | 28.93 | 22.34 | 17.09 | 14.52 |
| APOLLO+SGG | 30.18 | 22.52 | 16.54 | 13.95 |
| **RMSProp+Magma** | **28.55** | **21.66** | **16.16** | **13.19** |

几个关键观察：

- **RMSProp+Magma 在所有规模上都是第一名** ，超越了使用复杂矩阵预处理的Muon和SOAP
- **Magma的优势随模型规模增大而增大** ——1B时相比Adam降低19%、相比Muon降低9%
- Magma可以叠加在任何优化器上：Adam+Magma、LaProp+Magma 都有显著提升

### MoE模型预训练

在稀疏MoE架构上（动态负载均衡 + 稀疏路由 → 更复杂的优化landscape），Magma同样有效：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

MoE预训练结果

Muon+Magma取得了最佳性能，说明Magma的随机masking正则化与Muon的结构化预处理是 **正交互补** 的。

### 重尾噪声下的鲁棒性

LLM训练的一大特点是梯度噪声呈重尾分布。在控制实验中：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

重尾噪声下的表现

在轻尾噪声下Adam和Magma表现相似，但在重尾噪声下Magma **显著优于Adam** 。Magma始终维持更低的Hessian条件数，说明它的更新确实被约束在了损失曲面的良态区域。

---

## 为什么这个工作重要？

这篇论文的意义不仅在于提出了一个更好的优化器wrapper，更在于它 **挑战了深度学习优化的一个根本假设** ：

> "反向传播算出了所有参数的梯度，我们就应该用所有的梯度来更新所有的参数。"

Magma用理论和实验证明，这个假设是错的。在Transformer这种高度异质的优化地形上， **有选择地"不更新"比"全部更新"更好** 。

这和很多经典ML洞察形成了呼应：

- **Dropout** ：随机丢弃神经元 → 更好的泛化
- **随机深度** ：随机跳过层 → 更稳定的训练
- **Magma** ：随机跳过参数更新 → 隐式平坦性正则化

**随机性不是敌人，而是免费的正则化器。**

---

## 总结

| 项目 | 信息 |
| --- | --- |
| **论文** | On Surprising Effectiveness of Masking Updates in Adaptive Optimizers |
| **核心方法** | Magma：动量对齐的随机梯度掩码 |
| **关键发现** | 随机丢弃50%参数更新 = 免费的曲率正则化 |
| **最佳成绩** | 1B模型上比Adam低19% PPL，比Muon低9% PPL |
| **实现代价** | 零额外显存、零额外计算、2行代码 |
| **适用范围** | 任何自适应优化器的即插即用wrapper |
| **论文链接** | arxiv.org/abs/2602.15322 |

> 在这个所有人都在给优化器"做加法"的时代，Google用一个简洁到令人发指的方法证明： **有时候，少即是多。**

继续滑动看下一个

ITADN技术社区

向上滑动看下一个