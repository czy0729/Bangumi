# 可复用组件（components/）规范

> 页面内私有组件规范见 [screen.md](./screen.md)

## 目录结构

```
component-name/
├── index.tsx       # 主组件（函数组件 + observer()）
├── types.ts        # 类型定义（导出为 Props）
├── styles.ts       # StyleSheet + memoStyles()
├── hooks.ts        # 组件专属 hooks
├── utils.ts        # 工具函数
└── ds.ts           # 调试常量
```

## 关键模式

- 所有组件为**函数组件**，包裹 `observer()`
- Props 类型使用 `WithViewStyles<>`、`WithNavigation<>` 组合
- 样式用 `_.memoStyles()` 缓存（theme-aware）
- 样式合并用 `stl()` 工具函数
- 组件包裹 `<Component id='...'>` 调试壳

## 复合组件（子组件独立文件夹）

当组件拆分出多个子组件时（如 `hold-menu`、`action-sheet`），每个子组件独立成文件夹，文件夹内 `index.tsx` 用 `export default` 导出组件，私有样式放该文件夹的 `styles.ts`，专属逻辑抽成 `useXxx.ts` 自定义 hooks：

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
- 组件内部声明用 `function XComponent(...)`，再 `const X = memo(XComponent)` 导出；仅对外入口组件用 `observer()` 包裹（如 `HoldMenuProvider`）
- 子组件内不写 `r(COMPONENT)` 调试调用；`ds.ts` 在无使用时不导出 `COMPONENT`
- 子组件 Props 类型提取到各自文件夹 `./types.ts`，每个 key 带 `/** ... */` 注释，回调字段放 type 末尾
- 跨组件引用优先 `@components/*` 别名，避免深层相对路径（`../../../`）
- 共享常量/类型/工具仍放组件根目录（`ds.ts`/`types.ts`/`utils.ts`）

## 类型定义规范

- **使用 `type` 而不是 `interface`** 定义 Props
- 导出名称统一为 `Props`
- style 使用 `WithViewStyles` 类型
- children 使用 `PropsWithChildren`
- 示例：
  ```typescript
  // types.ts
  import type { PropsWithChildren } from 'react'
  import type { WithViewStyles } from '@types'

  export type Props = PropsWithChildren<WithViewStyles<{}>>
  ```

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

## ant-design 组件迁移

`src/components/@/ant-design` 已删除，原组件迁移到 `src/components/<name>`，遵循上述目录结构与规范（函数组件 + observer() + reanimated）：

- 纯逻辑抽到 `utils.ts`（如 `normalPercent`、`getUpdatedIndex`、`getPosition`），测试写 `__tests__/utils.test.ts`
- **动画核心组件**独立成目录（如 `modal-view`），负责 Portal、遮罩、进出场动画（`withTiming`/`withSpring`），对外 UI 组件在之上组合（见 `modal/`）
- **动画核心组件的动画逻辑抽 `hooks.ts`**（如 `modal-view/hooks.ts` 的 `useModalAnimation`）：shared values + `scheduleOnRN` 桥接 `onAnimationEnd` 回调、稳定 `useCallback` 引用，JSX 拆 Mask/Content 子组件组合（镜像 `collapsible/hooks.ts`）
- 需要静态 API 的组件用 `api.tsx` 提供命令式入口，通过 `Portal.add` 挂载（见 `action-sheet/api.tsx` 的 `AntmActionSheet`）
- 迁移后由旧路径 `@components/@/ant-design/x` 改为 `@components/x` 引用
- 渲染类测试因环境 `react-test-renderer` 版本漂移不可用，逻辑测试改测纯函数（`__tests__/utils.test.ts`）
