/*
 * @Author: czy0729
 * @Date: 2019-04-30 18:47:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-05 20:11:49
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Image, Text, RenderHtml } from '@components'
import { simpleTime } from '@utils'
import { appNavigate } from '@utils/app'
import _, {
  window,
  sm,
  md,
  wind,
  colorPlain,
  colorBg,
  colorBorder
} from '@styles'

const avatarWidth = 28
const imagesMaxWidth = window.width - 2 * wind - avatarWidth - sm
const imagesMaxWidthSub = window.width - 2 * wind - 2 * avatarWidth - 2 * sm

const Item = (
  {
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
  },
  { navigation }
) => {
  const isOdd = (index + 1) % 2 === 0
  const isAuthor = authorId === userId
  return (
    <Flex style={[styles.item, isOdd && styles.itemOdd]} align='start'>
      <Image
        style={styles.image}
        size={avatarWidth}
        src={avatar}
        radius
        border={colorBorder}
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
          baseFontStyle={{
            fontSize: 14,
            lineHeight: 22
          }}
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
                <Image
                  style={styles.subImage}
                  size={avatarWidth}
                  src={item.avatar}
                  radius
                  border={colorBorder}
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
                    baseFontStyle={{
                      fontSize: 13,
                      lineHeight: 20
                    }}
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
Item.contextTypes = {
  navigation: PropTypes.object
}

export default observer(Item)

const styles = StyleSheet.create({
  item: {
    backgroundColor: colorPlain
  },
  itemOdd: {
    backgroundColor: colorBg
  },
  image: {
    marginTop: wind,
    marginLeft: wind
  },
  content: {
    paddingVertical: wind,
    paddingRight: wind
  },
  border: {
    borderTopColor: colorBorder,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  sub: {
    marginTop: md,
    marginBottom: -md
  },
  subImage: {
    marginTop: md
  },
  subContent: {
    paddingVertical: md
  }
})
