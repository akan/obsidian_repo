#!/usr/bin/env python3
"""
创建包含图片的增强版 HTML 演示文稿
"""

import os
from pathlib import Path

def create_enhanced_html():
    """创建包含图片和完整样式的增强版 HTML 演示文稿"""

    print("正在创建增强版 HTML 演示文稿...")

    # 读取现有的新幻灯片文件
    slide_files = [
        'slide1_new.html',
        'slide2_new.html',
        'slide3_new.html',
        'slide4_new.html',
        'slide5_new.html',
        'slide6_new.html'
    ]

    # 创建合并的 HTML 演示文稿
    html_content = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI辅助编程进入巡航模式 - 增强版演示文稿</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', Arial, sans-serif;
            background: #1C2833;
            color: white;
            overflow-x: hidden;
            padding: 0;
            margin: 0;
        }

        .presentation-container {
            position: relative;
            width: 100%;
            min-height: 100vh;
        }

        .slide {
            width: 720pt;
            height: 405pt;
            margin: 20pt auto;
            background: linear-gradient(135deg, #1C2833 0%, #2E4053 100%);
            border-radius: 12pt;
            overflow: hidden;
            position: relative;
            box-shadow: 0 10pt 30pt rgba(0,0,0,0.3);
            display: none;
        }

        .slide.active {
            display: block;
            animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20pt); }
            to { opacity: 1; transform: translateY(0); }
        }

        .slide-number {
            position: absolute;
            bottom: 20pt;
            right: 30pt;
            font-size: 14pt;
            color: #AAB7B8;
            background: rgba(0,0,0,0.3);
            padding: 5pt 12pt;
            border-radius: 20pt;
            z-index: 10;
        }

        .navigation {
            text-align: center;
            margin: 30pt 0;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,0.8);
            padding: 20pt;
            z-index: 100;
        }

        .nav-btn {
            background: #F39C12;
            color: #1C2833;
            border: none;
            padding: 12pt 24pt;
            margin: 0 10pt;
            border-radius: 25pt;
            font-size: 14pt;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .nav-btn:hover {
            background: #E67E22;
            transform: translateY(-2pt);
        }

        .nav-btn:disabled {
            background: #7F8C8D;
            cursor: not-allowed;
            transform: none;
        }

        .slide-info {
            text-align: center;
            margin: 20pt 0;
            color: #AAB7B8;
            font-size: 16pt;
        }

        .progress-bar {
            width: 100%;
            max-width: 600pt;
            height: 8pt;
            background: rgba(255,255,255,0.1);
            border-radius: 4pt;
            margin: 0 auto 20pt;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background: #F39C12;
            transition: width 0.3s ease;
            border-radius: 4pt;
        }

        @media print {
            body { background: white; }
            .slide {
                margin: 0;
                page-break-after: always;
                box-shadow: none;
                display: block !important;
            }
            .navigation, .slide-info, .progress-bar { display: none !important; }
            .presentation-container { padding: 0; }
        }

        @media screen and (max-width: 768px) {
            .slide {
                width: 90vw;
                height: 50vw;
                min-height: 300pt;
            }
            .navigation {
                padding: 10pt;
            }
            .nav-btn {
                padding: 8pt 16pt;
                font-size: 12pt;
            }
        }
    </style>
</head>
<body>
    <div class="slide-info">
        <strong>AI辅助编程进入巡航模式</strong> - 增强版演示文稿
    </div>

    <div class="progress-bar">
        <div class="progress-fill" id="progress"></div>
    </div>

    <div class="presentation-container">
'''

    current_dir = Path(__file__).parent
    total_slides = 0

    # 读取并整合所有新幻灯片
    for i, slide_file in enumerate(slide_files):
        slide_path = current_dir / slide_file
        if slide_path.exists():
            total_slides += 1
            with open(slide_path, 'r', encoding='utf-8') as f:
                slide_html = f.read()
                # 提取 body 内容
                if '<body>' in slide_html and '</body>' in slide_html:
                    body_start = slide_html.find('<body>') + 6
                    body_end = slide_html.find('</body>')
                    body_content = slide_html[body_start:body_end]

                    html_content += '''
        <div class="slide" id="slide-''' + str(i+1) + '''">
            ''' + body_content + '''
            <div class="slide-number">''' + str(i+1) + ''' / ''' + str(len(slide_files)) + '''</div>
        </div>
    '''

    html_content += '''
    </div>

    <div class="navigation">
        <button class="nav-btn" onclick="previousSlide()">← 上一张</button>
        <button class="nav-btn" onclick="toggleFullscreen()">🔳 全屏</button>
        <button class="nav-btn" onclick="nextSlide()">下一张 →</button>
        <div style="margin-top: 10pt; color: #AAB7B8; font-size: 12pt;">
            提示：使用方向键或点击按钮导航，按 F 键全屏
        </div>
    </div>

    <script>
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const totalSlides = ''' + str(total_slides) + ''';

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            if (index >= 0 && index < slides.length) {
                slides[index].classList.add('active');
                currentSlide = index;
                updateNavigation();
                updateProgress();
            }
        }

        function nextSlide() {
            if (currentSlide < slides.length - 1) {
                showSlide(currentSlide + 1);
            }
        }

        function previousSlide() {
            if (currentSlide > 0) {
                showSlide(currentSlide - 1);
            }
        }

        function updateNavigation() {
            const buttons = document.querySelectorAll('.nav-btn');
            const prevBtn = buttons[0];
            const nextBtn = buttons[2];

            prevBtn.disabled = currentSlide === 0;
            nextBtn.disabled = currentSlide === slides.length - 1;
        }

        function updateProgress() {
            const progress = document.getElementById('progress');
            const percentage = ((currentSlide + 1) / slides.length) * 100;
            progress.style.width = percentage + '%';
        }

        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }

        // 键盘导航
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                case 'PageDown':
                    e.preventDefault();
                    nextSlide();
                    break;
                case 'ArrowLeft':
                case 'PageUp':
                    e.preventDefault();
                    previousSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    showSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    showSlide(slides.length - 1);
                    break;
                case 'f':
                case 'F':
                    e.preventDefault();
                    toggleFullscreen();
                    break;
                case 'Escape':
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    }
                    break;
            }
        });

        // 触摸手势支持
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // 向左滑动 - 下一张
                    nextSlide();
                } else {
                    // 向右滑动 - 上一张
                    previousSlide();
                }
            }
        }

        // 初始化
        showSlide(0);

        // 自动调整显示比例
        function adjustSlideScale() {
            const container = document.querySelector('.presentation-container');
            const slides = document.querySelectorAll('.slide');

            if (window.innerWidth <= 768) {
                container.style.transform = 'scale(0.8)';
                container.style.transformOrigin = 'top center';
            } else {
                container.style.transform = 'scale(1)';
            }
        }

        window.addEventListener('resize', adjustSlideScale);
        adjustSlideScale();

        // 预加载图片
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const preload = new Image();
            preload.src = img.src;
        });

        console.log("演示文稿加载完成，共 " + slides.length + " 张幻灯片");
    </script>
</body>
</html>'''

    # 保存 HTML 文件
    output_path = Path(__file__).parent / 'AI辅助编程进入巡航模式_增强版.html'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"✅ 增强版 HTML 演示文稿创建成功!")
    print(f"📁 保存位置: {output_path}")
    print(f"🌐 包含 {total_slides} 张幻灯片和所有截图")
    print(f"⌨️  支持键盘导航、触摸手势和全屏模式")

if __name__ == "__main__":
    print("🚀 开始创建增强版 HTML 演示文稿...")
    create_enhanced_html()
    print("\n✨ 任务完成!")