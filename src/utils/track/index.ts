/*
 * @Author: czy0729
 * @Date: 2022-04-13 00:32:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-04 00:49:29
 */
// import { NativeModules } from 'react-native'
import { DEV, IOS_IPA } from '@/config'
import { STORYBOOK } from '@constants/device'
import { HOST, IOS, VERSION_GITHUB_RELEASE } from '@constants/constants'
import events, { EventKeys } from '@constants/events'
import { runAfter, urlStringify } from '../utils'
import { syncUserStore, syncThemeStore, syncSystemStore } from '../async'
import { isDevtoolsOpen } from '../dom'
import { umami, umamiEvent, xhr } from './utils'
import { SI_ERROR, SI_UV } from './ds'
import { EventData, HMQuery } from './type'

let lastQuery = ''
let currentQuery = ''
let currentUrl = ''
let currentTitle = ''

/** PV */
export function hm(url?: string, screen?: string, title?: string) {
  if (DEV || STORYBOOK || isDevtoolsOpen()) return

  // 保证这种低优先级的操作在 UI 响应之后再执行
  runAfter(() => {
    try {
      if (screen) {
        t('其他.查看', {
          screen
        })
      }

      const fullUrl = String(url).indexOf('http') === -1 ? `${HOST}/${url}` : url
      const query: HMQuery = {
        v: VERSION_GITHUB_RELEASE
      }
      if (IOS && IOS_IPA) query.ipa = 1

      const { isDark } = syncThemeStore()
      if (isDark) query.dark = 1

      const { customFontFamily } = syncSystemStore().setting
      if (!customFontFamily) query.font = 1

      if (screen) query.s = screen

      const queryStr = urlStringify(query)
      const u = `${fullUrl}${fullUrl.includes('?') ? '&' : '?'}${queryStr}`
      umami(u, title)

      lastQuery = currentQuery
      currentQuery = queryStr
      currentUrl = u
      currentTitle = title
    } catch (error) {}
  })
}

/** UV */
export function ua() {
  if (DEV || STORYBOOK || isDevtoolsOpen()) return

  runAfter(() => {
    try {
      const userStore = syncUserStore()
      if (!userStore.isWebLogin) return

      xhr(SI_UV, `${syncUserStore().url}?v=${VERSION_GITHUB_RELEASE}`)
    } catch (error) {}
  })
}

/** Fatal Error */
export function err(desc: string) {
  if (DEV || STORYBOOK || isDevtoolsOpen()) return

  try {
    if (!desc) return

    const userStore = syncUserStore()
    xhr(
      SI_ERROR,
      `${userStore?.url}?${urlStringify({
        v: VERSION_GITHUB_RELEASE,
        d: desc,
        l: lastQuery,
        c: currentQuery
      })}`
    )

    t('其他.崩溃', {
      error: desc,
      id: userStore?.myId || ''
    })
  } catch (error) {}
}

/** Event */
export function t(desc: EventKeys, eventData?: EventData) {
  const eventId = events[desc]
  if (eventId) {
    runAfter(() => {
      syncSystemStore().track(eventId)
    })
  }

  if (DEV || !desc || typeof desc !== 'string' || isDevtoolsOpen()) return

  // fixed: 遗留问题, 显示为登录, 统计还是以前录入的登陆
  desc = desc.replace(/登录/g, '登陆') as EventKeys

  // 保证这种低优先级的操作在 UI 响应之后再执行
  runAfter(() => {
    try {
      if (eventId) {
        const userId = syncUserStore().myId || 0
        eventData = userId
          ? {
              userId,
              ...(eventData || {})
            }
          : eventData || {}

        if (STORYBOOK) {
          // @ts-ignore
          window.umami.track(desc, eventData)
          return
        }

        umamiEvent(desc, eventData, currentUrl, currentTitle)
        return

        /** @deprecated */
        // if (eventId === '其他.崩溃') eventData.url = currentUrl
        // NativeModules.UMAnalyticsModule.onEventWithMap(eventId, eventData)
      }
    } catch (error) {}
  })
}
