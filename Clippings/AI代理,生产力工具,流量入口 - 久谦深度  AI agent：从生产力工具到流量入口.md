---
title: 久谦深度 | AI agent：从生产力工具到流量入口
source: https://mp.weixin.qq.com/s/bCaBZw5idW0DmIBbyPtUJg
author:
  - "[[久谦资本研究团队]]"
published: 
created: 2025-07-04
description: 我们测试了6款头部AI agent，谁能颠覆传统工作方式？
tags:
  - AI代理
  - 生产力工具
  - 流量入口
  - manus
  - genpark
  - flowith-neo
  - 扣子空间
  - rabbit
  - 秘塔
abstract: 久谦资本研究团队通过测试6款头部AI代理产品，分析了PC端和移动端AI代理的技术壁垒、应用场景及未来竞争点，探讨了AI代理如何从生产力工具发展为流量入口。
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/Dqn2iadmTic3UygQ6yYk5L08YlW1sib5npuSRlwM0MGMvb8kiayP0iatKfSonEn6HsM05zZsl142aSVMPONgHSsMXSA/0?wx_fmt=jpeg)

Original 久谦资本研究团队 [久谦资本](https://mp.weixin.qq.com/s/) *2025年06月20日 20:10*

2025年初代AI agent产品的推出标志着AI迎来level 3智能时代，随后各类agent产品如雨后春笋般出现，到底这些agent产品的共性和特性有哪些？在AI agent的浪潮里，99%的agent产品注定失败，到底什么样的产品才能成为大浪淘沙之后的金子？来跟我们一起探寻：

  

本报告将系统回答AI agent投资中的四个核心问题：

1）AI agent是什么？真正的技术壁垒在哪里？

2）PC端AI agent：我们如何通过40+真实场景测试，对6款主流产品进行客观评估？

3）移动端AI agent：移动端AI agent哪些场景最先被颠覆？为什么说现在是第三方AI agent创造新平台的最佳窗口期？什么类型的团队更有可能在AI agent赛道胜出？

  

让我们开始这场深度解剖之旅：

  

以下是核心观点

![Image](https://mmbiz.qpic.cn/mmbiz_png/Dqn2iadmTic3UygQ6yYk5L08YlW1sib5npuEQNAIWrJDMFcVQEicG1wabVm40UF4NXvZbxXmQGY2d1GZZLwqfQtqFQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1) ![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

**Part1. AI agent行业概览**

  

AI智能可以分为5个Level ，Level 1是以Chatbot为代表的基础对话阶段，Level 5是组织（Organization）阶段，AI将以多智能体协作形式构成“虚拟组织”，具备分工、协调、反馈、持续改进等能力，是通往AGI的远期愿景

2025年初代Agent Manus将我们带到了Level 3阶段，将推理与行动形成闭环，是能理解目标、规划步骤、调用工具、并自主执行复杂任务（如撰写报告）的“自主行动者”

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

AI agent是一种能够自主感知环境、处理信息、执行任务并与用户或其他系统进行交互的智能系统，本质上是一个复杂的系统性工程。相较于LLM，突出的优势是可以调用更多工具实现更复杂的任务，agent由四大核心模块组成：

1. 任务规划（Planning），指基于用户Prompt及Context，进行任务的步骤拆分
2. 工具调用（Tools），在拆分任务后，通过调用网页浏览、外部API、coding等各类工具，赋予Agent扩展能力
3. 任务执行（Action），将规划转化为实际操作的过程，举例如将工具召回的内容进行整理并输出
4. 记忆管理（Memory），涵盖短期记忆（如对话上下文窗口），长期记忆（如外挂的知识库），个性化记忆（如用户偏好）

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

进一步拆开四大模块，由多个核心组件组成，短期内AI agent产品需要实现全技术栈无短板，才能交付完整的用户体验，任何一个环节的薄弱都会直接影响产出结果的完整性。长期看，核心壁垒在于生态的丰富度以捕获更丰富的下游场景、积累用户数据使得产品更懂用户以得出更准确的结果

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

根据 **应用载体与交互方式** 的不同，AI agent可划分为PC端与移动端两大类：

**PC端AI agent** 主要应用于个人生产力&办公类场景，以处理文本数据、结构化数据为主，核心价值在于提升信息处理效率与内容生成能力

**移动端AI agent** 则更侧重面向个人用户的日常生活与娱乐场景，更强调自然语言交互、处理实时多模态信息，降低用户和AI的交互门槛，并提升服务的匹配效率

移动端AI agent的用户基数量更大、交互频次更高，更有机会收取广告费（而不是PC端的订阅费），未来想象空间大

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**接下来我们进一步打开PC端和移动端的AI agent**

  

**Part2. PC端AI agent**

  

**在PC端我们设计了一些测试题目，对现有市面上讨论度高的几款AI agent进行评估判断及比较，以理解目前各家的实际进展**

我们收集了40+道PC端AI agent的测试题，测试题由用户调研的真实反馈得出，并将测试题分为以下五大场景：市场与商业情报/ 营销与销售管理/ 行政与运营自动化/ 内容创作/ 生活服务

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

本轮测评覆盖的产品为Manus、Flowith NEO、Genspark、扣子空间、Rabbit OS与秘塔

其中， **Manus与Flowith NEO在四项能力中均处于领先水平，属于头部梯队** （但需注意的是，头部梯队的Manus也仅有一半的题目达到及格线）

**第1梯队**

**Manus： 具备较强的planning能力，在执行的时候不断反思并在执行出现问题的时候调整，最后任务效果较好；并且由于有虚拟机交互界面，用户可实时进行追踪，实时打断调整方向，对用户更友好**

**Flowith NEO： 主打无限画布界面，通过用token数量换质量的方式，可以使用无限的步骤对答案进行迭代和改进**

**第2梯队**

**Genspark： 比较少看到反思机制，一旦中途信息错漏等、难以调节思路；在可视化端也经常出现图片无法显示、图表重叠等问题；整体没有明显的短板，可以做到Manus的80%水平，需要时间提升工具的数量和质量**

**第3梯队**

**扣子空间： 各方面都再次于Genspark，任务实现效果一般，也经常出现工具调用失败的情况，工程化存在优化空间**

**Rabbit： 在使用固定模板输出时表现较好，比如市场调研类任务能生成信息维度较为丰富的市场分析报告；但Rabbit也缺乏反思能力和错误修正机制，调用工具的失败率也较高、格式错乱，经常出现任务崩溃的情况**

**第4梯队**

**秘塔： 更像是deep research工具，使用的是DeepSeek R1模型，且由于工具积累过少：没有文件处理能力，也没有画图的能力，仅能完成最简单的任务，为agent的初级形态**

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

分任务类型来看，Manus与Flowith NEO在所有五类任务中得分均高于平均水平，表现出较高的稳定性

此外，生活服务类任务是所有产品表现得最差、平均分最低的一类，由于这类任务更依赖实时信息抓取与外部平台协作能力，对工具使用能力要求更高，当前多数产品在工具调用方面做得并不是很好

**接下来我们挑选了一些比较有意思的问题，看看各家的表现**

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**市场与商业情报任务表现**

Flowith NEO是唯一成功完成所有任务的产品，具备每日聚合抓取能力，可持续主动获取最新新闻并推送至邮箱，表现出色，执行力强

其他产品均无法完成任务，主要问题出在：1）无法实现实时信息抓取，2）无法调用邮箱工具

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**营销与销售管理任务表现**

Flowith NEO成功生成一份英文官网，页面涵盖公司介绍、产品分类、联系方式等核心内容，理解2B营销逻辑，页面结构完整，内容详实

Genspark/ Rabbit OS同样也完成英文网站的搭建，但也出现大部分图片破损等不稳定现象

扣子空间和秘塔直接任务失败

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**行政与运营自动化任务表现**

Manus可完整读取PDF简历，解析关键信息，并基于JD生成明确评分体系，成功完成简历筛选任务，推荐结果可信，综合表现最佳

Flowith NEO/ Genspark紧随其后，支持文件上传并能提取简历内容，评估标准较为清晰，成功推荐优质简历，执行力紧随Manus

其他几家无法完成任务主要出于：1）PDF的内容提取能力，2）无法构建与JD紧密关联的评分体系

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**内容创作任务表现**

Manus和Genspark都成功生成游戏，点击反馈与得分机制的逻辑准确

其余产品：1）生成游戏时代码错误，无法加载，2）游戏机制理解错误，完全不可玩

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**生活服务任务表现**

各家都做得比较一般，主要是因为和淘宝、京东、拼多多等平台交互，但可能由于平台的反爬机制等权限限制，较难以正确给出相关链接（除了扣子空间）

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**Manus做得最好** ，可能由于：

1）团队有浏览器产品的开发经验，熟悉多类外部工具调用路径，积累了AI agent长链路任务所需要的工程能力

2）团队配备了工程技术能力、产品能力的合伙人，使得在用户UI交互、技术方面都表现较好

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**Flowith NEO：** 产品定义独特，采用多线程画布界面，主打“无限”步骤/上下文/工具，其核心逻辑是“以更多 token 换更高质量”，从而实现更深度的问题处理能力

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**Genspark：** 流程完整，没有明显短板，但也存在缺乏反思纠错机制与动态调整能力，导致复杂场景中错误累积的情况，这些都可以通过工程优化进行提升

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**扣子空间：** 依托字节生态优势，具备多文件处理与网页生成等高效协作能力，但因异常中断机制薄弱、执行稳定性不足，导致复杂任务交付率受限，也可以通过工具积累实现工程化提升

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**Rabbit：** 交互僵化（无法中途进行修正agent工作方向），交付质量不稳定，经常崩溃

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

秘塔之前是做写作猫、法律、市场研究场景，在research和文本方面有较深积累；但在工具使用层面并无积累，导致agent能力受限；产品使用更少token实现短平快任务，以提供免费的服务获取大量用户

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

以上是PC端AI agent测试及结果，AI agent并没有任何科学方面的难点，全都是工程化问题，各产品间有几个月的迭代时间差异，因此我们认为 **随着竞争进一步激烈，产品难以避免将走向同质化竞争**

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**因此长期竞争点有三部分：**

1）高效调用模型的同时压缩成本，通过性价比获取用户

2）个性化用户数据、交互记录将形成竞争壁垒，有利于提供更精准服务和深入用户理解；但PC端用户数据主要来源于网页端低频的严肃工作场景，与移动端相比，数据粒度低、情境弱、商业价值有限

3）工具调度系统完善与否，决定了AI agent是否能胜任多场景复杂需求

  

那么成本是否有进一步的压缩空间？

预计在不降低agent质量的情况下，未来1年可实现30-50%的token数降低；降低主要来自限制LLM的token用量，如减少内容召回数量、减少LLM迭代步骤等，属于工程上优化，考验性能与成本的平衡能力

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

**Part3. 移动端AI agent**

  

接下来我们看看移动端AI agent的下游场景在哪里？分别的空间有多大？

我们认为即使是新的AI agent也是满足人类现有的真实需求，因此我们将当前的移动互联网下游场景进行切分，右上角用户数量大、使用习惯重的场景为最核心的流量入口，如社交/ 短视频/ 资讯/ 社媒等场景

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

由于AI agent的核心价值创造是以简化交互为切入点，进一步提升匹配效率，因此我们从提升匹配效率角度看渗透路径，左下角需求决策因素单一、供给标准度更高的场景，AI话语权更强，可先部分取代原有路径、最开始进行渗透，随着用户数据积累和反馈优化，逐步向更复杂场景拓展

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

移动端AI agent机会判断

A）UI变化带来新硬件平台机会，AI硬件捕捉AI趋势、很有可能成为下一代的计算入口、或作为手机的补充

B）消费电子市场较分散，单一厂商整合各个硬件平台难，存在第三方AI agent创造新平台的窗口

C）即使是头部的手机厂商，也难以做好AI agent，留给第三方机会

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

A）这次AI升级带来了更便捷的UI交互升级，受益于算法的成熟，能完成更多复杂的任务，也带来了新硬件平台的机会

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

B）消费电子种类繁多、竞争格局分散，第三方AI agent有望通过系统性服务和整合软硬件能力，在设备生态中渗透：

1）非手机厂商占大部分市场，单一手机厂商无绝对性优势，难以整合生态

2）手机厂商之外的硬件厂商聚焦单一品类，普遍面临软件能力短板，难以构建稳定、跨设备的统一交互体系

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

C）即使是头部手机厂商，也难真正做好AI agent

苹果在1年前就宣布推出Apple Intelligence，但受限于自研模型能力弱、架构较为封闭、端云割裂，导致更新推迟、更新的功能不完善，且上线的功能也表现欠佳。目前的进度不算成功，未能实现真正的端侧智能

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**移动端AI agent机会的长期竞争点在哪里呢？**

由于交互信息和硬件载体更复杂，长期竞争点在于打造全新UI范式下的新用户体验、积累真实用户数据、打通跨APP和跨硬件形态的生态、良好的商业模式

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

相比PC端，移动端AI agent对极致用户体验和丰富App合作生态提出了更高要求，而目前无论是大模型厂商、PC端AI agent、手机厂商还是原生的移动端AI agent创业公司，都没有建立起压倒性的竞争优势，这为初创公司提供了可贵的创新土壤

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

AI Agent的进化将人机协作推向新高度。PC端agent测评显示，头部产品虽展现初步自主任务能力，但工程化短板仍制约场景落地，同质化竞争难以避免。真正的颠覆性机会在移动端——以自然交互重塑流量入口，用跨平台生态打破硬件边界。这场Agent革命的核心，终将回归对人类真实需求的深度满足。未来属于懂用户、降门槛、重体验的破局者。

*欢迎扫描二维码联系我们获取完整报告，交流行业观点*

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

***【更多内容，点击下方关注】***

*\* \* \**

*关于久谦资本成立于2009年，服务于关注新兴领域的企业与一线投资机构；我们相信科学与技术能够改变专业服务；希望带给市场多一分理性、少一分似是而非；我们认为与众不同的研究与分析，是我们荣誉的唯一来源。*

继续滑动看下一个

久谦资本

向上滑动看下一个