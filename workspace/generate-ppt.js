const PptxGenJS = require('pptxgenjs');
const html2pptx = require('/Users/admins/opensource/skills/skills/pptx/scripts/html2pptx.js');
const path = require('path');

async function generatePresentation() {
    try {
        console.log('开始生成 PPT 演示文稿...');

        // 创建新的演示文稿
        const pptx = new PptxGenJS();
        pptx.defineLayout({ name: '16x9', width: 10, height: 5.625 });
        pptx.layout = '16x9';

        // 定义幻灯片文件
        const slides = [
            'slide1.html',
            'slide2.html',
            'slide3.html',
            'slide4.html',
            'slide5.html',
            'slide6.html'
        ];

        // 处理每张幻灯片
        for (let i = 0; i < slides.length; i++) {
            const slidePath = path.resolve(__dirname, slides[i]);
            console.log(`正在处理第 ${i + 1} 张幻灯片: ${slides[i]}`);

            try {
                await html2pptx(slidePath, pptx);
                console.log(`✓ 第 ${i + 1} 张幻灯片处理成功`);
            } catch (slideError) {
                console.error(`✗ 第 ${i + 1} 张幻灯片处理失败:`, slideError.message);
                // 继续处理其他幻灯片
            }
        }

        // 保存演示文稿
        const outputPath = path.resolve(__dirname, 'AI辅助编程进入巡航模式.pptx');
        await pptx.writeFile({ fileName: 'AI辅助编程进入巡航模式.pptx', outputPath: __dirname });

        console.log('✅ PPT 演示文稿生成成功!');
        console.log(`📁 保存位置: ${outputPath}`);

    } catch (error) {
        console.error('❌ 生成 PPT 时发生错误:', error);
        throw error;
    }
}

// 执行生成
generatePresentation().catch(console.error);