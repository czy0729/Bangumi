/*
 * @Author: czy0729
 * @Date: 2022-05-23 05:37:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-30 23:51:57
 */
import { getFolder } from './utils'
import { HOST_DOGE } from './ds'

import type { SubjectId } from '@types'

/** 单个条目的游戏截图 */
export const CDN_GAME = (subjectId: SubjectId, index: number, thumb: boolean = true) => {
  return `${HOST_DOGE}/bangumi-game${thumb ? '-thumb' : ''}/${getFolder(
    subjectId
  )}/${subjectId}/${index}.jpg`
}

/** 单个条目的游戏详情 (加密单文件, Crypto.get 解密) */
export const CDN_GAME_DETAIL = (subjectId: SubjectId) => {
  return `${HOST_DOGE}/bangumi-game/${getFolder(subjectId)}/${subjectId}.txt` as const
}

/** 单个条目的 ADV 截图 */
export const CDN_ADV = (subjectId: SubjectId, index: number, thumb: boolean = true) => {
  return `${HOST_DOGE}/bangumi-adv/${thumb ? 'thumb' : 'preview'}/${getFolder(
    subjectId
  )}/${subjectId}/_${index}.jpg`
}
