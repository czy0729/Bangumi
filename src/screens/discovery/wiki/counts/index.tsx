/*
 * @Author: czy0729
 * @Date: 2021-03-16 21:00:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-27 21:14:17
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Text } from '@components'
import { PreventTouchPlaceholder } from '@_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { LABEL_DS } from '../ds'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Counts(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { coverRadius } = systemStore.setting
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
            parseInt(item.replace(/,/g, '')) -
              parseInt(lastCounts[index].replace(/,/g, ''))
          return (
            <View
              key={LABEL_DS[index]}
              style={[
                styles.count,
                {
                  borderRadius: coverRadius
                }
              ]}
            >
              <Text size={13} bold>
                {LABEL_DS[index]}
              </Text>
              <Text style={_.mt.xs} type='main' bold>
                {item}
                {!!change && (
                  <Text type='bid' bold>
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

export default obc(Counts)
