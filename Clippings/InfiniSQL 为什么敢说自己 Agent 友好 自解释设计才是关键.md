---
title: "InfiniSQL 为什么敢说自己 Agent 友好：自解释设计才是关键"
source: "https://mp.weixin.qq.com/s/KhuE4eRAujoR_XBt-bcbbw"
author:
  - "[[祝威廉]]"
published:
created: 2026-06-05
description: "InfiniSQL 的 Agent 友好不靠让 AI 猜语法，而是把数据源、数据处理 ET、算法参数和示例都变成运行时可查询的自解释能力。"
tags:
  - "InfiniSQL"
  - "Agent友好"
  - "自解释设计"
  - "AI学习"
  - "工作流"
abstract: "InfiniSQL通过让语言自身可查询（自解释）和每一步执行结果都保留为命名表（Agent友好），使AI能够不依赖预训练记忆，而是通过向运行时系统询问来掌握数据源、参数和算法，从而逐步完成数据分析与机器学习任务。"
---
祝威廉 *2026年6月5日 08:53*

第一次听到 InfiniSQL 时，大多数人的第一反应是：

“它是 SQL 语法，但又跟常见 SQL 不一样； AI 甚至没见过， AI 能用好么？”

这个问题非常正常。

如果只把 InfiniSQL 当成一门“新 SQL 方言”，那确实会担心： AI 不知道语法，不知道有哪些数据源，不知道有哪些数据处理 ET 和算法，不知道参数名，也不知道复杂分析流程里每一步该接什么。

但 InfiniSQL 的关键设计不是让 AI 去猜，而是把两件事做到语言和运行时里：

1.

**Agentic 友好** ：每一步执行都能沉淀成命名表，后续步骤直接引用，探索状态不丢。

2.

**自解释** ：语言自己能告诉 AI 当前系统有什么数据源、有什么数据处理 ET 、有什么算法、参数怎么填、示例怎么写、训练后的模型怎么解释。

下面我们来解释下 InfiniSQL 如何做到让 AI 不但会用，还可以用得好。

![InfiniSQL Notebook 中自解释结果继续作为表参与查询](https://mmbiz.qpic.cn/sz_mmbiz_png/G0iaFtEibWU96H0MNEd9PbcjIAlR7euM4DFDbgpZAlyT5wGEy1DC6pGmAje3EJSerXkKC0qD1dllhkcoF5FBhhY2Gu8XYUw9cL5mtLq6ymkias/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

## 先把两件事分清楚

很多人会把“Agent 友好”和“自解释”混在一起。其实它们解决的是两个不同问题。

**Agentic 友好** 解决的是工作流问题： Agent 不是一次性写一条大 SQL ，而是一步步探索。它先看数据，再清洗，再聚合，再建模，再评估。每一步都依赖上一步，所以系统必须天然支持“多步调用、状态累积、动态决策”。

**自解释** 解决的是学习问题：即使 Agent 可以一步步做，它也未必知道下一步该用哪个 ET 、哪个参数、哪个示例、哪个 action 。这个时候语言本身必须能被查询，让 Agent 不靠训练语料里的旧印象，而是向当前运行时要答案。

所以， InfiniSQL 的 Agent 友好不是一句“它像 SQL”。

它真正的结构是：

先用 `as tableName` 把每一步变成可继续引用的状态。

再用 `!show` 、 `modelList` 、 `modelParams` 、 `modelExample` 、 `modelExplain` 让系统自己教 Agent 怎么继续。

## 设计一： Agentic 友好，每一步都落表

Agentic 范式的本质是多轮工具调用。每一次调用拿到结果后， Agent 再决定下一步。

InfiniSQL 的 `load` 、 `select` 、 `train` 、 `run` 、 `predict` 都天然贴合这个节奏。特别是 `select ... as tableName` ，它让每一步结果都进入当前 Session ，成为后续步骤可以继续查询的表。

这不是一个小语法糖，而是 Agentic 工作流的底座。

甚至连示例文本数据也可以直接进入这个表空间。比如把每一行 JSON 对象放进一个字符串变量，再用 ``load jsonStr.`变量名` as tableName`` 加载， InfiniSQL 会把 JSON 字段映射成表字段：

```
set orders_json_demo='''
{"order_id":"o1","product":"milk","amount":12.5}
{"order_id":"o1","product":"bread","amount":6.0}
{"order_id":"o2","product":"eggs","amount":9.8}
{"order_id":"o2","product":"milk","amount":12.5}
''';

load jsonStr.\`orders_json_demo\` as orders_from_json_demo;

select order_id, product, amount
from orders_from_json_demo
order by order_id, product
as orders_preview;
```
![通过 load jsonStr 把 JSON 文本映射成表](https://mmbiz.qpic.cn/sz_mmbiz_png/G0iaFtEibWU958jl9snCFfNrh442OWBzYgiaQJYYy7uPoVNKd82VwSctxb6eAgiaPrjvmyic0OwAvxOaibwIwfKvAL0UW9METWu49jt7KnKrfLnFI/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

这一步很适合 Agent ：它不用先找文件、不用写 Python parser ，也不用猜 schema 。只要把小样本写成 JSON lines ，运行时就会生成一张可以继续查询的表。

比如做购物篮关联分析时， Agent 不需要一次写完所有逻辑，也不需要把中间结果复制回提示词。它可以把任务拆成多个 cell ，每个 cell 只回答一个小问题：数据进来了吗？清洗后的表是什么？商品对怎么生成？每个商品出现多少次？最后哪些组合 lift 最高？

第一步，先把 JSON lines 文本加载成表，并做一个 profile 。这里输出的不是最终答案，只是确认运行时已经有了 `assoc_events_raw` 这张表：

```
set assoc_json_demo='''
{"order_id":"o1","product":"milk"}
{"order_id":"o1","product":"bread"}
{"order_id":"o1","product":"butter"}
{"order_id":"o2","product":"milk"}
{"order_id":"o2","product":"bread"}
{"order_id":"o3","product":"milk"}
{"order_id":"o3","product":"eggs"}
{"order_id":"o4","product":"bread"}
{"order_id":"o4","product":"butter"}
{"order_id":"o5","product":"milk"}
{"order_id":"o5","product":"eggs"}
''';

load jsonStr.\`assoc_json_demo\` as assoc_events_raw;

select count(1) as event_rows,
       count(distinct order_id) as order_count,
       count(distinct product) as product_count
from assoc_events_raw
as assoc_step1_profile;
```
![Cell 1 ：加载 JSON 文本并生成可继续引用的表](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

第二步，基于上一步的 `assoc_events_raw` 做清洗，并落成 `assoc_events_clean` 。 Agent 不需要把 profile 结果复制回来，只要继续引用表名：

```
select order_id, lower(product) as product
from assoc_events_raw
where product is not null
as assoc_events_clean;

select order_id, product
from assoc_events_clean
order by order_id, product
as assoc_step2_clean_preview;
```
![Cell 2 ：清洗后的事件表继续作为下一步输入](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

第三步，用清洗表自连接，生成同一订单里的商品对。这个 cell 的输出是 `assoc_pairs` ：

```
select a.product as product_a, b.product as product_b,
       count(distinct a.order_id) as together_orders
from assoc_events_clean a
join assoc_events_clean b
on a.order_id = b.order_id and a.product < b.product
group by a.product, b.product
as assoc_pairs;

select product_a, product_b, together_orders
from assoc_pairs
order by together_orders desc, product_a, product_b
as assoc_step3_pairs_preview;
```
![Cell 3 ：由清洗表生成商品共现对](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

第四步，继续引用 `assoc_events_clean` ，计算每个商品出现在多少个订单里，落成 `assoc_support` ：

```
select product, count(distinct order_id) as product_orders
from assoc_events_clean
group by product
as assoc_support;

select product, product_orders
from assoc_support
order by product_orders desc, product
as assoc_step4_support_preview;
```
![Cell 4 ：支持度表为最终 lift 计算提供依据](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

第五步，最后才把 `assoc_pairs` 和 `assoc_support` 关联起来，计算 confidence 和 lift ，并输出 `association_top_rules` ：

```
select
  p.product_a,
  p.product_b,
  p.together_orders,
  round(cast(p.together_orders as double) / cast(sa.product_orders as double), 2) as confidence,
  round(cast(p.together_orders * total.total_orders as double) /
        cast(sa.product_orders * sb.product_orders as double), 2) as lift
from assoc_pairs p
join assoc_support sa on p.product_a = sa.product
join assoc_support sb on p.product_b = sb.product
cross join (select count(distinct order_id) as total_orders from assoc_events_clean) total
as assoc_rules;

select concat(product_a, ' -> ', product_b) as rule,
       confidence as conf,
       lift
from assoc_rules
order by lift desc, confidence desc
as association_top_rules;
```
![Cell 5 ：最终关联规则按 lift 排序输出](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这里最重要的不是 SQL 有多短，而是每一步都有名字： `assoc_events_raw` 、 `assoc_events_clean` 、 `assoc_pairs` 、 `assoc_support` 、 `assoc_rules` 、 `association_top_rules` 。

Agent 想解释为什么 `bread -> butter` 的 `lift` 最高，可以直接查 `association_top_rules` ；想回看商品对的生成逻辑，可以查 `assoc_pairs` ；想重新定义支持度，也只要追加下一条 SQL 。状态由服务端 Session 托管， Agent 只需要记住表名。

这就是设计一的意义： InfiniSQL 先让 Agentic 工作流跑得起来。

但这还不够。

因为“每一步能继续”只是解决了状态问题。真正难的是： Agent 怎么知道下一步该做什么？

## 设计二：自解释，让 AI 快速学习当前系统

自解释的核心不是“文档写得多”，而是“系统能被查询”。

InfiniSQL 里有两类入口。

第一类是给人的快捷入口：

```
!show commands;
!show datasources;
!show "datasources/params/csv";
!show et;
!show et/RandomForest;
!show et/params/RandomForest;
!show functions;
!show tables;
```
![命令目录返回结果：先知道能调用什么](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

第二类是给系统和 Agent 程序化使用的结构化入口：

```
load modelList.\`\` as models;
load modelParams.\`RandomForest\` as params;
load modelExample.\`RandomForest\` as example;
load modelExplain.\`/models/rf_iris\` where alg="RandomForest" as explain;
```

这几条语句返回的都是表。

这很关键。因为 Agent 拿到的不是一段散文，而是可以继续查询、筛选、聚合的结构化结果。比如它可以先查 `modelList` 看有哪些 ET ，再从 `modelParams` 里筛出关键参数，然后从 `modelExample` 里拿到完整 SQL 模板。遇到数据源时，它也可以直接查 `!show datasources` 和 `!show "datasources/params/..."` ，让当前运行时告诉它有哪些源、每个源有哪些选项。

在源码里，这个设计也不是旁路文档。 `ShowCommand.scala` 会把快捷命令转成结构化查询：

```
!show et             -> load modelList.\`\` as __output__;
!show et/Name        -> load modelExample.\`Name\` as __output__;
!show et/params/Name -> load modelParams.\`Name\` as __output__;
```

而 `ModelExplain.scala` 统一实现了 `modelList` 、 `modelParams` 、 `modelExample` 、 `modelExplain` 。也就是说，快捷命令和结构化查询最终走的是同一套运行时自解释能力。

数据源也是同样的思路：`!show datasources` 会进入 `_mlsql_` 系统表，读取当前运行时注册的数据源；`!show "datasources/params/数据源名"` 会继续从对应数据源自己的 `explainParams` 返回参数说明。也就是说，数据源自解释同样来自运行时，而不是文章里写死的一张清单。

这和“把文档塞进 prompt”完全不同。

文档会过期，也会被上下文挤掉；运行时自解释返回的是当前系统实际注册、实际可用、实际接受的能力。

## 自解释不只给算法：数据源也能自己说明白

很多数据分析任务的第一步不是建模，而是“数据从哪里来”。

如果 Agent 不知道 InfiniSQL 当前能读哪些数据源，它不应该猜。它可以先问运行时：

```
!show datasources;
```

或者把数据源目录变成一张表，继续做聚合：

```
load _mlsql_.\`datasources\` as datasource_catalog;

select count(1) as returned_rows,
       count(distinct name) as distinct_sources
from datasource_catalog
as datasource_summary;

select name
from datasource_catalog
group by name
order by name
as datasource_names;
```

在 9002 Notebook 的英文界面里，当前运行时返回了 58 行数据源注册记录，去重后是 45 个数据源名称。里面不只有 `csv` 、 `jsonStr` 、 `parquet` 、 `text` 这种常见文件源，也有 `jdbc` 、 `delta` 、 `kafka` 、 `mongodb` 、 `hbase` 、 `redis` 、 `solr` 、 `excel` 等连接型或扩展型数据源。

![运行时返回当前注册的数据源目录](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

知道“有哪些”之后，下一步自然是“怎么用”。

比如 Agent 想读 CSV ，但不知道当前版本支持哪些选项，可以继续问：

```
!show "datasources/params/csv";
```

运行时返回的是结构化参数表，字段包括 `param` 、 `description` 、 `value` 、 `extra` 。在这张表里， Agent 能看到 `header` 、 `inferSchema` 、 `delimiter` 、 `encoding` 、 `quote` 、 `escape` 、 `codec` 等参数，还能从 `extra` 里读到值类型、默认值、候选值等信息。

![CSV 数据源把参数、默认值和候选项返回成表](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

同样，连接数据库时也可以问：

```
!show "datasources/params/jdbc";
```

这会返回 `url` 、 `driver` 、 `user` 、 `password` 、 `partitionColumn` 、 `lowerBound` 、 `upperBound` 等 JDBC 读取参数。对 Agent 来说，这比“猜 Spark JDBC 选项”可靠得多，因为它拿到的是 InfiniSQL 当前运行时实际接受的参数。

这就是数据源层面的自解释：不是把一份数据源清单塞进 prompt ，而是让系统自己回答“我现在能读什么、每个源怎么配置”。

## 数据处理 ET 也能自己解释参数和示例

数据进来后， Agent 常常还要清洗、展开、抽样、列处理、质量概览、缓存。过去这一步最容易靠猜：到底叫 `JsonExpand` 还是 `JsonExpandExt` ？参数是 `inputCol` 还是 `jsonCol` ？统计摘要该用 `run` 还是 `predict` ？

InfiniSQL 的数据处理 ET 也走同一套自解释协议。先问目录：

```
load modelList.\`\` as all_ets;

select algType, count(1) as n
from all_ets
group by algType
order by n desc
as et_type_summary;
```

当前运行时返回 `feature engineer` 类型 108 个、 `algorithm` 类型 25 个。这里的 `feature engineer` 就是大量数据处理、特征处理、数据质量和运行时辅助 ET 所在的类别。

继续筛几个典型数据处理 ET ：

```
select name, algType, substr(doc,1,160) as doc_preview
from all_ets
where name in ("JsonExpandExt", "DataSummary", "ColumnsExt", "CacheExt", "RateSampler")
order by name
as data_processing_et_catalog;
```

如果 Agent 对 `JsonExpandExt` 感兴趣，可以继续问参数和示例：

```
!show "et/params/JsonExpandExt";

load modelExample.\`JsonExpandExt\` as json_expand_example;

select name, substr(value,1,500) as value_preview
from json_expand_example
as json_expand_example_preview;
```

这时系统会告诉它： `inputCol` 是必填参数，用来指定要展开的 JSON 字符串列； `samplingRatio` 默认是 `1.0` ，用于推断 schema ； `structColumn` 默认是 `false` ，可以决定是否输出 Struct 。示例里还直接给出 `run table_1 as JsonExpandExt.`` where inputCol="col_1"` 这种可复用写法。

![JsonExpandExt 返回自己的参数和可运行示例](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

然后 Agent 就可以照着系统给出的解释实际执行：

```
set ticket_json_demo='''
{"id":"t1","payload":"{\"severity\":\"high\",\"score\":91,\"channel\":\"email\"}"}
{"id":"t2","payload":"{\"severity\":\"low\",\"score\":42,\"channel\":\"chat\"}"}
{"id":"t3","payload":"{\"severity\":\"medium\",\"score\":73,\"channel\":\"email\"}"}
''';

load jsonStr.\`ticket_json_demo\` as tickets_raw;

run tickets_raw as JsonExpandExt.\`\`
where inputCol="payload"
and samplingRatio="1.0"
as tickets_expanded;

select id, channel, severity, cast(score as double) as score
from tickets_expanded
as tickets_clean;

predict tickets_clean as DataSummary.\`\`
where metrics="max,min,mean,totalCount"
and roundAt="2"
as tickets_summary;

select * from tickets_summary order by ordinalPosition as output;
```

这条链路里，自解释和 Agentic 友好是连在一起的：

`jsonStr` 作为数据源，把内联 JSON lines 映射成 `tickets_raw` 。

`JsonExpandExt` 作为数据处理 ET ，把 `payload` 展开成普通列。

SQL 中间步骤把 `score` 转成数值，落成 `tickets_clean` 。

`DataSummary` 再对清洗后的表做列级统计，输出 `max` 、 `min` 、 `mean` 、 `totalCount` 。

最终结果里， `score` 的 `max=91.0` 、 `min=42.0` 、 `mean=68.67` 、 `totalCount=3` 。这不是 Agent 背出来的，而是它先问系统参数和示例，再按系统解释执行出来的。

![按系统解释完成 jsonStr 数据源、 JsonExpandExt 展开和 DataSummary 摘要](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

所以 InfiniSQL 的自解释不是“算法有说明书”这么窄。它覆盖的是分析链路的三个层次：

数据源：能问当前系统能读什么、怎么配置。

数据处理 ET ：能问当前系统能怎么清洗、展开、采样、摘要、缓存。

算法：能问怎么训练、怎么预测、怎么评估、怎么解释模型。

## 自解释怎么带着 AI 完成机器学习

我们用 RandomForest 做一个完整例子。

假设你只把 InfiniSQL 的基础语法告诉 Agent ：每条语句以分号结束，结果用 `as tableName` 命名；想了解能力时先查 `!show` 或 `model*` 表。

接下来 Agent 可以不靠猜，按语言自己的反馈完成机器学习。

### 1\. 先问：当前系统有哪些 ML 能力？

```
load modelList.\`\` as ml_catalog;

select name, algType
from ml_catalog
where name in ('RandomForest', 'Binning', 'ScoreCard')
as ml_capabilities;
```

这一步解决“有没有这个能力”。 `modelList` 返回当前注册的 ET 名称、类型和文档摘要。 Agent 不必假设 RandomForest 一定存在，而是先验证。

### 2\. 再问： RandomForest 需要哪些关键参数？

```
load modelParams.\`RandomForest\` as rf_params;

select param, description, value
from rf_params
where param like '%featuresCol%'
   or param like '%labelCol%'
   or param like '%numTrees%'
   or param like '%maxDepth%'
as rf_key_params;
```

这一步解决“参数怎么写”。 `modelParams` 返回 `param` 、 `description` 、 `value` 、 `extra` ，其中 `extra` 里还可以包含默认值、当前值、值类型、是否必填、候选选项等信息。

也就是说， Agent 不需要凭训练记忆猜 `featuresCol` 还是 `featureCol` ，也不需要猜 `numTrees` 是不是当前版本支持。

### 3\. 再问：有没有完整可运行示例？

```
load modelExample.\`RandomForest\` as rf_example;

select name, length(value) as example_chars
from rf_example
where name='codeExample'
as rf_example_check;
```

`modelExample` 返回的 `codeExample` 不是一小段孤立语法，而是一条完整工作流：准备数据、特征向量化、训练、预测、模型解释、准确率统计。

![modelExample 的返回给出可复制的运行示例](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这一步解决“完整流程怎么串”。 Agent 可以把示例当成骨架，再替换成自己的数据表、模型路径和参数。

### 4\. 按系统给出的路径执行训练、预测、评估、解释

根据 `modelParams` 和 `modelExample` ， Agent 可以继续写出实际 ML 链路：

```
load jsonStr.\`iris_json_demo\` as iris_raw_demo;

select name, vec_dense(features) as features, label
from iris_raw_demo
as iris_train_demo;

train iris_train_demo as RandomForest.\`/tmp/infinity_sql_self_explain/notebook_rf_iris\` where
keepVersion="false"
and evaluateTable="iris_train_demo"
and \`fitParam.0.featuresCol\`="features"
and \`fitParam.0.labelCol\`="label"
and \`fitParam.0.numTrees\`="10"
and \`fitParam.0.maxDepth\`="4"
as rf_train_result_demo;

predict iris_train_demo as RandomForest.\`/tmp/infinity_sql_self_explain/notebook_rf_iris\`
as rf_predictions_demo;

select count(*) as total,
       sum(case when label = prediction then 1 else 0 end) as correct,
       round(sum(case when label = prediction then 1 else 0 end) * 100.0 / count(*), 2) as accuracy_percent
from rf_predictions_demo
as rf_accuracy_demo;

load modelExplain.\`/tmp/infinity_sql_self_explain/notebook_rf_iris\` where alg="RandomForest"
as rf_model_explain_demo;
```

我在 9002 Console 里实际跑了这条链路。最终汇总结果显示：系统发现的模型是 `RandomForest` ， `modelExample` 返回了 11904 个字符的可运行示例， 12 条样本预测全对， `modelExplain` 返回 9 行模型解释信息。

![通过自解释入口完成 RandomForest 训练、预测、评估与模型解释](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这里的重点不是用 12 条样本证明模型性能，而是证明一件更基础的事： Agent 可以先用语言自身查能力、查参数、查示例，再把查到的内容落成可执行的训练、预测、评估和解释步骤。

这就是自解释真正厉害的地方：

不是让 Agent “天生知道 RandomForest 怎么写”，而是让 Agent 能用 InfiniSQL 自己的语言问出 RandomForest 怎么写，然后一步步完成机器学习。

## 复杂算法更需要自解释： ScoreCard 不是黑箱

RandomForest 已经能说明问题，但自解释真正有价值的地方，是 ScoreCard 这种复杂业务算法。

评分卡不是“输入数据，输出模型”这么简单。它至少涉及：

分箱；

WOE / IV ；

逻辑回归；

分数刻度；

规则表；

单样本归因；

AUC / Gini / KS ；

PSI 稳定性监控。

如果系统只暴露一个黑箱 `train` ， Agent 很容易乱猜。

InfiniSQL 的做法是让 ScoreCard 自己解释自己的动作。 `modelParams.ScoreCard` 会告诉 Agent ， `action` 支持：

`fit` ：训练评分卡；

`rules` ：输出可审计规则；

`explain` ：单行评分归因；

`evaluate` ： AUC 、 Gini 、 KS 、坏样本率等指标；

`stability` ：特征级 PSI 稳定性监控。

同时，它还解释 `binningTable` 、 `pdo` 、 `scaledValue` 、 `selectedFeatures` 等业务参数的意义。

![ScoreCard 参数说明：动作和业务参数一目了然](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

所以 Agent 面对 ScoreCard 时，不是直接写训练语句，而是会形成一条自解释驱动的路径：

```
!show et/ScoreCard;
load modelParams.\`ScoreCard\` as scorecard_params;
load modelExample.\`ScoreCard\` as scorecard_example;
```

然后才进入执行：

1.

先标准化输入字段。

2.

先跑 `Binning` 得到 `binningInfoTable` 。

3.

再跑 `ScoreCard action="fit"` 。

4.

再用 `action="evaluate"` 看模型质量。

5.

需要审计时继续用 `rules` 。

6.

需要解释单个客户时继续用 `explain` 。

7.

需要上线后监控时继续用 `stability` 。

下面这组图来自 9002 Console 的实际操作：

![ScoreCard 动作总览](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![ScoreCard 参数说明](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![ScoreCard 示例 SQL](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

第一次按训练写法执行时，系统提示缺少 `binningTable` ，这会把 Agent 拉回正确路径：先做 Binning 。

![首次运行提示：缺少 binning 信息表](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

补齐 Binning 后， ScoreCard 就能继续完成训练和评估：

![Binning 成功产出 binningInfoTable](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![ScoreCard 正常进入可解释链路](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![action="evaluate" 返回评估指标](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这说明自解释不是“算法旁边有一段说明”，而是复杂算法的执行协议本身可查询。 Agent 通过查询这个协议，知道先后顺序、参数含义和下一步动作。

## 为什么这不是普通文档

如果自解释只是一份 Markdown 文档，它迟早会过期。

InfiniSQL 把自解释做成了工程契约。

源码里每个模块的实现，都不只是做功能实现，还要实现：“AI 能不能问清楚我怎么用”。

这才是自解释从文档变成产品能力的地方。

## 最后回到那个问题： AI 能用好么？

如果只把 InfiniSQL 当成“新 SQL 语法”，答案是不确定。

但当你把 InfiniSQL 的基础语法放进任何 Agent 的系统提示词后， Agent 就能神奇地掌握这门语言的各种能力：不是因为它预先背会了一切，而是因为系统会把能力、参数和示例解释给它。

这就是自解释的魔法。

Agent 不需要预先背会所有算法。它只需要掌握一个稳定流程：

```
先用 as tableName 保留每一步状态；
不确定有哪些数据源时查 !show datasources ；
不确定数据源怎么配置时查 !show "datasources/params/..."；
不确定有哪些数据处理 ET 或算法时查 modelList / !show et ；
不确定 ET 或算法参数时查 modelParams ；
不确定 ET 或算法写法时查 modelExample ；
模型训练后查 modelExplain ；
每一步输出继续作为表参与下一步。
```

这就是 InfiniSQL 的两个核心设计：

**Agentic 友好** ：让 Agent 可以一步步探索，而且每一步状态都留得住。

**自解释** ：让 Agent 在不知道时可以问系统，问出来的是当前运行时真实可用的数据源、数据处理 ET 、算法、参数和示例。

前者让 Agent 能连续工作；后者让 Agent 能快速学习。

这也是为什么 InfiniSQL 不只是“让 AI 会用”，而是让 AI 有机会把它用好。

**微信扫一扫赞赏作者**

Read more

继续滑动看下一个

祝威廉

向上滑动看下一个