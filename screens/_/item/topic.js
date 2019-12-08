/*
 * @Author: czy0729
 * @Date: 2019-04-30 18:47:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-08 19:42:52
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, RenderHtml } from '@components'
import { _ } from '@stores'
import { simpleTime } from '@utils'
import { appNavigate } from '@utils/app'
import Avatar from '../base/avatar'

const avatarWidth = 28
const imagesMaxWidth = _.window.width - 2 * _.wind - avatarWidth - _.sm
const imagesMaxWidthSub =
  _.window.width - 2 * _.wind - 2 * avatarWidth - 2 * _.sm
const baseFontStyle = {
  fontSize: 14 + _.fontSizeAdjust,
  lineHeight: 22
}

function Item({
  navigation,
  index,
  authorId,
  avatar,
  userId,
  userName,
  userSign,
  message,
  floor,
  time,
  sub = []
}) {
  if (!userId) {
    return null
  }

  const styles = memoStyles()
  const isOdd = (index + 1) % 2 === 0
  const isAuthor = authorId === userId
  return (
    <Flex style={[styles.item, isOdd && styles.itemOdd]} align='start'>
      <Avatar
        style={styles.image}
        navigation={navigation}
        size={avatarWidth}
        src={avatar}
        userId={userId}
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
            </Text>
          </Flex.Item>
          <Text style={_.ml.md} type='sub' size={12}>
            {floor} / {simpleTime(time)}
          </Text>
        </Flex>
        {!!userSign && (
          <Text style={_.mt.xs} type='sub' size={12}>
            {userSign}
          </Text>
        )}
        <RenderHtml
          style={_.mt.sm}
          baseFontStyle={baseFontStyle}
          imagesMaxWidth={imagesMaxWidth}
          html={message}
          onLinkPress={href => appNavigate(href, navigation)}
        />
        <View style={styles.sub}>
          {sub.map(item => {
            const isAuthor = authorId === item.userId
            const isLayer = !isAuthor && userId === item.userId
            return (
              <Flex key={item.id} align='start'>
                <Avatar
                  style={styles.subImage}
                  navigation={navigation}
                  size={avatarWidth}
                  src={item.avatar}
                  userId={item.userId}
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
                      </Text>
                    </Flex.Item>
                    <Text style={_.ml.md} type='sub' size={12}>
                      {item.floor} / {simpleTime(item.time)}
                    </Text>
                  </Flex>
                  <RenderHtml
                    style={_.mt.xs}
                    baseFontStyle={baseFontStyle}
                    imagesMaxWidth={imagesMaxWidthSub}
                    html={item.message}
                    onLinkPress={href => appNavigate(href, navigation)}
                  />
                </Flex.Item>
              </Flex>
            )
          })}
        </View>
      </Flex.Item>
    </Flex>
  )
}

export default observer(Item)

const memoStyles = _.memoStyles(_ => ({
  item: {
    backgroundColor: _.colorPlain
  },
  itemOdd: {
    backgroundColor: _.colorBg
  },
  image: {
    marginTop: _.wind,
    marginLeft: _.wind
  },
  content: {
    paddingVertical: _.wind,
    paddingRight: _.wind
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
  }
}))
