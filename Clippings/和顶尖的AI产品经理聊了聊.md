---
title: 和顶尖的AI产品经理聊了聊
source: https://mp.weixin.qq.com/s/uGkg3Il_hraOP85UszFAPg
author:
  - "[[高手咨询]]"
published: 
created: 2025-06-03
description: 模型能力是过去的Product（产品），研发是算法，数据和评估标准是PRD
tags:
  - 连续创业者
  - 好数据的定义
  - 胜在认知
  - 双边网络效应
  - 注意力变现
---
Original 高手咨询 *2025年05月27日 18:30*

最近约谈了一位朋友，他绝对是AI行业最顶尖的产品经理之一，聊的时候真的是 “醍醐灌顶”（交流时当面给的反馈），他的观点新颖，思考问题经常触达本质，很难想象有这样认知的创业者还不到30岁，非常厉害！经过同意，把交流的内容进行编辑后共享给大家，希望对AI行业的从业人员有所帮助。

简单和大家介绍下朋友背景：连续创业者，从大学开始创业，先后做了四五家公司，主要是CEO和产品负责人的角色，目前在国内顶尖的大模型公司Sand.ai分管产品、运营等方向。

  

文章分五部分，概要如下：

一、关于个人和公司

★ 为什么选择加入Sand.ai?

★ 为什么在4月21号发布视频生成模型MAGI？

★为 什么选择开源？

★ 最近工作过程中思考的问题或者重点？

  

二、AI时代下的产品经理

★ AI时代的产品和过去有什么差异？

  

三、关于视频生成行业

★ 视频生成行业，现在业内都有哪些技术路线？

★ 做好视频生成的核心因素有哪些？

★ 视频领域为什么可灵是第一？

  

四、如何看待大厂和创业公司之间的竞争

★ 怎么看待大厂比创业公司更有机会？

  

五、对商业的理解&AI的未来

★ AI时代有没有可能诞生更伟大的商业模式？

  

一、关于个人和公司

我记得当时选择下家的时候，观望期比较久，最后为什么选择加入Sand.ai？

和曹越（Sand.ai CEO，前光年之外联合创始人）会交流很多，核心是识别出足够优秀的CEO，以及确定自己可以在这里得到新的成长，无论是对技术的认知，还是对如何做好一件事本身的理解。

为什么在4月21号发布我们的视频生成模型MAGI？ （https://github.com/SandAI-org/MAGI-1）

这个时间点发模型也希望能获得一些反馈，我们知道他还不是SOTA（State of the Art最先进的水平），这只是团队的第一个模型。但它很大程度上证明了视频模型的技术路径远没到收敛的时刻，AR（Autoregressive model自回归）不仅有潜力、而且是真实可行的 —— 总得有人先做出来，然后才有机会推动更大共识的形成。

你们为什么选择开源？可灵，海螺，即梦都没有。

这是个大事，不同的人有不同的视角。仅代表我自己来说，比较喜欢Build in public。我本能般的相信：所有你向世界传达的信号，世界会加倍回赠予你。多做事、多互动、多迭代。

可不可以分享一些最近工作过程中思考的问题或者重点？

更多的是在思考产品经理如何帮助模型能力的提升。主要体现在两块， 一个是对数据的定义，一个 和评测相关的所有流程。

一．数据的定义

互联网有海量的数据， 什么是好的数据，什么样是好的视频 ，很多人讲清晰度高就是好视频，很明显这个理解还很粗，但即便是清晰度高的视频，那 清晰度高的定义是什么？ 比如1080P的视频算高清的视频，但举个例子，互联网上有非常多的视频巨不清晰，它还是1080P，这是为什么呢？视频可能从手机拍出来，传到网上，再被搬运到其他地方，再被下载。在这个过程中，视频会经过多次的格式转换和压缩，每一次都在损失视频信息，但它并不降低视频本身的分辨率，它依然有那么多个像素，但像素的信息有损，原来九个像素点有9种颜色，转换的过程中变7种颜色，再变6种，视频整体就会变模糊，所以只用清晰度是完全不足以去衡量一个视频是否清晰。

再比如说你 希望生成的视频动作很连贯很流畅，那什么样算流畅？ 有很多人觉得流畅就是帧率高；也有人说就要找码率高的视频，其实都不是。 电影一秒24帧，一帧就是24张画面拼成一秒的视频，而短视频平台可能一秒60帧，打游戏一秒120帧 ，那为什么打游戏一秒60帧你会觉得卡，电影一秒24帧低了一倍多，但你从来不会觉得卡，反而认为这很流畅，为什么？ 电影一秒24帧，帧率很低，依然流畅的原因是在一秒内发生所有事件的所有信息，没有丢失。 为什么没有丢失？比如你打游戏，游戏是用电脑模拟，也就是游戏的所有画面都是电脑演算出来的。电脑演算画面比如一秒也算60帧，但它是60个独立的帧，就是打游戏的时候，任何时候你按空格，你会发现静态的画面都非常清晰，因为它是被演算出来的。在现实生活当中，你用电影的摄像机，它是通过不断的曝光来保存光学信息，它是把快门上一圈跟下一圈间隔时间所有的信息压缩在同一个画面上，所以你看电影的时候，人物动作稍微快一点，一按暂停，一定是糊的。虽然糊，但是从A点到B点的信息都做了保留，所以它24帧所有的轨迹是完整的。在他动起来的时候，你可能觉得它不够清晰，有点糊，但你绝对不会觉得他动作不连贯，反而会觉得它很流畅。 总结下来：当我们试图定义“好视频”的时候，如果有一个标准是希望他内容很流畅，本质上是你需要它尽可能的信息完整，这是来自于动态模糊程度和帧率共同叠加，才导致他信息丢失的比较少。 如 果希望几乎没有动态模糊，那就最好把帧率拉到极限。如果一秒钟24帧，那最好要匹配上适度的运动模糊，这样你的轨迹依然信息连贯。

好的视频、好的数据需要在非常多的维度上做精准的定义，所以这一环需要思考的太多，需要研究东西太多，包括哪些类型/哪些渠道的数据通过什么样的算子分别做完怎样的数据处理之后，最终你能拿到符合你标准的的数据？这是个很漫长的工作，这件事需要打磨到足够好。

另外，对数据的定义，其实与我们的目的有相关，如果电影里面的场景跟游戏里面是不一样的，那我们再去做数据定义的时候，需要先想清楚到底是要解决哪种？

假设你的基础能力已经比较好了，但是你的用户只想生成类似电影感的画面，那你就要基于特殊的需求，针对性的微调，比如说最能代表电影画面的视频数据，用它去做微调，所以对 数据的需求是贯穿模型训练所有阶段，不管是预训练、SFT（supervised fine-tuning监督微调）还是QT（quality tuning质量优化），整个过程中全都需要数据。 但是不同阶段需要的数据不一样。

比如说我们要向市场交付一个模型，我们希望大家说好。你要想大家是谁，你希望谁说好。如果你说行业最有审美、最有话语权、最顶尖那帮人，像张艺谋、郭帆、冯小刚都说这个模型最好就行了；还是你希望非常多的人，你想到的或者想不到的人都说你是最好？如果你想一年做10亿美金的收入，可能背后是一个百万级别的付费用户数量，这些用户的判断是最重要的。

所以至少你希望这些人用完你的产品之后，觉得模型生成的能力能满足他的场景，因为他要花钱。可能很多超创说好，大家都来试试看， 但是愿意一个月掏100块钱花，一定是你自己觉得它好。 如果我需要的是100万人觉得好，每个人生成的视频总归不会是完全一样的，不同人有不同类型的图片，不同类型的prompt，会给不同的的提示词，用在不同的场景里。

如果想让大家都觉得好，你的数据是不是要分布足够广？并不是用户在生成特定类型的画风、特定类型的人物、特定类型的动作的时候才好。 所以当定义好的时候，本身就有一个分歧，就是少数人的好还是多数人的好？ 如果是多数人的好，对数据本身就会再提一层要求，数据要“多”。这个多还不是单纯的量，是指在足够多的内容细分的维度上，细分的种类上，都能做到足够的覆盖，充分的覆盖，这个叫多，或者叫丰富，又或者叫足够。

大家都知道， 训练模型很大程度上是让模型通过训练数据学会预测数据 。

在学习的过程中，有一些特性，其中有一条特性是 模型从不同类型数据中学习的效率是不一样的。 有些数据放一小点他就学明白了，在生成跟他比较像的视频的时候就手拿把掐；有些内容对模型来说可能难一点，他需要更多更大比例的数据。

所以除了足够，还要有合理的分布。那什么才是合理的分布？怎么判断这个分布是合理的？ 训练模型是不可解释的，很多事儿是不可解释的，所以回答这个问题不是先验的，那就回归到 人类最朴实的方法-评测 。

二．和评测相关的所有流程

评测是一个很笼统的概念，用来判断模型是不是好，但它也包含很多维度，为了其中任何一个效果的提升，算法同学每天会研究各种的实验，提出假设，做有效的实验，但实验如果想要闭环，那就需要一个很明确的结论，就需要评测， 评测分为针对性的评测和通用性的评测 ，通用性评测是指做实验之前和做实验之后，训出来有两个版本的模型，那就让他们在一个比较通用的评测集上去跑一圈，看看谁表现更好；针对性的评测，是希望在特定方向上想要做提升，那到底评测什么维度，到底准备什么样的评测集（考题），怎么打分，什么样算高分，都要去充分的去定义清楚。

在评测上，语言模型和视频模型上有哪些不一样的地方？

这里面比较大的区别 是多模态的识别和感知能力没有那么强，这就意味着语言模型很多的评测可以自动化 ，自动化的意思是它基于不同的query（提问）生成的结果是可以用另外一个大模型来给它打分进行评测，而且会比较可靠，他可以通过模型的答案知道是否已经解决，且很多东西是有标准答案的，而在视频模型上没有标准答案。

比如在做预训练的时候，你不停计算loss（损失）降低，loss怎么算？用最简单的方式来说，可以用训练数据差不多的caption（标注），然后 计算出生成视频跟原来训练用的视频数据像素之间的差值，gap越小，生成越接近，可以理解为他学的越好。 先不说过拟合（机器学习中的常见问题，是指创建的模型与训练集过于匹配，以致于模型无法根据新数据做出正确的预测）这些问题，单纯loss（损失）降低到一定份上之后也就没用了，再往后都是人的理解域，暂时没有好的数学语言来表达。

这种情况下，因为当前多模态的识别感知能力没那么强，所以第一，你很难找一个很强的VLM（Vision Language Model视觉理解模型），让它来帮你识别生成结果好还是不好，更好还是更差了，是否更符合你的标准，这只能靠人来。第二，因为是希望让全世界所有人都觉得你的模型生成的视频最好，那你最终还是向人对齐的。因为最终评价你的是人，人觉得好就是好。

那在 这个过程中大量的评测，比较依赖于要找到大量的标准化，能够做标准化评测的人去做执行工作。

总结：数据和评测说起来很简单，类似于做好互联网产品很简单，但其实这里面包含的细节就太多了。刚刚提到的这些只是冰山一角。模型训练包含了大量复杂、跨学科、很小又很重要的item。 智能的涌现弥补不了认知和执行的缺失，SOTA（State of the Art 最先进的水平）只靠“神之一手”是不够的，所以做产品的人不能偷懒，总指望团队里的天才算法们会搞定一切，是个危险的思想。

听了数据和评测的这些描述，好像是把上一代的产品经理对产品理解的feature（特征）转化为这一代的模型的过程？

对，其实就是模型能力。

二、AI时代下的产品经理

大家都在聊AI时代的产品和过去有什么差异，很想听听你的看法。

做AI时代的产品， 本质上要花更多时间在理解模型能力上。

传统互联网产品经理的所有产出都是要通过做一大堆feature（特征）来实现，大家用到的产品就是无数多个feature构成的。今天用到的模型产品，大家在乎的不是传统意义上的feature，而是这个模型到底有什么能力。 所以模型能力才是更重要的feature。 我现在会花越来越多的时间去研究思考做哪些工作可以提升模型能力。如何提升模型能力，就是之前讲到的数据和评测。否则产品做的再好看，功能再多，用户希望生成的视频能翻个跟头，但是你的产品无法完成，那你做的再好都没用，大家要的是结果。

在大模型时代，和过去的产品经理对比，我有一个比方： 模型能力是过去的Product（产品），研发是算法，数据和评估标准是PRD。

解释下：现在的算法尽可能把模型以高性能的形式去交付，和传统的研发类似；PRD（Product requriement document 产品需求文档）只要下明白，研发同学能力在线，他们就能把你的需求还原，你搞什么样的数据模型就能有什么样的能力；

这个比方也有不完善的地方，比如模型本身训出来之后，往往会涌现出一些之前设计时候没有想到的能力，但他至少有一面是你可以完全对标以前互联网产品的，比如你想优化你的产品，导出最好的产品， 先出最好的需求。

那需求从哪来？ 对数据、场景、用户等的理解就很重要，对场景理解最终转化成对数据的理解，再转换成数据的需求；

这就是我要从哪些地方搞来多少数据以及如何分布，用他们做预训练，做SFT、QT，所以这里大家对AI产品经理就有一个小的误解，就是 希望产品经理对技术要多么了解，看多少paper，但这么一分析，其实也不需要对技术有多深了。

所以你看paper吗？

没那个能力，看不懂。但即便这些东西我完全不看，在我能参与到的能够带来一些帮助的部分上，就已经有太多的事要做了。所以我觉得充分的去理解这件事，会有助于我们去思考每天要怎么分配自己的时间。

所以有一个事儿很反常识， 如果一个好的模型产品经理必须要懂算法，与其让懂产品的人学习算法，不如让算法的人学习做产品。 如果优秀算法数量非常少，那不那么优秀的算法总归是有的，他在算法上面的知识水平，最牛逼的产品经理学个五年估计也赶不上他，所以还不如在算法里挑一挑产品sense比较好的人。当然， 对产品经理来讲，什么能力最重要？是找需求的能力，最重要的需求是怎么找来的？是足够理解人性。

你不需要理解所有人的人性，只需要理解两个维度的人性：

第一， 最Common Sense（常识） ，每个人都有的人性，甚至我觉得都不能叫懂，因为只要是人，基本都懂人性，所以这应该叫保持对人性的重视和尊重，就别逆人性做；

第二， 针对你想要服务的特定人群，在特定场景下他的基础人性会演化成什么样子。

我觉得这两个就是产品里最核心的能力了。

所以从这个维度来看， 以前和现在，对产品经理能力的需求没有任何变化，只不过现在多了一些额外的部分。现在的这些洞察，不只用来交付成一个传统意义上的PRD，而是变成你要告诉大家我们最终希望有什么样的模型能力，这个模型能力能解决什么样的用户群体需求。

其实不光做产品，做生意就是都要有这样的共性，你还是要把握住大家的需求，只不过做不同类型的生意，最终需要的执行还不一样，尤其是洞察之后你还得拿出一个靠谱的解决方案，还要有大量能够持续交付这种解决方案的能力。我自己创业这么多年，最大的感受就是很多人老是想不明白，为什么成功的是他，成功不是他。这太正常了，因为我们作为局外人，缺失信息实在太多了， 看上去再简单的事儿，背后真执行起来永远是数不清的细节。

有一种成功方式是：在无数多的细节上都做的比你好，那最后的结果就是会比你更好。 所以每个事都是非常复杂的。我觉得做AI产品或者强模型依赖的产品，你看上去产品交互上不需要雕花那么多了，但工作难度完全没有降低。

By the way，这种成功方式是做ai之后思考更多的，古典产品经理最期望的路径应该不长这个样子， 找到一个容易被忽视但极其关键的切入点，打穿之后颠覆整个世界，这种机会也需要持续寻找。

三、关于视频生成行业

视频生成行业，现在业内都有哪些技术路线？

其实到目前为止应为没有什么水下的了，主要是Diffusion和AR+Diffusion，还可能有一种新的范式，就是以语言模型为核心的多模统一，把图像、视频、音频、语言模态完全统一，目前初步跑通的，可能只有谷歌和OpenAI了。但很难，因为 视频本身就等于一系列在时序上有因果关系的图像+音频 ，它本身就足够复杂，这是个老大难问题，大厂肯定在做，但什么时候能拿出来就不一定。

还有一类，是大家就不会把自己定义为视频模型，可能在训练模型的过程中会大量的用到视频数据，它可能做视频理解，也可能生成游戏，或者生成一个可视交互的视频流。这个方向也有蛮多工作在开展。

那从一个长周期的情况来看，想要做好视频生成这件事，核心因素有哪些？

算法、数据、评测、infra， Infra很重要，现在所有环节都要在机器上跑，训练、推理、包括各种数据处理的pipeline，有靠谱的infra团队，做各种事情的效率才高、成本才低。

具体到细节，里面的事有很多，比如数据标注，数以亿计的视频不可能靠人标注，甚至让人来refine（完善）一下，产能都很有限，所以至少预训练阶段只能靠大语言模型去caption（标注），那用什么模型呢？模型需要自己训出来吗？还是微调出来的呢？这里面的步骤很多是循环依赖的。光给数据打caption（标注）这件事儿就需要模型去干，这个模型又需要算法去搞，算法搞完了模型够不够好，需要评测，所以这事情是要转个圈，很多环节上都是乘法的关系。

所以我理解 现在如果想交付出好的模型，先不说你团队有没有足够长板，但起码不要有短板，没短板是重要的基础。 等到大家做到接近Kling的水平，接下来要顶峰相见，这时候就要比长板，比如你有没有独家的数据，在模型训练上有没有独到的心得，比如除了SFT、QT、RL，还有没有什么办法能进一步的去提升模型在用户能感知到层面上的表现，又或者sand.ai在尝试的，通过结合自回归做整个架构上的创新，这才到了拼创意、拼能力上限、拼天才的时候，就是创新性。

在视频领域为什么可灵是第一？

与其研究可灵为什么能做的这么好，不如思考字节为啥做不好，这才是个值得研究的问题。 数据 ，infra、算法的人才储备，对场景、对业务的理解，对什么视频是好视频的的理解，字节跳动好像没有理由比可灵差，通常要解释这个问题，一般都会说是大公司病，那谁不是大公司呢？快手难道不是大公司吗？快手的组织力跟执行力难道比字节强吗？所以大公司病我觉得不能解释这个问题，我更倾向于一号位差距，不是公司一号位，是具体业务一号位，别的不说了，毕竟我知道的信息太局限。

四、如何看待大厂和创业公司之间的竞争

今年和大家聊起来，普遍还是说大厂比创业公司更有机会，你怎么看待这件事情？

这个问题永远存在。不管做哪个赛道， 只要大厂跟创业公司有一样的认知，在类似的时间点做一样的事儿，我从来都不觉得创业公司会有什么胜算。

当年今日头条刚起量的时候，腾讯新闻的量也不小，各种信息流产品或多或少也在做推荐算法的尝试。但这件事的优先级被拔得有多高？它本身的商业模式有没有想清楚？它未来的上限有多高？它值得你用什么样的的节奏去做这件事？这些都反映了你的认知是什么。

如果在张一鸣创业做字节跳动的时候，腾讯内部有对这件事儿认知一样的人，身居高位，手握重金，你觉得张一鸣会有机会吗？我觉得太难了。

腾讯有自己的流量池，只要认知到位就容易成，你看视频号这几年也硬生生的被做起来了。当年微视时期没用这套打法，是mindset的问题，单论战斗力的话，这些公司战斗力从来就没有弱过。

说腾讯可能都不是最好的例子，当年3Q大战、舆论危机之后，腾讯的杀气弱了很多，更多做投资了。今天的字节没这个限制，一万匹脱缰的野马在所有路线上饱和式进攻，战意是很旺盛的。

那这种情况下，创业公司的胜算是什么？ 认知比大厂更好，体现在哪些地方？

- 大厂觉得这事儿不重要，你觉得他重要；
- 大厂觉得这事儿值10亿美金，你觉得它值1000亿美金；
- 大厂觉得这事儿三年后成熟，你觉得就是现在。

你的认知对了之后，把你能把握住的所有事都把握好，再把节奏拉满，胜算还是很大的。大厂的战线很长，真正的S级人才总是很有限的，没有足够的认知，大厂也很难做好调兵遣将。 何况代理人问题本身就很难解，最厉害的人如果没有做好利益绑定，不会燃烧自己的。

传统互联网巨头的成功方式是：我的产品或多或少具备规模效应，比如微信是关系链，关系链是网络结构的，会有网络效应。淘宝跟抖音具有双边网络效应，或者叫双边规模效应，有越多人看视频，创作者就会有越多流量，越好赚钱，同时也满足创作者被看到的需求，他们会更有动力生产更好的内容，火了之后又会有更多的人想来做视频，就会有更多的创作者；有更多优质创作者之后，又会满足更多的人对内容消费的需求，就会有更多的用户。这就是很典型的双边网络效应。

这个东西形成之后，大厂一时半会是追不上来的，因为你的创作者数以百万计，他不可能一个一个去找，全都挖过来，而且来了就做好对应的流量分配，这不现实。

所以在模型上也一样，如果只单纯PK基础模型能力，我也比较认同大厂会笑到最后的。

因为对大厂来说，我现在不如你，我迟早会赶上，算法上所有的learning迟早会开源，人才也会流动交流，接下来无非是砸钱和用时间来压实所有细节。至于对用户的洞察和对产品的理解，你做起来了以后我盯着你调研，自然就知道了。

所以最后还是要回到你的产品形态本身是否具备规模效应，有没有双边的供需、有没有网络的结构。没有就要想办法去 闭环：用户使用的行为数据--用户能感知到的模型效果提升 ，目前还没有哪一家能够真正的跑通这件事儿，如果这个能闭环，那就会变成AI产品的新规模效应了。因为我用户已经很多了/因为用户在我这里沉淀的数据比较多，所以我的产品体验变好了。

它不依赖人与人彼此之间生产和消费的关系，它依赖的是人有行为有反馈，就会有数据，有数据就能进一步。不管是与用户的个性化喜好对齐，还是与更通用的模型能力对齐，都能在这些方面去做一些提升。

如果这件事能跑通，创业公司的机会也还是比较大的，否则生命力都不够持久。比如ChatGPT这种类型的产品有什么壁垒吗？如果今天有一家公司的模型比ChatGPT更好，还免费用，大家很快就会使用起来的。

五、对商业的理解&AI的未来

互联网最伟大的商业模式是广告，一切都是交易。那AI时代有没有可能诞生更伟大的商业模式？

AI好像不会颠覆商业模式本身。因为广告其实是把人的注意力变现，那这件事情是互联网发明的吗？互联网之前，电视台、大街小巷的广告牌、报纸，这些都是广告位。

所以对于人们的注意力能够在特定时间变现（即人的注意力本身有价值）这件事情，是大家自古以来都有的认知，只不过大家持续在更新认知，原来这个市场份额这么大。

靠常识去定性并不难，难的是定量。Yahoo的商业模式，线下杂志一直在做，但一次曝光究竟值多少钱？最宝贵的认知都在这个数字里。 如果在2000年有人告诉你，网络广告能赚比世界上所有的报纸杂志加起来都多，而且比从报纸出现到现在所有赚的钱加起来还多十倍，你信不信？绝大多数人都不会信的，创业者自己都不信。

包括因为互联网的技术，不同人看的广告完全不一样，你说这件事儿大家一开始能预料到吗？看起来很合理，但不容易一下子演绎出来。

我觉得商业的本质是不会变的--注意力能够变现的本质是注意力能够影响人的决策。

吸引人的注意力就能影响他人的决策，因为人就是这样的动物，人是基于信息而做出反应的动物。你占了他注意力就相当于灌给他信息，灌给他信息就能影响决策，能影响决策就有可能产生行动，产生行动就有可能产生商业价值，或者说行动本身就是付费。

在AI时代有可能带来的变化是：具体在什么位置，以及以什么样的形式还能再占你一点注意力？这件事是能刷新认知的，另外就是在这个位置占了注意力之后，有可能产生多大的商业价值？

当然，注意力经济只是一部分，直接作为生产力的商业价值也可以做到很大。可以去类比工业革命。工业革命时期有蒸汽机，人类用能源能够驱动机器，从而使机器能够干活。驱动机器干的活包含两类：

- 一类是 人完全做不到的事 ，比如说火车，在工业革命到来之前不可能有火车，因为人和马都拉不动这么大的玩意儿；
- 另外 一类是把原来人能做到的东西，通过体力劳动能做到的东西低成本大规模的复制。

原本我要找100个工人，每天搞100个单位的产能，现在我花十分之一的钱能搞出1000个单位的产能，因为机器很好驱动，只要煤没烧完就不影响。

大模型跟工业革命比较像的点是他把这个范围进一步的从体力劳动转化成了脑力劳动。 人在互联网上用很多工具去操作，大量的说话、打字、思考，这些人类能完成的工作AI也能干。所以沿用工业革命的的逻辑看，AI自然创造的商业价值也会很大。它可以在很多场景里完全替代人的劳动力，而且可以干的比人更好更便宜。

这样的事儿如果真发生了，社会会发生很大变化，技术革命大到一定份儿上，就会带来政治、社会制度的变化。因为工业革命让生产力脱离土地限制，就会出现新的资产类型，就会有资本的富集，进而出现大量资本家，他们比旧时代的统治者更容易拓展势力范围，可以不依赖土地甚至跨国界去操控大量的工厂和工人。

如果AI把人大部分的活干了。这个世界上大多数人在传统的工作定义里面能做出的产出都不重要了，而这可能意味着大多数人以后再也不需要工作了，有可能也意味着大多数人的工作内容会发生本质的改变。

从原始社会，或者说从有人类开始到现在，我们工作的首要任务都是养活自己，求生存。

但接下来不是这样，你那些生存技能AI干的又快又好。这个时候的你，就不靠工作来养活了。你能够被养活，只因为你是个人，你出生了，你有了基本人权，你是人类社会一份子，社会生产力又足够发达，你就应该被养活，就应该饿不死，不然这是文明的悲哀。 以后可能就变成这样了。

那这时候人要干嘛？世界上百分之八九十的人从工作的角度上看是没有任何价值。 那是不是要促使大家重新思考并发现人的价值到底是什么？

大家都被AI养活了，还会涉及到AI+伦理的问题，对它的价值判断。AI生命应不应该被当成一个人一样去尊重？他有没有权利？有没有自主意识？有没有独立的人格？如果AI表现的让你觉得他有自主意识了，那他在道德上有没有一个主体性地位？

如果这些问题发生了，是需要大家去思考的 ，社会可能也会有很大的动荡，这肯定是巨变。

其实现在的AI，从能力上来看应该很接近我们说的这个可能性。但是距离真正发生这件事可能还需要些时间，因为真实世界有自己的节奏。

欢迎查阅过往的访谈系列

[和前华为天才少年聊聊AI Infra](https://mp.weixin.qq.com/s?__biz=MzAxNTc5OTk4Nw==&mid=2650674243&idx=1&sn=1910392d0d0447e9913ad9136efa6fa0&scene=21#wechat_redirect)

[资深业内人士谈大模型](https://mp.weixin.qq.com/s?__biz=MzAxNTc5OTk4Nw==&mid=2650674196&idx=1&sn=33ac6a0a830038eabe038dace189e256&scene=21#wechat_redirect)

继续滑动看下一个

高手咨询

向上滑动看下一个