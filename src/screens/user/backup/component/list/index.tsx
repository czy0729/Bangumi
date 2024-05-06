/*
 * @Author: czy0729
 * @Date: 2022-04-24 14:16:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-06 15:33:36
 */
import React from 'react'
import { PaginationList2 as PaginationList } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List(props, { $ }: Ctx) {
  return (
    <PaginationList
      contentContainerStyle={_.container.bottom}
      data={$.data}
      limit={12}
      footerEmptyDataText='没有获取到任何数据，请检查登录、授权状态，在进度页面下拉刷新重新授权或者重新登录再试试'
      renderItem={renderItem}
      onHeaderRefresh={$.fetchCollectionsAll}
    />
  )
}

export default obc(List, COMPONENT)
