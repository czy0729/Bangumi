/*
 * @Author: czy0729
 * @Date: 2022-10-17 00:02:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-17 16:32:18
 */
import React from 'react'
import { PaginationList2 as PaginationList } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import ToolBar from '../tool-bar'
import Item from '../item'
import { Ctx } from '../types'

function List(props, { $ }: Ctx) {
  return (
    <PaginationList
      contentContainerStyle={_.container.bottom}
      data={$.data}
      limit={12}
      keyboardDismissMode='on-drag'
      ListHeaderComponent={<ToolBar />}
      renderItem={({ item }) => <Item item={item} />}
      onPage={$.onPage}
    />
  )
}

export default obc(List)
