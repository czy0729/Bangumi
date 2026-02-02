/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:34:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-02 15:53:02
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Heatmap, Text, Touchable } from '@components'
import { _ } from '@stores'
import { feedback, info, stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { formatYMD, getDatesForMosaic } from './utils'
import { COMPONENT } from './ds'
import { MARGIN, memoStyles, PX } from './styles'

import type { Props as MosaicTileProps } from './types'

export type { MosaicTileProps }

export const MosaicTile = ({ mosaicTile }: MosaicTileProps) => {
  r(COMPONENT)

  return useObserver(() => {
    if (!mosaicTile) return null

    const styles = memoStyles()

    const now = new Date()
    const todayStr = formatYMD(now)
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1

    // 获取格子数组
    let days = getDatesForMosaic()

    // 删除上一年的当前月
    days = days.filter(
      d => !(Number(d.slice(0, 4)) < currentYear && Number(d.slice(5, 7)) === currentMonth)
    )

    // 计算月份列位置
    const measureDays: Record<number, number> = {}
    const seenMonth = new Set<number>()
    days.forEach((item, index) => {
      const month = Number(item.slice(5, 7))
      const weekIndex = Math.floor(index / 7)
      if (!seenMonth.has(month)) {
        seenMonth.add(month)
        measureDays[month] = weekIndex
      }
    })

    // 配色
    const colors = {
      1: _.select('#ffd8db', 'rgba(254, 138, 149, 0.32)'),
      2: _.select('#fe9da7', 'rgba(254, 138, 149, 0.48)'),
      3: _.select('#fe8a95', 'rgba(254, 138, 149, 0.64)'),
      4: _.select('#fe5060', 'rgba(254, 138, 149, 0.8)'),
      5: _.select('#fd293d', 'rgba(254, 138, 149, 1)')
    } as const

    const total = days.reduce((sum, day) => {
      const value = mosaicTile[day] || 0
      return sum + value
    }, 0)

    // 渲染辅助函数
    const renderWeekDays = () =>
      ['日', '二', '四', '六'].map((day, idx) => (
        <Text
          key={day}
          style={[styles.day, { top: (PX + MARGIN) * (idx * 2 + 1) }]}
          size={10}
          type='sub'
        >
          {day}
        </Text>
      ))

    const renderMonths = () =>
      Object.entries(measureDays).map(([month, weekIndex]) => (
        <Text
          key={month}
          style={[styles.month, { left: weekIndex * (PX + MARGIN) + 2 }]}
          size={10}
          type='sub'
        >
          {month}月
        </Text>
      ))

    const renderDays = () =>
      days.map(item => {
        const value = mosaicTile[item] || 0
        const isToday = item === todayStr
        const bgColor =
          colors[value] || (value ? colors[5] : _.select(_.colorBg, _._colorDarkModeLevel1))

        const itemStyle = stl(styles.item, isToday && styles.itemToday, {
          backgroundColor: bgColor
        })

        return value === 0 ? (
          <View key={item} style={itemStyle} />
        ) : (
          <Touchable
            key={item}
            style={itemStyle}
            onPress={() => {
              info(`${item}：${value} 次活动`)
              feedback(true)

              // t('时间线.点击瓷砖', { date: item, value })
            }}
          />
        )
      })

    return (
      <View style={_.mb.sm}>
        <Flex style={styles.container} align='start'>
          <View style={styles.days}>{renderWeekDays()}</View>

          <Flex.Item>
            <ScrollView
              contentContainerStyle={styles.contentContainerStyle}
              horizontal
              {...SCROLL_VIEW_RESET_PROPS}
            >
              <View>
                <Flex style={styles.months}>{renderMonths()}</Flex>
                <Flex style={styles.items} direction='column' wrap='wrap'>
                  {renderDays()}
                </Flex>
              </View>
            </ScrollView>
          </Flex.Item>

          <Heatmap id='时间线.点击瓷砖' />
        </Flex>

        <Text style={_.mr.sm} type='icon' size={12} bold align='right'>
          过去一年共 {total} 次活动
        </Text>
      </View>
    )
  })
}

export default MosaicTile
