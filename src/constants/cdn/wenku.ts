/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 00:00:00
 */
import { HOST_DOGE_CDN } from './ds'
import { getFolder } from './utils'

import type { SubjectId } from '@types'

/** 单个条目的文库详情 (加密单文件, Crypto.get 解密) */
export const CDN_WENKU_DETAIL = (subjectId: SubjectId) => {
  return `${HOST_DOGE_CDN}/bangumi-wenku/${getFolder(subjectId)}/${subjectId}.txt` as const
}
