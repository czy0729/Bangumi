/*
 * @Author: czy0729
 * @Date: 2024-04-20 16:15:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-18 11:51:16
 */
import { _, systemStore } from '@stores'
import { t } from '@utils/fetch'

export function handleLight() {
  if (!_.isDark) return

  _.toggleMode()

  t('设置.切换', {
    title: '黑暗模式',
    checked: !_.isDark
  })
}

export function handleDeepDark() {
  const { deepDark } = systemStore.setting
  if (_.isDark && deepDark) return

  if (!deepDark) systemStore.switchSetting('deepDark')
  _.toggleMode('dark')

  t('设置.切换', {
    title: '纯黑',
    checked: !deepDark
  })
}

export function handleDark() {
  const { deepDark } = systemStore.setting
  if (_.isDark && !deepDark) return

  if (deepDark) systemStore.switchSetting('deepDark')
  _.toggleMode('dark')

  t('设置.切换', {
    title: '纯黑',
    checked: deepDark
  })
}
