/*
 * @Author: czy0729
 * @Date: 2024-06-05 20:47:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-05 20:47:39
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Mesume, ScrollView, Text, Touchable } from '@components'
import { _, rakuenStore } from '@stores'
import { appNavigate, correctAgo, HTMLDecode, info, stl } from '@utils'
import { obc } from '@utils/decorators'
import { HOST, LIMIT_TOPIC_PUSH } from '@constants'
import { TopicId } from '@types'
import { Ctx } from '../../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function List(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { list, _loaded } = $.myReply
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
    <ScrollView>
      {list.map(({ title, href, replies, userName, tip, time }) => {
        const topicId = href.replace('/group/topic/', 'group/') as TopicId
        const readed = $.readed(topicId)
        const isReaded = !!readed.time

        // 处理 (+30) +10 样式
        const replyText = `+${replies}`
        let replyAdd: string
        if (isReaded) {
          if (Number(replies) > readed.replies) {
            replyAdd = `+${Number(replies) - readed.replies}`
          }
        }

        return (
          <Touchable
            key={href}
            style={stl(styles.item, isReaded && styles.readed)}
            animate
            onPress={() => {
              if (Number(replies) > LIMIT_TOPIC_PUSH) {
                const url = `${HOST}${href}`
                info('该帖评论多, 自动使用浏览器打开')
                setTimeout(() => {
                  open(url)
                }, 1500)
                return
              }

              // 记录帖子查看历史详情
              rakuenStore.updateTopicReaded(topicId, Number(replies))
              appNavigate(href, navigation, {
                _title: title,
                _replies: `+${replies}`,
                _time: time
              })
            }}
          >
            <View style={styles.wrap}>
              <Text size={15} bold>
                {HTMLDecode(title)}
                <Text type={isReaded ? 'sub' : 'main'} size={11} lineHeight={15}>
                  {' '}
                  {replyText}
                </Text>
                {!!replyAdd && (
                  <Text type='main' size={11} lineHeight={15}>
                    {' '}
                    {replyAdd}
                  </Text>
                )}
              </Text>
              <Flex style={_.mt.sm}>
                <Text type='sub' size={11}>
                  最后回复 {correctAgo(time)} / {tip} / {userName}
                </Text>
              </Flex>
            </View>
          </Touchable>
        )
      })}
    </ScrollView>
  )
}

export default obc(List, COMPONENT)
