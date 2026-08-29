/*
 * @Author: czy0729
 * @Date: 2023-12-15 13:26:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 04:39:20
 */
import { logger } from '../dev'

const TAG = '@utils/utils'

export function log(method: string, ...others: unknown[]) {
  logger.log(TAG, method, ...others)
}
