/*
 * @Author: czy0729
 * @Date: 2023-03-13 02:53:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 03:47:52
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, Iconfont, Text } from '@components'
import { _ } from '@stores'
import { CalendarItem } from '@stores/calendar/types'
import { cnjp, date, getTimestamp } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import ItemGrid from '../item-grid'
import ItemLine from '../item-line'
import { getTime } from '../utils'
import { memoStyles } from './styles'

let day = new Date().getDay()
if (day === 0) day = 7

function Item({ item, section }, { $ }: Ctx) {
  const items = item.items as CalendarItem[]
  const current = parseInt(date('Hi', getTimestamp()))
  let renderLine = false

  return (
    <Flex wrap='wrap' align='start'>
      {items.map((i, idx) => {
        // 如果存在多个同一时间放送的条目, 只在第一个条目显示时间
        let time = getTime(i, i.id)
        if (idx > 0 && time === '2359' && getTime(items[idx - 1], i.id) === time) time = ''

        // 放送到多少集, 自增 1
        let { air } = i
        if (i.air_weekday !== day && air !== 0) air = Number(air) + 1

        const passProps = {
          key: i.id,
          subjectId: i.id,
          images: i.images,
          name: cnjp(i.name_cn, i.name),
          desc: cnjp(i.name, i.name_cn),
          rank: i.rank,
          score: i?.rating?.score,
          total: i?.rating?.total,
          air,
          time,
          section: section.index,
          index: idx
        }

        if ($.isList) {
          const showPrevDay = new Date().getHours() < 12
          const linePosition = section.index === (showPrevDay ? 1 : 0)

          // 当前时间在番组播放之前
          if (linePosition && !renderLine && parseInt(time) > current) {
            renderLine = true
            return (
              <View key={i.id} style={_.container.block}>
                <Line />
                <ItemLine {...passProps} />
              </View>
            )
          }

          // 当前时间之后已没有未播放番组
          if (linePosition && !renderLine && idx === items.length - 1) {
            return (
              <View key={i.id} style={_.container.block}>
                <ItemLine {...passProps} />
                <Line />
              </View>
            )
          }

          return <ItemLine {...passProps} />
        }

        return <ItemGrid index={idx} {...passProps} />
      })}
    </Flex>
  )
}

export default obc(Item)

function Line() {
  const styles = memoStyles()
  return (
    <Flex>
      <Flex.Item style={styles.line} />
      <Iconfont name='md-access-time' color={_.colorMain} size={16} />
      <Text style={_.ml.xs} type='main' bold>
        {date('H:i', getTimestamp())}
      </Text>
      <Flex.Item style={styles.line} />
      <Heatmap id='每日放送.跳转' />
    </Flex>
  )
}
