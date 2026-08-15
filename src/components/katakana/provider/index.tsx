/*
 * @Author: czy0729
 * @Date: 2022-05-06 21:11:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-15 08:00:04
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { stl } from '@utils'
import { SIZE_DEFAULT, SIZE_MIN, SIZE_SUBTRACT, LINE_HEIGHT_INCREASE } from '../ds'
import { Text } from '../../text'
import { computedLineHeight } from '../../text/utils'
import { KatakanaContext } from '../context'
import { useKatakanaController } from './hooks'
import { shouldRenderKatakana } from './utils'
import { styles } from './styles'

import type { Matches, Props as KatakanaProviderProps } from './types'
export type { KatakanaProviderProps }

/**
 * 片假名终结者包裹容器
 *  - 通过真实渲染 Text 的 onTextLayout 测量每行坐标, 按行内比例推算片假名位置
 *  - 无需额外逐字符测量层
 */
export const KatakanaProvider = observer(
  ({ active = false, children, itemStyle, itemSecondStyle, ...other }: KatakanaProviderProps) => {
    const enabled = active || systemStore.setting.katakana
    const numberOfLines = other.numberOfLines
    const baseSize = other.size || SIZE_DEFAULT
    const size = Math.max(SIZE_MIN, baseSize - SIZE_SUBTRACT)
    const fullLineHeight = computedLineHeight(baseSize, undefined, LINE_HEIGHT_INCREASE) || 0
    const { measured, lineHeightIncrease, onKatakana, onTextLayout } = useKatakanaController(
      size,
      baseSize,
      fullLineHeight
    )
    const increase = enabled ? lineHeightIncrease : 0

    const contextValue = useMemo(
      () => ({ enabled, lineHeightIncrease: increase, onKatakana }),
      [enabled, increase, onKatakana]
    )

    /** 渲染悬浮的罗马音 */
    const renderKatakanas = () => {
      if (!measured.length) return null

      return measured.map((item: Matches) => {
        if (!shouldRenderKatakana(item, size, numberOfLines)) return null

        const isLineFirst = item.lineIndex === 0
        return (
          <Text
            key={item.jp}
            style={stl(
              styles.katakana,
              {
                top: item.top,
                left: item.left,
                includeFontPadding: false
              },
              itemStyle,
              !isLineFirst && itemSecondStyle
            )}
            type={item.type}
            size={size}
            lineHeight={size}
            numberOfLines={1}
            bold={item.bold}
          >
            {item.en}
          </Text>
        )
      })
    }

    if (!enabled) {
      return <Text {...other}>{children}</Text>
    }

    return (
      <KatakanaContext.Provider value={contextValue}>
        <View>
          {renderKatakanas()}
          <Text {...other} lineHeightIncrease={increase} onTextLayout={onTextLayout}>
            {children}
          </Text>
        </View>
      </KatakanaContext.Provider>
    )
  }
)

export default KatakanaProvider
