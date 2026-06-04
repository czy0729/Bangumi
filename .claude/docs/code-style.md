# 代码规范

- 一个文件没必要不超过 400 行，超了就拆
- 嵌套没必要不要超过 4 层

# 类型规范

- **不允许使用 `interface`**，统一使用 `type` 定义类型
- 优先查找并复用项目中已有的类型定义，避免重复定义
- 类型定义应放在文件顶部导入语句之后
- 内联类型仅用于简单、一次性使用的场景

# 代码风格（全局）

- 所有组件统一用 `observer()` 包裹，**不使用** `useObserver` 或 `ob`
- 不使用 React.memo / useMemo，依赖 MobX observer() 自动优化
- useCallback 用于稳定引用
- 每个组件/页面通过 `ds.ts` 导出 `COMPONENT` 常量标识自身，子组件用 `rc(PARENT, 'Name')` 生成
- Store 访问：页面通过 hooks 解构 `{ id, $ }`，子组件通过 `useStore<Ctx>(COMPONENT)` 获取
- `StoreContext.Provider` 在页面 index.tsx 中提供，子组件通过 context 消费
