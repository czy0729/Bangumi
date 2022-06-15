/*
 * @Author: czy0729
 * @Date: 2020-12-21 16:24:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-08 14:53:40
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, RenderHtml } from '@components'
import { _, systemStore } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import { HTMLDecode } from '@utils/html'
import { Avatar, Name } from '../../base'

const avatarWidth = 20

function ItemPlusOne(
  { id, message, userId, userName, avatar, url, event },
  { navigation }
) {
  const styles = memoStyles()
  const { avatarRound } = systemStore.setting
  const imagesMaxWidthSub = _.window.width - 2 * _.wind - 2 * avatarWidth - 2 * _.sm
  return (
    <View style={styles.item}>
      <Flex>
        <Flex style={avatarRound ? styles.round : styles.rectangle}>
          <Avatar
            style={_.mr.xs}
            navigation={navigation}
            size={avatarWidth}
            userId={userId}
            name={userName}
            src={avatar}
            event={event}
          />
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
      </Flex>
    </View>
  )
}

export default obc(ItemPlusOne)

const memoStyles = _.memoStyles(() => ({
  item: {
    paddingRight: _.sm + 2,
    paddingBottom: _.sm
  },
  round: {
    padding: 4,
    paddingRight: 12,
    backgroundColor: _.colorBg,
    borderRadius: 16
  },
  rectangle: {
    padding: 4,
    paddingRight: 8,
    backgroundColor: _.colorBg,
    borderRadius: _.radiusXs
  }
}))
