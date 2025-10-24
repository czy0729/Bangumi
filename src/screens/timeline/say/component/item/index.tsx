/*
 * @Author: czy0729
 * @Date: 2023-06-17 11:17:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-24 16:33:58
 */
import React, { useCallback } from 'react'
import { useObserver } from 'mobx-react'
import { Text } from '@components'
import { ItemSay } from '@_'
import { systemStore, tinygrailStore, usersStore, userStore, useStore } from '@stores'
import { confirm, getAvatarLocal } from '@utils'
import { API_AVATAR } from '@constants'
import { COMPONENT, EVENT } from './ds'

import type { SayItem } from '@stores/timeline/types'
import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ item, index }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { id, name } = item
    if (!id) return null

    const { list } = $.say
    const prevItem: Partial<SayItem> = list[index - 1] || {}

    const showTinygrailAt =
      systemStore.setting.tinygrail && systemStore.setting.avatarAlertTinygrailAssets
    const handleLongPress = useCallback(() => {
      if (showTinygrailAt) {
        confirm(
          '选择操作',
          () => $.at(id),
          '提示',
          () => tinygrailStore.alertUserAssets(id, name),
          '@TA',
          '资产'
        )
      } else {
        $.at(id)
      }
    }, [id, name, showTinygrailAt])

    return (
      <>
        <ItemSay
          {...item}
          index={index}
          event={EVENT}
          position={id === userStore.myId ? 'right' : 'left'}
          avatar={usersStore.avatars(id) || getAvatarLocal(id) || API_AVATAR(id)}
          showName={prevItem.name !== name}
          onLongPress={handleLongPress}
        />
        {index + 1 === list.length && !!item.date && (
          <Text size={12} type='sub' align='center'>
            {item.date}
          </Text>
        )}
      </>
    )
  })
}

export default Item
