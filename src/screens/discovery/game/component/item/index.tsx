/*
 * @Author: czy0729
 * @Date: 2024-03-16 19:18:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 10:32:52
 */
import React from 'react'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import ItemGrid from '../item-grid'
import ItemList from '../item-list'
import { COMPONENT } from './ds'

function Item({ item: pickIndex, index }) {
  const { $ } = useStore<Ctx>()
  if ($.isList) return <ItemList pickIndex={pickIndex} index={index} />

  return <ItemGrid pickIndex={pickIndex} index={index} num={_.portrait(3, 5)} />
}

export default ob(Item, COMPONENT)
