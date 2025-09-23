---
title: "微软：LLM上下文学习并非真的学习！"
source: "https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&chksm=c3805efe7f66f8b7cc30d9b95ca11f7ee12dca0bac5236aef66fdc6330cbead624a7471a7d1b&idx=1&mid=2247497547&sn=69bd4aaed8826ac3a6b5a0da3d2d2ac3#rd"
author:
  - "[[PaperAgent]]"
published:
created: 2025-09-23
description:
tags:
  - "统计拟合"
  - "分布漂移"
  - "表面规律"
abstract: "微软研究表明，大模型的上下文学习只是对prompt内统计规律的拟合，而非真正掌握任务本质，一旦数据分布稍有变化就会失效。"
---
Original PaperAgent [PaperAgent](https://mp.weixin.qq.com/)

*2025年09月22日 14:33* *湖北*

大模型真的在“上下文学习”吗？

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricF1XU2A4n4eM0NTic5v2gxsVRHgxLxllzhWPsn2IZHRzynp8XDOIngFgbNBJDpK2TytMmbEKnIT1pA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

> “大模型在上下文学习（ICL）**虽在数学上符合学习定义，但只是对prompt内统计规律的拟合，而非对任务本质的掌握**：一旦分布漂一点就翻车；**示例够多时**，模型、提示词、语言本身都不重要了——它只记得**统计规律**。”

## 研究动机

| 正例 | 反例 |
| --- | --- |
| 几个例子就能解新任务，看起来像“学” | 只是靠预训练记忆+模板匹配，没有真正“编码”新知识 |

微软把 PAC 学习框架搬到 ICL 场景，**数学上证明** ICL 符合“学习”定义，但**经验上**是否 robust 需要大规模实验验证。于是做了 **189 万条预测**、4 个模型、9 个任务、7 种 prompt 策略，把能想到的变量都 ablate 了一遍。

## 实验设计速览

| 组件 | 要点 |
| --- | --- |
| 任务 | 9 个自动机任务（FSA/PDA），覆盖正则、上下文无关语言，难度递进。 |
| 分布偏移 | 训练 P vs. 测试 Q，δ=‖P−Q‖∞ 最大 0.85，模拟 OOD。 |
| Prompt 策略 | 0-100 shot、CoT、APO、Word Salad、Direct Encoding…… |
| 模型 | GPT-4 Turbo / GPT-4o / Mixtral-8×7B / Phi-3.5 MoE |
| 指标 | 准确率、δ-敏感度斜率、shot-增益斜率 |

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricF1XU2A4n4eM0NTic5v2gxsV0ia09DbcDkp5nPm7aiacJiauQqcwxbmSUmek6ONzHPwic8HTDRlgCUOMsw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)*图 1：每个任务对应一个概率自动机，通过控制转移概率生成 ID/OOD 数据。*

### 7 种 Prompt 策略

| 策略缩写 | 全称 / 关键说明 | 主要特点 |
| --- | --- | --- |
| **MP** | Modus Ponens   （仅给 exemplar，无 system prompt） | 最“裸”的提示，无任务描述，易解析失败 |
| **Desc** | Description   （system prompt 里用自然语言说明任务） | 常规做法，人类可读，零样本即可用 |
| **DE** | Direct Encoding   （直接把自动机代码/文法贴进 prompt） | 理论计算机科学常用，对 OOD 稍鲁棒 |
| **APO** | Automated Prompt Optimization   （让 LLM 自己用 dev set 迭代改写 system prompt） | 元提示，自动“搜”出高表现描述 |
| **CoT** | Chain-of-Thought   （在 system prompt 里要求“一步一步想”） | 生成中间推理步，FSM/PDA 类任务常最佳 |
| **SoT** | Salad-of-Thought   （CoT 的词汇全部随机化，仅保留结构） | 测“推理结构”vs“词汇语义”贡献 |
| **Word Salad** | 把 Desc 的 system prompt 词汇随机打乱 | 测“语义”vs“统计共现”贡献 |

### 9 个自动机任务

覆盖 **FSA（有限状态自动机）** 与 **PDA（下推自动机）** 两大复杂度等级，全部用 **合成数据** 生成，天然支持 **ID→OOD 分布偏移**。任务简介如下：

| 任务 | 自动机类型 | 输入形式 | 目标 | OOD 变化 |
| --- | --- | --- | --- | --- |
| **PARITY** | FSA | 二进制串 | 判断 0 的个数是否为偶 | 字符出现概率 |
| **Pattern Matching** | FSA | {a,b,c}\* | 是否含子串 "abcabb" | 字符串长度↑ |
| **Reversal** | PDA | l[#r](https://mp.weixin.qq.com/) | l 是否等于 r 的反转 | 字母表、长度↑ |
| **Stack** | PDA | 操作序列 | 模拟栈 push/pop 后是否匹配 | 序列长度↑ |
| **Hamiltonian** | FSA | 邻接矩阵 + 路径 | 路径是否哈密顿 | 图密度↑ |
| **Maze (Complete)** | FSA | 迷宫 + 路径段 + 移动 | 移动能否连接两段路径 | 迷宫尺寸↑ |
| **Maze (Solve)** | FSA | 迷宫 + 完整移动 | 移动能否从 S 到 E | 迷宫尺寸↑ |
| **Vending Machine (Ver.)** | FSA | 物品价目 + 操作序列 | 最终余额是否一致 | 序列长度↑ |
| **Vending Machine (Sum)** | PDA | 同上 | **计算**  最终余额（非决策） | 序列长度↑ |

## 7 条 ICL 关键发现

| 发现 | 数据说话 |
| --- | --- |
| ① **例子越多，人人变好** | 50-100 shot 时，模型间差距收敛，平均增益斜率 > 0（表 2）。 |
| ② **语言不重要，统计最重要** | Word Salad（prompt 词全随机）极限性能≈正常 prompt（图 5）。 |
| ③ **任务相似≠性能相似** | Pattern Matching（FSA）94% vs. Reversal（PDA）61%，差距 31%（表 1）。 |
| ④ **OOD 一碰就碎** | CoT 对 δ 最敏感，斜率 −1.4；modus ponens 最鲁棒 −0.4（表 2）。 |
| ⑤ **传统 ML 更抗造** | 决策树/kNN 在半数任务平均性能反超 ICL（表 1）。 |
| ⑥ **样本顺序影响有限** | 打乱 exemplar 位置，准确率波动 < 2%（表 7）。 |
| ⑦ **标签污染实验** | 随机标签也能“学会”——说明模型过度关注**表面统计**而非规则。 |

![表1：每个模型在各任务上的最高准确率，以及按shot数计算的峰值平均准确率。](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricF1XU2A4n4eM0NTic5v2gxsV1uK0lBaczy0afokCo0AnR63vZrPibwWRw7nAaEgXm2mL6ZV7ImBktmA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

表1：每个模型在各任务上的最高准确率，以及按shot数计算的峰值平均准确率。

![表2：各LLM的斜率与准确率，按提示策略与任务平均。而δ斜率接近零且略为负值，表明增加shot可持续提升准确率；但在OOD场景下，这种提升失效](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricF1XU2A4n4eM0NTic5v2gxsVUTXRZOxWZErk7U8GxgmeBIFpIhJUwcQedw0LibiavOxuo6zPDFTZ3ibYA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

表2：各LLM的斜率与准确率，按提示策略与任务平均。而δ斜率接近零且略为负值，表明增加shot可持续提升准确率；但在OOD场景下，这种提升失效

![表7：各提示策略在打乱示例（shuffled exemplars）条件下的shot与δ斜率及平均准确率。](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricF1XU2A4n4eM0NTic5v2gxsVakOybUObfJ0xFSWiaa2TxM75Smuxg7a6tnrMvEPU2P3rZ7qqOqA5bSw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

表7：各提示策略在打乱示例（shuffled exemplars）条件下的shot与δ斜率及平均准确率。

![在所有任务与模型上取平均，所有提示策略的准确率随shot数增加均呈正斜率（5.2±1.6），且标准差σ的差距逐渐缩小（-2.6±0.5）。](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricF1XU2A4n4eM0NTic5v2gxsVU9NBbsicYibyOVqK80FIwIpPfOmuSzHbPhf0Ln0l7Eu3F5ekAeS8l5sQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

在所有任务与模型上取平均，所有提示策略的准确率随shot数增加均呈正斜率（5.2±1.6），且标准差σ的差距逐渐缩小（-2.6±0.5）。

![图2：从上到下依次为所有任务、PARITY 和 Reversal 的平均准确率结果；Reversal 平均准确率较低且对 OOD 极为敏感，随 δ 增大，即使 shot 数增加，准确率仍急剧下降。](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricF1XU2A4n4eM0NTic5v2gxsVt71YX4Ipibsicf6BruPmZVJgZlB1B8R3v3Q1riaib6JKZsZNmPwtxOZq9g/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

图2：从上到下依次为所有任务、PARITY 和 Reversal 的平均准确率结果；Reversal 平均准确率较低且对 OOD 极为敏感，随 δ 增大，即使 shot 数增加，准确率仍急剧下降。

![图5：在所有模型与任务上取平均，左侧为基线提示，右侧为 word-salad 提示。](https://mmbiz.qpic.cn/sz_mmbiz_png/AE74ia62XricF1XU2A4n4eM0NTic5v2gxsVsvT72BIlFbvxL6RINvxlj9K1L2O1PVccVG44DxHRUia0viaFJDNZ88cg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

图5：在所有模型与任务上取平均，左侧为基线提示，右侧为 word-salad 提示。

```
https://arxiv.org/pdf/2509.10414
```

推荐阅读

- •[挑战Transformer，谷歌全新架构Mixture-of-Recursions](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247495548&idx=1&sn=87dd3f518c89602c9259c34fcc08e447&scene=21#wechat_redirect)
- •[快手开源多模态Keye-VL-1.5-8B，本地视觉Agent有救了](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247497114&idx=1&sn=8bf1d9630e5cfbbdbda874121f189daa&scene=21#wechat_redirect)
	- •[从Agent到FlowAgent再到Multi-Agent，落地实践细节都在这了](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247497024&idx=1&sn=958ac35c85dd5590a5566e4b96cafc67&scene=21#wechat_redirect)
	• [从DeepSeek-V3到Kimi K2：八种现代LLM架构大比较](https://mp.weixin.qq.com/s?__biz=Mzk0MTYzMzMxMA==&mid=2247497024&idx=1&sn=958ac35c85dd5590a5566e4b96cafc67&scene=21#wechat_redirect)

---

每天一篇大模型Paper来锻炼我们的思维~已经读到这了，不妨点个👍、❤️、↗️三连，加个星标⭐，不迷路哦~