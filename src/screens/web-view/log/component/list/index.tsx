/*
 * @Author: czy0729
 * @Date: 2025-02-18 06:26:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-20 05:28:35
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Ctx } from '../../types'
import Item from '../item'

function List() {
  const { $ } = useStore<Ctx>()
  return useObserver(() => {
    const { data } = $.state
    return (
      <PaginationList2
        keyExtractor={keyExtractor}
        contentContainerStyle={_.container.bottom}
        skipEnteringExitingAnimations={10}
        data={data.list}
        limit={100}
        renderItem={renderItem}
        onHeaderRefresh={$.getData}
      />
    )
  })
}

export default List

function keyExtractor(item) {
  return `${item.i}${item.d}`
}

function renderItem({ item }) {
  return <Item {...item} />
}
