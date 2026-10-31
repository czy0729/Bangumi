/*
 * @Author: czy0729
 * @Date: 2022-04-24 14:16:31
 * @Last Modified by: czy0729
 * @Last Modified time:  2026-11-01 04:45:48
 *
 * 备份列表
 */
import { observer } from 'mobx-react'
import { PaginationList } from '@_'
import { _, useStore } from '@stores'
import { ITEM_HEIGHT } from '../item/ds'
import { renderItem } from './utils'
import { COMPONENT, LIMIT_LIST } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <PaginationList
      contentContainerStyle={_.container.bottom}
      data={$.data}
      limit={LIMIT_LIST}
      estimatedItemHeight={ITEM_HEIGHT}
      footerEmptyDataText='没有获取到任何数据，请检查登录、授权状态，在进度页面下拉刷新重新授权或者重新登录再试试'
      renderItem={renderItem}
      onHeaderRefresh={$.fetchCollectionsAll}
    />
  )
}

export default observer(List)
