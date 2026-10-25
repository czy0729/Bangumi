/*
 * @Author: czy0729
 * @Date: 2026-10-25 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-25 00:00:00
 *
 * 小组帖子列表项
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Heatmap, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import {
  appNavigate,
  correctAgo,
  getTimestamp,
  getVisualLength,
  HTMLDecode,
  info,
  lastDate,
  open,
  stl
} from '@utils'
import { t } from '@utils/fetch'
import { HOST, LIMIT_TOPIC_PUSH } from '@constants'
import { formatReplies, parseReplies } from '@screens/rakuen/utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { TopicId } from '@types'
import type { Ctx } from '../../types'
import type { ItemProps } from './types'

function Item({ href, title, replies, time, userName, index, group, showLastDate }: ItemProps) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  const topicId = href.replace('/group/topic/', 'group/') as TopicId
  const readed = $.readed(topicId)
  const isReaded = !!readed.time
  const repliesCount = parseReplies(replies)

  // 处理 (+30) +10 样式
  const replyText = formatReplies(repliesCount)
  let replyAdd: string
  if (isReaded && repliesCount !== undefined && repliesCount > readed.replies) {
    replyAdd = `+${repliesCount - readed.replies}`
  }

  const text = HTMLDecode(title)
  const visualLength = getVisualLength(text)
  const size = visualLength >= 20 ? 13 : 14

  return (
    <Touchable
      style={stl(styles.item, !!index && styles.border, isReaded && styles.readed)}
      animate
      onPress={() => {
        if (repliesCount !== undefined && repliesCount > LIMIT_TOPIC_PUSH) {
          const url = `${HOST}${href}`
          t('小组.跳转', {
            to: 'WebBrowser',
            url
          })

          info('该帖评论多, 自动使用浏览器打开')
          setTimeout(() => open(url), 1500)
          return
        }

        // 记录帖子历史查看详情
        if (repliesCount !== undefined) $.onItemPress(topicId, repliesCount)
        appNavigate(
          href,
          navigation,
          {
            _title: title,
            _replies: replyText,
            _group: group,
            _time: time
          },
          { id: '小组.跳转' }
        )
      }}
    >
      <View style={styles.wrap}>
        <Text size={size} lineHeight={14}>
          {text}
          <Text type={isReaded ? 'sub' : 'main'} size={12} lineHeight={14}>
            {' '}
            {replyText}
          </Text>
          {!!replyAdd && (
            <Text type='main' size={12} lineHeight={14}>
              {' '}
              {replyAdd}
            </Text>
          )}
        </Text>
        <Text style={_.mt.xs} type='sub' size={12} lineHeight={14} bold>
          {userName} / {showLastDate ? lastDate(getTimestamp(time)) : correctAgo(time)}
        </Text>
      </View>
      {!index && <Heatmap id='小组.跳转' />}
    </Touchable>
  )
}

export default observer(Item)
