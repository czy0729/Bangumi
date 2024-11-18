/*
 * @Author: czy0729
 * @Date: 2022-12-26 05:11:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:18:25
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { getHeight } from './utils'
import { memoStyles } from './styles'

function Chart() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const userStats = ($.users?.userStats || {}) as any
  const count = userStats?.chart
  const max = Math.max(...Object.keys(count || {}).map(item => Number(count?.[item] || 0)))
  return (
    <Flex style={styles.chart}>
      {Object.keys(count || {})
        .reverse()
        .map((item, index) => {
          const height = getHeight(max, count?.[item])
          return (
            <Flex.Item key={item} style={index > 0 && _.ml.xs}>
              <Flex style={styles.item} justify='center' align='end'>
                <View
                  style={[
                    styles.itemFill,
                    {
                      height
                    }
                  ]}
                />
                <Text
                  style={[
                    styles.count,
                    {
                      bottom: height
                    }
                  ]}
                  size={11}
                  type='sub'
                  align='center'
                  bold
                >
                  {count?.[item]}{' '}
                </Text>
              </Flex>
              <Text style={_.mt.sm} size={12} bold type='title' align='center'>
                {item}
              </Text>
            </Flex.Item>
          )
        })}
    </Flex>
  )
}

export default ob(Chart)
