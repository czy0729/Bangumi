/*
 * @Author: czy0729
 * @Date: 2022-09-06 15:35:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-06 15:37:29
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { TEXT_18X } from '@constants/text'
import Info from '../info'
import Item from '../item'
import { Ctx } from '../types'

function List({ onScroll }, { $ }: Ctx) {
  const { layout } = $.state
  const numColumns = $.isList ? undefined : $.gridNum
  return (
    <PaginationList2
      key={`${layout}${numColumns}`}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      data={$.catalogDetail.list}
      limit={12}
      ListHeaderComponent={<Info />}
      renderItem={renderItem}
      scrollEventThrottle={16}
      scrollToTop
      footerEmptyDataText={TEXT_18X}
      onScroll={onScroll}
      onHeaderRefresh={$.fetchCatalogDetail}
    />
  )
}

export default obc(List)

function renderItem({ index, item }) {
  return <Item index={index} item={item} />
}
