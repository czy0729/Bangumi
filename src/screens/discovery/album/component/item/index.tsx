/*
 * @Author: czy0729
 * @Date: 2026-10-05 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 *
 * 找画集条目: 按布局分发列表 / 网格
 */
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import ItemGrid from '../item-grid'
import ItemList from '../item-list'
import { COMPONENT } from './ds'

import type { RenderItem } from '@types'
import type { Ctx } from '../../types'

function Item({ item: pickIndex, index }: RenderItem<number>) {
  const { $ } = useStore<Ctx>(COMPONENT)

  if ($.isList) return <ItemList pickIndex={pickIndex} index={index} />

  return <ItemGrid pickIndex={pickIndex} index={index} />
}

export default observer(Item)
