/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 05:34:51
 */
import React, { useContext } from 'react'
import { StoreContext } from '@stores/utils'
import { portal } from './api'
import { PortalConsumer, PortalContext, PortalHost } from './host'

import type { PropsWithChildren } from 'react'

function Portal({ children }: PropsWithChildren) {
  const manager = useContext(PortalContext)

  // Portal 会把内容搬到 App 根部的 Portal.Host 渲染, 脱离屏幕的 StoreContext.Provider,
  // 在此捕获 screen key 并回放, 保证 children 内 useStore 可用
  const screenId = useContext(StoreContext)

  return (
    <PortalConsumer manager={manager}>
      <StoreContext.Provider value={screenId}>{children}</StoreContext.Provider>
    </PortalConsumer>
  )
}

Portal.Host = PortalHost
Portal.add = portal.add
Portal.remove = portal.remove

export { Portal }

export default Portal
