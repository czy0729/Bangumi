/*
 * @Author: czy0729
 * @Date: 2024-04-05 13:05:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 01:42:59
 */
import React from 'react'
import { ItemCatalog } from '@_'
import { EVENT } from './ds'

import type { CatalogsItem } from '@stores/discovery/types'
import type { RenderItem } from '@types'

export function renderItem({ item, index }: RenderItem<CatalogsItem>) {
  return <ItemCatalog {...item} index={index} name='优莉雅' anime={item.anime} event={EVENT} />
}
