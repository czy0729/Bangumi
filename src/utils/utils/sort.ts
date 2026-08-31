/*
 * @Author: czy0729
 * @Date: 2026-08-31 20:17:27
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-31 20:17:27
 */

/**
 * Compare two strings. This comparison is not linguistically accurate, unlike
 * String.prototype.localeCompare(), albeit stable.
 * @doc https://github.com/grantila/fast-string-compare
 * @returns -1, 0 or 1
 */
export function compare(a: string, b: string) {
  const lenA = a.length
  const lenB = b.length
  const minLen = lenA < lenB ? lenA : lenB
  var i = 0
  for (; i < minLen; ++i) {
    const ca = a.charCodeAt(i)
    const cb = b.charCodeAt(i)

    if (ca > cb) return 1
    else if (ca < cb) return -1
  }
  if (lenA === lenB) return 0
  return lenA > lenB ? 1 : -1
}

/**
 * 正序比较函数, 可接受一个映射函数进行比较
 * - 用于在安卓端开启低版本的 Hermes 后, Array.sort 需要严格区分返回 0 -1 1, 相同返回会出现不稳定的结果
 * @param a 第一个比较项
 * @param b 第二个比较项
 * @param fn 映射函数, 将比较项转换后再进行比较
 * @returns 如果a < b, 则返回 -1; 如果a = b, 则返回 0; 如果a > b, 则返回 1
 */
export function asc(a: number | string, b: number | string): 0 | 1 | -1
export function asc<T, K extends number | string>(a: T, b: T, fn: (item: T) => K): 0 | 1 | -1
export function asc(a: unknown, b: unknown, fn?: (item: unknown) => number | string): 0 | 1 | -1 {
  const _a = typeof fn === 'function' ? fn(a) : a
  const _b = typeof fn === 'function' ? fn(b) : b
  if (typeof _a === 'string' && typeof _b === 'string') return compare(_b, _a)
  if (_a === _b) return 0
  if (_a < _b) return -1
  return 1
}

/**
 * 倒序比较函数, 可接受一个映射函数进行比较
 * @param a 第一个比较项
 * @param b 第二个比较项
 * @param fn 映射函数, 将比较项转换后再进行比较
 * @returns 如果a < b, 则返回 1; 如果a = b, 则返回 0; 如果a > b, 则返回 -1
 */
export function desc(a: number | string, b: number | string): 0 | 1 | -1
export function desc<T, K extends number | string>(a: T, b: T, fn: (item: T) => K): 0 | 1 | -1
export function desc(a: unknown, b: unknown, fn?: (item: unknown) => number | string): 0 | 1 | -1 {
  const _a = typeof fn === 'function' ? fn(a) : a
  const _b = typeof fn === 'function' ? fn(b) : b
  if (typeof _a === 'string' && typeof _b === 'string') return compare(_a, _b)
  if (_a === _b) return 0
  if (_a > _b) return -1
  return 1
}
