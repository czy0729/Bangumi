/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:07:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-16 07:43:10
 */
import React from 'react'
import { stl } from '@utils'
import { Text, TextProps } from '../../text'
import { styles } from './styles'

function LineThroughtText({ style, children, ...other }: TextProps) {
  return (
    <Text style={stl(style, styles.lineThrought)} {...other}>
      {children}
    </Text>
  )
}

export default LineThroughtText
