BASE='https://test-zhonghe-smart-csm-ws.zhrpc.net/smart-csm/seal/zgj/callback'
TOKEN='8e08d777018e08ee9471'

# 注意两点：filePath 保持你贴的这种已编码形态（含原始中文会被 URI 校验拒绝）；
# fileName 用中文名没问题，它会原样参与签名并作为最终下载文件名
curl -i -k -X POST "$BASE?token=$TOKEN" -H 'Content-Type: application/json' \
  -d '{"id":"260910001081","pushNode":"1","status":"SUCCESS","archivesFileList":[{"fileName":"申请提取住房公积金个人授权承诺书.pdf","filePath":"https://api.51shebao.com/api/file/download?path=51shebao@Attachment/2021-11/11/1636627167125643_%e7%94%b3%e8%af%b7%e6%8f%90%e5%8f%96%e4%bd%8f%e6%88%bf%e5%85%ac%e7%a7%af%e9%87%91%e4%b8%aa%e4%ba%ba%e6%8e%88%e6%9d%83%e6%89%bf%e8%af%ba%e4%b9%a6.pdf&name=%e7%94%b3%e8%af%b7%e6%8f%90%e5%8f%96%e4%bd%8f%e6%88%bf%e5%85%ac%e7%a7%af%e9%87%91%e4%b8%aa%e4%ba%ba%e6%8e%88%e6%9d%83%e6%89%bf%e8%af%ba%e4%b9%a6.pdf"}]}'
