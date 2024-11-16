/*
 * @Author: czy0729
 * @Date: 2019-05-20 22:29:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:26:27
 */
import React from 'react'
import { Button, Component, Text } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import i18n from '@constants/i18n'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as LoginProps } from './types'

export { LoginProps }

/** 提示登录块 */
export const Login = ob(({ style, text = '', btnText = `重新${i18n.login()}` }: LoginProps) => {
  const navigation = useNavigation()
  return (
    <Component id='base-login' style={stl(_.container.column, _.container.plain, style)}>
      {!!text && (
        <Text style={_.mb.md} type='sub' size={16}>
          {text}
        </Text>
      )}
      <Button style={styles.btn} shadow onPress={() => navigation.push('LoginV2')}>
        {btnText}
      </Button>
    </Component>
  )
}, COMPONENT)

export default Login
