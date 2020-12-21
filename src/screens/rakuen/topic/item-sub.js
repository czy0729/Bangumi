/*
 * @Author: czy0729
 * @Date: 2020-12-21 16:03:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-21 16:54:08
 */
import React from 'react'
import { Alert } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable, RenderHtml } from '@components'
import { Avatar, Name } from '@screens/_'
import { _ } from '@stores'
import { getTimestamp, simpleTime, open } from '@utils'
import { appNavigate } from '@utils/app'
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
  if (message.length <= 20 && message.includes('+1')) {
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
                    <Text type='main' size={11} lineHeight={14}>
                      {' '}
                      作者
                    </Text>
                  )}
                  {isFriend && !isAuthor && (
                    <Text type='warning' size={11} lineHeight={14}>
                      {' '}
                      好友
                    </Text>
                  )}
                  {isLayer && !isAuthor && !isFriend && (
                    <Text type='primary' size={11} lineHeight={14}>
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
            size={11}
            lineHeight={14}
          >
            {simpleTime(time)}
          </Text>
          <Text style={styles.floor} type='sub' size={10} lineHeight={14}>
            #
          </Text>
          <Text style={styles.time} type='sub' size={11} lineHeight={14}>
            {floor.replace('#', '')}
          </Text>
        </Flex>
        <RenderHtml
          style={_.mt.xs}
          baseFontStyle={_.baseFontStyle.md}
          imagesMaxWidth={imagesMaxWidthSub}
          html={message}
          onLinkPress={href => appNavigate(href, navigation, {}, event)}
          onImageFallback={() => open(`${url}#post_${id}`)}
        />
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
              <Text type='icon' size={11}>
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
              <Text type='icon' size={11}>
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
  }
}))
