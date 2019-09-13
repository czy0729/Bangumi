/*
 * @Author: czy0729
 * @Date: 2019-05-19 20:13:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-07 16:58:34
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Touchable, Iconfont } from '@components'
import { IOS } from '@constants'
import _ from '@styles'

function IconTabsHeader({ style, name, color, position, onPress }) {
  if (!onPress) {
    return (
      <View style={[styles.icon, styles[position], IOS && styles.ios, style]}>
        <Iconfont size={20} name={name} color={color} />
      </View>
    )
  }

  return (
    <Touchable
      style={[styles.icon, styles[position], IOS && styles.ios, style]}
      onPress={onPress}
    >
      <Iconfont size={20} name={name} color={color} />
    </Touchable>
  )
}

IconTabsHeader.defaultProps = {
  color: _.colorTitle,
  position: 'left'
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
