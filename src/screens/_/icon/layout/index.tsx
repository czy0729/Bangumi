/*
 * @Author: czy0729
 * @Date: 2021-03-18 13:58:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 13:27:37
 */
import React from 'react'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Fn, ViewStyle } from '@types'
import { IconTouchable } from '../touchable'

type Props = {
  style?: ViewStyle
  list?: boolean
  size?: number
  onPress?: Fn
  children?: any
}

export const IconLayout = ob(({ style, list, size = 22, onPress, children }: Props) => (
  <IconTouchable
    style={[styles.icon, style]}
    name={list ? 'md-grid-view' : 'md-menu'}
    color={_.colorTitle}
    size={size}
    onPress={onPress}
  >
    {children}
  </IconTouchable>
))

const styles = _.create({
  icon: {
    borderRadius: 20,
    overflow: 'hidden'
  }
})
