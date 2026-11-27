/*
 * @Author: czy0729
 * @Date: 2026-11-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * 密码登录入口: 按平台返回完全独立的实现
 */
import { IOS } from '@constants'
import { AndroidLoginService } from './android'
import { IosLoginService } from './ios'

import type { PasswordLoginService } from './types'

export type { PasswordLoginService }

export function createPasswordLoginService(host: string): PasswordLoginService {
  return IOS ? new IosLoginService(host) : new AndroidLoginService(host)
}
