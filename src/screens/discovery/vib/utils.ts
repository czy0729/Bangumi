/*
 * @Author: czy0729
 * @Date: 2024-05-03 22:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-04 06:36:23
 */
import { decode } from '@utils/protobuf'
import { Fn } from '@types'

/** 新增表 */
export function getNewSubjects(data: string) {
  try {
    const lines = data
      .trim()
      .split('\n')
      .filter(item => !!item)
    lines.shift()

    return lines.map(line => {
      const [id, title, rating, value1, value2] = line.split(/\s{2,}/).filter(item => !!item)
      return {
        id,
        title: title.trim(),
        rating: parseFloat(rating).toFixed(1),
        value1,
        value2
      }
    })
  } catch (error) {}

  return []
}

/** 趋势表 */
export function getTrendSubjects(data: string) {
  try {
    const lines = data
      .trim()
      .split('\n')
      .filter(item => !!item)
    lines.shift()

    return lines.map(line => {
      const [id, title, value] = line.split(/\s{2,}/).filter(item => !!item)
      return {
        id,
        title: title.trim(),
        value
      }
    })
  } catch (error) {}

  return []
}

export async function initBangumiData(callback: Fn) {
  await decode('bangumi-data')
  callback()
}
