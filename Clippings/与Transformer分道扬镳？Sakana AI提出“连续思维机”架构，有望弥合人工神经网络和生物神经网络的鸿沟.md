---
title: "与Transformer分道扬镳？Sakana AI提出“连续思维机”架构，有望弥合人工神经网络和生物神经网络的鸿沟"
source: "https://mp.weixin.qq.com/s/jU8YkrOHjCIJ83S-n32w6A"
author:
  - "[[Weixin Official Accounts Platform]]"
published:
created: 2025-05-14
description: "当地时间 5 月 12 日，由前谷歌顶级 AI 科学家、“Transformer 八子”之一的利昂·琼斯（Llion Jones）联合创立的日本初创公司 Sakana AI（下称 Sakana），推出了一种名为连续思维机（CTM，Con"
tags:
  - "clippings"
---
*2025年05月13日 17:58*

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/JJtKEey0hPZMAkdlaBvcwMLd5JLkcTRv9BNzoSP3qXJZFRdNibDRqOdOypojeIWxWoT1oonm0PvI2C0VgdaY5PA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

  

当地时间 5 月 12 日，由前 谷歌 顶级 AI 科学家、“Transformer 八子”之一的利昂·琼斯（ Llion Jones ）联合创立的日本初创公司 Sakana AI （下称 Sakana），推出了一种名为连续思维机（CTM，Continuous Thought Machines）的新型 AI 模型架构。 连续思维机是一种新型人工神经网络，它利用神经元动力学之间的同步来解决任务。

  

下方视频展示了连续思维机解决迷宫问题的可视化过程以及对真实照片的思考。令人惊讶的是，尽管它并非明确设计用于此，但它在迷宫问题上学到的解决方案非常易于理解，且颇具人性化，可以看到它在“思考”解决方案时，会沿着迷宫的路径进行探索。对于真实图像，它并没有明确的动机去环顾四周，但它会以一种直观的方式这样做。

  

（来源：Alon Cassidy）

  

连续思维机是一种受生物神经网络启发的 AI 模型，其核心推理机制独特地利用了神经元活动的同步性。与传统的人工神经网络不同，连续思维机在神经元层面使用时间信息，从而实现了更复杂的神经行为和决策过程。这一创新使模型能够逐步“思考”问题，使其推理过程可解释且更接近人类。本次研究表明，该模型在各种任务中的问题解决能力和效率都有所提高。 Sakana 团队认为连续思维机是弥合人工神经网络和生物神经网络之间差距的重要一步，有可能为 AI 能力开辟新的领域。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | 在本次研究之中 Sakana 团队重新思考了认知核心中的一个重要特征：时间（来源：Sakana AI）

  

在广为使用的 ImageNet-1K 基准测试中，连续思维机取得了 72.47% 的 top-1 准确率和 89.89% 的 top-5 准确率。虽然这与 ViT 或 ConvNeXt 等最先进的 Transformer 模型相比还有差距，但它仍然具有竞争力，尤其是考虑到连续思维机架构在本质上有所不同，并且其优化并非仅限于性能。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

采取多个步骤来“思考”如何完成任务

  

众所周知，人类大脑在某些领域表现出色，这些领域即便是最先进的现代 AI 也难以企及，而且人类大脑的效率往往要高得多。一直以来，Sakana 团队经常从自然界中寻找灵感，例如利用进化来融合模型、为语言模型进化出更高效的记忆以及探索人工生命空间等。尽管近年来人工神经网络使 AI 取得了显著成就，但它们仍然只是生物大脑的简化模拟。那么，能否通过融入生物大脑中的特征，来解锁 AI 在能力和效率上的新层次？

  

为此，Sakana 团队决定重新思考认知核心中的一个重要特征：时间。尽管自从深度学习于 2012 年问世以来，AI 能力取得了显著飞跃，但是自 20 世纪 80 年代以来 AI 模型中使用的人工神经元基本模型基本保持不变。人们仍然主要使用神经元的单个输出，该输出能够表示神经元的放电情况，但却忽略了神经元放电与其他神经元之间的精确时间关系。然而，大量有力证据表明这种时序信息在生物大脑中至关重要，例如在脉冲时序依赖可塑性（STDP，spike-timing-dependent plasticity）等机制中，时序信息构成了生物大脑功能的基础。

  

在新模型中 Sakana 团队采用的实现方式是：让神经元能够访问自身的行为历史记录，并通过学习利用这些时序信息来计算下一时刻的输出，而不仅仅是基于当前状态做出反应。这使得神经元能够根据过去不同时间的信息来改变其行为。此外，新模型的主要行为基于这些神经元之间的同步，这意味着它们必须学会利用这种时序信息来协同完成任务。Sakana 团队认为，与现有模型相比，这会产生一个更加丰富的动态空间和不同的任务解决行为。

  

在添加了时序信息之后，Sakana 团队在多项任务中观察到了多种非平凡行为。比如，其观察到了高度可解释的行为：在观察图像时，连续思维机会仔细地在场景中移动其视线，选择聚焦于当前最显著的特征，并在某些任务上展现出性能提升。尤其令该团队感到惊讶的是，在神经元活动的动态变化中观察到了行为的多样性。

  

视频 | 展示在连续思维机中观察到的神经元动态样本，揭示了它们如何随不同输入而变化。很明显连续思维机学会了表现出多种多样的神经元行为。对于每个神经元（以随机颜色显示）与其他神经元的协同放电现象，Sakana 团队将其称之为同步化。该团队通过量化这种同步模式，将其作为连续思维机的核心表征机制（来源：Alon Cassidy）

  

这种新型模型的行为机制建立在一项新型表征的基础之上，即基于神经元集群随时间推移形成的同步化活动。Sakana 团队认为这种机制更贴近生物大脑的工作原理，尽管这并非严格意义上的生物学模拟。连续思维机能够利用新的时间维度、丰富的神经元动态和同步信息来“思考”任务并在给出答案前进行规划。之所以在命名中使用“连续”一词，因为连续思维机在推理时完全在内部“思维维度”中运作。它在处理数据时是异步的：它可以以相同的方式针对图片这样的静态数据或序列数据进行推理。研究中，Sakana 团队在一系列任务上测试了这一新模型，发现它能够解决各种问题，并且通常能以非常易于解释的方式完成。

  

该团队所观察到的神经元动态与真实大脑中测得的动态更为相似，而与传统的神经网络相比则显得大相径庭，后者表现出的行为多样性要少得多。连续思维机中的神经元呈现出不同频率与振幅的振荡特性。有时，单个神经元会表现出不同的频率，而其他神经元则仅在执行任务时才显示活动。需要说明的是，所有这些行为都是完全自然涌现的，并非由研究人员设计到模型之中的，而是作为添加时序信息和学习解决不同任务时的副作用而出现的。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | 连续思维机的神经动力学与当前流行的人工神经网络中的动力学之间的比较（来源： arXiv ）

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

测试任务：迷宫求解和图像事物分类

  

由于引入了新的时间维度，连续思维机的一个主要优势在于，该模型随时间推移解决问题的动态过程可以被实时观察和可视化。传统 AI 系统可能仅通过神经网络的一次遍历来对图像进行分类，而连续思维机则可以采取多个步骤来“思考”如何完成任务。为了展示连续思维机的功能和可解释性，Sakana 团队展示了两个任务：迷宫求解和照片中物体的分类。

  

迷宫求解

  

在迷宫求解任务中，Sakana 团队向连续思维机呈现了一个二维的自上而下的迷宫，并要求连续思维机输出解决迷宫所需的步骤。这种形式的挑战性之处在于，由于模型必须理解迷宫的结构并规划解决方案，而不仅仅是输出路径的视觉表示。连续思维机的连续“思维步骤”使其能够制定计划，并能让人直观地看到它在每个思维步骤中关注了迷宫的哪些部分。令人惊讶的是，连续思维机学习了一种非常类似人类的解迷宫方法。Sakana 团队在相关论文中表示，他们能够直观地观察到，模型通过其注意力模式的动态变化，在迷宫中实时探索路径的过程。

  

视频 | 连续思维机通过观察（使用注意力）并直接生成步骤（例如左转和右转等）来解决迷宫问题。它直接利用神经动力学的同步性（即使用同步性本身的线性探测）来实现这一点（来源：Alon Cassidy）

  

这一行为尤其令人印象深刻的是，它自然地从模型的架构中产生。在设计连续思维机的时候，Sakana 团队并没有为其设计追踪迷宫中的路径的方法，而它通过自我学习自行开发了这种方法。此外，当允许更多的思考步骤时，连续思维机会继续沿着路径走，甚至超过它被训练到的点，这表明它确实已经学会了解决同一问题的通用方法。

  

图像识 别

  

ImageNet 是 2012 年引发深度学习革命的经典图像分类基准测试。传统图像识别系统仅通过一步即可做出分类决策，但是连续思维机则能通过多步处理来检查图像的不同部分，然后再做出决策。这种逐步处理的方法不仅使 AI 的行为更具可解释性，还提高了准确性：它“思考”的时间越长，答案就越准确。这使得连续思维机能够自行决定在更简单的图像上花费更少的时间进行思考，从而节省能源。例如，在识别大猩猩时，连续思维机的注意力会从眼睛转移到鼻子再转移到嘴巴，这种模式与人类的视觉注意力非常相似。

  

视频 | 视频展示了连续思维机在图像分类时的行为示例。热力图显示了连续思维机在处理图像时关注的区域，箭头则指向了关注的中心（来源：Alon Cassidy）

  

这些注意力模式为深入了解模型的推理过程打开了一扇窗口，展示了模型认为哪些特征对于分类最为相关。 这种可解释性不仅对于理解模型的决策很有价值，而且对于识别和处理偏差或失效模式也可能非常有用。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

既是与常规深度学习的分道扬镳，也体现了哲学上的转变

  

尽管现代 AI 是基于被称为“人工神经网络”的大脑模型，但即便在今天 AI 研究与神经科学之间的重叠程度却出人意料地低。一直以来，人们选择沿用 20 世纪 80 年代开发的模型，这是因为该模型简单、训练高效，并且在推动 AI 发展方面不断取得成功。另一方面，神经科学正在创建更准确的大脑模型，但这主要是为了帮助人们理解大脑，而不是试图创建更优越的智能模型，当然两者之间也有可能相互促进。这些神经科学模型尽管增加了复杂性，但通常仍不如目前最先进的 AI 模型表现优异，因此可能并不值得为了发展 AI 而去进一步研究它们。

  

尽管如此，Sakana 团队认为如果不去继续推动现代 AI 在某些方面以更接近大脑的工作方式，那将让人们错失找到能力更强、效率更高的模型的机会。2012 年“深度学习革命”之所以能够实现能力的巨大飞跃，正是因为受到了神经网络的启发，而神经网络是一种受大脑启发的模型。因此，Sakana 团队认为应该继续从大脑中汲取灵感。而连续思维机是 Sakana 团队首次尝试弥合这两个领域之间的鸿沟，在某种程度上它展现出更加接近大脑行为的初步迹象，同时它仍然是一个实用的 AI 模型。

  

因此，未来 Sakana 团队将继续朝着这一受自然启发的方向推进模型研发，并探索可能涌现出的新能力。最终，他们希望开发出既能更好地捕捉生物智能、又能保持人工神经网络实用优势的 AI 系统。

  

可以说，随着 OpenAI 和 谷歌 等大型老牌企业加大对基础模型的投资，Sakana 正在开辟一条不同的道路：开发小型、动态、受生物启发的系统，这些系统能够及时思考、按设计协作，并通过经验不断进化。

  

这既代表着在技术迭代上与常规深度学习的分道扬镳，也体现了哲学上的转变，即向更具生物学基础的模型迈进。因此，Sakana 团队将连续思维机定义为向更接近大脑智能系统迈出的一步。

  

据介绍，Sakana 成立仅一年便成为日本发展最快的独角兽企业，获得 英伟达 及众多日本企业的支持。

  

如前所述，利昂·琼斯（ Llion Jones ）是前谷歌软件工程师，在谷歌工作了十多年，他是著名论文“Attention Is All You Need”的作者之一，这篇论文介绍了一种用于自然语言处理的深度学习模型——“Transformer”，它也是大多数最新 AI 模型（比如 ChatGPT）的核心。目前，他担任 Sakana 的首席技术官。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | 利昂·琼斯（Llion Jones）（来源：https://venturecafeglobal.org/speakers/llion-jones/）

  

该公司的另一名创始人是 David Ha，此前他曾在 Google Brain 工作，更早之前在日本东京大学获得神经医学博士学位。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | David Ha（来源：https://analyticsindiamag.com/people/david-ha/）

  

该公司还有一位联合创始人兼首席运营官叫伊藤仁（Ren Ito）。此前，伊藤仁曾担任日本首家独角兽企业 Mercari 欧洲区首席执行官。在进入科技领域前，他拥有 15 年日本外交官生涯。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | 伊藤仁（Ren Ito）（来源：https://www.linkedin.com/company/sakana-ai/）

  

据了解，Sakana 在日语中是鱼的意思，因此该公司的 logo 也是一条鱼。鱼在日本文化中具有重要象征意义，如鲤鱼（コイ）代表坚韧，金鱼（キンギョ）象征繁荣。Sakana 的 logo 不仅体现本土文化认同，也暗示其专注于日语及日本文化适配的 AI 模型开发。同时，这也象征着公司的核心技术理念，即模仿自然界的集体智慧与进化机制。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | 公司 logo（来源：https://sakana.ai/careers/）

  

该公司联合创始人 David Ha 曾表示，在美国硅谷创业难以实现差异化，而选择在日本创业、并采用本土文化元素有助于塑造独特的品牌形象，从而区别于欧美 AI 公司。

  

参考资料：

交互式报告：https://pub.sakana.ai/ctm/

相关论文：https://arxiv.org/abs/2505.05522

代码：https://github.com/SakanaAI/continuous-thought-machines/

  

运营/排版：何晨龙

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

  

01/ [复杂度从指数降低至线性，科学家打造元细胞推断方法MetaQ，让百万级测序数据分析成为可能](https://mp.weixin.qq.com/s?__biz=MzA3NTIyODUzNA==&mid=2649772447&idx=1&sn=6c65a828f1264c8c7fd8a98f593ac6ed&scene=21#wechat_redirect)

  

[0](https://mp.weixin.qq.com/s?__biz=MzA3NTIyODUzNA==&mid=2649772324&idx=1&sn=38be0b6c894b5c938f571636bc26f2a9&scene=21#wechat_redirect) 2 [/](https://mp.weixin.qq.com/s?__biz=MzA3NTIyODUzNA==&mid=2649772324&idx=1&sn=38be0b6c894b5c938f571636bc26f2a9&scene=21#wechat_redirect) [聚变功率输出是托卡马克的100倍？美国公司提出氢硼商用反应堆建造新方案，缩小装置并将成本降低50%](https://mp.weixin.qq.com/s?__biz=MzA3NTIyODUzNA==&mid=2649772409&idx=1&sn=142ee8fbf36b340f7eaefd847e7e684f&scene=21#wechat_redirect)

  

03/ [乐高积木也有AI大模型！CMU华人团队研发LegoGPT，打造包含47000个乐高结构数据集](https://mp.weixin.qq.com/s?__biz=MzA3NTIyODUzNA==&mid=2649772386&idx=1&sn=ef891478af95634fcb2cf976f7556992&scene=21#wechat_redirect)

  

04/ [酒精气味竟能吸引线虫？科学家证明调节钙离子能改变生物喜好，助力治疗成瘾疾病](https://mp.weixin.qq.com/s?__biz=MzA3NTIyODUzNA==&mid=2649772324&idx=1&sn=38be0b6c894b5c938f571636bc26f2a9&scene=21#wechat_redirect)

  

05/ [上科大校友研发小推理模型，成本相比降低99.6%，证明低秩自适应技术强大能力](https://mp.weixin.qq.com/s?__biz=MzA3NTIyODUzNA==&mid=2649772251&idx=1&sn=274373d06263328c15510be67bc40d5b&scene=21#wechat_redirect)

  

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

DeepTech深科技

向上滑动看下一个