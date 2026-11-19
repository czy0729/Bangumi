/*
 * @Author: czy0729
 * @Date: 2026-11-18 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 15:20:00
 *
 * toJS: 递归转换 observable 容器, 非 observable 原样返回引用
 *  - box 解包; 循环 / 共享子引用结果复用
 *  - 对齐 mobx v6.12.3 的 toJSHelper, 对拍见 __tests__/to-js.test.ts
 */
import { getSelfAdmin } from './observable'

/**
 * 递归转换 observable 为普通对象
 * @param source 任意值
 * @param options 官方 v6 起已移除, DEV 下传入会抛错 (与官方 die 行为一致)
 */
export function toJS<T>(source: T, options?: object): T {
  if (process.env.NODE_ENV !== 'production' && options) {
    throw new Error('[mobx] toJS no longer supports options')
  }
  return toJSHelper(source, new Map()) as T
}

function toJSHelper(source: unknown, seen: Map<unknown, unknown>): unknown {
  if (source == null || typeof source !== 'object' || source instanceof Date) {
    return source
  }

  const admin = getSelfAdmin(source)
  if (!admin) {
    return source
  }

  // box: 解包取值后递归 (官方 isObservableValue 同款)
  if (admin.kind === 'box') {
    return toJSHelper((source as { get(): unknown }).get(), seen)
  }

  // 循环引用与共享子引用: 转换结果复用 (官方 detectCycles 行为)
  if (seen.has(source)) {
    return seen.get(source)
  }

  if (admin.kind === 'array') {
    const arr = admin.target
    const res = new Array<unknown>(arr.length)
    seen.set(source, res)
    for (let i = 0; i < arr.length; i++) {
      res[i] = toJSHelper(arr[i], seen)
    }
    return res
  }

  // observable object: 直接枚举 admin.target (绕过 proxy 陷阱); 字符串键 + 后置挂载的 symbol 键
  const target = admin.target as Record<PropertyKey, unknown>
  const res = {} as Record<PropertyKey, unknown>
  seen.set(source, res)
  ;(Object.keys(target) as PropertyKey[])
    .concat(Object.getOwnPropertySymbols(target))
    .forEach(key => {
      if (Object.prototype.propertyIsEnumerable.call(target, key)) {
        res[key] = toJSHelper(target[key], seen)
      }
    })
  return res
}
