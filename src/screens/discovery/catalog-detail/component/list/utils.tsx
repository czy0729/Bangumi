/*
 * @Author: czy0729
 * @Date: 2024-01-12 05:58:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 10:30:59
 */
import React from 'react'
import Ep from '../ep'
import Item from '../item'
import Mono from '../mono'

import type { CatalogDetailEpItem, CatalogDetailMonoItem } from '@stores/discovery/types'
import type { WithIndex, WithItem } from '@types'
import type { ListItem } from '../../types'

export function renderItem({ index, item }: WithIndex<WithItem<ListItem>>) {
  return <Item index={index} item={item} />
}

export function renderMonoItem({ index, item }: WithIndex<WithItem<CatalogDetailMonoItem>>) {
  return <Mono index={index} item={item} />
}

export function renderEpItem({ index, item }: WithIndex<WithItem<CatalogDetailEpItem>>) {
  return <Ep index={index} item={item} />
}
