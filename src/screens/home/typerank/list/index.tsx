/*
 * @Author: czy0729
 * @Date: 2023-11-01 08:51:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-05 03:56:44
 */
import React from 'react'
import { Empty, Loading } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { SubjectId } from '@types'
import Item from '../item'
import { Ctx } from '../types'

function List(props, { $ }: Ctx) {
  if (!$.ids.length) return <Empty text='此标签没有足够的列表数据' />

  const { searching } = $.state
  if (searching) return <Loading style={_.container.flex} />

  return (
    <PaginationList2
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.ids}
      limit={12}
      renderItem={renderItem}
      onScroll={$.onScroll}
      onPage={$.fetchSubjectsFromOSS}
    />
  )
}

export default obc(List)

function keyExtractor(item: SubjectId) {
  return String(item)
}

function renderItem({ item, index }) {
  return <Item subjectId={item} index={index} />
}
