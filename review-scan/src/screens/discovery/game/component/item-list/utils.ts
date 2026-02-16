/*
 * @Author: czy0729
 * @Date: 2022-08-28 15:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-23 05:38:51
 */
import { CDN_GAME } from '@constants'
import { SubjectId } from '@types'

export function fixed(image: string | string[]) {
  return `m/${image}`
}

export function getThumbs(subjectId: SubjectId, length: number, thumb: boolean = true) {
  if (typeof length !== 'number') return []

  return new Array(length).fill('').map((item, index) => CDN_GAME(subjectId, index, thumb))
}

export function toArray(item = {}, key: string) {
  return (typeof item?.[key] === 'object' ? item?.[key] : [item?.[key] || undefined]).filter(
    (item: any) => item !== undefined
  )
}
