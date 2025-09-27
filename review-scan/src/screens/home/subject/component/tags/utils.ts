/*
 * @Author: czy0729
 * @Date: 2023-10-31 16:05:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 04:38:22
 */
import { getJSON, loadJSON } from '@assets/json'
import { SubjectId, SubjectType } from '@types'

/** 缓存搜索过的结果 */
const cacheMap = new Map<string, number>()

export async function loadTyperankData(type: SubjectType) {
  return await loadJSON(`typerank/${type}`)
}

/** 检查这类型的这标签是否存在于数据中 */
export function exist(type: SubjectType, key: string) {
  if (!type || !key) return false

  let typerankData: Record<string, SubjectId[]>
  if (type === 'anime') {
    typerankData = getJSON('typerank/anime')
  } else if (type === 'book') {
    typerankData = getJSON('typerank/book')
  } else if (type === 'game') {
    typerankData = getJSON('typerank/game')
  } else if (type === 'music') {
    typerankData = getJSON('typerank/music')
  } else if (type === 'real') {
    typerankData = getJSON('typerank/real')
  }
  if (!typerankData) return false

  return !!typerankData[key]
}

/** 计算优于百分比 */
export function calc(type: SubjectType, key: string, value: number) {
  const cacheKey = `${type}|${key}|${value}`
  if (cacheMap.has(cacheKey)) return cacheMap.get(cacheKey)

  let typerankData: Record<string, SubjectId[]>
  if (type === 'anime') {
    typerankData = getJSON('typerank/anime')
  } else if (type === 'book') {
    typerankData = getJSON('typerank/book')
  } else if (type === 'game') {
    typerankData = getJSON('typerank/game')
  } else if (type === 'music') {
    typerankData = getJSON('typerank/music')
  } else if (type === 'real') {
    typerankData = getJSON('typerank/real')
  }

  const arr = typerankData[key]
  if (value <= typerankData[key][0]) return 99

  let index = 0
  for (let i = 0; i < arr.length; i += 1) {
    if (value < arr[i]) break
    index += 1
  }

  const percent = Math.max(Math.min(Math.floor((1 - index / arr.length) * 100), 99), 1)
  cacheMap.set(key, percent)
  return percent
}
