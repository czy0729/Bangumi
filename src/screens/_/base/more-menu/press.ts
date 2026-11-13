/*
 * @Author: czy0729
 * @Date: 2026-11-13 13:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 *
 * 菜单项点击行为 (发现页菜单与全局更多菜单共用)
 */
import { Clipboard } from 'react-native'
import { uiStore, userStore } from '@stores'
import { appNavigate, feedback, info, matchBgmUrl, navigationReference } from '@utils'
import { t } from '@utils/fetch'
import { DEV, HOST_NETABA } from '@constants'
import i18n from '@constants/i18n'
import { getLastPath } from '../filter-switch/utils'

import type { MenuItem, Paths, UserId } from '@types'
import type { Options } from './types'

/** 菜单项点击, 返回是否真的处理了 (需要登录但未登录时返回 false) */
export function pressMenu(item: MenuItem, options: Options = {}) {
  const { from = 'More', onOpen, onValid, navigation } = options
  const { key, login } = item

  const { username, id } = userStore.userInfo
  const userId = username || id

  if (!DEV && login && !userId) {
    info(`请先${i18n.login()}`)
    return false
  }

  if (key === 'Open') {
    onOpen?.()
    feedback(true)
    return true
  }

  if (key === 'More') {
    t('发现.更多')
    uiStore.showMoreMenu()
    feedback(true)
    return true
  }

  t('发现.跳转', {
    to: key,
    from
  })

  onValid?.()
  navigate(item, navigation || navigationReference(), userId)
  return true
}

/** 执行跳转 */
async function navigate(item: MenuItem, navigation: Options['navigation'], userId: UserId) {
  const { key } = item

  if (key === 'Anime') {
    navigation?.push(await getLastPath())
    return
  }

  if (key === 'Netabare') {
    navigation?.push('WebBrowser', {
      url: `${HOST_NETABA}/trending`,
      title: '评分趋势'
    })
    return
  }

  if (key === 'UserTimeline') {
    navigation?.push(key, {
      userId
    })
    return
  }

  if (key === 'Link') {
    const content = await Clipboard.getString()
    const urls = matchBgmUrl(content, true) || []
    if (!urls?.[0]) {
      uiStore.showLinkModal()
      return
    }

    appNavigate(content, navigation)
    return
  }

  // 常规菜单项 key 均为注册路由 (Open / More / Netabare / UserTimeline / Link 已在上方处理)
  navigation?.push(key as Paths)
}
