/*
 * @Author: czy0729
 * @Date: 2023-08-01 19:33:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 03:06:52
 */
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { Props as SafeAreaBottomProps } from './types'
export type { SafeAreaBottomProps }

/** 只针对底部设置的安全区域 */
export const SafeAreaBottom = observer(
  ({ style, type = 'bottom', children, ...other }: SafeAreaBottomProps) => {
    r(COMPONENT)

    const { bottom } = useSafeAreaInsets()

    return (
      <View
        style={stl(style, {
          [type]: type === 'height' ? bottom + (style as any)?.height || 0 : bottom
        })}
        {...other}
      >
        {children}
      </View>
    )
  }
)

export default SafeAreaBottom
