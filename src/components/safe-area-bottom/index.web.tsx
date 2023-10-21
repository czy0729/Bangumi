/*
 * @Author: czy0729
 * @Date: 2023-10-21 05:13:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-21 05:13:41
 */
import React from 'react'
import { View } from 'react-native'
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
  const bottom = 0
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
