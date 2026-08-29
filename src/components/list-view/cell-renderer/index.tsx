/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 13:30:00
 */
import { useState } from 'react'
import { View } from 'react-native'
import { DEV } from '@constants'
import { styles } from '../styles'
import { Text } from '../../text'

import type { LayoutChangeEvent } from 'react-native'
import type { CellRendererFactoryProps, CellRendererProps } from './types'

/**
 * FlatList CellRendererComponent 工厂
 * - 测量真实高度写回缓存，供 getItemLayout 复用（不触发重渲染）
 * - 开发环境下叠加调试层：右上角显示「默认高度 / 实测高度」
 */
function CellRenderer({ setHeight, estimate }: CellRendererFactoryProps) {
  return function CellRendererComponent(props: CellRendererProps) {
    const { index, children, style, onLayout } = props
    const [measured, setMeasured] = useState(0)
    // 容忍 1px 以内的亚像素偏差（安卓测量值常有小数属正常现象），仅对显著差异报警
    const mismatch = !!measured && Math.abs(measured - estimate) > 1
    return (
      <View
        style={style}
        onLayout={(e: LayoutChangeEvent) => {
          const height = e.nativeEvent.layout.height
          setHeight(index, height)
          if (DEV) setMeasured(height)
          onLayout?.(e)
        }}
      >
        {children}
        {DEV && (
          <View
            style={[
              styles.dev,
              {
                backgroundColor: mismatch ? 'rgba(200, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.5)'
              }
            ]}
          >
            <Text type='__plain__' size={10}>
              {`默认 ${estimate} · 实测 ${measured ? Math.round(measured) : '…'}`}
            </Text>
          </View>
        )}
      </View>
    )
  }
}

export default CellRenderer
