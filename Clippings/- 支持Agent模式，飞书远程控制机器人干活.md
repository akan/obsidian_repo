---
title: "支持Agent模式，飞书远程控制机器人干活"
source: "https://juejin.cn/post/7539762086625148954"
author:
  - "[[GoBot]]"
published: 2025-08-18
created: 2025-08-20
description: "大家好，我是GoBot的开发者。今天特别兴奋，想和大家聊聊我们最新上线的Agent功能，这可是我和团队熬了无数个夜晚才搞出来的东西。 为什么我要做GoBot？ 说实话，做GoBot的初衷特别简单——就"
tags:
  - "自动化"
  - "机器人"
  - "远程控制"
abstract: "GoBot开发者分享了新上线的Agent功能，通过飞书远程控制机器人处理重复工作，提升效率。"
---
![横幅](https://p9-piu.byteimg.com/tos-cn-i-8jisjyls3a/8c759ddb57d0440986f4768fc644f879~tplv-8jisjyls3a-2:0:0:q75.image)

[GoBot](https://juejin.cn/user/1031786009212476/posts)

31 阅读6分钟

![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/b37ce6cd3dfa46f699d8fc9c7c888f2f~tplv-8jisjyls3a-3:0:0:q75.png)

大家好，我是GoBot的开发者。今天特别兴奋，想和大家聊聊我们最新上线的Agent功能，这可是我和团队熬了无数个夜晚才搞出来的东西。

## 为什么我要做GoBot？

说实话，做GoBot的初衷特别简单——就是被繁琐的重复工作逼疯了。以前我在一家公司做技术，每天都要处理大量的数据报表、文件整理、邮件发送...这些事情机械又枯燥，但偏偏又不得不做。

我试过市面上各种RPA工具，要么贵得离谱，要么复杂得要命，要么就是功能太弱。作为一个程序员，我想："要不我自己写一个吧？"

就这样，GoBot诞生了。最开始只是个简单的脚本，用来处理我自己的工作。后来同事看到了，都说好用，我就慢慢完善，做成了一款真正的产品。

## 开发Agent功能的那些日子

大概半年前，我们团队开始琢磨怎么让GoBot更智能。传统的RPA工具都是"你告诉我怎么做，我就怎么做"，但我们想要的是"你告诉我做什么，我自己想办法做"。

这个想法说起来简单，做起来可真不容易。我们尝试了各种方案，踩了无数坑：

- 一开始想用Python写，结果性能跟不上
- 试过几个现成的框架，要么太重，要么不够灵活
- 模型调用也是个大问题，太贵的用不起，免费的又怕不够用

那段时间，我几乎天天熬夜，咖啡喝得比水还多。有好几次都想放弃，但一想到那些被重复工作折磨的同事，就咬牙坚持下来了。

## 转机：Eino框架的出现

就在我们快要撑不住的时候，字节跳动开源了Eino框架。我一看，这不就是我们一直在找的东西吗？

Eino是用Go语言写的，正好符合我们的技术栈。它的组件化设计特别清晰，流程编排能力也很强大。最关键的是，它在字节内部已经经过了大量实战检验，稳定性有保障。

我们立刻开始研究Eino，把原来的架构推倒重来。说实话，这个过程挺痛苦的，相当于把盖了一半的房子拆了重建。但看到Eino带来的性能提升和扩展性，我们知道这个决定是对的。

## 智谱模型的惊喜

模型选择上我们也纠结了很久。一开始想用一些大牌的商业模型，但一看价格就劝退了——我们可是想做人人都能用的工具啊。

后来偶然发现了智谱AI的GLM-4-Flash免费模型，抱着试试看的心态集成了一下，结果效果出乎意料的好！这个模型虽然免费，但功能一点不弱：

- 理解能力很强，能准确把握用户意图
- 支持长文本，处理复杂任务没问题
- 响应速度快，几乎感觉不到延迟
- 最重要的是，真的免费！

这简直就是我们这种小团队的福音啊！

## 飞书集成的灵感

至于为什么要支持飞书远程控制，这个灵感来自于我自己的痛点。

有次我在外地出差，突然想起办公室有个重要的报表还没处理。当时急得我团团转，最后不得不麻烦同事帮忙。路上我就想："要是能远程控制电脑干活就好了。"

回来后我们立刻开始研究飞书的开放平台，发现它的长连接模式特别适合做这种实时控制。而且飞书在国内企业中用得很多，很多用户都很熟悉。

开发过程中遇到不少挑战，比如如何保证安全性、如何处理复杂的指令解析、如何优化响应速度等等。但每次解决一个问题，我们都特别兴奋，感觉又离理想中的产品近了一步。

![file-20250818195637054.jpg](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a8226f9853704ed9a2fdc313e6c084be~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgR29Cb3Q=:q75.awebp?rk3s=f64ab15b&x-expires=1756126560&x-signature=Uqzh3VEbKMY8uVgUH0DTDRf9uec%3D)

## 终于上线了！

经过几个月的努力，Agent功能终于可以和大家见面了。说实话，上线那天我比高考查分还紧张，生怕出什么问题。

看到用户反馈说"太方便了"、"终于不用手动处理那些破表格了"，我心里那个美啊！所有的辛苦都值了。

现在我自己每天都在用这个功能。早上醒来，先在飞书上给GoBot发个消息："帮我整理昨天的数据，做个报表。"等洗漱完吃早饭，报表就已经躺在邮箱里了。这种体验，真的只有自己开发过的人才能体会那种成就感。

## 想对用户说的话

做GoBot这么久，我最想感谢的就是那些一直支持我们的用户。是你们的反馈和建议，让GoBot变得越来越好。

我知道GoBot还有很多不完美的地方，但我们在努力改进。每一行代码、每一个功能，都是我们用心做的。我们不是什么大公司，就是一群想把工具做好、让大家工作轻松点的普通人。

如果你还没试过GoBot的Agent功能，真心推荐你体验一下。不用怕复杂，我们做了很多优化，保证你能轻松上手。遇到问题随时找我们，虽然回复可能没那么快（毕竟人少），但一定会认真帮你解决。

## 未来的计划

接下来我们还有很多计划：

- 支持更多的交互平台，比如微信、钉钉
- 优化模型调用，让反应更快、理解更准
- 增加更多行业模板，覆盖更多场景
- 完善文档和教程，降低使用门槛

当然，最重要的还是听用户的声音。大家需要什么功能，我们就做什么功能。毕竟，工具是为使用者服务的嘛。

## 写在最后

做软件这行快十年了，做过不少项目，但GoBot是我最有感情的一个。可能是因为它真的解决了我和身边人的痛点，可能是因为看到用户用得开心我就特别满足。

如果你也在被重复工作折磨，不妨试试GoBot。它可能不是最完美的，但一定是最用心的。我们做不了大而全的东西，但可以在小而精的路上一直走下去。

最后，欢迎大家来体验，来吐槽，来提建议。你们的每一个反馈，都是我们前进的动力。让我们一起，把工作变得更轻松、更有趣！

评论 0

![avatar](https://p6-passport.byteacctimg.com/img/user-avatar/596dd11ec1eb86109467f46963b9da45~100x100.awebp)

0 / 1000

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

![avatar](https://p3-passport.byteacctimg.com/img/user-avatar/c08de7e130c5728a5b68bde3604f3c11~70x70.awebp)

为你推荐

- [部署 微信 AI 机器人 chatgpt-on-wechat](https://juejin.cn/post/7362346922861412392 "部署 微信 AI 机器人 chatgpt-on-wechat")
		[介绍： 本项目是基于大模型的智能对话机器人，支持企业微信、微信公众号、飞书、钉钉接入，可选择GPT3.5/GPT4.0/Claude/文心一言/讯飞星火/通义千问/Gemini/LinkAI/Zhip](https://juejin.cn/post/7362346922861412392)
	- [
		用户721795868216
		](https://juejin.cn/user/7021638194217)
	- 965
	- 1
	- 评论
	![部署 微信 AI 机器人 chatgpt-on-wechat](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4e19420eb7f24c2eaf921196874349d6~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis#?w=800&h=600&s=427727&e=gif&f=360&b=fcfbff)
- [飞书群聊机器人自定义机器人接入，并实现艾特@群成员功能](https://juejin.cn/post/7393185003205443622 "飞书群聊机器人自定义机器人接入，并实现艾特@群成员功能")
		[飞书群聊机器人还是比钉钉的要麻烦一点，钉钉的直接通过手机号就可以艾特群里面的人，但是飞书的要想艾特群里面的人，需要使用用户的 Open ID 或 User ID。这两个ID怎么获取呢？还需要在飞书的开](https://juejin.cn/post/7393185003205443622)
	- [
		1024小神
		](https://juejin.cn/user/70007368988926)
	- 1.6k
	- 1
	- 评论
	![飞书群聊机器人自定义机器人接入，并实现艾特@群成员功能](https://p3-juejin-sign.byteimg.com/tos-cn-i-k3u1fbpfcp/38a246f18ee342aba102e7fee6ffa726~tplv-k3u1fbpfcp-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgMTAyNOWwj-elng==:q75.awebp?rk3s=f64ab15b&x-expires=1756263520&x-signature=sGDgqlAHMqMBhH5lQLjI6ziwbzQ%3D)
- [摹客携手飞书，开启在线办公协同新征程](https://juejin.cn/post/6844904057102925831 "摹客携手飞书，开启在线办公协同新征程")
		[日前，摹客正式接入字节跳动旗下企业办公协同工具飞书（“Lark“），成为飞书首选对接的产品设计协作平台，开启了企业办公协同工具与设计协作工具全新的合作模式，为企业用户提供了更加优质高效的设计协同解决方案。 产业数字化是未来的重要趋势，数字化将会逐渐把各行各业改造成为“IT行业”…](https://juejin.cn/post/6844904057102925831)
	- [
		摹客
		](https://juejin.cn/user/2330620380866488)
	- 239
	- 点赞
	- 评论
- [火山引擎边缘智能×扣子，拓展AI Agent物理边界](https://juejin.cn/post/7423610485179990052 "火山引擎边缘智能×扣子，拓展AI Agent物理边界")
		[9月21日， 火山引擎边缘智能×扣子技术沙龙在上海圆满落地，沙龙以“探索端智能，加速大模型应用”为主题，边缘智能、扣子、地瓜机器人以及上海交大等多位重磅嘉宾出席，分享 AI 最新趋势及端侧大模型最新探](https://juejin.cn/post/7423610485179990052)
	- [
		火山引擎边缘云
		](https://juejin.cn/user/2876745302682567)
	- 109
	- 点赞
	- 评论
- [扣子空间初体验，附邀请码](https://juejin.cn/post/7496338587509669922 "扣子空间初体验，附邀请码")
		[刚拿到字节跳动推出的扣子空间（Coze Space）邀请码，就简单测试了下。它是类Manux的通用AI Agent平台，轻松应对各种复杂任务。 大概说一下体验后的感觉到的优点以及应用案例吧！ 一、核心](https://juejin.cn/post/7496338587509669922)
	- [
		谦哥
		](https://juejin.cn/user/1767670430571639)
	- 299
	- 2
	- 评论
	![扣子空间初体验，附邀请码](https://p3-juejin-sign.byteimg.com/tos-cn-i-k3u1fbpfcp/da6d0ff619ab4886bfcb4e2593364302~tplv-k3u1fbpfcp-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg6LCm5ZOl:q75.awebp?rk3s=f64ab15b&x-expires=1756263520&x-signature=GjB1kK4HK%2BGGB2Kw%2BHdUqukSqB0%3D)
- [什么样的智能体才算“真正能干活”？](https://juejin.cn/post/7491474391504699443 "什么样的智能体才算“真正能干活”？")
		[为什么大多数智能体平台不能真正“干活”？核心问题是：缺乏可调用的工具与清晰的执行结构。本文带你从实际项目出发，构建一个真正能生成报告、自动发邮件的数字员工。](https://juejin.cn/post/7491474391504699443)
	- [
		掘金安东尼
		](https://juejin.cn/user/1521379823340792)
	- 350
	- 4
	- 评论
	![什么样的智能体才算“真正能干活”？](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/1b2d6fb628a943828d3f93d9227168ce~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5o6Y6YeR5a6J5Lic5bC8:q75.awebp?rk3s=f64ab15b&x-expires=1756263520&x-signature=bV%2F5eESm4wOfQaWOnFSsAwHDlrA%3D)
- [阿里领投上亿！这款企业级Agent平台BetterYeah，细节太恐怖了..](https://juejin.cn/post/7533474784086458394 "阿里领投上亿！这款企业级Agent平台BetterYeah，细节太恐怖了..")
		[BetterYeah是一个企业级AI智能体（Agent）平台，近期获得了由阿里云领投的超亿元B轮融资。该平台旨在帮助企业用AI快速打造“数字同事”乃至“数字团队”](https://juejin.cn/post/7533474784086458394)
	- [
		AI袋鼠帝
		](https://juejin.cn/user/2032372037988990)
	- 22
	- 点赞
	- 评论
	![阿里领投上亿！这款企业级Agent平台BetterYeah，细节太恐怖了..](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7cd35e4f6bf3425d9a30e3981867fe32~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgQUnooovpvKDluJ0=:q75.awebp?rk3s=f64ab15b&x-expires=1756263520&x-signature=rWZQgm1Y1JYiB0%2Fgz%2F%2B3W0TTGok%3D)
- [Python工厂模式封装Webhook群聊机器人](https://juejin.cn/post/7202066150938542139 "Python工厂模式封装Webhook群聊机器人")
		[工厂模式是一种常见的设计模式，它可以帮助我们创建对象，而无需显式地指定其具体类型。在这种模式下，我们通过使用一个工厂来创建对象，并将对象的创建和使用分离开来，从而提高了代码的可维护性和可扩展性.](https://juejin.cn/post/7202066150938542139)
	- [
		忆想不到的晖
		](https://juejin.cn/user/817692384431470)
	- 2.9k
	- 9
	- 3
	![Python工厂模式封装Webhook群聊机器人](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd40aba3f26e4b89a41ceb09cdb57753~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis#?w=512&h=512&s=46530&e=jpg&b=191f2e)
- [AI Daily | AI日报：Imagination：被中芯国际收购GPU部门消息不实; 智元21亿收购，欲成“人形机器人第一股”; 英伟达市值首破4万亿美元，黄仁勋封神！](https://juejin.cn/post/7525003983929393179 "AI Daily | AI日报：Imagination：被中芯国际收购GPU部门消息不实; 智元21亿收购，欲成“人形机器人第一股”; 英伟达市值首破4万亿美元，黄仁勋封神！")
		[Imagination：被中芯国际收购GPU部门消息不实; 智元21亿收购，欲成“人形机器人第一股”; 英伟达市值首破4万亿美元，黄仁勋封神！; MCP协议漏洞：可致数据库数据泄露](https://juejin.cn/post/7525003983929393179)
	- [
		AIReadingHub
		](https://juejin.cn/user/2189882891712365)
	- 139
	- 点赞
	- 评论
	![AI Daily | AI日报：Imagination：被中芯国际收购GPU部门消息不实; 智元21亿收购，欲成“人形机器人第一股”; 英伟达市值首破4万亿美元，黄仁勋封神！](https://picsum.photos/1200/630?random=6559)
- [先进团队用飞书，飞书用 Zadig！端到端集成测试工程实践好文推荐](https://juejin.cn/post/7117531916923830285 "先进团队用飞书，飞书用 Zadig！端到端集成测试工程实践好文推荐")
		[一线 Tech Leader 伴随产品从 0 到 1，深度思考测试工程，从建设思路到落地实践，揭秘飞书视频会议背后的测试工程体系建设。](https://juejin.cn/post/7117531916923830285)
	- [
		Zadig
		](https://juejin.cn/user/4051045486962919)
	- 587
	- 1
	- 评论
	![先进团队用飞书，飞书用 Zadig！端到端集成测试工程实践好文推荐](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/779abcc86c8548be94f86b98d537bac0~tplv-k3u1fbpfcp-jj:216:144:0:0:q75.avis)
- [企业联合支持Google A2A 协议引领 AI Agent智能体互操作新标准](https://juejin.cn/post/7499272772008214528 "企业联合支持Google A2A 协议引领 AI Agent智能体互操作新标准")
		[最近（2025-04-10），Google 发布了一个叫 A2A（Agent to Agent Protocol）的东西，听起来很高大上，但其实它解决的是个超级接地气的问题：怎么让不同的 AI Age](https://juejin.cn/post/7499272772008214528)
	- [
		新时代木头人
		](https://juejin.cn/user/3010890091216318)
	- 47
	- 点赞
	- 评论
- [腾讯还是太全面了，限时免费！超全CodeBuddy IDE保姆级教程！（附案例）](https://juejin.cn/post/7531739692485984266 "腾讯还是太全面了，限时免费！超全CodeBuddy IDE保姆级教程！（附案例）")
		[这周 AI 编程是真的热闹，大厂们卷起来了！ 字节的 Trae Solo、腾讯的 CodeBuddy IDE、阿里的 Qwen3-Coder 接连上阵，搞得人还真是有点小兴奋。 就在前不久，身边的程序](https://juejin.cn/post/7531739692485984266)
	- [
		程序员X小鹿
		](https://juejin.cn/user/2928754709505608)
	- 2.0k
	- 5
	- 评论
	![腾讯还是太全面了，限时免费！超全CodeBuddy IDE保姆级教程！（附案例）](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f5ba9109d2814cee877229ad1e66fa6d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg56iL5bqP5ZGYWOWwj-m5vw==:q75.awebp?rk3s=f64ab15b&x-expires=1756263520&x-signature=6AvXLpxCgHF%2Btpr%2FM%2FVyXndnfuw%3D)
- [SmsForwarder：Star 19k,短信转发神器，让你随时随地掌控手机通知，监控Android手机短信、来电、APP通知，并根据指定规则转发到其他手机](https://juejin.cn/post/7449936411896102948 "SmsForwarder：Star 19k,短信转发神器，让你随时随地掌控手机通知，监控Android手机短信、来电、APP通知，并根据指定规则转发到其他手机")
		[SmsForwarder是一款开源的短信转发器APP，不仅能够转发短信，还能监控手机来电、APP通知，并根据用户设置的规则，将信息转发到其他手机或平台。这款APP适用于多种场景，如钉钉群、企业微信群、](https://juejin.cn/post/7449936411896102948)
	- [
		小华同学ai
		](https://juejin.cn/user/3389136900195088)
	- 1.2k
	- 10
	- 评论
	![SmsForwarder：Star 19k,短信转发神器，让你随时随地掌控手机通知，监控Android手机短信、来电、APP通知，并根据指定规则转发到其他手机](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/038406d8cf8c43faaab86523d791b523~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5Y2O5ZCM5a2mYWk=:q75.awebp?rk3s=f64ab15b&x-expires=1756263520&x-signature=2jzbDHveI4J%2FP5jN3672PwRlDe8%3D)
- [在线办公时代，如何选择合适的云办公软件？](https://juejin.cn/post/7233053557833547837 "在线办公时代，如何选择合适的云办公软件？")
		[在线办公时代，如何选择合适的云办公软件？ 随着数字经济的发展和疫情的影响，云办公已成为企业数字化转型和远程协作的必然趋势。云办公的发展不仅意味着工具与技术的迭代，更是组织环节与业务流程的进化。](https://juejin.cn/post/7233053557833547837)
	- [
		小威要向诸佬学习呀
		](https://juejin.cn/user/2450165790686094)
	- 2.8k
	- 2
	- 1
- [疫情下的远程办公实践指南](https://juejin.cn/post/6844904054531833869 "疫情下的远程办公实践指南")
		[新型冠状病毒的疫情突如其来、愈演愈烈，举国上下打起了一场没有硝烟的战争。1月26日，国务院发布通知，全国春节假期延长三天，很多互联网公司也开启了远程办公模式。 远程办公在国外并不是一件新鲜的事情。在硅谷，尤其是新一代的科技公司几乎都有远程工作的基因。在国内远程办公并不多见，但就…](https://juejin.cn/post/6844904054531833869)
	- [
		Nauyus
		](https://juejin.cn/user/4177799915246519)
	- 671
	- 3
	- 1
	![疫情下的远程办公实践指南](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/31/16ffa7b159921a0a~tplv-t2oaga2asx-jj:216:144:0:0:q75.avis)

APP内打开