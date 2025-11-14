/*
 * @Author: czy0729
 * @Date: 2022-05-23 05:37:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-13 12:23:30
 */
import { getFolder } from './utils'
import { HOST_DOGE } from './ds'

import type { SubjectId } from '@types'

export { HOST_DOGE }

/** 单个条目的游戏截图 */
export const CDN_GAME = (subjectId: SubjectId, index: number, thumb: boolean = true) => {
  return `${HOST_DOGE}/bangumi-game${thumb ? '-thumb' : ''}/${getFolder(
    subjectId
  )}/${subjectId}/${index}.jpg`
}

/** 单个条目的 ADV 截图 */
export const CDN_ADV = (subjectId: SubjectId, index: number, thumb: boolean = true) => {
  return `${HOST_DOGE}/bangumi-adv/${thumb ? 'thumb' : 'preview'}/${getFolder(
    subjectId
  )}/${subjectId}/_${index}.jpg`
}
