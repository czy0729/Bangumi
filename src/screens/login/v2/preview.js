/*
 * @Author: czy0729
 * @Date: 2019-07-17 10:03:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-19 14:51:04
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { Button, Mesume, Heatmap } from '@components'
import { _ } from '@stores'

function Preview({ onLogin, onTour }) {
  return (
    <View style={_.container.column}>
      <Mesume />
      <View style={[styles.bottomContainer, _.mt.lg]}>
        <Button type='main' shadow onPress={onLogin}>
          账号登陆
        </Button>
        <View style={_.mt.md}>
          <Button type='plain' shadow onPress={onTour}>
            游客预览
          </Button>
          <Heatmap id='登陆.游客访问' />
        </View>
      </View>
    </View>
  )
}

Preview.defaultProps = {
  onLogin: Function.prototype,
  onTour: Function.prototype
}

export default observer(Preview)

const styles = StyleSheet.create({
  bottomContainer: {
    width: 300,
    height: 400
  }
})
