/*
 * @Author: czy0729
 * @Date: 2019-07-12 22:44:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-27 16:53:07
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Mesume, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import {
  appNavigate,
  correctAgo,
  getTimestamp,
  HTMLDecode,
  info,
  lastDate,
  open,
  stl
} from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { HOST, LIMIT_TOPIC_PUSH } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { TopicId, WithViewStyles } from '@types'
import type { Ctx } from '../../types'

function List({ style }: WithViewStyles) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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

    const { showLastDate } = $.state
    return (
      <View style={style}>
        {list.map(({ title, href, replies, time, userName }, index) => {
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
                  t('小组.跳转', { to: 'WebBrowser', url })

                  info('该帖评论多, 自动使用浏览器打开')
                  setTimeout(() => open(url), 1500)
                  return
                }

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
                  { id: '小组.跳转' }
                )
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
                <Text style={_.mt.xs} type='sub' size={12} lineHeight={13} bold>
                  {userName} / {showLastDate ? lastDate(getTimestamp(time)) : correctAgo(time)}
                </Text>
              </View>
              {!index && <Heatmap id='小组.跳转' />}
            </Touchable>
          )
        })}
      </View>
    )
  })
}

export default List
