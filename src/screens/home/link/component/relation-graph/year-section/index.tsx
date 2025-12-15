/*
 * @Author: czy0729
 * @Date: 2025-12-14 18:51:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 19:11:34
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { stl } from '@utils'
import { useObserver } from '@utils/hooks'
import { NODE_OFFSET } from '../ds'
import { memoStyles } from './styles'

import type { NodeLayout } from '../types'
import type { Props } from './types'

function YearSection({ year, index, nodes, layoutsRef }: Props) {
  return useObserver(() => {
    const yearLayouts = nodes
      .map(n => layoutsRef.current.get(Number(n.id)))
      .filter(Boolean) as NodeLayout[]
    if (!yearLayouts.length) return null

    const styles = memoStyles()
    const tops = yearLayouts.map(l => l.centerY - l.height / 2)
    const bottoms = yearLayouts.map(l => l.centerY + l.height / 2)
    const top = Math.min(...tops) - 4
    const bottom = Math.max(...bottoms) + 4
    const height = bottom - top

    return (
      <View
        style={stl(styles.stage, {
          top,
          height: height + Math.floor(NODE_OFFSET / 2) + 2
        })}
      >
        <View style={stl(styles.section, !(index % 2) && styles.active)} />

        {year !== '未知' && (
          <View style={styles.row}>
            <Text overrideStyle={styles.text} size={22} lineHeight={24}>
              {year}
            </Text>
          </View>
        )}
      </View>
    )
  })
}

export default YearSection
