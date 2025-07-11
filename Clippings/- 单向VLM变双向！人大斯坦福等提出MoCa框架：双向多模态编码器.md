---
title: "单向VLM变双向！人大斯坦福等提出MoCa框架：双向多模态编码器"
source: "https://mp.weixin.qq.com/s?__biz=MzI3MTA0MTk1MA==&chksm=f010c261ab1ceb771a113a04c78325c74b26b706c822f593fe765b89cadde4d940d31201cf41&idx=3&mid=2652608431&sn=d4a3cc10b47144dc6443b7212307af9b#rd"
author:
  - "[[新智元]]"
published:
created: 2025-07-10
description:
tags:
  - "双向多模态编码器"
  - "MoCa框架"
  - "持续预训练"
  - "异构对比微调"
abstract: "MoCa框架通过持续预训练和异构对比微调将单向视觉语言模型转化为双向多模态编码器，显著提升模型性能和泛化能力。"
---
![cover_image](https://mmbiz.qpic.cn/sz_mmbiz_jpg/UicQ7HgWiaUb0y27uU6icWo72V6vj4ia2ZtIKYYUdjAe8GD9YGicF6mwRLDHP7HTg0oMiaa6v0sjvCFtRJp1BVPR3xPg/0?wx_fmt=jpeg)

新智元 [新智元](https://mp.weixin.qq.com/) *2025年07月10日 15:04*

### 新智元报道

编辑：LRST

##### 【新智元导读】MoCa框架把单向视觉语言模型转化为双向多模态嵌入模型，通过持续预训练和异构对比微调，提升模型性能和泛化能力，在多模态基准测试中表现优异，尤其小规模模型性能突出。

预训练的视觉语言模型（VLM）因其强大的图文联合建模能力，在多种任务上展现出巨大潜力，也成为了许多目前广泛使用的多模态嵌入模型的基础。

然而，这些使用因果注意力机制的多模态嵌入模型在多模态嵌入任务中存在三个关键限制：

- 表示能力弱：因果注意力机制单向预测的特性，限制了模型充分捕获双向跨模态的深层语义。
- 泛化性差：传统模型多依赖于简单的图文对训练数据，缺乏更广泛、更丰富的数据源，难以在新任务或新领域快速泛化。
- 扩展性低：现有模型的对比学习方法严重依赖于高质量的标注数据，导致成本高昂，难以有效地利用大规模无标注数据。

如何高效地将预训练因果VLM转变为强大的双向多模态编码器，已成为多模态理解领域的重要挑战。

为了克服这些挑战，亟需开发出一种新型框架，能够高效利用大规模非标注数据，提升多模态嵌入模型的双向理解和泛化能力。

中国人民大学、微软亚洲研究院、斯坦福大学、普林斯顿大学等机构的研究者提出了MoCa框架，采用双阶段方法，将基于单向注意力预训练的视觉语言模型（VLM）转化为有效的双向多模态编码模型。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3lvm7xrrFSlZUcOsWGk4YBzAHyZKtThMArYADqW0wWNH7J01vFsPqMNzZu0KJpGRCFgfFwh60Ozg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

**论文链接** ： https://arxiv.org/abs/2506.23115

**项目主页** ： https://haon-chen.github.io/MoCa/

MoCa通过针对不同模态的持续预训练和异构对比微调，有效解决了传统模型表示能力弱、泛化性差、扩展性低的问题，取得了显著的性能提升。

  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

**MoCa：从单向到双向**

**MoCa** 框架包括两个核心阶段：

1. **针对不同模态的持续预训练（Modality-aware Continual Pre-training）**
	  
	利用随机遮蔽的文本与图像块进行联合重建（MLM+MAE），增强模型的双向跨模态理解能力；有效捕获了更丰富的跨模态语义信息。
2. **异构对比微调（Heterogeneous Contrastive Fine-tuning）**
	  
	利用多样化的训练数据（如长文档、专业领域图文、纯文本等）和任务批次采样策略，进一步提高模型的鲁棒性和泛化性能。

通过上述方法，MoCa有效提升了多模态嵌入模型的双向表示能力和泛化性能，并显著降低了对高质量标注数据的依赖。

实验结果表明，MoCa在多个标准多模态基准测试中表现出色，尤其是在小规模模型条件下即可超越更大模型的性能，为多模态嵌入模型的进一步发展奠定了坚实基础。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3lvm7xrrFSlZUcOsWGk4YBNOqa3xR7NaiaOWeJ4jacMdygkj9T5rpp8ia3Nic8D14cey4nCiaE919NaA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

MoCa框架包含两个 关键的技术组件 ：

1. **针对不同模态的持续预训练（Modality-aware Continual Pre-training）**
	**跨模态双向注意力** ： 有效捕获图文之间的深层语义交互，改善因果模型单向推理的不足。
	  
	**联合mask重建（MLM+MAE）** ： 随机遮蔽文本词汇与图像块，让模型双向预测并恢复缺失信息；充分挖掘无标注数据的潜力，增强模型的跨模态表示能力。
2. **异构对比微调 (Heterogeneous Contrastive Fine-tuning)**
	**任务批次采样策略** ： 动态采样不同任务批次，确保模型能够高效地适应多任务、多领域的应用需求。
	**多样化数据源** ： 采用长文档、多领域图文、纯文本等丰富数据类型，提升模型的泛化能力。

通过这两个组件的紧密协作，MoCa实现了预训练到微调的高效流程，充分利用无监督数据，在性能和泛化性上取得突破。

**与传统多模态嵌入框架的对比**

MoCa框架相比传统的多模态嵌入模型有着明显优势。

**· 传统框架（如mmE5、VLM2Vec）**

单纯依赖高质量标注图文对，扩展性低；

以单向因果注意力为主，跨模态表示能力受限；

对新领域、新任务泛化性差。

**· MoCa框架**

充分利用大规模无标注数据，通过持续预训练显著降低成本；

双向模态交互机制，能更深层次地捕捉图文语义；

丰富的数据类型和任务采样策略，大幅提升泛化性能和扩展性。

因此，MoCa的提出为多模态嵌入领域提供了一条更加高效、更具泛化性的研究路径。

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3uEdSPKrwGNmZEOaaGyzVvZ8dTtE9jU1rFsda3llYbCZpmWfiazUYjWBLTGvlPpXucH8Q0lEUJN3Q/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1)

**实验效果：以小博大，效果显著提升**

研究人员在主流多模态嵌入基准MMEB和ViDoRe-v2上进行了全面评估。

**在MMEB基准上**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3lvm7xrrFSlZUcOsWGk4YBJWfx9cCsicPhDpNfbZrQXvJQB6bVoibVXagIRZFHYic88x6SibeRwAvMWQ/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

3B的MoCa模型即可达到现有7B规模baseline模型的性能水平。

7B的MoCa模型实现当前最佳性能（SOTA），显著超越现有模型。

**在ViDoRe-v2任务中**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3lvm7xrrFSlZUcOsWGk4YBXFnMh1wc5vDntAKplYTAdI0CTDAErGNGgicY6Wn011qjicZJZwzibGezw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

MoCa在跨语言、跨领域的复杂任务中表现突出，整体性能超过现有先进方法。

特别在多语言和专业领域数据泛化能力上表现出明显优势。

实验结果充分验证了MoCa框架在低资源条件下实现高性能的能力，以及卓越的泛化性能。

**消融实验**

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/UicQ7HgWiaUb3lvm7xrrFSlZUcOsWGk4YBVQQSuSjCmIQ1Jvoru5l88PRylVzNicK9iaHS7nTmQtjNzv5KjWBicHLBw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

实验验证了MoCa各核心组件的有效性，结果显示，去除针对不同模态的持续预训练或异构对比微调中的任一环节，模型性能均明显下降，进一步证明了MoCa框架每个组件的必要性和重要性。

**持续预训练的数据规模效应**

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

为了探究持续预训练数据规模对模型性能的影响，研究人员进行了针对性实验。

实验表明，随着用于持续预训练的数据规模增加，模型的多模态理解性能持续提升，但存在一定的性能饱和效应。

结果显示，在实际应用中应合理权衡数据规模与计算成本，以实现最优性能。

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**未来展望**

MoCa框架的成功验证了针对不同模态的持续预训练和异构对比微调策略的巨大潜力。这一方法不仅提升了小规模模型的表现，也为更广泛的数据利用和泛化能力奠定了基础。

未来，研究人员计划进一步探索以下几个方面：

- **扩展到多模态多语言领域** ，探索更广泛的跨语言泛化能力。
- **集成更多模态信息** ，如视频和音频，推动模型在更复杂场景下的应用。
- **优化持续预训练策略** ，探索更高效的训练技术，进一步降低计算成本。

通过持续的努力，MoCa框架一定能够在多模态嵌入领域发挥更广泛、更深远的影响。

参考资料：  

https://arxiv.org/abs/2506.23115

  

![Image](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![图片](https://mp.weixin.qq.com/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

继续滑动看下一个

新智元

向上滑动看下一个