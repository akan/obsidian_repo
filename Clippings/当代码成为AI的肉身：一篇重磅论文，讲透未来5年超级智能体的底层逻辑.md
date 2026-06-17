---
title: "当“代码”成为AI的肉身：一篇重磅论文，讲透未来5年“超级智能体”的底层逻辑"
source: "https://mp.weixin.qq.com/s/ILmJ7IkVKm4Md-CNHUBQOQ"
author:
  - "[[TommyYang]]"
published:
created: 2026-06-12
description:
tags:
  - "智能体工作台"
  - "代码智能体"
  - "工作台工程"
abstract: "代码不再仅仅是AI生成的产品，而是演变为AI用于思考、行动、记忆和协作的底层运行平台。"
---
TommyYang *2026年6月12日 09:08*

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 一、 论文速览

## 论文名片

**论文标题** ：《Code as Agent Harness: Toward Executable, Verifiable, and Stateful Agent Systems》（代码即智能体工作台：迈向可执行、可验证与有状态的智能体系统）

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**论文网址：https://arxiv.org/pdf/2605.18747**

**作者团队** ：由来自伊利诺伊大学厄巴纳-香槟分校（UIUC）、Meta（前Facebook）以及斯坦福大学的顶尖学者联合发表（核心贡献者包括Xuying Ning, Katherine Tieu等）。

**发布时间** ：2026.05

**核心关键词** ：Agent Harness（智能体工作台/底座）、Coding Agent（代码智能体）、Harness Engineering（工作台工程）、Agentic AI（智能体化AI）。

**一句话摘要** ： **代码不再仅仅是AI生成的“最终产品”，而是变成了AI用来思考、行动、记忆和团队协作的“身体”、“工具”和“工作台”。**

## 论文摘要（大白话版）

最近，像ChatGPT这样的大语言模型（LLMs）在写代码方面变得非常牛，甚至能帮你维护整个软件项目。在这个大趋势下，本论文提出了一个颠覆性的视角：在未来高度自治的AI智能体（Agent）系统中，代码不再只是一个“目标输出”。代码正在变成AI的“操作底座”——AI通过写代码来推理想问题，通过运行代码来采取行动，把复杂的真实世界变成代码环境，还能通过代码的报错来验证自己做得对不对。

本文将这种现象定义为 **“代码即智能体工作台（Code as Agent Harness）”** 。文章从三个层面拆解了这件事：

1）接口层（AI如何用代码连接世界）；

2）机制层（AI如何通过代码进行长期规划、记忆和使用工具）；

3）扩展层（多个AI如何基于代码进行团队协作）。最后，文章还探讨了这种AI在程序员助手、电脑GUI自动化、实体机器人、科学发现等领域的应用及未来挑战。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/klUQVfPc8Ox4dyY2zrPxLJfuW5PtibV3ficGIJ6Xe47pwiczcTtmeBrsS56ZBfQw5bzmgu9faiaDFBAltjVUicjLu4RRYleqibq8Yn20kOAIsVeUg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

## 二、 这篇论文到底解决了一个什么痛点？（为什么要提出这个概念？）

在正式进入硬核内容前，我们先聊聊现状。

## 痛点背景：只会“纸上谈兵”的AI

我们平时用的ChatGPT，像是一个被关在小黑屋里的“超级大脑”。你问它问题，它用自然语言（纯文字）回答你。这种“纯文字”的思考方式存在三个致命缺点：

- **无法执行** ：文字是模糊的。AI说“我帮你把文件删了”，但实际上它只是“说”了这句话，并没有真正去执行。
- **无法验证** ：AI经常一本正经地胡说八道（幻觉）。在纯文字世界里，你很难立刻验证它的逻辑对不对。
- **记不住（无状态）** ：如果你让AI做一个长达一周的复杂任务，它聊着聊着就忘了前面的上下文。

## 论文的解决方案：给AI穿上“代码机甲”（Harness）

科学家们发现，要想让AI从“聊天机器”进化成能帮你打工的“数字员工（Agent）”，中间必须隔着一层东西。这层东西不仅能限制AI不要乱来，还能给AI提供工具、记忆和反馈。论文把这层东西叫做 **Harness（安全带/工作台/底座）** 。

而这篇论文的核心论点是： **构建这个工作台最好的材料，就是“代码”！**

为什么是代码？因为代码具备三个魔法属性：

- **可执行（Executable）** ：代码是可以跑的。AI写一段Python脚本去点击鼠标，这就变成了真实的行动。
- **可检查（Inspectable）** ：代码运行后有日志、有报错（Bug）。AI可以通过看报错信息，知道自己哪里做错了，然后自我修正。
- **有状态（Stateful）** ：代码和文档是可以保存在硬盘上的。AI今天做了一半的工作，存成代码文件，明天读取后可以接着干。

所以，这篇论文彻底改变了我们的观念： **以前我们以为AI是“程序员”，代码是它写出来的“软件”；现在的真相是，AI是“灵魂”，代码是它的“肉身”和它所生存的“物理法则”。**

## 三、 核心方法与原理：AI的“代码机甲”是如何运转的？

为了系统地解释“代码即工作台”，论文把这套系统拆解成了三个环环相扣的层次： **接口层、机制层、扩展层** 。我们一层层来扒开看。

## 第一层：接口层 —— AI如何感知和干涉世界？

这一层讲的是，代码如何充当AI与现实世界沟通的“感官”和“手脚”。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 1\. 用代码来“思考”（Code for Reasoning）

以前，AI遇到数学题，会在脑子里用文字一步步推导（这叫思维链 CoT），结果算到最后往往加减法算错。

现在，我们让AI使用“程序思考（PoT）”：AI只负责理清逻辑，然后写一段Python代码。让电脑里的Python解释器去运行这段代码得出答案。

*大白话比喻* ：以前AI是心算，现在AI是拿起了一个超级计算器。这不仅大大减少了错误，还可以通过代码执行的反馈，让AI验证自己的思路对不对。

### 2\. 用代码来“行动”（Code for Acting）

如果我想让AI控制一个机械臂去拿杯子，或者让AI操作我的电脑帮你点外卖，怎么做？

AI不能直接长出手脚，它的做法是生成一串“代码策略（Policy）”。比如，生成一段带条件判断的Python代码： `if 看到杯子: 机械臂.移动(坐标) else: 机械臂.寻找()` 。

*大白话比喻* ：代码就是AI控制物理世界和数字世界的“方向盘”。不管你是机器人、还是浏览器，只要提供了代码API接口，AI就能像人类操作机器一样控制它们。

### 3\. 用代码来“建模世界”（Code for Environment Modeling）

当AI在做一个复杂任务时，它怎么知道现在的状况？论文指出，环境本身也可以被表示为代码。比如，把电脑屏幕上的网页，转化成一段HTML代码结构树喂给AI；或者在进行科学实验时，把实验步骤写成一套模拟器代码。

*大白话比喻* ：这就像电影《黑客帝国》里的“母体（Matrix）”。真实世界太复杂AI看不懂，那就把世界变成一行行“绿色跳动的代码”，AI只要读代码，就知道世界发生了什么。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 第二层：机制层 —— AI如何完成长线复杂的任务？

如果只是一问一答，那还是简单的机器。要想让AI独立工作几天几夜不出错，就需要这层“机制层”的设计。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 1\. 规划机制（Planning）：用代码做任务拆解

当面对“帮我开发一个贪吃蛇游戏”这种大任务时，AI不能上来就瞎写。它必须先写一个计划。现在的AI不再是口头说说，而是会生成结构化的计划图（比如生成一个计划代码本：Plan.md），里面规定了先写哪个文件、再调哪个接口。

而且如果半路走不通了，AI还会去修改这个计划代码。这就是规划。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 2\. 记忆与上下文工程（Memory and Context）

这是AI的“脑容量”管理。由于AI能一次性阅读的字数有限（上下文窗口限制），当它在几十万行的企业级代码库里工作时，它会怎么做？

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
- **工作记忆（短期）** ：把当前报错的信息、刚刚改过的那几行代码放在眼前。
- **语义记忆（中期）** ：去整个代码库里搜索，“哎？别人写的那个登录接口在哪？哦，找到了，提取出来给我看”。
- **经验记忆（长期）** ：把以前踩过的坑、解决过的问题，写成一段“经验代码”存下来，下次遇到类似的直接抄作业。

*大白话比喻* ：就像老程序员桌上的便利贴（工作记忆）、电脑里的本地搜索工具（语义记忆）以及自己攒了十年的代码库（经验记忆）。

### 3\. 工具使用（Tool Use）

AI在这个工作台里，不是光着手的，它装备了“瑞士军刀”。它可以通过代码调用各种工具：比如去查维基百科、使用计算器、运行杀毒软件、甚至调用另一个小模型来帮忙。

现在的研究趋势是把工具的使用权限管理得死死的，放在“沙盒（Sandbox）”里运行。AI想用工具，必须经过工作台的审批，不能让它把系统搞崩溃。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 4\. 控制循环：计划-执行-验证（PEV Loop）

这是AI自我进化的核心引擎。

- **Plan（计划）** ：AI先想好怎么改。
- **Execute（执行）** ：AI写出代码，并在安全的沙盒环境里运行。
- **Verify（验证）** ：这是最关键的！工作台会用编译器、测试用例（Test cases）去检查AI的代码跑通了没。如果报错了，把报错信息（红色的一堆英文字母）扔回给AI，AI看了说：“哦，原来我少引了一个包”，然后重新修改。

*大白话比喻* ：这就好比AI不仅自己写作业，还能自己当老师批改作业，哪里打了个大红叉，它就拿回去重做，直到满分为止。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 5\. 工作台的自我进化（Harness Optimization）

工作台还可以通过收集AI平时的操作日志（比如AI老是在某一个接口上报错），自动调整安全规则或提示词，让工作台变得更好用。也就是“用AI来优化AI的办公桌”。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 第三层：扩展层 —— 多个AI如何组建“赛博开发团队”？（Multi-Agent）

一个AI精力有限，那能不能搞一堆AI来开公司？这就涉及到了多智能体协作（Multi-Agent Systems, MAS）。

在这篇论文看来， **多个AI之间最高效的沟通方式不是“聊天”，而是“共享代码状态”。**

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 1\. 职能分工（Role Specialization）

在这个赛博团队里，会有：

- **规划师（Planner）** ：负责把大需求拆解成一个个小任务单。
- **程序员（Coder）** ：专门负责敲代码。
- **测试员（Tester）** ：负责写测试脚本刁难程序员。
- **审查员（Reviewer）** ：像经理一样，看程序员的代码是否符合规范。

### 2\. 基于代码的沟通与博弈（Interaction Modes）

他们怎么协作呢？

如果只是你一言我一语地聊天，很快就会聊岔劈。所以论文指出，他们必须对着 **“共享的代码库（Shared Harness Substrate）”** 工作。

- **批评与修复（Critique and repair）** ：程序员写完代码提交，测试员跑出Bug，把Bug报告拍给程序员，程序员重写。
- **对抗性验证（Adversarial validation）** ：专门搞个黑客AI，拼命想办法攻击程序员AI写的代码，以此来提升代码的安全性。
- **辩论（Debate）** ：遇到代码规范争议，几个AI互相讲道理，最后综合出一个最优解。

### 3\. 工作流拓扑（Workflow Topology）

这些AI团队有不同的阵型：

- **流水线（瀑布流）** ：A写完给B，B测完给C（如著名的ChatDev）。
- **循环（敏捷开发）** ：A写完给B测，B测出Bug打回给A，无限循环直到没Bug。
- **星型/树状架构** ：一个CEO AI 派发任务给底下10个员工 AI 同时并行写代码，写完后再合并起来。

*大白话比喻* ：这完全就是一个不休不眠的软件外包公司。而它们之间所有的工作交接，全都是通过“可运行的代码和测试日志”来完成的，这保证了它们的工作是脚踏实地、不会跑偏的。

## 四、 创新价值与未来应用：这套系统能干什么？

这篇论文不仅仅是理论探讨，它总结了“代码工作台”目前正在疯狂颠覆的五大真实场景：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 1\. 超级代码助手（Code Assistants）

这不是以前那种帮你补全一行代码的工具（如早期的Copilot），而是像 **Devin、SWE-agent、Claude Code** 这种自主软件工程师。

你可以直接丢给它一个GitHub上的开源项目Bug说：“兄弟，帮我把这个Bug修了”。它会自己拉取代码、阅读文档、自己尝试修改、自己在后台跑测试、测试通过后自动提交合并请求（PR）。这已经能在真实的企业开发中干活了。

### 2\. 电脑/手机操作系统代理（GUI/OS Agents）

想象一下，你对电脑说：“帮我上网买一张明天下午去北京的高铁票，挑最便宜的买”。

AI会将电脑屏幕上的按钮、窗口转化成它能看懂的“代码树（DOM树或无障碍接口树）”，然后它会生成操作代码，控制鼠标和键盘去打开浏览器、输入文字、点击购买。最近Anthropic发布的“Claude Computer Use（计算机控制）”就是这个概念的完美落地。

### 3\. 自动驾驶与机器人（Embodied Agents）

在真实世界中，机器人动作错了可能会砸坏东西。通过代码工作台，大模型可以把“帮我倒杯水”的指令，翻译成具有严格边界限制的控制代码（比如限制机械臂的最大力度）。更牛的是，机器人在试错中学会的动作，可以写成“技能代码库”存下来。下一次它不仅会拿水杯，还能用同样的技能去拿苹果。

### 4\. 科学发现的“赛博实验室”（Scientific Discovery）

这也是极其震撼的应用！AI科学家（如 **AI Scientist** ）可以通过代码，把提出假设、设计实验、进行实验、数据分析甚至写论文的整个过程全包了！

比如在化学领域，AI提出一种新材料配方，然后它写一段控制脚本，通过网络发送给真实的“自动化无人实验室（机器手臂混合化学试剂）”，实验室把结果传回来，AI看了数据再调整配方。 **科学实验变成了一行行可执行、可重现的代码！**

### 5\. 个人定制化推荐（Agent Personalization）

未来的推荐系统不再是黑盒子的算法。AI可以把你（用户）的喜好，写成清晰的结构化代码日志（比如： `用户不喜欢看长视频` ）。你可以随时查看、修改这些“记忆代码”，AI也会通过这种可视化的工作台为你提供绝对贴心的、受你控制的服务。

## 五、 面临的挑战：未来还有哪些坑要填？

尽管“代码即工作台”描绘的未来非常性感，但作者也极其客观地指出了目前存在的几座大山（这部分对从业者极具启发）：

## 评估的灾难（Evaluation）

1. 以前评估AI，只要看它回答得对不对。现在AI在沙盒里上蹿下跳、用工具、改文件，怎么评估它好不好？有时它代码跑通了，其实是因为测试用例写得太水（作弊）。我们需要全新的评估体系。

## 执行反馈的盲区（Semantic Verification）

1. 代码没报错（绿灯），就代表对了吗？不一定。有时候代码能跑通，但逻辑完全违背了人的意愿。AI很容易陷入“为了让测试通过而瞎改代码”的陷阱。我们需要更高级的验证器。

## 安全与人类掌控（Safety & HITL）

1. 如果AI拥有了操作电脑、操作数据库甚至操作现实机器人的权限，它不小心（或被黑客诱导）写了一段删除整个数据库的代码怎么办？工作台必须设计严格的“权限分级”和“人类审批（Human-in-the-loop）”机制。低危操作让它自己干，高危操作必须弹窗让人类老板按“确认”键。

## 多AI协作的冲突（Conflict Resolution）

1. 当多个AI同时在一个代码库里改代码时，A改了东边，B改了西边，结果合并的时候整个系统崩溃了。如何像人类程序员一样优雅地解决代码冲突？目前依然是个难题。

## 六、 总结

我们来做一个总结。

在过去的几年里，我们惊叹于大语言模型（LLM）能写出优美的文章和诗歌。但在严肃的商业、科学和工程领域，纯粹的“文字聊天”充满幻觉，是靠不住的。

《Code as Agent Harness》这篇论文高屋建瓴地指出了一条通往“可靠、自主通用人工智能（AGI）”的必由之路： **将代码确立为智能体系统的基础设施。**

- **对AI来说** ，代码是它的手和眼，让它的思考变得严谨（可验证），让它的动作落到实处（可执行），让它的记忆不再消散（有状态）。
- **对人类来说** ，代码构成了我们控制、约束和审查AI的安全绳（工作台）。我们通过给AI提供沙盒、测试工具、权限网关，确保这个强大的“数字员工”在一个安全、可控的环境里为我们打工。

未来的AI不再仅仅是和你聊天的“赛博幽灵”，而是穿着代码机甲、拿着工具箱、熟练使用各种软件和机械设备的 **超级自动化操作员** 。

正如这篇论文所指出的，智能体的未来，是一场关于“工作台工程（Harness Engineering）”的科学。懂得了这个道理，你就看懂了未来5年AI应用爆发的最核心逻辑！

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**微信扫一扫赞赏作者**

大模型前沿论文分享-Harness篇 · 目录

继续滑动看下一个

Tommy学习录

向上滑动看下一个