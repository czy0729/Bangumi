/*
 * @Author: czy0729
 * @Date: 2021-11-26 03:42:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-25 04:17:23
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import Info from '../info'
import { Ctx } from '../types'

function List({ renderItem, onScroll }, { $ }: Ctx) {
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
