/*
 * @Author: czy0729
 * @Date: 2023-03-13 02:53:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 06:54:26
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { _, useStore } from '@stores'
import { cnjp, date, getTimestamp } from '@utils'
import { PREV_DAY_HOUR } from '../../ds'
import { getItemTime, getTime } from '../../utils'
import ItemGrid from './item-grid'
import ItemLine from './item-line'
import Line from './line'
import { COMPONENT } from './ds'

import type { Ctx, SectionListCalendarItem } from '../../types'

let day = new Date().getDay()
if (day === 0) day = 7

function Item({ item, section }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const items = item.items as SectionListCalendarItem[]
  const current = parseInt(date('Hi', getTimestamp()))
  let renderLine = false

  return (
    <Flex wrap='wrap' align='start'>
      {items.map((item, index) => {
        const prevItem = items?.[index - 1]
        let prevTime = ''
        if (prevItem) prevTime = getTime(prevItem, prevItem.id)

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
        } as const

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

export default observer(Item)
