---
title: "EXL3：本地LLM的降维打击与配置地图"
source: "https://mp.weixin.qq.com/s/QJiee66SUQuvKaiChZp1Nw"
author:
  - "[[玩开源]]"
published:
created: 2026-09-28
description: "文章详细解释了EXL3作为本地LLM中重大范式转变的原因，指出它并非传统的量化格式，而是一种基于Trellis编码的全新压缩算法。EXL3通过将四舍五入误差分布而非累积，实现了接近全精度的模型压缩。文章提供了针对不同VRAM级别（8GB到2"
tags:
  - "EXL3"
  - "Trellis编码"
  - "Hadamard误差分散"
  - "4-bit精度"
  - "显存配置地图"
  - "RTX 4060"
  - "RTX 4090"
  - "RTX 5090"
  - "DGX Spark"
  - "Apple Silicon"
abstract: "EXL3是一种基于Trellis编码的本地LLM压缩算法，通过Hadamard变换分散误差，在4-bit下接近BF16精度，并附有各显存级别的最佳配置地图。"
---
玩开源 玩开源 *Sep 28, 2026, 12:49 PM*

![EXL3 Trellis 编码与 Hadamard 误差分散概念图](https://mmbiz.qpic.cn/sz_mmbiz_jpg/zfpk5OZ1Z8SsicpM2BEPStj1JUop3FN7KdAxRMAWS6OkEsKECfuaRj4te8zZncXOAic9icXqRicHibibBMpEQup9fqgqDL0nqnLWJ5IxM4vAGUhJg/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0 "EXL3 的 Trellis 编码与 Hadamard 误差分散原理")

## EXL3：不只是量化，是本地 LLM 的“数学魔法”

很多老铁还在把 EXL3 和 GGUF、AWQ 混为一谈，觉得它不过是“又一个压缩格式”。如果你还这么想，那可就有点落伍了。EXL3 实际上是本地大模型领域的一次 **范式转变** 。它不是简单的四舍五入量化，而是一套基于 Trellis 编码的全新压缩算法。

### 为什么 EXL3 是降维打击？

传统量化（如 Q4\_K\_M）就像每个权重都在“独立犯错”，误差会累积，导致模型变笨。EXL3 玩的是 **误差分布** ：它通过 Hadamard 变换将四舍五入的误差分散到各个维度，而不是堆积在一起。

- **精度惊人** ：在 GLM-5.3-Flash 的测试中，EXL3 在 4-bit 下的表现与全精度 BF16 仅差 0.004 nats。相比之下，NVFP4 在更高位宽下差距高达 0.06。
- **极致压缩** ：Llama-3.1-70B 在 EXL3 的 1.6-bit 配置下依然保持连贯，体积不到 16GB。这在传统量化中几乎是数学上不可能的。

简单说： **EXL3 让你用一半的文件大小，获得接近 FP8 甚至更高的智能水平。**

### 🗺️ VRAM 配置“作弊”地图

别自己瞎调了，以下是针对不同显存级别的 **最佳实践配方** 。这些数据来自实际基准测试和公开报告，直接抄作业即可。

![EXL3 各显存分级的最佳配置与性能数据地图](https://mmbiz.qpic.cn/mmbiz_jpg/zfpk5OZ1Z8TpQAdB1yicib5bgna6RIpfuURPhuhNy2Aibb9nicjQ2W0EyrsC1XgfRX4d6PSTaxV2Ro8TnDM7qS4G7ibE5xqX1icthPjzUGgMibR09A/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1 "EXL3 按显存分级的 Trellis 压缩配方与误差对比")

#### 💻 入门级（8-12 GB）：RTX 4060/3060

- **推荐模型** ：Qwen3.8-27B (EXL3 2.2 bpw)
- **性能表现** ：在 12GB 卡上跑满 64k 上下文，速度约 25 tok/s。
- **亮点** ：这是 Trellis 编码在低显存端的威力。27B 模型在 12GB 上的表现远超同显存的 9B 模型。
![Qwen3.8-27B EXL3 量化模型在 Hugging Face 的仓库页面](https://mmbiz.qpic.cn/sz_mmbiz_jpg/zfpk5OZ1Z8Q6icicsAzu7kN1SaqhgiaJ78J7f4ZicwNd3gvQJVLCaicXICMQ7cv9to4llOql3sUGFnp2YPJChljLKoJPEibeQict9yicJsqicg1VJicJE/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2 "Qwen3.8-27B EXL3 多精度量化版本")

#### 🚀 中端主力（24 GB）：RTX 3090/4090

- **推荐配置** ：Qwen3.8-27B (3.5 bpw) + DFlash2 起草器 (5.0 bpw)
- **性能表现** ：短上下文可达 130-150 tok/s，持续解码 94-105 tok/s。
- **对比** ：比同卡上的旧版 Q4\_K\_M llama.cpp 速度快三倍。全本地 262k 上下文驻留仅需 22GB 预算。

#### 🏆 高端甜品（32 GB）：RTX 5090

- **推荐配置** ：K5K6-hydrated 包
- **性能表现** ：支持 250k token 提示词，纯文本服务可达 155-212 tok/s。
- **点评** ：这张卡是目前本地 LLM 的“甜蜜点”，性价比极高。

#### 🐋 旗舰级（96-128 GB）：RTX PRO 6000 / DGX Spark

- **单卡极限** ：DeepSeek-V4-Flash K2，速度 133.6 tok/s。
- **双卡/四卡集群** ：
- **2x DGX Spark** ：GLM-5.3-Flash (4 bpw)，单流 62.9 tok/s，四流总计 146.5 tok/s，支持 900k 上下文。注意：双卡配置下 TTFS（首字延迟）可能需要特定配方优化，部分通用配方在 TP=2 时速度可能略慢。
	- **4x DGX Spark** ：DeepSeek-V4.1-Flash (3.5 bpw)，六流并发 178.7 tok/s，KV 池高达 2.56M token。这已经能超越厂商官方的检查点服务速度。
![Qwen3.8-Flash-Next EXL3 的 DGX Spark 配方 GitHub 仓库](https://mmbiz.qpic.cn/sz_mmbiz_jpg/zfpk5OZ1Z8S3Cjtk7Dqouu9KSMicrUqEtFzjAw5CFgD9DPxu8ZuqnlWsib2iaReS0FNJvTicarsSwPody8RflLKOWtV2spib5QabfUgMZBHibO5sY/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3 "DGX Spark 单卡运行 Qwen3.8-Flash-Next EXL3 的")

#### 🍎 Apple Silicon（M4/M5 Max）

- **推荐工具** ：PonyExl3（EXL3 的 Metal 移植版）
- **性能表现** ：Flash-Next 125B 在 M5 Max 上解码速度 70+ tok/s。虽然预填充阶段（Prefill）受限于 Apple 架构特性（俗称“苹果税”），但解码体验非常流畅。
- **对比** ：同等权重下，M5 Max 的解码速度（68.5 tok/s）甚至超过了 RTX 4090（52 tok/s）。

### ⚙️ 运行指南与避坑

1. **NVIDIA 显卡** ：
- 使用 `ExLlamaV3` + `TabbyAPI` 。这是目前最快的路径。
	- **关键参数** ：在 24GB+ 显卡上，设置 `GPU_MEM_GB 22` 和 `CACHE_QUANT nvfp4` （Ada 架构及以上）。3090 用户请使用 `Hadamard-4` 。
	- **注意** ：量化缓存的上下文长度必须是 256 的倍数。安装时若遇到 CUDA 冲突，手动固定 torch wheel 版本即可解决。
3. **进阶技巧** ：
- **视觉模块固定** ：TabbyAPI 支持将 Vision 模块固定在系统内存（RAM）中，而计算在 GPU 上进行。这能让显存紧张的用户获得接近全 VRAM 的速度体验。
	- **起草器量化** ：MTP 头和 DFlash2 起草器现在也支持 EXL3 量化。将起草权重从 16-bit 降到 5-bit，端到端速度可提升 33%。

### 💡 总结

如果你还在用 Q4\_K\_M，那你正在“浪费”显卡的性能和智能上限。EXL3 是目前本地 AI 领域 **最便宜的升级** 。它不仅在速度上碾压旧量化方案，更在模型智能的一致性上实现了质的飞跃。

对于追求极致性能的玩家，现在就是切换 EXL3 的最佳时机。毕竟，谁不想用更小的文件，跑出更聪明、更快的模型呢？

**微信扫一扫赞赏作者**

Author's tip: 个人观点，仅供参考