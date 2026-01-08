#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PPT 图片生成脚本
基于 ASCII 框架文件生成创意手绘风格的 PPT 图片
"""

import json
import requests
import os
from datetime import datetime

# API 配置
API_ENDPOINT = "https://api.tu-zi.com/v1/images/generations"
API_KEY = "sk-n28jEJUlviO2DBcKgqOZAqOzaWIcfGFg9umMcygJaeU6FPPZ"

# 幻灯片提示词列表
SLIDES_PROMPTS = [
    {
        "slide": "01_cover",
        "title": "封面",
        "prompt": "创意手绘风格插画，智能代理回到未来主题的PPT封面，包含标题文字区域，配有未来科技感的机器人、齿轮、电路图案等元素，采用温暖的色调和手绘质感，背景为渐变色，字体清晰易读"
    },
    {
        "slide": "02_toc",
        "title": "目录",
        "prompt": "创意手绘风格，PPT目录页面，包含8个章节标题，有列表图标、齿轮、箭头等装饰元素，采用温暖的手绘色调，布局清晰有序"
    },
    {
        "slide": "03_efficiency",
        "title": "效率革命",
        "prompt": "创意手绘风格，对比图表展示效率A vs 效率B，左侧是传统优化，右侧是价值创造，有箭头指向、齿轮、图表等元素，手绘质感，暖色调"
    },
    {
        "slide": "04_avatar",
        "title": "化身校准",
        "prompt": "创意手绘风格，展示人机协作流程，从强化学习到专家校准的流程图，有人类和机器大脑的插图，连接箭头，手绘质感，温暖的色彩"
    },
    {
        "slide": "05_federated",
        "title": "联邦架构",
        "prompt": "创意手绘风格，双层架构图，上层是服务层，下层是智能代理层，有数据库、消息系统、API等图标，手绘风格，清晰的结构层次"
    },
    {
        "slide": "06_architecture",
        "title": "三种架构",
        "prompt": "创意手绘风格，三层金字塔式架构图，MAP、MAE、MAU逐层递进，有模块化、层次化的视觉元素，手绘质感，暖色调"
    },
    {
        "slide": "07_agent_types",
        "title": "智能代理分类",
        "prompt": "创意手绘风格，两种AI代理类型对比，左侧是基于策略的代理，右侧是基于LLM的代理，有代码块、模型图标等，手绘风格"
    },
    {
        "slide": "08_ai_failure",
        "title": "AI落地困境",
        "prompt": "创意手绘风格，分析AI失败原因的场景图，包含组织结构问题、角色混淆等元素，有困惑的表情、问号、警示标志等，手绘质感"
    },
    {
        "slide": "09_m1_m2",
        "title": "M1与M2",
        "prompt": "创意手绘风格，展示M1学习组件和M2组织消费组件的关系图，有模型构建、组织架构等元素，连接线和流程箭头，手绘风格"
    },
    {
        "slide": "10_learning_component",
        "title": "ML中的L",
        "prompt": "创意手绘风格，展示机器学习中的学习组件L，包含统计学、模型架构等概念，有公式、图表、学术元素，手绘质感"
    },
    {
        "slide": "11_key_insights",
        "title": "关键洞察",
        "prompt": "创意手绘风格，总结页面，包含6个关键洞察的要点，有灯泡、齿轮、连接线等创意元素，手绘风格，暖色调"
    },
    {
        "slide": "12_future",
        "title": "未来展望",
        "prompt": "创意手绘风格，未来展望页面，包含架构演进、人机协作等方向，有上升箭头、未来科技元素，手绘质感"
    },
    {
        "slide": "13_thanks",
        "title": "谢谢",
        "prompt": "创意手绘风格，感谢页面，简洁优雅的设计，有感谢的装饰元素，温暖的背景色，手绘风格"
    }
]

def generate_image(slide_info, output_dir="ppt_images"):
    """生成单张幻灯片图片"""
    slide_num = slide_info["slide"]
    title = slide_info["title"]
    prompt = slide_info["prompt"]
    
    print(f"\n{'='*60}")
    print(f"正在生成第 {slide_num} 张幻灯片：{title}")
    print(f"{'='*60}")
    
    # 创建输出目录
    os.makedirs(output_dir, exist_ok=True)
    
    # 准备请求数据
    payload = {
        "model": "gemini-3-pro-image-preview-4k",
        "prompt": prompt,
        "n": 1,
        "size": "1792x1024"
    }
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    try:
        # 发送 API 请求
        print(f"发送请求到 API...")
        response = requests.post(API_ENDPOINT, headers=headers, json=payload, timeout=60)
        
        if response.status_code == 200:
            result = response.json()
            image_url = result['data'][0]['url']
            
            # 下载图片
            print(f"下载图片中...")
            img_response = requests.get(image_url, timeout=120)
            
            if img_response.status_code == 200:
                # 保存图片
                filename = f"{slide_num}_{title}.jpg"
                filepath = os.path.join(output_dir, filename)
                
                with open(filepath, 'wb') as f:
                    f.write(img_response.content)
                
                print(f"✅ 成功生成：{filename}")
                return True
            else:
                print(f"❌ 下载失败：HTTP {img_response.status_code}")
                return False
        else:
            print(f"❌ API 请求失败：HTTP {response.status_code}")
            print(f"响应内容：{response.text}")
            return False
            
    except requests.exceptions.Timeout:
        print(f"❌ 请求超时")
        return False
    except Exception as e:
        print(f"❌ 发生错误：{str(e)}")
        return False

def main():
    """主函数"""
    print("="*60)
    print("PPT 图片生成器")
    print("="*60)
    print(f"总幻灯片数：{len(SLIDES_PROMPTS)}")
    print(f"输出目录：ppt_images")
    print("="*60)
    
    success_count = 0
    failed_count = 0
    
    # 逐个生成图片
    for slide in SLIDES_PROMPTS:
        if generate_image(slide):
            success_count += 1
        else:
            failed_count += 1
    
    # 总结
    print("\n" + "="*60)
    print("生成完成！")
    print("="*60)
    print(f"成功：{success_count} 张")
    print(f"失败：{failed_count} 张")
    print(f"总计：{len(SLIDES_PROMPTS)} 张")
    print(f"输出目录：{os.path.abspath('ppt_images')}")
    print("="*60)

if __name__ == "__main__":
    main()
