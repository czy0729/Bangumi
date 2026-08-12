/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-12 09:00:00
 */
import React from 'react'
import { Portal } from '../portal'

import type { Props } from './types'

/** 应用根提供者, 挂载全局 Portal host */
export function Provider({ children }: Props) {
  return <Portal.Host>{children}</Portal.Host>
}

export default Provider
