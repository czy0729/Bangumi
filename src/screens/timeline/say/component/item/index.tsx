/*
 * @Author: czy0729
 * @Date: 2023-06-17 11:17:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 05:43:16
 */
import React from 'react'
import { Text } from '@components'
import { ItemSay } from '@_'
import { userStore, useStore } from '@stores'
import { SayItem } from '@stores/timeline/types'
import { getAvatarLocal } from '@utils'
import { ob } from '@utils/decorators'
import { API_AVATAR } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT, EVENT } from './ds'

function Item({ item, index }) {
  const { $ } = useStore<Ctx>()
  if (!item.id) return null

  const { list } = $.say
  const prevItem: Partial<SayItem> = index === 0 ? {} : list[index - 1]
  const isMe = item.id === userStore.myId
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

export default ob(Item, COMPONENT)
