/*
 * @Author: czy0729
 * @Date: 2020-12-21 16:24:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:38:50
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Avatar, Flex, RenderHtml, UserStatus } from '@components'
import { _, systemStore } from '@stores'
import { appNavigate, open } from '@utils'
import { useNavigation } from '@utils/hooks'
import { Name } from '../../../base'
import UserLabel from '../user-label'
import { memoStyles } from './styles'

import type { Props } from './types'

const AVATAR_WIDTH = 20

function ItemPlusOne({
  id,
  message,
  userId,
  userName,
  avatar,
  url,
  directFloor,
  isAuthor,
  isFriend,
  isLayer,
  event
}: Props) {
  const navigation = useNavigation()

  const styles = memoStyles()
  const { avatarRound } = systemStore.setting

  return (
    <View style={styles.item}>
      <Flex>
        <Flex style={avatarRound ? styles.round : styles.rectangle}>
          <UserStatus userId={userId} mini>
            <Avatar
              navigation={navigation}
              size={AVATAR_WIDTH}
              userId={userId}
              name={userName}
              src={avatar}
              radius={avatarRound ? undefined : 5}
              event={event}
            />
          </UserStatus>
          <Name style={_.ml.xs} userId={userId} size={10} bold>
            {userName}
          </Name>
          <UserLabel isAuthor={isAuthor} isFriend={isFriend} isLayer={isLayer} lineHeight={10} />
        </Flex>
        <Flex>
          <RenderHtml
            style={_.ml.sm}
            baseFontStyle={_.baseFontStyle.xs}
            imagesMaxWidth={_.window.width - 2 * _.wind - 2 * AVATAR_WIDTH - 2 * _.sm}
            html={message}
            onLinkPress={href => {
              appNavigate(href, navigation, {}, event)
            }}
            onImageFallback={() => open(`${url}#post_${id}`)}
          />
        </Flex>
      </Flex>

      {/* 高亮 */}
      {directFloor && <View style={styles.direct} pointerEvents='none' />}
    </View>
  )
}

export default observer(ItemPlusOne)
