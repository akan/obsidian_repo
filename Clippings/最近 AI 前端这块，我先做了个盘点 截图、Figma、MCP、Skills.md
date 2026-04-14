---
title: "最近 AI 前端这块，我先做了个盘点：截图、Figma、MCP、Skills"
source: "https://mp.weixin.qq.com/s/dH1M_sWiORR4sC0sOxaeaA"
author:
  - "[[Aitrainee]]"
published:
created: 2026-04-13
description: "一份实用清单：Figma/Stitch、视觉参考、MCP 与四类热门技能"
tags:
  - "中间层"
  - "设计语义"
  - "执行规则"
  - "视觉参考"
  - "上下文传输"
  - "能力模块"
abstract: "本文盘点了当前AI前端开发工作流中，用于连接人类意图与AI代理的六种主要中间介质，包括AGENTS.md、DESIGN.md、Figma、截图、MCP和Skills，并分析了它们各自争夺的“中间层解释权”及其在链路上的不同角色。"
---
Original Aitrainee *2026年4月13日 16:34*

挖了一圈最近 [AI 前端开发](https://mp.weixin.qq.com/s?__biz=MzkyMzY1NTM0Mw==&mid=2247515018&idx=1&sn=efb5e3d59b178f936a901759511ab733&scene=21#wechat_redirect) 这块的东西，大概能看到几个比较常出现的“中间层”，随手记一下：

- 1\. AGENTS.md（执行规则）
- 2\. DESIGN.md（设计语义）
- 3\. Figma / Stitch（设计协作）
- 4\. 截图 / 视觉参考（快速输入）
- 5\. MCP（上下文传输）
- 6\. Skills（执行能力）  
	\- Anthropic frontend-design  
	\- Vercel web-design-guidelines  
	\- UI UX Pro Max  
	\- 21st.dev Magic MCP

## 一： Skills

## 指导层 1：Anthropic frontend-design

原始链接：  
\- https://github.com/anthropics/skills  
\- https://github.com/anthropics/skills/tree/main/skills/frontend-design  
\- https://docs.anthropic.com/en/docs/claude-code/skills  
\- https://www.anthropic.com/engineering/harness-design-long-running-apps

**当前可见指标**  
截至 2026-04-10，anthropics/skills：- GitHub stars：114,099  

它在图谱里的角色：frontend-design 不是样本库，也不是 DESIGN.md 格式定义。 它更像： *审美与实现指导层* 。

它告诉 agent：  
\- 不要生成通用 AI 味页面  
\- 先确定审美方向  
\- 重视字体、颜色、空间、动效、布局张力  
\- 生成可工作的前端代码

它和 awesome-design-md 的关系：  
\- frontend-design：教 agent 怎么“做得更像设计师”  
\- awesome-design-md：给 agent 一个现成设计系统样本  
**一个像教练，一个像参考库** 。

---

## 指导层 2：Vercel web-design-guidelines

原始链接：  
\- https://github.com/vercel-labs/agent-skills  
\- https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md  
\- https://github.com/vercel-labs/web-interface-guidelines

**当前可见指标**  
截至 2026-04-10，vercel-labs/agent-skills：- GitHub stars：24,804  

Vercel 写的，我觉得也值得收藏。

它在图谱里的角色：这一层更偏 *审查 / 审核 / 评估规则层* 。它不是像 frontend-design 那样更偏生成时的美学引导，也不是像 awesome-design-md 那样给你现成风格样本。 它更像在说：你的 UI 做完以后，拿这套规则再过一遍。

它和其他节点的关系：  
\- 和 Anthropic frontend-design：都属于 skill/guideline 层，但一个更偏生成，一个更偏 review  
\- 和 awesome-design-md：不是同类，一个给样本，一个给审核框架  
\- 和 Claude Code / Codex：天然适合作为 agent 的 review 第二轮  
所以这层放进工作流里，位置通常在生成之后而不是生成之前。

---

## 指导层 3：UI UX Pro Max

原始链接：  
\- https://github.com/nextlevelbuilder/ui-ux-pro-max-skill  
\- https://www.uupm.cc/

**当前可见指标**  
截至 2026-04-10：  
\- GitHub stars：62,087  

README 可见主张：它在 README 里把自己定位成：161 个 reasoning rules、67 个 UI styles、161 个 color palettes、57 个 font pairings、99 个 UX guidelines、可生成 design-system/MASTER.md + pages/\*.md。

它在图谱里的角色：它已经不只是一个“提示词包”了。 更像： *设计决策引擎 / 设计推理层* 。它试图在用户给出产品类型之后，自动给出：适合的 landing page pattern、适合的 style、适合的配色、适合的字体、应避免的 anti-pattern。

它和 awesome-design-md 的关系：两者都在帮助 agent 做前端更像样，但切入点不同：  
\- awesome-design-md：从真实网站反向抽取设计系统  
\- UI UX Pro Max：从规则库和风格库正向推荐设计系统  
所以它们更像： **一个偏样本复用，一个偏规则推理** 。

---

## 执行增强层：21st.dev Magic MCP

原始链接：  
\- https://github.com/21st-dev/magic-mcp  
\- https://21st.dev/magic  
\- https://21st.dev/mcp  
\- GitHub stars：4,684 / forks：321 / open issues：30 / watchers：21

README 可见主张：它更强调通过自然语言直接生成 UI 组件，作为 MCP server 接入 Cursor / Windsurf / VS Code / Cline / Claude，组件直接进入项目，依托 21st.dev 的组件资产。

它在图谱里的角色：如果说 awesome-design-md 更像“给 agent 喂设计系统文本约束”， 那 21st.dev Magic MCP 更像： *直接产出组件的 UI 生成服务器* 。所以它的重心不是 DESIGN.md 这种中间描述格式，而是：prompt -> MCP -> component code。

它和 awesome-design-md / UI UX Pro Max 的关系：  
\- 和 awesome-design-md：一个偏“文本设计系统输入”，一个偏“组件直接生成”  
\- 和 UI UX Pro Max：一个偏“怎么判断该长什么样”，一个偏“直接把它做出来”  
所以它经常会和别的 skill 一起出现，而不是单独作为唯一上游。

社区信号：OpenCLI 实跑里：  
\- X：2025-05-29 有帖子介绍 21st.dev 的 Magic MCP / Magic Chat，289 likes / 18,471 views  
\- X：2025-02-20 有帖子直接夸 21st dev 的 Magic MCP，32 likes / 7,469 views  
\- Reddit：Generate Sick UI Components with Cline + 21st.dev Magic UI 这类帖子已出现  
这层信号指向的不是“格式定义”，而是： **好用的执行器** 。

---

原始链接：  
\- https://github.com/VoltAgent/awesome-design-md 仓库形态  
\- https://getdesign.md 浏览与请求入口

它在图谱里的角色：这一层做的是：从真实网站里抽设计语言、写成 DESIGN.md、附 preview.html / preview-dark.html、让 agent 可以直接复制进项目使用。

## 二、谁在争夺 AI 前端中间层

在 AI 前端工作流里，到底哪些东西在争夺“中间层解释权”。

这里的“中间层”指的不是模型，也不是最后的页面代码。 而是：人类的设计意图，最后是通过什么介质，被 agent 稳定接住。

现在至少有6种东西在争这层解释权：  
1\. AGENTS.md  
2\. DESIGN.md  
3\. Figma、Stich类  
4\. 截图 / 视觉参考  
5\. MCP  
6\. Skills

更准确地说：  
\- AGENTS.md 在争“执行规则”的中间层  
\- DESIGN.md 在争“设计语义”的中间层  
\- Figma 在争“设计探索与协作画布”的中间层  
\- 截图 / 视觉参考 在争“最快视觉还原输入”的中间层  
\- MCP 在争“上下文传输与调用”的中间层  
\- Skills 把这些输入真正变成代码的能力模块

真正的局面： **不同中间介质，正在切同一条链的不同截面。**

## 选手 1：AGENTS.md

原始链接：https://developers.openai.com/codex/guides/agents-md  
截至 2026-04-10，OpenAI 官方已经明确写：Codex 会在工作前读取 AGENTS.md，可以通过层级覆盖继承指导，这套东西用来给 agent 提供持续的项目说明。

它在争什么：它争的不是“页面长什么样”。 它争的是：agent 应该怎么做事。所以它天然擅长：目录约束、工作方式、审批 / 测试 / 文档规则、团队协作偏好。

它不擅长什么：它不天然擅长色彩、排版、按钮视觉、页面气质。所以 AGENTS.md 是执行中间层，不是设计中间层。

## 竞争者 2：DESIGN.md

原始链接：  
\- https://stitch.withgoogle.com/docs/design-md/overview/  
\- https://github.com/google-labs-code/stitch-skills  
\- https://github.com/VoltAgent/awesome-design-md

截至 2026-04-10，Google Stitch 把 DESIGN.md 定义成 agent 可消费的设计中间格式。awesome-design-md 则把这层格式喂上了大量真实网站样本。

它在争什么：它争的是：页面应该长什么样。而且它的最大特点不是视觉保真度本身，而是：纯文本、可版本化、可进仓库、可被 agent 长期读取、不依赖截图和专有画布。

社区传播信号：有一条非常典型：8,006 likes / 1,399,873 views。这条帖子的传播话术很关键：Not screenshots, Not Figma links, A single DESIGN.md file。这说明社区已经把 DESIGN.md 看成：对截图流和 Figma 链的一种替代性中间层。

它的强项：自然语言和结构化之间的平衡、适合 agent、适合项目长期沉淀。它的弱点：不如 Figma 直观、不如截图直接、不如 token 精确。所以它争到的是： **可被 agent 长期消费的设计语义层** 。

## 竞争者 3：Figma、Stich类

原始链接：  
\- https://developers.figma.com/docs/figma-mcp-server/  
\- https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/  
\- https://developers.openai.com/blog/building-frontend-uis-with-codex-and-figma  
\- https://developers.openai.com/codex/use-cases/figma-designs-to-code

官方定义：截至 2026-04-10，Figma 开发者文档已经明确把 Figma MCP server 定义成：给 AI agent 提供设计上下文、允许 agent 往 Figma 画布写内容、支持 get\_design\_context、支持 generate\_figma\_design、支持 search\_design\_system、支持 use\_figma。

OpenAI 和 Figma 联合那篇博客则更进一步，把这条线写成：Codex <-> Figma canvas，而且是双向：从 Figma 拉设计上下文进代码、从运行中的 UI 反推回 Figma 画布。

它在争什么：Figma 争的不是纯执行规则，也不是纯文本语义。 它争的是：设计探索与协作画布。也就是说，Figma 最大的优势不是“它最适合 agent 读”。 而是：设计师熟、可视化强、适合多人讨论、适合探索和比较多个方向。

## 竞争者 4：截图 / 视觉参考

原始链接：https://developers.openai.com/codex/use-cases/frontend-designs  
官方定义：截至 2026-04-10，OpenAI 官方 frontend-designs 用例页明确写的就是：screenshots、short design brief、references for inspiration。然后让 Codex 去实现，再用 Playwright 比对。

它在争什么：截图流争的是：最快的视觉输入权。因为它的好处非常明显：最直观、最低门槛、最快开始、对用户最自然。它的弱点：不可版本化、语义弱、细节和规则靠模型自己猜、难以形成长期资产。所以截图流适合短平快还原，但不适合长期设计系统沉淀。

## 竞争者 5：MCP

原始链接：  
\- https://developers.figma.com/docs/figma-mcp-server/  
\- https://github.com/google-labs-code/stitch-skills  
\- https://github.com/21st-dev/magic-mcp

它到底是不是“中间介质”：严格说，MCP 不是内容格式。 它更像：上下文运输协议。但它仍然在争中间层，因为现在很多“中间层权力”已经不只来自文件本身，而来自：谁能被 agent 直接调用、谁能直接把上下文塞进 agent、谁能把结果写回工具。

它在争什么：MCP 争的是：调用权和接入权。比如：Figma MCP 把设计画布接进 agent，Stitch skills 把 design-md 工作流接进 agent，21st.dev Magic MCP 把组件生成接进 agent。关键判断：所以 MCP 不是另一个 DESIGN.md。 它是让不同中间介质真正“可用起来”的运输层。

**真实分工压成最短对照就是：**

- AGENTS.md：告诉 agent 怎么做
- DESIGN.md：告诉 agent 应该长什么样
- Figma：让人和 agent 在画布里探索与协作
- 截图：让 agent 快速模仿一个目标
- MCP：让这些上下文能被 agent 调进来、送出去

> 最后，Codex 在这条设计链上的案例，目前不如 Claude Code 样本多。OpenAI 官方公开材料里，没有找到一个足够稳、足够公开、足够像 Anthropic frontend-design 或 Google Stitch design-md 对位的明确“官方设计中间层节点”。

**[Google Design.md：一键复刻60+大厂设计规范 ｜ 设计界的事，能叫偷吗](https://mp.weixin.qq.com/s?__biz=MzkyMzY1NTM0Mw==&mid=2247515018&idx=1&sn=efb5e3d59b178f936a901759511ab733&scene=21#wechat_redirect)** **🌟 知音难求，自我修炼亦艰，抓住前沿技术的机遇，与我们一起成为创新的超级个体（把握AIGC时代的个人力量）。**

**点这里👇关注我，记得标星哦～**

**微信扫一扫赞赏作者**

继续滑动看下一个

AI进修生

向上滑动看下一个