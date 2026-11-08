/*
 * @Author: czy0729
 * @Date: 2025-02-22 11:32:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 11:40:00
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
import type { Props } from './types'

function Stats({ u }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const data = u ? $.stats(u) : $.state.series
  if (!data) return null

  const styles = memoStyles()

  const { length } = data.a
  // 全为 0 时用 1 兜底, 避免算高度时出现 NaN
  const max = Math.max(1, ...data.a)
  const sum = data.a.reduce((acc, num) => acc + num, 0)

  return (
    <Flex style={_.container.block}>
      <Flex style={styles.stats} align='end'>
        {data.a.map((item, index) => (
          <View
            key={index}
            style={stl(styles.block, {
              height: `${(item / max) * 100}%`
            })}
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
          style={stl(styles.badge, {
            backgroundColor:
              length >= 29 ? _.colorSuccess : length >= 21 ? _.colorPrimary : _.colorWarning
          })}
        />
      )}
    </Flex>
  )
}

export default observer(Stats)
