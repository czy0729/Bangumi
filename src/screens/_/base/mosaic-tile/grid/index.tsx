/*
 * @Author: czy0729
 * @Date: 2020-07-20 16:34:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 热力图网格: 星期列、月份刻度与按次数的色阶
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Heatmap, ScrollView, Text, Touchable } from '@components'
import { _ } from '@stores'
import { feedback, info, stl } from '@utils'
import { MARGIN, MONTH_LABEL_OFFSET, PX, WEEK_DAYS } from './ds'
import { memoStyles } from './styles'

import type { Props } from './types'

function Grid({ days, monthColumns, mosaicTile, todayStr, unit }: Props) {
  const styles = memoStyles()

  /** 配色, 按次数分档 */
  const colors: Record<number, string> = {
    1: _.select('#ffd8db', 'rgba(254, 138, 149, 0.32)'),
    2: _.select('#fe9da7', 'rgba(254, 138, 149, 0.48)'),
    3: _.select('#fe8a95', 'rgba(254, 138, 149, 0.64)'),
    4: _.select('#fe5060', 'rgba(254, 138, 149, 0.8)'),
    5: _.select('#fd293d', 'rgba(254, 138, 149, 1)')
  }

  return (
    <Flex style={styles.container} align='start'>
      <View style={styles.days}>
        {WEEK_DAYS.map((day, index) => (
          <Text
            key={day}
            style={stl(styles.day, { top: (PX + MARGIN) * (index * 2 + 1) })}
            size={10}
            type='sub'
          >
            {day}
          </Text>
        ))}
      </View>

      <Flex.Item>
        <ScrollView contentContainerStyle={styles.contentContainerStyle} horizontal>
          <View>
            <Flex style={styles.months}>
              {Object.entries(monthColumns).map(([month, weekIndex]) => (
                <Text
                  key={month}
                  style={stl(styles.month, {
                    left: weekIndex * (PX + MARGIN) + MONTH_LABEL_OFFSET
                  })}
                  size={10}
                  type='sub'
                >
                  {month}月
                </Text>
              ))}
            </Flex>
            <Flex style={styles.items} direction='column' wrap='wrap'>
              {days.map(item => {
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
                      info(`${item}：${value} ${unit}`)
                      feedback(true)
                    }}
                  />
                )
              })}
            </Flex>
          </View>
        </ScrollView>
      </Flex.Item>

      <Heatmap id='时间线.点击瓷砖' />
    </Flex>
  )
}

export default observer(Grid)
