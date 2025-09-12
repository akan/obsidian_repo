---
title: "Redis 作者关于大模型编程的看法"
source: "https://mp.weixin.qq.com/s/OxF1ynHLFJ2DXuLCa9vV3w"
author:
  - "[[Eero]]"
published:
created: 2025-09-12
description: "如今绝大多数编程工作，无非是用稍有不同的形式重复相同的内容。这并不需要高级推理能力。大型语言模型非常擅长此类工作。这确实值得程序员深思：编写这类程序是否值得？但如果LLM能完成其中部分工作，或许这并非五到十年后最理想的职业选择"
tags:
  - "LLM编程"
  - "系统编程局限"
  - "开发者角色进化"
abstract: "文章探讨了大型语言模型在编程中的实用性和局限性，强调开发者需转向更高价值的抽象和验证工作。"
---
Eero *2025年09月07日 10:19*

## 文章总结：

以下是该文章的核心内容总结：

1. 1.
	**LLMs的实用性**
- •
	对 **重复性编程任务** （如文档查询、API学习、一次性脚本）效率提升显著，尤其在Python等高级语言中表现突出。
	- •
	能快速生成 **可验证的代码** （如数据转换、可视化脚本），释放开发者精力聚焦核心问题。
	- •
	作为 **“博学的助手”** ：在未知领域（如新框架/协议）提供入门指导，弥补知识碎片化缺陷。
3. 2.
	**系统编程的局限**
- •
	在 **C语言底层开发** （如布隆过滤器、量化算法）中表现不佳，因需复杂推理和抽象能力。
	- •
	易输出 **表面合理但存在深层缺陷** 的代码（如哈希函数设计失误），需人工深度干预。
	- •
	**反编译等辅助能力** 仍存价值，但核心逻辑仍需开发者主导。
5. 3.
	**关键洞察**
- •
	LLMs本质是 **高效插值工具** ：在训练数据覆盖范围内组合已有模式，但创新有限。
	- •
	**开发者角色进化** ：从编写重复代码转向问题抽象、验证AI输出及解决高价值问题。
	- •
	**警惕两极认知** ：既非“无脑鹦鹉”，也非“全能之神”，需理性评估其能力边界。
7. 4.
	**未来影响**
- •
	重复性编程岗位价值可能衰减， **人类核心竞争力** 转向：
	✓ 复杂系统设计
	✓ 调试与验证
	✓ 跨领域问题抽象
	- •
	善用LLMs将成为 **必备技能** ，拒绝使用可能降低职业竞争力。

## LLMs与编程：2024年初的思考

首先声明，本文并非对LLMs的回顾性总结。2023年对人工智能而言无疑是特殊的一年：重申这点似乎毫无意义。相反，本文旨在记录我作为个体程序员的亲身体验。自ChatGPT问世，乃至后来使用本地运行的LLMs以来，我一直在广泛使用这项新技术。目标是提高我的代码编写速度，但这并非唯一目的。另一个意图是不再为编程中那些不值得投入精力的方面浪费心力——比如在怪异且毫无智力趣味的细节上花费无数小时搜索文档；在没有充分理由的情况下费力学习过度复杂的API；编写几小时后就要丢弃但需要立即可用的程序。所有这些事情我都不想做，尤其是在如今谷歌已成为一片需要费力搜寻有用信息的垃圾海洋之时。

与此同时，我绝非编程新手。我完全有能力独立编写代码，事实上我也经常这样做。随着时间的推移，我越来越多地使用LLMs来编写高级代码，尤其是在Python中，而在C语言中则用得少得多。关于我个人使用LLMs的经历，令我印象深刻的是，我学会了何时该使用它们，以及何时使用它们只会拖慢我的速度。我还认识到，LLMs有点像维基百科和散落在YouTube上的所有视频课程：它们对具备意愿、能力和纪律性的人大有裨益，但对那些落后的人来说帮助甚微。我担心至少在一开始，它们只会惠及那些已经具备优势的人。

但让我们一步一步来。

## 全知者还是鹦鹉？

在机器学习这波新奇事物和进步的浪潮中，最令人担忧的现象之一是人工智能专家们承认自身认知局限性的能力不足。智人发明了神经网络，然后更重要的是，发明了一种能自动优化神经网络参数的算法。硬件变得能够训练越来越大的模型，通过利用待处理数据的统计知识（先验信息）以及大量试错进行连续逼近，人们发现了比其他架构更有效的架构。但总而言之，神经网络仍然相当不透明。

面对无法解释LLMs某些涌现能力的情况，人们本期望科学家们更加谨慎。然而，许多人却严重低估了LLMs，声称它们不过是一些高级的马尔可夫链，充其量只能复现训练集中见过的内容的极其有限的变体。然后，在证据面前，这种“鹦鹉”的说法几乎被普遍收回了。

与此同时，大量热情的民众将LLMs赋予了现实中并不存在的超自然力量。不幸的是，LLMs充其量只能在训练期间所见数据所代表的空间中进行插值：而这本身就已经很了不起了。实际上，它们的插值能力是有限的（但仍然令人震惊，并且出人意料）。哦，如果当今最大的LLMs能够在其见过的所有代码所构成的边界空间内连续插值该多好！即使它们无法产生真正的新颖事物，它们也能取代99%的程序员。现实则更为平淡，几乎总是如此。LLM当然能够编写它未曾见过完全一样形式的程序，显示出某种融合训练集中以一定频率出现过的不同想法的能力。同样明显的是，目前这种能力存在深刻的限制，每当需要微妙推理时，LLMs就会遭遇惨败。然而，它们代表了人工智能从诞生至今最伟大的成就。这似乎是无可否认的。

## 愚钝但博学

确实：LLMs最多只能进行粗略的推理，常常不准确，很多情况下还夹杂着关于不存在事实的“幻觉”。但它们拥有广博的知识。在编程领域，以及其他拥有高质量数据的领域，LLMs就像知道很多事情的愚钝学者。与这样的伙伴结对编程将非常糟糕（对我来说，即使是最广义的结对编程也很糟糕）：他们会提出荒谬的想法，我们必须不断斗争以坚持自己的观点。但如果这位博学的愚者随时听候差遣，回答所有被问及的问题，情况就不同了。当前的LLMs不会带领我们超越知识的边界，但如果我们想探索一个不太熟悉的主题，它们常常能将我们从完全无知的状态提升到足以让我们自行推进的程度。

在编程领域，也许在二三十年前，它们的能力会显得无足轻重。那时你只需了解几种编程语言、经典算法和那十个基础库。剩下的，你需要添加自己的智慧、专业知识和设计能力。如果你拥有这些要素，你就是专家级程序员，几乎无所不能。随着时间的推移，我们见证了框架、编程语言、各种库的爆炸式增长。这种复杂性的爆发常常是完全不必要且无理的，但事实就是如此。在这样的背景下，一个知晓一切的愚者成了宝贵的盟友。

让我举个例子：我使用Keras进行机器学习实验至少有一年了。后来由于各种原因，我转用了PyTorch。我已经知道什么是嵌入（embedding）或残差网络（residual network），但我不愿意一步步学习PyTorch的文档（就像我当年学习Keras那样，那时ChatGPT还不存在）。借助LLMs，编写使用Torch的Python代码变得非常容易。我只需要清楚我想搭建的模型，并提出正确的问题。

## 实例时间

我说的并非像“嘿，类X中做Y的方法是什么？”这样简单的事情。如果仅仅如此，人们可能会倾向于认同那些对LLMs持怀疑态度的人。更复杂的模型所能做到的事情要精细得多。在几年前，这简直是纯粹的魔法。我可以告诉GPT4：看，这是我在PyTorch中实现的神经网络模型。这些是我的批次（batches）。我想调整张量（tensors）的尺寸，使得生成批次的函数与神经网络的输入兼容，并且我希望以这种特定方式表示数据。你能给我展示进行这种重塑（reshaping）所需的代码吗？GPT4写出了代码，而我只需在Python CLI中测试张量是否确实具有我需要的维度以及数据布局是否正确即可。

另一个例子。不久前，我需要为某些基于ESP32的设备实现一个BLE客户端。经过一些研究，我发现多平台的蓝牙编程绑定（bindings）几乎都不可用。解决方案很简单：使用macOS的原生API，用Objective C编写代码。于是，我发现自己不得不同时处理两个问题：学习Objective C那繁琐的BLE API（充满了在我看来毫无意义的模式，我是个极简主义者，那种API与我心目中“良好设计”的标准背道而驰），以及回忆如何用Objective C编程。我上次用Objective C写程序是十年前的事了：我不记得事件循环（event loop）、内存管理等细节了。

最终结果就是这个代码，算不上漂亮，但能完成所需的功能。我在极短的时间内写出了它。否则这是不可能的。 https://github.com/antirez/freakwan/blob/main/osx-bte-cli/SerialBTE.m 这些代码主要是通过将我想要做但不太知道怎么做的事情剪切粘贴到ChatGPT上，然后让LLM解释问题所在以及如何解决来完成的。诚然，LLM并没有写太多那段代码，但同样真实的是它显著加速了编写过程。没有ChatGPT我能完成吗？当然可以，但最有趣的不是它让我多花了时间：事实是我甚至不会去尝试，因为不值得。这个事实很关键。编写这样一个对我来说是次要项目的程序，其投入产出比会很不划算。而且，这产生了一个比程序本身更有用的附带效果：为了那个项目，我修改了linenoise（我的一个用于行编辑的库）使其支持多路复用（multiplexing）。

另一个例子，这次更侧重于数据解释而非代码编写。我想配置一个Python脚本来使用我在网上找到的一个卷积神经网络（convnet），但它的文档相当匮乏。这个网络的优势在于它是ONNX格式的，因此我可以轻松提取输入输出列表及其指定名称。关于这个卷积神经网络，我只知道一件事：它检测图像中的某些特征。我不知道输入图像的格式和尺寸，特别是，网络的输出比我想象的要复杂得多（我以为它是一个二元分类器：被观察的图像是正常的还是有问题的？两个输出，但实际上有数百个）。我首先将ONNX网络元数据输出复制粘贴给ChatGPT。我向助手解释我对该网络的有限了解。ChatGPT推测输入是如何组织的，以及输出可能是表示潜在缺陷对应图像部分的归一化框（normalized boxes），以及其他表示这些缺陷可能性的输出。经过几分钟的来回交流，我得到了一个能进行网络推理（inference）的Python脚本，外加将原始图像转换为适合输入的张量等必要代码。那次会话让我印象深刻的是，当ChatGPT在一个测试图像上观察到原始输出值（基本上是logits）后，它最终“理解”了网络的工作原理：一系列浮点数提供了识别输出细节、归一化方式（框是中心点还是左上角指定）等的上下文。

## 一次性程序

我可以记录下几十个类似的案例。这将是徒劳的，因为它只是同一个故事以或多或少相同的方式在重复上演。我有一个问题，我需要快速了解某些东西，并且 *我可以验证* LLM是否在向我灌输无稽之谈。好吧，在这种情况下，我使用LLM来加速我的知识获取需求。

然而，有些不同的情况，我会让LLM编写所有代码。例如，每当我需要编写一个大致上是一次性的程序时。比如这个： https://github.com/antirez/simple-language-model/blob/main/plot.py 我需要可视化一个小型神经网络在学习过程中的损失曲线（loss curve）。我向GPT4展示了PyTorch程序在学习过程中生成的CSV文件格式，然后我要求：如果我指定了多个CSV文件作为命令行参数，我不再想要同一个实验的训练和验证损失曲线，而是想比较不同实验的验证损失曲线。上面的链接就是GPT4生成的结果。总共用了三十秒。

类似地，我需要一个程序读取AirBnB的CSV报告，并按年月将我的公寓分组。然后，考虑到清洁成本和每次预订的夜晚数，它要统计一年中不同月份的平均租金价格。这个程序对我来说非常有用。同时，编写它极其枯燥：毫无趣味可言。所以我取了一大块CSV文件复制粘贴给GPT4。我告诉LLM需要解决的问题：程序一次运行就成功了。我把它完整地展示在下面：

```python
import pandas as pdpd.set_option('display.max_rows', None)
df = pd.read_csv('listings.csv')reservations = df[df['Type'] == 'Reservation']reservations['Start Date'] = pd.to_datetime(reservations['Start Date'])reservations['Year'] = reservations['Start Date'].dt.yearreservations['Month'] = reservations['Start Date'].dt.monthreservations['Nightly Rate'] = (reservations['Amount'] - reservations['Cleaning Fee']) / reservations['Nights']
all_listings = reservations['Listing'].unique()all_years = reservations['Year'].unique()all_months = range(1, 13)index = pd.MultiIndex.from_product([all_listings, all_years, all_months], names=['Listing', 'Year', 'Month'])all_data = pd.DataFrame(index=index).reset_index()merged_data = pd.merge(all_data, reservations, on=['Listing', 'Year', 'Month'], how='left')average_nightly_rates = merged_data.groupby(['Listing', 'Year', 'Month'])['Nightly Rate'].mean().fillna(0)print(average_nightly_rates)
```

要准确理解如何分组这些原本相当分散和混乱的数据，需要进行一些简单的推理：这并非LLM仅靠复现近似于所见语言就能解决的问题。GPT4在训练中肯定观察过类似的程序，但几乎可以肯定它没有见过一个需要完全按照我要求的方式对特定格式的CSV文件进行分组的程序。这表明（在我看来）LLMs在训练集中不同程序所勾勒的空间内具备一定程度的插值能力。

编写这种类型的程序，在我看来，是对我时间的不明智使用。LLM能替我完成，无疑直接加速了我产出代码的能力：我可以专注于重要的事情。

## 当事情不按预期发展时：系统编程

尽管我在使用LLMs编程方面取得了成功，但当我用C语言写程序时，我几乎总是只把LLMs当作一种更方便的文档形式。我是系统编程方面的专家，在那个领域，LLMs只有在具备复杂推理能力时才会对我有用：而在这个场景下，它们几乎总是失败。

从这个实验的提示开始：

> 概述一个简洁小巧但可用的C语言布隆过滤器（bloom filter）实现的要求。关注哈希函数的重要方面。然后用优质的C语言编写它。
> 
> 同时考虑，你的示例实现应配置为存储100,000个元素，误判率（false positive probability）最多5%。添加的元素是空终止字符串。

以下是输出：

```cpp
#include <stdio.h>#include <stdlib.h>#include <string.h>#include <math.h>
#define N 100000 // 元素数量#define P 0.05 // 误判率#define M (int)(-(N * log(P)) / (log(2) * log(2))) // 位数组大小#define K (int)(M / N * log(2)) // 哈希函数数量
unsigned char bitArray[M / 8 + 1];
void setBit(int n) {    bitArray[n / 8] |= 1 << (n % 8);}int getBit(int n) {    return bitArray[n / 8] & (1 << (n % 8));}
// 基础哈希函数（演示用）int hash1(char *str) {    int hash = 5381;    int c;    while ((c = *str++))        hash = ((hash << 5) + hash) + c;    return abs(hash % M);}int hash2(char *str) {    unsigned long hash = 0;    int c;    while ((c = *str++))        hash = c + (hash << 6) + (hash << 16) - hash;    return abs(hash % M);}
void add(char *str) {    setBit(hash1(str));    setBit(hash2(str));    // 如果需要，添加更多哈希函数}
int is_in(char *str) {    return getBit(hash1(str)) && getBit(hash2(str));    // 如果使用了更多哈希函数，检查它们}
int main() {    char *testStr = "testString";    add(testStr);    if (is_in(testStr)) {        printf("%s is probably in the set.\n", testStr);    } else {        printf("%s is definitely not in the set.\n", testStr);    }    return 0;}
```

GPT4生成的实现并不出彩。布隆过滤器相当普遍。它并非那么异乎寻常的数据结构。然而，很明显，编写一个像样的布隆过滤器需要更强的抽象能力：例如，如何找到一种有效的方法对同一个字符串进行N次哈希，并确保这些哈希值充分去相关（decorrelated）。

不过，如果你明确要求GPT4修改哈希函数以产生N个去相关的输出，其提出的解决方案明显更可接受：

  

```python
unsigned int hash(const char* str, unsigned int hash_id) {    unsigned int hash = 5381;    int c;    while ((c = *str++)) {        hash = ((hash << 5) + hash) + c + hash_id;    }    return hash % BF_SIZE;}
```

如果它一开始就有这个想法，它就会用不同的方式编写布隆过滤器，使用单个哈希函数一次性设置K个位。

GPT4能够单独完成编写一个合适且更通用的哈希函数的任务。但在编写布隆过滤器这个更大的项目中，它未能展现出足够的推理能力，而是吐出了两个不同但相似的哈希函数：这正是人们对一篇写得糟糕的布隆过滤器示例文章所预期的结果。

当前大型语言模型薄弱的推理能力，加上该主题可能缺乏高质量资料源，更糟糕的是可能存在大量低质量资料源，共同导致了这种贫乏的结果。然而，这并非个例。我尝试在算法或系统编程领域使用LLMs的那几次，结果都极其糟糕，即使预期的推理能力并不比LLMs在Python编程等语境中表现出的更强。

与此同时，GPT-4能够（在另一次会话中）反编译它自己产生的函数，并精确理解其目的： https://chat.openai.com/share/f54b64d7-d19a-4be4-8f10-08553aa812f1 因此，断言在系统编程环境中LLMs毫无用处肯定是错误的。

一件有趣且几乎意料之中的事情是，在这些情况下，小型模型与大型模型之间的差异确实显著。让我们看看两个本地模型的表现。

例如，Mistral的混合专家模型（MoE）Mixtral对同样问题的回答如下：

```python
unsigned int hash(const char* str, unsigned int hash_id) {    unsigned int hash = 5381;    int c;    while ((c = *str++)) {        hash = ((hash << 5) + hash) + c;    }    return hash + hash_id;}
```

很明显，只在末尾加上 `hash_id` 是一个极差的解决方案。Mixtral在许多用途上是一个出色的模型，但就LLMs已然薄弱的推理能力而言，目前为止的规则无疑是：越大越好。

这是一次与本地LLM deepseek-coder的聊天记录，它被量化（quantized）到了4位，因为我内存不足以更高精度运行这个模型。然而，作为拥有340亿参数的大型模型，它在这方面的推理能力似乎相当高级。以下是聊天记录（使用llama.cpp进行）：

> 我有一个哈希函数，它应该能为相同的数据输出N个不同的哈希值。然而，当我改变 `hash_id` 的值时，产生的哈希值分布非常糟糕
> 
>   
> 
> ```python
> unsignedinthash(constchar* str, unsignedint hash_id) {
> unsignedint hash = 5381;
> int c;
> while ((c = *str++)) {
>         hash = ((hash << 5) + hash) + c;
>     }
> return hash + hash_id;
> }
> ```
> 
> 也许我使用的加盐（salting）策略很差？我该如何改进它？

\[Deep-seek coder 回复\]

> 您实现中的一个可能问题是您只是在哈希值末尾简单添加了 `hash_id` 。这可能导致分布不佳，特别是当 `hash_id` 过大或分布不均匀时。
> 
> 考虑使用按位操作来混合 `hash_id` 。这里是一个使用XOR的例子：
> 
> ```python
> unsignedinthash(constchar* str, unsignedint hash_id) {
> unsignedint hash = 5381;
> int c;
> while ((c = *str++)) {
>         hash = ((hash << 5) + hash) ^ c + hash_id; // 使用XOR混合hash_id
>     }
> return (hash ^ hash_id); // 最后再混合一次hash_id
> }
> ```
> 
> 这将比简单相加更好地在哈希值中分散 `hash_id` ，从而可能导致更均匀的分布。\[省略...实际回复包含更多信息\]

对于一个在我MacBook M1 Max上运行的模型来说，这不算坏。它还混合使用了加法与异或（XOR）。在这种情况下，模型当然受益于我提供了关于要解决问题的线索，但正是模型识别出了麻烦的真正根源，并且提出的替代方案是有效的。像这样的东西超出了任何书籍、文档或谷歌搜索的能力范围。无论多么初级，作为插值的结果，或者无论你如何看待它，模型已经进行了某种形式的推理——如果在这个特定情况下，我们将识别问题根源及其潜在解决方案接受为“推理”。无论人们如何看待LLMs，声称它们对程序员没有帮助是极其草率的。

然而，与此同时，我过去几个月的经验表明，对于系统编程，如果你已经是有经验的程序员，LLMs几乎从未提供可接受的解决方案。让我再展示一个真实世界的例子。我当前的项目ggufflib涉及编写一个读写GGUF格式文件的库，这是llama.cpp加载量化模型使用的格式。最初，为了理解量化编码的工作原理（出于速度原因，每个量化的比特以巧妙的方式存储），我尝试使用ChatGPT，但最终我选择反编译llama.cpp的代码：这快得多。一个能够体面地协助系统程序员的LLM，如果它看到了数据编码的“结构体”声明和解码函数，应该能够重建数据格式文档。llama.cpp的函数足够小，可以完全放入GPT4的上下文窗口中，但输出完全没用。在这些情况下，事情要像过去一样做：纸和笔，阅读代码，并观察解码器提取的比特被注册到哪里。

让我更好地解释一下上面的用例，以便你可以自己尝试（如果你愿意的话）。我们有这个来自llama.cpp实现的结构体。

```python
// 6-bit quantization
// weight is represented as x = a * q
// 16 blocks of 16 elements each
// Effectively 6.5625 bits per weight
typedefstruct {
uint8_t ql[QK_K/2];      // quants, lower 4 bits
uint8_t qh[QK_K/4];      // quants, upper 2 bits
int8_t  scales[QK_K/16]; // scales, quantized with 8 bits
ggml_fp16_t d;           // super-block scale
} block_q6_K;
```

然后是这个用于反量化（dequantization）的函数：

```python
voiddequantize_row_q6_K(const block_q6_K * restrict x, float * restrict y, int k) {
    assert(k % QK_K == 0);
constint nb = k / QK_K;
for (int i = 0; i < nb; i++) {
constfloat d = GGML_FP16_TO_FP32(x[i].d);
constuint8_t * restrict ql = x[i].ql;
constuint8_t * restrict qh = x[i].qh;
constint8_t  * restrict sc = x[i].scales;
for (int n = 0; n < QK_K; n += 128) {
for (int l = 0; l < 32; ++l) {
int is = l/16;
constint8_t q1 = (int8_t)((ql[l +  0] & 0xF) | (((qh[l] >> 0) & 3) << 4)) - 32;
constint8_t q2 = (int8_t)((ql[l + 32] & 0xF) | (((qh[l] >> 2) & 3) << 4)) - 32;
constint8_t q3 = (int8_t)((ql[l +  0] >> 4) | (((qh[l] >> 4) & 3) << 4)) - 32;
constint8_t q4 = (int8_t)((ql[l + 32] >> 4) | (((qh[l] >> 6) & 3) << 4)) - 32;
                y[l +  0] = d * sc[is + 0] * q1;
                y[l + 32] = d * sc[is + 2] * q2;
                y[l + 64] = d * sc[is + 4] * q3;
                y[l + 96] = d * sc[is + 6] * q4;
            }
            y  += 128;
            ql += 64;
            qh += 32;
            sc += 8;
        }
    }
}
```

如果我要求GPT4写出所用格式的概述，它很难清晰地解释“ql”的低4位/高4位（取决于权重位置）如何存储块。为了这篇博文，我还尝试要求它写一个更简单的函数来展示数据是如何存储的（也许它无法用语言解释，但可以用代码展示）。生成的函数在很多方面都是错误的，索引错了，6位到8位的符号扩展（sign extension）也错了（它只是强制转换为uint8\_t），等等。

顺便说一下，以下是我最终自己编写的代码：

  

  

```python
} elseif (tensor->type == GGUF_TYPE_Q6_K) {
uint8_t *block = (uint8_t*)tensor->weights_data;
uint64_t i = 0; // i-th weight to dequantize.
while(i < tensor->num_weights) {
float super_scale = from_half(*((uint16_t*)(block+128+64+16)));
uint8_t *L = block;
uint8_t *H = block+128;
int8_t *scales = (int8_t*)block+128+64;
for (int cluster = 0; cluster < 2; cluster++) {
for (uint64_t j = 0; j < 128; j++) {
                    f[i] = (super_scale * scales[j/16]) * ((int8_t) ((((L[j%64] >> (j/64 * 4)) & 0xF) | (((H[j%32] >> (j/32 * 2)) & 3) << 4)))-32);
                    i++;
if (i == tensor->num_weights) return f;
                }
                L += 64;
                H += 32;
                scales += 8;
            }
            block += 128+64+16+2; // Go to the next block.
        }
    }
```

从上面的函数中，我删除了这段代码的实际贡献：详细注释了llama.cpp Q6\_K编码使用的确切格式的长篇注释。现在，如果GPT能为我做这件事将非常有用，我打赌这只是几个月的问题，因为这些任务是无需任何突破、仅通过一些扩展就能达到的。

## 客观看待此事

我很遗憾这么说，但事实如此：如今绝大多数编程工作，无非是用稍有不同的形式重复相同的内容。这并不需要高级推理能力。大型语言模型（LLM）非常擅长此类工作，尽管它们仍深受上下文长度限制。这确实值得程序员深思：编写这类程序是否值得？当然，你能获得报酬，而且相当可观，但如果LLM能完成其中部分工作，或许这并非五到十年后最理想的职业选择。

那么，LLMs是否具备一些推理能力，或者这全是虚张声势？也许有时它们看似在推理，只是因为如同符号学家所说，“能指”（signifier）制造了一种实际并不存在的“意义”（meaning）的假象。那些足够深入使用过LLMs、同时接受其局限的人，无疑知道情况并非如此简单：它们融合以往所见内容的能力，远非随机复现词语可比。尽管它们的训练主要是在预训练阶段通过预测下一个词元（token）进行的，但这一目标迫使模型形成某种抽象模型。这个模型是薄弱的、零散的和不完美的，但如果我们观察所见，它必然存在。如果我们的数学确定性值得怀疑，而最伟大的专家常常立场对立，那么相信自己亲眼所见似乎是明智之举。

最后，在今天不使用LLMs进行编程有何意义？向LLMs提出正确的问题是项关键技能。练习得越少，就越难以通过AI改进自己的工作。再者，发展描述问题的能力，在与其他人类交流时同样有用。LLMs并非唯一有时无法理解我们意图的对象。沟通能力差是一个巨大的限制，而许多程序员尽管在特定领域能力很强，却沟通得非常糟糕。而且现在谷歌已不可用：即使仅将LLMs用作压缩形式的文档也是个好主意。就我个人而言，我将继续广泛使用它们。我从不热衷学习某个晦涩通信协议的细节，或某个想炫技的人编写的库中那些复杂的方法。在我看来那像是“垃圾知识”。LLMs让我日益免受此苦。

继续滑动看下一个

智能曙光

向上滑动看下一个