/*
 * @Author: czy0729
 * @Date: 2021-03-16 21:00:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-04 07:26:30
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Text } from '@components'
import { PreventTouchPlaceholder } from '@_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { LABEL_DS } from '../../ds'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Counts(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { counts, lastCounts = [] } = $.wiki
  return (
    <View style={_.mt._sm}>
      <PreventTouchPlaceholder />
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

export default obc(Counts, COMPONENT)
