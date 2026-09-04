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
- **不要在测试文件里局部 mock `@utils/dev`**：jest.setup.js 已按 resolved 路径全局注册完整 mock（含全部导出与 logger 七个方法），相对路径导入同样生效；需要断言日志时直接 `import { logger } from '@utils/dev'` 后对 jest.fn 断言

# hook 测试规范

RNTL 的 `renderHook` 因 `ensure-peer-deps` 严格校验 `react-test-renderer` 与 `react` 版本完全一致而不可用（版本漂移即抛错，依赖安装由用户自理）。hook 测试直接用 `react-test-renderer` 手写最小 harness（参考 `src/components/touchable/__tests__/hooks.test.ts`）：

- `jest.requireActual('react-test-renderer')` 引入（该包无 TS 类型，`requireActual` 返回 any 规避）
- 顶部设 `globalThis.IS_REACT_ACT_ENVIRONMENT = true`，否则 act 内状态更新不生效
- 所有触发 setState 的调用（含 afterEach 里 `jest.runAllTimers()` 执行到的解锁回调）都要包在 act 内
- 依赖 store 的 hook：在 jest.setup.js 的 `@stores` mock 通过 `global.__mockStoreState__` 可变 cell 暴露字段（如 `uiStore.isScrolling`），测试里直接改 cell 控制分支
- 屏蔽 `react-test-renderer is deprecated` 官方告警用定向 `jest.spyOn(console, 'error')` 过滤，保留其余错误输出

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
8. **`@utils` 在 jest 中被 jest.setup.js 虚拟 mock**：mock 只覆盖部分导出，若解析函数用到 `@utils` 中 mock 未提供的工具，需先在 jest.setup.js 补充对应实现（与真实实现保持一致），否则运行时会是 undefined
9. **`cText` / `cEach` / `cPagination` 等解析工具直接复用真实实现**：为避免 mock 与生产代码分叉，jest.setup.js 的 `@utils` mock 通过 `require(__dirname + '/src/utils/thirdParty/html/parse')` 直接复用 `parse.ts` 中抽离的解析函数，不要重复实现

# src/styles 测试规范

参考 `src/styles/__tests__/`。**不要断言字面量**（改源码就要同步改测试，纯噪音），只测不变量/派生关系：亮暗配色成对、Raw 能从源色解析、工具类引用统一 token（`mt.sm.marginTop === sm`）、几何自洽（`wind === floor((width - contentWidth)/2)`）、`tabsHeaderHeight === headerHeight + tabsHeight`、`lineHeight === floor(fontSize * lineHeightRatio)`、默认导出 `_` 覆盖全部命名导出。

注意点：

- **layout/utils 需 mock 环境**：顶部 `jest.mock('@constants/device')` 补全 `PAD`/`RATIO`/`STORYBOOK_*` 等（全局 mock 只有 `WEB`），`expo-constants` 须带 `__esModule: true`；测 `IOS` 分支再 mock `@constants/constants`
- **jest 不支持 `expect(a, msg)` 双参**，用 `expect(cond).toBe(true)`
- **`@styles`（无子路径）不在 moduleNameMapper**，`index.test.ts` 用相对路径 `../index`
