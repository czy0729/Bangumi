/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Image, Text } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { AVATAR_SIZE } from '../ds'
import BarChart from '../bar-chart'
import { getChartWidth } from '../utils'
import { CHART_HEIGHT, styles } from './styles'

import type { Props } from './types'

/** 作者贡献统计 */
function Contributions({ width, weeks, login, avatarUrl, commits, additions, deletions }: Props) {
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
        {!!avatarUrl && <Image src={avatarUrl} size={AVATAR_SIZE} radius={AVATAR_SIZE / 2} />}
        <Flex.Item style={_.ml.sm}>
          <Text style={styles.login}>{login}</Text>
          <Flex style={styles.counts} align='center'>
            <Text style={styles.count}>{formatNumber(commits, 0)} commits</Text>
            <Text style={[styles.count, styles.add, _.ml.sm]}>{formatNumber(additions, 0)} ++</Text>
            <Text style={[styles.count, styles.del, _.ml.sm]}>{formatNumber(deletions, 0)} --</Text>
          </Flex>
        </Flex.Item>
        <Text style={styles.rank}>#1</Text>
      </Flex>
      <View style={styles.chart}>
        <BarChart
          weeks={weeks}
          width={getChartWidth(width)}
          height={CHART_HEIGHT}
          label='Contributions'
        />
      </View>
    </View>
  )
}

export default observer(Contributions)
