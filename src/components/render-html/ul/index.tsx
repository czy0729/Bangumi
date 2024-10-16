/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-15 17:05:53
 */
import React from 'react'
import { View, ViewProps } from 'react-native'
import { ReactNode } from '@types'
import { Divider } from '../../divider'

type Props = ViewProps & {
  children?: ReactNode
}

function Ul({ style, children, ...other }: Props) {
  return (
    <>
      <View style={style} {...other}>
        {children}
      </View>
      <Divider />
    </>
  )
}

export default Ul
