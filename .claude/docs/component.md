# 可复用组件（components/）规范

> 页面内私有组件规范见 [screen.md](./screen.md)

## 目录结构

```
component-name/
├── index.tsx       # 主组件（函数组件 + observer()），只编排 hook 返回值 + 渲染
├── types.ts        # 所有类型定义（Props + hook 参数 + 事件类型 + 内部类型别名）
├── styles.ts       # StyleSheet + memoStyles()
├── hooks.ts        # 组件专属 hooks
├── utils.ts        # 工具函数（纯函数，供逻辑测试）
└── ds.ts           # 常量（调试常量 / 模块级常量）
```

## 关键模式

- 所有组件为**函数组件**，包裹 `observer()`
- Props 类型使用 `WithViewStyles<>`、`WithNavigation<>` 组合
- 样式用 `_.memoStyles()` 缓存（theme-aware）
- 样式合并用 `stl()` 工具函数
- 组件包裹 `<Component id='...'>` 调试壳

## observer 与 memo 的选择

组件级包裹方式取决于组件是否**直接读取可观察值**（store / 主题）：

- **读取可观察值**（如 `systemStore.setting.xxx`、`_` 主题值）→ 包裹 `observer()`。`observer` 内部是「`React.memo` 浅比较 + 可观察值追踪」，能响应 store 变化，是 `memo` 的超集。
- **纯转发 props、不读任何 store** → 包裹 `memo()`。不读取可观察值时 `observer` 退化为纯 `memo` 行为，`memo` 更轻（不引入 mobx 追踪依赖）。

判断标准：组件体（含调用的派生计算）是否出现 `systemStore.*`、`_`、`userStore.*` 等可观察值读取。例如：

- `cover/cover-image` 只把 props 转发给 `Image`/`Squircle`（各自是 `observer`），用 `memo`
- `cover/disc` 读取 `_.radiusSm`，用 `observer`

要点：

- `memo` 浅比较对字符串/数字按**值**比较（稳定生效），对对象按**引用**比较——传内联对象会让任何 memo 失效，样式应传 `styles.xxx` 稳定引用
- 若组件未来可能直接读 store，直接先用 `observer` 亦无性能代价

## 复合组件（子组件独立文件夹）

当组件拆分出多个子组件时（如 `hold-menu`、`scroll-view/mask`），每个子组件独立成文件夹，文件夹内 `index.tsx` 用 `export default` 导出组件，私有样式放该文件夹的 `styles.ts`，专属逻辑抽成 `useXxx.ts` 自定义 hooks：

```
hold-menu/
├── index.tsx           # 入口, 导出默认组件与外部类型
├── context.ts / ds.ts / types.ts / utils.ts   # 共享模块
├── provider/
│   ├── index.tsx           # default export
│   ├── useMenuController.ts
│   └── styles.ts
├── hold-item/
│   ├── index.tsx           # default export
│   ├── useItemAnimation.ts
│   ├── useItemGesture.ts
│   └── styles.ts
├── menu/
│   ├── index.tsx           # default export
│   ├── useMenuAnimation.ts
│   ├── styles.ts
│   └── menu-item/          # 更深层的私有子组件同理
│       └── index.tsx       # default export
└── backdrop/
    ├── index.tsx           # default export
    └── styles.ts
```

- 子组件一律 `export default`，hooks 用具名导出
- 组件直接以真实名称声明 `function X(...)`，末尾 `export default memo(X)` 包裹导出，**不要多包一层**（不做 `function XComponent` + `const X = memo(XComponent)` 的中间命名）；仅对外入口组件用 `observer()` 包裹（如 `HoldMenuProvider`）
- **例外**：子组件若**直接读取可观察值**（`_` 主题值、store 字段），按「observer 与 memo 的选择」规则应改用 `observer()`——如 `scroll-view/mask` 读取 `_.isPad`/`_.wind`/`_._wind` 故用 `observer(Mask)`
- 子组件内不写 `r(COMPONENT)` 调试调用；`ds.ts` 在无使用时不导出 `COMPONENT`
- 子组件 Props 类型提取到各自文件夹 `./types.ts`，每个 key 带 `/** ... */` 注释，回调字段放 type 末尾
- **模块级常量放该文件夹的 `ds.ts`**：非调试用途的常量（如 `GRADIENT_DIRECTION`）也放 `ds.ts`，避免散落在组件体内每次渲染新建对象
- 跨组件引用优先 `@components/*` 别名，避免深层相对路径（`../../../`）
- 共享常量/类型/工具仍放组件根目录（`ds.ts`/`types.ts`/`utils.ts`）

## 类型定义规范

- **使用 `type` 而不是 `interface`** 定义 Props
- 导出名称统一为 `Props`
- style 使用 `WithViewStyles` 类型
- children 使用 `PropsWithChildren`
- **所有类型一律放 `./types.ts`**：Props、hook 参数类型（`useXxxOptions`）、事件类型、内部类型别名都收进 `types.ts`，不写在 hooks.ts / 组件体内
- **优先 `Pick` 上层类型**：下层组件 Props / hook 参数能从上层的 `Props` Pick 就不重复定义（`Pick<Props, 'a' | 'b'>`）；只有语义或必选性不同（如上层可选、本层必填）才保留本地定义
- **共享类型别名抽到最上层**：跨层复用的字面量类型抽具名别名（如 `MaskColors = readonly [string, string, string]`）放根 `types.ts`，逐层 `import type` 复用，不重复字面量
- 每个类型字段带 `/** ... */` 注释，回调字段放 type 末尾
- 示例：
  ```typescript
  // types.ts
  import type { PropsWithChildren } from 'react'
  import type { WithViewStyles } from '@types'

  export type Props = PropsWithChildren<WithViewStyles<{}>>

  /** 遮罩渐变色 [左, 中, 右] */
  export type MaskColors = readonly [string, string, string]

  /** 水平渐隐遮罩参数 */
  export type UseHorizontalMaskOptions = Pick<Props, 'horizontal' | 'showMask'>
  ```

## hooks 规范

- 逻辑优先抽到 `hooks.ts` 自定义 hooks，组件体只做「hook 返回值组合 + 渲染」
- 含 JSX 的 hook 文件用 `.tsx` 扩展名（如 `tabs-v2/hooks.tsx` 的 `useRenderTabBar`），纯逻辑 hooks 用 `.ts`
- 一类状态机 / 一组回调封装一个 hook（如 `useScrollLock`），参数与返回值类型放 `./types.ts`（`useXxxOptions`）
- 对外暴露的回调一律 `useCallback` 稳定引用，按真实依赖声明 deps
- **渲染期不直读 `ref.current`**：ref 在渲染后才赋值，渲染期直读会得到 `null`。需要传给下层组件使用的值应暴露成「调用时懒读取 ref」的稳定函数（如 `useScrollViewRef` 返回 `scrollTo` 而非裸 ref）

## 样式规范

- 无主题依赖的样式用 `_.create()` 创建，导出名称统一为 `styles`，消费端 `import { styles } from './styles'`
- 依赖主题（样式值使用 `_.select()`）才用 `_.memoStyles()` 创建，导出名称统一为 `memoStyles`
- 若 `memoStyles` 内没有任何 computed theme 值（如 `_.select`），会触发 `bangumi/require-computed-in-memo-styles` 警告，应改用 `_.create`
- `memoStyles()` 不是 Hook，可放在组件内任何位置；若有早退分支（如无条件直接 `return` 场景），应放到早退之后，避免无渲染时也生成样式（Hook 如 `useMemo`/`useState` 必须保持在早退之前，遵守 Rules of Hooks）
- 组件内部样式放在组件目录下的 `styles.ts` 中
- 共享样式放在上层目录的 `styles.ts` 中
- 样式数组必须用 `stl()` 包裹：
  ```tsx
  // ❌ 错误
  <Text style={[_.mt.sm, style]}>

  // ✅ 正确
  <Text style={stl(_.mt.sm, style)}>
  ```

## 禁止用 ts 抑制注释掩盖类型错误

- 不使用 `// @ts-ignore` / `@ts-expect-error` 掩盖**可修复**的类型错误，从根因解决
- 例：`LinearGradient.colors` 期望可变的 `string[]`，传入 `readonly` 元组报错时应 `[...colors]` 展开为可变数组，而不是加抑制注释

## ant-design 组件迁移

`src/components/@/ant-design` 已删除，原组件迁移到 `src/components/<name>`，遵循上述目录结构与规范（函数组件 + observer() + reanimated）：

- 纯逻辑抽到 `utils.ts`（如 `normalPercent`、`getUpdatedIndex`、`getPosition`），测试写 `__tests__/utils.test.ts`
- **动画核心组件**独立成目录（如 `modal-view`），负责 Portal、遮罩、进出场动画（`withTiming`/`withSpring`），对外 UI 组件在之上组合（见 `modal/`）
- **动画核心组件的动画逻辑抽 `hooks.ts`**（如 `modal-view/hooks.ts` 的 `useModalAnimation`）：shared values + `scheduleOnRN` 桥接 `onAnimationEnd` 回调、稳定 `useCallback` 引用，JSX 拆 Mask/Content 子组件组合（镜像 `collapsible/hooks.ts`）
- 需要静态 API 的组件用 `api.tsx` 提供命令式入口，通过 `Portal.add` 挂载（见 `action-sheet/api.tsx` 的 `AntmActionSheet`）
- 迁移后由旧路径 `@components/@/ant-design/x` 改为 `@components/x` 引用
- 渲染类测试因环境 `react-test-renderer` 版本漂移不可用，逻辑测试改测纯函数（`__tests__/utils.test.ts`）
