/*
 * @Author: czy0729
 * @Date: 2022-03-23 00:51:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-16 19:44:33
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
import { Props } from './types'

const BLUR = false

function Background({ style }: Props) {
  r(COMPONENT)

  return BLUR ? (
    <BlurView style={stl(styles.bg, style)} tint='dark' intensity={80} />
  ) : (
    <View style={stl(styles.bg, _.container.plain, style)} />
  )
}

export default observer(Background)
