/*
 * @Author: czy0729
 * @Date: 2022-01-22 18:26:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-22 19:40:42
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function Block({ children }) {
  const styles = memoStyles()
  return (
    <View style={[styles.block, children?.length > 1 && styles.padding]}>
      {children}
    </View>
  )
}

export default ob(Block)

const memoStyles = _.memoStyles(() => ({
  block: {
    marginVertical: _.sm,
    marginHorizontal: _.wind,
    backgroundColor: _.select(_.colorPlain, _.colorBg),
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  padding: {
    paddingBottom: _.sm
  }
}))
