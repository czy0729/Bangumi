/*
 * @Author: czy0729
 * @Date: 2023-08-01 19:33:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-07 15:53:57
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
  return useObserver(() => {
    return (
      <View
        style={stl(style, {
          [type]: bottom
        })}
        {...other}
      >
        {children}
      </View>
    )
  })
}
