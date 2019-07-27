/*
 * @Author: czy0729
 * @Date: 2019-07-17 10:03:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-17 10:06:19
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Image, Button } from '@components'
import _ from '@styles'

function Preview({ onLogin, onTour }) {
  return (
    <View style={[_.container.column, styles.gray]}>
      <Image
        style={styles.gray}
        width={160}
        height={128}
        src={require('@assets/screens/login/login.png')}
      />
      <View style={[styles.bottomContainer, _.mt.md]}>
        <Button type='main' shadow onPress={onLogin}>
          账号登陆
        </Button>
        <Button style={_.mt.md} type='plain' shadow onPress={onTour}>
          游客访问
        </Button>
      </View>
    </View>
  )
}

Preview.defaultProps = {
  onLogin: Function.prototype,
  onTour: Function.prototype
}

export default Preview

const styles = StyleSheet.create({
  gray: {
    backgroundColor: 'rgb(251, 251, 251)'
  },
  bottomContainer: {
    width: 280,
    height: 350
  }
})
