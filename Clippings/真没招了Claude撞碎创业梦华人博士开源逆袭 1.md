---
title: "真没招了！Claude撞碎创业梦，华人博士开源逆袭"
source: "https://mp.weixin.qq.com/s?__biz=MzI3MTA0MTk1MA==&chksm=f06293ca9aaf0a471db0f32cba7effa0713ade9bae7b6e5858ef11d3e540bccefe02c58d3d96&idx=2&mid=2652664962&sn=c5b79dd8add2d0931e5fadf1b9011094#rd"
author:
  - "[[新智元]]"
published:
created: 2026-01-16
description:
tags:
  - "开源"
  - "多智能体"
  - "分布式架构"
  - "终端控制"
  - "本地部署"
abstract: "华人学者Guohao Li在创业项目Eigent被Claude Cowork冲击后，选择将整个分布式多智能体项目彻底开源，其架构强调本地部署、终端控制与工业级容错，引发了AI社区的广泛关注。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/UicQ7HgWiaUb1ibxXF6WBkGgjWHCFIZRjicKicjuM3oTlmwCYK1tcKoRjLGcA5Lt2euibX4SfuwC9vXxpQA98ibibx6ymg/0?wx_fmt=jpeg)

新智元 [新智元](https://mp.weixin.qq.com/) *2026年1月16日 08:50*

### 新智元报道

编辑：倾倾

##### 【新智元导读】Claude Cowork一出，直接砸碎了Guohao Li的创业梦，华人学者反手把分布式多智能体项目全开源！代码朋克的怒火，已点燃整个AI社区。下一代Agent的战争，就此打响。

在Claude Cowork发布后，Guohao Li迅速入手了心仪的open-work.ai域名。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb1L99MvDEXtNGhuZ1lp01Ip6ML1A1vW6ibv1gDFYglw0iaxU0fDPnwckXticlI1KibUZOfvx6UDNI0wDA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

这位拥有KAUST和牛津大学背景的顶级华人学者，曾在Intel和Kumo AI等知名机构深耕，本该是学术与商业的黄金结合体。

在此之前，他的团队深耕Camel AI框架多年，终于将其产品化成Eigent，正式推向社区。

可还没来得及庆祝，就被Anthropic Claude Cowork直接创飞了！

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb1L99MvDEXtNGhuZ1lp01IpGffmLtKuZZVwjac5zb6v55WiaVOGfiafZtR9Emfp2OHADXu5eOdTPtfg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

Guohao Li直呼「我真没招了」，于是豁出去做了个大胆决定：把整个Eigent项目彻底开源，上线GitHub，用Apache 2.0许可放开一切！

然后，他自信地表示：I don't care！

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb1L99MvDEXtNGhuZ1lp01IpWwGq6ytKfX6ktbsu6bT8srJCJNjFgQGibricx7JGvehd5iafspuYcu7eg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

Hugging Face联合创始人Thomas Wolf看到后直接狂赞，社区的热情被瞬间点燃。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3LvS1O5vdtaic6Xav8NPJdMZWpM97RwYyLYYz3iaF6ebececwnuN6vVUK8UBRyqxSiaq9DgkumwSFaA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

**杀死「单体agent」幻想**

真正让开源Agent社区眼前一亮的，是Guohao Li对multi-agent架构的工程化重构。

他从CAMEL基础出发，构建了高效的workforce系统，支持并执行、容错与递归，真正把研究落地成桌面生产力工具。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb1L99MvDEXtNGhuZ1lp01Ip73C4j8ZMsAE9KUkb6WH00Te42s54ntSaXhAgkyYgt0qoIKFuFFMlKQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

GitHub链接：https://github.com/eigent-ai/eigent

过去两年，Agent大多在玩cosplay，你cos老师，我cos学生。

但CAMEL-AI框架，引入了一个新的设计理念：分布式系统。在这个架构里，Agent成了可以无限扩展的计算节点，多智能体被视作一个计算集群。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb1L99MvDEXtNGhuZ1lp01IpEib1UibOUKahicwpbmLcHQtUTDMGiakEy1eXcdDNeffAe6P2ibxVRIsibEXg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

Guohao Li

这样看来，我们解决的问题，不是「怎么聊得更好」，而是「怎么组织多个AI像工程师团队一样并行协作，甚至探索大规模（数百级）智能体的任务并行」。

让Karpathy亲自点赞的，是名为SETA:Scaling Environments for Terminal Agents的项目。这才是超级大杀器。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb1L99MvDEXtNGhuZ1lp01Ip68saWjMm7AiaqcUPLU7ZDSU0qxS96Ysb6Y35YDlppSPDgKGibc5ebyWA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

以前的Agent，是在对话框里输出文本代码；现在的Agent直接接管Terminal，像黑客一样在命令行里执行操作、调试环境、部署服务。

掌握了Terminal，就等于掌握了计算机的底层控制权。

Google开发者博客将此誉为「Next Generation Agents」（下一代智能体）。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb1L99MvDEXtNGhuZ1lp01IpSJFWPDbOMBRpQnur39hWqLl7A5nzB5dEwLzHyMzqV1maZWibKgUf1sA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=9)

这并非商业互吹。Google看到的是，这种架构让AI走出了「文本生成」的舒适区，开始进入「环境交互」的深水区。

Guohao Li正在把Agent变成一种新的「硅基劳动力」——它们拥有组织架构，并且手握干活的工具。

这就解释了为什么xAI的人会发来邀请。因为这种架构一旦运行成功，现有的SaaS软件模式将被彻底颠覆。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb1L99MvDEXtNGhuZ1lp01IpdoibwddD9IOC9xp5w5ThH668xpqicibhuHuRBxpIOKicibp7OiaKicpbAq8RQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=10)

更有趣的是，面对巨头的招揽和市场的追捧，GuohaoLi做了一个反直觉的选择。

他没有急着融资变现，而是选择了一条更艰难的路。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=11)

**受够了黑盒SaaS**

**我们要属于自己的Agent**

Guohao Li一度以为自己要凉了。他坦言：

我以为会被Cowork杀死。

但结果完全相反。市场用数据告诉他，开发者不需要另一个黑盒子的SaaS订阅服务，开发者需要的是所有权。

于是他祭出终极杀招：最强全栈本地Agent。从底层的模型推理，到UI，到沙盒运行时，到分布式调度，全链路开源，Apache 2.0，统统打包带走。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb1L99MvDEXtNGhuZ1lp01IpnEOXh4ZSjRUB2vy91o6aHzkxXDfEpUckWcgWQrSQ7TNm9gOmhX6JXg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=12)

**架构层：分布式消息总线，丝滑不翻车**

他彻底扔掉了传统的「一条龙线性调用」，换成分布式Actor模型+结构化消息总线，容错、重启、扩容像微服务一样丝滑。

这种分布式设计天然具有容错能力。当一个负责「代码审查」的Agent卡死或幻觉时，编排层可以立刻重启或分配新的Agent接管，而不会导致整个任务崩溃。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb1L99MvDEXtNGhuZ1lp01IpzHAINqXMNAcSvibYwtydHricS1vK5OhozdVkD8l9CxG8TDrSlY7heBkg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=14)

这是工业级系统与玩具脚本的本质区别。

**执行层：沙盒终端，黑客附体直接干活**

这是Karpathy点赞的SETA项目的核心价值。

虽然一些顶级Agent，如Claude系列、Cursor也能直接执行代码和终端命令，但大部分Agent还是停留在输出Markdown代码块，需要手动复制粘贴。

Eigent则从头打造了闭环运行的环境，让Developer Agent真正自己动手。

Agent拥有对虚拟终端的读写权限。它能执行 `git clone、` 能运行 `npm install、` 能读取报错日志并自我修正。

网络延迟？不存在的，直接本地跑，显卡闲着也是闲着。

**推理层：白嫖党狂喜**

「全栈开源」意味着彻底的解耦，Llama3、Mistral、Qwen、DeepSeek，都可以白嫖。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/UicQ7HgWiaUb1L99MvDEXtNGhuZ1lp01Ip0ibgAv5bxr7V2uWRMYjIcj15C6HeEWJPKxwfPLj5jmXXqKsPOzFPSRA/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=17)

这打通了「本地算力」的最后一公里。用消费级显卡，跑企业级的数据，用分布式的架构，干专家的活。

正所谓免费才是最贵的。当最硬核的底层架构变成了免费的基础设施，那些靠中间商赚钱的SaaS瞬间原地爆炸。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=18)

**代码朋克，从未远去**

**I don't care，Fxxking code**

当硅谷的VC们还在为「哪个AI应用能最快变现」争论不休时，GuohaoLi的「I don't care」像是平地惊雷，直接把开源精神怼回大众视野。

为什么马斯克的xAI都坐不住了？

因为这哥们儿不搞PPT包装，也不修修补补，他从分布式底层重新造轮子——这才是马斯克最爱的「第一性原理」。

在这个API Wrapper满天飞的时代，Guohao Li用行动提醒所有人：没有技术壁垒的代码，一文不值。

只有深入终端、深入调度的硬核资产，才能活过下一个周期。

开源的丛林法则很简单。想让代码不死，就把它扔给全世界。

至于未来会怎样？

I don't care.

Just fxxking code！

参考资料：HYj

https://x.com/guohao\_li/status/2010954219835076726?s=46

https://developers.googleblog.com/real-world-agent-examples-with-gemini-3/

https://x.com/cstanley/status/2010968996670234626?s=46

https://x.com/thom\_wolf/status/2010987087189705186?s=46

https://x.com/guohao\_li/status/2011099100356493556?s=46

https://x.com/guohao\_li/status/2010899322825744745?s=46

https://x.com/cachorrodev/status/2010971948113936885?s=46

https://x.com/guohao\_li/status/2011134665047097820?s=46

https://x.com/guohao\_li/status/2009678513574408636?s=46

  

**秒追ASI**

**⭐点赞、转发、在看一键三连⭐**

**点亮星标，锁定新智元极速推送！**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/UicQ7HgWiaUb3kx5KHMlrHP7uvWown7E5ibwUVozEDQYdZRVypXCGR5V5EXrlniajAzKLR3hWN5pDDUibX9ud49ouicQ/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=19)

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/UicQ7HgWiaUb3kx5KHMlrHP7uvWown7E5ibEukSibyRZ1XHK7BsP7y0lCOibia4ozGlGoq6N1DOTbOmZIWsZlMsnyqXQ/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=20)

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/UicQ7HgWiaUb3kx5KHMlrHP7uvWown7E5ibE1Yejh1DOMCkIqNnpMCvqs7sUFhTWj8P1HSGUib4OdF0xmeKpjLA49A/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=21)

  

继续滑动看下一个

新智元

向上滑动看下一个