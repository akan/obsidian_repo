---
title: "阿里通义开源GUI智能体SOTA：2B到235B端云协同重新定义移动端GUI智能体"
source: "https://mp.weixin.qq.com/s?__biz=Mzg3Mzg5MjY3Nw==&chksm=cf321ca73c21a03a5567c3f2b8bc7e92c31646d9ecc5d44656ab4938f7801d9cf515b47cb90e&idx=2&mid=2247525500&sn=bb36936fa0e7401b5ca0cd0067264777#rd"
author:
  - "[[AIGC开放社区]]"
published:
created: 2025-12-30
description: "阿里开源MAI-UI。"
tags:
  - "端云协同，自进化数据，扩展动作空间"
abstract: "阿里通义实验室开源了MAI-UI系列GUI智能体，通过端云协同架构、自进化数据管线及扩展的动作空间，在多个基准测试中创下SOTA，解决了真实世界部署难题。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/bVibMfbuuqMkoVYo0VdIroRwb0QImRVLtXb3icEuet2VVqjlbHW6gGRr2s5FTAAx0vr4jSj5qcZp82T1oPbhP2Dw/0?wx_fmt=jpeg)

Original AIGC开放社区 [AIGC开放社区](https://mp.weixin.qq.com/) *2025年12月30日 08:45*

*专注AIGC领域的专业社区，关注微软&OpenAI、百度文心一言、讯飞星火等大语言模型（LLM）的发展和 *应用* 落地，聚焦LLM的市场研究和AIGC开发者生态，欢迎关注！*

  

阿里通义实验室开源MAI-UI，从2B到235B全尺寸模型破解真实世界部署难题。

![Image](https://mmbiz.qpic.cn/mmbiz_png/FW3bYDODsowTmxN42wMBGMqJjS9paOvOpMP4Eh4vl0mkmnHEZtU0wicUH8BGzpFtA2Y4tG7Wu04zU9nmxccaiafw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

MAI-UI通过引入端云协同架构、自进化数据管线及扩展的MCP动作空间，在兼顾隐私与效率的同时，全面解决了GUI智能体在真实动态环境中的部署难题。

在手机任务执行能力上，在 AndroidWorld、MobileWorld 等真实导向的基准上，MAI-UI 均创下新的 SOTA **，** 性能超越UI-Tars-2、Gemini-2.5-Pro、Seed1.8等主流模型，并在办公、生活、出行、购物等高频场景中展现出实用的任务自动化能力。

![Image](https://mmbiz.qpic.cn/mmbiz_png/FW3bYDODsowTmxN42wMBGMqJjS9paOvOH5LQcaiasNh7BpPBMHJ6oQHzP2sldHADtxEjcalhrq9cHbpX1Jnqo9Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

### 全谱系模型架构攻克真实部署难题

图形用户界面（GUI）智能体预示着人机交互方式即将发生根本性变革，从通过手动点击滑动来操作复杂界面，转变为通过自然语言指令直接驾驭数字世界。

MAI-UI系列基础GUI智能体模型并非单一的云端巨型大脑，而是一个覆盖了从2B、8B、32B到235B-A22B全尺寸参数的家族矩阵。

这种全谱系的设计初衷，是为了应对真实世界部署中多样化的硬件约束与性能需求。

当前的GUI智能体领域，尽管在感知与视觉定位上取得了长足进步，但距离在真实环境中可靠、稳健且安全的部署仍有巨大鸿沟。

现有的系统通常针对端到端执行进行优化，却往往忽视了真实用户指令的模糊性。

当用户指令不完整时，智能体若无法主动澄清、收集细节或在敏感操作前寻求许可，其执行结果往往南辕北辙。

仅依赖UI操作也存在天然局限，长序列的点击滑动不仅容易因单步错误导致全盘皆输，还将智能体的能力限制在了UI可触达的范围内，无法处理那些UI之外的数据处理或跨应用任务。

设备端与云端的割裂是另一个长期困扰行业的痛点。

目前的解决方案要么是轻量级的端侧模型，能力受限；要么是强大的云端大模型，却伴随着隐私风险、高昂成本以及对网络连接的强依赖。

这种二元对立的局面，导致了缺乏一种原生的端云协同机制来实现隐私感知、成本高效的路由与无缝切换。

真实世界的GUI环境充满了动态变化，弹窗、版本更新带来的布局差异，让那些在静态轨迹上训练出来的智能体显得极其脆弱。

MAI-UI正是一套包含了自进化数据管线、原生端云协同系统以及在线强化学习框架的完整解决方案。

MAI-UI基于Qwen3-VL架构，通过在GUI定位、感知和移动导航数据上的联合训练，构建了强大的基础能力。

为了适应不同层级的算力平台，2B版本专为端侧部署设计，在保持极低延迟的同时实现了超越同级模型的性能；8B和32B版本作为中型模型，平衡了性能与资源消耗；而235B-A22B版本则作为云端超级大脑，处理复杂的推理与规划任务。

这种分层设计让MAI-UI能够在算力受限的移动设备与算力无限的云端服务器之间游刃有余。

为了让模型真正理解界面，MAI-UI采用了指令即推理（Instruction-as-Reasoning）的训练范式。

在GUI定位（Grounding）任务中，模型不再仅仅输出坐标，而是被训练从外观、功能、位置和意图等四种人类视角生成指令，并以此作为显式的推理路径。

这种方法注入了结构化的推理能力，使得模型在面对复杂界面时，能够像人一样先分析这个按钮看起来像什么、它的功能是什么，再做出精准的点击决策。

对于高分辨率的专业软件界面，MAI-UI引入了缩放（Zoom-In）策略，先预测粗略坐标，再对局部区域进行裁剪和精细定位，这一策略在CAD、开发工具等密集UI场景下展现了惊人的准确率。

### 自进化数据管线与在线强化学习

高质量的数据是训练强大智能体的基石，但真实世界的用户行为数据往往难以获取且充满噪声。

MAI-UI构建了一套自进化的数据管线，形成了一个闭环的提升系统。

![Image](https://mmbiz.qpic.cn/mmbiz_png/FW3bYDODsowTmxN42wMBGMqJjS9paOvOqk6CfNPPbflGqLdsTEcgQiatd1aUic6Ij66Jfiaocl6a2nF8WJ1LONPdg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

这个管线不再单纯依赖静态的开源数据集，而是结合了应用手册解析、专家设计任务以及自动化的智能体试错（Rollout）。

通过这种多源策略，训练数据的多样性和规模得到了指数级扩展。

在轨迹合成阶段，系统利用多模态大模型（MLLM）对种子任务进行扩展，生成包含不同参数（如日期、金额）和核心对象的新任务。

随后，通过人类标注和模型自动化生成的双轨并行方式，产生大量的执行轨迹。

这里引入了一个关键的创新点：迭代拒绝采样（Iterative Rejection Sampling）。

模型在每一轮微调后，会被部署去执行新的任务，生成的轨迹经过严格的质量判别器筛选，只有成功或包含高质量片段的轨迹才会被加入下一轮的训练集。

这种机制让训练数据随着模型能力的提升而不断进化，始终处于模型能力的最近发展区，有效解决了数据分布与模型能力不匹配的问题。

为了让智能体适应动态环境，MAI-UI将在线强化学习（Online RL）作为核心训练组件。

![Image](https://mmbiz.qpic.cn/mmbiz_png/FW3bYDODsowTmxN42wMBGMqJjS9paOvOEunjk2rso6ua7ic2c4vem4My2v1hAacvzMFyjb9Byibicf63vq7M1ybsA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3) ![Image](https://mmbiz.qpic.cn/mmbiz_png/FW3bYDODsowTmxN42wMBGMqJjS9paOvO5ia0ElaK2UeIs6a6UDntM3yFmESBR9qyict0icDibne3Xib8qHHYOicj3ibbQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

与数学推理或代码生成等无状态环境不同，GUI环境本质上是状态丰富且资源密集型的。

每一次交互都涉及安卓模拟器的启动、渲染和状态维护，这对大规模并行训练提出了极大的挑战。

MAI-UI设计了一套可扩展的GUI环境架构，基于容器化技术将安卓虚拟设备（AVD）、后端服务和API服务器封装在Docker镜像中。

这种设计保证了环境的一致性和可复现性，更重要的是，它通过环境管理器实现了跨物理机的资源调度和故障恢复。

MAI-UI的在线RL框架支持超过512个并发环境实例，这在GUI智能体训练领域是一个突破性的规模。

为了解决长视界（Long-Horizon）任务训练的难题，系统采用了异步试错（Asynchronous Rollout）和混合并行策略。

异步循环避免了GPU在等待环境响应时的空转，而混合并行则利用Megatron技术将超长轨迹（包含数百万个Token）切分到多个GPU上进行处理。

这种工程上的优化，使得MAI-UI能够针对长达50步的复杂交互任务进行端到端的强化学习训练。

在RL算法层面，MAI-UI采用了改进的GRPO算法。

传统的奖励机制往往只有任务成功或失败的二元反馈，这对于长步骤任务来说过于稀疏。

MAI-UI引入了细粒度的奖励设计，包括格式奖励、点在框内（Point-in-Box）奖励以及针对动作重复的惩罚机制。

特别是在视觉定位训练中，模型不仅要预测正确的坐标，还要遵循正确的思维格式。

实验数据显示，随着并行环境数量从32个增加到512个，模型的性能呈现出显著的线性增长趋势，证明了大规模环境交互对于提升智能体鲁棒性的关键作用。

这种大规模在线RL训练带来的不仅是成功率的提升，更是对未见异常情况的鲁棒性。

在AndroidWorld等基准测试中，经过RL训练的MAI-UI模型能够自如地处理训练数据中未曾出现的弹窗、权限请求和界面突变。

例如，在创建联系人时突然弹出的通知权限请求，基础模型可能会因此卡死，而RL模型则学会了点击拒绝并继续执行原任务。这种从大量失败中学习并在动态环境中自我修正的能力，正是区分实验室Demo与真实可用产品的分水岭。

### 端云协同：隐私与效率的最佳平衡

在移动端部署GUI智能体，始终面临着鱼与熊掌不可兼得的困境：端侧小模型响应快、隐私好但能力弱；云端大模型能力强但延迟高、有隐私隐患。

MAI-UI提出了一种原生的端云协同（Device-Cloud Collaboration, DCC）系统，这不仅是一个工程架构，更是一种新的智能体交互逻辑。

![Image](https://mmbiz.qpic.cn/mmbiz_png/FW3bYDODsowTmxN42wMBGMqJjS9paOvOkdJQR67aT1dv9hEfC6kRdAPKxic00SN85GNAyKExEGSANqgHpjc5wng/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

该系统由三个核心组件构成：端侧GUI智能体（Local Agent）、云端GUI智能体（Cloud Agent）和端侧统一轨迹记忆（Local Unified Trajectory Memory）。

端侧智能体身兼两职，它既是一个能够执行基础操作的执行者，也是一个敏锐的监控者（Monitor）。

在用户给出指令后，端侧智能体开始尝试执行。

在每一步操作中，它都会自我评估：当前的屏幕状态和我的操作是否还符合用户的原始意图？只要任务进展顺利，执行就完全在端侧进行，数据不出设备，响应迅速且零成本。

一旦监控者检测到异常，比如连续多次点击无效、页面跳转与目标不符，或者任务过于复杂超出了端侧模型的能力范畴，它会触发切换机制。

但这种切换并非无条件的，系统内置的隐私检测模块会通过屏幕扫描，确认当前上下文中不包含密码、个人敏感信息等隐私数据。

只有在安全的前提下，端侧智能体才会生成一份包含当前状态、历史轨迹以及错误摘要（Error Summary）的求助包，发送给云端智能体。

云端智能体接收到请求后，利用其强大的推理能力分析错误原因，并接管后续的复杂操作。

值得注意的是，端侧的统一轨迹记忆模块起到了至关重要的桥梁作用。

它记录了所有的历史截图、操作和思维链，并将这些信息投影到端云两个模型都能理解的动作空间中。这意味着云端模型可以无缝地从端侧中断的地方继续执行，而不会出现上下文丢失。

实验数据强有力地证明了这套系统的价值。

在AndroidWorld在线基准测试中，使用2B参数的端侧模型配合云端模型，其性能比仅使用端侧模型提升了33.4%。

![Image](https://mmbiz.qpic.cn/mmbiz_png/FW3bYDODsowTmxN42wMBGMqJjS9paOvO93lGnz64iakF7ibaibRguJ3B0Stia1eGiaQHKaOBaekyPwy53eueTNDTOibg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

相比于纯云端方案，端云协同大大提升了性能，而且系统减少了42.7%的云端模型调用量。这意味着超过四成的任务或步骤完全在本地解决，大幅降低了服务成本和用户等待时间。

同时，对于包含密码输入等敏感操作的任务，即便端侧模型遇到困难，隐私保护机制也会强制阻止云端切换，确保用户数据安全底线不被突破。

这种架构还引入了错误摘要机制，即端侧在求助时会告诉云端我为什么失败了。

MAI-UI的这一设计，实际上是在定义未来移动AI OS的雏形：一个既能利用云端超级算力，又能严守端侧隐私防线的混合智能系统。

### 打破纯UI操作的局限性

传统的GUI智能体被禁锢在看屏幕、点坐标的循环中，这使得它们在面对需要外部信息或跨平台操作的任务时束手无策。

MAI-UI通过扩展动作空间，引入了 `ask_user` （询问用户）和 `mcp_call` （调用MCP工具）两个关键动作，从根本上打破了这一局限。

`ask_user` 动作赋予了智能体主动交互的能力。

在真实场景中，用户的指令往往是模糊的。

![Image](https://mmbiz.qpic.cn/mmbiz_png/FW3bYDODsowTmxN42wMBGMqJjS9paOvOGXAPReibGAtHreGS8Umu5lq87uV4NJmBVMtLTEKZOhMRzvwibM95QzLw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

例如，用户说把简历发给HR，但未指定是哪份简历或HR的邮箱地址。

传统智能体可能会由幻觉生成一个错误的邮箱或者直接卡住。

MAI-UI则被训练识别关键信息的缺失，并主动暂停执行，向用户发起提问：请问HR的邮箱地址是什么？

在收到用户回复后，智能体将新信息整合进上下文中继续执行。这种交互不仅提升了成功率，更增强了用户对智能体的信任感。

`mcp_call` 则是MAI-UI连接更广阔数字世界的桥梁。

MCP（Model Context Protocol）是一种标准化的协议，允许智能体直接调用外部工具或API，而不是笨拙地模拟人类操作。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

例如，要比较两个地址的驾车距离，纯UI操作需要打开地图应用、复制粘贴第一个地址、搜索、记录时间、再重复操作第二个地址，步骤繁琐且极易出错。通过MCP工具，MAI-UI可以直接调用地图API，一次性获取精确的距离数据。

这种能力在处理传统上属于桌面端的工作流时尤为强大。

比如检查GitHub上的最新提交并发送摘要邮件，在手机上通过浏览器完成这一系列操作极其痛苦，屏幕空间有限且操作繁琐。

MAI-UI可以通过MCP直接调用GitHub API获取提交记录，并在后台完成数据处理，最后仅需调用邮件应用发送结果。这不仅将长达数十步的UI操作压缩为寥寥几次API调用，还解锁了移动设备此前难以企及的生产力场景。

为了验证这些能力，MAI-UI团队引入了MobileWorld基准测试。

这是一个高度模拟真实世界使用场景的测试集，包含200多个任务，覆盖电商、企业通讯、社交媒体等多个领域。

在涉及用户交互和MCP工具的任务中，MAI-UI展现了压倒性的优势。

这些数据表明，扩展动作空间不再是锦上添花的点缀，而是GUI智能体走向实用的必经之路。

MAI-UI在各大权威基准测试中均刷新了SOTA。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在ScreenSpot-Pro上，MAI-UI达到了73.5%的准确率；在MMBench-GUI L2上更是高达91.3%。

在移动端导航的核心测试AndroidWorld中，MAI-UI的235B版本以76.7%的成功率超越了UI-Tars-2、Gemini-2.5-Pro和Seed1.8等强劲对手。

即便是运行在设备端的2B模型，也取得了49.1%的成绩，相对于之前的端侧最优模型Ferret-UI Lite实现了75.4%的性能飞跃。

MAI-UI通过全方位的技术革新，正在将那个只需动动嘴就能操控一切的未来带入现实。

参考资料：

https://github.com/Tongyi-MAI/MAI-UI

http://arxiv.org/abs/2512.22047

https://github.com/Tongyi-MAI/MobileWorld

https://arxiv.org/abs/2512.19432

END

点击图片立即报名 👇️

  

![图片](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![图片](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![图片](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![图片](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

AIGC开放社区

向上滑动看下一个