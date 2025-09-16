---
title: "Gemini 那个巨烦人的缺陷，终于解决了"
source: "https://mp.weixin.qq.com/s/6l6Zp_IJv8QKWoIkKTBMkg"
author:
  - "[[网黑哥]]"
published:
created: 2025-09-16
description:
tags:
  - "Gemini"
  - "仿写文章"
  - "对话分支"
  - "Cherry Studio"
  - "API调用"
abstract: "文章介绍了如何通过Cherry Studio的对话分支功能解决Gemini在仿写文章时风格不稳定的问题。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/ncicWtGoBHtKSv4MX4vnvLM6fKNdBnt6C1bGMLNJOib1D37Gysh7mwu3J1QSJsGDxIdXMLBgHszm7e7YXulmLVsQ/0?wx_fmt=jpeg)

Original 网黑哥 [网罗灯下黑](https://mp.weixin.qq.com/s/) *2025年09月15日 08:01*

![Image](https://mmbiz.qpic.cn/mmbiz_png/ncicWtGoBHtISjh61cqKdLNPWkjU5GAO4LRgSAdEpf0siaJ7qDawSicjlaxkxXRseCetZqQHS2VlhmrasNpP3jqWw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

自从我之前发布了这篇 [完蛋了！我克隆了一个和猫笔刀一模一样的写手！](https://mp.weixin.qq.com/s?__biz=MzU2NTAzNzYzMg==&mid=2247633749&idx=1&sn=32d06853c81aff9b8da9a6af10f4f0b4&scene=21#wechat_redirect) 文章之后，说实话，我的后台就没消停过。每天都有小伙伴追着问啥时候发教程、给提示词。

我知道大家急，但真不是我藏着掖着，故意吊你们胃口。

仿写文章的 Bug

实际上，这段时间我写的每一篇文章，都是用那套方法生成的。但在持续压榨 Gemini 的过程中，我发现了一个巨坑爹的问题。

我让它仿写文章的过程是这样的，提交给它需要模仿的多篇文章后，它会分析提炼出一个大概一万多字符的提示词，来约束文风，然后基于这个文风再去写文章。

也就是说，单纯靠提示词效果达不到最佳效果，必须基于有模仿文章素材的同一对话，才能生成最佳的魔方效果。

可这家伙生成的文风，只有第一次对话的效果最「 原汁原味 」。

我后续想在这个对话里继续让它写点新东西，或者对上一段内容做点修改，它生成的文章风格就会打折扣。

如果第一次模仿效果能达到原作者 80% 的话，第二次大概就是 60% 的效果，容易跑偏。

所以为了保证每一篇文章都能有最纯正模仿效果，在找到终极解决方案之前，我只能用最笨、最原始的办法，每次都要上传多篇原文章，每次都要让它分析风格，每次都要开一个全新的对话。

你没看错，就是字面意思上的每一次。

这意味着，我每次需要让 AI 仿写一篇文章，都必须完整地走一遍下面的流程：

1\. 打开一个新的 Gemini 对话窗口， 上传历史文章 。

2\. 复制粘贴进去我那段风格分析提示词让 Gemini 分析。

3\. 等 Gemini 分析出结果生成该作者的模仿文风提示词后，再 把新文章的写作要求提交给它。

说实话，这个流程不仅操作繁琐，浪费时间，而且每次都要重新上传文件，简直就是对耐心的终极考验。

但我试了很多个大模型，模仿文章效果最好的就是 Gemini，明显要比其他的都要好。

但因为这么麻烦，所以这也是我迟迟没有把这个方法分享给大家的原因之一。

至于另一个原因，等下篇公布方法的时候会再提到。

我总觉得，这么不优雅的解决方案，肯定不是最终答案。

说白了，就是因为它缺少一个核心功能——对话分支。

你看隔壁的 ChatGPT ，早就支持这个功能了。你可以随时回到之前的某一次对话，然后开启一个全新的平行时空，在这个新分支里提要求。

![Image](https://mmbiz.qpic.cn/mmbiz_png/ncicWtGoBHtKSv4MX4vnvLM6fKNdBnt6CyBooypkuMrgJeEwlELc0iaibm5pPkBomnk8uKHE6tEGB5t7fXc7XqwRw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

这样一来，新的回答就只基于分支点之前的内容，既保证了上下文的准确性，又不会被后续的聊天内容所污染，还能省下不少 Token 。

很多大模型，包括 Gemini 在内，都没有这个功能。这导致我想持续稳定地复刻模仿文章的文风，变得相当繁琐。

![Image](https://mmbiz.qpic.cn/mmbiz_png/ncicWtGoBHtKSv4MX4vnvLM6fKNdBnt6CKqtGibTpnKvFWvwK3GIyKI9Ria9VGyG0hUqliclga3rQiawe6C82AUPgyQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

我一直不明白，对什么开一个对话分支这么简单的功能，这些 AI 巨头们都不愿意做呢。

直到最近，我在折腾另一个老朋友 Cherry Studio 的时候，脑子里突然灵光一闪，可以用它来解决这个问题啊。

Cherry Studio 这个第三方的客户端，之前也在文章中跟大家分享过，可以通过 API 密钥来调用各大模型。我之前一直拿它当一个备用的聊天工具，也知道它支持对话分支功能，但始终没把这两件事联系到一起。

现在，我终于想通了：我完全可以用本地调用 Gemini API 的方式，曲线救国啊！

这就意味着，我可以在 Cherry Studio 里这么操作：只需要进行一次完整的模仿文章分析操作， 以后每次想写新文章，只需要点击这个「分支」即可。

![Image](https://mmbiz.qpic.cn/mmbiz_png/ncicWtGoBHtKSv4MX4vnvLM6fKNdBnt6CU43pE1PzFoeTur8Q5hsZxI4nB4bibqZvnZo2Z8DOicn7LyzATerCqG7w/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

在这个全新的分支里，Gemini 是最纯净的初始记忆，它只会调用已经学好的文风，完全不受其他分支对话的任何干扰！

![Image](https://mmbiz.qpic.cn/mmbiz_gif/ncicWtGoBHtKSv4MX4vnvLM6fKNdBnt6C0G7y3wDwlhK5TlPcL6eC6jopBXIb6TxqDrpZIyXNJJUcwTkGe805HA/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

而且 还能将训练好的文风也就是将对话列表重命名并标注为固定在对话框中。

![Image](https://mmbiz.qpic.cn/mmbiz_png/ncicWtGoBHtKSv4MX4vnvLM6fKNdBnt6CiaXWc4kpoyVyqPX28fpo4hEjCc6kLdYs4uCvzicDC0RjyCYo3yiaKN15A/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

这么一来，不管是需要模仿谁的文章风格，点进去发送要求，就能直接生成文章了，特别方便。

解决方法

我知道你们现在肯定想看手把手的保姆级教程了， 今天先把这个破局的思路分享给大家，让一直催更的小伙伴们解解馋，也算是当做文风模仿教程推出之前的准备工作。

首先需要在 Cherry Studio 桌面端接入 Gemini 和 获取 API ，咱们一步步来。

官网： https://cherry-ai.com/

下载安装 Cherry Studio 后，打开点击界面右上方的设置按钮 。

依次选择模型服务— Gemini，点击「点击这里获取密钥」。  

![Image](https://mmbiz.qpic.cn/mmbiz_png/ncicWtGoBHtKSv4MX4vnvLM6fKNdBnt6CmPNagPr6eGiayZPTqO1UycNh0VoicoQtSu3rQgvKpm2zdVMoc4WEAic4g/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

进入下面这个网站界面后，点击右上方「创建 API 密钥」  

![Image](https://mmbiz.qpic.cn/mmbiz_png/ncicWtGoBHtKSv4MX4vnvLM6fKNdBnt6CLlrHp65Lic8TJ76iauBribM9KAgTBwFBuUn4dVQTDSicHNFFmPFMCfNWCA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

选择「Gemini API 」，然后点击「在现有项目中创建 API 密钥 」。

![Image](https://mmbiz.qpic.cn/mmbiz_png/ncicWtGoBHtKSv4MX4vnvLM6fKNdBnt6CXMoA26CiaOnUaHuFWh2wrT5Libuicz8eEabka7mVFK814WADMG02AFDQQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

生成 API 密钥后点复制，粘贴到 Cherry Studio 的 `API 密钥` 输入框里并检测。

![Image](https://mmbiz.qpic.cn/mmbiz_png/ncicWtGoBHtKSv4MX4vnvLM6fKNdBnt6CZB55QicW4gjvLOFpoibGVPvWGibVibz4DnoecWbAKlLZSTF6wgg2ZLzEWw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=9)

还在这个界面，点击下方的「管理」。  

![Image](https://mmbiz.qpic.cn/mmbiz_png/ncicWtGoBHtKSv4MX4vnvLM6fKNdBnt6CAmcjElXJe7wP1aVX2jpPEDeQckVZiauVEykTHGdDzHByswfmLiaWMIfw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=10)

在出现的界面搜索框输入关键词「 Gemini 2.5 Pro 」搜索，找到红框中的这个模型。

这个是 Gemini 2.5 Pro 的最新版本，6 月 17 日才发布的正式版。 一定要注意，不要选择有 Preview 后缀的。  

确定没错后，点击右边的 加号，就添加完成了。  

![Image](https://mmbiz.qpic.cn/mmbiz_png/ncicWtGoBHtKSv4MX4vnvLM6fKNdBnt6CrhgpdWcKyoHebplibHoxbGNDiblZlQxLO59rxvjibqhH2NwlrKXv9LvBw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=11)

过程很简单，这样就能在 Cherry Studio 上使用 Gemini 2.5 Pro 了。

众所周知， Gemini API 调用是免费的， 不过呢， Gemini 2.5 Pro 在免费的条件下，调用速率为：每分钟 5 次请求、每分钟最多 25 万 tokens、每天最多 100 次请求，但实际上足够每天的使用。

结语

说实话，技术的魅力就在于，当你觉得一条路走不通的时候，换个思路，或者换个工具，往往就能柳暗花明。  

不管怎么说，总算找到了一个相对完美的解决方案， 这个方法不仅解决了 Gemini 文风不稳定的问题，还大大提升了效率，再也不用每次都重复上传和提交了。

今天先分享这个方法，接下来 会马上安排完整的仿写文章教程 ，小伙伴们敬请期待！

![](https://mmbiz.qlogo.cn/mmbiz_jpg/C4rsDIGZrVEX3liaSyh6ElXeSnWoGQ1pctiaHhVCBcxNoE9PcJNsSbZMel2PHyI9k3LVyPKEAJ4ucvv1pH2MGib3A/0?wx_fmt=jpeg)

你好看一下子，我高兴一辈子

继续滑动看下一个

网罗灯下黑

向上滑动看下一个