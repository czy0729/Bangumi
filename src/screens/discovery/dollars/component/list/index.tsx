/*
 * @Author: czy0729
 * @Date: 2023-04-26 15:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-05 14:40:46
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { useObserver } from '@utils/hooks'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <PaginationList2
      forwardRef={$.forwardRef}
      keyExtractor={keyExtractor}
      style={_.container.wind}
      contentContainerStyle={_.container.bottom}
      {...SCROLL_VIEW_RESET_PROPS}
      skipEnteringExitingAnimations={10}
      scrollEventThrottle={16}
      data={$.dollars.list}
      renderItem={renderItem}
      onScroll={$.onScroll}
    />
  ))
}

export default List
