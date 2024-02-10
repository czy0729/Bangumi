/*
 * @Author: czy0729
 * @Date: 2022-04-13 00:32:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-05 04:05:10
 */
import { Platform } from 'react-native'
import { HOST, IOS, VERSION_CODE, VERSION_GITHUB_RELEASE } from '@constants/constants'
import { STORYBOOK } from '@constants/device'
import events, { EventKeys } from '@constants/events'
import { DEV, GITHUB_ACTION, IOS_IPA } from '@/config'
import { syncSystemStore, syncThemeStore, syncUserStore } from '../async'
import { isDevtoolsOpen } from '../dom'
import { runAfter, urlStringify } from '../utils'
import { EventData, HMQuery } from './type'
import { umami, umamiEvent, xhr } from './utils'
import { SI_UV, WEBSITE_UV } from './ds'

/** 上次路由完整参数 */
let lastQuery = ''

/** 当前路由完整参数 */
let currentQuery = ''

/** 当前路由地址 */
let currentUrl = ''

/** 当前路由标题描述 */
let currentTitle = ''

/** PV */
export function hm(url?: string, screen?: string, title?: string) {
  // 保证这种低优先级的操作在 UI 响应之后再执行
  runAfter(() => {
    try {
      const query: HMQuery = { v: VERSION_GITHUB_RELEASE }
      if (IOS && IOS_IPA) query.ipa = 1
      if (syncThemeStore().isDark) query.dark = 1
      if (!syncSystemStore().setting.customFontFamily) query.font = 1
      if (screen) query.s = screen

      const fullUrl = String(url).indexOf('http') === -1 ? `${HOST}/${url}` : url
      const queryStr = urlStringify(query)
      const u = `${fullUrl}${fullUrl.includes('?') ? '&' : '?'}${queryStr}`
      if (!isDevtoolsOpen()) umami(u, title)

      lastQuery = currentQuery
      currentQuery = queryStr
      currentUrl = u
      currentTitle = title
    } catch (error) {}
  })
}

/** UV */
export function ua() {
  if (STORYBOOK || isDevtoolsOpen()) return

  runAfter(() => {
    try {
      const u = syncUserStore()
      xhr(SI_UV, `${u.url}?v=${VERSION_GITHUB_RELEASE}`)

      const referrre: string[] = [Platform.OS]
      if (IOS_IPA) referrre.push('ipa')
      referrre.push(VERSION_CODE)
      if (GITHUB_ACTION) referrre.push('github')

      umami(u.url, u.userInfo.nickname, WEBSITE_UV, `https://${referrre.join('_')}.com`)
    } catch (error) {}
  })
}

/** Evt */
export function t(desc: EventKeys, eventData?: EventData) {
  if (!desc || typeof desc !== 'string' || isDevtoolsOpen()) return

  // 保证这种低优先级的操作在 UI 响应之后再执行
  runAfter(() => {
    try {
      const eventId = events[desc]
      if (eventId) {
        syncSystemStore().track(eventId)

        const userId = syncUserStore().myId || 0
        umamiEvent(
          desc,
          userId
            ? {
                userId,
                ...(eventData || {})
              }
            : eventData || {},
          currentUrl,
          currentTitle
        )
      }
    } catch (error) {}
  })
}

/** Fatal Error */
export function err(desc: string) {
  if (!desc || DEV || STORYBOOK || isDevtoolsOpen()) return

  try {
    umamiEvent(
      '其他.崩溃',
      {
        id: syncUserStore()?.myId || '',
        version: VERSION_GITHUB_RELEASE,
        error: desc,
        lastQuery,
        currentQuery
      },
      currentUrl,
      currentTitle
    )
  } catch (error) {}
}
