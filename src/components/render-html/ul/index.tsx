/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 03:06:14
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'

import type { ViewProps } from 'react-native'

function Ul({ style, children, ...other }: ViewProps) {
  return (
    <View style={style} {...other}>
      {children}
    </View>
  )
}

export default observer(Ul)
