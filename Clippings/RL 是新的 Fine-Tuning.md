---
title: "RL 是新的 Fine-Tuning"
source: "https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&chksm=cfa395780ba6f7d3ebffe115a83505a171ba3f624445d83e819c2add0c96139d85a8e3e1d460&idx=1&mid=2247518893&sn=d97353a4eaff11bf3a12a3712ca328db#rd"
author:
  - "[[Ashley、Haozhen]]"
published:
created: 2025-10-25
description: "World Model 可能是解决模型训练环境问题的关键"
tags:
  - "强化学习"
  - "模型微调"
  - "LoRA技术"
  - "环境构建"
  - "奖励函数"
abstract: "文章探讨了AI行业从传统的模型微调向强化学习转变的趋势，分析了RL在agent训练中的优势以及环境构建等落地挑战。"
---
Original Ashley、Haozhen *2025年10月24日 20:04*

[![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/3tHNibnJ2jgzD0rHOng0P4r1HkozoK4Yzb6Viaia4uD2YDCP3gvaIwiaHwAxhoOT6jytOXqjtLYvq2lqqT0RyqJpVQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=Mzg2OTY0MDk0NQ==&action=getalbum&album_id=4022587657917186053&subscene=126&scenenote=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzg2OTY0MDk0NQ%3D%3D%26mid%3D2247514246%26idx%3D1%26sn%3Dde104fc02cb120d9180f47b22fa4a1ef%26chksm%3Dcf71d6a76892668cf18f007c4c9974e8d4c946ed18281f0143b7aedede4e175cc1910467c9ba%26scene%3D126%26sessionid%3D1750994837%26subscene%3D227%26clicktime%3D1750994839%26enterid%3D1750994839%26key%3Ddaf9bdc5abc4e8d03659350f1d5aeabe879f96bc6ba36414330ae668002f202b47d03b5db81c8b59665b83c1f8583ed968cbf8713d565f7013dadcb18b5804616bb5ce7883c006475ceef002b63ded413b8449bda249ab3abfe984c0cd65c1607e949c660fbedd2861c0575826fd540c6b63d48daf52d266776cd0faaf14674e%26ascene%3D78%26uin%3DMzQ2MTE3Mjg4MA%253D%253D%26devicetype%3DiMac%2BMacBookAir10%252C1%2BOSX%2BOSX%2B15.5%2Bbuild\(24F74\)%26version%3D13080a10%26nettype%3DWIFI%26lang%3Dzh_CN%26countrycode%3DCN%26fontScale%3D100%26exportkey%3Dn_ChQIAhIQMhoe%252BBPXgCBc6nwySTgX3RKGAgIE97dBBAEAAAAAAGgMKk7HoFYAAAAOpnltbLcz9gKNyK89dVj06DcmtrpDZoWdSCBGOPJA66XNCp0UFc4sLz7qtEx1hnlkVeDHNk5hV7vMNOzdOtOosagsHj5muxBVZo0sOecdPmNP3T7iq4eEBJ9X8vvAnUEDd%252BU8wlAOvWgruJkbS52o0iBCOyQ45RJfP3drPexeLSBfHBUSZHBVBCPfKhi6sGZTy3mF3BXImYm5%252B1TmA7S5HqP6Ok6uUJgKw1Hz195uSKSgWSfUqH9bE6kS8YXBTwekZedpRNiRexmlTSTerks4nboMfPDUUb%252ForaE%252FLMO9NUkzH83hgOjqBw2Q82p8WuY%253D%26acctmode%3D0%26pass_ticket%3DvgeInrhLtYDDMndp7X7xyCAaYKDLCCE2DQ0Rvt2WjIeLFFGTYjZOw1iLHrrMxp7c%26wx_header%3D0%26fasttmpl_type%3D0%26fasttmpl_fullversion%3D7794116-zh_CN-zip%26fasttmpl_flag%3D1&nolastread=1&uin=&key=&devicetype=iMac+MacBookAir10%2C1+OSX+OSX+15.5+build\(24F74\)&version=13080a10&lang=zh_CN&nettype=WIFI&ascene=78&fontScale=100)

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/3tHNibnJ2jgzD0rHOng0P4r1HkozoK4YzamLt5DZU20iaRn61OMzcxHXBichic3t2vqaqJib1Zktee9ceTdRibFGBmww/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

  

编译：Ashley Sun、Haozhen

今年 9 月，Thinking Machines 发布了一篇长文 *LoRA Without Regret* ，通过一系列 SFT 和 RL 实验，得出了一个结论：在特定条件下，LoRA 可以在计算资源更少的情况下，达到与全参数微调相当的性能。这篇文章让 LoRA 这个模型微调技术又重新被重视，LoRA 不再只是全参数微调的平价替代品。

  

但实际上，自从 OpenAI 在 o1 模型中提出 RL 叙事，以及 DeepSeek 发布的 R1 模型解开了 RL 谜题以来，整个 AI 行业的注意力全都集中在了 RL 上，在 [OpenAI 科学家姚顺雨](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247512336&idx=1&sn=f149c8f599f037377f0e75a0111a9c7d&scene=21#wechat_redirect) 看来，RL 的泛化性标志着 AI 进入下半场。

  

为了更深入地了解从模型微调转向 RL 的趋势，我们节选并编译了 OpenPipe 创始人 Kyle Corbitt 在 Latent Space 的最新访谈。OpenPipe 最初以 LoRA 微调工具起家，如今已经搭建起一整套 RL 产品线，包括通用奖励函数 Ruler。2025 年 9 月 3 日，OpenPipe 被 CoreWeave 收购。

  

**•** 使用 LoRA 后，可以在同一个 GPU 部署上并行处理任意数量的 LoRA 适配器，从而实现按 Token 定价而非按 GPU 使用时长计费；

  

**•** 只有在不得不使用小参数模型的情况下，微调才有使用的必要，而对于绝大多数（约 90%）场景而言，微调的 ROI 并不高；

  

**•** 未来所有大规模部署 agent 的企业，要么在部署前用 RL 训练，要么在部署后持续用 RL 优化，无论采用哪种方式，将 RL 融入 agent 的生命周期都将成为主流模式；

  

**•** RL 落地的最大障碍是环境的搭建，这是目前唯一还没有实现自动化、每个任务都需要大量人工工作的环节，而 World Model 可能是解决环境问题的关键。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/3tHNibnJ2jgzD0rHOng0P4r1HkozoK4YzKMdmrYvpMQKYhbSyGWekYW4xmJT54VMRfREQqpiaKrFj1snI6urLTvQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

  

  

  

  

**01.**  

  

**LoRA 遇冷后又被重新重视**

  

**SWYX ：** 最近 CoreWeave 收购了 OpenPipe，可以先介绍下 OpenPipe 是什么吗？

  

**Kyle Corbitt：** OpenPipe 成立于 2023 年 3 月，当时 GPT-4 刚发布，我们发现，GPT-4 的能力确实强大，但价格太贵，很多公司根本用不起，OpenPipe 提供了一个标准化托管服务的平台，能让企业用简单的流程完成模型蒸馏，将 GPT-4 的功能转化为更廉价的小型模型。

  

OpenPipe 当时面对的机会是：闭源模型太贵，而开源模型的质量又达不到要求，因为小模型效果很差，当时也没有成熟的大规模开源模型可用。

  

OpenPipe 的产品包含一个可与 OpenAI SDK 无缝替换的 SDK。开发者只需接入这个 SDK 来捕获请求与响应数据，就能在完成模型蒸馏后，通过简单修改 API 地址实现模型的无缝迁移，大幅提升了开发体验。在早期开源模型质量较低的情况下，这套 SDK 能够自动收集生产环境中的真实数据，并以此为基础进行数据驱动的蒸馏和迭代，避免了对整个模型进行重训。

  

虽然我们在 3 月就成立了，但首个产品直到 8 月才正式推出。最初的客户主要是实验性用户，但在短短八个月内，我们的 ARR 就突破了百万美元，客户数量也从 3 家快速增长到 30 家。 这一增长主要受益于三个因素：市场快速扩张、开源模型质量提升，以及模型微调难度的下降。 当时，许多企业每月向 OpenAI 支付的费用高达数十万美元，而 OpenPipe 能以更低成本提供相似功能，因此迅速获得了市场认可。

  

**SWYX ：** 当时的市场竞争是什么样的？一方面，GPU 厂商可能通过提供微调服务来增强用户黏性，另一方面，各大 AI Labs 还在不断发布经过蒸馏的精简模型。

  

**Kyle Corbitt：** GPU 厂商的竞争并没有形成实质威胁，虽然各家都提供了微调功能，但由于操作过于复杂，所以没什么人使用， 这本质上是产品的问题而不是模型有没有微调的问题。我们感受到的最大压力其实来自 AI labs，因为他们在持续推出能力更强、价格更低的模型。

  

**SWYX ：** Mistral 7B 模型的发布是不是 OpenPipe 发展过程中的一个重要转折点？

  

**Kyle Corbitt：** 是的。 Mixtral 模型为模型微调领域的初创公司提供了可靠的开源模型基础，带来了一个微调的黄金时期 ，这个模型不仅比 Llama 2 更强大，还采用了完全开放的 Apache 2 许可证，这在当时是个相当大的优势，虽然随着时间推移，Apache 2.0 的优势可能会下降。

  

Apache 2.0 是一种宽松的开源许可证，允许用户自由使用、修改和分发源代码，并支持商业用途。它对企业极为友好，是许多开源模型（包括 Mixtral）选择的许可协议。

  

**SWYX ：** LoRA 技术从兴起、遇冷再到被重新重视的这个过程对 OpenPipe 产生了怎样的影响？

  

LoRA（Low-Rank Adaptation）是一种高效的模型微调技术，它通过在 pre-training 模型中插入少量可训练参数，可以以较低成本实现模型的定制化训练，无需修改或重新训练整个大模型。

  

**Kyle Corbitt：** 在必须要对模型进行微调的这个前提下，相比全参数微调（Full Fine-Tuning），LoRA 具有很多优势，比如它能缩短训练时间、降低内存占用，还能在推理阶段体现出更大的优势：使用 LoRA 后，可以在同一个 GPU 部署上并行处理任意数量的 LoRA 适配器，从而实现按 Token 定价而非按 GPU 使用时长计费。这种方式大幅提升了模型部署的灵活性和成本效率。

  

我至今仍然支持 LoRA 技术。它之前遇冷主要是因为微调整体不那么受欢迎了。 但如果确实需要做模型微调，LoRA 在很多情况下仍然是最佳选择，只是做微调的人本来就不多。

  

**SWYX ：** LoRA 之前遇冷的主要原因是什么？从营销角度看，LoRA 的口碑并不太好，很多人觉得用 LoRA 就是因为没钱做全参数微调，把 LoRA 当成了平价替代品。

  

**Kyle Corbitt：** 对于在现有模型基础上进行相对轻量的任务定制来说，采用 LoRA 几乎没有任何缺点，而且从基础设施简化角度来看，反而有很多优势。此外，Thinking Machines 最近发布了有关 LoRA 的博客文章，LoRA 的品牌形象在逐步提升。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/3tHNibnJ2jgzD0rHOng0P4r1HkozoK4Yzibu9y092tlicBFT9GJn2YiaItEKV8Wx2e8mVkeW5uKMBeNmmAZBhkBpxA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

  

**SWYX ：** 不同的参数配置也能满足用户的不同需求，John Shuman 明确表示 Thinking Machines 正在押注 LoRA 技术，这是对 LoRA 强有力的认可。

  

**Kyle Corbitt：** Thinking Machines 的团队成员大多来自大型 AI Labs，他们发布的研究显示，各大 AI Labs 内部做 post-training 时都在使用 LoRA。虽然 LoRA 还没有被用于完整的模型训练流程，但在快速验证想法的实验阶段，它被证明是很有效的。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/3tHNibnJ2jgzD0rHOng0P4r1HkozoK4Yzmd8BptMVTBwABaL6NKClRErxv9bINUMHKhlkGdHE0Yn8nT9bJ7752w/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

source: LoRA Without Regret

  

  

  

**02.**  

  

**为什么从模型微调转向 RL？**

  

**SWYX ：** 你曾在 World's Fair 上说我们可能不需要微调。你当时认为，模型是否需要微调的关键在于，客户是否看重成本、延迟或质量稳定性。作为以微调起家的公司创始人，这个观点现在还成立吗？

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/3tHNibnJ2jgzD0rHOng0P4r1HkozoK4YzOQpJS0E81WriaBGvvVwDC9gc6GRKshfrwC1RVliaepFz5F3X0xTgg9nw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

  

**Kyle Corbitt：** 我至今仍坚持这个观点。 目前，无论是传统的 SFT 还是我们现在采用的 RL，背后最重要的驱动原因都是为了将大模型能力迁移到更小的模型上，从而可以降低延迟，例如支持实时语音交互等场景。而一旦必须使用小参数模型，通常就需要进行微调。

  

此外，有些企业因为某些特定原因，必须在自己的云环境内部署模型，这时候也需要通过微调来获得一个能满足需求的模型。

  

总的来说，只有在不得不使用小参数模型的情况下，微调才有使用的必要，而对于绝大多数（约 90%）的场景而言，微调的 ROI 并不高，因此没有必要投入过多资源。

  

**Alessio Fanelli：** 应该如何量化微调的成本？

  

**Kyle Corbitt： 成本主要分为两部分：**

  

**•** 搭建训练系统的前期投入：这是固定成本，不同公司间存在一定差异，通常至少需要一名有经验的工程师投入数周时间，如果涉及更复杂的 RL 训练环境，投入周期可能更长，甚至达到数月；

  

**•** 持续的运营成本：微调会降低技术栈的灵活性，比如每次更新 prompt 或增加上下文信息都需要重新训练模型，这会拖慢迭代速度。

  

此外还有金钱成本，但相比于工程师投入的时间成本，金钱成本几乎可以忽略不计， 因为单次模型训练的费用只需要 5 美元到几百美元之间，而且不需要频繁进行训练。

  

**SWYX ：** 你们是什么时候开始转向 RL 的？是在 o1 preview 发布后吗？

  

**Kyle Corbitt：** 是的，o1 确实是关键转折点。之前关于 Strawberry 的泄露信息，以及围绕如何构建基于 RL 的 LLM 的讨论，促使我们决定深入了解 RL 在特定任务中的实际作用。

  

实际上，自 GPT-4 发布以来，后续很多模型的表现都验证了： 在前沿通用模型领域，对 RL 的投入是有明显回报的，尤其是在与 agent 相关的任务或应用中，RL 的效果尤为突出。

  

到 2024 年底，RL 的有效性已经是显而易见的了。我们在想能否将RL应用于不同的业务领域，也就是特别任务的定制。 我们想知道 RL 在这个领域效果如何？需要多少投入？会不会因为大型 AI Labs 能让基础模型适配所有任务，导致特定任务的 RL 变得没必要？这些都是当时悬而未决的问题，但我们觉得这个方向值得一试，因为成功的可能性很高。

  

**Alessio Fanelli：** 你们为什么选择向 RL 转型？

  

**Kyle Corbitt：** 我们在 2025 年 1 月决定全面转向 RL。在那之前我们已经做过了一些尝试，比如我们发布过一个 RL 模型，它能根据文章生成类似 Hacker News 风格的标题，但 2025 年 1 月的这次转型是押注整个公司命运的决定，虽然之后也可以调整方向，但至少在最初的几个月里，我们需要把所有精力都投入到 RL 上。

  

我当时认为，如果所有做推理的企业最后都会用 RL 和特定任务训练来提升模型在具体任务上的表现，那我们在那个时间点的转型就是正确的，但正确的概率大约只有 25%。 虽然概率不高，但是一个高风险、高回报的机会。如果针对特定任务进行 RL 真的能为各类企业带来显著价值，并且持续通过经验训练 agent 成为行业常态，那么我们作为这个领域的先行者将占据非常有利的位置，因此非常值得尝试。

  

我一直对团队和其他人坦诚地说，我并不认为这个方向是 100% 正确的，我们仍在不断摸索的过程中，但成功的概率正在增大。今天又经过一轮讨论后，我估计现在有 55-60%的胜算。

  

未来，所有大规模部署 agent 的企业，都将不可避免地在某个阶段引入 RL：要么在部署前通过 RL 进行训练，要么在部署后持续利用 RL 进行优化。无论采用哪种方式，将 RL 融入 agent 的生命周期都将成为主流模式。 这个判断是基于我们和客户合作的实验结果得出的。

  

**SWYX ：** 许多新入行的人都会被 RL 的数学门槛卡住。你在没有 PhD 或 ML 背景的情况下，是如何克服这些困难的？

  

**Kyle Corbitt：** RL 的数学并没有想象中那么复杂。PPO 的公式虽然充满各种符号，初看确实有些吓人，但只要用一个简洁的 Python 实现示例，优秀的工程师很快就能理解其中的核心逻辑。所以我并不认为这个领域的门槛有多高，关键在于要有信心，并愿意投入时间钻研。我的建议是：读论文时如果遇到不理解的新符号或公式关系，可以把相关上下文输入到 GPT-5 这类模型中，让它用 Python 代码把公式实现出来，并通过代码来展示其中的逻辑差异。对我这样的背景来说，这种方法非常有效。

  

  

  

**03.**  

  

**RL 落地的最大难点在于构建模型训练环境**

  

**SWYX ：** 从 PPO 转向 GRPO 有哪些优势？

  

PPO（Proximal Policy Optimization）是一种常用的 RL 算法，用于训练模型在与环境的交互中不断优化行为策略。它通过引入“截断更新”的机制，确保策略稳定可靠，但需要额外训练一个价值模型来评估动作好坏。

  

GRPO（Group Relative Policy Optimization）是一种改进的 RL 方法，它不再依赖单独的价值模型来评估策略，而是通过同一组样本之间的相对表现来进行优化。在相同条件下生成多条轨迹后，GRPO 会根据它们的相对优劣进行打分和更新，从而减少对超参数调节的依赖，使模型训练过程更高效、更稳定。

  

**Kyle Corbitt：** 在运维层面，PPO 需要额外训练一个价值模型来对策略进行评估；而 GRPO 不需要，这免去了价值模型的训练和相关超参数调优工作。

  

此外，GRPO 降低了评分难度，因为 GRPO 要求在相同的环境和条件下并行生成多条轨迹（trajectory）或推演（rollout），并对这些结果进行评分。它通过比较组内结果的相对优劣来强化优秀表现、抑制较差表现，因此无需依赖全局打分函数，只要能区分同一组内不同结果的优劣就行。对评测人员来说，判断多个样本哪个更好，比给出绝对分数要容易得多。

  

但从 PPO 转向 GRPO 也存在劣势。 目前，让 RL 真正落地的最大难点在于如何搭建一个稳健、可复用的训练环境。 大多数企业都难以做到这一点。虽然在某些场景下环境搭建相对容易，但在我们的业务中，例如训练 agent 在真实代码库上执行操作、运行实际应用时，要构建一个完全可复现的沙盒环境的难度非常高。

  

而 PPO 在这方面理论上有一定优势：虽然在实际训练中，为了提高数据利用率，人们也常常使用类似的模拟环境，但 PPO 也可以直接利用真实生产环境中的交互数据进行训练，而无需额外搭建模拟环境，从而简化了部署流程。

  

**Alessio Fanelli：** 为什么构建沙箱环境会这么难？按理说，只要我们能完整记录所有输入，不就能复现环境了吗？

  

**Kyle Corbitt：** 仅仅记录输入还远远不够，系统在各个方面都必须与生产环境的响应保持一致。 以 Airbnb 为例，要训练一个 agent 来代替用户处理 Airbnb 的预订，就必须精确复刻整个网站平台的行为，包括故障模式和潜在的程序缺陷；否则，一旦进入真实生产环境，agent 就可能因为无法应对实际错误而失效。

  

对于依赖人类输入的协作型 agent，它还需要模拟用户行为。 虽然使用系统 prompt 的用户模拟器可以模拟用户，但真实用户的响应范围远比模拟的更加多样。因此，如果仅在模拟器上训练，agent 可能会在面对新输入时报错。如果仅在模拟器上进行训练，agent 可能会在面对真实用户的新输入时出现错误。原因在于，模拟器不可避免地会将它自己对“正确响应”的理解强加给模型，从而形成一个比真实人类行为更狭窄的响应空间，导致 agent 难以适应真实环境中的变化。

  

**Alessio Fanelli：** 作为一家帮助所有人构建模拟产品的公司，你们觉得构建模拟环境是不是一件非常困难的事情？即便是一家拥有完整代码库、并且在自身产品领域非常专业的公司，构建这样的基础设施仍然会面临很大挑战吗？

  

**Kyle Corbitt：** 理想情况下，每家公司都应该按照最佳实践来维护一套模拟环境，以便进行端到端测试。但在我们与企业客户的交流中发现，大多数公司实际上并没有这样的环境。只有极少数初创公司具备这类基础设施，让我们的产品能够直接接入和使用，但这种情况非常罕见。

  

造成这种情况的根本原因在于，搭建高质量的模拟环境本身就非常困难。真实场景中常常会出现许多难以察觉的错误。即便已有测试环境，模型也往往缺乏完整、真实的数据填充，而这些数据对于理解真实交互是至关重要的。对于拥有代码库的公司来说，可能会相对容易一些，但能否做好仍然取决于整体工程质量。

  

**Alessio Fanelli：** 你如何对环境进行分类的？比如编译器这样的正式环境通常不需要再进行额外工作；在 RL 环境中，一些初创公司会搭建数字孪生体，高度接近真实生产环境；在此基础上，还有精确复制的辅助环境，通过形式化验证来提供明确且可衡量的价值。

  

那么，那些只构建半通用、用于测试的 RL 环境的初创公司，是否仍然具有竞争力或价值？如果这些路径都不足以满足需求，又有什么能够替代 GRPO？

  

**Kyle Corbitt：** 购买这些环境并在环境上进行训练的大型 AI Labs 最清楚其中的价值。这些环境的表现可能已经足够好了，环境的可迁移性会在下一代模型发布时体现出来。不过，目前它们的训练还远没有达到充分的程度。OpenAI 的 agent 接口或类似产品虽然可以使用，但在无监督的复杂任务上并不可靠。

  

更高保真的环境往往能带来更好的效果 ，就像 coding agent 的进展之所以更快就是因为它们依赖的是更简单且高保真的场景，例如代码库或浏览器，这类环境更容易被完全建模和捕获。

  

**SWYX：** 你通常是如何为训练任务提取数据的？如果只是建立一家负责发送 CSV 文件的公司，显然过于简单，真正的难点在于与现有系统的深度集成。你在客户那边实际观察到的情况是怎样的？

  

**Kyle Corbitt：** RL 的反馈必须来自真实环境。虽然从技术上讲，任何数据都可以被勉强编码成 CSV 格式，但这种方式并不可行。 RL 训练要求 agent 必须在真实环境的当前状态下实际运行，才能获得有效反馈。

  

数据格式其实非常简单，就是一系列聊天完成的消息列表或工具调用的列表，也就是 agent 实际看到和执行的内容。获取这些数据本身并不难，真正的挑战在于执行工具调用时，必须建立能够产生接近真实使用场景响应的连接。因此，系统的集成和环境搭建成为了核心挑战。

  

**SWYX：** 作为当初先押注 SFT、后来又转向 RLHF 的人，为什么不进入模型训练环境这个潜力巨大、利润丰厚的领域？

  

**Kyle Corbitt：** 目前这个领域整体上仍以服务为主。许多公司可能会为了提升速度而开发专有的加速技术。我个人倾向于避免走服务型路线，尤其是在客户基础有限的情况下，因为 真正会在环境上进行训练的大型 AI Labs 大概也只有四到六家。 值得注意的是，Scale AI 及其竞争对手面对的也是这同一批客户，却依然能够成长为市值数十亿美元的公司。

  

**SWYX：** Veris 公司是我们重点关注的企业之一，它开发了一个内部工具叫 Loop，能记录所有内部交互轨迹并整理成数据，然后让 OpenPipe 基于这些数据做 RFD（Reward Function Distillation，奖励函数蒸馏）。很多企业，尤其是金融服务行业的企业，都在使用这种模式。比如当客户提出类似“我的账户余额是多少”或“我上次交易是什么时候”这类问题时，系统都需要调用相应工具来完成查询。

  

为了保证 agent 能在这些场景下准确响应，企业必须要有一种有效的方法来测试和优化 agent 的行为。然而，由于许多工具的文档不完整、命名不规范，现有模型在这些任务上的表现往往并不理想。这是很多非 AI native 企业在开发 agent 时面临的问题，他们随便集成一些通用工具，就期望 agent 能神奇地正常工作，而模拟环境正好能帮他们解决这个问题，同时还能满足合规要求，比如在上线前验证 agent 不会提供违规的金融建议。这种模式的通用性如何？

  

Veris AI 成立于 2025 年，专注于为企业提供高保真模拟环境，用于训练和测试 AI agents。Veris AI 的核心理念在于让 agent 在安全、可控的虚拟世界中通过实践学习，从而可以在正式上线前检验 agent 的功能。2025 年 6 月，Veris AI 完成了 850 万美元的种子轮融资，由 Decibel Ventures 和 Acrew Capital 领投。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/3tHNibnJ2jgzD0rHOng0P4r1HkozoK4YzDibG07ojXRC40uFo7AxSA13086uJniaiageCT5cowzyxribl7LR1DdMoWw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

  

**Kyle Corbitt：** Veris 因独特的业务需求而在受监管环境中取得了成功。我不确定按照风险等级来细分市场是否是最合适的方式，更值得思考的是 RL 在不同行业中效用的差异。

  

根据我的观察，更有意义的划分方式是基于任务能力的： 对于更复杂、周期更长的任务，RL 往往能够带来更优的行为表现。而在合规要求严格的环境中，agent 的行为则应尽可能简化和确定化，以降低不确定性，避免在长期任务中出现 RL 难以达到预期效果的情况。

  

**Alessio Fanelli：** 许多客户倾向于避免直接使用 RL 技术，更多将模拟环境用于规划 agent 的行为路径，而不是用于基于数据的微调训练。

  

**SWYX：** 什么技术能够替代 GRPO？

  

**Kyle Corbitt：** 这是研究界重点在关注的问题，许多团队都在探索解决方案。目前我还不太确定这个问题的答案。

  

**SWYX：** GRPO 的核心问题到底是什么？

  

**Kyle Corbitt：** 无论是基于分组还是其他方式， 核心问题是归一化方法（normalization method）。 虽然其他变体在推广上并不算成功，但我们很可能仍会继续使用 GRPO 这个名称，来泛指基于组内归一化（group normalization）的方案。非组内归一化的方法（non-group normalization）也不是完全不可用，但它们往往缺乏稳定性。因此，我们需要在简化设计和保证稳定性之间找到一个平衡点。至于最终的方案会是什么样，目前还不确定。

  

归一化方法（normalization method）指的是在 GRPO 训练过程中，如何对奖励或梯度信号进行标准化或缩放，从而提高训练的稳定性和收敛效果。组内归一化（group normalization）是一种常见的归一化方法，它通过对同一组内的奖励进行标准化来实现。

  

与此相对的是非组内归一化（non-group normalization），即不基于组内数据进行标准化处理。这种方法可能会导致训练过程中的不稳定性，因为它忽略了不同样本间的尺度差异。

  

**Alessio Fanelli：** 你怎么看待 prompt 优化的作用？

  

**SWYX：** 我读过相关论文，我觉得 prompt 层面的更新和模型权重的更新根本不是一回事，两者没有可比性。RL 领域的一些资深人士也认同这个观点。那些学者在推广论文时，总是宣称自己的方法比当前热门的 GRPO 更好，但实际上两者根本不具备可比性。

  

**Kyle Corbitt:** 在一定程度上它们也是可以比较的。关键在于企业的需求，如果企业的目标是让 agent 性能达到最佳，那么不管是优化 prompt 还是调整模型权重，只要能提升 agent 性能就行。

  

**SWYX：** 开发者对这个问题的回应是，为了获得最佳性能，应该同时使用两种方法。

  

**Kyle Corbitt:** 我们评估了 DeepSpeed 和 JEPA，但两者的效果都不理想。与简单的基础 prompt 相比，JEPA 只带来了微小的性能提升：例如，在某个基准测试中，基础 prompt 得分为 50 分，JEPA 提升至 56 分，而 OpenPipe 自己的方法则能达到 96 分，差距非常明显。当然，这也可能是由于我们对 JEPA 的使用方式不够优化。

  

DeepSpeed 是微软开源的一款深度学习优化库，用于模型的大规模训练与推理，可以让训练数十亿乃至数万亿参数模型的过程更快、更省资源、更易使用。

  
Joint Embedding Predictive Architecture （JEPA） 是一种自监督学习框架，模型首先从输入（如一张图片）提取一个上下文块（context block）的嵌入表示，然后预测同一输入中一个或多个目标块（target blocks）的嵌入表示。

  

我们当然希望 JEPA 是有效的，如果 JEPA 真的有效，那 OpenPipe 完全可以围绕它来开发产品。

  

**SWYX：** Shunyu Yao 曾在我们的播客中表示 prompt 优化比权重调整更重要。我个人倾向于认为 DeepSpeed 或 JEPA 会有效。

  

支持 JEPA 的一个有力论据是，它能够模拟大型 AI Labs 优化系统 prompt 的方式，也就是类似“遗传进化”的流程。在这些 AI Labs 中，研究人员会基于大量实际交互数据，持续优化系统 prompt，这本来是一个缓慢的人工过程，但 JEPA 理论上能够实现这一过程的自动化。

  

**SWYX：** 人类直觉在这个过程中扮演什么角色？

  

**Kyle Corbitt：** 人类可以提供超出评估指标的洞察，例如，人类可以基于实际缺陷而否定表面上的技术成功。

  

**SWYX：** 大型 AI Labs 在构建数万字的系统 prompt 时几乎完全依赖经验：先选定初始内容，然后不断进行追加和修改。这实际上是一个典型的系统化编码问题。

  

**Alessio Fanelli：** 如今我们已经知道，LLM 可以用来优化 prompt，但现实中许多 prompt 的编写质量仍不高，目前人们在 AI 系统中使用的 prompt，只有前 10%算得上优秀。这说明这一领域存在显著的改进空间。 相比之下，RL 技术面向的是更专业的用户，GRPO 更适合资深专家，而 prompt 优化则适合所有使用者尝试。

  

**SWYX：** 2026 年的一个行业趋势是转向在线评估（online evaluation）。当前的评估方式过于僵化，往往只是解决已知问题，却忽略了未知问题，因为我们无法预见未来可能遇到的情况。如何将更多在线评估融入像 JEPA 这样的流程，可能正是未来的发展方向。

  

**Kyle Corbitt：** 我非常看好这个方向。我们可以借用 RL 的原理来理解：在静态数据集上使用 JEPA 时，随着 prompt 不断更新，训练数据的价值会逐渐下降，因为这些数据反映的是过去遇到的问题，而不是当前的问题。 这类似于 off-policy RL 中的问题：使用旧模型生成的数据无法准确反映当前模型的缺陷，即便后续进行修正，效果也可能有限。 这个原理在 RL 和 prompt 优化两个领域都适用。

  

Off-policy RL 指模型在学习最优策略时，可以利用由旧策略或他人策略生成的历史数据进行训练，而不必完全依赖当前策略与环境的实时交互。这种方法提高了数据利用率，但也可能导致模型更新方向偏离最优解，因为旧数据并不能准确反映当前策略的真实表现。

  

在实际应用中，我们可以利用真实的评估数据，特别是那些明确标注为优或劣的输出结果，并将这些实时数据整合到训练或优化流程中。

  

**SWYX：** 当前的问题在于，相关的数据处理流程还没有搭建起来，需要数据分析和用户体验（UX）团队参与评估，而过去从没有过这种实践。我认为，2025 年最值得押注的方向就是推动这种深度整合。

  

**Kyle Corbitt：** 我同意你的观点。现在很多做可观测性平台的团队也意识到了这个需求，并且正在探索合适的解决方案。虽然目前还没有看到成熟的方案，但这确实会成为明年的一个热门方向。OpenAI 似乎很看好静态评估工具。

  

  

  

**04.**  

  

**闭源模型的 token 补贴是否可持续？**

  

**SWYX：** 我非常看好模型路由的发展前景，但对专门的模型路由公司不太看好，因为这项功能最终会被整合进模型中，而且它本身的技术难度并不高，本质上就是连接不同的模块，确保模型使用便捷，没必要单独成立一家公司来做。你觉得未来由开源模型生成的 token 占比会是多少？

  

**Kyle Corbitt：** 有数据显示目前开源模型生成的 token 占比仅 5%且持续下降。 但随着越来越多的企业开始采用开源模型，我预计这一比例将会上升。企业对开源模型的需求其实很大。如果开源模型能达到他们期望的性能，大多数企业更愿意选择开源模型。

  

**SWYX：** 企业选择开源模型主要基于成本控制和隐私保护这两大因素的考虑。 我认为我们实际上已经达到了某种意义上的 AGI 水平：当前普通的语言模型在客服、文本转录等场景下，已经能够达到普通人类的工作水准。虽然开源模型的应用比例确实在提升，但那些声称能达到 50%市场份额的观点显然是不切实际的。

  

**Alessio Fanelli：** 这确实是个值得深究的问题。 如果排除 coding 类应用，开源模型的 token 占比可能达到 15-20%；但若包含 coding 任务，比例就会变得很低，因为这类大型计划往往能获得大量 token 补贴，并持续产生海量内容。 Anthropic 就是典型例证。

  

**Kyle Corbitt：** 你认为 coding 领域将主要由闭源模型主导，这个判断是基于 token 能获得补贴，还是因为闭源模型质量明显更优？

  

**Alessio Fanelli：** 不管是哪种原因，只要现状不变，闭源模型就会占据主导。就我个人使用体验而言，虽然每月的基础费用只有 200 美元，但实际使用时，经常不知不觉就消费了数千美元。

  

**SWYX：** 某公司在营收从 10 亿飙升至 50 亿时，利润率据说只有 6%左右。而你正是那 6%利润来源中贡献突出的用户之一，这其实意味着整个行业正在被这种模式透支。

  

**Alessio Fanelli：** 我很难想象像 Uncoder 这样的开源模型，能真正取代目前的闭源代码模型。单就性价比而言，要在生成相同数量的 token 并维持相近性能的前提下，其他服务商（例如 Together 或 Fireworks）根本无法做到每月 200 美元的价格。

  

Uncoder 是由 SOC Prime 推出的一个检测工程（threat-detection engineering）专用 IDE 和协助引擎，它能够将安全检测规则（如 Sigma 规则）自动翻译成多种 SIEM/EDR/XDR 平台可用的查询语言。

  

**Kyle Corbitt:** 而且性能也比不上。 不过其他服务商做不到这个价格主要是因为闭源模型有补贴，这种补贴模式长期来看并不可持续。

  

**Alessio Fanelli：** 目前，Anthropic 和 OpenAI 都在自行搭建 infra。未来，他们很可能会面临 GPU 闲置的问题，因此会努力让 GPU 的利用率接近 100%。 这也意味着他们会继续通过补贴部分服务的方式来充分利用资源。比如，在 SF Compute 等第三方 GPU 云平台上租用 H100 GPU 的价格只需要 40 多美元，而在 AWS 上同样的 GPU 标价却高达 220 美元。

  

因此，我认为补贴策略会持续下去，前提是他们确实拥有之前提到的约 5000 亿美元资金。从目前情况来看，他们很可能确实具备这样的资金实力。需要注意的是，Stargate 计算集群最终会投入使用，但一旦投入，如何承担 5000 亿美元的计算成本将成为关键问题。只要解决了这一点，补贴计划就可以继续执行。总体来看，这个计划是可行的，而且规模可能比我们想象的还要大。

  

**SWYX：** 我对这件事的真实性毫不怀疑。最近，OpenAI 已经和 Oracle、英伟达甚至 AMD 达成合作，从中可以看出，他们不仅锁定了 Stargate 1 项目，还在积极规划 Stargate 2。这种雄心实在令人震惊。

  

  

  

**05.**  

  

**World Model 可能是解决环境问题的关键**

  

**Alessio Fanelli：** 2025 年 7 月你们发布了 Ruler（Relative Universal LM-Elicited Rewards），你们为什么要发布 Ruler？

  

**Kyle Corbitt:** 一开始我觉得我们转向 RL 方向成功的概率只有 25%，现在已经提升到 55% 左右了，Ruler 的发布就是一个重要转折点。但要成功应用 RL 技术，还需要解决几个关键问题。

  

Ruler（Relative Universal LM-Elicited Rewards）是一款通用奖励函数，用于比较语言模型生成结果的相对优劣。它不依赖固定的人工评分或外部奖励模型，而是让模型自身评估输出质量，从而实现更通用、自动化的奖励机制。这一方法显著提升了模型学习人类偏好的效率。

  

首先是一些基础的实践性问题，比如基础设施的搭建。过去的许多 RL 库主要由博士生开发，他们往往缺乏构建可靠软件系统的经验。

  

另一个挑战在于如何评估使用 RL 的系统表现。你必须能够判断你的 agent 是否表现良好，这是最基本的要求。要做到这一点，就需要设计合理的奖励机制，并明确什么样的行为才算“好的表现”。

  

在某些领域，评估系统表现是相对容易的。比如在数学问题求解中，可以通过带有标准答案的数据集来验证结果是否正确。在 coding 领域，也已经出现了许多创新方法，例如利用现有的测试用例，通过运行测试来判断代码的正确性。但在许多其他领域，情况就没有这么清晰了，到底什么才算是好的表现？什么又是差的表现？我们该如何判断系统是否真正做得好？这些信息对 RL 系统的训练与评估都至关重要。

  

我们尝试了很多方法，最终发布了 Ruler。 它的工作原理基于 GRPO 的核心理念，也就是你不需要绝对的评判标准，只需要相对判断。 简单来说，就是让语言模型对一组结果进行评判，比如给定一个任务目标和 agent 的四次执行结果，让它排序哪些表现最好。事实证明，这种方法与 GRPO 配合效果非常好，远超我们预期。因为语言模型通过相对排序实现了自我校准，并不需要全知全能地理解好坏标准。而且这个方法在我们尝试的所有场景中都有效，无论是客户项目还是内部用例。说实话，我觉得奖励分配问题基本上已经解决了，这是个巨大的突破。

  

**SWYX：** 你们是怎么选择用哪一个模型来当评估模型的？

  

**Kyle Corbitt:** 我们做过相关实验。在其中一个实验中，训练用的模型是有 140 亿参数的 Claude 2.5，评估模型是参数规模为 320 亿的 Claude 2.5。虽然后者的性能明显不如前沿模型，但我们训练出的 agent 在目标任务上的表现仍然达到了最先进水平，甚至超越了所有现有的前沿模型。 这表明，在实际应用中，你并不一定需要一个特别强大的评估模型。

  

奖励分配的问题解决后，剩下的核心难题就是环境搭建了。这是目前唯一还没有实现自动化、每个任务都需要大量人工工作的环节，是当前 RL 落地的最大障碍。

  

**SWYX：** 这是我将 Ruler 这种方法称为自监督的原因，它能够逐步减少对人工判断的依赖。自从 ImageNet 时代以来，机器学习领域的核心思路一直都是在不断降低人工干预的同时，扩大数据规模，从而实现更高程度的无监督训练。那么，你是否看好专门用于评判的大语言模型（LMS Judge Models）？

  

**Kyle Corbitt:** 我们关注过也自己训练过一些评估模型，还用过市面上现成的模型。AI2 团队还做了一个叫 “Reward Bench” 的评估基准，专门用来测试模型作为奖励模型的性能。

  

AI2（Allen Institute for AI）是由微软联合创始人 Paul Allen 在 2014 年创立的 AI 研究机构，总部位于美国西雅图。

  

Reward Bench 是 AI2 团队推出的评估基准，用于测试语言模型在奖励建模（reward modeling）任务中的性能，它通过一系列标准化的比较与打分任务，来衡量模型在理解、生成与评估文本质量方面的能力，从而帮助研究者判断模型是否能有效充当 RL 中的奖励函数。

  

**SWYX：** 在你看来，LMS Judge Models 和奖励模型是同一件事情吗？

  

**Kyle Corbitt:** 这取决于具体任务。 LMS Judge Models 通常更偏向产品层面，而奖励模型在聊天任务中的定义更具体。我觉得两者在很大程度上是等价的，但也有细微差别。

  

回到 Reward Bench 这个话题。我们在这一基准上测试了许多模型。我认为，任何足够常见的任务，最终都会被各大前沿 AI Labs 纳入自身的训练数据中。既然 LMS Judge Models 在各种场景下都被广泛使用，我们有充分理由相信，这些 AI Labs 的训练数据中已经包含了大量类似“评判任务”的样本。换句话说， 如果某类任务在训练数据中占据了相当大的比例，那么这些通用模型在该任务上的表现至少不会低于专门为此设计的模型。

  

因为前沿 AI Labs 在这方面的投入太大了，所以我认为专用的 LMS Judge Models 其实没什么竞争优势。不过有个例外，如果你的任务非常特殊，或者有独特的评判要求，并且你拥有足够多能够区分“好”与“坏”的标注数据，那么针对这个特定任务训练奖励模型，或者微调一个评估模型，可能还是有效的。 但对于能评判所有任务的通用评估模型，我不太看好，它们很难比得过前沿 AI Labs 的通用模型。

  

**SWYX：** World Model 最初主要应用于视频生成领域，例如 Genie 系列模型，现在已经开始被用于 coding 甚至 AI 生物领域的虚拟细胞模拟。你们在这个方向上有什么探索吗？

  

**Kyle Corbitt:** 我对 World Model 很乐观，因为它可能是解决环境搭建问题的关键。

  

World Model 的核心作用在于模拟环境。它不同于 Docker，Docker 只是提供一个独立、隔离的运行环境，而 World Model 能够模拟、生成，甚至想象外部世界的反馈。如果拥有一个性能足够强大的 World Model，那么当 agent 调用某个工具时，它就能生成调用这个工具可能返回的结果。进一步来说，一个足够智能的 World Model 还能够记录先前操作所引起的状态变化，并推断这些变化可能带来的后续影响。

  

如果能够成功实现高质量的 World Model，这或许能成为解决环境问题的方案。通过使用真实生产环境中的数据来训练 World Model，让它能理解特定系统的运行机制和可能出现的故障模式，然后再基于这一模型来训练 agent，理论上，这种方式训练出的 agent 将能够在真实环境中稳定、可靠地运行。

  

**SWYX：** Meta 最近发布了 Code World Model，它将调试器视作模型的环境，让模型能够查看代码的执行轨迹、理解程序的运行状态，并跟踪代码执行过程中状态的变化。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

**Kyle Corbitt:** 我们对 World Model 的应用方向有点不一样，我们希望它能直接作为一种模拟环境。但在 coding 领域，代码本身可以被直接执行，因此并不太需要这种模拟。对于模型训练场景来说，如果想了解代码执行的结果，直接运行代码即可，无需依赖 World Model 来进行预测。

  

**SWYX：** 你提到过 OpenPipe 的目标是构建一个让每个 agent 都能从真实世界经验中持续学习的世界。要实现这个目标需要哪些条件？

  

**Kyle Corbitt:** 如果能够实现这个目标，那么到时候每家公司都会以这种方式部署他们的 agent。我们的目标就是开发出能让这一过程变得简单高效的软件。

  

我经常与客户的工程师交流，他们都在尝试部署 agent，虽然做出一个初步原型是相对容易的，但要达到可以在生产环境中可靠部署的程度却非常困难。而这些 agents 的故障模式很类似，几乎都是特定情境下的异常行为。虽然可以通过更新 prompt 来解决个别问题，但这种方法不可扩展，因为你不知道会破坏什么其他功能。

  

我经常与客户的工程师交流，他们都在尝试部署 agent。 虽然构建一个初步的原型相对容易，但要让它在生产环境中稳定可靠地运行却非常困难。 而且这些 agent 的故障模式往往很相似，几乎都是在特定情境下出现异常行为。虽然可以通过修改 prompt 来修复个别问题，但这种做法不够 scalable，因为你永远无法确定这样的修改会不会破坏其他功能。

  

我们真正需要的是一种能直接指出“你刚才的做法有误，请在这种情况下调整行为”的机制，这正是 RL 和 [continual learning](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247518581&idx=1&sn=19aa9f21427f7a9d9b20ca0bf480ac0a&scene=21#wechat_redirect) 能够提供的。 这个工作方式类似于培训人类员工：指出错误、要求改正、然后继续工作。这种反馈闭环能显著简化 agent 的开发流程。目前大量 AI 推理需求仍停留在概念验证（PoC）阶段，还没有大规模落地；保守估计这些潜在需求约为当前已落地规模的十倍。许多项目因可靠性问题无法从 PoC 推向生产。如果我们解决了可靠性问题，约 90% 的推理市场将被激活。这正是我们的目标，我们已有具体实施思路，接下来只需逐步执行。

  

**Alessio Fanelli：** Online RL 会不会更容易出现 Reward Hacking？尤其是在训练周期缩短、没有足够时间检查不同训练节点（Checkpoint）的情况下。

  

**Kyle Corbitt:** 我不太担心这个问题，因为一旦发生 Reward Hacking，是很容易被发现的。 因为模型一旦找到可利用的漏洞，就会反复执行同样的行为，你很快就能注意到异常。 如果系统部分依赖 LLM 评估器来判断结果优劣，只需在奖励提示中补充额外约束，明确这种异常行为是不被允许的并给予低奖励即可。我们在多个客户项目中都遇到过类似的 Reward Hacking 问题，但只需调整奖励提示，就能轻松解决。

  

**Reference**

Why Fine-Tuning Lost and RL Won — Kyle Corbitt, OpenPipe (acq. CoreWeave); https://www.youtube.com/watch?v=yYZBd25rl4Q

  

  

排版：夏悦涵

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

延伸阅读

[![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247518860&idx=1&sn=033bb7b4db2d36c742d68acaf4218dd0&scene=21#wechat_redirect)

SemiAnalysis 创始人解析万亿美元 AI 竞争：算力是 AI 世界的货币，Nvidia 是“中央银行”

  

[![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247518822&idx=1&sn=d6b378e1e41e739fe132926b3cd4565f&scene=21#wechat_redirect)

告别 260 亿美元低效投入，HappyRobot 为物流业配置 “AI 调度员”

  

[![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247518724&idx=1&sn=085e7c34d814da5741c9bf75d10de03a&scene=21#wechat_redirect)

GPT-5 核心成员详解 RL：Pre-training 只有和 RL 结合才能走向 AGI

  

[![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247518657&idx=1&sn=c5e5643910ca4c9669df786bc4d65280&scene=21#wechat_redirect)

Palantir 创始工程师深度分享：FDE 模式是 Agent 时代的 PMF 范式

  

[![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=Mzg2OTY0MDk0NQ==&mid=2247518581&idx=1&sn=19aa9f21427f7a9d9b20ca0bf480ac0a&scene=21#wechat_redirect)

深度讨论 Online Learning ：99 条思考读懂 LLM 下一个核心范式｜Best Ideas

  

  

继续滑动看下一个

海外独角兽

向上滑动看下一个