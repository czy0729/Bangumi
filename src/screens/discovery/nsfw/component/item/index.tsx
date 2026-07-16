/*
 * @Author: czy0729
 * @Date: 2025-11-06 01:30:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-11-06 01:30:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import ItemGrid from '../item-grid'
import ItemList from '../item-list'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ item, index }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)
  const Component = $.isList ? ItemList : ItemGrid

  return <Component pickIndex={item} index={index} />
}

export default observer(Item)
