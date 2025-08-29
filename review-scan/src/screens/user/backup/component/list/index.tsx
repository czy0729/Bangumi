/*
 * @Author: czy0729
 * @Date: 2022-04-24 14:16:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:33:08
 */
import React from 'react'
import { PaginationList2 as PaginationList } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List() {
  const { $ } = useStore<Ctx>()
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

export default ob(List, COMPONENT)
