/*
 * @Author: czy0729
 * @Date: 2023-12-15 13:26:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-15 13:39:38
 */
import { TEXT_BADGES } from '@constants/text'
import { DEV } from '@src/config'

/** [DEV] */
export function log(method: string, ...others: any[]) {
  if (DEV) console.info(TEXT_BADGES.success, `[@utils/ui/${method}]`, ...others)
}
