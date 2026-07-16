/*
 * @Author: czy0729
 * @Date: 2025-02-22 11:32:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-14 20:53:10
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx, Stats as StatsType } from '../../types'

function Stats({ u }: any) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const data: StatsType = u ? $.stats(u) : $.state.series
  if (!data) return null

  const styles = memoStyles()

  const { length } = data.a
  const max = Math.max(...data.a.map(item => item))
  const sum = data.a.reduce((acc, num) => acc + num, 0)

  return (
    <Flex style={_.container.block}>
      <Flex style={styles.stats} align='end'>
        {data.a.map((item, index) => (
          <View
            key={index}
            style={[
              styles.block,
              {
                height: `${(item / max) * 100}%`
              }
            ]}
          />
        ))}
        <Text style={styles.max} type='sub' size={10} noWrap>
          <Text type={max >= 10 ? 'main' : 'sub'} size={10}>
            {max}
          </Text>{' '}
          (
          <Text type={sum >= 100 ? 'main' : 'sub'} size={10}>
            {sum}
          </Text>
          , {length}, {(sum / length).toFixed(1)}, {(sum / 30).toFixed(1)})
        </Text>
      </Flex>
      <Flex.Item />
      {length >= 11 && (
        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                length >= 29 ? _.colorSuccess : length >= 21 ? _.colorPrimary : _.colorWarning
            }
          ]}
        />
      )}
    </Flex>
  )
}

export default observer(Stats)
