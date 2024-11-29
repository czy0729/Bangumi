/*
 * @Author: czy0729
 * @Date: 2023-03-13 02:53:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 10:58:25
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import { cnjp, date, getTimestamp } from '@utils'
import { ob } from '@utils/decorators'
import { PREV_DAY_HOUR } from '../../ds'
import { Ctx, SectionListCalendarItem } from '../../types'
import { getTime } from '../../utils'
import ItemGrid from './item-grid'
import ItemLine from './item-line'
import Line from './line'
import { getItemTime } from './utils'

let day = new Date().getDay()
if (day === 0) day = 7

function Item({ item, section }) {
  const { $ } = useStore<Ctx>()
  const items = item.items as SectionListCalendarItem[]
  const current = parseInt(date('Hi', getTimestamp()))
  let renderLine = false

  return (
    <Flex wrap='wrap' align='start'>
      {items.map((item, index) => {
        const prevItem = items?.[index - 1]
        let prevTime = ''
        if (prevItem) prevTime = getTime(prevItem, prevItem.id)

        // @depercated 放送到多少集, 自增 1
        // let { air } = item
        // if (item.air_weekday !== day && air !== 0) air = Number(air) + 1

        const time = getItemTime(item, index, items)
        const passProps = {
          key: item.id,
          subjectId: item.id,
          images: item.images,
          name: cnjp(item.name_cn, item.name),
          desc: cnjp(item.name, item.name_cn),
          rank: item.rank,
          score: item?.rating?.score,
          total: item?.rating?.total,
          // air,
          time,
          prevTime,
          section: section.index,
          index: item.index
        }

        if ($.isList) {
          const showPrevDay = new Date().getHours() < PREV_DAY_HOUR
          const linePosition = section.index === (showPrevDay ? 1 : 0)

          // 当前时间在番组播放之前
          if (linePosition && !renderLine && parseInt(time) > current) {
            renderLine = true
            return (
              <View key={item.id} style={_.container.block}>
                <Line />
                <ItemLine {...passProps} />
              </View>
            )
          }

          // 当前时间之后已没有未播放番组
          if (linePosition && !renderLine && index === items.length - 1) {
            return (
              <View key={item.id} style={_.container.block}>
                <ItemLine {...passProps} />
                <Line />
              </View>
            )
          }

          return <ItemLine {...passProps} />
        }

        return <ItemGrid index={index} {...passProps} />
      })}
    </Flex>
  )
}

export default ob(Item)
