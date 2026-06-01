# 可复用组件（components/）规范

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

## 类型定义规范

- **使用 `type` 而不是 `interface`** 定义 Props
- 导出名称统一为 `Props`
- 示例：
  ```typescript
  // types.ts
  export type Props = {
    title: string
    onPress: () => void
  }
  ```

## 样式规范

- 样式使用 `_.create()` 创建
- 导出名称统一为 `styles`
- 组件内部样式放在组件目录下的 `styles.ts` 中
- 共享样式放在上层目录的 `styles.ts` 中
