/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 14:33:50
 */
import React from 'react'
import { PaginationList2, ItemCharacter } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

const EVENT = {
  id: '更多角色.跳转'
} as const

function List(props, { $ }: Ctx) {
  return (
    <PaginationList2
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.characters.list}
      limit={12}
      scrollToTop
      renderItem={renderItem}
      scrollEventThrottle={32}
      onScroll={$.onScroll}
    />
  )
}

export default obc(List)

function renderItem({ item, index }) {
  return (
    <ItemCharacter style={_.container.item} index={index} event={EVENT} {...item} />
  )
}
