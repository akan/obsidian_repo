---
title: "一文读懂 Claude Skills 如何重塑 AI 智能体架构"
source: "https://mp.weixin.qq.com/s/NTu4EotmEsjQ72o9TX2jyQ"
author:
  - "[[雨杨先生]]"
published:
created: 2025-12-09
description: "告别冗长的提示词！本文详解 Claude Skills 核心架构与实践，揭秘如何通过“能力封装”实现模块化 AI 开发，厘清其与 MCP 的本质区别，助你打造更强大的智能工作流。"
tags:
  - "模块化"
  - "可重用"
  - "渐进式披露"
  - "智能体架构"
abstract: "Claude Skills 是一种通过模块化、按需加载的文件目录结构来封装专业知识和工作流，以解决长上下文限制和提升AI智能体效率的革新性技术。"
---
Original 雨杨先生 *2025年12月5日 09:07*

开发者大多习惯用“系统提示词”将海量的背景知识、业务规则和操作指南直接注入对话，但却遇到上下文窗口的限制、高昂的成本，以及“迷失中间”（Lost-in-the-middle）问题，即模型难以精确遵循长上下文中的指令。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Z1HibC1123BAS8SyT3NwDvspOD9kPYWESYe9KZdE5m7qiagibeR8sAEnY6kZd6ibFTmvv6kS9zbPHWvAOgPSbQd3Ew/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

  

**Claude Skills** 正是 Anthropic 最新应对这一挑战的解决方案。它并非一个简单的功能，而是换了一种思路。其核心逻辑就是像人一样使用电脑，能够与文件系统交互、阅读操作手册、并执行脚本。

这种“文件系统即上下文”的设计思路，标志着 AI 架构从“云端服务调用”向“本地化智能计算”的重要转变。Skills 将这种想法具体化，允许我们将知识、工作流和专业技能封装成可移植、可组合的即插即用模块。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Z1HibC1123BAS8SyT3NwDvspOD9kPYWESR2oOc8hg9CAbaZKvFumAcmNxgtHicXUNJGGGqFHk9Yx3PKy6TqHbWxw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

  

本文将为您全面解析 Claude Skills，内容涵盖其核心架构、构建与使用的实践指南、与其他关键 AI 概念的对比，以及应用案例。让我们一同探索这一革新性的技术。

### 什么是 Claude Skills？

Claude Skills 是模块化的、可重用的能力包，它将专业知识、工作流程和领域专长封装在简单的文件目录结构中。本质上，一个 Skill 就是一个包含指令、元数据、可选脚本和资源的文件夹，Claude 可以在需要时动态加载并执行，从而扩展其原生能力。

Claude Skills 的核心价值在于其独特的设计，为 AI 应用开发带来了前所未有的灵活性和效率。

**可组合性:**多个独立的 Skills 可以协同工作。Claude 能够根据任务需求，自动识别并协调使用多个 Skills 来完成复杂的工作流。

**可移植性:**Skills 采用一致的格式标准，可以在所有 Claude 产品中无缝使用，无论是本地的 Claude Code 命令行工具、网页版的 Claude.ai，还是通过 API 进行集成。一次开发，随处部署。

**高效性:**Skills 遵循“按需加载”原则，只有在被用户请求触发时，其核心内容才会被加载到上下文窗口中。这极大地节约了宝贵的 Token 资源，确保了模型的响应速度和成本效益。

**强大性:**Skills 可以包含可执行的代码脚本（如 Python、Bash、Nodejs），这使得它们能够处理需要确定性、高可靠性的任务，例如精确的数据计算或格式转换，完美地结合了 AI 的推理能力与传统编程的稳定性。

理解了 Skills 的价值所在，接下来我们将深入其内部，揭示其高效运作的技术架构。

### 核心架构：揭秘 Skills 的工作原理

Claude Skills 的精妙之处在于其高效且智能的架构，该架构旨在智能地管理上下文，并确保代码在安全的环境中执行。其工作原理可以分解为三个核心组件：文件系统基础、渐进式披露机制和安全沙箱。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/Z1HibC1123BAS8SyT3NwDvspOD9kPYWESfvqggeibWI6qQ9WmCicshO6WglPgO0W1gv1z9ic0faBicnmroUQGCtGVtw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

### 文件系统基础

从物理结构上看，一个 Skill 就是一个简单的文件目录。这种设计使其非常易于创建、管理和通过版本控制系统（如 Git）进行共享。一个生产就绪的 Skill 通常包含以下结构：

```
my-skill/
├── SKILL.md        # 必需：核心指令与元数据
├── REFERENCE.md    # 可选：详细参考文档
├── EXAMPLES.md     # 可选：更丰富的使用示例
├── scripts/        # 可选：可执行脚本 (Python, Bash)
│   └── helper.py
└── templates/      # 可选：模板文件 (例如报告模板)
    └── report.md
```

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### “渐进式披露” 机制

这是 Skills 架构中最具创新性的部分，它模仿了人类专家查阅资料库的方式：先看索引，再读摘要，最后才深入细节。这个过程分为三个阶段，极大地优化了上下文窗口的使用。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**阶段一：索引与发现**

当 Claude 启动时，它只会扫描并加载所有可用 Skills 的 `SKILL.md` 文件头部的 YAML 元数据，主要是 `name` 和 `description` 字段。这相当于为 Claude 创建了一个极低 Token 占用的“能力索引”，使其知道自己拥有哪些技能。当用户发出请求时，Claude 利用这个索引进行语义路由，快速判断哪个 Skill 与当前任务最相关。

**阶段二：激活与加载**

一旦匹配到合适的 Skill，例如用户请求“帮我审查这段代码”时匹配到 `code-reviewer` Skill，Claude 才会去读取该 Skill 的完整 `SKILL.md` 文件内容，将其详细的工作流程、规则和示例加载到当前的对话上下文中。只有被激活的这一个 Skill 的指令占用了上下文空间。

**阶段三：按需执行**

如果 Skill 的指令要求运行一个脚本来完成特定任务，该脚本将在隔离的沙箱中执行。最关键的是，这种设计实现了计算和数据密集型任务的卸载 (Offloading)：只有脚本的输出结果（例如分析报告或状态码）会被返回并注入到上下文中，而不是脚本的源代码或处理的原始数据。这为处理大数据和复杂计算节省了海量的 Token，让 LLM 专注于其核心优势：推理与编排。

### 安全沙箱环境

由于 Skills 可以执行代码，安全性至关重要。所有脚本都在一个隔离的容器（Sandbox）中运行，该容器具有受控的文件系统访问权限，并且默认网络访问受限。开发者还可以通过在 Skill 元数据中设置 `allowed-tools` 字段，进一步限制其可用的底层能力（如只允许读取文件，禁止写入），从而实现权限最小化，增强安全性。

理解了这套优雅的架构后，让我们进入实践环节，亲手构建一个属于自己的 Skill。

### 实践指南：如何编写、发布和使用 Skills

构建一个高质量的 Skill 是清晰指令编写与智能代码封装的结合。本节将提供一个从零到一的完整指南。

### 编写你的第一个 Skill

#### SKILL.md：Skill 的大脑

`SKILL.md` 文件是 Skill 的核心，它包含了定义其行为的所有信息。

**YAML Frontmatter (元数据):**文件顶部的 YAML 块是 Skill 的“身份证”，其中 `name` 和 `description` 最为关键。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> 最佳实践: description 是 Claude 进行语义路由的唯一依据。一个好的描述必须清晰地说明其功能和触发条件，通常使用类似“使用时机：当用户要求检查安全漏洞、寻找硬编码凭证或进行合规性审查时……”的句式。

**Markdown 正文:**正文部分是写给 Claude 看的“操作手册”。使用结构化的 Markdown 能让 Claude 更稳定地遵循指令。

#### 集成可执行代码

当任务需要确定性结果时，脚本是最佳选择。例如，创建一个简单的 Python 脚本来处理数据：

```
# scripts/process_data.py
import sys, json
# ...处理逻辑...
print(json.dumps({"status": "success", "items_processed": 100}))
```

在 `SKILL.md` 中，你可以这样指示 Claude 调用它：  

```
## 执行处理
请运行以下命令来处理数据，并将结果返回给我。

\`\`\`bash
python scripts/process_data.py input.json
\`\`\`
```

### 发布与分发 Skill

Skills 可以通过多种方式进行存储和共享，以适应不同的协作需求。

**个人 Skills:**存储在 `~/.claude/skills/` 目录下。这些 Skills 对您个人在任何项目中都可用，非常适合封装您自己的常用工作流。

**项目 Skills:**存储在项目根目录下的`.claude/skills/` 目录中。这些 Skills 会通过版本控制系统（如 Git）与团队共享，确保团队成员使用统一的工具和标准。

**插件市场:**任何一个包含`.claude-plugin/marketplace.json` 清单文件的 Git 仓库都可以作为一个去中心化的插件市场。团队或社区可以创建一个仓库来托管一系列 Skills，其他用户通过一条命令即可添加该市场并安装其中的 Skills。

### 在不同环境中使用 Skill

**在 Claude Code (CLI) 中使用**  
通过简单的 `/plugin` 命令，您可以轻松管理和使用来自市场的 Skills。

```
# 添加一个 GitHub 上的市场
/plugin marketplace add anthropics/skills

# 从该市场安装一个 Skill
/plugin install code-reviewer@anthropics/skills
```

**通过 API 使用**  
在 API 调用中，您可以通过 `container` 和 `skills` 参数来指定使用哪些 Skills。

**1\. 使用 Anthropic 托管的预置 Skill**

```
import anthropic
client = anthropic.Client(api_key="YOUR_API_KEY")

response = client.beta.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=4096,
    betas=["code-execution-2025-08-25", "skills-2025-10-02"],
    container={
        "skills": [
            {"type": "anthropic", "skill_id": "xlsx", "version": "latest"}
        ]
    },
    messages=[{"role": "user", "content": "分析这份销售数据"}],
    tools=[{"type": "code_execution_20250825", "name": "code_execution"}]
)
print(response.content)
```

**2\. 使用您自己上传的自定义 Skill**

```
response = client.beta.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=4096,
    betas=["code-execution-2025-08-25", "skills-2025-10-02"],
    container={
        "skills": [
        {
            "type": "custom",
            "skill_id": "skill_01AbCdEfGhIjKlMnOpQrStUv",
                "version": "1.0.0" # 推荐在生产环境固定版本
        }
        ]
    },
    messages=[{"role": "user", "content": "使用我的自定义 Skill 处理这份报告。"}],
    tools=[{"type": "code_execution_20250825", "name": "code_execution"}]
)
```

**3\. 组合使用多个 Skills**

```
response = client.beta.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=4096,
    betas=["code-execution-2025-08-25", "skills-2025-10-02"],
    container={
        "skills": [
            {"type": "anthropic", "skill_id": "pdf", "version": "latest"},
            {"type": "anthropic", "skill_id": "xlsx", "version": "latest"},
            {"type": "custom", "skill_id": "skill_01AbCdEf...", "version": "1.0.0"}
        ]
    },
    messages=[{"role": "user", "content": "从这份PDF中提取数据，并创建一份Excel报告。"}],
    tools=[{"type": "code_execution_20250825", "name": "code_execution"}]
)
```

### 几个容易混淆的概念

我们来理一理 Skills 和其他的区别。

#### Skills vs. MCP

**MCP** 主要是负责 **连接** 。它像驱动程序，让 Claude 能连上数据库、GitHub 或者 Google Drive。它解决的是“能不能连上”的问题。

**Skills** 是 **操作流程** 。它包含了一套规则，教 Claude **怎么** 用这些工具去完成任务。

两者通常是配合用的：Skill 是说明书，指挥 Claude 去调用 MCP 提供的接口。

#### Skills vs. Tool Calls vs. Subagents

| 特性 | Skills | Tool Calls | Subagents |
| --- | --- | --- | --- |
| **本质** | 完整的操作手册 (SOP) | 单个动作 | 独立的外包工 |
| **主要功能** | **编排** ：决定什么时候用什么工具。 | **执行** ：比如“读取文件”这个动作。 | **委派** ：把大任务扔出去，别打扰主线。 |
| **上下文** | 加载到主对话里，Claude 学会了这个技能。 | 只是定义了工具有哪些，执行在外面。 | 有自己独立的脑子（上下文），主代理看不见它的思考过程。 |
| **适用场景** | 复杂的、多步骤的业务流程（比如代码审查）。 | 基础操作（比如查数据库）。 | 长期、独立的任务（比如“读完整个代码库写个总结”）。 |

#### 打个比方

想象 AI 是个 **主厨** ：

- **Tool Calls** 是刀、锅、勺子。
- **MCP** 是通往仓库的钥匙，能拿到食材。
- **Skills** 是 **菜谱** 。告诉厨师先切菜、再热油、最后放盐。
- **Subagents** 是 **副厨** 。主厨把配菜的任务扔给他，自己就不管了，等着拿结果就行。

在 Agentic AI 的技术版图中，存在许多看似相似的概念。本节将通过清晰的对比，阐明 Skills 的独特定位。

### 应用案例：看 Skills 如何改变工作流

本节将通过三个来自开发、运营和数据分析领域的真实案例，展示 Skills 的强大通用性。

### 案例 1：代码审查助手

**场景:**一个开发团队希望统一代码审查标准，确保每一份提交的代码都符合质量、安全和风格规范，从而减少人工审查的重复性工作。

**Skill 结构:**

```
code-reviewer/
├── SKILL.md
├── STANDARDS.md      # 详细的团队编码标准
└── scripts/
    └── lint_check.py # 自动化 linter 脚本
```

**`SKILL.md` 关键代码片段:**

```
---
name: code-reviewer
description: 审查代码变更是否符合团队标准。用于 pull request、代码提交和代码质量检查。
version: "2.0.0"
---
# 代码审查助手

## 工作流程
1. 读取用户指定的代码文件。
2. 对照 [STANDARDS.md](STANDARDS.md) 中的详细标准进行审查。
3. 运行 \`scripts/lint_check.py\` 进行自动化风格检查。
4. 以指定的格式生成审查报告。

## 输出格式
**批准** ✅ / **需要修改** ⚠️ / **拒绝** ❌

### 发现的问题：
1. [严重] 文件 X 行 Y：SQL 注入风险
2. [警告] 文件 A 行 B：缺少错误处理
```

### 案例 2：PDF 表单自动处理

**场景:**一个行政部门每天需要处理大量客户提交的 PDF 申请表，需要从中提取关键信息，进行数据验证，并生成汇总报告，过程耗时且易出错。

**Skill 结构:**

```
pdf-form-processor/
├── SKILL.md
├── scripts/
│   ├── extract_fields.py
│   └── validate_data.py
└── templates/
    └── output_report.md
```

**`SKILL.md` 关键代码片段:**

```
---
name: pdf-form-processor
description: 从 PDF 表单提取字段、验证数据并生成报告。用于处理客户申请表。
allowed-tools: [Read, Bash, Write]
---
# PDF 表单处理器

## 工作流程
1. 使用 \`scripts/extract_fields.py\` 从 PDF 中提取所有表单字段。
2. 运行 \`scripts/validate_data.py\` 检查数据的完整性和格式。
3. 使用 \`templates/output_report.md\` 模板生成人类可读的报告。

## 执行步骤
    \`\`\`bash
    python scripts/extract_fields.py input.pdf > fields.json
    python scripts/validate_data.py fields.json
    \`\`\`
## 错误处理
- 如果字段缺失，必须在报告中标记为 "需要人工审查"。
```

### 案例 3：Excel 数据分析师

**场景:**销售团队需要定期分析 Excel 销售数据，计算关键绩效指标（KPI），并生成一份包含图表和洞察的摘要报告，以支持管理层决策。

**Skill 结构:**

```
sales-analyzer/
├── SKILL.md
└── scripts/
    ├── load_excel.py
    ├── calculate_metrics.py
    └── generate_charts.py
```

**`SKILL.md` 关键代码片段:**

```
---
name: sales-analyzer
description: 分析 Excel 销售数据并生成管理报告。用于月度销售报告和业绩分析。
---
# 销售数据分析器

## 分析指标
- **核心 KPI:**
    - 总收入和增长率
    - 客户获取成本 (CAC)
    - 客户生命周期价值 (LTV)
- **区域分析:**
    - 按地区的销售分布
    - 表现最佳/最差区域

## 输出内容
-   一份包含关键洞察的管理层摘要。
-   使用 \`scripts/generate_charts.py\` 生成的可视化图表。
```

这些案例清晰地展示了 Skills 如何将复杂的、领域特定的工作流程转化为标准化的、一键可用的 AI 能力。

### Composable AI 的未来

Claude Skills 标志着我们与 AI 协作方式的一次转变——从依赖庞大而单一的提示词，演进为一种模块化、可组合、可扩展的能力构建。它将“一次性告知”的模式，升级为“一次性教会，随处使用”的模式。

展望未来，Skills 生态系统正朝着更加强大的方向发展，其路线图包括：

**增强的状态管理：** 实现跨会话的状态持久化，支持更长周期的任务。

**更丰富的工具生态：** 提供更多内置工具，并允许开发者定义自定义工具，实现更复杂的集成。

**智能 Skill 编排：** AI 能够自动组合多个 Skills 来完成更复杂的任务，实现智能参数传递和冲突解决。

**企业级治理：** 引入集中的 Skill 管理、访问控制和审计功能，满足大型组织对安全与合规的需求。

**更好的开发工具：** 通过 IDE 集成、调试工具和性能分析，全面提升开发者体验。

最终，Skills 赋予了开发者和组织一种前所未有的能力：将自身独特的专业知识和最佳实践进行编码、分发和规模化。随着生态系统的成熟，Claude Skills 有潜力成为知识工作自动化的基础设施，就像开源库之于软件开发一样重要。它使得 AI 不再仅仅是一个通用的对话工具，而是能够被塑造成一个高度专业化、与我们并肩工作的协作伙伴，共同应对未来的挑战。

  

#Claude #Skill #生成式AI #AI开发 #Agent #智能体 #大模型应用 #技术架构 #提示工程 #Toolscall #MCP

  

修改于 2025年12月6日

继续滑动看下一个

雨杨网志

向上滑动看下一个