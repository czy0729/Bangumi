/*
 * @Author: czy0729
 * @Date: 2024-08-13 11:59:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-01 07:17:18
 */
import { otaStore } from '@stores'
import { isArray } from '@utils'
import { CDN_ADV, CDN_GAME } from '@constants'

import type { SubjectId } from '@types'

/** 截图数量上限, 挡住脏数据导致的超大 new Array */
const MAX_LENGTH = 100

/** 可被 new Array 安全消费的截图数量 (只校验正整数, 上限在消费处截断) */
function isValidLength(length: unknown): length is number {
  return Number.isInteger(length) && (length as number) > 0
}

export function getThumbs(subjectId: SubjectId, isADV: boolean, thumb?: boolean) {
  if (isADV) {
    const adv = otaStore.adv(subjectId)

    /** 在线截图 (VNDB) 优先, 缺席时用自建 CDN 截图 */
    const screens = adv?.screens
    if (isArray(screens) && screens.length) {
      return screens.map(screen => (thumb === false ? screen.url : screen.thumbnail || screen.url))
    }

    const length = adv?.length
    if (!isValidLength(length)) return []

    return new Array(Math.min(length, MAX_LENGTH))
      .fill('')
      .map((_item, index) => CDN_ADV(subjectId, index, thumb))
  }

  const length = otaStore.game(subjectId)?.l
  if (!isValidLength(length)) return []

  return new Array(Math.min(length, MAX_LENGTH))
    .fill('')
    .map((_item, index) => CDN_GAME(subjectId, index, thumb))
}
