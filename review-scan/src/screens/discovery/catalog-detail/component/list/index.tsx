/*
 * @Author: czy0729
 * @Date: 2022-09-06 15:35:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-08 08:26:27
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { TEXT_18X } from '@constants/text'
import { Ctx } from '../../types'
import Info from '../info'
import { renderEpItem, renderItem, renderMonoItem } from './utils'
import { COMPONENT } from './ds'

function List({ onScroll }) {
  const { $ } = useStore<Ctx>()
  const numColumns = $.type !== '动画' ? 1 : $.isList ? undefined : $.gridNum
  return (
    <PaginationList2
      key={`${$.state.layout}${numColumns}`}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      numColumns={numColumns}
      data={$.data}
      limit={12}
      ListHeaderComponent={<Info />}
      renderItem={
        $.type === '章节'
          ? renderEpItem
          : $.type === '角色' || $.type === '人物'
          ? renderMonoItem
          : renderItem
      }
      footerEmptyDataText={TEXT_18X}
      scrollEventThrottle={16}
      onScroll={onScroll}
      onHeaderRefresh={$.fetchCatalogDetail}
    />
  )
}

export default ob(List, COMPONENT)
