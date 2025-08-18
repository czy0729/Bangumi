/*
 * @Author: czy0729
 * @Date: 2019-05-19 20:13:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-18 16:21:14
 */
import React from 'react'
import { Component, Iconfont, Image, Text, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { GROUP_THUMB_MAP } from '@assets/images'
import { COMPONENT } from './ds'
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
      text === '词' ? (
        <Image
          style={_.mr.xs}
          src={GROUP_THUMB_MAP[_.select('wordcloud_0', 'wordcloud')]}
          size={19}
          resizeMode='contain'
          placeholder={false}
          skeleton={false}
        />
      ) : (
        <Text style={_.mr.xs} type='desc' size={size}>
          {text}
        </Text>
      )
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
          style={stl(styles.icon, styles.touch, styles[position], IOS && styles.ios, style)}
          onPress={onPress}
        >
          {top}
          {children}
        </Touchable>
      </Component>
    )
  },
  COMPONENT
)

export default IconTabsHeader
