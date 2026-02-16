/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:51:52
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-04-23 15:51:52
 */
import { Id } from '@types'

export function getInt(id: Id) {
  const str = String(id)
  return Number(str.slice(str.length - 2, str.length)) || 0
}
