/*
 * @Author: czy0729
 * @Date: 2019-04-05 21:12:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-29 20:15:43
 */
import React from 'react'
import { Component, Flex, Iconfont, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { info } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { WEB } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as LogoProps } from './types'

export { LogoProps }

/** 切换主题中 */
let pendding = false

/** bgm.tv Logo */
export const Logo = ob(
  ({ navigation, forceUpdate, path = 'Setting' }: LogoProps) => (
    <Component id='base-logo'>
      <Touchable
        style={styles.radius}
        onPress={() => {
          if (WEB) {
            if (navigation) navigation.push('Discovery')
            return
          }

          if (pendding || !systemStore.setting.logoToggleTheme) return

          pendding = true
          t('其他.切换主题', {
            isDark: !_.isDark
          })

          info('主题切换中', 1.2)
          setTimeout(() => {
            _.toggleMode()

            if (typeof forceUpdate === 'function') {
              // 安卓端需要主动触发重渲染才能改变颜色
              setTimeout(() => {
                forceUpdate()
              }, 0)
            }

            setTimeout(() => {
              pendding = false
            }, 2000)
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

export default Logo
