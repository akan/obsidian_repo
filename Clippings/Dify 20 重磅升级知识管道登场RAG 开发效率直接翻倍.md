---
title: "Dify 2.0 重磅升级！知识管道登场，RAG 开发效率直接翻倍"
source: "https://mp.weixin.qq.com/s/KNI8BLEkCpU99FZGRaqviA"
author:
  - "[[yxkong]]"
published:
created: 2025-09-16
description: "上个月就给大家同步了dify的下一个工作，rag2.0，当时我和他们的产品聊过rag2.0，核心的rag不会"
tags:
  - "知识管道"
  - "RAG升级"
  - "文档处理"
abstract: "Dify 2.0引入了知识管道功能，显著提升了RAG开发效率，通过流水线方式处理文档并提供了多种内置模板。"
---
Original yxkong *2025年09月16日 08:38*

上个月就给大家同步了dify的下一个工作，rag2.0，当时我和他们的产品聊过rag2.0，核心的rag不会变动太多(dify本身rag能力够用，问题最多的在于文档格式)。主要是 `数据解析这块，以流水线的方式处理文档。` 也叫知识管道。

上周dify发布了1.8.1以后，随后又发布了预览版dify 2.0.0 作为dify的大版本升级，更新的内容会比较多，如果是生产环境，建议先不要升级，等到正式发布以后再动，如果只是体验，可以直接升级。

> 注意，注意，注意，升级前一定要先备份一下。

## 升级

本次预览版的升级，是以tag的形式发布的。如果你fork的代码，不会同步tags和其他分支的，你可以把`.git/config` 里的地址改为dify的。  

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/AaKTtPGkoWIvbQROmInakibibfyibQaiau7x4fbICqfdKV3fMOFCslcoyM1iaLd2BbaXbbWLo5VribcTcQQELYy90sibw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

如果自己本身代码有改动，先拉一个分支，本地提交下，然后再创建一个新的分支，来试验2.0.0版本。

```
# 只拉取指定的tag
git fetch origin tag 2.0.0-beta.2
# 创建一个2.0.0-beta的分支
git checkout -b 2.0.0-beta 2.0.0-beta.2
```

### 关闭并重启

```
docker compose down

docker compose up -d

#执行2.0升级命令，分组名称，默认是docker-api-1  我命名为dify了
docker exec -it dify-api-1 uv run flask transform-datasource-credentials
```

## 知识管道

在升级之前我们要么在后台直接上传文本处理知识库，要么在通过工作流或者代码直接调用api处理。在本次升级以后，官方直接把知识库的处理流程给开放了出来，并且提供了一些模板案例。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
在升级之前，我们通过工作流也能完成，无非麻烦一些，升级以后，官方将处理流程进行了抽象。

### 变化

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
升级以后，可以在知识库中创建知识库的下方看到有一个 `通过知识流水线创建知识库` 。  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
在知识库里有一个流水线的功能，存量知识库可以转换为流水线。

### 通过知识管道处理知识库

### 知识管道创建

知识管道创建有两种模式，一种是创建一个空白的管道自己配置，一种是利用官方内置流水线（Built-in Pipeline)。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

先看下内置的流水线种类，以及作用。内置的知识流水线有以下七种：

| 模版名称 | 分段结构 | 索引方式 | 检索设置 | 说明 |
| --- | --- | --- | --- | --- |
| `1`  ,通用模式（General Mode） | 通用模式 | 经济 | 倒排索引 | 将文档内容分割成较小的段落块（通用块），直接用于匹配用户查询和检索。 |
| `2`  ,父子模式（Parent-child Structure) | 父子模式 | 高质量 | 混合检索 | 采用了高级分块策略，将文档文本分成较大的”父块”和较小的”子块”。其中，“父块”包含了”子块”。这样既保证了检索的精确性，又维持了上下文的完整性。 |
| `3`  ,简单问答（Simple Q&A) | 问答模式 | 高质量 | 向量搜索 | 将表格数据转化为一问一答的形式，通过问题匹配来快速找到对应的答案信息。适用于结构化表格数据。 |
| `4`  ,复杂 PDF （含图片和表格）（Complex PDF with Images & Tables） | 父子模式 | 高质量 | 混合检索 - 加权评分 | 提取 PDF 文件内的图像和表格内容。 |
| `5`  ,LLM 上下文增强（Contextual Enriching Using LLM) | 父子模式 | 高质量 | 混合检索 - 加权评分 | 将文档内的图片和表格提取出来，使用大型语言模型自动生成描述性注释，实现上下文的智能增强。 |
| `6`  ,Markdown 转换（Convert to Markdown) | 父子模式 | 高质量 | 混合检索 - 加权评分 | 专为 DOCX、XLSX 和 PPTX 等 Office 原生文件格式设计，将其转换为 Markdown 格式以便更好地进行信息处理。 |
| `7`  ,LLM 生成问答（LLM Generated Q&A) | 问答模式 | 高质量 | 向量搜索 - 加权评分 | 使用大型语言模型自动生成结构化的问答对，通过问题匹配机制找到相关的答 |

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> 需要注意的是，断网情况下这些内置流水线加载不出来。从日志上可以看到，先从官方加载，官方网络不通，直接从本地加载，我是一路升级过来的，数据库里应该没有对应的信息。

### 通用模式

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
创建以后，可以看到依赖一堆的插件。因为官方是示例性质的，所以是一个大而全的集合。这里需要重点说一下两个插件

- • dify文本提取器
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
在知识管道里，点击空白右键，添加节点，在面板中有数据源的选项，这个是和现有工作流的差异。  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
从模板上我们可以看到下，也是这么四步。

- • `第一步` 配置数据源，多种形态
- • `第二步` 文档处理：这个示例里配置了两个处理器，一个是dify内置的文档解析器（Dify Extractor），一个是原来工作流节点的文档提取器。
- • `第三步` ：文本分块，这里使用的是dify 封装的通用分块器
- • `第四步` ：知识库配置，这里主要是配置 `索引方法` 和 `检索策略` ，这个和 `第三步紧密关联` ，
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
在 `第四步` ，分段结构没有必要，这个由 `第三步` 的分块器决定的，有这块配置反而增加了配置的复杂度。还不如直接根据 `第三步` 直接填写。

从dify的示例来说，大都是父子分段的格式，从另外一个层面可以反映出来，复杂文档，父子分段的效果最好。

我再讲解两个复杂的案例。

### 复杂 PDF 处理

这个是从 `模板4` 创建而来的。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
依赖父子文本分块器。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
整个流程，还是按照之前的四步来处理的。

- • `第一步` 配置数据源，是上传的文本
- • `第二步` 文档处理：这里使用的是MINERU，除了MINERU还可以用其他的文档处理插件处理。
- • `第三步` ：文本分块，使用的是父子分块器
- • `第四步` ：知识库配置，这里主要是配置 `索引方法` 和 `检索策略` ，这个和 `第三步紧密关联` ，
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
复杂pdf的处理，完全依赖于处理器的能力。

大家 **关闭梯子** ，去mineru的官网申请token就可以  
https://mineru.net/apiManage/token

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
申请完token以后mineru的配置也很简单。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
最后配置完索引方式和检索设置以后，别忘点击右上角的发布，发布的工作流，只是在本知识库中使用。回到文档那里，我们上传文档，然后等待管道的处理即可。  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
这个是上传的一个ppt的解析效果。图片解析出来了，也显示了。

> 这个折腾了1个多小时，才显示出图片，需要注意，升级那里的配置图片显示。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### LLM 上下文增强

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
整个流程，还是按照之前的四步来处理的。

- • `第一步` 配置数据源，是上传的文本
- • `第二步` 文档处理：这里使用的是MINERU+LLM，我使用的qwen-vl.
- • `第三步` ：文本分块，使用的是父子分块器
- • `第四步` ：知识库配置，同上

### 对比

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
上图左侧为通过多模态增强的解析，右侧为只用mineru解析，可以看到

- • 增加了多模态，只分了5段，根据语义做了归拢
- • 单纯的mineru 解析出来了11个分段
![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
单纯的从解析出来的内容来看，多模态对图片进行了简单的描述，方便检索到对应的图片，同时内容的准确度也有极大的提升。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
mineru只是对图片进行了简单的解析，图片后面跟的是后面的内容，并没有对图片进行描述。

## 其他

### 数据源插件

dify 2.0支持多种来源的数据。  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
在插件市场有一个数据源的插件的分类。是数据管道支持的数据源类型。大家可以看看。

### 文档处理

文档处理器是一个特殊的插件，官方示例里有下面几种：

- • 文档提取器 (Doc Extractor)
- • Dify 提取器 (Dify Extractor)：dify开发的内置提取器，针对 Doc 文件进行了专门优化。它能够从文档中提取图片，进行存储并返回图片的 URL
- • MinerU
- • Unstructured：将文档转换为结构化的机器可读格式，具有高度可定制的处理策略

在插件市场我们可以看到其他的插件，比如合合

### 分块器

目前dify官方支持三种分块器，其实就是知识库里的配置进行了抽取。

- • 通用分块器 (General Chunker)
- • 父子分块器 (Parent-child Chunker)
- • 问答处理器 Q&A Processor (Extractor+Chunker)

每个分块器都有不同的特点和使用场景。

| 类型 | 特点 | 使用场景 |
| --- | --- | --- |
| 通用分块器 | 固定大小分块，支持自定义分隔符 | 结构简单的基础文档 |
| 父子分块器 | 双层分段结构，平衡匹配精准度和上下文 | 需要较多上下文信息的复杂文档结构 |
| 问答处理器 | 处理表格中的问答组合 | CSV 和 Excel 的结构化问答数据 |

分块器的设置，是在处理文档的时候进行设置，每个文档都可以自定义。

### 知识库配置

索引方式和检索设置参考原知识库设置即可。

## 常见问题解决

### 新建流水线空白

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  
开启梯子，重新刷新即可。  

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### mineru 异常

- • 无法登录
- •![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
	> 关闭梯子

### 图片不显示

按照下面的内容配置以后，销毁并重启服务

`.env配置`

```
# 配置文件外网路径，自己本机ip或者域名
FILES_URL=http://10.1.0.65:5001
# 内网地址,不能配置，否则无法显示图片
INTERNAL_FILES_URL=
```

`docker-compose.yaml配置`

```
# 我增加了name,不加，默认为docker
name: 'dify'  
services:  
  # API service  
  api:  
    image: langgenius/dify-api:2.0.0-beta.2  
    ports:  
      - '${DIFY_PORTS:-5001}:5001' # 开放api的的端口，用于文件访问
```

  

个人观点，仅供参考

继续滑动看下一个

5ycode

向上滑动看下一个