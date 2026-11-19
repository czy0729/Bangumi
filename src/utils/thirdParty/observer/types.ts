/*
 * @Author: czy0729
 * @Date: 2026-11-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 15:20:00
 *
 * observer 的类型约定: 只依赖 Reaction 的 track / dispose 与 observable 的「读即订阅」
 */
import type { ComponentType, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react'
import type { Reaction } from 'mobx'

export type AnyComponent = ComponentType<any> | ForwardRefExoticComponent<RefAttributes<any>>

/** 被包裹组件的原始渲染函数, forwardRef 组件走 render, 普通组件直接调用 */
export type RenderFn = (props: any, ref: any) => ReactNode

/**
 * 单个组件实例的全部可变状态
 * - subscribe / getSnapshot / track 在首次创建时确定, 之后渲染只改 props / ref,
 *   所以热路径不产生闭包与临时对象
 * - reaction 为 null 表示当前无订阅 (未挂载, 或 subscribe 的 cleanup 已执行)
 */
export interface IAdm {
  name: string
  render: RenderFn
  reaction: Reaction | null
  /** useSyncExternalStore 对单个组件只订阅一次, 用单引用代替 Set */
  listener: (() => void) | null
  /** 每次 reaction 触发自增, 作为 getSnapshot 的返回值 */
  version: number
  result: ReactNode
  error: unknown
  subscribe: (listener: () => void) => () => void
  getSnapshot: () => number
  /** 本次渲染的 props / ref 由调用方传入, 不经实例字段中转 */
  track: (props: any, ref: any) => void
}
