/*
 * @Author: czy0729
 * @Date: 2019-07-13 22:44:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-11 04:30:12
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Touchable, Flex, Text, Mesume } from '@components'
import { open } from '@utils'
import { appNavigate } from '@utils/app'
import { observer } from '@utils/decorators'
import { info } from '@utils/ui'
import { HOST, TOPIC_PUSH_LIMIT } from '@constants'
import _ from '@styles'

const List = ({ style }, { $, navigation }) => {
  const { title: group } = $.groupInfo
  const { list, _loaded } = $.group
  if (_loaded && !list.length) {
    return (
      <Flex style={styles.empty} direction='column' justify='center'>
        <Mesume />
        <Text style={_.mt.sm} type='sub'>
          好像什么都没有
        </Text>
      </Flex>
    )
  }

  return (
    <View style={style}>
      {list.map(({ title, href, replies, time, userName }, index) => {
        const topicId = href.replace('/group/topic/', 'group/')
        const readed = $.readed(topicId)
        const isReaded = !!readed.time

        // 处理 (+30) +10 样式
        const replyText = `+${replies}`
        let replyAdd
        if (isReaded) {
          if (replies > readed.replies) {
            replyAdd = `+${replies - readed.replies}`
          }
        }
        return (
          <Touchable
            key={href}
            style={[styles.item, isReaded && styles.readed]}
            highlight
            onPress={() => {
              if (replies > TOPIC_PUSH_LIMIT) {
                info('该帖评论多, 自动使用浏览器打开')
                setTimeout(() => {
                  open(`${HOST}${href}`)
                }, 1600)
              } else {
                // 记录帖子查看历史详情
                $.onItemPress(topicId, replies)
                appNavigate(href, navigation, {
                  _title: title,
                  _replies: `(+${replies})`,
                  _group: group,
                  _time: time
                })
              }
            }}
          >
            <View style={[styles.wrap, !!index && styles.border]}>
              <Text size={16}>
                {title}
                <Text
                  type={isReaded ? 'sub' : 'main'}
                  size={12}
                  lineHeight={16}
                >
                  {' '}
                  ({replyText})
                </Text>
                {!!replyAdd && (
                  <Text type='main' size={12} lineHeight={16}>
                    {' '}
                    {replyAdd}
                  </Text>
                )}
              </Text>
              <Text style={_.mt.sm} type='sub' size={12}>
                {time} / <Text size={12}>{userName}</Text>
              </Text>
            </View>
          </Touchable>
        )
      })}
    </View>
  )
}

List.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(List)

const styles = StyleSheet.create({
  item: {
    paddingLeft: _.md
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  readed: {
    backgroundColor: _.colorBg
  },
  empty: {
    minHeight: 240
  }
})
