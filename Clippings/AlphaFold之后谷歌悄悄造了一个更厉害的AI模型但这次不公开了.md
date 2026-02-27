---
title: "AlphaFold之后，谷歌悄悄造了一个更厉害的AI模型，但这次不公开了"
source: "https://mp.weixin.qq.com/s/xWuw6SQ40gxNJAbE1Yfcpg"
author:
  - "[[胡巍巍]]"
published:
created: 2026-02-26
description: "最近，谷歌悄悄推出了被 Nature 评论文章称为“AlphaFold 4”的新 AI，然而这一次却选择了不公布。"
tags:
  - "AI药物设计"
  - "蛋白质结合预测"
  - "保密模型"
abstract: "谷歌旗下Isomorphic Labs开发了名为IsoDDE的先进AI模型，其在预测蛋白质与分子结合强度、抗体-抗原结合以及发现隐藏药物结合口袋方面性能超越AlphaFold 3和Boltz-2，但出于商业考量选择不公开代码与论文。"
---
Original 胡巍巍 *2026年2月22日 20:36*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

最近，谷歌悄悄 推 出了被 Nature 评论文章称为 “ AlphaFold 4 ” 的新 AI，然而这一次却选择了不公开代码。

  

AlphaFold 能够预测蛋白质结构，帮助 人类 解决了几十年的生物难题，也拿了诺贝尔奖，全世界有几百万人使用它做研究。大家都知道 AlphaFold 由被谷歌收购的 DeepMind 研发而来，事实上谷歌在英国伦敦还养着一家名为 Isomorphic Labs 的公司，专门研究如何用 AI 设计新药。

  

此次打造的 “ AlphaFold 4 ” 是一个名为 IsoDDE 的新 AI，不同的是 AlphaFold 的代码是公开的谁都能下载，而 IsoDDE 是保密的只能谷歌自己享用。

  

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/LKiae5wcu5yicZr5CBDEhk2WficysymKXqrurtRwJnZicGOxRq1BuUxqJsd1dmyXJDhTO5SUG5YxzfiaNka5wSXAk3TqX18FDYthmwredbMib07cE/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

（来源： Isomorphic Labs ）

  

这个被谷歌独享的 AI 到底厉害在哪里？这要先从 AlphaFold 3 说起，AlphaFold 3 已经能够预测蛋白质和小分子的结合方式，这对于找到新药非常重要。药物要想起作用，就像钥匙插进锁孔一样，刚好卡在蛋白质的某个位置上。但是，光知道位置还不够，还得知道这把钥匙插得有多紧。松的肯定起不到作用，太紧了则可能有副作用。

  

以前测试松紧度的时候，得使用物理学方法慢慢计算，算一次可能得几天甚至几周，费钱而且费力。2025 年，领域内出现一个名为 Boltz-2 的开源模型，已经能够做到使用 AI 预测结合强度，速度比物理学方法快很多。

  

而 IsoDDE 比 Boltz-2 还准，准确度甚至超过了那些慢吞吞的物理学方法。而且 IsoDDE 特别擅长处理那些长得和训练数据完全不一样的分子。 美国 哥伦比亚大学的计算机生物学家穆罕默德·阿尔库莱希 （Mohammed AlQuraishi ） 公开表示，这意味着 IsoDDE 解决了最难的问题，也意味着背后研发人员肯定使用了很新的招数。

  

视频 | IsoDDE能够成功预测 Runs'n'Poses 测试集中最低 0-20 相似度区间中结合在 NKG2D 同源二聚体界面隐藏口袋上的蛋白质-蛋白质相互作用抑制剂的结构，而 AlphaFold 3 则在这个例子中失败了（来源： Isomorphic Labs ）

  

IsoDDE 还可以预测抗体怎么和抗原结合。对于抗体我们应该都不陌生，新冠疫情期间大家天天测试的就是抗体。抗体药现在是制药领域的现金大奶牛，每年销售额达到几百亿英镑。但是，设计抗体非常困难，因为它有一个 CDR-H3 的环状结构，不仅变化多端，而且很难预测。IsoDDE 在这个环节上，其准确率竟然比 AlphaFold 3 高出 2.3 倍，比 Boltz-2 高出将近 20 倍。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/LKiae5wcu5yicFEbSgkKMUiayhhx1100Jmd0icqI9xgneWYmzlMeuZMYq1F1jR3oGANNPibiaJ0jP0vEzOAeoMQeYH7c2VsUsmpbBY3St7J4Lb3wU/640?wx_fmt=other&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

图 | 来自 Runs N' Poses 基准测试的最难泛化类别中的蛋白质-配体结构预测准确率（来源： Isomorphic Labs ）

  

IsoDDE 还有一个找口袋的能力。蛋白质表面有一些凹陷的地方，药物分子可以钻进去。有的口袋藏得很深，平时看不见，只有特定分子靠近才会露出来。IsoDDE 则能从蛋白质的氨基酸序列出发，直接找到这些隐藏的口袋。据了解，背后研发人员使用一种名为 cereblon 的蛋白做测试，这个蛋白拥有一个人类使用了几十年的经典口袋，同时还有一个刚于 2026 年被发现的隐藏口袋。而只需使用序列信息，IsoDDE 就能把这两个口袋全部找到。

  

目前，Isomorphic Labs 已经将其用于各种新药项目，包括以前那些特别难搞的靶点。所谓难搞就是蛋白质表面光溜溜的，找不到口袋下手，或者口袋太深，药物钻不进去。而 IsoDDE 则能帮助人们找到突破口。

  

那么，这么厉害的东西，为何不开源？Isomorphic Labs 的选择其实不难理解。制药是几百亿的生意，谁先找到新药谁就能赚大钱，把核心技术藏着自己用在商业上很合理，但是科学进步本就依赖分享和验证，你把最厉害的武器锁在柜子里，别人就没法验证，也没法改进，整个领域的发展速度就会慢下来。

  

两年前 AlphaFold 3 发布的时候，也是只给了论文没有给代码，被骂了一通之后才开放。这次 IsoDDE 干脆连论文都不发，只给了一份技术报告。但无论如何，IsoDDE 让人们看到了 AI 设计药物的新高度。蛋白质折叠的问题解决之后，下一个问题就是如何设计出来治病的分子。Isomorphic Labs 背后的谷歌显然不想只当一个发论文的，他们也想亲自下场做出能吃的药，以及开辟新的业务增长点。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

（来源： Isomorphic Labs ）

  

事实上，IsoDDE 被称之为 “ AlphaFold 4 ” 并非仅仅因为它在功能上和 AlphaFold 有着一脉相承的风格，背后公司 Isomorphic Labs 更是直接由凭借 AlphaFold 获得诺奖的 DeepMind 创始人戴密斯·哈萨比斯（Demis Hassabis）亲自下场担任创始人和 CEO。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | DeepMind 创始人戴密斯·哈萨比斯（Demis Hassabis） 担任该公司创始人和 CEO（来源： Isomorphic Labs ）

  

该公司的科学顾问委员会同样是 “ 含诺量 ” 十足，凭借开发 CRISPR/Cas9 基因编辑技术而获得诺奖的詹妮弗·杜德纳（Jennifer A. Doudna）以及凭借开发不对称有机催化而获得诺奖的大卫·麦克米伦（David W.C. MacMillan）都在这里担任科学顾问 。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

图 | 詹妮弗·杜德纳（Jennifer A. Doudna） 和 大卫·麦克米伦（David W.C. MacMillan） 的照片和名字出现在该公司的科学顾问栏（来源： Isomorphic Labs ）

  

因此， 说这家公司是全球科研背景最强的公司之一可能并不为过，而下一次 Isomorphic Labs 再被爆出大新闻的时候 ， 也许是带着新药出现在新闻稿或发布会 上的时候。

  

参考资料：

https://www.isomorphiclabs.com/articles/the-isomorphic-labs-drug-design-engine-unlocks-a-new-frontier

https://storage.googleapis.com/isomorphiclabs-website-public-artifacts/isodde\_technical\_report.pdf

  

排版：胡巍巍

继续滑动看下一个

DeepTech深科技

向上滑动看下一个