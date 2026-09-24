/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-24 13:37:42
 */
import { useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { AXIS_WIDTH } from '../ds'
import BarChart from '../bar-chart'
import { useWeekRange } from '../hooks'
import { formatWeek, getChartWidth } from '../utils'
import MiniChart from './mini-chart'
import { CHART_HEIGHT, MINI_HEIGHT, styles } from './styles'

import type { Props } from './types'

/** 每周提交数进度 */
function CommitsOverTime({ width, weeks }: Props) {
  /** 区间状态只在卡片内部, 拖动时不会带着整页重渲染 */
  const { start, end, moveTo } = useWeekRange(weeks)

  const chartWidth = getChartWidth(width)

  /** 固定切片引用, 让 BarChart 的 useMemo 在拖动间隙命中缓存 */
  const visibleWeeks = useMemo(() => weeks.slice(start, end + 1), [weeks, start, end])
  const from = visibleWeeks[0]?.w
  const to = visibleWeeks[visibleWeeks.length - 1]?.w

  return (
    <View
      style={[
        styles.card,
        {
          width
        }
      ]}
    >
      <Flex align='center'>
        <Flex.Item>
          <Text style={styles.title}>Commits over time</Text>
          {!!from && (
            <Text style={styles.subtitle}>
              Weekly from {formatWeek(from)} to {formatWeek(to)}
            </Text>
          )}
        </Flex.Item>
      </Flex>
      <View style={styles.chart}>
        <BarChart
          weeks={visibleWeeks}
          width={chartWidth}
          height={CHART_HEIGHT}
          label='Contributions'
          withYearLabel
        />
      </View>
      <View style={_.ml.xs}>
        <MiniChart
          weeks={weeks}
          width={chartWidth + AXIS_WIDTH - _.xs}
          height={MINI_HEIGHT}
          start={start}
          end={end}
          onMove={moveTo}
        />
      </View>
    </View>
  )
}

export default observer(CommitsOverTime)
