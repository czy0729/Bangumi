/*
 * @Author: czy0729
 * @Date: 2025-12-28 05:50:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 21:29:55
 */
import React from 'react'
import List from '../list'

import type { BlogType } from '../../types'

/**
 * 渲染标签页
 */
export function renderItem({ key }: { key: BlogType }) {
  return <List key={key} type={key} />
}
