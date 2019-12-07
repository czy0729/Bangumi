/*
 * @Author: czy0729
 * @Date: 2019-05-24 04:34:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-07 01:13:34
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable, Iconfont } from '@components'
import { _ } from '@stores'

function IconHeader({ style, size, name, color = _.colorTitle, onPress }) {
  return (
    <Touchable style={[styles.icon, style]} onPress={onPress}>
      <Iconfont size={size} name={name} color={color} />
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
