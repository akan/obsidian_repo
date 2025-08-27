---
title: "空间智能卡脖子难题被杭州攻克！难倒GPT-5后，六小龙企业出手了"
source: "https://mp.weixin.qq.com/s/tsD_FV7OjyhkBU6kO8AlWQ"
author:
  - "[[关注前沿科技]]"
published:
created: 2025-08-27
description: "开源两个子模型"
tags:
  - "空间智能"
  - "室内场景"
  - "一致性难题"
abstract: "杭州群核科技发布空间大模型，攻克室内场景空间一致性难题并开源两个子模型。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/YicUhk5aAGtBciaTwg4vHyAbraPQc4Efr2cT4GcBnq3hoW55scnA5kWDrM2oxohaYaUFe8rMd1LbqAcGkMX4I2iag/0?wx_fmt=jpeg)

Original 关注前沿科技 [量子位](https://mp.weixin.qq.com/s/) *2025年08月27日 13:47*

##### 白交 发自 凹非寺量子位 | 公众号 QbitAI

最近3D内容生成模型好生热闹，像谷歌Genie 3、World Labs、混元、昆仑争相发布并开测世界模型。

一片喧嚣中，杭州“六小龙”之一 群核科技 低调却重磅地发布了自己的 空间大模型 ，选择了一条与众不同的路径：

**深耕室内场景，并直指行业核心痛点「空间一致性」** 。

不管怎么移动都很丝滑~生成的视角也都是合理的。

从视频生成到AI短剧，令人出戏的空间穿帮、扭曲视角和断裂逻辑屡见不鲜，往往需要反复调教才能勉强可用。 空间一致性 ，已成为横亘在虚拟世界与现实世界之间的最大技术壁垒。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

当前主流技术路线可以分为两类， 一类是以Genie 3为代表的“视频生成派” ，虽能生成动态交互内容，但本质仍是二维序列的仿真。虽然视觉效果很逼真，但难以从根本上保证三维空间的视角与结构一致性。

另一类则是 以World Labs、混元为代表的“3D场景生成派” ，虽能实现360度漫游，却受限于高质量3D数据的匮乏，时常在视角切换中出现场景崩坏、内容穿帮问题。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

而群核的空间大模型，正是致力于突破当前模型遇到的这些挑战。

它不仅在三维空间的视角一致性上表现得可靠，其漫游自由度和真实感上也更具优势。

而要了解这一最新突破，首先需要回答一个更根本的问题：什么是空间大模型？

## 空间大模型是什么？

作为AI从数字世界走向物理世界的关键，李飞飞曾将空间智能的理论框架分为四个维度，分别是空间认知理解、空间推理、空间交互行为与空间生成。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

当前大模型主要局限于文本、图像等二维交互领域，但在三维空间操作（如家务协助）方面仍有距离。像扫地机器人能感知障碍物，却无法理解“花架可移动而承重墙不可撞”的空间常识。

解决这一问题的关键在于 真正的空间理解和认知能力 ，并且在此基础上具备 交互行为 。这既是空间智能的核心价值，也是空间大模型区别于其他AI「二维转三维」探索的最大特点。

不过空间大模型具体能干啥？群核科技的发布，让这一概念变得清晰可见。

用群核首席科学家周子寒的话说，群核空间大模型具备三个特点： 真实感全息漫游场景、可交互性以及复杂空间处理能力 。

此次他们开源的两个子模型—— 空间语言模型SpatialLM1.5和空间生成模型SpatialGen 正是最佳例证。

首先， 真实感全息漫游场景 。

在世界模型中，漫游自由度是衡量智能体在虚拟或仿真环境中空间探索能力的关键指标，它直接反映了世界模型对物理空间的建模精度和交互灵活性。背后这不仅依赖于环境建模，还有对物理规则的理解程度。

不过因为开源3D场景数据稀缺，用户在创作一个空间时很难保证每个视角都有合理的内容，比如离开指定环境就出现崩坏或者内容缺失的情况。

此次开源的SpatialGen，正是基于扩散模型架构，它可根据文字描述、参考图像和3D空间布局，生成具有时空一致性的多视角图像。然后采用一种全新3D高斯重建技术来还原3D场景。

在这个场景里，用户可以四处走动，仿佛置身其中。

其次是 可交互 。

世界模型的一个很重要愿景在于希望它能模仿真实场景中的各种交互，机器人也可以在里面进行移动。

前面提到扫地机器人不懂空间常识，那如果将各种物理参数等词汇都保存在模型中，机器人是不是就能在一个可交互场景中去完成任务了呢？

此次他们发布的另一个模型SpatialLM 1.5，首次定义了空间语言这一概念。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

什么是空间语言？

像传统自然语言模型，你给它一张图，它会用自然语言来描述图中的内容，这就有点像文科生。

但空间语言就更像是理科生，给它一张图就获得整个场景完整的3D信息。它会用坐标轴去描述每个物体中的空间位置，包括它的形状、姿态描述，甚至还包括物体的各种物理属性等。

这种参数化的场景描述方式，使模型既能支持精准的空间生成与编辑，又能为机器人处理复杂任务提供支持，这是传统模型无法带来的独特优势。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

先来看空间生成，不妨拿GPT-5来做下对比测试。

给GPT-5一张空间图，并且补充空间语言的描述，让它基于对空间的理解摆放常见的家具。

结果经过可视化后看到，它并没有对图片有很好的理解，甚至还将原来的轮廓变成了四方形。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

而设计更复杂的Prompt，让它能充分理解空间信息之后再去创作。

这次房间轮廓没有问题，不过家具都摆在了一个房间角上了。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

同样的图扔给SpatialLM1.5， 仅用自然语言 先让它生成三维空间，然后在空间里 放些家具，并且再加上约束：适合老人居住。

可以看到，它将沙发放到了左边，对面有一个电视机柜，旁边还有个轮椅，应该是基于「适合老人居住」的理解。

再来看复杂空间任务处理能力。SpatialLM1.5可以被打造成AI Agent框架，通过调用工具来拥有更多的空间能力。

比如完成机器人常见的路径规划任务。

根据“从卧室床边到客厅”的指令，模型能够基于空间理解能力，调用路径规划工具生成合理路线。

不过这只是群核空间大模型的阶段性探索。群核坦言，相比于文本、图像，空间大模型仍处于较早期的阶段。如果以GPT系列作类比，现在相当于处在GPT-2阶段。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

###### △点击图片可查看完整电子表格

从这里能够看到，要想让模型出现涌现能力，数据正是其中的核心突破点。

而从过去种种进展能够看到，室外场景的探索很多，但聚焦在室内场景的很少。而正在探索并且探索得比较好的，可能就只有群核一个。

## 空间模型仍处于GPT-2阶段

这与业内正在面临的现实挑战紧密相关，关键问题有三个。

首先，数据稀缺性与获取成本高企，尤其是室内空间数据。

不同于语言模型可利用互联网公开文本，空间智能严重依赖真实世界的3D扫描与传感器数据，采集成本极高。室内场景的数据获取更受限于隐私合规、环境多样性、动态物体干扰等多重约束，导致规模化数据积累困难。

据量子位智库报告显示，以室外为主的自动驾驶行业已经出现了空间智能的Scaling Law，但室内却远远未到。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

其次，场景复杂度高，空间语义理解难度大。

室内环境在空间结构、物体分布与功能逻辑上高度复杂。相比规则化的道路场景，家居、办公等室内布局异构性强，物体间空间关系与功能语义细腻多元。例如，理解“将杯子放在桌面上”这类简单指令，不仅需识别物体，还需推断桌面的承重特性、杯子的几何稳定性及人物交互上下文，对模型的深层认知提出极高要求。

最后，交互需求复杂，任务泛化能力更具挑战。

室外自动驾驶的交互模式相对封闭，行为可抽象为有限集合（如路径规划、避障等）；而室内任务需响应开放指令，如“把餐桌旁的椅子推进去”或“找到卧室最亮的灯并关闭”，要求模型兼具动态环境感知、物理常识推理与多步任务分解能力。

现有模型多局限于静态环境建模，缺乏对动作后果预测、物理规律嵌入与人类意图的理解，导致复杂交互泛化能力显著不足。

从这里看到， **数据虽是核心瓶颈，但破局不能仅依赖数据规模** 。

放眼行业， 群核提出「三位一体」的技术战略，也许就能成为行业突破口。这里的「三位一体」，指的是空间编辑工具、空间合成数据和空间大模型，所构成的正向循环闭环。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**工具侧** ，他们打造了全球最大空间设计平台，此外还有COOHOM、棚拍、群核酷空间等来构建和编辑三维世界。设计师和用户在平台上快速创建可交互场景，尤其是装修设计方案，在真实世界中会被实施，从而极大地保证了其物理正确性。

而在 **数据层** ，通过空间编辑工具的持续使用，群核沉淀了全球最大的室内空间深度学习数据集InteriorNet。截至2024年，公司拥有超过4.41亿个3D模型和超过5亿个结构化3D空间场景。此外，还开源了首次将3D高斯引入AI空间训练的3D高斯语义数据集InteriorGS。

**工具** 带来了海量数据的沉淀， **海量数据** 加速了模型的迭代， **模型的升级** 进而提升了工具的体验， **工具的优化** 进一步带来更丰富的场景和数据，这一闭环使群核科技在空间智能领域具备了独特的优势，并致力于成为全球空间智能基础设施。

基于这样的技术飞轮，很多行业关键问题得到了探索和解决。

比如像前面提到的空间一致性问题、机器人训练问题。

值得一提的是，他们专门为视频生成构建了个全新的可控工具，这个工具是基于SpatialGen空间生成能力、自研渲染引擎KooEngine与DIT架构视频生成模型的深度融合。

高质量3D可交互的数据库，显著降低了真实3D场景的构建门槛；通过物理级光线追踪渲染，生成了与人类视觉认知一致的空间表达；并借助DIT模型强大的时空建模能力，在保持空间一致性的前提下实现了动态内容的丰富生成。

最终只需用户简单的输入，工具就能生成符合真实物理规律和用户需求的视频。据群核透露，这个产品将在年内发布。

## 空间智能的第三条路径

当前，空间智能领域正处在一个充满探索与机遇的“前爆发期”。各路玩家依据自身技术积累，已经可以划分成三种不同的路径。

一种是以 **世界模型/视频生成** 玩家为代表，他们主要通过海量视频数据训练，追求生成高质量、长时序的视频内容。然而，大多模型本质仍然还是2D像素序列的预测，在三维空间的结构性理解、视角一致性和物理规则遵循等方面存在先天不足，难以实现可控的空间交互。

另一类则是 **以具身智能、自动驾驶玩家** 为代表，他们致力于在复杂真实的物理世界中实现感知、决策与行动。这条路径聚焦在高度规则性的室外场景，难以直接迁移和泛化到布局异构、交互意图多变的室内环境中。

还有一种，就是以群核为代表的 **原生空间智能路线** 。这类玩家从一开始就深耕三维空间，尤其是被行业相对忽视的室内场景。它们致力于构建具有精确几何、物理属性和语义关系的数字孪生空间。其核心是对空间本身的理解、生成与交互，而非简单视觉内容生成。

尽管方向各异，但整个领域仍面临共通的、严峻的挑战——

室内数据的稀缺与高成本、场景语义理解的复杂性、以及开放交互任务的泛化能力不足。

这些就决定了空间智能发展仍处于比较早期的阶段，尚未出现GPT-4那样的涌现。这也是群核此次选择将模型开源的主要原因：

通过降低技术门槛，吸引大量的研究者、开发者乃至行业玩家参与其中，共同应对行业挑战。

当然这也不是群核第一次开源。今年3月，SpatialLM 1.0版本开源，迅速登上Hugging Face趋势榜前三。目前已有初创企业基于其代码和架构训练出自有模型。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

而此次通过开源，群核能够带动行业快速构建以“空间语言”为核心的标准和生态。当越来越多的玩家基于群核的开源工具和数据集进行开发时，整个领域的数据沉淀速度、技术迭代频率和应用场景创新都将得到快速增长。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

其最终目的，自然是加速空间智能演进，一起做大产业蛋糕~

这多少也是“杭州六小龙”的共同特点，虽然所处的赛道不同，但每一家几乎都是技术驱动的平台型公司。

宇树打造了一个机器人本体平台，DeepSeek打造了基础大模型平台……群核科技则是站在空间智能方向上，正在打造一个面向空间智能开发和落地的赛道级平台。

*Hugging Face：https://huggingface.co/manycore-research/SpatialGen-1.0*  
*Github：https://github.com/manycore-research/SpatialGen*  
*魔搭社区：https://modelscope.cn/models/manycore-research/SpatialGen-1.0*

**一键三连** **「点赞」「转发」「小心心」**

**欢迎在评论区留下你的想法！**

— **完** —

**🌟 点亮星标 🌟**

**科技前沿进展每日见**

  

继续滑动看下一个

量子位

向上滑动看下一个