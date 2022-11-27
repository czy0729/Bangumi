/*
 * @Author: czy0729
 * @Date: 2022-11-27 15:32:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-28 06:26:30
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { obc } from '@utils/decorators'
import ItemLazy from '../item-lazy'
import { Ctx } from '../types'

function List(props, { $ }: Ctx) {
  return (
    <PaginationList2
      keyExtractor={keyExtractor}
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
