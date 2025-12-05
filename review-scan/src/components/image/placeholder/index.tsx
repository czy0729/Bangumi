/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:18:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:51:40
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'

function Placeholder({ style }) {
  return <View style={style} />
}

export default observer(Placeholder)
