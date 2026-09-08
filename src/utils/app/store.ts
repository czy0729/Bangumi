/*
 * @Author: czy0729
 * @Date: 2026-09-08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-08
 *
 * 列表与状态辅助（guessTotalCount、visibleBottom 节流、isArray/freeze、请求节流, 拆分自 data-source.ts）
 */
import { isObservableArray } from 'mobx'
import { DEV, FROZEN_ARRAY, FROZEN_OBJECT } from '@constants'
import { logger } from '../dev'
import { getTimestamp } from '../utils'
import { HEIGHT } from './ds'

import type { ListEmpty, Loaded, ReadonlyResult, ScrollEvent } from '@types'

/** 猜测数据中大概有多少项 */
export function guessTotalCount(list: ListEmpty, limit: number = 10) {
  if (!list?._loaded || !list?.list?.length || typeof list?.pagination?.pageTotal !== 'number') {
    return 0
  }

  if (list.pagination.pageTotal <= 1) return list.list.length

  return list.pagination.pageTotal * limit
}

/**
 * updateVisibleBottom 的 this 约束: 具备 visibleBottom 状态与 setState 的 store 实例
 * - setState 用方法简写声明, 走双变以兼容各 store 的 DeepPartial<T> 签名, bind 调用点无需改动
 * - __lastVisibleBottomUpdate 为运行时挂在实例上的节流时间戳, 非 store 基类成员
 */
export type VisibleBottomHost = {
  // 部分 store 的初值为 false (如 home/mono), 故一并接受
  state: { visibleBottom?: number | false }
  setState(state: object, stateKey?: string): void
  __lastVisibleBottomUpdate?: number
}

/** 统一更新控制页面懒渲染 visibleBottom 变量的函数 */
export function updateVisibleBottom(this: VisibleBottomHost, { nativeEvent }: ScrollEvent) {
  if (typeof this.setState !== 'function') return

  const now = Date.now()
  if (this.__lastVisibleBottomUpdate && now - this.__lastVisibleBottomUpdate < 32) return

  const { contentOffset, layoutMeasurement } = nativeEvent
  const visibleBottom = contentOffset.y + layoutMeasurement.height
  if (visibleBottom <= (this.state.visibleBottom || 0)) return

  this.setState({
    visibleBottom: Math.floor(visibleBottom + HEIGHT * 0.5)
  })
  this.__lastVisibleBottomUpdate = now
}

/**
 * 是否数组, 若为 mobx 观察的数组使用原生方法是判断不出来的
 * - 用 T & unknown[] 而非 unknown[]: 保留实参原有类型信息, 收窄后下游仍按原类型使用
 */
export function isArray<T>(value: T): value is T & unknown[] {
  if (!value) return false

  return Array.isArray(value) || isObservableArray(value)
}

/** 推荐在 mobx.computed 里面包裹返回值, 防止返回不同空对象导致触发重渲染 */
export function freeze<T>(arg: T) {
  let value: T
  if (typeof arg === 'function') {
    value = (arg as () => T)() as T
  } else {
    value = arg
  }

  if (value) {
    if (isArray(value) && !value.length) {
      return FROZEN_ARRAY as ReadonlyResult<T>
    }

    if (typeof value === 'object' && Object.keys(value).length === 0) {
      return FROZEN_OBJECT as ReadonlyResult<T>
    }
  }

  return value as ReadonlyResult<T>
}

/**
 * 简单控制请求频率工具函数, 若不需要发请求返回 true
 * @param data 带 _loaded 的任意状态分片 (各 store 结构不一, 故按 unknown 收窄而非声明具体类型)
 * @param s 节流间隔（秒）
 */
export function optimize(data: unknown, s: number = 60): boolean {
  if (DEV || typeof data !== 'object' || data === null) return false

  const { _loaded } = data as { _loaded?: Loaded }
  if (!_loaded) return false

  const diff = getTimestamp() - Number(_loaded || 0)
  const isPrevent = diff < s
  if (isPrevent) {
    logger.warn('@utils/app', 'optimize', diff, s, Object.keys(data).slice(0, 5))
  }

  return isPrevent
}
