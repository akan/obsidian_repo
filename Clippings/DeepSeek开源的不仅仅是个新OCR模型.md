---
title: "DeepSeek开源的不仅仅是个新OCR模型。。。"
source: "https://mp.weixin.qq.com/s/jEDy2USY6rYEiPWVOr_e9w"
author:
  - "[[winkrun]]"
published:
created: 2025-10-20
description: "一个新的方向！"
tags:
  - "视觉token压缩"
  - "文本信息表示"
  - "成本降低"
  - "长文档处理"
abstract: "DeepSeek-OCR通过视觉token压缩技术，用更少的token表示大量文本信息，显著降低了长文档处理的计算成本。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/aaN2xdFqa4E4CLD7iccIRmsAj9I3KHf4ibMC76WwguDqgLXc1spnQSWzcywsN4vgHQb0tyGBVesFsOeibY2FpVEMA/0?wx_fmt=jpeg)

Original winkrun [AI工程化](https://mp.weixin.qq.com/s/) *2025年10月20日 18:54*

DeepSeek刚开源了一个新OCR模型，3B参数。

![Image](https://mmbiz.qpic.cn/mmbiz_png/aaN2xdFqa4E4CLD7iccIRmsAj9I3KHf4iboKzSUFr1oladq4G3sNRPbSov1HnUKZWibzvM22AuricbP7Y7S2jgPMkg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

这不只是又一个 OCR 模型，而是对 AI 处理长文本方式的重新思考：用视觉 token 压缩文本信息。

## 核心思路

传统方式处理长文档需要大量文本 token，计算成本随序列长度二次增长。DeepSeek-OCR 的想法是：既然一张图片能包含大量文字信息，为什么不用更少的视觉 token 来表示？

从实验来看，这种思路是奏效的。在 10 倍压缩比内，模型的 OCR 解码精度能达到 97%。即使在 20 倍压缩比下，准确率仍有 60% 左右。换句话说，1000 个文本 token 的内容，用 100 个视觉 token 就能基本无损表示。

## 核心技术

DeepSeek-OCR 包含两个核心组件：DeepEncoder 和 DeepSeek3B-MoE 解码器。

![Image](https://mmbiz.qpic.cn/mmbiz_png/aaN2xdFqa4E4CLD7iccIRmsAj9I3KHf4ibAUgHBnby6wqY3RMzA5ibDEKbO9SFxJPYzosHziblnr6PxEDYSeNTib8Mg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

DeepEncoder 是关键创新点。它串联了 SAM（负责窗口注意力的感知组件）和 CLIP（负责全局注意力的知识组件），中间通过 16 倍卷积压缩器连接。这样设计的好处是窗口注意力处理大量视觉 token，压缩器在进入密集全局注意力之前减少 token 数量，既保证了效果又控制了内存消耗。

多分辨率支持也很实用。从 512×512 的 Tiny 模式到 1280×1280 的 Large 模式，甚至支持动态分辨率的 Gundam 模式，能灵活应对不同场景需求。

## 性能表现

在 OmniDocBench 测试中，DeepSeek-OCR 仅用 100 个视觉 token 就超越了使用 256 个 token 的 GOT-OCR2.0，用不到 800 个视觉 token 就超过了需要近 7000 个 token 的 MinerU2.0。

![Image](https://mmbiz.qpic.cn/mmbiz_png/aaN2xdFqa4E4CLD7iccIRmsAj9I3KHf4ibN6IIVkSFIkPUzp2Pzv1D2bM9Xmz2waekBPV0XOF1616IdlVu3ogwZQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

更有意思的是不同文档类型的表现差异。幻灯片文档只需 64 个视觉 token 就能获得良好效果，书籍和报告用 100 个 token 就够了，但报纸需要 Gundam 模式才能达到可接受的准确率。这反映了不同文档类型的文本密度差异。

![Image](https://mmbiz.qpic.cn/mmbiz_png/aaN2xdFqa4E4CLD7iccIRmsAj9I3KHf4ib9tDpQ2lxo58RxCWTFGLIj46y5pWdLILOO9JXRLC0UCln1pKOXtuuRQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

## 点评

DeepSeek思路就是“刁钻”。传统OCR只是把图片转文本，他们却思考怎么用视觉信息更高效地表示文本内容。

它带来的是直接的成本降低。一个 1 万页的文档库，传统方式需要 1000 万个文本 token，现在只需要 100 万个视觉 token。成本直接降了 10 倍。

更深层次，这种压缩不只是省钱，还解决了几个一直困扰算法和工程的大问题：

1. 训练数据瓶颈消失了。多模态模型一直受限于数据处理能力，现在这个限制基本不存在。
2. AI 智能体的记忆问题有了新解法。智能体最大的问题是会瞬间失忆，上下文太长就崩溃。渐进式压缩模拟了人类的遗忘曲线，让智能体能持续运行而不会因为上下文过载而失效。
3. RAG可能要重新考虑存在价值。既然能把整个文档库压缩到上下文窗口里，为什么还要分块检索？直接把所有内容放进去处理就行。
4. 实时 AI 应用变得经济可行。实时文档分析、流式 OCR、带视觉上下文的实时翻译，这些应用以前成本太高，现在门槛大幅降低。

或许，这也是有人称之为AI的“ JPEG ”时刻的原因吧。

不过，就像论文所说，这是一项方向探索，还主要局限在 OCR 任务上，很多实际问题需要进一步的验证。

地址： https://huggingface.co/deepseek-ai/DeepSeek-OCR

关注公众号“回复”进群入群讨论。

继续滑动看下一个

AI工程化

向上滑动看下一个