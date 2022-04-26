/*
 * @Author: czy0729
 * @Date: 2022-04-24 14:16:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-26 07:38:00
 */
import React from 'react'
import { PaginationList } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Item from './item'

function List(props, { $ }) {
  return (
    <PaginationList
      key={$.state.data._loaded}
      contentContainerStyle={_.container.bottom}
      data={$.data}
      renderItem={({ item }) => <Item item={item} />}
      onPage={$.onPage}
    />
  )
}

export default obc(List)
