---
title: "又快又省？仅5%参数、训练快4倍！ArcFlow用「非线性」魔法实现FLUX/Qwen推理40倍加速"
source: "https://juejin.cn/post/7609939326843715611"
author:
  - "[[机器之心]]"
published: 2026-02-24
created: 2026-02-25
description: "在生成式 AI 的浪潮中，我们见证了从 Stable Diffusion 到 FLUX、Qwen-Image 等大规模扩散模型的画质飞跃。然而，这种飞跃并非没有代价。为了从纯噪声中 “雕刻” 出清晰的"
tags:
  - "扩散模型"
  - "少步生成"
  - "非线性轨迹"
  - "动量参数化"
  - "高效蒸馏"
abstract: "ArcFlow通过动量参数化和解析求解器，实现了对FLUX/Qwen等大模型的高质量少步蒸馏，仅需微调5%参数即可获得40倍推理加速。"
---
[机器之心](https://juejin.cn/user/1873223543167902/posts)

41 阅读7分钟

在生成式 AI 的浪潮中，我们见证了从 Stable Diffusion 到 FLUX、Qwen-Image 等大规模扩散模型的画质飞跃。然而，这种飞跃并非没有代价。为了从纯噪声中 “雕刻” 出清晰的图像，这些模型通常需要进行 40 到 100 步（NFE）的迭代去噪。这种延迟使得模型很难真正应用于实际的实时生成或大规模服务。

于是，“少步生成”（Few-step Generation）成为了必争之地。对于原本教师模型曲折的生成轨迹，目前的少步加速方案（如 Progressive Distillation, Distribution Matching 等）都在试图做同一件事：把弯路拉直，一步到达终点。

然而，原本高维空间的生成轨迹极其复杂，强行 “拉直” 会导致轨迹上的几何失配（Geometric Mismatch）。这直接导致了少步生成时的结构崩坏和细节丢失。

有没有一种方法，既能快，又能顺应原本蜿蜒的生成轨迹？

复旦大学与微软亚洲研究院带来的 ArcFlow 给出了答案：如果路是弯的，那就学会 “漂移”，而不是把路修直。

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/05cf0ec2ef6642db9b27403ae7e3ca3f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1772532688&x-signature=TaJOd4Y3H4JB3LdBW%2BwOE4To5pM%3D)

- 论文地址： [arxiv.org/abs/2602.09…](https://link.juejin.cn/?target=https%3A%2F%2Farxiv.org%2Fabs%2F2602.09014 "https://arxiv.org/abs/2602.09014")
- 项目代码： [github.com/pnotp/ArcFl…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fpnotp%2FArcFlow "https://github.com/pnotp/ArcFlow")

一、 困境：为什么 “走直线” 难以学习？

在扩散模型中，教师模型（Pre-trained Teacher）的生成过程本质上是在高维空间中求解微分方程并进行多步积分。由于图像流形的复杂性，教师模型原本的采样轨迹通常是一条蜿蜒的曲线，其切线方向（即速度场）随时间步不断变化。

为了加速，现有的蒸馏方法（如 Progressive Distillation, Instaflow 等）尝试将这个轨迹压缩成一步直线抵达。它们的逻辑是：既然走曲线慢，那就训练学生模型，把起点（噪声）和终点（图像）之间连成一条直线。如果学生能学会走这条直线，那推理不就只需要一步了吗？

这种策略带来了两个致命问题：

1\. 几何失配（Geometric Mismatch）：教师模型原本的权重是基于曲线轨迹训练出来的。强行让学生模型去拟合一条直线，相当于让它 “背叛” 教师原本的生成先验。这种几何上的不匹配，导致学生模型很难学，或者学出来的东西结构崩坏。

2\. 学习成本高：为了强行扭转轨迹，学生模型往往需要进行全参数微调（Full Fine-tuning）。这不仅训练慢、显存开销大，而且容易导致 “灾难性遗忘”，破坏大模型原本优秀的泛化能力。

所以我们经常看到：很多蒸馏后的模型，虽然速度快了，但生成质量不稳定，甚至对复杂的 Prompt 理解能力下降。

如果不强制拉直，我们还能怎么快起来？

二、 洞察：速度场不是随机的，它是连续的

ArcFlow 团队重新审视了教师模型的轨迹，根据 ODE 的理论规律，在相邻的时间步之间，去噪的速度方向并不是跳跃式变化的，而是存在极强的相关性。这就像一辆赛车在过弯道，下一秒的方向和速度，很大程度上取决于当前秒的状态和惯性。既然教师模型的轨迹本身就是连续变化的，为什么我们不直接去建模这种 “变化规律”，而不是强行把它改成直线呢？

如果我们能找到一种参数化方法，能够描述这种 “弯曲” 的趋势，那么学生模型就不需要费力去把路拉直，而是可以顺着教师的势能，用极少的步数 “滑” 向终点。

基于这个核心洞察，ArcFlow 诞生了。

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a7f09960de0d47d689b5fdffc5a44d1e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1772532688&x-signature=0TJlgIZgknbRrzomFrklRJ0g%2Fvw%3D)

三、 ArcFlow 的三大杀手锏

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6a65177ba06c400990bfc494a769f0c8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1772532688&x-signature=cckkPcmyuxUnY0Jk2p%2BoyU7DgkI%3D)

1. 动量参数化（Momentum Parameterization）：给生成过程加个 “惯性”

为了捕捉上述的 “速度连续性”，ArcFlow 引入了物理学中经典的 “动量”（Momentum）概念。

在传统方法中，模型在每个时间步独立预测速度。而在 ArcFlow 中，我们将速度场建模为多个连续动量过程的混合。通俗来说，模型不仅预测当前的 “速度”，还预测了一个 “动量因子”（Momentum Factor）。这个因子描述了速度随时间衰减或增强的趋势。这就好比我们知道了物体的初速度和受力情况（动量），哪怕不看中间过程，我们也能通过物理公式直接预判它未来的轨迹是弯曲的还是笔直的。

这一设计让 ArcFlow 能够显式地构建非线性轨迹。在 2-4 步的极少步数下，这种非线性轨迹比生硬的直线能更精确地贴合教师模型的原始路径。

1. 解析求解器（Analytic Solver）：数学层面的 “零误差”

既然已经用 “动量公式” 完美定义了速度随时间的演变规律，那么这条轨迹的积分就是可解析的。

也就是说，我们可以推导出一个闭式解（Closed-form Solution）。

这意味着，ArcFlow 不需要像传统求解器那样通过离散步去拟合轨迹。它只需要一次前向传播，就能通过数学公式，精确无误地计算出任意时间间隔后的终端状态。

这种数学层面上的 “零误差” 积分，是 ArcFlow 能够实现高精度流匹配的关键。它消除了传统蒸馏方法中的离散化噪声，让生成的图像细节清晰。

1. 极简训练策略：<5% 参数的 LoRA 微调

这是最让开发者兴奋的一点。

正如前文所说，传统方法因为要 “强行拉直” 轨迹，不得不重写整个模型的参数。而 ArcFlow 选择 “顺势而为”，它的非线性轨迹天然契合教师模型的预训练分布。

因此，ArcFlow 不需要破坏教师模型原本的参数。实验证明，仅需通过 LoRA 微调不到 5% 的参数（主要是为了适应新的动量预测头），就能实现完美的轨迹对齐。

这种策略带来了两大红利：

- 训练收敛极快：相比 TwinFlow 等全量微调方法，ArcFlow 的收敛速度快了超过 4 倍。
- 保留教师先验：最大程度继承了 FLUX/Qwen 原本庞大的知识库，不像其他蒸馏模型那样容易出现崩坏或画质劣化。

四、 实验数据

团队在 Qwen-Image-20B 和 FLUX.1-dev 这两个目前最强的开源模型上进行了验证。结果表明，ArcFlow 在速度、质量和效率上实现了的平衡。

1. 推理速度

从原始的 50-100 步迭代，直接压缩至 2 步（2 NFE）。在相同硬件上，实现了超过 40 倍加速。

1. 画质表现

在 Geneval、DPG-Bench 等基准测试中，ArcFlow 在 2 步设定下的 FID 和语义一致性得分大部分优于或持平目前的 SOTA 方法。

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d4a1eaab1c004e91924e6757137e44c1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1772532688&x-signature=0KUV2ZuV4BU01zumPgp2BpcT2OY%3D)

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/2a56418127124c6f8ae61c197c4762b4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1772532688&x-signature=ducJffb75pjJuHOahkxsLcm%2FjEQ%3D)

视觉对比：

从论文展示的效果图来看，在同样的 2 步推理下，其他线性蒸馏方法生成的图像容易出现背景模糊、物体结构扭曲（如折断 / 重影的剑、模糊的背景），尤其是在不同的初始噪声下，其他方法容易出现生成模式相似、多样性坍缩的情况。而 ArcFlow 生成的图像不仅清晰度高，而且保留了教师模型原本的丰富细节和画面多样性。

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7fbc2d963cdf469e952170b4d7ba47f3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1772532688&x-signature=XjO60u1N%2BIFnrP57pEr%2FphQhOH0%3D)

1. 训练效率

得益于更精准的轨迹拟合和 LoRA 策略，ArcFlow 的训练曲线令人赏心悦目。在相同迭代步数下，ArcFlow 的 FID 分数和画面质量大幅领先。对于没有大规模算力的实验室或个人开发者来说，这大大降低了复现和定制的门槛。

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/83d55b2c56c549cb93b039aaacf592d8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1772532688&x-signature=GgFoa1jSv6dfBm7GEeGEEiEctiE%3D)

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/1b3db4acca9f445d8730179f190eaf22~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1772532688&x-signature=aH0yLKcqQlTjaN9K7J7HooOO1Ic%3D)

1. 更多效果展示

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/516a38e85d0546889cd9e2aa43439fb8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1772532688&x-signature=D6ri88tQBXkLLQK5zc1ZLq7%2Bx68%3D)

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6b20c6ff51d44ec0a9592579f0ec579f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1772532688&x-signature=gJxzi5HeMlCizBl%2FJk%2BIh5GC5Ps%3D)

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/81248ede051745e3b9c0c083c8d7cf54~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1772532688&x-signature=8GmlQOrPFcadFLu6CmX%2F1cP9Kxc%3D)

五、 总结

ArcFlow 提出了一种新的少步蒸馏的解决思路：相较于 “把曲线拉直” 的 “蛮力”，不如顺应原本的模型特征空间，用参数去描述其复杂性。通过动量参数化和解析求解器，ArcFlow 避免了不稳定的对抗性目标函数和全参数训练，从而实现了更快的收敛速度和更高效的蒸馏过程。这为未来的高效生成模型研究提供了一个极具潜力的方向。

评论 0

![avatar](https://p6-passport.byteacctimg.com/img/user-avatar/596dd11ec1eb86109467f46963b9da45~100x100.awebp)

0 / 1000

暂无评论数据

为你推荐

- [FLUX.2 Klein：消费级GPU也能实现的亚秒级图像生成](https://juejin.cn/post/7596955804260253746 "FLUX.2 Klein：消费级GPU也能实现的亚秒级图像生成")
		[Black Forest Labs（黑森林实验室）正式开源了FLUX.2系列中的轻量级成员——FLUX.2 \[klein\]模型家族。FLUX.2 \[klein\]以其\*\*亚秒级推理速度\*\*和\*\*消费级硬](https://juejin.cn/post/7596955804260253746)
	- [
		围炉聊科技
		](https://juejin.cn/user/3229679898597516)
	- 129
	- 点赞
	- 评论
- [Qwen-Image-2512-Turbo-LoRA：20倍提速AI图像生成的终极指南](https://juejin.cn/post/7592147054786084915 "Qwen-Image-2512-Turbo-LoRA：20倍提速AI图像生成的终极指南")
		[AI 图像生成领域正经历一场速度革命。虽然传统的文本生成图像模型通常需要 30-40 个推理步骤才能生成一张高质量图像，但 Qwen-Image-2512-Turbo-LoRA 仅需 4-8 步即可达](https://juejin.cn/post/7592147054786084915)
	- [
		努力犯错玩AI
		](https://juejin.cn/user/1366029853539604)
	- 157
	- 点赞
	- 评论
	![Qwen-Image-2512-Turbo-LoRA：20倍提速AI图像生成的终极指南](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/8a8cdf629cbb4b0a8d8e21bb5c72e54e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5Yqq5Yqb54qv6ZSZ546pQUk=:q75.awebp?rk3s=f64ab15b&x-expires=1772610200&x-signature=qjYoU4RSGfR9b8%2FvkL%2FIQFF8jT8%3D)
- [万亿参数！阿里 Qwen3-Max 大模型正式发布！](https://juejin.cn/post/7553820281505366054 "万亿参数！阿里 Qwen3-Max 大模型正式发布！")
		[万亿参数！阿里 Qwen3-Max 大模型正式发布！ 核心亮点先摆这儿： 9 月 24 日云栖大会刚发的 Qwen3-Max，参数超 1 万亿，LMArena 榜单干过 GPT-5-Chat 拿第三；](https://juejin.cn/post/7553820281505366054)
	- [
		NiceAIGC
		](https://juejin.cn/user/3572767434746329)
	- 491
	- 点赞
	- 评论
	![万亿参数！阿里 Qwen3-Max 大模型正式发布！](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d8107fa84cf5475b9430a8a8a0bfdb3f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgTmljZUFJR0M=:q75.awebp?rk3s=f64ab15b&x-expires=1772610200&x-signature=7YUHTyCxy5uorBZoxYg861lSM8s%3D)
- [【开源模型】高考数学139分！小米MiMo开源模型：7B参数突出重围](https://juejin.cn/post/7517520859864104969 "【开源模型】高考数学139分！小米MiMo开源模型：7B参数突出重围")
		[小米开源的首个推理大模型 Xiaomi MiMo-7 B 横空出世，以仅 7 B 参数在数学推理和代码生成等权威测评中，超越 OpenAI 闭源模型 o 1-mini 和阿里QwQ-32 B](https://juejin.cn/post/7517520859864104969)
	- [
		MarkGosling
		](https://juejin.cn/user/3799544245529837)
	- 280
	- 点赞
	- 评论
	![【开源模型】高考数学139分！小米MiMo开源模型：7B参数突出重围](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/4eea9ae92e4d44aa86acfe2ae717bcab~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgTWFya0dvc2xpbmc=:q75.awebp?rk3s=f64ab15b&x-expires=1772610200&x-signature=q5%2FMys%2BPqhr%2BZYBRnSBDx5PIjkk%3D)
- [LLM 大模型学习必知必会系列(十二)：VLLM性能飞跃部署实践：从推理加速到高效部署的全方位优化\[更多内容：XInference/FastChat等框架\]](https://juejin.cn/post/7375006864054304808 "LLM 大模型学习必知必会系列(十二)：VLLM性能飞跃部署实践：从推理加速到高效部署的全方位优化[更多内容：XInference/FastChat等框架]")
		[LLM 大模型学习必知必会系列(十二)：VLLM性能飞跃部署实践：从推理加速到高效部署的全方位优化\[更多内容：XInference/FastChat等框架\] 训练后的模型会用于推理或者部署。推理即使用](https://juejin.cn/post/7375006864054304808)
	- [
		汀丶人工智能
		](https://juejin.cn/user/4020284493662029)
	- 2.0k
	- 点赞
	- 评论
	![LLM 大模型学习必知必会系列(十二)：VLLM性能飞跃部署实践：从推理加速到高效部署的全方位优化[更多内容：XInference/FastChat等框架]](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8cd1bd11fcd842a3be90efdd2c71fef5~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis#?w=4320&h=2452&s=793708&e=jpg&b=2169d5)
- [FastBERT：又快又稳的推理提速方法](https://juejin.cn/post/6844903708942155784 "FastBERT：又快又稳的推理提速方法")
		[自从BERT问世以来，大多数NLP任务的效果都有了一次质的飞跃。BERT Large在GLUE test上甚至提升了7个点之多。但BERT同时也开启了模型的“做大做深”之路，普通玩家根本训不起，高端玩家虽然训得起但也不一定用得起。 所以BERT之后的发展也比较清晰，一部分壕大佬…](https://juejin.cn/post/6844903708942155784)
	- [
		李rumorr
		](https://juejin.cn/user/3069492195239831)
	- 1.7k
	- 3
	- 评论
- [除夕夜，国产顶流压轴上线，QWEN3.5多模态开源！](https://juejin.cn/post/7606555195753873408 "除夕夜，国产顶流压轴上线，QWEN3.5多模态开源！")
		[除夕夜，老金我刚咬了一口韭菜鸡蛋饺子。 手机"叮"的一声，弹出个通知。 老金我瞄了一眼——Qwen3.5，上线了。饺子差点没喷出来。 赶紧打开 chat.qwen.ai，两个模型直接挂在上面，可以用了](https://juejin.cn/post/7606555195753873408)
	- [
		老金带你玩AI
		](https://juejin.cn/user/2561191397043127)
	- 313
	- 点赞
	- 评论
- [刚刚，英伟达新模型上线！4B 推理狂飙 53 倍，全新注意力架构超越 Mamba 2](https://juejin.cn/post/7542443530125639730 "刚刚，英伟达新模型上线！4B 推理狂飙 53 倍，全新注意力架构超越 Mamba 2")
		[Jet-Nemotron 是英伟达最新推出的小模型系列（2B/4B），由全华人团队打造。其核心创新在于提出后神经架构搜索（PostNAS）与新型线性注意力模块 JetBlock。](https://juejin.cn/post/7542443530125639730)
	- [
		新智元
		](https://juejin.cn/user/952600743642312)
	- 236
	- 1
	- 评论
- [即插即用! | 苹果推出新型网络架构 FastViT: 又快又强又稳，端侧一键部署毫无压力！](https://juejin.cn/post/7223716173333545017 "即插即用! | 苹果推出新型网络架构 FastViT: 又快又强又稳，端侧一键部署毫无压力！")
		[本文提出了一种通用的混合视觉转换器，它在多种计算结构上非常高效，包括移动设备和桌面级 GPU。 通过结构重参数化，所提模型FastViT显著降低了内存访问成本，尤其是在高分辨率下提速明显。](https://juejin.cn/post/7223716173333545017)
	- [
		CVHub
		](https://juejin.cn/user/963636095357966)
	- 599
	- 1
	- 评论
- [5090 vs 4090部署模型选谁？5句真话骂醒你！—不聊参数，只讲人话，听劝省钱](https://juejin.cn/post/7522111633187995687 "5090 vs 4090部署模型选谁？5句真话骂醒你！—不聊参数，只讲人话，听劝省钱")
		[5090 vs 4090部署模型选谁？5句真话骂醒你！\*\* ——不聊参数，只讲人话，听劝省钱！\*\* 哎，搞AI的！老黄（英伟达）今年初扔出核弹卡RTX 5090，是不是被5090的“战未来”宣传整迷糊](https://juejin.cn/post/7522111633187995687)
	- [
		用户503250524823
		](https://juejin.cn/user/1831106768282570)
	- 238
	- 点赞
	- 评论
- [128 卡 4 天时间！百度百舸助力 LLaVA-OneVision-1.5 刷新多模态大模型训练效率纪录](https://juejin.cn/post/7562778500198744107 "128 卡 4 天时间！百度百舸助力 LLaVA-OneVision-1.5 刷新多模态大模型训练效率纪录")
		[128 卡 4 天时间！百度百舸助力 LLaVA-OneVision-1.5 刷新多模态大模型训练效率纪录](https://juejin.cn/post/7562778500198744107)
	- [
		百度智能云技术站
		](https://juejin.cn/user/3472695814005120)
	- 100
	- 点赞
	- 评论
- [部署模型选5090还是4090？别纠结！看完这篇闭眼选——实测玩家说大实话，不绕弯子！](https://juejin.cn/post/7522506533637292051 "部署模型选5090还是4090？别纠结！看完这篇闭眼选——实测玩家说大实话，不绕弯子！")
		[部署模型选5090还是4090？别纠结！看完这篇闭眼选——实测玩家说大实话，不绕弯子！\*\*\*\* 嘿，搞AI的兄弟们！老黄（英伟达）今年初扔出核弹卡RTX 5090，参数猛如虎！手里攥着4090的你](https://juejin.cn/post/7522506533637292051)
	- [
		用户503250524823
		](https://juejin.cn/user/1831106768282570)
	- 670
	- 点赞
	- 评论
- [Opus 4.6 Fast 模式凭什么快 2.5 倍？拆解 Anthropic 的推理加速路线](https://juejin.cn/post/7604805226696540198 "Opus 4.6 Fast 模式凭什么快 2.5 倍？拆解 Anthropic 的推理加速路线")
		[Anthropic 说 Opus 4.6 Fast 模式"速度提升 2.5 倍，智能水平不变"。这句话听起来像玄学。 模型参数没变，训练数据没变，同一个模型怎么突然就快了两倍多？](https://juejin.cn/post/7604805226696540198)
	- [
		147API
		](https://juejin.cn/user/872345976974154)
	- 16
	- 点赞
	- 评论
- [\[大模型实战 06\] 我的模型我做主：在 Kaggle 上用 Unsloth 极速微调 Qwen3](https://juejin.cn/post/7603721514204250121 "[大模型实战 06] 我的模型我做主：在 Kaggle 上用 Unsloth 极速微调 Qwen3")
		[基础理论结束，咱们今天的重心是使用快速高效的微调库Unsloth在Kaggle的T4显卡上，用15分钟将Qwen3-4B模型微调成认主咱们的专属模型。](https://juejin.cn/post/7603721514204250121)
	- [
		阿尔的代码屋
		](https://juejin.cn/user/2637068702854868)
	- 84
	- 点赞
	- 评论
	![[大模型实战 06] 我的模型我做主：在 Kaggle 上用 Unsloth 极速微调 Qwen3](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/882b312fe29b4301ad86bf91f0a3de3a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6Zi_5bCU55qE5Luj56CB5bGL:q75.awebp?rk3s=f64ab15b&x-expires=1772610200&x-signature=vOncq6oFhKZTSU9QlTpPmxa9YGY%3D)
- [Day0 迁移、一键部署，华为开源的昇思 MindSpore 成为大模型开发的 “万能钥匙”](https://juejin.cn/post/7514858513441931298 "Day0 迁移、一键部署，华为开源的昇思 MindSpore 成为大模型开发的 “万能钥匙”")
		[没有一个大模型可以一统天下。 这，或许已经成为了 AI 大模型时代行业里的一个共识。 在如此背景之下，面对众多且日新月异的主流大模型和 AI 技术，如何能在...](https://juejin.cn/post/7514858513441931298)
	- [
		量子位
		](https://juejin.cn/user/2858385963484488)
	- 145
	- 1
	- 评论