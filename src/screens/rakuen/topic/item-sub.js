/*
 * @Author: czy0729
 * @Date: 2020-12-21 16:03:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-26 22:49:03
 */
import React from 'react'
import { Alert, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable, RenderHtml } from '@components'
import { Avatar, Name } from '@screens/_'
import { _ } from '@stores'
import { getTimestamp, simpleTime, open } from '@utils'
import { appNavigate } from '@utils/app'
import { removeHTMLTag } from '@utils/html'
import decoder from '@utils/thirdParty/html-entities-decoder'
import ItemPlusOne from './item-plus-one'

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
                <>
                  {isAuthor && (
                    <Text type='main' size={10} lineHeight={14} bold>
                      {' '}
                      作者
                    </Text>
                  )}
                  {isFriend && !isAuthor && (
                    <Text type='warning' size={10} lineHeight={14} bold>
                      {' '}
                      好友
                    </Text>
                  )}
                  {isLayer && !isAuthor && !isFriend && (
                    <Text type='primary' size={10} lineHeight={14} bold>
                      {' '}
                      层主
                    </Text>
                  )}
                </>
              }
            >
              {userName}
            </Name>
          </Flex.Item>
          <Text
            style={[styles.time, _.ml.md]}
            type='sub'
            size={10}
            lineHeight={14}
          >
            {simpleTime(time)}
          </Text>
          <Text style={styles.floor} type='sub' size={10} lineHeight={14}>
            #
          </Text>
          <Text style={styles.time} type='sub' size={10} lineHeight={14}>
            {floor.replace('#', '')}
          </Text>
        </Flex>
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
        <Flex justify='end'>
          {!!erase && (
            <Touchable
              style={[styles.reply, _.mr.sm]}
              onPress={() =>
                Alert.alert('警告', '确定删除回复?', [
                  {
                    text: '取消',
                    style: 'cancel'
                  },
                  {
                    text: '确定',
                    onPress: () => $.doDeleteReply(erase)
                  }
                ])
              }
            >
              <Text type='icon' size={10}>
                删除
              </Text>
            </Touchable>
          )}
          {!!replySub && (
            <Touchable
              style={styles.reply}
              onPress={() => {
                $.showFixedTextarea(userName, replySub, message)
                showFixedTextare()
              }}
            >
              <Text type='icon' size={10}>
                回复
              </Text>
            </Touchable>
          )}
        </Flex>
      </Flex.Item>
    </Flex>
  )
}

ItemSub.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(ItemSub)

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
  reply: {
    padding: _.sm,
    marginTop: -_.sm,
    marginRight: -_.sm,
    marginBottom: -_.md,
    opacity: _.select(1, 0.64)
  },
  time: {
    opacity: _.select(1, 0.64)
  },
  floor: {
    marginTop: -8,
    marginLeft: _.sm,
    opacity: _.select(1, 0.64)
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
