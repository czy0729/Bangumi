/*
 * @Author: czy0729
 * @Date: 2020-12-21 16:03:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-20 20:04:46
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, RenderHtml } from '@components'
import { Avatar, Name } from '@screens/_'
import { _ } from '@stores'
import { getTimestamp, open } from '@utils'
import { obc } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import { removeHTMLTag } from '@utils/html'
import decoder from '@utils/thirdParty/html-entities-decoder'
import UserLabel from '../user-label'
import FloorText from '../floor-text'
import IconExtra from '../icon/extra'
import ItemPlusOne from './plus-one'

const avatarWidth = 32
const imagesMaxWidthSub =
  _.window.width - 2 * _.wind - 2 * avatarWidth - 2 * _.sm

function ItemSub(
  {
    id,
    message,
    userId,
    userName,
    avatar,
    floor,
    erase,
    replySub,
    time,
    postId,
    authorId,
    uid,
    url,
    readedTime,
    showFixedTextare,
    event
  },
  { $, navigation }
) {
  const msg = removeHTMLTag(decoder(message))
  if ($.filterDelete && msg.includes('内容已被用户删除')) {
    return null
  }

  if (msg.length <= 10 && msg.includes('+1')) {
    return (
      <ItemPlusOne
        id={id}
        message={message}
        userId={userId}
        userName={userName}
        avatar={avatar}
        time={time}
        floor={floor}
        url={url}
        event={event}
      />
    )
  }

  const styles = memoStyles()
  const isAuthor = authorId === userId
  const isLayer = !isAuthor && uid === userId
  const isFriend = $.myFriendsMap[userId]
  const isNew = !!readedTime && getTimestamp(time) > readedTime
  const isJump = !!postId && postId === id
  const quoteUserName = msg.match(/^(.+?)说:/)?.[1]
  const quoteUser = $.postUsersMap[quoteUserName]

  return (
    <Flex
      style={[isNew && styles.itemNew, isJump && styles.itemJump]}
      align='start'
    >
      <Avatar
        style={_.mt.md}
        navigation={navigation}
        userId={userId}
        name={userName}
        src={avatar}
        event={event}
      />
      <Flex.Item style={[styles.subContent, !_.flat && styles.border, _.ml.sm]}>
        <Flex>
          <Flex.Item>
            <Name
              userId={userId}
              size={userName.length > 10 ? 12 : 14}
              lineHeight={14}
              bold
              right={
                <UserLabel
                  isAuthor={isAuthor}
                  isFriend={isFriend}
                  isLayer={isLayer}
                />
              }
            >
              {userName}
            </Name>
          </Flex.Item>
          <IconExtra
            replySub={replySub}
            erase={erase}
            userName={userName}
            message={message}
            showFixedTextare={showFixedTextare}
          />
        </Flex>
        <FloorText time={time} floor={floor} />
        <View style={_.mt.xs}>
          <RenderHtml
            baseFontStyle={_.baseFontStyle.md}
            imagesMaxWidth={imagesMaxWidthSub}
            html={message}
            onLinkPress={href => appNavigate(href, navigation, {}, event)}
            onImageFallback={() => open(`${url}#post_${id}`)}
          />
          {!!quoteUser && (
            <Flex style={styles.quoteUserRound}>
              <Avatar
                navigation={navigation}
                size={13}
                userId={quoteUser.userId}
                name={quoteUser.userName}
                src={quoteUser.avatar}
                event={event}
              />
              <Text type={_.select('desc', 'sub')} size={12} bold>
                {' '}
                {quoteUser.userName}:
              </Text>
            </Flex>
          )}
        </View>
      </Flex.Item>
    </Flex>
  )
}

export default obc(ItemSub)

const memoStyles = _.memoStyles(_ => ({
  itemNew: {
    backgroundColor: _.colorMainLight
  },
  itemJump: {
    borderWidth: 2,
    borderColor: _.colorWarning
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  subContent: {
    paddingVertical: _.md
  },
  quoteUserRound: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    padding: 2,
    backgroundColor: _.colorBg
  }
}))
