---
title: "告别“搜不到、搜不准”：用这套查询优化，让你的RAG检索召回率飙升"
source: "https://mp.weixin.qq.com/s/RWR0Nk-PAvzNQvLw40rHfg"
author:
  - "[[AI云枢]]"
published:
created: 2025-08-15
description: "告别“搜不到、搜不准”：用这套查询优化，让你的RAG检索召回率飙升"
tags:
  - "RAG检索"
  - "查询优化"
  - "召回率提升"
abstract: "本文介绍了多种优化RAG系统检索机制的技术，旨在提升检索的准确性与召回率。"
---
Original AI云枢 *2025年08月12日 07:45*

引言

在AI的世界里，有句老话叫“Garbage In, Garbage Out”。对于RAG系统而言，检索环节就是那个“In”，如果检索不到精准、全面的信息，那么即便是最强的LLM也只能望“材”兴叹，甚至开始一本正经地“胡说八道”，俗称产生幻觉。 本篇将聚焦于检索前和检索中的优化，从数据的源头和查询的入口解决“找不到”和“找不准”的核心痛点。

---

一：优化数据源：索引构建的最佳实践

核心痛点 ：粗暴地按固定长度切分文档，就像把一本好书随机撕成碎片，重要的上下文和语义关联都丢失了。

1.1 智能分块

放弃按字符数切分的“一刀切”模式，转向更智能的方法：

- 语义分块: 利用算法（或LLM）识别文本中语义的自然断点，如段落、标题或一个完整的概念单元，确保每个被索引的文本块都“言之有物”。
- 句子分块: 以完整的句子为单位进行切分，这是最细粒度的语义单元。

  

1.2 父文档检索器

这是对“句子窗口检索”更通用、更强大的实现，也是我为您补充的一个关键策略。

- 原理 ：
1. 索引时 ：我们将一份文档切分成许多小的“子文档”（比如单个句子），并对这些“子文档”进行向量化。同时，我们保留一份完整的、较大的“父文档”（比如整个段落或页面）。
	2. 检索时 ：我们用用户查询去匹配那些精细的“子文档”。
	3. 返回时 ：一旦命中某个“子文档”，我们 不返回这个小片段 ，而是返回它所属的那个完整的“父文档”作为上下文。
- 优点 ：兼具 检索的精准度 （匹配小块）和 上下文的完整性 （返回大块），效果拔群。

  

1.3 从文档生成QA对：创造更多检索入口

这是另一项 极大提升召回率 的王牌策略。其核心思想是：用户的提问方式千变万化，直接用问题去匹配一段陈述性的文档，在语义上可能存在鸿沟。但 用“问题”去匹配“问题”，则要容易和精准得多 。

- 原理:
1. 对每一个文档块，我们调用LLM，反向生成几个用户可能会提出的、能够被这个文档块回答的问题。
	2. 在构建索引时，我们 只对这些新生成的“代理问题”进行向量化 。
	3. 同时，我们将这些“代理问题”全部链接到它们所源自的那个 原始文档块 的ID。
	4. 当用户提问时，系统会在“代理问题”的向量库中进行搜索。一旦匹配成功，系统不会返回这个代理问题，而是通过ID找到并返回那个 包含完整答案的原始文档块 。
- 优点: 为单个知识点创建了多个不同的语义入口，即使用户的提问方式很刁钻，只要能和其中一个代理问题对上，就能找到正确答案，召回率大大提升。

```python
from langchain.storage import InMemoryStorefrom langchain_core.documents import Documentfrom langchain.retrievers.multi_vector import MultiVectorRetrieverfrom langchain_core.output_parsers import StrOutputParserfrom langchain_core.prompts import ChatPromptTemplateimport uuiddocs = [    Document(page_content="RAG-Fusion通过生成多个查询变体并使用RRF算法智能排序来提升检索相关性。", metadata={"doc_id": str(uuid.uuid4())}),    Document(page_content="假设性文档嵌入（HyDE）先让LLM生成一个理想答案，再用该答案的嵌入来检索真实文档。", metadata={"doc_id": str(uuid.uuid4())}),]doc_ids = [doc.metadata["doc_id"] for doc in docs]question_gen_prompt_str = (    "你是一位AI专家。请根据以下文档内容，生成3个用户可能会提出的、高度相关的问题。\n"    "只返回问题列表，每个问题占一行，不要有其他前缀或编号。\n\n"    "文档内容:\n"    "----------\n"    "{content}\n"    "----------\n")question_gen_prompt = ChatPromptTemplate.from_template(question_gen_prompt_str)question_generator_chain = question_gen_prompt | llm | StrOutputParser()sub_docs = []for i, doc in enumerate(docs):    doc_id = doc_ids[i]    generated_questions = question_generator_chain.invoke({"content": doc.page_content}).split("\n")    generated_questions = [q.strip() for q in generated_questions if q.strip()]
    for q in generated_questions:        sub_docs.append(Document(page_content=q, metadata={"doc_id": doc_id}))vectorstore_qa = Chroma.from_documents(documents=sub_docs, embedding=embeddings)doc_store = InMemoryStore()doc_store.mset(list(zip(doc_ids, docs)))multivector_retriever = MultiVectorRetriever(    vectorstore=vectorstore_qa,    docstore=doc_store,    id_key="doc_id",)user_query = "RAG-Fusion是怎么工作的？"retrieved_qa_docs = multivector_retriever.invoke(user_query)
```

  

1.4 元数据与图谱

- 元数据: 为每个文档块打上丰富的“标签”（如来源、日期、作者、章节等），这能让你在检索时进行精确过滤，是实现企业级知识管理的基础。
- 图RAG: 对于高度结构化、关系复杂的知识（如组织架构、产品依赖关系），构建知识图谱能让RAG处理“A和B有什么关系？”这类多跳查询。

---

二：理解用户意图：查询转换策略

核心痛点 ：用户的问题往往很模糊或角度单一，直接拿去检索，就像用一把钥匙去试一整面墙的锁。

2.1 查询扩展

- 原理: 让LLM扮演“头脑风暴师”，根据用户的原始问题，自动生成多个不同角度、但语义相似的子问题。然后用所有问题去“围剿”答案，最后合并结果。
- 优点: 大幅提升召回率，尤其擅长处理模糊和多义性查询。

```makefile
from langchain.retrievers import MultiQueryRetriever# 1. 从LLM和向量数据库创建一个MultiQueryRetriever#    它会自动处理“生成查询 -> 检索 -> 合并去重”的整个流程multiquery_retriever = MultiQueryRetriever.from_llm(    retriever=vectorstore.as_retriever(), # 使用我们创建的向量数据库作为基础检索器    llm=llm # 使用我们初始化的LLM来生成子查询)# 2. 使用原始查询进行调用user_query = "如何通过修改问题来改进检索效果？"retrieved_docs = multiquery_retriever.invoke(user_query)# 3. 打印结果print_docs(retrieved_docs, f"查询扩展 (MultiQuery) 对 '{user_query}' 的检索结果")# 深入了解它生成了哪些子查询import logginglogging.basicConfig()logging.getLogger("langchain.retrievers.multi_query").setLevel(logging.INFO)retrieved_docs = multiquery_retriever.invoke(user_query)
```

  

2.2 RAG-Fusion

- 原理: 这是 MultiQueryRetriever 的进化版。它同样生成多个子查询，但在合并结果时，使用 倒数排序融合 (RRF) 算法，能智能地将那些在多次不同查询中都排名靠前的“共识”文档，提升到最前面。
- 优点: 相比简单合并，能更有效地筛选出最核心、最相关的结果。

```python
from langchain_core.prompts import ChatPromptTemplatefrom langchain_core.output_parsers import StrOutputParserfrom langchain_core.documents import Documentimport operator# 1. 定义一个用于生成子查询的链 (Chain)query_gen_prompt = ChatPromptTemplate.from_messages([    ("user", "你是一位AI研究员。请根据以下问题，生成3个不同角度的、语义相似的查询。\n"             "每个查询占一行，不要有其他前缀或编号。\n\n"             "原始问题: {original_question}")])generate_queries_chain = query_gen_prompt | llm | StrOutputParser() | (lambda x: x.split("\n"))# 2. 定义RRF算法函数def reciprocal_rank_fusion(retrieval_results: list[list[Document]], k=60):    fused_scores = {}       for doc_list in retrieval_results:        for rank, doc in enumerate(doc_list):            doc_id = doc.page_content            if doc_id not in fused_scores:                fused_scores[doc_id] = 0            fused_scores[doc_id] += 1 / (k + rank)
    reranked_results = [        next((doc for doc_list in retrieval_results for doc in doc_list if doc.page_content == doc_id), None)        for doc_id, score in sorted(fused_scores.items(), key=operator.itemgetter(1), reverse=True)    ]    return [doc for doc in reranked_results if doc is not None]def rag_fusion_pipeline(original_question: str):    # 生成多个查询    generated_queries = generate_queries_chain.invoke({"original_question": original_question})    all_queries = [original_question] + generated_queries    print(f"生成的查询: {all_queries}")    # 独立检索每个查询    retriever = vectorstore.as_retriever()    retrieval_results = [retriever.invoke(q) for q in all_queries]    # 应用RRF算法对结果进行融合和重排    final_docs = reciprocal_rank_fusion(retrieval_results)    return final_docs# 4. 调用user_query = "如何处理用户提问太具体的情况？"fusion_docs = rag_fusion_pipeline(user_query)print(fusion_docs, f"RAG-Fusion 对 '{user_query}' 的检索结果")
```

  

2.3 “后退一步”提示

- 原理: 当用户问得太具体时，先让LLM“后退一步”，提炼出一个更概括、更高层的问题。然后用“具体问题”+“概括问题”一起检索，从而同时捕获细节与背景。
- 优点: 为LLM提供更全面的视角，避免因问题太专而找不到信息。

```python
from langchain_core.runnables import RunnableParallel, RunnablePassthrough# 1. 定义生成“后退一步”问题的Prompt和链step_back_prompt_template = ChatPromptTemplate.from_messages([    ("user", "你是一位善于提炼核心问题的专家。请将以下可能很具体的问题，"             "抽象成一个更通用、更高层次的“后退一步”的问题。\n\n"             "例如：'LangChain的LCEL和Python的asyncio库是如何交互的？' -> 'LangChain LCEL的异步执行机制是怎样的？'\n\n"             "原始问题: {original_question}")])step_back_chain = step_back_prompt_template | llm | StrOutputParser()retriever = vectorstore.as_retriever()chain = (    {        # 第一个分支：对原始问题进行检索        "original_docs": RunnablePassthrough() | retriever,        # 第二个分支：先生成后退问题，再用它进行检索        "step_back_docs": step_back_chain | retriever,    }    # 将两个分支的结果合并、去重    | (lambda x: remove_duplicates_by_id(x["original_docs"] + x["step_back_docs"])))# 辅助函数去重def remove_duplicates_by_id(documents):    seen_ids = set()    unique_docs = []    for doc in documents:        # 假设 page_content 是唯一标识        if doc.page_content not in seen_ids:            unique_docs.append(doc)            seen_ids.add(doc.page_content)    return unique_docsuser_query = "RAG-Fusion里那个RRF算法的平滑参数k有什么用？"step_back_docs = chain.invoke({"original_question": user_query})
```

  

2.4 假设性文档嵌入

- 原理: 先让LLM根据用户问题“凭空”生成一个理想的、完美的答案。然后，用这个“假想答案”的向量去检索真实文档。
- 优点: “假想答案”在语义上无限接近最终答案，因此它的向量可以作为一枚精准的“语义导弹”，高效地命中目标文档。

---

第三章：融合关键词与向量：混合搜索的实现

核心痛点 ：单纯的向量搜索（语义相似）可能会忽略专有名词、代码、ID等必须精确匹配的关键词。

- 原理: 将现代的向量搜索 与传统的 关键词搜索（稀疏检索，如BM25）结合起来。一个负责理解“意思”，一个负责锁定“词语”，取长补短。
- 优点: 极大地提升了检索的鲁棒性，在需要精确匹配和语义理解的场景下都能表现出色。LangChain的 EnsembleRetriever 就是为此而生。

```python
# 示例: 使用 EnsembleRetriever 实现混合搜索from langchain.retrievers import EnsembleRetrieverfrom langchain_community.retrievers import BM25Retrieverfrom langchain.retrievers import EnsembleRetriever# 假设 all_splits 和 vectorstore 已准备好# 1. 初始化关键词检索器 (Sparse Retriever)bm25_retriever = BM25Retriever.from_documents(all_splits)bm25_retriever.k = 3 # 检索3个结果# 2. 初始化向量检索器 (Dense Retriever)vector_retriever = vectorstore.as_retriever(search_kwargs={"k": 3})# 3. 初始化 EnsembleRetriever，并设置权重# weights 参数决定了最终排序时，两种检索器结果的权重ensemble_retriever = EnsembleRetriever(    retrievers=[bm25_retriever, vector_retriever],    weights=[0.4, 0.6] # 稍微偏重向量搜索的语义理解能力)# 4. 使用query = "LangChain中的LCEL是什么?"retrieved_docs = ensemble_retriever.invoke(query)print(f"混合搜索召回了 {len(retrieved_docs)} 个文档。")
```

  

在本篇文章中，我们探讨了多种用于优化RAG系统的检索机制，包括索引构建的最佳实践、多样的查询转换策略以及混合搜索的实现。这些技术旨在从根本上提升检索的准确性与召回率。

然而，获取初步的文档列表只是整个流程的第一步。这些结果在相关性上可能仍然参差不齐，包含了与问题不直接相关的噪音信息。因此，下一步的关键任务，就是如何对这些初步结果进行有效的后处理与筛选。

  

  

继续滑动看下一个

AI云枢

向上滑动看下一个