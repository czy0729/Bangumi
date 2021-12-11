/*
 * @Author: czy0729
 * @Date: 2019-05-20 22:29:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-11 15:46:38
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Button } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

export const Login = obc(
  ({ style, text = 'cookie已过期', btnText = '重新登录' }, { navigation }) => (
    <View style={[_.container.column, _.container._plain, style]}>
      <Text type='sub' size={16}>
        {text}
      </Text>
      <Button style={styles.btn} shadow onPress={() => navigation.push('LoginV2')}>
        {btnText}
      </Button>
    </View>
  )
)

const styles = _.create({
  btn: {
    width: 160,
    marginTop: _.md
  }
})
