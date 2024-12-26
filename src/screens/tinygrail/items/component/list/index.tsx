/*
 * @Author: czy0729
 * @Date: 2024-12-26 01:27:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-26 01:29:21
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { ITEMS_USED } from '@tinygrail/_/characters-modal'
import { Ctx } from '../../types'
import Item from '../item'
import { COMPONENT } from './ds'

function List() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => (
    <ScrollView contentContainerStyle={_.container.page} {...SCROLL_VIEW_RESET_PROPS}>
      {$.items.list
        .slice()
        .sort((a, b) => (ITEMS_USED[b.name] || 0) - (ITEMS_USED[a.name] || 0))
        .map(item => (
          <Item key={item.id} item={item} />
        ))}
    </ScrollView>
  ))
}

export default List
