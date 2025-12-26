/*
 * @Author: czy0729
 * @Date: 2023-12-15 13:26:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 00:29:27
 */
import { logger } from '../dev'

export function log(method: string, ...others: any[]) {
  logger.success(`@utils/ui/${method}`, ...others)
}
