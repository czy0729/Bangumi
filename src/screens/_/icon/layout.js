/*
 * @Author: czy0729
 * @Date: 2021-03-18 13:58:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-18 14:05:58
 */
import React from 'react'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { IconTouchable } from './touchable'

export const IconLayout = ob(({ style, list, onPress, children }) => (
  <IconTouchable
    style={style}
    name={list ? 'md-grid-view' : 'md-menu'}
    color={_.colorTitle}
    onPress={onPress}
  >
    {children}
  </IconTouchable>
))
