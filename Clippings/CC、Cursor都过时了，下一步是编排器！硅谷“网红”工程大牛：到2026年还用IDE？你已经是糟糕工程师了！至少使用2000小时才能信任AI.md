---
title: "CC、Cursor都过时了，下一步是编排器！硅谷“网红”工程大牛：到2026年还用IDE？你已经是糟糕工程师了！至少使用2000小时才能信任AI"
source: "https://mp.weixin.qq.com/s/HxEVJPnEAA3PPniUyqslyg"
author:
  - "[[听雨]]"
published:
created: 2025-12-30
description: "“到2026年还用IDE？你已经是糟糕工程师了！”"
tags:
  - "AI编程"
  - "编排器时代"
  - "工程师转型"
  - "2000小时法则"
abstract: "硅谷工程专家Steve Yegge认为，软件开发正进入“编排器”时代，工程师需从使用IDE转向管理AI Agent车队，并强调至少需要2000小时的实践才能真正信任和预测AI的行为。"
---
Original 听雨 *2025年12月30日 15:14*

![Image](https://mmbiz.qpic.cn/mmbiz_gif/MOwlO0INfQoIDJ0nx1IhNibpIpYLrpUE0kIP9qbF1iaY7EoZpaic6IojvbXibd5ZGiatxmjtibQRcVbGAPM9Ijvp66yQ/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0) ![Image](https://mmbiz.qpic.cn/mmbiz_png/MOwlO0INfQr2Ow4fUo3hWpLrGwwhxbhrEnb8vgq5gwRTg2iamUZMwkQkp6yE97X5A2I4rKpABB8R2M79iaoMsELw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

**编辑 | 听雨**

**“如果到2026年1月1日，你还在用IDE，那你就是一个糟糕的工程师！”**

**这大概是一句最狠的新年祝福。**

**这句话出自 **Steve Yegge在前段时间的** **AI Engineer Summit上接受的最新采访。 ****Steve Yegge是 软件工程领域的标志性人物，也被称为硅谷“网红”工程大牛， ********早期******** 曾在亚马逊工作7年，后在谷歌工作13年。 他所写的有关编程语言、生产力和软件文化的技术博客得到了广泛 关注 ，同时早年曾因为犀利地公开点评谷歌和亚马逊的企业文化而闻名。********

********目前， ********Steve Yegge担任 Sourcegraph的工程主管，打造了Beads——一个纯Vibe Coding出来的问题追踪器，用于解决Coding Agent的失忆问题，拥有数万名用户。此外，他还与IT作家 Gene Kim合著了《Vibe Coding》一书。****************

![Image](https://mmbiz.qpic.cn/mmbiz_png/MOwlO0INfQr2Ow4fUo3hWpLrGwwhxbhrPNRK4D9bVtQrckSSTMGdf2hICY2ic80avjnUSKmIEIY0aCxcWqzvD7A/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

******在这期访谈中，Steve Yegge也不改其一贯辛辣、激进的画风，给出了不少犀利的判断。 他认为 Claude Code、Cursor以及整个 2024 年技术栈已经过时，接下来会进入编排器（Orchestator）时代。 工程师不再需要一行行写代码，而是使用 **Agent 编排仪表盘** ，去管理一整支 AI Agent 车队——它们协同、分工、并行推进，在你离开电脑甚至睡觉的时候持续交付结果。这也是他 构建的新产品Vibe Coder正在做的事情。******

******Steve 提出了 AI时代的 ****“2000 小时法则”** ：你至少需要连续一年、几乎每天使用AI，才能真正开始 **预测它下一步会做什么** 。 而“信任”并不等于模型有多强，而是你对它的行为是否 **足够可预测** 。如果你无法预判它的反应，那它就永远不值得被放进生产流程。********

********他还给出了一个极具争议性的判断： **如果你到 2026 年 1 月 1 日还在用 IDE 来开发代码，那你已经是个糟糕的工程师了。 **原因并不在于 IDE 本身，而在于** 抽象层已经发生迁移** ——从“模型 + 编辑器”，上移到了 **全栈 Agent 系统** 。未来工程师的工作，不是操作工具，而是设计、调度和约束 Agent 的行为。********

********Steve 对 **2026年的整体愿景是** ： 软件开发正在进入 **“代码的工厂化生产（factory farming of code）”时代** 。 编排器将运行 Claude Code，清洗输出，循环执行“计划–实现–评审–测试”，并在大规模上 **把编程能力释放给非程序员** 。********

******小编整理了整期访谈的对话实录，在不改变原意的基础上进行了润色和整理，enjoy！******

**资深工程师最抗拒 Vibe Coding**

**主持人：**  
这是一次关于 *vibe coding* 的大型讨论。在正式开始之前，我们一直在聊 *vibe coding* 和 AI 工程之间的交集。今天我们把这两个阵营中非常有代表性的人都请来了。你怎么看？

**Steve Yegge：**  
这绝对是一场“运动”。你必须让人站到你这边来。我今天在演讲结尾提到，其实已经出现了非常强烈的反弹，而且这种反弹才刚刚开始。你和我是在往前推的——AI 工程，本质上是构建 AI 驱动的应用、真正进入 AI 时代；而 *vibe coding* ，是放弃旧的软件生产方式，拥抱全新的方式。这两件事都会让很多人非常愤怒。

**主持人：**  
我觉得他们愤怒，主要是因为他们的“身份认同”完全绑定在当下的工作方式上，不允许改变，也不给变化留空间。

**Steve Yegge：**  
那我来抛出第一个“激进观点”。 最受冲击、身份认同绑定最深的，其实不是初级工程师，也不是中级工程师——他们都已经在 *vibe coding* 了。 真正抗拒的是资深工程师、资深管理者，基本集中在 **12 到 15 年工作经验** 这个区间。 他们讨厌 *vibe coding* ，也讨厌 AI。他们在网上说：“我 15 年的经验比任何 AI 都强。”

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我不知道你有没有看到 Nvidia 的 Jordan Hubard 发的那篇文章，他分享了如何更好地使用 coding agents 的建议。下面就有人评论说：“你还是好好做你的管理工作吧，编程留给真正的程序员。等你有我这样 15 年经验，再来发言。”  
我就回他一句：“我觉得你得先学会看钟。”  
他又说：“等你有 15 年经验再说。”  
我说：“那我有 45 年经验，是不是得等到 60 年才能和你说话？或者我要不要砍掉 30 年经验，好和你一样‘聪明’？”

所以我想，我还是 15 年后再见他吧。

**主持人：**  
但现实是，这些人必须共存。大多数公司都会是混合状态。顺便一提，我们昨晚还聊到，OpenAI 里其实也有不少人并不用 AI 写代码。

**Steve Yegge：**  
是的，他们也有不用 Claude Code 的人，可能用 Cursor 或别的工具，但不跑 agentic loops。我们还和 OpenAI 的开发者生产力负责人 Andrew Glover 聊过。他说他们打算等数据更充分后再对外公布，但现在的 **非正式结论是：性能差距大概是 10 倍** 。

不管你用什么指标衡量，代码行数、提交次数、业务影响——差距都非常夸张。两个同岗位、同级别的人，其中一个突然比另一个高效 10 倍。你作为管理者怎么办？你会恐慌。你会去找 HR、找法务，开始认真思考“我们还能怎么办”。  
再来一个更狠的观点： **如果到 1 月 1 日你还在用 IDE 写代码，那你就是个糟糕的工程师。**  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

你还有五六周时间，在继续用 IDE 的情况下，勉强还能算“合格工程师”。但现在就是你必须放下它、开始学习 agent 编程的时候了。这是一整套全新的技能。

我和 Gene Kim 之所以写那本书，就是因为我们自己在玩这些东西。我们写博客，每一篇都 30 页——30 页的博客谁看？但你必须学会怎么让 AI 做那些“大家又害怕、又愤怒它在做的事情”。

很多人说：“我试了两个小时，生成的全是垃圾。” 但真相是：你得花 **200 小时，甚至 2000 小时** 。

### 2000 小时法则：信任 AI 的前提

**Steve Yegge：** Gene 找到了一项研究，结论是： **你至少要和 AI 共事一年，大约 2000 小时，才能真正信任它。**  
这里的“信任”，指的是你能预测它接下来会做什么。 如果它是不可预测的，你当然会愤怒。但当你真正理解了它的能力边界和缺陷之后，它会幻觉、会迷路、会“失忆”、会撒谎，这些边界其实一直没变，只是能力更强了。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

过去几年，我们一直在尝试用 AI 写代码，一直“差一点点”。而现在，它终于比所有旧方式都更好用了。

如果你 **两个月没试过** ，你已经严重落后； 如果你 **一年没试过** ，那你就是恐龙。  
我有一些朋友，是比我强得多的工程师，世界级的，做过你听说过的技术。但他们现在基本不用 AI，顶多像查 Wikipedia 一样问几句。 一年后，他们可能会变成实习生。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**主持人：**  
你真的这么认为吗？即便他们经验那么丰富？

**Steve Yegge：**  
直到今天之前，这都只是我的假设。今天我在你们的大会上遇到一个人，他有 12 年经验，完全拒绝 AI。后来他遇到两个欧洲的博士生，他们是彻底的 *vibe coder* ，疯狂用 agents。  
他们其实很菜，对很多东西没经验，但他们毫无畏惧，只是不停追问 AI：“你为什么这么做？有没有别的方案？扩展性呢？安全性呢？测试覆盖率呢？”

他突然意识到： **工程师本质上就是“会问对问题的人”** 。 而 LLM，其实已经很接近一个“盒子里的工程师”。  
但这不容易。你不是随便打开 Claude Code 就能成功。你会骂它，你会爆粗口。我会说“谢谢”“请”，然后下一秒就吼：“你为什么这么干？”

我们后来意识到一个危险点： **千万别把 LLM 当人，它随时可能背刺你。**

这就是我们说的 *hot hand* 错觉：你觉得它“懂你了”，你让它直接改生产环境。然后 它删库、改密码、锁死系统。这就是为什么这本书存在。  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

最终，你会学会如何高速驾驶它。就像赛车。你会同时跑 12 个 agent，项目数量是过去的十倍。

你会变成“蝙蝠侠”。但你不能直接穿上战衣就说“我是蝙蝠侠”。那只是 cosplayer。你必须学会整个工具链。

**主持人：**  
昨晚让我最震惊的是，很多人已经几乎不写代码了，只是 prompt。

**Steve Yegge：**  
他们不是“不写单行代码”，而是 **完全不写代码** 。IDE 可以留着，但别看它。它现在是给 AI 用的。

### Claude Code 不是终局，编排器时代正在到来

**主持人：你之前说Claude Code不是终局，怎么理解？**

**Steve Yegge：**  
Claude Code 证明了 agent 编程是可行的，但 **太难了** 。你要读大量文本、diff、代码。大多数工程师连五段文字都嫌多。

下一代工具不会是 IDE，而是 **Agent 编排控制台** ：你早上打开，看一眼：  
“这个 agent 在跑，这个卡住了，这个需要我决策。”

我正在做一个叫 **Vibe Coder** 的系统，核心就是 agent workflow 编排。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我今年 3 月就说过：agents 太难用了， **一定会出现编排器** 。 现在你看到了：Replit Agent、Agent-3、Conductor、DMAD、Google 的方案……这不是终点，这是开始。

主持人：  
我很喜欢这个类比。现在还处在非常早期的阶段，谁也不知道最终形态会是什么样，但大概的设想是：你的 agent 在工作时，会不断给你发通知。

**Steve Yegge：**  
对。在我做的 VC（Vibe Coder）里，有一个「活动流」，这是我最早加进去的功能之一。我的理想状态是：我在做别的事情，只是周期性地收到一些“值得我关注”的通知。

**主持人：**  
挺有意思的。我在想，未来会不会出现 agent 之间的“社交网络”？agent 关注 agent，相互协作。

**Steve Yegge：**  
我前几天刚和 Jeffrey Emanuel 喝了三个小时的咖啡。他是 MCP agent mail 的作者，也是我这辈子见过最聪明的人之一。他就是写了那篇“英伟达是泡沫”的文章、直接把股市砸崩的那个人。那篇文章写得极好，后来市场又反弹，Karpathy 也开始关注他。

Jeffrey 做的 agent mail，本质上就是为了解决一个问题：他厌倦了在 agent 之间手动复制信息。“你帮我总结一下该怎么告诉另一个 agent。”于是他干脆做了一个小型服务器，相当于 agent 的收件箱，让它们彼此发消息、自己协作。

现在他只需要说一句：“你们自己协调，把我刚定义的这个 epic 并行完成。”然后 agents 就真的开始自己分工了。

有些人是从「自上而下」的思路在做编排器，试图做一个包办一切的系统。 但有意思的是，我做的 Beads（问题跟踪 + 会话系统），再加上 Jeffrey 的 agent mail，其实都是 **完全用 vibe coding 写出来的** 。

Beads 本身就是活生生的证明：你并不需要真的去看代码，只要你和其他人提出了正确的问题，并让 AI 去检查代码就够了。我经常收到 PR，一看就知道是 AI 做了所有分析和编码。有时候我甚至会问我的 AI：“你觉得他们这个 PR 怎么样？”然后让它给我总结。

**主持人：**  
但这听起来不是挺危险的吗？你不担心质量问题？

**Steve Yegge：**  
如果结果是好的，那就不危险。Beads 现在运行得很好，有成千上万的用户在用，很开心。那显然不算坏事。  
但如果你把这套方法直接用在公司生产系统上，然后把网站搞挂了，那当然就是灾难。

**主持人：**  
可 Beads 本质上是个数据库系统，而数据库一向是最难做的东西之一。

**Steve Yegge：**  
Beads 的架构确实非常怪。它唯一能成立的原因是： **在旧时代，这种东西根本不可能维护成功** 。 但现在你可以直接告诉 AI：“一旦损坏、冲突、合并失败，就全部修好。”而它真的能修。

Jeffrey 的 agent mail 也是类似思路。他让所有 agents 跑在同一个目录里，用一种“文件预定”机制来避免冲突。说实话，这让我想起 90 年代在埃森哲的时候，大家跑去别人工位喊：“这个文件我要用！”当年版本控制太烂了。

但神奇的是，一旦他把这套机制跑起来，agents 就开始像一个「小村庄」一样协作了。这正是我们要走向的方向：编排器 **的核心，不是控制单个 agent，而是让一群 agent 在轨道上协作、通信。**

### 合并之墙：AI 编程最大的未解难题

**Steve Yegge：**  
那问题来了。等你把这些都解决之后，会撞上哪堵墙？ 答案是： **合并** 。

这是现在所有人都在撞的那堵墙。我认为目前最有希望解决它的公司是 Graphite。

Gene Kim 和我经常跟大型企业聊。他们告诉我们： 一旦每个工程师都变成原来 10 倍产出，合并就变成了极其复杂的问题。  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

你我同时工作两三个小时，各自生成 3 万行改动。你的先合进主干，而我这边改了日志系统、架构、API——那已经不是“修冲突”了，而是 **重新在你的改动之上再发明一次我的改动** 。

这件事必须被序列化，本质上是一个队列问题。到现在为止， **没有任何人真正解决它** 。

有家公司给出的“解决方案”是：一个仓库只允许一个工程师。我不是在开玩笑。这在当前阶段，居然是个可行解。

**主持人：**  
传统解法不是 stack diffs、merge queue 吗？

**Steve Yegge：**  
我不太了解 stack diffs，看起来我得承认自己不懂。

**主持人：**  
这是 Facebook 的概念，GitHub 也在尝试引入。但目前没有完美解法，只能在架构上提前规避。

**Steve Yegge：**  
最原始的方法，其实还是沟通。比如你跟另一个人说：“我在做一次非常深的架构改动，我先来，我们先对整体模式达成一致。”

我已经试过让 agent 提前“打招呼”，告诉另一个 agent：“这项工作会影响你。”  
一旦 agents 能真正互相通信，这件事会变得很自然。而且它们做得很好，因为 **它们没有自我、没有 ego** 。谁先做完，谁就是 leader。

**主持人：**  
你和 Jeffrey 最大的分歧是什么？

**Steve Yegge：**  
我们在一个核心问题上完全相反：他认为让 12 个 agent 在同一个 repo 里工作是好主意，而我不认同。

我更倾向于：多个 worktree、多分支，甚至多个 repo clone。他们现在是共享同一个 git、同一个 build。一个 agent 跑测试，另一个也在跑，冲突极多。

但老实说，他正在慢慢说服我：如果你是独立开发者，只跑十几个 agent，这套方式 **真的能跑起来** 。  
因为一旦出问题，你只需要告诉 AI：“修好它。”而它真的会修。

  

明年会进入代码的“工厂化生产阶段”

**主持人：**  
有人提议，明年这个大会的主题就是 multi-agent。

**Steve Yegge：**  
那是必然的。 AI 的未来一定是 multi-agent。  
现在我们还处在“手工用镰刀割玉米”的阶段，这就是今天所谓的“专业程序员”。但 明年我们会进入真正的机械化时代—— **工厂化地生产代码** 。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

很多人从哲学、道德、职业尊严上极度反对这件事。他们习惯的是自给自足的农业，却无法接受约翰·迪尔那样的大型农机。但现实是，我们已经进入了 **约翰·迪尔时代的编程** 。  
Claude Code、AMP、Codex、Klein，我们都爱它们，也都一样糟糕。它们就像电锯、电钻：高手可以用它们建造伟业，也可以把脚锯掉。

真正的未来，是一台“更大的机器”，能规划、实现、评审、测试，把整个流程拆解成流水线。  
这已经开始发生了， 它正在 **解锁非程序员的编程能力** ，彻底颠覆公司结构。团队规模可能缩小到两三个人，治理结构、反馈回路全部重写。

但这对很多人来说太快、太猛，他们要么逃避，要么在网上暴怒。我预测，随着代码工厂化逐步逼近，我们会看到一场大规模的“卢德分子式反弹”。

**主持人：**  
很多人仍然坚持一个底线：前端、应用代码可以， **但别碰云基础设施、后端、分布式系统** 。

**Steve Yegge：**  
那至少先做到一件事： **不要让 AI 直接碰生产环境** 。只在 git 作为安全网的前提下使用它。如果 git 能兜底，你为什么要恐惧？

**主持人：**  
大家的直觉是，AI 不擅长后端代码。

**Steve Yegge：**  
这是数学不好导致的错觉。 ChatGPT-3.5 写系统代码确实很差，那是多久以前的事了？

很多人潜意识里认为： **模型已经不再变聪明了** 。这是错的。就算模型今天停止进化，我们也已经越过临界点，剩下的问题只是“如何驯服电力”。

而事实是：模型还在飞速变强。你在给模型补工具能力，但很快这些能力会被模型本身吞掉。所有工具都在快速贬值、变成一次性用品。

**Steve Yegge：**  
顺便一提，Joel Spolsky 曾写过一句 20 年都成立的话： **“永远不要重写你的代码。”**  
但今天，这条原则开始失效了。对于越来越多的代码库， **从零重写比修修补补更快、更好** 。LLM 能做得更干净。

我最早意识到这一点，是在迁移单元测试时。与其让 AI 一次次修，不如直接告诉它：“全部删掉，重写。”几分钟就完成了。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我们正在进入一个“推翻旧经验”的世界，很像第一次进入量子力学的时代。你只能选择拥抱。

**主持人：**  
你之所以有说服力，是因为你真的干过一切。

**Steve Yegge：**  
是的。我写过 5 年汇编，8086 的那种，8 位寄存器。写过操作系统、游戏引擎、平台、广告系统。我现在只是又一次在重复熟悉的系统模式。

**明年夏天开源模型可能达到 Gemini 3 的水平**

**主持人：**  
你曾经非常批评 Google，尤其是 Cloud 的弃用策略。现在他们扭转了吗？

**Steve Yegge：**  
Google 在执行力上终于长大了。代价是文化变得不那么好玩了，但他们开始真正对结果负责。  
Gemini 是一个重要转折点，现在他们在 AI 上的长期投入开始回报了。

至于实验室内部，Google、Anthropic、OpenAI **全部都极度混乱** 。 Anthropic 把混乱藏得最好，产品经理功不可没；OpenAI 经历了大量人员流失；Google 依然被组织割裂困扰。

这是高速扩张的必然阶段。最终谁会胜出？还远没定论。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**主持人：**  
Facebook 明年可能会是最值得关注的一家。我是说，他们明年必须做出一次非常大的动作。

**Steve Yegge：**  
明年很可能会成为 **开源模型之年** 。 一旦开源模型的能力追上 Claude Sonnet 3.7 那个水平，你只要打开 Klein 之类的工具，就能得到一个效果相当于今年三月 Claude Code 的系统。当然，它不如今天的 Claude Code，但已经“足够好”了。而且关键是：你可以在本地的 M4 之类的机器上 **免费运行** ，真正的 free、free、free。

从我听到的情况来看， 开源模型目前大概落后前沿模型七个月左右，而且这个差距正在持续缩小。这意味着， **到明年夏天，开源模型可能就能达到 Gemini 3 的水平** 。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

所以明年很可能会是这样的一年： 模型本身不再是最大的问题，真正的挑战变成了工具必须更聪明地拆解任务，把子任务分配给“合适规模、合适成本”的模型，进行真正的成本优化。

**主持人：**  
我来代表一下比较怀疑的一方。我的看法是，它们之所以在收敛，是因为正在接近“饱和”。你最多只能到 100，越接近 100，提升就越困难。早期进步看起来很快，是因为起点低；到了高位，自然会放缓。当然，这只是一个技术层面的补充。

**Steve Yegge：**  
不，这一点一点都不“小”。这是一个 **基础性问题** ：AI 智能的曲线到底是线性的、指数级的，还是已经开始呈现渐近线、逐步封顶？

根据一些非常接近前沿研究的人透露的信息，过去大约三十年里，AI 的“智能水平”大致遵循摩尔定律，每 18 个月提升约 4 倍。他们认为，现有的训练数据大概还能支撑 **两个这样的周期** 。再往后会发生什么没人知道——也许继续上升，也许停滞，也许人类历史就此结束。

但仅仅这两个周期，就意味着 **三年内再提升 16 倍** 。我甚至不知道“16 倍更聪明”具体意味着什么，但我花了很长时间去思考这个问题。我的结论是：那将是 **极其、极其聪明的系统** ，它会在很多方面改变世界——既有好的变化，也有坏的变化。

**会编程的人在AI时代依然更有优势**

**主持人：**  
我经常被问到一个问题：他们的孩子该不该学编程？

**Steve Yegge：**  
孩子们应该学的是 **vibe coding** 。

**主持人：**  
你至少还有一个“逃生舱”：你想看的话，随时可以读代码。大多数时候你不需要看，但你可以看，这是一道安全护栏。

**Steve Yegge：**  
但我其实不会去看，因为你真的没必要。

**主持人：**  
我的看法是，不管未来怎样，如果你 **也懂编程** ，你都会更有优势。因为你能写出更好的 prompt，能用更精确的方式与模型沟通。

**Steve Yegge：**  
我理解你说的“懂编程”，不是指语法层面，而是你要以 **语言无关** 的方式理解编程能力本身：函数、类、对象、单子（monads），所有这些抽象能力的全集。你不再关心“怎么写”，而是关心“它是怎么工作的”。

当你达到这个层级，你的思维方式就开始接近一个产品经理或架构师：你站在更高层面看系统。你需要掌握工程的全部概念体系。就像我提到的 Jeffrey Emanuel，他是数学家，自学成工程师。他不一定写过所有代码，但他知道 Cloudflare 是怎么做的，Cassandra 是怎么工作的。

这些技术知识不会消失。 **只是因为你不再亲手写代码，并不意味着你不用学这些东西** 。要在这个新世界里成为一个有效的工程师，你仍然要学习海量的知识，因为那正是你与“机器智能”交互的层级。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**主持人：**  
太精彩了。这次对话覆盖得非常全面。你还有什么想继续吐槽或补充的吗？我把舞台交给你。

**Steve Yegge：**  
我感觉最近“八卦速度”明显变快了。不是八卦，而是工程师们不断发现 **如何用 agent 变得更高效** ，然后疯狂地发布新发现。

举个例子，我今天刚听说一个叫 **Code MCP** 的东西。问题在于：agent 对直接调用 MCP 工具并不擅长，因为它们几乎没有接受过 tool calling 的训练；但它们 **极其擅长写代码** 。于是解决方案就变成：不要让 agent 调工具，让它 **写代码去调用工具** ，效果反而好得多。

这种“微小但关键”的经验正在不断涌现。

**主持人：**  
很疯狂的是，Anthropic 作为 MCP 的创造者，居然也是后来才意识到这一点的，对吗？

**Steve Yegge：**  
是的，最早是 Cloudflare 发现的，然后 Anthropic 才承认：“你们是对的。”这真的很酷。

**主持人：**  
这也是为什么我特别喜欢聚焦在 **AI Engineer** 这个角色上。我的观点是：AI 工程师能够比其他任何人都更充分地发挥 LLM 的潜力。

**Steve Yegge：**  
完全同意。多得多。 你甚至可以把 AI 工程师定义为：一个 **真正掌握了 LLM 使用方式** 的人—— 不是训练模型，而是使用模型。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**主持人：**  
这有点像一种“颠覆式战略”：训练模型、做研究是高地位的；而做 GPT wrapper 是低地位、没什么尊重的。但现在，越来越多的人正在通过这种方式变得真正高效，积累起真实而深刻的专业能力。

这就像 F1 赛车手：他们未必知道如何制造一辆 F1 赛车，但他们对“如何驾驶它”了如指掌。

**Steve Yegge：**  
某种意义上，他们甚至比制造它的人更懂如何“操作”它。所以这两者之间必须对话。

**主持人：**  
非常感谢你今天的分享。你的能量非常有感染力，希望你能继续做 Stevie’s Tech Talks。

**Steve Yegge：**  
我会重新开始的。这种能量完全来自 AI，也来自 vibe coding。它真的会上瘾，而且非常有趣。

参考链接：

https://www.youtube.com/watch?v=zuJyJP517Uw

——好文推荐——

[突发！Meta收购Manus！创始人出任Meta副总裁，核心团队加入Meta！网友猜测：收购价15.5亿美元！](https://mp.weixin.qq.com/s?__biz=MjM5ODI5Njc2MA==&mid=2655934184&idx=1&sn=f60bc7f6555135c376e6c4163813aeba&scene=21#wechat_redirect)

[CC之父自曝实际生产数据：30天，259个PR，共497次提交，全由CC编写！Claude可以连续数天运行，代码已不再是瓶颈](https://mp.weixin.qq.com/s?__biz=MjM5ODI5Njc2MA==&mid=2655934139&idx=1&sn=941401cd8e03d00ead7a58afcf12f534&scene=21#wechat_redirect)

[ClaudeCode创造者：上月没打开过IDE，新人反而更会用大模型！卡帕西：软件行业在经历9级大地震；播客自曝LLM组合用法](https://mp.weixin.qq.com/s?__biz=MjM5ODI5Njc2MA==&mid=2655934099&idx=1&sn=a7f098cebd7d0fbe7795644eaeda6d67&scene=21#wechat_redirect)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

修改于 2025年12月30日

继续滑动看下一个

51CTO技术栈

向上滑动看下一个