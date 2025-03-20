/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-20 22:07:14
 */
import React from 'react'
import { View, ViewProps } from 'react-native'
import { ReactNode } from '@types'

type Props = ViewProps & {
  children?: ReactNode
}

function Ul({ style, children, ...other }: Props) {
  return (
    <View style={style} {...other}>
      {children}
    </View>
  )
}

export default Ul
