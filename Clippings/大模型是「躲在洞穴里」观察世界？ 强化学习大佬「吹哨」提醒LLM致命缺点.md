---
title: 大模型是「躲在洞穴里」观察世界？ 强化学习大佬「吹哨」提醒LLM致命缺点
source: https://juejin.cn/post/7514234142776279074
author:
  - "[[机器之心]]"
published: 2025-06-10
created: 2025-06-11
description: 「我一直很困惑，语言模型怎么能从下一个 token 预测中学到这么多，而视频模型从下一帧预测中学到的却那么少？难道是因为大模型（LLM）其实是伪装的大脑扫描仪？」 近日，加州大学伯克利分校副教授、强化
tags:
  - 洞穴
  - 思维投影
  - 强化学习
  - 逆向工程
  - 真正的学习
---
![横幅](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/4aa95988b3f945449bac2d73b1c8d07d~tplv-8jisjyls3a-3:0:0:q75.png)

[机器之心](https://juejin.cn/user/1873223543167902/posts)

30 阅读10分钟

![](https://p26-piu.byteimg.com/tos-cn-i-8jisjyls3a/e0813b7ad241409dab2dcae3db732e78~tplv-8jisjyls3a-3:0:0:q75.png)

> 为什么语言模型很成功，视频模型还是那么弱？

「我一直很困惑，语言模型怎么能从下一个 token 预测中学到这么多，而视频模型从下一帧预测中学到的却那么少？难道是因为大模型（LLM）其实是伪装的大脑扫描仪？」

近日，加州大学伯克利分校副教授、强化学习大牛 Sergey Levine 发出了一记灵魂拷问。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/0cf2eba5c4ca46b1b232f743457f83b3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750153531&x-signature=%2F%2FSkFhcFzPEG8yRDT0d5OraTDqA%3D)

AI 技术在快速发展，人们对于 AI 能力的上限，以及人脑和电脑异同的思考也越来越深入。上周末， [OpenAI 联合创始人 Ilya Sutskever](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzA3MzI4MjgzMw%3D%3D%26mid%3D2650972636%26idx%3D1%26sn%3D144e61df384af811f21239fe375722c3%26scene%3D21%23wechat_redirect "https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&mid=2650972636&idx=1&sn=144e61df384af811f21239fe375722c3&scene=21#wechat_redirect") 在演讲中就曾提到：既然大脑是台生物计算机，那么数字计算机应该也能做所有同样的事。

然而在学术界，也有很多人持不同态度，Sergey Levine 就是一位这样的学者。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/62f24adeb6f54d3fbc304f6acfa18630~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750153531&x-signature=5EYnrPf%2Bd2Sdg%2BaZjmYcm9bJAKw%3D)

他在昨日发布的一篇博客中表示，当前的大语言模型（LLM）只是对人类大脑和思维的间接「扫描」。这些模型如同被困在洞穴之中，只能看到人类智慧的「投影」，并试图通过这些「投影」来逆向推导出产生它们的思维过程。这种「逆向工程」并不能代替真正的思维。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/837acc8dc0cb4745a60a007257d8c83a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750153531&x-signature=1iP5Di%2F3ddc87V0F6YTjqQkEUIQ%3D)

他的观点在机器学习社区获得了不少认同。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/565665596c114be2970277fd66fe461e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750153531&x-signature=X%2F4auohccWbQz4pvMg7sYLFHUNU%3D)

由此进一步思索，我们目前探索 AGI 的方向，是否也到了需要调整的阶段了？

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f8c7426d5e1b4e9fa52a51e9622e730b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750153531&x-signature=Mhq5cRiZNOcJWA4GWgC9z6U42f0%3D)

Sergey Levine 认为，目前人工智能寻求回忆、解决数学问题的努力方向，与人类从经验中学习的方式并不一样，而这个基础论点的错误，早在 Transformer 出现以前就存在了。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ab4e1da5d3594f9fb0feff46245aab72~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750153531&x-signature=XmApH8p6NtlC2d3z1m%2BZMhI3Yrs%3D)

以下是博客原文。

柏拉图洞穴中的语言模型

从诞生之初，人工智能研究就与理解人类智能的目标紧密相关。AI 研究者们相信，人类的思维本质上是一种计算过程 —— 换句话说，它可以用算法来模拟，而不依赖于具体的「硬件」。基于这种理念，研究者们一直试图从人类大脑和思维的工作原理中获得启发，来构建具有人类智能那种灵活性和适应性的人工智能系统。

一些研究者甚至提出了一个大胆的猜想：人类大脑的复杂性和灵活性，可能来源于一个在整个大脑中普遍应用的单一算法，正是这个算法让大脑获得了各种不同的能力。这个想法对 AI 研究者来说极具吸引力，因为它意味着我们的工作可能比想象中简单得多。与其费尽心思地为人工智能设计各种各样的功能，我们或许只需要找到这个「万能算法」，然后让它在现实世界中自由学习，就能通过直接经验获得人类思维的全部能力。

近年来，大语言模型（LLM）在模拟人类智能方面取得了巨大成功。尽管它们仍有明显的局限性 —— 这些局限性足以引发根本性的质疑 —— 但随着模型规模和训练数据的不断扩大，大语言模型一次又一次地突破了人们的预期，展现出新的认知能力。

有趣的是，大语言模型的核心算法其实相当简单：主要是预测下一个词，再加上一些强化学习的调优。这种简单性让我们不禁猜想：这些算法会不会就是大脑使用的那种「万能算法」呢？如果真是这样，那就太令人兴奋了。

想想看，人类智能的强大之处不仅在于能解决各种问题，更在于能为从未遇到过的全新问题找到解决方案。人类之所以能够改造世界，靠的不是记忆力或解决数学问题的能力，而是从经验中快速学习、适应新环境的能力。如果 AI 系统也能拥有这种能力，那将是一个革命性的突破。

但是，这个美好想法的基础存在一个重大问题。早在 Transformer 语言模型出现之前，AI 研究者就在研究一个看起来非常相似的任务：视频的下一帧预测。就像语言模型通过预测文本中的下一个词来理解世界一样，研究者们希望通过训练视频上的下一帧预测模型来提取有意义的表示和物理理解。

从表面上看，这两个问题似乎非常相似：就像 LLM 通过预测来自网络的文本数据中的下一个 token 来深入了解世界一样，视频模型可能通过预测视频数据中的下一帧来深入了解世界。在许多方面，视频预测甚至更吸引人、更强大，因为视频包含的信息量远超文本（正如 AI 大牛 Yann LeCun PPT 中的「蛋糕」），视频数据随处可得 —— 只需要把摄像头对准繁忙的街道就行，而且视频不仅能捕捉人类的语言交流，还能展现整个物理世界的丰富细节。想象一下，一个飞往遥远星球探索的机器人，就像漂流到荒岛上的人一样，可能找不到任何文字资料，但它总能拍摄到视频数据。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/90238f52ae13417c9e713f5980df54c7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750153531&x-signature=wbj4FkE7TzUfl%2B04KrdO0LXn6H4%3D)

然而，现实却让人失望。虽然我们现在确实有了能生成逼真视频的 AI（比如各种视频生成模型），但要论解决复杂问题、进行深度推理、做出精妙判断，语言模型仍然是唯一的选择。你不能让 Veo 3 这样的视频生成 AI 估算「夏威夷群岛的岩石总体积是否超过珠穆朗玛峰」，但 ChatGPT 可以轻松应对这类问题。

这很奇怪，不是吗？语言模型接触到的物理世界信息要少得多，看到的现实也更加有限，但它们却展现出了更强的认知能力，甚至在空间和物理推理方面也是如此。

在科学研究中，我们通常认为越简单、优雅、强大的理论越可能是正确的。就像描述弹簧运动有很多种公式，但我们选择胡克定律，因为它既简单又准确。同样的逻辑下，如果大语言模型用简单的算法就能实现类似人类心智的功能，那我们很容易认为它们的算法就是反映大脑计算过程的正确模型。

也就是说，如果 LLM 是用一种简单的算法进行训练，并获得类似于大脑的功能，那么它们的底层算法也应该类似于大脑获得其功能的算法。

但是，还有另一种完全不同的解释：也许大语言模型并不是像人类那样通过观察世界来学习，而是通过观察人类的思维过程，然后复制其功能。换句话说，它们没有采用一种学习过程来了解世界是如何运作的，而是采用了一种难以置信的间接过程来扫描人类大脑，以构建人类认知过程的粗略副本。

当然，训练大语言模型的数据中心里并没有人被绑在核磁共振机器上（我印象里没有）。大语言模型采用的是一种更巧妙的方法：它们通过分析人类思维在互联网上的投影来重建人类的思维过程。

想想看，网络上的大部分文字都是人类敲键盘打出来的，而每一次敲击都反映了背后的思维活动：解数学题、讲笑话、写新闻报道等等。通过获取文本的压缩表示，大语言模型实际上是在进行一种「逆向工程」—— 它们试图从这些文字中推出产生这些文字的思维过程，从而间接地复制相应的认知能力。

可以说，当人脑连接组计划（Human Connectome Project，一项大型脑科学研究项目）的科学家们在实验室里一个神经元一个神经元地绘制大脑图谱时，大语言模型已经找到了一条捷径：它们直接跳过了神经元层面，通过人类在互联网上投下的 「思维投影」来重建人类的心智。

这就解释了为什么视频预测模型到目前为止还没有取得语言模型那样的成功。我们原本希望 AI 通过观察真实世界的视频来获得物理世界的表示，就像人类从经验中学习一样，但大语言模型已经设法跳过了这一步：它们仅仅复制了人类心理表征的某些方面，而无需弄清楚让人类获得这些表征的学习算法。

这个发现既让人兴奋，又让人担忧。

好消息是：我们无意中创造了世界上最强大的「大脑扫描仪」，而且它真的有效！它能够模拟人类认知的一部分功能，可以回答问题、解决问题，甚至写诗。

坏消息是：这些 AI 系统其实生活在「柏拉图的洞穴」里。这个洞穴就是互联网，人类智能就像洞外的光源，在洞壁上投下现实世界的影子，而大语言模型只能看到这些影子。

在柏拉图的寓言中，要真正理解世界，就必须走出洞穴，在阳光下观察真实的世界。墙上的阴影只是现实的一小部分扭曲片段，而且洞里的观察者无法决定自己能看到什么影子。

同样地，AI 系统要获得人类那样的灵活性和适应性，就必须学会像人类一样真正地学习 —— 用自己的「光芒」去照亮世界，而不是只观察人类智能投下的阴影。

从实际应用的角度来看，这意味着什么呢？

我们可以预期，类似大语言模型的 AI 系统会很擅长模仿人类的认知技能，但在从真实世界的经验中自主学习新技能、形成新认知、获得新能力方面会相对薄弱 —— 而这恰恰是人类最擅长的。这也提示我们，要让 AI 真正具备这种灵活性，我们需要找到新的方法：一种从物理经验中自主获取表征的方法，这样人工智能系统就不需要依赖于由网络文本介导的大脑扫描。

不过，作为 AI 研究者和工程师，我们也要实事求是：这些通过「大脑扫描」工作的大语言模型确实很厉害。如果我们的目标是在机器中复制类似人类的智能，那么从一个已经相当不错的原型开始，似乎是个明智的选择。

未来十年，AI 研究面临的关键挑战是：既要从大语言模型的成功中汲取正确的经验，又要发现支撑真正灵活、适应性智能的基本原理 —— 那种能够从经验中学习、理解物理世界、为人类从未解决过的全新问题找到创新解决方案的智能。

当前的 AI 真的只是一种简单的模拟吗？在 Sergey Levine 的文章后，有人提出了自己的观点：关键或许不是呈现的方式，而是找到连接现象与概念的方法：

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a24329d344d84b869c8714db9b58e54f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5py65Zmo5LmL5b-D:q75.awebp?rk3s=f64ab15b&x-expires=1750153531&x-signature=V9XavLce38mWWMql0x2ZwxvBAxk%3D)

他提及的论文《Harnessing the Universal Geometry of Embeddings》（ [arxiv.org/abs/2505.12…](https://link.juejin.cn/?target=https%3A%2F%2Farxiv.org%2Fabs%2F2505.12540%25EF%25BC%2589%25E6%2598%25AF%25E5%25BA%25B7%25E5%25A5%2588%25E5%25B0%2594%25E5%25A4%25A7%25E5%25AD%25A6 "https://arxiv.org/abs/2505.12540%EF%BC%89%E6%98%AF%E5%BA%B7%E5%A5%88%E5%B0%94%E5%A4%A7%E5%AD%A6") 5 月份提交的，其提出第一种无需任何配对数据、编码器或预定义匹配集即可将文本嵌入从一个向量空间转换到另一个向量空间的方法。

现在的方向到底是死路一条，还是另有空间，你怎么看？

参考内容：

[sergeylevine.substack.com/p/language-…](https://link.juejin.cn/?target=https%3A%2F%2Fsergeylevine.substack.com%2Fp%2Flanguage-models-in-platos-cave "https://sergeylevine.substack.com/p/language-models-in-platos-cave")

标签：

评论 0

![avatar](https://p6-passport.byteacctimg.com/img/user-avatar/596dd11ec1eb86109467f46963b9da45~100x100.awebp)

0 / 1000

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 1

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

![avatar](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/8/30/9bd7ac0fa2558bc4e21b29aa85a08b4b~tplv-t2oaga2asx-jj-mark:64:64:0:0:q75.avis)

为你推荐

- [OpenAI 躲猫猫大作战！3.8 亿次游戏后，AI 自创了新套路](https://juejin.cn/post/7245163938484191293 "OpenAI 躲猫猫大作战！3.8 亿次游戏后，AI 自创了新套路")
		[【新智元导读】OpenAI 发表的新研究表明，一群 AI 智能体在虚拟环境中玩躲猫猫，能够自创出越来越复杂的作战策略，证明简单的游戏规则、多智能体竞争和标准的大规模强化学习算法可以刺激智能体在没有监督](https://juejin.cn/post/7245163938484191293)
	- [
		新智元
		](https://juejin.cn/user/952600743642312)
	- 197
	- 点赞
	- 评论
- [什么是AI？](https://juejin.cn/post/7470191899129053195 "什么是AI？")
		[一、概述 1.1 AI是什么 就像给机器装了个"会学习的大脑"，让它们能像人一样： 看懂世界（比如手机相册自动识别猫狗照片） 听懂人话（比如叫"Siri定个闹钟"） 自己思考（比如围棋AI阿尔法狗下棋](https://juejin.cn/post/7470191899129053195)
	- [
		神里张语
		](https://juejin.cn/user/1786062063024727)
	- 112
	- 点赞
	- 评论
- [大语言模型里的Transformer还可以这么用？](https://juejin.cn/post/7299799127625416715 "大语言模型里的Transformer还可以这么用？")
		[自 LLM 诞生以来，我们见到了很多把 LLM 接到 Vision Backbone 后面的算法，本文的工作回答了这两个问题（答案是 Yes）而且解释了其中的原因。](https://juejin.cn/post/7299799127625416715)
	- [
		CV技术指南
		](https://juejin.cn/user/4240177314668856)
	- 220
	- 点赞
	- 评论
- [关于大模型的幻觉问题：LLM Hallucination](https://juejin.cn/post/7255855848835055653 "关于大模型的幻觉问题：LLM Hallucination")
		[大模型幻觉问题困扰了很多研发人员，本文是作者学习大模型幻觉问题的笔记。主要从幻觉的定义、幻觉产生的原因、幻觉的评估、幻觉的缓解、优化幻觉可能的后续方向五个方面展开。](https://juejin.cn/post/7255855848835055653)
	- [
		子妍
		](https://juejin.cn/user/1851995438454333)
	- 1.5k
	- 1
	- 评论
- [智能体版《苦涩的教训》，图灵奖得主Sutton、谷歌RL大佬Silver新作：超人智能靠经验](https://juejin.cn/post/7493572494960607266 "智能体版《苦涩的教训》，图灵奖得主Sutton、谷歌RL大佬Silver新作：超人智能靠经验")
		[人类生成的数据推动了人工智能的惊人进步，但接下来会怎样呢？ 几天前，Google DeepMind 强化学习副总裁 David Silver 参与了一场播客访谈节目，探讨了如何从依赖人类数据的时代迈向](https://juejin.cn/post/7493572494960607266)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 81
	- 1
	- 1
- [LLM+模仿学习，解决真实世界中的复杂任务：AI2提出SwiftSage](https://juejin.cn/post/7246334166949707834 "LLM+模仿学习，解决真实世界中的复杂任务：AI2提出SwiftSage")
		[GPT-4 等大型语言模型（LLM）在许多推理任务上表现出色，然而，大部分现有研究仅关注静态环境下的任务，如回答问题或解数学题。那么，LLM 能否在真实世界中完成复杂的交互式任务呢？例如，如果我们想制](https://juejin.cn/post/7246334166949707834)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 702
	- 点赞
	- 评论
- [大模型时代的对话系统何去何从？](https://juejin.cn/post/7290845165836714041 "大模型时代的对话系统何去何从？")
		[公众号原文 引言 行业巨变，物换星移，阁中帝子今不在，旧朝老臣空叹息：沧海桑田，何去何从？ （0）行业变革 预训练语言模型通用化蜕变后，跨界改变甚至“破坏”了N多下游应用生态，比如搜索、办公、创作、编](https://juejin.cn/post/7290845165836714041)
	- [
		\_鹤啸九天\_
		](https://juejin.cn/user/1110953472041166)
	- 1.3k
	- 4
	- 评论
- [英伟达把GPT-4塞进我的世界，打游戏快15倍：AI大佬沉默了](https://juejin.cn/post/7238920970563518523 "英伟达把GPT-4塞进我的世界，打游戏快15倍：AI大佬沉默了")
		[机器之心报道 机器之心编辑部 通用 AI 大模型 GPT-4 进游戏了，进的是开放世界，而且玩出了高水平。 昨天，英伟达发布的 VOYAGER 给 AI 圈内带来了一点小小的震撼。 VOYAGER 是](https://juejin.cn/post/7238920970563518523)
	- [
		机器之心
		](https://juejin.cn/user/1873223543167902)
	- 5.7k
	- 34
	- 12
- [万字长文解析AI Agent技术原理和应用](https://juejin.cn/post/7388784573105963027 "万字长文解析AI Agent技术原理和应用")
		[深入剖析了AI Agent这一前沿科技领域的全貌。从基础概念的澄清，到技术原理的细致解构，再跨越至丰富多样的应用场景探索。](https://juejin.cn/post/7388784573105963027)
	- [
		华为云开发者联盟
		](https://juejin.cn/user/3966693685605143)
	- 2.7k
	- 49
	- 评论
	![万字长文解析AI Agent技术原理和应用](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b72fc2afcab4bdbbe8fc82ee426330c~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis#?w=3840&h=2160&s=385290&e=jpg&b=334265)
- [MIT惊人再证大语言模型是世界模型！LLM能分清真理和谎言，还能被人类洗脑](https://juejin.cn/post/7291949501941661706 "MIT惊人再证大语言模型是世界模型！LLM能分清真理和谎言，还能被人类洗脑")
		[【新智元导读】 MIT等学者的「世界模型」第二弹来了！这次，他们证明了LLM能够分清真话和假话，而通过「脑神经手术」，人类甚至还能给LLM打上思想钢印，改变它的信念。](https://juejin.cn/post/7291949501941661706)
	- [
		新智元
		](https://juejin.cn/user/952600743642312)
	- 542
	- 3
	- 评论
- [回顾与展望：关于大语言模型，你需要知道的在这里](https://juejin.cn/post/7313728275787579432 "回顾与展望：关于大语言模型，你需要知道的在这里")
		[随着大语言模型的到来，人工智能正在学习如何交流、理解和生成类似人类的文本。本文将盘点大语言模型技术，探讨 LLM 是什么、工作原理、为什么备受瞩目，以及如何塑造我们的未来。](https://juejin.cn/post/7313728275787579432)
	- [
		YBCarry\_段松啓
		](https://juejin.cn/user/3368559358248040)
	- 1.0k
	- 4
	- 评论
- [大模型微调相关知识](https://juejin.cn/post/7512773755309031462 "大模型微调相关知识")
		[一般而言，一个完整的LLM训练过程，包括模型预训练（Pretrain）、指令微调（Instruction Tuning）和强化学习（RLHF）等环节。 此图摘自happy-llm。 大模型训练方法 预](https://juejin.cn/post/7512773755309031462)
	- [
		WindSearcher
		](https://juejin.cn/user/1838039175010030)
	- 27
	- 1
	- 评论
- [MIT惊人再证大语言模型是世界模型！LLM能分清真理和谎言，还能被人类洗脑](https://juejin.cn/post/7291949501941956618 "MIT惊人再证大语言模型是世界模型！LLM能分清真理和谎言，还能被人类洗脑")
		[MIT等学者的「世界模型」第二弹来了！这次，他们证明了LLM能够分清真话和假话，而通过「脑神经手术」，人类甚至还能给LLM打上思想钢印，改变它的信念。](https://juejin.cn/post/7291949501941956618)
	- [
		新智元
		](https://juejin.cn/user/952600743642312)
	- 1.4k
	- 2
	- 评论
- [对语言大模型的现状总结与趋势](https://juejin.cn/post/7292199621298929675 "对语言大模型的现状总结与趋势")
		[ChatGPT与LLM技术现状 LLM的主要手段 模型：Transformer拥有强大的表示能力，能对具有组合性(compositinality)的语言进行很好的表示和学习。 预训练（pre-trai](https://juejin.cn/post/7292199621298929675)
	- [
		\_山海
		](https://juejin.cn/user/272334612598664)
	- 1.3k
	- 4
	- 评论
- [ChatGPT 是真的银弹吗？](https://juejin.cn/post/7207374216126906425 "ChatGPT 是真的银弹吗？")
		[技术来临的时候，我们总是看客，然后涌入其中，繁华褪去之后，发现当时的热闹已然不算什么。ChatGPT 无疑让人们改变旧思维，拥抱新技术使得人们的生活变得更好。ChatGPT 为技术的未来指明了道路。](https://juejin.cn/post/7207374216126906425)
	- [
		宇宙之一粟
		](https://juejin.cn/user/3526889034751639)
	- 2.4k
	- 27
	- 5
	![ChatGPT 是真的银弹吗？](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4423fd1b0a64b14bd14245feb14b6eb~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis)

APP内打开