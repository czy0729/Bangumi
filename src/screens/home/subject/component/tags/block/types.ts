/*
 * @Author: czy0729
 * @Date: 2025-09-26 19:46:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 22:00:00
 */
import type { TagsItem } from '../../../types'

export type Props = {
  /** 跳转目标页 (第三方标签对应的四个发现页) */
  path: 'Anime' | 'Game' | 'Manga' | 'Wenku'

  tags: readonly TagsItem[]
}
