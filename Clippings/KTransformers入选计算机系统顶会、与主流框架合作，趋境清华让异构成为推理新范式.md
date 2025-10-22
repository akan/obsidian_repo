---
title: "KTransformers入选计算机系统顶会、与主流框架合作，趋境&清华让「异构」成为推理新范式"
source: "https://mp.weixin.qq.com/s?__biz=MzIzNjc1NzUzMw==&chksm=e969807eaf8e118a3a7d25b013c6f3450d9d51bfc6644f2d55bbaf05d4e841b4c372a8248ff3&idx=2&mid=2247835375&sn=d89f83add5ad5e3e205578cb11f772ba#rd"
author:
  - "[[关注前沿科技]]"
published:
created: 2025-10-22
description: "中国开源项目正在被世界看见"
tags:
  - "异构推理"
  - "MoE模型"
  - "CPU-GPU协同"
  - "专家延迟机制"
  - "开源框架"
abstract: "趋境科技与清华大学联合研发的KTransformers异构推理框架入选SOSP 2025，通过与SGLang合作推动大模型在CPU+GPU混合架构上的高效推理"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/YicUhk5aAGtC7iboQiabfVO9JDLt160nPV1W5criaCtfXOpBd8M8JrtN4TjE0BvgEs9sGB97oiawUMZhWtgU5UqD3TQ/0?wx_fmt=jpeg)

关注前沿科技 [量子位](https://mp.weixin.qq.com/) *2025年10月22日 17:09*

##### 允中 发自 凹非寺量子位 | 公众号 QbitAI

全球AI基础设施快速演进的浪潮中，一个诞生自中国的开源项目，正在被世界看见。

它就是 **KTransformers，由趋境科技与清华大学KVCache.AI团队联合研发，聚焦大模型推理阶段的系统创新。**

这是一个高性能异构推理框架，专注于高效利用底层GPU、CPU、内存等多样化算力，让大模型在更低算力、更灵活的硬件架构上高效运行，项目论文《KTransformers: Unleashing the Full Potential of CPU/GPU Hybrid Inference for MoE Models》入选了刚刚落幕的 “计算机系统领域奥斯卡” SOSP 2025 。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtC7iboQiabfVO9JDLt160nPV1Gm1XjPZfIQRvylib5VRMxc3Tef6ykMjmOMrNHflFmxqUQTJulr3ibFeA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

SOSP是计算机系统领域最具影响力的国际顶会之一。过去几十年间，从虚拟化到分布式文件系统，无数里程碑式的技术成果都曾首次亮相于此。

如今，KTransformers也在这个舞台上获得了全球系统学术界的最高背书。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtC7iboQiabfVO9JDLt160nPV1gGibH7ya44YbCGGd4GRwdcY3S8hic1gt6Ubiab3oaHzdlUkxmaSSnce8g/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

几乎在同一时间，KTransformers宣布与主流推理框架SGLang合作，双方架构合入同一分支。这次合作意味着全GPU推理与异构推理的融合，推动大模型推理架构变得更加完善，将迈向更广泛的产业落地。

在更远的未来，它即将成为更多AI产品背后能跑得起大模型的底层路径。

## 加入核心创新“专家延迟机制”，异构架构实现MoE模型高效推理

大模型推理领域，算力瓶颈正在成为全球技术界的核心问题。

尤其是当MoE *（Mixture of Experts，专家混合）* 架构成为主流后，这个瓶颈更显突出。MoE模型以“稀疏激活”为特征，每次推理只会调用部分专家子网络，从而在不牺牲模型能力的前提下降低计算负担。

问题随之而来，如何高效调度这些专家从而避免资源浪费与设备空转，成了产学研三界共同的新挑战。

《KTransformers: Unleashing the Full Potential of CPU/GPU Hybrid Inference for MoE Models》正是在这一背景下诞生的。它提出了一条不同以往的道路：一套面向CPU+GPU异构架构的MoE推理系统方案，让原本只能依赖昂贵多卡GPU的大模型，能在CPU参与的硬件环境中实现接近同等性能的推理体验。

KTransformers的初衷是通过创新的异构推理的架构，充分释放底层所有的硬件算力资源，优化计算调度，摆脱对单一硬件的依赖，从而实现更普惠、更高效的大模型部署与应用。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtC7iboQiabfVO9JDLt160nPV1nnVsRSvn1XeAjhbvurnrQRT8wZSsMEmaEK2zwMfRkljViaPXFibgaQOw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

技术层面上，它通过一系列系统级创新，让GPU负责注意力和主干网络的高并行计算，CPU则承担稀疏专家模块的推理任务，实现了高效的CPU+GPU协同执行。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtC7iboQiabfVO9JDLt160nPV1qX3b5x4Ir2kCUhdBoytWib0CNbJkXlTn1q0Ku1SZTc3muAAYEUTjafg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

KTransformers的 **核心创新首先体现在底层算子优化上。**

通过针对Intel AMX指令集开发的高吞吐计算核，结合自定义的tile-aware内存布局，KTransformers在单路Xeon上实现了PyTorch实现近4倍的提速，极大释放了CPU在专家计算中的性能。至此，CPU成为推动系统吞吐提升的关键一环。

此外，KTransformers在异构任务协调方面也进行了系统性重构，为减少CPU与GPU之间的协调成本，KTransformers引入了NUMA感知张量并行和基于CUDA Graph的调度，以 **确保两个设备以最小的同步延迟运行。**

值得一提的是，在论文中KTransformers还提出了另一个创新技术—— **Expert Deferral（专家延迟机制）。**

传统MoE推理严格遵循层级顺序，GPU必须等待CPU完成专家计算后才能继续下一步，这种串行依赖导致了大量性能浪费。KTransformers打破了这一限制。

KTransformers研究团队发现，Transformer模型的残差连接具有一定的延迟容忍性，部分中间结果的计算并不需要严格同步完成。于是团队提出让部分专家计算延迟执行——也就是在GPU执行注意力模块时，CPU专家仍在计算上一层结果，两者并行推进。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtC7iboQiabfVO9JDLt160nPV1evrt9hic0WIqOsTU0Eiag5iaBQsMKCbeWWicVSh4YiaMJrrtjl023q7jkMQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

这样就使得CPU与GPU的负载得以动态重叠，模型吞吐提升约1.45倍，单卡decode速度最高超过30+ tokens/s，而模型精度变化低于0.5%，几乎无损。

Expert Deferral是MoE推理异构化落地的关键突破，真正让CPU与GPU实现了平等协作。

得益于这些设计，KTransformers能够在一台RTX 4080+双路Xeon的单机环境中成功运行DeepSeek-V3-671B模型，单路性能接近多卡GPU集群水准。

## 推动推理架构融合，助力全球开发者高效创新

到今天，论文的全部思想已被完整工程化，衍生为开源系统 **KTransformers** 。

这其实是推理生态流变分化的一个具象化体现：一边是以SGLang为代表的高吞吐、高并发全GPU路线；另一边，则是仍在探索中的让CPU与GPU协同工作的异构路线，尝试用更灵活、成本更低的方式支持大模型运行。

KTransformers正是后者的代表之一。

KTransformers与SGLang的合作，是双方基于各自推理引擎能力展开深度对接，联合推动大模型推理向更高性能、更低成本的方向演进。

SGLang，全称Structured Generation Language，是一种专为大型语言模型 *（LLM）* 和视觉语言模型 *（VLM）* 设计的高效推理与服务框架，它通过联合设计前端语言和后端运行时来提升模型推理的速度和灵活性。

由于在多轮对话、复杂任务规划和结构化输出方面表现突出，在当下的大模型推理框架生态中，SGLang成为了最主流、最具工程实用性的开源推理引擎之一。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtC7iboQiabfVO9JDLt160nPV1wQ8hastDxLJXs9YZcNibMUXjHVmkRC1ADX5PJg4YlzAVYvJNo3KGMZw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

SGLang的优势在于通用性和工程落地能力，全GPU推理思路也更适用于 **高吞吐量高并发等需求，KTransformers作为算子库合入SGLang** 之后，双方互为补充，开发者用户可以直接获得全GPU推理与异构推理两种能力，不再需要手动集成、单独调用。尤其是在GPU资源受限但本地CPU富余的场合，许多原本无法落地的模型都有了新的可行路径。

例如通过KTransformers与SGLang合作实现的Multi-GPU+CPU混合推理能力，将更多专家放置在GPU上，这减少了带宽瓶颈下的CPU内存访问，相对单GPU的场景极大提升吞吐量。

此次合作实现了异构推理方案与主流推理框架的深度融合。这推动了双方底层架构的协同进化，使其迈向更成熟、更工程化的新阶段；同时使开发者能够更便捷地调用各类模型，在硬件选择上也更具灵活性。

## KTransformers，想做的不止是“在本地跑得动”

技术成果背后，是持续构建生态的决心。

**如今的KTransformers已成为一个被开发者、厂商与开源社区广泛复用的共建式底层框架。**

目前，其GitHub Star数已突破15.2K，成为全球Star数排名前列的大模型推理框架。

全球头部开源模型方，如Qwen、Kimi、智谱 AI等多个主流大模型，都在模型发布首日就推荐KTransformers作为推理引擎支持；其工程实践与兼容性也被多家一体机产品线采纳。

![Image](https://mmbiz.qpic.cn/mmbiz_png/YicUhk5aAGtC7iboQiabfVO9JDLt160nPV1hztzqBXRHZ4mZhxh1OwGS2cdCpSo22OevAFZyPpxlbHB8An5UnLQSQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

在这条异构路线逐渐成型的过程中， **趋境科技始终是最核心的推动者之一。**

在KTransformers的架构设计、核心实现、算子优化、框架适配以及社区维护等多个关键层面，趋境科技始终处于一线角色——

在与清华大学KVCache.AI团队联合研发的基础上，趋境负责了项目中的大量底层开发、接口对接、系统调度和社区推广工作。

这一次与SGLang的对接合作中，趋境科技也作为主要实现方与维护贡献者，完成了从对接设计、功能联调，到主分支合入的全部工程闭环。

**对趋境来说，KTransformers输出的是一种价值理念的承载，更是一个更长期的目标：**

在大模型时代，需要有人站出来为推理基础设施提供新的可能性。大模型落地不能只有精英算力路径，也需要一条更广谱的路线：以异构协同释放本地硬件的潜力，以开源能力帮助更多团队和组织用得起、调得动、融得进自己的业务中。

正因此，趋境已经与多个国产CPU、GPU硬件平台合作，共同推进全国产高性价比方案；为数十家行业开发伙伴提供算力底座，逐步实现算力普惠，让大模型真正能够为业务所用。

今天的KTransformers，已经让大模型推理不再专属于高端算力；未来，趋境希望让AI能力也不再专属于少数企业。

## Gossip time

KTransformers已经可以在一张消费级GPU上稳定运行千亿参数大模型。那么，下一步呢？

给大家附上一个圈内人最近才刚知道的小道消息：

研究团队好像已经有人在内部试水微调了。而且是在不扩卡、不改架构的前提下来做轻量调优。

从KTransformer的设计思路来看，确实是顺理成章的一步：

既然推理已经解决了，那接下来的方向，不就是能跑也能调么。

大家期待的小手手可以随时搓起来了哈！

论文链接：

https://madsys.cs.tsinghua.edu.cn/publication/ktransformers-unleashing-the-full-potential-of-cpu/gpu-hybrid-inference-for-moe-models/SOSP25-chen.pdf

技术细节详见SGLang博客：

https://lmsys.org/blog/2025-10-22-KTransformers/

\*本文系量子位获授权刊载，观点仅为原作者所有。

**一键三连** **「点赞」「转发」「小心心」**

**欢迎在评论区留下你的想法！**

— **完** —

****🌟 点亮星标 🌟****

**科技前沿进展每日见**

继续滑动看下一个

量子位

向上滑动看下一个