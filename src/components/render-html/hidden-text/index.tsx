/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:13:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-16 08:39:05
 */
import React from 'react'
import { stl } from '@utils'
import { Text, TextProps } from '../../text'
import { styles } from './styles'

function HiddenText({ style, children, ...other }: TextProps) {
  return (
    <Text style={stl(style, styles.hidden)} selectable {...other}>
      {children}
    </Text>
  )
}

export default HiddenText
