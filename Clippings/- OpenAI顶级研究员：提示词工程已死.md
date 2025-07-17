---
title: "OpenAI顶级研究员：提示词工程已死"
source: "https://mp.weixin.qq.com/s/18J-wZg5H3n_AJIdZsqRtQ"
author:
  - "[[腾讯科技]]"
published:
created: 2025-07-17
description:
tags:
  - "提示词工程"
  - "规范化编程"
  - "上下文工程"
abstract: "OpenAI顶级研究员认为提示词工程已过时，提出规范化编程作为未来发展方向。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/ow6przZuPIHnZUjhov3Ddz0Z4kziaEb7MGj47WczalcLYYrKq8XkrJNyMGceWrxWNibGKccuFiaViaiaPzGxZ8V5BrA/0?wx_fmt=jpeg)

腾讯科技 [腾讯科技](https://mp.weixin.qq.com/s/) *2025年07月15日 18:13*

### 目前，硅谷正经历一场关于AI开发范式的激烈辩论。继AI大神安德烈・卡帕西（Andrej Karpathy）力推“上下文工程”（context engineering）、宣告提示词工程（prompt engineering）过时之后，OpenAI顶级对齐研究员肖恩・格罗夫（Sean Grove）也提出了相同的观点：提示词工程确实过时了，但他指出了新的观点：未来应当属于“规范化编程”（spec-writing）。规范化编程（spec-writing）是一个涉及编写、定义和记录系统需求、功能、行为规范的过程，其目的是确保开发团队、利益相关方和机器能够清楚地理解系统的目标和方向。作为OpenAI核心研究团队的重要成员，格罗夫在人工智能安全和模型对齐领域造诣深厚。他目前正组建OpenAI新的智能体鲁棒性团队，直接参与通用人工智能的安全演化工作。在近日的一次技术演讲中，这位业界专家提出了与卡帕西不同的发展方向。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/ow6przZuPIFNmictFHYdncDXcq2icHxwTK56dgibfgrWYob2quE8oGtLxx75S8uw6wlJmuVUo870E4Ya3DraUcZaQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

### 两条路径，一个共识：提示词工程的末日

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/ow6przZuPIHnZUjhov3Ddz0Z4kziaEb7MDia57KdH9NdqsVWK9UibqU1f9WBibaqDTQzVkHcfUWJ0VWEgfgtLG43uQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

格罗夫阐述规范化编程的优点

  

当前正值AI智能体的爆发期，OpenAI总裁格雷格・布罗克曼（Greg Brockman）多次表示 “2025年是AI智能体的元年”。在此背景下，传统的提示词工程因“一次性”和缺乏系统性的缺陷，已被广泛认为走到了尽头。卡帕西与格罗夫两位专家对此达成共识，但提出了截然不同的解决方案： **卡帕西的上下文工程与格罗夫的规范化编程，分别代表了“输入优化”与“意图澄清”两种路径** 。

卡帕西将上下文工程称为“一门精深的科学，也是一门巧妙的艺术”，认为它是工业级大语言模型应用的正确方向。

他指出：“大多数AI智能体的失败，不是模型能力的不足，而是上下文的失败。” 其核心在于“在恰当时机、以恰当格式提供恰当信息”，涵盖指令、用户输入、状态历史、长期记忆、检索信息、可用工具和结构化输出等全方位信息。

**卡帕西强调“长期记忆”的重要性，主张通过动态管理历史交互数据确保模型行为符合预期** 。他认为未来程序员需成为“信息架构师”，并批评将工业级应用简单视为“ChatGPT套壳”的观点。

格罗夫则提出更为激进的“规范化编程”理念，认为 **提示词工程和上下文工程的共同缺陷是：人类花费大量精力优化与AI的交互，却从未真正说清自己想要什么。他主张通过结构化规范文档明确开发意图和价值判断，使其成为比代码更重要的“源代码”。**

“你以为你告诉了模型你想要什么，但后来你才发现，你从来没真正说清楚过——甚至你自己都不完全明白真正想要的是什么，”格罗夫说，“就像盖房子前只跟建筑师说‘我要一个漂亮的房子’，却没说清细节，最后抱怨‘这不是我想要的’，问题根源在自己没画好蓝图。” 他进一步解释：“提示词工程像教你礼貌沟通，上下文工程像整理建筑材料，但如果连‘要什么样的房子’都没搞懂，再礼貌的语气、再全的材料也建不出想要的家。”

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/ow6przZuPIHnZUjhov3Ddz0Z4kziaEb7M1k6GXVYE9PWvTvMhzX1vFgoWCibBTyIVvndnyrxOCbFtJV8miablPqXw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

代码只占工作价值的10%到20%，另外80%到90%体现在结构化沟通中

格罗夫强调：“代码只占工作价值的10%到20%，另外80%到90%体现在结构化沟通中。规范是人类的指南针，确保每一步都知道‘为什么要做这个’。” 他以OpenAI的Model Spec为例，这份开源Markdown文档用自然语言表达模型的价值观和行为准则，可通过“审慎对齐”（deliberative alignment）技术嵌入模型训练，使意图成为模型的“内在记忆”。格罗夫将规范比喻为“源码”，认为代码只是其“有损投影”，并设想未来IDE将转变为“集成意图澄清器”，助力意图澄清与协作。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 两种方法的本质区别

总结来说，两位专家虽然都反对传统提示词工程，但解决方案思路迥异：

卡帕西的上下文工程专注于“如何更好地与AI沟通”，认为智能体失败源于“上下文的失败”——无法在恰当时机、以恰当格式提供恰当信息。其核心是 **系统化收集、组织和传递信息，通过优化输入提升AI表现** ，强调 “长期记忆”对动态管理历史数据的作用。这是“输入优化”思路：假设目标明确，关键是高效传达。

格罗夫的“规范化编程”则聚焦“如何明确我们真正想要什么”，认为 **AI开发的问题源于人类对自身目标的模糊认知。**

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

介绍OpenAI Model Spec

“粗糙演示与惊艳智能体的根本区别，在于是否明确成功的定义，”他说。其核心是通过 **结构化规范文档** （如 Model Spec）清晰表达意图和价值观，并利用“审慎对齐”技术将规范嵌入模型训练，使意图成为“内在记忆”。这是“意图澄清”思路：与AI沟通前，人类需先明确目标并以可版本化、可测试的形式记录。

简言之， **卡帕西关注“怎么做”（优化输入实现已知目标），格罗夫关注“做什么”（通过规范明确意图本身）。格罗夫指出：“规范是代码的‘源码’，代码只是其有损投影，真正价值在于清晰表达的意图** 。”

尽管侧重点不同，两人都认同提示词工程的局限性，预见程序员角色向 “意图设计者” 转变：卡帕西要求程序员成为 “信息架构师”，格罗夫则认为未来稀缺技能是 “编写完整表达意图与价值的规范的能力”。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### OpenAI内部实践：

### Model Spec的成功验证

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

格罗夫认为AI工程中一切都可以视为规格

格罗夫深度参与设计的OpenAI Model Spec（指其模型在API和ChatGPT中的行为方式，涵盖了模型行为的设计原则、规则和默认行为，并强调了根据人类反馈进行持续改进），是规范化编程的典型案例。开源的Model Spec以自然语言系统化表达了OpenAI对AI模型在价值观、行为准则和伦理约束方面的期望，为开发者、用户和AI系统提供透明参考框架。

格罗夫团队开发的“审慎对齐”技术，为规范化编程注入实践能力：将Model Spec 中的规范直接转化为模型训练和评估的约束条件，通过“规范驱动微调”将抽象意图和价值观“编码”进模型参数，显著提升运行效率和行为稳定性。

“传统对齐依赖大量数据标注和后期修正，效率低且难保证一致性，” 格罗夫解释，“通过审慎对齐，规范成为训练原材料，让每条准则都被翻译成模型可理解的优化目标，使对齐更可控，行为更可预测。” 他举例：Model Spec中的准则，例如“面对敏感问题保持中立尊重”，通过该技术转化为可量化损失函数嵌入训练，模型生成回答时会主动避免偏见，无需额外后处理。

这项突破为规范化编程提供实证支持。格罗夫强调，其核心是“从混乱到秩序”，通过结构化表达人类意图并应用于AI开发，既提高效率，又为伦理治理提供新可能。“未来，所有AI系统或能基于通用、公开的规范标准开发评估，这将极大增强AI的可信度和透明度。”

尽管两位专家的路径不同，但都捕捉到时代转折点。犹如格罗夫说：“我们正在见证一个新时代的开始，我们的目标是让人类与AI协作更高效、安全。我和卡帕西的观点没有对错之分，而是一场共同的探索”。 **（文/腾讯科技特约编译 无忌 编辑/海伦）**

| ![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) AI能量站汇集AI应用实践的基础科普与教程，覆盖全球热门公司、顶尖科学家、研究员以及市场机构输出的人工智能的基础理论、技术研究、价值对齐理论和产业发展报告，以及全球的AI监管政策。帮助AI小白入门，替进阶选手跟踪最新的AI知识。 |
| --- |

**推荐阅读**

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

[![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=Mjc1NjM3MjY2MA==&mid=2691559155&idx=1&sn=33d3bd3cf49e825023bc9f334523b18f&scene=21#wechat_redirect) 一文读懂Grok 4，吹响下一代AI战争号角

继续滑动看下一个

腾讯科技

向上滑动看下一个