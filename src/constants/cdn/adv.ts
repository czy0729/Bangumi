/*
 * @Author: czy0729
 * @Date: 2026-09-30 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-30 18:42:02
 */
import { getFolder } from './utils'
import { HOST_DOGE_CDN } from './ds'

import type { SubjectId } from '@types'

/** 单个条目的 ADV 详情 (加密单文件, Crypto.get 解密) */
export const CDN_ADV_DETAIL = (subjectId: SubjectId) => {
  return `${HOST_DOGE_CDN}/bangumi-adv/${getFolder(subjectId, 100)}/${subjectId}.txt` as const
}
