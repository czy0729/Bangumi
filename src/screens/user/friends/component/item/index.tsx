/*
 * @Author: czy0729
 * @Date: 2024-04-12 02:17:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-21 01:30:00
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import { HTMLDecode } from '@utils'
import { t } from '@utils/fetch'
import { WEB } from '@constants'
import Container from './container'
import Main from './main'
import { COMPONENT, DATA_FRIEND, DATA_REV_FRIEND } from './ds'

import type { Friend } from '@stores/users/types'
import type { RenderItem } from '@types'
import type { Ctx } from '../../types'

function Item({ index, item }: RenderItem<Friend>) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const { filter } = $.state
  const { userId, avatar, userName } = item
  const name = HTMLDecode(userName)
  const menuData =
    !WEB && !$.params.userId ? ($.isRevFriends ? DATA_REV_FRIEND : DATA_FRIEND) : null

  const handlePress = useCallback(() => {
    navigation.push('Zone', {
      userId,
      _name: userName,
      _image: avatar
    })

    t('好友.跳转', {
      to: 'Zone',
      userId
    })
  }, [avatar, navigation, userId, userName])

  const handleSelect = useCallback(
    (title?: string) => {
      if (!title) return

      $.onSelectFriendMenu(title, item, navigation)
    },
    [$, item, navigation]
  )

  return (
    <Container index={index}>
      <Main
        userId={String(userId)}
        avatar={avatar}
        name={name}
        filter={filter}
        menuData={menuData}
        onPress={handlePress}
        onSelect={handleSelect}
      />
    </Container>
  )
}

export default observer(Item)
