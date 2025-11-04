/*
 * @Author: czy0729
 * @Date: 2024-03-16 19:18:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-04 16:24:21
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { useStore } from '@stores'
import ItemGrid from '../item-grid'
import ItemList from '../item-list'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ item, index }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const Component = $.isList ? ItemList : ItemGrid
    return <Component pickIndex={item} index={index} />
  })
}

export default Item
