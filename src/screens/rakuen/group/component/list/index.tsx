/*
 * @Author: czy0729
 * @Date: 2019-07-12 22:44:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 04:31:35
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Mesume, Text, Touchable, UserStatus } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { appNavigate, correctAgo, HTMLDecode, info, open, stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { API_AVATAR, HOST, LIMIT_TOPIC_PUSH } from '@constants'
import { TopicId } from '@types'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function List({ style = undefined }, { $, navigation }: Ctx) {
  const styles = memoStyles()
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
      {list.map(({ title, href, replies, time, userName, userId }, index) => {
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
                t('小组.跳转', {
                  to: 'WebBrowser',
                  url
                })

                info('该帖评论多, 自动使用浏览器打开')
                setTimeout(() => {
                  open(url)
                }, 1500)
              } else {
                // 记录帖子查看历史详情
                $.onItemPress(topicId, replies)
                appNavigate(
                  href,
                  navigation,
                  {
                    _title: title,
                    _replies: `+${replies}`,
                    _group: group,
                    _time: time
                  },
                  {
                    id: '小组.跳转'
                  }
                )
              }
            }}
          >
            <View style={styles.wrap}>
              <Text size={15}>
                {HTMLDecode(title)}
                <Text type={isReaded ? 'sub' : 'main'} size={12} lineHeight={15}>
                  {' '}
                  {replyText}
                </Text>
                {!!replyAdd && (
                  <Text type='main' size={12} lineHeight={15}>
                    {' '}
                    {replyAdd}
                  </Text>
                )}
              </Text>
              <Flex style={_.mt.sm}>
                <UserStatus userId={userId} mini>
                  <Avatar
                    navigation={navigation}
                    size={18}
                    src={API_AVATAR(userId)}
                    userId={userId}
                  />
                </UserStatus>
                <Text style={_.ml.sm} size={12} bold>
                  {userName}
                </Text>
                <Text style={_.ml.xs} type='sub' size={11} bold>
                  {correctAgo(time)}
                </Text>
              </Flex>
            </View>
            {!index && <Heatmap id='小组.跳转' />}
          </Touchable>
        )
      })}
    </View>
  )
}

export default obc(List, COMPONENT)
