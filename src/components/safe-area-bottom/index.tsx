/*
 * @Author: czy0729
 * @Date: 2023-08-01 19:33:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-04 22:08:19
 */
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useObserver } from 'mobx-react'
import { stl } from '@utils'
import { Props as SafeAreaBottomProps } from './types'

export { SafeAreaBottomProps }

/** 只针对底部设置的安全区域 */
export const SafeAreaBottom = ({
  style,
  type = 'bottom',
  children,
  ...other
}: SafeAreaBottomProps) => {
  const { bottom } = useSafeAreaInsets()
  return useObserver(() => (
    <View
      style={stl(style, {
        [type]:
          type === 'height'
            ? // @ts-expect-error
              bottom + style?.height || 0
            : bottom
      })}
      {...other}
    >
      {children}
    </View>
  ))
}
