/*
 * @Author: czy0729
 * @Date: 2019-06-23 02:20:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:16:48
 */
import React from 'react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Filter from '../filter'
import { keyExtractor, renderItem } from './utils'

function List() {
  const { $ } = useStore<Ctx>()
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
      contentContainerStyle={_.container.page}
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

export default ob(List)
