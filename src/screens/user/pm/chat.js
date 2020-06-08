/*
 * @Author: czy0729
 * @Date: 2020-02-02 05:03:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-19 17:52:33
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, RenderHtml } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { appNavigate } from '@utils/app'

const event = {
  id: '短信.跳转'
}

function Chat(props, { $, navigation }) {
  const styles = memoStyles()
  const { list } = $.pmDetail
  return (
    <View style={styles.container}>
      <Text size={12} type='sub' align='center'>
        {!!list.length && list[0].date}
      </Text>
      {list.map((item, index) => {
        const isMe = item.userId === $.myId
        let showTime = index === 0 || index === list.length - 1
        if (index) {
          const lastItem = list[index - 1]
          if (lastItem.userId !== item.userId) {
            showTime = true
          }
        }

        if (isMe) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <View key={index}>
              {showTime && (
                <Text style={_.mt.md} size={12} type='sub' align='center'>
                  {item.time}
                </Text>
              )}
              <Flex style={_.mt.md} align='start'>
                <Flex.Item>
                  <Flex direction='column' align='end'>
                    <View style={[styles.text, styles.textActive]}>
                      <RenderHtml
                        baseFontStyle={styles.baseFontStyle}
                        html={item.content}
                        onLinkPress={href =>
                          appNavigate(href, navigation, {}, event)
                        }
                      />
                    </View>
                  </Flex>
                </Flex.Item>
                <Avatar
                  style={_.ml.sm}
                  navigation={navigation}
                  src={item.avatar}
                  size={28}
                  userId={item.userId}
                  name={item.name}
                  event={event}
                />
              </Flex>
            </View>
          )
        }

        return (
          // eslint-disable-next-line react/no-array-index-key
          <View key={index}>
            {showTime && (
              <Text style={_.mt.md} size={12} type='sub' align='center'>
                {item.time}
              </Text>
            )}
            <Flex style={_.mt.md} align='start'>
              <Avatar
                navigation={navigation}
                src={item.avatar}
                size={28}
                userId={item.userId}
                name={item.name}
                event={event}
              />
              <Flex.Item style={_.ml.sm}>
                <Flex direction='column' align='start'>
                  <View style={styles.text}>
                    <RenderHtml
                      baseFontStyle={styles.baseFontStyle}
                      html={item.content}
                      onLinkPress={href =>
                        appNavigate(href, navigation, {}, event)
                      }
                    />
                  </View>
                </Flex>
              </Flex.Item>
            </Flex>
          </View>
        )
      })}
    </View>
  )
}

Chat.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Chat)

const memoStyles = _.memoStyles(_ => ({
  loading: {
    height: 240
  },
  container: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind
  },
  baseFontStyle: {
    fontSize: 14 + _.fontSizeAdjust,
    lineHeight: 22
  },
  text: {
    padding: 12,
    marginRight: 24,
    backgroundColor: _.colorPlain,
    borderRadius: 16,
    borderTopLeftRadius: 0
  },
  textActive: {
    marginRight: 0,
    marginLeft: 24,
    backgroundColor: _.colorPlain,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 16
  }
}))

// function getBgmHtml(html = '') {
//   let _html = html
//   const matchs = _html.match(/\(bgm\d+\)/g) || []
//   if (matchs.length) {
//     matchs.forEach(item => {
//       const index = parseInt(item.match(/\d+/g)[0])

//       // 防止2连同一个bgm表情, 替换不了后面的
//       _html = _html.replace(item, `<img smileid alt="(bgm~~~${index})" />`)
//     })
//   }

//   return _html.replace(/~~~/g, '')
// }
