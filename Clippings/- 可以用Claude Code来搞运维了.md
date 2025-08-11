---
title: "可以用Claude Code来搞运维了"
source: "https://mp.weixin.qq.com/s?__biz=MzA4NzgzMjA4MQ==&chksm=866c68a15bec4098e71a86342eec040473a99137738a6d700dcb035c4b606d84aa35cb14ebc6&idx=1&mid=2453475162&sn=d5e0d452c5c0930d963769e2068f1276#rd"
author:
  - "[[J0hn]]"
published:
created: 2025-08-11
description: "运维同志们或许有希望能睡个好觉了"
tags:
  - "Claude Code"
  - "后台任务"
  - "运维自动化"
abstract: "Claude Code发布后台任务功能，可用于自动化运维监控和问题修复。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/M3PrhSUICnGEyKibgTDQn7HAoyfcAb5MlaNrRI79hib9iaGuhClSNOVjlhYAF8r4lygHVUbr5ECAYSaleqE9gNYbg/0?wx_fmt=jpeg)

Original J0hn [AGI Hunt](https://mp.weixin.qq.com/) *2025年08月11日 12:12*

**Claude Code刚发布后台任务功能，就有人玩出了花样！**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/M3PrhSUICnGEyKibgTDQn7HAoyfcAb5MlfqNShiabK0WYXeYW3QSFsgumNECic5kufiacctNyGwJK1h5R8vta07rmQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

昨天，cat(@\_catwu)，Claude Code的产品经理发文宣布：

> **Claude Code现在可以处理长时间运行的后台任务了** 。

启动开发服务器、运行测试、构建项目，这些操作都不会再阻塞你的工作流程。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_gif/M3PrhSUICnGEyKibgTDQn7HAoyfcAb5MlWASYTQsc5bOlsfRsu9FQYn1ZWgSkZZgTPbJPibWsByuo7TMckZaOMIA/640?wx_fmt=gif&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

Claude会在后台运行bash命令并实时监控日志，当出现问题时，它能立即搜索日志并修复问题。

而除了在开发过程中偶尔用用之外，谁最需要后台运行呢？

**自然是 运维同志们了！**

### 永不疲倦的值班员

Imrat(@imrat)展示了如何把Claude Code变成一个 **全自动的DevOps智能体** ，让它像一个真正的运维工程师一样持续监控服务器日志。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/M3PrhSUICnGEyKibgTDQn7HAoyfcAb5Mly72ghAMiaUtNG9B1j4RSvFYgK8104ZEic0iaibich7P7xyQDjCN7cRZb28w/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

这不在于让AI分析日志（这谁都会吧），而是让AI **自己主动定期检查** ，就像给服务器配了个永不疲倦的值班员。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/M3PrhSUICnGEyKibgTDQn7HAoyfcAb5MljlFgaHEibHyaPfwe7jGtAgDEGdqRwuz4zwkuo6qs7E8UeMxRkxBvyYA/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

像极了不爱睡觉喜欢在大半夜工作的运维同志们。

### tmux魔法

Imrat的设置过程倒也不太复杂，用tmux + Claude Code就搞定了。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/M3PrhSUICnGEyKibgTDQn7HAoyfcAb5MlS1kibicNG1TK1lDa9bLCeorPvpnQAxo0Qr2RwZFYKt0JuTp4ZAIbQwgg/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

如果不熟悉tmux的，可以理解为这是一个终端（terminal）复用器，就像是在浏览器里开多个标签页一样，tmux让你在一个终端里开多个「工作区」。

具体步骤很简单：

1. 在tmux中创建一个名为「claude」的会话，让Claude Code在里面运行。这就像给Claude一个「持久工作环境」，即使你关闭终端，这个环境也会继续存在。
2. 创建一个后台进程来实时跟踪服务器日志，使用 `tail` 命令持续监控日志文件的新增内容。
3. 再启动第二个进程，每隔几分钟自动给Claude发送「check logs」指令。

**就这么简单，一个自动巡检系统就搭建完成了。**

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)  

随着实验深入，Imrat不断给这个系统加料：

监控多台服务器、自动过滤掉机器人扫描之类的噪音、标记webhook处理状态……

每想加一个新需求，自然都只需要简单地告诉Claude一声就好了。

### 技术细节

实践中Imrat遇到了一个有趣的问题：

当在后台进程中发送单个tmux命令时，系统会把它当作换行符处理，导致消息发送失败。

解决方案很简单粗暴： **把命令拆成两行** 。

```
tmux send-keys -t claude "check logs"  # 先发送文本
tmux send-keys -t claude C-m           # 再发送回车键
```

触发脚本的核心逻辑也很好理解，死循环干就完了：

```
while true; do
    echo "[$(date '+%H:%M:%S')] Sending check logs command..."
    tmux send-keys -t claude "check logs"
    tmux send-keys -t claude C-m
    echo "[$(date '+%H:%M:%S')] Check sent"
    sleep 300  # 等待5分钟
done
```

### 语音播报

更酷的是，Imrat还让系统每次检查日志时 **用语音播报摘要** 。

通过bash的 `say` 命令，Claude会像个真人助手一样汇报情况：「 **所有系统正常运行，未检测到API攻击尝试** 」。

（只是如果被大半夜巡逻的保安听到，会不会有点渗人……

### 远程告警

Imrat还尝试把@jack的BitChat（基于蓝牙的端到端加密聊天工具）与Claude Code集成。

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Claude可以通过BitChat发送日志摘要：

> Log Check（14:16 UTC）：所有系统正常。  
> 未授权的API尝试：uid=687b4e5e32f424d06c07cb52在api02上进行了6次快速尝试。

这样即使离开电脑，也能收到系统消息了。

### 自主诊断

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

系统甚至能 **自主调查问题** 。

Imrat展示了Claude主动分析日志中的异常：

发现了Chargebee订阅创建事件的webhook调用失败问题，Claude不仅识别出了问题，还分析出webhook处理器期望的字段在订阅创建事件载荷中不存在。

只是Imrat表示，目前还不太敢让AI直接「vibe fix」（氛围修复）这些问题……

### 踩坑提醒

关于token消耗，Erik Beltran(@sshkey)问道：

> 日志什么时候被发送到服务器？我不想因为日志打印999999个token而耗光我的额度。

Imrat解释说如果日志包含大量噪音，确实可能会占用不必要的上下文，这种情况下只需优化tail命令来排除噪音即可。

在他的测试中，系统维持了 **4个多小时的连续工作** 。

如果功能无法正常工作，hamed(@thehamedmp)提醒：

> 你需要 **退出并重新启动Claude** 才能看到更新。

### 社区反响

被Sam Altman 伤透了的Pres Mihaylov(@PreslavMihaylov)直接称：

> 光这一个功能就比GPT-5更好，太棒了！

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

而Chicken Litter 则表示： 太强了！

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Thomas Friedel(@thomascygn)表示也在玩类似的tmux魔法：

> Claude Code可以通过tmux与交互式CLI工具（比如调试器）进行交互。它会向另一个窗格发送按键并获取输出。这里它使用pdb找到了一个bug。

通过tmux，Claude可以自动「按键」来控制调试器，就像有个隐形的程序员在操作键盘一样。

Jarred Sumner(@jarredsumner)展示了前端调试用法：通过 `bun init --react` ，Claude Code甚至能 **读取浏览器控制台日志并调试前端代码** 。

当AI 不再只是被动响应，而是能开始后台运行、主动巡检、主动分析、主动告警，甚至主动修复时，运维工程师的工作方式也将要被重新定义了。

7 x 24小时工作的运维同志们， **或许，有希望能睡个好觉了。**

  

---

  

\[1\]

cat推文: *https://x.com/imrat/status/1954497164589056090*

\[2\]

Imrat推文: *https://x.com/\_catwu/status/1953926541370630538*

\[3\]

tmux: *https://github.com/tmux/tmux*

****👇****

****👇****

****👇****

****另外，我还用AI 进行了全网的AI 资讯采集，并用AI 进行挑选、审核、翻译、总结后发布到《AGI Hunt》的实时AI 快讯群中。****

****这是个只有信息、没有感情的 AI 资讯信息流（不是推荐流、不卖课、不讲道理、不教你做人、只提供信息、希望能为你节省一些时间）****

****欢迎加入！****

![图片](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

****也欢迎加群和5000+群友交流。****

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![](https://mmbiz.qlogo.cn/sz_mmbiz_jpg/DhduwiaBa7levicZQxJar3MicqnB7syGNwzpsgSnria0b2rYJ7D3rpqojsAqph1wibeDh2oXh5ibWVrKPfvS58wtawVw/0?wx_fmt=jpeg)

 [Like the Author](https://mp.weixin.qq.com/)

修改于 2025年08月11日

继续滑动看下一个

AGI Hunt

向上滑动看下一个