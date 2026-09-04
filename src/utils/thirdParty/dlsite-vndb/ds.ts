/*
 * @Author: czy0729
 * @Date: 2026-05-26 17:13:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 21:33:54
 */
import Crypto from '../crypto'

export const HOST_DLSITE = Crypto.get<string>(
  'U2FsdGVkX1/KIhRSq3OGNA0jdQEshRJYfMjLgaU4wwahZuitWmXaIxp7Xs1ZPJ85'
)

export const HOST_VNDB = Crypto.get<string>(
  'U2FsdGVkX1+SKHY2YqAvPCChXFSbZSwpzeV17F9g4ohHL/B1T58LMJeY5mFBt9DL'
)

/** sample 图片最大探测组数 */
export const MAX_SAMPLE_COUNT = 20

/** sample 并发探测批大小 (批内成对并行, 收录遇首个双缺失即停) */
export const PROBE_BATCH_SIZE = 4
