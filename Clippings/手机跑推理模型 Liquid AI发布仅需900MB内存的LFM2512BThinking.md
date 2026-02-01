---
title: "手机跑推理模型：Liquid AI发布仅需900MB内存的LFM2.5-1.2B-Thinking"
source: "https://mp.weixin.qq.com/s?__biz=MzA5MTIxNTY4MQ==&chksm=8651233afdddc4a345d52f5588e19b8d1dd202a4b5e7c7f7057eacaf03ab28f2fc03802c0876&idx=1&mid=2461158068&sn=ed0cd2605549522ede7ed536e8c0c01f#rd"
author:
  - "[[winkrun]]"
published:
created: 2026-01-22
description:
tags:
  - "设备端推理"
  - "内存占用低"
  - "性能提升"
abstract: "Liquid AI发布了一款仅需900MB内存即可在手机上运行的推理模型LFM2.5-1.2B-Thinking，该模型在数学、指令遵循和工具使用方面性能显著提升，且推理速度更快。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/aaN2xdFqa4ESMF3cEXpFJvz6zeq3mJSGFa4nUuCG8dVLSEzkTyydqZgjjZLgIbIR7iaJsFHKibAichP4t20jzJic1Q/0?wx_fmt=jpeg)

Original winkrun [AI工程化](https://mp.weixin.qq.com/) *2026年1月21日 19:29*

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/aaN2xdFqa4ESMF3cEXpFJvz6zeq3mJSG8CyedEz7VibvAJkibpW4RC50wBBadhFpIZXGIrQNUO9t4WpuLicQmZV5g/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

Liquid AI发布了LFM2.5-1.2B-Thinking，这是一个完全在设备上运行的推理模型。只需900MB内存，就能在任何手机上运行。

这个模型专门为简洁推理训练，生成答案前会先产生内部思考轨迹，支持系统化问题解决。在工具使用、数学和指令遵循方面表现突出。

与之前的指令版本相比，数学推理从63分提升到88分（MATH-500基准），指令遵循从61分提升到69分（Multi-IF基准），工具使用从49分提升到57分（BFCLv3基准）。

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/aaN2xdFqa4ESMF3cEXpFJvz6zeq3mJSGevFfL6fFdFmQhxDDlDKZicqw3jtrBUSpYibC8TH87sm7JBzvNbiaQAzzw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

尽管参数比Qwen3-1.7B少了40%，但在大多数性能基准上都能匹配或超越后者，同时需要更少的输出token和测试时计算。

在推理时差距更加明显。在AMD Ryzen 9 3950X上，解码速度达到237 tok/s，而Granite-4.0-H-1B为147 tok/s，Qwen3-17B为122 tok/s。内存占用853MB，比其他两个模型更节省。

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/aaN2xdFqa4ESMF3cEXpFJvz6zeq3mJSGuZ9TPeV0rTNmDpljibEiaOWnSZaRu4Usfxj8MKCq4ZaV7aKE9wBgXyWw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

在高通骁龙8 Elite移动平台上，解码速度70 tok/s，足以满足实时交互需求。这种性能使得在手机上部署复杂的AI应用成为可能。

模型现已提供，支持Hugging Face、LEAP和Liquid Playground。开箱即用支持llama.cpp、MLX、vLLM和ONNX Runtime等主流推理框架。

有网友评论指出，这种规模的设备端推理将智能从集中式服务转向本地基础设施。当思考发生在边缘，延迟、隐私和所有权动态都会同时改变。

另一个观察是，随着这种模型的发布，大型手机制造商围绕这个模型系列设计专门的AI智能手机变得合理。模型家族包括基础版、指令版、思维版、日语优化版、视觉语言版和音频版，覆盖了多种应用场景。

对于开发者，可以使用TRL和Unsloth进行微调。模型采用混合架构，包含10个双门LIV卷积块和6个GQA块，在保持小体积的同时提供强大的推理能力。

这种进展让人想起移动计算的发展轨迹：从大型机到个人电脑，再到智能手机。现在，AI正在经历类似的去中心化过程。

Hugging Face: https://huggingface.co/LiquidAI/LFM2.5-1.2B-Thinking

关注公众号回复“进群”入群讨论。

继续滑动看下一个

AI工程化

向上滑动看下一个