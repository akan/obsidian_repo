---
title: "AI 终于学会“真笑”了？智谱 GLM-TTS 重磅解读：强化学习如何给声音注入“灵魂”"
source: "https://mp.weixin.qq.com/s/RoOO3ATtJxP-MI9WdtCf8g"
author:
  - "[[TommyYang]]"
published:
created: 2026-01-14
description:
tags:
  - "强化学习"
  - "语音合成"
  - "情感表达"
  - "数据效率"
abstract: "智谱AI推出的GLM-TTS语音生成模型，通过创新的GRPO强化学习、优化的Tokenizer和LoRA微调等技术，仅用10万小时数据便在语音质量、情感表达和声音克隆上达到顶尖水平，解决了工业界TTS应用的多项痛点。"
---
Original TommyYang *2026年1月14日 08:08*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/B2ib2Zr2e3biaIZr0zGibbeJSqyc7B0Cq3aibBa2S3a3iaOfRF9PfA5bVw60BQEX0PRCwGcexcl7mwJkibiaZXdLnA6eg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

系列文章：

[Bilibili 语音合成新SOTA：祭出 AI 配音神器，重新定义“情感爆发”与“精准控时”](https://mp.weixin.qq.com/s?__biz=MzI3NjUwNDg4Mg==&mid=2247485432&idx=1&sn=bb8f2f11bb877639fce56928b6b78010&scene=21#wechat_redirect)

[告别“伪流式”交互：FireRedTTS-2 双Transformer架构全解析，重新定义端到端语音生成](https://mp.weixin.qq.com/s?__biz=MzI3NjUwNDg4Mg==&mid=2247485440&idx=1&sn=5c99c5d77430d49a63bf7bd962c92b28&scene=21#wechat_redirect)

[AI 视觉领域的“O1 时刻”来了？让模型从“看图”进化到“推理”，智谱做对了什么？](https://mp.weixin.qq.com/s?__biz=MzI3NjUwNDg4Mg==&mid=2247485727&idx=1&sn=651c57d3c9a35c5585299d14d2386ebe&scene=21#wechat_redirect)

[GLM-4.6V：开源多模态模型的“原生工具调用”革命，打通感知到行动的最后一公里](https://mp.weixin.qq.com/s?__biz=MzI3NjUwNDg4Mg==&mid=2247485806&idx=1&sn=4c5814ab9421953c21f79319f24f1e24&scene=21#wechat_redirect)  

## 论文摘要：如何用“小数据”撬动SOTA级语音生成？

这篇论文非常硬核，但同时也非常“务实”。它不仅展示了学术上的突破，更重要的是它解决了很多工业界（也就是实际产品中）真正头疼的问题。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/B2ib2Zr2e3biaIZr0zGibbeJSqyc7B0Cq3afeVXUJsWnA0icwLnibauhTE1adEUz3sh6VtxKwhdhib9DGlotGvq8tEMg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

  

- **论文标题** ：GLM-TTS Technical Report
- **论文网址： https://arxiv.org/pdf/2512.14291**
- **Github： https://github.com/zai-org/GLM-TTS**
- **发布时间** ：2025年12月16日
- **发布机构** ：智谱AI (Zhipu AI) & 清华大学
- **核心关键词** ： **生产级TTS** 、 **GRPO强化学习** 、 **高效Tokenizer** 、 **LoRA声音克隆** 、 **混合音素输入**
- **一句话总结** ：智谱推出了一款名为 GLM-TTS 的语音生成模型，它只用了 10 万小时的训练数据（远少于竞品的 100 万小时），就通过独特的“强化学习”和“精细化控制”技术，在语音质量、情感表达和声音克隆上达到了世界顶尖水平，并且非常适合低成本商业落地。

## 1\. 背景与痛点：为什么我们需要 GLM-TTS？

在讲技术之前，我们先聊聊现在的 AI 语音（TTS，Text-to-Speech）还有什么毛病。

大家都知道，现在的 AI 说话已经很像人了（比如 GPT-4o，比如 CosyVoice）。但是，如果你想把这些技术真正用在客服、有声书、教育或者虚拟人产品里，你会遇到几个“拦路虎”：

1. **数据太贵，训练太慢** ：为了让 AI 说话自然，现在的巨头模型动不动就用 100 万小时的数据去“堆”。这不仅成本高，而且训练效率低。
2. **情感是个“玄学”** ：大多数 AI 要么像个莫得感情的读稿机器，要么情感控制非常麻烦。你想让它“苦笑”或者“边笑边说”，很难做到精准。
3. **多音字噩梦** ：中文博大精深，一个“好”字，是读 hǎo（好人）还是 hào（爱好）？很多模型经常读错，导致听感瞬间崩塌。
4. **克隆声音太重** ：想克隆一个人的声音，如果需要全量微调模型，成本太高；如果只用几秒钟音频做 Zero-shot（零样本），相似度又差点意思。
5. **强化学习难用** ：大家都知道强化学习（RL）能让 ChatGPT 变聪明，但在语音领域，RL 很难用。因为语音的评价标准很难量化（什么叫“好听”？），模型很容易“刷分”走捷径，导致训练崩溃。

**GLM-TTS 的出现，就是为了精准爆破以上这五个痛点。**

## 2\. 核心架构：它是怎么工作的？

GLM-TTS 并没有重新发明轮子，而是选择了一条经过验证的“两阶段”路线，并把每个环节都做到了极致。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

你可以把它想象成一个 **“超级配音演员养成计划”** ：

- **第一阶段（编剧）：Text-to-Token** 。模型先把文字转换成一种中间的“语音代码”（Token）。这就像编剧把剧本写好，并标注好“这里要停顿”、“这里要重音”。这是一个自回归模型（Autoregressive），类似于 GPT 写文章，一个字一个字往外蹦。
- **第二阶段（声优）：Token-to-Waveform** 。模型把上面的“语音代码”还原成真正的声波。这里用的是流匹配（Flow Matching）技术，保证声音清晰、连贯。

接下来，我们看看智谱在这个框架里加了什么“黑科技”。

## 2.1 第一招：超级“翻译官” —— 优化的 Speech Tokenizer

在 AI 眼里，声音不是波形，而是一串数字代码。这个把声音变成代码的工具叫 Tokenizer。

智谱发现，开源界最火的 Whisper-VQ Tokenizer 有个毛病： **反应太慢，细节丢失** 。

- **问题** ：原来的 Tokenizer 每秒生成 12.5 个代码，相当于每秒只看 12 帧画面，很多快速说话时的吞音、呼吸声、笑声细节都被丢掉了。
- **GLM-TTS 的改进** ：
- **倍速采样** ：把频率提升到 **25Hz** （每秒 25 个代码），词表扩大到 32k。这就像把视频从 360p 升级到了 1080p，呼吸声、笑声甚至口水音都能捕捉到。
	- **加入音高感知（Pitch Estimator）** ：专门给 Tokenizer 装了一个“音准雷达”，让它对语调起伏更敏感，这样合成出来的抑扬顿挫更像真人。
	- **非因果架构** ：这是一个技术细节，简单说就是允许模型在处理当前声音时“偷看”后面的内容，从而生成得更准确。

## 2.2 第二招：给模型请个“好教练” —— GRPO 强化学习

这是整篇论文最亮眼的地方。

以前的 TTS 模型训练主要靠“模仿”——老师读一遍，学生跟着读一遍。但学生到底读得有没有感情？是不是真的像？以前没法量化。

GLM-TTS 引入了 **RL（强化学习）** ，而且用的是 DeepSeek-Math 等大模型里验证过的 **GRPO（Group Relative Policy Optimization）** 算法。

### 通俗解释 GRPO 在这里的用法

想象一个配音班级。老师（模型）针对同一句台词，一口气录 4 个不同的版本（Group）。然后，有一个“评审团”（Reward Models）来给这 4 个版本打分。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

- **版本 A** ：读音准确，但没感情。
- **版本 B** ：感情丰富，但像个外国人。
- **版本 C** ：读音准，感情好，还带了声笑。
- **版本 D** ：读错了字。

系统会计算这 4 个版本的 **相对优劣** ，告诉模型：“像 C 那样读是最好的，A 还可以，D 要狠狠惩罚。”通过这种“内卷”式的对比学习，模型进步神速。

### 评审团（Reward）关注什么？

智谱设计了四大考核指标：

1. **CER（字错误率）** ：字读对了吗？
2. **SIM（相似度）** ：声音像不像目标说话人？
3. **Emotion（情感）** ：情绪对不对？（比如开心、悲伤、愤怒）
4. **Laughter（笑声）** ：这一点很有趣。如果文本里有“哈哈”，模型能不能真的笑出来？这大大增加了拟人感。

为了防止模型“作弊”（比如为了提高音色相似度而牺牲清晰度），GLM-TTS 还用了 **动态采样** 和 **自适应剪裁** 等策略，保证各项指标平衡发展。

## 2.3 第三招：解决多音字难题 —— “Hybrid Phoneme-in”

在工业界，客户最受不了的就是念错字。现在的端到端模型（End-to-End）虽然自然，但经常“文盲”。

比如：“银行（háng）”念成“银形（xíng）”。

GLM-TTS 搞了个 **“混合输入模式”** ：

- **平时** ：直接输入文字，模型自己猜读音，保证韵律自然。
- **遇到难字** ：系统允许你直接把那个字替换成 **音素（Phoneme）** 。
- *用户输入* ：“这果子真长\[zhǎng\]啊。”
	- *模型处理* ：把“长”字强制锁定为对应的音标，其他字保持文本。
- **训练策略** ：为了让模型适应这种混合输入，智谱在训练时就故意随机把一些字替换成音标喂给模型。这样，模型既能读懂字，也能读懂音标，想怎么控制就怎么控制。

## 2.4 第四招：低成本定制 —— LoRA 微调

很多企业想做“老板的声音”或者“定制 IP 声音”。

- 以前的做法：全量微调模型。需要大量数据，显卡烧得慌，而且容易崩（过拟合）。
- **GLM-TTS 的做法** ：优化了 LoRA（低秩适应）技术。
- 只需要 **1 小时** 的录音数据。
	- 只需要微调 **15%** 的参数。
	- 就能达到全量微调的效果，成本降低了 **80%** 。

## 3\. 实验结果：真的很强吗？

论文里做了大量的对比实验，我们看几个关键数据：

## 3.1 数据效率极高

- CosyVoice-3 用了 **100 万小时** 数据。
- FireRedTTS-2 用了 **110 万小时** 数据。
- **GLM-TTS 只用了 10 万小时** 。
- **结果** ：在 Seed-TTS-eval 评测集上，GLM-TTS 的字错误率（CER）仅为 **1.03%** ，声纹相似度（SIM）达到 **76.1** 。加上 RL 强化学习后，错误率进一步降到 **0.89%** ，相似度提升到 **76.4** 。 **这说明它用十分之一的数据量，打平甚至超越了百万小时级的对手。**

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

## 3.2 情感表达

1. 在内部测试中，引入 Laughter（笑声）奖励后，模型的生动程度大幅提升。它不仅能根据上下文表现出快乐、悲伤，还能自然地穿插笑声，不再是冷冰冰的播音腔。

## 3.3 音质提升

1. 他们还改进了声码器（Vocoder），提出了 **Vocos2D** 。简单说，就是把处理声音的卷积层从 1D 变成了 2D，引入了图像处理的思路来处理频谱图。结果证明，这种方法生成的声音更清晰，尤其是在高频部分（比如唱歌、高音）。

## 4\. 创新价值与总结

GLM-TTS 这篇技术报告的含金量在于它 **打破了“堆数据”的迷信** 。

它向行业证明了三件事：

- **质量 > 数量** ：通过更好的 Tokenizer 设计和强化学习对齐，10 万小时的高质量数据比 100 万小时的粗糙数据更管用。
- **RL 在 TTS 领域大有可为** ：智谱成功地把 GRPO 这一在大语言模型里大放异彩的强化学习算法，移植到了语音生成中，并且解决了奖励作弊（Reward Hacking）的问题。这是迈向“语音大模型自主进化”的重要一步。
- **工业落地优先** ：无论是解决多音字的混合输入，还是低成本的 LoRA 克隆，每一个特性都是奔着“好用”、“省钱”、“可控”去的。这不是一个纯粹刷榜的学术玩具，而是一个准备好进厂打工的生产力工具。

**总结一下：**

GLM-TTS 是一个 **“小而美、精而强”的典范。它没有无脑堆砌算力，而是通过算法层面的精细设计（更好的听力、更好的教练、更好的发音器官），实现了“听得清细节、学得会情感、控得住发音、省得了成本”** 的目标。

对于开发者和企业来说，这意味着未来定制高水平的 AI 语音将变得更便宜、更可控。也许不久的将来，你的手机助手、游戏里的 NPC，都能发出像 GLM-TTS 这样带有真实笑声、富有情感且读音精准的声音。

> **P.S.** 如果你想亲自体验，论文提到代码已开源（GitHub 搜 GLM-TTS），Demo 也可以在智谱的清言 App 或 audio.z.ai 上试听。 **建议去听听它的“笑声”，那是目前 AI 语音里最难攻克的堡垒之一。**

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

您的鼓励是我坚持的动力

继续滑动看下一个

Tommy学习录

向上滑动看下一个