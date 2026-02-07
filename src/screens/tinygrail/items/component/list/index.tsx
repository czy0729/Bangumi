/*
 * @Author: czy0729
 * @Date: 2024-12-26 01:27:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 07:53:59
 */
import React from 'react'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { ITEMS_USED } from '@tinygrail/_/characters-modal'
import TinygrailScrollView from '@tinygrail/_/scroll-view'
import Item from '../item'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <TinygrailScrollView contentContainerStyle={_.container.bottom}>
      {$.items.list
        .slice()
        .sort((a, b) => (ITEMS_USED[b.name] || 0) - (ITEMS_USED[a.name] || 0))
        .map(item => (
          <Item key={item.id} item={item} />
        ))}
    </TinygrailScrollView>
  ))
}

export default List
