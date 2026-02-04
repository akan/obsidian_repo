---
title: "OpenAI 花 1 亿美金收购 Prism？一个中国公司用 Vibe Coding 在 24 小时内验证了一个更优解"
source: "https://mp.weixin.qq.com/s/AlpZSNI446HSNrYNUuRJAg"
author:
  - "[[Xinwei]]"
published:
created: 2026-02-04
description: "1. 一亿美金的壁垒，真的存在吗？大家好，我是 Xinwei，PixelRaft 创始人，目前在南洋理工大学读 Master。"
tags:
  - "Vibe Coding"
  - "快速开发"
  - "技术降维"
  - "LaTeX 编辑器"
abstract: "文章讲述了一个中国团队利用 Vibe Coding 和 Antigravity 工具，在 24 小时内开发出比传闻中 OpenAI 高价收购的 Prism 表现更优的 LaTeX 编辑器 Frism，其核心优势源于团队在 AI 影视生成领域积累的复杂 Agent 架构经验。"
---
Original Xinwei *2026年2月4日 01:20*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**1\. 一亿美金的壁垒，真的存在吗？**

大家好，我是 Xinwei，PixelRaft 创始人，目前在南洋理工大学读 Master。

这两天科技圈都在讨论 OpenAI 收购一个公司Crixet 继而发布 Prism 的传闻。作为数学/物理背景的重度 LaTeX 用户，我第一时间去做了深度评测。结论很残酷： **作为一个估值过亿的产品，它在 CJK（中日韩）排版和复杂拓扑图（TikZ）生成上的表现，甚至不如一个调教得当的 Prompt。**

这让我和我的团队陷入了沉思。

其实，关于“下一代 LaTeX 编辑器”的 **产品架构和交互原型** ，早在几个月前就已经躺在 PixelRaft 的产品库里了。我们花了大量时间研究科研人员的真实痛点—— **不是“生成代码”，而是“所想即所得”的编译闭环。**

之前我们没动手，是因为开发成本太高。但看到 Prism 的表现，我意识到： **机会来了。**

这一次，我决定换一种玩法。我没有召集后端团队，而是决定独自一人，用 **Vibe Coding** 的方式，挑战一下传统 SaaS 的开发极限。

**2\. 武器：Antigravity 与 Vibe Coding 的降维打击**

为了在 24 小时内完成开发，我使用了 **Google Antigravity** 。

在开发 Frism 的过程中，我几乎没有手写一行底层逻辑。我把我们要解决的核心生成问题和编译纠错逻辑“喂”给 Antigravity。

它不是在“补全”我，它是在“理解”我。

它迅速帮我构建了一套 **基于** **Gemini** **的专有 Agent 工作流** 。这套工作流是我们 PixelRaft 几个月沉淀下来的核心 IP，通过 Vibe Coding，我只用了一个通宵就把这些复杂的业务逻辑变成了可运行的生产级代码。

**这就是为什么我们能快：**

- 传统模式：产品经理 -> 文档 -> 工程师 -> 写 BUG -> 改 BUG（两周）
- Vibe Coding 模式：创始人直觉 -> Antigravity -> 生产级代码（24 小时）

**结果：凭实力说话**

我们没有 1 亿美金的融资，但我们有更懂用户的 Agent 设计。

**TikZ 复杂绘图对比：** Prism 在处理我的物理作业（反相放大器电路）时，电阻符号经常画错。而 Frism 依靠我们的修正引擎，一次生成完美矢量图。 *(* 此处插入电路图对比 *)*

**中文排版：** 我们原生解决了 CJK 字体回退问题，这是很多硅谷产品容易忽视的盲区。 *(* 此处插入中文文档截图 *)*

**3\. 核心壁垒：来自影视工业的“技术下放”**

很多朋友可能会惊讶于 Frism 在结构化输出上的稳定性，问我是不是针对 LaTeX 做了大量微调。

**其实完全没有。**

Frism 表现出的强悍，某种程度上是一种“降维打击”。

我们 PixelRaft 的主业其实是 **AI Creator Tools** **（AI 影视/剧本生成工具）** 。在那个领域，我们需要让 Agent 生成比 LaTeX 复杂得多的 **剧本格式、分镜脚本和场景调度指令** 。

我们只是把在那边打磨成熟的一套 **结构化输出引擎** ，复用到了 LaTeX 这个相对简单的场景里。

**底层的 Agent 逻辑是完全通用的：**

1. **结构化约束** ：我们在生成剧本时要求 Agent 严格遵循剧本格式，同样的逻辑用来约束 LaTeX 语法，简直是降维打击。
2. **多层级自我修正** ：在影视生成中，Agent 需要根据“导演”的反馈反复修改分镜；我们将这套 **Feedback Loop** 迁移过来，变成了根据“编译器报错”自动修改代码。

所以，Frism 对我们来说，不仅仅是一个 LaTeX 编辑器，它更像是一个 **Side Project** ，一次“技术溢出”的验证。

![OpenAI 花 1 亿美金收购 Prism？我用 Vibe Coding 在 24 小时内验证了一个更优解。](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

OpenAI 花 1 亿美金收购 Prism？我用 Vibe Coding 在 24 小时内验证了一个更优解。

我们用处理影视工业级复杂度的 Agent 架构，来处理学术排版，这才是它比市面上其他 LaTeX 工具更稳、更懂逻辑的根本原因。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

**4\. 写在最后**

Frism 目前展示的，仅仅是我们 PixelRaft 对 **"AI-Native Productivity"** 构想的冰山一角。

这个项目证明了一件事：在 Agent 和 Vibe Coding 时代， **团队规模不再是壁垒，融资额也不再是护城河。**

唯一的壁垒，是对垂直场景的 **深度认知 (Insight)** 和将认知转化为产品的 **执行力 (Execution)** 。

目前 Frism 已经上线，欢迎大家体验。如果你对我们的技术路线感兴趣，或者也是在探索 Vibe Coding 的同路人（甚至是潜在的合作伙伴），欢迎联系。

**体验地址：** https://frism.pixelraft.com/

![Frism LaTeX Editor - AI-powered writing with real-time PDF preview](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Frism LaTeX Editor - AI-powered writing with real-time PDF preview

**公司主页：** www.pixelraft.com

**在 AI 时代 你比一亿美金更值钱**

**附：实际生成效果展示**

![img](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![img](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![img](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

img

![img](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

选自：https://zhuanlan.zhihu.com/p/2001218387142001210

  

  

  

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

更懂中文用户的 LaTeX 在线平台来了，点击领取福利！

**www.texhub.com**

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

点击👇 “ **LaTeX工作室** ” **关注公众号**

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

● [LaTeX 重制最牛最难《中学数学实验教材》共 6 册-免费下载 - 增加百度网盘](https://mp.weixin.qq.com/s?__biz=Mzg4MzEwNjc1Ng==&mid=2247517769&idx=3&sn=03d7ce6b45194540e1d70e96fb3a849c&scene=21#wechat_redirect)

● [2026 最新国家自然科学基金项目 LaTeX 模版，科研党的福音来了！](https://mp.weixin.qq.com/s?__biz=Mzg4MzEwNjc1Ng==&mid=2247528618&idx=3&sn=b726e39be1086b2b9dedfe4c0f965a70&scene=21#wechat_redirect)

● [MathLive —— 轻松编辑数学公式的宝藏神器！即时渲染、支持 LaTeX 输入，完美公式编辑体验！](https://mp.weixin.qq.com/s?__biz=Mzg4MzEwNjc1Ng==&mid=2247520326&idx=1&sn=ecf1129dbc0ed993c5f2746fbf505a6a&scene=21#wechat_redirect)  

● [LaTeX 公式排版超级备忘录 - 各类场景全覆盖](https://mp.weixin.qq.com/s?__biz=Mzg4MzEwNjc1Ng==&mid=2247513695&idx=1&sn=0f27998943a6f5e1057694950c883c9d&scene=21#wechat_redirect)

● [高中物理甲种本第一册重制豪华版来了](https://mp.weixin.qq.com/s?__biz=Mzg4MzEwNjc1Ng==&mid=2247520040&idx=1&sn=2d5702cfd8c05cf751cb778f3c2d2985&scene=21#wechat_redirect) （附全套教材下载）

● [LaTeX 重排 838页 《数学分析新讲·三册》](https://mp.weixin.qq.com/s?__biz=Mzg4MzEwNjc1Ng==&mid=2247521598&idx=1&sn=4dfe81e3b9f52db09d95a645fe1b7078&scene=21#wechat_redirect)

  

  

  

继续滑动看下一个

LaTeX工作室

向上滑动看下一个