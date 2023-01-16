/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-16 08:39:19
 */
import React from 'react'
import { View, ViewProps } from 'react-native'
import { ReactNode } from '@types'
import { styles } from './styles'

type Props = ViewProps & {
  children?: ReactNode
}

function Li({ style, children, ...other }: Props) {
  return (
    <View style={style ? [style, styles.li] : styles.li} {...other}>
      {children}
    </View>
  )
}

export default Li
