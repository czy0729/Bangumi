/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-13 05:50:18
 */
import React from 'react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import Item from '../item'
import { Ctx } from '../types'

function List(props, { $ }: Ctx) {
  const { fetching } = $.state
  if (fetching) return <Loading />

  const { list, type } = $.state
  return (
    <PaginationList2
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={list[type]}
      limit={12}
      renderItem={renderItem}
      onScroll={$.onScroll}
      onPage={$.onPage}
      onNextPage={$.onNextPage}
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default obc(List)

function renderItem({ item }) {
  return <Item item={item} />
}
