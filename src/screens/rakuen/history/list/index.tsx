/*
 * @Author: czy0729
 * @Date: 2022-11-27 15:32:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-11 19:44:16
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import ItemLazy from '../item-lazy'
import { Ctx } from '../types'

function List(props, { $ }: Ctx) {
  return (
    <PaginationList2
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.list}
      limit={12}
      scrollToTop
      renderItem={renderItem}
      onPage={$.onPage}
    />
  )
}

export default obc(List)

function keyExtractor(item: any) {
  return String(item)
}

function renderItem({ item }) {
  return <ItemLazy item={item} />
}
