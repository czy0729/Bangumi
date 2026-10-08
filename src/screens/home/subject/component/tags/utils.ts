/*
 * @Author: czy0729
 * @Date: 2023-10-31 16:05:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-09 06:08:44
 */
import { decode, get } from '@utils/thirdParty/protobuf'

import type { SubjectType } from '@types'

/** 缓存搜索过的结果 */
const cacheMap = new Map<string, number>()

export async function loadTyperankData(type: SubjectType) {
  return await decode(`${type}-ranks`)
}

/** 检查这类型的这标签是否存在于数据中 */
export function exist(type: SubjectType, key: string) {
  if (!type || !key) return false

  return !!get(`${type}-ranks`)?.[key]
}

/** 计算优于百分比 */
export function calc(type: SubjectType, key: string, value: number) {
  const cacheKey = `${type}|${key}|${value}`
  if (cacheMap.has(cacheKey)) return cacheMap.get(cacheKey)

  const arr = get(`${type}-ranks`)?.[key]
  if (!arr?.length) return 1

  if (value <= Number(arr[0])) {
    cacheMap.set(cacheKey, 99)
    return 99
  }

  let index = 0
  for (let i = 0; i < arr.length; i += 1) {
    if (value < Number(arr[i])) break
    index += 1
  }

  const percent = Math.max(Math.min(Math.floor((1 - index / arr.length) * 100), 99), 1)
  cacheMap.set(cacheKey, percent)
  return percent
}
