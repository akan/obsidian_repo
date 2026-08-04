---
title: "我用 Rust 撸了个自编排的 Agent，它拥有了\"自我完善\"的能力，群友：这难道是传说中的Graph Engineering ？"
source: "https://mp.weixin.qq.com/s/YECoz0HODWz3CqC6D4SCDw"
author:
  - "[[小张]]"
published:
created: 2026-08-04
description: "朋友们，过去两个月我写过两篇长文。一篇聊 harness 工程，把一个 Agent 内部的四个循环拆开看——模型调用、工具执行、上下文管理、错误恢复。"
tags:
  - "Graph Engineering"
  - "Rust"
  - "Agent编排"
  - "动态修图"
  - "并行确定性"
  - "状态恢复"
  - "预算控制"
  - "工程队模式"
abstract: "本文介绍了用 Rust 实现的 Graph Agent Runtime，通过 LLM 提议与 Rust 内核校验解耦，实现动态修图、并行确定性执行和崩溃恢复，让多个 Agent 像工程队一样协作完成复杂任务。"
---
小张 老码小张 *2026年8月4日 11:27*

朋友们，过去两个月我写过两篇长文。

一篇聊 [harness 工程，把一个 Agent 内部的四个循环拆开看——模型调用、工具执行、上下文管理、错误恢复](https://mp.weixin.qq.com/s?__biz=MzkxNzY0OTA4Mg==&mid=2247493640&idx=1&sn=205bc39de5976a670cf17181f2b8c1de&scene=21#wechat_redirect) 。  
一篇聊 loop 工程，讲怎么让一个 Agent 在该停的时候停下来——五层终止条件、事件流、checkpoint、子 Loop 控制（整理了，没实现发布）。

但这两篇都默认了一件事： **你的任务，一个 Agent 就能搞定。**

现实是，真实世界的任务，一个 Agent 搞不定。

你让它做一次架构评审。它要先理解需求，再从架构、性能、可实施性、风险四个维度分别分析，再把结论汇总，最后让一个 critic 节点过一遍——必要时还得补一个内存风险分析。

这不是一个 Loop 能干的事。 **这是一支工程队才能干的事。**

今天这篇聊的就是这件事：怎么把一个 Agent 变成一支工程队。

我用 Rust 写了一个项目叫 rust\_graph\_agent，9117 行，6 个直接依赖。它不是聊天机器人，不是单 Loop Agent，也不是 LangGraph 那种"用代码画图"的编排框架。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/sc9vl5waw2r8ITBMOvaaemxRwVYdV0os7tvLLuz1oGDCiccibiceZcoTSW7XxhZUHV2bvp5LE49OsI9xwBGwNEnSn7u1dNc8kotDB8IFEgKFKM/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

rust\_graph\_agent

它是一个 **Graph Agent Runtime** ——一个由确定性 Rust 内核驱动、允许 LLM 动态修图、支持多 Agent Loop 并行协作、可中断恢复的执行引擎。

一句话定位：

> **模型决定"建议做什么"，Rust 决定"是否允许、何时执行、执行到什么程度"。**

这是我自己对 Agent 工程五个阶段的理解。一个一个讲。

### 一、Agent 工程的五个阶段

我把 Agent 这两年的演进粗略分成五层，每层解决一个核心问题：

| 阶段 | 核心问题 | 关键能力 |
| --- | --- | --- |
| **Prompt Engineering** | 怎么让 AI 听懂人话 | 提示词、角色、约束、示例、输出格式 |
| **Context Engineering** | 怎么让 AI 拿到对的资料 | 上下文选择、记忆、检索、压缩 |
| **Harness Engineering** | 怎么让 AI 在真实系统里稳定跑 | 工具协议、超时、重试、沙箱、日志 |
| **Loop Engineering** | 怎么让 AI 自己连续工作 | 规划→执行→观察→反思→修正，停止条件，预算 |
| **Graph Engineering** | 怎么编排多个 Loop/Agent 完成复杂任务 | 任务拆解、依赖、并行、分支、汇聚、动态修图、失败恢复 |

前四个阶段，都是在武装"一个 Agent"。Prompt 让它听话，Context 让它有料，Harness 让它不崩，Loop 让它能干长活。

**第五个阶段是质变。** 它把一个 Agent有一张可靠的 ，可以迭代的执行规划总图；Agent能在干活的过程中改这张图，把它变得更加可靠，然后能稳定完成既定的目标。

前四个阶段，模型干的都是"执行"。  
第五个阶段，模型开始干"协作"。

这不是量变，这是质变。一个 Agent 再聪明，也只是个高级打工人。一支会协作的工程队，才是一个组织。

而组织能力，恰恰是当前 LLM 单 Agent 最大的瓶颈。

**我的判断是：Agent 工程的下一站，不是更聪明的模型。是把多个 Agent 编排成一支能自己改图纸的工程队。**

今天，我们的这个工程，rgraph(rust graph agent) 干的就是这件事。

### 横向看一下：业界都是怎么解的

Graph Engineering 这个层，业界已经有几种典型解法。先横向扫一眼。

**流派一：代码定义图。** 代表是 LangGraph、Pydantic Graph。你用 Python 代码定义节点和边，框架帮你跑。优点是灵活，缺点是图是静态的——你写完代码、跑起来，图就固定了。

**流派二：消息驱动协奏。** 代表是 AutoGen、CrewAI、MetaGPT。多个 Agent 通过消息互相喊话，没有显式的图。优点是涌现感强，缺点是不可控——你不知道它什么时候停，不知道哪个 Agent 在干嘛，调试是噩梦。

**流派三：人画图 + 单 Loop 执行。** n8n、Dify、Coze 这类低代码平台。你拖拽画一张图，每个节点是一个简单调用。优点是门槛低，缺点是节点本身不是 Agent，没有 Loop 能力，干不了需要"反思再修正"的事。

这三种都缺了一个东西—— **图本身能在执行中被 Agent 改。**

为什么这件事重要？

因为真实任务里，规划阶段没人能想全。Critic 在评审的时候发现"咦这里少一个内存风险分析"，它得能在跑的过程中加一个节点进去，而不是让你重启整个流程。

rgraph 选了第四条路： **LLM 负责规划、提议、修正；Rust 内核负责编译、校验、调度、合并、恢复。**

模型是建议者，Rust 是裁判。这两者解耦，是 Graph Engineering 能稳定上生产的根本。

### 纵向拆：rgraph 怎么做的

下面进入工程细节。我挑五个最值钱的设计点讲，每个配上真代码。

#### 让LLM 无直接控制权

这是整个 rgraph 的灵魂。我所做的设计如下：

> **LLM 只能返回以下结构化对象：GraphProposal / GraphPatch / AgentAction / NodeResult / StatePatch。Rust 内核统一校验后再执行。**

翻译一下：模型能干的事只有"提建议"。建议提给 Rust 内核，内核校验、编译、调度，全过了才执行。

为什么这条原则这么重要？因为 LLM 是出错的、幻觉的、不稳定的。如果你让 LLM 直接控制运行时，你的 Agent 就是一个会乱跑的小孩。

rgraph 里，Agent Loop 每一步只能输出三种动作之一：

```
pub enum AgentAction {
    CallTool { tool_id: String, arguments: Value },
    Complete { result: Value, state_patch: StatePatch, graph_patch: Option<GraphPatch> },
    Fail { reason: String, retryable: bool },
}
```

不接受自由文本控制命令。模型可以附解释文本，但执行器只读取结构化字段。

这条约束让 Agent 的行为变得可预测。LLM 想"我顺手把那个文件删了吧"——它做不到。它没有这个权限。它只能通过 `CallTool` 调一个授权过的工具，工具的权限是节点 capabilities ∩ Agent 配置 ∩ 全局配置三层交集。

**模型负责想。Rust 负责兜底。**

#### 动态修图（GraphPatch）—— Agent 在跑的过程中能改图纸

这是 rgraph 最硬核的功能，也是它和 LangGraph 那种"静态图"框架的本质区别。

![Image](https://mmbiz.qpic.cn/mmbiz_png/sc9vl5waw2r4ibClBgl7hibYRfwsdDkZibMrpYEYjWY3X1Csg08r8N1AD0vGHoMC5hD1S2oMHwMzmREoKibyRMoWZGFxjVAYEEDLzia8xibrj2GrM/640?wx_fmt=png&from=appmsg#imgIndex=1)

讲一个具体场景。我跑一次架构评审，图长这样：

```
analyze_requirement（解析需求）
       ├─→ architecture（架构分析）  ─┐
       ├─→ performance（性能分析）   ─┼─→ join_analysis ─→ final_report（critic 评审）
```

`final_report` 节点跑的是 critic agent。critic 看完上游汇总，觉得"这个方案内存有限制但没分析过，得补一个内存风险分析"。

传统做法是什么？要么 critic 直接在 result 里写"建议补充内存风险分析"，把球踢回给人。要么整个流程重启，重新规划。

rgraph 的做法是：critic 在 Complete 的同时，附上一个 `graph_patch` 字段：

```
{
  "action": "complete",
  "result": { "verdict": "approved_with_risks" },
  "state_patch": { "operations": [{"op":"add","path":"/result","value":{"verdict":"approved_with_risks"}}] },
  "graph_patch": {
    "base_revision": 1,
    "reason": "补充内存风险分析",
    "operations": [
      {"op":"add_node","node":{"id":"memory_risk","kind":"agent","agent":"worker","task":"分析内存风险","reads":["result"],"writes":["/analysis/memory_risk"]}},
      {"op":"add_edge","edge":{"from":"final_report","to":"memory_risk"}}
    ]
  }
}
```

模型在跑的过程中，自己给图加了一个节点和一条边。

但模型只是提议。Rust 内核收到这个 patch，要走一遍严格校验：

- • `base_revision` 必须和当前版本一致（防止基于陈旧图改）
- • 不能修改已 Succeeded/Failed 的节点（C-15）
- • 不能创建非法环（Kahn 算法检测）
- • 不能引入未注册的 Agent 或 Tool
- • 单次新增节点不超过 16
- • 单次 patch 操作不超过 32
- • 不能超过最大图版本数（默认 16）

校验全过，复制一份候选图， **重新编译** （compile 会再跑一遍拓扑、环检测、写冲突、可达性），编译过了 bump graph revision，写 `graph.v0002.md` ，切换当前图版本，新节点跑起来。

校验不过？写一个 `GraphPatchRejected` 事件，但 **节点不因此失败** ——critic 可以根据拒绝原因再规划一次。

这套机制的意义在于： **Agent 拥有了"自我完善"的能力，但这种能力是被约束的。** 它不能乱改历史，不能把图改成畸形，不能把预算烧穿。

这个能力是我之前在 Hermes 上一直没做出来的。LangGraph 也没做。AutoGen 也没做。这是 rgraph 真正往前走的一步。

#### 并行确定性是 Graph Engineering 最难的工程问题

并行确定性是 Graph Engineering 最难的工程问题，没错。

四个分析节点并行跑，谁先完成是不确定的。如果谁先完成谁先写状态，最终状态就不确定——同样的输入，跑两次结果不一样。

这件事在传统并发编程里也有，叫 race condition。但传统方案是加锁。加锁在 Agent 场景不行——你不能让架构分析节点等性能分析节点释放锁，那就失去并行意义了。

rgraph 的解法是把"读"和"写"彻底分开：

> **节点不能直接持有全局状态的可变引用。它只能：1. 读取不可变 StateSnapshot。2. 返回 StatePatch。3. 由确定性 Reducer 应用补丁。**

每个节点声明 `reads` 和 `writes` 。架构分析节点 reads=\["analysis.requirement"\]，writes=\["analysis.architecture"\]。性能分析节点 writes=\["analysis.performance"\]。两个节点写的路径不冲突，编译时就允许并行（C-12）。

，时长00:02

<video src="https://mpvideo.qpic.cn/0bc36uahqaaakqaejk3rvjvfb5odpd2qa6aa.f10002.mp4?dis_k=167f333bf075c036232805a7fce59996&amp;dis_t=1785832747&amp;play_scene=10120&amp;auth_info=a6zXr6F2VEUX0KiguAQZCDdoEBZjZUZhMDZRaGccf0tQPzlBXl1PCGAQaEYYaxQoI2I=&amp;auth_key=764170a52dc43a15a09c0ed9a3143157&amp;vid=wxv_4634097154003664901&amp;format_id=10002&amp;support_redirect=0&amp;mmversion=false" controls="">Your browser does not support video tags</video>

节点跑完，返回一个 StatePatch——一组 Set / Append / MergeObject / Remove 操作。Reducer 拿到这个 patch，校验路径在 writes 范围内、不允许写 `/input` 和 `/runtime` 、MergeObject 目标必须是对象，校验全过了才合并到全局状态。

合并顺序是固定的，跟完成顺序无关：

```
graph_revision → topo_rank → priority → node_id → attempt
```

也就是说，即使性能节点比架构节点先返回 50 毫秒，最终合并时还是先合架构后合性能（因为它们在同一拓扑层，按 node\_id 字典序）。

如果两个节点写同一路径怎么办？默认 Reducer 是 Replace，禁止并行 Replace。但你可以显式声明 Reducer：

```
pub enum ReducerKind {
    Replace,
    AppendArray,
    MergeObject,
    SetUnion,
    MaxNumber,
    MinNumber,
}
```

比如四个 worker 节点都要写 `/analysis/scores` ，你声明 Reducer 是 `AppendArray` ，那它们的输出会被确定性地追加到数组里——追加顺序按上面那个固定顺序。

这套设计让 rgraph 拥有了一个非常硬的保证（SPEC G-01）：

> **同一份图、相同输入、相同节点输出事件，应得到相同的状态演进与调度结果。**

不管你跑多少次，不管节点完成顺序如何，最终状态一样。这件事在生产环境里意味着： **你可以 replay。** 出了 bug 你能复现。

#### Agent 跑长任务最大的痛点之一：跑到一半进程挂了怎么办？

rgraph 的答案分两部分。

**第一部分：JSONL 事件存储。** 所有状态变化先写 `session.jsonl` ，再更新内存。追加写入，不修改，不删除。关键事件（GraphPatchAccepted / StatePatchAccepted / NodeCompleted / RunCompleted / Checkpoint）写完后调 `sync_data` 强制落盘。

这个文件就是整个 run 的唯一事实源。 **没有数据库。** 没有 SQLite，没有 PostgreSQL，没有 Redis。

为什么不要数据库？因为数据库对 Agent 场景是过度设计。Agent 一次 run 的所有事件，几十 KB 到几 MB，序列化成 JSONL 就够了。引入数据库，你就要管理连接池、迁移、版本兼容、并发写入。这些复杂性对单机 Agent 没价值。

**第二部分：resume。** 进程退出后， `rgraph resume <run_id>` 会：

1. 1\. 读 session.jsonl。
2. 2\. 找到最后一个完整 Checkpoint。
3. 3\. 从该事件之后继续重放。
4. 4\. 重建 RunState（图版本、节点状态、全局状态、已消耗预算）。
5. 5\. 状态为 `Running` 的节点标记为 `Interrupted` ，重新进入 Pending。
6. 6\. 状态为 `Succeeded` 的节点 **永不重跑** ——这是核心。跑了 200 步、用了 8 万 token 的成果不能丢。
7. 7\. 继续调度未完成节点。

我的验收场景里有一条： **"进程在执行中被终止后可以恢复。恢复后成功节点不重复执行。"** 我在 DeepSeek API 上实测过——kill -9 进程，resume 后接着跑，最终结果跟不 kill 的版本一致。

还有一个能力叫 `replay` ——只读 session.jsonl，不调模型不调工具，把所有事件重放一遍，验证最终状态。这条要求"只读取 session.jsonl 和 graph revision 文件即可重建最终状态"，rgraph 做到了。

**某些时候，在 Agent 场景里，数据库是负债。追加写入的日志才是基础设施。没必要引入过度复杂，除非有真有必要**

这不是炫技。这是工程取舍。

每多一个依赖，你就多一份安全面、多一份升级负担、多一份"上游弃坑"的风险。Agent 这种长生命周期项目，依赖越少越值钱。

代价当然有——我手写了一个 Kahn 拓扑排序，花了大概 60 行 Rust。但这是 5 年都不会变的 60 行。换 petgraph 我得持续追它的版本。

**少即是多。** 这套哲学 Hermes 在用，rgraph 接着用。

#### 六重约束的 Agent Loop，预算不是省钱，是给 Agent 设的硬护栏

每个 Agent 节点内部跑一个 Loop，但这个 Loop 是受六重约束的（LoopPolicy）：

```
pub struct LoopPolicy {
    pub max_steps: u32,           // 步数上限
    pub max_model_calls: u32,     // 模型调用次数
    pub max_tool_calls: u32,      // 工具调用次数
    pub max_tokens: u64,          // token 预算
    pub timeout_ms: u64,          // 超时
    pub no_progress_limit: u32,   // 无进展上限
}
```

每个 Agent Markdown 文件里都可以声明自己的 LoopPolicy。比如 planner 默认是 4 步 4 次模型调用，worker 默认 6 步 8 次工具调用，critic 默认 4 步 4 次工具调用。

最值钱的是 `no_progress_limit` 。一个 Loop 怎么判断"它卡住了"？参考五条信号：

- • 连续返回同一个工具和相同参数
- • 连续两次观察摘要一致
- • StatePatch 为空
- • 没有新增 Artifact
- • 模型重复相同错误

任一情况累计一次"无进展"。达到上限节点失败，失败原因写 `AgentLoopNoProgress` 。

这条机制比单纯的 max\_steps 高级得多。max\_steps 防"暴走"，no\_progress 防"自言自语"。生产 Agent 翻车一半都是因为自言自语——LLM 在"我是不是该再做点什么"和"算了不做了"之间反复横跳，token 烧光。

加上全局预算（max\_model\_calls / max\_tool\_calls / max\_total\_tokens / max\_run\_time\_ms / max\_graph\_revisions），rgraph 的预算系统是两层的——全局预算 + 节点预算。节点预算不得超过全局剩余预算。预算预留发生在节点进入 Running 之前，多个 Ready 节点预算总和超过剩余时按优先级排队。

**预算不是省钱，是给 Agent 设的硬护栏。** 没有 budget 的 Agent 是无底洞。

### 重点来了，单 Loop Agent vs Graph Agent

讲到这里，可以用一张对照表把"为什么要从 Loop 走到 Graph"说清楚。

| 维度 | 单 Loop Agent | Graph Agent（rgraph） |
| --- | --- | --- |
| 任务复杂度 | 一个目标，一条路径 | 一个目标，多分支并行 + Join |
| 控制流 | LLM 决定每一步 | 图决定大结构，LLM 只决定节点内 |
| 状态管理 | 一个会话窗口 | 每节点独立窗口 + reads/writes 声明 |
| 失败恢复 | 整个 run 重来 | 单节点重试，Succeeded 不重跑 |
| 预算控制 | 一个池子 | 全局预算 + 节点预算两层 |
| 可观测性 | 看消息流 | 看图节点状态 + JSONL 事件流 |
| 改图能力 | 不存在 | 运行中可由 Critic 提交 GraphPatch |
| 上下文成本 | 累积爆炸 | 节点隔离，只读 reads 路径 |
| 调试难度 | 黑盒 | replay 重放，确定性复现 |

这张表是骨架级的。一个 Agent 项目要不要从 Loop 走到 Graph，把这张表过一遍就清楚了。

如果你的任务是"翻译这段话"、"总结这篇文章"、"回答这个 FAQ"——单 Loop 完全够用，别上 graph，过度工程。

如果你的任务是"评审一个技术方案"、"调研一个领域并出报告"、"重构一个模块"——单 Loop 不够。这种任务天然有结构，需要拆。

### 讲了这么多"该这么做"，必须说几句"什么时候别这么做"。

**第一，不是所有任务都需要 Graph Engineering。** 翻译、摘要、单轮问答、单文件改写——单 Loop 都能搞定，别上 graph。一个 graph 的编译成本、状态隔离成本、调度成本都不低。 **工程复杂度应该匹配业务复杂度。** 周末 demo 别上 rgraph。

**第二，动态修图对模型要求高。** 弱模型提不出合法的 GraphPatch——它会忘了填 `base_revision` 、会试图改已完成节点、会写出非法 JSON。rgraph 在 DeepSeek-v4-flash 上跑得通，但用更小的模型得自己测。 **GraphPatch 不是免费午餐，它把规划负担转嫁给了模型能力。**

### 写在最后

写完这篇的一个感受： **Graph Engineering 是 Agent 工程从"个体户"到"公司化"的转折点。**

前四个阶段，Agent 都是"个体户"——一个 Agent 配备好 prompt、context、harness、loop，就能出去接活。

第五个阶段开始，Agent 需要"公司化"——有规划、有分工、有评审、有调度、有改图能力、有崩溃恢复。这不是一个 Agent 干活，是一支队伍干活。

公司化意味着什么？意味着 **控制权要从模型手里，回到工程手里。**

模型再聪明，它也是会犯错的智能体。一个会犯错的智能体，不能让它直接控制运行时。它能做的只是"提建议"。建议提给一个确定性的内核，内核校验、调度、合并、恢复。

**模型负责想。Rust 负责兜底。**

模型是大脑。Rust 是项目经理。

一支会自己改图纸的工程队。这才是 Agent 该有的样子。

朋友们，Agent 的下一站不是更大的模型。是更稳的运行时。

项目地址：https://github.com/coder-brzhang/rust\_graph\_agent

注意，本项目仅在小张的 600 多个人的小群（公众号菜单-联系我-加群）中分享。