/*
 * @Author: czy0729
 * @Date: 2025-12-28 05:50:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 标签页 renderItem
 */
import List from '../list'

import type { BlogType } from '../../types'

export function renderItem({ key }: { key: BlogType }) {
  return <List key={key} type={key} />
}
