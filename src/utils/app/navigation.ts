/*
 * @Author: czy0729
 * @Date: 2026-09-08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-08
 *
 * 导航处理（navigationReference 引用管理、appNavigate 链接路由跳转, 拆分自 app.ts）
 */
import { EVENT } from '@constants/data'
import { WEB } from '@constants/device'
import { HOST } from '@constants/host'
import { syncSystemStore, syncUIStore } from '../async'
import { logger } from '../dev'
import { t } from '../fetch'
import { open } from '../utils'
import { fixedBgmUrl, matchBgmLink } from './data-source'

import type { EventType, Navigation, Paths } from '@types'

const NAVIGATION_COOLDOWN = 400
let __lastNavigationTime = 0
let __navigationReference: Navigation | undefined

function isNavigationAllowed(): boolean {
  return true

  const now = Date.now()
  if (__lastNavigationTime && now - __lastNavigationTime < NAVIGATION_COOLDOWN) {
    return false
  }

  __lastNavigationTime = now
  return true
}

/** 保存 navigation 引用 */
export function navigationReference(navigation?: Navigation | undefined) {
  if (WEB) {
    return (require('@components/storybook/navigation') as { StorybookNavigation: Navigation })
      .StorybookNavigation
  }

  if (navigation) {
    __navigationReference = navigation
    if (!__navigationReference.push) {
      __navigationReference.push = __navigationReference.navigate
    }

    // NavigationPushType 为多签名交叉类型, 统一收窄为 (path, params) 调用形态
    const originalPush = __navigationReference.push as (path: Paths, params?: unknown) => void
    const originalNavigate = __navigationReference.navigate as (
      path: Paths,
      params?: unknown
    ) => void
    __navigationReference.push = ((path: Paths, params?: unknown) => {
      if (!isNavigationAllowed()) return
      return originalPush(path, params)
    }) as Navigation['push']
    __navigationReference.navigate = ((path: Paths, params?: unknown) => {
      if (!isNavigationAllowed()) return
      return originalNavigate(path, params)
    }) as Navigation['push']
  }

  return __navigationReference
}

/**
 * 根据 Bangumi 的 url 判断路由跳转方式
 * @param url            链接
 * @param navigation     路由对象
 * @param passParams     传递的参数
 * @param event          追踪事件
 * @param openWebBrowser 没路由对象或者非本站是否使用浏览器尝试打开
 */
export function appNavigate(
  url: string = '',
  navigation?: Navigation,
  passParams: object = {},
  event: EventType = EVENT,
  openWebBrowser: boolean = true
): boolean {
  try {
    if (syncUIStore().isScrolling) return false

    const { id, data = {} } = event

    // 代理模式下需要把代理域名替换回 bgm.tv, 否则 matchBgmLink 无法匹配路由
    let value = fixedBgmUrl(url)
    const { workerProxy } = syncSystemStore().setting
    if (workerProxy && value.includes(workerProxy)) {
      value = value.replace(workerProxy, HOST)
    }

    const result = matchBgmLink(value)

    // 没路由对象或者非本站
    if (!navigation || !value.includes(HOST) || !result) {
      if (openWebBrowser) {
        t(id, {
          to: 'WebBrowser',
          url: value,
          ...data
        })

        open(value)
      }
      return false
    }

    const { route, params } = result
    t(id, {
      to: route,
      ...params,
      ...data
    })
    ;(navigation.push as (path: Paths, params?: unknown) => void)(route as Paths, {
      _url: value,
      ...params,
      ...passParams
    })
    return true
  } catch (error) {
    logger.error('@utils/app', 'appNavigate')
    return false
  }
}
