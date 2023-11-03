/*
 * @Author: czy0729
 * @Date: 2023-10-31 16:05:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 11:22:46
 */
import typerankDataAnime from '@assets/json/typerank/anime.json'
import typerankDataBook from '@assets/json/typerank/book.json'
import typerankDataGame from '@assets/json/typerank/game.json'
import typerankDataMusic from '@assets/json/typerank/music.json'
import typerankDataReal from '@assets/json/typerank/real.json'
import { SubjectType } from '@types'

/** 缓存搜索过的结果 */
const cacheMap = new Map<string, number>()

/** 检查这类型的这标签是否存在于数据中 */
export function exist(type: SubjectType, key: string) {
  if (!type || !key) return false

  let typerankData: any
  if (type === 'anime') {
    typerankData = typerankDataAnime
  } else if (type === 'book') {
    typerankData = typerankDataBook
  } else if (type === 'game') {
    typerankData = typerankDataGame
  } else if (type === 'music') {
    typerankData = typerankDataMusic
  } else if (type === 'real') {
    typerankData = typerankDataReal
  }

  if (!typerankData) return false

  return !!typerankData[key]
}

/** 计算优于百分比 */
export function calc(type: SubjectType, key: string, value: number) {
  const cacheKey = `${type}|${key}|${value}`
  if (cacheMap.has(cacheKey)) return cacheMap.get(cacheKey)

  let typerankData: any
  if (type === 'anime') {
    typerankData = typerankDataAnime
  } else if (type === 'book') {
    typerankData = typerankDataBook
  } else if (type === 'game') {
    typerankData = typerankDataGame
  } else if (type === 'music') {
    typerankData = typerankDataMusic
  } else if (type === 'real') {
    typerankData = typerankDataReal
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
