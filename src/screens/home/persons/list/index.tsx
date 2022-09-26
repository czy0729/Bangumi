/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-26 11:51:49
 */
import React from 'react'
import { PaginationList2, ItemCharacter } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

const EVENT = {
  id: '制作人员.跳转'
} as const

function List(props, { $ }: Ctx) {
  return (
    <PaginationList2
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.persons.list}
      limit={16}
      renderItem={renderItem}
    />
  )
}

export default obc(List)

function renderItem({ item, index }) {
  return (
    <ItemCharacter
      style={_.container.item}
      index={index}
      event={EVENT}
      type='person'
      {...item}
    />
  )
}
