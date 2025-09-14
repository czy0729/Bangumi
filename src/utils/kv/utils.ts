/*
 * @Author: czy0729
 * @Date: 2023-12-14 12:12:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-14 15:51:53
 */
import { TEXT_BADGES } from '@constants/text'
import { DEV } from '@src/config'

/** info */
export function log(method: string, ...others: any[]) {
  if (DEV) console.info(TEXT_BADGES.plain, `[@utils/kv/${method}]`, ...others)
}

/** err */
export function err(method: string, ...others: any[]) {
  if (DEV) console.info(TEXT_BADGES.danger, `[@utils/kv/${method}]`, ...others)
}
