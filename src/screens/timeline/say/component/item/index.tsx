/*
 * @Author: czy0729
 * @Date: 2023-06-17 11:17:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-03 19:01:05
 */
import React from 'react'
import { Text } from '@components'
import { ItemSay } from '@_'
import { systemStore, tinygrailStore, usersStore, userStore, useStore } from '@stores'
import { SayItem } from '@stores/timeline/types'
import { confirm, getAvatarLocal } from '@utils'
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
        index={index}
        event={EVENT}
        position={isMe ? 'right' : 'left'}
        avatar={usersStore.avatars(item.id) || getAvatarLocal(item.id) || API_AVATAR(item.id)}
        showName={prevItem.name !== item.name}
        onLongPress={() => {
          if (systemStore.setting.tinygrail && systemStore.setting.avatarAlertTinygrailAssets) {
            confirm(
              '选择操作',
              () => {
                $.at(item.id)
              },
              '提示',
              () => {
                tinygrailStore.alertUserAssets(item.id, item.name)
              },
              '@TA',
              '资产'
            )
            return
          }

          $.at(item.id)
        }}
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
