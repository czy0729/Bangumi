/*
 * @Author: czy0729
 * @Date: 2025-03-20 10:52:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 16:50:47
 */
import React from 'react'
import Subject from '../subject'

import type { Props as ItemProps } from '../subject/types'

export function renderItem(props: ItemProps) {
  return <Subject {...props} />
}
