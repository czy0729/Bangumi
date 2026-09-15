/*
 * @Author: czy0729
 * @Date: 2026-08-12 08:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 07:27:44
 */
import { createContext, useMemo } from 'react'
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

  /**
   * 按 priority 稳定排序 (同层级保持挂载顺序), zIndex 由排序后的位置决定
   *  - 普通门户 (Modal 等) 为 0, 菜单体系的遮罩 / 按钮镜像 / 菜单分别为 1 / 2 / 3
   * */
  const ordered = useMemo(
    // 同层级以 key 升序 (key 单调自增即挂载顺序) 保证叠放确定, 不依赖 Array.prototype.sort 的稳定性
    () => [...items].sort((a, b) => a.priority - b.priority || a.key - b.key),
    [items]
  )

  return (
    <PortalContext.Provider value={manager}>
      <View style={styles.container} collapsable={false}>
        {children}
      </View>
      {ordered.map((item, index) => (
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
