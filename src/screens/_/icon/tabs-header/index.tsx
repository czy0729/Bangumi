/*
 * @Author: czy0729
 * @Date: 2019-05-19 20:13:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 04:44:49
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Iconfont, Text } from '@components'
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
      <Text style={_.mr.xs} type='title' size={16} bold>
        {text}
      </Text>
    ) : (
      <Iconfont size={size} name={name} color={color} />
    )

    if (!onPress) {
      return (
        <View style={stl(styles.icon, styles[position], IOS && styles.ios, style)}>
          {top}
          {children}
        </View>
      )
    }

    return (
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
    )
  }
)
