---
title: "Tiny Agents：用50行代码打造基于MCP的AI代理引言 过去几周，我深入研究了MCP（Model Contex - 掘金"
source: "https://juejin.cn/post/7497534120420474918"
author:
published: 2025-04-27
created: 2025-05-07
description: "引言 过去几周，我深入研究了MCP（Model Context Protocol，模型上下文协议），试图理解它为何备受关注。我的总结是：MCP简单却强大，它是一个标准API，用于暴露可以连接到大语言模"
tags:
  - "clippings"
---
![横幅](https://p9-piu.byteimg.com/tos-cn-i-8jisjyls3a/80e551ec95e54d3e94bf0f1cdad71e51~tplv-8jisjyls3a-image.image) ![](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/ef1b479729b54febacdf28345ebe61af~tplv-8jisjyls3a-image.image)

## 引言

过去几周，我深入研究了MCP（Model Context Protocol，模型上下文协议），试图理解它为何备受关注。我的总结是：MCP简单却强大，它是一个标准API，用于暴露可以连接到大语言模型（LLM）的工具集。

通过扩展推理客户端（Hugging Face提供了两个官方SDK：JavaScript的@huggingface/inference和Python的huggingface\_hub），可以轻松将其变为MCP客户端，将MCP服务器中的工具接入LLM推理。

在实现过程中，我有了第二个发现：一旦拥有MCP客户端，AI代理本质上只是一个简单的循环。本文将通过TypeScript（JavaScript）示例，展示如何实现这一过程，介绍如何采用MCP，并探讨它如何让Agentic AI开发变得更简单。

---

如何运行完整示例

如果你有NodeJS（支持pnpm或npm），只需在终端运行以下命令：

bash

```bash
bash 代码解读复制代码npx @huggingface/mcp-client
```

或使用pnpm：

bash

```bash
bash 代码解读复制代码pnpx @huggingface/mcp-client
```

这会将我的软件包安装到一个临时文件夹并执行其命令。你将看到一个简单的代理连接到两个本地运行的MCP服务器，加载它们的工具，然后提示你进行对话。

默认MCP服务器

默认情况下，示例代理会连接以下两个MCP服务器：

- 文件系统服务器：访问你的桌面文件。
- Playwright MCP服务器：使用沙盒化的Chromium浏览器进行网页操作。

注意：目前所有MCP服务器都是本地进程，但远程服务器支持即将来临。

示例输入

我们测试了以下两个输入：

1. 文件操作：  
	“写一首关于Hugging Face社区的俳句，并将其写入桌面上的hf.txt文件。”
2. 网页浏览：  
	“在Brave Search上搜索HF推理提供商，并打开前三个结果。”

默认模型和提供商

示例代理默认使用：

- 模型：Qwen/Qwen2.5-72B-Instruct
- 提供商：Nebius

这些参数可通过环境变量配置：

javascript

```arduino
arduino 代码解读复制代码const agent = new Agent({
    provider: process.env.PROVIDER ?? "nebius",
    model: process.env.MODEL_ID ?? "Qwen/Qwen2.5-72B-Instruct",
    apiKey: process.env.HF_TOKEN,
    servers: SERVERS,
});
```

---

代码存储位置

Tiny Agent的代码位于huggingface.js mono-repo的mcp-client子包中，这是Hugging Face所有JavaScript库的GitHub仓库。

代码地址：  
[github.com/huggingface…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fhuggingface%2Fhuggingface.js%2Ftree%2Fmain%2Fpackages%2Fmcp-client "https://github.com/huggingface/huggingface.js/tree/main/packages/mcp-client")

代码使用了现代JavaScript特性（尤其是异步生成器），这让异步事件（如LLM响应）的实现更加简单。如果你不熟悉这些特性，可以咨询LLM以获取更多信息。

## 基础：LLM的原生工具调用支持

本文的核心在于，当前主流LLM（无论是闭源还是开源）都已训练支持函数调用（即工具使用）。工具通过以下方式定义：

- 名称
- 描述
- 参数的JSONSchema表示

这是一种不透明的函数接口表示，LLM并不关心函数的具体实现。例如：

javascript

```bash
css 代码解读复制代码const weatherTool = {
    type: "function",
    function: {
        name: "get_weather",
        description: "Get current temperature for a given location.",
        parameters: {
            type: "object",
            properties: {
                location: {
                    type: "string",
                    description: "City and country e.g. Bogotá, Colombia",
                },
            },
        },
    },
};
```

参考文档：OpenAI的函数调用文档（ [链接](https://link.juejin.cn/?target=https%3A%2F%2Fplatform.openai.com%2Fdocs%2Fguides%2Ffunction-calling "https://platform.openai.com/docs/guides/function-calling") ）。是的，OpenAI几乎为整个社区定义了LLM标准 ![😅](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5a1535d6c124412caf810f69f803f790~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgWENhcHRhaW5PZHlzc2V5:q75.awebp?rk3s=f64ab15b&x-expires=1746327530&x-signature=VhAxRhoYIPHaMVAUB4EgnKOWarU%3D "张嘴和流冷汗的笑脸") 。

推理引擎允许在调用LLM时传入工具列表，LLM可以选择调用零个、一个或多个工具。开发者需要执行这些工具并将结果反馈给LLM以继续生成。

在后端，工具以特殊格式的chat\_template传递给模型，然后通过模型特定的特殊标记从响应中解析为工具调用。

---

在InferenceClient上实现MCP客户端

了解了LLM中的工具概念后，我们来实现MCP客户端。

官方文档（ [modelcontextprotocol.io/quickstart/…](https://link.juejin.cn/?target=https%3A%2F%2Fmodelcontextprotocol.io%2Fquickstart%2Fclient "https://modelcontextprotocol.io/quickstart/client") ）写得很清晰。你只需将其中提到的Anthropic客户端SDK替换为任何兼容OpenAI的客户端SDK即可。我们使用Hugging Face的InferenceClient作为推理客户端。

完整代码：McpClient.ts（链接 (#)）。

McpClient类结构

McpClient类包含：

- 推理客户端：支持任何推理提供商（huggingface/inference支持远程和本地端点）。
- MCP客户端会话：为每个连接的MCP服务器创建一个会话（支持多个服务器）。
- 可用工具列表：从连接的服务器获取并稍作格式调整后存储。

javascript

```typescript
typescript 代码解读复制代码export class McpClient {
    protected client: InferenceClient;
    protected provider: string;
    protected model: string;
    private clients: Map<ToolName, Client> = new Map();
    public readonly availableTools: ChatCompletionInputTool[] = [];

    constructor({ provider, model, apiKey }) {
        this.client = new InferenceClient(apiKey);
        this.provider = provider;
        this.model = model;
    }
}
```

## 连接MCP服务器

MCP官方SDK（@modelcontextprotocol/sdk/client）提供了Client类，其中的listTools()方法可以列出服务器的工具：

javascript

```javascript
javascript 代码解读复制代码async addMcpServer(server: StdioServerParameters): Promise<void> {
    const transport = new StdioClientTransport({
        ...server,
        env: { ...server.env, PATH: process.env.PATH ?? "" },
    });
    const mcp = new Client({ name: "@huggingface/mcp-client", version: packageVersion });
    await mcp.connect(transport);

    const toolsResult = await mcp.listTools();
    debug(
        "Connected to server with tools:",
        toolsResult.tools.map(({ name }) => name)
    );

    for (const tool of toolsResult.tools) {
        this.clients.set(tool.name, mcp);
    }

    this.availableTools.push(
        ...toolsResult.tools.map((tool) => ({
            type: "function",
            function: {
                name: tool.name,
                description: tool.description,
                parameters: tool.inputSchema,
            },
        }))
    );
}
```

StdioServerParameters是MCP SDK提供的接口，用于启动本地进程（目前MCP服务器均为本地进程）。

---

## 如何使用工具

使用工具很简单，只需将this.availableTools传递给LLM的chatCompletion接口，与消息数组一起提交：

javascript

```kotlin
kotlin 代码解读复制代码const stream = this.client.chatCompletionStream({
    provider: this.provider,
    model: this.model,
    messages,
    tools: this.availableTools,
    tool_choice: "auto",
});
```

tool\_choice: "auto"允许LLM生成零个、一个或多个工具调用。

在解析或流式处理输出时，LLM会生成工具调用（包括函数名称和JSON编码的参数）。开发者需要执行这些工具，MCP客户端SDK提供了client.callTool()方法：

javascript

```bash
ini 代码解读复制代码const toolName = toolCall.function.name;
const toolArgs = JSON.parse(toolCall.function.arguments);

const toolMessage: ChatCompletionInputMessageTool = {
    role: "tool",
    tool_call_id: toolCall.id,
    content: "",
    name: toolName,
};

const client = this.clients.get(toolName);
if (client) {
    const result = await client.callTool({ name: toolName, arguments: toolArgs });
    toolMessage.content = result.content[0].text;
} else {
    toolMessage.content = \`Error: No session found for tool: ${toolName}\`;
}
```

最后，将工具执行结果添加到消息数组中并反馈给LLM。

---

## AI代理的本质：一个简单的循环

有了支持工具的推理客户端后，AI代理本质上只是其上的一个while循环。

具体来说，AI代理包括：

- 系统提示词
- LLM推理客户端
- MCP客户端，用于从多个MCP服务器接入工具
- 基本控制流（while循环）

完整代码：Agent.ts（链接 (#)）。

Agent类

Agent类继承自McpClient：

javascript

```scala
scala 代码解读复制代码export class Agent extends McpClient {
    private readonly servers: StdioServerParameters[];
    protected messages: ChatCompletionInputMessage[];

    constructor({ provider, model, apiKey, servers, prompt }) {
        super({ provider, model, apiKey });
        this.servers = servers;
        this.messages = [
            {
                role: "system",
                content: prompt ?? DEFAULT_SYSTEM_PROMPT,
            },
        ];
    }
}
```

默认使用一个简单的系统提示词（参考GPT-4.1提示指南）。OpenAI建议开发者直接使用tools字段传递工具，而无需手动将工具描述注入提示词中。

加载工具

加载工具只需并行连接到所需的MCP服务器：

javascript

```javascript
javascript 代码解读复制代码async loadTools(): Promise<void> {
    await Promise.all(this.servers.map((s) => this.addMcpServer(s)));
}
```

此外，我们添加了两个额外的控制流工具：

- task\_complete：任务完成时调用，退出循环。
- ask\_question：向用户提问以获取更多信息，退出循环。

javascript

```bash
css 代码解读复制代码const taskCompletionTool: ChatCompletionInputTool = {
    type: "function",
    function: {
        name: "task_complete",
        description: "Call this tool when the task given by the user is complete",
        parameters: { type: "object", properties: {} },
    },
};
const askQuestionTool: ChatCompletionInputTool = {
    type: "function",
    function: {
        name: "ask_question",
        description: "Ask a question to the user to get more info required to solve or clarify their problem.",
        parameters: { type: "object", properties: {} },
    },
};
const exitLoopTools = [taskCompletionTool, askQuestionTool];
```

---

完整的While循环

以下是代理的核心while循环：

javascript

```bash
ini 代码解读复制代码let numOfTurns = 0;
let nextTurnShouldCallTools = true;
while (true) {
    try {
        yield* this.processSingleTurnWithTools(this.messages, {
            exitLoopTools,
            exitIfFirstChunkNoTool: numOfTurns > 0 && nextTurnShouldCallTools,
            abortSignal: opts.abortSignal,
        });
    } catch (err) {
        if (err instanceof Error && err.message === "AbortError") {
            return;
        }
        throw err;
    }
    numOfTurns++;
    const currentLast = this.messages.at(-1)!;
    if (
        currentLast.role === "tool" &&
        currentLast.name &&
        exitLoopTools.map((t) => t.function.name).includes(currentLast.name)
    ) {
        return;
    }
    if (currentLast.role !== "tool" && numOfTurns > MAX_NUM_TURNS) {
        return;
    }
    if (currentLast.role !== "tool" && nextTurnShouldCallTools) {
        return;
    }
    if (currentLast.role === "tool") {
        nextTurnShouldCallTools = false;
    } else {
        nextTurnShouldCallTools = true;
    }
}
```

循环的核心逻辑是：代理与LLM交替进行工具调用和结果反馈，直到LLM连续生成两个非工具消息，或者调用控制流工具（task\_complete或ask\_question）。

---

下一步

有了运行的MCP客户端和简单的代理构建方法后，可以探索更多可能性：

- 尝试其他模型：
	- mistralai/Mistral-Small-3.1-24B-Instruct-2503：优化了函数调用。
	- Gemma 3 27B：适合函数调用，但需实现工具解析（欢迎PR！）。
- 尝试其他推理提供商：
	- Cerebras、Cohere、Fal、Fireworks、Hyperbolic、Nebius、Novita、Replicate、SambaNova、Together等。
- 接入本地LLM：使用llama.cpp或LM Studio。

项目完全开源，欢迎提交PR和贡献！ ![💎](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/64eec1bc1d804b53b70293605ce072fc~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgWENhcHRhaW5PZHlzc2V5:q75.awebp?rk3s=f64ab15b&x-expires=1746327530&x-signature=RMy4tSmFJaIECeESwzPWLNu%2BYso%3D "宝石") ![❤️](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5d9c7acadf824555b590d3ef7158e543~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgWENhcHRhaW5PZHlzc2V5:q75.awebp?rk3s=f64ab15b&x-expires=1746327530&x-signature=gVBAzvfpLwwp%2FcpGvtsaNSdwXIE%3D "红色爱心")

---

## 结论

通过MCP和现代LLM的工具调用支持，构建AI代理变得异常简单。Tiny Agents展示了一个不到50行代码的实现，结合MCP客户端和一个简单的while循环即可完成。未来，MCP的扩展（如远程服务器支持）将进一步简化Agentic AI的开发流程。

本文收录于以下专栏

![cover](https://p9-juejin-sign.byteimg.com/tos-cn-i-k3u1fbpfcp/95414745836549ce9143753e2a30facd~tplv-k3u1fbpfcp-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgWENhcHRhaW5PZHlzc2V5:q75.awebp?rk3s=f64ab15b&x-expires=1746520226&x-signature=yXPeNtOrBU0gOGL3aIO6ocvf0Ig%3D)

MCP 怎么玩？

专栏目录

MCP 怎么玩？

29 订阅

·

57 篇文章

评论 0

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 2

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

APP内打开