/*
 * @Author: czy0729
 * @Date: 2022-09-06 15:35:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-22 10:28:41
 */
import React, { useMemo } from 'react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { useObserver } from '@utils/hooks'
import { TEXT_18X } from '@constants/text'
import Info from '../info'
import { renderEpItem, renderItem, renderMonoItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elInfo = useMemo(() => <Info />, [])

  return useObserver(() => {
    const { type, isList, gridNum } = $

    /** 计算列数：动画类型单独逻辑 */
    const numColumns = useMemo(() => {
      if (type !== '动画') return 1
      return isList ? undefined : gridNum
    }, [type, isList, gridNum])

    /** 渲染函数根据 type 选择 */
    const renderFn = useMemo(() => {
      if (type === '章节') return renderEpItem
      if (type === '角色' || type === '人物') return renderMonoItem
      return renderItem
    }, [type])

    return (
      <PaginationList2
        key={`${$.state.layout}-${numColumns}`}
        keyExtractor={keyExtractor}
        contentContainerStyle={_.container.bottom}
        numColumns={numColumns}
        data={$.data}
        limit={12}
        ListHeaderComponent={elInfo}
        renderItem={renderFn}
        footerEmptyDataText={TEXT_18X}
        scrollEventThrottle={16}
        onScroll={$.onScroll}
        onHeaderRefresh={$.fetchCatalogDetail}
      />
    )
  })
}

export default List
