/*
 * @Author: czy0729
 * @Date: 2021-03-18 13:58:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 21:52:06
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { IconTouchable } from '../touchable'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as IconLayoutProps } from './types'
export type { IconLayoutProps }

export const IconLayout = observer(
  ({ style, list, size = 22, onPress, children }: IconLayoutProps) => {
    r(COMPONENT)

    return (
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
    )
  }
)

export default IconLayout
