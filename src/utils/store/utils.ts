/*
 * Store 纯函数集 (base / legacy / index 共用)
 * @Author: czy0729
 * @Date: 2026-08-23 13:18:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-23 17:50:51
 */
import { extendObservable, isObservable, isObservableArray, observable, remove } from 'mobx'
import { LIST_EMPTY } from '@constants/constants'
import { getTimestamp } from '../utils'

import type { DeepPartial, ListEmpty } from '@types'
import type { FetchAPIArgs } from '../fetch/types'
import type { WritableState } from './types'

const hasOwn = Object.prototype.hasOwnProperty

/** 是否为普通对象(原型为 Object.prototype 或 null), 用于区分 Date 等特殊引用类型 */
const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== 'object') return false
  // Object.getPrototypeOf 签名为 (o: any) => any, 改用类型正确的 Reflect 版本
  const proto = Reflect.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

/**
 * 将一份增量状态合并进 observable 目标对象
 * - 目标不存在的属性收集后通过 extendObservable 批量注册
 * - 基本类型引用不同时直接赋值
 * - 数组在 observable 数组上原地 replace, 否则整体替换
 * - 对象与目标属性逐键对比, 仅写入变化的子属性
 */
export function applyStateDiff<T extends object>(
  observerTarget: WritableState,
  state: DeepPartial<T>
) {
  // 第一次遍历：收集新属性和待更新项
  const newProps: WritableState = {}
  const updates: {
    key: string
    item: unknown
  }[] = []

  for (const key in state) {
    if (hasOwn.call(state, key)) {
      const item = state[key]
      if (!(key in observerTarget)) {
        newProps[key] = item
      } else {
        updates.push({ key, item })
      }
    }
  }

  // 批量添加新属性
  if (Object.keys(newProps).length > 0) {
    extendObservable(observerTarget, newProps)
  }

  // 第二次遍历：处理更新
  for (const { key, item } of updates) {
    const current = observerTarget[key]

    // 基本类型或 null：直接比较并赋值
    if (item === null || typeof item !== 'object') {
      if (current === item) continue

      observerTarget[key] = item
      continue
    }

    // 数组处理
    if (Array.isArray(item)) {
      if (current === item) continue
      if (isObservableArray(current)) {
        current.replace(item)
      } else {
        observerTarget[key] = item
      }
      continue
    }

    // 对象处理: 仅对可观测容器做逐键增量合并(写入才可被追踪);
    // 浅响应入库的原始对象不可追踪, 整体替换以恢复通知能力(入库数据不可变纪律)
    if (current === item) continue

    const mergeable =
      current !== null &&
      typeof current === 'object' &&
      !Array.isArray(current) &&
      isObservable(current)

    if (mergeable) {
      // 增量合并属性，仅更新变化的属性
      const nextObj = item as WritableState
      const currentObj = current as WritableState
      for (const subKey in nextObj) {
        if (hasOwn.call(nextObj, subKey)) {
          const nextVal = nextObj[subKey]
          if (currentObj[subKey] !== nextVal) currentObj[subKey] = nextVal
        }
      }
    } else {
      // 当前值非对象或不可观测，直接替换
      observerTarget[key] = item
    }
  }
}

/**
 * 深拷贝 JSON 形状的纯数据 (数组/普通对象递归克隆)
 * 原始值与 Date 等特殊引用类型原样返回
 * 用于浅响应入库数据的 toJS 出口, 保证返回独立副本
 */
export function plainClone<T>(value: T): T {
  // 内部统一以 unknown 视角处理:
  // Array.isArray 会把泛型/unknown 收窄成 any[], 若直接遍历会使元素变成 any
  const clone = (input: unknown): unknown => {
    if (Array.isArray(input)) {
      const list: unknown[] = input
      return list.map(element => clone(element))
    }

    if (isPlainObject(input)) {
      const result: Record<string, unknown> = {}
      for (const key in input) {
        if (hasOwn.call(input, key)) {
          result[key] = clone(input[key])
        }
      }
      return result
    }

    return input
  }

  return clone(value) as T
}

/**
 * 归一化请求配置, 兼容直接传 url 字符串的旧用法
 */
export function normalizeFetchConfig(fetchConfig: FetchAPIArgs | string): FetchAPIArgs {
  if (typeof fetchConfig === 'object') {
    return {
      ...fetchConfig
    }
  }

  return {
    url: fetchConfig
  }
}

/**
 * 将接口响应转化为可入库结构
 * - 数组且开启列表模式时包裹为统一 ListEmpty 结构
 * - 统一附加 _loaded 时间戳
 */
export function buildMergeData<T extends object>(data: T, list?: boolean): T | ListEmpty {
  if (Array.isArray(data)) {
    if (list) {
      return {
        ...LIST_EMPTY,
        list: data,
        _loaded: getTimestamp()
      }
    }

    return data
  }

  return {
    ...data,
    _loaded: getTimestamp()
  }
}

/**
 * 以 observable.ref 注解注册/重写状态键 (浅响应入库核心)
 * - 该键当前及后续赋值均不再深度代理, 大体积接口数据零代理开销
 * - 需在 action 内调用: 移除+新增会被批量合并, 观察者只收到一次最终通知
 */
export function ingestRef(state: WritableState, key: string, value: unknown) {
  if (hasOwn.call(state, key)) {
    remove(state, key)
  }

  extendObservable(state, { [key]: value }, { [key]: observable.ref })
}

/**
 * 组装本地缓存完整键名: `[namespace][|key]|state`
 * namespace 为空时延续历史行为, 生成 "undefined|state"
 */
export function buildStorageKey(namespace: string | undefined, key?: string) {
  let _key = namespace
  if (key) _key += `|${key}`
  _key += '|state'
  return _key
}
