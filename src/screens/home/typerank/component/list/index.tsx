/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:51:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:36:18
 */
import React from 'react'
import { Empty } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

function List() {
  const { $ } = useStore<Ctx>()
  const { ids } = $.state
  if (!ids.length) return <Empty text='此标签没有足够的列表数据' />

  return (
    <PaginationList2
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.page}
      data={ids}
      limit={12}
      renderItem={renderItem}
      onScroll={$.onScroll}
      onPage={$.fetchSubjectsFromOSS}
    />
  )
}

export default ob(List, COMPONENT)
