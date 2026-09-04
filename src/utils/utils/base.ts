/*
 * @Author: czy0729
 * @Date: 2026-08-31 20:16:48
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-31 20:16:48
 */

/** 补零 */
export function pad(n: string | number): string {
  return +n < 10 ? `0${n}` : `${n}`
}

/** 安全对象 (用于把请求中的 null 换成 undefined, 减少 ?. 语法出错) */
export function safeObject<T extends Record<string, unknown>>(object: T = {} as T): T {
  return Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, value === null ? undefined : value])
  ) as T
}

/** 首字母大写 */
export function titleCase<S extends string>(str: S): Capitalize<S> {
  const [first = '', ...rest] = String(str || '')
  return `${first.toUpperCase()}${rest.join('')}` as Capitalize<S>
}

/** 去掉头尾空格 */
export function trim(str: string = '') {
  return str.replace(/^\s+|\s+$/gm, '')
}

/** 条目 Id 转纯数字 subjectId (兼容 '/subject/123' 形式) */
export function getSubjectId(id: string | number): string {
  return String(id).replace('/subject/', '')
}

/** 掐掉年份的时间显示 ('2024-05-01' → '24-05-01'), 相对时间 (含"前") 原样返回 */
export function shortTime(time: string = ''): string {
  if (!time || time.includes('前')) return time
  return time.slice(2)
}
