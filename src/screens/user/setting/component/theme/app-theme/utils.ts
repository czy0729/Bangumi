/*
 * @Author: czy0729
 * @Date: 2024-04-20 16:15:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-20 16:29:05
 */
import { updateHeader } from '@components/header/utils'
import { _, systemStore } from '@stores'
import { t } from '@utils/fetch'
import { Navigation } from '@types'

export function handleLight(navigation: Navigation) {
  if (!_.isDark) return

  _.toggleMode()

  // 用于主动刷新头部颜色
  setTimeout(() => {
    updateHeader({
      navigation
    })

    setTimeout(() => {
      if (_.mode !== _.tinygrailThemeMode) _.toggleTinygrailThemeMode()
    }, 40)
  }, 0)

  t('设置.切换', {
    title: '黑暗模式',
    checked: !_.isDark
  })
}

export function handleDeepDark(navigation: Navigation) {
  const { deepDark } = systemStore.setting
  if (_.isDark && deepDark) return

  if (!deepDark) systemStore.switchSetting('deepDark')
  _.toggleMode('dark')

  setTimeout(() => {
    updateHeader({
      navigation
    })

    setTimeout(() => {
      if (_.mode !== _.tinygrailThemeMode) _.toggleTinygrailThemeMode()
    }, 40)
  }, 0)

  t('设置.切换', {
    title: '纯黑',
    checked: !deepDark
  })
}

export function handleDark(navigation: Navigation) {
  const { deepDark } = systemStore.setting
  if (_.isDark && !deepDark) return

  if (deepDark) systemStore.switchSetting('deepDark')
  _.toggleMode('dark')

  setTimeout(() => {
    updateHeader({
      navigation
    })

    setTimeout(() => {
      if (_.mode !== _.tinygrailThemeMode) _.toggleTinygrailThemeMode()
    }, 40)
  }, 0)

  t('设置.切换', {
    title: '纯黑',
    checked: deepDark
  })
}
