/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:51:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-18 04:35:56
 */
import React from 'react'
import { Empty, Loading } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

function List(_props, { $ }: Ctx) {
  const { ids } = $.state
  if (!ids.length) return <Empty text='此标签没有足够的列表数据' />

  if ($.state.searching) return <Loading style={_.container.flex} />

  return (
    <PaginationList2
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={ids}
      limit={12}
      renderItem={renderItem}
      onScroll={$.onScroll}
      onPage={$.fetchSubjectsFromOSS}
    />
  )
}

export default obc(List, COMPONENT)
