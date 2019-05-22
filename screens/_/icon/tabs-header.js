/*
 * @Author: czy0729
 * @Date: 2019-05-19 20:13:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-22 22:42:17
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Touchable, Iconfont } from '@components'
import { IOS } from '@constants'
import _ from '@styles'

const IconTabsHeader = ({ style, name, color, position, onPress }) => (
  <Touchable
    style={[styles.icon, styles[position], IOS && styles.ios, style]}
    onPress={onPress}
  >
    <Iconfont size={22} name={name} color={color} />
  </Touchable>
)

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
    marginRight: -_.sm
  },
  ios: {
    marginBottom: _.tabsHeight
  }
})
