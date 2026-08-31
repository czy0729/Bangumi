/*
 * @Author: czy0729
 * @Date: 2026-08-31 19:46:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 19:50:22
 */
import React from 'react'
import { ItemBlog } from '@_'
import { EVENT } from './ds'

import type { RenderItem } from '@types'
import type { BlogItem } from '@stores/discovery/types'

/**
 * 列表项渲染
 */
export function renderItem({ item, index }: RenderItem<BlogItem>) {
  return <ItemBlog index={index} event={EVENT} {...item} />
}
