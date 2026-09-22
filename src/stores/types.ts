/*
 * @Author: czy0729
 * @Date: 2026-09-22 09:12:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-22 09:12:00
 */
import type { Navigation, Override } from '@types'

/** 页面状态机上下文 */
export type Context<T> = {
  id: string
  $: T & {
    params?: unknown
  }
  navigation: Navigation
}

/** useStore 返回的状态机上下文 */
export type StoreContextValue<T> = Override<T, { id: string }>
