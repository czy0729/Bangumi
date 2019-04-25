/*
 * @Author: czy0729
 * @Date: 2019-03-14 14:15:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-25 13:23:46
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Button } from '@components'
import _ from '@styles'

const Login = () => (
  <View style={_.container.column}>
    <Text type='sub' size={16}>
      使用Bangumi管理观看进度
    </Text>
    <Button
      style={[
        _.mt.md,
        {
          width: 160
        }
      ]}
      shadow
      onPress={() => {}}
    >
      现在登录
    </Button>
  </View>
)

export default Login
