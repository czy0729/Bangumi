/*
 * @Author: czy0729
 * @Date: 2022-03-14 17:59:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-23 23:01:03
 */
import React from 'react'
import { Button, Component, Flex, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { feedback, open } from '@utils'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { URL_ZHINAN, WEB } from '@constants'
import i18n from '@constants/i18n'
import { IconTouchable } from '../../icon/touchable'
import { StatusBarPlaceholder } from '../status-bar-placeholder'
import { COMPONENT } from './ds'
import { styles } from './styles'

/** 未登录页面 */
export const Auth = ob(() => {
  const navigation = useNavigation()
  return (
    <Component id='base-auth' style={_.container.plain}>
      <StatusBarPlaceholder />
      <Flex style={styles.toolbar}>
        <Touchable style={styles.zhinan} onPress={() => open(URL_ZHINAN)}>
          <Flex>
            <Iconfont name='md-chrome-reader-mode' color={_.colorDesc} size={20} />
            <Text style={_.ml.sm} size={13} lineHeight={14}>
              指南
            </Text>
          </Flex>
        </Touchable>
        {!WEB && (
          <IconTouchable
            style={_.mr.xs}
            name={_.isDark ? 'moon' : 'sunny'}
            color={_.colorDesc}
            size={18}
            onPress={() => {
              setTimeout(() => {
                feedback(true)
                _.toggleMode()
              }, 40)
            }}
          />
        )}
        <Flex.Item />
        <IconTouchable
          style={_.mr.xs}
          name='md-search'
          color={_.colorDesc}
          size={22}
          onPress={() => {
            navigation.push('Search')
          }}
        />
        <IconTouchable
          style={styles.setting}
          name='setting'
          color={_.colorDesc}
          size={18}
          onPress={() => {
            navigation.push('Setting')
          }}
        />
      </Flex>
      <Flex style={styles.go} direction='column' justify='center'>
        <Button
          style={styles.btn}
          shadow
          onPress={() => {
            navigation.push(WEB ? 'LoginToken' : 'LoginV2')
          }}
        >
          {i18n.login()}后管理进度
        </Button>
      </Flex>
    </Component>
  )
}, COMPONENT)

export default Auth
