---
title: "Jujutsu：是版本控制新纪元，还是极客玩具？"
source: "https://mp.weixin.qq.com/s/wdsClcmnK8I_c_R8dUiiOg"
author:
  - "[[效谈]]"
published:
created: 2026-02-02
description: "Jujutsu 作为一款全新的版本控制工具，都有哪些创新之处，又有哪些坑，本文带你全面了解。"
tags:
  - "版本控制"
  - "Git痛点"
  - "Jujutsu创新"
  - "工作流"
  - "兼容性"
abstract: "Jujutsu (jj) 是一款旨在解决 Git 在用户体验、工作流灵活性和安全性上痛点的新型版本控制系统，它通过重新设计数据模型和工作流逻辑，提供了如工作副本即提交、冲突作为一等公民、全能撤销等创新功能，但目前仍存在与 Git 生态兼容性不足等不成熟之处。"
---
Original 效谈 *2026年1月26日 23:00*

截至 2026 年初，版本控制系统这个领域， Git 已经是处于绝对垄断地位，而且 Git 已经成为行业标准，在初创公司和开源社区渗透率接近 100%。依托于 GitHub、GitLab、Bitbucket 等平台，Git 构成了现代 DevOps 的核心。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/ZdTFlEjcxn0ar0eJ6ibymqHgW8fkKznUdG53dvxRiaUxmEK6qjxicYV7ojLyKcG1FDupyNcL3ZucxnoMn8BLKLT7w/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

但Git 的成功，难以掩盖其天然存在的“硬伤”，究其原因都取决于 2005 年 Linus Torvalds 开发它时的 **那两周设计初衷** 。这里我们简单列举几个 Git 的 “硬伤”：

- 精细化权限管理 ：在开源世界，这一点无关紧要，但是在企业环境，这一点会增加企业核心资产管理的难度和复杂度。
- 二进制文件管理 ：二进制文件管理对于 Git 仍然属于二等公民，虽然有 Git LFS，但 这种“外挂式”的解决方案在 2026 年显得日益力不从心，尤其是游戏研发、大模型训练等领域。
- 超大规模 Monorepo ：对于数百 GB、甚至 TB 级别超大型仓库，仓库性能会呈现指数下降。
- 认知负担 ：Workspace、Index/Staging area、Local Repo等概念增加认知负担，同时也增加了操作成本，繁琐的操作会消耗用户的心流。

所以，如今软件工程领域需要一款面向未来的全新设计的版本控制系统，而 Jujutsu 就是新生代版本控制系统之一。

01 背景

Jujutsu (简称 `jj` ）是由 Google 工程师 Martin von Zweigbergk 开发的一款新型版本控制系统（VCS）。它的诞生并非为了彻底取代 Git，而是为了 **解决 Git 在用户体验、工作流灵活性和安全性上长期存在的痛点** 。

02 创新点

Jujutsu (`jj`) 的核心创新点在于它彻底重新审视了版本控制系统的 **数据模型** 和 **工作流逻辑** ，而不仅仅是在 Git 之上加一层壳。

### 1）工作副本即提交

这是 `jj` 与传统 VCS（如 Git, Mercurial）最大的不同。在 Git 中，工作区中刚刚修改的变更，很可能会因为一些命令误操作（比如执行 git reset --hard）而导致变更丢失，并且无法恢复。

在 jj 中，是将工作区的变更视为一个特殊的提交，在执行任何 jj 命令之前都会触发先执行将工作区变更提交。但是如果你修改了工作区文件后，没有执行 jj 命令，而是误执行操作系统命令删除了文件，那么 jj 也无力回天。相对来说，jj 中的变更还是安全很多。

### 2）冲突是一等公民

在绝大多数 VCS 中，冲突是“错误状态”，必须立即解决冲突才能进行下一步操作。而 jj 会在本地提交中保存冲突状态，也就是说当你正在解决冲突过程中，临时要 修复一个bug，可以这样做：

```cs
jj new main -m "fix: bug head"# 现在你在一个新的、基于 main 的空提交上工作
```

### 3）操作日志与全能撤销

Git 的 `reflog` 只是记录了 HEAD 的移动，且难以阅读。jj的 undo，就像在编辑器里按 `Ctrl+Z` 一样，你可以通过 `jj undo` 回退任何一步操作。我们还是以上面 2）中描述的场景为例：

```cs
jj new main -m "fix: bug head"# 现在你在一个新的、基于 main 的空提交上工作jj undo# 回到解决冲突的工作区状态
```

这意味着我可以极其便捷、廉价的在两种工作状态进行切换。

### 4）自动变基

在 Git 中，如果你修改了一个历史提交（比如用 `commit --amend` ），你需要手动对其后的所有提交进行 `rebase` 才能保持链条完整。

- **创新：** `jj` 实现了 **后代自动演进** 。当你修改（Rewrite）一个提交时， `jj` 会自动识别其所有子提交，并立即将它们 Rebase 到新的父提交之上。
- **改变：** 这使得“堆栈式开发”（Stacked Diffs）变得极其简单。你可以随时回到提交链中间修个拼写错误，剩下的提交会自动跟上，不会出现“断裂”。

### 5）变更 ID 与 提交 ID 的分离（Change ID vs Commit ID）

这是借鉴自 Mercurial 但进一步优化的设计。

- **创新：** **Commit ID，像 Git 一样，是内容的哈希值，只要内容变了它就变。**
- **Change ID：** 是一个 **稳定的标识符** ，代表一个“任务”。即使你不断修改这个任务的内容、重排它的位置，它的 Change ID 永远保持不变。
- **改变：** 协同开发时，你可以非常明确地追踪“那个功能（Change ID）”演进到了哪个版本，而不会被一堆变来变去的哈希值搞晕。

### 6）强大的修订集语言（Revsets）

`jj` 内置了一种非常强大的查询语言，用于精准定位提交。

- **示例：jj log -r "** `mine() & ~tags()"` （我写的且没有打标签的提交）。
- 这使得在大规模仓库中进行复杂过滤和批量操作变得极其高效。

03 工作模式

### 模式一：Jujutsu + Git (共存/Co-located 模式)

**定位** ：最稳健的“借壳”方案，完美兼容 GitHub/GitLab 既有生态。

- **初始化** ：执行 `jj git init --colocated` 。它会瞬间接管现有的 Git 仓库，并开启双向同步。
- **创建任务** ：彻底告别分支切换的焦虑。直接 `jj new main -m "feat: login"` ，这会在 `main` 节点之上开启一个匿名的“活提交”。
- **状态捕获** ：无需手动 `add` 。任何代码变更都会被实时捕获在当前的 **`@`** 节点（即那个游离态 Commit）中，执行 `jj diff` 即可审视变更。
- **封存迭代** ：当阶段性任务达成，执行 `jj new` 。系统会自动封存当前快照并开启下一个空白节点。
- **同步上云** ：
1. `jj bookmark create feat-v1` ：为你的游离节点贴上 Git 可识别的“标签”。
	2. `jj git push --bookmark feat-v1` ：将成果同步至远端。

### 模式二：原生 Jujutsu (独立/Dedicated 模式)

**定位** ：封印 Git 命令，拥抱纯粹的极客协作，追求极致的逻辑自洽。

- **服务端形态** ：在远端建立一个基础仓库。本地通过 `jj git init` 开启（虽底层仍依附 Git 存储格式，但在心智上完全剔除 Git Index）。
- **客户端协同** ：
1. `jj git clone <path> client-A` ：拉取完整的逻辑树与对象。
	2. **心流开发** ：开发完成后，直接通过 `jj git push` 提交。
	3. **冲突整合** ：另一端通过 `jj git fetch` 拉取，并利用 `jj rebase` 在逻辑层实现无缝整合。
- **跨机黑魔法** ：由于 `jj` 将冲突和操作记录都持久化了，你可以利用 `rsync` 整个目录。这意味着你不仅同步了代码，还把 **撤销历史（Op Log） **和** 未解决的冲突状态** 原封不动地带到了另一台机器，实现“环境级”的无损迁移。

### 其实两种模式下，workspace 下都有.jj和.git，这容易给人一个错觉，似乎两种模式没啥区别，但是关于 Index 处理逻辑上还是有一些差别，所以这也是目前 Jujutsu 不太成熟的设计瑕疵的表现。

04 避坑指南

Jujutsu 作为一款新的VCS 工具，目前并不成熟，要走的路还很长。当前靠寄生 Git 来发展，但是与 Git 之间又存在一些兼容问题。当我们在决定尝试之前，有必要了解清楚这些坑。

### Git LFS Filter

Git LFS 依赖于 `clean/smudge filter` 。当你用 `jj` 直接改文件时， `jj` 不会调用 Git lfs filter。

所以当你添加了一个1GB的二进制文件， `jj` 会直接把它当作普通 Blob 存进 `.git/objects` 。等你 `jj git push` 到remote时， 要么作为普通文件 push 成功，要么会因为文件超过单文件大小限制而失败。

`git clean -xdf`

``在 Git 的逻辑里，`.jj` 文件夹是一个“未追踪的目录”。如果你在 Git 侧习惯性执行 `git clean -xdf`（清理所有未追踪文件），**Git 会直接物理删除 `.jj` 文件夹。**``

这会导致你的操作日志（Operation Log）、所有的 `undo` 历史、以及还未起名（Bookmark）的游离态 Revision 全都存在 `.jj` 里一起被删除，你的 **撤销能力瞬间丧失** ，未命名的代码只能去 `.git/lost-found` 里考古。

解决办法是在 `.gitignore` 或项目的 `.git/info/exclude` 中显式添加 `.jj/` 。

Submodules

Jujutsu 目前对 Git Submodules 的支持基本为零。所以管理submodule时，必须使用传统的 `git` 命令。

Git Hooks

很多团队和个人会在 `.git/hooks` 里写了一些检查脚本，比如 `pre-commit` （如 Lint 检查、单元测试）。 `jj` 在创建 Revision（游离态 Commit）时，使用的是它自己的内部逻辑， **完全不会触发 Git 的钩子。**

More

除了上面几点之外，Git 的一些其他特性，诸如 Sparse checkout、Shallow clone、Partial clone 都存在不同程度上的兼容性问题，这里不再详述。

05 结束语

纵观版本控制系统的演进长河，伟大的工具从未凭空而降，它们大多是在前辈的躯壳上破茧成蝶。正如 SVN 之于 CVS，Git 与 Mercurial 之于 BitKeeper，而 **Jujutsu (jj)** ，则是站在 Git 这个巨人的肩膀上，开启了后 Git 时代的血脉觉醒。

Jujutsu 的精妙在于其“借力打力”的哲学：它完整复用了 Git 坚如磐石的对象数据库作为存储底座，却在用户交互与应用逻辑层大刀阔斧地重塑。这种设计不仅是对开发心流的极限榨取，更是为每一次工作副本的变更套上了“全时撤销”的终极安全保险。

既然“肉身”已备，“灵魂”何在？下一篇，我们将深入暗室，去剖析 Jujutsu 那套令人着迷的底层工作原理。

作者提示: 个人观点，仅供参考

继续滑动看下一个

效谈

向上滑动看下一个