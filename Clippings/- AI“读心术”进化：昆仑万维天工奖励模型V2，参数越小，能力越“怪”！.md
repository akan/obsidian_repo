---
title: "AI“读心术”进化：昆仑万维天工奖励模型V2，参数越小，能力越“怪”！"
source: "https://juejin.cn/post/7523421139721945097"
author:
  - "[[墨风如雪]]"
published: 2025-07-06
created: 2025-07-07
description: "各位，划重点了！就在 2025年7月4日，昆仑万维再次把他们最新的 AI 心脏——Skywork-Reward-V2 系列奖励模型，打包开源了！这不是普通的模型更新，这简直是 AI 领域的一场“小型地"
tags:
  - "AI读心术"
  - "昆仑万维"
  - "奖励模型V2"
abstract: "昆仑万维开源Skywork-Reward-V2系列奖励模型，参数效率惊人，数据质量关键。"
---
![横幅](https://p26-piu.byteimg.com/tos-cn-i-8jisjyls3a/8694dbc29caa4b59bda5f4181f3bd6ef~tplv-8jisjyls3a-2:0:0:q75.image)

[墨风如雪](https://juejin.cn/user/4064249017803927/posts)

34 阅读5分钟

![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/796c19f610c146ffac65db71d7329490~tplv-8jisjyls3a-2:0:0:q75.image)

各位，划重点了！就在 **2025年7月4日** ，昆仑万维再次把他们最新的 AI 心脏—— **Skywork-Reward-V2 系列奖励模型** ，打包开源了！这不是普通的模型更新，这简直是 AI 领域的一场“小型地震”，还是那种威力巨大但又悄无声息的。

![image.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/c313de585eca4a669426efb917ed7ec8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5aKo6aOO5aaC6Zuq:q75.awebp?rk3s=f64ab15b&x-expires=1752398838&x-signature=o5Y4tSo099CE2VPOSpskuBOia%2Bk%3D)

### 💥 参数“瘦身术”成新宠：0.6B 硬刚 70B？

让我来给你捋一捋这次的“怪事”。这次的 Skywork-Reward-V2 系列，玩的是参数“瘦身术”，但实力却像开了外挂一样暴涨！

- **模型阵容强大** ：从 **6亿（0.6B）到80亿（8B）参数** ，足足 **8个不同身材** 的奖励模型，基座还选了当下最热门的 **Qwen3 和 LLaMA3** 。你完全可以根据自己的“算力钱包”来选择。
- **参数效率惊人** ：最离谱的是，那个小小的 **0.6B 模型** ，能力已经快赶上上一代最强的 27B 模型了！更不用说 **1.7B 的版本** ，直接把市面上还在拼命堆参数的 70B 开源 SOTA 模型按在地上摩擦。而那个 **8B 的旗舰款** ，更是直接成为了开源奖励模型界的新标杆，在所有测试中都碾压对手！

![image.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a23d6abcbe5e49c7bf17eaddf6b02a83~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5aKo6aOO5aaC6Zuq:q75.awebp?rk3s=f64ab15b&x-expires=1752398838&x-signature=s0M0QiRLAGX%2B%2F2B%2BWZhhq6a89yo%3D)

### 🧠 数据魔法新升级：4000万“心声”数据，AI能有多懂你？

要让 AI 理解人类的“心意”，数据是关键。昆仑万维这次玩得更大，直接构建了 **4000万对偏好对比数据** ，这可是当前开源界规模最大的数据集了！

他们的秘诀是—— **“人机协同”的“双保险”数据策略** ：

1. **“黄金品质”打底** ：先用人类专家的“火眼金睛”去标注一批高质量的“金标准”数据，确保最核心的准确性。
2. **AI“借力打力”，快速扩张** ：接着，利用大模型的强大能力，在人类专家的指导下，快速扩展出海量“银标准”数据。
3. **智能筛选，“优中选优”** ：最后，用已经训练好的奖励模型来做“终极判官”，从这 4000 万数据中，筛选出 **2600万条真正高质量的“学霸级”数据** 。

而且，他们还做了个实验：仅用这 2600 万条数据中的 **1.8%（也就是 29万条）** ，就训练出了一个性能吊打 70B 模型的 8B 奖励模型！这简直是告诉全世界：在 AI 界， **数据质量才是真正能改变游戏规则的关键！**

![image.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3a79981ec11d44c58f0205a765dd3f64~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5aKo6aOO5aaC6Zuq:q75.awebp?rk3s=f64ab15b&x-expires=1752398838&x-signature=wRNJoBuYZ15feKibiMRwQsgGkHs%3D)

### 🏆 七大权威榜单“七冠王”：这不是偶然，这是实力！

你以为这是运气？那你就太小看昆仑万维了。Skywork-Reward-V2 系列在 **七大主流奖励模型评测榜单** 上，就像开了挂一样，全部登顶！

- **综合实力爆表** ：无论是 **RewardBench v1/v2** ，还是 **PPE Preference & Correctness** ，以及 **RMB、RM-Bench、JudgeBench** ，它都表现出了统治级的实力。
- **人类偏好大师** ：在评判模型回答是否符合人类喜好时，它甚至比那些参数量更大的模型还要出色。
- **知识判断的“老司机”** ：在 **JudgeBench** 这种考验知识密度的任务上，它对是非的判断准确率已经非常接近 OpenAI 等顶尖的闭源模型了。
- **“抗压”能力满分** ：面对风格偏差、复杂指令、甚至是真实性判断等各种刁钻的任务，它都表现得游刃有余。

![image.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d78316bc0fb2455ea3892dcf49682427~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5aKo6aOO5aaC6Zuq:q75.awebp?rk3s=f64ab15b&x-expires=1752398838&x-signature=c1LDFLebskTpjvzUqoKe1IdM%2FjU%3D)

### 🌍 开源的“天工”力量：赋能全球 AI 开发者

昆仑万维这次开源，不只是为了秀肌肉，更是为了推动整个 AI 生态的发展。

- **社区影响力升级** ：他们去年的第一代模型，在 Hugging Face 上的下载量已经超过 **75万次** ！这次的 V2 版本，无疑会再次点燃社区的热情，加速 **RLHF（基于人类反馈的强化学习）** 的研究进程。
- **AI价值观的“指南针”** ：昆仑万维的目标是让奖励模型不再只是一个“行为评估器”，而是成为 AI 系统价值观的“指南针”，帮助我们构建更负责任、更安全的 AI。

而且，他们还说了，未来会继续探索更多的训练技术和建模目标，奖励模型的作用会越来越重要，可能会成为驱动智能体学习、可验证奖励强化学习（RLVR）等前沿领域的核心组件。

### 🎁 想体验这“AI心电感应”？链接在这里！

心动不如行动！想亲自感受一下这“AI读心术”的魅力？直接点这里：

- **Hugging Face 模型库** ： [huggingface.co/collections…](https://link.juejin.cn/?target=https%3A%2F%2Fhuggingface.co%2Fcollections%2FSkywork%2Fskywork-reward-v2 "https://huggingface.co/collections/Skywork/skywork-reward-v2")
- **GitHub 技术文档** ： [github.com/SkyworkAI/S…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FSkyworkAI%2FSkywork-Reward-V2 "https://github.com/SkyworkAI/Skywork-Reward-V2")

![image.png](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ea24efaaff3b406db28620b1f48cb649~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5aKo6aOO5aaC6Zuq:q75.awebp?rk3s=f64ab15b&x-expires=1752398838&x-signature=ZawCN%2F7sw%2BvwjCpKEFzuSGQjlak%3D)

### ✨ 我的个人看法：数据为王，开源无界！

作为一名 AI 爱好者和观察者，我必须说，昆仑万维这次的 Skywork-Reward-V2 系列，再次为整个行业树立了一个新的标杆。他们用事实证明了： **参数固然重要，但高质量、经过精心打磨的数据，才是真正能让模型脱颖而出的关键！**

而且，他们持续的开源行动，是在用实际行动告诉大家：AI 的进步不应该只属于少数巨头，更应该属于整个社区。这种开放、共享的精神，才是推动技术前行的强大引擎。

总之，如果你对大模型训练、RLHF、或者想让你的 AI 助手更懂你，那么 Skywork-Reward-V2 系列绝对是你不能错过的宝藏！快去试试吧，也许下一个 AI 领域的突破，就藏在你的手中！

---

**如果你也对最新的AI信息感兴趣或者有疑问 都可以加入我的大家庭 第一时间分享最新AI资讯、工具、教程、文档 欢迎你的加入！！！😉😉😉**

公众号：墨风如雪小站

- [我的博客：https://blog.worldcodeing.com/](https://link.juejin.cn/?target=https%3A%2F%2Fblog.worldcodeing.com%2F "https://blog.worldcodeing.com/")
- [我的导航站：https://nav.worldcodeing.com/](https://link.juejin.cn/?target=https%3A%2F%2Fnav.worldcodeing.com%2F "https://nav.worldcodeing.com/")
- [源码小站：https://www.worldcodeing.com/](https://link.juejin.cn/?target=https%3A%2F%2Fwww.worldcodeing.com%2F "https://www.worldcodeing.com/")

标签：

话题：

[每天一个知识点](https://juejin.cn/theme/detail/7243698841848348730?contentType=1)

评论 0

![avatar](https://p6-passport.byteacctimg.com/img/user-avatar/596dd11ec1eb86109467f46963b9da45~100x100.awebp)

0 / 1000

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

![avatar](https://p26-passport.byteacctimg.com/img/user-avatar/08b4616051d3c71ea12747cfc5eda79c~70x70.awebp)

为你推荐

- [昆仑万维开源「天工」13B系列大模型，0门槛商用](https://juejin.cn/post/7296313164065095717 "昆仑万维开源「天工」13B系列大模型，0门槛商用")
		[10月30日，昆仑万维宣布开源百亿级大语言模型「天工」Skywork-13B系列，并罕见地配套开源了600GB、150B Tokens的超大高质量开源中文数据集。](https://juejin.cn/post/7296313164065095717)
	- [
		天工大模型
		](https://juejin.cn/user/2016933583004163)
	- 2.1k
	- 22
	- 6
	![昆仑万维开源「天工」13B系列大模型，0门槛商用](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34b0142c23074df8a6fe93bf416013c0~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis#?w=200&h=200&s=3108&e=png&a=1&b=0021c6)
- [外滩大会热议：AI时代数据价值转变，如何打造下一代智能数据体系？](https://juejin.cn/post/7419907933255270419 "外滩大会热议：AI时代数据价值转变，如何打造下一代智能数据体系？")
		[9月5日，在2024 Inclusion·外滩大会上，由蚂蚁集团、上海交通大学、复旦大学联合主办的“从DATA for AI到AI for DATA”见解论坛召开。](https://juejin.cn/post/7419907933255270419)
	- [
		EosphorosAI技术社区
		](https://juejin.cn/user/548032480289188)
	- 39
	- 点赞
	- 评论
	![外滩大会热议：AI时代数据价值转变，如何打造下一代智能数据体系？](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/60ee6bfe8ba745c0b4d717b3670648bf~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgRW9zcGhvcm9zQUnmioDmnK_npL7ljLo=:q75.awebp?rk3s=f64ab15b&x-expires=1752472483&x-signature=uerWg60J6nNNISMHubSVsqI03RY%3D)
- [「天工3.0」和「天工SkyMusic」一起让音乐重生](https://juejin.cn/post/7355845498991575049 "「天工3.0」和「天工SkyMusic」一起让音乐重生")
		[近几周,AI音乐大模型无疑在各领域刮起一场飓风,社会各界无不对其”以假乱真“的音乐创造力发出惊叹。在这场飓风中,昆仑万维基于「天工3.0」多模态超级大模型打造,国内唯一公开可用的AI音乐生成大模型「天](https://juejin.cn/post/7355845498991575049)
	- [
		Tech
		](https://juejin.cn/user/2300621557602413)
	- 266
	- 点赞
	- 评论
- [黑马入局！昆仑万维版ChatGPT「天工」通过自家程序员面试，首发就敢现场演示](https://juejin.cn/post/7224428335005827109 "黑马入局！昆仑万维版ChatGPT「天工」通过自家程序员面试，首发就敢现场演示")
		[什么样的AI，能通过自家公司的程序员面试？ 刚刚出炉的 国产大模型「天工」做到了，黑马，绝对是黑马。其开发商昆仑万维的CEO方汉在与量子位合作的首发直播中透露： 对天工模拟过校招算法工程师的第一轮面试](https://juejin.cn/post/7224428335005827109)
	- [
		量子位
		](https://juejin.cn/user/2858385963484488)
	- 94
	- 点赞
	- 评论
- [昆仑万维「天工」大模型正式向全社会开放](https://juejin.cn/post/7297831676630286373 "昆仑万维「天工」大模型正式向全社会开放")
		[2023年11月3日，昆仑万维“天工”大模型通过《生成式人工智能服务管理暂行办法》备案，面向全社会开放服务！](https://juejin.cn/post/7297831676630286373)
	- [
		天工大模型
		](https://juejin.cn/user/2016933583004163)
	- 486
	- 5
	- 评论
	![昆仑万维「天工」大模型正式向全社会开放](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c164eb67daf440fa8dd2df45f19de804~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis#?w=1265&h=589&s=397769&e=png&b=267af9)
- [以假乱真，天工音乐大模型带来颠覆式 AI 体验](https://juejin.cn/post/7353275013024399370 "以假乱真，天工音乐大模型带来颠覆式 AI 体验")
		[昆仑万维AI音乐生成大模型「天工SkyMusic」开启了免费邀测活动，诚邀媒体、行业专家以及感兴趣的音乐从业者们共同体验人声情感表达 SOTA 的音乐大模型产品。](https://juejin.cn/post/7353275013024399370)
	- [
		天工大模型
		](https://juejin.cn/user/2016933583004163)
	- 239
	- 点赞
	- 评论
- [太牛叉了！国产 AI 智能体惊艳问世，全面致敬 FastGPT！](https://juejin.cn/post/7315862212567613479 "太牛叉了！国产 AI 智能体惊艳问世，全面致敬 FastGPT！")
		[太震撼了！太厉害了！昆仑万维正式发布了「\*\*天工 SkyAgents\*\*」平台，助力大模型走入千家万户。你听听，这个名字一听就有一种\*\*巧夺天工\*\*的感觉，技艺那是相当的高超。 这个平台基于昆仑万](https://juejin.cn/post/7315862212567613479)
	- [
		硅基新手村
		](https://juejin.cn/user/3913917126163998)
	- 1.7k
	- 5
	- 3
- [昆仑万维发布「天工 SkyAgents」平台，零代码打造AI智能体](https://juejin.cn/post/7307468904732540955 "昆仑万维发布「天工 SkyAgents」平台，零代码打造AI智能体")
		[12月1日，昆仑万维正式发布「天工SkyAgents」平台，助力大模型走入千家万户。「天工SkyAgents」是国内领先的AI Agents开发平台，基于昆仑万维「天工大模型」打造。](https://juejin.cn/post/7307468904732540955)
	- [
		天工大模型
		](https://juejin.cn/user/2016933583004163)
	- 120
	- 点赞
	- 评论
- [国产大模型推理能力已超GPT-3.5！冲进OpenAI评测榜第一梯队](https://juejin.cn/post/7280436247730077707 "国产大模型推理能力已超GPT-3.5！冲进OpenAI评测榜第一梯队")
		[OpenAI 开源的数学数据集，中国厂商新成绩一举冲到最前列！ 就在 9 月 16 日，国产大模型在权威推理评测集 GSM8K 中，首次达到了 80% 正确率，大幅领先 GPT-3.5（57.1%）和](https://juejin.cn/post/7280436247730077707)
	- [
		量子位
		](https://juejin.cn/user/2858385963484488)
	- 932
	- 4
	- 评论
- [「天工2.0」MoE大模型发布](https://juejin.cn/post/7332001319287275529 "「天工2.0」MoE大模型发布")
		[「天工2.0」MoE大模型发布，「天工AI」国内首个MoE架构免费向C端用户开放的大语言模型应用全新问世\*\*](https://juejin.cn/post/7332001319287275529)
	- [
		天工大模型
		](https://juejin.cn/user/2016933583004163)
	- 117
	- 点赞
	- 评论
- [基于Stable Diffusion的智能绘画大模型](https://juejin.cn/post/7313601254365659173 "基于Stable Diffusion的智能绘画大模型")
		[在人工智能领域，昆仑万维一直走在前沿，积极布局AIGC（人工智能生成内容）领域，并取得了显著的成果。今年4月，昆仑万维正式发布了“天工”大模型，这是其“All in”AGI与AIGC战略的代表性产品。](https://juejin.cn/post/7313601254365659173)
	- [
		Sicchasia
		](https://juejin.cn/user/266516848974903)
	- 75
	- 点赞
	- 评论
- [音乐ChatGPT时刻来临！「天工SkyMusic」音乐大模型今日启动邀测](https://juejin.cn/post/7352964118502899762 "音乐ChatGPT时刻来临！「天工SkyMusic」音乐大模型今日启动邀测")
		[4月2日，昆仑万维AI音乐生成大模型「天工SkyMusic」即日起面向社会开启免费邀测。本轮邀测将开放1000个免费名额，面向行业媒体、专家、以及感兴趣的音乐从业者开放。](https://juejin.cn/post/7352964118502899762)
	- [
		天工大模型
		](https://juejin.cn/user/2016933583004163)
	- 1.5k
	- 9
	- 1
- [第一个国产中文 o1 来了，直接数学竞赛题伺候！](https://juejin.cn/post/7441835843018113060 "第一个国产中文 o1 来了，直接数学竞赛题伺候！")
		[家人们，o1 大模型，最近着实是有点火啊。 就在今天，昆仑万维的 Skywork o1 首发中文逻辑推理能力，并开启了邀测。 那一波实测，这不就得安排一下么。](https://juejin.cn/post/7441835843018113060)
	- [
		量子位
		](https://juejin.cn/user/2858385963484488)
	- 274
	- 1
	- 评论
- [华人团队用大模型实现“读心术”：大脑活动直接变文字 | NeurIPS 2023](https://juejin.cn/post/7313575823235629082 "华人团队用大模型实现“读心术”：大脑活动直接变文字 | NeurIPS 2023")
		[无需侵入式设备或MRI NeurIPS收录的一项新研究，让大模型也学会“读心术”了！ 通过学习脑电波数据，模型成功地把受试者的脑电图信号翻译成了文本。 而且整个过程不需要大型设备，只要一块特制的“头巾](https://juejin.cn/post/7313575823235629082)
	- [
		量子位
		](https://juejin.cn/user/2858385963484488)
	- 671
	- 1
	- 评论
- [「天工SkyMusic」引爆全民音乐创作，1分钟实现小白音乐梦想](https://juejin.cn/post/7355067086824898598 "「天工SkyMusic」引爆全民音乐创作，1分钟实现小白音乐梦想")
		[4月2日,昆仑万维推出了国内首款、且唯一对外开放的AI音乐生成大模型「天工SkyMusic」,并正式启动内测,引来一众好评。 “刚才想了,为什么今天心情好。因为一直听音乐了。” “哈哈哈,每天听,每天](https://juejin.cn/post/7355067086824898598)
	- [
		Tech
		](https://juejin.cn/user/2300621557602413)
	- 164
	- 点赞
	- 评论

APP内打开