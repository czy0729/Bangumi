/*
 * @Author: czy0729
 * @Date: 2023-06-28 10:39:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:18:33
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { useStore } from '@stores'
import { formatNumber, stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

import type { UserStats } from '@stores/users/types'
import type { Ctx } from '../../../types'

function Counts() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()

    const userStats = ($.users?.userStats || {}) as UserStats
    const rows = [
      [
        {
          value: formatNumber(userStats.total || 0, 0),
          label: '收藏',
          style: styles.blockMain
        },
        {
          value: formatNumber(userStats.collect || 0, 0),
          label: '完成',
          style: styles.blockSuccess
        },
        {
          value: userStats.percent,
          label: '完成率',
          style: styles.blockPrimary
        }
      ],
      [
        {
          value: userStats.avg,
          label: '平均分',
          style: styles.blockWarning
        },
        {
          value: userStats.std,
          label: '标准差',
          style: styles.blockPurple
        },
        {
          value: formatNumber(userStats.scored || 0, 0),
          label: '评分数',
          style: styles.blockSky
        }
      ]
    ] as const

    return rows.map((row, rowIndex) => (
      <Flex key={rowIndex}>
        {row.map(({ value, label, style }, index: number) => (
          <Flex.Item key={index}>
            <View style={stl(styles.block, style)}>
              <Text type='__plain__' size={18} bold>
                {value}
              </Text>
              <Text type='__plain__' size={12} bold>
                {label}
              </Text>
            </View>
          </Flex.Item>
        ))}
      </Flex>
    ))
  })
}

export default Counts
