/*
 * @Author: czy0729
 * @Date: 2020-12-21 16:24:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-20 15:36:37
 */
import React from 'react'
import { Flex, RenderHtml } from '@components'
import { Avatar, Name } from '@screens/_'
import { _, systemStore } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { appNavigate } from '@utils/app'

const avatarWidth = 32
const imagesMaxWidthSub =
  _.window.width - 2 * _.wind - 2 * avatarWidth - 2 * _.sm

function ItemPlusOne(
  { id, message, userId, userName, avatar, url, event },
  { navigation }
) {
  const styles = memoStyles()
  const { avatarRound } = systemStore.setting
  return (
    <Flex style={_.mb.sm}>
      <Flex style={avatarRound ? styles.round : styles.rectangle}>
        <Avatar
          navigation={navigation}
          size={24}
          userId={userId}
          name={userName}
          src={avatar}
          event={event}
        />
        <Name style={_.ml.sm} userId={userId} size={11} bold>
          {userName}
        </Name>
      </Flex>
      <Flex.Item style={_.ml.sm}>
        <RenderHtml
          baseFontStyle={_.baseFontStyle.sm}
          imagesMaxWidth={imagesMaxWidthSub}
          html={message}
          onLinkPress={href => appNavigate(href, navigation, {}, event)}
          onImageFallback={() => open(`${url}#post_${id}`)}
        />
      </Flex.Item>
    </Flex>
  )
}

export default obc(ItemPlusOne)

const memoStyles = _.memoStyles(_ => ({
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
