/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 09:36:31
 */
import React from 'react'
import { ListView } from '@components'
import { ItemCharacter } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

const EVENT = {
  id: '更多角色.跳转'
} as const

function List(props, { $ }: Ctx) {
  return (
    <ListView
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.characters}
      scrollToTop
      renderItem={renderItem}
    />
  )
}

export default obc(List)

function renderItem({ item, index }) {
  return (
    <ItemCharacter style={_.container.item} index={index} event={EVENT} {...item} />
  )
}
