---
title: "硅谷Salesforce大会：亲历现场的5个感受"
source: "https://mp.weixin.qq.com/s/5ARMiSpY7rbpJOwd2suuqA"
author:
  - "[[吴昊SaaS]]"
published:
created: 2025-10-21
description: "No.1 SaaS大厂在做什么？"
tags:
  - "Salesforce大会"
  - "AI技术框架"
  - "营销能力"
  - "提示词优化"
  - "资本市场压力"
abstract: "作者分享了参加Salesforce Dreamforce 2025大会的五个现场感受，包括AI技术框架、营销能力、提示词优化策略、资本市场压力以及AI平台构建与单点应用突破的对比分析。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/kHqJpjj95MQWYicHIViahdfBq8NbbGUIiaA78FtM55Z7zziaq3s4ALBMRxYhhyqlZC69G2OLPPFDMMK2xtnBTbtBpA/0?wx_fmt=jpeg)

Original 吴昊SaaS [SaaS白夜行](https://mp.weixin.qq.com/s/) *2025年10月21日 09:12*

SaaS创业路线图系列 | 第225篇

  

Dreamforce 2025有很多精彩内容，但我觉得我没有必要一个个讲，因为大家去ChatGPT上聊一下就知道了。

甚至可以说一句话就帮你生成汇总图（如下）

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/kHqJpjj95MSyJleAkuQHsGhzkJ3wo77g7ia3bI1oy6cxjM8nTVc2lwLNf1xXiaicfmRUjpvicveCpdLZ0K84iaYT8Qg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

我则更希望给大家带来一些现场的感受，这些可不是在Salesforce的官网上能看到的。

  

第一，Salesforce的技术框架是真牛。

这次在硅谷的Dreamforce大会，我是和几个技术大牛一起去的。所以每天在来回的车上、餐桌上，我们都会探讨一些见闻和思考。

在技术上，这次Salesforce确实在AI方面的投入非常大。例如，在Agentforce 360 中，发明了AI应用 开发语言—— Agent Script. 这是一种“人类可读”、用于定义代理人行为（包括条件逻辑、工具调用、流程交接等）的表达语言（通常以 JSON 形式）。

基于Agentforce，大部分产品都做了AI改造。毕竟他们有上万人的研发团队全力投入AI，产出确实非常丰富。

  

第二，营销能力超强。

Salesforce通过Dreamforce大会这样一个超过5万人的大型线下活动，展现了非常强的营销能力。（这也是我唯一能看到这么多老外的地方）

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/kHqJpjj95MRrlruGibMHcA8QDuuIdBxRrSNicHbAT3lm4DctgUkkRBiaw7n4HlMLr4psn7Rt9uwmauVdiaccX0VibZw/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

我在短视频上讲过的第一天的Main key note上抛出了“Agentic Enterprise”这样的概念。然后，创始人Benioff告诉大家Salesforce是如何应用AI的，还提到有12000个客户，包括戴尔电脑、联邦快递这些公司，是如何用AgentForce实现智能化的。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/kHqJpjj95MRrlruGibMHcA8QDuuIdBxRrwI2M5KBFNLia4mjw9kuUzgX6FR3fXEeXfqfK7RQ2NUVU2NcIZDebvCw/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

他们想让大家知道，还没有成为Agentforce客户的企业，都不是具备完整体系的Enterprise（企业），这种构造概念的能力非常强。

实际上，每年的Dreamforce大会都会推出新的概念。

去年讲的是Agentforce，今年更多讲的是Agentforce 360.

对于这两者的区别，我的总结是：去年Agentforce主要在个别模块的智能辅助、人工输入提示词； 今年Agentforce 360则升级到平台化、跨模块和流程，有更多帮助大家生成更有效提示词的框架能力，以及用AI来生成提示词。

比如，今年我在现场听了一场销售教练的产品介绍（Sales Coach），这是一个企业管理员的后台配置实操Workshop.

在这个过程中，它会把以往大家简单写的一长条提示词，拆分成结构化的内容。拆分之后，还有很多支撑结构帮你进行提示词调优，甚至能告诉你哪个环节的提示词效率不好，你可以用它的产品让AI自动提升这个环节的效率。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/kHqJpjj95MRrlruGibMHcA8QDuuIdBxRrnP7SWD7t8In5aau02oeZQQia30x63URFL5z8kjHWZX7PTyGKXUFlfibA/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

（上图在为销售教练Agent录入场景描述、用户指引、场景类型等信息，最终生成合适的Prompt提示词）

Agentforce 本质上是建立在大模型之上的 **企业级应用层架构** 。 它在「提示词（prompt）」与「模型（LLM）」之间增加了两层结构：一层是 **上下文编排与语义控制层（Context & Orchestration Layer）** ，另一层是 **企业数据与安全治理层（Enterprise Data & Governance Layer）** 。  
这种设计让企业用户无需直接编写复杂提示词，就能通过业务语义、流程和权限配置生成高质量的指令，从而显著提升 AI 输出的准确性、可控性和效率。

  

第三点，SF绝大部分技术努力都集中在提示词上。

这与我前一篇文章 [AI产品的技术路线选择：提示词、RAG与模型微调](https://mp.weixin.qq.com/s?__biz=MzIxNjc2MTc2MQ==&mid=2247488163&idx=1&sn=d9fdfa48cbdc7a071d34f23327f7a099&scene=21#wechat_redirect) 里重点提到的“模型微调（Fine-tuning）”是完全不同的方向。

这次在旧金山，我也和 Salesforce 的老员工交流过，确认他们确实如此：主要还是聚焦在提示词上，没有做太多模型参数微调的事情（仅 针对金融、医疗等行业场景提供轻量化微调工具） ，这一点让我蛮惊讶的。

因为单靠提示词可能也能有好的效果，但我前面文章也讲过，要在非常具体的业务场景中保证关键指标的精确度，很可能需要用到 “模型参数微调（Fine-tuning）”，不管是大模型还是中小模型。

但 Salesforce 的主流路线不是这样，我感觉也许这会给它将来带来挺大的技术路线风险。

当然，也许它通过现在的做法，把场景和应用框架搭好了，将来 “模型参数微调（Fine-tuning）” 的事情只是帮助企业的底层能力，也就是分层处理。

还有一个背景因素，就是SF拥有大量生态合作伙伴。伙伴会为大企业客户做很多个性化配置落地的工作。这就是平台公司与单产品公司战略方向的不同。

例如在这个workshop现场，我就感觉这产品咋这么薄啊？配置prompt咋这么复杂啊？客户企业的管理员如何能学会操作、还学会如何根据结果调整优化？后来问问参加workshop的人，很多是集成商或个人软件开发这就明白了。（有个细节是台上的老师在配置LLM选项时卡住了，下面好几个学员直接指出了问题）

所以，也许SF当前这个技术路线是比较保守，但它的资金投入是很激进和坚决的。

而且我相信以 Salesforce 研发团队的架构能力，一定已经想好了后招。如果将来大的趋势是在 “模型参数微调（Fine-tuning）” 上，他们也许有办法补偿，而且不需要推翻前面做的这些事情。

  

第四，All in AI，资本市场压力很大

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

（上图为10月20日的Salesforce股价K线图）

Salesforce在二级资本市场上，在2024年初公布前一年财报时就有一轮累计33%的大幅下跌。当时的主要原因是财报中指反映出对AI的大力投入，但没有看到对应回报。

然后在2025年，SF的股价又从年初的高位下跌了33%.

这表现出投资人对SF “All in AI”投入巨大、但产出甚少的担忧。

我也说说我的看法 —— To B的软件在这场 AI洗牌的 战争中是有巨大优势的。

以前很多To C的应用，如果没有网络效应护城河，这一波可能就被原生AI应用替代了。

但To B的应用本身有非常复杂的场景，还有非常高的准确度要求，也需要建立艰难且有挑战性的场景信任关系，这就需要我们选择非常适用的场景。

打个比方，很多Copilot只做辅助、不承担最终责任，这就是容易被企业客户信任的场景。包括我前面文章写过的AI面试官、自动记账，这些场景后面还有人能“兜底”，不是完全直接交付最终结果，所以在目前大语言模型LLM的能力下，这些场景都比较适合。

在这么复杂的场景选择，以及场景需要嵌套在B端应用全流程中的时候，单点的通用AI应用是做不到的。

如果想用AI完全生成一个全场景、长业务链条的应用，在AGI成熟之前是不可能的。而AGI成熟的时间，Gartner的预测是大概还要10年以上。

所以SaaS公司在这个过程中其实有很大优势。

这不仅源于已经构建的软件和产品，更源于对行业、对领域的深度认知积累。

没有基础的原生AI公司很难替代SF这样的老牌SaaS公司在行业/领域中的深度认知积累和在复杂产品上的软件工程积累。

  

第五，构建AI平台 vs 单点AI应用突破

对于已经在某一个领域有巨大领先优势的公司，比如Salesforce，它目前这种全面投入、高举高打的方式，源于它在该领域的垄断地位，以及对AI入侵的担忧。

与之相对的另一种方式，是做市场更欢迎单点的突破。我之前的文章写过不少这样的案例。

对于国内的公司，比如北森、纷享销客，他们在HR、CRM领域已经取得头部地位，可能更会考虑用Salesforce的方式，全面提升产品的AI能力。

但我觉得，对于那些规模还不大，或者还没有构建稳定护城河的公司，先找到一些单点突破也许是更好的方式。

因为我始终相信，在AI这类新技术到来时，快速迭代是风险更小的技术路线。

随之而来需要考虑的是护城河的问题。行业深度认知、数据飞轮都是护城河。“快”在国内不是护城河。

  

尾声

除此之外，Dreamforce大会还有很多产品上的亮点：比如它的Field Service（现场服务产品），比如Slack成为整个企业端的协作操作系统。这些做产品的大逻辑都非常值得我们借鉴。

大家有空可以去Salesforce的官网上看看这些内容。我也会再挑一些我现场有感觉的Session在视频号和公众号为大家讲讲。

今天，我主要是从在现场浸泡了三天的角度，多讲讲自己的感受和思考，希望对大家有帮助。如果大家有对Dreamforce大会的各种疑问，欢迎留言，我会逐一解答。

  

【相关文章】

[AI产品的技术路线选择：提示词、RAG与模型微调](https://mp.weixin.qq.com/s?__biz=MzIxNjc2MTc2MQ==&mid=2247488163&idx=1&sn=d9fdfa48cbdc7a071d34f23327f7a099&scene=21#wechat_redirect)

[（222）只有魔法才能打败魔法：数美内容审核Agent与其它成功AI产品的异同](https://mp.weixin.qq.com/s?__biz=MzIxNjc2MTc2MQ==&mid=2247488133&idx=1&sn=4167b963bc0758265bff227d01aa8508&scene=21#wechat_redirect)

[改变软件范式的慧算账：不是生产力工具，而是生产力本身](https://mp.weixin.qq.com/s?__biz=MzIxNjc2MTc2MQ==&mid=2247488050&idx=1&sn=ff312b57678b89edfc7e0fb20d645b59&scene=21#wechat_redirect)

[AI创新的哲学基础——生成整体论](https://mp.weixin.qq.com/s?__biz=MzIxNjc2MTc2MQ==&mid=2247488029&idx=1&sn=70a746700c5128686c88ce150c084ce7&scene=21#wechat_redirect)

[北森AI面试官-体验及商业化前景报告](https://mp.weixin.qq.com/s?__biz=MzIxNjc2MTc2MQ==&mid=2247487975&idx=1&sn=bc35a93c6415227952ee28f457b29c1e&scene=21#wechat_redirect)

【个人介绍】本文作者吴昊，SaaS领军企业前执行总裁，多家 SaaS企业常年顾问，图书《SaaS创业路线图》及 2.0 作者。

\===END===

P.S. 以上内容我已融合到 各大城市举办实战研讨课中，欢迎现场聆听和探讨！ 上下午内容分别为： [《AI战略与产品商业化》、](https://mp.weixin.qq.com/s?__biz=MzIxNjc2MTc2MQ==&mid=2247488187&idx=1&sn=63aaa869a55ec14619c5fe4e6afafd72&scene=21#wechat_redirect) [《实现盈利：营销与服务的变革》](https://mp.weixin.qq.com/s?__biz=MzIxNjc2MTc2MQ==&mid=2247488187&idx=1&sn=63aaa869a55ec14619c5fe4e6afafd72&scene=21#wechat_redirect) 。

下一场实战课11月9日（周日 ）紧接着在 [北京](https://mp.weixin.qq.com/s?__biz=MzIxNjc2MTc2MQ==&mid=2247488187&idx=1&sn=63aaa869a55ec14619c5fe4e6afafd72&scene=21#wechat_redirect) “中国SaaS大会”之后举办，欢迎全国各地来参加SaaS大会的朋友多留一天，一起探讨SaaS实战话题。

[华中地区的武汉](https://mp.weixin.qq.com/s?__biz=MzIxNjc2MTc2MQ==&mid=2247488187&idx=1&sn=63aaa869a55ec14619c5fe4e6afafd72&scene=21#wechat_redirect) 实战课则在11月22日（周六）。

欢迎点击 [链接](https://mp.weixin.qq.com/s?__biz=MzI5MzY2MzM5NQ==&mid=2247485133&idx=1&sn=227fa02c8870499c23ff674d1d0bcbb3&scene=21#wechat_redirect) 了解具体课程内容

个人观点，仅供参考

[Read more](https://mp.weixin.qq.com/s/)

继续滑动看下一个

SaaS白夜行

向上滑动看下一个