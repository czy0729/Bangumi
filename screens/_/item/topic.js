/*
 * @Author: czy0729
 * @Date: 2019-04-30 18:47:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-19 17:59:10
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, RenderHtml } from '@components'
import { _ } from '@stores'
import { simpleTime } from '@utils'
import { appNavigate } from '@utils/app'
import { EVENT } from '@constants'
import Avatar from '../base/avatar'

const avatarWidth = 32
const imagesMaxWidth = _.window.width - 2 * _.wind - avatarWidth - _.sm
const imagesMaxWidthSub =
  _.window.width - 2 * _.wind - 2 * avatarWidth - 2 * _.sm

function ItemTopic({
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
  sub,
  event
}) {
  if (!userId) {
    return null
  }

  const styles = memoStyles()
  const baseFontStyle = {
    fontSize: 15 + _.fontSizeAdjust,
    lineHeight: 22
  }
  const isOdd = (index + 1) % 2 === 0
  const isAuthor = authorId === userId
  return (
    <Flex style={[styles.item, isOdd && styles.itemOdd]} align='start'>
      <Avatar
        style={styles.image}
        navigation={navigation}
        size={avatarWidth}
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
            </Text>
          </Flex.Item>
          <Text style={_.ml.md} type='sub' size={13}>
            {floor} / {simpleTime(time)}
          </Text>
        </Flex>
        {!!userSign && (
          <Text style={_.mt.xs} type='sub' size={12}>
            {userSign.slice(1, userSign.length - 1)}
          </Text>
        )}
        <RenderHtml
          style={_.mt.sm}
          baseFontStyle={baseFontStyle}
          imagesMaxWidth={imagesMaxWidth}
          html={message}
          onLinkPress={href => appNavigate(href, navigation, {}, event)}
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
                  name={item.userName}
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
                      </Text>
                    </Flex.Item>
                    <Text style={_.ml.md} type='sub' size={13}>
                      {item.floor} / {simpleTime(item.time)}
                    </Text>
                  </Flex>
                  <RenderHtml
                    style={_.mt.sm}
                    baseFontStyle={baseFontStyle}
                    imagesMaxWidth={imagesMaxWidthSub}
                    html={item.message}
                    onLinkPress={href =>
                      appNavigate(href, navigation, {}, event)
                    }
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

ItemTopic.defaultProps = {
  sub: [],
  event: EVENT
}

export default observer(ItemTopic)

const memoStyles = _.memoStyles(_ => ({
  item: {
    backgroundColor: _.colorPlain
  },
  itemOdd: {
    backgroundColor: _.colorBg
  },
  image: {
    marginTop: _.space,
    marginLeft: _.wind
  },
  content: {
    paddingVertical: _.space,
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
