# 页面（Screen）规范

> 全局风格规则（observer 包裹、`import type`、样式数组 `stl()` 等）见 [code-style.md](./code-style.md)，本文不重复。

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
├── header/             # 页面头部组件（独立目录，不内联在 index.tsx）
│   ├── index.tsx
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

页面和子组件统一使用命名函数声明 + 底部 `export default observer(Xxx)` 导出。

## 子组件 Props 类型规范

子组件 `types.ts` 的 `Props` 按以下优先级编写：

### 1. 能从上层 Pick 则 Pick

结构与父级类型一致或为其子集时，用 `Pick` 派生，不重复声明：

```ts
// grid/list/types.ts
import type { Props as GridProps } from '../types'

export type Props = Pick<GridProps, 'title'>
```

交叉写入的自有 key 单独加注释：

```ts
// empty/types.ts
import type { Props as ListProps } from '../list/types'

export type Props = Pick<ListProps, 'title'> & {
  /** 当前列表条目数 */
  length: number
}
```

### 2. 不能 Pick 则保留手写，key 必须有字段注释

父级为可选字段 / 子级要求必传、或子级接收展平标量等无法 Pick 时，保留手写类型；每个自写 key 都要有 `/** */` 字段注释。**不要**写「为何不 Pick」之类的类型级说明注释：

```ts
import type { SubjectId } from '@types'

export type Props = {
  /** 条目 Id */
  subjectId: SubjectId

  /** 已看集数 */
  epStatus: string | number
}
```

### 3. 格式

首个字段的注释可紧贴 `{`，后续字段的注释与上一个字段之间必须空一行（与全局声明注释规则一致）。

## 页面风格要求

- headerRight 等回调用 `useCallback` 包裹：

```tsx
const handleHeaderRight = useCallback(
  () => <IconHeader name='md-info-outline' onPress={handlePress} />,
  []
)

return <Header title='标题' hm={HM} headerRight={handleHeaderRight} />
```

- 埋点 `t()` 置后：先执行核心业务逻辑（如 alert、导航），后执行 `t()` 埋点调用

## 页面区块（component/xxx/）双组件模式

滚动密集页面（如条目页）的区块采用 Wrap + 内容组件两层结构，配合 React.lazy 分包，是 `observer` 通则的**合法例外**：

```
component/ep/
├── index.tsx     # EpWrap: function + useStore + observer；读 show* 守卫显隐、组装数据、注册 ref
├── ep.lazy.ts    # export default lazy(() => import('./ep')) —— 代码分割
├── ep.tsx        # 内容组件: memo(function Ep(...) {...}, DEFAULT_PROPS, COMPONENT_MAIN)
└── ds.ts         # COMPONENT_MAIN = rc(COMPONENT)、DEFAULT_PROPS(含 FROZEN_FN 兜底)
```

- Wrap 是 store 连接点：早退（模块隐藏）、派生选择逻辑都在这层
- 内容组件保持 **props 驱动 + memo 浅比较**，不接 store；由上层保证 props 引用稳定
- 区块锚点统一用 `component/block-anchor`（`<BlockAnchor title={TITLE_X} onBlockRef={onBlockRef} />`），不要手写 `useCallback` + `<View ref collapsable>` 样板
- 新增区块遵循此模式；不要把内容组件改成 observer 直连 store（会破坏浅比较优化）

## 页面内组件规范（components/）

纯 UI 小组件放 `components/`，不访问 Store（这是它与 `component/` 下子组件的唯一区别）。目录结构、类型定义（`PropsWithChildren<WithViewStyles<{}>>`）、样式（`stl()`）、命名函数 + `export default observer()` 写法均同 [component.md](./component.md)。
