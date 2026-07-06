# 测试规范

- `it()` / `test()` 描述使用**中文**，格式为简洁的行为描述
- `describe()` 为被测函数/模块名，`it()` 描述预期行为，如 `it('空字符串返回空数组')`
- 测试注释使用中文，保持格式一致
- **主动发掘隐藏问题**，用 `[问题]` 前缀标注，如 `it('[问题] 锁永远不释放时 Promise 永远挂起')`
- **发现问题时测试应该失败**，而不是通过——这样用户看到失败才会去修复代码。写期望的正确行为，而非当前的错误行为
- 常见需验证的问题：
  - 内存泄漏：`setInterval`/`setTimeout` 无清理机制、持续累积的订阅/监听
  - 竞态条件：并发调用共享状态、Promise 乱序完成
  - Promise 永远挂起：缺少 reject/resolve 路径、错误时等待者未通知
  - 异常处理：`async executor` 反模式、空 catch 吞掉错误
  - 边界情况：switch 无 default、空值/undefined 未处理

# cheerio HTML 解析测试规范

以下模式来自 `src/stores/user/__tests__/common.test.ts`，按需参考，自行判断是否适用。

## 结构

```
describe('运行时结构符合类型定义', () => {   // 放在最前
  it('函数名 返回 TypeName', () => {          // 用 expect.any() 验证每项字段类型
    ...
  })
})

describe('函数名', () => {                    // 具体的值验证
  it('总数验证', ...)                         // toHaveLength(n)
  it('首项关键字段', ...)                      // toMatchObject({ ... })
  it('边界情况', ...)                          // Re: 前缀、空值、特殊字符
  it('异常/边缘值', ...)                       // userId 为 0、HTML 实体编码
})
```

## 常见做法

1. **类型校验优先**：第一个 describe 用 `expect.any(String)` / `expect.any(Boolean)` 验证每项结果是否匹配 TS 类型定义，数据类型不符时第一时间暴露
2. **HTML 存外部文件**：真实页面 HTML 放在 `__tests__/html/` 下，通过 `fs.readFileSync` 加载，该目录建议加入 `.gitignore`
3. **使用 cHelper 方法测试**：测 cheerio 解析函数推荐用项目封装的 `cParse` / `cMap` / `cFind` / `cText` / `cData` / `cHtml` / `cHasClass`，而非直接用 cheerio，保证与生产代码行为一致
4. **`toMatchObject` 部分匹配**：用 `toMatchObject` 只检查关心的字段，避免因`cHtml`对中文做 HTML 实体编码（如`测试`→`&#x6D4B;&#x8BD5;`）导致全量匹配失败
5. **内容含中文用 `toContain`**：`cHtml` 返回 HTML 实体编码后的字符串，精确匹配可考虑使用 `toContain` 配合部分内容
6. **每类边缘场景一个 it**：Re: 前缀拆分、`/` 分隔符、`icon.jpg` 默认头像、`&amp;` HTML 实体等各自独立成 it
7. **`[类型定义问题]` 标注类型与实际不符**：如果函数运行时返回值结构与 TS 类型定义不一致（如 label 项缺少 `name`/`avatar`/`userId` 但类型标记为 required），可在注释中用 `[类型定义问题]` 标注
