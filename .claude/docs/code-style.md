# 代码规范

- 一个文件没必要不超过 400 行，超了就拆
- 嵌套没必要不要超过 4 层

# 提交描述规范

- 格式为 `- [功能块] xxx`（功能块如 文档 / 组件 / 重构 / 依赖 / 词云 等，取自最近提交惯例）
- 尽量简洁，用自然语言概括改动本身，不关心代码层面细节

# 注释规范

- **文件头注释框：元信息之后空一行写文件职责描述**，描述紧贴 `*/` 收尾，可多行（续行与首行对齐）。新建文件一律带上；存量文件未带的不必回填，编辑该文件时顺手补即可。先例见 `src/utils/protobuf/index.ts`：
  ```typescript
  /*
   * @Author: czy0729
   * @Date: 2023-12-07 21:42:04
   * @Last Modified by: czy0729
   * @Last Modified time: 2026-08-30 07:30:00
   *
   * native 端入口: 资源加载 (assets.ts) + 缓存去重 (cache.ts) + 解码 (decoder.ts)
   */
  ```
- `/** */` 块注释上面如果有内容（非空白行），必须空一行隔开
- 类型定义中，每个属性的 `/** */` 注释前也需要空一行，仅首个属性（上方为 `{`）可紧贴；**联合类型逐成员注释同理，成员的 `/** */` 注释上方必须空一行**（成员较多或注释较长时，优先用类型头部 `/** */` 破折号列表描述各成员）
- **hooks 返回对象时，每个 key 都必须加 `/** */` 注释**（返回 `as const` 或条件提前返回的对象同样适用）
- **函数参数说明写在函数头 JSDoc 的 `@param name 说明` 中（不带类型标注，类型由 TS 提供）**，不在签名内联给参数写 `/** */`。先例见 `constants/api/tinygrail.ts`：
  ```typescript
  /**
   * 创建冰山委托
   *
   * @param monoId 条目 Id
   */
  export const iceberg = (monoId: MonoId) => {}
  ```

# 类型规范

- **不允许使用 `interface`**，统一使用 `type` 定义类型
- 优先查找并复用项目中已有的类型定义，避免重复定义
- 类型定义应放在文件顶部导入语句之后
- 内联类型仅用于简单、一次性使用的场景
- **必须使用 `import type`**：TS 类型直接用 `import type` 引入
- **样式与路由类型优先从 `@types` 引入**，不要直接从 `react-native` 引：
  - `ViewStyle` / `TextStyle` = `@types` 中的宽口径别名（`StyleProp<RNViewStyle>` 等），RN 原生窄型仅在 reanimated 的 `AnimatedStyle<T>` 等需要具体对象型的场景使用（可别名引入，如 `ViewStyle as RNViewStyle`）
  - 组件 `style?: ViewStyle` 用 `WithViewStyles<>` 组合；带导航参数的组件用 `WithNavigation<>`
  - children 一律用 React 的 `PropsWithChildren<>`
- **遗留类型 `Fn` 与 `AnyObject` 已从 `@types` 移除**（2026-09 清理）：禁止再使用，回调一律写具体签名（如 `() => void`、`(res?: unknown) => void`、复用 `TouchableHandlePress`），动态数据袋用 `Record<string, any>` 等内联结构

# 代码风格（全局）

- 所有组件统一用 `observer()` 包裹，**不使用** `useObserver` 或 `ob`
- 性能优化推荐依赖 MobX observer() 自动追踪，默认不手写 React.memo / useMemo
  - store 派生数据每次渲染直接计算即可，useMemo 缓存 store 派生值可能滞留旧数据（原因见 component.md「observer 组件内不要用 useMemo 缓存 store 派生数据」）
  - **例外**：滚动密集页面的区块内容组件（见 screen.md「页面区块双组件模式」）使用项目封装的 `memo(props, DEFAULT_PROPS, COMPONENT_MAIN)` + props 驱动；此类组件内部的 useMemo 若服务于稳定引用可保留
- useCallback 用于稳定引用
- **`use*` 函数禁止在条件提前返回之后调用**：`if (...) return null` 之后不要再调用任何 `use*` 函数（含纯函数），避免日后函数内引入真实 hook 时触发 Rules of Hooks 崩溃。提前返回应放在所有 `use*` 调用之后
- 每个组件/页面通过 `ds.ts` 导出 `COMPONENT` 常量标识自身，子组件用 `rc(PARENT, 'Name')` 生成
- Store 访问：页面通过 hooks 解构 `{ id, $ }`，子组件通过 `useStore<Ctx>(COMPONENT)` 获取
- `StoreContext.Provider` 在页面 index.tsx 中提供，子组件通过 context 消费

# React Native 规范

- **触摸事件必须在同步代码中提取数据**：RN 触摸事件（`onTouchMove` 等）的合成事件对象会被重用回收，在 `requestAnimationFrame` / `setTimeout` / `Promise` 等异步回调中访问 `e.nativeEvent.touches` 会得到 `null`。先同步提取，再进异步回调：
  ```typescript
  const handleTouchMove = useCallback((e: any) => {
    const touch = e.nativeEvent?.touches?.[0]
    if (!touch) return
    const { pageX, pageY } = touch  // 同步提取

    requestAnimationFrame(() => {
      // 使用已提取的 pageX, pageY（此处再读 e.nativeEvent 已被回收）
    })
  }, [])
  ```

# MobX 规范

- **MobX store 属性若作为 hooks 依赖，必须先解构**：`systemStore.setting.xxx` 需要进入 `useMemo` / `useEffect` / `useCallback` 的依赖数组时，先在组件顶层解构为局部变量再使用，不要在依赖数组中内联 `systemStore.setting.xxx`：
  ```typescript
  const { s2t: s2tEnabled } = systemStore.setting
  const labels = useMemo(() => ..., [action, s2tEnabled])
  ```
- 解构命名需避开已导入的符号：如 `s2t` 是导入的转换函数，设置项解构时应重命名为 `s2tEnabled`，避免遮蔽
- **禁止在 computed / derivation 中原地修改 observable 数组**：`.sort()`、`.reverse()` 等会 mutates in-place，必须先 `.slice()` 或 `[...arr]` 拷贝后再操作，例如 `arr.slice().sort(...)`
- 同理避免 `.splice()`、`.push()`、`.pop()` 等原地修改 observable 数组的操作
- 如果 `.filter()` / `.map()` 的源是 observable 数组，其返回值已经是新数组，可安全使用 `.sort()`；但如果源是其他 computed 返回值，需先 `.slice()`
- **`computedFn` 统一从 `@utils/computed-fn` 导入**，禁止直接从 `mobx-utils` 导入。项目自定义的 `computedFn` 内部通过 Proxy 自动补齐可选参数，避免原版 DeepMap 因 `arguments.length` 不一致而崩溃（`DeepMap should be used with functions with a consistent length`）
