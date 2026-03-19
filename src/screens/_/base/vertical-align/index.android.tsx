/*
 * @Author: czy0729
 * @Date: 2024-06-13 22:34:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:34:02
 */
import React, { useCallback, useEffect, useState } from 'react'
import { Text } from '@components'
import { stl } from '@utils'
import { calcStyles, removeSpecCharacters } from './utils'

import type { NativeSyntheticEvent, TextLayoutEventData } from 'react-native'
import type { Props as VerticalAlignProps } from './types'
export type { VerticalAlignProps }

const memo = new Map<string, boolean>()

/**
 * 对于安卓端某些特殊字符, 存在超过行高的高度会看不全,
 * 自动改变行高然后垂直居中尽量显示, 仅安卓需要
 * */
export const VerticalAlign = ({
  style,
  text,
  lineHeight = 14,
  onHit,
  children,
  ...other
}: VerticalAlignProps) => {
  const [flag, setFlag] = useState(typeof text === 'string' && text && memo.get(text) === true)

  // ascender 正常显示的文字是有值的, 但是撑满的时候都会很小
  const handleTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (flag) return

      if (typeof text === 'string' && text) {
        const next = e.nativeEvent.lines?.[0]?.ascender <= 2
        if (next) setFlag(true)
        memo.set(text, next)
      }
    },
    [flag, text]
  )

  useEffect(() => {
    if (flag && typeof onHit === 'function') onHit(removeSpecCharacters(text))
  }, [flag, text, onHit])

  const needOptimizeStyles = flag && typeof onHit !== 'function'
  let styles = null
  if (needOptimizeStyles) styles = calcStyles(lineHeight)

  return (
    <Text
      {...other}
      style={stl(
        style,
        needOptimizeStyles && {
          marginBottom: styles.marginBottom
        }
      )}
      lineHeight={needOptimizeStyles ? styles.lineHeight : lineHeight}
      onTextLayout={memo.has(text) ? undefined : handleTextLayout}
    >
      {children}
    </Text>
  )
}

export default VerticalAlign
