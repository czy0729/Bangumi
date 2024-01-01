/*
 * @Author: czy0729
 * @Date: 2023-03-21 17:22:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 16:26:03
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import ItemList from './item-list'
import ItemGrid from './item-grid'
import { COMPONENT } from './ds'

function Item({ item, index, page }, { $ }: Ctx) {
  const { list } = $.state
  if (list) return <ItemList item={item} index={index} page={page} />

  return <ItemGrid item={item} numColumns={$.numColumns} />
}

export default obc(Item, COMPONENT)
