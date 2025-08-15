/*
 * @Author: czy0729
 * @Date: 2021-03-18 13:58:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 03:17:50
 */
import React from 'react'
import { Component } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { IconTouchable } from '../touchable'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as IconLayoutProps } from './types'

export { IconLayoutProps }

export const IconLayout = ob(
  ({ style, list, size = 22, onPress, children }: IconLayoutProps) => (
    <Component id='icon-layout'>
      <IconTouchable
        style={stl(styles.icon, style)}
        name={list ? 'md-grid-view' : 'md-menu'}
        color={_.colorTitle}
        size={size}
        onPress={onPress}
      >
        {children}
      </IconTouchable>
    </Component>
  ),
  COMPONENT
)

export default IconLayout
