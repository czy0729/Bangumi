/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 *
 * 抽屉开合状态与跨页收起
 */
import { useEffect, useState } from 'react'
import { BackHandler } from 'react-native'
import { systemStore, uiStore } from '@stores'
import { navigationReference } from '@utils'
import { useInsets } from '@utils/hooks'
import { ANDROID } from '@constants'
import { NAVIGATION_RETRY_INTERVAL, NAVIGATION_RETRY_MAX } from './ds'
import { getHiddenMenus, getMenus, getVisibleMenus } from './utils'

import type { UseMoreMenu } from './types'

export function useMoreMenu(): UseMoreMenu {
  const { visible, all } = uiStore.moreMenu
  const { statusBarHeight, bottom } = useInsets()

  const menus = getMenus(systemStore.setting.discoveryMenu)
  const visibleMenus = getVisibleMenus(menus)
  const hiddenMenus = getHiddenMenus(menus)

  // 首次打开后才挂载列表
  const [rendered, setRendered] = useState(visible)
  useEffect(() => {
    if (visible) setRendered(true)
  }, [visible])

  // 安卓返回键优先关闭抽屉
  useEffect(() => {
    if (!ANDROID || !visible) return

    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      uiStore.closeMoreMenu()
      return true
    })

    return () => subscription.remove()
  }, [visible])

  // 路由变化时收起, 避免抽屉残留在其他页面上方
  useEffect(() => {
    if (!visible) return

    let timer: ReturnType<typeof setTimeout> | undefined
    let unsubscribe: (() => void) | undefined
    let disposed = false
    let attempts = 0

    // 首帧可能拿不到导航引用, 等容器就绪后补订阅
    const subscribe = () => {
      const navigation = navigationReference()
      if (!navigation?.addListener) {
        if (disposed || attempts >= NAVIGATION_RETRY_MAX) return

        attempts += 1
        timer = setTimeout(subscribe, NAVIGATION_RETRY_INTERVAL)
        return
      }

      unsubscribe = navigation.addListener('state', () => {
        uiStore.closeMoreMenu()
      })
    }
    subscribe()

    return () => {
      disposed = true
      clearTimeout(timer)
      unsubscribe?.()
    }
  }, [visible])

  return {
    visible,
    all,
    rendered,
    statusBarHeight,
    bottom,
    visibleMenus,
    hiddenMenus
  }
}
