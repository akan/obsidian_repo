---
title: "Expo：写 App 这件事，终于不用碰 Xcode 和 Android studio 啦，性能还不错"
source: "https://mp.weixin.qq.com/s/IhfxC7ODmoti8WIJxwa10A"
author:
  - "[[小张的张]]"
published:
created: 2025-10-21
description: "记得我第一次接触 Expo的时候，那天我只是想随手写个小工具 App，结果打开 Xcode 的那一刻，差点就"
tags:
  - "跨平台开发"
  - "React Native工具链"
  - "原生应用构建"
abstract: "Expo是一个基于React Native的开发工具链，让开发者无需配置Xcode和Android Studio就能快速构建跨平台原生应用。"
---
Original 小张的张 *2025年10月21日 14:47*

记得我第一次接触 Expo的时候，那天我只是想随手写个小工具 App，结果打开 Xcode 的那一刻，差点就放弃了。证书、签名、依赖、Gradle……那一堆“警告黄”比代码还多。

然后，一个朋友甩给我一句话：

> “用 Expo 啊，连 Xcode 都不用开。”

我当时不信。直到我敲下那行命令——

```
npx create-expo-app my-app
npx expo start
```

两分钟后，我的手机上跑起了第一个跨平台 App。  
没配置、没编译、没泪水。就像写网页那样写原生应用。

那一刻，我有点恍惚。原来移动开发，也能这么轻盈。

---

## 01\. Expo 是啥？

先别被官网那句「build universal native apps」吓到。  
简单说， **Expo 是一个帮你更快开发 React Native App 的工具链** 。

它不光是个框架，更像一整套“工具房”：

- • 它帮你打理原生工程
- • 提供一堆常用功能（摄像头、定位、存储、通知）
- • 还送你一整套云服务（打包、发布、更新）

所以你写 App 时，不用去折腾 Xcode、Android Studio，那些脏活 Expo 替你干了。

换句话说，如果 React Native 是一辆手动挡，Expo 就是给它加了自动档、自动泊车，还顺带洗了个车。

---

## 02\. 它能干啥？

有个很形象的比喻：

> React Native 像块生铁，Expo 帮你打磨成了菜刀。

Expo 自带一堆封装好的“模块”（SDK），比如：

- • `expo-camera` ：拍照录像
- • `expo-location` ：定位
- • `expo-notifications` ：推送
- • `expo-sqlite` ：本地数据库
- • `expo-file-system` ：文件访问

这些原本需要原生开发去接入的能力，在 Expo 里一行 import 就能用。

更重要的是，它还配了个神器叫 **Expo Go <sup><span>[1]</span></sup>** 。

![Image](https://mmbiz.qpic.cn/mmbiz_png/oXqG8ETvAelZicW9iaCrNWmlxicKt9mWLETduq5icOzqSQekZNr3bicwgmwPLlOcOFL0vML35cstgKZjPDTrEYUic54g/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

下载 App 打开二维码一扫，你写的代码就直接在手机上跑。  
连编译都不用。

我第一次用的时候，就感觉像是把 VSCode 装进了手机里。  
写一行代码、保存、刷新、看到结果。  
这才是开发该有的节奏。

---

## 03\. 为什么它这么“神奇”？

其实原理并不神秘。  
Expo 是搭在 React Native 上的一层壳，它预先封装好了大量原生模块。

所以你的 JS 代码，不是直接跑在手机上，而是通过一个“桥”（bridge）和原生模块通信。  
React Native 已经有这套机制，而 Expo 做的事就是：  
**提前把常用模块都造好，还把配置全自动化了。**

这就是为什么你在 Expo 里能轻松访问相机，而不用去改 Info.plist、AndroidManifest。

背后的逻辑是：Expo 的构建系统会在打包时，根据配置自动生成那些原生设置。  
就像你告诉服务员“要份加辣的牛肉面”，厨房自己知道要放几勺辣椒。

---

## 04\. 那它是不是有“代价”？

当然有。天下没有免费的午餐。

Expo 的托管模式（Managed Workflow）非常轻便，但也有约束：

- • 你不能随意接入一些很新的原生库
- • 想改原生层逻辑要先 “eject”（退出托管）
- • 一旦 eject，就得自己管理原生构建环境

不过话说回来，大多数小型 App 并不需要去碰这些。  
你要的只是一款能上线的产品，而不是研究 Android 的 Gradle 配置地狱。

如果你真的有特殊需求，比如接入一个只有原生 SDK 的广告 SDK，Expo 也提供了 **Config Plugin** 。  
它能在构建时自动帮你改原生配置，不用你手动去折腾。  
这个设计很聪明——既保留了托管的轻盈，又能应对部分复杂场景。

---

## 05\. Expo 不止是开发工具

很多人以为 Expo 就是个开发框架。  
其实它更像一个完整生态。

它的 **EAS（Expo Application Services）** 云服务，把构建、发布、热更新全打包了。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

- • `EAS Build` ：云端帮你编译出 iOS/Android 包
- • `EAS Update` ：热更新 JS 代码，不用重新上架
- • `EAS Submit` ：自动上传 App Store、Google Play

换句话说，你连苹果开发者证书都可以少碰几次。

这对独立开发者来说，简直是救命。  
以前一想到打包、上架、签名，我都头皮发麻。  
现在一行命令，云端跑完，全自动。

---

## 06\. 那些被忽略的“小细节”

有几件小事，我后来才体会到 Expo 的用心。

比如它有个 `expo doctor` 命令，可以自动检查 SDK 版本冲突。  
以前 React Native 一升级，模块各种炸。  
现在一行诊断，告诉你哪里不兼容。

还有它的版本锁定机制——  
当你用 `npx expo install` 安装依赖时，它会自动匹配当前 SDK 兼容的版本。  
不会再出现那种“某某库版本不兼容”的地狱场景。

这些细节看起来不起眼，但它们让整个开发过程安静了下来。  
没有莫名的崩溃，没有花一下午找版本号。

---

## 07\. 我为什么推荐它

因为它让“做 App”这件事回到了本质。  
不是在工具里挣扎，而是在思考产品本身。

有时候，我看身边的前端朋友折腾小程序、Web App，  
其实他们完全可以用 Expo 做一个真正的原生应用，  
性能更好，体验更完整，交付也不难。

甚至连 Web 都支持，  
一个代码库同时跑 iOS、Android、Web，  
这在几年前想都不敢想。

---

## 08\. 写在最后

我喜欢 Expo，不是因为它“先进”，  
而是因为它帮我找回了“创造”的感觉。

以前写移动端，我总被各种环境、配置、构建流程耗光耐心。  
现在我只要打开编辑器，写代码、看效果、再写。

也许有一天，我还是得回到原生世界，去做更复杂的事。  
但至少现在，有一个工具，让我能用最少的阻力，把想法变成一个能运行的 App。

这件事，已经够了。

---

📦 如果你想试试：

```
npx create-expo-app my-first-app
npx expo start
```

然后扫码，用手机打开。  
看到自己写的第一个 App 在动的那一刻，你就会明白我上面那句——

> “写 App，终于不用碰 Xcode 了。”

#### 引用链接

`[1]` Expo Go: *https://expo.dev/go*  

继续滑动看下一个

老码小张

向上滑动看下一个