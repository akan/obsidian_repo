BASE='https://test-zhonghe-smart-csm-ws.zhrpc.net/smart-csm/seal/zgj/callback'
TOKEN='8e08d777018e08ee9471'
SD='260910001081'
BODY='{"id":"'$SD'","pushNode":"1","status":"SUCCESS","archivesFileList":[{"fileName":"a.pdf","filePath":"http://59.110.52.187:8088/not-exist.pdf"}]}'

# ① token 错误 → 预期失败应答
curl -i -X POST "$BASE?token=wrong" -H 'Content-Type: application/json' -d "$BODY"

# ② 单据 id 非数字（本次修复点）→ 预期失败应答"单据id非数字"，不再静默 200
curl -i -X POST "$BASE?token=$TOKEN" -H 'Content-Type: application/json' \
  -d '{"id":"ABC123","pushNode":"1","status":"SUCCESS","archivesFileList":[{"fileName":"a.pdf","filePath":"https://x/a.pdf"}]}'
