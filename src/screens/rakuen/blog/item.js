/*
 * @Author: czy0729
 * @Date: 2019-04-30 18:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-19 17:47:54
 */
import React from 'react'
import { Alert, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable, RenderHtml } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { getTimestamp, simpleTime, open } from '@utils'
import { appNavigate } from '@utils/app'
import { HOST, EVENT } from '@constants'

const avatarWidth = 32
const imagesMaxWidth = _.window.width - 2 * _.wind - avatarWidth - _.sm
const imagesMaxWidthSub =
  _.window.width - 2 * _.wind - 2 * avatarWidth - 2 * _.sm

function Item(
  {
    index,
    id,
    postId, // 存在就跳转到对应楼层
    authorId,
    avatar,
    userId,
    userName,
    userSign,
    message,
    floor,
    time,
    sub,
    replySub,
    erase,
    showFixedTextare,
    event
  },
  { $, navigation }
) {
  const styles = memoStyles()
  const baseFontStyle = {
    fontSize: 15 + _.fontSizeAdjust,
    lineHeight: 22
  }
  const isOdd = (index + 1) % 2 === 0
  const isAuthor = authorId === userId
  const isFriend = $.myFriendsMap[userId]
  const isJump = !!postId && postId === id
  const { _time: readedTime } = $.readed
  let isNew
  if (readedTime) {
    isNew = getTimestamp(time) > readedTime
  }

  const { _url } = $.params
  const url = _url || `${HOST}/blog/${$.blogId}`
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
        name={userName}
        src={avatar}
        event={event}
      />
      <Flex.Item style={[styles.content, _.ml.sm]}>
        <Flex>
          <Flex.Item>
            <Text size={13}>
              {userName}
              {isAuthor && (
                <Text type='main' size={13}>
                  {' '}
                  [作者]
                </Text>
              )}
              {isFriend && (
                <Text type='warning' size={13}>
                  {' '}
                  [好友]
                </Text>
              )}
            </Text>
          </Flex.Item>
          <Text style={[styles.time, _.ml.md]} type='sub' size={13}>
            {floor} / {simpleTime(time)}
          </Text>
        </Flex>
        {!!userSign && (
          <Text style={styles.sign} type='sub' size={12} numberOfLines={2}>
            {userSign.slice(1, userSign.length - 1)}
          </Text>
        )}
        <RenderHtml
          style={_.mt.sm}
          baseFontStyle={baseFontStyle}
          imagesMaxWidth={imagesMaxWidth}
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
              <Text type='icon' size={13}>
                删除
              </Text>
            </Touchable>
          )}
          {!!replySub && (
            <Touchable
              style={styles.reply}
              onPress={() => {
                $.showFixedTextarea(userName, replySub)
                showFixedTextare()
              }}
            >
              <Text type='icon' size={13}>
                回复
              </Text>
            </Touchable>
          )}
        </Flex>
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
                  name={item.userName}
                  src={item.avatar}
                  event={event}
                />
                <Flex.Item style={[styles.subContent, styles.border, _.ml.sm]}>
                  <Flex>
                    <Flex.Item>
                      <Text size={13}>
                        {item.userName}
                        {isAuthor && (
                          <Text type='main' size={13}>
                            {' '}
                            [作者]
                          </Text>
                        )}
                        {isLayer && (
                          <Text type='primary' size={13}>
                            {' '}
                            [层主]
                          </Text>
                        )}
                        {isFriend && (
                          <Text type='warning' size={13}>
                            {' '}
                            [好友]
                          </Text>
                        )}
                      </Text>
                    </Flex.Item>
                    <Text style={[styles.time, _.ml.md]} type='sub' size={13}>
                      {item.floor} / {simpleTime(item.time)}
                    </Text>
                  </Flex>
                  <RenderHtml
                    style={_.mt.xs}
                    baseFontStyle={baseFontStyle}
                    imagesMaxWidth={imagesMaxWidthSub}
                    html={item.message}
                    onLinkPress={href =>
                      appNavigate(href, navigation, {}, event)
                    }
                    onImageFallback={() => open(`${url}#post_${item.id}`)}
                  />
                  <Flex justify='end'>
                    {!!item.erase && (
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
                              onPress: () => $.doDeleteReply(item.erase)
                            }
                          ])
                        }
                      >
                        <Text type='icon' size={13}>
                          删除
                        </Text>
                      </Touchable>
                    )}
                    {!!item.replySub && (
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
                        <Text type='icon' size={13}>
                          回复
                        </Text>
                      </Touchable>
                    )}
                  </Flex>
                </Flex.Item>
              </Flex>
            )
          })}
        </View>
      </Flex.Item>
    </Flex>
  )
}

Item.defaultProps = {
  sub: [],
  event: EVENT
}

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Item)

const memoStyles = _.memoStyles(_ => ({
  item: {
    backgroundColor: _.colorPlain
  },
  itemOdd: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  itemNew: {
    backgroundColor: _.colorMainLight
  },
  itemJump: {
    borderWidth: 2,
    borderColor: _.colorWarning
  },
  image: {
    marginTop: _.space,
    marginLeft: _.wind
  },
  content: {
    paddingVertical: _.space,
    paddingRight: _.wind
  },
  sign: {
    marginTop: _.xs
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
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
    marginBottom: -_.sm,
    opacity: 0.64
  },
  time: {
    opacity: 0.5
  }
}))
