/*
 * @Author: czy0729
 * @Date: 2022-09-26 22:17:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-18 04:12:40
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, RenderHtml, UserStatus } from '@components'
import { _, systemStore } from '@stores'
import { open, appNavigate, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { Avatar, Name } from '../../../base'
import { memoStyles } from './styles'

const avatarWidth = 20

function Mark(
  { style = undefined, id, message, userId, userName, avatar, url, directFloor, event },
  { navigation }
) {
  const styles = memoStyles()
  const { avatarRound } = systemStore.setting
  const imagesMaxWidthSub = _.window.width - _.wind - avatarWidth - _.sm
  return (
    <Flex style={style ? [styles.item, style] : styles.item}>
      <Flex style={avatarRound ? styles.round : styles.rectangle}>
        <View style={_.mr.sm}>
          <UserStatus userId={userId} mini>
            <Avatar
              navigation={navigation}
              size={avatarWidth}
              userId={userId}
              name={userName}
              src={avatar}
              event={event}
            />
          </UserStatus>
        </View>
        <Name userId={userId} size={10} bold>
          {HTMLDecode(userName)}
        </Name>
      </Flex>
      <RenderHtml
        style={_.ml.sm}
        baseFontStyle={_.baseFontStyle.sm}
        imagesMaxWidth={imagesMaxWidthSub}
        html={message}
        onLinkPress={href => appNavigate(href, navigation, {}, event)}
        onImageFallback={() => open(`${url}#post_${id}`)}
      />

      {/* 高亮 */}
      {directFloor && <View style={styles.direct} pointerEvents='none' />}
    </Flex>
  )
}

export default obc(Mark)
