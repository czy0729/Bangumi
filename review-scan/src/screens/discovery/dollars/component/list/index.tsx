/*
 * @Author: czy0729
 * @Date: 2023-04-26 15:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-13 22:24:05
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { Ctx } from '../../types'
import { renderItem } from './utils'
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
      skipEnteringExitingAnimations={10}
      scrollEventThrottle={16}
      data={$.dollars.list}
      renderItem={renderItem}
      onScroll={$.onScroll}
    />
  )
}

export default ob(List, COMPONENT)
