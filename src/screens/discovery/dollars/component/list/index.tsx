/*
 * @Author: czy0729
 * @Date: 2023-04-26 15:30:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 12:48:49
 */
import React from 'react'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { Ctx } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List(props, { $ }: Ctx) {
  return (
    <PaginationList2
      forwardRef={$.forwardRef}
      keyExtractor={keyExtractor}
      style={_.container.wind}
      contentContainerStyle={_.container.bottom}
      {...SCROLL_VIEW_RESET_PROPS}
      scrollEventThrottle={4}
      data={$.dollars.list}
      renderItem={renderItem}
      onScroll={$.onScroll}
    />
  )
}

export default obc(List, COMPONENT)
