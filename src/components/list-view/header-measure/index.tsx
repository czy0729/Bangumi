/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 14:30:00
 */
import { useState } from 'react'
import { View } from 'react-native'
import { DEV } from '@constants'
import { styles } from '../styles'
import { Text } from '../../text'

import type { LayoutChangeEvent } from 'react-native'
import type { Props } from './types'

/**
 * 列表头测量组件
 * - 包裹 ListHeaderComponent，测量其高度供 getItemLayout 偏移补偿
 * - header 高度动态变化（折叠/延迟渲染）时 onLayout 自动更新
 * - 开发环境下叠加调试层显示实测高度
 */
function HeaderMeasure({ children, onMeasure }: Props) {
  const [measured, setMeasured] = useState(0)

  return (
    <View
      onLayout={(e: LayoutChangeEvent) => {
        const height = e.nativeEvent.layout.height
        onMeasure?.(height)
        if (DEV) setMeasured(height)
      }}
    >
      {children}
      {DEV && (
        <View style={[styles.dev, styles.devHeader, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}>
          <Text type='__plain__' size={10}>
            {`header ${measured || '…'}`}
          </Text>
        </View>
      )}
    </View>
  )
}

export default HeaderMeasure
