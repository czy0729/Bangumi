/*
 * @Author: czy0729
 * @Date: 2020-07-21 13:45:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 时间线列表: 年 -> 月 -> 日 -> 条目 的分组渲染
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Heatmap, Text } from '@components'
import { _, useStore } from '@stores'
import Item from '../item'
import { ACTIONS, COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { ActionsProps, DayProps, MonthProps, YearProps } from './types'
import type { Ctx } from '../../types'

/** 时间线列表 */
function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  return (
    <View style={styles.container}>
      {$.yearsTimeline.map((item, index) => (
        <Year key={item.title} item={item} isFirst={index === 0} days={$.days} />
      ))}
    </View>
  )
}

/** 动作统计 */
const Actions = observer(function Actions({ actions }: ActionsProps) {
  return (
    <Flex style={_.mt.xs}>
      {ACTIONS.map(action =>
        actions[action] ? (
          <Text key={action} style={_.mr.sm} size={13} lineHeight={20} type='sub'>
            {action}{' '}
            <Text size={13} lineHeight={20} type='main' bold>
              {actions[action]}{' '}
            </Text>
          </Text>
        ) : null
      )}
    </Flex>
  )
})

/** 某天的条目 */
const Day = observer(function Day({ item }: DayProps) {
  const styles = memoStyles()
  const [, month, day] = item.title.split('-')

  return (
    <View>
      <View>
        <View style={styles.line} />
        <Text style={_.mv.md} size={16} bold>
          {Number(month)}月{Number(day)}日
        </Text>
      </View>
      <View>
        <View style={styles.line} />
        {item.data.map(entry => (
          <Item key={entry.id} subject={entry.subject} action={entry.action} />
        ))}
      </View>
    </View>
  )
})

/** 某月的动作统计与按天分组 */
const Month = observer(function Month({ item }: MonthProps) {
  const styles = memoStyles()

  return (
    <View>
      <View>
        <View style={styles.line} />
        <View style={styles.nodeMonth} />
        <View style={styles.block}>
          <Text size={18} lineHeight={24} type='title' bold>
            {Number(item.title.slice(5, 7))}月
          </Text>
          <Actions actions={item.actions} />
        </View>
      </View>
      <View>
        {item.data.map(day => (
          <Day key={day.title} item={day} />
        ))}
      </View>
    </View>
  )
})

/** 某年的标题与按月分组 */
const Year = observer(function Year({ item, isFirst, days }: YearProps) {
  const styles = memoStyles()

  return (
    <View>
      {/* 加入时长 */}
      <View>
        <View style={styles.lineBottom} />
        <View style={styles.nodeYear} />
        <Flex>
          <Text size={18} lineHeight={48} type='title' bold>
            {item.title}年{' '}
          </Text>
          {isFirst && (
            <Text style={_.ml.sm} size={12} bold>
              加入 Bangumi
              <Text type='main' size={12} bold>
                {' '}
                {days}{' '}
              </Text>
              天
            </Text>
          )}
        </Flex>
        <Heatmap id='时间线.跳转' />
      </View>

      {/* 月份节点 */}
      {item.data.map(month => (
        <Month key={month.title} item={month} />
      ))}
    </View>
  )
})

export default observer(List)
