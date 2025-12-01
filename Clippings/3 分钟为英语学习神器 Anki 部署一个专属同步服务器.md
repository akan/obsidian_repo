---
title: "3 分钟为英语学习神器 Anki 部署一个专属同步服务器"
source: "https://blog.csdn.net/alex_yangchuansheng/article/details/135386120"
author:
  - "[[alex_yangchuansheng]]"
published: 2024-01-04
created: 2025-12-01
description: "文章浏览阅读1k次，点赞14次，收藏21次。Anki 是一款基于间隔重复（Spaced Repetition）原理的学习软件，想象一下，你的大脑就像是一个需要定期维护的精密仪器。间隔重复就好比是一种精准的维护计划，它通过在最佳时刻复习信息，来确保知识在你的脑海中牢固地扎根。Anki 软件使用这个原理，帮助用户通过创建“卡片”来学习和记忆信息。所谓的卡片，专业说法叫 Flash Card（抽认卡或闪卡），是一小块纸片，分为正反两面，将问题和提示写在一面，将答案写在另一面。使用方法就是先看正面的问题与提示，在脑中回想答案，然后翻出反面进行对照验证。_自建服务器 单词卡"
tags:
  - "Anki介绍"
  - "同步服务器部署"
  - "客户端设置"
abstract: "本文介绍了如何为记忆软件Anki快速部署一个自有的同步服务器，以解决官方服务器同步慢的问题，并详细说明了各客户端的配置方法。"
---
### Anki 介绍

Anki 是一款基于间隔重复（Spaced Repetition）原理的学习软件，想象一下，你的大脑就像是一个需要定期维护的精密仪器。间隔重复就好比是一种精准的维护计划，它通过在最佳时刻复习信息，来确保知识在你的脑海中牢固地扎根。

Anki 软件使用这个原理，帮助用户通过创建“卡片”来学习和记忆信息。所谓的卡片，专业说法叫 Flash Card（抽认卡或闪卡），是一小块纸片，分为正反两面，将问题和提示写在一面，将答案写在另一面。使用方法就是先看正面的问题与提示，在脑中回想答案，然后翻出反面进行对照验证。如果你很容易记住某张卡片的内容，Anki 会增加下次复习这张卡片的时间间隔；反之，如果你觉得某张卡片比较难记，Anki会缩短这张卡片的复习间隔。

这种方法特别适用于需要记忆大量信息的领域，如语言学习、医学、法律等。

给大家看下我制作的闪卡：

![](https://i-blog.csdnimg.cn/blog_migrate/c11972d3e467b102f7146f0b79b9dc40.png)

每张卡片只有一个英文单词，与之配套的是该单词的音标、发音、图片、英文解释、例句。 **所有的版块都是英文，绝对不要出现中文！** 卡片的核心是图片和例句，通过图片可以猜到这个单词大概是什么意思，通过例句可以验证自己对单词意思的猜测是否正确，如果还不放心，可以看下英文解释，这一套流程下来绝对可以正确理解单词的意思， **完全不需要中文的干涉，这才是学习英文单词最完美的方式** 。

即便如此，大家在熟悉单词的过程中可能还会有一个误区，比如上面这个单词，你在学习的过程中可能会忍不住去想这个单词在中文里究竟是什么意思，甚至可能会在心里默念它的中文意思，即使你看了图片和英文解释，你心里可能还会忍不住去想：哦，这是转瞬即逝的意思。建议大家最好不要这么做，而是直接看这张图片，然后用心去体会： **哦，大概就是这么一种感觉，对对对** 。你能 [get](https://so.csdn.net/so/search?q=get&spm=1001.2101.3001.7020) 到这个单词所表达的那种感觉就行了，不要再去思考如何用中文来描述它，那样反而吃力不讨好。

---

下面言归正传，相信有很多小伙伴和我一样在使用 Anki 来学习英文单词或者其他的知识，但是 Anki 的同步 服务器 在国外，还是一个个人项目，带宽很小，同步速度很慢，如果我们想在多个客户端之间同步学习进度和新增的知识点，那将非常痛苦。

为了解决这个问题，我们需要部署一个自定义的同步服务器，然后让 客户端 去使用这个同步服务器。

### Anki 同步服务器部署

自从 2023 年 2 月份，Anki 发布了 PC 端 2.1.57 版本以后，Anki 的 PC 端，安卓端，iOS 端用户都可以自定义同步服务器了，并且不再需要安装插件。从此 Anki 小伙伴再也不用担心 Anki 同步的问题了，困扰 Anki 用户多年的同步问题终于得到彻底解决。

自 PC 端 2.1.57 版本以后，Anki 官方推出了镶嵌在 Anki 客户端的同步服务端和通过 Python 安装的同步服务端。

我选择使用镶嵌在 Anki 客户端中的同步服务端，因为它是用 Rust 写的啊， **人生苦短，我不用 Python** 。

但是官方并没有提供 Docker 镜像，于是我选择自己构建 Docker 镜像，项目地址：

- [https://github.com/yangchuansheng/anki-sync-server](https://github.com/yangchuansheng/anki-sync-server)

部署方法就非常简单了，你可以选择使用 Docker 部署，也可以直接使用 [Sealos 应用模板](https://sealos.run/docs/guides/templates/) 一键部署， **不用操心域名和证书等各种乱七八糟的事情，有手就行** 。

直接点击下面的按钮跳转到 [Sealos](https://sealos.run/) 的应用模板部署界面：

[![](https://i-blog.csdnimg.cn/blog_migrate/b22e6fad5ce9f391e5fd7f3ed63b9a36.png)](https://cloud.sealos.io/?openapp=system-template%3FtemplateName%3Danki-sync-server)

> 如果您是第一次打开 [Sealos](https://sealos.run/) ，需要先注册登录账号。

然后点击「部署应用」按钮开始部署。部署完成后，点击「详情」进入应用的详情页面。

这里可以看到实例的运行状态，一定要等到状态是 running 才算是部署成功。如果一段时间以后状态还不是 running，可以点击「详情」查看故障原因：

![](https://i-blog.csdnimg.cn/blog_migrate/7fe44454ac81bcc998b2b127d74d39d4.png)

部署成功后，可以看到应用的运行情况，包括 CPU 占用、内存占用等。外网地址就是同步服务器的公网域名。

![](https://i-blog.csdnimg.cn/blog_migrate/010f18ea3193cd4188a571099752c17b.png)

### 客户端设置

#### 桌面端

桌面客户端（macOS/Windows/Linux）配置方法如下：

1. 先打开「首选项」
	![](https://i-blog.csdnimg.cn/blog_migrate/9e6eb63cd9c9dc93addc4960e0493582.png)
2. 点击「 **网络** 」，往下看，可以看到标有 `self-hosted sync server(自定义同步服务器)` 的方框，在里面填写您的服务端的地址：
	![](https://i-blog.csdnimg.cn/blog_migrate/a725b82fb75d48fce54c095e519e8baa.png)
3. 重启 Anki，然后点击「 **同步** 」：
	![](https://i-blog.csdnimg.cn/blog_migrate/8d049e70395b744c1231172ed46720ac.png)
4. 这时候会弹出一个输入框让你输入用户名和密码，你需要将你之前设置的用户名和密码输入进去：
	![](https://i-blog.csdnimg.cn/blog_migrate/16bfd2bc692efb581979f2f2af4c6291.png)
5. 点击确认后，就会开始同步了。

#### 安卓端

安卓端也是直接配置即可，我的 AnkiDroid 版本是 `2.15.6` 。你可以通过「设置 -> 高级设置 -> 自定义同步服务器」找到配置页面。

![](https://i-blog.csdnimg.cn/blog_migrate/cef381523e902405d659d52893d331f5.png)

再填写用户名和密码：

> 设置 -> 常用设置 -> AnkiWeb账户

这样就算配置完成了，所有的牌组都同步过来了。

| ![](https://i-blog.csdnimg.cn/blog_migrate/543407da05d0b9206d23e7af98a44012.png) | ![](https://i-blog.csdnimg.cn/blog_migrate/d0f514e6989ed1897aa73c30bf9b5a3f.png) |
| --- | --- |

官方的版本实在是太老了，如果你想使用更激进的社区版本，可以到这个页面下载最新的 Beta 版：
- [https://github.com/ankidroid/Anki-Android/releases](https://github.com/ankidroid/Anki-Android/releases)

建议下载 **arm64-v8a** 版本。

安装完成后，可以通过「设置 -> 同步 -> 自定义同步服务器」找到配置页面：

![](https://i-blog.csdnimg.cn/blog_migrate/c064310dde0338950bfa2e1daf692207.png)

再填写用户名和密码：

> 设置 -> 同步 -> AnkiWeb账户

#### iOS 端

AnkiMobile 也已经支持和自建的同步服务器同步了。至少对于版本 Ankimobile 2.0.90(20090.2) 来说，似乎是可行的，这是一位 iOS 系统用户 [在 Anki 论坛报告的](https://forums.ankiweb.net/t/ankimobile-self-sync-server-failure-the-one-bundled-in-version-2-1-60-qt6/27862) 。

如果设置完成后发现不能同步可以参考下面的内容再试一次：

> If you're using AnkiMobile and are unable to connect to a server on your local network, please go into the iOS settings, locate Anki near the bottom, and toggle "Allow Anki to access local network" off and then on again.

上面的内容摘自 [ANki tutorial](https://docs.ankiweb.net/sync-server.html#client-setup)

实付 元

[使用余额支付](https://blog.csdn.net/alex_yangchuansheng/article/details/)

点击重新获取

扫码支付

钱包余额 0

抵扣说明：

1.余额是钱包充值的虚拟货币，按照1:1的比例进行支付金额的抵扣。  
2.余额无法直接购买下载，可以购买VIP、付费专栏及课程。

[余额充值](https://i.csdn.net/#/wallet/balance/recharge)

举报

[![](https://i-operation.csdnimg.cn/images/df6c67fa661c48eba86beaeb64350df0.gif)](https://mall.csdn.net/vip?utm_source=25618_vip_blogrighticon)

[AI 搜索](https://ai.csdn.net/chat/?utm_source=cknow_pc_blog_right_hover) [智能体](https://ai.csdn.net/chat/cmd?utm_source=cknow_pc_blog_right_hover) [AI 编程](https://ai.csdn.net/chat/coding?utm_source=cknow_pc_blog_right_hover) [AI 作业助手](https://ai.csdn.net/chat/homework?utm_source=cknow_pc_blog_right_hover)

隐藏侧栏 ![程序员都在用的中文IT技术交流社区](https://g.csdnimg.cn/side-toolbar/3.6/images/qr_app.png)

程序员都在用的中文IT技术交流社区

![专业的中文 IT 技术社区，与千万技术人共成长](https://g.csdnimg.cn/side-toolbar/3.6/images/qr_wechat.png)

专业的中文 IT 技术社区，与千万技术人共成长

![关注【CSDN】视频号，行业资讯、技术分享精彩不断，直播好礼送不停！](https://g.csdnimg.cn/side-toolbar/3.6/images/qr_video.png)

关注【CSDN】视频号，行业资讯、技术分享精彩不断，直播好礼送不停！

客服 返回顶部

![](https://i-blog.csdnimg.cn/blog_migrate/c11972d3e467b102f7146f0b79b9dc40.png) ![](https://i-blog.csdnimg.cn/blog_migrate/b22e6fad5ce9f391e5fd7f3ed63b9a36.png) ![](https://i-blog.csdnimg.cn/blog_migrate/7fe44454ac81bcc998b2b127d74d39d4.png) ![](https://i-blog.csdnimg.cn/blog_migrate/010f18ea3193cd4188a571099752c17b.png) ![](https://i-blog.csdnimg.cn/blog_migrate/9e6eb63cd9c9dc93addc4960e0493582.png) ![](https://i-blog.csdnimg.cn/blog_migrate/a725b82fb75d48fce54c095e519e8baa.png) ![](https://i-blog.csdnimg.cn/blog_migrate/8d049e70395b744c1231172ed46720ac.png) ![](https://i-blog.csdnimg.cn/blog_migrate/16bfd2bc692efb581979f2f2af4c6291.png) ![](https://i-blog.csdnimg.cn/blog_migrate/cef381523e902405d659d52893d331f5.png) ![](https://i-blog.csdnimg.cn/blog_migrate/543407da05d0b9206d23e7af98a44012.png) ![](https://i-blog.csdnimg.cn/blog_migrate/d0f514e6989ed1897aa73c30bf9b5a3f.png) ![](https://i-blog.csdnimg.cn/blog_migrate/c064310dde0338950bfa2e1daf692207.png)