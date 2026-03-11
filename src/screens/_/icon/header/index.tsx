/*
 * @Author: czy0729
 * @Date: 2019-05-24 04:34:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-12 05:56:44
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Component, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as IconHeaderProps } from './types'

export type { IconHeaderProps }

export function IconHeader({
  style,
  size = 20,
  name,
  color = _.colorTitle,
  shadow,
  onPress,
  children
}: IconHeaderProps) {
  r(COMPONENT)

  return useObserver(() => (
    <Component id='icon-header'>
      <Touchable style={stl(styles.icon, style)} onPress={onPress}>
        <Iconfont size={size} name={name} color={color} shadow={shadow} />
        {children}
      </Touchable>
    </Component>
  ))
}

export default IconHeader
