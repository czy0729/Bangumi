/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 00:00:00
 */
import { HOST_DOGE_CDN } from './ds'
import { getFolder } from './utils'

import type { SubjectId } from '@types'

/** 单个条目的漫画详情 (加密单文件, Crypto.get 解密) */
export const CDN_MANGA_DETAIL = (subjectId: SubjectId) => {
  return `${HOST_DOGE_CDN}/bangumi-manga/${getFolder(subjectId)}/${subjectId}.txt` as const
}
