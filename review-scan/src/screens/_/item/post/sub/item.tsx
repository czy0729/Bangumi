/*
 * @Author: czy0729
 * @Date: 2022-10-18 04:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 05:02:05
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar, Component, Flex, Text } from '@components'
import { _, systemStore } from '@stores'
import { getIsBlocked, getTimestamp, matchUserIdFromAvatar, removeHTMLTag, stl } from '@utils'
import { memo } from '@utils/decorators'
import decoder from '@utils/thirdParty/html-entities-decoder'
import { EVENT, FROZEN_ARRAY, FROZEN_FN, FROZEN_OBJECT } from '@constants'
import { BlogId, TopicId } from '@types'
import { IMAGES_MAX_WIDTH_SUB, REG_MARK } from '../ds'
import { Likes, Name, UserAge, UserStatusAvatar } from '../../../base'
import CollapsedHtml from '../collapsed-html'
import FloorNew from '../floor-new'
import FloorText from '../floor-text'
import IconExtra from '../icon-extra'
import Mark from '../mark'
import PlusOne from '../plus-one'
import UserLabel from '../user-label'
import { layoutHeightMap } from '../utils'
import { DEFAULT_PROPS, REG_BGM, REG_PLUS } from './ds'

export default memo(
  ({
    navigation,
    styles,
    extraStyle,
    topicId = '' as TopicId | BlogId,
    authorId = '',
    avatar = '',
    blockKeywords = FROZEN_ARRAY,
    erase = '',
    filterDelete = true,
    floor = '',
    directFloor = false,
    id = 0,
    isBlockUser = false,
    matchLink = false,
    message = '',
    myFriendsMap = FROZEN_OBJECT,
    postId = '',
    postUsersMap = FROZEN_OBJECT,
    quote = true,
    quoteAvatar = true,
    wide = false,
    readedTime = '',
    replySub = '',
    time = '',
    translate = '',
    uid = '',
    url = '',
    userId = '',
    userName = '',
    formhash = '',
    like = false,
    likeType = '',
    newFloorStyle = '角标',
    event = EVENT,
    onJumpTo = FROZEN_FN,
    onLikesLongPress = FROZEN_FN,
    onShowFixedTextare = FROZEN_FN
  }) => {
    const msg = decoder(message)
    const rawMsg = removeHTMLTag(msg)
    const isDelete = rawMsg.includes('删除了回复')
    if (filterDelete && isDelete) return null

    const isAuthor = authorId === userId
    const isLayer = !isAuthor && uid === userId
    const isFriend = myFriendsMap[userId]

    // +N 的楼层, 只有表情的楼层
    if (isDelete || (rawMsg.length <= 10 && REG_PLUS.test(rawMsg)) || REG_BGM.test(msg.trim())) {
      return (
        <Component id='item-post-sub' data-key={id} data-type='plus-one'>
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
        </Component>
      )
    }

    // mark 的楼层
    if (rawMsg.length <= 8 && REG_MARK.test(rawMsg)) {
      return (
        <Component id='item-post-sub' data-key={id} data-type='mark'>
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
        </Component>
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

    if (getIsBlocked(blockKeywords, rawMsg, `Topic|${id}`)) {
      message = '<span style="color:#999;font-size:12px">已屏蔽</span>'
    }

    let isNew = false
    if (newFloorStyle !== '不设置') isNew = !!readedTime && getTimestamp(time) > readedTime

    const isJump = !!postId && postId === id
    const showQuoteAvatar = quote && quoteAvatar && !!quoteUser
    return (
      <Component id='item-post-sub' data-key={id} style={_.container.block}>
        {newFloorStyle === '角标' && isNew && <FloorNew mini />}

        <Flex
          style={stl(styles.item, newFloorStyle === '背景' && isNew && styles.new)}
          align='start'
          onLayout={e => {
            try {
              layoutHeightMap.set(Number(id), Math.max(1, e.nativeEvent.layout.height))
            } catch (error) {}
          }}
        >
          {/* 头像 */}
          <UserStatusAvatar
            navigation={navigation}
            like={like}
            userId={userId}
            userName={userName}
            avatar={avatar}
            size={36}
            event={event}
          />

          {/* 主楼层 */}
          <Flex.Item style={styles.content}>
            <Flex align='start'>
              <Flex.Item>
                <Flex>
                  <Name
                    userId={userId}
                    size={userName.length > 10 ? 12 : 14}
                    lineHeight={14}
                    bold
                    right={<UserLabel isAuthor={isAuthor} isFriend={isFriend} isLayer={isLayer} />}
                  >
                    {userName}
                  </Name>
                  {systemStore.setting.userAge && (
                    <Flex.Item>
                      <UserAge style={styles.userAge} value={userId} avatar={avatar} />
                    </Flex.Item>
                  )}
                </Flex>
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
                onJumpTo={onJumpTo}
                onShowFixedTextare={onShowFixedTextare}
              />
            </Flex>
            <FloorText time={time} floor={floor} isNew={newFloorStyle === '红点' && isNew} />
            <View style={styles.html}>
              <CollapsedHtml
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
                <Text style={styles.translate} size={11} lineHeight={13}>
                  {translate.trim()}
                </Text>
              )}
              {showQuoteAvatar && (
                <Flex style={stl(styles.quoteUserRound, wide && styles.quoteUserRoundWide)}>
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
                style={stl(styles.likes, wide && styles.likesWide)}
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
      </Component>
    )
  },
  DEFAULT_PROPS
)
