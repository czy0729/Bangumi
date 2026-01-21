/*
 * @Author: czy0729
 * @Date: 2019-05-24 04:34:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 03:17:11
 */
import React from 'react'
import { Component, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as IconHeaderProps } from './types'

export { IconHeaderProps }

export const IconHeader = ob(
  ({ style, size = 20, name, color = _.colorTitle, onPress, children }: IconHeaderProps) => (
    <Component id='icon-header'>
      <Touchable style={stl(styles.icon, style)} onPress={onPress}>
        <Iconfont size={size} name={name} color={color} />
        {children}
      </Touchable>
    </Component>
  ),
  COMPONENT
)

export default IconHeader
