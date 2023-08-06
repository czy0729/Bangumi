/*
 * @Author: czy0729
 * @Date: 2023-08-01 19:33:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-01 20:06:25
 */
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useObserver } from 'mobx-react'
import { stl } from '@utils'

export const SafeAreaBottom = ({ style, type = 'bottom', children, ...other }) => {
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
