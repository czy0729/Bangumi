/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:13:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-17 06:18:42
 */
import React from 'react'
import { Text, Props } from '../../text'
import { styles } from './styles'

function HiddenText({ style, children, ...other }: Props) {
  return (
    <Text style={[style, styles.hidden]} selectable {...other}>
      {children}
    </Text>
  )
}

export default HiddenText
