/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-11 00:28:06
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
      limit={10}
      renderItem={renderItem}
      onHeaderRefresh={() => $.getList(true)}
    />
  )
}

export default obc(List)

function renderItem({ item }) {
  return <Item item={item} />
}
