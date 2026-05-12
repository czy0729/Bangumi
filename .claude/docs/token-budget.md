# Token 预算规则

## 禁止读取的路径（文件过大，浪费 tokens）

- `src/assets/json/` — 所有 JSON 数据文件（mono.json、vib.json、substrings/_、typerank/_）
- `src/assets/` — 图片、字体等二进制资源（39M+）
- `dist/`、`node_modules/`、`metro-cache/`
- `web/test/*.json` — 测试数据
- 任何超过 50KB 的 `.json` 文件

## 替代方案

- 用 grep/find 查找 JSON key 或资源在代码中的引用
- 通过读取 import 语句了解数据结构，而非直接读数据文件
- 如确需了解 JSON 结构，只用 Read 工具的 `limit` 参数读前 20 行
