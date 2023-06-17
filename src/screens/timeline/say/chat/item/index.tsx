/*
 * @Author: czy0729
 * @Date: 2023-06-17 11:17:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-17 14:14:44
 */
import React from 'react'
import { Text } from '@components'
import { ItemSay } from '@_'
import { getAvatarLocal } from '@utils'
import { obc } from '@utils/decorators'
import { API_AVATAR } from '@constants'
import { Ctx } from '../../types'

const EVENT = {
  id: '吐槽.跳转'
} as const

function Item({ item, index }, { $ }: Ctx) {
  if (!item.id) return null

  const { list } = $.say
  const prevItem = index === 0 ? {} : list[index - 1]
  const isMe = item.id === $.myId
  return (
    <>
      <ItemSay
        {...item}
        event={EVENT}
        position={isMe ? 'right' : 'left'}
        avatar={getAvatarLocal(item.id) || API_AVATAR(item.id)}
        showName={prevItem.name !== item.name}
        onLongPress={() => $.at(item.id)}
      />
      {index + 1 === list.length && !!item.date && (
        <Text size={12} type='sub' align='center'>
          {list[index]?.date}
        </Text>
      )}
    </>
  )
}

export default obc(Item)
