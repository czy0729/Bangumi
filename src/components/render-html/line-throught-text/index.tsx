/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:07:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-17 06:30:00
 */
import React from 'react'
import { Text, Props } from '../../text'
import { styles } from './styles'

function LineThroughtText({ style, children, ...other }: Props) {
  return (
    <Text style={[style, styles.lineThrought]} selectable {...other}>
      {children}
    </Text>
  )
}

export default LineThroughtText
