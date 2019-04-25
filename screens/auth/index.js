/*
 * @Author: czy0729
 * @Date: 2019-03-31 10:25:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-25 13:31:24
 */
import React from 'react'
import { View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { observer } from 'mobx-react'
import { Text, Button } from '@components'
import { userStore } from '@stores'
import _ from '@styles'

const Auth = ({ navigation }) => (
  <View style={_.container.column}>
    <NavigationEvents
      onWillFocus={() => {
        if (userStore.isLogin) {
          navigation.navigate('Home')
        }
      }}
    />
    <Text type='sub' size={16}>
      使用Bangumi管理观看进度
    </Text>
    <Button
      style={[
        {
          width: 160
        },
        _.mt.md
      ]}
      shadow
      onPress={() => navigation.push('Login')}
    >
      现在登录
    </Button>
  </View>
)

export default observer(Auth)
