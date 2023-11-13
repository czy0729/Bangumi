/*
 * @Author: czy0729
 * @Date: 2019-05-19 20:13:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-14 01:15:22
 */
import React from 'react'
import { Touchable, Iconfont, Text, Component } from '@components'
import { IOS } from '@constants'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { styles } from './styles'
import { Props as IconTabsHeaderProps } from './types'

export { IconTabsHeaderProps }

export const IconTabsHeader = ob(
  ({
    style,
    name,
    text,
    size,
    color = _.colorTitle,
    position = 'left',
    children,
    onPress
  }: IconTabsHeaderProps) => {
    const top = text ? (
      <Text style={_.mr.xs} type='desc' size={size}>
        {text}
      </Text>
    ) : (
      <Iconfont size={size} name={name} color={color} />
    )

    if (!onPress) {
      return (
        <Component
          id='icon-tabs-header'
          data-type='press'
          style={stl(styles.icon, styles[position], IOS && styles.ios, style)}
        >
          {top}
          {children}
        </Component>
      )
    }

    return (
      <Component id='icon-tabs-header'>
        <Touchable
          style={stl(
            styles.icon,
            styles.touch,
            styles[position],
            IOS && styles.ios,
            style
          )}
          onPress={onPress}
        >
          {top}
          {children}
        </Touchable>
      </Component>
    )
  }
)
