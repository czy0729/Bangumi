/*
 * @Author: czy0729
 * @Date: 2023-08-01 19:33:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:57:13
 */
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useObserver } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { Props as SafeAreaBottomProps } from './types'

export { SafeAreaBottomProps }

/** 只针对底部设置的安全区域 */
export const SafeAreaBottom = ({
  style,
  type = 'bottom',
  children,
  ...other
}: SafeAreaBottomProps) => {
  r(COMPONENT)

  const { bottom } = useSafeAreaInsets()
  return useObserver(() => (
    <View
      style={stl(style, {
        [type]: type === 'height' ? bottom + (style as any)?.height || 0 : bottom
      })}
      {...other}
    >
      {children}
    </View>
  ))
}

export default SafeAreaBottom
