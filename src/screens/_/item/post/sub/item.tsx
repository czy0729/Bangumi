/*
 * @Author: czy0729
 * @Date: 2022-10-18 04:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-02 05:58:33
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, UserStatus } from '@components'
import { _, systemStore } from '@stores'
import {
  HTMLDecode,
  getTimestamp,
  matchUserIdFromAvatar,
  removeHTMLTag,
  stl
} from '@utils'
import { memo } from '@utils/decorators'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { Avatar, Name, HTML, Likes } from '../../../base'
import FloorText from '../floor-text'
import IconExtra from '../icon-extra'
import Mark from '../mark'
import PlusOne from '../plus-one'
import UserLabel from '../user-label'
import { layoutHeightMap } from '../utils'
import { IMAGES_MAX_WIDTH_SUB, REG_MARK } from '../ds'
import { DEFAULT_PROPS, REG_BGM, REG_PLUS } from './ds'

export default memo(
  ({
    navigation,
    styles,
    extraStyle,
    topicId,
    authorId,
    avatar,
    blockKeywords,
    erase,
    filterDelete,
    floor,
    directFloor,
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
    likeType,
    event,
    onLikesLongPress
  }) => {
    // global.rerender('Topic.ItemSub.Main')

    const msg = decoder(message)
    const rawMsg = removeHTMLTag(msg)
    const isDelete = rawMsg.includes('删除了回复')
    if (filterDelete && isDelete) return null

    const isAuthor = authorId === userId
    const isLayer = !isAuthor && uid === userId
    const isFriend = myFriendsMap[userId]

    // +N 的楼层, 只有表情的楼层
    if (
      isDelete ||
      (rawMsg.length <= 10 && REG_PLUS.test(rawMsg)) ||
      REG_BGM.test(msg.trim())
    ) {
      return (
        <PlusOne
          id={id}
          message={message}
          userId={userId}
          userName={userName}
          avatar={avatar}
          url={url}
          directFloor={directFloor}
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
          directFloor={directFloor}
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
        '<span style="color:#999;font-size:12px">命中自定义关键字，已被屏蔽</span>'
    }

    const isNew = !!readedTime && getTimestamp(time) > readedTime
    const isJump = !!postId && postId === id
    const showQuoteAvatar = quote && quoteAvatar && !!quoteUser
    return (
      <Flex
        style={styles.item}
        align='start'
        onLayout={e => {
          layoutHeightMap.set(Number(id), e.nativeEvent.layout.height)
        }}
      >
        {/* 头像 */}
        <UserStatus userId={userId}>
          <Avatar
            style={_.mt.md}
            navigation={navigation}
            userId={userId}
            name={userName}
            src={avatar}
            size={36}
            event={event}
          />
        </UserStatus>

        {/* 主楼层 */}
        <Flex.Item style={styles.content}>
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
              style={extraStyle}
              topicId={topicId}
              id={id}
              formhash={formhash}
              likeType={likeType}
              replySub={replySub}
              erase={erase}
              userId={userId}
              userName={userName}
              message={message}
              msg={msg}
              showFixedTextare={showFixedTextare}
            />
          </Flex>
          <FloorText time={time} floor={floor} isNew={isNew} />
          <View style={styles.html}>
            <HTML
              navigation={navigation}
              style={wide && styles.wide}
              id={id}
              msg={msg}
              url={url}
              imagesMaxWidth={IMAGES_MAX_WIDTH_SUB}
              matchLink={matchLink}
              event={event}
            />
            {!!translate && (
              <Text style={styles.translate} size={11}>
                {translate}
              </Text>
            )}
            {showQuoteAvatar && (
              <Flex
                style={stl(styles.quoteUserRound, wide && styles.quoteUserRoundWide)}
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
            <Likes
              style={wide && styles.likesWide}
              topicId={topicId}
              id={id}
              formhash={formhash}
              likeType={likeType}
              onLongPress={onLikesLongPress}
            />
          </View>
        </Flex.Item>

        {/* 高亮 */}
        {directFloor ? (
          <View style={styles.direct} pointerEvents='none' />
        ) : isJump ? (
          <View style={[styles.direct, styles.directJump]} pointerEvents='none' />
        ) : null}
      </Flex>
    )
  },
  DEFAULT_PROPS
)
