/*
 * @Author: czy0729
 * @Date: 2021-11-26 03:42:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-12 10:24:10
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import Info from '../info'
import Item from '../item'
import { Ctx } from '../types'

function List({ onScroll }, { $ }: Ctx) {
  return (
    <PaginationList2
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.list}
      limit={20}
      scrollEventThrottle={4}
      scrollToTop
      ListHeaderComponent={<Info />}
      progressViewOffset={_.ios(_.statusBarHeight, _.headerHeight)}
      removeClippedSubviews={$.list.length >= 100}
      renderItem={renderItem}
      onScroll={onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default obc(List)

function renderItem({ item, index }) {
  return <Item item={item} index={index} />
}
