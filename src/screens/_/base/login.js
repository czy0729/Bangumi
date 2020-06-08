/*
 * @Author: czy0729
 * @Date: 2019-05-20 22:29:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-06 16:25:00
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Text, Button } from '@components'
import { _ } from '@stores'

function Login({ style }, { navigation }) {
  return (
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
  )
}

Login.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Login)
