// 简化的 PPT 生成脚本
// 使用内置 Node.js 模块创建基本的 PPTX 结构

const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

async function createBasicPPT() {
    try {
        console.log('创建基础 PPTX 文件...');

        // 创建一个新的 ZIP 实例
        const zip = new JSZip();

        // 基本的 PPTX 文件结构
        const pptxStructure = {
            '[Content_Types].xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
    <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
    <Default Extension="xml" ContentType="application/xml"/>
    <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-presentationml.presentation.main+xml"/>
    <Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-presentationml.slideMaster+xml"/>
    <Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-presentationml.slideLayout+xml"/>
    <Override PartName="/ppt/slides/slide1.xml" ContentType="application/vnd.openxmlformats-presentationml.slide+xml"/>
    <Override PartName="/ppt/slides/slide2.xml" ContentType="application/vnd.openxmlformats-presentationml.slide+xml"/>
    <Override PartName="/ppt/slides/slide3.xml" ContentType="application/vnd.openxmlformats-presentationml.slide+xml"/>
    <Override PartName="/ppt/slides/slide4.xml" ContentType="application/vnd.openxmlformats-presentationml.slide+xml"/>
    <Override PartName="/ppt/slides/slide5.xml" ContentType="application/vnd.openxmlformats-presentationml.slide+xml"/>
    <Override PartName="/ppt/slides/slide6.xml" ContentType="application/vnd.openxmlformats-presentationml.slide+xml"/>
</Types>`,

            '_rels/.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
</Relationships>`,

            'ppt/_rels/presentation.xml.rels': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>
    <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide1.xml"/>
    <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide2.xml"/>
    <Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide3.xml"/>
    <Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide4.xml"/>
    <Relationship Id="rId6" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide5.xml"/>
    <Relationship Id="rId7" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide6.xml"/>
</Relationships>`,

            'ppt/presentation.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
    <p:sldMasterIdLst>
        <p:sldMasterId id="2147483648" r:id="rId1"/>
    </p:sldMasterIdLst>
    <p:sldIdLst>
        <p:sldId id="256" r:id="rId2"/>
        <p:sldId id="257" r:id="rId3"/>
        <p:sldId id="258" r:id="rId4"/>
        <p:sldId id="259" r:id="rId5"/>
        <p:sldId id="260" r:id="rId6"/>
        <p:sldId id="261" r:id="rId7"/>
    </p:sldIdLst>
    <p:sldSz cx="9144000" cy="5143500"/>
    <p:notesSz cx="6858000" cy="9144000"/>
    <p:defaultTextStyle>
        <a:defRPr lang="en-US"/>
    </p:defaultTextStyle>
</p:presentation>`,

            'ppt/slideMasters/slideMaster1.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
    <p:cSld>
        <p:spTree>
            <p:nvGrpSpPr>
                <p:cNvPr id="1" name=""/>
                <p:cNvGrpSpPr/>
                <p:nvPr/>
            </p:nvGrpSpPr>
            <p:grpSpPr>
                <a:xfrm>
                    <a:off x="0" y="0"/>
                    <a:ext cx="0" cy="0"/>
                    <a:chOff x="0" y="0"/>
                    <a:chExt cx="0" cy="0"/>
                </a:xfrm>
            </p:grpSpPr>
            <p:sp>
                <p:nvSpPr>
                    <p:cNvPr id="2" name="Title Placeholder 1"/>
                    <p:cNvSpPr>
                        <a:spLocks noGrp="1"/>
                    </p:cNvSpPr>
                    <p:nvPr>
                        <p:ph type="title"/>
                    </p:nvPr>
                </p:nvSpPr>
                <p:spPr/>
                <p:txBody>
                    <a:bodyPr/>
                    <a:lstStyle/>
                    <a:p>
                        <a:pPr>
                            <a:defRPr lang="zh-CN"/>
                        </a:pPr>
                    </a:p>
                </p:txBody>
            </p:sp>
        </p:spTree>
    </p:cSld>
    <p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
    <p:extLst>
        <p:ext uri="{BB96A84E-334F-4E2E-A92C-4B5F68A63769}">
            <p14:creationId xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" val="1234567890"/>
        </p:ext>
    </p:extLst>
</p:sldMaster>`,

            'ppt/slideLayouts/slideLayout1.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="title" preserve="1">
    <p:cSld>
        <p:spTree>
            <p:nvGrpSpPr>
                <p:cNvPr id="1" name=""/>
                <p:cNvGrpSpPr/>
                <p:nvPr/>
            </p:nvGrpSpPr>
            <p:grpSpPr>
                <a:xfrm>
                    <a:off x="0" y="0"/>
                    <a:ext cx="0" cy="0"/>
                    <a:chOff x="0" y="0"/>
                    <a:chExt cx="0" cy="0"/>
                </a:xfrm>
            </p:grpSpPr>
            <p:sp>
                <p:nvSpPr>
                    <p:cNvPr id="2" name="Title 1"/>
                    <p:cNvSpPr>
                        <a:spLocks noGrp="1"/>
                    </p:cNvSpPr>
                    <p:nvPr>
                        <p:ph type="title"/>
                    </p:nvPr>
                </p:nvSpPr>
                <p:spPr>
                    <a:xfrm>
                        <a:off x="457200" y="2743200"/>
                        <a:ext cx="8229600" cy="1143000"/>
                    </a:xfrm>
                </p:spPr>
                <p:txBody>
                    <a:bodyPr/>
                    <a:lstStyle/>
                    <a:p>
                        <a:pPr algn="ctr">
                            <a:defRPr sz="4400" lang="zh-CN"/>
                        </a:pPr>
                    </a:p>
                </p:txBody>
            </p:sp>
        </p:spTree>
    </p:cSld>
    <p:clrMapOvr>
        <a:overrideClrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
    </p:clrMapOvr>
</p:sldLayout>`
        };

        // 添加基本结构文件到 ZIP
        Object.entries(pptxStructure).forEach(([filePath, content]) => {
            zip.file(filePath, content);
        });

        // 创建幻灯片内容
        const slideTitles = [
            "AI辅助编程进入巡航模式",
            "项目背景",
            "三种AI编程方案对比",
            "实施方法：项目设计",
            "配置文档对比",
            "总结与展望"
        ];

        const slideContents = [
            "三种主流AI编程工具的实践对比与经验分享",
            "Vue-CopilotKit 升级项目\n从 1.0.1 升级到 1.10.6+\n后端接口优化与功能扩展",
            "1. Claude Code + GLM4.6\n2. Antigravity + Gemini3 Pro + Sonnet4.5\n3. Auto-coder + Deepseek3.2",
            "目录结构设计理念\n• 充足上下文\n• 明确参考方案\n• Debug支持",
            "CLAUDE.md vs autocoder RULES.md vs Antigravity 配置\n不同AI工具的配置策略对比",
            "好的开始是成功的一半\n规划比执行更重要\n工具选择决定效率"
        ];

        // 为每张幻灯片创建 XML
        for (let i = 0; i < slideTitles.length; i++) {
            const slideNum = i + 1;
            const slideXml = createSlideXml(slideTitles[i], slideContents[i]);
            zip.file(`ppt/slides/slide${slideNum}.xml`, slideXml);

            // 创建关系文件
            const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
    <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
</Relationships>`;
            zip.file(`ppt/slides/_rels/slide${slideNum}.xml.rels`, relsXml);
        }

        // 生成 PPTX 文件
        const content = await zip.generateAsync({ type: 'nodebuffer' });
        const outputPath = path.resolve(__dirname, 'AI辅助编程进入巡航模式.pptx');

        fs.writeFileSync(outputPath, content);

        console.log('✅ PPT 演示文稿创建成功!');
        console.log(`📁 保存位置: ${outputPath}`);

    } catch (error) {
        console.error('❌ 创建 PPT 时发生错误:', error);
        throw error;
    }
}

function createSlideXml(title, content) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
    <p:cSld>
        <p:spTree>
            <p:nvGrpSpPr>
                <p:cNvPr id="1" name=""/>
                <p:cNvGrpSpPr/>
                <p:nvPr/>
            </p:nvGrpSpPr>
            <p:grpSpPr>
                <a:xfrm>
                    <a:off x="0" y="0"/>
                    <a:ext cx="0" cy="0"/>
                    <a:chOff x="0" y="0"/>
                    <a:chExt cx="0" cy="0"/>
                </a:xfrm>
            </p:grpSpPr>
            <p:sp>
                <p:nvSpPr>
                    <p:cNvPr id="2" name="Title"/>
                    <p:cNvSpPr>
                        <a:spLocks noGrp="1"/>
                    </p:cNvSpPr>
                    <p:nvPr>
                        <p:ph type="title"/>
                    </p:nvPr>
                </p:nvSpPr>
                <p:spPr>
                    <a:xfrm>
                        <a:off x="457200" y="685800"/>
                        <a:ext cx="8229600" cy="1828800"/>
                    </a:xfrm>
                </p:spPr>
                <p:txBody>
                    <a:bodyPr/>
                    <a:lstStyle/>
                    <a:p>
                        <a:pPr algn="ctr">
                            <a:defRPr sz="4400" lang="zh-CN"/>
                        </a:pPr>
                        <a:r>
                            <a:rPr lang="zh-CN" sz="4400"/>
                            <a:t>${escapeXml(title)}</a:t>
                        </a:r>
                    </a:p>
                </p:txBody>
            </p:sp>
            <p:sp>
                <p:nvSpPr>
                    <p:cNvPr id="3" name="Content"/>
                    <p:cNvSpPr>
                        <a:spLocks noGrp="1"/>
                    </p:cNvSpPr>
                    <p:nvPr>
                        <p:ph type="body" idx="1"/>
                    </p:nvPr>
                </p:nvSpPr>
                <p:spPr>
                    <a:xfrm>
                        <a:off x="457200" y="1600200"/>
                        <a:ext cx="8229600" cy="3657600"/>
                    </a:xfrm>
                </p:spPr>
                <p:txBody>
                    <a:bodyPr/>
                    <a:lstStyle/>
                    <a:p>
                        <a:pPr>
                            <a:defRPr sz="2800" lang="zh-CN"/>
                        </a:pPr>
                        ${content.split('\n').map(line =>
                            line.trim() ? `<a:r><a:rPr lang="zh-CN" sz="2800"/><a:t>${escapeXml(line.trim())}</a:t></a:r>` : ''
                        ).join('<a:br/>')}
                    </a:p>
                </p:txBody>
            </p:sp>
        </p:spTree>
    </p:cSld>
    <p:clrMapOvr>
        <a:overrideClrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
    </p:clrMapOvr>
</p:sld>`;
}

function escapeXml(text) {
    return text.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#39;');
}

// 执行创建
createBasicPPT().catch(console.error);