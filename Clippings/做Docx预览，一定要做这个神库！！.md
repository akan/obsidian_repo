---
title: 做Docx预览，一定要做这个神库！！
source: https://juejin.cn/post/7493733975779917861
author:
  - "[[独立开阀者_FwtCoder]]"
published: 2025-04-17
created: 2025-05-28
description: 来源：沉浸式趣谈 只需几行代码，你就能在浏览器中完美预览 Word 文档，甚至连表格样式、页眉页脚都原汁原味地呈现出来。 接下来，给大家分享两个 Docx 预览的库： docx-preview VS
tags:
  - docx-preview
  - mammoth
  - 预览Word文档
---
![横幅](https://p3-piu.byteimg.com/tos-cn-i-8jisjyls3a/2fd8e96805614492bb2076e3eca5f7a5~tplv-8jisjyls3a-2:0:0:q75.image) ![](https://p26-piu.byteimg.com/tos-cn-i-8jisjyls3a/0d6404b693834ec1a4d258177bb8baf2~tplv-8jisjyls3a-2:0:0:q75.image)

来源：沉浸式趣谈

只需几行代码，你就能在浏览器中完美预览 Word 文档，甚至连表格样式、页眉页脚都原汁原味地呈现出来。

接下来，给大家分享两个 Docx 预览的库：

## docx-preview VS mammoth

`docx-preview` 和 `mammoth` 是目前最流行的两个 Word 文档预览库，它们各有特色且适用于不同场景。

### docx-preview：还原度爆表的选择

安装简单：

```
npm install docx-preview
```

基础用法：

```javascript
import { renderAsync } from 'docx-preview';

// 获取到docx文件的blob或ArrayBuffer后
renderAsync(docData, document.getElementById('container')).then(() => console.log('文档渲染完成！'));
```

试了试后，这个库渲染出来的效果简直和 Office 打开的一模一样！连段落格式、表格样式、甚至是分页效果，都完美呈现。

### mammoth：简洁至上的转换器

mammoth 的思路完全不同，它把 Word 文档转成干净的 HTML：

```
npm install mammoth
```

使用也很简单：

```
import mammoth from 'mammoth';

mammoth.convertToHtml({ arrayBuffer: docxBuffer }).then(result => {
    document.getElementById('container').innerHTML = result.value;
    console.log('转换成功，但有些警告：', result.messages);
});
```

转换出来的 HTML 非常干净，只保留了文档的语义结构。

比如，Word 中的"标题 1"样式会变成 HTML 中的 `<h1>` 标签。

## 哪个更适合你？

### 场景一：做了个简易 Word 预览器

要实现在线预览 Word 文档，且跟 "Word" 长得一模一样。

首选 `docx-preview` ：

```javascript
import { renderAsync } from'docx-preview';

async functionpreviewDocx(fileUrl) {
    try {
        // 获取文件
        const response = awaitfetch(fileUrl);
        const docxBlob = await response.blob();

        // 渲染到页面上
        const container = document.getElementById('docx-container');
        awaitrenderAsync(docxBlob, container, null, {
            className: 'docx-viewer',
            inWrapper: true,
            breakPages: true,
            renderHeaders: true,
            renderFooters: true,
        });

        console.log('文档渲染成功！');
    } catch (error) {
        console.error('渲染文档时出错:', error);
    }
}
```

效果很赞！文档分页显示，目录、页眉页脚、表格边框样式都完美呈现。

不过也有些小坑：

1. 1. 文档特别大时，渲染速度会变慢
2. 1. 一些复杂的 Word 功能可能显示不完美

### 场景二：做内容编辑系统

需要让用户上传 Word 文档，然后提取内容进行编辑。

选择 `mammoth` ：

```javascript
import mammoth from'mammoth';

async functionextractContent(file) {
    try {
        // 读取文件
        const arrayBuffer = await file.arrayBuffer();

        // 自定义样式映射
        const options = {
            styleMap: ["p[style-name='注意事项'] => div.alert-warning", "p[style-name='重要提示'] => div.alert-danger"],
        };

        const result = await mammoth.convertToHtml({ arrayBuffer }, options);
        document.getElementById('content').innerHTML = result.value;

        if (result.messages.length > 0) {
            console.warn('转换有些小问题:', result.messages);
        }
    } catch (error) {
        console.error('转换文档失败:', error);
    }
}
```

mammoth 的优点在这个场景下完全发挥出来：

1. 1\. **语义化 HTML** ：生成干净的 HTML 结构
2. 2\. **样式映射** ：可以自定义 Word 样式到 HTML 元素的映射规则
3. 3\. **轻量转换** ：处理速度非常快

## 进阶技巧

### docx-preview 的进阶配置

```arduino
renderAsync(docxBlob, container, styleContainer, {
    className: 'custom-docx', // 自定义CSS类名前缀
    inWrapper: true, // 是否使用包装容器
    ignoreWidth: false, // 是否忽略页面宽度
    ignoreHeight: false, // 是否忽略页面高度
    breakPages: true, // 是否分页显示
    renderHeaders: true, // 是否显示页眉
    renderFooters: true, // 是否显示页脚
    renderFootnotes: true, // 是否显示脚注
    renderEndnotes: true, // 是否显示尾注
    renderComments: true, // 是否显示评论
    useBase64URL: false, // 使用Base64还是ObjectURL处理资源
});
```

超实用技巧：如果只想把文档渲染成一整页（不分页），只需设置 `breakPages: false` ！

### mammoth 的自定义图片处理

默认情况下，mammoth 会把图片转成 base64 嵌入 HTML。

在大型文档中，这会导致 HTML 特别大。

更好的方案：

```
const options = {
    convertImage: mammoth.images.imgElement(function (image) {
        return image.readAsArrayBuffer().then(function (imageBuffer) {
            // 创建blob URL而不是base64
            const blob = newBlob([imageBuffer], { type: image.contentType });
            const url = URL.createObjectURL(blob);

            return {
                src: url,
                alt: '文档图片',
            };
        });
    }),
};

mammoth.convertToHtml({ arrayBuffer: docxBuffer }, options).then(/* ... */);
```

这样一来，图片以 Blob URL 形式加载，页面性能显著提升！

## 其他方案对比

说实话，在选择这两个库之前，也有其他解决方案：

### 微软 Office Online 在线预览

利用微软官方提供的 Office Online Server 或 Microsoft 365 的在线服务，通过嵌入 `WebView` 或 `<iframe>` 实现 DOCX 的在线渲染。

示例代码：

```
<iframe src="https://view.officeapps.live.com/op/embed.aspx?src=文档URL"></iframe>
```

#### 优点

- • **格式高度还原** ：支持复杂排版、图表、公式等。
- • **无需本地依赖** ：纯浏览器端实现。
- • **官方维护** ：兼容性最好。

折腾一圈，还是 `docx-preview` 和 `mammoth` 这俩兄弟最实用。

它们提供了轻量级的解决方案，仅需几十 KB 就能搞定 Word 预览问题，而且不需要依赖外部服务，完全可以在前端实现。

评论 21