/*
 * @Author: czy0729
 * @Date: 2022-03-23 00:51:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 05:19:35
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { BlurView } from 'expo-blur'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { IOS } from '@constants'
import { COMPONENT } from './ds'

import type { WithViewStyles } from '@types'
const BLUR = false

function Background({ style }: WithViewStyles) {
  r(COMPONENT)

  return BLUR ? (
    <BlurView style={stl(_.absoluteFill, style)} tint='dark' intensity={80} />
  ) : (
    <View style={stl(_.absoluteFill, IOS && _.container.plain, style)} />
  )
}

export default observer(Background)
