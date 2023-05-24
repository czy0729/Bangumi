/*
 * @Author: czy0729
 * @Date: 2023-05-24 10:05:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-24 10:18:28
 */
import React from 'react'
import { FlexWidget } from 'react-native-android-widget'
import { styles } from './styles'

function Flex({ style = {}, row, children, ...other }: any) {
  const _style = { ...style }
  if (row) {
    _style.flexDirection = 'row'
    _style.alignItems = 'center'
  }
  return (
    <FlexWidget style={_style} {...other}>
      {children}
    </FlexWidget>
  )
}

function Item({ children, ...other }: any) {
  return (
    <FlexWidget {...other} style={styles.item}>
      {children}
    </FlexWidget>
  )
}

Flex.Item = Item

export { Flex }
