---
title: "pxcharts-vue：一款专为 Vue3 打造的开源多维表格解决方案"
source: "https://mp.weixin.qq.com/s/hG08Oq3DEIAfUH36Y_Dmzw"
author:
  - "[[徐小夕]]"
published:
created: 2026-03-03
description: "一款专为 Vue 打造的多维表格开源解决方案"
tags:
  - "Vue3"
  - "开源"
  - "多维表格"
  - "低代码"
  - "数据可视化"
abstract: "本文介绍了一款名为pxcharts-vue的、专为Vue3打造的开源多维表格解决方案，详细阐述了其开发背景、核心特性、技术架构、功能亮点以及快速上手指南。"
---
Original 徐小夕 *2026年3月3日 09:48*

👆关注 **趣谈AI ，后台回复“ 源码 ”获取源码实战**

作者简介：徐小夕， 曾任职多家上市公司，多年架构经验，打造过上亿用户规模的产品， 聚集于AI应用的实践落地 。

最近 推出 了 [《架构师精选](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzU2Mzk1NzkwOA==&action=getalbum&album_id=3943207570462097423&scene=21#wechat_redirect) [》](https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzU2Mzk1NzkwOA==&action=getalbum&album_id=3943207570462097423&scene=21#wechat_redirect) 专栏，会分享一线企业AI应用实践 ， 并 和大家拆解可视化搭建平台，AI产品，办公协同软件的源码实现 。

![图片](https://mmbiz.qpic.cn/mmbiz_png/SPuE3j6U9WicngSNbMbfbqOia03PhPn95KjJg40kULvNqBYEqqAPrKkYzjOXa4SE9icz5Bv07Btgva67swKVsAIrg/640?wx_fmt=png&from=appmsg&wxfrom=5&wx_lazy=1&randomid=27o78l32&tp=webp#imgIndex=0)

去年和大家分享了我的AI产品 pxcharts 超级表格的创业故事：

![图片](https://mmbiz.qpic.cn/mmbiz_gif/dFTfMt0114iclcwFLUGR8jePVgpvF84wHkhRavaDPZpiaYSj9tNkqgIQtqiaYREy8F19aPkSibsngJWwuXsia8Poxmw/640?wx_fmt=gif&from=appmsg&wxfrom=5&wx_lazy=1&tp=webp#imgIndex=8)

[从一行代码到百万表格：我花两年做的pxcharts，把表格做成"AI+低代码数据库"](https://mp.weixin.qq.com/s?__biz=MzU2Mzk1NzkwOA==&mid=2247504980&idx=1&sn=1728c8dab85e4435d67a14910aac3eb6&scene=21#wechat_redirect)

同时我们也利用业余时间，基于国内公司最喜欢的技术栈Vue3全家桶，偷偷做了一款完全开源版的多维表格 pxcharts-vue ：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/8pECSQR2HwXrbnNpHlIMzWvHuPE06JhrSOOT6cJiaia3ut4TzV2pRfE529NJKngQlmN2s35ReRwptXBZfxC3l5ZOlV8xVlbEDY8sVJw4zvedc/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

设计风格完全对标飞书和钉钉AI表格，大家可以基于这个方案轻松实现多维表格产品。

话不多说，先上开源地址：

https://github.com/MrXujiang/pxcharts-vue

为什么要做 pxcharts-vue 多维表格

![Image](https://mmbiz.qpic.cn/mmbiz_png/8pECSQR2HwWJiaibf7LeUvicH2w5Ar8dgicT5BBmb0IFzdgsnkQgyYHDsznTpib2whEGqFKpGYjjUcEW0IeRO89aHALMRmS1LQkibzpAdJoqeSWDY/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

我一直认为，在数据可视化与多维数据处理的场景中，表格始终是核心载体，但市面上多数表格组件往往局限于二维结构，难以满足复杂的多维数据展示、分析需求。

在实际的业务开发中，我们频繁遇到这类需求：

- 电商行业的多维度经营数据（时间、地区、品类、销售额交叉分析）；
- 金融领域的多指标风控数据（客户维度、产品维度、时间维度的风险值展示）；
- 企业 BI 系统的多维报表（多维度钻取、联动、聚合）。

传统二维表格需要大量二次开发才能适配多维场景，且易出现代码冗余、性能卡顿等问题。

因此，我们决定从零开始，打造一款原生支持多维数据结构、轻量化且高度可定制的 Vue 版多维表格组件 —— pxcharts-vue 。

![Image](https://mmbiz.qpic.cn/mmbiz_png/8pECSQR2HwVJiaSPbjjpPadxZr3b5jXfDrMst4UCRfQv5Eps4WGScR7bZ7SEtDde5Hia7oltS4TXSRaI7g5ibjVp5dpAL8lKTrHO88EKmiahetc/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

核心特性我总结如下：

- 🎯 **多维表格** \- 灵活的数据视图切换（表格视图、看板视图、日历视图）
- 🎨 **低代码表单设计器** \- 拖拽式表单构建，支持丰富的表单组件和自定义配置
- 📊 **数据可视化** \- 集成 ECharts 图表库，支持多种图表类型和自定义配置
- 📝 **富文本编辑器** \- 基于 Tiptap 的强大编辑能力，支持图片、链接、文本样式等
- 🎭 **模板市场** \- 内置丰富的行业模板，快速启动项目
- 👥 **团队协作** \- 支持多团队管理、成员邀请、权限控制
- 🎪 **水印编辑器** \- 自定义水印样式，保护数据安全
- 📁 **文件上传** \- 完善的文件管理功能
- 🌓 **响应式设计** \- 适配各种屏幕尺寸，提供优质的移动端体验

下面我会和大家分享一下我们这个项目使用到的技术方案和功能亮点，供大家参考研究。

pxcharts-vue 技术架构设计和核心功能设计

  

先分享一下我们多维表格前端架构设计：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

### 核心技术实现

#### 1\. 多维表格系统

**技术方案** ：

- 基于 `vue3-grid-layout-next` 实现灵活的网格布局
- 使用 `sortablejs` 实现拖拽排序功能
- 虚拟滚动优化大数据量渲染性能

**关键代码结构** ：

```
src/components/DataTable/
├── GridView.vue          # 网格视图
├── KanbanView.vue        # 看板视图
├── CalendarView.vue      # 日历视图
└── TableConfig.vue       # 表格配置
```

#### 2\. 表单设计器

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**技术方案** ：

- 自研拖拽引擎，支持组件拖拽、排序、嵌套
- 配置化表单渲染，支持动态表单验证
- JSON Schema 驱动的表单配置

**实现特点** ：

- 左侧组件面板 - 组件分类、搜索、预览
- 中间画布区域 - 实时预览、拖拽编辑
- 右侧属性配置 - 动态表单、样式配置、事件绑定

#### 3\. 数据可视化

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**技术方案** ：

- 深度集成 ECharts 6.0，封装图表组件
- 支持图表主题定制、响应式布局
- 提供图表二次编辑能力

**支持图表类型** ：

- 折线图、柱状图、饼图、散点图
- 雷达图、仪表盘、漏斗图
- 地图、关系图、树图等高级图表

#### 4\. 富文本编辑器

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**技术方案** ：

- 基于 Tiptap 构建，扩展自定义节点
- 支持图片上传、链接插入、文本格式化
- Markdown 快捷键支持

当然我们也实现了看板视图，大家可以开箱即用：

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

基本上完成了多维表格70%以上的功能，大家只需要基于 pxcharts-vue 的开源版本，进行二次开发，即可实现复杂的多维表格产品。

pxcharts-vue 技术栈

### 前端核心库：

| 技术 | 版本 | 说明 |
| --- | --- | --- |
| Vue 3 | ^3.5.18 | 渐进式 JavaScript 框架 |
| TypeScript | ~5.8.0 | JavaScript 的超集，提供类型检查 |
| Vite | ^7.0.6 | 下一代前端构建工具 |
| Vue Router | ^4.5.1 | Vue.js 官方路由管理器 |
| Pinia | ^3.0.3 | Vue 3 状态管理库 |

### UI 与组件库：

| 技术 | 版本 | 说明 |
| --- | --- | --- |
| TDesign Vue Next | ^1.16.1 | 企业级 UI 组件库 |
| ECharts | ^6.0.0 | 数据可视化图表库 |
| Tiptap | ^3.10.7 | 富文本编辑器框架 |
| Lucide Vue Next | ^0.548.0 | 精美的图标库 |

### 功能增强：

| 技术 | 版本 | 说明 |
| --- | --- | --- |
| Axios | ^1.11.0 | HTTP 请求库 |
| Sortable.js | ^1.15.6 | 拖拽排序库 |
| Vue3 Grid Layout Next | ^1.0.7 | 网格布局组件 |
| Day.js | ^1.11.19 | 轻量级日期处理库 |
| NProgress | ^0.2.0 | 页面加载进度条 |
| Mitt | ^3.0.1 | 事件总线 |
| Lodash | ^4.17.21 | JavaScript 工具库 |

### 开发工具：

| 技术 | 版本 | 说明 |
| --- | --- | --- |
| ESLint | ^9.31.0 | 代码检查工具 |
| Prettier | 3.6.2 | 代码格式化工具 |
| Vue DevTools | ^8.0.0 | Vue 开发调试工具 |
| unplugin-auto-import | ^20.1.0 | 自动导入 API |
| unplugin-vue-components | ^29.0.0 | 自动导入组件 |

## 快速开始

### 环境要求

- Node.js >= 20.19.0 或 >= 22.12.0
- pnpm >= 8.0.0 (推荐) / npm >= 9.0.0 / yarn >= 1.22.0

### 安装依赖

```
# 克隆项目
git clone https://github.com/MrXujiang/pxcharts-vue.git

# 进入项目目录
cd pxcharts-vue

# 安装依赖（推荐使用 pnpm）
pnpm install
# 或者
npm install
```

### 开发运行

```
# 启动开发服务器
pnpm dev

# 访问 http://localhost:5173
```

### 构建部署

```
# 生产环境构建
pnpm build

# 预览构建结果
pnpm preview
```

### 代码规范

```
# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

后续我会写2篇详细的产品介绍和功能技术实现的文章，让大家更全面的了解pxcharts-vue这款开源多维表格项目，大家感兴趣可以学习研究一下：

如果你也在寻找一款开箱即用的多维表格解决方案，如果你相信数据协作还有更好的可能，欢迎来 GitHub 搜索 `pxcharts-vue` ，或者访问我们的演示网站。你可以免费使用，可以贡献代码，也可以在 留言区交流反馈 。

**pxcharts-vue 很多功能需要优化，欢迎大家共建。**

---

*作者：pxcharts创始人，前大厂架构师，坚信好的工具应该让人忘记工具本身的存在。*

github地址： https://github.com/MrXujiang/pxcharts-vue

下面是我的产品号，会定期分享我们的AI产品创业进展：

我的架构专栏

![图片](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

我的 架构专栏 计划写 60 期，会从 源码级技术方案 到 产品商业化设计 ，再到 商业化运营 ，包含了我近8年的 技术研发 和 AI实践 ，也希望和更多优秀的人一起交流，学习，成长。

如果大家有好的建议，想法，欢迎 留言反馈 ～

你的支持，是我努力的动力

作者提示: 个人观点，仅供参考

[Read more](https://mp.weixin.qq.com/s/)

继续滑动看下一个

趣谈AI

向上滑动看下一个