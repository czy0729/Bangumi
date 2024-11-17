/*
 * @Author: czy0729
 * @Date: 2022-09-06 15:35:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:23:01
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { TEXT_18X } from '@constants/text'
import { Ctx } from '../../types'
import Info from '../info'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List({ onScroll }) {
  const { $ } = useStore<Ctx>()
  const numColumns = $.isList ? undefined : $.gridNum
  return (
    <PaginationList2
      key={`${$.state.layout}${numColumns}`}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      data={$.state.reverse ? $.list.slice().reverse() : $.list}
      limit={12}
      ListHeaderComponent={<Info />}
      renderItem={renderItem}
      // scrollToTop
      footerEmptyDataText={TEXT_18X}
      scrollEventThrottle={16}
      onScroll={onScroll}
      onHeaderRefresh={$.fetchCatalogDetail}
    />
  )
}

export default ob(List, COMPONENT)
