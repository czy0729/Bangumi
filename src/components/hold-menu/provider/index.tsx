/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:26:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 04:38:24
 *
 * 菜单 Provider: 上下文组装与跨页兜底收起
 */
import { memo, useEffect } from 'react'
import { View } from 'react-native'
import { navigationReference } from '@utils'
import { globalWarn } from '@utils/dev'
import { NAVIGATION_RETRY_INTERVAL, NAVIGATION_RETRY_MAX } from '../ds'
import { MenuContext, MenuParamsContext, MenuShowContext } from '../context'
import MenuLayer from './menu-layer'
import { useMenuController } from './useMenuController'
import { styles } from './styles'

import type { Props } from '../types'
export type { Props as HoldMenuProviderProps }

function ProviderComponent({ children, theme, paddingBottom }: Props) {
  const { contextValue, paramsValue, show } = useMenuController(theme, paddingBottom)
  const { close } = contextValue

  /**
   * 页面切换时强制收起菜单
   *  - 导航转场会打断长按的缩放/开合动画, 只靠手势回调收尾时可能把「正在展开」的菜单留在新页面上
   *  - 这里不依赖具体触发路径, 只要发生导航就复位一次, 保证遮罩不会跨页残留
   */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    let unsubscribe: (() => void) | undefined
    let disposed = false
    let attempts = 0

    // Provider 包在导航容器外层, 首帧拿不到引用, 等容器 onReady 后补订阅
    const subscribe = () => {
      const navigation = navigationReference()
      if (!navigation?.addListener) {
        if (disposed) return

        // 用满重试仍未就绪: 放弃本次会话的兜底, 并留下可观察的痕迹
        if (attempts >= NAVIGATION_RETRY_MAX) {
          globalWarn('HoldMenuProvider', '导航容器长时间未就绪, 本次会话未启用跨页收起')
          return
        }

        attempts += 1
        timer = setTimeout(subscribe, NAVIGATION_RETRY_INTERVAL)
        return
      }

      unsubscribe = navigation.addListener('state', () => close())
    }
    subscribe()

    return () => {
      disposed = true
      clearTimeout(timer)
      unsubscribe?.()
    }
  }, [close])

  return (
    <MenuContext.Provider value={contextValue}>
      <MenuParamsContext.Provider value={paramsValue}>
        <MenuShowContext.Provider value={show}>
          <View style={styles.flex}>
            {children}
            <MenuLayer />
          </View>
        </MenuShowContext.Provider>
      </MenuParamsContext.Provider>
    </MenuContext.Provider>
  )
}

const Provider = memo(ProviderComponent)

export default Provider
