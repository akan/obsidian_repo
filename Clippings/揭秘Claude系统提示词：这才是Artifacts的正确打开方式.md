---
title: 揭秘Claude系统提示词：这才是Artifacts的正确打开方式
source: https://juejin.cn/post/7514630775501996068
author:
  - "[[星际码仔]]"
published: 2025-06-12
created: 2025-06-13
description: 了解 Artifacts 组件的核心设计原则，在其能力限制范围内最大化地挖掘其可用的编程用例，对于客观地评判模型的编码能力至关重要。
tags:
  - Artifacts
---
![横幅](https://p26-piu.byteimg.com/tos-cn-i-8jisjyls3a/8694dbc29caa4b59bda5f4181f3bd6ef~tplv-8jisjyls3a-2:0:0:q75.image) ![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/796c19f610c146ffac65db71d7329490~tplv-8jisjyls3a-2:0:0:q75.image)

Artifacts 是 Claude Sonnet 3.5 模型发布时，同步推出的一个极具创新性的功能。

它提供了一个预览窗口，允许我们实时查看、迭代 AI 生成的代码、文档和图表，并与之交互。

这个功能意义非凡，因为它标志着 Claude 从一个单纯的“对话式 AI”进化为了强大的“协作式 AI”。

而我认为，Artifacts 最重要的价值在于，每当模型更新迭代时，我们都能通过这个窗口，第一时间直观地感受到它在编程能力上的具体提升。

不过，出于安全考量，Artifacts 被严格限制在一个独立的“沙盒”环境中运行。

这导致了它无法访问部分浏览器功能（如存储API），也无法从外部获取任何数据。

所以，模型在 Artifacts 中展示的能力，并不能完全等同于它在真实开发环境下的全部实力。

在这种情况下， **了解 Artifacts 组件的核心设计原则，在其能力限制范围内最大化地挖掘其可用的编程用例，对于客观地评判模型的编码能力至关重要** 。

而探索这些设计原则的最佳入口，就是分析 Claude 官方为它设定的系统提示词。

**（如果这篇文章对你有帮助，请帮忙点赞、关注、转发，这将极大地激励我继续创作。）**

## 对于复杂应用，体验至上

对于复杂的应用程序（Three.js、游戏、模拟）：优先考虑功能、性能和用户体验，而非视觉效果。重点关注：

- 流畅的帧率和灵敏的控制
- 清晰、直观的用户界面
- 高效资源利用和优化渲染
- 稳定、无错误的交互
- 简单、实用的设计，不会影响核心体验

首先，Claude 的系统提示词明确指出，对于涉及 Three.js（3D 效果）、游戏（复杂规则、流畅体验）或模拟（如碰撞模拟）一类的“复杂应用”，它的首要任务是保证“好用”，而非“好看”。

**这意味着它的产出内容在功能性、流畅度和稳定性上，将优先于华丽的视觉效果。**

因此我们可以预见到，在没有特别强调视觉要求时，这类应用的初步成品通常会显得比较朴素。

例如，当我们让 Claude 制作一个交互式 3D 太阳系模型时，默认呈现的效果就非常一般：

```markdown
markdown 代码解读复制代码请开发一个交互式3D太阳系模型网页应用，具有以下功能和特性：
1. 使用Three.js（通过CDN引入）创建一个视觉上逼真的太阳系模型
2. 包含太阳和所有八大行星（水星、金星、地球、火星、木星、土星、天王星、海王星）以及至少以下天体：
   - 地球的卫星（月球）    
   - 其他主要行星的代表性卫星    
   - 可选：矮行星（如冥王星）和小行星带
3. 实现以下交互功能：    
   - 用户可以通过鼠标点击选择任何行星或天体    
   - 点击后显示详细信息面板    
   - 允许用户通过鼠标拖拽旋转整个太阳系视图    
   - 提供缩放功能，让用户可以放大查看特定行星细节
4. 行星运动应模拟真实的轨道路径和相对运行速度
5. 包含适当的光照效果，展示太阳光如何照射行星表面
```

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/124da83337914bf88060331382517d23~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1750307647&x-signature=YpwNTUToJwBgXsHlbGwJ6xbSPtc%3D)

(体验网址在文末)

不过，只要我们稍加引导，情况就会大不相同。只需要在原提示词后追加这一句指令，就能极大地提升它的视觉体验：

```markdown
代码解读复制代码考虑设计的情感冲击力和“惊艳元素” 。问问自己：“这会让人停下滚动并发出‘哇’的惊叹吗？”现代用户期望视觉上引人入胜、充满活力的互动体验。
```

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/cb0e78bddb154f5e87feccc18dbb38eb~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1750307647&x-signature=37VnW2905SF7i2bLFsXFleCfD7w%3D)

(体验网址在文末)

可以看到，加入这句提示后，生成内容的质感和视觉吸引力明显得到了提升。

## 对于展示类应用：惊艳、激进！

- 对于登录页面、营销网站和演示内容： 考虑设计的情感冲击力和“惊艳元素” 。问问自己：“这会让人停下滚动并发出‘哇’的惊叹吗？”现代用户期望视觉上引人入胜、充满活力的互动体验。
- 除非特别要求采用传统风格，否则默认采用当代设计趋势和现代审美。 考虑当前网页设计的前沿元素（例如暗黑模式、玻璃态、微动画、3D 元素、粗体字体、鲜艳渐变） 。
- 静态设计应该只是例外，而不是常规。 加入一些精心设计的动画、悬停效果和交互元素，让界面更具响应性和活力 。即使是细微的动作也能显著提升用户参与度。
- 面对设计决策时， 要倾向于大胆、出人意料的设计，而不是保守、传统的设计 。这包括：
- 颜色选择（鲜艳与柔和）
- 布局决策（动态与传统）
- 排版（富有表现力 vs. 保守）
- 视觉效果（沉浸式 vs. 极简式）
- 利用现有技术突破极限 。运用高级 CSS 功能、复杂动画和富有创意的 JavaScript 交互。目标是打造卓越而前沿的体验。
- 通过适当的对比度和语义标记确保可访问性
- 创建功能性、可运行的演示，而不是占位符

与处理复杂应用时的保守策略相反，当面对登录页面、营销网站和演示内容这类“展示类应用”时，Claude 的做法就显得激进许多。

**它会主动追求强烈的情感冲击和视觉上的“惊艳元素”，积极采用前沿的设计风格和丰富的互动效果。**

因此，在没有特别风格要求的情况下，这类应用默认会采用充满现代感的设计。下面这个由它制作的个人网站就是个很好的例子：

```markdown
diff 代码解读复制代码请帮我设计一个个人网站。
包含以下内容元素：
- “友情链接区块”
- “站长寄语 / 每日语录 / 推荐文章区”
- “电子邮件订阅框 + 用户登录框”
- “最新更新 / 精彩推荐 / 网站公告板块”
- “背景音乐自动播放”
```

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/cf37b2b39373493c981bf2e3c96378c0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1750307647&x-signature=kW2%2FnlRcM%2F5zMLAbvFiB%2Bz92fwA%3D)

(体验网址在文末)

当然，如果你不喜欢这种风格，只需在提示词中明确你的需求，它同样能精准实现。

例如，我们可以让它打造一个 2000 年代左右的复古风格网站：

```markdown
diff 代码解读复制代码请帮我设计一个“2000年左右风格”的个人网站，要求页面使用表格布局（而非CSS布局），有彩色背景、GIF小图标、滚动文字（marquee）、电子邮箱订阅框、友情链接、小型导航栏、页面信息密集，整体风格复古、有怀旧感，像早期大学生做的手工网页。
包含以下内容元素：
- “友情链接区块”
- “站长寄语 / 每日语录 / 推荐文章区”
- “电子邮件订阅框 + 用户登录框”
- “最新更新 / 精彩推荐 / 网站公告板块”（
- “背景音乐自动播放”
```

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/20a6a867c14b485f801a9d493e0b1271~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1750307647&x-signature=W6DVCdr6XHVCg3SwM02PY65b%2BHY%3D)

(体验网址在文末)

## 可视化支持：SVG与Mermaid

### SVG (可缩放矢量图)

SVG：“image/svg+xml”。用户界面将在 artifact 标签内渲染可缩放矢量图形 (SVG) 图像。

SVG 是一种基于 XML 的图像格式，它用文本来描述二维矢量图形。

它的最大特点就是可以在任意缩放级别下保持清晰度，不会像位图那样失真。

前段时间很流行的“绘制天气卡片”挑战，就是 SVG 的一个典型的应用。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/756fb1930e0d44978d35a9b2ed8bd74c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1750307647&x-signature=0lita%2FNcrxfBNBhPD6s3ghKP%2BZY%3D)

另一个著名的例子是“独角兽 SVG”，它至今仍被许多人视为检验 AI 模型编程能力的“图灵测试”。

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ca6e30216be347b9a18da83689584bba~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1750307647&x-signature=qvOT%2FODMQn%2FDcDQ3Cx8eLMGsABU%3D)

### Mermaid 图表

Mermaid图：“application/vnd.ant.mermaid”。用户界面将渲染放置在 artifact 标签内的Memaid图。使用 artifact 时，请勿将Memaid代码放在代码块中。

Mermaid 是一个非常巧妙的工具，它允许用户通过简单的文本和代码来创建和修改图表。

你只需掌握极少的语法，就能快速绘制出专业的流程图、序列图、甘特图等。

比如，我们可以让 Claude 从一大段文字中梳理出各个组件之间的关系，并直接生成 Mermaid 架构图在 Artifacts 中渲染：

```markdown
diff 代码解读复制代码请从以下这段文字中梳理出各个组件之间的关系，并直接生成 Mermaid 架构图：

MCP 的核心遵循客户端-服务器架构，其中主机应用程序可以连接到多个服务器
- MCP 主机：希望通过 MCP 访问数据的程序，例如 Claude Desktop、IDE 或 AI 工具
- MCP 客户端：与服务器保持 1:1 连接的协议客户端
- MCP 服务器：轻量级程序，每个程序都通过标准化模型上下文协议公开特定功能
- 本地数据源：MCP 服务器可以安全访问的您的计算机文件、数据库和服务
- 远程服务：MCP 服务器可通过互联网（例如通过 API）连接到的外部系统
```

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/05e5042c8c6f4f94ac7d9d538cda0ab4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1750307647&x-signature=WJEmqvCtsiTYQk2L7mtTDRpM3lQ%3D)

这种“文字生成图表”的方式，完美契合了大语言模型的长处——处理文字。

让 AI 专注于生成结构化的文本，再交由 Mermaid 渲染成图形，这无疑是一种高效而明智的分工。

## 一次性服务：存储API限制

关键浏览器存储限制

切勿在工件中使用 localStorage、sessionStorage 或任何浏览器存储 API。这些 API 不受支持，并且会导致工件在 Claude.ai 环境中失败。相反，您必须：

- 对 React 组件使用 React 状态（useState、useReducer）
- 使用 JavaScript 变量或对象作为 HTML 工件
- 会话期间将所有数据存储在内存中

例外情况：如果用户明确请求使用 localStorage/sessionStorage，请解释 Claude.ai 的构件不支持这些 API，并且会导致构件运行失败。建议用户改用内存存储来实现该功能，或者建议用户复制代码到自己的环境中，在浏览器存储可用的情况下使用。

这是一个非常关键的限制。通常，网页应用会使用 localStorage 或 sessionStorage 等 API，将需要长期保留的数据（如用户偏好、登录状态）保存在浏览器中。

但在 Artifacts 的沙盒环境里，这些浏览器存储 API 是被禁止的，调用它们会导致代码运行失败。

这意味着 Artifacts 无法将数据永久保存在你的浏览器中。它更像是一个“一次性”的服务，所有数据和状态都存储在内存里，一旦关闭或刷新页面，这些信息就会消失。

## 技能池：Artifacts 支持的前端库

不知道到你有没有想过，诸如 GPT、Claude、Gemini 等大语言模型，为什么不约而同地选择 Web 前端开发作为编程能力的主攻方向呢？

一个重要的原因就是，Web 生态拥有海量成熟的前端库，这些“轮子”极大地降低了开发门槛。

所以，有时我会思考：我们在 Artifacts 中看到的惊艳效果，究竟真的是模型自身编码能力的飞跃，还是只是因为它学会了熟练调用一个新的强大工具库呢？

下面，我们就将 Artifacts 支持的库按功能进行分类，一探其究竟。

可用的库：

- lucide-react@0.263.1: import { Camera } from “lucide-react”
- recharts: import { LineChart, XAxis,... } from “recharts”
- MathJS: import \* as math from ’mathjs’
- lodash: import \_ from ’lodash’
- d3: import \* as d3 from ’d3’
- Plotly: import \* as Plotly from ’plotly’
- Three.js (r128): import \* as THREE from ’three’
- - Remember that example imports like THREE.OrbitControls wont work as they aren’t hosted on the Cloudflare CDN.
	- The correct script URL is [cdnjs.cloudflare.com/ajax/libs/t…](https://link.juejin.cn/?target=https%3A%2F%2Fcdnjs.cloudflare.com%2Fajax%2Flibs%2Fthree.js%2Fr128%2Fthree.min.js "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js")
	- IMPORTANT: Do NOT use THREE.CapsuleGeometry as it was introduced in r142. Use alternatives like CylinderGeometry, SphereGeometry, or create custom geometries instead.
- Papaparse: for processing CSVs
- SheetJS: for processing Excel files (XLSX, XLS)
- shadcn/ui: import { Alert, AlertDescription, AlertTitle, AlertDialog, AlertDialogAction } from ’@/components/ui/alert’ (mention to user if used)
- Chart.js: import \* as Chart from ’chart.js’
- Tone: import \* as Tone from ’tone’
- mammoth: import \* as mammoth from ’mammoth’
- tensorflow: import \* as tf from ’tensorflow’

不能安装或导入其他库。

### 1\. 图标库：

**lucide-react** 是一个图标库，用于为 React 应用提供美观、简洁的图标。任何需要图标点缀的界面，都可以用它来提升视觉体验。

例如，手机系统桌面就是一个典型的需要大量图标的页面：

```markdown
代码解读复制代码构建一个Android手机桌面滑动模拟Web应用，使用 lucide-react 提供的各种图标来增强用户界面。
```

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3856247719714cccadf444769a2549da~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1750307647&x-signature=7cu7KrHH53H2QV%2Fgr2TSCTLJe4o%3D)

(体验网址在文末)

### 2\. 数据可视化：

这类库能将枯燥的数据转换为直观的图表，如折线图、柱状图、饼图等。

这部分主要涉及4个库：

- `Recharts`: 用于创建各种常见的图表。
- `D3.js`: 一个功能极其强大的底层可视化库，可以创建各种高度自定义的图表和图形。
- `Plotly`: 主要用于创建可交互的图表和图形。
- `Chart.js`: 简单易用的图表库，适合快速创建标准图表。

我们可以使用这些库来完成各种数据可视化任务，例如：

```markdown
代码解读复制代码使用d3.js构建一个AI编程领域关键词的词云（Word cloud）演示程序，词云需要以更紧凑的、密集排列的形式展现，并确保词汇之间完全不重叠。
```

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5dd6c7b8a2c943d38ec48a4ba209557a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1750307647&x-signature=Uak%2BD1nUF2%2F8f6jyybRbojoFQas%3D)

(体验网址在文末)

```markdown
代码解读复制代码使用Chart.js实现一个带渐进动画效果的双线对比折线图。
```

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b49095773787448fb5fca99641f48580~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1750307647&x-signature=oPeiQ2b%2BNFuvdOV4QP9iAmfzULE%3D)

(体验网址在文末)

可访问这些库的官网解锁更多用法：

D3.js： [d3js.org/](https://link.juejin.cn/?target=https%3A%2F%2Fd3js.org%2F "https://d3js.org/")

Plotly： [plotly.com/graphing-li…](https://link.juejin.cn/?target=https%3A%2F%2Fplotly.com%2Fgraphing-libraries%2F "https://plotly.com/graphing-libraries/")

Chart.js： [www.chartjs.org/docs/latest…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.chartjs.org%2Fdocs%2Flatest%2F "https://www.chartjs.org/docs/latest/")

### 3\. 数学计算：

`MathJS` 是一个功能强大的数学库，它提供了丰富的数学函数和工具，可以执行从基础到复杂的数学运算。

例如，使用 MathJS 创建一个功能完善的科学计算器：

```markdown
代码解读复制代码使用 MathJS 创建一个科学计算器，支持各种数学运算，例如：三角函数、指数函数、对数函数、矩阵运算等。
```

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/762ea6a7aff146beb6bee7eefbe9becc~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1750307647&x-signature=yThMVjN1vvSehWIBopxnUG4wV%2B4%3D)

### 4\. 实用工具库：

`lodash.js` 提供了大量实用的工具函数，可以极大简化 JavaScript 的日常编程，覆盖了数组、对象、字符串等多种操作。

```markdown
diff 代码解读复制代码请提供一个左右对比的代码面板，左边用常规的 JavaScript 实现，右边用 lodash.js 提供的内置函数实现，目标是能够体现出使用 lodash.js 简化 JavaScript 编程的优势。
要求：
- 使用的案例可以是“深度克隆、数据分组、数组操作、对象操作”等，或者其他你认为更好的案例。
- 代码需要格式化，避免堆成一堆；
- 只展示核心代码，不需要运行演示，不需要展示Mock数据以及日志打印等其他代码
- 最好有一个包含“代码行数”和“字符数”的代码统计
```

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/95c2e92746574cda8ebc8bc5092b8e7e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1750307647&x-signature=M6c9QaqbBqLScfyy80UHphA3GQ8%3D)

(体验网址在文末)

可以看到，使用 `lodash.js` 不仅能让代码更简洁、可读性更高，理论上在减少了代码的行数与字符数后，还有助于我们在有限的上下文长度内，实现更复杂的代码逻辑。

### 5\. 3D 图形：

`Three.js (r128) ` 主要用于创建和渲染 3D 图形与动画，我们对此应该不陌生了。

利用它，我们可以构建出令人惊叹的 3D 交互场景，比如《三体》中“水滴”探测器的航行演示：

```markdown
markdown 代码解读复制代码请创建一个交互式网页演示，展示刘慈欣科幻小说《三体II·黑暗森林》中三体文明制造的宇宙探测器"水滴"在太空中航行的动画效果。
具体要求：
1. 外观设计：
  - 水滴形状：头部完美浑圆，尾部尖锐
  - 表面材质：极其光滑的全反射镜面效果
  - 视觉效果：银河系星光在其表面形成流畅的光纹反射
  - 整体观感：如同纯净的水银液滴，呈现纯洁唯美的视觉效果
  - 真实感：外形逼真到让观察者误以为是真正的液态物质
2. 动画效果：
  - 在浩瀚的宇宙背景中平滑航行
  - 表面反射效果随运动实时变化
  - 星光在镜面上的流动光纹动画
3. 技术实现：
  - 使用Three.js
  - 确保在主流浏览器中流畅运行
  - 支持基本的交互功能（如视角调整）
4. 输出要求：
  - 提供完整的HTML文件，包含所有必要的CSS和JavaScript代码
请创建这个演示网站的完整代码实现。
```

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/28494177d48b44b18bfc3c0313b6ec9c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1750307647&x-signature=4nR8JQ2eRE6y7EeowBmKDIQ4nLA%3D)

(体验网址在文末)

### 6\. 文件处理：

Artifacts 还内置了几个强大的文件解析库，方便我们在 Web 应用中直接处理和预览不同格式的文档。

- `Papaparse`**:** 用于解析 CSV 文件。
- `SheetJS`**:** 用于解析 Excel 文件 (XLSX, XLS)。
- `mammoth`**:** 用于解析 Word 文件 (.docx)。

基于这些库，我们可以轻松创建一个功能强大的文档在线预览器：

```markdown
代码解读复制代码使用 Papaparse、SheetJS 和 mammoth 创建一个文档预览器，让用户可以在 Web 应用中预览 Excel 表格和 Word 文档。
```

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/03c1033fa9944e78a6a16a41b6a8879b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1750307647&x-signature=uzPvxqoAARXvsxD0brHOADHHl4Q%3D)

(体验网址在文末)

### 7\. UI 组件库：

`shadcn/ui` 提供了一系列设计精美、可复用的 UI 组件，能够极大地加速用户界面的构建过程。

我们可以用“交错瀑布流”的形式，集中展示用这个库快速搭建出的各类应用的界面：

```bash
bash 代码解读复制代码提供一个以“交错瀑布流”的形式展现的例子库，展示使用shadcn/ui构建用户界面的各类 Web 应用页面实例，例如日期选择页、登录页、聊天记录、反馈页、设置页等。
尽量在一页之内展示完所有的例子，而不需要滚动查看。
```

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/f9f3a6352b3346afb03e70313f56a13c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1750307647&x-signature=jyGiKmXYfcuxn1eqOqJAF4xd9nc%3D)

(体验网址在文末)

### 8\. 音频处理：

`Tone.js` 是一个专为 Web 设计的音频框架，可以用来创建和处理各种交互式的音频效果。

例如，我们可以用它来制作一个逼真的钢琴弹奏模拟应用：

```arduino
arduino 代码解读复制代码使用tone.js制作一个钢琴弹奏模拟Web应用，还原每一个琴键的音色。
```

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b39e853d7e6348238a7ac46d41d6943b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1750307647&x-signature=xtt53ty6c1aSRb3bcxZLxdqx%2F2w%3D)

(体验网址在文末)

### 9\. 机器学习：

`TensorFlow.js` 将强大的机器学习能力带到了浏览器端。Artifacts 支持通过它来构建和运行机器学习模型。

例如，我们可以利用预训练的 MobileNet 模型，快速创建一个能够识别日常物体的图像识别程序：

```markdown
代码解读复制代码使用TensorFlow.js创建一个图像识别Web演示程序，采用预训练的 MobileNet 模型，可以识别日常生活中常见物体的图像。
```

![](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/64bb63cc311b490dbad18cee58c79541~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5pif6ZmF56CB5LuU:q75.awebp?rk3s=f64ab15b&x-expires=1750307647&x-signature=QzmaJsIl67SO3oiQ0eF%2FTM8PYyU%3D)

## 总结

Claude Artifacts 正如一位 **戴着镣铐的顶尖舞者** 。

它必须在一方封闭的舞台（沙盒环境）上献艺，每一次表演（会话）都绚烂夺目，却不留痕迹（无法使用浏览器存储）。

它的舞姿时而沉稳精准，为复杂的应用构建坚实的功能骨架；时而奔放华丽，为展示类应用注入惊艳的视觉体验。

而它之所以舞姿卓越，是因为手握一整套精心准备的“道具”（内置前端库）——从 `Three.js` 的三维光影到 `D3.js` 的数据图景，皆可信手拈来。

因此，读懂这篇文章，就是为了让我们从“观众”变为“编舞者”：洞悉它的能力边界，欣赏它的独特舞姿，最终与这位特殊的舞者共创出令人赞叹的作品。

## 体验网址：

1. 交互式3D太阳系模型（优化前）： [claude.ai/public/arti…](https://link.juejin.cn/?target=https%3A%2F%2Fclaude.ai%2Fpublic%2Fartifacts%2F7b83439b-807c-46e7-aaa2-46a5f277cb15 "https://claude.ai/public/artifacts/7b83439b-807c-46e7-aaa2-46a5f277cb15")
2. 交互式3D太阳系模型（优化后）： [claude.ai/public/arti…](https://link.juejin.cn/?target=https%3A%2F%2Fclaude.ai%2Fpublic%2Fartifacts%2F352b5e2a-026b-4b80-80d6-db22dfaa1040 "https://claude.ai/public/artifacts/352b5e2a-026b-4b80-80d6-db22dfaa1040")
3. 现代感个人网站： [claude.ai/public/arti…](https://link.juejin.cn/?target=https%3A%2F%2Fclaude.ai%2Fpublic%2Fartifacts%2Fe9214f8f-5749-43c1-90aa-abc3489a1bdd "https://claude.ai/public/artifacts/e9214f8f-5749-43c1-90aa-abc3489a1bdd")
4. 2000年代怀旧风格个人网站： [claude.ai/public/arti…](https://link.juejin.cn/?target=https%3A%2F%2Fclaude.ai%2Fpublic%2Fartifacts%2Fd7004072-9fb4-481c-b57b-b4ab300c0949 "https://claude.ai/public/artifacts/d7004072-9fb4-481c-b57b-b4ab300c0949")
5. Lodash.js vs 原生 JavaScript： [claude.ai/public/arti…](https://link.juejin.cn/?target=https%3A%2F%2Fclaude.ai%2Fpublic%2Fartifacts%2F2ac2707b-1367-44ff-9f03-02c38cfb821e "https://claude.ai/public/artifacts/2ac2707b-1367-44ff-9f03-02c38cfb821e")
6. 钢琴弹奏模拟器： [claude.ai/public/arti…](https://link.juejin.cn/?target=https%3A%2F%2Fclaude.ai%2Fpublic%2Fartifacts%2Fe13a32bb-b743-464e-a94e-bdb156f527dc "https://claude.ai/public/artifacts/e13a32bb-b743-464e-a94e-bdb156f527dc")
7. AI编程关键词词云： [claude.ai/public/arti…](https://link.juejin.cn/?target=https%3A%2F%2Fclaude.ai%2Fpublic%2Fartifacts%2F9f5b71c2-564f-4a4f-b48c-2be91c1b09ef "https://claude.ai/public/artifacts/9f5b71c2-564f-4a4f-b48c-2be91c1b09ef")
8. 文档预览器： [claude.ai/public/arti…](https://link.juejin.cn/?target=https%3A%2F%2Fclaude.ai%2Fpublic%2Fartifacts%2F07e3677e-6772-450b-9ae3-29237c71d952 "https://claude.ai/public/artifacts/07e3677e-6772-450b-9ae3-29237c71d952")
9. 科学计算器： [claude.ai/public/arti…](https://link.juejin.cn/?target=https%3A%2F%2Fclaude.ai%2Fpublic%2Fartifacts%2F364f874a-69eb-4545-88d4-742108fbe492 "https://claude.ai/public/artifacts/364f874a-69eb-4545-88d4-742108fbe492")
10. shadcn/ui 组件展示库： [claude.ai/public/arti…](https://link.juejin.cn/?target=https%3A%2F%2Fclaude.ai%2Fpublic%2Fartifacts%2F1dae3b85-2f65-474c-a020-33680526cc9d "https://claude.ai/public/artifacts/1dae3b85-2f65-474c-a020-33680526cc9d")
11. 三体水滴探测器： [claude.ai/public/arti…](https://link.juejin.cn/?target=https%3A%2F%2Fclaude.ai%2Fpublic%2Fartifacts%2Ffcc3a1ab-2a73-4252-8f2e-a0c946f24adf "https://claude.ai/public/artifacts/fcc3a1ab-2a73-4252-8f2e-a0c946f24adf")

评论 0

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

APP内打开