/*
 * @Author: czy0729
 * @Date: 2020-12-21 16:03:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-21 02:05:24
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, RenderHtml } from '@components'
import { Avatar, Name } from '@screens/_'
import { _ } from '@stores'
import { getTimestamp, open } from '@utils'
import { obc } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import { HTMLDecode, removeHTMLTag } from '@utils/html'
import { matchUserIdFromAvatar } from '@utils/match'
import decoder from '@utils/thirdParty/html-entities-decoder'
import UserLabel from '../user-label'
import FloorText from '../floor-text'
import IconExtra from '../icon/extra'
import ItemPlusOne from './plus-one'

const avatarWidth = 32
const imagesMaxWidthSub = _.window.width - 2 * _.wind - 2 * avatarWidth - 2 * _.sm
const regPlus = /\+\d/

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
  if ($.isBlockUser(userId, userName, replySub)) return null

  const msg = removeHTMLTag(decoder(message))
  if ($.filterDelete && msg.includes('内容已被用户删除')) return null

  if (msg.length <= 10 && regPlus.test(msg)) {
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

  // 回复引用的用户是屏蔽用户也要隐藏
  const quoteUserName = msg.match(/^(.+?)说:/)?.[1]
  const quoteUser = $.postUsersMap[quoteUserName]
  if (quoteUser) {
    const quoteUserId = matchUserIdFromAvatar(quoteUser.avatar)
    if (quoteUserId && $.isBlockUser(quoteUserId, quoteUserName)) {
      return null
    }
  }

  const { blockKeywords } = $.setting
  if (blockKeywords.some(item => msg.includes(item))) {
    message =
      '<span style="color:#999;font-size:12px">命中自定义关键字，已被App屏蔽</span>'
  }

  const styles = memoStyles()
  const isAuthor = authorId === userId
  const isLayer = !isAuthor && uid === userId
  const isFriend = $.myFriendsMap[userId]
  const isNew = !!readedTime && getTimestamp(time) > readedTime
  const isJump = !!postId && postId === id
  return (
    <Flex style={[isNew && styles.itemNew, isJump && styles.itemJump]} align='start'>
      <Avatar
        style={_.mt.md}
        navigation={navigation}
        userId={userId}
        name={userName}
        src={avatar}
        size={36}
        event={event}
      />
      <Flex.Item style={[styles.subContent, !_.flat && styles.border, _.ml.sm]}>
        <Flex align='start'>
          <Flex.Item>
            <Name
              userId={userId}
              size={userName.length > 10 ? 12 : 14}
              lineHeight={14}
              bold
              right={
                <UserLabel isAuthor={isAuthor} isFriend={isFriend} isLayer={isLayer} />
              }
            >
              {HTMLDecode(userName)}
            </Name>
          </Flex.Item>
          <IconExtra
            replySub={replySub}
            erase={erase}
            userId={userId}
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
    borderBottomWidth: 2,
    borderColor: _.colorSuccess
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
