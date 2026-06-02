---
title: "还在给大模型套Harness？北大证明：最好的外挂是训练完立刻扔掉"
source: "https://mp.weixin.qq.com/s/HW518lQJH0gtTAmeI2O1Mg"
author:
  - "[[赛博雷达]]"
published:
created: 2026-06-02
description: "现在的AI推理圈有个怪象：模型本身不够稳，就给它套一层又一层的\x26quot;脚手架\x26quot;——草稿验证、计划求解、多Agent协"
tags:
  - "OPHSD"
  - "自蒸馏"
  - "推理脚手架"
  - "程序内化"
  - "性能提升"
abstract: "北大团队提出OPHSD方法，通过将推理脚手架的程序性结构蒸馏进模型参数，使模型在拆掉外挂后性能反超，甚至重新挂载时表现下降。"
---
赛博雷达 *2026年5月18日 10:36*

现在的AI推理圈有个怪象：模型本身不够稳，就给它套一层又一层的"脚手架"——草稿验证、计划求解、多Agent协作。这些harness确实能让成绩单好看，但代价是 **推理延迟翻倍、token成本暴涨、工程链路复杂** 。更尴尬的是，一旦拆掉这些外挂，模型立刻打回原形。

![Image](https://mmbiz.qpic.cn/mmbiz_png/E3ZvvAXyiaibkDclntWopA6I9WcAgviaIgh1icbAa1x5rZzWNCMfFLPqAick6fmm4qKwuYsia6DIRvauAwV0moH7c84gYDAJzhiahiaDoETOWjoRkYs/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

论文链接：https://arxiv.org/pdf/2605.08741

github链接：https://github.com/zzy1127/OPHSD-On-Policy-Harness-Self-Distillation

但就在最近，北大团队提出了一种叫 **OPHSD** 的方法，直接把脚手架的"思考方式"焊进模型权重里。训练时该用harness就用，推理时直接拆掉，Qwen3-8B在数学竞赛题上反而比挂着harness时更强。最反直觉的是， **训练完后再把harness装回去，性能居然不升反降** 。这到底是怎么回事？

---

**推理脚手架的悖论——越套越强，也越套越重**

大模型在推理、编程和Agent任务上表现不错，但一遇到需要 **证据积累、中间验证或长程规划** 的复杂问题，就容易翻车：漏看关键上下文、早期错误一路传导、错了也懒得改。于是业界祭出大招—— **inference-time harness** ，也就是给模型套一层外部脚手架，控制信息怎么存、怎么取、怎么改、怎么回传给模型。

听起来很美，实际上问题一堆。论文开篇就指出，这些harness确实能提升稳健性，但 **增益来自外部程序，而非模型本身** 。你套着harness考高分，拆掉harness立马现原形。更糟的是，harness带来额外的延迟、token开销和工程复杂度，还引入了检索失败、控制流出错等新故障模式。

现有的后训练方法也治不好这个病。SFT只会模仿静态演示，教不会模型调整推理程序；RL优化任务级奖励，但监督信号稀疏，根本指不清"哪一步程序行为"重要。至于现有的自蒸馏方法（OPSD、SDFT等），它们的privileged context全是 **静态变量** ——参考解、环境反馈、提示词（Table 1总结得清清楚楚）。而harness本质上是一个 **动态程序** ，会编排检索、中间调用和验证步骤。静态变量只能告诉你答案长什么样，但教不会你"怎么推导"。

**Table 1 注释：** 现有自蒸馏方法的privileged context均为静态变量，仅提供信息优势，无法传递harness动态程序的程序性推理结构。

---

**OPHSD核心——把"思考姿势"蒸馏进参数**

北大团队的解法叫 **On-Policy Harness Self-Distillation（OPHSD）** 。核心思想一句话： **让模型在harness里"做一遍题"，然后把这套做题姿势记下来，以后不挂harness也能照做。**

具体来说，训练时学生模型在harness中跑rollout，harness作为deterministic LLM program维护内部状态，反复查询模型、更新状态，最多T轮交互后输出最终答案。同时，一个冻结的教师模型（就是学生自己参数的初始副本）在harness生成的 **终端上下文** 下提供token级监督。学生模型通过 **反向KL散度** ，学习在无harness时复现这种程序性行为。

公式层面，OPHSD的损失函数长这样：

这里的关键是 **stop-gradient** ：harness编排由学生参数驱动，但logit监督锚定在稳定的教师模型上。这样既让推理轨迹随模型能力进化，又保证监督信号不漂移。论文特别强调，OPHSD能内化的是 **结构性推理先验** （如多步分解、自我验证），但无法伪造实时外部访问（如实时搜索）。

Figure 1：OPHSD通过反向KL目标，使学生模型匹配harness驱动下的教师分布，将程序性推理结构内化而非仅复制静态答案。

---

**文本分类实战——模型学会了"翻案卷宗"的本能**

为了验证通用性，论文先在 **在线文本分类** 上开刀，用的是 **draft-verify harness** 。这个harness的privileged input是在线记忆库——之前流式接收的已标注案例。流程分两步：draft阶段检索相似案例生成草稿预测；verify阶段用草稿去记忆库捞confirmers（同标签邻居）和challengers（异标签邻居），组装成完整提示做最终判断。

Table 2的结果相当硬核。Qwen3-8B裸跑LawBench只有55.29% F1，挂上harness涨到60.22%。但经过OPHSD蒸馏后， **裸模型直接飙到69.51%** ，不仅吊打GRPO（62.44%）和OPSD（64.25%），甚至 **超过了挂着harness的基线** 。USPTO上更夸张，OPHSD达到90.81%，比harness基线还高11.79个百分点。

Table 2：OPHSD在LawBench和USPTO上均超越GRPO与OPSD，训练中期即展现超越harness本身的独立推理能力。

Figure 2的训练曲线揭示了一个反直觉现象：随着训练推进，OPHSD的独立推理能力 **逐渐超越了harness本身** 。到训练后期，OPHSD+Harness反而比OPHSD单独低1.10%（LawBench）和7.19%（USPTO）。这说明harness已经被完全内化，重新挂载只会添乱。

Figrue 2：OPHSD在LawBench和USPTO上训练曲线显示，蒸馏后模型独立推理能力逐渐超越原始harness，重新挂载反而降分。

更深层的变化在Table 4。团队用GPT-4o当裁判，检测学生裸跑时是否自发产生"案例引用推理"。GRPO和OPSD全程不超过10%，而 **OPHSD在早期就冲到75%，后期稳定在90%以上** 。这意味着模型内化的不是记忆库里的具体案例，而是 **"查案卷-比对-定案"的程序结构** ——即使没有外部检索，它也会从参数记忆里调取类似先例做双向权衡。

**Table 4 ：** OPHSD训练后期案例引用率超90%，证明内化的是检索比对程序结构，而非记忆库具体内容。

---

**数学推理地震——HMMT25暴涨10.83%，脚手架反成累赘**

如果说文本分类是开胃菜，数学推理就是主战场。这里的harness叫 **plan-solve** ，privileged input是参考解本身。流程分两步：先让模型当planner，把参考解蒸馏成战略草图（关键推理步骤的精简大纲）；再让模型当solver，根据问题和草图执行完整代数推导。这跟OPSD直接把参考解塞给学生完全不同——OPHSD强迫学生 **内化推导的结构** ，而非背诵答案。

Table 3的harness基线已经够震撼：同一个Qwen3-8B，裸跑AIME24/AIME25/OlympiadBench/HMMT25平均只有25.64%，挂上plan-solve harness后直接飙到 **43.47%** ，平均提升 **17.83%** 。这说明harness确实能教模型"怎么拆题"。

Table 3：plan-solve harness使Qwen3-8B基线模型在四大数学benchmark上平均提升17.83%，证明程序性 scaffolding 的强大教学价值。

但真正的地震在Table 5。OPHSD蒸馏后的裸模型，平均pass@8达到 **69.50%** ，全场最高。具体到HMMT25这个最难的benchmark，OPHSD拿到 **53.33%** ，比OPSD的42.50%高出 **10.83%** ，比GRPO的45.00%高出 **8.33%** 。OlympiadBench上OPHSD更是以83.82%碾压GRPO的77.94%。

Table 5：OPHSD在HMMT25上较OPSD提升10.83%、较GRPO提升8.33%，且推理期重新挂载harness无额外增益甚至微降。

Figure 3的训练曲线把故事讲得更透。OPHSD（蓝色）从训练初期就稳步攀升，后期在四个benchmark上都保持领先。OPSD（橙色）早期还能跟上，但中后期明显疲软甚至下滑。CRISP（绿色）因为只学"简洁"，性能差距更大。

Figure 3：OPHSD训练曲线稳定上升并持续领先，OPSD中后期性能下滑，验证harness程序性监督优于静态答案模仿。

最反常识的一幕来了：论文特意测试了 **OPHSD+Harness** ——把训练好的模型重新挂回plan-solve harness。结果平均 **69.13%** ，比裸跑的69.50%还低。在数学推理上，harness已经从"拐杖"变成了"累赘"。模型自己已经学会了规划-求解的完整套路，外部强制分解反而打断它的内部节奏。

---

**拆脚手架后，模型到底学到了什么？**

性能数字够硬，但更有价值的是 **拆开后看内部结构** 。论文做了三组深度解剖，证明OPHSD不是简单记住了答案，而是把harness的 **程序骨架** 刻进了权重。

第一刀切在问题分层。Figure 4把数学benchmark题目按基线和harness的表现分成四组：Group a（两者都会）、Group b（基线不会但harness会）、Group c（两者都不会）、Group d（基线不会且harness也不会）。OPHSD在Group b上的相对提升高达 **84.62%** ——这意味着模型精准吸收了harness的解题程序，把原本只有外挂才能解的题变成了自己的本能。更惊喜的是，OPHSD还额外解决了 **12.54%** 原本双方都不会的难题，说明内化过程中产生了某种 **涌现泛化** 。

Figure 4：OPHSD在harness可解的Group b问题上相对提升84.62%，并额外攻克12.54%原本双方无解的难题，实现程序性能力内化。

第二刀切在难度分布。Figure 6按基线表现把题目分成Hard、Medium、Easy三档。OPHSD的优势 **完全集中在Hard组** ：数学Hard题上比OPSD高+23%、比GRPO高+16%；LawBench Hard题上比OPSD高+34%、比GRPO高+28%；USPTO Hard题上更是暴力输出+90.4%。Easy题大家 ceiling 都差不多，Medium差距也不大。这证明harness教给模型的不是刷题技巧，而是 **攻坚难题的程序性肌肉** 。

Figure 6：OPHSD增益高度集中于Hard难题，LawBench Hard提升34%，USPTO Hard提升90.4%，证明内化的是攻坚性程序推理而非表层技巧。

第三刀切在输出行为。Figure 5追踪了训练过程中模型的平均输出长度。GRPO的输出长度居高不下且波动大；OPSD和CRISP早期都快速缩短，但OPSD在40步后长度 **断崖式崩溃** ，对应Figure 3中后期的性能滑坡——它学"简洁"学过头，把推理过程也砍了。而OPHSD的输出长度 **稳定收敛** ，既压缩了冗余，又保留了完整的结构性推导。

Figure 5：OPHSD输出长度稳定收敛，避免OPSD后期长度崩溃导致的推理退化，体现结构性监督的稳健性。

Case study更是实锤。在LawBench一个边界案例上，OPHSD裸跑时自发执行 **双向权衡** （bidirectional deliberation）：同时考虑"故意伤害"和"过失致人死亡"两种可能，再依据细节定案。而挂着draft-verify harness时，外部检索到的案例全是"故意伤害"，challengers却塞进了"非法侵入""强奸"等无关罪名，导致模型 **被外部噪声带偏** ，放弃了内部已经学会的双向权衡。在数学Case上，OPHSD学生面对有序对陷阱时主动自纠，OPSD学生因为没学过plan-structured supervision，直接 rushed into flawed computation。

---

**临时脚手架，永久能力——哪些外挂能被内化？**

OPHSD最颠覆的启示不是某个benchmark涨了多少分，而是对 **harness本质的重新定义** 。

传统观念里，harness是推理期的永久 fixtures，越复杂越好。但北大团队证明： **复杂的harness不必永远挂在模型外面，它们完全可以是临时 training scaffolds** ，把程序性收益永久反馈回基模型，然后拆掉。

当然，不是所有外挂都能被内化。论文在Appendix C里给出了一个清晰的 **三层兼容性分类** ：

**第一层：Procedural priors over x（完全可蒸馏）** 。harness只是重组模型处理输入的方式，不注入模型自己推不出的新信息。plan-solve、多步分解、自我验证、结构化思维链都属于这一类。OPHSD能回收几乎全部harness收益。

**第二层：Procedural shape over dynamic content（部分可蒸馏）** 。harness依赖训练期才有的动态上下文，如在线记忆库、标注流。推理时外部内容没了，但 **推理形状** 可以内化。draft-verify就是典型：模型记住了"草稿-验证-比对"的程序姿势，只是填充内容从外部检索变成了内部参数记忆。当参数记忆足够丰富时，效果接近harness；不够丰富时，姿势还在，但证据弱了。

**第三层：Real-time external interaction（不可蒸馏）** 。实时搜索当前事件、代码执行精确数值模拟、与状态化环境交互——这些harness的优势是 **信息性的而非程序性的** ，OPHSD无法内化执行本身。但理论上， surrounding tool call 的程序脚手架（何时调用、怎么格式化查询）仍可能被蒸馏。

对企业落地的启示很直接：在给你的大模型套下一个harness之前，先做一个 **推理期消融实验** ——把privileged context撤掉，看看性能崩不崩。如果大部分收益还在，说明harness主要靠程序结构，赶紧用OPHSD内化；如果性能归零，说明它依赖实时外部 grounding，老老实实保留。

当Qwen3-8B拆掉harness反而比挂着更强，我们或许该重新审视AI工程的逻辑： **最优雅的外挂，是训练完成后立刻扔掉的那一个** 。

---

持续关注本公众号【赛博雷达】，我们会第一时间拆解更多前沿开源模型、本地AI实战和Agent最新进展。喜欢这篇文章就点个关注+转发给正在专注AI的朋友，把这份思考分享给更多AI爱好者。

感谢阅读，我们下期见~

paper分享 · 目录

作者提示: 个人观点，仅供参考

继续滑动看下一个

赛博雷达

向上滑动看下一个