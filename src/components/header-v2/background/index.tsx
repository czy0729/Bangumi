/*
 * @Author: czy0729
 * @Date: 2022-03-23 00:51:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 14:23:21
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { BlurView } from 'expo-blur'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

const BLUR = false

function Background() {
  r(COMPONENT)

  return BLUR ? (
    <BlurView style={styles.bg} tint='dark' intensity={80} />
  ) : (
    <View style={stl(styles.bg, _.container.plain)} />
  )
}

export default observer(Background)
