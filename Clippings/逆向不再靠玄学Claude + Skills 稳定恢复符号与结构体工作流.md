---
title: "逆向不再靠玄学：Claude + Skills 稳定恢复符号与结构体工作流"
source: "https://mp.weixin.qq.com/s/NYzwFnZKQeyrS4D3ne9OwA?version=5.0.6.91166&platform=mac&from=industrynews#rd"
author:
  - "[[二进制磨剑]]"
published:
created: 2026-03-06
description:
tags:
  - "逆向工程"
  - "符号恢复"
  - "结构体重建"
  - "Claude Code"
  - "IDA-NO-MCP"
abstract: "reverse-skills 是一个为 Claude Code 设计的逆向工程技能插件集，旨在通过标准化专家经验，将 IDA 导出的反编译结果快速转化为可执行的分析流程，实现稳定的符号分析和结构体重建。"
---
Original 二进制磨剑 *2026年3月5日 08:30*

## reverse-skills：为 Claude Code 打造的逆向工程技能集

> `reverse-skills` 是一个面向 Claude Code 的逆向工程技能插件集，围绕 IDA 导出结果提供符号分析与结构重建能力，帮助研究者把“反编译结果”快速转化为“可执行分析流程”。

## 项目简介

逆向工程里最耗时、也最依赖经验的，通常是两个问题：

1. 1\. **符号恢复（Symbol Recovery）**  
	不是简单重命名函数，而是要结合调用上下文、导入导出关系、字符串语义、参数传递方式和返回值行为，推断函数真实职责。
2. 2\. **结构体恢复（Struct Recovery）**  
	需要跨函数追踪内存访问与指针流，基于偏移读写模式判断字段类型、结构体大小和对象关系，再逐步还原数据模型。

这两个环节本质上都在考验“专家经验”，而不是单一工具按钮。

`reverse-skills` 的目标，就是把这类专家经验沉淀成 Claude Code 可直接调用的 Skills，让 AI 在结构化输入上稳定执行符号分析和结构重建，把“反编译结果”转化为“可执行分析流程”。

该项目定位很清晰： **专为 IDA-NO-MCP 工作流设计** 。

## 为什么要做 Skills

很多团队在逆向时并不缺工具，真正稀缺的是可复用的专家方法。

一个有经验的逆向工程师，面对 `sub_xxx` 函数时通常会做一套固定动作：先看导入导出关系，再看字符串和调用链，接着按内存访问模式推断结构体字段，最后再回到业务语义做命名。这套流程本质上就是“专家经验”。

`reverse-skills` 的核心价值，就是把这类经验从“个人技巧”变成“Agent 可执行技能”：

1. 1\. 把隐性的分析习惯显式化，降低新人上手门槛
2. 2\. 把一次性的分析思路标准化，减少重复劳动
3. 3\. 让团队在同一套方法论下协作，减少命名和结论分歧
4. 4\. 让 Agent 在结构化输入上稳定执行，提升分析一致性

换句话说，Skills 不是单纯增加命令数量，而是把逆向工程专家的“思考路径”产品化。

## 典型工作流

`reverse-skills` 推荐的流程如下：

1. 1\. 在 IDA 中使用 IDA-NO-MCP 导出反编译结果（快捷键 `Ctrl-Shift-E` ）
2. 2\. 使用 Claude Code 打开导出目录
3. 3\. 调用逆向技能进行符号分析或结构重建

一个典型导出目录结构如下：

```
export_dir/
├── decompile/              # 反编译的 C 代码
│   ├── 0x401000.c          # 每个函数一个文件，以十六进制地址命名
│   ├── 0x401234.c
│   └── ...
├── decompile_failed.txt    # 反编译失败的函数列表
├── decompile_skipped.txt   # 跳过的函数列表
├── strings.txt             # 字符串表 (地址, 长度, 类型, 内容)
├── imports.txt             # 导入表 (地址:函数名)
├── exports.txt             # 导出表 (地址:函数名)
└── memory/                 # 内存十六进制转储 (1MB 分块)
```

这种目录组织方式对自动化分析非常友好，也让后续技能调用具备稳定输入。

## 包含的核心技能

当前项目提供两个高频逆向技能：

1. 1\. `/reverse-engineering:rev-symbol`  
	用于从导入表、导出表或反编译代码中分析函数符号语义。
2. 2\. `/reverse-engineering:rev-struct`  
	用于基于函数行为与访问模式重建关键数据结构。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

结构体恢复效果图

上图展示的是 `rev-struct` 的结构体恢复效果：通过偏移访问和指针关系，把对象字段与结构关联直观还原出来。

对应示例命令：

```
/reverse-engineering:rev-symbol sub_401000
/reverse-engineering:rev-struct sub_401000
```
  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

rev-struct 输出示例

从输出可直接看到字段偏移、类型推断和置信度信息，便于进一步在 IDA 中回填结构定义与符号命名。

## 安装方式

先添加插件市场：

```
/plugin marketplace add P4nda0s/reverse-skills
```

再安装插件：

```
/plugin install reverse-engineering@reverse-engineering-skills
```

安装完成后，即可在 Claude Code 中直接调用对应技能命令。

## 适用场景

`reverse-skills` 特别适合以下场景：

1. 1\. 样本初步分析阶段，需要快速给 `sub_xxx` 函数补全可读语义
2. 2\. 协作分析阶段，需要统一团队的结构命名与解释方式
3. 3\. 自动化流水线阶段，希望把“导出-分析-归档”流程标准化

对于日常做漏洞分析、恶意代码分析、协议逆向的研究者来说，它的价值不在于替代逆向工程师，而在于显著减少机械性整理时间，把精力留给真正的推理和验证工作。

## 总结

`reverse-skills` 是一个“轻量但实用”的逆向工程能力补充层：  
它不替代 IDA，也不替代你的分析经验，而是把 Claude Code 在语义理解上的优势，接入到结构化的逆向数据流里。

更重要的是，它把逆向工程专家长期积累的分析范式，沉淀成可复用、可协作、可传递的 Agent Skills。  
如果你已经在使用 IDA-NO-MCP 导出结果，这个项目值得纳入你的日常工具链。

---

**项目地址**

https://github.com/P4nda0s/reverse-skills

（阅读原文跳转）

[![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=MzI1Mjk2MTM1OQ==&mid=2247485834&idx=1&sn=ae892e2d0f37775c1d7c0a57c55b5207&scene=21#wechat_redirect)

[![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)](https://mp.weixin.qq.com/s?__biz=MzI1Mjk2MTM1OQ==&mid=2247485956&idx=1&sn=8b433cbaa8d28916ca9253c8e5caff97&scene=21#wechat_redirect)

  

[Read more](https://mp.weixin.qq.com/s/)

继续滑动看下一个

二进制磨剑

向上滑动看下一个