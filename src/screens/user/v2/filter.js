/*
 * @Author: czy0729
 * @Date: 2021-11-28 08:49:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-28 09:40:26
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Input } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function Filter(props, { $ }) {
  rerender('Home.Filter')

  const styles = memoStyles()
  const { filter } = $.state
  return (
    <Flex style={styles.filter} justify='center'>
      <View style={styles.wrap}>
        <Input
          style={styles.input}
          clearButtonMode='never'
          value={filter}
          placeholder='搜索'
          autoFocus
          onChangeText={$.onFilterChange}
        />
      </View>
    </Flex>
  )
}

export default obc(Filter)

const memoStyles = _.memoStyles(_ => ({
  filter: {
    paddingTop: _.sm - 2,
    paddingBottom: _.sm
  },
  wrap: {
    width: 318
  },
  input: {
    ..._.fontSize(16),
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: _.select('rgba(238, 238, 238, 0.8)', _._colorDarkModeLevel1),
    borderRadius: 40
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}))
