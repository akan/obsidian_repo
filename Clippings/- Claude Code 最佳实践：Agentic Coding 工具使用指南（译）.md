---
title: "Claude Code 最佳实践：Agentic Coding 工具使用指南（译）"
source: "https://mp.weixin.qq.com/s/fBxXkVXRiEbFseH0QMUN0Q"
author:
  - "[[Boris Cherny]]"
published:
created: 2025-08-21
description: "Claude Code 最佳实践：Agentic Coding 工具使用指南（译）大家好，我是 Booker"
tags:
  - "Claude Code"
  - "最佳实践"
  - "Agentic Coding"
  - "工具指南"
abstract: "本文详细介绍了Claude Code的六大核心使用技巧，包括环境配置、工具扩展、工作流程优化、多Agent协作等，帮助开发者掌握Agentic Coding的高效编程方法。"
---
Original Boris Cherny *2025年08月04日 20:02*

## Claude Code 最佳实践：Agentic Coding 工具使用指南（译）

大家好，我是 Booker 👋

你是否觉得 AI 编程工具 **效率提升不明显** ，甚至觉得 **AI 不行** ？

面对复杂的代码库和多样的开发环境，如何让 AI 真正成为你的 **编程助手** ？

作为国内开发者，你是否也在思考如何更好地使用 **Claude Code** 等 AI 编程工具？面对 **网络环境** 、 **语言障碍** 和 **本地化需求** ，如何让这些工具真正为我们的开发工作服务？ **文末我会为你推荐一个专门为国内开发者打造的一体化解决方案。**

**这篇文章将为你揭示 Claude Code 的 6 大核心使用技巧，从环境配置到多 Agent 协作，让你从入门到精通，掌握 Agentic Coding 的真正奥义。**

今天为大家推荐一篇来自 Anthropic 官方的技术文章《Claude Code Best practices for agentic coding》。这篇文章由 Anthropic 工程师 Boris Cherny 撰写，汇集了内部团队和外部工程师使用 Claude Code 的最佳实践。

**适合读者：** 想要掌握 Agentic Coding 工具的中高级开发者，特别是使用 Claude Code 或类似工具的工程师。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/uYib1vsvSF7MVDR5p4GdsLz9F7lCnXAwhs3In0QiattgC3zudR2B3NzjeQPJgqI0dYqUkEZS1vST2vaq4vXWicaHw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

**原文链接：** Claude Code Best practices for agentic coding <sup><span>[1]</span></sup>  
**作者：** Boris Cherny (Anthropic)

---

## 1\. 自定义你的设置

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/uYib1vsvSF7MVDR5p4GdsLz9F7lCnXAwhzwE3VBXecZicoic5Ib107aR5Yia3qkVYtfWVficZibhuN2O8qQ0Sghich6IA/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

  

Claude Code 是一个 Agentic Coding 助手，能够自动将上下文拉入提示中。这种上下文收集会消耗时间和 token，但你可以通过环境调优来优化它。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/uYib1vsvSF7MVDR5p4GdsLz9F7lCnXAwhlG5tzlYPpL8vf71BuicbyPhxQ9ffNf2g5eLCePmNaibKRicnRLIaCStxw/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

### a. 创建 CLAUDE.md 文件

`CLAUDE.md` 是一个特殊文件，当 Claude 开始对话时会自动将其拉入上下文。这使其成为记录以下内容的理想场所：

- 常用 bash 命令
- 核心文件和工具函数
- 代码风格指南
- 测试说明
- 仓库规范（例如，分支命名、merge vs. rebase 等）
- 开发者环境设置（例如，pyenv use、哪些编译器可用）
- 项目的任何意外行为或警告
- 你希望 Claude 记住的其他信息

`CLAUDE.md` 文件没有必需的格式。我们建议保持简洁和可读性。例如：

```
# Bash commands
- npm run build: Build the project
- npm run typecheck: Run the typechecker

# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you're done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
```

你可以将 `CLAUDE.md` 文件放在多个位置：

- **仓库根目录** ，或你运行 `claude` 的任何地方（最常见用法）。将其命名为 `CLAUDE.md` 并提交到 git，这样你就可以在会话中和团队共享它（推荐），或者将其命名为 `CLAUDE.local.md` 并添加到 `.gitignore`
- **你运行 `claude` 的目录的任何父目录** 。这对于 monorepo 最有用，你可能从 `root/foo` 运行 `claude` ，并在 `root/CLAUDE.md` 和 `root/foo/CLAUDE.md` 中都有 `CLAUDE.md` 文件。这些都会自动拉入上下文
- **你运行 `claude` 的目录的任何子目录** 。这是上述的反向操作，在这种情况下，Claude 会在你处理子目录中的文件时按需拉入 `CLAUDE.md` 文件
- **你的主文件夹** （ `~/.claude/CLAUDE.md` ），这适用于你所有的 *claude* 会话

当你运行 `/init` 命令时，Claude 会自动为你生成一个 `CLAUDE.md` 。

### b. 调优你的 CLAUDE.md 文件

你的 `CLAUDE.md` 文件成为 Claude 提示的一部分，所以应该像任何经常使用的提示一样进行优化。一个常见的错误是在没有迭代其有效性的情况下添加大量内容。花时间实验并确定什么能产生最好的指令遵循效果。

你可以手动向 `CLAUDE.md` 添加内容，或者按 `#` 键给 Claude 一个指令，它会自动将其合并到相关的 `CLAUDE.md` 中。许多工程师在编码时经常使用 `#` 来记录命令、文件和风格指南，然后在提交中包含 `CLAUDE.md` 更改，这样团队成员也能受益。

在 Anthropic，我们偶尔会通过 prompt improver <sup><span>[2]</span></sup> 运行 `CLAUDE.md`

![Claude Code tool allowlist](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Claude Code tool allowlist

### c. 管理 Claude 的允许工具列表

默认情况下，Claude Code 会请求对可能修改你系统的任何操作的权限：文件写入、许多 bash 命令、MCP 工具等。我们设计 Claude Code 时采用了这种故意保守的方法来优先考虑安全性。你可以自定义允许列表以允许你知道安全的额外工具，或允许容易撤销的潜在不安全工具（例如，文件编辑、 `git commit` ）。

有四种方式管理允许的工具：

- 在会话期间提示时 **选择"Always allow"**
- **手动编辑** 你的 `.claude/settings.json` 或 `~/.claude.json` （我们建议将前者提交到源代码控制中以与团队共享）
- **使用 `--allowedTools` CLI 标志** 进行会话特定的权限设置

### d. 如果使用 GitHub，安装 gh CLI

Claude 知道如何使用 `gh` CLI 与 GitHub 交互，用于创建 issue、打开 pull request、阅读评论等。如果没有安装 `gh` ，Claude 仍然可以使用 GitHub API 或 MCP 服务器（如果你已安装）。

## 2\. 给 Claude 更多工具

Claude 可以访问你的 shell 环境，在那里你可以为它构建便利脚本和函数集，就像为你自己构建一样。它还可以通过 MCP 和 REST API 利用更复杂的工具。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### a. 将 Claude 与 bash 工具一起使用

Claude Code 继承你的 bash 环境，使其能够访问你的所有工具。虽然 Claude 知道常见的工具如 unix 工具和 `gh` ，但没有指令它不会知道你的自定义 bash 工具：

1. 告诉 Claude 工具名称和使用示例
2. 告诉 Claude 运行 `--help` 查看工具文档
3. 在 `CLAUDE.md` 中记录经常使用的工具

### b. 将 Claude 与 MCP 一起使用

Claude Code 既作为 MCP 服务器又作为客户端运行。作为客户端，它可以通过三种方式连接到任意数量的 MCP 服务器以访问其工具：

- **在项目配置中** （在该目录中运行 Claude Code 时可用）
- **在全局配置中** （在所有项目中可用）
- **在已提交的 `.mcp.json` 文件中** （对在你的代码库中工作的任何人都可用）。例如，你可以将 Puppeteer 和 Sentry 服务器添加到你的 `.mcp.json` 中，这样在你的仓库中工作的每个工程师都可以开箱即用地使用这些工具

在使用 MCP 时，使用 `--mcp-debug` 标志启动 Claude 也有助于识别配置问题。

### c. 使用自定义斜杠命令

对于重复的工作流程——调试循环、日志分析等——将提示模板存储在 `.claude/commands` 文件夹内的 Markdown 文件中。当你输入 `/` 时，这些会通过斜杠命令菜单可用。你可以将这些命令提交到 git 中，使团队的其他成员也能使用。

自定义斜杠命令可以包含特殊关键字 `$ARGUMENTS` 来从命令调用传递参数。

例如，这里有一个你可以用来自动拉取和修复 GitHub issue 的斜杠命令：

```
Please analyze and fix the GitHub issue: $ARGUMENTS.

Follow these steps:

1. Use \`gh issue view\` to get the issue details
2. Understand the problem described in the issue
3. Search the codebase for relevant files
4. Implement the necessary changes to fix the issue
5. Write and run tests to verify the fix
6. Ensure code passes linting and type checking
7. Create a descriptive commit message
8. Push and create a PR

Remember to use the GitHub CLI (\`gh\`) for all GitHub-related tasks.
```

将上述内容放入 `.claude/commands/fix-github-issue.md` 使其在 Claude Code 中作为 `/project:fix-github-issue` 命令可用。然后你可以例如使用 `/project:fix-github-issue 1234` 让 Claude 修复 issue #1234。同样，你可以将自己的个人命令添加到 `~/.claude/commands` 文件夹中，用于你希望在所有会话中可用的命令。

## 3\. 尝试常见的工作流程

Claude Code 不强制特定的工作流程，给你灵活性以你想要的方式使用它。在这种灵活性提供的空间中，在我们用户社区中出现了几种有效使用 Claude Code 的成功模式：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### a. 探索、计划、编码、提交

这个多功能工作流程适合许多问题：

1. **让 Claude 阅读相关文件、图像或 URL** ，提供一般性指导（"读取处理日志的文件"）或特定文件名（"读取 logging.py"），但明确告诉它暂时不要编写任何代码
1. 这是工作流程中你应该考虑强烈使用子 Agent 的部分，特别是对于复杂问题。告诉 Claude 使用子 Agent 来验证细节或调查它可能有的特定问题，特别是在对话或任务的早期，往往能在不损失太多效率的情况下保持上下文可用性
3. **让 Claude 为如何解决特定问题制定计划** 。我们建议使用"think"这个词来触发扩展思考模式，这给 Claude 额外的计算时间来更彻底地评估替代方案。这些特定短语直接映射到系统中增加的思考预算级别："think" < "think hard" < "think harder" < "ultrathink"。每个级别为 Claude 分配逐渐增加的思考预算
1. 如果这一步的结果看起来合理，你可以让 Claude 创建一个文档或 GitHub issue 来记录其计划，这样如果实现（第 3 步）不是你想要的，你可以重置到这个位置
5. **让 Claude 在代码中实现其解决方案** 。这也是让它明确验证其解决方案合理性的好地方，因为它实现了解决方案的各个部分
6. **让 Claude 提交结果并创建 pull request** 。如果相关，这也是让 Claude 更新任何 README 或 changelog 以解释它刚刚做了什么的好时机

步骤 #1-#2 至关重要——没有它们，Claude 倾向于直接跳到编码解决方案。虽然有时这正是你想要的，但让 Claude 先研究和计划会显著提高需要前期深入思考的问题的性能。

### b. 编写测试，提交；编码，迭代，提交

这是 Anthropic 最喜欢的工作流程，适用于可以通过单元、集成或端到端测试轻松验证的更改。测试驱动开发（TDD）在 Agentic Coding 中变得更加强大：

1. **让 Claude 基于预期的输入/输出对编写测试** 。明确说明你正在进行测试驱动开发，这样它就会避免创建模拟实现，即使对于代码库中尚不存在的功能也是如此
2. **告诉 Claude 运行测试并确认它们失败** 。明确告诉它在这个阶段不要编写任何实现代码通常很有帮助
3. **当你对测试满意时，让 Claude 提交测试**
4. **让 Claude 编写通过测试的代码** ，指示它不要修改测试。告诉 Claude 继续直到所有测试通过。Claude 编写代码、运行测试、调整代码、再次运行测试通常需要几次迭代
1. 在这个阶段，让它用独立的子 Agent 验证实现没有过度拟合测试会很有帮助
6. **当你对更改满意时，让 Claude 提交代码**

当 Claude 有明确的目标可以迭代时，它的表现最好——视觉模拟、测试用例或另一种输出。通过提供像测试这样的预期输出，Claude 可以做出更改、评估结果并逐步改进直到成功。

### c. 编写代码，截图结果，迭代

类似于测试工作流程，你可以为 Claude 提供视觉目标：

1. **给 Claude 一种截取浏览器截图的方法** （例如，使用 Puppeteer MCP 服务器 <sup><span>[3]</span></sup> 、 iOS 模拟器 MCP 服务器 <sup><span>[4]</span></sup> ，或手动复制/粘贴截图到 Claude）
2. **通过复制/粘贴或拖放图像，或给 Claude 图像文件路径，为 Claude 提供视觉模拟**
3. **让 Claude 在代码中实现设计** ，截取结果的截图，并迭代直到其结果匹配模拟
4. **当你满意时，让 Claude 提交**

像人类一样，Claude 的输出往往通过迭代显著改善。虽然第一个版本可能很好，但经过 2-3 次迭代后，它通常会看起来好得多。给 Claude 工具来查看其输出以获得最佳结果。

![Safe yolo mode](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Safe yolo mode

### d. 安全 YOLO 模式

你可以使用 `claude --dangerously-skip-permissions` 来绕过所有权限检查，让 Claude 不受干扰地工作直到完成，而不是监督 Claude。这适用于修复 lint 错误或生成样板代码等工作流程。

让 Claude 运行任意命令是有风险的，可能导致数据丢失、系统损坏，甚至数据泄露（例如，通过提示注入攻击）。为了最小化这些风险，在无法访问互联网的容器中使用 `--dangerously-skip-permissions` 。你可以使用 Docker Dev Containers 遵循这个 参考实现 <sup><span>[5]</span></sup> 。

### e. 代码库问答

在入职新代码库时，使用 Claude Code 进行学习和探索。你可以问 Claude 在结对编程时你会问项目上其他工程师的同样类型的问题。Claude 可以 Agentic 地搜索代码库来回答一般性问题，如：

- 日志记录是如何工作的？
- 如何创建新的 API 端点？
- `foo.rs` 第 134 行的 `async move { ... }` 做什么？
- `CustomerOnboardingFlowImpl` 处理哪些边缘情况？
- 为什么我们在第 333 行调用 `foo()` 而不是 `bar()` ？
- `baz.py` 第 334 行在 Java 中的等价物是什么？

在 Anthropic，以这种方式使用 Claude Code 已成为我们的核心入职工作流程，显著改善了上手时间并减少了其他工程师的负担。不需要特殊的提示！只需问问题，Claude 就会探索代码来找到答案。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### f. 使用 Claude 与 git 交互

Claude 可以有效地处理许多 git 操作。许多 Anthropic 工程师使用 Claude 处理我们 90%+ 的 *git* 交互：

- **搜索 *git* 历史** 来回答诸如"v1.2.3 中包含了哪些更改？"、"谁拥有这个特定功能？"或"为什么这个 API 是这样设计的？"等问题。明确提示 Claude 查看 git 历史来回答这些问题会很有帮助
- **编写提交消息** 。Claude 会自动查看你的更改和最近的历史来撰写考虑所有相关上下文的消息
- **处理复杂的 git 操作** ，如还原文件、解决 rebase 冲突以及比较和嫁接补丁

### g. 使用 Claude 与 GitHub 交互

Claude Code 可以管理许多 GitHub 交互：

- **创建 pull request** ：Claude 理解简写"pr"，并会根据 diff 和周围上下文生成适当的提交消息
- **实现简单代码审查评论的一次性解决方案** ：只需告诉它修复你 PR 上的评论（可选地，给它更具体的指令），完成后推回到 PR 分支
- **修复失败的构建** 或 linter 警告
- **通过让 Claude 循环处理开放的 GitHub issue 来分类和分流开放的 issue**

这消除了记住 `gh` 命令行语法的需要，同时自动化了例行任务。

### h. 使用 Claude 处理 Jupyter notebook

Anthropic 的研究人员和数据科学家使用 Claude Code 来读取和编写 Jupyter notebook。Claude 可以解释输出，包括图像，提供快速探索和与数据交互的方式。没有必需的提示或工作流程，但我们推荐的工作流程是在 VS Code 中并排打开 Claude Code 和 `.ipynb` 文件。

你也可以让 Claude 在向同事展示之前清理或对你的 Jupyter notebook 进行美学改进。明确告诉它让 notebook 或其数据可视化"美观"往往有助于提醒它正在为人类观看体验进行优化。

## 4\. 优化你的工作流程

以下建议适用于所有工作流程：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### a. 在指令中要具体

Claude Code 的成功率在更具体的指令下显著提高，特别是在首次尝试时。提前给出明确的指导减少了后期课程纠正的需要。

例如：

| 差 | 好 |
| --- | --- |
| add tests for foo.py | write a new test case for foo.py, covering the edge case where the user is logged out. avoid mocks |
| why does ExecutionFactory have such a weird api? | look through ExecutionFactory's git history and summarize how its api came to be |
| add a calendar widget | look at how existing widgets are implemented on the home page to understand the patterns and specifically how code and interfaces are separated out. HotDogWidget.php is a good example to start with. then, follow the pattern to implement a new calendar widget that lets the user select a month and paginate forwards/backwards to pick a year. Build from scratch without libraries other than the ones already used in the rest of the codebase. |

Claude 可以推断意图，但它不能读心。具体性导致与期望的更好对齐。

![Give Claude images](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Give Claude images

### b. 给 Claude 图像

Claude 通过几种方法在图像和图表方面表现出色：

- **粘贴截图** （专业提示：在 macOS 中按 *cmd+ctrl+shift+4* 截图到剪贴板，按 *ctrl+v* 粘贴。注意这不是像你通常在 mac 上使用的 cmd+v，在远程时不工作）
- **直接拖放** 图像到提示输入
- **为图像提供文件路径**

这在将设计模拟作为 UI 开发的参考点，以及将视觉图表用于分析和调试时特别有用。如果你没有向上下文添加视觉内容，明确告诉 Claude 结果在视觉上吸引人的重要性仍然很有帮助。

![Mention files you want Claude to look at or work on](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Mention files you want Claude to look at or work on

### c. 提及你希望 Claude 查看或处理的文件

使用 tab 补全快速引用你仓库中任何地方的文件或文件夹，帮助 Claude 找到或更新正确的资源。

![Give Claude URLs](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Give Claude URLs

### d. 给 Claude URL

在提示中粘贴特定 URL 供 Claude 获取和阅读。为了避免对相同域（例如，docs.foo.com）的权限提示，使用 `/permissions` 将域添加到你的允许列表。

### e. 及早且经常纠正课程

虽然自动接受模式（shift+tab 切换）让 Claude 自主工作，但通过成为积极的协作者并指导 Claude 的方法，你通常会得到更好的结果。你可以通过在开始时彻底向 Claude 解释任务来获得最佳结果，但你也可以随时纠正 Claude 的课程。

这四个工具有助于课程纠正：

- **在编码前让 Claude 制定计划** 。明确告诉它在你确认其计划看起来不错之前不要编码
- **按 Escape 中断** Claude 在任何阶段（思考、工具调用、文件编辑），保持上下文以便你可以重定向或扩展指令
- **双击 Escape 跳回历史** ，编辑之前的提示，并探索不同的方向。你可以编辑提示并重复，直到得到你想要的结果
- **让 Claude 撤销更改** ，通常与选项 #2 结合使用以采用不同的方法

虽然 Claude Code 偶尔在第一次尝试时完美解决问题，但使用这些纠正工具通常能更快地产生更好的解决方案。

### f. 使用 /clear 保持上下文聚焦

在长时间会话期间，Claude 的上下文窗口可能充满不相关的对话、文件内容和命令。这会降低性能，有时会分散 Claude 的注意力。在任务之间经常使用 `/clear` 命令来重置上下文窗口。

### g. 对复杂工作流程使用检查清单和草稿本

对于具有多个步骤或需要详尽解决方案的大型任务——如代码迁移、修复大量 lint 错误或运行复杂构建脚本——通过让 Claude 使用 Markdown 文件（甚至 GitHub issue！）作为检查清单和工作草稿本来提高性能：

例如，要修复大量 lint 问题，你可以执行以下操作：

1. **让 Claude 运行 lint 命令** 并将所有结果错误（包含文件名和行号）写入 Markdown 检查清单
2. **指示 Claude 逐个处理每个问题** ，在检查并移动到下一个之前修复和验证

### h. 将数据传递给 Claude

有几种方法可以为 Claude 提供数据：

- **直接复制粘贴** 到你的提示中（最常见的方法）
- **管道到 Claude Code** （例如， `cat foo.txt | claude` ），特别适用于日志、CSV 和大型数据
- **告诉 Claude 通过 bash 命令、MCP 工具或自定义斜杠命令拉取数据**
- **让 Claude 读取文件** 或获取 URL（也适用于图像）

大多数会话涉及这些方法的组合。例如，你可以管道一个日志文件，然后告诉 Claude 使用工具拉取额外的上下文来调试日志。

## 5\. 使用无头模式自动化你的基础设施

Claude Code 包括 无头模式 <sup><span>[6]</span></sup> ，适用于 CI、pre-commit hooks、构建脚本和自动化等非交互式上下文。使用 `-p` 标志和提示启用无头模式，使用 `--output-format stream-json` 进行流式 JSON 输出。

注意无头模式不会在会话之间持久化。你必须在每个会话中触发它。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### a. 使用 Claude 进行 issue 分流

无头模式可以为由 GitHub 事件触发的自动化提供动力，例如当你的仓库中创建新 issue 时。例如，公共 Claude Code 仓库 <sup><span>[7]</span></sup> 使用 Claude 在新 issue 进来时检查它们并分配适当的标签。

### b. 使用 Claude 作为 linter

Claude Code 可以提供 主观代码审查 <sup><span>[8]</span></sup> ，超越传统 linting 工具检测的内容，识别诸如拼写错误、过时注释、误导性函数或变量名等问题。

## 6\. 通过多 Claude 工作流程升级

除了独立使用外，一些最强大的应用程序涉及并行运行多个 Claude 实例：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### a. 让一个 Claude 编写代码；使用另一个 Claude 验证

一个简单但有效的方法是让一个 Claude 编写代码，而另一个审查或测试它。类似于与多个工程师合作，有时拥有单独的上下文是有益的：

1. 使用 Claude 编写代码
2. 运行 `/clear` 或在另一个终端中启动第二个 Claude
3. 让第二个 Claude 审查第一个 Claude 的工作
4. 启动另一个 Claude（或再次 `/clear` ）来阅读代码和审查反馈
5. 让这个 Claude 根据反馈编辑代码

你可以对测试做类似的事情：让一个 Claude 编写测试，然后让另一个 Claude 编写代码来使测试通过。你甚至可以让你的 Claude 实例通过给它们单独的工作草稿本并告诉它们哪个写入和哪个读取来相互通信。

这种分离通常比让单个 Claude 处理所有事情产生更好的结果。

### b. 拥有多个仓库检出

许多 Anthropic 工程师做的是在单独的文件夹中创建 3-4 个 git 检出，而不是等待 Claude 完成每个步骤：

1. **在单独文件夹中创建 3-4 个 git 检出**
2. **在单独的终端标签页中打开每个文件夹**
3. **在每个文件夹中启动 Claude** ，分配不同的任务
4. **循环检查** 进度并批准/拒绝权限请求

### c. 使用 git worktrees

这种方法对于多个独立任务表现出色，提供了比多个检出更轻量级的替代方案。Git worktrees 允许你从同一仓库检出多个分支到单独的目录。每个 worktree 都有自己的工作目录，文件隔离，同时共享相同的 Git 历史和 reflog。

使用 git worktrees 使你能够在项目的不同部分同时运行多个 Claude 会话，每个都专注于自己的独立任务。例如，你可能有一个 Claude 重构你的认证系统，而另一个构建完全不相关的数据可视化组件。由于任务不重叠，每个 Claude 都可以全速工作，而不必等待另一个的更改或处理合并冲突：

1. **创建 worktrees** ： `git worktree add ../project-feature-a feature-a`
2. **在每个 worktree 中启动 Claude** ： `cd ../project-feature-a && claude`
3. **根据需要创建额外的 worktrees** （在新终端标签页中重复步骤 1-2）

一些提示：

- 使用一致的命名约定
- 每个 worktree 维护一个终端标签页
- 如果你在 Mac 上使用 iTerm2， 设置通知 <sup><span>[9]</span></sup> 当 Claude 需要关注时
- 为不同的 worktree 使用单独的 IDE 窗口
- 完成后清理： `git worktree remove ../project-feature-a`

### d. 使用带有自定义框架的无头模式

`claude -p` （无头模式）将 Claude Code 以编程方式集成到更大的工作流程中，同时利用其内置工具和系统提示。使用无头模式有两种主要模式：

1. **扇出** 处理大型迁移或分析（例如，分析数百个日志中的情感或分析数千个 CSV）：
2. 让 Claude 编写一个脚本来生成任务列表。例如，生成需要从框架 A 迁移到框架 B 的 2k 文件列表。
3. 循环处理任务，以编程方式为每个任务调用 Claude 并给它一个任务和一组它可以使用的工具。例如： `claude -p "migrate foo.py from React to Vue. When you are done, you MUST return the string OK if you succeeded, or FAIL if the task failed." --allowedTools Edit Bash(git commit:*)`
4. 运行脚本几次并优化你的提示以获得期望的结果。
5. **管道化** 将 Claude 集成到现有的数据/处理管道中：
6. 调用 `claude -p "<your prompt>" --json | your_command` ，其中 `your_command` 是你处理管道的下一步
7. 就是这样！JSON 输出（可选）可以帮助提供结构以便更容易的自动化处理。

对于这两种用例，使用 `--verbose` 标志调试 Claude 调用会很有帮助。我们通常建议在生产中关闭详细模式以获得更清晰的输出。

你使用 Claude Code 的技巧和最佳实践是什么？标记 @AnthropicAI 这样我们就能看到你在构建什么！

## 致谢

由 Boris Cherny 撰写。这项工作借鉴了更广泛的 Claude Code 用户社区的最佳实践，他们的创造性方法和工作流程继续激励着我们。还要特别感谢 Daisy Hollman、Ashwin Bhat、Cat Wu、Sid Bidasaria、Cal Rueb、Nodir Turakulov、Barry Zhang、Drew Hodun 和许多其他 Anthropic 工程师，他们对 Claude Code 的宝贵见解和实践经验帮助塑造了这些建议。

---

## 🎯 结语

通过这篇文章，我们深入探讨了 Claude Code 的六大核心最佳实践，从环境配置到多 Agent 协作，从工具扩展到工作流优化，每一个环节都蕴含着提升开发效率的巨大潜力。

**Claude Code 不仅仅是一个代码生成工具，它是你编程旅程中的智能伙伴。** 通过合理配置、有效扩展、科学工作流程和持续优化，你可以将 AI 编程助手的潜力发挥到极致，真正实现人机协作的编程新范式。

记住， **最好的工具是那些能够融入你工作流程的工具** 。Claude Code 的灵活性正是它的强大之处——你可以根据自己的需求和习惯来定制它，让它成为你专属的编程助手。

---

## 🚀 特别推荐

我们正在研发一个方便国内用户便捷使用 Claude Code 来开发部署全栈应用的一体化 CLI 工具， **可以关注后发送"参与 CLI 内测"来获取体验方式** 。

这个工具将集成 Claude Code 的所有核心功能，并提供更适合国内开发者的本地化体验，让你能够更轻松地享受 Agentic Coding 带来的效率提升。

## 📚 重要术语表

| 术语 | 英文 | 说明 |
| --- | --- | --- |
| **Agentic Coding** | Agentic Coding | 基于 AI Agent 的编程方式，AI 能够自主执行编程任务 |
| **Claude Code** | Claude Code | Anthropic 开发的命令行 AI 编程助手工具 |
| **MCP** | Model Context Protocol | 模型上下文协议，用于连接 AI 模型与外部工具 |
| **CLAUDE.md** | CLAUDE.md | Claude Code 的配置文件，自动加载到对话上下文中 |
| **无头模式** | Headless Mode | 非交互式运行模式，适用于 CI/CD 和自动化脚本 |
| **Git Worktrees** | Git Worktrees | Git 功能，允许在多个分支上同时工作 |
| **TDD** | Test-Driven Development | 测试驱动开发，先写测试再写代码的开发方法 |
| **YOLO 模式** | YOLO Mode | 跳过权限检查的快速执行模式（需要谨慎使用） |
| **Agent** | Agent | AI 代理，能够自主执行任务的智能程序 |
| **斜杠命令** | Slash Commands | 以 `/` 开头的自定义命令，用于快速执行特定任务 |
| **上下文管理** | Context Management | 管理 AI 对话中的信息和记忆 |
| **课程纠正** | Course Correction | 在 AI 执行过程中进行指导和调整 |
| **权限管理** | Permission Management | 控制 AI 可以执行的操作和访问的资源 |
| **工作流程** | Workflow | 完成特定任务的标准化步骤和方法 |
| **本地化** | Localization | 将工具适配到特定地区或语言环境 |

参考资料

\[1\]

Claude Code Best practices for agentic coding: *https://www.anthropic.com/news/claude-code-best-practices*

\[2\]

prompt improver: *https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prompt-improver*

\[3\]

Puppeteer MCP 服务器: *https://github.com/modelcontextprotocol/servers/tree/c19925b8f0f2815ad72b08d2368f0007c86eb8e6/src/puppeteer*

\[4\]

iOS 模拟器 MCP 服务器: *https://github.com/joshuayoes/ios-simulator-mcp*

\[5\]

参考实现: *https://github.com/anthropics/claude-code/tree/main/.devcontainer*

\[6\]

无头模式: *https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview#automate-ci-and-infra-workflows*

\[7\]

Claude Code 仓库: *https://github.com/anthropics/claude-code/blob/main/.github/actions/claude-issue-triage-action/action.yml*

\[8\]

主观代码审查: *https://github.com/anthropics/claude-code/blob/main/.github/actions/claude-code-action/action.yml*

\[9\]

设置通知: *https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview#notification-setup*

  

[Read more](https://mp.weixin.qq.com/s/)

继续滑动看下一个

布克 Official

向上滑动看下一个