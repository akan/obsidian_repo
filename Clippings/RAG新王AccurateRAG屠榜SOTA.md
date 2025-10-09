---
title: "RAG新王：AccurateRAG屠榜SOTA"
source: "https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&chksm=c358e314fc6767ff3f6ded617c7ee1009f8f54d00179aa9fbd00a0067e0f3dac244c74651e84&idx=2&mid=2247497875&sn=aca98564297bc2a7848ea3a6c24aa0e4#rd"
author:
  - "[[PaperIdea]]"
published:
created: 2025-10-09
description: "一、背景：为什么 RAG 仍然“答不准”？大模型（LLM）再强，也记不住没训练过的私有数据或实时信息。检索增"
tags:
  - "PDF解析"
  - "微调嵌入"
  - "检索增强"
  - "生成优化"
abstract: "AccurateRAG通过四个模块化组件解决了RAG系统在文档解析、检索精度和生成准确性方面的核心问题，在多个基准测试中刷新了SOTA性能。"
---
*2025年10月09日 13:01*

The following article is from AI技术Talk Author PaperIdea

[

**AI技术Talk**.

专注大模型DeepResearch／RAG／Graph前沿技术与企业落地！

](https://mp.weixin.qq.com/?__biz=Mzk0MTYzMzMxMA==&chksm=c358e314fc6767ff3f6ded617c7ee1009f8f54d00179aa9fbd00a0067e0f3dac244c74651e84&idx=2&mid=2247497875&sn=aca98564297bc2a7848ea3a6c24aa0e4#)

## 一、背景：为什么 RAG 仍然“答不准”？

大模型（LLM）再强，也记不住 **没训练过的私有数据** 或 **实时信息** 。  
检索增强生成（RAG）把“外挂知识库”塞进 prompt，看似解了燃眉之急，但工业级落地时常被三件事卡脖子：

1. **文档解析翻车** ：PDF 表格、标题、页眉页脚一塌糊涂，检索阶段就丢信息。
2. **检索模型“水土不服”** ：通用 embedding 在金融、医疗等垂直场景直接失灵。
3. **生成模型“睁眼说瞎话”** ：检索结果明明对了，LLM 却忽略关键片段，甚至自相矛盾。
![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricHP0PkdFq7CMWgqfXTmdAgzAnc0GrqibliaP2xA6yIlWDFibialAHzw9GUicRvsGDFpGRpXW66XicvOrItA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

AccurateRAG 正是 Qualcomm 团队给出的 **端到端工程答案** ：从“脏 PDF”到“可上线”只需一条流水线，并且在 FinanceBench、HotpotQA 等 6 个数据集上刷新 SOTA。

## 二、方案总览：4 个模块化组件，一条流水线跑通

![图1 框架总览](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricHP0PkdFq7CMWgqfXTmdAgzd8fEmeDrC56unAY4D1e3ibFmBk9SibFJRsJI0AhicF2WiaY3GQL8q3M3mQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)  
*图1：AccurateRAG 四件套——Preprocessor → Data Generator → Retriever → Answer Generator*

| 组件 | 解决痛点 | 关键 trick |
| --- | --- | --- |
| **Preprocessor** | PDF 表格结构丢失 | 双解析器融合：Unstructured + LlamaParse，表格转 Markdown |
| **Data Generator** | 缺少微调数据 | LLM 自动生成（简单+复杂）QA 对，并自验证答案 |
| **Retriever** | 通用 embedding 不精准 | 对比学习微调 BGE；BM25 混合；自动在验证集挑最佳策略 |
| **Answer Generator** | LLM 忽略检索结果 | 用“扩展上下文”微调 Llama-3，LoRA 高效适配 |

下面分模块展开，每个都给出对应论文原图/表，方便“看图说话”。

### 2.1 Preprocessor：让表格“像人一样”可读

![PDF输入](https://mmbiz.qpic.cn/sz_mmbiz_jpg/AE74ia62XricHP0PkdFq7CMWgqfXTmdAgzUc01DtHRwGjISn6U45HjlH12egKka7gLrWTY7qcibuG7qBibJxnQ4Kkg/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

PDF输入

![Markdown输出](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricHP0PkdFq7CMWgqfXTmdAgz4bGh6S9ZJibmfLck1gj6uPr1HMK0ORqJbPicc7lLCKQ02w9Tg9y8YcHQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

Markdown输出

*上：原始 PDF 表格；下：自动生成的 Markdown，行列结构完全对齐*

**实现细节**

1. 先用 Unstructured 把 PDF 转 HTML（OCR 级，结构好但字符误差）。
2. 再用 LlamaParse 转一次（字符准，但表格变纯文本）。
3. 对齐合并：以 Unstructured 结构为骨架，用规则把 LlamaParse 的“干净文字”填回去。
4. 按“语义单元”切 chunk，前后各留 10% 重叠，缓解多跳问答断片问题。

### 2.2 Fine-tuning Data Generator：零成本拿到“千级”高质量 QA 对

![附录 生成示例](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricHP0PkdFq7CMWgqfXTmdAgzH7chVms5hbGiauL8IYY6vf6UENW2TV7n8bjdXHMibpicia7R3uMkGjHT8w/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

附录 生成示例

*简单问句 vs 多句推理复杂问句*

**流程**

1. 对每个 chunk，prompt Llama-3.1 批量生成 5 简单 + 5 复杂问题。
2. 再用同一 chunk 让模型自答，过滤掉“答不上”或“答错”的伪问题。
3. 输出两批数据：
- (context, question) → 给 embedding 做对比学习
	- (context, question, answer) → 给 LLM 做微调

**收益**  
无需人工标注， **3 小时自动产生 1.2 万 QA 对** ，直接让金融域检索 Top-5 命中率从 68% → 83%。

---

### 2.3 Retriever：语义 + 关键词双保险，还能“自动换挡”

![表1 消融实验](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricHP0PkdFq7CMWgqfXTmdAgzhCluIXMiaq2qGBEKxVEwzrRWQBeKJBGziagYmwoXavz3mDF4gibHzAsBw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

表1 消融实验

*表1：FinanceBench 上不同检索策略对比*

**三件套**

1. **Semantic Search** ：自监督微调 BGE-large，难负例 + in-batch 负例。
2. **Conventional Search** ：BM25 关键词匹配，应对专有名词、数字。
3. **Retrieval Evaluation** ：在验证集跑 RRF 混合、纯语义、纯 BM25， **自动挑冠军** 。

**结果**

- 纯语义已把准确率从 19% 拉到 38.7%；再上混合策略 \*\*最终 42%\*\*。
- 在 APIBench 上，混合策略比纯语义再 +2.7%（表2）。

### 2.4 Answer Generator：用“扩展上下文”微调，让 LLM 不得不“看”检索结果

![图6 UI 截图](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图6 UI 截图

*图6：Answer Generator 微调界面——选模型、调 LoRA 超参一键启动*

**训练数据构造**

- 对每条 QA，用 Retriever 再取 Top-N-1 相关 chunk（排除原始 chunk）。
- 原始 + 新 chunk 随机打乱 → “扩展上下文”
- 三元组（扩展上下文, 问题, 答案）喂给 Llama-3-8B，LoRA rank=32。

**推理**

- 实时取 Top-N 相关 chunk，拼接后直接生成答案。
- 用 Llama-3.1-8B-Instruct 当“评判”，自动输出 TRUE/FALSE，省去人工对答案。

## 三、结论

- FinanceBench 数据集评估：
![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

AccurateRAG 在 FinanceBench 测试集上取得了 42% 的准确率，显著高于基线系统的 19%。

消融实验表明，使用原始文本嵌入模型（不进行微调）会使准确率降低 3%，而替换预处理器为 Unstructured 预处理器会导致准确率降低 4%，证明了 AccurateRAG 中这些组件的有效性。

- 其他基准数据集评估：
![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在 HotpotQA、PubMedQA 和 APIBench（HuggingFace、Torch Hub、TensorFlow Hub）等五个标准基准数据集上，AccurateRAG 相较于 RankRAG 和 RAFT 等现有系统取得了更高的分数，实现了新的最佳性能（SOTA）。

```apache
https://arxiv.org/pdf/2510.02243AccurateRAG: A Framework for Building Accurate Retrieval-Augmented Question-Answering Applications
```

继续滑动看下一个

PaperAgent

向上滑动看下一个