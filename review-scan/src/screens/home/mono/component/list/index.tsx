/*
 * @Author: czy0729
 * @Date: 2021-11-26 03:42:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-19 11:25:22
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Info from '../info'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List({ onScroll }) {
  const { $ } = useStore<Ctx>()
  return (
    <PaginationList2
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.list}
      limit={20}
      scrollEventThrottle={16}
      ListHeaderComponent={<Info />}
      progressViewOffset={_.ios(_.statusBarHeight, _.headerHeight)}
      renderItem={renderItem}
      onScroll={onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default ob(List, COMPONENT)
