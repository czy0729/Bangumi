/*
 * @Author: czy0729
 * @Date: 2025-07-24 21:20:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-24 22:59:37
 */

/** 关联对象转关联数组 */
export const objectToArray = (obj: any) => {
  if (typeof obj !== 'object' || obj === null) return []

  return Object.entries<any>(obj).map(([name, { id, time }]) => ({
    name,
    id,
    time
  }))
}

/**
 * 生成一个日期比较函数，用于 Array.sort()，按从最近到最远排序
 * @param separator 年月日的分隔符，默认 '-'
 */
export const createDateComparatorDesc = (
  separator: string = '-'
): ((a: { time?: string }, b: { time?: string }) => number) => {
  // 解析日期字符串为时间戳（兼容 iOS/Safari）
  const parseDateToTimestamp = (dateStr: string): number => {
    const [year, month, day] = dateStr.split(separator).map(Number)
    return new Date(year, month - 1, day).getTime()
  }

  // 返回比较函数（降序：最近 -> 最远）
  return (a, b) => parseDateToTimestamp(b.time) - parseDateToTimestamp(a.time)
}
