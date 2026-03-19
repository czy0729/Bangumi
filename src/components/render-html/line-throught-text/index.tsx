/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:07:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 03:03:25
 */
import React from 'react'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { Text } from '../../text'
import { styles } from './styles'

import type { TextProps } from '../../text'

function LineThroughtText({ style, children, ...other }: TextProps) {
  return (
    <Text style={stl(style, styles.lineThrought)} {...other}>
      {children}
    </Text>
  )
}

export default observer(LineThroughtText)
