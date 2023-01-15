/*
 * @Author: czy0729
 * @Date: 2019-05-24 04:34:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-18 15:35:57
 */
import React from 'react'
import { Touchable, Iconfont } from '@components'
import { _ } from '@stores'
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
    <Touchable style={style ? [styles.icon, style] : styles.icon} onPress={onPress}>
      <Iconfont size={size} name={name} color={color} />
      {children}
    </Touchable>
  )
)
