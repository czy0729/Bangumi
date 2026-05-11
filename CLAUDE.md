# Bangumi32

bgm.tv (Bangumi) 第三方客户端，React Native (Expo SDK 54) 项目。作者: czy0729

## 通用

- 优先选择编辑而非重写整个文件
- 除非文件被编辑过，否则不要重复阅读已读过的文件
- 输出追求简洁，但推理过程必须详尽

## 代码规范

- 一个文件没必要不超过 400 行，超了就拆
- 嵌套没必要不要超过 4 层

## Token 预算规则

### 禁止读取的路径（文件过大，浪费 tokens）

- `src/assets/json/` — 所有 JSON 数据文件（mono.json、vib.json、substrings/_、typerank/_）
- `src/assets/` — 图片、字体等二进制资源（39M+）
- `dist/`、`node_modules/`、`metro-cache/`
- `web/test/*.json` — 测试数据
- 任何超过 50KB 的 `.json` 文件

### 替代方案

- 用 grep/find 查找 JSON key 或资源在代码中的引用
- 通过读取 import 语句了解数据结构，而非直接读数据文件
- 如确需了解 JSON 结构，只用 Read 工具的 `limit` 参数读前 20 行

## 代码风格（全局）

- 所有组件统一用 `observer()` 包裹，**不使用** `useObserver` 或 `ob`
- 不使用 React.memo / useMemo，依赖 MobX observer() 自动优化
- useCallback 用于稳定引用
- 每个组件/页面通过 `ds.ts` 导出 `COMPONENT` 常量标识自身，子组件用 `rc(PARENT, 'Name')` 生成
- Store 访问：页面通过 hooks 解构 `{ id, $ }`，子组件通过 `useStore<Ctx>(COMPONENT)` 获取
- `StoreContext.Provider` 在页面 index.tsx 中提供，子组件通过 context 消费

## 详细规范（按需读取）

> 触发对应业务时读取对应文件，不要一次性全部加载。

| 场景                                       | 文档                                                         |
| ------------------------------------------ | ------------------------------------------------------------ |
| 了解项目结构、技术栈、路径别名、导航、构建 | [.claude/docs/architecture.md](.claude/docs/architecture.md) |
| 新建/修改页面（Screen）                    | [.claude/docs/screen.md](.claude/docs/screen.md)             |
| 查找/定位某个页面                          | [.claude/docs/screens.md](.claude/docs/screens.md)           |
| 新建/修改可复用组件（components/）         | [.claude/docs/component.md](.claude/docs/component.md)       |
| 新建/修改 MobX Store                       | [.claude/docs/store.md](.claude/docs/store.md)               |
| API 请求相关                               | [.claude/docs/api.md](.claude/docs/api.md)                   |

## 文档维护

当以下情况发生时，主动更新 `.claude/docs/` 中对应的文档：

- 新增或重构了页面模板/约定 → 更新 `screen.md`
- 新增/删除/重命名了页面 → 更新 `screens.md`
- 新增或重构了可复用组件模式 → 更新 `component.md`
- Store 继承链或文件结构变化 → 更新 `store.md`
- API 请求方式或常量位置变化 → 更新 `api.md`
- 新增路径别名、导航结构变化、技术栈升级 → 更新 `architecture.md`
- 发现代码风格约定与文档不符 → 更新 CLAUDE.md 对应段落

原则：改了什么就更新什么，不要等用户提醒。
