/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:07:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-16 07:43:10
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { stl } from '@utils'
import { Text } from '../../text'
import { styles } from './styles'

import type { TextProps } from '../../text'

function LineThroughtText({ style, children, ...other }: TextProps) {
  return useObserver(() => (
    <Text style={stl(style, styles.lineThrought)} {...other}>
      {children}
    </Text>
  ))
}

export default LineThroughtText
