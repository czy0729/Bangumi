/*
 * @Author: czy0729
 * @Date: 2019-07-17 10:03:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-04 01:50:05
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Button, Mesume } from '@components'
import { _ } from '@stores'

function Preview({ onLogin, onTour }) {
  const styles = memoStyles()
  return (
    <View style={[_.container.column, styles.gray]}>
      <Mesume />
      <View style={[styles.bottomContainer, _.mt.lg]}>
        <Button type='main' shadow onPress={onLogin}>
          账号登陆
        </Button>
        <Button style={_.mt.md} type='plain' shadow onPress={onTour}>
          游客预览
        </Button>
      </View>
    </View>
  )
}

Preview.defaultProps = {
  onLogin: Function.prototype,
  onTour: Function.prototype
}

export default observer(Preview)

const memoStyles = _.memoStyles(_ => ({
  gray: {
    backgroundColor: _.colorBg
  },
  bottomContainer: {
    width: 320,
    height: 350
  }
}))
