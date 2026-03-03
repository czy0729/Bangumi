/*
 * @Author: czy0729
 * @Date: 2021-03-16 21:00:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-04 00:38:07
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Text } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { LABEL_DS } from '../../ds'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Counts() {
  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { counts, lastCounts = [] } = $.wiki

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {counts.map((item, index) => {
          const change =
            lastCounts.length > index &&
            parseInt(item.replace(/,/g, '')) - parseInt(lastCounts[index].replace(/,/g, ''))
          return (
            <View
              key={LABEL_DS[index]}
              style={[
                styles.count,
                {
                  borderRadius: systemStore.coverRadius
                }
              ]}
            >
              <Text bold>{LABEL_DS[index]}</Text>
              <Text style={_.mt.xs} type='main' size={12} bold>
                {item}
                {!!change && (
                  <Text type='bid' size={12} bold>
                    {' '}
                    ↑{change}
                  </Text>
                )}
              </Text>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

export default ob(Counts, COMPONENT)
