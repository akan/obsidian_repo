---
title: "物理AI撞上的50年CAD几何危墙，有人用SDF重铸了"
source: "https://mp.weixin.qq.com/s/Q58HnMhPE_OiBtCN1d_zlw"
author:
  - "[[三大杯橙汁]]"
published:
created: 2026-05-21
description: "所有Physics AI都撞上了B-Rep这堵50年的几何危墙—AI再聪明，如果几何一碰就崩，何谈智能？nTop用SDF隐式建模重铸了一个\x26quot;碰不坏\x26quot;的几何层，让“设计-仿真-优化”从数周压缩到分钟级。它赌的是：谁掌握这个几何层，谁就掌握AI工程时代的地基。"
tags:
  - "物理AI"
  - "CAD几何危墙"
  - "SDF隐式建模"
  - "nTop"
  - "工程软件"
abstract: "nTop用SDF隐式建模打造永不崩溃的几何内核，为物理AI提供可靠底座，将设计仿真优化从数周压缩到分钟级。"
---
三大杯橙汁 *2026年5月14日 15:32*

## 2026年4月，美国加州，一场别开生面的工程软件峰会如期召开。参会的不是写代码的程序员，而是搞仿真的、做物理AI的、做高超音速飞行器的、造燃气轮机的......

他们来自不同的领域，有的还是相互较劲的对手。

把他们凑在一起的主办方叫 **nTop** ，一家2015年成立于纽约的工程软件公司。

**一家软件公司，靠什么让这些公司坐下来聊天？** nTop 官方博客上的一句话，点破了大家心照不宣的事实：

> Every AI workflow in engineering eventually requires a model. None of that is possible if the geometry breaks

**所有工程AI工作流，最终都会撞上同一堵墙——几何** 。AI再聪明，也得基于几何来理解和操作物理世界。它得先能让几何不崩溃，才有资格谈"智能"。 **今天我们常用的几何内核，没有那么坚强** ，碰一下可能就塌了。

而这堵墙，是50年前就埋下的。

---

## 一、50年的危墙

CATIA、NX、SolidWorks，几乎全世界的工程师都在用。它们的核心技术叫 **B-Rep（边界表示法）** ——用“ **面、边、顶点** ”定义几何。

B-Rep建模就像用 **乐高拼积木** ：精准记清每一块积木的位置和拼接关系，如果不小心动了关键的一块，整个积木都有坍塌的风险。

![B-Rep数据结构](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

B-Rep数据结构

想把模型的圆角半径从5mm改到10mm？相邻面不再相交，拓扑关系断裂，需要重新处理。

想搭一个拳头大小的晶格支架，内部有几十万个面，上百万个顶点和边——数据太大，电脑大概率死机。

更不用提布尔运算了，B-Rep做"A减B"，要算交线、分内外、重建边界。简单形状没问题，复杂形状处理起来很费劲，一步错全盘崩。

所以 **随手保存** 已经是工程师的肌肉记忆了，不然大半天的辛勤劳作可能就瞬间泡汤了。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

工程师手动操作的时候都得提心吊胆，AI就更别想了——AI要做的不是小心翼翼地点按钮，而是大规模、自动化地修改和迭代几何。在B-Rep这堵摇摇晃晃的危墙上，怎么敢让AI大刀阔斧地改模型？

**问题的本质：不是AI不够聪明，而是B-Rep这堵墙本身就不结实，经不起AI折腾。**

---

## 二、SDF隐式建模：AI折腾不坏的几何

nTop创始人 **Bradley Rothenberg** 早年做火箭发动机设计时就被B-Rep"深深伤害"过，为了解决这个老大难问题，他在纽约创办了 **nTopology** ，2022年品牌简化为 **nTop** 。

> **nTopology** ：n=any（全能拓扑）或 n=no（颠覆传统）。

团队里聚了一批几何建模和航空航天背景的工程师。他们的武器是： **SDF隐式建模** 。

SDF不需要记忆那么多的拼接信息，而是用 **函数** 描述三维空间——像一个空间距离探测器：正数=在零件外面，负数=在里面，零=刚好在表面上。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

有了SDF，修改模型不再是"小心翼翼"的难事儿，复杂建模也可以手到擒来：

**想做模型的偏移？** 把距离场整体"推"出去一段距离——s\_new = s\_old - r。

偏移前：s\_old = 0 的点，偏移后 s\_new = -r ＜ 0，变成内部；

偏移前：s\_old = r 的点（原来在表面外r处），偏移后 s\_new = 0，变成新表面。

**想做布尔运算？** 直接对函数取最小值 — min(s\_A, s\_B)，再复杂的模型也不怕。

没有交线，没有修剪，没有拓扑重建，模型自然不会崩溃。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

SDF就是AI"碰不坏"的几何——不管AI怎么改、怎么迭代、怎么组合， **函数运算永远合法，永远不会崩溃** 。

当然，SDF并非nTop的发明，但nTop做了一件关键的事——把这套数学理论 **工程化** 了。以前大家用SDF做渲染和动画，不管能不能仿真、能不能制造。nTop让工程师直接操控SDF，精确控制每一个制造细节。

经过多年工程化打磨后，nTop甚至说了句霸气十足的话： **"Design operations in nTop Platform never fail."**

AI要的正是这种" **never fail** "的几何墙。

---

## 三、never fail之后：从数周到分钟的优化设计

有了"碰不坏"的几何墙，能做什么？

**nTop** 和 **Luminary Cloud** 联合做了一场演示，给出了一份让人眼前一亮的答案——把" **设计-仿真-优化** "循环从数周压缩到了分钟级。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

nTop用隐式建模创建了一个参数化飞行器模型。因为nTop "never fail"的隐式建模，工程师可以大胆地改参数——翼展、后掠角、翼型厚度……几百个设计模型轻松生成。

这在B-Rep世界里几乎不可想象。稍不留神可能就崩了，谁敢一次生成几百个？

数百个设计模型传入Luminary的GPU原生求解器，进行快速求解并生成标准化的AI训练数据。

![nTop模型计算结果-Luminary](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

nTop模型计算结果-Luminary

NVIDIA的DoMINO模型吞下这些数据，用8块A100训练14小时。训练完成之后， **给定一个新的飞行器外形，DoMINO能在3分钟内推断出完整的流场（原来需要1.5h）** ，与CFD结果的误差小于5%。

nTop的"never fail"几何层，是整个链条的底座——几何不崩，CFD计算、AI训练、优化迭代才能流畅运行。对工程师来说，这意味着在项目最宝贵的早期阶段，当别人还在修模型、等网格的时候，你已经跑完了一整轮方案探索，找到了最优方向。

---

## 四、nTop赌的是什么

回到文章开头： **一家软件公司，靠什么让这些公司坐下来聊天？**

因为大家都撞上了同一堵50年的危墙，这堵墙撑不住AI的新楼，而nTop帮他们重新建了一堵更结实的墙。

nTop 对自身的定位很清晰： **要做几何与物理的容器化、无图形界面的基础设施** 。

" **容器化** "意味着几何内核像集装箱一样嵌入任何流程。" **无图形界面** "意味着API驱动，程序直接调用。说白了，nTop 正在把自己从一款设计软件，变成一个其他系统都可以依赖的" **几何操作系统** "。

有人管这叫"AI工程时代的几何安卓"——安卓不做App，但让所有App都能在手机上跑。nTop 的核心不是训练AI模型，而是让所有物理AI都能在一个"碰不坏"的几何层上可靠运转。

nTop赌的是：未来所有Physics AI，都需要一个"碰不坏"的几何层。而谁掌握了这一层，谁就掌握了 AI 工程时代的地基。

继续滑动看下一个

PhysicsAI

向上滑动看下一个