/*
 * @Author: czy0729
 * @Date: 2022-04-24 14:16:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-08 11:54:43
 */
import React from 'react'
import { PaginationList2 as PaginationList } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Item from '../item'
import { Ctx } from '../types'

function List(props, { $ }: Ctx) {
  return (
    <PaginationList
      contentContainerStyle={_.container.bottom}
      data={$.data}
      limit={12}
      renderItem={({ item }) => <Item item={item} />}
      onPage={$.onPage}
    />
  )
}

export default obc(List)
