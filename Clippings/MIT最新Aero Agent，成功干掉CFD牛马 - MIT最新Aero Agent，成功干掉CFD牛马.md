---
title: "MIT最新Aero Agent，成功干掉CFD牛马"
source: "https://mp.weixin.qq.com/s/QuReqxfnOPTa2IwQvqUqLA"
author:
  - "[[向山]]"
published:
created: 2025-06-24
description:
tags:
  - "MIT研究"
  - "多智能体框架"
  - "汽车设计"
  - "空气动力学"
  - "自然语言驱动"
abstract: "MIT开发了一个多智能体框架，通过自然语言输入实现汽车设计和空气动力学的全自动化流程。"
---
![cover_image](https://mmbiz.qpic.cn/mmbiz_jpg/8VP3rn6TUpicUAMCatpIFeyt5ibZ9cicyzHuYaAkzZsrXIHTfjSosjiaeHFKWCvBiaIlaeVEjcrajxkibs9T9L403dcQ/0?wx_fmt=jpeg)

Original 向山 [吹风 那些事儿](https://mp.weixin.qq.com/s/) *2025年06月20日 11:04*

为在走路、吃饭、摸鱼的您提供播客收听

MIT众神研究出了一个面向汽车设计和空气动力学的 Multi-Agent Framework

即通过四个智能体：Styling Agent、CAD Agent、Meshing Agent、Simulation Agent之间的合作， 实现了只需纯自然语言输入的 ，从设计 -> 建模 \-> 仿真 \-> 优化 全AI自动化执行的流程  

纯自然语言输入！只用动动嘴就能搞定全流程！ 简直要了汽车Aero牛马工程师的小命了！

---

  

废话不多说，直接看看 未来Aero仿真的新范式 案例：

第一步 ：告诉AI要设计一款旅行车，还附上了一张草图（不愧是草图，这也太草图了），提出了3个设计方向

![Image](https://mmbiz.qpic.cn/mmbiz_png/8VP3rn6TUpicUAMCatpIFeyt5ibZ9cicyzHc7n51lwmajGoQ3LyMbrvoiaRsxgdMXGcsndvJz1lm0fyj2tzRhwDhkw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1)

AI开始调用Styling Agent，按要求生成了3款车，不过感觉轮廓区别不大，线条有些区别

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

第二步 ：再次动嘴，让从DrivAerNet++数据库（一个包含大量汽车模型及其仿真结果的专业数据库，以后有机会详细介绍）找近似的模型，并开始CFD仿真

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

下面是从数据库抽取出来的，和设计渲染图接近的模型

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果没有近似的，也可基于近似的模型运行生成式AI，可以摆脱数据库模型依赖，生成新的模型

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

第三步 ：输入生成网格的提示词

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

生成的网格不满意可以通过提示词修改，说的还比较婉转🤣

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

最后Simulation Agent会输出结果和后处理云 图， 整个流程完全由自然语言驱动，无需工程师手动操作任何专业仿真软件界面，大大缩短了从概念到结果的时间

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

其实上面简单的分析对比案例，没有体现出它真实的实力

想象一下：你只需一句指令，比如在三种尾部造型风格之间，生成若干个过渡车型，并包含底盘平整度的影响，系统就能自动创建模型、划分网格、运行仿真并汇总对比结果！  

这些，也同样只需要一句Prompt

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

MIT的这项研究不仅为汽车设计带来了革命性的效率提升，更展示了一种全新的‘人-AI协作’工程范式。可以预见，类似的AI Agent框架将迅速渗透到更多工程领域，深刻改变我们设计和研发产品的方式

让牛马也能体验只动 嘴的快 乐~~

不过，那时还需要牛马吗？

猝

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

---

参考文献： Elrefaie, M., Qian, J., Wu, R., Chen, Q., Dai, A., & Ahmed, F. (2025). AI Agents in Engineering Design: A Multi-Agent Framework for Aesthetic and Aerodynamic Car Design. arXiv preprint arXiv:2503.17400.

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

  

修改于 2025年06月20日

继续滑动看下一个

吹风 那些事儿

向上滑动看下一个