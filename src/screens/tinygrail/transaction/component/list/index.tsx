/*
 * @Author: czy0729
 * @Date: 2025-03-04 19:20:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-07 17:05:34
 */
import { observer } from 'mobx-react'
import { PaginationList } from '@_'
import { _, useStore } from '@stores'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <PaginationList
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

export default observer(List)
