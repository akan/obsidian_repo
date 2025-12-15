---
title: "告别 iframe 通信的 “飞鸽传书”：Webpage Tunnel 上手指南"
source: "https://juejin.cn/post/7583567658253287450"
author:
  - "[[parksben]]"
published: 2025-12-14
created: 2025-12-15
description: "还在忍受 postMessage 的混沌代码？Webpage Tunnel 重新定义了 iframe 通信体验。它引入 “网页即服务” 理念，将杂乱的跨域消息流封装为优雅的 API 调用。"
tags:
  - "iframe通信"
  - "postMessage封装"
  - "优雅API"
abstract: "本文介绍了Webpage Tunnel库，它通过封装postMessage，为iframe间通信提供了类似函数调用的简洁、类型安全的API，极大简化了开发流程。"
---
作为前端开发，你一定遇到过这样的场景：

老板拍着你的肩膀说：“小王啊，把隔壁组做的那个‘用户画像’页面，直接用 iframe 嵌到我们的后台里吧，顺便把当前登录的 Token 传过去，再把用户选好的标签拿回来。”

你心想：“这简单，页面跨 iframe 可以用 [postMessage](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FWindow%2FpostMessage "https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage") 方法通信。”

然而当你开始写代码时，噩梦开始了。

## 😫 以前的痛苦：像在用对讲机吵架

为了在父页面和 iframe 之间传数据，你不得不使用浏览器原生的 `postMessage` 。这玩意儿就像是一个 **公共广播** 。

1. **父页面喊话** ： `iframe.contentWindow.postMessage('嘿！这是 Token', '*')`
2. **子页面监听** ： `window.addEventListener('message', (e) => { ... })`

随着业务变复杂，你的代码很快就会变成这样：

```javascript
// ❌ 令人头秃的传统写法
window.addEventListener('message', (event) => {
  // 1. 先得确认是不是自己人（安全校验）
  if (event.origin !== 'https://trusted.com') return;
  
  // 2. 解析数据，还得防着格式不对报错
  const data = event.data;
  
  // 3. 开始写一堆 switch-case 来判断对方到底想干啥
  switch (data.type) {
    case 'UPDATE_TOKEN':
      // ...逻辑...
      break;
    case 'GET_USER_TAGS':
      // ...逻辑...
      // 4. 还要想办法把结果“扔”回去
      event.source.postMessage({ type: 'USER_TAGS_RESULT', payload: ... }, event.origin);
      break;
    // ...此处省略一万行...
  }
});
```

这就像两个人隔着一条河喊话，不仅费嗓子，还容易听错，而且谁都能插一嘴。维护起来简直是灾难。

## 😎 现在的救星：Webpage Tunnel

这时候， **[Webpage Tunnel](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fparksben%2Fwebpage-tunnel "https://github.com/parksben/webpage-tunnel")** 登场了。

它的作用很简单： **把那条混乱的“河”填平，给你们拉一根专线电话。**

它不再让你去处理底层的消息监听和过滤，而是让你像 **调用普通函数** 一样去跟 iframe 里的页面交流。

![webpage-tunnel.png](https://p6-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/1130f04af3514b5d97a29fa59aafc9aa~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgcGFya3NiZW4=:q75.awebp?rk3s=f64ab15b&x-expires=1766368286&x-signature=FuXX%2BVSnQWBefDmobQpCIxxhITA%3D)

### 核心理念：网页即服务 (Webpage as a Service)

想象一下，你嵌入的那个 iframe 页面，不再只是一个页面，而是一个 **微型服务器** 。它对外提供了一组 API 接口，你只需要连接它，然后调用接口拿数据。

### 亮点一：代码变得无比清爽

让我们看看用 Webpage Tunnel 怎么实现刚才的需求。

**1\. 在 iframe 页面（服务方）：**  
只需要把你的功能“注册”一下，就像开店摆摊一样。

```javascript
import { serve } from 'webpage-tunnel';

// 把页面里的功能打包成 API
serve({
  // 别人调这个方法，我就更新 Token
  updateToken: (token) => {
    localStorage.setItem('auth_token', token);
    return 'Token 更新成功！';
  },
  
  // 别人调这个方法，我就返回标签数据
  getSelectedTags: async () => {
    // 甚至可以去后台请求数据再返回
    const tags = await fetch('/api/tags').then(res => res.json());
    return tags;
  }
});
```

**2\. 在父页面（调用方）：**  
就像打个电话一样简单，直接调用！

```javascript
import { Request } from 'webpage-tunnel';

// 建立连接
const iframeApi = new Request({
  server: 'https://other-site.com/profile', // 对方的地址
  methods: ['updateToken', 'getSelectedTags'] // 我要调用的方法名
});

async function doWork() {
  // ✨ 见证奇迹的时刻
  // 不需要监听 message，不需要 switch-case，直接 await 拿结果！
  
  await iframeApi.updateToken('new-token-123');
  console.log('Token 传过去了');

  const tags = await iframeApi.getSelectedTags();
  console.log('拿到的标签是：', tags);
}
```

### 亮点二：双向奔赴

不仅仅是父页面可以调子页面，子页面也可以反过来调父页面。只要双方都 `serve` （提供服务）并  `new Request` （发起请求），就能实现无缝的双向对话。

### 亮点三：TypeScript 党的福音

如果你用 TypeScript，体验会更上一层楼。你可以定义好接口类型，当你输入 `iframeApi.` 的时候，编辑器会自动提示有哪些方法可以调，入参是什么，返回值是什么。再也不用担心拼错单词或者传错参数了。

## 总结

**Webpage Tunnel**  并没有发明什么黑科技，它只是把繁琐的  `postMessage` 封装进了一个黑盒子里，留给你一套优雅、现代的 API。

- 如果你受够了 `window.addEventListener` ；
- 如果你希望 iframe 通信代码像后端接口调用一样清晰；
- 如果你想少掉几根头发；

那么，Webpage Tunnel 绝对值得你尝试一下。

> **传送门** ： [GitHub 项目地址](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fparksben%2Fwebpage-tunnel "https://github.com/parksben/webpage-tunnel")

评论 0

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 1

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

APP内打开