/*
 * @Author: czy0729
 * @Date: 2019-05-19 20:13:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 13:55:35
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Iconfont } from '@components'
import { IOS } from '@constants'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { ColorValue, IconfontNames, ViewStyle } from '@types'

type Props = {
  style?: ViewStyle
  name?: IconfontNames
  size?: number
  color?: ColorValue
  position?: 'left' | 'right'
  children?: any
  onPress?: (event?: any) => any
}

export const IconTabsHeader = ob(
  ({
    style,
    name,
    size,
    color = _.colorTitle,
    position = 'left',
    children,
    onPress
  }: Props) => {
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

const styles = _.create({
  icon: {
    padding: _.sm
  },
  left: {},
  right: {
    marginRight: _.ios(-_.sm, 0)
  },
  ios: {
    marginBottom: _.tabsHeight
  },
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  }
})
