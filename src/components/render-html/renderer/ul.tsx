/*
 * @Author: czy0729
 * @Date: 2024-10-15 16:32:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-15 16:49:45
 */
import React from 'react'
import Ul from '../ul'

import type { BaseRendererProps } from './types'

export function ul({ key, children }: BaseRendererProps) {
  return <Ul key={key}>{children}</Ul>
}
