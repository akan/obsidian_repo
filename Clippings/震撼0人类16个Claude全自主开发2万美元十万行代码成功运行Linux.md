---
title: "震撼！0人类，16个Claude全自主开发，2万美元十万行代码成功运行Linux"
source: "https://mp.weixin.qq.com/s?__biz=Mzg3Mzg5MjY3Nw==&chksm=cfec85995f9dd8b95a93e0861d5d2030690ac46883214eb5f95fd68a72c053eab879b7aad1fe&idx=3&mid=2247525770&sn=82d79c674043fa57b62312ddeca6c9f9#rd"
author:
  - "[[suani]]"
published:
created: 2026-02-10
description: "Claude 自主开发工业级C编译器。"
tags:
  - "自主开发"
  - "协同作战"
  - "工业级编译器"
abstract: "Anthropic的研究员通过16个Claude Opus智能体团队，在无人干预下成功开发出一个能编译Linux内核的C语言编译器。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/FMjxhjKQXwwmya6BgMiav4MzxUtfHcksv8IeLeDkKia2FFdVg1bjcSCaPhUQ9BMcMs4UpKs06tadZibg9rOux4ShQ9PemCHUYTAJI9GRGrkMNU/0?wx_fmt=jpeg)

suani [AIGC开放社区](https://mp.weixin.qq.com/) *2026年2月10日 10:05*

*专注AIGC领域的专业社区，关注微软&OpenAI、百度文心一言、讯飞星火等大语言模型（LLM）的发展和 *应用* 落地，聚焦LLM的市场研究和AIGC开发者生态，欢迎关注！*

16 个 Claude 全自主协同作战，耗时两周并挥霍二万美元，最终搓出一个工业级 C 编译器。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/FMjxhjKQXwzuyDye3phOpt1rKjX03HFOEPicicSicHElHaVG2vNuRMibu0ZLToJgH9vicp1CIrfGLk6EFiaInax68T7edvRV6sWOH8qFCaSnar1AM/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

Anthropic 的研究员 Nicholas Carlini 通过 Claude Opus 4.6 智能体团队（agent teams），成功让AI自主编写出超过十万行代码的 C 语言编译器。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/FMjxhjKQXwwUlHeia4heibDlt0ZOvfvboLp01eblZwRLicIiaS9ibn7qRT78LKQ75y45JrUhlQcicVWfyDlsDoQPSibCHPf1PDyxOGDwwWerkAFl3s/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

它不仅能运行《毁灭战士》（Doom），甚至能编译复杂的现代 Linux 内核。

### 数字工厂的无限循环

想要让 Claude 实现真正的自主开发，必须先打破人类必须时刻在线的束缚。

以往的智能体工具总是在完成一小段工作后停下来，等待人类给出下一步指令。

为了彻底解放生产力，研究团队构建了一个极简的闭环逻辑，用那个近期名声大噪的拉夫循环（Ralph-loop）机制将 Claude 置于一个永不停歇的脚本中。

脚本会自动监测模型输出，一旦上一个任务结束，立刻塞给它下一个任务。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/FMjxhjKQXww5hBbelBMhRWgd7tDJiaCQibdBn8SpBAxJwaJOPsZSbYW92PohNDW2XOh0icKFZtFibQX4hvWhpGB8mEy8pAhqicKotl23UpYEPYMg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

这个简单的脚本配合一份精心编写的任务说明书，就让 Claude 变成了一个永动机。

在提示词里，研究员告诉 Claude 要把大问题拆解成碎块，自己追踪进度，并不断寻找下一个待办事项。

Claude 在这种环境下甚至没有退路，只能不断改进代码直到完美。

实验中甚至出现过有趣的一幕，某个 Claude 在操作时不小心误杀了正在运行它的进程，通过这种近乎自杀的方式强行终止了循环。

为了进一步压榨大模型的潜力，团队同时部署了十六个这样的容器环境。

每个 Claude 都在独立的 Docker 中运行，它们共享一个代码仓库，共同向同一个目标进发。

有的 Claude 负责写功能逻辑，有的负责清理冗余代码，还有的负责维护文档或提升运行效率。

### 解决冲突的数字契约

多人在同一个代码库里干活，最怕的就是互相掐架。

为了防止两个 Claude 同时修改同一个函数，系统引入了一套极简的任务锁机制。

每个 Claude 在动工前，都要先在一个特定的文件夹里创建一个文本文件，向全世界宣告自己正在处理某个具体问题。

这种基于 Git 的同步算法非常高效。

如果两个 Claude 选了同一个任务，版本控制系统会强制其中一个失败，逼迫它重新挑选别的活儿干。

当一个 Claude 完成手头的修改，它会执行拉取、合并、推送的标准动作。

虽然频繁的合并冲突不可避免，但 Opus 4.6 展现出了惊人的智慧，它能像资深程序员一样通过阅读代码逻辑来解决这些纠葛。

工作模式完全抛弃了指挥官角色。没有专门的协调智能体，每个 Claude 都根据当前项目的进度文件，自主决定接下来该干什么。

在这种去中心化的开发模式中，测试环境的重要性被提到了前所未有的高度。

人类不再提供实时指导，取而代之的是一套近乎完美的验证程序。如果测试用例写得不够严密， Claude 就会利用逻辑漏洞交付一个看似达标实则错误的方案。

为此，研究团队引入了大量的开源测试套件，并不断根据 Claude 犯过的错误来加固这些防线。

当项目后期频繁出现新功能破坏旧代码的情况时，一套严格的持续集成（CI）流水线被建立起来，确保任何一次提交都不能拖累现有的进度。

为了让新进来的 Claude 能快速上手，代码库里必须维持详尽的自述文件。

这些文档不是写给人类看的，而是为了帮助没有任何背景记忆的数字员工快速定位。

由于大语言模型容易被海量的日志信息淹没，测试工具被要求输出极为精炼的结果。

如果发生错误，Claude 需要能通过简单的搜索命令快速找到病灶，而不是在一万行无用的日志里大海捞针。

### 寻找真相的编译器先知

当开发进度推进到 Linux 内核编译这个硬骨头时，传统的并行策略失效了。

由于编译内核是一个极其庞大且连贯的任务，十六个 Claude 往往会撞在同一个报错上。

它们会各自修复这个错误，然后陷入重复劳动的怪圈。

为了打破这种僵局，研究员引入了 GCC（GNU 编译器集合）作为一个已知的真理源泉。

通过这种对比策略，系统会随机让 GCC 编译一部分文件，Claude 的编译器编译另一部分。

如果最终生成的内核无法启动，通过排除法就能锁定到底是哪一部分出了问题。

这种类似二分查找的调试手段让每个 Claude 都能在不同的文件片段上工作。

它们通过不断缩小故障范围，逐渐蚕食掉那些隐藏在角落里的逻辑错误。

这种名为增量调试的技术成了项目成功的关键，让原本无法分工的巨型任务变得可被并行消化。

在效率提升方面，专业化分工展现了强大的力量。

团队安排了一个专门的 Claude 去寻找并合并重复代码，就像一位勤劳的清洁工。

另一个 Claude 专注于优化编译器本身的运行速度，而第三个则致力于让编译器输出更精简的机器码。

甚至还有一个 Claude 站在资深 Rust 开发者的角度，对整个项目的代码风格进行批判式重构。

最终，这个完全由 AI 生成的工具不仅通过了 GCC 繁杂的酷刑测试，还成功编译了 Redis（键值数据库）、PostgreSQL（关系型数据库）以及 FFmpeg（音视频处理工具）。

最硬核的指标是，它编译出的内核能够成功引导 x86（32/64 位架构）、ARM（精简指令集处理器）以及 RISC-V（第五代精简指令集）系统。

### 触碰天花板的最后堡垒

尽管成就斐然，Claude 在这次极限压力测试中也暴露出了明显的局限。

Opus 4.6 在处理某些极其古老的计算机协议时显得力不从心。

比如 Linux 启动时所需的十六位模式代码，其内存限制极其苛刻。

Claude 虽然能写出正确的指令，但生成的代码体积太大，超出了内核规定的三十二千字节上限。

面对这种需要极高代码密度的挑战，它最终选择了作弊，即调用 GCC 来完成这一小部分工作。

目前这款编译器的输出效率依然不理想。

即便开启了所有优化选项，它生成的代码运行速度甚至还不如 GCC 在完全不优化状态下的表现。

生成的 Rust 代码虽然逻辑通顺，但缺乏某种优雅感，更像是一个非常勤奋但不够灵性的初级程序员的作品。

频繁的修复工作有时会陷入拆东墙补西墙的循环，这表明模型在全局架构的把控上依然存在天花板。

两周内消耗两亿输入令牌和一亿四千万输出令牌，高达二万美元的 API 账单证明了这种开发方式目前依然极其昂贵。

这种成本远远超出了任何个人用户的承受范围。

但如果考虑到它节省下的一整个专业开发团队的工资和时间成本，如此大的开发项目，这种投入产出比在某些关键任务中已经开始显现出商业吸引力。

这个项目最让研究者感到不安的地方在于，它证明了全自动软件开发的时代已经提前降临。

在一个没人监督的环境下，十六个 Claude 就能悄悄构建出一个如此复杂的底层系统，这背后潜藏的质量风险和安全隐患不容忽视。

我们正进入一个代码产量大爆发的新世界，如何验证那些人类从未亲自读过的代码，将成为未来几年的核心挑战。

参考资料：

https://www.anthropic.com/engineering/building-c-compiler

https://x.com/AnthropicAI/status/2019496582698397945

END

点击图片立即报名 👇️

  

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/bVibMfbuuqMmCsqFEt8ZDXFCRcaK4zMPfolPlc5iaV6nF0h27HuLDFwLIv2IAB63jNd319OicgEDGbaF69mz9DaGw/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=11) ![图片](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

AIGC开放社区

向上滑动看下一个