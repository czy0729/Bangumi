/*
 * @Author: czy0729
 * @Date: 2024-06-13 22:34:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-20 00:00:00
 */
import React from 'react'
import { Text } from '@components'
import { stl } from '@utils'
import { calcStyles } from './utils'
import { useVerticalAlignDetection } from './hooks'

import type { Props as VerticalAlignProps } from './types'
export type { VerticalAlignProps }

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
  const { flag, handleTextLayout, hasMemo } = useVerticalAlignDetection({ text, onHit })

  const needOptimizeStyles = flag && typeof onHit !== 'function'
  const styles = needOptimizeStyles ? calcStyles(lineHeight) : undefined

  return (
    <Text
      {...other}
      style={stl(
        style,
        styles && {
          marginBottom: styles.marginBottom
        }
      )}
      lineHeight={styles?.lineHeight ?? lineHeight}
      onTextLayout={hasMemo ? undefined : handleTextLayout}
    >
      {children}
    </Text>
  )
}

export default VerticalAlign
