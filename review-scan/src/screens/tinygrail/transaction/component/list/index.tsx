/*
 * @Author: czy0729
 * @Date: 2025-03-04 19:20:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-07 17:05:34
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { Ctx } from '../../types'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

function List() {
  const { $ } = useStore<Ctx>()
  return (
    <PaginationList2
      forwardRef={$.forwardRef}
      keyExtractor={keyExtractor}
      style={_.container.wind}
      contentContainerStyle={_.container.bottom}
      {...SCROLL_VIEW_RESET_PROPS}
      scrollEventThrottle={16}
      data={$.list}
      limit={12}
      renderItem={renderItem}
      onPage={$.onPage}
      onHeaderRefresh={$.getList}
    />
  )
}

export default ob(List, COMPONENT)
