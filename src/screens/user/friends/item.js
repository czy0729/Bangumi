/*
 * @Author: czy0729
 * @Date: 2022-03-16 01:29:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-16 01:33:06
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemFriends } from '@screens/_'
import { obc } from '@utils/decorators'

const event = {
  id: '好友.跳转'
}

function Item({ item, index }, { $, navigation }) {
  return (
    <ItemFriends
      navigation={navigation}
      event={event}
      {...item}
      {...$.users(item.userId)}
    >
      {!index && <Heatmap id='好友.跳转' />}
    </ItemFriends>
  )
}

export default obc(Item)
