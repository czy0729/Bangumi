/*
 * @Author: czy0729
 * @Date: 2019-04-05 21:12:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:09:53
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Component, Flex, Iconfont, StatusBar, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { info } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { IOS, WEB } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as LogoProps } from './types'
export type { LogoProps }

/** 切换主题中 */
let pendding = false

/** BGM Logo */
export const Logo = observer(({ navigation, forceUpdate, path = 'Setting' }: LogoProps) => {
  r(COMPONENT)

  const handlePress = useCallback(() => {
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

      if (IOS) {
        setTimeout(() => {
          StatusBar.setBarStyle(_.isDark ? 'light-content' : 'dark-content')
        }, 0)
      }

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
  }, [forceUpdate, navigation])

  const handleLongPress = useCallback(() => {
    if (navigation) navigation.push(path)
  }, [navigation, path])

  return (
    <Component id='base-logo'>
      <Touchable style={styles.radius} onPress={handlePress} onLongPress={handleLongPress}>
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
  )
})

export default Logo
