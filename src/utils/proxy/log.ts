/*
 * @Author: czy0729
 * @Date: 2026-08-25 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:27:58
 */
import { logger } from '../dev'

import type { ProxyType } from './types'

const TAG = '@utils/proxy'

/** 调试打印 */
export function logProxy(method: string, proxyType: ProxyType, _url: string, finalUrl: string) {
  if (proxyType) logger.log(TAG, method, `(${proxyType})`, { url: finalUrl })
}
