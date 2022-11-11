/*
 * Logo
 *
 * @Author: czy0729
 * @Date: 2019-04-05 21:12:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-12 05:17:52
 */
import React from 'react'
import { Touchable, Flex, Iconfont } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import { obc } from '@utils/decorators'
import { styles } from './styles'
import { Props as LogoProps } from './types'

export { LogoProps }

export const Logo = obc(
  ({ forceUpdate, path = 'Setting' }: LogoProps, { navigation }) => (
    <Touchable
      style={styles.radius}
      onPress={() => {
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
  )
)
