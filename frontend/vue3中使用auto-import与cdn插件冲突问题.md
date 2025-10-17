---
title: "vue3中使用auto-import与cdn插件冲突问题"
source: "https://juejin.cn/post/7561636054416719923"
author:
  - "[[jason_yang]]"
published: 2025-10-16
created: 2025-10-17
description: "背景 在开发vue3项目的时候，我们经常会用到unplugin-auto-import/vite来简化项目的import，同时为了提高加载的效率，使用cdn加速访问。 但实际却发现冲突问题"
tags:
  - "插件冲突"
  - "自动导入"
  - "CDN引入"
  - "执行顺序"
abstract: "文章详细分析了Vue3项目中unplugin-auto-import与vite-plugin-cdn-import插件因执行顺序导致的冲突问题，并提供了多种解决方案。"
---
## 背景

在开发vue3项目的时候，我们经常会用到 `unplugin-auto-import/vite` 来简化项目的import，同时为了提高加载的效率，我们会把固定的资源放在cdn加速访问。

在实际项目常用的是使用 `unplugin-auto-import/vite` 做自动导入， `vite-plugin-cdn-import` 做cdn的引入

`vite-plugin-cdn-import` 主要做两件事，

- 在html把你插入一个script，地址是你配置的cdn的url。
- 在通过别名映射，把编译时会把源码中的vue改成cdn的 window.Vue
- 把cdn的资源排除在rollup打包信息里

## 问题

然后在实际应用中，我们在dev开发模式下，可以不import也能正式使用ref和onMounted，但是打包后就会无法正常使用

经过寻找，在vite-plugin-cdn-import 的 issues [github.com/MMF-FE/vite…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FMMF-FE%2Fvite-plugin-cdn-import%2Fissues%2F13 "https://github.com/MMF-FE/vite-plugin-cdn-import/issues/13") 找到这个解决方案，主要说的是插件执行顺序问题。

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/4c220c85d53a412ea38bcb998b2d33f9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=fXfGER6oxyIfhqGNzUnYxMFvoXQ%3D)

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/0a77ca066e9a4bd88184e05ab03f57ac~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=ksZTX5%2FdflWStLrV7OJ9TJNO0II%3D)

为了搞清楚这个问题，我们调试一下vite的配置

## 重现问题

新建一个vite项目并安装

```sh
pnpm i unplugin-auto-import vite-plugin-cdn-import -D
```

vite.config.ts

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import cdnImport from "vite-plugin-cdn-import";

const config = {
  base: \`/\`,
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
    }),
    cdnImport({
      modules: [
        {
          name: "vue",
          var: "Vue",
          path: "https://unpkg.com/vue@3.5.10/dist/vue.global.prod.js",
        },
      ],
    })
  ]
}; 
export default defineConfig(config)
```

src/components/HelloWorld.vue 文件

```html
<script setup lang="ts">
// import { ref ,onMounted } from 'vue'
defineProps<{ msg: string }>()
onMounted(() => {
 count.value = 1000
 console.log('onMounted called')
})
const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>
```

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e071d99e70304589a2244d21a5541bb5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=jPAnhHYkSmN59cx8JHVSTahYLaw%3D)

### 验证开发模式

```sh
pnpm dev
```

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9c52e240e1f14e64b1b7cf800dcc6345~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=tbeczLuJifE3arSd%2Bu0hjya3FdI%3D) 一切正常：自动把count 设置成1000,控制台输出onMounted called

### 验证打包模式

```sh
pnpm build
npx serve -s dist
```

打包自动在 index.html 输出 `<script src="https://unpkg.com/vue@3.5.10/dist/vue.global.prod.js" crossorigin="anonymous"></script>` ![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/2ddd062a28484ebf9f092e1e0fc2b7c8~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=wz6owOaAsretaAJ17jr0V5jksrQ%3D)

并且文件大小只有12k 没有vue原文件信息

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b12d85b641b44e7592eafee5590b0fa2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=kXzeg4mQe7hC9FMEuD2XVU9kpEo%3D)

运行结果 ![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6b0d8dd99f2c43f0b67d0092f9f618d7~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=xpYyamWisa1NhdKxai9%2Bt8%2FjsFM%3D)

但是运行结果不理想，count 没有设置成1000,控制台也没有输出onMounted called

## 打印配置

从issue上看说是plugin的enforce属性影响了。那我们来打印看看，我们在返回config的时候console一下

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3daa36f6fcbb4784a7869a8afce33023~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=cMQSuctoNCfr%2FS6EjBIzfkHcw10%3D)

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/559e3df172ce4082bfbc6ba0345db2ec~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=5NkY09z%2FuQehXFMVVipYxUa0r0E%3D)

这是虽然看到plugins 是3个对象但是 第三个居然是数组，也就是vite插件支持对象或数组，没关系，我们提取出来再打印

```js
cdnImport({
      modules: [
        {
          name: "vue",
          var: "Vue",
          path: "https://unpkg.com/vue@3.5.10/dist/vue.global.prod.js",
        },
      ],
    })[0]
```

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/c5ff0b58dcba42468147a3098f346a96~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=WN4zoTcLP%2BGa66yvPDGXHcbYAp4%3D)

再次运行打印

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ed6008977ade4e898c6623f7393e2a1e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=F7jc%2FQSBtUqzdrbEqztYQXA20no%3D)

其实不用打印，使用插件一样可以显示enforce的信息

```js
pnpm i -D vite-plugin-inspect
```

加入inspect到plugins

```js
/* eslint-disable */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import externalGlobals from 'rollup-plugin-external-globals'
import cdnImport from "vite-plugin-cdn-import";
import inspect from 'vite-plugin-inspect'

const config = {
  base: \`/\`,
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
    }),
    cdnImport({
      modules: [
        {
          name: "vue",
          var: "Vue",
          path: "https://unpkg.com/vue@3.5.10/dist/vue.global.prod.js",
        },
      ],
    })[0] 
    , // 注意这里 他返回的是数组（vite数组一个都支持）所以要取第一个才好打印，需要访问第一个元素，
   inspect({}),
  ]
};

console.log(config)
export default defineConfig(config)
```

运行dev后，会多一个 [http://localhost:5173/\_\_inspect/](https://link.juejin.cn/?target=http%3A%2F%2Flocalhost%3A5173%2F__inspect%2F "http://localhost:5173/__inspect/")

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/6a1a31916f3f4ff4b91e9fa6911c5bdf~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=SyILutwptpr8b%2B5ZXjVmJ1jGQGM%3D)

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/bf746796d5df4c5b9fc1e993658f2cb2~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=h%2FHz0nXLdRJ%2Bq%2BEy6y%2F8YoFK2FI%3D)

## 分析问题

好家伙 unplugin-auto-import 是post ，但vite-plugin-cdn-import 居然是 pre 。那会发生什么事情？

我们重新梳理一下 正常直觉我们都以为 plugin会按数组顺序依次执行

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/ae9c5ad2fe6044eeb3298b5fbecb4770~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=COrjp1dRxT1zjOEAKlvgo8iOucE%3D)

然而根据vite的规则，会在执行时先按enforce来排序， pre优先，post 最后，不设置则在中间，

最终执行会变成如下图

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b00cdeb250fa4e2cbb80cc15dc3824d0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=n%2Bo83HtMiyJbGImmTJxQZncgrLY%3D)

## 修复问题

根据issue的指引，我们只需要确保auto-import先执行就行了，所以调整cdn-import 的enforce为 post，当两个都是post的时候vite就会按数组顺序执行

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/fba14b22db414cdb99e8bf75e0c74566~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=Ay%2Fv5sRiSHcupBx%2FSAxW3mhbBo4%3D)

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import externalGlobals from 'rollup-plugin-external-globals'
import cdnImport from "vite-plugin-cdn-import";
import inspect from 'vite-plugin-inspect'

const config = {
  base: \`/\`,
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
    }),
    {
      ...cdnImport({
      modules: [
        {
          name: "vue",
          var: "Vue",
          path: "https://unpkg.com/vue@3.5.10/dist/vue.global.prod.js",
        },
      ],
    })[0], 
    enforce: 'post' // 覆盖原来的enforce值
    }, 
   inspect({}),
  ]
};

console.log(config)
export default defineConfig(config)
```

我们通过解构重新给 cdnImport 设置 enforce: 'post'

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/e24bd3bed7ec4b5388539882fe2971af~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=5WIvND2H1igyhooeOthuAWNNDBg%3D) 结果报了另一一个错误，看来还是有兼容bug，不折腾找找别的方案。

## 换个库试试吧

其实cdn-import 无非就是插html点js 和 把代码中的vue改成映射后window.Vue，并且把cdn资源排除在roll打包信息里。 那我们用其他库也能实现，在上面issue有另外一个大神给出其他方案

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/3f637bc801694f1cb42dbe4e3b359b4e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=mFYUYvEK0a5f6kUyT%2FjvVa0WfDY%3D)

在这位大侠的 [源码](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fttk-cli%2Fvue3-template%2Ftree%2Ftest%2Fcdn1 "https://github.com/ttk-cli/vue3-template/tree/test/cdn1") 确实找打了解决方案 ，就是用 `rollup-plugin-external-globals` 来处理cdn 的命名，并且自己在html页面输出对应的script的标签

vite.config.js

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import externalGlobals from 'rollup-plugin-external-globals'
 

const config = {
  base: \`/\`,
  plugins: [ 
    vue(),
    {
      ...AutoImport({
      imports: ["vue"],
    })
    }, 
      {
      ...externalGlobals({
        vue: 'Vue', 
      }),
      enforce: 'post', // 注意这里也要加上post ，不然上面AutoImport 又会后执行
    },
  ], 
    build: { 
    rollupOptions: {   
      external: ['vue'], // 告诉 Rollup 不要将 'vue' 打包进输出文件
      plugins: [
        externalGlobals({
          vue: 'Vue',              // import vue → window.Vue 
        })
      ], 
    }
  }
};

console.log(config)
export default defineConfig(config)
```

注意 externalGlobals 也是要加 post 不然上面AutoImport 又会后执行 ![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/291c6f51cd994000831e8e7faed77320~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=yf6KK9HjtGG1PYPZkUlK2f4UngE%3D)

告诉rollup 不要把vue打进来 ![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/262250d973784eb888d92f646b9c766d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=wkJU9GVFbGMkITVNyGZmBFfNDrE%3D)

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue + TS</title>
     <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

在html 加入cdn，当然也可以改成动态配置，输出变量循环 ![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/67b694059e304327aec71fa76ee8b3ea~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=qfFyCSP2lTnEIkhRVv2hfL3sh%2Fc%3D)

最终运行 ![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/86f13e290a3a4e58aad79da07e81541f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=0B1voD5Ue%2BQ2yNJmjWcENZQ9%2BKU%3D) nice

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/4e4e0890c57249c091c03d7b4f8801ee~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=h868eFY3ZaKjPUySZF6wZnFBvvY%3D) 并且资源请求也符合预期，项目js 1.6k，vue.js 是另外下载

## 进一步分析

我们改造一下配置，让所有build的代码正常输出，通过对比两次差异

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import externalGlobals from 'rollup-plugin-external-globals'
import cdnImport from "vite-plugin-cdn-import";
import inspect from 'vite-plugin-inspect'

const config = {
  base: \`/\`,
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
    }),
   {
      ...cdnImport({
      modules: [
        {
          name: "vue",
          var: "Vue",
          path: "https://unpkg.com/vue@3.5.10/dist/vue.global.prod.js",
        },
      ],
    }), 
    enforce: 'post'
    }, // 注意这里 他返回的是数组（vite数组一个都支持）所以要取第一个才好打印，需要访问第一个元素，
   inspect({}),
  ],
  build: {
    minify: false, // 禁用代码压缩混淆
    sourcemap: true, // 生成 sourcemap 便于调试
    rollupOptions: {  
      treeshake: false, // 禁用 tree shaking
      output: {
        compact: false, // 不压缩代码
      },
    }
  } 
};

console.log(config)
export default defineConfig(config)
```

左边是有问题的， 右边是正常的

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/62866e5a926f466e9fda00d3aad8430a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=rE6uBQnI3JUda4arhn0MkUUCO88%3D)

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/0450834577e449a8b6b245c29743cebc~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAgamFzb25feWFuZw==:q75.awebp?rk3s=f64ab15b&x-expires=1761270439&x-signature=Qw4T%2BCU4ST%2BgoCQYRN25nvtGgfg%3D) 在生成的代码里，我们看到主要差异就是，

#### 左边 错误的

居然还保留了 `import { onMounted, ref } from "vue";` 并且使用onMounted 和 ref 是直接使用，所以证明了auto-import后置执行了，

#### 右边 正确的

使用vue的库是通过 Vue.onMounted访问，并且没有 import 的代码。

## 扩展

其实还有一种解决方案，如果你的项目域名已经是cdn指向的前提下。可以使用vite的rollupOptions 的manualChunks，单独把vue资源报分离出来。由于vue的版本如果没有变化，每次hash值是一样的，这样生成的vue.js文件每次都是一样的，也能达到cdn加速效果。但是就不太适合分发给其他项目。

当然本地也要先安装vue

```js
pnpm i vue -D
```
```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import cdnImport from "vite-plugin-cdn-import";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // AutoImport({
    //   imports: ["vue"],
    // }),

    cdnImport({
      modules: [
        {
          name: "vue",
          var: "Vue",
          path: "https://unpkg.com/vue@3.5.10/dist/vue.global.prod.js",
        },
      ],
    }),
  ],
  base: \`/\`,
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // 将大的库单独打包 
            if (id.includes("element-plus")) return "vendor-element";

            // 其他第三方库按类别分组
            if (id.includes("vue")) return "vendor-vue"; 
            console.log(id)
            return "vendor";
          }
        },
      },
    },
  },
});
```

## 参考代码

[github.com/mjsong07/vu…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmjsong07%2Fvue3-auto-import-cdn-bug "https://github.com/mjsong07/vue3-auto-import-cdn-bug")

评论 0

暂无评论数据

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/c12d6646efb2245fa4e88f0e1a9565b7.svg) 1

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/336af4d1fafabcca3b770c8ad7a50781.svg) 评论

![](https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/3d482c7a948bac826e155953b2a28a9e.svg) 收藏

APP内打开