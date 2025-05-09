/*
 * @Author: czy0729
 * @Date: 2023-12-14 12:12:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 19:14:30
 */
import { TEXT_BADGES } from '@constants/text'
import { DEV } from '@src/config'

/** [DEV] */
export function log(method: string, ...others: any[]) {
  if (DEV) console.info(TEXT_BADGES.plain, `[@utils/kv/${method}]`, ...others)
}
