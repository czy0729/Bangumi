/*
 * @Author: czy0729
 * @Date: 2026-08-23 13:19:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-23 17:50:48
 */
import type { Loaded } from '@types'

/** Store 状态公共约束, 要求携带 _loaded 标志位 */
export type StoreState = Record<string, unknown> & {
  _loaded?: Loaded
}

/** 宽松的可索引状态结构, 用于运行期动态键读写 */
export type WritableState = Record<string, unknown>

/** Store#fetch 的 stateKey 参数, ['a', 'b'] 表示 this.state.a.b */
export type FetchStateKey<T> = keyof T | [keyof T, string | number]

/** Store#fetch 的本地化等附加配置 */
export type FetchOtherConfig = {
  /** 本地化空间 */
  namespace?: string

  /** 是否本地化 */
  storage?: boolean

  /** 是否把响应的数组转化为 LIST_EMPTY 结构 */
  list?: boolean
}
