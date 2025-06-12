---
title: "AI 创业者的反思：那些被忽略的「快」与「长」"
source: "https://mp.weixin.qq.com/s?__biz=Mzg5NTc0MjgwMw==&chksm=c1bd84cba3d84c7774f51230f1dd0b6c73f5d49beed3a8d135745895b365b2aa78567e86366a&idx=2&mid=2247516797&sn=3daf317c2e5755e5223e30c8fab6151b#rd"
author:
  - "[[Founder Park]]"
published:
created: 2025-06-12
description: "关键在快、长、智带来的 C 端体验变量。"
tags:
  - "clippings"
---
Founder Park [Founder Park](https://mp.weixin.qq.com/)

*2025年06月10日 21:00* *北京*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/qpAK9iaV2O3sgqllQmlwtMqrfvG9jqJPgfzSW6iaJvl3iaNHed1COftdDuwicFmYQNhcK4yGcwJNpmuQkSn4ZI06qg/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

文章来源于「周喆吾」个人账号

  

周喆吾是 Presence 公司创始人、CEO ，曾任 MetaApp 联合创始人，前摩拜单车移动端负责人，回国前曾在硅谷 LinkedIn 、Uber 总部增长团队做研发工作。

近期，周喆吾在一篇文章中分享了其在 3D AR社交平台 Presence 的创业过程中，对于产品方向、技术应用等方面的思考与不断调整的经验。

文章核心的观点是，在AI创业中，不要忽视**「快」（速度）和「**长context**」（长文本上下文处理能力）两个至关重要的因素。**

  

---

超 6000 人的「AI 产品市集」社群！不错过每一款有价值的 AI 应用。

邀请从业者、开发人员和创业者，飞书扫码加群： 

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/qpAK9iaV2O3sa7YLjNiazB1KksgJh3hzVN29iaaaVk2JuribEPhNaveHLsf1k5kkvy1fVpDAD5jLWLZVF8RaoKT1Wg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

进群后，你有机会得到：  

- 最新、最值得关注的 AI 新品资讯；
- 不定期赠送热门新品的邀请码、会员码；
- 最精准的AI产品曝光渠道

---

  

AI 浪潮刚开始，我们就冲到了美国总榜前 30。当时看着同屏的公司，都是耳熟能详的大厂，其中有两位还是自己当年在美国服务过的老东家，有一种飘飘然的感觉。

在这波 AI 落地的技术浪潮中沉浮冲浪了两年，我的认知螺旋上升，被现实一再的打击和蹂躏，逐步意识到哪些是错误的产品方向（留存、营收、护城河等角度判断），再一点点 pivot —— 思考、实践、反馈、迭代。本文记录一下阶段性的一些挫折和反思。

我之前忽略了**快**的重要性

在中国体验不到，在硅谷生活的时候就发现 ChatGPT 随手用太顺手了，虽然单次用户价值没有那么那么高，但是用户习惯会被方便影响；反观 Perplexity，一开始起量也是因为快，自从加了 Cloudflare check 之后我的使用率就大幅下降了。23 年写的这篇 [ChatGPT 是 AI 时代的 91 手机助手](https://mp.weixin.qq.com/s?__biz=MzU2MTgzMjQyMA==&mid=2247484929&idx=1&sn=52d3365cff2e5ecc6e7748dc930a0774&scene=21#wechat_redirect)，当时的判断还是莽撞了。**丝滑、加载快**，价值千钧。

之前写的 L4 取代白领是错误想法，其实 **90%是扩大了白领工作 TAM** 

例子：**bland.ai**，能达到真人声音的打电话，调用预制好的决策树和每个「prompt 单元格」。使用场景比如 Flexport（美国的航运、卡车运输的满帮）一个个给司机打电话问是否接单，然后同步到 demand 侧。

再举一例：行业习惯于用短信做召回，用产品做推送，现在可以直接有个「真人」客服做激活和留存；有点像是我们之前做游戏的时候，只有大 R 才能得到的 GS 体验，客服运营拉满，情绪价值和产品体验飙涨。这个之前在小 R 和不够大的订单场景下，由于商业价值小于雇人的成本所以只能用静态产品化体验，现在可以达到客制化体验（product -> product + sales/ops） 举例子之前 Superhuman 的首次激活，不是让你直接探索产品，而是约一个 30 分钟的视频电话，投屏 step-by-step 做到 inbox zero，有个售前陪着你达到 aha moment，这样付费率飙涨。这种打法未来可以普及到更多的、更低 LTV 的场景里了。

这**直接颠覆**了 10 年前彼得·蒂尔《从 0 到 1》里提到的 distribution doldrum，之前只有大 ARPU 的商品可以做销售，低 ARPU 的商品只能靠 mkt distribution，现在低 ARPU 的商品也可以提供强销售和客制化体验了！

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/qpAK9iaV2O3sLzcic9A0VGlyz9U3kDlWJ1OmspPHTJ90fI4DjmjdHaayrMg3sia7icEdIKxiczeBIQCA9D7ZicCyxFog/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

再举一个例子是本地化，之前出海公司主要做纯空军（工具、信息流、游戏）和空降兵（电商），陆军业务很多都铩羽而归（滴滴只拿下巴西、OPay 在非洲收缩）。有了 L4 的 AI 员工，其实不应该是去取代传统的空军员工，而是**低成本扩张陆军**啊......

**Workflow Capture** 怎么做？

新市场出来了，切到业务增量里，然后把用的什么模型、什么云厂商，都抽象掉；引用王川，[王川：宁要高维度抽象化的草，不要低维度具象化的苗](https://mp.weixin.qq.com/s?__biz=MzA3MzE5MjM2Mw==&mid=2672247385&idx=1&sn=d290c5839503ba818201595c76c59a13&scene=21#wechat_redirect)商业的 value creation 和 value capture 是两码事，谁被管道化谁就被 commoditize，变成完全竞争，不可能有超额利润了。举例子微信管道化了运营商，字节穿山甲管道化了应用商店。

Marc Andresseen 最近的采访里说 browser war 对现在最大的指导意义是，Unix 最后战胜了所有的 properitary server OS，SUN 公司 1000 亿美金如日中天最后归零。开源模型会使得模型层被管道化。最后价值在应用层，workflow capture —— 回归迁移成本和网络效应

我忽略了**真正可用的 long context** 的实战效应

Gemini 2.5 pro 给了惊鸿一瞥，原来 long context 真的如此有用，之前行业讲了三年的 RAG/企业知识库都是忽悠，因为模型在 runtime 只能利用一鳞半爪的上下文，根本达不到销售说的功效。（很多时候大 SaaS 公司的老板是最大的 bs 销售）

然而最新的 1m token context 真实可用的模型出来之后，丢 30 个文档再聊，是完全不一样的产品。

其实去年 Eric Schmidt 斯坦福演讲就说的很清楚了，就是更少的 hallucination，更长的 context，更可用的多模态多 agency，路径很早就 layout 了。但是只有模型真的出来，才醍醐灌顶。我真是后知后觉啊！

**我为什么会犯这样的错误？**

反思：对于快和 long context 的忽略，包括更少 hallucination 会有什么 c 端体感。**我为什么会犯这样的错误？**

模型从业者的微观体感：产品需求写在 PRD 里的很多实际上没有意义，因为通过产品需求描述已经很难得到模型到底能不能做出来了。

比如 「让模型调用企业知识库里的相关文档来给建议」，这样的需求，到底是用什么模型、多长的 context，是用 RAG 还是全塞进去，效果/速度/成本都有巨大的差别。**天渊之别，云泥之判！**

所以产品经理写一个这样的需求就没意义了。这个怎么解？我只能想到先多把玩，然后大量 ab 实验，且实验的时候一定要对基模和 prompt 参数有强限定。比如某个 feature 不行，不一定是 PRD 不行，没准换个更大的 base model 就能打正。

其实这件事之前张月光也给我们讲过了，妙鸭相机和其他所有类似的影楼写真就是模型能力区别。关键词：真、像、美。DeepSeek 也是一样道理。C 端产品经理需要大踏步的提升自己的认知模型。很多时候最大的正向收益在调模型里，怎么调用怎么利用，而不是在 UI/UX 上。模型是超能力，是力量之源。

同理，投资人的工作也很难做，我观察到投资人经常专注在产品定位、流量和交互上，实际上还是要看快/长/智带来的 C 端体验变量。最让我佩服的投资人是 Yuri Milner，他是我见过这些大老板里唯一一个跟我坐在一起手把手把玩产品，问我画面延迟细节的。大家都会看 30 日留存、看用户访谈汇总、看 TAM，但是有几个会自己把玩？移动互联网中美一共有 10 家达到千亿美金，他投中了 7 家。

推荐算法年代的以史为鉴

最后剩者为王，最强的产品是能最大化把推荐算法能力爆发的 UGC 短内容生态。AI 时代可能也是，什么产品**最大化发扬模型的超能力**，能赢。

Sundar Pichai 最新的思考里，只做一件事：做出最好的模型，场景、商业模式 follows。管理 20 万人可以只专注到一件事上捅穿，是有大智慧的。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/qpAK9iaV2O3sVEDaEXOSIu0FvvT1ahtsFuSMmBOmKmEicRE9EksiaO6CM0Aj3HLXJicHNEDEMrYmgqiaibfQ0k1Balaw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

---

**更多阅读**

[Lex Fridman 对谈谷歌 CEO：追上进度后，谷歌接下来打算做什么？](https://mp.weixin.qq.com/s?__biz=Mzg5NTc0MjgwMw==&mid=2247516758&idx=1&sn=3eb80473ebc10f12d4522c3dc465fe4e&scene=21#wechat_redirect)

[好的 founder 都懂的道理：taste 才是 AI 创业最大的壁垒](https://mp.weixin.qq.com/s?__biz=Mzg5NTc0MjgwMw==&mid=2247516622&idx=1&sn=dcc19bcfad974315adca32cd93303f2b&scene=21#wechat_redirect)

[OpenAI 首位营销负责人：产品没找到 PMF 之前，营销没价值](https://mp.weixin.qq.com/s?__biz=Mzg5NTc0MjgwMw==&mid=2247516595&idx=1&sn=d62e31df3cf1af0b43d4b8059d188c84&scene=21#wechat_redirect)

[暌违六年、互联网女皇340页AI报告刷屏：AI「太空竞赛」开启，下一个10亿用户市场机会来了！](https://mp.weixin.qq.com/s?__biz=Mzg5NTc0MjgwMw==&mid=2247516565&idx=1&sn=f74b295031b5b97d8903c39a84edf0a6&scene=21#wechat_redirect)

转载原创文章请添加微信：founderparker