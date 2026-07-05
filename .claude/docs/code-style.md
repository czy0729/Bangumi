# 代码规范

- 一个文件没必要不超过 400 行，超了就拆
- 嵌套没必要不要超过 4 层

# 注释规范

- `/** */` 块注释上面如果有内容（非空白行），必须空一行隔开

# 类型规范

- **不允许使用 `interface`**，统一使用 `type` 定义类型
- 优先查找并复用项目中已有的类型定义，避免重复定义
- 类型定义应放在文件顶部导入语句之后
- 内联类型仅用于简单、一次性使用的场景
- **必须使用 `import type`**：TS 类型直接用 `import type` 引入

# 代码风格（全局）

- 所有组件统一用 `observer()` 包裹，**不使用** `useObserver` 或 `ob`
- 不使用 React.memo / useMemo，依赖 MobX observer() 自动优化
- useCallback 用于稳定引用
- 每个组件/页面通过 `ds.ts` 导出 `COMPONENT` 常量标识自身，子组件用 `rc(PARENT, 'Name')` 生成
- Store 访问：页面通过 hooks 解构 `{ id, $ }`，子组件通过 `useStore<Ctx>(COMPONENT)` 获取
- `StoreContext.Provider` 在页面 index.tsx 中提供，子组件通过 context 消费

# React Native 规范

- **触摸事件必须在同步代码中提取数据**：React Native 的触摸事件（如 `onTouchMove`、`onTouchStart`、`onTouchEnd`）使用合成事件（Synthetic Event），事件对象会被重用和回收。如果在 `requestAnimationFrame`、`setTimeout`、`Promise` 等异步回调中访问 `e.nativeEvent.touches`，事件对象可能已被回收导致 `Cannot read property 'touches' of null` 错误。
  - ✅ 正确：在同步代码中提取所需数据，然后在异步回调中使用提取的数据
  ```typescript
  const handleTouchMove = useCallback((e: any) => {
    const touch = e.nativeEvent?.touches?.[0]
    if (!touch) return
    const { pageX, pageY } = touch  // 同步提取

    requestAnimationFrame(() => {
      // 使用已提取的 pageX, pageY
    })
  }, [])
  ```
  - ❌ 错误：在异步回调中直接访问事件对象
  ```typescript
  const handleTouchMove = useCallback((e: any) => {
    requestAnimationFrame(() => {
      const touch = e.nativeEvent?.touches?.[0]  // 事件可能已被回收
    })
  }, [])
  ```

# MobX 规范

- **禁止在 computed / derivation 中原地修改 observable 数组**：`.sort()`、`.reverse()` 等会 mutates in-place，必须先 `.slice()` 或 `[...arr]` 拷贝后再操作，例如 `arr.slice().sort(...)`
- 同理避免 `.splice()`、`.push()`、`.pop()` 等原地修改 observable 数组的操作
- 如果 `.filter()` / `.map()` 的源是 observable 数组，其返回值已经是新数组，可安全使用 `.sort()`；但如果源是其他 computed 返回值，需先 `.slice()`
- **`computedFn` 统一从 `@utils/computed-fn` 导入**，禁止直接从 `mobx-utils` 导入。项目自定义的 `computedFn` 内部通过 Proxy 自动补齐可选参数，避免原版 DeepMap 因 `arguments.length` 不一致而崩溃（`DeepMap should be used with functions with a consistent length`）
