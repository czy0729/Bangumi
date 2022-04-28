/*
 * @Author: czy0729
 * @Date: 2022-04-24 14:16:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-28 09:43:17
 */
import React from 'react'
import { PaginationList2 as PaginationList } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import ToolBar from './tool-bar'
import Item from './item'

function List(props, { $ }) {
  return (
    <PaginationList
      contentContainerStyle={_.container.bottom}
      data={$.data}
      limit={20}
      ListHeaderComponent={<ToolBar />}
      renderItem={({ item }) => <Item item={item} />}
      onPage={$.onPage}
    />
  )
}

export default obc(List)
