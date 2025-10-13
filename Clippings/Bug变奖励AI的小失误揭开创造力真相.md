---
title: "Bug变奖励：AI的小失误，揭开创造力真相！"
source: "https://mp.weixin.qq.com/s?__biz=MzI3MTA0MTk1MA==&chksm=f0c836b28f3e5f6f7e80e3a303a02fd195fa8971b2b7557a56737596a98150750f856c554066&idx=3&mid=2652633752&sn=fd3b7a186525a3a0a7e88893859cfbbd#rd"
author:
  - "[[新智元]]"
published:
created: 2025-10-13
description:
tags:
  - "扩散模型"
  - "局部性"
  - "平移等变性"
  - "ELS方程机"
  - "创造力副作用"
abstract: "最新研究发现AI的创造力并非设计能力而是模型架构中局部性和平移等变性规则带来的副作用"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/UicQ7HgWiaUb13PK7P1RbtdYGPvMEGtxJibDASfIft1FhLozCktojTiaMOrnicvLC1D2Ez3nOq7yLBfR66Aia3Ztp9vg/0?wx_fmt=jpeg)

新智元 [新智元](https://mp.weixin.qq.com/) *2025年10月12日 17:14*

### 新智元报道

编辑：倾倾

##### 【新智元导读】 扩散模型本该只是复制机器，却一次次画出「六指人像」甚至是陌生场景。最新研究发现，AI的「创造力」其实是架构里的副作用。有学者大胆推测人类的灵感或许也是如此。当灵感成了固定公式，人类和AI的差别还有多少？

你一定见过那些奇怪的AI画：人物手上多出几根手指、脸部细节怪异，却又带着某种说不出的新鲜感。

这让人产生一个疑问：扩散模型明明只「复刻」，为什么还能画出前所未见的作品？

最新一项研究给出了答案：

其实，AI的创造力并非「神来之笔」，而是模型架构的副作用。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

**明明只会复制，AI为何还能创作？**

扩散模型的任务很简单：把数字噪声还原成训练过的图像。

就像把一幅画放入碎纸机，直到只剩下一堆细小的灰尘，然后将碎片重新拼凑到一起。

照理说，它应该只会生成「复制品」。

可现实却让研究者大跌眼镜。

DALL·E、Imagen、Stable Diffusion这些模型，画出的不是「翻版」，而是全新的图像：

不同元素被组合在一起，构成前所未见的场景。

更令人意外的是，这些拼贴并不是毫无意义的杂乱色块，而是带着语义的完整作品。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb13PK7P1RbtdYGPvMEGtxJibXBMhpgxZLTNiaB96j4jQrpV6DQYWQz0WvQkZsDJQuKw1dbFmpWzgSBg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

DALL·E 2制作了这些「金鱼在海滩上啜饮可口可乐」的图像。这个由 OpenAI创建的程序可能从未遇到过类似的图像，但它仍然可以自行生成这样的图像。

还记得那些在社交平台疯传的「AI多手指人像」吗？

有些图看上去像是超现实主义的画——人物手上莫名其妙多出几根手指，但整体仍旧保持了清晰的结构感。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb13PK7P1RbtdYGPvMEGtxJibFWHfCXJ8wIVTsic2Uf0vg4HQLfOnNV7tP6YkLluw87YM1p45K70tPsg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

这类怪异产物，一度被当成笑料，却也让科学家警觉：模型为什么会「即兴发挥」？

Giulio Biroli将这种现象称为「扩散模型的悖论」：

「如果它们真的只是记忆，就不该有创造力；可它们偏偏能画出前所未见的东西」。

那么，AI的创造力到底是从哪里来的？

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

**六指人像背后的「bug奖励」**

在最新研究里，两位物理学家给出了一个颇为出乎意料的答案：

AI的「创造力」，其实是它架构里的副作用。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb13PK7P1RbtdYGPvMEGtxJibVVwuvkkSR4uNvDGrXEAwFqicktU6KjL44krwiahtAO4MyFcjLs66NpxQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

扩散模型在生成图像时，依赖两条严格的规则：

第一条叫做局部性。

它在绘制过程中，并不会通盘考虑整张画面，而是一次只关注一个小小的像素「拼块」。

就像拼图时，你盯着一块颜色相近的小碎片，却不会去想它最终会出现在整幅画的哪个角落。

第二条叫做平移等变性。

如果输入图像整体往左或往右挪动几个像素，模型生成的画面也必须跟着同步移动。

这是它保持图像结构连贯的方式。

这两条机制，本来是扩散模型在「去噪」时的限制条件。

研究者一度认为这是缺陷，会让模型没法生成完美的复制品。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb13PK7P1RbtdYGPvMEGtxJibyyiatdQqZSXic0tW99tUzj5EnZv7DmwnSicq9QNS3yNggEs6wicjkANuYg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

可事实证明，正是这种「不完美」，反而让AI无法完全依赖记忆，必须在局部的拼贴里即兴重组。

这就导致了，手指可能多长了几根，元素可能拼接得有点怪异，但整体画面却意外生出了新意。

也就是说，AI 的创造力，并不是额外设计出来的能力，而是它架构必然带来的副作用。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

**ELS方程机：创造力的数学化证明**

如果说AI的创造力真是副作用，那要如何证明？

斯坦福大学的研究生Mason Kamb和导师Surya Ganguli，进行了一次实验。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb13PK7P1RbtdYGPvMEGtxJibQaiciatgYibVpj4eLNu3ongibPxy5EmgcexfsVribo3ABsywaQmndgWpamg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

他们基于那两条规则构建了一套纯粹的数学系统，命名为ELS方程机（Equivariant Local Score machine）。

这个系统的特别之处在于，它不依赖海量训练数据，也没有任何黑箱深度网络。

它是一套方程，用来预测当噪声一步步被「去除」时，图像会如何拼合。

然后，他们把同一组噪声图像同时输入ELS方程机和真实的扩散模型。

结果令人震惊：ELS方程机生成的结果，与扩散模型的输出平均重合度高达 90%。

在机器学习领域，这几乎是前所未有的精度。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb13PK7P1RbtdYGPvMEGtxJib1hibmEAYSlfe6HGB1B3sTaEAOK1vRWwhQHRJ6QCCTAlaqfzcwjIAkog/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=10)

Ganguli感叹道：

「这就像是用一组公式，写下了创造力的来源。」

所谓的「AI创造力」，并不是神秘的灵感，而是局部性与等变性在动态运行中必然产生的产物。

只要满足这两个条件，「创造」就会自动出现。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=11)

**AI的小失误，揭开人类创造力的秘密**

这项研究不仅揭开了扩散模型的秘密，还让人联想到生命系统。

Mason Kamb之所以产生这个灵感，是因为他长期研究形态发生——也就是胚胎如何从一团细胞，自我组装成器官和肢体。

在这个过程中，细胞只是根据身边邻居的信号做出局部反应。

大多数时候，这种自组织能顺利生成一个正常的身体，但偶尔也会出错——比如多长出几根手指。

当Kamb看到扩散模型生成的那些「AI多指人像」时，他立刻联想到胚胎发育里的这种「局部拼贴错误」。

这说明，AI的创造力，本质上和生物的自组织过程，有着惊人的相似。

研究者甚至提出一个更大胆的类比：人类的创造力，也许和AI并没有本质不同。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb13PK7P1RbtdYGPvMEGtxJibbg9reh1IzuQb7VlqMW3GfPYGv5CNrCBxJwZtzJ7Oq1CXFxMAqTzCZA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=12)

我们的大脑，并不是凭空冒出灵感，而是在有限的经验和记忆中，不断拼接、补全、想象，最后产出新东西。

正是这偶尔的错误与缺口，反而成为创新的源泉。

正如IBM研究员Benjamin Hoover所说：

「人类和AI的创造力，可能都根植于对世界的不完整理解。」

创造力未必是高高在上的天赋，它也可能是一种副作用，一种「不完美」带来的意外之喜。

当「创造力」能被一组公式写下，人类和机器的界限也愈发模糊了。

或许，真正的灵感，从来不是天才的特权，而是「不完美」的副产物。

研究揭示的，不只是AI的密秘密。

也许是在提醒我们：创造，往往生长于偏差之中。

参考资料：

https://www.wired.com/story/researchers-uncover-hidden-ingredients-behind-ai-creativity/

https://www.quantamagazine.org/researchers-uncover-hidden-ingredients-behind-ai-creativity-20250630/

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/UicQ7HgWiaUb2nMiaXEuMsLoJhMLetMGE4N8VTjcEVSCeOtzh69k0qibn6dMw8ow1ulFVpvOLMDN44p2ibSUKv9OXAQ/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=13)

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/UicQ7HgWiaUb13PK7P1RbtdYGPvMEGtxJibCaNYjzRjEB82uLa1ickZ6lq0BTWMKXqOpm9YRbPtRJT7hiaKZ4dficV8w/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=14)

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

继续滑动看下一个

新智元

向上滑动看下一个