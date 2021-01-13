/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:23:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-13 23:11:53
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { IOS } from '@constants'

function IconBack({ style, navigation, color }) {
  return (
    <Touchable style={[styles.container, style]} onPress={navigation.goBack}>
      <Iconfont
        name={IOS ? 'left' : 'arrow-left'}
        size={IOS ? 20 : 22}
        color={color}
      />
    </Touchable>
  )
}

IconBack.defaultProps = {
  color: _.colorPlain
}

export default IconBack

const styles = StyleSheet.create({
  container: {
    padding: _.sm,
    paddingLeft: IOS ? _.sm : _.sm + 4
  }
})
