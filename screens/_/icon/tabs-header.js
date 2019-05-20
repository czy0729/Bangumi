/*
 * @Author: czy0729
 * @Date: 2019-05-19 20:13:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-20 02:53:41
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Touchable, Iconfont } from '@components'
import { IOS } from '@constants'
import _ from '@styles'

const IconTabsHeader = ({ style, name, color, onPress }) => (
  <Touchable style={[styles.icon, IOS && styles.ios, style]} onPress={onPress}>
    <Iconfont size={22} name={name} color={color} />
  </Touchable>
)

IconTabsHeader.defaultProps = {
  color: _.colorTitle
}

export default IconTabsHeader

const styles = StyleSheet.create({
  icon: {
    padding: _.sm
  },
  ios: {
    marginBottom: _.tabsHeight
  }
})
