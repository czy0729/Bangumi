/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import React from 'react'
import { Portal } from '../portal'

import type { PropsWithChildren } from 'react'

/**
 * 应用根提供者, 挂载全局 Portal host
 */
function Provider({ children }: PropsWithChildren<{ theme?: object }>) {
  return <Portal.Host>{children}</Portal.Host>
}

/** 兼容旧 ant Provider 静态 API */
Provider.displayName = 'AntProvider'

export default Provider