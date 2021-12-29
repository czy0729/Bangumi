/*
 * @Author: czy0729
 * @Date: 2021-12-29 04:43:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-29 05:53:30
 */
import React from 'react'
import { BaseButton } from 'react-native-gesture-handler'

export const Tap = ({ children }) => {
  return <BaseButton onPress={() => console.log('onPress')}>{children}</BaseButton>
}
