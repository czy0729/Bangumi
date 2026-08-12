/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-12 08:30:00
 */
import React, { useContext } from 'react'
import { portal } from './api'
import { PortalConsumer, PortalContext, PortalHost } from './host'

import type { ReactNode } from 'react'

function Portal({ children }: { children?: ReactNode }) {
  const manager = useContext(PortalContext)
  return <PortalConsumer manager={manager}>{children}</PortalConsumer>
}

Portal.Host = PortalHost
Portal.add = portal.add
Portal.remove = portal.remove

export { Portal }

export default Portal
