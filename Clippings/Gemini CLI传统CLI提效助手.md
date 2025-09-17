---
title: "Gemini CLI+传统CLI=提效助手"
source: "https://juejin.cn/post/7550289374467817506"
author:
  - "[[小溪彼岸]]"
published: 2025-09-16
created: 2025-09-17
description: "前言 前面对Gemini CLI有了基本了解，使用了两天有个突发奇想，既然Gemini CLI可以轻松驾驭文件、Shell相关操作，是不是也可以轻松驾驭CLI工具呢？传统的CLI工具功能也很强大，只是"
tags:
  - "效率提升"
  - "命令行工具"
  - "AI辅助"
abstract: "本文介绍了如何将Gemini CLI与传统CLI工具结合使用，通过自然语言指令简化复杂操作，提升工作效率。"
---
![横幅](https://p9-piu.byteimg.com/tos-cn-i-8jisjyls3a/8c759ddb57d0440986f4768fc644f879~tplv-8jisjyls3a-2:0:0:q75.image)

## 前言

前面对Gemini CLI有了基本了解，使用了两天有个突发奇想，既然Gemini CLI可以轻松驾驭文件、Shell相关操作，是不是也可以轻松驾驭CLI工具呢？传统的CLI工具功能也很强大，只是大量的指令参数和晦涩的文档真的让人崩溃，真的是不试不知道，一试停不下来，两者结合真的实现了强强联合。对往期内容感兴趣的小伙伴也可以看往期：

- [Google百万Token上下文Gemini CLI，离AI自由更近一步](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzU5Njg3ODUzOA%3D%3D%26mid%3D2247492558%26idx%3D1%26sn%3De762047c93c4361f63744ec3c70a434f%26scene%3D21%23wechat_redirect "https://mp.weixin.qq.com/s?__biz=MzU5Njg3ODUzOA==&mid=2247492558&idx=1&sn=e762047c93c4361f63744ec3c70a434f&scene=21#wechat_redirect")
- [macOS自带截图命令ScreenCapture](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzU5Njg3ODUzOA%3D%3D%26mid%3D2247492612%26idx%3D1%26sn%3D34e174c441e78ac1f65a72237250b5ce%26scene%3D21%23wechat_redirect "https://mp.weixin.qq.com/s?__biz=MzU5Njg3ODUzOA==&mid=2247492612&idx=1&sn=34e174c441e78ac1f65a72237250b5ce&scene=21#wechat_redirect")

## ScreenCapture(截屏录屏)

ScreenCapture 是 macOS 系统自带的命令行工具，用于截取屏幕截图或录制屏幕视频。它提供了丰富的选项，可以满足多种截图和录屏需求。对ScreenCapture感兴趣的小伙伴可以看往期内容： [macOS自带截图命令ScreenCapture](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzU5Njg3ODUzOA%3D%3D%26mid%3D2247492612%26idx%3D1%26sn%3D34e174c441e78ac1f65a72237250b5ce%26scene%3D21%23wechat_redirect "https://mp.weixin.qq.com/s?__biz=MzU5Njg3ODUzOA==&mid=2247492612&idx=1&sn=34e174c441e78ac1f65a72237250b5ce&scene=21#wechat_redirect")

### 速记公式

Gemini CLI + ScreenCapture = 全自动截屏助手

### 基本使用

**1）交互式截图**

输入提示词

```
代码解读复制代码帮我用ScreenCapture进行截图
```

可以看到Gemini CLI默认会调用了ScreenCapture的交互式截图方式指令

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3c10cbf7a8bd43f8a98c83e2c5e1519e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=ImdtCsUMB9AWhp%2FFj10uVm3AxZ0%3D)

允许权限之后，窗口就会出现一个框选器，按下【Ctrl键】选择区域后进行截图，截图会保存在工作区

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/c49f2ac63fd541a6aac5139f16c1e0dc~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=ET8u5XQur81fxBQx5Wb15Djbxss%3D)

**2）指定窗口截图**

```
代码解读复制代码帮我用ScreenCapture对桌面窗口进行截图
```

允许权限之后，在窗口上就会多出一个📷图标且只能在窗口间进行切换，截图会保存在工作区

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9e76dbef8a424470bd14aa255339ce06~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=rF05WcH%2ByPZe9d9FjPZjJZbFfx4%3D)

**3）非交互式截图**

```
代码解读复制代码帮我用ScreenCapture对桌面进行非交互式截图
```

此时Gemini CLI就会调用非交互式截图参数对桌面进行截图，此过程不再有框选器的出现

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/c20e5a5f0eab43b69b406cc41b5dc99d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=5Q4dlzCpsZ27uGvOqhUz%2FDQtGnU%3D)

截图效果如下

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/d7356255b15b4e85af89bd1a09b75941~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=1bTwzOiOxl3XudySWpz2%2Biimn%2FI%3D)

**4）截图保存剪切板**

上面截图方式都是保存到工作区，如果我们想截图保存到剪切板也是可以的，可以输入如下提示词

```
代码解读复制代码帮我用ScreenCapture进行截图并保存到剪切板
```

Gemini CLI就会将截图参数改为 -ic 交互式保存到剪切板配置

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/96595656953143abacc132c3508a7210~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=WMmzG7Tdq4JsasXuNkDET3hAu0g%3D)

## ffmpeg(音视频处理)

FFmpeg 是一个功能极其强大的开源音视频处理工具，其使用场景非常广泛，几乎涵盖了音视频处理的各个方面。

Github地址： [github.com/FFmpeg/FFmp…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FFFmpeg%2FFFmpeg "https://github.com/FFmpeg/FFmpeg")

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/30ad891801164b14b189165b169fd2fa~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=gmhsPYbHbMxktkxmuIEI3kaOQK4%3D)

### 速记公式

Gemini CLI + FFmpeg = 全自动音视频处理助手

### 安装

在终端输入如下指令安装

```php
php 代码解读复制代码$ brew install ffmpeg
```

也可以让Gemini CLI安装

```
代码解读复制代码帮我用 Homebrew 安装 ffmpeg
```

### 基本使用

**1）视频加水印**

```
css 代码解读复制代码帮我将@mov_bbb.mp4视频用 ffmpeg 添加一个10%透明度的水印，水印位置在右下角，水印内容为“程序员小溪”
```

允许权限后，Gemini CLI开始拆解任务并构建ffmpeg指令参数执行shell

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/65c7f725a88549abb15269e0db424a7f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=za5Dbwt%2FmoQDG4rsCunfG3oUbgI%3D)

执行完成后，可以看到视频右下角多了一个水印内容

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/161b6b6005a541669c80c9e0e77e1171~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=CR3REftN7X7bVXMgroJKbv2ud0A%3D)

**2）视频加字幕**

ffmpeg也可以实现视频加字幕

```
css 代码解读复制代码帮我将@mov_bbb.mp4 视频用ffmpeg 添加随机字幕
```

允许权限后，Gemini CLI先是生成了一个 subtitles.srt 的字幕文件，然后构建ffmpeg指令参数执行添加字幕Shell指令

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/8acbf150674149f4b91e89e54f2988d7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=3Ftjsd8QqC4I9hl%2BLm%2FtOKs4ip0%3D)

第一次生成的字幕中文部分是乱码，我们可以尝试让Gemini CLI修复

```
less 代码解读复制代码帮我将@mov_bbb.mp4 视频用ffmpeg 添加字幕，字幕文件@subtitles.srt，字体@Aa悠悠然.ttf
```

随便找的一个字体也提示有问题，还好Gemini CLI自己找到了可用的字体

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/60d0b257056b45829f576eb468e4ea68~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=ZmYjVoGH5J0bzsespJlcKBIHOdg%3D)

最终添加字幕效果如下，效果有点模糊，不过好得展示是正确的

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/573c8142bcf94989a9decd24b92106e4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=olPKQn36AFJemwvY0m9zfFmijCs%3D)

**3）视频转图片**

有时候我们需要将视频转为帧图，对帧图进行单独处理，以前可能需要找各种工具转换，现在我们也可以借助Gemini CLI + ffmpeg一句话处理

```
css 代码解读复制代码帮我将@mov_bbb.mp4视频转为 png 序列帧图片放到一个新文件目录
```

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/81328d3cbb9d49ca9a12fdbce842c339~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=v3UZwTv7%2BG9Z0zqhwENMTZr7Hpg%3D)

执行完成后，我们将得到一组图片

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/457ea639f72447f68e35338501d140e6~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=Xd9KsCerqkG%2FzNbVI6UxIC3vYzM%3D)

**4）视频转GIF**

有时候因为平台限制，我们无法直接上传视频，我们需要将视频转为GIF代替

```
css 代码解读复制代码帮我将@mov_bbb.mp4 使用ffmpeg 转为一个高质量GIF
```

转换完成后，我们将得到一张高质量的gif图

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9e7d959ca6f24f429951b33a6dfb6987~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=Puesvq0rGmfflPsV9bu%2BXrlbzoo%3D)

**5）音视频分离**

有时我们需要单独获取视频或音频，也可以使用Gemini CLI + ffmpeg 处理

```
css 代码解读复制代码帮我将@mov_bbb.mp4使用 ffmpeg 进行音视频分离
```

处理完成后，我们将得到一个无音频的视频和一个单独的音频文件

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7b5e5316ba364d3f81abb86e42b46e61~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=fdTxu8v1dt4W3gJ7bw6%2FRnCSU8U%3D)

## yt-dlp(视频下载)

yt-dlp 是目前功能最丰富、更新最及时的命令行音视频下载器。它继承了 youtube-dl 的全部特性，并在速度、稳定性、站点支持、后处理能力等方面做了大量改进与扩展。

Github地址： [github.com/yt-dlp/yt-d…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fyt-dlp%2Fyt-dlp "https://github.com/yt-dlp/yt-dlp")

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/16ba113a10d94f109bc1bb833d360887~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=kvXWkC48ze3Dsg2CsiflrMBCbh4%3D)

### 速记公式

Gemini CLI + yt-dlp = 全能视频下载助手

### 安装

在终端输入如下指令安装

```php
php 代码解读复制代码$ brew install yt-dlp
```

### 基本使用

**1）下载B站视频**

| 注意事项：确保下载行为符合 B 站的服务条款和版权规定。 |
| --- |

下载B站视频只需要在视频上右键选择【复制视频地址】，输入如下提示词

```
ini 代码解读复制代码帮我使用 yt-dlp 下载 https://www.bilibili.com/video/BV1KTQcYUEeT?t=1180.8&p=8 这个视频
```

Gemini CLI会拼接yt-dlp指令参数并执行shell指令

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/8b28724d16d2496c90dee3708e7ca396~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=T2AumoOLERYgVA4HEhVkPPXO4Jw%3D)

执行完成后，我们将得到一个完整视频文件，点击播放提示与播放器不兼容

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/de5ed69e9886456a8b917621cf550dfa~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=zBZD2yQx1MlB%2FjSWbBWIgCAQhAI%3D)

这个问题我们尝试让Gemini CLI解决一下

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/826464c3bce148a799c0afd7c80aff26~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=DCz2fJKzMSA2J3iVAMKfSlfGtkU%3D)

解决完成后还整的可以播放了，不错不错

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a710552ea0084d409b679f3057b307ca~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=%2Bn203WPr5OOI5%2Fhzrzgue7GlIvA%3D)

**2）下载YouTube视频**

```arduino
arduino 代码解读复制代码帮我使用 yt-dlp 下载 https://www.youtube.com/shorts/ETat0E-v_6Q 视频
```

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/45f37f153d3848049ad0ffcec6dcff62~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=0vvSTb6Xes7PTHgVAXF4RBCcZpI%3D)

下载完成后是.webm 格式的，无法直接播放，我们可以用ffmpeg转为.mp4 格式

```perl
perl 代码解读复制代码帮我把@Sam/ Altman：AI能力的增长是可预测和持续的/ #openai/ [ETat0E-v_6Q].webm 使用 ffmpeg 转为mp4格式
```

转换完成后，我们将得到一个可播放的视频

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/57fdd014e8684b4cb2daf69933de2aca~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=sEINb84WxZSFT1TOqxNQXwjH14s%3D)

## Pandoc(文档格式转换)

Pandoc 是一个功能强大的开源文档转换工具，被广泛誉为“文档格式转换的瑞士军刀”。它能够轻松地在多种文档格式之间进行转换，支持从简单的标记语言（如 Markdown）到复杂的富文本格式（如 DOCX、PDF）的转换，同时还能生成幻灯片、电子书等多种输出格式。

Github地址： [github.com/jgm/pandoc](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fjgm%2Fpandoc "https://github.com/jgm/pandoc")

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/16decc24a9cc4c209fe7b77717dac7da~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=6BJxe9PHZCLXM2yC7fgY4CPmplM%3D)

### 速记公式

Gemini CLI + pandoc = 全能文档转换助手

### 安装

在终端输入如下指令安装

```php
php 代码解读复制代码$ brew install pandoc
```

### 基本使用

文档格式转换也是平时工作常见的需求，经常需要各种文档格式之间相互转换，pandoc不仅能进行文档格式转换还支持批量转换。

**1）Markdown转Word**

```
css 代码解读复制代码帮我用 Pandoc 将@2015-01-30.md转换为Word格式
```

Gemini CLI理解需求后，组合并调用了Pandoc的Shell指令

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/99179733dc794d00af01e23e11f13a96~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=qSpEQLG%2FNjE24oZaqEa9TKOuYS4%3D)

预览效果看着还可以，没有太突兀的内容

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/4644c11aa6e0442997b6ef29ae70e384~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=qvant2mtOgR2d%2B34%2FV2nz%2BIe%2FzI%3D)

**2）Word转PDF**

```
css 代码解读复制代码帮我用 Pandoc 将@2015-01-30.md转换为PDF格式
```

PDF展示效果上比Word要好，但是这个文字太靠右侧了

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/be4155eeda744778aebaf9d4a5729dee~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=q%2BDVex%2BMyCRU07Cd2TqFrDTLX94%3D)

尝试让Gemini CLI调整一下

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/bf25e111778f4b16bef85754ba130069~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=ihea9osyhWF5vbZ8aaMExs55B5o%3D)

效果还不错，还支持调整布局👍

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3b05128b70e24e76a4bfab02d0f22f84~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=ygRT1KZoYpOk3t1xOdSffgjs71s%3D)

## ImageMagick(图像处理)

ImageMagick 是一个功能强大且灵活的开源图像处理工具，广泛应用于图像的创建、编辑、合成和转换。它支持超过 200 种图像格式，包括常见的 JPEG、PNG、GIF、TIFF 等，以及一些较为特殊的格式如 SVG、PDF 和 WebP。

Github地址： [github.com/ImageMagick…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FImageMagick%2FImageMagick "https://github.com/ImageMagick/ImageMagick")

![图片](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/58f277b691e546a4b531d8c9d264ce17~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5bCP5rqq5b285bK4:q75.awebp?rk3s=f64ab15b&x-expires=1758612667&x-signature=7xP6ODOagywfHzbheGV5BeHo79s%3D)

### 速记公式

Gemini CLI + ImageMagick = 全能图像处理助手

### 安装

在终端输入如下指令安装

```php
php 代码解读复制代码$ brew install imagemagick
```

### 基本使用

**1）图片加水印**

```
css 代码解读复制代码帮我用 ImageMagick 把 @video_frames/ 文件夹下的所有图片的尺寸统一调整为 800x800 像素，并给它们加上一个10%透明度的灰色水印，水印文字是"程序员小溪"，放在新的文件夹里面
```

可以看到图片尺寸是对的，但是水印并没有展示出来

经过尝试发现ImageMagick好像对中文的支持并不是很好，最后换成了英文，就可以正常看到了

**2）图片拼接**

我本地有6张图片，我们可以尝试让Gemini CLI帮我们把6张图片拼接成3x2宫格的图片

```
css 代码解读复制代码帮我用 ImageMagick 把 @processed_frames/ 文件夹下的所有图片拼接成一张3x2宫格图片，宫格之间间距10px
```

效果看着还不错

**3）图片添加滤镜**

```
css 代码解读复制代码帮我用 ImageMagick 把 @video_frames/ 文件夹下的所有图片添加“动感模糊”滤镜并保存到一个新文件夹中
```

效果应该是对的吧，看的我都快晕车了🤮

## gallery-dl(图片下载)

gallery-dl 是一款开源命令行工具，它能够从多达 1400+ 个网站批量下载图片与合集，常见有微博、500px、unsplash、imgur 等网站

Github地址： [github.com/mikf/galler…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmikf%2Fgallery-dl "https://github.com/mikf/gallery-dl")

### 速记公式

Gemini CLI + gallery-dl = 全能图片下载助手

### 安装

在终端输入如下指令安装

```php
php 代码解读复制代码# 使用brew安装
$ brew install gallery-dl

# 使用Python安装
$ python3 -m pip install -U gallery-dl
```

### 基本使用

> gallery-dl支持下载设有反扒机制的站点，使用时需谨慎注意遵守相关法律法规，这里仅供测试使用

**1）微博图片下载**

```arduino
arduino 代码解读复制代码帮我用 gallery-dl 下载 https://weibo.com/1684197391/Ml66KtQMR 链接中的图片
```

原微博效果

批量下载后的效果，3张图片+1张GIF，而且会将图片按照分类目录结构形式存放

**2）限制图片数量**

针对图片数量较多的站点，可以设置图片下载数量而不是下载所有图片

```arduino
arduino 代码解读复制代码帮我用 gallery-dl 下载 https://weibo.com/1684197391/Ml66KtQMR 链接中前2张图片
```

可以看到Gemini CLI使用了 --range 1-2 参数进行了图片数量限制

## 友情提示

见原文： [Gemini CLI+传统CLI=提效助手](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FmNitdnf0P6JG1dD5I8gMYQ "https://mp.weixin.qq.com/s/mNitdnf0P6JG1dD5I8gMYQ")

> 本文同步自微信公众号 " [程序员小溪](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FmNitdnf0P6JG1dD5I8gMYQ "https://mp.weixin.qq.com/s/mNitdnf0P6JG1dD5I8gMYQ") " ，这里只是同步，想看及时消息请移步我的公众号，不定时更新我的学习经验。

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 点赞

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

APP内打开