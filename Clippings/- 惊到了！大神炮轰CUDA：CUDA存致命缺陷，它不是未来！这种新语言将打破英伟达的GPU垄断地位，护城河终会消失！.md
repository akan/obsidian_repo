---
title: "惊到了！大神炮轰CUDA：CUDA存致命缺陷，它不是未来！这种新语言将打破英伟达的GPU垄断地位，护城河终会消失！"
source: "https://mp.weixin.qq.com/s/EDCOp_1EDHmOBQE3_hsGYQ"
author:
  - "[[云昭]]"
published:
created: 2025-07-21
description: "CUDA的致命缺陷！"
tags:
  - "CUDA缺陷"
  - "Mojo语言"
  - "英伟达垄断"
abstract: "文章探讨了CUDA的局限性，并介绍了基于MLIR的Mojo语言如何可能打破英伟达在GPU市场的垄断地位。"
---
Original 云昭 *2025年07月21日 12:32*

![Image](https://mmbiz.qpic.cn/mmbiz_gif/MOwlO0INfQoIDJ0nx1IhNibpIpYLrpUE0kIP9qbF1iaY7EoZpaic6IojvbXibd5ZGiatxmjtibQRcVbGAPM9Ijvp66yQ/640?wx_fmt=gif&from=appmsg&randomid=q8zvz2p3&tp=webp&wxfrom=5&wx_lazy=1) ![Image](https://mmbiz.qpic.cn/mmbiz_png/MOwlO0INfQo4z0mzRyC3kShUKaicMVs6tdKZAmM4slCn6iaial0jpazOwkmhJibQI54vnh0eTzlcnDPH07XO8zUclQ/640?wx_fmt=png&from=appmsg&randomid=tmlhknxx&tp=webp&wxfrom=5&wx_lazy=1)

编译 | 沈建苗、云昭

### CUDA一直被视为英伟达GPU的最强壁垒，让许多业界的玩家望洋兴叹。

### 但，今天这篇文章会给各位习惯C++、CUDA开发的大佬提个醒：

### 有一种新的编程语言，正在AI圈兴起，撬动英伟达的围墙花园。而CUDA也不再是护城河。

### 近日，一位大牛 Thomas Cherickal，发表了一篇博客，阐述了一种新的编程范式。他认为，基于 MLIR 的 Mojo 无疑将取代基于 LLVM 的 CUDA，而且这种方式已经几乎可以在其他任何芯片上运行，包括谷歌TPU、AMD、英特尔以及任何定制的AI芯片！作者思路非常清晰，从市场竞争格局、硬件和软件的趋势变化两个角度，拆解了 CUDA 的优势和致命缺陷，并做出了论断：CUDA 将走向终点，而 Mojo 才是未来。篇幅较长，建议大家收藏细读。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### CUDA：一座看得见的围墙花园

其实，即便 OpenAI、DeepMind 这些 AI 巨头，其实也都曾苦 CUDA 久矣。问题是，目前还没什么好替代品。

自 2007 年推出以来，CUDA 一直是 GPU 编程的黄金标准。它让开发者能够更精细地控制 GPU，但也让英伟达在软硬一体的算力生态中建立了坚固的护城河：

- **硬件绑定** ：只能运行在英伟达 GPU 上，AMD 或其他芯片基本无缘；
- **学习门槛高** ：使用 C++ 风格，语法复杂，不适合初学者；
- **创新被封锁** ：一旦你选了 CUDA，就意味着难以迁移，成本高、空间小。

从训练模型到部署推理，CUDA 的封闭性和高门槛，让无数开发者又爱又恨。一边是性能无敌的 GPU，一边是写起来像黑魔法一样的 CUDA。

过去，AI 公司要想跑得快，几乎只能选英伟达。  

然而，Mojo 出现了，它带来了一种更优的方案。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

英伟达的挑战者越来越多，需要新的编程理念

在分析 Mojo 优势之前，不妨先研究下，英伟达硬件的竞争者们。

到了 2025 年 年 中，情况在发生变化。 IT 界 正在向异构化彻底转变。由此，我们看到科技巨头从没有放弃推出自己的芯片。

我们看到专用硬件 遍地开花 ：

**•** **英特尔** **Gaudi** **系列：**

英特尔的 Gaudi 处理器专为深度学习训练和推理而设计， 是英伟达 GPU 的有力 竞争 者 。

**•** **AMD Instinct MI** **系列：**

AMD 的 MI 系列 GPU 为高性能计算和 AI 工作负载而设计， 是英伟达 数据中心 GPU 的竞争者 。

**•** **Groq** **张量流处理器** **（** **TSP** **）** **：**

Groq 的 TSP 架构为低延迟推理和高吞吐量而设计，尤其适用于大语言模型。

**•谷歌** **TPU** **：**

谷歌 的 TPU 是针对 机器学习工作负载（尤其在 谷歌 云基础架构中）优化的定制芯片。

**•** **AWS Trainium** **：**

AWS Trainium 是一款为机器学习训练而设计的芯片， 具有 高性能和 成本效益 。

除此之外，主攻 定制芯片 的 初创公司 也不在少数。而这种 百花齐放 的 新 格局需要一种新的编程理念。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**拆解 CUDA：它究竟 强大在哪里**

CUDA 的全称是 统一计算设备架构。它是 英伟达的 并行计算平台和编程模型 ， 允许开发者编写类似 C++ 的代码（称为内核）， 可 在 英伟达 GPU 上运行。

**CUDA 的真正优势在于常年积累的库生态，其成熟度可以说市面上无与伦比。这里展示一些：**

• 数学库：

cuBLAS ：用于基本线性代数子程序 （ BLAS ） 。

cuRAND ：用于随机数生成。

cuFFT ：用于快速傅里叶变换。

cuSPARSE ：用于稀疏矩阵运算。

cuTENSOR ：用于张量运算。

cuSOLVER ：用于稠密和稀疏直接求解器。

• 并行算法库：

nvGRAPH ：用于图算法。

Thrust ：用于并行算法和数据结构。

• 通信库：

NVSHMEM ：用于分区全局地址空间 （ PGAS ） 编程。

NCCL ：用于多 GPU 和多节点集体通信。

• 深度学习库：

cuDNN ：用于深度神经网络计算。

TensorRT ：用于优化深度学习推理。

Riva ：用于对话式 AI 。

DALI ：用于深度学习的数据加载和增强。

此外，CUDA 还 对硬件 实现了 直接底层控制，使研究人员能够 获得 最佳性能；另外，悠久的历史造就了庞大的社区，拥有丰富的文档和支持。

**![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)**

**但，CUDA也有 致命缺陷**

Cherickal *认为，CUDA 的致命缺陷就在于它的“牢笼”。*

*厂商* *锁定： CUDA 代码只能在* *英伟达* *GPU 上运行。* 这 导致 开发者和整个行业 被一家收费高昂的 硬件供应商 牢牢束缚 。这抑制了竞争，并限制了选择最佳硬件的自由。

*双语言问题：* *AI* *和科学计算的主要瓶颈。研究人员使用* Python 等高级语言 设计 原型，因为简单易用 、 迭代速度快。但对于生产环境 而言 ， 关注 性能 的 代码必须完全用低级 C++/CUDA 重写。这造成了痛苦且昂贵的脱节，减缓了从研究到部署的进程。

*编程复杂性： CUDA* 功能强大，但 异常 复杂和 冗繁 。开发者被迫手动管理内存，在 CPU （主机）和 GPU （设备）之间传输数据。开发者还必须成为硬件调度员，管理线程块、网格和同步。这种复杂性导致学习曲线陡峭， 常常 导致难以察觉的 bug 。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

编译器技术：LLVM 面临的问题

再来看编译器方面。大家首先会想到的是 LLVM。

LLVM 项目是 一系列 模块化且可重用的编译器技术。其核心是 LLVM 中间表示 （ IR ） ， 这是 一种类似汇编的 低级 语言。 LLVM 已成为现代编译器后端的标准，尤其适用于 CPU 。编译器前端（ 比如面向 C++ 的 Clang ）将源代码转换 成 LLVM IR 。然后， LLVM 后端优化 该 IR ，将其转换 成 特定 CPU 的机器码。这种模块化在当时是革命性的。

然而， LLVM 是为以 CPU 为中心的 时代 设计的。对于异构硬件 盛行 的新 时代 来说， 其 IR 过于低级。

它会丢失源代码中重要的高级信息，这个问题 名为 “ 语义鸿沟 ”（ semantic gap ） 。 比如说 ，在编译 TensorFlow 模型时，某个 运算 是卷积运算的 知识或信息会丢失 。

LLVM IR 只能识别一组 宽泛 的循环和算术指令。这 使得 编译器 无法 执行强大的、 针对 特定领域的优化。它不再理解程序员的高级意图。这就是 “ 语义鸿沟问题 ” 的本质 ，而 MLIR 解决了这个问题。

这里科普一下：

CUDA 的编译流程部分借助了 LLVM IR（NVVM），但整体还是闭源且偏向传统的硬编码式工具链；而 Mojo 则选择原生拥抱 MLIR（一个更现代、更模块化的 LLVM 子项目），在可扩展性与多架构适配性上更进一步。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**MLIR：最后一块拼图**

**MLIR（Multi-Level Intermediate Representation，多级中间表示）诞生于谷歌，最初是为了解决 TensorFlow 无法统一编译到 CPU、GPU 和自家 TPU 的问题。**

他们很快发现：LLVM 传统的单一、底层中间表示（IR）已经 **无法胜任现代异构硬件的复杂需求** 。

MLIR 的突破点在于，它提供了一个统一的基础架构，可以 **定义、组合多个不同层次的 IR** 。

这些可组合的 IR 被称为 **“方言（dialects）”** 。

你可以把 MLIR 理解为一个“硬件通用翻译器”，它能同时理解从高级语言语义到底层硬件细节的所有层级。每种方言都代表了一个特定领域或抽象层级：

- 比如，“TensorFlow 方言”中就直接包含了 `tf.conv2d` 这样的卷积操作；
- 而“线性代数方言”则定义了 `linalg.matmul` 这样的矩阵乘法。

这使得 **高级语义得以完整保留** ，而不是像传统编译器那样一上来就扁平化处理。

这样做的最大好处，就是能启用一种更强大的编译策略： **逐步降阶（progressive lowering）** 。

编译器不再一口气把高级代码压成底层汇编，而是像“剥洋葱”一样，一层层转化：

1. 从高级方言（如 TensorFlow）开始，执行特定领域的优化；
2. 然后逐步“降阶”，转换为更低层次的中间方言（如线性代数方言、内存访问方言等）；
3. 每个中间阶段都有独立的优化策略；
4. 最后才进入底层方言，如 LLVM IR，用于生成最终机器码。

这种方式能 **尽可能长时间地保留高阶语义上下文** ，从而带来更精准、更有针对性的编译优化。

### 因此，在高级语言和多样化芯片架构之间，MLIR 是目前最有希望的桥梁。

它不仅解决了 “一语言绑一硬件” 的问题，还让开发者和编译器都可以更自由地定义优化路径。

简言之：

> **MLIR 是连接高级编程与底层芯片世界的“关键接口层”。**

无论你是写 AI 框架、区块链虚拟机，还是芯片设计工具，MLIR 都是值得关注的底层基石。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**最前沿的语言，为什么是 Mojo ？**

如果说 MLIR 是强大 又 复杂的引擎， Mojo 就是简洁直观的用户界面。  

2023 年 5 月，Mojo 由 LLVM 和 Swift 语言的原始架构师 Chris Lattner 创建 。 其设计理念遵循 第一原则，旨在成为 MLIR 时代的完美语言，是一种可在多个平台上实现快速且可移植的 CPU+GPU 代码的编程语言。

就这一点而言，可以说， Mojo 是当今技术最先进的语言。

因为，即便是近几年大热的 Rust，也 都是基于 LLVM 的 ，所以 具有 LLVM 的所有缺点。而 Mojo 则 是当今唯一基于 MLIR 的主流编程语言。

**Mojo 的主要** **功能有以下几个：**

*一、Python 的超集*

• Mojo 旨在与现有的 Python 生态系统完全兼容 ， 这是 一项 杀手级功能！

• 它允许开发者导入和使用任何 Python 库， 比如 NumPy 、 Pandas 或 Matplotlib 。

• 它通过利用 Python 庞大的生态系统， 完全规避 了新语言面临的 “ 冷启动 ” 问题。

*二、真正的系统编程特性：*

• 与 Python 不同， Mojo 是一种具有强静态类型的编译语言。

• 这消除了 一大批 的运行时错误，并实现了 C++ 级的性能优化。

• 它引入了现代内存管理概念 以确保内存安全 ， 比如 所有权和借用（源自 Rust ）， 没有 垃圾收集器的开销。

*三、一流的 MLIR 集成：*

• Mojo 将 MLIR 的全部功能直接展现给开发者。

• 程序员可以为应用程序 的大部分 编写 类似 Python 的高级 代码。

• 需要最高性能时，可以 降级 使用特定的 MLIR 方言 ， 并编写低级内核。

• 重要的是， 这一切 可以在同一个文件中使用同一种语言完成。

此外，Mojo 还 轻松 解决了 “ 双语言问题 ” 。

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

代码PK：Mojo如何秒杀CUDA

理论是一回事，实践是另一回事。以下完整且 实用 的代码示例 ， 将展示两种范式之间的 重大 差异。

篇幅原因，这里只举一个“矩阵乘法”的示例。

*完整的 CUDA 实现*

这是一个完整的、可编译的 CUDA 矩阵乘法程序。

```
// Filename: matmul.cu
// To compile: nvcc matmul.cu -o matmul_cuda

#include <iostream>
#include <vector>
#include <cuda_runtime.h>

// Helper to check for CUDA errors
#define CUDA_CHECK(err) { \
    cudaError_t err_code = err; \
    if (err_code != cudaSuccess) { \
        std::cerr << "CUDA Error: " << cudaGetErrorString(err_code) << " at line " << __LINE__ << std::endl; \
        exit(EXIT_FAILURE); \
    } \
}

// CUDA Kernel for Matrix Multiplication (Device Code)
__global__ void matrixMulKernel(float* C, const float* A, const float* B, int N) {
    // Calculate the global row and column index of the element
    int row = blockIdx.y * blockDim.y + threadIdx.y;
    int col = blockIdx.x * blockDim.x + threadIdx.x;

    // Boundary check to avoid accessing out-of-bounds memory
    if (row < N && col < N) {
        float p_value = 0.0f;
        // Each thread computes one element of the result matrix C
        for (int k = 0; k < N; ++k) {
            p_value += A[row * N + k] * B[k * N + col];
        }
        C[row * N + col] = p_value;
    }
}

// Main function (Host Code)
int main() {
    constint N = 256;
    constint size = N * N * sizeof(float);

    // Step 1. Allocate host memory
    std::vector<float> h_A(N * N);
    std::vector<float> h_B(N * N);
    std::vector<float> h_C(N * N);

    // Initialize host matrices
    for (int i = 0; i < N * N; ++i) {
        h_A[i] = static_cast<float>(rand()) / RAND_MAX;
        h_B[i] = static_cast<float>(rand()) / RAND_MAX;
    }

    // Step 2. Allocate device memory
    float *d_A, *d_B, *d_C;
    CUDA_CHECK(cudaMalloc((void**)&d_A, size));
    CUDA_CHECK(cudaMalloc((void**)&d_B, size));
    CUDA_CHECK(cudaMalloc((void**)&d_C, size));

    // Step 3. Copy matrices from host to device
    std::cout << "Copying data from host to device..." << std::endl;
    CUDA_CHECK(cudaMemcpy(d_A, h_A.data(), size, cudaMemcpyHostToDevice));
    CUDA_CHECK(cudaMemcpy(d_B, h_B.data(), size, cudaMemcpyHostToDevice));

    // Step 4. Define kernel launch configuration
    // Use 16x16 threads per block, a common choice
    dim3 threadsPerBlock(16, 16);
    // Calculate the number of blocks needed in each dimension
    dim3 numBlocks((N + threadsPerBlock.x - 1) / threadsPerBlock.x, (N + threadsPerBlock.y - 1) / threadsPerBlock.y);

    // Step 5. Launch the kernel on the device
    std::cout << "Launching kernel..." << std::endl;
    matrixMulKernel<<<numBlocks, threadsPerBlock>>>(d_C, d_A, d_B, N);
    CUDA_CHECK(cudaGetLastError());
    CUDA_CHECK(cudaDeviceSynchronize()); // Wait for the kernel to finish

    // Step 6. Copy the result matrix back from device to host
    std::cout << "Copying result from device to host..." << std::endl;
    CUDA_CHECK(cudaMemcpy(h_C.data(), d_C, size, cudaMemcpyDeviceToHost));

    // Step 7. Free device memory
    CUDA_CHECK(cudaFree(d_A));
    CUDA_CHECK(cudaFree(d_B));
    CUDA_CHECK(cudaFree(d_C));

    std::cout << "CUDA Matrix Multiplication finished successfully." << std::endl;
    // (Optional: Add verification step here)

    return0;
}
```

CUDA *代码分析：*

代码主要由样板代码和 低级 管理组成。步骤 1 、 2 、 3 、 6 和 7 纯粹用于跨 CPU/GPU 边界管理内存。这很繁琐，容易出错，并掩盖核心算法。全局关键字、 blockIdx 、 threadIdx 和 <<<...>>> 语法是 CUDA 特有的硬件抽象。

该 代码根本上永久地与 英伟达 的硬件架构紧密相关。实际算法 ： 三个嵌套循环只占总代码的一小部分。程序员的精力 耗费 在了硬件管理上，而不是问题本身 上 。

*完整的 Mojo 实现*

Mojo 版本以惊人的简洁性和强大功能 实现 了相同的 效果 。

```
# Filename: matmul.mojo
# To run: mojo matmul.mojo

from memory import DType, Tensor
from random import rand
from time import now

fn matmul_naive(C: Tensor[DType.float32], A: Tensor[DType.float32], B: Tensor[DType.float32]):
    """A naive, high-level implementation of matrix multiplication."""
    let N = A.dim(0)
    let M = A.dim(1)
    let P = B.dim(1)

    for i in range(N):
        for j in range(P):
            var sum: Float32 = 0.0
            for k in range(M):
                sum += A.load(i, k) * B.load(k, j)
            C.store(i, j, sum)

fn main():
    let N = 256
    
    # 1. Allocate and initialize tensors.
    # Mojo's Tensor handles memory allocation automatically.
    # The compiler will place it in the most appropriate memory space.
    var A = Tensor[DType.float32](N, N)
    var B = Tensor[DType.float32](N, N)
    var C = Tensor[DType.float32](N, N)

    for i in range(N):
        for j in range(N):
            A.store(i, j, rand[DType.float32]())
            B.store(i, j, rand[DType.float32]())

    print("Starting Mojo Matrix Multiplication...")
    
    let start_time = now()
    
    # 2. Call the function.
    # The MLIR-based compiler optimizes this high-level code.
    # It can automatically tile, vectorize, and parallelize this code
    # for the target hardware (CPU, GPU, etc.).
    matmul_naive(C, A, B)

    let end_time = now()
    let duration_ms = (end_time - start_time) / 1_000_000.0

    print("Mojo Matrix Multiplication finished successfully.")
    print("Execution time:", duration_ms, "ms")
    # (Optional: Print a corner of the result matrix to verify)
    print("Result C[0,0]:", C.load(0,0))
}
```

就是这样 ！Mojo 方法 **出色得多。**

*首先是，可编程性和专注性：*

• Mojo 代码简洁明了，直接表达算法。

• 程序员专注于 “ 什么 ” （数学运算），而不是 “ 如何 ” （内存传输）。

• 无需手动执行 cudaMalloc 、 cudaMemcpy 或 cudaFree 。

• 这类错误全部消失。

*其次，它注重* *性能* *的* *抽象：*

• 执行的不是简单的嵌套循环。

• 基于 MLIR 的编译器可以执行复杂的转换。

• 这将这段简单代码转换 成 高度优化的内核。

• 它可以自动 运用 平铺、矢量化和并行化。

• 程序员可以添加提示（ 比如 @vectorize 或 @parallelize ） 以 指导编译器，实现控制，而无需增加复杂性。

*最重要的是，终极优势：可移植性。 这是关键* 点 。

• 同一个 matmul.mojo 文件可以重新编译，以便在 英伟达 GPU 、 AMD GPU 、搭载 AVX512 的 英特尔 CPU 或 谷歌 TPU 上运行。

• 逻辑保持不变；编译器后端发生变化。

• CUDA 代码需要针对每个新的硬件目标进行全面且昂贵的重写。

• Mojo 提供 “ 性能可移植性 ” ，打破了 厂商 锁定，使代码 适应 未来 需要 。

所以长期看，基于 MLIR 的 Mojo 无疑将取代基于 LLVM 的 CUDA（部分基于） ，开发者将享受这一变化！

![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**Mojo重新定义了游戏规则**

#### 为什么这么说？

#### 一、职责分离，思维方式的颠覆

Mojo 与 CUDA 的最大区别，在于它们 **对“程序员该关心什么”的定义截然不同** ：

- **Mojo 代码：专注于算法本身**  
	开发者只需表达“我要做什么”，即模型的计算逻辑和结构；
- **CUDA 代码：专注于硬件实现**  
	开发者需要手动指定线程分布、内存布局等 GPU 底层细节。

这种区别不是小修小补，而是 **编程范式的根本转变** 。在 Mojo 中，开发者可以把精力放在 **如何改进算法** 上；而具体“怎么映射到芯片上”，交给 MLIR 编译器自动完成。

#### 二、更快的研究周期、更低的心智负担

在 AI 研究中，尝试一个新模型结构或优化一个训练技巧，是日常操作。

- 用 Mojo 写的模型逻辑清晰、可读性强，研究人员可以 **轻松修改并快速验证想法** ；
- 相比之下，CUDA 的底层代码常常需要大量位运算、手动调度线程、控制内存访问—— **动一下都像拆引擎盖改引擎** ，又慢又容易出错。

这意味着： **Mojo 能大幅加速 AI 的研发周期** ，真正做到“想法立刻变成实验”。

#### 三、最关键的：硬件自由

Mojo 写出来的代码 **不是专属于 NVIDIA 的** ！通过 MLIR 的多级中间表示，Mojo 代码可以编译运行在多种硬件上：

- AMD GPU
- Google TPU
- Intel Gaudi
- 各类定制 AI 加速芯片（如 AI Startup 的专用 ASIC）

甚至只要定义新的“方言”，未来任何新架构都能支持。

这意味着：

> **Mojo 代码是“面向未来”的，不被任何一家芯片厂商锁死。**

这也是 打破英伟达垄断、推动算力成本下降 的关键一环。

**![Image](https://mp.weixin.qq.com/s/www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg%20stroke='none'%20stroke-width='1'%20fill='none'%20fill-rule='evenodd'%20fill-opacity='0'%3E%3Cg%20transform='translate(-249.000000,%20-126.000000)'%20fill='%23FFFFFF'%3E%3Crect%20x='249'%20y='126'%20width='1'%20height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)**

**最终：CUDA的终点，Mojo的未来**

当我们将目光从当下主流的密集矩阵运算，转向未来更广阔的计算领域时，CUDA 的局限就开始暴露。而 MLIR + Mojo 的组合，正是为这种异构、多样、并发、稀疏甚至非传统的计算范式而生。

作者举了一个算力进化的例子：区块链。

比特币这类工作量证明（PoW）机制的区块链，需要巨大的哈希运算能力。

目标是找到一个“nonce”（随机数），使其与区块数据一起哈希后的结果小于目标值——这完全是 **暴力穷举搜索** ，最适合并行加速硬件。

- 起初人们用 CPU；
- 后来转向并行能力更强的 GPU；
- 再后来，进入 **ASIC（专用集成电路）** 时代。

比如：SHA-256 的 ASIC，把哈希算法直接写入了硅片，能效比 GPU 高出几个数量级。

这就是 CUDA 的终点。 但 Mojo 和 MLIR 的故事才刚开始。

MLIR + Mojo 如何改变芯片设计呢？

芯片设计领域有个术语叫 **HLS（高阶综合）** ：把高级算法描述转成硬件电路语言（如 Verilog 或 VHDL）并烧录进芯片。

MLIR，借助项目如 CIRCT（专为硬件设计的 MLIR 子项目），正是下一代 HLS 的核心支撑。

> **一段 Mojo 写的哈希算法代码，可以编译为：**
> 
> - GPU 上运行的并行程序（通过 GPU 后端）；
> - 或直接转为 Verilog，用于设计专属 ASIC 芯片。

**同一段 Mojo 代码，同时通往软件和硬件的两个世界。**

这就是 MLIR 带来的“从软件到硅”的编译能力 —— CUDA 无法涉足的疆域。

*写在最后：Mojo会是赢家吗*

一方面， 未来是异构芯片的 天下， 这并非猜测，而是事实。厂商锁定所带来的商业和技术风险不可接受。

另一方面，随着时间演进，如今 GPU 僵 硬 的 SIMT 模 式不再适应稀疏数据、神经形态 AI 、区块链和量子计算的发展趋势。  

而 MLIR 是目前唯一一 种 旨在解决 这个 问题 且得到 业界支持的架构。

同时，谷歌、苹果、英特尔、 AMD 和 ARM 纷纷 采用 ， 清晰地表明了其在未来编译器领域的核心地位。

而， Mojo 恰恰 是 迄今 唯一能够驾驭这种强大功能的语言。

Mojo 解决了双语言问题 ， 兼具易用性和性能 ，并 提供 了 通往整个 MLIR 生态系统的门户。

因此，从 CUDA 到基于 MLIR 的世界的过渡将是渐进的 过程 ， 却又是 不可避免的。这是从以硬件为中心的 封闭 模式向软件定义的 开放 未来的根本性转变。

但从长远来看， Mojo 会是赢家吗？Mojo 弱势在于生态还没有成熟。

但目前看，至少开发者会更喜欢 Mojo ，而不是 CUDA 。

这篇怼CUDA的文章终于结束了，老规矩，大佬们怎么看？欢迎评论区交流。

参考链接：  

https://hackernoon.com/this-new-language-might-kill-nvidias-gpu-monopoly

https://hackernoon.com/meet-mojo-the-language-that-could-replace-python-c-and-cuda?embedable=true

——好文推荐——

[孤注一掷！小扎本人回应天价挖人策略！顶尖人才更在乎GPU支配权！不是我针对谁，能挖的地方就五六个！可劲造泰坦集群](https://mp.weixin.qq.com/s?__biz=MjM5ODI5Njc2MA==&mid=2655927515&idx=1&sn=e746d8c96664bb11dacdef85a7ced7f2&scene=21#wechat_redirect)

[OpenAI要抛弃英伟达？紧急辟谣：转向谷歌TPU是乌龙，根本无部署计划！满血版芯片谷歌自留，OpenAI被迫搞自研今年就流片！](https://mp.weixin.qq.com/s?__biz=MjM5ODI5Njc2MA==&mid=2655927076&idx=1&sn=00eb9524c2493b60e6a516fa8ce46843&scene=21#wechat_redirect)

  

修改于 2025年07月21日

继续滑动看下一个

51CTO技术栈

向上滑动看下一个