/*
 * @Author: czy0729
 * @Date: 2024-08-13 11:59:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-13 12:14:41
 */
import { otaStore } from '@stores'
import { CDN_ADV, CDN_GAME } from '@constants'
import { SubjectId } from '@types'

export function getThumbs(subjectId: SubjectId, isADV: boolean, thumb?: boolean) {
  if (isADV) {
    const length = otaStore.adv(subjectId)?.length
    if (typeof length !== 'number' || length <= 0) return []

    return new Array(length).fill('').map((item, index) => CDN_ADV(subjectId, index, thumb))
  }

  const length = otaStore.game(subjectId)?.l
  if (typeof length !== 'number' || length <= 0) return []

  return new Array(length).fill('').map((item, index) => CDN_GAME(subjectId, index, thumb))
}
