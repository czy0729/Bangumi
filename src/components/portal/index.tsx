/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 06:39:24
 */
import React, { useContext } from 'react'
import { NavigationContext } from '@react-navigation/native'
import { StoreContext } from '@stores/utils'
import { portal } from './api'
import { PortalConsumer, PortalContext, PortalHost } from './host'

import type { PropsWithChildren } from 'react'

function Portal({ children }: PropsWithChildren) {
  const manager = useContext(PortalContext)

  // Portal 会把内容搬到 App 根部的 Portal.Host 渲染, 脱离屏幕的 StoreContext.Provider 与
  // react-navigation 的 NavigationContext, 在此捕获并回放, 保证 children 内 useStore / useNavigation 可用
  const screenId = useContext(StoreContext)
  const navigation = useContext(NavigationContext)

  return (
    <PortalConsumer manager={manager}>
      <NavigationContext.Provider value={navigation}>
        <StoreContext.Provider value={screenId}>{children}</StoreContext.Provider>
      </NavigationContext.Provider>
    </PortalConsumer>
  )
}

Portal.Host = PortalHost
Portal.add = portal.add
Portal.remove = portal.remove

export { Portal }

export default Portal
