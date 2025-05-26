---
title: "dify案例分享-探秘：AI 怎样颠覆财报分析，打造酷炫 HTML 可视化文章介绍利用 AI 分析上市公司财报并生成可视 - 掘金"
source: "https://juejin.cn/post/7504513808170401842"
author:
published: 2025-05-15
created: 2025-05-16
description: "文章介绍利用 AI 分析上市公司财报并生成可视化 HTML 页面的工作流。该工作流由开始、mineru 插件、大语言模型等组件构成，详细阐述各组件设置、配置过程，经测试可快速生成报表，能提升财报分析展"
tags:
  - "clippings"
---
![横幅](https://p6-piu.byteimg.com/tos-cn-i-8jisjyls3a/0bdb448b29434da59b1e21fcb970e11f~tplv-8jisjyls3a-image.image) ![](https://p9-piu.byteimg.com/tos-cn-i-8jisjyls3a/c676d36a15f248e8aedb339deddadb90~tplv-8jisjyls3a-image.image)

## 1.前言

上市公司财报，即上市公司财务报告，是上市公司按照相关法规要求定期向公众披露的反映其财务状况、经营成果和现金流量等信息的正式记录。它是资本市场中重要的信息披露文件，为投资者、分析师及其他利益相关者提供了关键的财务数据和经营绩效信息，是评估公司财务健康状况和投资价值的重要依据。

下面是一些财务报告主要指标。

![image-20250513190344325](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/2227ea3c8d614718b209e89bca47b938~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=QPapHpQCvJABXMLtQUw1am5f99Q%3D)

目前各大上市公司2024年度财报和2025年第一季的财报都已经披露，那么我们可以不可以利用AI 来帮我们快速分析这些财报生成漂亮的财务报表呢？今天就带大家来实现这个工作流。

工作流效果：

![image-20250513190632774](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a5a468955c5f4c77938c4e9cbbed1d3b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=a6oX02p6ZXD%2B5Z6s%2Bn5DtsVVHlU%3D)

生成的报表给大家展示一下：

![image-20250513190715454](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6471eae809b4414c89e4083b2f6e68aa~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=FP91Jmb8qSXBDfExqxlrBfmYQ%2Bk%3D)

![image-20250513190747408](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/981d7bbd98d94efd9c68312e27f4cf30~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=XmLWW0azts%2F6wPUxX43gmuukFvQ%3D)

![image-20250513190832219](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/8696956656f54becbc7da3b512d82828~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=GI4B8eC%2FcUPyd4OCyl1Wi3nObTM%3D)

看起来效果不错，我们接下来告诉大家3分钟生成这样的基于上市公司财务报表的可视化HTML页面。

我们首选看一下这个工作流由哪些组件构成的。

1开始。2、mineru 3 、llm大语言模型、4 参数提取器、5 代码处理生成html调用、6、直接回复。

![image-20250513191740232](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/0189076b705a4b8ebd004bcd85f46087~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=EcyJQvRiSSGvNw022rWy4KoFL6A%3D)

### 开始

这个开始节点主要是用户通过上传一些上市公司财务报告，所以目前它只有一个参数就是file。

关于财务文件从哪里获取，大家可以通过 [gu.qq.com/sz002594/gp…](https://link.juejin.cn/?target=https%3A%2F%2Fgu.qq.com%2Fsz002594%2Fgp%2Fjbnb "https://gu.qq.com/sz002594/gp/jbnb") 来获取（我这里以比亚迪公司为案例）

![image-20250513192007831](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/8d78e21795684e73803c4cd07f1a2819~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=YS9R37igH4mtrd6HUbr3BID1YxU%3D)

下载的报告是PDF格式的，下载后保存本地电脑即可。

开始节点我们设置单个文件。

![image-20250513192124875](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/677d26681c3448e6b42a4321f9e17612~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=sjKwwRSdZ8u%2FJYebj7EXL7gr7h0%3D)

![image-20250513192217850](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/0fd8cfc4a8c14b3a96a825dd1b3162bf~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=GglLNoEG1UXUKrg%2FuamL52RtQjk%3D)

以上我们就完成了开始节点的设置。

### mineru 插件

这里我们需要用到一个叫做mineru插件。MinerU 是一款开源的高质量数据提取工具，专注于将 PDF、网页和电子书中的内容高效提取并转换为机器可读格式（如 Markdown 和 JSON）。它由上海人工智能实验室 OpenDataLab 团队开发，旨在解决复杂文档的解析问题，支持多模态内容（包括文本、图片、表格和公式）的提取。

我们需要上面这个插件工具把开始节点中上传的PDF文档信息提取出来。 有的小伙伴说dify工作流里面不是有文档提取器吗？这个不也可以提取数据吗？是的你说的没错，文档提取器是可以提取文档内容信息，因为考虑上市公司财务报表数据准确性和复杂性我们这里建议使用mineru工具来提取文档里面的数据。

#### mineru 插件安装

我们在插件市场查找mineru。点击安装完成插件的安装。

![image-20250513192715292](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/44d065850603453a8293d9c837635293~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=LfOLYlV85TTg4AgyDQIftG%2Fm0Lk%3D)

![image-20250513192835029](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/c4dbb4c785b647f2a435f994a883a97b~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=iD%2BEEhZ76HuXrmFtV0tM1SW536w%3D)

#### mineru 注册

在使用这个插件之前我们需要在 [mineru.net](https://link.juejin.cn/?target=https%3A%2F%2Fmineru.net "https://mineru.net") 网站上注册获取授权。这个注册需要审批我们登录 [mineru.net](https://link.juejin.cn/?target=https%3A%2F%2Fmineru.net "https://mineru.net") 网站获得授权审批通过后获取API

![image-20250513193047676](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9eb635d340d14c129588e679563d2343~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=PYD2yx2BPYjvdByAwrTDE%2FYX%2BTM%3D)

#### mineru授权

我们获取api token

![image-20250513193412614](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/29dbcf9c7ce7471f963008aaf1b00812~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=WvzL1cXRBWN%2Bx8aLQnRxi5jJgeA%3D)

![image-20250513193503946](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/4ff1f5d0d06145febac546b1df69c5dc~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=rODHn3RxoQnuTSmBO2JuXwj1TRk%3D)

以上步骤我们完成授权。

![image-20250513193526779](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/da3c90f60a81419eb9fe7a6a56ed1f02~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=waqg1YL47KvTFDXRPj%2FWWIhOOaA%3D)

当然如果你自己有显卡资源 也可以自己部署mineru，具体步骤这里就不在这里阐述。

#### mineru工作流配置

我们回到dify工作流，点击添加节点-工具-mineru

![image-20250513193749005](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/552b327915614986adebe3204105661d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=lZLWx5FSigKJ%2B0j%2FhVrc%2BXj1yEs%3D)

接下来设置一下mineru，输入参考就是开始节点传入的file. 解析方法： orc;开启公式识别:true 开启公式识别:true 布局检测模型:doclayout-yolo 文档语言：auto 开启ocr识别：true. 具体配置如下：

![image-20250513194050677](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5a5bff933f6e44aaab0295fba48775bc~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=GMdN2Nvy32ySKNklP9%2Bv6CFfym8%3D)

### llm大语言模型

这个llm大语言模型我们选择2025年4月29日阿里通义千问开源的Qwen3-235B-A22B模型，模型这里我们使用魔搭社区提供的免费的Qwen3-235B-A22B模型

![image-20250513194301597](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/61b12ac9cff447aca2d57ffa32aeeda8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=QcQpLzRfV%2Fo6rD8hdkNsIpElavs%3D)

系统提示词：

```yaml
# 角色：上市公司财报数据HTML页面生成专家
## 简介：
- 作者：周辉
- 版本：3.0
- 语言：中文
- 描述：专业的财报数据分析师和HTML动态网页设计专家，擅长创建符合现代设计趋势和技术要求的财报展示页面。
## 背景：
你是一位资深的财务分析师和网页设计专家，专门将上市公司财报数据转化为视觉吸引力强的HTML动态网页。你熟悉各种现代web技术和设计趋势，尤其擅长Bemto Grid布局和GSAP动效。

## 目标：
生成一个完整的、可直接使用的HTML页面，用于展示上市公司财报数据，该页面应符合所有技术和设计要求。

## 技术要求：
1. 使用Bemto Grid布局系统
2. 集成GSAP动效和Framer Motion
3. 基于HTML5和TailwindCSS开发
4. 响应式设计和大小字体对比应用
## 设计规范：
1. 根据公司特性选择适当的背景颜色和主题色调
2. 应用超大字体和视觉元素突出重点，创造视觉对比
3. 中英文混排，大字体为主，英文小字点题
4. 使用简洁的矩形元素进行数据可视化
5. 高亮色透明效果用于边框，避免不同高亮色互相覆盖
6. 所有数据图表采用脚注样式，保持主题一致性
7. 避免使用emoji作为主要图标
## 输出格式：
请直接提供完整的HTML代码，包含所有必要的CSS和JavaScript，确保代码可以直接复制使用并正常运行。代码应包含：

1. 完整的HTML结构
2. 内联或外部引用的CSS（包括TailwindCSS）
3. 必要的JavaScript（包括GSAP和Framer Motion）
4. CDN引用和其他必要的资源链接
## 初始化：
作为上市公司财报数据HTML页面生成专家，我已准备好为您创建一个完整的HTML页面。请提供您想要分析的上市公司及其最新财报的关键信息，我将直接为您生成可用的HTML代码。
```

用户提示词

```yaml
根据{{#1747105471978.text#}}最新财报内容和补充内容以及财报数据分析内容，生成一个 HTML 动态网页
```

![image-20250513194434621](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/fb7d55ef69524d6a92416c9f8cf9b344~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=xMYQc1ohZTN1jxkb%2FA1M0zJyW2s%3D)

### 参数提取器

接下来我们用到了一个叫做参数提取器的组件。这个组件的主要目的是把上个LLM大语言模型输出的html 提取出来。这里有小伙伴可能有疑问了，上面个流程我们不是让它直接返回html 内容吗？为什么还要用到参数提取器呢？ 这是因为大模型有幻觉 每个模型对提示词理解是有偏差的，虽然我们定义让它只返回html页面，但是对于某些模型它不光返回HTML 页面还返回一堆非HTML的文本内容，这样如果不用参数提取器出来后面生成HTML 页面会报错的。

![image-20250513194901743](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/343ca5f8c75b409f886bc8cd13d40ef4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=JQNKPEDr4SFji8I%2FVhLq6Md9qbI%3D)

模型这里我们选择google gemini2.5-flash模型。输入变量上个流程节点llm输出。 提取参数这里我们定义一个html参数

![image-20250513195041520](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/027e454d278149519cd2bd2ae3c14aa3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=RI2Oc2cPNh%2FvnUWuuGAl1xnb1Fk%3D)

指令这里我们输入

```yaml
请提取大模输出的html部分代码，其他的不需要
```

完整的参数提取器相关参数设置如下：

![image-20250513195141317](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a9abd3210c1448c7ac152e2c3fcc577f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=UWE4ksUB5Oct1%2BxmcBESGtrU45I%3D)

### 代码处理生成html调用

接下来这里我们使用代码处理生成html, 这块功能我们之前的文章提到过，大家可以看我之前文章。 [dify案例分享-deepseek赋能从 Excel 表格到统计图，一键生成代码不是梦](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FNULYqps27zE7sxa0YdQd1Q "https://mp.weixin.qq.com/s/NULYqps27zE7sxa0YdQd1Q")

上面的流程中参数提取器提取的代码它需要把它转化成文件输出，这里我们利用了后端服务代码的能力。这里我们有2个地方需要讲解。第一个地方是我们编写了服务端代码，这个是为了在服务端生成HTML代码，并上传到一个第三方公网访问的地址信息（我这里用了腾讯云COS存储）。第二个地方是获取这个生成的html代码链接地址返回给dify以方便后续流程使用。

#### 1.服务端代码

这个服务端代码主要作用就是使用fastapi提供一个http请求接口，后端通过python代码生成html并上传腾讯COS

![image-20250313211521334](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/34fcee94cf214d28b664da65e4561ccb~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=syzr2zOkcJYxUECEoaLcmul2Z4M%3D) makehtmlapi.py

```python
from fastapi import FastAPI, HTTPException,Depends, Header
from pydantic import BaseModel
import logging
import time
import uvicorn
import configparser
import os
import json
import datetime
import random
from qcloud_cos import CosConfig
from qcloud_cos import CosS3Client

app = FastAPI()

# 读取配置文件中的API密钥
config = configparser.ConfigParser()
config.read('config.ini', encoding='utf-8')

# Tencent Cloud COS configuration
region = config.get('common', 'region')
secret_id = config.get('common', 'secret_id')
secret_key = config.get('common', 'secret_key')
bucket = config.get('common', 'bucket')

# 设置输出路径
output_path = config.get('html', 'output_path', fallback='html_output')

# 确保输出目录存在
os.makedirs(output_path, exist_ok=True)

# 设置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class HTMLRequest(BaseModel):
    html_content: str
    filename: str = None  # 可选参数，如果不提供则自动生成

def verify_auth_token(authorization: str = Header(None)):
    """验证 Authorization Header 中的 Bearer Token"""
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization Header")
    
    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer":
        raise HTTPException(status_code=401, detail="Invalid Authorization Scheme")
    
    # 从配置文件读取有效token列表
    valid_tokens = json.loads(config.get('auth', 'valid_tokens'))
    if token not in valid_tokens:
        raise HTTPException(status_code=403, detail="Invalid or Expired Token")
    
    return token
def generate_timestamp_filename(extension='html'):
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    random_number = random.randint(1000, 9999)
    filename = f"{timestamp}_{random_number}.{extension}"
    return filename

def save_html_file(html_content, filename=None, output_dir=None):
    # 如果没有提供文件名，则生成一个
    if not filename:
        filename = generate_timestamp_filename()
    
    # 如果没有提供输出目录，则使用默认目录
    if not output_dir:
        output_dir = output_path
    
    # 确保输出目录存在
    os.makedirs(output_dir, exist_ok=True)
    
    # 组合完整的输出路径
    file_path = os.path.join(output_dir, filename)
    
    # 写入HTML内容
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(html_content)
    
    # 返回文件名和输出路径
    return filename, file_path

def upload_cos(region, secret_id, secret_key, bucket, file_name, base_path):
    config = CosConfig(
        Region=region,
        SecretId=secret_id,
        SecretKey=secret_key
    )
    client = CosS3Client(config)
    file_path = os.path.join(base_path, file_name)
    response = client.upload_file(
        Bucket=bucket,
        LocalFilePath=file_path,
        Key=file_name,
        PartSize=10,
        MAXThread=10,
        EnableMD5=False
    )
    if response['ETag']:
        url = f"https://{bucket}.cos.{region}.myqcloud.com/{file_name}"
        return url
    else:
        return None

@app.post("/generate-html/")
async def generate_html(request: HTMLRequest,auth_token: str = Depends(verify_auth_token)):
    try:
        logger.info("开始处理HTML生成请求")
        start_time = time.time()
        
        # 保存HTML文件
        filename, file_path = save_html_file(request.html_content, request.filename)
        
        # 上传到腾讯云COS
        html_url = upload_cos(region, secret_id, secret_key, bucket, filename, output_path)
        
        elapsed_time = time.time() - start_time
        logger.info(f"HTML生成和上传完成，耗时 {elapsed_time:.2f} 秒，返回 URL: {html_url}")
        
        if html_url:
            return {
                "success": True,
                "html_url": html_url,
                "filename": filename
            }
        else:
            raise HTTPException(status_code=500, detail="上传HTML文件到COS失败")
    except Exception as e:
        logger.error(f"处理HTML生成请求时发生错误: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8088)
```

代码里面用到config.ini配置文件

```yaml
[html]
output_path = E:\\work\\code\\2024pythontest\\makehtml\\html_output

[common]
region = xxx         腾讯云OSS存储Region
secret_id = xxx      腾讯云OSS存储SecretId
secret_key = xxx     腾讯云OSS存储SecretKey
bucket = xxx         腾讯云OSS存储bucket

[auth]
valid_tokens = ["sk-zhouhui1xxx", "zhouhui112xxx"]
```

上面代码需要再服务器或者本地运行起来。对外提供 8088端口（端口你也可以自己改）

![image-20250313212453710](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/041ff06916c9410b8a2af1a4aaa3decc~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=oG61U2zp70HuzNGiyLeOpyEXzMg%3D)

上面步骤服务端就启动好了。

#### 1.客户端代码

接下来我们在dify 代码执行中添加。

![image-20250313212628735](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/438c756b01a648349495493cc895a9a3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=y6fi9T5TiBwKMAy4XJApupd6ZNQ%3D)

这里我们有4个参考。分别是1.json\_html 参数提取提取的html代码。2 apiurl 就是上面服务端代码的请求地址。3 apikey 服务端代码请求APIkey. 4 strtype 这里我们可以写死（上市公司）

![image-20250513200012586](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/bce77a947eec4ec3b4f1c5669bae69d6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=WWGikTy%2BXsGNP588x%2F22%2B%2F42m%2FI%3D)

其中 apiurl 和apikey 我们这里用环境变量方式来实现。

![image-20250313213516927](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/13bc85b6c80540d6b2dfd28d97739969~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=JejI9w0uQTkcSadBrQ80wLyLAkQ%3D)

如果你本地电脑 URL 可以是 192.168.XX.XX 或者127.0.0.1 如果是服务器 可以是局域网IP 也是可以公网IP

![image-20250313213618268](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/35dbdd7c83114b33b62a48e14e124bea~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=6uL55mygxPBxKIXogO3FT6UiE%2FM%3D)

客户端APIKEY 和服务端APIKEY 保持一致。服务端APIKEY 就是config.ini 对应的

![image-20250313213735676](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ea62b6c1f902460782ab86e009d7f478~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=zuo6etzZQ71JDA0Yp%2BlxghGB4ZY%3D)

我上面服务端数组定义2个值，客户端有一个值在这个数组就可以了。

客户端代码如下：

```python
import json
import re
import time
import requests

def main(json_html: str, apikey: str,apiurl: str,strtype: str) -> dict:
    try:
        # 去除输入字符串中的 \`\`\`html 和 \`\`\` 标记
        html_content = re.sub(r'^\`\`\`html\s*|\s*\`\`\`$', '', json_html, flags=re.DOTALL).strip()
        
        # 生成时间戳，确保文件名唯一
        timestamp = int(time.time())
        filename = f"{strtype}_{timestamp}.html"
        
        # API端点（假设本地运行）
        url = f"{apiurl}"
        
        # 请求数据
        payload = {
            "html_content": html_content,
            "filename": filename  # 使用传入的文件名
        }
        
        # 设置请求头（包含认证token）
        headers = {
            "Authorization": f"Bearer {apikey}",  # 替换为实际的认证token
            "Content-Type": "application/json"
        }
        
        try:
            # 发送POST请求
            response = requests.post(url, json=payload, headers=headers)
            
            # 检查响应状态
            if response.status_code == 200:
                result = response.json()
                html_url = result.get("html_url", "")
                generated_filename = result.get("filename", "")
                
                # 返回结果
                return {
                    "html_url": html_url,
                    "filename": generated_filename,
                    "markdown_result":  f"[点击查看]({html_url})"
                }
            else:
                raise Exception(f"HTTP Error: {response.status_code}, Message: {response.text}")
        
        except requests.exceptions.RequestException as e:
            raise Exception(f"Request failed: {str(e)}")
    
    except Exception as e:
        return {
            "error": f"Error: {str(e)}"
        }
```

返回3个值html\_url、filename、markdown\_result

![image-20250313214248832](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/079811f691e04b27992d92756810e7a6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=G6zBVoGv74CYQUveAKh13NXRP7M%3D)

以上就完成了服务端代码生成和客户端代码调用的功能了。

### 直接回复

这个直接回复目前设置2个返回，一个是mineru 插件返回的文本信息，一个是最后生成的html页面链接。

![image-20250513201131230](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/55b4f2e2628243838928243b3af83985~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=Wo%2FcM0p7zuUvF00pLKfW8MZmLoY%3D)

![image-20250513201206406](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9a9f04c49a054d72ad2624058baeee92~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=7uEQWNd74Z6Af%2FzPvmDdPDJo2Fo%3D)

以上我们就完成了整个工作流的制作。

## 3.验证及测试

我们打开工作流预览按钮。点击从本地文件上传

![image-20250513201405085](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/2d70e469aece46568dc05991e5bf162e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=19uUgG2Wr4iqeqzIQLiEwQ0NM%2B0%3D)

选择我们之前下载的pdf文件

![image-20250513201429464](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/5f87cdb48c094a50980da7f46bcf0bc8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=pKnh7F3PTbrdGA3c8KQ112LJDp0%3D)

![image-20250513201521523](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d98214c6447445f2b54629f226950b63~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=tsHHuz5TkvdWi%2BPXBDd%2BiZXuQZM%3D)

![image-20250513201918210](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/8697d13ec8c648a0bdd7326047c0d4fa~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=h%2FwHVy%2FsPKJj5Z%2Fcq0jieDA0iaA%3D)

以上我们就可以实现工作流的验证了。

![2025-05-13_203210](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ef2552a6824640d8831da0c091c0d8b9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgd3d3emhvdWh1aQ==:q75.awebp?rk3s=f64ab15b&x-expires=1747925796&x-signature=CzCEE18FG2V0qdbIL4%2BPUcC0xyk%3D)

体验地址

体验地址 [difyhs.duckcloud.fun/chat/0yPNRu…](https://link.juejin.cn/?target=https%3A%2F%2Fdifyhs.duckcloud.fun%2Fchat%2F0yPNRuq8JCozwsTQ "https://difyhs.duckcloud.fun/chat/0yPNRuq8JCozwsTQ") 备用地址（ [http://14.103.204.132/chat/0yPNRuq8JCozwsTQ）](https://link.juejin.cn/?target=http%3A%2F%2F14.103.204.132%2Fchat%2F0yPNRuq8JCozwsTQ%25EF%25BC%2589 "http://14.103.204.132/chat/0yPNRuq8JCozwsTQ%EF%BC%89")

## 4.总结

今天主要带大家了解并实现了利用 AI 快速分析上市公司财报并生成可视化 HTML 页面的工作流方案。该工作流主要由开始、mineru 插件、llm 大语言模型、参数提取器、代码处理生成 html 调用以及直接回复等组件构成。通过实际验证和测试，我们发现按照此工作流，能够在短时间内生成基于上市公司财务报表的可视化 HTML 页面，效果显著。与传统的财报分析方式相比，该方案不仅提高了分析效率，还能以更直观、美观的方式展示财报数据，为投资者、分析师及其他利益相关者提供了便利。感兴趣的小伙伴可以按照本文步骤去尝试。今天的分享就到这里结束了，我们下一篇文章见。

评论 0

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

APP内打开