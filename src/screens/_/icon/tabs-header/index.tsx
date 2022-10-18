/*
 * @Author: czy0729
 * @Date: 2019-05-19 20:13:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-18 16:32:34
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Iconfont } from '@components'
import { IOS } from '@constants'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { styles } from './styles'
import { Props as IconTabsHeaderProps } from './types'

export { IconTabsHeaderProps }

export const IconTabsHeader = ob(
  ({
    style,
    name,
    size,
    color = _.colorTitle,
    position = 'left',
    children,
    onPress
  }: IconTabsHeaderProps) => {
    if (!onPress) {
      return (
        <View style={[styles.icon, styles[position], IOS && styles.ios, style]}>
          <Iconfont size={size} name={name} color={color} />
          {children}
        </View>
      )
    }

    return (
      <Touchable
        style={[styles.icon, styles.touch, styles[position], IOS && styles.ios, style]}
        onPress={onPress}
      >
        <Iconfont size={size} name={name} color={color} />
        {children}
      </Touchable>
    )
  }
)
