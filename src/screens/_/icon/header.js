/*
 * @Author: czy0729
 * @Date: 2019-05-24 04:34:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-15 23:21:02
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable, Iconfont } from '@components'
import { _ } from '@stores'

function IconHeader({
  style,
  size,
  name,
  color = _.colorTitle,
  onPress,
  children
}) {
  return (
    <Touchable style={[styles.icon, style]} onPress={onPress}>
      <Iconfont size={size} name={name} color={color} />
      {children}
    </Touchable>
  )
}

IconHeader.defaultProps = {
  size: 20
}

export default observer(IconHeader)

const styles = StyleSheet.create({
  icon: {
    padding: _.sm
  }
})
