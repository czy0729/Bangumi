/*
 * @Author: czy0729
 * @Date: 2022-09-26 22:17:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-02 06:34:52
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Avatar, Flex, RenderHtml, UserStatus } from '@components'
import { _, systemStore } from '@stores'
import { appNavigate, open, stl } from '@utils'
import { useNavigation } from '@utils/hooks'
import { Name } from '../../../base'
import { memoStyles } from './styles'

import type { Props } from './types'

const AVATAR_WIDTH = 20

function Mark({ style, id, message, userId, userName, avatar, url, directFloor, event }: Props) {
  const navigation = useNavigation()

  const styles = memoStyles()

  const handleLinkPress = useCallback(
    (href: string) => {
      appNavigate(href, navigation, {}, event)
    },
    [event, navigation]
  )
  const handleImageFallback = useCallback(() => {
    open(`${url}#post_${id}`)
  }, [id, url])

  return (
    <Flex style={stl(styles.item, style)}>
      <Flex style={systemStore.setting.avatarRound ? styles.round : styles.rectangle}>
        <View style={_.mr.sm}>
          <UserStatus userId={userId} mini>
            <Avatar
              navigation={navigation}
              size={AVATAR_WIDTH}
              userId={userId}
              name={userName}
              src={avatar}
              event={event}
            />
          </UserStatus>
        </View>
        <Name userId={userId} size={10} bold>
          {userName}
        </Name>
      </Flex>

      <RenderHtml
        style={_.ml.sm}
        baseFontStyle={_.baseFontStyle.sm}
        imagesMaxWidth={_.window.width - _.wind - AVATAR_WIDTH - _.sm}
        html={message}
        onLinkPress={handleLinkPress}
        onImageFallback={handleImageFallback}
      />

      {/* 高亮 */}
      {directFloor && <View style={styles.direct} pointerEvents='none' />}
    </Flex>
  )
}

export default observer(Mark)
