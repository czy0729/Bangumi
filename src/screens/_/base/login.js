/*
 * @Author: czy0729
 * @Date: 2019-05-20 22:29:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 18:03:19
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Button } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

export const Login = obc(({ style }, { navigation }) => (
  <View style={[_.container.column, _.container._plain, style]}>
    <Text type='sub' size={16}>
      cookie已过期
    </Text>
    <Button
      style={[
        {
          width: 160
        },
        _.mt.md
      ]}
      shadow
      onPress={() => navigation.push('LoginV2')}
    >
      重新登陆
    </Button>
  </View>
))
