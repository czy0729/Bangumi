/*
 * @Author: czy0729
 * @Date: 2019-05-19 20:13:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-29 01:05:20
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Touchable, Iconfont } from '@components'
import { IOS } from '@constants'
import _ from '@styles'

function IconTabsHeader({ style, name, size, color, position, onPress }) {
  if (!onPress) {
    return (
      <View style={[styles.icon, styles[position], IOS && styles.ios, style]}>
        <Iconfont size={size} name={name} color={color} />
      </View>
    )
  }

  return (
    <Touchable
      style={[styles.icon, styles[position], IOS && styles.ios, style]}
      onPress={onPress}
    >
      <Iconfont size={size} name={name} color={color} />
    </Touchable>
  )
}

IconTabsHeader.defaultProps = {
  color: _.colorTitle,
  position: 'left',
  size: 20
}

export default IconTabsHeader

const styles = StyleSheet.create({
  icon: {
    padding: _.sm
  },
  right: {
    marginRight: IOS ? -_.sm : 0
  },
  ios: {
    marginBottom: _.tabsHeight
  }
})
