---
title: "谈谈AutoGLM 2.0以及背后的Agent Infra"
source: "https://mp.weixin.qq.com/s/IyxRrbIMEWwz2bxWXYLCvw"
author:
  - "[[渣B]]"
published:
created: 2025-08-22
description:
tags:
  - "AutoGLM"
  - "Agent"
  - "Infra"
abstract: "本文介绍了智谱发布的AutoGLM 2.0及其背后的Agent基础设施，包括其研发历程、技术实现和应用场景。"
---
Original 渣B *2025年08月22日 10:57*

## 先说一个好玩的事情

在谈AutoGLM前,先说一件有趣的事情. 最近看了一篇顶会的论文. 想起几年前故意挖了一个坑(其实就是简单阐述了一下工业界都在做的一件错误的事情), 而写这篇论文的团队总是猜测我也是这么干的, 结果毫不意外的掉进了坑里...

其实很好玩, 因为我在那个坑里也艰难的爬了两个月, 因为一些机缘巧合的运气爬出来了. 既然是在接近山顶的地方有个深坑, 通常都有点恶趣味, 喜欢在坑旁边留点记号, 等着后面一个人爬到这个位置的时候看到...但很可惜这位同行却掉了进去... 当他掉进去的时候, 我也发现自己不孤单了...毕竟能爬到这个位置, 已经走了很长的路了...

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/9v5mpBibQrkhpJjibqa0JVWh0HDdxOduLhLPAg2ZlpEc05XDTib37svGcf8BJHbFXzwow0dISrx7picK5LTRGOzhEg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

## TL;DR

回到正题, 今天来谈谈智谱新发布的AutoGLM...关于AutoGLM的一些详细的研发历程, 晚点采访了智谱AutoGLM的算法负责人刘潇老师, 有一个非常棒的podcast 《手机Agent大幕拉开！从刚上线的AutoGLM 2.0聊起，大模型如何改造手机|Agent#4》 <sup><span>[1]</span></sup>

对于这个场景, 不光需要有非常好的Agent模型, 同时也需要一个非常完善的Agent Infra, 这里再次把无影的AgentBay推荐给其他的一些模型厂商. 在我有限的认知里, 它是Agent Infra中顶流的存在, 真的yyds...

## 1\. 谈谈背后的一些小故事

其实这是我期待了大半年的一个产品了, 去年从苹果WWDC发布会看到的一些Apple Intelligence的一些Demo开始, 我就在推演Agent的能力到底应该怎么去做, 直接占用端侧资源并不是一个靠谱的逻辑. 因为我一直有这样一个商业逻辑上的判断: 传统的互联网应用, 实质上是以占用用户的时间来获得更高的流量变现能力. 例如微信或者抖音这些短视频...**而在AI时代的应用, 最根本的商业逻辑应该是如何帮用户节省时间来获得流量变现能力**

端侧模型直接操作手机, 也就是第一代的AutoGLM实质上的体验是长达数分钟手机无法被其它任务使用, 因此并没有帮助到用户来节省时间. 因此需要一个更巧妙的办法来处理, 例如是否能够接入到云端的资源? 正好去年云栖大会吴妈的一段话:

> “我们认为AI最大的想象力绝对不是在手机屏幕上，AI最大的想象力是在通过渗透数字世界，接管数字世界，并改变物理世界”

这两件事情串联在了一起, 但是已经隐约觉得云电脑和云手机或许是破局的关键点....那个时候还没有MCP也没有Manus/Flowith, 而如今我们看到了一条清晰的Agent渗透数字世界，接管数字世界的路径, 同时也看到了具身智能逐渐改变物理世界的趋势...

在今年春节过后没多久, 智谱战略投资的严老师找到我询问一些虚拟化相关的事情, 能否推荐给他一些专家. 然后很快的理清楚了背后的很多业务逻辑, 和我去年的分析是完全匹配的. 后来就有一次和老领导, 也就是无影的负责人献涛聊一些新业务的时候把这些观点也一起分享了, 然后就顺利的把无影和智谱两个团队撮合在一起了...

不得不说, 两个团队都是非常顶尖的技术团队. 刘老师的团队在模型端到端的训练上, 无影团队在Agent Infra上都做的非常的棒. 于是有了无影的AgentBay和最近智谱发布的AutoGLM...

虽然几个月前AWS也发布了AgentCore, 而这一次阿里云的AgentBay显然更加成熟, 已经有完全落地的应用了. 具体的内容也可以听听献涛的一个访谈 《“让天下没有难做的 Agent” | 对谈旭卿（阿里云无影事业部总裁）、安陈（AgentBay 产品负责人）》 <sup><span>[2]</span></sup>

## 2\. 一些关于AutoGLM的实测

### 2.1 Mobile Use

正好周五要出差回上海, 于是就测试了一下让AutoGLM来订一张高铁票, 整个完成度非常高, 只是录屏的部分有些涉及支付相关的隐私就没有录制了. 可以看到AutoGLM自动拉起了一台云上的虚拟手机.

后面还测试了一些利用AutoGLM刷抖音视频的case, 由于无影有非常先进的视频编码能力, 即便是在4G环境下也能非常流畅的通过云手机看到高质量的视频.

### 2.2 Computer Use

另一方面测试了一下AutoGLM调用云电脑的场景, 正好前几天在写另一篇文章, 让它做了一个关于Optimal Transport理论简介的PPT, 整个过程的录屏如下::

  

最终产生了一个markdown格式的简报和一个ppt,

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Markdown简报

## 最优传输（Optimal Transport, OT）理论简报

## 1\. 定义与核心概念

---

- 最优传输研究如何以最小代价将一种概率分布变换成另一种，核心是“最优耦合/传输计划”与“传输映射”。 \[0†,4†\]
- 两种经典公式：
1. **Monge问题** （1781）：求映射 T 使得 T#μ=ν 且 ∫c(x,T(x)) dμ(x) 最小，强调一对一搬运。 \[4†\]
	2. **Kantorovich问题** （1942）：允许分裂质量，求联合分布 γ∈Π(μ,ν) 使 ∫c(x,y) dγ 最小。 \[9†\]
- **Wasserstein（Earth-Mover）距离** ：当代价 c(x,y)=‖x−y‖^p 时，最优传输成本的 p 次根定义了概率测度空间上的真正度量。 \[9†\]

## 2\. 发展历史

---

| 时期 | 代表人物 | 关键贡献 | 价值 |
| --- | --- | --- | --- |
| 1781 | 蒙日（Monge） | 工程背景下提出最优分配问题 | 奠定“搬运土方”直观 \[24†,26†\] |
| 1942 | 康托罗维奇（Kantorovich） | 松弛化、对偶理论、连接线性规划 | 证明解存在唯一，获诺贝尔经济学奖 \[26†\] |
| 1987 | 布雷耶（Brenier） | 凸势函数表示、极分解定理 | 深化与偏微分方程、几何联系 \[23†\] |
| 2000-今 | Villani 等 | 扩展至不平衡OT、Gromov-Wasserstein、Sinkhorn算法 | 在ML、CV、CG等广泛应用 \[15†\] |

## 3\. 主要应用领域

---

- 图像处理：变形、颜色迁移、修补等。 \[0†\]
- 机器学习：GAN训练（WGAN）、领域自适应、分布匹配、生成模型评估。 \[15†,17†\]
- 经济学/资源分配：最优匹配、市场设计、不平等衡量。 \[26†\]
- 统计与概率：衡量分布差异、推断、变分问题。 \[9†\]
- 几何与PDE：里奇流、麦因尔方程数值解。 \[6†\]
- 最近趋势：神经最优传输、部分传输、大尺度近似（Sinkhorn、FFT-OT）。 \[15†\]

## 4\. 小结

---

最优传输提供了一种几何化、运算化的分布比较框架，从工程问题发展为深刻的数学工具，现正与深度学习深度融合，解决高维分布建模与对齐难题。掌握其“耦合-代价-对偶”三要素，便能理解不断涌现的算法与应用。

## 3\. 谈谈Agent模型训练

从刘老师的访谈里, 我们可以清晰的看到AutoGLM的研发路径. 首先是在2023年8月, Agent Bench发布并用于如何系统性的评估Agent模型的能力. 然后是2024年第一阶段采用SFT的方式, 模拟人的行为轨迹学习, 但是这样的方法有一个很致命的问题, 它会把人类的操作中的对错都学进去, 但是无法区分优劣的路径, 导致操作行为混淆.

然后就是第二阶段的端到端在线学习, 种转变的核心在于, 放弃让模型简单模仿人类操作路径,而是让它通过结果奖励探索可能更优的解决方案.最后性能大幅度提升.

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

虽然当前智谱采用的是一个1000+电脑并发的虚拟机环境, 通常我们需要追求更高的训练效率时, 例如单个轨迹需要并行使用100台电脑并行执行, 可能需要超过一万甚至十万台VM, 对于Mobile-Use场景或许也是类似数量的手机. 那么这种环境下就非常考验基础设施的能力了, 特别是还要加上一些Environment回滚的一些场景, 还需要对虚拟机做非常复杂的镜像checkpoint机制.

相关的论文:

《COMPUTERRL: SCALING END-TO-END ONLINE REINFORCEMENT LEARNING FOR COMPUTER USE AGENTS》 <sup><span>[3]</span></sup>

《MOBILERL: ADVANCING MOBILE USE AGENTS WITH ADAPTIVE ONLINE REINFORCEMENT LEARNING》 <sup><span>[4]</span></sup>

## 4\. 再来谈谈Agent Infra

其实以前写过好几篇, [《谈谈Agentic AI对Infra的需求》](https://mp.weixin.qq.com/s?__biz=MzUxNzQ5MTExNw==&mid=2247494507&idx=1&sn=60fee61439b902ffc2caa34ecad19a27&scene=21#wechat_redirect), [《WAIC-Day3: 谈谈Agent场景及Agent OS基础设施》](https://mp.weixin.qq.com/s?__biz=MzUxNzQ5MTExNw==&mid=2247494569&idx=1&sn=2e83e8b095db3197c467b6ee75470360&scene=21#wechat_redirect). 但是很多话一直要憋着等到AutoGLM 2.0发布后再来说.

其实对于整个AI Infra, 针对Agentic时代的工作流变化会变得非常大. 当你做并行的Rollout的时候, 必定需要大量的通用计算运行环境, 同时稳定的网络, 大量的公网带宽和IP地址资源. 同时还需要一些无侵入的云电脑/云手机GUI交互, 以及各种轨迹的记录, 沿着轨迹回滚等..

其实这对整个Infra的挑战是巨大的, 对于非云的IDC训练场景来看, 这些复杂度也是极大的. 而离线训练的一些轨迹可能还需要一些数据库进行存储和重放.

另一方面是对于用户行为的在线快速学习也有可能诞生新的infra的需求, 在AutoGLM 2.0这样的场景下, 模型本身可能需要逐渐实时化的更新, 并且更好的适应于用户行为和大量任务泛化...其实某种意义上来看, 一个接近10TB~100TB级别的Embedding Table或许会逐渐被整合到Agent Infra中.

另一方面是安全的问题, 对于执行的云手机/云电脑环境的安全保护. 例如对一些特别严格的金融场景可能还需要可信计算的场景.

其实这些问题我们很早就已经充分考虑过, 可以参考一下 [《谈谈AI时代的CIPU 2.0》](https://mp.weixin.qq.com/s?__biz=MzUxNzQ5MTExNw==&mid=2247493847&idx=1&sn=6fbdcac784d35c6391fe6eb3e20fc7a2&scene=21#wechat_redirect), 我们提供了全链路的安全隔离/固件验签/全数据流的加密/可信计算, 并且有大量的安全团队的同学守护着整个云平台的安全.

另一方面是整个管控的弹性调度和库存管理上. 例如Manus这样的Wide Research会并发拉起10个/100个计算实例. 对于AutoGLM 2.0 这样的app, 如果并发的RPM是10000, 那么每分钟就需要创建10万到100万个虚拟机. 累计任务并发的会话数可能在几百万的规模. 想想看那些线下IDC机房谁有这个能力做到? 即便做到了成本上也必定会远高于云平台.

无影AgentBay在阿里云极致的云基础设施之上, 也针对Agent场景进行了大量的优化, 当然一些核心技术避免友商抄作业就不用展开了...反正就一句话, AgentBay是我当前认知下最好的Agent Infra.

当然现阶段的很多移动端App涉及支付/验证等情况下, 还是有一些繁琐, 例如小红书只允许一个手机登陆, 可能为了Agent场景还得开个小号... 是否未来会有一些更加简单的零信任机制呢? 或者小红书Agent和端Agent之间做一些A2A呢? 都是很值得探讨的话题..

参考资料

\[1\]

手机Agent大幕拉开！从刚上线的AutoGLM 2.0聊起，大模型如何改造手机|Agent#4: *https://www.xiaoyuzhoufm.com/episode/68a6546b7357a4b631fe8cd3*

\[2\]

“让天下没有难做的 Agent” | 对谈旭卿（阿里云无影事业部总裁）、安陈（AgentBay 产品负责人）: *https://www.xiaoyuzhoufm.com/episode/689efce251528e172ad7f729?*

\[3\]

COMPUTERRL: SCALING END-TO-END ONLINE REINFORCEMENT LEARNING FOR COMPUTER USE AGENTS: *https://arxiv.org/pdf/2508.14040*

\[4\]

MOBILERL: ADVANCING MOBILE USE AGENTS WITH ADAPTIVE ONLINE REINFORCEMENT LEARNING: *https://github.com/Xiao9905/AutoGLM/blob/main/static/papers/mobilerl\_0820.pdf*

  

继续滑动看下一个

zartbot

向上滑动看下一个