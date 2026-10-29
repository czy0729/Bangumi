/*
 * @Author: czy0729
 * @Date: 2020-10-23 11:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 *
 * 搜索结果项: 布局与小组帖子行一致
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Highlight, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { t } from '@utils/fetch'
import { COMPONENT, LENGTH } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Item({ index, id, title, message, userName, time, group, replies }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  const { keyword } = $.state
  const keywords = keyword.split(/\s+/).filter(Boolean)

  // 摘要窗口按最靠前的命中词定位
  const lowerMessage = message.toLocaleLowerCase()
  const offset = keywords.reduce((min, item) => {
    const index = lowerMessage.indexOf(item.toLocaleLowerCase())
    if (index === -1) return min

    return min === -1 ? index : Math.min(min, index)
  }, -1)
  const content =
    offset < LENGTH ? message.slice(0, LENGTH) : message.slice(48, LENGTH + offset - 48)

  return (
    <Touchable
      style={stl(styles.item, !!index && styles.border)}
      animate
      onPress={() => {
        navigation.push('Topic', {
          topicId: `group/${id}`
        })

        t('帖子搜索.跳转', {
          to: 'Topic',
          topicId: `group/${id}`
        })
      }}
    >
      <View style={styles.wrap}>
        <Flex align='start'>
          <Flex.Item>
            <Highlight size={14} lineHeight={14} bold value={keywords}>
              {title}
            </Highlight>
          </Flex.Item>
          <Text style={_.ml.md} type='sub' size={12} lineHeight={13} bold>
            {replies || 0} 回复
          </Text>
        </Flex>
        <Text style={_.mt.xs} type='sub' size={12} lineHeight={14} bold>
          最后回复 {time}
          {!!group && ` / ${group}`}
          {` / ${userName}`}
        </Text>
        {!!content && (
          <Highlight style={_.mt.xs} lineHeight={16} value={keywords}>
            {content}
          </Highlight>
        )}
      </View>
      {!index && <Heatmap id='帖子搜索.跳转' />}
    </Touchable>
  )
}

export default observer(Item)
