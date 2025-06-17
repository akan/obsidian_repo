---
title: 变天了！WindSurf推出workflow功能，低代码大模型应用开发平台将面对“降维”打击
source: https://mp.weixin.qq.com/s/DbJVqr9ePbEAe-R9Ei7DVw
author:
  - "[[ully]]"
published: 
created: 2025-05-08
description: Windsurf 又发新功能！dify，coze进入十字路口
tags:
  - workflows
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/aaN2xdFqa4HGB9ImQXZAgC3KZPEVWkjxGCRy1PMdibOicyAPibAvAWQib3tP7huV2XBQgNLGYBA78BYiaAKcn3d49lQ/0?wx_fmt=jpeg)

Original ully [AI工程化](https://mp.weixin.qq.com/s/) *2025年05月08日 10:55*

Windsurf 又发新功能！

在1.8.2版本中推出了workflow功能，虽然workflow不是一个新东西，dify、coze等产品很早就推出了workflow这样的能力 ，并且也是这类产品的最大特点之一，但Windsurf的workflow在形态上与过去拖拉拽的交互有很大不同，它采用自然语言的方式定义工作流，并与开发IDE深度集成，笔者认为，这样的形式是模型能力进化的结果，也是workflow的更高级形态。这对于过去火爆的各类编排工具和自动化脚本来讲，既指明了前进方向，也将会是被颠覆的巨大的挑战。

![Image](https://mmbiz.qpic.cn/mmbiz_jpg/aaN2xdFqa4HGB9ImQXZAgC3KZPEVWkjxo6d7uE54YwWDPDoTB9rsUyZnHch62ozU55QrltObF31NOq5AwS7roA/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

**Windsurf Workflows 是什么？**

Windsurf Workflows 功能使用户能够定义一系列步骤，以指导 Windsurf 的核心 AI 引擎 Cascade 完成重复性的任务。

核心特性包括：

1. **结构化步骤序列** ：Workflows 允许用户在每个步骤级别定义清晰的提示，将复杂的任务拆解为一系列互联的子任务或动作。这与 Windsurf 已有的 “Rules”（在提示层面提供持久、可复用的上下文指导）一脉相承，但 Workflows 将此概念扩展到了整个任务“轨迹”层面。
2. **Markdown 定义** ：创建 Workflow 非常简单：用户可以通过 Windsurf 界面的 "Customize" -> "Workflows" -> "+Workflow" 来新建，然后用文本（Markdown 格式）编写一系列步骤、标题和描述。这些 Workflow 文件存储在项目仓库的 `.windsurf/workflows/` 目录下，便于团队共享和版本控制。
3. **便捷调用** ：一旦保存，用户可以在 Cascade 中通过斜杠命令 `/[workflow-name]` 直接调用执行。
4. **AI 辅助生成** ：用户还可以直接要求 Cascade 帮助生成 Workflows！这对于涉及特定 CLI 工具多步骤操作的场景尤其高效。
5. **内置错误处理** ：Windsurf Workflows 甚至可以处理执行过程中的错误。例如，如果格式化步骤失败，它会读取错误信息并尝试修复，然后再次运行。

可以看出，Workflows有非常丰富的潜在应用场景：对于日常重复性工作，过去可能需要根据Runbook（操作手册）手工执行或者通过自动化编排工具完成的事情，现在只需要提问即可；它与MCP进行集成，可以轻松实现很多过去耗时耗力的工作。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**对 Dify 等应用编排工具的潜在“降维打击”**

看到这里，我们不禁会想起当下以dify、fastgpt等为代表的主流AI 应用编排工具，它们主打通过可视化拖拉拽的方式构建大模型应用，很大程度降低了开发门槛，并且弥合了模型能力与实际需要的鸿沟。

> 工作流编排是目前最好的平衡模型能力以及生产需求的妥协办法。通过编排可以将开放域，复杂多步问题，分解为多个子问题分开解决，能用模型用模型，不能用模型的用流程，甚至采用“Human in Loop”的方式，将整个工作流程白盒化，把大模型能力限制在封闭的问题内，让大模型更可控，提升整个应用的可解释性和鲁棒性，这样的思路也成为了业内共识。
> 
>   
> 
> 另一方面，我们说workflow是一种过渡手段的原因是随着模型能力逐渐增强很多过去难以处理的问题都将解决，另外通过这种组件缝合的方式也在一定程度上导致了“缝合怪”的出现，系统整体稳定性会相对下降。
> 
> ully，公众号：AI工程化 [LLMOps框架Dify发布Workflow功能，RAG进入自由编排时代（附产品负责人分享PPT ）](https://mp.weixin.qq.com/s/s6PgoRrCVdbSnfeVXAjtGw)

然而，Windsurf Workflows 的出现，过去的“小甜甜”将要变成“牛夫人”；相较于前者，Windsurf Workflows具有以下优势：

1. **更原生的开发者体验** ：
- **文本即代码 (Text-as-Code)** ：Workflows 使用 Markdown 定义，天然适合版本控制（如 Git），易于代码审查和团队协作。这对于习惯了代码化一切的开发者而言，比在GUI界面中拖拽配置更具吸引力。
	- **IDE/编辑器集成** ：Windsurf 本身似乎是一个与编辑器或IDE紧密集成的工具。这意味着开发者可以在他们最熟悉的环境中定义和调用 Workflows，无需切换到独立的编排平台。这种“上下文不切换”的体验是巨大的效率提升。
3. **轻量级与高频场景的契合** ：
- 许多开发者日常的自动化需求，如部署、日志检查、代码格式化、PR 辅助等，可能并不需要一个功能全面的独立编排平台。Windsurf Workflows 提供的轻量级、快速定义和调用的方式，恰好满足了这类高频但相对简单的自动化场景。
	- 对于 CLI 工具链的自动化，Windsurf Workflows 的AI生成能力和直接执行能力，比在Dify等平台中配置API调用或代码节点可能更直接。
5. **AI 驱动的流程自建** ：
- Dify 等工具虽然也利用 AI，但更多是作为编排流程中的一个“执行节点”（如调用 LLM）。Windsurf Workflows 则更进一步，AI (Cascade) 不仅执行流程，还能帮助 *创建* 和 *优化* 流程本身。这种元级别的 AI 应用，是其独特的优势。
7. **从“辅助工具”到“工作流核心”的转变潜力** ：
- 传统的 runbook 或脚本往往是孤立的，需要手动触发或与其他系统集成。Windsurf Workflows 将这些流程直接融入到开发者的核心工具链中，并通过自然语言交互（斜杠命令、AI生成），使其成为一种动态的、智能的“活文档”和“自动化助手”。
9. **产品定位与用户群匹配**
- Windsurf Workflow本身就是编程IDE的一部分，对于开发者来讲，符合其工作习惯，能够很好地管理代码、环境和版本。而拖拉拽应用开发平台长期存在一个问题就是业务人员用不起来，开发人员不愿意用的不上不下的尴尬；往往进入真实业务深水区，不得不肢解拆分，回归到高代码的状态。

**小结**

Windsurf虽然属于老二位置，但其产品创新表现突出：先有Cascade模式（Agent）再到全面接入MCP，现在，Workflows 功能又是Windsurf又一大创新，这将引领了编程工具的方向。某种角度看，最近流行的manus这类泛智能体产品就是对这种模式的套壳。

同时，从行业技术发展角度看，这种基于大模型能力的原生工作流方式是对传统拖拽工作流的降维式打击。当然，对于Dify这类产品在过去模型能力空窗期也积累了众多的用户和能力，面对挑战，笔者认为可以朝两个方向发展： 向下 ，凭借积累打开自己作为原子能力提供商，向开发者赋能被集成； 向上 ，快速借鉴这一思路补齐能力，向更上层的用户（业务人员）提供更加低门槛的AI应用构建工具。

总的来讲，随着模型能力的不断变强，对于平台工具开发者来讲，如何不被吞噬，是必须要思考的事情。

换个角度，平台工具开发者是否应该转型，换道借力，开辟新的天地呢？感兴趣的可以进群讨论。

参考： https://docs.windsurf.com/windsurf/cascade/workflows #workflows

公众号回复“进群”入群讨论。

![](https://mmbiz.qlogo.cn/sz_mmbiz_jpg/j1pCZ4uhyNJ8uGFI7kydDXpnYISHysDzOne4MFx6LzleiclXNPVvy2v8KhZe8xzSGHJf7LSY9DnIAncPbDrIAQQ/0?wx_fmt=jpeg)

小小的鼓励，大大的支持

 [Kudos to the Author](https://mp.weixin.qq.com/s/)

继续滑动看下一个

AI工程化

向上滑动看下一个