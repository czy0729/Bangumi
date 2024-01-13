/*
 * @Author: czy0729
 * @Date: 2019-04-05 21:12:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:29:42
 */
import React from 'react'
import { Component, Flex, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { info } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { STORYBOOK } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as LogoProps } from './types'

export { LogoProps }

/** bgm.tv Logo */
export const Logo = obc(
  ({ forceUpdate, path = 'Setting' }: LogoProps, { navigation }) => (
    <Component id='base-logo'>
      <Touchable
        style={styles.radius}
        onPress={() => {
          if (STORYBOOK) {
            if (navigation) navigation.push('Discovery')
            return
          }

          t('其他.切换主题', {
            isDark: !_.isDark
          })

          info('主题切换中', 1.2)
          setTimeout(() => {
            _.toggleMode()
            if (typeof forceUpdate === 'function') {
              // 安卓端触发重渲染
              setTimeout(() => {
                forceUpdate()
              }, 0)
            }

            setTimeout(() => {
              if (_.mode !== _.tinygrailThemeMode) _.toggleTinygrailThemeMode()
            }, 40)
          }, 40)
        }}
        onLongPress={() => {
          if (navigation) navigation.push(path)
        }}
      >
        <Flex style={styles.logo} justify='center'>
          <Iconfont
            style={styles.ios}
            size={22}
            name='bgm'
            color={_.select(_.colorTitle, _.colorDesc)}
          />
        </Flex>
      </Touchable>
    </Component>
  ),
  COMPONENT
)
