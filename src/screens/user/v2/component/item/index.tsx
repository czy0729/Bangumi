/*
 * @Author: czy0729
 * @Date: 2023-03-21 17:22:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:03:05
 */
import React from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import ItemGrid from './item-grid'
import ItemList from './item-list'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ item, index, page }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  if ($.state.list) return <ItemList item={item} index={index} page={page} />

  return <ItemGrid item={item} numColumns={$.numColumns} />
}

export default observer(Item)
