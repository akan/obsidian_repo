---
title: "十年来最大的 HTML 更新来了"
source: "https://mp.weixin.qq.com/s/aMCEx0UdSzJ5JsaSbXXs9Q"
author:
  - "[[dev]]"
published:
created: 2026-06-05
description: "这是过去 10 年里，HTML 最重要的更新之一。一旦它真正落地，你对“服务端驱动 UI 更新”的理解，可能会被彻底改写。"
tags:
  - "声明式局部更新"
  - "HTML"
  - "流式补丁"
  - "无JavaScript"
  - "服务端驱动"
abstract: "Declarative Partial Updates 让服务器直接流式传输 HTML 补丁到页面占位符，无需 JavaScript 或 fetch 即可实现局部更新。"
---
dev *2026年6月5日 08:25*

这是过去 10 年里，HTML 最重要的更新之一。

一旦它真正落地，你对“服务端驱动 UI 更新”的理解，可能会被彻底改写。

过去很多年，只要你想用服务端数据更新页面上的某一块内容，几乎都绕不开 JavaScript。

你要写一个 `fetch` 请求。

你要查找 DOM 节点。

你还要用 `innerHTML` 把内容塞进去。

每一次都这样。

但这件事，马上要变了。

## 现在这种做法，到底哪里别扭？

假设你有一个用户资料页。

今天的流程一般是这样：

- 浏览器先下载 HTML 外壳。
- 浏览器再下载 JavaScript。
- JavaScript 发起一次 `fetch()` 请求，去调用你的 API。
- 数据终于返回。
- JavaScript 再找到对应 DOM 节点，把内容补进去。
```
const res = await fetch('/api/user/profile');
const data = await res.json();

document.getElementById('profile-container').innerHTML = \`
  <h1>${data.name}</h1>
  <p>${data.role}</p>
\`;
```

这当然能跑。

但你仔细想想：只是为了把几段文字放到页面上，你却额外发了一个 JavaScript 文件、一次 fetch 请求，还写了一次 DOM 查询。

问题是，这些数据本来就来自服务器。

你只是让它先绕一大圈，再回到页面里。

这多少有点蠢。

所以，确实应该有更好的办法。

现在，这个办法来了。

分享一个正版GPT5.5 目前 0.2 倍率，claude-code-4.8 0.4倍率, 关注公众号后，在后台回复：airealy 即可自动获取兑换码及使用方式。

## 新方式：声明式局部更新

这个新提案叫：

Declarative Partial Updates。

中文可以理解为：声明式局部更新。

它的想法非常简单。

你在 HTML 里放一个标记，告诉浏览器：这里将来会有动态内容。

然后，服务器把一个 template patch 流式传输到这个位置。

剩下的事情，浏览器自己处理。

不需要 JavaScript。 不需要 fetch。 不需要 DOM 查询。

## 第一步：在HTML外壳里定义占位符

```
<div id="profile-section">
  <?marker name="profile">
  <p>Loading...</p>
</div>
```

这里的：

```
<?marker name="profile">
```

是一个 processing instruction。

它告诉浏览器：

这里有内容要进来。

在服务器处理数据期间，用户可以立刻看到：

```
<p>Loading...</p>
```

也就是页面先出来，占位内容先显示。

## 第二步：服务器把补丁流式传回来

当数据准备好后，服务器会在同一个 HTTP 响应里继续流式输出：

```
<template for="profile">
  <div class="profile-card">
    <h1>John Doe</h1>
    <p>Software Engineer</p>
  </div>
</template>
```

浏览器看到：

```
<template for="profile">
```

就会去找到对应的 marker，然后把原来的内容替换掉。

没有 `fetch()` 。

没有 `getElementById` 。

没有 `.innerHTML` 。

浏览器自己完成更新。

这才是最爽的地方。

## 更狠的是：它支持乱序流式更新

真正有意思的地方在这里。

你的页面不需要等最慢的数据库查询结束，才开始展示内容。

比如页面一开始就可以把两个区域先发给浏览器：

```
<!-- Sent to the browser instantly -->
<section>
  <h2>Latest Posts</h2>
  <?marker name="posts">
  <p>Fetching posts...</p>
</section>

<section>
  <h2>Recommended Users</h2>
  <?marker name="suggestions">
  <p>Loading suggestions...</p>
</section>
```

这两个区块会立刻显示出来。

然后，服务器端哪个查询先完成，就先把哪个 patch 流回来：

```
<!-- Suggestions query finished first, stream it now -->
<template for="suggestions">
  <ul>
    <li>@jane</li>
    <li>@alex</li>
  </ul>
</template>
```

如果帖子查询慢一点，也没关系。

它完成后再补进去：

```
<!-- Posts query was slower, but it patches in when ready -->
<template for="posts">
  <article>How to Stream HTML Natively</article>
  <article>Declarative Shadow DOM Explained</article>
</template>
```

浏览器会在每一块数据到达的那一刻，立刻更新对应区域。

用户看到的是内容一点点填充出来。

而不是盯着一整块空白页面，等所有东西一起加载完。

这就是体验差距。

## 其中一部分，已经能用了

和这个提案密切相关的另一个功能，叫 Declarative Shadow DOM。

它已经在 2024 年 2 月登陆所有主流浏览器。

也就是说，你今天就可以用。

以前，如果你想给组件挂载 Shadow Root，必须写 JavaScript。

现在，纯 HTML 就能做到：

```
<user-card>
  <template shadowrootmode="open">
    <style>
      .name { font-weight: bold; font-size: 1.2rem; }
    </style>
    <div class="name"><slot name="name"></slot></div>
    <div class="role"><slot name="role"></slot></div>
  </template>

  <span slot="name">John Doe</span>
  <span slot="role">Software Engineer</span>
</user-card>
```

浏览器会直接解析并渲染。

零 JavaScript。

没有 hydration。

没有客户端 bundle。

它就是能工作。

## 当前状态

Declarative Shadow DOM 已经从 2024 年 2 月开始，完整支持 Chrome、Firefox 和 Safari。

今天就可以用于生产环境。

Declarative Partial Updates 目前还在 Chrome 的 flag 后面，需要手动开启。

它在 WHATWG 流程里处于 Stage 2，并且 WICG 里已经有 active explainer，也有真实实现路径。

现在还不能直接用于生产。

但它正在快速推进。

## 为什么这件事很重要？

React 解决 streaming SSR 的方式，是用内联 `<script>` 标签去 patch DOM。

HTMX 可以交换 HTML 片段，但它仍然需要加载一个 JavaScript 库。

Astro 的 island architecture 能独立 hydrate 组件，但客户端依旧要接收 JavaScript。

这些方案都很厉害。

但本质上，它们都是绕路。

它们都在替浏览器做一件浏览器本来就应该能做的事。

Declarative Partial Updates 提出了一个更直接的问题：

如果 HTML 自己就能处理这些更新呢？

不需要库。

不需要 runtime。

不需要 workaround。

服务器流式发送 HTML。

浏览器负责 patch DOM。

就是这么简单。

而且，这个时代正在来了。

**最后：**

[Hermess Agent基础教程](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzI0NDQ0ODU3MA==&action=getalbum&album_id=4529115739106312193&from_itemidx=1&from_msgid=2247547816#wechat_redirect)

**[精通 React 面试：从零到中高级(针对面试回答)](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzI0NDQ0ODU3MA==&action=getalbum&album_id=4438329314299920385&from_itemidx=1&from_msgid=2247546427&sessionid=#wechat_redirect)**

**[CSS终极指南](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzI0NDQ0ODU3MA==&action=getalbum&album_id=4274694215210369041&from_itemidx=1&from_msgid=2247538974&sessionid=#wechat_redirect)**

**[Vue 设计模式实战指南](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzI0NDQ0ODU3MA==&action=getalbum&album_id=4198498164833402888&from_itemidx=1&from_msgid=2247535710#wechat_redirect)**

[20个前端开发者必备的响应式布局](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzI0NDQ0ODU3MA==&action=getalbum&album_id=4143266676156547085&from_itemidx=1&from_msgid=2247533575&sessionid=#wechat_redirect)

**[深入React:从基础到最佳实践完整攻略](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzI0NDQ0ODU3MA==&action=getalbum&album_id=4062982567140671496&from_itemidx=1&from_msgid=2247531462#wechat_redirect)**

**[python 技巧精讲](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzI0NDQ0ODU3MA==&action=getalbum&album_id=3973477600504201220&from_itemidx=1&from_msgid=2247529168&sessionid=#wechat_redirect)**

**[React Hook 深入浅出](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzI0NDQ0ODU3MA==&action=getalbum&album_id=3660558698339991553&from_itemidx=1&from_msgid=2247523919&scene=173&subscene=91&sessionid=1728003498&enterid=1728004916&count=3&nolastread=1#wechat_redirect)**

**[CSS技巧与案例详解](https://mp.weixin.qq.com/mp/appmsgalbum?action=getalbum&__biz=MzI0NDQ0ODU3MA==&scene=2&album_id=3545535769677725703&count=3&uin=&key=&devicetype=iMac+MacBookPro18%2C3+OSX+OSX+14.3+build\(23D56\)&version=13080812&lang=zh_CN&nettype=WIFI&ascene=2&fontScale=100)**

**[vue2与vue3技巧合集](https://mp.weixin.qq.com/mp/appmsgalbum?action=getalbum&__biz=MzI0NDQ0ODU3MA==&scene=1&album_id=2509459125236416515&count=3#wechat_redirect)**

继续滑动看下一个

大迁世界

向上滑动看下一个