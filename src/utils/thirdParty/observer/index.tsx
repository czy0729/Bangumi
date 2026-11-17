/*
 * @Author: czy0729
 * @Date: 2026-11-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-18 01:10:00
 *
 * 自研 observer, 替代 mobx-react / mobx-react-lite 的 observer
 * - 函数组件: render 包进 Reaction.track (./hooks), 订阅用 useSyncExternalStore (React 18 / 19 一致)
 * - class 组件: patch 原型并返回原类 (./class)
 * - 实例状态与订阅见 ./adm, 类型约定见 ./types
 * - 源码侧保持 `import { observer } from 'mobx-react'` 不变, 由 tsconfig paths 别名
 *   (metro.config.js 读取后生成 Metro alias, jest.config.js 的 moduleNameMapper 另配) 指向此处
 */
import { forwardRef, memo } from 'react'
import { observeClassComponent } from './class'
import { useAdm } from './hooks'
import { isClassComponent, isExoticComponent, isForwardRefComponent } from './utils'

import type { AnyComponent, RenderFn } from './types'

/**
 * 观察者 HOC
 * @example export default observer(Component)
 */
export function observer<T extends AnyComponent>(component: T): T {
  if (!component) return component

  // memo / lazy 是对象, 直接调用会在渲染期抛 TypeError 且栈全在 React 内部, 这里提前给出可定位的错误
  if (isExoticComponent(component)) {
    throw new Error(
      '[observer] 不支持 memo / lazy 包裹的组件: memo 已由 observer 内部处理, 组件需要 ref 请用 observer(forwardRef(...))'
    )
  }

  // class 直接改原型, 不产生新组件
  if (isClassComponent(component)) return observeClassComponent(component)

  const name = (component as any).displayName || (component as any).name || 'Observer'
  const asForwardRef = isForwardRefComponent(component)

  // 每处 observer() 调用只走一次, 这里的闭包不参与渲染热路径
  const render: RenderFn = asForwardRef
    ? (props, ref) => (component as any).render(props, ref)
    : props => (component as any)(props)

  // 只有本来就是 forwardRef 的组件才再包一层:
  // 普通函数组件包上 forwardRef 会多走一次 React 的 ForwardRef 解析分支, 无收益
  const Component = asForwardRef
    ? forwardRef(function ObserverForwardRefComponent(props: any, ref: any) {
        return useAdm(name, render, props, ref) as any
      })
    : function ObserverComponent(props: any) {
        return useAdm(name, render, props, null) as any
      }
  ;(Component as any).displayName = name

  // memo 的收益是跳过整次渲染 (含 track 的依赖收集), 是这套实现里最大的单点收益
  const Wrapped = memo(Component as any)
  Wrapped.displayName = `observer(${name})`
  return Wrapped as unknown as T
}

export default observer
