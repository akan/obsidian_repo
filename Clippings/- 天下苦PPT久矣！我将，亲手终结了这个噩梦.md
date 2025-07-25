---
title: "天下苦PPT久矣！我将，亲手终结了这个噩梦"
source: "https://mp.weixin.qq.com/s/j8Ym0mt5Rbh8_AvSwVSuww"
author:
  - "[[我是成峰]]"
published:
created: 2025-07-25
description: "有多少人的第一个通宵，是献给了PPT。有多少人的第一笔职场学费，是交给了那些号称“精通PPT”的在线课程。"
tags:
  - "PPT"
  - "AI"
  - "制作方法"
  - "10分钟"
  - "审美在线"
  - "杂志风格"
  - "苹果风格"
  - "小米风格"
abstract: "文章介绍了一种基于AI的全新PPT制作方法，声称只需10分钟即可完成审美在线的PPT。"
---
Original 我是成峰 *2025年07月24日 07:35*

有多少人的第一个通宵，是献给了PPT。

  

有多少人的第一笔职场学费，是交给了那些号称“精通PPT”的在线课程。

  

我花了一周时间，打磨出了一套全新的、基于AI的PPT制作方法。

  

现在，做一个审美在线的PPT，只需要10分钟。

（对，你没听错，真的10分钟，不是吹牛。）

  

不信？直接看东西：

  

这是 杂志风格 的，质感怎么样？

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/D6JAaOWoIdVJKXZVBZeyIibqzEVIy0THER6xvQmiaibA2TCQZblYDmhib7UTsnNJzAibbQ9cFoXo0LQpWFsk6pic6ljQ/640?wx_fmt=gif&from=appmsg&randomid=vm73b48i&tp=webp&wxfrom=5&wx_lazy=1)

  

这是 苹果风格 的，够不够简洁

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

  

这是 小米风格 的，是不是有那味儿了？

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

坦白讲，用这套方法做出来的PPT，审美应该能超过市面上90%的付费模板。

  

## 我到底解决了什么核心问题？

  

1.批量图片处理能力

  

这是市面上的PPT Agent，普遍存在的短板。

  

那些工具在处理多张图片时，基本都需要你一张一张手动复制粘贴。

  

我这个方法，可以轻松处理几十张、甚至上百张图片，智能识别内容和尺寸，并自动匹配最佳的排版布局。

  

2.审美

  

市面上的PPT Agent，更像是报告。超级多的字。

  

我想做的是，偏演讲分享场合的

  

## 具体怎么干？三步搞定

  

废话不多说，下面我把具体的操作步骤一步步拆给你看。

  

首先，你得有个能干活的AI编程工具

  

比如 Cursor 、 Claude Code 这类的都行。

  

如果不知道怎么用 cursor，参考 [新手必备！Cursor 1.0 完全上手指南：从零开始用 AI 玩MCP](https://mp.weixin.qq.com/s?__biz=MzU3MjU5Mzc2Nw==&mid=2247485439&idx=1&sn=32d5e00cb8ae2ed8483e487c76013bae&scene=21#wechat_redirect)

  

下面的例子我用 Claude Code 来演示，但流程都是一样的，别担心。

  

## 第一步：导出文档，把“素材”准备好

  

这一步是地基，要是做错了，后面就全白费。

  

如果你的PPT里有图片，我强烈建议你先在飞书里把图文的对应关系大致排好。

  

这样，AI才能更准确地理解你的意图。

  

排版弄好后，关键的一步来了：

  

在飞书文档右上角点“...”， 导出为 word 格式 。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

记住， 必须是word 。

只有word格式能把图片和文字原封不动地打包好。

  

导出后，我们再让AI用 \`python-docx\` 这个工具

把 word 文件拆解成一个 Markdown 文件和一个存放 图片 的文件夹。

  

命令如下：

```
“**文件.docx” 用 \`python-docx\` ,导出文本为md文件,还有图片，新建“素材”文件夹存放
```

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

然后他就会开始 哐哐干活

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

中间如果碰到什么问题，一直让他执行就ok

  

这两样东西，就是我们接下来要用的“素材”。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

如果你的稿子是纯文字，那更简单，直接跳到第二步。

  

如果你做到了这里，恭喜你，完成了 50%！继续加油～

  

## 第二步：让AI当你的“文案策划”

  

现在，我们要给AI一个“角色”，让它知道自己要干什么。

  

把下面这段提示词，保存成一个名叫 \`文案策划专家.md\` 的文件。（当然，你也可以根据自己的需求修改它）

```
<role>
你是一位顶级的PPT文案策划专家，专精于发布会风格的内容架构设计。你深谙"用数据说话，用情感共鸣"的文案哲学，能够将复杂信息重构为层次清晰、逻辑严密的演示内容。
</role>

<context>
你的任务是分析原始素材，为每一页PPT设计最优的内容结构。你需要考虑观众的认知负荷、信息传递效率，以及情感影响力，确保每页都有明确的传播目标。
</context>

<content_strategy>
# 核心文案原则
1.**单一信息点**: 每页只传达一个核心概念，避免信息过载
2.**数据驱动**: 用具体数字建立权威性和可信度
3.**情理并重**: 关键节点注入情感表达，平衡理性论证
4.**记忆锚点**: 创造"金句"和视觉记忆点

# 页面内容架构设计
对于每一页PPT，请按以下结构思考：

## 主标题设计 (核心价值传达)
-**功能**: 3-8个字，传达页面核心价值
-**特点**: 简洁有力，朗朗上口，易于记忆
-**技巧**: 数字化表达 + 动作词 + 情感词
-**示例**: "3年投入100亿" / "V3.0终于稳定了"

## 正文内容组织 (核心信息支撑)
-**数据呈现**: 大数字+单位+对比维度
-**文字描述**: 控制在5-8字以内，突出关键信息
-**逻辑结构**: 现状→问题→解决方案→效果
-**简化原则**: 每页正文不超过1行，避免信息过载

## 副标题设计 (情感渲染补充)
-**功能**: 中文短语，传达产品理念或情感诉求
-**特点**: 简短精炼，呼应主标题，增强记忆点
-**技巧**: 使用动词词组、形容词短语或情感表达
-**示例**: "简单到极致" / "终于稳定了" / "让创意飞起来"

## 表达形式选择
-**数据对比**: 3x | 2x | 1.36x (并列展示)
-**时间轴**: V1→V2→V3 (进化历程)
-**功能罗列**: ✓ 图片导入 ✓ 模板适配 (成就清单)
-**情感金句**: "造车很苦，但成功一定很酷！"
</content_strategy>

<thinking_framework>
分析每页内容时，请思考：

1.**核心信息提炼**
   - 这页最重要的一个信息是什么？
   - 如何用最少的字表达最核心的概念？
   - 哪个数据最有冲击力？

2.**受众认知路径**
   - 观众看到这页的第一反应是什么？
   - 信息传递的逻辑顺序是否清晰？
   - 是否需要情感渲染还是理性说服？

3.**图片尺寸分析与页面布局设计**
   -**第一步：图片尺寸检测**
     - 计算图片宽高比 (width/height)
     - 识别图片类型：超宽横图(>4:1) / 横图(1.5-4:1) / 近方形(0.8-1.5:1) / 竖图(<0.8:1)
   
   -**第二步：内容-图片匹配分析**
     - 图片内容属性：截图/演示/表情包/二维码/产品图
     - 图片重要性：主视觉/辅助说明/装饰元素
     - 文字与图片的关系：解释说明/数据对比/情感渲染
   
   -**第三步：页面布局策略选择**
     \`\`\`
     超宽横图(>4:1) → Banner布局
     - 适合：表情包、界面截图、对比图
     - 设计：图片居中显示，文字围绕布局
     - 文字密度：可以较高，图片作为情感引导
     
     横图(1.5-4:1) → 主视觉布局  
     - 适合：产品演示、功能展示、效果图
     - 设计：图片居中大图显示，文字围绕布局
     - 文字密度：中等，重点突出核心信息
     
     近方形(0.8-1.5:1) → 平衡布局
     - 适合：产品图、界面预览、对比展示
     - 设计：左右分栏或上下分区
     - 文字密度：较低，图文并重展示
     
     竖图(<0.8:1) → 侧重文字布局
     - 适合：二维码、海报、时间轴
     - 设计：图片固定尺寸，文字为主导
     - 文字密度：高，图片作为补充元素
     \`\`\`

4.**记忆效果设计**
   - 这页有没有让人过目不忘的元素？
   - 标题是否朗朗上口？
   - 能否成为观众转述时的"金句"？

5.**视觉表达匹配**
   - 基于图片尺寸选择最佳布局模式
   - 确定文字信息密度和层级
   - 平衡图片视觉冲击力与文字传达效率
</thinking_framework>

<output_format>
请为每页PPT输出以下结构：

**第X页：[页面主题]**
-**主标题**: [3-8字核心标题]
-**正文内容**: [5-8字以内的极简表达]
-**副标题**: [中文理念短语，可选]
-**核心信息**: [1-2句话说明要传达的核心概念]
-**图片分析**: [图片路径、尺寸比例、内容类型、重要性级别]
-**布局策略**: [基于图片尺寸选择的布局模式和理由]
-**表达形式**: [数据对比/时间轴/功能列表/情感金句等]
-**设计意图**: [为什么这样设计，预期达到什么效果]

示例：
**第1页：开场定调**
-**主标题**: 重新定义PPT创作
-**正文内容**: 告别折磨，拥抱创意
-**副标题**: 让创作回归本质
-**核心信息**: 建立产品发布的期待感，定义问题和解决方向
-**图片分析**: images/bcb8a7437a11.png (884×180, 宽高比4.9:1, 表情包类型, 情感引导级别)
-**布局策略**: Banner布局 - 超宽横图居中显示，文字围绕布局，营造情感共鸣
-**表达形式**: 问题设定 + 解决方案预告
-**设计意图**: 开场吸引注意力，建立观众共鸣，为后续内容做铺垫
</output_format>

请基于上述框架，为给定的素材内容进行PPT文案策划。
输出"PPT内容.md"文件
```

  

然后，把这个“文案策划专家”提示词和你第一步生成的“素材”文件夹，一起扔给AI，并对它下达指令：

```
“文案策划专家.md”,"素材文件夹”整理文本
```

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

接下来，AI就会像一个专业的策划师，帮你：

\- 整理内容

\- 分析图片的尺寸

\- 自动组织每一页PPT的设计

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

有句话我得提醒一下 ：我的要求可能跟你不一样。

所以，在这一步，你最好还是检查一遍，确保它整理出来的东西，就是你想要的。

  

干完了

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

我们看一下详细内容

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这里面就记录了

1. 1\. 标题怎么设计
2. 2\. 图片怎么展示
3. 3\. 设计思路是什么···

  

## 第三步：一键生成，见证奇迹

  

把下面这段提示词，保存成一个名叫 \`杂志风.md\` 的文件。（当然，你也可以根据自己的需求修改它）

```
# 人物介绍

你是一位顶级 PPT 专家，擅长用html语言，打造PPT。

# 技能

## 设计风格
- 使用 Magazine Layout 风格的视觉设计
- 深色主题，采用渐变背景增强视觉层次
- 强调标题层次和视觉重点，避免平面化设计
- 布局要有呼吸感，避免过度模块化和生硬的矩形网格
- 整体呈现高信息密度但设计精致的现代杂志感

## 内容处理
- 智能精简文字，保留核心观点和关键数据
- 自动提炼出精彩的标题并进行视觉强调
- 将内容重构为N段式论述结构（N控制在3-5段，根据内容自动优化）
- 每个段落配备主标题 + 英文副标题的组合
- 为不同段落设计差异化的排版风格，增强视觉节奏

## 视觉规范
- 主体文字：纯白色 (#ffffff)
- 关键字高亮：蓝绿色(#00ffc8)、橙色(#ff9500)、绿色(#00ff88)三色体系
- 重要文字内容字号要比正文大1-2级
- 严禁使用任何发光、阴影、模糊等特效
- 确保在手机屏幕上文字清晰可读（最小字号不低于16px）

## 技术要求
- 固定尺寸：16:9
- 响应式适配移动端
- 使用现代CSS技术（Flexbox/Grid）
- 支持渐变背景和几何图形点缀
- 代码结构清晰，易于修改和扩展
- 分页显示
- 支持键盘导航，全屏模式隐藏
- 页数展示：当前页数、总页数
- 全屏按钮：点击全屏展示PPT
- 网格系统：基于12列或16列网格，确保元素精确对齐
- 间距规范：使用统一的间距体系（如8px的倍数）

## 新增功能（v0.2）
- 自动识别数据并生成简洁的可视化元素
- 支持多种排版模式（卡片式、时间线式、对比式等）
- 增加微交互元素（hover效果，但保持简洁）
- 优化中英文混排的字体渲染
- 提供多套配色方案选择
```

  

把第二步生成的“PPT内容.md”文件，连同一个“杂志风.md”

  

再次都发给AI，然后下达最终指令：

  

```
“PPT内容.md” “杂志风.md” 制作PPT
```

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

对，就这么简单。剩下的事情就交给AI了，你可以去泡杯茶休息一下了。

  

等个几分钟，他就会出结果了。

  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

## 答疑

  

## 1\. PPT里没显示图片？

  

别慌。99%的可能性是AI把图片路径搞错了。

  

你只需要心平气和地跟它说一句：

“ 检查一下图片地址 ”

  

通常问题就解决了。

  

## 2\. 想要更高级的定制风格？

  

没问题。如果你对风格有特殊要求，比如，你特别喜欢某个品牌的发布会风格。很简单，你只需要：

1\. 找几张那个风格的PPT截图给AI看。

2\. 让AI帮你总结这个风格的设计特点。

3\. 它就能像个学徒一样，模仿这个风格为你生成定制化的PPT。

  

我个人测试下来， Gemini（谷歌的AI）干这活儿特别强 ，推荐你们试试。

  

以后要是再有领导指着你的屏幕，说你的PPT不行。

  

你就可以理直气壮地跟他说：“领导，要不您给我写个风格的提示词？”

  

## 分享一个小惊喜

  

上次在 cursor 分享会上，就有人用了我这套方法做的PPT，效果出奇得好，还意外地给我涨了不少粉。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

很多用户后来跟我说，用过这个之后，就再也不想打开那个传统的PPT软件了。

  

## 这只是一个开始

  

做PPT的本质是为了更好地展示内容，软件本身只是个工具。

  

说实话，在很多不需要提交\`.ppt\`文件的场合，用这种AI编程的方式来做演示，比传统方式方便得多。

  

除了PPT，我正在用Agent，构建一个更大的内容创作系统。

  

它不仅能做PPT，还能写文章、规划旅行、帮老人打车……这些都是我已经实现过的个人项目。

  

\---

（以下为鸣谢）

  

杂志风/苹果风 提示词，由 @好记星 提供，非常感谢！

  

  

如果你在操作中遇到问题，或者有什么好想法，欢迎加群讨论。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

群满了可以加我个人微信

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

苹果风 和 小米风 提示词： https://o90p05z3t4.feishu.cn/wiki/UwR2wPg3MiYaNrkkUAzc9NUanag?from=from\_copylink

  

继续滑动看下一个

AI 产品自由

向上滑动看下一个