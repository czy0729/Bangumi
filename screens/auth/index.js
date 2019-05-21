/*
 * @Author: czy0729
 * @Date: 2019-03-31 10:25:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-21 17:44:34
 */
import React from 'react'
import { View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { observer } from 'mobx-react'
import { Text, Button } from '@components'
import { IconTabBar } from '@screens/_'
import { userStore } from '@stores'
import _ from '@styles'

const Auth = ({ navigation }) => (
  <View style={[_.container.column, { backgroundColor: _.colorBg }]}>
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
          width: 160,
          marginBottom: _.lg
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

Auth.navigationOptions = {
  header: null,
  tabBarIcon: ({ tintColor }) => <IconTabBar name='star' color={tintColor} />,
  tabBarLabel: '进度'
}

export default observer(Auth)
