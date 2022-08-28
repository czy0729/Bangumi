/*
 * @Author: czy0729
 * @Date: 2022-08-28 15:43:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 15:43:46
 */
import { CDN_GAME } from '@constants'
import { SubjectId } from '@types'

export function fixed(image: string | string[]) {
  if (image.includes('m/')) return image
  return `m/${image}`
}

export function getThumbs(subjectId: SubjectId, length: number) {
  if (typeof length !== 'number') {
    return []
  }

  // @ts-ignore
  return new Array(length).fill().map((item, index) => CDN_GAME(subjectId, index))
}
