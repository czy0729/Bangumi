/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:29:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-10 14:26:30
 */
import React from 'react'
import { ItemFriends } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { Props } from './types'

const EVENT = {
  id: '好友.跳转'
} as const

function Item({ item }: Props, { $, navigation }: Ctx) {
  return (
    <ItemFriends
      navigation={navigation}
      event={EVENT}
      {...item}
      {...$.users(item.userId)}
      filter={$.state.filter}
    />
  )
}

export default obc(Item, COMPONENT)
