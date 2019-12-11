/*
 * @Author: czy0729
 * @Date: 2019-12-11 01:36:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-11 01:37:34
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'

function HeaderBackground({ style, children, ...other }) {
  return (
    <View
      style={[
        style,
        {
          backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1)
        }
      ]}
      {...other}
    >
      {children}
    </View>
  )
}

export default observer(HeaderBackground)
