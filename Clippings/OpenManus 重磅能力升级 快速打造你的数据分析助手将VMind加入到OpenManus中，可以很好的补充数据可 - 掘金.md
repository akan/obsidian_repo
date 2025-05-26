---
title: "OpenManus 重磅能力升级: 快速打造你的数据分析助手将VMind加入到OpenManus中，可以很好的补充数据可 - 掘金"
source: "https://juejin.cn/post/7501582081630715945"
author:
published: 2025-05-08
created: 2025-05-08
description: "将VMind加入到OpenManus中，可以很好的补充数据可视化和数据分析能力，而我们的改动在于，将数据可视化这一部分提取成了一个单独的tool，使得这个工具对应的使用场景更加聚焦和深入，"
tags:
  - "clippings"
---
![横幅](https://p9-piu.byteimg.com/tos-cn-i-8jisjyls3a/80e551ec95e54d3e94bf0f1cdad71e51~tplv-8jisjyls3a-image.image) ![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/ef1b479729b54febacdf28345ebe61af~tplv-8jisjyls3a-image.image)

本文作者： VisActor 开源团队

---

## OpenManus 简介

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/db68e83f15b241f6b46e43b814e5b33a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg546E6a2C:q75.awebp?rk3s=f64ab15b&x-expires=1747275433&x-signature=Bx86TttrG%2Bh%2BeSmx3A%2BADgYhw6Y%3D)

OpenManus ([github.com/FoundationA…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FFoundationAgents%2FOpenManus "https://github.com/FoundationAgents/OpenManus")) 是一个简洁通用的 Agent 框架，通过可插拔的 Tools 和 Prompt 组合设计，支持 Computer Use、Browser Use 和 Planning Use 等多种工具调用能力

在OpenManus中，你可以使用基础的manus agent来尝试完成你的各种任务和有趣的探索，也可以以OpenManus为载体，挥洒你自己的创意，通过编写独特的tools和prompt，实现独一无二的agent

**举手🙋，那么问题来了，有比如吗？**

**你好，有的，🌰马上就端上来了！**

## 🌰：DataAnalysis Agent

### 数据分析任务

我们生活中充斥着大量的数据，经济、旅游、互联网、零售等各行各业，如果你去询问DeepSeek一天我们可以产生多少数据，DeepSeek会告诉你：国际数据公司（IDC）预测，2025 年全球年数据量将达 **175ZB（泽字节）** ，相当于 **每天约 479** **EB** **（艾字节）** （1EB=10^18 字节）

在如此繁多海量的数据中，进行数据分析，数据展示和最终数据消费一直以来是一个热门的话题，而如何使用AI工具辅助分析，甚至帮你分析更是焦点。Manus令人赞叹的数据分析能力给所有人都留下了深刻的印象，转过头看向OpenManus，Manus可以，OpenManus可以吗？

**答案是：不可以，但也可以。**

或许直接使用OpenManus无法达到Manus的效果，因为OpenMaus是个非常简洁通用的Agent框架，其工具库里还没有趁手的数据分析利器；但正因为OpenManus是个非常简单通用的Agent框架，你只要敢往工具库里加，OpenManus就敢用，最后达到1 + 1 > 2的效果。

于是我们 [VisActor](https://link.juejin.cn/?target=https%3A%2F%2Fwww.visactor.com%2F "https://www.visactor.com/") （ [www.visactor.com/）联合OpenManu…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.visactor.com%2F%25EF%25BC%2589%25E8%2581%2594%25E5%2590%2588OpenManus%25E5%259B%25A2%25E9%2598%259F%25EF%25BC%258C%25E9%259B%2586%25E6%2588%2590%25E5%25BC%2580%25E6%25BA%2590%25E6%2599%25BA%25E8%2583%25BD%25E5%258F%25AF%25E8%25A7%2586%25E5%258C%2596%25E8%25A7%25A3%25E5%2586%25B3%25E6%2596%25B9%25E6%25A1%2588 "https://www.visactor.com/%EF%BC%89%E8%81%94%E5%90%88OpenManus%E5%9B%A2%E9%98%9F%EF%BC%8C%E9%9B%86%E6%88%90%E5%BC%80%E6%BA%90%E6%99%BA%E8%83%BD%E5%8F%AF%E8%A7%86%E5%8C%96%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88") [VMind](https://link.juejin.cn/?target=https%3A%2F%2Fwww.visactor.com%2Fvmind "https://www.visactor.com/vmind") ，为OpenManus 添加一个 DataAnalysis Agent。

### VMind 简介

VMind作为 [Visactor](https://link.juejin.cn/?target=https%3A%2F%2Fvisactor.com%2F "https://visactor.com/") 的开源智能可视化解决方案，本身具备了一定的智能化能力，可以非常方便的完成数据可视化，数据洞察等任务，详见VMind（ [官网](https://link.juejin.cn/?target=https%3A%2F%2Fvisactor.com%2Fvmind "https://visactor.com/vmind") ， [github](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FVisActor%2FVMind "https://github.com/VisActor/VMind") ）。VMind 目前支持智能化生成 [VChart](https://link.juejin.cn/?target=https%3A%2F%2Fwww.visactor.com%2Fvchart "https://www.visactor.com/vchart") 和 [VTable](https://link.juejin.cn/?target=https%3A%2F%2Fwww.visactor.com%2FVTable "https://www.visactor.com/VTable") 。

将VMind加入到OpenManus中，可以很好的补充数据可视化和数据分析能力。另外，需要依赖后端服务支撑的高级智能化能力，还在开源的路上，如果你觉得目前VMind sdk 的能力不能满足需求，可以联系他们，用社区需求加速开源进度。

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/05e8120d8cf946a6b2b4f3d2687ae641~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg546E6a2C:q75.awebp?rk3s=f64ab15b&x-expires=1747275433&x-signature=gTP8fnJbVolludhPyuP%2FoQ8snB0%3D) ![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/fa1e896e28714773880676a88bea43ca~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg546E6a2C:q75.awebp?rk3s=f64ab15b&x-expires=1747275433&x-signature=EfgQRc8x1vCXVPQUaEzftf8%2BHsI%3D)

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ea0b45fe4df9479293e8b72833d8cd52~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg546E6a2C:q75.awebp?rk3s=f64ab15b&x-expires=1747275433&x-signature=S8Q%2BdvoZ7%2F7P1ikQJUrnteV5zAQ%3D) ![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/bb6b8e0df17c49bb96074c2b4b50e611~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg546E6a2C:q75.awebp?rk3s=f64ab15b&x-expires=1747275433&x-signature=7YYwgE1EJwR5DH3lealHSvaRpQU%3D)

### 接入方式

当我们已经有了趁手的工具，现在就差把它放入OpenManus的工具库中了，相比于通用的Agent对于数据分析场景的应用思路，我们做了一些些微小的改动，具体如下：

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ad75e4346cae441d9bb24b97175e2e47~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg546E6a2C:q75.awebp?rk3s=f64ab15b&x-expires=1747275433&x-signature=Rq45krstO%2FOuoXCNNQRtZGy5UTI%3D)

通用的OpenManus，会使用通用的python工具去实现各种各样，各种各类的pyhton代码生成任务，在数据分析场景，包括且不限于：数据处理、数据报告、数据可视化等；

而我们的改动在于，将数据可视化这一部分提取成了一个单独的tool，使得这个工具对应的使用场景更加聚焦和深入，这个tool的功能包括：数据可视化、数据洞察以及将数据洞察添加到图表中三个功能，详细可见 [ReadMe](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FFoundationAgents%2FOpenManus%2Fblob%2Fmain%2Fapp%2Ftool%2Fchart_visualization%2FREADME_zh.md "https://github.com/FoundationAgents/OpenManus/blob/main/app/tool/chart_visualization/README_zh.md") （ [github.com/FoundationA…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FFoundationAgents%2FOpenManus%2Fblob%2Fmain%2Fapp%2Ftool%2Fchart_visualization%2FREADME_zh.md "https://github.com/FoundationAgents/OpenManus/blob/main/app/tool/chart_visualization/README_zh.md") ）：

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3fea431e80444647b55d640feab2c716~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg546E6a2C:q75.awebp?rk3s=f64ab15b&x-expires=1747275433&x-signature=WcssfHSQ%2FLvj9YUaBv8bjhERKq8%3D)

而原本的python tool将会更加专注在数据处理/数据报告的任务上。

#### Python Tool改造

得益于已有的manus架构，新增一个专属python tool变的十分的丝滑和简单，观察原有的python tool，可以发现其结构也十分简单清晰，具体如下：

- name/description/parameters直接对应了大模型中function call的prompt参数。
- execute是当前python tool被调用时执行的对应函数，而执行中最终会调用\_run\_code函数得到结果
```python
class PythonExecute(BaseTool):
    """A tool for executing Python code with timeout and safety restrictions."""
    
    name: str = "python_execute"
    description: str = "Executes Python code string. Note: Only print outputs are visible, function return values are not captured. Use print statements to see results."
    parameters: dict = {
        "type": "object",
        "properties": {
            "code": {
                "type": "string",
                "description": "The Python code to execute.",
            },
        },
        "required": ["code"],
    }

    def _run_code(self, code: str, result_dict: dict, safe_globals: dict) -> None
        

    async def execute(
        self,
        code: str,
        timeout: int = 5,
    ) -> Dict:
        """
        Executes the provided Python code with a timeout.

        Args:
            code (str): The Python code to execute.
            timeout (int): Execution timeout in seconds.

        Returns:
            Dict: Contains 'output' with execution output or error message and 'success' status.
        """
```

而我们做事情非常简单，我们只需要继承这个函数，改一下已有的prompt，将其引导成适合做数据分析的工具就可以了！结果如下所示，主要通过prompt明确以下几个内容

- 在prompt中明确任务主要为：数据分析，数据报告和其他普通的代码编写任务
- 希望大模型可以提供：数据集总览，数据集各列详情，基础的数据统计信息，生成派生指标，时序对比，异常值，关键洞察等
- 引导大模型可以根据已有的分析多次分析，形成深入有意义的分析数据
```python
from app.config import config
from app.tool.python_execute import PythonExecute

class NormalPythonExecute(PythonExecute):
    """A tool for executing Python code with timeout and safety restrictions."""

    name: str = "python_execute"
    description: str = """Execute Python code for in-depth data analysis / data report(task conclusion) / other normal task without direct visualization."""
    parameters: dict = {
        "type": "object",
        "properties": {
            "code_type": {
                "description": "code type, data process / data report / others",
                "type": "string",
                "default": "process",
                "enum": ["process", "report", "others"],
            },
            "code": {
                "type": "string",
                "description": """Python code to execute.
# Note
1. The code should generate a comprehensive text-based report containing dataset overview, column details, basic statistics, derived metrics, timeseries comparisons, outliers, and key insights.
2. Use print() for all outputs so the analysis (including sections like 'Dataset Overview' or 'Preprocessing Results') is clearly visible and save it also
3. Save any report / processed files / each analysis result in worksapce directory: {directory}
4. Data reports need to be content-rich, including your overall analysis process and corresponding data visualization.
5. You can invode this tool step-by-step to do data analysis from summary to in-depth with data report saved also""".format(
                    directory=config.workspace_root
                ),
            },
        },
        "required": ["code"],
    }

    async def execute(self, code: str, code_type: str | None = None, timeout=5):
        return await super().execute(code, timeout)
```

通过以上操作，我们通过简单的prompt修改，就可以得到一个精通python代码进行数据分析/数据报告的工具，将其加入到manus的使用工具库中，就完成了你的专属打造。

#### 数据分析Agent

在有了我们的专属Tool之后，形成我们的数据分析Agent就更加简单了！

##### 第一步：继承ToolCallAgent

ToolCallAgent是一个调用各种tool的通用agent，我们继承它就已经拥有了调用tool解决问题的能力

```python
""" 继承ToolCallAgent """
class DataAnalysis(ToolCallAgent):
    """
    A data analysis agent that uses planning to solve various data analysis tasks.

    This agent extends ToolCallAgent with a comprehensive set of tools and capabilities,
    including Data Analysis, Chart Visualization, Data Report.
    """
```

##### 第二步：改写prompt

修改system\_prompt和next\_step\_prompt,注入agent的灵魂

```python
class DataAnalysis(ToolCallAgent):
    """
    A data analysis agent that uses planning to solve various data analysis tasks.

    This agent extends ToolCallAgent with a comprehensive set of tools and capabilities,
    including Data Analysis, Chart Visualization, Data Report.
    """

    name: str = "DataAnalysis"
    description: str = "An analytical agent that utilizes multiple tools to solve diverse data analysis tasks"
    
    # 修改你自己的prompt
    system_prompt: str = SYSTEM_PROMPT.format(directory=config.workspace_root)
    next_step_prompt: str = NEXT_STEP_PROMPT
```

#### 第三步：Tool注入

最后一步，注入可使用的Tool，就大功告成

```python
class DataAnalysis(ToolCallAgent):
    """
    A data analysis agent that uses planning to solve various data analysis tasks.

    This agent extends ToolCallAgent with a comprehensive set of tools and capabilities,
    including Data Analysis, Chart Visualization, Data Report.
    """

    name: str = "DataAnalysis"
    description: str = "An analytical agent that utilizes multiple tools to solve diverse data analysis tasks"

    system_prompt: str = SYSTEM_PROMPT.format(directory=config.workspace_root)
    next_step_prompt: str = NEXT_STEP_PROMPT

    max_observe: int = 15000
    max_steps: int = 20

    # 注入可使用的tools
    available_tools: ToolCollection = Field(
        default_factory=lambda: ToolCollection(
            NormalPythonExecute(),
            VisualizationPrepare(),
            DataVisualization(),
            Terminate(),
        )
    )
```

### 最终效果

#### Manus

那么最终效果如何呢，是否能够企及Manus的高度呢？让我们一试便知；

我们尝试Manus上的一个经典分析案例：

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/bbfe096943e843739455029b54f20834~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg546E6a2C:q75.awebp?rk3s=f64ab15b&x-expires=1747275433&x-signature=RwUiKwFBaUKZue9JZmByVAIRND0%3D)

这是一个典型的数据分析场景，给Manus一个月度的销售数据，期望给出下个月10%销售增长的计划；Manus很好的完成了这个任务，生成了一个详细的报告，并且产生了很多数据分析的数据结果和数据可视化结果。

#### OpenManus 运行结果

在OpenManus上加入VMind之后，OpenManus的数据分析能力和图表生成能力在原有的通用架构基础上有了显著的提升，可以生成多个高质量的markdown数据分析报告和丰富准确的数据可视化结果。

##### 任务拆解

Agent会将整体任务拆分成：数据处理、数据分析，数据可视化，模式识别，策略生成和最终报告生成这几个子任务进行执行

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/556ff3a24c9f4322a798ba83b84012e5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg546E6a2C:q75.awebp?rk3s=f64ab15b&x-expires=1747275433&x-signature=vi5nfH%2F4eicCOAvX%2Bi%2BEka5XjGg%3D)

##### 最终报告

在所有任务完成之后，我们产生了最终的数据报告和多个中间分析结果的报告，数据报告中同样包含生成的可视化结果链接

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/4dc9493521cb46b0a2e501beb1965663~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg546E6a2C:q75.awebp?rk3s=f64ab15b&x-expires=1747275433&x-signature=2QrnJEV%2BFZlUtPhHn6%2BScBlZfGo%3D)

##### 可视化结果

以下是部分数据可视化结果展示，可以生成可交互式的图表页面（VChart渲染）并且带有数据标注

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/bc74f77ed74d413fa736f5e92cd0db35~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg546E6a2C:q75.awebp?rk3s=f64ab15b&x-expires=1747275433&x-signature=tPPNCd4R8gfXKN3idqL0RlrLpXU%3D)

## 写在最后

### 总结

得益于OpenManus简洁通用的设计，在其基础上新增Tool或者Agent是一件相当简单的事情🚀

开发者只要关注自己工具的具体实现和输入输出，而不用花大量精力在Agent的框架，交互以及与大模型的通信上，轻松打造属于自己的Agent！

DataAnalysis Agent就是这样的一个例子，我们只需设计对应的数据分析工具，就能拥有超强的数据分析能力，或许，这就是站在巨人肩膀上的感觉吧！

### 下一步

这只是我们一个小小的尝试，目前还有很多问题，后续我们会继续完善 数据分析工具的调度能力，以及集成更强大的 VMind mcp 服务。我们的目标是打造一个集数据分析、图表推荐、自动美化、自动布局、自动报告生成的全流程工具。 产物包括图表、报告、海报、看板以及演示文稿。

### 欢迎交流与共建

最后，欢迎大家以各种方式参与 OpenManus 和 VisActor 的开源建设，提 issue，写代码，加评论，点 Star，都是对开源项目的支持。

OpenManus： [github.com/FoundationA…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FFoundationAgents%2FOpenManus "https://github.com/FoundationAgents/OpenManus")

VisActor： [visactor.com/](https://link.juejin.cn/?target=https%3A%2F%2Fvisactor.com%2F "https://visactor.com/")

VMind： [github.com/VisActor/VM…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FVisActor%2FVMind "https://github.com/VisActor/VMind")

VChart： [GitHub - VisActor/VChart: VChart, more than just a cross-platform charting library, but also an expr](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FVisActor%2FVChart "https://github.com/VisActor/VChart")

VTable： [github.com/VisActor/VT…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FVisActor%2FVTable "https://github.com/VisActor/VTable")

VisActor 飞书交流群：

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e75d49b107e74893a8b8348ed2e64a57~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg546E6a2C:q75.awebp?rk3s=f64ab15b&x-expires=1747275433&x-signature=fLITLxhOut1AgGtpjsut2yvY8H0%3D)

VisActor 微信公众号：

![](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/931cff3561e74f369671937f89d344a9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg546E6a2C:q75.awebp?rk3s=f64ab15b&x-expires=1747275433&x-signature=hssh75wfeZW8xyazbA9mdJVP4ew%3D)

本文收录于以下专栏

![cover](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/183dbe4b47c34dd29d3d086226696201~tplv-k3u1fbpfcp-jj:160:120:0:0:q75.avis)

VisActor

专栏目录

188 订阅

·

50 篇文章

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 2

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

APP内打开