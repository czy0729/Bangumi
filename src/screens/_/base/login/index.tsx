/*
 * @Author: czy0729
 * @Date: 2019-05-20 22:29:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:08:46
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Button, Component, Text } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { useNavigation } from '@utils/hooks'
import i18n from '@constants/i18n'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as LoginProps } from './types'
export type { LoginProps }

/** 提示登录块 */
export const Login = observer(
  ({ style, text = '', btnText = `重新${i18n.login()}` }: LoginProps) => {
    const navigation = useNavigation(COMPONENT)

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
  }
)

export default Login
