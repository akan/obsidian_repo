---
title: "用 DeepSeek + HyperFrames 做视频，效果惊艳！"
source: "https://mp.weixin.qq.com/s/7PNOm0Jw37_6-sZgW-hM2w"
author:
  - "[[小 G]]"
published:
created: 2026-10-19
description:
tags:
  - "DeepSeek V4.1-Flash-1017"
  - "HyperFrames"
  - "AI Agent"
  - "网页逐帧渲染"
  - "视频制作"
abstract: "文章介绍 DeepSeek 新模型 V4.1-Flash-1017 与开源工具 HyperFrames 配合，通过 Agent 生成网页并逐帧渲染成带转场、字幕和配音的视频。"
---
昨天周六，DeepSeek 又趁着大家休息的时间发布新模型 V4.1-Flash-1017，这一次更新来头不小。

主打「许愿式编程」，只要说清楚想要什么，模型就会自己规划、写代码、检查再修改，从零做出一个完整的项目。

在 11 项基准测试评分里，可以看出比上一版提升了不少，甚至有好几项超越 Claude Opus 5 和 GPT 5.6-Sol。

![image-20261018152110946](https://mmbiz.qpic.cn/mmbiz_png/snxIHWuwQolX8BTuDnK7VAI2oqRsxzLwLEtHPOB60Ny4ib2e8kujzw0ibBI5TPlwDwXN4UMiagAXWPoQLNmbLoxDxkicGcgLJ4uBm9QckmpKmwM/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

目前已经可以在网页端、App 和 API 上使用新模型，API 的调用方式和价格都没变，继续用 deepseek-flash 就能调到新模型。

而且这一次模型干活更快，但花的钱却更少了，拉到最高 max 档跑一个编程任务平均约 1.3 元，上一版要 3.3 元左右。

从官方给出故宫 3D 建模、网页赛车游戏、《传送门 2》复刻等演示案例来看，做视频效果相当惊艳。

尤其一段「Valley of Ages 3D 场景」 是我最喜欢的，同一片河谷从史前一路演变到现代，看着就像一段动画短片。

![BuildcompleteprojectsfromscratchDeepSeek-V43-ezgif.com-video-to-gif-converter](https://mmbiz.qpic.cn/mmbiz_gif/snxIHWuwQonRTkiaSkcsbYDKolbdMIEhqe9ibHfoK20c6ibNjWNwZjhaC8qP6GQzibABKceaetJWWrx7vicdvXdl2E47jcjXpcxScs8RkQbZezlo/640?wx_fmt=gif&from=appmsg#imgIndex=1)

不过这些演示都是在浏览器里跑的网页，想变成一条能发的视频，还得自己录屏、配乐、对齐节奏。

于是我在 GitHub 上找到了一个开源工具： **HyperFrames** ，能让 DeepSeek 做出来的视频更加惊艳，补齐视频配乐的短板。

该工具是由做 AI 视频头部团队 HeyGen 开源，专门给 AI Agent 使用，已狂揽了 6.6 万 Star。

![image-20261018162849028](https://mmbiz.qpic.cn/mmbiz_png/snxIHWuwQonxyrD4O03tmnpoBZvbbhAfv8S6QcCon4X7oJ6k8zOia7dTanIX8kfvQ9f6djRo1hHKB1HKgnks53yZYMOTvDkGQyKaBFULHvVA/640?wx_fmt=png&from=appmsg#imgIndex=2)

在 HyperFrames 里，一条视频其实是一个网页文件，标题、图片、动画、背景音乐都写在里面。

每样东西什么时候出现、出现多久，在网页里使用的是标签标好。

写好之后在浏览器里就能实时预览，改一处刷新一下，马上就能看到效果。

渲染的时候，它会在后台打开浏览器，一帧一帧地截下来，再用 FFmpeg 合成 MP4。

因为是逐帧截取而不是录屏，不用担心卡顿掉帧，同一个文件渲染多少次，出来的视频都是一样。

，时长00:56

<video src="https://mpvideo.qpic.cn/0bc3xqc3eaaf2uacahgrcrvflpgdwk6almqa.f10002.mp4?dis_k=89db5e1e0f92b2046458e6defbc893dc&amp;dis_t=1792376510&amp;play_scene=10120&amp;auth_info=AMDuvfEvbFYbqrL0kHUpE0ZvGAQhZhhXESE/Zwg6XEQ7FXE0OAd3G2xVPmxjHyQzUmU=&amp;auth_key=3a42933f24c98e14b1b37c41546b3bbe&amp;vid=wxv_4743317234007670786&amp;format_id=10002&amp;support_redirect=0&amp;mmversion=false" controls="">Your browser does not support video tags</video>

Agent 上手更是没有门槛，为了让它做得更好，HyperFrames 还准备了 21 个 Skill。

装上之后，它会先跟我们确认需求，再按规划、写页面、加动画、配素材、检查、预览、渲染这一套流程走完。

同时 Skill 里内置了好几套现成的创作流程，会根据我们要做的东西自动挑一套来用。

比如给它一个产品网址，就能做一条宣传片，官方建议的长度在 30 到 90 秒之间。

丢一段文字过去，它能做成一条知识讲解视频，画面里的文字排版、示意图和图表，都由它自己来设计。

手上有一首歌的话，它还能按节拍做一条卡点视频，画面的节奏跟着音乐走。

已经拍好的口播视频也能交给它，加字幕、标题条和数据标注这些图文包装，原片不会被动到。

，时长00:41

<video src="https://mpvideo.qpic.cn/0bc3ueeiiaaiyiabnao4v5vfriodqsqqrbaa.f10002.mp4?dis_k=d2af7d8814a5faf623aa6b32da554091&amp;dis_t=1792376510&amp;play_scene=10120&amp;auth_info=Xdvao9kqblcS97OmyHItQBBtHAN1P0sDRnY9ZF43UUdmRy0/PQN1GmUIPz47GCBgBGc=&amp;auth_key=4a3e2ad995ac83f7ccb5b996e4e9fd09&amp;vid=wxv_4743317120543801345&amp;format_id=10002&amp;support_redirect=0&amp;mmversion=false" controls="">Your browser does not support video tags</video>

光靠 Agent 自己从零写特效，效果难免参差不齐，所以 HyperFrames 还准备了一个组件库。

转场、动态图表、社交媒体关注浮层这些常用效果都是现成的，一行命令就能装上：

```cs
npx hyperframes add flash-through-whitenpx hyperframes add data-chart
```

内置了很多风格的模板，不同的配色、字体和排版都有，可以挑一个自己喜欢的让 Agent 照着做。

![image-20261018153050696](https://mmbiz.qpic.cn/mmbiz_png/snxIHWuwQom8NwVPu4jrdLiaCzlRjXbvrIWED5pibXb5Ws4c9Ful8WyQgpgYq7JYl4xnRbhg6sAZPeomoF6GiccEelvqQ31tLWMyXN3KicrOaEI/640?wx_fmt=png&from=appmsg#imgIndex=3)

接下来，介绍一下如何将 DeepSeek 新模型接入 Codex，并跟 HyperFrames 搭伙做视频。

DeepSeek 官方有提供 Claude Code 和 Codex 的一键配置脚本，这里我选择了 Codex。

发送的提示词如下截图，大家可根据自己选择使用的 Agent 工具，稍微改一下即可。

![image-20261018155054135](https://mmbiz.qpic.cn/mmbiz_png/snxIHWuwQonnt2T45rltKmSgSIWTKKbtDV3wkgTQzIxjOHgw4bQDdspmnbkT4xtuetbjdFxF3ss2EtkzbfqmtssJIC9L8qKyIMNm7FBEfFg/640?wx_fmt=png&from=appmsg#imgIndex=4)

关于 API Key 的获取，大家自行到 DeepSeek 开放平台上创建，还需要往里面充值一点钱。

重新打开 Codex，看到模型用的是 DeepSeek-Flash，就说明接好了。

接着装上 HyperFrames 的 Skill，电脑上要先有 Node.js 22 以上的版本和 FFmpeg：

```bash
npx skills add heygen-com/hyperframes
```

![image-20261018162200800](https://mmbiz.qpic.cn/sz_mmbiz_png/snxIHWuwQol4icWVuh0HVibbVtcTgAksT3qS2P7ZhtgTeWD6BWxxVDujRyW1Q2ZNYePzIKU2IKO5kUP0NRpTAzX9ibuxchJuBNTvlJwp9z8iavs/640?wx_fmt=png&from=appmsg#imgIndex=5)

一切准备好，让 DeepSeek 用 HyperFrames 做一段讲解「降噪耳机怎么把噪音消掉」的科普视频。

结果有点出乎意料，整个生成过程用了 18 分钟，在开放平台上看到仅花了 1 块钱左右。

配音用的本地 Kokoro，支持中文普通话可自由更换男女声，不需要额外花钱。

![image-20261018164327268](https://mmbiz.qpic.cn/sz_mmbiz_png/snxIHWuwQokq8aPAVdPpdVFzV8oGl0NZL4GS7wmmp7K84IAnexibln38dKOJaujicibAmzlsOSkcxUnN1dWxvaCwHhSRy8pu7kiaeGU5w2dEVgU/640?wx_fmt=png&from=appmsg#imgIndex=6)

最后看下视频效果，中文口播配音准确，讲解的知识点也干，一段 40 秒视频就把耳机降噪的工作原理讲清楚了。

，时长00:40

<video src="https://mpvideo.qpic.cn/0bc3y4adwaaarmak5ioudnvfbr6dhpdqaoya.f10002.mp4?dis_k=2158a2dde5f5bbbf708ea6c568ced781&amp;dis_t=1792376510&amp;play_scene=10120&amp;auth_info=aKr1xH1hUhir5vecIX5DFDlIByRmGABDJ2wzU2EAE2hOeD9tUHofb1Rqb29Lc2MAMw==&amp;auth_key=30185b3492c3f323c0f7b5d5b809af2f&amp;vid=wxv_4743329619838386181&amp;format_id=10002&amp;support_redirect=0&amp;mmversion=false" controls="">Your browser does not support video tags</video>

### 写在最后

以前想做一条像这样带有动效的科普视频，要么花时间去学 AE、剪映这些软件，要么就得花钱找人来做。

现在把想要的效果说清楚，DeepSeek 负责写页面，HyperFrames 负责做好转场、字幕和配音，再渲染成视频。

而且 DeepSeek 新模型的价格的确也便宜，对视频哪里不满意，可以放心让它去多改几版，用不了多少钱也不心疼。

如果做这类科普视频流程跑通了，可以把它们发到各大短视频平台，直接起号涨粉。感兴趣的朋友，不妨先拿一条十几秒的小片子练练手。

GitHub 项目地址：https://github.com/heygen-com/hyperframes

今天的分享到此结束，感谢大家抽空阅读，我们下期再见，Respect！

AI · Table of Contents