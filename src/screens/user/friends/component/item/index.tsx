/*
 * @Author: czy0729
 * @Date: 2024-04-12 02:17:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 10:59:43
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Avatar, Flex, Highlight, Touchable, UserStatus } from '@components'
import { InView, Name, Popover } from '@_'
import { _, useStore } from '@stores'
import { getVisualLength, HTMLDecode } from '@utils'
import { t } from '@utils/fetch'
import { WEB } from '@constants'
import { COMPONENT, DATA_FRIEND, DATA_REV_FRIEND } from './ds'
import { memoStyles } from './styles'

import type { Friend } from '@stores/users/types'
import type { RenderItem } from '@types'
import type { Ctx } from '../../types'

function Item({ index, item }: RenderItem<Friend>) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  const { filter } = $.state
  const { userId, avatar, userName } = item
  const name = HTMLDecode(userName)
  const visualLength = getVisualLength(name)

  const textProps = {
    style: _.mt.sm,
    size: visualLength > 7 ? 8 : visualLength > 6 ? 9 : visualLength > 5 ? 10 : 11,
    lineHeight: 11,
    bold: true,
    numberOfLines: 1
  } as const

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

  const menuData =
    !WEB && !$.params.userId ? ($.isRevFriends ? DATA_REV_FRIEND : DATA_FRIEND) : null

  const elContent = (
    <>
      <InView style={styles.inView} y={110 * (Math.floor(index / $.numColumns) + 1)}>
        <UserStatus userId={userId}>
          <Avatar size={styles.item.width} src={avatar} radius />
        </UserStatus>
      </InView>

      <Flex>
        {filter ? (
          <Highlight {...textProps} value={filter}>
            {name}
          </Highlight>
        ) : (
          <Name {...textProps} userId={userId}>
            {name}
          </Name>
        )}
      </Flex>

      <Highlight style={_.mt.xs} type='sub' size={9} bold numberOfLines={1} value={filter}>
        {userId}
      </Highlight>
    </>
  )

  const elItem = menuData ? (
    <Popover data={menuData} activateOn='hold' onPress={handlePress} onSelect={handleSelect}>
      {elContent}
    </Popover>
  ) : (
    <Touchable animate scale={0.9} onPress={handlePress}>
      {elContent}
    </Touchable>
  )

  return <View style={styles.item}>{elItem}</View>
}

export default observer(Item)
