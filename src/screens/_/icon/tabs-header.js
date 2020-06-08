/*
 * @Author: czy0729
 * @Date: 2019-05-19 20:13:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-30 15:30:36
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable, Iconfont } from '@components'
import { IOS } from '@constants'
import { _ } from '@stores'

function IconTabsHeader({
  style,
  name,
  size,
  color = _.colorTitle,
  position,
  onPress
}) {
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
  position: 'left',
  size: 20
}

export default observer(IconTabsHeader)

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
