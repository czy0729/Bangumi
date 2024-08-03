/*
 * @Author: czy0729
 * @Date: 2022-03-14 17:59:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 14:55:26
 */
import React from 'react'
import { Button, Component, Flex, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { obc } from '@utils/decorators'
import { STORYBOOK, URL_ZHINAN } from '@constants'
import i18n from '@constants/i18n'
import { IconTouchable } from '../../icon/touchable'
import { StatusBarPlaceholder } from '../status-bar-placeholder'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Context } from './types'

/** 未登录页面 */
export const Auth = obc(
  (props, { navigation }: Context) => (
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
        {!STORYBOOK && (
          <IconTouchable
            style={_.mr.xs}
            name={_.isDark ? 'ios-moon' : 'ios-sunny'}
            color={_.colorDesc}
            size={22}
            onPress={() => {
              setTimeout(() => {
                _.toggleMode()

                setTimeout(() => {
                  if (_.mode !== _.tinygrailThemeMode) _.toggleTinygrailThemeMode()
                }, 40)
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
          onPress={() => navigation.push('Search')}
        />
        <IconTouchable
          style={styles.setting}
          name='setting'
          color={_.colorDesc}
          size={18}
          onPress={() => navigation.push('Setting')}
        />
      </Flex>
      <Flex style={styles.go} direction='column' justify='center'>
        <Button
          style={styles.btn}
          shadow
          onPress={() => {
            navigation.push(STORYBOOK ? 'LoginToken' : 'LoginV2')
          }}
        >
          {i18n.login()}后管理进度
        </Button>
      </Flex>
    </Component>
  ),
  COMPONENT
)

export default Auth
