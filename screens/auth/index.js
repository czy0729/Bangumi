/*
 * @Author: czy0729
 * @Date: 2019-03-31 10:25:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-02 06:56:44
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Button } from '@components'
import { userStore } from '@stores'
import _ from '@styles'

export default class Auth extends React.Component {
  componentWillMount() {
    const { navigation } = this.props
    if (userStore.isLogin) {
      navigation.navigate('Home')
    }
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={_.container.column}>
        <Text type='sub' size={16}>
          使用Bangumi管理观看进度
        </Text>
        <Button
          style={_.mt.md}
          width={160}
          shadow
          onPress={() => navigation.push('Login')}
        >
          现在登录
        </Button>
      </View>
    )
  }
}
