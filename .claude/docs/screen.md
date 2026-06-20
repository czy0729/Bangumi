# 页面（Screen）规范

## 目录结构

```
screen-name/
├── index.tsx           # 页面组件
├── types.ts            # Ctx / Params 类型
├── hooks.ts            # useXxxPage() 初始化 hook
├── ds.ts               # COMPONENT 名称常量
├── store/
│   ├── index.ts        # ScreenXxx 类（extends Action），定义 init() / unmount()
│   ├── state.ts        # State extends Store<typeof STATE>，observable(STATE)
│   ├── computed.ts     # Computed extends State，@computed get
│   ├── fetch.ts        # Fetch extends Computed，异步请求
│   ├── action.ts       # Action extends Fetch，业务逻辑
│   └── ds.ts           # NAMESPACE / RESET_STATE / EXCLUDE_STATE / STATE
├── header/
│   ├── index.tsx       # 页面头部组件
│   ├── ds.ts
│   └── styles.ts
├── component/          # 页面私有子组件（访问 Store）
│   └── xxx/
│       ├── index.tsx
│       ├── ds.ts
│       └── styles.ts
└── components/         # 页面内纯 UI 小组件（不访问 Store）
    └── yyy/
        ├── index.tsx
        ├── types.ts
        └── styles.ts   # 可选，无样式时省略
```

## types.ts

```ts
import { GetRouteParams, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>
export type Params = GetRouteParams<RouteXxx>
```

## hooks.ts

```ts
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import Store from './store'
import { Ctx } from './types'

export function useXxxPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context
  usePageLifecycle(
    {
      onEnterComplete() {
        $.init()
      },
      onLeaveComplete() {
        $.unmount()
      }
    },
    id
  )
  return context
}
```

## index.tsx

```ts
import React from 'react'
import { observer } from 'mobx-react'
import { Component, StoreContext } from '@stores'
import { useXxxPage } from './hooks'

/** 页面描述 */
function ScreenXxx(props: NavigationProps) {
  const { id, $ } = useXxxPage(props)
  return (
    <Component id='screen-xxx'>
      <StoreContext.Provider value={id}>
        <Page />
        <Header />
      </StoreContext.Provider>
    </Component>
  )
}

export default observer(ScreenXxx)
```

## store/ds.ts

```ts
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}`
export const RESET_STATE = { ... }
export const EXCLUDE_STATE = { ... }  // 瞬态，不持久化
export const STATE = { ...RESET_STATE, ...EXCLUDE_STATE, _loaded: false as Loaded }
```

## Store 继承链

```
State → Computed → Fetch → Action → ScreenXxx
```

每个文件只做一件事：state.ts 声明 observable 状态，computed.ts 做派生，fetch.ts 请求数据，action.ts 处理用户操作，index.ts 定义 init()/unmount()。

## 子组件访问 Store

```ts
import React from 'react'
import { observer } from 'mobx-react'
import { rc } from '@utils/dev'
import { useStore } from '@stores'
import { COMPONENT as PARENT } from '../ds'
import { Ctx } from '../types'

export const COMPONENT = rc(PARENT, 'Info')

/** 组件描述 */
function Info() {
  const { $ } = useStore<Ctx>(COMPONENT)
  return (
    // JSX
  )
}

export default observer(Info)
```

所有组件统一用 `observer()` 包裹，不使用 `useObserver` 或 `ob`。

> 页面和子组件统一使用命名函数 + 底部导出 `export default observer(Xxx)` 的分体写法。

## 代码风格要求

1. **必须使用 `function` 声明**：页面组件和子组件必须使用 `function` 关键字声明，不要使用箭头函数 `const Xxx = () => {}`
2. **必须使用 `observer`**：页面组件必须使用 `observer()` 包裹导出，不要使用 `useObserver` hook 和旧封装的 `ob`
3. **必须使用 `import type`**：仅用于类型的位置必须使用 `import type { ... }` 语法
4. **header 组件独立**：页面头部（TinygrailHeader / Header）应独立放在 `header/` 目录，不要内联在 index.tsx 中
5. **回调使用 `useCallback`**：headerRight 必须用 `useCallback` 包裹

```tsx
const handleHeaderRight = useCallback(
  () => <IconHeader name='md-info-outline' onPress={handlePress} />,
  []
)

return <Header title='标题' hm={HM} headerRight={handleHeaderRight} />
```
6. **埋点 `t()` 置后**：先执行核心业务逻辑（如 alert、导航），后执行 `t()` 埋点调用
7. **页面子组件放 `component/` 目录**：除 header 外的页面私有子组件必须放在 `component/` 目录下，不要与页面根目录平级

## 页面内组件规范（components/）

页面内纯 UI 小组件放在 `components/` 目录，不访问 Store：

```
components/
└── collapse/
    ├── index.tsx
    ├── types.ts
    └── styles.ts   # 可选
```

### 类型定义

使用 `WithViewStyles` 和 `PropsWithChildren`：

```ts
// types.ts
import type { PropsWithChildren } from 'react'
import type { WithViewStyles } from '@types'

export type Props = PropsWithChildren<WithViewStyles<{}>>
```

### 样式数组

使用 `stl()` 包裹样式数组（处理 falsy 值）：

```tsx
import { stl } from '@utils'

// ❌ 错误
<Text style={[_.mt.sm, style]}>

// ✅ 正确
<Text style={stl(_.mt.sm, style)}>
```

### 组件写法

使用命名函数 + 底部 `export default observer()` 导出：

```tsx
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'

import type { Props } from './types'

/** 组件描述 */
function Xxx({ style, children }: Props) {
  return (
    <Text style={stl(_.mt.sm, style)} size={14} lineHeight={18}>
      {children}
    </Text>
  )
}

export default observer(Xxx)
```
