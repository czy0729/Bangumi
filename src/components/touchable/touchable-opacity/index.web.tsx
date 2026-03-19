/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 14:32:39
 */
import React from 'react'
import { TouchableOpacity as RNTouchableOpacity } from 'react-native'
import { Component } from '../../component'
import './index.scss'

function TouchableOpacity({ useRN, extraButtonProps, children, ...other }) {
  return (
    <Component id='component-touchable-opacity'>
      <RNTouchableOpacity activeOpacity={0.72} {...other}>
        {children}
      </RNTouchableOpacity>
    </Component>
  )
}

export default TouchableOpacity
