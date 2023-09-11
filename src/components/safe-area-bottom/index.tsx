/*
 * @Author: czy0729
 * @Date: 2023-08-01 19:33:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-13 20:40:09
 */
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useObserver } from 'mobx-react'
import { stl } from '@utils'
import { Props as SafeAreaBottomProps } from './types'

export { SafeAreaBottomProps }

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
