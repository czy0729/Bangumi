/*
 * @Author: czy0729
 * @Date: 2022-04-24 14:16:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-13 12:37:59
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
      footerEmptyDataText='没有获取到任何数据，请检查登录、授权状态，在进度页面下拉刷新重新授权或者重新登录再试试'
      renderItem={({ item }) => <Item item={item} />}
      onHeaderRefresh={$.fetchCollectionsAll}
    />
  )
}

export default obc(List)
