/*
 * @Author: czy0729
 * @Date: 2024-04-05 13:05:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-04-05 13:05:42
 */
import React from 'react'
import { ItemCatalog } from '@_'
import { CatalogsItem } from '@stores/discovery/types'
import { RenderItem } from '@types'
import { EVENT } from './ds'

export function renderItem({ item, index }: RenderItem<CatalogsItem>) {
  return <ItemCatalog {...item} index={index} name='优莉雅' anime={item.anime} event={EVENT} />
}
