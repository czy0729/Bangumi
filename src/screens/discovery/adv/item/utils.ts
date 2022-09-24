/*
 * @Author: czy0729
 * @Date: 2022-08-28 15:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 15:43:46
 */
import { CDN_GAME } from '@constants'
import { SubjectId } from '@types'

export function fixed(image: string | string[]) {
  return `m/${image}`
}

export function getThumbs(subjectId: SubjectId, length: number, thumb: boolean = true) {
  if (typeof length !== 'number') return []

  return (
    new Array(length)
      // @ts-ignore
      .fill()
      .map((item, index) => CDN_GAME(subjectId, index, thumb))
  )
}
