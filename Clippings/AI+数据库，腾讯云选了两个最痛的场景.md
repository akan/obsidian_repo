---
title: "AI+数据库，腾讯云选了两个最痛的场景"
source: "https://mp.weixin.qq.com/s/Kbe9L6oSLG1Q_7in8ht4CA"
author:
  - "[[游勇]]"
published:
created: 2025-09-23
description: "在数据库领域，引入智能体能力。"
tags:
  - "数据库智能体"
  - "DevOps治理"
  - "数据洞察"
  - "风险预警"
abstract: "腾讯云推出数据库AI服务，通过智能体解决数据库治理和数据洞察两大核心痛点。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/o9lYymLw3WL5eLIrhy50VwZnCXcwlAY5oDOWOiaccUeklUMjibhYLh01Frhj1yqIYz0fMjw1AqesL5FQeQ3HjuxQ/0?wx_fmt=jpeg)

Original 游勇 [数智前线](https://mp.weixin.qq.com/s/) *2025年09月23日 08:55*

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/o9lYymLw3WL5eLIrhy50VwZnCXcwlAY51kpyyUqHMrlb1cooEqQFXgvHlOaJvQxcAJM2Sc41JcuDqNXj5koDUg/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

![Image](https://mmbiz.qpic.cn/mmbiz_png/o9lYymLw3WLv79ibkHTQpTjWlN9orGaceeQTCbMYibXA9NINzBH5lhfme1UY1DnHF9xMa4picwHOONvblVAczTQ7A/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)  

一个是数据库DevOps场景，另一个是数据洞察场景，前者是为了用AI治理好数据库，后者是为了用好数据。

![Image](https://mmbiz.qpic.cn/mmbiz_png/o9lYymLw3WLv79ibkHTQpTjWlN9orGaceiavtwibaHhOkGGPk45842qXXe7Bzx4pjLxh0UVsajzYFoRsezMItORoQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

文｜游勇  

编｜周路平  

  

  

数据库作为IT基础设施的一部分，无论是资源的利用效率，还是对风险告警的管控，都关系到企业业务能否正常高效运行。因此数据库的治理一直是业内所关注的话题。

  

9月17日，在2025腾讯全球数字生态大会上，腾讯云数据库团队正式推出 数据库AI服务（TencentDB AI Service，简称TDAI） ，引入智能体能力，探索AI与数据库的结合。

  

腾讯云希望 从数据库DevOps与数据洞察两大核心场景入手，用AI帮助企业治理好数据库以及用好数据 。

  

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/o9lYymLw3WL5eLIrhy50VwZnCXcwlAY5GTcj68h9a7a72hIKOqOc5nVDevmXuDIYMpUdaoYacpiaDcCD5bd8Pqw/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

  

  

01

  

SQL风险预警，不再“事后灭火”

  

  

在DBA（数据库管理员）的日常工作中，对数据库事前的风险治理，需求旺盛，但没有被很好的解决。

  

“2024年到2025年，每个月我们都看到有客户由于SQL使用不好，导致了SQL的事前风险出现问题。”腾讯云数据库副总经理罗云告诉数智前线。

  

比如，曾有头部企业遭遇过一场惊险的事故。一位工程师在日常优化时，随手添加了一条看似普通的SQL清理语句。这条本该在非业务高峰默默执行的SQL，却在系统高负载时启动，逐行扫描整个数据库，这个风险SQL不仅持续吞噬着数据库实例的资源，甚至导致部分交易系统被迫中断。

  

这是业界一起典型的“事后灭火”的数据库治理案例 。以往，都是业务SQL打标、现网SQL事后审计等方式被动应对，但始终无法破解风险SQL”先上线，再发现”的死循环，陷入低效治理的恶性循环。

  

背后面临一个行业的深层次难题，在现行的数据库管理体系中，开发者与DBA的视角不同， 开发者聚焦业务逻辑但缺乏SQL风险感知能力，DBA深谙SQL优化却难以介入开发阶段，两者认知的鸿沟是风险SQL治理的症结所在 。当风险SQL最终引发故障时，DBA往往只能被动响应，却难以追溯代码层面的问题源头。

  

而既懂数据库，又懂代码的AI能填补DBA与研发之间的鸿沟，“AI就像是胶水，粘合了人类组织分工导致的业务和认知上的鸿沟。”罗云说。

  

腾讯云数据库团队针对数据库运维场景引入了三个智能体，都是目前行业痛点最显著、同时也是较为容易入手的场景。

  

一是SQL事前风险预测智能体。 AI可以看到SQL背后的代码长什么样，不再是一个黑盒，可以提前识别风险，比如SQL在上线前，智能体可以明确告知，哪一行代码会引入风险，甚至阻止代码被系统提交，“就像看病一样，治未病是最好的”。

  

二是DDL变更风险评估智能体。 通过预检、仿真与预测全链路管控风险，预测SQL性能演变趋势，有效预防“修复即故障”的运维陷阱，最终输出详尽风险评估，在低成本试错中确保变更安全可控。

  

三是高负载止损值守智能体。 AI当前并不能100%把风险扼杀在苗头，而该智能体可以24小时实时盯着数据库的资源负载情况，发现险情直接给DBA发告警，并且告诉DBA怎么样可以恢复，但最终由DBA来决策，减少处理故障应急的时间，“目前我们倾向于把它做成半自动的。”

  

腾讯云数据库通过上述三个智能体构建了覆盖“开发-测试-上线-值守”的一站式风险SQL防控体系。而罗云透露，目前这三个智能体都能做到95%以上的准确率。而且因为是在预警层面，最终决策由人来做，可以有效避免大模型的幻觉问题。

  

不过，罗云告诉数智前线，这些智能体目前重点还是在腾讯内部场景打磨，先把产品做扎实， 下半年或者明年初会正式向市场推广 。

  

而未来，腾讯云会有更多Agent与数据库的结合实践，比如售前咨询、性能分析以及诊断分析智能体，“可能未来会有更多分职责的小智能体”。

  

但每个场景都有对应的Agent，如何让这些Agent自动调用和协同工作也是未来需要解决的难题。罗云看来，未来这些Agent前面会有一个具备意图识别能力的主Agent。用户提通用问题，会先由主智能体判断交给哪些小的智能体来执行。

  

  

02

  

数据洞察，无需靠人工问数

  

  

相比于DevOps的智能体在运维层面，帮助企业用AI治理好数据库，数据洞察的智能体，则是解决数据的价值如何被挖掘的问题。

  

以前，企业需要数据，以人工问数为主，比如老板提了一个需求，数据分析师写SQL，然后把结果给到老板。

  

这显然是一个非常被动且低效的方式。

  

一是认知片面，人的经验面临着分析视角的局限性，难以覆盖数据中潜在的交叉关联与隐性规律；

  

二是感知迟钝，海量数据动态变化产生的微弱信号极易被人脑的计算瓶颈与注意力分散所淹没，错失业务异常的黄金响应窗口；

  

三是响应滞后，从数据变化到人工介入的分析链路存在不可控时延，强依赖于分析者是否能及时发现数据变化，导致洞察价值随时间衰减。

  

而 智能体则将数据洞察的过程变成了动态感知和主动决策，不再被动等待指令 。比如每台机器的资源规划是否合理，是否需要采购新的资源，原有机器是否面临汰换等，这些数据，即便老板不问，也可以通过智能体推送数据洞察的结论，持续看到趋势变化。

  

之前，业界普遍的做法是NL2SQL，让老板用自然语言与智能体对话，实时反馈结果。在罗云看来，腾讯云数据库的做法会更进一步，会通过智能体持续捕捉数据和表的结构变化，推测不同字段背后可能会导致哪些风险，从而主动规避。

  

  

03

  

为何要自建智能体基础设施？

  

  

在打造这些智能体背后，腾讯云数据库团队也自建了智能体基础设施，包含了自研的数据库大模型、全域上下文、工具集。

  

之所以要自建基础设施，一个很关键的因素是，当前业界智能体相关基础设施无法满足TDAI智能体服务（TDAI Agent Service）的核心诉求。

  

2025年初，腾讯云数据库团队开始启动了Agent项目，起初尝试过用开源模型调prompt，两三个月发现行不通，专业性不够，性价比也不高，“有点高攀不起”。

  

罗云发现， 数据库有大量的领域知识，要打造智能体的大脑，靠当前的通用大语言模型行不通，存在大量幻觉 ，难以满足复杂业务场景的需求。

  

最终，腾讯云数据库选择自研了垂类大语言模型，很快，腾讯云数据库团队转向做垂类大语言模型，通过SFT和强化学习，实现了当前的效果。

  

另外，当前业界智能体记忆系统侧重记录用户偏好和对话上下文，未与企业私域数据深度打通，或者难以关联数据库血缘关系或业务元数据，在企业级智能体应用场景中价值有限。

  

而腾讯云数据库团队搭建的 全域上下文（Context）系统，能够整合Memory（长短期记忆）、Catalog（元数据推理）、DeepSearch（深度检索） ，构建企业级数据中枢，实现企业数据与智能体记忆的深度融合。

  

不难发现，腾讯云数据库团队通过对底层基础设施的重构，确保了智能体能够契合数据库治理和数据洞察的需要。

  

另外一层考虑是，通过做智能体，腾讯云数据库孵化了多个数据库垂类大语言模型，以及Agent contents、 智能体工具集等一套组件，在腾讯云的规划里， 未来可以通过API的方式将基础设施开放出来 ，让开发者搭建自己的智能体。

  

© 本文为数智前线（szqx1991）原创内容

未经授权，禁止转载

进群、转载或商务合作联系后台  

  

  

  

文章精选

- [独家｜对话网商银行CIO高嵩：AI应用要找高价值场景](https://mp.weixin.qq.com/s?__biz=MzkwNDMyOTA1NA==&mid=2247493577&idx=1&sn=717311284daf48cae0830f2a07783e70&scene=21#wechat_redirect)
- [“一半是火焰，一半是海水”，金融大模型的爆发与困局](https://mp.weixin.qq.com/s?__biz=MzkwNDMyOTA1NA==&mid=2247493572&idx=1&sn=18c6927e5c1c23178c80bf74290a4c08&scene=21#wechat_redirect)
- [4000个模型和500家独角兽，AI竞争新面孔背后](https://mp.weixin.qq.com/s?__biz=MzkwNDMyOTA1NA==&mid=2247493507&idx=1&sn=ab31ce3b530d970fb9b688d2a88795ed&scene=21#wechat_redirect)
- [印刷OLED规模化量产在即，一场中国面板厂商的突围战](https://mp.weixin.qq.com/s?__biz=MzkwNDMyOTA1NA==&mid=2247493468&idx=1&sn=8c9a9e65bb1bba47842546f25db70ed4&scene=21#wechat_redirect)
- [茅台奔驰麦当劳，为什么都在培养AI架构师](https://mp.weixin.qq.com/s?__biz=MzkwNDMyOTA1NA==&mid=2247493426&idx=1&sn=0cf4f3c43052c45723b33bc5fcc4bb8e&scene=21#wechat_redirect)
- [当一家成立11年的AI公司投身具身智能战场](https://mp.weixin.qq.com/s?__biz=MzkwNDMyOTA1NA==&mid=2247493401&idx=1&sn=dffe1ead6098baa08661145172334b52&scene=21#wechat_redirect)
- [致远互联的升维之战：从协同软件到协同AI](https://mp.weixin.qq.com/s?__biz=MzkwNDMyOTA1NA==&mid=2247493382&idx=1&sn=6dff884b7a54a2163a64134f9e129a19&scene=21#wechat_redirect)
- [超节点建设年开启，谁来领跑下一代智算基础设施?](https://mp.weixin.qq.com/s?__biz=MzkwNDMyOTA1NA==&mid=2247493374&idx=1&sn=3904d9701839a4d0e22b2d931d3002c1&scene=21#wechat_redirect)
- [数据库的淘汰赛：头部厂商如何赢得未来?](https://mp.weixin.qq.com/s?__biz=MzkwNDMyOTA1NA==&mid=2247493332&idx=1&sn=c4267678108dcd869d1f20f4b7e9bc69&scene=21#wechat_redirect)
- [浪潮推出首个“人工智能工厂”，工业化模式加速技术落地](https://mp.weixin.qq.com/s?__biz=MzkwNDMyOTA1NA==&mid=2247493342&idx=1&sn=47c49fa35c7f032b1626b0f931bd9dab&scene=21#wechat_redirect)
- [小红书，为何能制造“百万投入撬动十亿生意”](https://mp.weixin.qq.com/s?__biz=MzkwNDMyOTA1NA==&mid=2247493307&idx=1&sn=a536a54fe37b0229e7af15575343415b&scene=21#wechat_redirect)
- [全球首批AI数字员工亮相，迎来规模化落地拐点](https://mp.weixin.qq.com/s?__biz=MzkwNDMyOTA1NA==&mid=2247493296&idx=1&sn=52be599d85562e50a2ffaa54eb6c4498&scene=21#wechat_redirect)
- [历史进程中的浙大](https://mp.weixin.qq.com/s?__biz=MzkwNDMyOTA1NA==&mid=2247491896&idx=1&sn=a5b22a395489ee364fafd2a52e87a964&scene=21#wechat_redirect)
- [松下电视的结局，藏着日本家电的宿命](https://mp.weixin.qq.com/s?__biz=MzkwNDMyOTA1NA==&mid=2247491811&idx=1&sn=aa997420b77304becdc3cc8f1b83e2f0&scene=21#wechat_redirect)
- [大模型五大“标王”与六边形战士](https://mp.weixin.qq.com/s?__biz=MzkwNDMyOTA1NA==&mid=2247491722&idx=1&sn=b4a5629612964815808f26131ba7fa76&scene=21#wechat_redirect)
- [枪响在2018：神秘东方力量，为何扎堆杭州](https://mp.weixin.qq.com/s?__biz=MzkwNDMyOTA1NA==&mid=2247491539&idx=1&sn=e04c35e6a41fa26c8622b7ead18434ec&scene=21#wechat_redirect)

  

继续滑动看下一个

数智前线

向上滑动看下一个