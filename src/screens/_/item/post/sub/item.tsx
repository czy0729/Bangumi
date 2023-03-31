/*
 * @Author: czy0729
 * @Date: 2022-10-18 04:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-31 07:44:29
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, RenderHtml, UserStatus } from '@components'
import { _, systemStore } from '@stores'
import {
  HTMLDecode,
  appNavigate,
  getTimestamp,
  matchUserIdFromAvatar,
  open,
  removeHTMLTag,
  stl
} from '@utils'
import { memo } from '@utils/decorators'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { Avatar, Name } from '../../../base'
import FloorText from '../floor-text'
import IconExtra from '../icon-extra'
import Mark from '../mark'
import PlusOne from '../plus-one'
import UserLabel from '../user-label'
import Likes from '../likes'
import { REG_MARK } from '../ds'
import { DEFAULT_PROPS, REG_BGM, REG_PLUS, AVATAR_WIDTH } from './ds'

export default memo(
  ({
    navigation,
    styles,
    topicId,
    authorId,
    avatar,
    blockKeywords,
    erase,
    filterDelete,
    floor,
    id,
    isBlockUser,
    matchLink,
    message,
    myFriendsMap,
    postId,
    postUsersMap,
    quote,
    quoteAvatar,
    wide,
    readedTime,
    replySub,
    showFixedTextare,
    time,
    translate,
    uid,
    url,
    userId,
    userName,
    formhash,
    event
  }) => {
    global.rerender('Topic.ItemSub.Main')

    let msg = decoder(message)
    const rawMsg = removeHTMLTag(msg)
    if (filterDelete && rawMsg.includes('内容已被用户删除')) return null

    const isAuthor = authorId === userId
    const isLayer = !isAuthor && uid === userId
    const isFriend = myFriendsMap[userId]

    // +N 的楼层, 只有表情的楼层
    if ((rawMsg.length <= 10 && REG_PLUS.test(rawMsg)) || REG_BGM.test(msg.trim())) {
      return (
        <PlusOne
          id={id}
          message={message}
          userId={userId}
          userName={userName}
          avatar={avatar}
          url={url}
          isAuthor={isAuthor}
          isFriend={isFriend}
          isLayer={isLayer}
          event={event}
        />
      )
    }

    // mark 的楼层
    if (rawMsg.length <= 8 && REG_MARK.test(rawMsg)) {
      return (
        <Mark
          id={id}
          message={msg}
          userId={userId}
          userName={userName}
          avatar={avatar}
          url={url}
          event={event}
        />
      )
    }

    // 回复引用的用户是屏蔽用户也要隐藏
    const quoteUserName = rawMsg.match(/^(.+?)说:/)?.[1]
    const quoteUser = quoteUserName ? postUsersMap[quoteUserName] : ''
    if (quoteUser) {
      const quoteUserId = matchUserIdFromAvatar(quoteUser.avatar)
      if (
        quoteUserId &&
        typeof isBlockUser === 'function' &&
        isBlockUser(quoteUserId, quoteUserName)
      ) {
        return null
      }
    }

    if (blockKeywords.some(item => rawMsg.includes(item))) {
      message =
        '<span style="color:#999;font-size:12px">命中自定义关键字，已被App屏蔽</span>'
    }

    // 遗留问题, 给宣传语增加一点高度
    msg = msg.replace(
      '<span style="font-size:10px; line-height:10px;">[来自Bangumi for',
      '<span style="font-size:10px; line-height:20px;">[来自Bangumi for'
    )

    const isNew = !!readedTime && getTimestamp(time) > readedTime
    const isJump = !!postId && postId === id
    const showQuoteAvatar = quote && quoteAvatar && !!quoteUser
    const imagesMaxWidthSub = _.window.width - 2 * _.wind - 2 * AVATAR_WIDTH - 2 * _.sm
    return (
      <Flex
        style={stl(isNew && styles.itemNew, isJump && styles.itemJump)}
        align='start'
      >
        <View style={_.mt.md}>
          <UserStatus userId={userId}>
            <Avatar
              navigation={navigation}
              userId={userId}
              name={userName}
              src={avatar}
              size={36}
              event={event}
            />
          </UserStatus>
        </View>
        <Flex.Item style={styles.subContent}>
          <Flex align='start'>
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
                {HTMLDecode(userName)}
              </Name>
            </Flex.Item>
            <IconExtra
              id={id}
              replySub={replySub}
              erase={erase}
              userId={userId}
              userName={userName}
              message={message}
              msg={msg}
              showFixedTextare={showFixedTextare}
            />
          </Flex>
          <FloorText time={time} floor={floor} />
          <View style={_.mt.xs}>
            <RenderHtml
              style={wide && styles.wide}
              baseFontStyle={_.baseFontStyle.md}
              imagesMaxWidth={imagesMaxWidthSub}
              html={msg}
              matchLink={matchLink}
              onLinkPress={href => appNavigate(href, navigation, {}, event)}
              onImageFallback={() => open(`${url}#post_${id}`)}
            />
            {!!translate && (
              <Text style={styles.translate} size={11}>
                {translate}
              </Text>
            )}
            {showQuoteAvatar && (
              <Flex
                style={
                  wide
                    ? [styles.quoteUserRound, styles.quoteUserRoundWide]
                    : styles.quoteUserRound
                }
              >
                <Avatar
                  navigation={navigation}
                  size={13}
                  userId={quoteUser.userId}
                  name={quoteUser.userName}
                  src={quoteUser.avatar}
                  radius={systemStore.setting.avatarRound ? undefined : 4}
                  event={event}
                />
                <Text type={_.select('desc', 'sub')} size={12} bold>
                  {' '}
                  {quoteUser.userName}:
                </Text>
              </Flex>
            )}
            <Likes topicId={topicId} id={id} formhash={formhash} />
          </View>
        </Flex.Item>
      </Flex>
    )
  },
  DEFAULT_PROPS
)
