/*
 * @Author: czy0729
 * @Date: 2019-05-24 04:34:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-14 01:05:47
 */
import React from 'react'
import { Touchable, Iconfont, Component } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { styles } from './styles'
import { Props as IconHeaderProps } from './types'

export { IconHeaderProps }

export const IconHeader = ob(
  ({
    style,
    size = 20,
    name,
    color = _.colorTitle,
    onPress,
    children
  }: IconHeaderProps) => (
    <Component id='icon-header'>
      <Touchable style={stl(styles.icon, style)} onPress={onPress}>
        <Iconfont size={size} name={name} color={color} />
        {children}
      </Touchable>
    </Component>
  )
)
