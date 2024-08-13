/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-13 12:37:28
 */
import React from 'react'
import { TouchableOpacity as RNTouchableOpacity } from 'react-native'
// import { TouchableOpacity as GHTouchableOpacity } from 'react-native-gesture-handler'
import { Component } from '../../component'
import './index.scss'

function TouchableOpacity({ useRN, extraButtonProps, children, ...other }) {
  // const ComponentTouchable = useRN ? RNTouchableOpacity : GHTouchableOpacity
  const ComponentTouchable = RNTouchableOpacity
  return (
    <Component id='component-touchable-opacity'>
      <ComponentTouchable
        activeOpacity={0.72}
        {...other}
        // extraButtonProps={extraButtonProps}
      >
        {children}
      </ComponentTouchable>
    </Component>
  )
}

export default TouchableOpacity
