---
title: "西湖大学科研版NanoBanana开源！科研绘图从此自动化"
source: "https://mp.weixin.qq.com/s?__biz=Mzg3Mzg5MjY3Nw==&chksm=cf5cebf3793c9441045d3d4430754db4dd7fcffe7b4918dc6c667e72d3f0a4f8a016ebf1fb51&idx=2&mid=2247525764&sn=105216c6abb76aeb646602015667ca61#rd"
author:
  - "[[suani]]"
published:
created: 2026-02-09
description: "AutoFigure学术插图绘制。"
tags:
  - "科研绘图"
  - "自动化生成"
  - "理性渲染"
  - "开源工具"
abstract: "西湖大学开源了AutoFigure框架，通过理性渲染范式将长篇科学文献自动转化为可编辑的出版级学术插图。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/FMjxhjKQXwyJdzUnGM8CE2Upa55TCn8rg2t2OoExOSLePMw4chicMxrnezqONGyyAXkP06JicBz8ibAFWuG2Z2GIc42dicmricKC3U0uVicvqeMYw/0?wx_fmt=jpeg)

suani [AIGC开放社区](https://mp.weixin.qq.com/) *2026年2月9日 08:59*

*专注AIGC领域的专业社区，关注微软&OpenAI、百度文心一言、讯飞星火等大语言模型（LLM）的发展和 *应用* 落地，聚焦LLM的市场研究和AIGC开发者生态，欢迎关注！*

谷歌刚刚发布PaperBanana： [科研NanoBanana来了！谷歌PaperBanana替你搞定学术插图](https://mp.weixin.qq.com/s?__biz=MzE5OTExNjAzNw==&mid=2247491181&idx=2&sn=b8306f9e8dee79a8ec76a8ac7a573e4a&scene=21#wechat_redirect) 。

但代码和数据集两周内发布，而且生成的学术插图不可修改。

西湖大学直接将自己的科研版NanoBanana开源了。

![Image](https://mmbiz.qpic.cn/mmbiz_png/FMjxhjKQXwwjOmmv0eZhoajrn9JficibUM60KFiaVZnapwGGZm4FqMXMzVcNrfrTrGu0nTUdibdXm2VJ3ibpKjT4OibHRKiaV68LQxlAh0G5ibr8bqs/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

不仅自动化生成学术插图，不满意还能编辑。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/FMjxhjKQXwzUY62jsKYka4ktn5H3DLwO6pNVFibdF3ERYfrwdOz89KGoPDNTZZRkZU4VhqRQB9XFlIJuH4oKZQAg7iaOsTfiba0BpdB7IhPQVo/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

论文已经被顶会 ICLR 2026 接收。

![Image](https://mmbiz.qpic.cn/mmbiz_png/FMjxhjKQXwzwgic1RYszCKPdIIaf6zumayVCXj00yE2ys4vEam1B8pzEzDrsGCVyRSbxibRAtaYlqlQV4vxgM9jK0NGphLG5PMZBlk9VB2h7c/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

AutoFigure 像科学家一样先打草稿再精修，直接产出能发顶会的专业插图。

团队提出的 AutoFigure 框架，也同样配套了 FigureBench 基准测试集。

针对现有 AI 绘图模型无法理解长篇科学文献且难以保证结构准确性的痛点，研究团队提出了一种理性渲染的新范式。

通过将绘图过程拆解为逻辑规划和美学渲染两个阶段，并引入多智能体协作与“擦除-修正”技术，AutoFigure 成功实现了从万字长文到出版级科研插图的自动转化。

其生成的图表在结构准确性和美观度上均超越了现有基准。

### 理性渲染范式重构科学绘图流程

将复杂的实验逻辑转化为直观、美观的机制图，通常需要耗费数天时间，还要兼具领域知识和设计审美。

这是科研人员的痛。

传统的文生图模型虽然能画出光影绚丽的图像，但在面对需要严谨逻辑的科学插图时，会产生幻觉，画出错误的结构或乱码文字。

另一派基于代码生成的方法虽然结构准确，但产出的图表简陋得毫无美感可言。

AutoFigure 引入了一个全新的概念：理性渲染（Reasoned Rendering）。它把思考和绘画分离开来，不急于生成最终的像素图像，而是先构建一个符号化蓝图。

![Image](https://mmbiz.qpic.cn/mmbiz_png/FMjxhjKQXwybxoMzic8RppiaibshhMXxibvsoicknulY04ibrX8xrncbIgCY1RFWgiabPMpa2nuOlH0ZfGwm4dABMR33PaWMfLuCoAFiaMoXcs6ZcIc/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

整个流程被精妙地设计为三个阶段。

在第一阶段，AI 需要像人类科学家一样去阅读和理解。

面对平均长度超过一万个 token 的长篇文献，AutoFigure 并没有被海量的信息淹没，它利用大语言模型进行概念提取，将非结构化的文本提炼成结构化的节点和关系，将抽象文字转化为拓扑结构。

系统会生成一个包含 SVG 或 HTML 代码的符号布局，通过代码精确控制每一个方框的位置、每一个箭头的指向。

为了保证这个布局是合理的，系统内部还上演了一出左右互搏的好戏。

一个 AI 设计师负责出图，另一个 AI 评论家负责挑刺，指出对齐不对、重叠过多等问题，经过几轮修改意见的反馈循环，最终敲定一个结构严谨的蓝图。

进入第二阶段，风格化渲染开始接手。

有了精确的骨架，现在的任务是赋予它血肉。

AutoFigure 利用图像生成模型，以第一阶段确定的布局图为底稿，结合论文的风格描述，生成高分辨率的图像。

这解决了传统方法中结构不可控的问题，因为生成的图像必须严格遵循骨架的指引。

但这里还有一个顽疾，那就是现有的生成模型极其不擅长处理图片中的文字，例如会把“Algorithm”拼成一串外星符号。

为了解决文字模糊和拼写错误的问题，第三阶段用了“擦除与修正”的策略。

系统首先像做手术一样，把生成图像中的乱码文字区域全部擦除，留下干净的背景。

接着，利用 OCR 技术识别出文字原本应该所在的位置，最后调用验证器，将原文中正确的术语通过矢量字体的形式重新“印”回到图片上。

这一套组合拳下来，既保留了生成图像的细腻质感，又确保了文字信息的绝对准确，真正做到了图文并茂。

### 高难度基准测试集

在科学插图生成这个细分领域，此前一直缺乏一个真正具有挑战性的基准测试集。

过去的数据集要么是关注简短的图片说明，要么是利用现有的元数据进行简单的重建，完全无法模拟科研人员从零开始阅读长篇论文并构思配图的真实场景。

为了填补这一空白，研究团队耗费心力构建了 FigureBench。

![Image](https://mmbiz.qpic.cn/mmbiz_png/FMjxhjKQXwxfUBTq4VThcmupWELYib10Mw3Z4xgTOGGBR7WpxaSupFdRhWvOXnCialL4ABCrVxcRhBvBVeUe8KX3CANIyz7JUBbBHS1pPZ8MI/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

FigureBench 是首个针对长篇科学文本生成插图的大规模基准测试集。

它在多样性和难度上设立了新的标杆。

该数据集包含了 3,300 对高质量的“科学文本-插图”对，涵盖了学术论文、综述文章、技术博客甚至教科书等多种文体。

![Image](https://mmbiz.qpic.cn/mmbiz_png/FMjxhjKQXwyOtpCQheTDWN91BdYYEnwiaicE2RiaQkCfpV1W8krAYOic8ic6YwdQxDIfa4iakLJgTJsYJsF3FoPAjgicdWvslOegWhp4dMmuiag9uV4/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

从表中可以看到，学术论文类别的平均文本长度高达 12,732 个 token，AI 必须拥有极强的长文本处理能力，才能从洋洋洒洒的文字中提炼出核心逻辑。

相比之下，教科书（Textbook）的文本较短，但其插图的教学性质要求更高的逻辑清晰度。

文本密度（Text Density）平均达到了 41.2%，说明这些图片不仅仅是装饰，而是承载了大量的文本信息，这对生成模型的文字渲染能力提出了地狱级的考验。

研究团队并没有简单地通过脚本抓取，而是使用了 GPT-5 辅助筛选，并经过了两轮严格的人工校验。

只有那些不仅视觉上合格，而且每一处视觉元素都能在原文中找到明确对应描述的图表，才有资格入选。

对于测试集中的 300 个样本，每一张图都经过了反复斟酌，确保它们代表了当前科学可视化的最高标准。

FigureBench 成为了检验 AI 科学家“视觉表达能力”的试金石。

### 超越人类预期的表现

为了公正地评估 AutoFigure 的能力，研究团队设计了一套基于“多模态大模型作为裁判”（VLM-as-a-judge）的评估协议。

关注图片画得好不好看，更关注画得对不对。

评分维度被细分为视觉设计、沟通效率和内容保真度三个大类，涵盖了美学质量、逻辑流畅性、准确性等八个子指标。

除了机器打分，团队还进行了一项极具说服力的盲测：直接找到论文的原作者，让他们在不知道图片来源的情况下，评价 AI 生成的配图。

![Image](https://mmbiz.qpic.cn/mmbiz_png/FMjxhjKQXwzHqTKjWxQtM940AQxkw32mRHWWicSknjAeGzXKVxZZ5AOZ1nN2evUbRxGA4Y0PlHZBjmeSO7hH8VL1SNBtusyghD7iafFGVBGSQ/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

实验数据呈现出压倒性的优势。

在所有四个文档类别中，AutoFigure 的总分（Overall）均遥遥领先。

特别是在教科书类别中，AutoFigure 达到了惊人的 97.5% 的胜率。

在绝大多数情况下，比起其他 AI 方法，用户认为 AutoFigure 生成的插图更完美。

对比基线模型，纯代码生成方法（如 HTML-Code）虽然准确度（Accuracy）尚可，但美学评分（Aesthetic）惨不忍睹。

而端到端的 GPT-Image 虽然画得像模像样，但内容准确度极低，经常“指鹿为马”。

AutoFigure 则在两者之间找到了完美的平衡点，既保持了高水平的逻辑准确性，又具备了出版级的视觉美感。

最令人振奋的反馈来自第一作者专家评估。

![Image](https://mmbiz.qpic.cn/mmbiz_png/FMjxhjKQXwylia4llguctiaQmictln8jiaGLbiaE5Q250iaPuuPGOibiajAsdYuqBGsAhsTciaibrFgUK2oib2oCUF9tEKUK32AKicFkctwhwibhjUV8ibMWg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

当这套系统生成的图片被放到原论文作者面前时，有高达 66.7% 的专家表示，他们愿意直接使用 AutoFigure 生成的图片作为自己论文的正式插图。

这个数据极具含金量，因为它代表了最挑剔的用户的认可。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/FMjxhjKQXwxvK5GmpwoboEjtDlzfhgkyv8pc9AFu5zicS7DWGvKWibQcD5siaKeCOFggOYjkHWEsX37fTAKcKZAB5p2icvzMib9z1Mf5pd6LfZHM/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

在图中，任务是绘制 InstructGPT 的原理图。

原始的人类设计（a）清晰地展示了 SFT、RM 和 PPO 三个阶段。

其他的基线方法要么把流程画成了一条细线（b），要么只捕捉到了模糊的流程而忽略了关键的标签（c），要么虽然结构对了但看起来像是初学者的练习作业（d, e）。

只有 AutoFigure（f）不仅准确地还原了三个阶段的并行关系，保持了清晰的层级结构，还使用了语义准确的图标和排版，甚至连颜色搭配都显得专业且和谐。

它不仅是在画图，更是在用视觉语言准确地传达科学思想。

AI 终于能够像训练有素的科研人员一样，产出既严谨又美观的科学插图，为未来的 AI 科学家补上了至关重要的一块拼图。

参考资料：

https://openreview.net/forum?id=5N3z9JQJKq

https://arxiv.org/pdf/2602.03828

https://github.com/ResearAI/AutoFigure

https://github.com/ResearAI/AutoFigure-Edit

END

点击图片立即报名 👇️

  

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/bVibMfbuuqMmCsqFEt8ZDXFCRcaK4zMPfolPlc5iaV6nF0h27HuLDFwLIv2IAB63jNd319OicgEDGbaF69mz9DaGw/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=11) ![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/bVibMfbuuqMkvxLZ6qyzuEIa1sKPtqR9XSPSMAqdckRpK7QtLAsUagMhcc06NOTN8YUUgugV8Ip3aUqmjDTOHPg/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=12) ![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/bVibMfbuuqMl5HlQqibQjxJnujf5SpFqzoFtLqibby9dDgtRNIhdgfXTI0kfe84CzqLHgRj5ic1z3diaU5zhocBdCWQ/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=13) ![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/bVibMfbuuqMnRxVYxLYtSoRicYqfwzsgM8kSAZYRHVOSMpNkSs50TUztjWtibpKibv9rZHms6bcMGlA8dK7SkEiaENA/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=7) ![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/bVibMfbuuqMkBwRXkicWXXrK7wrIZPK0We4uUpxoZmOUVaKNW4pxQj4j2ZicRCLmHTSfTKYCTaw4LhkqMsplC4tDQ/640?wx_fmt=other&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=14)

继续滑动看下一个

AIGC开放社区

向上滑动看下一个