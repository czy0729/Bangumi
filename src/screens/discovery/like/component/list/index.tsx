/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:41:21
 */
import React from 'react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List() {
  const { $ } = useStore<Ctx>()
  if ($.state.fetching) return <Loading />

  return (
    <PaginationList2
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.list}
      limit={12}
      renderItem={renderItem}
      onScroll={$.onScroll}
      onPage={$.onPage}
      onNextPage={$.onNextPage}
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default ob(List, COMPONENT)
