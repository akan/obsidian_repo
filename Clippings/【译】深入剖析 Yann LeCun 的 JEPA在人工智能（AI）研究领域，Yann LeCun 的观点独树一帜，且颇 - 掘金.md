---
title: "【译】深入剖析 Yann LeCun 的 JEPA在人工智能（AI）研究领域，Yann LeCun 的观点独树一帜，且颇 - 掘金"
source: "https://juejin.cn/post/7488990923051024421"
author:
published: 2025-04-05
created: 2025-05-07
description: "在人工智能（AI）研究领域，Yann LeCun 的观点独树一帜，且颇具争议。截至 2024 年，AI 领域的主要关注点是大型语言模型（LLM）和生成式 AI。我们都被 LLM 在各种环境中的出色表现---theme: channing-cyan---     Yann LeCun 的相关演讲https://r"
tags:
  - "clippings"
---
![横幅](https://p9-piu.byteimg.com/tos-cn-i-8jisjyls3a/80e551ec95e54d3e94bf0f1cdad71e51~tplv-8jisjyls3a-image.image) ![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/ef1b479729b54febacdf28345ebe61af~tplv-8jisjyls3a-image.image)

- [Yann LeCun 的相关演讲](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23relevant-talks-by-yann-lecun "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#relevant-talks-by-yann-lecun")

\* [当前 AI 的问题](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23problems-with-current-ai "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#problems-with-current-ai")

\* [常识](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23common-sense "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#common-sense")

\* [人类如何学习](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23how-humans-learn "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#how-humans-learn")

\* [学会思考](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23learning-to-think "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#learning-to-think")

\* [模态](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23modality "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#modality")

\* [构建人类水平 AI 的框架](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23a-framework-for-building-human-level-ai "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#a-framework-for-building-human-level-ai")

\* [行动者](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23actor "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#actor")

\* [成本](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23cost "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#cost")

\* [配置器](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23configurator "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#configurator")

\* [世界模型](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23world-model "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#world-model")

\* [自监督学习/基于能量的模型](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23self-supervised-learning--energy-based-models "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#self-supervised-learning--energy-based-models")

\* [联合嵌入预测架构](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23joint-embedding-predictive-architecture "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#joint-embedding-predictive-architecture")

\* [分层 JEPA (H-JEPA)](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23hierarchical-jepa-h-jepa "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#hierarchical-jepa-h-jepa")

\* [世界模型架构](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23world-model-architecture "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#world-model-architecture")

\* [数据流](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23data-streams "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#data-streams")

\* [目标驱动型 AI](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23objective-driven-ai "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#objective-driven-ai")

\* [实现 JEPA 的方向](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23towards-implementing-jepa "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#towards-implementing-jepa")

\* [I-JEPA：一种基于联合嵌入预测架构的图像自监督学习方法](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23i-jepa-self-supervised-learning-from-images-with-a-joint-embedding-predictive-architecture "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#i-jepa-self-supervised-learning-from-images-with-a-joint-embedding-predictive-architecture")

\* [V-JEPA：重新审视特征预测，以从视频中学习视觉表征](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23v-jepa-revisiting-feature-prediction-for-learning-visual-representations-from-video "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#v-jepa-revisiting-feature-prediction-for-learning-visual-representations-from-video")

\* [MC-JEPA：一种用于运动和内容特征自监督学习的联合嵌入预测架构](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23mc-jepa-a-joint-embedding-predictive-architecture-for-self-supervised-learning-of-motion-and-content-features "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#mc-jepa-a-joint-embedding-predictive-architecture-for-self-supervised-learning-of-motion-and-content-features")

\* [下一步是什么？](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%2Fblog%2FJEPA-Deep-Dive%2F%23whats-next "https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/#whats-next")

在人工智能（AI）研究领域，Yann LeCun 的观点独树一帜，且颇具争议。截至 2024 年，AI 领域的主要关注点是大型语言模型（LLM）和生成式 AI。我们都被 LLM 在各种环境中的出色表现，以及 OpenAI 的 [Sora](https://link.juejin.cn/?target=https%3A%2F%2Fopenai.com%2Fsora "https://openai.com/sora") 等生成系统所震撼。然而，这些进步对于实现和超越人类水平智能（AGI）这一长期目标有何作用，目前尚不明确。

在他的立场文件 [迈向自主机器智能的路径](https://link.juejin.cn/?target=https%3A%2F%2Fopenreview.net%2Fpdf%3Fid%3DBZ5a1r-kVsf "https://openreview.net/pdf?id=BZ5a1r-kVsf") 和他最近的许多演讲（链接如下）中，Yann 提出了实现人工智能的另一种框架。他还提出了一种用于预测世界模型的新架构：联合嵌入预测架构 (JEPA)。

这篇博文将深入探讨 Yann 对 AI 的愿景、JEPA 架构、当前的研究和基于能量的模型。我们将深入研究这些想法的技术层面，并结合相关分析和参考资料。我还会介绍最近的研究进展，例如 *V-JEPA* 。

这是一篇很长的文章，请随意跳到关于 JEPA、I-JEPA 和 V-JEPA 的部分。

#### Yann LeCun 的相关演讲

[*从机器学习到自主智能*](https://link.juejin.cn/?target=https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1RVYBVi_bWyz-4sZSsu4rSWzDwQBLsvHL%2Fview "https://drive.google.com/file/d/1RVYBVi_bWyz-4sZSsu4rSWzDwQBLsvHL/view")

[*目标驱动型 AI：迈向能够学习、推理和计划的机器*](https://link.juejin.cn/?target=https%3A%2F%2Fwww.ece.uw.edu%2Fwp-content%2Fuploads%2F2024%2F01%2Flecun-20240124-uw-lyttle.pdf "https://www.ece.uw.edu/wp-content/uploads/2024/01/lecun-20240124-uw-lyttle.pdf")

## 当前 AI 面临的挑战

JEPA 架构旨在解决当前 AI 所面临的挑战。为了更好地理解这些问题，我们将研究 Yann LeCun 对截至 2024 年流行的 AI 趋势的批评。

近年来，大型语言模型 (LLM) 和生成式 AI 引起了极大的轰动。LLM 使用自回归自监督学习进行预训练，预测下一个 token。它们在来自互联网和书籍的海量文本和代码数据集上进行训练，并通常会通过监督学习或强化学习进行微调。生成式 AI 广泛指从输入（例如文本到图像生成）创建多模态媒体。

然而，这些模型面临着重大限制：

1\. 事实性/幻觉：当模型不确定时，经常会生成看似合理但实则错误的信息。这是因为它们针对概率似然性进行了优化，而非事实准确性。

2\. 有限的推理能力：尽管诸如思维链（Chain of Thought，CoT）等 prompt 技术能够提升LLM的推理能力，但这些提升仅限于特定类型的问题和解决策略，无法有效提高其泛化推理能力。

3\. 缺乏规划能力：LLM 一次预测一个步骤，缺乏有效的长期规划，而长期规划对于需要持续以目标为导向的行为的任务至关重要。

尽管取得了令人印象深刻的进步，但自动驾驶的挑战仍然显示了当前 AI 与人类水平智能之间的差距。正如 LeCun 所指出的，人类可以在大约 20 小时内学会驾驶基础知识。相比之下，自动驾驶汽车的开发已经消耗了数十亿美元、大量的数据收集和数十年的努力，但仍然没有达到人类水平的性能。

即使实现 5 级自主驾驶，也并不意味着真正的人类水平 AI 或通用人工智能 (AGI)。这种智能将涉及在一天内从头开始学习驾驶，并且仅使用在该体验期间收集的数据，而不依赖于用于微调的大量预先存在的数据集。实现这种水平的适应性智能可能还需要数十年的研究。

### 常识

AI 模型的局限性通常可归因于缺乏常识。常识可以定义为以合理的方式思考和行动。人类和许多动物都具有这种能力。这包括避免极其危险或不正确的行为。在自动驾驶的例子中，AV 系统需要经过培训才能安全地处理新情况。在学习驾驶时，人类会利用他们的常识来知道不要做危险的事情，例如将车开出道路或撞向其他汽车。这对于当前的 AV 系统来说并不明显，因此它们需要大量的训练数据来避免这些行为。

LLM 同样通过无意义或不合逻辑的输出表现出缺乏常识。常识是一个相对模糊的概念，可以被定义为智能体避免犯错的最低标准。为了使 AI 值得信赖，就必须使其具备这种基础水平的理解能力。

常识也可以被认为是世界模型的集合。这些模型能够快速学习新技能、避免在新情况下犯危险的错误以及预测不熟悉情况下的结果。从本质上讲，我们使用世界模型来概括我们的经验。

#### 人类如何学习

人类在婴儿早期便开始形成对世界的基本认知，同时也具备一定的先天知识。与从随机初始化状态起步、且归纳偏置远弱于人类和动物的人工神经网络不同，人类的大脑并非随机初始化，而是在整个生命周期中不断进化、训练和调整。生物通常在出生时便被预设了一定的行为模式，而更高等的生物则能够通过学习获得更多知识，而非仅仅依赖先天本能。

了解婴儿在婴儿期获得常识的程度对于 AI 开发至关重要。如果常识在很大程度上是天生的，那么重点应该放在构建能够模拟进化时间尺度的大型数据集上。如果它主要是通过学习获得的，那么应该优先考虑擅长从有限数据中快速学习的模型。

婴儿的体验虽然无法与进化时间尺度相提并论，但仍然代表着一个庞大的数据集。例如，如果一个婴儿每天醒着8小时，那么在四个月内他们已经看到了大约 960 小时的数据。这些数据还通过其他感官信号和密集的生物监督（疼痛、饥饿、情绪）进行增强。 960小时的数据量大致相当于Kinetics 400视频数据集的规模，Kinetics 400是AI领域常用的一个视频数据集。但相比之下，自动驾驶汽车的训练通常需要数百万小时的视频数据，可见数据效率的差距仍然巨大。

Orhan 和 Lake 的这篇 Nature [论文](https://link.juejin.cn/?target=https%3A%2F%2Fwww.nature.com%2Farticles%2Fs42256-024-00802-0 "https://www.nature.com/articles/s42256-024-00802-0") 探讨了从婴儿视角数据中学习。这项研究表明，即使使用来自婴儿视角的、质量不高的数据，AI 模型仍然可以学习，这进一步支持了婴儿在早期学习过程中数据效率很高的观点。他们证明，计算机视觉模型可以在从婴儿头戴式摄像机收集的嘈杂、缺乏多样性的数据集上进行训练。这些以自我为中心的数据集比标准图像/视频数据集嘈杂得多且多样性较差，但没有强大归纳偏差的 AI 模型可以从中学习。

Yann LeCun 提出的 Emmanuel Dupoux 图表表明，婴儿通常在四个月左右就能理解像物体持久性、固体性和生物运动这样的概念。虽然这种学习过程通常被认为是快速的，但不可忽视的是，在此期间会发生大量的数据处理。

![Dupoux 关于认知发展的图表](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6a2f2c2b875a4ea5a0c6f2c7e7670f29~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc2ltcGxpZnkyMA==:q75.awebp?rk3s=f64ab15b&x-expires=1746882897&x-signature=jwuSCPH8wMXj8nXd2nFXCFqxm6E%3D) [来源](https://link.juejin.cn/?target=https%3A%2F%2Fopenreview.net%2Fpdf%3Fid%3DBZ5a1r-kVsf "https://openreview.net/pdf?id=BZ5a1r-kVsf")

我们尚不明确 AI 系统需要多少数据才能习得与婴儿相同的概念。对于诸如物体恒存性等婴儿能够习得的基本概念而言，模型学习这些概念所需的数据量与人类婴儿所需的数据量之间的差距可能相对较小，或许仅需 960 小时的视频数据即可实现。然而，随着年龄增长和知识复杂度的提升，数据效率的差距将显著扩大。完全自动驾驶汽车开发所面临的挑战便清晰地揭示了这种差距之大。

除了缺乏常识外，我们还提到了当前 AI 的其他三个基本缺陷：幻觉、缺乏规划和缺乏推理。

### 学会思考

大型语言模型 (LLM) 是否真正具备推理和计划能力，是当前AI 社区争论的焦点。虽然这些模型表现出类似于 [推理](https://link.juejin.cn/?target=https%3A%2F%2Farxiv.org%2Fabs%2F2201.11903 "https://arxiv.org/abs/2201.11903") 和计划的行为，但怀疑论者认为它们只是复制了训练数据中的模式。

为了便于讨论，我们将推理和计划视为一种“思考”形式，并将其定义为在产生结果之前，模型内部进行的可变长度的运算过程。当前的深度学习模型采用两种主要机制来进行此类处理：

1\. 深度：神经网络中的每一层都可以看作是思考过程中的一个步骤。然而，这种深度通常是固定的，最近的一些 [研究](https://link.juejin.cn/?target=https%3A%2F%2Farxiv.org%2Fabs%2F2404.02258 "https://arxiv.org/abs/2404.02258") 探索了基于输入复杂性的动态深度调整。尽管取得了这些进步，但最大深度和其他约束仍然限制了模型进行复杂推理和计划的能力。

2\. 顺序生成：基于解码器的 LLM（例如 GPT）一次生成一个 token 的文本。此过程中的每个步骤都涉及一定程度的计算，可以解释为思考。提示工程技术利用这种顺序性来引导模型生成所需的输出。这种方法的一个关键限制是，模型必须在每个步骤中生成一个 token，从而阻止纯粹的内部信息处理。

虽然这些属性使模型能够创造出思考的错觉，但要实现更有效的推理和计划能力，还需要取得重大进展。

许多研究人员将 AI 类比于 Daniel Kahneman 提出的思维双系统模型。系统 1 的思维是快速且直观的，无需有意识的思考即可提供即时响应。相比之下，系统 2 的思维更慢且更深思熟虑，会进行更深入的认知处理。当前的机器学习模型（包括 LLM）主要以系统 1 模式运行，通过单次处理信息而无法提前计划。虽然它们擅长模式识别，但它们缺乏推理或计划能力。

这种无法计划的能力会导致 LLM 输出中出现事实错误。每个生成的单词都带有不准确的风险，随着输出长度的增加，错误概率呈指数级增长。token 生成的顺序性意味着早期的错误会复合，可能会使整个输出无效。这与人类的语言形成鲜明对比，我们在发声之前通常会在更高级别上计划我们的表达，从而最大限度地减少此类错误。在这种情况下，推理可以被视为语音的计划。如果没有有效推理或计划的能力，LLM 本质上就是在“不思考的情况下说话”。

在 JEPA 论文中，Yann LeCun 提出了可以思考的模型的框架。学会思考可以解决当前 AI 模型中的基本问题，并代表着朝着在 AI 中实现更像人类的智能迈出的关键一步。

## 模态

最近的进展已将 LLM 扩展到包括多模态处理和输出，但它们仍然主要以语言为中心。这就引发了关于仅使用语言是否足以实现通用人工智能，以及视觉理解需要投入多少资源的问题：视觉理解是否能够帮助 AI 更好地理解现实世界，从而提升常识推理能力并减少幻觉？

语言是人类体验的复杂概念的一种高度概括和抽象的表达。它的表达能力非常强大，能够描述复杂的科学理论和细微的情感。然而，仅凭语言可能不足以实现完全理解。

人类在共同的知识和文化背景下解释语言。它是一种通过相对狭窄的语音带宽传输信息的高效媒介。当我们处理语言时，大脑会调用已有的知识和经验。这些知识和经验一部分来源于文本，但更大部分则来自于与世界的视觉和物理互动。

目前，由于信息密度更高、数据需求更低且数据可用性更好，语言模型在理解和生成信息方面通常优于视觉模型。

在给定的数据点中，以比特的形式存在一定量的显式信息。但随后存在有用的相关信息。例如，如果你拍摄一张公园的照片，则会使用大量比特来表示每根草叶的位置。但在大多数情况下，这些细节对于理解图像的内容来说没有用处。语言非常压缩。虽然有一些填充词没有添加太多 [信息](https://link.juejin.cn/?target=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DVvPaEsuz-tY%26ab_channel%3DArgonaut57 "https://www.youtube.com/watch?v=VvPaEsuz-tY&ab_channel=Argonaut57") ，但知识与比特的比率很高。但是，对于图像，大多数比特都没有用处。这意味着你需要多个数量级的更多比特数据来学习与语言模型所能获得的同等水平的知识。视频模型进一步落后，因为你需要再增加一个数量级，因为视频中连续的帧大部分是冗余的。

虽然基于语言的 AI 处于领先地位，但视觉学习在某些方面赶上甚至超越语言的一种情况是，我们将有大量机器人/自动驾驶汽车与世界互动，同时收集视觉数据。语言将受到数据限制，新文本生成的速度限制了扩展。在拥有大量机器人的世界中，从视觉世界获得的知识和可用数据集的大小可能会超过文本。但是，这都是非常投机的。我们尚不清楚视觉感知和具身认知对于实现通用人工智能具有何等重要的意义。

## 构建人类水平 AI 的框架

Yann 提出了一个总体架构，用于构建旨在解决上述问题的 AI 系统。该架构旨在使 AI 系统能够感知世界、…

然后，我们将探讨构建此类架构必须解决的各种挑战。目前，这仅仅是一个理论架构。构建某些组件仍然是一个悬而未决的问题，并且组装所有模块将带来额外的挑战。

![LeCun 的智能架构的高级视图](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/dae69c54a8f140ab81e92402de8f9a68~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc2ltcGxpZnkyMA==:q75.awebp?rk3s=f64ab15b&x-expires=1746882897&x-signature=pXWOsY0yfSy3LY0fh3UWt0L08z4%3D) LeCun 的智能架构的高级视图 [来源](https://link.juejin.cn/?target=https%3A%2F%2Fopenreview.net%2Fpdf%3Fid%3DBZ5a1r-kVsf "https://openreview.net/pdf?id=BZ5a1r-kVsf")

此架构包含不同的提议组件。我们将解释这些组件及其关系。

**配置器模块** ：配置来自所有其他模块的输入，并根据手头的任务进行调整。它告诉感知模块要提取什么信息。

\*\*感知模块：\*\*根据不同的视觉、听觉等感官信号估计世界的当前状态。

**世界模型模块** ：估计当前无法直接感知到的关于世界状态的缺失信息，并预测未来的状态。它模拟世界并提取配置器确定的相关信息。

**成本模块** ：将例如饥饿、疼痛等不适程度衡量为能量。此能量是内在成本模块和可训练评论家模块的总和。

**内在成本模块** ：给定世界的当前状态和预测的未来状态，计算成本。这种成本可以想象为饥饿、疼痛或一般不适。这种成本可以直接写入（硬连接）到 AI 代理中，就像 RL 中的奖励一样。

**可训练评论家模块** ：预测未来的内在能量。它具有与内在成本相同的输入。此估计值取决于内在成本，并且无法硬连接。它从过去的状态和随后的内在成本中进行训练，这些信息都存储在内存中。

**短期记忆模块** ：存储关于世界状态（包括过去、现在和未来）以及内在成本的相关信息。

**行动者模块** ：提出行动序列。这些序列由效应器执行。世界模型预测序列的未来状态，然后根据这些状态计算出一个成本值。

## 行动者模块

行动者的作用是根据当前的世界状态和目标，选择最佳的行动方案。行动者提出最佳行动或行动序列。

如果世界模型的预测足够准确且成本函数定义合理，则可以使用基于梯度的优化来确定最佳行动序列。如果行动是离散的，则可以使用诸如集束搜索之类的动态规划方法。

行动者有两种不同的模式。这些模式与我们之前提到的 Kahneman 的系统 1 和 2 对齐。

**模式 1 反应行为** ：一个策略模块，根据感知和短期记忆生成的状态决定采取什么行动。该模块行动迅速并产生简单的决策。需要一个世界模型来估计行动的成本。如果没有世界模型，代理将不得不通过随机尝试不同的行动来探索环境，这是不可行的。可以在观察到下一个状态后调整世界模型。

**模式 2 推理和计划** ：生成一个行动序列以及在该序列下预测的未来世界状态。从这个状态序列中，可以计算成本。计划是通过优化行动序列以最大限度地降低总成本来完成的。然后将行动序列发送到效应器，效应器至少执行序列的开头。状态和成本存储在短期记忆中。该序列可以通过梯度进行优化，因为成本和世界模型是可以进行求导运算的。也可以使用动态规划。此设置中的计划本质上是推理时间成本优化。

代理可能同时运行多个模式 1 的策略模块。在此设计中，代理只有一个世界模型，因此模式 2 只能运行一次。但是，可以设计 AI 以同时拥有多个世界模型和模式 2 过程。这类似于同时有多个想法，因为每个世界模型都在模拟不同的场景和可能性，就像人类在思考时会同时考虑多个想法一样。但是，这将非常复杂，因为不同的模块必须与执行具体动作的部件（效应器）和其他模块协调以避免冲突。而且，这可能就是为什么人类不像这样思考的原因。

可以训练策略模块，使其能够模仿模式 2 推理所产生的行动。这是学习新技能的过程。在人类中，系统 2 的思考可以在经过足够的学习后通过系统 1 完成。例如，在国际象棋中，没有经验的玩家会明确地计划步骤并模拟结果。有经验的玩家可以立即识别模式并做出最佳移动。

## 成本模块

成本函数用于评估不同行动方案的优劣，指导行动者选择能够最小化成本的行动。成本是不可变的内在成本和可训练成本或评论家的总和。

$C(s) = \mathrm{IC}(s) + \mathrm{TC}(s)$

上述公式表示，总成本 $C(s)$ 由两部分组成：内在成本 $\mathrm{IC}(s)$ 和可训练成本 $\mathrm{TC}(s)$ 。

这些成本中的每一个都是由子模块生成的不同子成本的总和。配置器确定每个子成本的权重 $u$ 和 $v$ 。这允许代理在不同的时间专注于不同的目标。

$\mathrm{IC}(s) = \sum_{i=1}^ku_i\mathrm{IC_i}(s)\\\ \mathrm{TC}(s) = \sum_{i=1}^kv_i\mathrm{TC_i}(s)$

以上两公式分别表示内在成本 $\mathrm{IC}(s)$ 和可训练成本 $\mathrm{TC}(s)$ 是多个子成本的加权和。其中， $u_i$ 和 $v_i$ 分别是各个子成本的权重，由配置器决定。

IC 的不可变性可以防止代理为了短期利益而采取损害长期目标的行为。它限制了代理的行为。

$\mathrm{TC}$ 或评论家被训练为预测未来的内在成本。内在成本仅考虑当前状态。可以训练评论家来预测未来的成本，以便代理可以在未来最大限度地降低成本。短期记忆存储 (时间、状态、内在能量) 的三元组： $(\tau, s_{\tau}, IC(s_{\tau}))$ 。可以训练评论家来预测在当前状态之后 $\delta$ 步的未来的内在成本。例如，评论家的损失函数可以是 $\|\|\mathrm{IC}(s_{\tau+\delta}) - \mathrm{TC}(s_{\tau})\|\|^2$ 。此公式训练评论家来预测在当前状态之后 $\delta$ 步的未来的内在成本。 $\mathrm{IC}(s_{\tau+\delta})$ 可以替换为可以从三元组序列中提取的其他目标。但是，它不能依赖于未来的可训练成本本身。

## 配置器模块

配置器控制系统的其他组件。如果这些组件作为 Transformer（一种神经网络架构）实现，则可以通过添加 token 轻松配置它们。配置器将注入 token 以将这些组件引导到某些方向。例如，它可能会影响行动者的某些类型的行动，或者让感知专注于某些属性。

配置器还负责设置成本项的权重。这将允许代理在不同的时间专注于不同的子目标。配置器如何学习将复杂的任务分解为子目标，仍然是一个悬而未决的问题。

## 世界模型模块

在 JEPA 中，世界模型的目的是预测未来某个时刻的世界状态。有三个主要问题

1\. 模型在训练期间能够观察到的状态序列的多样性

2\. 由于世界不是完全可预测的，因此模型必须预测在采取某个行动后，世界可能呈现的多种合理状态

3\. 必须在不同的时间尺度和抽象级别上进行预测

### 自监督学习/基于能量的模型

为了训练世界模型，Yann LeCun 提出了一个基于能量的自监督学习模型 (EBM)。EBM 的核心思想是，学习一个能量函数，当输入 x 和预测结果 y 匹配时，能量函数的值较低；当 x 和 y 不匹配时，能量函数的值较高。这里的匹配是指，y 是 x 的一个合理的延续。

![ebm](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e3074d6f731c48aa9fa0bfcf417e69db~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc2ltcGxpZnkyMA==:q75.awebp?rk3s=f64ab15b&x-expires=1746882897&x-signature=JRf0GpieYvDWgrPjkFneJ%2BVFPhg%3D) [来源](https://link.juejin.cn/?target=https%3A%2F%2Fopenreview.net%2Fpdf%3Fid%3DBZ5a1r-kVsf "https://openreview.net/pdf?id=BZ5a1r-kVsf")

$x$ 和 $y$ 可以被认为是视频，其中 $y$ 遵循 x。EBM 学习一个能量函数 $F(x,y)$ ，当 $x$ 和 $y$ 在现实世界中可能先后出现时，该函数取较低的值，否则取较高的值。

这与生成模型不同，因为 $y$ 不是直接从 $x$ 预测的。可以遵循 $x$ 的 $y$ 值有很大的空间。准确地预测会发生什么是难处理的问题。但是，了解什么是可能和什么是不可能的，是相对容易做到的。擅长此任务需要了解世界和常识。违反物理定律的 $y$ 值应导致较高的能量值。

但是，计划需要预测未来的状态。虽然无法直接预测 $y$ ，但我们可以预测 $y$ 经过编码器后的特征向量。我们可以从编码器获得表示： $s_x = g_x(x)$ ， $s_y = g_y(y)$

将训练编码器，以便通过 $s_x$ 可以最大程度地推断出 $s_y$ 的信息，并且可以轻松地从 $s_x$ 预测 $s_y$ 。我们可以对此表示进行预测，以实现计划。

可以引入一个潜在变量来处理不确定性。潜在变量只是一个任意的随机变量。它是经过变换后，可以用于生成各种可能的 $s_y$ 的随机源。在这里，我们希望将潜在变量映射到 $s_y$ 可以采用的可能值的大空间。

潜在变量 EBM (LVEBM) 表示为 $E_w(x, y, z)$ 。

能量函数的值可以通过找到最小化能量的 $z$ 值来计算。 $F_w(x,y) = \min_{z \in \mathcal{Z} }E_w(x,y,z)$

当所有对都具有相同的低能量时，EBM 将崩溃。当潜在变量过于灵活，可以表示任意信息时，会发生这种情况。发生这种情况是因为 $z$ 可以在更大的空间中变化。这意味着 $y$ 的能量较低的空间相应较大。如果太大，则 $y$ 的能量会崩溃。如果 $z$ 维度与表示维度相同，则模型可以完全忽略 $y$ 并将 $s_y$ 设置为等于 $z$ 。

该论文描述了一个高数据密度区域。这指的是在真实数据中常见的 $(x, y)$ 对。我们希望降低该区域的能量，但保持其外部的能量较高。崩溃是指能量在该区域内外都很低，这使得 EBM 无用。

![image.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/558300c7f5344535b2820fc2c8c6c6f3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc2ltcGxpZnkyMA==:q75.awebp?rk3s=f64ab15b&x-expires=1746882897&x-signature=pduQqH9A2jpL9AmTM1yy%2Fibph2w%3D)

防止模型崩溃，通常采用两种训练方法。

对比方法（Contrastive Methods）： 通过增加与负样本相关的能量来避免崩溃。 这需要一些方法来生成用于对比的样本。 所需的对比样本数量随着表征维度的增加呈指数增长。

正则化方法（Regularized Methods）： 在这些方法中，损失函数被正则化，以最小化能量降低的 $y$ 空间。 这些方法不太可能受到维度灾难的影响。 对比架构可以被正则化。 例如，可以约束潜在维度。

### 联合嵌入预测架构（Joint Embedding Predictive Architecture）

JEPA 是一种能量模型（EBM），它在表征空间中执行预测。 能量是预测 $s_x$ 到 $s_y$ 的误差。

JEPA 需要多模态，这里指的是表示 $y$ 的多个可能值。 有两种方法可以实现。

编码器不变性（Encoder invariance）： 这意味着对于不同的 $y$ 值， $s_y$ 将是相同的。 编码器忽略状态中可能变化的方面。

潜在变量预测器（Latent variable predictor）： 改变 $z$ 将导致对 $s_y$ 的不同合理预测。

![JEPA with a latent variable](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/90785545e50a4fe9b1c80cab2e3e5ca9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc2ltcGxpZnkyMA==:q75.awebp?rk3s=f64ab15b&x-expires=1746882897&x-signature=1JkslEU0dgc4klPRdPtspqD6%2FLE%3D) [Source](https://link.juejin.cn/?target=https%3A%2F%2Fopenreview.net%2Fpdf%3Fid%3DBZ5a1r-kVsf "https://openreview.net/pdf?id=BZ5a1r-kVsf")

有四个标准可以用来训练这个架构，而无需对比损失：

1\. 最大化 $s_x$ 关于 $x$ 的信息内容: $-I(s_x)$

2\. 最大化 $s_x$ 关于 $y$ 的信息内容: $-I(s_y)$

3\. 使 $s_y$ 可以从 $s_x$ 预测: $D(s_y, \tilde{s_y})$

4\. 使用正则化器最小化潜在变量的信息内容: $R(z)$

#### 分层 JEPA（Hierarchical JEPA, H-JEPA）

编码中的信息损失和编码的可预测性之间存在权衡。 如果一个表征包含输入的大部分信息，那么就很难预测。 更抽象和更高级别的表征在维度上会更低，并且更可预测。 较高维度的表征也更适合长期预测。

![H-JEPA](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/2a3bceaf8808481c958cb1ecc7300be1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc2ltcGxpZnkyMA==:q75.awebp?rk3s=f64ab15b&x-expires=1746882897&x-signature=MTaBw35jJd%2BoGVILN%2FH82DhI7ps%3D) [Source](https://link.juejin.cn/?target=https%3A%2F%2Fopenreview.net%2Fpdf%3Fid%3DBZ5a1r-kVsf "https://openreview.net/pdf?id=BZ5a1r-kVsf")

H-JEPA（分层JEPA）通过将架构划分为两个部分，增强了JEPA的抽象能力：第一部分处理低级表示，用于短期预测；第二部分则在更高的抽象层级上运行，用于长期预测。 这种双层结构虽然具有创新性，但其划分方式具有一定的主观性。 真正的智能需要多个层级的抽象，但具体需要多少层级尚不明确。 我们甚至可能需要根据不同情况采用不同层级的抽象。

这种架构可以实现更高层次的规划。 在 JEPA-2 中，我们可以从潜在变量中采样若干时间步。 可以采用定向搜索/剪枝来有效地搜索。 此搜索可用于确定最佳操作。

这种搜索在 JEPA-1 中或没有 H-JEPA 的情况下会有所不同，因为潜在维度太大而无法有效采样。 需要抽象才能实现这种规划。

### 世界模型架构（World Model Architecture）

世界是不可预测的，但对于智能体来说，智能体本身是可预测的。 这可能会激发一种没有潜在变量的自我模型（ego model）。

世界的状态在时间步之间变化很小。 与其重新生成，不如在内存中更新它。 使用此架构，世界模型将仅输出状态的变化。 这可以通过类似注意力的机制来实现。

1\. 世界模型输出查询值对: $(q[i], v[i])$

2\. 世界模型使用查询从内存中检索一个值

\* $\mathrm{Mem}(q) = \sum_jc_jv_j$

\* 从内存中检索到的值是所有值的加权和。

\* $\tilde{c}_j = \mathrm{Match}(k_j,q)$

\* 衡量键和查询之间的差异。

\* $c = \mathrm{Normalize}(\tilde{c})$

\* 这通常是一个 softmax 函数。

\* $v_j = \mathrm{Update}(r,v_j,c_j)$

\* 使用当前值和新值来更新该值。

\* 更新函数可以是 $cr+(1-c)v$

## 数据流（Data Streams）

在构建世界模型时，我们必须考虑人类和 AI 模型处理的数据类型之间的根本差异。 Yann 列出了智能体可用于学习其世界模型的 5 种信息收集模式。

1\. 被动观察（Passive observation）： 无控制的传感器流

2\. 动作聚焦（Action foveation）： 智能体可以在数据流中引导注意力

3\. 被动代理（Passive agency）： 观察另一个智能体的行为和因果效应

4\. 主动自我运动（Active Egomotion）： 可以配置传感器，例如移动相机

5\. 主动代理（Active Agency）： 受智能体行为影响的感官流

当前的 AI 方法主要集中在被动观察上。 要达到智能，可能需要其他模式。

AI 是在互联网数据上训练的。 智能体没有体验过互联网数据。 人类在他们体验过的数据上进行训练。 这是一个根本的区别。 这也是为什么自动驾驶汽车需要如此多的训练数据。 AI 驾驶系统没有他们体验过的其他数据集。 例如，如果他们仅在一个大型的四处走动的数据集上进行训练，那么他们将需要更少的驾驶数据。

从智能体的角度创建大规模数据集具有挑战性，尤其是在达到互联网数据集的规模时。 目前的一个例子是自动驾驶汽车数据集。 自动驾驶公司在道路上拥有庞大的车队来收集数据。 这些是主动数据流。

## 目标驱动的 AI（Objective Driven AI）

这种架构的组件可以组合在一起，以构建一个遵循人类定义目标的智能系统。

感知用于生成世界状态的初始表征。 演员提出一系列行动。 然后，世界模型预测如果执行该行动序列将达到的状态。 然后，此状态用于目标中。 任务目标定义了我们希望系统做什么。 这可能是一项任务或特定问题。 警戒线目标确保系统在没有任何不良行为的情况下完成任务。 这些警戒线将为安全而设计。

针对对象优化动作序列。 在设计对象以使系统的行为符合我们的意愿方面，将会有很大的灵活性。

![Objective Driven AI](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/950888a460dc4758b71527e92dcaae95~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc2ltcGxpZnkyMA==:q75.awebp?rk3s=f64ab15b&x-expires=1746882897&x-signature=CnUXuIDmoazH72eIr%2BFS6iT7c1g%3D) [Source](https://link.juejin.cn/?target=https%3A%2F%2Fwww.ece.uw.edu%2Fwp-content%2Fuploads%2F2024%2F01%2Flecun-20240124-uw-lyttle.pdf "https://www.ece.uw.edu/wp-content/uploads/2024/01/lecun-20240124-uw-lyttle.pdf")

该系统还可以扩展以实现分层规划。 更高层次的规划产生一种状态，该状态将用作较低层次的目标。 这种状态可以被认为是实现更高层次目标所必需的子目标。 我们可以为每个规划级别设置独特的目标和警戒线。

还引入了潜在变量来表示未来状态预测中的不确定性。 更高层次的潜在变量可以被认为是虚构的更高层次的行动。 但是，只有较低级别的操作才能真正直接执行。

![Hierarchal Objective Driven AI](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/1d3799b1f6e74db0922459f2c2d9af6a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc2ltcGxpZnkyMA==:q75.awebp?rk3s=f64ab15b&x-expires=1746882897&x-signature=lLdsxPF1Ay%2FUoIYmK988drgaZJE%3D) [Source](https://link.juejin.cn/?target=https%3A%2F%2Fwww.ece.uw.edu%2Fwp-content%2Fuploads%2F2024%2F01%2Flecun-20240124-uw-lyttle.pdf "https://www.ece.uw.edu/wp-content/uploads/2024/01/lecun-20240124-uw-lyttle.pdf")

## 迈向 JEPA 的实现（Towards Implementing JEPA）

JEPA 论文是一篇立场文件，描述了可能需要数十年才能实现的 AI 愿景。 然而，自从 2022 年夏天发表以来，在推进该架构方面已经采取了一些步骤。 这些论文主要探讨 JEPA 的训练。 他们没有探索其他组件，例如规划。 这些 JEPA 是创建世界模型的第一步。

这些本质上是自我监督的预训练方法。 在与其他作品进行比较时，这些论文将训练速度作为其优势。 它们可以通过更少的预训练周期来实现强大的下游性能。

### I-JEPA：具有联合嵌入预测架构的图像自监督学习

与其他图像 SSL 方法相比，I-JEPA 利用了 Transformer 架构的灵活性。 使用 ViT 是因为它可以在图像中处理任意数量的图像块（patches），而不需要像 CNN 那样在输入中具有严格的形状。

![I-JEPA](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/043de578c68943f797a846689f64abae~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc2ltcGxpZnkyMA==:q75.awebp?rk3s=f64ab15b&x-expires=1746882897&x-signature=hRHtj%2FVLTdtYz893YJqeHB0axjM%3D) [Source](https://link.juejin.cn/?target=https%3A%2F%2Farxiv.org%2Fabs%2F2301.08243 "https://arxiv.org/abs/2301.08243")

输入图像被分割成 $N$ 个互不重叠的小块，然后输入到目标编码器 $f_{\theta}$ 中计算每个图像块的表征向量。这些表征向量构成了集合 $s_y = \\{s_{y1} … s_{yN}\\}$ 。

从这些表征中采样 $M$ 个可能重叠的块。 这些块基本上是包含多个图像块的较大图像区域。

上下文是通过采样一个块（大于目标块）生成的。 当从这个上下文中预测目标时，与目标块的重叠部分会从上下文中被屏蔽掉。 该网络经过训练，可以根据上下文块和目标块的位置编码来预测目标块的表征。 位置编码被添加到输入中，以便模型知道目标的位置。 它的任务只是预测这些位置的表征。

这种架构通过在目标编码器中使用指数移动平均权重来避免崩溃。 这与 data2vec 和 BYOL 中使用的方法相同。

这项工作引入的主要超参数是目标块和上下文块的比例和纵横比。 通常，使用较小的上下文来使这项任务变得困难，这将迫使模型学习更高层次和更有用的特征。

### V-JEPA：重新审视特征预测，以从视频中学习视觉表征

V-JEPA 是 I-JEPA 到视频的扩展。 这是通过将视频视为 3D 图像来完成的。

1\. 从视频中提取 64 帧的剪辑（在 30 帧/秒的情况下约为 2.1 秒的视频），并将其大小调整为 16 × 224 × 224 × 3。

2\. 视频片段被分割成 L 个时空图像块，每个图像块的大小为 16x16x2 (其中 2 代表连续帧的数量)。

3\. 为上下文计算一个随机掩码。 这是一个类似于 I-JEPA 中的掩码的 2D 掩码。 然后在时间维度上重复此掩码。 这种重复是必要的，因为视频很短，并且在不同时间步长的同一图像块会有太多的冗余。 这种冗余会使学习任务变得过于容易。 这种掩蔽会创建一个上下文图像，而目标是原始图像。

1\. 采样 2 个掩码：一个短程和一个远程。 短程掩码覆盖图像中较小的区域并且更加不连续。 这些掩码由重叠块的不同配置构成，如 I-JEPA 中所做的那样。 即使上下文有多个掩码，目标编码器也只需要运行一次。 具有多个掩码可以提高训练效率。

![V-JEPA masking](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/06ede2cda9e04b63b7ee7a083b0ad4a3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc2ltcGxpZnkyMA==:q75.awebp?rk3s=f64ab15b&x-expires=1746882897&x-signature=%2BtDT%2FUf1R32V9fWT2RWbe3NhFfY%3D) 短程（左），远程（右） [Source](https://link.juejin.cn/?target=https%3A%2F%2Fai.meta.com%2Fresearch%2Fpublications%2Frevisiting-feature-prediction-for-learning-visual-representations-from-video%2F "https://ai.meta.com/research/publications/revisiting-feature-prediction-for-learning-visual-representations-from-video/")

1\. 这些 tokens 由 Transformer 编码器处理（图像块的线性投影 + 多个 Transformer 块）。 不需要处理被屏蔽掉的图像块。 目标和上下文有单独的编码器。 目标编码器是上下文编码器的 EMA（与 I-JEPA 相同）。

2\. 预测器通过上下文编码器处理的未屏蔽 tokens 预测被屏蔽 tokens 的表征。 损失是这些被屏蔽 tokens 的表征之间的 L1 距离（来自目标编码器，以及上下文编码器 + 预测器）。

![V-JEPA Architecture](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/12bc6ae059594a15b25d850edd59db2f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc2ltcGxpZnkyMA==:q75.awebp?rk3s=f64ab15b&x-expires=1746882897&x-signature=LVldZy1Dau7urFUlbp5gn4uYb2Q%3D) 与 I-JEPA 非常相似，但增加了一个时间维度。 [Source](https://link.juejin.cn/?target=https%3A%2F%2Fai.meta.com%2Fresearch%2Fpublications%2Frevisiting-feature-prediction-for-learning-visual-representations-from-video%2F "https://ai.meta.com/research/publications/revisiting-feature-prediction-for-learning-visual-representations-from-video/")

这是在预测短视频中的空白。 它不会跨时间预测。 人类学习是跨越时间维度的。

Attentive probing 用于评估此模型在不同微调任务上的性能。 由于输入大小可能会有所不同，因此需要使用它来代替线性 probing。 这只需要学习一个特定于任务的查询 token 和一个位于预训练编码器之上的线性分类器。

V-JEPA 处理小段帧序列。 这些短视频本质上是带有少量动画的图像。 然而，这就是当前视频自监督学习的状态。 为了实现更接近人类甚至动物级别智能的模型，这种方法需要显着扩展。 需要提高视频的分辨率。 此外，该模型需要处理更长时间的视频并跨时间进行预测。 例如，您应该能够根据之前的十分钟视频输入来预测接下来一分钟会发生什么。 这样的模型可以成为智能体世界模型的基础。

V-JEPA 是一个非常有趣的模型，它可能是一个非常重要的研究方向的开始。

### MC-JEPA：用于运动和内容特征自监督学习的联合嵌入预测架构

这是 JEPA 的一个扩展，包括运动信息。 它使用光流目标从视频中学习运动，并使用通用 SSL 学习图像/视频的内容。 光流是估计视频中两个连续帧之间像素移动的方向。

![MC-JEPA](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7c95181f6a7346f68879323fef774f08~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc2ltcGxpZnkyMA==:q75.awebp?rk3s=f64ab15b&x-expires=1746882897&x-signature=x%2F3TO0eS2fs2jxw2luG9H9DGpDk%3D) [Source](https://link.juejin.cn/?target=https%3A%2F%2Farxiv.org%2Fabs%2F2307.12698 "https://arxiv.org/abs/2307.12698")

这种密集光流估计的细节超出了本博文的范围。 光流估计和内容特征学习结合在一起作为多任务学习目标。 采样图像用于内容学习，而从视频中采样连续帧用于光流估计。 编码器在这两项任务中共享。 这是一种 JEPA 架构，因为来自一帧的表征被扭曲以匹配来自下一帧的表征。 使用相同的编码器来处理两个帧。

用于光流估计的架构是分层的。 这可能是 H-JEPA 架构的第一个实例。 该架构基于 [PWC-Net](https://link.juejin.cn/?target=https%3A%2F%2Fopenaccess.thecvf.com%2Fcontent_cvpr_2018%2Fpapers%2FSun_PWC-Net_CNNs_for_CVPR_2018_paper.pdf "https://openaccess.thecvf.com/content_cvpr_2018/papers/Sun_PWC-Net_CNNs_for_CVPR_2018_paper.pdf") 。 每个级别都有不同的分辨率。

![MC JEPA full architecture](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e652e4b31a71495ba7f1bd71db5d2298~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc2ltcGxpZnkyMA==:q75.awebp?rk3s=f64ab15b&x-expires=1746882897&x-signature=g5ASb%2FzC44U3%2FPCMUean5Yu5gVA%3D) [Source](https://link.juejin.cn/?target=https%3A%2F%2Farxiv.org%2Fabs%2F2307.12698 "https://arxiv.org/abs/2307.12698")

图像特征是从 ImageNet 采样的，而视频数据集用于光流估计。 也可以使用视频中的帧作为图像进行内容学习。

这项工作表明 JEPA 框架是通用的。 我们有很多方法可以设计一个世界模型，它可以包含许多可能的目标。

### 未来展望（What’s Next?）

当前对 JEPA 的研究代表了 Yann LeCun 在构建能够实现人类水平 AI 的世界模型方面迈出的重要一步。 尽管目前的重点是为视觉数据创建有效的表征学习模型，但最终目标要雄心勃勃得多。 这项研究的圣杯是一种 V-JEPA 模型，它可以跨越更长的时间范围进行预测，可能通过一种能够处理复杂、冗长的视频（如 10 分钟 YouTube 视频）的分层 JEPA 架构来实现。

为了实现这一愿景，需要进行几项关键的改进。 首先，我们需要拥抱真正的多模态，纳入音频和其他在当前视频模型中经常被忽视的模态。 扩大 V-JEPA 的规模也至关重要，这需要更大的视频数据集和更复杂的模型架构，以便能够处理更高的分辨率。 此外，开发更具挑战性的视频理解基准至关重要，因为当前的标准远未达到图像或语言建模任务中的复杂程度。

未来版本的 V-JEPA 必须超越空间掩蔽，才能跨越不同的时间范围进行预测。 这种根据当前信息预测未来表征的能力对于理解视频内容的时间动态至关重要。 实现这一目标可能需要一种分层 JEPA 结构，其中不同的层级处理不同时间尺度和抽象级别的预测。 也许下一篇 JEPA 论文将介绍一种分层视频 JEPA (HV-JEPA)。

如果您觉得这很有用，请引用为：

> Bandaru, Rohit (2024 年 7 月)。 深入剖析 Yann LeCun 的 JEPA。 [rohitbandaru.github.io。](https://link.juejin.cn/?target=https%3A%2F%2Frohitbandaru.github.io%25E3%2580%2582 "https://rohitbandaru.github.io%E3%80%82")

或者作为 BibTeX 条目：

```
ini 代码解读复制代码@article{bandaru2024deep-dive-into-yann-lecun-s-jepa,
 title  = {Deep Dive into Yann LeCun’s JEPA},
 author = {Bandaru, Rohit},
 year  = {2024},
 month  = {Jul},
 url   = {https://rohitbandaru.github.io/blog/JEPA-Deep-Dive/}
}
```

本文收录于以下专栏

![cover](https://p3-juejin-sign.byteimg.com/tos-cn-i-k3u1fbpfcp/95414745836549ce9143753e2a30facd~tplv-k3u1fbpfcp-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgc2ltcGxpZnkyMA==:q75.awebp?rk3s=f64ab15b&x-expires=1747121135&x-signature=TCOPMskpn93CfEdMRWkobTTTfnc%3D)

LLM

专栏目录

大模型相关内容分享

0 订阅

·

4 篇文章

评论 0

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

APP内打开