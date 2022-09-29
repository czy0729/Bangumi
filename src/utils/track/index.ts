/*
 * @Author: czy0729
 * @Date: 2022-04-13 00:32:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 20:06:04
 */
import { NativeModules, InteractionManager } from 'react-native'
import { DEV, IOS_IPA } from '@/config'
import { WSA } from '@constants/device'
import { HOST, IOS, VERSION_GITHUB_RELEASE } from '@constants/constants'
import events, { EventKeys } from '@constants/events'
import { urlStringify } from '../utils'
import { getUserStoreAsync, getThemeStoreAsync, getSystemStoreAsync } from '../async'
import { log } from '../dev'
import { xhr } from './utils'
import { SI_ANDROID, SI_ERROR, SI_IOS, SI_UV, SI_WSA } from './ds'

const { UMAnalyticsModule } = NativeModules

let lastQuery = ''
let currentUrl = ''
let currentQuery = ''

/** HM@6.0 浏览统计 */
export function hm(url?: string, screen?: string) {
  if (DEV) return

  try {
    // 保证这种低优先级的操作在UI响应之后再执行
    InteractionManager.runAfterInteractions(() => {
      if (screen) t('其他.查看', { screen })

      const fullUrl = String(url).indexOf('http') === -1 ? `${HOST}/${url}` : url
      const query: {
        [key: string]: any
      } = {
        v: VERSION_GITHUB_RELEASE
      }
      if (IOS && IOS_IPA) query.ipa = 1

      const { isDark, isTinygrailDark } = getThemeStoreAsync()
      if (isDark) query.dark = 1

      const { customFontFamily } = getSystemStoreAsync().setting
      if (!customFontFamily) query.font = 1

      if (screen) {
        if (screen.includes('Tinygrail') && isTinygrailDark) query.tdark = 1
        query.s = screen
      }

      const si = WSA ? SI_WSA : IOS ? SI_IOS : SI_ANDROID
      const queryStr = urlStringify(query)
      const u = `${fullUrl}${fullUrl.includes('?') ? '&' : '?'}${queryStr}`
      xhr(si, u)

      lastQuery = currentQuery
      currentQuery = queryStr
      currentUrl = u
    })
  } catch (error) {
    console.error('[track] hm', error)
  }
}

/** UA */
export function ua() {
  if (DEV) return

  try {
    InteractionManager.runAfterInteractions(() => {
      const userStore = getUserStoreAsync()
      if (!userStore.isWebLogin) return

      const si = SI_UV
      const u = `${getUserStoreAsync().url}?v=${VERSION_GITHUB_RELEASE}`
      xhr(si, u)
    })
  } catch (error) {
    console.error('[track] ua', error)
  }
}

/** Error 致命错误上报 */
export function err(desc: string) {
  if (DEV) return

  try {
    if (!desc) return

    const userStore = getUserStoreAsync()
    const si = SI_ERROR
    const u = `${userStore?.url}?${urlStringify({
      v: VERSION_GITHUB_RELEASE,
      d: desc,
      l: lastQuery,
      c: currentQuery
    })}`
    xhr(si, u)

    t('其他.崩溃', {
      error: desc,
      id: userStore?.myId || ''
    })
  } catch (error) {}
}

/** 埋点统计 */
export function t(
  desc: EventKeys,
  eventData?: {
    [key: string]: string | number | boolean
  }
) {
  if (!desc || typeof desc !== 'string') return

  // fixed: 遗留问题, 显示为登录, 统计还是以前录入的登陆
  desc = desc.replace(/登录/g, '登陆') as EventKeys

  if (IOS) {
    if (!DEV) return

    const eventId = events[desc]
    log(
      `${eventId ? '' : '找不到eventId '}🏷️  ${desc} ${
        eventData ? JSON.stringify(eventData) : ''
      }`
    )
    return
  }

  try {
    // 保证这种低优先级的操作在UI响应之后再执行
    InteractionManager.runAfterInteractions(() => {
      const eventId = events[desc]
      if (eventId) {
        if (eventData) {
          UMAnalyticsModule.onEventWithMap(
            eventId,
            eventId === '其他.崩溃'
              ? {
                  ...eventData,
                  url: currentUrl
                }
              : eventData
          )
        } else {
          UMAnalyticsModule.onEvent(eventId)
        }
      }
    })
  } catch (error) {
    console.error('[track] t', error)
  }
}
