/*
 * @Author: czy0729
 * @Date: 2024-03-16 19:18:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-16 19:21:55
 */
import React from 'react'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import ItemGrid from '../item-grid'
import ItemList from '../item-list'
import { COMPONENT } from './ds'

function Item({ item: pickIndex, index }, { $ }: Ctx) {
  if ($.state.layout === 'list') return <ItemList pickIndex={pickIndex} index={index} />

  return <ItemGrid pickIndex={pickIndex} index={index} num={_.portrait(3, 5)} />
}

export default obc(Item, COMPONENT)
