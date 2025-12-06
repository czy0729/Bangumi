/*
 * @Author: czy0729
 * @Date: 2024-09-19 20:35:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-07 04:32:05
 */
import React from 'react'
import { ScrollView } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Item from '../item'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <ScrollView contentContainerStyle={_.container.bottom} onScroll={$.onScroll}>
      {$.filterList.map((item, index) => (
        <Item key={item.id} item={item} index={index} />
      ))}
    </ScrollView>
  ))
}

export default List
