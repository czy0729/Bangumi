/*
 * @Author: czy0729
 * @Date: 2022-04-13 00:32:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:32:14
 */
import { EVENTS as events } from '@constants'
import { WEB } from '@constants/device'
import { IOS, VERSION_GITHUB_RELEASE } from '@constants/env'
import { HOST } from '@constants/host'
import { DEV, IOS_IPA } from '@src/config'
import { syncSystemStore as _s, syncThemeStore as _, syncUserStore as _u } from '../async'
import { isDevtoolsOpen } from '../dom'
import { postTask } from '../scheduler'
import { urlStringify } from '../utils'
import { getReferer, log, umami, umamiEvent, xhr } from './utils'
import { SI_UV, WEBSITE_UV } from './ds'

import type { EventKeys } from '@constants'
import type { EventData, HMQuery } from './type'

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
  postTask(() => {
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
    } catch {}
  })
}

/** UV */
export function ua() {
  if (WEB || isDevtoolsOpen()) return

  postTask(() => {
    try {
      const u = _u()
      xhr(SI_UV, `${u.url}?v=${VERSION_GITHUB_RELEASE}`)
      umami(u.url, u.userInfo.nickname, WEBSITE_UV, getReferer())
    } catch {}
  })
}

/** Evt */
export function t(desc: EventKeys, eventData?: EventData) {
  if (!desc || typeof desc !== 'string' || isDevtoolsOpen()) return

  postTask(() => {
    try {
      const eventId = events[desc as keyof typeof events]
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
        log('t', { id: desc, data: eventData })
      }
    } catch {}
  })
}

/** @deprecated with Evt */
// 泛型约束需 any 而非 unknown: strictFunctionTypes 下 unknown[] 会拒绝带具体类型参数的函数
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    return result as ReturnType<T>
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
  } catch {}
}
