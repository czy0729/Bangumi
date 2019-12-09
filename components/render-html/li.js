/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-09 11:27:32
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'

function Li({ style, children, ...other }) {
  const styles = memoStyles()
  return (
    <View style={[style, styles.li]} {...other}>
      {children}
    </View>
  )
}

export default observer(Li)

const memoStyles = _.memoStyles(_ => ({
  li: {
    paddingVertical: _.sm,
    borderBottomWidth: 1,
    borderBottomColor: _.select(_.colorBg, _.colorBorder)
  }
}))
