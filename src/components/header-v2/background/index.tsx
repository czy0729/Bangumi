/*
 * @Author: czy0729
 * @Date: 2022-03-23 00:51:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-25 12:30:04
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { BlurView } from 'expo-blur'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { WithViewStyles } from '@types'

const BLUR = false

function Background({ style }: WithViewStyles) {
  r(COMPONENT)

  return useObserver(() =>
    BLUR ? (
      <BlurView style={stl(_.absoluteFill, style)} tint='dark' intensity={80} />
    ) : (
      <View style={stl(_.absoluteFill, _.container.plain, style)} />
    )
  )
}

export default Background
