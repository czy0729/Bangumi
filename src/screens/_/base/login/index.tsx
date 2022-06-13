/*
 * 提示登录块
 *
 * @Author: czy0729
 * @Date: 2019-05-20 22:29:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-13 17:00:45
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Button } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import i18n from '@constants/i18n'
import { styles } from './styles'
import { Props as LoginProps } from './types'

export { LoginProps }

export const Login = obc(
  (
    { style, text = 'cookie 已过期', btnText = `重新${i18n.login()}` }: LoginProps,
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
