/*
 * @Author: czy0729
 * @Date: 2026-08-12 08:30:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-12 08:30:00
 */
import React, { createContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { usePortalConsumer, usePortalHost } from './hooks'

import type { ReactNode } from 'react'
import type { Manager } from './types'

export const PortalContext = createContext<Manager | null>(null)

/**
 * Portal host 实际渲染所有通过 add/Portal 挂载的门户
 */
function PortalHost({ children }: { children?: ReactNode }) {
  const { manager, items } = usePortalHost()

  return (
    <PortalContext.Provider value={manager}>
      <View style={styles.container} collapsable={false}>
        {children}
      </View>
      {items.map((item, index) => (
        <View
          key={item.key}
          collapsable={false}
          /* Need collapsable=false here to clip the elevations, otherwise they appear above sibling components */
          pointerEvents='box-none'
          style={[StyleSheet.absoluteFill, { zIndex: 1000 + index }]}
        >
          {item.children}
        </View>
      ))}
    </PortalContext.Provider>
  )
}

PortalHost.displayName = 'Portal.Host'

function PortalConsumer({ manager, children }: { manager: Manager | null; children?: ReactNode }) {
  usePortalConsumer(manager, children as ReactNode)
  return null
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export { PortalHost, PortalConsumer }
