

## 同一个任务，3种不同的尝试
1、claude code+glm4.6
task-master-ai，software-planning-tools,+mcp
glm4.6的规划能力ok，代码生成能力偏弱，目前还没有配置skills，需要结合agent，手工执行workflow。
用时大约1-2周？费用glm4.6包月，每月60元

2、antigravity+gimini3-pro sonnet4.5 无需配置agent，自动启用mcp
体验丝滑，用时4小时？
3、auto-coder+deepseek3.2 +workflow+agent
用时2天？成本24.59

![[Pasted image 20251204142517.png]]

![[Pasted image 20251204142640.png]]

![[Pasted image 20251204142708.png]]
![[Pasted image 20251204142746.png]]
![[Pasted image 20251204142819.png]]
![[Pasted image 20251204142922.png]]
什么任务？
vue-copilotkit去年做了一版，大约是1.0.1版，目前Copilotkit已经升级到1.10.6+了。
主线需求，vue-copilotkit需要升级到与react新版兼容，
支线需求，后端接口也修改了，之前很呆板，现在可以换模型，后端可以做更多的事情了。

如何做？
1、设计目录结构
三个目录的好处，1、提供足够上下文，2、出方案有明确参考，debug有前后端代码
![[Pasted image 20251204115557.png]]

2、初始化项目，
claude.md
![[Pasted image 20251204140300.png]]
autocoder RULES.md
![[Pasted image 20251204140440.png]]

antigravity其实也需要claude.md之类的做指导。

![[Pasted image 20251204140539.png]]

![[Pasted image 20251204140711.png]]

## 总结与反思
好的开始，是成功的一半。
当大家学习这种半自动编程时（一次提示，然后可以跑1个小时以上？），最难的并不是后面解决问题，而是前面如何初始化项目，如何让ai做正确的规划。


未来已来

坏消息：ai辅助编程对前端的挑战非常大

好消息：灵光这类llm结果动态渲染的ai应用已经开始崭露头角。ai应用的前端在输入和输出上都会变得足够复杂，这是一条希望之路。


vue-copilotkit部分支持动态渲染，还需要进一步增强

