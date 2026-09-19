/*
 * @Author: czy0729
 * @Date: 2026-09-19 07:24:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-19 07:56:31
 */

/** 挑出对象上存在的 key (key 支持数组批量), 语义同 lodash.pick */
export function pick<T extends object>(obj: T, ...keys: (string | string[])[]): Partial<T> {
  const result: Partial<T> = {}
  for (const key of keys.flat()) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key as keyof T] = obj[key as keyof T]
    }
  }
  return result
}

/** 从对象上排除指定 key (key 支持数组批量), 语义同 lodash.omit */
export function omit<T extends object>(obj: T, ...keysToOmit: (string | string[])[]): Partial<T> {
  const keysToOmitSet = new Set(keysToOmit.flat())
  const result: Partial<T> = {}
  for (const key of Object.keys(obj)) {
    if (!keysToOmitSet.has(key)) {
      result[key as keyof T] = obj[key as keyof T]
    }
  }
  return result
}
