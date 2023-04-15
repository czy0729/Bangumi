/*
 * @Author: czy0729
 * @Date: 2021-04-07 10:23:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 17:21:13
 */
import React from 'react'
import { ScrollView, Touchable, Flex, Text, Mesume, Heatmap } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { open, info, appNavigate, correctAgo, stl, HTMLDecode } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { API_AVATAR, HOST, LIMIT_TOPIC_PUSH } from '@constants'
import { TopicId } from '@types'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function List(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { list, _loaded } = $.board
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
    <ScrollView contentContainerStyle={_.container.bottom} scrollToTop>
      {list.map(({ title, href, replies, time, userId, userName }, index) => {
        const topicId = href.replace('/subject/topic/', 'subject/') as TopicId
        const readed = $.readed(topicId)
        const isReaded = !!readed.time
        const replyText = `+${replies.replace(' replies', '')}`
        return (
          <Touchable
            key={href}
            style={stl(styles.item, isReaded && styles.readed)}
            animate
            onPress={() => {
              if (Number(replies) > LIMIT_TOPIC_PUSH) {
                const url = `${HOST}${href}`
                t('讨论版.跳转', {
                  to: 'WebBrowser',
                  url
                })

                info('该帖评论多, 自动使用浏览器打开')
                setTimeout(() => {
                  open(url)
                }, 1600)
              } else {
                // 记录帖子查看历史详情
                $.onItemPress(topicId, replies)
                appNavigate(
                  href,
                  navigation,
                  {
                    _title: title,
                    _replies: replyText,
                    _time: time
                  },
                  {
                    id: '讨论版.跳转'
                  }
                )
              }
            }}
          >
            <Flex style={styles.wrap} align='start'>
              <Avatar
                style={_.mr.sm}
                navigation={navigation}
                userId={userId}
                name={userName}
                src={API_AVATAR(userId)}
              />
              <Flex.Item>
                <Text size={15}>
                  {HTMLDecode(title)}
                  {replyText !== '+0' && (
                    <Text
                      type={isReaded ? 'sub' : 'main'}
                      size={12}
                      lineHeight={15}
                      bold
                    >
                      {' '}
                      {replyText}
                    </Text>
                  )}
                </Text>
                <Text style={_.mt.xs} type='sub' size={12}>
                  {correctAgo(time)} /{' '}
                  <Text size={12} bold>
                    {userName}
                  </Text>
                </Text>
              </Flex.Item>
            </Flex>
            {!index && <Heatmap id='讨论版.跳转' />}
          </Touchable>
        )
      })}
    </ScrollView>
  )
}

export default obc(List)
