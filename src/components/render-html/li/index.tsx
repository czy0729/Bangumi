/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-17 06:30:14
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
    <View style={[style, styles.li]} {...other}>
      {children}
    </View>
  )
}

export default Li
