/*
 * @Author: czy0729
 * @Date: 2023-06-10 05:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-22 07:55:54
 */
import React from 'react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List(props, { $ }: Ctx) {
  if ($.state.fetching) return <Loading />

  return (
    <PaginationList2
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.state.list[$.state.type]}
      limit={12}
      renderItem={renderItem}
      onScroll={$.onScroll}
      onPage={$.onPage}
      onNextPage={$.onNextPage}
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default obc(List, COMPONENT)
