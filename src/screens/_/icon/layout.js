/*
 * @Author: czy0729
 * @Date: 2021-03-18 13:58:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-20 22:07:56
 */
import React from 'react'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { IconTouchable } from './touchable'

export const IconLayout = ob(({ style, list, onPress, children }) => (
  <IconTouchable
    style={[styles.icon, style]}
    name={list ? 'md-grid-view' : 'md-menu'}
    color={_.colorTitle}
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
