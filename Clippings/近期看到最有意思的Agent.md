---
title: "近期看到最有意思的 Agent"
source: "https://mp.weixin.qq.com/s/n1BSxFuUUMcDzhJKku5TTg"
author:
  - "[[阿颖]]"
published:
created: 2025-09-26
description:
tags:
  - "多模型整合"
  - "创作工作流"
  - "交互设计"
abstract: "文章介绍了作者近期高频使用的多模型整合创作工具Lovart，并分享了其团队利用该工具结合Midjourney、Nano Banana等模型进行图片和视频创作的具体工作流程。"
---
Original 阿颖 *2025年09月26日 14:31*

不知道大家有没有看过最近 Nano Banana 核心团队的访谈，强烈推荐。我特喜欢看这种一线工程师、产品经理的对谈，感觉行业的趋势和前沿判断，其实都掌握在他们手里。下面是链接。

https://www.youtube.com/watch?v=Xd5u\_oUVhTw

视频中谈到一个重要的观点：

别再幻想一句 prompt 就能从零到生产级内容，这个预期被过度营销了。目前看，无论多么强大的模型，创作是迭代的： 先出一版，再局部修改，再风格校正，再多场景合成 。

模型不是一键替代流程，而是嵌进流程。既然是嵌进流程，所以，UI 也就是交互界面目前仍然是被大家低估的。

如何能把多种模态，甚至多个不同的模型以清晰、易用的方式整合起来，并构建适配用户真实生产流程的工作流，这里面是存在机会的。

******[#01](https://mp.weixin.qq.com/s/)******

**我最喜欢的一款 Agent**  

说到这里，我想到了最近一直高频使用的 Agent 产品：Lovart。虽然这款产品五月时就发布了，但其实我是从最近两个月才真正理解这款产品的价值，我们团队的日常创作越来越依赖它。

简单说，Lovart 自己不做模型，但这反而成了它的优势。谷歌这周刚发布的 AI 画板工具 Mixboard，目前还只能绑定自家模型。

而在 Lovart 上，主流的图片、视频、3D 生成模型几乎都能直接使用，我们可以在同一个界面里完成整个流程，不用来回切换工具。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/vHicVZXtcAzDXgX2ibVKqGWTCXhsIE7FXFJmkzGnHPiblbKCAFAOzsFa5sI6BD3R65icPgEbqhNozZ5wjMH2C0vZPg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

目前市场上的模型数不胜数，看得人有些眼花缭乱。但我始终觉得，它们之间的关系，并不是像世界杯那样非要分出冠军、亚军、季军。

它们更像是我家孩子手里的画笔。某些画笔适合画素描，线条干净利落；有些画笔适合涂水彩，晕染开来就能表现氛围；还有些是马克笔，颜色鲜亮，能迅速出效果。大家是互补的关系，各有所长。

Lovart 的价值是帮我们整理好彩笔、并摆在桌面上顺手的地方。 这样，围绕创作目标，我们可以自由挑选最合适的那一支，甚至在一张画里可以混用多支画笔，互相叠加出更丰富的效果。

现在，Lovart 也已经开始支持 Midjourney，喜大普奔。

虽然最近 Nano Banana 和 Seedream 很火，但不得不承认，在画面质感和艺术表现力上，Midjourney 依旧是行业天花板。只是，它的上手门槛也相对高一些。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果类比工具的话，Midjourney 更像是 Photoshop，专业、细腻，能给出极致的效果。而其他模型更像美图秀秀，简单易用，人人都能快速出图。两者之间并非高低之分，而是适配不同的场景。

最近我们团队摸索的工作流是，先用 Midjourney 生成几张底图，然后再用 Nano Banana 或者 Seedream 4.0 来改图。

我们的感觉是，Nano Banana 和 Seedream 在文生图方面的效果，还比不过 Midjourney。

这时候，Lovart 的优势就特别明显了。我们不需要来回切换平台、反复上传下载图片。

在同一个画布中，可以先用 Midjourney 打好底，再框选图片，用 Nano Banana 做修改；如果效果不理想，马上切到 Seedream 4.0 再试一次。

整个过程像在 Photoshop 里切换不同的笔刷一样自然，所有工具都被收纳在一个界面里。

******[#02](https://mp.weixin.qq.com/s/)******

**Lovart 视频制作教程**  

下面是我们用 Lovart 做的新案例。同样，还是给大家分享下我的经验。

首先，打开 Lovart 网站：

https://www.lovart.ai/

我们用 Midjourney 做一个主角的图片。下面是我的提示词，注意，Midjourney 还是尽量用英文提示词，它对英文的理解能力好于中文：

A modern hand-drawn illustration of a 20-year-old man with no beard and no hats, calmly walking forward from left to right in profile view, expression neutral. He wears a light gray T-shirt, dark gray pants, and white low-top sneakers. The background is clean and white, with the man’s shadow visible on the ground. The sketchy hand-drawn style uses soft, natural colors, and the design should appear as though it could seamlessly loop in an animation for a loading screen. Still illustration, no camera movement.

在 Lovart 画布中，点击左侧的“+”号按钮，再选择图片生成，就能调出来相应的输入框。如下图，我选择 Midjourney 模型，然后比例是 16:9，点击生成：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

你看到了吧，黑色按钮上显示“0 积分”。 因为我开了 Lovart 会员，所以现在用 Google Nano Banana、Seedream 4.0 和 Midjourney 都没有任何限制，生成图片完全免费。

最后生成的成品如下。哈哈哈，这次运气好，抽卡三次搞定的。嗯哼。

大家可以看看，其实这次人物的形象，比上期案例中 Nano Banana 生成的更好看，这就是 Midjourney 的优势所在。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

紧接着，继续让 Midjourney 生成场景中的底图。我希望这个人物能够走到不同的场景中。

但直接用 Midjourney 生成，我发现人物一致性保持的不好，所以思路是 Midjourney 生成好各个场景的图片后，我再让 Nano Banana 和 Seedream 做最后的融合。

第一个场景，清晨的街道。提示词如下：

Early Morning Street: A peaceful, empty street bathed in soft morning light. The pavement is slightly damp from the night’s rain, and the air is crisp and fresh. Trees line the sidewalks, their leaves still glistening with dew. A few cars parked along the side, and distant buildings stretch out toward the horizon. The atmosphere is serene, and the quiet streets evoke a sense of calm before the start of the day.16:9.--sref 1205250290

这次的生成，我使用的是右侧的对话框。这个大家就很熟悉了，选择模型，然后输入自己的提示词，等待生成就行。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Midjourney 搞定所有的底图后，我接着把场景和人结合起来。咱们先看我的第一张场景图：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

你肯定猜出来了，我想把人放到上图的场景中。但我的构想是，把背景图中的道路改为横向的，这样视频展示的时候，我们可以看到人物进入画面，然后走出画面，这样效果会好很多。

所以，我要开始改背景图了。还是用 Nano Banana：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

最后改完的效果图如下，可以看到，街道已经横过来了。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

不过，这张环境图还是不太满意。我想要的是近景效果，但生成出来的是远景。要是把人物放进去，比例就会显得很小，整个画面缺少氛围感。所以，继续改：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

下面的效果就比较满意了：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

环境图搞定后，我需要再把人物放进去。同样是使用 Nano Banana 模型来改：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

哎呀，这改出来效果不好，人太大了。继续调。AI 生图就是这样，需要有点耐心，然后不停的和模型交互。我用 Lovart 右侧的对话框，直接告诉它把人改小点：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

几次交互之后，我心满意足拿到了成品图：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

照这个思路，我先用 Midjourney 生成底图，然后再用 Nano Banana 把任务融合进去。

如果 Nano 的效果不够理想，那就切换成 Seedream 4.0 试试。最终出来的效果图如下：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续往后，咱们进入了视频生成环节。

再啰嗦一句，这也是 Lovart 让我用起来特别顺手的地方。 同一个画板里，我不用切换任何工具，就能一站式完成自己的创作。

图片生成好之后，我直接在原画布上把它们转换成视频。Lovart 已经集成了可灵、Veo3、Vidu、Seedance、Hailuo 等视频模型。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

第一个视频搞定后，我紧接着又生成了第二个。为了方便演示，我在流程上做了不少简化。

真实的创作过程其实没这么顺利，常常要反复抽卡，多试几个版本，才能挑出一张自己觉得顺眼的。

大家记得要做好心理准备，没耐心这事很难做好。

下面是第二个视频的生成过程：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

******[#03](https://mp.weixin.qq.com/s/)******

**写在最后**  

Lovart 是我近期看到最有意思的 Agent。

好像从两年前开始，行业就觉得给模型套壳没什么天花板，很容易被模型本身吃掉。我曾经有段时间也是这样的认知。可是真的深度使用 Lovart 后，我的看法变了。

好的交互是能把复杂的流程变得简单、易用。并且多模型的无缝整合，也能为用户节省 Context 的切换。做好这两点，本身就是壁垒。

Lovart 并不做模型本身，而是把主流的图片、视频、3D 生成模型都整合到了一个画布里。现在市面上的模型越来越多，各有各的特长。

与其争论谁更强，不如把它们当成不同类型的画笔，素描、水彩、马克笔，各自适合不同的需求。Lovart 的价值就在于帮你把这些画笔收纳好，并且提供一个简单、顺手的操作界面。

模型之上的交互设计，在当下仍然是被低估的。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

AI产品阿颖

向上滑动看下一个