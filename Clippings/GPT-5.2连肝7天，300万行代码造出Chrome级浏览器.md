---
title: "GPT-5.2连肝7天，300万行代码造出Chrome级浏览器"
source: "https://mp.weixin.qq.com/s?__biz=MzI3MTA0MTk1MA==&chksm=f0cfa6475181082eafef8dac84c5865f675aafe92e9a8b8144b0a0691acbe582ea4b0e9404b1&idx=1&mid=2652664792&sn=ef481284b5d67f4d32d7f6ec2c5f3cea#rd"
author:
  - "[[新智元]]"
published:
created: 2026-01-15
description: "「从零写一个浏览器」，人类当笑话，AI一周完成了"
tags:
  - "AI编程"
  - "长时任务"
  - "多智能体协作"
  - "浏览器开发"
  - "软件工程革命"
abstract: "Cursor团队使用GPT-5.2模型，通过多智能体系统连续运行一周，从零构建了一个功能完整的浏览器，展示了AI执行复杂长时任务的巨大潜力。"
---
新智元 *2026年1月15日 13:13*

### 新智元报道

编辑：定慧 艾伦

##### 【新智元导读】一个大模型持续写代码，能写多久？一小时？一天？还是像大部分AI编程工具那样，完成一个任务就结束对话？Cursor的CEO MichaelTruell决定搞一次极限压力测试！

Michael Truell 让Cursor中的GPT-5.2连续运行了 整整一周 。

不是一小时，不是一天，而是不眠不休，昼夜不停，168小时持续写代码。

结果？

**300万行代码。数千个文件。**

**AI** **完全从零构建出一个全新浏览器。**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3LvS1O5vdtaic6Xav8NPJdMNqg1cJib8hyzk7VKQoKHEhuiaeTibyAaNqjRACia3qDYVic7bfyPoNMsA7w/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

而且，还是Chrome那种浏览器。

HTML解析、CSS布局、文本渲染、还有一个自研的JavaScript虚拟机——全是AI自己写的。

Michael Truell轻描淡写地发了条推文：它基本能跑！简单的网页能快速且正确地渲染出来。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3LvS1O5vdtaic6Xav8NPJdMGRQ2CfxibVP49XiawkABku7Hw6oIugg3jI1jZ7FG2ia7CicDkqqBqtFcKg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2) ![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

**一个模型究竟能跑多久**

传统的AI编程工具，比如Github Copilot和早期的其他IDE，都是一问一答模式。

对话长度有限，上下文有限，任务复杂度有限。

后来出现了所谓的Agentic编程——Claude Code、Cursor Agent、Windsurf等工具让AI可以自主执行多步任务，读取文件、运行命令、修复错误。

这已经是很大的进步，但大多数情况下，任务仍然以分钟计算，最多几小时。

AI完成一个功能，人类review，然后继续下一个任务。

**但没有人尝试过让一个模型连续跑一周。**

直到GPT-5.2。

Cursor团队让GPT-5.2持续运行了 **整整一周** ，不是断断续续，而是 连续工作 。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/UicQ7HgWiaUb3LvS1O5vdtaic6Xav8NPJdMlFuOchFeaMWtaCtrRjVpDTIG0fxVbic7DGvYcs35iblKHlM3VBQlsKKQ/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

在这一周里，它：

- 写下了 **超过300万行代码**
- 创建了 **数千个文件**
- 执行了 **数万亿个token**
- **从零构建了一个完整的浏览器渲染引擎**

一个模型究竟能运行多久？

答案是： **理论上，可以无限** 。

只要基础设施稳定，只要任务足够明确，AI就能持续工作——不眠不休，不吃不喝，7×24小时全年无休。

[就像澳洲的放羊大叔的「赛博黑工」。](https://mp.weixin.qq.com/s?__biz=MzI3MTA0MTk1MA==&mid=2652664687&idx=1&sn=2dbb5ec827c5746577de94c5d12a80fa&scene=21#wechat_redirect)

但实际上，不同模型的「耐力」差异巨大。

**上下文窗口是第一道门槛。**

早期的GPT-3.5只有4K token上下文，意味着对话稍长就会失忆。

Claude 3推出了200K上下文，GPT-4 Turbo跟进128K，Gemini 1.5 Pro更是号称支持100万token。

但上下文长度只是理论值——真正考验的是模型在长任务中能否保持 **一致性、专注度和执行力** 。

Cursor团队在实验中发现了关键差异。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3LvS1O5vdtaic6Xav8NPJdMA6N3Yn7vKXsoTc2VIG9046GDWIMR9zBgGeuEaeTbMRMT99sTvpfbPg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

在Cursor这篇官方博客中，团队在实验中发现了关键差异：

- **GPT-5.2** 能长时间自主工作，遵循指令精准，保持专注不偏离；
- **Claude Opus 4.5** 倾向尽早结束，走捷径，频繁把控制权交还给用户；
- **GPT-5.1-Codex** 虽专为编码训练，但规划能力不如GPT-5.2，所以容易中断。

用更直白的话说： **Opus像个急躁的实习生** ，干一会就想问「这样行不行？我先交了哈」；

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3LvS1O5vdtaic6Xav8NPJdMyWE1ibMrR6F2bQvzjS27QtqUxequJxKl0V7sotSJoVCzRK19dicjnfmw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

而 **GPT-5.2像个老练的高级工程师** ，交代清楚任务就埋头干到底。

这也是为什么Cursor官方宣称： **GPT-5.2是处理长期运行任务的前沿模型。**

不止浏览器。

Cursor还透露了其他正在运行的实验项目：JavaLSP、Windows 7模拟器和Excel克隆。

数据都很夸张，AI自己不停地写了55万行代码、120万行代码和160万行代码。（话说，Excel代码比Windows还多点，因吹斯汀）

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3LvS1O5vdtaic6Xav8NPJdMp8Ff2eNiaBibXM9NlpzYepuDlSPdRAfiazOquEmjasDUzqgRNIqrAf4jw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7) ![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

**多智能体系统协作**

一个模型在一周内写300万行代码，注意是不停的写，没有人类干预！

这显然不是一个模型「单打独斗」，怎么做到的？

Cursor团队透露了他们的秘密武器： **多智能体系统（Multi-Agent System）** 。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3LvS1O5vdtaic6Xav8NPJdMYMMh4zpcK0C8QEhSwQyrwRXl5sqMUqjIo9IZA0yeYWEulTBT0Je0lA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=9)

最初，他们尝试让所有Agent平等协作，通过共享文件来同步状态。结果发现：

Agent会持有锁太久，或者干脆忘记释放锁。二十个Agent的速度下降到相当于两三个Agent的有效吞吐量。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3LvS1O5vdtaic6Xav8NPJdMIblAt9KB6vuqLoXbiaiaErZ3oeELPibZwlZCp9ydMYEJcAdOSY659IH2Q/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=10)

这像极了人类团队中常见的问题：会议太多、沟通成本高、责任边界不清。

最终有效的方案是 **分层架构** ：

- **规划者（Planners）** ：持续探索代码库，创建任务，进行高层决策
- **执行者（Workers）** ：专注于完成具体任务，不关心全局，提交后继续下一个
- **评审（Agent）** ：判断每轮迭代是否合格，决定是否进入下一阶段

这几乎是人类软件公司的组织架构：产品经理/架构师负责规划，程序员负责执行，QA负责评审。

但区别在于—— **这是成百上千个Agent同时工作** 。

Cursor团队实现了上百个Agent可以在同一个代码库上协同工作数周，几乎没有代码冲突。

这意味着AI已经学会了人类团队需要多年才能磨合出的协作默契。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**浏览器的「护城河」**

**比你想象的要深得多**

如果听到「不就是个显示网页的软件吗」这种评价，所有做过浏览器内核的工程师大概都会苦笑。

在计算机科学的鄙视链里，手写浏览器内核的难度，仅次于手写一个操作系统。

为了让你对这300万行代码有个概念，我们需要看一眼谷歌的Chromium（Chrome的开源母体）。

作为人类软件工程的巅峰之一，Chromium的代码量早已突破 **3500万行** 。

它不仅仅是一个软件，本质上已经是一个「伪装成应用程序的操作系统」。

GPT-5.2挑战的究竟是什么？

**首先是** **CSS** **的「混沌理论」。**

网页排版从来不是简单的堆积木。

CSS标准里充满了各种历史遗留的怪癖、层叠规则（Cascade）和复杂的继承逻辑。

一位前火狐浏览器工程师曾打过比方：实现一个完美的CSS引擎，就像是在模拟一个物理法则随心所欲变化的宇宙。你改动一个父元素的属性，可能导致几千个子元素的布局瞬间崩塌。

**其次是「** **虚拟机** **里的虚拟机」。**

这次AI不仅写了界面，还写了一个JS虚拟机。

现代网页跑的JavaScript代码需要内存管理、垃圾回收（GC）和安全沙箱。

稍微处理不好，网页就会吃光你的内存，或者直接让黑客穿透浏览器接管电脑。

**最要命的是，它选了Rust。**

Rust这门语言以「绝不妥协的安全」著称，它的编译器就像一位极度神经质的考官。

人类工程师在写业务逻辑时，往往要花一半的时间和编译器「吵架」，处理借用检查（BorrowChecker）和生命周期问题。

AI不仅要懂业务，还得在几百万行代码的规模下，让这位「考官」挑不出毛病。

能在七天内把这些硬骨头啃下来，并且让它们协同工作，这已经不是简单的「写得快」了，这意味机器开始具备了顶级的架构掌控力。

**当AI能够「忍受孤独」**

但这则新闻真正的炸点，其实不在于浏览器本身，而在于那个 **「Uninterrupted」（无中断）** 。

这是AI进化的分水岭。

在此之前，我们熟悉的AI编程工具（比如早期的Copilot）的情况是：你写个函数头，它补全五行代码；你发个指令，它生成一个脚本。

它们的记忆是碎片化的，注意力是短暂的。

一旦任务稍微复杂一点，比如「重构这个模块」，它们往往会顾头不顾尾，改了这头坏了那头，最后还得人来擦屁股。

但这次不一样。 **这是一次「长时任务」的胜利。**

这300万行代码分布在数千个文件里。

当AI写到第300万行时，它必须依然「记得」第1行代码里定下的架构规矩；

当渲染引擎和JS虚拟机打架时，它必须能回溯几万行代码去寻找Bug的源头。

这168个小时里，GPT-5.2肯定写出过Bug。

但它没有停下来报错等待人类投喂答案，而是自己读取错误日志，自己调试，自己重构，然后继续前行。

这种「编写-运行-修复」的自主闭环，曾经是我们人类工程师最引以为傲的护城河。

现在，这条护城河被填平了。

我们正在目睹AI从「聊天伴侣」向「数字劳工」的质变。

以前我们指挥AI做「任务」，比如「写个贪吃蛇」；

现在我们指挥AI做「项目」，比如「造个浏览器」。

**沉默的螺旋**

虽然这个AI版浏览器的成熟度距离Chrome还有很长的路要走，但它证明了路径的可行性。

**当算力可以转化为极其复杂的工程实施能力时，软件开发的边际成本将趋近于零。**

这场实验最令人震撼的，其实不是屏幕上那个渲染出的网页，而是那个在后台沉默运行了整整七天的进度条。

它不眠不休，不急不躁，以每秒数千字符的速度构建着数字世界的基石。

也许我们该重新审视「创造」的定义了。

**只有当工具开始独自在深夜里解决问题时，我们才明白，它不再只是工具，而是我们的同行者。**

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**从澳洲大叔的「赛博黑工」**

**到AI长时任务**

用5行代码逼疯硅谷的澳洲放羊大叔，其实只做了一件事情，就是让AI不达目标不能停止。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

至于Prompt.md写了什么命令，并不是重点。

就像今天Cursor CEO搞的这个极限压力测试一样，目标就是造一个Chrome、造一个Windows、开发一个Excel，只要没完成目标，AI就要一直运行下去。 回到最开始那个问题：

一个AI究竟能自己干多久？

物理上的答案是 **无穷** 。只要你有足够的算力、稳定的基础设施、清晰的任务定义，AI可以无限运行下去。

但更重要的是，这改变了软件开发的经济学。

传统软件开发的主要成本是 **人力和时间** 。

一个10人团队开发一个复杂项目，可能需要6个月到数年。每个月的人力成本可能是几十万到上百万。

现在，AI可以在 **一周内** 完成原本需要 **数月** 的工作。

成本可能只是一些token费用，Emad Mostaque（Stability AI前CEO）猜测Cursor浏览器项目可能消耗了约30亿个token。

他还有一个想法：用多少token能够重写一套Windows级别的操作系统？成本如何？

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Token是越来越便宜的，就像之前的水和电，最终基于token的算力也会变得极其廉价。

于是，软件经济学就被彻底颠覆。比如，软件按照授权付费的方式恐怕要消失了。

在2026年的今天，软件开发正在经历一场基因级别的变异。

从前，代码是人类一行一行敲出来的产物。

未来，代码可能只是人类意图的自动展开：你描述你想要什么，AI就能把它变成现实。

一个模型能跑多久？

**只要你需要，它就能跑下去** 。

参考资料：  

https://x.com/mntruell/status/2011562190286045552

https://x.com/leerob/status/2011565729838166269

https://cursor.com/cn/blog/scaling-agents

  

**秒追ASI**

**⭐点赞、转发、在看一键三连⭐**

**点亮星标，锁定新智元极速推送！**

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

新智元

向上滑动看下一个