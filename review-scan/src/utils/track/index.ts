/*
 * @Author: czy0729
 * @Date: 2022-04-13 00:32:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:46:40
 */
import { HOST, IOS, VERSION_GITHUB_RELEASE } from '@constants/constants'
import { WEB } from '@constants/device'
import events, { EventKeys } from '@constants/events'
import { DEV, IOS_IPA } from '@src/config'
import { syncSystemStore as _s, syncThemeStore as _, syncUserStore as _u } from '../async'
import { isDevtoolsOpen } from '../dom'
import { runAfter, urlStringify } from '../utils'
import { EventData, HMQuery } from './type'
import { getReferer, log, umami, umamiEvent, xhr } from './utils'
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
      if (_().isDark) query.dark = 1
      if (!_s().setting.customFontFamily) query.font = 1
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
  if (WEB || isDevtoolsOpen()) return

  runAfter(() => {
    try {
      const u = _u()
      xhr(SI_UV, `${u.url}?v=${VERSION_GITHUB_RELEASE}`)
      umami(u.url, u.userInfo.nickname, WEBSITE_UV, getReferer())
    } catch (error) {}
  })
}

/** Evt */
export function t(desc: EventKeys, eventData?: EventData) {
  if (!desc || typeof desc !== 'string' || isDevtoolsOpen()) return

  runAfter(() => {
    try {
      const eventId = events[desc]
      if (eventId) {
        _s().track(eventId)

        const userId = _u().myId || 0
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
        log('t', desc, eventData)
      }
    } catch (error) {}
  })
}

/** with Evt */
export function withT<T extends (...args: any[]) => any>(
  fn: T,
  desc: EventKeys,
  eventData?: EventData
): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    const cb = () => {
      setTimeout(() => {
        t(desc, eventData)
      }, 0)
    }

    const result = fn(...args)
    if (result instanceof Promise) {
      result.then(() => {
        cb()
      })
    } else {
      cb()
    }
    return result
  }) as T
}

/** Fatal Error */
export function err(desc: string) {
  if (!desc || DEV || WEB || isDevtoolsOpen()) return

  try {
    umamiEvent(
      '其他.崩溃',
      {
        detail: JSON.stringify({
          id: _u()?.myId || '',
          version: VERSION_GITHUB_RELEASE,
          desc,
          currentUrl,
          currentTitle,
          currentQuery,
          lastQuery
        })
      },
      currentUrl,
      currentTitle
    )
  } catch (error) {}
}
