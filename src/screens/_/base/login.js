/*
 * @Author: czy0729
 * @Date: 2019-05-20 22:29:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-28 18:15:27
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Button } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import i18n from '@constants/i18n'

export const Login = obc(
  (
    { style, text = 'cookie已过期', btnText = `重新${i18n.login()}` },
    { navigation }
  ) => (
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
