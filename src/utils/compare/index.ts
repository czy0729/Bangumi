/*
 * @Author: czy0729
 * @Date: 2026-09-02 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 10:00:00
 *
 * compare — hasOwn / isPlainObject / deepEqual / plainClone
 */

export const hasOwn = Object.prototype.hasOwnProperty
const toStringTag = Object.prototype.toString

/** 是否为普通对象(原型为 Object.prototype 或 null), 用于区分 Date 等特殊引用类型 */
export const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (value === null || typeof value !== 'object') return false
  const proto = Reflect.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

/**
 * 深比较两个值是否相等 (SameValueZero 语义)
 * 处理 plain object / array / primitive / Date / RegExp
 * Map / Set / TypedArray / 类实例等特殊引用回退 === 比较; 循环引用按祖先栈检测, 互指位置视为相等
 * 性能关键路径: 首行 === 快速路径 + 类型前置拦截 + 长度/数量预检 + 逐项短路
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true

  if (a === null || b === null || a === undefined || b === undefined) return a === b
  if (typeof a !== 'object' || typeof b !== 'object') return a !== a && b !== b

  const stackA: object[] = [a]
  const stackB: object[] = [b]
  return equalNode(a as object, b as object, stackA, stackB)
}

/** 递归子项比较: 前置拦截 + 循环引用检测 (a 的祖先位与 b 的祖先位互指视为相等) */
function equalChild(a: unknown, b: unknown, stackA: object[], stackB: object[]): boolean {
  if (a === b) return true

  if (a === null || b === null || a === undefined || b === undefined) return a === b
  if (typeof a !== 'object' || typeof b !== 'object') return a !== a && b !== b

  const index = stackA.indexOf(a)
  if (index !== -1) return stackB[index] === b

  stackA.push(a)
  stackB.push(b)
  const result = equalNode(a, b, stackA, stackB)
  stackA.pop()
  stackB.pop()
  return result
}

/** object / array 逐项比较, 祖先栈由调用方维护 */
function equalNode(a: object, b: object, stackA: object[], stackB: object[]): boolean {
  const aIsArr = Array.isArray(a)
  const bIsArr = Array.isArray(b)
  if (aIsArr !== bIsArr) return false

  if (aIsArr) {
    const aa = a as unknown[]
    const ab = b as unknown[]
    if (aa.length !== ab.length) return false
    for (let i = 0; i < aa.length; i++) {
      if (aa[i] === ab[i]) continue
      if (!equalChild(aa[i], ab[i], stackA, stackB)) return false
    }
    return true
  }

  if (!isPlainObject(a) || !isPlainObject(b)) return equalSpecial(a, b)

  const oa = a as Record<string, unknown>
  const ob = b as Record<string, unknown>
  let countA = 0
  for (const key in oa) {
    if (!hasOwn.call(oa, key)) continue
    countA++
    if (!hasOwn.call(ob, key)) return false
    if (oa[key] === ob[key]) continue
    if (!equalChild(oa[key], ob[key], stackA, stackB)) return false
  }
  let countB = 0
  for (const key in ob) {
    if (hasOwn.call(ob, key)) countB++
  }
  return countA === countB
}

/** 非普通对象按值比较: 同类型 Date / RegExp 逐值比较, 其余类型回退引用比较 */
function equalSpecial(a: object, b: object): boolean {
  const tag = toStringTag.call(a)
  if (tag !== toStringTag.call(b)) return false
  if (tag === '[object Date]') {
    const ta = (a as Date).getTime()
    const tb = (b as Date).getTime()
    return ta === tb || (ta !== ta && tb !== tb)
  }
  if (tag === '[object RegExp]') return String(a) === String(b)
  return a === b
}

/**
 * 深拷贝 JSON 形状的纯数据 (数组/普通对象递归克隆)
 * 原始值与 Date 等特殊引用类型原样返回
 * 用于浅响应入库数据的 toJS 出口, 保证返回独立副本
 */
export function plainClone<T>(value: T): T {
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
