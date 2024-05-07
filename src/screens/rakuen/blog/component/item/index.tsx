/*
 * @Author: czy0729
 * @Date: 2019-04-30 18:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 04:39:27
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, RenderHtml, Text, Touchable, UserStatus } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { appNavigate, confirm, open, simpleTime, stl } from '@utils'
import { obc } from '@utils/decorators'
import { EVENT, HOST } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

const avatarWidth = 32
const imagesMaxWidth = _.window.width - 2 * _.wind - avatarWidth - _.sm
const imagesMaxWidthSub = _.window.width - 2 * _.wind - 2 * avatarWidth - 2 * _.sm

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
  { $, navigation }: Ctx
) {
  const styles = memoStyles()
  const baseFontStyle = {
    fontSize: 14 + _.fontSizeAdjust,
    lineHeight: 22
  }
  const isAuthor = authorId === userId
  const isFriend = $.myFriendsMap[userId]
  const isJump = !!postId && postId === id
  let isNew: any

  const { _url } = $.params
  const url = _url || `${HOST}/blog/${$.blogId}`
  return (
    <Flex
      style={stl(styles.item, isNew && styles.itemNew, isJump && styles.itemJump)}
      align='start'
    >
      <View style={styles.image}>
        <UserStatus userId={userId}>
          <Avatar
            navigation={navigation}
            userId={userId}
            name={userName}
            src={avatar}
            event={event}
          />
        </UserStatus>
      </View>
      <Flex.Item style={stl(styles.content, index !== 0 && !_.flat && styles.border, _.ml.sm)}>
        <Flex>
          <Flex.Item>
            <Text size={13} bold>
              {userName}
              {isAuthor && (
                <Text type='main' size={11}>
                  {' '}
                  [作者]
                </Text>
              )}
              {isFriend && (
                <Text type='warning' size={11}>
                  {' '}
                  [好友]
                </Text>
              )}
            </Text>
          </Flex.Item>
          <Text style={[styles.time, _.ml.md]} type='sub' size={11}>
            {simpleTime(time)} {floor}
          </Text>
        </Flex>
        {!!userSign && (
          <Text style={styles.sign} type='sub' size={11} numberOfLines={2}>
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
              onPress={() => {
                confirm('确定删除回复?', () => $.doDeleteReply(erase))
              }}
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
                $.showFixedTextarea(userName, replySub)
                showFixedTextare()
              }}
            >
              <Text type='icon' size={11}>
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
            const isJump = !!postId && postId === item.id
            return (
              <Flex
                key={item.id}
                style={stl(isNew && styles.itemNew, isJump && styles.itemJump)}
                align='start'
              >
                <View style={styles.subImage}>
                  <UserStatus userId={item.userId}>
                    <Avatar
                      navigation={navigation}
                      userId={item.userId}
                      name={item.userName}
                      src={item.avatar}
                      event={event}
                    />
                  </UserStatus>
                </View>
                <Flex.Item style={stl(styles.subContent, !_.flat && styles.border, _.ml.sm)}>
                  <Flex>
                    <Flex.Item>
                      <Text size={13} bold>
                        {item.userName}
                        {isAuthor && (
                          <Text type='main' size={11}>
                            {' '}
                            [作者]
                          </Text>
                        )}
                        {isLayer && (
                          <Text type='primary' size={11}>
                            {' '}
                            [层主]
                          </Text>
                        )}
                        {isFriend && (
                          <Text type='warning' size={11}>
                            {' '}
                            [好友]
                          </Text>
                        )}
                      </Text>
                    </Flex.Item>
                    <Text style={[styles.time, _.ml.md]} type='sub' size={11}>
                      {simpleTime(item.time)} {item.floor}
                    </Text>
                  </Flex>
                  <RenderHtml
                    style={_.mt.xs}
                    baseFontStyle={baseFontStyle}
                    imagesMaxWidth={imagesMaxWidthSub}
                    html={item.message}
                    onLinkPress={href => appNavigate(href, navigation, {}, event)}
                    onImageFallback={() => open(`${url}#post_${item.id}`)}
                  />
                  <Flex justify='end'>
                    {!!item.erase && (
                      <Touchable
                        style={[styles.reply, _.mr.sm]}
                        onPress={() => {
                          confirm('确定删除回复?', () => $.doDeleteReply(item.erase))
                        }}
                      >
                        <Text type='icon' size={11}>
                          删除
                        </Text>
                      </Touchable>
                    )}
                    {!!item.replySub && (
                      <Touchable
                        style={styles.reply}
                        onPress={() => {
                          $.showFixedTextarea(item.userName, item.replySub, item.message)
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
          })}
        </View>
      </Flex.Item>
    </Flex>
  )
}

export default obc(
  Item,
  {
    sub: [],
    event: EVENT
  },
  COMPONENT
)
