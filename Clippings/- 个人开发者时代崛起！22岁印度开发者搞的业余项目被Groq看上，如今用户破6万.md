---
title: "个人开发者时代崛起！22岁印度开发者搞的业余项目被Groq看上，如今用户破6万"
source: "https://mp.weixin.qq.com/s?__biz=MjM5MDE0Mjc4MA==&chksm=bc4e2ab2cc157fbe1d6d598b32389c9b6a120d495c9875cb4979e807f2425aa4f1dc92b1de86&idx=1&mid=2651250011&sn=a4b526812aebf3e13757aeb8e1ffbfb7#rd"
author:
  - "[[冬梅]]"
published:
created: 2025-07-07
description: "这个项目从诞生之初的默默无闻，到如今在 GitHub 上收获大量关注，背后有着一段精彩的创业故事。"
tags:
  - "开源项目"
  - "AI搜索引擎"
  - "个人开发者"
abstract: "22岁印度开发者Zaid Mukaddam开发的开源AI搜索引擎Scira，从默默无闻到用户破6万，背后有着一段精彩的创业故事。"
---
Original 冬梅 *2025年07月04日 14:41*

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YriaiaJPb26VMXYYvZ1I0cQeQRoRI6aiaPAMwM5uwdYjuzYILqFOQauNH0XRdQbWNQjJhl3bEZFxkicriaclBLRB4Ww/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1) ![Image](https://mmbiz.qpic.cn/mmbiz_gif/YriaiaJPb26VPQqHC66RJFpttVIMWG83T3lWHahUD4bvhxlKSayjeV2ibvC5ydqklP9QHDPD3qHJM07TV3IfHstjA/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1)

作者｜冬梅

在人工智能技术蓬勃发展的时代，搜索变得比以前更加复杂。谷歌、必应、Reddit、推特、YouTube、学术网站、天气应用上的消息纷繁杂乱，为了找到一个清晰的答案，很容易在各个网站或应用之间跳来跳去。

为了解决这个问题，年仅 22 岁的孟买开发者 Zaid Mukaddam 开发了一款定位为“Perplexity 替代品”的开源项目，在社区中收获了大量关注。

具体而言，使用这款 AI 搜索引擎时，能干什么？答案是可以在上面搜索网页、X 上的帖子、研究论文、YouTube 视频等。

体验地址： h ttps://scira.ai/

Mukaddam 的故事始于 2024 年 8 月，彼时的 Mukaddam 正处于迷茫期，思考着未来的方向。

此前两个月，他一直在尝试 Vercel AI SDK，但渴望着手更有价值、能产生持久影响力的项目。就在他踌躇之际，父亲的一番话点醒了他：“你为什么不做点什么？你应该用你的技能做点什么。你无所事事就是在浪费它们。” 这番话促使 Mukaddam 开始积极寻找灵感。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YriaiaJPb26VMGl9AeDFMm2hAJkH2fMVl9H9K0WrAUSsajicB68iblBv7ricpPntJicsjHCgVvHwSmb53rkLiazJoFR4w/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

他在 x.com 上浏览时，Perplexity AI 首席执行官 Aravind Srinivas 的一篇文章成为了关键转折点。

1 构建项目的初心

Mukaddam 对 Perplexity AI 有着自己的见解，他认为作为一个 AI 搜索引擎，在专业计划中提供的许多高级功能其实非常基础，并且完全可以做得更好。基于这样的想法，他决定创建一个属于自己的 AI 搜索引擎，最初将其命名为 “MiniPerplx”，灵感源自 Perplexity。

2024 年 8 月 4 日，Mukaddam 正式开启了开发之旅，并在短短两天后的 8 月 6 日，就在 X 上发布了相关帖子进行预热。

8 月 7 日，“MiniPerplx” 正式在 X 上发布，意想不到的是，该项目迅速走红，获得了 14000 次曝光。这一成绩让 Mukaddam 备受鼓舞，他表示：“获得 14000 次展示对我来说意义重大，这表明人们对我正在构建的东西感兴趣。”

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YriaiaJPb26VMGl9AeDFMm2hAJkH2fMVl9ofO12Zq9npPiaRPlbd6Vn72icIsIY524dHNIOQem7aNRC4actlMvQ23w/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

据 Mukaddam 介绍，Miniperplx 之所以能够在众多项目中脱颖而出，是因为它有几大核心优势：

- 即时视频摘要——不再浪费时间观看充满无关闲聊的长视频。
- 多源搜索——不仅从 YouTube 收集信息，还从 Twitter、科学论文、产品页面以及几乎任何 URL 收集信息。
- 增强搜索查询——在搜索中包含文件和位置数据，这是 ChatGPT 目前不支持的。
- 由顶级 AI 模型提供支持——Miniperplx 利用 GPT-4o mini、GPT-4o 和 Claude 3.5 Sonnet 提供可靠信息。

在项目开发过程中，工具的选择至关重要。Mukaddam 发现 Vercel AI SDK 非常契合他的需求。由于此前他已经在 X 上对该 SDK 进行过实验并发布了相关内容，因此 Vercel AI SDK 成为他构建 AI 搜索引擎的自然选择，此外，Miniperplx 也已集成 Shadcn/UI、Tailwind CSS 和 Next.js 等框架。

**Vercel AI SDK 是一个 TypeScript 工具包** ，旨在简化大型语言模型与应用程序的集成。这一选择使 Mukaddam 能够专注于用户体验，而不必陷入人工智能模型集成的复杂性。

Miniperplx 的核心搜索功能依赖于 **Tavily Search API** ，这是一个专门针对 LLM 和检索增强生成 (RAG) 优化的搜索引擎，可提供实时、准确和真实的结果。这种组合使 Miniperplx 不仅能够在互联网上查找信息，还能引用其来源，这对于重视透明度和准确性的用户来说是一项关键功能。

作为一个开源项目，MiniPerplx 的核心特点可以概括为“极简”、“智能”和“自由”。摒弃了繁琐的界面设计和广告干扰，专注于提供纯粹的搜索服务。

尽管定位是“Perplexity 开源平替”，但 MiniPerplx 和 Perplexity 在搜索时还是有些区别的。

例如，Perplexity 有网络搜索、学术搜索、数学、视频、写作、社交等功能。而 Mini Perplex 也有很多类似功能，但据一些使用者观察，Mini Perplex 的 X 帖子搜索是 Perplexity 所没有的，Perplexity 主要搜索的是 Reddit 上的内容。比如当你搜索 “X 上的热门 AI 新闻” 时，Mini Perplex 的表现很突出。

随着项目的推进，Mukaddam 很快意识到 “MiniPerplx” 这个名字与 Perplexity AI 过于相似，无法凸显自身特色。为了赋予项目一个更具辨识度和意义的名称，他深入研究，发现拉丁语 “scire” 意为 “知道”，这与产品旨在帮助用户获取知识的目标完美契合。于是，他将 “e” 改成了 “a”，“Scira” 这个新名字应运而生，也标志着项目进入了全新的发展阶段。

2 流量激增导致成本飙升，Groq 伸出援手

Scira 在 GitHub 上的成长速度令人瞩目。10 个月前，它仅获得了 200 颗星，而目前，这一数字已经飙升至 9000 颗星。其受欢迎程度不仅体现在 GitHub 的关注度上，在实际使用方面也成绩斐然。

Groq 公司数据显示，去年 12 月，Scira 平台的互联网流量一夜之间从 500 激增至 16000。

然而，流量的暴增也带来了新的挑战，后端负载已达到极限，API 成本随之大幅上升，这让 Mukaddam 难以以可承受的价格扩展平台。每次搜索都在消耗着他的积蓄，他表示这些成本把他压得喘不过气来。

关键时刻，以定制硬件闻名的 AI 初创公司 Groq 伸出了援手，为他提供了额外的计算资源，帮助 Scira 度过了难关。此外，Groq 还提供了阿里巴巴 Qwen 模型及其推理引擎的使用权。因此，Scira 能够大规模地提供包含正确引用的准确回复。

除了 Groq 公司，Scira 在发展过程中还幸运地获得了多家公司和初创公司的支持，包括 Vercel、xAI、Tavily、Exa、Warp、E2B、Mem0 等。在这些赞助方的助力下，Scira 得以顺利运营和发展了 7 个多月。

值得注意的是，Mukaddam 的帖子获得了 UI 库 Shadcn 和 Vercel 首席执行官 Guillermo Rauchg 的点赞，Hugging Face 联合创始人兼 CEO Julien Chaumond 也在 X 上关注了 Mukaddam。

上个月，Scira AI 入选了 Vercel AI 加速器，成为仅有的 40 个入选团队之一。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YriaiaJPb26VMGl9AeDFMm2hAJkH2fMVl9tgUX5SDdynCEC2wI7Chceibto9M6fkrAjncVN8jAc9tSQBK7HBgGia7g/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

Mukaddam 对这些支持表示由衷的感谢，他深知没有这些帮助，Scira 很难走到今天。

3 没有团队，没有资金，没有问题

Mukaddam 在一篇博客文章中详细概述了创建 Scira 的整个历程，分享了自己的想法和经验。他希望通过自己的故事，鼓励更多年轻人勇敢追逐梦想，投身于创新和创业的浪潮中。对于 Scira 的未来，Mukaddam 有着清晰的规划，他表示将继续优化产品功能，提升用户体验，同时探索更多合作机会，推动 Scira 不断发展壮大。

从一个简单的想法，到一个备受瞩目的开源项目，22 岁的 Mukaddam 用行动证明了年轻人的创造力和无限可能。Scira 的成功不仅是他个人的成就，也为 AI 搜索引擎领域注入了新的活力，让人们看到了开源项目在推动技术进步方面的巨大潜力。

他的事迹在社交媒体上引发热议。

在 X 上，使用过该项目的用户表示，用过以后感觉不错，节省了很多跨网站跳转的时间。

> “超级酷的项目，一个人就能完成这么多，真是令人印象深刻。我们在我的初创公司用这个，它帮我们节省了好多各个网站来回跳转的时间。”

更多用户看好 Scira 的未来，认为 Mukaddam 的成功对其他年轻开发者来说是一种激励。

> "我们有理由相信，它将在未来为用户带来更多惊喜，也为更多年轻开发者树立榜样，激励他们在技术创新的道路上不断前行。”

事实上，随着 AI 崛起，Mukaddam 的例子屡见不鲜，越来越多开发者一个人就能构建起一个了不起的项目，并且收获大笔收益。

Ewan Gower 创立 TinyWow 的初衷，源于他对现有在线工具的失望。他看到了市场空白，致力于提供免费、用户友好的 AI 驱动转换工具，用于 PDF 编辑、图像和视频编辑等各种任务。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YriaiaJPb26VMGl9AeDFMm2hAJkH2fMVl9m7j0LWa6jvia94Mp2DBe6oAxZyUg01J5abf5TiaBhh3ZVSWZKWpFj9dQ/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

TinyWow 成立于 2018 年，凭借为常见在线任务提供创新解决方案而迅速获得关注。尽管最初只是一家小型企业，但它迅速扩大了用户群并丰富了产品，满足了全球数百万用户的需求。

目前，TinyWow 每月访问量达 300 万次，其人气主要源于社交媒体渠道，尤其是 TikTok 的用户原创内容。尽管 TinyWow 每月收入仅 2 万美元，但 Gower 相信，重新调整盈利模式或许能让 TinyWow 达到 Canva 那样的高度。

此外，Only Finders 的故事也让人记忆深刻。

Only Finders 是一款专为 OnlyFans 定制的搜索引擎，允许用户根据自己的喜好发现特定类型的模特。用户可以搜索各种条件，例如金发经纪人或其他偏好，并获取排名靠前的个人资料列表。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YriaiaJPb26VMGl9AeDFMm2hAJkH2fMVl9sCLgL9yBDqk2L98THNlBQXWFKHyHrDG57RoV8K54quTkeGIgoYn8FQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

该平台由一个人管理，专注于高意向搜索，确保其在符合用户兴趣的特定类别（例如红发模特或印度模特）中排名靠前。

此外，Only Finders 采用独特的商业模式，通过按点击收费的方式将有特定意图的潜在客户引导至他们的个人资料，从而为 OnlyFans 模特和经纪公司带来流量。

这种方法反映了传统的搜索引擎策略，使创作者能够从提高的知名度和潜在的收入机会中受益。

**参考链接：**

https://analyticsindiamag.com/ai-news-updates/mumbai-based-perplexity-alternative-has-60k-users-without-funding/

https://github.com/zaidmukaddam/scira

https://ukrtecho.com/en/miniperplx-ai-search-instant-summaries-from-youtube-videos-and-beyond/

https://zaidmukaddam.com/blog/making-of-scira

https://www.founderoo.co/resources/one-man-businesses-solo-entrepreneurs-doing-1m-yearly-revenue

**声明：本文为 InfoQ 翻译整理，不代表平台观点，未经许可禁止转载。**

今日好文推荐

[替代 Devin、颠覆 Cursor！AI 编程不再需要 IDE，用并行智能体重构开发范式：MongoDB CEO 高调站台](https://mp.weixin.qq.com/s?__biz=MjM5MDE0Mjc4MA==&mid=2651249903&idx=1&sn=334996c453dbf59749b960ae590f3827&scene=21#wechat_redirect)

[印度工程师长达一年“多头骗薪”，Meta 也曾力挺！硅谷多位创始人实名举报](https://mp.weixin.qq.com/s?__biz=MjM5MDE0Mjc4MA==&mid=2651249790&idx=1&sn=90a71282ee7ced76ec1fc73b070a46f2&scene=21#wechat_redirect)

[跳槽实现财富自由！小扎千万年薪快要“掏空”OpenAI核心人才，还高调“晒”挖人成绩单：各栈大牛，近70%是华人](https://mp.weixin.qq.com/s?__biz=MjM5MDE0Mjc4MA==&mid=2651249683&idx=1&sn=09f13a788849e2604161656a7e4d25c7&scene=21#wechat_redirect)

[十周前才写下第一行代码，如今颠覆 9 个行业？员工人均 10 万粉，00 后创业者狂言：我们将超越 OpenAI](https://mp.weixin.qq.com/s?__biz=MjM5MDE0Mjc4MA==&mid=2651249490&idx=1&sn=78e17c70683cc9c62628e9f5c6e4e934&scene=21#wechat_redirect)

InfoQ 老友！请留步！极客邦 1 号客服上线工作啦！

后续我将通过微信视频号，以视频的形式持续更新技术话题、未来发展趋势、创业经验、商业踩坑教训等精彩内容，和大家一同成长，开启知识交流之旅

欢迎扫码关注我的微信视频号～

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YriaiaJPb26VPYpjtwOq9W4YYlicfkicgKuAPYzdC24TrlfOMVGia2yGgHLMMSCCQY5JLqIeEKibhDQN8TsO88kq8Law/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&tp=webp)

修改于 2025年07月04日

继续滑动看下一个

InfoQ

向上滑动看下一个