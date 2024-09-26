/*
 * @Author: czy0729
 * @Date: 2019-06-23 02:20:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-26 04:17:17
 */
import React from 'react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Filter from '../filter'
import { keyExtractor, renderItem } from './utils'

function List(_props, { $ }: Ctx) {
  if (!$.state._loaded && !$.state.data._loaded) {
    return (
      <>
        <Filter />
        <Loading />
      </>
    )
  }

  const numColumns = $.isList ? undefined : _.portrait(3, 5)
  return (
    <PaginationList2
      key={`${$.state.layout}${numColumns}`}
      keyExtractor={keyExtractor}
      forwardRef={$.forwardRef}
      contentContainerStyle={_.container.bottom}
      numColumns={numColumns}
      data={$.list}
      limit={9}
      ListHeaderComponent={<Filter />}
      renderItem={renderItem}
      scrollEventThrottle={16}
      onScroll={$.onScroll}
      onPage={$.onPage}
    />
  )
}

export default obc(List)
