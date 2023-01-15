/*
 * @Author: czy0729
 * @Date: 2021-03-18 13:58:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-18 15:39:42
 */
import React from 'react'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { IconTouchable } from '../touchable'
import { styles } from './styles'
import { Props as IconLayoutProps } from './types'

export { IconLayoutProps }

export const IconLayout = ob(
  ({ style, list, size = 22, onPress, children }: IconLayoutProps) => (
    <IconTouchable
      style={style ? [styles.icon, style] : styles.icon}
      name={list ? 'md-grid-view' : 'md-menu'}
      color={_.colorTitle}
      size={size}
      onPress={onPress}
    >
      {children}
    </IconTouchable>
  )
)
