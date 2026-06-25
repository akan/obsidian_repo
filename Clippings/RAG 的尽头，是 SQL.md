---
title: "RAG 的尽头，是 SQL？"
source: "https://mp.weixin.qq.com/s/fh45m297Ekn4RvcwI0Uwpw"
author:
  - "[[金色传说大聪明]]"
published:
created: 2026-06-25
description: "Select 🫧 From AGI_Bar"
tags:
  - "RAG"
  - "SQL"
  - "多跳检索"
  - "知识图谱"
  - "向量搜索"
  - "SAG"
  - "事件"
  - "实体"
  - "召回率"
  - "性能"
abstract: "本文介绍了一种名为SAG的新方法，将文本结构化事件和实体存入SQL数据库，通过JOIN操作实现高效多跳检索，在多项基准测试中提升了召回率。"
---
金色传说大聪明 赛博禅心 *2026年6月22日 23:08*

说下 RAG 吧，做大模型落地业务的时候，绕不开的话题

这玩意儿其实就是个搜索思路：所谓 RAG，就是让大模型在回答之前，先在数据库里扒拉，找到材料后再组织回答。典型的场景就是企业内知识库、智能客服、文档问答啥的

比如你问：「AGI Bar 的泡沫多少钱一杯？」

模型在 Rag 了数据库之后，会告诉你：标准杯9.9，大杯9.11

至于做法，常见就是下面三步走：

→ 把资料转化成数据库，方便搜索比对

→ 提取问题的关键信息，比对数据库，找到语义最相关的片段

→ 把问题并着那些最相关的片段，再塞回大模型，获得回答

而不同的 RAG 方法，本质上就是对上面流程的优化

但如果换一个场景，当一个问题的回答分布在多个不同的文档里的时候，通过向量搜索很难一次全捞到，通常只能多消耗点 token，花点时间跑 Agent

随后 GraphRAG 横空出世，先把文本里的实体和关系提取出来，建一张知识图谱，用图的结构把信息串起来，但慢慢的，项目会越做越重、图谱越来越大、维护成本越来越高

对于这个问题，我在做赛博月刊时的搭档 Jomy，想出了个小妙招：要不，咱直接 SQL 吧？先把“关系扩展”这件事交给 SQL JOIN，把语义匹配和最终选择留给 embedding / rerank / LLM

然后他还把论文，给挂到了 arxiv： `arxiv.org/abs/2606.15971`

本文，就来说说他的这个生活小妙招

## 拆 Event，然后画线

先说下前两年大火 GraphRAG，它通常会从文本里抽取实体和关系，构建知识图谱；很多实现会把关系表示成类似「主体-关系-客体」的三元组，再在图上做社区、摘要或多跳检索

比如「A 公司收购了 B 公司」，拆成 A公司 → 收购 → B公司，然后 Rag 的时候去匹配这些信息但在执行的时候，也会遇到点小问题：不同模型抽出来的关系词不一样

比如...我们中出了叛徒....

这时候 Jomy 想出了个小妙招，先把文本总结出一句话 event，然后提取里面的各种要素 entity 负责索引，对比三元组，大致就是这样：

![Image](https://mmbiz.qpic.cn/sz_mmbiz_png/jXSGuwJvpdh1b3j8qaFaibz7z2Q70BmCXgyiaybRYpno3s0TlmxsZFxVagdicl58sHIibfItiaibNyc6aOVrHEuhyzicM9bZldX9mfWP6fPaSIPGHI/640?from=appmsg#imgIndex=0)

## 效果还不错

下面这个信息，来自原始 Paper

在 HotpotQA、2WikiMultiHop、MuSiQue，三个标准的多跳 benchmark，SAG 9 项 Recall@K 指标赢了 8 项，平均 Recall@2 提升了 11.16%

![Image](https://mmbiz.qpic.cn/mmbiz_png/jXSGuwJvpdiae6BuicticX9OXcDvUrUicnyV9Cy9Iumjk3xroRiagooia51ibQHf6W8vhCHibxnN4Tr8qibyKGYNfnFogbfjeYBsGA7kFY6T7QYekKeU/640?from=appmsg#imgIndex=1)

## 用 SQL，做多跳检索

SAG 的方法，也可以用来做多跳检索

大致就是：拿到初始的一批 event 之后，在 SQL 里取出这些 event 关联的 entity，再查这些 entity 还连着哪些别的 event，排除掉已经有的，就得到了下一跳的候选....就是 JOIN 查询

对于大规模数据，流程也便是新数据进来，切片段，抽 event，抽 entity，进数据库，已经在 5 亿级数据上跑通了，线上检索延迟在秒级

Jomy 自己的产品 Zleap 也是基于 SAG 做的，做企业本地化 Agent 的数据底座，感兴趣的可以去看看

论文和代码：

→ 论文： `arxiv.org/abs/2606.15971`

→ Benchmark 代码： `github.com/Zleap-AI/SAG-Benchmark`

→ 开箱即用版： `github.com/Zleap-AI/SAG`

→ 在线体验： `wiki.zleap.com`

→ Jomy 的 Zleap 产品： `zleap.com`

**微信扫一扫赞赏作者**