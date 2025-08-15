/*
 * @Author: czy0729
 * @Date: 2022-08-28 15:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-14 16:43:06
 */
import { CDN_ADV } from '@constants'
import { SubjectId } from '@types'

export function fixed(image: string | string[]) {
  return `m/${image}`
}

export function getThumbs(subjectId: SubjectId, length: number, thumb: boolean = true) {
  if (typeof length !== 'number' || length === -1) return []

  return new Array(length).fill('').map((item, index) => CDN_ADV(subjectId, index, thumb))
}
