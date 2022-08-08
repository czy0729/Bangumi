/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:29:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-07 08:47:14
 */
import React from 'react'
import { ItemFriends } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { Props } from './types'

const EVENT = {
  id: '好友.跳转'
} as const

function Item({ item }: Props, { $, navigation }: Ctx) {
  const { filter } = $.state
  const users = $.users(item.userId)
  return (
    <ItemFriends
      navigation={navigation}
      event={EVENT}
      {...item}
      {...users}
      filter={filter}
    />
  )
}

export default obc(Item)
