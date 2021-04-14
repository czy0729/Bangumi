/*
 * @Author: czy0729
 * @Date: 2021-03-16 21:00:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-17 15:23:18
 */
import React from 'react'
import { View } from 'react-native'
import { ScrollView, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { labelDS } from './store'

function Counts(props, { $ }) {
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
            parseInt(item.replace(/,/g, '')) -
              parseInt(lastCounts[index].replace(/,/g, ''))
          return (
            <View key={labelDS[index]} style={styles.count}>
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

const memoStyles = _.memoStyles(_ => ({
  contentContainerStyle: {
    paddingHorizontal: _.wind,
    paddingLeft: _.wind - _.sm,
    minHeight: 56
  },
  count: {
    padding: _.sm,
    marginTop: _.sm,
    marginLeft: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    borderWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  }
}))
