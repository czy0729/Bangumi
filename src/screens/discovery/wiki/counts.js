/*
 * @Author: czy0729
 * @Date: 2021-03-16 21:00:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-13 00:10:38
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Text } from '@components'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { labelDS } from './store'

function Counts(props, { $ }) {
  const styles = memoStyles()
  const { coverRadius } = systemStore.setting
  const { counts, lastCounts = [] } = $.wiki
  return (
    <View style={_.mt._sm}>
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
              key={labelDS[index]}
              style={[
                styles.count,
                {
                  borderRadius: coverRadius
                }
              ]}
            >
              <Text size={13} bold>
                {labelDS[index]}
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

const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingHorizontal: _.wind,
    paddingLeft: _.wind - _.sm,
    minHeight: 56 * _.ratio
  },
  count: {
    padding: _.device(_.sm, _.md),
    marginTop: _.sm,
    marginLeft: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    borderWidth: _.hairlineWidth,
    borderColor: _.colorBorder,
    overflow: 'hidden'
  }
}))
