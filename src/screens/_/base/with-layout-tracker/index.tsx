/*
 * @Author: czy0729
 * @Date: 2026-04-03 06:47:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-03 18:43:23
 */
import React, { useRef } from 'react'
import { View } from 'react-native'
import { logger } from '@utils/dev'

import type { ComponentType } from 'react'

/**
 * 高度变动监控 HOC
 * @param WrappedComponent 原始业务组件
 */
export function withLayoutTrace<P extends object>(WrappedComponent: ComponentType<P>) {
  const typedComponent = WrappedComponent as { displayName?: string; name?: string }
  const componentName = typedComponent.displayName || typedComponent.name || 'Anonymous'

  return (props: P) => {
    const lastHeight = useRef(0)
    const isFirstLayout = useRef(true)

    return (
      <View
        onLayout={e => {
          const { height } = e.nativeEvent.layout

          // 只有当高度发生非首次的、显著的变化时才记录
          if (!isFirstLayout.current && Math.abs(lastHeight.current - height) > 0.1) {
            if (lastHeight.current) {
              logger.error(
                'withLayoutTrace',
                `<${componentName}> 高度跳动: ${lastHeight.current.toFixed(1)} -> ${height.toFixed(
                  1
                )}`
              )
            }
          }

          lastHeight.current = height
          isFirstLayout.current = false
        }}
      >
        <WrappedComponent {...props} />
      </View>
    )
  }
}

export default withLayoutTrace
