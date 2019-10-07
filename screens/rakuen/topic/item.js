/*
 * @Author: czy0729
 * @Date: 2019-04-30 18:47:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-07 20:14:34
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable, RenderHtml } from '@components'
import { Avatar } from '@screens/_'
import { getTimestamp, simpleTime } from '@utils'
import { appNavigate } from '@utils/app'
import _ from '@styles'

const avatarWidth = 28
const imagesMaxWidth = _.window.width - 2 * _.wind - avatarWidth - _.sm
const imagesMaxWidthSub =
  _.window.width - 2 * _.wind - 2 * avatarWidth - 2 * _.sm

function Item(
  {
    index,
    id,
    postId,
    authorId,
    avatar,
    userId,
    userName,
    userSign,
    message,
    floor,
    time,
    sub = [],
    replySub,
    showFixedTextare
  },
  { $, navigation }
) {
  const isOdd = (index + 1) % 2 === 0
  const isAuthor = authorId === userId
  const isFriend = $.myFriendsMap[userId]
  const { _time: readedTime } = $.readed
  let isNew
  if (readedTime) {
    isNew = getTimestamp(time) > readedTime
  }

  const isJump = !!postId && postId === id
  return (
    <Flex
      style={[
        styles.item,
        isOdd && styles.itemOdd,
        isNew && styles.itemNew,
        isJump && styles.itemJump
      ]}
      align='start'
    >
      <Avatar
        style={styles.image}
        navigation={navigation}
        userId={userId}
        src={avatar}
      />
      <Flex.Item style={[styles.content, _.ml.sm]}>
        <Flex>
          <Flex.Item>
            <Text size={12}>
              {userName}
              {isAuthor && (
                <Text type='main' size={12}>
                  {' '}
                  [作者]
                </Text>
              )}
              {isFriend && (
                <Text type='warning' size={12}>
                  {' '}
                  [好友]
                </Text>
              )}
            </Text>
          </Flex.Item>
          <Text style={_.ml.md} type='sub' size={12}>
            {floor} / {simpleTime(time)}
          </Text>
        </Flex>
        {!!userSign && (
          <Text style={styles.sign} type='sub' size={12} numberOfLines={2}>
            {userSign}
          </Text>
        )}
        <RenderHtml
          style={_.mt.sm}
          baseFontStyle={{
            fontSize: 14,
            lineHeight: 22
          }}
          imagesMaxWidth={imagesMaxWidth}
          html={message}
          onLinkPress={href => appNavigate(href, navigation)}
        />
        {!!replySub && (
          <Flex justify='end'>
            <Touchable
              style={styles.reply}
              onPress={() => {
                $.showFixedTextarea(userName, replySub)
                showFixedTextare()
              }}
            >
              <Text type='icon' size={12}>
                回复
              </Text>
            </Touchable>
          </Flex>
        )}
        <View style={styles.sub}>
          {sub.map(item => {
            const isAuthor = authorId === item.userId
            const isLayer = !isAuthor && userId === item.userId
            const isFriend = $.myFriendsMap[item.userId]
            let isNew
            if (readedTime) {
              isNew = getTimestamp(item.time) > readedTime
            }

            const isJump = !!postId && postId === item.id
            return (
              <Flex
                key={item.id}
                style={[isNew && styles.itemNew, isJump && styles.itemJump]}
                align='start'
              >
                <Avatar
                  style={styles.subImage}
                  navigation={navigation}
                  userId={item.userId}
                  src={item.avatar}
                />
                <Flex.Item style={[styles.subContent, styles.border, _.ml.sm]}>
                  <Flex>
                    <Flex.Item>
                      <Text size={12}>
                        {item.userName}
                        {isAuthor && (
                          <Text type='main' size={12}>
                            {' '}
                            [作者]
                          </Text>
                        )}
                        {isLayer && (
                          <Text type='primary' size={12}>
                            {' '}
                            [层主]
                          </Text>
                        )}
                        {isFriend && (
                          <Text type='warning' size={12}>
                            {' '}
                            [好友]
                          </Text>
                        )}
                      </Text>
                    </Flex.Item>
                    <Text style={_.ml.md} type='sub' size={12}>
                      {item.floor} / {simpleTime(item.time)}
                    </Text>
                  </Flex>
                  <RenderHtml
                    style={_.mt.xs}
                    baseFontStyle={{
                      fontSize: 13,
                      lineHeight: 20
                    }}
                    imagesMaxWidth={imagesMaxWidthSub}
                    html={item.message}
                    onLinkPress={href => appNavigate(href, navigation)}
                  />
                  {!!item.replySub && (
                    <Flex justify='end'>
                      <Touchable
                        style={styles.reply}
                        onPress={() => {
                          $.showFixedTextarea(
                            item.userName,
                            item.replySub,
                            item.message
                          )
                          showFixedTextare()
                        }}
                      >
                        <Text type='icon' size={12}>
                          回复
                        </Text>
                      </Touchable>
                    </Flex>
                  )}
                </Flex.Item>
              </Flex>
            )
          })}
        </View>
      </Flex.Item>
    </Flex>
  )
}

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Item)

const styles = StyleSheet.create({
  item: {
    backgroundColor: _.colorPlain
  },
  itemOdd: {
    backgroundColor: _.colorBg
  },
  itemNew: {
    backgroundColor: _.colorMainLight
  },
  itemJump: {
    borderWidth: 2,
    borderColor: _.colorWarning
  },
  image: {
    marginTop: _.wind,
    marginLeft: _.wind
  },
  content: {
    paddingVertical: _.wind,
    paddingRight: _.wind
  },
  sign: {
    marginTop: 6
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  sub: {
    marginTop: _.md,
    marginBottom: -_.md
  },
  subImage: {
    marginTop: _.md
  },
  subContent: {
    paddingVertical: _.md
  },
  reply: {
    padding: _.sm,
    marginRight: -_.sm,
    marginBottom: -_.sm
  }
})
