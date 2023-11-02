/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-02 23:43:31
 */
import React, { useRef } from 'react'
import { TouchableOpacity as RNTouchableOpacity, View } from 'react-native'
import { TouchableOpacity as GHTouchableOpacity } from 'react-native-gesture-handler'
import { useMount } from '@utils/hooks'

function TouchableOpacity({ useRN, extraButtonProps, children, ...other }) {
  const ref = useRef(null)
  useMount(() => {
    ref.current.classList.add('component-touchable-opacity')
  })

  const Component = useRN ? RNTouchableOpacity : GHTouchableOpacity
  return (
    <Component activeOpacity={0.72} {...other} extraButtonProps={extraButtonProps}>
      <View ref={ref}>{children}</View>
    </Component>
  )
}

export default TouchableOpacity
