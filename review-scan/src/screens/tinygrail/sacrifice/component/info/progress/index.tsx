/*
 * @Author: czy0729
 * @Date: 2025-05-31 21:48:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-31 22:25:54
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { _, useStore } from '@stores'
import { calculateFutureLevel, formatNumber } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { memoStyles } from './styles'

function Progress() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()

  const prev = calculateFutureLevel(($.level || 1) - 1)
  const next = calculateFutureLevel($.level || 1)

  const total = ($.chara.total || 0) + ($.valhallChara?.amount || 0)
  const currentDistance = next - total
  const percent = (total - prev) / (next - prev)

  return (
    <View style={[_.container.wind, _.mt.md]}>
      <View style={styles.progress}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${Math.max(0.02, percent) * 100}%`
            }
          ]}
        />
      </View>
      <Text style={_.mt.xs} type='tinygrailText' size={11} align='center'>
        升级还需{' '}
        <Text size={11} type='bid'>
          {formatNumber(currentDistance, 0)}
        </Text>
      </Text>
    </View>
  )
}

export default ob(Progress)
