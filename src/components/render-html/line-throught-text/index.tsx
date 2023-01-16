/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:07:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-16 08:40:22
 */
import React from 'react'
import { Text, TextProps } from '../../text'
import { styles } from './styles'

function LineThroughtText({ style, children, ...other }: TextProps) {
  return (
    <Text
      style={style ? [style, styles.lineThrought] : styles.lineThrought}
      selectable
      {...other}
    >
      {children}
    </Text>
  )
}

export default LineThroughtText
