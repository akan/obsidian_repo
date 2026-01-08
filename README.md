# 智能代理回到未来 - PPT 项目

## 📁 项目文件结构

```
.
├── 智能代理回到未来_ASCII框架.txt    # 原始 ASCII 框架文件
├── ppt_slides.md                     # Markdown 格式演示文稿
├── presentation.html                  # HTML 交互式演示文稿
├── generate_ppt.py                   # Python 图片生成脚本
└── README.md                         # 本文件（使用说明）
```

## 📋 项目概述

本项目包含关于"智能代理回到未来 - AI架构演进与实践"的完整演示文稿，采用多种格式：

1. **ASCII 框架**：纯文本版本的幻灯片结构
2. **Markdown 文档**：结构化的演示文稿内容
3. **HTML 演示**：交互式网页演示文稿
4. **Python 脚本**：用于生成创意手绘风格图片

## 🎯 使用方法

### 方法一：查看 HTML 演示文稿（推荐）

直接用浏览器打开 `presentation.html` 文件：

```bash
# macOS
open presentation.html

# Linux
xdg-open presentation.html

# Windows
start presentation.html
```

**特点**：
- ✅ 交互式导航（鼠标点击或键盘方向键）
- ✅ 美观的渐变设计和动画效果
- ✅ 响应式布局，适配不同屏幕尺寸
- ✅ 进度条和幻灯片计数器
- ✅ 无需任何软件或插件

**快捷键**：
- `→` 或 `Space`：下一页
- `←`：上一页
- `Home`：第一页
- `End`：最后一页

### 方法二：导入 Markdown 到其他工具

可以将 `ppt_slides.md` 导入到以下工具：

- **Obsidian**：直接打开或嵌入到笔记中
- **Typora**：实时预览 Markdown
- **Mark Text**：Markdown 编辑器
- **Notion**：导入 Markdown 格式
- **GitBook**：作为文档页面

### 方法三：转换为 PowerPoint

#### 方案 A：使用 pandoc（推荐）

```bash
# 安装 pandoc
# macOS
brew install pandoc

# Ubuntu/Debian
sudo apt-get install pandoc

# 转换为 PowerPoint
pandoc ppt_slides.md -o presentation.pptx
```

#### 方案 B：手动复制内容

1. 打开 PowerPoint 或 Google Slides
2. 创建新演示文稿
3. 逐页复制 `ppt_slides.md` 中的内容
4. 添加图片、图表等视觉元素

### 方法四：生成创意手绘风格图片

使用提供的 Python 脚本生成创意手绘风格的图片：

#### 前置要求

```bash
# 安装 Python 依赖
pip install requests
```

#### 运行脚本

```bash
# 确保 API 账户有足够余额
python generate_ppt.py
```

**脚本功能**：
- 自动为 13 张幻灯片生成创意手绘风格的图片
- 图片尺寸：1792x1024（16:9 比例）
- 保存到 `ppt_images/` 目录
- 详细的中文进度提示
- 错误处理和重试机制

**输出文件**：
```
ppt_images/
├── 01_封面.jpg
├── 02_目录.jpg
├── 03_效率革命.jpg
├── 04_化身校准.jpg
├── 05_联邦架构.jpg
├── 06_三种架构.jpg
├── 07_智能代理分类.jpg
├── 08_AI落地困境.jpg
├── 09_M1与M2.jpg
├── 10_ML中的L.jpg
├── 11_关键洞察.jpg
├── 12_未来展望.jpg
└── 13_谢谢.jpg
```

## 🎨 图片生成自定义

如需修改图片生成参数，请编辑 `generate_ppt.py` 文件：

### 修改提示词

在 `SLIDES_PROMPTS` 数组中修改 `prompt` 字段：

```python
{
    "slide": "01_cover",
    "title": "封面",
    "prompt": "您的自定义提示词",
}
```

### 修改图片尺寸

在 `generate_image` 函数中修改：

```python
payload = {
    "model": "gemini-3-pro-image-preview-4k",
    "prompt": prompt,
    "n": 1,
    "size": "1024x1024"  # 修改这里
}
```

### 支持的尺寸

- `1792x1024` (16:9)
- `1024x1024` (1:1)
- `1024x1792` (9:16)

### 修改 API 配置

如需使用不同的 API：

```python
API_ENDPOINT = "your-api-endpoint"
API_KEY = "your-api-key"
```

## 📊 内容概览

### 幻灯片结构

1. **封面** - 主题介绍
2. **目录** - 8 个主要章节
3. **效率革命** - 效率A vs 效率B
4. **化身校准** - 人机协作新范式
5. **联邦架构** - 双层模型设计
6. **三种架构** - MAU/MAE/MAP
7. **智能代理分类** - 策略驱动 vs LLM驱动
8. **AI落地困境** - 失败原因分析
9. **机器理论** - M1与M2协同
10. **学习组件L** - ML中的核心概念
11. **关键洞察** - 6大核心要点
12. **未来展望** - 实践建议
13. **谢谢** - 结束页

### 核心主题

- **效率范式转换**：从传统优化到价值创造
- **人机协作**：人类专家与AI的深度融合
- **模块化架构**：联邦架构的层次化设计
- **生产级转型**：基于策略的架构优势
- **M1/M2理论**：模型构建与组织消费

## 🔧 故障排除

### 问题 1：HTML 演示无法全屏

**解决方案**：
- 使用浏览器全屏快捷键（通常是 F11）
- 或在浏览器菜单中选择"全屏"选项

### 问题 2：Markdown 在某些编辑器中显示异常

**解决方案**：
- 确保编辑器支持 Markdown
- 检查文件编码是否为 UTF-8
- 尝试使用专业 Markdown 编辑器（如 Typora）

### 问题 3：Python 脚本生成图片失败

**可能原因及解决方案**：

#### 1. API 余额不足
```bash
# 检查余额
# 充值账户或等待账单周期
```

#### 2. 网络连接问题
```bash
# 检查网络连接
ping api.tu-zi.com

# 或者使用代理（如果需要）
```

#### 3. Python 依赖缺失
```bash
# 安装所需依赖
pip install --upgrade requests
```

#### 4. API 响应超时
```python
# 在 generate_image 函数中增加超时时间
response = requests.post(..., timeout=120)  # 增加到 120 秒
```

### 问题 4：生成的图片质量不佳

**解决方案**：
- 修改 `prompt` 描述，增加更多细节
- 尝试不同的风格关键词
- 参考创意手绘风格的最佳实践

## 📚 延伸阅读

### 相关资源

- **Obsidian Base 数据库**：查看项目中的 `.base` 文件
- **模板系统**：查看 `/template/` 目录
- **Mermaid 图表**：使用 `mehrmaid` 插件创建流程图

### 扩展建议

1. **添加动画效果**：使用 CSS 或 JavaScript 增加过渡动画
2. **集成音频**：添加背景音乐或演讲录音
3. **导出 PDF**：使用浏览器打印功能导出为 PDF
4. **自定义主题**：修改 HTML 中的 CSS 样式

## 📄 许可证

本项目内容仅供学习和研究使用。

## 🤝 贡献

如需改进建议或发现问题，欢迎反馈！

## 📞 支持

如需技术支持，请查看：
- 项目文档
- API 提供方文档
- Python requests 库文档

---

**最后更新**：2026年1月8日

**版本**：v1.0
